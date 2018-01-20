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
