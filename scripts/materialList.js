const MAX_HARDNESS = 13;
const materialList = enumsBit(1, MAX_HARDNESS);
const [
	M_CLOTH,
	M_FUR,
	M_FEATHER,
	M_SKIN,
	M_SCALE,
	M_BONE,
	M_SHELL,
	M_METAL,
	M_PLATING,
	M_GEM,
	M_STONE,
    M_WOOD,
    M_HORN,
] = [...materialList];

const [
    CLOTH_LINEN,
    CLOTH_HEMP,
    CLOTH_WOOL,
    CLOTH_COTTON,
    CLOTH_SILK,
    CLOTH_MOHAIR,
    CLOTH_CASHMERE,
    CLOTH_CAMEL,
    CLOTH_ANGORA,
    CLOTH_VICUNA,
    CLOTH_SPIDERWEB,
] = enums(0, 10);

const [
    FEATHER_CHICKEN,
    FEATHER_PEAFOWL,
    FEATHER_EAGLE,
    FEATHER_HAWK,
    FEATHER_BAT,
    FEATHER_FAIRY,
    FEATHER_HARPY,
    FEATHER_GRIFFIN,
    FEATHER_ANGLE,
    FEATHER_PHOENIX,
    FEATHER_PEGASUS,
] = enums(0, 10);

const [
    FUR_RABBIT,
    FUR_BOAR,
    FUR_WOLF,
    FUR_JACKAL,
    FUR_RACCOON,
    FUR_FERRET,
    FUR_MINK,
    FUR_RUM,
    FUR_FOX,
    FUR_SKUNK,
    FUR_LION,
    FUR_MANTICORE,
    FUR_CERBERUS,
] = enums(0, 12);

const [
    SKIN_DEER,
    SKIN_SHEEP,
    SKIN_GOAT,
    SKIN_HORSE,
    SKIN_COW,
    SKIN_DEMON,
    SKIN_WYRM,
] = enums(0, 6);

const [
    SCALE_SERPENT, 
    SCALE_LIZARD, 
    SCALE_FISH, 
    SCALE_SHARK, 
    SCALE_NAGA, 
    SCALE_HYDRA, 
    SCALE_DRAGON, 
    SCALE_LAMIA, 
] = enums(0, 7);

const [
	PLATING_TIN,
	PLATING_ZINC,
	PLATING_CADMIUM,
	PLATING_CHROME,
	PLATING_COPPER,
	PLATING_SILVER,
	PLATING_GOLD,
	PLATING_PLATINUM,
	PLATING_ALUMITE,
] = enums(0, 8);

const [
	WOOD_POPLAR,
	WOOD_WALNUT,
	WOOD_CYPRESS,
	WOOD_OAK,
	WOOD_BEECH,
	WOOD_ASH,
	WOOD_EBONY,
	WOOD_ROSEWOOD,
	WOOD_TEAK,
	WOOD_MAHOGANY,
	WOOD_LIFE_TREE,
] = enums(0, 10);

const [
    HORN_DEER,
    HORN_SHEEP,
    HORN_GOAT,
    HORN_COW,
    HORN_RHINO,
    HORN_DRAGON,
    HORN_DEMON,
    HORN_MINOTAUR,
    HORN_UNICORN,
] = enums(0, 8);

const [
	BONE_COMMON,
	BONE_GIANT,
	BONE_DRAGON,
	BONE_DEMON,
	BONE_VAMPIRE,
] = enums(0, 4);

const [
	SHELL_CORAL,
	SHELL_SCORPION,
	SHELL_CRAB,
	SHELL_TURTLE,
	SHELL_SCARAB,
] = enums(0, 4);

const [
	METAL_TIN,
	METAL_COPPER,
	METAL_BRASS,
	METAL_BRONZE,
	METAL_IRON,
	METAL_STEEL,
	METAL_SILVER,
	METAL_GOLD,
	METAL_PLATINUM,
	METAL_TITANIUM,
	METAL_ADAMANTITE,
	METAL_ORICHALCUM,
] = enums(0, 11);

const [
	STONE_COMMON,
	STONE_HEMATITE,
	STONE_MOONSTONE,
	STONE_OBSIDIAN,
	STONE_ONYX,
	STONE_MORION,
	STONE_CRYSTAL,
	STONE_TOURMALINE,
	STONE_BERYL,
	STONE_SPINEL,
	STONE_CORUNDUM,
	STONE_CERAMIC,
	STONE_METEORITE,
	STONE_BLACK_DIAMOND,
] = enums(0, 13);

