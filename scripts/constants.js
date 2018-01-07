'use strict';
const generateNumber = function*(i, j, bit) {
    while (i <= j) yield bit ? 1 << i++ : i++;
}

const enums = (i, j) => [...generateNumber(i, j)];
const enumsBit = (i, j) => [...generateNumber(i, j, true)];
const VERSION = 0.003;
const MS = 2; //message space
const SS = 3; //stats space
const IN_WIDTH = 47; //canvas.width/fs-1;
const IN_HEIGHT = 24; //canvas.height/fs-SS;
const WIDTH = IN_WIDTH * 2;
const HEIGHT = IN_HEIGHT * 2;
const CAVE_NUM_ROW = 4;
const CAVE_NUM_COL = 5;
const CAVE_NUM_MAX = CAVE_NUM_COL * CAVE_NUM_ROW;
const CAVE_HEIGHT_MAX = Math.floor((HEIGHT - (CAVE_NUM_ROW - 1)) / CAVE_NUM_ROW);
const CAVE_WIDTH_MAX = Math.floor((WIDTH - (CAVE_NUM_COL - 1)) / CAVE_NUM_COL);
const CAVE_WIDTH_MIN = 4;
const CAVE_HEIGHT_MIN = 4;
const BUILD_NUM_ROW = 2;
const BUILD_NUM_COL = 4;
const BUILD_NUM_MAX = BUILD_NUM_COL * BUILD_NUM_ROW;
const BUILD_WIDTH = Math.floor(((IN_WIDTH - 1) / 2 - 2 - BUILD_NUM_COL) / (BUILD_NUM_COL / 2));
const BUILD_HEIGHT = Math.floor(((IN_HEIGHT - 1) / 2 - 2 - BUILD_NUM_ROW) / (BUILD_NUM_ROW / 2));
const MIN_TRAP_NUM = 8;
const MAX_TRAP_NUM = 10;
const MIN_STAIRS_NUM = 4;
const MAX_STAIRS_NUM = 6;
const MAX_PACK_COUNT = 20;
const MAX_STASH_COUNT = MAX_PACK_COUNT * 4;
const MAX_STASH_PAGE = MAX_STASH_COUNT / MAX_PACK_COUNT;
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
const FOV_SQ = FOV ** 2;
const HEARING_SQ = 20 ** 2;
const MIN_TELE_RAD_SQ = 15 ** 2;
const SENSING_SQ = IN_HEIGHT ** 2;
const MAX_MSG_LEN = 5;
const MAX_MSG_LIST_LEN = 1000;
const ENG = 'a';
const DEFAULT = -1;
const ROGUE = -1;
const RANDOM = -1;
const [
    P_PACK,
    P_BOX,
    P_FLOOR,
    P_EQUIPMENT,
    P_STASH,
    P_SHOP,
    P_CUBE,
] = enums(2, 8); //place

const [
    AROUND,
    LOCATION,
    LIST,
    AWAY,
    INIT,
] = enums(1, 5);

const [NORMAL,
    MAGIC,
    RARE,
    UNIQUE,
] = enums(0, 3);

const [
    UPPER,
    ELITE,
] = enums(1, 2);

const [
    FIGHTER,
    ITEM,
    TRAP,
    STAIRCASE,
    ENTER,
] = enums(1, 5);

const [
    PREFIX,
    SUFFIX,
] = enums(0, 1);

const [
    CLOSE,
    OPEN,
] = enums(1, 2);

const [
    STR,
    DEX,
    CON,
    INT,
    EXP,
] = enums(0, 4);

const [
    HUMAN,
    ANIMAL,
    DEMON,
    UNDEAD,
    DRAGON,
    GIANT,
    SPIRIT,
] = enumsBit(1, 6);

const [
    AT_S,
    AT_T,
    AT_B,
] = enumsBit(1, 3); //attack type, slash, thrust, blunt

const [
    LEFT,
    DOWN,
    UP,
    RIGHT,
    UPLEFT,
    DOWNLEFT,
    UPRIGHT,
    DOWNRIGHT,
    MIDDLE,
] = enums(0, 8);

