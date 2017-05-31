'use strict';
let wizard = 0;
const ud = undefined;
const generateNumber = function*(i,j,bit){
	while(i<=j) yield bit? 1<<i++:i++;
}
const enums =(i,j)=> [...generateNumber(i,j)];
const enumsBit =(i,j)=> [...generateNumber(i,j,true)];
const VERSION = 0.0;
const MS = 2; //message space
const SS = 3; //stats space
const IN_WIDTH = 47; //canvas.width/fs-1;
const IN_HEIGHT = 24; //canvas.height/fs-SS;
const WIDTH = IN_WIDTH*2;
const HEIGHT = IN_HEIGHT*2;
const CAVE_NUM_ROW = 4;
const CAVE_NUM_COL = 5;
const CAVE_NUM_MAX = CAVE_NUM_COL*CAVE_NUM_ROW;
const CAVE_HEIGHT_MAX = Math.floor((HEIGHT-(CAVE_NUM_ROW-1))/CAVE_NUM_ROW); 
const CAVE_WIDTH_MAX = Math.floor((WIDTH-(CAVE_NUM_COL-1))/CAVE_NUM_COL);
const CAVE_WIDTH_MIN = 4;
const CAVE_HEIGHT_MIN = 4;
const BUILD_NUM_ROW = 2;
const BUILD_NUM_COL = 4;
const BUILD_NUM_MAX = BUILD_NUM_COL*BUILD_NUM_ROW;
const BUILD_WIDTH = Math.floor(((IN_WIDTH-1)/2-2-BUILD_NUM_COL)/(BUILD_NUM_COL/2));
const BUILD_HEIGHT = Math.floor(((IN_HEIGHT-1)/2-2-BUILD_NUM_ROW)/(BUILD_NUM_ROW/2));
const MIN_TRAP_NUM = 8;
const MAX_TRAP_NUM = 10;
const MIN_STAIRS_NUM = 4;
const MAX_STAIRS_NUM = 6;
const MAX_PACK_COUNT = 20;
const MAX_STASH_COUNT = MAX_PACK_COUNT*4;
const MAX_STASH_PAGE = MAX_STASH_COUNT/MAX_PACK_COUNT;
const MAX_CUBE_COUNT = 4;
const MAX_HUNGER = 1000;
const HUNGER_POTION = 50;
const MAX_EQUIPMENT_NUM = 12;
const MAX_BOOKMARK_NUM = 13;
const MAX_FIGHTER_LVL = 99;
const MAX_STAT_LVL = 100;
const MAX_SKILL_NUM = 20;
const MAX_SKILL_LVL = 20;
const MAX_SEARCH_RANGE = 10;
const MAX_PF_LOOP = 10000;
const MAX_BOX_NUM = 9;
const RARE_MOD_NUM = 2;
const SPAWN_FREQ = 100;
const CURSE_PERC = 5;
const FOV = 15;
const FOV_SQ = FOV**2;
const HEARING_SQ = 20**2;
const MIN_TELE_RAD_SQ = 15**2;
const SENSING_SQ = IN_HEIGHT**2;
const MAX_MSG_LEN = 5;
const MAX_MSG_LIST_LEN = 1000;
const ENG = 'a';
const DEFAULT = -1;
const ROGUE = -1;
const RANDOM = -1;
const [P_PACK, P_BOX, P_FLOOR, P_EQUIPMENT, P_STASH, P_SHOP, P_CUBE] = enums(2,8); //place
const [AROUND, LOCATION, LIST, AWAY, INIT] = enums(1,5);
const [NORMAL, MAGIC, RARE, UNIQUE] = enums(0,3);
const [UPPER, ELITE] = enums(1,2);
const [FIGHTER, ITEM, TRAP, STAIRCASE, ENTER] = enums(1,5);
const [PREFIX, SUFFIX] = enums(0,1);
const [CLOSE, OPEN] = enums(1,2); 
const [STR, DEX, CON,INT,EXP] = enums(0,4);
const [HUMAN,ANIMAL,DEMON,UNDEAD,DRAGON,GIANT,SPIRIT] = enumsBit(1,6);
const [AT_S, AT_T, AT_B] = enumsBit(1,3); //attack type, slash, thrust, blunt
const [LEFT, DOWN, UP, RIGHT, UPLEFT, DOWNLEFT,UPRIGHT, DOWNRIGHT, MIDDLE] = enums(0,8); 
const DR=[{x:-1,y:0,id:LEFT},{x:0,y:1,id:DOWN},{x:0,y:-1,id:UP},{x:1,y:0,id:RIGHT},
	{x:-1,y:-1,id:UPLEFT},{x:-1,y:1,id:DOWNLEFT},{x:1,y:-1,id:UPRIGHT},{x:1,y:1,id:DOWNRIGHT}]; //direction
const EA=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; //english alphabet 26
const BP={a:'main',b:'off',c:'neck',d:'R-ring',e:'L-ring',f:'light',g:'body',h:'back',i:'waist',j:'head',k:'hands',l:'feet'}; //body parts
const BPJ={main:'メイン',off:'オフ',neck:'首','R-ring':'右指輪','L-ring':'左指輪',light:'光源',body:'体'
	,back:'背中',waist:'腰',head:'頭',hands:'手',feet:'足'};
const ITJ={book:'書',food:'食料',potion:'薬',scroll:'巻物',wand:'棒',melee:'近接武器',missile:'遠隔武器',staff:'杖',shield:'盾',armor:'鎧',
	cloak:'外衣',belt:'ベルト',helm:'兜',gloves:'手袋',boots:'靴',light:'光源',oil:'油',amulet:'首飾り',ring:'指輪',ammo:'弾薬',
	gem:'ジェム',coin:'コイン',misc:'雑多品',water:'水',recipe:'レシピ','Charge Book':'充填書',corpse:'死体'};
const ENJ={fire:'火',water:'水',air:'風',earth:'土',poison:'毒',light:'光',cold:'氷',lightning:'電',gravity:'重力',
	infection:'感染',blizzard:'吹雪',sand:'砂',acid:'酸',magma:'溶岩',radiation:'放射線',atom:'原子',physical:'物理',
	};
const WEIGHT={'ring':0.1,'amulet':0.2,'book':1.0,'potion':0.2,'scroll':0.1,'wand':0.5,'gem':0.1,'coin':0.1,'food':0.3};
const PRICE={'potion':50,'scroll':50,'wand':100,'melee':100,'missile':100,'staff':100,'shield':50
	,'armor':100,'cloak':50,'belt':50,'helm':50,'gloves':50,'boots':50,'ring':50,'amulet':100,light:50,gem:200};
const RARITY={book:70,food:50,potion:0,scroll:0,wand:50,melee:0,missile:20,staff:20,shield:50,
	armor:50,cloak:50,belt:50,helm:50,gloves:50,boots:50,light:50,ring:80,amulet:80,
	oil:50,ammo:50,coin:0,gem:90,};
const equipmentList=['melee','missile','staff','shield','armor','cloak',
	'belt','helm','gloves','boots','light','ring','amulet'];
const DURAB_BASE = 20;
const DURAB_RATE = 10;
const DURAB_PRICE = 10;
const WAND_PRICE = 0.2; //per charge
const COST_REGULAR = 10;
const COLD_DELAY = 10;
const WAIT_TIME = 0;
const MSG_SPEED = 3000;
const BREATH_RATE = 1/10;
const NEST_BOOST = 5;
const MAGIC_RARITY = 50;
const BIAS_BONUS = 50;
const HP_RATE = 6;
const MP_RATE = 3;
const WALL_HP = 100;
const POSITION ={
	stash:{x:22,y:18},
	start:{x:22,y:11},
	hell:{x:40,y:11},
};
const CL={ //command list
	h:{a:'move left',b:'左移動'},j:{a:'move down',b:'下移動'},k:{a:'move up',b:'上移動'},l:{a:'move right',b:'右移動'},
	y:{a:'move upleft',b:'左上移動'},b:{a:'move downleft',b:'左下移動'},u:{a:'move upright',b:'右上移動'},n:{a:'move downright',b:'右下移動'}, 
	i:{a:'inventory list',b:'持物一覧'},e:{a:'equipment list',b:'装備一覧'},w:{a:'wear or wield',b:'装備する'},T:{a:'take off or unwield',b:'装備を外す'},
	g:{a:'grab item',b:'アイテムを拾う'},d:{a:'drop item',b:'アイテムを落とす'},o:{a:'open door',b:'ドアを開ける'},c:{a:'close door',b:'ドアを閉める'},
	s:{a:'search',b:'捜索する'},r:{a:'read scroll',b:'巻物を読む'},q:{a:'quaff potion',b:'薬を飲む'},z:{a:'zap wand',b:'棒を振る'},
	p:{a:'pack item',b:'アイテムを詰める'},E:{a:'eat food',b:'食事する'},Q:{a:'quit',b:'ゲームを放棄する'},Esc:{a:'cancel command',b:'取り消す'},
	x:{a:'examine things',b:'探査する'},a:{a:'add bookmark',b:'しおりを挟む'},G:{a:'gain stat/skill',b:'スキル/能力値を得る'},
	t:{a:'throw',b:'射る'},S:{a:'swap gear',b:'装備を持ち替える'},C:{a:'character description',b:'キャラ詳細'},F:{a:'fuel',b:'補給する'},
	R:{a:'Rest',b:'休む'},'A':{a:'alchemy',b:'錬金術'},
	'1-9':{a:'use item',b:'アイテムを使う'},'m,F1-F12':{a:'use skill',b:'スキルを使う'},
	'Alt+dir':{a:'attack stationary/dig',b:'その場で攻撃する/掘る'},'Shift+dir':{a:'dash',b:'走る'},'.':{a:'stap on',b:'踏む'},
	'>':{a:'down stairs',b:'階段を降りる'},'<':{a:'up stairs',b:'階段を昇る'},'=':{a:'option',b:'オプション'},'Ctrl+p':{a:'previous message',b:'メッセージ履歴'},
	'Ctrl+r':{a:'redraw',b:'再描写'},'Ctrl+m':{a:'mute',b:'消音'},'Ctrl+s':{a:'save',b:'記録する'},'Ctrl+d':{a:'destroy item',b:'アイテムを破壊する'},
	'Ctrl+x':{a:'save and exit',b:'記録して終了する'},
};
const CLW={ //wizard
	'Ctrl+e':{a:'*enlightenment*',b:'*啓蒙*'},'Ctrl+z':{a:'*indestructible*',b:'*破壊不能*'},'Ctrl+q':{a:'*create trap*',b:'*罠を生成する*'},
	'Ctrl+a':{a:'*create monster*',b:'*モンスターを生成する*'},'Ctrl+i':{a:'*create item*',b:'*アイテムを生成する*'},
};
//color
const CLEAR='rgba(0, 0, 0, 0)',SHADOW='#848484',SHADOW2='#333333',BLACK='black',
	DARKOLIVEGREEN='darkolivegreen',FIREBRICK='firebrick',TURQUOISE='turquoise',
	//potion
	RED='red',YELLOW='yellow',WHITE='white',
	SKY_BLUE='#0099FF',AQUA='aqua',BLUE='blue',PURPLE='purple',GREEN='green',BROWN='brown',
	GRAY='gray',PINK='pink',SILVER='silver',GOLD='gold',INDIGO='indigo',ORANGE='orange',VIOLET='violet',
	CRIMSON='crimson',LIME='lime',LIGHTGREEN='lightgreen',CORAL='coral',YELLOWGREEN='yellowgreen',
	OLIVE='olive',AZURE='azure',BLUEVIOLET='blueviolet',DARKVIOLET='darkviolet',DARKRED='darkred',
	LIGHTBLUE='lightblue',DEEPPINK='deeppink',LIGHTGREY='lightgrey',DARKGRAY='darkgray',
	DARKGREEN='darkgreen',ORANGERED='orangered',LAVENDER='lavender',LIGHTYELLOW='lightyellow',
	CYAN='cyan',NAVY='navy',PALEGREEN='palegreen',SCARLET='#d3381c',ROYALBLUE='#4169e1',
	AQUAMARINE='aquamarine',SANDYBROWN='sandybrown',LIGHTSEAGREEN='lightseagreen',LIMEGREEN='limegreen',
	DEEPSKYBLUE='deepskyblue',DARKORANGE='darkorange',
	//material
	//skin
	C_FLAX='#d6c6af',C_BEIGE='#eedcb3',C_BEIGE_GRAY='#b4ada9',C_GOLDEN_YELLOW='#f6ae54',C_FOX='#c38743',
	C_TEAL='#008080',
	//metal
	BRONZE='#7A592F',BRASS='#b5a642',STEEL='#6C676E',TIN='#9ea1a3',C_COPPER='#b87333',
	C_IRON='#cbcdcd',C_PLATINUM='#e5e4e2',C_TITANIUM='#B6AFA9',C_ZINC='#bac4c8',C_CADMIUM='#fff600',
	C_CHROME='#e3dedb',C_ALUMINIUM='#848789',C_CARBON='#252626',C_MAGNESIUM='#E9EEEB',C_COBALT='#0068b7',
	C_NICKEL='#b5b6b5',
	//wood
	C_MAHOGANY='#6b3f31',C_ROSEWOOD='#65000b',C_EBONY='#242E35',C_ASH='#efe5d1',C_WALNUT='#443028',
	C_CYPRESS='#bcad8c',C_OAK='#806517',C_BEECH='#c5c993',C_TEAK='#AE8F60'
	;
const C_FIRE=RED,C_WATER=AQUAMARINE,C_AIR=TURQUOISE,C_EARTH=BROWN,C_POISON=GREEN,
	C_LIGHT=WHITE,C_COLD=BLUE,C_LIGHTNING=YELLOW,C_GRAVITY=SHADOW,C_INFECTION=DARKOLIVEGREEN,
	C_SAND=SANDYBROWN,C_BLIZZARD=VIOLET,C_ACID=OLIVE,C_MAGMA=FIREBRICK,C_RADIATION=DARKORANGE,
	C_ATOM=SHADOW2,C_BUFF=SKY_BLUE;
const colorTab = [ //potion
	{name:{a:'Blue',b:'青色'},color:BLUE},{name:{a:'Red',b:'赤色'},color:RED},{name:{a:'Green',b:'緑色'},color:GREEN},
	{name:{a:'Gray',b:'灰色'},color:GRAY},{name:{a:'Brown',b:'茶色'},color:BROWN},{name:{a:'Pink',b:'桃色'},color:PINK},
	{name:{a:'White',b:'白色'},color:WHITE},{name:{a:'Purple',b:'紫色'},color:PURPLE},{name:{a:'Yellow',b:'黄色'},color:YELLOW},
	{name:{a:'Orange',b:'橙色'},color:ORANGE},{name:{a:'Silver',b:'銀色'},color:SILVER},{name:{a:'Gold',b:'金色'},color:GOLD},
	{name:{a:'Violet',b:'すみれ色'},color:VIOLET},{name:{a:'Sky blue',b:'空色'},color:SKY_BLUE},{name:{a:'Aqua',b:'水色'},color:AQUA},
	{name:{a:'Indigo',b:'藍色'},color:INDIGO},{name:{a:'Crimson',b:'紅色'},color:CRIMSON},{name:{a:'Lime',b:'ライム色'},color:LIME},
	{name:{a:'Lightgreen',b:'淡緑色'},color:LIGHTGREEN},{name:{a:'Coral',b:'珊瑚色'},color:CORAL},{name:{a:'Yellowgreen',b:'黃緑色'},color:YELLOWGREEN},
	{name:{a:'Deeppink',b:'深桃色'},color:DEEPPINK},{name:{a:'Olive',b:'オリーブ色'},color:OLIVE},{name:{a:'Azure',b:'紺碧色'},color:AZURE},
	{name:{a:'Blueviolet',b:'青紫色'},color:BLUEVIOLET},{name:{a:'Darkviolet',b:'暗紫色'},color:DARKVIOLET},{name:{a:'Darkred',b:'暗赤色'},color:DARKRED},
	{name:{a:'Lightblue',b:'淡青色'},color:LIGHTBLUE},{name:{a:'Lightgrey',b:'薄灰色'},color:LIGHTGREY},{name:{a:'Darkgray',b:'濃灰色'},color:DARKGRAY},
	{name:{a:'Darkgreen',b:'暗緑色'},color:DARKGREEN},{name:{a:'Orangered',b:'橙赤色'},color:ORANGERED},{name:{a:'Lavender',b:'藤色'},color:LAVENDER},
	{name:{a:'Cyan',b:'青緑色'},color:CYAN},{name:{a:'Lightyellow',b:'淡黄色'},color:LIGHTYELLOW},{name:{a:'Navy',b:'紺色'},color:NAVY},
	{name:{a:'Palegreen',b:'薄緑色'},color:PALEGREEN},{name:{a:'Scarlet',b:'緋色'},color:SCARLET},{name:{a:'Royalblue',b:'藤紫色'},color:ROYALBLUE},
	{name:{a:'Aquamarine',b:'淡青緑色'},color:AQUAMARINE},{name:{a:'Sandybrown',b:'砂茶色'},color:SANDYBROWN},{name:{a:'Lightseagreen',b:'淡海緑色'},color:LIGHTSEAGREEN},
	{name:{a:'Limegreen',b:'ライムグリーン色'},color:LIMEGREEN},{name:{a:'Deepskyblue',b:'深空色'},color:DEEPSKYBLUE},{name:{a:'Darkorange',b:'暗橙色'},color:DARKORANGE},
];

const stairsMap = new Map([
	[DOWN,{name:{a:'down staircase',b:'下り階段'},symbol:'>',color:WHITE,id:DOWN}],
	[UP,{name:{a:'up staircase',b:'上り階段'},symbol:'<',color:WHITE,id:UP}],
]);

const canvasIds = ['buf','main','cur','msg','stats','map','inv'];
const canvas = {};
const ctxes = {};
{	
	let parent = document.getElementById('container');
	parent.innerHTML = '';
	for(let i=0,l=canvasIds.length;i<l;i++){
		let id = canvasIds[i];
		let child =  document.createElement('canvas');
		canvas[id] = child;
		ctxes[id] = child.getContext('2d');
		if(id==='buf') continue;
		child.style.position = 'absolute';
		child.style.left = 0;
		child.style.top = 0;
		child.style['z-index'] = i;
		parent.appendChild(child);
	}
}

let ctxBuf = ctxes.buf;
let ctxMain = ctxes.main;
let ctxCur = ctxes.cur;
let ctxStats = ctxes.stats;
let ctxMap = ctxes.map;
let ctsInv = ctxes.inv;
let ctxMsg = ctxes.msg;
let fs = 0; //font size
let rogue;
let queue;
let coords; //coords[][]
let litMapIds = {};
let ca = ''; //current alphabet
let cn = 1; //current number
let ci = null; //current item
let cs = ''; //current skill
let isShift = false;
let isCtrl = false;

const display={
	list:{
		a:{width:640,height:360,fs:13},
		b:{width:768,height:432,fs:16},
	},
	change(a,draw){
		let list = this.list[a];
		container.style.width = list.width+'px';
		container.style.height = list.height+'px';
		canvas.width = list.width;
		canvas.height = list.height;
		fs = list.fs;
		minimap.fs = fs/2;
		for(let key in canvas){
			if(key==='width'||key==='height') continue;
			let cvs = canvas[key];
			let times = key==='buf'? 2:1;
			cvs.setAttribute('width',list.width*times);
			cvs.setAttribute('height',list.height*times);
		}
		for(let key in ctxes){
			let ctx = ctxes[key];
			if(key==='main') continue;
			ctx.textBaseline ='middle';
			ctx.lineJoin = 'round';
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;
			ctx.fillStyle = WHITE;
			if(key==='cur'){
				ctx.font = fs+6+'px Arial';
				ctx.strokeStyle = YELLOW;
			} else if(key==='map')
				ctx.font = '10px Arial';
			else
				ctx.font = fs+'px Arial';
			if(key==='buf')
				ctx.shadowColor = !option.shadow.user? CLEAR:SHADOW2;
			else
				ctx.shadowColor = key==='cur'||key==='map'? SHADOW2:SHADOW;
			ctx.textAlign = key==='stats'||key==='inv'||key==='msg'? 'left':'center';
		}
		textLen.init();
		if(draw){
			map.redraw(rogue.x,rogue.y);
			map.draw(rogue.x,rogue.y);
			rogue.drawStats();
		}
	},
};

const option = {
	list:{a:{a:'language',b:'言語'},b:{a:'display',b:'解像度'},
		c:{a:'shadow',b:'影'},d:{a:'mute',b:'消音'},e:{a:'BGM',b:'BGM'},
		f:{a:'SE',b:'効果音'},g:{a:'autosave',b:'自動記録'},h:{a:'auto-destroy',b:'自動破壊'},
		i:{a:'auto-charge',b:'自動充填'},j:{a:'auto-identify',b:'自動識別'}
		},
	display:{defaults:'b',choise:{}},
	shadow:{defaults:false},
	mute:{defaults:false},
	autosave:{defaults:true},
	language:{defaults:'b',choise:{a:{a:'English',b:'英語'},b:{a:'Japanese',b:'日本語'}}},
	'auto-destroy':{defaults:false},
	'auto-charge':{defaults:true},
	'auto-identify':{defaults:true},
	BGM:{defaults:'k',choise:{}},
	SE:{defaults:'k',choise:{}},
	main(keyCode){
		let list = !flag.option2? this.list:this[this.name].choise;
		if(keyCode<65||keyCode>=Object.keys(list).length+65) return;
		let a = getAlphabet(keyCode);
		if(!flag.option2) this.name = this.list[a]['a'];
		if(this.name==='display'||this.name==='language'
		||this.name==='BGM'||this.name==='SE'){
			if(!flag.option2){
				this.choose(a);
				return;
			} else if(a===this[this.name].user)
				return;
			else if(this.name==='display'){
				this[this.name].user = a;
				display.change(a,true);
			} else if(this.name==='language'){
				this[this.name].user = rogue.cl = a;
				rogue.drawStats();
			} else if(this.name==='BGM'||this.name==='SE'){
				this[this.name].user = a;
				let vol = (keyCode-65)/10;
				if(this.name==='BGM'){
					audio.volBGM = vol
					audio.music[audio.curTrack].volume = vol;
				}else
					audio.volSE = vol;
			}
			flag.option2 = false; 
		} else if(this.name==='shadow'){
			this[this.name].user = !this[this.name].user;
			ctxBuf.shadowColor = this[this.name].user? SHADOW2:CLEAR;
			map.redraw(rogue.x,rogue.y);
			map.draw(rogue.x,rogue.y);
		} else if(this.name==='mute'){
			audio.mute();
		} else if(this.name==='autosave'||this.name==='auto-identify'
		||this.name==='auto-destroy'||this.name==='auto-charge'){
			this[this.name].user = !this[this.name].user;
		} 
		inventory.clear();
		inventory.show(this.list,RIGHT);
		message.draw(message.get(M_OPTION),true);
	},
	choose(a){
		inventory.clear();
		inventory.show(this.list,RIGHT,a);
		flag.option2 = true;
		inventory.show(this[this.name].choise,LEFT);
		message.draw(message.get(M_OPTION),true);
	}
};
{
	for(let key in option.list){
		let key2 = option.list[key]['a'];
		option[key2].user = option[key2].defaults;
		if(key2==='BGM'||key2==='SE'){
			for(let i=0;i<=10;i++)
				option[key2].choise[EA[i]] = {a:i,b:i};
		}
	}
	let choise = option.display.choise;
	for(let key in display.list){
		let size = display.list[key];
		choise[key] = {};
		choise[key]['a'] = choise[key]['b'] = size.width+' x '+size.height;
	}
}

const textLen ={
	list:{full:'満腹',hungry:'空腹',starved:'飢餓',poisoned:'毒',confused:'混乱',paralyzed:'麻痺',
		sleeping:'睡眠',blinded:'盲目',infected:'感染',hallucinated:'幻覚',canceled:'封印',
		'see invisible':'透視',invisible:'透明',ecco:'エコー','enchant self':'自己強化',
		'venom hands':'猛毒の手','confusing hands':'混乱の手'},
	init(){
		for(let key in this.list){
			this[key] = {};
			this[key].a = ctxStats.measureText(key).width+fs;
			this[key].b = ctxStats.measureText(this.list[key]).width+fs;
		}
	},
};

const PORTAL = 0, STASH = 1,GAMBLE = 9, CURE = 10, BLACKSMITH = 11;
const enter = [
	{id:0,name:{a:'Portal',b:'ポータル'},symbol:'＊',color:WHITE,stroke:SKY_BLUE,portal:true},
	{id:1,name:{a:'Stash',b:'物置箱'},symbol:'&',color:BROWN,page:1,stash:true},
	{id:2,name:{a:'Book Shop',b:'魔法書店'},symbol:'?',color:GRAY,type:{'book':10},shop:true},
	{id:3,name:{a:'General Shop',b:'雑貨屋'},symbol:':',color:BROWN,type:{'food':2,'light':6,'oil':2,},shop:true},
	{id:4,name:{a:'Potion Shop',b:'薬屋'},symbol:'!',color:BLUE,type:{'potion':15},shop:true},
	{id:5,name:{a:'Scroll Shop',b:'巻物店'},symbol:'?',color:WHITE,type:{'scroll':15},shop:true},
	{id:6,name:{a:'Wand Shop',b:'魔法棒店'},symbol:'-',color:WHITE,type:{'wand':10},shop:true},
	{id:7,name:{a:'Weapon Shop',b:'武器屋'},symbol:'|',color:WHITE,type:{'melee':8,'missile':3,'staff':2,'ammo':6},shop:true,equipment:true},
	{id:8,name:{a:'Armor Shop',b:'防具屋'},symbol:'[',color:GRAY,type:{'shield':2,'armor':3,'cloak':2,'belt':2,'helm':2,'gloves':2,'boots':2},shop:true,equipment:true},
	{id:9,name:{a:'Gamble Shop',b:'ギャンブル店'},symbol:'$',color:YELLOW,gamble:true,shop:true},
	{id:10,name:{a:'Cure Shop',b:'治療店'},symbol:'+',color:LIME,cure:true,list:{
			a:{a:'recover completely',b:'全快する',cost:400},
			b:{a:'restore health and mana',b:'体力と魔力を回復する',cost:100},
			c:{a:'restore stats',b:'能力値を元に戻す',cost:100},
			d:{a:'restore condition',b:'状態異常を元に戻す',cost:100},
			e:{a:'have a meal',b:'食事をとる',cost:100}}},
	{id:11,name:{a:'Blacksmith Shop',b:'鍛冶屋'},symbol:'/',color:GRAY,blacksmith:true},
];

const initShopItem =()=>{
	for(let value of enter)
		if(value.shop) value.list = {};
}
const createShopItem =(shop)=>{
	let k = 0;
	if(shop.gamble){
		for(let i=0;i<10;i++)
			shop.list[EA[k++]] = creation.item(1,RANDOM,RANDOM,1,LIST);
		return;
	}
	for(let type in shop.type){
		let max = shop.type[type];
		let j = 0;
		let count = 0;
		let itemNums = itemNumsMap.get(type);
		itemNums.shuffle();
		do{
			let item,tabId;
			do{
				tabId = itemNums[j++];
				item = itemTab[type].get(tabId);
			} while(item&&!item.shop)
			if(!item){
				j = 0;
				itemNums.shuffle();
				continue;
			}
			let quantity = item.equipable? 1:rndIntBet(10,99);
			shop.list[EA[k]] = creation.item(1,type,tabId,quantity,LIST);
			inventory.sort(EA[k++],shop.list);
			if(k===MAX_PACK_COUNT) return;
			count++;
		} while(count<max);
	}
}

const difficulty = {
	init(){
		this.inferno = this.purgatorio = this.paradiso = false;
	}
};

const flag = {
	died:true,
	regular:false,
	arrow: false,
	scroll: false,
	wait:false,
	openDoor:false,
	closeDoor:false,
	retry:false,
	inventory:false,
	drop:false,
	destroy: false,
	equip:false,
	unequip:false,
	equipmentList:false,
	eat:false,
	quaff:false,
	read:false,
	synthesize:false,
	grab:false,
	zap:false,
	aim:false,
	investigate:false,
	message:false,
	identify:false,
	repair: false,
	help:false,
	create:false,
	dash:false,
	pack:false,
	number:false,
	clearInv:false,
	examine: false,
	skill: false,
	sortSkill: false,
	bookmark: false,
	gain: false,
	minimap: false,
	shop: false,
	gamble: false,
	stash: false,
	wormhole: false,
	disint: false,
	fuel: false,
	option: false,
	option2: false,
	quit: false,
	cure: false,
	blacksmith: false,
	floor: false,
};
//message
const [M_DESTROY,M_CANT_DESTROY,M_NUMBER,M_PACK,M_FLOOR,
	M_READ,M_CANT_READ_SCROLL,M_CANT_READ_BOOK,M_CANT_TELE,M_IDENTIFY,
	M_DISINTEGRATION,M_REPAIR,M_DONT_HAVE_MISSILE,M_DONT_HAVE_AMMO,M_ZAP,
	M_TO_EXAMINE,M_ZAP_DIR,M_CANT_EXAMINE,M_NOTHING_HAPPENED,M_QUAFF,
	M_EAT,M_DROP,M_CANT_CARRY,M_GRAB,M_EQUIP,M_TWO_HANDED,
	M_FUEL,M_DONT_EQUIP_LIGHT,M_INVESTIGATE,M_CANT_ADD,M_SYNTHESIZE,
	M_DONT_HAVE_RECIPES,M_PACK_OR_UNPACK,M_PACK_INTO,M_CANT_SELL,M_DONT_HAVE_MONEY,
	M_SHOP,M_STASH,M_EXAMINE,M_BLACKSMITH,M_CURE,M_MINIMAP,
	M_SORT_SKILL,M_SORT_SKILL2,M_CANT_GAIN_SKILL,M_CANT_GAIN_STAT,
	M_GAIN,M_BOOKMARK,M_BOOKMARK2,M_CAST,M_CAST_DIR,
	M_DONT_HAVE_SKILL,M_CANT_CAST,M_DONT_HAVE_BOOK,M_DONT_HAVE_MANA,
	M_DONT_HAVE_MELEE,M_EXAMINE_W,M_GAIN_SKILL,M_OPTION,M_PREVIOUS,
	M_STUCK,M_DIED,M_RECOVER_ALL,M_FLOAT,M_LIGHT_GONE,
	M_STARVED,M_OPEN_OR_CLOSE,M_DONT_HAVE_EQUIPMENT,M_TAKE_OFF,M_FIRE,
	M_ASK_TO_QUIT,M_QUIT,M_INTERRUPTED,
	] = enums(1,80);
const msgMap = new Map([
	[M_NUMBER,  {a:'[0-9] then [Enter] or [a] for all: ',
				 b:'[0-9] 数値 [Enter] 決定 [a] すべて: '}],
	[M_PACK,  {a:' [,] for stuff',
			   b:' [,] 持物'}],
	[M_FLOOR,  {a:' [.] for floor',
				b:' [.] 床'}],
	[M_TO_EXAMINE,{a:' [x] to examine',
				   b:' [x] 探査'}],
	[M_EXAMINE_W,{a:' [e] to equipment [i] for inventory',
				   b:' [e] 装備 [i] 持物'}],
	[M_CANT_DESTROY,{a:'You can\'t destroy it',
					 b:'それを壊す事は出来ない'}],
	[M_CANT_READ_SCROLL,{a:'You can\'t read any scrolls',
						 b:'巻物を読む事が出来ない'}],
	[M_CANT_READ_BOOK,{a:'You can\'t read any books',
					   b:'本を読む事が出来ない'}],
	[M_CANT_TELE,{a:'You can\'t teleport there',
				  b:'そこへテレポートする事は出来ない'}],
	[M_CANT_EXAMINE,{a:'You can\'t examine',
					 b:'探査出来ない'}],
	[M_CANT_CARRY,{a:'You can\'t carry anymore',
				   b:'もう持つことが出来ない'}],
	[M_CANT_ADD,{a:'You can\'t add them anymore',
				   b:'これ以上詰め込めない'}],
	[M_CANT_SELL,{a:'You can\'t sell anymore',
				   b:'これ以上売却出来ない'}],
	[M_CANT_GAIN_SKILL,{a:'You can\'t gain any skills',
				   b:'スキルを習得出来ない'}],
	[M_CANT_GAIN_STAT,{a:'You can\'t gain any stats',
				   b:'能力値を習得出来ない'}],
	[M_CANT_CAST,{a:'You can\'t cast any skills',
				   b:'スキルを行使出来ない'}],
				   
				   
	[M_DONT_HAVE_MISSILE,{a:'You have nothing to fire with',
						  b:'遠隔武器を持っていない'}],
	[M_DONT_HAVE_AMMO,{a:'You have no ammunition to fire',
					   b:'弾薬を持っていない'}],
	[M_DONT_EQUIP_LIGHT,{a:'You don\'t equip any light sources',
					   b:'光源を身に付けていない'}],
	[M_DONT_HAVE_RECIPES,{a:'You don\'t have any recipes to synthesize',
					      b:'合成するためのレシピを持っていない'}],
	[M_DONT_HAVE_MONEY,{a:'You don\'t have enough money',
					      b:'金額が足りない'}],
	[M_DONT_HAVE_SKILL,{a:'You don\'t have any skills to cast',
					    b:'行使するスキルを覚えていない'}],
	[M_DONT_HAVE_BOOK,{a:'You don\'t have any books to cast',
					    b:'行使するための魔法書を持っていない'}],
	[M_DONT_HAVE_MANA,{a:'You don\'t have enough mana to cast',
					    b:'行使するためのマナが足りない'}],
	[M_DONT_HAVE_MELEE,{a:'You have nothing to combat with',
					    b:'近接武器を持っていない'}],
	[M_DONT_HAVE_EQUIPMENT,{a:'You have nothing to take off or unwield',
							b:'何も身に着けていない'}],
			
	
	[M_INTERRUPTED, {a:'Interrupted',
					 b:'中断した'}],
	[M_ASK_TO_QUIT, {a:'Are you sure you want to quit?',
					 b:'本当にゲームを放棄しますか?'}],
	[M_STARVED, {a:'You are starved',
				 b:'飢餓状態に陥った'}],
	[M_LIGHT_GONE, {a:'Your light has gone out',
					b:'灯火が消え去った'}],
	[M_FLOAT, {a:'You\'re floating in the air',
			   b:'空中に浮かんだ'}],
	[M_RECOVER_ALL, {a:'You recovered completely',
					 b:'全快した'}],
	[M_DIED, {a:'You died',
			  b:'死亡した'}],
	[M_STUCK, {a:'You are still stuck',
				  b:'まだ動けない'}],
	[M_TWO_HANDED,{a:'You are using both hands already',
				   b:'既に両手を使っている'}],
	[M_NOTHING_HAPPENED,{a:'Nothing happened',
					     b:'何も起こらなかった'}],
	[M_DESTROY,	{a:'[a-Z] [1-9] to destroy',
				 b:'[a-Z] [1-9] 破壊'}],
	[M_READ, {a:'[a-Z] [1-9] to read',
			  b:'[a-Z] [1-9] 読み上げ'}],
	[M_IDENTIFY, {a:'[a-Z] [1-9] to identify',
			  b:'[a-Z] [1-9] 識別'}],
	[M_DISINTEGRATION, {a:'[a-Z] symbol to disintegrate',
						b:'[a-Z] シンボルを分解'}],
	[M_REPAIR, {a:'[a-Z] [1-9] to repair',
				b:'[a-Z] [1-9] 修復'}],
	[M_ZAP, {a:'[a-Z] [1-9] to zap',
			 b:'[a-Z] [1-9] 振り下ろし'}],
	[M_ZAP_DIR, {a:'[direction] [.] to zap',
				b:'[方向] [.] 振り下ろし'}],
	[M_QUAFF, {a:'[a-Z] [1-9] to quaff',
			 b:'[a-Z] [1-9] 飲用'}],
	[M_EAT, {a:'[a-Z] [1-9] to eat',
			 b:'[a-Z] [1-9] 食事'}],
	[M_DROP, {a:'[a-Z] [1-9] to drop',
			 b:'[a-Z] [1-9] 床置き'}],
	[M_GRAB, {a:'[a-Z] to grab',
			 b:'[a-Z] 拾う'}],
	[M_EQUIP, {a:'[a-Z] [1-9] to wear or wield',
			   b:'[a-Z] [1-9] 装備'}],
	[M_FUEL, {a:'[a-Z] [1-9] to fuel',
			  b:'[a-Z] [1-9] 補給'}],
	[M_INVESTIGATE, {a:'[a-Z] [1-9] to investigate',
			         b:'[a-Z] [1-9] 調査'}],
	[M_SYNTHESIZE, {a:'[a-z] [1-9] to choose [A-Z] to remove [Enter] to synthesize',
			        b:'[a-z] [1-9] 選択 [A-Z] 除外 [Enter] 合成'}],
	[M_PACK_OR_UNPACK, {a:'[a-z] to pack [1-9] to unpack',
						b:'[a-z] 荷詰め  [1-9] 荷解き'}],
	[M_PACK_INTO, {a:'[1-9] to pack into',
				   b:'[1-9] 荷詰め箇所'}],
	[M_SHOP, {a:'[A-Z] to buy [a-z] to sell',
			  b:'[A-Z] 購入 [a-z] 売却'}],
	[M_STASH, {a:'[a-z] to store [A-Z] to take out [,] to previous [.] to next page',
			   b:'[a-z] 保管 [A-Z] 持参 [,] 前項 [.] 次項'}],
	[M_EXAMINE, {a:'[t] for target [r] for release [c] for char [m] for skill [x] for item details',
				 b:'[t] ターゲット [r] 解除 [c] キャラ [m] スキル [x] アイテム詳細'}],
	[M_BLACKSMITH, {a:'[a-Z] to repair, [Enter] to repair all equipment',
					b:'[a-Z] 修理, [Enter] 装備全修理'}],
	[M_CURE, {a:'[a-z] to get cured',
			  b:'[a-z] 治療'}],
	[M_MINIMAP, {a:'[a] for all [s] for yourself [c] for char [i] for item [t] fot trap [p] for portal [<],[>] for staircase',
			     b:'[a] すべて [s] 自身 [c] キャラ [i] アイテム [t] 罠 [p] ポータル [<],[>] 階段'}],
	[M_SORT_SKILL, {a:'[a-z] to replace',
					b:'[a-z] 交換元'}],
	[M_SORT_SKILL2, {a:'[a-z] to replace with',
					b:'[a-z] 交換先'}],
	[M_GAIN, {a:'[a-Z] to gain',
			  b:'[a-Z] 取得'}],
	[M_GAIN_SKILL, {a:'[a-z] to gain [A-Z] details',
			  b:'[a-z] 取得 [A-Z] 詳細'}],
	[M_BOOKMARK, {a:'[a-z] to add bookmarks on or [M], [F1-F12] to remove',
				  b:'[a-z] しおりを挿入 [M], [F1-F12] 除外'}],
	[M_BOOKMARK2, {a:'[M], [F1-F12] to choose a bookmark',
				   b:'[M], [F1-F12] しおりを選択'}],
	[M_CAST, {a:'[a-z] to cast [A-Z] details [Ctrl+s] to sort',
			  b:'[a-z] 行使 [A-Z] 詳細 [Ctrl+s] 整理'}],
	[M_CAST_DIR, {a:'[direction] [.] to cast',
				  b:'[方向] [.] 行使'}],
	[M_OPTION, {a:'[a-z] to change option',
				b:'[a-z] オプション変更'}],
	[M_PREVIOUS, {a:'[direction] to scroll',
				  b:'[方向] 項移動'}],			
	[M_OPEN_OR_CLOSE, {a:'[direction] to open or close',
					   b:'[方向] 開閉'}],		
	[M_TAKE_OFF, {a:'[A-Z] to take off or unwield',
				  b:'[A-Z] 取り外し'}],
	[M_FIRE, {a:'[direction] to fire',
				  b:'[方向]　発射'}],
	[M_QUIT, {a:'[y/n] to quit',
			  b:'[y/n] 放棄'}],
				
				
]);
//skill
const TOTAL_SKILL_NUM = 150;
const [FIRE_BOLT,FIRE_BALL,FLAME_OF_DIDO,REMOVE_CURSE,RESIST_FIRE,LIGHT,SEE_INVISIBLE,INVISIBILITY,MAGIC_CIRCLE_OF_PROTECTION,
		HEAL,EXTRA_HEAL,MANA,LIFE_REGENERATION,MANA_REGENERATION,RESTORE_STRENGTH,RESTORE_DEXTERITY,RESTORE_CONSTITUTION,
		RESTORE_INTELLIGENCE,RESTORE_ALL,CURE_ALL,RESIST_WATER,RESIST_ALL,RAISE_LEVEL,RESPEC,ICE_BOLT,COCYTUS,
		WIND_SPEAR,TORNADO,SPEED,SCREAM,RESIST_AIR,LIGHTNING,ENLIGHTENMENT,MAGIC_FINDING,GOLD_FINDING,EXPERIENCE,SKILL,
		IDENTIFY,MONSTER_DETECTION,ITEM_DETECTION,MAGIC_MAPPING,SATISFY_HUNGER,STONE_TO_MUD,CREATE_MONSTER,CREATE_GIANT,
		CREATE_TRAP,RESTORE_DURABILITY,RESIST_EARTH,TOWN_PORTAL,WORMHOLE,SLOW,GRAVITATIONAL_FIELD,
		POISON,CONFUSION,TOUCH_OF_CONFUSION,PARALYSIS,SLEEP,BLINDNESS,HALLUCINATION,POLYMORPH,CANCELLATION,SLEEPING_GAS,
		HOLD_MONSTER,HALLUCINATING_MIST,LOWER_RESIST,WEAKNESS,CLUMSINESS,SICKLINESS,STUPIDITY,RESIST_POISON,INFECTION,
		PESTILENCE,SANDSTORM,BLIZZARD,ACID_BALL,LAVA_FLOW,SHORT_TELEPORTATION,TELEPORTATION,TELEPORT_TO,TELEPORT_AWAY,
		DISINTEGRATION,FIST_OF_CONFUSION,RAID,PIERCING_ARROW,EXPLODING_ARROW,PARALYZING_ARROW,FREEZING_ARROW,PHOTON_ARROW,
		APOLLOS_ARROW,ENCOURAGEMENT,BLESSING,FIRE_BREATH,AQUA_BREATH,WIND_BREATH,POISON_BREATH,LIGHT_BREATH,COLD_BREATH,
		LIGHTNING_BREATH,GRAVITY_BREATH,INFECTION_BREATH,BLIZZARD_BREATH,DUST_BREATH,ACID_BREATH,MAGMA_BREATH,RUSH,SPIRAL,
		COLLAPSE,WHIRLWIND,ECCO,CREATE_MAGIC_MONSTER,POISON_BOLT,VENOM_HANDS,POISON_MIST,RADIOACTIVE_BREATH,CHAIN_DECAY,
		RADIATION,COLD,RESTORE_EXPERIENCE,REPAIR_ALL,ENCHANT_SELF,EARTHQUAKE,CHARGE]
		= enums(1,TOTAL_SKILL_NUM);

const skillMap = new Map([
	//spell
	[FIRE_BOLT,          {reqLvl:1,base:'5d5',rate:20,synerzy:10,mp:5,element:'fire',color:C_FIRE,kind:'attack',type:'spell',name:{a:'Fire Bolt',b:'火炎のボルト'},
							desc:{a:'',b:'敵1体に、{value}の火ダメージを与える'}}],
	[FIRE_BALL,          {reqLvl:10,base:'6d6',rate:20,synerzy:10,mp:10,element:'fire',color:C_FIRE,kind:'attack',type:'spell',name:{a:'Fire Ball',b:'火炎のボール'},
							radius:1,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の火ダメージを与える'}}],
	[FLAME_OF_DIDO,      {reqLvl:30,base:'10d10',rate:20,synerzy:10,mp:30,element:'fire',color:C_FIRE,kind:'attack',type:'spell',name:{a:'Flame of Dido',b:'ディドの焔'},
							reqSynerzy:20,
							desc:{a:'',b:'敵1体に、{value}の火ダメージを与える'}}],
	[REMOVE_CURSE,       {reqLvl:11,base:  0,rate:0,synerzy:false,mp:10,element:'fire'  ,color:C_FIRE,kind:'self',type:'spell',name:{a:'Remove Curse',b:'解呪'},
							reqSynerzy:5,
							desc:{a:'',b:'装備品の呪いを解く'}}],
	[RESTORE_STRENGTH,   {reqLvl:15,base:  0,rate:0,synerzy:false,mp:5,element:'fire' ,color:C_FIRE ,kind:'self',type:'spell',name:{a:'Restore Strength',b:'筋力復活'},
							reqSynerzy:5,
							desc:{a:'',b:'筋力を回復する'}}],
	[RESIST_FIRE,        {reqLvl:5,base:10,rate:5,synerzy:1,mp:10,element:'fire' ,color:C_FIRE ,kind:'self',type:'spell',name:{a:'Resist Fire',b:'耐火'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、火の耐性を{value}上昇させる'}}],
	[LIGHT,              {reqLvl:3,base:  10,rate:2,synerzy:1,mp:5,element:'light' ,color:C_LIGHT,kind:'self',type:'spell',name:{a:'Light',b:'光'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内を照らす'}}],
	[SEE_INVISIBLE,      {reqLvl:15,base:  0,rate:0,synerzy:false,mp:10,element:'light' ,color:C_LIGHT,kind:'self',type:'spell',name:{a:'See Invisible',b:'透視'},
							reqSynerzy:5,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、透明な敵に対する可視効果を得る'}}],
	[INVISIBILITY,       {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'light' ,color:C_LIGHT,kind:'self',type:'spell',name:{a:'Invisibility',b:'透明'},
							durBase:'10d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、透明状態にする'}}],
	[MAGIC_CIRCLE_OF_PROTECTION,
						 {reqLvl:0,base:    0,rate:0,synerzy:false,mp:1,element:'light',color:C_LIGHT,kind:'self',type:'spell',name:{a:'Magic Circle of Protection',b:'守護魔法円'},
							desc:{a:'',b:'足元に敵の侵入を阻む魔法円を描く'}}], 
	[HEAL,               {reqLvl:10,base:'10d2',rate:10,synerzy:5,mp:10,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Heal',b:'回復'},
							reqSynerzy:5,
							desc:{a:'',b:'体力を{value}回復する'}}],
	[EXTRA_HEAL,         {reqLvl:30,base:'30d2',rate:10,synerzy:5,mp:30,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Extra Heal',b:'特大回復'},
							reqSynerzy:20,
							desc:{a:'',b:'体力を{value}回復する'}}],
	[RESTORE_INTELLIGENCE,{reqLvl:15,base: 0,rate:0,synerzy:false,mp:5,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Restore Intelligence',b:'知力復活'},
							reqSynerzy:5,
							desc:{a:'',b:'知力を回復する'}}],
	[RESTORE_ALL,         {reqLvl:25,base: 0,rate:0,synerzy:false,mp:20,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Restore All',b:'全復活'},
							reqSynerzy:10,
							desc:{a:'',b:'能力値を回復する'}}],
	[CURE_ALL,            {reqLvl:25,base: 0,rate:0,synerzy:false,mp:20,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Cure All',b:'全治療'},
							reqSynerzy:10,
							desc:{a:'',b:'全状態異常を治癒する'}}],
	[RESIST_WATER,        {reqLvl:5,base: 10,rate:5,synerzy:1,mp:10,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Resist Water',b:'耐水'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、水の耐性を{value}上昇させる'}}],
	[RESIST_ALL,         {reqLvl:20,base:  5,rate:3,synerzy:1,mp:20,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Resist All',b:'全耐性'},
							perc:true,reqSynerzy:10,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、すべての耐性を{value}上昇させる'}}],
	[MANA,               {reqLvl:0,base:'5d2',rate:10,synerzy:5,mp:1,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Mana',b:'魔力回復'},
							desc:{a:'',b:'魔力を{value}回復する'}}],
	[LIFE_REGENERATION,  {reqLvl:0,base:  20,rate:10,synerzy:false,mp:10,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Life Regeneration',b:'再生'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、体力再生の効果を{value}得る'}}],
	[MANA_REGENERATION,  {reqLvl:0,base:  20,rate:10,synerzy:false,mp:10,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Mana Regeneration',b:'魔力再生'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、魔力再生の効果を{value}得る'}}],
	[RAISE_LEVEL,        {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'water' ,color:C_WATER ,kind:'self',type:'spell',name:{a:'Raise Level',b:'レベル上昇'},
							desc:{a:'',b:'レベルを1上昇させる'}}],
	[RESPEC,             {reqLvl:0,base: 0,rate:0,synerzy:false,mp:0,element:'water',color:C_WATER,kind:'self',type:'spell',name:{a:'Respec',b:'リスペック'},
							desc:{a:'',b:'すべての能力値を初期状態にし、スキルを忘却し、相当のポイントを再び得る'}}],
	[ICE_BOLT,           {reqLvl:1,base:'2d10',rate:20,synerzy:10,mp:5,element:'cold' ,color:C_COLD,kind:'attack',type:'spell',name:{a:'Ice Bolt',b:'冷気のボルト'},
							desc:{a:'',b:'敵1体に、{value}の氷ダメージを与える'}}],
	[COCYTUS,            {reqLvl:30,base:'4d20',rate:20,synerzy:10,mp:40,element:'cold',color:C_COLD,kind:'attack',type:'spell',name:{a:'Cocytus',b:'コキュートス'},
							radius:10,range:0,reqSynerzy:20,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の氷ダメージを与える'}}],
	[COLD,               {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'cold' ,color:C_COLD,kind:'self',type:'spell',name:{a:'Cold',b:'冷気'},
							desc:{a:'',b:'敵1体を凍結させる'}}],
	[WHIRLWIND,          {reqLvl:10,base:'1d20',rate:20,synerzy:10,mp:10,element:'air' ,color:C_AIR,kind:'attack',type:'spell',name:{a:'Whirlwind',b:'旋風'},
							radius:2,penetrate:true,
							desc:{a:'',b:'半径{radius}の範囲内の敵を貫通し、{value}の風ダメージを与える'}}],
	[TORNADO,            {reqLvl:20,base:'1d15',rate:20,synerzy:10,mp:20,element:'air' ,color:C_AIR,kind:'attack',type:'spell',name:{a:'Tornado',b:'竜巻'},
							radius:2,penetrate:true,each:true,reqSynerzy:10,range:10,
							desc:{a:'',b:'1マス毎に、半径{radius}の範囲内の敵を貫通し、{value}の風ダメージを与える'}}],
	[ECCO,               {reqLvl:30,base:  0,rate:0,synerzy:false,mp:30,element:'air' ,color:C_AIR,kind:'self',type:'spell',name:{a:'Ecco',b:'エコー'},
							reqSynerzy:20,durBase:'10d2',durRate:5,
							desc:{a:'',b:'{dur}ターンの間、スキルを2回連続で放つ'}}],
	[SPEED,              {reqLvl:15,base:  5,rate:1,synerzy:false,mp:10,element:'air' ,color:C_AIR,kind:'self',type:'spell',name:{a:'Speed',b:'速度'},
							reqSynerzy:10,durBase:'10d2',durRate:3,
							desc:{a:'',b:'{dur}ターンの間、速度を{value}上昇させる'}}],
	[RESTORE_DEXTERITY,  {reqLvl:15,base: 0,rate:0,synerzy:false,mp:5,element:'air' ,color:C_AIR ,kind:'self',type:'spell',name:{a:'Restore Dexterity',b:'器用さ復活'},
							reqSynerzy:5,
							desc:{a:'',b:'器用さを回復する'}}],
	[RESIST_AIR,         {reqLvl:5,base: 10,rate:5,synerzy:1,mp:10,element:'air' ,color:C_AIR ,kind:'self',type:'spell',name:{a:'Resist Air',b:'耐風'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、風の耐性を{value}上昇させる'}}],
	[SCREAM,             {reqLvl:0,base:  10,rate:2,synerzy:false,mp:1,element:'air' ,color:C_AIR,kind:'self',type:'spell',name:{a:'Scream',b:'悲鳴'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内の敵を目覚めさせる'}}],
	[LIGHTNING,          {reqLvl:1,base:'1d10',rate:20,synerzy:10,mp:5,element:'lightning',color:C_LIGHTNING,kind:'attack',type:'spell',name:{a:'Lightning',b:'稲妻'},
							penetrate:true,
							desc:{a:'',b:'直線上の敵を貫通し、{value}の稲妻ダメージを与える'}}],
	[ENLIGHTENMENT,      {reqLvl:30,base:  0,rate:0,synerzy:false,mp:30,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Enlightenment',b:'啓蒙'},
							reqSynerzy:20,
							desc:{a:'',b:'マップ全域を照らし、地形・アイテム及び隠された罠や階段を検出する'}}],
	[IDENTIFY,           {reqLvl:15,base:  0,rate:0,synerzy:false,mp:10,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Identify',b:'識別'},
							reqSynerzy:10,
							desc:{a:'',b:'アイテムを鑑定する'}}],
	[MONSTER_DETECTION,  {reqLvl:1,base:  10,rate:2,synerzy:1,mp:5,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Monster Detection',b:'モンスター感知'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内の敵を、検出する'}}],
	[ITEM_DETECTION,     {reqLvl:5,base:  10,rate:2,synerzy:1,mp:5,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Item Detection',b:'アイテム感知'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内のアイテムを、検出する'}}],
	[MAGIC_MAPPING,      {reqLvl:10,base:  10,rate:2,synerzy:1,mp:10,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Magic Mapping',b:'魔法の地図'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内の地形を、検出する'}}],
	[SATISFY_HUNGER,     {reqLvl:20,base:  30,rate:1,synerzy:1,mp:10,element:'earth',color:C_EARTH,kind:'self',type:'spell',name:{a:'Satisfy Hunger',b:'空腹充足'},
							perc:true,limit:100,reqSynerzy:10,
							desc:{a:'',b:'空腹を{value}満たす'}}],
	[STONE_TO_MUD,       {reqLvl:15,base:'10d10',rate:10,synerzy:5,mp:5,element:'earth' ,color:C_EARTH,kind:'aim',type:'spell',name:{a:'Stone to Mud',b:'岩石溶解'},
							wall:true,reqSynerzy:10,
							desc:{a:'',b:'壁を取り壊し、石の敵に{value}の土ダメージを与える'}}],
	[RESTORE_DURABILITY, {reqLvl:20,base:  0,rate:0,synerzy:false,mp:5,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Restore Durability',b:'耐久度復活'},
							reqSynerzy:15,
							desc:{a:'',b:'装備品の耐久度を回復する'}}], 
	[EARTHQUAKE,         {reqLvl:20,base:  30,rate:1,synerzy:1,mp:20,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Earthquake',b:'地震'},
							perc:true,limit:100,radius:FOV,reqSynerzy:10,
							desc:{a:'',b:'半径{radius}の範囲内に、{value}の強度で地震を起こす'}}],
	[REPAIR_ALL,         {reqLvl:30,base:  0,rate:0,synerzy:false,mp:30,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Repair All',b:'全修復'},
							reqSynerzy:20,
							desc:{a:'',b:'すべての装備品の耐久度を回復する'}}], 
	[ENCHANT_SELF,       {reqLvl:30,base: 50,rate:5,synerzy:true,mp:30,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Enchant Self',b:'自己強化'},
							perc:true,reqSynerzy:20,durBase:'50d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、物理ダメージ・命中値・守備力をそれぞれ{value}上昇させる'}}], 
	[RESTORE_CONSTITUTION,{reqLvl:15,base: 0,rate:0,synerzy:false,mp:5,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Restore Constitution',b:'耐久力復活'},
							reqSynerzy:5,
							desc:{a:'',b:'耐久力を回復する'}}],
	[RESIST_EARTH,       {reqLvl:5,base: 10,rate:5,synerzy:1,mp:10,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Resist Earth',b:'耐土'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、土の耐性を{value}上昇させる'}}],
	[MAGIC_FINDING,      {reqLvl:0,base:  0,rate:5,synerzy:false,mp:1,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Magic Finding',b:'魔法具探求'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、魔法具探求の効果を{value}得る'}}],
	[GOLD_FINDING,       {reqLvl:0,base:  0,rate:10,synerzy:false,mp:1,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Gold Finding',b:'財宝探求'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、財宝探求の効果を{value}得る'}}],
	[EXPERIENCE,         {reqLvl:0,base:  0,rate:10,synerzy:false,mp:1,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Experience',b:'経験'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、経験値上昇の効果を{value}得る'}}],
	[SKILL,              {reqLvl:0,base:  0,rate:1,synerzy:false,mp:1,element:'earth' ,color:C_EARTH ,kind:'self',type:'spell',name:{a:'Skill',b:'スキル'},
							durBase:'10d2',durRate:100, //
							desc:{a:'',b:'{dur}ターンの間、経験値上昇の効果を{value}得る'}}],
	[CREATE_MONSTER,     {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Create Monster',b:'モンスター生成'},
							desc:{a:'',b:'モンスターを複数生成する'}}],
	[CREATE_MAGIC_MONSTER,{reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Create Magic Monster',b:'マジックモンスター生成'},
							desc:{a:'',b:'マジックモンスターを複数生成する'}}],
	[CREATE_GIANT,       {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Create Giant',b:'巨人生成'},
							desc:{a:'',b:'巨人を複数生成する'}}],
	[CREATE_TRAP,        {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'earth' ,color:C_EARTH,kind:'self',type:'spell',name:{a:'Create Trap',b:'トラップ生成'},
							desc:{a:'',b:'罠を複数生成する'}}],
	[GRAVITATIONAL_FIELD,{reqLvl:20,base:  10,rate:1,synerzy:false,mp:20,element:'gravity' ,color:C_GRAVITY,kind:'aim',type:'spell',name:{a:'Gravitational Field',b:'重力場'},
							radius:10,range:0,reqSynerzy:10,durBase:'10d2',durRate:3,
							desc:{a:'',b:'半径{radius}の範囲内の敵を、{dur}ターンの間、速度を{value}低下させる'}}],
	[TOWN_PORTAL,        {reqLvl:25,base:  0,rate:0,synerzy:false,mp:20,element:'gravity' ,color:C_GRAVITY,kind:'self',type:'spell',name:{a:'Town Portal',b:'タウン・ポータル'},
							reqSynerzy:10,
							desc:{a:'',b:'街またはダンジョンに帰還するポータルを生成する'}}],
	[WORMHOLE,           {reqLvl:30,base: 10,rate:2,synerzy:1,mp:30,element:'gravity' ,color:C_GRAVITY,kind:'self',type:'spell',name:{a:'Wormhole',b:'ワームホール'},
							radiusRate:true,reqSynerzy:20,
							desc:{a:'',b:'半径{radiusRate}の範囲内の任意の場所に移動する'}}],
	[SLOW,               {reqLvl:0,base:  0,rate:1,synerzy:false,mp:1,element:'gravity' ,color:C_GRAVITY,kind:'self',type:'spell',name:{a:'Slow',b:'鈍足'},
							durBase:'10d2',durRate:3,
							desc:{a:'',b:'{dur}ターンの間、速度を{value}低下させる'}}],
	[POISON_BOLT,        {reqLvl:1,base:'2d10',rate:20,synerzy:10,mp:5,element:'poison',color:C_POISON,kind:'attack',type:'spell',name:{a:'Poison Bolt',b:'毒のボルト'},
							desc:{a:'',b:'敵1体に、{value}の毒ダメージを与える'}}],
	[POISON_MIST,        {reqLvl:10,base:'2d15',rate:20,synerzy:10,mp:10,element:'poison',color:C_POISON,kind:'attack',type:'spell',name:{a:'Poison Mist',b:'毒の霧'},
							radius:2,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の毒ダメージを与える'}}],
	[TOUCH_OF_CONFUSION, {reqLvl:5,base:   20,rate:3,synerzy:1,mp:5,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Touch of Confusion',b:'混乱の手'},
							perc:true,limit:100,durBase:'10d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、物理攻撃に混乱の効果を{value}付与する'}}],
	[VENOM_HANDS,        {reqLvl:15,base:  0,rate:10,synerzy:5,mp:10,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Venom Hands',b:'猛毒の手'},
							perc:true,reqSynerzy:5,durBase:'50d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、物理攻撃に毒ダメージを{value}付与する'}}],
	[SLEEPING_GAS,       {reqLvl:10,base:  0,rate:0,synerzy:false,mp:5,element:'poison',color:C_POISON,kind:'aim',type:'spell',name:{a:'Sleeping Gas',b:'睡眠ガス'},
							radius:1,reqSynerzy:5,durBase:'5d2',durRate:1,
							desc:{a:'',b:'半径{radius}の範囲内の敵を、{dur}ターンの間、昏睡状態にする'}}],
	[HOLD_MONSTER,       {reqLvl:15,base:  0,rate:0,synerzy:false,mp:10,element:'poison',color:C_POISON,kind:'aim',type:'spell',name:{a:'Hold Monster',b:'モンスター束縛'},
							radius:1,range:0,reqSynerzy:10,durBase:'2d2',durRate:0,
							desc:{a:'',b:'半径{radius}の範囲内の敵を、{dur}ターンの間、麻痺状態にする'}}],
	[RESTORE_EXPERIENCE, {reqLvl:20,base: 0,rate:0,synerzy:false,mp:5,element:'poison' ,color:C_POISON ,kind:'self',type:'spell',name:{a:'Restore Experience',b:'経験値復活'},
							reqSynerzy:10,
							desc:{a:'',b:'失った経験値を回復する'}}],
	[LOWER_RESIST,       {reqLvl:20,base: -10,rate:-2,synerzy:-1,mp:20,element:'poison' ,color:C_POISON ,kind:'aim',type:'spell',name:{a:'Lower Resist',b:'耐性低下'},
							radius:1,perc:true,reqSynerzy:10,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、全耐性を{value}低下させる'}}],
	[RESIST_POISON,      {reqLvl:5,base:10,rate:5,synerzy:1,mp:10,element:'poison' ,color:C_POISON ,kind:'self',type:'spell',name:{a:'Resist Poison',b:'耐毒'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、毒の耐性を{value}上昇させる'}}],
	// [HALLUCINATING_MIST, {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'aim',type:'spell',name:{a:'Hallucinating Mist',b:'幻覚の霧'},
							// radius:1,reqSynerzy:10,durBase:'10d2',durRate:2,
							// desc:{a:'',b:'半径{radius}の範囲内の敵を、{dur}ターンの間、幻覚状態にする'}}],
	[CONFUSION,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Confusion',b:'混乱'},
							durBase:'2d3',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、混乱状態にする'}}],
	[POISON,             {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Poison',b:'毒'},
							durBase:'5d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、毒状態にする'}}],
	[PARALYSIS,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Paralysis',b:'麻痺'},
							durBase:'2d2',durRate:0,
							desc:{a:'',b:'{dur}ターンの間、麻痺状態にする'}}],
	[SLEEP,              {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Sleep',b:'睡眠'},
							durBase:'5d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、昏睡状態にする'}}],
	[BLINDNESS,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Blindness',b:'盲目'},
							durBase:'10d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、盲目状態にする'}}],
	[HALLUCINATION,      {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Hallucination',b:'幻覚'},
							durBase:'10d2',durRate:2,
							desc:{a:'',b:'{dur}ターンの間、幻覚状態にする'}}],
	[POLYMORPH,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Polymorph',b:'変容'},
							desc:{a:'',b:'敵1体を、変容させる'}}],
	[CANCELLATION,       {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Cancellation',b:'封印'},
							durBase:'2d2',durRate:1,
							desc:{a:'',b:'{dur}ターンの間、封印状態にする'}}],
	[WEAKNESS,           {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Weakness',b:'薄弱'},
							desc:{a:'',b:'筋力を1低下させる'}}],
	[CLUMSINESS,         {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Clumsiness',b:'不器用'},
							desc:{a:'',b:'器用さを1低下させる'}}],
	[SICKLINESS,         {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Sickliness',b:'病弱'},
							desc:{a:'',b:'耐久力を1低下させる'}}],
	[STUPIDITY,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'poison',color:C_POISON,kind:'self',type:'spell',name:{a:'Stupidity',b:'愚鈍'},
							desc:{a:'',b:'知力を1低下させる'}}],
	[INFECTION,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,lement:'infection',color:C_INFECTION,kind:'self',type:'spell',name:{a:'Infection',b:'感染'},
							durBase:'5d2',durRate:2,
							desc:{a:'',b:'{dur}ターンの間、感染状態にする'}}],
	[PESTILENCE,         {reqLvl:30,base:'2d15',rate:20,synerzy:10,mp:30,element:'infection',color:C_INFECTION,kind:'attack',type:'spell',name:{a:'Pestilence',b:'黒死病'},
							radius:10,range:0,reqSynerzy:20,effect:{id:POISON,prob:100},
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の感染ダメージを与え、追加効果で、毒状態にする'}}],
	[SANDSTORM,          {reqLvl:30,base:'2d25',rate:20,synerzy:10,mp:30,element:'sand'   ,color:C_SAND,kind:'attack',type:'spell',name:{a:'Sandstorm',b:'砂嵐'},
							radius:2,reqSynerzy:10,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の砂ダメージを与える'}}],
	[BLIZZARD,           {reqLvl:20,base:'2d20',rate:20,synerzy:10,mp:20,element:'blizzard',color:C_BLIZZARD,kind:'attack',type:'spell',name:{a:'Blizzard',b:'吹雪'},
							radius:2,reqSynerzy:10,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の吹雪ダメージを与える'}}],
	[ACID_BALL,          {reqLvl:10,base:'2d10',rate:20,synerzy:10,mp:10,element:'acid'   ,color:C_ACID,kind:'attack',type:'spell',name:{a:'Acid Ball',b:'酸のボール'},
							radius:1,reqSynerzy:5,
							desc:{a:'',b:'半径{radius}の範囲内の敵に、{value}の酸ダメージを与える'}}],
	[LAVA_FLOW,          {reqLvl:20,base:'5d7',rate:20,synerzy:10,mp:20,element:'magma'  ,color:C_MAGMA,kind:'attack',type:'spell',name:{a:'Lava Flow',b:'溶岩流'},
							penetrate:true,reqSynerzy:10,
							desc:{a:'',b:'直線上の敵を貫通し、{value}の溶岩ダメージを与える'}}],
	[CHAIN_DECAY,        {reqLvl:30,base:'6d7',rate:20,synerzy:10,mp:30,element:'radiation',color:C_RADIATION,kind:'attack',type:'spell',name:{a:'Chain Decay',b:'連鎖崩壊'},
							penetrate:true,radius:1,reqSynerzy:10,
							desc:{a:'',b:'半径{radius}の範囲内の敵を貫通し、{value}の放射線ダメージを与える'}}],
	[RADIATION,          {reqLvl:0,base:  0,rate:0,synerzy:false,mp:1,element:'radiation',color:C_RADIATION,kind:'self',type:'spell',name:{a:'Radiation',b:'放射線'},
							desc:{a:'',b:'敵1体のいずれかの能力値を1低下させる'}}],
	[SHORT_TELEPORTATION,{reqLvl:5,base:    0,rate:0,synerzy:false,mp:5,element:'atom'  ,color:C_ATOM,kind:'self',type:'spell',name:{a:'Short Teleportation',b:'ショート・テレポート'},
							desc:{a:'',b:'近距離のランダムなテレポートを行う'}}],
	[TELEPORTATION,      {reqLvl:10,base:   0,rate:0,synerzy:false,mp:10,element:'atom'  ,color:C_ATOM,kind:'self',type:'spell',name:{a:'Teleportation',b:'テレポート'},
							desc:{a:'',b:'遠距離のランダムなテレポートを行う'}}],
	[TELEPORT_AWAY,      {reqLvl:15,base:  10,rate:2,synerzy:false,mp:10,element:'atom'  ,color:C_ATOM,kind:'aim',type:'spell',name:{a:'Teleport Away',b:'テレポート・アウェイ'},
							radiusRate:true,penetrate:true,
							desc:{a:'',b:'直線上の敵を貫通し、半径{radiusRate}の範囲外へテレポートさせる'}}],
	[DISINTEGRATION,     {reqLvl:30,base: 10,rate:2,synerzy:false,mp:30,element:'atom' ,color:C_ATOM,kind:'self',type:'spell',name:{a:'Disintegration',b:'分解'},
							radiusRate:true,
							desc:{a:'',b:'半径{radiusRate}の範囲内の敵を、分解する'}}],
	[TELEPORT_TO,        {reqLvl:0,base:    0,rate:0,synerzy:false,mp:1,element:'atom'  ,color:C_ATOM,kind:'aim',type:'spell',name:{a:'Teleport To',b:'引き寄せ'},
							desc:{a:'',b:'敵1体を隣接へテレポートさせる'}}],
	[ENCOURAGEMENT,      {reqLvl:1,base: 30,rate:3,synerzy:false,mp:5,element:'fire',color:C_FIRE,kind:'self',type:'spell',name:{a:'Encouragement',b:'鼓舞'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、物理ダメージと命中率を{value}上昇させる'}}],
	[BLESSING,           {reqLvl:1,base: 30,rate:3,synerzy:false,mp:5,element:'air',color:C_AIR,kind:'self',type:'spell',name:{a:'Blessing',b:'加護'},
							perc:true,durBase:'10d2',durRate:10,
							desc:{a:'',b:'{dur}ターンの間、守備力を{value}上昇させる'}}],
	//melee
	[FIST_OF_CONFUSION,  {reqLvl:5,base: -50,rate:5,synerzy:3,mp:10,element:'physical',color:GRAY,kind:'attack',type:'melee',name:{a:'Fist of Confusion',b:'混乱の拳'},
							perc:true,range:1,effect:{id:CONFUSION,prob:100},
							desc:{a:'',b:'隣接する敵1体に、{value}の物理ダメージを与え、追加効果で、混乱状態にする'}}],
	[RAID,               {reqLvl:10,base: 0,rate:10,synerzy:5,mp:10,element:'physical',color:GRAY,kind:'attack',type:'melee',name:{a:'Raid',b:'急襲'},
							perc:true,move:true,parabora:true,
							desc:{a:'',b:'敵1体に飛びかかり、{value}の物理ダメージを与える'}}],
	[COLLAPSE,           {reqLvl:25,base: 0,rate:10,synerzy:5,mp:20,element:'earth',color:C_EARTH,kind:'attack',type:'melee',name:{a:'Collapse',b:'崩落'},
							perc:true,move:true,radius:5,reqSynerzy:10,parabora:true,
							desc:{a:'',b:'任意の場所へ飛びかかり、半径{radius}の範囲内の敵に、{value}の土ダメージを与える'}}],
	[RUSH,               {reqLvl:15,base: 0,rate:10,synerzy:5,mp:10,element:'physical',color:GRAY,kind:'attack',type:'melee',name:{a:'Rush',b:'突進'},
							perc:true,move:true,penetrate:true,range:5,reqSynerzy:5,
							desc:{a:'',b:'直線上の敵を駆け抜け、{value}の物理ダメージを与える'}}],
	[SPIRAL,             {reqLvl:30,base: 0,rate:5,synerzy:3,mp:20,element:'physical',color:GRAY,kind:'attack',type:'melee',name:{a:'Spiral',b:'螺旋'},
							perc:true,move:true,penetrate:true,range:5,each:true,radius:1,reqSynerzy:20,
							desc:{a:'',b:'1マス毎に、直線上及び隣接する敵を駆け抜け、{value}の物理ダメージを与える'}}],
	//missile
	[PIERCING_ARROW,     {reqLvl:1,base: 0,rate:10,synerzy:5,mp:5,element:'physical',color:GRAY,kind:'attack',type:'missile',name:{a:'Piercing Arrow',b:'貫通の矢'},
							perc:true,penetrate:true,
							desc:{a:'',b:'直線上の敵を貫通する矢を放ち、{value}の物理ダメージを与える'}}],
	[PARALYZING_ARROW,   {reqLvl:5,base: -50,rate:5,synerzy:3,mp:5,element:'physical',color:GRAY,kind:'attack',type:'missile',name:{a:'Paralyzing Arrow',b:'麻痺の矢'},
							perc:true,parabora:true,effect:{id:PARALYSIS,prob:100},
							desc:{a:'',b:'放物線を描く矢を放ち、敵1体に、{value}の物理ダメージを与え、追加効果で、麻痺状態にする'}}],
	[EXPLODING_ARROW,    {reqLvl:10,base: 0,rate:10,synerzy:5,mp:10,element:'fire',color:C_FIRE,kind:'attack',type:'missile',name:{a:'Exploding Arrow',b:'爆発の矢'},
							perc:true,radius:1,parabora:true,
							desc:{a:'',b:'放物線を描く矢を放ち、半径{radius}の範囲内の敵に、{value}の火ダメージを与える'}}],
	[FREEZING_ARROW,     {reqLvl:15,base: 0,rate:10,synerzy:5,mp:10,element:'cold',color:C_COLD,kind:'attack',type:'missile',name:{a:'Freezing Arrow',b:'凍結の矢'},
							perc:true,effectSelf:true,parabora:true,
							desc:{a:'',b:'放物線を描く矢を放ち、敵1体に、{value}の氷ダメージを与え、凍結させる'}}],
	[PHOTON_ARROW,       {reqLvl:20,base: 0,rate:10,synerzy:5,mp:10,element:'light',color:C_LIGHT,kind:'attack',type:'missile',name:{a:'Photon Arrow',b:'光子の矢'},
							perc:true,penetrate:true,effectSelf:true,reqSynerzy:10,
							desc:{a:'',b:'放物線を描く矢を放ち、素早い動作で、敵1体に、{value}の光ダメージを与える'}}],
	[APOLLOS_ARROW,      {reqLvl:30,base:100,rate:20,synerzy:10,mp:20,element:'fire',color:C_FIRE,kind:'attack',type:'missile',name:{a:'Apollo\'s Arrow',b:'アポロンの矢'},
							perc:true,radius:5,reqSynerzy:20,parabora:true,effect:{id:INFECTION,prob:20},
							desc:{a:'',b:'放物線を描く矢を放ち、半径{radius}の範囲内の敵に、{value}の火ダメージを与え、追加効果で、感染状態にする'}}],
	
	//enemy
	[FIRE_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'fire'     ,color:C_FIRE  ,kind:'breath',type:'spell',name:{a:'Fire Breath',b:'火炎のブレス'}}],
	[AQUA_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'water'    ,color:C_WATER ,kind:'breath',type:'spell',name:{a:'Aqua Breath',b:'水のブレス'}}],
	[WIND_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'air'      ,color:C_AIR  ,kind:'breath',type:'spell',name:{a:'Wind Breath',b:'風のブレス'}}],
	[POISON_BREATH,     {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'poison'   ,color:C_POISON,kind:'breath',type:'spell',name:{a:'Poison Breath',b:'毒のブレス'}}],
	[LIGHT_BREATH,      {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'light'    ,color:C_LIGHT,kind:'breath',type:'spell',name:{a:'Light Breath',b:'閃光のブレス'}}],
	[COLD_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'cold'     ,color:C_COLD ,kind:'breath',type:'spell',name:{a:'Cold Breath',b:'冷気のブレス'}}],
	[LIGHTNING_BREATH,  {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'lightning',color:C_LIGHTNING,kind:'breath',type:'spell',name:{a:'Lightning Breath',b:'稲妻のブレス'}}],
	[GRAVITY_BREATH,    {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'gravity'  ,color:C_GRAVITY,kind:'breath',type:'spell',name:{a:'Gravity Breath',b:'重力のブレス'}}],
	[INFECTION_BREATH,  {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'infection',color:C_INFECTION,kind:'breath',type:'spell',name:{a:'Infection Breath',b:'感染のブレス'}}],
	[BLIZZARD_BREATH,   {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'blizzard' ,color:C_BLIZZARD,kind:'breath',type:'spell',name:{a:'Blizzard Breath',b:'吹雪のブレス'}}],
	[DUST_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'sand'     ,color:C_SAND  ,kind:'breath',type:'spell',name:{a:'Dust Breath',b:'砂塵のブレス'}}],
	[ACID_BREATH,       {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'acid'     ,color:C_ACID  ,kind:'breath',type:'spell',name:{a:'Acid Breath',b:'酸のブレス'}}],
	[MAGMA_BREATH,      {reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'magma'    ,color:C_MAGMA,kind:'breath',type:'spell',name:{a:'Magma Breath',b:'溶岩のブレス'}}],
	[RADIOACTIVE_BREATH,{reqLvl:0,base:  0,rate:10,synerzy:5,mp:5,element:'radiation',color:C_RADIATION,kind:'breath',type:'spell',name:{a:'Radioactive Breath',b:'放射能のブレス'}}],
]);
{
	if(TOTAL_SKILL_NUM<skillMap.size) throw new Error('Incorrect skill numbers');
	for(let [key, value] of skillMap.entries())
		value.id = key;
}

const trapTab =[
	{name:{a:'Protection',b:'守り'},symbol:';',color:WHITE,circle:true,protection:true},
	{name:{a:'Teleportation',b:'テレポート'},symbol:';',color:SKY_BLUE,circle:true,nameSkill:TELEPORTATION,lvl:10,},
	{name:{a:'Summons',b:'召喚'},symbol:';',color:PURPLE,circle:true,nameSkill:CREATE_MONSTER,lvl:10,},
	{name:{a:'Life Regeneration',b:'再生'},symbol:';',color:CORAL,circle:true,nameSkill:LIFE_REGENERATION,lvl:10,},
	{name:{a:'Mana Regeneration',b:'魔力再生'},symbol:';',color:LIGHTBLUE,circle:true,nameSkill:MANA_REGENERATION,lvl:10,},
	{name:{a:'Experience',b:'経験'},symbol:';',color:BRONZE,circle:true,nameSkill:EXPERIENCE,lvl:10,},
	{name:{a:'Skill',b:'スキル'},symbol:';',color:GOLD,circle:true,nameSkill:SKILL,lvl:3,},
	{name:{a:'Magic Finding',b:'魔法具探求'},symbol:';',color:AQUA,circle:true,nameSkill:MAGIC_FINDING,lvl:10,},
	{name:{a:'Gold Finding',b:'財宝探求'},symbol:';',color:YELLOW,circle:true,nameSkill:GOLD_FINDING,lvl:10,},
	{name:{a:'Resist Fire',b:'耐火'},symbol:';',color:C_FIRE,circle:true,nameSkill:RESIST_FIRE,lvl:10,},
	{name:{a:'Resist Water',b:'耐水'},symbol:';',color:C_WATER,circle:true,nameSkill:RESIST_WATER,lvl:10,},
	{name:{a:'Resist Air',b:'耐風'},symbol:';',color:C_AIR,circle:true,nameSkill:RESIST_AIR,lvl:10,},
	{name:{a:'Resist Earth',b:'耐土'},symbol:';',color:C_EARTH,circle:true,nameSkill:RESIST_EARTH,lvl:10,},
	{name:{a:'Resist Poison',b:'耐毒'},symbol:';',color:C_POISON,circle:true,nameSkill:RESIST_POISON,lvl:10,},
	{name:{a:'Combat',b:'戦闘'},symbol:';',color:STEEL,circle:true,nameSkill:ENCOURAGEMENT,lvl:10,},
	{name:{a:'Armor',b:'防護'},symbol:';',color:BRASS,circle:true,nameSkill:BLESSING,lvl:10,},
	{name:{a:'Trap Door',b:'隠し扉の罠'},symbol:'^',color:WHITE},
	{name:{a:'Bear Trap',b:'虎挟み'},symbol:'^',color:SHADOW},
	{name:{a:'Arrow Trap',b:'矢の罠'},symbol:'^',color:WHITE},
	{name:{a:'Weakness',b:'薄弱'},symbol:'^',color:C_POISON,dart:true,nameSkill:WEAKNESS,lvl:1,},
	{name:{a:'Clumsiness',b:'不器用'},symbol:'^',color:C_POISON,dart:true,nameSkill:CLUMSINESS,lvl:1,},
	{name:{a:'Sickliness',b:'病弱'},symbol:'^',color:C_POISON,dart:true,nameSkill:SICKLINESS,lvl:1,},
	{name:{a:'Stupidity',b:'愚鈍'},symbol:'^',color:C_POISON,dart:true,nameSkill:STUPIDITY,lvl:1,},
	{name:{a:'Poison',b:'毒'},symbol:'^',color:C_POISON,gas:true,nameSkill:POISON,lvl:1,},
	{name:{a:'Sleepness',b:'睡眠'},symbol:'^',color:ROYALBLUE,gas:true,nameSkill:SLEEP,lvl:1,},
	{name:{a:'Hallucination',b:'幻覚'},symbol:'^',color:PURPLE,gas:true,nameSkill:HALLUCINATION,lvl:1,},
	{name:{a:'Paralysis',b:'麻痺'},symbol:'^',color:ORANGE,gas:true,nameSkill:PARALYSIS,lvl:1,},
	{name:{a:'Confusion',b:'混乱'},symbol:'^',color:YELLOW,gas:true,nameSkill:CONFUSION,lvl:1,},
	{name:{a:'Blindness',b:'盲目'},symbol:'^',color:GRAY,gas:true,nameSkill:BLINDNESS,lvl:1,},
	{name:{a:'Bacteria',b:'細菌'},symbol:'^',color:C_INFECTION,gas:true,nameSkill:INFECTION,lvl:1,},
];

const materialList = enumsBit(1,12);
const [M_CLOTH, M_FUR, M_FEATHER ,M_SKIN, M_SCALE,
	M_BONE, M_SHELL,M_METAL, M_PLATING, M_GEM,
	M_STONE,M_WOOD, 
	] = [...materialList];
const MAX_BIAS_NUMS = 15;
const [BIAS_FIRE,BIAS_WATER,BIAS_AIR,BIAS_EARTH,BIAS_POISON,
	BIAS_LIGHT,BIAS_COLD,BIAS_LIGHTNING,BIAS_GRAVITY,BIAS_INFECTION,
	BIAS_SAND,BIAS_BLIZZARD,BIAS_ACID,BIAS_MAGMA,BIAS_RADIATION,
	] = enums(1,MAX_BIAS_NUMS);
const materialMap =  new Map([
	[M_CLOTH, {name:{a:'Cloths',b:'布類'},hRate:1,tRate:6,pRate:1,list:[
		{name:{a:'Hemp',b:'麻'},color:C_FLAX},
		{name:{a:'Wool',b:'羊毛'},color:WHITE}, //Fleece?
		{name:{a:'Cotton',b:'綿'},color:WHITE},
		{name:{a:'Silk',b:'絹'},color:WHITE},
		{name:{a:'Mohair',b:'モヘヤ'},color:WHITE}, //アンゴラ山羊
		{name:{a:'Cashmere',b:'カシミア'},color:WHITE}, //カシミヤ山羊
		{name:{a:'Camel',b:'キャメル'},color:WHITE}, //ラクダ
		{name:{a:'Angora',b:'アンゴラ'},color:WHITE}, //アンゴラヤギ、アンゴラウサギ,モヘヤ?
		{name:{a:'Vicuna',b:'ビキューナ'},color:WHITE}, //ラクダ科
		{name:{a:'Spiderweb',b:'スパイダーウェブ'},color:WHITE},
	]}],
	[M_FEATHER, {name:{a:'Feathers',b:'羽類'},hRate:2,tRate:7,pRate:2,list:[
		{name:{a:'Chicken Feather',b:'鶏羽'},color:BROWN},
		{name:{a:'Peafowl Feather',b:'孔雀羽'},color:C_TEAL},
		{name:{a:'Eagle Feather',b:'鷲羽'},color:SHADOW},
		{name:{a:'Hawk Feather',b:'鷹羽'},color:C_BEIGE_GRAY},
		{name:{a:'Bat Feather',b:'蝙蝠羽'},color:SHADOW},
		{name:{a:'Fairy Feather',b:'フェアリー・フェザー'},color:LIME},
		{name:{a:'Harpy Feather',b:'ハーピー・フェザー'},color:SKY_BLUE},
		{name:{a:'Griffin Feather',b:'グリフォン・フェザー'},color:WHITE},
		{name:{a:'Angel Feather',b:'エンジェル・フェザー'},color:WHITE,},
		{name:{a:'Phoenix Feather',b:'フェニックス・フェザー'},color:RED,values:{fire:'1d10'}},
		{name:{a:'Pegasus Feather',b:'ペガサス・フェザー'},color:WHITE},
		//セイレン?
	]}],
	[M_FUR, {name:{a:'Furs',b:'毛皮類'},hRate:3,tRate:9,pRate:2,list:[
		{name:{a:'Rabbit Fur',b:'兎毛皮'},color:C_BEIGE},
		{name:{a:'Boar Fur',b:'猪毛皮'},color:BROWN},
		{name:{a:'Wolf Fur',b:'狼毛皮'},color:C_BEIGE_GRAY},
		{name:{a:'Jackal Fur',b:'ジャッカル毛皮'},color:C_GOLDEN_YELLOW},
		{name:{a:'Raccoon Fur',b:'ラクーン毛皮'},color:C_BEIGE_GRAY},
		{name:{a:'Mink Fur',b:'ミンク毛皮'},color:LIGHTGREY},
		{name:{a:'Rum Fur',b:'ラム毛皮'},color:C_BEIGE},
		{name:{a:'Fox Fur',b:'狐毛皮'},color:C_FOX},
		{name:{a:'Skunk Fur',b:'スカンク毛皮'},color:SHADOW},
		{name:{a:'Lion Fur',b:'ライオン毛皮'},color:C_GOLDEN_YELLOW},
		{name:{a:'Manticore Fur',b:'マンティコア毛皮'},color:RED},
		{name:{a:'Cerberus Fur',b:'ケルベロス毛皮'},color:GRAY},
	]}],
	[M_SKIN, {name:{a:'Skins',b:'皮類'},hRate:4,tRate:10,pRate:2,list:[
		{name:{a:'Deerhide',b:'鹿皮'},color:C_GOLDEN_YELLOW},
		{name:{a:'Sheepskin',b:'羊皮'},color:C_BEIGE},
		{name:{a:'Goatskin',b:'山羊皮'},color:C_BEIGE_GRAY},
		{name:{a:'Horsehide',b:'馬皮'},color:BROWN},
		{name:{a:'Cowhide',b:'牛皮'},color:WHITE},
		{name:{a:'Demonhide',b:'デーモン・ハイド'},color:SHADOW},
		{name:{a:'Wyrmhide',b:'ワイアーム・ハイド'},color:GREEN},
	]}],
	[M_SCALE, {name:{a:'Scales',b:'鱗類'},hRate:5,tRate:8,pRate:2,list:[
		{name:{a:'Serpentskin',b:'蛇皮'},color:PURPLE},
		{name:{a:'Lizard Skin',b:'トカゲ皮'},color:LIGHTGREEN},
		{name:{a:'Fish Scale',b:'魚鱗'},color:BLUE},
		{name:{a:'Sharkskin',b:'鮫皮'},color:SILVER},
		{name:{a:'Nagascale',b:'ナーガ鱗'},color:DARKGREEN},
		{name:{a:'Hydrascale',b:'ヒュドラ鱗'},color:GREEN},
		{name:{a:'Dragonscale',b:'竜鱗'},color:GREEN},
		{name:{a:'Lamiascale',b:'ラミア鱗'},color:C_TEAL},
	]}],
	[M_PLATING, {name:{a:'Plating',b:'メッキ製'},hRate:6,tRate:5,pRate:3,list:[
		{name:{a:'Tin Plated',b:'錫メッキ'},color:TIN},
		{name:{a:'Zinc Plated',b:'亜鉛メッキ'},color:C_ZINC},
		{name:{a:'Cadmium Plated',b:'カドミウムメッキ'},color:C_CADMIUM},
		{name:{a:'Chrome Plated',b:'クロムメッキ'},color:C_CHROME},
		{name:{a:'Copper Plated',b:'銅メッキ'},color:C_COPPER},
		{name:{a:'Silver Plated',b:'銀メッキ'},color:SILVER},
		{name:{a:'Gold Plated',b:'金メッキ'},color:GOLD},
		{name:{a:'Platinum Plated',b:'プラチナメッキ'},color:C_PLATINUM},
		{name:{a:'Alumite',b:'アルマイト'},color:C_ALUMINIUM},
		//Gilded
	]}],
	[M_WOOD, {name:{a:'Woods',b:'木材'},hRate:7,tRate:3,pRate:1,list:[
		{name:{a:'Poplar',b:'ポプラ'},color:C_BEIGE},
		{name:{a:'Walnut',b:'クルミ'},color:C_WALNUT},
		{name:{a:'Cypress',b:'イトスギ'},color:C_CYPRESS}, 
		{name:{a:'Oak',b:'樫'},color:C_OAK}, 
		{name:{a:'Beech',b:'ブナ'},color:C_BEECH},
		{name:{a:'Ash',b:'トネリコ'},color:C_ASH}, 
		{name:{a:'Ebony',b:'黒檀'},color:C_EBONY}, 
		{name:{a:'Rosewood',b:'紫檀'},color:C_ROSEWOOD},
		{name:{a:'Teak',b:'チーク'},color:C_TEAK},
		{name:{a:'Mahogany',b:'マホガニー'},color:C_MAHOGANY},
		{name:{a:'Life Tree',b:'生命樹'},color:BROWN},
		//Cedar
	]}],
	[M_BONE, {name:{a:'Bones',b:'骨類'},hRate:8,tRate:2,pRate:2,list:[
		{name:{a:'Bone',b:'骨'},color:WHITE},
		{name:{a:'Giantbone',b:'ジャイアント・ボーン'},color:WHITE},
		{name:{a:'Dragonbone',b:'竜骨'},color:WHITE},
		{name:{a:'Demonbone',b:'デーモン・ボーン'},color:WHITE},
		{name:{a:'Vampirebone',b:'ヴァンパイア・ボーン'},color:WHITE},

	]}],
	[M_SHELL, {name:{a:'Shells',b:'甲殻類'},hRate:9,tRate:4,pRate:2,list:[
		{name:{a:'Coral',b:'珊瑚'},color:CORAL},
		{name:{a:'Scorpion Shell',b:'サソリ殻'},color:SHADOW},
		{name:{a:'Crab Shell',b:'蟹殻'},color:ORANGE},
		{name:{a:'Turtle Shell',b:'亀甲羅'},color:BROWN},
		{name:{a:'Scarab Shell',b:'スカラブ殻'},color:GRAY}, //スカラベ
	]}],
	[M_METAL, {name:{a:'Metals',b:'金属類'},hRate:10,tRate:3,pRate:5,list:[
		{name:{a:'Tin',b:'錫'},color:TIN},
		{name:{a:'Copper',b:'銅'},color:C_COPPER},
		{name:{a:'Brass',b:'黄銅'},color:BRASS},
		{name:{a:'Bronze',b:'青銅'},color:BRONZE},
		{name:{a:'Iron',b:'鉄'},color:C_IRON},
		{name:{a:'Steel',b:'鋼'},color:STEEL},
		{name:{a:'Silver',b:'銀'},color:SILVER},
		{name:{a:'Gold',b:'金'},color:GOLD},
		{name:{a:'Platinum',b:'プラチナ'},color:C_PLATINUM},
		{name:{a:'Titanium',b:'チタン'},color:C_TITANIUM},
		{name:{a:'Adamantite',b:'アダマンタイト'},color:STEEL},
		{name:{a:'Orichalcum',b:'オリハルコン'},color:BRASS},
	]}],
	[M_STONE, {name:{a:'Stones',b:'石材'},hRate:11,tRate:1,pRate:4,list:[
		{name:{a:'Stone',b:'石'},color:WHITE},
		{name:{a:'Hematite',b:'ヘマタイト'},color:WHITE},
		{name:{a:'Moonstone',b:'ムーンストーン'},color:SKY_BLUE},
		{name:{a:'Obsidian',b:'黒曜石'},color:SHADOW}, 
		{name:{a:'Onyx',b:'オニキス'},color:SHADOW},
		{name:{a:'Morion',b:'モリオン'},color:SHADOW}, 
		{name:{a:'Crystal',b:'クリスタル'},color:WHITE}, 
		{name:{a:'Tourmaline',b:'トルマリン'},color:C_LIGHTNING},
		{name:{a:'Beryl',b:'ベリル'},color:LIGHTGREEN},
		{name:{a:'Spinel',b:'スピネル'},color:PINK},
		{name:{a:'Corundum',b:'コランダム'},color:WHITE},
		{name:{a:'Ceramic',b:'セラミック'},color:WHITE},
		{name:{a:'Meteorite',b:'隕石'},color:GRAY},
		{name:{a:'Black Diamond',b:'ブラック・ダイヤモンド'},color:SHADOW},
		//Gargoyle
	]}],
	[M_GEM, {name:{a:'Gems',b:'宝石類'},hRate:12,tRate:2,pRate:10,list:[
		{name:{a:'Ruby',b:'ルビー'},lvl:1,rarity:0,color:C_FIRE,bias:BIAS_FIRE},
		{name:{a:'Turquoise',b:'ターコイズ'},lvl:1,rarity:0,color:C_AIR,bias:BIAS_AIR},
		{name:{a:'Aquamarine',b:'アクアマリン'},lvl:1,rarity:0,color:C_WATER,bias:BIAS_WATER},
		{name:{a:'Amber',b:'アンバー'},lvl:1,rarity:0,color:C_EARTH,bias:BIAS_EARTH},
		{name:{a:'Emerald',b:'エメラルド'},lvl:1,rarity:0,color:C_POISON,bias:BIAS_POISON},
		{name:{a:'Diamond',b:'ダイヤモンド'},lvl:10,rarity:30,color:C_LIGHT,bias:BIAS_LIGHT},
		{name:{a:'Topaz',b:'トパーズ'},lvl:10,rarity:30,color:C_LIGHTNING,bias:BIAS_LIGHTNING},
		{name:{a:'Sapphire',b:'サファイア'},lvl:10,rarity:30,color:C_COLD,bias:BIAS_COLD},
		{name:{a:'Black Opal',b:'黒真珠'},lvl:10,rarity:30,color:C_GRAVITY,bias:BIAS_GRAVITY},
		{name:{a:'Jade',b:'翡翠'},lvl:10,rarity:30,color:C_INFECTION,bias:BIAS_INFECTION},
		{name:{a:'Garnet',b:'ガーネット'},lvl:20,rarity:50,color:C_MAGMA,bias:BIAS_MAGMA},
		{name:{a:'Chrysoberyl',b:'クリソベリル'},lvl:20,rarity:50,color:C_ACID,bias:BIAS_ACID},  //キャッツアイ,アレキサンドライト
		{name:{a:'Fluorite',b:'フローライト'},lvl:20,rarity:50,color:C_RADIATION,bias:BIAS_RADIATION},
		{name:{a:'Tanzanite',b:'タンザナイト'},lvl:20,rarity:50,color:C_BLIZZARD,bias:BIAS_BLIZZARD},
		{name:{a:'Citrine',b:'シトリン'},lvl:20,rarity:50,color:C_SAND,bias:BIAS_SAND},
	]}],
]);
{
	let times = 1;
	for(let [matBase, materials] of materialMap.entries()){
		materials.nums = enums(0,materials.list.length-1);
		let hRate = materials.hRate*times;
		let tRate = materials.tRate*times;
		let pRate = materials.pRate;
		let list = materials.list;
		let num = Math.floor(30/list.length);
		for(let [key, mat] of list.entries()){
			mat.density = hRate/times+key/10;
			mat.hardness = hRate*(key+1);
			mat.toughness = tRate*(key+1);
			mat.priceRate = pRate*(key+1);
			if(matBase===M_GEM) continue; 
			mat.lvl = 1+num*key;
			mat.rarity = num*key*2;
		}
	}
}
const mineralTab = [
	{name:{a:'Nickel',b:'ニッケル'},color:C_NICKEL},
	{name:{a:'Cobalt',b:'コバルト'},color:C_COBALT},
	{name:{a:'Magnesium',b:'マグネシウム'},color:C_MAGNESIUM},
	{name:{a:'Chrome',b:'クロム'},color:C_CHROME},
	{name:{a:'Carbon',b:'カーボン'},color:C_CARBON},
	{name:{a:'Silicon',b:'シリコン'},color:WHITE},
];
{	
	let metals = materialMap.get(M_METAL).list;
	for(let metal of metals)
		mineralTab.push(metal);
}

const modBonusMap = new Map([
	[MAGIC,{fire:10,water:10,air:10,earth:10,poison:10,}],
	[RARE,{fire:30,water:30,air:30,earth:30,poison:30,}],
	[UNIQUE,{fire:50,water:50,air:50,earth:50,poison:75,}],
]);

const [//book
	B_BLANK_PAPER,B_ALCHEMY_1,B_SPELL_1,B_SPELL_2,B_SPELL_3, 
	B_SKILL_1,B_SKILL_2,B_ARES,B_APOLLO,B_HERACLITUS,
	B_THALES,B_ANAXIMENES,B_XENOPHANES,B_HIPPOCRATES,B_DEMOCRITUS,
	] = enums(1,15);
const F_RATION = 1 ; //food
const [//potion
	P_POISON,P_CONFUSION,P_PARALYSIS,P_SLEEP,P_BLINDNESS,
	P_DISEASE,P_HALLUCINATION,P_SLOWNESS,P_CANCELLATION,P_WEAKNESS,
	P_CLUMSINESS,P_SICKLINESS,P_STUPIDITY,P_HEALING,P_EXTRA_HEALING,
	P_RESTORE_STRENGTH,P_RESTORE_DEXTERITY,P_RESTORE_CONSTITUTION,P_RESTORE_INTELLIGENCE,P_RESTORE_ALL,
	P_RESIST_FIRE,P_RESIST_WATER,P_RESIST_AIR,P_RESIST_EARTH,P_RESIST_POISON,
	P_RESIST_ALL,P_MANA,P_SPEED,P_SEE_INVISIBLE,P_RAISE_LEVEL,
	P_ENLIGHTENMENT,P_Lower_Resist,P_CURE_ALL,P_RESTORE_EXPERIENCE,P_LETHE,
	] = enums(1,35);
const [//scroll
	S_SHORT_TELEPORTATION,S_TELEPORTATION,S_REMOVE_CURSE,S_IDENTIFY,S_MONSTER_DETECTION,
	S_ITEM_DETECTION,S_MAGIC_MAPPING,S_TOWN_PORTAL,S_TOUCH_CONFUSION,S_HOLD_MONSTER,
	S_AGGRAVATE_MONSTER,S_CREATE_MONSTER,S_CREATE_MAGIC_MONSTER,S_CREATE_TRAP,S_RESTORE_DURABILITY,
	S_REPAIR_ALL,S_DISINTEGRATION,S_MAGIC_CIRCLE_PROTECTION,S_LIGHT,S_SPIDERWEB,
	S_EARTHQUAKE,
	] = enums(1,21);
const [//wand
	W_TELEPORT_AWAY,W_STONE_MUD,W_FIRE_BOLT,W_LIGHTNING,W_ICE_BOLT,
	W_HASTE_MONSTER,W_INVISIBILITY,W_POLYMORPH,W_SLOW_MONSTER,W_CANCELLATION,
	W_TELEPORT_TO,W_Lower_Resist,
	] = enums(1,12);
const [//melee
	//sword
	M_KNIFE,M_DAGGER,M_SWORD,
	//polearm	
	M_SPEAR,
	//misc	
	M_CLUB,M_AXE,M_TWO_HANDED_AXE,M_PICK,M_MAUL,
	M_TWO_HANDED_HAMMER,
	] = enums(1,10); 
const [//missile
	M_SLING,M_STAFF_SLING,M_BOW,M_CROSSBOW,
	] = enums(1,4); 
const [//staff
	S_STICK,S_ROD,S_STAFF,
	] = enums(1,3); 
const [//shield
	S_SHIELD,
	] = enums(1,1); 
const [//armor
	A_ROBE,A_VEST,A_VESTMENT,A_ARMOR,A_SPLINT_MAIL,
	A_PLATE_MAIL,
	] = enums(1,6); 
const [//cloak
	C_COAT,C_CLOAK,C_MANTLE,
	] = enums(1,3); 
const [//belt
	B_SASH,B_BELT,
	] = enums(1,2); 
const [//helm
	H_CIRCLET,H_CAP,H_CROWN,H_MASK,H_HELM,
	] = enums(1,9); 
const [//glove
	G_MITTEN,G_BRACER,G_GLOVES,G_VAMBRACE,G_GAUNTLETS,
	] = enums(1,5); 
const [//boots
	B_SANDALS,B_SHOES,B_BOOTS,B_GREAVES,
	] = enums(1,4); 
const [//light
	L_TORCH,L_LAMP,L_LANTHANUM,
	] = enums(1,3); 
const R_RING = 1;
const A_AMULET = 1;
const G_GEM = 1;
const O_OLIVE_OIL = 1;
const [//ammo
	A_ROCK,A_ARROW,A_BOLT,
	] = enums(1,3); 
const C_COIN = 1;
const itemTab = {
	book:new Map([
		[B_BLANK_PAPER,{nameReal:{a:'Blank Paper',b:'白紙'},symbol:'?',color:GRAY,type2:'Charge Book',priceReal:1000,shop:true,
			lvl:10,rarity:50}],
		[B_ALCHEMY_1,{nameReal:{a:'Alchemy for Beginners',b:'初級錬金術'},symbol:'?',color:RED,type2:'recipe',priceReal:100,shop:true,
			lvl:1,rarity:0,alchemy:true,desc:
			{a:
			`Torches [2-4]
				-> Torch [duration sum]
			Lamps or Lanthanums + oil [2-4]
				-> Light Source [duration sum]
			Potion of Healing [3]
				-> Potion of Extra Healing
			Wands [2-4]
				-> Wand [charges sum]
			Charge Book + Scroll
				-> Charge book [charges sum]
			Gem [1-4]
				-> Coin
			`,
			b:
			`松明 [2-4]
				-> 松明 [期間 計]
			ランプまたはランタン + オイル [2-4]
				-> ランプまたはランタン [期間　計]
			回復の薬 [3]
				-> 特大回復の薬
			魔法棒 [2-4]
				-> 魔法棒 [充填 計]
			充填書 + 巻物
				-> 充填書 [充填 計]
			宝石 [1-4]
				-> 硬貨
			`}
		}],
		[B_SPELL_1,{nameReal:{a:'Spells for Beginners',b:'初級魔術'},symbol:'?',color:GRAY,priceReal:100,shop:true,
			list:{a:FIRE_BOLT,b:ICE_BOLT,c:LIGHTNING,d:MONSTER_DETECTION,e:POISON_BOLT,f:LIGHT,g:TOUCH_OF_CONFUSION,
			h:SHORT_TELEPORTATION,i:TELEPORTATION,j:RESIST_FIRE,k:RESIST_WATER,l:RESIST_AIR,m:RESIST_EARTH,n:RESIST_POISON,
			o:ITEM_DETECTION,p:SLEEPING_GAS},
			lvl:1,rarity:0,skill:true}],
		[B_SPELL_2,{nameReal:{a:'Intermediate Spells',b:'中級魔術'},symbol:'?',color:GRAY,priceReal:1000,shop:true,
			list:{a:FIRE_BALL,b:WHIRLWIND,c:POISON_MIST,d:TELEPORT_AWAY,e:SPEED,f:SEE_INVISIBLE,g:REMOVE_CURSE,
			h:STONE_TO_MUD,i:IDENTIFY,j:ACID_BALL,k:RESTORE_STRENGTH,l:RESTORE_DEXTERITY,
			m:RESTORE_CONSTITUTION,n:RESTORE_INTELLIGENCE,o:HEAL,p:MAGIC_MAPPING,q:VENOM_HANDS,r:HOLD_MONSTER},
			lvl:10,rarity:10,skill:true}],
		[B_SPELL_3,{nameReal:{a:'Advanced Spells',b:'上級魔術'},symbol:'?',color:GRAY,priceReal:3000,
			list:{a:LAVA_FLOW,b:LOWER_RESIST,c:BLIZZARD,d:TORNADO,e:TOWN_PORTAL,f:RESTORE_DURABILITY,g:GRAVITATIONAL_FIELD,
			h:CURE_ALL,i:SATISFY_HUNGER,j:RESTORE_ALL,k:RESIST_ALL,l:RESTORE_EXPERIENCE,m:EARTHQUAKE},
			lvl:20,rarity:30,skill:true}],
		[B_SKILL_1,{nameReal:{a:'Skills for Beginners',b:'初級武術'},symbol:'?',color:BROWN,priceReal:100,shop:true,
			list:{a:ENCOURAGEMENT,b:BLESSING,c:FIST_OF_CONFUSION,d:RAID,e:PIERCING_ARROW,f:EXPLODING_ARROW,g:PARALYZING_ARROW},
			lvl:1,rarity:0,skill:true}],
		[B_SKILL_2,{nameReal:{a:'Intermediate Skills',b:'中級武術'},symbol:'?',color:BROWN,priceReal:1000,shop:true,
			list:{a:RUSH,b:COLLAPSE,c:PHOTON_ARROW,d:FREEZING_ARROW},
			lvl:15,rarity:10,skill:true}],
		[B_ARES,{nameReal:{a:'Ares',b:'アレス'},symbol:'?',color:BRONZE,priceReal:5000,
			list:{a:FIST_OF_CONFUSION,b:RUSH,c:RAID,d:COLLAPSE,e:SPIRAL},
			lvl:30,rarity:50,skill:true}],
		[B_APOLLO,{nameReal:{a:'Apollo',b:'アポロン'},symbol:'?',color:ORANGE,priceReal:5000,
			list:{a:PIERCING_ARROW,b:EXPLODING_ARROW,c:PARALYZING_ARROW,d:PHOTON_ARROW,e:FREEZING_ARROW,f:APOLLOS_ARROW},
			lvl:30,rarity:50,skill:true}],
		[B_HERACLITUS,{nameReal:{a:'Heraclitus',b:'ヘラクレイトス'},symbol:'?',color:C_FIRE,priceReal:5000,
			list:{a:FIRE_BOLT,b:LAVA_FLOW,c:LIGHT,d:FLAME_OF_DIDO,e:REMOVE_CURSE,f:SEE_INVISIBLE,g:RESIST_FIRE,
			h:FIRE_BALL,i:RESTORE_STRENGTH,j:CHAIN_DECAY},
			lvl:30,rarity:50,skill:true}], //fire
		[B_THALES,{nameReal:{a:'Thales',b:'タレス'},symbol:'?',color:C_WATER,priceReal:5000,
			list:{a:HEAL,b:RESTORE_INTELLIGENCE,c:BLIZZARD,d:ACID_BALL,e:RESTORE_ALL,f:CURE_ALL,g:ICE_BOLT,h:RESIST_WATER,i:RESIST_ALL,
			j:EXTRA_HEAL,k:COCYTUS},
			lvl:30,rarity:50,skill:true}], //water
		[B_ANAXIMENES,{nameReal:{a:'Anaximenes',b:'アナクシメネス'},symbol:'?',color:C_AIR,priceReal:5000,
			list:{a:LIGHTNING,b:SANDSTORM,c:BLIZZARD,d:ECCO,e:SPEED,f:RESIST_AIR,g:TORNADO,h:RESTORE_DEXTERITY,
			i:WHIRLWIND},
			lvl:30,rarity:50,skill:true}], //air
		[B_XENOPHANES,{nameReal:{a:'Xenophanes',b:'クセノパネス'},symbol:'?',color:C_EARTH,priceReal:5000,
			list:{a:ENLIGHTENMENT,b:SANDSTORM,c:LAVA_FLOW,d:GRAVITATIONAL_FIELD,e:MONSTER_DETECTION,f:STONE_TO_MUD,
			g:IDENTIFY,h:RESIST_EARTH,i:SATISFY_HUNGER,j:WORMHOLE,k:RESTORE_CONSTITUTION,l:MAGIC_MAPPING,m:ITEM_DETECTION,
			n:TOWN_PORTAL,o:RESTORE_DURABILITY,p:REPAIR_ALL,q:ENCHANT_SELF,r:EARTHQUAKE},
			lvl:30,rarity:50,skill:true}], //earth
		[B_HIPPOCRATES,{nameReal:{a:'Hippocrates',b:'ヒポクラテス'},symbol:'?',color:C_POISON,priceReal:5000,
			list:{a:POISON_BOLT,b:ACID_BALL,c:PESTILENCE,d:SLEEPING_GAS,e:TOUCH_OF_CONFUSION,f:RESIST_POISON,g:LOWER_RESIST,
			h:VENOM_HANDS,i:CHAIN_DECAY,j:RESTORE_EXPERIENCE},
			lvl:30,rarity:50,skill:true}], //poison
		[B_DEMOCRITUS,{nameReal:{a:'Democritus',b:'デモクリトス'},symbol:'?',color:SHADOW2,priceReal:5000,
			list:{a:SHORT_TELEPORTATION,b:TELEPORTATION,c:TELEPORT_AWAY,d:DISINTEGRATION},
			lvl:30,rarity:70,skill:true}], //atom
	]),
	food:new Map([
		[F_RATION,{nameReal:{a:'Ration',b:'レーション'},nameSkill:SATISFY_HUNGER,skillLvl:20,symbol:':',color:BROWN,priceReal:50,shop:true,
			lvl:1,rarity:0}],
	]),
	potion:new Map([
		[P_POISON,{nameReal:{a:'Poison',b:'毒'},nameSkill:POISON,skillLvl:1,symbol:'!',priceReal:1,
			lvl:1,rarity:0}],
		[P_CONFUSION,{nameReal:{a:'Confusion',b:'混乱'},nameSkill:CONFUSION,skillLvl:3,symbol:'!',priceReal:1,
			lvl:1,rarity:0}],
		[P_PARALYSIS,{nameReal:{a:'Paralysis',b:'麻痺'},nameSkill:PARALYSIS,skillLvl:3,symbol:'!',priceReal:1,
			lvl:3,rarity:0}],
		[P_SLEEP,{nameReal:{a:'Sleep',b:'眠り'},nameSkill:SLEEP,skillLvl:3,symbol:'!',priceReal:1,
			lvl:3,rarity:0}],
		[P_BLINDNESS,{nameReal:{a:'Blindness',b:'盲目'},nameSkill:BLINDNESS,skillLvl:3,symbol:'!',priceReal:1,
			lvl:3,rarity:0}],
		[P_DISEASE,{nameReal:{a:'Disease',b:'病気'},nameSkill:INFECTION,skillLvl:3,symbol:'!',priceReal:1,
			lvl:5,rarity:0}],
		[P_HALLUCINATION,{nameReal:{a:'Hallucination',b:'幻覚'},nameSkill:HALLUCINATION,skillLvl:10,symbol:'!',priceReal:1,
			lvl:5,rarity:0}],
		[P_SLOWNESS,{nameReal:{a:'Slowness',b:'鈍足'},nameSkill:SLOW,skillLvl:10,symbol:'!',priceReal:1,
			lvl:5,rarity:0}],
		[P_CANCELLATION,{nameReal:{a:'Cancellation',b:'封印'},nameSkill:CANCELLATION,skillLvl:10,symbol:'!',priceReal:1,
			lvl:10,rarity:0}],
		[P_WEAKNESS,{nameReal:{a:'Weakness',b:'薄弱'},nameSkill:WEAKNESS,skillLvl:1,symbol:'!',priceReal:1,
			lvl:10,rarity:0}],
		[P_CLUMSINESS,{nameReal:{a:'Clumsiness',b:'不器用'},nameSkill:CLUMSINESS,skillLvl:1,symbol:'!',priceReal:1,
			lvl:10,rarity:0}],
		[P_SICKLINESS,{nameReal:{a:'Sickliness',b:'病弱'},nameSkill:SICKLINESS,skillLvl:1,symbol:'!',priceReal:1,
			lvl:10,rarity:0}],
		[P_STUPIDITY,{nameReal:{a:'Stupidity',b:'愚鈍'},nameSkill:STUPIDITY,skillLvl:1,symbol:'!',priceReal:1,
			lvl:10,rarity:0}],
		[P_HEALING,{nameReal:{a:'Healing',b:'回復'},nameSkill:HEAL,skillLvl:10,symbol:'!',priceReal:50,shop:true,
			lvl:1,rarity:0}],
		[P_EXTRA_HEALING,{nameReal:{a:'Extra Healing',b:'特大回復'},nameSkill:EXTRA_HEAL,skillLvl:10,symbol:'!',priceReal:200,
			lvl:15,rarity:30}],
		[P_RESTORE_STRENGTH,{nameReal:{a:'Restore Strength',b:'筋力復活'},nameSkill:RESTORE_STRENGTH,skillLvl:10,symbol:'!',priceReal:100,shop:true,
			lvl:10,rarity:0}],
		[P_RESTORE_DEXTERITY,{nameReal:{a:'Restore Dexterity',b:'器用さ復活'},nameSkill:RESTORE_DEXTERITY,skillLvl:10,symbol:'!',priceReal:100,shop:true,
			lvl:10,rarity:0}],
		[P_RESTORE_CONSTITUTION,{nameReal:{a:'Restore Constitution',b:'耐久力復活'},nameSkill:RESTORE_CONSTITUTION,skillLvl:10,symbol:'!',priceReal:100,shop:true,
			lvl:10,rarity:0}],
		[P_RESTORE_INTELLIGENCE,{nameReal:{a:'Restore Intelligence',b:'知力復活'},nameSkill:RESTORE_INTELLIGENCE,skillLvl:10,symbol:'!',priceReal:100,shop:true,
			lvl:10,rarity:0}],
		[P_RESTORE_ALL,{nameReal:{a:'Restore All',b:'全復活'},nameSkill:RESTORE_ALL,skillLvl:10,symbol:'!',priceReal:1000,
			lvl:20,rarity:50}],
		[P_RESIST_FIRE,{nameReal:{a:'Resist Fire',b:'耐火'},nameSkill:RESIST_FIRE,skillLvl:20,symbol:'!',priceReal:100,
			lvl:1,rarity:0}],
		[P_RESIST_WATER,{nameReal:{a:'Resist Water',b:'耐水'},nameSkill:RESIST_WATER,skillLvl:20,symbol:'!',priceReal:100,
			lvl:1,rarity:0}],
		[P_RESIST_AIR,{nameReal:{a:'Resist Air',b:'耐風'},nameSkill:RESIST_AIR,skillLvl:20,symbol:'!',priceReal:100,
			lvl:1,rarity:0}],
		[P_RESIST_EARTH,{nameReal:{a:'Resist Earth',b:'耐土'},nameSkill:RESIST_EARTH,skillLvl:20,symbol:'!',priceReal:100,
			lvl:1,rarity:0}],
		[P_RESIST_POISON,{nameReal:{a:'Resist Poison',b:'耐毒'},nameSkill:RESIST_POISON,skillLvl:20,symbol:'!',priceReal:100,
			lvl:1,rarity:0}],
		[P_RESIST_ALL,{nameReal:{a:'Resist All',b:'耐性'},nameSkill:RESIST_ALL,skillLvl:20,symbol:'!',priceReal:500,
			lvl:20,rarity:50}],
		[P_MANA,{nameReal:{a:'Mana',b:'魔力回復'},nameSkill:MANA,skillLvl:10,symbol:'!',priceReal:100,shop:true,
			lvl:1,rarity:10}],
		[P_SPEED,{nameReal:{a:'Speed',b:'速度'},nameSkill:SPEED,skillLvl:5,symbol:'!',priceReal:300,
			lvl:10,rarity:20}],
		[P_SEE_INVISIBLE,{nameReal:{a:'See Invisible',b:'透視'},nameSkill:SEE_INVISIBLE,skillLvl:10,symbol:'!',priceReal:1,shop:true,
			lvl:10,rarity:0}],
		[P_RAISE_LEVEL,{nameReal:{a:'Raise Level',b:'レベル上昇'},nameSkill:RAISE_LEVEL,skillLvl:1,symbol:'!',priceReal:5000,
			lvl:20,rarity:99}],
		[P_ENLIGHTENMENT,{nameReal:{a:'Enlightenment',b:'啓蒙'},nameSkill:ENLIGHTENMENT,skillLvl:10,symbol:'!',priceReal:500,
			lvl:20,rarity:50}],
		[P_Lower_Resist,{nameReal:{a:'Lower Resist',b:'耐性低下'},nameSkill:LOWER_RESIST,skillLvl:20,symbol:'!',priceReal:1,
			lvl:25,rarity:20}],
		[P_CURE_ALL,{nameReal:{a:'Cure All',b:'全治療'},nameSkill:CURE_ALL,skillLvl:10,symbol:'!',priceReal:1000,
			lvl:25,rarity:50}],
		[P_RESTORE_EXPERIENCE,{nameReal:{a:'Restore Experience',b:'経験値復活'},nameSkill:RESTORE_EXPERIENCE,skillLvl:10,symbol:'!',priceReal:200,shop:true,
			lvl:15,rarity:0}],
		[P_LETHE,{nameReal:{a:'Lethe',b:'レテ'},nameSkill:RESPEC,skillLvl:10,symbol:'!',color:WHITE,type2:'water',priceReal:1,lethe:true,
			lvl:10,rarity:80}],
	]),
	scroll:new Map([
		[S_SHORT_TELEPORTATION,{nameReal:{a:'Short Teleportation',b:'ショート・テレポート'},nameSkill:SHORT_TELEPORTATION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:1,rarity:0}],
		[S_TELEPORTATION,{nameReal:{a:'Teleportation',b:'テレポート'},nameSkill:TELEPORTATION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:1,rarity:0}],
		[S_REMOVE_CURSE,{nameReal:{a:'Remove Curse',b:'解呪'},nameSkill:REMOVE_CURSE,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:1,rarity:0}],
		[S_IDENTIFY,{nameReal:{a:'Identify',b:'識別'},nameSkill:IDENTIFY,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:1,rarity:0}],
		[S_MONSTER_DETECTION,{nameReal:{a:'Monster Detection',b:'モンスター感知'},nameSkill:MONSTER_DETECTION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:5,rarity:0}],
		[S_ITEM_DETECTION,{nameReal:{a:'Item Detection',b:'アイテム感知'},nameSkill:ITEM_DETECTION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:10,rarity:0}],
		[S_MAGIC_MAPPING,{nameReal:{a:'Magic Mapping',b:'魔法地図'},nameSkill:MAGIC_MAPPING,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:15,rarity:0}],
		[S_TOWN_PORTAL,{nameReal:{a:'Town Portal',b:'タウン・ポータル'},nameSkill:TOWN_PORTAL,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:5,rarity:0}],
		[S_TOUCH_CONFUSION,{nameReal:{a:'Touch of Confusion',b:'混乱の手'},nameSkill:TOUCH_OF_CONFUSION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:10,rarity:0}],
		[S_HOLD_MONSTER,{nameReal:{a:'Hold Monster',b:'モンスター束縛'},nameSkill:HOLD_MONSTER,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,
			lvl:10,rarity:20}],
		[S_AGGRAVATE_MONSTER,{nameReal:{a:'Aggravate Monster',b:'反感'},nameSkill:SCREAM,skillLvl:10,symbol:'?',color:WHITE,priceReal:1,
			lvl:1,rarity:0}],
		[S_CREATE_MONSTER,{nameReal:{a:'Create Monster',b:'モンスター生成'},nameSkill:CREATE_MONSTER,skillLvl:10,symbol:'?',color:WHITE,priceReal:1,
			lvl:5,rarity:0}],
		[S_CREATE_MAGIC_MONSTER,{nameReal:{a:'Create Magic Monster',b:'マジック・モンスター生成'},nameSkill:CREATE_MAGIC_MONSTER,skillLvl:10,symbol:'?',color:WHITE,priceReal:1,
			lvl:20,rarity:50}],
		[S_CREATE_TRAP,{nameReal:{a:'Create Trap',b:'トラップ生成'},nameSkill:CREATE_TRAP,skillLvl:10,symbol:'?',color:WHITE,priceReal:1,
			lvl:3,rarity:0}],
		[S_RESTORE_DURABILITY,{nameReal:{a:'Restore Durability',b:'耐久度復活'},nameSkill:RESTORE_DURABILITY,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:10,rarity:0}],
		[S_REPAIR_ALL,{nameReal:{a:'Repair All',b:'全修復'},nameSkill:REPAIR_ALL,skillLvl:10,symbol:'?',color:WHITE,priceReal:300,
			lvl:20,rarity:50}],
		[S_DISINTEGRATION,{nameReal:{a:'Disintegration',b:'分解'},nameSkill:DISINTEGRATION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,
			lvl:30,rarity:80}],
		[S_MAGIC_CIRCLE_PROTECTION,{nameReal:{a:'Magic Circle of Protection',b:'守護魔法円'},nameSkill:MAGIC_CIRCLE_OF_PROTECTION,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,
			lvl:30,rarity:50}],
		[S_LIGHT,{nameReal:{a:'Light',b:'光'},nameSkill:LIGHT,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,shop:true,
			lvl:1,rarity:0}],
		[S_SPIDERWEB,{nameReal:{a:'Spiderweb',b:'スパイダー・ウェブ'},nameSkill:GRAVITATIONAL_FIELD,skillLvl:10,symbol:'?',color:WHITE,priceReal:60,
			lvl:20,rarity:30}],
		[S_EARTHQUAKE,{nameReal:{a:'Earthquake',b:'地震'},nameSkill:EARTHQUAKE,skillLvl:20,symbol:'?',color:WHITE,priceReal:200,
			lvl:20,rarity:30}],
	]),
	wand:new Map([
		[W_TELEPORT_AWAY,{nameReal:{a:'Teleport Away',b:'テレポート・アウェイ'},nameSkill:TELEPORT_AWAY,skillLvl:10,symbol:'-',priceReal:500,
			lvl:10,rarity:0}],
		[W_STONE_MUD,{nameReal:{a:'Stone to Mud',b:'岩石溶解'},nameSkill:STONE_TO_MUD,skillLvl:10,symbol:'-',priceReal:600,shop:true,
			lvl:1,rarity:0}],
		[W_FIRE_BOLT,{nameReal:{a:'Fire Bolt',b:'ファイア・ボルト'},nameSkill:FIRE_BOLT,skillLvl:10,symbol:'-',priceReal:400,shop:true,
			lvl:1,rarity:0}],
		[W_LIGHTNING,{nameReal:{a:'Lightning',b:'ライトニング'},nameSkill:LIGHTNING,skillLvl:10,symbol:'-',priceReal:400,shop:true,
			lvl:5,rarity:50}],
		[W_ICE_BOLT,{nameReal:{a:'Ice Bolt',b:'アイス・ボルト'},nameSkill:ICE_BOLT,skillLvl:10,symbol:'-',priceReal:400,shop:true,
			lvl:10,rarity:50}],
		[W_HASTE_MONSTER,{nameReal:{a:'Haste Monster',b:'モンスター加速'},nameSkill:SPEED,skillLvl:10,symbol:'-',priceReal:1, //
			lvl:1,rarity:0}],
		[W_INVISIBILITY,{nameReal:{a:'Invisibility',b:'透明'},nameSkill:INVISIBILITY,skillLvl:10,symbol:'-',priceReal:100, //
			lvl:10,rarity:0}],
		[W_POLYMORPH,{nameReal:{a:'Polymorph',b:'変容'},nameSkill:POLYMORPH,skillLvl:10,symbol:'-',priceReal:100, //
			lvl:15,rarity:0}],
		[W_SLOW_MONSTER,{nameReal:{a:'Slow Monster',b:'スロー・モンスター'},nameSkill:SLOW,skillLvl:10,symbol:'-',priceReal:100,
			lvl:1,rarity:0}],
		[W_CANCELLATION,{nameReal:{a:'Cancellation',b:'封印'},nameSkill:CANCELLATION,skillLvl:10,symbol:'-',priceReal:100, //
			lvl:20,rarity:80}],
		[W_TELEPORT_TO,{nameReal:{a:'Teleport To',b:'引き寄せ'},nameSkill:TELEPORT_TO,skillLvl:10,symbol:'-',priceReal:100, //
			lvl:5,rarity:0}],
		[W_Lower_Resist,{nameReal:{a:'Lower Resist',b:'耐性低下'},nameSkill:LOWER_RESIST,skillLvl:20,symbol:'-',priceReal:100, //
			lvl:30,rarity:80}],
	]),
	melee:new Map([
		//sword
		[M_KNIFE,{name:{a:'Knife',b:'ナイフ'},nameReal:{a:'Knife',b:'ナイフ'},symbol:'|',shop:true,
			lvl:1,rarity:0,iasBase:-10,volumeRate:0.3,atkType:AT_S|AT_T,edge:1,
			material:M_WOOD|M_BONE}],
		[M_DAGGER,{name:{a:'Dagger',b:'短剣'},nameReal:{a:'Dagger',b:'短剣'},symbol:'|',shop:true,
			lvl:1,rarity:0,iasBase:-10,volumeRate:0.3,atkType:AT_S|AT_T,edge:2,
			material:M_STONE|M_METAL}],
		[M_SWORD,{name:{a:'Sword',b:'剣'},nameReal:{a:'Sword',b:'剣'},symbol:'|',shop:true,
			lvl:10,rarity:10,iasBase:0,volumeRate:1,atkType:AT_S,edge:2,
			material:M_METAL|M_STONE}],
		//polearm	
		[M_SPEAR,{name:{a:'Spear',b:'槍'},nameReal:{a:'Spear',b:'槍'},symbol:'/',shop:true,
			lvl:1,rarity:0,iasBase:0,volumeRate:1,atkType:AT_T,
			material:M_METAL}],
		//misc	
		[M_CLUB,{name:{a:'Club',b:'棍棒'},nameReal:{a:'Club',b:'棍棒'},symbol:'￥',shop:true,
			lvl:1,rarity:0,iasBase:0,volumeRate:0.6,atkType:AT_B,
			material:M_WOOD|M_BONE}],
		[M_AXE,{name:{a:'Axe',b:'斧'},nameReal:{a:'Axe',b:'斧'},symbol:'/',shop:true,
			lvl:5,rarity:5,iasBase:10,volumeRate:2,atkType:AT_S,edge:1,
			material:M_METAL}],
		[M_TWO_HANDED_AXE,{name:{a:'Two-handed Axe',b:'両手斧'},nameReal:{a:'Two-handed Axe',b:'両手斧'},symbol:'/',
			lvl:5,rarity:5,iasBase:15,volumeRate:3,atkType:AT_S,twoHanded:true,edge:1,
			material:M_METAL}],
		[M_PICK,{name:{a:'Pick',b:'ピック'},nameReal:{a:'Pick',b:'ピック'},symbol:'￥',shop:true,
			lvl:20,rarity:20,iasBase:5,volumeRate:1,atkType:AT_T,digging:1,
			material:M_METAL}],
		[M_MAUL,{name:{a:'Maul',b:'大木槌'},nameReal:{a:'Maul',b:'大木槌'},symbol:'￥',shop:true,
			lvl:20,rarity:20,iasBase:20,volumeRate:4,atkType:AT_B,twoHanded:true,
			material:M_WOOD}],
		[M_TWO_HANDED_HAMMER,{name:{a:'Two-handed Hammer',b:'両手槌'},nameReal:{a:'Two-handed Hammer',b:'両手槌'},symbol:'￥',
			lvl:20,rarity:20,iasBase:20,volumeRate:4,atkType:AT_B,twoHanded:true,
			material:M_METAL|M_STONE}],
	]),
	missile:new Map([
		[M_SLING,{name:{a:'Sling',b:'スリング'},nameReal:{a:'Sling',b:'スリング'},symbol:'}',throwType:'sling',shop:true,
			lvl:1,rarity:0,iasBase:0,volumeRate:0.5,atkType:AT_B,
			material:M_SKIN}],
		[M_STAFF_SLING,{name:{a:'Staff Sling',b:'棒スリング'},nameReal:{a:'Staff Sling',b:'棒スリング'},symbol:'}',throwType:'sling',shop:true,
			lvl:1,rarity:0,iasBase:5,volumeRate:0.8,atkType:AT_B,
			material:M_WOOD}],
		[M_BOW,{name:{a:'Bow',b:'弓'},nameReal:{a:'Bow',b:'弓'},symbol:'}',throwType:'bow',shop:true,
			lvl:1,rarity:0,iasBase:-10,volumeRate:0.5,atkType:AT_T,twoHanded:true,
			material:M_WOOD|M_BONE}],
		[M_CROSSBOW,{name:{a:'Crossbow',b:'クロスボウ'},nameReal:{a:'Crossbow',b:'クロスボウ'},symbol:'}',throwType:'crossbow',shop:true,
			lvl:1,rarity:0,iasBase:5,volumeRate:1.5,atkType:AT_T,twoHanded:true,
			material:M_WOOD|M_METAL}],
	]),
	staff:new Map([
		[S_STICK,{name:{a:'Stick',b:'スティック'},nameReal:{a:'Stick',b:'スティック'},symbol:'_',shop:true,
			lvl:1,rarity:0,fcrBase:-10,volumeRate:0.5,atkType:AT_B,
			material:M_WOOD}], 
		[S_ROD,{name:{a:'Rod',b:'ロッド'},nameReal:{a:'Rod',b:'ロッド'},symbol:'_',shop:true,
			lvl:1,rarity:0,fcrBase:-10,volumeRate:0.5,atkType:AT_B,
			material:M_METAL}], 
		[S_STAFF,{name:{a:'Staff',b:'杖'},nameReal:{a:'Staff',b:'杖'},symbol:'_',shop:true,
			lvl:1,rarity:0,fcrBase:-15,volumeRate:1,atkType:AT_B,twoHanded:true,
			material:M_WOOD}], 
		]),
	shield:new Map([
		[S_SHIELD,{name:{a:'Shield',b:'盾'},nameReal:{a:'Shield',b:'盾'},symbol:')',shop:true,
			lvl:1,rarity:0,volumeRate:1,
			material:M_SKIN|M_SCALE|M_METAL|M_BONE|M_WOOD|M_STONE|M_SHELL}],
	]),
	armor:new Map([
		[A_ROBE,{name:{a:'Robe',b:'ローブ'},nameReal:{a:'Robe',b:'ローブ'},symbol:'[',shop:true,
			lvl:1,rarity:0,volumeRate:0.5,
			material:M_CLOTH|M_FEATHER}],
		[A_VESTMENT,{name:{a:'Vestment',b:'法衣'},nameReal:{a:'Vestment',b:'法衣'},symbol:'[',
			lvl:1,rarity:0,volumeRate:0.6,
			material:M_CLOTH|M_SKIN||M_GEM}],
		[A_VEST,{name:{a:'Vest',b:'ベスト'},nameReal:{a:'Vest',b:'ベスト'},symbol:'[',shop:true,
			lvl:1,rarity:0,volumeRate:0.8,
			material:M_FUR|M_SKIN}],
		[A_ARMOR,{name:{a:'Armor',b:'鎧'},nameReal:{a:'Armor',b:'鎧'},symbol:'[',shop:true,
			lvl:1,rarity:0,volumeRate:1,
			material:M_SCALE|M_PLATING|M_BONE||M_SHELL}],
		[A_SPLINT_MAIL,{name:{a:'Splint Mail',b:'小札鎧'},nameReal:{a:'Splint Mail',b:'小札鎧'},symbol:'[',shop:true,
			lvl:1,rarity:0,volumeRate:1.2,
			material:M_METAL|M_WOOD}],
		[A_PLATE_MAIL,{name:{a:'Plate Mail',b:'板金鎧'},nameReal:{a:'Plate Mail',b:'板金鎧'},symbol:'[',shop:true,
			lvl:1,rarity:0,volumeRate:1.5,
			material:M_METAL|M_STONE}],
		]),
	cloak:new Map([
		[C_COAT,{name:{a:'Mantle',b:'マント'},nameReal:{a:'Mantle',b:'マント'},symbol:'(',shop:true,
			lvl:1,rarity:0,volumeRate:0.8,
			material:M_FEATHER|M_SCALE}],
		[C_CLOAK,{name:{a:'Coat',b:'コート'},nameReal:{a:'Coat',b:'コート'},symbol:'(',shop:true,
			lvl:1,rarity:0,volumeRate:1,
			material:M_FUR|M_SKIN}],
		[C_MANTLE,{name:{a:'Cloak',b:'クローク'},nameReal:{a:'Cloak',b:'クローク'},symbol:'(',shop:true,
			lvl:1,rarity:0,volumeRate:1.2,
			material:M_CLOTH}],
		]),
	belt:new Map([
		[B_SASH,{name:{a:'Sash',b:'腰帯'},nameReal:{a:'Sash',b:'腰帯'},symbol:'~',shop:true,
			lvl:1,rarity:0,numBoxes:1,volumeRate:0.5,
			material:M_CLOTH|M_FEATHER|M_FUR}],
		[B_BELT,{name:{a:'Belt',b:'ベルト'},nameReal:{a:'Belt',b:'ベルト'},symbol:'~',shop:true,
			lvl:1,rarity:0,numBoxes:1,volumeRate:1,
			material:M_SKIN|M_SCALE|M_PLATING|M_BONE}],
		]),
	helm:new Map([
		[H_CIRCLET,{name:{a:'Circlet',b:'冠'},nameReal:{a:'Circlet',b:'冠'},symbol:']',
			lvl:1,rarity:0,volumeRate:0.2,
			material:M_FEATHER|M_PLATING|M_GEM}], 
		[H_CAP,{name:{a:'Cap',b:'帽子'},nameReal:{a:'Cap',b:'帽子'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:0.5,
			material:M_CLOTH|M_FUR|M_FEATHER|M_SKIN|M_SCALE}],
		[H_CROWN,{name:{a:'Crown',b:'王冠'},nameReal:{a:'Crown',b:'王冠'},symbol:']',
			lvl:1,rarity:0,volumeRate:0.7,
			material:M_METAL|M_GEM}], 
		[H_MASK,{name:{a:'Mask',b:'仮面'},nameReal:{a:'Mask',b:'仮面'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:0.8,
			material:M_PLATING|M_WOOD|M_STONE}], 
		[H_HELM,{name:{a:'Helm',b:'兜'},nameReal:{a:'Helm',b:'兜'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:1,
			material:M_METAL|M_BONE|M_SHELL}],
	]),
	gloves:new Map([
		[G_MITTEN,{name:{a:'Mitten',b:'ミトン'},nameReal:{a:'Mitten',b:'ミトン'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:0.5,
			material:M_CLOTH|M_FUR|M_FEATHER}],
		[G_BRACER,{name:{a:'Bracer',b:'ブレイサー'},nameReal:{a:'Bracer',b:'ブレイサー'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:0.7,
			material:M_STONE|M_PLATING}],
		[G_GLOVES,{name:{a:'Gloves',b:'手袋'},nameReal:{a:'Gloves',b:'手袋'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:1,
			material:M_SKIN|M_SCALE}],
		[G_VAMBRACE,{name:{a:'Vambrace',b:'腕甲'},nameReal:{a:'Vambrace',b:'腕甲'},symbol:']',shop:true,
			lvl:1,rarity:0,volumeRate:0.8,
			material:M_BONE|M_SHELL}],
		[G_GAUNTLETS,{name:{a:'Gauntlets',b:'小手'},nameReal:{a:'Gauntlets',b:'小手'},symbol:']',shop:true,
			lvl:1,rarity:0,iasBase:10,volumeRate:1.2,
			material:M_METAL}],
	]),
	boots:new Map([
		[B_SANDALS,{name:{a:'Sandals',b:'サンダル'},nameReal:{a:'Sandals',b:'サンダル'},symbol:']',shop:true,
			lvl:1,rarity:0,frwBase:-10,volumeRate:0.5,
			material:M_CLOTH|M_FEATHER}],
		[B_SHOES,{name:{a:'Shoes',b:'短靴'},nameReal:{a:'Shoes',b:'短靴'},symbol:']',shop:true,
			lvl:1,rarity:0,frwBase:-5,volumeRate:0.7,
			material:M_FUR|M_SKIN|M_WOOD}],
		[B_BOOTS,{name:{a:'Boots',b:'靴'},nameReal:{a:'Boots',b:'靴'},symbol:']',shop:true,
			lvl:1,rarity:0,frwBase:0,volumeRate:1,
			material:M_SCALE|M_PLATING|M_BONE|M_SHELL}],
		[B_GREAVES,{name:{a:'Greaves',b:'脛当て'},nameReal:{a:'Greaves',b:'脛当て'},symbol:']',shop:true,
			lvl:1,rarity:0,frwBase:5,volumeRate:1.2,
			material:M_METAL}],
	]),
	light:new Map([
		[L_TORCH,{name:{a:'Torch',b:'松明'},nameReal:{a:'Torch',b:'松明'},symbol:'＊',shop:true,
			lvl:1,rarity:0,lighten:1,duration:5000,volumeRate:0.5,torch:true,
			material:M_WOOD}],
		[L_LAMP,{name:{a:'Lamp',b:'ランプ'},nameReal:{a:'Lamp',b:'ランプ'},symbol:'＊',shop:true,
			lvl:1,rarity:0,lighten:2,duration:10000,volumeRate:1.2,
			material:M_STONE}],
		[L_LANTHANUM,{name:{a:'Lanthanum',b:'ランタン'},nameReal:{a:'Lanthanum',b:'ランタン'},symbol:'＊',shop:true,
			lvl:1,rarity:0,lighten:3,duration:7500,volumeRate:1,
			material:M_METAL}],
	]),
	amulet:new Map([
		[A_AMULET,{name:{a:'Amulet',b:'首飾り'},nameReal:{a:'Amulet',b:'首飾り'},symbol:'"',color:ORANGE,mod:MAGIC,
			lvl:1,rarity:0,volumeRate:1,
			material:M_METAL|M_BONE|M_FEATHER}],
	]),
	ring:new Map([
		[R_RING,{name:{a:'Ring',b:'指輪'},nameReal:{a:'Ring',b:'指輪'},symbol:'=',color:RED,mod:MAGIC,
			lvl:1,rarity:0,volumeRate:1,
			material:M_METAL|M_STONE|M_GEM}],
	]),
	gem:new Map([
		[G_GEM,{nameReal:{a:'Gem',b:'ジェム'},symbol:'*',priceReal:0,
			lvl:1,rarity:0}],
	]),
	oil:new Map([
		[O_OLIVE_OIL,{nameReal:{a:'Olive Oil',b:'オリーブ油'},symbol:'!',color:YELLOW,duration:2500,weight:0.3,priceReal:30,shop:true,
			lvl:1,rarity:0}],
	]),
	ammo:new Map([
		[A_ROCK,{nameReal:{a:'Rock',b:'石'},symbol:'{',color:GRAY,throwType:'sling',weight:0.1,priceReal:1,shop:true,
			lvl:1,rarity:0}],
		[A_ARROW,{nameReal:{a:'Arrow',b:'矢'},symbol:'{',color:BROWN,throwType:'bow',weight:0.02,priceReal:1,shop:true,
			lvl:1,rarity:0}],
		[A_BOLT,{nameReal:{a:'Bolt',b:'ボルト'},symbol:'{',color:BROWN,throwType:'crossbow',weight:0.04,priceReal:2,shop:true,
			lvl:1,rarity:0}],
	]),
	coin:new Map([
		[C_COIN,{nameReal:{a:'Coin',b:'硬貨'},symbol:'$',color:YELLOW,priceReal:0,
			lvl:1,rarity:0}],
	]),
};
const itemNumsMap = (()=>{
	let nums = new Map();
	for(let key in itemTab)
		nums.set(key,enums(1,itemTab[key].size));
	return nums;
})();

const IT = Object.keys(itemTab);
IT.push('material');

const AEGIS = -1;
const itemUniqueMap = {
	melee:new Map([
	]),
	missile:new Map([
		[M_BOW,[
			{name:{a:'Pandarus',b:'パンダロス',pos:PREFIX},
				lvl:10,rarity:20,matBase:M_BONE,matId:1,
				values:{hp:30,mp:30,dmgDiceNum:1,dmgBonus:50,rateBonus:50}},
		]],
	]),
	staff:new Map([
	]),
	shield:new Map([
	]),
	armor:new Map([
	]),
	cloak:new Map([
	]),
	belt:new Map([
	]),
	helm:new Map([
	]),
	gloves:new Map([
	]),
	boots:new Map([
	]),
	light:new Map([
	]),
	ring:new Map([
	]),
	amulet:new Map([
	]),
	};

const fighterTab = {
	ants:[
		{name:{a:'Giant Ant',b:'巨蟻'},symbol:'a',color:C_ACID,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:8,rarity:0,hpRate:-2,mpRate:0,str:3,dex:2,con:3,int:1,spd:0,dmgBase:'1d2', acBase:5,dropNum:0,matRedTimes:3,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SHELL,atkType:AT_T,group:true,dmgAcid:20},
	],
	bats:[
		{name:{a:'Giant Bat',b:'大蝙蝠'},symbol:'b',color:GRAY,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:4,rarity:0,hpRate:-3,mpRate:0,str:1,dex:2,con:1,int:1,spd:5,dmgBase:'1d2', acBase:5,dropNum:0,matRedTimes:3,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_T,grow:DEX,stealLife:10},
	],
	canines:[
		{name:{a:'She-wolf',b:'雌狼'},symbol:'c',color:BROWN,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:1,rarity:0,hpRate:-2,mpRate:0,str:1,dex:2,con:1,int:1,spd:0,dmgBase:'1d3', acBase:5,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_S|AT_T,grow:DEX,frw:20},
		{name:{a:'Laelaps, the Hound of Cephalus',b:'狩人ケパロスの猟犬ラエラプス'},symbol:'c',color:BROWN,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:20,rarity:30,hpRate:-2,mpRate:0,str:10,dex:10,con:5,int:5,spd:20,dmgBase:'2d6', acBase:10,dropNum:2,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_S|AT_T}, 
	],
	felines:[
		{name:{a:'Lion',b:'獅子'},symbol:'f',color:YELLOW,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:0,mpRate:0,str:10,dex:5,con:5,int:1,spd:5,dmgBase:'2d3', acBase:10,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_S|AT_T,grow:STR},
		{name:{a:'Nemean lion',b:'ネメアの獅子'},symbol:'f',color:YELLOW,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:20,rarity:30,hpRate:0,mpRate:0,str:15,dex:10,con:10,int:5,spd:10,dmgBase:'5d3', acBase:20,dropNum:2,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_S|AT_T},
	],
	golems:[
		{name:{a:'Golem',b:'ゴーレム'},symbol:'g',color:null,race:GIANT,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:2,mpRate:0,str:10,dex:3,con:10,int:1,spd:-10,dmgBase:null, acBase:null,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_STONE,atkType:AT_B,grow:CON,volumeRate:1},
		{name:{a:'Golem',b:'ゴーレム'},symbol:'g',color:null,race:GIANT,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:10,hpRate:2,mpRate:0,str:10,dex:3,con:10,int:1,spd:0,dmgBase:null, acBase:null,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_METAL,atkType:AT_T,grow:CON,volumeRate:2},
		{name:{a:'Golem',b:'ゴーレム'},symbol:'g',color:null,race:GIANT,mod:NORMAL,grade:NORMAL,
			lvl:30,rarity:20,hpRate:2,mpRate:0,str:10,dex:3,con:10,int:1,spd:10,dmgBase:null, acBase:null,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_GEM,atkType:AT_S,grow:CON,volumeRate:3},
	],
	humanoids:[
		{name:{a:'Snake Woman',b:'蛇女'},symbol:'h',color:GREEN,mod:NORMAL,grade:NORMAL,
			lvl:8,rarity:0,hpRate:0,mpRate:0,str:3,dex:2,con:4,int:2,spd:0,dmgBase:'1d3', acBase:5,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:30,
			atkType:AT_B,atkCon:20}, 
		{name:{a:'Calypso, the Sea Goddess',b:'海の女神カリュプソ'},symbol:'h',color:BLUE,mod:UNIQUE,grade:NORMAL,
			lvl:30,rarity:30,hpRate:0,mpRate:0,str:20,dex:20,con:15,int:20,spd:15,dmgBase:'4d6', acBase:20,dropNum:4,matRedTimes:0,
			fire:0,water:50,air:0,earth:0,poison:0,
			atkType:AT_B,strSus:true,dexSus:true,conSus:true,intSus:true,
			skillProb:1/4,skill:{a:{id:ICE_BOLT,lvl:10},b:{id:HEAL,lvl:10},c:{id:AQUA_BREATH,lvl:10}}},
	],
	incubuses:[
		{name:{a:'Incubuses',b:'夢魔'},symbol:'i',color:GRAY,race:DEMON,mod:NORMAL,grade:NORMAL,
			lvl:25,rarity:0,hpRate:0,mpRate:0,str:15,dex:15,con:10,int:15,spd:10,dmgBase:'2d6', acBase:20,dropNum:2,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SKIN,atkType:AT_S,awake:true,levi:true,stealMana:50},
	],
	mimics:[
		{name:{a:'Mimic',b:'ミミック'},symbol:'m',color:BROWN,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:0,mpRate:0,str:5,dex:5,con:1,int:1,spd:0,dmgBase:'3d4', acBase:10,dropNum:1,matRedTimes:1,
			fire:0,water:0,air:0,earth:0,poison:0,
			atkType:AT_B,mimic:true,stillness:true,awake:true,},
	],
	persons:[
		{name:{a:'Warrior',b:'戦士'},symbol:'p',color:BROWN,race:HUMAN,mod:NORMAL,grade:NORMAL,
			lvl:6,rarity:0,hpRate:1,mpRate:0,str:3,dex:3,con:3,int:1,spd:0,dmgBase:'1d1', acBase:10,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,grow:STR,
			starter:[{type:'melee',tabId:M_CLUB},{type:'armor',tabId:A_ARMOR}]},
		{name:{a:'Hunter',b:'狩人'},symbol:'p',color:RED,race:HUMAN,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:0,mpRate:0,str:2,dex:5,con:1,int:3,spd:0,dmgBase:'1d1', acBase:3,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,grow:DEX,
			starter:[{type:'missile',tabId:M_BOW},{type:'ammo',tabId:A_ARROW},{type:'armor',tabId:A_VEST},{type:'melee',tabId:M_KNIFE,side:'a'}]},
		{name:{a:'Magus',b:'魔術師'},symbol:'p',color:PURPLE,race:HUMAN,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:-2,mpRate:2,str:1,dex:1,con:1,int:10,spd:0,dmgBase:'1d1', acBase:1,dropNum:2,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			skillProb:1/5,skill:{a:{id:FIRE_BOLT,lvl:10},b:{id:SHORT_TELEPORTATION,lvl:1}},
			material:M_BONE,atkType:AT_B,grow:INT,
			starter:[{type:'staff',tabId:S_STAFF},{type:'armor',tabId:A_ROBE}]},
		{name:{a:'Thief',b:'盗賊'},symbol:'p',color:GRAY,race:HUMAN,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:0,hpRate:0,mpRate:0,str:5,dex:10,con:5,int:5,spd:5,dmgBase:'1d1',acBase:5,dropNum:2,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,atkStealItem:20,atkStealGold:20,stealth:25,grow:DEX,
			starter:[{type:'melee',tabId:M_DAGGER},{type:'armor',tabId:A_VEST}]},
		{name:{a:'Iros, the Beggar',b:'乞食イロス'},symbol:'p',color:BROWN,race:HUMAN,mod:UNIQUE,grade:NORMAL,
			lvl:5,rarity:30,hpRate:-2,mpRate:0,str:5,dex:5,con:5,int:5,spd:0,dmgBase:'1d1', acBase:5,dropNum:1,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,atkStealItem:20,
			starter:[{type:'armor',tabId:A_ROBE}]},
		{name:{a:'Dolon, the Spy',b:'偵察者ドロン'},symbol:'p',color:BRONZE,race:HUMAN,mod:UNIQUE,grade:NORMAL,
			lvl:10,rarity:30,hpRate:-1,mpRate:0,str:5,dex:5,con:5,int:5,spd:10,dmgBase:'1d1', acBase:10,dropNum:2,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,
			skillProb:1/10,skill:{a:{id:SHORT_TELEPORTATION,lvl:1},b:{id:TELEPORTATION,lvl:1}}},
		{name:{a:'Pandarus, the Archer of Troy',b:'トロイアの射手パンダロス'},symbol:'p',color:BRONZE,race:HUMAN,mod:UNIQUE,grade:NORMAL,
			lvl:20,rarity:30,hpRate:0,mpRate:0,str:20,dex:20,con:20,int:10,spd:10,dmgBase:'1d1', acBase:20,dropNum:4,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,dexSus:true,
			starter:[{type:'missile',tabId:M_BOW,uniqueId:0},{type:'ammo',tabId:A_ARROW},{type:'melee',tabId:M_SPEAR,side:'a'}],
			skillProb:1/8,skill:{a:{id:SHORT_TELEPORTATION,lvl:1},b:{id:PARALYZING_ARROW,lvl:5}}},
		{name:{a:'Nestor, the Knight of Gerenia',b:'ゲレニアの騎士ネストル'},symbol:'p',color:BRONZE,race:HUMAN,mod:UNIQUE,grade:NORMAL,
			lvl:30,rarity:30,hpRate:1,mpRate:0,str:15,dex:20,con:15,int:25,spd:10,dmgBase:'1d1', acBase:40,dropNum:4,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,strSus:true,dexSus:true,conSus:true,
			skillProb:1/10,skill:{a:{id:TELEPORT_TO,lvl:1},b:{id:SPEED,lvl:5}}},
		{name:{a:'Orlando, the Frenzy',b:'狂乱のオルランド'},symbol:'p',color:ORANGE,race:HUMAN,mod:UNIQUE,grade:NORMAL,
			lvl:32,rarity:30,hpRate:3,mpRate:0,str:25,dex:20,con:25,int:1,spd:10,dmgBase:'4d4', acBase:10,dropNum:4,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,strSus:true,dexSus:true,conSus:true,awake:true,ias:50,frw:50},
		],
	quadrupeds:[
		{name:{a:'Horse',b:'馬'},symbol:'q',color:ORANGE,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:3,rarity:0,hpRate:0,mpRate:0,str:2,dex:3,con:1,int:1,spd:10,dmgBase:'1d4', acBase:5,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SKIN,atkType:AT_B,frw:60,grow:DEX}, 
		{name:{a:'Rays of the Sun, the Horse of Rhesus',b:'トラキア王レソスの馬 `陽光の矢`'},symbol:'q',color:BROWN,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:10,rarity:30,hpRate:0,mpRate:0,str:5,dex:5,con:5,int:5,spd:10,dmgBase:'1d5', acBase:10,dropNum:2,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SKIN,atkType:AT_B,frw:60},
		{name:{a:'Boar',b:'猪'},symbol:'q',color:BROWN,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:2,rarity:0,hpRate:1,mpRate:0,str:2,dex:2,con:3,int:1,spd:5,dmgBase:'1d3', acBase:5,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_B,grow:CON},
		{name:{a:'Calydonian Boar',b:'カリュドーンの大猪'},symbol:'q',color:BROWN,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:20,rarity:30,hpRate:1,mpRate:0,str:20,dex:10,con:20,int:10,spd:10,dmgBase:'2d5', acBase:20,matRedTimes:0,
			dropNum:2,fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_B,},
	],
	skeletons:[
		{name:{a:'Skeleton',b:'スケルトン'},symbol:'s',color:null,race:UNDEAD,mod:NORMAL,grade:NORMAL,
			lvl:3,rarity:0,hpRate:-2,mpRate:0,str:1,dex:1,con:1,int:1,spd:0,dmgBase:null, acBase:null,dropNum:0,matRedTimes:3,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,volumeRate:1},
	],
	worms:[
		{name:{a:'Giant Worm',b:'大芋虫'},symbol:'w',color:WHITE,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:1,rarity:0,hpRate:-2,mpRate:0,str:1,dex:1,con:1,int:1,spd:-10,dmgBase:null, acBase:null,dropNum:0,matRedTimes:3,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_CLOTH,atkType:AT_B,group:true,atkSlow:5,volumeRate:0.5},
	],
	zombies:[
		{name:{a:'Living Bush',b:'生ける繁み'},symbol:'z',color:GRAY,race:UNDEAD,mod:NORMAL,grade:NORMAL,
			lvl:5,rarity:0,hpRate:-4,mpRate:0,str:1,dex:1,con:1,int:1,spd:-10,dmgBase:null, acBase:null,dropNum:0,matRedTimes:3,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_WOOD,atkType:AT_B,group:true,atkInf:5,volumeRate:0.5},
	],
	angels:[
		{name:{a:'Fallen Angel',b:'堕天使'},symbol:'A',color:SHADOW,race:DEMON,mod:NORMAL,grade:NORMAL,
			lvl:25,rarity:0,hpRate:1,mpRate:2,str:10,dex:10,con:10,int:20,spd:10,dmgBase:'3d5', acBase:30,dropNum:2,matRedTimes:1,
			fire:50,water:0,air:30,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_B,levi:true,
			skillProb:1/5,skill:{a:{id:HEAL,lvl:10},b:{id:SPEED,lvl:10},c:{id:BLESSING,lvl:10}}},
		],
	birds:[
		{name:{a:'Eagle',b:'鷲'},symbol:'B',color:SHADOW,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:1,rarity:0,hpRate:-3,mpRate:0,str:1,dex:5,con:1,int:1,spd:5,dmgBase:'1d2', acBase:1,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:30,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_S|AT_T,levi:true,grow:DEX},
		{name:{a:'Aedon, the Nightingale',b:'夜鶯アエドン'},symbol:'B',color:SHADOW,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:15,rarity:30,hpRate:-3,mpRate:0,str:8,dex:10,con:8,int:5,spd:10,dmgBase:'2d5', acBase:10,dropNum:3,matRedTimes:0,
			fire:0,water:0,air:30,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_S|AT_T,levi:true,awake:true,
			skillProb:1/8,skill:{a:{id:WIND_BREATH,lvl:5},b:{id:SCREAM,lvl:5}}},
		{name:{a:'Nisos, the White-tailed Eagle',b:'尾白鷲ニソス'},symbol:'B',color:SHADOW,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:25,rarity:30,hpRate:-3,mpRate:0,str:10,dex:20,con:10,int:10,spd:20,dmgBase:'2d5', acBase:10,dropNum:4,matRedTimes:0,
			fire:0,water:0,air:30,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_S|AT_T,levi:true,ias:25,frw:50},
	],
	chimeras:[
		{name:{a:'Chimera',b:'キメラ'},symbol:'C',color:null,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:-1,mpRate:0,str:2,dex:5,con:2,int:2,spd:10,dmgBase:null, acBase:null,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SKIN,atkType:AT_T,volumeRate:1},
		{name:{a:'Chimera',b:'キメラ'},symbol:'C',color:null,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:10,hpRate:-1,mpRate:0,str:2,dex:5,con:2,int:2,spd:10,dmgBase:null, acBase:null,dropNum:1,matRedTimes:2,
			fire:0,water:20,air:0,earth:0,poison:0,
			material:M_FUR,atkType:AT_B,volumeRate:1.5},
		{name:{a:'Chimera',b:'キメラ'},symbol:'C',color:null,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:30,rarity:20,hpRate:-1,mpRate:0,str:2,dex:5,con:2,int:2,spd:20,dmgBase:null, acBase:null,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:20,earth:0,poison:0,
			levi:true,
			material:M_FEATHER,atkType:AT_S,volumeRate:2},
	],
	dragons:[
		{name:{a:'Dragon',b:'竜'},symbol:'D',color:GREEN,race:DRAGON,mod:MAGIC,grade:NORMAL,
			lvl:20,rarity:0,hpRate:2,mpRate:1,str:15,dex:10,con:15,int:15,spd:5,dmgBase:'2d5',acBase:40,dropNum:4,matRedTimes:1,
			fire:20,water:20,air:20,earth:20,poison:20,
			material:M_SCALE|M_BONE,atkType:AT_S|AT_T|AT_B,grow:CON},
		{name:{a:'Dragon, the Never-sleeping',b:'眠らずの竜'},symbol:'D',color:GREEN,race:DRAGON,mod:UNIQUE,grade:NORMAL,
			lvl:30,rarity:30,hpRate:2,mpRate:1,str:15,dex:15,con:20,int:10,spd:10,dmgBase:'5d5',acBase:50,dropNum:6,matRedTimes:0,
			fire:10,water:10,air:10,earth:10,poison:100,
			material:M_SCALE,atkType:AT_S|AT_T|AT_B,conSus:true,awake:true,
			skillProb:1/5,skill:{a:{id:POISON_BREATH,lvl:10}}},
	],
	elementals:[
		{name:{a:'Elemental',b:'精霊'},symbol:'E',color:WHITE,race:SPIRIT,mod:MAGIC,grade:NORMAL,
			lvl:5,rarity:0,hpRate:-4,mpRate:1,str:1,dex:1,con:1,int:5,spd:0,dmgBase:'1d4',acBase:5,dropNum:0,matRedTimes:2,
			fire:30,water:30,air:30,earth:30,poison:30,
			atkType:AT_S,moveRnd:true},
	],
	fairies:[
		{name:{a:'Fairy',b:'妖精'},symbol:'F',color:LIME,race:SPIRIT,mod:NORMAL,grade:NORMAL,
			lvl:6,rarity:0,hpRate:-3,mpRate:0,str:1,dex:5,con:1,int:3,spd:10,dmgBase:'1d1', acBase:5,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_S,levi:true,moveRnd:true,atkStealGold:25,grow:DEX},
	],
	ghosts:[
		{name:{a:'Phantom',b:'亡者'},symbol:'G',color:SKY_BLUE,race:UNDEAD,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:-3,mpRate:0,str:3,dex:5,con:2,int:3,spd:0,dmgBase:'1d3', acBase:1,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			atkType:AT_B,invisible:true,levi:true,moveRnd:true},
],
	hybrids:[
		{name:{a:'Harpy',b:'ハーピー'},symbol:'H',color:SKY_BLUE,race:HUMAN|ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:9,rarity:0,hpRate:-1,mpRate:0,str:2,dex:5,con:2,int:2,spd:10,dmgBase:'2d2', acBase:10,dropNum:1,matRedTimes:2,
			fire:0,water:0,air:30,earth:0,poison:0,
			material:M_FEATHER,atkType:AT_S|AT_T,levi:true,grow:DEX,
			skillProb:1/10,skill:{a:{id:SCREAM,lvl:5}}},
		{name:{a:'Centaur',b:'ケンタウロス'},symbol:'H',color:YELLOW,race:HUMAN|ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:0,hpRate:1,mpRate:0,str:10,dex:15,con:10,int:5,spd:10,dmgBase:'3d5', acBase:20,dropNum:3,matRedTimes:1,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,dexSus:true,grow:DEX,
			starter:[{type:'missile',tabId:M_BOW},{type:'ammo',tabId:A_ARROW}]},
		{name:{a:'Minotaur',b:'ミノタウロス'},symbol:'H',color:ORANGE,race:HUMAN|ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:25,rarity:0,hpRate:2,mpRate:0,str:20,dex:10,con:15,int:3,spd:10,dmgBase:'4d5', acBase:20,dropNum:3,matRedTimes:1,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_B,strSus:true,grow:STR,
			starter:[{type:'melee',tabId:M_TWO_HANDED_AXE}]},
	],
	nymphs:[
		{name:{a:'Nymph',b:'ニンフ'},symbol:'N',color:OLIVE,race:SPIRIT,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:-2,mpRate:1,str:2,dex:5,con:3,int:3,spd:5,dmgBase:'1d2', acBase:1,dropNum:1,matRedTimes:2,
			fire:1,water:0,air:0,earth:0,poison:0,
			atkType:AT_S,moveRnd:true,atkStealItem:25},
		],
	snakes:[
		{name:{a:'Serpent',b:'大蛇'},symbol:'J',color:PURPLE,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:3,rarity:0,hpRate:-2,mpRate:0,str:1,dex:2,con:1,int:1,spd:0,dmgBase:'1d2', acBase:5,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:30,
			material:M_SCALE,atkType:AT_T,dmgPoison:10},
		{name:{a:'Amphisbaena,the Serpent of the Two-headed',b:'双頭の大蛇`アンフィスバエナ`'},symbol:'J',color:PURPLE,race:ANIMAL,mod:UNIQUE,grade:NORMAL,
			lvl:20,rarity:30,hpRate:-2,mpRate:0,str:10,dex:10,con:5,int:5,spd:10,dmgBase:'2d8', acBase:10,dropNum:2,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:50,
			material:M_SCALE,atkType:AT_T,dmgPoison:50,
			skillProb:1/6,skill:{a:{id:POISON_BREATH,lvl:5}}},
	],
	multiheads:[
		{name:{a:'Hydra',b:'ヒュドラ'},symbol:'M',color:GREEN,mod:NORMAL,grade:NORMAL,
			lvl:28,rarity:0,hpRate:2,mpRate:0,str:15,dex:15,con:25,int:10,spd:0,dmgBase:'2d5',acBase:20,dropNum:2,matRedTimes:1,
			fire:-30,water:0,air:0,earth:0,poison:50,
			material:M_SCALE,atkType:AT_T|AT_B,hpReg:100,ias:25,dmgPoison:25,grow:CON,
			skillProb:1/8,skill:{a:{id:POISON_BREATH,lvl:10}}},
		{name:{a:'Scylla, the Sea-monster',b:'海の怪物スキュラ'},symbol:'M',olor:GREEN,mod:UNIQUE,grade:NORMAL,
			lvl:30,rarity:80,hpRate:5,mpRate:0,str:20,dex:20,con:30,int:10,spd:0,dmgBase:'2d10',acBase:20,dropNum:4,matRedTimes:0,
			fire:0,water:50,air:0,earth:50,poison:50,
			atkType:AT_T|AT_B,hpReg:100,ias:25,dmgPoison:25,
			skillProb:1/10,skill:{a:{id:AQUA_BREATH,lvl:10}}},
	],
	giants:[
		{name:{a:'Giant',b:'巨人'},symbol:'P',color:YELLOW,race:GIANT,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:3,mpRate:0,str:20,dex:5,con:10,int:5,spd:0,dmgBase:'5d5', acBase:30,dropNum:0,matRedTimes:1,
			fire:0,water:0,air:0,earth:50,poison:0,
			material:M_BONE,atkType:AT_B,grow:CON},
		{name:{a:'Cyclopes',b:'サイクロプス'},symbol:'P',color:ORANGE,race:GIANT,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:0,hpRate:3,mpRate:0,str:15,dex:10,con:15,int:5,spd:5,dmgBase:'4d4', acBase:30,dropNum:0,matRedTimes:1,
			fire:0,water:0,air:0,earth:50,poison:0,
			material:M_BONE,atkType:AT_B,grow:CON,
			starter:[{type:'missile',tabId:M_SLING},{type:'ammo',tabId:A_ROCK}]},
		{name:{a:'Polyphemus,the One Eyed Giant',b:'隻眼の巨人ポリュペモス'},symbol:'P',color:ORANGE,race:GIANT,mod:UNIQUE,grade:NORMAL,
			lvl:25,rarity:30,hpRate:3,mpRate:0,str:20,dex:15,con:25,int:5,spd:5,dmgBase:'6d6', acBase:30,dropNum:4,matRedTimes:0,
			fire:0,water:0,air:0,earth:50,poison:0,
			material:M_BONE,atkType:AT_B,conSus:true,
			skillProb:1/10,skill:{a:{id:CREATE_GIANT,lvl:1}}},
	],
	spiders:[
		{name:{a:'Giant Spider',b:'大蜘蛛'},symbol:'S',color:GRAY,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:-3,mpRate:0,str:3,dex:3,con:1,int:1,spd:0,dmgBase:'2d2', acBase:10,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_CLOTH,atkType:AT_T,atkSlow:20},
		{name:{a:'Giant Scorpion',b:'大サソリ'},symbol:'S',color:BROWN,race:ANIMAL,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:-3,mpRate:0,str:3,dex:3,con:1,int:1,spd:5,dmgBase:'3d1', acBase:20,dropNum:0,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			material:M_SHELL,atkType:AT_T,atkPara:10},
	],
	demons:[
		{name:{a:'Demon',b:'悪魔'},symbol:'U',color:GRAY,race:DEMON,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:0,hpRate:2,mpRate:1,str:10,dex:10,con:15,int:10,spd:10,dmgBase:'3d5', acBase:30,dropNum:2,matRedTimes:1,
			fire:50,water:0,air:0,earth:0,poison:0,
			material:M_SKIN,atkType:AT_S|AT_B,
			skillProb:1/8,skill:{a:{id:FIRE_BREATH,lvl:10},b:{id:ENCOURAGEMENT,lvl:10}}},
	],
	vampires:[
		{name:{a:'Vampire',b:'吸血鬼'},symbol:'V',color:GRAY,race:UNDEAD,mod:NORMAL,grade:NORMAL,
			lvl:15,rarity:0,hpRate:1,mpRate:1,str:8,dex:8,con:8,int:8,spd:0,dmgBase:'2d5', acBase:20,dropNum:2,matRedTimes:2,
			fire:-50,water:0,air:0,earth:0,poison:0,
			material:M_BONE,atkType:AT_T|AT_B,stealLife:50},
	],
	wraiths:[
		{name:{a:'Wraith',b:'生霊'},symbol:'W',color:GRAY,race:UNDEAD,mod:NORMAL,grade:NORMAL,
			lvl:25,rarity:0,hpRate:-1,mpRate:0,str:10,dex:10,con:5,int:10,spd:0,dmgBase:'1d6', acBase:20,dropNum:2,matRedTimes:2,
			fire:0,water:0,air:0,earth:0,poison:0,
			atkType:AT_T,atkDrain:20},
	],
	statues:[
		{name:{a:'Statue of Trap',b:'罠の像'},symbol:'%',color:null,mod:NORMAL,grade:NORMAL,
			lvl:10,rarity:0,hpRate:0,mpRate:0,str:1,dex:1,con:1,int:1,spd:0,dmgBase:null, acBase:null,dropNum:0,matRedTimes:3,
			fire:50,water:50,air:50,earth:50,poison:50,
			material:M_STONE,atkType:AT_B,stillness:true,awake:true,volumeRate:1,
			skillProb:1/8,skill:{a:{id:CREATE_TRAP,lvl:1}}},
		{name:{a:'Statue of Summon',b:'召喚の像'},symbol:'%',color:null,mod:NORMAL,grade:NORMAL,
			lvl:20,rarity:0,hpRate:0,mpRate:0,str:1,dex:1,con:1,int:1,spd:0,dmgBase:null, acBase:null,dropNum:0,matRedTimes:3,
			fire:50,water:50,air:50,earth:50,poison:50,
			material:M_STONE,atkType:AT_B,stillness:true,awake:true,volumeRate:1,
			skillProb:1/8,skill:{a:{id:CREATE_MONSTER,lvl:1}}},
		{name:{a:'Statue of Gargoyle',b:'ガーゴイルの像'},symbol:'%',color:null,race:DEMON,mod:MAGIC,grade:NORMAL,
			lvl:30,rarity:30,hpRate:2,mpRate:1,str:10,dex:10,con:10,int:10,spd:0,dmgBase:null, acBase:null,matRedTimes:2,
			dropNum:0,fire:50,water:50,air:50,earth:50,poison:50,
			material:M_STONE,atkType:AT_S,stillness:true,awake:true,volumeRate:1},
	],
	misc:[
		{name:{a:'Player',b:'プレイヤー'},symbol:'@',color:WHITE,race:HUMAN,mod:NORMAL,grade:NORMAL,
			lvl:1,rarity:0,hpRate:0,mpRate:0,str:1,dex:1,con:1,int:1,spd:0,dmgBase:'1d1', acBase:0,dropNum:0,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			atkType:AT_B,awake:true}, 
		{name:{a:'Yeti',b:'イエティ'},symbol:'Y',color:WHITE,mod:NORMAL,grade:NORMAL,
			lvl:1,rarity:0,hpRate:0,mpRate:0,str:1,dex:1,con:1,int:1,spd:0,dmgBase:'1d6', acBase:6,dropNum:0,matRedTimes:0,
			fire:0,water:0,air:0,earth:0,poison:0,
			atkType:AT_B,},
		{name:{a:'Beelzebub, the Lord of the Flies',b:'蝿の王ベルゼブブ'},symbol:'U',color:GRAY,race:DEMON,mod:UNIQUE,grade:NORMAL,boss:true,
			lvl:33,rarity:0,hpRate:5,mpRate:5,str:30,dex:30,con:30,int:30,spd:10,dmgBase:'5d5', acBase:40,dropNum:8,matRedTimes:0,
			fire:50,water:50,air:50,earth:50,poison:50,
			atkType:AT_S|AT_T|AT_B,levi:true,awake:true,dmgPoison:50,strSus:true,dexSus:true,conSus:true,intSus:true,
			skillProb:1/6,skill:{a:{id:COCYTUS,lvl:10},b:{id:POISON_BREATH,lvl:10},c:{id:INFECTION_BREATH,lvl:10},d:{id:CREATE_MAGIC_MONSTER,lvl:1}}},
	],
};
const fighterNumsMap = (()=>{
	let nums = new Map();
	for(let key in fighterTab)
		nums.set(key,enums(0,fighterTab[key].length-1));
	return nums;
})();
const FT = Object.keys(fighterTab);

const modTab = [
	new Map([//prefix
		[BIAS_FIRE,{name:{a:'Fire',b:'火炎の'},color:C_FIRE,lvl:0,rarity:0,
			melee:{dmgFire:'1d10'},missile:{dmgFire:'1d10'},staff:{dmgFire:'1d10'},
			shield:{fire:'2d10'},armor:{fire:'1d10'},
			cloak:{fire:'1d10'},belt:{fire:'1d10'},helm:{fire:'1d10'},gloves:{dmgFire:'1d10'},
			boots:{fire:'1d10'},amulet:{fire:'1d10'},ring:{fire:'1d10'},light:{fire:'1d10',lighten:1},
			gem:{fire:'1d10'},enemy:{fire:'2d10',str:1,dmgFire:'1d10'},
			affix:[
				{name:{a:'of Heat',b:'発熱の'},rarity:0},
				{name:{a:'of Fever',b:'熱狂の'},rarity:5},
				{name:{a:'of Combustion',b:'燃焼の'},rarity:10},
				{name:{a:'of Ignition',b:'発火の'},rarity:15},
				{name:{a:'of Blaze',b:'焔光の'},rarity:20},
				{name:{a:'of Flame',b:'焔の'},rarity:25},
				{name:{a:'of Flare',b:'爆炎の'},rarity:30},
				{name:{a:'of Burning',b:'灼熱の'},rarity:35},
				{name:{a:'of Inferno',b:'業火の'},rarity:40},
				{name:{a:'of Salamander',b:'サラマンダーの'},rarity:50},
				{name:{a:'of Hestia',b:'炉の女神ヘスティアの'},rarity:60},
				{name:{a:'of Hephaestus',b:'鍛冶の神ヘパイストスの'},rarity:80},
				{name:{a:'of Prometheus',b:'火神プロメテウスの'},rarity:90},
			]}],
		[BIAS_WATER,{name:{a:'Aqua',b:'水の'},color:C_WATER,lvl:0,rarity:0,
			melee:{water:'1d10'},missile:{water:'1d10'},staff:{water:'1d10'},
			shield:{water:'2d10'},armor:{water:'1d10'},
			cloak:{water:'1d10'},belt:{water:'1d10'},helm:{water:'1d10'},gloves:{water:'1d10'},
			boots:{water:'1d10'},amulet:{water:'1d10'},ring:{water:'1d10'},light:{water:'1d10'},
			gem:{water:'1d10'},enemy:{water:'2d10',int:1},
			affix:[
				{name:{a:'of Rain',b:'降雨の'},rarity:0}, 
				{name:{a:'of Lake',b:'湖の'},rarity:5}, 
				{name:{a:'of River',b:'河川の'},rarity:10}, 
				{name:{a:'of Waterfall',b:'滝の'},rarity:15}, 
				{name:{a:'of Ocean',b:'大洋の'},rarity:20}, 
				{name:{a:'of Flow',b:'流動の'},rarity:25},
				{name:{a:'of Tide',b:'潮流の'},rarity:30}, 
				{name:{a:'of Splashing',b:'飛散の'},rarity:35}, 
				{name:{a:'of Flood',b:'氾濫の'},rarity:40}, 
				{name:{a:'of Whirlpool',b:'渦潮の'},rarity:45}, 
				{name:{a:'of Undine',b:'ウィンディーネの'},rarity:50},
				{name:{a:'of Triton',b:'人魚の海神トリトンの'},rarity:60},
				{name:{a:'of Tethys',b:'水の女神テテュスの'},rarity:70},
				{name:{a:'of Achelous',b:'河神アケオロスの'},rarity:80},
				{name:{a:'of Poseidon',b:'海王ポセイドンの'},rarity:90},
			]}],
		[BIAS_AIR,{name:{a:'Air',b:'大気の'},color:C_AIR,lvl:0,rarity:0,
			melee:{air:'1d10'},missile:{air:'1d10'},staff:{air:'1d10'},
			shield:{air:'2d10'},armor:{air:'1d10'},
			cloak:{air:'1d10',levi:true},belt:{air:'1d10'},helm:{air:'1d10'},gloves:{air:'1d10'},
			boots:{air:'1d10',levi:true},amulet:{air:'1d10'},ring:{air:'1d10'},
			light:{air:'1d10'},gem:{air:'1d10'},enemy:{air:'2d10',dex:1,levi:true},
			affix:[
				{name:{a:'of Feather',b:'羽の'},rarity:0},
				{name:{a:'of Wing',b:'翼の'},rarity:5},
				{name:{a:'of Wind',b:'風の'},rarity:10},
				{name:{a:'of Drifting',b:'漂流の'},rarity:15},
				{name:{a:'of Gust',b:'突風の'},rarity:20},
				{name:{a:'of Gale',b:'疾風の'},rarity:25},
				{name:{a:'of Blast',b:'爆風の'},rarity:30},
				{name:{a:'of Vortex',b:'旋風の'},rarity:35},
				{name:{a:'of Tempest',b:'暴風の'},rarity:40},
				{name:{a:'of Cyclone',b:'大竜巻の'},rarity:45},
				{name:{a:'of Sylph',b:'シルフの'},rarity:50},
				{name:{a:'of Eurus',b:'東風エウロスの'},rarity:55},
				{name:{a:'of Zephyrus',b:'西風ゼピュロスの'},rarity:60},
				{name:{a:'of Notos',b:'南風ノトスの'},rarity:65},
				{name:{a:'of Boreas',b:'北風ボレアスの'},rarity:70},
				{name:{a:'of Aeolus',b:'風神アイオロスの'},rarity:80},
				{name:{a:'of Aether',b:'大気の神アイテルの'},rarity:90},
				//azure
			]}],
		[BIAS_EARTH,{name:{a:'Earth',b:'大地の'},color:C_EARTH,lvl:0,rarity:0,
			melee:{earth:'1d10'},missile:{earth:'1d10'},staff:{earth:'1d10'},
			shield:{earth:'2d10'},armor:{earth:'1d10'},
			cloak:{earth:'1d10'},belt:{earth:'1d10'},helm:{earth:'1d10'},gloves:{earth:'1d10'},
			boots:{earth:'1d10'},amulet:{earth:'1d10'},ring:{earth:'1d10'},light:{earth:'1d10'},
			gem:{earth:'1d10'},enemy:{earth:'2d10',con:1,acBonus:100},
			affix:[
				{name:{a:'of Rock',b:'岩の'},rarity:0},
				{name:{a:'of Ground',b:'地の'},rarity:5},
				{name:{a:'of Highland',b:'高原の'},rarity:10},
				{name:{a:'of Hill',b:'塚の'},rarity:15},
				{name:{a:'of Mountain',b:'山岳の'},rarity:20},
				{name:{a:'of Surface',b:'地表の'},rarity:25},
				{name:{a:'of Terrestrial',b:'地上の'},rarity:30},
				{name:{a:'of Gnome',b:'ノームの'},rarity:50},
				{name:{a:'of Pan',b:'山野の神パンの'},rarity:60},
				{name:{a:'of Dionysus',b:'陶酔の神デュオニュソスの'},rarity:70},
				{name:{a:'of Demeter',b:'豊穣の女神デメテルの'},rarity:80},
				{name:{a:'of Rhea',b:'大地の女神レアの'},rarity:85},
				{name:{a:'of Gaia',b:'地母神ガイアの'},rarity:90},
			]}],
		[BIAS_POISON,{name:{a:'Poison',b:'毒の'},color:C_POISON,lvl:0,rarity:0,
			melee:{dmgPoison:'1d10'},missile:{dmgPoison:'1d10'},staff:{dmgPoison:'1d10'},
			shield:{poison:'2d10'},armor:{poison:'1d10'},
			cloak:{poison:'1d10'},belt:{poison:'1d10'},helm:{poison:'1d10'},gloves:{dmgPoison:'1d10'},
			boots:{poison:'1d10'},amulet:{poison:'1d10'},ring:{poison:'1d10'},light:{poison:'1d10'},
			gem:{poison:'1d10'},enemy:{dmgPoison:'1d10',poison:'2d10'},
			affix:[
				{name:{a:'of Dirtiness',b:'不潔の'},rarity:0},
				{name:{a:'of Fraud',b:'詐欺の'},rarity:5},
				{name:{a:'of Malice',b:'悪意の'},rarity:10},
				{name:{a:'of Hatred',b:'憎悪の'},rarity:15},
				{name:{a:'of Foulness',b:'悪臭の'},rarity:20},
				{name:{a:'of Corruption',b:'堕落の'},rarity:25},
				{name:{a:'of Rot',b:'腐敗の'},rarity:30},
				{name:{a:'of Toxicity',b:'毒性の'},rarity:35},
				{name:{a:'of Venom',b:'猛毒の'},rarity:40},
				{name:{a:'of Filth',b:'不浄の'},rarity:45},
				{name:{a:'of Arachne',b:'蜘蛛の女王アラクネの'},rarity:60},
				{name:{a:'of Medusa',b:'メデューサの'},rarity:70},
				{name:{a:'of Euryale',b:'エウリュアレの'},rarity:80},
				{name:{a:'of Stheno',b:'ステンノの'},rarity:90},
				//horror
			]}],
		[BIAS_LIGHT,{name:{a:'Light',b:'光の'},color:C_LIGHT,lvl:10,rarity:30,
			melee:{dmgFire:'2d10'},missile:{dmgFire:'2d10'},staff:{skillFire:1},
			shield:{fire:'3d5'},armor:{fire:'2d5'},
			cloak:{fire:'2d5'},belt:{fire:'2d5'},helm:{fire:'2d5'},gloves:{dmgFire:'2d10'},
			boots:{fire:'2d5'},amulet:{skillFire:1},ring:{skillFire:1},light:{fire:'2d5',lighten:1},
			gem:{fire:'1d5',str:1},enemy:{fire:'3d5',skillFire:1,str:1,atkBlind:'10d2',dmgFire:'2d10'},
			affix:[
				{name:{a:'of Glow',b:'白熱の'},rarity:0}, 
				{name:{a:'of Flash',b:'閃光の'},rarity:5},
				{name:{a:'of Luminescence',b:'発光の'},rarity:10},
				{name:{a:'of Brightness',b:'光明の'},rarity:15},
				{name:{a:'of Shining',b:'光輝の'},rarity:20},
				{name:{a:'of Holiness',b:'聖なる'},rarity:25},
				{name:{a:'of Halo',b:'光輪の'},rarity:30},
				{name:{a:'of Purity',b:'清浄の'},rarity:35},
				{name:{a:'of Sanctuary',b:'聖域の'},rarity:40},
				{name:{a:'of Divinity',b:'神性の'},rarity:45},
				{name:{a:'of Sun',b:'太陽の'},rarity:50},
				{name:{a:'of Eos',b:'暁の女神エオスの'},rarity:60}, 
				{name:{a:'of Phoebe',b:'光明神ボイべの'},rarity:70}, 
				{name:{a:'of Hemera',b:'昼の女神ヘメラの'},rarity:75}, 
				{name:{a:'of Helios',b:'陽の神エエリオスの'},rarity:85},
				{name:{a:'of Hyperion',b:'太陽神ヒュペリオンの'},rarity:90},
			]}],
		[BIAS_COLD,{name:{a:'Cold',b:'冷気の'},color:C_COLD,lvl:10,rarity:30,
			melee:{atkCold:'10d2'},missile:{atkCold:'10d2'},staff:{skillWater:1},
			shield:{water:'3d5'},armor:{water:'2d5'},
			cloak:{water:'2d5'},belt:{water:'2d5'},helm:{water:'2d5'},gloves:{atkCold:'10d2'},
			boots:{water:'2d5'},amulet:{skillWater:1},ring:{skillWater:1},light:{water:'2d5'},
			gem:{water:'1d5',int:1},enemy:{water:'3d5',skillWater:1,int:1,atkCold:'10d2'},
			affix:[
				{name:{a:'of Chill',b:'寒気の'},rarity:0},
				{name:{a:'of Snowflake',b:'雪片の'},rarity:5},
				{name:{a:'of Frost',b:'霜の'},rarity:10},
				{name:{a:'of Icicle',b:'氷柱の'},rarity:15},
				{name:{a:'of Icing',b:'氷結の'},rarity:20},
				{name:{a:'of Freezing',b:'凍結の'},rarity:25},
				{name:{a:'of Iceberg',b:'氷山の'},rarity:30},
				{name:{a:'of Avalanche',b:'雪崩の'},rarity:35},
				{name:{a:'of Permafrost',b:'永久凍土の'},rarity:40},
				{name:{a:'of Cocytus',b:'コキュートスの'},rarity:50},
				{name:{a:'of Viviane',b:'湖の女王ヴィヴィアンの'},rarity:80},
				{name:{a:'of Oceanus',b:'海神オケアノスの'},rarity:90},
			]}],
		[BIAS_LIGHTNING,{name:{a:'Lightning',b:'稲妻の'},color:C_LIGHTNING,lvl:10,rarity:30,
			melee:{dmgLightning:'1d10'},missile:{dmgLightning:'1d10'},staff:{skillAir:1},
			shield:{air:'3d5'},armor:{air:'2d5'},
			cloak:{air:'2d5'},belt:{air:'2d5'},helm:{air:'2d5'},gloves:{dmgLightning:'1d10'},
			boots:{air:'2d5'},amulet:{skillAir:1},ring:{skillAir:1},light:{air:'2d5'},
			gem:{air:'1d5',dex:1},enemy:{air:'3d5',skillAir:1,dex:1,dmgLightning:'1d10'},
			affix:[
				{name:{a:'of Sky',b:'空の'},rarity:0},
				{name:{a:'of Electricity',b:'電気の'},rarity:5},
				{name:{a:'of Charge',b:'帯電の'},rarity:10},
				{name:{a:'of Discharge',b:'放電の'},rarity:15},
				{name:{a:'of Spark',b:'煌きの'},rarity:20},
				{name:{a:'of Potential',b:'電位の'},rarity:25},
				{name:{a:'of Voltage',b:'電圧の'},rarity:30},
				{name:{a:'of Power',b:'電力の'},rarity:35},
				{name:{a:'of Thunder',b:'雷鳴の'},rarity:40},
				{name:{a:'of Thunderbolt',b:'雷電の'},rarity:45},
				{name:{a:'of Thunderstroke',b:'雷撃の'},rarity:50},
				{name:{a:'of Storm',b:'嵐の'},rarity:55},
				{name:{a:'of Uranus',b:'天の神ウラノスの'},rarity:90},
				{name:{a:'of Zeus',b:'オリュンポスの主神ゼウスの'},rarity:95},
			]}],
		[BIAS_GRAVITY,{name:{a:'Gravity',b:'重力の'},color:C_GRAVITY,lvl:10,rarity:30,
			melee:{atkSlow:'10d2'},missile:{atkSlow:'10d2'},staff:{skillEarth:1},
			shield:{earth:'3d5'},armor:{earth:'2d5'},
			cloak:{earth:'2d5'},belt:{earth:'2d5'},helm:{earth:'2d5'},gloves:{atkSlow:'10d2'},
			boots:{earth:'2d5'},amulet:{skillEarth:1},ring:{skillEarth:1},light:{earth:'2d5'},
			gem:{earth:'1d5',con:1},enemy:{earth:'3d5',skillEarth:1,con:1,atkSlow:'10d2'},
			affix:[
				{name:{a:'of Star',b:'星の'},rarity:0},
				{name:{a:'of Asteroid',b:'小惑星の'},rarity:5},
				{name:{a:'of Planet',b:'惑星の'},rarity:10},
				{name:{a:'of Cosmos',b:'宇宙の'},rarity:15},
				{name:{a:'of Galaxy',b:'銀河の'},rarity:20},
				{name:{a:'of Stardust',b:'星屑の'},rarity:25},
				{name:{a:'of Celestial',b:'天上の'},rarity:30},
				{name:{a:'of Matter',b:'物質の'},rarity:35}, //
				{name:{a:'of Mass',b:'大塊の'},rarity:40},
				{name:{a:'of Astraeus',b:'星神アストライオスの'},rarity:70},
				{name:{a:'of Selene',b:'月の女神セレネの'},rarity:80},
				{name:{a:'of Chronos',b:'時の神クロノスの'},rarity:90},
			]}],
		[BIAS_INFECTION,{name:{a:'Infection',b:'感染の'},color:C_INFECTION,lvl:10,rarity:30,
			melee:{dmgPoison:'2d10'},missile:{dmgPoison:'2d10'},staff:{skillPoison:1},
			shield:{poison:'3d5'},armor:{poison:'2d5'},
			cloak:{poison:'2d5'},belt:{poison:'2d5'},helm:{poison:'2d5'},gloves:{dmgPoison:'2d10'},
			boots:{poison:'2d5'},amulet:{skillPoison:1},ring:{skillPoison:1},light:{poison:'2d5'},
			gem:{poison:'1d5'},enemy:{poison:'3d5',skillPoison:1,atkInf:'10d2',dmgPoison:'2d10'},
			affix:[
				{name:{a:'of Disease',b:'疾患の'},rarity:0},
				{name:{a:'of Bacteria',b:'細菌の'},rarity:5},
				{name:{a:'of Fungus',b:'真菌の'},rarity:10},
				{name:{a:'of Virus',b:'ウイルス性の'},rarity:15},
				{name:{a:'of Contagion',b:'伝染の'},rarity:20},
				{name:{a:'of Epidemic',b:'疫病の'},rarity:25},
				{name:{a:'of Plague',b:'悪疫の'},rarity:30},
				{name:{a:'of Alecto',b:'アレクトの'},rarity:70},
				{name:{a:'of Tisiphone',b:'ティシポネの'},rarity:80},
				{name:{a:'of Megaera',b:'メガイラの'},rarity:90}, 
			]}],
		[BIAS_SAND,{name:{a:'Sand',b:'砂の'},color:C_SAND,lvl:20,rarity:50,
			melee:{earth:'1d10',air:'1d10'},missile:{earth:'1d10',air:'1d10'},staff:{earth:'1d10',air:'1d10'},
			shield:{earth:'2d10',air:'2d10'},armor:{earth:'1d10',air:'1d10'},
			cloak:{earth:'1d10',air:'1d10'},belt:{earth:'1d10',air:'1d10'},helm:{earth:'1d10',air:'1d10'},gloves:{earth:'1d10',air:'1d10'},
			boots:{earth:'1d10',air:'1d10'},amulet:{earth:'1d10',air:'1d10'},ring:{earth:'1d10',air:'1d10'},light:{earth:'1d10',air:'1d10'},
			gem:{earth:'1d5',air:'1d5'},enemy:{earth:'2d10',air:'2d10',con:1,dex:1,atkBlind:'10d2'},
			affix:[
				{name:{a:'of Drying',b:'乾燥の'},rarity:0},
				{name:{a:'of Dust',b:'砂塵の'},rarity:5},
				{name:{a:'of Barren',b:'不毛の'},rarity:10},
				{name:{a:'of Desert',b:'砂漠の'},rarity:15},
				{name:{a:'of Ruin',b:'荒廃の'},rarity:20},
			]}],
		[BIAS_BLIZZARD,{name:{a:'Blizzard',b:'吹雪の'},color:C_BLIZZARD,lvl:20,rarity:50,
			melee:{water:'1d10',air:'1d10'},missile:{water:'1d10',air:'1d10'},staff:{water:'1d10',air:'1d10'},
			shield:{water:'2d10',air:'2d10'},armor:{water:'1d10',air:'1d10'},
			cloak:{water:'1d10',air:'1d10'},belt:{water:'1d10',air:'1d10'},helm:{water:'1d10',air:'1d10'},gloves:{water:'1d10',air:'1d10'},
			boots:{water:'1d10',air:'1d10'},amulet:{water:'1d10',air:'1d10'},ring:{water:'1d10',air:'1d10'},light:{water:'1d10',air:'1d10'},
			gem:{water:'1d5',air:'1d5'},enemy:{water:'2d10',air:'2d10',int:1,dex:1,atkCold:'10d2'},
			affix:[
				{name:{a:'of Snow',b:'雪の'},rarity:0},
				{name:{a:'of Sleet',b:'霙の'},rarity:5},
				{name:{a:'of Graupel',b:'霰の'},rarity:10},
				{name:{a:'of Hail',b:'雹の'},rarity:15},
				{name:{a:'of Glacier',b:'氷河の'},rarity:20},
			]}],
		[BIAS_ACID,{name:{a:'Acid',b:'酸の'},color:C_ACID,lvl:20,rarity:50,
			melee:{water:'1d10',poison:'1d10'},missile:{water:'1d10',poison:'1d10'},staff:{water:'1d10',poison:'1d10'},
			shield:{water:'2d10',poison:'2d10'},armor:{water:'1d10',poison:'1d10'},
			cloak:{water:'1d10',poison:'1d10'},belt:{water:'1d10',poison:'1d10'},helm:{water:'1d10',poison:'1d10'},gloves:{water:'1d10',poison:'1d10'},
			boots:{water:'1d10',poison:'1d10'},amulet:{water:'1d10',poison:'1d10'},ring:{water:'1d10',poison:'1d10'},light:{water:'1d10',poison:'1d10'},
			gem:{water:'1d5',poison:'1d5'},enemy:{water:'2d10',poison:'2d10',int:1,dmgAcid:'10d2'},
			affix:[
				{name:{a:'of Rust',b:'錆の'},rarity:30},
				{name:{a:'of Melting',b:'溶解の'},rarity:5},
				{name:{a:'of Dissolving',b:'分解の'},rarity:10},
				{name:{a:'of Corrosion',b:'腐食の'},rarity:15},
				{name:{a:'of Erosion',b:'浸食の'},rarity:20},
			]}],
		[BIAS_MAGMA,{name:{a:'Magma',b:'溶岩の'},color:C_MAGMA,lvl:20,rarity:50,
			melee:{fire:'1d10',earth:'1d10'},missile:{fire:'1d10',earth:'1d10'},staff:{fire:'1d10',earth:'1d10'},
			shield:{fire:'2d10',earth:'2d10'},armor:{fire:'1d10',earth:'1d10'},
			cloak:{fire:'1d10',earth:'1d10'},belt:{fire:'1d10',earth:'1d10'},helm:{fire:'1d10',earth:'1d10'},gloves:{fire:'1d10',earth:'1d10'},
			boots:{fire:'1d10',earth:'1d10'},amulet:{fire:'1d10',earth:'1d10'},ring:{fire:'1d10',earth:'1d10'},light:{fire:'1d10',earth:'1d10'},
			gem:{fire:'1d5',earth:'1d5'},enemy:{fire:'2d10',earth:'2d10',str:1,con:1,dmgFire:'2d10'},
			affix:[
				{name:{a:'of Smoke',b:'煙の'},rarity:0},
				{name:{a:'of Ash',b:'灰の'},rarity:5},
				{name:{a:'of Fissure',b:'亀裂の'},rarity:10},
				{name:{a:'of Lava',b:'溶岩の'},rarity:15},
				{name:{a:'of Volcano',b:'火山の'},rarity:20},
				{name:{a:'of Eruption',b:'噴火の'},rarity:25},
				{name:{a:'of Mereor',b:'流星の'},rarity:35},//
			]}],
		[BIAS_RADIATION,{name:{a:'Radioactive',b:'放射能の'},color:C_RADIATION,lvl:20,rarity:50,
			melee:{fire:'1d10',poison:'1d10'},missile:{fire:'1d10',poison:'1d10'},staff:{fire:'1d10',poison:'1d10'},
			shield:{fire:'2d10',poison:'2d10'},armor:{fire:'1d10',poison:'1d10'},
			cloak:{fire:'1d10',poison:'1d10'},belt:{fire:'1d10',poison:'1d10'},helm:{fire:'1d10',poison:'1d10'},gloves:{fire:'1d10',poison:'1d10'},
			boots:{fire:'1d10',poison:'1d10'},amulet:{fire:'1d10',poison:'1d10'},ring:{fire:'1d10',poison:'1d10'},light:{fire:'1d10',poison:'1d10'},
			gem:{fire:'1d5',poison:'1d5'},enemy:{fire:'2d10',poison:'2d10',str:1,atkRadi:'10d2'},
			affix:[
				{name:{a:'of Decay',b:'崩壊の'},rarity:0},
				{name:{a:'of Contamination',b:'汚染の'},rarity:5},
				{name:{a:'of Nucleus',b:'核の'},rarity:10},
				{name:{a:'of Fission',b:'分裂の'},rarity:15},
				{name:{a:'of Fusion',b:'融合の'},rarity:20},
				{name:{a:'of Catastrophe',b:'大惨事の'},rarity:25},
				
			]}],
	]),
	[ //suffix
		{name:{a:'of Digging',b:'採掘の'},lvl:1,rarity:0,
			melee:{digging:1}},
		{name:{a:'of Killer to Animal',b:'動物殺しの'},lvl:1,rarity:0,
			melee:{dmgAnimal:1},missile:{dmgAnimal:1},gloves:{dmgAnimal:1}},
		{name:{a:'of Killer to Human',b:'人間殺しの'},lvl:5,rarity:0,
			melee:{dmgHuman:1},missile:{dmgHuman:1},gloves:{dmgHuman:1},enemy:{dmgHuman:1}},
		{name:{a:'of Killer to Undead',b:'不死殺しの'},lvl:10,rarity:0,
			melee:{dmgUndead:1},missile:{dmgUndead:1},gloves:{dmgUndead:1}},
		{name:{a:'of Killer to Dragon',b:'竜殺しの'},lvl:15,rarity:0,
			melee:{dmgDragon:1},missile:{dmgDragon:1},gloves:{dmgDragon:1}},
		{name:{a:'of Killer to Giant',b:'巨人殺しの'},lvl:15,rarity:0,
			melee:{dmgGiant:1},missile:{dmgGiant:1},gloves:{dmgGiant:1}},
		{name:{a:'of Killer to Demon',b:'悪魔殺しの'},lvl:20,rarity:0,
			melee:{dmgDemon:1},missile:{dmgDemon:1},gloves:{dmgDemon:1}},
		{name:{a:'of Killer to Spirit',b:'精霊殺しの'},lvl:20,rarity:0,
			melee:{dmgSpirit:1},missile:{dmgSpirit:1},gloves:{dmgSpirit:1}},
		{name:{a:'of Multi Color',b:'万色の'},lvl:25,rarity:50,
			shield:{fire:'2d3',water:'2d3',air:'2d3',earth:'2d3',poison:'2d3'},
			armor:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			cloak:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			belt:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			helm:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			gloves:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			boots:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			amulet:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			ring:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			light:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			gem:{fire:'1d3',water:'1d3',air:'1d3',earth:'1d3',poison:'1d3'},
			enemy:{fire:'2d3',water:'2d3',air:'2d3',earth:'2d3',poison:'2d3'}},
		{name:{a:'of All Aound',b:'万能の'},lvl:20,rarity:80,
			melee:{skillAll:1},missile:{skillAll:1},staff:{skillAll:1},
			amulet:{skillAll:1},ring:{skillAll:1},enemy:{skillAll:1}},
		{name:{a:'of Strength',b:'筋力の'},lvl:1,rarity:0,
			melee:{str:1},gloves:{str:1},ring:{str:1},enemy:{str:1}},
		{name:{a:'of Dexterity',b:'器用さの'},lvl:1,rarity:0,
			missile:{dex:1},boots:{dex:1},ring:{dex:1},enemy:{dex:1}},
		{name:{a:'of Constitution',b:'耐久力の'},lvl:1,rarity:0,
			armor:{con:1},belt:{con:1},amulet:{con:1},enemy:{con:1}},
		{name:{a:'of Intelligence',b:'知力の'},lvl:1,rarity:0,
			staff:{int:1},helm:{int:1},amulet:{int:1},enemy:{int:1}},
		{name:{a:'of Speed',b:'速度の'},lvl:10,rarity:50,
			cloak:{spd:'1d5'},boots:{spd:'1d5'},ring:{spd:'1d5'},amulet:{spd:'1d5'},enemy:{spd:'1d5'}},
		{name:{a:'of Magic Finding',b:'魔法具探求の'},lvl:1,rarity:30,
			amulet:{mf:'2d10'},ring:{mf:'1d10'},gem:{mf:'1d5'},enemy:{mf:'2d10'}},
		{name:{a:'of Gold Finding',b:'財宝探求の'},lvl:1,rarity:0,
			amulet:{gf:'2d20'},ring:{gf:'1d20'},gem:{gf:'1d10'},enemy:{gf:'2d20'}},
		{name:{a:'of Life',b:'生命力の'},lvl:1,rarity:0,
			shield:{hp:'1d10'},armor:{hp:'2d10'},belt:{hp:'1d10'},enemy:{hp:'2d5'}},
		{name:{a:'of Mana',b:'魔力の'},lvl:1,rarity:0,
			staff:{mp:'1d10'},armor:{mp:'2d10'},helm:{mp:'1d10'},enemy:{mp:'2d10'}},
		{name:{a:'of Life Regeneration',b:'回復力の'},lvl:10,rarity:50,
			belt:{hpReg:'2d10'},amulet:{hpReg:'2d10'},ring:{hpReg:'1d10'},enemy:{hpReg:'2d10'}},
		{name:{a:'of Mana Regeneration',b:'魔力回復の'},lvl:10,rarity:50,
			belt:{mpReg:'2d10'},amulet:{mpReg:'2d10'},ring:{mpReg:'1d10'},enemy:{mpReg:'2d10'}},
		{name:{a:'of Attack Speed',b:'攻撃速度の'},lvl:10,rarity:20,
			melee:{ias:'5d2'},missile:{ias:'5d2'},gloves:{ias:'5d2'},
			ring:{ias:'5d2'},enemy:{ias:'5d2'}},
		{name:{a:'of Faster Cast',b:'詠唱速度の'},lvl:10,rarity:20,
			staff:{fcr:'5d2'},helm:{fcr:'5d2'},
			amulet:{fcr:'5d2'},enemy:{fcr:'5d2'}},
		{name:{a:'of Faster Run Walk',b:'早足の'},lvl:10,rarity:20,
			cloak:{spd:'2d4'},boots:{frw:'5d4'},enemy:{frw:'5d4'}},
		{name:{a:'of Multiple Hit',b:'倍打の'},lvl:20,rarity:40,
			melee:{dmgDiceNum:1},missile:{dmgDiceNum:1},staff:{dmgDiceNum:1},enemy:{dmgDiceNum:1}},
		{name:{a:'of Heavy Hit',b:'強打の'},lvl:10,rarity:0,
			melee:{dmgDiceSides:1},missile:{dmgDiceSides:1},staff:{dmgDiceSides:1},enemy:{dmgDiceSides:1}},
		{name:{a:'of Life Steal',b:'生命力吸収の'},lvl:10,rarity:20,
			melee:{stealLife:'1d3'},missile:{stealLife:'1d3'},staff:{stealLife:'1d3'},gloves:{stealLife:'1d3'},
			ring:{stealLife:'1d3'},enemy:{stealLife:'1d3'}},
		{name:{a:'of Mana Steal',b:'魔力吸収の'},lvl:10,rarity:20,
			melee:{stealMana:'1d3'},missile:{stealMana:'1d3'},staff:{stealMana:'1d3'},gloves:{stealMana:'1d3'},
			ring:{stealMana:'1d3'},enemy:{stealMana:'1d3'}},
		{name:{a:'of Damage',b:'ダメージの'},lvl:1,rarity:0,
			melee:{dmgBonus:'10d3'},missile:{dmgBonus:'10d3'},staff:{dmgBonus:'10d3'},gloves:{dmgBonus:'10d3'},
			ring:{dmgBonus:'10d3'},enemy:{dmgBonus:'10d3'}},
		{name:{a:'of Accuracy',b:'精度の'},lvl:1,rarity:0,
			melee:{rateBonus:'10d3'},missile:{rateBonus:'10d3'},staff:{rateBonus:'10d3'},gloves:{rateBonus:'10d3'},
			ring:{rateBonus:'10d3'},enemy:{rateBonus:'10d3'}},
		{name:{a:'of Protection',b:'守りの'},lvl:1,rarity:0,
			shield:{acBonus:'10d3'},armor:{acBonus:'10d3'},
			cloak:{acBonus:'10d3'},belt:{acBonus:'10d3'},helm:{acBonus:'10d3'},gloves:{acBonus:'10d3'},
			boots:{acBonus:'10d3'},amulet:{acBonus:'10d3'},enemy:{acBonus:'10d3'}},
		{name:{a:'of Experience',b:'経験の'},lvl:15,rarity:50,
			amulet:{expBonus:'2d5'},ring:{expBonus:'1d5'}},
		{name:{a:'of Stealth',b:'隠密の'},lvl:1,rarity:0,
			cloak:{stealth:'2d10'},boots:{stealth:'2d10'},amulet:{stealth:'2d10'},enemy:{stealth:'2d10'}},
		{name:{a:'of Detection',b:'探知の'},lvl:1,rarity:0,
			helm:{searching:'2d10'},gloves:{searching:'2d10'},
			ring:{searching:'1d10'},light:{searching:'2d10'},enemy:{searching:'2d10'}},
		{name:{a:'of Slow Digestion',b:'遅消化の'},lvl:1,rarity:0,
			armor:{digest:'2d10'},belt:{digest:'2d10'},amulet:{digest:'2d10'},ring:{digest:'1d10'}},
		{name:{a:'of Illumination',b:'イルミネーションの'},lvl:1,rarity:0,
			light:{lighten:1}},
		{name:{a:'High Capasity',b:'大容量の'},lvl:1,rarity:50,
			belt:{numBoxes:1},light:{duration:1000},},
		{name:{a:'of Sustain Strength',b:'筋力維持の'},lvl:1,rarity:0,
			melee:{strSus:true},shield:{strSus:true},gloves:{strSus:true},
			ring:{strSus:true},light:{strSus:true}},
		{name:{a:'of Sustain Dexterity',b:'器用さ維持の'},lvl:1,rarity:0,
			missile:{dexSus:true},shield:{dexSus:true},boots:{dexSus:true},
			ring:{dexSus:true},light:{dexSus:true}},
		{name:{a:'of Sustain Constitution',b:'耐久力維持の'},lvl:1,rarity:0,
			shield:{conSus:true},armor:{conSus:true},belt:{conSus:true},
			amulet:{conSus:true},light:{conSus:true}},
		{name:{a:'of Sustain Intelligence',b:'知力維持の'},lvl:1,rarity:0,
			staff:{intSus:true},shield:{intSus:true},helm:{intSus:true},
			amulet:{intSus:true},light:{intSus:true}},
		{name:{a:'of Levitation',b:'浮遊の'},lvl:1,rarity:80,
			cloak:{levi:true},boots:{levi:true},amulet:{levi:true},ring:{levi:true},enemy:{levi:true}},
		{name:{a:'of Aggravation',b:'憤怒の'},lvl:5,rarity:50,
			melee:{aggravating:true,cursed:true},missile:{aggravating:true,cursed:true},staff:{aggravating:true,cursed:true},
			shield:{aggravating:true,cursed:true},
			armor:{aggravating:true,cursed:true},cloak:{aggravating:true,cursed:true},belt:{aggravating:true,cursed:true},
			helm:{aggravating:true,cursed:true},gloves:{aggravating:true,cursed:true},boots:{aggravating:true,cursed:true},
			amulet:{aggravating:true,cursed:true},ring:{aggravating:true,cursed:true},light:{aggravating:true,cursed:true},enemy:{aggravating:true,cursed:true}},
		{name:{a:'of Teleportation',b:'テレポートの'},lvl:5,rarity:50,
			melee:{teleported:true,cursed:true},missile:{teleported:true,cursed:true},staff:{teleported:true,cursed:true},
			shield:{teleported:true,cursed:true},
			armor:{teleported:true,cursed:true},cloak:{teleported:true,cursed:true},belt:{teleported:true,cursed:true},
			helm:{teleported:true,cursed:true},gloves:{teleported:true,cursed:true},boots:{teleported:true,cursed:true},
			amulet:{teleported:true,cursed:true},ring:{teleported:true,cursed:true},light:{teleported:true,cursed:true},enemy:{teleported:true,cursed:true}},
		{name:{a:'of Indestructible',b:'破壊不能の'},lvl:30,rarity:80,indestructible:true,
			melee:{indestructible:true},missile:{indestructible:true},staff:{indestructible:true},
			shield:{indestructible:true},
			armor:{indestructible:true},cloak:{indestructible:true},belt:{indestructible:true},
			helm:{indestructible:true},gloves:{indestructible:true},boots:{indestructible:true},
			amulet:{indestructible:true},ring:{indestructible:true},light:{indestructible:true},enemy:{indestructible:true}},
		{name:{a:'of Durability',b:'耐久度の'},lvl:1,rarity:0,
			melee:{durabBonus:'2d10'},missile:{durabBonus:'2d10'},staff:{durabBonus:'2d10'},
			shield:{durabBonus:'2d10'},
			armor:{durabBonus:'2d10'},cloak:{durabBonus:'2d10'},belt:{durabBonus:'2d10'},
			helm:{durabBonus:'2d10'},gloves:{durabBonus:'2d10'},boots:{durabBonus:'2d10'},
			amulet:{durabBonus:'2d10'},ring:{durabBonus:'2d10'},light:{durabBonus:'2d10'}},
	]
];
{
	if(MAX_BIAS_NUMS<modTab[PREFIX].size) throw new Error('Incorrect bias numbers');
}
const modBiasNums = enums(1,MAX_BIAS_NUMS);
const modSufNums = enums(0,modTab[SUFFIX].length-1);
const modAffNumsMap = (()=>{
	let nums = new Map();
	for(let [bias, pre] of modTab[PREFIX].entries())
		nums.set(bias,enums(0,pre.affix.length-1));
	return nums;
})();

{
	for(let key in itemTab){
		for(let [tabId, item] of itemTab[key].entries()){
			item.type = key;
			item.tabId = tabId;
			if(!item.name) item.name = {};
			if(key==='book'||key==='food'||key==='coin'
			||key==='ammo'||key==='oil'||key==='misc')
				item.identified = true;
			else if(key==='melee'||key==='missile'||key==='staff'||key==='shield'||key==='armor'
			||key==='cloak'||key==='belt'||key==='helm'||key==='gloves'||key==='boots'
			||key==='light'||key==='ring'||key==='amulet'){
				item.equipable = true;
				item.grade = NORMAL;
				if(key==='melee'||key==='missile'||key==='staff')
					item.weapon = true;
				else if(key==='light'||key==='ring'||key==='amulet')
					item.ornament = true;
				else
					item.armor = true;
			}
			if(key==='book'){ //sort list
				if(!item.skill) continue;
				let list = item.list;
				let keys = Object.keys(list);
				for(let i=0,l=keys.length,found;i<l-1;i++,found=false){
					for(let j =l-1;j>i;j--){
						let [a, b] = [keys[j-1], keys[j]];
						if(skillMap.get(list[a]).reqLvl>skillMap.get(list[b]).reqLvl){
							[list[a], list[b]] = [list[b], list[a]];
							found = true;
						}
					}
					if(!found) break;
				}
			}
		}
	}
}

const investigationMap = new Map([
	['atkType',{name:{a:'Attack Type',b:'攻撃種類'},char:true}],
	['dmgBase',{name:{a:'Damage Base',b:'ダメージ基礎値'},char:true}],
	['dmgAvg',{name:{a:'Damage Average',b:'ダメージ期待値'},char:true,equipList:true}],
	['rateValue',{name:{a:'Hit Rating',b:'命中値'},char:true,equipList:true}],
	// ['acSBase',{name:{a:'Slash Defence Base',b:'斬守備力基礎値'},item:true}],
	// ['acTBase',{name:{a:'Thrust Defence Base',b:'突守備力基礎値'},item:true}],
	// ['acBBase',{name:{a:'Blunt Defence Base',b:'打守備力基礎値'},item:true}],
	['acSValue',{name:{a:'Slash Defence',b:'斬守備力 '},item:true}],
	['acTValue',{name:{a:'Thrust Defence',b:'突守備力 '},item:true}],
	['acBValue',{name:{a:'Blunt Defence',b:'打守備力 '},item:true}],
	['acSValueTotal',{name:{a:'Slash Defence',b:'斬守備力'},char:true,equipList:true}],
	['acTValueTotal',{name:{a:'Thrust Defence',b:'突守備力'},char:true,equipList:true}],
	['acBValueTotal',{name:{a:'Blunt Defence',b:'打守備力'},char:true,equipList:true}],
	['timesMelee',{name:{a:'Melee Attack Times',b:'近接攻撃回数'},char:true,equipList:true}],
	['timesMissile',{name:{a:'Missile Attack Times',b:'遠隔攻撃回数'},char:true,equipList:true}],
	['timesSpell',{name:{a:'Spell Cast Speed',b:'魔法詠唱速度'},char:true,equipList:true}],
	['timesMove',{name:{a:'Move Speed',b:'移動速度'},char:true,equipList:true}],
	['statPoints',{name:{a:'Stat Points',b:'ステータスポイント'},char:true,equipList:true}],
	['skillPoints',{name:{a:'Skill Points',b:'スキルポイント'},char:true,equipList:true}],
	['duration',{name:{a:'Duration',b:'持続期間'},item:true}],
	['durationMax',{name:{a:'Max Duration',b:'最大持続期間'},item:true}],
	['durab',{name:{a:'Durability',b:'耐久度'},item:true}],
	['durabMax',{name:{a:'Max Durability',b:'最大耐久度'},item:true}],
	['iasBase',{name:{a:'Base Attack Speed',b:'基礎攻撃速度'},item:true}],
	['fcrBase',{name:{a:'Base Cast Speed',b:'基礎詠唱速度'},item:true}],
	['frwBase',{name:{a:'Base Move Speed',b:'基礎移動速度'},item:true}],
	['material',{name:{a:'Material',b:'素材'},item:true}],
	['embeddedNum',{name:{a:'Embedded Number',b:'埋め込み数'},item:true}],
	['embeddedMax',{name:{a:'Max Embedded Number',b:'埋め込み最大数'},item:true}],
	['mod',null],
	['hp',{name:{a:'Life',b:'体力'},char:true,plus:true,max:'hpMax'}],
	['mp',{name:{a:'Mana',b:'魔力'},char:true,plus:true,max:'mpMax'}],
	['str',{name:{a:'Strength',b:'筋力'},char:true,plus:true,max:'strMax'}],
	['dex',{name:{a:'Dexterity',b:'器用さ'},char:true,plus:true,max:'dexMax'}],
	['con',{name:{a:'Constitution',b:'耐久力'},char:true,plus:true,max:'conMax'}],
	['int',{name:{a:'Intelligence',b:'知力'},char:true,plus:true,max:'intMax'}],
	['spd',{name:{a:'Speed',b:'速度'},char:true,plus:true,max:'spdMax'}],
	['fire',{name:{a:'Fire Resist',b:'耐火'},char:true,plus:true,perc:true,max:'fireMax',equipList:true}],
	['water',{name:{a:'Water Resist',b:'耐水'},char:true,plus:true,perc:true,max:'waterMax',equipList:true}],
	['air',{name:{a:'Air Resist',b:'耐風'},char:true,plus:true,perc:true,max:'airMax',equipList:true}],
	['earth',{name:{a:'Earth Resist',b:'耐土'},char:true,plus:true,perc:true,max:'earthMax',equipList:true}],
	['poison',{name:{a:'Poison Resist',b:'耐毒'},char:true,plus:true,perc:true,max:'poisonMax',equipList:true}],
	['end',null],
	['skillFire',{name:{a:'Fire Skill',b:'火スキル'},char:true,plus:true}],
	['skillWater',{name:{a:'Water Skill',b:'水スキル'},char:true,plus:true}],
	['skillAir',{name:{a:'Air Skill',b:'風スキル'},char:true,plus:true}],
	['skillEarth',{name:{a:'Earth Skill',b:'土スキル'},char:true,plus:true}],
	['skillPoison',{name:{a:'Poison Skill',b:'毒スキル'},char:true,plus:true}],
	['skillAll',{name:{a:'All Skill ',b:'全スキル'},char:true,plus:true}],
	['synerzyMelee',{name:{a:'Melee Synerzy',b:'近接シナジー'},char:true,plus:true}],
	['synerzyMissile',{name:{a:'Missile Synerzy',b:'遠隔シナジー'},char:true,plus:true}],
	['synerzyFire',{name:{a:'Fire Spell Synerzy',b:'火魔法シナジー'},char:true,plus:true}],
	['synerzyWater',{name:{a:'Water Spell Synerzy',b:'水魔法シナジー'},char:true,plus:true}],
	['synerzyAir',{name:{a:'Air Spell Synerzy',b:'風魔法シナジー'},char:true,plus:true}],
	['synerzyEarth',{name:{a:'Earth Spell Synerzy',b:'土魔法シナジー'},char:true,plus:true}],
	['synerzyPoison',{name:{a:'Poison Spell Synerzy',b:'毒魔法シナジー'},char:true,plus:true}],
	['ias',{name:{a:'Increase Attack Speed',b:'攻撃速度上昇'},char:true,plus:true,perc:true}],
	['fcr',{name:{a:'Faster Cast Rate',b:'詠唱速度上昇'},char:true,plus:true,perc:true}],
	['frw',{name:{a:'Faster Run Walk',b:'早足'},char:true,plus:true,perc:true}],
	['digest',{name:{a:'Slow Digestion',b:'遅消化'},char:true,plus:true,perc:true}],
	['stealth',{name:{a:'Stealth',b:'隠密'},char:true,plus:true,perc:true}],
	['searching',{name:{a:'Searching',b:'捜索'},char:true,plus:true,perc:true}],
	['hpReg',{name:{a:'Life Regeneration',b:'再生'},char:true,plus:true,perc:true}],
	['mpReg',{name:{a:'Mana Regeneration',b:'魔力再生'},char:true,plus:true,perc:true}],
	['mf',{name:{a:'Magic Finding',b:'魔法具探求'},char:true,plus:true,perc:true}],
	['gf',{name:{a:'Gold Finding',b:'財宝探求'},char:true,plus:true,perc:true}],
	['expBonus',{name:{a:'Experience Bonus',b:'経験値加算値'},char:true,plus:true,perc:true}],
	['lighten',{name:{a:'Lighten',b:'照明'},char:true,plus:true}],
	['numBoxes',{name:{a:'Slot numbers',b:'スロット数'},char:true,plus:true}],
	
	['dmgDiceNum',{name:{a:'Damage Dice Number',b:'ダメージ・ダイス数'},char:true,plus:true}],
	['dmgDiceSides',{name:{a:'Damage Dice Sides',b:'ダメージ・ダイス面数'},char:true,plus:true}],
	['dmgBonus',{name:{a:'Damage Bonus',b:'ダメージ加算値'},char:true,plus:true,perc:true}],
	['rateBonus',{name:{a:'Hit Rating Bonus',b:'命中率加算値'},char:true,plus:true,perc:true}],
	['acBonus',{name:{a:'Defence Bonus',b:'守備力加算値'},char:true,plus:true,perc:true}],
	['durabBonus',{name:{a:'Durability Bonus',b:'耐久度加算値'},plus:true}],
	['digging',{name:{a:'Digging',b:'採掘'},char:true,plus:true}],
	['dmgHuman',{name:{a:'Damage to Human',b:'対人間ダメージ'},char:true,plus:true}],
	['dmgDemon',{name:{a:'Damage to Demon',b:'対悪魔ダメージ'},char:true,plus:true}],
	['dmgAnimal',{name:{a:'Damage to Animal',b:'対動物ダメージ'},char:true,plus:true}],
	['dmgDragon',{name:{a:'Damage to Dragon',b:'対ドラゴンダメージ'},char:true,plus:true}],
	['dmgUndead',{name:{a:'Damage to Undead',b:'対不死ダメージ'},char:true,plus:true}],
	['dmgGiant',{name:{a:'Damage to Giant',b:'対巨人ダメージ'},char:true,plus:true}],
	['dmgSpirit',{name:{a:'Damage to Spirit',b:'対精霊ダメージ'},char:true,plus:true}],
	['dmgFire',{name:{a:'Fire Damage',b:'火ダメージ'},char:true,plus:true,perc:true}],
	['dmgLightning',{name:{a:'Lightning Damage',b:'電撃ダメージ'},char:true,plus:true,perc:true}],
	['dmgPoison',{name:{a:'Poison Damage',b:'毒ダメージ'},char:true,plus:true,perc:true}],
	['dmgAcid',{name:{a:'Acid Damage',b:'酸ダメージ'},char:true,plus:true,perc:true}],
	['stealLife',{name:{a:'Life Steal',b:'生命力吸収'},char:true,plus:true,perc:true}],
	['stealMana',{name:{a:'Mana Steal',b:'魔力吸収'},char:true,plus:true,perc:true}],
	['atkCon',{name:{a:'Confusion Attack',b:'混乱攻撃'},char:true,plus:true,perc:true}],
	['atkPara',{name:{a:'Paralysis Attack',b:'麻痺攻撃'},char:true,plus:true,perc:true}],
	['atkSlow',{name:{a:'Slow Attack',b:'減速攻撃'},char:true,plus:true,perc:true}],
	['atkInf',{name:{a:'Infection Attack',b:'感染攻撃'},char:true,plus:true,perc:true}],
	['atkBlind',{name:{a:'Blindness Attack',b:'盲目攻撃'},char:true,plus:true,perc:true}],
	['atkRadi',{name:{a:'Radioactive Attack',b:'放射能攻撃'},char:true,plus:true,perc:true}],
	['atkCold',{name:{a:'Freezing Attack',b:'凍結攻撃'},char:true,plus:true,perc:true}],
	['atkDrain',{name:{a:'Drain Attack',b:'吸収攻撃'},char:true,plus:true,perc:true}],
	['atkStealGold',{name:{a:'Gold Steal',b:'金貨強奪'},char:true,plus:true,perc:true}],
	['atkStealItem',{name:{a:'Item Steal',b:'アイテム強奪'},char:true,plus:true,perc:true}],
	['strSus',{name:{a:'Sustain Strength',b:'筋力維持'},char:true,bool:true}],
	['dexSus',{name:{a:'Sustain Dexterity',b:'器用さ維持'},char:true,bool:true}],
	['conSus',{name:{a:'Sustain Constitution',b:'耐久力維持'},char:true,bool:true}],
	['intSus',{name:{a:'Sustain Intelligence',b:'知力維持'},char:true,bool:true}],
	['levi',{name:{a:'Levitation',b:'浮遊'},char:true,bool:true}],
	['indestructible',{name:{a:'Indestructible',b:'破壊不能'},char:true,bool:true}],
	['teleported',{name:{a:'Random Teleportation',b:'ランダム・テレポート'},char:true,bool:true}],
	['aggravating',{name:{a:'Aggravate Monster',b:'反感'},char:true,bool:true}],
]);
	
		
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

const Data = class{
	constructor(){
		this.saveItemTab();
		this.coords = coords;
		this.option = option;
		this.difficulty = difficulty;
		this.messageList = message.list;
		this.litMapIds = litMapIds;
		if(rogue.cdl) this.stashList = enter[STASH].list;
		this.track = audio.curTrack;
		this.date = new Date();
		this.ver = VERSION/*.toFixed(1)*/;
	}
	
	loadInit(){
		getRndName.init();
		clearAll();
		this.loadItemTab();
		this.loadCoords();
		this.loadOption();
		this.loadDifficulty();
		message.list = this.messageList;
		litMapIds = this.litMapIds;
		if(rogue.ce) this.searchCe();
		if(rogue.cdl){ 
			this.loadItem(this.stashList);
			enter[STASH].list = this.stashList;
		}
		display.change(option.display.user,true);
		initFlag();
		this.loadAudio();
	}
	
	saveItemTab(){
		this.itemTab = {};
		for(let key in itemTab){
			if(key!=='potion'&&key!=='wand'&&key!=='scroll') continue;
			this.itemTab[key] = [];
			for(let [tabId, item] of itemTab[key].entries()){
				let thisItem = {};
				thisItem.identified = item.identified;
				thisItem.name = {};
				thisItem.name['a'] = item.name['a'];
				thisItem.name['b'] = item.name['b'];
				if(key==='potion') thisItem.color = item.color;
				this.itemTab[key][tabId] = thisItem;
			}
		}
	}
	
	loadItemTab(){
		for(let key in itemTab){
			if(key!=='potion'&&key!=='wand'&&key!=='scroll') continue;
			for(let [tabId, item] of itemTab[key].entries()){
				let thisItem = this.itemTab[key][tabId];
				if(!thisItem){
					item.identified = false;
					getRndName[key](item);
					continue;
				}
				item.identified = thisItem.identified;
				item.name['a'] = thisItem.name['a'];
				item.name['b'] = thisItem.name['b'];
				if(key==='potion') item.color = thisItem.color;
			}
		}
	}
	
	loadCoords(){
		coords = this.coords;
		for(let locs of coords){
			for(let loc of locs){
				loc.__proto__ = Location.prototype;
				if(loc.fighter){
					if(loc.fighter.id===ROGUE){
						loc.fighter.__proto__ = Rogue.prototype;
						rogue = loc.fighter;
					} else{
						loc.fighter.__proto__ = Enemy.prototype;
						Enemy.list[loc.fighter.id] = loc.fighter;
					}
					queue.push(loc.fighter);
					this.loadItem(loc.fighter.boxes);
					this.loadItem(loc.fighter.equipment);
					this.loadItem(loc.fighter.side);
					this.loadItem(loc.fighter.pack);
				}
				if(loc.item['a']) this.loadItem(loc.item,true);
				if(loc.trap) loc.trap.__proto__ = Trap.prototype;
				if(loc.stairs) loc.stairs.__proto__ = Staircase.prototype;
				if(loc.enter) this.loadEntrance(loc);
			}
		}
	}
	
	loadItem(list,floor){
		for(let key in list){
			if(!list[key]) continue;
			list[key].__proto__ = Item.prototype;
			if(floor) Item.list[list[key].id] = list[key];
		}
	}
	
	loadEntrance(loc){
		let entLoaded = loc.enter;
		if(entLoaded.shop||entLoaded.stash){
			this.loadItem(entLoaded.list)
			enter[entLoaded.id].list = entLoaded.list;
		}
		if(!entLoaded.portal) loc.enter = enter[entLoaded.id];
	}
	
	loadOption(){
		for(let key in option.list){
			let key2 = option.list[key]['a'];
			if(!this.option[key2]){
				this.option[key2] = {};
				this.option[key2].user = option[key2].default;
			}
			option[key2].user = this.option[key2].user;
		}
	}
	
	loadDifficulty(){
		for(let key in this.difficulty)
			difficulty[key] = this.difficulty[key];
	}
	
	searchCe(){
		for(let key in Enemy.list){
			if(rogue.ce.id===Enemy.list[key].id){
				rogue.ce = Enemy.list[key];
				break;
			}
		}
	}
	
	loadAudio(){
		audio.stop(audio.curTrack);
		audio.curTrack = this.track;
		let a = this.option['BGM'].user;
		audio.volBGM = option['BGM'].choise[a].a/10;
		a = this.option['SE'].user;
		audio.volSE = option['SE'].choise[a].a/10;
		audio.playMusic(audio.curTrack);
	}
}

const data ={ 
	save(){
		if(flag.died||flag.retry||this.error)
			return;
		else if(flag.synthesize)
			rogue.returnCubeItem();
		message.draw(rogue.cl===ENG? 'Saved':'記録した');
		let saveData = new Data();	
		localStorage.setItem('Player',JSON.stringify(saveData));
	},
	load(){
		let name = 'Player';
		let saveData = JSON.parse(localStorage.getItem(name));
		if(saveData===null){
			initialize();
			creation.town();
		} else{
			saveData.__proto__ = Data.prototype;
			saveData.loadInit();
			message.draw(rogue.cl===ENG? 'Loaded':'記録を読み込んだ');
		}
	},
	delete(name){
		localStorage.removeItem(name);
	},
	exit(){
		this.save();
		quit(89,true);
	},
	dontSave(){
		this.error = true;
		message.draw(rogue.cl===ENG?
		'Error occurred'
		:'エラーが発生した');
	}
};
{
  window.addEventListener('beforeunload', data.save.bind(data), false);
  window.addEventListener('error', data.dontSave.bind(data), false);
}
const [IN, OUT] = enums(1,2);
const audio = {
	volBGM:1,
	volSE:1,
	music:{
		title:new Audio('music/title.ogg'),
		town1:new Audio('music/town1.ogg'),
		town2:new Audio('music/town2.ogg'),
		dungeon1:new Audio('music/dungeon1.ogg'),
		dungeon2:new Audio('music/dungeon2.ogg'),
		dungeon3:new Audio('music/dungeon3.ogg'),
		dungeon4:new Audio('music/dungeon4.ogg'), 
		boss:new Audio('music/boss.ogg'),
		gameover:new Audio('music/gameover.ogg'),
	},
	sound:{
		level:new Audio('sound/level.wav'),
		opendoor:new Audio('sound/opendoor.wav'),
		shutdoor:new Audio('sound/shutdoor.wav'),
		teleport:new Audio('sound/teleport.wav'),
		curse:new Audio('sound/curse.wav'),
		amulet:new Audio('sound/amulet.wav'),
		ring:new Audio('sound/ring.wav'),
		gem:new Audio('sound/gem.wav'),
		grab:new Audio('sound/grab.wav'),
		tplevel:new Audio('sound/tplevel.wav'),
		dig:new Audio('sound/dig.wav'),
		kill_boss:new Audio('sound/kill_boss.wav'),
	},
	init(){
		for(let key in this.music)
			this.music[key].currentTime = 0;
	},
	fadeIn(track){
		if(track.fade!==IN) return;
		if(track.volume<this.volBGM){
			track.volume = Math.round((track.volume+0.1)*10)/10;
			setTimeout(this.fadeIn.bind(this,track),100);
		} else
			track.fade = null;
	},
	fadeOut(track,loop){
		if(track.fade!==OUT) return;
		if(track.volume>0){
			track.volume = Math.round((track.volume-0.1)*10)/10;
			setTimeout(this.fadeOut.bind(this,track,loop),100);
		} else{
			if(!loop) track.pause();
			track.fade = null;
		}
			
	},
	loop(track){
		track.currentTime = 0;
		track.play();
	},
	playMusic(trackName){
		if(!this.music[trackName]) return;
		let track = this.music[trackName];
		this.curTrack = trackName;
		track.volume = 0;
		track.fade = IN;
		this.fadeIn(track);
		if(!option.mute.user) track.play();
	},
	playSound(trackName,distance){
		if(!this.sound[trackName]) return;
		let track = this.sound[trackName];
		if(!distance)
			track.volume = this.volSE;
		else{
			if(distance>HEARING_SQ) return;
			let vol = Math.round(this.volSE*(1-distance/HEARING_SQ)*10)/10;
			track.volume = vol;
		}
		track.currentTime = 0;
		if(!option.mute.user) track.play();
	},
	stop(trackName){
		if(!trackName) return;
		let track = this.music[trackName];
		track.fade = OUT;
		this.fadeOut(track);
	},
	mute(){
		option.mute.user = !option.mute.user;
		let track = this.music[this.curTrack];
		option.mute.user? track.pause():track.play();
	},
	getDungeonTrack(lvl,boss){
		return lvl<10? 'dungeon1':
			   lvl<20? 'dungeon2':
			   lvl<30? 'dungeon3':
			   !boss?  'dungeon4':
						   'boss';
	}
};
{
	for(let key in audio.music){
		let track = audio.music[key];
		track.addEventListener('timeupdate', function() {
			if(this.fade!==OUT&&this.currentTime>=this.duration-0.5){
				this.fade = OUT;
				audio.fadeOut(this,true);
			}
		},false);
		track.addEventListener('ended', function() {
			if(audio.curTrack===key){
				this.fade = IN;
				audio.fadeIn(this);
				this.play();
			}
		},false);
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

const circleSearch = {
	main:function(x0,y0,type,radius,symbol,perc){
		this.count = 0; 
		this.type = type;
		this.symbol = symbol;
		this.perc = perc;
		let width = coords.length;
		let height = coords[0].length;
		let radiusSq = radius**2;
		for(let j=0;j<=radius;j++){
			let col = -radius;
			while(distanceSq(col,j,0,0)>radiusSq) col++;
			for(let i=col;i<=-col;i++){
				if(i+x0<0) continue;
				if(i+x0>=width) break;
				if(y0+j<height) this.do(i+x0,j+y0);
				if(j&&y0-j>=0) this.do(i+x0,-j+y0);
			}
		}
		if(this.count){
			if(this.type===MONSTER_DETECTION){
				message.draw(rogue.cl===ENG?
				`Detected ${this.count} enemies`
				:`${this.count}体の敵を検出した`);
			} else if(this.type===ITEM_DETECTION){
				message.draw(rogue.cl===ENG?
				`Detected ${this.count} items`
				:`${this.count}個のアイテムを検出した`);
			} else if(this.type===DISINTEGRATION){
				message.draw(rogue.cl===ENG?
				`Disintegrated ${this.count} enemies`
				:`${this.count}体の敵を塵にした`);
			}
		}
	},
	do:function(x,y){
		let loc = coords[x][y];
		switch(this.type){
			case MAGIC_MAPPING:
			case ITEM_DETECTION:
				if(this.type===MAGIC_MAPPING&&loc.item['a'] //
				||this.type===ITEM_DETECTION&&(!loc.item['a']||loc.found)) return;
				loc.found=true;
				loc.draw();
				this.count++;
				break;
			case MONSTER_DETECTION:
				if(!loc.fighter||loc.fighter.id===ROGUE||loc.detected) return;
				loc.fighter.detected = true;
				loc.detected = true;
				loc.draw();
				this.count++;
				break;
			case SCREAM:
				if(!loc.fighter||!loc.fighter.sleeping) return;
				loc.fighter.wakeUp();
				break;
			case DISINTEGRATION:
				if(!loc.fighter||loc.fighter.id===ROGUE||loc.fighter.symbol!==this.symbol) return;
				if(loc.fighter.mod!==UNIQUE
				&&!evalPercentage(loc.fighter.lvl)){
					if(rogue.ce&&rogue.ce.id===loc.fighter.id){
						rogue.ce = null;
						statistics.clearEnemyBar();
					}
					loc.fighter.died();
					this.count++; 
				} else if(loc.fighter.sleeping)
					loc.fighter.wakeUp();
				break;
			case EARTHQUAKE:
				if(!evalPercentage(this.perc)||loc.indestructible||loc.enter&&!loc.enter.portal)
					return;
				loc.found = false;
				loc.lighten = false;
				loc.wall = WALL_HP*coinToss();
				loc.floor = !loc.wall;
				loc.hidden = false;
				loc.door = false;
				loc.trap = null;
				if(loc.enter&&loc.enter.portal){
					rogue.portal.x = rogue.portal.y = 0;
					loc.enter = null;
				}
				let found;
				if(loc.item){
					let items = {};
					let i = 0;
					for(let key in loc.item){
						let item = loc.item[key];
						if(item.indestructible||evalPercentage(item.earth)){
							items[EA[i++]] = item;
							found = true;
							continue;
						}
						if(item.mod===UNIQUE&&!item.identified){
							let id = item.type+','+item.tabId+','+item.uniqueId;
							if(this.cui[id]) delete this.cui[id];
						}
						delete Item.list[item.id];
					}
					loc.item = items;
				}
				if(loc.fighter){
					if(loc.fighter.id===ROGUE||loc.fighter.boss
					||loc.fighter.indestructible||evalPercentage(loc.fighter.earth)){
						if(loc.fighter.sleeping) loc.fighter.wakeUp();
						found = true;
					} else{ 
						if(loc.fighter.mod===UNIQUE)
							delete rogue.cue[loc.fighter.name[ENG]];
						loc.fighter.died();
					}
				}
				loc.wall = WALL_HP*(!found&&coinToss());
				loc.floor = !loc.wall;
				loc.draw();
				break;
		}
	}
};

const minimap = {
	clear(){
		ctxMap.clearRect(0,0,canvas.width,canvas.height);
	},
	shadow(){
		ctxMap.save();
		ctxMap.shadowColor = CLEAR;
		ctxMap.globalAlpha = 0.9;
		ctxMap.fillStyle = BLACK;
		ctxMap.fillRect(0,0,canvas.width,canvas.height-SS*fs);
		ctxMap.restore();
	},
	draw(keyCode){
		if(!(keyCode===65||keyCode===83||keyCode===67||keyCode===73||keyCode===77&&isShift
		||keyCode===188&&isShift||keyCode===190&&isShift||keyCode===80||keyCode===84)) //a,s,c,i,m,<,>,p,t
			return;
		this.clear();
		if(keyCode===77&&isShift){ //M
			flag.minimap = false;
			flag.regular = true;
			return;
		}
		this.shadow();
		if(rogue.blinded) return;
		for(let i=0,l=coords.length;i<l;i++){
			for(let loc of coords[i]){
				if((loc.found||loc.detected)&&loc.symbol!=='.'&&(!loc.fighter||loc.fighter.detected||litMapIds[loc.x+','+loc.y])){
					if(keyCode===83&&(rogue.x!=loc.x||rogue.y!=loc.y) //s
					&&(loc.item['a']||loc.fighter||loc.stairs||loc.enter||loc.trap))
						continue;
					else if(keyCode===67&&!loc.fighter //c
					&&(loc.item['a']||loc.stairs||loc.enter||loc.trap))
						continue;
					else if(keyCode===73&&(loc.fighter||loc.stairs||loc.enter||loc.trap)){ //i
						if(loc.item['a']){
							let s = loc.item[EA[Object.keys(loc.item).length-1]];
							this.symbol(loc.x,loc.y,s.symbol,s.color,s.identified||rogue.hallucinated? s.shadow:0,
							s.identified||rogue.hallucinated? s.stroke:0);
						}
						continue;
					} else if((keyCode===188||keyCode===190) //<,>
					&&(loc.item['a']||loc.fighter||loc.enter||loc.trap)){
						if(loc.stairs&&!loc.hidden)
							this.symbol(loc.x,loc.y,loc.stairs.symbol,loc.stairs.color,0);	
						continue;
					} else if(keyCode===80
					&&(loc.item['a']||loc.fighter||loc.stairs||loc.enter||loc.trap)){ //p
						if(loc.enter&&loc.enter.portal)
							this.symbol(loc.x,loc.y,loc.enter.symbol,loc.enter.color,0,loc.enter.stroke);
						continue;
					} else if(keyCode===84
					&&(loc.item['a']||loc.fighter||loc.stairs||loc.enter)){ //t
						if(loc.trap&&!loc.hidden)
							this.symbol(loc.x,loc.y,loc.trap.symbol,loc.trap.color,0,0);
						continue;
					}
					this.symbol(loc.x,loc.y,loc.symbol,loc.color,loc.shadow,loc.stroke);
				}
			}
		}
	},
	symbol(x,y,symbol,color,shadow,stroke){
		ctxMap.save();
		ctxMap.fillStyle = color;
		if(rogue.hallucinated&&!shadow) ctxMap.shadowColor = PURPLE;
		if(shadow) ctxMap.shadowColor = shadow;
		if(stroke){
			ctxMap.strokeStyle = stroke;
			ctxMap.strokeText(symbol,(x+1.5)*this.fs,(y+0.5)*this.fs);
		}
		ctxMap.fillText(symbol,(x+1.5)*this.fs,(y+0.5)*this.fs);
		ctxMap.restore();
	},
} ;

const map = {
	init(town){
		coords = [];
		let width = town? IN_WIDTH:WIDTH;
		let height = town? IN_HEIGHT:HEIGHT;
		for(let i=0;i<width;i++){
			coords.push([]);
			for(let j=0;j<height;j++){
				coords[i].push(new Location(i,j));
				if(i===0||i===width-1||j===0||j===height-1){
					coords[i][j].indestructible = true;
					coords[i][j].wall = WALL_HP;
				}
			}
		}
	},
	
	fill(town){
		let width = coords.length;
		let height = coords[0].length;
		for(let i=1;i<width-1;i++){
			for(let j=1;j<height-1;j++){
				let loc = coords[i][j];
				if(town){
					if(!loc.wall) loc.floor = true;
				} else if(!loc.floor&&!loc.wall){
					if(evalPercentage(1))
						creation.item(1,'coin',1,1,LOCATION,i,j);
					else if(evalPercentage(0.1))
						creation.item(1,'gem',1,1,LOCATION,i,j);
					loc.wall = WALL_HP;
				}
			}
		}
	},
	
	draw(cX,cY){
		ctxMain.clearRect(0,0,canvas.width,canvas.height);
		let X = cX- (IN_WIDTH-1)/2;
		let Y = cY - (IN_HEIGHT)/2;
		ctxMain.drawImage(canvas.buf,X*fs,Y*fs,IN_WIDTH*fs,IN_HEIGHT*fs,
		(canvas.width-IN_WIDTH*fs)/2,0,IN_WIDTH*fs,IN_HEIGHT*fs);
	},
	
	redraw(cX,cY){
		if(rogue.blinded) return;
		ctxBuf.clearRect(0,0,canvas.width*2,canvas.height*2);
		for(let i=0,l=coords.length;i<l;i++){
			for(let loc of coords[i])
				if(loc.detected||loc.found) loc.draw(true);
		}
		rogue.drawStats();
	},
	
	lighten(init){
		for(let i=0,l=coords.length;i<l;i++){
			for(let loc of coords[i]){
				if(loc.hidden){
					loc.hidden = false;
					loc.wall = false;
				} else if(loc.lighten&&loc.found)
					continue;
				loc.lighten = true;
				loc.found = true;
				loc.draw();
			}
		}
		if(!init) rogue.lightenOrDarken('Lighten');
	},
};

const goBlind =()=>{
	ctxBuf.clearRect(0,0,canvas.width*2,canvas.height*2);
	coords[rogue.x][rogue.y].draw();
	rogue.ce = null;
	statistics.clearEnemyBar();
}

const seeInvisible =(see)=>{
	for(let key in Enemy.list){
		let enemy = Enemy.list[key];
		if(enemy.invisible){
			coords[enemy.x][enemy.y].draw();
			if(!see&&rogue.ce&&rogue.ce.id===enemy.id){
				rogue.ce = null;
				statistics.clearEnemyBar();
			}
		}
	}
	map.draw(rogue.x,rogue.y);
}

const hallucinate = {
	all(undo){
		this.search(Enemy.list,true,undo);
		this.search(Item.list,false,undo);
		map.redraw(rogue.x,rogue.y);
	},
	search(list,enemy,undo){
		for(let key in list){
			if(enemy&&list[key].mimic) continue;
			if(!undo)
				this.one(list[key],enemy);
			else
				this.undoOne(list[key]);
			coords[list[key].x][list[key].y].getSymbol();
		}
	},
	one(obj,enemy,mimic){
		let type, tabId;
		if(!obj.nameTemp) obj.nameTemp = {};
		obj.nameTemp['a'] = obj.name['a'];
		obj.nameTemp['b'] = obj.name['b'];
		if(enemy){
			type = FT[rndInt(FT.length-1)];
			tabId = rndInt(fighterTab[type].length-1);
			var fighter = fighterTab[type][tabId];
			obj.name['a'] = fighter.name['a'];
			obj.name['b'] = fighter.name['b'];
			obj.symbol = fighter.symbol;
			obj.color = fighter.color;
		} else {
			type = IT[rndInt(IT.length-2)];
			obj.typeHalluc = type;
			tabId = rndIntBet(1,itemTab[type].size);
			var item = itemTab[type].get(tabId);
			obj.name['a'] = item.nameReal['a']; 
			obj.name['b'] = item.nameReal['b']; 
			obj.symbol = item.symbol;
			obj.color = item.color; 
			if(mimic){
				obj.__proto__ = Item.prototype;
				obj.name['a'] = obj.getName(false,false,'a');
				obj.name['b'] = obj.getName(false,false,'b');
				obj.__proto__ = Enemy.prototype;
			}
		}
		if(!enemy&&!item.equipable||mimic){
			obj.shadow = 0;
			obj.stroke = 0;
			return;
		}
		if(enemy&&fighter.mod===UNIQUE
		||!enemy&&itemUniqueMap[item.type].has(item.tabId)&&coinToss()){
			if(!enemy){
				if(type==='amulet'&&evalPercentage(1)){
					obj.name['a'] = 'Amulet of Yendor';
					obj.name['b'] = 'イェンダーの魔除け';
				} else{
					let array = itemUniqueMap[item.type].get(item.tabId);
					let unique = array[rndInt(array.length-1)];
					[obj.name['a'], obj.name['b']] = obj.getUniqueName(unique.name);
				}
			}
			obj.shadow = GOLD;
			obj.stroke = INDIGO;
		} else if(coinToss()){
			obj.stroke = 0;
			let bias = rndIntBet(1,MAX_BIAS_NUMS);
			if(coinToss()){
				let affixes = modTab[PREFIX].get(bias).affix;
				let aff = affixes[rndInt(affixes.length-1)];
				obj.name['a'] = `${obj.name['a']} ${aff.name['a']}`;
				obj.name['b'] = `${aff.name['b']}${obj.name['b']}`;
				obj.shadow = YELLOW;
			} else{
				let sufId = rndInt(modTab[SUFFIX].length-1);
				let pre = modTab[PREFIX].get(bias);
				let suf = modTab[SUFFIX][sufId];
				obj.name['a'] = `${pre.name['a']} ${obj.name['a']} ${suf.name['a']}`;
				obj.name['b'] = `${suf.name['b']}${pre.name['b']}${obj.name['b']}`;
				obj.shadow = AQUA;
			}
		} else{
			obj.shadow = 0;
			obj.stroke = 0;
		}
	},
	undoOne(obj){
		obj.name['a'] = obj.nameTemp['a'];
		obj.name['b'] = obj.nameTemp['b'];
		obj.typeHalluc = null;
		obj.symbol = obj.symbolReal;
		obj.color = obj.colorReal;
		obj.shadow = obj.shadowReal ;
		obj.stroke = obj.strokeReal;
	},
} ;

const statistics = {
	list:{a:{name:{a:'Strength',b:'筋力'},term:'str'},
		b:{name:{a:'Dexterity',b:'器用さ'},term:'dex'},
		c:{name:{a:'Constitution',b:'耐久力'},term:'con'},
		d:{name:{a:'Intelligence',b:'知力'},term:'int'},
	},
	draw(msg,x,y,color,shadow,measured,right,limit){
		ctxStats.save();
		if(!measured) x *= fs;
		if(limit) limit *= fs;
		if(color) ctxStats.fillStyle = color;
		if(shadow) ctxStats.shadowColor = shadow;
		if(right) ctxStats.textAlign = 'right';
		ctxStats.fillText(msg,x,canvas.height+y*fs+5,limit);
		ctxStats.restore();
	},
	clear(){
		ctxStats.clearRect(0,canvas.height-SS*fs,canvas.width,SS*fs);
	},
	clearCondition(){
		ctxStats.clearRect(0,canvas.height-(SS+2)*fs,canvas.width,2*fs);
	},
	ShadowAndBar(e){
		let width = ctxStats.measureText(e.name).width;
		ctxStats.save();
		ctxStats.shadowColor = CLEAR;
		ctxStats.fillStyle = BLACK;
		ctxStats.globalAlpha = 0.5;
		ctxStats.fillRect(canvas.width/2-width/2-3,(MS)*fs,width+6,2*fs); //
		ctxStats.fillStyle = e.getConditionColor();
		ctxStats.fillRect(canvas.width/2-width/2-3,(MS+1)*fs,e.hp/e.hpMax*width+6,fs);
		ctxStats.restore();
	},
	drawEnemyBar(e,examine){
		this.clearEnemyBar();
		if(!(e.isShowing()
		&&(examine||distanceSq(e.x,e.y,rogue.x,rogue.y)<=FOV_SQ
		&&lineOfSight(e.x,e.y,rogue.x,rogue.y))))
			return '';
		this.ShadowAndBar(e);
		ctxStats.save();
		ctxStats.textAlign = 'center';
		if(e.shadow) ctxStats.shadowColor = e.shadow;
		let name = e.getName(false,true);
		if(e.stroke){
			ctxStats.strokeStyle = e.stroke;
			ctxStats.strokeText(`Lv${e.lvl} ${name}`,canvas.width/2,(MS+0.5)*fs);
		}
		if(e.cursed) ctxStats.fillStyle = RED;
		ctxStats.fillText(`Lv${e.lvl} ${name}`,canvas.width/2,(MS+0.5)*fs);
		ctxStats.restore();
		if(examine) return name;
	},
	clearEnemyBar(){
		ctxStats.clearRect(0,MS*fs-5,canvas.width,2*fs+5); //
	},
	drawCurrentEnemy(){
		if(!rogue.ce) return;
		ctxStats.save();
		ctxStats.textAlign = 'center';
		ctxStats.fillStyle = GRAY;
		ctxStats.strokeRect(canvas.width-2*fs,canvas.height-4.5*fs,fs,fs);
		let symbol = rogue.ce.symbol;
		ctxStats.fillStyle = rogue.ce.color;
		if(rogue.ce.shadow)
			ctxStats.shadowColor = rogue.ce.shadow;
		if(rogue.ce.stroke) {
			ctxStats.strokeStyle = rogue.ce.stroke;
			ctxStats.strokeText(symbol,canvas.width-1.5*fs,canvas.height-4*fs);
		}
		ctxStats.fillText(symbol,canvas.width-1.5*fs,canvas.height-4*fs);
		ctxStats.restore();
	},
};

const cursol = {
	init(){
		this.x = this.cX = rogue.x;
		this.y = this.cY = rogue.y;
	},
	
	draw(x,y){
		ctxCur.strokeRect(x*fs+canvas.width/2-(IN_WIDTH-1)/2*fs-fs/2,y*fs,fs,fs);
	},
	
	clear(x,y){
		ctxCur.clearRect(x*fs+canvas.width/2-(IN_WIDTH-1)/2*fs-fs/2-1,y*fs-1,fs+3,fs+3);
	},
	
	plot(x,y,color){
		let X = x - this.cX;
		let Y = y - this.cY + (IN_HEIGHT)/2;
		ctxCur.save();
		ctxCur.fillStyle = color;
		ctxCur.globalAlpha = 0.3;
		ctxCur.clearRect(X*fs-fs/2+canvas.width/2,Y*fs,fs,fs);
		ctxCur.fillText('＊',X*fs+canvas.width/2,(Y+0.5)*fs);
		ctxCur.restore();
	}
};

const message = {
	list:[],
	page:1,
	previous(keyCode){
		let l = this.list.length;
		let p = Math.ceil(l/(IN_HEIGHT-MS-2));
		if(p===0) p=1;
		if(keyCode===72||keyCode===37|keyCode===100) //h,left arrow,T4
			this.page = 1;
		else if(keyCode===74||keyCode===40||keyCode===98){ //j,down arrow,T2
			if(p!==this.page) this.page++;
		} else if(keyCode===75||keyCode===38||keyCode===104){ //k,up arrow,T8
			if(this.page!==1) this.page--;
		} else if(keyCode===76||keyCode===39||keyCode===102) //l,right arrow,T6
			this.page = p;
		else
			return;
		inventory.clear();
		inventory.shadow(MIDDLE);
		let i = (this.page-1)*(IN_HEIGHT-MS-2);
		let j = MS+1;
		for(i;i<this.page*(IN_HEIGHT-MS-2);i++){
			if(!this.list[i]) break;
			let msg = this.list[i].text;
			if(this.list[i].count>1) msg += ` (x${this.list[i].count})`;
			ctsInv.fillText(`${msg}`,0.5*fs,(j++)*fs);
		}
		ctsInv.save();
		ctsInv.fillText(`[${l}/${MAX_MSG_LIST_LEN}]`,1.5*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.textAlign = 'right';
		ctsInv.fillText(rogue.cl===ENG?
		`Message List [${this.page}/${p}]`
		:`メッセージ項目 [${this.page}/${p}]`,
		24*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.restore();
		message.draw(message.get(M_PREVIOUS),true);
	},
	counter:0,
	clear(all){
		ctxMsg.clearRect(0,0,canvas.width/(all? 1:2),canvas.height/(all? 1:2));
	},
	delete(){
		setTimeout(()=>ctxMsg.clearRect(0,(this.counter-0.5)*fs,canvas.width/2,(this.counter--)*fs+1)
		,MSG_SPEED);
	},
	draw(msg,fixed){
		if(!fixed){
			this.counter++;
			if(!this.list[0]||this.list[0].text!==msg){
				this.list.unshift({text:msg,count:1});
				if(this.list.length>MAX_MSG_LIST_LEN) this.list.pop();
				let curMap = ctxMsg.getImageData(0,0,canvas.width/2,(MAX_MSG_LEN-0.5)*fs);
				this.clear();
				ctxMsg.putImageData(curMap,0,fs);
			} else{
				msg += ` (x${++this.list[0].count})`;
				ctxMsg.clearRect(0,0.5*fs,canvas.width/2+1,fs+1)
			}
			this.delete();
			ctxMsg.fillText(msg,fs/2,fs,canvas.width/2-fs/2);
		} else{
			ctsInv.clearRect(0.5*fs+canvas.width/2,0.5*fs,canvas.width/2+1,fs+1)
			ctsInv.fillText(msg,0.5*fs+canvas.width/2,fs,canvas.width/2-0.5*fs);
		}
	},
	get(id){
		return msgMap.get(id)[rogue.cl];
	}
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



const lineOfSight =(x0,y0,x1,y1,color,skill)=>{
	let rangeSq = skill&&skill.range>=0? skill.range**2:FOV_SQ;
	let radius = skill&&skill.radius? skill.radius:0;
	let [xT, xS, yT, yS] = [x0, x0, y0, y0];
	let steep = Math.abs(y1-y0)>Math.abs(x1-x0);
	if(steep) [x0, y0, x1, y1] = [y0, x0, y1, x1];
	let [dx, dy] = [Math.abs(x1-x0), Math.abs(y1-y0)];
	let error = dx/2;
	let ystep = y0<y1? 1:-1;
	let y = y0;
	let los = true;
	let inc = x0<x1? 1:-1;
	for(let x=x0+inc;x1-x+inc;x+=inc){
		error -= dy;
		if(error<0){
			y += ystep;
			error += dx;
		}
		[xS, yS] = !steep? [x, y]:[y, x];
		let loc = coords[xS][yS];
		if(color){
			if(distanceSq(x,y,x0,y0)>rangeSq){
				los = false;
				break;
			}
			cursol.plot(xS,yS,color);
			if(radius&&(skill.each||loc.fighter&&skill.penetrate)){
				if(!(loc.wall||loc.door===CLOSE))
					shadowcasting.main(xS,yS,radius,ud,ud,color);
			} else if(loc.fighter&&(!skill||!skill.penetrate&&(!skill.parabora||x===x1&&y===y1)))
				break;
		}
		if(loc.wall||loc.door===CLOSE){
			los = false;
			break;
		}
		[xT, yT] = [xS, yS];
	}
	if(color&&radius){
		if(!los) [xS, yS] = [xT, yT];
		shadowcasting.main(xS,yS,radius,ud,ud,color);
	}
	return los;
} 

/*
4\5|6/7
---+---
3/2|1\0
*/
const shadowcasting = { 
	transforms:[
		{xx: 1,xy: 0,yx: 0,yy: 1},
		{xx: 0,xy: 1,yx: 1,yy: 0},
		{xx: 0,xy:-1,yx: 1,yy: 0},
		{xx:-1,xy: 0,yx: 0,yy: 1},
		{xx:-1,xy: 0,yx: 0,yy:-1},
		{xx: 0,xy:-1,yx:-1,yy: 0},
		{xx: 0,xy: 1,yx:-1,yy: 0},
		{xx: 1,xy: 0,yx: 0,yy:-1},
	],
	main(x0,y0,radius,type,lvl,color,lightRad,search,fighter){
		if(!radius) return;
		this.radiusSq = radius**2;
		this.width = coords.length;
		this.height = coords[0].length;
		this.type = type;
		this.lvl = lvl;
		this.color = color;
		this.fighter = fighter;
		if(search) coords[x0][y0].findHiddenObject();
		if(this.type==='Lighten'){
			this.lightRadSq = lightRad**2;
			this.oldLitMap = litMapIds;
			litMapIds = {};
		}
		this.do(x0,y0);
		for(let i=0;i<=7;i++){
			this.line(i,x0,y0,radius,search);
			this.around(this.transforms[i],x0,y0,radius,1,1,0);
		}
		if(this.type==='Lighten'){
			for(let key in this.oldLitMap){
				let [x, y] = key.split(',');
				coords[x][y].draw();
			}
		}
	},
	line(i,x0,y0,radius,search){
		for(let j=1;j<=radius;j++){
			let [x1, y1] = [DR[i].x*j, DR[i].y*j];
			let l = distanceSq(x1,y1,0,0);
			if(l>this.radiusSq) break;
			let [x, y] = [x0+x1, y0+y1];
			this.do(x,y,l);
			if(search&&j===1) coords[x][y].findHiddenObject();
			if(coords[x][y].wall||coords[x][y].door===CLOSE) break;
		}
	},
	around(tr,x0,y0,radius,startDia,leftSlope,rightSlope){
		for(let xc=startDia,blocked;xc<=radius&&!blocked;xc++){
			for(let yc=xc;yc>=0;yc--){
				let x = x0+xc*tr.xx+yc*tr.xy;
				let y = y0+xc*tr.yx+yc*tr.yy;
				if(x<0||y<0||x>=this.width||y>=this.height) continue;
				let leftBlockSlope = (yc+0.5)/(xc-0.5);
				let rightBlockSlope = (yc-0.5)/(xc+0.5);
				if(rightBlockSlope>leftSlope)
					continue;
				else if(leftBlockSlope<rightSlope)
					break;
				if(yc!==xc&&yc!==0){
					let l = distanceSq(xc,yc,0,0);
					if(l<=this.radiusSq) this.do(x,y,l);
				}
				if(blocked){
					if(coords[x][y].wall||coords[x][y].door===CLOSE)
						this.rightSlopeSaved = rightBlockSlope;
					else{
						blocked = false;
						leftSlope = this.rightSlopeSaved;
					}
				} else if(coords[x][y].wall||coords[x][y].door===CLOSE){
					blocked = true;
					this.rightSlopeSaved = rightBlockSlope;
					if(leftBlockSlope<=leftSlope)
						this.around(tr,x0,y0,radius,xc+1,leftSlope,leftBlockSlope);
				}
			}
		}
	},
	do(x,y,distance){
		let loc = coords[x][y];
		if(this.color)
			cursol.plot(x,y,this.color);
		else if(this.type==='Lighten'){
			if((!this.lightRadSq||distance>this.lightRadSq)
			&&!loc.lighten)
				return;
			let id = x+','+y;
			litMapIds[id] = true;
			if(this.oldLitMap[id])
				delete this.oldLitMap[id];
			else{
				loc.found = true;
				loc.draw();
			}
		} else if(this.type==='Light'){
			if(!loc.lighten){
				loc.lighten = true;
				loc.found = true;
				loc.draw();
			}
		} else if(this.type==='Dark'){
			if(loc.lighten){
				loc.lighten = false;
				loc.draw();
			}
		} else if(this.type==='Aim'){
			if(loc.fighter&&loc.fighter.id!==ROGUE
			&&(!rogue.ce||this.distanceSaved>distance)
			&&loc.fighter.isShowing()
			&&lineOfSight(rogue.x,rogue.y,x,y)){
				rogue.ce = loc.fighter;
				this.distanceSaved = distance;
			}
		} else if(loc.fighter
		&&this.fighter.isOpponent(loc.fighter)) //skill
			this.fighter.haveCast(this.type,this.lvl,loc.fighter,x,y);
	}
};

const Position = class{
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
	}
}

const BinaryHeap = class{
	constructor(){
		this.list = [];
	}
	push(value){
		this.list.push(value);
		this.upHeap(this.list.length-1);
	}
	upHeap(cKey){
		if(!cKey) return;
		let pKey = Math.floor((cKey-1)/2);
		if(this.compare(cKey,pKey)){
			this.list.swap(cKey,pKey);
			this.upHeap(pKey);
			return true;
		}
	}
	shift(){
		let eKey = this.list.length-1;
		if(eKey<=0) return !eKey? this.list.shift():null;
		this.list.swap(0,eKey);
		let value = this.list.pop();
		this.downHeap(0);
		return value;
	}
	delete(value){
		let eKey = this.list.length-1;
		if(eKey<=0) return !eKey? this.list.shift():null;
		let key = this.list.indexOf(value);
		if(key===eKey){
			this.list.pop();
			return;
		}
		this.list.swap(key,eKey);
		this.list.pop();
		if(!this.upHeap(key)) this.downHeap(key);
	}
	downHeap(pKey){
		let lcKey = 2*pKey+1;
		if(!this.list[lcKey]) return;
		let cKey;
		let rcKey = lcKey+1;
		if(!this.list[rcKey]) 
			cKey = lcKey;
		else
			cKey = this.compare(lcKey,rcKey)? lcKey:rcKey;
		if(this.compare(cKey,pKey)){
			this.list.swap(cKey,pKey);
			this.downHeap(cKey);
			return true;
		}
	}
	update(value,up){
		let key = this.list.indexOf(value);
		up? this.upHeap(key):this.downHeap(key);
	}
	compare(i,j){
		let list = this.list[i];
		let list2 = this.list[j];
		return list.fScore<list2.fScore
			||list.fScore===list2.fScore
			&&(list.gScore<list2.gScore||list.next);
	}
}

const Queue = class extends BinaryHeap{
	constructor(){
		super();
	}
	
	moveAll(){
		while(this.list[0].energy>=0&&this.list[0].id!==ROGUE){
			this.list[0].act();
			if(flag.died) return;
		}
		if(this.list[0].energy<0){
			this.getEnergyAll();
			this.moveAll();
			return;
		}
		if(rogue.cdl&&rogue.turn%SPAWN_FREQ===0)
			creation.enemy(1,RANDOM,RANDOM,AWAY,ud,ud,true);
		rogue.turn++;
		rogue.healAndHunger();
		if(!flag.rest) map.draw(rogue.x,rogue.y);
		if(rogue.paralyzed||rogue.sleeping){
			rogue.decreaseEnergy();
			message.draw(rogue.cl==ENG?
			`You are still ${rogue.sleeping? 'sleeping':'paralyzed'}`
			:`まだ${rogue.sleeping? '昏睡':'麻痺'}している`);
			flag.wait = true;
		} else{
			flag.wait = false;
			rogue.done = false;
		}
	}
	
	getEnergyAll(){
		let list = this.list;
		this.list = [];
		for(let fighter of list){
			fighter.increaseEnergy();
			this.push(fighter);
		}
	}
	
	compare(i,j){
		return this.list[i].energy>this.list[j].energy;
	}
}
queue = new Queue();

const Node = class extends Position{
	constructor(x,y,gScore,parent){
		super(x,y);
		this.id = x+','+y;
		this.gScore = gScore;
		this.parent = parent;
	}
	
	calcScore(xG,yG,pas,map){
		if(map)
			this.hScore = 0;
		else{
			let x = Math.abs(this.x - xG);
			let y = Math.abs(this.y - yG);
			if(pas)
				this.hScore = x+y;
			else
				this.hScore = x>y? x:y;
		}
		this.calcFScore()
	}
		
	calcFScore(){
		this.fScore = this.gScore + this.hScore; 
	}
}

const pathfinding = {
	init(xG,yG,pas,map){
		this.pas = pas;
		this.map = map;
		this.loop = 0;
		this.heap = new BinaryHeap();
		this.openSet = {};
		this.idList = {};
		this.pathList = [];
		this.xG = xG; //goal
		this.yG = yG;
	},
	createNode(){
		let node = new Node(...arguments);
		node.calcScore(this.xG,this.yG,this.pas,this.map);
		this.idList[node.id] = true;
		return node;
	},
	createNeighborNodes(node){
		let nextNode = null;
		let newNode = null;
		let gScore = node.gScore+1;
		let count = 0;
		for(let key in DR){
			if(this.map&&gScore>FOV||this.pas&&++count>4) break;
			let x = node.x+DR[key].x;
			let y = node.y+DR[key].y;
			if(!coords[x][y].wall&&(!this.pas||coords[x][y].door!==CLOSE)){
				let id = x+','+y;
				if(!this.idList[id]){
					newNode = this.createNode(x,y,gScore,node);
					this.openSet[id] = newNode;
					this.heap.push(newNode);
				} else if(this.openSet[id]
				&&this.openSet[id].gScore>gScore){
					newNode = this.openSet[id];
					newNode.gScore = gScore;
					newNode.calcFScore();
					this.heap.update(newNode);
				} else
					continue;
				if(!nextNode&&newNode.hScore<node.hScore){
					nextNode = true;
					newNode.next = true;
					this.heap.update(newNode,true);
				}
			}
		}
		return this.heap.shift();
	},
	getPath(node){
		this.pathList.push({x:node.x,y:node.y});
		if(node.parent) this.getPath(node.parent);
	},
	main(x0,y0,xG,yG,pas,map){
		if(x0===xG&&y0===yG) return [{x:xG,y:yG}]
		this.init(xG,yG,pas,map);
		let curNode = this.createNode(x0,y0,0);
		if(map){
			var distanceMap = {};
			distanceMap[x0+','+y0] = 0;
		}
		while(this.loop++<MAX_PF_LOOP){
			curNode = this.createNeighborNodes(curNode);
			if(!curNode) break;
			if(map)
				distanceMap[curNode.x+','+curNode.y] = curNode.gScore;
			else if(curNode.x===this.xG&&curNode.y===this.yG){
				this.getPath(curNode);
				this.pathList.pop();
				break;
			}
			delete this.openSet[curNode.id];
		}
		if(map)
			return distanceMap;
		else
			return this.pathList[0]? this.pathList.reverse():null;
	},
};

const Location = class extends Position{
	constructor(x,y){
		super(x,y)
		this.item = {};
	}
	
	getSymbol(){
		if(this.fighter&&this.fighter.isShowing()){
			this.symbol = this.fighter.symbol;
			this.color = this.fighter.color;
			this.shadow = this.fighter.shadow;
			this.stroke = this.fighter.stroke;
		} else if(!this.found){
			this.symbol =  ' ';
			this.color = WHITE;
			this.shadow = 0;
			this.stroke = 0;
		} else if(this.enter){
			this.symbol = this.enter.symbol;
			this.color = this.enter.color;
			this.shadow = 0;
			this.stroke = this.enter.stroke;
		} else if(this.trap&&!this.hidden){
			this.symbol = this.trap.symbol;
			this.color = this.trap.color;
			this.shadow = 0;
			this.stroke = 0;
		} else if(this.door&&!this.hidden){
			this.symbol = this.door===CLOSE? '+':'\'';
			this.color = BROWN;
			this.shadow = 0;
			this.stroke = 0;
		} else if(this.wall){
			this.symbol = '#';
			this.color = this.indestructible? BROWN:GRAY;
			this.shadow = 0;
			this.stroke = 0;
		} else if(this.item['a']){
			let l = Object.keys(this.item).length;
			let item = this.item[EA[l-1]];
			this.symbol = item.symbol;
			this.color = item.color;
			if(item.identified||rogue.hallucinated){
				this.shadow = item.shadow;
				this.stroke = item.stroke;
			} else {
				this.shadow = 0;
				this.stroke = 0;
			}
		} else if(this.stairs&&!this.hidden){
			this.symbol = this.stairs.symbol;
			this.color = this.stairs.color;
			this.shadow = 0;
			this.stroke = 0;
		} else if(this.floor){
			this.symbol = '.';
			this.color = WHITE;
			this.shadow = 0;
			this.stroke = 0;
		}
	}
	
	draw(redraw){
		if(!redraw) this.getSymbol();
		if(rogue.blinded&&(this.x!==rogue.x||this.y!==rogue.y)) return;
		if(!redraw) ctxBuf.clearRect(this.x*fs,this.y*fs,fs,fs);
		ctxBuf.save();
		ctxBuf.fillStyle = this.color;
		if(rogue.hallucinated&&!this.shadow) ctxBuf.shadowColor = PURPLE;
		if(this.shadow&&option.shadow.user) ctxBuf.shadowColor = this.shadow;
		if(this.stroke){ 
			ctxBuf.strokeStyle = this.stroke;
			ctxBuf.strokeText(this.symbol,(this.x+0.5)*fs,(this.y+0.5)*fs);
		}
		ctxBuf.fillText(this.symbol,(this.x+0.5)*fs,(this.y+0.5)*fs);
		if(!litMapIds[this.x+','+this.y]){
			ctxBuf.globalAlpha = 0.5;
			ctxBuf.fillStyle = BLACK;
			ctxBuf.shadowColor = CLEAR;
			ctxBuf.fillRect(this.x*fs,this.y*fs,fs,fs);
		}
		ctxBuf.restore();
	}
		
	getInfor(stepOn){
		if(flag.examine){
			let msg = message.get(M_EXAMINE);
			if(wizard) msg += message.get(M_EXAMINE_W);
			message.draw(msg+` (${cursol.x},${cursol.y})`,true);
		}
		if(!this.found&&!this.detected) return;
		let msg = '';
		if(flag.examine&&this.fighter&&this.fighter.id!==ROGUE)
			msg = statistics.drawEnemyBar(this.fighter,true);
		if(this.stairs&&!this.hidden){
			let nameStairs = this.stairs.getName();
			if(rogue.cl===ENG)
				msg += (msg? ' on ':'')+nameStairs;
			else
				msg = nameStairs+(msg? 'の上に'+msg:'');
		}
		if(this.item['a']&&!this.wall){
			let l = Object.keys(this.item).length;
			let item = this.item[EA[l-1]];
			if(!this.stairs&&!this.hidden&&msg){
				msg = rogue.cl===ENG? msg+' on ':'の上に'+msg;
			} else if(l===1&&msg)
				msg = rogue.cl===ENG? msg+' and ':'と'+msg;
			else if(l>1&&msg)
				msg = rogue.cl===ENG? msg+', ':'と'+msg;
			let nameItem = item.getName();
			if(rogue.cl===ENG)
				msg = msg+nameItem+(l>1? ' and more':'');
			else
				msg = nameItem+(l>1? 'とアイテムの山':'')+msg;
		}
		if(this.enter){
			let msgAdd = flag.examine;
			if(!flag.examine){
				if(flag.dash) flag.dash = false;
				var entered = true;
				if(this.enter.portal){
					if(stepOn&&(rogue.cdl||rogue.pdl))
						rogue.enterPortal();
					else{
						msgAdd = true;
						entered = false;
					}
				} else
					rogue.enterBuild(this.enter);
			}
			if(msgAdd){
				let nameEnter = this.enter.name[rogue.cl];
				msg = !msg? nameEnter:nameEnter+(rogue.cl===ENG? ', ':'と')+msg;
			}
		} else if(this.trap){
			let nameTrap = this.trap.getName();
			if(flag.examine&&!this.hidden)
				msg = !msg? nameTrap:nameTrap+(rogue.cl===ENG? ', ':'と')+msg;
			else if(!flag.examine){
				if(!this.trap.protection&&(stepOn||this.hidden&&coinToss())){
					message.draw(rogue.cl===ENG?
					`You got caught in ${nameTrap}`
					:`${nameTrap}に捕まった`);
					rogue.trapped(this.trap,stepOn);
				} else if(!this.hidden)
					msg += nameTrap;
			}
		}
		if(msg){
			message.draw(rogue.cl===ENG?
			`You see ${msg}`
			:`${msg}が見える`);
			if(!flag.examine&&this.item['a']&&!this.enter) rogue.itemAuto(this.item);
			if(flag.dash) flag.dash = false;
		}
		return entered;
	}
	
	openOrCloseDoor(){
		let l = distanceSq(this.x,this.y,rogue.x,rogue.y);
		if(this.door===OPEN){
			this.door = CLOSE;
			audio.playSound('shutdoor',l);
		} else{
			this.door = OPEN;
			audio.playSound('opendoor',l);
		}
		this.draw();
		if(litMapIds[this.x+','+this.y]) rogue.lightenOrDarken('Lighten');
	}
	
	deleteItem(a,quantity=1){
		let item = this.item[a];
		item.quantity -= quantity;
		if(!item.quantity){
			delete Item.list[item.id];
			deleteAndSortItem(this.item,a);
		}
		this.draw();
	}
	
	deleteTrap(draw){
		if(this.hidden) this.hidden = false;
		this.trap = null;
		if(draw) this.draw();
	}
	
	deleteDoor(draw){
		if(this.hidden){
			this.hidden = false;
			this.wall = false;
		}
		this.door = 0;
		this.floor = true;
		if(draw) this.draw();
	}
	
	deleteWall(draw){
		if(this.indestructible) this.indestructible = false;
		this.wall = false;
		this.floor = true;
		if(draw) this.draw();
	}
	
	findHiddenObject(){
		if(rogue.blinded||!this.hidden||!searchProb()) return;
		this.hidden = false;
		let name;
		if(this.trap)
			name = this.trap.getName();
		else if(this.door===CLOSE){
			name = rogue.cl===ENG? 'door':'ドア';
			this.wall = false;
		} else if(this.stairs)
			name = this.stairs.getName();
		message.draw(rogue.cl===ENG?
		`You found a hidden ${name}`
		:`隠された${name}を発見した`);
		this.draw();
		if(flag.dash) flag.dash = false;
	}
}

const Thing = class{
	constructor(obj){
		copyObj(this,obj);
	}
	
	init(position,x,y){
		if(position!==LOCATION){
			this.getPositionRandomly(position===INIT,position===AWAY);
			[x, y] = [this.x, this.y];
		}
		if(!this.abort) this.putDown(x,y);
	}
	
	getPositionRandomly(init,away,tele){
		let x,y,loc;
		let count = 0;
		if(init){
			let	room, id;
			let l = dungeon.rns.length;
			dungeon.rns.shuffle();
			let i = 0;
			do{ id = dungeon.rns[i++];
				if(id===ud){
					dungeon.rns.shuffle();
					i = 0;
					id = dungeon.rns[i++];
				}
				room = dungeon.list[id];
				x = rndIntBet(room.x+1,room.x+room.width-2);
				y = rndIntBet(room.y+1,room.y+room.height-2);
				loc = coords[x][y];
			} while((loc.wall||loc.door
			||loc.fighter||loc.item['a'] //
			||loc.trap||loc.enter
			||loc.stairs)&&++count<1000);
		} else{
			let [width, height] = [coords.length, coords[0].length];
			do{	x = rndInt(width-2)+1;
				y = rndInt(height-2)+1;
				loc = coords[x][y];
			} while((loc.wall||loc.door
			||loc.fighter||loc.item['a'] //
			||loc.trap||loc.enter||loc.stairs
			||away&&distanceSq(x,y,rogue.x,rogue.y)<=FOV_SQ)
			&&++count<1000);
		}
		if(count<100)
			[this.x, this.y] = [x, y];
		else if(!tele&&this.id!==ROGUE)
			this.dissapear();
	}
	
	spiralSearch(x0,y0,type,count=0){
		let [x, y] = [x0, y0];
		let width = coords.length;
		let height = coords[0].length;
		let loop = 0;
		let limit = type===ITEM&&count<MAX_SEARCH_RANGE? count:MAX_SEARCH_RANGE;
		if(this.spiralSearchCheck(x,y,x0,y0,type,count)) return;
		do{	y--;
			while(y<y0){
				x++,y++;
				if(x<width-1&&y>0&&this.spiralSearchCheck(x,y,x0,y0,type,count)) return;
			}
			while(x>x0){
				x--,y++;
				if(x<width-1&&y<height-1&&this.spiralSearchCheck(x,y,x0,y0,type,count)) return;
			}
			while(y>y0){
				x--,y--;
				if(x>0&&y<height-1&&this.spiralSearchCheck(x,y,x0,y0,type,count)) return;
			}
			while(x<x0){
				x++,y--;
				if(x>0&&y>0&&this.spiralSearchCheck(x,y,x0,y0,type,count)) return;
			}
		} while(loop++<=limit);
		if(type===ITEM&&++count<MAX_PACK_COUNT)
			this.spiralSearch(x0,y0,type,count);
		else if(this.id!==ROGUE) 
			this.dissapear();
	}
	
	spiralSearchCheck(x,y,x0,y0,type,count){
		let loc = coords[x][y];
		if(!loc.wall&&loc.door!==CLOSE&&!loc.enter){
			if((type===FIGHTER&&!loc.fighter
			||type===ITEM&&!loc.trap&&!loc.door
				&&!loc.item[EA[count]]
			||type===TRAP&&!loc.item['a'] //
				&&!loc.door
				&&!loc.trap&&!loc.stairs
			||type===STAIRCASE&&!loc.door
				&&!loc.trap&&!loc.stairs
			||type===ENTER)
			&&lineOfSight(x0,y0,x,y)){
				[this.x, this.y] = [x, y];
				return true;
			}
		}
	}
	
	dissapear(){
		this.abort = true;
		let name = this.getName();
		message.draw(rogue.cl===ENG?
		`${name} dissapeared`
		:`${name}は消え去った`);
	}
}

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

const Trap = class extends Thing{
	constructor(obj,hidden){
		super(obj);
		this.hidden = hidden;
	}
	
	putDown(x,y){
		this.spiralSearch(x,y,TRAP);
		if(this.abort) return;
		coords[this.x][this.y].trap = this;
		coords[this.x][this.y].hidden = this.hidden;
		if(!this.hidden) coords[this.x][this.y].draw();
	}
	
	getName(){
		let name = this.name[rogue.cl];
		if(this.circle){
			if(rogue.cl===ENG)
				name = `Magic Circle of ${name}`;
			else
				name = `${name}の魔法円`;
		} else if(this.dart){
			if(rogue.cl===ENG)
				name = `Dart Trap(${name})`;
			else
				name = `投げ矢の罠(${name})`;
		} else if(this.gas){
			if(rogue.cl===ENG)
				name = `Gas Trap of ${name}`;
			else
				name = `${name}ガスの罠`;
		}
		return name;
	}
}

const Staircase = class extends Thing{
	constructor(obj,hidden){
		super(obj)
		this.hidden = hidden;
	}
	
	putDown(x,y){
		this.spiralSearch(x,y,STAIRCASE);
		if(this.abort) return;
		coords[this.x][this.y].stairs = this;
		coords[this.x][this.y].hidden = this.hidden;
		if(!this.hidden) coords[this.x][this.y].draw();
		Staircase.list[this.x+','+this.y] = this;
	}
	
	getName(){
		return this.name[rogue.cl];
	}
}
Staircase.list = {};

const Door = class extends Position{
	constructor(x,y,dr,roomId){
		super(x,y);
		this.dr = dr;
		this.roomId = roomId;
	}
	
	getPosInFrontOf(){
		let [x, y] = [this.x, this.y];
		switch(this.dr){
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

const Room = class extends Position{
	constructor(x,y,id,width,height){
		super(x,y);
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
const Cave = class extends Room{
	constructor(x,y,id,width,height,lighten){
		super(x,y,id,width,height);
		this.lighten = lighten;
		this.doors = [];
		this.doorIds = [];
	}
	
	create(){
		for(let i=this.x;i<this.x+this.width;i++){
			for(let j=this.y;j<this.y+this.height;j++){
				let loc = coords[i][j];
				loc.lighten = this.lighten;
				if(!loc.indestructible
				&&(i===this.x||i===this.x+this.width-1
				||j===this.y||j===this.y+this.height-1))
					loc.wall = WALL_HP;
				else
					loc.floor = true;
			}
		}
		for(let i=0;i<4;i++)
			this.doors[i] = this.getDoor(i);
	}
	
	getDoor(i){
		let x, y;
		let found = true;
		if(i===LEFT){ //0
			if(this.id%CAVE_NUM_COL===0) return null;
			x = this.x;
			y = rndIntBet(this.y+1,this.y+this.height-2);
		} else if(i===DOWN){ //1
			if(Math.floor(this.id/CAVE_NUM_COL)===CAVE_NUM_ROW-1) return null;
			x = rndIntBet(this.x+1,this.x+this.width-2);
			y = this.y+this.height-1;
		} else if(i===UP){ //2
			if(Math.floor(this.id/CAVE_NUM_COL)===0) return null;
			x = rndIntBet(this.x+1,this.x+this.width-2);
			y = this.y;
		} else{ //3 RIGHT
			if(this.id%CAVE_NUM_COL===CAVE_NUM_COL-1) return null;
			x = this.x+this.width-1;
			y = rndIntBet(this.y+1,this.y+this.height-2);
		}
		coords[x][y].door = CLOSE;
		if(evalPercentage(10))
			coords[x][y].hidden = true;
		else{
			coords[x][y].wall = false;
			coords[x][y].floor = true;
		}
		this.doorIds.push(i);
		return new Door(x,y,i,this.id);
	}
	
	createNest(){
		let magic = rogue.cdl>=20&&evalPercentage(10);
		let boost = NEST_BOOST*(magic? 2:1);
		let bias = RANDOM;
		if(magic&&evalPercentage(25)){
			let pre;
			let i = 0;
			modBiasNums.shuffle();
			do{
				bias = modBiasNums[i++]
				pre = modTab[PREFIX].get(bias);
			} while(pre.lvl>rogue.cdl+boost
			||evalPercentage(pre.rarity));
		}
		let type = RANDOM;
		if(rogue.cdl>=10&&evalPercentage(5)){
			do{
				type = FT[rndInt(FT.length-2)];
			} while(fighterTab[type][0].lvl>rogue.cdl+boost);
		}
		for(let i=this.x;i<this.x+this.width;i++){
			for(let j=this.y;j<this.y+this.height;j++){
				if(i===this.x||i===this.x+this.width-1
				||j===this.y||j===this.y+this.height-1){
					if(magic){
						if(coords[i][j].wall&&!coords[i][j].hidden)
							coords[i][j].indestructible= true;
						else{ 
							if(coords[i][j].door) coords[i][j].hidden = true;
							coords[i][j].wall = WALL_HP;
						}
					}
					continue;
				}
				if(coinToss()){
					if(coinToss())
				 		creation.item(1,RANDOM,RANDOM,1,LOCATION,i,j,magic,boost);
					else
						creation.trap(1,RANDOM,LOCATION,i,j);
				}
				if((!coords[i][j].trap||!coords[i][j].trap.protection)&&evalPercentage(25))
					creation.enemy(1,type,RANDOM,LOCATION,i,j,false,magic,bias,boost);
			}
		}
	}
}

const dungeon = {
	roomIds:enums(0,CAVE_NUM_MAX-1),
	create(){
		this.list = [];
		this.rns = []; //room numbers
		let count = 0;
		this.roomIds.shuffle();
		for(let i of this.roomIds){
			if(evalPercentage(15)&&++count<=10) continue;
			let width = rndIntBet(CAVE_WIDTH_MIN,CAVE_WIDTH_MAX);
			let height = rndIntBet(CAVE_HEIGHT_MIN,CAVE_HEIGHT_MAX);
			let x = rndInt(CAVE_WIDTH_MAX - width)+ ((i%CAVE_NUM_COL)*(CAVE_WIDTH_MAX+1));
			let y = rndInt(CAVE_HEIGHT_MAX - height) + (Math.floor(i/CAVE_NUM_COL)*(CAVE_HEIGHT_MAX+1));
			let room = new Cave(x,y,i,width,height,lightenProb());
			room.create();
			this.list[i] = room;
			this.rns.push(i);
		}
		this.connect();
		this.deleteDoors();
		map.fill();
		for(let room of this.list){
			if(room&&rogue.cdl>=10&&evalPercentage(1)) room.createNest();
		}
	},
	
	connect(){
		this.connectDoors(true);
		for(let i=0,l=rndIntBet(3,5);i<l;i++)
			this.connectDoors();
	},
	
	connectDoors(all){
		this.rns.shuffle();
		for(let i=0,l=this.rns.length;i<l-1;i++){
			let room1 = this.list[this.rns[i]];
			if(!room1.doorIds.length) continue;
			let room2 = this.list[this.rns[i+1]];
			if(!room2.doorIds.length) continue;
			room1.doorIds.shuffle();
			let door1 = room1.doors[room1.doorIds.shift()];
			room2.doorIds.shuffle();
			let door2 = room2.doors[room2.doorIds.shift()];
			this.createPassage(door1,door2);
			if(!all) break;
		}
	},
	
	createPassage(door1,door2){
		let [x1, y1] = door1.getPosInFrontOf();
		let [x2, y2] = door2.getPosInFrontOf();
		let path = pathfinding.main(x1,y1,x2,y2,true);
		if(path===null) throw new Error('path error');
		coords[x1][y1].floor = true;
		for(let pos of path)
			coords[pos.x][pos.y].floor = true;
		door1.connected = door2.connected = true;
	},
	
	deleteDoors(){
		for(let room of this.list){
			if(!room) continue;
			for(let door of room.doors){
				if(door===null||door.connected) continue;
				let loc = coords[door.x][door.y];
				loc.hidden = false;
				loc.floor = false;
				loc.door = false;
				door = null;
			}
		}
	}
};

/*
* 0 1  2 3
* 4 5  6 7
*/
const Build = class extends Room{
	constructor(){
		super(...arguments);
	}
	
	create(){
		for(let i=this.x;i<this.x+this.width;i++){
			for(let j=this.y;j<this.y+this.height;j++){
				coords[i][j].wall = WALL_HP;
				coords[i][j].indestructible = true;
			}
		}
		this.createEntrance();
	}
	
	createEntrance(){
		let x,y;
		if(this.id===0||this.id===1){
			if(this.id===1){
				[x, y] = [this.x+BUILD_WIDTH-1,this.y];
				coords[x][y].enter = enter[CURE];
				coords[x][y].deleteWall();
			}
			[x, y] = [this.x+BUILD_WIDTH-1, this.y+BUILD_HEIGHT-1];
		}else if(this.id===2||this.id===3){
			if(this.id===2){
				[x, y] = [this.x,this.y];
				coords[x][y].enter = enter[BLACKSMITH];
				coords[x][y].deleteWall();
			}
			[x, y] = [this.x, this.y+BUILD_HEIGHT-1];
		}else if(this.id===4||this.id===5)
			[x, y] = [this.x+BUILD_WIDTH-1, this.y];
		else if(this.id===6||this.id===7)
			[x, y] = [this.x, this.y];
		coords[x][y].enter = enter[this.id+2];
		coords[x][y].deleteWall();
	}
}

const town = {
	createAll(){
		this.list = [];
		for(let i=0;i<BUILD_NUM_MAX;i++){
			let x = 3+(i%BUILD_NUM_COL)*BUILD_WIDTH+(i%BUILD_NUM_COL)*2;
			if(i%BUILD_NUM_COL>=2) x++;
			let y = 3+Math.floor(i/BUILD_NUM_COL)*BUILD_HEIGHT + Math.floor(i/BUILD_NUM_COL)*2;
			if(Math.floor(i/BUILD_NUM_COL)) y++;
			this.createOne(x,y,i,BUILD_WIDTH,BUILD_HEIGHT);
		}
		coords[POSITION.stash.x][POSITION.stash.y].enter = enter[STASH];
		map.fill(true);
		map.lighten(true);
	},
	createOne(){
		let build = new Build(...arguments);
		build.create();
		this.list.push(build);
	},
};

const inventory = {
	shadow(direction){
		ctsInv.save();
		ctsInv.shadowColor = CLEAR
		ctsInv.globalAlpha = 0.9;
		ctsInv.fillStyle = BLACK;
		if(direction===LEFT||direction===MIDDLE)
			ctsInv.fillRect(0,(MS-0.5)*fs,canvas.width/2,(IN_HEIGHT-MS+0.5)*fs);
		if(direction===RIGHT||direction===MIDDLE)
			ctsInv.fillRect(canvas.width/2,(MS-0.5)*fs,canvas.width/2,(IN_HEIGHT-MS+0.5)*fs);
		ctsInv.restore();
	},
	clear(){
		ctsInv.clearRect(0,0,canvas.width,canvas.height/*-SS*fs*/);
	},
	show(list,direction,a,place){
		if(flag.shop){
			var quantity2 = !cn? 1:Number(cn);
			if(a&&quantity2>list[a].quantity)
				quantity2 = list[a].quantity;
		} else if(place===P_STASH)
			var l = (enter[STASH].page-1)*MAX_PACK_COUNT;
		this.shadow(direction);
		let i = 1.5+(direction===RIGHT? IN_WIDTH/2:0);
		let j = MS+1;
		let count = 0;
		let weight = 0.0;
		for(let key in list){
			let item = list[key];
			if(!flag.pack&&!item
			||place===P_STASH&&key<l
			||flag.stash&&a!==ud&&key!=a
			||flag.equip&&!item.equipable
			||flag.quaff&&item.type!='potion'
			||flag.read&&item.type!='scroll'&&!item.chargeBook
			||flag.identify&&item.identified&&key!==a
			||(flag.repair||flag.blacksmith)&&(!item.equipable||item.durab===item.durabMax)
			||flag.synthesize&&item.alchemy
			||flag.zap&&item.type!='wand'
			||flag.eat&&item.type!='food'
			||flag.gain&&(item.type!='book'||!item.skill)
			||flag.destroy&&flag.number&&key!==a
			||(flag.shop||flag.option)&&a&&key!==a
			||flag.investigate&&!item.identified
			||flag.fuel&&(item.type!=='light'&&item.type!=='oil'
				||rogue.equipment['light'].torch&!item.torch
				||!rogue.equipment['light'].torch&&item.torch)
			)
				continue;
			ctsInv.save();
			ctsInv.textAlign = 'center';
			let char;
			if(place===P_STASH)
				char = EA[key-l].toUpperCase();
			else
				char = direction===RIGHT? key:key.toUpperCase();
			ctsInv.fillText(char,i*fs,j*fs);
			ctsInv.fillText(')',i*fs+fs/3,j*fs);
			if(flag.pack&&!item||flag.option||flag.cure){
				if(!flag.pack){
					ctsInv.textAlign = 'left';
					ctsInv.fillText(item[rogue.cl],(i+1)*fs,j*fs,14*fs);
					ctsInv.textAlign = 'right';
					if(flag.cure){
						let cost = enter[CURE].list[key].cost;
						ctsInv.fillText(`$${cost}`,(i+22.5)*fs,j*fs);
					} else if(!flag.option2){
						let msg = '';
						let opt = option[item['a']];
						if(opt.choise)
							msg = opt.choise[opt.user][rogue.cl];
						else if(rogue.cl===ENG)
							msg = opt.user? 'yes':'no';
						else
							msg = opt.user? 'はい':'いいえ';
						ctsInv.fillText(msg,(i+22.5)*fs,j*fs);
					}				
				}
				j++;
				ctsInv.restore();
				continue;
			}
			ctsInv.fillStyle = item.color;
			if(item.shadow) ctsInv.shadowColor = item.shadow;
			if(item.stroke){
				ctsInv.strokeStyle = item.stroke;
				ctsInv.strokeText(item.symbol,(i+1)*fs,j*fs);
			}
			ctsInv.fillText(item.symbol,(i+1)*fs,j*fs);
			if(item.cursed&&item.identified)
				ctsInv.fillStyle = RED;
			else if(item.equipable&&!item.durab)
				ctsInv.fillStyle = GRAY;
			else
				ctsInv.fillStyle = WHITE;
			ctsInv.textAlign = 'left';
			let name = item.getName(false,item.quantity,rogue.cl,flag.gamble&&place===P_SHOP);
			if(item.stroke) ctsInv.strokeText(name,(i+1.5)*fs,j*fs,15*fs);
			ctsInv.fillText(name,(i+1.5)*fs,j*fs,15*fs);
			ctsInv.fillStyle = WHITE;
			ctsInv.shadowColor = SHADOW;
			ctsInv.textAlign = 'right';
			if(flag.shop||flag.blacksmith){
				let price = flag.shop? item.price*quantity2:item.getDurabPrice();
				ctsInv.fillText(`$${price}`,(i+20.3)*fs,j*fs,3.5*fs);
			}
			let quantity;
			if(place===P_SHOP||flag.shop&&flag.number)
				quantity = quantity2;
			else {
				quantity = item.quantity;
				weight += item.weight*quantity;
			}
			ctsInv.fillText((item.weight*quantity).toFixed(1),(i+22.5)*fs,(j++)*fs);
			ctsInv.restore();
			if(++count===MAX_PACK_COUNT) break;
		}
		if(flag.option||flag.cure) return;
		let maxNum = this.getMaxNumber(place);
		ctsInv.fillText(`[${count}/${maxNum}]`,i*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.save();
		ctsInv.textAlign = 'right';
		let msg = '';
		if(place===P_SHOP){
			let weight = rogue.cl===ENG? 'Weight':'重量';
			msg = `${weight} x${quantity2}`;
		}else if(place===P_STASH)
			msg =` [${enter[STASH].page}/${MAX_STASH_PAGE}]`;
		else{
			if(flag.gain){
				let skillPoints = rogue.cl===ENG? 'Skill Points':'スキルポイント';
				msg = `${skillPoints} ${rogue.skillPoints} `;
			}
			let total = rogue.cl===ENG? 'Total':'計';
			msg += `${total} ${weight.toFixed(1)}kg`;
		}
		if(flag.shop){
			let sellOrCost;
			if(direction===RIGHT)
				sellOrCost = rogue.cl===ENG? 'Sell Value':'売値';
			else
				sellOrCost = rogue.cl===ENG? 'Cost':'買値';
			msg = `${sellOrCost} x${quantity2} ${msg}`;
		}
		ctsInv.fillText(msg,(i+22.5)*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.restore();
	},
	getMaxNumber(place){
		let maxNum;
		switch(place){
			case P_PACK:
			case P_FLOOR:
			case P_SHOP:
				maxNum = MAX_PACK_COUNT;
				break;
			case P_BOX:
				maxNum = rogue.numBoxes;
				break;
			case P_CUBE:
				maxNum = MAX_CUBE_COUNT;
				break;
			case P_STASH:
				maxNum = MAX_STASH_COUNT;
				break;
		}
		return maxNum;
	},
	sort(a,list,array){
		let found = false;
		let item = list[a];
		let index = IT.indexOf(list[a].type);
		for(let key in list){
			let item2 = list[key];
			let index2 = IT.indexOf(item2.type);
			if(!found&&index2<index) continue;
			if(key>=a) break;
			found = true;
			if(!item.identified){
				if(index2===index) continue;
			}else{
				if((item2.identified&&item2.tabId<=item.tabId)
				&&index2===index){
					if(!(item2.charges>=0)||item2.charges>item.charges) continue;
				}
			}
			if(array){
				let temp = item;
				list.splice(a,1);
				list.splice(key,0,temp);
				return key;
			} else{
				let i = EA.indexOf(a);
				let j = EA.indexOf(key);
				for(let k=i;k>j;k--)
					[list[EA[k]], list[EA[k-1]]] = [list[EA[k-1]], list[EA[k]]];
				return;
			}
		}
		return a; //stash page
	}
}

const deleteAndSortItem =(list,a)=>{
	let i = EA.indexOf(a);
	let j = Object.keys(list).length-1-i;
	for(let k=0;k<j;k++)
		list[EA[i]] = list[EA[++i]];
	delete list[EA[i]];
}


const Material = class extends Thing{
	constructor(obj){
		super(obj);	
		this.symbolReal = this.symbol;
		if(this.color) this.colorReal = this.color;
		this.shadow = 0;
		this.shadowReal = 0;
		this.stroke = 0;
		this.strokeReal = 0;
	}
	
	investigate(direction,char){
		if(char&&this.mimic&&!this.identified) return;
		inventory.shadow(direction);
		let i = 1;
		if(direction===RIGHT) i += (IN_WIDTH/2);
		let j = MS+1;
		ctsInv.save();
		ctsInv.textAlign = 'center';
		if(this.shadow)
			ctsInv.shadowColor = this.shadow;
		if(this.stroke){
			ctsInv.strokeStyle = this.stroke;
			ctsInv.strokeText(this.symbol,(i)*fs,j*fs);
		}
		ctsInv.fillStyle = this.color;
		ctsInv.fillText(this.symbol,(i)*fs,j*fs);
		if(this.cursed) ctsInv.fillStyle = RED;
		ctsInv.fillStyle = this.equipable&&!this.durab? GRAY:WHITE;
		ctsInv.textAlign = 'left';
		let name = char? this.getName(false,true):this.getName(false,1);
		if(this.stroke) ctsInv.strokeText(name,(i+0.6)*fs,j*fs,17.5*fs);
		ctsInv.fillText(name,(i+0.6)*fs,j*fs,17.5*fs); //
		j += 1;
		ctsInv.fillStyle = WHITE;
		ctsInv.shadowColor = SHADOW;
		if(this.desc){
			this.desc[rogue.cl].replace(/\t/g,'').split('\n').forEach((value,key)=>{
				ctsInv.fillText(key%2? '   '+value:value,(i-0.5)*fs,(j++)*fs);
			});
		} else if(this.nameSkill){
			let msg = rogue.getSkillInfo(skillMap.get(this.nameSkill),this.skillLvl,true);
			ctsInv.fillText(msg,(i-0.5)*fs,(j++)*fs,23*fs);
		} else
			j++;
		if(!char){ //
			let	weight = rogue.cl===ENG? 'weight':'重量';
			ctsInv.fillText(`${weight} ${this.weight}kg`,(i-0.5)*fs,(j++)*fs);
		} else{
			let [lvl, expGain, exp, expNext, totalWeight] = rogue.cl===ENG?
				['Level', 'Exp Gain', 'Exp', 'Exp Next', 'Total Weight']
				:['レベル', '取得経験値', '経験値', '次経験値', '総重量'];
			ctsInv.fillText(`${lvl} ${this.lvl} (${this.lvlMax}), ${exp} ${this.exp} (${this.expMax}), ${expNext} ${this.expNext}, ${expGain} ${this.expGain}, ${totalWeight} ${this.totalWeight}kg (${this.weightLimit}kg)`
			,(i-0.5)*fs,j*fs,IN_WIDTH*fs);
			j += 2;
		}
		j++;
		ctsInv.restore();
		if(!this.equipable&&!this.type=='gem'&&!char) return;
		if(char){
			fs -= 3;
			ctsInv.font = fs+'px Arial';
		}
		let count = 0;
		let msgLimit = 8*fs;
		let valueLimit = 5*fs;
		let mod;
		for(let [key,term] of investigationMap.entries()){
			if(!term){
				if(key==='mod'&&!char){
					i += IN_WIDTH/4;
					j  = MS+5;
					mod = true;
				}
				continue;
			}
			if(!char&&(!term.item&&!this[key]||this[key]===ud)
			||char&&!term.char)
				continue;
			ctsInv.save();
			let msg = term.name[rogue.cl];
			let value = this[key];
			if(term.plus&&!char&&this[key]>0) value = '+'+value;
			if(term.perc) value += '%';
			if(key==='atkType')
				value = this.getAtkTypeName();
			else if(char){
				if(this.findBuffStat(key)||this.modList&&this.modList[key])
					ctsInv.shadowColor = C_BUFF;
				if(term.max){
					let max = this[term.max];
					if(term.perc) max += '%';
					value += ` (${max})`;
				}
			} else if(mod)
				ctsInv.shadowColor = C_BUFF;
			if(term.bool){
				if(this[key])
					value = rogue.cl===ENG? 'yes':'有り';
				else
					value = rogue.cl===ENG? 'no':'無し';
			}
			if(key==='material')
				value = materialMap.get(this[key]).name[rogue.cl];
			ctsInv.textAlign = 'right';
			ctsInv.fillText(value,(i-1+IN_WIDTH/4)*fs,j*fs,valueLimit);
			ctsInv.textAlign = 'left';
			ctsInv.fillText(msg,(i-0.5)*fs,(j++)*fs,msgLimit);
			if(key==='embeddedNum'&&this[key]){
				for(let k=0,l=this.embeddedList.length;k<l;k++){
					this.embeddedList[k].__proto__ = Item.prototype;
					let name = this.embeddedList[k].getName();
					ctsInv.fillText(name,(i+0.5)*fs,(j++)*fs,msgLimit);
				}
			}
			if(char&&!(++count%/*18*/21)){
				i += IN_WIDTH/4;
				j= MS+4+2;
			} 
			ctsInv.restore();
		}
		if(char){
			fs += 3;
			ctsInv.font = fs+'px Arial';
		}
	}
	
	getAtkTypeName(){
		let value = '';
		if(this.atkType&AT_S) value += rogue.cl===ENG? 'Slash':'斬';
		if(this.atkType&AT_T){
			if(value) value += '・'
			value += rogue.cl===ENG? 'Thrust':'突';
		}
		if(this.atkType&AT_B){
			if(value) value += '・'
			value += rogue.cl===ENG? 'Blunt':'打';
		}
		return value;
	}
	
	getVolumeBase(){
		let value;
		switch(this.type){
			case 'enemy':
			case 'armor':
				value = 1;
				break;
			case 'shield':
				value = 0.5;
				break;
			case 'helm':
			case 'boots':
				value = 0.4;
				break;
			case 'gloves':
			case 'melee':
			case 'missile':
			case 'staff':
				value = 0.3;
				break;
			case 'light':
				value = 0.2;
				break;
			case 'cloak':
			case 'belt':
				value = 0.1;
				break;
			case 'amulet':
				value = 0.02;
			case 'ring':
				value = 0.01;
				break;
		}
		return value;
	}
	
	getBaseandWeight(){
		let char = this.type==='enemy';
		let volume = this.getVolumeBase()*this.volumeRate;
		this.weight = Math.ceil(volume*this.density*100)/100;
		let durabRate = 1;
		if(this.weapon||char){
			let num = 1+Math.floor(this.volumeRate);
			let sides = 3+this.hardness/10;
			if(this.twoHanded) num++;
			if(this.curved){
				sides++;
				durabRate *= 3/4;
			}
			if(this.edge===1){
				sides++;
				durabRate /= 2;
			} else if(this.edge===2)
				durabRate *= 3/4;
			if(this.atkType===AT_B) durabRate *= 5/4;
			if(this.type==='staff') sides /= 2;
			this.dmgBase = num+'d'+Math.ceil(sides);
		}
		if(this.armor||char){
			if(!this.acTRate) this.acTRate = 1;
			this.acSBase = Math.ceil(volume*this.hardness);
			this.acTBase = Math.ceil(volume*(this.hardness+this.toughness)/2*this.acTRate);
			this.acBBase = Math.ceil(volume*this.toughness);
		}
		if(!char){
			let durab = this.durabBonus+DURAB_BASE+this.weight*DURAB_RATE;
			this.durabMax = this.durab = Math.ceil(durab*durabRate);
		}
	}
	
	getMaterialBase(){
		let i = 0;
		materialList.shuffle();
		while(!(this.material&materialList[i])) i++;
		return materialList[i];
	}
	
	getMaterial(lvl,gem,matBase,matId){
		if(!matBase) matBase = gem? M_GEM:this.getMaterialBase();
		this.material = matBase;
		let materials = materialMap.get(matBase);
		let list = materials.list;
		if(!(matId>=0)){
			let nums = materials.nums;
			nums.shuffle();
			let i = 0;
			while(list[nums[i]].lvl>lvl||evalPercentage(list[nums[i]].rarity)) i++;
			matId = nums[i];
		} 
		let mat = list[matId];
		this.density = mat.density;
		this.hardness = mat.hardness;
		this.toughness = mat.toughness;
		this.priceRate = mat.priceRate;
		if(mat.values) mergeMod(this,mat.values,0,1,1);
		let [nameA, nameB] = [mat.name['a'], mat.name['b']];
		if(matBase===M_GEM) this.bias = mat.bias;
		if(gem){
			this.name['a'] = this.nameReal['a'] = nameA;
			this.name['b'] = this.nameReal['b'] = nameB;
		} else if(this.mod!==UNIQUE){
			if(this.type==='enemy'){
				this.name['a'] = nameA+' '+this.name['a'];
				this.name['b'] = nameB+'の'+this.name['b'];
			} else{
				this.nameReal['a'] = nameA+' '+this.nameReal['a'];
				this.nameReal['b'] = nameB+'の'+this.nameReal['b'];
			}
		}
		this.color = this.colorReal = mat.color;
	}
	
	getMagic(bias,lvl){
		let char = this.type==='enemy';
		let pre,suf;
		if(bias!==RANDOM) 
			pre = modTab[PREFIX].get(bias);
		else if(coinToss()){
			let i = 0;
			modBiasNums.shuffle();
			do{
				bias = modBiasNums[i++];
				pre = modTab[PREFIX].get(bias);
			} while(!pre[this.type]||pre.lvl>lvl
			||evalPercentage(pre.rarity));
		}
		if(!pre||coinToss()){
			let i = 0;
			modSufNums.shuffle();
			do{
				suf = modTab[SUFFIX][modSufNums[i++]];
			} while(!suf[this.type]||suf.lvl>lvl
			||evalPercentage(suf.rarity)
			||suf.indestructible&&char&&evalPercentage(99));
		}
		let perc = Math.ceil(this.lvl+MAGIC_RARITY);
		let max = Math.floor(lvl/10)+1;
		let color;
		let namePreA = '';
		let namePreB = '';
		let mods = {};
		if(pre){
			mergeMod(mods,pre[this.type],perc+BIAS_BONUS,max);
			namePreA = pre.name['a']+' ';
			namePreB = pre.name['b'];
			color = pre.color;
		}
		let nameSufA = '';
		let nameSufB = '';
		if(suf){
			mergeMod(mods,suf[this.type],perc,max);
			nameSufA = ' '+suf.name['a'];
			nameSufB = suf.name['b'];
		}
		if(char){
			if(color) this.color = color;
			this.name['a'] = `${namePreA}${this.name['a']}${nameSufA}`;
			this.name['b'] = `${nameSufB}${namePreB}${this.name['b']}`;
			this.getOrLooseStats(mods,true,true);
			if(pre) this.getBias(bias);
		} else{
			if(color) this.colorMod = color;
			this.nameReal['a'] = `${namePreA}${this.nameReal['a']}${nameSufA}`;
			this.nameReal['b'] = `${nameSufB}${namePreB}${this.nameReal['b']}`;
			mergeMod(this,mods,ud,ud,ud,true);
		}
		this.modList = mods;
		this.mod = MAGIC;
		this.shadow = this.shadowReal = AQUA;
	}
	
	getRare(bias,lvl){
		let char = this.type==='enemy';
		let pre;
		if(bias===RANDOM){
			let i = 0;
			modBiasNums.shuffle();
			do{
				bias = modBiasNums[i++];
				pre = modTab[PREFIX].get(bias);
			} while(!pre[this.type]||pre.lvl>lvl
			||evalPercentage(pre.rarity));
		} else
			pre = modTab[PREFIX].get(bias);
		let affix;
		let j = 0;
		let affNums = modAffNumsMap.get(bias);
		affNums.shuffle();
		do{
			affix = pre.affix[affNums[j++]];
		} while(evalPercentage(affix.rarity));
		let perc = Math.ceil(this.lvl+affix.rarity);
		let max = Math.floor(lvl/10)+1;
		let min = affix.rarity>=50? Math.floor((affix.rarity-50)/10)+2:1;
		if(min>max) min = max;
		let mods = {};
		mergeMod(mods,pre[this.type],perc+BIAS_BONUS,max);
		let suf;
		let i = 0;
		let count = 0;
		let perc2 = perc;
		modSufNums.shuffle();
		do{	suf = modTab[SUFFIX][modSufNums[i++]];
			if(suf[this.type]&&suf.lvl<=lvl
			&&!evalPercentage(suf.rarity)
			&&!(suf.indestructible&&char&&evalPercentage(99))){
				mergeMod(mods,suf[this.type],perc,max,min);
				if(++count>=RARE_MOD_NUM){
					if(count>=min||!evalPercentage(perc2))
						break;
					else
						perc2 /= 2;
				}
			}
		} while(modSufNums[i]!==ud);
		this.mod = RARE;
		this.shadow = this.shadowReal = YELLOW;
		if(char){
			if(affix.color) this.color = affix.color;
			this.name['a'] = `${this.name['a']} ${affix.name['a']}`;
			this.name['b'] = `${affix.name['b']}${this.name['b']}`;
			this.getOrLooseStats(mods,true,true);
			this.getBias(bias);
		} else{
			if(affix.color) this.colorMod = affix.color;
			this.nameReal['a'] = `${this.nameReal['a']} ${affix.name['a']}`;
			this.nameReal['b'] = `${affix.name['b']}${this.nameReal['b']}`;
			mergeMod(this,mods,ud,ud,ud,true);
		}
		this.modList = mods;
	}
	
	getUnique(unique){
		this.shadow = this.shadowReal = GOLD;
		this.stroke = this.strokeReal = INDIGO;
		if(this.type==='enemy'){
			rogue.cue[this.name[ENG]] = true;
			this.hpRate += 3;
			this.mpRate += 3;
			this.mpReg += 100;
		} else{
			mergeMod(this,unique.values,ud,ud,ud,true);
			[this.nameReal['a'], this.nameReal['b']] = this.getUniqueName(unique.name,true);
			this.mod = UNIQUE;
		}
	}
	
	getUniqueName(names,save){
		let [nameA, nameB, pos] = [names['a'],names['b'],names.pos];
		let [namePreB,nameSufB] = pos===PREFIX? [nameB,'']:['',nameB];
		if(namePreB) namePreB += 'の'
		nameA = `${this.nameReal['a']} of ${nameA}`;
		nameB = `${namePreB}${this.nameReal['b']}${nameSufB}`;
		if(save) this.nameUnique = {a:nameA,b:nameB,pos:pos};
		return [nameA, nameB];
	}
} 

const mergeMod =(obj,obj2,perc,max,min,fixed)=>{
	let count = 0;
	for(let key in obj2){
		let mod = obj2[key];
		let value = 0;
		if(fixed||mod===true||mod===DEFAULT)
			value = mod;
		else{
			if(!count){
				count++;
				while(count<min||count<max&&evalPercentage(perc)){
					count++;
					perc /= 2;
				}
			}
			for(let i=0;i<count;i++)
				value += isFinite(mod)? mod:dice.roll(mod);
		}
		obj[key]? obj[key] += value:obj[key] = value;
	}
	if(obj.numBoxes&&obj.numBoxes>=MAX_BOX_NUM) obj.numBoxes = MAX_BOX_NUM-1;
}

const Fighter = class extends Material{
	constructor(obj){
		super(obj);
		this.lvlMax = this.lvl;
		this.levi = !!this.levi;
		this.hpRate += HP_RATE;
		this.hpSum = 0;
		if(!this.hpReg) this.hpReg = 0;
		this.hpRegBuff = 0;
		this.mpRate += MP_RATE;
		this.mpSum = 0;
		this.mpReg = 0;
		this.mpRegBuff = 0;
		this.strMax = this.str;
		this.strBonus = 0;
		this.strSus = 0;
		this.dexMax = this.dex;
		this.dexBonus = 0;
		this.dexSus = 0;
		this.conMax = this.con;
		this.conBonus = 0;
		this.conSus = 0;
		this.intMax = this.int;
		this.intBonus = 0;
		this.intSus = 0;
		this.spdMax = this.spd;
		this.spdBuff = 0;
		this.spdNerf = 0;
		this.speeded = 0;
		this.slowed = 0;
		this.mf = 0;
		this.mfBuff = 0;
		this.gf = 0;
		this.gfBuff = 0;
		this.expBonus = 0;
		this.atBare = this.atkType;
		this.dmgBonus =0;
		this.dmgBuff =0;
		this.digging = 0;
		this.dmgHuman = 0;
		this.dmgDemon = 0;
		this.dmgAnimal = 0;
		this.dmgDragon = 0;
		this.dmgUndead = 0;
		this.dmgGiant = 0;
		this.dmgSpirit = 0;
		this.dmgFire = 0;
		this.dmgLightning = 0;
		if(!this.dmgPoison) this.dmgPoison = 0;
		if(!this.dmgAcid) this.dmgAcid = 0;
		this.dmgDiceNum = 0; 
		this.dmgDiceSides = 0;
		if(!this.atkCon) this.atkCon = 0;
		if(!this.atkPara) this.atkPara = 0;
		if(!this.atkSlow) this.atkSlow = 0;
		if(!this.atkInf) this.atkInf = 0;
		if(!this.atkBlind) this.atkBlind = 0;
		if(!this.atkRadi) this.atkRadi = 0;
		if(!this.atkCold) this.atkCold = 0;
		if(!this.atkDrain) this.atkDrain = 0;
		if(!this.atkStealGold) this.atkStealGold = 0;
		if(!this.atkStealItem) this.atkStealItem = 0;
		this.rateBonus = 0;
		this.rateBuff = 0;
		this.acBonus = 0;
		this.acSValueSum = 0;
		this.acTValueSum = 0;
		this.acBValueSum = 0;
		this.acSBaseSum = 0;
		this.acTBaseSum = 0;
		this.acBBaseSum = 0;
		this.acSBase = this.acTBase = this.acBBase = this.acBase;
		this.acBuff = 0;
		this.iasBase = 0;
		this.fcrBase = 0;
		this.frwBase = 0;
		if(!this.ias) this.ias = 0;
		if(!this.fcr) this.fcr = 0;
		if(!this.frw) this.frw = 0;
		this.pack = {};
		this.fireMax = this.fire;
		this.fireBuff = 0;
		this.waterMax = this.water;
		this.waterBuff = 0;
		this.airMax = this.air;
		this.airBuff = 0;
		this.earthMax = this.earth;
		this.earthBuff = 0;
		this.poisonMax = this.poison;
		this.poisonBuff = 0;
		this.lowerRes = 0;
		this.statPoints = 0;
		this.skillPoints = 0;
		this.skillFire = 0;
		this.skillWater = 0;
		this.skillAir = 0;
		this.skillEarth = 0;
		this.skillPoison = 0;
		this.skillAll = 0;
		this.cost = COST_REGULAR;
		if(this.invisible) this.invisible = DEFAULT;
		this.teleported = 0;
		this.aggravating = 0;
		this.stealth = 0;
		this.digest = 0;
		this.searching = 0;
		this.lighten = 0;
		if(!this.stealLife) this.stealLife = 0;
		if(!this.stealMana) this.stealMana = 0;
		this.healCount = 0;
		this.totalWeight = 0;
		this.side = {a:null,b:null};
		this.swapped = false;
		this.numBoxes = 0;
		// this.boxes = {};
		this.equipment = {};
		if(this.race&(HUMAN|GIANT)){
			for(let key in BP)
				this.equipment[BP[key]] = null;
		}
		this.initSynerzy();
	}
	
	initSynerzy(){
		this.synerzyMelee = 0;
		this.synerzyMissile = 0;
		this.synerzyFire = 0;
		this.synerzyWater = 0;
		this.synerzyAir = 0;
		this.synerzyEarth = 0;
		this.synerzyPoison = 0;
	}
	
	gainExp(exp,potion){
		this.exp += Math.floor(exp*(potion? 1:(1+this.expBonus/100)));
		if(this.exp>this.expMax) this.expMax = this.exp;
		let found;
		while((this.id===ROGUE&&this.lvl<MAX_FIGHTER_LVL||this.id!==ROGUE)
			&&this.exp>=calcLevel(this.lvl+1)){
			if(++this.lvl<=this.lvlMax) continue;
			this.lvlMax = this.lvl;
			found = true;
			audio.playSound('level');
			this.skillPoints++;
			if(this.id===ROGUE){
				message.draw(rogue.cl===ENG?
				`Welcome to level ${this.lvl}`
				:`レベル${this.lvl}へようこそ`);
				this.statPoints++;
			} else
				this.gainStats();
		}
		if(found){
			this.expGain = this.getExp();	
			this.expNext = this.calcNextLvl();
			this.calcHP();
			this.calcMP();
			this.hp = this.hpMax;
			this.mp = this.mpMax;
		}
	}
	
	getExp(){
		let exp = calcLevel(this.lvl+1)-calcLevel(this.lvl);
		if(this.mod===UNIQUE)
			exp /= this.boss? 1:2;
		else
			exp /= 50;
		if(this.group) exp /= 10;
		if(this.race&DRAGON)
			exp *= 3;
		else if(this.race&GIANT)
			exp *= 2;
		if(this.mod===RARE)
			exp *= 4;
		else if(this.mod===MAGIC)
			exp *= 2;
		if(this.expRate) exp *= this.expRate;
		return Math.ceil(exp);
	}
	
	calcNextLvl(){
		return this.lvl>=MAX_FIGHTER_LVL? 0:calcLevel(this.lvl+1);
	}
	
	calcHP(){
		this.hpMax = (this.lvl+this.con+1)*this.hpRate+this.hpSum;
		if(this.hpMax<1) this.hpMax = 1;
		if(this.hp>this.hpMax) this.hp = this.hpMax;
	}
	
	calcMP(){
		this.mpMax = (this.lvl+this.int+1)*this.mpRate+this.mpSum;
		if(this.mpMax<1) this.mpMax = 1;
		if(this.mp>this.mpMax) this.mp = this.mpMax;
	}
	
	calcDmg(){
		let	dmgAvg = dice.getAvg(this.dmgBase);
		let dmgBonus = 1+this.dmgBonus/100;
		let dmgBuff = 1+this.dmgBuff/100;
		this.dmgAvg = Math.floor((this.str/2+dmgAvg)*dmgBonus*dmgBuff);
		if(this.dmgAvg<1) this.dmgAvg = 1;
		
		let weapon = this.equipment['main'];
		let weight = weapon? 3-weapon.weight:0;
		if(weight<0) weight = /*weight+this.str/5<0? weight+this.str/5:*/0;
		this.rateValue = Math.floor(((this.dex+weight)*10
		*(1+this.rateBonus/100))*(1+this.rateBuff/100));
		if(this.rateValue<1) this.rateValue = 1;
		
		let ias = Math.floor(this.ias/(25+this.iasBase))+1;
		if(ias>5) ias = 5;
		let fcr = Math.floor(this.fcr/(25+this.fcrBase))+1;
		if(fcr>5) fcr = 5;
		let str = this.str>=40? 5:Math.floor(this.str/10)+1;
		let dex = this.dex>=40? 5:Math.floor(this.dex/10)+1;
		let int = this.int>=40? 5:Math.floor(this.int/10)+1;
		this.timesMelee = ias<str? ias:str;
		this.timesMissile = ias<dex? ias:dex;
		this.timesSpell = fcr<int? fcr:int;
	}
	
	calcMoveTimes(){
		this.timesMove = Math.floor(this.frw/(20+this.frwBase))
		if(this.timesMove>5) this.timesMove = 5;
	}
	
	calcDmgOne(){
		let	{num, sides} = dice.get(this.dmgBase,this.dmgDiceNum,this.dmgDiceSides);
		this.dmgBare = this.dmgBase = num+'d'+sides;
	}
	
	calcAc(){
		let percBonus = 1+this.acBonus/100;
		let percBuff = 1+this.acBuff/100;
		this.acSValue = this.acSBase*percBonus+this.dex/2; //bare
		this.acSBonusValue = this.acSBaseSum/2*this.acBonus/100; //weapon, ornament
		this.acSValueTotal = Math.floor((this.acSValue+this.acSBonusValue+this.acSValueSum)*percBuff);
		if(this.acSValueTotal<0) this.acSValueTotal=0;
		this.acTValue = this.acTBase*percBonus+this.dex/2;
		this.acTBonusValue = this.acTBaseSum/2*this.acBonus/100;
		this.acTValueTotal = Math.floor((this.acTValue+this.acTBonusValue+this.acTValueSum)*percBuff);
		if(this.acTValueTotal<0) this.acTValueTotal=0;
		this.acBValue = this.acBBase*percBonus+this.dex/2;
		this.acBBonusValue = this.acBBaseSum/2*this.acBonus/100;
		this.acBValueTotal = Math.floor((this.acBValue+this.acBBonusValue+this.acBValueSum)*percBuff);
		if(this.acBValueTotal<0) this.acBValueTotal=0;
	}
	
	calcAttack(e,skill,lvl){
		let rate = Math.floor((this.rateValue/(this.rateValue+this.getEnemyAc(e)))*100);
		if(rate>95)
			rate = 95;
		else if(rate<5)
			rate = 5;
		let dmg = 0;
		if(skill&&skill.element!=='physical'||evalPercentage(rate)){ 
			let boost = evalPercentage(this.equipment['main']? this.equipment['main'].weight:1);
			if(e.race) boost += this.getRaceBoost(e.race);
			if(e.material===M_STONE) boost += this.digging;
			dmg = (this.str/2+dice.roll(this.dmgBase,boost)*(1+this.dmgBonus/100))
				*(1+this.dmgBuff/100);
			if(skill) dmg *= 1+this.calcSkillValue(skill,lvl)/100;
			let add = dmg;
			dmg *= 1-e.physical/100;
			if(!skill||skill.element==='physical'){
				if(this.dmgFire) dmg += add*(this.dmgFire/100)*(1-e.fire/100);
				if(this.dmgLightning) dmg += add*(this.dmgLightning/100)*(1-e.lightning/100);
				if(this.dmgPoison) dmg += add*(this.dmgPoison/100)*(1-e.poison/100);
				if(this.dmgAcid) dmg += add*(this.dmgAcid/100)*(1-e.acid/100);
			}
			dmg = dmg<1? 1:Math.floor(dmg);
		}
		return [dmg, rate];
	}
	
	getEnemyAc(e){
		let ac = NaN;
		if(this.atkType&AT_S&&!(ac<=e.acSValueTotal)) ac = e.acSValueTotal;
		if(this.atkType&AT_T&&!(ac<=e.acTValueTotal)) ac = e.acTValueTotal;
		if(this.atkType&AT_B&&!(ac<=e.acBValueTotal)) ac = e.acBValueTotal;
		return ac;
	}
	
	getRaceBoost(race){
		let boost = 0;
		if(race&HUMAN&&boost<this.dmgHuman) boost = this.dmgHuman;
		if(race&ANIMAL&&boost<this.dmgAnimal) boost = this.dmgAnimal;
		if(race&DEMON&&boost<this.dmgDemon) boost = this.dmgDemon;
		if(race&UNDEAD&&boost<this.dmgUndead) boost = this.dmgUndead;
		if(race&DRAGON&&boost<this.dmgDragon) boost = this.dmgDragon;
		if(race&GIANT&&boost<this.dmgGiant) boost = this.dmgGiant;
		if(race&SPIRIT&&boost<this.dmgSpirit) boost = this.dmgSpirit;
		return boost;
	}
	
	attack(e,missile,skill,lvl){
		let count = 0;
		let name;
		if(missile){
			name = rogue.cl===ENG? 'An arrow':'矢';
			var ammo = ci;
		} else if(skill)
			name = skill.name[rogue.cl];
		else
			name = rogue.cl===ENG? this.getName(true):this.getName()+'の攻撃';
		let nameE = e.getName();
		let third = rogue.cl===ENG&&(missile||skill||this.id!==ROGUE);
		do{
			let [dmg, rate] = skill&&skill.type==='spell'?	[this.calcSkillValue(skill,lvl,e),100]:
															this.calcAttack(e,skill,lvl);
			let msg;
			let miss = !dmg||e.indestructible;
			if(miss){
				msg = rogue.cl===ENG? 'missed':'外れた';
			} else{
				msg = rogue.cl===ENG? 'hit':`${dmg}のダメージを与えた`;
				if(third) msg += 's';
				e.hp -= dmg;
			}
			if(missile){
				if(miss||evalPercentage(50))
					this.deleteAmmo(ammo,true,e.x,e.y);
				else
					this.deleteAmmo(ammo);
			}
			message.draw(rogue.cl===ENG?
			`${name} ${msg} ${nameE}${dmg&&!e.indestructible? ' by '+dmg:''} (hit rating ${rate})`//
			:`${name}は${nameE}に${msg} (命中率 ${rate})`);
			count++;
			if(flag.dash||flag.rest)
				flag.dash = flag.rest = false;
			if(!skill||skill.element==='physical'){
				if(!dmg) continue;
				if(this.stealLife){
					let percent = this.stealLife>100? 1:this.stealLife/100;
					this.hp += Math.ceil(dmg*percent);
					if(this.hp>this.hpMax) this.hp = this.hpMax;
				}
				if(this.stealMana){
					let percent = this.stealMana>100? 1:this.stealMana/100;
					let mp = Math.ceil(dmg*percent);
					if(mp>e.mp) mp = e.mp;
					e.mp -= mp;
					this.mp += mp;
					if(this.mp>this.mpMax) this.mp = this.mpMax;
				}
				if(this.dmgFire) this.getElementEffect('fire',1,e);
				if(this.dmgLightning) this.getElementEffect('lightning',1,e);
				if(this.dmgPoison) this.getElementEffect('poison',1,e);
				if(this.dmgAcid) this.getElementEffect('acid',1,e);
				if(this.cursed&&evalPercentage(50-(e.lvl-this.lvl))) e.gotCursed();
				if(!missile){
					if(this.atkCon&&evalPercentage(this.atkCon))
						this.haveCast(CONFUSION,1,e);
					if(this.atkPara&&evalPercentage(this.atkPara))
						this.haveCast(PARALYSIS,1,e);
					if(this.atkSlow&&evalPercentage(this.atkSlow))
						this.haveCast(SLOW,10,e);
					if(this.atkInf&&evalPercentage(this.atkInf))
						this.haveCast(INFECTION,1,e);
					if(this.atkBlind&&evalPercentage(this.atkBlind))
						this.haveCast(BLINDNESS,1,e);
					if(this.atkRadi&&evalPercentage(this.atkRadi))
						this.haveCast(RADIATION,1,e);
					if(this.atkCold&&evalPercentage(this.atkCold))
						this.haveCast(COLD,1,e);
					if(this.atkDrain&&evalPercentage(this.atkDrain))
						e.decayOrRestore(EXP,false,this.expGain,this);
					if(!skill&&!this.confused){
						if(this.atkStealGold&&evalPercentage(this.atkStealGold))
							if(this.stealGold(e)) count = NaN;
						if(count&&this.atkStealItem&&evalPercentage(this.atkStealItem))
							if(this.stealItem(e)) count = NaN;
					}
				}
			}
			if(!skill||skill.type!=='spell'){
				if(this.decreaseDurab(true)) count = NaN;
			}
			e.decreaseDurab();
			if(e.hp<=0){
				e.died(this);
				if(e.id===ROGUE) return;
				if(missile||skill){
					if(rogue.ce&&rogue.ce.id===e.id){
						rogue.ce = null;
						statistics.clearEnemyBar();
					}
				} else{
					rogue.ce = null;
					statistics.clearEnemyBar();
				}
				return;
			}
			if(e.sleeping) e.wakeUp();
			if(this.id===ROGUE&&e.id!==ROGUE){
				if((!missile&&!skill||!rogue.ce)&&e.isShowing()) rogue.ce = e;
			}
			if(skill){
				this.getElementEffect(skill.element,lvl,e)
				return;
			}
		} while(missile&&this.timesMissile>count&&ammo.quantity>count
		||!missile&&this.timesMelee>count);
	}
	
	dig(loc){
		let digging;
		if(this.atkType&AT_T)
			digging = 3;
		else if(this.atkType&AT_S) 
			digging = 2;
		else if(this.atkType&AT_B) 
			digging = 1;
		if(this.digging) digging *= 10*this.digging;
		if(!loc.indestructible) loc.wall -= digging;
		this.decreaseDurab(true);
		audio.playSound('dig');
		if(loc.wall<=0) loc.deleteWall(true);
	}
	
	getElementEffect(element,lvl,e){
		if(evalPercentage(e[element])) return;
		let id;
		switch(element){
			case 'fire':
			case 'lightning':
			case 'acid':
				e.decreaseDurab(false,element);
				return;
			case 'poison':
				id = POISON;
				break;
			case 'sand':
			case 'light':
				id = BLINDNESS;
				break;
			case 'cold':
			case 'blizzard':
				id = COLD;
				break;
			case 'infection':
				id = INFECTION;
				break;
			case 'gravity':
				id = SLOW;
				break;
			case 'radiation':
				id = RADIATION;
				break;
		}
		if(id) this.haveCast(id,lvl,e);
	}
	
	calcSkillValue(skill,lvl,enemy,avg){
		let value;
		let lvlSy = flag.skill&&skill.synerzy? this.getSynerzy(skill):0;
		let resist = enemy? enemy[skill.element]:0;
		let rate = skill.rate*lvl+skill.synerzy*lvlSy;
		if(skill.kind==='breath')
			value = this.hp*BREATH_RATE*(1+rate/100);
		else if(isFinite(skill.base))
			value = skill.base+rate;
		else{
			let base = avg? dice.getAvg(skill.base):dice.roll(skill.base);
			value = base*(1+rate/100);
		}
		return Math.ceil(value*(1-resist/100));
	}
	
	calcSkillDur(skill,lvl,avg){
		let base = avg? dice.getAvg(skill.durBase):dice.roll(skill.durBase);
		return base+skill.durRate*lvl;
	}
	
	calcResist(){
		this.fireSum = this.fireMax+this.fireBuff+this.lowerRes;
		this.waterSum = this.waterMax+this.waterBuff+this.lowerRes;
		this.airSum = this.airMax+this.airBuff+this.lowerRes;
		this.earthSum = this.earthMax+this.earthBuff+this.lowerRes;
		this.poisonSum = this.poisonMax+this.poisonBuff+this.lowerRes;
		let fire = this.fireSum>=100? 100:this.fireSum;
		let water = this.waterSum>=100? 100:this.waterSum;
		let air = this.airSum>=100? 100:this.airSum;
		let earth = this.earthSum>=100? 100:this.earthSum;
		let poison = this.poisonSum>=100? 100:this.poisonSum;
		let limit = 75;
		this.fire = fire>=limit? limit:fire;
		this.water = water>=limit? limit:water;
		this.air = air>=limit? limit:air;
		this.earth = earth>=limit? limit:earth;
		this.poison = poison>=limit? limit:poison;
		this.light = Math.floor(fire/2);
		this.cold = Math.floor(water/2);
		this.lightning = Math.floor(air/2);
		this.gravity = Math.floor(earth/2);
		this.physical = Math.floor(earth/4);
		this.infection = Math.floor(poison/2);
		this.sand = Math.floor(earth/4+air/4);
		this.blizzard = Math.floor(water/4+air/4);
		this.acid = Math.floor(water/4+poison/4);
		this.magma = Math.floor(fire/4+earth/4);
		this.radiation = Math.floor(fire/4+poison/4);
	}
	
	getSkillBoost(skill){
		let boost = 0;
		switch(skill.element){
			case 'fire':
			case 'light':
				boost = this.skillFire;
				break;
			case 'water':
			case 'cold':
				boost = this.skillWater;
				break;
			case 'air':
			case 'lightning':
				boost = this.skillAir;
				break;
			case 'earth':
			case 'gravity':
				boost = this.skillEarth;
				break;
			case 'poison':
			case 'infection':
				boost = this.skillPoison;
				break;
			case 'sand':
				boost = (this.skillEarth+this.skillAir)/2;
				break;
			case 'blizzard':
				boost = (this.skillWater+this.skillAir)/2;
				break;
			case 'acid':
				boost = (this.skillWater+this.skillPoison)/2;
				break;
			case 'magma':
				boost = (this.skillFire+this.skillEarth)/2;
				break;
			case 'radiation':
				boost = (this.skillFire+this.skillPoison)/2;
				break;
		}
		boost += this.skillAll;
		return Math.floor(boost); 
	}
	
	getSynerzy(skill){
		let synerzy = 0;
		if(skill.type==='melee')
			synerzy = this.synerzyMelee;
		else if(skill.type==='missile')
			synerzy = this.synerzyMissile;
		else{
			switch(skill.element){
				case 'fire':
				case 'light':
					synerzy = this.synerzyFire;
					break;
				case 'water':
				case 'cold':
					synerzy = this.synerzyWater;
					break;
				case 'air':
				case 'lightning':
					synerzy = this.synerzyAir;
					break;
				case 'earth':
				case 'gravity':
					synerzy = this.synerzyEarth;
					break;
				case 'poison':
				case 'infection':
					synerzy = this.synerzyPoison;
					break;
				case 'sand':
					synerzy = this.synerzyAir+this.synerzyEarth;
					break;
				case 'blizzard':
					synerzy = this.synerzyWater+this.synerzyAir;
					break;
				case 'acid':
					synerzy = this.synerzyWater+this.synerzyPoison;
					break;
				case 'magma':
					synerzy = this.synerzyFire+this.synerzyEarth;
					break;
				case 'radiation':
					synerzy = this.synerzyFire+this.synerzyPoison;
					break;
			}
		}
		return Math.floor(synerzy);
	}
	
	calcWeightLimit(){
		this.weightLimit = 25+this.str*2;
		this.calcSpeed();
	}
	
	calcSpeed(){
		this.totalWeight = Math.round(this.totalWeight*100)/100;
		this.spd = this.spdMax +this.spdBuff-this.spdNerf
			- (this.totalWeight>this.weightLimit?
			Math.ceil(this.totalWeight-this.weightLimit):0);
	}
	
	getConditionColor(){
		return	this.sleeping? ROYALBLUE
			:this.paralyzed? ORANGE
			:this.confused?	YELLOW
			:this.blinded? GRAY
			:this.hallucinated? PURPLE
			:this.canceled? WHITE
			:this.infected? C_INFECTION
			:this.poisoned?	C_POISON
			:RED;
	}
	
	calcCondition(calc,draw){
		var j = -4;
		let name;
		name = this.getName(true);
		if(draw){
			statistics.clearCondition();
			var len = fs;
			if(this.hunger>=800){
				let condition = rogue.cl===ENG? 'full':textLen.list['full'];
				statistics.draw(condition,len,j,LIME,ud,true);
				len += textLen['full'][rogue.cl];
			} else if(this.hunger>0&&this.hunger<=200){
				let condition = rogue.cl===ENG? 'hungry':textLen.list['hungry'];
				statistics.draw(condition,len,j,YELLOW,ud,true);
				len += textLen['hungry'][rogue.cl];
			} else if(this.hunger===0){
				let condition = rogue.cl===ENG? 'starved':textLen.list['starved'];
				statistics.draw(condition,len,j,RED,ud,true);
				len += textLen['starved'][rogue.cl];
			}
		}
		if(this.poisoned){
			if(calc){
				if(!this.indestructible&&--this.hp<=0){
					this.died(rogue); //
					return null;
				} else if(--this.poisoned===0){
					message.draw(rogue.cl===ENG?
					`${name} recovered from poison`
					:`${name}毒状態から復帰した`);
				}
				if(flag.dash||flag.rest)
					flag.dash = flag.rest = false;
			}
			if(draw){
				let condition = rogue.cl===ENG? 'poisoned':textLen.list['poisoned'];
				statistics.draw(condition,len,j,C_POISON,ud,true);
				len += textLen['poisoned'][rogue.cl];
			}
		}
		if(this.confused){
			if(calc&&--this.confused===0){
				message.draw(rogue.cl===ENG?
				`${name} recovered from confusion`
				:`${name}混乱状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'confused':textLen.list['confused'];
				statistics.draw(condition,len,j,YELLOW,ud,true);
				len += textLen['confused'][rogue.cl];
			}
		}
		if(this.paralyzed){
			if(calc&&--this.paralyzed===0){
				message.draw(rogue.cl===ENG?
				`${name} recovered from paralysis`
				:`${name}麻痺状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'paralyzed':textLen.list['paralyzed'];
				statistics.draw(condition,len,j,ORANGE,ud,true);
				len += textLen['paralyzed'][rogue.cl];
			}
		}
		if(this.sleeping>0){
			if(calc&&--this.sleeping===0)
				this.wakeUp();
			if(draw){
				let condition = rogue.cl===ENG? 'sleeping':textLen.list['sleeping'];
				statistics.draw(condition,len,j,ROYALBLUE,ud,true);
				len += textLen['sleeping'][rogue.cl];
			}
		}
		if(this.blinded){
			if(calc&&--this.blinded===0){
				if(this.id===ROGUE) map.redraw(rogue.x,rogue.y);
				message.draw(rogue.cl===ENG?
				`${name} recovered from blindness`
				:`${name}盲目状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'blinded':textLen.list['blinded'];
				statistics.draw(condition,len,j,GRAY,ud,true);
				len += textLen['blinded'][rogue.cl];
			}
		}
		if(this.infected>0){
			if(calc&&coinToss()) this.decayOrRestore();
			if(calc&&--this.infected===0){
				message.draw(rogue.cl===ENG?
				`${name} recovered from infection`
				:`${name}感染状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'infected':textLen.list['infected'];
				statistics.draw(condition,len,j,C_INFECTION,ud,true);
				len += textLen['infected'][rogue.cl];
			}
		}
		if(this.hallucinated){
			if(calc&&--this.hallucinated===0){
				if(this.id===ROGUE) hallucinate.all(true);
				message.draw(rogue.cl===ENG?
				`${name} recovered from hallucination`
				:`${name}幻覚状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'hallucinated':textLen.list['hallucinated'];
				statistics.draw(condition,len,j,PURPLE,ud,true);
				len += textLen['hallucinated'][rogue.cl];
			}
		}
		if(this.canceled){
			if(calc&&--this.canceled===0){
				message.draw(rogue.cl===ENG?
				`${name} recovered from cancellation`
				:`${name}封印状態から復帰した`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'canceled':textLen.list['canceled'];
				statistics.draw(condition,len,j,WHITE,ud,true);
				len += textLen['canceled'][rogue.cl];
			}
		}
		if(this.seeInvisible>0){
			if(calc&&--this.seeInvisible===0){
				message.draw(rogue.cl===ENG?
				`${name} can no longer see invisible things`
				:`${name}もう透明な物体を見ることが出来なくなった`);
				seeInvisible(false);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'see invisible':textLen.list['see invisible'];
				statistics.draw(condition,len,j,C_LIGHT,C_LIGHT,true);
				len += textLen['see invisible'][rogue.cl];
			}
		}
		if(this.invisibility){
			if(calc&&--this.invisibility===0){
				this.invisible = false;
				coords[this.x][this.y].draw();
				//message.draw();
			}
			if(draw){
				let condition = rogue.cl===ENG? 'invisible':textLen.list['invisible'];
				statistics.draw(condition,len,j,C_LIGHT,C_LIGHT,true);
				len += textLen['invisible'][rogue.cl];
			}
		}
		if(this.ecco){
			if(calc&&--this.ecco===0){
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Ecco`
				:`${name}エコーの効果を失った`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'ecco':textLen.list['ecco'];
				statistics.draw(condition,len,j,C_AIR,ud,true);
				len += textLen['ecco'][rogue.cl];
			}
		}
		if(this.enchantSelfDur){
			if(--this.enchantSelfDur===0){
				this.dmgBonus -= this.enchantSelf;
				this.rateBonus -= this.enchantSelf;
				this.acBonus -= this.enchantSelf;
				this.enchantSelf = 0;
				this.calcDmg();
				this.calcAc();
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Enchant Self`
				:`${name}自己強化の効果を失った`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'enchant self':textLen.list['enchant self'];
				statistics.draw(condition,len,j,C_EARTH,ud,true);
				len += textLen['enchant self'][rogue.cl];
			}
		}
		if(this.venomDur){
			if(--this.venomDur===0){
				this.dmgPoison -= this.venom;
				this.venom = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Venom Hands`
				:`${name}猛毒の手の効果を失った`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'venom hands':textLen.list['venom hands'];
				statistics.draw(condition,len,j,C_POISON,ud,true);
				len += textLen['venom hands'][rogue.cl];
			}
		}
		if(this.confusing){
			if(--this.confusing===0){
				this.atkCon = 0;
				let name = this.getName(true);
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Touch of Confusion`
				:`${name}混乱の手の効果を失った`);
			}
			if(draw){
				let condition = rogue.cl===ENG? 'confusing hands':textLen.list['confusing hands'];
				statistics.draw(condition,len,j,C_POISON,ud,true);
				len += textLen['confusing hands'][rogue.cl];
			}
		}
		if(!calc) return;
		if(this.speeded){
			if(--this.speeded===0){
				this.spdBuff = 0;
				this.calcSpeed();
			}
		}
		if(this.slowed){
			if(--this.slowed===0){
				this.spdNerf = 0;
				this.calcSpeed();
			}
		}
		if(this.hpRegBuffDur){
			if(--this.hpRegBuffDur===0){
				this.hpReg -= this.hpRegBuff;
				this.hpRegBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Life Regeneration`
				:`${name}再生の効果を失った`);
			}
		}
		if(this.mpRegBuffDur){
			if(--this.mpRegBuffDur===0){
				this.mpReg -= this.mpRegBuff;
				this.mpRegBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Mana Regeneration`
				:`${name}魔力再生の効果を失った`);
			}
		}
		if(this.mfBuffDur){
			if(--this.mfBuffDur===0){
				this.mf -= this.mfBuff;
				this.mfBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Magic Finding`
				:`${name}魔法具探求の効果を失った`);
			}
		}
		if(this.gfBuffDur){
			if(--this.gfBuffDur===0){
				this.gf -= this.gfBuff;
				this.gfBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Gold Finding`
				:`${name}財宝探求の効果を失った`);
			}
		}
		if(this.expBuffDur){
			if(--this.expBuffDur===0){
				this.expBonus -= this.expBuff;
				this.expBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Experience`
				:`${name}経験の効果を失った`);
			}
		}
		if(this.skillBuffDur){
			if(--this.skillBuffDur===0){
				this.skillAll -= this.skillBuff;
				this.skillBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Skill`
				:`${name}スキルの効果を失った`);
			}
		}
		let resist;
		if(this.fireBuffDur){
			if(--this.fireBuffDur===0){
				this.fireBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Resist Fire`
				:`${name}耐火の効果を失った`);
				resist = true;
			}
		}
		if(this.waterBuffDur){
			if(--this.waterBuffDur===0){
				this.waterBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Resist Water`
				:`${name}耐水の効果を失った`);
				resist = true;
			}
		}
		if(this.airBuffDur){
			if(--this.airBuffDur===0){
				this.airBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Resist Air`
				:`${name}耐風の効果を失った`);
				resist = true;
			}
		}
		if(this.earthBuffDur){
			if(--this.earthBuffDur===0){
				this.earthBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Resist Earth`
				:`${name}耐土の効果を失った`);
				resist = true;
			}
		}
		if(this.poisonBuffDur){
			if(--this.poisonBuffDur===0){
				this.poisonBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Resist Poison`
				:`${name}耐毒の効果を失った`);
				resist = true;
			}
		}
		if(this.lowerResDur){
			if(--this.lowerResDur===0){
				this.lowerRes = 0;
				message.draw(rogue.cl===ENG?
				`${name} recovered from the effect of Lower Resist`
				:`${name}耐性低下の効果から復帰した`);
				resist = true;
			}
		}
		if(resist) this.calcResist();
		if(this.dmgBuffDur){
			if(--this.dmgBuffDur===0){
				this.dmgBuff = this.rateBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Combat`
				:`${name}戦闘の効果を失った`);
			}
			this.calcDmg();
		}
		if(this.acBuffDur){
			if(--this.acBuffDur===0){
				this.acBuff = 0;
				message.draw(rogue.cl===ENG?
				`${name} lost the effect of Armor`
				:`${name}防護の効果を失った`);
			}
			this.calcAc();
		}
		if(this.stuckTrap){
			if(--this.stuckTrap===0){
				message.draw(rogue.cl===ENG?
				`${name} can move again`
				:`${name}動けるようになった`);
			}
		}
		if(this.teleported&&evalPercentage(this.teleported))
			this.haveCast(TELEPORTATION,10,this);
	}
	
	decayOrRestore(stat,restore,exp,enemy){
		if(!restore) var name = this.getName(true);
		switch(stat>=0? stat:rndInt(3)){
			case STR:
				if(restore)
					this.str = this.strMax;
				else if(this.strSus||!(this.str-this.strBonus)) 
					return;
				else{
					this.str--;
					message.draw(rogue.cl===ENG?
					`${name} got weak`
					:`${name}薄弱になった`);
				}
				this.calcWeightLimit();
				this.calcDmg();
				break;
			case DEX:
				if(restore)
					this.dex = this.dexMax;
				else if(this.dexSus||!(this.dex-this.dexBonus)) 
					return;
				else{
					this.dex--;
					message.draw(rogue.cl===ENG?
					`${name} got clumsy`
					:`${name}不器用になった`);
				}
				this.calcAc();
				this.calcDmg();
				break;
			case CON:
				if(restore) 
					this.con = this.conMax;
				else if(this.conSus||!(this.con-this.conBonus))
					return;
				else{
					this.con--;
					message.draw(rogue.cl===ENG?
					`${name} got sick`
					:`${name}病弱になった`);
				}
				this.calcHP();
				break;
			case INT:
				if(restore)
					this.int = this.intMax;
				else if(this.intSus||!(this.int-this.intBonus))
					return;
				else{
					this.int--;
					message.draw(rogue.cl===ENG?
					`${name} got stupid`
					:`${name}愚鈍になった`);
				}
				this.calcMP();
				break;
			case EXP:
				if(restore){
					this.exp = this.expMax;
					this.lvl = this.lvlMax;
				} else if(!this.exp||evalPercentage(this.con*2))
					return;
				else{
					if(exp>this.exp) exp = this.exp;
					this.exp -= exp;
					if(enemy){
						enemy.exp += exp;
						if(enemy.exp>enemy.expMax) enemy.exp = enemy.expMax;
					}
					while(this.exp<calcLevel(this.lvl)) this.lvl--;
					message.draw(rogue.cl===ENG?
					`${name} got poor`
					:`${name}貧弱になった`);
				}
				this.calcHP();
				this.calcMP();
				if(!restore){
					if(this.hp>this.hpMax) this.hp = this.hpMax;
					if(this.mp>this.mpMax) this.mp = this.mpMax;
				}
		}
	}
	
	heal(){
		if(this.healCount++!==5) return;
		if(!this.poisoned&&this.hp<this.hpMax){
			this.hp += Math.ceil(this.hpMax*(this.con+this.hpReg)/1000);
			if(this.hp>this.hpMax) this.hp = this.hpMax;
		}
		if(this.mp<this.mpMax){
			this.mp += Math.ceil(this.mpMax*(this.int+this.mpReg)/1000);
			if(this.mp>this.mpMax) this.mp = this.mpMax;
		}
		this.healCount = 0;
	}

	
	drawOrErase(draw,move){
		let loc = coords[this.x][this.y];
		if(draw){
			loc.fighter = this;
			loc.detected = this.detected;
		} else{
			loc.fighter = null;
			loc.detected = false;
		}
		if(!draw&&this.mod!==NORMAL&&option.shadow.user){
			coords[this.x][this.y+1].draw();
			coords[this.x+1][this.y].draw();
		}
		loc.draw();
		if(this.id===ROGUE&&draw){
			this.distMap = pathfinding.main(this.x,this.y,ud,ud,ud,true);
			this.lightenOrDarken('Lighten',move);
		}
	}
	
	lightenOrDarken(type,search){
		shadowcasting.main(this.x,this.y,FOV,type,ud,ud,this.lighten,search);
	}
	
	replace(f){
		this.drawOrErase(false);
		f.drawOrErase(false);
		[this.x, this.y, f.x, f.y] = [f.x, f.y, this.x, this.y];
		this.drawOrErase(true);
		f.drawOrErase(true);
		if(this.id===ROGUE)
			coords[this.x][this.y].traces = ++this.numSteps;
		else if(f.id===ROGUE)
			coords[f.x][f.y].traces = ++f.numSteps;
	}
	
	showInventory(place,a){
		switch(place){
			case P_PACK:
				inventory.show(this.pack,RIGHT,a,place);
				break;
			case P_EQUIPMENT:
				this.equipmentList(BP[a]);
				break;
			case P_FLOOR:
				inventory.show(coords[this.x][this.y].item,RIGHT,a,place);
				break;
			case P_BOX:
				inventory.show(this.boxes,LEFT,a,place);
				break;
			case P_SHOP:
			case P_STASH:
				inventory.show(coords[this.x][this.y].enter.list,LEFT,a,place);
				break;
			case P_CUBE:
				inventory.show(this.cube,LEFT,a,place);
				break;
		}
	}
		
	equipmentList(bp){
		inventory.shadow(LEFT);
		let i = 1.5;
		let j = MS+1;
		let k = 0;
		let weight = 0;
		let count = 0;
		if(flag.blacksmith) var priceAll = 0;
		for(let key in this.equipment){
			let item = this.equipment[key];
			if(flag.destroy&&flag.number&&key!==bp
			||(flag.repair||flag.blacksmith)&&(!item||item.durab===item.durabMax)){
				k++;
				continue;
			}
			ctsInv.save();
			ctsInv.textAlign = 'center';
			ctsInv.fillText(EA[k++].toUpperCase(),(i-0.5)*fs,j*fs);
			ctsInv.fillText(')',(i-0.5)*fs+fs/3,j*fs);
			ctsInv.textAlign = 'left';
			let parts = rogue.cl===ENG? key:BPJ[key];
			if(key==='main'||key==='off')
				parts += this.swapped? 2:1;
			ctsInv.fillText(parts,(i+0.5)*fs,j*fs);
			if(!item){
				if(key==='off'&&this.equipment['main']&&this.equipment['main'].twoHanded){
					ctsInv.fillText(rogue.cl===ENG?
					`(two-handed)`
					:`(両手持ち)`,(i+4.5)*fs,j*fs,14*fs);
				}
				j++;
				ctsInv.restore();	
				continue;
			}
			ctsInv.textAlign = 'center';
			if(item.shadow)
				ctsInv.shadowColor = item.shadow;
			if(item.stroke){
				ctsInv.strokeStyle = item.stroke;
				ctsInv.strokeText(item.symbol,(i+4)*fs,j*fs);
			}
			ctsInv.fillStyle = item.color;
			ctsInv.fillText(item.symbol,(i+4)*fs,j*fs);
			if(item.cursed)
				ctsInv.fillStyle = RED;
			else if(!item.durab)
				ctsInv.fillStyle = GRAY;
			else
				ctsInv.fillStyle = WHITE;
			ctsInv.textAlign = 'left';
			let name = item.getName();
			let limit = flag.blacksmith? 12:15;
			if(item.stroke) ctsInv.strokeText(name,(i+4.5)*fs,j*fs,limit*fs);
			ctsInv.fillText(name,(i+4.5)*fs,j*fs,limit*fs);
			ctsInv.fillStyle = WHITE;
			ctsInv.shadowColor = SHADOW;
			ctsInv.textAlign = 'right';
			if(flag.blacksmith){
				let price = item.getDurabPrice();
				ctsInv.fillText(`$${price}`,(i+20.3)*fs,j*fs,3.5*fs);
				priceAll += price;
			}
			ctsInv.fillText((item.weight*item.quantity).toFixed(1),(i+22)*fs,j*fs);
			weight += item.weight*item.quantity;
			count++;
			j++;
			ctsInv.restore();
		}
		if(!flag.destroy&&!flag.number&&!flag.repair&&!flag.blacksmith){
			let col = i;
			let row = j;
			let count2 = 0;
			let valueLimit = 4.5*fs;
			for(let [key,term] of investigationMap.entries()){
				if(!term||!term.equipList){
					if(key==='end') break;
					continue;
				} 
				ctsInv.save();
				if(this.findBuffStat(key)) ctsInv.shadowColor = C_BUFF;
				if(this.lowerRes&&(key==='fire'||key==='water'||key==='air'||key==='earth'||key==='poison'))
					ctsInv.fillStyle = RED;
				ctsInv.fillText(term.name[rogue.cl],(col-1)*fs,j*fs);
				ctsInv.textAlign = 'right';
				let value = this[key];
				if(term.perc) value += '%';
				if(term.max){
					let max = this[term.max];
					if(term.perc) max += '%';
					value += ` (${max})`;
				}
				ctsInv.fillText(value,(col+IN_WIDTH/4-2)*fs,(j++)*fs,valueLimit);
				ctsInv.restore();
				if(!(++count2%8)){
					col += IN_WIDTH/4;
					j = row;
				}
			}
		}
		let maxNum = MAX_EQUIPMENT_NUM;
		ctsInv.fillText(`[${count}/${maxNum}]`,(i)*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.textAlign = 'right';
		let total = rogue.cl===ENG? 'Total':'計';
		if(flag.blacksmith){
			let cost = rogue.cl===ENG? 'Total Cost':'全費用';
			total = `${cost} $${priceAll} ${total}`;
		}
		ctsInv.fillText(`${total} ${weight.toFixed(1)}kg`,(i+22)*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.textAlign = 'left';
	}
	
	showSkill(list,bookmark){
		inventory.shadow(bookmark? LEFT:RIGHT);
		let i = 1.5+(bookmark? 0:IN_WIDTH/2);
		let j = MS+2;
		let count = 0;
		let main = rogue.cl===ENG? 'Main':'メイン';
		for(let key in list){
			if(flag.number&&list[key]!==cs) continue;
			let skill;
			if(list[key]) skill = skillMap.get(list[key].id? list[key].id:list[key]);
			ctsInv.save();
			if(bookmark){
				if(skill) ctsInv.shadowColor = skill.color;
				ctsInv.fillText(key==='0'? main:`F${key}`,(i-1)*fs,j*fs);
				ctsInv.textAlign = 'center';
				ctsInv.fillText(':',(i+1.25)*fs+fs/3,j*fs);
				if(!skill){
					j++;
					ctsInv.restore();
					continue;
				}
			} else{
				if(skill.reqLvl>this.lvl)
					ctsInv.fillStyle = GRAY;
				else
					ctsInv.shadowColor = skill.color;
				ctsInv.textAlign = 'center';
				ctsInv.fillText(key,i*fs,j*fs);
				ctsInv.fillText(')',i*fs+fs/3,j*fs);
			}
			ctsInv.textAlign = 'left';
			let name = skill.name[rogue.cl];
			ctsInv.fillText(name,(i+1+(bookmark? 1:0))*fs,j*fs);
			ctsInv.textAlign = 'right';
			let lvl = 0;
			if(list[key].lvl)
				lvl = list[key].lvl
			else{
				let a = this.searchSkill(list[key]);
				if(a) lvl = this.skill[a].lvl;
			}
			let boost = this.getSkillBoost(skill);
			ctsInv.fillText(`${lvl}+${boost}`,(i+12)*fs,j*fs);
			if(skill.rate){
				let value;
				let bonus = skill.rate*(lvl+boost)+(skill.synerzy? skill.synerzy*this.getSynerzy(skill):0);
				if(skill.kind==='breath'){
					value = Math.ceil(this.hp*BREATH_RATE*(1+bonus/100));
				} else if(isFinite(skill.base)){
					value = skill.base+bonus;
					if(skill.limit&&value>skill.limit) value = skill.limit;
					if(skill.radiusRate){
						let radius = rogue.cl===ENG? 'radius ':'半径';
						value = `${radius}${value}`;
					} else if(value>0) value = `+${value}`;
					if(skill.perc) value = `${value}%`;
				} else{
					let avg = Math.floor(dice.getAvg(skill.base)*(1+bonus/100)*10)/10;
					value = `Avg ${avg}`;
				}
				ctsInv.fillText(value,(i+17)*fs,j*fs);	
			}
			if(skill.reqLvl<=this.lvl&&skill.mp>this.mp){
				ctsInv.shadowColor = SHADOW;
				ctsInv.fillStyle = RED;
			}
			ctsInv.fillText(skill.mp,(i+18.5)*fs,j*fs);
			if(skill.reqLvl<=this.lvl){
				ctsInv.shadowColor = skill.color;
				ctsInv.fillStyle = WHITE;
			}
			ctsInv.fillText(skill.reqLvl,(i+20.5)*fs,j*fs);
			if(skill.reqSynerzy)
				ctsInv.fillText(skill.reqSynerzy,(i+22.5)*fs,j*fs);
			ctsInv.restore();
			count++;
			j++;
		}
		ctsInv.save();
		j = MS+1;
		let maxNum;
		if(flag.gain)
			maxNum = Object.keys(list).length;
		else if (bookmark)
			maxNum = MAX_BOOKMARK_NUM;
		else
			maxNum = MAX_SKILL_NUM;
		ctsInv.fillText(`[${count}/${maxNum}]`,i*fs,j*fs);
		ctsInv.textAlign = 'right';
		// if(!bookmark){
			// let skillPoints = rogue.cl===ENG? 'Skill Points':'スキルポイント';
			// ctsInv.fillText(`${skillPoints} ${this.skillPoints}`,(i+10)*fs,j*fs);
		// }
		let [lvl, value, mp, reqLv,reqSy] = rogue.cl===ENG?
			['Lv', 'Value', 'MP', 'RLv', 'RSy']
			:['レベル', '値', 'MP', '必レ', '必シ'];
		ctsInv.fillText(lvl,(i+12)*fs,j*fs);
		ctsInv.fillText(value,(i+16)*fs,j*fs);
		ctsInv.fillText(mp,(i+18.5)*fs,j*fs);
		ctsInv.fillText(reqLv,(i+20.5)*fs,j*fs);
		ctsInv.fillText(reqSy,(i+22.5)*fs,j*fs);
		ctsInv.restore();
	}
	
	findBuffStat(key){
		let found;
		switch(key){
			case 'dmgAvg':
				if(this.dmgBuff) found = true;
				break;
			case 'rateValue':
				if(this.rateBuff) found = true;
				break;
			case 'acSValueTotal':
			case 'acTValueTotal':
			case 'acBValueTotal':
				if(this.acBuff) found = true;
				break;
			case 'fire':
				if(this.fireBuff) found = true;
				break;
			case 'water':
				if(this.waterBuff) found = true;
				break;
			case 'air':
				if(this.airBuff) found = true;
				break;
			case 'earth':
				if(this.earthBuff) found = true;
				break;
			case 'poison':
				if(this.poisonBuff) found = true;
				break;
			case 'spd':
				if(this.spdBuff) found = true;
				break;
			case 'hpReg':
				if(this.hpRegBuff) found = true;
				break;
			case 'mpReg':
				if(this.mpRegBuff) found = true;
				break;
			case 'mf':
				if(this.mfBuff) found = true;
				break;
			case 'gf':
				if(this.gfBuff) found = true;
				break;
			case 'skillAll':
				if(this.skillBuff) found = true;
				break;
			case 'dmgPoison':
				if(this.venom) found = true;
				break;
			case 'atkCon':
				if(this.confusing) found = true;
				break;
			case 'expBonus':
				if(this.expBuff) found = true;
				break;
			case 'dmgPoison':
				if(this.venom) found = true;
			case 'dmgBonus':
			case 'rateBonus':
			case 'acBonus':
				if(this.enchantSelf) found = true;
				break;
		}
		return found;
	}
	
	deletePackItem(a,number){
		let item = this.pack[a];
		this.gainOrloseWeight(item,number);
		item.quantity -= number;
		if(!item.quantity) deleteAndSortItem(this.pack,a);
	}
	
	inventoryOut(item,quantity){
		let list;
		switch(item.place){
			case P_PACK:
				list = this.pack;
				break;
			case P_BOX:
				list = this.boxes;
				break;
			case P_EQUIPMENT:
				list = this.equipment;
				break;
			case P_FLOOR:
				list = coords[item.x][item.y].item;
				break;
		}
		item = item.split(quantity,list);
		if(item.place===P_FLOOR){
			item.id = -1;
			item.x = item.y = 0;
			if(rogue.hallucinated) hallucinate.undoOne(item);
		} else
			this.gainOrloseWeight(item,quantity);
		if(item.place===P_EQUIPMENT&&item.durab){
			this.getOrLooseStats(item);
			this.calcAll();
		}
		return item;
	}
	
	gainOrloseWeight(item,quantity=item.quantity,gain){
		this.totalWeight += item.weight*quantity*(gain? 1:-1);
		this.calcSpeed();
	}
	
	deleteBoxItem(i,quantity){
		let item = this.boxes[i];
		item.quantity -= quantity;
		this.gainOrloseWeight(item,quantity);
		if(!item.quantity) this.boxes[i] = null;
	}
	
	deleteEquipment(parts,quantity){
		let item = this.equipment[parts];
		item.quantity -= quantity;
		this.gainOrloseWeight(item,quantity);
		if(item.quantity) return;
		this.equipment[parts] = null;
		if(item.durab){
			this.getOrLooseStats(item,false);
			this.calcAll();
		}
	}
	
	stashAdd(stash,item){
		item.place = P_STASH;
		let key = this.canCarryItem(stash,item);
		if(key>=0){
			stash[key].quantity += item.quantity;
			return key;
		}
		let l = stash.length;
		stash[l] = item;
		return inventory.sort(l,stash,true); //stash page
	}
	
	packAdd(item){
		if(!flag.pack&&this.numBoxes){
			if(this.listAdd(this.boxes,item)){
				item.place = P_BOX;
				return true;
			}
		}
		if(this.listAdd(this.pack,item)){
			item.place = P_PACK
			return true;
		}
		let l = Object.keys(this.pack).length;
		if(l<MAX_PACK_COUNT){
			item.place = P_PACK
			this.pack[EA[l]] = item;
			inventory.sort(EA[l],this.pack);
			this.gainOrloseWeight(item,item.quantity,true)
			return true;
		}
		item.putDown(this.x,this.y,true);
		return false;
	}
	
	boxAdd(item,a){
		let item2 = this.boxes[a];
		if(!item2){
			item.place = P_BOX;
			this.boxes[a] = item;
		} else if(item2.equal(item))
			item2.quantity += item.quantity;
		else{
			item.place = P_BOX;
			item2 = this.inventoryOut(item2,item2.quantity);
			this.packAdd(item2);
			this.boxes[a] = item;
		}
		this.gainOrloseWeight(item,item.quantity,true)
	}
	
	listAdd(list,item){
		let a = this.canCarryItem(list,item);
		if(a!==ud){
			list[a].quantity += item.quantity;
			this.gainOrloseWeight(item,item.quantity,true)
		}
		return a;
	}
	
	canCarryItem(list,item){
		let key;
		for(let key2 in list){
			let item2 = list[key2];
			if(!item2) continue;
			if(item2.equal(item)) key = key2;
			if(key) break;
		}
		return key;
	}
		
	createItemIntoPack(times,type,tabId,quantity,uniqueId,starter,magic,lvl){
		for(let i=0;i<times;i++)
			this.packAdd(creation.item(1,type,tabId,quantity,LIST,
						ud,ud,magic,ud,lvl,uniqueId,starter));
	}
	
	getOrLooseStats(s,get,mod){
		let num = get? 1:-1;
		if(mod){ //enemy mod
			if(s.dmgDiceNum) this.dmgDiceNum += num*s.dmgDiceNum;
			if(s.dmgDiceSides) this.dmgDiceSides += num*s.dmgDiceSides;
			if(s.cursed) this.cursed = s.cursed;
			if(s.invisible) this.invisible = s.invisible;
		}
		if(s.acBonus&&(mod||!this.armor)) this.acBonus += num*s.acBonus;
		if(s.atkType) this.atkType = get? s.atkType:this.atBare;
		if(s.dmgBase) this.dmgBase = get? s.dmgBase:this.dmgBare;
		if(s.acSBase) this.acSBaseSum += num*s.acSBase;
		if(s.acTBase) this.acTBaseSum += num*s.acTBase;
		if(s.acBBase) this.acBBaseSum += num*s.acBBase;
		if(s.dmgBonus) this.dmgBonus += num*s.dmgBonus;
		if(s.rateBonus) this.rateBonus += num*s.rateBonus;
		if(s.acSValue) this.acSValueSum += num*s.acSValue;
		if(s.acTValue) this.acTValueSum += num*s.acTValue;
		if(s.acBValue) this.acBValueSum += num*s.acBValue;
		if(s.str) this.str += num*s.str,this.strMax += num*s.str,this.strBonus += num*s.str;
		if(s.dex) this.dex += num*s.dex,this.dexMax += num*s.dex,this.dexBonus += num*s.dex;
		if(s.con) this.con += num*s.con,this.conMax += num*s.con,this.conBonus += num*s.con;
		if(s.int) this.int += num*s.int,this.intMax += num*s.int,this.intBonus += num*s.int;
		if(s.spd) this.spd += num*s.spd,this.spdMax += num*s.spd;
		if(s.mf) this.mf += num*s.mf;
		if(s.gf) this.gf += num*s.gf;
		if(s.hp) this.hpSum += num*s.hp;
		if(s.mp) this.mpSum += num*s.mp;
		if(s.fire) this.fireMax += num*s.fire;
		if(s.water) this.waterMax += num*s.water;
		if(s.air) this.airMax += num*s.air;
		if(s.earth) this.earthMax += num*s.earth;
		if(s.poison) this.poisonMax += num*s.poison;
		if(s.skillFire) this.skillFire += num*s.skillFire;
		if(s.skillWater) this.skillWater += num*s.skillWater;
		if(s.skillAir) this.skillAir += num*s.skillAir;
		if(s.skillEarth) this.skillEarth += num*s.skillEarth;
		if(s.skillPoison) this.skillPoison += num*s.skillPoison;
		if(s.skillAll) this.skillAll += num*s.skillAll;
		if(s.iasBase) this.iasBase += num*s.iasBase;
		if(s.ias) this.ias += num*s.ias;
		if(s.fcrBase) this.fcrBase += num*s.fcrBase;
		if(s.frwBase) this.frwBase += num*s.frwBase;
		if(s.fcr) this.fcr += num*s.fcr;
		if(s.frw) this.frw += num*s.frw;
		if(s.hpReg) this.hpReg += num*s.hpReg;
		if(s.mpReg) this.mpReg += num*s.mpReg;
		if(s.digest) this.digest += num*s.digest;
		if(s.stealth) this.stealth += num*s.stealth;
		if(s.searching) this.searching += num*s.searching;
		if(s.levi) this.levi += num*s.levi;
		if(s.teleported) this.teleported += num*s.teleported;
		if(s.aggravating) this.aggravating += num*s.aggravating;
		if(s.strSus) this.strSus += num*s.strSus;
		if(s.dexSus) this.dexSus += num*s.dexSus;
		if(s.conSus) this.conSus += num*s.conSus;
		if(s.intSus) this.intSus += num*s.intSus;
		if(s.digging) this.digging += num*s.digging;
		if(s.dmgHuman) this.dmgHuman += num*s.dmgHuman;
		if(s.dmgDemon) this.dmgDemon += num*s.dmgDemon;
		if(s.dmgAnimal) this.dmgAnimal += num*s.dmgAnimal;
		if(s.dmgDragon) this.dmgDragon += num*s.dmgDragon;
		if(s.dmgUndead) this.dmgUndead += num*s.dmgUndead;
		if(s.dmgGiant) this.dmgGiant += num*s.dmgGiant;
		if(s.dmgSpirit) this.dmgSpirit += num*s.dmgSpirit;
		if(s.dmgFire) this.dmgFire += num*s.dmgFire;
		if(s.dmgLightning) this.dmgLightning += num*s.dmgLightning;
		if(s.dmgPoison) this.dmgPoison += num*s.dmgPoison;
		if(s.dmgAcid) this.dmgAcid += num*s.dmgAcid;
		if(s.stealLife) this.stealLife += num*s.stealLife;
		if(s.stealMana) this.stealMana += num*s.stealMana;
		if(s.atkCon) this.atkCon += num*s.atkCon;
		if(s.atkPara) this.atkPara += num*s.atkPara;
		if(s.atkSlow) this.atkSlow += num*s.atkSlow;
		if(s.atkInf) this.atkInf += num*s.atkInf;
		if(s.atkBlind) this.atkBlind += num*s.atkBlind;
		if(s.atkRadi) this.atkRadi += num*s.atkRadi;
		if(s.atkCold) this.atkCold += num*s.atkCold;
		if(s.atkDrain) this.atkDrain += num*s.atkDrain;
		if(s.atkStealGold) this.atkStealGold += num*s.atkStealGold;
		if(s.atkStealItem) this.atkStealItem += num*s.atkStealItem;
		if(s.expBonus) this.expBonus += num*s.expBonus;
		if(s.lighten&&(!mod&&s.duration||mod)){
			this.lighten += num*s.lighten;
			if(!mod) this.lightenOrDarken('Lighten');
		}
		if(s.numBoxes){
			get? this.getBoxes(s.numBoxes):this.looseBoxes(s.numBoxes);
			this.numBoxes += num*s.numBoxes;
		}
	}
	
	getBoxes(numBoxes){
		for(let i=this.numBoxes+1;i<=this.numBoxes+numBoxes;i++){
			let item = this.eqt[i];
			if(item){
				this.boxAdd(item,i);
				delete this.eqt[i];
			} else
				this.boxes[i] = null;
		}
		if(Object.keys(this.eqt).length){
			for(let key in this.eqt){
				let item = this.eqt[key];
				if(!this.packAdd(item)) item.dropped();
			}
			this.eqt = {};
		}
	}
	
	looseBoxes(numBoxes){
		for(let i=this.numBoxes-numBoxes+1;i<=this.numBoxes;i++){
			let item = this.boxes[i];
			delete this.boxes[i];
			if(!item) continue;
			this.gainOrloseWeight(item,item.quantity);
			if(flag.equip)
				this.eqt[i] = item;
			else if(!this.packAdd(item))
				item.dropped();
		}
	}
	
	calcAll(){
		this.calcHP();
		this.calcMP();
		this.calcWeightLimit();
		this.calcDmg();
		this.calcAc();
		this.calcResist();
		this.calcMoveTimes();
	}
	
	haveCast(skillId,lvl,f=this,x,y){
		let skill = skillMap.get(skillId);
		if(skill.kind==='attack'||skill.kind==='breath'){
			this.attack(f,false,skill,lvl);
			if(skill.effect&&f.hp>0&&evalPercentage(skill.effect.prob)) this.haveCast(skill.effect.id,lvl,f,x,y);
			if(!skill.effectSelf&&f.hp>0) return;
		}
		let name = f.getName(true);
		if(skill.durBase) var duration = this.calcSkillDur(skill,lvl);
		switch(skillId){
			case HEAL:
			case EXTRA_HEAL:
				let amount = this.calcSkillValue(skill,lvl);
				f.hp += amount;
				message.draw(rogue.cl===ENG?
				`${name} got well (+${amount})`
				:`${name}傷が癒えた(+${amount})`);
				if(f.hp>f.hpMax) f.hp = f.hpMax;
				f.poisoned = 0;
				f.confused = 0;
				if(f.blinded){
					f.blinded = 0;
					map.redraw(rogue.x,rogue.y);
				}
				if(skillId===EXTRA_HEAL){
					f.infected = 0;
					if(f.hallucinated){
						f.hallucinated = 0;
						if(f.id===ROGUE) hallucinate.all(true);
					}
				}
				break;
			case MANA:
				f.mp += this.calcSkillValue(skill,lvl);
				if(f.mp>=f.mpMax) f.mp = f.mpMax;
				break;
			case LIFE_REGENERATION:
				f.hpReg -= f.hpRegBuff;
				f.hpRegBuff = this.calcSkillValue(skill,lvl);
				f.hpReg += f.hpRegBuff;
				f.hpRegBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Life Regeneration`
				:`${name}再生の効果を得た`);
				break;
			case MANA_REGENERATION:
				f.mpReg -= f.mpRegBuff; 
				f.mpRegBuff = this.calcSkillValue(skill,lvl);
				f.mpReg += f.mpRegBuff;
				f.mpRegBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Mana Regeneration`
				:`${name}魔力再生の効果を得た`);
				break;
			case WEAKNESS:
				if(evalPercentage(f.poison)) return;
				f.decayOrRestore(STR);
				break;
			case CLUMSINESS:
				if(evalPercentage(f.poison)) return;
				f.decayOrRestore(DEX);
				break;
			case SICKLINESS:
				if(evalPercentage(f.poison)) return;
				f.decayOrRestore(CON);
				break;
			case STUPIDITY:
				if(evalPercentage(f.poison)) return;
				f.decayOrRestore(INT);
				break;
			case RESTORE_STRENGTH:
				f.decayOrRestore(STR,true);
				break;
			case RESTORE_DEXTERITY:
				f.decayOrRestore(DEX,true);
				break;
			case RESTORE_CONSTITUTION:
				f.decayOrRestore(CON,true);
				break;
			case RESTORE_INTELLIGENCE:
				f.decayOrRestore(INT,true);
				break;
			case RESTORE_EXPERIENCE:
				f.decayOrRestore(EXP,true);
				break;
			case RESTORE_ALL:
				f.decayOrRestore(STR,true);
				f.decayOrRestore(DEX,true);
				f.decayOrRestore(CON,true);
				f.decayOrRestore(INT,true);
				f.decayOrRestore(EXP,true);
				break;
			case CURE_ALL:
				f.confused=f.canceled=f.poisoned
				=f.infected=f.paralyzed=f.sleeping=0;
				if(f.blinded){
					f.blinded = 0;
					if(f.id===ROGUE) map.redraw(rogue.x,rogue.y);
				}
				if(f.hallucinated){
					f.hallucinated = 0;
					if(f.id===ROGUE) hallucinate.all(true);
				}
				break;
			case RESIST_FIRE:
				f.fireBuff = this.calcSkillValue(skill,lvl);
				f.fireBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist Fire`
				:`${name}耐火の効果を得た`);
				f.calcResist();
				break;
			case RESIST_WATER:
				f.waterBuff = this.calcSkillValue(skill,lvl);
				f.waterBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist Water`
				:`${name}耐水の効果を得た`);
				f.calcResist();
				break;
			case RESIST_AIR:
				f.airBuff = this.calcSkillValue(skill,lvl);
				f.airBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist Air`
				:`${name}耐風の効果を得た`);
				f.calcResist();
				break;
			case RESIST_EARTH:
				f.earthBuff = this.calcSkillValue(skill,lvl);
				f.earthBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist Earth`
				:`${name}耐土の効果を得た`);
				f.calcResist();
				break;
			case RESIST_POISON:
				f.poisonBuff = this.calcSkillValue(skill,lvl);
				f.poisonBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist Poison`
				:`${name}耐毒の効果を得た`);
				f.calcResist();
				break;
			case RESIST_ALL:
				f.fireBuff=f.waterBuff=f.airBuff=f.earthBuff=f.poisonBuff
				= this.calcSkillValue(skill,lvl);
				f.fireBuffDur=f.waterBuffDur=f.airBuffDur
				=f.earthBuffDur=f.poisonBuffDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Resist All`
				:`${name}全耐性の効果を得た`);
				f.calcResist();
				break;
			case LOWER_RESIST:
				if(evalPercentage(f.poison)) return;
				f.lowerRes = this.calcSkillValue(skill,lvl);
				f.lowerResDur = duration;
				message.draw(rogue.cl===ENG?
				`${name} got an effect of Lower Resist`
				:`${name}耐性低下の効果を受けた`);
				f.calcResist();
				break;
			case ENLIGHTENMENT:
				map.lighten();
				break;
			case WORMHOLE:
				inventory.clear();
				rogue.eventFlag(88); //examine
				flag.wormhole = true;
				return null;
			case SHORT_TELEPORTATION:
				f.teleport(true);
				break;
			case TELEPORTATION:
				f.teleport(false,MIN_TELE_RAD_SQ);
				break;
			case TELEPORT_AWAY:
				f.teleport(false,this.calcSkillValue(skill,lvl)**2);
				break;
			case TELEPORT_TO:
				f.teleport(false,false,this.x,this.y);
				break;
			case REMOVE_CURSE:
				for(let key in f.equipment){
					let item = f.equipment[key];
					if(item&&item.cursed) item.uncurse();
				}
				break;
			case IDENTIFY:
				flag.identify = true;
				flag.regular = false;
				inventory.clear();
				this.showInventory(P_PACK);
				this.equipmentList();
				message.draw(message.get(M_IDENTIFY)+message.get(M_FLOOR),true);
				return null;
			case DISINTEGRATION:
				inventory.clear();
				flag.disint = true;
				flag.regular = false;
				message.draw(message.get(M_DISINTEGRATION),true);
				return null;
			case RESTORE_DURABILITY:
				inventory.clear();
				flag.repair = true;
				this.showInventory(P_PACK);
				this.equipmentList();
				message.draw(message.get(M_REPAIR)+message.get(M_FLOOR),true);
				flag.regular = false;
				return null;
			case REPAIR_ALL:
				this.repairAll();
				break;
			case LIGHT:
				shadowcasting.main(this.x,this.y,this.calcSkillValue(skill,lvl),'Light');
				rogue.lightenOrDarken('Lighten');
				break;
			case MONSTER_DETECTION:
			case ITEM_DETECTION:
			case MAGIC_MAPPING:
			case SCREAM:
				circleSearch.main(this.x,this.y,skillId,this.calcSkillValue(skill,lvl));
				break;
			case EARTHQUAKE:
				let percEQ = this.calcSkillValue(skill,lvl);
				circleSearch.main(this.x,this.y,skillId,skill.radius,ud,percEQ<skill.limit? percEQ:skill.limit);
				litMapIds = {};
				rogue.lightenOrDarken('Lighten');
				break;
			case SATISFY_HUNGER:
				f.hunger += MAX_HUNGER*this.calcSkillValue(skill,lvl)/100;
				if(f.hunger>MAX_HUNGER) f.hunger = MAX_HUNGER;
				break;
			case TOWN_PORTAL:
				let portal = new Portal(enter[PORTAL]);
				portal.init(LOCATION,this.x,this.y);
				message.draw(rogue.cl==ENG?
				`Created a Town Portal`
				:`タウン・ポータルを生成した`);
				break;
			case SPEED:
				f.spdBuff = this.calcSkillValue(skill,lvl);
				f.speeded = duration;
				f.calcSpeed();
				message.draw(rogue.cl==ENG?
				`${name} speeded up`
				:`${name}加速した`);
				break;
			case ECCO:
				f.ecco = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Ecco`
				:`${name}エコーの効果を得た`);
				break;
			case POISON:
				if(evalPercentage(f.poison)) return;
				if(!f.poisoned)
					f.poisoned = 0;
					message.draw(rogue.cl==ENG?
					`${name} got poisoned`
					:`${name}毒を受けた`);
				if(duration>f.poisoned) f.poisoned = duration;
				break;
			case RADIATION:
				if(evalPercentage(f.radiation)) return;
				f.decayOrRestore();
				break;
			case SLOW:
			case GRAVITATIONAL_FIELD:
				if(evalPercentage(f.gravity)) return;
				f.spdNerf = this.calcSkillValue(skill,lvl);
				f.slowed = duration;
				f.calcSpeed();
				message.draw(rogue.cl==ENG?
				`${name} slowed down`
				:`${name}減速した`);
				break;
			case CONFUSION:
				if(evalPercentage(f.poison)) return;
				f.confused = duration;
				message.draw(rogue.cl==ENG?
				`${name} got confused`
				:`${name}混乱した`);
				break;
			case TOUCH_OF_CONFUSION:
				f.atkCon =  this.calcSkillValue(skill,lvl);
				if(f.atkCon>skill.limit) f.atkCon = skill.limit;
				f.confusing = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Touch of Confusion`
				:`${name}混乱の手の効果を得た`);
				break;
			case VENOM_HANDS:
				if(f.venom) f.dmgPoison -= f.venom;
				f.venom = this.calcSkillValue(skill,lvl);
				f.dmgPoison += f.venom;
				f.venomDur = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Venom Hands`
				:`${name}猛毒の手の効果を得た`);
				break;
			case ENCHANT_SELF:
				if(f.enchantSelf){
					f.dmgBonus -= f.enchantSelf;
					f.rateBonus -= f.enchantSelf;
					f.acBonus -= f.enchantSelf;
				}
				f.enchantSelf = this.calcSkillValue(skill,lvl);
				f.enchantSelfDur = duration;
				f.dmgBonus += f.enchantSelf;
				f.rateBonus += f.enchantSelf;
				f.acBonus += f.enchantSelf;
				f.calcDmg();
				f.calcAc();
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Enchant Self`
				:`${name}自己強化の効果を得た`);
				break;
			case PARALYSIS:
			case HOLD_MONSTER:
				if(evalPercentage(f.poison)) return;
				f.paralyzed = duration;
				message.draw(rogue.cl==ENG?
				`${name} got paralyzed`
				:`${name}麻痺した`);
				break;
			case SLEEP:
			case SLEEPING_GAS:
				if(evalPercentage(f.poison)) return;
				if(f.sleeping>=0){
					f.sleeping = duration;
					message.draw(rogue.cl==ENG?
					`${name} fell asleep`
					:`${name}昏睡した`);
				}
				break;
			case BLINDNESS:
				if(evalPercentage(f.poison)) return;
				f.blinded = duration;
				if(f.id===ROGUE) goBlind();
				message.draw(rogue.cl==ENG?
				`${name} got blinded`
				:`${name}盲目になった`);
				break;
			case INVISIBILITY:
				if(f.invisible) return;
				f.invisibility = duration;
				f.invisible = true;
				coords[f.x][f.y].draw();
				break;
			case SEE_INVISIBLE:
				f.seeInvisible = duration;
				if(f.id===ROGUE) seeInvisible(true);
				message.draw(rogue.cl==ENG?
				`${name} can see invisible things`
				:`${name}透明の物体が見えるようになった`);
				if(f.blinded){
					f.blinded = 0;
					if(f.id===ROGUE) map.redraw(rogue.x,rogue.y);
				}
				break;
			case INFECTION:
				if(evalPercentage(f.infection)) return;
				f.infected = duration;
				message.draw(rogue.cl==ENG?
				`${name} got infected`
				:`${name}感染した`);
				break;
			case HALLUCINATION:
			// case HALLUCINATING_MIST:
				if(evalPercentage(f.poison)) return;
				let found2;
				if(!f.hallucinated&&f.id===ROGUE) found2 = true;
				f.hallucinated = duration;
				if(found2) hallucinate.all();
				message.draw(rogue.cl==ENG?
				`${name} got hallucinated`
				:`${name}幻覚状態になった`);
				break;
			case POLYMORPH:
				if(f.id===ROGUE||f.mod===UNIQUE||evalPercentage(f.poison)) return;
				let [tempX, tempY] = [f.x, f.y];
				f.died();
				creation.enemy(1,RANDOM,RANDOM,LOCATION,tempX,tempY,true);
				message.draw(rogue.cl==ENG?
				`${name} got polymorphed`
				:`${name}変容した`);
				break;
			case CANCELLATION:
				if(evalPercentage(f.poison)) return;
				f.canceled = duration*(f.mod!==UNIQUE? 1:2);
				if(f.invisible){
					if(f.invisible!==DEFAULT) f.invisibility = 0;
					f.invisible = false;
					coords[x][y].draw();
				}
				if(f.mimic&&!f.identified){
					hallucinate.undoOne(f);
					f.identified = true;
					coords[f.x][f.y].draw();
				}
				message.draw(rogue.cl==ENG?
				`${name} got canceled`
				:`${name}封印された`);
				break;
			case RAISE_LEVEL:
				if(f.lvl!==MAX_FIGHTER_LVL) f.gainExp(calcLevel(f.lvl+1)-f.exp,true);
				break;
			case CREATE_MONSTER:
			case CREATE_MAGIC_MONSTER:
			case CREATE_GIANT:
				let type;
				if(skillId===CREATE_MONSTER||skillId===CREATE_MAGIC_MONSTER)
					type = RANDOM;
				else if(skillId===CREATE_GIANT)
					type = 'giants';
				creation.enemy(rndIntBet(1,3),type,RANDOM,LOCATION,this.x,this.y,true,skillId===CREATE_MAGIC_MONSTER);
				break;
			case CREATE_TRAP:
				creation.trap(5,RANDOM,LOCATION,this.x,this.y);
				break;
			case MAGIC_CIRCLE_OF_PROTECTION:
				creation.trap(1,0,LOCATION,this.x,this.y,true);
				break;
			case MAGIC_FINDING:
				f.mf -= f.mfBuff;
				f.mfBuff = this.calcSkillValue(skill,lvl);
				f.mf += f.mfBuff;
				f.mfBuffDur = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Magic Finding`
				:`${name}魔法具探求の効果を得た`);
				break;
			case GOLD_FINDING:
				f.gf -= f.gfBuff;
				f.gfBuff = this.calcSkillValue(skill,lvl);
				f.gf += f.gfBuff;
				f.gfBuffDur = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Gold Finding`
				:`${name}財宝探求の効果を得た`);
				break;
			case EXPERIENCE:
				if(f.expBuff) f.expBonus -= f.expBuff;
				f.expBuff = this.calcSkillValue(skill,lvl);
				f.expBonus += f.expBuff;
				f.expBuffDur = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Experience`
				:`${name}経験の効果を得た`);
				break;
			case SKILL:
				if(f.skillBuff) f.skillAll -= f.skillBuff;
				f.skillBuff = this.calcSkillValue(skill,lvl);
				f.skillAll += f.skillBuff;
				f.skillBuffDur = duration;
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Skill`
				:`${name}スキルの効果を得た`);
				break;
			case ENCOURAGEMENT:
				f.dmgBuff=f.rateBuff=this.calcSkillValue(skill,lvl);
				f.dmgBuffDur = duration; 
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Combat`
				:`${name}戦闘の効果を得た`);
				f.calcDmg();
				break;
			case BLESSING:
				f.acBuff = this.calcSkillValue(skill,lvl);
				f.acBuffDur = duration; 
				message.draw(rogue.cl==ENG?
				`${name} got an effect of Armor`
				:`${name}守護の効果を得た`);
				f.calcAc();
				break;
			case RESPEC:
				f.respec();
				break;
			case COLD:
			case FREEZING_ARROW:
				if(evalPercentage(f.cold)) return;
				f.cost += COLD_DELAY+(skillId===COLD? 0:COLD_DELAY*5-f.cold);
				break;
			case PHOTON_ARROW:
				this.cost -= 3;
				break;
			case STONE_TO_MUD:
				if(coords[x][y].wall||coords[x][y].door===CLOSE){
					if(coords[x][y].wall)
						coords[x][y].deleteWall(true);
					else
						coords[x][y].deleteDoor(true);
					audio.playSound('dig',distanceSq(this.x,this.y,x,y));
				}
				if(litMapIds[x+','+y]) rogue.lightenOrDarken('Lighten');
				if(f.material===M_STONE) this.attack(f,false,skill,lvl);
				break;
		}
	}
	
	aim(keyCode,x1,y1,nameSkill,ecco){
		if(keyCode===88){ //x
			if(this.blinded){
				message.draw(message.get(M_CANT_EXAMINE));
				return;
			}
			flag.examine = true;
			cursol.init();
			this.examine();
			return;
		}
		if(keyCode!==null){
			if(keyCode===190||keyCode===110) //., T.
				[x1, y1] = [this.x, this.y];
			else{
				var dr = getDirection(keyCode);
				if(dr===null) return;
			}
		}
		let skill,lvl;
		if(flag.zap){
			var w = ci;
			ci = null;
			nameSkill = w.nameSkill;
			skill = skillMap.get(nameSkill);
			lvl = w.skillLvl;
		} else if(flag.skill){
			if(!nameSkill) nameSkill = cs.id;
			skill = skillMap.get(nameSkill);
			lvl = cs.lvl+this.getSkillBoost(skill);
			let name = skill.name[rogue.cl];
			let nameChar = this.getName(true);
			message.draw(rogue.cl===ENG?
			`${nameChar} cast ${name}`
			:skill.type==='spell'?
			`${nameChar}${name}を唱えた`
			:`${nameChar}${name}を放った`);
		} else if(flag.scroll){
			nameSkill = ci.nameSkill;
			skill = skillMap.get(nameSkill);
			lvl = ci.skillLvl;
		}
		if(flag.zap&&!w.charges){
			message.draw(message.get(M_NOTHING_HAPPENED));
			flag.zap = false;
		} else{
			let found = false;
			let hit = false;
			let [xS, yS] = [this.x, this.y];
			if(flag.arrow||skill.range!==0){
				let parabora = !dr&&(flag.arrow||skill.parabora);
				let rangeSq = !flag.arrow&&skill.range? skill.range**2:FOV_SQ;
				if(dr) [x1, y1] = [this.x+dr.x*FOV, this.y+dr.y*FOV];
				var [x0, xT, y0, yT] = [this.x,this.x,this.y,this.y]
				var steep = Math.abs(y1-y0)>Math.abs(x1-x0);
				if(steep) [x0, y0, x1, y1] = [y0, x0, y1, x1];
				let [dx, dy] = [Math.abs(x1-x0), Math.abs(y1-y0)];
				let error = dx/2;
				let ystep = y0<y1? 1:-1;
				let y = y0;
				let los = true;
				let inc = x0<x1? 1:-1;
				for(let x=x0+inc;x1-x+inc;x+=inc){
					error -= dy;
					if(error<0){
						y += ystep;
						error += dx;
					}
					[xS, yS] = !steep? [x, y]:[y, x];
					if(distanceSq(x,y,x0,y0)>rangeSq){
						los = false;
						break;
					}
					if(!flag.arrow&&skill.each){
						if(!(coords[xS][yS].wall||coords[xS][yS].door===CLOSE))
							shadowcasting.main(xS,yS,skill.radius,nameSkill,lvl,ud,ud,ud,this);
					} else if((!parabora||parabora&&x===x1&&y===y1)
					&&coords[xS][yS].fighter
					&&(this.isOpponent(coords[xS][yS].fighter))){
						let fighter = coords[xS][yS].fighter;
						hit = true;
						if(flag.arrow){
					 		this.attack(fighter,true);
							break;
						}
						if(skill.radius)
							shadowcasting.main(xS,yS,skill.radius,nameSkill,lvl,ud,ud,ud,this);
						else
							this.haveCast(nameSkill,lvl,fighter,xS,yS);
						if(flag.zap&&!w.identified&&!skill.wall) found = true;
						if(!skill.penetrate) break;
					}
					if(coords[xS][yS].wall||coords[xS][yS].door===CLOSE){
						los = false;
						break;
					}
					[xT, yT] = [xS, yS];
				}
				if(!los){
					if(!flag.arrow&&skill.wall
					&&(coords[xS][yS].wall&&!coords[xS][yS].indestructible
					||coords[xS][yS].door===CLOSE)){
						this.haveCast(nameSkill,lvl,ud,xS,yS);
						if(flag.zap&&!w.identified) found = true;
					} else
						[xS, yS] = [xT, yT];
				}
			}
			if(flag.died) return;
			if(!flag.arrow&&skill.radius&&(!hit||skill.penetrate))
				shadowcasting.main(xS,yS,skill.radius,nameSkill,lvl,ud,ud,ud,this);
			if(flag.arrow){
				if(!hit) this.deleteAmmo(ci,true,xS,yS);
				flag.arrow = false;
			} else if(flag.skill){
				this.consumeMana(skill);
				if(!ecco&&this.ecco&&this.mp>=skill.mp){
					if(steep) [x1, y1] = [y1, x1]; 
					this.aim(null,x1,y1,nameSkill,true);
					return;
				}
				if(skill.move){
					if(nameSkill===RAID&&hit) 
						this.teleport(false,false,xT,yT,true);
					else if(nameSkill===RUSH||nameSkill===SPIRAL||nameSkill===COLLAPSE)
						this.teleport(false,false,xS,yS,true);
				}
				if(skill.type==='missile') this.deleteAmmo(ci);
				flag.skill = false;
			} else if(flag.scroll){
				if(flag.aim) this.deleteItem(ci,1);
				flag.scroll = false;
			} else if(flag.zap)
				this.haveZapped(w,found);
		}
		if(this.id!==ROGUE) return;
		if(!flag.examine) ctxCur.clearRect(0,0,canvas.width,canvas.height);
		inventory.clear();
		rogue.done= true;
		flag.aim = false;
		flag.regular = true;
	}
	
	checkToCast(skill){
		let msgId;
		let check = true;
		if(!skill){
			if(!this.skill['a']){
				msgId = M_DONT_HAVE_SKILL;
				check = false;
			} else if(this.canceled){
				msgId = M_CANT_CAST;
				check = false;
			} else if(!this.canRead(true))
				check = false;
		} else if(this.id===ROGUE&&!this.haveBook(skill.id)){
			msgId = M_DONT_HAVE_BOOK;
			check = false;
		} else if(skill.mp>this.mp){
			msgId = M_DONT_HAVE_MANA;
			check = false;
		} else if(skill.type==='missile'){
			if(!this.haveMissile(true)){
				check = false;
			} else{
				ci = this.getAmmo(this.equipment['main'].throwType);
				if(!ci){
					msgId = M_DONT_HAVE_AMMO;
					check = false;
				}
			}
		} else if(skill.type==='melee'&&this.haveMissile()){
			msgId = M_DONT_HAVE_MELEE;
			check = false;
		}
		if(this.id===ROGUE&&msgId) message.draw(message.get(msgId));
		return check;
	}
	
	canRead(book){
		let found = true;
		if(this.blinded||!litMapIds[this.x+','+this.y]){
			if(this.id===ROGUE){
				let id = book? M_CANT_READ_BOOK:M_CANT_READ_SCROLL;
				message.draw(message.get(id));
			}
			found = false;
		}
		return found;
	}
	
	haveBook(nameSkill,alchemy){
		let found = this.haveBookLoop(this.pack,nameSkill,alchemy);
		if(!found) found = this.haveBookLoop(this.boxes,nameSkill,alchemy);
		return found;
	}
	
	haveBookLoop(list,nameSkill,alchemy){
		for(let key in list){
			let item = list[key];
			if(item&&item.type==='book'){
				if(alchemy&&item.alchemy)
					return true
				else if(nameSkill&&item.skill){
					for(let key2 in item.list){
						if(item.list[key2]===nameSkill) return true
					}
				}
			}
		}
	}
	
	castSelfSpell(skill,ecco){
		let lvl = cs.lvl+this.getSkillBoost(skill);
		let name = this.getName(true);
		let nameSkill = skill.name[rogue.cl];
		message.draw(rogue.cl===ENG?
		`${name} cast ${nameSkill}`
		:skill.type==='spell'?
		`${name}${nameSkill}を唱えた`
		:`${name}${nameSkill}を放った`);
		if(this.haveCast(skill.id,lvl,this)===null) return null;
		this.consumeMana(skill);
		if(!ecco&&this.ecco&&this.mp>=skill.mp&&skill.id!==ECCO)
			this.castSelfSpell(skill,true);
	}
	
	searchSkill(id){
		for(let key in this.skill){
			if(this.skill[key].id===id) return key;
		}
		return false;
	}
	
	consumeMana(skill){
		this.cost -= this['times'+getUpperCase(skill.type)]-1;
		this.mp -= skill.mp;
	}
	
	haveMissile(msg){
		let found = true;
		if(!this.equipment['main']||this.equipment['main'].type!=='missile'){
			if(msg) message.draw(message.get(M_DONT_HAVE_MISSILE));
			found = false;
		} 
		return found;
	}
	
	getAmmo(throwType){
		let item = this.getAmmoLoop(this.boxes,throwType);
		if(!item) item = this.getAmmoLoop(this.pack,throwType);
		if(!item) item = this.getAmmoLoop(coords[this.x][this.y].item,throwType);
		return item;
	}
	
	getAmmoLoop(list,throwType){
		for(let key in list){
			let item = list[key];
			if(item&&item.type==='ammo'&&item.throwType===throwType)
				return item;
		}
		return null;
	}
	
	deleteAmmo(item,drop,x,y){
		if(!drop) 
			this.deleteItem(item,1);
		else{
			item = this.inventoryOut(item,1);
			item.putDown(x,y,true);
			ci = null;
		}
	}
	
	deleteItem(item,quantity){
		if(flag.scroll){
			flag.scroll = false;
			if(item.chargeBook){
				this.reduceItemCharge(item);
				return;
			}
		}
		switch(item.place){
			case P_PACK:
				this.deletePackItem(item.indexOf(this.pack),quantity);
				break;
			case P_BOX:
				this.deleteBoxItem(item.indexOf(this.boxes),quantity);
				break;
			case P_FLOOR:
				let loc = coords[item.x][item.y];
				loc.deleteItem(item.indexOf(loc.item),quantity);
				break;
			case P_EQUIPMENT:
				this.deleteEquipment(item.indexOf(this.equipment),quantity);
				break;
		}
		ci = null;
	}
	
	reduceItemCharge(item){
		if(item.quantity>1){
			item = this.inventoryOut(item,1);
			item.charges--;
			if(item.identified) item.changePrice();
			if((item.place===P_PACK||item.place===P_BOX)&&!this.packAdd(item))
				item.dropped();
			else if(item.place===P_FLOOR)
				item.putDown(item.x,item.y,true);
		} else{	
			item.charges--;
			if(item.identified){
				item.changePrice();
				if(item.place===P_PACK) inventory.sort(this.getItemIndex(item),this.pack);
			}
		}
	}
	
	getItemIndex(item){
		let a;
		switch(item.place){
			case P_PACK:
				a = item.indexOf(this.pack);
				break;
			case P_BOX:
				a = item.indexOf(this.boxes);
				break;
			case P_FLOOR:
				let loc = coords[item.x][item.y];
				a = item.indexOf(loc.item);
				break;
			case P_EQUIPMENT:
				a = item.indexOf(this.equipment);
				break;
		}
		return a;
	}
	
	swap(){
		let name = this.getName(true);
		if(this.equipment['main']&&this.equipment['main'].cursed
		||this.equipment['off']&&this.equipment['off'].cursed){
			let verb;
			if(this.equipment['main']&&this.equipment['main'].cursed)
				verb = rogue.cl===ENG? 'unwield':'離す';
			else
				verb = rogue.cl===ENG? 'take off':'外す';
			message.draw(rogue.cl===ENG?
			`${name} can't ${verb} the cursed item`
			:`${name}呪われたアイテムを${verb}事が出来ない`);
			return null;
		}
		let itemMain = this.equipment['main'];
		let itemOff = this.equipment['off'];
		let itemSideA = this.side['a'];
		let itemSideB = this.side['b'];
		if(itemMain&&itemMain.durab) this.getOrLooseStats(itemMain,false);
		if(itemOff&&itemOff.durab) this.getOrLooseStats(itemOff,false);
		if(itemSideA&&itemSideA.durab) this.getOrLooseStats(itemSideA,true);
		if(itemSideB&&itemSideB.durab) this.getOrLooseStats(itemSideB,true);
		[this.equipment['main'], this.equipment['off'], this.side['a'], this.side['b']]
			= [itemSideA, itemSideB, itemMain, itemOff];
		this.calcAll();
		this.swapped = !this.swapped;
		message.draw(rogue.cl===ENG?
		`${name} swapped gear`
		:`${name}装備を持ち替えた`);
		if(this.id!==ROGUE) return;
		rogue.done = true;
		if(!flag.equipment){
			this.equipmentList();
			flag.clearInv = true;
		}
	}
	
	stealGold(enemy){
		if(!enemy.purse||evalPercentage(enemy.dex*2)) return;
		let amount = Item.goldAmount(this.lvl);
		if(amount<enemy.purse/50) 
			amount = enemy.purse/50;
		else if(amount>enemy.purse)
			amount = enemy.purse;
		amount = Math.ceil(amount);
		enemy.purse -= amount;
		this.createItemIntoPack(1,'coin',C_COIN,amount);
		let name = this.getName(true);
		message.draw(rogue.cl==ENG?
		`${name} stole $${amount}`
		:`${name}$${amount}を盗んだ`);
		this.teleport(false,MIN_TELE_RAD_SQ);
		return true;
	}
	
	stealItem(enemy){
		if(evalPercentage(enemy.dex*2)) return;
		let {pack,box} = enemy.haveItem();
		if(!pack&&!box) return;
		if(pack&&box){
			pack = coinToss();
			box = !pack;
		}
		let item;
		if(pack){
			let a = EA[rndInt(Object.keys(enemy.pack).length-1)];
			item = enemy.pack[a];
		} else{
			let nums = enums(1,enemy.numBoxes);
			nums.shuffle();
			for(let i=0;i<enemy.numBoxes;i++){
				if(enemy.boxes[nums[i]]){
					item = enemy.boxes[nums[i]];
					break;
				}
			}
		}
		item = enemy.inventoryOut(item,1);
		this.packAdd(item);
		let nameItem = item.getName();
		let name = this.getName(true);
		message.draw(rogue.cl==ENG?
		`${name} stole ${nameItem}`
		:`${name}${nameItem}を盗んだ`);
		this.teleport(false,MIN_TELE_RAD_SQ);
		return true;
	}
	
	haveItem(){
		let pack = !!this.pack['a'];
		let box;
		for(let key in this.boxes){
			if(this.boxes[key]){
				box = true;
				break;
			}
		}
		return {pack,box};
	}
	
	decreaseDurab(weapon,element){
		let item = this.equipment[weapon? 'main':BP[EA[rndInt(MAX_EQUIPMENT_NUM-1)]]];
		if(!item||!item.durab||item.indestructible) return;
		if(element){
			let mat;
			switch(element){
				case 'acid':
					mat = M_METAL|M_PLATING;
					break;
				case 'fire':
					mat = M_CLOTH|M_FUR|M_FEATHER|M_SKIN|M_SCALE|M_WOOD;
					break;
				case 'lightning':
					mat = M_BONE|M_SHELL|M_GEM|M_STONE;
					break;
			}
			if(!(item.material&mat)) return;
		} else if(evalPercentage(95))
			return
		if(!--item.durab){
			this.getOrLooseStats(item);
			this.calcAll();
			let name = item.getName();
			message.draw(rogue.cl===ENG?
			`${name} broke`
			:`${name}は壊れた`);
			return true;
		}
	}
	
	gotCursed(){
		let item = this.equipment[BP[EA[rndInt(MAX_EQUIPMENT_NUM-1)]]];
		if(!item||item.cursed) return;
		let name = item.getName();
		message.draw(rogue.cl===ENG?
		`${name} is cursed`
		:`${name}は呪われた`);
		item.cursed = true;
		audio.playSound('curse');
	}
	
	gainSynerzy(skill,point){
		if(skill.type==='melee')
			this.synerzyMelee += point;
		else if(skill.type==='missile')
			this.synerzyMissile += point;
		else{
			switch(skill.element){
				case 'fire':
				case 'light':
					this.synerzyFire += point;
					break;
				case 'water':
				case 'cold':
					this.synerzyWater += point;
					break;
				case 'air':
				case 'lightning':
					this.synerzyAir += point;
					break;
				case 'earth':
				case 'gravity':
					this.synerzyEarth += point;
					break;
				case 'poison':
				case 'infection':
					this.synerzyPoison += point;
					break;
				case 'sand':
					this.synerzyAir += point/2;
					this.synerzyEarth += point/2;
					break;
				case 'blizzard':
					this.synerzyWater += point/2;
					this.synerzyAir += point/2;
					break;
				case 'magma':
					this.synerzyFire += point/2;
					this.synerzyEarth += point/2;
					break;
				case 'radiation':
					this.synerzyFire += point/2;
					this.synerzyPoison += point/2;
					break;
				case 'acid':
					this.synerzyWater += point/2;
					this.synerzyPoison += point/2;
			}
		}
	}
	
	decreaseEnergy(){
		this.energy -= (this.spd<0? -this.spd:0)+this.cost+rndIntBet(-1,1);
		if(this.cost!==COST_REGULAR) this.cost = COST_REGULAR;
		queue.update(this);
	}
	
	increaseEnergy(){
		this.energy += (this.spd>0? this.spd:0)+COST_REGULAR+rndIntBet(-1,1);
	}
	
	teleport(short,radiusSq,x,y,mute){
		this.drawOrErase(false);
		if(!short&&!radiusSq)
			this.spiralSearch(x,y,FIGHTER);
		else{
			let l;
			let lSaved = short? NaN:0;
			let [tempX, tempY] =[this.x, this.y];
			let count = 0;
			do{	this.getPositionRandomly(false,false,true);
				l = distanceSq(this.x,this.y,tempX,tempY);
				if(short&&!(l>=lSaved)||!short&&l>lSaved){
					[x, y] = [this.x, this.y];
					lSaved = l;
				}
			} while((short&&(l>MIN_TELE_RAD_SQ||l<16)
			||!short&&l<=radiusSq)&&++count<100);
			if(count>=100) [this.x, this.y] = [x, y];
		}
		this.drawOrErase(true);
		if(this.sleeping) this.sleeping = 0;
		if(!mute){
			let distance = distanceSq(this.x,this.y,rogue.x,rogue.y);
			audio.playSound('teleport',distance);
		}
		if(this.id===ROGUE){
			coords[this.x][this.y].traces = ++this.numSteps;
			coords[this.x][this.y].getInfor();
		}
	}
	
	
	wakeUp(){
		this.sleeping = 0;
		if(this.id!==ROGUE&&!this.isShowing()) return;
		let name = this.getName(true);
		message.draw(rogue.cl===ENG?
		`${name} woke up`
		:`${name}目覚めた`);
		if(flag.dash||flag.rest) flag.dash = flag.rest = false;
	}
	
	getParts(item){
		let parts;
		switch(item.type){
			case 'melee':
			case 'missile':
			case 'staff':
				if(item.twoHanded){
					if(this.equipment.main&&this.equipment.off){
						if(this.id===ROGUE) message.draw(message.get(M_TWO_HANDED));
						return;
					} else if(this.equipment.main){
						if(this.unequip(65)===null) return; //a
					} else if(this.equipment.off){
						if(this.unequip(66)===null) return; //b
					}
				} else if(this.equipment.main){
					if(this.unequip(65)===null) return; //a
				}
				parts = 'main';
				break;
			case 'shield':
				if(this.equipment.main&&this.equipment.main.twoHanded){
					if(this.unequip(65)===null) return; //a
				}else if(this.equipment.off){
					if(this.unequip(66)===null) return; //b
				}
				parts = 'off';
				break;
			case 'amulet':
				if(this.equipment.neck){
					if(this.unequip(67)===null) return; //c
				}
				parts = 'neck';
				break;
			case 'ring':
				if(this.equipment['R-ring']&&this.equipment['L-ring']){
					if(this.unequip(68)===null) return; //d
					parts = 'R-ring';
				} else if(this.equipment['R-ring']){
					if(this.unequip(69)===null) return; //e
					parts = 'L-ring';
				} else {
					if(this.unequip(68)===null) return; //d
					parts = 'R-ring';
				}
				break;
			case 'light':
				if(this.equipment.light){
					if(this.unequip(70)===null) return; //f
				}
				parts = 'light';
				break;
			case 'armor':
				if(this.equipment.body){
					if(this.unequip(71)===null) return; //g
				}
				parts = 'body';
				break;
			case 'cloak':
				if(this.equipment.back){
					if(this.unequip(72)===null) return; //h
				}
				parts = 'back';
				break;
			case 'belt':
				if(this.equipment.waist){
					if(this.unequip(73)===null) return; //i
				}
				parts = 'waist';
				break;
			case 'helm':
				if(this.equipment.head){
					if(this.unequip(74)===null) return; //j
				}
				parts = 'head';
				break;
			case 'gloves':
				if(this.equipment.hands){
					if(this.unequip(75)===null) return; //k
				}
				parts = 'hands';
				break;
			case 'boots':
				if(this.equipment.feet){
					if(this.unequip(76)===null) return;//l
				}
				parts = 'feet';
				break;
		}
		return parts;
	}
}

const Rogue = class extends Fighter{
	constructor(){
		super(fighterTab['misc'][0])
		this.id = ROGUE;
		this.dmgBare = this.dmgBase; 
		this.expMax = this.exp = 0;
		this.expGain = this.getExp();
		this.expNext = this.calcNextLvl();
		this.cube = {};
		this.cubeIndex = {};
		this.hunger = MAX_HUNGER/2;
		this.purse = 500;
		this.bookmarks = {};
		this.numSteps = 0;
		this.skill = {};
		this.detected = true;
		this.ce = null; //current enemy
		this.dl = 0; //dungeon level
		this.pdl = 0; //portal dungeon level
		this.cdl = 0; //current dungeon level
		this.cui = {}; //current unique item
		this.cue = {}; //current unique enemy
		this.eqt = {} //equipment temp
		this.cl = option.language.user //current language
		this.lethe = 0;
		this.turn = 1;
		this.done = false;
		this.portal = new Position;
		this.numBoxes = 1;
		this.boxes = {};
		for(let i=1;i<=this.numBoxes;i++)
			this.boxes[i] = null;
		this.initBookmarks();
	}
	
	init(){
		this.getStarterItems();
		this.calcAll();
		this.hp = this.hpMax;
		this.mp = this.mpMax;
		this.energy = this.spd;
	}
	
	initBookmarks(){
		for(let i=0;i<MAX_BOOKMARK_NUM;i++)
			this.bookmarks[i] = null;
	}
	
	move(keyCodeDr,dr){
		if(this.confused)
			dr = DR[rndInt(DR.length-1)];
		else if(keyCodeDr)
			dr = getDirection(keyCodeDr);
		let loc = coords[this.x+dr.x][this.y+dr.y];
		if(loc.door===CLOSE&&!loc.hidden){
			loc.openOrCloseDoor();
			rogue.done= true;
		} else if(loc.fighter){
			if(this.haveMissile()){
				ci = this.getAmmo(this.equipment['main'].throwType);
				if(ci){
					flag.arrow = true;
					let arrow = this.timesMissile===1? 'an arrow':'arrows'
					message.draw(rogue.cl===ENG?
					`You shot ${arrow}`
					:`矢を放った`);
					this.aim(keyCodeDr);
				}else{
					message.draw(message.get(M_DONT_HAVE_AMMO));
					return null;
				}
			} else
				this.attack(loc.fighter);
			rogue.done= true;
		} else if(this.stuckTrap){
			message.draw(message.get(M_STUCK));
			rogue.done= true;
			if(flag.dash)　flag.dash = false;
		} else if(!loc.wall){
			this.drawOrErase(false,true);
			this.x += dr.x;
			this.y += dr.y;
			loc.traces = ++this.numSteps;
			this.drawOrErase(true,true);
			if(!loc.getInfor()){
				rogue.done = true;
				this.cost -= this.timesMove;
			}			
		} else
			return;
	}
	
	rest(){
		this.decreaseEnergy();
		queue.moveAll();
		if(flag.rest&&(this.hp!==this.hpMax||this.mp!==this.mpMax))
			setTimeout(this.rest.bind(this),WAIT_TIME);
		else {
			flag.rest = false;
			map.draw(rogue.x,rogue.y);
		}
	}
	
	dash(keyCodeDr){
		if(this.confused) return;
		let dr = getDirection(keyCodeDr);
		let loc = coords[this.x+dr.x][this.y+dr.y];
		if(loc.door===CLOSE&&!loc.hidden){
			loc.openOrCloseDoor();
			rogue.done = true;
			return;
		}
		flag.dash= true;
		let drLUp = getNextDirection(dr,true);
		let drRUp = getNextDirection(dr);
		var count = 0;
		var wallLUp = false;
		var wallRUp = false;
		if(coords[this.x+drLUp.x][this.y+drLUp.y].wall)
			wallLUp = true;
		if(coords[this.x+drRUp.x][this.y+drRUp.y].wall)
			wallRUp = true;
		this.dashLoop(dr,drLUp,drRUp,wallLUp,wallRUp,count);
	}
	
	dashLoop(dr,drLUp,drRUp,wallLUp,wallRUp,count){
		let loc = coords[this.x+dr.x][this.y+dr.y];
		if(!loc.wall&&loc.door!==CLOSE
		&&!flag.died){
			if(this.move(null,dr)===null) flag.dash= false;
			this.decreaseEnergy();
			queue.moveAll();
			if(flag.dash) this.dashCheck(dr,drLUp,drRUp,wallLUp,wallRUp,count);
		} else
			flag.dash= false;
	}
	
	dashCheck(dr,drLUp,drRUp,wallLUp,wallRUp,count){
		var found = false;
		if(wallLUp&&!wallRUp){
			if(!coords[this.x+drLUp.x][this.y+drLUp.y].wall
			||coords[this.x+drRUp.x][this.y+drRUp.y].wall)
				found = true;
		} else if(!wallLUp&&wallRUp){
			if(!coords[this.x+drRUp.x][this.y+drRUp.y].wall
			||coords[this.x+drLUp.x][this.y+drLUp.y].wall)
				found = true;
		} else if(wallLUp&&wallRUp){
			if(count){
				dr =coords[this.x+dr.x][this.y+dr.y].wall? 
					this.dashSearch(dr,drLUp,drRUp):null;
				if(!dr)
					found = true;
				else{
					count = 0;
					drLUp = getNextDirection(dr,true);
					drRUp = getNextDirection(dr);
				}
			}
			if(!coords[this.x+drLUp.x][this.y+drLUp.y].wall
			||!coords[this.x+drRUp.x][this.y+drRUp.y].wall)
				count++;
		} else{
			if(coords[this.x+drLUp.x][this.y+drLUp.y].wall
			||coords[this.x+drRUp.x][this.y+drRUp.y].wall)
				found = true;
		}
		if(found)
			flag.dash = false;
		else
			setTimeout(this.dashLoop.bind(this,dr,drLUp,drRUp,wallLUp,wallRUp,count),WAIT_TIME);
	}
	
	dashSearch(dr,drLUp,drRUp){
		let key1 = -1;
		let keyDia = -1;
		for(let key in DR){
			if(!coords[this.x+DR[key].x][this.y+DR[key].y].wall
			&&-DR[key].x!==dr.x&&-DR[key].y!==dr.y){
				if(key<4){
					if(key1!==-1)
						return;
					else
						key1 = key;
				} else{
					if(keyDia!==-1)
						return;
					else
						keyDia = key;
				}
			}
		}
		return keyDia!==-1&&DR[keyDia].x!==DR[key1].x
		&&DR[keyDia].y!==DR[key1].y? null:DR[key1];
	}
	
	searchDoor(){
		let tempX,tempY;
		let count = 0;
		for(let key in DR){
			let [x, y] = [this.x+DR[key].x, this.y+DR[key].y]
			let loc = coords[x][y];
			if(loc.door===(flag.openDoor? CLOSE:OPEN)
			&&!loc.fighter&&!loc.item['a']&&!loc.hidden){
				if(!count) [tempX, tempY] = [x, y];
				count++;
			}
		}
		if(count===1){
			coords[tempX][tempY].openOrCloseDoor();
			this.done = true;
		}
		return count;
	}
	
	openOrCloseDoor(keyCode){
		let dr = getDirection(keyCode);
		if(!dr) return;
		let loc = coords[this.x+dr.x][this.y+dr.y];
		if(loc.door===(flag.openDoor? CLOSE:OPEN)
		&&!loc.item['a']&&!loc.fighter){
			loc.openOrCloseDoor();
			this.done = true;
			flag.openDoor = flag.closeDoor = false;
			flag.regular = true;
			inventory.clear();
		}
	}
	
	searchHiddenObject(){
		for(let i=this.x-1;i<=this.x+1;i++){
			for(let j=this.y-1;j<=this.y+1;j++)
				coords[i][j].findHiddenObject();
		}
		rogue.done = true;
	}
	
	attackStationary(keyCodeDr){
		if(this.bookmarks[0]!==null)
			this.castBookmarkedSkill(48,keyCodeDr);
		else if(this.haveMissile()){
			ci = this.getAmmo(this.equipment['main'].throwType);
			if(ci){
				flag.arrow = true;
				let arrow = this.timesMissile===1? 'an arrow':'arrows';
				message.draw(rogue.cl===ENG?
				`You shot ${arrow}`
				:`矢を放った`);
				this.aim(keyCodeDr);
			} else
				message.draw(message.get(M_DONT_HAVE_AMMO));
		} else{ 
			let dr = getDirection(keyCodeDr);
			let loc = coords[this.x+dr.x][this.y+dr.y];
			if(loc.fighter)
				this.attack(loc.fighter);
			else if(loc.wall)
				this.dig(loc);
			rogue.done= true;
		}
	}
	
	died(){
		inventory.clear();
		rogue.drawStats();
		if(this.blinded||this.hallucinated){
			this.blinded = 0;
			if(this.hallucinated){
				this.hallucinated = 0;
				hallucinate.all(true);
			} else
				map.redraw(rogue.x,rogue.y);
		}
		map.draw(rogue.x,rogue.y);
		audio.stop(audio.curTrack);
		audio.playMusic('gameover');
		message.draw(message.get(M_DIED));
		rogue.done = false;
		initFlag();
		flag.regular = false;
		flag.wait = false;
		flag.died = true;
		data.delete('Player');
	}
	
	drawStats(){
		let j = -2.5;
		if(rogue.ce) statistics.drawEnemyBar(rogue.ce);
		this.calcCondition(false,true);
		statistics.clear();
		this.drawBoxes();
		statistics.drawCurrentEnemy();
		ctxStats.save();
		ctxStats.fillStyle = this.getConditionColor();
		ctxStats.fillRect(0,canvas.height-SS*fs,(this.hp/this.hpMax)*canvas.width/2,3);
		ctxStats.fillStyle = BLUE;
		ctxStats.fillRect((2-this.mp/this.mpMax)*canvas.width/2,canvas.height-SS*fs,canvas.width/2,3);
		ctxStats.restore();
		let [level, exp, str, dex, con, int, spd] = rogue.cl===ENG?
			['Level','Exp','Str','Dex','Con','Int','Spd']
			:['レベル','経験値','筋','器','耐','知','速'];
		statistics.draw(`${level} ${this.lvl}`,0.5,j,this.lvl<this.lvlMax? YELLOW:ud);
		statistics.draw(`${exp} ${this.exp}`,5,j,this.exp<this.expMax? YELLOW:ud,this.expBuff? C_BUFF:ud,ud,ud,6);
		statistics.draw(`$ ${this.purse}`,11.5,j,ud,ud,ud,ud,5);
		statistics.draw(`HP ${this.hp}/${this.hpMax}`,17,j,this.hp<=0? RED:ud);
		statistics.draw(`MP ${this.mp}/${this.mpMax}`,24.5,j,this.mp<=0? RED:ud,ud,ud,ud,6);
		let color = ud; //
		if(this.str<this.strMax)
			color = YELLOW;
		else if(this.strSus)
			color = LIME;
		else
			color = ud;
		statistics.draw(`${str} ${this.str}`,31,j,color,ud,ud,ud,3);
		if(this.dex<this.dexMax)
			color = YELLOW;
		else if(this.dexSus)
			color = LIME;
		else
			color = ud;
		statistics.draw(`${dex} ${this.dex}`,34.5,j,color,ud,ud,ud,3);
		if(this.con<this.conMax)
			color = YELLOW;
		else if(this.conSus)
			color = LIME;
		else
			color = ud;
		statistics.draw(`${con} ${this.con}`,38,j,color,ud,ud,ud,3);
		if(this.int<this.intMax)
			color = YELLOW;
		else if(this.intSus)
			color = LIME;
		else
			color = ud;
		statistics.draw(`${int} ${this.int}`,41.5,j,color,ud,ud,ud,3);
		statistics.draw(`${spd} ${this.spd}`,45,j,this.slowed? RED:ud,this.speeded? C_BUFF:ud,ud,ud,2.5);
		let msg;
		if(!rogue.cdl)
			msg = rogue.cl===ENG? 'Limbo':'辺獄';
		else{
			if(rogue.cdl>=1&&rogue.cdl<=33){
				msg = rogue.cl===ENG? 'Hell B':'地獄 地下';
				msg += rogue.cdl;
			} else if(rogue.cdl>=34&&rogue.cdl<=66){
				msg = rogue.cl===ENG? 'Purgatory':'煉獄';
				msg += rogue.cdl-33;
			} else if(rogue.cdl>=67&&rogue.cdl<=99){
				msg = rogue.cl===ENG? 'Heaven':'天国';
				msg += rogue.cdl-66;
			}
		}
		statistics.draw(msg,IN_WIDTH+0.5,j+1,ud,ud,ud,true);
	}
	
	drawBoxes(){
		let x = 1;
		let y = canvas.height-fs;
		for(let i=1;i<=this.numBoxes;i++){
			let item = this.boxes[i];
			ctxStats.save();
			ctxStats.textAlign = 'center';
			ctxStats.fillStyle = GRAY;
			ctxStats.strokeRect((x+i*1.4-1)*fs,y-0.5*fs,fs,fs);
			if(!item)
				ctxStats.fillText(i,(x+i*1.4-0.5)*fs,y);
			else{
				if(item.shadow) ctxStats.shadowColor = item.shadow;
				if(item.stroke){
					ctxStats.strokeStyle = item.stroke;
					ctxStats.strokeText(item.symbol,(x+i*1.4-0.5)*fs,y+0.25*fs);
				}
				ctxStats.fillStyle = item.color;
				ctxStats.fillText(item.symbol,(x+i*1.4-0.5)*fs,y);
				ctxStats.font = fs/2+'px Arial';
				ctxStats.fillStyle = WHITE;
				ctxStats.shadowColor = SHADOW;
				if(item.stroke) ctxStats.strokeText(item.quantity,(x+i*1.4)*fs,y+0.6*fs);
				ctxStats.fillText(item.quantity,(x+i*1.4)*fs,y+0.5*fs);
				if(item.charges>=0&&item.identified)
					ctxStats.fillText(item.charges,(x+i*1.4)*fs,y);
			}
			ctxStats.restore();
		}
	}
	
	getStartPointInTown(){
		if(!rogue.cdl&&rogue.dl)
			[this.x, this.y] = [POSITION.hell.x, POSITION.hell.y];
		else
			[this.x, this.y] = [POSITION.start.x, POSITION.start.y];
	}
		
	putDown(town){
		town? this.getStartPointInTown():this.getPositionRandomly(true);
		coords[this.x][this.y].traces = ++this.numSteps;
		this.drawOrErase(true);
		this.drawStats();
		queue.push(this);
	}
	
	downOrUpStairs(keyCode,trap){
		let loc = coords[this.x][this.y];
		if(!trap&&!loc.stairs||loc.hidden) return;
		if(trap||loc.stairs.id===DOWN&&keyCode===190){
			if(option.autosave.user) data.save();
			clearLevel();
			if(rogue.cdl===33){
				rogue.cdl = 0;
				creation.town();
			} else{
				if(rogue.dl<++rogue.cdl) rogue.dl = rogue.cdl;
				creation.dungeon();
			}
		} else if(loc.stairs.id===UP&&keyCode===188){
			if(option.autosave.user) data.save();
			clearLevel();
			!--rogue.cdl? creation.town():creation.dungeon();
		}
	}
	
	enterPortal(){
		if(!this.cdl){
			if(option.autosave.user) data.save();
			clearLevel()
			this.cdl = this.pdl;
			creation.dungeon();
		} else{
			this.pdl = this.cdl;
			clearLevel()
			creation.town();
			this.cdl = 0;
			let portal = new Portal(enter[PORTAL]);
			portal.init(LOCATION,this.x,this.y);
		}
		audio.playSound('tplevel');
	}
	
	enterBuild(build){
		flag.regular = false;
		map.draw(rogue.x,rogue.y);
		if(build.stash){
			flag.stash = true;
			build.page = 1;
			this.showInventory(P_PACK);
			this.showInventory(P_STASH);
			message.draw(message.get(M_STASH),true);
			return;
		} else if(build.shop){
			flag.shop = true;
			cn = 1;
			flag.gamble = !!build.gamble;
			this.showInventory(P_PACK);
			if(!build.list['a']) createShopItem(build);
			this.showInventory(P_SHOP);
			message.draw(message.get(M_SHOP),true);
		} else if(build.cure){
			flag.cure = true;
			inventory.show(build.list,RIGHT);
			message.draw(message.get(M_CURE),true);
		} else if(build.blacksmith){
			flag.blacksmith = true;
			this.equipmentList();
			this.showInventory(P_PACK);
			message.draw(message.get(M_BLACKSMITH),true);
		}
		let nameEnter = build.name[rogue.cl];
		message.draw(rogue.cl===ENG?
		`You entered The ${nameEnter}`
		:`${nameEnter}に入った`);
	}
	
	itemAuto(list){
		let found;
		for(let key in list){
			do{	found = false;
				let item = list[key];
				if(!item) break;
				if(item.type==='coin'
				||item.type==='ammo'&&this.equipment['main']
				&&this.equipment['main'].throwType===item.throwType){
					flag.grab = true;
					found = this.grabItem(null,key)!==null;
					continue;
				}
				if(!item.identify&&option['auto-identify'].user)
					this.checkItem(item,IDENTIFY);
				let charged;
				if(item.type==='scroll'&&option['auto-charge'].user)
					charged = this.checkItem(item,CHARGE);
				if(charged||option['auto-destroy'].user){
					found = true
					let name = item.getName();
					deleteAndSortItem(list,key);	
					delete Item.list[item.id];
					if(!charged){
						message.draw(rogue.cl===ENG?
						`Destroyed ${name}`
						:`${name}を破壊した`);
					} else{
						message.draw(rogue.cl===ENG?
						`Charged ${name}`
						:`${name}を充填した`);
					}
				}
			} while(found);
		}
	}
	
	grabItem(keyCode,a){
		let loc = coords[this.x][this.y];
		if(flag.grab){
			if(keyCode) a = getAlphabet(keyCode);
			if(!a||!loc.item[a]) return;
			let item = loc.item[a];
			item = this.inventoryOut(item,item.quantity);
			inventory.clear();
			flag.grab = false;
			flag.regular = true;
			if(item.type!=='coin'&&!this.packAdd(item)){
				message.draw(message.get(M_CANT_CARRY));
				return null;
			} else{
				let name = item.getName();
				if(item.type==='coin') this.purse += item.price;
				message.draw(rogue.cl===ENG?
				`Picked up ${name}`
				:`${name}を拾った`);
				audio.playSound('grab');
				rogue.done= true;
			}
		} else{
			if(!loc.item['a']) return;
			flag.grab = true;
			if(!loc.item['b'])
				this.grabItem(65);
			else{
				this.showInventory(P_FLOOR);
				message.draw(message.get(M_GRAB),true);
				flag.regular = false;
			}
		}
	}
	
	drop(keyCode){
		let item;
		if(!flag.number){
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a);
			if(!item||item.place===P_EQUIPMENT&&item.cursed) return;
			if(item.quantity>1){
				ci = item;
				flag.number = true;
				this.inputNumber();
				return;
			} else
				item = this.inventoryOut(item,1);
		} else{
			item = ci;
			let i = item.getQuantity(keyCode);
			item = this.inventoryOut(item,i);
			ci = null;
		}
		item.putDown(this.x,this.y,true);
		item.dropped();
		inventory.clear();
		flag.drop = false;
		flag.regular = true;
		rogue.done= true;
	}
	
	equip(keyCode){
		if(this.switchInventory(keyCode,M_EQUIP)) return;
		let a = getAlphabetOrNumber(keyCode);
		if(!a) return;
		let item = this.getItem(a,flag.floor);
		if(!item||!item.equipable) return;
		flag.floor = false;
		let parts = this.getParts(item);
		if(!parts) return;
		item = this.inventoryOut(item,1);
		item.place = P_EQUIPMENT;
		this.equipment[parts] = item;
		this.gainOrloseWeight(item,item.quantity,true);
		let name = item.getName();
		if(item.weapon){
			message.draw(rogue.cl===ENG?
			`Wielding ${name}`
			:`${name}を握った`);
		} else{
			message.draw(rogue.cl===ENG?
			`Wearing ${name}`
			:`${name}を身に付けた`);
		}
		if(item.cursed) audio.playSound('curse');
		if(this.eqt['a']){
			let item2 = this.eqt['a'];
			if(!this.packAdd(item2)) item2.dropped();
			delete this.eqt['a'];
		}
		if(item.durab) this.getOrLooseStats(item,true);
		this.calcAll();
		inventory.clear();
		this.equipmentList();
		flag.equip = false;
		flag.regular = true;
		rogue.done = true;
		flag.clearInv = true;
	}
	
	unequip(keyCode){
		let a = getAlphabet(keyCode);
		if(!a) return;
		let item = this.equipment[BP[a]];
		if(!item) return;
		let msg;
		if(item.weapon)
			msg = rogue.cl===ENG? 'unwield':'離す';
		else
			msg = rogue.cl===ENG? 'take off':'外す';
		if(item.cursed){
			message.draw(rogue.cl===ENG?
			`You can't ${msg} the cursed item`
			:`呪われたアイテムを${msg}ことが出来ない`);
			return null;
		}
		let name = item.getName();
		if(rogue.cl===ENG){
			msg = getUpperCase(msg);
			message.draw(`${msg} ${name}`);
		} else{
			msg = msg.charAt(0);
			message.draw(`${name}を${msg}した`);
		}
		this.equipment[BP[a]] = null;
		this.gainOrloseWeight(item);
		if(flag.equip)
			this.eqt['a'] = item;
		else if(!this.packAdd(item))
			item.dropped();
		if(item.durab) this.getOrLooseStats(item,false);
		rogue.done = true;
		inventory.clear();
		flag.unequip = false;
		flag.regular = true;
		if(!flag.equip){
			this.calcAll();
			this.equipmentList();
			flag.clearInv = true;
		}
	}
	
	isNaked(){
		for(let key in BP){
			if(this.equipment[BP[key]]) return false;
		}
		return true;
	}
	
	fuel(keyCode,boxItem){
		if(this.switchInventory(keyCode,M_FUEL,true)) return;
		let item;
		if(boxItem)
			item = boxItem;
		else{
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
			if(!item||item.type!=='light'&&item.type!=='oil') return;
		}
		let light = this.equipment['light']; 
		if(light.torch&&!item.torch||!light.torch&&item.torch) return;
		flag.floor = false;
		if(!light.duration&&item.duration&&light.durab){
			this.lighten += light.lighten;
			this.lightenOrDarken('Lighten');
		}
		light.duration += item.duration;
		if(light.duration>light.durationMax) light.duration = light.durationMax;
		if(item.mod!==NORMAL){
			item.duration = 0;
		} else
			this.deleteItem(item,1);
		let name = light.getName();
		message.draw(rogue.cl===ENG?
		`Fueled ${name}`
		:`${name}を補給した`);
		rogue.done= true;
		inventory.clear();
		flag.fuel = false;
		flag.regular = true;
	}
			
	eat(keyCode,boxItem){
		if(this.switchInventory(keyCode,M_EAT)) return;
		let item;
		if(boxItem)
			item = boxItem;
		else{
			var a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
			if(!item||item.type!=='food') return;
			flag.floor = false;
		}
		let name = item.getName(true,true);
		message.draw(rogue.cl===ENG?
		`Ate ${name}`
		:`${name}を食べた`);
		this.haveCast(item.nameSkill,item.skillLvl,this);
		this.deleteItem(item,1);
		if(!boxItem){
			inventory.clear();
			flag.eat = false;
			flag.regular = true;
		}
		rogue.done= true;
	}
	
	quaffPotion(keyCode,boxItem){
		if(this.switchInventory(keyCode,M_QUAFF)) return;
		let item;
		if(boxItem)
			item = boxItem;
		else{
			var a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
			if(!item||item.type!=='potion') return;
			flag.floor = false;
		}
		if(!item.identified){
			item.identifyAll();
			if(item.place===P_PACK) var sort = true;
		}
		let name = item.getName(true,true);
		message.draw(rogue.cl===ENG?
		`Quaffed ${name}`
		:`${name}を飲んだ`);
		this.haveCast(item.nameSkill,item.skillLvl,this);
		this.hunger += HUNGER_POTION;
		if(this.hunger>MAX_HUNGER) this.hunger = MAX_HUNGER;
		this.deleteItem(item,1);
		if(!boxItem){
			if(sort&&item.quantity>0) inventory.sort(a,this.pack);
			inventory.clear();
			flag.quaff = false;
			flag.regular = true;
		}
		rogue.done= true;
	}
	
	zap(keyCode,boxItem){
		if(this.switchInventory(keyCode,M_ZAP)) return;
		let item;
		if(boxItem){
			flag.zap = true;
			flag.regular = false;
			item = boxItem;
		} else{
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
			if(!item||item.type!=='wand') return;
		}
		inventory.clear();
		ci = item;
		flag.floor = false;
		message.draw(message.get(M_ZAP_DIR)+message.get(M_TO_EXAMINE),true);
		flag.aim = true;
		this.examinePlot(true);
	}
	
	haveZapped(item,found){
		if(found){
			let itemT = itemTab[item.type].get(item.tabId);
			if(!itemT.identified){
				itemT.identified = true;
				searchItemToIdentifiy.main(item.nameReal[ENG],item.type);
			}
		}
		let name = item.getName(false,1); 
		message.draw(rogue.cl===ENG?
		`Zapped ${name}`
		:`${name}を振った`);
		this.reduceItemCharge(item);
		flag.zap = false;
	}
	
	read(keyCode,boxItem){
		if(this.switchInventory(keyCode,M_READ)) return;
		let item;
		if(boxItem)
			item = boxItem;
		else{
			var a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
			if(!item||item.type!=='scroll'&&!item.chargeBook) return;
		}
		if(item.chargeBook&&!item.charges) return;
		flag.floor = false;
		if(!item.identified){
			item.identifyAll();
			if(item.place===P_PACK) inventory.sort(a,this.pack);
		}
		let name = item.getName(true,1);
		message.draw(rogue.cl===ENG?
		`Read ${name}`
		:`${name}を読んだ`);
		flag.read = false;
		flag.scroll = true;
		if(skillMap.get(item.nameSkill).range===0){
			ci = item;
			if(!boxItem){
				inventory.clear();
				flag.aim = true;
				this.aim(88); //examine
				return;
			} else
				this.aim(null,this.x,this.y);
		} else if(this.haveCast(item.nameSkill,item.skillLvl,this)===null){
			ci = item;
			return;
		}
		this.deleteItem(item,1);
		inventory.clear();
		flag.regular = true;
		rogue.done= true;
	}
	
	identify(keyCode,item){
		if(this.switchInventory(keyCode,M_IDENTIFY,true)) return;
		if(keyCode!==null){
			var a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			item = this.getItem(a,flag.floor);
		}
		if(!item||item.identified) return;
		flag.floor = false
		if(item.type==='wand'&&!itemTab[item.type].get(item.tabId).identified
		||item.type==='potion'||item.type==='scroll')
			item.identifyAll();
		else{
			item.identified = true;
			item.changeNameAndPrice();
		}
		let name = item.getName();
		message.draw(rogue.cl===ENG?
		`Identified ${name}`
		:`${name}を判別した`);
		if(keyCode){
			inventory.clear();
			this.showInventory(item.place,a);
			item.investigate(item.place===P_EQUIPMENT||item.place===P_BOX? RIGHT:LEFT);
			if(item.place===P_PACK) inventory.sort(a,this.pack);
			rogue.done= true;
			flag.identify = false;
			flag.regular = true;
			flag.clearInv = true;
		}
		if(flag.skill){
			this.consumeMana(skillMap.get(IDENTIFY));
			flag.skill = false;
		} else if(flag.scroll)
			this.deleteItem(ci,1);
	}
	
	repairAll(forAmount=''){
		let found;
		for(let key in this.equipment){
			let item = this.equipment[key];
			if(item&&item.durab<item.durabMax){
				this.repairOne(item,true);
				found = true;
			}
		}
		if(found){
			message.draw(rogue.cl===ENG?
			`Repaired your equipment${forAmount}`
			:`装備を${forAmount}修復した`);
		}
	}
	
	getDurabPriceAll(){
		let priceTotal = 0;
		for(let key in this.equipment){
			let item = this.equipment[key];
			if(item&&item.durab<item.durabMax)
				priceTotal += item.getDurabPrice();
		}
		return priceTotal;
	}
	
	repair(keyCode){
		let blacksmithAll = flag.blacksmith&keyCode===13; //Enter
		if(!blacksmithAll){
			if(!flag.blacksmith&&this.switchInventory(keyCode,M_REPAIR,true)) return;
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			var item = this.getItem(a,flag.floor);
			if(!item||!item.equipable||item.durab===item.durabMax) return;
			flag.floor = false;
		}
		let forAmount = '';
		if(flag.blacksmith){
			var price = blacksmithAll? this.getDurabPriceAll():item.getDurabPrice();
			if(!price) return;
			if(this.purse<price){
				message.draw(message.get(M_DONT_HAVE_MONEY));
				return;
			}
			forAmount = rogue.cl===ENG? ` for $${price}`:`$${price}で`;
			if(blacksmithAll) this.repairAll(forAmount);
		}
		if(!blacksmithAll){
			this.repairOne(item,isShift);
			let name = item.getName();
			message.draw(rogue.cl===ENG?
			`Repaired ${name}${forAmount}`
			:`${name}を${forAmount}修復した`);
		}
		inventory.clear();
		if(flag.blacksmith){
			this.purse -= price;
			this.drawStats();
			this.equipmentList();
			this.showInventory(P_PACK);
			message.draw(message.get(M_BLACKSMITH),true);
			return;
		}
		if(flag.skill){
			this.consumeMana(skillMap.get(RESTORE_DURABILITY));
			flag.skill = false;
		} else if(flag.scroll)
			this.deleteItem(ci,1);
		rogue.done= true;
		flag.repair = false;
		flag.regular = true;
		flag.clearInv = true;
	}
	
	repairOne(item,equip){
		if(item.cursed) item.uncurse();
		if(!item.durab&&equip){
			this.getOrLooseStats(item,true);
			this.calcAll();
		}
		item.durab = item.durabMax;
	}
	
	disintegrate(keyCode){
		if(keyCode<65||keyCode>90) return;
		let skill = skillMap.get(DISINTEGRATION);
		let lvl;
		if(flag.skill)
			lvl = cs.lvl+this.getSkillBoost(skill);
		else
			lvl = ci.skillLvl;
		let radius = this.calcSkillValue(skill,lvl);
		let symbol = EA[keyCode-65];
		if(isShift) symbol = symbol.toUpperCase()
		circleSearch.main(this.x,this.y,DISINTEGRATION,radius,symbol);
		inventory.clear();
		if(flag.skill){
			this.consumeMana(skill);
			flag.skill = false;
		} else if(flag.scroll)
			this.deleteItem(ci,1);
		flag.disint = false;
		flag.regular = true;
		rogue.done = true;
	}
	
	wormhole(x,y){
		let skill = skillMap.get(WORMHOLE);
		let lvl = cs.lvl+this.getSkillBoost(skill); 
		let radiusSq = this.calcSkillValue(skill,lvl)**2;
		if(!coords[x][y].found||coords[x][y].wall
		||coords[x][y].door===CLOSE
		||distanceSq(x,y,this.x,this.y)>radiusSq){
			message.draw(message.get(M_CANT_TELE));
			return;
		}
		this.teleport(false,false,x,y);
		this.consumeMana(skill);
		flag.skill = false;
		flag.wormhole = false;
		flag.examine = false;
		flag.regular = true;
		rogue.done = true;
		inventory.clear();
		statistics.clearEnemyBar();
		ctxCur.clearRect(0,0,canvas.width,canvas.height);
	}
	
	investigateOne(keyCode){
		if(this.switchInventory(keyCode,M_INVESTIGATE,true)) return;
		let a = getAlphabetOrNumber(keyCode);
		if(!a) return;
		let item = this.getItem(a,flag.floor);
		if(!item||!item.identified) return;
		inventory.clear();
		this.showInventory(item.place);
		item.investigate(item.place===P_EQUIPMENT||item.place===P_BOX? RIGHT:LEFT);
		message.draw(message.get(M_INVESTIGATE)+message.get(flag.floor? M_PACK:M_FLOOR),true);
	}
	
	getSkillInfo(skill,lvl,item){
		let msg = skill.desc[rogue.cl];
		if(skill.rate){
			if(!item) flag.skill = true;
			let value = this.calcSkillValue(skill,lvl,ud,true);
			if(skill.limit&&value>skill.limit) value = skill.limit;
			if(!isFinite(skill.base)) value = (rogue.cl===ENG? 'about ':'約')+value;
			if(skill.perc){
				if(value>0) value = '+'+value;
				value += '%';
			}
			let replace = skill.radiusRate? '{radiusRate}':'{value}';
			msg = msg.replace(replace,value);
			flag.skill = false;
		}
		if(skill.radius) msg = msg.replace('{radius}',skill.radius);
		if(skill.durBase){
			let duration = rogue.cl===ENG? 'about ':'約';
			duration += this.calcSkillDur(skill,lvl,true);
			msg = msg.replace('{dur}',duration);
		}
		return msg;
	}
	
	synthesize(keyCode){
		let l = Object.keys(this.cube).length;
		if(keyCode===13&&l>=1){ //Enter
			this.tryToSynthesize();
			return;
		}
		if(this.switchInventory(keyCode,M_SYNTHESIZE)) return;
		let a = getAlphabetOrNumber(keyCode);
		if(!a||!isShift&&l===MAX_CUBE_COUNT){
			if(a) message.draw(message.get(M_CANT_ADD));
			return;
		}
		let item = isShift? this.cube[a]:this.getItem(a,flag.floor);
		if(!item||item.alchemy) return;
		if(isShift){
			this.returnItem(item,this.cubeIndex[a])
			deleteAndSortItem(this.cube,a);
			deleteAndSortItem(this.cubeIndex,a);
		} else{
			let quantity = item.type==='scroll'? item.quantity:1;
			this.cube[EA[l]] = this.inventoryOut(item,quantity);
			this.cubeIndex[EA[l]] = a;
		}
		inventory.clear();
		if(item.place===P_BOX) this.drawStats();
		this.showInventory(flag.floor? P_FLOOR:P_PACK);
		this.showInventory(P_CUBE);
		message.draw(message.get(M_SYNTHESIZE)+message.get(flag.floor? M_PACK:M_FLOOR),true);
	}
	
	tryToSynthesize(){
		let [a,f1,f2,f3,f4a,f4b,f5,f5b,f5c,f6a,f6b,f7a,f7b,f8,f8b] = 
			[0, 0, 0, 0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0,  0];
		let l = Object.keys(this.cube).length;
		for(let i=0;i<l;i++){
			let item = this.cube[EA[i]];
			if(item.equipable&&item.embeddedNum<item.embeddedMax){
				a = EA[i];
				f8++;
			}
			if(item.type==='potion'&&item.nameSkill===HEAL)
				f1++;
			else if(item.type==='wand'){
				for(let j=i+1;j<l;j++){
					let item2 = this.cube[EA[j]];
					if(item2.type==='wand'&&item2.tabId===item.tabId){
						f2++;
						break;
					}
				}
			} else if(item.type==='gem'){
				f3++;
				f8b++;
			} else if(item.type==='material'){
				f8b++;
			} else if(item.nameReal[ENG]==='Medusa\'s Head')
				f4a++;
			else if(item.type==='shield'
			&&item.mod===NORMAL){
				f4b++;
				if(!a) a = EA[i];
			} else if(item.type==='light'){
				item.torch? f5++:f5b++;
				if(!a) a = EA[i];
			} else if(item.type==='oil')
				f5c++;
			else if(item.type==='book'){
				if(item.nameReal[ENG]==='Blank Paper')
					f6a = item;
				else if(item.chargeBook&&(!f7a||f7a===item.nameSkill)){
					f7a = item.nameSkill;
					f7b++;
					if(!a) a = EA[i];
				}
			}else if(item.type==='scroll'){
				f6b = item;
				if(!f7a||f7a===item.nameSkill){
					f7a = item.nameSkill;
					f7b++;
				}
			}
		}
		let name;
		if(f1===3&&l===3){
			this.createItemIntoPack(1,'potion',P_EXTRA_HEALING,1);
			name = rogue.cl===ENG? 'Potion of Extra Healing':'特大回復の薬';
		} else if(f2>=1&&l===f2+1){ //wand
			let item = this.cube['a'];
			for(let key in this.cube){
				if(key==='a') continue;
				item.charges += this.cube[key].charges;
			}
			if(item.identified){
				item.identified = false;
				item.name['a'] = item.nameReal['a'];
				item.name['b'] = item.nameReal['b'];
			}
			this.packAdd(item);
			name = item.getName();
		} else if(f3>=1&&l===f3){ //coin
			let amount = 0;
			for(let key in this.cube){
				rogue.purse += this.cube[key].price;
				amount += this.cube[key].price;
			}
			name = '$'+amount;
		} else if(f4a===1&&f4b===1&&l===2){ //aegis
			let item = this.cube[a];
			item.getUnique(itemUniqueMap['shield'].get(AEGIS));
			item.identified = true;
			item.calcAcOne();
			item.changeNameAndPrice();
			item.weight += 1;
			this.packAdd(item);
			name = item.getName();
		} else if(f5===l||f5b&&f5b+f5c===l){ //light
			let item = this.cube[a];
			for(let key in this.cube){
				if(key===a) continue;
				let item2 = this.cube[key];
				item.duration += item2.duration;
				if(item2.type==='light'&&item2.mod!==NORMAL){
					item2.duration = 0;
					this.packAdd(item2);
				}
			}
			if(item.duration>item.durationMax) item.duration = item.durationMax;
			this.packAdd(item);
			name = item.getName()
		} else if(f6a&&f6b&&l===2){//make charge book
			let [book, scroll] = [f6a, f6b];
			book.chargeBook = true;
			book.name['a'] = book.nameReal['a'] = scroll.nameReal['a'];
			book.name['b'] = book.nameReal['b'] = scroll.nameReal['b'];
			book.nameSkill = scroll.nameSkill;
			book.skillLvl = scroll.skillLvl;
			book.charges = scroll.quantity;
			book.tabId = 100+scroll.tabId;
			this.packAdd(book);
			name = book.getName()
		} else if(l>=2&&l===f7b&&a){//charge book
			let item = this.cube[a];
			for(let key in this.cube){
				if(key===a) continue;
				let item2 = this.cube[key];
				item.charges += item2.quantity*(item2.chargeBook? item2.charges:1);
			}
			this.packAdd(item);
			name = item.getName();
		} else if(l>=2&&f8===1&&l===f8+f8b
		&&f8b===this.cube[a].embeddedMax-this.cube[a].embeddedNum){//embed
			let item = this.cube[a];
			let found;
			for(let key in this.cube){
				if(key===a) continue;
				let item2 = this.cube[key];
				if(item2.type==='material'&&item2.material!==item.material)
					continue;
				mergeMod(item,item2.modList,ud,ud,ud,true);
				item.embeddedNum++;
				item.embeddedList.push(item2);
				found = true;
			}
			if(found){
				if(item.weapon) 
					item.calcDmgOne();
				else{
					item.dmgDiceNum = item.dmgDiceSides = ud;
					if(item.armor) item.calcAcOne();
				}
				this.packAdd(item);
				name = item.getName();
			}
		}
		if(name){
			this.cube = {};
			this.cubeIndex = {};
			message.draw(rogue.cl===ENG?
			`Synthesized ${name}`
			:`${name}を合成した`);
		} else{
			this.returnCubeItem()
			message.draw(message.get(M_NOTHING_HAPPENED));
		}
		inventory.clear();
		flag.synthesize = false;
		flag.regular = true;
		rogue.done = true;
	}
	
	returnCubeItem(){
		for(let key in this.cube)
			this.returnItem(this.cube[key],this.cubeIndex[key]);
		this.cube = {};
		this.cubeIndex = {};
		this.drawStats();
	}
	
	returnItem(item,a){
		switch(item.place){
			case P_PACK:
				this.packAdd(item);
				break;
			case P_BOX:
				this.boxAdd(item,a);
				break;
			case P_FLOOR:
				item.putDown(this.x,this.y,true);
				break;
		}
	}
	
	packOrUnpack(keyCode){
		if(flag.pack!==P_PACK){
			if(this.switchInventory(keyCode,M_PACK_OR_UNPACK)||isShift) return;
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			let item = this.getItem(a,flag.floor);
			if(!item) return;
			if(item.place===P_BOX){
				item = this.inventoryOut(item,item.quantity);
				if(!this.packAdd(item)) item.dropped();
			} else{
				ci = item;
				flag.pack = P_PACK;
				if(Object.keys(this.boxes).length===1)
					this.packOrUnpack(49); //1
				else
					message.draw(message.get(M_PACK_INTO),true);
				return;
			}
		} else{
			let a = getNumber(keyCode);
			if(!a||this.boxes[a]===ud) return;
			let item = this.inventoryOut(ci,ci.quantity);
			ci = null;
			this.boxAdd(item,a);
			flag.pack = true;
		}
		inventory.clear();
		this.showInventory(flag.floor? P_FLOOR:P_PACK);
		this.showInventory(P_BOX);
		message.draw(message.get(M_PACK_OR_UNPACK)+message.get(flag.floor? M_PACK:M_FLOOR),true);
		this.drawStats();
	}
	
	useBoxItem(keyCode){
		let i = keyCode -48;
		let item = this.boxes[i];
		if(!item) return;
		if(item.type==='potion')
			this.quaffPotion(null,item);
		else if(item.type==='scroll'||item.chargeBook){
			if(this.canRead(item.chargeBook)) this.read(null,item);
		} else if(item.type==='food')
			this.eat(null,item);
		else if(item.type==='wand')
			this.zap(null,item);
		else if(item.type==='light'||item.type==='oil'){
			if(this.equipment['light']) this.fuel(null,item);
		} else if(item.type==='ammo'){
			if(this.equipment['main']
			&&this.equipment['main'].throwType===item.throwType)
			 this.autoAim(item);
		}
	}
	
	autoAim(item){
		let x,y;
		if(rogue.ce){
			[x, y] = [rogue.ce.x, rogue.ce.y];
			if(!litMapIds[x+','+y]&&(!coords[x][y].detected
			||distanceSq(x,y,this.x,this.y)>FOV_SQ)
			||!lineOfSight(this.x,this.y,x,y))
				return;
		} else{
			shadowcasting.main(this.x,this.y,FOV,'Aim');
			if(!rogue.ce) return;
			[x, y] = [rogue.ce.x, rogue.ce.y];
		}
		ci = item;
		flag.arrow = true;
		let arrow = this.timesMissile===1? 'an arrow':'arrows';
		message.draw(rogue.cl===ENG?
		`You shot ${arrow}`
		:`矢を放った`);
		this.aim(null,x,y);
	}
	
	examine(keyCode){
		if(keyCode===88){ //x
			let loc =  coords[cursol.x][cursol.y];
			if(loc.item['a']&&litMapIds[cursol.x+','+cursol.y]
			&&distanceSq(cursol.x,cursol.y,this.x,this.y)<=FOV_SQ
			&&lineOfSight(this.x,this.y,cursol.x,cursol.y)){
				inventory.show(loc.item,RIGHT,ud,P_FLOOR)
				flag.clearInv = true;
			}
			return;
		} else if(keyCode===67||keyCode===77
		||keyCode===69||keyCode===73){ //c,m,e,i
			let loc =  coords[cursol.x][cursol.y];
			let fighter = loc.fighter;
			if(fighter&&fighter.isShowing()
			&&(fighter.id===ROGUE||!rogue.hallucinated)){
				if(keyCode===67)
					fighter.investigate(MIDDLE,true);
				else if(keyCode===77)
					fighter.showSkill(fighter.skill);
				else if(keyCode===69&&wizard)
					fighter.equipmentList();
				else if(keyCode===73&&wizard)
					fighter.showInventory(P_PACK);
				flag.clearInv = true;
			}
			return;
		} else if(keyCode===84||keyCode===82){ //t,r
			let loc =  coords[cursol.x][cursol.y];
			if(flag.wormhole){
				if(keyCode===82)
					flag.wormhole = false;
				else{
					this.wormhole(cursol.x,cursol.y);
					return;
				}
			} 
			if(keyCode===82)
				rogue.ce = null;
			else if(loc.fighter&&loc.fighter.id!==ROGUE&&loc.fighter.isShowing())
				rogue.ce = loc.fighter;
			else if(!flag.aim){
				loc.getInfor();
				return;
			}
			if(flag.aim&&keyCode!==82){
				if(flag.skill||flag.scroll){
					let nameSkill = flag.skill? cs.id:ci.nameSkill;
					if(skillMap.get(nameSkill).range===0)
						[cursol.x, cursol.y] = [this.x, this.y];
				}
				this.aim(null,cursol.x,cursol.y);
			}
			this.cancelCommand();
			this.drawStats();
			return;
		}
		let offsetX = (IN_WIDTH-1)/2;
		let offsetY = IN_HEIGHT/2;
		let X = cursol.x-cursol.cX+offsetX;
		let Y = cursol.y-cursol.cY+offsetY;
		if(!keyCode){
			if(flag.aim) this.examinePlot();
			cursol.draw(X,Y);
			coords[cursol.x][cursol.y].getInfor();
			return;
		}
		let dr = getDirection(keyCode);
		if(!dr) return;
		let [x, y] = [cursol.x+dr.x, cursol.y+dr.y];
		let width = coords.length;
		let height = coords[0].length;
		if(x<0||x>=width||y<0||y>=height) return;
		let [xinc, yinc] = [dr.x, dr.y];
		if(isShift){
			xinc *= 10;
			yinc *= 10;
			if(cursol.x+xinc<0){
				xinc = -cursol.x;
				if(yinc) yinc = (yinc>0? -1:1)*xinc;
			} else if(cursol.x+xinc>=width){
				xinc = width-cursol.x-1;
				if(yinc) yinc = (yinc>0? 1:-1)*xinc;
			}
			if(cursol.y+yinc<0){
				yinc = -cursol.y;
				if(xinc) xinc = (xinc>0? -1:+1)*yinc;
			} else if(cursol.y+yinc>=height){
				yinc = height-cursol.y-1;
				if(xinc) xinc = (xinc>0? 1:-1)*yinc;
			}
		}
		cursol.clear(X,Y);
		cursol.x += xinc;
		cursol.y += yinc;
		X += xinc;
		Y += yinc;
		let found;
		if(X<0||X>=IN_WIDTH){
			cursol.cX = cursol.x;
			X = offsetX;
			if(yinc>0&&Y>offsetY&&Y<IN_HEIGHT
			||yinc<0&&Y<offsetY&&Y>=0){
				cursol.cY = cursol.y;
				Y = offsetY;
			}
			found = true;
		}
		if(Y<0||Y>=IN_HEIGHT){
			cursol.cY = cursol.y;
			Y = offsetY;
			if(Y>=IN_HEIGHT){
				cursol.cY++;
				Y++;
			}
			if(xinc>0&&X>offsetX&&X<IN_WIDTH
			||xinc<0&&X<offsetX&&X>=0){
				cursol.cX = cursol.x;
				X = offsetX;
			}
			found = true;
		}
		if(found) map.draw(cursol.cX,cursol.cY);
		if(flag.aim) this.examinePlot();
		cursol.draw(X,Y);
		coords[cursol.x][cursol.y].getInfor();
	}
	
	examinePlot(aim){
		if(aim) cursol.init();
		let [x, y] = [cursol.x, cursol.y];
		let color = WHITE;
		let skill;
		ctxCur.clearRect(0,0,canvas.width,canvas.height);
		if(flag.zap){
			if(ci.identified||itemTab[ci.type].get(ci.tabId).identified){ //
				skill = skillMap.get(ci.nameSkill);
				color = skill.color;
			}
		} else if(flag.skill||flag.scroll){
			skill = skillMap.get(flag.skill? cs.id:ci.nameSkill);
			color = skill.color;
			if(skill.range===0) [x, y] = [this.x, this.y];
		}
		lineOfSight(this.x,this.y,x,y,color,skill);
	}
	
	cancelCommand(){
		if(flag.synthesize)
			this.returnCubeItem();
		else if(flag.aim||flag.examine){
			ctxCur.clearRect(0,0,canvas.width,canvas.height);
			map.draw(rogue.x,rogue.y);
			statistics.clearEnemyBar();
			if(rogue.ce) statistics.drawEnemyBar(rogue.ce);
		} else if(flag.minimap)
			minimap.clear();
		inventory.clear();
		initFlag();
		ci = null;
	}
	
	showStats(a){
		inventory.shadow(LEFT);
		let i = 1.5;
		let j = MS+1;
		let count = 0;
		for(let key in statistics.list){
			if(a&&key!==a)
				continue;
			let stat = statistics.list[key];
			ctsInv.save();
			ctsInv.textAlign = 'center';
			ctsInv.fillText(key.toUpperCase(),i*fs,j*fs);
			ctsInv.fillText(')',i*fs+fs/3,j*fs);
			ctsInv.textAlign = 'left';
			ctsInv.fillText(stat.name[rogue.cl],(i+1)*fs,j*fs);
			ctsInv.textAlign = 'right';
			ctsInv.fillText(this[stat.term+'Max'],(i+22)*fs,(j++)*fs);
			ctsInv.restore();
			count++;
		}
		let maxNum = count; //
		ctsInv.fillText(`[${count}/${maxNum}]`,i*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.save();
		ctsInv.textAlign = 'right';
		let [statPoints, currentValues] = rogue.cl===ENG?
			['Stat Points', 'Current Values']:['ステータスポイント', '現在値'];
		ctsInv.fillText(`${statPoints} ${this.statPoints} ${currentValues}`,(i+22)*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.restore();
	}
	
	
	showSKillDetail(skill,dir){
		inventory.shadow(dir);
		let i = 0.5;
		let j = MS+1;
		ctsInv.save();
		ctsInv.shadowColor = skill.color;
		let nameEle = rogue.cl===ENG? getUpperCase(skill.element):ENJ[skill.element];
		ctsInv.fillText(skill.name[rogue.cl]+` [${nameEle}]`,i*fs,j++*fs);
		ctsInv.shadowColor = SHADOW;
		j++;
		let lvl = 0;
		let a = this.searchSkill(skill.id);
		if(a) lvl = this.skill[a].lvl;
		let boost = this.getSkillBoost(skill);
		let msg = this.getSkillInfo(skill,lvl+boost);
		ctsInv.fillText(msg,(i+1)*fs,(j++)*fs,22*fs);
		j++;
		let [base, perLvl, perSy, durBase] = rogue.cl===ENG?
		['Base', 'per Level','per Synerzy', 'Duration Base']:
		['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値'];
		let perc = skill.perc? '%':''; 
		if(skill.rate){
			let skillBase = skill.base;
			if(isFinite(skillBase)&&perc&&skillBase>0)
				skillBase = '+'+skillBase;
			else if(skill.radiusRate)
				skillBase = (rogue.cl===ENG? 'radius ':'半径')+skillBase;
			ctsInv.fillText(`${base} ${skillBase}${perc}`,(i+1)*fs,(j++)*fs,22*fs);
			if(!isFinite(skill.base)) perc = '%';
			let sign = skill.rate>0? '+':'';
			ctsInv.fillText(`${perLvl} ${sign}${skill.rate}${perc}`,(i+1)*fs,(j++)*fs,22*fs);
		}
		if(skill.synerzy){
			let sign = skill.synerzy>0? '+':'';
			ctsInv.fillText(`${perSy} ${sign}${skill.synerzy}${perc}`,(i+1)*fs,(j++)*fs,22*fs);
		}
		if(skill.durBase){
			ctsInv.fillText(`${durBase} ${skill.durBase}`,(i+1)*fs,(j++)*fs,22*fs);
		}
		if(skill.durRate){
			let sign = skill.durRate>0? '+':'';
			ctsInv.fillText(`${perLvl} ${sign}${skill.durRate}`,(i+1)*fs,(j++)*fs,22*fs);
		}
		ctsInv.restore();
	}

	
	addOrRemoveBookmark(keyCode){
		if(flag.bookmark===1){
			if(keyCode>=112||isShift&&keyCode===77){ //F1~, M
				let i = keyCode===77? 0:keyCode -111;
				if(!this.bookmarks[i]) return;
				this.bookmarks[i] = null;
				inventory.clear();
				this.showSkill(this.skill);
				this.showSkill(this.bookmarks,true);
				message.draw(message.get(M_BOOKMARK),true);
			} else{
				let a = getAlphabet(keyCode);
				if(!a||!this.skill[a]) return;
				flag.bookmark = 2;
				ca = a;
				message.draw(message.get(M_BOOKMARK2),true);
			}
		} else{
			if(!(isShift&&keyCode===77)&&(keyCode<112||keyCode>123)) return;
			let i = keyCode===77? 0:keyCode-111;
			this.bookmarks[i] = this.skill[ca].id;
			flag.bookmark = 1;
			inventory.clear();
			this.showSkill(this.skill);
			this.showSkill(this.bookmarks,true);
			message.draw(message.get(M_BOOKMARK),true);
		}
	}
	
	gainStatOrSkill(keyCode){
		if(flag.gain===1&&!flag.number){
			let a = getAlphabet(keyCode);
			if(!a||isShift&&!statistics.list[a]||!isShift&&!this.pack[a]) return;
			if(!isShift&&(this.pack[a].type!=='book'||!this.pack[a].skill||!this.canRead(true)))
				return;
			else if(isShift&&!this.statPoints){
				message.draw(message.get(M_CANT_GAIN_STAT));
				return;
			} else if(isShift&&this[statistics.list[a].term+'Max']>=MAX_STAT_LVL){
				let name = statistics.list[a].name[rogue.cl];
				message.draw(rogue.cl===ENG?
				`You can't gain ${name} anymore`
				:`これ以上${name}を取得が出来ない`);
				return;
			}
			ca = a;
			inventory.clear();
			if(isShift){
				this.showStats(a);
				flag.gain = 3;
				flag.number = true;
				this.inputNumber();
			} else{
				this.showSkill(this.pack[a].list);
				flag.gain = 2;
				message.draw(message.get(M_GAIN_SKILL),true);
			}
		} else if(flag.gain===2&&!flag.number){ //skill
			let a = getAlphabet(keyCode);
			if(!a) return;
			let id = this.pack[ca].list[a];
			if(!id) return;
			let skill = skillMap.get(id);
			if(isShift){
				inventory.clear();
				this.showSkill(this.pack[ca].list);
				this.showSKillDetail(skill,LEFT);
				message.draw(message.get(M_GAIN_SKILL),true);
				return;
			}
			let key = this.searchSkill(id);
			let lvl = key? this.skill[key].lvl:0;
			if(this.lvl<skill.reqLvl+lvl
			||skill.reqSynerzy&&skill.reqSynerzy>this.getSynerzy(skill))
				return;
			if(!this.skillPoints
			||!key&&Object.keys(this.skill).length>=MAX_SKILL_NUM){
				message.draw(message.get(M_CANT_GAIN_SKILL));
				return;
			} else if(key&&lvl===MAX_SKILL_LVL){
				let nameSkill = skill.name[rogue.cl];
				message.draw(rogue.cl===ENG?
				`You can't study ${nameSkill} anymore`
				:`これ以上${nameSkill}の知識を得られない`);
				return;
			}
			inventory.clear();
			cs = id;
			flag.number = true;
			this.showSkill(this.pack[ca].list);
			this.inputNumber();
		} else{
			if(flag.gain===2){ //skill
				let skill = skillMap.get(cs);
				let key = this.searchSkill(cs);
				let lvl = key? this.skill[key].lvl:0;
				let gainLvl = this.lvl-(lvl+skill.reqLvl)+1;
				if(MAX_SKILL_LVL<lvl+gainLvl) gainLvl = MAX_SKILL_LVL-lvl;
				let point = this.skillPoints>=gainLvl? gainLvl:this.skillPoints;
				let i;
				if(keyCode===13){
					i = Number(cn);
					if(i>point) i = point;
				} else
					i = point;
				let name = skill.name[rogue.cl];
				if(!key){ //new skill
					key = EA[Object.keys(this.skill).length];
					this.skill[key] = {}
					this.skill[key].id = cs;
					this.skill[key].lvl = 0;
					message.draw(rogue.cl===ENG?
					`You gained ${name}`
					:`${name}を習得した`);
				} else{
					message.draw(rogue.cl===ENG?
					`You studied ${name} deeply`
					:`${name}の知識を深めた`);
				}
				this.skillPoints -= i;
				this.skill[key].lvl += i;
				this.gainSynerzy(skill,i);
			} else if(flag.gain===3) { //stat
				let stat = statistics.list[ca];
				let nameMax = stat.term+'Max';
				let lvl = MAX_STAT_LVL-this[nameMax];
				let point = this.statPoints>=lvl? lvl:this.statPoints;
				let i;
				if(keyCode===13){
					i = Number(cn);
					if(i>point) i = point;
				} else
					i = point;
				let name = stat.name[rogue.cl];
				message.draw(rogue.cl===ENG?
				`You gained ${name}`
				:`${name}を得た`);
				this.statPoints -= i;
				this[nameMax] += i;
				this[stat.term] = this[nameMax];
				this.calcAll();
			}
			inventory.clear();
			flag.gain = false;
			flag.regular = true;
			rogue.done = true;
		}
	}
	
	castSkill(keyCode){
		if(isCtrl&&keyCode===83&&Object.keys(this.skill).length>=2){ //S
			flag.skill = false;
			flag.sortSkill = 1;
			inventory.clear();
			this.showSkill(this.skill);
			message.draw(message.get(M_SORT_SKILL),true);
			return;
		}
		let a = getAlphabet(keyCode);
		if(!a||!this.skill[a]) return;
		let skill = skillMap.get(this.skill[a].id);
		if(isShift){
			inventory.clear();
			this.showSkill(this.skill);
			this.showSKillDetail(skill,LEFT);
			flag.skill = true;
			message.draw(message.get(M_CAST),true);
			return;
		}
		if(!this.checkToCast(skill)) return;
		inventory.clear();
		cs = this.skill[a];
		if(skill.kind==='self'){
			if(this.castSelfSpell(skill)===null) return;
		} else{
			flag.aim = true;
			message.draw(message.get(M_CAST_DIR)+message.get(M_TO_EXAMINE),true);
			this.examinePlot(true);
			return;
		}
		flag.skill = false;
		rogue.done= true;
		flag.regular = true;
	}
	
	castBookmarkedSkill(keyCode,keyCodeDr){
		let i = keyCode===48? 0:keyCode -111;
		if(!this.bookmarks[i]||!this.checkToCast()) return;
		let id = this.bookmarks[i];
		let skill = skillMap.get(id);
		if(!this.checkToCast(skill)) return;
		flag.skill = true;
		cs = this.skill[this.searchSkill(id)];
		if(skill.kind==='self'){
			if(this.castSelfSpell(skill)===null) return;
			rogue.done= true;
			flag.skill = false;
		} else if(skill.range===0){
			this.aim(null,this.x,this.y,id);
		} else if(i===0){
			this.aim(keyCodeDr,ud,ud,id);
		} else if(skill.wall){
			flag.regular = false;
			flag.aim = true;
			message.draw(message.get(M_CAST_DIR)+message.get(M_TO_EXAMINE),true);
			this.examinePlot(true);
		} else{
			let x,y;
			if(rogue.ce){
				[x, y] = [rogue.ce.x, rogue.ce.y];
				if(!litMapIds[x+','+y]&&(!coords[x][y].detected
				||distanceSq(x,y,this.x,this.y)>FOV_SQ)
				||!lineOfSight(this.x,this.y,x,y)){
					flag.skill = false;
					return;
				}
			} else{
				shadowcasting.main(this.x,this.y,FOV,'Aim');
				if(!rogue.ce){
					flag.skill = false;
					return;
				} else
					[x, y] = [rogue.ce.x, rogue.ce.y];
			}
			this.aim(null,x,y,id);
		}
	}
	
	sortSkill(keyCode){
		if(flag.sortSkill===1){
			ca = getAlphabet(keyCode);
			if(!ca||!this.skill[ca]) return
			flag.sortSkill = 2;
			message.draw(message.get(M_SORT_SKILL2),true);
		} else{
			let a = getAlphabet(keyCode);
			if(!a||!this.skill[a]||a===ca) return;
			[this.skill[a], this.skill[ca]] = [this.skill[ca], this.skill[a]];
			inventory.clear();
			this.showSkill(this.skill);
			flag.sortSkill = 1;
			message.draw(message.get(M_SORT_SKILL),true);
		}
	}
	
	getItem(a,floor){
		let item;
		if(isFinite(a))
			item = this.boxes[a];
		else if(floor)
			item = coords[this.x][this.y].item[a];
		else if(isShift)
			item = this.equipment[BP[a]];
		else
			item = this.pack[a];
		return item;
	}
	
	switchInventory(keyCode,id,equipment){
		if(keyCode!==188&&keyCode!==190) return false;
		inventory.clear();
		let msg = message.get(id);
		if(flag.synthesize||flag.pack)
			this.showInventory(flag.pack? P_BOX:P_CUBE);
		if(keyCode===188){ //,
			flag.floor = false;
			if(equipment) this.equipmentList();
			this.showInventory(P_PACK);
			msg += message.get(M_FLOOR);
		} else if(keyCode===190||keyCode===110){ //., T.
			flag.floor = true;
			this.showInventory(P_FLOOR);
			msg += message.get(M_PACK);
		}
		message.draw(msg,true);
		return true;
	}
	
	destroy(keyCode){
		if(!flag.number){
			if(this.switchInventory(keyCode,M_DESTROY,true)) return;
			let a = getAlphabetOrNumber(keyCode);
			if(!a) return;
			let item = this.getItem(a,flag.floor);
			if(!item) return;
			if(item.indestructible||item.cursed&&isShift&&flag.floor){
				message.draw(message.get(M_CANT_DESTROY));
				return;
			}
			inventory.clear();
			flag.number = true;
			flag.floor = false;
			this.showInventory(item.place,a);
			this.inputNumber();
			ci = item;
		} else{
			let item = ci;
			let i = item.getQuantity(keyCode);
			this.deleteItem(item,i);
			let name = item.getName(false,i)
			message.draw(rogue.cl===ENG?
			`Destroyed ${name}`
			:`${name}を破壊した`);
			inventory.clear();
			flag.destroy = false;
			flag.regular = true;
			rogue.done = true;
		}
	}
	
	shop(keyCode){
		let shop = coords[this.x][this.y].enter;
		if(!flag.number){
			let a = getAlphabet(keyCode);
			if(!a) return;
			let item = isShift? shop.list[a]:this.pack[a];
			if(!item) return;
			if(!isShift&&Object.keys(shop.list).length===MAX_PACK_COUNT){
				message.draw(message.get(M_CANT_SELL));
				return;
			} else if(isShift&&Object.keys(this.pack).length>=MAX_PACK_COUNT
			&&!this.canCarryItem(this.pack,item)
			&&!this.canCarryItem(this.boxes,item)){
				message.draw(message.get(M_CANT_CARRY));
				return;
			}
			ca = a;
			ci = item;
			inventory.clear();
			flag.number = true;
			flag.shop = item.place;
			this.showInventory(item.place,a);
			this.inputNumber();
		} else{
			let item = ci;
			ci = null;
			let i = item.getQuantity(keyCode);
			let amount = item.price*i;
			if(flag.shop===P_PACK){
				item = this.inventoryOut(item,i);
				let l = Object.keys(shop.list).length;
				shop.list[EA[l]] = item;
				item.place = P_SHOP;
				this.purse += amount;
				if(!item.identified){
					item.identified = true;
					item.changeNameAndPrice();
				}
				item.price *= 2;
				let name = item.getName();
				message.draw(rogue.cl===ENG?
				`Sold ${name} for $${amount}`
				:`${name}を$${amount}で売却した`);
			} else if(this.purse<amount)
				message.draw(message.get(M_DONT_HAVE_MONEY));
			else{ 
				item = item.split(i,shop.list);
				item.changeNameAndPrice();
				this.packAdd(item);
				this.purse -= amount;
				let name = item.getName();
				message.draw(rogue.cl===ENG?
				`Bought ${name} for $${amount}`
				:`${name}を$${amount}で購入した`);
				audio.playSound('grab');	
			}
			this.drawStats();
			flag.shop = shop.gamble? GAMBLE:true;
			flag.number = false;
			inventory.clear();
			cn = 1;
			this.showInventory(P_PACK);
			this.showInventory(P_SHOP);
			message.draw(message.get(M_SHOP),true);
		}
	}
	
	stash(keyCode){
		let stash = coords[this.x][this.y].enter;
		if(!flag.number){
			if(keyCode===188||keyCode===190){ //, .
				if(keyCode===190&&stash.page<MAX_STASH_PAGE)
					stash.page++;
				else if(keyCode===188&&stash.page>1)
					stash.page--;
				inventory.clear();
				this.showInventory(P_STASH);
				this.showInventory(P_PACK);
				message.draw(message.get(M_STASH),true);
				return;
			}
			let a,item;
			if(isShift){
				if(!getAlphabet(keyCode)) return;
				a = keyCode-65+(stash.page-1)*MAX_PACK_COUNT;
				item = stash.list[a];
			} else{
				a = getAlphabetOrNumber(keyCode);
				if(!a) return;
				item = this.getItem(a);
			}
			if(!item) return;
			if(!isShift&&Object.keys(stash.list).length===MAX_STASH_COUNT
			&&!this.canCarryItem(stash.list,item)){
				message.draw(message.get(M_CANT_ADD));
				return;
			} else if(isShift&&Object.keys(this.pack).length>=MAX_PACK_COUNT
				&&!this.canCarryItem(this.pack,item)
				&&!this.canCarryItem(this.boxes,item)){
					message.draw(message.get(M_CANT_CARRY));
					return;
			}
			ci = item;
			flag.number = true;
			flag.stash = item.place;
			if(item.quantity===1){
				cn = 1;
				this.stash(13);
			} else{
				ca = a;
				inventory.clear();
				this.showInventory(item.place,a);
				this.inputNumber();
			}
		} else{
			let item = ci;
			ci = null;
			let i = item.getQuantity(keyCode);
			if(flag.stash===P_STASH){
				item = item.split(i,stash.list);
				this.packAdd(item);
				let name = item.getName();
				message.draw(rogue.cl===ENG?
				`Take out ${name}`
				:`${name}を持物に加えた`);
			} else{ 
				item = this.inventoryOut(item,i);
				let num = this.stashAdd(stash.list,item);
				stash.page = Math.ceil((Number(num)+1)/MAX_PACK_COUNT);
				let name = item.getName();
				message.draw(rogue.cl===ENG?
				`Stored ${name}`
				:`${name}を保管した`);
			}
			this.drawStats();
			flag.stash = true;
			flag.number = false;
			inventory.clear();
			this.showInventory(P_STASH);
			this.showInventory(P_PACK);
			message.draw(message.get(M_STASH),true);
		}
	}
	
	cureShop(keyCode){
		let cure = coords[this.x][this.y].enter;
		let a = getAlphabet(keyCode);
		if(!a||!cure.list[a]) return;
		let cost = cure.list[a].cost;
		if(cost>this.purse){
			message.draw(message.get(M_DONT_HAVE_MONEY));
			return;
		}
		this.purse -= cost;
		let name = cure.list[a][ENG];
		if(name==='recover completely'){ 
			this.recovery();
			// message.draw(message.get(M_RECOVER_ALL));
		} else if(name==='restore health and mana'){
			this.hp = this.hpMax;
			this.mp = this.mpMax;
		} else if(name==='restore stats')
			this.haveCast(RESTORE_ALL,10,this);
		else if(name==='restore condition')
			this.haveCast(CURE_ALL,10,this);
		else if(name==='have a meal')
			this.hunger = MAX_HUNGER;
		this.drawStats();
		flag.cure = false;
		flag.regular = true;
		inventory.clear();
	}
	
	revive(){
		this.recovery();
		flag.died = false;
		flag.regular = true;
		rogue.cdl = 0;
		clearLevel();
		creation.town();
	}
	
	recovery(){
		this.haveCast(RESTORE_ALL,10,this);
		this.haveCast(CURE_ALL,10,this);
		this.hunger = MAX_HUNGER;
		this.hp = this.hpMax;
		this.mp = this.mpMax;
	}
	
	trapped(trap,stepOn){
		if(flag.dash) flag.dash = false;
		if(coords[this.x][this.y].hidden)
			coords[this.x][this.y].hidden = false;
		if(coinToss()) coords[this.x][this.y].deleteTrap();
		if(trap.nameSkill){
			this.haveCast(trap.nameSkill,trap.lvl,this);
			return;
		}
		let name = trap.name[ENG];
		if(name==='Trap Door'){
			if(this.levi&&!stepOn)
				message.draw(message.get(M_FLOAT));
			else if(rogue.cdl!==33||difficulty.inferno)
				this.downOrUpStairs(null,true);
		} else if(name==='Bear Trap'){
			this.stuckTrap = rndIntBet(4,6);
		} else if(name==='Arrow Trap'){ 
			let dmg = rndIntBet(4,6);
			this.hp -= dmg;
			message.draw(rogue.cl===ENG?
			`An arrow hits you by ${dmg}`
			:`矢はあなたに${dmg}のダメージを与えた`);
			if(this.hp<=0) this.died();
		}
	}
	
	healAndHunger (){
		let light = this.equipment['light'];
		if(light&&light.duration&&light.durab){
			if(--light.duration===0){
				this.lighten -= light.lighten;
				this.lightenOrDarken('Lighten');
				message.draw(message.get(M_LIGHT_GONE));
			}
		}
		if(this.hunger>0){
			this.heal();
			let cost = Math.floor((this.hpReg+this.mpReg-this.digest)/10);
			if(cost>0){
				this.hunger -= cost;
				if(this.hunger<0) this.hunger = 0;
			} else if(rogue.turn%(-cost+1)===0)
				this.hunger--;
			if(!this.hunger) message.draw(message.get(M_STARVED));
		} else{
			this.hp--;
			if(this.hp<=0) this.died();
		}
		if(!this.hunger&&(flag.dash||flag.rest)) flag.dash = flag.rest = false;
		this.calcCondition(true);
		this.drawStats();
	}
	
	respec(){
		this.statPoints = this.skillPoints = this.lvl -1;
		this.strMax = 1+this.strBonus;
		this.dexMax = 1+this.dexBonus;
		this.conMax = 1+this.conBonus;
		this.intMax = 1+this.intBonus;
		this.str = this.strMax;
		this.dex = this.dexMax;
		this.con = this.conMax;
		this.int = this.intMax;
		this.skill = {};
		this.initBookmarks();
		this.initSynerzy();
		this.calcAll();
	}
	
	getStarterItems(){
		this.createItemIntoPack(1,'melee',M_DAGGER,1,ud,true);
		this.createItemIntoPack(1,'armor',A_VEST,1,ud,true);
		this.createItemIntoPack(1,'book',B_ALCHEMY_1,1,ud,true);
		this.createItemIntoPack(1,'book',B_SPELL_1,1,ud,true);
		this.createItemIntoPack(1,'book',B_SKILL_1,1,ud,true);
		this.createItemIntoPack(1,'food',F_RATION,5,ud,true);
		this.createItemIntoPack(2,'light',L_TORCH,1,ud,true);
	}
	
	inputNumber(keyCode){
		if(!keyCode){
			cn = 1;
			message.draw(message.get(M_NUMBER)+cn,true);
			return
		}
		if((keyCode<48||keyCode>57)&&keyCode!==65&&keyCode!==13&&keyCode!==8) //a, Enter, Back space
			return;
		if(keyCode===48&&(cn===''||cn===1)||keyCode===13&&cn==='')
			return;
		else if(keyCode===8||keyCode>=48&&keyCode<=57){
			if(cn===1) cn = '';
			if(keyCode===8)
				cn = cn.substr(0,cn.length-1);	
			else
				cn += keyCode-48;
			if(!flag.gain){ 
				inventory.clear();
				let place;
				if(flag.shop)
					place = flag.shop;
				else if(flag.stash)
					place = flag.stash;
				else
					place = P_PACK;
				this.showInventory(place,ca);
			}
			message.draw(message.get(M_NUMBER)+cn,true);
			return;
		}
		if(flag.drop)
			this.drop(keyCode);
		else if(flag.gain)
			this.gainStatOrSkill(keyCode);
		else if(flag.destroy)
			this.destroy(keyCode);
		else if(flag.shop)
			this.shop(keyCode);
		else if(flag.stash)
			this.stash(keyCode);
		flag.number = false;
	}
	
	checkUnique(){
		this.checkUniqueLoop(Item.list);
		for(let key in Enemy.list){
			let enemy = Enemy.list[key];
			this.checkUniqueLoop(enemy.pack);
			this.checkUniqueLoop(enemy.equipment);
			this.checkUniqueLoop(enemy.side);
			this.checkUniqueLoop(enemy.boxes);
			if(enemy.mod===UNIQUE) delete this.cue[enemy.name[ENG]];
		}
	}
	
	checkUniqueLoop(list){
		for(let key in list){
			let item = list[key];
			if(!item) continue;
			if(item.mod===UNIQUE&&!item.identified){
				let id = item.type+','+item.tabId+','+item.uniqueId;
				if(this.cui[id]) delete this.cui[id];
			} else if(item.lethe)
				this.lethe--;
		}
	}
	
	checkItem(item,type){
		let found = this.checkItemLoop(this.boxes,item,type);
		// if(!found) found = this.checkItemLoop(this.pack,item,type);
		return found;
	}
	
	checkItemLoop(list,item,type){
		for(let key in list){
			let item2 = list[key];
			if(item2){
				if(type===CHARGE&&item2.chargeBook&&item2.nameSkill===item.nameSkill){
					item2.charges += item.quantity;
					return true;
				} else if(type===IDENTIFY&&item2.nameSkill===IDENTIFY
				&&(!item2.chargeBook||item2.charges)){
					ci = item2;
					flag.scroll = true;
					this.identify(null,item);
					return;
				}
			}
		}
		return false;
	}
	
	getName(subject,proper){
		let name;
		if(proper)
			name = this.name[rogue.cl];
		else if(rogue.cl===ENG)
			name = subject? 'You':'you'
		else
			name = subject? '':'あなた';
		return name;
	}
	
	isOpponent(fighter){
		return fighter.id!==ROGUE;
	}
	
	isShowing(){
		return !this.invisible;
	}
	
	eventFlag(keyCode){
		switch(keyCode){
			case 79: //o
			case 67: //c
				keyCode===79? flag.openDoor = true:flag.closeDoor = true;
				if(this.searchDoor()<=1){
					flag.openDoor = flag.closeDoor = false;
					return;
				}
				message.draw(message.get(M_OPEN_OR_CLOSE),true);
				break;
			case 73: //i
			case 65: //a
				if(isCtrl){
					if(!wizard) return;
					flag.create = keyCode===73? ITEM:FIGHTER;
					creation.input();
					message.draw(keyCode===73?
					'Input type, tagId and quantity':
					'Input type and tagId',true);
				} else if(keyCode===73&&isShift){
					flag.investigate = true;
					this.showInventory(P_PACK);
					this.equipmentList();
					message.draw(message.get(M_INVESTIGATE)+message.get(M_FLOOR),true)
				} else if(keyCode===65&&isShift){
					if(!this.haveBook(ud,true)){
						message.draw(message.get(M_DONT_HAVE_RECIPES));
						return;
					}
					flag.synthesize = true;
					this.showInventory(P_PACK);
					this.showInventory(P_CUBE);
					message.draw(message.get(M_SYNTHESIZE)+message.get(M_FLOOR),true);
				} else if(keyCode===65){
					this.showSkill(this.skill);
					this.showSkill(this.bookmarks,true);
					message.draw(message.get(M_BOOKMARK),true);
					flag.bookmark = 1;
				}
				break;
			case 69: //e
				if(isShift){
					flag.eat = true;
					this.showInventory(P_PACK);
					message.draw(message.get(M_EAT)+message.get(M_FLOOR),true);
				}
				break;
			case 68: //d
				if(isCtrl){
					message.draw(message.get(M_DESTROY)+message.get(M_FLOOR),true);
					flag.destroy = true;
					this.showInventory(P_PACK);
					this.equipmentList();
				} else{
					flag.drop = true;
					this.showInventory(P_PACK);
					this.equipmentList();
					message.draw(message.get(M_DROP),true);
				}
				break;
			case 70: //f
				if(!this.equipment['light']){
					message.draw(message.get(M_DONT_EQUIP_LIGHT));
					return;
				}
				flag.fuel = true;
				this.showInventory(P_PACK);
				this.equipmentList();
				message.draw(message.get(M_FUEL)+message.get(M_FLOOR),true);
				break;
			case 87: //w
				flag.equip = true;
				this.showInventory(P_PACK);
				this.equipmentList();
				message.draw(message.get(M_EQUIP)+message.get(M_FLOOR),true);
				break;
			case 84: //t
				if(isShift){
					if(this.isNaked()){
						message.draw(message.get(M_DONT_HAVE_EQUIPMENT));
						return;
					}
					message.draw(message.get(M_TAKE_OFF),true);
					this.equipmentList();
					this.showInventory(P_PACK);
					flag.unequip = true;
				} else{
					if(!this.haveMissile(true)) return;
					ci = this.getAmmo(this.equipment['main'].throwType);
					if(!ci){
						message.draw(message.get(M_DONT_HAVE_AMMO));
						return;
					}
					flag.arrow = true;
					flag.aim = true;
					message.draw(message.get(M_FIRE)+message.get(M_TO_EXAMINE),true);
					this.examinePlot(true);
				}
				break;
			case 81: //q
				if(isShift){
					flag.quit = true;
					message.draw(message.get(M_ASK_TO_QUIT));
					message.draw(message.get(M_QUIT),true);
				} else{
					flag.quaff = true;
					this.showInventory(P_PACK);
					message.draw(message.get(M_QUAFF)+message.get(M_FLOOR),true);
				}
				break;
			case 82: //r
				if(!this.canRead()) return;
				flag.read = true;
				this.showInventory(P_PACK);
				message.draw(message.get(M_READ)+message.get(M_FLOOR),true);
				break;
			case 90: //z
				flag.zap = true;
				this.showInventory(P_PACK);
				message.draw(message.get(M_ZAP)+message.get(M_FLOOR),true);
				break;
			case 191: //?
				if(isShift){
					flag.help = true;
					help.main();
				}
				break;
			case 80: //p
				if(isCtrl){
					message.previous(72); //h
					flag.message = true;
				} else{
					flag.pack = true;
					this.showInventory(P_PACK);
					this.showInventory(P_BOX);
					message.draw(message.get(M_PACK_OR_UNPACK)+message.get(M_FLOOR),true);
				}
				break;
			case 88: //x
				if(this.blinded){
					message.draw(message.get(M_CANT_EXAMINE));
					return;
				}
				flag.examine = true;
				cursol.init();
				this.examine();
				break;
			case 77: //m
				if(isShift){
					minimap.draw(65);
					message.draw(message.get(M_MINIMAP),true);
					flag.minimap = true;
				} else{
					if(!this.checkToCast()) return;
					flag.skill = true;
					this.showSkill(this.skill);
					message.draw(message.get(M_CAST),true);
				}
				break;
			case 71: //g
				flag.gain = 1;
				this.showInventory(P_PACK);
				this.showStats();
				message.draw(message.get(M_GAIN),true);
				break;
			case 187: //=
			case 189:
				flag.option = true;
				inventory.show(option.list,RIGHT);
				message.draw(message.get(M_OPTION),true);
				break;
		}
		flag.regular = false;
	}
}

const Enemy = class extends Fighter{
	constructor(obj){
		super(obj)
		this.sensing = SENSING_SQ;
		this.type = 'enemy'; 
	}
	
	gainStats(){
		switch(this.grow&&coinToss()? this.grow:rndInt(3)){
			case STR:
				this.str = ++this.strMax;
				break;
			case DEX:
				this.dex = ++this.dexMax;
				break;
			case CON:
				this.con = ++this.conMax;
				break;
			case INT:	
				this.int = ++this.intMax;
				break;
		}
	}
	
	init(position,x,y,summon,magic,bias,lvl){
		if(this.mod!==UNIQUE&&lvl>this.lvl){
			let boost = rndInt(lvl-this.lvl);
			for(let i=0;i<boost;i++)
				this.gainStats();
			this.lvlMax = this.lvl = this.lvl+boost;
		}
		this.skillPoints = this.lvl-1;
		this.exp = this.expMax = calcLevel(this.lvl);
		this.expGain = this.getExp();
		this.expNext = this.calcNextLvl();
		if(this.volumeRate){
			this.getMaterial(lvl);
			this.getBaseandWeight();
		}
		if(this.mod===UNIQUE)
			this.getUnique();
		else if(this.mod===MAGIC||magic||this.material===M_GEM
		||evalPercentage(10+rogue.mf)){
			if(this.bias) bias = this.bias;
			if(evalPercentage((10+rogue.mf)/4))
				this.getRare(bias,lvl);
			else
				this.getMagic(bias,lvl);
		}
		if(evalPercentage(10)) this.dropNum++;
		if(this.mf) this.dropNum += Math.ceil(this.mf/10);
		this.calcDmgOne();
		this.gainSynerzyAll();
		if(this.starter) this.getStarterItems();
		if(this.mod!==NORMAL)
			this.getOrLooseStats(modBonusMap.get(this.mod),true);
		this.calcAll();
		
		this.sleeping = this.awake||this.aggravating||summon? 0:DEFAULT;
		if(this.mimic) hallucinate.one(this,false,true);
		if(this.dropNum)
			this.createItemIntoPack(this.dropNum,RANDOM,RANDOM,1,ud,ud,this.mf||this.mod===UNIQUE,this.lvl);
		if(this.gf)
			this.createItemIntoPack(rndIntBet(1,Math.ceil(this.gf/20)),'coin',C_COIN,1);
		this.hp = this.hpMax;
		this.mp = this.mpMax;
		this.energy = summon? -COST_REGULAR:this.spd;
		
		super.init(position,x,y);
	}
	
	putDown(x,y){
		do	this.id = Math.random();
		while(Enemy.list[this.id]);
		this.spiralSearch(x,y,FIGHTER);
		if(this.abort) return;
		Enemy.list[this.id] = this; 
		queue.push(this);
		if(rogue.hallucinated) 	hallucinate.one(this,true);
		this.drawOrErase(true);
	}
	
	act(){
		let dr = null;
		if(this.calcCondition(true)===null) return;
		this.heal()
		let l =	distanceSq(this.x,this.y,rogue.x,rogue.y);
		if(this.paralyzed||this.sleeping){
			if(this.sleeping<0&&l<=FOV_SQ&&(rogue.aggravating||this.probWakeUp(l)))
				this.wakeUp();
			else{
				this.decreaseEnergy();
				return;
			}
		}
		let los = l<=FOV_SQ? lineOfSight(this.x,this.y,rogue.x,rogue.y):false;
		if(this.blinded||this.confused||this.moveRnd&&coinToss())
			dr = this.getDirection(los,ud,true);
		else if(los)
			dr = this.decide(l);
		else if(l<=FOV_SQ)
			dr = this.getDrToMinDistance();
		else if(l<=this.sensing)
			dr = this.getDirection(los,true);
		if(!dr&&this.drTemp) dr = this.drTemp;
		if(dr&&(!this.stillness||l<=1)){
			this.dr = dr;
			this.drTemp = null;
			this.move(dr,los);
		}
		if((flag.dash||flag.rest)&&los&&this.isShowing()&&(!this.mimic||this.identified))
			flag.dash = flag.rest = false;
		this.decreaseEnergy();
	}
	
	move(dr,los){
		let [x, y] = [this.x+dr.x, this.y+dr.y];
		let loc = coords[x][y];
		if(loc.trap&&loc.trap.protection){
			this.attackCircle(loc); 
			return;
		} else if(x===rogue.x&&y===rogue.y){
			this.attack(rogue);
			return;
		}
		if(loc.door===CLOSE&&(!loc.hidden||this.searching)){
			if(loc.hidden){
				if(!evalPercentage(this.searching)) return;
				loc.hidden = false;
				loc.wall = false;
			}
			loc.openOrCloseDoor();
		} else{
			this.drawOrErase(false);
			this.x += dr.x,this.y+= dr.y;
			this.drawOrErase(true);
			this.cost -= this.frw>=100? 5:Math.floor(this.frw/20);
		}
	}
	
	getDirection(los,betw,rand){
		let dr;
		if(betw)
			dr = getDirectionBetween(this.x,this.y,rogue.x,rogue.y);
		else if(rand)
			dr = this.blinded? this.dr:DR[rndInt(DR.length-1)]; 
		if(!this.canMove(dr)) dr = this.getDrAround(dr,los); ///
		return dr;
	}
	
	getDrAround(dr,los){
		let ccw = coinToss();
		let nextDr = getNextDirection(dr,ccw);
		if(!this.canMove(nextDr)){
			let nextDr2 = getNextDirection(dr,!ccw)
			if(!this.canMove(nextDr2)){
				if(!los||this.drTemp) return null;
				let nextDr3 = getNextDirection(nextDr,ccw);
				if(!this.canMove(nextDr3)){
					nextDr3 = getNextDirection(nextDr2,!ccw);
					if(!this.canMove(nextDr3)) return null
				}
				nextDr = nextDr3;
			} else
				nextDr = nextDr2;
		}
		return nextDr;
	}
	
	canMove(dr){
		let [x, y] = [this.x+dr.x, this.y+dr.y];
		let loc = coords[x][y];
		if(loc.fighter)
			return loc.fighter.id===ROGUE;
		else if(loc.wall&&(!loc.hidden||!this.searching))
			return false;
		else if(!this.drTemp&&loc.trap&&loc.trap.protection){
			this.drTemp = dr;
			return false;
		} 
		return true;
	}
	
	getDrToMinDistance(){
		let drD,drT;
		let dist = FOV+1;
		let distCur = rogue.distMap[this.x+','+this.y];
		let traces = coords[this.x][this.y].traces;
		for(let drL of DR){
			let [x, y] = [this.x+drL.x, this.y+drL.y];
			if(dist>rogue.distMap[x+','+y]){
				if(!this.canMove(drL)) continue;
				drD = drL;
				dist = rogue.distMap[x+','+y];
				if(dist<distCur) break;
			}
		}
		if(!drD) drD = drT? drT:this.getDirection(true,true);
		return drD;
	}
	
	attackCircle(loc){
		if(evalPercentage(25)){
			if(!loc.hidden){
				let name = this.getName(true);
				message.draw(rogue.cl===ENG?
				`${name} broke Magic Circle of Protection`
				:`${name}守りの魔法円を破壊した`)
			}
			loc.deleteTrap(true);
		}
	}
	
	died(f){
		coords[this.x][this.y].fighter = null;
		delete Enemy.list[this.id];
		coords[this.x][this.y].detected = false;
		queue.delete(this);
		if(rogue.ce&&rogue.ce.id===this.id){
			rogue.ce = null;
			statistics.clearEnemyBar();
		}
		coords[this.x][this.y].draw();
		if(!f) return;
		if(rogue.hallucinated||this.mimic&&!this.identified)
			hallucinate.undoOne(this);
		let name = this.getName();
		message.draw(rogue.cl===ENG?
		`Defeated ${name}`
		:`${name}を倒した`);
		f.gainExp(this.expGain);
		if(this.material&&this.probMaterial()) this.makeMaterial();
		this.dropEquipment(this.equipment);
		this.dropEquipment(this.side);
		for(let key in this.pack)
			this.pack[key].putDown(this.x,this.y,true);
		if(this.boss&&rogue.cdl===33){
			creation.stairs(1,DOWN,LOCATION,this.x,this.y,true);
			if(rogue.cdl===33&&!rogue.lethe) creation.item(1,'potion',P_LETHE,1,LOCATION,this.x,this.y);
			if(rogue.cdl===33) difficulty.inferno = true;
			audio.playSound('kill_boss');
		}
	}
	
	probMaterial(){
		let perc;
		switch(this.mod){
			case NORMAL:
			case UNIQUE:
				perc = 0;
				break;
			case MAGIC:
				perc = 20;
				break;
			case RARE:
				perc = 10;
				break;
		}
		return evalPercentage(perc);
	}
	
	makeMaterial(){
		for(let key in this.modList){
			if(this.modList[key]===DEFAULT){ 
				delete this.modList[key];
				continue;
			}
			let num = this.modList[key];
			let times = this.matRedTimes;
			while(times--&&num) num = rndInt(num);
			!num? delete this.modList[key]:this.modList[key] = num;
		}
		if(!Object.keys(this.modList).length) return;
		let item = {};
		copyObj(item,this.modList);
		item.modList = {};
		copyObj(item.modList,this.modList);
		item.name = {};
		item.nameReal = {};
		copyObj(item.name,this.name);
		copyObj(item.nameReal,this.name);
		item.color = item.colorReal = this.colorReal;
		item.shadow = item.shadowReal = this.shadowReal;
		item.stroke = item.strokeReal = this.strokeReal;
		item.lvl = this.lvl;
		item.mod = this.mod;
		item.rarity = this.rarity;
		item.material = this.getMaterialBase();
		item.identified = false;
		item.quantity = 1;
		item.symbol = item.symbolReal = '\'';
		item.type = 'material';
		item.weight = 0.2;
		item.price = item.priceReal = 100;
		item.__proto__ = Item.prototype;
		item.putDown(this.x,this.y,true);
	}
	
	dropEquipment(list){
		for(let key in list){
			let item = list[key];
			if(!item) continue;
			item.putDown(this.x,this.y,true);
			list[key] = null;
		}
	}
	
	decide(distance){
		if(this.skillProb&&evalPercentage(this.skillProb*100)&&this.checkToCast()){
			if(this.castSkill(distance)) return;
		}
		if(this.haveMissile()){
			ci = this.getAmmo(this.equipment['main'].throwType);
			if(ci){
				flag.arrow = true;
				let name = this.getName(true);
				let arrow = this.timesMissile===1? 'an arrow':'arrows';
				message.draw(rogue.cl===ENG?
				`${name} shot ${arrow}`
				:`${name}矢を放った`);
				this.aim(null,rogue.x,rogue.y);
				return;
			} else if(!this.equipment['main'].cursed){
				this.swap();
				return;
			}
		}
		return this.getDrToMinDistance();
	}
	
	castSkill(distance){
		let a = EA[rndInt(Object.keys(this.skill).length-1)];
		let id = this.skill[a].id;
		let skill = skillMap.get(id);
		if(!this.checkToCast(skill)) return;
		if(skill.kind!=='self'&&skill.range>=0){
			let l = skill.range;
			l += skill.radius? skill.radius:0;
			if(l**2<distance) return;
		}
		cs = this.skill[a];
		if(skill.kind==='self'){
			if(this.castSelfSpell(skill)===null) return;
		} else{
			flag.skill = true;
			let [x, y] = skill.range===0? [this.x, this.y]:[rogue.x,rogue.y];
			this.aim(null,x,y,id);
		}
		return true;
	}
	
	probWakeUp(distanceSq){
		let perc = (1-distanceSq/FOV_SQ)*100-(rogue.stealth-this.stealth);
		if(perc>99)
			perc = 99;
		else if(perc<1)
			perc = 1;
		return evalPercentage(perc);
	}
	
	getBias(bias){
		switch(bias){
			case BIAS_FIRE:
				this.getSkill(FIRE_BREATH);
				break;
			case BIAS_WATER:
				this.getSkill(AQUA_BREATH);
				break;
			case BIAS_AIR:
				this.getSkill(WIND_BREATH);
				break;
			// case BIAS_EARTH:
			case BIAS_POISON:
				this.getSkill(POISON_BREATH);
				break;
			case BIAS_LIGHT:
				this.getSkill(LIGHT_BREATH);
				break;
			case BIAS_COLD:
				this.getSkill(COLD_BREATH);
				break;
			case BIAS_LIGHTNING:
				this.getSkill(LIGHTNING_BREATH);
				break;
			case BIAS_GRAVITY:
				this.getSkill(GRAVITY_BREATH);
				break;
			case BIAS_INFECTION:
				this.getSkill(INFECTION_BREATH);
				break;
			case BIAS_BLIZZARD:
				this.getSkill(BLIZZARD_BREATH);
				break;
			case BIAS_SAND:
				this.getSkill(DUST_BREATH);
				break;
			case BIAS_ACID:
				this.getSkill(ACID_BREATH);
				break;
			case BIAS_MAGMA:
				this.getSkill(MAGMA_BREATH);
				break;
			case BIAS_RADIATION:
				this.getSkill(RADIOACTIVE_BREATH);
				break;
		}		
	}
	
	getSkill(id){
		if(!this.skillPoints) return;
		let skill = skillMap.get(id);
		if(skill.kind==='breath'&&this.race===HUMAN
		||skill.kind!=='breath'&&skill.type==='spell'&&this.int<10)
			return;
		if(!this.skill){ 
			this.skillProb = 1/((skill.kind==='breath'&&this.race&DRAGON? 7:10)-Math.floor(this.lvl/20));
			this.skill = {};
		}
		let i = 0;
		while(this.skill[EA[i]]&&this.skill[EA[i]].id!==id) i++;
		if(i>=MAX_SKILL_NUM) return;
		if(!this.skill[EA[i]]) this.skill[EA[i]] = {};
		skill = this.skill[EA[i]];
		skill.id = id;
		if(!skill.lvl) skill.lvl = 0;
		let gainLvl = MAX_SKILL_LVL-skill.lvl;
		if(gainLvl>this.skillPoints) gainLvl = this.skillPoints;
		skill.lvl += gainLvl;
		this.skillPoints -= gainLvl;
	}
	
	gainSynerzyAll(){
		for(let key in this.skill)
			this.gainSynerzy(skillMap.get(this.skill[key].id),this.skill[key].lvl);
	}
	
	getName(subject){
		let name;
		if(this.isShowing()){
			name = this.name[rogue.cl];
			if(this.cursed&&this.mod!==UNIQUE)
				name = (rogue.cl===ENG? 'Cursed ':'呪われた')+name;
		} else 
			name = rogue.cl===ENG? 'Something':'何か';
		if(subject&&rogue.cl!==ENG) name += 'は';
		return name;
	}
	
	isOpponent(fighter){
		return fighter.id===ROGUE;
	}
	
	isShowing(){
		return (litMapIds[this.x+','+this.y]||this.detected)
			&&!rogue.blinded&&(!this.invisible||rogue.seeInvisible);
	}
	
	getStarterItems(){
		for(let item of this.starter){
			let itemNew = creation.item(1,item.type,item.tabId,1,LIST,ud,ud,item.ud,ud,this.lvl,item.uniqueId);
			itemNew.equipable? this.equip(itemNew,item.side):this.packAdd(itemNew);
		}
	}

	equip(item,side){ //starter
		if(!item||!item.equipable) return;
		if(side)
			this.side[side] = item;
		else{
			let parts = this.getParts(item);
			if(!parts) return;
			this.equipment[parts] = item;
		}
		item.place = P_EQUIPMENT;
		this.gainOrloseWeight(item,item.quantity,true);
		if(!side&&item.durab) this.getOrLooseStats(item,true);
	}
}
Enemy.list = {};

const Item = class extends Material{
	constructor(obj,quantity){
		super(obj);
		this.id = -1;
		this.quantity = quantity;
	}
	
	static goldAmount(lvl){
		return 5*(lvl+1)+rndInt(10*lvl)
	}
	
	init(position,x,y,magic,lvl,uniqueId,starter,matBase,matId){
		this.lvl = lvl;
		if(this.equipable){
			this.durabBonus = 0;
			this.embeddedNum = 0;
			this.embeddedMax = 1;
			this.embeddedList = [];
			if(!magic) magic = !starter&&(this.mod===MAGIC
						||evalPercentage(5+(flag.shop? 0:rogue.mf)));
			if(magic&&!flag.shop&&itemUniqueMap[this.type].has(this.tabId)
			&&(uniqueId>=0||evalPercentage((10+rogue.mf)/10))){
				let array = itemUniqueMap[this.type].get(this.tabId);
				let found;
				for(let i=0,l=array.length;i<l;i++){
					if(uniqueId>=0&&uniqueId!==i) continue;
					let unique = array[i];
					let id = this.type+','+this.tabId+','+i;
					if(!rogue.cui[id]
					&&(uniqueId>=0||unique.lvl<=this.lvl
					&&!evalPercentage(unique.rarity))){
						this.getUnique(unique);
						this.uniqueId = i;
						rogue.cui[id] = true;
						matBase = unique.matBase;
						matId = unique.matId;
						magic = false;
						break;
					}
				}
				if(magic) this.mod = RARE;
			}
			this.getMaterial(lvl,false,matBase,matId);
			this.getBaseandWeight();
			if(magic||this.material===M_GEM){
				let bias = this.bias? this.bias:RANDOM;
				if(this.mod===RARE||evalPercentage((10+rogue.mf)/4))
					this.getRare(bias,this.lvl);
				else
					this.getMagic(bias,this.lvl);
			} else if(!this.mod){
				this.mod = NORMAL;
				this.cursed = !starter&&!flag.shop&&evalPercentage(CURSE_PERC);
			}
			if(this.type==='light'){
				this.durationMax = this.duration;
				this.duration = 2500;
			} else if(this.weapon){
				this.dmgBare = this.dmgBase; 
				if(!this.dmgBonus) this.dmgBonus = 0;
				if(!this.rateBonus) this.rateBonus = 0;
				if(!starter&&!flag.shop&&(this.mod!==NORMAL||this.cursed||rogue.cdl)){
					let found;
					if(this.cursed||this.mod!==NORMAL||evalPercentage(25)){
						this.dmgBonus += (this.cursed? -1:1)*rndIntBet(1,50);
						found = true;
					}
					if(this.cursed||this.mod!==NORMAL||evalPercentage(25)){
						this.rateBonus += (this.cursed? -1:1)*rndIntBet(1,50);
						found = true;
					}
					if(!this.cursed&&found&&this.mod===NORMAL) this.getSuperior();
				}
				this.calcDmgOne();
			} else if(this.armor){
				if(!this.acBonus) this.acBonus = 0;
				if(!starter&&!flag.shop&&(this.mod!==NORMAL||this.cursed
				||rogue.cdl&&evalPercentage(25))){
					this.acBonus += (this.cursed? -1:1)*rndIntBet(1,50);
					if(!this.cursed&&this.mod===NORMAL) this.getSuperior();
				}
				this.calcAcOne();
			}
			if(!this.colorMod) this.colorMod = this.color;
			this.calcPrice();
			if(flag.shop||starter){
				this.identified = true;
				this.changeNameAndPrice();
			}
		} else{
			if(flag.shop) this.identified = true;
			if(this.type==='gem'){
				this.getMaterial(lvl,true);
				this.getMagic(this.bias,this.lvl);
				this.calcPrice();
			} else
				this.mod = NORMAL;
			if(this.type==='ammo'){
				if(this.quantity===1) this.quantity = rndIntBet(80,100);
			} else if(this.type==='coin'){
				if(this.quantity===1)
					this.priceReal = Math.ceil(Item.goldAmount(rogue.cdl)*(1+rogue.gf/100));
				else{
					this.priceReal = this.quantity;
					this.quantity = 1;
				}
				this.nameReal['a'] = this.nameReal['b'] = '$'+this.priceReal;
			} else if(this.type==='wand')
				this.charges = rndIntBet(3,6);
			else if(this.type==='potion'&&!this.lethe||this.type==='scroll')
				if(this.quantity===1) this.quantity = rndIntBet(1,5);
			if(flag.shop||itemTab[this.type].get(this.tabId).identified){
				if(this.type==='wand'&&!flag.shop&&this.identified) this.identified = false;
				this.changeNameAndPrice();
			} else
				this.price = PRICE[this.type];
			if(!this.weight) this.weight = WEIGHT[this.type];
		}
		
		if(flag.shop) this.price *= flag.gamble? 10:2;
		if(position===LIST) return;
		super.init(position,x,y);
	}
	
	putDown(x,y,sound){
		do	this.id = Math.random();
		while(Item.list[this.id]);
		this.spiralSearch(x,y,ITEM);
		if(this.abort) return;
		this.place = P_FLOOR;
		Item.list[this.id] = this;
		let l = Object.keys(coords[this.x][this.y].item).length;
		coords[this.x][this.y].item[EA[l]] = this;
		if(sound) audio.playSound(this.type);
		if(rogue.hallucinated) hallucinate.one(this);
		coords[this.x][this.y].draw();
	}
	
    indexOf(list){
		for(let key in list){
		   if(Object.is(list[key],this)) return key;
		}
    }
			
    equal(obj){
		if(this.type!==obj.type||this.tabId!==obj.tabId) return false;
		if(this.type==='wand'&&this.identified&&obj.identified||this.chargeBook)
			return this.charges===obj.charges;
		if(this.type!=='wand'&&!this.equipable&&this.type!=='gem'&&this.type!=='material') return this.identified===obj.identified;
		return this.identified&&obj.identified
			&&JSON.stringify(this,Item.replacer)===JSON.stringify(obj,Item.replacer);
    }

	static replacer(key,value){
		return key==='quantity'||key==='place'||key==='price'? ud:value;
	}

	dropped(){
		let name = this.getName();
		message.draw(rogue.cl===ENG?
		`Dropped ${name}`
		:`${name}を落とした`)
	}
	
	calcDmgOne(){
		if(this.dmgDiceNum||this.dmgDiceSides){
			let {num, sides} = dice.get(this.dmgBare,this.dmgDiceNum,this.dmgDiceSides);
			this.dmgBase = num+'d'+sides;
		}
	}
	
	calcAcOne(){
		let perc = 1+this.acBonus/100;
		this.acSValue = Math.floor(this.acSBase*perc);
		this.acTValue = Math.floor(this.acTBase*perc);
		this.acBValue = Math.floor(this.acBBase*perc);
	}
	
	identifyAll(){ //potion, scroll
		itemTab[this.type].get(this.tabId).identified = true;
		this.identified= true;
		this.changeNameAndPrice();
		searchItemToIdentifiy.main(this.nameReal[ENG],this.type);
	}
	
	getDurabPrice(){
		let price = (this.durabMax-this.durab)*DURAB_PRICE;
		return price;
	}
	
	getSuperior(){
		this.superior = true;
		this.nameReal['a'] = 'Superior '+this.nameReal['a'];
		this.nameReal['b'] = '上等な'+this.nameReal['b'];
		if(this.identified){
			this.name['a'] = 'Superior '+this.name['a'];
			this.name['b'] = '上等な'+this.name['b'];
		}
	}
	
	uncurse(){
		this.cursed = false;
	}
	
	calcPrice(){
		this.price = PRICE[this.type];
		if(this.priceRate) this.price *= this.priceRate;
		let times = 1;
		if(this.cursed)
			times = 0;
		else if(this.mod===MAGIC)
			times = 10;
		else if(this.mod===RARE)
			times = 20;
		else if(this.mod===UNIQUE)
			times = 50;
		this.priceReal = this.price*times;
		if(this.weapon||this.armor){
			this.price = Math.round(this.price*this.weight);
			this.priceReal = Math.round(this.priceReal*this.weight);
		}
	}
	
	changeNameAndPrice(){
		this.name['a'] = this.nameReal['a'];
		this.name['b'] = this.nameReal['b'];
		this.changePrice();
		if(this.equipable) this.color = this.colorReal = this.colorMod;
	}
	
	changePrice(){
		if(this.type==='wand')
			this.price = Math.round(this.priceReal*(1+this.charges*WAND_PRICE));
		else
			this.price = this.priceReal;
	}
	
	getQuantity(keyCode){
		let i;
		if(keyCode===13){ //Enter
			i = Number(cn);
			if(i>this.quantity) i = this.quantity;
		} else
			i = this.quantity;
		return i;
	}
	
	getName(real,quantity=this.quantity,a=rogue.cl,gamble){
		let type = this.typeHalluc? this.typeHalluc:this.type;
		let halluc = !!this.typeHalluc;
		let name;
		if(gamble){
			name = a===ENG? getUpperCase(type):ITJ[type];
			if(quantity>1) name += ` x${quantity}`;
			return name;
		}
		name = real? this.nameReal[a]:this.name[a];
		if(type==='book'||type==='potion'
		||type==='scroll'||type==='wand'){
			if(this.type2) type = this.type2;
			if(a===ENG){
				type = getUpperCase(type);
				if(!this.identified&&!halluc){
					if(type==='potion'||type==='wand')
						name += ` ${type}`;
					else if(type==='scroll')
						name = `${type} titled ${name}`;
				} else
					name = `${type} of ${name}`;
			} else{
				type = ITJ[type];
				if(!this.identified&&type==='scroll'&&!halluc)
					name += `と名付けられた${type}`;
				else
					name += `の${type}`;
			}
			if(this.charges>=0&&this.identified&&!halluc) name += ` [${this.charges}]`; 
		} else if((type==='light'||type==='oil')&&this.identified&&!halluc){
			let duration = type==='oil'? this.duration:
							Math.ceil(this.duration/this.durationMax*100)+'%';
			name += ` [${duration}]`;
		} else if(type==='material'&&!halluc){
			 type = materialMap.get(this.material).name[a];
			 name = a===ENG? `${type} of ${name}`:`${name}の${type}`;
		}
		if(this.equipable&&!halluc){
			let string = '';
			if(this.weapon){
				if(this.twoHanded) string += ' (2H)';
				string += ` (${this.dmgBase})`;
				// if(this.identified){
					// let dmgSign = this.dmgBonus>0? '+':'';
					// let rateSign = this.rateBonus>0? '+':'';
					// string += ` (${dmgSign}${this.dmgBonus}%,${rateSign}${this.rateBonus}%)`;
				// }
			} else if(this.armor){ 
				string += ` [${this.acSBase},${this.acTBase},${this.acBBase}]`;
				// if(this.identified){
					// let rateSign = this.acBonus>0? '+':'';
					// string += ` (${rateSign}${this.acBonus}%)`;
				// }
			}
			name += string;
			if(this.identified){
				if(this.cursed) name = (a===ENG? 'Cursed ':'呪われた')+name;
				name += ` {${this.durab}}`;
				// let durab = Math.ceil(this.durab/this.durabMax*100);
				// name += ` {${durab}%}`;
				if(this.embeddedMax) name += ` <${this.embeddedNum}/${this.embeddedMax}>`;
			} else
				name += a===ENG? ' (Unid)':' (未識別)';
		}
		if(quantity>1) name += ` x${quantity}`;
		return name;
	}
	
	split(quantity,list){
		let item = {};
		copyObj(item,this);
		item.__proto__ = Item.prototype;
		item.quantity = quantity;
		this.quantity -= quantity;
		if(!this.quantity){
			let a = this.indexOf(list);
			if(this.place===P_BOX||this.place===P_EQUIPMENT)
				list[a] = null;
			else if(this.place===P_STASH)
				list.splice(a,1);
			else
				deleteAndSortItem(list,a);
			if(this.place===P_FLOOR) delete Item.list[item.id];
		}
		return item;
	}
}

Item.list = {};

const creation = {
	input(keyCode){
		if(keyCode!==13){ //Enter
			if(keyCode>=48&&keyCode<=57)
				this.string += String(getNumber(keyCode));
			else if(keyCode>=65&&keyCode<=90)
				this.string += getAlphabet(keyCode);
			else if(keyCode===32)
				this.string += ' ';
			else if(keyCode===8)
				this.string = this.string.substr(0,this.string.length-1);
			else if(keyCode===40&&this.stringSave) //down
				this.string = this.stringSave;
			else if(!keyCode) //init
				this.string = '';
			message.draw(this.string,true);
			return;
		}
		this.stringSave = this.string;
		let [type, num, num2, num3] = this.string.split(' ').map((element)=>
			isNaN(Number(element))? element:Number(element));
		if(flag.create===ITEM){
			if(type==='coin'){
				if(num>0){
					rogue.purse += num;
					rogue.drawStats();
				} else{
					message.draw('Incorrect syntax');
				}
			} else if((num2===ud||num2>0)&&itemTab[type]&&itemTab[type].has(num)){
				rogue.createItemIntoPack(1,type,num,num2,num3);
			} else
				message.draw('Incorrect syntax');
		} else if(flag.create===FIGHTER){
			if(fighterTab[type]&&fighterTab[type][num]){
				this.enemy(1,type,num,LOCATION,rogue.x,rogue.y,true);
				map.draw(rogue.x,rogue.y);
			} else
				message.draw('Incorrect syntax');
		}
		inventory.clear();
		flag.create = false;
		flag.regular = true;
	},
	dungeon(){
		map.init();
		dungeon.create();
		let boss = rogue.cdl===33&&!difficulty.inferno;
		if(boss) this.enemy(1,'misc',2,RANDOM);
		this.stairs(rndIntBet(MIN_STAIRS_NUM,MAX_STAIRS_NUM),boss? UP:RANDOM,INIT);
		this.trap(rndIntBet(MIN_TRAP_NUM,MAX_TRAP_NUM,RANDOM,RANDOM),RANDOM,INIT);
		rogue.putDown();
		this.enemy(10,RANDOM,RANDOM,INIT);
		this.item(10,RANDOM,RANDOM,1,INIT);
		map.draw(rogue.x,rogue.y);
		let track = audio.getDungeonTrack(rogue.cdl,boss);
		if(audio.curTrack!==track){
			audio.stop(audio.curTrack);
			audio.playMusic(track);
		}
	},
	town(){
		map.init(true);
		town.createAll();
		this.stairs(1,DOWN,LOCATION,POSITION.hell.x,POSITION.hell.y,true);
		rogue.putDown(true);
		map.draw(rogue.x,rogue.y); 
		audio.stop(audio.curTrack);
		audio.playMusic(!difficulty.inferno? 'town1':'town2');
		initShopItem();
	},
	enemy(times=1,type,tabId,position,x,y,summon,magic,bias,boost){
		if(!bias) bias = RANDOM;
		if(!boost) boost = rogue.cdl===0? 1:0;
		let lvl = rogue.cdl+boost;
		for(let i=0;i<times;i++){
			let [typeT, tabIdT] = [type, tabId];
			if(type===ud||type===RANDOM){
				do	typeT = FT[rndInt(FT.length-2)];
				while(fighterTab[typeT][0].lvl>lvl);
			}
			let fighter;
			if(tabId===ud||tabId===RANDOM){
				let j = 0;
				let fighterNums = fighterNumsMap.get(typeT);
				fighterNums.shuffle();
				do{
					tabIdT = fighterNums[j++];
					if(tabIdT===ud) return; //
					fighter = fighterTab[typeT][tabIdT];
				} while(fighter.mod===UNIQUE&&rogue.cue[fighter.name[ENG]]
				||fighter.lvl>lvl||evalPercentage(fighter.rarity));
			} else
				fighter = fighterTab[typeT][tabIdT];
			let count = fighter.group? rndIntBet(2,4):1;
			let [posT, xT, yT] = [position, x, y];
			for(let j=0;j<count;j++){
				let fighterNew = new Enemy(fighter);
				fighterNew.init(posT,xT,yT,summon,magic,bias,lvl);
				if(fighter.group&&posT!==LOCATION){
					posT = LOCATION;
					[xT, yT] = [fighterNew.x, fighterNew.y];
				}
			}
		}
	},
	enemyList(){
		this.enemies = {};
		for(let key in fighterTab){
			for(let fighter of fighterTab[key])
				this.enemies[`${fighter.lvl},${fighter.mod},${key}`] = fighter.name['b'];
		}
	},
	item(times=1,type,tabId,quantity=1,position,x,y,magic,boost,lvl,uniqueId,starter,matBase,matId){
		if(!boost) boost = !rogue.cdl? 1:0;
		if(!lvl) lvl = rogue.cdl+boost;
		if(uniqueId>=0) magic = true;
		for(let i=0;i<times;i++){
			let [typeT, tabIdT] = [type, tabId];
			if(type===ud||type===RANDOM){
				do{	if(magic)
						typeT = equipmentList[rndInt(equipmentList.length-1)];
					else
						typeT = IT[rndInt(IT.length-2)];
				} while(evalPercentage(RARITY[typeT])||flag.shop&&typeT==='coin');
			}
			let item;
			if(tabId===ud||tabId===RANDOM){
				let j = 0;
				let itemNums = itemNumsMap.get(typeT);
				itemNums.shuffle();
				do{
					tabIdT = itemNums[j++];
					item = itemTab[typeT].get(tabIdT);
				} while(item.lvl>lvl||evalPercentage(item.rarity)
				||rogue.lethe&&item.lethe)
			} else
				item = itemTab[typeT].get(tabIdT);
			if(item.lethe) rogue.lethe++;
			let itemNew = new Item(item, quantity);
			itemNew.init(position,x,y,magic,lvl,uniqueId,starter,matBase,matId);
			if(position===LIST){
				itemNew.place = flag.shop? P_SHOP:P_PACK;
				return itemNew;
			}
		}
	},
	itemList(){
		this.items = {};
		flag.shop = true;
		for(let type of equipmentList){
			this.items[type] = [];
			for(let [tabId, item] of itemTab[type]){
				let i = 0;
				materialList.shuffle();
				while(!(item.material&materialList[i])) i++;
				let matBase = materialList[i];
				let materials = materialMap.get(matBase);
				for(let i=0,l=materials.list.length;i<l;i++){
					let item = this.item(1,type,tabId,1,LIST,ud,ud,ud,ud,99,ud,ud,matBase,i);
					item.embeddedMax = 0;
					let name = item.getName();
					this.items[type].push(`${name},${item.weight}kg`);
				}
			}
		}
		flag.shop = false;
	},
	trap(times,tabId,position,x,y,show){
		for(let i=0;i<times;i++){
			let tabIdT = tabId;
			if(tabId===ud||tabId===RANDOM)
				tabIdT = rndInt(trapTab.length-1);
			let trap = new Trap(trapTab[tabIdT],!show);
			trap.init(position,x,y);
		}
	},
	stairs(times,tabId,position,x,y,show){
		for(let i=0;i<times;i++){
			let tabIdT = tabId;
			if(position===INIT){
				if(tabId===RANDOM) tabIdT = i%2? DOWN:UP;
				show = i<=1||coinToss();
			} else if(tabId===RANDOM)
				tabIdT = coinToss()? DOWN:UP;
			let staircase = new Staircase(stairsMap.get(tabIdT),!show);
			staircase.init(position,x,y);
		}
	},
};

const searchItemToIdentifiy = {
	main(nameReal,type){
		if(type==='wand'){
			this.loop(rogue.pack,nameReal,type);
			this.loop(rogue.boxes,nameReal,type);
		}
		this.loop(Item.list,nameReal,type);
		for(let key in Enemy.list)
			this.loop(Enemy.list[key].pack,nameReal,type);
	},
	loop(list,nameReal,type){
		for(let key in list){
			let item = list[key];
			if(item&&item.type===type&&item.nameReal[ENG]===nameReal){
				if(item.type!=='wand') item.identified = true;
				item.changeNameAndPrice()
			}
		}
	}
};
document.onkeyup = function(e){
	if(e.keyCode===16) isShift = false; //Shift
	if(e.keyCode===17) isCtrl = false; //Ctrl
}

document.onkeydown = function(e){
	if(flag.wait){
		queue.moveAll();
		return false;
	}
	if(e.keyCode===16) isShift = true; //Shift
	if(e.keyCode===17) isCtrl = true; //Ctrl
	if((flag.dash||flag.rest)&&e.keyCode!==16){
		message.draw(message.get(M_INTERRUPTED));
		flag.dash = flag.rest = false;
		return false;
	}
		
	if(flag.equipment||flag.inventory) inventory.clear();
	if(e.keyCode!==16&&e.keyCode!==17){
		if(flag.clearInv){
			inventory.clear();
			flag.clearInv = false;
		}
	}
	if(e.keyCode===27||e.keyCode===32) message.clear();
	if(flag.regular){
		switch (e.keyCode){
			case 72: //h
			case 74: //j
			case 75: //k
			case 76: //l
			case 89: //y
			case 66: //b
			case 85: //u
			case 78: //n
			case 37: //left arrow
			case 38: //up arrow
			case 39: //right arrow
			case 40: //down arrow
			case 97: //T1
			case 98: //T2
			case 99: //T3
			case 100: //T4
			case 102: //T6
			case 103: //T7
			case 104: //T8
			case 105: //T9
				if(e.altKey)
					rogue.attackStationary(e.keyCode);
				else if(!isShift)
					rogue.move(e.keyCode);
				else
					rogue.dash(e.keyCode);
				break;
			case  79: //o openDoor
			case  87: //w equip
				if(!isShift&&!isCtrl)
					rogue.eventFlag(e.keyCode); 
				break;
			case  65: //a add bookmark, A alchemy ^a *create monster*
				if(!isShift&&!isCtrl||isShift&&!isCtrl||isCtrl&&wizard)
					rogue.eventFlag(e.keyCode); 
				break;
			case  90: //z zap, ^z *indestructible*
				if(isCtrl&&wizard)
					rogue.indestructible = !rogue.indestructible;
				else
					rogue.eventFlag(e.keyCode); 
				break;
			case  68: //d drop, ^d destroy, 
				if(!isShift)
					rogue.eventFlag(e.keyCode); 
				break;
			case  83: //s searching, S swap, ^s 
				if(!isShift&&!isCtrl)
					rogue.searchHiddenObject();
				else if(!isCtrl)
					rogue.swap();
				else if(isCtrl)
					data.save();
				break;
			case  69: //e equipmentList, E eat, ^e *enlightenment*
				if(isCtrl&&wizard){
					map.lighten();
					map.draw(rogue.x,rogue.y);
				} else if(isShift)
					rogue.eventFlag(e.keyCode);
				else
					flag.equipment = !flag.equipment;
				break;
			case  73: //i inventory, I investigate, ^i *create item*
				if(!isCtrl&&!isShift)
					flag.inventory = !flag.inventory;
				else if(!isCtrl||wizard)
					rogue.eventFlag(e.keyCode); 
				break;
			case  84: //t ,T unequip
				rogue.eventFlag(e.keyCode);
				break;
			case 190: //. stap on, > down stairs
			case 110: //T.
				if(e.keyCode===110||!isShift){
					if(!coords[rogue.x][rogue.y].getInfor(true)) rogue.done = true;
				}else
					rogue.downOrUpStairs(e.keyCode);
				break;
			case 188: //<
				if(isShift)
					rogue.downOrUpStairs(e.keyCode);
				break;
			case  70: //f
				if(isShift)
					rogue.eventFlag(e.keyCode);
				break;
			case  71: //g
				if(isShift)
					rogue.eventFlag(e.keyCode);
				else
					rogue.grabItem();
				break;
			case  81: //q quaff, Q quit, ^q *create trap*
				if(isCtrl&&wizard){
					rogue.haveCast(CREATE_TRAP,10,this);
					map.draw(rogue.x,rogue.y);
				} else if(!isCtrl&&isShift)
					rogue.eventFlag(e.keyCode); 
				else if(!isCtrl&&!isShift)
					rogue.eventFlag(e.keyCode); 
				break;
			case  77: //m skill, M minimap
				if(!isCtrl)
					rogue.eventFlag(e.keyCode);
				break;
			case  82: //r read,^r redraw
				if(isCtrl&&!isShift){
					map.redraw(rogue.x,rogue.y);
					map.draw(rogue.x,rogue.y);
				} else if(isShift){
					flag.rest = true;
					rogue.rest();
				} else
					rogue.eventFlag(e.keyCode); 
				break;
			case 191: //? help
				if(isShift)
					rogue.eventFlag(e.keyCode); 
				break;
			case  80: //p pack sort, ^p previous message
				if(!isShift)
					rogue.eventFlag(e.keyCode); 
				break;
			case  67: //c close door, C character description
				if(isShift){
					rogue.investigate(MIDDLE,true);
					flag.clearInv = true;
				} else
					rogue.eventFlag(e.keyCode); 
				break;
			case  88: //x examine, ^x exit 
				if(isCtrl&&!isShift)
					data.exit();
				else if(!isCtrl&&!isShift)
					rogue.eventFlag(e.keyCode);
				break;
			case 187: //= option
			case 189: //JIS keyboard
					rogue.eventFlag(e.keyCode);
			case  49: //1~9
			case  50:
			case  51:
			case  52:
			case  53:
			case  54:
			case  55:
			case  56:
			case  57: 
				rogue.useBoxItem(e.keyCode);
				break;
			case 112: //F1~F12
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119: 
			case 120:
			case 121:
			case 122:
			case 123: 
				rogue.castBookmarkedSkill(e.keyCode);
				break;
			default:
				break;
		}
	} else if(!flag.died&&!flag.retry&&(e.keyCode===27||(!flag.create&&e.keyCode==32)||(flag.message&&e.keyCode===80&&isCtrl))){ //ESC,  Space, ^p
		rogue.cancelCommand();
	} else if(flag.number){
		rogue.inputNumber(e.keyCode);
	} else if(flag.openDoor||flag.closeDoor){
		rogue.openOrCloseDoor(e.keyCode);
	} else if(flag.investigate){
		rogue.investigateOne(e.keyCode);
	} else if(flag.drop){
		rogue.drop(e.keyCode);
	} else if(flag.destroy){
		rogue.destroy(e.keyCode);
	} else if (flag.equip){
		rogue.equip(e.keyCode);
	} else if(flag.unequip){
		rogue.unequip(e.keyCode);
	} else if(flag.eat){
		rogue.eat(e.keyCode);
	} else if(flag.quaff){
		rogue.quaffPotion(e.keyCode);
	} else if(flag.read){
		rogue.read(e.keyCode);
	} else if(flag.synthesize){
		rogue.synthesize(e.keyCode);
	} else if(flag.grab){
		rogue.grabItem(e.keyCode);
	} else if(flag.examine){
		rogue.examine(e.keyCode);
	} else if(flag.identify){
		rogue.identify(e.keyCode);
	} else if(flag.repair||flag.blacksmith){
		rogue.repair(e.keyCode);
	} else if(flag.disint){
		rogue.disintegrate(e.keyCode);
	} else if(flag.aim){
		rogue.aim(e.keyCode);
	} else if(flag.zap){
		rogue.zap(e.keyCode);
	} else if(flag.skill){
		rogue.castSkill(e.keyCode);
	} else if(flag.sortSkill){
		rogue.sortSkill(e.keyCode);
	} else if(flag.message){
		message.previous(e.keyCode);
	} else if(flag.pack){
		rogue.packOrUnpack(e.keyCode);
	} else if(flag.bookmark){
		rogue.addOrRemoveBookmark(e.keyCode);
	} else if(flag.gain){
		rogue.gainStatOrSkill(e.keyCode);
	} else if(flag.fuel){
		rogue.fuel(e.keyCode);
	} else if(flag.shop){
		rogue.shop(e.keyCode);
	} else if(flag.cure){
		rogue.cureShop(e.keyCode);
	} else if(flag.stash){
		rogue.stash(e.keyCode);
	} else if(flag.help&&e.keyCode===191&&isShift){ //?
		inventory.clear();
		flag.help = false;
		flag.regular = true;
	} else if(flag.create){
		creation.input(e.keyCode);
	} else if(flag.minimap){
		minimap.draw(e.keyCode);
	} else if(flag.option){
		option.main(e.keyCode);
	} else if(flag.quit){
		quit(e.keyCode);
	}
	
	if(flag.died&&e.keyCode===13){ //Enter
		if(wizard&&rogue)
			rogue.revive();
		else if(!flag.retry)
			gameOver();
		else
			data.load();
	} else if(!flag.died){
		if(rogue.done){
			rogue.decreaseEnergy();
			queue.moveAll();
		}
		if(flag.equipment){
			if(flag.regular&&e.keyCode!==27&&e.keyCode!==32&&!flag.clearInv) //Esc, Back space
				rogue.equipmentList();
			else
				flag.equipment = false;
		}
		if(flag.inventory){
			if(flag.regular&&e.keyCode!==27&&e.keyCode!==32&&!flag.clearInv)
				rogue.showInventory(P_PACK);
			else
				flag.inventory = false;
		}
	}
	//^m
	if(e.keyCode===77&&isCtrl) audio.mute();
	//disable browser shortcuts
	if(!isShift||!isCtrl||e.keyCode!==73) return false;
}

const initFlag =()=>{
	for(let key in flag)
		flag[key] = key==='regular';
}

const help = {
	main(){
		inventory.shadow(MIDDLE);
		this.i = 1;
		this.j = MS+1;
		this.loop(CL);
		if(wizard) this.loop(CLW);
	},
	loop(list){
		for(let key in list){
			ctsInv.save();
			ctsInv.fillText(key,(this.i-0.5)*fs,this.j*fs);
			ctsInv.textAlign = 'left';
			ctsInv.fillText(list[key][rogue.cl],(this.i+4)*fs,(this.j++)*fs);
			ctsInv.restore();
			if(this.j===IN_HEIGHT){
				this.j = MS+1;
				this.i += 14;
			}
		}
	}
};

const callTitle =()=>{
	clearAll();
	ctsInv.save();
	ctsInv.textAlign='center'
	ctsInv.font = '40px Arial';
	ctsInv.fillText('Death and Birth',IN_WIDTH/2*fs,IN_HEIGHT/2*fs);
	ctsInv.font = '20px Arial';
	ctsInv.fillText(option.language.user===ENG?
	'[Enter] to start'
	:'[Enter] 開始',IN_WIDTH/2*fs,(IN_HEIGHT/2+2)*fs);
	ctsInv.restore();
	flag.retry = true;
	audio.stop(audio.curTrack);
	audio.playMusic('title');
}

const quit =(keyCode,save)=>{
	if(keyCode!==89&&keyCode!==78)	return; //y, n
	if(keyCode===78){
		flag.quit = false;
		flag.regular = true;
		inventory.clear();
		return;
	}
	flag.died = true;
	flag.regular = false;
	callTitle();
	if(!save) data.delete('Player');
	rogue = null;
}

const clearAll =()=>{
	ctxBuf.clearRect(0,0,canvas.width*2,canvas.height*2);
	ctxMain.clearRect(0,0,canvas.width,canvas.height);
	ctsInv.clearRect(0,0,canvas.width,canvas.height);
	ctxStats.clearRect(0,0,canvas.width,canvas.height);
	ctxMsg.clearRect(0,0,canvas.width,canvas.height);
	// ctxMap.clearRect(0,0,canvas.width,canvas.height);
}

const gameOver =()=>{
	clearAll();
	ctsInv.save();
	ctsInv.textAlign='center'
	ctsInv.font = '40px Arial';
	ctsInv.fillText('G A M E  O V E R',IN_WIDTH/2*fs,IN_HEIGHT/2*fs);
	ctsInv.font = '20px Arial';
	ctsInv.fillText(option.language.user===ENG?
	'[Enter] to retry'
	:'[Enter] リトライ',IN_WIDTH/2*fs,(IN_HEIGHT/2+2)*fs);
	ctsInv.restore();
	flag.retry = true;
}

const initialize =()=>{
	initFlag();
	initTab();
	audio.init();
	difficulty.init();
	rogue = new Rogue();
	rogue.init();
	enter[STASH].list = [];
	message.list = [];
	message.clear(true);
	clearLevel();
}

const clearLevel =()=>{
	clearAll();
	rogue.checkUnique();
	Enemy.list = {};
	Item.list = {};
	Staircase.list = {};
	rogue.numSteps = 0;
	rogue.ce = null;
	queue.list = []; 
	rogue.portal.x = rogue.portal.y = 0;
	litMapIds = {};
}

display.change(option.display.user);
callTitle();
