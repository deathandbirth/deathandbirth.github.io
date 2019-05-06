const map = {
    coords: [],
    init(town, load) {
        this.drawShadow();
        this.queue = new Queue();
        this.enemyList = {};
        this.itemList = {};
        this.trapList = {};
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
                }
            }
        }
    },

    drawGround() {
        // display.clearOne(display.ctxes.ground);
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                loc.drawGround();
            }
        }
    },

    drawObjectAll() {
        display.clearOne(display.ctxes.object);
        if (!rogue.blinded) {
            this.drawObject(this.staircaseList, SYMBOL_STAIRS);
            this.drawObject(this.trapList, SYMBOL_TRAP);
            this.drawObject(this.itemList, SYMBOL_ITEM);
            if (this.portal) this.drawObject([this.portal], SYMBOL_ENTER);
            this.drawObject(this.enemyList, SYMBOL_FIGHTER);
        }

        this.drawObject([rogue], SYMBOL_FIGHTER);
    },

    drawObject(list, type) {
        for (let key in list) {
            let obj = list[key];
            let loc = this.coords[obj.x][obj.y];
            loc.drawObject(type);
        }
    }, 

    drawShadow() {
        display.clearOne(display.ctxes.shadow);
        let ctx = display.ctxes.shadow;
        let canvas = ctx.canvas;
        display.rect({
            ctx: ctx,
            widthPx: canvas.width,
            heightPx: canvas.height,
        });
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

    draw(cX=rogue.x, cY=rogue.y, examine, minimap) {
        let dwidth = display.width;
        let dheight = display.height;
        let sx, sy, sxPx, syPx, swidth, sheight, dxPx, dyPx;
        if (minimap) {
            sx = sy = sxPx = syPx = 0;
            let lenX = this.coords.length;
            let lenY = this.coords[0].length;
            swidth = lenX * display.fs;
            sheight = lenY * display.fs;
            dwidth = swidth / 2;
            dheight = sheight / 2;
            /*
            dwidth = Math.floor(dwidth / lenX) * lenX;
            dheight = Math.floor(dheight / lenY) * lenY;
            if (dwidth > swidth) dwidth = swidth;
            if (dheight > sheight) dheight = sheight;
            let ratioX = dwidth / swidth;
            let ratioY = dheight / sheight;
            if (ratioX < 1 || ratioY < 1) {
                if (ratioX < ratioY) {
                    if (ratioX < MINIMAP_MIN_RATIO) {
                        ratioX = MINIMAP_MIN_RATIO;
                        dwidth = swidth * ratioX;
                    }

                    dheight = sheight * ratioX;
                } else {
                    if (ratioY < MINIMAP_MIN_RATIO) {
                        ratioY = MINIMAP_MIN_RATIO;
                        dheight = sheight * ratioY;
                    }

                    dwidth = swidth * ratioY;
                }
            }
            */

            dxPx = Math.floor((display.width - dwidth) / 2);
            dyPx = Math.floor((display.height - dheight) / 2);
        } else {
            dxPx = dyPx = 0;
            sx = cX + .5;
            sy = cY + .5;
            sxPx = -Math.floor(dwidth / 2);
            syPx = -Math.floor(dheight / 2);
            swidth = dwidth;
            sheight = dheight;
        }

        let ctxMain = display.ctxes.main;
        let obj = {
            ctx: ctxMain,
            sx: sx,
            sxPx: sxPx,
            sy: sy,
            syPx: syPx,
            sWidthPx: swidth,
            sHeightPx: sheight,
            dxPx: dxPx,
            dyPx: dyPx,
            dWidthPx: dwidth,
            dHeightPx: dheight,
        };

        display.clearOne(ctxMain);
        if (!rogue.blinded) {
            obj.img = display.canvases.ground;
            display.image(obj);
        }

        obj.img = display.canvases.object;
        display.image(obj);

        if (!rogue.blinded && !minimap) {
            obj.img = display.canvases.shadow;
            display.image(obj);
        }

        if (examine) {
            obj.img = display.canvases.cursor;
            display.image(obj);
        }
    },

    redraw() {
        this.drawGround();
        this.drawObjectAll();
        this.draw();
    },

    lighten(init) {
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                if (loc.hidden) {
                    loc.hidden = false;
                    loc.wall = false;
                }

                loc.lighten = true;
                loc.found = true;
                if (!init) loc.drawGround();
            }
        }

        if (!init) {
            this.drawShadow();
            rogue.litMapIds = {};
            rogue.lightenOrDarken('Lighten');
        }
    },

    drawMini(keyCode) {
        if (!(keyCode === 65 || //a all
            keyCode === 83 || //s self
            keyCode === 67 || //c close
            keyCode === 69 || //e enemy
            keyCode === 73 || //i item
            keyCode === 77 && input.isShift || //M map
            keyCode === 188 && input.isShift || //<
            keyCode === 190 && input.isShift || //>
            keyCode === 80 || //p portal
            keyCode === 84)) { //t trap
            return;
        }

        if (keyCode === 67) { //c
            rogue.cancelCommand();
            return;
        }

        if (keyCode === 65 || rogue.blinded) { //a
            this.drawObjectAll();
        } else {
            display.clearOne(display.ctxes.object);
            switch (keyCode) {
                case  69: //e
                    this.drawObject(this.enemyList, SYMBOL_FIGHTER);
                    break;
                case  83: //s
                    this.drawObject([rogue], SYMBOL_FIGHTER);
                    break;
                case  73: //i
                    this.drawObject(this.itemList, SYMBOL_ITEM);
                    break;
                case  188: //<
                case  190: //>
                    this.drawObject(this.staircaseList, SYMBOL_STAIRS);
                    break;
                case  80: //p
                    if (this.portal) this.drawObject([this.portal], SYMBOL_ENTER);
                    break;
                case  84: //t
                    this.drawObject(this.trapList, SYMBOL_TRAP);
                    break;
            }
        }

        this.draw(false, false, false, true);
    },
};

