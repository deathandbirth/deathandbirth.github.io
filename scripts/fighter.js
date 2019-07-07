const Fighter = class extends Material {
    constructor(obj) {
        super(obj);
        this.lvlMax = this.lvl;
        this.levi = !!this.levi;
        this.hpSum = 0;
        if (!this.hpReg) this.hpReg = 0;
        this.hpRegBuff = 0;
        this.mpSum = 0;
        this.mpReg = 0;
        this.mpRegBuff = 0;
        this.strMax = this.str;
        this.strBonus = 0;
        this.strSus = 0;
        this.dexMax = this.dex;
        this.dexBonus = 0;
        this.dexSus = 0;
        this.conMax = this.con;
        this.conBonus = 0;
        this.conSus = 0;
        this.intMax = this.int;
        this.intBonus = 0;
        this.intSus = 0;
        this.spdMax = this.spd;
        this.spdBuff = 0;
        this.spdNerf = 0;
        this.spdBuffDur = 0;
        this.spdNerfDur = 0;
        this.mf = 0;
        this.mfBuff = 0;
        this.gf = 0;
        this.gfBuff = 0;
        this.expBonus = 0;
        this.atkBare = this.atkType;
        this.dmgBare = this.dmgBase;
        this.dmgBonus = 0;
        this.dmgBuff = 0;
        this.digging = 0;
        this.dmgHuman = 0;
        this.dmgDemon = 0;
        this.dmgAnimal = 0;
        this.dmgDragon = 0;
        this.dmgUndead = 0;
        this.dmgGiant = 0;
        this.dmgSpirit = 0;
        this.dmgGod = 0;
        this.dmgFire = 0;
        this.dmgLightning = 0;
        if (!this.dmgPoison) this.dmgPoison = 0;
        if (!this.dmgAcid) this.dmgAcid = 0;
        this.dmgMinBonus = 0;
        this.dmgMaxBonus = 0;
        if (!this.atkCon) this.atkCon = 0;
        if (!this.atkPara) this.atkPara = 0;
        if (!this.atkSlow) this.atkSlow = 0;
        if (!this.atkInf) this.atkInf = 0;
        if (!this.atkBlind) this.atkBlind = 0;
        if (!this.atkRadi) this.atkRadi = 0;
        if (!this.atkCold) this.atkCold = 0;
        if (!this.atkDrain) this.atkDrain = 0;
        if (!this.atkStealGold) this.atkStealGold = 0;
        if (!this.atkStealItem) this.atkStealItem = 0;
        this.rateBonus = 0;
        this.rateBuff = 0;
        if (!this.acBonus) this.acBonus = 0;
        this.acSValueSum = 0;
        this.acTValueSum = 0;
        this.acBValueSum = 0;
        this.acSBaseSum = 0;
        this.acTBaseSum = 0;
        this.acBBaseSum = 0;
        this.acSBase = this.getAcVar(this.acBase * this.acSRate, AT_S);
        this.acTBase = this.getAcVar(this.acBase * this.acTRate, AT_T);
        this.acBBase = this.getAcVar(this.acBase * this.acBRate, AT_B);
        this.acBuff = 0;
        if (!this.acRed) this.acRed = 0;
        this.iasBase = 0;
        this.fcrBase = 0;
        this.frwBase = 0;
        if (!this.ias) this.ias = 0;
        if (!this.fcr) this.fcr = 0;
        if (!this.frw) this.frw = 0;
        this.pack = {};
        if (!this.fire) this.fire = 0;
        if (!this.water) this.water = 0;
        if (!this.air) this.air = 0;
        if (!this.earth) this.earth = 0;
        if (!this.poison) this.poison = 0;
        this.fireMax = this.fire;
        this.fireBuff = 0;
        this.waterMax = this.water;
        this.waterBuff = 0;
        this.airMax = this.air;
        this.airBuff = 0;
        this.earthMax = this.earth;
        this.earthBuff = 0;
        this.poisonMax = this.poison;
        this.poisonBuff = 0;
        this.lowerRes = 0;
        this.physicalBuff = 0;
        this.physicalBuffDur = 0;
        this.physicalNerf = 0;
        this.physicalNerfDur = 0;
        this.statPoints = 0;
        this.skillPoints = 0;
        this.skillFire = 0;
        this.skillWater = 0;
        this.skillAir = 0;
        this.skillEarth = 0;
        this.skillPoison = 0;
        this.skillAll = 0;
        this.cost = COST_REGULAR;
        if (this.invisible) this.invisible = DEFAULT;
        this.teleported = 0;
        this.aggravating = 0;
        this.stealth = 0;
        this.digest = 0;
        this.searching = 0;
        this.lighten = 0;
        if (!this.stealLife) this.stealLife = 0;
        if (!this.stealMana) this.stealMana = 0;
        this.healCount = 0;
        this.totalWeight = 0;
        this.side = { a: null, b: null };
        this.swapped = false;
        this.numBoxes = 0;
        this.initSynerzy();
        this.equipment = {};
        if (this.race & (HUMAN | GIANT)) {
            for (let key in BP) {
				this.equipment[BP[key]] = null;
			}
		}
        
        if (this.starter) {
            this.eqt = {} //equipment temp
            this.numBoxes = INIT_BOX_NUM;
            this.boxes = {};
            for (let i = 1; i <= this.numBoxes; i++) {
                this.boxes[i] = null;
            }
        }

        //HP Bar Color
        this.sleeping = 0;
        this.paralyzed = 0;
        this.confused = 0;
        this.blinded = 0;
        this.hallucinated = 0;
        this.canceled = 0;
        this.infected = 0;
        this.poisoned = 0;

        //Stats Color
        this.expBuff = 0;

        //Condition Display
        this.seeInvisible = 0;
        this.invisibility = 0;
        this.ecco = 0;
        this.enchantSelfDur = 0;
        this.venomDur = 0;
        this.confusing = 0;
    }

    initSynerzy() {
        this.synerzyMelee = 0;
        this.synerzyMissile = 0;
        this.synerzyFire = 0;
        this.synerzyWater = 0;
        this.synerzyAir = 0;
        this.synerzyEarth = 0;
        this.synerzyPoison = 0;
    }

    gainExp(exp, potion) {
        this.exp += Math.floor(exp * (potion ? 1 : (1 + this.expBonus / 100)));
        if (this.exp > this.expMax) this.expMax = this.exp;
        let found;
        while ((this.id === ROGUE && this.lvl < MAX_FIGHTER_LVL || this.id !== ROGUE) &&
          	  this.exp >= calcLevel(this.lvl + 1)) {
            if (++this.lvl <= this.lvlMax) continue;
            this.lvlMax = this.lvl;
            found = true;
            audio.playSound('level');
            this.skillPoints++;
            if (this.id === ROGUE) {
                message.draw(option.isEnglish() ?
                    `Welcome to level ${this.lvl}` :
                    `レベル${this.lvl}へようこそ`);
                this.statPoints += 5;
            } else {
				this.gainStats();
			}
		}
		
        if (found) {
            this.expGain = this.getExp();
            this.expNext = this.calcNextLvl();
            this.calcHP();
            this.calcMP();
            this.hp = this.hpMax;
            this.mp = this.mpMax;
        }
    }

    getExp() {
        let exp = calcLevel(this.lvl + 1) - calcLevel(this.lvl);
        if (this.mod === UNIQUE) {
            exp /= this.boss ? 1 : 2;
		} else {
			exp /= 50;
		}

        if (this.group) exp /= 10;
        if (this.race & DRAGON) {
            exp *= 3;
		} else if (this.race & GIANT) {
			exp *= 2;
		}

        if (this.mod === RARE) {
            exp *= 4;
		} else if (this.mod === MAGIC) {
			exp *= 2;
		}

        if (this.expRate) exp *= this.expRate;
        return Math.ceil(exp);
    }

    calcNextLvl() {
        return this.lvl >= MAX_FIGHTER_LVL ? 0 : calcLevel(this.lvl + 1);
    }

    calcHP() {
        this.hpMax = (this.lvl - 1 + this.con) * (this.hpRate + HP_BASE_RATE) + this.hpSum;
        if (this.hpMax < 1) this.hpMax = 1;
        if (this.hp > this.hpMax) this.hp = this.hpMax;
    }

    calcMP() {
        this.mpMax = (this.lvl - 1 + this.int) * (this.mpRate + MP_BASE_RATE) + this.mpSum;
        if (this.mpMax < 1) this.mpMax = 1;
        if (this.mp > this.mpMax) this.mp = this.mpMax;
    }

    calcDmg(equip) {

        // Damage
        let dmgSAvg = 0,
            dmgTAvg = 0,
            dmgBAvg = 0,
            count = 0,
            dmgBase = Math.ceil(this.dmgBase + this.str / 2);
        this.dmgSBase = this.atkType & AT_S ? minMax.getBase(dmgBase, atVarMap.get(AT_S)) : 0;
        this.dmgTBase = this.atkType & AT_T ? minMax.getBase(dmgBase, atVarMap.get(AT_T)) : 0;
        this.dmgBBase = this.atkType & AT_B ? minMax.getBase(dmgBase, atVarMap.get(AT_B)) : 0;
        this.dmgSValue = this.dmgTValue = this.dmgBValue = 0;
        if (this.dmgSBase) {
            [this.dmgSValue, dmgSAvg] = this.getDmgMinMax(this.dmgSBase);
            count++;
        }

        if (this.dmgTBase) {
            [this.dmgTValue, dmgTAvg] = this.getDmgMinMax(this.dmgTBase);
            count++;
        }

        if (this.dmgBBase) {
            [this.dmgBValue, dmgBAvg] = this.getDmgMinMax(this.dmgBBase);
            count++;
        }

        this.dmgAvg = Math.floor((dmgSAvg + dmgTAvg + dmgBAvg) / count);

        // Hit Rate
        let weapon = this.equipment['main'];
        let weight = weapon ? 3 - weapon.weight : 0;
        if (this.id === ROGUE && weight < 0 && weight * 10 + this.str < 0) {
            weight = -1000;
            if (equip) message.draw(message.get(M_TOO_HEAVY));
        }

        this.rateValue = Math.floor(((this.dex * 20 + weight * 100) *
            (1 + this.rateBonus / 100)) * (1 + this.rateBuff / 100));
        if (this.rateValue < 1) this.rateValue = 1;

        // Speed
        let ias = Math.floor((1 + this.iasBase / 100) * 5 * this.ias);
        let fcr = Math.floor((1 + this.fcrBase / 100) * 5 * this.fcr);
        let str = this.str * 2;
        let dex = this.dex * 2;
        let int = this.int * 2;
        this.spdMelee = ias < str ? ias : str;
        this.spdMissile = ias < dex ? ias : dex;
        this.spdSpell = fcr < int ? fcr : int;
        let limit = COST_REGULAR / 2;
        if (this.spdMelee > limit) this.spdMelee = limit;
        if (this.spdMissile > limit) this.spdMissile = limit;
        if (this.spdSpell > limit) this.spdSpell = limit;
        this.spdMeleeRate = Math.floor(this.spdMelee / COST_REGULAR * 100);
        this.spdMissileRate = Math.floor(this.spdMissile / COST_REGULAR * 100);
        this.spdSpellRate = Math.floor(this.spdSpell / COST_REGULAR * 100);
        this.timesMelee = Math.floor(this.spdMelee / 100) + 1;
        this.timesMissile = Math.floor(this.spdMissile / 100) + 1;
        if (this.timesMelee > 5) this.timesMelee = 5;
        if (this.timesMissile > 5) this.timesMissile = 5;
    }

    getDmgMinMax(base) {
        let [min, max] =  minMax.getNums(base, this.dmgMinBonus, this.dmgMaxBonus);
        let bonus = 1 + this.dmgBonus / 100;
        let buff = 1 + this.dmgBuff / 100;
        min *= bonus * buff;
        max *= bonus * buff;
        let value = Math.floor(min) + '-' + Math.floor(max);
        let avg = (min + max) / 2;
        return [value, avg];
    }

    calcMoveTimes() {
        this.spdMove = Math.floor((1 + this.frwBase / 100) * 5 * this.frw);
        let limit = COST_REGULAR / 2;
        if (this.spdMove > limit) this.spdMove = limit;
        this.spdMoveRate = Math.floor(this.spdMove / COST_REGULAR * 100);
    }

    calcAc() {
        let percBonus = 1 + this.acBonus / 100;
        let percBonusSum = this.acBonus / 100/* / 7*/;
        let percBuff = 1 + this.acBuff / 100;
        this.acSValue = this.acSBase * percBonus + this.dex; //bare
        this.acSBonusValue = this.acSBaseSum * percBonusSum; //weapon, ornament
        this.acSValueTotal = Math.floor((this.acSValue + this.acSBonusValue + this.acSValueSum) * percBuff);
        if (this.acSValueTotal < 0) this.acSValueTotal = 0;
        this.acTValue = this.acTBase * percBonus + this.dex;
        this.acTBonusValue = this.acTBaseSum * percBonusSum;
        this.acTValueTotal = Math.floor((this.acTValue + this.acTBonusValue + this.acTValueSum) * percBuff);
        if (this.acTValueTotal < 0) this.acTValueTotal = 0;
        this.acBValue = this.acBBase * percBonus + this.dex;
        this.acBBonusValue = this.acBBaseSum * percBonusSum;
        this.acBValueTotal = Math.floor((this.acBValue + this.acBBonusValue + this.acBValueSum) * percBuff);
        if (this.acBValueTotal < 0) this.acBValueTotal = 0;
        this.acAvgValueTotal = Math.floor((this.acSValueTotal + this.acTValueTotal + this.acBValueTotal) / 3);
    }

    calcAttack(e, skill, lvl, itemThrown, ammo) {
        let dmgBase, atkType, acEnemy, atCur;
        if (!itemThrown) {
            atkType = this.atkType;
        } else {
            atkType = itemThrown.atkType ? itemThrown.atkType : AT_B;
		}
        
        [acEnemy, atCur] = this.getEnemyAc(atkType, e);
        let rate = Math.floor((this.rateValue / (this.rateValue + acEnemy)) * 100);
        if (rate > 95) rate = 95;
		if (rate < 5) rate = 5;
        let dmg = 0;
        if (!evalPercentage(rate)) return [dmg, rate, atCur];
        let boost = 0;
        if (itemThrown) {
            dmgBase = itemThrown.dmgBase;
            if (dmgBase) dmgBase = minMax.getBase(Math.ceil(dmgBase + this.str / 2), atVarMap.get(atCur));
            if (itemThrown.dmgBonus) boost = itemThrown.dmgBonus;
        } else {
            dmgBase = atCur === AT_S ? this.dmgSBase :
                atCur === AT_T ? this.dmgTBase :
                atCur === AT_B ? this.dmgBBase :
                null;
            if (ammo && ammo.dmgBonus) boost = ammo.dmgBonus;
        }

        if (!dmgBase) dmgBase = '1-2';
        if (e.race) boost += this.getRaceBoost(e.race);
        if (e.material === M_STONE) boost += this.digging;
        if (skill) boost += this.calcSkillValue(skill, lvl);
        dmg = this.getDmg(dmgBase, this.dmgMinBonus, this.dmgMaxBonus, this.dmgBonus, this.dmgBuff, boost);
        let add = dmg;
        let element = skill ? skill.element : 'physical';
        dmg *= 1 - e[element] / 100;
        if (this.dmgFire) dmg += add * (this.dmgFire / 100) * (1 - e.fire / 100);
        if (this.dmgLightning) dmg += add * (this.dmgLightning / 100) * (1 - e.lightning / 100);
        if (this.dmgPoison) dmg += add * (this.dmgPoison / 100) * (1 - e.poison / 100);
        if (this.dmgAcid) dmg += add * (this.dmgAcid / 100) * (1 - e.acid / 100);
        dmg = dmg < 1 ? 1 : Math.floor(dmg);
        return [dmg, rate, atCur];
    }

    getDmg(base, min=0, max=0, bonus=0, buff=0, boost=0) {
        return minMax.roll(base, min, max) * (1 + bonus / 100) * (1 + buff / 100) * (1 + boost / 100);
    }

    getEnemyAc(atkType, enemy) {
        let atCur;
        let ac = NaN;
        if (atkType & AT_S && !(ac <= enemy.acSValueTotal)) {
            ac = enemy.acSValueTotal;
            atCur = AT_S;
        }

        if (atkType & AT_T && !(ac <= enemy.acTValueTotal)) {
            ac = enemy.acTValueTotal;
            atCur = AT_T;
        }

        if (atkType & AT_B && !(ac <= enemy.acBValueTotal)) {
            ac = enemy.acBValueTotal;
            atCur = AT_B;
        }

        return [ac, atCur];
    }

    getRaceBoost(race) {
        let boost = 0;
        if (race & HUMAN) boost += this.dmgHuman;
        if (race & ANIMAL) boost += this.dmgAnimal;
        if (race & DEMON) boost += this.dmgDemon;
        if (race & UNDEAD) boost += this.dmgUndead;
        if (race & DRAGON) boost += this.dmgDragon;
        if (race & GIANT) boost += this.dmgGiant;
        if (race & SPIRIT) boost += this.dmgSpirit;
        if (race & GOD) boost += this.dmgGod;
        return boost;
    }

    attack({
        enemy,
        missile,
        skill,
        lvl,
        itemThrown,
    }) {
        let name, isBasic, ammo;
        let nameE = enemy.getName();
        let isEng = option.isEnglish();
        let count = 0;
        if (itemThrown) {
            name = itemThrown.getName(false, 1);
		} else if (missile) {
            ammo = this.ci;
            name = ammo.getName(false, 1);
            // if (isEng) name = getArticleAndPlural(name, false, true, 1, true);
        } else if (skill) {
            name = skill.name[option.getLanguage()];
            if (skill.type === 'missile') ammo = this.ci;
		} else {
            name = isEng ? this.getName(true) : this.getName() + 'の';
            isBasic = true;
		}

        let third = isEng && (itemThrown || missile || skill || this.id !== ROGUE);
        do {
            let [dmg, rate, atCur] = skill && skill.type === 'spell' ?
                [this.calcSkillValue(skill, lvl, enemy), 100, null] :
                this.calcAttack(enemy, skill, lvl, itemThrown, ammo);
            let msgDmg;
            let msgAT;
            let msgName = name;
            let miss = !dmg || enemy.indestructible || this.id !== ROGUE && enemy.boss;
            if (isBasic) {
                msgAT = this.getAttackTypeName(atCur, isEng, third);
                if (!isEng) msgName += msgAT;
            } else if (isEng) {
                msgAT = 'hit' + (third ? 's' : '');
            }

            if (miss) {
                msgDmg = isEng ? 'miss' : '外れた';
                if (third) msgDmg += 'es';
            } else {
                msgDmg = isEng ? msgAT : `${dmg}のダメージを与えた`;
                enemy.hp -= dmg;
			}
			
            if (missile || itemThrown) {
                let item = ammo || itemThrown;
                let drop = miss || item.indestructible || evalPercentage(50);
                this.deleteAmmo(item, drop, enemy.x, enemy.y);
			}
            
            let msg = isEng ?
                `${msgName} ${msgDmg} ${nameE}` + (!miss ? ' by '+ dmg : '') :
                `${msgName}は${nameE}に${msgDmg}`;
            if (rogue.isWizard) {
                msg += isEng ? ` (hit rating ${rate})` : ` (命中率 ${rate})`;
            }

            message.draw(msg);
            count++;
            if (flag.dash || flag.rest) flag.dash = flag.rest = false;
            if (!skill || skill.type !== 'spell') {
                if (!dmg) continue;
                if (this.stealLife) {
                    let percent = this.stealLife > 100 ? 1 : this.stealLife / 100;
                    this.hp += Math.ceil(dmg * percent);
                    if (this.hp > this.hpMax) this.hp = this.hpMax;
				}
				
                if (this.stealMana) {
                    let percent = this.stealMana > 100 ? 1 : this.stealMana / 100;
                    let mp = Math.ceil(dmg * percent);
                    if (mp > enemy.mp) mp = enemy.mp;
                    if (enemy.mod !== UNIQUE) enemy.mp -= mp;
                    this.mp += mp;
                    if (this.mp > this.mpMax) this.mp = this.mpMax;
				}
				
                if (this.dmgFire) this.getElementEffect('fire', 1, enemy);
                if (this.dmgLightning) this.getElementEffect('lightning', 1, enemy);
                if (this.dmgPoison) this.getElementEffect('poison', 1, enemy);
                if (this.dmgAcid) this.getElementEffect('acid', 1, enemy);
                if (this.cursed && evalPercentage(50 - (enemy.lvl - this.lvl))) enemy.gotCursed();
                if (this.atkCon && evalPercentage(this.atkCon)) this.haveCast(CONFUSION, 1, enemy);
                if (this.atkPara && evalPercentage(this.atkPara)) this.haveCast(PARALYSIS, 1, enemy);
                if (this.atkSlow && evalPercentage(this.atkSlow)) this.haveCast(SLOW, 10, enemy);
                if (this.atkInf && evalPercentage(this.atkInf)) this.haveCast(INFECTION, 1, enemy);
                if (this.atkBlind && evalPercentage(this.atkBlind)) this.haveCast(BLINDNESS, 1, enemy);
                if (this.atkRadi && evalPercentage(this.atkRadi)) this.haveCast(RADIATION, 1, enemy);
                if (this.atkCold && evalPercentage(this.atkCold)) this.haveCast(COLD, 1, enemy);
                if (this.atkDrain && evalPercentage(this.atkDrain - (enemy.lvl - this.lvl))) enemy.decayOrRestore(EXP, false, this.expGain, this);
                if (!skill && !missile && !this.confused) {
                    if (this.atkStealGold && evalPercentage(this.atkStealGold)) if (this.stealGold(enemy)) count = NaN;
                    if (count && this.atkStealItem && evalPercentage(this.atkStealItem)) if (this.stealItem(enemy)) count = NaN;
                }
			}
			
            if (!itemThrown && (!skill || skill.type !== 'spell')) {
                if (this.decreaseDurab(true)) count = NaN;
			}
			
            enemy.decreaseDurab();
            if (skill && skill.effect && (enemy.hp > 0 && !miss || skill.effect.self)
                && evalPercentage(skill.effect.prob)) this.haveCast(skill.effect.id, lvl, enemy);
            if (enemy.hp <= 0) {
                enemy.died(this);
                break;
			}
			
            if (enemy.sleeping) enemy.wakeUp();
            if (this.id === ROGUE) this.getCe(enemy, !missile && !skill);
            if (skill) this.getElementEffect(skill.element, lvl, enemy)
            if (skill || itemThrown) break;
        } while (missile && this.timesMissile > count && ammo.quantity > count ||
			!missile && this.timesMelee > count
		);
    }

    getAttackTypeName(at, isEng, third) {
        let name;
        if (at === AT_S) {
            name = isEng ? 'slash' : '斬撃';
        } else if (at === AT_T) {
            name = isEng ? 'thrust' : '刺突';
        } else if (at === AT_B) {
            name = isEng ? 'beat' : '打撃';
        }

        if (third) name = getArticleAndPlural(name, true);
        return name;
    }

    dig(loc) {
        let digging;
        if (this.atkType & AT_T) {
            digging = 3;
		} else if (this.atkType & AT_S) {
            digging = 2;
		} else if (this.atkType & AT_B) {
			digging = 1;
		}

        if (this.digging) digging *= 10 * (1 + this.digging / 100);
        if (!loc.indestructible) loc.wall -= digging;
        this.decreaseDurab(true);
        audio.playSound('dig');
        if (loc.wall <= 0) {
            loc.deleteWall(true);
            rogue.lightenOrDarken('Lighten');
        }
    }

    getElementEffect(element, lvl, e) {
        let id;
        switch (element) {
            case 'fire':
            case 'lightning':
            case 'acid':
                e.decreaseDurab(false, element);
                return;
            case 'poison':
                id = POISON;
                break;
            case 'sand':
            case 'light':
                id = BLINDNESS;
                break;
            case 'cold':
            case 'blizzard':
                id = COLD;
                break;
            case 'infection':
                id = INFECTION;
                break;
            case 'gravity':
                id = SLOW;
                break;
            case 'radiation':
                id = RADIATION;
                break;
		}
		
        if (id) this.haveCast(id, lvl, e);
    }

    calcSkillValue(skill, lvl, enemy, avg) {
        let value;
        let lvlSy = flag.skill && skill.synerzy ? this.getSynerzy(skill) : 0;
        let resist = enemy ? enemy[skill.element] : 0;
        let rate = skill.rate * lvl + skill.synerzy * lvlSy;
        if (skill.kind === 'breath') {
            value = this.hp * BREATH_RATE * (1 + rate / 100);
		} else if (isFinite(skill.base)) {
            value = skill.base + rate;
        } else {
            let base = avg ? minMax.getAvg(skill.base) : minMax.roll(skill.base);
            value = base * (1 + rate / 100);
		}
        
        let limit = skill.limit;
        if (limit && value > limit) value = limit;
        return Math.ceil(value * (1 - resist / 100));
    }

    calcSkillDur(skill, lvl, avg) {
        let base = avg ? minMax.getAvg(skill.durBase) : minMax.roll(skill.durBase);
        return base + skill.durRate * lvl;
    }

    calcResist() {
        this.fireSum = this.fireMax + this.fireBuff + this.lowerRes;
        this.waterSum = this.waterMax + this.waterBuff + this.lowerRes;
        this.airSum = this.airMax + this.airBuff + this.lowerRes;
        this.earthSum = this.earthMax + this.earthBuff + this.lowerRes;
        this.poisonSum = this.poisonMax + this.poisonBuff + this.lowerRes;
        let fire = this.fireSum >= 100 ? 100 : this.fireSum;
        let water = this.waterSum >= 100 ? 100 : this.waterSum;
        let air = this.airSum >= 100 ? 100 : this.airSum;
        let earth = this.earthSum >= 100 ? 100 : this.earthSum;
        let poison = this.poisonSum >= 100 ? 100 : this.poisonSum;
        let limit = 75;
        this.fire = fire >= limit ? limit : fire;
        this.water = water >= limit ? limit : water;
        this.air = air >= limit ? limit : air;
        this.earth = earth >= limit ? limit : earth;
        this.poison = poison >= limit ? limit : poison;
        this.light = Math.floor(fire / 2);
        this.cold = Math.floor(water / 2);
        this.lightning = Math.floor(air / 2);
        this.gravity = Math.floor(earth / 2);
        this.infection = Math.floor(poison / 2);
        this.sand = Math.floor(earth / 4 + air / 4);
        this.blizzard = Math.floor(water / 4 + air / 4);
        this.acid = Math.floor(water / 4 + poison / 4);
        this.magma = Math.floor(fire / 4 + earth / 4);
        this.radiation = Math.floor(fire / 4 + poison / 4);
        this.physicalMax = Math.floor(earth / 4 + this.acRed);
        this.physical = Math.floor(this.physicalMax + this.physicalBuff + this.physicalNerf);
        if (this.physical > limit) this.physical = limit;
    }

    getSkillBoost(skill) {
        let boost = 0;
        switch (skill.element) {
            case 'fire':
            case 'light':
                boost = this.skillFire;
                break;
            case 'water':
            case 'cold':
                boost = this.skillWater;
                break;
            case 'air':
            case 'lightning':
                boost = this.skillAir;
                break;
            case 'earth':
            case 'gravity':
                boost = this.skillEarth;
                break;
            case 'poison':
            case 'infection':
                boost = this.skillPoison;
                break;
            case 'sand':
                boost = this.skillEarth + this.skillAir;
                break;
            case 'blizzard':
                boost = this.skillWater + this.skillAir;
                break;
            case 'acid':
                boost = this.skillWater + this.skillPoison;
                break;
            case 'magma':
                boost = this.skillFire + this.skillEarth;
                break;
            case 'radiation':
                boost = this.skillFire + this.skillPoison;
                break;
		}
		
        boost += this.skillAll;
        return Math.floor(boost);
    }

    getSynerzy(skill) {
        let synerzy = 0;
        if (skill.type === 'melee') {
            synerzy = this.synerzyMelee;
		} else if (skill.type === 'missile') {
            synerzy = this.synerzyMissile;
        } else {
            switch (skill.element) {
                case 'fire':
                case 'light':
                    synerzy = this.synerzyFire;
                    break;
                case 'water':
                case 'cold':
                    synerzy = this.synerzyWater;
                    break;
                case 'air':
                case 'lightning':
                    synerzy = this.synerzyAir;
                    break;
                case 'earth':
                case 'gravity':
                    synerzy = this.synerzyEarth;
                    break;
                case 'poison':
                case 'infection':
                    synerzy = this.synerzyPoison;
                    break;
                case 'sand':
                    synerzy = this.synerzyAir + this.synerzyEarth;
                    break;
                case 'blizzard':
                    synerzy = this.synerzyWater + this.synerzyAir;
                    break;
                case 'acid':
                    synerzy = this.synerzyWater + this.synerzyPoison;
                    break;
                case 'magma':
                    synerzy = this.synerzyFire + this.synerzyEarth;
                    break;
                case 'radiation':
                    synerzy = this.synerzyFire + this.synerzyPoison;
                    break;
            }
		}
		
        return Math.floor(synerzy);
    }

    calcWeightLimit() {
        this.weightLimit = 25 + this.str * 3 / 5;
        if (this.weightLimit > MAX_WEIGHT_LIMIT) this.weightLimit = MAX_WEIGHT_LIMIT;
        this.calcSpeed();
    }

    calcSpeed() {
        this.totalWeight = Math.round(this.totalWeight * 100) / 100;
        this.spd = this.spdMax + this.spdBuff + this.spdNerf -
            (this.totalWeight > this.weightLimit ?
                Math.ceil(this.totalWeight - this.weightLimit) * 10 : 0);
        if (this.spd > 100) this.spd = 100;
    }

    // getConditionColor() {
    //     return this.sleeping ? colorList.royalblue :
    //         this.paralyzed ? colorList.orange :
    //         this.confused ? colorList.yellow :
    //         this.blinded ? colorList.gray :
    //         this.hallucinated ? colorList.purple :
    //         this.canceled ? colorList.white :
    //         this.infected ? colorList.infection :
    //         this.poisoned ? colorList.poison :
    //         colorList.red;
    // }

    calcCondition() {
        let name = this.getName(true);
        let dec = this.mod === UNIQUE ? 5 : 1;
        if (this.poisoned) {
            if (!this.indestructible) this.hp -= Math.floor(this.poisonedVal * (1 - this.poison / 100));
            if (this.hp <= 0) {
                let fighter;
                if (this.poisonedId && this.poisonedId !== this.id) {
                    fighter = this.poisonedId === ROGUE ? rogue : map.enemyList[this.poisonedId];
                }

                this.poisonedId = 0;
                this.died(fighter);
                return null;
            }
            
            this.poisoned -= dec;
            if (this.poisoned <= 0) {
                this.poisoned = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from poison` :
                    `${name}毒状態から復帰した`);
            }
            
            if (flag.dash || flag.rest) flag.dash = flag.rest = false;
		}
		
        if (this.confused) {
            this.confused -= dec;
            if (this.confused <= 0) {
                this.confused = 0;
                if (this.id !== ROGUE) this.removeCe();
                message.draw(option.isEnglish() ?
                    `${name} recovered from confusion` :
                    `${name}混乱状態から復帰した`);
			}
		}
		
        if (this.paralyzed) {
            this.paralyzed -= dec;
            if (this.paralyzed <= 0) {
                this.paralyzed = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from paralysis` :
                    `${name}麻痺状態から復帰した`);
			}
		}
		
        if (this.sleeping > 0) {
            this.sleeping -= dec;
            if (this.sleeping <= 0) {
                this.sleeping = 0;
                this.wakeUp();
            }
		}
		
        if (this.blinded) {
            this.blinded -= dec;
            if (this.blinded <= 0) {
                this.blinded = 0;
                if (this.id === ROGUE) {
                    this.goBlind(true);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from blindness` :
                    `${name}盲目状態から復帰した`);
			}
		}
		
        if (this.infected > 0) {
            this.infected -= dec;
            if (coinToss()) this.decayOrRestore();
            if (this.infected <= 0) {
                this.infected = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from infection` :
                    `${name}感染状態から復帰した`);
			}
		}
		
        if (this.hallucinated) {
            this.hallucinated -= dec;
            if (this.hallucinated <= 0) {
                this.hallucinated = 0;
                if (this.id === ROGUE) {
                    hallucinate.all(true);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from hallucination` :
                    `${name}幻覚状態から復帰した`);
			}
		}
		
        if (this.canceled) {
            this.canceled -= dec;
            if (this.canceled <= 0) {
                this.canceled = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from cancellation` :
                    `${name}封印状態から復帰した`);
			}
		}
		
        if (this.seeInvisible > 0) {
            if (--this.seeInvisible === 0) {
                message.draw(option.isEnglish() ?
                    `${name} can no longer see invisible things` :
                    `${name}もう透明な物体を見ることが出来なくなった`);
                seeInvisible(false);
			}
		}
		
        if (this.invisibility) {
            if (--this.invisibility === 0) {
                this.invisible = false;
			}
		}
		
        if (this.ecco) {
            if (--this.ecco === 0) {
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Ecco` :
                    `${name}エコーの効果を失った`);
			}
		}
		
        if (this.enchantSelfDur) {
            if (--this.enchantSelfDur === 0) {
                this.dmgBonus -= this.enchantSelf;
                this.rateBonus -= this.enchantSelf;
                this.acBonus -= this.enchantSelf;
                this.ias -= this.enchantSelf;
                this.enchantSelf = 0;
                this.calcDmg();
                this.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Enchant Self` :
                    `${name}自己強化の効果を失った`);
			}
		}
		
        if (this.venomDur) {
            if (--this.venomDur === 0) {
                this.dmgPoison -= this.venom;
                this.venom = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Venom Hands` :
                    `${name}猛毒の手の効果を失った`);
			}
		}
		
        if (this.confusing) {
            if (--this.confusing === 0) {
                this.atkCon = 0;
                let name = this.getName(true);
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Touch of Confusion` :
                    `${name}混乱の手の効果を失った`);
			}
		}
		
        if (this.spdBuffDur) {
            this.spdBuffDur -= dec;
            if (this.spdBuffDur <= 0) {
                this.spdBuffDur = 0;
                this.spdBuff = 0;
                this.calcSpeed();
            }
		}
		
        if (this.spdNerfDur) {
            if (--this.spdNerfDur === 0) {
                this.spdNerf = 0;
                this.calcSpeed();
            }
		}
		
        if (this.hpRegBuffDur) {
            if (--this.hpRegBuffDur === 0) {
                this.hpReg -= this.hpRegBuff;
                this.hpRegBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Life Regeneration` :
                    `${name}再生の効果を失った`);
            }
		}
		
        if (this.mpRegBuffDur) {
            if (--this.mpRegBuffDur === 0) {
                this.mpReg -= this.mpRegBuff;
                this.mpRegBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Mana Regeneration` :
                    `${name}魔力再生の効果を失った`);
            }
		}
		
        if (this.mfBuffDur) {
            if (--this.mfBuffDur === 0) {
                this.mf -= this.mfBuff;
                this.mfBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Magic Finding` :
                    `${name}魔法具探求の効果を失った`);
            }
		}
		
        if (this.gfBuffDur) {
            if (--this.gfBuffDur === 0) {
                this.gf -= this.gfBuff;
                this.gfBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Gold Finding` :
                    `${name}財宝探求の効果を失った`);
            }
		}
		
        if (this.expBuffDur) {
            if (--this.expBuffDur === 0) {
                this.expBonus -= this.expBuff;
                this.expBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Experience` :
                    `${name}経験の効果を失った`);
            }
		}
		
        if (this.skillBuffDur) {
            if (--this.skillBuffDur === 0) {
                this.skillAll -= this.skillBuff;
                this.skillBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Skill` :
                    `${name}スキルの効果を失った`);
            }
		}
		
        let resist;
        if (this.fireBuffDur) {
            if (--this.fireBuffDur === 0) {
                this.fireBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Fire` :
                    `${name}耐火の効果を失った`);
                resist = true;
            }
		}
		
        if (this.waterBuffDur) {
            if (--this.waterBuffDur === 0) {
                this.waterBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Water` :
                    `${name}耐水の効果を失った`);
                resist = true;
            }
		}
		
        if (this.airBuffDur) {
            if (--this.airBuffDur === 0) {
                this.airBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Air` :
                    `${name}耐風の効果を失った`);
                resist = true;
            }
		}
		
        if (this.earthBuffDur) {
            if (--this.earthBuffDur === 0) {
                this.earthBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Earth` :
                    `${name}耐土の効果を失った`);
                resist = true;
            }
		}
		
        if (this.poisonBuffDur) {
            if (--this.poisonBuffDur === 0) {
                this.poisonBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Poison` :
                    `${name}耐毒の効果を失った`);
                resist = true;
            }
		}
		
        if (this.physicalBuffDur) {
            if (--this.physicalBuffDur === 0) {
                this.physicalBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Physical` :
                    `${name}耐物の効果を失った`);
                resist = true;
            }
		}
		
        if (this.lowerResDur) {
            this.lowerResDur -= dec;
            if (this.lowerResDur <= 0) {
                this.lowerResDur = 0;
                this.lowerRes = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from the effect of Lower Resist` :
                    `${name}耐性低下の効果から復帰した`);
                resist = true;
            }
		}
		
        if (resist) this.calcResist();
        if (this.dmgBuffDur) {
            if (--this.dmgBuffDur === 0) {
                this.dmgBuff = this.rateBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Combat` :
                    `${name}戦闘の効果を失った`);
            }
            this.calcDmg();
		}
		
        if (this.acBuffDur) {
            if (--this.acBuffDur === 0) {
                this.acBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Armor` :
                    `${name}防護の効果を失った`);
            }
            this.calcAc();
		}
		
        if (this.stuckTrap) {
            if (--this.stuckTrap === 0) {
                message.draw(option.isEnglish() ?
                    `${name} can move again` :
                    `${name}動けるようになった`);
            }
		}
		
        if (this.teleported && evalPercentage(this.teleported)) this.haveCast(TELEPORTATION, 10, this);
    }

    decayOrRestore(stat, restore, exp, enemy) {
        let name = this.getName(true);
        switch (stat >= 0 ? stat : rndInt(3)) {
            case STR:
                if (restore) {
                    if (this.str < this.strMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the strength` :
                            `${name}筋力が元に戻った`);
                        this.str = this.strMax;
                    }
                } else if (this.strSus || !(this.str - this.strBonus)) {
                    return;
				} else {
                    this.str -= rndIntBet(1, 5);
                    if (this.str - this.strBonus < 0) this.str = this.strBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got weak` :
                        `${name}薄弱になった`);
				}
				
                this.calcWeightLimit();
                this.calcDmg();
                break;
            case DEX:
                if (restore) {
                    if (this.dex < this.dexMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the dexterity` :
                            `${name}器用さが元に戻った`);
                        this.dex = this.dexMax;
                    }
                } else if (this.dexSus || !(this.dex - this.dexBonus)) {
                    return;
				} else {
                    this.dex -= rndIntBet(1, 5);
                    if (this.dex - this.dexBonus < 0) this.dex = this.dexBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got clumsy` :
                        `${name}不器用になった`);
				}
				
                this.calcAc();
                this.calcDmg();
                break;
            case CON:
                if (restore) {
                    if (this.con < this.conMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the constitution` :
                            `${name}耐久力が元に戻った`);
                        this.con = this.conMax;
                    }
                } else if (this.conSus || !(this.con - this.conBonus)) {
                    return;
				} else {
                    this.con -= rndIntBet(1, 5);
                    if (this.con - this.conBonus < 0) this.con = this.conBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got sick` :
                        `${name}病弱になった`);
				}
				
                this.calcHP();
                break;
            case INT:
                if (restore) {
                    if (this.int < this.intMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the intelligence` :
                            `${name}知力が元に戻った`);
                        this.int = this.intMax;
                    }
                } else if (this.intSus || !(this.int - this.intBonus)) {
                    return;
				} else {
                    this.int -= rndIntBet(1, 5);
                    if (this.int - this.intBonus < 0) this.int = this.intBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got stupid` :
                        `${name}愚鈍になった`);
				}
				
                this.calcMP();
                break;
            case EXP:
                if (restore) {
                    if (this.exp < this.expMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the experience` :
                            `${name}経験値が元に戻った`);
                        this.exp = this.expMax;
                        this.lvl = this.lvlMax;
                    }
                } else if (!this.exp || evalPercentage(this.con * 2 / 5)) {
                    return;
				} else {
                    if (exp > this.exp) exp = this.exp;
                    this.exp -= exp;
                    if (enemy) {
                        enemy.exp += exp;
                        if (enemy.exp > enemy.expMax) enemy.exp = enemy.expMax;
                    }
                    while (this.exp < calcLevel(this.lvl)) this.lvl--;
                    message.draw(option.isEnglish() ?
                        `${name} got poor` :
                        `${name}貧弱になった`);
				}
				
                this.calcHP();
                this.calcMP();
                if (!restore) {
                    if (this.hp > this.hpMax) this.hp = this.hpMax;
                    if (this.mp > this.mpMax) this.mp = this.mpMax;
                }
        }
    }

    heal() {
        if (this.healCount++ !== 5) return;
        if (!this.poisoned && this.hp < this.hpMax) {
            this.hp += Math.ceil(this.hpMax * (this.con / 10 + this.hpReg) / 1000);
            if (this.hp > this.hpMax) this.hp = this.hpMax;
        }
        if (this.mp < this.mpMax) {
            this.mp += Math.ceil(this.mpMax * (this.int / 10 + this.mpReg) / 1000);
            if (this.mp > this.mpMax) this.mp = this.mpMax;
		}
		
        this.healCount = 0;
    }


    drawOrErase(draw, move) {
        let loc = map.coords[this.x][this.y];
        loc.fighter = draw ? this : null;
        if (this.id === ROGUE && draw) {
            this.lightenOrDarken('Lighten', move);
            this.distMap = pathfinding.main({
                x0: this.x,
                y0: this.y,
                map: true,
			});
        }
    }

    lightenOrDarken(type, search, init) {
        shadowcasting.main({
            x0: this.x,
            y0: this.y,
            radius: FOV,
            type: type,
            lightRad: this.lighten,
            search: search,
        });
    }

    replace(f) {
        this.drawOrErase(false);
        f.drawOrErase(false);
        [this.x, this.y, f.x, f.y] = [f.x, f.y, this.x, this.y];
        this.drawOrErase(true);
        f.drawOrErase(true);
        if (this.id === ROGUE) {
            map.coords[this.x][this.y].traces = ++this.numSteps;
		} else if (f.id === ROGUE) {
			map.coords[f.x][f.y].traces = ++f.numSteps;
		}
    }

    showInventory(place, a) {
        let list, dr, enter;
        switch (place) {
            case P_PACK:
                list = this.pack;
                dr = RIGHT; 
                break;
            case P_FLOOR:
                list = map.coords[this.x][this.y].item;
                dr = RIGHT; 
                break;
            case P_BOX:
                list = this.boxes;
                dr = LEFT;
                break;
            case P_SHOP:
            case P_STASH:
                enter = map.coords[this.x][this.y].enter;
                list = enter.list
                dr = LEFT;
                break;
            case P_CUBE:
                list = this.cube;
                dr = LEFT;
                break;
            case P_EQUIPMENT:
                this.equipmentList(BP[a]);
                return;
        }

        inventory.show({
            list: list,
            dr: dr,
            a: a,
            place: place,
            enter: enter,
        });
    }

    equipmentList(bp) {
        inventory.showEquipment(this, bp);
    }

    showSkill(list, bookmark) {
        inventory.showSkill(this, list, bookmark);
    }

    findBuffStat(key) {
        let found;
        switch (key) {
            case 'dmgAvg':
            case 'dmgSValue':
            case 'dmgTValue':
            case 'dmgBValue':
                if (this.dmgBuff) found = true;
                break;
            case 'rateValue':
                if (this.rateBuff) found = true;
                break;
            case 'acAvgValueTotal':
            case 'acSValueTotal':
            case 'acTValueTotal':
            case 'acBValueTotal':
                if (this.acBuff) found = true;
                break;
            case 'fire':
                if (this.fireBuff) found = true;
                break;
            case 'water':
                if (this.waterBuff) found = true;
                break;
            case 'air':
                if (this.airBuff) found = true;
                break;
            case 'earth':
                if (this.earthBuff) found = true;
                break;
            case 'poison':
                if (this.poisonBuff) found = true;
                break;
            case 'physical':
                if (this.physicalBuff) found = true;
                break;
            case 'spd':
                if (this.spdBuff) found = true;
                break;
            case 'hpReg':
                if (this.hpRegBuff) found = true;
                break;
            case 'mpReg':
                if (this.mpRegBuff) found = true;
                break;
            case 'mf':
                if (this.mfBuff) found = true;
                break;
            case 'gf':
                if (this.gfBuff) found = true;
                break;
            case 'skillAll':
                if (this.skillBuff) found = true;
                break;
            case 'dmgPoison':
                if (this.venom) found = true;
                break;
            case 'atkCon':
                if (this.confusing) found = true;
                break;
            case 'expBonus':
                if (this.expBuff) found = true;
                break;
            case 'dmgPoison':
                if (this.venom) found = true;
            case 'dmgBonus':
            case 'rateBonus':
            case 'acBonus':
            case 'ias':
                if (this.enchantSelf) found = true;
                break;
		}
		
        return found;
    }

    deletePackItem(a, number) {
        let item = this.pack[a];
        this.gainOrloseWeight(item, number);
        item.quantity -= number;
        if (!item.quantity) deleteAndSortItem(this.pack, a);
    }

    inventoryOut(item, quantity) {
        let list;
        switch (item.place) {
            case P_PACK:
                list = this.pack;
                break;
            case P_BOX:
                list = this.boxes;
                break;
            case P_EQUIPMENT:
                list = this.equipment;
                break;
            case P_FLOOR:
                list = map.coords[item.x][item.y].item;
                break;
		}
		
        item = item.split(quantity, list);
        if (item.place === P_FLOOR) {
            item.id = -1;
            item.x = item.y = 0;
            if (rogue.hallucinated) hallucinate.undoOne(item);
        } else {
			this.gainOrloseWeight(item, quantity);
		}

        if (item.place === P_EQUIPMENT && item.durab) {
            this.getOrLooseStats(item);
            this.calcAll();
		}
		
        return item;
    }

    gainOrloseWeight(item, quantity = item.quantity, gain) {
        this.totalWeight += item.weight * quantity * (gain ? 1 : -1);
        this.calcSpeed();
    }

    deleteBoxItem(i, quantity) {
        let item = this.boxes[i];
        item.quantity -= quantity;
        this.gainOrloseWeight(item, quantity);
        if (!item.quantity) this.boxes[i] = null;
    }

    deleteEquipment(parts, quantity) {
        let item = this.equipment[parts];
        item.quantity -= quantity;
        this.gainOrloseWeight(item, quantity);
        if (item.quantity) return;
        this.equipment[parts] = null;
        if (item.durab) {
            this.getOrLooseStats(item, false);
            this.calcAll();
        }
    }

    stashAdd(stash, item) {
        item.place = P_STASH;
        let key = this.canCarryItem(stash, item);
        if (key >= 0) {
            stash[key].quantity += item.quantity;
            return key;
		}
		
        let l = stash.length;
        stash[l] = item;
        return inventory.sort(l, stash, true); //stash page
    }

    packAdd(item) {
        if (!flag.pack && this.numBoxes) {
            if (this.listAdd(this.boxes, item)) {
                item.place = P_BOX;
                return true;
            }
		}
		
        if (this.listAdd(this.pack, item)) {
            item.place = P_PACK
            return true;
		}
		
        let l = Object.keys(this.pack).length;
        if (l < MAX_PACK_COUNT) {
            item.place = P_PACK
            this.pack[EA[l]] = item;
            inventory.sort(EA[l], this.pack);
            this.gainOrloseWeight(item, item.quantity, true)
            return true;
		}
		
        item.putDown(this.x, this.y, true);
        return false;
    }

    boxAdd(item, a) {
        let item2 = this.boxes[a];
        if (!item2) {
            item.place = P_BOX;
            this.boxes[a] = item;
        } else if (item2.equal(item)) {
            item2.quantity += item.quantity;
		} else {
            item.place = P_BOX;
            item2 = this.inventoryOut(item2, item2.quantity);
            this.packAdd(item2);
            this.boxes[a] = item;
		}
		
        this.gainOrloseWeight(item, item.quantity, true)
    }

    listAdd(list, item) {
        let a = this.canCarryItem(list, item);
        if (a !== undefined) {
            list[a].quantity += item.quantity;
            this.gainOrloseWeight(item, item.quantity, true)
		}
		
        return a;
    }

    canCarryItem(list, item) {
        let key;
        for (let key2 in list) {
            let item2 = list[key2];
            if (!item2) continue;
            if (item2.equal(item)) key = key2;
            if (key) break;
		}
		
        return key;
    }

    createItemIntoPack({
        uniqueId,
        starter,
        magic,
        lvl,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        quantity = 1,
    }) {
        for (let i = 0; i < times; i++) {
            this.packAdd(
                creation.item({
                    type: type,
                    tabId: tabId,
                    quantity: quantity,
                    position: LIST,
                    magic: magic,
                    lvl: lvl,
                    uniqueId: uniqueId,
                    starter: starter,
				})
			);
        }
    }

    getOrLooseStats(s, get, mod, starter) {
        let num = get ? 1 : -1;
        if (mod) { //enemy mod
            if (s.cursed) this.cursed = s.cursed;
            if (s.invisible) this.invisible = s.invisible;
		}
		
        if (s.dmgMinBonus) this.dmgMinBonus += num * s.dmgMinBonus;
        if (s.dmgMaxBonus) this.dmgMaxBonus += num * s.dmgMaxBonus;
        if (s.acBonus && (mod || !s.armor)) this.acBonus += num * s.acBonus;
        if (s.atkType) this.atkType = get ? s.atkType : this.atkBare;
        if (s.dmgBase) this.dmgBase = get ? s.dmgBase : this.dmgBare;
        if (s.acSBase) this.acSBaseSum += num * s.acSBase;
        if (s.acTBase) this.acTBaseSum += num * s.acTBase;
        if (s.acBBase) this.acBBaseSum += num * s.acBBase;
        if (s.dmgBonus) this.dmgBonus += num * s.dmgBonus;
        if (s.rateBonus) this.rateBonus += num * s.rateBonus;
        if (s.acSValue) this.acSValueSum += num * s.acSValue;
        if (s.acTValue) this.acTValueSum += num * s.acTValue;
        if (s.acBValue) this.acBValueSum += num * s.acBValue;
        if (s.acRed) this.acRed += num * s.acRed;
        if (s.str) this.str += num * s.str, this.strMax += num * s.str, this.strBonus += num * s.str;
        if (s.dex) this.dex += num * s.dex, this.dexMax += num * s.dex, this.dexBonus += num * s.dex;
        if (s.con) this.con += num * s.con, this.conMax += num * s.con, this.conBonus += num * s.con;
        if (s.int) this.int += num * s.int, this.intMax += num * s.int, this.intBonus += num * s.int;
        if (s.spd) this.spd += num * s.spd, this.spdMax += num * s.spd;
        if (s.mf) this.mf += num * s.mf;
        if (s.gf) this.gf += num * s.gf;
        if (s.hp) this.hpSum += num * s.hp;
        if (s.mp) this.mpSum += num * s.mp;
        if (s.hpRate) this.hpRate += num * s.hpRate;
        if (s.mpRate) this.mpRate += num * s.mpRate;
        if (s.fire) this.fireMax += num * s.fire;
        if (s.water) this.waterMax += num * s.water;
        if (s.air) this.airMax += num * s.air;
        if (s.earth) this.earthMax += num * s.earth;
        if (s.poison) this.poisonMax += num * s.poison;
        if (s.resistAll) {
            this.fireMax += num * s.resistAll;
            this.waterMax += num * s.resistAll;
            this.airMax += num * s.resistAll;
            this.earthMax += num * s.resistAll;
            this.poisonMax += num * s.resistAll;
        }

        if (s.skillFire) this.skillFire += num * s.skillFire;
        if (s.skillWater) this.skillWater += num * s.skillWater;
        if (s.skillAir) this.skillAir += num * s.skillAir;
        if (s.skillEarth) this.skillEarth += num * s.skillEarth;
        if (s.skillPoison) this.skillPoison += num * s.skillPoison;
        if (s.skillAll) this.skillAll += num * s.skillAll;
        if (s.iasBase) this.iasBase += num * s.iasBase;
        if (s.ias) this.ias += num * s.ias;
        if (s.fcrBase) this.fcrBase += num * s.fcrBase;
        if (s.frwBase) this.frwBase += num * s.frwBase;
        if (s.fcr) this.fcr += num * s.fcr;
        if (s.frw) this.frw += num * s.frw;
        if (s.hpReg) this.hpReg += num * s.hpReg;
        if (s.mpReg) this.mpReg += num * s.mpReg;
        if (s.digest) this.digest += num * s.digest;
        if (s.stealth) this.stealth += num * s.stealth;
        if (s.searching) this.searching += num * s.searching;
        if (s.levi) this.levi += num * s.levi;
        if (s.teleported) this.teleported += num * s.teleported;
        if (s.aggravating) this.aggravating += num * s.aggravating;
        if (s.strSus) this.strSus += num * s.strSus;
        if (s.dexSus) this.dexSus += num * s.dexSus;
        if (s.conSus) this.conSus += num * s.conSus;
        if (s.intSus) this.intSus += num * s.intSus;
        if (s.digging) this.digging += num * s.digging;
        if (s.dmgHuman) this.dmgHuman += num * s.dmgHuman;
        if (s.dmgDemon) this.dmgDemon += num * s.dmgDemon;
        if (s.dmgAnimal) this.dmgAnimal += num * s.dmgAnimal;
        if (s.dmgDragon) this.dmgDragon += num * s.dmgDragon;
        if (s.dmgUndead) this.dmgUndead += num * s.dmgUndead;
        if (s.dmgGiant) this.dmgGiant += num * s.dmgGiant;
        if (s.dmgSpirit) this.dmgSpirit += num * s.dmgSpirit;
        if (s.dmgGod) this.dmgGod += num * s.dmgGod;
        if (s.dmgFire) this.dmgFire += num * s.dmgFire;
        if (s.dmgLightning) this.dmgLightning += num * s.dmgLightning;
        if (s.dmgPoison) this.dmgPoison += num * s.dmgPoison;
        if (s.dmgAcid) this.dmgAcid += num * s.dmgAcid;
        if (s.stealLife) this.stealLife += num * s.stealLife;
        if (s.stealMana) this.stealMana += num * s.stealMana;
        if (s.atkCon) this.atkCon += num * s.atkCon;
        if (s.atkPara) this.atkPara += num * s.atkPara;
        if (s.atkSlow) this.atkSlow += num * s.atkSlow;
        if (s.atkInf) this.atkInf += num * s.atkInf;
        if (s.atkBlind) this.atkBlind += num * s.atkBlind;
        if (s.atkRadi) this.atkRadi += num * s.atkRadi;
        if (s.atkCold) this.atkCold += num * s.atkCold;
        if (s.atkDrain) this.atkDrain += num * s.atkDrain;
        if (s.atkStealGold) this.atkStealGold += num * s.atkStealGold;
        if (s.atkStealItem) this.atkStealItem += num * s.atkStealItem;
        if (s.expBonus) this.expBonus += num * s.expBonus;
        if (s.lighten && (!mod && s.fuelValue || mod)) {
            this.lighten += num * s.lighten;
            if (!mod && !starter) this.lightenOrDarken('Lighten');
		}
		
        if (s.numBoxes) {
            get ? this.getBoxes(s.numBoxes) : this.looseBoxes(s.numBoxes);
            this.numBoxes += num * s.numBoxes;
        }
    }

    getBoxes(numBoxes) {
        let num = this.numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes + numBoxes && i <= MAX_BOX_NUM; i++) {
            if (this.id === ROGUE) {
                Vue.set(vue.rogue.boxes, i, null)
            } else {
				this.boxes[i] = null;
            }
            let item = this.eqt[i];
            if (item) {
                this.boxAdd(item, i);
                delete this.eqt[i];
            }
        }

        if (Object.keys(this.eqt).length) {
            for (let key in this.eqt) {
                let item = this.eqt[key];
                if (!this.packAdd(item)) item.dropped();
			}
			
            this.eqt = {};
        }
    }

    looseBoxes(numBoxes) {
        let num = this.numBoxes - numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes && i <= MAX_BOX_NUM; i++) {
            let item = this.boxes[i];
            if (this.id === ROGUE) {
                Vue.delete(vue.rogue.boxes, i)
            } else {
                delete this.boxes[i];
            }

            if (!item) continue;
            this.gainOrloseWeight(item, item.quantity);
            if (flag.equip) {
                this.eqt[i] = item;
			} else if (!this.packAdd(item)) {
				item.dropped();
			}
        }
    }

    calcAll(equip) {
        this.calcHP();
        this.calcMP();
        this.calcWeightLimit();
        this.calcDmg(equip);
        this.calcAc();
        this.calcResist();
        this.calcMoveTimes();
    }

    haveCast(skillId, lvl, f = this, x, y) {
        let duration,
            name = f.getName(true),
            boss = f.boss,
            skill = skillMap.get(skillId);
        if (skill) {
            if (skill.kind === 'attack' || skill.kind === 'breath') {
                this.attack({
                    enemy: f,
                    skill: skill,
                    lvl: lvl,
                });
                
                return;
            }
            
            if (skill.durBase) duration = this.calcSkillDur(skill, lvl);
        }

        switch (skillId) {
            case HEAL:
            case EXTRA_HEAL: {
                let value = this.calcSkillValue(skill, lvl);
                let limit = f.hpMax - f.hp;
                if (value > limit) value = limit;
                f.hp += value;
                message.draw(option.isEnglish() ?
                    `${name} got well (+${value})` :
                    `${name}傷が癒えた(+${value})`);
                f.poisoned = 0;
                f.confused = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    this.goBlind(true);
				}
				
                if (skillId === EXTRA_HEAL) {
                    f.infected = 0;
                    if (f.hallucinated) {
                        f.hallucinated = 0;
                        if (f.id === ROGUE) hallucinate.all(true);
                    }
				}
				
                break;
            }
            case MANA: {
                let value = this.calcSkillValue(skill, lvl);
                let limit = f.mpMax - f.mp;
                if (value > limit) value = limit;
                f.mp += value;
                break;
            }
            case REJUVENATION: {
                let perc = this.calcSkillValue(skill, lvl);
                let hpValue = Math.ceil(f.hpMax * perc / 100);
                let mpValue = Math.ceil(f.mpMax * perc / 100);
                let hpLimit = f.hpMax - f.hp;
                let mpLimit = f.mpMax - f.mp;
                if (hpValue > hpLimit) hpValue = hpLimit;
                if (mpValue > mpLimit) mpValue = mpLimit;
                f.hp += hpValue;
                f.mp += mpValue;
                break;
            }
            case LIFE_REGENERATION:
                f.hpReg -= f.hpRegBuff;
                f.hpRegBuff = this.calcSkillValue(skill, lvl);
                f.hpReg += f.hpRegBuff;
                f.hpRegBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Life Regeneration` :
                    `${name}再生の効果を得た`);
                break;
            case MANA_REGENERATION:
                f.mpReg -= f.mpRegBuff;
                f.mpRegBuff = this.calcSkillValue(skill, lvl);
                f.mpReg += f.mpRegBuff;
                f.mpRegBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Mana Regeneration` :
                    `${name}魔力再生の効果を得た`);
                break;
            case WEAKNESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STR);
                break;
            case CLUMSINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(DEX);
                break;
            case SICKLINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(CON);
                break;
            case STUPIDITY:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(INT);
                break;
            case RESTORE_STRENGTH:
                f.decayOrRestore(STR, true);
                break;
            case RESTORE_DEXTERITY:
                f.decayOrRestore(DEX, true);
                break;
            case RESTORE_CONSTITUTION:
                f.decayOrRestore(CON, true);
                break;
            case RESTORE_INTELLIGENCE:
                f.decayOrRestore(INT, true);
                break;
            case RESTORE_EXPERIENCE:
                f.decayOrRestore(EXP, true);
                break;
            case RESTORE_ALL:
                f.decayOrRestore(STR, true);
                f.decayOrRestore(DEX, true);
                f.decayOrRestore(CON, true);
                f.decayOrRestore(INT, true);
                f.decayOrRestore(EXP, true);
                break;
            case CURE_ALL:
                f.confused = f.canceled = f.poisoned = f.infected = f.paralyzed = f.sleeping = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ROGUE) f.goBlind(true);
				}
				
                if (f.hallucinated) {
                    f.hallucinated = 0;
                    if (f.id === ROGUE) hallucinate.all(true);
				}
				
                if (f.spdNerfDur) {
                    f.spdNerfDur = 0;
                    f.spdNerf = 0;
                    f.calcSpeed();
                }

                break;
            case RESIST_FIRE:
                f.fireBuff = this.calcSkillValue(skill, lvl);
                f.fireBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Fire` :
                    `${name}耐火の効果を得た`);
                f.calcResist();
                break;
            case RESIST_WATER:
                f.waterBuff = this.calcSkillValue(skill, lvl);
                f.waterBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Water` :
                    `${name}耐水の効果を得た`);
                f.calcResist();
                break;
            case RESIST_AIR:
                f.airBuff = this.calcSkillValue(skill, lvl);
                f.airBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Air` :
                    `${name}耐風の効果を得た`);
                f.calcResist();
                break;
            case RESIST_EARTH:
                f.earthBuff = this.calcSkillValue(skill, lvl);
                f.earthBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Earth` :
                    `${name}耐土の効果を得た`);
                f.calcResist();
                break;
            case RESIST_POISON:
                f.poisonBuff = this.calcSkillValue(skill, lvl);
                f.poisonBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Poison` :
                    `${name}耐毒の効果を得た`);
                f.calcResist();
                break;
            case RESIST_ALL:
                f.fireBuff = f.waterBuff = f.airBuff = f.earthBuff = f.poisonBuff = this.calcSkillValue(skill, lvl);
                f.fireBuffDur = f.waterBuffDur = f.airBuffDur = f.earthBuffDur = f.poisonBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist All` :
                    `${name}全耐性の効果を得た`);
                f.calcResist();
                break;
            case RESIST_PHYSICAL:
                f.physicalBuff = this.calcSkillValue(skill, lvl);
                f.physicalBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Physical` :
                    `${name}耐物の効果を得た`);
                f.calcResist();
                break;
            case LOWER_RESIST:
                if (evalPercentage(f.poison)) return;
                f.lowerRes = this.calcSkillValue(skill, lvl);
                f.lowerResDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Lower Resist` :
                    `${name}耐性低下の効果を受けた`);
                f.calcResist();
                break;
            case ENLIGHTENMENT:
                if (f.id !== ROGUE) return;
                map.lighten();
                break;
            case WORMHOLE:
                inventory.clear();
                input.eventFlag(88); //examine
                flag.wormhole = true;
                return null;
            case SHORT_TELEPORTATION:
                f.teleport(true);
                break;
            case TELEPORTATION:
                f.teleport(false, MIN_TELE_RAD_SQ);
                break;
            case TELEPORT_AWAY:
                f.teleport(false, this.calcSkillValue(skill, lvl) ** 2);
                break;
            case TELEPORT_TO:
                f.teleport(false, false, this.x, this.y);
                break;
            case REMOVE_CURSE:
                for (let key in f.equipment) {
                    let item = f.equipment[key];
                    if (item && item.cursed) item.uncurse();
				}
				
                break;
            case IDENTIFY: {
                input.switchFlag();
                flag.identify = true;
                let msg = message.get(M_IDENTIFY) + message.get(M_FLOOR);
                this.showInventory(P_PACK);
                this.equipmentList();
                message.draw(msg, true);
                return null;
            }
            case DISINTEGRATION:
                input.switchFlag();
                flag.disint = true;
                message.draw(message.get(M_DISINTEGRATION), true);
                return null;
            case RESTORE_DURABILITY: {
                input.switchFlag();
                flag.repair = true;
                let msg = message.get(M_REPAIR) + message.get(M_FLOOR);
                this.showInventory(P_PACK);
                this.equipmentList();
                message.draw(msg, true);
                return null;
            }
            case REPAIR_ALL:
                this.repairAll();
                break;
            case LIGHT:
                shadowcasting.main({
                    x0: this.x,
                    y0: this.y,
                    radius: this.calcSkillValue(skill, lvl),
                    type: 'Light',
				});
				
                rogue.lightenOrDarken('Lighten');
                break;
            case MAGIC_MAPPING:
                audio.playSound('probe');
            case MONSTER_DETECTION:
            case ITEM_DETECTION:
            case SCREAM:
                circleSearch.main({
                    x0: this.x,
                    y0: this.y,
                    type: skillId,
                    radius: this.calcSkillValue(skill, lvl),
                });

                if (skillId === ITEM_DETECTION) audio.playSound('probe2');
                break;
            case EARTHQUAKE: {
                let perc = this.calcSkillValue(skill, lvl);
                circleSearch.main({
                    x0: this.x,
                    y0: this.y,
                    type: skillId,
                    radius: skill.radius,
                    perc: perc,
				});
                
                map.drawShadow();
                rogue.litMapIds = {};
                rogue.lightenOrDarken('Lighten');
                break;
            }
            case SATISFY_HUNGER:
                f.hunger += MAX_HUNGER * this.calcSkillValue(skill, lvl) / 100;
                if (f.hunger > MAX_HUNGER) f.hunger = MAX_HUNGER;
                break;
            case TOWN_PORTAL: {
                let portal = new Portal();
                portal.init(LOCATION, this.x, this.y);
                message.draw(option.isEnglish() ?
                    `Created a Town Portal` :
                    `タウン・ポータルを生成した`);
                break;
            }
            case SPEED:
                f.spdBuff = this.calcSkillValue(skill, lvl);
                f.spdBuffDur = duration;
                f.calcSpeed();
                message.draw(option.isEnglish() ?
                    `${name} speeded up` :
                    `${name}加速した`);
                audio.playSound('speed');
                break;
            case ECCO:
                f.ecco = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Ecco` :
                    `${name}エコーの効果を得た`);
                break;
            case POISON: {
                if (evalPercentage(f.poison)) return;
                let value = this.calcSkillValue(skill, lvl);
                f.poisonedVal = value;
                f.poisoned = duration;
                f.poisonedId = this.id;
                message.draw(option.isEnglish() ?
                    `${name} got poisoned(-${value})` :
                    `${name}毒を受けた(-${value})`);
                break;
            }
            case RADIATION:
                if (boss || evalPercentage(f.radiation)) return;
                f.decayOrRestore();
                break;
            case SLOW:
            case GRAVITATIONAL_FIELD:
                if (boss || evalPercentage(f.gravity)) return;
                f.spdNerf = this.calcSkillValue(skill, lvl);
                f.spdNerfDur = duration;
                f.calcSpeed();
                message.draw(option.isEnglish() ?
                    `${name} slowed down` :
                    `${name}減速した`);
                audio.playSound('slow');
                break;
            case CONFUSION:
                if (boss || evalPercentage(f.poison)) return;
                f.confused = duration;
                message.draw(option.isEnglish() ?
                    `${name} got confused` :
                    `${name}混乱した`);
                break;
            case TOUCH_OF_CONFUSION:
                f.atkCon = this.calcSkillValue(skill, lvl);
                f.confusing = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Touch of Confusion` :
                    `${name}混乱の手の効果を得た`);
                break;
            case VENOM_HANDS:
                if (f.venom) f.dmgPoison -= f.venom;
                f.venom = this.calcSkillValue(skill, lvl);
                f.dmgPoison += f.venom;
                f.venomDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Venom Hands` :
                    `${name}猛毒の手の効果を得た`);
                break;
            case ENCHANT_SELF:
                if (f.enchantSelf) {
                    f.dmgBonus -= f.enchantSelf;
                    f.rateBonus -= f.enchantSelf;
                    f.acBonus -= f.enchantSelf;
                    f.ias -= f.enchantSelf;
				}
				
                f.enchantSelf = this.calcSkillValue(skill, lvl);
                f.enchantSelfDur = duration;
                f.dmgBonus += f.enchantSelf;
                f.rateBonus += f.enchantSelf;
                f.acBonus += f.enchantSelf;
                f.ias += f.enchantSelf;
                f.calcDmg();
                f.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Enchant Self` :
                    `${name}自己強化の効果を得た`);
                break;
            case PARALYSIS:
            case HOLD_MONSTER:
                if (boss || evalPercentage(f.poison)) return;
                f.paralyzed = duration;
                message.draw(option.isEnglish() ?
                    `${name} got paralyzed` :
                    `${name}麻痺した`);
                audio.playSound('paralyze');
                break;
            case SLEEP:
            case SLEEPING_GAS:
                if (boss || evalPercentage(f.poison)) return;
                f.sleeping = duration;
                message.draw(option.isEnglish() ?
                    `${name} fell asleep` :
                    `${name}昏睡した`);
                break;
            case BLINDNESS:
                if (boss || evalPercentage(f.poison)) return;
                f.blinded = duration;
                if (f.id === ROGUE) f.goBlind();
                message.draw(option.isEnglish() ?
                    `${name} got blinded` :
                    `${name}盲目になった`);
                audio.playSound('blind');
                break;
            case INVISIBILITY:
                if (boss || f.invisible) return;
                f.invisibility = duration;
                f.invisible = true;
                break;
            case SEE_INVISIBLE:
                f.seeInvisible = duration;
                if (f.id === ROGUE) seeInvisible(true);
                message.draw(option.isEnglish() ?
                    `${name} can see invisible things` :
                    `${name}透明の物体が見えるようになった`);
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ROGUE) f.goBlind(true);
				}
				
                break;
            case INFECTION:
                if (boss || evalPercentage(f.infection)) return;
                f.infected = duration;
                message.draw(option.isEnglish() ?
                    `${name} got infected` :
                    `${name}感染した`);
                break;
            case HALLUCINATION:
            case HALLUCINATING_MIST: {
                if (boss || evalPercentage(f.poison)) return;
                let found;
                if (!f.hallucinated && f.id === ROGUE) found = true;
                f.hallucinated = duration;
                if (f.id !== ROGUE) f.removeCe();
                if (found) hallucinate.all();
                message.draw(option.isEnglish() ?
                    `${name} got hallucinated` :
                    `${name}幻覚状態になった`);
                audio.playSound('hallucinate');
                break;
            }
            case POLYMORPH: {
                if (f.id === ROGUE || f.mod === UNIQUE || evalPercentage(f.poison)) return;
                let [tempX, tempY] = [f.x, f.y];
                f.died();
                creation.enemy({
                    position: LOCATION,
                    x: tempX,
                    y: tempY,
                    summon: true,
                    noGroup: true,
				});
				
                message.draw(option.isEnglish() ?
                    `${name} got polymorphed` :
                    `${name}変容した`);
                break;
            }
            case CANCELLATION:
                if (boss || evalPercentage(f.poison)) return;
                f.canceled = duration * (f.mod !== UNIQUE ? 1 : 2);
                if (f.invisible) {
                    if (f.invisible !== DEFAULT) f.invisibility = 0;
                    f.invisible = false;
				}
				
                if (f.mimic && !f.identified) {
                    hallucinate.undoOne(f);
                    f.identified = true;
				}
				
                message.draw(option.isEnglish() ?
                    `${name} got canceled` :
                    `${name}封印された`);
                break;
            case RAISE_LEVEL:
                if (f.lvl !== MAX_FIGHTER_LVL) f.gainExp(calcLevel(f.lvl + 1) - f.exp, true);
                break;
            case CREATE_MONSTER:
            case CREATE_MAGIC_MONSTER:
            case CREATE_GIANT: {
                let type;
                if (skillId === CREATE_MONSTER || skillId === CREATE_MAGIC_MONSTER) {
                    type = RANDOM;
				} else if (skillId === CREATE_GIANT) {
					type = 'giants';
				}

                creation.enemy({
                    times: rndIntBet(1, 3),
                    type: type,
                    position: LOCATION,
                    x: this.x,
                    y: this.y,
                    summon: true,
                    magic: skillId === CREATE_MAGIC_MONSTER,
				});
				
                audio.playSound('summon');
                break;
            }
            case CREATE_TRAP:
                creation.trap(5, RANDOM, LOCATION, this.x, this.y);
                break;
            case MAGIC_CIRCLE_OF_PROTECTION:
                creation.trap(1, 0, LOCATION, this.x, this.y, true);
                break;
            case MAGIC_FINDING:
                f.mf -= f.mfBuff;
                f.mfBuff = this.calcSkillValue(skill, lvl);
                f.mf += f.mfBuff;
                f.mfBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Magic Finding` :
                    `${name}魔法具探求の効果を得た`);
                break;
            case GOLD_FINDING:
                f.gf -= f.gfBuff;
                f.gfBuff = this.calcSkillValue(skill, lvl);
                f.gf += f.gfBuff;
                f.gfBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Gold Finding` :
                    `${name}財宝探求の効果を得た`);
                break;
            case EXPERIENCE:
                if (f.expBuff) f.expBonus -= f.expBuff;
                f.expBuff = this.calcSkillValue(skill, lvl);
                f.expBonus += f.expBuff;
                f.expBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Experience` :
                    `${name}経験の効果を得た`);
                break;
            case SKILL:
                if (f.skillBuff) f.skillAll -= f.skillBuff;
                f.skillBuff = this.calcSkillValue(skill, lvl);
                f.skillAll += f.skillBuff;
                f.skillBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Skill` :
                    `${name}スキルの効果を得た`);
                break;
            case ENCOURAGEMENT:
                f.dmgBuff = f.rateBuff = this.calcSkillValue(skill, lvl);
                f.dmgBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Combat` :
                    `${name}戦闘の効果を得た`);
                f.calcDmg();
                audio.playSound('encourage');
                break;
            case BLESSING:
                f.acBuff = this.calcSkillValue(skill, lvl);
                f.acBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Armor` :
                    `${name}守護の効果を得た`);
                f.calcAc();
                break;
            case RESPEC:
                if (f.mod === UNIQUE) return;
                f.respec();
                break;
            case COLD:
            case FREEZE: {
                if (f.cost > COST_REGULAR * 2 || evalPercentage(f.cold)) return;
                let cost = COST_REGULAR * (skillId === FREEZE ? 2 : 1) - f.cold * 5;
                if (f.mod === UNIQUE) cost /= 5;
                f.cost += cost;
                break;
            }
            case ACCELERATION:
                this.cost -= rndIntBet(100, 300);
                break;
            case STONE_TO_MUD: {
                if (map.coords[x][y].isObstacle()) {
                    let loc = map.coords[x][y];
                    if (loc.wall) {
                        loc.deleteWall(true);
					} else {
						loc.deleteDoor(true);
					}

                    rogue.lightenOrDarken('Lighten');
                    audio.playSound('dig', distanceSq(this.x, this.y, x, y));
				}
				
                if (f.material === M_STONE) {
                    this.attack({
                        enemy: f,
                        skill: skill,
                        lvl: lvl,
                    });
				}
				
                break;
            }
        }
    }

    aim({
        x1,
        y1,
        nameSkill,
        ecco,
        key = null,
    }) {
        if (key === 'x') {
            if (this.blinded) {
                message.draw(message.get(M_CANT_EXAMINE));
                return;
			}
			
            flag.examine = true;
            cursor.init();
            map.coords[rogue.x][rogue.y].getInfo();
            return;
		}
		
        if (key !== null) {
            if (key === 't') {
                [x1, y1] = [this.x, this.y];
			} else {
                var dr = getDirection(key);
                if (dr === null) return;
            }
		}
		
        let skill, lvl;
        if (flag.zap) {
            var w = this.ci;
            this.ci = null;
            nameSkill = w.nameSkill;
            skill = skillMap.get(nameSkill);
            lvl = w.skillLvl;
            let name = w.getName(false, 1);
            message.draw(option.isEnglish() ?
                `Zapped ${name}` :
                `${name}を振った`);
        } else if (flag.skill) {
            if (!nameSkill) nameSkill = this.cs.id;
            skill = skillMap.get(nameSkill);
            lvl = this.cs.lvl + this.getSkillBoost(skill);
            let name = skill.name[option.getLanguage()];
            let nameChar = this.getName(true);
            this.consumeMana(skill);
            message.draw(option.isEnglish() ?
                `${nameChar} cast ${name}` :
                skill.type === 'spell' ?
                `${nameChar}${name}を唱えた` :
                `${nameChar}${name}を放った`);
            if (skill.type === 'missile') audio.playSound('shoot');
            audio.playSound(skill.element);
        } else if (flag.scroll) {
            nameSkill = this.ci.nameSkill;
            skill = skillMap.get(nameSkill);
            lvl = this.ci.skillLvl;
        } else if (flag.throw) {
            let name = this.ci.getName(false, 1);
            message.draw(option.isEnglish() ?
                `Threw ${name}` :
                `${name}を投げた`);
                audio.playSound('throw');
		} else if (flag.arrow) {
            audio.playSound('shoot');
        }
		
        let thrown = flag.arrow || flag.throw;
        if (flag.zap && !w.charges) {
            message.draw(message.get(M_NOTHING_HAPPENED));
            flag.zap = false;
        } else {
            let found = false;
            let hit = false;
            let [xS, yS] = [this.x, this.y];
            if (thrown || skill.range !== 0) {
                let loc;
                let parabora = !dr && (thrown || skill.parabora);
                let rangeSq = !thrown && skill.range ? skill.range ** 2 : FOV_SQ;
                if (dr)[x1, y1] = [this.x + dr.x * FOV, this.y + dr.y * FOV];
                var [x0, xT, y0, yT] = [this.x, this.x, this.y, this.y]
                var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
                if (steep)[x0, y0, x1, y1] = [y0, x0, y1, x1];
                let [dx, dy] = [Math.abs(x1 - x0), Math.abs(y1 - y0)];
                let error = dx / 2;
                let ystep = y0 < y1 ? 1 : -1;
                let y = y0;
                let los = true;
                let inc = x0 < x1 ? 1 : -1;
                for (let x = x0 + inc; x1 - x + inc; x += inc) {
                    error -= dy;
                    if (error < 0) {
                        y += ystep;
                        error += dx;
					}
					
                    [xS, yS] = !steep ? [x, y] : [y, x];
                    loc = map.coords[xS][yS];
                    if (distanceSq(x, y, x0, y0) > rangeSq) {
                        los = false;
                        break;
					}
                    
                    if (!thrown && skill.each) {
                        if (!loc.isObstacle())
                            shadowcasting.main({
                                x0: xS,
                                y0: yS,
                                radius: skill.radius,
                                type: nameSkill,
                                lvl: lvl,
                                fighter: this,
							});
                    } else if ((!parabora || parabora && x === x1 && y === y1) &&
                        loc.fighter && (this.isOpponent(loc.fighter))) {
                        let fighter = loc.fighter;
                        hit = true;
                        if (thrown) {
                            if (flag.arrow) {
                                this.attack({
                                    enemy: fighter,
                                    missile: true,
                                });
                            } else if (flag.throw) {
                                this.haveThrown(this.ci, fighter, xS, yS);
                            }

                            break;
						}
						
                        if (skill.radius) {
                            shadowcasting.main({
                                x0: xS,
                                y0: yS,
                                radius: skill.radius,
                                type: nameSkill,
                                lvl: lvl,
                                fighter: this,
                            });
						} else {
							this.haveCast(nameSkill, lvl, fighter, xS, yS);
						}

                        if (flag.zap && !w.identified && !skill.wall) found = true;
                        if (!skill.penetrate) break;
					}
					
                    if (loc.isObstacle()) {
                        los = false;
                        break;
					}
					
                    [xT, yT] = [xS, yS];
				}
				
                if (!los) {
                    if (!thrown && skill.wall &&
                      		(loc.wall && !loc.indestructible ||
                            loc.isClosedDoor())) {
                        this.haveCast(nameSkill, lvl, undefined, xS, yS);
                        if (flag.zap && !w.identified) found = true;
                    } else {
						[xS, yS] = [xT, yT];
					}
                }
			}
			
            if (flag.died) return;
            if (!thrown && skill.radius && (!hit || skill.penetrate)) {
                shadowcasting.main({
                    x0: xS,
                    y0: yS,
                    radius: skill.radius,
                    type: nameSkill,
                    lvl: lvl,
                    fighter: this,
				});
			}

            if (thrown) {
                if (!hit) this.deleteAmmo(this.ci, true, xS, yS);
                flag.arrow = flag.throw = false;
            } else if (flag.skill) {
                if (!ecco && this.ecco && this.mp >= skill.mp) {
                    if (steep)[x1, y1] = [y1, x1];
                    this.aim({
                        x1: x1,
                        y1: y1,
                        nameSkill: nameSkill,
                        ecco: true,
					});
					
                    return;
				}
				
                if (skill.move) {
                    if (nameSkill === RAID && hit) {
                        this.teleport(false, false, xT, yT, true);
					} else if (nameSkill === RUSH || nameSkill === SPIRAL || nameSkill === COLLAPSE) {
						this.teleport(false, false, xS, yS, true);
					}
                }
                if (skill.type === 'missile') this.deleteAmmo(this.ci);
                flag.skill = false;
            } else if (flag.scroll) {
                if (flag.aim) this.deleteItem(this.ci, 1);
                flag.scroll = false;
            } else if (flag.zap) {
                if (found) w.identifyWand();
                this.reduceItemCharge(w);
                flag.zap = false;
            }
		}
		
        if (this.id !== ROGUE) return;
        if (!flag.examine) {
             cursor.clearAll();
        }

        inventory.clear();
        rogue.done = true;
        flag.aim = false;
        flag.regular = true;
    }

    checkToCast(skill) {
        let msgId;
        let check = true;
        if (!skill) {
            if (!this.skill['a']) {
                msgId = M_DONT_HAVE_SKILL;
                check = false;
            } else if (this.canceled) {
                msgId = M_CANT_CAST;
                check = false;
            } else if (!this.canRead(true)) {
				check = false;
			}
        } else if (this.id === ROGUE && !this.haveBook(skill.id)) {
            msgId = M_DONT_HAVE_BOOK;
            check = false;
        } else if (skill.mp > this.mp) {
            msgId = M_DONT_HAVE_MANA;
            check = false;
        } else if (skill.type === 'missile') {
            if (!this.haveMissile(true)) {
                check = false;
            } else {
                this.ci = this.getAmmo(this.equipment['main'].throwType);
                if (!this.ci) {
                    msgId = M_DONT_HAVE_AMMO;
                    check = false;
                }
            }
        } else if (skill.type === 'melee' && this.haveMissile()) {
            msgId = M_DONT_HAVE_MELEE;
            check = false;
		}
		
        if (this.id === ROGUE && msgId) message.draw(message.get(msgId));
        return check;
    }

    canRead(book) {
        let found = true;
        if (this.blinded || this.confused || !rogue.litMapIds[this.x + ',' + this.y]) {
            if (this.id === ROGUE) {
                let id = book ? M_CANT_READ_BOOK : M_CANT_READ_SCROLL;
                message.draw(message.get(id));
			}
			
            found = false;
		}
		
        return found;
    }

    haveBook(nameSkill) {
        let found = this.haveBookLoop(this.pack, nameSkill);
        if (!found) found = this.haveBookLoop(this.boxes, nameSkill);
        return found;
    }

    haveBookLoop(list, nameSkill) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === 'book') {
				if (nameSkill && item.skill) {
                    for (let key2 in item.list) {
                        if (item.list[key2] === nameSkill) return true
                    }
                }
            }
        }
    }

    castSelfSpell(skill, ecco) {
        let lvl = this.cs.lvl + this.getSkillBoost(skill);
        let name = this.getName(true);
        let nameSkill = skill.name[option.getLanguage()];
        message.draw(option.isEnglish() ?
            `${name} cast ${nameSkill}` :
            skill.type === 'spell' ?
            `${name}${nameSkill}を唱えた` :
            `${name}${nameSkill}を放った`);
        if (this.haveCast(skill.id, lvl, this) === null) return null;
        this.consumeMana(skill);
        if (!ecco && this.ecco && this.mp >= skill.mp && skill.id !== ECCO) this.castSelfSpell(skill, true);
    }

    searchSkill(id) {
        for (let key in this.skill) {
            if (this.skill[key].id === id) return key;
		}
		
        return false;
    }

    consumeMana(skill) {
        this.cost -= this['spd' + getUpperCase(skill.type)];
        this.mp -= skill.mp;
    }

    haveMissile(msg) {
        let found = true;
        if (!this.equipment['main'] || this.equipment['main'].type !== 'missile') {
            if (msg) message.draw(message.get(M_DONT_HAVE_MISSILE));
            found = false;
		}
		
        return found;
    }

    getAmmo(throwType) {
        let item = this.getAmmoLoop(this.boxes, throwType);
        if (!item) item = this.getAmmoLoop(this.pack, throwType);
        if (!item) item = this.getAmmoLoop(map.coords[this.x][this.y].item, throwType);
        return item;
    }

    getAmmoLoop(list, throwType) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === 'ammo' && item.throwType === throwType) return item;
		}
		
        return null;
    }

    deleteAmmo(item, drop, x, y) {
        if (!drop) {
            this.deleteItem(item, 1);
		} else {
            item = this.inventoryOut(item, 1);
            item.putDown(x, y, true);
            this.ci = null;
        }
    }

    deleteItem(item, quantity) {
        if (flag.scroll) {
            flag.scroll = false;
            if (item.chargeBook) {
                this.reduceItemCharge(item);
                return;
            }
		}
		
        switch (item.place) {
            case P_PACK:
                this.deletePackItem(item.indexOf(this.pack), quantity);
                break;
            case P_BOX:
                this.deleteBoxItem(item.indexOf(this.boxes), quantity);
                break;
            case P_FLOOR:
                let loc = map.coords[item.x][item.y];
                loc.deleteItem(item.indexOf(loc.item), quantity);
                break;
            case P_EQUIPMENT:
                this.deleteEquipment(item.indexOf(this.equipment), quantity);
                break;
		}
		
        this.ci = null;
    }

    reduceItemCharge(item) {
        if (item.quantity > 1) {
            item = this.inventoryOut(item, 1);
            item.charges--;
            if (item.identified) item.changePrice();
            if ((item.place === P_PACK || item.place === P_BOX) && !this.packAdd(item)) {
                item.dropped();
			} else if (item.place === P_FLOOR) {
				item.putDown(item.x, item.y, true);
			}
        } else {
            item.charges--;
            if (item.identified) {
                item.changePrice();
                if (item.place === P_PACK) inventory.sort(this.getItemIndex(item), this.pack);
            }
        }
    }

    getItemIndex(item) {
        let a;
        switch (item.place) {
            case P_PACK:
                a = item.indexOf(this.pack);
                break;
            case P_BOX:
                a = item.indexOf(this.boxes);
                break;
            case P_FLOOR:
                let loc = map.coords[item.x][item.y];
                a = item.indexOf(loc.item);
                break;
            case P_EQUIPMENT:
                a = item.indexOf(this.equipment);
                break;
		}
		
        return a;
    }

    swap() {
        let name = this.getName(true);
        if (this.equipment['main'] && this.equipment['main'].cursed ||
      	    	this.equipment['off'] && this.equipment['off'].cursed) {
            let verb;
            if (this.equipment['main'] && this.equipment['main'].cursed) {
                verb = option.isEnglish() ? 'unwield' : '離す';
			} else {
				verb = option.isEnglish() ? 'take off' : '外す';
			}

            message.draw(option.isEnglish() ?
                `${name} can't ${verb} the cursed item` :
                `${name}呪われたアイテムを${verb}事が出来ない`);
            return null;
		}
		
        let itemMain = this.equipment['main'];
        let itemOff = this.equipment['off'];
        let itemSideA = this.side['a'];
        let itemSideB = this.side['b'];
        if (itemMain && itemMain.durab) this.getOrLooseStats(itemMain, false);
        if (itemOff && itemOff.durab) this.getOrLooseStats(itemOff, false);
        if (itemSideA && itemSideA.durab) this.getOrLooseStats(itemSideA, true);
        if (itemSideB && itemSideB.durab) this.getOrLooseStats(itemSideB, true);
        [this.equipment['main'], this.equipment['off'], this.side['a'], this.side['b']] = [itemSideA, itemSideB, itemMain, itemOff];
        this.calcAll();
        this.swapped = !this.swapped;
        message.draw(option.isEnglish() ?
            `${name} swapped gear` :
            `${name}装備を持ち替えた`);
        audio.playSound('grab');
        if (this.id !== ROGUE) return;
        rogue.done = true;
        this.equipmentList();
        flag.clearInv = true;
    }

    stealGold(enemy) {
        if (!enemy.purse || evalPercentage(enemy.dex * 2 / 5)) return;
        let amount = Item.goldAmount(this.lvl);
        if (amount < enemy.purse / 50) {
            amount = enemy.purse / 50;
		} else if (amount > enemy.purse) {
			amount = enemy.purse;
		}

        amount = Math.ceil(amount);
        enemy.purse -= amount;
        this.createItemIntoPack({
            type: 'coin',
            tabId: C_COIN,
            quantity: amount,
		});
		
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} stole $${amount}` :
            `${name}$${amount}を盗んだ`);
        this.teleport(false, MIN_TELE_RAD_SQ);
        return true;
    }

    stealItem(enemy) {
        if (evalPercentage(enemy.dex * 2 / 5)) return;
        let { pack, box } = enemy.haveItem();
        if (!pack && !box) return;
        if (pack && box) {
            pack = coinToss();
            box = !pack;
		}
		
        let item;
        if (pack) {
            let a = EA[rndInt(Object.keys(enemy.pack).length - 1)];
            item = enemy.pack[a];
        } else {
            let nums = enums(1, enemy.numBoxes);
            nums.shuffle();
            for (let i = 0; i < enemy.numBoxes; i++) {
                if (enemy.boxes[nums[i]]) {
                    item = enemy.boxes[nums[i]];
                    break;
                }
            }
		}
		
        item = enemy.inventoryOut(item, 1);
        this.packAdd(item);
        let nameItem = item.getName();
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} stole ${nameItem}` :
            `${name}${nameItem}を盗んだ`);
        this.teleport(false, MIN_TELE_RAD_SQ);
        return true;
    }

    haveItem() {
        let pack = !!this.pack['a'];
        let box;
        for (let key in this.boxes) {
            if (this.boxes[key]) {
                box = true;
                break;
            }
		}
		
        return { pack, box };
    }

    decreaseDurab(weapon, element) {
        let item = this.equipment[weapon ? 'main' : BP[EA[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
        if (!item || !item.durab || item.indestructible) return;
        let value;
        if (element) {
            let mat;
            switch (element) {
                case 'acid':
                    mat = M_METAL;
                    break;
                case 'fire':
                    mat = M_CLOTH | M_FUR | M_FEATHER | M_SKIN | M_SCALE | M_WOOD;
                    break;
                case 'lightning':
                    mat = M_BONE | M_SHELL | M_GEM | M_STONE | M_HORN;
                    break;
            }

            if (item.material & mat) value = rndIntBet(1, 5);
        } else if (evalPercentage(5)) {
            value = 1;
		}

        if (!value) return;
        item.durab -= value;
        if (item.durab < 0) item.durab = 0;
        if (item.durab) return;
        this.getOrLooseStats(item);
        this.calcAll();
        let name = item.getName();
        audio.playSound('broken');
        message.draw(option.isEnglish() ?
            `${name} broke` :
            `${name}は壊れた`);
        return true;
    }

    gotCursed() {
        let item = this.equipment[BP[EA[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
        if (!item || item.cursed) return;
        let name = item.getName();
        message.draw(option.isEnglish() ?
            `${name} is cursed` :
            `${name}は呪われた`);
        item.cursed = true;
        audio.playSound('curse');
    }

    gainSynerzy(skill, point) {
        if (skill.type === 'melee') {
            this.synerzyMelee += point;
		} else if (skill.type === 'missile') {
            this.synerzyMissile += point;
        } else {
            switch (skill.element) {
                case 'fire':
                case 'light':
                    this.synerzyFire += point;
                    break;
                case 'water':
                case 'cold':
                    this.synerzyWater += point;
                    break;
                case 'air':
                case 'lightning':
                    this.synerzyAir += point;
                    break;
                case 'earth':
                case 'gravity':
                    this.synerzyEarth += point;
                    break;
                case 'poison':
                case 'infection':
                    this.synerzyPoison += point;
                    break;
                case 'sand':
                    this.synerzyAir += point / 2;
                    this.synerzyEarth += point / 2;
                    break;
                case 'blizzard':
                    this.synerzyWater += point / 2;
                    this.synerzyAir += point / 2;
                    break;
                case 'magma':
                    this.synerzyFire += point / 2;
                    this.synerzyEarth += point / 2;
                    break;
                case 'radiation':
                    this.synerzyFire += point / 2;
                    this.synerzyPoison += point / 2;
                    break;
                case 'acid':
                    this.synerzyWater += point / 2;
                    this.synerzyPoison += point / 2;
            }
        }
    }

    decreaseEnergy() {
        this.energy -= this.cost * (1 + (this.spd < 0 ? -this.spd / 100 : 0)) + rndIntBet(-100, 100);
        if (this.cost !== COST_REGULAR) this.cost = COST_REGULAR;
        map.queue.update(this);
    }

    increaseEnergy() {
        this.energy += COST_REGULAR * (1 + (this.spd > 0 ? this.spd / 100 : 0)) + rndIntBet(-100, 100);
    }

    teleport(short, radiusSq, x, y, mute) {
        this.drawOrErase(false);
        if (!short && !radiusSq) {
            this.spiralSearch(x, y, 'fighter');
		} else {
            let l;
            let lSaved = short ? NaN : 0;
            let [tempX, tempY] = [this.x, this.y];
            let count = 0;
            do {
                this.getPositionRandomly(false, false, true);
                l = distanceSq(this.x, this.y, tempX, tempY);
                if (short && !(l >= lSaved) || !short && l > lSaved) {
                    [x, y] = [this.x, this.y];
                    lSaved = l;
                }
            } while ((short && (l > MIN_TELE_RAD_SQ || l < 16) ||
					!short && l <= radiusSq) && ++count < 100
			);

            if (count >= 100)[this.x, this.y] = [x, y];
		}
		
        this.drawOrErase(true);
        if (this.sleeping) this.sleeping = 0;
        if (!mute) {
            let distance = distanceSq(this.x, this.y, rogue.x, rogue.y);
            audio.playSound('teleport', distance);
		}
		
        if (this.id === ROGUE) {
            let loc = map.coords[this.x][this.y];
            loc.traces = ++this.numSteps;
            loc.getInfo();
        }
    }


    wakeUp() {
        this.sleeping = 0;
        if (this.id !== ROGUE && !this.isShowing()) return;
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} woke up` :
            `${name}目覚めた`);
        if (flag.dash || flag.rest) flag.dash = flag.rest = false;
    }

    getParts(item, starter) {
        let parts, partsEquipped;
        switch (item.type) {
            case 'melee':
            case 'missile':
            case 'staff':
                if (item.twoHanded) {
                    if (this.equipment.main && this.equipment.off) {
                        if (this.id === ROGUE) message.draw(message.get(M_TWO_HANDED));
                        return;
                    } else if (this.equipment.main) {
                        partsEquipped = 'main';
                    } else if (this.equipment.off) {
                        partsEquipped = 'off';
                    }
                } else if (this.equipment.main) {
                    partsEquipped = 'main';
				}
				
                parts = 'main';
                break;
            case 'shield':
                if (this.equipment.main && this.equipment.main.twoHanded) {
                    partsEquipped = 'main';
                } else if (this.equipment.off) {
                    partsEquipped = 'off';
				}
				
                parts = 'off';
                break;
            case 'amulet':
                if (this.equipment.neck) partsEquipped = 'neck';
                parts = 'neck';
                break;
            case 'ring':
                if (this.equipment['R-ring'] && this.equipment['L-ring']) {
                    partsEquipped = 'R-ring';
                    parts = 'R-ring';
                } else {
                    parts = this.equipment['R-ring'] ? 'L-ring' : 'R-ring';
                }
				
                break;
            case 'light':
                if (this.equipment.light) partsEquipped = 'light';
                parts = 'light';
                break;
            case 'armor':
                if (this.equipment.body) partsEquipped = 'body';
                parts = 'body';
                break;
            case 'cloak':
                if (this.equipment.back) partsEquipped = 'back';
                parts = 'back';
                break;
            case 'belt':
                if (this.equipment.waist) partsEquipped = 'waist';
                parts = 'waist';
                break;
            case 'helm':
                if (this.equipment.head) partsEquipped = 'head';
                parts = 'head';
                break;
            case 'gloves':
                if (this.equipment.hands) partsEquipped = 'hands';
                parts = 'hands';
                break;
            case 'boots':
                if (this.equipment.feet) partsEquipped = 'feet';
                parts = 'feet';
                break;
		}
		
        if (partsEquipped && (starter || this.unequip(false, partsEquipped) === null)) parts = null;
        return parts;
    }

    getStarterItems() {
        for (let itemInfo of this.starter) {
            let quantity = itemInfo.quantity ? itemInfo.quantity : 1;
            let itemNew = creation.item({
                type: itemInfo.type,
                tabId: itemInfo.tabId,
                quantity: quantity,
                position: LIST,
                lvl: this.lvl,
                uniqueId: itemInfo.uniqueId,
                starter: itemInfo.starter,
                matBase: itemInfo.matBase,
                matId: itemInfo.matId,
                magic: itemInfo.magic,
            });
            
            if (!itemNew.equipable || itemInfo.pack || !this.equipStarterItem(itemNew, itemInfo.side))
                this.packAdd(itemNew);
        }
    }

    equipStarterItem(item, side) {
        let equipped = false;
        if (side) {
            if (!this.side[side]) {
                this.side[side] = item;
                equipped = true;
            }
        } else {
            let parts = this.getParts(item, true);
            if (parts) {
                this.equipment[parts] = item;
                equipped = true;
            }
        }

        if (equipped) {
            item.place = P_EQUIPMENT;
            this.gainOrloseWeight(item, item.quantity, true);
            if (!side && item.durab) this.getOrLooseStats(item, true, false, true);
            return true;
        }
    }

    respec() {
        this.statPoints = this.skillPoints = this.lvl - 1;
        this.statPoints *= 5;
        this.strMax = 1 + this.strBonus;
        this.dexMax = 1 + this.dexBonus;
        this.conMax = 1 + this.conBonus;
        this.intMax = 1 + this.intBonus;
        this.str = this.strMax;
        this.dex = this.dexMax;
        this.con = this.conMax;
        this.int = this.intMax;
        this.skill = {}
        this.initSynerzy();
        this.calcAll();
        if (this.id === ROGUE) this.initBookmarks();
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} forgot everything` :
            `${name}自らを忘却した`)
    }

    searchCe() {
        shadowcasting.main({
            x0: this.x,
            y0: this.y,
            radius: FOV,
            type: 'Aim',
            fighter: this,
        });
    }

    getShootMsg(ammo) {
        let name = this.getName(true);
        let nameArrow = ammo.getName(false, 1);
        // if (option.isEnglish()) nameArrow = getArticleAndPlural(nameArrow, false, true, this.timesMissile);
        message.draw(option.isEnglish() ?
            `${name} shot ${nameArrow}` :
            `${name}${nameArrow}を放った`);
    }
}
