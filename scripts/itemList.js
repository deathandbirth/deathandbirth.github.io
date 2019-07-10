const [ //book
	B_BLANK_PAPER,
	B_SPELL_1,
	B_SPELL_2,
	B_SPELL_3,
	B_SKILL_1,
	B_SKILL_2,
	B_ARES,
	B_APOLLO,
	B_HERACLITUS,
	B_THALES,
	B_ANAXIMENES,
	B_XENOPHANES,
	B_HIPPOCRATES,
	B_DEMOCRITUS,
] = enums(1, 15);

const F_RATION = 1; //food
const [ //potion
	P_POISON,
	P_CONFUSION,
	P_PARALYSIS,
	P_SLEEP,
	P_BLINDNESS,
	P_DISEASE,
	P_HALLUCINATION,
	P_SLOWNESS,
	P_CANCELLATION,
	P_WEAKNESS,
	P_CLUMSINESS,
	P_SICKLINESS,
	P_STUPIDITY,
	P_HEALING,
	P_GREATER_HEALING,
	P_EXTRA_HEALING,
	P_MANA,
	P_GREATER_MANA,
	P_EXTRA_MANA,
	P_REJUVENATION,
	P_FULL_REJUVENATION,
	P_RESTORE_STRENGTH,
	P_RESTORE_DEXTERITY,
	P_RESTORE_CONSTITUTION,
	P_RESTORE_INTELLIGENCE,
	P_RESTORE_ALL,
	P_RESIST_FIRE,
	P_RESIST_WATER,
	P_RESIST_AIR,
	P_RESIST_EARTH,
	P_RESIST_POISON,
	P_RESIST_ALL,
	P_SPEED,
	P_SEE_INVISIBLE,
	P_RAISE_LEVEL,
	P_ENLIGHTENMENT,
	P_Lower_Resist,
	P_CURE_ALL,
	P_RESTORE_EXPERIENCE,
	P_LETHE,
] = enums(1, 40);

const [ //scroll
	S_SHORT_TELEPORTATION,
	S_TELEPORTATION,
	S_REMOVE_CURSE,
	S_IDENTIFY,
	S_MONSTER_DETECTION,
	S_ITEM_DETECTION,
	S_MAGIC_MAPPING,
	S_TOWN_PORTAL,
	S_TOUCH_CONFUSION,
	S_HOLD_MONSTER,
	S_AGGRAVATE_MONSTER,
	S_CREATE_MONSTER,
	S_CREATE_MAGIC_MONSTER,
	S_CREATE_TRAP,
	S_RESTORE_DURABILITY,
	S_REPAIR_ALL,
	S_DISINTEGRATION,
	S_MAGIC_CIRCLE_PROTECTION,
	S_LIGHT, S_SPIDERWEB,
    S_EARTHQUAKE,
] = enums(1, 21);

const [ //wand
	W_TELEPORT_AWAY,
	W_STONE_MUD,
	W_FIRE_BOLT,
	W_LIGHTNING,
	W_ICE_BOLT,
	W_HASTE_MONSTER,
	W_INVISIBILITY,
	W_POLYMORPH,
	W_SLOW_MONSTER,
	W_CANCELLATION,
	W_TELEPORT_TO,
	W_Lower_Resist,
] = enums(1, 12);

const [ //melee
    //sword
	M_KNIFE,
	M_DAGGER,
	M_SWORD,
    //polearm	
    M_SPEAR,
    //misc	
	M_CLUB,
	M_MACE,
	M_AXE,
	M_TWO_HANDED_AXE,
	M_PICK,
	M_MAUL,
    M_TWO_HANDED_HAMMER,
] = enums(1, 11);

const [ //missile
	M_SLING,
	M_STAFF_SLING,
	M_BOW,
	M_CROSSBOW,
] = enums(1, 4);

const [ //staff
	S_STICK,
	S_ROD,
	S_STAFF,
] = enums(1, 3);

const [ //shield
    S_SHIELD,
    S_SHIELD_GEM,
] = enums(1, 2);

const [ //armor
	A_ROBE,
	A_VEST,
	A_VESTMENT,
	A_ARMOR,
	A_SPLINT_MAIL,
    A_PLATE_MAIL,
] = enums(1, 6);

const [ //cloak
	C_MANTLE,
	C_COAT,
	C_CLOAK,
] = enums(1, 3);

const [ //belt
	B_SASH,
	B_BELT,
] = enums(1, 2);

const [ //helm
	H_CIRCLET,
	H_CAP,
	H_CROWN,
	H_MASK,
	H_HELM,
] = enums(1, 5);

const [ //glove
	G_MITTEN,
	G_BRACER,
	G_GLOVES,
	G_VAMBRACE,
	G_GAUNTLETS,
] = enums(1, 5);

const [ //boots
	B_SANDALS,
	B_SHOES,
	B_BOOTS,
	B_GREAVES,
] = enums(1, 4);

const [ //light
	L_TORCH,
	L_LAMP,
	L_LANTHANUM,
] = enums(1, 3);

const [
    R_RING,
    R_RING_GEM,
] = enums(1, 2);

const A_AMULET = 1;
const G_GEM = 1;
const [
    O_MALCHUT,
    O_YESOD,
    O_HOD,
    O_NETZACH,
    O_TIPHERETH,
    O_GEVURAH,
    O_CHESED,
    O_BINAH,
    O_CHOKHMAH,
    O_KETER,
] = enums(1,10);

const O_OLIVE_OIL = 1;
const [ //ammo
	A_ROCK,
	A_ARROW,
	A_BOLT,
] = enums(1, 3);

const C_COIN = 1;
const [
    RECIPE_WROUGHT_GOLD,
    RECIPE_EXTRA_HEALING,
    RECIPE_EXTRA_MANA,
    RECIPE_WAND,
    RECIPE_CHARGE_BOOK,
    RECIPE_TORCH,
    RECIPE_LAMP,
    RECIPE_EMBED,
    RECIPE_REMOVE,
    RECIPE_EXTEND,
    RECIPE_MATERIALIZE,
] = enums(1, 11);