const DR = [ //direction
    { x: -1, y: 0, id: LEFT },
    { x: 0, y: 1, id: DOWN },
    { x: 0, y: -1, id: UP },
    { x: 1, y: 0, id: RIGHT },
    { x: -1, y: -1, id: UPLEFT },
    { x: -1, y: 1, id: DOWNLEFT },
    { x: 1, y: -1, id: UPRIGHT },
    { x: 1, y: 1, id: DOWNRIGHT },
];

const EA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //english alphabet 26
const BP = { //body parts 
    a: 'main',
    b: 'off',
    c: 'neck',
    d: 'R-ring',
    e: 'L-ring',
    f: 'light',
    g: 'body',
    h: 'back',
    i: 'waist',
    j: 'head',
    k: 'hands',
    l: 'feet',
};

const BPJ = {
    main: 'メイン',
    off: 'オフ',
    neck: '首',
    'R-ring': '右指輪',
    'L-ring': '左指輪',
    light: '光源',
    body: '体',
    back: '背中',
    waist: '腰',
    head: '頭',
    hands: '手',
    feet: '足',
};

const ITJ = {
    book: '書',
    food: '食料',
    potion: '薬',
    scroll: '巻物',
    wand: '棒',
    melee: '近接武器',
    missile: '遠隔武器',
    staff: '杖',
    shield: '盾',
    armor: '鎧',
    cloak: '外衣',
    belt: 'ベルト',
    helm: '兜',
    gloves: '手袋',
    boots: '靴',
    light: '光源',
    oil: '油',
    amulet: '首飾り',
    ring: '指輪',
    ammo: '弾薬',
    gem: 'ジェム',
    coin: 'コイン',
    misc: '雑多品',
    water: '水',
    recipe: 'レシピ',
    'Charge Book': '充填書',
    corpse: '死体',
};

const ENJ = {
    fire: '火',
    water: '水',
    air: '風',
    earth: '土',
    poison: '毒',
    light: '光',
    cold: '氷',
    lightning: '電',
    gravity: '重力',
    infection: '感染',
    blizzard: '吹雪',
    sand: '砂',
    acid: '酸',
    magma: '溶岩',
    radiation: '放射線',
    atom: '原子',
    physical: '物理',
};

const WEIGHT = { 
    ring: 0.1,
    amulet: 0.2,
    book: 1.0,
    potion: 0.2,
    scroll: 0.1,
    wand: 0.5,
    gem: 0.1,
    coin: 0.1,
    food: 0.3,
    material: 0.2,
};

const PRICE = {
    book: 100,
    food: 50,
    potion: 25,
    scroll: 25,
    wand: 300,
    melee: 100,
    missile: 100,
    staff: 100,
    shield: 50,
    armor: 100,
    cloak: 50,
    belt: 50,
    helm: 50,
    gloves: 50,
    boots: 50,
    ring: 100,
    amulet: 150,
    light: 50,
    gem: 400,
    oil: 30,
    ammo: 1,
    material: 200,
};

const RARITY = {
    book: 70,
    food: 50,
    potion: 0,
    scroll: 0,
    wand: 50,
    melee: 0,
    missile: 20,
    staff: 20,
    shield: 50,
    armor: 50,
    cloak: 50,
    belt: 50,
    helm: 50,
    gloves: 50,
    boots: 50,
    light: 50,
    ring: 80,
    amulet: 80,
    oil: 50,
    ammo: 50,
    coin: 0,
    gem: 90,
};

const equipmentList = ['melee', 'missile', 'staff', 'shield', 'armor', 'cloak', 'belt',
    'helm', 'gloves', 'boots', 'light', 'ring', 'amulet'];
const DURAB_BASE = 20;
const DURAB_RATE = 10;
const DURAB_PRICE = 10;
const WAND_PRICE = 0.2; //per charge
const COST_REGULAR = 10;
const COLD_DELAY = 10;
const WAIT_TIME = 0;
const MSG_SPEED = 3000;
const BREATH_RATE = 1 / 10;
const NEST_BOOST = 5;
const MAGIC_RARITY = 50;
const BIAS_BONUS = 50;
const HP_RATE = 6;
const MP_RATE = 3;
const WALL_HP = 100;
const POSITION = {
    stash: { x: 22, y: 18 },
    start: { x: 22, y: 11 },
    hell: { x: 40, y: 11 },
};

