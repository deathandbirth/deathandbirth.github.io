const fighterTab = {
    ants: [
		{
			name: { a: 'Giant Ant', b: '巨蟻' },
			symbol: 'a',
			color: colorList.acid,
			race: ANIMAL,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 8,
			rarity: 0,
			hpRate: -2,
			mpRate: 0,
			str: 3,
			dex: 2,
			con: 3,
			int: 1,
			spd: 0,
			dmgBase: '1d2',
			acBase: 5,
			dropNum: 0,
			matRedTimes: 3,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_SHELL,
			atkType: AT_T,
			group: true,
			dmgAcid: 20
		},
	],

    bats: [
		{
			name: { a: 'Giant Bat', b: '大蝙蝠' },
			symbol: 'b',
			color: colorList.gray,
			race: ANIMAL,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 4,
			rarity: 0,
			hpRate: -3,
			mpRate: 0,
			str: 1,
			dex: 2,
			con: 1,
			int: 1,
			spd: 5,
			dmgBase: '1d2',
			acBase: 5,
			dropNum: 0,
			matRedTimes: 3,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_FEATHER,
			atkType: AT_T,
			grow: DEX,
			stealLife: 10
		},
	],

    canines: [
		{
            name: { a: 'She-wolf', b: '雌狼' },
            symbol: 'c',
            color: colorList.brown,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: -2,
            mpRate: 0,
            str: 1,
            dex: 2,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: '1d3',
            acBase: 5,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_S | AT_T,
            grow: DEX,
            frw: 20
		},
		
        {
            name: { a: 'Laelaps, the Hound of Cephalus', b: '狩人ケパロスの猟犬ラエラプス' },
            symbol: 'c',
            color: colorList.brown,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: -2,
            mpRate: 0,
            str: 10,
            dex: 10,
            con: 5,
            int: 5,
            spd: 20,
            dmgBase: '2d6',
            acBase: 10,
            dropNum: 2,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_S | AT_T
        },
	],
	
    felines: [
		{
            name: { a: 'Lion', b: '獅子' },
            symbol: 'f',
            color: colorList.yellow,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 10,
            dex: 5,
            con: 5,
            int: 1,
            spd: 5,
            dmgBase: '2d3',
            acBase: 10,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_S | AT_T,
            grow: STR
		},
		
        {
            name: { a: 'Nemean lion', b: 'ネメアの獅子' },
            symbol: 'f',
            color: colorList.yellow,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 15,
            dex: 10,
            con: 10,
            int: 5,
            spd: 10,
            dmgBase: '5d3',
            acBase: 20,
            dropNum: 2,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_S | AT_T
        },
	],
	
    golems: [
		{
            name: { a: 'Golem', b: 'ゴーレム' },
            symbol: 'g',
            color: null,
            race: GIANT,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 10,
            dex: 3,
            con: 10,
            int: 1,
            spd: -10,
            dmgBase: null,
            acBase: null,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_STONE,
            atkType: AT_B,
            grow: CON,
            volumeRate: 1
		},
		
        {
            name: { a: 'Golem', b: 'ゴーレム' },
            symbol: 'g',
            color: null,
            race: GIANT,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 10,
            hpRate: 2,
            mpRate: 0,
            str: 10,
            dex: 3,
            con: 10,
            int: 1,
            spd: 0,
            dmgBase: null,
            acBase: null,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_METAL,
            atkType: AT_T,
            grow: CON,
            volumeRate: 2
		},
		
        {
            name: { a: 'Golem', b: 'ゴーレム' },
            symbol: 'g',
            color: null,
            race: GIANT,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 30,
            rarity: 20,
            hpRate: 2,
            mpRate: 0,
            str: 10,
            dex: 3,
            con: 10,
            int: 1,
            spd: 10,
            dmgBase: null,
            acBase: null,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_GEM,
            atkType: AT_S,
            grow: CON,
            volumeRate: 3
        },
	],
	
    humanoids: [
		{
            name: { a: 'Snake Woman', b: '蛇女' },
            symbol: 'h',
            color: colorList.green,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 8,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 3,
            dex: 2,
            con: 4,
            int: 2,
            spd: 0,
            dmgBase: '1d3',
            acBase: 5,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 30,
            atkType: AT_B,
            atkCon: 20
		},
		
        {
            name: { a: 'Calypso, the Sea Goddess', b: '海の女神カリュプソ' },
            symbol: 'h',
            color: colorList.blue,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 20,
            dex: 20,
            con: 15,
            int: 20,
            spd: 15,
            dmgBase: '4d6',
            acBase: 20,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 50,
            air: 0,
            earth: 0,
            poison: 0,
            atkType: AT_B,
            strSus: true,
            dexSus: true,
            conSus: true,
            intSus: true,
            skillProb: 1 / 4,
            skill: { 
				a: { id: ICE_BOLT, lvl: 10 },
				b: { id: HEAL, lvl: 10 },
				c: { id: AQUA_BREATH, lvl: 10 }
			}
        },
	],
	
    incubuses: [
		{
			name: { a: 'Incubuses', b: '夢魔' },
			symbol: 'i',
			color: colorList.gray,
			race: DEMON,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 25,
			rarity: 0,
			hpRate: 0,
			mpRate: 0,
			str: 15,
			dex: 15,
			con: 10,
			int: 15,
			spd: 10,
			dmgBase: '2d6',
			acBase: 20,
			dropNum: 2,
			matRedTimes: 2,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_SKIN,
			atkType: AT_S,
			awake: true,
			levi: true,
			stealMana: 50
		},
	],

    mimics: [
		{
			name: { a: 'Mimic', b: 'ミミック' },
			symbol: 'm',
			color: colorList.brown,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 10,
			rarity: 0,
			hpRate: 0,
			mpRate: 0,
			str: 5,
			dex: 5,
			con: 1,
			int: 1,
			spd: 0,
			dmgBase: '3d4',
			acBase: 10,
			dropNum: 1,
			matRedTimes: 1,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			atkType: AT_B,
			mimic: true,
			stillness: true,
			awake: true,
		},
	],

    persons: [
		{
            name: { a: 'Warrior', b: '戦士' },
            symbol: 'p',
            color: colorList.brown,
            race: HUMAN,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 6,
            rarity: 0,
            hpRate: 1,
            mpRate: 0,
            str: 3,
            dex: 3,
            con: 3,
            int: 1,
            spd: 0,
            dmgBase: '1d1',
            acBase: 10,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            grow: STR,
            starter: [
				{ type: 'melee', tabId: M_CLUB },
				{ type: 'armor', tabId: A_ARMOR }
			]
		},
		
        {
            name: { a: 'Hunter', b: '狩人' },
            symbol: 'p',
            color: colorList.red,
            race: HUMAN,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 2,
            dex: 5,
            con: 1,
            int: 3,
            spd: 0,
            dmgBase: '1d1',
            acBase: 3,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            grow: DEX,
            starter: [
				{ type: 'missile', tabId: M_BOW },
				{ type: 'ammo', tabId: A_ARROW },
				{ type: 'armor', tabId: A_VEST },
				{ type: 'melee', tabId: M_KNIFE, side: 'a' }
			]
		},
		
        {
            name: { a: 'Magus', b: '魔術師' },
            symbol: 'p',
            color: colorList.purple,
            race: HUMAN,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 15,
            rarity: 0,
            hpRate: -2,
            mpRate: 2,
            str: 1,
            dex: 1,
            con: 1,
            int: 10,
            spd: 0,
            dmgBase: '1d1',
            acBase: 1,
            dropNum: 2,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            skillProb: 1 / 5,
            skill: { 
				a: { id: FIRE_BOLT, lvl: 10 },
				b: { id: SHORT_TELEPORTATION, lvl: 1 }
			},

            material: M_BONE,
            atkType: AT_B,
            grow: INT,
            starter: [
				{ type: 'staff', tabId: S_STAFF },
				{ type: 'armor', tabId: A_ROBE }
			]
		},
		
        {
            name: { a: 'Thief', b: '盗賊' },
            symbol: 'p',
            color: colorList.gray,
            race: HUMAN,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 5,
            dex: 10,
            con: 5,
            int: 5,
            spd: 5,
            dmgBase: '1d1',
            acBase: 5,
            dropNum: 2,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            atkStealItem: 20,
            atkStealGold: 20,
            stealth: 25,
            grow: DEX,
            starter: [
				{ type: 'melee', tabId: M_DAGGER },
				{ type: 'armor', tabId: A_VEST }
			]
		},
		
        {
            name: { a: 'Iros, the Beggar', b: '乞食イロス' },
            symbol: 'p',
            color: colorList.brown,
            race: HUMAN,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 5,
            rarity: 30,
            hpRate: -2,
            mpRate: 0,
            str: 5,
            dex: 5,
            con: 5,
            int: 5,
            spd: 0,
            dmgBase: '1d1',
            acBase: 5,
            dropNum: 1,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            atkStealItem: 20,
            starter: [{ type: 'armor', tabId: A_ROBE }]
		},
		
        {
            name: { a: 'Dolon, the Spy', b: '偵察者ドロン' },
            symbol: 'p',
            color: colorList.bronze,
            race: HUMAN,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 10,
            rarity: 30,
            hpRate: -1,
            mpRate: 0,
            str: 5,
            dex: 5,
            con: 5,
            int: 5,
            spd: 10,
            dmgBase: '1d1',
            acBase: 10,
            dropNum: 2,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            skillProb: 1 / 10,
            skill: {
				a: { id: SHORT_TELEPORTATION, lvl: 1 },
				b: { id: TELEPORTATION, lvl: 1 }
			}
		},
		
        {
            name: { a: 'Pandarus, the Archer of Troy', b: 'トロイアの射手パンダロス' },
            symbol: 'p',
            color: colorList.bronze,
            race: HUMAN,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 20,
            dex: 20,
            con: 20,
            int: 10,
            spd: 10,
            dmgBase: '1d1',
            acBase: 20,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            dexSus: true,
            starter: [
				{ type: 'missile', tabId: M_BOW, uniqueId: 0 },
				{ type: 'ammo', tabId: A_ARROW },
				{ type: 'melee', tabId: M_SPEAR, side: 'a' }
			],

            skillProb: 1 / 8,
            skill: {
				a: { id: SHORT_TELEPORTATION, lvl: 1 },
				b: { id: PARALYZING_ARROW, lvl: 5 }
			}
		},
		
        {
            name: { a: 'Nestor, the Knight of Gerenia', b: 'ゲレニアの騎士ネストル' },
            symbol: 'p',
            color: colorList.bronze,
            race: HUMAN,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 1,
            mpRate: 0,
            str: 15,
            dex: 20,
            con: 15,
            int: 25,
            spd: 10,
            dmgBase: '1d1',
            acBase: 40,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            strSus: true,
            dexSus: true,
            conSus: true,
            skillProb: 1 / 10,
            skill: {
				a: { id: TELEPORT_TO, lvl: 1 },
				b: { id: SPEED, lvl: 5 }
			}
		},
		
        {
            name: { a: 'Orlando, the Frenzy', b: '狂乱のオルランド' },
            symbol: 'p',
            color: colorList.orange,
            race: HUMAN,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 32,
            rarity: 30,
            hpRate: 3,
            mpRate: 0,
            str: 25,
            dex: 20,
            con: 25,
            int: 1,
            spd: 10,
            dmgBase: '4d4',
            acBase: 10,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            strSus: true,
            dexSus: true,
            conSus: true,
            awake: true,
            ias: 50,
            frw: 50
        },
	],
	
    quadrupeds: [
		{
            name: { a: 'Horse', b: '馬' },
            symbol: 'q',
            color: colorList.orange,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 3,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 2,
            dex: 3,
            con: 1,
            int: 1,
            spd: 10,
            dmgBase: '1d4',
            acBase: 5,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_SKIN,
            atkType: AT_B,
            frw: 60,
            grow: DEX
		},
		
        {
            name: { a: 'Rays of the Sun, the Horse of Rhesus', b: 'トラキア王レソスの馬 `陽光の矢`' },
            symbol: 'q',
            color: colorList.brown,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 10,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 5,
            dex: 5,
            con: 5,
            int: 5,
            spd: 10,
            dmgBase: '1d5',
            acBase: 10,
            dropNum: 2,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_SKIN,
            atkType: AT_B,
            frw: 60
		},
		
        {
            name: { a: 'Boar', b: '猪' },
            symbol: 'q',
            color: colorList.brown,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 2,
            rarity: 0,
            hpRate: 1,
            mpRate: 0,
            str: 2,
            dex: 2,
            con: 3,
            int: 1,
            spd: 5,
            dmgBase: '1d3',
            acBase: 5,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_B,
            grow: CON
		},
		
        {
            name: { a: 'Calydonian Boar', b: 'カリュドーンの大猪' },
            symbol: 'q',
            color: colorList.brown,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: 1,
            mpRate: 0,
            str: 20,
            dex: 10,
            con: 20,
            int: 10,
            spd: 10,
            dmgBase: '2d5',
            acBase: 20,
            matRedTimes: 0,
            dropNum: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_B,
        },
	],
	
    skeletons: [
		{
			name: { a: 'Skeleton', b: 'スケルトン' },
			symbol: 's',
			color: null,
			race: UNDEAD,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 3,
			rarity: 0,
			hpRate: -2,
			mpRate: 0,
			str: 1,
			dex: 1,
			con: 1,
			int: 1,
			spd: 0,
			dmgBase: null,
			acBase: null,
			dropNum: 0,
			matRedTimes: 3,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_BONE,
			atkType: AT_B,
			volumeRate: 1
		},
	],

    worms: [
		{
			name: { a: 'Giant Worm', b: '大芋虫' },
			symbol: 'w',
			color: colorList.white,
			race: ANIMAL,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 1,
			rarity: 0,
			hpRate: -2,
			mpRate: 0,
			str: 1,
			dex: 1,
			con: 1,
			int: 1,
			spd: -10,
			dmgBase: null,
			acBase: null,
			dropNum: 0,
			matRedTimes: 3,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_CLOTH,
			atkType: AT_B,
			group: true,
			atkSlow: 5,
			volumeRate: 0.5
		},
	],

    zombies: [
		{
			name: { a: 'Living Bush', b: '生ける繁み' },
			symbol: 'z',
			color: colorList.gray,
			race: UNDEAD,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 5,
			rarity: 0,
			hpRate: -4,
			mpRate: 0,
			str: 1,
			dex: 1,
			con: 1,
			int: 1,
			spd: -10,
			dmgBase: null,
			acBase: null,
			dropNum: 0,
			matRedTimes: 3,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_WOOD,
			atkType: AT_B,
			group: true,
			atkInf: 5,
			volumeRate: 0.5
		},
	],

    angels: [
		{
			name: { a: 'Fallen Angel', b: '堕天使' },
			symbol: 'A',
			color: colorList.shadow,
			race: DEMON,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 25,
			rarity: 0,
			hpRate: 1,
			mpRate: 2,
			str: 10,
			dex: 10,
			con: 10,
			int: 20,
			spd: 10,
			dmgBase: '3d5',
			acBase: 30,
			dropNum: 2,
			matRedTimes: 1,
			fire: 50,
			water: 0,
			air: 30,
			earth: 0,
			poison: 0,
			material: M_FEATHER,
			atkType: AT_B,
			levi: true,
			skillProb: 1 / 5,
			skill: {
				a: { id: HEAL, lvl: 10 },
				b: { id: SPEED, lvl: 10 },
				c: { id: BLESSING, lvl: 10 }
			}
		},
	],

    birds: [
		{
            name: { a: 'Eagle', b: '鷲' },
            symbol: 'B',
            color: colorList.shadow,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: -3,
            mpRate: 0,
            str: 1,
            dex: 5,
            con: 1,
            int: 1,
            spd: 5,
            dmgBase: '1d2',
            acBase: 1,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 30,
            earth: 0,
            poison: 0,
            material: M_FEATHER,
            atkType: AT_S | AT_T,
            levi: true,
            grow: DEX
		},
		
        {
            name: { a: 'Aedon, the Nightingale', b: '夜鶯アエドン' },
            symbol: 'B',
            color: colorList.shadow,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 15,
            rarity: 30,
            hpRate: -3,
            mpRate: 0,
            str: 8,
            dex: 10,
            con: 8,
            int: 5,
            spd: 10,
            dmgBase: '2d5',
            acBase: 10,
            dropNum: 3,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 30,
            earth: 0,
            poison: 0,
            material: M_FEATHER,
            atkType: AT_S | AT_T,
            levi: true,
            awake: true,
            skillProb: 1 / 8,
            skill: {
				a: { id: WIND_BREATH, lvl: 5 },
				b: { id: SCREAM, lvl: 5 }
			}
		},
		
        {
            name: { a: 'Nisos, the White-tailed Eagle', b: '尾白鷲ニソス' },
            symbol: 'B',
            color: colorList.shadow,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 25,
            rarity: 30,
            hpRate: -3,
            mpRate: 0,
            str: 10,
            dex: 20,
            con: 10,
            int: 10,
            spd: 20,
            dmgBase: '2d5',
            acBase: 10,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 30,
            earth: 0,
            poison: 0,
            material: M_FEATHER,
            atkType: AT_S | AT_T,
            levi: true,
            ias: 25,
            frw: 50
        },
	],
	
    chimeras: [
		{
            name: { a: 'Chimera', b: 'キメラ' },
            symbol: 'C',
            color: null,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: -1,
            mpRate: 0,
            str: 2,
            dex: 5,
            con: 2,
            int: 2,
            spd: 10,
            dmgBase: null,
            acBase: null,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_SKIN,
            atkType: AT_T,
            volumeRate: 1
		},
		
        {
            name: { a: 'Chimera', b: 'キメラ' },
            symbol: 'C',
            color: null,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 10,
            hpRate: -1,
            mpRate: 0,
            str: 2,
            dex: 5,
            con: 2,
            int: 2,
            spd: 10,
            dmgBase: null,
            acBase: null,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 20,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_FUR,
            atkType: AT_B,
            volumeRate: 1.5
		},
		
        {
            name: { a: 'Chimera', b: 'キメラ' },
            symbol: 'C',
            color: null,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 30,
            rarity: 20,
            hpRate: -1,
            mpRate: 0,
            str: 2,
            dex: 5,
            con: 2,
            int: 2,
            spd: 20,
            dmgBase: null,
            acBase: null,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 20,
            earth: 0,
            poison: 0,
            levi: true,
            material: M_FEATHER,
            atkType: AT_S,
            volumeRate: 2
        },
	],
	
    dragons: [
		{
            name: { a: 'Dragon', b: '竜' },
            symbol: 'D',
            color: colorList.green,
            race: DRAGON,
            mod: MAGIC,
            grade: NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 2,
            mpRate: 1,
            str: 15,
            dex: 10,
            con: 15,
            int: 15,
            spd: 5,
            dmgBase: '2d5',
            acBase: 40,
            dropNum: 4,
            matRedTimes: 1,
            fire: 20,
            water: 20,
            air: 20,
            earth: 20,
            poison: 20,
            material: M_SCALE | M_BONE | M_HORN,
            atkType: AT_S | AT_T | AT_B,
            grow: CON
		},
		
        {
            name: { a: 'Dragon, the Never-sleeping', b: '眠らずの竜' },
            symbol: 'D',
            color: colorList.green,
            race: DRAGON,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 2,
            mpRate: 1,
            str: 15,
            dex: 15,
            con: 20,
            int: 10,
            spd: 10,
            dmgBase: '5d5',
            acBase: 50,
            dropNum: 6,
            matRedTimes: 0,
            fire: 10,
            water: 10,
            air: 10,
            earth: 10,
            poison: 100,
            material: M_SCALE,
            atkType: AT_S | AT_T | AT_B,
            conSus: true,
            awake: true,
            skillProb: 1 / 5,
            skill: {
				a: { id: POISON_BREATH, lvl: 10 }
			}
        },
	],
	
    elementals: [
		{
			name: { a: 'Elemental', b: '精霊' },
			symbol: 'E',
			color: colorList.white,
			race: SPIRIT,
			mod: MAGIC,
			grade: NORMAL,
			lvl: 5,
			rarity: 0,
			hpRate: -4,
			mpRate: 1,
			str: 1,
			dex: 1,
			con: 1,
			int: 5,
			spd: 0,
			dmgBase: '1d4',
			acBase: 5,
			dropNum: 0,
			matRedTimes: 2,
			fire: 30,
			water: 30,
			air: 30,
			earth: 30,
			poison: 30,
			atkType: AT_S,
			moveRnd: true
		},
	],

    fairies: [
		{
			name: { a: 'Fairy', b: '妖精' },
			symbol: 'F',
			color: colorList.lime,
			race: SPIRIT,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 6,
			rarity: 0,
			hpRate: -3,
			mpRate: 0,
			str: 1,
			dex: 5,
			con: 1,
			int: 3,
			spd: 10,
			dmgBase: '1d1',
			acBase: 5,
			dropNum: 0,
			matRedTimes: 2,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_FEATHER,
			atkType: AT_S,
			levi: true,
			moveRnd: true,
			atkStealGold: 25,
			grow: DEX
		},
	],

    ghosts: [
		{
			name: { a: 'Phantom', b: '亡者' },
			symbol: 'G',
			color: colorList.skyblue,
			race: UNDEAD,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 15,
			rarity: 0,
			hpRate: -3,
			mpRate: 0,
			str: 3,
			dex: 5,
			con: 2,
			int: 3,
			spd: 0,
			dmgBase: '1d3',
			acBase: 1,
			dropNum: 0,
			matRedTimes: 2,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			atkType: AT_B,
			invisible: true,
			levi: true,
			moveRnd: true
		},
	],

    hybrids: [
		{
            name: { a: 'Harpy', b: 'ハーピー' },
            symbol: 'H',
            color: colorList.skyblue,
            race: HUMAN | ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 9,
            rarity: 0,
            hpRate: -1,
            mpRate: 0,
            str: 2,
            dex: 5,
            con: 2,
            int: 2,
            spd: 10,
            dmgBase: '2d2',
            acBase: 10,
            dropNum: 1,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 30,
            earth: 0,
            poison: 0,
            material: M_FEATHER,
            atkType: AT_S | AT_T,
            levi: true,
            grow: DEX,
            skillProb: 1 / 10,
            skill: {
				a: { id: SCREAM, lvl: 5 }
			}
		},
		
        {
            name: { a: 'Centaur', b: 'ケンタウロス' },
            symbol: 'H',
            color: colorList.yellow,
            race: HUMAN | ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 1,
            mpRate: 0,
            str: 10,
            dex: 15,
            con: 10,
            int: 5,
            spd: 10,
            dmgBase: '3d5',
            acBase: 20,
            dropNum: 3,
            matRedTimes: 1,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            dexSus: true,
            grow: DEX,
            starter: [
				{ type: 'missile', tabId: M_BOW },
				{ type: 'ammo', tabId: A_ARROW }
			]
		},
		
        {
            name: { a: 'Minotaur', b: 'ミノタウロス' },
            symbol: 'H',
            color: colorList.orange,
            race: HUMAN | ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 25,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 20,
            dex: 10,
            con: 15,
            int: 3,
            spd: 10,
            dmgBase: '4d5',
            acBase: 20,
            dropNum: 3,
            matRedTimes: 1,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_BONE | M_HORN,
            atkType: AT_B,
            strSus: true,
            grow: STR,
            starter: [{ type: 'melee', tabId: M_TWO_HANDED_AXE }]
        },
	],
	
    nymphs: [
		{
			name: { a: 'Nymph', b: 'ニンフ' },
			symbol: 'N',
			color: colorList.olive,
			race: SPIRIT,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 15,
			rarity: 0,
			hpRate: -2,
			mpRate: 1,
			str: 2,
			dex: 5,
			con: 3,
			int: 3,
			spd: 5,
			dmgBase: '1d2',
			acBase: 1,
			dropNum: 1,
			matRedTimes: 2,
			fire: 1,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			atkType: AT_S,
			moveRnd: true,
			atkStealItem: 25
		},
	],

    snakes: [
		{
            name: { a: 'Serpent', b: '大蛇' },
            symbol: 'J',
            color: colorList.purple,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 3,
            rarity: 0,
            hpRate: -2,
            mpRate: 0,
            str: 1,
            dex: 2,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: '1d2',
            acBase: 5,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 30,
            material: M_SCALE,
            atkType: AT_T,
            dmgPoison: 10
		},
		
        {
            name: { a: 'Amphisbaena,the Serpent of the Two-headed', b: '双頭の大蛇`アンフィスバエナ`' },
            symbol: 'J',
            color: colorList.purple,
            race: ANIMAL,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: -2,
            mpRate: 0,
            str: 10,
            dex: 10,
            con: 5,
            int: 5,
            spd: 10,
            dmgBase: '2d8',
            acBase: 10,
            dropNum: 2,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 50,
            material: M_SCALE,
            atkType: AT_T,
            dmgPoison: 50,
            skillProb: 1 / 6,
            skill: {
				a: { id: POISON_BREATH, lvl: 5 }
			}
        },
	],
	
    multiheads: [
		{
            name: { a: 'Hydra', b: 'ヒュドラ' },
            symbol: 'M',
            color: colorList.green,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 28,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 15,
            dex: 15,
            con: 25,
            int: 10,
            spd: 0,
            dmgBase: '2d5',
            acBase: 20,
            dropNum: 2,
            matRedTimes: 1,
            fire: -30,
            water: 0,
            air: 0,
            earth: 0,
            poison: 50,
            material: M_SCALE,
            atkType: AT_T | AT_B,
            hpReg: 100,
            ias: 25,
            dmgPoison: 25,
            grow: CON,
            skillProb: 1 / 8,
            skill: {
				a: { id: POISON_BREATH, lvl: 10 }
			}
		},
		
        {
            name: { a: 'Scylla, the Sea-monster', b: '海の怪物スキュラ' },
            symbol: 'M',
            olor: colorList.green,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 30,
            rarity: 80,
            hpRate: 5,
            mpRate: 0,
            str: 20,
            dex: 20,
            con: 30,
            int: 10,
            spd: 0,
            dmgBase: '2d10',
            acBase: 20,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 50,
            air: 0,
            earth: 50,
            poison: 50,
            atkType: AT_T | AT_B,
            hpReg: 100,
            ias: 25,
            dmgPoison: 25,
            skillProb: 1 / 10,
            skill: {
				a: { id: AQUA_BREATH, lvl: 10 }
			}
        },
	],
	
    giants: [
		{
            name: { a: 'Giant', b: '巨人' },
            symbol: 'P',
            color: colorList.yellow,
            race: GIANT,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 15,
            rarity: 0,
            hpRate: 3,
            mpRate: 0,
            str: 20,
            dex: 5,
            con: 10,
            int: 5,
            spd: 0,
            dmgBase: '5d5',
            acBase: 30,
            dropNum: 0,
            matRedTimes: 1,
            fire: 0,
            water: 0,
            air: 0,
            earth: 50,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            grow: CON
		},
		
        {
            name: { a: 'Cyclopes', b: 'サイクロプス' },
            symbol: 'P',
            color: colorList.orange,
            race: GIANT,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 3,
            mpRate: 0,
            str: 15,
            dex: 10,
            con: 15,
            int: 5,
            spd: 5,
            dmgBase: '4d4',
            acBase: 30,
            dropNum: 0,
            matRedTimes: 1,
            fire: 0,
            water: 0,
            air: 0,
            earth: 50,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            grow: CON,
            starter: [
				{ type: 'missile', tabId: M_SLING },
				{ type: 'ammo', tabId: A_ROCK }
			]
		},
		
        {
            name: { a: 'Polyphemus,the One Eyed Giant', b: '隻眼の巨人ポリュペモス' },
            symbol: 'P',
            color: colorList.orange,
            race: GIANT,
            mod: UNIQUE,
            grade: NORMAL,
            lvl: 25,
            rarity: 30,
            hpRate: 3,
            mpRate: 0,
            str: 20,
            dex: 15,
            con: 25,
            int: 5,
            spd: 5,
            dmgBase: '6d6',
            acBase: 30,
            dropNum: 4,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 50,
            poison: 0,
            material: M_BONE,
            atkType: AT_B,
            conSus: true,
            skillProb: 1 / 10,
            skill: {
				a: { id: CREATE_GIANT, lvl: 1 }
			}
        },
	],
	
    spiders: [
		{
            name: { a: 'Giant Spider', b: '大蜘蛛' },
            symbol: 'S',
            color: colorList.gray,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: -3,
            mpRate: 0,
            str: 3,
            dex: 3,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: '2d2',
            acBase: 10,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_CLOTH,
            atkType: AT_T,
            atkSlow: 20
		},
		
        {
            name: { a: 'Giant Scorpion', b: '大サソリ' },
            symbol: 'S',
            color: colorList.brown,
            race: ANIMAL,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 15,
            rarity: 0,
            hpRate: -3,
            mpRate: 0,
            str: 3,
            dex: 3,
            con: 1,
            int: 1,
            spd: 5,
            dmgBase: '3d1',
            acBase: 20,
            dropNum: 0,
            matRedTimes: 2,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            material: M_SHELL,
            atkType: AT_T,
            atkPara: 10
        },
	],
	
    demons: [
		{
			name: { a: 'Demon', b: '悪魔' },
			symbol: 'U',
			color: colorList.gray,
			race: DEMON,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 20,
			rarity: 0,
			hpRate: 2,
			mpRate: 1,
			str: 10,
			dex: 10,
			con: 15,
			int: 10,
			spd: 10,
			dmgBase: '3d5',
			acBase: 30,
			dropNum: 2,
			matRedTimes: 1,
			fire: 50,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_SKIN | M_HORN,
			atkType: AT_S | AT_B,
			skillProb: 1 / 8,
			skill: {
				a: { id: FIRE_BREATH, lvl: 10 },
				b: { id: ENCOURAGEMENT, lvl: 10 }
			}
		},
	],

    vampires: [
		{
			name: { a: 'Vampire', b: '吸血鬼' },
			symbol: 'V',
			color: colorList.gray,
			race: UNDEAD,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 15,
			rarity: 0,
			hpRate: 1,
			mpRate: 1,
			str: 8,
			dex: 8,
			con: 8,
			int: 8,
			spd: 0,
			dmgBase: '2d5',
			acBase: 20,
			dropNum: 2,
			matRedTimes: 2,
			fire: -50,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			material: M_BONE,
			atkType: AT_T | AT_B,
			stealLife: 50
		},
	],

    wraiths: [
		{
			name: { a: 'Wraith', b: '生霊' },
			symbol: 'W',
			color: colorList.gray,
			race: UNDEAD,
			mod: NORMAL,
			grade: NORMAL,
			lvl: 25,
			rarity: 0,
			hpRate: -1,
			mpRate: 0,
			str: 10,
			dex: 10,
			con: 5,
			int: 10,
			spd: 0,
			dmgBase: '1d6',
			acBase: 20,
			dropNum: 2,
			matRedTimes: 2,
			fire: 0,
			water: 0,
			air: 0,
			earth: 0,
			poison: 0,
			atkType: AT_T,
			atkDrain: 20
		},
	],

    statues: [
		{
            name: { a: 'Statue of Trap', b: '罠の像' },
            symbol: '%',
            color: null,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: null,
            acBase: null,
            dropNum: 0,
            matRedTimes: 3,
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            material: M_STONE,
            atkType: AT_B,
            stillness: true,
            awake: true,
            volumeRate: 1,
            skillProb: 1 / 8,
            skill: {
				a: { id: CREATE_TRAP, lvl: 1 }
			}
		},
		
        {
            name: { a: 'Statue of Summon', b: '召喚の像' },
            symbol: '%',
            color: null,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: null,
            acBase: null,
            dropNum: 0,
            matRedTimes: 3,
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            material: M_STONE,
            atkType: AT_B,
            stillness: true,
            awake: true,
            volumeRate: 1,
            skillProb: 1 / 8,
            skill: {
				a: { id: CREATE_MONSTER, lvl: 1 }
			}
		},
		
        {
            name: { a: 'Statue of Gargoyle', b: 'ガーゴイルの像' },
            symbol: '%',
            color: null,
            race: DEMON,
            mod: MAGIC,
            grade: NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 2,
            mpRate: 1,
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            spd: 0,
            dmgBase: null,
            acBase: null,
            matRedTimes: 2,
            dropNum: 0,
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            material: M_STONE,
            atkType: AT_S,
            stillness: true,
            awake: true,
            volumeRate: 1
        },
	],
	
    misc: [
		{
            name: { a: 'Rogue', b: 'ローグ' },
            symbol: '@',
            color: colorList.white,
            race: HUMAN,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: '1d1',
            acBase: 0,
            dropNum: 0,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            atkType: AT_B,
            awake: true,
            starter: [
                { type: 'melee', tabId: M_DAGGER, starter: true },
                { type: 'armor', tabId: A_VEST, starter: true },
                { type: 'book', tabId: B_ALCHEMY_1 },
                { type: 'book', tabId: B_SPELL_1 },
                { type: 'book', tabId: B_SKILL_1 },
                { type: 'food', tabId: F_RATION, quantity: 5 },
                { type: 'light', tabId: L_TORCH, starter: true },
                { type: 'light', tabId: L_TORCH, starter: true, pack: true},
            ]
		},
		
        {
            name: { a: 'Yeti', b: 'イエティ' },
            symbol: 'Y',
            color: colorList.white,
            mod: NORMAL,
            grade: NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: '1d6',
            acBase: 6,
            dropNum: 0,
            matRedTimes: 0,
            fire: 0,
            water: 0,
            air: 0,
            earth: 0,
            poison: 0,
            atkType: AT_B,
		},
		
        {
            name: { a: 'Beelzebub, the Lord of the Flies', b: '蝿の王ベルゼブブ' },
            symbol: 'U',
            color: colorList.gray,
            race: DEMON,
            mod: UNIQUE,
            grade: NORMAL,
            boss: true,
            lvl: 33,
            rarity: 0,
            hpRate: 5,
            mpRate: 5,
            str: 30,
            dex: 30,
            con: 30,
            int: 30,
            spd: 10,
            dmgBase: '5d5',
            acBase: 40,
            dropNum: 8,
            matRedTimes: 0,
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            atkType: AT_S | AT_T | AT_B,
            levi: true,
            awake: true,
            dmgPoison: 50,
            strSus: true,
            dexSus: true,
            conSus: true,
            intSus: true,
            skillProb: 1 / 6,
            skill: {
				a: { id: COCYTUS, lvl: 10 },
				b: { id: POISON_BREATH, lvl: 10 },
				c: { id: INFECTION_BREATH, lvl: 10 },
				d: { id: CREATE_MAGIC_MONSTER, lvl: 1 }
			}
        },
    ],
};

