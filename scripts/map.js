const minimap = {
    clear() {
        ctxMap.clearRect(0, 0, canvas.width, canvas.height);
    },

    shadow() {
        ctxMap.save();
        ctxMap.shadowColor = CLEAR;
        ctxMap.globalAlpha = 0.9;
        ctxMap.fillStyle = BLACK;
        ctxMap.fillRect(0, 0, canvas.width, canvas.height - SS * fs);
        ctxMap.restore();
    },

    draw(keyCode) {
        if (!(keyCode === 65 || keyCode === 83 || keyCode === 67 || keyCode === 73 || keyCode === 77 && isShift ||
            keyCode === 188 && isShift || keyCode === 190 && isShift || keyCode === 80 || keyCode === 84)) { //a,s,c,i,m,<,>,p,t
            return;
        }

        this.clear();
        if (keyCode === 77 && isShift) { //M
            flag.minimap = false;
            flag.regular = true;
            return;
        }

        this.shadow();
        if (rogue.blinded) return;
        for (let i = 0, l = coords.length; i < l; i++) {
            for (let loc of coords[i]) {
                if ((loc.found || loc.detected) && loc.symbol !== '.' && (!loc.fighter || loc.fighter.detected || litMapIds[loc.x + ',' + loc.y])) {
                    if (keyCode === 83 && (rogue.x != loc.x || rogue.y != loc.y) &&
                        (loc.item['a'] || loc.fighter || loc.stairs || loc.enter || loc.trap)) { //s
                        continue;
                    } else if (keyCode === 67 && !loc.fighter &&
                        (loc.item['a'] || loc.stairs || loc.enter || loc.trap)) { //c
                        continue;
                    } else if (keyCode === 73 && (loc.fighter || loc.stairs || loc.enter || loc.trap)) { //i
                        if (loc.item['a']) {
                            let s = loc.item[EA[Object.keys(loc.item).length - 1]];
                            this.symbol(loc.x, loc.y, s.symbol, s.color, s.identified || rogue.hallucinated ? s.shadow : 0,
                                s.identified || rogue.hallucinated ? s.stroke : 0);
                        }

                        continue;
                    } else if ((keyCode === 188 || keyCode === 190) &&
                        (loc.item['a'] || loc.fighter || loc.enter || loc.trap)) { //<,>
                        if (loc.stairs && !loc.hidden) this.symbol(loc.x, loc.y, loc.stairs.symbol, loc.stairs.color, 0);
                        continue;
                    } else if (keyCode === 80 &&
                        (loc.item['a'] || loc.fighter || loc.stairs || loc.enter || loc.trap)) { //p
                        if (loc.enter && loc.enter.portal) this.symbol(loc.x, loc.y, loc.enter.symbol, loc.enter.color, 0, loc.enter.stroke);
                        continue;
                    } else if (keyCode === 84 &&
                        (loc.item['a'] || loc.fighter || loc.stairs || loc.enter)) { //t
                        if (loc.trap && !loc.hidden) this.symbol(loc.x, loc.y, loc.trap.symbol, loc.trap.color, 0, 0);
                        continue;
                    }

                    this.symbol(loc.x, loc.y, loc.symbol, loc.color, loc.shadow, loc.stroke);
                }
            }
        }
    },

    symbol(x, y, symbol, color, shadow, stroke) {
        ctxMap.save();
        ctxMap.fillStyle = color;
        if (rogue.hallucinated && !shadow) ctxMap.shadowColor = PURPLE;
        if (shadow) ctxMap.shadowColor = shadow;
        if (stroke) {
            ctxMap.strokeStyle = stroke;
            ctxMap.strokeText(symbol, (x + 1.5) * this.fs, (y + 0.5) * this.fs);
        }

        ctxMap.fillText(symbol, (x + 1.5) * this.fs, (y + 0.5) * this.fs);
        ctxMap.restore();
    },
};