const CL = { //command list
    h: { a: 'move left', b: '左移動' },
    j: { a: 'move down', b: '下移動' },
    k: { a: 'move up', b: '上移動' },
    l: { a: 'move right', b: '右移動' },
    y: { a: 'move upleft', b: '左上移動' },
    b: { a: 'move downleft', b: '左下移動' },
    u: { a: 'move upright', b: '右上移動' },
    n: { a: 'move downright', b: '右下移動' },
    i: { a: 'inventory list', b: '持物一覧' },
    e: { a: 'equipment list', b: '装備一覧' },
    w: { a: 'wear or wield', b: '装備する' },
    T: { a: 'take off or unwield', b: '装備を外す' },
    g: { a: 'grab item', b: 'アイテムを拾う' },
    d: { a: 'drop item', b: 'アイテムを落とす' },
    o: { a: 'open door', b: 'ドアを開ける' },
    c: { a: 'close door', b: 'ドアを閉める' },
    s: { a: 'search', b: '捜索する' },
    r: { a: 'read scroll', b: '巻物を読む' },
    q: { a: 'quaff potion', b: '薬を飲む' },
    z: { a: 'zap wand', b: '棒を振る' },
    p: { a: 'pack item', b: 'アイテムを詰める' },
    E: { a: 'eat food', b: '食事する' },
    Q: { a: 'quit', b: 'ゲームを放棄する' },
    Esc: { a: 'cancel command', b: '取り消す' },
    x: { a: 'examine things', b: '探査する' },
    a: { a: 'add bookmark', b: 'しおりを挟む' },
    G: { a: 'gain stat/skill', b: 'スキル/能力値を得る' },
    f: { a: 'fire', b: '射る' },
    t: { a: 'throw item', b: 'アイテムを投げる' },
    S: { a: 'swap gear', b: '装備を持ち替える' },
    C: { a: 'character description', b: 'キャラ詳細' },
    F: { a: 'fuel', b: '補給する' },
    R: { a: 'Rest', b: '休む' },
    A: { a: 'alchemy', b: '錬金術' },
    '1-9': { a: 'use item', b: 'アイテムを使う' },
    'm,F1-F12': { a: 'use skill', b: 'スキルを使う' },
    'Alt+dir': { a: 'attack stationary/dig', b: 'その場で攻撃する/掘る' },
    'Shift+dir': { a: 'dash', b: '走る' },
    '.': { a: 'stap on', b: '踏む' },
    '>': { a: 'down stairs', b: '階段を降りる' },
    '<': { a: 'up stairs', b: '階段を昇る' },
    '=': { a: 'option', b: 'オプション' },
    'Ctrl+p': { a: 'previous message', b: 'メッセージ履歴' },
    'Ctrl+r': { a: 'redraw', b: '再描写' },
    'Ctrl+m': { a: 'mute', b: '消音' },
    'Ctrl+s': { a: 'save', b: '記録する' },
    'Ctrl+d': { a: 'destroy item', b: 'アイテムを破壊する' },
    'Ctrl+x': { a: 'save and exit', b: '記録して終了する' },
    'Ctrl+v': { a: 'game version', b: 'ゲームのバージョン' },
};

const CLW = { //wizard
    'Ctrl+e': { a: '*enlightenment*', b: '*啓蒙*' },
    'Ctrl+z': { a: '*indestructible*', b: '*破壊不能*' },
    'Ctrl+q': { a: '*create trap*', b: '*罠を生成する*' },
    'Ctrl+a': { a: '*create monster*', b: '*モンスターを生成する*' },
    'Ctrl+i': { a: '*create item*', b: '*アイテムを生成する*' },
};

