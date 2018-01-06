const circleSearch = {
    main({
        x0,
        y0,
        type,
        radius,
        symbol,
        perc,
    }) {
        this.count = 0;
        this.type = type;
        this.symbol = symbol;
        this.perc = perc;
        let width = map.coords.length;
        let height = map.coords[0].length;
        let radiusSq = radius ** 2;
        for (let j = 0; j <= radius; j++) {
            let col = -radius;
            while (distanceSq(col, j, 0, 0) > radiusSq) col++;
            for (let i = col; i <= -col; i++) {
                if (i + x0 < 0) continue;
                if (i + x0 >= width) break;
                if (y0 + j < height) this.do(i + x0, j + y0);
                if (j && y0 - j >= 0) this.do(i + x0, -j + y0);
            }
        }

        if (this.count) {
            if (this.type === MONSTER_DETECTION) {
                message.draw(option.isEnglish() ?
                    `Detected ${this.count} enemies` :
                    `${this.count}体の敵を検出した`);
            } else if (this.type === ITEM_DETECTION) {
                message.draw(option.isEnglish() ?
                    `Detected ${this.count} items` :
                    `${this.count}個のアイテムを検出した`);
            } else if (this.type === DISINTEGRATION) {
                message.draw(option.isEnglish() ?
                    `Disintegrated ${this.count} enemies` :
                    `${this.count}体の敵を塵にした`);
            }
        }
    },

    do(x, y) {
        let loc = map.coords[x][y];
        switch (this.type) {
            case MAGIC_MAPPING:
            case ITEM_DETECTION:
                if (this.type === MAGIC_MAPPING && loc.item['a'] ||
                    this.type === ITEM_DETECTION && (!loc.item['a'] ||
                    loc.found)) return;
                loc.found = true;
                loc.draw();
                this.count++;
                break;
            case MONSTER_DETECTION:
                if (!loc.fighter || loc.fighter.id === ROGUE || loc.detected) return;
                loc.fighter.detected = true;
                loc.detected = true;
                loc.draw();
                this.count++;
                break;
            case SCREAM:
                if (!loc.fighter || !loc.fighter.sleeping) return;
                loc.fighter.wakeUp();
                break;
            case DISINTEGRATION:
                if (!loc.fighter || loc.fighter.id === ROGUE || loc.fighter.symbol !== this.symbol) return;
                if (loc.fighter.mod !== UNIQUE &&
                    !evalPercentage(loc.fighter.lvl)) {
                    if (rogue.ce && rogue.ce.id === loc.fighter.id) rogue.removeCe();
                    loc.fighter.died();
                    this.count++;
                } else if (loc.fighter.sleeping) {
                    loc.fighter.wakeUp();
                }

                break;
            case EARTHQUAKE:
                if (!evalPercentage(this.perc) || loc.indestructible || loc.enter && !loc.enter.portal) return;
                loc.found = false;
                loc.lighten = false;
                loc.wall = WALL_HP * coinToss();
                loc.floor = !loc.wall;
                loc.hidden = false;
                loc.door = false;
                loc.trap = null;
                if (loc.enter && loc.enter.portal) {
                    rogue.portal.x = rogue.portal.y = 0;
                    loc.enter = null;
                }

                let found;
                if (loc.item) {
                    let items = {};
                    let i = 0;
                    for (let key in loc.item) {
                        let item = loc.item[key];
                        if (item.indestructible || evalPercentage(item.earth)) {
                            items[EA[i++]] = item;
                            found = true;
                            continue;
                        }

                        if (item.mod === UNIQUE && !item.identified) {
                            let id = item.type + ',' + item.tabId + ',' + item.uniqueId;
                            if (this.cui[id]) delete this.cui[id];
                        }

                        delete map.itemList[item.id];
                    }
                    loc.item = items;
                }

                if (loc.fighter) {
                    if (loc.fighter.id === ROGUE || loc.fighter.boss ||
                        loc.fighter.indestructible || evalPercentage(loc.fighter.earth)) {
                        if (loc.fighter.sleeping) loc.fighter.wakeUp();
                        found = true;
                    } else {
                        if (loc.fighter.mod === UNIQUE) delete rogue.cue[loc.fighter.name[ENG]];
                        loc.fighter.died();
                    }
                }

                loc.wall = WALL_HP * (!found && coinToss());
                loc.floor = !loc.wall;
                loc.draw();
                break;
        }
    }
};

