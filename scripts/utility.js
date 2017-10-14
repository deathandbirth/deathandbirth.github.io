Object.defineProperty(Array.prototype, 'swap', {
    value(i,j){
		[this[i], this[j]] = [this[j], this[i]];
    },
});
		
Object.defineProperty(Array.prototype, 'shuffle', {
    value(){
        let i = this.length;
		while(i-->1){
			let j = rndInt(i-1);
			this.swap(i,j);
		}
    },
});

const copyObj =(obj,obj2)=>{
	for(let key in obj2){
		let value = obj2[key];
		obj[key] = (typeof value==='object')&&value? JSON.parse(JSON.stringify(value)):value;
	}
}

const lightenProb =()=> !evalPercentage((rogue.cdl-1)*5);
const searchProb =()=> evalPercentage(10+rogue.searching);
const calcLevel =x=> (x-1)**4+10*(x-1);

const initTab =()=>{
	getRndName.init();
	for(let key in itemTab){
		if(key!=='potion'&&key!=='wand'&&key!=='scroll') continue;
		for(let item of itemTab[key].values()){
			item.identified = false;
			getRndName[key](item);
		}
	}
}

const initFlag =()=>{
	for(let key in flag)
		flag[key] = key==='regular';
}

const getRndName = {
	init(){
		this.countP = this.countW = 0;
		colorTab.shuffle();
		mineralTab.shuffle();
	},
	potion(item){
		item.color = colorTab[this.countP].color;
		let name = colorTab[this.countP++].name;
		item.name['a'] = name['a'];
		item.name['b'] = name['b'];
	},
	wand(item){
		item.color = mineralTab[this.countW].color;
		let name = mineralTab[this.countW++].name;
		item.name['a'] = name['a'];
		item.name['b'] = name['b'];
	},
	scroll(item){
		let msg = '';
		let l = EA.length;
		for(let i=0;i<3;i++){
			for(let j=0;j<3;j++)
				msg += EA[rndInt(l-1)];
			if(i!==2) msg += ' ';
		}
		item.name['a'] = item.name['b'] = `'${msg}'`;
	}
}

const dice = {
	get(dmgBase,numBonus=0,sidesBonus=0){
		let num = '';
		let sides = '';
		let i = 0;
		do{	num += dmgBase.charAt(i++);
		} while(dmgBase.charAt(i)!=='d');
		while(dmgBase.charAt(++i)!=='')
			sides += dmgBase.charAt(i);
		num = Number(num)+numBonus;
		sides = Number(sides)+sidesBonus;
		return {num, sides};
	},
	getAvg(){
		let {num, sides} = this.get(...arguments);
		return (1+sides)/2*num;
	},
	roll(){
		let {num, sides} = this.get(...arguments);
		let value = 0;
		if(sides===1)
			value = num;
		else{
			for(let i=0;i<num;i++)
				value += rndIntBet(1,sides);
		}
		return value;
	},
};

const distanceSq =(x1,y1,x0,y0)=>{
	let offsetX = 0;
	let offsetY = 0;
	if(x0!==x1) offsetX = x0<x1? -0.5:0.5;
	if(y0!==y1) offsetY = y0<y1? -0.5:0.5;
	return (x1+offsetX-x0)**2+(y1+offsetY-y0)**2;
}

const rndInt =(i)=> Math.floor(Math.random()*(i+1));//0~i
const rndIntBet =(i,j)=> Math.floor(Math.random()*(j-i+1))+i;//i~j
const coinToss =()=> Math.random()>=0.5;
const evalPercentage =(perc)=> perc/100>Math.random();
const getAlphabet =(keyCode)=> keyCode<65||keyCode>90? null:EA[keyCode-65];
const getNumber =(keyCode)=> keyCode<48||keyCode>57? null:keyCode-48;
const getAlphabetOrNumber =(keyCode)=>{
	let a = getAlphabet(keyCode);
	if(!a) a = getNumber(keyCode);
	return a;
}
const getUpperCase =(string)=> string.charAt(0).toUpperCase()+string.slice(1);
const getDirection =(keyCode)=>{
	let id;
	switch(keyCode){
		case 72: //h
		case 37: //left arrow
		case 100: //T4
			id = LEFT;
			break;
		case 74: //j
		case 40: //down arrow
		case 98: //T2
			id = DOWN;
			break;
		case 75: //k
		case 38: //up arrow
		case 104: //T8
			id = UP;
			break;
		case 76: //l
		case 39: //right arrow
		case 102: //T6
			id = RIGHT;
			break;
		case 89: //y
		case 103: //T7
			id = UPLEFT;
			break;
		case 66: //b
		case 97: //T1
			id = DOWNLEFT;
			break;
		case 85: //u
		case 105: //T9
			id = UPRIGHT;
			break;
		case 78: //n
		case 99: //T3
			id = DOWNRIGHT;
			break;
		default:
			return null;
	}
	return DR[id];
}

const getDirectionBetween =(x1,y1,x2,y2)=>{
	return x1>x2&&y1===y2? DR[LEFT]
		:x1===x2&&y1<y2? DR[DOWN]
		:x1===x2&&y1>y2? DR[UP]
		:x1<x2&&y1===y2? DR[RIGHT]
		:x1>x2&&y1>y2? DR[UPLEFT]
		:x1>x2&&y1<y2? DR[DOWNLEFT]
		:x1<x2&&y1>y2? DR[UPRIGHT]
		:x1<x2&&y1<y2? DR[DOWNRIGHT]
		:null;
}

const getNextDirection =(dr,ccw)=>{ //counterclockwise
	let id;
	switch(dr.id){
		case LEFT:
			id = ccw? DOWNLEFT:UPLEFT;
			break;
		case DOWNLEFT:
			id = ccw? DOWN:LEFT;
			break;
		case DOWN:
			id = ccw? DOWNRIGHT:DOWNLEFT;
			break;
		case DOWNRIGHT:
			id = ccw? RIGHT:DOWN;
			break;
		case RIGHT:
			id = ccw? UPRIGHT:DOWNRIGHT;
			break;
		case UPRIGHT:
			id = ccw? UP:RIGHT;
			break;
		case UP:
			id = ccw? UPLEFT:UPRIGHT;
			break;
		case UPLEFT:
			id = ccw? LEFT:UP;
			break;
		default:
			return null;
	}
	return DR[id];
}

const deleteAndSortItem =(list,a)=>{
	let i = EA.indexOf(a);
	let j = Object.keys(list).length-1-i;
	for(let k=0;k<j;k++)
		list[EA[i]] = list[EA[++i]];
	delete list[EA[i]];
}

const Position = class{
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
	}
}
