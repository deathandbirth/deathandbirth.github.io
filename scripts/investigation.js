const investigationMap = new Map([
    ['lvl', {
        name: { a: 'Level', b: 'レベル' },
        char: true,
        max: 'lvlMax',
    }],

    ['exp', {
        name: { a: 'Exp', b: '経験値' },
        char: true,
        max: 'expMax',
    }],

    ['expNext', {
        name: { a: 'Exp Next', b: '次経験値' },
        char: true,
    }],

    ['expGain', {
        name: { a: 'Exp Gain', b: '取得経験値' },
        char: true,
    }],

    ['totalWeight', {
        name: { a: 'Total Weight', b: '総重量' },
        char: true,
        weight: true,
        max: 'weightLimit',
    }],

    ['weight', {
        name: { a: 'Weight', b:'重量' },
        item: true,
        weight: true,
    }],

    ['charges', {
        name: { a: 'Charges', b:'充填数' },
        item: true,
    }],

    ['atkType', {
        name: { a: 'Attack Type', b: '攻撃種類' },
    }],

    ['dmgBase', {
        name: { a: 'Damage Base', b: 'ダメージ基礎値' },
    }],

    ['dmgAvg', {
        name: { a: 'Damage Average', b: 'ダメージ期待値' },
        char: true,
        equipList: true,
    }],

    ['rateValue', {
        name: { a: 'Hit Rating', b: '命中値' },
        char: true,
        equipList: true,
    }],

    ['acSValue', {
        name: { a: 'Slash Defence', b: '斬守備力 ' },
        item: true,
    }],

    ['acTValue', {
        name: { a: 'Thrust Defence', b: '突守備力 ' },
        item: true,
    }],

    ['acBValue', {
        name: { a: 'Blunt Defence', b: '打守備力 ' },
        item: true,
    }],

    ['acSValueTotal', {
        name: { a: 'Slash Defence', b: '斬守備力' },
        char: true,
        equipList: true,
    }],

    ['acTValueTotal', {
        name: { a: 'Thrust Defence', b: '突守備力' },
        char: true,
        equipList: true,
    }],

    ['acBValueTotal', {
        name: { a: 'Blunt Defence', b: '打守備力' },
        char: true,
        equipList: true,
    }],

    ['timesMelee', {
        name: { a: 'Melee Attack Times', b: '近接攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesMissile', {
        name: { a: 'Missile Attack Times', b: '遠隔攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesSpell', {
        name: { a: 'Spell Cast Speed', b: '魔法詠唱速度' },
        char: true,
        equipList: true,
    }],
    
    ['right', null],
    
    ['timesMove', {
        name: { a: 'Move Speed', b: '移動速度' },
        char: true,
        equipList: true,
    }],
    
    ['statPoints', {
        name: { a: 'Stat Points', b: 'ステータスポイント' },
        char: true,
        equipList: true,
    }],

    ['skillPoints', {
        name: { a: 'Skill Points', b: 'スキルポイント' },
        char: true,
        equipList: true,
    }],

    ['duration', {
        name: { a: 'Duration', b: '持続期間' },
        item: true,
    }],
    
    ['durationMax', {
        name: { a: 'Max Duration', b: '最大持続期間' },
        item: true,
    }],

    ['durab', {
        name: { a: 'Durability', b: '耐久度' },
        item: true,
        max: 'durabMax'
    }],

    ['iasBase', {
        name: { a: 'Base Attack Speed', b: '基礎攻撃速度' },
        item: true,
    }],
    
    ['fcrBase', {
        name: { a: 'Base Cast Speed', b: '基礎詠唱速度' },
        item: true,
    }],
    
    ['frwBase', {
        name: { a: 'Base Move Speed', b: '基礎移動速度' },
        item: true,
    }],
    
    ['material', {
        name: { a: 'Material', b: '素材' },
        item: true,
    }],
    
    ['embeddedNum', {
        name: { a: 'Embedded Number', b: '埋め込み数' },
        item: true,
        max: 'embeddedMax'
    }],
    
    ['mod', null],
    
    ['hp', {
        name: { a: 'Life', b: '体力' },
        plus: true,
        max: 'hpMax',
    }],
    
    ['mp', {
        name: { a: 'Mana', b: '魔力' },
        plus: true,
        max: 'mpMax',
    }],
    
    ['str', {
        name: { a: 'Strength', b: '筋力' },
        plus: true,
        max: 'strMax',
    }],
    
    ['dex', {
        name: { a: 'Dexterity', b: '器用さ' },
        plus: true,
        max: 'dexMax',
    }],
    
    ['con', {
        name: { a: 'Constitution', b: '耐久力' },
        plus: true,
        max: 'conMax',
    }],
    
    ['int', {
        name: { a: 'Intelligence', b: '知力' },
        plus: true,
        max: 'intMax',
    }],
    
    ['spd', {
        name: { a: 'Speed', b: '速度' },
        plus: true,
        max: 'spdMax',
    }],
    
    ['resistAll', {
        name: { a: 'Resist All', b: '全耐性' },
        plus: true,
        perc: true,
        item: true,
    }],
    
    ['fire', {
        name: { a: 'Fire Resist', b: '耐火' },
        plus: true,
        perc: true,
        max: 'fireMax',
        equipList: true,
    }],
    
    ['water', {
        name: { a: 'Water Resist', b: '耐水' },
        plus: true,
        perc: true,
        max: 'waterMax',
        equipList: true,
    }],
    
    ['air', {
        name: { a: 'Air Resist', b: '耐風' },
        plus: true,
        perc: true,
        max: 'airMax',
        equipList: true,
    }],
    
    ['earth', {
        name: { a: 'Earth Resist', b: '耐土' },
        plus: true,
        perc: true,
        max: 'earthMax',
        equipList: true,
    }],
    
    ['poison', {
        name: { a: 'Poison Resist', b: '耐毒' },
        plus: true,
        perc: true,
        max: 'poisonMax',
        equipList: true,
    }],
    
    ['end', null],
    
    ['skillFire', {
        name: { a: 'Fire Skill', b: '火スキル' },
        plus: true,
    }],
    
    ['skillWater', {
        name: { a: 'Water Skill', b: '水スキル' },
        plus: true,
    }],
    
    ['skillAir', {
        name: { a: 'Air Skill', b: '風スキル' },
        plus: true,
    }],
    
    ['skillEarth', {
        name: { a: 'Earth Skill', b: '土スキル' },
        plus: true,
    }],
    
    ['skillPoison', {
        name: { a: 'Poison Skill', b: '毒スキル' },
        plus: true,
    }],
    
    ['skillAll', {
        name: { a: 'All Skill ', b: '全スキル' },
        plus: true,
    }],
    
    ['synerzyMelee', {
        name: { a: 'Melee Synerzy', b: '近接シナジー' },
        char: true,
        plus: true,
        margin: true,
    }],
    
    ['synerzyMissile', {
        name: { a: 'Missile Synerzy', b: '遠隔シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyFire', {
        name: { a: 'Fire Spell Synerzy', b: '火魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyWater', {
        name: { a: 'Water Spell Synerzy', b: '水魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyAir', {
        name: { a: 'Air Spell Synerzy', b: '風魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyEarth', {
        name: { a: 'Earth Spell Synerzy', b: '土魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyPoison', {
        name: { a: 'Poison Spell Synerzy', b: '毒魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['ias', {
        name: { a: 'Increase Attack Speed', b: '攻撃速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['fcr', {
        name: { a: 'Faster Cast Rate', b: '詠唱速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['frw', {
        name: { a: 'Faster Run Walk', b: '早足' },
        plus: true,
        perc: true,
    }],
    
    ['digest', {
        name: { a: 'Slow Digestion', b: '遅消化' },
        plus: true,
        perc: true,
    }],
    
    ['stealth', {
        name: { a: 'Stealth', b: '隠密' },
        plus: true,
        perc: true,
    }],
    
    ['searching', {
        name: { a: 'Searching', b: '捜索' },
        plus: true,
        perc: true,
    }],
    
    ['hpReg', {
        name: { a: 'Life Regeneration', b: '再生' },
        plus: true,
        perc: true,
    }],
    
    ['mpReg', {
        name: { a: 'Mana Regeneration', b: '魔力再生' },
        plus: true,
        perc: true,
    }],
    
    ['mf', {
        name: { a: 'Magic Finding', b: '魔法具探求' },
        plus: true,
        perc: true,
    }],
    
    ['gf', {
        name: { a: 'Gold Finding', b: '財宝探求' },
        plus: true,
        perc: true,
    }],
    
    ['expBonus', {
        name: { a: 'Experience Bonus', b: '経験値加算値' },
        plus: true,
        perc: true,
    }],
    
    ['lighten', {
        name: { a: 'Lighten', b: '照明' },
        plus: true,
    }],
    
    ['durationBonus', {
        name: { a: 'Duration Bonus', b: '持続期間加算値' },
        item: true,
        plus: true,
    }],
    
    ['numBoxes', {
        name: { a: 'Slot numbers', b: 'スロット数' },
        plus: true,
    }],

    ['dmgDiceNum', {
        name: { a: 'Damage Dice Number', b: 'ダメージ・ダイス数' },
        plus: true,
    }],
    
    ['dmgDiceSides', {
        name: { a: 'Damage Dice Sides', b: 'ダメージ・ダイス面数' },
        plus: true,
    }],
    
    ['dmgBonus', {
        name: { a: 'Damage Bonus', b: 'ダメージ加算値' },
        plus: true,
        perc: true,
    }],
    
    ['rateBonus', {
        name: { a: 'Hit Rating Bonus', b: '命中率加算値' },
        plus: true,
        perc: true,
    }],
    
    ['acBonus', {
        name: { a: 'Defence Bonus', b: '守備力加算値' },
        plus: true,
        perc: true,
    }],
    
    ['durabBonus', {
        name: { a: 'Durability Bonus', b: '耐久度加算値' },
        item: true,
        plus: true,
    }],
    
    ['embeddedBonus', {
        name: { a: 'Embedded Bonus', b: '埋め込み加算値' },
        item: true,
        plus: true,
    }],
    
    ['digging', {
        name: { a: 'Digging', b: '採掘' },
        plus: true,
    }],
    
    ['dmgHuman', {
        name: { a: 'Damage to Human', b: '対人間ダメージ' },
        plus: true,
    }],
    
    ['dmgDemon', {
        name: { a: 'Damage to Demon', b: '対悪魔ダメージ' },
        plus: true,
    }],
    
    ['dmgAnimal', {
        name: { a: 'Damage to Animal', b: '対動物ダメージ' },
        plus: true,
    }],
    
    ['dmgDragon', {
        name: { a: 'Damage to Dragon', b: '対ドラゴンダメージ' },
        plus: true,
    }],
    
    ['dmgUndead', {
        name: { a: 'Damage to Undead', b: '対不死ダメージ' },
        plus: true,
    }],
    
    ['dmgGiant', {
        name: { a: 'Damage to Giant', b: '対巨人ダメージ' },
        plus: true,
    }],
    
    ['dmgSpirit', {
        name: { a: 'Damage to Spirit', b: '対精霊ダメージ' },
        plus: true,
    }],
    
    ['dmgFire', {
        name: { a: 'Fire Damage', b: '火ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgLightning', {
        name: { a: 'Lightning Damage', b: '電撃ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgPoison', {
        name: { a: 'Poison Damage', b: '毒ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgAcid', {
        name: { a: 'Acid Damage', b: '酸ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['stealLife', {
        name: { a: 'Life Steal', b: '生命力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['stealMana', {
        name: { a: 'Mana Steal', b: '魔力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['atkCon', {
        name: { a: 'Confusion Attack', b: '混乱攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkPara', {
        name: { a: 'Paralysis Attack', b: '麻痺攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkSlow', {
        name: { a: 'Slow Attack', b: '減速攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkInf', {
        name: { a: 'Infection Attack', b: '感染攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkBlind', {
        name: { a: 'Blindness Attack', b: '盲目攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkRadi', {
        name: { a: 'Radioactive Attack', b: '放射能攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkCold', {
        name: { a: 'Freezing Attack', b: '凍結攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkDrain', {
        name: { a: 'Drain Attack', b: '吸収攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealGold', {
        name: { a: 'Gold Steal', b: '金貨強奪' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealItem', {
        name: { a: 'Item Steal', b: 'アイテム強奪' },
        plus: true,
        perc: true,
    }],
    
    ['strSus', {
        name: { a: 'Sustain Strength', b: '筋力維持' },
        bool: true,
    }],
    
    ['dexSus', {
        name: { a: 'Sustain Dexterity', b: '器用さ維持' },
        bool: true,
    }],
    
    ['conSus', {
        name: { a: 'Sustain Constitution', b: '耐久力維持' },
        bool: true,
    }],
    
    ['intSus', {
        name: { a: 'Sustain Intelligence', b: '知力維持' },
        bool: true,
    }],
    
    ['levi', {
        name: { a: 'Levitation', b: '浮遊' },
        bool: true,
    }],
    
    ['indestructible', {
        name: { a: 'Indestructible', b: '破壊不能' },
        bool: true,
    }],
    
    ['teleported', {
        name: { a: 'Random Teleportation', b: 'ランダム・テレポート' },
        bool: true,
    }],
    
    ['aggravating', {
        name: { a: 'Aggravate Monster', b: '反感' },
        bool: true,
    }],
]);

const investigation = {
    main(obj, direction, char) {
        if (char && obj.mimic && !obj.identified) return;
        let inv = this.list[char ? 'fighter' : 'item'];
        inv.show = true;
        if (!char) {
            Vue.nextTick(function(){
                let ele = vue.$refs.investigationItem.$el;
                ele.style.left = direction === RIGHT ? '50%' : '0';
            });
        }

        let objVue = {};
        if (obj.shadow) objVue.shadow = obj.shadow;
        objVue.symbolColor = obj.color;
        objVue.symbol = obj.symbol;
        let nameColor;
        if (obj.cursed) {
            nameColor = colorList.red;
        } else if (obj.equipable && !obj.durab) {
            nameColor = colorList.gray;
        } else {
            nameColor = colorList.white;
        }

        objVue.nameColor = nameColor;
        objVue.name = char ? obj.getName(false, true) : obj.getName(false, 1);

        let desc = '';
        if (obj.desc) {
            desc = obj.desc[option.getLanguage()];
        } else if (obj.nameSkill) {
            desc = rogue.getSkillInfo(skillMap.get(obj.nameSkill), obj.skillLvl, true);
        }

        inv.desc = desc
        inv.obj = objVue;

        let embeddedList = [];
        let mod;
        let propList = [];
        for (let [key, term] of investigationMap.entries()) {
            if (!term) {
                if (key === 'mod' && !char) {
                    inv.basePropList = propList;    
                    propList = [];
                    mod = true;
                    if (obj.modParts) break;
				}
				
                continue;
			}

            if (!char && (term.char || mod&&!obj[key]) ||
                char && term.item ||
                obj[key] === undefined) {
				continue;
            }
            
            this.loop(obj, propList, char, key, term, obj[key], mod);
            if (key === 'embeddedNum' && obj[key]) {
                for (let k = 0, l = obj.embeddedList.length; k < l; k++) {
                    let itemVue = {};
                    let item = obj.embeddedList[k]
                    itemVue.symbol = item.symbol;
                    itemVue.symbolColor = item.color;
                    itemVue.name = item.getName();
                    if (item.shadow) itemVue.shadow = item.shadow;
                    if (item.cursed) itemVue.nameColor = colorList.red;
                    embeddedList.push(itemVue);
                }
			}
        }
        
        if (char) {
            inv.basePropList = propList;
            return;
        }

        inv.embeddedList = embeddedList;
        inv.modPropList = propList;
        let modPartsList = {};
        if (obj.modParts) {
            for (let key in obj.modParts) {
                propList = [];
                let objMod = obj.modParts[key];
                if (obj.type === 'orb') {
                    for (let key2 in objMod) {
                        let term = investigationMap.get(key2);
                        this.loop(obj, propList, false, key2, term, objMod[key2], true);
                    }
                } else {
                    let mod;
                    for (let [key2, term] of investigationMap.entries()) {
                        if (!mod || !term || term.char || !objMod[key2]) {
                            if (key2 === 'mod') mod = true;
                            continue;
                        }

                        this.loop(obj, propList, false, key2, term, objMod[key2], true);
                    }
                }

                let parts = option.isEnglish() ? key : translation.item[key];
                modPartsList[parts] = propList;
            }
        }

        inv.modPartsList = modPartsList;
    },

    loop(obj, propList, char, key, term, value, mod) {
        let prop = {};
        prop.text = term.name[option.getLanguage()];
        if (term.plus && !char && value > 0) value = '+' + value;
        if (term.perc) value += '%';
        if (term.weight) value += 'kg';
        if (key === 'atkType') {
            value = obj.getAtkTypeName();
        } else if (char) {
            if (obj.findBuffStat(key) || obj.modList &&
            (obj.modList[key] || obj.modList['resistAll'] &&
            (key === 'fire' || key === 'water' || key === 'air' || key === 'earth' || key === 'poison'))) {
                prop.shadow = colorList.buff;
            }
        } else if (mod) {
            prop.shadow = colorList.buff;
        }

        if (term.max && obj[term.max] !== undefined) {
            let max = obj[term.max];
            if (term.perc) max += '%';
            if (term.weight) max += 'kg';
            value += ` (${max})`;
        }

        if (term.bool) {
            if (value) {
                value = option.isEnglish() ? 'yes' : '有り';
            } else {
                value = option.isEnglish() ? 'no' : '無し';
            }
        }
        
        if (key === 'material') {
            value = materialMap.get(value).name[option.getLanguage()];
        }
        
        prop.value = value;
        propList.push(prop);
    },

    skill(fighter, skill) {
        let inv = this.list.skill;
        inv.show = true;
        let objVue = {};
        objVue.shadow = skill.color;
        objVue.name = skill.name[option.getLanguage()];
        inv.obj = objVue;

        let lvl = 0;
        let a = fighter.searchSkill(skill.id);
        if (a) lvl = fighter.skill[a].lvl;
        let boost = fighter.getSkillBoost(skill);
        inv.desc = fighter.getSkillInfo(skill, lvl + boost);

        let basePropList = [];
        let prop = {};
        prop.text = option.isEnglish() ? 'Element' : '元素';
        prop.value = option.isEnglish() ? getUpperCase(skill.element) : translation.element[skill.element];
        prop.shadow = skill.color;
        basePropList.push(prop);

        let [base, perLvl, perSy, durBase] = option.isEnglish() ?
            ['Base', 'per Level', 'per Synerzy', 'Duration Base'] :
            ['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値'];
        let perc = skill.perc ? '%' : '';
        if (skill.rate) {
            let skillBase = skill.base;
            if (isFinite(skillBase) && perc && skillBase > 0) {
                skillBase = '+' + skillBase;
			} else if (skill.radiusRate) {
				skillBase = (option.isEnglish() ? 'radius ' : '半径') + skillBase;
            }
            
            prop = {};
            prop.text = base;
            prop.value = skillBase +perc;
            basePropList.push(prop);

            if (!isFinite(skill.base)) perc = '%';
            let sign = skill.rate > 0 ? '+' : '';
            prop = {};
            prop.text = perLvl;
            prop.value = sign + skill.rate + perc;
            basePropList.push(prop);
		}
		
        if (skill.synerzy) {
            let sign = skill.synerzy > 0 ? '+' : '';
            prop = {};
            prop.text = perSy;
            prop.value = sign + skill.synerzy + perc;
            basePropList.push(prop);
		}
		
        if (skill.durBase) {
            prop = {};
            prop.text = durBase;
            prop.value = skill.durBase;
            basePropList.push(prop);
		}
		
        if (skill.durRate) {
            let sign = skill.durRate > 0 ? '+' : '';
            prop = {};
            prop.text = perLvl;
            prop.value = sign + skill.durRate;
            basePropList.push(prop);
		}
        
        inv.basePropList = basePropList;
    },

    clear() {
        for (let key in this.list) {
            this.list[key].show = false;
        }
    },

    scroll(keyCode, init) {
        if (init) {
            this.eleP = vue.$refs.investigationFighter.$refs.fighterPropList;
            this.eleC = this.eleP.firstElementChild;
            message.draw(message.get(M_CHARACTER) + message.get(M_SCROLL), true);
        } else if (flag.examine && keyCode === 67) { // c
            flag.character = false;
            inventory.clear();
            rogue.examineMsg();
            return;
        }

        input.scroll(this.eleP, this.eleC, keyCode, init);
    }
};

{
    investigation.list = {};
    investigation.list.item = {
        obj: {},
        desc: '',
        basePropList: [],
        embeddedList: [],
        modPropList: [],
        modPartsList: {},
        show: false,
    };

    investigation.list.skill = {
        obj: {},
        desc: '',
        basePropList: [],
        show: false,
    };

    investigation.list.fighter = {
        obj: {},
        desc: '',
        basePropList: [],
        show: false,
    };

}