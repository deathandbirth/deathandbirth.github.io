const inventory = {
    clear() {
        message.clearFixed();
        investigation.clear();
        for (let key in this.list) {
            this.list[key].show = false;
        }
	},
    
    getMaxNumber(place) {
        let maxNum;
        switch (place) {
            case P_PACK:
            case P_FLOOR:
            case P_SHOP:
                maxNum = MAX_PACK_COUNT;
                break;
            case P_BOX:
                maxNum = rogue.numBoxes < MAX_BOX_NUM ? rogue.numBoxes : MAX_BOX_NUM;
                break;
            case P_CUBE:
                maxNum = MAX_CUBE_COUNT;
                break;
            case P_STASH:
                maxNum = MAX_STASH_COUNT;
                break;
		}
		
        return maxNum;
	},
	
    getInvName(place) {
        let name,
            isEnglish = option.isEnglish();
        switch (place) {
            case P_PACK:
                name = isEnglish ? 'Pack' : '持物';
                break;
            case P_FLOOR:
                name = isEnglish ? 'Floor' : '床';
                break;
            case P_SHOP:
                name = isEnglish ? 'Shop' : '店';
                break;
            case P_BOX:
                name = isEnglish ? 'Boxes' : 'ボックス';
                break;
            case P_CUBE:
                name = isEnglish ? 'Alchemy' : '錬金術';
                break;
            case P_STASH:
                name = isEnglish ? 'Stash' : '物置箱';
                break;
		}
        
        return name + (isEnglish ? ' List' : '一覧');
	},
	
    sort(a, list, array) {
        let found = false;
        let item = list[a];
        let index = IT.indexOf(list[a].type);
        for (let key in list) {
            let item2 = list[key];
            let index2 = IT.indexOf(item2.type);
            if (!found && index2 < index) continue;
            if (key >= a) break;
            found = true;
            if (!item.identified) {
                if (index2 === index) continue;
            } else {
                if (item2.identified && item2.tabId <= item.tabId && index2 === index) {
                    if (!(item2.charges >= 0) || item2.tabId !== item.tabId || item2.charges > item.charges) continue;
                }
			}
			
            if (array) {
                let temp = item;
                list.splice(a, 1);
                list.splice(key, 0, temp);
                return key;
            } else {
                let i = EA.indexOf(a);
                let j = EA.indexOf(key);
                for (let k = i; k > j; k--) {
					[list[EA[k]], list[EA[k - 1]]] = [list[EA[k - 1]], list[EA[k]]];
				}
				
                return;
            }
		}
		
        return a; //stash page
    },

    show({
        list,
        dr,
        a,
        place,
        enter,
    }) {
        let inv = this.list[dr === RIGHT ? 'right' : 'left'];
        inv.show = true;

        let items = [];
        if (flag.shop) {
            var quantity2 = !rogue.cn ? 1 : Number(rogue.cn);
            if (a && quantity2 > list[a].quantity) quantity2 = list[a].quantity;
        } else if (place === P_STASH) {
			var l = (enter.page - 1) * MAX_PACK_COUNT;
		}

        let count = 0;
        let weight = 0.0;
        for (let key in list) {
            let item = list[key];
            if (!flag.pack && !item ||
                place === P_STASH && key < l ||
                flag.drop && flag.number && key != a ||
                flag.stash && a !== undefined && key != a ||
                flag.equip && !item.equipable ||
                flag.quaff && item.type != 'potion' ||
                flag.read && item.type != 'scroll' && item.type != 'recipe' && !item.chargeBook ||
                flag.identify && item.identified && key !== a ||
                (flag.repair || flag.blacksmith) && (!item.equipable || item.durab === item.durabMax) ||
                flag.zap && item.type != 'wand' ||
                flag.eat && item.type != 'food' ||
                flag.gain && (item.type != 'book' || !item.skill) ||
                flag.destroy && flag.number && key !== a ||
                (flag.shop || flag.option) && a && key !== a ||
                flag.fuel && (item.type !== 'light' && item.type !== 'oil' ||
                    rogue.equipment['light'].torch & !item.torch ||
                    !rogue.equipment['light'].torch && item.torch)
            ) {
				continue;
            }
            
            let itemVue = {};
            if (place === P_STASH) {
                itemVue.key = EA[key - l].toUpperCase();
			} else {
				itemVue.key = dr === RIGHT ? key : key.toUpperCase();
			}

            if (flag.pack && !item || flag.option || flag.cure) {
                if (!flag.pack) {
                    itemVue.name = item[option.getLanguage()];
                    if (flag.cure) {
                        itemVue.price = enter.list[key].cost;
                    } else if (!flag.option2) {
                        let select;
                        let opt = option[item['key']];
                        if (opt.select) {
                            select = opt.select[opt.user][option.getLanguage()];
						} else if (option.isEnglish()) {
                            select = opt.user ? 'yes' : 'no';
						} else {
							select = opt.user ? 'はい' : 'いいえ';
						}

                        itemVue.select = select;
                    }
				}
				
                items.push(itemVue);
                continue;
            }
            
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;

            let nameColor;
            if (item.cursed && item.identified) {
                nameColor = colorList.red;
			} else if (item.equipable && !item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
            }
            
            itemVue.nameColor = nameColor;
            itemVue.name = item.getName(false, item.quantity, option.getLanguage(), flag.gamble && place === P_SHOP);

            if (flag.shop || flag.blacksmith) {
                itemVue.price = flag.shop ? item.price * quantity2 : item.getDurabPrice();
			}
			
            let quantity;
            if (place === P_SHOP || flag.shop && flag.number) {
                quantity = quantity2;
			} else {
                quantity = item.quantity;
                weight += item.weight * quantity;
            }
            
            itemVue.weight = (item.weight * quantity).toFixed(1);
            items.push(itemVue);
            if (++count === MAX_PACK_COUNT) break;
		}

        inv.items = items;

        if (flag.option || flag.cure) {
            inv.left = '';
            inv.right = '';
            return;
        }

        let maxNum = this.getMaxNumber(place);
        if (place === P_STASH) {
            let lenStash = enter.list.length;
            count += (enter.page - 1) * MAX_PACK_COUNT;
            if (count > lenStash) count = lenStash;
        }

        inv.left = `[${count}/${maxNum}] ` + this.getInvName(place);

        let msgRight = '';
        if (place === P_SHOP || flag.shop && flag.number) {
            let weight = option.isEnglish() ? 'Weight' : '重量';
            msgRight = `${weight} x${quantity2}`;
        } else if (place === P_STASH) {
            msgRight = ` [${enter.page}/${MAX_STASH_PAGE}]`;
		} else {
            if (flag.gain) {
                let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
                msgRight = `${skillPoints} ${rogue.skillPoints} | `;
			}
			
            let total = option.isEnglish() ? 'Total' : '計';
            msgRight += `${total} ${weight.toFixed(1)}kg`;
		}
		
        if (flag.shop) {
            let sellOrCost;
            if (dr === RIGHT) {
                sellOrCost = option.isEnglish() ? 'Sell Value' : '売値';
			} else {
				sellOrCost = option.isEnglish() ? 'Cost' : '買値';
			}

            msgRight = `${sellOrCost} x${quantity2} | ${msgRight}`;
        } else if (place === P_STASH) {
            msgRight = (option.isEnglish() ? 'Page ' : 'ページ ') + msgRight;
        }
        
        inv.right = msgRight;
    },

    showEquipment(fighter, bp) {
        let inv = this.list.equipment;
        inv.show = true;
        let items = [];
        let keyNum = 0;
        let weight = 0;
        let count = 0;
        if (flag.blacksmith) var priceAll = 0;
        for (let key in fighter.equipment) {
            let item = fighter.equipment[key];
            if (flag.destroy && flag.number && key !== bp ||
                (flag.repair || flag.blacksmith) &&
                (!item || item.durab === item.durabMax)) {
                keyNum++;
                continue;
            }
            
            let itemVue = {};
            itemVue.key = EA[keyNum++].toUpperCase();

            let parts = option.isEnglish() ? key : translation.bodyParts[key];
            if (key === 'main' || key === 'off') parts += fighter.swapped ? 2 : 1;
            itemVue.parts = parts;

            if (!item) {
                if (key === 'off' && fighter.equipment['main'] && fighter.equipment['main'].twoHanded) {
                    itemVue.name = option.isEnglish() ? `(two-handed)` : `(両手持ち)`;
				}
				
                items.push(itemVue);
                continue;
			}
			
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;
            
            let nameColor;
            if (item.cursed) {
                nameColor = colorList.red;
			} else if (!item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
			}

            itemVue.nameColor = nameColor;
            itemVue.name = item.getName();

            if (flag.blacksmith) {
                let price = item.getDurabPrice();
                itemVue.price = price;
                priceAll += price;
			}

            itemVue.weight = (item.weight * item.quantity).toFixed(1);
            weight += item.weight * item.quantity;
            items.push(itemVue);
            count++;
		}
		
        inv.items = items;

        if (!flag.destroy && !flag.number && !flag.repair && !flag.blacksmith) {
            let statsList = [];
            for (let [key, term] of investigationMap.entries()) {
                if (!term || !term.equipList) {
                    if (key === 'end') {
                        break;
                    } else if (key === 'right') {
                        inv.statsLeft = statsList;
                        statsList = [];
                    }

                    continue;
                }
                
                let stats = {};
                if (fighter.findBuffStat(key)) stats.shadow = colorList.buff;
				if (fighter.lowerRes && (key === 'fire' || key === 'water' ||
                    key === 'air' || key === 'earth' || key === 'poison')) {
                    stats.color = colorList.red;
                }
                
                stats.name = term.name[option.getLanguage()];
                stats.value = fighter[key] + (term.perc ? '%' : '');
                if (term.max) {
                    stats.valueMax = fighter[term.max] + (term.perc ? '%' : '');
                }
                
                if (key === 'dmgAvg') {
                    let isMissile;
                    if (fighter.equipment) {
                        let weapon =  fighter.equipment.main;
                        if (weapon && weapon.type === 'missile') isMissile = true;
                    }

                    stats.value += ` x${isMissile ? fighter.timesMissile : fighter.timesMelee}`;
                }

                statsList.push(stats);
            }

            inv.statsRight = statsList;
        } else {
            inv.statsLeft = [];
            inv.statsRight = [];
        }
		
        let maxNum = MAX_EQUIPMENT_NUM;
        inv.left = `[${count}/${maxNum}] ` + (option.isEnglish() ? 'Equipment List' : '装備一覧');

        let total = option.isEnglish() ? 'Total' : '計';
        if (flag.blacksmith) {
            let cost = option.isEnglish() ? 'Total Cost' : '全費用';
            total = `${cost} ${priceAll} ${total}`;
        }

        inv.right = `${total} ${weight.toFixed(1)}kg`;
    },

    showSkill(fighter, list, bookmark) {
        let inv = this.list[bookmark ? 'bookmark' : 'skill'];
        inv.show = true;
        let skills = [];
        let count = 0;
        for (let key in list) {
            if (flag.number && list[key] !== fighter.cs) continue;
            let skill,
                skillVue = {};
            if (list[key]) skill = skillMap.get(list[key].id ? list[key].id : list[key]);
            if (bookmark) {
                if (skill) skillVue.shadow = skill.color;
                let keyName;
                if (key === '0') {
                    keyName = option.isEnglish() ? 'Main' : 'メイン';
                } else {
                    keyName = `F${key}`;
                }

                skillVue.key = keyName;
                if (!skill) {
                    skills.push(skillVue);
                    continue;
                }
            } else {
                skillVue.key = key;
            }
            
            let reqLvBool = skill.reqLvl <= fighter.lvl;
            let reqSyBool = !skill.reqSynerzy || skill.reqSynerzy <= fighter.getSynerzy(skill);
            if (reqLvBool && reqSyBool && (!flag.gain || fighter.skillPoints)) {
                skillVue.shadow = skill.color;
                if (skill.mp > fighter.mp) skillVue.mpColor = colorList.red;
            } else {
                skillVue.color = colorList.gray;
                if (!reqLvBool) skillVue.reqLvColor = colorList.red;
                if (!reqSyBool) skillVue.reqSyColor = colorList.red;
            }

            skillVue.name = skill.name[option.getLanguage()];
            let lvl = 0;
            if (list[key].lvl) {
                lvl = list[key].lvl
			} else {
                let a = fighter.searchSkill(list[key]);
                if (a) lvl = fighter.skill[a].lvl;
			}
			
            let boost = fighter.getSkillBoost(skill);
            skillVue.lvl = `${lvl}+${boost}`;
            if (skill.rate) {
                let value;
                let bonus = skill.rate * (lvl + boost) + (skill.synerzy ? skill.synerzy * fighter.getSynerzy(skill) : 0);
                if (skill.kind === 'breath') {
                    value = Math.ceil(fighter.hp * BREATH_RATE * (1 + bonus / 100));
                } else if (isFinite(skill.base)) {
                    value = skill.base + bonus;
                    if (skill.limit && value > skill.limit) value = skill.limit;
                    if (skill.radiusRate) {
                        let radius = option.isEnglish() ? 'radius ' : '半径';
                        value = `${radius}${value}`;
                    } else if (value > 0) {
                        value = `+${value}`;
					}

                    if (skill.perc) value = `${value}%`;
                } else {
                    let [min, max] = minMax.getNums(skill.base);
                    let bonusRate = 1 + bonus / 100;
                    min = Math.ceil(min * bonusRate);
                    max = Math.ceil(max * bonusRate);
                    value = `${min}-${max}`;
				}
				
                skillVue.value = value;
			}
			
            skillVue.mp = skill.mp;
            skillVue.reqLv = skill.reqLvl;
            skillVue.reqSy = skill.reqSynerzy;
            skills.push(skillVue);
            count++;
		}
		
        let [lvl, value, mp, reqLv, reqSy] = option.isEnglish() ?
            ['Lv', 'Value', 'MP', 'RLv', 'RSy'] :
            ['レベル', '値', 'MP', '必レ', '必シ'];
        let header = {
            lvl: lvl,
            value, value,
            mp: mp,
            reqLv: reqLv,
            reqSy: reqSy
        };

        skills.unshift(header);
        inv.items = skills;

        let maxNum;
        if (flag.gain) {
            maxNum = Object.keys(list).length;
		} else if (bookmark) {
            maxNum = MAX_BOOKMARK_NUM;
		} else {
			maxNum = MAX_SKILL_NUM;
		}

        let msgLeft = `[${count}/${maxNum}] `;
        if (bookmark) {
            msgLeft += option.isEnglish() ? 'Bookmark List' : 'しおり一覧';
        } else {
            msgLeft += option.isEnglish() ? 'Skill List' : 'スキル一覧';
        }

        inv.left = msgLeft;

        if (!bookmark) {
            let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
            inv.right = `${skillPoints} ${fighter.skillPoints}`;
        }
    },

    showStats(fighter, a) {
        let inv = this.list.stats;
        inv.show = true;
        let items = [];
        for (let key in statistics.list) {
            if (a && key !== a) continue;
            let item = {};
            let stat = statistics.list[key];
            item.key = key.toUpperCase(); 
            item.name = stat.name[option.getLanguage()]
            item.select = fighter[stat.term + 'Max'];
            items.push(item);
        }
        
        inv.items = items;
        inv.left = option.isEnglish() ? 'Stat List' : 'ステータス一覧';
        let [statPoints, currentValues] = option.isEnglish() ?
            ['Stat Points', 'Current Values'] :
            ['ステータスポイント', '現在値'];
        inv.right = `${statPoints} ${fighter.statPoints} | ${currentValues}`;
    },

    showRecipe() {
        let inv = this.list.recipe;
        inv.show = true;
        let items = [];
        let recipes = itemTab['recipe'];
        let a = option.getLanguage();
        for (let [key, value] of recipes.entries()) {
            if (!rogue.recipes[key]) continue;
            let item = {};
            item.name = value.nameReal[a];
            item.cost = value.cost;
            item.recipe = value.recipe[a];
            items.push(item);
        }

        let header = {};
        header.name = option.isEnglish() ? 'Name' : '名称';
        header.cost = 'MP';
        header.recipe =  option.isEnglish() ? 'Recipe' : 'レシピ';
        items.unshift(header);
        inv.items = items;
    }
}

{
    inventory.list = {};
    let list = ['right', 'left', 'equipment', 'skill', 'bookmark', 'stats', 'recipe'];
    for (let type of list) {
        inventory.list[type] = {
            items: [],
            left: '',
            right: '',
            show: false,
        }
    }

    inventory.list.equipment.statsRight = [];
    inventory.list.equipment.statsLeft = [];
}