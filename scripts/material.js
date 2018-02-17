const materialList = enumsBit(1, 13);
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
] = enums(0, 9);

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
    FUR_MINK,
    FUR_RUM,
    FUR_FOX,
    FUR_SKUNK,
    FUR_LION,
    FUR_MANTICORE,
    FUR_CERBERUS,
] = enums(0, 11);

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
        tRate: 6,
        pRate: 1,
        list: new Map([
            [CLOTH_HEMP, { name: { a: 'Hemp', b: '麻' }, rarity: 0,color: colorList.flax }],
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
        tRate: 7,
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
        tRate: 9,
        pRate: 1.2,
        bonus: { water: '1d5' },
        list: new Map([
            [FUR_RABBIT, { name: { a: 'Rabbit Fur', b: '兎毛皮' }, rarity: 0, color: colorList.beige }],
            [FUR_BOAR, { name: { a: 'Boar Fur', b: '猪毛皮' }, rarity: 5, color: colorList.brown }],
            [FUR_WOLF, { name: { a: 'Wolf Fur', b: '狼毛皮' }, rarity: 10, color: colorList.beigegray }],
            [FUR_JACKAL, { name: { a: 'Jackal Fur', b: 'ジャッカル毛皮' }, rarity: 15, color: colorList.goldenyellow }],
            [FUR_RACCOON, { name: { a: 'Raccoon Fur', b: 'ラクーン毛皮' }, rarity: 20, color: colorList.beigegray }],
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
        tRate: 10,
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
        tRate: 8,
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
        tRate: 5,
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
        tRate: 3,
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
        tRate: 3,
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
            [HORN_UNICORN, { name: { a: 'Unicorn Horn', b: 'ユニコーン・ホーン' }, rarity: 99, color: colorList.white }],
        ])
	}],
	
    [M_BONE, {
        name: { a: 'Bones', b: '骨類' },
        hRate: 9,
        tRate: 2,
        pRate: 1.7,
        bonus: { acBonus: '1d10' },
        list: new Map([
            [BONE_COMMON, { name: { a: 'Bone', b: '骨' }, rarity: 0, color: colorList.white }],
            [BONE_GIANT, { name: { a: 'Giantbone', b: 'ジャイアント・ボーン' }, rarity: 10, color: colorList.white }],
            [BONE_DRAGON, { name: { a: 'Dragonbone', b: '竜骨' }, rarity: 70, color: colorList.white }],
            [BONE_DEMON, { name: { a: 'Demonbone', b: 'デーモン・ボーン' }, rarity: 80, color: colorList.white }],
            [BONE_VAMPIRE, { name: { a: 'Vampirebone', b: 'ヴァンパイア・ボーン' }, rarity: 90, color: colorList.white }],
        ])
	}],
	
    [M_SHELL, {
        name: { a: 'Shells', b: '甲殻類' },
        hRate: 10,
        tRate: 4,
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
        tRate: 3,
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
            [METAL_ADAMANTITE, { name: { a: 'Adamantite', b: 'アダマンタイト' }, rarity: 90, color: colorList.steel }],
            [METAL_ORICHALCUM, { name: { a: 'Orichalcum', b: 'オリハルコン' }, rarity: 90, color: colorList.brass }],
        ])
	}],
	
    [M_STONE, {
        name: { a: 'Stones', b: '石材' },
        hRate: 12,
        tRate: 1,
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
        tRate: 2,
        pRate: 3,
        list: new Map([
            [GEM_RUBY, { name: { a: 'Ruby', b: 'ルビー' }, rarity: 0, values: { fire: '1d10' }, color: colorList.fire, bias: BIAS_FIRE }],
            [GEM_TURQUOISE, { name: { a: 'Turquoise', b: 'ターコイズ' }, rarity: 0, values: { air: '1d10' }, color: colorList.air, bias: BIAS_AIR }],
            [GEM_AQUAMARINE, { name: { a: 'Aquamarine', b: 'アクアマリン' }, rarity: 0, values: { water: '1d10' }, color: colorList.water, bias: BIAS_WATER }],
            [GEM_AMBER, { name: { a: 'Amber', b: 'アンバー' }, rarity: 0, values: { earth: '1d10' }, color: colorList.earth, bias: BIAS_EARTH }],
            [GEM_EMERALD, { name: { a: 'Emerald', b: 'エメラルド' }, rarity: 0, values: { poison: '1d10' }, color: colorList.poison, bias: BIAS_POISON }],
            [GEM_DIAMOND, { name: { a: 'Diamond', b: 'ダイヤモンド' }, rarity: 30, values: { fire: '2d5' }, color: colorList.light, bias: BIAS_LIGHT }],
            [GEM_TOPAZ, { name: { a: 'Topaz', b: 'トパーズ' }, rarity: 30, values: { air: '2d5' }, color: colorList.lightning, bias: BIAS_LIGHTNING }],
            [GEM_SAPPHIRE, { name: { a: 'Sapphire', b: 'サファイア' }, rarity: 30, values: { water: '2d5' }, color: colorList.cold, bias: BIAS_COLD }],
            [GEM_BLACK_OPAL, { name: { a: 'Black Opal', b: '黒真珠' }, rarity: 30, values: { earth: '2d5' }, color: colorList.gravity, bias: BIAS_GRAVITY }],
            [GEM_JADE, { name: { a: 'Jade', b: '翡翠' }, rarity: 30, values: { poison: '2d5' }, color: colorList.infection, bias: BIAS_INFECTION }],
            [GEM_GARNET, { name: { a: 'Garnet', b: 'ガーネット' }, rarity: 60, values: { fire: '1d5', earth: '1d5' }, color: colorList.magma, bias: BIAS_MAGMA }],
            [GEM_CHRYSOBERYL, { name: { a: 'Chrysoberyl', b: 'クリソベリル' }, rarity: 60, values: { water: '1d5', poison: '1d5' }, color: colorList.acid, bias: BIAS_ACID }], //キャッツアイ,アレキサンドライト
            [GEM_FLUORITE, { name: { a: 'Fluorite', b: 'フローライト' }, rarity: 60, values: { fire: '1d5', poison: '1d5' }, color: colorList.radiation, bias: BIAS_RADIATION }],
            [GEM_TANZANITE, { name: { a: 'Tanzanite', b: 'タンザナイト' }, rarity: 60, values: { water: '1d5', air: '1d5' }, color: colorList.blizzard, bias: BIAS_BLIZZARD }],
            [GEM_CITRINE, { name: { a: 'Citrine', b: 'シトリン' }, rarity: 60, values: { air: '1d5', earth: '1d5' }, color: colorList.sand, bias: BIAS_SAND }],
        ])
    }],
]);

