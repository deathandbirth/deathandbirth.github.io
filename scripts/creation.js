const creation = {
    input(keyCode) {
        if (keyCode !== 13) { //Enter
            if (keyCode >= 48 && keyCode <= 57) {
                this.string += String(getNumber(keyCode));
			} else if (keyCode >= 65 && keyCode <= 90) {
                this.string += getAlphabet(keyCode);
			} else if (keyCode === 32) {
                this.string += ' ';
            } else if (keyCode === 8) {
                this.string = this.string.substr(0, this.string.length - 1);
			} else if (keyCode === 40 && this.stringSave) { //down
                this.string = this.stringSave;
            } else if (!keyCode) { //init
				this.string = '';
			}

            message.draw(this.string, true);
            return;
		}
		
        this.stringSave = this.string;
        let [type, num, num2, num3] = this.string.split(' ').map((element) =>
			isNaN(Number(element)) ? element : Number(element));
        if (flag.create === 'item') {
            if (type === 'coin') {
                if (num > 0) {
                    rogue.purse += num;
                } else {
                    message.draw('Incorrect syntax');
                }
            } else if ((num2 === undefined || num2 > 0) && itemTab[type] && itemTab[type].has(num)) {
                rogue.createItemIntoPack({
                    type: type,
                    tabId: num,
                    quantity: num2,
                    uniqueId: num3,
                });

                map.drawObjectAll();
                map.draw();
            } else {
				message.draw('Incorrect syntax');
			}
        } else if (flag.create === 'fighter') {
            if (fighterTab[type] && fighterTab[type][num]) {
                this.enemy({
                    type: type,
                    tabId: num,
                    position: LOCATION,
                    x: rogue.x,
                    y: rogue.y,
                    summon: true,
                });
                
                map.drawObjectAll();
                map.draw();
            } else {
				message.draw('Incorrect syntax');
			}
		}

        inventory.clear();
        flag.create = false;
        flag.regular = true;
    },

    dungeon(stairs, dr) {
        map.init();
        dungeon.create();
        let boss = rogue.cdl === 33 && !rogue.inferno;
        this.stairs(rndIntBet(MIN_STAIRS_NUM, MAX_STAIRS_NUM), boss ? UP : RANDOM, INIT);
        this.trap(rndIntBet(MIN_TRAP_NUM, MAX_TRAP_NUM, RANDOM, RANDOM), RANDOM, INIT);
        let [startX, startY] = Object.keys(map.staircaseList)[dr === DOWN ? 0 : 1].split(',');
        rogue.putDown(false, stairs, Number(startX), Number(startY));
        if (boss) {
            this.enemy({
                type: 'misc',
                tabId: 2,
                position: RANDOM
			});
		}

        this.enemy({
            times: ENEMY_NUM_INIT,
            position: INIT,
		});
		
        this.item({
            times: ITEM_NUM_INIT,
            position: INIT,
		});
		
        map.redraw();
        let track = audio.getDungeonTrack(rogue.cdl, boss);
        if (audio.curTrack !== track) {
            audio.stop(audio.curTrack);
            audio.playMusic(track);
        }
    },

    town() {
        map.init(true);
        town.createAll();
        this.stairs(1, DOWN, LOCATION, POSITION.hell.x, POSITION.hell.y, true);
        rogue.putDown(true);
        map.redraw();
        audio.stop(audio.curTrack);
        audio.playMusic(!rogue.inferno ? 'town' : 'town2');
    },

    enemy({
        position,
        x,
        y,
        summon,
        noGroup,
        magic,
        boost,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        bias = RANDOM,
    }) {
        if (!boost) boost = !rogue.cdl ? 1 : 0;
        let lvl = rogue.cdl + boost;
        for (let i = 0; i < times; i++) {
            let [typeT, tabIdT] = [type, tabId];
            if (type === undefined || type === RANDOM) {
                do typeT = FT[rndInt(FT.length - 2)];
                while (fighterTab[typeT][0].lvl > lvl);
            }

            let fighter;
            if (tabId === undefined || tabId === RANDOM) {
                let j = 0;
                let fighterNums = fighterNumsMap.get(typeT);
                fighterNums.shuffle();
                do {
                    tabIdT = fighterNums[j++];
                    if (tabIdT === undefined) return; //
                    fighter = fighterTab[typeT][tabIdT];
                } while (fighter.mod === UNIQUE && rogue.cue[fighter.name[ENG]] ||
                    fighter.lvl > lvl || evalPercentage(fighter.rarity));
            } else {
                fighter = fighterTab[typeT][tabIdT];
            }

            let count = !noGroup && fighter.group ? rndIntBet(2, 4) : 1;
            let [posT, xT, yT] = [position, x, y];
            for (let j = 0; j < count; j++) {
                let fighterNew = new Enemy(fighter);
                fighterNew.init(posT, xT, yT, summon, magic, bias, lvl);
                if (fighter.group && posT !== LOCATION) {
                    posT = LOCATION;
                    [xT, yT] = [fighterNew.x, fighterNew.y];
                }
            }
        }
    },

    setEnemyList(detail, normal, unique) {
        this.enemyList = {};
        for (let key in fighterTab) {
            for (let [tabId, f] of fighterTab[key].entries()) {
                if (key === 'misc' && f.mod !== UNIQUE) continue;
                if (f.mod === UNIQUE) {
                    if (!unique) continue;
                } else {
                    if (!normal) continue;
                }

                let func = numberPadding;
                let lvl = func(f.lvl, 2, true);
                let list = `Lv: ${lvl}`;
                if (detail) {
                    let hr = func(f.hpRate, 3);
                    let mr = func(f.mpRate, 3);
                    let str = func(f.str, 3);
                    let dex = func(f.dex, 3);
                    let con = func(f.con, 3);
                    let int = func(f.int, 3);
                    let spd = func(f.spd, 4);
                    let dmg = func(f.dmgBase, 3);
                    let ac = func(f.acBase, 3);
                    let sr = func(f.acSRate, 3);
                    let tr = func(f.acTRate, 3);
                    let br = func(f.acBRate, 3);
                    list += `, HR: ${hr}, MR: ${mr}, Str: ${str}, Dex: ${dex}, Con: ${con}, Int: ${int}, Spd: ${spd}, Dmg: ${dmg}, AC: ${ac}, SR: ${sr}, TR: ${tr}, BR: ${br}`;
                }

                list += `, Mod: ${f.mod}, ${key} ${tabId}`;
				this.enemyList[list] = `${f.name['b']}`;
			}
        }
    },

    item({
        position,
        x,
        y,
        magic,
        boost,
        lvl,
        uniqueId,
        starter,
        matBase,
        matId,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        quantity = 1,
    }) {
        if (!boost) boost = !rogue.cdl ? 1 : 0;
        if (!lvl) lvl = rogue.cdl + boost;
        if (uniqueId >= 0) magic = true;
        for (let i = 0; i < times; i++) {
            let [typeT, tabIdT] = [type, tabId];
            if (type === undefined || type === RANDOM) typeT = Item.getType(magic);
            if (tabId === undefined || tabId === RANDOM) [typeT, tabIdT] = Item.getTabId(typeT, lvl, magic);
            let item = itemTab[typeT].get(tabIdT);
            if (item.lethe) rogue.lethe++;
            let itemNew = new Item(item, quantity);
            itemNew.init(position, x, y, magic, lvl, uniqueId, starter, matBase, matId);
            if (position === LIST) {
                itemNew.place = flag.shop ? P_SHOP : P_PACK;
                return itemNew;
            }
        }
    },

    setItemList() {
        this.itemList = {};
        flag.shop = true;
        for (let type of equipmentList) {
            this.itemList[type] = [];
            for (let [tabId, item] of itemTab[type]) {
                let i = 0;
                let list = [...materialList];
                list.shuffle();
                while (!(item.material & list[i])) i++;
                let matBase = list[i];
                list = materialMap.get(matBase).list;
                for (let i = 0, l = list.size; i < l; i++) {
                    let item = this.item({
                        type: type,
                        tabId: tabId,
                        position: LIST,
                        lvl: 99,
                        matBase: matBase,
                        matId: i,
					});
					
                    item.embeddedMax = 0;
                    let name = item.getName();
                    this.itemList[type].push(`${name},${item.weight}kg`);
                }
            }
		}
		
        flag.shop = false;
    },

    trap(times, tabId, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (tabId === undefined || tabId === RANDOM) tabIdT = rndInt(trapTab.length - 1);
            let trap = new Trap(trapTab[tabIdT], !show);
            trap.init(position, x, y);
        }
    },

    stairs(times, tabId, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (position === INIT) {
                if (tabId === RANDOM) {
                    if (i <= 1) {
                        tabIdT = i ? DOWN : UP;
                    } else {
                        tabIdT = i % 2 ? DOWN : UP;
                    }
                }

                show = i <= 1 || coinToss();
            } else if (tabId === RANDOM) {
				tabIdT = coinToss() ? DOWN : UP;
			}

            let staircase = new Staircase(stairsMap.get(tabIdT), !show);
            staircase.init(position, x, y);
        }
    },

    setList() {
        if (!rogue.isWizard) return;
        this.setEnemyList(true, true, true);
        this.setItemList();
    }
};
