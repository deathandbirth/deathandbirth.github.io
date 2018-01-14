const trapTab = [
	{
		name: { a: 'Protection', b: '守り' },
		symbol: ';',
		color: colorList.white,
		circle: true,
		protection: true
	},

	{
		name: { a: 'Teleportation', b: 'テレポート' },
		symbol: ';',
		color: colorList.skyblue,
		circle: true,
		nameSkill: TELEPORTATION,
		lvl: 10,
	},

	{
		name: { a: 'Summons', b: '召喚' },
		symbol: ';',
		color: colorList.purple,
		circle: true,
		nameSkill: CREATE_MONSTER,
		lvl: 10,
	},

	{
		name: { a: 'Life Regeneration', b: '再生' },
		symbol: ';',
		color: colorList.coral,
		circle: true,
		nameSkill: LIFE_REGENERATION,
		lvl: 10,
	},

	{
		name: { a: 'Mana Regeneration', b: '魔力再生' },
		symbol: ';',
		color: colorList.lightblue,
		circle: true,
		nameSkill: MANA_REGENERATION,
		lvl: 10,
	},

	{
		name: { a: 'Experience', b: '経験' },
		symbol: ';',
		color: colorList.bronze,
		circle: true,
		nameSkill: EXPERIENCE,
		lvl: 10,
	},

	{
		name: { a: 'Skill', b: 'スキル' },
		symbol: ';',
		color: colorList.gold,
		circle: true,
		nameSkill: SKILL,
		lvl: 3,
	},

	{
		name: { a: 'Magic Finding', b: '魔法具探求' },
		symbol: ';',
		color: colorList.aqua,
		circle: true,
		nameSkill: MAGIC_FINDING,
		lvl: 10,
	},

	{
		name: { a: 'Gold Finding', b: '財宝探求' },
		symbol: ';',
		color: colorList.yellow,
		circle: true,
		nameSkill: GOLD_FINDING,
		lvl: 10,
	},

	{
		name: { a: 'Resist Fire', b: '耐火' },
		symbol: ';',
		color: colorList.fire,
		circle: true,
		nameSkill: RESIST_FIRE,
		lvl: 10,
	},

	{
		name: { a: 'Resist Water', b: '耐水' },
		symbol: ';',
		color: colorList.water,
		circle: true,
		nameSkill: RESIST_WATER,
		lvl: 10,
	},

	{
		name: { a: 'Resist Air', b: '耐風' },
		symbol: ';',
		color: colorList.air,
		circle: true,
		nameSkill: RESIST_AIR,
		lvl: 10,
	},

	{
		name: { a: 'Resist Earth', b: '耐土' },
		symbol: ';',
		color: colorList.earth,
		circle: true,
		nameSkill: RESIST_EARTH,
		lvl: 10,
	},

	{
		name: { a: 'Resist Poison', b: '耐毒' },
		symbol: ';',
		color: colorList.poison,
		circle: true,
		nameSkill: RESIST_POISON,
		lvl: 10,
	},

	{
		name: { a: 'Combat', b: '戦闘' },
		symbol: ';',
		color: colorList.steel,
		circle: true,
		nameSkill: ENCOURAGEMENT,
		lvl: 10,
	},

	{
		name: { a: 'Armor', b: '防護' },
		symbol: ';',
		color: colorList.brass,
		circle: true,
		nameSkill: BLESSING,
		lvl: 10,
	},

	{
		name: { a: 'Trap Door', b: '隠し扉の罠' },
		symbol: '^',
		color: colorList.white
	},

	{
		name: { a: 'Bear Trap', b: '虎挟み' },
		symbol: '^',
		color: colorList.shadow
	},

	{
		name: { a: 'Arrow Trap', b: '矢の罠' },
		symbol: '^',
		color: colorList.white
	},

	{
		name: { a: 'Weakness', b: '薄弱' },
		symbol: '^',
		color: colorList.poison,
		dart: true,
		nameSkill: WEAKNESS,
		lvl: 1,
	},

	{
		name: { a: 'Clumsiness', b: '不器用' },
		symbol: '^',
		color: colorList.poison,
		dart: true,
		nameSkill: CLUMSINESS,
		lvl: 1,
	},

	{
		name: { a: 'Sickliness', b: '病弱' },
		symbol: '^',
		color: colorList.poison,
		dart: true,
		nameSkill: SICKLINESS,
		lvl: 1,
	},

	{
		name: { a: 'Stupidity', b: '愚鈍' },
		symbol: '^',
		color: colorList.poison,
		dart: true,
		nameSkill: STUPIDITY,
		lvl: 1,
	},

	{
		name: { a: 'Poison', b: '毒' },
		symbol: '^',
		color: colorList.poison,
		gas: true,
		nameSkill: POISON,
		lvl: 1,
	},

	{
		name: { a: 'Sleepness', b: '睡眠' },
		symbol: '^',
		color: colorList.royalblue,
		gas: true,
		nameSkill: SLEEP,
		lvl: 1,
	},

	{
		name: { a: 'Hallucination', b: '幻覚' },
		symbol: '^',
		color: colorList.purple,
		gas: true,
		nameSkill: HALLUCINATION,
		lvl: 1,
	},

	{
		name: { a: 'Paralysis', b: '麻痺' },
		symbol: '^',
		color: colorList.orange,
		gas: true,
		nameSkill: PARALYSIS,
		lvl: 1,
	},

	{
		name: { a: 'Confusion', b: '混乱' },
		symbol: '^',
		color: colorList.yellow,
		gas: true,
		nameSkill: CONFUSION,
		lvl: 1,
	},

	{
		name: { a: 'Blindness', b: '盲目' },
		symbol: '^',
		color: colorList.gray,
		gas: true,
		nameSkill: BLINDNESS,
		lvl: 1,
	},

	{
		name: { a: 'Bacteria', b: '細菌' },
		symbol: '^',
		color: colorList.infection,
		gas: true,
		nameSkill: INFECTION,
		lvl: 1,
	},
];

const Trap = class extends Thing {
	constructor(obj, hidden) {
		super(obj);
		this.hidden = hidden;
	}

	putDown(x, y) {
		this.spiralSearch(x, y, TRAP);
		if (this.abort) return;
		let loc = map.coords[this.x][this.y];
		loc.trap = this;
		loc.hidden = this.hidden;
		if (!this.hidden) loc.draw();
	}

	getName() {
		let name = this.name[option.getLanguage()];
		if (this.circle) {
			if (option.isEnglish()) {
				name = `Magic Circle of ${name}`;
			} else {
				name = `${name}の魔法円`;
			}
		} else if (this.dart) {
			if (option.isEnglish()) {
				name = `Dart Trap(${name})`;
			} else {
				name = `投げ矢の罠(${name})`;
			}
		} else if (this.gas) {
			if (option.isEnglish()) {
				name = `Gas Trap of ${name}`;
			} else {
				name = `${name}ガスの罠`;
			}
		}

		return name;
	}
}
