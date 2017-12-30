const Door = class extends Position {
    constructor(x, y, dr, roomId) {
        super(x, y);
        this.dr = dr;
        this.roomId = roomId;
    }

    getPosInFrontOf() {
        let [x, y] = [this.x, this.y];
        switch (this.dr) {
            case LEFT:
                x--;
                break;
            case DOWN:
                y++;
                break;
            case UP:
                y--;
                break;
            case RIGHT:
                x++;
                break;
		}

        return [x, y];
    }
}

const Room = class extends Position {
    constructor(x, y, id, width, height) {
        super(x, y);
        this.id = id;
        this.width = width;
        this.height = height;
    }
}

/*
0  1  2  3  4
5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
*/
const Cave = class extends Room {
    constructor(x, y, id, width, height, lighten) {
        super(x, y, id, width, height);
        this.lighten = lighten;
        this.doors = [];
        this.doorIds = [];
    }

    create() {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let loc = map.coords[i][j];
                loc.lighten = this.lighten;
                if (!loc.indestructible &&
                    	(i === this.x || i === this.x + this.width - 1 ||
                        j === this.y || j === this.y + this.height - 1)) {
                    loc.wall = WALL_HP;
				} else {
					loc.floor = true;
				}
            }
		}
		
        for (let i = 0; i < 4; i++) {
			this.doors[i] = this.getDoor(i);
		}
    }

    getDoor(i) {
        let x, y;
        let found = true;
        if (i === LEFT) { //0
            if (this.id % CAVE_NUM_COL === 0) return null;
            x = this.x;
            y = rndIntBet(this.y + 1, this.y + this.height - 2);
        } else if (i === DOWN) { //1
            if (Math.floor(this.id / CAVE_NUM_COL) === CAVE_NUM_ROW - 1) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y + this.height - 1;
        } else if (i === UP) { //2
            if (Math.floor(this.id / CAVE_NUM_COL) === 0) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y;
        } else { //3 RIGHT
            if (this.id % CAVE_NUM_COL === CAVE_NUM_COL - 1) return null;
            x = this.x + this.width - 1;
            y = rndIntBet(this.y + 1, this.y + this.height - 2);
		}
        
        let loc = map.coords[x][y]; 
        loc.door = CLOSE;
        if (evalPercentage(10)) {
            loc.hidden = true;
		} else {
            loc.wall = false;
            loc.floor = true;
		}
		
        this.doorIds.push(i);
        return new Door(x, y, i, this.id);
    }

    createNest() {
        let magic = rogue.cdl >= 20 && evalPercentage(10);
        let boost = NEST_BOOST * (magic ? 2 : 1);
        let bias = RANDOM;
        if (magic && evalPercentage(25)) {
            let pre;
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++]
                pre = modTab[PREFIX].get(bias);
            } while (pre.lvl > rogue.cdl + boost ||
                evalPercentage(pre.rarity));
		}
		
        let type = RANDOM;
        if (rogue.cdl >= 10 && evalPercentage(5)) {
            do {
                type = FT[rndInt(FT.length - 2)];
            } while (fighterTab[type][0].lvl > rogue.cdl + boost);
		}
		
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let loc = map.coords[i][j];
                if (i === this.x || i === this.x + this.width - 1 ||
                  	j === this.y || j === this.y + this.height - 1) {
                    if (magic) {
                        if (loc.wall && !loc.hidden) {
                            loc.indestructible = true;
						} else {
                            if (loc.door) loc.hidden = true;
                            loc.wall = WALL_HP;
                        }
					}
					
                    continue;
				}
				
                if (coinToss()) {
                    if (coinToss()) {
                        creation.item({
                            position: LOCATION,
                            x: i,
                            y: j,
                            magic: magic,
                            boost: boost,
                        });
                    } else {
                        creation.trap(1, RANDOM, LOCATION, i, j);
                    }
				}
				
                if ((!loc.trap || !loc.trap.protection) && evalPercentage(25)) {
                    creation.enemy({
                        type: type,
                        position: LOCATION,
                        x: i,
                        y: j,
                        magic: magic,
                        bias: bias,
                        boost: boost,
					});
				}
            }
        }
    }
}

const dungeon = {
    roomIds: enums(0, CAVE_NUM_MAX - 1),
    create() {
        this.list = [];
        this.rns = []; //room numbers
        let count = 0;
        this.roomIds.shuffle();
        for (let i of this.roomIds) {
            if (evalPercentage(15) && ++count <= 10) continue;
            let width = rndIntBet(CAVE_WIDTH_MIN, CAVE_WIDTH_MAX);
            let height = rndIntBet(CAVE_HEIGHT_MIN, CAVE_HEIGHT_MAX);
            let x = rndInt(CAVE_WIDTH_MAX - width) + ((i % CAVE_NUM_COL) * (CAVE_WIDTH_MAX + 1));
            let y = rndInt(CAVE_HEIGHT_MAX - height) + (Math.floor(i / CAVE_NUM_COL) * (CAVE_HEIGHT_MAX + 1));
            let room = new Cave(x, y, i, width, height, lightenProb());
            room.create();
            this.list[i] = room;
            this.rns.push(i);
		}
		
        this.connect();
        this.deleteDoors();
        map.fill();
        for (let room of this.list) {
            if (room && rogue.cdl >= 10 && evalPercentage(1)) room.createNest();
        }
    },

    connect() {
        this.connectDoors(true);
        for (let i = 0, l = rndIntBet(3, 5); i < l; i++) {
			this.connectDoors();
		}
    },

    connectDoors(all) {
        this.rns.shuffle();
        for (let i = 0, l = this.rns.length; i < l - 1; i++) {
            let room1 = this.list[this.rns[i]];
            if (!room1.doorIds.length) continue;
            let room2 = this.list[this.rns[i + 1]];
            if (!room2.doorIds.length) continue;
            room1.doorIds.shuffle();
            let door1 = room1.doors[room1.doorIds.shift()];
            room2.doorIds.shuffle();
            let door2 = room2.doors[room2.doorIds.shift()];
            this.createPassage(door1, door2);
            if (!all) break;
        }
    },

    createPassage(door1, door2) {
        let [x1, y1] = door1.getPosInFrontOf();
        let [x2, y2] = door2.getPosInFrontOf();
        let path = pathfinding.main({
            x0: x1,
            y0: y1,
            xG: x2,
            yG: y2,
            pas: true,
        });
        if (path === null) throw new Error('path error');
        map.coords[x1][y1].floor = true;
        for (let pos of path) {
			map.coords[pos.x][pos.y].floor = true;
		}
		
        door1.connected = door2.connected = true;
    },

    deleteDoors() {
        for (let room of this.list) {
            if (!room) continue;
            for (let door of room.doors) {
                if (door === null || door.connected) continue;
                let loc = map.coords[door.x][door.y];
                loc.hidden = false;
                loc.floor = false;
                loc.door = false;
                door = null;
            }
        }
    }
};