//color
const CLEAR = 'transparent',
    SHADOW = '#848484',
    SHADOW2 = '#333333',
    BLACK = 'black',
    DARKOLIVEGREEN = 'darkolivegreen',
    FIREBRICK = 'firebrick',
    TURQUOISE = 'turquoise',
    //potion
    RED = 'red',
    YELLOW = 'yellow',
    WHITE = 'white',
    SKY_BLUE = '#0099FF',
    AQUA = 'aqua',
    BLUE = 'blue',
    PURPLE = 'purple',
    GREEN = 'green',
    BROWN = 'brown',
    GRAY = 'gray',
    PINK = 'pink',
    SILVER = 'silver',
    GOLD = 'gold',
    INDIGO = 'indigo',
    ORANGE = 'orange',
    VIOLET = 'violet',
    CRIMSON = 'crimson',
    LIME = 'lime',
    LIGHTGREEN = 'lightgreen',
    CORAL = 'coral',
    YELLOWGREEN = 'yellowgreen',
    OLIVE = 'olive',
    AZURE = 'azure',
    BLUEVIOLET = 'blueviolet',
    DARKVIOLET = 'darkviolet',
    DARKRED = 'darkred',
    LIGHTBLUE = 'lightblue',
    DEEPPINK = 'deeppink',
    LIGHTGREY = 'lightgrey',
    DARKGRAY = 'darkgray',
    DARKGREEN = 'darkgreen',
    ORANGERED = 'orangered',
    LAVENDER = 'lavender',
    LIGHTYELLOW = 'lightyellow',
    CYAN = 'cyan',
    NAVY = 'navy',
    PALEGREEN = 'palegreen',
    SCARLET = '#d3381c',
    ROYALBLUE = '#4169e1',
    AQUAMARINE = 'aquamarine',
    SANDYBROWN = 'sandybrown',
    LIGHTSEAGREEN = 'lightseagreen',
    LIMEGREEN = 'limegreen',
    DEEPSKYBLUE = 'deepskyblue',
    DARKORANGE = 'darkorange',
    //material
    //skin
    C_FLAX = '#d6c6af',
    C_BEIGE = '#eedcb3',
    C_BEIGE_GRAY = '#b4ada9',
    C_GOLDEN_YELLOW = '#f6ae54',
    C_FOX = '#c38743',
    C_TEAL = '#008080',
    //metal
    BRONZE = '#7A592F',
    BRASS = '#b5a642',
    STEEL = '#6C676E',
    TIN = '#9ea1a3',
    C_COPPER = '#b87333',
    C_IRON = '#cbcdcd',
    C_PLATINUM = '#e5e4e2',
    C_TITANIUM = '#B6AFA9',
    C_ZINC = '#bac4c8',
    C_CADMIUM = '#fff600',
    C_CHROME = '#e3dedb',
    C_ALUMINIUM = '#848789',
    C_CARBON = '#252626',
    C_MAGNESIUM = '#E9EEEB',
    C_COBALT = '#0068b7',
    C_NICKEL = '#b5b6b5',
    //wood
    C_MAHOGANY = '#6b3f31',
    C_ROSEWOOD = '#65000b',
    C_EBONY = '#242E35',
    C_ASH = '#efe5d1',
    C_WALNUT = '#443028',
    C_CYPRESS = '#bcad8c',
    C_OAK = '#806517',
    C_BEECH = '#c5c993',
    C_TEAK = '#AE8F60';
const C_FIRE = RED,
    C_WATER = AQUAMARINE,
    C_AIR = TURQUOISE,
    C_EARTH = BROWN,
    C_POISON = GREEN,
    C_LIGHT = WHITE,
    C_COLD = BLUE,
    C_LIGHTNING = YELLOW,
    C_GRAVITY = SHADOW,
    C_INFECTION = DARKOLIVEGREEN,
    C_SAND = SANDYBROWN,
    C_BLIZZARD = VIOLET,
    C_ACID = OLIVE,
    C_MAGMA = FIREBRICK,
    C_RADIATION = DARKORANGE,
    C_ATOM = SHADOW2,
    C_BUFF = SKY_BLUE;
