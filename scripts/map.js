const minimap = {
    coords: [],
    init() {
        this.coords = [];
        let width = map.coords.length;
        let height = map.coords[0].length;
        for (let i = 0; i < width; i++) {
            this.coords.push([]);
            for (let j = 0; j < height; j++) {
                this.coords[i].push(new Location(i, j));
                let loc = this.coords[i][j];
                loc.sight = true;
            }
        }

        if (vuejs.mapMini) vuejs.mapMini.coords = this.coords;
    },

    shadow() {
        let ctxMap = display.ctxes.map;
        ctxMap.save();
        ctxMap.shadowColor = colorList.clear;
        ctxMap.globalAlpha = 0.9;
        ctxMap.fillStyle = colorList.black;
        display.rect({
            ctx: ctxMap,
            widthPx: display.width,
            height: -SS,
            heightPx: display.height,
        });

        ctxMap.restore();
    },

    draw(keyCode) {
        if (!(keyCode === 65 || //a all
            keyCode === 83 || //s self
            keyCode === 67 || //c char
            keyCode === 73 || //i item
            keyCode === 77 && input.isShift || //M map
            keyCode === 188 && input.isShift || //<
            keyCode === 190 && input.isShift || //>
            keyCode === 80 || //p portal
            keyCode === 84)) { //t trap
            return;
        }

        display.clearOne(display.ctxes.map);
        if (keyCode === 77 && input.isShift) { //M
            flag.minimap = false;
            flag.regular = true;
            return;
        }

        this.shadow();
        if (rogue.blinded) return;
        for (let i = 0, l = map.coords.length; i < l; i++) {
            for (let loc of map.coords[i]) {
                let type;
                switch (keyCode) {
                    case  83: //s
                        if (loc.fighter && loc.fighter.id === ROGUE) type = SYMBOL_FIGHTER;
                        break;
                    case  67: //c
                        if (loc.fighter && loc.fighter.isShowing()) type = SYMBOL_FIGHTER;
                        break;
                    case  73: //i
                        if (loc.item['a']) {
                            let item = loc.item[EA[Object.keys(loc.item).length - 1]];
                            if (item.isShowing()) type = SYMBOL_ITEM;
                        }

                        break;
                    case  188: //<
                    case  190: //>
                        if (loc.found && loc.stairs && !loc.hidden) type = SYMBOL_STAIRS;
                        break;
                    case  80: //p
                        if (loc.found && loc.enter && loc.enter.portal) type = SYMBOL_ENTER;
                        break;
                    case  84: //t
                        if (loc.found && loc.trap && !loc.hidden) type = SYMBOL_TRAP;
                        break;
                }

                if (!type && keyCode !== 65) { //a
                    if (!loc.found) {
                        type = SYMBOL_BLANK;
                    } else if (loc.wall) {
                        type = SYMBOL_WALL;
                    } else if (loc.door && !loc.hidden) {
                        type = SYMBOL_DOOR;
                    } else if (loc.enter && !loc.enter.portal && !rogue.cdl) {
                        type = SYMBOL_ENTER;
                    } else if (loc.floor) {
                        type = SYMBOL_BLANK;
                    }
                }

                // loc.draw(true, type, this.fs);

                let {symbol, color, shadow, stroke} = loc.getSymbol(true, type);
                let locMini = this.coords[loc.x][loc.y];
                locMini.symbol = symbol;
                locMini.color = color;
                locMini.shadow = shadow;
                locMini.stroke = stroke;
            }
        }
    },
};