const fighterNumsMap = (() => {
    let nums = new Map();
    for (let key in fighterTab)
        nums.set(key, enums(0, fighterTab[key].length - 1));
    return nums;
})();

const FT = Object.keys(fighterTab);

const Fighter = class extends Material {
    constructor(obj) {
        super(obj);
        this.lvlMax = this.lvl;
        this.levi = !!this.levi;
        this.hpRate += HP_RATE;
        this.hpSum = 0;
        if (!this.hpReg) this.hpReg = 0;
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
        this.dmgBonus = 0;
        this.dmgBuff = 0;
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
        if (!this.dmgPoison) this.dmgPoison = 0;
        if (!this.dmgAcid) this.dmgAcid = 0;
        this.dmgDiceNum = 0;
        this.dmgDiceSides = 0;
        if (!this.atkCon) this.atkCon = 0;
        if (!this.atkPara) this.atkPara = 0;
        if (!this.atkSlow) this.atkSlow = 0;
        if (!this.atkInf) this.atkInf = 0;
        if (!this.atkBlind) this.atkBlind = 0;
        if (!this.atkRadi) this.atkRadi = 0;
        if (!this.atkCold) this.atkCold = 0;
        if (!this.atkDrain) this.atkDrain = 0;
        if (!this.atkStealGold) this.atkStealGold = 0;
        if (!this.atkStealItem) this.atkStealItem = 0;
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
        if (!this.ias) this.ias = 0;
        if (!this.fcr) this.fcr = 0;
        if (!this.frw) this.frw = 0;
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
        if (this.invisible) this.invisible = DEFAULT;
        this.teleported = 0;
        this.aggravating = 0;
        this.stealth = 0;
        this.digest = 0;
        this.searching = 0;
        this.lighten = 0;
        if (!this.stealLife) this.stealLife = 0;
        if (!this.stealMana) this.stealMana = 0;
        this.healCount = 0;
        this.totalWeight = 0;
        this.side = { a: null, b: null };
        this.swapped = false;
        this.numBoxes = 0;
        // this.boxes = {};
        this.equipment = {};
        if (this.race & (HUMAN | GIANT)) {
            for (let key in BP) {
				this.equipment[BP[key]] = null;
			}
		}
		
        this.initSynerzy();
    }

    initSynerzy() {
        this.synerzyMelee = 0;
        this.synerzyMissile = 0;
        this.synerzyFire = 0;
        this.synerzyWater = 0;
        this.synerzyAir = 0;
        this.synerzyEarth = 0;
        this.synerzyPoison = 0;
    }

    gainExp(exp, potion) {
        this.exp += Math.floor(exp * (potion ? 1 : (1 + this.expBonus / 100)));
        if (this.exp > this.expMax) this.expMax = this.exp;
        let found;
        while ((this.id === ROGUE && this.lvl < MAX_FIGHTER_LVL || this.id !== ROGUE) &&
          	  this.exp >= calcLevel(this.lvl + 1)) {
            if (++this.lvl <= this.lvlMax) continue;
            this.lvlMax = this.lvl;
            found = true;
            audio.playSound('level');
            this.skillPoints++;
            if (this.id === ROGUE) {
                message.draw(option.isEnglish() ?
                    `Welcome to level ${this.lvl}` :
                    `レベル${this.lvl}へようこそ`);
                this.statPoints++;
            } else {
				this.gainStats();
			}
		}
		
        if (found) {
            this.expGain = this.getExp();
            this.expNext = this.calcNextLvl();
            this.calcHP();
            this.calcMP();
            this.hp = this.hpMax;
            this.mp = this.mpMax;
        }
    }

    getExp() {
        let exp = calcLevel(this.lvl + 1) - calcLevel(this.lvl);
        if (this.mod === UNIQUE) {
            exp /= this.boss ? 1 : 2;
		} else {
			exp /= 50;
		}

        if (this.group) exp /= 10;
        if (this.race & DRAGON) {
            exp *= 3;
		} else if (this.race & GIANT) {
			exp *= 2;
		}

        if (this.mod === RARE) {
            exp *= 4;
		} else if (this.mod === MAGIC) {
			exp *= 2;
		}

        if (this.expRate) exp *= this.expRate;
        return Math.ceil(exp);
    }

    calcNextLvl() {
        return this.lvl >= MAX_FIGHTER_LVL ? 0 : calcLevel(this.lvl + 1);
    }

    calcHP() {
        this.hpMax = (this.lvl + this.con + 1) * this.hpRate + this.hpSum;
        if (this.hpMax < 1) this.hpMax = 1;
        if (this.hp > this.hpMax) this.hp = this.hpMax;
    }

    calcMP() {
        this.mpMax = (this.lvl + this.int + 1) * this.mpRate + this.mpSum;
        if (this.mpMax < 1) this.mpMax = 1;
        if (this.mp > this.mpMax) this.mp = this.mpMax;
    }

    calcDmg() {
        let dmgAvg = dice.getAvg(this.dmgBase);
        let dmgBonus = 1 + this.dmgBonus / 100;
        let dmgBuff = 1 + this.dmgBuff / 100;
        this.dmgAvg = Math.floor((this.str / 2 + dmgAvg) * dmgBonus * dmgBuff);
        if (this.dmgAvg < 1) this.dmgAvg = 1;
        let weapon = this.equipment['main'];
        let weight = weapon ? 3 - weapon.weight : 0;
        if (weight < 0) weight = /*weight+this.str/5<0? weight+this.str/5:*/ 0;
        this.rateValue = Math.floor(((this.dex + weight) * 10 *
            (1 + this.rateBonus / 100)) * (1 + this.rateBuff / 100));
        if (this.rateValue < 1) this.rateValue = 1;
        let ias = Math.floor(this.ias / (25 + this.iasBase)) + 1;
        if (ias > 5) ias = 5;
        let fcr = Math.floor(this.fcr / (25 + this.fcrBase)) + 1;
        if (fcr > 5) fcr = 5;
        let str = this.str >= 40 ? 5 : Math.floor(this.str / 10) + 1;
        let dex = this.dex >= 40 ? 5 : Math.floor(this.dex / 10) + 1;
        let int = this.int >= 40 ? 5 : Math.floor(this.int / 10) + 1;
        this.timesMelee = ias < str ? ias : str;
        this.timesMissile = ias < dex ? ias : dex;
        this.timesSpell = fcr < int ? fcr : int;
    }

    calcMoveTimes() {
        this.timesMove = Math.floor(this.frw / (20 + this.frwBase))
        if (this.timesMove > 5) this.timesMove = 5;
    }

    calcDmgOne() {
        let { num, sides } = dice.get(this.dmgBase, this.dmgDiceNum, this.dmgDiceSides);
        this.dmgBare = this.dmgBase = num + 'd' + sides;
    }

    calcAc() {
        let percBonus = 1 + this.acBonus / 100;
        let percBuff = 1 + this.acBuff / 100;
        this.acSValue = this.acSBase * percBonus + this.dex / 2; //bare
        this.acSBonusValue = this.acSBaseSum / 2 * this.acBonus / 100; //weapon, ornament
        this.acSValueTotal = Math.floor((this.acSValue + this.acSBonusValue + this.acSValueSum) * percBuff);
        if (this.acSValueTotal < 0) this.acSValueTotal = 0;
        this.acTValue = this.acTBase * percBonus + this.dex / 2;
        this.acTBonusValue = this.acTBaseSum / 2 * this.acBonus / 100;
        this.acTValueTotal = Math.floor((this.acTValue + this.acTBonusValue + this.acTValueSum) * percBuff);
        if (this.acTValueTotal < 0) this.acTValueTotal = 0;
        this.acBValue = this.acBBase * percBonus + this.dex / 2;
        this.acBBonusValue = this.acBBaseSum / 2 * this.acBonus / 100;
        this.acBValueTotal = Math.floor((this.acBValue + this.acBBonusValue + this.acBValueSum) * percBuff);
        if (this.acBValueTotal < 0) this.acBValueTotal = 0;
    }

    calcAttack(e, skill, lvl, itemThrow) {
        let dmgBase, atkType;
        if (!itemThrow) {
            dmgBase = this.dmgBase;
            atkType = this.atkType;
        } else {
            dmgBase = itemThrow.dmgBase ? itemThrow.dmgBase : '1d1';
            atkType = itemThrow.atkType ? itemThrow.atkType : AT_B;
		}

        let rate = Math.floor((this.rateValue / (this.rateValue + this.getEnemyAc(atkType, e))) * 100);
        if (rate > 95) {
            rate = 95;
		} else if (rate < 5) {
			rate = 5;
		}

        let dmg = 0;
        if (skill && skill.element !== 'physical' || evalPercentage(rate)) {
            let weight;
            if (itemThrow) {
                weight = itemThrow.weight;
			} else {
				weight = this.equipment['main'] ? this.equipment['main'].weight : 1;
			}

            let boost = evalPercentage(weight);
            if (e.race) boost += this.getRaceBoost(e.race);
            if (e.material === M_STONE && !itemThrow) boost += this.digging;
            dmg = (this.str / 2 + dice.roll(dmgBase, boost) * (1 + this.dmgBonus / 100)) *
                (1 + this.dmgBuff / 100);
            if (skill) dmg *= 1 + this.calcSkillValue(skill, lvl) / 100;
            let add = dmg;
            dmg *= 1 - e.physical / 100;
            if (!itemThrow && (!skill || skill.element === 'physical')) {
                if (this.dmgFire) dmg += add * (this.dmgFire / 100) * (1 - e.fire / 100);
                if (this.dmgLightning) dmg += add * (this.dmgLightning / 100) * (1 - e.lightning / 100);
                if (this.dmgPoison) dmg += add * (this.dmgPoison / 100) * (1 - e.poison / 100);
                if (this.dmgAcid) dmg += add * (this.dmgAcid / 100) * (1 - e.acid / 100);
			}
			
            dmg = dmg < 1 ? 1 : Math.floor(dmg);
		}
		
        return [dmg, rate];
    }

    getEnemyAc(atkType, e) {
        let ac = NaN;
        if (atkType & AT_S && !(ac <= e.acSValueTotal)) ac = e.acSValueTotal;
        if (atkType & AT_T && !(ac <= e.acTValueTotal)) ac = e.acTValueTotal;
        if (atkType & AT_B && !(ac <= e.acBValueTotal)) ac = e.acBValueTotal;
        return ac;
    }

    getRaceBoost(race) {
        let boost = 0;
        if (race & HUMAN && boost < this.dmgHuman) boost = this.dmgHuman;
        if (race & ANIMAL && boost < this.dmgAnimal) boost = this.dmgAnimal;
        if (race & DEMON && boost < this.dmgDemon) boost = this.dmgDemon;
        if (race & UNDEAD && boost < this.dmgUndead) boost = this.dmgUndead;
        if (race & DRAGON && boost < this.dmgDragon) boost = this.dmgDragon;
        if (race & GIANT && boost < this.dmgGiant) boost = this.dmgGiant;
        if (race & SPIRIT && boost < this.dmgSpirit) boost = this.dmgSpirit;
        return boost;
    }

    attack({
        enemy,
        missile,
        skill,
        lvl,
        itemThrow,
    }) {
        let count = 0;
        let name;
        if (itemThrow) {
            name = itemThrow.getName(true);
		} else if (missile) {
            name = option.isEnglish() ? 'An arrow' : '矢';
            var ammo = this.ci;
        } else if (skill) {
            name = skill.name[option.getLanguage()];
		} else {
			name = option.isEnglish() ? this.getName(true) : this.getName() + 'の攻撃';
		}

        let nameE = enemy.getName();
        let third = option.isEnglish() && (itemThrow || missile || skill || this.id !== ROGUE);
        do {
            let [dmg, rate] = skill && skill.type === 'spell' ? [this.calcSkillValue(skill, lvl, enemy), 100] :
                this.calcAttack(enemy, skill, lvl, itemThrow);
            let msg;
            let miss = !dmg || enemy.indestructible || this.id !== ROGUE && enemy.boss;
            if (miss) {
                msg = option.isEnglish() ? 'missed' : '外れた';
            } else {
                msg = option.isEnglish() ? 'hit' : `${dmg}のダメージを与えた`;
                if (third) msg += 's';
                enemy.hp -= dmg;
			}
			
            if (missile || itemThrow) {
                let item = ammo || itemThrow;
                if (miss || item.indestructible || evalPercentage(50)) {
                    this.deleteAmmo(item, true, enemy.x, enemy.y);
				} else { 
					this.deleteAmmo(item);
				}
			}
			
            message.draw(option.isEnglish() ?
                `${name} ${msg} ${nameE}${!miss? ' by '+dmg:''} (hit rating ${rate})` :
                `${name}は${nameE}に${msg} (命中率 ${rate})`);
            count++;
            if (flag.dash || flag.rest) flag.dash = flag.rest = false;
            if (!itemThrow && (!skill || skill.element === 'physical')) {
                if (!dmg) continue;
                if (this.stealLife) {
                    let percent = this.stealLife > 100 ? 1 : this.stealLife / 100;
                    this.hp += Math.ceil(dmg * percent);
                    if (this.hp > this.hpMax) this.hp = this.hpMax;
				}
				
                if (this.stealMana) {
                    let percent = this.stealMana > 100 ? 1 : this.stealMana / 100;
                    let mp = Math.ceil(dmg * percent);
                    if (mp > enemy.mp) mp = enemy.mp;
                    enemy.mp -= mp;
                    this.mp += mp;
                    if (this.mp > this.mpMax) this.mp = this.mpMax;
				}
				
                if (this.dmgFire) this.getElementEffect('fire', 1, enemy);
                if (this.dmgLightning) this.getElementEffect('lightning', 1, enemy);
                if (this.dmgPoison) this.getElementEffect('poison', 1, enemy);
                if (this.dmgAcid) this.getElementEffect('acid', 1, enemy);
                if (this.cursed && evalPercentage(50 - (enemy.lvl - this.lvl))) enemy.gotCursed();
                if (!missile) {
                    if (this.atkCon && evalPercentage(this.atkCon)) this.haveCast(CONFUSION, 1, enemy);
                    if (this.atkPara && evalPercentage(this.atkPara)) this.haveCast(PARALYSIS, 1, enemy);
                    if (this.atkSlow && evalPercentage(this.atkSlow)) this.haveCast(SLOW, 10, enemy);
                    if (this.atkInf && evalPercentage(this.atkInf)) this.haveCast(INFECTION, 1, enemy);
                    if (this.atkBlind && evalPercentage(this.atkBlind)) this.haveCast(BLINDNESS, 1, enemy);
                    if (this.atkRadi && evalPercentage(this.atkRadi)) this.haveCast(RADIATION, 1, enemy);
                    if (this.atkCold && evalPercentage(this.atkCold)) this.haveCast(COLD, 1, enemy);
                    if (this.atkDrain && evalPercentage(this.atkDrain)) enemy.decayOrRestore(EXP, false, this.expGain, this);
                    if (!skill && !this.confused) {
                        if (this.atkStealGold && evalPercentage(this.atkStealGold)) if (this.stealGold(enemy)) count = NaN;
                        if (count && this.atkStealItem && evalPercentage(this.atkStealItem)) if (this.stealItem(enemy)) count = NaN;
                    }
                }
			}
			
            if (!itemThrow && (!skill || skill.type !== 'spell')) {
                if (this.decreaseDurab(true)) count = NaN;
			}
			
            enemy.decreaseDurab();
            if (enemy.hp <= 0) {
                enemy.died(this);
                return;
			}
			
            if (enemy.sleeping) enemy.wakeUp();
            if (this.id === ROGUE) this.getCe(enemy, !missile && !skill);
            if (skill) {
                this.getElementEffect(skill.element, lvl, enemy)
                return;
            } else if (itemThrow) {
				return;
			}
        } while (missile && this.timesMissile > count && ammo.quantity > count ||
			!missile && this.timesMelee > count
		);
    }

    dig(loc) {
        let digging;
        if (this.atkType & AT_T) {
            digging = 3;
		} else if (this.atkType & AT_S) {
            digging = 2;
		} else if (this.atkType & AT_B) {
			digging = 1;
		}

        if (this.digging) digging *= 10 * this.digging;
        if (!loc.indestructible) loc.wall -= digging;
        this.decreaseDurab(true);
        audio.playSound('dig');
        if (loc.wall <= 0) loc.deleteWall(true);
    }

    getElementEffect(element, lvl, e) {
        if (evalPercentage(e[element])) return;
        let id;
        switch (element) {
            case 'fire':
            case 'lightning':
            case 'acid':
                e.decreaseDurab(false, element);
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
		
        if (id) this.haveCast(id, lvl, e);
    }

    calcSkillValue(skill, lvl, enemy, avg) {
        let value;
        let lvlSy = flag.skill && skill.synerzy ? this.getSynerzy(skill) : 0;
        let resist = enemy ? enemy[skill.element] : 0;
        let rate = skill.rate * lvl + skill.synerzy * lvlSy;
        if (skill.kind === 'breath') {
            value = this.hp * BREATH_RATE * (1 + rate / 100);
		} else if (isFinite(skill.base)) {
            value = skill.base + rate;
        } else {
            let base = avg ? dice.getAvg(skill.base) : dice.roll(skill.base);
            value = base * (1 + rate / 100);
		}
		
        return Math.ceil(value * (1 - resist / 100));
    }

    calcSkillDur(skill, lvl, avg) {
        let base = avg ? dice.getAvg(skill.durBase) : dice.roll(skill.durBase);
        return base + skill.durRate * lvl;
    }

    calcResist() {
        this.fireSum = this.fireMax + this.fireBuff + this.lowerRes;
        this.waterSum = this.waterMax + this.waterBuff + this.lowerRes;
        this.airSum = this.airMax + this.airBuff + this.lowerRes;
        this.earthSum = this.earthMax + this.earthBuff + this.lowerRes;
        this.poisonSum = this.poisonMax + this.poisonBuff + this.lowerRes;
        let fire = this.fireSum >= 100 ? 100 : this.fireSum;
        let water = this.waterSum >= 100 ? 100 : this.waterSum;
        let air = this.airSum >= 100 ? 100 : this.airSum;
        let earth = this.earthSum >= 100 ? 100 : this.earthSum;
        let poison = this.poisonSum >= 100 ? 100 : this.poisonSum;
        let limit = 75;
        this.fire = fire >= limit ? limit : fire;
        this.water = water >= limit ? limit : water;
        this.air = air >= limit ? limit : air;
        this.earth = earth >= limit ? limit : earth;
        this.poison = poison >= limit ? limit : poison;
        this.light = Math.floor(fire / 2);
        this.cold = Math.floor(water / 2);
        this.lightning = Math.floor(air / 2);
        this.gravity = Math.floor(earth / 2);
        this.physical = Math.floor(earth / 4);
        this.infection = Math.floor(poison / 2);
        this.sand = Math.floor(earth / 4 + air / 4);
        this.blizzard = Math.floor(water / 4 + air / 4);
        this.acid = Math.floor(water / 4 + poison / 4);
        this.magma = Math.floor(fire / 4 + earth / 4);
        this.radiation = Math.floor(fire / 4 + poison / 4);
    }

    getSkillBoost(skill) {
        let boost = 0;
        switch (skill.element) {
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
                boost = (this.skillEarth + this.skillAir) / 2;
                break;
            case 'blizzard':
                boost = (this.skillWater + this.skillAir) / 2;
                break;
            case 'acid':
                boost = (this.skillWater + this.skillPoison) / 2;
                break;
            case 'magma':
                boost = (this.skillFire + this.skillEarth) / 2;
                break;
            case 'radiation':
                boost = (this.skillFire + this.skillPoison) / 2;
                break;
		}
		
        boost += this.skillAll;
        return Math.floor(boost);
    }

    getSynerzy(skill) {
        let synerzy = 0;
        if (skill.type === 'melee') {
            synerzy = this.synerzyMelee;
		} else if (skill.type === 'missile') {
            synerzy = this.synerzyMissile;
        } else {
            switch (skill.element) {
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
                    synerzy = this.synerzyAir + this.synerzyEarth;
                    break;
                case 'blizzard':
                    synerzy = this.synerzyWater + this.synerzyAir;
                    break;
                case 'acid':
                    synerzy = this.synerzyWater + this.synerzyPoison;
                    break;
                case 'magma':
                    synerzy = this.synerzyFire + this.synerzyEarth;
                    break;
                case 'radiation':
                    synerzy = this.synerzyFire + this.synerzyPoison;
                    break;
            }
		}
		
        return Math.floor(synerzy);
    }

    calcWeightLimit() {
        this.weightLimit = 25 + this.str * 2;
        this.calcSpeed();
    }

    calcSpeed() {
        this.totalWeight = Math.round(this.totalWeight * 100) / 100;
        this.spd = this.spdMax + this.spdBuff - this.spdNerf -
            (this.totalWeight > this.weightLimit ?
                Math.ceil(this.totalWeight - this.weightLimit) : 0);
    }

    getConditionColor() {
        return this.sleeping ? colorList.royalblue :
            this.paralyzed ? colorList.orange :
            this.confused ? colorList.yellow :
            this.blinded ? colorList.gray :
            this.hallucinated ? colorList.purple :
            this.canceled ? colorList.white :
            this.infected ? colorList.infection :
            this.poisoned ? colorList.poison :
            colorList.red;
    }

    calcCondition(calc, draw) {
        var j = -4;
        let name = this.getName(true);
        if (draw) {
            statistics.clearCondition();
            var len = display.fs;
            if (this.hunger >= 800) {
                let condition = option.isEnglish() ? 'full' : textLenList.names['full'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.lime,
				});
				
                len += textLenList['full'][option.getLanguage()];
            } else if (this.hunger > 0 && this.hunger <= 200) {
                let condition = option.isEnglish() ? 'hungry' : textLenList.names['hungry'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.yellow,
				});
				
                len += textLenList['hungry'][option.getLanguage()];
            } else if (this.hunger === 0) {
                let condition = option.isEnglish() ? 'starved' : textLenList.names['starved'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.red,
				});
				
                len += textLenList['starved'][option.getLanguage()];
            }
		}
		
        if (this.poisoned) {
            if (calc) {
                if (!this.indestructible && --this.hp <= 0) {
                    let fighter;
                    if (this.poisonedId && this.poisonedId !== this.id) {
						fighter = this.poisonedId === ROGUE ? rogue : map.enemyList[this.poisonedId];
					}

                    this.poisonedId = 0;
                    this.died(fighter);
                    return null;
                } else if (--this.poisoned === 0) {
                    message.draw(option.isEnglish() ?
                        `${name} recovered from poison` :
                        `${name}毒状態から復帰した`);
				}
				
                if (flag.dash || flag.rest) flag.dash = flag.rest = false;
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'poisoned' : textLenList.names['poisoned'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.poison,
				});
				
                len += textLenList['poisoned'][option.getLanguage()];
            }
		}
		
        if (this.confused) {
            if (calc && --this.confused === 0) {
                if (this.id !== ROGUE) this.removeCe();
                message.draw(option.isEnglish() ?
                    `${name} recovered from confusion` :
                    `${name}混乱状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'confused' : textLenList.names['confused'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.yellow,
				});
				
                len += textLenList['confused'][option.getLanguage()];
            }
		}
		
        if (this.paralyzed) {
            if (calc && --this.paralyzed === 0) {
                message.draw(option.isEnglish() ?
                    `${name} recovered from paralysis` :
                    `${name}麻痺状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'paralyzed' : textLenList.names['paralyzed'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.orange,
				});
				
                len += textLenList['paralyzed'][option.getLanguage()];
            }
		}
		
        if (this.sleeping > 0) {
            if (calc && --this.sleeping === 0) this.wakeUp();
            if (draw) {
                let condition = option.isEnglish() ? 'sleeping' : textLenList.names['sleeping'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.royalblue,
				});
				
                len += textLenList['sleeping'][option.getLanguage()];
            }
		}
		
        if (this.blinded) {
            if (calc && --this.blinded === 0) {
                if (this.id === ROGUE) {
                    map.redraw(rogue.x, rogue.y);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from blindness` :
                    `${name}盲目状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'blinded' : textLenList.names['blinded'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.gray,
				});
				
                len += textLenList['blinded'][option.getLanguage()];
            }
		}
		
        if (this.infected > 0) {
            if (calc && coinToss()) this.decayOrRestore();
            if (calc && --this.infected === 0) {
                message.draw(option.isEnglish() ?
                    `${name} recovered from infection` :
                    `${name}感染状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'infected' : textLenList.names['infected'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.infection,
				});
				
                len += textLenList['infected'][option.getLanguage()];
            }
		}
		
        if (this.hallucinated) {
            if (calc && --this.hallucinated === 0) {
                if (this.id === ROGUE) {
                    hallucinate.all(true);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from hallucination` :
                    `${name}幻覚状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'hallucinated' : textLenList.names['hallucinated'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.purple,
				});
				
                len += textLenList['hallucinated'][option.getLanguage()];
            }
		}
		
        if (this.canceled) {
            if (calc && --this.canceled === 0) {
                message.draw(option.isEnglish() ?
                    `${name} recovered from cancellation` :
                    `${name}封印状態から復帰した`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'canceled' : textLenList.names['canceled'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.white,
				});
				
                len += textLenList['canceled'][option.getLanguage()];
            }
		}
		
        if (this.seeInvisible > 0) {
            if (calc && --this.seeInvisible === 0) {
                message.draw(option.isEnglish() ?
                    `${name} can no longer see invisible things` :
                    `${name}もう透明な物体を見ることが出来なくなった`);
                seeInvisible(false);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'see invisible' : textLenList.names['see invisible'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.light,
                    shadow: colorList.light,
				});
				
                len += textLenList['see invisible'][option.getLanguage()];
            }
		}
		
        if (this.invisibility) {
            if (calc && --this.invisibility === 0) {
                this.invisible = false;
                map.coords[this.x][this.y].draw();
                //message.draw();
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'invisible' : textLenList.names['invisible'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.light,
                    shadow: colorList.light,
				});
				
                len += textLenList['invisible'][option.getLanguage()];
            }
		}
		
        if (this.ecco) {
            if (calc && --this.ecco === 0) {
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Ecco` :
                    `${name}エコーの効果を失った`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'ecco' : textLenList.names['ecco'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.air,
				});
				
                len += textLenList['ecco'][option.getLanguage()];
            }
		}
		
        if (this.enchantSelfDur) {
            if (--this.enchantSelfDur === 0) {
                this.dmgBonus -= this.enchantSelf;
                this.rateBonus -= this.enchantSelf;
                this.acBonus -= this.enchantSelf;
                this.enchantSelf = 0;
                this.calcDmg();
                this.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Enchant Self` :
                    `${name}自己強化の効果を失った`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'enchant self' : textLenList.names['enchant self'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.earth,
				});
				
                len += textLenList['enchant self'][option.getLanguage()];
            }
		}
		
        if (this.venomDur) {
            if (--this.venomDur === 0) {
                this.dmgPoison -= this.venom;
                this.venom = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Venom Hands` :
                    `${name}猛毒の手の効果を失った`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'venom hands' : textLenList.names['venom hands'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.poison,
				});
				
                len += textLenList['venom hands'][option.getLanguage()];
            }
		}
		
        if (this.confusing) {
            if (--this.confusing === 0) {
                this.atkCon = 0;
                let name = this.getName(true);
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Touch of Confusion` :
                    `${name}混乱の手の効果を失った`);
			}
			
            if (draw) {
                let condition = option.isEnglish() ? 'confusing hands' : textLenList.names['confusing hands'];
                statistics.draw({
                    msg: condition,
                    xPx: len,
                    y: j,
                    color: colorList.poison,
				});
				
                len += textLenList['confusing hands'][option.getLanguage()];
            }
		}
		
        if (!calc) return;
        if (this.speeded) {
            if (--this.speeded === 0) {
                this.spdBuff = 0;
                this.calcSpeed();
            }
		}
		
        if (this.slowed) {
            if (--this.slowed === 0) {
                this.spdNerf = 0;
                this.calcSpeed();
            }
		}
		
        if (this.hpRegBuffDur) {
            if (--this.hpRegBuffDur === 0) {
                this.hpReg -= this.hpRegBuff;
                this.hpRegBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Life Regeneration` :
                    `${name}再生の効果を失った`);
            }
		}
		
        if (this.mpRegBuffDur) {
            if (--this.mpRegBuffDur === 0) {
                this.mpReg -= this.mpRegBuff;
                this.mpRegBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Mana Regeneration` :
                    `${name}魔力再生の効果を失った`);
            }
		}
		
        if (this.mfBuffDur) {
            if (--this.mfBuffDur === 0) {
                this.mf -= this.mfBuff;
                this.mfBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Magic Finding` :
                    `${name}魔法具探求の効果を失った`);
            }
		}
		
        if (this.gfBuffDur) {
            if (--this.gfBuffDur === 0) {
                this.gf -= this.gfBuff;
                this.gfBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Gold Finding` :
                    `${name}財宝探求の効果を失った`);
            }
		}
		
        if (this.expBuffDur) {
            if (--this.expBuffDur === 0) {
                this.expBonus -= this.expBuff;
                this.expBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Experience` :
                    `${name}経験の効果を失った`);
            }
		}
		
        if (this.skillBuffDur) {
            if (--this.skillBuffDur === 0) {
                this.skillAll -= this.skillBuff;
                this.skillBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Skill` :
                    `${name}スキルの効果を失った`);
            }
		}
		
        let resist;
        if (this.fireBuffDur) {
            if (--this.fireBuffDur === 0) {
                this.fireBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Fire` :
                    `${name}耐火の効果を失った`);
                resist = true;
            }
		}
		
        if (this.waterBuffDur) {
            if (--this.waterBuffDur === 0) {
                this.waterBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Water` :
                    `${name}耐水の効果を失った`);
                resist = true;
            }
		}
		
        if (this.airBuffDur) {
            if (--this.airBuffDur === 0) {
                this.airBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Air` :
                    `${name}耐風の効果を失った`);
                resist = true;
            }
		}
		
        if (this.earthBuffDur) {
            if (--this.earthBuffDur === 0) {
                this.earthBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Earth` :
                    `${name}耐土の効果を失った`);
                resist = true;
            }
		}
		
        if (this.poisonBuffDur) {
            if (--this.poisonBuffDur === 0) {
                this.poisonBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Poison` :
                    `${name}耐毒の効果を失った`);
                resist = true;
            }
		}
		
        if (this.lowerResDur) {
            if (--this.lowerResDur === 0) {
                this.lowerRes = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from the effect of Lower Resist` :
                    `${name}耐性低下の効果から復帰した`);
                resist = true;
            }
		}
		
        if (resist) this.calcResist();
        if (this.dmgBuffDur) {
            if (--this.dmgBuffDur === 0) {
                this.dmgBuff = this.rateBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Combat` :
                    `${name}戦闘の効果を失った`);
            }
            this.calcDmg();
		}
		
        if (this.acBuffDur) {
            if (--this.acBuffDur === 0) {
                this.acBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Armor` :
                    `${name}防護の効果を失った`);
            }
            this.calcAc();
		}
		
        if (this.stuckTrap) {
            if (--this.stuckTrap === 0) {
                message.draw(option.isEnglish() ?
                    `${name} can move again` :
                    `${name}動けるようになった`);
            }
		}
		
        if (this.teleported && evalPercentage(this.teleported)) this.haveCast(TELEPORTATION, 10, this);
    }

    decayOrRestore(stat, restore, exp, enemy) {
        let name = this.getName(true);
        switch (stat >= 0 ? stat : rndInt(3)) {
            case STR:
                if (restore) {
                    if (this.str < this.strMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the strength` :
                            `${name}筋力が元に戻った`);
                        this.str = this.strMax;
                    }
                } else if (this.strSus || !(this.str - this.strBonus)) {
                    return;
				} else {
                    this.str--;
                    message.draw(option.isEnglish() ?
                        `${name} got weak` :
                        `${name}薄弱になった`);
				}
				
                this.calcWeightLimit();
                this.calcDmg();
                break;
            case DEX:
                if (restore) {
                    if (this.dex < this.dexMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the dexterity` :
                            `${name}器用さが元に戻った`);
                        this.dex = this.dexMax;
                    }
                } else if (this.dexSus || !(this.dex - this.dexBonus)) {
                    return;
				} else {
                    this.dex--;
                    message.draw(option.isEnglish() ?
                        `${name} got clumsy` :
                        `${name}不器用になった`);
				}
				
                this.calcAc();
                this.calcDmg();
                break;
            case CON:
                if (restore) {
                    if (this.con < this.conMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the constitution` :
                            `${name}耐久力が元に戻った`);
                        this.con = this.conMax;
                    }
                } else if (this.conSus || !(this.con - this.conBonus)) {
                    return;
				} else {
                    this.con--;
                    message.draw(option.isEnglish() ?
                        `${name} got sick` :
                        `${name}病弱になった`);
				}
				
                this.calcHP();
                break;
            case INT:
                if (restore) {
                    if (this.int < this.intMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the intelligence` :
                            `${name}知力が元に戻った`);
                        this.int = this.intMax;
                    }
                } else if (this.intSus || !(this.int - this.intBonus)) {
                    return;
				} else {
                    this.int--;
                    message.draw(option.isEnglish() ?
                        `${name} got stupid` :
                        `${name}愚鈍になった`);
				}
				
                this.calcMP();
                break;
            case EXP:
                if (restore) {
                    if (this.exp < this.expMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the experience` :
                            `${name}経験値が元に戻った`);
                        this.exp = this.expMax;
                        this.lvl = this.lvlMax;
                    }
                } else if (!this.exp || evalPercentage(this.con * 2)) {
                    return;
				} else {
                    if (exp > this.exp) exp = this.exp;
                    this.exp -= exp;
                    if (enemy) {
                        enemy.exp += exp;
                        if (enemy.exp > enemy.expMax) enemy.exp = enemy.expMax;
                    }
                    while (this.exp < calcLevel(this.lvl)) this.lvl--;
                    message.draw(option.isEnglish() ?
                        `${name} got poor` :
                        `${name}貧弱になった`);
				}
				
                this.calcHP();
                this.calcMP();
                if (!restore) {
                    if (this.hp > this.hpMax) this.hp = this.hpMax;
                    if (this.mp > this.mpMax) this.mp = this.mpMax;
                }
        }
    }

    heal() {
        if (this.healCount++ !== 5) return;
        if (!this.poisoned && this.hp < this.hpMax) {
            this.hp += Math.ceil(this.hpMax * (this.con + this.hpReg) / 1000);
            if (this.hp > this.hpMax) this.hp = this.hpMax;
        }
        if (this.mp < this.mpMax) {
            this.mp += Math.ceil(this.mpMax * (this.int + this.mpReg) / 1000);
            if (this.mp > this.mpMax) this.mp = this.mpMax;
		}
		
        this.healCount = 0;
    }


    drawOrErase(draw, move) {
        let loc = map.coords[this.x][this.y];
        if (draw) {
            loc.fighter = this;
            loc.detected = this.detected;
        } else {
            loc.fighter = null;
            loc.detected = false;
		}
		
        if (!draw && this.mod !== NORMAL && option.shadow.user) {
            map.coords[this.x][this.y + 1].draw();
            map.coords[this.x + 1][this.y].draw();
		}
		
        loc.draw();
        if (this.id === ROGUE && draw) {
            this.distMap = pathfinding.main({
                x0: this.x,
                y0: this.y,
                map: true,
			});
			
            this.lightenOrDarken('Lighten', move);
        }
    }

    lightenOrDarken(type, search) {
        shadowcasting.main({
            x0: this.x,
            y0: this.y,
            radius: FOV,
            type: type,
            lightRad: this.lighten,
            search: search,
        });
    }

    replace(f) {
        this.drawOrErase(false);
        f.drawOrErase(false);
        [this.x, this.y, f.x, f.y] = [f.x, f.y, this.x, this.y];
        this.drawOrErase(true);
        f.drawOrErase(true);
        if (this.id === ROGUE) {
            map.coords[this.x][this.y].traces = ++this.numSteps;
		} else if (f.id === ROGUE) {
			map.coords[f.x][f.y].traces = ++f.numSteps;
		}
    }

    showInventory(place, a) {
        switch (place) {
            case P_PACK:
                inventory.show(this.pack, RIGHT, a, place);
                break;
            case P_EQUIPMENT:
                this.equipmentList(BP[a]);
                break;
            case P_FLOOR:
                inventory.show(map.coords[this.x][this.y].item, RIGHT, a, place);
                break;
            case P_BOX:
                inventory.show(this.boxes, LEFT, a, place);
                break;
            case P_SHOP:
            case P_STASH:
                let enter = map.coords[this.x][this.y].enter;
                inventory.show(enter.list, LEFT, a, place, enter);
                break;
            case P_CUBE:
                inventory.show(this.cube, LEFT, a, place);
                break;
        }
    }

    equipmentList(bp) {
        inventory.shadow(LEFT);
        let i = 1.5;
        let j = MS + 1;
        let k = 0;
        let weight = 0;
        let count = 0;
        let ctxInv = display.ctxes.inv;
        if (flag.blacksmith) var priceAll = 0;
        for (let key in this.equipment) {
            let item = this.equipment[key];
            if (flag.destroy && flag.number && key !== bp ||
              	  (flag.repair || flag.blacksmith) && (!item || item.durab === item.durabMax)) {
                k++;
                continue;
			}
            ctxInv.save();
            ctxInv.textAlign = 'center';
            display.text({
                ctx: ctxInv,
                msg: EA[k++].toUpperCase(),
                x: i - 0.5,
                y: j,
            });

            ctxInv.textAlign = 'left';
            let parts = option.isEnglish() ? key : translation.bodyParts[key];
            if (key === 'main' || key === 'off') parts += this.swapped ? 2 : 1;
            display.text({
                ctx: ctxInv,
                msg: parts,
                x: i,
                y: j,
            });

            if (!item) {
                if (key === 'off' && this.equipment['main'] && this.equipment['main'].twoHanded) {
                    display.text({
                        ctx: ctxInv,
                        msg: option.isEnglish() ?
                            `(two-handed)` :
                            `(両手持ち)`,
                        x: i + 4.5,
                        y: j,
                        limit: 14,
                    });
				}
				
                j++;
                ctxInv.restore();
                continue;
			}
			
            ctxInv.textAlign = 'center';
            if (item.shadow) ctxInv.shadowColor = item.shadow;
            ctxInv.fillStyle = item.color;
            display.text({
                ctx: ctxInv,
                msg: item.symbol,
                x: i + 4,
                y: j,
                stroke: item.stroke,
            });

            if (item.cursed) {
                ctxInv.fillStyle = colorList.red;
			} else if (!item.durab) {
                ctxInv.fillStyle = colorList.gray;
			} else {
				ctxInv.fillStyle = colorList.white;
			}

            ctxInv.textAlign = 'left';
            let name = item.getName();
            let limit = flag.blacksmith ? 12 : 15;
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 4.5,
                y: j,
                limit: limit,
                stroke: item.stroke,
            });

            ctxInv.fillStyle = colorList.white;
            ctxInv.shadowColor = colorList.clear;
            ctxInv.textAlign = 'right';
            if (flag.blacksmith) {
                let price = item.getDurabPrice();
                display.text({
                    ctx: ctxInv,
                    msg: `$${price}`,
                    x: i + 20.3,
                    y: j,
                    limit: 3.5,
                });

                priceAll += price;
			}
			
            display.text({
                ctx: ctxInv,
                msg: (item.weight * item.quantity).toFixed(1),
                x: i + 22,
                y: j,
            });

            weight += item.weight * item.quantity;
            count++;
            j++;
            ctxInv.restore();
		}
		
        if (!flag.destroy && !flag.number && !flag.repair && !flag.blacksmith) {
            let col = i;
            let row = j;
            let count2 = 0;
            let valueLimit = 4.5;
            for (let [key, term] of investigationMap.entries()) {
                if (!term || !term.equipList) {
                    if (key === 'end') break;
                    continue;
				}
				
                ctxInv.save();
                if (this.findBuffStat(key)) ctxInv.shadowColor = colorList.buff;
				if (this.lowerRes && (key === 'fire' || key === 'water' ||
						key === 'air' || key === 'earth' || key === 'poison')) {
					ctxInv.fillStyle = colorList.red;
				}

                display.text({
                    ctx: ctxInv,
                    msg: term.name[option.getLanguage()],
                    x: col - 1,
                    y: j,
                });

                ctxInv.textAlign = 'right';
                let value = this[key];
                if (term.perc) value += '%';
                if (term.max) {
                    let max = this[term.max];
                    if (term.perc) max += '%';
                    value += ` (${max})`;
				}
				
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: col + IN_WIDTH / 4 - 2,
                    y: j++,
                    limit: valueLimit,
                });

                ctxInv.restore();
                if (!(++count2 % 8)) {
                    col += IN_WIDTH / 4;
                    j = row;
                }
            }
		}
		
        let maxNum = MAX_EQUIPMENT_NUM;
        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS - 1,
            yPx: display.height,
        });

        ctxInv.textAlign = 'right';
        let total = option.isEnglish() ? 'Total' : '計';
        if (flag.blacksmith) {
            let cost = option.isEnglish() ? 'Total Cost' : '全費用';
            total = `${cost} $${priceAll} ${total}`;
		}
		
        display.text({
            ctx: ctxInv,
            msg: `${total} ${weight.toFixed(1)}kg`,
            x: i + 22,
            y: -SS - 1,
            yPx: display.height,
        });

        ctxInv.textAlign = 'left';
    }

    showSkill(list, bookmark) {
        inventory.shadow(bookmark ? LEFT : RIGHT);
        let i = 1.5;
        let j = MS + 2;
        let right = bookmark ? 0 : display.width / 2;
        let count = 0;
        let main = option.isEnglish() ? 'Main' : 'メイン';
        let ctxInv = display.ctxes.inv;
        for (let key in list) {
            if (flag.number && list[key] !== this.cs) continue;
            let skill;
            if (list[key]) skill = skillMap.get(list[key].id ? list[key].id : list[key]);
            ctxInv.save();
            if (bookmark) {
                if (skill) ctxInv.shadowColor = skill.color;
                display.text({
                    ctx: ctxInv,
                    msg: key === '0' ? main : `F${key}`,
                    x: i - 1,
                    y: j,
                    limit: 2,
                    xPx: right,
                });

                if (!skill) {
                    j++;
                    ctxInv.restore();
                    continue;
                }
            } else {
                if (skill.reqLvl > this.lvl) {
                    ctxInv.fillStyle = colorList.gray;
				} else {
					ctxInv.shadowColor = skill.color;
				}

                ctxInv.textAlign = 'center';
                display.text({
                    ctx: ctxInv,
                    msg: key,
                    x: i,
                    y: j,
                    xPx: right,
                });
			}
			
            ctxInv.textAlign = 'left';
            let name = skill.name[option.getLanguage()];
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 0.75 + (bookmark ? 1 : 0),
                y: j,
                limit: 8,
                xPx: right,
            });

            ctxInv.textAlign = 'right';
            let lvl = 0;
            if (list[key].lvl) {
                lvl = list[key].lvl
			} else {
                let a = this.searchSkill(list[key]);
                if (a) lvl = this.skill[a].lvl;
			}
			
            let boost = this.getSkillBoost(skill);
            display.text({
                ctx: ctxInv,
                msg: `${lvl}+${boost}`,
                x: i + 12,
                y: j,
                xPx: right,
            });

            if (skill.rate) {
                let value;
                let bonus = skill.rate * (lvl + boost) + (skill.synerzy ? skill.synerzy * this.getSynerzy(skill) : 0);
                if (skill.kind === 'breath') {
                    value = Math.ceil(this.hp * BREATH_RATE * (1 + bonus / 100));
                } else if (isFinite(skill.base)) {
                    value = skill.base + bonus;
                    if (skill.limit && value > skill.limit) value = skill.limit;
                    if (skill.radiusRate) {
                        let radius = option.isEnglish() ? 'radius ' : '半径';
                        value = `${radius}${value}`;
                    } else if (value > 0) {
						 value = `+${value}`;
					}

                    if (skill.perc) value = `${value}%`;
                } else {
                    let avg = Math.floor(dice.getAvg(skill.base) * (1 + bonus / 100) * 10) / 10;
                    value = `Avg ${avg}`;
				}
				
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: i + 17,
                    y: j,
                    xPx: right,
                });
			}
			
            if (skill.reqLvl <= this.lvl && skill.mp > this.mp) {
                ctxInv.shadowColor = colorList.clear;
                ctxInv.fillStyle = colorList.red;
			}
			
            display.text({
                ctx: ctxInv,
                msg: skill.mp,
                x: i + 18.5,
                y: j,
                xPx: right,
            });

            if (skill.reqLvl <= this.lvl) {
                ctxInv.shadowColor = skill.color;
                ctxInv.fillStyle = colorList.white;
			}
			
            display.text({
                ctx: ctxInv,
                msg: skill.reqLvl,
                x: i + 20.5,
                y: j,
                xPx: right,
            });

            if (skill.reqSynerzy){
                display.text({
                    ctx: ctxInv,
                    msg: skill.reqSynerzy,
                    x: i + 22.5,
                    y: j,
                    xPx: right,
                });
            }

            ctxInv.restore();
            count++;
            j++;
		}
		
        ctxInv.save();
        j = MS + 1;
        let maxNum;
        if (flag.gain) {
            maxNum = Object.keys(list).length;
		} else if (bookmark) {
            maxNum = MAX_BOOKMARK_NUM;
		} else {
			maxNum = MAX_SKILL_NUM;
		}

        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: j,
            xPx: right,
        });

        ctxInv.textAlign = 'right';
        let [lvl, value, mp, reqLv, reqSy] = option.isEnglish() ? ['Lv', 'Value', 'MP', 'RLv', 'RSy'] :
            ['レベル', '値', 'MP', '必レ', '必シ'];
        display.text({
            ctx: ctxInv,
            msg: lvl,
            x: i + 12,
            y: j,
            xPx: right,
        });

        display.text({
            ctx: ctxInv,
            msg: value,
            x: i + 16,
            y: j,
            xPx: right,
        });

        display.text({
            ctx: ctxInv,
            msg: mp,
            x: i + 18.5,
            y: j,
            xPx: right,
        });

        display.text({
            ctx: ctxInv,
            msg: reqLv,
            x: i + 20.5,
            y: j,
            xPx: right,
        });

        display.text({
            ctx: ctxInv,
            msg: reqSy,
            x: i + 22.5,
            y: j,
            xPx: right,
        });

        ctxInv.restore();
    }

    findBuffStat(key) {
        let found;
        switch (key) {
            case 'dmgAvg':
                if (this.dmgBuff) found = true;
                break;
            case 'rateValue':
                if (this.rateBuff) found = true;
                break;
            case 'acSValueTotal':
            case 'acTValueTotal':
            case 'acBValueTotal':
                if (this.acBuff) found = true;
                break;
            case 'fire':
                if (this.fireBuff) found = true;
                break;
            case 'water':
                if (this.waterBuff) found = true;
                break;
            case 'air':
                if (this.airBuff) found = true;
                break;
            case 'earth':
                if (this.earthBuff) found = true;
                break;
            case 'poison':
                if (this.poisonBuff) found = true;
                break;
            case 'spd':
                if (this.spdBuff) found = true;
                break;
            case 'hpReg':
                if (this.hpRegBuff) found = true;
                break;
            case 'mpReg':
                if (this.mpRegBuff) found = true;
                break;
            case 'mf':
                if (this.mfBuff) found = true;
                break;
            case 'gf':
                if (this.gfBuff) found = true;
                break;
            case 'skillAll':
                if (this.skillBuff) found = true;
                break;
            case 'dmgPoison':
                if (this.venom) found = true;
                break;
            case 'atkCon':
                if (this.confusing) found = true;
                break;
            case 'expBonus':
                if (this.expBuff) found = true;
                break;
            case 'dmgPoison':
                if (this.venom) found = true;
            case 'dmgBonus':
            case 'rateBonus':
            case 'acBonus':
                if (this.enchantSelf) found = true;
                break;
		}
		
        return found;
    }

    deletePackItem(a, number) {
        let item = this.pack[a];
        this.gainOrloseWeight(item, number);
        item.quantity -= number;
        if (!item.quantity) deleteAndSortItem(this.pack, a);
    }

    inventoryOut(item, quantity) {
        let list;
        switch (item.place) {
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
                list = map.coords[item.x][item.y].item;
                break;
		}
		
        item = item.split(quantity, list);
        if (item.place === P_FLOOR) {
            item.id = -1;
            item.x = item.y = 0;
            if (rogue.hallucinated) hallucinate.undoOne(item);
        } else {
			this.gainOrloseWeight(item, quantity);
		}

        if (item.place === P_EQUIPMENT && item.durab) {
            this.getOrLooseStats(item);
            this.calcAll();
		}
		
        return item;
    }

    gainOrloseWeight(item, quantity = item.quantity, gain) {
        this.totalWeight += item.weight * quantity * (gain ? 1 : -1);
        this.calcSpeed();
    }

    deleteBoxItem(i, quantity) {
        let item = this.boxes[i];
        item.quantity -= quantity;
        this.gainOrloseWeight(item, quantity);
        if (!item.quantity) this.boxes[i] = null;
    }

    deleteEquipment(parts, quantity) {
        let item = this.equipment[parts];
        item.quantity -= quantity;
        this.gainOrloseWeight(item, quantity);
        if (item.quantity) return;
        this.equipment[parts] = null;
        if (item.durab) {
            this.getOrLooseStats(item, false);
            this.calcAll();
        }
    }

    stashAdd(stash, item) {
        item.place = P_STASH;
        let key = this.canCarryItem(stash, item);
        if (key >= 0) {
            stash[key].quantity += item.quantity;
            return key;
		}
		
        let l = stash.length;
        stash[l] = item;
        return inventory.sort(l, stash, true); //stash page
    }

    packAdd(item) {
        if (!flag.pack && this.numBoxes) {
            if (this.listAdd(this.boxes, item)) {
                item.place = P_BOX;
                return true;
            }
		}
		
        if (this.listAdd(this.pack, item)) {
            item.place = P_PACK
            return true;
		}
		
        let l = Object.keys(this.pack).length;
        if (l < MAX_PACK_COUNT) {
            item.place = P_PACK
            this.pack[EA[l]] = item;
            inventory.sort(EA[l], this.pack);
            this.gainOrloseWeight(item, item.quantity, true)
            return true;
		}
		
        item.putDown(this.x, this.y, true);
        return false;
    }

    boxAdd(item, a) {
        let item2 = this.boxes[a];
        if (!item2) {
            item.place = P_BOX;
            this.boxes[a] = item;
        } else if (item2.equal(item)) {
            item2.quantity += item.quantity;
		} else {
            item.place = P_BOX;
            item2 = this.inventoryOut(item2, item2.quantity);
            this.packAdd(item2);
            this.boxes[a] = item;
		}
		
        this.gainOrloseWeight(item, item.quantity, true)
    }

    listAdd(list, item) {
        let a = this.canCarryItem(list, item);
        if (a !== undefined) {
            list[a].quantity += item.quantity;
            this.gainOrloseWeight(item, item.quantity, true)
		}
		
        return a;
    }

    canCarryItem(list, item) {
        let key;
        for (let key2 in list) {
            let item2 = list[key2];
            if (!item2) continue;
            if (item2.equal(item)) key = key2;
            if (key) break;
		}
		
        return key;
    }

    createItemIntoPack({
        uniqueId,
        starter,
        magic,
        lvl,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        quantity = 1,
    }) {
        for (let i = 0; i < times; i++) {
            this.packAdd(
                creation.item({
                    type: type,
                    tabId: tabId,
                    quantity: quantity,
                    position: LIST,
                    magic: magic,
                    lvl: lvl,
                    uniqueId: uniqueId,
                    starter: starter,
				})
			);
        }
    }

    getOrLooseStats(s, get, mod, starter) {
        let num = get ? 1 : -1;
        if (mod) { //enemy mod
            if (s.dmgDiceNum) this.dmgDiceNum += num * s.dmgDiceNum;
            if (s.dmgDiceSides) this.dmgDiceSides += num * s.dmgDiceSides;
            if (s.cursed) this.cursed = s.cursed;
            if (s.invisible) this.invisible = s.invisible;
		}
		
        if (s.acBonus && (mod || !this.armor)) this.acBonus += num * s.acBonus;
        if (s.atkType) this.atkType = get ? s.atkType : this.atBare;
        if (s.dmgBase) this.dmgBase = get ? s.dmgBase : this.dmgBare;
        if (s.acSBase) this.acSBaseSum += num * s.acSBase;
        if (s.acTBase) this.acTBaseSum += num * s.acTBase;
        if (s.acBBase) this.acBBaseSum += num * s.acBBase;
        if (s.dmgBonus) this.dmgBonus += num * s.dmgBonus;
        if (s.rateBonus) this.rateBonus += num * s.rateBonus;
        if (s.acSValue) this.acSValueSum += num * s.acSValue;
        if (s.acTValue) this.acTValueSum += num * s.acTValue;
        if (s.acBValue) this.acBValueSum += num * s.acBValue;
        if (s.str) this.str += num * s.str, this.strMax += num * s.str, this.strBonus += num * s.str;
        if (s.dex) this.dex += num * s.dex, this.dexMax += num * s.dex, this.dexBonus += num * s.dex;
        if (s.con) this.con += num * s.con, this.conMax += num * s.con, this.conBonus += num * s.con;
        if (s.int) this.int += num * s.int, this.intMax += num * s.int, this.intBonus += num * s.int;
        if (s.spd) this.spd += num * s.spd, this.spdMax += num * s.spd;
        if (s.mf) this.mf += num * s.mf;
        if (s.gf) this.gf += num * s.gf;
        if (s.hp) this.hpSum += num * s.hp;
        if (s.mp) this.mpSum += num * s.mp;
        if (s.fire) this.fireMax += num * s.fire;
        if (s.water) this.waterMax += num * s.water;
        if (s.air) this.airMax += num * s.air;
        if (s.earth) this.earthMax += num * s.earth;
        if (s.poison) this.poisonMax += num * s.poison;
        if (s.skillFire) this.skillFire += num * s.skillFire;
        if (s.skillWater) this.skillWater += num * s.skillWater;
        if (s.skillAir) this.skillAir += num * s.skillAir;
        if (s.skillEarth) this.skillEarth += num * s.skillEarth;
        if (s.skillPoison) this.skillPoison += num * s.skillPoison;
        if (s.skillAll) this.skillAll += num * s.skillAll;
        if (s.iasBase) this.iasBase += num * s.iasBase;
        if (s.ias) this.ias += num * s.ias;
        if (s.fcrBase) this.fcrBase += num * s.fcrBase;
        if (s.frwBase) this.frwBase += num * s.frwBase;
        if (s.fcr) this.fcr += num * s.fcr;
        if (s.frw) this.frw += num * s.frw;
        if (s.hpReg) this.hpReg += num * s.hpReg;
        if (s.mpReg) this.mpReg += num * s.mpReg;
        if (s.digest) this.digest += num * s.digest;
        if (s.stealth) this.stealth += num * s.stealth;
        if (s.searching) this.searching += num * s.searching;
        if (s.levi) this.levi += num * s.levi;
        if (s.teleported) this.teleported += num * s.teleported;
        if (s.aggravating) this.aggravating += num * s.aggravating;
        if (s.strSus) this.strSus += num * s.strSus;
        if (s.dexSus) this.dexSus += num * s.dexSus;
        if (s.conSus) this.conSus += num * s.conSus;
        if (s.intSus) this.intSus += num * s.intSus;
        if (s.digging) this.digging += num * s.digging;
        if (s.dmgHuman) this.dmgHuman += num * s.dmgHuman;
        if (s.dmgDemon) this.dmgDemon += num * s.dmgDemon;
        if (s.dmgAnimal) this.dmgAnimal += num * s.dmgAnimal;
        if (s.dmgDragon) this.dmgDragon += num * s.dmgDragon;
        if (s.dmgUndead) this.dmgUndead += num * s.dmgUndead;
        if (s.dmgGiant) this.dmgGiant += num * s.dmgGiant;
        if (s.dmgSpirit) this.dmgSpirit += num * s.dmgSpirit;
        if (s.dmgFire) this.dmgFire += num * s.dmgFire;
        if (s.dmgLightning) this.dmgLightning += num * s.dmgLightning;
        if (s.dmgPoison) this.dmgPoison += num * s.dmgPoison;
        if (s.dmgAcid) this.dmgAcid += num * s.dmgAcid;
        if (s.stealLife) this.stealLife += num * s.stealLife;
        if (s.stealMana) this.stealMana += num * s.stealMana;
        if (s.atkCon) this.atkCon += num * s.atkCon;
        if (s.atkPara) this.atkPara += num * s.atkPara;
        if (s.atkSlow) this.atkSlow += num * s.atkSlow;
        if (s.atkInf) this.atkInf += num * s.atkInf;
        if (s.atkBlind) this.atkBlind += num * s.atkBlind;
        if (s.atkRadi) this.atkRadi += num * s.atkRadi;
        if (s.atkCold) this.atkCold += num * s.atkCold;
        if (s.atkDrain) this.atkDrain += num * s.atkDrain;
        if (s.atkStealGold) this.atkStealGold += num * s.atkStealGold;
        if (s.atkStealItem) this.atkStealItem += num * s.atkStealItem;
        if (s.expBonus) this.expBonus += num * s.expBonus;
        if (s.lighten && (!mod && s.duration || mod)) {
            this.lighten += num * s.lighten;
            if (!mod && !starter) this.lightenOrDarken('Lighten');
		}
		
        if (s.numBoxes) {
            get ? this.getBoxes(s.numBoxes) : this.looseBoxes(s.numBoxes);
            this.numBoxes += num * s.numBoxes;
        }
    }

    getBoxes(numBoxes) {
        for (let i = this.numBoxes + 1; i <= this.numBoxes + numBoxes; i++) {
            let item = this.eqt[i];
            if (item) {
                this.boxAdd(item, i);
                delete this.eqt[i];
            } else {
				this.boxes[i] = null;
			}
        }
        if (Object.keys(this.eqt).length) {
            for (let key in this.eqt) {
                let item = this.eqt[key];
                if (!this.packAdd(item)) item.dropped();
			}
			
            this.eqt = {};
        }
    }

    looseBoxes(numBoxes) {
        for (let i = this.numBoxes - numBoxes + 1; i <= this.numBoxes; i++) {
            let item = this.boxes[i];
            delete this.boxes[i];
            if (!item) continue;
            this.gainOrloseWeight(item, item.quantity);
            if (flag.equip) {
                this.eqt[i] = item;
			} else if (!this.packAdd(item)) {
				item.dropped();
			}
        }
    }

    calcAll() {
        this.calcHP();
        this.calcMP();
        this.calcWeightLimit();
        this.calcDmg();
        this.calcAc();
        this.calcResist();
        this.calcMoveTimes();
    }

    haveCast(skillId, lvl, f = this, x, y) {
        let skill = skillMap.get(skillId);
        if (skill.kind === 'attack' || skill.kind === 'breath') {
            this.attack({
                enemy: f,
                skill: skill,
                lvl: lvl,
			});
			
            if (skill.effect && f.hp > 0 && evalPercentage(skill.effect.prob)) this.haveCast(skill.effect.id, lvl, f, x, y);
            if (!skill.effectSelf && f.hp > 0) return;
		}
		
        let name = f.getName(true);
        if (skill.durBase) var duration = this.calcSkillDur(skill, lvl);
        switch (skillId) {
            case HEAL:
            case EXTRA_HEAL:
                let amount = this.calcSkillValue(skill, lvl);
                f.hp += amount;
                message.draw(option.isEnglish() ?
                    `${name} got well (+${amount})` :
                    `${name}傷が癒えた(+${amount})`);
                if (f.hp > f.hpMax) f.hp = f.hpMax;
                f.poisoned = 0;
                f.confused = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    map.redraw(rogue.x, rogue.y);
				}
				
                if (skillId === EXTRA_HEAL) {
                    f.infected = 0;
                    if (f.hallucinated) {
                        f.hallucinated = 0;
                        if (f.id === ROGUE) hallucinate.all(true);
                    }
				}
				
                break;
            case MANA:
                f.mp += this.calcSkillValue(skill, lvl);
                if (f.mp >= f.mpMax) f.mp = f.mpMax;
                break;
            case LIFE_REGENERATION:
                f.hpReg -= f.hpRegBuff;
                f.hpRegBuff = this.calcSkillValue(skill, lvl);
                f.hpReg += f.hpRegBuff;
                f.hpRegBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Life Regeneration` :
                    `${name}再生の効果を得た`);
                break;
            case MANA_REGENERATION:
                f.mpReg -= f.mpRegBuff;
                f.mpRegBuff = this.calcSkillValue(skill, lvl);
                f.mpReg += f.mpRegBuff;
                f.mpRegBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Mana Regeneration` :
                    `${name}魔力再生の効果を得た`);
                break;
            case WEAKNESS:
                if (evalPercentage(f.poison)) return;
                f.decayOrRestore(STR);
                break;
            case CLUMSINESS:
                if (evalPercentage(f.poison)) return;
                f.decayOrRestore(DEX);
                break;
            case SICKLINESS:
                if (evalPercentage(f.poison)) return;
                f.decayOrRestore(CON);
                break;
            case STUPIDITY:
                if (evalPercentage(f.poison)) return;
                f.decayOrRestore(INT);
                break;
            case RESTORE_STRENGTH:
                f.decayOrRestore(STR, true);
                break;
            case RESTORE_DEXTERITY:
                f.decayOrRestore(DEX, true);
                break;
            case RESTORE_CONSTITUTION:
                f.decayOrRestore(CON, true);
                break;
            case RESTORE_INTELLIGENCE:
                f.decayOrRestore(INT, true);
                break;
            case RESTORE_EXPERIENCE:
                f.decayOrRestore(EXP, true);
                break;
            case RESTORE_ALL:
                f.decayOrRestore(STR, true);
                f.decayOrRestore(DEX, true);
                f.decayOrRestore(CON, true);
                f.decayOrRestore(INT, true);
                f.decayOrRestore(EXP, true);
                break;
            case CURE_ALL:
                f.confused = f.canceled = f.poisoned = f.infected = f.paralyzed = f.sleeping = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ROGUE) map.redraw(rogue.x, rogue.y);
				}
				
                if (f.hallucinated) {
                    f.hallucinated = 0;
                    if (f.id === ROGUE) hallucinate.all(true);
				}
				
                if (f.slowed) {
                    f.slowed = 0;
                    f.spdNerf = 0;
                    f.calcSpeed();
                }

                break;
            case RESIST_FIRE:
                f.fireBuff = this.calcSkillValue(skill, lvl);
                f.fireBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Fire` :
                    `${name}耐火の効果を得た`);
                f.calcResist();
                break;
            case RESIST_WATER:
                f.waterBuff = this.calcSkillValue(skill, lvl);
                f.waterBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Water` :
                    `${name}耐水の効果を得た`);
                f.calcResist();
                break;
            case RESIST_AIR:
                f.airBuff = this.calcSkillValue(skill, lvl);
                f.airBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Air` :
                    `${name}耐風の効果を得た`);
                f.calcResist();
                break;
            case RESIST_EARTH:
                f.earthBuff = this.calcSkillValue(skill, lvl);
                f.earthBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Earth` :
                    `${name}耐土の効果を得た`);
                f.calcResist();
                break;
            case RESIST_POISON:
                f.poisonBuff = this.calcSkillValue(skill, lvl);
                f.poisonBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Poison` :
                    `${name}耐毒の効果を得た`);
                f.calcResist();
                break;
            case RESIST_ALL:
                f.fireBuff = f.waterBuff = f.airBuff = f.earthBuff = f.poisonBuff = this.calcSkillValue(skill, lvl);
                f.fireBuffDur = f.waterBuffDur = f.airBuffDur = f.earthBuffDur = f.poisonBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist All` :
                    `${name}全耐性の効果を得た`);
                f.calcResist();
                break;
            case LOWER_RESIST:
                if (evalPercentage(f.poison)) return;
                f.lowerRes = this.calcSkillValue(skill, lvl);
                f.lowerResDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Lower Resist` :
                    `${name}耐性低下の効果を受けた`);
                f.calcResist();
                break;
            case ENLIGHTENMENT:
                if (f.id !== ROGUE) return;
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
                f.teleport(false, MIN_TELE_RAD_SQ);
                break;
            case TELEPORT_AWAY:
                f.teleport(false, this.calcSkillValue(skill, lvl) ** 2);
                break;
            case TELEPORT_TO:
                f.teleport(false, false, this.x, this.y);
                break;
            case REMOVE_CURSE:
                for (let key in f.equipment) {
                    let item = f.equipment[key];
                    if (item && item.cursed) item.uncurse();
				}
				
                break;
            case IDENTIFY:
                flag.identify = true;
                flag.regular = false;
                inventory.clear();
                this.showInventory(P_PACK);
                this.equipmentList();
                message.draw(message.get(M_IDENTIFY) + message.get(M_FLOOR), true);
                return null;
            case DISINTEGRATION:
                inventory.clear();
                flag.disint = true;
                flag.regular = false;
                message.draw(message.get(M_DISINTEGRATION), true);
                return null;
            case RESTORE_DURABILITY:
                inventory.clear();
                flag.repair = true;
                this.showInventory(P_PACK);
                this.equipmentList();
                message.draw(message.get(M_REPAIR) + message.get(M_FLOOR), true);
                flag.regular = false;
                return null;
            case REPAIR_ALL:
                this.repairAll();
                break;
            case LIGHT:
                shadowcasting.main({
                    x0: this.x,
                    y0: this.y,
                    radius: this.calcSkillValue(skill, lvl),
                    type: 'Light',
				});
				
                rogue.lightenOrDarken('Lighten');
                break;
            case MAGIC_MAPPING:
                audio.playSound('probe');
            case MONSTER_DETECTION:
            case ITEM_DETECTION:
            case SCREAM:
                circleSearch.main({
                    x0: this.x,
                    y0: this.y,
                    type: skillId,
                    radius: this.calcSkillValue(skill, lvl),
                });

                if (skillId === ITEM_DETECTION) audio.playSound('probe2');
                break;
            case EARTHQUAKE:
                let percEQ = this.calcSkillValue(skill, lvl);
                circleSearch.main({
                    x0: this.x,
                    y0: this.y,
                    type: skillId,
                    radius: skill.radius,
                    perc: percEQ < skill.limit ? percEQ : skill.limit,
				});
				
                rogue.litMapIds = {};
                rogue.lightenOrDarken('Lighten');
                break;
            case SATISFY_HUNGER:
                f.hunger += MAX_HUNGER * this.calcSkillValue(skill, lvl) / 100;
                if (f.hunger > MAX_HUNGER) f.hunger = MAX_HUNGER;
                break;
            case TOWN_PORTAL:
                let portal = new Portal();
                portal.init(LOCATION, this.x, this.y);
                message.draw(option.isEnglish() ?
                    `Created a Town Portal` :
                    `タウン・ポータルを生成した`);
                break;
            case SPEED:
                f.spdBuff = this.calcSkillValue(skill, lvl);
                f.speeded = duration;
                f.calcSpeed();
                message.draw(option.isEnglish() ?
                    `${name} speeded up` :
                    `${name}加速した`);
                audio.playSound('speed');
                break;
            case ECCO:
                f.ecco = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Ecco` :
                    `${name}エコーの効果を得た`);
                break;
            case POISON:
                if (evalPercentage(f.poison)) return;
                f.poisoned = duration;
                f.poisonedId = this.id;
                message.draw(option.isEnglish() ?
                    `${name} got poisoned` :
                    `${name}毒を受けた`);
                break;
            case RADIATION:
                if (evalPercentage(f.radiation)) return;
                f.decayOrRestore();
                break;
            case SLOW:
            case GRAVITATIONAL_FIELD:
                if (evalPercentage(f.gravity)) return;
                f.spdNerf = this.calcSkillValue(skill, lvl);
                f.slowed = duration;
                f.calcSpeed();
                message.draw(option.isEnglish() ?
                    `${name} slowed down` :
                    `${name}減速した`);
                audio.playSound('slow');
                break;
            case CONFUSION:
                if (evalPercentage(f.poison)) return;
                f.confused = duration;
                message.draw(option.isEnglish() ?
                    `${name} got confused` :
                    `${name}混乱した`);
                break;
            case TOUCH_OF_CONFUSION:
                f.atkCon = this.calcSkillValue(skill, lvl);
                if (f.atkCon > skill.limit) f.atkCon = skill.limit;
                f.confusing = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Touch of Confusion` :
                    `${name}混乱の手の効果を得た`);
                break;
            case VENOM_HANDS:
                if (f.venom) f.dmgPoison -= f.venom;
                f.venom = this.calcSkillValue(skill, lvl);
                f.dmgPoison += f.venom;
                f.venomDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Venom Hands` :
                    `${name}猛毒の手の効果を得た`);
                break;
            case ENCHANT_SELF:
                if (f.enchantSelf) {
                    f.dmgBonus -= f.enchantSelf;
                    f.rateBonus -= f.enchantSelf;
                    f.acBonus -= f.enchantSelf;
				}
				
                f.enchantSelf = this.calcSkillValue(skill, lvl);
                f.enchantSelfDur = duration;
                f.dmgBonus += f.enchantSelf;
                f.rateBonus += f.enchantSelf;
                f.acBonus += f.enchantSelf;
                f.calcDmg();
                f.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Enchant Self` :
                    `${name}自己強化の効果を得た`);
                break;
            case PARALYSIS:
            case HOLD_MONSTER:
                if (evalPercentage(f.poison)) return;
                f.paralyzed = duration;
                message.draw(option.isEnglish() ?
                    `${name} got paralyzed` :
                    `${name}麻痺した`);
                audio.playSound('paralyze');
                break;
            case SLEEP:
            case SLEEPING_GAS:
                if (evalPercentage(f.poison)) return;
                f.sleeping = duration;
                message.draw(option.isEnglish() ?
                    `${name} fell asleep` :
                    `${name}昏睡した`);
                break;
            case BLINDNESS:
                if (evalPercentage(f.poison)) return;
                f.blinded = duration;
                if (f.id === ROGUE) f.goBlind();
                message.draw(option.isEnglish() ?
                    `${name} got blinded` :
                    `${name}盲目になった`);
                audio.playSound('blind');
                break;
            case INVISIBILITY:
                if (f.invisible) return;
                f.invisibility = duration;
                f.invisible = true;
                map.coords[f.x][f.y].draw();
                break;
            case SEE_INVISIBLE:
                f.seeInvisible = duration;
                if (f.id === ROGUE) seeInvisible(true);
                message.draw(option.isEnglish() ?
                    `${name} can see invisible things` :
                    `${name}透明の物体が見えるようになった`);
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ROGUE) map.redraw(rogue.x, rogue.y);
				}
				
                break;
            case INFECTION:
                if (evalPercentage(f.infection)) return;
                f.infected = duration;
                message.draw(option.isEnglish() ?
                    `${name} got infected` :
                    `${name}感染した`);
                break;
            case HALLUCINATION:
            case HALLUCINATING_MIST:
                if (evalPercentage(f.poison)) return;
                let found2;
                if (!f.hallucinated && f.id === ROGUE) found2 = true;
                f.hallucinated = duration;
                if (f.id !== ROGUE) f.removeCe();
                if (found2) hallucinate.all();
                message.draw(option.isEnglish() ?
                    `${name} got hallucinated` :
                    `${name}幻覚状態になった`);
                break;
            case POLYMORPH:
                if (f.id === ROGUE || f.mod === UNIQUE || evalPercentage(f.poison)) return;
                let [tempX, tempY] = [f.x, f.y];
                f.died();
                creation.enemy({
                    position: LOCATION,
                    x: tempX,
                    y: tempY,
                    summon: true,
				});
				
                message.draw(option.isEnglish() ?
                    `${name} got polymorphed` :
                    `${name}変容した`);
                break;
            case CANCELLATION:
                if (evalPercentage(f.poison)) return;
                f.canceled = duration * (f.mod !== UNIQUE ? 1 : 2);
                if (f.invisible) {
                    if (f.invisible !== DEFAULT) f.invisibility = 0;
                    f.invisible = false;
                    map.coords[x][y].draw();
				}
				
                if (f.mimic && !f.identified) {
                    hallucinate.undoOne(f);
                    f.identified = true;
                    map.coords[f.x][f.y].draw();
				}
				
                message.draw(option.isEnglish() ?
                    `${name} got canceled` :
                    `${name}封印された`);
                break;
            case RAISE_LEVEL:
                if (f.lvl !== MAX_FIGHTER_LVL) f.gainExp(calcLevel(f.lvl + 1) - f.exp, true);
                break;
            case CREATE_MONSTER:
            case CREATE_MAGIC_MONSTER:
            case CREATE_GIANT:
                let type;
                if (skillId === CREATE_MONSTER || skillId === CREATE_MAGIC_MONSTER) {
                    type = RANDOM;
				} else if (skillId === CREATE_GIANT) {
					type = 'giants';
				}

                creation.enemy({
                    times: rndIntBet(1, 3),
                    type: type,
                    position: LOCATION,
                    x: this.x,
                    y: this.y,
                    summon: true,
                    magic: skillId === CREATE_MAGIC_MONSTER,
				});
				
                audio.playSound('summon');
                break;
            case CREATE_TRAP:
                creation.trap(5, RANDOM, LOCATION, this.x, this.y);
                break;
            case MAGIC_CIRCLE_OF_PROTECTION:
                creation.trap(1, 0, LOCATION, this.x, this.y, true);
                break;
            case MAGIC_FINDING:
                f.mf -= f.mfBuff;
                f.mfBuff = this.calcSkillValue(skill, lvl);
                f.mf += f.mfBuff;
                f.mfBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Magic Finding` :
                    `${name}魔法具探求の効果を得た`);
                break;
            case GOLD_FINDING:
                f.gf -= f.gfBuff;
                f.gfBuff = this.calcSkillValue(skill, lvl);
                f.gf += f.gfBuff;
                f.gfBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Gold Finding` :
                    `${name}財宝探求の効果を得た`);
                break;
            case EXPERIENCE:
                if (f.expBuff) f.expBonus -= f.expBuff;
                f.expBuff = this.calcSkillValue(skill, lvl);
                f.expBonus += f.expBuff;
                f.expBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Experience` :
                    `${name}経験の効果を得た`);
                break;
            case SKILL:
                if (f.skillBuff) f.skillAll -= f.skillBuff;
                f.skillBuff = this.calcSkillValue(skill, lvl);
                f.skillAll += f.skillBuff;
                f.skillBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Skill` :
                    `${name}スキルの効果を得た`);
                break;
            case ENCOURAGEMENT:
                f.dmgBuff = f.rateBuff = this.calcSkillValue(skill, lvl);
                f.dmgBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Combat` :
                    `${name}戦闘の効果を得た`);
                f.calcDmg();
                break;
            case BLESSING:
                f.acBuff = this.calcSkillValue(skill, lvl);
                f.acBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Armor` :
                    `${name}守護の効果を得た`);
                f.calcAc();
                break;
            case RESPEC:
                if (f.mod === UNIQUE) return;
                f.respec();
                break;
            case COLD:
            case FREEZING_ARROW:
                if (evalPercentage(f.cold)) return;
                f.cost += COLD_DELAY + (skillId === COLD ? 0 : COLD_DELAY * 5 - f.cold);
                break;
            case PHOTON_ARROW:
                this.cost -= 3;
                break;
            case STONE_TO_MUD:
                if (map.coords[x][y].isObstacle()) {
                    let loc = map.coords[x][y];
                    if (loc.wall) {
                        loc.deleteWall(true);
					} else {
						loc.deleteDoor(true);
					}

                    audio.playSound('dig', distanceSq(this.x, this.y, x, y));
				}
				
                if (rogue.litMapIds[x + ',' + y]) rogue.lightenOrDarken('Lighten');
                if (f.material === M_STONE) {
                    this.attack({
                        enemy: f,
                        skill: skill,
                        lvl: lvl,
                    });
				}
				
                break;
        }
    }

    aim({
        x1,
        y1,
        nameSkill,
        ecco,
        keyCode = null,
    }) {
        if (keyCode === 88) { //x
            if (this.blinded) {
                message.draw(message.get(M_CANT_EXAMINE));
                return;
			}
			
            flag.examine = true;
            cursol.init();
            this.examine();
            return;
		}
		
        if (keyCode !== null) {
            if (keyCode === 190 || keyCode === 110) { //., T.
                [x1, y1] = [this.x, this.y];
			} else {
                var dr = getDirection(keyCode);
                if (dr === null) return;
            }
		}
		
        let skill, lvl;
        if (flag.zap) {
            var w = this.ci;
            this.ci = null;
            nameSkill = w.nameSkill;
            skill = skillMap.get(nameSkill);
            lvl = w.skillLvl;
            let name = w.getName(false, 1);
            message.draw(option.isEnglish() ?
                `Zapped ${name}` :
                `${name}を振った`);
        } else if (flag.skill) {
            if (!nameSkill) nameSkill = this.cs.id;
            skill = skillMap.get(nameSkill);
            lvl = this.cs.lvl + this.getSkillBoost(skill);
            let name = skill.name[option.getLanguage()];
            let nameChar = this.getName(true);
            message.draw(option.isEnglish() ?
                `${nameChar} cast ${name}` :
                skill.type === 'spell' ?
                `${nameChar}${name}を唱えた` :
                `${nameChar}${name}を放った`);
            audio.playSound(skill.element);
        } else if (flag.scroll) {
            nameSkill = this.ci.nameSkill;
            skill = skillMap.get(nameSkill);
            lvl = this.ci.skillLvl;
        } else if (flag.throw) {
            let name = this.ci.getName(false, 1);
            message.draw(option.isEnglish() ?
                `Threw ${name}` :
                `${name}を投げた`);
                audio.playSound('throw');
		}
		
        let thrown = flag.arrow || flag.throw;
        if (flag.zap && !w.charges) {
            message.draw(message.get(M_NOTHING_HAPPENED));
            flag.zap = false;
        } else {
            let found = false;
            let hit = false;
            let [xS, yS] = [this.x, this.y];
            if (thrown || skill.range !== 0) {
                let loc;
                let parabora = !dr && (thrown || skill.parabora);
                let rangeSq = !thrown && skill.range ? skill.range ** 2 : FOV_SQ;
                if (dr)[x1, y1] = [this.x + dr.x * FOV, this.y + dr.y * FOV];
                var [x0, xT, y0, yT] = [this.x, this.x, this.y, this.y]
                var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
                if (steep)[x0, y0, x1, y1] = [y0, x0, y1, x1];
                let [dx, dy] = [Math.abs(x1 - x0), Math.abs(y1 - y0)];
                let error = dx / 2;
                let ystep = y0 < y1 ? 1 : -1;
                let y = y0;
                let los = true;
                let inc = x0 < x1 ? 1 : -1;
                for (let x = x0 + inc; x1 - x + inc; x += inc) {
                    error -= dy;
                    if (error < 0) {
                        y += ystep;
                        error += dx;
					}
					
                    [xS, yS] = !steep ? [x, y] : [y, x];
                    loc = map.coords[xS][yS];
                    if (distanceSq(x, y, x0, y0) > rangeSq) {
                        los = false;
                        break;
					}
                    
                    if (!thrown && skill.each) {
                        if (!loc.isObstacle())
                            shadowcasting.main({
                                x0: xS,
                                y0: yS,
                                radius: skill.radius,
                                type: nameSkill,
                                lvl: lvl,
                                fighter: this,
							});
                    } else if ((!parabora || parabora && x === x1 && y === y1) &&
                        loc.fighter && (this.isOpponent(loc.fighter))) {
                        let fighter = loc.fighter;
                        hit = true;
                        if (thrown) {
                            if (flag.arrow) {
                                this.attack({
                                    enemy: fighter,
                                    missile: true,
                                });
                            } else if (flag.throw) {
                                this.haveThrown(this.ci, fighter, xS, yS);
                            }

                            break;
						}
						
                        if (skill.radius) {
                            shadowcasting.main({
                                x0: xS,
                                y0: yS,
                                radius: skill.radius,
                                type: nameSkill,
                                lvl: lvl,
                                fighter: this,
                            });
						} else {
							this.haveCast(nameSkill, lvl, fighter, xS, yS);
						}

                        if (flag.zap && !w.identified && !skill.wall) found = true;
                        if (!skill.penetrate) break;
					}
					
                    if (loc.isObstacle()) {
                        los = false;
                        break;
					}
					
                    [xT, yT] = [xS, yS];
				}
				
                if (!los) {
                    if (!thrown && skill.wall &&
                      		(loc.wall && !loc.indestructible ||
                            loc.isClosedDoor())) {
                        this.haveCast(nameSkill, lvl, undefined, xS, yS);
                        if (flag.zap && !w.identified) found = true;
                    } else {
						[xS, yS] = [xT, yT];
					}
                }
			}
			
            if (flag.died) return;
            if (!thrown && skill.radius && (!hit || skill.penetrate)) {
                shadowcasting.main({
                    x0: xS,
                    y0: yS,
                    radius: skill.radius,
                    type: nameSkill,
                    lvl: lvl,
                    fighter: this,
				});
			}

            if (thrown) {
                if (!hit) this.deleteAmmo(this.ci, true, xS, yS);
                flag.arrow = flag.throw = false;
            } else if (flag.skill) {
                this.consumeMana(skill);
                if (!ecco && this.ecco && this.mp >= skill.mp) {
                    if (steep)[x1, y1] = [y1, x1];
                    this.aim({
                        x1: x1,
                        y1: y1,
                        nameSkill: nameSkill,
                        ecco: true,
					});
					
                    return;
				}
				
                if (skill.move) {
                    if (nameSkill === RAID && hit) {
                        this.teleport(false, false, xT, yT, true);
					} else if (nameSkill === RUSH || nameSkill === SPIRAL || nameSkill === COLLAPSE) {
						this.teleport(false, false, xS, yS, true);
					}
                }
                if (skill.type === 'missile') this.deleteAmmo(this.ci);
                flag.skill = false;
            } else if (flag.scroll) {
                if (flag.aim) this.deleteItem(this.ci, 1);
                flag.scroll = false;
            } else if (flag.zap) {
                if (found) w.identifyWand();
                this.reduceItemCharge(w);
                flag.zap = false;
            }
		}
		
        if (this.id !== ROGUE) return;
        if (!flag.examine) display.clearOne(display.ctxes.cur);
        inventory.clear();
        rogue.done = true;
        flag.aim = false;
        flag.regular = true;
    }

    checkToCast(skill) {
        let msgId;
        let check = true;
        if (!skill) {
            if (!this.skill['a']) {
                msgId = M_DONT_HAVE_SKILL;
                check = false;
            } else if (this.canceled) {
                msgId = M_CANT_CAST;
                check = false;
            } else if (!this.canRead(true)) {
				check = false;
			}
        } else if (this.id === ROGUE && !this.haveBook(skill.id)) {
            msgId = M_DONT_HAVE_BOOK;
            check = false;
        } else if (skill.mp > this.mp) {
            msgId = M_DONT_HAVE_MANA;
            check = false;
        } else if (skill.type === 'missile') {
            if (!this.haveMissile(true)) {
                check = false;
            } else {
                this.ci = this.getAmmo(this.equipment['main'].throwType);
                if (!this.ci) {
                    msgId = M_DONT_HAVE_AMMO;
                    check = false;
                }
            }
        } else if (skill.type === 'melee' && this.haveMissile()) {
            msgId = M_DONT_HAVE_MELEE;
            check = false;
		}
		
        if (this.id === ROGUE && msgId) message.draw(message.get(msgId));
        return check;
    }

    canRead(book) {
        let found = true;
        if (this.blinded || this.confused || !rogue.litMapIds[this.x + ',' + this.y]) {
            if (this.id === ROGUE) {
                let id = book ? M_CANT_READ_BOOK : M_CANT_READ_SCROLL;
                message.draw(message.get(id));
			}
			
            found = false;
		}
		
        return found;
    }

    haveBook(nameSkill, alchemy) {
        let found = this.haveBookLoop(this.pack, nameSkill, alchemy);
        if (!found) found = this.haveBookLoop(this.boxes, nameSkill, alchemy);
        return found;
    }

    haveBookLoop(list, nameSkill, alchemy) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === 'book') {
                if (alchemy && item.alchemy) {
                    return true
				} else if (nameSkill && item.skill) {
                    for (let key2 in item.list) {
                        if (item.list[key2] === nameSkill) return true
                    }
                }
            }
        }
    }

    castSelfSpell(skill, ecco) {
        let lvl = this.cs.lvl + this.getSkillBoost(skill);
        let name = this.getName(true);
        let nameSkill = skill.name[option.getLanguage()];
        message.draw(option.isEnglish() ?
            `${name} cast ${nameSkill}` :
            skill.type === 'spell' ?
            `${name}${nameSkill}を唱えた` :
            `${name}${nameSkill}を放った`);
        if (this.haveCast(skill.id, lvl, this) === null) return null;
        this.consumeMana(skill);
        if (!ecco && this.ecco && this.mp >= skill.mp && skill.id !== ECCO) this.castSelfSpell(skill, true);
    }

    searchSkill(id) {
        for (let key in this.skill) {
            if (this.skill[key].id === id) return key;
		}
		
        return false;
    }

    consumeMana(skill) {
        this.cost -= this['times' + getUpperCase(skill.type)] - 1;
        this.mp -= skill.mp;
    }

    haveMissile(msg) {
        let found = true;
        if (!this.equipment['main'] || this.equipment['main'].type !== 'missile') {
            if (msg) message.draw(message.get(M_DONT_HAVE_MISSILE));
            found = false;
		}
		
        return found;
    }

    getAmmo(throwType) {
        let item = this.getAmmoLoop(this.boxes, throwType);
        if (!item) item = this.getAmmoLoop(this.pack, throwType);
        if (!item) item = this.getAmmoLoop(map.coords[this.x][this.y].item, throwType);
        return item;
    }

    getAmmoLoop(list, throwType) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === 'ammo' && item.throwType === throwType) return item;
		}
		
        return null;
    }

    deleteAmmo(item, drop, x, y) {
        if (!drop) {
            this.deleteItem(item, 1);
		} else {
            item = this.inventoryOut(item, 1);
            item.putDown(x, y, true);
            this.ci = null;
        }
    }

    deleteItem(item, quantity) {
        if (flag.scroll) {
            flag.scroll = false;
            if (item.chargeBook) {
                this.reduceItemCharge(item);
                return;
            }
		}
		
        switch (item.place) {
            case P_PACK:
                this.deletePackItem(item.indexOf(this.pack), quantity);
                break;
            case P_BOX:
                this.deleteBoxItem(item.indexOf(this.boxes), quantity);
                break;
            case P_FLOOR:
                let loc = map.coords[item.x][item.y];
                loc.deleteItem(item.indexOf(loc.item), quantity);
                break;
            case P_EQUIPMENT:
                this.deleteEquipment(item.indexOf(this.equipment), quantity);
                break;
		}
		
        this.ci = null;
    }

    reduceItemCharge(item) {
        if (item.quantity > 1) {
            item = this.inventoryOut(item, 1);
            item.charges--;
            if (item.identified) item.changePrice();
            if ((item.place === P_PACK || item.place === P_BOX) && !this.packAdd(item)) {
                item.dropped();
			} else if (item.place === P_FLOOR) {
				item.putDown(item.x, item.y, true);
			}
        } else {
            item.charges--;
            if (item.identified) {
                item.changePrice();
                if (item.place === P_PACK) inventory.sort(this.getItemIndex(item), this.pack);
            }
        }
    }

    getItemIndex(item) {
        let a;
        switch (item.place) {
            case P_PACK:
                a = item.indexOf(this.pack);
                break;
            case P_BOX:
                a = item.indexOf(this.boxes);
                break;
            case P_FLOOR:
                let loc = map.coords[item.x][item.y];
                a = item.indexOf(loc.item);
                break;
            case P_EQUIPMENT:
                a = item.indexOf(this.equipment);
                break;
		}
		
        return a;
    }

    swap() {
        let name = this.getName(true);
        if (this.equipment['main'] && this.equipment['main'].cursed ||
      	    	this.equipment['off'] && this.equipment['off'].cursed) {
            let verb;
            if (this.equipment['main'] && this.equipment['main'].cursed) {
                verb = option.isEnglish() ? 'unwield' : '離す';
			} else {
				verb = option.isEnglish() ? 'take off' : '外す';
			}

            message.draw(option.isEnglish() ?
                `${name} can't ${verb} the cursed item` :
                `${name}呪われたアイテムを${verb}事が出来ない`);
            return null;
		}
		
        let itemMain = this.equipment['main'];
        let itemOff = this.equipment['off'];
        let itemSideA = this.side['a'];
        let itemSideB = this.side['b'];
        if (itemMain && itemMain.durab) this.getOrLooseStats(itemMain, false);
        if (itemOff && itemOff.durab) this.getOrLooseStats(itemOff, false);
        if (itemSideA && itemSideA.durab) this.getOrLooseStats(itemSideA, true);
        if (itemSideB && itemSideB.durab) this.getOrLooseStats(itemSideB, true);
        [this.equipment['main'], this.equipment['off'], this.side['a'], this.side['b']] = [itemSideA, itemSideB, itemMain, itemOff];
        this.calcAll();
        this.swapped = !this.swapped;
        message.draw(option.isEnglish() ?
            `${name} swapped gear` :
            `${name}装備を持ち替えた`);
        if (this.id !== ROGUE) return;
        rogue.done = true;
        if (!flag.equipment) {
            this.equipmentList();
            flag.clearInv = true;
        }
    }

    stealGold(enemy) {
        if (!enemy.purse || evalPercentage(enemy.dex * 2)) return;
        let amount = Item.goldAmount(this.lvl);
        if (amount < enemy.purse / 50) {
            amount = enemy.purse / 50;
		} else if (amount > enemy.purse) {
			amount = enemy.purse;
		}

        amount = Math.ceil(amount);
        enemy.purse -= amount;
        this.createItemIntoPack({
            type: 'coin',
            tabId: C_COIN,
            quantity: amount,
		});
		
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} stole $${amount}` :
            `${name}$${amount}を盗んだ`);
        this.teleport(false, MIN_TELE_RAD_SQ);
        return true;
    }

    stealItem(enemy) {
        if (evalPercentage(enemy.dex * 2)) return;
        let { pack, box } = enemy.haveItem();
        if (!pack && !box) return;
        if (pack && box) {
            pack = coinToss();
            box = !pack;
		}
		
        let item;
        if (pack) {
            let a = EA[rndInt(Object.keys(enemy.pack).length - 1)];
            item = enemy.pack[a];
        } else {
            let nums = enums(1, enemy.numBoxes);
            nums.shuffle();
            for (let i = 0; i < enemy.numBoxes; i++) {
                if (enemy.boxes[nums[i]]) {
                    item = enemy.boxes[nums[i]];
                    break;
                }
            }
		}
		
        item = enemy.inventoryOut(item, 1);
        this.packAdd(item);
        let nameItem = item.getName();
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} stole ${nameItem}` :
            `${name}${nameItem}を盗んだ`);
        this.teleport(false, MIN_TELE_RAD_SQ);
        return true;
    }

    haveItem() {
        let pack = !!this.pack['a'];
        let box;
        for (let key in this.boxes) {
            if (this.boxes[key]) {
                box = true;
                break;
            }
		}
		
        return { pack, box };
    }

    decreaseDurab(weapon, element) {
        let item = this.equipment[weapon ? 'main' : BP[EA[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
        if (!item || !item.durab || item.indestructible) return;
        if (element) {
            let mat;
            switch (element) {
                case 'acid':
                    mat = M_METAL;
                    break;
                case 'fire':
                    mat = M_CLOTH | M_FUR | M_FEATHER | M_SKIN | M_SCALE | M_WOOD;
                    break;
                case 'lightning':
                    mat = M_BONE | M_SHELL | M_GEM | M_STONE | M_HORN;
                    break;
            }
            if (!(item.material & mat)) return;
        } else if (evalPercentage(95)) {
			return
		}

        if (!--item.durab) {
            this.getOrLooseStats(item);
            this.calcAll();
            let name = item.getName();
            audio.playSound('broken');
            message.draw(option.isEnglish() ?
                `${name} broke` :
                `${name}は壊れた`);
            return true;
        }
    }

    gotCursed() {
        let item = this.equipment[BP[EA[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
        if (!item || item.cursed) return;
        let name = item.getName();
        message.draw(option.isEnglish() ?
            `${name} is cursed` :
            `${name}は呪われた`);
        item.cursed = true;
        audio.playSound('curse');
    }

    gainSynerzy(skill, point) {
        if (skill.type === 'melee') {
            this.synerzyMelee += point;
		} else if (skill.type === 'missile') {
            this.synerzyMissile += point;
        } else {
            switch (skill.element) {
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
                    this.synerzyAir += point / 2;
                    this.synerzyEarth += point / 2;
                    break;
                case 'blizzard':
                    this.synerzyWater += point / 2;
                    this.synerzyAir += point / 2;
                    break;
                case 'magma':
                    this.synerzyFire += point / 2;
                    this.synerzyEarth += point / 2;
                    break;
                case 'radiation':
                    this.synerzyFire += point / 2;
                    this.synerzyPoison += point / 2;
                    break;
                case 'acid':
                    this.synerzyWater += point / 2;
                    this.synerzyPoison += point / 2;
            }
        }
    }

    decreaseEnergy() {
        this.energy -= (this.spd < 0 ? -this.spd : 0) + this.cost + rndIntBet(-1, 1);
        if (this.cost !== COST_REGULAR) this.cost = COST_REGULAR;
        map.queue.update(this);
    }

    increaseEnergy() {
        this.energy += (this.spd > 0 ? this.spd : 0) + COST_REGULAR + rndIntBet(-1, 1);
    }

    teleport(short, radiusSq, x, y, mute) {
        this.drawOrErase(false);
        if (!short && !radiusSq) {
            this.spiralSearch(x, y, 'fighter');
		} else {
            let l;
            let lSaved = short ? NaN : 0;
            let [tempX, tempY] = [this.x, this.y];
            let count = 0;
            do {
                this.getPositionRandomly(false, false, true);
                l = distanceSq(this.x, this.y, tempX, tempY);
                if (short && !(l >= lSaved) || !short && l > lSaved) {
                    [x, y] = [this.x, this.y];
                    lSaved = l;
                }
            } while ((short && (l > MIN_TELE_RAD_SQ || l < 16) ||
					!short && l <= radiusSq) && ++count < 100
			);

            if (count >= 100)[this.x, this.y] = [x, y];
		}
		
        this.drawOrErase(true);
        if (this.sleeping) this.sleeping = 0;
        if (!mute) {
            let distance = distanceSq(this.x, this.y, rogue.x, rogue.y);
            audio.playSound('teleport', distance);
		}
		
        if (this.id === ROGUE) {
            let loc = map.coords[this.x][this.y];
            loc.traces = ++this.numSteps;
            loc.getInfo();
        }
    }


    wakeUp() {
        this.sleeping = 0;
        if (this.id !== ROGUE && !this.isShowing()) return;
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} woke up` :
            `${name}目覚めた`);
        if (flag.dash || flag.rest) flag.dash = flag.rest = false;
    }

    getParts(item, starter) {
        let parts, partsEquipped;
        switch (item.type) {
            case 'melee':
            case 'missile':
            case 'staff':
                if (item.twoHanded) {
                    if (this.equipment.main && this.equipment.off) {
                        if (this.id === ROGUE) message.draw(message.get(M_TWO_HANDED));
                        return;
                    } else if (this.equipment.main) {
                        partsEquipped = 'main';
                    } else if (this.equipment.off) {
                        partsEquipped = 'off';
                    }
                } else if (this.equipment.main) {
                    partsEquipped = 'main';
				}
				
                parts = 'main';
                break;
            case 'shield':
                if (this.equipment.main && this.equipment.main.twoHanded) {
                    partsEquipped = 'main';
                } else if (this.equipment.off) {
                    partsEquipped = 'off';
				}
				
                parts = 'off';
                break;
            case 'amulet':
                if (this.equipment.neck) partsEquipped = 'neck';
                parts = 'neck';
                break;
            case 'ring':
                if (this.equipment['R-ring'] && this.equipment['L-ring']) {
                    partsEquipped = 'R-ring';
                    parts = 'R-ring';
                } else {
                    parts = this.equipment['R-ring'] ? 'L-ring' : 'R-ring';
                }
				
                break;
            case 'light':
                if (this.equipment.light) partsEquipped = 'light';
                parts = 'light';
                break;
            case 'armor':
                if (this.equipment.body) partsEquipped = 'body';
                parts = 'body';
                break;
            case 'cloak':
                if (this.equipment.back) partsEquipped = 'back';
                parts = 'back';
                break;
            case 'belt':
                if (this.equipment.waist) partsEquipped = 'waist';
                parts = 'waist';
                break;
            case 'helm':
                if (this.equipment.head) partsEquipped = 'head';
                parts = 'head';
                break;
            case 'gloves':
                if (this.equipment.hands) partsEquipped = 'hands';
                parts = 'hands';
                break;
            case 'boots':
                if (this.equipment.feet) partsEquipped = 'feet';
                parts = 'feet';
                break;
		}
		
        if (partsEquipped && (starter || this.unequip(false, partsEquipped) === null)) parts = null;
        return parts;
    }

    getStarterItems() {
        for (let itemInfo of this.starter) {
            let quantity = itemInfo.quantity ? itemInfo.quantity : 1;
            let itemNew = creation.item({
                type: itemInfo.type,
                tabId: itemInfo.tabId,
                quantity: quantity,
                position: LIST,
                lvl: this.lvl,
                uniqueId: itemInfo.uniqueId,
                starter: itemInfo.starter,
            });
            
            if (!itemNew.equipable || itemInfo.pack || !this.equipStarterItem(itemNew, itemInfo.side))
                this.packAdd(itemNew);
        }
    }

    equipStarterItem(item, side) {
        let equipped = false;
        if (side) {
            if (!this.side[side]) {
                this.side[side] = item;
                equipped = true;
            }
        } else {
            let parts = this.getParts(item, true);
            if (parts) {
                this.equipment[parts] = item;
                equipped = true;
            }
        }

        if (equipped) {
            item.place = P_EQUIPMENT;
            this.gainOrloseWeight(item, item.quantity, true);
            if (!side && item.durab) this.getOrLooseStats(item, true, false, true);
            return true;
        }
    }

    respec() {
        this.statPoints = this.skillPoints = this.lvl - 1;
        this.strMax = 1 + this.strBonus;
        this.dexMax = 1 + this.dexBonus;
        this.conMax = 1 + this.conBonus;
        this.intMax = 1 + this.intBonus;
        this.str = this.strMax;
        this.dex = this.dexMax;
        this.con = this.conMax;
        this.int = this.intMax;
        this.skill = {}
        this.initSynerzy();
        this.calcAll();
        if (this.id === ROGUE) this.initBookmarks();
        let name = this.getName(true);
        message.draw(option.isEnglish() ?
            `${name} forgot everything` :
            `${name}自らを忘却した`)
    }

    searchCe() {
        shadowcasting.main({
            x0: this.x,
            y0: this.y,
            radius: FOV,
            type: 'Aim',
            fighter: this,
        });
    }
}