const colorTab = [ //potion
    { name: { a: 'Blue', b: '青色' }, color: BLUE },
    { name: { a: 'Red', b: '赤色' }, color: RED },
    { name: { a: 'Green', b: '緑色' }, color: GREEN },
    { name: { a: 'Gray', b: '灰色' }, color: GRAY },
    { name: { a: 'Brown', b: '茶色' }, color: BROWN },
    { name: { a: 'Pink', b: '桃色' }, color: PINK },
    { name: { a: 'White', b: '白色' }, color: WHITE },
    { name: { a: 'Purple', b: '紫色' }, color: PURPLE },
    { name: { a: 'Yellow', b: '黄色' }, color: YELLOW },
    { name: { a: 'Orange', b: '橙色' }, color: ORANGE },
    { name: { a: 'Silver', b: '銀色' }, color: SILVER },
    { name: { a: 'Gold', b: '金色' }, color: GOLD },
    { name: { a: 'Violet', b: 'すみれ色' }, color: VIOLET },
    { name: { a: 'Sky blue', b: '空色' }, color: SKY_BLUE },
    { name: { a: 'Aqua', b: '水色' }, color: AQUA },
    { name: { a: 'Indigo', b: '藍色' }, color: INDIGO },
    { name: { a: 'Crimson', b: '紅色' }, color: CRIMSON },
    { name: { a: 'Lime', b: 'ライム色' }, color: LIME },
    { name: { a: 'Lightgreen', b: '淡緑色' }, color: LIGHTGREEN },
    { name: { a: 'Coral', b: '珊瑚色' }, color: CORAL },
    { name: { a: 'Yellowgreen', b: '黃緑色' }, color: YELLOWGREEN },
    { name: { a: 'Deeppink', b: '深桃色' }, color: DEEPPINK },
    { name: { a: 'Olive', b: 'オリーブ色' }, color: OLIVE },
    { name: { a: 'Azure', b: '紺碧色' }, color: AZURE },
    { name: { a: 'Blueviolet', b: '青紫色' }, color: BLUEVIOLET },
    { name: { a: 'Darkviolet', b: '暗紫色' }, color: DARKVIOLET },
    { name: { a: 'Darkred', b: '暗赤色' }, color: DARKRED },
    { name: { a: 'Lightblue', b: '淡青色' }, color: LIGHTBLUE },
    { name: { a: 'Lightgrey', b: '薄灰色' }, color: LIGHTGREY },
    { name: { a: 'Darkgray', b: '濃灰色' }, color: DARKGRAY },
    { name: { a: 'Darkgreen', b: '暗緑色' }, color: DARKGREEN },
    { name: { a: 'Orangered', b: '橙赤色' }, color: ORANGERED },
    { name: { a: 'Lavender', b: '藤色' }, color: LAVENDER },
    { name: { a: 'Cyan', b: '青緑色' }, color: CYAN },
    { name: { a: 'Lightyellow', b: '淡黄色' }, color: LIGHTYELLOW },
    { name: { a: 'Navy', b: '紺色' }, color: NAVY },
    { name: { a: 'Palegreen', b: '薄緑色' }, color: PALEGREEN },
    { name: { a: 'Scarlet', b: '緋色' }, color: SCARLET },
    { name: { a: 'Royalblue', b: '藤紫色' }, color: ROYALBLUE },
    { name: { a: 'Aquamarine', b: '淡青緑色' }, color: AQUAMARINE },
    { name: { a: 'Sandybrown', b: '砂茶色' }, color: SANDYBROWN },
    { name: { a: 'Lightseagreen', b: '淡海緑色' }, color: LIGHTSEAGREEN },
    { name: { a: 'Limegreen', b: 'ライムグリーン色' }, color: LIMEGREEN },
    { name: { a: 'Deepskyblue', b: '深空色' }, color: DEEPSKYBLUE },
    { name: { a: 'Darkorange', b: '暗橙色' }, color: DARKORANGE },
];

const PORTAL = 0,
    STASH = 1,
    GAMBLE = 9,
    CURE = 10,
    BLACKSMITH = 11;