const lineOfSight = (x0, y0, x1, y1, color, skill) => {
    let parabora = flag.arrow || flag.throw || skill && skill.parabora;
    let rangeSq = skill && skill.range >= 0 ? skill.range ** 2 : FOV_SQ;
    let radius = skill && skill.radius ? skill.radius : 0;
    let [xT, xS, yT, yS] = [x0, x0, y0, y0];
    let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (steep) [x0, y0, x1, y1] = [y0, x0, y1, x1];
    let [dx, dy] = [Math.abs(x1 - x0), Math.abs(y1 - y0)];
    let error = dx / 2;
    let ystep = y0 < y1 ? 1 : -1;
    let y = y0;
    let los = true;
    let inc = x0 < x1 ? 1 : -1;
    for (let x = x0 + inc; x1 - x + inc; x += inc) {
        error -= dy;
        if (error < 0) {
            y += ystep;
            error += dx;
        }

        [xS, yS] = !steep ? [x, y] : [y, x];
        let loc = map.coords[xS][yS];
        if (color) {
            if (distanceSq(x, y, x0, y0) > rangeSq) {
                los = false;
                break;
            }

            cursol.plot(xS, yS, color);
            if (radius && (skill.each || loc.fighter && skill.penetrate)) {
                if (!(loc.wall || loc.door === CLOSE)) {
                    shadowcasting.main({
                        x0: xS,
                        y0: yS,
                        radius: radius,
                        color: color,
                    });
                }
            } else if (loc.fighter && (!skill || !skill.penetrate) && !parabora) {
                break;
            }
        }
        if (loc.wall || loc.door === CLOSE) {
            los = false;
            break;
        }

        [xT, yT] = [xS, yS];
    }

    if (color && radius) {
        if (!los) [xS, yS] = [xT, yT];
        shadowcasting.main({
            x0: xS,
            y0: yS,
            radius: radius,
            color: color
        });
    }
    return los;
}

