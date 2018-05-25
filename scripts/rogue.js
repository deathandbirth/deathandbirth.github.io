const Rogue = class extends Fighter {
    constructor() {
        super(fighterTab['misc'][0])
        this.name['a'] = this.name['b'] = data.name;
        this.id = ROGUE;
        this.dmgBare = this.dmgBase;
        this.expMax = this.exp = 0;
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        this.cube = {};
        this.cubeIndex = {};
        this.hunger = MAX_HUNGER / 2;
        this.purse = 500;
        this.bookmarks = {};
        this.numSteps = 0;
        this.skill = {};
        this.detected = true;
        this.ce = null; //current enemy
        this.dl = 0; //dungeon level
        this.pdl = 0; //portal dungeon level
        this.cdl = 0; //current dungeon level
        this.cui = {}; //current unique item
        this.cue = {}; //current unique enemy
        this.lethe = 0;
        this.turn = 1;
        this.done = false;
        this.initBookmarks();
    }

    init() {
        if (this.starter) this.getStarterItems();
        this.calcAll();
        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = this.spd;
    }

    initBookmarks() {
        for (let i = 0; i < MAX_BOOKMARK_NUM; i++) {
			this.bookmarks[i] = null;
		}
    }

    move(keyCodeDr, dr) {
        if (this.confused) {
            dr = DR[rndInt(DR.length - 1)];
		} else if (keyCodeDr) {
			dr = getDirection(keyCodeDr);
		}

        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
        } else if (loc.fighter) {
            if (this.haveMissile()) {
                this.ci = this.getAmmo(this.equipment['main'].throwType);
                if (this.ci) {
                    flag.arrow = true;
                    let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows'
                    message.draw(option.isEnglish() ?
                        `You shot ${arrow}` :
                        `矢を放った`);
                    this.aim({ keyCode: keyCodeDr });
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
                this.cost -= this.timesMove;
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
            map.draw(rogue.x, rogue.y);
        }
    }

    dash(keyCodeDr) {
        if (this.confused) return;
        let dr = getDirection(keyCodeDr);
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
                    this.dashSearch(dr, drLUp, drRUp) : null;
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

    dashSearch(dr, drLUp, drRUp) {
        let key1 = -1;
        let keyDia = -1;
        for (let key in DR) {
            if (!map.coords[this.x + DR[key].x][this.y + DR[key].y].wall &&
               	-DR[key].x !== dr.x && -DR[key].y !== dr.y) {
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
		
        return keyDia !== -1 && DR[keyDia].x !== DR[key1].x &&
            DR[keyDia].y !== DR[key1].y ? null : DR[key1];
    }

    searchDoor() {
        let tempX, tempY;
        let count = 0;
        for (let key in DR) {
            let [x, y] = [this.x + DR[key].x, this.y + DR[key].y]
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

    openOrCloseDoor(keyCode) {
        let dr = getDirection(keyCode);
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

    attackStationary(keyCodeDr) {
        if (this.bookmarks[0] !== null) {
            this.castBookmarkedSkill(48, keyCodeDr);
		} else if (this.haveMissile()) {
            this.ci = this.getAmmo(this.equipment['main'].throwType);
            if (this.ci) {
                flag.arrow = true;
                let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
                message.draw(option.isEnglish() ?
                    `You shot ${arrow}` :
                    `矢を放った`);
                this.aim({ keyCode: keyCodeDr });
            } else {
				message.draw(message.get(M_DONT_HAVE_AMMO));
			}
        } else {
            let dr = getDirection(keyCodeDr);
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
        rogue.drawStats();
        if (this.blinded || this.hallucinated) {
            this.blinded = 0;
            if (this.hallucinated) {
                this.hallucinated = 0;
                hallucinate.all(true);
            } else {
				map.redraw(rogue.x, rogue.y);
			}
		}
		
        map.draw(rogue.x, rogue.y);
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

    drawStats() {
        let j = -2.5;
        statistics.drawEnemyBar(this.ce);
        this.calcCondition(false, true);
        statistics.clear();
        this.drawBoxes();
        statistics.drawCurrentEnemy(this.ce);
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        ctxStats.fillStyle = this.getConditionColor();
        display.rect({
            ctx: ctxStats,
            y:  -SS,
            yPx: display.height,
            widthPx: (this.hp / this.hpMax) * display.width / 2,
            heightPx: 3,
        });

        ctxStats.fillStyle = colorList.blue;
        display.rect({
            ctx: ctxStats,
            xPx: (2 - this.mp / this.mpMax) * display.width / 2,
            y: -SS,
            yPx: display.height,
            widthPx: display.width / 2,
            heightPx: 3,
        });

        ctxStats.restore();

        let [level, exp, str, dex, con, int, spd] = option.isEnglish() ? ['Level', 'Exp', 'Str', 'Dex', 'Con', 'Int', 'Spd'] :
            ['レベル', '経験値', '筋', '器', '耐', '知', '速'];
        statistics.draw({
            msg: `${level} ${this.lvl}`,
            x: 0.5,
            y: j,
            color: this.lvl < this.lvlMax ? colorList.yellow : undefined,
        });

        statistics.draw({
            msg: `${exp} ${this.exp}`,
            x: 5,
            y: j,
            color: this.exp < this.expMax ? colorList.yellow : undefined,
            shadow: this.expBuff ? colorList.buff : undefined,
            limit: 6,
        });

        statistics.draw({
            msg: `$ ${this.purse}`,
            x: 11.5,
            y: j,
            limit: 5,
        });

        statistics.draw({
            msg: `HP ${this.hp}/${this.hpMax}`,
            x: 17,
            y: j,
            color: this.hp <= 0 ? colorList.red : undefined,
        });

        statistics.draw({
            msg: `MP ${this.mp}/${this.mpMax}`,
            x: 24.5,
            y: j,
            color: this.mp <= 0 ? colorList.red : undefined,
            limit: 6,
        });

        statistics.draw({
            msg: `${str} ${this.str}`,
            x: 31,
            y: j,
            color: this.str < this.strMax ? colorList.yellow :
                this.strSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${dex} ${this.dex}`,
            x: 34.5,
            y: j,
            color: this.dex < this.dexMax ? colorList.yellow :
                this.dexSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${con} ${this.con}`,
            x: 38,
            y: j,
            color: this.con < this.conMax ? colorList.yellow :
                this.conSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${int} ${this.int}`,
            x: 41.5,
            y: j,
            color: this.int < this.intMax ? colorList.yellow :
                this.intSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${spd} ${this.spd}`,
            x: 45,
            y: j,
            color: this.slowed ? colorList.red : undefined,
            shadow: this.speeded ? colorList.buff : undefined,
            limit: 2.5,
        });

        let msg;
        if (!rogue.cdl) {
            msg = option.isEnglish() ? 'Limbo' : '辺獄';
		} else {
            if (rogue.cdl >= 1 && rogue.cdl <= 33) {
                msg = option.isEnglish() ? 'Hell B' : '地獄 地下';
                msg += rogue.cdl;
            } else if (rogue.cdl >= 34 && rogue.cdl <= 66) {
                msg = option.isEnglish() ? 'Purgatory' : '煉獄';
                msg += rogue.cdl - 33;
            } else if (rogue.cdl >= 67 && rogue.cdl <= 99) {
                msg = option.isEnglish() ? 'Heaven' : '天国';
                msg += rogue.cdl - 66;
            }
		}
		
        statistics.draw({
            msg: msg,
            x: IN_WIDTH + 0.5,
            y: j + 1,
            right: true,
        });
    }

    drawBoxes() {
        let x = 1;
        let ctxStats = display.ctxes.stats;
        for (let i = 1; i <= this.numBoxes; i++) {
            let item = this.boxes[i];
            ctxStats.save();
            ctxStats.textAlign = 'center';
            ctxStats.fillStyle = colorList.gray;
            ctxStats.strokeStyle = colorList.gray;
            ctxStats.lineWidth = 0.5;
            display.rect({
                ctx: ctxStats,
                x: x + i * 1.4 - 1,
                y: -1.5,
                yPx: display.height,
                width: 1,
                height: 1,
                stroke: true,
            });

            if (!item) {
                display.text({
                    ctx: ctxStats,
                    msg: i,
                    x: x + i * 1.4 - 0.5,
                    y: -1,
                    yPx: display.height,
                });
			} else {
                if (item.shadow) ctxStats.shadowColor = item.shadow;
                ctxStats.fillStyle = item.color;
                display.text({
                    ctx: ctxStats,
                    msg: item.symbol,
                    x: x + i * 1.4 - 0.5,
                    y: -1,
                    yPx: display.height,
                    stroke: item.stroke,
                });

                ctxStats.font = display.fs / 2 + 'px ' + FONT_STYLE[option.getLanguage()];
                ctxStats.fillStyle = colorList.white;
                ctxStats.shadowColor = colorList.clear;
                display.text({
                    ctx: ctxStats,
                    msg: item.quantity,
                    x: x + i * 1.4,
                    y: -0.5,
                    yPx: display.height,
                    stroke: item.stroke,
                });

                if (item.charges >= 0 && item.identified) {
                    display.text({
                        ctx: ctxStats,
                        msg: item.charges,
                        x: x + i * 1.4,
                        y: -1,
                        yPx: display.height,
                    });
                }
			}
            
            x += 0.1;
            ctxStats.restore();
            if (i === MAX_BOX_NUM) break;
        }
    }

    getStartPointInTown() {
        if (!rogue.cdl && rogue.dl) {
            [this.x, this.y] = [POSITION.hell.x, POSITION.hell.y];
		} else {
			[this.x, this.y] = [POSITION.start.x, POSITION.start.y];
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
        this.drawStats();
        map.queue.push(this);
    }

    downOrUpStairs(keyCode, trap) {
        let loc = map.coords[this.x][this.y];
        if (!trap && !loc.stairs || loc.hidden) return;
        let dr = trap ? null : loc.stairs.id;
        if (trap || dr === DOWN && keyCode === 190) {
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
        } else if (dr === UP && keyCode === 188) {
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
            portal.init(LOCATION, this.x, this.y);
		}
		
        audio.playSound('tplevel');
    }

    enterBuild(enter) {
        flag.regular = false;
        map.draw(rogue.x, rogue.y);
        if (enter.stash) {
            flag.stash = true;
            enter.page = 1;
            this.showInventory(P_PACK);
            this.showInventory(P_STASH);
            message.draw(message.get(M_STASH), true);
            return;
        } else if (enter.shop) {
            flag.shop = true;
            this.cn = 1;
            flag.gamble = enter.gamble;
            this.showInventory(P_PACK);
            if (!enter.list['a']) enter.createShopItem();
            this.showInventory(P_SHOP);
            message.draw(message.get(M_SHOP), true);
        } else if (enter.cure) {
            flag.cure = true;
            inventory.show(enter.list, RIGHT, false, false, enter);
            message.draw(message.get(M_CURE), true);
        } else if (enter.blacksmith) {
            flag.blacksmith = true;
            this.equipmentList();
            this.showInventory(P_PACK);
            message.draw(message.get(M_BLACKSMITH), true);
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

    grabItem(keyCode, a) {
        let loc = map.coords[this.x][this.y];
        if (flag.grab) {
            if (keyCode) a = getAlphabet(keyCode);
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
                this.grabItem(65);
			} else {
                this.showInventory(P_FLOOR);
                message.draw(message.get(M_GRAB), true);
                flag.regular = false;
            }
        }
    }

    drop(keyCode) {
        let item;
        if (!flag.number) {
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a);
            if (!item || item.place === P_EQUIPMENT && item.cursed) return;
            if (item.quantity > 1) {
                this.ci = item;
                flag.number = true;
                this.inputNumber();
                return;
            } else {
				item = this.inventoryOut(item, 1);
			}
        } else {
            item = this.ci;
            let i = item.getQuantity(keyCode, this.cn);
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

    equip(keyCode) {
        if (this.switchInventory(keyCode, M_EQUIP)) return;
        let a = getAlphabetOrNumber(keyCode);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item || !item.equipable) return;
        flag.floor = false;
        let parts = this.getParts(item);
        if (!parts) return;
        item = this.inventoryOut(item, 1);
        item.place = P_EQUIPMENT;
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
        this.calcAll();
        inventory.clear();
        this.equipmentList();
        flag.equip = false;
        flag.regular = true;
        rogue.done = true;
        flag.clearInv = true;
    }

    unequip(keyCode, parts) {
        if (!parts) {
            let a = getAlphabet(keyCode);
            if (!a) return;
            parts = BP[a];
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
        for (let key in BP) {
            if (this.equipment[BP[key]]) return false;
		}
		
        return true;
    }

    fuel(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_FUEL, true)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            let a = getAlphabetOrNumber(keyCode);
            if (!a || input.isShift) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'light' && item.type !== 'oil') return;
		}
		
        let light = this.equipment['light'];
        if (light.torch && !item.torch || !light.torch && item.torch) return;
        flag.floor = false;
        if (!light.duration && item.duration && light.durab) {
            this.lighten += light.lighten;
            this.lightenOrDarken('Lighten');
		}
		
        light.duration += item.duration;
        if (light.duration > light.durationMax) light.duration = light.durationMax;
        if (item.mod !== NORMAL) {
            item.duration = 0;
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

    eat(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_EAT)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'food') return;
            flag.floor = false;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Ate ${name}` :
            `${name}を食べた`);
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.deleteItem(item, 1);
        if (!boxItem) {
            inventory.clear();
            flag.eat = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    quaffPotion(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_QUAFF)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'potion') return;
            flag.floor = false;
		}
		
        if (!item.identified) {
            item.identifyAll();
            if (item.place === P_PACK) var sort = true;
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

    zap(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_ZAP)) return;
        let item;
        if (boxItem) {
            flag.zap = true;
            flag.regular = false;
            item = boxItem;
        } else {
            let a = getAlphabetOrNumber(keyCode);
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

    throw (keyCode) {
        if (this.switchInventory(keyCode, M_THROW)) return;
        let a = getAlphabetOrNumber(keyCode);
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
                itemThrow: item,
            });
        }
    }

    read(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_READ)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'scroll' && !item.chargeBook) return;
		}
		
        if (item.chargeBook && !item.charges) return;
        flag.floor = false;
        if (!item.identified) {
            item.identifyAll();
            if (item.place === P_PACK) inventory.sort(a, this.pack);
		}
		
        let name = item.getName(true, 1);
        message.draw(option.isEnglish() ?
            `Read ${name}` :
            `${name}を読んだ`);
        flag.read = false;
        flag.scroll = true;
        if (skillMap.get(item.nameSkill).range === 0) {
            this.ci = item;
            if (!boxItem) {
                inventory.clear();
                flag.aim = true;
                this.aim({ keyCode: 88 }); //examine
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
		
        this.deleteItem(item, 1);
        inventory.clear();
        flag.regular = true;
        rogue.done = true;
    }

    identify(keyCode, item) {
        if (this.switchInventory(keyCode, M_IDENTIFY, true)) return;
        if (keyCode !== null) {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
		}
		
        if (!item || item.identified) return;
        flag.floor = false
        if (item.type === 'wand' && !itemTab[item.type].get(item.tabId).identified ||
            item.type === 'potion' || item.type === 'scroll' || item.type === 'orb') {
            item.identifyAll();
		} else {
            item.identified = true;
            item.changeNameAndPrice();
		}
		
        let name = item.getName();
        message.draw(option.isEnglish() ?
            `Identified ${name}` :
            `${name}を判別した`);
        if (keyCode) {
            inventory.clear();
            this.showInventory(item.place, a);
            item.investigate(item.place === P_EQUIPMENT || item.place === P_BOX ? RIGHT : LEFT);
            if (item.place === P_PACK) inventory.sort(a, this.pack);
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

    repair(keyCode) {
        let blacksmithAll = flag.blacksmith & keyCode === 13; //Enter
        if (!blacksmithAll) {
            if (!flag.blacksmith && this.switchInventory(keyCode, M_REPAIR, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
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
            this.drawStats();
            this.equipmentList();
            this.showInventory(P_PACK);
            message.draw(message.get(M_BLACKSMITH), true);
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

    disintegrate(keyCode) {
        if (keyCode < 65 || keyCode > 90) return;
        let skill = skillMap.get(DISINTEGRATION);
        let lvl;
        if (flag.skill) {
            lvl = this.cs.lvl + this.getSkillBoost(skill);
		} else {
			lvl = this.ci.skillLvl;
		}

        let radius = this.calcSkillValue(skill, lvl);
        let symbol = EA[keyCode - 65];
        if (input.isShift) symbol = symbol.toUpperCase()
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
        display.clearOne(display.ctxes.cur);
    }

    investigateOne(keyCode, item, place, direction, msg) {
        if (!item) {
            if (this.switchInventory(keyCode, M_INVESTIGATE, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item) return;
        }

        if (!item.identified){
            message.draw(message.get(M_NO_CLUE));
            return;
        }

        inventory.clear();
        if (place === undefined) place = item.place;
        this.showInventory(place);
        if (direction === undefined) direction = item.place === P_EQUIPMENT || item.place === P_BOX ? RIGHT : LEFT;
        item.investigate(direction);
        if (msg === undefined) msg = message.get(M_INVESTIGATE) + message.get(flag.floor ? M_PACK : M_FLOOR);
        message.draw(msg, true);
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

    synthesize(keyCode) {
        if (this.switchInventory(keyCode, M_SYNTHESIZE)) return;
        if (!flag.recipe && input.isCtrl && keyCode === 82) { //^r
            flag.recipe = true;
            this.showRecipe();
            return;
        }
        
        if (flag.recipe) {
            if (keyCode !== 13) return; //Enter
            flag.recipe = false;
            inventory.clear();
            this.showInventory(flag.floor ? P_FLOOR : P_PACK);
            this.showInventory(P_CUBE);
            message.draw(message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
            return;
        }

        let l = Object.keys(this.cube).length;
        if (keyCode === 13 && l >= 1) { //Enter
            flag.floor = false;
            this.tryToSynthesize();
            return;
        }
        
        let a = getAlphabetOrNumber(keyCode);
        if (!a || !input.isShift && l === MAX_CUBE_COUNT) {
            if (a) message.draw(message.get(M_CANT_ADD));
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
            this.cube[EA[l]] = this.inventoryOut(item, quantity);
            this.cubeIndex[EA[l]] = a;
        }
        
        inventory.clear();
        if (item.place === P_BOX) this.drawStats();
        this.showInventory(flag.floor ? P_FLOOR : P_PACK);
        this.showInventory(P_CUBE);
        message.draw(message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
    }

    showRecipe() {
        let i = 1;
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        let a = option.getLanguage();
        inventory.clear();
        inventory.shadow(MIDDLE);
        message.draw(message.get(M_RECIPE), true);
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'Name' : '名称',
            x: i,
            y: j,
        });

        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'MP(per)' : 'MP(毎)',
            x: i + 4.5,
            y: j,
        });

        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'Recipe' : 'レシピ',
            x: i + 10,
            y: j,
        });

        j += 2; 
        for (let [key, value] of recipes.entries()) {
            let name = value.name[a];
            let cost = value.cost;
            let recipe = value.recipe[a];
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
                x: i + 10,
                y: j,
                limit: 38
            });

            j += 1.2;
        }
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
            let item = this.cube[EA[i]];
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
        if (l === potion) {
            cost = recipes.get(RECIPE_EXTRA_HEALING).cost;
            num = 1;
            if (l === 3 && mp >= cost) {
                let found = true;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.nameSkill !== HEAL) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    name = option.isEnglish() ? 'Potion of Extra Healing' : '特大回復の薬';
                    this.createItemIntoPack({
                        type: 'potion',
                        tabId: P_EXTRA_HEALING,
                        quantity: 1,
                    });
                }
            }
        } else if (l === wand) {
            cost = recipes.get(RECIPE_WAND).cost;
            if (l > 1 && mp >= cost) {
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
            cost = recipes.get(RECIPE_WROUGHT_GOLD).cost;
            if (mp >= cost) {
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
            cost = recipes.get(RECIPE_LAMP).cost;
            if ((l === touch || lamp && l === lamp + oil) && mp >= cost) {
                let item, a;
                for (let key in this.cube) {
                    let item2 = this.cube[key];
                    if (item2.type !== 'oil') {
                        item = item2;
                        a = key;
                        break;
                    }
                }

                let duration = 0;
                for (let key in this.cube) {
                    if (a === key) continue;
                    let item2 = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item2, key)
                        continue;
                    }

                    num++;
                    duration += item2.duration;
                    if (item2.type === 'light' && (item2.mod !== NORMAL || item2.embeddedList.length)) {
                        item2.duration = 0;
                        this.packAdd(item2);
                    }
                }
                
                item.duration += duration;
                if (item.duration > item.durationMax) item.duration = item.durationMax;
                this.packAdd(item);
                name = item.getName()
            }
        } else if (l === book + scroll) {
            cost = recipes.get(RECIPE_CHARGE_BOOK).cost;
            if (l > 1 && book && mp >= cost) {
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
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            cost = recipes.get(RECIPE_EMBED).cost;
            if (embedded <= item.embeddedMax - item.embeddedNum && mp >= cost) {
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
                    } else {
                        item.dmgDiceNum = item.dmgDiceSides = undefined;
                        if (item.armor) item.calcAcOne();
                    }
                    
                    this.packAdd(item);
                    name = item.getName();
                }
            }
		} else if (removable && l === 1) {
            cost = recipes.get(RECIPE_REMOVE).cost;
            num = 1;
            let item = this.cube['a'];
            if (!item.cursed && mp >= cost) {
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
                } else {
                    item.dmgDiceNum = item.dmgDiceSides = undefined;
                    if (item.armor) item.calcAcOne();
                }
                
                this.packAdd(item);
                msg = option.isEnglish() ?
                    'Removed materials' :
                    '素材を取り除いた';
            }
        } else if (l === 3 && unembeddable && gem && orb ) {
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            cost = recipes.get(RECIPE_EXTEND).cost;
            num = 1;
            if (item.mod === NORMAL && mp >= cost) {
                item.embeddedMax = rndIntBet(1, item.embeddedLimit);
                this.packAdd(item);
                name = item.getName();
            }
        } else if (l === 4 && unembeddable && gem && orb && material) {
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

            cost = recipes.get(RECIPE_MATERIALIZE).cost;
            num = 1;
            if ((item.mod === MAGIC || item.mod === RARE) && item.material === mat.material && mp >= cost) {
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
        this.drawStats();
    }

    returnItem(item, a) {
        switch (item.place) {
            case P_PACK:
                this.packAdd(item);
                break;
            case P_BOX:
                this.boxAdd(item, this.cubeIndex[a]);
                break;
            case P_FLOOR:
                item.putDown(this.x, this.y, true);
                break;
        }
    }

    packOrUnpack(keyCode) {
        if (flag.pack !== P_PACK) {
            if (this.switchInventory(keyCode, M_PACK_OR_UNPACK) || input.isShift) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.place === P_BOX) {
                item = this.inventoryOut(item, item.quantity);
                if (!this.packAdd(item)) item.dropped();
            } else {
                this.ci = item;
                flag.pack = P_PACK;
                if (Object.keys(this.boxes).length === 1) {
                    this.packOrUnpack(49); //1
				} else {
					message.draw(message.get(M_PACK_INTO), true);
				}

                return;
            }
        } else {
            let a = getNumber(keyCode);
            if (!a || this.boxes[a] === undefined) return;
            let item = this.inventoryOut(this.ci, this.ci.quantity);
            this.ci = null;
            this.boxAdd(item, a);
            flag.pack = true;
		}
		
        inventory.clear();
        this.showInventory(flag.floor ? P_FLOOR : P_PACK);
        this.showInventory(P_BOX);
        message.draw(message.get(M_PACK_OR_UNPACK) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
        this.drawStats();
    }

    useBoxItem(keyCode) {
        let i = keyCode - 48;
        let item = this.boxes[i];
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

    autoAim(item) {
        let x, y;
        if (this.ce) {
            [x, y] = [this.ce.x, this.ce.y];
            if (!this.litMapIds[x + ',' + y] && (!map.coords[x][y].detected ||
                distanceSq(x, y, this.x, this.y) > FOV_SQ) ||
                !lineOfSight(this.x, this.y, x, y)) {
				return;
			}
        } else {
            this.searchCe();
            if (!this.ce) return;
            [x, y] = [this.ce.x, this.ce.y];
		}
		
        this.ci = item;
        flag.arrow = true;
        let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
        message.draw(option.isEnglish() ?
            `You shot ${arrow}` :
            `矢を放った`);
        this.aim({
            x1: x,
            y1: y,
        });
    }

    examine(keyCode) {
        if (keyCode === 88) { //x
            let loc = map.coords[cursol.x][cursol.y];
            if (loc.item['a'] && this.litMapIds[cursol.x + ',' + cursol.y] &&
                distanceSq(cursol.x, cursol.y, this.x, this.y) <= FOV_SQ &&
                lineOfSight(this.x, this.y, cursol.x, cursol.y)) {
                inventory.show(loc.item, RIGHT, undefined, P_FLOOR)
                flag.clearInv = true;
			}
			
            return;
        } else if (keyCode === 67 || keyCode === 77 ||
            keyCode === 69 || keyCode === 73) { //c,m,e,i
            let loc = map.coords[cursol.x][cursol.y];
            let fighter = loc.fighter;
            if (fighter && fighter.isShowing() &&
                (fighter.id === ROGUE || !rogue.hallucinated)) {
                if (keyCode === 67) {
                    fighter.investigate(MIDDLE, true);
				} else if (keyCode === 77) {
                    fighter.showSkill(fighter.skill);
				} else if (keyCode === 69 && this.isWizard) {
                    fighter.equipmentList();
				} else if (keyCode === 73 && this.isWizard) {
					fighter.showInventory(P_PACK);
				}

                flag.clearInv = true;
			}
			
            return;
        } else if (keyCode === 84 || keyCode === 82) { //t,r
            let loc = map.coords[cursol.x][cursol.y];
            if (flag.wormhole) {
                if (keyCode === 82) {
                    flag.wormhole = false;
				} else {
                    this.wormhole(cursol.x, cursol.y);
                    return;
                }
			}
			
            if (keyCode === 82) {
                this.ce = null;
			} else if (loc.fighter && loc.fighter.id !== ROGUE && loc.fighter.isShowing()) {
                this.ce = loc.fighter;
            } else if (!flag.aim) {
                loc.getInfo();
                return;
			}
			
            if (flag.aim && keyCode !== 82) {
                if (flag.skill || flag.scroll) {
                    let nameSkill = flag.skill ? this.cs.id : this.ci.nameSkill;
                    if (skillMap.get(nameSkill).range === 0) [cursol.x, cursol.y] = [this.x, this.y];
				}
				
                this.aim({
                    x1: cursol.x,
                    y1: cursol.y,
                });
			}
			
            this.cancelCommand();
            this.drawStats();
            return;
		}
		
        let offsetX = (IN_WIDTH - 1) / 2;
        let offsetY = IN_HEIGHT / 2;
        let X = cursol.x - cursol.cX + offsetX;
        let Y = cursol.y - cursol.cY + offsetY;
        if (!keyCode) {
            if (flag.aim) this.examinePlot();
            cursol.draw(X, Y);
            map.coords[cursol.x][cursol.y].getInfo();
            return;
		}
		
        let dr = getDirection(keyCode);
        if (!dr) return;
        let [x, y] = [cursol.x + dr.x, cursol.y + dr.y];
        let width = map.coords.length;
        let height = map.coords[0].length;
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        let [xinc, yinc] = [dr.x, dr.y];
        if (input.isShift) {
            xinc *= 10;
            yinc *= 10;
            if (cursol.x + xinc < 0) {
                xinc = -cursol.x;
                if (yinc) yinc = (yinc > 0 ? -1 : 1) * xinc;
            } else if (cursol.x + xinc >= width) {
                xinc = width - cursol.x - 1;
                if (yinc) yinc = (yinc > 0 ? 1 : -1) * xinc;
			}
			
            if (cursol.y + yinc < 0) {
                yinc = -cursol.y;
                if (xinc) xinc = (xinc > 0 ? -1 : +1) * yinc;
            } else if (cursol.y + yinc >= height) {
                yinc = height - cursol.y - 1;
                if (xinc) xinc = (xinc > 0 ? 1 : -1) * yinc;
            }
		}
		
        cursol.clear(X, Y);
        cursol.x += xinc;
        cursol.y += yinc;
        X += xinc;
        Y += yinc;
        let found;
        if (X < 0 || X >= IN_WIDTH) {
            cursol.cX = cursol.x;
            X = offsetX;
            if (yinc > 0 && Y > offsetY && Y < IN_HEIGHT ||
                yinc < 0 && Y < offsetY && Y >= 0) {
                cursol.cY = cursol.y;
                Y = offsetY;
			}
			
            found = true;
		}
		
        if (Y < 0 || Y >= IN_HEIGHT) {
            cursol.cY = cursol.y;
            Y = offsetY;
            if (Y >= IN_HEIGHT) {
                cursol.cY++;
                Y++;
			}
			
            if (xinc > 0 && X > offsetX && X < IN_WIDTH ||
                xinc < 0 && X < offsetX && X >= 0) {
                cursol.cX = cursol.x;
                X = offsetX;
			}
			
            found = true;
		}
		
        if (found) map.draw(cursol.cX, cursol.cY);
        if (flag.aim) this.examinePlot();
        cursol.draw(X, Y);
        map.coords[cursol.x][cursol.y].getInfo();
    }

    examinePlot(aim) {
        if (aim) cursol.init();
        let [x, y] = [cursol.x, cursol.y];
        let color = colorList.white;
        let skill;
        display.clearOne(display.ctxes.cur);
        if (flag.zap) {
            if (this.ci.identified || itemTab[this.ci.type].get(this.ci.tabId).identified) { //
                skill = skillMap.get(this.ci.nameSkill);
                color = skill.color;
            }
        } else if (flag.skill || flag.scroll) {
            skill = skillMap.get(flag.skill ? this.cs.id : this.ci.nameSkill);
            color = skill.color;
            if (skill.range === 0)[x, y] = [this.x, this.y];
		}
		
        lineOfSight(this.x, this.y, x, y, color, skill);
    }

    cancelCommand() {
        if (flag.synthesize) {
            this.returnCubeItem();
		} else if (flag.aim || flag.examine) {
            display.clearOne(display.ctxes.cur);
            map.draw(rogue.x, rogue.y);
            statistics.clearEnemyBar();
            statistics.drawEnemyBar(this.ce);
        } else if (flag.minimap) {
            display.clearOne(display.ctxes.map);
		}

        inventory.clear();
        initFlag();
        this.ci = null;
    }

    showStats(a) {
        inventory.shadow(LEFT);
        let i = 1.5;
        let j = MS + 1;
        let count = 0;
        let ctxInv = display.ctxes.inv;
        for (let key in statistics.list) {
            if (a && key !== a) continue;
            let stat = statistics.list[key];
            ctxInv.save();
            ctxInv.textAlign = 'center';
            display.text({
                ctx: ctxInv,
                msg: key.toUpperCase(),
                x: i,
                y: j,
            });

            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: stat.name[option.getLanguage()],
                x: i + 1,
                y: j,
            });

            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: this[stat.term + 'Max'],
                x: i + 22,
                y: j++,
            });

            ctxInv.restore();
            count++;
		}
		
        let maxNum = count; //
        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS -1,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let [statPoints, currentValues] = option.isEnglish() ? ['Stat Points', 'Current Values'] : ['ステータスポイント', '現在値'];
        display.text({
            ctx: ctxInv,
            msg: `${statPoints} ${this.statPoints} ${currentValues}`,
            x: i + 22,
            y: -SS -1,
            yPx: display.height,
        });

        ctxInv.restore();
    }


    showSKillDetail(skill, dir) {
        inventory.shadow(dir);
        let i = 0.5;
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.shadowColor = skill.color;
        let nameEle = option.isEnglish() ? getUpperCase(skill.element) : translation.element[skill.element];
        display.text({
            ctx: ctxInv,
            msg: skill.name[option.getLanguage()] + ` [${nameEle}]`,
            x: i,
            y: j++,
        });

        ctxInv.shadowColor = colorList.shadow;
        j++;
        let lvl = 0;
        let a = this.searchSkill(skill.id);
        if (a) lvl = this.skill[a].lvl;
        let boost = this.getSkillBoost(skill);
        let msg = this.getSkillInfo(skill, lvl + boost);
        display.text({
            ctx: ctxInv,
            msg: msg,
            x: i + 1,
            y: j++,
            limit: 22,
        });

        j++;
        let [base, perLvl, perSy, durBase] = option.isEnglish() ? ['Base', 'per Level', 'per Synerzy', 'Duration Base'] : ['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値'];
        let perc = skill.perc ? '%' : '';
        if (skill.rate) {
            let skillBase = skill.base;
            if (isFinite(skillBase) && perc && skillBase > 0) {
                skillBase = '+' + skillBase;
			} else if (skill.radiusRate) {
				skillBase = (option.isEnglish() ? 'radius ' : '半径') + skillBase;
			}

            display.text({
                ctx: ctxInv,
                msg: `${base} ${skillBase}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });

            if (!isFinite(skill.base)) perc = '%';
            let sign = skill.rate > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perLvl} ${sign}${skill.rate}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.synerzy) {
            let sign = skill.synerzy > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perSy} ${sign}${skill.synerzy}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.durBase) {
            display.text({
                ctx: ctxInv,
                msg: `${durBase} ${skill.durBase}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.durRate) {
            let sign = skill.durRate > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perLvl} ${sign}${skill.durRate}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        ctxInv.restore();
    }


    addOrRemoveBookmark(keyCode) {
        if (flag.bookmark === 1) {
            if (keyCode >= 112 || input.isShift && keyCode === 77) { //F1~, M
                let i = keyCode === 77 ? 0 : keyCode - 111;
                if (!this.bookmarks[i]) return;
                this.bookmarks[i] = null;
                inventory.clear();
                this.showSkill(this.skill);
                this.showSkill(this.bookmarks, true);
                message.draw(message.get(M_BOOKMARK), true);
            } else {
                let a = getAlphabet(keyCode);
                if (!a || !this.skill[a]) return;
                flag.bookmark = 2;
                this.ca = a;
                message.draw(message.get(M_BOOKMARK2), true);
            }
        } else {
            if (!(input.isShift && keyCode === 77) && (keyCode < 112 || keyCode > 123)) return;
            let i = keyCode === 77 ? 0 : keyCode - 111;
            this.bookmarks[i] = this.skill[this.ca].id;
            flag.bookmark = 1;
            inventory.clear();
            this.showSkill(this.skill);
            this.showSkill(this.bookmarks, true);
            message.draw(message.get(M_BOOKMARK), true);
        }
    }

    gainStatOrSkill(keyCode) {
        if (flag.gain === 1 && !flag.number) {
            let a = getAlphabet(keyCode);
            if (!a || input.isShift && !statistics.list[a] || !input.isShift && !this.pack[a]) return;
            if (!input.isShift && (this.pack[a].type !== 'book' || !this.pack[a].skill || !this.canRead(true))) {
                return;
			} else if (input.isShift && !this.statPoints) {
                message.draw(message.get(M_CANT_GAIN_STAT));
                return;
            } else if (input.isShift && this[statistics.list[a].term + 'Max'] >= MAX_STAT_LVL) {
                let name = statistics.list[a].name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't gain ${name} anymore` :
                    `これ以上${name}を取得が出来ない`);
                return;
			}
			
            this.ca = a;
            inventory.clear();
            if (input.isShift) {
                this.showStats(a);
                flag.gain = 3;
                flag.number = true;
                this.inputNumber();
            } else {
                this.showSkill(this.pack[a].list);
                flag.gain = 2;
                message.draw(message.get(M_GAIN_SKILL), true);
            }
        } else if (flag.gain === 2 && !flag.number) { //skill
            let a = getAlphabet(keyCode);
            if (!a) return;
            let id = this.pack[this.ca].list[a];
            if (!id) return;
            let skill = skillMap.get(id);
            if (input.isShift) {
                inventory.clear();
                this.showSkill(this.pack[this.ca].list);
                this.showSKillDetail(skill, LEFT);
                message.draw(message.get(M_GAIN_SKILL), true);
                return;
			}
			
            let key = this.searchSkill(id);
            let lvl = key ? this.skill[key].lvl : 0;
            if (this.lvl < skill.reqLvl + lvl ||
                skill.reqSynerzy && skill.reqSynerzy > this.getSynerzy(skill)) {
				return;
			}

            if (!this.skillPoints ||
                !key && Object.keys(this.skill).length >= MAX_SKILL_NUM) {
                message.draw(message.get(M_CANT_GAIN_SKILL));
                return;
            } else if (key && lvl === MAX_SKILL_LVL) {
                let nameSkill = skill.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't study ${nameSkill} anymore` :
                    `これ以上${nameSkill}の知識を得られない`);
                return;
			}
			
            inventory.clear();
            this.cs = id;
            flag.number = true;
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
                let i;
                if (keyCode === 13) {
                    i = Number(this.cn);
                    if (i > point) i = point;
                } else {
					i = point;
				}

                let name = skill.name[option.getLanguage()];
                if (!key) { //new skill
                    key = EA[Object.keys(this.skill).length];
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
                let i;
                if (keyCode === 13) {
                    i = Number(this.cn);
                    if (i > point) i = point;
                } else {
					i = point;
				}

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

    castSkill(keyCode) {
        if (input.isCtrl && keyCode === 83 && Object.keys(this.skill).length >= 2) { //S
            flag.skill = false;
            flag.sortSkill = 1;
            inventory.clear();
            this.showSkill(this.skill);
            message.draw(message.get(M_SORT_SKILL), true);
            return;
		}
		
        let a = getAlphabet(keyCode);
        if (!a || !this.skill[a]) return;
        let skill = skillMap.get(this.skill[a].id);
        if (input.isShift) {
            inventory.clear();
            this.showSkill(this.skill);
            this.showSKillDetail(skill, LEFT);
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

    castBookmarkedSkill(keyCode, keyCodeDr) {
        let i = keyCode === 48 ? 0 : keyCode - 111;
        if (!this.bookmarks[i] || !this.checkToCast()) return;
        let id = this.bookmarks[i];
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
        } else if (i === 0) {
            this.aim({
                keyCode: keyCodeDr,
                nameSkill: id,
            });
        } else if (skill.wall) {
            flag.regular = false;
            flag.aim = true;
            message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
            this.examinePlot(true);
        } else {
            let x, y;
            if (this.ce) {
                [x, y] = [this.ce.x, this.ce.y];
                if (!this.litMapIds[x + ',' + y] && (!map.coords[x][y].detected ||
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

    sortSkill(keyCode) {
        if (flag.sortSkill === 1) {
            this.ca = getAlphabet(keyCode);
            if (!this.ca || !this.skill[this.ca]) return
            flag.sortSkill = 2;
            message.draw(message.get(M_SORT_SKILL2), true);
        } else {
            let a = getAlphabet(keyCode);
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
            item = this.equipment[BP[a]];
		} else {
			item = this.pack[a];
		}

        return item;
    }

    switchInventory(keyCode, id, equipment) {
        if (keyCode !== 188 && keyCode !== 190) return false;
        inventory.clear();
        let msg = message.get(id);
        if (flag.synthesize || flag.pack) this.showInventory(flag.pack ? P_BOX : P_CUBE);
        if (keyCode === 188) { //,
            flag.floor = false;
            if (equipment) this.equipmentList();
            this.showInventory(P_PACK);
            msg += message.get(M_FLOOR);
        } else if (keyCode === 190 || keyCode === 110) { //., T.
            flag.floor = true;
            this.showInventory(P_FLOOR);
            msg += message.get(M_PACK);
		}
		
        message.draw(msg, true);
        return true;
    }

    destroy(keyCode) {
        if (!flag.number) {
            if (this.switchInventory(keyCode, M_DESTROY, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
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
            let i = item.getQuantity(keyCode, this.cn);
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

    shop(keyCode, isAlt) {
        let shop = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            let a = getAlphabet(keyCode);
            if (!a) return;
            let item = input.isShift ? shop.list[a] : this.pack[a];
            if (!item) return;
            if (isAlt) {
                if (flag.gamble && input.isShift) return;
                let place = input.isShift ? P_SHOP : P_PACK;
                let direction = input.isShift ? RIGHT : LEFT;
                let msg = message.get(M_SHOP);
                this.investigateOne(null, item, place, direction, msg);
                return;
            }

            if (!input.isShift && Object.keys(shop.list).length === MAX_PACK_COUNT) {
                message.draw(message.get(M_CANT_SELL));
                return;
            } else if (input.isShift && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ca = a;
            this.ci = item;
            inventory.clear();
            flag.number = true;
            flag.shop = item.place;
            this.showInventory(item.place, a);
            this.inputNumber();
        } else {
            let item = this.ci;
            this.ci = null;
            let i = item.getQuantity(keyCode, this.cn);
            let amount = item.price * i;
            if (flag.shop === P_PACK) {
                item = this.inventoryOut(item, i);
                let l = Object.keys(shop.list).length;
                shop.list[EA[l]] = item;
                item.place = P_SHOP;
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
			
            this.drawStats();
            flag.shop = true;
            flag.number = false;
            inventory.clear();
            this.cn = 1;
            this.showInventory(P_PACK);
            this.showInventory(P_SHOP);
            message.draw(message.get(M_SHOP), true);
        }
    }

    stash(keyCode, isAlt) {
        let stash = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            if (keyCode === 188 || keyCode === 190) { //, .
                if (keyCode === 190 && stash.page < MAX_STASH_PAGE) {
                    stash.page++;
				} else if (keyCode === 188 && stash.page > 1) {
					stash.page--;
				}

                inventory.clear();
                this.showInventory(P_STASH);
                this.showInventory(P_PACK);
                message.draw(message.get(M_STASH), true);
                return;
			}
			
            let a, item;
            if (input.isShift) {
                if (!getAlphabet(keyCode)) return;
                a = keyCode - 65 + (stash.page - 1) * MAX_PACK_COUNT;
                item = stash.list[a];
            } else {
                a = getAlphabetOrNumber(keyCode);
                if (!a) return;
                item = this.getItem(a);
			}
			
            if (!item) return;
            if (isAlt) {
                let place = input.isShift ? P_STASH : P_PACK;
                let direction = input.isShift ? RIGHT : LEFT;
                let msg = message.get(M_STASH);
                this.investigateOne(null, item, place, direction, msg);
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
            flag.stash = item.place;
            if (item.quantity === 1) {
                this.cn = 1;
                this.stash(13);
            } else {
                this.ca = a;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
            }
        } else {
            let item = this.ci;
            this.ci = null;
            let i = item.getQuantity(keyCode, this.cn);
            if (flag.stash === P_STASH) {
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
			
            this.drawStats();
            flag.stash = true;
            flag.number = false;
            inventory.clear();
            this.showInventory(P_STASH);
            this.showInventory(P_PACK);
            message.draw(message.get(M_STASH), true);
        }
    }

    cureShop(keyCode) {
        let cure = map.coords[this.x][this.y].enter;
        let a = getAlphabet(keyCode);
        if (!a || !cure.list[a]) return;
        let cost = cure.list[a].cost;
        if (cost > this.purse) {
            message.draw(message.get(M_DONT_HAVE_MONEY));
            return;
		}
		
        this.purse -= cost;
        let name = cure.list[a][ENG];
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

        this.drawStats();
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
		
        let name = trap.name[ENG];
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
        if (light && light.duration && light.durab) {
            if (--light.duration === 0) {
                this.lighten -= light.lighten;
                this.lightenOrDarken('Lighten');
                message.draw(message.get(M_LIGHT_GONE));
            }
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
        this.calcCondition(true);
        this.drawStats();
    }

    inputNumber(keyCode) {
        if (!keyCode) {
            this.cn = 1;
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return
		}
		
		if ((keyCode < 48 || keyCode > 57) && keyCode !== 65 &&
			keyCode !== 13 && keyCode !== 8) { //a, Enter, Back space
			return;
		}

        if (keyCode === 48 && (this.cn === '' || this.cn === 1) || keyCode === 13 && this.cn === '') {
            return;
		} else if (keyCode === 8 || keyCode >= 48 && keyCode <= 57) {
            if (this.cn === 1) this.cn = '';
            if (keyCode === 8) {
                this.cn = this.cn.substr(0, this.cn.length - 1);
			} else {
				this.cn += keyCode - 48;
			}

            if (!flag.gain) {
                inventory.clear();
                let place;
                if (flag.shop) {
                    place = flag.shop;
				} else if (flag.stash) {
                    place = flag.stash;
                } else {
					place = P_PACK;
				}

                this.showInventory(place, this.ca);
			}
			
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return;
		}
		
        if (flag.drop) {
            this.drop(keyCode);
		} else if (flag.gain) {
            this.gainStatOrSkill(keyCode);
        } else if (flag.destroy) {
            this.destroy(keyCode);
		} else if (flag.shop) {
            this.shop(keyCode);
        } else if (flag.stash) {
			this.stash(keyCode);
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
            if (enemy.mod === UNIQUE) delete this.cue[enemy.name[ENG]];
        }
    }

    checkUniqueLoop(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            if (item.mod === UNIQUE && !item.identified) {
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
                let cost = recipes.get(item2.chargeBook ? RECIPE_CHARGE_BOOK : RECIPE_WAND).cost;
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
        if (!this.ce) return;
        if (!this.ce.isShowing()) {
            statistics.clearEnemyBar();
            this.ce = null;
        }
    }

    getCe(fighter, melee) {
        if (fighter.id !== ROGUE && (melee || !this.ce) && fighter.isShowing()) this.ce = fighter;
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
        return fighter.id !== ROGUE;
    }

    isShowing() {
        return !this.invisible;
    }

    removeCe() {
        this.ce = null;
        statistics.clearEnemyBar();
    }

    goBlind() {
        display.clearOne(display.ctxes.buf, true);
        map.coords[this.x][this.y].draw();
        this.removeCe();
    }
}
