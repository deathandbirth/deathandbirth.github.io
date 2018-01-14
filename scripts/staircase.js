const stairsMap = new Map([
	[DOWN, {
        name: { a: 'down staircase', b: '下り階段' },
        symbol: '>',
        color: colorList.white,
        id: DOWN,
	}],
	
	[UP, {
        name: { a: 'up staircase', b: '上り階段' },
        symbol: '<',
        color: colorList.white,
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
        let loc = map.coords[this.x][this.y];
        loc.stairs = this;
        loc.hidden = this.hidden;
        if (!this.hidden) loc.draw();
        map.staircaseList[this.x + ',' + this.y] = this;
    }
}
