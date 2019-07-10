const Rogue = class extends Fighter {
    constructor() {
        super(fighterTab['misc'][0])
        this.name['a'] = this.name['b'] = data.name;
        this.id = ID_ROGUE;
        this.expMax = this.exp = 0;
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        this.cube = {};
        this.cubeIndex = {};
        this.hunger = MAX_HUNGER / 2;
        this.purse = 500;
        this.keysList = {};
        this.numSteps = 0;
        this.skill = {};
        this.detected = true;
        this.ce = null; //current enemy
        this.dl = 0; //dungeon level
        this.pdl = 0; //portal dungeon level
        this.cdl = 0; //current dungeon level
        this.cui = {}; //current unique item
        this.cue = {}; //current unique enemy
        this.recipes = {};
        this.recipes[RECIPE_EMBED] = true;
        this.lethe = 0;
        this.turn = 1;
        this.done = false;
        this.initKeys();
        this.isWizard = window.location.href.split('/').pop().indexOf('debug') === 0;
    }

    init() {
        if (this.starter) this.getStarterItems();
        this.calcAll();
        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = this.spd / 100;
    }

    initKeys() {
        for (let i = 0; i < MAX_ASSIGN_NUM; i++) {
			this.keysList[i] = null;
		}
    }

    move(key, dr) {
        if (this.confused) {
            dr = drList[rndInt(drList.length - 1)];
		} else if (key) {
			dr = getDirection(key);
		}

        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
        } else if (loc.fighter) {
            if (this.haveMissile()) {
                let ammo = this.getAmmo(this.equipment['main'].throwType);
                if (ammo) {
                    this.ci = ammo;
                    flag.arrow = true;
                    this.getShootMsg(ammo);
                    this.aim({ key: key });
                } else {
                    message.draw(message.get(M_DONT_HAVE_AMMO));
                    return null;
                }
            } else {
                audio.playSound('swing');
                this.attack({ enemy: loc.fighter });
			}
			
            rogue.done = true;
        } else if (this.stuckTrap) {
            message.draw(message.get(M_STUCK));
            rogue.done = true;
            if (flag.dash)　 flag.dash = false;
        } else if (!loc.wall) {
            this.drawOrErase(false, true);
            this.x += dr.x;
            this.y += dr.y;
            loc.traces = ++this.numSteps;
            this.drawOrErase(true, true);
            if (!loc.getInfo()) {
                rogue.done = true;
                this.cost -= this.spdMove;
            }
        } else {
			audio.playSound('hitwall');
		}
    }

    rest() {
        this.decreaseEnergy();
        map.queue.moveAll();
        if (flag.rest && (this.hp !== this.hpMax || this.mp !== this.mpMax)) {
            setTimeout(this.rest.bind(this), WAIT_TIME);
		} else {
            flag.rest = false;
        }
    }

    dash(key) {
        if (this.confused) return;
        let dr = getDirection(key);
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
            return;
        } else if (loc.wall) {
            audio.playSound('hitwall');
            return;
		}
		
        flag.dash = true;
        let drLUp = getNextDirection(dr, true);
        let drRUp = getNextDirection(dr);
        var count = 0;
        var wallLUp = false;
        var wallRUp = false;
        if (map.coords[this.x + drLUp.x][this.y + drLUp.y].wall) wallLUp = true;
        if (map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) wallRUp = true;
        this.dashLoop(dr, drLUp, drRUp, wallLUp, wallRUp, count);
    }

    dashLoop(dr, drLUp, drRUp, wallLUp, wallRUp, count) {
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (!loc.isObstacle() && !flag.died) {
            if (this.move(null, dr) === null) flag.dash = false;
            this.decreaseEnergy();
            map.queue.moveAll();
            if (flag.dash) this.dashCheck(dr, drLUp, drRUp, wallLUp, wallRUp, count);
        } else {
			flag.dash = false;
		}
    }

    dashCheck(dr, drLUp, drRUp, wallLUp, wallRUp, count) {
        var found = false;
        if (wallLUp && !wallRUp) {
            if (!map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
           		map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				found = true;
			}
        } else if (!wallLUp && wallRUp) {
            if (!map.coords[this.x + drRUp.x][this.y + drRUp.y].wall ||
               	map.coords[this.x + drLUp.x][this.y + drLUp.y].wall) {
				found = true;
			}
        } else if (wallLUp && wallRUp) {
            if (count) {
                dr = map.coords[this.x + dr.x][this.y + dr.y].wall ?
                    this.dashSearch(dr) : null;
                if (!dr) {
                    found = true;
				} else {
                    count = 0;
                    drLUp = getNextDirection(dr, true);
                    drRUp = getNextDirection(dr);
                }
			}
			
            if (!map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
               	!map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				count++;
			}
        } else {
            if (map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
          	    map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				found = true;
			}
		}
		
        if (found) {
            flag.dash = false;
		} else {
			setTimeout(this.dashLoop.bind(this, dr, drLUp, drRUp, wallLUp, wallRUp, count), WAIT_TIME);
		}
    }

    dashSearch(dr) {
        let key1 = -1;
        let keyDia = -1;
        for (let key in drList) {
            if (!map.coords[this.x + drList[key].x][this.y + drList[key].y].wall &&
               	-drList[key].x !== dr.x && -drList[key].y !== dr.y) {
                if (key < 4) {
                    if (key1 !== -1) {
                        return;
					} else {
						key1 = key;
					}
                } else {
                    if (keyDia !== -1) {
                        return;
					} else {
						keyDia = key;
					}
                }
            }
		}
		
        return keyDia !== -1 && drList[keyDia].x !== drList[key1].x &&
            drList[keyDia].y !== drList[key1].y ? null : drList[key1];
    }

    searchDoor() {
        let tempX, tempY;
        let count = 0;
        for (let key in drList) {
            let [x, y] = [this.x + drList[key].x, this.y + drList[key].y]
            let loc = map.coords[x][y];
            if (loc.door && loc.isClosedDoor() === flag.openDoor &&
                !loc.fighter && !loc.item['a'] && !loc.hidden) {
                if (!count)[tempX, tempY] = [x, y];
                count++;
            }
		}
		
        if (count === 1) {
            map.coords[tempX][tempY].openOrCloseDoor();
            this.done = true;
		}
		
        return count;
    }

    openOrCloseDoor(key) {
        let dr = getDirection(key);
        if (!dr) return;
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.door && loc.isClosedDoor() === flag.openDoor &&
            !loc.item['a'] && !loc.fighter) {
            loc.openOrCloseDoor();
            this.done = true;
            flag.openDoor = flag.closeDoor = false;
            flag.regular = true;
            inventory.clear();
        }
    }

    searchHiddenObject() {
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
				map.coords[i][j].findHiddenObject();
			}
		}
		
        rogue.done = true;
    }

    attackStationary(key) {
        if (this.keysList[0] !== null) {
            this.castAssignedSkill('M', key);
		} else if (this.haveMissile()) {
            let ammo = this.getAmmo(this.equipment['main'].throwType);
            if (ammo) {
                this.ci = ammo;
                flag.arrow = true;
                this.getShootMsg(ammo);
                this.aim({ key: key });
            } else {
				message.draw(message.get(M_DONT_HAVE_AMMO));
			}
        } else {
            let dr = getDirection(key);
            let loc = map.coords[this.x + dr.x][this.y + dr.y];
            if (loc.wall) {
                this.dig(loc);
			} else {
                audio.playSound('swing');
                if (loc.fighter) this.attack({ enemy: loc.fighter });
			}
			
            rogue.done = true;
        }
    }

    died() {
        inventory.clear();
        if (this.blinded) this.blinded = 0;
        if (this.hallucinated) {
            this.hallucinated = 0;
            hallucinate.all(true);
        } else {
            map.drawObjectAll()
            map.draw();
        }

        audio.playSound('kill');
        audio.stop(audio.curTrack);
        audio.playMusic('gameover');
        message.draw(message.get(M_DIED));
        rogue.done = false;
        initFlag();
        flag.regular = false;
        flag.wait = false;
        flag.died = true;
        data.delete(data.name);
    }

    getStartPointInTown() {
        if (!rogue.cdl && rogue.dl) {
            let pos = positionFixedList.hell;
            [this.x, this.y] = [pos.x, pos.y];
		} else {
            let pos = positionFixedList.start;
			[this.x, this.y] = [pos.x, pos.y];
		}
    }

    putDown(town, stairs, x, y) {
        if (town) {
            this.getStartPointInTown();
        } else if (stairs) {
            [this.x, this.y] = [x, y];
        } else {
            this.getPositionRandomly(true);
        }

        map.coords[this.x][this.y].traces = ++this.numSteps;
        this.drawOrErase(true);
        map.queue.push(this);
    }

    downOrUpStairs(key, trap) {
        let loc = map.coords[this.x][this.y];
        if (!trap && !loc.stairs || loc.hidden) return;
        let dr = trap ? null : loc.stairs.id;
        if (trap || dr === DR_DOWN && key === '>') {
            if (!trap) audio.playSound('staircase');
            if (option.autosave.user) data.save();
            game.clearLevel();
            if (rogue.cdl === 33) {
                rogue.cdl = 0;
                creation.town();
            } else {
                if (rogue.dl < ++rogue.cdl) rogue.dl = rogue.cdl;
                creation.dungeon(!trap, dr);
            }
        } else if (dr === DR_UP && key === '<') {
            audio.playSound('staircase');
            if (option.autosave.user) data.save();
            game.clearLevel();
            !--rogue.cdl ? creation.town() : creation.dungeon(true, dr);
        }
    }

    enterPortal() {
        if (!this.cdl) {
            if (option.autosave.user) data.save();
            game.clearLevel()
            this.cdl = this.pdl;
            creation.dungeon();
        } else {
            this.pdl = this.cdl;
            game.clearLevel()
            creation.town();
            this.cdl = 0;
            let portal = new Portal();
            portal.init(POS_LOCATION, this.x, this.y);
		}
		
        audio.playSound('tplevel');
    }

    enterBuild(enter) {
        input.switchFlag();
        map.drawObjectAll();
        map.draw();
        if (enter.stash) {
            flag.stash = true;
            enter.page = 1;
            let msg = message.get(M_STASH);
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_STASH);
            message.draw(msg, true);
            return;
        } else if (enter.shop) {
            flag.shop = true;
            this.cn = 1;
            flag.gamble = enter.gamble;
            let msg = message.get(M_SHOP);
            msg = enter.name[option.getLanguage()] + msg;
            this.showInventory(PLACE_PACK);
            if (!enter.list['a']) enter.createShopItem();
            this.showInventory(PLACE_SHOP);
            message.draw(msg, true);
        } else if (enter.cure) {
            flag.cure = true;
            inventory.show({
                list: enter.list,
                dr: DR_RIGHT,
                enter: enter,
            });

            message.draw(message.get(M_CURE), true);
        } else if (enter.blacksmith) {
            flag.blacksmith = true;
            let msg = message.get(M_BLACKSMITH);
            this.equipmentList();
            this.showInventory(PLACE_PACK);
            message.draw(msg, true);
		}
		
        let nameEnter = enter.getName();
        message.draw(option.isEnglish() ?
            `You entered The ${nameEnter}` :
            `${nameEnter}に入った`);
    }

    itemAuto(list) {
        let found;
        for (let key in list) {
            do {
                found = false;
                let item = list[key];
                if (!item) break;
                if (item.type === 'coin' ||
                    item.type === 'ammo' && this.equipment['main'] &&
                    this.equipment['main'].throwType === item.throwType) {
                    flag.grab = true;
                    found = this.grabItem(null, key) !== null;
                    continue;
				}
				
                if (!item.identified && option['auto-identify'].user) this.checkItem(item, IDENTIFY);
                let charged;
                if (item.identified && (item.type === 'scroll' ||
                item.charges && item.quantity === 1) &&
                option['auto-charge'].user && this.mp) { 
                    charged = this.checkItem(item, CHARGE);
                }

                if (charged || option['auto-destroy'].user) {
                    if (!charged || charged.delete) {
                        deleteAndSortItem(list, key);
                        delete map.itemList[item.id];
                        found = true
                    }

                    if (!charged) {
                        let name = item.getName();
                        message.draw(option.isEnglish() ?
                            `Destroyed ${name}` :
                            `${name}を破壊した`);
                    } else {
                        let name = charged.item.getName();
                        message.draw(option.isEnglish() ?
                            `Charged ${name}` :
                            `${name}を充填した`);
                    }
                }
            } while (found);
        }
    }

    grabItem(key, a) {
        let loc = map.coords[this.x][this.y];
        if (flag.grab) {
            if (key) a = getAlphabet(key);
            if (!a || !loc.item[a]) return;
            let item = loc.item[a];
            item = this.inventoryOut(item, item.quantity);
            inventory.clear();
            flag.grab = false;
            flag.regular = true;
            if (item.type !== 'coin' && !this.packAdd(item)) {
                message.draw(message.get(M_CANT_CARRY));
                return null;
            } else {
                let name = item.getName();
                if (item.type === 'coin') this.purse += item.price;
                message.draw(option.isEnglish() ?
                    `Picked up ${name}` :
                    `${name}を拾った`);
                audio.playSound('grab');
                rogue.done = true;
            }
        } else {
            if (!loc.item['a']) return;
            flag.grab = true;
            if (!loc.item['b']) {
                this.grabItem('a');
			} else {
                input.switchFlag();
                let msg = message.get(M_GRAB);
                this.showInventory(PLACE_FLOOR);
                message.draw(msg, true);
            }
        }
    }

    drop(key) {
        let item;
        if (!flag.number) {
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a);
            if (!item || item.place === PLACE_EQUIPMENT && item.cursed) return;
            if (item.quantity > 1) {
                this.ci = item;
                flag.number = true;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
                return;
            } else {
				item = this.inventoryOut(item, 1);
			}
        } else {
            item = this.ci;
            let i = this.cn;
            if (i > item. quantity) i = item.quantity;
            item = this.inventoryOut(item, i);
            this.ci = null;
		}
		
        item.putDown(this.x, this.y, true);
        item.dropped();
        inventory.clear();
        flag.drop = false;
        flag.regular = true;
        rogue.done = true;
    }

    equip(key) {
        if (this.switchInventory(key, M_EQUIP)) return;
        let a = getAlphabetOrNumber(key);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item || !item.equipable) return;
        flag.floor = false;
        let parts = this.getParts(item);
        if (!parts) return;
        item = this.inventoryOut(item, 1);
        item.place = PLACE_EQUIPMENT;
        this.equipment[parts] = item;
        this.gainOrloseWeight(item, item.quantity, true);
        let name = item.getName();
        if (item.weapon) {
            message.draw(option.isEnglish() ?
                `Wielding ${name}` :
                `${name}を握った`);
        } else {
            message.draw(option.isEnglish() ?
                `Wearing ${name}` :
                `${name}を身に付けた`);
		}
		
        if (item.cursed) audio.playSound('curse');
        if (this.eqt['a']) {
            let item2 = this.eqt['a'];
            if (!this.packAdd(item2)) item2.dropped();
            delete this.eqt['a'];
		}
		
        if (item.durab) this.getOrLooseStats(item, true);
        this.calcAll(true);
        inventory.clear();
        this.equipmentList();
        flag.equip = false;
        flag.regular = true;
        rogue.done = true;
        flag.clearInv = true;
    }

    unequip(key, parts) {
        if (!parts) {
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            parts = bpList[a];
        }

        let item = this.equipment[parts];
        if (!item) return;
        let msg;
        if (item.weapon) {
            msg = option.isEnglish() ? 'unwield' : '離す';
		} else {
			msg = option.isEnglish() ? 'take off' : '外す';
		}

        if (item.cursed) {
            message.draw(option.isEnglish() ?
                `You can't ${msg} the cursed item` :
                `呪われたアイテムを${msg}ことが出来ない`);
            return null;
		}
		
        let name = item.getName();
        if (option.isEnglish()) {
            msg = getUpperCase(msg);
            message.draw(`${msg} ${name}`);
        } else {
            msg = msg.charAt(0);
            message.draw(`${name}を${msg}した`);
		}
        
        audio.playSound('grab');
        this.equipment[parts] = null;
        this.gainOrloseWeight(item);
        if (flag.equip) {
            this.eqt['a'] = item;
		} else if (!this.packAdd(item)) {
			item.dropped();
		}

        if (item.durab) this.getOrLooseStats(item, false);
        rogue.done = true;
        inventory.clear();
        flag.unequip = false;
        flag.regular = true;
        if (!flag.equip) {
            this.calcAll();
            this.equipmentList();
            flag.clearInv = true;
        }
    }

    isNaked() {
        for (let key in bpList) {
            if (this.equipment[bpList[key]]) return false;
		}
		
        return true;
    }

    fuel(key, boxItem) {
        if (this.switchInventory(key, M_FUEL, true)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            let a = getAlphabetOrNumber(key);
            if (!a || input.isShift) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'light' && item.type !== 'oil') return;
		}
		
        let light = this.equipment['light'];
        if (light.torch && !item.torch || !light.torch && item.torch) return;
        flag.floor = false;
        if (!light.fuelValue && item.fuelValue && light.durab) {
            this.lighten += light.lighten;
            this.lightenOrDarken('Lighten');
		}
		
        light.fuelValue += item.fuelValue;
        if (light.fuelValue > light.fuelMax) light.fuelValue = light.fuelMax;
        light.calcFuelLvl();
        if (item.mod !== MOD_NORMAL) {
            item.fuelValue = 0;
            item.calcFuelLvl();
        } else {
			this.deleteItem(item, 1);
		}

        let name = light.getName();
        message.draw(option.isEnglish() ?
            `Fueled ${name}` :
            `${name}を補給した`);
        rogue.done = true;
        inventory.clear();
        flag.fuel = false;
        flag.regular = true;
    }

    eat(key, boxItem) {
        if (this.switchInventory(key, M_EAT)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'food') return;
            flag.floor = false;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Ate ${name}` :
            `${name}を食べた`);
        audio.playSound('eat');
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.deleteItem(item, 1);
        if (!boxItem) {
            inventory.clear();
            flag.eat = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    quaffPotion(key, boxItem) {
        if (this.switchInventory(key, M_QUAFF)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'potion') return;
            flag.floor = false;
		}
		
        if (!item.identified) {
            item.identifyAll();
            if (item.place === PLACE_PACK) var sort = true;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Quaffed ${name}` :
            `${name}を飲んだ`);
        audio.playSound('quaff');
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.hunger += HUNGER_POTION;
        if (this.hunger > MAX_HUNGER) this.hunger = MAX_HUNGER;
        this.deleteItem(item, 1);
        if (!boxItem) {
            if (sort && item.quantity > 0) inventory.sort(a, this.pack);
            inventory.clear();
            flag.quaff = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    zap(key, boxItem) {
        if (this.switchInventory(key, M_ZAP)) return;
        let item;
        if (boxItem) {
            input.switchFlag();
            flag.zap = true;
            item = boxItem;
        } else {
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'wand') return;
		}
		
        inventory.clear();
        this.ci = item;
        flag.floor = false;
        message.draw(message.get(M_ZAP_DIR) + message.get(M_TO_EXAMINE), true);
        flag.aim = true;
        this.examinePlot(true);
    }

    throw(key) {
        if (this.switchInventory(key, M_THROW)) return;
        let a = getAlphabetOrNumber(key);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item) return;
        inventory.clear();
        this.ci = item;
        flag.floor = false;
        message.draw(message.get(M_THROW_DIR) + message.get(M_TO_EXAMINE), true);
        flag.aim = true;
        this.examinePlot(true);
    }

    haveThrown(item, fighter, x, y) {
        if (item.type === 'potion' || item.type === 'wand') {
            this.haveCast(item.nameSkill, item.skillLvl, fighter, x, y);
            this.deleteAmmo(item, false, x, y);
            if (!fighter.abort) this.getCe(fighter, false);
            if (item.type === 'potion') {
                item.identifyAll();
			} else {
                let skill = skillMap.get(item.nameSkill);
                if (!skill.wall && fighter.material !== M_STONE) item.identifyWand();
            }
        } else {
            this.attack({
                enemy: fighter,
                itemThrown: item,
            });
        }
    }

    read(key, boxItem) {
        if (this.switchInventory(key, M_READ)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'scroll' && item.type !== 'recipe' && !item.chargeBook) return;
		}
		
        if (item.chargeBook && !item.charges) return;
        flag.floor = false;
        if (!item.identified) {
            item.identifyAll();
            if (item.place === PLACE_PACK) inventory.sort(a, this.pack);
		}
		
        let name = item.getName(true, 1);
        message.draw(option.isEnglish() ?
            `Read ${name}` :
            `${name}を読んだ`);
        if (item.type === 'recipe' && !this.recipes[item.tabId]) {
            this.recipes[item.tabId] = true;
            message.draw(option.isEnglish() ?
                `Learned a new recipe` :
                `新たなレシピを習得した`);
        }

        flag.read = false;
        if (item.type !== 'recipe') {
            flag.scroll = true;
            if (skillMap.get(item.nameSkill).range === 0) {
                this.ci = item;
                if (!boxItem) {
                    inventory.clear();
                    flag.aim = true;
                    message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
                    this.examinePlot(true);
                    return;
                } else {
                    this.aim({
                        x1: this.x,
                        y1: this.y,
                    });
                }
            } else if (this.haveCast(item.nameSkill, item.skillLvl, this) === null) {
                this.ci = item;
                return;
            }
        }

        this.deleteItem(item, 1);
        inventory.clear();
        flag.regular = true;
        rogue.done = true;
    }

    identify(key, item) {
        if (this.switchInventory(key, M_IDENTIFY, true)) return;
        if (key !== null) {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a, flag.floor);
		}
		
        if (!item || item.identified) return;
        flag.floor = false
        if (item.type === 'wand' && !itemTab[item.type].get(item.tabId).identified ||
            item.type === 'potion' || item.type === 'scroll' || item.type === 'recipe' || item.type === 'orb') {
            item.identifyAll();
		} else {
            item.identified = true;
            item.changeNameAndPrice();
		}
		
        let name = item.getName();

        message.draw(option.isEnglish() ?
            `Identified ${name}` :
            `${name}を判別した`);
        if (key) {
            inventory.clear();
            this.showInventory(item.place, a);
            investigation.main(item, item.place === PLACE_EQUIPMENT || item.place === PLACE_BOX ? DR_RIGHT : DR_LEFT);
            if (item.place === PLACE_PACK) inventory.sort(a, this.pack);
            rogue.done = true;
            flag.identify = false;
            flag.regular = true;
            flag.clearInv = true;
        }
        if (flag.skill) {
            this.consumeMana(skillMap.get(IDENTIFY));
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}
    }

    repairAll(forAmount = '') {
        let found;
        for (let key in this.equipment) {
            let item = this.equipment[key];
            if (item && item.durab < item.durabMax) {
                this.repairOne(item, true);
                found = true;
            }
		}
		
        if (found) {
            message.draw(option.isEnglish() ?
                `Repaired your equipment${forAmount}` :
                `装備を${forAmount}修復した`);
        }
    }

    getDurabPriceAll() {
        let priceTotal = 0;
        for (let key in this.equipment) {
            let item = this.equipment[key];
            if (item && item.durab < item.durabMax)
                priceTotal += item.getDurabPrice();
		}
		
        return priceTotal;
    }

    repair(key) {
        let blacksmithAll = flag.blacksmith && key === 'Enter'; 
        if (!blacksmithAll) {
            if (!flag.blacksmith && this.switchInventory(key, M_REPAIR, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            var item = this.getItem(a, flag.floor);
            if (!item || !item.equipable || item.durab === item.durabMax) return;
            flag.floor = false;
		}
		
        let forAmount = '';
        if (flag.blacksmith) {
            var price = blacksmithAll ? this.getDurabPriceAll() : item.getDurabPrice();
            if (!price) return;
            if (this.purse < price) {
                message.draw(message.get(M_DONT_HAVE_MONEY));
                return;
			}
			
            forAmount = option.isEnglish() ? ` for $${price}` : `$${price}で`;
            if (blacksmithAll) this.repairAll(forAmount);
		}
		
        if (!blacksmithAll) {
            this.repairOne(item, input.isShift);
            let name = item.getName();
            message.draw(option.isEnglish() ?
                `Repaired ${name}${forAmount}` :
                `${name}を${forAmount}修復した`);
		}
		
        inventory.clear();
        if (flag.blacksmith) {
            this.purse -= price;
            let msg = message.get(M_BLACKSMITH);
            this.equipmentList();
            this.showInventory(PLACE_PACK);
            message.draw(msg, true);
            return;
		}
		
        if (flag.skill) {
            this.consumeMana(skillMap.get(RESTORE_DURABILITY));
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}

        rogue.done = true;
        flag.repair = false;
        flag.regular = true;
        flag.clearInv = true;
    }

    repairOne(item, equip) {
        if (item.cursed) item.uncurse();
        if (!item.durab && equip) {
            this.getOrLooseStats(item, true);
            this.calcAll();
		}
		
        item.durab = item.durabMax;
    }

    disintegrate(key) {
        let symbol = key === '%' ? key : getAlphabet(key);
        if (!symbol) return;
        let skill = skillMap.get(DISINTEGRATION);
        let lvl;
        if (flag.skill) {
            lvl = this.cs.lvl + this.getSkillBoost(skill);
		} else {
			lvl = this.ci.skillLvl;
		}

        let radius = this.calcSkillValue(skill, lvl);
        circleSearch.main({
            x0: this.x,
            y0: this.y,
            type: DISINTEGRATION,
            radius: radius,
            symbol: symbol,
		});
		
        inventory.clear();
        if (flag.skill) {
            this.consumeMana(skill);
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}

        flag.disint = false;
        flag.regular = true;
        rogue.done = true;
    }

    wormhole(x, y) {
        let skill = skillMap.get(WORMHOLE);
        let lvl = this.cs.lvl + this.getSkillBoost(skill);
        let radiusSq = this.calcSkillValue(skill, lvl) ** 2;
        let loc = map.coords[x][y];
        if (!loc.found || loc.isObstacle() ||
            distanceSq(x, y, this.x, this.y) > radiusSq) {
            message.draw(message.get(M_CANT_TELE));
            return;
		}
		
        this.teleport(false, false, x, y);
        this.consumeMana(skill);
        flag.skill = false;
        flag.wormhole = false;
        flag.examine = false;
        flag.regular = true;
        rogue.done = true;
        inventory.clear();
        statistics.clearEnemyBar();
        cursor.clearAll();
    }

    investigate(key, item, place, direction) {
        investigation.clear();
        if (!item) {
            if (this.switchInventory(key, M_INVESTIGATE, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a, flag.floor);
            if (!item) return;
        }

        if (!item.identified || item.typeHalluc){
            message.draw(message.get(M_NO_CLUE));
            return;
        }

        if (direction === undefined) direction = item.place === PLACE_EQUIPMENT || item.place === PLACE_BOX ? DR_RIGHT : DR_LEFT;
        investigation.main(item, direction);
    }

    getSkillInfo(skill, lvl, item) {
        let msg = skill.desc[option.getLanguage()];
        if (skill.rate) {
            if (!item) flag.skill = true;
            let value = this.calcSkillValue(skill, lvl, undefined, true);
            if (skill.limit && value > skill.limit) value = skill.limit;
            if (!isFinite(skill.base)) value = (option.isEnglish() ? 'about ' : '約') + value;
            if (skill.perc) {
                if (value > 0) value = '+' + value;
                value += '%';
			}
			
            let replace = skill.radiusRate ? '{radiusRate}' : '{value}';
            msg = msg.replace(replace, value);
            flag.skill = false;
		}
		
        if (skill.radius) msg = msg.replace('{radius}', skill.radius);
        if (skill.durBase) {
            let duration = option.isEnglish() ? 'about ' : '約';
            duration += this.calcSkillDur(skill, lvl, true);
            msg = msg.replace('{dur}', duration);
		}
		
        return msg;
    }

    synthesize(key) {
        if (flag.recipe) {
            if (key !== 'c') return;
            flag.recipe = false;
            inventory.list.recipe.show = false;
            let msg = message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR);
            message.draw(msg, true);
            return;
        } else if (input.isCtrl && key === 'r') {
            flag.recipe = true;
            message.draw(message.get(M_RECIPE), true);
            inventory.showRecipe();
            return;
        }
        
        if (this.switchInventory(key, M_SYNTHESIZE)) return;
        let l = Object.keys(this.cube).length;
        if (key === 'Enter' && l >= 1) { 
            flag.floor = false;
            this.tryToSynthesize();
            return;
        }
        
        let a = getAlphabetOrNumber(key);
        if (!a) return;
        a = a.toLowerCase();
        if (!input.isShift && l === MAX_CUBE_COUNT) {
            message.draw(message.get(M_CANT_ADD));
            return;
        }
        
        let item = input.isShift ? this.cube[a] : this.getItem(a, flag.floor);
        if (!item) return;
        if (input.isShift) {
            this.returnItem(item, a)
            deleteAndSortItem(this.cube, a);
            deleteAndSortItem(this.cubeIndex, a);
        } else {
            let quantity = item.type === 'scroll' ? item.quantity : 1;
            this.cube[eaList[l]] = this.inventoryOut(item, quantity);
            this.cubeIndex[eaList[l]] = a;
        }
        
        this.showInventory(flag.floor ? PLACE_FLOOR : PLACE_PACK);
        this.showInventory(PLACE_CUBE);
    }

    tryToSynthesize() {
        let potion = 0,
            wand = 0,
            light = 0,
            touch = 0,
            lamp = 0,
            oil = 0,
            book = 0,
            scroll = 0,
            gem = 0,
            orb = 0,
            material = 0,
            embeddable = 0,
            unembeddable = 0,
            removable = 0,
            embedded = 0,
            cost = 0,
            num = 0,
            mp = this.mp,
            l = Object.keys(this.cube).length;
        for (let i = 0; i < l; i++) {
            let item = this.cube[eaList[i]];
            if (!item.identified) continue;
            if (item.equipable) {
                if (!item.embeddedMax) unembeddable++;
                if (item.embeddedNum) removable++;
                if (item.embeddedNum < item.embeddedMax) embeddable++;
			}
			
            if (item.type === 'potion') {
                potion++; 
			} else if (item.type === 'wand') {
                wand++;
            } else if (item.type === 'gem') {
                gem++;
                embedded++;
            } else if (item.type === 'orb') {
                orb++;
                embedded++;
            } else if (item.type === 'material') {
                material++;
                embedded++;
            } else if (item.type === 'light') {
                item.torch ? touch++ : lamp++;
            } else if (item.type === 'oil') {
                oil++;
			} else if (item.type === 'book') {
                book++;
            } else if (item.type === 'scroll') {
                scroll++;
            }
		}
		
        let name, msg;
        let recipes = itemTab['recipe'];
        if (l === potion) {
            num = 1;
            if (l === 3) {
                let countGH = 0,
                    countGM = 0;
                let found = true;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.tabId === P_GREATER_HEALING) {
                        countGH++;
                    } else if (item.tabId === P_GREATER_MANA) {
                        countGM++;
                    } else {
                        break;
                    }
                }

                let tabIdRecipe, tabIdPotion;
                if (countGH === l) {
                    tabIdRecipe = RECIPE_EXTRA_HEALING;
                    tabIdPotion = P_EXTRA_HEALING;
                    name = option.isEnglish() ? 'Potion of Extra Healing' : '特大回復の薬';
                } else if (countGM === l) {
                    tabIdRecipe = RECIPE_EXTRA_MANA;
                    tabIdPotion = P_EXTRA_MANA;
                    name = option.isEnglish() ? 'Potion of Extra Mana' : '魔力特大回復の薬';
                } else {
                    found = false;
                }

                if (tabIdRecipe) cost = recipes.get(tabIdRecipe).cost;
                if (found && this.checkRecipe(tabIdRecipe, cost)) {
                    this.createItemIntoPack({
                        type: 'potion',
                        tabId: tabIdPotion,
                        quantity: 1,
                    });
                } else {
                    name = '';
                }
            }
        } else if (l === wand) {
            let tabId = RECIPE_WAND;
            cost = recipes.get(tabId).cost;
            if (l > 1 && this.checkRecipe(tabId, cost)) {
                let found = true;
                let a = 'a';
                let wand = this.cube[a];
                for (let key in this.cube) {
                    if (key === a) continue;
                    let item = this.cube[key];
                    if (wand.nameSkill !== item.nameSkill) {
                        found = false;
                        break;
                    } else if (wand.charges < item.charges) {
                        wand = item;
                        a = key;
                    }
                }

                if (found && wand.charges < MAX_CHARGE_NUM) {
                    num = 0;
                    for (let key in this.cube) {
                        if (key === a) continue;
                        let item = this.cube[key];
                        let obj = this.chargeItem(wand, item, cost, num);
                        if (obj.return) this.returnItem(item, key);
                        if (obj.charges) num += obj.charges;
                    }
                    
                    this.packAdd(wand);
                    name = wand.getName();
                }
            }
        } else if (l === gem) {
            let tabId = RECIPE_WROUGHT_GOLD;
            cost = recipes.get(tabId).cost;
            if (this.checkRecipe(tabId, cost)) {
                let amount = 0;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item, key)
                    } else {
                        num++;
                        this.purse += item.price;
                        amount += item.price;
                    }
                }
                
                name = '$' + amount;
            }
        } else if (l > 1 && l === touch + lamp + oil) {
            let tabId = l === touch ? RECIPE_TORCH : RECIPE_LAMP;
            cost = recipes.get(tabId).cost;
            if ((l === touch || lamp && l === lamp + oil) && this.checkRecipe(tabId, cost)) {
                let item, a;
                for (let key in this.cube) {
                    let item2 = this.cube[key];
                    if (item2.type !== 'oil') {
                        item = item2;
                        a = key;
                        break;
                    }
                }

                let fuelValue = 0;
                for (let key in this.cube) {
                    if (a === key) continue;
                    let item2 = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item2, key)
                        continue;
                    }

                    num++;
                    fuelValue += item2.fuelValue;
                    if (item2.type === 'light' && (item2.mod !== MOD_NORMAL || item2.embeddedList.length)) {
                        item2.fuelValue = 0;
                        item2.calcFuelLvl();
                        this.packAdd(item2);
                    }
                }
                
                item.fuelValue += fuelValue;
                if (item.fuelValue > item.fuelMax) item.fuelValue = item.fuelMax;
                item.calcFuelLvl();
                this.packAdd(item);
                name = item.getName()
            }
        } else if (l === book + scroll) {
            let tabId = RECIPE_CHARGE_BOOK;
            cost = recipes.get(tabId).cost;
            if (l > 1 && book && this.checkRecipe(tabId, cost)) {
                let book, scroll, blankBook, nameSkill, bookKey, scrollKey;
                let count = 0;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.type === 'book') {
                        if (item.tabId === B_BLANK_PAPER) blankBook = true;
                        if (!book || item.charges > book.charges) {
                            book = item;
                            bookKey = key;
                        }
                    } else if (item.type === 'scroll') {
                        scroll = item;
                        scrollKey = key;
                    }

                    if (item.chargeBook || item.type === 'scroll') {
                        if (!nameSkill) {
                            nameSkill = item.nameSkill;
                            count++;
                        } else if (nameSkill === item.nameSkill) {
                            count++;
                        }
                    }
                }

                if (l === 2 && blankBook && scroll) {
                    book.chargeBook = true;
                    book.charges = 0;
                    book.name['a'] = book.nameReal['a'] = scroll.nameReal['a'];
                    book.name['b'] = book.nameReal['b'] = scroll.nameReal['b'];
                    book.nameSkill = scroll.nameSkill;
                    book.skillLvl = scroll.skillLvl;
                    book.tabId = 100 + scroll.tabId;
                    let obj = this.chargeItem(book, scroll, cost, num);
                    if (obj.return) this.returnItem(scroll, scrollKey);
                    if (obj.charges) num += obj.charges;
                    this.packAdd(book);
                    name = book.getName()
                } else if (l > 1 && book && l === count && book.charges < MAX_CHARGE_NUM) {
                    for (let key in this.cube) {
                        if (key === bookKey) continue;
                        let item = this.cube[key];
                        let obj = this.chargeItem(book, item, cost, num);
                        if (obj.return) this.returnItem(item, key);
                        if (obj.charges) num += obj.charges;
                    }
                    
                    this.packAdd(book);
                    name = book.getName();
                }
            }
        } else if (embeddable === 1 && embedded && l === embeddable + embedded) {
            let tabId = RECIPE_EMBED;
            cost = recipes.get(tabId).cost;
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            if (embedded <= item.embeddedMax - item.embeddedNum && this.checkRecipe(tabId, cost)) {
                let found = true;
                for (let key in this.cube) {
                    let item2 = this.cube[key];
                    if (item2.equipable) continue;
                    if (item2.type === 'material' && item2.material !== item.material ||
                    item2.modParts && !item2.modParts[item.type]) {
                        found = false;
                        break;
                    }
                }
                
                if (found) {
                    let weight = 0;
                    for (let key in this.cube) {
                        let item2 = this.cube[key];
                        if (item2.equipable) continue;
                        if (mp < cost * (num + 1)) {
                            this.returnItem(item2, key)
                            continue;
                        }

                        num++;
                        let objMod = item2.modParts ? item2.modParts[item.type] : item2.modList;
                        mergeMod({
                            obj: item,
                            obj2: objMod,
                            fixed: true,
                        });
                        
                        weight += item2.weight;
                        item.embeddedNum++;
                        item.embeddedList.push(item2);
                    }

                    item.calcDurab();
                    item.weight = Math.round((item.weight + weight) * 100) / 100;
                    if (item.weapon) {
                        item.calcDmgOne();
                    } else if (item.armor) {
                        item.calcAcOne();
                    }
                    
                    this.packAdd(item);
                    name = item.getName();
                }
            }
		} else if (removable && l === 1) {
            let tabId = RECIPE_REMOVE;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item = this.cube['a'];
            if (!item.cursed && this.checkRecipe(tabId, cost)) {
                let weight = 0;
                for (let itemEmbedded of item.embeddedList) {
                    let objMod = itemEmbedded.modParts ? itemEmbedded.modParts[item.type] : itemEmbedded.modList;
                    mergeMod({
                        obj: item,
                        obj2: objMod,
                        fixed: true,
                        remove: true,
                    });
                    
                    weight -= itemEmbedded.weight;
                    this.packAdd(itemEmbedded);
                }

                item.embeddedNum = 0;
                item.embeddedList = [];
                item.weight = Math.round((item.weight + weight) * 100) / 100;
                item.calcDurab();
                if (item.weapon) {
                    item.calcDmgOne();
                } else if (item.armor) {
                    item.calcAcOne();
                }
                
                this.packAdd(item);
                msg = option.isEnglish() ?
                    'Removed materials' :
                    '素材を取り除いた';
            }
        } else if (l === 3 && unembeddable && gem && orb ) {
            let tabId = RECIPE_EXTEND;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            if (item.mod === MOD_NORMAL && this.checkRecipe(tabId, cost)) {
                item.embeddedMax = rndIntBet(1, item.embeddedLimit);
                this.packAdd(item);
                name = item.getName();
            }
        } else if (l === 4 && unembeddable && gem && orb && material) {
            let tabId = RECIPE_MATERIALIZE;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item, mat;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                } else if (item2.type === 'material') {
                    mat = item2;
                }

                if (item && mat) break;
            }

            if ((item.mod === MOD_MAGIC || item.mod === MOD_RARE) && item.material === mat.material && this.checkRecipe(tabId, cost)) {
                item = item.makeMaterial();
                this.packAdd(item);
                name = item.getName();
            }
        }
		
        if (name || msg) {
            this.cube = {};
            this.cubeIndex = {};
            if (!msg) {
                msg = option.isEnglish() ?
                    `Synthesized ${name}` :
                    `${name}を合成した`;
            }

            message.draw(msg);
            this.mp -= cost * num;
        } else {
            this.returnCubeItem()
            message.draw(message.get(M_NOTHING_HAPPENED));
		}
		
        inventory.clear();
        flag.synthesize = false;
        flag.regular = true;
        rogue.done = true;
    }

    checkRecipe(tabId, cost) {
        return this.recipes[tabId] && this.mp >= cost;
    }

    chargeItem(item, item2, cost, num) {
        let obj = {};
        if (this.mp <= cost * num || item.charges >= MAX_CHARGE_NUM) {
            obj.return = true;
            return obj;
        }

        let charges = item2.type === 'scroll' ? item2.quantity : item2.charges;
        let mpLimit = Math.floor(this.mp / cost) - num;
        let chargesLimit = MAX_CHARGE_NUM - item.charges;
        if (chargesLimit > mpLimit) chargesLimit = mpLimit;
        if (charges > chargesLimit) {
            charges = chargesLimit;
            obj.return = true;
            if (item2.type === 'scroll') {
                item2.quantity -= charges;
            } else {
                item2.charges -= charges;
            }
        }

        item.charges += charges;
        obj.charges = charges
        return obj;
    }


    returnCubeItem() {
        for (let key in this.cube) {
			this.returnItem(this.cube[key], key);
		}

        this.cube = {};
        this.cubeIndex = {};
    }

    returnItem(item, a) {
        switch (item.place) {
            case PLACE_PACK:
                this.packAdd(item);
                break;
            case PLACE_BOX:
                this.boxAdd(item, this.cubeIndex[a]);
                break;
            case PLACE_FLOOR:
                item.putDown(this.x, this.y, true);
                break;
        }
    }

    packOrUnpack(key) {
        if (flag.pack !== PLACE_PACK) {
            if (this.switchInventory(key, M_PACK_OR_UNPACK) || input.isShift) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.place === PLACE_BOX) {
                item = this.inventoryOut(item, item.quantity);
                if (!this.packAdd(item)) item.dropped();
            } else {
                this.ci = item;
                flag.pack = PLACE_PACK;
                if (Object.keys(this.boxes).length === 1) {
                    this.packOrUnpack('1');
				} else {
					message.draw(message.get(M_PACK_INTO), true);
				}

                return;
            }
        } else {
            let a = getNumber(key);
            if (!a || this.boxes[a] === undefined) return;
            let item = this.inventoryOut(this.ci, this.ci.quantity);
            this.ci = null;
            this.boxAdd(item, a);
            flag.pack = true;
		}
		
        inventory.clear();
        let msg = message.get(M_PACK_OR_UNPACK) + message.get(flag.floor ? M_PACK : M_FLOOR);
        this.showInventory(flag.floor ? PLACE_FLOOR : PLACE_PACK);
        this.showInventory(PLACE_BOX);
        message.draw(msg, true);
    }

    useBoxItem(key) {
        let item = this.boxes[key];
        if (!item) return;
        if (item.type === 'potion') {
            this.quaffPotion(null, item);
		} else if (item.type === 'scroll' || item.chargeBook) {
            if (this.canRead(item.chargeBook)) this.read(null, item);
        } else if (item.type === 'food') {
            this.eat(null, item);
		} else if (item.type === 'wand') {
            this.zap(null, item);
        } else if (item.type === 'light' || item.type === 'oil') {
            if (this.equipment['light']) this.fuel(null, item);
        } else if (item.type === 'ammo') {
            if (this.equipment['main'] &&
                this.equipment['main'].throwType === item.throwType) {
				this.autoAim(item);
			}
        }
    }

    autoAim(ammo) {
        let x, y;
        if (this.ce) {
            [x, y] = [this.ce.x, this.ce.y];
            if (!this.litMapIds[x + ',' + y] && (!this.ce.detected ||
                distanceSq(x, y, this.x, this.y) > FOV_SQ) ||
                !lineOfSight(this.x, this.y, x, y)) {
				return;
			}
        } else {
            this.searchCe();
            if (!this.ce) return;
            [x, y] = [this.ce.x, this.ce.y];
		}
		
        this.ci = ammo;
        flag.arrow = true;
        this.getShootMsg(ammo);
        this.aim({
            x1: x,
            y1: y,
        });
    }

    examine(key) {
        let loc = map.coords[cursor.x][cursor.y];
		if (key === 'x') {
            if (loc.item['a'] && this.litMapIds[cursor.x + ',' + cursor.y] &&
                distanceSq(cursor.x, cursor.y, this.x, this.y) <= FOV_SQ &&
                lineOfSight(this.x, this.y, cursor.x, cursor.y)) {
                flag.floor = true;
                flag.clearInv = true;
                inventory.show({
                    list: loc.item,
                    dr: DR_RIGHT,
                    place: PLACE_FLOOR
                })
			}
        } else if (key === 'c' || key === 'm' || key === 'e' || key === 'i') {
            let fighter = loc.fighter;
            if (fighter && fighter.isShowing() &&
                (fighter.id === ID_ROGUE || !rogue.hallucinated)) {
                if (fighter.mimic && !fighter.identified && !rogue.isWizard) return;
                if (key === 'c') {
                    flag.character = true;
                    investigation.main(fighter ,DR_MIDDLE, true);
                    Vue.nextTick(function(){
                        investigation.scroll(null, true);
                    });
				} else {
                    if (key === 'm') {
                        fighter.showSkill(fighter.skill);
                    } else if (key === 'e' && this.isWizard) {
                        fighter.equipmentList();
                    } else if (key === 'i' && this.isWizard) {
                        fighter.showInventory(PLACE_PACK);
                    }

                    flag.clearInv = true;
                }
			}
        } else if (key === 't' || key === 'r') { //t
            if (flag.wormhole) {
                if (key === 'r') {
                    flag.wormhole = false;
				} else {
                    this.wormhole(cursor.x, cursor.y);
                    return;
                }
			}
			
            if (key === 'r') {
                this.ce = null;
			} else if (loc.fighter && loc.fighter.id !== ID_ROGUE && loc.fighter.isShowing()) {
                this.ce = loc.fighter;
            } else if (!flag.aim) {
                loc.getInfo();
                return;
			}
			
            if (flag.aim && key === 't') {
                if (flag.skill || flag.scroll) {
                    let nameSkill = flag.skill ? this.cs.id : this.ci.nameSkill;
                    if (skillMap.get(nameSkill).range === 0) [cursor.x, cursor.y] = [this.x, this.y];
				}
				
                this.aim({
                    x1: cursor.x,
                    y1: cursor.y,
                });
			}
			
            this.cancelCommand();
		} else {
            cursor.move(key);
        }
    }

    examinePlot(init) {
        cursor.clearAll();
        let [x, y] = init ? [this.x, this.y] : [cursor.x, cursor.y];
        let color = colorList.white;
        let skill;
        if (flag.zap) {
            if (this.ci.identified || itemTab[this.ci.type].get(this.ci.tabId).identified) { //
                skill = skillMap.get(this.ci.nameSkill);
                color = skill.color;
            }
        } else if (flag.skill || flag.scroll) {
            skill = skillMap.get(flag.skill ? this.cs.id : this.ci.nameSkill);
            color = skill.color;
            if (skill.range === 0) [x, y] = [this.x, this.y];
		}
        
        lineOfSight(this.x, this.y, x, y, color, skill);
        if (init) map.draw(x, y, true);
    }

    examineMsg() {
        let msg = message.get(M_EXAMINE);
        if (this.isWizard) msg += message.get(M_EXAMINE_W);
        message.draw(msg + ` (${cursor.x},${cursor.y})`, true);
    }

    cancelCommand() {
        if (flag.synthesize) {
            this.returnCubeItem();
		} else if (flag.aim || flag.examine) {
            cursor.clearAll();
            map.draw();
            this.checkCe();
        } else if (flag.minimap) {
            map.drawObjectAll();
            map.draw();
        }

        inventory.clear();
        initFlag();
        this.ci = null;
    }

    assginSkills(key) {
        let isFuncKey = /^F\d/.test(key);
        if (flag.assign === 1) {
            if (key === 'M' || isFuncKey) {
                let i = key === 'M' ? 0 : key.replace('F', '');
                if (!this.keysList[i]) return;
                this.keysList[i] = null;
                inventory.clear();
                this.showSkill(this.skill);
                this.showSkill(this.keysList, true);
                message.draw(message.get(M_ASSIGN_SKILL), true);
            } else {
                let a = getAlphabet(key);
                if (!a || !this.skill[a]) return;
                flag.assign = 2;
                this.ca = a;
                message.draw(message.get(M_ASSIGN_SKILL2), true);
            }
        } else {
            if (key !== 'M' && !isFuncKey) return;
            let i = key === 'M' ? 0 : key.replace('F', '');
            this.keysList[i] = this.skill[this.ca].id;
            flag.assign = 1;
            inventory.clear();
            this.showSkill(this.skill);
            this.showSkill(this.keysList, true);
            message.draw(message.get(M_ASSIGN_SKILL), true);
        }
    }

    gainStatOrSkill(key) {
        if (flag.gain === 1 && !flag.number) {
            let gainStat = input.isShift;
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            if (gainStat && !statistics.list[a] || !gainStat && !this.pack[a]) return;
            if (gainStat) {
                if (!this.statPoints) {
                    message.draw(message.get(M_CANT_GAIN_STAT));
                    return;
                } else if (this[statistics.list[a].term + 'Max'] >= MAX_STAT_LVL) {
                    let name = statistics.list[a].name[option.getLanguage()];
                    message.draw(option.isEnglish() ?
                        `You can't gain ${name} anymore` :
                        `これ以上${name}を取得が出来ない`);
                    return;
                }
            } else if (this.pack[a].type !== 'book' || !this.pack[a].skill || !this.canRead(true)) {
                return;
            }
			
            this.ca = a;
            inventory.clear();
            if (gainStat) {
                inventory.showStats(this, a);
                flag.gain = 3;
                flag.number = true;
                this.inputNumber();
            } else {
                this.showSkill(this.pack[a].list);
                flag.gain = 2;
                message.draw(message.get(M_GAIN_SKILL), true);
            }
        } else if (flag.gain === 2 && !flag.number) { //skill
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            let id = this.pack[this.ca].list[a];
            if (!id) return;
            let skill = skillMap.get(id);
            if (input.isShift) {
                investigation.skill(this, skill);
                return;
			}
			
            let keySkill = this.searchSkill(id);

            //TODO
            let lvl = keySkill ? this.skill[keySkill].lvl : 0;
            if (this.lvl < skill.reqLvl + lvl ||
                skill.reqSynerzy && skill.reqSynerzy > this.getSynerzy(skill)) {
				return;
			}

            if (!this.skillPoints ||
                !keySkill && Object.keys(this.skill).length >= MAX_SKILL_NUM) {
                message.draw(message.get(M_CANT_GAIN_SKILL));
                return;
            } else if (keySkill && lvl === MAX_SKILL_LVL) {
                let nameSkill = skill.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't study ${nameSkill} anymore` :
                    `これ以上${nameSkill}の知識を得られない`);
                return;
			}
			
            this.cs = id;
            flag.number = true;
            inventory.clear();
            this.showSkill(this.pack[this.ca].list);
            this.inputNumber();
        } else {
            if (flag.gain === 2) { //skill
                let skill = skillMap.get(this.cs);
                let key = this.searchSkill(this.cs);
                let lvl = key ? this.skill[key].lvl : 0;
                let gainLvl = this.lvl - (lvl + skill.reqLvl) + 1;
                if (MAX_SKILL_LVL < lvl + gainLvl) gainLvl = MAX_SKILL_LVL - lvl;
                let point = this.skillPoints >= gainLvl ? gainLvl : this.skillPoints;
                let i = this.cn;
                if (i > point) i = point;
                let name = skill.name[option.getLanguage()];
                if (!key) { //new skill
                    key = eaList[Object.keys(this.skill).length];
                    this.skill[key] = {}
                    this.skill[key].id = this.cs;
                    this.skill[key].lvl = 0;
                    message.draw(option.isEnglish() ?
                        `You gained ${name}` :
                        `${name}を習得した`);
                } else {
                    message.draw(option.isEnglish() ?
                        `You studied ${name} deeply` :
                        `${name}の知識を深めた`);
				}
                
                this.skillPoints -= i;
                this.skill[key].lvl += i;
                this.gainSynerzy(skill, i);
            } else if (flag.gain === 3) { //stat
                let stat = statistics.list[this.ca];
                let nameMax = stat.term + 'Max';
                let lvl = MAX_STAT_LVL - this[nameMax];
                let point = this.statPoints >= lvl ? lvl : this.statPoints;
                let i = this.cn;
                if (i > point) i = point;
                let name = stat.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You gained ${name}` :
                    `${name}を得た`);
                this.statPoints -= i;
                this[nameMax] += i;
                this[stat.term] = this[nameMax];
                this.calcAll();
			}
			
            inventory.clear();
            flag.gain = false;
            flag.regular = true;
            rogue.done = true;
        }
    }

    castSkill(key) {
        if (input.isCtrl && key === 's' && Object.keys(this.skill).length >= 2) {
            flag.skill = false;
            flag.sortSkill = 1;
            inventory.clear();
            this.showSkill(this.skill);
            message.draw(message.get(M_SORT_SKILL), true);
            return;
		}
		
        let a = getAlphabet(key);
        a = a.toLowerCase();
        if (!a || !this.skill[a]) return;
        let skill = skillMap.get(this.skill[a].id);
        if (input.isShift) {
            inventory.clear();
            this.showSkill(this.skill);
            investigation.skill(this, skill);
            flag.skill = true;
            message.draw(message.get(M_CAST), true);
            return;
		}
		
        if (!this.checkToCast(skill)) return;
        inventory.clear();
        this.cs = this.skill[a];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
        } else {
            flag.aim = true;
            message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
            this.examinePlot(true);
            return;
		}
		
        flag.skill = false;
        rogue.done = true;
        flag.regular = true;
    }

    castAssignedSkill(key, keyDr) {
        let i = key === 'M' ? 0 : key.replace('F', '');
        if (!this.keysList[i] || !this.checkToCast()) return;
        let id = this.keysList[i];
        let skill = skillMap.get(id);
        if (!this.checkToCast(skill)) return;
        flag.skill = true;
        this.cs = this.skill[this.searchSkill(id)];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
            rogue.done = true;
            flag.skill = false;
        } else if (skill.range === 0) {
            this.aim({
                x1: this.x,
                y1: this.y,
                nameSkill: id,
            });
        } else if (key === 'M') {
            this.aim({
                key: keyDr,
                nameSkill: id,
            });
        } else if (skill.wall) {
            input.switchFlag();
            flag.aim = true;
            message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
            this.examinePlot(true);
        } else {
            let x, y;
            if (this.ce) {
                [x, y] = [this.ce.x, this.ce.y];
                if (!this.litMapIds[x + ',' + y] && (!this.ce.detected ||
                    distanceSq(x, y, this.x, this.y) > FOV_SQ) ||
                    !lineOfSight(this.x, this.y, x, y)) {
                    flag.skill = false;
                    return;
                }
            } else {
                this.searchCe();
                if (!this.ce) {
                    flag.skill = false;
                    return;
                } else {
					[x, y] = [this.ce.x, this.ce.y];
				}
			}
			
            this.aim({
                x1: x,
                y1: y,
                nameSkill: id,
            });
        }
    }

    sortSkill(key) {
        if (flag.sortSkill === 1) {
            this.ca = getAlphabet(key);
            if (!this.ca || !this.skill[this.ca]) return
            flag.sortSkill = 2;
            message.draw(message.get(M_SORT_SKILL2), true);
        } else {
            let a = getAlphabet(key);
            if (!a || !this.skill[a] || a === this.ca) return;
            [this.skill[a], this.skill[this.ca]] = [this.skill[this.ca], this.skill[a]];
            inventory.clear();
            this.showSkill(this.skill);
            flag.sortSkill = 1;
            message.draw(message.get(M_SORT_SKILL), true);
        }
    }

    getItem(a, floor) {
        let item;
        if (isFinite(a)) {
            item = this.boxes[a];
		} else if (floor) {
            item = map.coords[this.x][this.y].item[a];
        } else if (input.isShift) {
            item = this.equipment[bpList[a]];
		} else {
			item = this.pack[a];
		}

        return item;
    }

    switchInventory(key, id, equipment) {
        if (key !== ',' && key !== '.') return false;
        inventory.clear();
        let msg = message.get(id);
        if (flag.synthesize || flag.pack) this.showInventory(flag.pack ? PLACE_BOX : PLACE_CUBE);
        if (key === ',') {
            flag.floor = false;
            if (equipment) this.equipmentList();
            msg += message.get(M_FLOOR);
            this.showInventory(PLACE_PACK);
        } else if (key === '.') {
            flag.floor = true;
            msg += message.get(M_PACK);
            this.showInventory(PLACE_FLOOR);
		}
		
        message.draw(msg, true);
        return true;
    }

    destroy(key) {
        if (!flag.number) {
            if (this.switchInventory(key, M_DESTROY, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.indestructible || item.cursed && input.isShift && flag.floor) {
                message.draw(message.get(M_CANT_DESTROY));
                return;
			}
			
            inventory.clear();
            flag.number = true;
            flag.floor = false;
            this.showInventory(item.place, a);
            this.inputNumber();
            this.ci = item;
        } else {
            let item = this.ci;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            this.deleteItem(item, i);
            let name = item.getName(false, i)
            message.draw(option.isEnglish() ?
                `Destroyed ${name}` :
                `${name}を破壊した`);
            inventory.clear();
            flag.destroy = false;
            flag.regular = true;
            rogue.done = true;
        }
    }

    shop(key, isAlt) {
        let shop = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            let buy = input.isShift;
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = buy ? shop.list[a] : this.pack[a];
            if (!item) return;
            if (isAlt) {
                if (flag.gamble && buy) return;
                let place = buy ? PLACE_SHOP : PLACE_PACK;
                let direction = buy ? DR_RIGHT : DR_LEFT;
                this.investigate(null, item, place, direction);
                return;
            }

            if (!buy && Object.keys(shop.list).length === MAX_PACK_COUNT) {
                message.draw(message.get(M_CANT_SELL));
                return;
            } else if (buy && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ca = a;
            this.ci = item;
            inventory.clear();
            flag.number = true;
            this.showInventory(item.place, a);
            this.inputNumber();
        } else {
            let item = this.ci;
            this.ci = null;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            let amount = item.price * i;
            if (item.place === PLACE_PACK) {
                item = this.inventoryOut(item, i);
                let l = Object.keys(shop.list).length;
                shop.list[eaList[l]] = item;
                item.place = PLACE_SHOP;
                this.purse += amount;
                if (!item.identified) {
                    item.identified = true;
                    item.changeNameAndPrice();
				}
				
                item.price *= 2;
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Sold ${name} for $${amount}` :
                    `${name}を$${amount}で売却した`);
                audio.playSound('coin');
            } else if (this.purse < amount) {
                message.draw(message.get(M_DONT_HAVE_MONEY));
			} else {
                item = item.split(i, shop.list);
                item.changeNameAndPrice();
                this.packAdd(item);
                this.purse -= amount;
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Bought ${name} for $${amount}` :
                    `${name}を$${amount}で購入した`);
                audio.playSound('grab');
			}
			
            flag.number = false;
            inventory.clear();
            this.cn = 1;
            let msg = message.get(M_SHOP);
            msg = shop.name[option.getLanguage()] + msg;
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_SHOP);
            message.draw(msg, true);
        }
    }

    stash(key, isAlt) {
        let stash = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            if (key === '<' || key === '>') {
                if (key === '>' && stash.page < MAX_STASH_PAGE) {
                    stash.page++;
				} else if (key === '<' && stash.page > 1) {
					stash.page--;
				}

                inventory.clear();
                let msg = message.get(M_STASH)
                this.showInventory(PLACE_PACK);
                this.showInventory(PLACE_STASH);
                message.draw(msg, true);
                return;
			}
			
            let a, item;
            if (input.isShift) {
                if (!getAlphabet(key)) return;
                let num = eaList.indexOf(key.toLowerCase());
                if (num >= MAX_PACK_COUNT) return;
                a = num + (stash.page - 1) * MAX_PACK_COUNT;
                item = stash.list[a];
            } else {
                a = getAlphabetOrNumber(key);
                if (!a) return;
                a = a.toLowerCase();
                item = this.getItem(a);
			}
			
            if (!item) return;
            if (isAlt) {
                let place = input.isShift ? PLACE_STASH : PLACE_PACK;
                let direction = input.isShift ? DR_RIGHT : DR_LEFT;
                this.investigate(null, item, place, direction);
                return;
            }

            if (!input.isShift && Object.keys(stash.list).length === MAX_STASH_COUNT &&
                !this.canCarryItem(stash.list, item)) {
                message.draw(message.get(M_CANT_ADD));
                return;
            } else if (input.isShift && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ci = item;
            flag.number = true;
            if (item.quantity === 1) {
                this.cn = 1;
                this.stash();
            } else {
                this.ca = a;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
            }
        } else {
            let item = this.ci;
            this.ci = null;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            if (item.place === PLACE_STASH) {
                item = item.split(i, stash.list);
                this.packAdd(item);
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Take out ${name}` :
                    `${name}を持物に加えた`);
            } else {
                item = this.inventoryOut(item, i);
                let num = this.stashAdd(stash.list, item);
                stash.page = Math.ceil((Number(num) + 1) / MAX_PACK_COUNT);
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Stored ${name}` :
                    `${name}を保管した`);
			}
			
            flag.number = false;
            inventory.clear();
            let msg = message.get(M_STASH);
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_STASH);
            message.draw(msg, true);
        }
    }

    cureShop(key) {
        let cure = map.coords[this.x][this.y].enter;
        let a = getAlphabet(key);
        if (!a || !cure.list[a]) return;
        let cost = cure.list[a].cost;
        if (cost > this.purse) {
            message.draw(message.get(M_DONT_HAVE_MONEY));
            return;
		}
		
        this.purse -= cost;
        let name = cure.list[a][LETTER_ENG];
        if (name === 'recover completely') {
            this.recovery();
            // message.draw(message.get(M_RECOVER_ALL));
        } else if (name === 'restore health and mana') {
            this.hp = this.hpMax;
            this.mp = this.mpMax;
        } else if (name === 'restore stats') {
            this.haveCast(RESTORE_ALL, 10, this);
		} else if (name === 'restore condition') {
            this.haveCast(CURE_ALL, 10, this);
        } else if (name === 'have a meal') {
			this.hunger = MAX_HUNGER;
		}

        flag.cure = false;
        flag.regular = true;
        inventory.clear();
    }

    revive() {
        this.recovery();
        flag.died = false;
        flag.regular = true;
        rogue.cdl = 0;
        game.clearLevel();
        creation.town();
    }

    recovery() {
        this.haveCast(RESTORE_ALL, 10, this);
        this.haveCast(CURE_ALL, 10, this);
        this.hunger = MAX_HUNGER;
        this.hp = this.hpMax;
        this.mp = this.mpMax;
    }

    trapped(trap, stepOn) {
        if (flag.dash) flag.dash = false;
        let loc = map.coords[this.x][this.y];
        if (loc.hidden) loc.hidden = false;
        if (coinToss()) loc.deleteTrap();
        if (trap.nameSkill) {
            this.haveCast(trap.nameSkill, trap.lvl, this);
            return;
		}
		
        let name = trap.name[LETTER_ENG];
        if (name === 'Trap Door') {
            if (this.levi && !stepOn) {
                message.draw(message.get(M_FLOAT));
			} else if (rogue.cdl !== 33 || this.inferno) {
				this.downOrUpStairs(null, true);
			}
        } else if (name === 'Bear Trap') {
            this.stuckTrap = rndIntBet(4, 6);
        } else if (name === 'Arrow Trap') {
            let dmg = rndIntBet(4, 6);
            this.hp -= dmg;
            message.draw(option.isEnglish() ?
                `An arrow hits you by ${dmg}` :
                `矢はあなたに${dmg}のダメージを与えた`);
            if (this.hp <= 0) this.died();
        }
    }

    healAndHunger() {
        let light = this.equipment['light'];
        if (light && light.fuelValue && light.durab) {
            if (--light.fuelValue === 0) {
                this.lighten -= light.lighten;
                this.lightenOrDarken('Lighten');
                message.draw(message.get(M_LIGHT_GONE));
            }

            light.calcFuelLvl();
		}
		
        if (this.hunger > 0) {
            this.heal();
            let cost = Math.floor((this.hpReg + this.mpReg - this.digest) / 10);
            let hunTemp = this.hunger;
            if (cost > 0) {
                this.hunger -= cost;
                if (this.hunger < 0) this.hunger = 0;
            } else if (rogue.turn % (-cost + 1) === 0) {
                this.hunger--;
            }

            if (hunTemp > 200 && this.hunger <= 200) audio.playSound('hungry');
            if (!this.hunger) message.draw(message.get(M_STARVED));
        } else {
            this.hp--;
            if (this.hp <= 0) this.died();
		}
		
        if (!this.hunger && (flag.dash || flag.rest)) flag.dash = flag.rest = false;
        this.checkCe();
        this.calcCondition();
    }

    inputNumber(key) {
        if (!key) {
            this.cn = 1;
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return
        }
        
        let num = getNumber(key);
        let all = key === 'a';
        let isEnter = key === 'Enter';
        let isBackspace = key === 'Backspace';
		if (!num && !all && !isEnter && !isBackspace) return;
        if (num === '0' && (this.cn === '' || this.cn === 1) || isEnter && this.cn === '') return;
		if (isBackspace || num) {
            if (this.cn === 1) this.cn = '';
            if (isBackspace) {
                this.cn = this.cn.substr(0, this.cn.length - 1);
			} else {
				this.cn += num;
            }
            
            if (flag.shop) {
                inventory.clear();
                this.showInventory(this.ci.place, this.ca);
			}
			
            let msg = message.get(M_NUMBER) + this.cn;
            message.draw(msg, true);
            return;
        }
        
        this.cn = all ? Infinity : Number(this.cn);
        if (flag.drop) {
            this.drop();
		} else if (flag.gain) {
            this.gainStatOrSkill();
        } else if (flag.destroy) {
            this.destroy();
		} else if (flag.shop) {
            this.shop();
        } else if (flag.stash) {
			this.stash();
		}

        flag.number = false;
    }

    checkUnique() {
        this.checkUniqueLoop(map.itemList);
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            this.checkUniqueLoop(enemy.pack);
            this.checkUniqueLoop(enemy.equipment);
            this.checkUniqueLoop(enemy.side);
            this.checkUniqueLoop(enemy.boxes);
            if (enemy.mod === MOD_UNIQUE) delete this.cue[enemy.name[LETTER_ENG]];
        }
    }

    checkUniqueLoop(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            if (item.mod === MOD_UNIQUE && !item.identified) {
                let id = item.type + ',' + item.tabId + ',' + item.uniqueId;
                if (this.cui[id]) delete this.cui[id];
            } else if (item.lethe) {
				this.lethe--;
			}
        }
    }

    checkItem(item, type) {
        let found = this.checkItemLoop(this.boxes, item, type);
        // if(!found) found = this.checkItemLoop(this.pack,item,type);
        return found;
    }

    checkItemLoop(list, item, type) {
        for (let key in list) {
            let item2 = list[key];
            if (!item2) continue;
            if (type === CHARGE && (item.type === 'wand' && item2.type === 'wand' ||
            (item.type === 'scroll' || item.chargeBook) && item2.chargeBook) &&
            item2.nameSkill === item.nameSkill && item2.charges < MAX_CHARGE_NUM) {
                if (item2.quantity > 1) continue;
                if (item.charges && item.charges > item2.charges) {
                    [item.charges, item2.charges] = [item2.charges, item.charges];
                }

                let obj2 = {};
                let cost = itemTab['recipe'].get(item2.chargeBook ? RECIPE_CHARGE_BOOK : RECIPE_WAND).cost;
                let obj = this.chargeItem(item2, item, cost, 0);
                obj2.delete = !obj.return;
                if (obj.charges) this.mp -= obj.charges;
                obj2.item = item2;
                return obj2;
            } else if (type === IDENTIFY && item2.nameSkill === IDENTIFY &&
                (!item2.chargeBook || item2.charges)) {
                this.ci = item2;
                flag.scroll = true;
                this.identify(null, item);
                return;
            }
		}
		
        return false;
    }

    checkCe() {
        statistics.clearEnemyBar();
        if (!this.ce) return;
        if (!this.ce.isShowing()) {
            statistics.clearEnemyBar();
            this.ce = null;
        } else {
			statistics.drawEnemyBar(this.ce);
        }
    }

    getCe(fighter, melee) {
        if (fighter.id !== ID_ROGUE && (melee || !this.ce) && fighter.isShowing()) this.ce = fighter;
    }

    getName(subject, proper) {
        let name;
        if (proper) {
            name = this.name[option.getLanguage()];
		} else if (option.isEnglish()) {
            name = subject ? 'You' : 'you'
        } else {
			name = subject ? '' : 'あなた';
		}

        return name;
    }

    isOpponent(fighter) {
        return fighter.id !== ID_ROGUE;
    }

    isShowing() {
        return !this.invisible;
    }

    removeCe() {
        this.ce = null;
        statistics.clearEnemyBar();
    }

    goBlind(clear) {
        map.drawObjectAll();
        map.draw();
        if (!clear) this.removeCe();
    }
}
