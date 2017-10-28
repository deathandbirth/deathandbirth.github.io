const Thing = class {
    constructor(obj) {
        copyObj(this, obj);
    }

    init(position, x, y) {
        if (position !== LOCATION) {
            this.getPositionRandomly(position === INIT, position === AWAY);
            [x, y] = [this.x, this.y];
		}

        if (!this.abort) this.putDown(x, y);
    }

    getPositionRandomly(init, away, tele) {
        let x, y, loc;
        let count = 0;
        if (init) {
            let room, id;
            let l = dungeon.rns.length;
            dungeon.rns.shuffle();
            let i = 0;
            do {
                id = dungeon.rns[i++];
                if (id === undefined) {
                    dungeon.rns.shuffle();
                    i = 0;
                    id = dungeon.rns[i++];
				}

                room = dungeon.list[id];
                x = rndIntBet(room.x + 1, room.x + room.width - 2);
                y = rndIntBet(room.y + 1, room.y + room.height - 2);
                loc = coords[x][y];
            } while ((loc.wall || loc.door ||
                    loc.fighter || loc.item['a'] ||
					loc.trap || loc.enter || loc.stairs) &&
					++count < 1000
			);
        } else {
            let [width, height] = [coords.length, coords[0].length];
            do {
                x = rndInt(width - 2) + 1;
                y = rndInt(height - 2) + 1;
                loc = coords[x][y];
            } while ((loc.wall || loc.door ||
                    loc.fighter || loc.item['a'] ||
                    loc.trap || loc.enter || loc.stairs ||
                    away && distanceSq(x, y, rogue.x, rogue.y) <= FOV_SQ) &&
					++count < 1000
			);
		}
		
        if (count < 100) {
            [this.x, this.y] = [x, y];
		} else if (!tele && this.id !== ROGUE) {
			this.dissapear();
		}
    }

    spiralSearch(x0, y0, type, count = 0) {
        let [x, y] = [x0, y0];
        let width = coords.length;
        let height = coords[0].length;
        let loop = 0;
        let limit = type === ITEM && count < MAX_SEARCH_RANGE ? count : MAX_SEARCH_RANGE;
        if (this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
        do {
            y--;
            while (y < y0) {
                x++, y++;
                if (x < width - 1 && y > 0 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (x > x0) {
                x--, y++;
                if (x < width - 1 && y < height - 1 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (y > y0) {
                x--, y--;
                if (x > 0 && y < height - 1 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (x < x0) {
                x++, y--;
                if (x > 0 && y > 0 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
		} while (loop++ <= limit);
		
        if (type === ITEM && ++count < MAX_PACK_COUNT) {
            this.spiralSearch(x0, y0, type, count);
		} else if (this.id !== ROGUE) {
			this.dissapear();
		}
    }

    spiralSearchCheck(x, y, x0, y0, type, count) {
        let loc = coords[x][y];
        if (!loc.wall && loc.door !== CLOSE && !loc.enter) {
            if ((type === FIGHTER && !loc.fighter ||
                    type === ITEM && !loc.trap && !loc.door &&
                    !loc.item[EA[count]] ||
                    type === TRAP && !loc.item['a'] &&
                    !loc.door && !loc.trap && !loc.stairs ||
                    type === STAIRCASE && !loc.door &&
                    !loc.trap && !loc.stairs ||
                    type === ENTER) &&
            	    lineOfSight(x0, y0, x, y)) {
                [this.x, this.y] = [x, y];
                return true;
            }
        }
    }

    dissapear() {
        this.abort = true;
        let name = this.getName();
        message.draw(option.isEnglish() ?
            `${name} dissapeared` :
            `${name}は消え去った`);
    }
}