const map = {
    init(town) {
        coords = [];
        let width = town ? IN_WIDTH : WIDTH;
        let height = town ? IN_HEIGHT : HEIGHT;
        for (let i = 0; i < width; i++) {
            coords.push([]);
            for (let j = 0; j < height; j++) {
                coords[i].push(new Location(i, j));
                if (i === 0 || i === width - 1 || j === 0 || j === height - 1) {
                    coords[i][j].indestructible = true;
                    coords[i][j].wall = WALL_HP;
                }
            }
        }
    },

    fill(town) {
        let width = coords.length;
        let height = coords[0].length;
        for (let i = 1; i < width - 1; i++) {
            for (let j = 1; j < height - 1; j++) {
                let loc = coords[i][j];
                if (town) {
                    if (!loc.wall) loc.floor = true;
                } else if (!loc.floor && !loc.wall) {
                    if (evalPercentage(1)) {
                        creation.item({
                            type: 'coin',
                            tabId: 1,
                            position: LOCATION,
                            x: i,
                            y: j,
                        });
                    } else if (evalPercentage(0.1)) {
                        creation.item({
                            type: 'gem',
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
        ctxMain.clearRect(0, 0, canvas.width, canvas.height);
        let X = cX - (IN_WIDTH - 1) / 2;
        let Y = cY - (IN_HEIGHT) / 2;
        ctxMain.drawImage(canvas.buf, X * fs, Y * fs, IN_WIDTH * fs, IN_HEIGHT * fs,
            (canvas.width - IN_WIDTH * fs) / 2, 0, IN_WIDTH * fs, IN_HEIGHT * fs);
    },

    redraw(cX, cY) {
        ctxBuf.clearRect(0, 0, canvas.width * 2, canvas.height * 2);
        for (let i = 0, l = coords.length; i < l; i++) {
            for (let loc of coords[i]) {
                loc.draw();
            }
        }

        rogue.drawStats();
    },

    lighten(init) {
        for (let i = 0, l = coords.length; i < l; i++) {
            for (let loc of coords[i]) {
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
    for (let key in Enemy.list) {
        let enemy = Enemy.list[key];
        if (enemy.invisible) {
            coords[enemy.x][enemy.y].draw();
            if (!see && rogue.ce && rogue.ce.id === enemy.id) rogue.removeCe();
        }
    }

    map.draw(rogue.x, rogue.y);
}

const hallucinate = {
    all(undo) {
        this.search(Enemy.list, true, undo);
        this.search(Item.list, false, undo);
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

            coords[list[key].x][list[key].y].getSymbol();
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

            obj.shadow = GOLD;
            obj.stroke = INDIGO;
        } else if (coinToss()) {
            obj.stroke = 0;
            let bias = rndIntBet(1, MAX_BIAS_NUMS);
            if (coinToss()) {
                let affixes = modTab[PREFIX].get(bias).affix;
                let aff = affixes[rndInt(affixes.length - 1)];
                obj.name['a'] = `${obj.name['a']} ${aff.name['a']}`;
                obj.name['b'] = `${aff.name['b']}${obj.name['b']}`;
                obj.shadow = YELLOW;
            } else {
                let sufId = rndInt(modTab[SUFFIX].length - 1);
                let pre = modTab[PREFIX].get(bias);
                let suf = modTab[SUFFIX][sufId];
                obj.name['a'] = `${pre.name['a']} ${obj.name['a']} ${suf.name['a']}`;
                obj.name['b'] = `${pre.name['b']}${obj.name['b']} "${suf.name['b']}"`;
                obj.shadow = AQUA;
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
        y,
        color,
        shadow,
        measured,
        right,
        limit,
    }) {
        ctxStats.save();
        if (!measured) x *= fs;
        if (limit) limit *= fs;
        if (color) ctxStats.fillStyle = color;
        if (shadow) ctxStats.shadowColor = shadow;
        if (right) ctxStats.textAlign = 'right';
        ctxStats.fillText(msg, x, canvas.height + y * fs + 5, limit);
        ctxStats.restore();
    },

    clear() {
        ctxStats.clearRect(0, canvas.height - SS * fs, canvas.width, SS * fs);
    },

    clearCondition() {
        ctxStats.clearRect(0, canvas.height - (SS + 2) * fs, canvas.width, 2 * fs);
    },

    ShadowAndBar(e) {
        let width = ctxStats.measureText(e.name).width;
        ctxStats.save();
        ctxStats.shadowColor = CLEAR;
        ctxStats.fillStyle = BLACK;
        ctxStats.globalAlpha = 0.5;
        ctxStats.fillRect(canvas.width / 2 - width / 2 - 3, (MS) * fs, width + 6, 2 * fs); //
        ctxStats.fillStyle = e.getConditionColor();
        ctxStats.fillRect(canvas.width / 2 - width / 2 - 3, (MS + 1) * fs, e.hp / e.hpMax * width + 6, fs);
        ctxStats.restore();
    },

    drawEnemyBar(e, examine) {
        if (!e) return;
        this.clearEnemyBar();
        if (!(e.isShowing() &&
            (examine || distanceSq(e.x, e.y, rogue.x, rogue.y) <= FOV_SQ &&
            lineOfSight(e.x, e.y, rogue.x, rogue.y)))) {
            return '';
        }
            
        this.ShadowAndBar(e);
        ctxStats.save();
        ctxStats.textAlign = 'center';
        if (e.shadow) ctxStats.shadowColor = e.shadow;
        let name = e.getName(false, true);
        if (e.stroke) {
            ctxStats.strokeStyle = e.stroke;
            ctxStats.strokeText(`Lv${e.lvl} ${name}`, canvas.width / 2, (MS + 0.5) * fs);
        }

        if (e.cursed) ctxStats.fillStyle = RED;
        ctxStats.fillText(`Lv${e.lvl} ${name}`, canvas.width / 2, (MS + 0.5) * fs);
        ctxStats.restore();
        if (examine) return name;
    },

    clearEnemyBar() {
        ctxStats.clearRect(0, MS * fs - 5, canvas.width, 2 * fs + 5); //
    },

    drawCurrentEnemy(enemy) {
        if (!enemy) return;
        ctxStats.save();
        ctxStats.textAlign = 'center';
        ctxStats.strokeStyle = GRAY;
        ctxStats.strokeRect(canvas.width - 1.95 * fs, canvas.height - 4.45 * fs, fs, fs);
        let symbol = enemy.symbol;
        ctxStats.fillStyle = enemy.color;
        if (enemy.shadow) ctxStats.shadowColor = enemy.shadow;
        if (enemy.stroke) {
            ctxStats.strokeStyle = enemy.stroke;
            ctxStats.strokeText(symbol, canvas.width - 1.5 * fs, canvas.height - 4 * fs);
        }
        
        ctxStats.fillText(symbol, canvas.width - 1.5 * fs, canvas.height - 4 * fs);
        ctxStats.restore();
    },
};

const cursol = {
    init() {
        this.x = this.cX = rogue.x;
        this.y = this.cY = rogue.y;
    },

    draw(x, y) {
        ctxCur.strokeRect(x * fs + canvas.width / 2 - (IN_WIDTH - 1) / 2 * fs - fs / 2, y * fs, fs, fs);
    },

    clear(x, y) {
        ctxCur.clearRect(x * fs + canvas.width / 2 - (IN_WIDTH - 1) / 2 * fs - fs / 2 - 1, y * fs - 1, fs + 3, fs + 3);
    },

    plot(x, y, color) {
        let X = x - this.cX;
        let Y = y - this.cY + (IN_HEIGHT) / 2;
        ctxCur.save();
        ctxCur.fillStyle = color;
        ctxCur.globalAlpha = 0.3;
        ctxCur.clearRect(X * fs - fs / 2 + canvas.width / 2, Y * fs, fs, fs);
        ctxCur.fillText('＊', X * fs + canvas.width / 2, (Y + 0.5) * fs);
        ctxCur.restore();
    }
};