const itemTab = {
    coin: new Map([
        [C_COIN, {
            nameReal: { a: 'Coin', b: '硬貨' },
            color: colorList.yellow,
            lvl: 1,
            rarity: 0
        }],
    ]),

    recipe: new Map([
        [RECIPE_WROUGHT_GOLD, {
            nameReal: { a: 'Wrought Gold', b: '錬金' },
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            cost: 5,
            recipe: {
                a: 'Jewel [1-4] -> Coin',
                b: 'ジュエル [1-4] -> 硬貨'
            }
		}],

        [RECIPE_TORCH, {
            nameReal: { a: 'Torch', b: '松明' },
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            cost: 1,
            recipe:{
                a: 'Torches [2-4] -> Torch [fuel sum]',
                b: '松明 [2-4] -> 松明 [燃料 計]'
            }
		}],

        [RECIPE_LAMP, {
            nameReal: { a: 'Lamp', b: 'ランプ' },
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            cost: 1,
            recipe:{
                a: 'Lamps or Lanthanums + oil [2-4] -> Light Source [fuel sum]',
                b: 'ランプまたはランタン + オイル [2-4] -> ランプまたはランタン [燃料 計]'
            }
		}],

        [RECIPE_EMBED, {
            nameReal: { a: 'Embed', b: '埋め込み' },
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            cost: 10,
            recipe:{
                a: 'Embeddable Equipment + The Same Materials・Jewel・Orb -> Equipment [Materials・Jewel・Orb]',
                b: '埋め込み可能な装備品 + 同素材・ジュエル・オーブ -> 装備品 [素材・ジュエル・オーブ]'
            }
		}],

        [RECIPE_REMOVE, {
            nameReal: { a: 'Remove', b: '取り外し' },
            priceRate: 1,
            lvl: 5,
            rarity: 10,
            cost: 10,
            recipe:{
                a: 'Equipment [Materials・Jewel・Orb] -> Embeddable Equipment + The Same Materials・Jewel・Orb',
                b: '装備品 [素材・ジュエル・オーブ] -> 埋め込み可能な装備品 + 同素材・ジュエル・オーブ'
            }
		}],

        [RECIPE_WAND, {
            nameReal: { a: 'Wand', b: '魔法棒' },
            priceRate: 1,
            lvl: 10,
            rarity: 10,
            cost: 1,
            recipe:{
                a: 'Wands [2-4] -> Wand [charges sum]',
                b: '魔法棒 [2-4] -> 魔法棒 [充填 計]'
            }
		}],

        [RECIPE_CHARGE_BOOK, {
            nameReal: { a: 'Charge Book', b: '充填書' },
            priceRate: 1,
            lvl: 15,
            rarity: 20,
            cost: 1,
            recipe:{
                a: 'Charge Book + Scroll -> Charge book [charges sum]',
                b: '充填書 + 巻物 -> 充填書 [充填 計]'
            }
		}],

        [RECIPE_EXTRA_HEALING, {
            nameReal: { a: 'Extra Healing', b: '特大回復' },
            priceRate: 1,
            lvl: 20,
            rarity: 30,
            cost: 20,
            recipe:{
                a: 'Potion of Greater Healing [3] -> Potion of Extra Healing',
                b: '大回復の薬 [3] -> 特大回復の薬'
            }
		}],

        [RECIPE_EXTRA_MANA, {
            nameReal: { a: 'Extra Mana', b: '魔力特大回復' },
            priceRate: 1,
            lvl: 20,
            rarity: 30,
            cost: 20,
            recipe:{
                a: 'Potion of Greater Mana [3] -> Potion of Extra Mana',
                b: '魔力大回復の薬 [3] -> 魔力特大回復の薬'
            }
		}],

        [RECIPE_EXTEND, {
            nameReal: { a: 'Extend', b: '拡張' },
            priceRate: 1,
            lvl: 25,
            rarity: 40,
            cost: 30,
            recipe:{
                a: 'Unembeddable Normal Equipment + Jewel + Orb -> Embeddable Equipment',
                b: 'ノーマルの埋め込み不可な装備品 + ジュエル + オーブ -> 埋め込み可能な装備品'
            }
		}],

        [RECIPE_MATERIALIZE, {
            nameReal: { a: 'Materialize', b: '素材化' },
            priceRate: 1,
            lvl: 30,
            rarity: 50,
            cost: 50,
            recipe:{
                a: 'Unembeddable Magic or Rare Equipment + Jewel + Orb + The Same Materials -> Materials',
                b: 'マジックまたはレアの埋め込み不可な装備品 + ジュエル + オーブ + 同素材 -> 素材'
            }
		}],
    ]),
	
    book: new Map([
        [B_BLANK_PAPER, {
            nameReal: { a: 'Blank Paper', b: '白紙' },
            color: colorList.gray,
            type2: 'Charge Book',
            priceRate: 5,
            lvl: 10,
            rarity: 10
		}],
		
        [B_SPELL_1, {
            nameReal: { a: 'Spells for Beginners', b: '初級魔術' },
            color: colorList.gray,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0,
            skill: true,
            list: {
                a: FIRE_BOLT,
                b: ICE_BOLT,
                c: LIGHTNING,
                d: MONSTER_DETECTION,
                e: POISON_BOLT,
                f: LIGHT,
                g: TOUCH_OF_CONFUSION,
                h: SHORT_TELEPORTATION,
                i: TELEPORTATION,
                j: RESIST_FIRE,
                k: RESIST_WATER,
                l: RESIST_AIR,
                m: RESIST_EARTH,
                n: RESIST_POISON,
                o: ITEM_DETECTION,
                p: POISON_MIST,
                q: RESTORE_DURABILITY,
                r: MAGIC_MAPPING,

            },
		}],
		
        [B_SPELL_2, {
            nameReal: { a: 'Intermediate Spells', b: '中級魔術' },
            color: colorList.gray,
            priceRate: 10,
            shop: true,
            lvl: 10,
            rarity: 10,
            skill: true,
            list: {
                a: FIRE_BALL,
                b: WHIRLWIND,
                c: SLEEPING_GAS,
                d: TELEPORT_AWAY,
                e: SPEED,
                f: SEE_INVISIBLE,
                g: REMOVE_CURSE,
                h: STONE_TO_MUD,
                i: IDENTIFY,
                j: ACID_BALL,
                k: RESTORE_STRENGTH,
                l: RESTORE_DEXTERITY,
                m: RESTORE_CONSTITUTION,
                n: RESTORE_INTELLIGENCE,
                o: HEAL,
                p: RESIST_PHYSICAL,
                q: VENOM_HANDS,
                r: HOLD_MONSTER,
            },
		}],
		
        [B_SPELL_3, {
            nameReal: { a: 'Advanced Spells', b: '上級魔術' },
            color: colorList.gray,
            priceRate: 30,
            lvl: 20,
            rarity: 30,
            skill: true,
            list: {
                a: LAVA_FLOW,
                b: LOWER_RESIST,
                c: BLIZZARD,
                d: TORNADO,
                e: HALLUCINATING_MIST,
                f: EARTHQUAKE,
                g: GRAVITATIONAL_FIELD,
                h: CURE_ALL,
                i: SATISFY_HUNGER,
                j: RESTORE_ALL,
                k: RESIST_ALL,
                l: RESTORE_EXPERIENCE,
                m: ENCHANT_SELF,
                n: CHAIN_DECAY,
                o: SANDSTORM,
                p: REPAIR_ALL,
                q: EXTRA_HEAL,
            },
		}],
		
        [B_SKILL_1, {
            nameReal: { a: 'Skills for Beginners', b: '初級武術' },
            color: colorList.brown,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0,
            skill: true,
            list: {
				a: ENCOURAGEMENT,
				b: BLESSING,
				c: FIST_OF_CONFUSION,
				d: RAID,
				e: PIERCING_ARROW,
				f: EXPLODING_ARROW,
				g: PARALYZING_ARROW
			},
		}],
		
        [B_SKILL_2, {
            nameReal: { a: 'Intermediate Skills', b: '中級武術' },
            color: colorList.brown,
            priceRate: 10,
            shop: true,
            lvl: 15,
            rarity: 10,
            skill: true,
            list: {
				a: RUSH,
				b: COLLAPSE,
				c: PHOTON_ARROW,
				d: FREEZING_ARROW
			},
		}],
		
        [B_ARES, {
            nameReal: { a: 'Ares', b: 'アレス' },
            color: colorList.bronze,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
				a: FIST_OF_CONFUSION,
				b: RUSH,
				c: RAID,
				d: COLLAPSE,
				e: SPIRAL
			},
		}],
		
        [B_APOLLO, {
            nameReal: { a: 'Apollo', b: 'アポロン' },
            color: colorList.orange,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
				a: PIERCING_ARROW,
				b: EXPLODING_ARROW,
				c: PARALYZING_ARROW,
				d: PHOTON_ARROW,
				e: FREEZING_ARROW,
				f: APOLLOS_ARROW
			},
		}],
		
        [B_HERACLITUS, { //fire
            nameReal: { a: 'Heraclitus', b: 'ヘラクレイトス' },
            color: colorList.fire,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
                a: FIRE_BOLT,
                b: LAVA_FLOW,
                c: LIGHT,
                d: FLAME_OF_DIDO,
                e: REMOVE_CURSE,
                f: SEE_INVISIBLE,
                g: RESIST_FIRE,
                h: FIRE_BALL,
                i: RESTORE_STRENGTH,
                j: CHAIN_DECAY
            },
		}],
		
        [B_THALES, { //water
            nameReal: { a: 'Thales', b: 'タレス' },
            color: colorList.water,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
                a: HEAL,
                b: RESTORE_INTELLIGENCE,
                c: BLIZZARD,
                d: ACID_BALL,
                e: RESTORE_ALL,
                f: CURE_ALL,
                g: ICE_BOLT,
                h: RESIST_WATER,
                i: RESIST_ALL,
                j: EXTRA_HEAL,
                k: COCYTUS
            },
		}],
		
        [B_ANAXIMENES, { //air
            nameReal: { a: 'Anaximenes', b: 'アナクシメネス' },
            color: colorList.air,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
                a: LIGHTNING,
                b: SANDSTORM,
                c: BLIZZARD,
                d: ECCO,
                e: SPEED,
                f: RESIST_AIR,
                g: TORNADO,
                h: RESTORE_DEXTERITY,
                i: WHIRLWIND
            },
		}],
		
        [B_XENOPHANES, { //earth
            nameReal: { a: 'Xenophanes', b: 'クセノパネス' },
            color: colorList.earth,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
                a: ENLIGHTENMENT,
                b: SANDSTORM,
                c: LAVA_FLOW,
                d: GRAVITATIONAL_FIELD,
                e: MONSTER_DETECTION,
                f: STONE_TO_MUD,
                g: IDENTIFY,
                h: RESIST_EARTH,
                i: SATISFY_HUNGER,
                j: WORMHOLE,
                k: RESTORE_CONSTITUTION,
                l: MAGIC_MAPPING,
                m: ITEM_DETECTION,
                n: EARTHQUAKE,
                o: RESTORE_DURABILITY,
                p: REPAIR_ALL,
                q: ENCHANT_SELF,
                r: RESIST_PHYSICAL,
            },
		}],
		
        [B_HIPPOCRATES, { //poison
            nameReal: { a: 'Hippocrates', b: 'ヒポクラテス' },
            color: colorList.poison,
            priceRate: 50,
            lvl: 30,
            rarity: 50,
            skill: true,
            list: {
                a: POISON_BOLT,
                b: ACID_BALL,
                c: PESTILENCE,
                d: SLEEPING_GAS,
                e: TOUCH_OF_CONFUSION,
                f: RESIST_POISON,
                g: LOWER_RESIST,
                h: VENOM_HANDS,
                i: CHAIN_DECAY,
                j: RESTORE_EXPERIENCE,
                k: HALLUCINATING_MIST
            },
		}],
		
        [B_DEMOCRITUS, { //atom
            nameReal: { a: 'Democritus', b: 'デモクリトス' },
            color: colorList.atom,
            priceRate: 50,
            lvl: 30,
            rarity: 70,
            skill: true,
            list: {
				a: SHORT_TELEPORTATION,
				b: TELEPORTATION,
				c: TELEPORT_AWAY,
				d: DISINTEGRATION,
                e: TOWN_PORTAL,
			},
        }],
	]),
	
    food: new Map([
        [F_RATION, {
            nameReal: { a: 'Ration', b: 'レーション' },
            nameSkill: SATISFY_HUNGER,
            skillLvl: 20,
            color: colorList.brown,
            priceRate: 0.5,
            shop: true,
            lvl: 1,
            rarity: 0
        }],
    ]),
	
    oil: new Map([
        [O_OLIVE_OIL, {
            nameReal: { a: 'Olive Oil', b: 'オリーブ油' },
            color: colorList.yellow,
            fuelValue: 2500,
            weight: 0.3,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0
        }],
    ]),

    potion: new Map([
        [P_POISON, {
            nameReal: { a: 'Poison', b: '毒' },
            nameSkill: POISON,
            skillLvl: 1,
            priceRate: 0.1,
            lvl: 1,
            rarity: 0
		}],
		
        [P_CONFUSION, {
            nameReal: { a: 'Confusion', b: '混乱' },
            nameSkill: CONFUSION,
            skillLvl: 3,
            priceRate: 0.1,
            lvl: 1,
            rarity: 0
		}],
		
        [P_PARALYSIS, {
            nameReal: { a: 'Paralysis', b: '麻痺' },
            nameSkill: PARALYSIS,
            skillLvl: 3,
            priceRate: 0.1,
            lvl: 3,
            rarity: 0
		}],
		
        [P_SLEEP, {
            nameReal: { a: 'Sleep', b: '眠り' },
            nameSkill: SLEEP,
            skillLvl: 3,
            priceRate: 0.1,
            lvl: 3,
            rarity: 0
		}],
		
        [P_BLINDNESS, {
            nameReal: { a: 'Blindness', b: '盲目' },
            nameSkill: BLINDNESS,
            skillLvl: 3,
            priceRate: 0.1,
            lvl: 3,
            rarity: 0
		}],
		
        [P_DISEASE, {
            nameReal: { a: 'Disease', b: '病気' },
            nameSkill: INFECTION,
            skillLvl: 3,
            priceRate: 0.1,
            lvl: 5,
            rarity: 0
		}],
		
        [P_HALLUCINATION, {
            nameReal: { a: 'Hallucination', b: '幻覚' },
            nameSkill: HALLUCINATION,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 5,
            rarity: 0
		}],
		
        [P_SLOWNESS, {
            nameReal: { a: 'Slowness', b: '鈍足' },
            nameSkill: SLOW,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 5,
            rarity: 0
		}],
		
        [P_CANCELLATION, {
            nameReal: { a: 'Cancellation', b: '封印' },
            nameSkill: CANCELLATION,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [P_WEAKNESS, {
            nameReal: { a: 'Weakness', b: '薄弱' },
            nameSkill: WEAKNESS,
            skillLvl: 1,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [P_CLUMSINESS, {
            nameReal: { a: 'Clumsiness', b: '不器用' },
            nameSkill: CLUMSINESS,
            skillLvl: 1,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [P_SICKLINESS, {
            nameReal: { a: 'Sickliness', b: '病弱' },
            nameSkill: SICKLINESS,
            skillLvl: 1,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [P_STUPIDITY, {
            nameReal: { a: 'Stupidity', b: '愚鈍' },
            nameSkill: STUPIDITY,
            skillLvl: 1,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [P_HEALING, {
            nameReal: { a: 'Healing', b: '回復' },
            nameSkill: HEAL,
            skillLvl: 10,
            priceRate: 2,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [P_GREATER_HEALING, {
            nameReal: { a: 'Greater Healing', b: '大回復' },
            nameSkill: HEAL,
            skillLvl: 30,
            priceRate: 6,
            shop: true,
            lvl: 5,
            rarity: 10
		}],
		
        [P_EXTRA_HEALING, {
            nameReal: { a: 'Extra Healing', b: '特大回復' },
            nameSkill: EXTRA_HEAL,
            skillLvl: 10,
            priceRate: 10,
            lvl: 10,
            rarity: 30
		}],
		
        [P_MANA, {
            nameReal: { a: 'Mana', b: '魔力回復' },
            nameSkill: MANA,
            skillLvl: 10,
            priceRate: 2,
            shop: true,
            lvl: 1,
            rarity: 0
		}],

        [P_GREATER_MANA, {
            nameReal: { a: 'Greater Mana', b: '魔力大回復' },
            nameSkill: MANA,
            skillLvl: 30,
            priceRate: 6,
            shop: true,
            lvl: 5,
            rarity: 10
		}],
		
        [P_EXTRA_MANA, {
            nameReal: { a: 'Extra Mana', b: '魔力特大回復' },
            nameSkill: EXTRA_MANA,
            skillLvl: 10,
            priceRate: 10,
            lvl: 10,
            rarity: 30
		}],
		
        [P_REJUVENATION, {
            nameReal: { a: 'Rejuvenation', b: '活性' },
            nameSkill: REJUVENATION,
            skillLvl: 1,
            priceRate: 15,
            lvl: 15,
            rarity: 40
		}],
		
        [P_FULL_REJUVENATION, {
            nameReal: { a: 'Full Rejuvenation', b: '完全活性' },
            nameSkill: REJUVENATION,
            skillLvl: 14,
            priceRate: 20,
            lvl: 20,
            rarity: 50
		}],
		
        [P_RESTORE_STRENGTH, {
            nameReal: { a: 'Restore Strength', b: '筋力復活' },
            nameSkill: RESTORE_STRENGTH,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [P_RESTORE_DEXTERITY, {
            nameReal: { a: 'Restore Dexterity', b: '器用さ復活' },
            nameSkill: RESTORE_DEXTERITY,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [P_RESTORE_CONSTITUTION, {
            nameReal: { a: 'Restore Constitution', b: '耐久力復活' },
            nameSkill: RESTORE_CONSTITUTION,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [P_RESTORE_INTELLIGENCE, {
            nameReal: { a: 'Restore Intelligence', b: '知力復活' },
            nameSkill: RESTORE_INTELLIGENCE,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [P_RESTORE_ALL, {
            nameReal: { a: 'Restore All', b: '全復活' },
            nameSkill: RESTORE_ALL,
            skillLvl: 10,
            priceRate: 10,
            lvl: 20,
            rarity: 50
		}],
		
        [P_RESIST_FIRE, {
            nameReal: { a: 'Resist Fire', b: '耐火' },
            nameSkill: RESIST_FIRE,
            skillLvl: 20,
            priceRate: 2,
            lvl: 1,
            rarity: 0
		}],
		
        [P_RESIST_WATER, {
            nameReal: { a: 'Resist Water', b: '耐水' },
            nameSkill: RESIST_WATER,
            skillLvl: 20,
            priceRate: 2,
            lvl: 1,
            rarity: 0
		}],
		
        [P_RESIST_AIR, {
            nameReal: { a: 'Resist Air', b: '耐風' },
            nameSkill: RESIST_AIR,
            skillLvl: 20,
            priceRate: 2,
            lvl: 1,
            rarity: 0
		}],
		
        [P_RESIST_EARTH, {
            nameReal: { a: 'Resist Earth', b: '耐土' },
            nameSkill: RESIST_EARTH,
            skillLvl: 20,
            priceRate: 2,
            lvl: 1,
            rarity: 0
		}],
		
        [P_RESIST_POISON, {
            nameReal: { a: 'Resist Poison', b: '耐毒' },
            nameSkill: RESIST_POISON,
            skillLvl: 20,
            priceRate: 2,
            lvl: 1,
            rarity: 0
		}],
		
        [P_RESIST_ALL, {
            nameReal: { a: 'Resist All', b: '耐性' },
            nameSkill: RESIST_ALL,
            skillLvl: 20,
            priceRate: 20,
            lvl: 20,
            rarity: 50
		}],
		
        [P_SPEED, {
            nameReal: { a: 'Speed', b: '速度' },
            nameSkill: SPEED,
            skillLvl: 10,
            priceRate: 5,
            lvl: 10,
            rarity: 20
		}],
		
        [P_SEE_INVISIBLE, {
            nameReal: { a: 'See Invisible', b: '透視' },
            nameSkill: SEE_INVISIBLE,
            skillLvl: 10,
            priceRate: 3,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [P_RAISE_LEVEL, {
            nameReal: { a: 'Raise Level', b: 'レベル上昇' },
            nameSkill: RAISE_LEVEL,
            skillLvl: 1,
            priceRate: 100,
            lvl: 20,
            rarity: 99
		}],
		
        [P_ENLIGHTENMENT, {
            nameReal: { a: 'Enlightenment', b: '啓蒙' },
            nameSkill: ENLIGHTENMENT,
            skillLvl: 10,
            priceRate: 15,
            lvl: 20,
            rarity: 50
		}],
		
        [P_Lower_Resist, {
            nameReal: { a: 'Lower Resist', b: '耐性低下' },
            nameSkill: LOWER_RESIST,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 25,
            rarity: 20
		}],
		
        [P_CURE_ALL, {
            nameReal: { a: 'Cure All', b: '全治療' },
            nameSkill: CURE_ALL,
            skillLvl: 10,
            priceRate: 30,
            lvl: 25,
            rarity: 50
		}],
		
        [P_RESTORE_EXPERIENCE, {
            nameReal: { a: 'Restore Experience', b: '経験値復活' },
            nameSkill: RESTORE_EXPERIENCE,
            skillLvl: 10,
            priceRate: 3,
            shop: true,
            lvl: 15,
            rarity: 0
		}],
		
        [P_LETHE, {
            nameReal: { a: 'Lethe', b: 'レテ' },
            nameSkill: RESPEC,
            skillLvl: 10,
            color: colorList.white,
            type2: 'water',
            lethe: true,
            priceRate: 200,
            lvl: 10,
            rarity: 80
        }],
	]),
	
    scroll: new Map([
        [S_SHORT_TELEPORTATION, {
            nameReal: { a: 'Short Teleportation', b: 'ショート・テレポート' },
            nameSkill: SHORT_TELEPORTATION,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [S_TELEPORTATION, {
            nameReal: { a: 'Teleportation', b: 'テレポート' },
            nameSkill: TELEPORTATION,
            skillLvl: 10,
            priceRate: 1.5,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [S_REMOVE_CURSE, {
            nameReal: { a: 'Remove Curse', b: '解呪' },
            nameSkill: REMOVE_CURSE,
            skillLvl: 10,
            priceRate: 2,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [S_IDENTIFY, {
            nameReal: { a: 'Identify', b: '識別' },
            nameSkill: IDENTIFY,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [S_MONSTER_DETECTION, {
            nameReal: { a: 'Monster Detection', b: 'モンスター感知' },
            nameSkill: MONSTER_DETECTION,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 5,
            rarity: 0
		}],
		
        [S_ITEM_DETECTION, {
            nameReal: { a: 'Item Detection', b: 'アイテム感知' },
            nameSkill: ITEM_DETECTION,
            skillLvl: 10,
            priceRate: 2,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [S_MAGIC_MAPPING, {
            nameReal: { a: 'Magic Mapping', b: '魔法地図' },
            nameSkill: MAGIC_MAPPING,
            skillLvl: 10,
            priceRate: 3,
            shop: true,
            lvl: 15,
            rarity: 0
		}],
		
        [S_TOWN_PORTAL, {
            nameReal: { a: 'Town Portal', b: 'タウン・ポータル' },
            nameSkill: TOWN_PORTAL,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 5,
            rarity: 0
		}],
		
        [S_TOUCH_CONFUSION, {
            nameReal: { a: 'Touch of Confusion', b: '混乱の手' },
            nameSkill: TOUCH_OF_CONFUSION,
            skillLvl: 10,
            priceRate: 4,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [S_HOLD_MONSTER, {
            nameReal: { a: 'Hold Monster', b: 'モンスター束縛' },
            nameSkill: HOLD_MONSTER,
            skillLvl: 10,
            priceRate: 10,
            lvl: 10,
            rarity: 20
		}],
		
        [S_AGGRAVATE_MONSTER, {
            nameReal: { a: 'Aggravate Monster', b: '反感' },
            nameSkill: SCREAM,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 1,
            rarity: 0
		}],
		
        [S_CREATE_MONSTER, {
            nameReal: { a: 'Create Monster', b: 'モンスター生成' },
            nameSkill: CREATE_MONSTER,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 5,
            rarity: 0
		}],
		
        [S_CREATE_MAGIC_MONSTER, {
            nameReal: { a: 'Create Magic Monster', b: 'マジック・モンスター生成' },
            nameSkill: CREATE_MAGIC_MONSTER,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 20,
            rarity: 50
		}],
		
        [S_CREATE_TRAP, {
            nameReal: { a: 'Create Trap', b: 'トラップ生成' },
            nameSkill: CREATE_TRAP,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 3,
            rarity: 0
		}],
		
        [S_RESTORE_DURABILITY, {
            nameReal: { a: 'Restore Durability', b: '耐久度復活' },
            nameSkill: RESTORE_DURABILITY,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 0
		}],
		
        [S_REPAIR_ALL, {
            nameReal: { a: 'Repair All', b: '全修復' },
            nameSkill: REPAIR_ALL,
            skillLvl: 10,
            priceRate: 20,
            lvl: 20,
            rarity: 50
		}],
		
        [S_DISINTEGRATION, {
            nameReal: { a: 'Disintegration', b: '分解' },
            nameSkill: DISINTEGRATION,
            skillLvl: 10,
            priceRate: 100,
            lvl: 30,
            rarity: 80
		}],
		
        [S_MAGIC_CIRCLE_PROTECTION, {
            nameReal: { a: 'Magic Circle of Protection', b: '守護魔法円' },
            nameSkill: MAGIC_CIRCLE_OF_PROTECTION,
            skillLvl: 10,
            priceRate: 30,
            lvl: 30,
            rarity: 50
		}],
		
        [S_LIGHT, {
            nameReal: { a: 'Light', b: '光' },
            nameSkill: LIGHT,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [S_SPIDERWEB, {
            nameReal: { a: 'Spiderweb', b: 'スパイダー・ウェブ' },
            nameSkill: GRAVITATIONAL_FIELD,
            skillLvl: 10,
            priceRate: 50,
            lvl: 20,
            rarity: 30
		}],
		
        [S_EARTHQUAKE, {
            nameReal: { a: 'Earthquake', b: '地震' },
            nameSkill: EARTHQUAKE,
            skillLvl: 20,
            priceRate: 25,
            lvl: 20,
            rarity: 30
        }],
	]),
	
    wand: new Map([
        [W_TELEPORT_AWAY, {
            nameReal: { a: 'Teleport Away', b: 'テレポート・アウェイ' },
            nameSkill: TELEPORT_AWAY,
            skillLvl: 10,
            priceRate: 2,
            lvl: 10,
            rarity: 0
		}],
		
        [W_STONE_MUD, {
            nameReal: { a: 'Stone to Mud', b: '岩石溶解' },
            nameSkill: STONE_TO_MUD,
            skillLvl: 10,
            priceRate: 1.5,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [W_FIRE_BOLT, {
            nameReal: { a: 'Fire Bolt', b: 'ファイア・ボルト' },
            nameSkill: FIRE_BOLT,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 1,
            rarity: 0
		}],
		
        [W_LIGHTNING, {
            nameReal: { a: 'Lightning', b: 'ライトニング' },
            nameSkill: LIGHTNING,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 5,
            rarity: 50
		}],
		
        [W_ICE_BOLT, {
            nameReal: { a: 'Ice Bolt', b: 'アイス・ボルト' },
            nameSkill: ICE_BOLT,
            skillLvl: 10,
            priceRate: 1,
            shop: true,
            lvl: 10,
            rarity: 50
		}],
		
        [W_HASTE_MONSTER, {
            nameReal: { a: 'Haste Monster', b: 'モンスター加速' },
            nameSkill: SPEED,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 1,
            rarity: 0
		}],
		
        [W_INVISIBILITY, {
            nameReal: { a: 'Invisibility', b: '透明' },
            nameSkill: INVISIBILITY,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 10,
            rarity: 0
		}],
		
        [W_POLYMORPH, {
            nameReal: { a: 'Polymorph', b: '変容' },
            nameSkill: POLYMORPH,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 15,
            rarity: 0
		}],
		
        [W_SLOW_MONSTER, {
            nameReal: { a: 'Slow Monster', b: 'スロー・モンスター' },
            nameSkill: SLOW,
            skillLvl: 10,
            priceRate: 1,
            lvl: 1,
            rarity: 0
		}],
		
        [W_CANCELLATION, {
            nameReal: { a: 'Cancellation', b: '封印' },
            nameSkill: CANCELLATION,
            skillLvl: 10,
            priceRate: 3,
            lvl: 20,
            rarity: 80
		}],
		
        [W_TELEPORT_TO, {
            nameReal: { a: 'Teleport To', b: '引き寄せ' },
            nameSkill: TELEPORT_TO,
            skillLvl: 10,
            priceRate: 0.1,
            lvl: 5,
            rarity: 0
		}],
		
        [W_Lower_Resist, {
            nameReal: { a: 'Lower Resist', b: '耐性低下' },
            nameSkill: LOWER_RESIST,
            skillLvl: 10,
            priceRate: 5,
            lvl: 30,
            rarity: 80
        }],
	]),
	
    melee: new Map([
        [M_KNIFE, {
            nameReal: { a: 'Knife', b: 'ナイフ' },
            symbol: '|',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 50,
            volumeRate: .5,
            embeddedLimit: 2,
            atkType: AT_SLASH | AT_THRUST,
            edge: 1,
            material: M_WOOD | M_BONE
		}],
		
        [M_DAGGER, {
            nameReal: { a: 'Dagger', b: '短剣' },
            symbol: '|',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 30,
            volumeRate: .7,
            embeddedLimit: 3,
            atkType: AT_SLASH | AT_THRUST,
            edge: 2,
            material: M_STONE | M_METAL
		}],
		
        [M_SWORD, {
            nameReal: { a: 'Sword', b: '剣' },
            symbol: '|',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_SLASH,
            edge: 2,
            material: M_METAL | M_STONE
		}],
		
        [M_SPEAR, {
            nameReal: { a: 'Spear', b: '槍' },
            symbol: '/',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_THRUST,
            material: M_METAL | M_STONE
		}],
		
        [M_CLUB, {
            nameReal: { a: 'Club', b: '棍棒' },
            symbol: '￥',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 20,
            volumeRate: .8,
            embeddedLimit: 3,
            atkType: AT_BLUNT,
            material: M_WOOD | M_BONE
		}],
		
        [M_MACE, {
            nameReal: { a: 'Mace', b: 'メイス' },
            symbol: '￥',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_BLUNT,
            material: M_METAL | M_STONE
		}],
		
        [M_AXE, {
            nameReal: { a: 'Axe', b: '斧' },
            symbol: '/',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -10,
            volumeRate: 1.2,
            embeddedLimit: 4,
            atkType: AT_SLASH,
            edge: 1,
            material: M_METAL
		}],
		
        [M_PICK, {
            nameReal: { a: 'Pick', b: 'ピック' },
            symbol: '￥',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -20,
            volumeRate: .8,
            embeddedLimit: 3,
            atkType: AT_THRUST,
            digging: 100,
            material: M_METAL
		}],
		
        [M_TWO_HANDED_AXE, {
            nameReal: { a: 'Two-handed Axe', b: '両手斧' },
            symbol: '/',
            lvl: 5,
            rarity: 20,
            iasBase: -30,
            volumeRate: 1.5,
            embeddedLimit: 5,
            atkType: AT_SLASH,
            twoHanded: true,
            material: M_METAL
		}],
		
        [M_TWO_HANDED_HAMMER, {
            nameReal: { a: 'Two-handed Hammer', b: '両手槌' },
            symbol: '￥',
            lvl: 10,
            rarity: 30,
            iasBase: -40,
            volumeRate: 2,
            embeddedLimit: 5,
            atkType: AT_BLUNT,
            twoHanded: true,
            material: M_STONE
        }],

        [M_MAUL, {
            nameReal: { a: 'Maul', b: '大木槌' },
            symbol: '￥',
            lvl: 15,
            rarity: 40,
            iasBase: -50,
            volumeRate: 3,
            embeddedLimit: 6,
            atkType: AT_BLUNT,
            twoHanded: true,
            material: M_WOOD
		}],
	]),
	
    missile: new Map([
        [M_SLING, {
            nameReal: { a: 'Sling', b: 'スリング' },
            throwType: 'sling',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -10,
            volumeRate: .7,
            embeddedLimit: 2,
            atkType: AT_BLUNT,
            material: M_SKIN
		}],
		
        [M_STAFF_SLING, {
            nameReal: { a: 'Staff Sling', b: '棒スリング' },
            throwType: 'sling',
            lvl: 5,
            rarity: 20,
            iasBase: -20,
            volumeRate: 0.5,
            embeddedLimit: 3,
            atkType: AT_BLUNT,
            material: M_WOOD
		}],
		
        [M_BOW, {
            nameReal: { a: 'Bow', b: '弓' },
            throwType: 'bow',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_THRUST,
            twoHanded: true,
            material: M_WOOD | M_BONE | M_HORN
		}],
		
        [M_CROSSBOW, {
            nameReal: { a: 'Crossbow', b: 'クロスボウ' },
            throwType: 'crossbow',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -20,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_THRUST,
            twoHanded: true,
            material: M_METAL
        }],
	]),
	
    staff: new Map([
        [S_STICK, {
            nameReal: { a: 'Stick', b: 'スティック' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: 10,
            volumeRate: 0.5,
            embeddedLimit: 2,
            atkType: AT_BLUNT,
            material: M_WOOD
		}],
		
        [S_ROD, {
            nameReal: { a: 'Rod', b: 'ロッド' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: 20,
            volumeRate: 0.7,
            embeddedLimit: 3,
            atkType: AT_BLUNT,
            material: M_METAL
		}],
		
        [S_STAFF, {
            nameReal: { a: 'Staff', b: '杖' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: 50,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_BLUNT,
            twoHanded: true,
            material: M_WOOD
        }],
	]),
	
    ammo: new Map([
        [A_ROCK, {
            nameReal: { a: 'Rock', b: '石' },
            color: colorList.gray,
            throwType: 'sling',
            weight: 0.1,
            priceRate: 1,
            shop: true,
            atkType: AT_BLUNT,
            lvl: 1,
            rarity: 0,
            dmgBonus: 100
		}],
		
        [A_ARROW, {
            nameReal: { a: 'Arrow', b: '矢' },
            color: colorList.brown,
            throwType: 'bow',
            weight: 0.02,
            priceRate: 2,
            shop: true,
            atkType: AT_THRUST,
            lvl: 1,
            rarity: 0
		}],
		
        [A_BOLT, {
            nameReal: { a: 'Bolt', b: 'ボルト' },
            color: colorList.brown,
            throwType: 'crossbow',
            weight: 0.04,
            priceRate: 3,
            shop: true,
            atkType: AT_THRUST,
            lvl: 1,
            rarity: 0
        }],
	]),
	
    shield: new Map([
        [S_SHIELD, {
            nameReal: { a: 'Shield', b: '盾' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            material: M_SKIN | M_SCALE | M_METAL | M_BONE | M_WOOD | M_STONE | M_SHELL | M_HORN
        }],

        [S_SHIELD_GEM, {
            nameReal: { a: 'Shield', b: '盾' },
            lvl: 5,
            rarity: 80,
            volumeRate: 1,
            embeddedLimit: 4,
            material: M_GEM
        }],
	]),
	
    armor: new Map([
        [A_VESTMENT, {
            nameReal: { a: 'Vestment', b: '法衣' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.2,
            embeddedLimit: 4,
            material: M_GEM
        }],

        [A_ROBE, {
            nameReal: { a: 'Robe', b: 'ローブ' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.3,
            embeddedLimit: 2,
            material: M_CLOTH | M_FEATHER
		}],
		
		
        [A_VEST, {
            nameReal: { a: 'Vest', b: 'ベスト' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.7,
            embeddedLimit: 3,
            material: M_FUR | M_SKIN
		}],
		
        [A_ARMOR, {
            nameReal: { a: 'Armor', b: '鎧' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            material: M_METAL | M_SCALE | M_PLATING | M_BONE | M_SHELL
		}],
		
        [A_SPLINT_MAIL, {
            nameReal: { a: 'Splint Mail', b: '小札鎧' },
            lvl: 5,
            rarity: 20,
            volumeRate: 1.1,
            embeddedLimit: 5,
            material: M_METAL | M_WOOD
		}],
		
        [A_PLATE_MAIL, {
            nameReal: { a: 'Plate Mail', b: '板金鎧' },
            lvl: 10,
            rarity: 40,
            volumeRate: 1.2,
            embeddedLimit: 6,
            material: M_METAL | M_STONE
        }],
	]),
	
    cloak: new Map([
        [C_CLOAK, {
            nameReal: { a: 'Cloak', b: 'クローク' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: .5,
            embeddedLimit: 2,
            material: M_CLOTH
        }],
		
        [C_COAT, {
            nameReal: { a: 'Coat', b: 'コート' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: .7,
            embeddedLimit: 2,
            material: M_FEATHER | M_FUR
        }],

        [C_MANTLE, {
            nameReal: { a: 'Mantle', b: 'マント' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 2,
            material: M_SKIN | M_SCALE
		}],
	]),
	
    belt: new Map([
        [B_SASH, {
            nameReal: { a: 'Sash', b: '腰帯' },
            shop: true,
            lvl: 1,
            rarity: 0,
            numBoxes: 1,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_CLOTH | M_FEATHER | M_FUR
		}],
		
        [B_BELT, {
            nameReal: { a: 'Belt', b: 'ベルト' },
            shop: true,
            lvl: 1,
            rarity: 0,
            numBoxes: 1,
            volumeRate: 1,
            embeddedLimit: 2,
            material: M_SKIN | M_SCALE | M_PLATING | M_BONE
        }],
	]),
	
    helm: new Map([
        [H_CROWN, {
            nameReal: { a: 'Crown', b: '王冠' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.2,
            embeddedLimit: 4,
            material: M_GEM
		}],
		
        [H_CIRCLET, {
            nameReal: { a: 'Circlet', b: '冠' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.1,
            embeddedLimit: 2,
            material: M_FEATHER | M_PLATING
		}],
		
        [H_CAP, {
            nameReal: { a: 'Cap', b: '帽子' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.3,
            embeddedLimit: 2,
            material: M_CLOTH | M_FUR | M_SKIN | M_SCALE
		}],
		
        [H_MASK, {
            nameReal: { a: 'Mask', b: '仮面' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_WOOD | M_STONE
		}],
		
        [H_HELM, {
            nameReal: { a: 'Helm', b: '兜' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 3,
            material: M_METAL | M_BONE | M_SHELL | M_HORN
        }],
	]),
	
    gloves: new Map([
        [G_BRACER, {
            nameReal: { a: 'Bracer', b: 'ブレイサー' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.2,
            embeddedLimit: 4,
            material: M_GEM
		}],
		
        [G_MITTEN, {
            nameReal: { a: 'Mitten', b: 'ミトン' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.3,
            embeddedLimit: 2,
            material: M_CLOTH | M_FUR | M_FEATHER
		}],
		
        [G_VAMBRACE, {
            nameReal: { a: 'Vambrace', b: '腕甲' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.7,
            embeddedLimit: 2,
            material: M_BONE | M_SHELL | M_STONE 
		}],
	
        [G_GLOVES, {
            nameReal: { a: 'Gloves', b: '手袋' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 3,
            material: M_SKIN | M_SCALE | M_PLATING
		}],
		
        [G_GAUNTLETS, {
            nameReal: { a: 'Gauntlets', b: '小手' },
            lvl: 5,
            rarity: 20,
            iasBase: -10,
            volumeRate: 1.2,
            embeddedLimit: 4,
            material: M_METAL
        }],
	]),
	
    boots: new Map([
        [B_SANDALS, {
            nameReal: { a: 'Sandals', b: 'サンダル' },
            shop: true,
            lvl: 1,
            rarity: 0,
            frwBase: 50,
            volumeRate: 0.3,
            embeddedLimit: 2,
            material: M_CLOTH | M_FEATHER
		}],
		
        [B_SHOES, {
            nameReal: { a: 'Shoes', b: '短靴' },
            shop: true,
            lvl: 1,
            rarity: 0,
            frwBase: 30,
            volumeRate: 0.7,
            embeddedLimit: 2,
            material: M_FUR | M_SKIN | M_WOOD
		}],
		
        [B_BOOTS, {
            nameReal: { a: 'Boots', b: '靴' },
            shop: true,
            lvl: 1,
            rarity: 0,
            frwBase: 0,
            volumeRate: 1,
            embeddedLimit: 3,
            material: M_SCALE | M_PLATING | M_BONE | M_SHELL
		}],
		
        [B_GREAVES, {
            nameReal: { a: 'Greaves', b: '脛当て' },
            lvl: 5,
            rarity: 20,
            frwBase: -20,
            volumeRate: 1.2,
            embeddedLimit: 4,
            material: M_METAL
        }],
	]),
	
    light: new Map([
        [L_TORCH, {
            nameReal: { a: 'Torch', b: '松明' },
            shop: true,
            lvl: 1,
            rarity: 0,
            lighten: 1,
            fuelValue: 5000,
            volumeRate: 0.5,
            embeddedLimit: 1,
            torch: true,
            material: M_WOOD
		}],
		
        [L_LAMP, {
            nameReal: { a: 'Lamp', b: 'ランプ' },
            shop: true,
            lvl: 1,
            rarity: 0,
            lighten: 2,
            fuelValue: 10000,
            volumeRate: 1.2,
            embeddedLimit: 1,
            material: M_STONE
		}],
		
        [L_LANTHANUM, {
            nameReal: { a: 'Lanthanum', b: 'ランタン' },
            shop: true,
            lvl: 1,
            rarity: 0,
            lighten: 3,
            fuelValue: 7500,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_METAL
        }],
	]),
	
    amulet: new Map([
        [A_AMULET, {
            nameReal: { a: 'Amulet', b: '首飾り' },
            color: colorList.orange,
            mod: MOD_MAGIC,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_BONE | M_FEATHER | M_HORN
        }],
	]),
	
    ring: new Map([
        [R_RING, {
            nameReal: { a: 'Ring', b: '指輪' },
            color: colorList.red,
            mod: MOD_MAGIC,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_METAL | M_STONE
        }],
        
        [R_RING_GEM, {
            nameReal: { a: 'Ring', b: '指輪' },
            color: colorList.red,
            mod: MOD_MAGIC,
            lvl: 5,
            rarity: 80,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_GEM
        }],
	]),

    gem: new Map([
        [G_GEM, {
            nameReal: { a: 'Jewel', b: 'ジュエル' },
            color: colorList.white,
            mod: MOD_MAGIC,
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            desc: {
                a: '',
                b: '埋め込み可能な装備品に合成すると属性値が付与される。'    
            }
        }],
    ]),

    orb: new Map([
        [O_MALCHUT, {
            name: { a: '<10>', b: '<10>' },
            nameReal: { a: 'Kingship', b: '王国' },
            color: colorList.olive,
            lvl: 1,
            rarity: 0,
            modParts: {
                melee: { digging: 30 },
                missile: { stealth: 20 },
                staff: { searching: 20 },
                shield: { stealth: 20 },
                amulet: { digest: 20 },
                ring: { digest: 20 },
                light: { searching: 30 },
                armor: { digest: 20 },
                cloak: { stealth: 30 },
                belt: { digest: 30 },
                helm: { searching: 20 },
                gloves: { searching: 20 },
                boots: { stealth: 20 },
            }
        }],

        [O_YESOD, {
            name: { a: '<9>', b: '<9>' },
            nameReal: { a: 'Foundation', b: '基礎' },
            color: colorList.purple,
            lvl: 4,
            rarity: 5,
            modParts: {
                melee: { dmgBonus: 30 },
                missile: { rateBonus: 30 },
                staff: { acBonus: 20 },
                shield: { acBonus: 30 },
                amulet: { acBonus: 20 },
                ring: { dmgBonus: 20 },
                light: { rateBonus: 20 },
                armor: { acBonus: 20 },
                cloak: { acBonus: 20 },
                belt: { acBonus: 20 },
                helm: { acBonus: 20 },
                gloves: { rateBonus: 20 },
                boots: { acBonus: 20 },
            }
        }],

        [O_HOD, {
            name: { a: '<8>', b: '<8>' },
            nameReal: { a: 'Splendour', b: '栄光' },
            color: colorList.orange,
            lvl: 7,
            rarity: 10,
            modParts: {
                melee: { stealLife: 3 },
                missile: { stealLife: 3 },
                staff: { stealLife: 3 },
                shield: { hp: 20 },
                amulet: { hpReg: 10 },
                ring: { hpReg: 10 },
                light: { gf: 40 },
                armor: { hp: 30 },
                cloak: { gf: 30 },
                belt: { hpReg: 20 },
                helm: { gf: 30 },
                gloves: { stealLife: 3 },
                boots: { gf: 30 },
            }
        }],

        [O_NETZACH, {
            name: { a: '<7>', b: '<7>' },
            nameReal: { a: 'Eternity', b: '勝利' },
            color: colorList.green,
            lvl: 10,
            rarity: 15,
            modParts: {
                melee: { dmgPoison: 20 },
                missile: { dmgPoison: 20 },
                staff: { skillPoison: 1 },
                shield: { poison: 30 },
                amulet: { skillPoison: 1 },
                ring: { skillPoison: 1 },
                light: { poison: 20 },
                armor: { poison: 20 },
                cloak: { poison: 20 },
                belt: { poison: 20 },
                helm: { poison: 20 },
                gloves: { dmgPoison: 20 },
                boots: { poison: 20 },
            }
        }],

        [O_TIPHERETH, {
            name: { a: '<6>', b: '<6>' },
            nameReal: { a: 'Beauty', b: '美' },
            color: colorList.yellow,
            lvl: 13,
            rarity: 20,
            modParts: {
                melee: { stealMana: 3 },
                missile: { stealMana: 3 },
                staff: { stealMana: 3 },
                shield: { mp: 10 },
                amulet: { mpReg: 10 },
                ring: { mpReg: 10 },
                light: { mf: 30 },
                armor: { mp: 20 },
                cloak: { mf: 20 },
                belt: { mpReg: 20 },
                helm: { mp: 10 },
                gloves: { stealMana: 3 },
                boots: { mf: 20 },
            }
        }],

        [O_GEVURAH, {
            name: { a: '<5>', b: '<5>' },
            nameReal: { a: 'Severity', b: '峻厳' },
            color: colorList.red,
            lvl: 16,
            rarity: 25,
            modParts: {
                melee: { dmgFire: 20 },
                missile: { dmgFire: 20 },
                staff: { skillFire: 1 },
                shield: { fire: 30 },
                amulet: { skillFire: 1 },
                ring: { skillFire: 1 },
                light: { lighten: 1 },
                armor: { fire: 20 },
                cloak: { fire: 20 },
                belt: { fire: 20 },
                helm: { fire: 20 },
                gloves: { str: 5 },
                boots: { fire: 20 },
            }
        }],

        [O_CHESED, {
            name: { a: '<4>', b: '<4>' },
            nameReal: { a: 'Kindness', b: '慈悲' },
            color: colorList.blue,
            lvl: 19,
            rarity: 30,
            modParts: {
                melee: { atkCold: 20 },
                missile: { atkCold: 20 },
                staff: { skillWater: 1 },
                shield: { water: 30 },
                amulet: { skillWater: 1 },
                ring: { skillWater: 1 },
                light: { water: 20 },
                armor: { water: 20 },
                cloak: { water: 20 },
                belt: { water: 20 },
                helm: { int: 5 },
                gloves: { atkCold: 20 },
                boots: { water: 20 },
            }
        }],

        [O_BINAH, {
            name: { a: '<3>', b: '<3>' },
            nameReal: { a: 'Understanding', b: '理解' },
            color: colorList.shadow,
            lvl: 22,
            rarity: 35,
            modParts: {
                melee: { atkSlow: 20 },
                missile: { atkSlow: 20 },
                staff: { skillEarth: 1 },
                shield: { earth: 30 },
                amulet: { skillEarth: 1 },
                ring: { skillEarth: 1 },
                light: { earth: 20 },
                armor: { earth: 20 },
                cloak: { earth: 20 },
                belt: { con: 5 },
                helm: { earth: 20 },
                gloves: { atkSlow: 20 },
                boots: { earth: 20 },
            }
        }],

        [O_CHOKHMAH, {
            name: { a: '<2>', b: '<2>' },
            nameReal: { a: 'Wisdom', b: '知恵' },
            color: colorList.gray,
            lvl: 25,
            rarity: 40,
            modParts: {
                melee: { dmgLightning: 20 },
                missile: { dmgLightning: 20 },
                staff: { skillAir: 1 },
                shield: { air: 30 },
                amulet: { skillAir: 1 },
                ring: { skillAir: 1 },
                light: { air: 20 },
                armor: { air: 20 },
                cloak: { spd: 20 },
                belt: { air: 20 },
                helm: { air: 20 },
                gloves: { dmgLightning: 20 },
                boots: { dex: 5 },
            }
        }],

        [O_KETER, {
            name: { a: '<1>', b: '<1>' },
            nameReal: { a: 'Crown', b: '王冠' },
            color: colorList.white,
            lvl: 30,
            rarity: 50,
            modParts: {
                melee: { ias: 20 },
                missile: { ias: 20 },
                staff: { fcr: 20 },
                shield: { resistAll: 20 },
                amulet: { fcr: 20 },
                ring: { ias: 20 },
                light: { resistAll: 10 },
                armor: { resistAll: 10 },
                cloak: { resistAll: 10 },
                belt: { resistAll: 10 },
                helm: { fcr: 20 },
                gloves: { ias: 20 },
                boots: { frw: 20 },
            }
        }],
    ]),
};

const itemNumsMap = (() => {
    let nums = new Map();
    for (let key in itemTab) {
		nums.set(key, enums(1, itemTab[key].size));
	}

    return nums;
})();

const itList = Object.keys(itemTab);
itList.push('material');

const itemUniqueMap = {
    melee: new Map([]),
    missile: new Map([
        [M_BOW, [{
            name: { a: 'Pandarus', b: 'パンダロス', pre: true },
            lvl: 25,
            rarity: 20,
            matBase: M_HORN,
            matId: HORN_GOAT,
            values: { hp: 50, mp: 50, dmgMinBonus: 10, dmgBonus: 50, rateBonus: 50 },
        }]],
	]),
	
    staff: new Map([]),
    shield: new Map([]),
    armor: new Map([]),
    cloak: new Map([]),
    belt: new Map([]),
    helm: new Map([]),
    gloves: new Map([]),
    boots: new Map([]),
    light: new Map([]),
    ring: new Map([]),
    amulet: new Map([]),
    gem: new Map([]),
};
