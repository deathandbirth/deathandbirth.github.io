const investigation = {
    main(obj, direction, char) {
        let inv = this.list[char ? 'fighter' : 'item'];
        inv.show = true;
        if (!char) {
            Vue.nextTick(function(){
                let ele = vue.$refs.investigationItem.$el;
                ele.style.left = direction === DR_RIGHT ? '50%' : '0';
            });
        }

        let objVue = {};
        if (obj.shadow) objVue.shadow = obj.shadow;
        if (obj.stroke) objVue.stroke = obj.stroke;
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
        inv.skills = [];
        if (obj.type === 'book' && obj.list) {
            let [element, reqLv, reqSy] = option.isEnglish() ?
                ['Element', 'RLv', 'RSy'] :
                ['属性', '必レ', '必シ'];
            let header = {
                element: element,
                reqLv: reqLv,
                reqSy: reqSy
            };

            inv.skills.push(header);
            let list = obj.list;
            for (let key in list) {
                let skillVue = {};
                let id = list[key];
                let skill = skillMap.get(id);
                let element = skill.element;
                skillVue.shadow = colorList[element];
                skillVue.element = option.isEnglish() ? getUpperCase(element) : translation.element[element];
                skillVue.name = skill.name[option.getLanguage()];
                skillVue.mp = skill.mp;
                skillVue.reqLv = skill.reqLvl;
                skillVue.reqSy = skill.reqSynerzy;
                inv.skills.push(skillVue);
            }
        }
    },

    loop(obj, propList, char, key, term, value, mod) {
        let prop = {};
        prop.text = term.name[option.getLanguage()];
        if (term.plus && !char && value > 0) value = '+' + value;
        if (term.perc) value += '%';
        if (term.weight) value += 'kg';
        if (key === 'atkType') {
            value = this.getAtkTypeName(obj.atkType);
        } else if (key === 'race') {
            value = this.getRaceName(obj.race);
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

        // if (term.base && obj[term.base] !== undefined) {
        //     let base = obj[term.base];
        //     value += ` [${base}]`;
        // }

        if (term.bool) {
            if (value) {
                if (!char && mod) {
                    value = '';
                } else {
                    value = option.isEnglish() ? 'yes' : '有り';
                }
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
        prop.text = option.isEnglish() ? 'Element' : '属性';
        prop.value = option.isEnglish() ? getUpperCase(skill.element) : translation.element[skill.element];
        prop.shadow = skill.color;
        basePropList.push(prop);

        let [base, perLvl, perSy, durBase, limit] = option.isEnglish() ?
            ['Base', 'per Level', 'per Synerzy', 'Duration Base', 'Max Limit'] :
            ['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値', '上限'];
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
		
        if (skill.limit) {
            let perc = skill.perc ? '%' : '';
            let sign = '+';
            prop = {};
            prop.text = limit;
            prop.value = sign + skill.limit + perc;
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

    scroll(key, init) {
        if (init) {
            this.eleP = vue.$refs.investigationFighter.$refs.fighterPropList;
            this.eleC = this.eleP.firstElementChild;
            message.draw(message.get(M_CHARACTER) + message.get(M_SCROLL), true);
        } else if (flag.examine && key === 'c') {
            flag.character = false;
            inventory.clear();
            rogue.examineMsg();
            return;
        }

        input.scroll(this.eleP, this.eleC, key, init);
    },

    getAtkTypeName(at) {
        let name = '';
        let isEng = option.isEnglish();
        if (at & AT_SLASH) name += isEng ? 'Slash・' : '斬・';
        if (at & AT_THRUST) name += isEng ? 'Thrust・' : '突・';
        if (at & AT_BLUNT) name += isEng ? 'Blunt・' : '打・';
        return name ? name.replace(/・$/, '') : '-';
    },

    getRaceName(race) {
        let name = '';
        let isEng = option.isEnglish();
        if (race & RACE_HUMAN) name += isEng ? 'Human・' : '人間・';
        if (race & RACE_ANIMAL) name += isEng ? 'Animal・' : '動物・';
        if (race & RACE_DEMON) name += isEng ? 'Demon・' : '悪魔・';
        if (race & RACE_UNDEAD) name += isEng ? 'Undead・' : '不死・';
        if (race & RACE_DRAGON) name += isEng ? 'Dragon・' : '竜・';
        if (race & RACE_GIANT) name += isEng ? 'Giant・' : '巨人・';
        if (race & RACE_SPIRIT) name += isEng ? 'Spirit・' : '精霊・';
        if (race & RACE_GOD) name += isEng ? 'God・' : '神・';
        return name ? name.replace(/・$/, '') : '-';
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
