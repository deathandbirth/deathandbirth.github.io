const Item = class extends Material {
    constructor(obj, quantity) {
        super(obj);
        this.id = -1;
        this.quantity = quantity;
    }

    static goldAmount(lvl) {
        return 50 * lvl + rndIntBet(1, 50 * (lvl + 1));
    }

    init(position, x, y, magic, lvl, uniqueId, starter, matBase, matId) {
        this.lvl = lvl;
        let gem = this.type === 'gem';
        if (this.equipable || gem) {
            if (!gem) {
                this.durabBonus = 0;
                if (this.equipable) {
                    this.embeddedNum = 0;
                    this.embeddedList = [];
                }
            }
            
            if (!magic) {
                magic = this.mod === MOD_MAGIC ||
                    !starter && Material.evalMod(MOD_MAGIC, rogue.mf, flag.shop);
			}

            if (magic && !flag.shop && itemUniqueMap[this.type].has(this.tabId) &&
              	  (uniqueId >= 0 || Material.evalMod(MOD_UNIQUE, rogue.mf))) {
                let array = itemUniqueMap[this.type].get(this.tabId);
                let found;
                for (let i = 0, l = array.length; i < l; i++) {
                    if (uniqueId >= 0 && uniqueId !== i) continue;
                    let unique = array[i];
                    let id = this.type + ',' + this.tabId + ',' + i;
                    if (!rogue.cui[id] &&
                     		(uniqueId >= 0 || unique.lvl <= this.lvl &&
                            !evalPercentage(unique.rarity))) {
                        this.getUnique(unique);
                        this.uniqueId = i;
                        rogue.cui[id] = true;
                        matBase = unique.matBase;
                        matId = unique.matId;
                        magic = false;
                        break;
                    }
				}
				
                if (magic) this.mod = MOD_RARE;
            }

            if (!gem) this.getMaterial(matBase, matId);
            if (magic || this.material === M_GEM) {
                let bias = this.bias ? this.bias : RANDOM;
                if (this.mod === MOD_RARE || Material.evalMod(MOD_RARE, rogue.mf)) {
                    this.getRare(bias);
				} else {
					this.getMagic(bias);
				}
            } else if (!this.mod) {
                this.mod = MOD_NORMAL;
                this.cursed = !starter && !flag.shop && evalPercentage(CURSE_PERC);
            }

            if (this.equipable) {
                this.calcDurab(true);
                if (starter) {
                    this.embeddedMax = 0;
                } else {
                    this.adjustEmbeddedNum();
                }
            }

            if (this.type === 'light') {
                if (this.fuelBonus) this.fuelValue = Math.ceil(this.fuelValue * (1 + this.fuelBonus / 100));
                this.fuelMax = this.fuelValue;
                if (!flag.shop && !starter) this.fuelValue = Math.ceil(this.fuelValue * (rndInt(100) / 100));
                this.calcFuelLvl();
            } else if (this.weapon) {
                if (!this.dmgBonus) this.dmgBonus = 0;
                if (!this.rateBonus) this.rateBonus = 0;
                if (!starter && !flag.shop && (this.cursed || this.mod === MOD_NORMAL && rogue.cdl)) {
                    let found;
                    if (this.type === 'staff') {
                        if (!this.acBonus) this.acBonus = 0;
                        if (this.cursed || evalPercentage(25)) {
                            this.acBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }
                    } else {
                        if (this.cursed || evalPercentage(25)) {
                            this.dmgBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }

                        if (this.cursed || evalPercentage(25)) {
                            this.rateBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }
                    }

                    if (!this.cursed && found) this.getSuperiorName();
				}
				
                this.calcDmgOne();
            } else if (this.armor) {
                if (!this.acBonus) this.acBonus = 0;
                if (!starter && !flag.shop && (this.cursed ||
                        this.mod === MOD_NORMAL && rogue.cdl && evalPercentage(25))) {
                    this.acBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                    if (!this.cursed) this.getSuperiorName();
				}
				
                this.calcAcOne();
			}
			
            if (!this.colorMod) this.colorMod = this.color;
            this.calcPrice();
            if (flag.shop || starter) {
                this.identified = true;
                this.changeNameAndPrice();
            }
        } else {
            this.mod = MOD_NORMAL;
            if (flag.shop) this.identified = true;
            if (this.type === 'ammo') {
                if (this.quantity === 1) this.quantity = rndIntBet(80, 100);
            } else if (this.type === 'coin') {
                if (this.quantity === 1)
                    this.priceReal = Math.ceil(Item.goldAmount(rogue.cdl) * (1 + rogue.gf / 100));
                else {
                    this.priceReal = this.quantity;
                    this.quantity = 1;
				}
				
                this.nameReal['a'] = this.nameReal['b'] = '$' + this.priceReal;
            } else if (this.type === 'wand') {
                this.charges = rndIntBet(3, 6);
			} else if (this.type === 'potion' && !this.lethe || this.type === 'scroll') {
                if (this.quantity === 1 && !flag.synthesize) this.quantity = rndIntBet(1, 5);
			}
			
            if (this.type !== 'coin') this.calcPrice();
            if (flag.shop || itemTab[this.type].get(this.tabId).identified) {
                if (this.type === 'wand' && !flag.shop && this.identified) this.identified = false;
                this.changeNameAndPrice();
            }
        }

        if (!this.weight) this.weight = weightList[this.type];
        if (flag.shop) this.price *= flag.gamble ? 10 : 2;
        if (position === POS_LIST) return;
        super.init(position, x, y);
    }

    putDown(x, y, sound) {
        do {
			this.id = Math.random();
		} while (map.itemList[this.id]);

        this.spiralSearch(x, y, 'item');
        if (this.abort) return;
        this.place = PLACE_FLOOR;
        map.itemList[this.id] = this;
        let loc = map.coords[this.x][this.y];
        let l = Object.keys(loc.item).length;
        loc.item[eaList[l]] = this;
        if (sound) audio.playSound(this.type);
        if (rogue.hallucinated) hallucinate.one(this);
    }

    indexOf(list) {
        for (let key in list) {
            if (Object.is(list[key], this)) return key;
        }
    }

    equal(obj) {
        if (this.type !== obj.type || this.tabId !== obj.tabId) return false;
        if (this.type === 'wand' && this.identified && obj.identified || this.chargeBook) {
			return this.charges === obj.charges;
		}

        if (this.type !== 'wand' && !this.equipable && this.type !== 'gem' && this.type !== 'material') {
			 return this.identified === obj.identified;
		}

        return this.identified && obj.identified &&
            JSON.stringify(this, Item.replacer) === JSON.stringify(obj, Item.replacer);
    }

    static replacer(key, value) {
        return key === 'quantity' || key === 'place' || key === 'price' ? undefined : value;
    }

    dropped() {
        let name = this.getName();
        message.draw(option.isEnglish() ?
            `Dropped ${name}` :
            `${name}を落とした`)
    }

    calcDmgOne() {
        let bonus = 1 + (this.dmgBonus ? this.dmgBonus / 100 : 0);
        let minBonus = this.dmgMinBonus ? this.dmgMinBonus : 0;
        let maxBonus = this.dmgMaxBonus ? this.dmgMaxBonus : 0;
        this.dmgValue = Math.floor((this.dmgBase + (minBonus + maxBonus) / 2) * bonus);
        this.reqStr = Math.ceil((this.weight - 3) * 10);
        if (this.reqStr <= 0) this.reqStr = undefined;
    }

    calcAcOne() {
        let perc = 1 + this.acBonus / 100;
        this.acSValue = Math.floor(this.acSBase * perc);
        this.acTValue = Math.floor(this.acTBase * perc);
        this.acBValue = Math.floor(this.acBBase * perc);
        this.acAvgValue = Math.floor(this.acAvg * perc);
    }

    calcDurab(init) {
        if (!this.durabRate) this.durabRate = 1;
        let durabBase = DURAB_BASE + this.weight * DURAB_RATE;
        this.durabMax = Math.ceil(durabBase * this.durabRate + this.durabBonus);
        if (init || this.durab > this.durabMax) this.durab = this.durabMax;
    }

    calcFuelLvl() {
        this.fuelLvl = Math.ceil(this.fuelValue / this.fuelMax * 100);
    }

    identifyAll() { //potion, scroll
        itemTab[this.type].get(this.tabId).identified = true;
        this.identified = true;
        this.changeNameAndPrice();
        searchItemToIdentifiy.main(this.nameReal[LETTER_ENG], this.type);
    }

    identifyWand() {
        let itemT = itemTab[this.type].get(this.tabId);
        if (!itemT.identified) {
            itemT.identified = true;
            searchItemToIdentifiy.main(this.nameReal[LETTER_ENG], this.type);
        }
    }


    getDurabPrice() {
        let price = (this.durabMax - this.durab) * DURAB_PRICE;
        return price;
    }

    getSuperiorName() {
        this.superior = true;
        this.nameReal['a'] = 'Superior ' + this.nameReal['a'];
        this.nameReal['b'] = '上等な' + this.nameReal['b'];
        if (this.identified) {
            this.name['a'] = 'Superior ' + this.name['a'];
            this.name['b'] = '上等な' + this.name['b'];
        }
    }

    uncurse() {
        this.cursed = false;
        audio.playSound('uncurse');
        if (this.embeddedList && this.embeddedList.length) {
            for (let embedded of this.embeddedList) {
                if (embedded.cursed) {
                    embedded.cursed = false;
                    let list = embedded.modParts ? embedded.modParts[this.type] : embedded.modList;
                    list.cursed = false;
                }
            }
        }
    }

    calcPrice() {
        this.price = this.priceReal = priceList[this.type];
        if (this.priceRate) this.priceReal = Math.round(this.priceReal * this.priceRate);
        if (this.equipable || this.type === 'gem' || this.type === 'material') {
            let times;
            switch (this.mod) {
                case MOD_NORMAL:
                    times = 1;
                    break;
                case MOD_MAGIC:
                    times = 2;
                    break;
                case MOD_RARE:
                    times = 5;
                    break;
                case MOD_UNIQUE:
                    times = 10;
                    this.priceReal += 1000;
                    break;
			}
			
            this.priceReal *= times;
            if (this.equipable) {
                let weight = 1 + this.weight / 2;
                this.price = Math.round(this.price * weight);
                this.priceReal = this.cursed ? 1 : Math.round(this.priceReal * weight);
            }
        }
    }

    changeNameAndPrice() { //identified
        let halluc = !!this.typeHalluc;
        let name = halluc ? this.nameTemp : this.name;
        name['a'] = this.nameReal['a'];
        name['b'] = this.nameReal['b'];
        this.changePrice();
        if (this.equipable || this.type === 'material' ||
        this.type === 'gem' || this.type === 'orb') {
            let color = this.colorMod ? this.colorMod : this.colorReal;
            this.colorReal = color;
            if (!halluc) this.color = color
        }
    }

    changePrice() {
        if (this.type === 'wand') {
            this.price = Math.round(this.priceReal * (1 + this.charges * WAND_CHARGE_PRICE_RATE));
		} else {
			this.price = this.priceReal;
		}
    }

    getName(real, quantity = this.quantity, a = option.getLanguage(), gamble) {
        let type = this.typeHalluc ? this.typeHalluc : this.type;
        let halluc = !!this.typeHalluc;
        let name;
        let isEng = a === LETTER_ENG;
        if (gamble) {
            name = isEng ? getUpperCase(type) : translation.item[type];
            if (quantity > 1) name += ` x${quantity}`;
            return name;
		}
		
        name = real ? this.nameReal[a] : this.name[a];
        if (type === 'book' || type === 'potion' || type === 'scroll' ||
            type === 'recipe' || type === 'wand' || type === 'orb') {
            if (this.type2) type = this.type2;
            let typeName;
            if (isEng) {
                typeName = getUpperCase(type);
                if (!this.identified && !halluc) {
                    if (type === 'potion' || type === 'wand') {
                        name += ` ${typeName}`;
					} else if (type === 'scroll' || type === 'recipe') {
						name = `${typeName} titled ${name}`;
					} else if (type === 'orb') {
						name = `${typeName} engraved ${name}`;
                    }
                } else {
					name = `${typeName} of ${name}`;
				}
            } else {
                typeName = translation.item[type];
                if (!this.identified && (type === 'scroll' || type === 'recipe') && !halluc) {
                    name += `と名付けられた${typeName}`;
                } else if (!this.identified && type === 'orb' && !halluc) {
                    name += `と刻まれた${typeName}`;
                } else {
					name += `の${typeName}`;
				}
			}
        }
        
        if (!halluc) {
            if (type === 'light' && this.identified) {
                name += ` [${this.fuelLvl}%]`;
            } else if (type === 'material') {
                let matName;
                if (this.piece) {
                    matName = isEng ? 'Piece' : '欠片';
                    if (isEng) matName = getArticleAndPlural(matName, false, true, quantity);
                } else {
                    matName = materialMap.get(this.material).name[a]
                        .replace(isEng ? /s$/ : /類$|製$|材$/, '');
                }

                name = isEng ? `${matName} of ${name}` : `${name}の${matName}`;
            }

            if (this.equipable) {
                let string = '';
                if (this.weapon) {
                    if (this.twoHanded) string += ' (2H)';
                    if (this.identified) string += ` (${this.dmgValue})`;
                } else if (this.armor && this.identified) {
                        string += ` [${this.acAvgValue}]`;
                        if (rogue.isWizard) string += ` [${this.acSValue},${this.acTValue},${this.acBValue}]`
                }
                
                name += string;
            }
            
            if (this.identified) {
                if (this.durabMax) name += ` {${this.durab}}`;
                if (this.charges >= 0) name += ` [${this.charges}]`;
                if (this.embeddedMax) name += ` <${this.embeddedNum}/${this.embeddedMax}>`;
            }

            if (this.equipable || type === 'material' || type === 'gem') {
                if (!this.identified) {
                    name += isEng ? ' (Unid)' : ' (未識別)';
                } else if (this.cursed) {
                    name = (isEng ? 'Cursed ' : '呪われた') + name;
                }
            }
        }
		
        if (quantity > 1) name += ` x${quantity}`;
        return name;
    }

    split(quantity, list) {
        let item = {};
        copyObj(item, this);
        if (item.embeddedList && item.embeddedList.length) {
            for (let itemEmbedded of item.embeddedList) {
                itemEmbedded.__proto__ = Item.prototype;
            }
        }

        item.__proto__ = Item.prototype;
        item.quantity = quantity;
        this.quantity -= quantity;
        if (!this.quantity) {
            let a = this.indexOf(list);
            if (this.place === PLACE_BOX || this.place === PLACE_EQUIPMENT) {
                list[a] = null;
			} else if (this.place === PLACE_STASH) {
                list.splice(a, 1);
			} else {
				deleteAndSortItem(list, a);
			}

            if (this.place === PLACE_FLOOR) delete map.itemList[item.id];
		}
		
        return item;
    }

    adjustEmbeddedNum() {
        let limit = this.embeddedLimit;
        if (this.mod === MOD_NORMAL) {
            this.embeddedMax = evalPercentage(50) ? 0 : rndIntBet(1, limit);
        } else {
            let bonus = this.embeddedBonus;
            if (bonus) {
                if (this.mod === MOD_MAGIC) {
                    if (bonus > 4) bonus  = 4;
                } else if (this.mod === MOD_RARE) {
                    if (bonus > 2) bonus = 2;
                }

                if (bonus > limit) bonus = limit;
                this.embeddedMax = this.embeddedBonus = bonus;
            } else {
                this.embeddedMax = 0;
            }
        }
    }

    isShowing() {
        let loc = map.coords[this.x][this.y];
        return !rogue.blinded && (loc.found && !loc.wall || this.detected);
    }

    static getType(magic) {
        let type;
        do {
            if (magic) {
                if (evalPercentage(20)) {
                    type = coinToss() ? 'gem' : 'orb';
                } else {
                    let len = equipmentTypeList.length;
                    type = equipmentTypeList[rndInt(len - 1)];
                }
            } else {
                type = itList[rndInt(itList.length - 2)];
            }
        } while (evalPercentage(rarityList[type]) ||
        flag.shop && (type === 'coin' || type === 'recipe' || type === 'orb' || type === 'gem'));
        return type;
    }
            
    static getTabId(type, lvl, magic) {
        let tabId, item;
        let j = 0;
        let itemNums = itemNumsMap.get(type);
        itemNums.shuffle();
        do {
            tabId = itemNums[j++];
            item = itemTab[type].get(tabId);
            if (!item) {
                j = 0;
                type = Item.getType(magic);
                itemNums = itemNumsMap.get(type);
                itemNums.shuffle();
            }
        } while (!item || item.abort ||
            rogue.lethe && item.lethe ||
            item.type === 'recipe' && rogue.recipes[tabId] ||
            item.lvl > lvl || evalPercentage(item.rarity));
        return [type, tabId];
    }

    static getSymbol(type) {
        let symbol;
        switch (type) {
            case 'book':
            case 'scroll':
            case 'recipe':
                symbol = '?';
                break;
            case 'food':
                symbol = ':';
                break;
            case 'potion':
            case 'oil':
                symbol = '!';
                break;
            case 'wand':
                symbol = '-';
                break;
            case 'food':
                symbol = ':';
                break;
            case 'missile':
                symbol = '}';
                break;
            case 'staff':
                symbol = '_';
                break;
            case 'shield':
                symbol = ')';
                break;
            case 'armor':
                symbol = '[';
                break;
            case 'cloak':
                symbol = '(';
                break;
            case 'belt':
                symbol = '~';
                break;
            case 'helm':
            case 'gloves':
            case 'boots':
                symbol = ']';
                break;
            case 'light':
                symbol = '＊';
                break;
            case 'ring':
                symbol = '=';
                break;
            case 'amulet':
                symbol = '"';
                break;
            case 'gem':
                symbol = '*';
                break;
            case 'orb':
                symbol = '・';
                break;
            case 'ammo':
                symbol = '{';
                break;
            case 'coin':
                symbol = '$';
                break;
		}
		
        return symbol;
    }

    static initTab() {
        for (let key in itemTab) {
            for (let [tabId, item] of itemTab[key].entries()) {
                item.type = key;
                item.tabId = tabId;
                if (!item.symbol) item.symbol = Item.getSymbol(item.type);
                if (!item.name) item.name = {};
                if (key === 'book' || key === 'food' || key === 'coin' ||
                	    key === 'ammo' || key === 'oil' || key === 'misc') {
                    item.identified = true;
				} else if (key === 'melee' || key === 'missile' || key === 'staff' || key === 'shield' || key === 'armor' ||
                  		key === 'cloak' || key === 'belt' || key === 'helm' || key === 'gloves' || key === 'boots' ||
                	    key === 'light' || key === 'ring' || key === 'amulet') {
                    item.equipable = true;
                    item.grade = GRADE_NORMAL;
                    if (key === 'melee' || key === 'missile' || key === 'staff') {
                        item.weapon = true;
					} else if (key === 'light' || key === 'ring' || key === 'amulet') {
                        item.ornament = true;
					} else {
						item.armor = true;
					}
                }
                
                if (item.equipable || key === 'gem') {
                    item.name['a'] = item.nameReal['a'];
                    item.name['b'] = item.nameReal['b'];
                }
				
                if (key === 'book') { //sort list
                    if (!item.skill) continue;
                    let list = item.list;
                    let keys = Object.keys(list);
                    for (let i = 0, l = keys.length, found; i < l - 1; i++, found = false) {
                        for (let j = l - 1; j > i; j--) {
                            let [a, b] = [keys[j - 1], keys[j]];
                            if (skillMap.get(list[a]).reqLvl > skillMap.get(list[b]).reqLvl) {
                                [list[a], list[b]] = [list[b], list[a]];
                                found = true;
                            }
						}
						
                        if (!found) break;
                    }
                } else if (key === 'scroll') {
                    item.color = colorList.white;
                } else if (key === 'recipe') {
                    item.color = colorList.red;
                    item.desc = {
                        a: '',
                        b: '錬金術で使用されるレシピ。読み上げる事で習得する。'
                    }
                }

                if (key === 'orb') {
                    item.mod = MOD_NORMAL;
                    item.shadow = colorList.orange;
                    item.priceRate = (10 + tabId) / 10;
                    item.desc = {
                        a: '',
                        b: '埋め込み可能な装備品に合成すると種類に応じて属性値が付与される。'
                    }
                }
            }
        }
    }
}

Item.initTab();

const searchItemToIdentifiy = {
    main(nameReal, type) {
        this.loop(rogue.pack, nameReal, type);
        this.loop(rogue.boxes, nameReal, type);
        this.loop(map.itemList, nameReal, type);
        for (let key in map.enemyList) {
			this.loop(map.enemyList[key].pack, nameReal, type);
		}
	},
	
    loop(list, nameReal, type) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === type && item.nameReal[LETTER_ENG] === nameReal) {
                if (item.type !== 'wand') item.identified = true;
                item.changeNameAndPrice()
            }
        }
    }
};
