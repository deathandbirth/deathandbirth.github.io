const Portal = class extends Thing {
    constructor(obj, hidden) {
        super(obj);
    }

    putDown(x, y) {
        if (rogue.portal.x || rogue.portal.y) {
            let loc = map.coords[rogue.portal.x][rogue.portal.y];
            loc.enter = null;
            loc.draw();
            rogue.portal.x = rogue.portal.y = 0;
		}

        this.spiralSearch(x, y, ENTER);
        if (this.abort) return;
        [rogue.portal.x, rogue.portal.y] = [this.x, this.y];
        let loc = map.coords[this.x][this.y];
        loc.enter = this;
        loc.draw();
    }

    getName() {
        return this.name[option.getLanguage()];
    }
}
