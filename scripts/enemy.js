const Enemy = class extends Fighter {
    constructor(obj) {
        super(obj)
        this.sensing = SENSING_SQ;
        this.type = 'enemy';
        this.ce = rogue;
    }

    gainStats() {
        switch (this.grow && coinToss() ? this.grow : rndInt(3)) {
            case STR:
                this.str = ++this.strMax;
                break;
            case DEX:
                this.dex = ++this.dexMax;
                break;
            case CON:
                this.con = ++this.conMax;
                break;
            case INT:
                this.int = ++this.intMax;
                break;
        }
    }

    init(position, x, y, summon, magic, bias, lvl) {
        if (this.mod !== UNIQUE && lvl > this.lvl) {
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
        if (this.volumeRate) {
            this.getMaterial(lvl);
            this.getBaseandWeight();
		}
		
        if (this.mod === UNIQUE) {
            this.getUnique();
		} else if (this.mod === MAGIC || magic || this.material === M_GEM ||
            evalPercentage(10 + rogue.mf)) {
            if (this.bias) bias = this.bias;
            if (evalPercentage((10 + rogue.mf) / 4)) {
                this.getRare(bias, lvl);
			} else {
				this.getMagic(bias, lvl);
			}
		}
		
        if (evalPercentage(10)) this.dropNum++;
        if (this.mf) this.dropNum += Math.ceil(this.mf / 10);
        this.calcDmgOne();
        this.gainSynerzyAll();
        if (this.starter) this.getStarterItems();
        if (this.mod !== NORMAL) this.getOrLooseStats(modBonusMap.get(this.mod), true);
        this.calcAll();
        this.sleeping = this.awake || this.aggravating || summon ? 0 : DEFAULT;
        if (this.mimic) hallucinate.one(this, false, true);
        if (this.dropNum) {
            this.createItemIntoPack({
                times: this.dropNum,
                magic: this.mf || this.mod === UNIQUE,
                lvl: this.lvl,
            });
        }

        if (this.gf) {
            this.createItemIntoPack({
                times: rndIntBet(1, Math.ceil(this.gf / 20)),
                type: 'coin',
                tabId: C_COIN,
            });
        }

        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = summon ? -COST_REGULAR : this.spd;
        super.init(position, x, y);
    }

    putDown(x, y) {
        do {
			 this.id = Math.random();
		} while (Enemy.list[this.id]);

        this.spiralSearch(x, y, FIGHTER);
        if (this.abort) return;
        Enemy.list[this.id] = this;
        queue.push(this);
        if (rogue.hallucinated) hallucinate.one(this, true);
        this.drawOrErase(true);
    }

    act() {
        let dr = null;
        if (this.calcCondition(true) === null) return;
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
                return;
            }
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
        if (dr && (!this.stillness || l <= 1)) {
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
        let loc = coords[x][y];
        if (loc.trap && loc.trap.protection) {
            this.attackCircle(loc);
            return;
        } else if (loc.fighter && this.isOpponent(loc.fighter)) {
            this.attack({ enemy: loc.fighter });
            return;
		}
		
        if (loc.door === CLOSE && (!loc.hidden || this.searching)) {
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
            this.cost -= this.frw >= 100 ? 5 : Math.floor(this.frw / 20);
        }
    }

    getDirection(los, betw, rand) {
        let dr;
        if (betw) {
            dr = getDirectionBetween(this.x, this.y, this.ce.x, this.ce.y);
		} else if (rand) {
			dr = this.blinded ? this.dr : DR[rndInt(DR.length - 1)];
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
        let loc = coords[x][y];
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
        if (this.ce.id !== ROGUE) return this.getDirection(true, true);
        let drT;
        let dist = FOV + 1;
        let distCur = rogue.distMap[this.x + ',' + this.y];
        for (let dr of DR) {
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
        coords[this.x][this.y].fighter = null;
        delete Enemy.list[this.id];
        coords[this.x][this.y].detected = false;
        queue.delete(this);
        if (rogue.ce && rogue.ce.id === this.id) rogue.removeCe();
        for (let key in Enemy.list) {
            let enemy = Enemy.list[key];
            if (enemy.ce && enemy.ce.id === this.id) enemy.removeCe();
		}
		
        coords[this.x][this.y].draw();
        audio.playSound('kill', distanceSq(rogue.x, rogue.y, this.x, this.y));
        if (!f) return;
        if (rogue.hallucinated || this.mimic && !this.identified) hallucinate.undoOne(this);
        let name = this.getName();
        let nameE = f.getName(true);
        message.draw(option.isEnglish() ?
            `${nameE} defeated ${name}` :
            `${nameE}${name}を倒した`);
        f.gainExp(this.expGain);
        if (f.id !== ROGUE) return;
        if (this.material && this.probMaterial()) this.makeMaterial();
        this.dropEquipment(this.equipment);
        this.dropEquipment(this.side);
        for (let key in this.pack) {
			this.pack[key].putDown(this.x, this.y, true);
		}

        if (this.boss && rogue.cdl === 33) {
            creation.stairs(1, DOWN, LOCATION, this.x, this.y, true);
            if (rogue.cdl === 33 && !rogue.lethe) {
                creation.item({
                    type: 'potion',
                    tabId: P_LETHE,
                    position: LOCATION,
                    x: this.x,
                    y: this.y,
                });
            }

            if (rogue.cdl === 33) difficulty.inferno = true;
        }
    }

    probMaterial() {
        let perc;
        switch (this.mod) {
            case NORMAL:
            case UNIQUE:
                perc = 0;
                break;
            case MAGIC:
                perc = 20;
                break;
            case RARE:
                perc = 10;
                break;
		}
		
        return evalPercentage(perc);
    }

    makeMaterial() {
        for (let key in this.modList) {
            if (this.modList[key] === DEFAULT) {
                delete this.modList[key];
                continue;
			}
			
            let num = this.modList[key];
            let times = this.matRedTimes;
            while (times-- && num) num = rndInt(num);
            !num ? delete this.modList[key] : this.modList[key] = num;
		}
		
        if (!Object.keys(this.modList).length) return;
        let item = {};
        copyObj(item, this.modList);
        item.modList = {};
        copyObj(item.modList, this.modList);
        item.name = {};
        item.nameReal = {};
        copyObj(item.name, this.name);
        copyObj(item.nameReal, this.name);
        item.color = item.colorReal = this.colorReal;
        item.shadow = item.shadowReal = this.shadowReal;
        item.stroke = item.strokeReal = this.strokeReal;
        item.lvl = this.lvl;
        item.mod = this.mod;
        item.rarity = this.rarity;
        item.material = this.getMaterialBase();
        item.identified = false;
        item.quantity = 1;
        item.type = 'material';
        item.weight = WEIGHT[item.type];
        item.priceRate = materialMap.get(item.material).pRate;
        item.__proto__ = Item.prototype;
        item.symbolReal = item.symbol = Item.getSymbol(item.type);
        item.calcPrice();
        item.putDown(this.x, this.y, true);
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
        if (this.skillProb && evalPercentage(this.skillProb * 100) && this.checkToCast()) {
            if (this.castSkill(distance)) return;
		}
		
        if (this.haveMissile()) {
            ci = this.getAmmo(this.equipment['main'].throwType);
            if (ci) {
                flag.arrow = true;
                let name = this.getName(true);
                let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
                message.draw(option.isEnglish() ?
                    `${name} shot ${arrow}` :
                    `${name}矢を放った`);
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
        let a = EA[rndInt(Object.keys(this.skill).length - 1)];
        let id = this.skill[a].id;
        let skill = skillMap.get(id);
        if (!this.checkToCast(skill)) return;
        if (skill.kind !== 'self' && skill.range >= 0) {
            let l = skill.range;
            l += skill.radius ? skill.radius : 0;
            if (l ** 2 < distance) return;
		}
		
        cs = this.skill[a];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
        } else {
            flag.skill = true;
            let [x, y] = skill.range === 0 ? [this.x, this.y] : [this.ce.x, this.ce.y];
            this.aim({
                x1: x,
                y1: y,
                nameSkill: id,
            });
		}
		
        return true;
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
        if (skill.kind === 'breath' && this.race === HUMAN ||
            skill.kind !== 'breath' && skill.type === 'spell' && this.int < 10) {
			return;
		}

        if (!this.skill) {
            this.skillProb = 1 / ((skill.kind === 'breath' && this.race & DRAGON ? 7 : 10) - Math.floor(this.lvl / 20));
            this.skill = {};
		}
		
        let i = 0;
        while (this.skill[EA[i]] && this.skill[EA[i]].id !== id) i++;
        if (i >= MAX_SKILL_NUM) return;
        if (!this.skill[EA[i]]) this.skill[EA[i]] = {};
        skill = this.skill[EA[i]];
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
            if (this.cursed && this.mod !== UNIQUE)
                name = (option.isEnglish() ? 'Cursed ' : '呪われた') + name;
        } else {
			name = option.isEnglish() ? 'Something' : '何か';
		}

        if (subject && !option.isEnglish()) name += 'は';
        return name;
    }

    isOpponent(fighter) {
        return /*fighter.id===ROGUE||*/ this.ce && this.ce.id === fighter.id ||
            this.confused || this.blinded;
    }

    isShowing() {
        return (litMapIds[this.x + ',' + this.y] || this.detected) &&
            !rogue.blinded && (!this.invisible || rogue.seeInvisible);
    }

    removeCe() {
        this.ce = null;
    }
}

Enemy.list = {};
