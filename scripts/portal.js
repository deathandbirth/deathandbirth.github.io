const Portal = class extends Thing{
	constructor(obj,hidden){
		super(obj);
	}
	
	putDown(x,y){
		if(rogue.portal.x||rogue.portal.y){
			let [x2, y2] = [rogue.portal.x, rogue.portal.y];
			coords[x2][y2].enter = null;
			coords[x2][y2].draw();
			rogue.portal.x = rogue.portal.y = 0;
		}
		this.spiralSearch(x,y,ENTER);
		if(this.abort) return;
		[rogue.portal.x, rogue.portal.y] = [this.x, this.y];
		coords[this.x][this.y].enter = this;
		coords[this.x][this.y].draw();
	}
	
	getName(){
		return this.name[rogue.cl];
	}
}
