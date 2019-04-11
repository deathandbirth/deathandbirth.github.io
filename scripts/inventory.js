const inventory = {
    shadow(dr) {
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.shadowColor = colorList.clear
        ctxInv.globalAlpha = 0.9;
        ctxInv.fillStyle = colorList.black;
        let offsetY = MS - 0.5;
        if (dr === LEFT || dr === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}

		if (dr === RIGHT || dr === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                xPx: display.width /2,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}
		
		ctxInv.restore();
	},
	
    clear() {

        message.clearFixed();
        for (let key in this.list) {
            this.list[key].show = false;
        }

        investigation.clear();
        display.clearOne(display.ctxes.inv);
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

        this.shadow(dr);
        let i = 1;
        let j = MS + 0.5;
        let right = dr === RIGHT ? display.width / 2 : 0;
        let count = 0;
        let weight = 0.0;
        let ctxInv = display.ctxes.inv;
        for (let key in list) {
            let item = list[key];
            if (!flag.pack && !item ||
                place === P_STASH && key < l ||
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

            ctxInv.save();
            ctxInv.textAlign = 'center';
            let char;
            if (place === P_STASH) {
                char = EA[key - l].toUpperCase();
			} else {
				char = dr === RIGHT ? key : key.toUpperCase();
			}

            itemVue.key = char;

            display.text({
                ctx: ctxInv,
                msg: char,
                x: i,
                y: j,
                xPx: right,
            });

            if (flag.pack && !item || flag.option || flag.cure) {
                if (!flag.pack) {
                    let msg = item[option.getLanguage()];

                    itemVue.name = msg;

                    ctxInv.textAlign = 'left';
                    display.text({
                        ctx: ctxInv,
                        msg: msg,
                        x: i + 1,
                        y: j,
                        limit: 14,
                        xPx: right,
                    });

                    ctxInv.textAlign = 'right';
                    if (flag.cure) {
                        msg = enter.list[key].cost;

                        itemVue.price = msg;
                        
                        display.text({
                            ctx: ctxInv,
                            msg: `$${msg}`,
                            x: -0.5,
                            y: j,
                            xPx: display.width / 2 + right,
                        });
                    } else if (!flag.option2) {
                        let opt = option[item['key']];
                        if (opt.select) {
                            msg = opt.select[opt.user][option.getLanguage()];
						} else if (option.isEnglish()) {
                            msg = opt.user ? 'yes' : 'no';
						} else {
							msg = opt.user ? 'はい' : 'いいえ';
						}

                        itemVue.select = msg;

                        display.text({
                            ctx: ctxInv,
                            msg: msg,
                            x: -0.5,
                            y: j,
                            xPx: display.width / 2 + right,
                        });
                    }
				}
				
                j++;
                ctxInv.restore();

                items.push(itemVue);

                continue;
            }
            
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;
            
            ctxInv.fillStyle = item.color;
            if (item.shadow) ctxInv.shadowColor = item.shadow;
            display.text({
                ctx: ctxInv,
                msg: item.symbol,
                x: i + 1,
                y: j,
                xPx: right,
                stroke: item.stroke,
            });

            let nameColor;
            if (item.cursed && item.identified) {
                nameColor = colorList.red;
			} else if (item.equipable && !item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
            }
            
            ctxInv.fillStyle = nameColor;

            itemVue.nameColor = nameColor;

            ctxInv.textAlign = 'left';
            let name = item.getName(false, item.quantity, option.getLanguage(), flag.gamble && place === P_SHOP);

            itemVue.name = name;

            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 1.5,
                y: j,
                limit: 15,
                xPx: right,
                stroke: item.stroke,
            });

            ctxInv.fillStyle = colorList.white;
            ctxInv.shadowColor = colorList.clear;
            ctxInv.textAlign = 'right';
            if (flag.shop || flag.blacksmith) {
                let price = flag.shop ? item.price * quantity2 : item.getDurabPrice();
                display.text({
                    ctx: ctxInv,
                    msg: `$${price}`,
                    x: -2.5,
                    y: j,
                    limit: 3.5,
                    xPx: display.width / 2 + right,
                });

                itemVue.price = price;
			}
			
            let quantity;
            if (place === P_SHOP || flag.shop && flag.number) {
                quantity = quantity2;
			} else {
                quantity = item.quantity;
                weight += item.weight * quantity;
            }
            
            itemVue.weight = (item.weight * quantity).toFixed(1);
			
            display.text({
                ctx: ctxInv,
                msg: (item.weight * quantity).toFixed(1),
                x: -0.5,
                y: j++,
                xPx: display.width / 2 + right,
                limit: 1.8,
            });

            ctxInv.restore();

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

        let msgLeft = `[${count}/${maxNum}] ` + this.getInvName(place);

        inv.left = msgLeft;

        display.text({
            ctx: ctxInv,
            msg: msgLeft,
            x: i,
            y: -SS - .9,
            xPx: right,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let msgRight = '';
        if (place === P_SHOP) {
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
		
        display.text({
            ctx: ctxInv,
            msg: msgRight,
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2 + right,
            yPx: display.height,
        });

        ctxInv.restore();
    },

    showEquipment(fighter, bp) {
        let inv = this.list.equipment;
        inv.show = true;
        let items = [];
        this.shadow(LEFT);
        let i = 1;
        let j = MS + 0.5;
        let k = 0;
        let weight = 0;
        let count = 0;
        let ctxInv = display.ctxes.inv;
        if (flag.blacksmith) var priceAll = 0;
        for (let key in fighter.equipment) {
            let item = fighter.equipment[key];
            if (flag.destroy && flag.number && key !== bp ||
              	  (flag.repair || flag.blacksmith) && (!item || item.durab === item.durabMax)) {
                k++;
                continue;
            }
            
            let itemVue = {};
            let char = EA[k++].toUpperCase();
            itemVue.key = char
            ctxInv.save();
            ctxInv.textAlign = 'center';
            display.text({
                ctx: ctxInv,
                msg: char,
                x: i,
                y: j,
            });

            ctxInv.textAlign = 'left';
            let parts = option.isEnglish() ? key : translation.bodyParts[key];
            if (key === 'main' || key === 'off') parts += fighter.swapped ? 2 : 1;

            itemVue.parts = parts;

            display.text({
                ctx: ctxInv,
                msg: parts,
                x: i + 0.5,
                y: j,
            });

            if (!item) {
                if (key === 'off' && fighter.equipment['main'] && fighter.equipment['main'].twoHanded) {
                    let name = option.isEnglish() ?
                            `(two-handed)` :
                            `(両手持ち)`;
                    itemVue.name = name;
                    display.text({
                        ctx: ctxInv,
                        msg: name,
                        x: i + 5,
                        y: j,
                        limit: 14,
                    });
				}
				
                j++;
                ctxInv.restore();

                items.push(itemVue);
                continue;
			}
			
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;
            
            ctxInv.textAlign = 'center';
            if (item.shadow) ctxInv.shadowColor = item.shadow;
            ctxInv.fillStyle = item.color;
            display.text({
                ctx: ctxInv,
                msg: item.symbol,
                x: i + 4.5,
                y: j,
                stroke: item.stroke,
            });

            let nameColor;
            if (item.cursed) {
                nameColor = colorList.red;
			} else if (!item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
			}

            ctxInv.fillStyle = nameColor;
            itemVue.nameColor = nameColor;
            ctxInv.textAlign = 'left';
            let name = item.getName();
            itemVue.name = name;
            let limit = flag.blacksmith ? 12 : 15;
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 5,
                y: j,
                limit: limit,
                stroke: item.stroke,
            });

            ctxInv.fillStyle = colorList.white;
            ctxInv.shadowColor = colorList.clear;
            ctxInv.textAlign = 'right';
            if (flag.blacksmith) {
                let price = item.getDurabPrice();
                display.text({
                    ctx: ctxInv,
                    msg: `$${price}`,
                    x: -2.5,
                    y: j,
                    xPx: display.width / 2,
                    limit: 3.5,
                });

                priceAll += price;

                itemVue.price = price;
			}

            itemVue.weight = (item.weight * item.quantity).toFixed(1);

            display.text({
                ctx: ctxInv,
                msg: (item.weight * item.quantity).toFixed(1),
                x: -0.5,
                y: j,
                xPx: display.width / 2,
                limit: 1.8,
            });

            weight += item.weight * item.quantity;
            count++;
            j++;
            ctxInv.restore();

            items.push(itemVue);
		}
		
        inv.items = items;

        if (!flag.destroy && !flag.number && !flag.repair && !flag.blacksmith) {
            let statsList = [];
            j += 0.5;
            let xPx = 0;
            let row = j;
            let count2 = 0;
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
				
                ctxInv.save();
                if (fighter.findBuffStat(key)) {
                    ctxInv.shadowColor = colorList.buff;
                    stats.shadow = colorList.buff;
                }

				if (fighter.lowerRes && (key === 'fire' || key === 'water' ||
						key === 'air' || key === 'earth' || key === 'poison')) {
					ctxInv.fillStyle = colorList.red;
                    stats.color = colorList.red;
                }
                
                let name = term.name[option.getLanguage()];
                stats.name = name;

                display.text({
                    ctx: ctxInv,
                    msg: name,
                    x: i,
                    y: j,
                    xPx: xPx,
                    limit: 7,
                });

                ctxInv.textAlign = 'right';
                let value = fighter[key];
                if (term.perc) value += '%';

                stats.value = value;

                if (term.max) {
                    let max = fighter[term.max];
                    if (term.perc) max += '%';

                    stats.valueMax = max;

                    value += ` (${max})`;
				}
				
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: -0.5,
                    y: j++,
                    xPx: xPx + display.width / 4,
                    limit: 3.5,
                });

                ctxInv.restore();
                if (!(++count2 % 8)) {
                    xPx += display.width / 4;
                    j = row;
                }

                statsList.push(stats);
            }

            inv.statsRight = statsList;
        } else {
            inv.statsLeft = [];
            inv.statsRight = [];
        }
		
        let maxNum = MAX_EQUIPMENT_NUM;
        let msgLeft = `[${count}/${maxNum}] ` + (option.isEnglish() ? 'Equipment List' : '装備一覧');

        inv.left = msgLeft;

        display.text({
            ctx: ctxInv,
            msg: msgLeft,
            x: i,
            y: -SS - .9,
            yPx: display.height,
        });

        ctxInv.textAlign = 'right';
        let total = option.isEnglish() ? 'Total' : '計';
        if (flag.blacksmith) {
            let cost = option.isEnglish() ? 'Total Cost' : '全費用';
            total = `${cost} $${priceAll} ${total}`;
        }

        let msgRight = `${total} ${weight.toFixed(1)}kg`;

        inv.right = msgRight;
        
        display.text({
            ctx: ctxInv,
            msg: msgRight,
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2,
            yPx: display.height,
        });

        ctxInv.textAlign = 'left';
    },

    showSkill(fighter, list, bookmark) {
        let inv = this.list[bookmark ? 'bookmark' : 'skill'];
        inv.show = true;
        let skills = [];
        this.shadow(bookmark ? LEFT : RIGHT);
        let i = 1;
        let j = MS + 1.7;
        let right = bookmark ? 0 : display.width / 2;
        let count = 0;
        let main = option.isEnglish() ? 'Main' : 'メイン';
        let ctxInv = display.ctxes.inv;
        for (let key in list) {
            if (flag.number && list[key] !== fighter.cs) continue;
            let skill,
                skillVue = {};
            if (list[key]) skill = skillMap.get(list[key].id ? list[key].id : list[key]);
            ctxInv.save();
            if (bookmark) {
                if (skill) {
                    ctxInv.shadowColor = skill.color;
                    skillVue.shadow = skill.color;
                }

                let char = key === '0' ? main : `F${key}`;
                skillVue.key = char;
                display.text({
                    ctx: ctxInv,
                    msg: char,
                    x: i - 0.5,
                    y: j,
                    limit: 2,
                    xPx: right,
                });

                if (!skill) {
                    j++;
                    ctxInv.restore();
                    skills.push(skillVue);
                    continue;
                }
            } else {
                skillVue.key = key;
                ctxInv.textAlign = 'center';
                display.text({
                    ctx: ctxInv,
                    msg: key,
                    x: i,
                    y: j,
                    xPx: right,
                });
            }
            
            let reqLvBool = skill.reqLvl <= fighter.lvl;
            let reqSyBool = !skill.reqSynerzy || skill.reqSynerzy <= fighter.getSynerzy(skill);
            if (reqLvBool && reqSyBool && (!flag.gain || fighter.skillPoints)) {
                ctxInv.shadowColor = skill.color;
                skillVue.shadow = skill.color;
                if (skill.mp > fighter.mp) skillVue.mpColor = colorList.red;
            } else {
                ctxInv.fillStyle = colorList.gray;
                skillVue.color = colorList.gray;
                if (!reqLvBool) skillVue.reqLvColor = colorList.red;
                if (!reqSyBool) skillVue.reqSyColor = colorList.red;
            }

            ctxInv.textAlign = 'left';
            let name = skill.name[option.getLanguage()];
            skillVue.name = name;
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 0.75 + (bookmark ? 1 : 0),
                y: j,
                limit: 8,
                xPx: right,
            });

            ctxInv.textAlign = 'right';
            let lvl = 0;
            if (list[key].lvl) {
                lvl = list[key].lvl
			} else {
                let a = fighter.searchSkill(list[key]);
                if (a) lvl = fighter.skill[a].lvl;
			}
			
            let boost = fighter.getSkillBoost(skill);
            skillVue.lvl = `${lvl}+${boost}`;
            display.text({
                ctx: ctxInv,
                msg: `${lvl}+${boost}`,
                x: -10,
                y: j,
                xPx: display.width / 2 + right,
                limit: 3,
            });

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
                    let avg = Math.ceil(dice.getAvg(skill.base) * (1 + bonus / 100));
                    value = `Avg ${avg}`;
				}
				
                skillVue.value = value;
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: -5.5,
                    y: j,
                    xPx: display.width / 2 + right,
                    limit: 4,
                });
			}
			
            if (skill.reqLvl <= fighter.lvl && skill.mp > fighter.mp) {
                ctxInv.shadowColor = colorList.clear;
                ctxInv.fillStyle = colorList.red;
			}
			
            skillVue.mp = skill.mp;
            display.text({
                ctx: ctxInv,
                msg: skill.mp,
                x: -3.5,
                y: j,
                xPx: display.width / 2 + right,
            });

            if (skill.reqLvl <= fighter.lvl) {
                ctxInv.shadowColor = skill.color;
                ctxInv.fillStyle = colorList.white;
			}
			
            skillVue.reqLv = skill.reqLvl;
            display.text({
                ctx: ctxInv,
                msg: skill.reqLvl,
                x: -2,
                y: j,
                xPx: display.width / 2 + right,
            });

            skillVue.reqSy = skill.reqSynerzy;
            if (skill.reqSynerzy){
                display.text({
                    ctx: ctxInv,
                    msg: skill.reqSynerzy,
                    x: -0.5,
                    y: j,
                    xPx: display.width / 2 + right,
                });
            }

            ctxInv.restore();
            count++;
            j++;

            skills.push(skillVue);
		}
		
        ctxInv.save();
        j = MS + 0.5;
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
        display.text({
            ctx: ctxInv,
            msg: msgLeft,
            x: i,
            y: j,
            xPx: right,
        });

        let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
        inv.right = `${skillPoints} ${fighter.skillPoints}`;

        ctxInv.textAlign = 'right';
        let [lvl, value, mp, reqLv, reqSy] = option.isEnglish() ? ['Lv', 'Value', 'MP', 'RLv', 'RSy'] :
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

        display.text({
            ctx: ctxInv,
            msg: lvl,
            x: -10,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: value,
            x: -5.5,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: mp,
            x: -3.5,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: reqLv,
            x: -2,
            y: j,
            xPx: display.width / 2 + right,
            limit: 1.3,
        });

        display.text({
            ctx: ctxInv,
            msg: reqSy,
            x: -0.5,
            y: j,
            xPx: display.width / 2 + right,
            limit: 1.3,
        });

        ctxInv.restore();
    },

    showStats(fighter, a) {
        let inv = this.list.stats;
        inv.show = true;
        let items = [];
        this.shadow(LEFT);
        let i = 1;
        let j = MS + 0.5;
        let count = 0;
        let ctxInv = display.ctxes.inv;
        for (let key in statistics.list) {
            if (a && key !== a) continue;
            let item = {};
            let stat = statistics.list[key];
            key = key.toUpperCase(); 
            item.key = key
            ctxInv.save();
            ctxInv.textAlign = 'center';
            display.text({
                ctx: ctxInv,
                msg: key,
                x: i,
                y: j,
            });

            let name = stat.name[option.getLanguage()]
            item.name = name;
            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 1,
                y: j,
            });

            let value = fighter[stat.term + 'Max'];
            item.select = value;
            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: value,
                x: -0.5,
                y: j++,
                xPx: display.width / 2,
            });

            ctxInv.restore();
            count++;
            items.push(item);
        }
        
        inv.items = items;
        let maxNum = count;
        let msgLeft = `[${count}/${maxNum}]`;
        inv.left = msgLeft;
        display.text({
            ctx: ctxInv,
            msg: msgLeft,
            x: i,
            y: -SS - .9,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let [statPoints, currentValues] = option.isEnglish() ? ['Stat Points', 'Current Values'] : ['ステータスポイント', '現在値'];
        let msgRight = `${statPoints} ${fighter.statPoints} | ${currentValues}`;
        inv.right = msgRight;
        display.text({
            ctx: ctxInv,
            msg: msgRight,
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2,
            yPx: display.height,
        });

        ctxInv.restore();
    },

    showRecipe() {
        let inv = this.list.recipe;
        inv.show = true;
        let items = [];
        let i = 1;
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        let a = option.getLanguage();
        this.shadow(MIDDLE);
        message.draw(message.get(M_RECIPE), true);
        let item = {};
        let name, cost, recipe;
        name = option.isEnglish() ? 'Name' : '名称';
        display.text({
            ctx: ctxInv,
            msg: name,
            x: i,
            y: j,
        });

        cost = 'MP';
        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: cost,
            x: i + 8,
            y: j,
        });

        recipe =  option.isEnglish() ? 'Recipe' : 'レシピ';
        ctxInv.textAlign = 'left';
        display.text({
            ctx: ctxInv,
            msg: recipe,
            x: i + 9,
            y: j,
        });

        item.name = name;
        item.cost = cost;
        item.recipe = recipe;
        items.push(item);

        j += 2; 
        let recipes = itemTab['recipe'];
        for (let [key, value] of recipes.entries()) {
            if (!rogue.recipes[key]) continue;
            item = {};
            name = value.nameReal[a];
            cost = value.cost;
            recipe = value.recipe[a];
            item.name = name;
            item.cost = cost;
            item.recipe = recipe;
            items.push(item);
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i,
                y: j,
                limit: 6
            });

            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: cost,
                x: i + 8,
                y: j,
            });

            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: recipe,
                x: i + 9,
                y: j,
                limit: 37
            });

            j += 1.2;
        }

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