const [
    GEM_RUBY,
    GEM_TURQUOISE,
    GEM_AQUAMARINE,
    GEM_AMBER,
    GEM_EMERALD,
    GEM_DIAMOND,
    GEM_TOPAZ,
    GEM_SAPPHIRE,
    GEM_BLACK_OPAL,
    GEM_JADE,
    GEM_GARNET,
    GEM_CHRYSOBERYL,
    GEM_FLUORITE,
    GEM_TANZANITE,
    GEM_CITRINE,
] = enums(0, 14);

const MAX_BIAS_NUMS = 15;
const [
	BIAS_FIRE,
	BIAS_WATER,
	BIAS_AIR,
	BIAS_EARTH,
	BIAS_POISON,
	BIAS_LIGHT,
	BIAS_COLD,
	BIAS_LIGHTNING,
	BIAS_GRAVITY,
	BIAS_INFECTION,
	BIAS_SAND,
	BIAS_BLIZZARD,
	BIAS_ACID,
	BIAS_MAGMA,
	BIAS_RADIATION,
] = enums(1, MAX_BIAS_NUMS);

const materialMap = new Map([
    [M_CLOTH, {
        name: { a: 'Cloths', b: '布類' },
        hRate: 1,
        pRate: 1,
        list: new Map([
            [CLOTH_LINEN, { name: { a: 'linen', b: '亜麻' }, rarity: 0,color: colorList.linen }],
            [CLOTH_HEMP, { name: { a: 'Hemp', b: '麻' }, rarity: 5,color: colorList.flax }],
            [CLOTH_WOOL, { name: { a: 'Wool', b: '羊毛' }, rarity: 10, color: colorList.white }], //Fleece?
            [CLOTH_COTTON, { name: { a: 'Cotton', b: '綿' }, rarity: 20, color: colorList.white }],
            [CLOTH_SILK, { name: { a: 'Silk', b: '絹' }, rarity: 30, color: colorList.white }],
            [CLOTH_MOHAIR, { name: { a: 'Mohair', b: 'モヘヤ' }, rarity: 40, color: colorList.white }], //アンゴラ山羊
            [CLOTH_CASHMERE, { name: { a: 'Cashmere', b: 'カシミア' }, rarity: 50, color: colorList.white }], //カシミヤ山羊
            [CLOTH_CAMEL, { name: { a: 'Camel', b: 'キャメル' }, rarity: 60, color: colorList.white }], //ラクダ
            [CLOTH_ANGORA, { name: { a: 'Angora', b: 'アンゴラ' }, rarity: 70, color: colorList.white }], //アンゴラヤギ、アンゴラウサギ,モヘヤ?
            [CLOTH_VICUNA, { name: { a: 'Vicuna', b: 'ビキューナ' }, rarity: 80, color: colorList.white }], //ラクダ科
            [CLOTH_SPIDERWEB, { name: { a: 'Spiderweb', b: 'スパイダーウェブ' }, rarity: 90, color: colorList.white }],
        ])
	}],
	
    [M_FEATHER, {
        name: { a: 'Feathers', b: '羽類' },
        hRate: 2,
        pRate: 1.1,
        bonus: { air: '1d5' },
        list: new Map([
            [FEATHER_CHICKEN, { name: { a: 'Chicken Feather', b: '鶏羽' }, rarity: 0, color: colorList.brown }],
            [FEATHER_PEAFOWL, { name: { a: 'Peafowl Feather', b: '孔雀羽' }, rarity: 5, color: colorList.teal }],
            [FEATHER_EAGLE, { name: { a: 'Eagle Feather', b: '鷲羽' }, rarity: 10, color: colorList.shadow }],
            [FEATHER_HAWK, { name: { a: 'Hawk Feather', b: '鷹羽' }, rarity: 20, color: colorList.beigegray }],
            [FEATHER_BAT, { name: { a: 'Bat Feather', b: '蝙蝠羽' }, rarity: 30, color: colorList.shadow }],
            [FEATHER_FAIRY, { name: { a: 'Fairy Feather', b: 'フェアリー・フェザー' }, rarity: 40, color: colorList.lime }],
            [FEATHER_HARPY, { name: { a: 'Harpy Feather', b: 'ハーピー・フェザー' }, rarity: 50, color: colorList.skyblue }],
            [FEATHER_GRIFFIN, { name: { a: 'Griffin Feather', b: 'グリフォン・フェザー' }, rarity: 60, color: colorList.white }],
            [FEATHER_ANGLE, { name: { a: 'Angel Feather', b: 'エンジェル・フェザー' }, rarity: 70, color: colorList.white, }],
            [FEATHER_PHOENIX, { name: { a: 'Phoenix Feather', b: 'フェニックス・フェザー' }, rarity: 80, color: colorList.red, values: { fire: '1d10' } }],
            [FEATHER_PEGASUS, { name: { a: 'Pegasus Feather', b: 'ペガサス・フェザー' }, rarity: 90, color: colorList.white }],
            //セイレン?
        ])
	}],
	
    [M_FUR, {
        name: { a: 'Furs', b: '毛皮類' },
        hRate: 3,
        pRate: 1.2,
        bonus: { water: '1d5' },
        list: new Map([
            [FUR_RABBIT, { name: { a: 'Rabbit Fur', b: '兎毛皮' }, rarity: 0, color: colorList.beige }],
            [FUR_BOAR, { name: { a: 'Boar Fur', b: '猪毛皮' }, rarity: 5, color: colorList.brown }],
            [FUR_WOLF, { name: { a: 'Wolf Fur', b: '狼毛皮' }, rarity: 10, color: colorList.beigegray }],
            [FUR_JACKAL, { name: { a: 'Jackal Fur', b: 'ジャッカル毛皮' }, rarity: 15, color: colorList.goldenyellow }],
            [FUR_RACCOON, { name: { a: 'Raccoon Fur', b: 'ラクーン毛皮' }, rarity: 20, color: colorList.beige }],
            [FUR_FERRET, { name: { a: 'Ferret Fur', b: 'フェレット毛皮' }, rarity: 25, color: colorList.beigegray }],
            [FUR_MINK, { name: { a: 'Mink Fur', b: 'ミンク毛皮' }, rarity: 30, color: colorList.lightgrey }],
            [FUR_RUM, { name: { a: 'Rum Fur', b: 'ラム毛皮' }, rarity: 40, color: colorList.beige }],
            [FUR_FOX, { name: { a: 'Fox Fur', b: '狐毛皮' }, rarity: 50, color: colorList.fox }],
            [FUR_SKUNK, { name: { a: 'Skunk Fur', b: 'スカンク毛皮' }, rarity: 60, color: colorList.shadow }],
            [FUR_LION, { name: { a: 'Lion Fur', b: 'ライオン毛皮' }, rarity: 70, color: colorList.goldenyellow }],
            [FUR_MANTICORE, { name: { a: 'Manticore Fur', b: 'マンティコア毛皮' }, rarity: 80, color: colorList.red }],
            [FUR_CERBERUS, { name: { a: 'Cerberus Fur', b: 'ケルベロス毛皮' }, rarity: 90, color: colorList.gray }],
        ])
	}],
	
    [M_SKIN, {
        name: { a: 'Skins', b: '皮類' },
        hRate: 4,
        pRate: 1.3,
        list: new Map([
            [SKIN_DEER, { name: { a: 'Deerhide', b: '鹿皮' }, rarity: 0, color: colorList.goldenyellow }],
            [SKIN_SHEEP, { name: { a: 'Sheepskin', b: '羊皮' }, rarity: 10, color: colorList.beige }],
            [SKIN_GOAT, { name: { a: 'Goatskin', b: '山羊皮' }, rarity: 20, color: colorList.beigegray }],
            [SKIN_HORSE, { name: { a: 'Horsehide', b: '馬皮' }, rarity: 30, color: colorList.brown }],
            [SKIN_COW, { name: { a: 'Cowhide', b: '牛皮' }, rarity: 40, color: colorList.white }],
            [SKIN_DEMON, { name: { a: 'Demonhide', b: 'デーモン・ハイド' }, rarity: 80, color: colorList.shadow }],
            [SKIN_WYRM, { name: { a: 'Wyrmhide', b: 'ワイアーム・ハイド' }, rarity: 90, color: colorList.green }],
        ])
	}],
	
    [M_SCALE, {
        name: { a: 'Scales', b: '鱗類' },
        hRate: 5,
        pRate: 1.4,
        bonus: { poison: '1d5' },
        list: new Map([
            [SCALE_SERPENT, { name: { a: 'Serpentskin', b: '蛇皮' }, rarity: 0, color: colorList.purple }],
            [SCALE_LIZARD, { name: { a: 'Lizard Skin', b: 'トカゲ皮' }, rarity: 10, color: colorList.lightgreen }],
            [SCALE_FISH, { name: { a: 'Fish Scale', b: '魚鱗' }, rarity: 20, color: colorList.blue }],
            [SCALE_SHARK, { name: { a: 'Sharkskin', b: '鮫皮' }, rarity: 30, color: colorList.silver }],
            [SCALE_NAGA, { name: { a: 'Nagascale', b: 'ナーガ鱗' }, rarity: 60, color: colorList.darkgreen }],
            [SCALE_HYDRA, { name: { a: 'Hydrascale', b: 'ヒュドラ鱗' }, rarity: 70, color: colorList.green }],
            [SCALE_DRAGON, { name: { a: 'Dragonscale', b: '竜鱗' }, rarity: 80, color: colorList.green }],
            [SCALE_LAMIA, { name: { a: 'Lamiascale', b: 'ラミア鱗' }, rarity: 90, color: colorList.teal }],
        ])
	}],
	
    [M_PLATING, {
        name: { a: 'Plating', b: 'メッキ製' },
        hRate: 6,
        pRate: 1.5,
        list: new Map([
            [PLATING_TIN, { name: { a: 'Tin Plated', b: '錫メッキ' }, rarity: 0, color: colorList.tin }],
            [PLATING_ZINC, { name: { a: 'Zinc Plated', b: '亜鉛メッキ' }, rarity: 10, color: colorList.zinc }],
            [PLATING_CADMIUM, { name: { a: 'Cadmium Plated', b: 'カドミウムメッキ' }, rarity: 20, color: colorList.cadmium }],
            [PLATING_CHROME, { name: { a: 'Chrome Plated', b: 'クロムメッキ' }, rarity: 30, color: colorList.chrome }],
            [PLATING_COPPER, { name: { a: 'Copper Plated', b: '銅メッキ' }, rarity: 40, color: colorList.copper }],
            [PLATING_SILVER, { name: { a: 'Silver Plated', b: '銀メッキ' }, rarity: 50, color: colorList.silver }],
            [PLATING_GOLD, { name: { a: 'Gold Plated', b: '金メッキ' }, rarity: 60, color: colorList.gold }],
            [PLATING_PLATINUM, { name: { a: 'Platinum Plated', b: 'プラチナメッキ' }, rarity: 70, color: colorList.platinum }],
            [PLATING_ALUMITE, { name: { a: 'Alumite', b: 'アルマイト' }, rarity: 80, color: colorList.aluminium }],
            //Gilded
        ])
	}],
	
    [M_WOOD, {
        name: { a: 'Woods', b: '木材' },
        hRate: 7,
        pRate: 1.6,
        bonus: { durabBonus: '1d10' },
        list: new Map([
            [WOOD_POPLAR, { name: { a: 'Poplar', b: 'ポプラ' }, rarity: 0, color: colorList.beige }],
            [WOOD_WALNUT, { name: { a: 'Walnut', b: 'クルミ' }, rarity: 5, color: colorList.walnut }],
            [WOOD_CYPRESS, { name: { a: 'Cypress', b: 'イトスギ' }, rarity: 10, color: colorList.cypress }],
            [WOOD_OAK, { name: { a: 'Oak', b: '樫' }, rarity: 20, color: colorList.oak }],
            [WOOD_BEECH, { name: { a: 'Beech', b: 'ブナ' }, rarity: 30, color: colorList.beech }],
            [WOOD_ASH, { name: { a: 'Ash', b: 'トネリコ' }, rarity: 40, color: colorList.ash }],
            [WOOD_EBONY, { name: { a: 'Ebony', b: '黒檀' }, rarity: 50, color: colorList.ebony }],
            [WOOD_ROSEWOOD, { name: { a: 'Rosewood', b: '紫檀' }, rarity: 60, color: colorList.rosewood }],
            [WOOD_TEAK, { name: { a: 'Teak', b: 'チーク' }, rarity: 70, color: colorList.teak }],
            [WOOD_MAHOGANY, { name: { a: 'Mahogany', b: 'マホガニー' }, rarity: 80, color: colorList.mahogany }],
            [WOOD_LIFE_TREE, { name: { a: 'Life Tree', b: '生命樹' }, rarity: 90, color: colorList.brown }],
            //Cedar
        ])
	}],
	
    [M_HORN, {
        name: { a: 'Horns', b: '角類' },
        hRate: 8,
        pRate: 2.1,
        bonus: { dmgBonus: '1d10' },
        list: new Map([
            [HORN_DEER, { name: { a: 'Deer Horn', b: '鹿角' }, rarity: 0, color: colorList.white }],
            [HORN_SHEEP, { name: { a: 'Sheep Horn', b: '羊角' }, rarity: 10, color: colorList.white }],
            [HORN_GOAT, { name: { a: 'Goat Horn', b: '山羊角' }, rarity: 20, color: colorList.white }],
            [HORN_COW, { name: { a: 'Cow Horn', b: '牛角' }, rarity: 30, color: colorList.white }],
            [HORN_RHINO, { name: { a: 'Rhino Horn', b: 'サイ角' }, rarity: 40, color: colorList.white }],
            [HORN_MINOTAUR, { name: { a: 'Minotaur Horn', b: 'ミノタウロス・ホーン' }, rarity: 60, color: colorList.white }],
            [HORN_DRAGON, { name: { a: 'Dragon Horn', b: '竜角' }, rarity: 70, color: colorList.white }],
            [HORN_DEMON, { name: { a: 'Demon Horn', b: 'デーモン・ホーン' }, rarity: 80, color: colorList.white }],
            [HORN_UNICORN, { name: { a: 'Unicorn Horn', b: 'ユニコーン・ホーン' }, rarity: 90, color: colorList.white }],
        ])
	}],
	
    [M_BONE, {
        name: { a: 'Bones', b: '骨類' },
        hRate: 9,
        pRate: 1.7,
        bonus: { acBonus: '1d10' },
        list: new Map([
            [BONE_COMMON, { name: { a: 'Bone', b: '骨' }, rarity: 0, color: colorList.white }],
            [BONE_GIANT, { name: { a: 'Giantbone', b: 'ジャイアント・ボーン' }, rarity: 10, color: colorList.white }],
            [BONE_DRAGON, { name: { a: 'Dragonbone', b: 'ドラゴン・ボーン' }, rarity: 70, color: colorList.white }],
            [BONE_DEMON, { name: { a: 'Demonbone', b: 'デーモン・ボーン' }, rarity: 80, color: colorList.white }],
            [BONE_VAMPIRE, { name: { a: 'Vampirebone', b: 'ヴァンパイア・ボーン' }, rarity: 90, color: colorList.white }],
        ])
	}],
	
    [M_SHELL, {
        name: { a: 'Shells', b: '甲殻類' },
        hRate: 10,
        pRate: 1.8,
        bonus: { fire: '1d5' },
        list: new Map([
            [SHELL_CORAL, { name: { a: 'Coral', b: '珊瑚' }, rarity: 0, color: colorList.coral }],
            [SHELL_SCORPION, { name: { a: 'Scorpion Shell', b: 'サソリ殻' }, rarity: 10, color: colorList.shadow }],
            [SHELL_CRAB, { name: { a: 'Crab Shell', b: '蟹殻' }, rarity: 20, color: colorList.orange }],
            [SHELL_TURTLE, { name: { a: 'Turtle Shell', b: '亀甲羅' }, rarity: 30, color: colorList.brown }],
            [SHELL_SCARAB, { name: { a: 'Scarab Shell', b: 'スカラブ殻' }, rarity: 40, color: colorList.gray }], //スカラベ
        ])
	}],
	
    [M_METAL, {
        name: { a: 'Metals', b: '金属類' },
        hRate: 11,
        pRate: 1.9,
        list: new Map([
            [METAL_TIN, { name: { a: 'Tin', b: '錫' }, rarity: 0, color: colorList.tin }],
            [METAL_COPPER, { name: { a: 'Copper', b: '銅' }, rarity: 5, color: colorList.copper }],
            [METAL_BRASS, { name: { a: 'Brass', b: '黄銅' }, rarity: 10, color: colorList.brass }],
            [METAL_BRONZE, { name: { a: 'Bronze', b: '青銅' }, rarity: 15, color: colorList.bronze }],
            [METAL_IRON, { name: { a: 'Iron', b: '鉄' }, rarity: 20, color: colorList.iron }],
            [METAL_STEEL, { name: { a: 'Steel', b: '鋼' }, rarity: 30, color: colorList.steel }],
            [METAL_SILVER, { name: { a: 'Silver', b: '銀' }, rarity: 40, color: colorList.silver }],
            [METAL_GOLD, { name: { a: 'Gold', b: '金' }, rarity: 50, color: colorList.gold }],
            [METAL_PLATINUM, { name: { a: 'Platinum', b: 'プラチナ' }, rarity: 60, color: colorList.platinum }],
            [METAL_TITANIUM, { name: { a: 'Titanium', b: 'チタン' }, rarity: 70, color: colorList.titanium }],
            [METAL_ADAMANTITE, { name: { a: 'Adamantite', b: 'アダマンタイト' }, rarity: 80, color: colorList.steel }],
            [METAL_ORICHALCUM, { name: { a: 'Orichalcum', b: 'オリハルコン' }, rarity: 90, color: colorList.brass }],
        ])
	}],
	
    [M_STONE, {
        name: { a: 'Stones', b: '石材' },
        hRate: 12,
        pRate: 2,
        bonus: { earth: '1d5' },
        list: new Map([
            [STONE_COMMON, { name: { a: 'Stone', b: '石' }, rarity: 0, color: colorList.white }],
            [STONE_HEMATITE, { name: { a: 'Hematite', b: 'ヘマタイト' }, rarity: 5, color: colorList.white }],
            [STONE_MOONSTONE, { name: { a: 'Moonstone', b: 'ムーンストーン' }, rarity: 10, color: colorList.skyblue }],
            [STONE_OBSIDIAN, { name: { a: 'Obsidian', b: '黒曜石' }, rarity: 15, color: colorList.shadow }],
            [STONE_ONYX, { name: { a: 'Onyx', b: 'オニキス' }, rarity: 20, color: colorList.shadow }],
            [STONE_MORION, { name: { a: 'Morion', b: 'モリオン' }, rarity: 25, color: colorList.shadow }],
            [STONE_CRYSTAL, { name: { a: 'Crystal', b: 'クリスタル' }, rarity: 30, color: colorList.white }],
            [STONE_TOURMALINE, { name: { a: 'Tourmaline', b: 'トルマリン' }, rarity: 35, color: colorList.lightning }],
            [STONE_BERYL, { name: { a: 'Beryl', b: 'ベリル' }, rarity: 40, color: colorList.lightgreen }],
            [STONE_SPINEL, { name: { a: 'Spinel', b: 'スピネル' }, rarity: 50, color: colorList.pink }],
            [STONE_CORUNDUM, { name: { a: 'Corundum', b: 'コランダム' }, rarity: 60, color: colorList.white }],
            [STONE_CERAMIC, { name: { a: 'Ceramic', b: 'セラミック' }, rarity: 70, color: colorList.white }],
            [STONE_METEORITE, { name: { a: 'Meteorite', b: '隕石' }, rarity: 80, color: colorList.gray }],
            [STONE_BLACK_DIAMOND, { name: { a: 'Black Diamond', b: 'ブラック・ダイヤモンド' }, rarity: 90, color: colorList.shadow }],
            //Gargoyle
        ])
	}],
	
    [M_GEM, {
        name: { a: 'Gems', b: '宝石類' },
        hRate: 13,
        pRate: 3,
        list: new Map([
            [GEM_RUBY, { name: { a: 'Ruby', b: 'ルビー' }, rarity: 0, values: { fire: '1d10' }, color: colorList.fire, bias: BIAS_FIRE }],
            [GEM_TURQUOISE, { name: { a: 'Turquoise', b: 'ターコイズ' }, rarity: 0, values: { air: '1d10' }, color: colorList.air, bias: BIAS_AIR }],
            [GEM_AQUAMARINE, { name: { a: 'Aquamarine', b: 'アクアマリン' }, rarity: 0, values: { water: '1d10' }, color: colorList.water, bias: BIAS_WATER }],
            [GEM_AMBER, { name: { a: 'Amber', b: 'アンバー' }, rarity: 0, values: { earth: '1d10' }, color: colorList.earth, bias: BIAS_EARTH }],
            [GEM_EMERALD, { name: { a: 'Emerald', b: 'エメラルド' }, rarity: 0, values: { poison: '1d10' }, color: colorList.poison, bias: BIAS_POISON }],
            [GEM_DIAMOND, { name: { a: 'Diamond', b: 'ダイヤモンド' }, rarity: 30, values: { fire: '2d10' }, color: colorList.light, bias: BIAS_LIGHT }],
            [GEM_TOPAZ, { name: { a: 'Topaz', b: 'トパーズ' }, rarity: 30, values: { air: '2d10' }, color: colorList.lightning, bias: BIAS_LIGHTNING }],
            [GEM_SAPPHIRE, { name: { a: 'Sapphire', b: 'サファイア' }, rarity: 30, values: { water: '2d10' }, color: colorList.cold, bias: BIAS_COLD }],
            [GEM_BLACK_OPAL, { name: { a: 'Black Opal', b: '黒真珠' }, rarity: 30, values: { earth: '2d10' }, color: colorList.gravity, bias: BIAS_GRAVITY }],
            [GEM_JADE, { name: { a: 'Jade', b: '翡翠' }, rarity: 30, values: { poison: '2d10' }, color: colorList.infection, bias: BIAS_INFECTION }],
            [GEM_GARNET, { name: { a: 'Garnet', b: 'ガーネット' }, rarity: 60, values: { fire: '1d10', earth: '1d10' }, color: colorList.magma, bias: BIAS_MAGMA }],
            [GEM_CHRYSOBERYL, { name: { a: 'Chrysoberyl', b: 'クリソベリル' }, rarity: 60, values: { water: '1d10', poison: '1d10' }, color: colorList.acid, bias: BIAS_ACID }], //キャッツアイ,アレキサンドライト
            [GEM_FLUORITE, { name: { a: 'Fluorite', b: 'フローライト' }, rarity: 60, values: { fire: '1d10', poison: '1d10' }, color: colorList.radiation, bias: BIAS_RADIATION }],
            [GEM_TANZANITE, { name: { a: 'Tanzanite', b: 'タンザナイト' }, rarity: 60, values: { water: '1d10', air: '1d10' }, color: colorList.blizzard, bias: BIAS_BLIZZARD }],
            [GEM_CITRINE, { name: { a: 'Citrine', b: 'シトリン' }, rarity: 60, values: { air: '1d10', earth: '1d10' }, color: colorList.sand, bias: BIAS_SAND }],
        ])
    }],
]);