/*
4\5|6/7
---+---
3/2|1\0
*/
const shadowcasting = {
    transforms: [
        { xx: 1, xy: 0, yx: 0, yy: 1 },
        { xx: 0, xy: 1, yx: 1, yy: 0 },
        { xx: 0, xy: -1, yx: 1, yy: 0 },
        { xx: -1, xy: 0, yx: 0, yy: 1 },
        { xx: -1, xy: 0, yx: 0, yy: -1 },
        { xx: 0, xy: -1, yx: -1, yy: 0 },
        { xx: 0, xy: 1, yx: -1, yy: 0 },
        { xx: 1, xy: 0, yx: 0, yy: -1 },
    ],

    main({
        x0,
        y0,
        radius,
        type,
        lvl,
        color,
        lightRad,
        search,
        fighter,
    }) {
        if (!radius) return;
        this.radiusSq = radius ** 2;
        this.width = map.coords.length;
        this.height = map.coords[0].length;
        this.type = type;
        this.lvl = lvl;
        this.color = color;
        this.fighter = fighter;
        if (search) map.coords[x0][y0].findHiddenObject();
        if (this.type === 'Lighten') {
            this.lightRadSq = lightRad ** 2;
            this.oldLitMap = rogue.litMapIds;
            rogue.litMapIds = {};
        }

        this.do(x0, y0);
        for (let i = 0; i <= 7; i++) {
            this.line(i, x0, y0, radius, search);
            this.around(this.transforms[i], x0, y0, radius, 1, 1, 0);
        }

        if (this.type === 'Lighten') {
            for (let key in this.oldLitMap) {
                let [x, y] = key.split(',');
                map.coords[x][y].draw();
            }
        }
    },

    line(i, x0, y0, radius, search) {
        for (let j = 1; j <= radius; j++) {
            let [x1, y1] = [DR[i].x * j, DR[i].y * j];
            let l = distanceSq(x1, y1, 0, 0);
            if (l > this.radiusSq) break;
            let [x, y] = [x0 + x1, y0 + y1];
            this.do(x, y, l);
            let loc = map.coords[x][y];
            if (search && j === 1) loc.findHiddenObject();
            if (loc.wall || loc.door === CLOSE) break;
        }
    },

    around(tr, x0, y0, radius, startDia, leftSlope, rightSlope) {
        for (let xc = startDia, blocked; xc <= radius && !blocked; xc++) {
            for (let yc = xc; yc >= 0; yc--) {
                let x = x0 + xc * tr.xx + yc * tr.xy;
                let y = y0 + xc * tr.yx + yc * tr.yy;
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) continue;
                let leftBlockSlope = (yc + 0.5) / (xc - 0.5);
                let rightBlockSlope = (yc - 0.5) / (xc + 0.5);
                if (rightBlockSlope > leftSlope) {
                    continue;
                } else if (leftBlockSlope < rightSlope) {
                    break;
                }

                if (yc !== xc && yc !== 0) {
                    let l = distanceSq(xc, yc, 0, 0);
                    if (l <= this.radiusSq) this.do(x, y, l);
                }

                let loc = map.coords[x][y];
                if (blocked) {
                    if (loc.wall || loc.door === CLOSE) {
                        this.rightSlopeSaved = rightBlockSlope;
                    } else {
                        blocked = false;
                        leftSlope = this.rightSlopeSaved;
                    }
                } else if (loc.wall || loc.door === CLOSE) {
                    blocked = true;
                    this.rightSlopeSaved = rightBlockSlope;
                    if (leftBlockSlope <= leftSlope) this.around(tr, x0, y0, radius, xc + 1, leftSlope, leftBlockSlope);
                }
            }
        }
    },

    do(x, y, distance) {
        let loc = map.coords[x][y];
        if (this.color) {
            cursol.plot(x, y, this.color);
        } else if (this.type === 'Lighten') {
            if ((!this.lightRadSq || distance > this.lightRadSq) &&
                !loc.lighten) return;
            let id = x + ',' + y;
            rogue.litMapIds[id] = true;
            if (this.oldLitMap[id]) {
                delete this.oldLitMap[id];
            } else {
                loc.found = true;
                loc.draw();
            }
        } else if (this.type === 'Light') {
            if (!loc.lighten) {
                loc.lighten = true;
                loc.found = true;
                loc.draw();
            }
        } else if (this.type === 'Dark') {
            if (loc.lighten) {
                loc.lighten = false;
                loc.draw();
            }
        } else if (this.type === 'Aim') {
            let self = this.fighter;
            let enemy = loc.fighter;
            if (enemy && self.id !== enemy.id &&
                (self.hallucinated || self.isOpponent(enemy)) &&
                (!self.ce || this.distanceSaved > distance) &&
                enemy.isShowing() &&
                lineOfSight(self.x, self.y, x, y)) {
                self.ce = enemy;
                this.distanceSaved = distance;
            }
        } else if (loc.fighter &&
            this.fighter.isOpponent(loc.fighter)) { //skill
            this.fighter.haveCast(this.type, this.lvl, loc.fighter, x, y);
        }
    }
};

const BinaryHeap = class {
    constructor() {
        this.list = [];
    }

    push(value) {
        this.list.push(value);
        this.upHeap(this.list.length - 1);
    }

    upHeap(cKey) {
        if (!cKey) return;
        let pKey = Math.floor((cKey - 1) / 2);
        if (this.compare(cKey, pKey)) {
            this.list.swap(cKey, pKey);
            this.upHeap(pKey);
            return true;
        }
    }

    shift() {
        let eKey = this.list.length - 1;
        if (eKey <= 0) return !eKey ? this.list.shift() : null;
        this.list.swap(0, eKey);
        let value = this.list.pop();
        this.downHeap(0);
        return value;
    }

    delete(value) {
        let eKey = this.list.length - 1;
        if (eKey <= 0) return !eKey ? this.list.shift() : null;
        let key = this.list.indexOf(value);
        if (key === eKey) {
            this.list.pop();
            return;
        }

        this.list.swap(key, eKey);
        this.list.pop();
        if (!this.upHeap(key)) this.downHeap(key);
    }

    downHeap(pKey) {
        let lcKey = 2 * pKey + 1;
        if (!this.list[lcKey]) return;
        let cKey;
        let rcKey = lcKey + 1;
        if (!this.list[rcKey]) {
            cKey = lcKey;
        } else {
            cKey = this.compare(lcKey, rcKey) ? lcKey : rcKey;
        }

        if (this.compare(cKey, pKey)) {
            this.list.swap(cKey, pKey);
            this.downHeap(cKey);
            return true;
        }
    }

    update(value, up) {
        let key = this.list.indexOf(value);
        up ? this.upHeap(key) : this.downHeap(key);
    }

    compare(i, j) {
        let list = this.list[i];
        let list2 = this.list[j];
        return list.fScore < list2.fScore ||
            list.fScore === list2.fScore &&
            (list.gScore < list2.gScore || list.next);
    }
}

