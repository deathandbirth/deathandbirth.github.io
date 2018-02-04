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
                let loc = map.coords[i][j];
                loc.wall = WALL_HP;
                loc.indestructible = true;
            }
		}
		
        this.createEntrance();
    }

    createEntrance() {
        let x, y, name;
        if (this.id === 0 || this.id === 1) {
            if (this.id === 1) {
				[x, y] = [this.x + BUILD_WIDTH - 1, this.y];
                let entrance = new Entrance('cure');
                entrance.init(LOCATION, x, y);
			}
			
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y + BUILD_HEIGHT - 1];
            name = this.id === 0 ? 'book' : 'general';
        } else if (this.id === 2 || this.id === 3) {
            if (this.id === 2) {
				[x, y] = [this.x, this.y];
                let entrance = new Entrance('blacksmith');
                entrance.init(LOCATION, x, y);
			}
			
			[x, y] = [this.x, this.y + BUILD_HEIGHT - 1];
            name = this.id === 2 ? 'potion' : 'scroll';
        } else if (this.id === 4 || this.id === 5) {
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y];
            name = this.id === 4 ? 'wand' : 'weapon';
		} else if (this.id === 6 || this.id === 7) {
			[x, y] = [this.x, this.y];
            name = this.id === 6 ? 'armor' : 'gamble';
		}

        let entrance = new Entrance(name);
        entrance.init(LOCATION, x, y);
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
		
        let entrance = new Entrance('stash');
        entrance.init(LOCATION, POSITION.stash.x, POSITION.stash.y);
        map.fill(true);
        map.lighten(true);
	},
	
    createOne() {
        let build = new Build(...arguments);
        build.create();
        this.list.push(build);
    },
};