{
    for (let [matBase, materials] of materialMap.entries()) {
        let hRate = materials.hRate;
        let tRate = materials.tRate;
        let pRate = materials.pRate;
        let list = materials.list;
        materials.nums = enums(0, list.size - 1);
        let bonus = materials.bonus;
        for (let mat of list.values()) {
            let rarity = mat.rarity;
            let value = rarity / 10;
            mat.density = hRate + value++ / 10;
            mat.hardness = hRate * value;
            mat.toughness = tRate * value;
            mat.priceRate = pRate * value;
            mat.lvl = Math.floor(rarity / 3);
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

const modTab = {
    prefix: new Map([
        [BIAS_FIRE, {
            name: { a: 'Fire', b: '火炎の' },
            color: colorList.fire,
            lvl: 0,
            rarity: 0,
            melee: { dmgFire: '1d10' },
            missile: { dmgFire: '1d10' },
            staff: { dmgFire: '1d10' },
            shield: { fire: '2d10' },
            armor: { fire: '1d10' },
            cloak: { fire: '1d10' },
            belt: { fire: '1d10' },
            helm: { fire: '1d10' },
            gloves: { dmgFire: '1d10' },
            boots: { fire: '1d10' },
            amulet: { fire: '1d10' },
            ring: { fire: '1d10' },
            light: { fire: '1d10', lighten: 1 },
            gem: { fire: '1d10' },
            enemy: { fire: '2d10', str: 1, dmgFire: '1d10' },
            affix: [
                { name: { a: 'of Heat', b: '発熱の' }, rarity: 0 },
                { name: { a: 'of Fever', b: '熱狂の' }, rarity: 5 },
                { name: { a: 'of Combustion', b: '燃焼の' }, rarity: 10 },
                { name: { a: 'of Ignition', b: '発火の' }, rarity: 15 },
                { name: { a: 'of Blaze', b: '焔光の' }, rarity: 20 },
                { name: { a: 'of Flame', b: '焔の' }, rarity: 25 },
                { name: { a: 'of Flare', b: '爆炎の' }, rarity: 30 },
                { name: { a: 'of Burning', b: '灼熱の' }, rarity: 35 },
                { name: { a: 'of Inferno', b: '業火の' }, rarity: 40 },
                { name: { a: 'of Salamander', b: 'サラマンダーの' }, rarity: 50 },
                { name: { a: 'of Hestia', b: '炉の女神ヘスティアの' }, rarity: 60 },
                { name: { a: 'of Hephaestus', b: '鍛冶の神ヘパイストスの' }, rarity: 80 },
                { name: { a: 'of Prometheus', b: '火神プロメテウスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_WATER, {
            name: { a: 'Aqua', b: '水の' },
            color: colorList.water,
            lvl: 0,
            rarity: 0,
            melee: { water: '1d10' },
            missile: { water: '1d10' },
            staff: { water: '1d10' },
            shield: { water: '2d10' },
            armor: { water: '1d10' },
            cloak: { water: '1d10' },
            belt: { water: '1d10' },
            helm: { water: '1d10' },
            gloves: { water: '1d10' },
            boots: { water: '1d10' },
            amulet: { water: '1d10' },
            ring: { water: '1d10' },
            light: { water: '1d10' },
            gem: { water: '1d10' },
            enemy: { water: '2d10', int: 1 },
            affix: [
                { name: { a: 'of Rain', b: '降雨の' }, rarity: 0 },
                { name: { a: 'of Lake', b: '湖の' }, rarity: 5 },
                { name: { a: 'of River', b: '河川の' }, rarity: 10 },
                { name: { a: 'of Waterfall', b: '滝の' }, rarity: 15 },
                { name: { a: 'of Ocean', b: '大洋の' }, rarity: 20 },
                { name: { a: 'of Flow', b: '流動の' }, rarity: 25 },
                { name: { a: 'of Tide', b: '潮流の' }, rarity: 30 },
                { name: { a: 'of Splashing', b: '飛散の' }, rarity: 35 },
                { name: { a: 'of Flood', b: '氾濫の' }, rarity: 40 },
                { name: { a: 'of Whirlpool', b: '渦潮の' }, rarity: 45 },
                { name: { a: 'of Undine', b: 'ウィンディーネの' }, rarity: 50 },
                { name: { a: 'of Triton', b: '人魚の海神トリトンの' }, rarity: 60 },
                { name: { a: 'of Tethys', b: '水の女神テテュスの' }, rarity: 70 },
                { name: { a: 'of Achelous', b: '河神アケオロスの' }, rarity: 80 },
                { name: { a: 'of Poseidon', b: '海王ポセイドンの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_AIR, {
            name: { a: 'Air', b: '大気の' },
            color: colorList.air,
            lvl: 0,
            rarity: 0,
            melee: { air: '1d10' },
            missile: { air: '1d10' },
            staff: { air: '1d10' },
            shield: { air: '2d10' },
            armor: { air: '1d10' },
            cloak: { air: '1d10', levi: true },
            belt: { air: '1d10' },
            helm: { air: '1d10' },
            gloves: { air: '1d10' },
            boots: { air: '1d10', levi: true },
            amulet: { air: '1d10' },
            ring: { air: '1d10' },
            light: { air: '1d10' },
            gem: { air: '1d10' },
            enemy: { air: '2d10', dex: 1, levi: true },
            affix: [
                { name: { a: 'of Feather', b: '羽の' }, rarity: 0 },
                { name: { a: 'of Wing', b: '翼の' }, rarity: 5 },
                { name: { a: 'of Wind', b: '風の' }, rarity: 10 },
                { name: { a: 'of Drifting', b: '漂流の' }, rarity: 15 },
                { name: { a: 'of Gust', b: '突風の' }, rarity: 20 },
                { name: { a: 'of Gale', b: '疾風の' }, rarity: 25 },
                { name: { a: 'of Blast', b: '爆風の' }, rarity: 30 },
                { name: { a: 'of Vortex', b: '旋風の' }, rarity: 35 },
                { name: { a: 'of Tempest', b: '暴風の' }, rarity: 40 },
                { name: { a: 'of Cyclone', b: '大竜巻の' }, rarity: 45 },
                { name: { a: 'of Sylph', b: 'シルフの' }, rarity: 50 },
                { name: { a: 'of Eurus', b: '東風エウロスの' }, rarity: 55 },
                { name: { a: 'of Zephyrus', b: '西風ゼピュロスの' }, rarity: 60 },
                { name: { a: 'of Notos', b: '南風ノトスの' }, rarity: 65 },
                { name: { a: 'of Boreas', b: '北風ボレアスの' }, rarity: 70 },
                { name: { a: 'of Aeolus', b: '風神アイオロスの' }, rarity: 80 },
                { name: { a: 'of Aether', b: '大気の神アイテルの' }, rarity: 90 },
                //azure
            ]
		}],
		
        [BIAS_EARTH, {
            name: { a: 'Earth', b: '大地の' },
            color: colorList.earth,
            lvl: 0,
            rarity: 0,
            melee: { earth: '1d10' },
            missile: { earth: '1d10' },
            staff: { earth: '1d10' },
            shield: { earth: '2d10' },
            armor: { earth: '1d10' },
            cloak: { earth: '1d10' },
            belt: { earth: '1d10' },
            helm: { earth: '1d10' },
            gloves: { earth: '1d10' },
            boots: { earth: '1d10' },
            amulet: { earth: '1d10' },
            ring: { earth: '1d10' },
            light: { earth: '1d10' },
            gem: { earth: '1d10' },
            enemy: { earth: '2d10', con: 1, acBonus: 100 },
            affix: [
                { name: { a: 'of Rock', b: '岩の' }, rarity: 0 },
                { name: { a: 'of Ground', b: '地の' }, rarity: 5 },
                { name: { a: 'of Highland', b: '高原の' }, rarity: 10 },
                { name: { a: 'of Hill', b: '塚の' }, rarity: 15 },
                { name: { a: 'of Mountain', b: '山岳の' }, rarity: 20 },
                { name: { a: 'of Surface', b: '地表の' }, rarity: 25 },
                { name: { a: 'of Terrestrial', b: '地上の' }, rarity: 30 },
                { name: { a: 'of Gnome', b: 'ノームの' }, rarity: 50 },
                { name: { a: 'of Pan', b: '山野の神パンの' }, rarity: 60 },
                { name: { a: 'of Dionysus', b: '陶酔の神デュオニュソスの' }, rarity: 70 },
                { name: { a: 'of Demeter', b: '豊穣の女神デメテルの' }, rarity: 80 },
                { name: { a: 'of Rhea', b: '大地の女神レアの' }, rarity: 85 },
                { name: { a: 'of Gaia', b: '地母神ガイアの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_POISON, {
            name: { a: 'Poison', b: '毒の' },
            color: colorList.poison,
            lvl: 0,
            rarity: 0,
            melee: { dmgPoison: '1d10' },
            missile: { dmgPoison: '1d10' },
            staff: { dmgPoison: '1d10' },
            shield: { poison: '2d10' },
            armor: { poison: '1d10' },
            cloak: { poison: '1d10' },
            belt: { poison: '1d10' },
            helm: { poison: '1d10' },
            gloves: { dmgPoison: '1d10' },
            boots: { poison: '1d10' },
            amulet: { poison: '1d10' },
            ring: { poison: '1d10' },
            light: { poison: '1d10' },
            gem: { poison: '1d10' },
            enemy: { dmgPoison: '1d10', poison: '2d10' },
            affix: [
                { name: { a: 'of Dirtiness', b: '不潔の' }, rarity: 0 },
                { name: { a: 'of Fraud', b: '詐欺の' }, rarity: 5 },
                { name: { a: 'of Malice', b: '悪意の' }, rarity: 10 },
                { name: { a: 'of Hatred', b: '憎悪の' }, rarity: 15 },
                { name: { a: 'of Foulness', b: '悪臭の' }, rarity: 20 },
                { name: { a: 'of Corruption', b: '堕落の' }, rarity: 25 },
                { name: { a: 'of Rot', b: '腐敗の' }, rarity: 30 },
                { name: { a: 'of Toxicity', b: '毒性の' }, rarity: 35 },
                { name: { a: 'of Venom', b: '猛毒の' }, rarity: 40 },
                { name: { a: 'of Filth', b: '不浄の' }, rarity: 45 },
                { name: { a: 'of Arachne', b: '蜘蛛の女王アラクネの' }, rarity: 60 },
                { name: { a: 'of Medusa', b: 'メデューサの' }, rarity: 70 },
                { name: { a: 'of Euryale', b: 'エウリュアレの' }, rarity: 80 },
                { name: { a: 'of Stheno', b: 'ステンノの' }, rarity: 90 },
                //horror
            ]
		}],
		
        [BIAS_LIGHT, {
            name: { a: 'Light', b: '光の' },
            color: colorList.light,
            lvl: 10,
            rarity: 30,
            melee: { dmgFire: '2d10' },
            missile: { dmgFire: '2d10' },
            staff: { skillFire: 1 },
            shield: { fire: '3d5' },
            armor: { fire: '2d5' },
            cloak: { fire: '2d5' },
            belt: { fire: '2d5' },
            helm: { fire: '2d5' },
            gloves: { dmgFire: '2d10' },
            boots: { fire: '2d5' },
            amulet: { skillFire: 1 },
            ring: { skillFire: 1 },
            light: { fire: '2d5', lighten: 1 },
            gem: { fire: '1d5', str: 1 },
            enemy: { fire: '3d5', skillFire: 1, str: 1, atkBlind: '10d2', dmgFire: '2d10' },
            affix: [
                { name: { a: 'of Glow', b: '白熱の' }, rarity: 0 },
                { name: { a: 'of Flash', b: '閃光の' }, rarity: 5 },
                { name: { a: 'of Luminescence', b: '発光の' }, rarity: 10 },
                { name: { a: 'of Brightness', b: '光明の' }, rarity: 15 },
                { name: { a: 'of Shining', b: '光輝の' }, rarity: 20 },
                { name: { a: 'of Holiness', b: '聖なる' }, rarity: 25 },
                { name: { a: 'of Halo', b: '光輪の' }, rarity: 30 },
                { name: { a: 'of Purity', b: '清浄の' }, rarity: 35 },
                { name: { a: 'of Sanctuary', b: '聖域の' }, rarity: 40 },
                { name: { a: 'of Divinity', b: '神性の' }, rarity: 45 },
                { name: { a: 'of Sun', b: '太陽の' }, rarity: 50 },
                { name: { a: 'of Eos', b: '暁の女神エオスの' }, rarity: 60 },
                { name: { a: 'of Phoebe', b: '光明神ボイべの' }, rarity: 70 },
                { name: { a: 'of Hemera', b: '昼の女神ヘメラの' }, rarity: 75 },
                { name: { a: 'of Helios', b: '陽の神エエリオスの' }, rarity: 85 },
                { name: { a: 'of Hyperion', b: '太陽神ヒュペリオンの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_COLD, {
            name: { a: 'Cold', b: '冷気の' },
            color: colorList.cold,
            lvl: 10,
            rarity: 30,
            melee: { atkCold: '10d2' },
            missile: { atkCold: '10d2' },
            staff: { skillWater: 1 },
            shield: { water: '3d5' },
            armor: { water: '2d5' },
            cloak: { water: '2d5' },
            belt: { water: '2d5' },
            helm: { water: '2d5' },
            gloves: { atkCold: '10d2' },
            boots: { water: '2d5' },
            amulet: { skillWater: 1 },
            ring: { skillWater: 1 },
            light: { water: '2d5' },
            gem: { water: '1d5', int: 1 },
            enemy: { water: '3d5', skillWater: 1, int: 1, atkCold: '10d2' },
            affix: [
                { name: { a: 'of Chill', b: '寒気の' }, rarity: 0 },
                { name: { a: 'of Snowflake', b: '雪片の' }, rarity: 5 },
                { name: { a: 'of Frost', b: '霜の' }, rarity: 10 },
                { name: { a: 'of Icicle', b: '氷柱の' }, rarity: 15 },
                { name: { a: 'of Icing', b: '氷結の' }, rarity: 20 },
                { name: { a: 'of Freezing', b: '凍結の' }, rarity: 25 },
                { name: { a: 'of Iceberg', b: '氷山の' }, rarity: 30 },
                { name: { a: 'of Avalanche', b: '雪崩の' }, rarity: 35 },
                { name: { a: 'of Permafrost', b: '永久凍土の' }, rarity: 40 },
                { name: { a: 'of Cocytus', b: 'コキュートスの' }, rarity: 50 },
                { name: { a: 'of Viviane', b: '湖の女王ヴィヴィアンの' }, rarity: 80 },
                { name: { a: 'of Oceanus', b: '海神オケアノスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_LIGHTNING, {
            name: { a: 'Lightning', b: '稲妻の' },
            color: colorList.lightning,
            lvl: 10,
            rarity: 30,
            melee: { dmgLightning: '1d10' },
            missile: { dmgLightning: '1d10' },
            staff: { skillAir: 1 },
            shield: { air: '3d5' },
            armor: { air: '2d5' },
            cloak: { air: '2d5' },
            belt: { air: '2d5' },
            helm: { air: '2d5' },
            gloves: { dmgLightning: '1d10' },
            boots: { air: '2d5' },
            amulet: { skillAir: 1 },
            ring: { skillAir: 1 },
            light: { air: '2d5' },
            gem: { air: '1d5', dex: 1 },
            enemy: { air: '3d5', skillAir: 1, dex: 1, dmgLightning: '1d10' },
            affix: [
                { name: { a: 'of Sky', b: '空の' }, rarity: 0 },
                { name: { a: 'of Electricity', b: '電気の' }, rarity: 5 },
                { name: { a: 'of Charge', b: '帯電の' }, rarity: 10 },
                { name: { a: 'of Discharge', b: '放電の' }, rarity: 15 },
                { name: { a: 'of Spark', b: '煌きの' }, rarity: 20 },
                { name: { a: 'of Potential', b: '電位の' }, rarity: 25 },
                { name: { a: 'of Voltage', b: '電圧の' }, rarity: 30 },
                { name: { a: 'of Power', b: '電力の' }, rarity: 35 },
                { name: { a: 'of Thunder', b: '雷鳴の' }, rarity: 40 },
                { name: { a: 'of Thunderbolt', b: '雷電の' }, rarity: 45 },
                { name: { a: 'of Thunderstroke', b: '雷撃の' }, rarity: 50 },
                { name: { a: 'of Storm', b: '嵐の' }, rarity: 55 },
                { name: { a: 'of Uranus', b: '天の神ウラノスの' }, rarity: 90 },
                { name: { a: 'of Zeus', b: 'オリュンポスの主神ゼウスの' }, rarity: 95 },
            ]
		}],
		
        [BIAS_GRAVITY, {
            name: { a: 'Gravity', b: '重力の' },
            color: colorList.gravity,
            lvl: 10,
            rarity: 30,
            melee: { atkSlow: '10d2' },
            missile: { atkSlow: '10d2' },
            staff: { skillEarth: 1 },
            shield: { earth: '3d5' },
            armor: { earth: '2d5' },
            cloak: { earth: '2d5' },
            belt: { earth: '2d5' },
            helm: { earth: '2d5' },
            gloves: { atkSlow: '10d2' },
            boots: { earth: '2d5' },
            amulet: { skillEarth: 1 },
            ring: { skillEarth: 1 },
            light: { earth: '2d5' },
            gem: { earth: '1d5', con: 1 },
            enemy: { earth: '3d5', skillEarth: 1, con: 1, atkSlow: '10d2' },
            affix: [
                { name: { a: 'of Star', b: '星の' }, rarity: 0 },
                { name: { a: 'of Asteroid', b: '小惑星の' }, rarity: 5 },
                { name: { a: 'of Planet', b: '惑星の' }, rarity: 10 },
                { name: { a: 'of Cosmos', b: '宇宙の' }, rarity: 15 },
                { name: { a: 'of Galaxy', b: '銀河の' }, rarity: 20 },
                { name: { a: 'of Stardust', b: '星屑の' }, rarity: 25 },
                { name: { a: 'of Celestial', b: '天上の' }, rarity: 30 },
                { name: { a: 'of Matter', b: '物質の' }, rarity: 35 }, //
                { name: { a: 'of Mass', b: '大塊の' }, rarity: 40 },
                { name: { a: 'of Astraeus', b: '星神アストライオスの' }, rarity: 70 },
                { name: { a: 'of Selene', b: '月の女神セレネの' }, rarity: 80 },
                { name: { a: 'of Chronos', b: '時の神クロノスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_INFECTION, {
            name: { a: 'Infection', b: '感染の' },
            color: colorList.infection,
            lvl: 10,
            rarity: 30,
            melee: { dmgPoison: '2d10' },
            missile: { dmgPoison: '2d10' },
            staff: { skillPoison: 1 },
            shield: { poison: '3d5' },
            armor: { poison: '2d5' },
            cloak: { poison: '2d5' },
            belt: { poison: '2d5' },
            helm: { poison: '2d5' },
            gloves: { dmgPoison: '2d10' },
            boots: { poison: '2d5' },
            amulet: { skillPoison: 1 },
            ring: { skillPoison: 1 },
            light: { poison: '2d5' },
            gem: { poison: '1d5' },
            enemy: { poison: '3d5', skillPoison: 1, atkInf: '10d2', dmgPoison: '2d10' },
            affix: [
                { name: { a: 'of Disease', b: '疾患の' }, rarity: 0 },
                { name: { a: 'of Bacteria', b: '細菌の' }, rarity: 5 },
                { name: { a: 'of Fungus', b: '真菌の' }, rarity: 10 },
                { name: { a: 'of Virus', b: 'ウイルス性の' }, rarity: 15 },
                { name: { a: 'of Contagion', b: '伝染の' }, rarity: 20 },
                { name: { a: 'of Epidemic', b: '疫病の' }, rarity: 25 },
                { name: { a: 'of Plague', b: '悪疫の' }, rarity: 30 },
                { name: { a: 'of Alecto', b: 'アレクトの' }, rarity: 70 },
                { name: { a: 'of Tisiphone', b: 'ティシポネの' }, rarity: 80 },
                { name: { a: 'of Megaera', b: 'メガイラの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_SAND, {
            name: { a: 'Sand', b: '砂の' },
            color: colorList.sand,
            lvl: 20,
            rarity: 50,
            melee: { earth: '1d10', air: '1d10' },
            missile: { earth: '1d10', air: '1d10' },
            staff: { earth: '1d10', air: '1d10' },
            shield: { earth: '2d10', air: '2d10' },
            armor: { earth: '1d10', air: '1d10' },
            cloak: { earth: '1d10', air: '1d10' },
            belt: { earth: '1d10', air: '1d10' },
            helm: { earth: '1d10', air: '1d10' },
            gloves: { earth: '1d10', air: '1d10' },
            boots: { earth: '1d10', air: '1d10' },
            amulet: { earth: '1d10', air: '1d10' },
            ring: { earth: '1d10', air: '1d10' },
            light: { earth: '1d10', air: '1d10' },
            gem: { earth: '1d5', air: '1d5' },
            enemy: { earth: '2d10', air: '2d10', con: 1, dex: 1, atkBlind: '10d2' },
            affix: [
                { name: { a: 'of Drying', b: '乾燥の' }, rarity: 0 },
                { name: { a: 'of Dust', b: '砂塵の' }, rarity: 5 },
                { name: { a: 'of Barren', b: '不毛の' }, rarity: 10 },
                { name: { a: 'of Desert', b: '砂漠の' }, rarity: 15 },
                { name: { a: 'of Ruin', b: '荒廃の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_BLIZZARD, {
            name: { a: 'Blizzard', b: '吹雪の' },
            color: colorList.blizzard,
            lvl: 20,
            rarity: 50,
            melee: { water: '1d10', air: '1d10' },
            missile: { water: '1d10', air: '1d10' },
            staff: { water: '1d10', air: '1d10' },
            shield: { water: '2d10', air: '2d10' },
            armor: { water: '1d10', air: '1d10' },
            cloak: { water: '1d10', air: '1d10' },
            belt: { water: '1d10', air: '1d10' },
            helm: { water: '1d10', air: '1d10' },
            gloves: { water: '1d10', air: '1d10' },
            boots: { water: '1d10', air: '1d10' },
            amulet: { water: '1d10', air: '1d10' },
            ring: { water: '1d10', air: '1d10' },
            light: { water: '1d10', air: '1d10' },
            gem: { water: '1d5', air: '1d5' },
            enemy: { water: '2d10', air: '2d10', int: 1, dex: 1, atkCold: '10d2' },
            affix: [
                { name: { a: 'of Snow', b: '雪の' }, rarity: 0 },
                { name: { a: 'of Sleet', b: '霙の' }, rarity: 5 },
                { name: { a: 'of Graupel', b: '霰の' }, rarity: 10 },
                { name: { a: 'of Hail', b: '雹の' }, rarity: 15 },
                { name: { a: 'of Glacier', b: '氷河の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_ACID, {
            name: { a: 'Acid', b: '酸の' },
            color: colorList.acid,
            lvl: 20,
            rarity: 50,
            melee: { water: '1d10', poison: '1d10' },
            missile: { water: '1d10', poison: '1d10' },
            staff: { water: '1d10', poison: '1d10' },
            shield: { water: '2d10', poison: '2d10' },
            armor: { water: '1d10', poison: '1d10' },
            cloak: { water: '1d10', poison: '1d10' },
            belt: { water: '1d10', poison: '1d10' },
            helm: { water: '1d10', poison: '1d10' },
            gloves: { water: '1d10', poison: '1d10' },
            boots: { water: '1d10', poison: '1d10' },
            amulet: { water: '1d10', poison: '1d10' },
            ring: { water: '1d10', poison: '1d10' },
            light: { water: '1d10', poison: '1d10' },
            gem: { water: '1d5', poison: '1d5' },
            enemy: { water: '2d10', poison: '2d10', int: 1, dmgAcid: '10d2' },
            affix: [
                { name: { a: 'of Rust', b: '錆の' }, rarity: 30 },
                { name: { a: 'of Melting', b: '溶解の' }, rarity: 5 },
                { name: { a: 'of Dissolving', b: '分解の' }, rarity: 10 },
                { name: { a: 'of Corrosion', b: '腐食の' }, rarity: 15 },
                { name: { a: 'of Erosion', b: '浸食の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_MAGMA, {
            name: { a: 'Magma', b: '溶岩の' },
            color: colorList.magma,
            lvl: 20,
            rarity: 50,
            melee: { fire: '1d10', earth: '1d10' },
            missile: { fire: '1d10', earth: '1d10' },
            staff: { fire: '1d10', earth: '1d10' },
            shield: { fire: '2d10', earth: '2d10' },
            armor: { fire: '1d10', earth: '1d10' },
            cloak: { fire: '1d10', earth: '1d10' },
            belt: { fire: '1d10', earth: '1d10' },
            helm: { fire: '1d10', earth: '1d10' },
            gloves: { fire: '1d10', earth: '1d10' },
            boots: { fire: '1d10', earth: '1d10' },
            amulet: { fire: '1d10', earth: '1d10' },
            ring: { fire: '1d10', earth: '1d10' },
            light: { fire: '1d10', earth: '1d10' },
            gem: { fire: '1d5', earth: '1d5' },
            enemy: { fire: '2d10', earth: '2d10', str: 1, con: 1, dmgFire: '2d10' },
            affix: [
                { name: { a: 'of Smoke', b: '煙の' }, rarity: 0 },
                { name: { a: 'of Ash', b: '灰の' }, rarity: 5 },
                { name: { a: 'of Fissure', b: '亀裂の' }, rarity: 10 },
                { name: { a: 'of Lava', b: '溶岩の' }, rarity: 15 },
                { name: { a: 'of Volcano', b: '火山の' }, rarity: 20 },
                { name: { a: 'of Eruption', b: '噴火の' }, rarity: 25 },
                { name: { a: 'of Mereor', b: '流星の' }, rarity: 35 }, //
            ]
		}],
		
        [BIAS_RADIATION, {
            name: { a: 'Radioactive', b: '放射能の' },
            color: colorList.radiation,
            lvl: 20,
            rarity: 50,
            melee: { fire: '1d10', poison: '1d10' },
            missile: { fire: '1d10', poison: '1d10' },
            staff: { fire: '1d10', poison: '1d10' },
            shield: { fire: '2d10', poison: '2d10' },
            armor: { fire: '1d10', poison: '1d10' },
            cloak: { fire: '1d10', poison: '1d10' },
            belt: { fire: '1d10', poison: '1d10' },
            helm: { fire: '1d10', poison: '1d10' },
            gloves: { fire: '1d10', poison: '1d10' },
            boots: { fire: '1d10', poison: '1d10' },
            amulet: { fire: '1d10', poison: '1d10' },
            ring: { fire: '1d10', poison: '1d10' },
            light: { fire: '1d10', poison: '1d10' },
            gem: { fire: '1d5', poison: '1d5' },
            enemy: { fire: '2d10', poison: '2d10', str: 1, atkRadi: '10d2' },
            affix: [
                { name: { a: 'of Decay', b: '崩壊の' }, rarity: 0 },
                { name: { a: 'of Contamination', b: '汚染の' }, rarity: 5 },
                { name: { a: 'of Nucleus', b: '核の' }, rarity: 10 },
                { name: { a: 'of Fission', b: '分裂の' }, rarity: 15 },
                { name: { a: 'of Fusion', b: '融合の' }, rarity: 20 },
                { name: { a: 'of Catastrophe', b: '大惨事の' }, rarity: 25 },
            ]
        }],
	]),

	suffix: [
        {
            name: { a: 'of Digging', b: '採掘' },
            lvl: 1,
            rarity: 0,
            melee: { digging: 1 }
		},
		
        {
            name: { a: 'of Killer to Animal', b: '動物殺し' },
            lvl: 1,
            rarity: 0,
            melee: { dmgAnimal: 1 },
            missile: { dmgAnimal: 1 },
            gloves: { dmgAnimal: 1 }
		},
		
        {
            name: { a: 'of Killer to Human', b: '人間殺し' },
            lvl: 5,
            rarity: 0,
            melee: { dmgHuman: 1 },
            missile: { dmgHuman: 1 },
            gloves: { dmgHuman: 1 },
            enemy: { dmgHuman: 1 }
		},
		
        {
            name: { a: 'of Killer to Undead', b: '不死殺し' },
            lvl: 10,
            rarity: 0,
            melee: { dmgUndead: 1 },
            missile: { dmgUndead: 1 },
            gloves: { dmgUndead: 1 }
		},
		
        {
            name: { a: 'of Killer to Dragon', b: '竜殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgDragon: 1 },
            missile: { dmgDragon: 1 },
            gloves: { dmgDragon: 1 }
		},
		
        {
            name: { a: 'of Killer to Giant', b: '巨人殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgGiant: 1 },
            missile: { dmgGiant: 1 },
            gloves: { dmgGiant: 1 }
		},
		
        {
            name: { a: 'of Killer to Demon', b: '悪魔殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgDemon: 1 },
            missile: { dmgDemon: 1 },
            gloves: { dmgDemon: 1 }
		},
		
        {
            name: { a: 'of Killer to Spirit', b: '精霊殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgSpirit: 1 },
            missile: { dmgSpirit: 1 },
            gloves: { dmgSpirit: 1 }
		},
		
        {
            name: { a: 'of Multi Color', b: '万色' },
            lvl: 25,
            rarity: 50,
            shield: { fire: '2d3', water: '2d3', air: '2d3', earth: '2d3', poison: '2d3' },
            armor: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            cloak: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            belt: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            helm: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            gloves: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            boots: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            amulet: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            ring: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            light: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            gem: { fire: '1d3', water: '1d3', air: '1d3', earth: '1d3', poison: '1d3' },
            enemy: { fire: '2d3', water: '2d3', air: '2d3', earth: '2d3', poison: '2d3' }
		},
		
        {
            name: { a: 'of All Aound', b: '万能' },
            lvl: 20,
            rarity: 80,
            melee: { skillAll: 1 },
            missile: { skillAll: 1 },
            staff: { skillAll: 1 },
            amulet: { skillAll: 1 },
            ring: { skillAll: 1 },
            enemy: { skillAll: 1 }
		},
		
        {
            name: { a: 'of Strength', b: '筋力' },
            lvl: 1,
            rarity: 0,
            melee: { str: 1 },
            gloves: { str: 1 },
            ring: { str: 1 },
            enemy: { str: 1 }
		},
		
        {
            name: { a: 'of Dexterity', b: '器用さ' },
            lvl: 1,
            rarity: 0,
            missile: { dex: 1 },
            boots: { dex: 1 },
            ring: { dex: 1 },
            enemy: { dex: 1 }
		},
		
        {
            name: { a: 'of Constitution', b: '耐久力' },
            lvl: 1,
            rarity: 0,
            armor: { con: 1 },
            belt: { con: 1 },
            amulet: { con: 1 },
            enemy: { con: 1 }
		},
		
        {
            name: { a: 'of Intelligence', b: '知力' },
            lvl: 1,
            rarity: 0,
            staff: { int: 1 },
            helm: { int: 1 },
            amulet: { int: 1 },
            enemy: { int: 1 }
		},
		
        {
            name: { a: 'of Speed', b: '速度' },
            lvl: 10,
            rarity: 50,
            cloak: { spd: '1d5' },
            boots: { spd: '1d5' },
            ring: { spd: '1d5' },
            amulet: { spd: '1d5' },
            enemy: { spd: '1d5' }
		},
		
        {
            name: { a: 'of Magic Finding', b: '魔法具探求' },
            lvl: 1,
            rarity: 30,
            amulet: { mf: '2d10' },
            ring: { mf: '1d10' },
            gem: { mf: '1d5' },
            enemy: { mf: '2d10' }
		},
		
        {
            name: { a: 'of Gold Finding', b: '財宝探求' },
            lvl: 1,
            rarity: 0,
            amulet: { gf: '2d20' },
            ring: { gf: '1d20' },
            gem: { gf: '1d10' },
            enemy: { gf: '2d20' }
		},
		
        {
            name: { a: 'of Life', b: '生命力' },
            lvl: 1,
            rarity: 0,
            shield: { hp: '1d10' },
            armor: { hp: '2d10' },
            belt: { hp: '1d10' },
            enemy: { hp: '2d5' }
		},
		
        {
            name: { a: 'of Mana', b: '魔力' },
            lvl: 1,
            rarity: 0,
            staff: { mp: '1d10' },
            armor: { mp: '2d10' },
            helm: { mp: '1d10' },
            enemy: { mp: '2d10' }
		},
		
        {
            name: { a: 'of Life Regeneration', b: '回復力' },
            lvl: 10,
            rarity: 50,
            belt: { hpReg: '2d10' },
            amulet: { hpReg: '2d10' },
            ring: { hpReg: '1d10' },
            enemy: { hpReg: '2d10' }
		},
		
        {
            name: { a: 'of Mana Regeneration', b: '魔力回復' },
            lvl: 10,
            rarity: 50,
            belt: { mpReg: '2d10' },
            amulet: { mpReg: '2d10' },
            ring: { mpReg: '1d10' },
            enemy: { mpReg: '2d10' }
		},
		
        {
            name: { a: 'of Attack Speed', b: '攻撃速度' },
            lvl: 10,
            rarity: 20,
            melee: { ias: '5d2' },
            missile: { ias: '5d2' },
            gloves: { ias: '5d2' },
            ring: { ias: '5d2' },
            enemy: { ias: '5d2' }
		},
		
        {
            name: { a: 'of Faster Cast', b: '詠唱速度' },
            lvl: 10,
            rarity: 20,
            staff: { fcr: '5d2' },
            helm: { fcr: '5d2' },
            amulet: { fcr: '5d2' },
            enemy: { fcr: '5d2' }
		},
		
        {
            name: { a: 'of Faster Run Walk', b: '早足' },
            lvl: 10,
            rarity: 20,
            cloak: { spd: '2d4' },
            boots: { frw: '5d4' },
            enemy: { frw: '5d4' }
		},
		
        {
            name: { a: 'of Multiple Hit', b: '倍打' },
            lvl: 20,
            rarity: 40,
            melee: { dmgDiceNum: 1 },
            missile: { dmgDiceNum: 1 },
            staff: { dmgDiceNum: 1 },
            enemy: { dmgDiceNum: 1 }
		},
		
        {
            name: { a: 'of Heavy Hit', b: '強打' },
            lvl: 10,
            rarity: 0,
            melee: { dmgDiceSides: 1 },
            missile: { dmgDiceSides: 1 },
            staff: { dmgDiceSides: 1 },
            enemy: { dmgDiceSides: 1 }
		},
		
        {
            name: { a: 'of Life Steal', b: '生命力吸収' },
            lvl: 10,
            rarity: 20,
            melee: { stealLife: '1d3' },
            missile: { stealLife: '1d3' },
            staff: { stealLife: '1d3' },
            gloves: { stealLife: '1d3' },
            ring: { stealLife: '1d3' },
            enemy: { stealLife: '1d3' }
		},
		
        {
            name: { a: 'of Mana Steal', b: '魔力吸収' },
            lvl: 10,
            rarity: 20,
            melee: { stealMana: '1d3' },
            missile: { stealMana: '1d3' },
            staff: { stealMana: '1d3' },
            gloves: { stealMana: '1d3' },
            ring: { stealMana: '1d3' },
            enemy: { stealMana: '1d3' }
		},
		
        {
            name: { a: 'of Damage', b: 'ダメージ' },
            lvl: 1,
            rarity: 0,
            melee: { dmgBonus: '10d3' },
            missile: { dmgBonus: '10d3' },
            staff: { dmgBonus: '10d3' },
            gloves: { dmgBonus: '10d3' },
            ring: { dmgBonus: '10d3' },
            enemy: { dmgBonus: '10d3' }
		},
		
        {
            name: { a: 'of Accuracy', b: '精度' },
            lvl: 1,
            rarity: 0,
            melee: { rateBonus: '10d3' },
            missile: { rateBonus: '10d3' },
            staff: { rateBonus: '10d3' },
            gloves: { rateBonus: '10d3' },
            ring: { rateBonus: '10d3' },
            enemy: { rateBonus: '10d3' }
		},
		
        {
            name: { a: 'of Protection', b: '守り' },
            lvl: 1,
            rarity: 0,
            shield: { acBonus: '10d3' },
            armor: { acBonus: '10d3' },
            cloak: { acBonus: '10d3' },
            belt: { acBonus: '10d3' },
            helm: { acBonus: '10d3' },
            gloves: { acBonus: '10d3' },
            boots: { acBonus: '10d3' },
            amulet: { acBonus: '10d3' },
            enemy: { acBonus: '10d3' }
		},
		
        {
            name: { a: 'of Experience', b: '経験' },
            lvl: 15,
            rarity: 50,
            amulet: { expBonus: '2d5' },
            ring: { expBonus: '1d5' }
		},
		
        {
            name: { a: 'of Stealth', b: '隠密' },
            lvl: 1,
            rarity: 0,
            cloak: { stealth: '2d10' },
            boots: { stealth: '2d10' },
            amulet: { stealth: '2d10' },
            enemy: { stealth: '2d10' }
		},
		
        {
            name: { a: 'of Detection', b: '探知' },
            lvl: 1,
            rarity: 0,
            helm: { searching: '2d10' },
            gloves: { searching: '2d10' },
            ring: { searching: '1d10' },
            light: { searching: '2d10' },
            enemy: { searching: '2d10' }
		},
		
        {
            name: { a: 'of Slow Digestion', b: '遅消化' },
            lvl: 1,
            rarity: 0,
            armor: { digest: '2d10' },
            belt: { digest: '2d10' },
            amulet: { digest: '2d10' },
            ring: { digest: '1d10' }
		},
		
        {
            name: { a: 'of Illumination', b: 'イルミネーション' },
            lvl: 1,
            rarity: 0,
            light: { lighten: 1 }
		},
		
        {
            name: { a: 'High Capasity', b: '大容量' },
            lvl: 1,
            rarity: 50,
            belt: { numBoxes: 1 },
            light: { durationBonus: 1000 },
		},
		
        {
            name: { a: 'of Sustain Strength', b: '筋力維持' },
            lvl: 1,
            rarity: 0,
            melee: { strSus: true },
            shield: { strSus: true },
            gloves: { strSus: true },
            ring: { strSus: true },
            light: { strSus: true }
		},
		
        {
            name: { a: 'of Sustain Dexterity', b: '器用さ維持' },
            lvl: 1,
            rarity: 0,
            missile: { dexSus: true },
            shield: { dexSus: true },
            boots: { dexSus: true },
            ring: { dexSus: true },
            light: { dexSus: true }
		},
		
        {
            name: { a: 'of Sustain Constitution', b: '耐久力維持' },
            lvl: 1,
            rarity: 0,
            shield: { conSus: true },
            armor: { conSus: true },
            belt: { conSus: true },
            amulet: { conSus: true },
            light: { conSus: true }
		},
		
        {
            name: { a: 'of Sustain Intelligence', b: '知力維持' },
            lvl: 1,
            rarity: 0,
            staff: { intSus: true },
            shield: { intSus: true },
            helm: { intSus: true },
            amulet: { intSus: true },
            light: { intSus: true }
		},
		
        {
            name: { a: 'of Levitation', b: '浮遊' },
            lvl: 1,
            rarity: 80,
            cloak: { levi: true },
            boots: { levi: true },
            amulet: { levi: true },
            ring: { levi: true },
            enemy: { levi: true }
		},
		
        {
            name: { a: 'of Aggravation', b: '憤怒' },
            lvl: 5,
            rarity: 50,
            melee: { aggravating: true, cursed: true },
            missile: { aggravating: true, cursed: true },
            staff: { aggravating: true, cursed: true },
            shield: { aggravating: true, cursed: true },
            armor: { aggravating: true, cursed: true },
            cloak: { aggravating: true, cursed: true },
            belt: { aggravating: true, cursed: true },
            helm: { aggravating: true, cursed: true },
            gloves: { aggravating: true, cursed: true },
            boots: { aggravating: true, cursed: true },
            amulet: { aggravating: true, cursed: true },
            ring: { aggravating: true, cursed: true },
            light: { aggravating: true, cursed: true },
            enemy: { aggravating: true, cursed: true }
		},
		
        {
            name: { a: 'of Teleportation', b: 'テレポート' },
            lvl: 5,
            rarity: 50,
            melee: { teleported: true, cursed: true },
            missile: { teleported: true, cursed: true },
            staff: { teleported: true, cursed: true },
            shield: { teleported: true, cursed: true },
            armor: { teleported: true, cursed: true },
            cloak: { teleported: true, cursed: true },
            belt: { teleported: true, cursed: true },
            helm: { teleported: true, cursed: true },
            gloves: { teleported: true, cursed: true },
            boots: { teleported: true, cursed: true },
            amulet: { teleported: true, cursed: true },
            ring: { teleported: true, cursed: true },
            light: { teleported: true, cursed: true },
            enemy: { teleported: true, cursed: true }
		},
		
        {
            name: { a: 'of Indestructible', b: '破壊不能' },
            lvl: 30,
            rarity: 80,
            indestructible: true,
            melee: { indestructible: true },
            missile: { indestructible: true },
            staff: { indestructible: true },
            shield: { indestructible: true },
            armor: { indestructible: true },
            cloak: { indestructible: true },
            belt: { indestructible: true },
            helm: { indestructible: true },
            gloves: { indestructible: true },
            boots: { indestructible: true },
            amulet: { indestructible: true },
            ring: { indestructible: true },
            light: { indestructible: true },
            enemy: { indestructible: true }
		},
		
        {
            name: { a: 'of Durability', b: '耐久度' },
            lvl: 1,
            rarity: 0,
            melee: { durabBonus: '2d10' },
            missile: { durabBonus: '2d10' },
            staff: { durabBonus: '2d10' },
            shield: { durabBonus: '2d10' },
            armor: { durabBonus: '2d10' },
            cloak: { durabBonus: '2d10' },
            belt: { durabBonus: '2d10' },
            helm: { durabBonus: '2d10' },
            gloves: { durabBonus: '2d10' },
            boots: { durabBonus: '2d10' },
            amulet: { durabBonus: '2d10' },
            ring: { durabBonus: '2d10' },
            light: { durabBonus: '2d10' }
        },
    ]
};

{
    if (MAX_BIAS_NUMS < modTab.prefix.size) throw new Error('Incorrect bias numbers');
    for (let biasList of modTab.prefix.values()) {
        for (let key in biasList.affix) {
            let affix = biasList.affix[key];
            let rarity = affix.rarity;
            let lvl = Math.floor(rarity / 2 - 20);
            if (lvl <= 0) lvl = 1;
            affix.lvl = lvl;
            affix.min = rarity >= 50 ? Math.ceil((rarity - 50) / 10) + 2 : 1;
        }
    }
}

const modBiasNums = enums(1, MAX_BIAS_NUMS);
const modSufNums = enums(0, modTab.suffix.length - 1);
const modAffNumsMap = (() => {
    let nums = new Map();
    for (let [bias, pre] of modTab.prefix.entries()) {
		nums.set(bias, enums(0, pre.affix.length - 1));
	}

    return nums;
})();

const Material = class extends Thing {
    constructor(obj) {
        super(obj);
        this.symbolReal = this.symbol;
        if (this.color) this.colorReal = this.color;
        this.shadow = 0;
        this.shadowReal = 0;
        this.stroke = 0;
        this.strokeReal = 0;
    }

    investigate(direction, char) {
        if (char && this.mimic && !this.identified) return;
        inventory.shadow(direction);
        let i = 1;
        if (direction === RIGHT) i += (IN_WIDTH / 2);
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.textAlign = 'center';
        if (this.shadow) {
			ctxInv.shadowColor = this.shadow;
		}

        ctxInv.fillStyle = this.color;
        display.text({
            ctx: ctxInv,
            msg: this.symbol,
            x: i,
            y: j,
            stroke: this.stroke,
        });

        if (this.cursed) ctxInv.fillStyle = colorList.red;
        ctxInv.fillStyle = this.equipable && !this.durab ? colorList.gray : colorList.white;
        ctxInv.textAlign = 'left';
        let name = char ? this.getName(false, true) : this.getName(false, 1);
        display.text({
            ctx: ctxInv,
            msg: name,
            x: i + 0.6,
            y: j,
            limit: 17.5,
            stroke: this.stroke,
        });

        j += 1;
        ctxInv.fillStyle = colorList.white;
        ctxInv.shadowColor = colorList.clear;
        if (this.desc) {
            this.desc[option.getLanguage()].replace(/\t/g, '').split('\n').forEach((value, key) => {
                display.text({
                    ctx: ctxInv,
                    msg: key % 2 ? '   ' + value : value,
                    x: i - 0.5,
                    y: j++,
                });
            });
        } else if (this.nameSkill) {
            let msg = rogue.getSkillInfo(skillMap.get(this.nameSkill), this.skillLvl, true);
            display.text({
                ctx: ctxInv,
                msg: msg,
                x: i - 0.5,
                y: j++,
                limit: 23,
            });
        } else {
			j++;
		}

        if (!char) { //
            let weight = option.isEnglish() ? 'weight' : '重量';
            display.text({
                ctx: ctxInv,
                msg: `${weight} ${this.weight}kg`,
                x: i - 0.5,
                y: j++,
            });
        } else {
            let [lvl, expGain, exp, expNext, totalWeight] = option.isEnglish() ?
                ['Level', 'Exp Gain', 'Exp', 'Exp Next', 'Total Weight'] :
                ['レベル', '取得経験値', '経験値', '次経験値', '総重量'];
            display.text({
                ctx: ctxInv,
                msg: `${lvl} ${this.lvl} (${this.lvlMax}), ${exp} ${this.exp} (${this.expMax}), ${expNext} ${this.expNext}, ${expGain} ${this.expGain}, ${totalWeight} ${this.totalWeight}kg (${this.weightLimit}kg)`,
                x: i - 0.5,
                y: j,
                limit: IN_WIDTH,
            });

            j += 2;
		}
		
        j++;
        ctxInv.restore();
        if (!this.equipable && !this.type == 'gem' && !char) return;
        let count = 0;
        let msgLimit = 8;
        let valueLimit = 5;
        let mod;
        for (let [key, term] of investigationMap.entries()) {
            if (!term) {
                if (key === 'mod' && !char) {
                    i += IN_WIDTH / 4;
                    j = MS + 5;
                    mod = true;
				}
				
                continue;
			}
			
            if (!char && (!term.item && !this[key] || this[key] === undefined) ||
                char && !term.char) {
				continue;
			}

            ctxInv.save();
            let fsChar;
            if (char) {
                fsChar = display.fs - 3;
                let fontStyle = FONT_STYLE[option.getLanguage()];
                ctxInv.font = fsChar - 1 + 'px ' + fontStyle;
            }
        
            let msg = term.name[option.getLanguage()];
            let value = this[key];
            if (term.plus && !char && this[key] > 0) value = '+' + value;
            if (term.perc) value += '%';
            if (key === 'atkType') {
                value = this.getAtkTypeName();
			} else if (char) {
				if (this.findBuffStat(key) || this.modList && this.modList[key]) {
					ctxInv.shadowColor = colorList.buff;
				}

                if (term.max) {
                    let max = this[term.max];
                    if (term.perc) max += '%';
                    value += ` (${max})`;
                }
            } else if (mod) {
				ctxInv.shadowColor = colorList.buff;
			}

            if (term.bool) {
                if (this[key]) {
                    value = option.isEnglish() ? 'yes' : '有り';
				} else {
					value = option.isEnglish() ? 'no' : '無し';
				}
			}
			
            if (key === 'material') {
				value = materialMap.get(this[key]).name[option.getLanguage()];
			}

            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: value,
                x: i - 1 + IN_WIDTH / 4,
                y: j,
                limit: valueLimit,
                fs: fsChar,
            });

            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: msg,
                x: i - 0.5,
                y: j++,
                limit: msgLimit,
                fs: fsChar,
            });

            if (key === 'embeddedNum' && this[key]) {
                for (let k = 0, l = this.embeddedList.length; k < l; k++) {
                    this.embeddedList[k].__proto__ = Item.prototype;
                    let name = this.embeddedList[k].getName();
                    display.text({
                        ctx: ctxInv,
                        msg: name,
                        x: i + 0.5,
                        y: j++,
                        limit: msgLimit,
                    });
                }
			}
			
            if (char && !(++count % /*18*/ 21)) {
                i += IN_WIDTH / 4;
                j = MS + 4 + 2;
			}
			
            ctxInv.restore();
		}
    }

    getAtkTypeName() {
        let value = '';
        if (this.atkType & AT_S) value += option.isEnglish() ? 'Slash' : '斬';
        if (this.atkType & AT_T) {
            if (value) value += '・'
            value += option.isEnglish() ? 'Thrust' : '突';
		}
		
        if (this.atkType & AT_B) {
            if (value) value += '・'
            value += option.isEnglish() ? 'Blunt' : '打';
		}
		
        return value;
    }

    getVolumeBase() {
        let value;
        switch (this.type) {
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

    getBaseandWeight() {
        let char = this.type === 'enemy';
        let volume = this.getVolumeBase() * this.volumeRate;
        this.weight = Math.ceil(volume * this.density * 100) / 100;
        let durabRate = 1;
        if (this.weapon || char) {
            let num = 1 + Math.floor(this.volumeRate);
            let sides = 3 + this.hardness / 10;
            if (this.twoHanded) num++;
            if (this.curved) {
                sides++;
                durabRate *= 3 / 4;
			}
			
            if (this.edge === 1) {
                sides++;
                durabRate /= 2;
            } else if (this.edge === 2) {
				durabRate *= 3 / 4;
			}

            if (this.atkType === AT_B) durabRate *= 5 / 4;
            if (this.type === 'staff') sides /= 2;
            this.dmgBase = num + 'd' + Math.ceil(sides);
		}
		
        if (this.armor || char) {
            if (!this.acTRate) this.acTRate = 1;
            this.acSBase = Math.ceil(volume * this.hardness);
            this.acTBase = Math.ceil(volume * (this.hardness + this.toughness) / 2 * this.acTRate);
            this.acBBase = Math.ceil(volume * this.toughness);
		}
		
        if (!char) {
            let durab = this.durabBonus + DURAB_BASE + this.weight * DURAB_RATE;
            this.durabMax = this.durab = Math.ceil(durab * durabRate);
        }
    }

    getMaterialBase() {
        let i = 0;
        materialList.shuffle();
        while (!(this.material & materialList[i])) i++;
        return materialList[i];
    }

    getMaterial(gem, matBase, matId) {
        let lvl = this.lvl;
        if (!matBase) matBase = gem ? M_GEM : this.getMaterialBase();
        this.material = matBase;
        let materials = materialMap.get(matBase);
        let list = materials.list;
        let mat;
        if (!(matId >= 0)) {
            let nums = materials.nums;
            nums.shuffle();
            let i = 0;
            do { 
                mat = list.get(nums[i++]);
            } while (mat.lvl > lvl || evalPercentage(mat.rarity))
		} else {
            mat = list.get(matId);
        }
		
        this.density = mat.density;
        this.hardness = mat.hardness;
        this.toughness = mat.toughness;
        this.priceRate = mat.priceRate;
        if (mat.values) {
            mergeMod({
                obj: this,
                obj2: mat.values,
                perc: 0,
                max: 1,
                min: 1,
            });
		}
		
        let [nameA, nameB] = [mat.name['a'], mat.name['b']];
        if (matBase === M_GEM) this.bias = mat.bias;
        if (gem) {
            this.name['a'] = this.nameReal['a'] = nameA;
            this.name['b'] = this.nameReal['b'] = nameB;
        } else if (this.mod !== UNIQUE) {
            if (this.type === 'enemy') {
                this.name['a'] = nameA + ' ' + this.name['a'];
                this.name['b'] = nameB + 'の' + this.name['b'];
            } else {
                this.nameReal['a'] = nameA + ' ' + this.nameReal['a'];
                this.nameReal['b'] = nameB + 'の' + this.nameReal['b'];
            }
		}
		
        this.color = this.colorReal = mat.color;
    }

    getMagic(bias) {
        let lvl = this.lvl;
        let char = this.type === 'enemy';
        let pre, suf;
        if (bias !== RANDOM) {
            pre = modTab.prefix.get(bias);
		} else if (coinToss()) {
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++];
                pre = modTab.prefix.get(bias);
            } while (!pre[this.type] || pre.lvl > lvl ||
				evalPercentage(pre.rarity)
			);
		}
		
        if (!pre || coinToss()) {
            let i = 0;
            modSufNums.shuffle();
            do {
                suf = modTab.suffix[modSufNums[i++]];
            } while (!suf[this.type] || suf.lvl > lvl ||
                evalPercentage(suf.rarity) ||
				suf.indestructible && char && evalPercentage(99)
			);
		}
		
        let perc = Math.ceil(lvl + MAGIC_RARITY);
        let max = Math.floor(lvl / 10) + 1;
        let color;
        let namePreA = '';
        let namePreB = '';
        let mods = {};
        if (pre) {
            mergeMod({
                obj: mods,
                obj2: pre[this.type],
                perc: perc + BIAS_BONUS,
                max: max,
			});
			
            namePreA = pre.name['a'] + ' ';
            namePreB = pre.name['b'];
            color = pre.color;
		}
		
        let nameSufA = '';
        let nameSufB = '';
        if (suf) {
            mergeMod({
                obj: mods,
                obj2: suf[this.type],
                perc: perc,
                max: max,
			});
			
            nameSufA = ' ' + suf.name['a'];
            nameSufB = ` "${suf.name['b']}"`;
		}
		
        if (char) {
            if (color) this.color = color;
            this.name['a'] = `${namePreA}${this.name['a']}${nameSufA}`;
            this.name['b'] = `${namePreB}${this.name['b']}${nameSufB}`;
            this.getOrLooseStats(mods, true, true);
            if (pre) this.getBias(bias);
        } else {
            if (color) this.colorMod = color;
            this.nameReal['a'] = `${namePreA}${this.nameReal['a']}${nameSufA}`;
            this.nameReal['b'] = `${namePreB}${this.nameReal['b']}${nameSufB}`;
            mergeMod({
                obj: this,
                obj2: mods,
                fixed: true,
            });
		}
		
        this.modList = mods;
        this.mod = MAGIC;
        this.shadow = this.shadowReal = colorList.aqua;
    }

    getRare(bias) {
        let lvl = this.lvl;
        let char = this.type === 'enemy';
        let pre;
        if (bias === RANDOM) {
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++];
                pre = modTab.prefix.get(bias);
            } while (!pre[this.type] || pre.lvl > lvl ||
				evalPercentage(pre.rarity)
			);
        } else {
			pre = modTab.prefix.get(bias);
		}

        let affix;
        let j = 0;
        let affNums = modAffNumsMap.get(bias);
        affNums.shuffle();
        do {
            affix = pre.affix[affNums[j++]];
		} while (affix.lvl > lvl || evalPercentage(affix.rarity));
		
        let perc = Math.ceil(lvl + affix.rarity);
        let max = Math.floor(lvl / 10) + 1;
        let min = affix.min;
        if (min > max) min = max;
        let mods = {};
        mergeMod({
            obj: mods,
            obj2: pre[this.type],
            perc: perc + BIAS_BONUS,
            max: max,
		});
		
        let suf;
        let i = 0;
        let count = 0;
        let perc2 = perc;
        modSufNums.shuffle();
        do {
            suf = modTab.suffix[modSufNums[i++]];
            if (suf[this.type] && suf.lvl <= lvl &&
                !evalPercentage(suf.rarity) &&
                !(suf.indestructible && char && evalPercentage(99))) {
                mergeMod({
                    obj: mods,
                    obj2: suf[this.type],
                    perc: perc,
                    max: max,
                    min: min,
				});
				
                if (++count >= RARE_MOD_NUM) {
                    if (count >= min || !evalPercentage(perc2)) {
                        break;
					} else {
						perc2 /= 2;
					}
                }
            }
		} while (modSufNums[i] !== undefined);
		
        this.mod = RARE;
        this.shadow = this.shadowReal = colorList.yellow;
        let nameAffiA = affix.name['a'];
        let nameAffiB = affix.name['b'];
        if (char) {
            if (affix.color) this.color = affix.color;
            this.name['a'] = `${this.name['a']} ${nameAffiA}`;
            this.name['b'] = `${nameAffiB}${this.name['b']}`;
            this.getOrLooseStats(mods, true, true);
            this.getBias(bias);
        } else {
            if (affix.color) this.colorMod = affix.color;
            this.nameReal['a'] = `${this.nameReal['a']} ${nameAffiA}`;
            this.nameReal['b'] = `${nameAffiB}${this.nameReal['b']}`;
            mergeMod({
                obj: this,
                obj2: mods,
                fixed: true,
            });
		}
		
        this.modList = mods;
    }

    getUnique(unique) {
        this.shadow = this.shadowReal = colorList.gold;
        this.stroke = this.strokeReal = colorList.indigo;
        if (this.type === 'enemy') {
            rogue.cue[this.name[ENG]] = true;
            this.hpRate += 3;
            this.mpRate += 3;
            this.mpReg += 100;
        } else {
            mergeMod({
                obj: this,
                obj2: unique.values,
                fixed: true,
			});
			
            [this.nameReal['a'], this.nameReal['b']] = this.getUniqueName(unique.name, true);
            this.mod = UNIQUE;
        }
    }

    getUniqueName(names, save) {
        let [nameA, nameB] = [names['a'], names['b']];
        if (save) this.nameUnique = { a: nameA, b: nameB, pre: names.pre };
        let [namePreB, nameSufB] = names.pre ? [nameB, ''] : ['', nameB];
        if (namePreB) namePreB += 'の'
        nameA = `${this.nameReal['a']} of ${nameA}`;
        nameB = `${namePreB}${this.nameReal['b']}${nameSufB}`;
        return [nameA, nameB];
    }
}

const mergeMod = ({
    obj,
    obj2,
    perc,
    max,
    min,
    fixed,
}) => {
    let count = 0;
    for (let key in obj2) {
        let mod = obj2[key];
        let value = 0;
        if (fixed || mod === true || mod === DEFAULT) {
            value = mod;
		} else {
            if (!count) {
                count++;
                while (count < min || count < max && evalPercentage(perc)) {
                    count++;
                    perc /= 2;
                }
			}
			
            for (let i = 0; i < count; i++) {
				value += isFinite(mod) ? mod : dice.roll(mod);
			}
		}
		
        obj[key] ? obj[key] += value : obj[key] = value;
	}
	
    if (obj.numBoxes && obj.numBoxes >= MAX_BOX_NUM) obj.numBoxes = MAX_BOX_NUM - 1;
}
