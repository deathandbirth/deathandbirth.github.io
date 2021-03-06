const Enemy = class extends Fighter {
    constructor(obj) {
        super(obj)
        this.sensing = SENSING_SQ;
        this.type = 'enemy';
        this.ce = rogue;
    }

    gainStats() {
        for (let i = 0; i < 5; i++ ) {
            switch (this.grow && coinToss() ? this.grow : rndInt(3)) {
                case STAT_STR:
                    this.str = ++this.strMax;
                    break;
                case STAT_DEX:
                    this.dex = ++this.dexMax;
                    break;
                case STAT_CON:
                    this.con = ++this.conMax;
                    break;
                case STAT_INT:
                    this.int = ++this.intMax;
                    break;
            }
        }
    }

    init(position, x, y, summon, magic, bias, lvl) {
        if (this.mod !== MOD_UNIQUE && lvl > this.lvl) {
            let boost = rndInt(lvl - this.lvl);
            for (let i = 0; i < boost; i++) {
				this.gainStats();
			}

            this.lvlMax = this.lvl = this.lvl + boost;
		}
		
        this.skillPoints = this.lvl - 1;
        this.exp = this.expMax = calcLevel(this.lvl);
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        if (this.piece) this.getMaterial();
        if (this.mod === MOD_UNIQUE) {
            this.getUnique();
        } else if (this.mod !== MOD_NORMAL || magic ||
            this.material === M_GEM || Material.evalMod(MOD_MAGIC, rogue.mf)) {
            if (this.bias) bias = this.bias;
            if (this.mod === MOD_RARE || Material.evalMod(MOD_RARE, rogue.mf)) {
                this.getRare(bias);
			} else {
				this.getMagic(bias);
			}
		}
		
        if (evalPercentage(10)) this.dropNum++;
        if (this.mf) this.dropNum += Math.ceil(this.mf / 30);
        // this.calcDmgOne();
        this.gainSynerzyAll();
        if (this.starter) this.getStarterItems();
        if (this.mod !== MOD_NORMAL) this.getOrLooseStats(modBonusMap.get(this.mod), true);
        this.calcAll();
        this.sleeping = this.awake || this.aggravating || summon ? 0 : DEFAULT;
        if (this.mimic) hallucinate.one(this, false, true);
        if (this.dropNum) {
            this.createItemIntoPack({
                times: this.dropNum,
                magic: this.mf || this.mod === MOD_UNIQUE,
                lvl: this.lvl,
            });
        }

        if (this.gf) {
            this.createItemIntoPack({
                times: rndIntBet(1, Math.ceil(this.gf / 40)),
                type: 'coin',
                tabId: C_COIN,
            });
        }

        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = COST_REGULAR * (summon ? -1 : this.spd / 100);
        super.init(position, x, y);
    }

    putDown(x, y) {
        do {
			 this.id = Math.random();
		} while (map.enemyList[this.id]);

        this.spiralSearch(x, y, 'fighter');
        if (this.abort) return;
        map.enemyList[this.id] = this;
        map.queue.push(this);
        if (rogue.hallucinated) hallucinate.one(this, true);
        this.drawOrErase(true);
    }

    act() {
        let dr = null;
        if (this.calcCondition() === null) return;
        this.heal()
        if (!this.ce) {
            if (this.hallucinated) this.searchCe();
            if (!this.ce) this.ce = rogue;
		}
		
        let l = distanceSq(this.x, this.y, this.ce.x, this.ce.y);
        if (this.paralyzed || this.sleeping) {
            if (this.sleeping < 0 && l <= FOV_SQ && (this.ce.aggravating || this.probWakeUp(l))) {
                this.wakeUp();
			} else {
                this.decreaseEnergy();
            }

            return;
		}
		
        let los = l <= FOV_SQ ? lineOfSight(this.x, this.y, this.ce.x, this.ce.y) : false;
        if (this.blinded || this.confused || this.moveRnd && coinToss()) {
            dr = this.getDirection(los, undefined, true);
		} else if (los) {
            dr = this.decide(l);
        } else if (l <= FOV_SQ) {
            dr = this.getDrToMinDistance();
		} else if (l <= this.sensing) {
			dr = this.getDirection(los, true);
		}

        if (!dr && this.drTemp) dr = this.drTemp;
        if (dr) {
            this.dr = dr;
            this.drTemp = null;
            this.move(dr, los);
		}
		
		if ((flag.dash || flag.rest) && los && this.isShowing() &&
			(!this.mimic || this.identified)) {
			flag.dash = flag.rest = false;
		}

        this.decreaseEnergy();
    }

    move(dr, los) {
        let [x, y] = [this.x + dr.x, this.y + dr.y];
        let loc = map.coords[x][y];
        if (loc.trap && loc.trap.protection) {
            if (this.stillness && !this.canAttack) return;
            this.attackCircle(loc);
            return;
        } else if (loc.fighter && this.isOpponent(loc.fighter)) {
            if (this.stillness && !this.canAttack) return;
            this.attack({ enemy: loc.fighter });
            return;
		}
        
        if (this.stillness) return;
        if (loc.isClosedDoor() && (!loc.hidden || this.searching)) {
            if (loc.hidden) {
                if (!evalPercentage(this.searching)) return;
                loc.hidden = false;
                loc.wall = false;
			}
			
            loc.openOrCloseDoor();
        } else {
            this.drawOrErase(false);
            this.x += dr.x, this.y += dr.y;
            this.drawOrErase(true);
            this.cost -= this.spdMove;
        }
    }

    getDirection(los, betw, rand) {
        let dr;
        if (betw) {
            dr = getDirectionBetween(this.x, this.y, this.ce.x, this.ce.y);
		} else if (rand) {
			dr = this.blinded && this.dr ? this.dr : drList[rndInt(drList.length - 1)];
		}

        if (!this.canMove(dr)) dr = this.getDrAround(dr, los); ///
        return dr;
    }

    getDrAround(dr, los) {
        let ccw = coinToss();
        let nextDr = getNextDirection(dr, ccw);
        if (!this.canMove(nextDr)) {
            let nextDr2 = getNextDirection(dr, !ccw)
            if (!this.canMove(nextDr2)) {
                if (!los || this.drTemp) return null;
                let nextDr3 = getNextDirection(nextDr, ccw);
                if (!this.canMove(nextDr3)) {
                    nextDr3 = getNextDirection(nextDr2, !ccw);
                    if (!this.canMove(nextDr3)) return null
				}
				
                nextDr = nextDr3;
            } else {
				nextDr = nextDr2;
			}
		}

        return nextDr;
    }

    canMove(dr) {
        let [x, y] = [this.x + dr.x, this.y + dr.y];
        let loc = map.coords[x][y];
        if (loc.fighter) {
            return this.isOpponent(loc.fighter);
		} else if (loc.wall && (!loc.hidden || !this.searching)) {
            return false;
        } else if (!this.drTemp && loc.trap && loc.trap.protection) {
            this.drTemp = dr;
            return false;
		}
		
        return true;
    }

    getDrToMinDistance() {
        if (this.ce.id !== ID_ROGUE) return this.getDirection(true, true);
        let drT;
        let dist = FOV + 1;
        let distCur = rogue.distMap[this.x + ',' + this.y];
        for (let dr of drList) {
            let [x, y] = [this.x + dr.x, this.y + dr.y];
            if (dist > rogue.distMap[x + ',' + y]) {
                if (!this.canMove(dr)) continue;
                drT = dr;
                dist = rogue.distMap[x + ',' + y];
                if (dist < distCur) break;
            }
		}
		
        return drT ? drT : this.getDirection(true, true);
    }

    attackCircle(loc) {
        if (evalPercentage(25)) {
            if (!loc.hidden) {
                audio.playSound('broken');
                let name = this.getName(true);
                message.draw(option.isEnglish() ?
                    `${name} broke Magic Circle of Protection` :
                    `${name}守りの魔法円を破壊した`)
			}
			
            loc.deleteTrap(true);
        }
    }

    died(f) {
        this.abort = true;
        let loc = map.coords[this.x][this.y];
        loc.fighter = null;
        delete map.enemyList[this.id];
        map.queue.delete(this);
        if (rogue.ce && rogue.ce.id === this.id) rogue.removeCe();
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            if (enemy.ce && enemy.ce.id === this.id) enemy.removeCe();
		}
        
        audio.playSound('kill', distanceSq(rogue.x, rogue.y, this.x, this.y));
        if (!f) return;
        if (rogue.hallucinated || this.mimic && !this.identified) hallucinate.undoOne(this);
        let name = this.getName();
        let nameE = f.getName(true);
        message.draw(option.isEnglish() ?
            `${nameE} defeated ${name}` :
            `${nameE}${name}を倒した`);
        f.gainExp(this.expGain);
        if (f.id !== ID_ROGUE) return;
        if (this.material && this.probMaterial()) this.makeMaterial(true);
        this.dropEquipment(this.equipment);
        this.dropEquipment(this.side);
        for (let key in this.pack) {
			this.pack[key].putDown(this.x, this.y, true);
		}

        if (this.boss && rogue.cdl === 33) {
            creation.stairs(1, DR_DOWN, POS_LOCATION, this.x, this.y, true);
            if (rogue.cdl === 33 && !rogue.lethe) {
                creation.item({
                    type: 'potion',
                    tabId: P_LETHE,
                    position: POS_LOCATION,
                    x: this.x,
                    y: this.y,
                });
            }

            if (rogue.cdl === 33) rogue.inferno = true;
        }
    }

    probMaterial() {
        let perc;
        switch (this.mod) {
            case MOD_NORMAL:
            case MOD_UNIQUE:
                perc = 0;
                break;
            case MOD_MAGIC:
                perc = 20;
                break;
            case MOD_RARE:
                perc = 10;
                break;
		}
		
        return perc && this.matDropRate ? evalPercentage(perc / this.matDropRate) : false;
    }

    dropEquipment(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            item.putDown(this.x, this.y, true);
            list[key] = null;
        }
    }

    decide(distance) {
        if (this.skill && this.skill['a'] && evalPercentage(this.skillProb * 100) && this.checkToCast()) {
            if (this.castSkill(distance)) return;
		}
		
        if (this.haveMissile()) {
            let ammo = this.getAmmo(this.equipment['main'].throwType);
            if (ammo) {
                this.ci = ammo;
                flag.arrow = true;
                this.getShootMsg(ammo);
                this.aim({
                    x1: this.ce.x,
                    y1: this.ce.y,
				});
				
                return;
            } else if (!this.equipment['main'].cursed) {
                this.swap();
                return;
            }
		}
		
        return this.getDrToMinDistance();
    }

    castSkill(distance) {
        let cast;
        let array = Object.keys(this.skill);
        array.shuffle();
        for (let a of array) {
            let id = this.skill[a].id;
            let skill = skillMap.get(id);
            if (!this.checkToCast(skill)) continue;
            if (skill.kind !== 'self' && skill.range >= 0) {
                let l = skill.range;
                l += skill.radius ? skill.radius : 0;
                if (l ** 2 < distance) continue;
            }
            
            if (id === TELEPORT_TO || id === RAID) {
                if (1 > distance) continue;
            } else if (id === HEAL) {
                if (this.hp >= this.hpMax) continue;
            } else if (id === ENCOURAGEMENT) {
                if (this.dmgBuffDur) continue;
            } else if (id === BLESSING) {
                if (this.acBuffDur) continue;
            } else if (id === SPEED) {
                if (this.spdBuffDur) continue;
            }
            
            this.cs = this.skill[a];
            if (skill.kind === 'self') {
                cast = this.castSelfSpell(skill) !== null;
                if (cast) break;
            } else {
                cast = true;
                flag.skill = true;
                let [x, y] = skill.range === 0 ? [this.x, this.y] : [this.ce.x, this.ce.y];
                this.aim({
                    x1: x,
                    y1: y,
                    nameSkill: id,
                });

                break;
            }
        }

        return cast;
    }

    probWakeUp(distanceSq) {
        let perc = (1 - distanceSq / FOV_SQ) * 100 - (this.ce.stealth - this.stealth);
        if (perc > 99) {
            perc = 99;
		} else if (perc < 1) {
			perc = 1;
		}

        return evalPercentage(perc);
    }

    getBias(bias) {
        switch (bias) {
            case BIAS_FIRE:
                this.getSkill(FIRE_BREATH);
                break;
            case BIAS_WATER:
                this.getSkill(AQUA_BREATH);
                break;
            case BIAS_AIR:
                this.getSkill(WIND_BREATH);
                break;
                // case BIAS_EARTH:
            case BIAS_POISON:
                this.getSkill(POISON_BREATH);
                break;
            case BIAS_LIGHT:
                this.getSkill(LIGHT_BREATH);
                break;
            case BIAS_COLD:
                this.getSkill(COLD_BREATH);
                break;
            case BIAS_LIGHTNING:
                this.getSkill(LIGHTNING_BREATH);
                break;
            case BIAS_GRAVITY:
                this.getSkill(GRAVITY_BREATH);
                break;
            case BIAS_INFECTION:
                this.getSkill(INFECTION_BREATH);
                break;
            case BIAS_BLIZZARD:
                this.getSkill(BLIZZARD_BREATH);
                break;
            case BIAS_SAND:
                this.getSkill(DUST_BREATH);
                break;
            case BIAS_ACID:
                this.getSkill(ACID_BREATH);
                break;
            case BIAS_MAGMA:
                this.getSkill(MAGMA_BREATH);
                break;
            case BIAS_RADIATION:
                this.getSkill(RADIOACTIVE_BREATH);
                break;
        }
    }

    getSkill(id) {
        if (!this.skillPoints) return;
        let skill = skillMap.get(id);
        if (skill.kind === 'breath' && this.race === RACE_HUMAN ||
            skill.kind !== 'breath' && skill.type === 'spell' && this.int < 50) {
			return;
		}

        if (!this.skill) {
            this.skillProb = 1 / ((skill.kind === 'breath' && this.race & RACE_DRAGON ? 7 : 10) - Math.floor(this.lvl / 20));
            this.skill = {};
		}
		
        let i = 0;
        while (this.skill[eaList[i]] && this.skill[eaList[i]].id !== id) i++;
        if (i >= MAX_SKILL_NUM) return;
        if (!this.skill[eaList[i]]) this.skill[eaList[i]] = {};
        skill = this.skill[eaList[i]];
        skill.id = id;
        if (!skill.lvl) skill.lvl = 0;
        let gainLvl = MAX_SKILL_LVL - skill.lvl;
        if (gainLvl > this.skillPoints) gainLvl = this.skillPoints;
        skill.lvl += gainLvl;
        this.skillPoints -= gainLvl;
    }

    gainSynerzyAll() {
        for (let key in this.skill) {
			this.gainSynerzy(skillMap.get(this.skill[key].id), this.skill[key].lvl);
		}
    }

    getName(subject) {
        let name;
        if (this.isShowing()) {
            name = this.name[option.getLanguage()];
            if (this.cursed && this.mod !== MOD_UNIQUE)
                name = (option.isEnglish() ? 'Cursed ' : '呪われた') + name;
        } else {
			name = option.isEnglish() ? 'Something' : '何か';
		}

        if (subject && !option.isEnglish()) name += 'は';
        return name;
    }

    isOpponent(fighter) {
        return /*fighter.id===ID_ROGUE||*/ this.ce && this.ce.id === fighter.id ||
            this.confused || this.blinded;
    }

    isShowing() {
        return (rogue.litMapIds[this.x + ',' + this.y] || this.detected) &&
            !rogue.blinded && (!this.invisible || rogue.seeInvisible);
    }

    removeCe() {
        this.ce = null;
    }
}