const map = {
    coords: [],
    init(town, load) {
        this.queue = new Queue();
        this.enemyList = {};
        this.itemList = {};
        this.staircaseList = {};
        this.portal = null;
        if (!load) {
            this.coords = [];
            let width = town ? IN_WIDTH : WIDTH;
            let height = town ? IN_HEIGHT : HEIGHT;
            for (let i = 0; i < width; i++) {
                this.coords.push([]);
                for (let j = 0; j < height; j++) {
                    this.coords[i].push(new Location(i, j));
                    let loc = this.coords[i][j];
                    if (i === 0 || i === width - 1 || j === 0 || j === height - 1) {
                        loc.indestructible = true;
                        loc.wall = WALL_HP;
                    }

                    loc.getSymbol();
                }
            }
        }

        if (vuejs.mapMain) vuejs.mapMain.coords = this.coords;
        minimap.init();
    },

    fill(town) {
        let width = this.coords.length;
        let height = this.coords[0].length;
        for (let i = 1; i < width - 1; i++) {
            for (let j = 1; j < height - 1; j++) {
                let loc = this.coords[i][j];
                if (town) {
                    if (!loc.wall) loc.floor = true;
                } else if (!loc.floor && !loc.wall) {
                    if (evalPercentage(0.1)) {
                        creation.item({
                            type: 'coin',
                            tabId: 1,
                            position: LOCATION,
                            x: i,
                            y: j,
                        });
                    }

                    loc.wall = WALL_HP;
                }
            }
        }
    },

    draw(cX, cY) {
        let ctxMain = display.ctxes.main;
        display.clearOne(ctxMain);
        display.image({
            ctx: ctxMain,
            img: display.canvases.buf,
            sx: cX - (IN_WIDTH - 1) / 2,
            sy: cY - IN_HEIGHT / 2,
            sWidth: IN_WIDTH,
            sHeight: IN_HEIGHT,
            dx: -IN_WIDTH / 2, 
            dxPx: display.width / 2,
            dy: 0,
            dWidth: IN_WIDTH,
            dHeight: IN_HEIGHT,
        });
        
        if (!this.eleP) {
            this.eleP = document.getElementById('map-main-container');
            this.eleC = this.eleP.firstChild;
        }

        let rectP = this.eleP.getBoundingClientRect(); 
        let rectC = this.eleC.getBoundingClientRect(); 
        let x = rectC.left - rectP.left + (cX + 1 / 2) * display.fs;
        let y = rectC.top - rectP.top + (cY + 1 / 2) * display.fs;
        let winMidX = rectP.width / 2;
        let winMidY = rectP.height / 2;
        if (!this.offsetXPre) this.offsetXPre = 0;
        if (!this.offsetYPre) this.offsetYPre = 0;
        let offsetX = Math.floor(winMidX- x + this.offsetXPre);
        let offsetY = Math.floor(winMidY- y + this.offsetYPre);
        this.eleC.style.transform = 'translate(' + offsetX + "px, " + offsetY +'px)';
        this.offsetXPre = offsetX;
        this.offsetYPre = offsetY;
    },

    redraw(cX, cY) {
        display.clearOne(display.ctxes.buf, true)
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                loc.draw();
            }
        }

        rogue.drawStats();
    },

    lighten(init) {
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                if (loc.hidden) {
                    loc.hidden = false;
                    loc.wall = false;
                } else if (loc.lighten && loc.found) {
                    continue;
                }

                loc.lighten = true;
                loc.found = true;
                loc.draw();
            }
        }

        if (!init) rogue.lightenOrDarken('Lighten');
    },
};

const seeInvisible = (see) => {
    for (let key in map.enemyList) {
        let enemy = map.enemyList[key];
        if (enemy.invisible) {
            map.coords[enemy.x][enemy.y].draw();
            if (!see && rogue.ce && rogue.ce.id === enemy.id) rogue.removeCe();
        }
    }

    map.draw(rogue.x, rogue.y);
}

