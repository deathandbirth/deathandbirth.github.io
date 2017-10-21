/*
 * 0 1  2 3
 * 4 5  6 7
 */
const Build = class extends Room {
    constructor() {
        super(...arguments);
    }

    create() {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                coords[i][j].wall = WALL_HP;
                coords[i][j].indestructible = true;
            }
		}
		
        this.createEntrance();
    }

    createEntrance() {
        let x, y;
        if (this.id === 0 || this.id === 1) {
            if (this.id === 1) {
				[x, y] = [this.x + BUILD_WIDTH - 1, this.y];
                coords[x][y].enter = enter[CURE];
                coords[x][y].deleteWall();
			}
			
			[x, y] = [this.x + BUILD_WIDTH - 1, this.y + BUILD_HEIGHT - 1];
        } else if (this.id === 2 || this.id === 3) {
            if (this.id === 2) {
				[x, y] = [this.x, this.y];
                coords[x][y].enter = enter[BLACKSMITH];
                coords[x][y].deleteWall();
			}
			
			[x, y] = [this.x, this.y + BUILD_HEIGHT - 1];
        } else if (this.id === 4 || this.id === 5) {
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y];
		} else if (this.id === 6 || this.id === 7) {
			[x, y] = [this.x, this.y];
		}

        coords[x][y].enter = enter[this.id + 2];
        coords[x][y].deleteWall();
    }
}

const town = {
    createAll() {
        this.list = [];
        for (let i = 0; i < BUILD_NUM_MAX; i++) {
            let x = 3 + (i % BUILD_NUM_COL) * BUILD_WIDTH + (i % BUILD_NUM_COL) * 2;
            if (i % BUILD_NUM_COL >= 2) x++;
            let y = 3 + Math.floor(i / BUILD_NUM_COL) * BUILD_HEIGHT + Math.floor(i / BUILD_NUM_COL) * 2;
            if (Math.floor(i / BUILD_NUM_COL)) y++;
            this.createOne(x, y, i, BUILD_WIDTH, BUILD_HEIGHT);
		}
		
        coords[POSITION.stash.x][POSITION.stash.y].enter = enter[STASH];
        map.fill(true);
        map.lighten(true);
	},
	
    createOne() {
        let build = new Build(...arguments);
        build.create();
        this.list.push(build);
    },
};