const enter = [
    { 
        id: 0,
        name: { a: 'Portal', b: 'ポータル' },
        symbol: '＊',
        color: WHITE,
        stroke: SKY_BLUE,
        portal: true,
    },

    {
        id: 1,
        name: { a: 'Stash', b: '物置箱' },
        symbol: '&',
        color: BROWN,
        page: 1,
        stash: true,
    },

    {
        id: 2,
        name: { a: 'Book Shop', b: '魔法書店' },
        symbol: '?',
        color: GRAY,
        shop: true,
        type: { 'book': 10 },
    },

    { 
        id: 3,
        name: { a: 'General Shop', b: '雑貨屋' },
        symbol: ':',
        color: BROWN,
        shop: true,
        type: { 'food': 2, 'light': 6, 'oil': 2, },
    },

    {
        id: 4,
        name: { a: 'Potion Shop', b: '薬屋' },
        symbol: '!',
        color: BLUE,
        shop: true,
        type: { 'potion': 15 },
    },

    {
        id: 5,
        name: { a: 'Scroll Shop', b: '巻物店' },
        symbol: '?',
        color: WHITE,
        shop: true,
        type: { 'scroll': 15 },
    },

    {
        id: 6,
        name: { a: 'Wand Shop', b: '魔法棒店' },
        symbol: '-',
        color: WHITE,
        shop: true,
        type: { 'wand': 10 },
    },

    { 
        id: 7,
        name: { a: 'Weapon Shop', b: '武器屋' },
        symbol: '|',
        color: WHITE,
        shop: true,
        equipment: true,
        type: { 'melee': 8, 'missile': 3, 'staff': 2, 'ammo': 6 },
    },

    {
        id: 8,
        name: { a: 'Armor Shop', b: '防具屋' },
        symbol: '[',
        color: GRAY,
        shop: true,
        equipment: true,
        type: { 'shield': 2, 'armor': 3, 'cloak': 2, 'belt': 2, 'helm': 2, 'gloves': 2, 'boots': 2 },
    },

    {
        id: 9,
        name: { a: 'Gamble Shop', b: 'ギャンブル店' },
        symbol: '$',
        color: YELLOW,
        gamble: true,
        shop: true,
    },

    {
        id: 10,
        name: { a: 'Cure Shop', b: '治療店' },
        symbol: '+',
        color: LIME,
        cure: true,
        list: {
            a: { a: 'recover completely', b: '全快する', cost: 400 },
            b: { a: 'restore health and mana', b: '体力と魔力を回復する', cost: 100 },
            c: { a: 'restore stats', b: '能力値を元に戻す', cost: 100 },
            d: { a: 'restore condition', b: '状態異常を元に戻す', cost: 100 },
            e: { a: 'have a meal', b: '食事をとる', cost: 100 }
        }
    },

    {
        id: 11,
        name: { a: 'Blacksmith Shop', b: '鍛冶屋' },
        symbol: '/',
        color: GRAY,
        blacksmith: true,
    },
];

const textLen = {
    list: {
        full: '満腹',
        hungry: '空腹',
        starved: '飢餓',
        poisoned: '毒',
        confused: '混乱',
        paralyzed: '麻痺',
        sleeping: '睡眠',
        blinded: '盲目',
        infected: '感染',
        hallucinated: '幻覚',
        canceled: '封印',
        'see invisible': '透視',
        invisible: '透明',
        ecco: 'エコー',
        'enchant self': '自己強化',
        'venom hands': '猛毒の手',
        'confusing hands': '混乱の手',
    },

    init() {
        let ctxStats = display.ctxes.stats;
        for (let key in this.list) {
            this[key] = {};
            this[key].a = ctxStats.measureText(key).width + display.fs;
            this[key].b = ctxStats.measureText(this.list[key]).width + display.fs;
        }
    },
};

const difficulty = {
    init() {
        this.inferno = this.purgatorio = this.paradiso = false;
    }
};

const flag = {
    died: true,
    wait: false,
    regular: false,
    arrow: false,
    scroll: false,
    openDoor: false,
    closeDoor: false,
    retry: false,
    inventory: false,
    drop: false,
    destroy: false,
    equip: false,
    unequip: false,
    equipmentList: false,
    eat: false,
    quaff: false,
    read: false,
    synthesize: false,
    grab: false,
    zap: false,
    aim: false,
    investigate: false,
    message: false,
    identify: false,
    repair: false,
    help: false,
    create: false,
    dash: false,
    pack: false,
    number: false,
    clearInv: false,
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
    throw: false,
};

const modBonusMap = new Map([
    [MAGIC, { fire: 10, water: 10, air: 10, earth: 10, poison: 10, }],
    [RARE, { fire: 30, water: 30, air: 30, earth: 30, poison: 30, }],
    [UNIQUE, { fire: 50, water: 50, air: 50, earth: 50, poison: 75, }],
]);

const FONT_STYLE = {
    a: 'sans serif',
    b: "'Yu Gothic', 'Hiragino Kaku Gothic Pro', 'Hiragino Kaku Gothic ProN', 'TakaoExGothic', 'Meiryo', 'MS PGothic', sans-serif",
};

let rogue;