const hallucinate = {
    all(undo) {
        this.search(map.enemyList, true, undo);
        this.search(map.itemList, false, undo);
        map.redraw(rogue.x, rogue.y);
    },

    search(list, enemy, undo) {
        for (let key in list) {
            if (enemy && list[key].mimic) continue;
            if (!undo) {
                this.one(list[key], enemy);
            } else {
                this.undoOne(list[key]);
            }

            map.coords[list[key].x][list[key].y].getSymbol();
        }
    },

    one(obj, enemy, mimic) {
        let type, tabId;
        if (!obj.nameTemp) obj.nameTemp = {};
        obj.nameTemp['a'] = obj.name['a'];
        obj.nameTemp['b'] = obj.name['b'];
        if (enemy) {
            type = FT[rndInt(FT.length - 1)];
            tabId = rndInt(fighterTab[type].length - 1);
            var fighter = fighterTab[type][tabId];
            obj.name['a'] = fighter.name['a'];
            obj.name['b'] = fighter.name['b'];
            obj.symbol = fighter.symbol;
            obj.color = fighter.color;
        } else {
            type = IT[rndInt(IT.length - 2)];
            obj.typeHalluc = type;
            tabId = rndIntBet(1, itemTab[type].size);
            var item = itemTab[type].get(tabId);
            obj.name['a'] = item.nameReal['a'];
            obj.name['b'] = item.nameReal['b'];
            obj.symbol = item.symbol;
            obj.color = item.color;
            if (mimic) {
                obj.__proto__ = Item.prototype;
                obj.name['a'] = obj.getName(false, false, 'a');
                obj.name['b'] = obj.getName(false, false, 'b');
                obj.__proto__ = Enemy.prototype;
            }
        }

        if (!enemy && !item.equipable || mimic) {
            obj.shadow = 0;
            obj.stroke = 0;
            return;
        }

        if (enemy && fighter.mod === UNIQUE ||
            !enemy && itemUniqueMap[item.type].has(item.tabId) && coinToss()) {
            if (!enemy) {
                if (type === 'amulet' && evalPercentage(1)) {
                    obj.name['a'] = 'Amulet of Yendor';
                    obj.name['b'] = 'イェンダーの魔除け';
                } else {
                    let array = itemUniqueMap[item.type].get(item.tabId);
                    let unique = array[rndInt(array.length - 1)];
                    [obj.name['a'], obj.name['b']] = obj.getUniqueName(unique.name);
                }
            }

            obj.shadow = colorList.gold;
            obj.stroke = colorList.gold;
        } else if (coinToss()) {
            obj.stroke = 0;
            let bias = rndIntBet(1, MAX_BIAS_NUMS);
            if (coinToss()) {
                let affixes = modTab.prefix.get(bias).affix;
                let aff = affixes[rndInt(affixes.length - 1)];
                obj.name['a'] = `${obj.name['a']} ${aff.name['a']}`;
                obj.name['b'] = `${aff.name['b']}${obj.name['b']}`;
                obj.shadow = colorList.yellow;
            } else {
                let sufId = rndInt(modTab.suffix.length - 1);
                let pre = modTab.prefix.get(bias);
                let suf = modTab.suffix[sufId];
                obj.name['a'] = `${pre.name['a']} ${obj.name['a']} ${suf.name['a']}`;
                obj.name['b'] = `${pre.name['b']}${obj.name['b']} "${suf.name['b']}"`;
                obj.shadow = colorList.aqua;
            }
        } else {
            obj.shadow = 0;
            obj.stroke = 0;
        }
    },

    undoOne(obj) {
        obj.name['a'] = obj.nameTemp['a'];
        obj.name['b'] = obj.nameTemp['b'];
        obj.typeHalluc = null;
        obj.symbol = obj.symbolReal;
        obj.color = obj.colorReal;
        obj.shadow = obj.shadowReal;
        obj.stroke = obj.strokeReal;
    },
};

