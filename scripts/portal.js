const Portal = class extends Thing {
    constructor() {
        super();
        this.name = { a: 'Portal', b: 'ポータル' };
        this.symbol = '＊';
        this.color = WHITE;
        this.stroke = SKY_BLUE;
        this.portal = true;
    }

    putDown(x, y) {
        if (map.portal) {
            let loc = map.coords[map.portal.x][map.portal.y];
            loc.enter = null;
            loc.draw();
            map.portal = null;
		}

        this.spiralSearch(x, y, ENTER);
        if (this.abort) return;
        let loc = map.coords[this.x][this.y];
        loc.enter = map.portal = this;
        loc.draw();
    }
}
