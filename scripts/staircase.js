const stairsMap = new Map([
	[DOWN, {
        name: { a: 'down staircase', b: '下り階段' },
        symbol: '>',
        color: WHITE,
        id: DOWN,
	}],
	
	[UP, {
        name: { a: 'up staircase', b: '上り階段' },
        symbol: '<',
        color: WHITE,
        id: UP,
    }],
]);

const Staircase = class extends Thing {
    constructor(obj, hidden) {
        super(obj);
        this.hidden = hidden;
    }

    putDown(x, y) {
        this.spiralSearch(x, y, STAIRCASE);
        if (this.abort) return;
        coords[this.x][this.y].stairs = this;
        coords[this.x][this.y].hidden = this.hidden;
        if (!this.hidden) coords[this.x][this.y].draw();
        Staircase.list[this.x + ',' + this.y] = this;
    }

    getName() {
        return this.name[rogue.cl];
    }
}

Staircase.list = {};