const statistics = {
    list: {
        a: { 
            name: { a: 'Strength', b: '筋力' },
            term: 'str',
        },

        b: {
            name: { a: 'Dexterity', b: '器用さ' },
            term: 'dex',
        },

        c: {
            name: { a: 'Constitution', b: '耐久力' },
            term: 'con',
        },

        d: {
            name: { a: 'Intelligence', b: '知力' },
            term: 'int',
        },
    },

    draw({
        msg,
        x,
        xPx,
        y,
        color,
        shadow,
        right,
        limit,
    }) {
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        if (color) ctxStats.fillStyle = color;
        if (shadow) ctxStats.shadowColor = shadow;
        if (right) ctxStats.textAlign = 'right';
        display.text({
            ctx: ctxStats,
            msg: msg,
            x: x,
            y: y,
            limit: limit,
            xPx: xPx,
            yPx: display.height + 5,
        });

        ctxStats.restore();
    },

    clear() {
        display.rect({
            ctx: display.ctxes.stats,
            y: -SS,
            yPx: display.height,
            widthPx: display.width,
            height: SS,
            clear: true,
        });
    },

    clearCondition() {
        display.rect({
            ctx: display.ctxes.stats,
            y: -SS - 2,
            yPx: display.height,
            widthPx: display.width,
            height: 2,
            clear: true,
        });
    },

    ShadowAndBar(e) {
        let ctxStats = display.ctxes.stats;
        let width = ctxStats.measureText(e.name).width;
        ctxStats.save();
        ctxStats.shadowColor = colorList.clear;
        ctxStats.fillStyle = colorList.black;
        ctxStats.globalAlpha = 0.5;
        display.rect({
            ctx: ctxStats,
            xPx: display.width / 2 - width / 2 - 3,
            y: MS,
            widthPx: width + 6,
            height: 2,
        });

        ctxStats.fillStyle = e.getConditionColor();
        display.rect({
            ctx: ctxStats,
            xPx: display.width / 2 - width / 2 - 3,
            y: MS + 1,
            widthPx: e.hp / e.hpMax * width + 6,
            height: 1,
        });

        ctxStats.restore();
    },

    drawEnemyBar(e, examine) {
        if (!e) return;
        this.clearEnemyBar(true);
        if (!(e.isShowing() &&
            (examine || distanceSq(e.x, e.y, rogue.x, rogue.y) <= FOV_SQ &&
            lineOfSight(e.x, e.y, rogue.x, rogue.y)))) {

            vuejs.enemyBar.enemy = null;
            return '';
        }
            
        this.ShadowAndBar(e);
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        ctxStats.textAlign = 'center';
        if (e.shadow) ctxStats.shadowColor = e.shadow;
        let name = e.getName(false, true);

        if (vuejs.enemyBar) {
            vuejs.enemyBar.enemy = e;
            vuejs.enemyBar.name = name;
        }

        if (e.cursed) ctxStats.fillStyle = colorList.red;
        display.text({
            ctx: ctxStats,
            msg: `Lv${e.lvl} ${name}`,
            x: 0,
            y: MS + 0.5,
            xPx: display.width / 2,
            stroke: e.stroke,
        });

        ctxStats.restore();
        if (examine) return name;
    },

    clearEnemyBar(draw) {
        if (!draw && vuejs.enemyBar) {
            vuejs.enemyBar.enemy = null;
        }

        display.rect({
            ctx: display.ctxes.stats,
            y: MS,
            yPx: -5,
            widthPx: display.width,
            height: 2,
            heightPx: 5,
            clear: true,
        });
    },

    drawCurrentEnemy(enemy) {
        let ctxStats = display.ctxes.stats;
        if (!enemy) return;
        ctxStats.save();
        ctxStats.textAlign = 'center';
        ctxStats.strokeStyle = colorList.gray;
        display.rect({
            ctx: ctxStats,
            x: -1.95,
            xPx: display.width,
            y: -4.45,
            yPx: display.height,
            width: 1,
            height: 1,
            stroke: true,
        });

        let symbol = enemy.symbol;
        ctxStats.fillStyle = enemy.color;
        if (enemy.shadow) ctxStats.shadowColor = enemy.shadow;
        display.text({
            ctx: ctxStats,
            msg: symbol,
            x: -1.5,
            y: -4,
            xPx: display.width,
            yPx: display.height,
            stroke: enemy.stroke,
        });

        ctxStats.restore();
    },
};

const cursol = {
    init() {
        let [x, y] = [rogue.x, rogue.y];
        this.x = this.cX = x;
        this.y = this.cY = y;
        map.coords[x][y].cursor = true;
    },

    draw(x, y) {
        display.rect({
            ctx: display.ctxes.cur,
            x: x - IN_WIDTH / 2,
            xPx: display.width / 2,
            y: y,
            width: 1,
            height: 1,
            stroke: true,
        });
    },

    clear(x, y) {
        display.rect({
            ctx: display.ctxes.cur,
            x: x - IN_WIDTH / 2, 
            xPx: display.width / 2 -1,
            y: y,
            yPx: -1,
            width: 1,
            widthPx: 3,
            height: 1,
            heightPx: 3,
            clear: true,
        });
    },

    clearAll() {
        for (let locs of map.coords) {
            for (let loc of locs) {
                loc.cursor = false;
                loc.plot = false;
            }
        }
    },

    plot(x, y, color) {
        let X = x - this.cX;
        let Y = y - this.cY + (IN_HEIGHT) / 2;
        let ctxCur = display.ctxes.cur;
        ctxCur.save();
        ctxCur.fillStyle = color;
        ctxCur.globalAlpha = 0.3;
        display.rect({
            ctx: ctxCur,
            x: X - 0.5,
            xPx: display.width / 2,
            y: Y,
            width: 1,
            height: 1,
            clear: true,
        });

        display.text({
            ctx: ctxCur,
            msg: '＊',
            x: X,
            y: Y + 0.5,
            xPx: display.width / 2,
        });

        ctxCur.restore();

        map.coords[x][y].plot = color;
    }
};