{
    for (let [matBase, materials] of materialMap.entries()) {
        let hRate = materials.hRate;
        let tRate = MAX_HARDNESS + 1 - hRate;
        let pRate = materials.pRate;
        let list = materials.list;
        materials.nums = enums(0, list.size - 1);
        let bonus = materials.bonus;
        for (let mat of list.values()) {
            let rarity = mat.rarity;
            let rate = rarity / 10;
            mat.density = hRate + rate++ / 10;
            mat.hardness = hRate * rate;
            mat.toughness = tRate * rate;
            mat.tBase = MAX_HARDNESS * rate;
            mat.priceRate = pRate * rate;
            mat.embeddedNum = Math.ceil((rarity + 1) / 100 * MAX_EMBEDDED_NUM);
            mat.lvl = Math.ceil(rarity / 3);
            if (mat.lvl < 1) mat.lvl = 1;
            if (bonus) {
                if (!mat.values) mat.values = {};
                copyObj(mat.values, bonus);
            }
        }
    }
}

const mineralTab = [
    { name: { a: 'Nickel', b: 'ニッケル' }, color: colorList.nickel },
    { name: { a: 'Cobalt', b: 'コバルト' }, color: colorList.cobalt },
    { name: { a: 'Magnesium', b: 'マグネシウム' }, color: colorList.magnesium },
    { name: { a: 'Chrome', b: 'クロム' }, color: colorList.chrome },
    { name: { a: 'Carbon', b: 'カーボン' }, color: colorList.carbon },
    { name: { a: 'Silicon', b: 'シリコン' }, color: colorList.white },
];

{
    let metals = materialMap.get(M_METAL).list;
    for (let metal of metals.values()) {
		mineralTab.push(metal);
	}
}