const Node = class extends Position {
    constructor(x, y, gScore, parent) {
        super(x, y);
        this.id = x + ',' + y;
        this.gScore = gScore;
        this.parent = parent;
    }

    calcScore(xG, yG, pas, map) {
        if (map) {
            this.hScore = 0;
        } else {
            let x = Math.abs(this.x - xG);
            let y = Math.abs(this.y - yG);
            if (pas) {
                this.hScore = x + y;
            } else {
                this.hScore = x > y ? x : y;
            }
        }

        this.calcFScore()
    }

    calcFScore() {
        this.fScore = this.gScore + this.hScore;
    }
}

const pathfinding = {
    main({
        x0,
        y0,
        xG,
        yG,
        pas,
        map,
    }) {
        if (x0 === xG && y0 === yG) return [{ x: xG, y: yG }]
        this.init(xG, yG, pas, map);
        let curNode = this.createNode(x0, y0, 0);
        if (map) {
            var distanceMap = {};
            distanceMap[x0 + ',' + y0] = 0;
        }

        while (this.loop++ < MAX_PF_LOOP) {
            curNode = this.createNeighborNodes(curNode);
            if (!curNode) break;
            if (map) {
                distanceMap[curNode.x + ',' + curNode.y] = curNode.gScore;
            } else if (curNode.x === this.xG && curNode.y === this.yG) {
                this.getPath(curNode);
                this.pathList.pop();
                break;
            }

            delete this.openSet[curNode.id];
        }

        if (map) {
            return distanceMap;
        } else {
            return this.pathList[0] ? this.pathList.reverse() : null;
        }
    },

    init(xG, yG, pas, map) {
        this.pas = pas;
        this.map = map;
        this.loop = 0;
        this.heap = new BinaryHeap();
        this.openSet = {};
        this.idList = {};
        this.pathList = [];
        this.xG = xG; //goal
        this.yG = yG;
    },

    createNode() {
        let node = new Node(...arguments);
        node.calcScore(this.xG, this.yG, this.pas, this.map);
        this.idList[node.id] = true;
        return node;
    },

    createNeighborNodes(node) {
        let nextNode = null;
        let newNode = null;
        let gScore = node.gScore + 1;
        let count = 0;
        for (let key in DR) {
            if (this.map && gScore > FOV || this.pas && ++count > 4) break;
            let x = node.x + DR[key].x;
            let y = node.y + DR[key].y;
            let loc = map.coords[x][y];
            if (!loc.wall && (!this.pas || loc.door !== CLOSE)) {
                let id = x + ',' + y;
                if (!this.idList[id]) {
                    newNode = this.createNode(x, y, gScore, node);
                    this.openSet[id] = newNode;
                    this.heap.push(newNode);
                } else if (this.openSet[id] &&
                    this.openSet[id].gScore > gScore) {
                    newNode = this.openSet[id];
                    newNode.gScore = gScore;
                    newNode.calcFScore();
                    this.heap.update(newNode);
                } else {
                    continue;
                }

                if (!nextNode && newNode.hScore < node.hScore) {
                    nextNode = true;
                    newNode.next = true;
                    this.heap.update(newNode, true);
                }
            }
        }
        
        return this.heap.shift();
    },

    getPath(node) {
        this.pathList.push({ x: node.x, y: node.y });
        if (node.parent) this.getPath(node.parent);
    },
};