const seeInvisible = (see) => {
    for (let key in map.enemyList) {
        let enemy = map.enemyList[key];
        if (enemy.invisible) {
            if (!see && rogue.ce && rogue.ce.id === enemy.id) rogue.removeCe();
        }
    }
}

const hallucinate = {
    all(undo) {
        this.search(map.enemyList, true, undo);
        this.search(map.itemList, false, undo);
        map.redraw();
    },

    search(list, enemy, undo) {
        for (let key in list) {
            if (enemy && list[key].mimic) continue;
            if (!undo) {
                this.one(list[key], enemy);
            } else {
                this.undoOne(list[key]);
            }
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
            obj.color = fighter.color ? fighter.color : colorList.white;
        } else {
            type = IT[rndInt(IT.length - 2)];
            obj.typeHalluc = type;
            tabId = rndIntBet(1, itemTab[type].size);
            var item = itemTab[type].get(tabId);
            obj.name['a'] = item.nameReal['a'];
            obj.name['b'] = item.nameReal['b'];
            obj.symbol = item.symbol;
            obj.color = item.color ? item.color : colorList.white;
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

    drawEnemyBar(e, examine) {
        if (!e) return;
        if (!(e.isShowing() &&
            (examine || distanceSq(e.x, e.y, rogue.x, rogue.y) <= FOV_SQ &&
            lineOfSight(e.x, e.y, rogue.x, rogue.y)))) {
            vue.barEnemy = null;
            return '';
        }
            
        let name = e.getName(false, true);
        vue.barEnemy = e;
        vue.barName = name;
        if (examine) return name;
    },

    clearEnemyBar() {
        vue.barEnemy = null;
    },
};

const cursor = {
    init() {
        let [x, y] = [rogue.x, rogue.y];
        this.x = this.cX = x;
        this.y = this.cY = y;
        this.draw();
        map.draw(x, y, true);
    },

    draw() {
        display.rect({
            ctx: display.ctxes.cursor,
            x: this.x,
            xPx: 1,
            y: this.y,
            yPx: 1,
            width: 1,
            widthPx: -2,
            height: 1,
            heightPx: -2,
            stroke: true,
        });
    },

    drawPlot(x, y, color) {
        let ctxCur = display.ctxes.cursor;
        ctxCur.save();
        ctxCur.fillStyle = color;
        ctxCur.globalAlpha = 0.5;
        display.rect({
            ctx: ctxCur,
            x: x,
            y: y,
            width: 1,
            height: 1,
            clear: true,
        });

        display.text({
            ctx: ctxCur,
            msg: '＊',
            x: x,
            y: y,
        });

        ctxCur.restore();
    },

    clear() {
        display.rect({
            ctx: display.ctxes.cursor,
            x: this.x, 
            y: this.y,
            width: 1,
            height: 1,
            clear: true,
        });
    },

    clearAll() {
        display.clearOne(display.ctxes.cursor);
    },

    move(keyCode) {
        let dr = getDirection(keyCode);
        if (!dr) return;
        let [x, y] = [this.x, this.y];
        let [xinc, yinc] = [dr.x, dr.y];
        let [xDest, yDest] = [x + xinc, y + yinc];
        let width = map.coords.length - 1;
        let height = map.coords[0].length - 1;
        if (xDest < 0 || xDest > width || yDest < 0 || yDest > height) return;
        if (input.isShift) {
            xinc *= 10;
            yinc *= 10;
            xDest = x + xinc;
            if (xDest < 0 || xDest > width) {
                xinc = (xDest < 0 ? 0 : width) - x;
                if (yinc) yinc = (yinc > 0 ? 1 : -1) * Math.abs(xinc);
            }

            yDest = y + yinc;
            if (yDest < 0 || yDest > height) {
                yinc = (yDest < 0 ? 0 : height) - y;
                if (xinc) xinc = (xinc > 0 ? 1 : -1) * Math.abs(yinc);
            }
        }

        this.clear();
        this.x += xinc;
        this.y += yinc;
        [x, y] = [this.x, this.y];
        let offsetX = Math.floor(display.width / 2 / display.fs - .5);
        let offsetY = Math.floor(display.height / 2 / display.fs - .5);
        let X = x - this.cX;
        let Y = y - this.cY;
        let setCX, setCY;
        if (Math.abs(X) > offsetX) {
            setCX = true
            if (yinc > 0 && Y > 0 || yinc < 0 && Y < 0) setCY = true;
        }
        
        if (Math.abs(Y) > offsetY) {
            setCY = true;
            if (xinc > 0 && X > 0 || xinc < 0 && X < 0) setCX = true;
        }
        
        if (setCX) this.cX = x;
        if (setCY) this.cY = y;
        if (flag.aim) rogue.examinePlot();
        this.draw();
        map.draw(this.cX, this.cY, true);
        let loc = map.coords[x][y];
        loc.getInfo();
    }
};
