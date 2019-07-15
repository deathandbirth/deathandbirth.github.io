'use strict';
const generateNumber = function*(i, j, bit) {
    while (i <= j) yield bit ? 1 << i++ : i++;
}

const enums = (i, j) => [...generateNumber(i, j)];
const enumsBit = (i, j) => [...generateNumber(i, j, true)];
const VERSION = 0.010;
const DEBUG = window.location.href.split('/').pop().indexOf('debug') === 0;
const IN_WIDTH = 45;
const IN_HEIGHT = 25;
const BUF_SIZE = 2;
const WIDTH = IN_WIDTH * BUF_SIZE;
const HEIGHT = IN_HEIGHT * BUF_SIZE;
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
const BUILD_WIDTH = Math.floor(((IN_WIDTH) / 2 - 2 - BUILD_NUM_COL) / (BUILD_NUM_COL / 2));
const BUILD_HEIGHT = Math.floor(((IN_HEIGHT) / 2 - 2 - BUILD_NUM_ROW) / (BUILD_NUM_ROW / 2));
const MIN_TRAP_NUM = 8;
const MAX_TRAP_NUM = 10;
const MIN_STAIRS_NUM = 4;
const MAX_STAIRS_NUM = 6;
const MAX_PACK_COUNT = 20;
const MAX_STASH_COUNT = MAX_PACK_COUNT * 10;
const MAX_STASH_PAGE = MAX_STASH_COUNT / MAX_PACK_COUNT;
const MAX_CUBE_COUNT = 4;
const MAX_HUNGER = 2000;
const HUNGER_POTION = 10;
const MAX_EQUIPMENT_NUM = 12;
const MAX_ASSIGN_NUM = 13;
const MAX_FIGHTER_LVL = 99;
const MAX_STAT_LVL = 100;
const MAX_SKILL_NUM = 20;
const MAX_SKILL_LVL = 20;
const MAX_SEARCH_RANGE = 10;
const MAX_PF_LOOP = 10000;
const MAX_BOX_NUM = 9;
const INIT_BOX_NUM = 4;
const MAX_EMBEDDED_NUM = 6;
const MAX_CHARGE_NUM = 100;
const RARE_MOD_NUM = 2;
const ENEMY_NUM_INIT = 10;
const SPAWN_FREQ = 100;
const ITEM_NUM_INIT = 10;
const CURSE_PERC = 5;
const FOV = 15;
const FOV_SQ = FOV ** 2;
const HEARING_SQ = 20 ** 2;
const MIN_TELE_RAD_SQ = 15 ** 2;
const SENSING_SQ = IN_HEIGHT ** 2;
const MAX_MSG_LEN = 5;
const MAX_MSG_LIST_LEN = 1000;
const MINIMAP_MIN_RATIO = .5;
const MAX_WEIGHT_LIMIT = 100;
const LETTER_ENG = 'a';
const DEFAULT = -1;
const ID_ROGUE = -1;
const RANDOM = -1;
const DURAB_BASE = 20;
const DURAB_RATE = 10;
const DURAB_PRICE = 10;
const WAND_CHARGE_PRICE_RATE = 0.2;
const COST_REGULAR = 1000;
const WAIT_TIME = 0;
const MSG_SPEED = 3000;
const BREATH_RATE = 1 / 10;
const NEST_BOOST = 5;
const MAGIC_RARITY = 50;
const HP_BASE_RATE = 20;
const MP_BASE_RATE = 3;
const WALL_HP = 100;
const FONT_STYLE = 'Arial, sans serif';
const [
    PLACE_PACK,
    PLACE_BOX,
    PLACE_FLOOR,
    PLACE_EQUIPMENT,
    PLACE_STASH,
    PLACE_SHOP,
    PLACE_CUBE,
] = enums(2, 8);

const [
    POS_LOCATION,
    POS_LIST,
    POS_AWAY,
    POS_INIT,
] = enums(1, 4);

const [
    MOD_NORMAL,
    MOD_MAGIC,
    MOD_RARE,
    MOD_UNIQUE,
] = enums(0, 3);

const [
    GRADE_NORMAL,
    GRADE_UPPER,
    GRADE_ELITE,
] = enums(0, 2);

const [
    STAT_STR,
    STAT_DEX,
    STAT_CON,
    STAT_INT,
    STAT_EXP,
] = enums(0, 4);

const [
    RACE_HUMAN,
    RACE_ANIMAL,
    RACE_DEMON,
    RACE_UNDEAD,
    RACE_DRAGON,
    RACE_GIANT,
    RACE_SPIRIT,
    RACE_GOD,
] = enumsBit(1, 8);

const [
    AT_SLASH,
    AT_THRUST, 
    AT_BLUNT,
] = enumsBit(1, 3);

const [
    DR_LEFT,
    DR_DOWN,
    DR_UP,
    DR_RIGHT,
    DR_UPLEFT,
    DR_DOWNLEFT,
    DR_UPRIGHT,
    DR_DOWNRIGHT,
    DR_MIDDLE,
] = enums(0, 8);

const [
    SYMBOL_FIGHTER,
    SYMBOL_ITEM,
    SYMBOL_BLANK,
    SYMBOL_ENTER,
    SYMBOL_TRAP,
    SYMBOL_DOOR,
    SYMBOL_WALL,
    SYMBOL_STAIRS,
    SYMBOL_FLOOR,
] = enums(1, 9);

const eaList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const drList = [
    { x: -1, y: 0, id: DR_LEFT },
    { x: 0, y: 1, id: DR_DOWN },
    { x: 0, y: -1, id: DR_UP },
    { x: 1, y: 0, id: DR_RIGHT },
    { x: -1, y: -1, id: DR_UPLEFT },
    { x: -1, y: 1, id: DR_DOWNLEFT },
    { x: 1, y: -1, id: DR_UPRIGHT },
    { x: 1, y: 1, id: DR_DOWNRIGHT },
];

const bpList = {
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

const equipmentTypeList = [
    'melee',
    'missile',
    'staff',
    'shield',
    'armor',
    'cloak',
    'belt',
    'helm',
    'gloves',
    'boots',
    'light',
    'ring',
    'amulet'
];

const weightList = { 
    ring: 0.1,
    amulet: 0.2,
    book: 1.0,
    potion: 0.2,
    scroll: 0.1,
    recipe: 0.1,
    wand: 0.5,
    gem: 0.1,
    orb: 0.1,
    coin: 0.1,
    food: 0.3,
    material: 0.2,
};

const priceList = {
    book: 100,
    food: 50,
    potion: 25,
    scroll: 25,
    recipe: 25,
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
    orb: 350,
    oil: 30,
    ammo: 1,
    material: 200,
};

const rarityList = {
    book: 70,
    food: 50,
    potion: 0,
    scroll: 0,
    recipe: 50,
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
    ring: 70,
    amulet: 70,
    oil: 50,
    ammo: 50,
    coin: 70,
    gem: 80,
    orb: 80,
};

const positionFixedList = {
    stash: { x: 22, y: 18 },
    start: { x: 22, y: 12 },
    hell: { x: 40, y: 12 },
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
    title: false,
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
    assign: false,
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
    character: false,
    failed: false,
};

const atVarMap = new Map([
    [AT_SLASH, 30],
    [AT_THRUST, 80],
    [AT_BLUNT, 10],
]);

const modBonusMap = new Map([
    [MOD_MAGIC, { fire: 10, water: 10, air: 10, earth: 10, poison: 10 }],
    [MOD_RARE, { fire: 20, water: 20, air: 20, earth: 20, poison: 20 }],
    [MOD_UNIQUE, { fire: 30, water: 30, air: 30, earth: 30, poison: 30, hpRate: HP_BASE_RATE, mpRate: MP_BASE_RATE, mpReg: 100 }],
]);

let rogue;
let vue;
