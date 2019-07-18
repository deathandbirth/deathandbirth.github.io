﻿(function() {
'use strict';
const generateNumber = (i, j, bit) => {
    let nums = [];
    while (i <= j) nums.push(bit ? 1 << i++ : i++);
    return nums;
}

const enums = (i, j) => generateNumber(i, j);
const enumsBit = (i, j) => generateNumber(i, j, true);
const VERSION = 0.100;
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
const colorList = {
    clear: 'transparent',
    shadow: '#848484',
    shadow2: '#333333',
    black: 'black',
    darkolivegreen: 'darkolivegreen',
    firebrick: 'firebrick',
    turquoise: 'turquoise',

    //potion
    red: 'red',
    yellow: 'yellow',
    white: 'white',
    skyblue: '#0099FF',
    aqua: 'aqua',
    blue: 'blue',
    purple: 'purple',
    green: 'green',
    brown: 'brown',
    gray: 'gray',
    pink: 'pink',
    silver: 'silver',
    gold: 'gold',
    indigo: 'indigo',
    orange: 'orange',
    violet: 'violet',
    crimson: 'crimson',
    lime: 'lime',
    lightgreen: 'lightgreen',
    coral: 'coral',
    yellowgreen: 'yellowgreen',
    olive: 'olive',
    azure: 'azure',
    blueviolet: 'blueviolet',
    darkviolet: 'darkviolet',
    darkred: 'darkred',
    lightblue: 'lightblue',
    deeppink: 'deeppink',
    lightgrey: 'lightgrey',
    darkgrey: 'darkgray',
    darkgreen: 'darkgreen',
    orangered: 'orangered',
    lavender: 'lavender',
    lightyellow: 'lightyellow',
    cyan: 'cyan',
    navy: 'navy',
    palegreen: 'palegreen',
    scarlet: '#d3381c',
    royalblue: '#4169e1',
    aquamarine: 'aquamarine',
    sandybrown: 'sandybrown',
    lightseagreen: 'lightseagreen',
    limegreen: 'limegreen',
    deepskyblue: 'deepskyblue',
    darkorange: 'darkorange',

    //cloth
    linen: '#faf0e6',

    //skin
    flax: '#d6c6af',
    beige: '#eedcb3',
    beigegray: '#b4ada9',
    goldenyellow: '#f6ae54',
    fox: '#c38743',
    teal: '#008080',

    //metal
    bronze: '#7A592F',
    brass: '#b5a642',
    steel: '#6C676E',
    tin: '#9ea1a3',
    copper: '#b87333',
    iron: '#cbcdcd',
    platinum: '#e5e4e2',
    titanium: '#B6AFA9',
    zinc: '#bac4c8',
    cadmium: '#fff600',
    chrome: '#e3dedb',
    aluminium: '#848789',
    carbon: '#252626',
    magnesium: '#E9EEEB',
    cobalt: '#0068b7',
    nickel: '#b5b6b5',
    
    //wood
    mahogany: '#6b3f31',
    rosewood: '#65000b',
    ebony: '#242E35',
    ash: '#efe5d1',
    walnut: '#443028',
    cypress: '#bcad8c',
    oak: '#806517',
    beech: '#c5c993',
    teak: '#AE8F60',

    //element
    fire: 'red',
    water: 'aquamarine',
    air: 'turquoise',
    earth: 'brown',
    poison: 'green',
    light: 'white',
    cold: 'blue',
    lightning: 'yellow',
    gravity: '#848484',
    infection: 'darkolivegreen',
    sand: 'sandybrown',
    blizzard: 'violet',
    acid: 'olive',
    magma: 'firebrick',
    radiation: 'darkorange',
    atom: '#333333',
    physical: 'gray',

    buff: '#0099FF',
};

const colorTab = [ //potion
    { name: { a: 'Blue', b: '青色' }, color: colorList.blue },
    { name: { a: 'Red', b: '赤色' }, color: colorList.red },
    { name: { a: 'Green', b: '緑色' }, color: colorList.green },
    { name: { a: 'Gray', b: '灰色' }, color: colorList.gray },
    { name: { a: 'Brown', b: '茶色' }, color: colorList.brown },
    { name: { a: 'Pink', b: '桃色' }, color: colorList.pink },
    { name: { a: 'White', b: '白色' }, color: colorList.white },
    { name: { a: 'Purple', b: '紫色' }, color: colorList.purple },
    { name: { a: 'Yellow', b: '黄色' }, color: colorList.yellow },
    { name: { a: 'Orange', b: '橙色' }, color: colorList.orange },
    { name: { a: 'Silver', b: '銀色' }, color: colorList.silver },
    { name: { a: 'Gold', b: '金色' }, color: colorList.gold },
    { name: { a: 'Violet', b: 'すみれ色' }, color: colorList.violet },
    { name: { a: 'Sky blue', b: '空色' }, color: colorList.skyblue },
    { name: { a: 'Aqua', b: '水色' }, color: colorList.aqua },
    { name: { a: 'Indigo', b: '藍色' }, color: colorList.indigo },
    { name: { a: 'Crimson', b: '紅色' }, color: colorList.crimson },
    { name: { a: 'Lime', b: 'ライム色' }, color: colorList.lime },
    { name: { a: 'Lightgreen', b: '淡緑色' }, color: colorList.lightgreen },
    { name: { a: 'Coral', b: '珊瑚色' }, color: colorList.coral },
    { name: { a: 'Yellowgreen', b: '黃緑色' }, color: colorList.yellowgreen },
    { name: { a: 'Deeppink', b: '深桃色' }, color: colorList.deeppink },
    { name: { a: 'Olive', b: 'オリーブ色' }, color: colorList.olive },
    { name: { a: 'Azure', b: '紺碧色' }, color: colorList.azure },
    { name: { a: 'Blueviolet', b: '青紫色' }, color: colorList.blueviolet },
    { name: { a: 'Darkviolet', b: '暗紫色' }, color: colorList.darkviolet },
    { name: { a: 'Darkred', b: '暗赤色' }, color: colorList.darkred },
    { name: { a: 'Lightblue', b: '淡青色' }, color: colorList.lightblue },
    { name: { a: 'Lightgrey', b: '薄灰色' }, color: colorList.lightgrey },
    { name: { a: 'Darkgray', b: '濃灰色' }, color: colorList.darkgrey },
    { name: { a: 'Darkgreen', b: '暗緑色' }, color: colorList.darkgreen },
    { name: { a: 'Orangered', b: '橙赤色' }, color: colorList.orangered },
    { name: { a: 'Lavender', b: '藤色' }, color: colorList.lavender },
    { name: { a: 'Cyan', b: '青緑色' }, color: colorList.cyan },
    { name: { a: 'Lightyellow', b: '淡黄色' }, color: colorList.lightyellow },
    { name: { a: 'Navy', b: '紺色' }, color: colorList.navy },
    { name: { a: 'Palegreen', b: '薄緑色' }, color: colorList.palegreen },
    { name: { a: 'Scarlet', b: '緋色' }, color: colorList.scarlet },
    { name: { a: 'Royalblue', b: '藤紫色' }, color: colorList.royalblue },
    { name: { a: 'Aquamarine', b: '淡青緑色' }, color: colorList.aquamarine },
    { name: { a: 'Sandybrown', b: '砂茶色' }, color: colorList.sandybrown },
    { name: { a: 'Lightseagreen', b: '淡海緑色' }, color: colorList.lightseagreen },
    { name: { a: 'Limegreen', b: 'ライムグリーン色' }, color: colorList.limegreen },
    { name: { a: 'Deepskyblue', b: '深空色' }, color: colorList.deepskyblue },
    { name: { a: 'Darkorange', b: '暗橙色' }, color: colorList.darkorange },
];
const display = {
    init() {
        this.canvases = {};
        this.ctxes = {};
        let canvases = [];
        let canvasNames = ['ground', 'object', 'shadow', 'cursor'];
        for (let name of canvasNames) {
            let canvas = document.createElement('canvas');
            canvas.id = 'canvas-' + name;
            canvases.push(canvas);
        }

        canvases.push(vue.$refs.canvasMain);
        for (let canvas of canvases) {
            let id = canvas.id.replace('canvas-', '');
            this.canvases[id] = canvas;
            this.ctxes[id] = canvas.getContext('2d');
        }

        let fs = 18;
        this.fs = fs;
        this.setSize();
        for (let key in this.ctxes) {
            let ctx = this.ctxes[key];
            if (key === 'shadow') {
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = colorList.black;
            } else if (key === 'ground' || key === 'object' || key === 'cursor') {
                ctx.textBaseline = 'middle';
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillStyle = colorList.white;
                ctx.font = fs + 'px ' + FONT_STYLE;
                ctx.textAlign = 'center';
                if (key === 'cursor') ctx.strokeStyle = colorList.yellow;
            }
        }
    },

    setSize(resize) {
        for (let key in this.canvases) {
            if (resize && key !== 'main') continue;
            let cvs = this.canvases[key];
            let width, height;
            if (key === 'ground' || key === 'object' || key === 'shadow' || key === 'cursor') {
                this.widthBuf = width = WIDTH * this.fs;
                this.heightBuf = height = HEIGHT * this.fs;
            } else if (key === 'main') {
                let rect = vue.$refs.canvasContainer.getBoundingClientRect();
                this.width = width = rect.width;
                this.height = height = rect.height;
            }

            cvs.setAttribute('width', width);
            cvs.setAttribute('height', height);
        }
    },

    text({
        ctx,
        msg,
        x = 0,
        y = 0,
        xPx = 0,
        yPx = 0,
        stroke,
        fs = this.fs,
    }) {
        x += .5;
        y += .5;
        let args = [msg, x * fs + xPx, y * fs + yPx];
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.strokeText(...args);
        }

        ctx.fillText(...args);
    },

    rect({
        ctx,
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        xPx = 0,
        yPx = 0,
        widthPx = 0,
        heightPx = 0,
        stroke,
        clear,
        fs = this.fs,
    }) {
        let args = [x * fs + xPx, y * fs + yPx, width * fs + widthPx, height * fs + heightPx];
        if (stroke) {
            ctx.strokeRect(...args);    
        } else if (clear) {
            ctx.clearRect(...args);
        } else {
            ctx.fillRect(...args);
        }
    },

    image({
        ctx,
        img,
        sx = 0,
        sxPx = 0,
        sy = 0,
        syPx = 0,
        sWidthPx = 0,
        sHeightPx = 0,
        dxPx = 0, 
        dyPx = 0,
        dWidthPx = 0,
        dHeightPx = 0,
    }) {
        let fs = this.fs;
        ctx.drawImage(img, sx * fs + sxPx, sy * fs + syPx, sWidthPx, sHeightPx, dxPx, dyPx, dWidthPx, dHeightPx);
    },

    clearOne(ctx) {
        let canvas = ctx.canvas;
        this.rect({
            ctx: ctx,
            widthPx: canvas.width,
            heightPx: canvas.height,
            clear: true,
        });
    },

    clearAll() {
        message.clearFixed();
        for (let i in this.ctxes) this.clearOne(this.ctxes[i]);
    },
};

{
    let timer;
    window.addEventListener('resize', function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            display.setSize(true);
            if (!rogue) return;
            let x, y, examine, minimap;
            if (flag.examine) {
                x = cursor.cX = cursor.x;
                y = cursor.cY = cursor.y;
                examine = true;
            } else if (flag.minimap) {
                minimap = true;
            } else {
                [x, y] = [rogue.x, rogue.y];
            }

            map.draw(x, y, examine, minimap);
        }, 200);
    });
}
const option = {
    list: {
        a: { a: 'Language', b: '言語' , key:'language'},
        b: { a: 'Shadow', b: '影', key:'shadow'},
        c: { a: 'Mute', b: '消音', key:'mute'},
        d: { a: 'BGM', b: 'BGM', key:'BGM'},
        e: { a: 'SE', b: '効果音', key:'SE'},
        f: { a: 'Autosave', b: '自動記録', key:'autosave'},
        g: { a: 'Auto-destroy', b: '自動破壊', key:'auto-destroy'},
        h: { a: 'Auto-charge', b: '自動充填', key:'auto-charge'},
        i: { a: 'Auto-identify', b: '自動識別', key:'auto-identify'},
        j: { a: 'Rogue Style Movement', b: 'ローグ型移動', key:'rogueStyleMove'}
    },

    shadow: { defaults: true },
    mute: { defaults: false },
    autosave: { defaults: true },
    'auto-destroy': { defaults: false },
    'auto-charge': { defaults: true },
    'auto-identify': { defaults: true },
    BGM: { defaults: 'k', select: {} },
    SE: { defaults: 'k', select: {} },
    rogueStyleMove: { defaults: true },
    language: { 
        defaults: 'b',
        select: { 
            a: { a: 'English', b: '英語' },
            b: { a: 'Japanese', b: '日本語' }
        }
    },

    main(key) {
        let list = !flag.option2 ? this.list : this[this.name].select;
        let a = getAlphabet(key);
        if (!a) return;
        a = a.toLowerCase();
        if (!list[a]) return;
        if (!flag.option2) this.name = this.list[a]['key'];
        if (this.name === 'language' || this.name === 'BGM' || this.name === 'SE') {
            if (!flag.option2) {
                this.choose(a);
                return;
            } else if (a === this[this.name].user) {
                return;
            } else if (this.name === 'language') {
                this[this.name].user = a;
                vue.isEnglish = this.isEnglish();
            } else if (this.name === 'BGM' || this.name === 'SE') {
                this[this.name].user = a;
                let vol = eaList.indexOf(a.toLowerCase()) / 10;
                if (this.name === 'BGM') {
                    audio.volBGM = vol
                    audio.music[audio.curTrack].volume = vol;
                } else {
                    audio.volSE = vol;
                }
            }

            flag.option2 = false;
        } else if (this.name === 'shadow') {
            this[this.name].user = !this[this.name].user;
            map.redraw();
        } else if (this.name === 'mute') {
            audio.mute();
        } else if (this.name === 'autosave' || this.name === 'auto-identify' ||
            this.name === 'auto-destroy' || this.name === 'auto-charge' ||
            this.name === 'rogueStyleMove') {
            this[this.name].user = !this[this.name].user;
        }

        inventory.clear();
        inventory.show({
            list: this.list,
            dr: DR_RIGHT,
        });
        
        message.draw(message.get(M_OPTION), true);
    },

    choose(a) {
        inventory.clear();
        inventory.show({
            list: this.list,
            dr: DR_RIGHT,
            a: a,
        });

        flag.option2 = true;
        inventory.show({
            list: this[this.name].select,
            dr: DR_LEFT
        });

        message.draw(message.get(M_OPTION), true);
    },
    
    isEnglish() {
        return this.language.user === LETTER_ENG;
    },

    getLanguage() {
        return this.language.user;
    }
};

{
    for (let key in option.list) {
        let key2 = option.list[key]['key'];
        option[key2].user = option[key2].defaults;
        if (key2 === 'BGM' || key2 === 'SE') {
            for (let i = 0; i <= 10; i++) {
                option[key2].select[eaList[i]] = { a: i, b: i };
            }
        }
    }
}
Object.defineProperty(Array.prototype, 'swap', {
    value(i, j) {
        [this[i], this[j]] = [this[j], this[i]];
    },
});

Object.defineProperty(Array.prototype, 'shuffle', {
    value() {
        let i = this.length;
        while (i-- > 1) {
            let j = rndInt(i);
            this.swap(i, j);
        }
    },
});

const copyObj = (obj, obj2) => {
    for (let key in obj2) {
        let value = obj2[key];
        obj[key] = (typeof value === 'object') && value ? JSON.parse(JSON.stringify(value)) : value;
    }
}

const numberPadding = (num, digit, zero) => {
    if (!num) num = 0;
    let padding = '';
    for (let i = 0; i < digit; i++) padding += zero ? '0' : '*';
    return (padding + num).slice(-digit);
}

const lightenProb = () => !evalPercentage((rogue.cdl - 1) * 5);
const searchProb = () => evalPercentage(10 + rogue.searching);
const calcLevel = x => (x - 1) ** 4 + 10 * (x - 1);

const initTab = () => {
    getRndName.init();
    for (let key in itemTab) {
        if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe' && key !== 'orb') continue;
        for (let item of itemTab[key].values()) {
            item.identified = false;
            if (key !== 'orb') getRndName[key](item);
        }
    }
}

const initFlag = () => {
    for (let key in flag) {
        flag[key] = key === 'regular';
    }
}

const getRndName = {
    init() {
        this.countP = this.countW = 0;
        colorTab.shuffle();
        mineralTab.shuffle();
    },

    potion(item) {
        item.color = colorTab[this.countP].color;
        let name = colorTab[this.countP++].name;
        item.name['a'] = name['a'];
        item.name['b'] = name['b'];
    },

    wand(item) {
        item.color = mineralTab[this.countW].color;
        let name = mineralTab[this.countW++].name;
        item.name['a'] = name['a'];
        item.name['b'] = name['b'];
    },

    recipe(item) {
        this.word(item);
    },

    scroll(item) {
        this.word(item);
    },

    word(item) {
        let msg = '';
        let l = eaList.length;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                msg += eaList[rndInt(l - 1)];
            }

            if (i !== 2) msg += ' ';
        }

        item.name['a'] = item.name['b'] = `'${msg}'`;
    }
}

const minMax = {
    getBase(base, varRate) {
        let value = base * varRate / 100;
        let min = Math.ceil(base - value);
        let max = Math.floor(base + value);
        return min + '-' + max;
    },

    getNums(base, leftBonus = 0, rightBonus = 0, dice) {
        let left = '';
        let right = '';
        let i = 0;
        do {
            left += base.charAt(i++);
        } while (isFinite(base.charAt(i)));

        while (base.charAt(++i) !== '') {
            right += base.charAt(i);
        }

        left = Number(left) + leftBonus;
        right = Number(right) + rightBonus;
        if (!dice && left >= right) right = left + 1;
        return [left, right];
    },

    getAvg() {
        let [min, max] = this.getNums(...arguments);
        return Math.ceil((min + max) / 2);
    },

    roll() {
        let [min, max] = this.getNums(...arguments);
        return rndIntBet(min, max);
    },

    dice(base) {
        let [num, sides] = this.getNums(base, 0, 0, true);
        let value = 0;
        if (sides === 1) {
            value = num;
        } else {
            for (let i = 0; i < num; i++) {
                value += rndIntBet(1, sides);
            }
        }

        return value;
    },
};

const distanceSq = (x1, y1, x0, y0) => {
    let offsetX = 0;
    let offsetY = 0;
    if (x0 !== x1) offsetX = x0 < x1 ? -0.5 : 0.5;
    if (y0 !== y1) offsetY = y0 < y1 ? -0.5 : 0.5;
    return (x1 + offsetX - x0) ** 2 + (y1 + offsetY - y0) ** 2;
}

const rndInt = (i) => Math.floor(Math.random() * (i + 1)); //0~i
const rndIntBet = (i, j) => Math.floor(Math.random() * (j - i + 1)) + i; //i~j
const coinToss = () => Math.random() >= 0.5;
const evalPercentage = (perc) => perc / 100 > Math.random();
const getAlphabet = (key) => /^[a-z]$/i.test(key) ? key : null;
const getNumber = (key) => /^[0-9]$/.test(key) ? key : null;
const getAlphabetOrNumber = (key) => {
    let a = getAlphabet(key);
    if (!a) a = getNumber(key);
    return a;
}

const getUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getDirection = (key) => {
    let id;
    switch (key) {
        case 'h':
        case 'H':
        case 'ArrowLeft':
        case 'Left':
            id = DR_LEFT;
            break;
        case 'j':
        case 'J':
        case 'ArrowDown':
        case 'Down':
            id = DR_DOWN;
            break;
        case 'k':
        case 'K':
        case 'ArrowUp':
        case 'Up':
            id = DR_UP;
            break;
        case 'l':
        case 'L':
        case 'ArrowRight':
        case 'Right':
            id = DR_RIGHT;
            break;
        case 'y': 
        case 'Y':
        case 'Home':
            id = DR_UPLEFT;
            break;
        case 'b':
        case 'B':
        case 'End':
            id = DR_DOWNLEFT;
            break;
        case 'u':
        case 'U':
        case 'PageUp':
            id = DR_UPRIGHT;
            break;
        case 'n':
        case 'N':
        case 'PageDown':
            id = DR_DOWNRIGHT;
            break;
        default:
            return null;
    }
    return drList[id];
}

const getDirectionBetween = (x1, y1, x2, y2) => {
    return x1 > x2 && y1 === y2 ? drList[DR_LEFT] :
        x1 === x2 && y1 < y2 ? drList[DR_DOWN] :
        x1 === x2 && y1 > y2 ? drList[DR_UP] :
        x1 < x2 && y1 === y2 ? drList[DR_RIGHT] :
        x1 > x2 && y1 > y2 ? drList[DR_UPLEFT] :
        x1 > x2 && y1 < y2 ? drList[DR_DOWNLEFT] :
        x1 < x2 && y1 > y2 ? drList[DR_UPRIGHT] :
        x1 < x2 && y1 < y2 ? drList[DR_DOWNRIGHT] :
        null;
}

const getNextDirection = (dr, ccw) => { //counterclockwise
    let id;
    switch (dr.id) {
        case DR_LEFT:
            id = ccw ? DR_DOWNLEFT : DR_UPLEFT;
            break;
        case DR_DOWNLEFT:
            id = ccw ? DR_DOWN : DR_LEFT;
            break;
        case DR_DOWN:
            id = ccw ? DR_DOWNRIGHT : DR_DOWNLEFT;
            break;
        case DR_DOWNRIGHT:
            id = ccw ? DR_RIGHT : DR_DOWN;
            break;
        case DR_RIGHT:
            id = ccw ? DR_UPRIGHT : DR_DOWNRIGHT;
            break;
        case DR_UPRIGHT:
            id = ccw ? DR_UP : DR_RIGHT;
            break;
        case DR_UP:
            id = ccw ? DR_UPLEFT : DR_UPRIGHT;
            break;
        case DR_UPLEFT:
            id = ccw ? DR_LEFT : DR_UP;
            break;
        default:
            return null;
    }
    return drList[id];
}

const deleteAndSortItem = (list, a) => {
    let i = eaList.indexOf(a);
    let j = Object.keys(list).length - 1 - i;
    for (let k = 0; k < j; k++) {
        list[eaList[i]] = list[eaList[++i]];
    }
    
    delete list[eaList[i]];
}

/* TEMP */
const getArticleAndPlural = (name, verb, noun, quantity, upperCase) => {
    if (noun && quantity === 1) {
        let article = /^[aeiou]/i.test(name) ? 'an ' : 'a ';
        name = article + name;
    }
    
    if (verb || quantity > 1) {
        let plural;
        if (/[bcdfghjklmnpqrstvwxz]y$/.test(name)) {
            name = name.slice(0, -1);
            plural =  'ies';
        } else if (/[sxo]$|sh$|ch$/.test(name)) {
            plural =  'es';
        } else {
            plural =  's';
        }

        name += plural;
    }

    if (upperCase) name = getUpperCase(name);
    return name;
}

const Position = class {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
const Thing = class {
    constructor(obj) {
        copyObj(this, obj);
        this.x = 0;
        this.y = 0;
    }

    init(position, x, y) {
        if (position !== POS_LOCATION) {
            this.getPositionRandomly(position === POS_INIT, position === POS_AWAY);
            [x, y] = [this.x, this.y];
		}

        if (!this.abort) this.putDown(x, y);
    }

    getPositionRandomly(init, away, tele) {
        let x, y, loc;
        let count = 0;
        if (init) {
            let room, id;
            let l = dungeon.rns.length;
            dungeon.rns.shuffle();
            let i = 0;
            do {
                id = dungeon.rns[i++];
                if (id === undefined) {
                    dungeon.rns.shuffle();
                    i = 0;
                    id = dungeon.rns[i++];
				}

                room = dungeon.list[id];
                x = rndIntBet(room.x + 1, room.x + room.width - 2);
                y = rndIntBet(room.y + 1, room.y + room.height - 2);
                loc = map.coords[x][y];
            } while ((loc.wall || loc.door ||
                    loc.fighter || loc.item['a'] ||
					loc.trap || loc.enter || loc.stairs) &&
					++count < 1000
			);
        } else {
            let [width, height] = [map.coords.length, map.coords[0].length];
            do {
                x = rndInt(width - 2) + 1;
                y = rndInt(height - 2) + 1;
                loc = map.coords[x][y];
            } while ((loc.wall || loc.door ||
                    loc.fighter || loc.item['a'] ||
                    loc.trap || loc.enter || loc.stairs ||
                    away && distanceSq(x, y, rogue.x, rogue.y) <= FOV_SQ) &&
					++count < 1000
			);
		}
		
        if (count < 100) {
            [this.x, this.y] = [x, y];
		} else if (!tele && this.id !== ID_ROGUE) {
			this.dissapear();
		}
    }

    spiralSearch(x0, y0, type, count = 0) {
        let [x, y] = [x0, y0];
        let width = map.coords.length;
        let height = map.coords[0].length;
        let loop = 0;
        let limit = type === 'item' && count < MAX_SEARCH_RANGE ? count : MAX_SEARCH_RANGE;
        if (this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
        do {
            y--;
            while (y < y0) {
                x++, y++;
                if (x < width - 1 && y > 0 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (x > x0) {
                x--, y++;
                if (x < width - 1 && y < height - 1 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (y > y0) {
                x--, y--;
                if (x > 0 && y < height - 1 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
            while (x < x0) {
                x++, y--;
                if (x > 0 && y > 0 && this.spiralSearchCheck(x, y, x0, y0, type, count)) return;
            }
		} while (loop++ <= limit);
		
        if (type === 'item' && ++count < MAX_PACK_COUNT) {
            this.spiralSearch(x0, y0, type, count);
		} else if (this.id !== ID_ROGUE) {
			this.dissapear();
		}
    }

    spiralSearchCheck(x, y, x0, y0, type, count) {
        let loc = map.coords[x][y];
        if (!loc.isObstacle() && !loc.enter) {
            if ((type === 'fighter' && !loc.fighter ||
                    type === 'item' && !loc.trap && !loc.door &&
                    !loc.item[eaList[count]] ||
                    type === 'trap' && !loc.item['a'] &&
                    !loc.door && !loc.trap && !loc.stairs ||
                    type === 'staircase' && !loc.door &&
                    !loc.trap && !loc.stairs ||
                    type === 'portal') &&
            	    lineOfSight(x0, y0, x, y)) {
                [this.x, this.y] = [x, y];
                return true;
            }
        }
    }

    dissapear() {
        this.abort = true;
        let name = this.getName();
        message.draw(option.isEnglish() ?
            `${name} dissapeared` :
            `${name}は消え去った`);
    }

    getName() {
        return this.name[option.getLanguage()];
    }
}
const entranceList = {
    stash: {
        name: { a: 'Stash', b: '物置箱' },
        symbol: '&',
        color: colorList.brown,
        page: 1,
        stash: true,
    },

    book: {
        name: { a: 'Book Shop', b: '魔法書店' },
        symbol: '?',
        color: colorList.gray,
        shop: true,
        type: { 'book': 10 },
    },

    general: { 
        name: { a: 'General Shop', b: '雑貨屋' },
        symbol: ':',
        color: colorList.brown,
        shop: true,
        type: { 'food': 2, 'light': 6, 'oil': 2, },
    },

    potion: {
        name: { a: 'Potion Shop', b: '薬屋' },
        symbol: '!',
        color: colorList.blue,
        shop: true,
        type: { 'potion': 15 },
    },

    scroll: {
        name: { a: 'Scroll Shop', b: '巻物店' },
        symbol: '?',
        color: colorList.white,
        shop: true,
        type: { 'scroll': 15 },
    },

    wand: {
        name: { a: 'Wand Shop', b: '魔法棒店' },
        symbol: '-',
        color: colorList.white,
        shop: true,
        type: { 'wand': 10 },
    },

    weapon: { 
        name: { a: 'Weapon Shop', b: '武器屋' },
        symbol: '|',
        color: colorList.white,
        shop: true,
        equipment: true,
        type: { 'melee': 8, 'missile': 3, 'staff': 2, 'ammo': 6 },
    },

    armor: {
        name: { a: 'Armor Shop', b: '防具屋' },
        symbol: '[',
        color: colorList.gray,
        shop: true,
        equipment: true,
        type: { 'shield': 2, 'armor': 3, 'cloak': 2, 'belt': 2, 'helm': 2, 'gloves': 2, 'boots': 2 },
    },

    gamble: {
        name: { a: 'Gamble Shop', b: 'ギャンブル店' },
        symbol: '$',
        color: colorList.yellow,
        gamble: true,
        shop: true,
    },

    cure: {
        name: { a: 'Cure Shop', b: '治療店' },
        symbol: '+',
        color: colorList.lime,
        cure: true,
        list: {
            a: { a: 'recover completely', b: '全快する', cost: 400 },
            b: { a: 'restore health and mana', b: '体力と魔力を回復する', cost: 100 },
            c: { a: 'restore stats', b: '能力値を元に戻す', cost: 100 },
            d: { a: 'restore condition', b: '状態異常を元に戻す', cost: 100 },
            e: { a: 'have a meal', b: '食事をとる', cost: 100 }
        }
    },

    blacksmith: {
        name: { a: 'Blacksmith Shop', b: '鍛冶屋' },
        symbol: '/',
        color: colorList.gray,
        blacksmith: true,
    },
};

const Entrance  = class extends Thing {
    constructor(name) {
        super(entranceList[name]);
        if (this.shop) {
            this.list = {};
        } else if (this.stash) {
            this.list = map.stashList;
        }
    }

    putDown(x, y) {
        let loc = map.coords[x][y];
        loc.deleteWall();
        loc.enter = this;
    }

    createShopItem() {
        let k = 0;
        if (this.gamble) {
            for (let i = 0; i < 10; i++) {
                this.list[eaList[k++]] = creation.item({ position: POS_LIST });
            }

            return;
        }

        for (let type in this.type) {
            let max = this.type[type];
            let j = 0;
            let count = 0;
            let itemNums = itemNumsMap.get(type);
            itemNums.shuffle();
            do {
                let item, tabId;
                do {
                    tabId = itemNums[j++];
                    item = itemTab[type].get(tabId);
                } while (item && !item.shop);

                if (!item) {
                    j = 0;
                    itemNums.shuffle();
                    continue;
                }

                let quantity = item.equipable ? 1 : rndIntBet(10, 99);
                this.list[eaList[k]] = creation.item({
                    type: type,
                    tabId: tabId,
                    quantity: quantity,
                    position: POS_LIST,
                });
                
                inventory.sort(eaList[k++], this.list);
                if (k === MAX_PACK_COUNT) return;
                count++;
            } while (count < max);
        }
    }
}

const [
    M_DESTROY,
    M_CANT_DESTROY,
    M_NUMBER,
    M_PACK,
    M_FLOOR,
    M_READ,
    M_CANT_READ_SCROLL,
    M_CANT_READ_BOOK,
    M_CANT_TELE,
    M_IDENTIFY,
    M_DISINTEGRATION,
    M_REPAIR,
    M_DONT_HAVE_MISSILE,
    M_DONT_HAVE_AMMO,
    M_ZAP,
    M_TO_EXAMINE,
    M_ZAP_DIR,
    M_CANT_EXAMINE,
    M_NOTHING_HAPPENED,
    M_QUAFF,
    M_EAT,
    M_DROP,
    M_CANT_CARRY,
    M_GRAB,
    M_EQUIP,
    M_TWO_HANDED,
    M_FUEL,
    M_DONT_EQUIP_LIGHT,
    M_INVESTIGATE,
    M_CANT_ADD,
    M_SYNTHESIZE,
    M_PACK_OR_UNPACK,
    M_PACK_INTO,
    M_CANT_SELL,
    M_DONT_HAVE_MONEY,
    M_SHOP,
    M_STASH,
    M_EXAMINE,
    M_BLACKSMITH,
    M_CURE,
    M_MINIMAP,
    M_SORT_SKILL,
    M_SORT_SKILL2,
    M_CANT_GAIN_SKILL,
    M_CANT_GAIN_STAT,
    M_GAIN,
    M_ASSIGN_SKILL,
    M_ASSIGN_SKILL2,
    M_CAST,
    M_CAST_DIR,
    M_DONT_HAVE_SKILL,
    M_CANT_CAST,
    M_DONT_HAVE_BOOK,
    M_DONT_HAVE_MANA,
    M_DONT_HAVE_MELEE,
    M_EXAMINE_W,
    M_GAIN_SKILL,
    M_OPTION,
    M_MESSAGE,
    M_STUCK,
    M_DIED,
    M_RECOVER_ALL,
    M_FLOAT,
    M_LIGHT_GONE,
    M_STARVED,
    M_OPEN_OR_CLOSE,
    M_DONT_HAVE_EQUIPMENT,
    M_TAKE_OFF,
    M_FIRE,
    M_QUIT,
    M_INTERRUPTED,
    M_THROW,
    M_THROW_DIR,
    M_NO_CLUE,
    M_RECIPE,
    M_DONT_KNOW_RECIPE,
    M_SCROLL,
    M_HELP,
    M_CHARACTER,
    M_TOO_HEAVY,
    M_RETRY,
] = enums(1, 100);

const msgMap = new Map([
    [M_NUMBER, {
        a: 'Input Number - [0-9] [Backspace] to remove [Enter] to decide [a] for all: ',
        b: '数値を入力 - [0-9] [Backspace] 削除 [Enter] 決定 [a] すべて: '
    }],

    [M_PACK, {
        a: ' [,] for stuff',
        b: ' [,] 持物'
    }],

    [M_FLOOR, {
        a: ' [.] for floor',
        b: ' [.] 床'
    }],

    [M_TO_EXAMINE, {
        a: ' [x] to examine',
        b: ' [x] 探査'
    }],

    [M_EXAMINE_W, {
        a: ' [e] for equipment [i] for inventory',
        b: ' [e] 装備 [i] 持物'
    }],

    [M_SCROLL, {
        a: ' [direction] + [Shift/Ctrl] to scroll [c] to close',
        b: ' [方向] + [Shift/Ctrl] ページ移動 [c] 閉じる'
    }],

    [M_CANT_DESTROY, {
        a: 'You can\'t destroy it',
        b: 'それを壊す事は出来ない'
    }],

    [M_CANT_READ_SCROLL, {
        a: 'You can\'t read any scrolls',
        b: '巻物を読む事が出来ない'
    }],

    [M_CANT_READ_BOOK, {
        a: 'You can\'t read any books',
        b: '本を読む事が出来ない'
    }],

    [M_CANT_TELE, {
        a: 'You can\'t teleport there',
        b: 'そこへテレポートする事は出来ない'
    }],

    [M_CANT_EXAMINE, {
        a: 'You can\'t examine',
        b: '探査出来ない'
    }],

    [M_CANT_CARRY, {
        a: 'You can\'t carry anymore',
        b: 'もう持つことが出来ない'
    }],

    [M_CANT_ADD, {
        a: 'You can\'t add them anymore',
        b: 'これ以上詰め込めない'
    }],

    [M_CANT_SELL, {
        a: 'You can\'t sell anymore',
        b: 'これ以上売却出来ない'
    }],

    [M_CANT_GAIN_SKILL, {
        a: 'You can\'t gain any skills',
        b: 'スキルを習得出来ない'
    }],

    [M_CANT_GAIN_STAT, {
        a: 'You can\'t gain any stats',
        b: '能力値を習得出来ない'
    }],

    [M_CANT_CAST, {
        a: 'You can\'t cast any skills',
        b: 'スキルを行使出来ない'
    }],

    [M_DONT_HAVE_MISSILE, {
        a: 'You have nothing to fire with',
        b: '遠隔武器を持っていない'
    }],

    [M_DONT_HAVE_AMMO, {
        a: 'You have no ammunition to fire',
        b: '弾薬を持っていない'
    }],

    [M_DONT_KNOW_RECIPE, {
        a: 'You don\'t know any recipes',
        b: 'レシピを習得していない'
    }],

    [M_DONT_EQUIP_LIGHT, {
        a: 'You don\'t equip any light sources',
        b: '光源を身に付けていない'
    }],

    [M_DONT_HAVE_MONEY, {
        a: 'You don\'t have enough money',
        b: '金額が足りない'
    }],

    [M_DONT_HAVE_SKILL, {
        a: 'You don\'t have any skills to cast',
        b: '行使するスキルを覚えていない'
    }],

    [M_DONT_HAVE_BOOK, {
        a: 'You don\'t have any books to cast',
        b: '行使するための魔法書を持っていない'
    }],

    [M_DONT_HAVE_MANA, {
        a: 'You don\'t have enough mana to cast',
        b: '行使するためのマナが足りない'
    }],

    [M_DONT_HAVE_MELEE, {
        a: 'You have nothing to combat with',
        b: '近接武器を持っていない'
    }],

    [M_DONT_HAVE_EQUIPMENT, {
        a: 'You have nothing to take off or unwield',
        b: '何も身に着けていない'
    }],

    [M_INTERRUPTED, {
        a: 'Interrupted',
        b: '中断した'
    }],

    [M_STARVED, {
        a: 'You are starved',
        b: '飢餓状態に陥った'
    }],

    [M_LIGHT_GONE, {
        a: 'Your light has gone out',
        b: '灯火が消え去った'
    }],

    [M_FLOAT, {
        a: 'You\'re floating in the air',
        b: '空中に浮かんだ'
    }],

    [M_RECOVER_ALL, {
        a: 'You recovered completely',
        b: '全快した'
    }],

    [M_DIED, {
        a: 'You died',
        b: '死亡した'
    }],

    [M_STUCK, {
        a: 'You are still stuck',
        b: 'まだ動けない'
    }],

    [M_TWO_HANDED, {
        a: 'You are using both hands already',
        b: '既に両手を使っている'
    }],

    [M_NOTHING_HAPPENED, {
        a: 'Nothing happened',
        b: '何も起こらなかった'
    }],

    [M_NO_CLUE, {
        a: 'You have no clue',
        b: '詳細が掴めない'
    }],

    [M_TOO_HEAVY, {
        a: 'It\'s too heavy to lift',
        b: '重くて持ち上げられない'
    }],

    [M_DESTROY, {
        a: 'Destroy Item: [a-Z] [1-9] to choose',
        b: 'アイテムを壊す: [a-Z] [1-9] 選択'
    }],

    [M_READ, {
        a: 'Read Scroll: [a-Z] [1-9] to choose',
        b: '巻物を読む: [a-Z] [1-9] 選択'
    }],

    [M_IDENTIFY, {
        a: 'Identify Item: [a-Z] [1-9] to choose',
        b: 'アイテムを識別する: [a-Z] [1-9] 選択'
    }],

    [M_DISINTEGRATION, {
        a: 'Disintegrate Enemy: [a-Z] to choose the symbol',
        b: '敵を分解する: [a-Z] シンボルを選択'
    }],

    [M_REPAIR, {
        a: 'Repair Equipment: [a-Z] [1-9] to choose',
        b: '装備品を修復する: [a-Z] [1-9] 選択'
    }],

    [M_ZAP, {
        a: 'Zap Wand: [a-Z] [1-9] to choose',
        b: '魔法棒を振る: [a-Z] [1-9] 選択'
    }],

    [M_ZAP_DIR, {
        a: 'Zap Wand: [direction] [t] to decide',
        b: '魔法棒を振る: [方向] [t] 決定'
    }],

    [M_QUAFF, {
        a: 'Quaff Potion: [a-Z] [1-9] to choose',
        b: '薬を飲む: [a-Z] [1-9] 選択'
    }],

    [M_EAT, {
        a: 'Eat: [a-Z] [1-9] to choose',
        b: '食事する: [a-Z] [1-9] 選択'
    }],

    [M_DROP, {
        a: 'Drop Item: [a-Z] [1-9] to choose',
        b: 'アイテムを置く: [a-Z] [1-9] 選択'
    }],

    [M_GRAB, {
        a: 'Grab Item: [a-Z] to choose',
        b: 'アイテムを拾う: [a-Z] 選択'
    }],

    [M_EQUIP, {
        a: 'Equip: [a-Z] [1-9] to choose',
        b: '装備する: [a-Z] [1-9] 選択'
    }],

    [M_FUEL, {
        a: 'Fuel: [a-Z] [1-9] to choose',
        b: '燃料を補給する: [a-Z] [1-9] 選択'
    }],

    [M_INVESTIGATE, {
        a: 'Investigate Item: [a-Z] [1-9] to choose',
        b: 'アイテムを調査する: [a-Z] [1-9] 選択'
    }],

    [M_SYNTHESIZE, {
        a: 'Alchemy: [a-z] [1-9] to choose [A-Z] to remove [Enter] to synthesize [Ctrl + r] to show recipes',
        b: '錬金術: [a-z] [1-9] 選択 [A-Z] 除外 [Enter] 合成 [Ctrl + r] レシピを表示'
    }],

    [M_RECIPE, {
        a: '[c] to close',
        b: '[c] 閉じる'
    }],

    [M_PACK_OR_UNPACK, {
        a: 'Pack Item: [a-z] to pack [1-9] to unpack',
        b: 'アイテムを詰める: [a-z] 荷詰め  [1-9] 荷解き'
    }],

    [M_PACK_INTO, {
        a: 'Pack Item: [1-9] to pack into',
        b: 'アイテムを詰める: [1-9] 荷詰め箇所'
    }],

    [M_SHOP, {
        a: ': [A-Z] to buy [a-z] to sell [alt + a-Z] details',
        b: ': [A-Z] 購入 [a-z] 売却 [alt + a-Z] 詳細'
    }],

    [M_STASH, {
        a: 'Stash: [a-z] to store [A-Z] to take out [<] to previous [>] to next page [alt + a-Z] details',
        b: '物置箱: [a-z] 保管 [A-Z] 持参 [<] 前項 [>] 次項 [alt + a-Z] 詳細'
    }],

    [M_EXAMINE, {
        a: 'Examine: [t] for target [r] for release [c] for char [m] for skill [x] for item details',
        b: '探査: [t] ターゲット [r] 解除 [c] キャラ [m] スキル [x] アイテム詳細'
    }],

    [M_BLACKSMITH, {
        a: 'Blacksmith: [a-Z] to repair, [Enter] to repair all equipment',
        b: '鍛冶屋: [a-Z] 修理, [Enter] 装備全修理'
    }],

    [M_CURE, {
        a: 'Cure Shop: [a-z] to choose',
        b: '治療店: [a-z] 選択'
    }],

    [M_MINIMAP, {
        a: 'Map: [a] for all [s] for yourself [e] for enemy [i] for item [t] fot trap [p] for portal [<],[>] for staircase [c] to close',
        b: 'マップ: [a] すべて [s] 自身 [e] 敵 [i] アイテム [t] 罠 [p] ポータル [<],[>] 階段 [c] 閉じる'
    }],

    [M_SORT_SKILL, {
        a: 'Sort Skill: [a-z] to replace',
        b: 'スキルの整理: [a-z] 交換元'
    }],

    [M_SORT_SKILL2, {
        a: 'Sort Skill: [a-z] to replace with',
        b: 'スキルの整理: [a-z] 交換先'
    }],

    [M_GAIN, {
        a: 'Gain Stat/Skill: [a-Z] to choose',
        b: 'ステータス/スキルを取得する: [a-Z] 選択'
    }],

    [M_GAIN_SKILL, {
        a: 'Gain Skill: [a-z] to choose [A-Z] details',
        b: 'スキルを取得する: [a-z] 選択 [A-Z] 詳細'
    }],

    [M_ASSIGN_SKILL, {
        a: 'Assign Skill: [a-z] to choose [M], [F1-F12] to remove',
        b: 'スキルを割り当てる: [a-z] 選択 [M], [F1-F12] 除外'
    }],

    [M_ASSIGN_SKILL2, {
        a: 'Assign Skill: [M], [F1-F12] to choose',
        b: 'スキルを割り当てる: [M], [F1-F12] 選択'
    }],

    [M_CAST, {
        a: 'Use Skill: [a-z] to choose [A-Z] details [Ctrl+s] to sort',
        b: 'スキルを使う: [a-z] 選択 [A-Z] 詳細 [Ctrl+s] 整理'
    }],

    [M_CAST_DIR, {
        a: 'Use Skill: [direction] [t] to decide',
        b: 'スキルを使う: [方向] [t] 決定'
    }],

    [M_OPTION, {
        a: 'Option: [a-z] to choose',
        b: 'オプション: [a-z] 選択'
    }],

    [M_MESSAGE, {
        a: 'Previous Massage: [D] to delete',
        b: 'メッセージ履歴: [D] 消去'
    }],

    [M_HELP, {
        a: 'Help - Command:',
        b: 'ヘルプ - コマンド:'
    }],

    [M_CHARACTER, {
        a: 'Character Description:',
        b: 'キャラ詳細:'
    }],

    [M_OPEN_OR_CLOSE, {
        a: 'Open/Close Door: [direction] to decide',
        b: 'ドアの開閉: [方向] 決定'
    }],

    [M_TAKE_OFF, {
        a: 'Take off Equipment: [A-Z] to choose' ,
        b: '装備を外す: [A-Z] 選択'
    }],

    [M_FIRE, {
        a: 'Fire: [direction] to decide',
        b: '発射する: [方向] 決定'
    }],

    [M_QUIT, {
        a: 'Are you sure you want to quit? [Y/N]',
        b: '本当にゲームを放棄しますか? [Y/N]'
    }],

    [M_THROW, {
        a: 'Trow Item: [a-z] [1-9] to choose',
        b: 'アイテムを投げる: [a-z] [1-9] 選択'
    }],

    [M_THROW_DIR, {
        a: 'Trow Item: [direction] [t] to decide',
        b: 'アイテムを投げる: [方向] [t] 決定'
    }],

    [M_RETRY, {
        a: 'Retry: [Enter] to decide',
        b: 'リトライ: [Enter] 決定'
    }],
]);
const message = {
    listTemp: [],
    list: [],
    scroll(key, init) {
        if (key === 'D') {
            vue.msgList.splice(0);
            vue.msgTotal = `[0/${MAX_MSG_LIST_LEN}] `
                + (option.isEnglish() ? 'Message List' : 'メッセージ一覧'); 
            return;
        }

        if (init) {
            message.draw(message.get(M_MESSAGE) + message.get(M_SCROLL), true);
            this.eleP = vue.$refs.messagePrevContainer.$refs.messagePrevList;
            this.eleC = this.eleP.firstElementChild;
            let l = this.list.length;
            vue.msgTotal = `[${l}/${MAX_MSG_LIST_LEN}] `
                + (option.isEnglish() ? 'Message List' : 'メッセージ一覧'); 
        }

        input.scroll(this.eleP, this.eleC, key, init);
    },

    clear() {
        // this.listTemp = [];
    },

    clearFixed() {
        vue.msgFixed = '';
    },

    counter: 0,
    countDelete: 0,
    draw(msg, fixed) {
        if (fixed) {
            vue.msgFixed = msg;
            return;
        }

        this.counter++;
        if (!this.list[0] || this.list[0].text !== msg) {
            let obj = { text: msg, count: 1};
            this.listTemp.unshift(obj);
            if (this.listTemp.length > MAX_MSG_LEN) {
                this.listTemp.pop();
                this.countDelete++;
            }

            this.list.unshift(obj);
            if (this.list.length > MAX_MSG_LIST_LEN) this.list.pop();
        } else {
            let obj = this.list[0];
            obj.count++;
            if(!this.listTemp.length){
                this.listTemp.unshift(obj);
            } else {
                this.countDelete++;
            }
        }
        
        setTimeout(() => {
            let list = this.listTemp;
            if(list.length && !this.countDelete) {
                list.pop();
            } else if (this.countDelete) {
                this.countDelete--;
            }
        }, MSG_SPEED * this.counter--);
    },

    get(id) {
        return msgMap.get(id)[option.getLanguage()];
    }
}

const translation = {
    bodyParts: {
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
    },

    item: {
        book: '書',
        food: '食料',
        potion: '薬',
        scroll: '巻物',
        wand: '魔法棒',
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
        gem: 'ジュエル',
        orb: 'オーブ',
        coin: 'コイン',
        misc: '雑多品',
        water: '水',
        recipe: 'レシピ',
        'Charge Book': '充填書',
        corpse: '死体',
        material: '素材',
    },

    element: {
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
    },
};
const TOTAL_SKILL_NUM = 150;
const [
    FIRE_BOLT,
    FIRE_BALL,
    FLAME_OF_DIDO,
    REMOVE_CURSE,
    RESIST_FIRE,
    LIGHT,
    SEE_INVISIBLE,
    INVISIBILITY,
    MAGIC_CIRCLE_OF_PROTECTION,
    HEAL,
    EXTRA_HEAL,
    MANA,
    LIFE_REGENERATION,
    MANA_REGENERATION,
    RESTORE_STRENGTH,
    RESTORE_DEXTERITY,
    RESTORE_CONSTITUTION,
    RESTORE_INTELLIGENCE,
    RESTORE_ALL,
    CURE_ALL,
    RESIST_WATER,
    RESIST_ALL,
    RAISE_LEVEL,
    RESPEC,
    ICE_BOLT,
    COCYTUS,
    WIND_SPEAR,
    TORNADO,
    SPEED,
    SCREAM,
    RESIST_AIR,
    LIGHTNING,
    ENLIGHTENMENT,
    MAGIC_FINDING,
    GOLD_FINDING,
    EXPERIENCE,
    SKILL,
    IDENTIFY,
    MONSTER_DETECTION,
    ITEM_DETECTION,
    MAGIC_MAPPING,
    SATISFY_HUNGER,
    STONE_TO_MUD,
    CREATE_MONSTER,
    CREATE_GIANT,
    CREATE_TRAP,
    RESTORE_DURABILITY,
    RESIST_EARTH,
    TOWN_PORTAL,
    WORMHOLE,
    SLOW,
    GRAVITATIONAL_FIELD,
    POISON,
    CONFUSION,
    TOUCH_OF_CONFUSION,
    PARALYSIS,
    SLEEP,
    BLINDNESS,
    HALLUCINATION,
    POLYMORPH,
    CANCELLATION,
    SLEEPING_GAS,
    HOLD_MONSTER,
    HALLUCINATING_MIST,
    LOWER_RESIST,
    WEAKNESS,
    CLUMSINESS,
    SICKLINESS,
    STUPIDITY,
    RESIST_POISON,
    INFECTION,
    PESTILENCE,
    SANDSTORM,
    BLIZZARD,
    ACID_BALL,
    LAVA_FLOW,
    SHORT_TELEPORTATION,
    TELEPORTATION,
    TELEPORT_TO,
    TELEPORT_AWAY,
    DISINTEGRATION,
    FIST_OF_CONFUSION,
    RAID,
    PIERCING_ARROW,
    EXPLODING_ARROW,
    PARALYZING_ARROW,
    FREEZING_ARROW,
    PHOTON_ARROW,
    APOLLOS_ARROW,
    ENCOURAGEMENT,
    BLESSING,
    FIRE_BREATH,
    AQUA_BREATH,
    WIND_BREATH,
    POISON_BREATH,
    LIGHT_BREATH,
    COLD_BREATH,
    LIGHTNING_BREATH,
    GRAVITY_BREATH,
    INFECTION_BREATH,
    BLIZZARD_BREATH,
    DUST_BREATH,
    ACID_BREATH,
    MAGMA_BREATH,
    RUSH,
    SPIRAL,
    COLLAPSE,
    WHIRLWIND,
    ECCO,
    CREATE_MAGIC_MONSTER,
    POISON_BOLT,
    VENOM_HANDS,
    POISON_MIST,
    RADIOACTIVE_BREATH,
    CHAIN_DECAY,
    RADIATION,
    COLD,
    RESTORE_EXPERIENCE,
    REPAIR_ALL,
    ENCHANT_SELF,
    EARTHQUAKE,
    CHARGE,
    FREEZE,
    ACCELERATION,
    EXTRA_MANA,
    REJUVENATION,
    RESIST_PHYSICAL,
] = enums(1, TOTAL_SKILL_NUM);

const skillMap = new Map([
    //spell
    [FIRE_BOLT, {
        reqLvl: 1,
        base: '15-25',
        rate: 20,
        synerzy: 10,
        mp: 5,
        element: 'fire',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Fire Bolt', b: '火炎のボルト' },
        desc: { a: '', b: '敵1体に、{value}の火ダメージを与える。' }
    }],

    [FIRE_BALL, {
        reqLvl: 10,
        base: '50-60',
        rate: 20,
        synerzy: 10,
        mp: 10,
        element: 'fire',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Fire Ball', b: '火炎のボール' },
        radius: 1,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の火ダメージを与える。' }
    }],

    [FLAME_OF_DIDO, {
        reqLvl: 30,
        base: '150-160',
        rate: 20,
        synerzy: 10,
        mp: 30,
        element: 'fire',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Flame of Dido', b: 'ディドの焔' },
        reqSynerzy: 20,
        desc: { a: '', b: '敵1体に、{value}の火ダメージを与える。' }
    }],

    [REMOVE_CURSE, {
        reqLvl: 11,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'fire',
        kind: 'self',
        type: 'spell',
        name: { a: 'Remove Curse', b: '解呪' },
        reqSynerzy: 5,
        desc: { a: '', b: '装備品の呪いを解く。' }
    }],

    [RESTORE_STRENGTH, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'fire',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Strength', b: '筋力復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '筋力を回復する。' }
    }],

    [RESIST_FIRE, {
        reqLvl: 5,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'fire',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Fire', b: '耐火' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、火の耐性を{value}上昇させる。' }
    }],

    [LIGHT, {
        reqLvl: 3,
        base: 10,
        rate: 2,
        synerzy: 1,
        mp: 5,
        element: 'light',
        kind: 'self',
        type: 'spell',
        name: { a: 'Light', b: '光' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内を照らす。' }
    }],

    [SEE_INVISIBLE, {
        reqLvl: 13,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'light',
        kind: 'self',
        type: 'spell',
        name: { a: 'See Invisible', b: '透視' },
        reqSynerzy: 5,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、透明な敵に対する可視効果を得る。' }
    }],

    [INVISIBILITY, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'light',
        kind: 'self',
        type: 'spell',
        name: { a: 'Invisibility', b: '透明' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、透明状態にする。' }
    }],

    [MAGIC_CIRCLE_OF_PROTECTION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'light',
        kind: 'self',
        type: 'spell',
        name: { a: 'Magic Circle of Protection', b: '守護魔法円' },
        desc: { a: '', b: '足元に敵の侵入を阻む魔法円を描く。' }
    }],

    [HEAL, {
        reqLvl: 13,
        base: '40-60',
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Heal', b: '回復' },
        reqSynerzy: 10,
        desc: { a: '', b: '体力を{value}回復し、毒・混乱・盲目を治す。' }
    }],

    [EXTRA_HEAL, {
        reqLvl: 28,
        base: '240-260',
        rate: 10,
        synerzy: 5,
        mp: 30,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Extra Heal', b: '特大回復' },
        reqSynerzy: 20,
        desc: { a: '', b: '体力を{value}回復し、毒・混乱・盲目・感染・幻覚を治す。' }
    }],

    [REJUVENATION, {
        reqLvl: 0,
        base: 30,
        rate: 5,
        synerzy: 0,
        mp: 0,
        element: 'water',
        kind: 'self',
        type: 'spell',
        perc: true,
        limit: 100,
        name: { a: 'Rejuvenation', b: '活性' },
        desc: { a: '', b: '体力と魔力を{value}回復する。' }
    }],

    [RESTORE_INTELLIGENCE, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Intelligence', b: '知力復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '知力を回復する。' }
    }],

    [RESTORE_ALL, {
        reqLvl: 25,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 25,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore All', b: '全復活' },
        reqSynerzy: 15,
        desc: { a: '', b: '能力値を回復する。' }
    }],

    [CURE_ALL, {
        reqLvl: 27,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 25,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Cure All', b: '全治療' },
        reqSynerzy: 15,
        desc: { a: '', b: '全状態異常を治癒する。' }
    }],

    [RESIST_WATER, {
        reqLvl: 5,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Water', b: '耐水' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、水の耐性を{value}上昇させる。' }
    }],

    [RESIST_ALL, {
        reqLvl: 23,
        base: 5,
        rate: 3,
        synerzy: 1,
        mp: 20,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist All', b: '全耐性' },
        perc: true,
        reqSynerzy: 10,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、すべての耐性を{value}上昇させる。' }
    }],

    [MANA, {
        reqLvl: 0,
        base: '10-20',
        rate: 10,
        synerzy: 0,
        mp: 1,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Mana', b: '魔力回復' },
        desc: { a: '', b: '魔力を{value}回復する。' }
    }],

    [EXTRA_MANA, {
        reqLvl: 0,
        base: '70-80',
        rate: 10,
        synerzy: 0,
        mp: 0,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Extra Mana', b: '魔力特大回復' },
        desc: { a: '', b: '魔力を{value}回復する。' }
    }],

    [LIFE_REGENERATION, {
        reqLvl: 0,
        base: 20,
        rate: 10,
        synerzy: false,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Life Regeneration', b: '再生' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、体力再生の効果を{value}得る。' }
    }],

    [MANA_REGENERATION, {
        reqLvl: 0,
        base: 20,
        rate: 10,
        synerzy: false,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Mana Regeneration', b: '魔力再生' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、魔力再生の効果を{value}得る。' }
    }],

    [RAISE_LEVEL, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Raise Level', b: 'レベル上昇' },
        desc: { a: '', b: 'レベルを1上昇させる。' }
    }],

    [RESPEC, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 0,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Respec', b: 'リスペック' },
        desc: { a: '', b: 'すべての能力値を初期状態にし、スキルを忘却し、相当のポイントを再び得る。' }
    }],

    [ICE_BOLT, {
        reqLvl: 1,
        base: '5-25',
        rate: 20,
        synerzy: 10,
        mp: 5,
        element: 'cold',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Ice Bolt', b: '冷気のボルト' },
        desc: { a: '', b: '敵1体に、{value}の氷ダメージを与える。' }
    }],

    [COCYTUS, {
        reqLvl: 30,
        base: '80-120',
        rate: 20,
        synerzy: 10,
        mp: 40,
        element: 'cold',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Cocytus', b: 'コキュートス' },
        radius: 10,
        range: 0,
        reqSynerzy: 20,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の氷ダメージを与える。' }
    }],

    [COLD, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'cold',
        kind: 'self',
        type: 'spell',
        name: { a: 'Cold', b: '冷気' },
        desc: { a: '', b: '敵1体を凍結させる。' }
    }],

    [WHIRLWIND, {
        reqLvl: 10,
        base: '1-40',
        rate: 20,
        synerzy: 10,
        mp: 10,
        element: 'air',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Whirlwind', b: '旋風' },
        radius: 2,
        penetrate: true,
        desc: { a: '', b: '半径{radius}の範囲内の敵を貫通し、{value}の風ダメージを与える。' }
    }],

    [TORNADO, {
        reqLvl: 22,
        base: '1-50',
        rate: 10,
        synerzy: 5,
        mp: 20,
        element: 'air',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Tornado', b: '竜巻' },
        radius: 2,
        penetrate: true,
        each: true,
        reqSynerzy: 10,
        range: 10,
        desc: { a: '', b: '1マス毎に、半径{radius}の範囲内の敵を貫通し、{value}の風ダメージを与える。' }
    }],

    [ECCO, {
        reqLvl: 30,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 30,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Ecco', b: 'エコー' },
        reqSynerzy: 20,
        durBase: '10-20',
        durRate: 5,
        desc: { a: '', b: '{dur}ターンの間、スキルを2回連続で放つ。' }
    }],

    [SPEED, {
        reqLvl: 13,
        base: 20,
        rate: 3,
        synerzy: 1,
        mp: 10,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Speed', b: '速度' },
        reqSynerzy: 10,
        durBase: '10-20',
        durRate: 5,
        perc: true,
        desc: { a: '', b: '{dur}ターンの間、速度を{value}上昇させる。' }
    }],

    [RESTORE_DEXTERITY, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Dexterity', b: '器用さ復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '器用さを回復する。' }
    }],

    [RESIST_AIR, {
        reqLvl: 5,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Air', b: '耐風' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、風の耐性を{value}上昇させる。' }
    }],

    [SCREAM, {
        reqLvl: 0,
        base: 10,
        rate: 2,
        synerzy: false,
        mp: 1,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Scream', b: '悲鳴' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内の敵を目覚めさせる。' }
    }],

    [LIGHTNING, {
        reqLvl: 1,
        base: '1-25',
        rate: 20,
        synerzy: 10,
        mp: 5,
        element: 'lightning',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Lightning', b: '稲妻' },
        penetrate: true,
        desc: { a: '', b: '直線上の敵を貫通し、{value}の稲妻ダメージを与える。' }
    }],

    [ENLIGHTENMENT, {
        reqLvl: 27,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 25,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Enlightenment', b: '啓蒙' },
        reqSynerzy: 20,
        desc: { a: '', b: 'マップ全域を照らし、地形・アイテム及び隠された罠や階段を検出する。' }
    }],

    [IDENTIFY, {
        reqLvl: 17,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Identify', b: '識別' },
        reqSynerzy: 10,
        desc: { a: '', b: 'アイテムを鑑定する。' }
    }],

    [MONSTER_DETECTION, {
        reqLvl: 1,
        base: 10,
        rate: 2,
        synerzy: 1,
        mp: 5,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Monster Detection', b: 'モンスター感知' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内の敵を、検出する。' }
    }],

    [ITEM_DETECTION, {
        reqLvl: 4,
        base: 10,
        rate: 2,
        synerzy: 1,
        mp: 5,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Item Detection', b: 'アイテム感知' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内のアイテムを、検出する。' }
    }],

    [MAGIC_MAPPING, {
        reqLvl: 7,
        base: 10,
        rate: 2,
        synerzy: 1,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Magic Mapping', b: '魔法の地図' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内の地形を、検出する。' }
    }],

    [SATISFY_HUNGER, {
        reqLvl: 22,
        base: 30,
        rate: 1,
        synerzy: 1,
        mp: 20,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Satisfy Hunger', b: '空腹充足' },
        perc: true,
        limit: 100,
        reqSynerzy: 10,
        desc: { a: '', b: '空腹を{value}満たす。' }
    }],

    [STONE_TO_MUD, {
        reqLvl: 12,
        base: '50-150',
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'earth',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Stone to Mud', b: '岩石溶解' },
        wall: true,
        reqSynerzy: 10,
        desc: { a: '', b: '壁を取り壊し、石の敵に{value}の土ダメージを与える。' }
    }],

    [RESTORE_DURABILITY, {
        reqLvl: 10,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Durability', b: '耐久度復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '装備品の耐久度を回復する。' }
    }],

    [RESIST_PHYSICAL, {
        reqLvl: 13,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Physical', b: '耐物' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        reqSynerzy: 10,
        desc: { a: '', b: '{dur}ターンの間、物理の耐性を{value}上昇させる。' }
    }],

    [EARTHQUAKE, {
        reqLvl: 25,
        base: 30,
        rate: 3,
        synerzy: 1,
        mp: 25,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Earthquake', b: '地震' },
        perc: true,
        limit: 100,
        radius: FOV,
        reqSynerzy: 15,
        desc: { a: '', b: '半径{radius}の範囲内に、{value}の規模で地震を起こす。' }
    }],

    [REPAIR_ALL, {
        reqLvl: 29,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 25,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Repair All', b: '全修復' },
        reqSynerzy: 20,
        desc: { a: '', b: 'すべての装備品の耐久度を回復する。' }
    }],

    [ENCHANT_SELF, {
        reqLvl: 21,
        base: 30,
        rate: 3,
        synerzy: 1,
        mp: 20,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Enchant Self', b: '自己強化' },
        perc: true,
        reqSynerzy: 15,
        durBase: '50-100',
        durRate: 15,
        desc: { a: '', b: '{dur}ターンの間、物理ダメージ・命中値・守備力・攻撃速度をそれぞれ{value}上昇させる。' }
    }],

    [RESTORE_CONSTITUTION, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Constitution', b: '耐久力復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '耐久力を回復する。' }
    }],

    [RESIST_EARTH, {
        reqLvl: 5,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Earth', b: '耐土' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、土の耐性を{value}上昇させる。' }
    }],

    [MAGIC_FINDING, {
        reqLvl: 0,
        base: 0,
        rate: 5,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Magic Finding', b: '魔法具探求' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、魔法具探求の効果を{value}得る。' }
    }],

    [GOLD_FINDING, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Gold Finding', b: '財宝探求' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、財宝探求の効果を{value}得る。' }
    }],

    [EXPERIENCE, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Experience', b: '経験' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、経験値上昇の効果を{value}得る。' }
    }],

    [SKILL, {
        reqLvl: 0,
        base: 0,
        rate: 1,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Skill', b: 'スキル' },
        durBase: '10-20',
        durRate: 100, //
        desc: { a: '', b: '{dur}ターンの間、経験値上昇の効果を{value}得る。' }
    }],

    [CREATE_MONSTER, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Create Monster', b: 'モンスター生成' },
        desc: { a: '', b: 'モンスターを複数生成する。' }
    }],

    [CREATE_MAGIC_MONSTER, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Create Magic Monster', b: 'マジックモンスター生成' },
        desc: { a: '', b: 'マジックモンスターを複数生成する。' }
    }],

    [CREATE_GIANT, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Create Giant', b: '巨人生成' },
        desc: { a: '', b: '巨人を複数生成する。' }
    }],

    [CREATE_TRAP, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Create Trap', b: 'トラップ生成' },
        desc: { a: '', b: '罠を複数生成する。' }
    }],

    [GRAVITATIONAL_FIELD, {
        reqLvl: 24,
        base: -10,
        rate: -3,
        synerzy: false,
        mp: 20,
        element: 'gravity',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Gravitational Field', b: '重力場' },
        radius: 10,
        range: 0,
        reqSynerzy: 10,
        durBase: '10-20',
        durRate: 5,
        perc: true,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、速度を{value}低下させる。' }
    }],

    [WORMHOLE, {
        reqLvl: 30,
        base: 10,
        rate: 2,
        synerzy: 1,
        mp: 30,
        element: 'gravity',
        kind: 'self',
        type: 'spell',
        name: { a: 'Wormhole', b: 'ワームホール' },
        radiusRate: true,
        reqSynerzy: 20,
        desc: { a: '', b: '半径{radiusRate}の範囲内の任意の場所に移動する。' }
    }],

    [SLOW, {
        reqLvl: 0,
        base: -20,
        rate: -3,
        synerzy: false,
        mp: 1,
        element: 'gravity',
        kind: 'self',
        type: 'spell',
        name: { a: 'Slow', b: '鈍足' },
        durBase: '10-20',
        durRate: 5,
        perc: true,
        desc: { a: '', b: '{dur}ターンの間、速度を{value}低下させる。' }
    }],

    [POISON_BOLT, {
        reqLvl: 1,
        base: '5-15',
        rate: 20,
        synerzy: 10,
        mp: 5,
        element: 'poison',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Poison Bolt', b: '毒のボルト' },
        desc: { a: '', b: '敵1体に、{value}の毒ダメージを与える。' }
    }],

    [POISON_MIST, {
        reqLvl: 10,
        base: '20-40',
        rate: 20,
        synerzy: 10,
        mp: 10,
        element: 'poison',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Poison Mist', b: '毒の霧' },
        radius: 2,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の毒ダメージを与える。' }
    }],

    [TOUCH_OF_CONFUSION, {
        reqLvl: 7,
        base: 20,
        rate: 5,
        synerzy: 3,
        mp: 10,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Touch of Confusion', b: '混乱の手' },
        perc: true,
        limit: 100,
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、物理攻撃に混乱の効果を{value}付与する。' }
    }],

    [VENOM_HANDS, {
        reqLvl: 15,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Venom Hands', b: '猛毒の手' },
        perc: true,
        reqSynerzy: 5,
        durBase: '50-100',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、物理攻撃に毒ダメージを{value}付与する。' }
    }],

    [SLEEPING_GAS, {
        reqLvl: 14,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Sleeping Gas', b: '睡眠ガス' },
        radius: 1,
        reqSynerzy: 5,
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、昏睡状態にする。' }
    }],

    [HOLD_MONSTER, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Hold Monster', b: 'モンスター束縛' },
        radius: 5,
        range: 0,
        reqSynerzy: 10,
        durBase: '3-6',
        durRate: 0,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、麻痺状態にする。' }
    }],

    [RESTORE_EXPERIENCE, {
        reqLvl: 21,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Experience', b: '経験値復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '失った経験値を回復する。' }
    }],

    [LOWER_RESIST, {
        reqLvl: 20,
        base: -20,
        rate: -3,
        synerzy: -1,
        mp: 20,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Lower Resist', b: '耐性低下' },
        radius: 1,
        perc: true,
        reqSynerzy: 10,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、全耐性を{value}低下させる。' }
    }],

    [RESIST_POISON, {
        reqLvl: 5,
        base: 10,
        rate: 5,
        synerzy: 1,
        mp: 10,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Resist Poison', b: '耐毒' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、毒の耐性を{value}上昇させる。' }
    }],

    [HALLUCINATING_MIST, {
        reqLvl: 22,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Hallucinating Mist', b: '幻覚の霧' },
        radius: 1,
        reqSynerzy: 10,
        durBase: '10-20',
        durRate: 2,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、幻覚状態にする。' }
    }],

    [CONFUSION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Confusion', b: '混乱' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、混乱状態にする。' }
    }],

    [POISON, {
        reqLvl: 0,
        base: 0,
        rate: 5,
        synerzy: 3,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Poison', b: '毒' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、毒状態にする。' }
    }],

    [PARALYSIS, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Paralysis', b: '麻痺' },
        durBase: '3-6',
        durRate: 0,
        desc: { a: '', b: '{dur}ターンの間、麻痺状態にする。' }
    }],

    [SLEEP, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Sleep', b: '睡眠' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、昏睡状態にする。' }
    }],

    [BLINDNESS, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Blindness', b: '盲目' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、盲目状態にする。' }
    }],

    [HALLUCINATION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Hallucination', b: '幻覚' },
        durBase: '10-20',
        durRate: 2,
        desc: { a: '', b: '{dur}ターンの間、幻覚状態にする。' }
    }],

    [POLYMORPH, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Polymorph', b: '変容' },
        desc: { a: '', b: '敵1体を、変容させる。' }
    }],

    [CANCELLATION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Cancellation', b: '封印' },
        durBase: '10-20',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、封印状態にする。' }
    }],

    [WEAKNESS, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Weakness', b: '薄弱' },
        desc: { a: '', b: '筋力を1低下させる。' }
    }],

    [CLUMSINESS, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Clumsiness', b: '不器用' },
        desc: { a: '', b: '器用さを1低下させる。' }
    }],

    [SICKLINESS, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Sickliness', b: '病弱' },
        desc: { a: '', b: '耐久力を1低下させる。' }
    }],

    [STUPIDITY, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Stupidity', b: '愚鈍' },
        desc: { a: '', b: '知力を1低下させる。' }
    }],

    [INFECTION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        lement: 'infection',
        kind: 'self',
        type: 'spell',
        name: { a: 'Infection', b: '感染' },
        durBase: '10-20',
        durRate: 2,
        desc: { a: '', b: '{dur}ターンの間、感染状態にする。' }
    }],

    [PESTILENCE, {
        reqLvl: 30,
        base: '50-100',
        rate: 20,
        synerzy: 10,
        mp: 30,
        element: 'infection',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Pestilence', b: '黒死病' },
        radius: 10,
        range: 0,
        reqSynerzy: 20,
        effect: { id: POISON, prob: 100 },
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の感染ダメージを与え、追加効果で、毒状態にする。' }
    }],

    [SANDSTORM, {
        reqLvl: 28,
        base: '20-150',
        rate: 20,
        synerzy: 10,
        mp: 25,
        element: 'sand',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Sandstorm', b: '砂嵐' },
        radius: 2,
        reqSynerzy: 10,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の砂ダメージを与える。' }
    }],

    [BLIZZARD, {
        reqLvl: 20,
        base: '20-120',
        rate: 20,
        synerzy: 10,
        mp: 20,
        element: 'blizzard',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Blizzard', b: '吹雪' },
        radius: 2,
        reqSynerzy: 10,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の吹雪ダメージを与える。' }
    }],

    [ACID_BALL, {
        reqLvl: 11,
        base: '30-60',
        rate: 20,
        synerzy: 10,
        mp: 10,
        element: 'acid',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Acid Ball', b: '酸のボール' },
        radius: 1,
        reqSynerzy: 5,
        desc: { a: '', b: '半径{radius}の範囲内の敵に、{value}の酸ダメージを与える。' }
    }],

    [LAVA_FLOW, {
        reqLvl: 20,
        base: '70-80',
        rate: 20,
        synerzy: 10,
        mp: 20,
        element: 'magma',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Lava Flow', b: '溶岩流' },
        penetrate: true,
        reqSynerzy: 10,
        desc: { a: '', b: '直線上の敵を貫通し、{value}の溶岩ダメージを与える。' }
    }],

    [CHAIN_DECAY, {
        reqLvl: 25,
        base: '50-60',
        rate: 20,
        synerzy: 10,
        mp: 25,
        element: 'radiation',
        kind: 'attack',
        type: 'spell',
        name: { a: 'Chain Decay', b: '連鎖崩壊' },
        penetrate: true,
        radius: 1,
        reqSynerzy: 10,
        desc: { a: '', b: '半径{radius}の範囲内の敵を貫通し、{value}の放射線ダメージを与える。' }
    }],

    [RADIATION, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'radiation',
        kind: 'self',
        type: 'spell',
        name: { a: 'Radiation', b: '放射線' },
        desc: { a: '', b: '敵1体のいずれかの能力値を1低下させる。' }
    }],

    [SHORT_TELEPORTATION, {
        reqLvl: 5,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'atom',
        kind: 'self',
        type: 'spell',
        name: { a: 'Short Teleportation', b: 'ショート・テレポート' },
        desc: { a: '', b: '近距離のランダムなテレポートを行う。' }
    }],

    [TELEPORTATION, {
        reqLvl: 10,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'atom',
        kind: 'self',
        type: 'spell',
        name: { a: 'Teleportation', b: 'テレポート' },
        desc: { a: '', b: '遠距離のランダムなテレポートを行う。' }
    }],

    [TELEPORT_AWAY, {
        reqLvl: 15,
        base: 10,
        rate: 2,
        synerzy: false,
        mp: 10,
        element: 'atom',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Teleport Away', b: 'テレポート・アウェイ' },
        radiusRate: true,
        penetrate: true,
        desc: { a: '', b: '直線上の敵を貫通し、半径{radiusRate}の範囲外へテレポートさせる。' }
    }],

    [DISINTEGRATION, {
        reqLvl: 30,
        base: 10,
        rate: 2,
        synerzy: false,
        mp: 30,
        element: 'atom',
        kind: 'self',
        type: 'spell',
        name: { a: 'Disintegration', b: '分解' },
        radiusRate: true,
        desc: { a: '', b: '半径{radiusRate}の範囲内の敵を、分解する。' }
    }],

    [TOWN_PORTAL, {
        reqLvl: 25,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'atom',
        kind: 'self',
        type: 'spell',
        name: { a: 'Town Portal', b: 'タウン・ポータル' },
        desc: { a: '', b: '街またはダンジョンに帰還するポータルを生成する。' }
    }],

    [TELEPORT_TO, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'atom',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Teleport To', b: '引き寄せ' },
        desc: { a: '', b: '敵1体を隣接へテレポートさせる。' }
    }],

    [ENCOURAGEMENT, {
        reqLvl: 1,
        base: 30,
        rate: 3,
        synerzy: false,
        mp: 5,
        element: 'fire',
        kind: 'self',
        type: 'spell',
        name: { a: 'Encouragement', b: '鼓舞' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、物理ダメージと命中率を{value}上昇させる。' }
    }],

    [BLESSING, {
        reqLvl: 1,
        base: 30,
        rate: 3,
        synerzy: false,
        mp: 5,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Blessing', b: '加護' },
        perc: true,
        durBase: '10-20',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、守備力を{value}上昇させる。' }
    }],

    //melee
    [FIST_OF_CONFUSION, {
        reqLvl: 5,
        base: -50,
        rate: 5,
        synerzy: 3,
        mp: 10,
        element: 'physical',
        kind: 'attack',
        type: 'melee',
        name: { a: 'Fist of Confusion', b: '混乱の拳' },
        perc: true,
        range: 1,
        effect: { id: CONFUSION, prob: 100 },
        desc: { a: '', b: '隣接する敵1体に、{value}の物理ダメージを与え、追加効果で、混乱状態にする。' }
    }],

    [RAID, {
        reqLvl: 10,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'physical',
        kind: 'attack',
        type: 'melee',
        name: { a: 'Raid', b: '急襲' },
        perc: true,
        move: true,
        parabora: true,
        desc: { a: '', b: '敵1体に飛びかかり、{value}の物理ダメージを与える。' }
    }],

    [COLLAPSE, {
        reqLvl: 25,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 20,
        element: 'earth',
        kind: 'attack',
        type: 'melee',
        name: { a: 'Collapse', b: '崩落' },
        perc: true,
        move: true,
        radius: 5,
        reqSynerzy: 10,
        parabora: true,
        desc: { a: '', b: '任意の場所へ飛びかかり、半径{radius}の範囲内の敵に、{value}の土ダメージを与える。' }
    }],

    [RUSH, {
        reqLvl: 15,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'physical',
        kind: 'attack',
        type: 'melee',
        name: { a: 'Rush', b: '突進' },
        perc: true,
        move: true,
        penetrate: true,
        range: 5,
        reqSynerzy: 5,
        desc: { a: '', b: '直線上の敵を駆け抜け、{value}の物理ダメージを与える。' }
    }],

    [SPIRAL, {
        reqLvl: 30,
        base: 0,
        rate: 5,
        synerzy: 3,
        mp: 20,
        element: 'physical',
        kind: 'attack',
        type: 'melee',
        name: { a: 'Spiral', b: '螺旋' },
        perc: true,
        move: true,
        penetrate: true,
        range: 5,
        each: true,
        radius: 1,
        reqSynerzy: 20,
        desc: { a: '', b: '1マス毎に、直線上及び隣接する敵を駆け抜け、{value}の物理ダメージを与える。' }
    }],

    //missile
    [PIERCING_ARROW, {
        reqLvl: 1,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'physical',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Piercing Arrow', b: '貫通の矢' },
        perc: true,
        penetrate: true,
        desc: { a: '', b: '直線上の敵を貫通する矢を放ち、{value}の物理ダメージを与える。' }
    }],

    [PARALYZING_ARROW, {
        reqLvl: 5,
        base: -50,
        rate: 5,
        synerzy: 3,
        mp: 5,
        element: 'physical',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Paralyzing Arrow', b: '麻痺の矢' },
        perc: true,
        parabora: true,
        effect: { id: PARALYSIS, prob: 100 },
        desc: { a: '', b: '放物線を描く矢を放ち、敵1体に、{value}の物理ダメージを与え、追加効果で、麻痺状態にする。' }
    }],

    [EXPLODING_ARROW, {
        reqLvl: 10,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'fire',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Exploding Arrow', b: '爆発の矢' },
        perc: true,
        radius: 1,
        parabora: true,
        desc: { a: '', b: '放物線を描く矢を放ち、半径{radius}の範囲内の敵に、{value}の火ダメージを与える。' }
    }],

    [FREEZING_ARROW, {
        reqLvl: 15,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'cold',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Freezing Arrow', b: '凍結の矢' },
        perc: true,
        effect: { id: FREEZE, prob: 100 },
        parabora: true,
        desc: { a: '', b: '放物線を描く矢を放ち、敵1体に、{value}の氷ダメージを与え、凍結させる。' }
    }],

    [PHOTON_ARROW, {
        reqLvl: 20,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 15,
        element: 'light',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Photon Arrow', b: '光子の矢' },
        perc: true,
        penetrate: true,
        effect: { id: ACCELERATION, prob: 100, self : true },
        reqSynerzy: 10,
        desc: { a: '', b: '放物線を描く矢を放ち、素早い動作で、敵1体に、{value}の光ダメージを与える。' }
    }],

    [APOLLOS_ARROW, {
        reqLvl: 30,
        base: 100,
        rate: 20,
        synerzy: 10,
        mp: 20,
        element: 'fire',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Apollo\'s Arrow', b: 'アポロンの矢' },
        perc: true,
        radius: 5,
        reqSynerzy: 20,
        parabora: true,
        effect: { id: INFECTION, prob: 20 },
        desc: { a: '', b: '放物線を描く矢を放ち、半径{radius}の範囲内の敵に、{value}の火ダメージを与え、追加効果で、感染状態にする。' }
    }],

    //enemy
    [FIRE_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'fire',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Fire Breath', b: '火炎のブレス' }
    }],

    [AQUA_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'water',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Aqua Breath', b: '水のブレス' }
    }],

    [WIND_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'air',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Wind Breath', b: '風のブレス' }
    }],

    [POISON_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'poison',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Poison Breath', b: '毒のブレス' }
    }],

    [LIGHT_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'light',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Light Breath', b: '閃光のブレス' }
    }],

    [COLD_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'cold',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Cold Breath', b: '冷気のブレス' }
    }],

    [LIGHTNING_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'lightning',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Lightning Breath', b: '稲妻のブレス' }
    }],

    [GRAVITY_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'gravity',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Gravity Breath', b: '重力のブレス' }
    }],

    [INFECTION_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'infection',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Infection Breath', b: '感染のブレス' }
    }],

    [BLIZZARD_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'blizzard',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Blizzard Breath', b: '吹雪のブレス' }
    }],

    [DUST_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'sand',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Dust Breath', b: '砂塵のブレス' }
    }],

    [ACID_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'acid',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Acid Breath', b: '酸のブレス' }
    }],

    [MAGMA_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'magma',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Magma Breath', b: '溶岩のブレス' }
    }],

    [RADIOACTIVE_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'radiation',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Radioactive Breath', b: '放射能のブレス' }
    }],
]);

{
    if (TOTAL_SKILL_NUM < skillMap.size) throw new Error('Incorrect skill numbers');
    for (let [id, skill] of skillMap.entries()) {
        skill.id = id;
        skill.color = colorList[skill.element];
    }
}
const investigationMap = new Map([
    ['race', {
        name: { a: 'Race', b: '種族' },
        char: true,
    }],

    ['lvl', {
        name: { a: 'Level', b: 'レベル' },
        char: true,
        max: 'lvlMax',
    }],

    ['exp', {
        name: { a: 'Exp', b: '経験値' },
        char: true,
        max: 'expMax',
    }],

    ['expNext', {
        name: { a: 'Exp Next', b: '次経験値' },
        char: true,
    }],

    ['expGain', {
        name: { a: 'Exp Gain', b: '取得経験値' },
        char: true,
    }],

    ['totalWeight', {
        name: { a: 'Total Weight', b: '総重量' },
        char: true,
        weight: true,
        max: 'weightLimit',
    }],

    ['weight', {
        name: { a: 'Weight', b:'重量' },
        item: true,
        weight: true,
    }],

    ['reqStr', {
        name: { a: 'Strength Requirement', b:'必要筋力' },
        item: true,
    }],

    ['charges', {
        name: { a: 'Charges', b:'充填数' },
        item: true,
    }],

    ['atkType', {
        name: { a: 'Attack Type', b: '攻撃種類' },
    }],

    ['dmgValue', {
        name: { a: 'Damage', b: 'ダメージ' },
        item: true,
    }],

    ['dmgAvg', {
        name: { a: 'Averate Damage', b: '平均ダメージ' },
        char: true,
        equipList: true,
    }],

    ['dmgSValue', {
        name: { a: 'Slash Damage', b: '斬ダメージ' },
        char: true,
    }],

    ['dmgTValue', {
        name: { a: 'Thrust Damage', b: '突ダメージ' },
        char: true,
    }],

    ['dmgBValue', {
        name: { a: 'Blunt Damage', b: '打ダメージ' },
        char: true,
    }],

    ['timesMelee', {
        name: { a: 'Melee Attack Times', b: '近接攻撃回数' },
        char: true,
    }],

    ['timesMissile', {
        name: { a: 'Missile Attack Times', b: '遠隔攻撃回数' },
        char: true,
    }],

    ['rateValue', {
        name: { a: 'Hit Rating', b: '命中値' },
        char: true,
        equipList: true,
    }],

    ['acAvgValue', {
        name: { a: 'Average Defence', b: '平均守備力' },
        item: true,
    }],

    ['acSValue', {
        name: { a: 'Slash Defence', b: '斬守備力 ' },
        item: true,
    }],

    ['acTValue', {
        name: { a: 'Thrust Defence', b: '突守備力 ' },
        item: true,
    }],

    ['acBValue', {
        name: { a: 'Blunt Defence', b: '打守備力 ' },
        item: true,
    }],

    ['acAvgValueTotal', {
        name: { a: 'Average Defence', b: '平均守備力' },
        char: true,
        equipList: true,
    }],

    ['acSValueTotal', {
        name: { a: 'Slash Defence', b: '斬守備力' },
        char: true,
    }],

    ['acTValueTotal', {
        name: { a: 'Thrust Defence', b: '突守備力' },
        char: true,
    }],

    ['acBValueTotal', {
        name: { a: 'Blunt Defence', b: '打守備力' },
        char: true,
    }],

    ['spdMeleeRate', {
        name: { a: 'Melee Attack Speed', b: '近接攻撃速度' },
        perc: true,
        char: true,
        equipList: true,
    }],
    
    ['spdMissileRate', {
        name: { a: 'Missile Attack Speed', b: '遠隔攻撃速度' },
        perc: true,
        char: true,
        equipList: true,
    }],
    
    ['spdSpellRate', {
        name: { a: 'Spell Cast Speed', b: '魔法詠唱速度' },
        perc: true,
        char: true,
        equipList: true,
    }],
    
    ['spdMoveRate', {
        name: { a: 'Move Speed', b: '移動速度' },
        perc: true,
        char: true,
        equipList: true,
    }],
    
    ['right', null],
    
    ['statPoints', {
        name: { a: 'Stat Points', b: 'ステータスポイント' },
        char: true,
        equipList: true,
    }],

    ['skillPoints', {
        name: { a: 'Skill Points', b: 'スキルポイント' },
        char: true,
        equipList: true,
    }],

    ['fuelLvl', {
        name: { a: 'Fuel Level', b: '燃料残量' },
        item: true,
        perc: true,
    }],

    ['durab', {
        name: { a: 'Durability', b: '耐久度' },
        item: true,
        max: 'durabMax'
    }],

    ['iasBase', {
        name: { a: 'Base Attack Speed', b: '基礎攻撃速度' },
        perc: true,
        plus: true,
        item: true,
    }],
    
    ['fcrBase', {
        name: { a: 'Base Cast Speed', b: '基礎詠唱速度' },
        perc: true,
        plus: true,
        item: true,
    }],
    
    ['frwBase', {
        name: { a: 'Base Move Speed', b: '基礎移動速度' },
        perc: true,
        plus: true,
        item: true,
    }],
    
    ['material', {
        name: { a: 'Material', b: '素材' },
        item: true,
    }],
    
    ['embeddedNum', {
        name: { a: 'Embedded Number', b: '埋め込み数' },
        item: true,
        max: 'embeddedMax'
    }],
    
    ['mod', null],
    
    ['hp', {
        name: { a: 'Life', b: '体力' },
        plus: true,
        max: 'hpMax',
    }],
    
    ['mp', {
        name: { a: 'Mana', b: '魔力' },
        plus: true,
        max: 'mpMax',
    }],
    
    ['str', {
        name: { a: 'Strength', b: '筋力' },
        plus: true,
        max: 'strMax',
    }],
    
    ['dex', {
        name: { a: 'Dexterity', b: '器用さ' },
        plus: true,
        max: 'dexMax',
    }],
    
    ['con', {
        name: { a: 'Constitution', b: '耐久力' },
        plus: true,
        max: 'conMax',
    }],
    
    ['int', {
        name: { a: 'Intelligence', b: '知力' },
        plus: true,
        max: 'intMax',
    }],
    
    ['spd', {
        name: { a: 'Speed', b: '速度' },
        plus: true,
        perc: true,
        max: 'spdMax',
    }],
    
    ['resistAll', {
        name: { a: 'Resist All', b: '全耐性' },
        plus: true,
        perc: true,
        item: true,
    }],
    
    ['fire', {
        name: { a: 'Fire Resist', b: '耐火' },
        plus: true,
        perc: true,
        max: 'fireMax',
        equipList: true,
    }],
    
    ['water', {
        name: { a: 'Water Resist', b: '耐水' },
        plus: true,
        perc: true,
        max: 'waterMax',
        equipList: true,
    }],
    
    ['air', {
        name: { a: 'Air Resist', b: '耐風' },
        plus: true,
        perc: true,
        max: 'airMax',
        equipList: true,
    }],
    
    ['earth', {
        name: { a: 'Earth Resist', b: '耐土' },
        plus: true,
        perc: true,
        max: 'earthMax',
        equipList: true,
    }],
    
    ['poison', {
        name: { a: 'Poison Resist', b: '耐毒' },
        plus: true,
        perc: true,
        max: 'poisonMax',
        equipList: true,
    }],
    
    ['physical', {
        name: { a: 'Physical Resist', b: '耐物' },
        plus: true,
        perc: true,
        max: 'physicalMax',
    }],
    
    ['end', null],
    
    ['skillFire', {
        name: { a: 'Fire Skill', b: '火スキル' },
        plus: true,
    }],
    
    ['skillWater', {
        name: { a: 'Water Skill', b: '水スキル' },
        plus: true,
    }],
    
    ['skillAir', {
        name: { a: 'Air Skill', b: '風スキル' },
        plus: true,
    }],
    
    ['skillEarth', {
        name: { a: 'Earth Skill', b: '土スキル' },
        plus: true,
    }],
    
    ['skillPoison', {
        name: { a: 'Poison Skill', b: '毒スキル' },
        plus: true,
    }],
    
    ['skillAll', {
        name: { a: 'All Skill ', b: '全スキル' },
        plus: true,
    }],
    
    ['synerzyMelee', {
        name: { a: 'Melee Synerzy', b: '近接シナジー' },
        char: true,
        plus: true,
        margin: true,
    }],
    
    ['synerzyMissile', {
        name: { a: 'Missile Synerzy', b: '遠隔シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyFire', {
        name: { a: 'Fire Spell Synerzy', b: '火魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyWater', {
        name: { a: 'Water Spell Synerzy', b: '水魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyAir', {
        name: { a: 'Air Spell Synerzy', b: '風魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyEarth', {
        name: { a: 'Earth Spell Synerzy', b: '土魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyPoison', {
        name: { a: 'Poison Spell Synerzy', b: '毒魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['ias', {
        name: { a: 'Increase Attack Speed', b: '攻撃速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['fcr', {
        name: { a: 'Faster Cast Rate', b: '詠唱速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['frw', {
        name: { a: 'Faster Run Walk', b: '早足' },
        plus: true,
        perc: true,
    }],
    
    ['digest', {
        name: { a: 'Slow Digestion', b: '遅消化' },
        plus: true,
        perc: true,
    }],
    
    ['stealth', {
        name: { a: 'Stealth', b: '隠密' },
        plus: true,
        perc: true,
    }],
    
    ['searching', {
        name: { a: 'Searching', b: '捜索' },
        plus: true,
        perc: true,
    }],
    
    ['hpReg', {
        name: { a: 'Life Regeneration', b: '再生' },
        plus: true,
        perc: true,
    }],
    
    ['mpReg', {
        name: { a: 'Mana Regeneration', b: '魔力再生' },
        plus: true,
        perc: true,
    }],
    
    ['mf', {
        name: { a: 'Magic Finding', b: '魔法具探求' },
        plus: true,
        perc: true,
    }],
    
    ['gf', {
        name: { a: 'Gold Finding', b: '財宝探求' },
        plus: true,
        perc: true,
    }],
    
    ['expBonus', {
        name: { a: 'Experience Bonus', b: '経験値加算値' },
        plus: true,
        perc: true,
    }],
    
    ['lighten', {
        name: { a: 'Lighten', b: '照明' },
        plus: true,
    }],
    
    ['fuelBonus', {
        name: { a: 'Fuel Bonus', b: '燃料加算値' },
        item: true,
        plus: true,
        perc: true,
    }],
    
    ['numBoxes', {
        name: { a: 'Slot numbers', b: 'スロット数' },
        plus: true,
    }],

    ['dmgMinBonus', {
        name: { a: 'Minimum Damage Bonus', b: '最小ダメージ加算値' },
        plus: true,
    }],
    
    ['dmgMaxBonus', {
        name: { a: 'Maximum Damage Bonus', b: '最大ダメージ加算値' },
        plus: true,
    }],
    
    ['dmgBonus', {
        name: { a: 'Damage Bonus', b: 'ダメージ加算値' },
        plus: true,
        perc: true,
    }],
    
    ['rateBonus', {
        name: { a: 'Hit Rating Bonus', b: '命中率加算値' },
        plus: true,
        perc: true,
    }],
    
    ['acBonus', {
        name: { a: 'Defence Bonus', b: '守備力加算値' },
        plus: true,
        perc: true,
    }],
    
    ['durabBonus', {
        name: { a: 'Durability Bonus', b: '耐久度加算値' },
        item: true,
        plus: true,
    }],
    
    ['embeddedBonus', {
        name: { a: 'Embedded Bonus', b: '埋め込み加算値' },
        item: true,
        plus: true,
    }],
    
    ['digging', {
        name: { a: 'Digging', b: '採掘' },
        plus: true,
        perc: true,
    }],
    
    ['dmgHuman', {
        name: { a: 'Damage to Human', b: '対人間ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgDemon', {
        name: { a: 'Damage to Demon', b: '対悪魔ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgAnimal', {
        name: { a: 'Damage to Animal', b: '対動物ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgDragon', {
        name: { a: 'Damage to Dragon', b: '対竜ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgUndead', {
        name: { a: 'Damage to Undead', b: '対不死ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgGiant', {
        name: { a: 'Damage to Giant', b: '対巨人ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgSpirit', {
        name: { a: 'Damage to Spirit', b: '対精霊ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgGod', {
        name: { a: 'Damage to God', b: '対神ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgFire', {
        name: { a: 'Fire Damage', b: '火ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgLightning', {
        name: { a: 'Lightning Damage', b: '電撃ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgPoison', {
        name: { a: 'Poison Damage', b: '毒ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgAcid', {
        name: { a: 'Acid Damage', b: '酸ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['stealLife', {
        name: { a: 'Life Steal', b: '生命力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['stealMana', {
        name: { a: 'Mana Steal', b: '魔力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['atkCon', {
        name: { a: 'Confusion Attack', b: '混乱攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkPara', {
        name: { a: 'Paralysis Attack', b: '麻痺攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkSlow', {
        name: { a: 'Slow Attack', b: '減速攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkInf', {
        name: { a: 'Infection Attack', b: '感染攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkBlind', {
        name: { a: 'Blindness Attack', b: '盲目攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkRadi', {
        name: { a: 'Radioactive Attack', b: '放射能攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkCold', {
        name: { a: 'Freezing Attack', b: '凍結攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkDrain', {
        name: { a: 'Drain Attack', b: '吸収攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealGold', {
        name: { a: 'Gold Steal', b: '金貨強奪' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealItem', {
        name: { a: 'Item Steal', b: 'アイテム強奪' },
        plus: true,
        perc: true,
    }],
    
    ['strSus', {
        name: { a: 'Sustain Strength', b: '筋力維持' },
        bool: true,
    }],
    
    ['dexSus', {
        name: { a: 'Sustain Dexterity', b: '器用さ維持' },
        bool: true,
    }],
    
    ['conSus', {
        name: { a: 'Sustain Constitution', b: '耐久力維持' },
        bool: true,
    }],
    
    ['intSus', {
        name: { a: 'Sustain Intelligence', b: '知力維持' },
        bool: true,
    }],
    
    ['levi', {
        name: { a: 'Levitation', b: '浮遊' },
        bool: true,
    }],
    
    ['indestructible', {
        name: { a: 'Indestructible', b: '破壊不能' },
        bool: true,
    }],
    
    ['teleported', {
        name: { a: 'Random Teleportation', b: 'ランダム・テレポート' },
        bool: true,
    }],
    
    ['aggravating', {
        name: { a: 'Aggravate Monster', b: '反感' },
        bool: true,
    }],
]);
const investigation = {
    main(obj, direction, char) {
        let inv = this.list[char ? 'fighter' : 'item'];
        inv.show = true;
        if (!char) {
            Vue.nextTick(function(){
                let ele = vue.$refs.investigationItem.$el;
                ele.style.left = direction === DR_RIGHT ? '50%' : '0';
            });
        }

        let objVue = {};
        if (obj.shadow) objVue.shadow = obj.shadow;
        if (obj.stroke) objVue.stroke = obj.stroke;
        objVue.symbolColor = obj.color;
        objVue.symbol = obj.symbol;
        let nameColor;
        if (obj.cursed) {
            nameColor = colorList.red;
        } else if (obj.equipable && !obj.durab) {
            nameColor = colorList.gray;
        } else {
            nameColor = colorList.white;
        }

        objVue.nameColor = nameColor;
        objVue.name = char ? obj.getName(false, true) : obj.getName(false, 1);

        let desc = '';
        if (obj.desc) {
            desc = obj.desc[option.getLanguage()];
        } else if (obj.nameSkill) {
            desc = rogue.getSkillInfo(skillMap.get(obj.nameSkill), obj.skillLvl, true);
        }

        inv.desc = desc
        inv.obj = objVue;

        let embeddedList = [];
        let mod;
        let propList = [];
        for (let [key, term] of investigationMap.entries()) {
            if (!term) {
                if (key === 'mod' && !char) {
                    inv.basePropList = propList;    
                    propList = [];
                    mod = true;
                    if (obj.modParts) break;
				}
				
                continue;
			}

            if (!char && (term.char || mod&&!obj[key]) ||
                char && term.item ||
                obj[key] === undefined) {
				continue;
            }
            
            this.loop(obj, propList, char, key, term, obj[key], mod);
            if (key === 'embeddedNum' && obj[key]) {
                for (let k = 0, l = obj.embeddedList.length; k < l; k++) {
                    let itemVue = {};
                    let item = obj.embeddedList[k]
                    itemVue.symbol = item.symbol;
                    itemVue.symbolColor = item.color;
                    itemVue.name = item.getName();
                    if (item.shadow) itemVue.shadow = item.shadow;
                    if (item.cursed) itemVue.nameColor = colorList.red;
                    embeddedList.push(itemVue);
                }
			}
        }
        
        if (char) {
            inv.basePropList = propList;
            return;
        }

        inv.embeddedList = embeddedList;
        inv.modPropList = propList;
        let modPartsList = {};
        if (obj.modParts) {
            for (let key in obj.modParts) {
                propList = [];
                let objMod = obj.modParts[key];
                if (obj.type === 'orb') {
                    for (let key2 in objMod) {
                        let term = investigationMap.get(key2);
                        this.loop(obj, propList, false, key2, term, objMod[key2], true);
                    }
                } else {
                    let mod;
                    for (let [key2, term] of investigationMap.entries()) {
                        if (!mod || !term || term.char || !objMod[key2]) {
                            if (key2 === 'mod') mod = true;
                            continue;
                        }

                        this.loop(obj, propList, false, key2, term, objMod[key2], true);
                    }
                }

                let parts = option.isEnglish() ? key : translation.item[key];
                modPartsList[parts] = propList;
            }
        }

        inv.modPartsList = modPartsList;
        inv.skills = [];
        if (obj.type === 'book' && obj.list) {
            let [element, reqLv, reqSy] = option.isEnglish() ?
                ['Element', 'RLv', 'RSy'] :
                ['属性', '必レ', '必シ'];
            let header = {
                element: element,
                reqLv: reqLv,
                reqSy: reqSy
            };

            inv.skills.push(header);
            let list = obj.list;
            for (let key in list) {
                let skillVue = {};
                let id = list[key];
                let skill = skillMap.get(id);
                let element = skill.element;
                skillVue.shadow = colorList[element];
                skillVue.element = option.isEnglish() ? getUpperCase(element) : translation.element[element];
                skillVue.name = skill.name[option.getLanguage()];
                skillVue.mp = skill.mp;
                skillVue.reqLv = skill.reqLvl;
                skillVue.reqSy = skill.reqSynerzy;
                inv.skills.push(skillVue);
            }
        }
    },

    loop(obj, propList, char, key, term, value, mod) {
        let prop = {};
        prop.text = term.name[option.getLanguage()];
        if (term.plus && !char && value > 0) value = '+' + value;
        if (term.perc) value += '%';
        if (term.weight) value += 'kg';
        if (key === 'atkType') {
            value = this.getAtkTypeName(obj.atkType);
        } else if (key === 'race') {
            value = this.getRaceName(obj.race);
        } else if (char) {
            if (obj.findBuffStat(key) || obj.modList &&
            (obj.modList[key] || obj.modList['resistAll'] &&
            (key === 'fire' || key === 'water' || key === 'air' || key === 'earth' || key === 'poison'))) {
                prop.shadow = colorList.buff;
            }
        } else if (mod) {
            prop.shadow = colorList.buff;
        }

        if (term.max && obj[term.max] !== undefined) {
            let max = obj[term.max];
            if (term.perc) max += '%';
            if (term.weight) max += 'kg';
            value += ` (${max})`;
        }

        // if (term.base && obj[term.base] !== undefined) {
        //     let base = obj[term.base];
        //     value += ` [${base}]`;
        // }

        if (term.bool) {
            if (value) {
                if (!char && mod) {
                    value = '';
                } else {
                    value = option.isEnglish() ? 'yes' : '有り';
                }
            } else {
                value = option.isEnglish() ? 'no' : '無し';
            }
        }
        
        if (key === 'material') {
            value = materialMap.get(value).name[option.getLanguage()];
        }
        
        prop.value = value;
        propList.push(prop);
    },

    skill(fighter, skill) {
        let inv = this.list.skill;
        inv.show = true;
        let objVue = {};
        objVue.shadow = skill.color;
        objVue.name = skill.name[option.getLanguage()];
        inv.obj = objVue;

        let lvl = 0;
        let a = fighter.searchSkill(skill.id);
        if (a) lvl = fighter.skill[a].lvl;
        let boost = fighter.getSkillBoost(skill);
        inv.desc = fighter.getSkillInfo(skill, lvl + boost);

        let basePropList = [];
        let prop = {};
        prop.text = option.isEnglish() ? 'Element' : '属性';
        prop.value = option.isEnglish() ? getUpperCase(skill.element) : translation.element[skill.element];
        prop.shadow = skill.color;
        basePropList.push(prop);

        let [base, perLvl, perSy, durBase, limit] = option.isEnglish() ?
            ['Base', 'per Level', 'per Synerzy', 'Duration Base', 'Max Limit'] :
            ['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値', '上限'];
        let perc = skill.perc ? '%' : '';
        if (skill.rate) {
            let skillBase = skill.base;
            if (isFinite(skillBase) && perc && skillBase > 0) {
                skillBase = '+' + skillBase;
			} else if (skill.radiusRate) {
				skillBase = (option.isEnglish() ? 'radius ' : '半径') + skillBase;
            }
            
            prop = {};
            prop.text = base;
            prop.value = skillBase +perc;
            basePropList.push(prop);

            if (!isFinite(skill.base)) perc = '%';
            let sign = skill.rate > 0 ? '+' : '';
            prop = {};
            prop.text = perLvl;
            prop.value = sign + skill.rate + perc;
            basePropList.push(prop);
		}
		
        if (skill.synerzy) {
            let sign = skill.synerzy > 0 ? '+' : '';
            prop = {};
            prop.text = perSy;
            prop.value = sign + skill.synerzy + perc;
            basePropList.push(prop);
		}
		
        if (skill.limit) {
            let perc = skill.perc ? '%' : '';
            let sign = '+';
            prop = {};
            prop.text = limit;
            prop.value = sign + skill.limit + perc;
            basePropList.push(prop);
        }
        
        if (skill.durBase) {
            prop = {};
            prop.text = durBase;
            prop.value = skill.durBase;
            basePropList.push(prop);
		}
		
        if (skill.durRate) {
            let sign = skill.durRate > 0 ? '+' : '';
            prop = {};
            prop.text = perLvl;
            prop.value = sign + skill.durRate;
            basePropList.push(prop);
        }
        
        inv.basePropList = basePropList;
    },

    clear() {
        for (let key in this.list) {
            this.list[key].show = false;
        }
    },

    scroll(key, init) {
        if (init) {
            this.eleP = vue.$refs.investigationFighter.$refs.fighterPropList;
            this.eleC = this.eleP.firstElementChild;
            message.draw(message.get(M_CHARACTER) + message.get(M_SCROLL), true);
        } else if (flag.examine && key === 'c') {
            flag.character = false;
            inventory.clear();
            rogue.examineMsg();
            return;
        }

        input.scroll(this.eleP, this.eleC, key, init);
    },

    getAtkTypeName(at) {
        let name = '';
        let isEng = option.isEnglish();
        if (at & AT_SLASH) name += isEng ? 'Slash・' : '斬・';
        if (at & AT_THRUST) name += isEng ? 'Thrust・' : '突・';
        if (at & AT_BLUNT) name += isEng ? 'Blunt・' : '打・';
        return name ? name.replace(/・$/, '') : '-';
    },

    getRaceName(race) {
        let name = '';
        let isEng = option.isEnglish();
        if (race & RACE_HUMAN) name += isEng ? 'Human・' : '人間・';
        if (race & RACE_ANIMAL) name += isEng ? 'Animal・' : '動物・';
        if (race & RACE_DEMON) name += isEng ? 'Demon・' : '悪魔・';
        if (race & RACE_UNDEAD) name += isEng ? 'Undead・' : '不死・';
        if (race & RACE_DRAGON) name += isEng ? 'Dragon・' : '竜・';
        if (race & RACE_GIANT) name += isEng ? 'Giant・' : '巨人・';
        if (race & RACE_SPIRIT) name += isEng ? 'Spirit・' : '精霊・';
        if (race & RACE_GOD) name += isEng ? 'God・' : '神・';
        return name ? name.replace(/・$/, '') : '-';
    }
};

{
    investigation.list = {};
    investigation.list.item = {
        obj: {},
        desc: '',
        basePropList: [],
        embeddedList: [],
        modPropList: [],
        modPartsList: {},
        show: false,
    };

    investigation.list.skill = {
        obj: {},
        desc: '',
        basePropList: [],
        show: false,
    };

    investigation.list.fighter = {
        obj: {},
        desc: '',
        basePropList: [],
        show: false,
    };

}
const Data = class {
    constructor() {
        this.convertCe(true);
        this.saveItemTab();
        this.coords = map.coords;
        this.option = option;
        this.messageList = message.list;
        if (rogue.cdl) this.stashList = map.stashList;
        this.track = audio.curTrack;
        this.date = new Date();
        this.ver = VERSION;
    }

    loadInit() {
        display.clearAll();
        this.loadOption();
        getRndName.init();
        this.loadItemTab();
        this.loadCoords();
        message.list = this.messageList;
        vue.msgList = message.list;
        if(this.ver < 0.003) {
            rogue.litMapIds = this.litMapIds;
            rogue.inferno = this.difficulty.inferno;
        }

        if (rogue.cdl) {
            this.loadItem(this.stashList);
            map.stashList = this.stashList;
        }

        this.convertCe();
        vue.rogue = rogue;
        vue.isEnglish = option.isEnglish();
        initFlag();
        rogue.litMapIds = {};
        rogue.lightenOrDarken('Lighten');
        map.redraw();
        this.loadAudio();
        creation.setList();
    }

    saveItemTab() {
        this.itemTab = {};
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe' && key !== 'orb') continue;
            this.itemTab[key] = [];
            for (let [tabId, item] of itemTab[key].entries()) {
                let thisItem = {};
                thisItem.identified = item.identified;
                thisItem.name = {};
                thisItem.name['a'] = item.name['a'];
                thisItem.name['b'] = item.name['b'];
                if (key === 'potion' || key === 'wand') thisItem.color = item.color;
                this.itemTab[key][tabId] = thisItem;
            }
        }
    }

    loadItemTab() {
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe' && key !== 'orb') continue;
            if (this.ver < 0.007 && key === 'orb') continue;
            if (this.ver < 0.009 && key === 'recipe') {
                for (let item of itemTab[key].values()) {
                    item.identified = false;
                    getRndName[key](item);
                }

                continue;
            }

            for (let [tabId, item] of itemTab[key].entries()) {
                let thisItem = this.itemTab[key][tabId];
                if (!thisItem) {
                    item.identified = false;
                    getRndName[key](item);
                    continue;
                }

                item.identified = thisItem.identified;
                item.name['a'] = thisItem.name['a'];
                item.name['b'] = thisItem.name['b'];
                if (key === 'potion' || key === 'wand') item.color = thisItem.color;
            }
        }
    }

    loadCoords() {
        map.coords = this.coords;
        map.init(false, true);
        for (let locs of map.coords) {
            for (let loc of locs) {
                loc.__proto__ = Location.prototype;
                if (loc.fighter) this.loadFighter(loc.fighter);
                if (loc.item['a']) this.loadItem(loc.item, true);
                if (loc.enter) this.loadEntrance(loc.enter);
                if (loc.trap) { 
                    loc.trap.__proto__ = Trap.prototype;
                    map.trapList[loc.x + ',' + loc.y] = loc.trap;
                }

                if (loc.stairs) {
                    loc.stairs.__proto__ = Staircase.prototype;
                    map.staircaseList[loc.x + ',' + loc.y] = loc.stairs;
                }
            }
        }
    }

    loadFighter(fighter) {
        if (fighter.id === ID_ROGUE) {
            fighter.__proto__ = Rogue.prototype;
            rogue = fighter;
            if (this.ver < 0.009) {
                rogue.recipes = {};
                for (let key of itemTab['recipe'].keys()) {
                    rogue.recipes[key] = true;
                }
            }
        } else {
            fighter.__proto__ = Enemy.prototype;
            map.enemyList[fighter.id] = fighter;
        }

        map.queue.push(fighter);
        this.loadItem(fighter.boxes);
        this.loadItem(fighter.equipment);
        this.loadItem(fighter.side);
        this.loadItem(fighter.pack);
        if (this.ver < 0.007) {
            fighter.calcHP();
            fighter.calcMP();
        }
    }

    loadItem(list, floor) {
        for (let key in list) {
            let item = list[key]; 
            if (!item) continue;
            item.__proto__ = Item.prototype;
            if (floor) map.itemList[item.id] = item;
            if (item.embeddedList && item.embeddedList.length) this.loadItem(item.embeddedList);
            if (this.ver < 0.006 && item.type === 'gem') item.material = undefined;
            if (this.ver < 0.008 && item.type === 'material') item.tabId = materialList.indexOf(item.material);
        }
    }

    loadEntrance(enter) {
        if (enter.shop || enter.stash) this.loadItem(enter.list);
        if (enter.stash) map.stashList = enter.list;
        if (enter.portal) {
            map.portal = enter;
            enter.__proto__ = Portal.prototype;
        } else {
            enter.__proto__ = Entrance.prototype;
        }
    }

    loadOption() {
        for (let key in option.list) {
            let key2 = option.list[key]['key'];
            if (!this.option[key2]) {
                this.option[key2] = {};
                this.option[key2].user = option[key2].default;
            }

            option[key2].user = this.option[key2].user;
        }
    }

    /* TODO */
    convertCe(save) {
        if (rogue.ce) rogue.ce = save ? rogue.ce.id : map.enemyList[rogue.ce];
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            if (enemy.ce) {
                if (save) {
                    enemy.ce = enemy.ce.id;
                } else {
                    enemy.ce = enemy.ce === ID_ROGUE ? rogue : map.enemyList[enemy.ce];
                }
            }
        }
    }

    loadAudio() {
        audio.stop(audio.curTrack);
        audio.curTrack = this.track;
        let a = this.option['BGM'].user;
        audio.volBGM = option['BGM'].select[a].a / 10;
        a = this.option['SE'].user;
        audio.volSE = option['SE'].select[a].a / 10;
        audio.playMusic(audio.curTrack);
    }
}

const data = {
    name: 'Player',
    getName() {
        return `dnb_v0.1xx_${this.name}`;
    },

    save(unload) {
        if (unload && audio.curTrack) audio.music[audio.curTrack].pause();
        if (flag.died || flag.retry || flag.title || this.error) {
            return;
        } else if (flag.synthesize) {
            rogue.returnCubeItem();
        }

        cursor.clearAll();
        message.draw(option.isEnglish() ? 'Saved' : '記録した');
        let saveData = new Data();
        localStorage.setItem(this.getName(), JSON.stringify(saveData));
    },

    load() {
        let saveData = JSON.parse(localStorage.getItem(this.getName()));
        if (saveData !== null) {
            saveData.__proto__ = Data.prototype;
            try {
                saveData.loadInit();
                message.draw(option.isEnglish() ? 'Loaded' : '記録を読み込んだ');
            } catch (e) {
                console.log(e);
                let ver = saveData.ver;
                vue.verData = ver;
                flag.regular = false;
                flag.failed = true;
            }
        } else {
            game.start();
        }
    },

    delete() {
        localStorage.removeItem(this.getName());
    },

    exit() {
        this.save();
        game.quit('Y', true);
    },

    dontSave() {
        this.error = true;
        message.draw(option.isEnglish() ?
            'Error occurred' :
            'エラーが発生した');
    }
};

{
    window.addEventListener('beforeunload', data.save.bind(data, true), false);
    window.addEventListener('error', data.dontSave.bind(data), false);
}
const [
    AUDIO_IN,
    AUDIO_OUT
] = enums(1, 2);

const audio = {
    volBGM: 1,
    volSE: 1,
    music: {
        title: new Audio('music/title.ogg'),
        town: new Audio('music/town.ogg'),
        town2: new Audio('music/town2.ogg'),
        dungeon: new Audio('music/dungeon.ogg'),
        dungeon2: new Audio('music/dungeon2.ogg'),
        dungeon3: new Audio('music/dungeon3.ogg'),
        dungeon4: new Audio('music/dungeon4.ogg'),
        boss: new Audio('music/boss.ogg'),
        gameover: new Audio('music/gameover.ogg'),
    },

    sound: {
        level: new Audio('sound/level.wav'),
        opendoor: new Audio('sound/opendoor.wav'),
        shutdoor: new Audio('sound/shutdoor.wav'),
        teleport: new Audio('sound/teleport.wav'),
        curse: new Audio('sound/curse.wav'),
        amulet: new Audio('sound/amulet.wav'),
        ring: new Audio('sound/ring.wav'),
        gem: new Audio('sound/gem.wav'),
        grab: new Audio('sound/grab.wav'),
        tplevel: new Audio('sound/tplevel.wav'),
        dig: new Audio('sound/dig.wav'),
        coin: new Audio('sound/coin.wav'),
        hitwall: new Audio('sound/hitwall.wav'),
        uncurse: new Audio('sound/uncurse.wav'),
        swing: new Audio('sound/swing.wav'),
        kill: new Audio('sound/kill.wav'),
        paralyze: new Audio('sound/paralyze.wav'),
        blind: new Audio('sound/blind.wav'),
        probe: new Audio('sound/probe.wav'),
        summon: new Audio('sound/summon.wav'),
        hungry: new Audio('sound/hungry.wav'),
        probe2: new Audio('sound/probe2.wav'),
        fire: new Audio('sound/fire.wav'),
        air: new Audio('sound/wind.wav'),
        acid: new Audio('sound/acid.wav'),
        speed: new Audio('sound/speed.wav'),
        slow: new Audio('sound/slow.wav'),
        staircase: new Audio('sound/staircase.wav'),
        broken: new Audio('sound/broken.wav'),
        quaff: new Audio('sound/quaff.wav'),
        throw: new Audio('sound/throw.wav'),
        lightning: new Audio('sound/lightning.wav'),
        disintegrate: new Audio('sound/annihilate.wav'),
        encourage: new Audio('sound/enchant.wav'),
        hallucinate: new Audio('sound/hallucinate.wav'),
        eat: new Audio('sound/eat.wav'),
        shoot: new Audio('sound/shoot.wav'),
    },

    init() {
        for (let key in this.music) {
            this.music[key].currentTime = 0;
        }
    },

    fadeIn(track) {
        if (track.fade !== AUDIO_IN) return;
        if (track.volume < this.volBGM) {
            track.volume = Math.round((track.volume + 0.1) * 10) / 10;
            setTimeout(this.fadeIn.bind(this, track), 100);
        } else {
            track.fade = null;
        }
    },

    fadeOut(track, loop) {
        if (track.fade !== AUDIO_OUT) return;
        if (track.volume > 0) {
            track.volume = Math.round((track.volume - 0.1) * 10) / 10;
            setTimeout(this.fadeOut.bind(this, track, loop), 100);
        } else {
            if (!loop) track.pause();
            track.fade = null;
        }

    },

    playSafely(track) { //play() request error
        setTimeout(() => {
            if (this.curTrack === track.title && track.paused) track.play();
        }, 0);
    },

    playMusic(trackName) {
        if (!this.music[trackName]) return;
        let track = this.music[trackName];
        this.curTrack = trackName;
        track.volume = 0;
        track.fade = AUDIO_IN;
        this.fadeIn(track);
        if (!option.mute.user) this.playSafely(track);
    },

    playSound(trackName, distance) {
        if (!this.sound[trackName]) return;
        let track = this.sound[trackName];
        if (!distance) {
            track.volume = this.volSE;
        } else {
            if (distance > HEARING_SQ) return;
            let vol = Math.round(this.volSE * (1 - distance / HEARING_SQ) * 10) / 10;
            track.volume = vol;
        }

        track.currentTime = 0;
        if (!option.mute.user) track.play();
    },

    stop(trackName) {
        if (!trackName) return;
        let track = this.music[trackName];
        track.fade = AUDIO_OUT;
        this.fadeOut(track);
    },

    mute() {
        option.mute.user = !option.mute.user;
        let track = this.music[this.curTrack];
        option.mute.user ? track.pause() : this.playSafely(track);
    },

    getDungeonTrack(lvl, boss) {
        return lvl < 10 ? 'dungeon' :
            lvl < 20 ? 'dungeon2' :
            lvl < 30 ? 'dungeon3' :
            !boss ? 'dungeon4' :
            'boss';
    }
};

{
    for (let key in audio.music) {
        let track = audio.music[key];
        track.title = key;
        track.addEventListener('timeupdate', function() {
            if (this.fade !== AUDIO_OUT && this.currentTime >= this.duration - 0.5) {
                this.fade = AUDIO_OUT;
                audio.fadeOut(this, true);
            }
        }, false);
        track.addEventListener('ended', function() {
            if (audio.curTrack === key) {
                this.fade = AUDIO_IN;
                audio.fadeIn(this);
                audio.playSafely(this);
            }
        }, false);
    }
}
const circleSearch = {
    main({
        x0,
        y0,
        type,
        radius,
        symbol,
        perc,
    }) {
        this.count = 0;
        this.type = type;
        this.symbol = symbol;
        this.perc = perc;
        let width = map.coords.length;
        let height = map.coords[0].length;
        let radiusSq = radius ** 2;
        for (let j = 0; j <= radius; j++) {
            let col = -radius;
            while (distanceSq(col, j, 0, 0) > radiusSq) col++;
            for (let i = col; i <= -col; i++) {
                if (i + x0 < 0) continue;
                if (i + x0 >= width) break;
                if (y0 + j < height) this.do(i + x0, j + y0);
                if (j && y0 - j >= 0) this.do(i + x0, -j + y0);
            }
        }

        if (this.count) {
            if (this.type === MONSTER_DETECTION) {
                message.draw(option.isEnglish() ?
                    `Detected ${this.count} enemies` :
                    `${this.count}体の敵を検出した`);
            } else if (this.type === ITEM_DETECTION) {
                message.draw(option.isEnglish() ?
                    `Detected ${this.count} items` :
                    `${this.count}個のアイテムを検出した`);
            } else if (this.type === DISINTEGRATION) {
                message.draw(option.isEnglish() ?
                    `Disintegrated ${this.count} enemies` :
                    `${this.count}体の敵を塵にした`);
                audio.playSound('disintegrate');
            }
        }
    },

    do(x, y) {
        let loc = map.coords[x][y];
        switch (this.type) {
            case MAGIC_MAPPING:
                if (loc.found) return;
                loc.found = true;
                loc.drawGround();
                break;
            case ITEM_DETECTION:
                if(!loc.item['a']) return;
                for (let key in loc.item) {
                    let item = loc.item[key];
                    if (!item.detected) {
                        item.detected = true;
                        this.count++;
                    }
                } 

                break;
            case MONSTER_DETECTION:
                if (!loc.fighter || loc.fighter.id === ID_ROGUE || loc.fighter.detected) return;
                loc.fighter.detected = true;
                this.count++;
                break;
            case SCREAM:
                if (!loc.fighter || !loc.fighter.sleeping) return;
                loc.fighter.wakeUp();
                break;
            case DISINTEGRATION:
                if (!loc.fighter || loc.fighter.id === ID_ROGUE || loc.fighter.symbol !== this.symbol) return;
                if (loc.fighter.mod !== MOD_UNIQUE &&
                    !evalPercentage(loc.fighter.lvl)) {
                    if (rogue.ce && rogue.ce.id === loc.fighter.id) rogue.removeCe();
                    loc.fighter.died();
                    this.count++;
                } else if (loc.fighter.sleeping) {
                    loc.fighter.wakeUp();
                }

                break;
            case EARTHQUAKE:
                if (!evalPercentage(this.perc) || loc.indestructible || loc.enter && !loc.enter.portal ||
                loc.fighter && loc.fighter.id === ID_ROGUE) return;
                loc.found = false;
                loc.lighten = false;
                loc.wall = WALL_HP * coinToss();
                loc.floor = !loc.wall;
                loc.hidden = false;
                loc.door = false;
                loc.trap = null;
                if (loc.enter && loc.enter.portal) loc.enter = map.portal = null;
                let found;
                if (loc.item) {
                    let items = {};
                    let i = 0;
                    for (let key in loc.item) {
                        let item = loc.item[key];
                        if (item.indestructible || evalPercentage(item.earth)) {
                            items[eaList[i++]] = item;
                            found = true;
                            continue;
                        }

                        if (item.mod === MOD_UNIQUE && !item.identified) {
                            let id = item.type + ',' + item.tabId + ',' + item.uniqueId;
                            if (this.cui[id]) delete this.cui[id];
                        }

                        delete map.itemList[item.id];
                    }
                    loc.item = items;
                }

                if (loc.fighter) {
                    if (loc.fighter.boss || loc.fighter.indestructible || evalPercentage(loc.fighter.earth)) {
                        if (loc.fighter.sleeping) loc.fighter.wakeUp();
                        found = true;
                    } else {
                        if (loc.fighter.mod === MOD_UNIQUE) delete rogue.cue[loc.fighter.name[LETTER_ENG]];
                        loc.fighter.died();
                    }
                }

                loc.wall = WALL_HP * (!found && coinToss());
                loc.floor = !loc.wall;
                loc.drawGround();
                break;
        }
    }
};

const lineOfSight = (x0, y0, x1, y1, color, skill) => {
    if (color) cursor.drawPlot(x0, y0, color);
    let parabora = flag.arrow || flag.throw || skill && skill.parabora;
    let rangeSq = skill && skill.range >= 0 ? skill.range ** 2 : FOV_SQ;
    let radius = skill && skill.radius ? skill.radius : 0;
    let [xT, xS, yT, yS] = [x0, x0, y0, y0];
    let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (steep) [x0, y0, x1, y1] = [y0, x0, y1, x1];
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
        let loc = map.coords[xS][yS];
        if (color) {
            if (distanceSq(x, y, x0, y0) > rangeSq) {
                los = false;
                break;
            }

            cursor.drawPlot(xS, yS, color);
            if (radius && (skill.each || loc.fighter && skill.penetrate)) {
                if (!loc.isObstacle()) {
                    shadowcasting.main({
                        x0: xS,
                        y0: yS,
                        radius: radius,
                        color: color,
                    });
                }
            } else if (loc.fighter && (!skill || !skill.penetrate) && !parabora) {
                break;
            }
        }
        if (loc.isObstacle()) {
            los = false;
            break;
        }

        [xT, yT] = [xS, yS];
    }

    if (color && radius) {
        if (!los) [xS, yS] = [xT, yT];
        shadowcasting.main({
            x0: xS,
            y0: yS,
            radius: radius,
            color: color
        });
    }
    return los;
}

/*
4\5|6/7
---+---
3/2|1\0
*/
const shadowcasting = {
    transforms: [
        { xx: 1, xy: 0, yx: 0, yy: 1 },
        { xx: 0, xy: 1, yx: 1, yy: 0 },
        { xx: 0, xy: -1, yx: 1, yy: 0 },
        { xx: -1, xy: 0, yx: 0, yy: 1 },
        { xx: -1, xy: 0, yx: 0, yy: -1 },
        { xx: 0, xy: -1, yx: -1, yy: 0 },
        { xx: 0, xy: 1, yx: -1, yy: 0 },
        { xx: 1, xy: 0, yx: 0, yy: -1 },
    ],

    main({
        x0,
        y0,
        radius,
        type,
        lvl,
        color,
        lightRad,
        search,
        fighter,
    }) {
        if (!radius) return;
        this.radiusSq = radius ** 2;
        this.width = map.coords.length;
        this.height = map.coords[0].length;
        this.type = type;
        this.lvl = lvl;
        this.color = color;
        this.fighter = fighter;
        if (search) map.coords[x0][y0].findHiddenObject();
        if (this.type === 'Lighten') {
            this.lightRadSq = lightRad ** 2;
            this.oldLitMap = rogue.litMapIds;
            rogue.litMapIds = {};
        }

        this.do(x0, y0);
        for (let i = 0; i <= 7; i++) {
            this.line(i, x0, y0, radius, search);
            this.around(this.transforms[i], x0, y0, radius, 1, 1, 0);
        }

        if (this.type === 'Lighten') {
            for (let key in this.oldLitMap) {
                let [x, y] = key.split(',');
                let loc = map.coords[x][y];
                loc.drawShadow();
            }
        }
    },

    line(i, x0, y0, radius, search) {
        for (let j = 1; j <= radius; j++) {
            let [x1, y1] = [drList[i].x * j, drList[i].y * j];
            let l = distanceSq(x1, y1, 0, 0);
            if (l > this.radiusSq) break;
            let [x, y] = [x0 + x1, y0 + y1];
            this.do(x, y, l);
            let loc = map.coords[x][y];
            if (search && j === 1) loc.findHiddenObject();
            if (loc.isObstacle()) break;
        }
    },

    around(tr, x0, y0, radius, startDia, leftSlope, rightSlope) {
        for (let xc = startDia, blocked; xc <= radius && !blocked; xc++) {
            for (let yc = xc; yc >= 0; yc--) {
                let x = x0 + xc * tr.xx + yc * tr.xy;
                let y = y0 + xc * tr.yx + yc * tr.yy;
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) continue;
                let leftBlockSlope = (yc + 0.5) / (xc - 0.5);
                let rightBlockSlope = (yc - 0.5) / (xc + 0.5);
                if (rightBlockSlope > leftSlope) {
                    continue;
                } else if (leftBlockSlope < rightSlope) {
                    break;
                }

                if (yc !== xc && yc !== 0) {
                    let l = distanceSq(xc, yc, 0, 0);
                    if (l <= this.radiusSq) this.do(x, y, l);
                }

                let loc = map.coords[x][y];
                if (blocked) {
                    if (loc.isObstacle()) {
                        this.rightSlopeSaved = rightBlockSlope;
                    } else {
                        blocked = false;
                        leftSlope = this.rightSlopeSaved;
                    }
                } else if (loc.isObstacle()) {
                    blocked = true;
                    this.rightSlopeSaved = rightBlockSlope;
                    if (leftBlockSlope <= leftSlope) this.around(tr, x0, y0, radius, xc + 1, leftSlope, leftBlockSlope);
                }
            }
        }
    },

    do(x, y, distance) {
        let loc = map.coords[x][y];
        if (this.color) {
            cursor.drawPlot(x, y, this.color);
        } else if (this.type === 'Lighten') {
            if ((!this.lightRadSq || distance > this.lightRadSq) && !loc.lighten) return;
            let goldmine = loc.wall && loc.item['a'];
            let id = x + ',' + y;
            if (!goldmine) rogue.litMapIds[id] = true;
            if (this.oldLitMap[id]) {
                delete this.oldLitMap[id];
            } else {
                loc.found = true;
                loc.drawGround();
                if (!goldmine) loc.drawShadow(true);
            }
        } else if (this.type === 'Light') {
            let goldmine = loc.wall && loc.item['a'];
            if (!goldmine) {
                let id = x + ',' + y;
                rogue.litMapIds[id] = true;
                loc.drawShadow(true);
            }

            if (!loc.lighten) {
                loc.lighten = true;
                loc.found = true;
                loc.drawGround();
            }
        // } else if (this.type === 'Dark') {
        //     if (loc.lighten) {
        //         loc.lighten = false;
        //         loc.drawShadow();
        //     }
        } else if (this.type === 'Aim') {
            let self = this.fighter;
            let enemy = loc.fighter;
            if (enemy && self.id !== enemy.id &&
                (self.hallucinated || self.isOpponent(enemy)) &&
                (!self.ce || this.distanceSaved > distance) &&
                enemy.isShowing() &&
                lineOfSight(self.x, self.y, x, y)) {
                self.ce = enemy;
                this.distanceSaved = distance;
            }
        } else if (loc.fighter &&
            this.fighter.isOpponent(loc.fighter)) { //skill
            this.fighter.haveCast(this.type, this.lvl, loc.fighter, x, y);
        }
    }
};

const BinaryHeap = class {
    constructor() {
        this.list = [];
    }

    push(value) {
        this.list.push(value);
        this.upHeap(this.list.length - 1);
    }

    upHeap(cKey) {
        if (!cKey) return;
        let pKey = Math.floor((cKey - 1) / 2);
        if (this.compare(cKey, pKey)) {
            this.list.swap(cKey, pKey);
            this.upHeap(pKey);
            return true;
        }
    }

    shift() {
        let eKey = this.list.length - 1;
        if (eKey <= 0) return !eKey ? this.list.shift() : null;
        this.list.swap(0, eKey);
        let value = this.list.pop();
        this.downHeap(0);
        return value;
    }

    delete(value) {
        let eKey = this.list.length - 1;
        if (eKey <= 0) return !eKey ? this.list.shift() : null;
        let key = this.list.indexOf(value);
        if (key === eKey) {
            this.list.pop();
            return;
        }

        this.list.swap(key, eKey);
        this.list.pop();
        if (!this.upHeap(key)) this.downHeap(key);
    }

    downHeap(pKey) {
        let lcKey = 2 * pKey + 1;
        if (!this.list[lcKey]) return;
        let cKey;
        let rcKey = lcKey + 1;
        if (!this.list[rcKey]) {
            cKey = lcKey;
        } else {
            cKey = this.compare(lcKey, rcKey) ? lcKey : rcKey;
        }

        if (this.compare(cKey, pKey)) {
            this.list.swap(cKey, pKey);
            this.downHeap(cKey);
            return true;
        }
    }

    update(value, up) {
        let key = this.list.indexOf(value);
        up ? this.upHeap(key) : this.downHeap(key);
    }

    compare(i, j) {
        let list = this.list[i];
        let list2 = this.list[j];
        return list.fScore < list2.fScore ||
            list.fScore === list2.fScore &&
            (list.gScore < list2.gScore || list.next);
    }
}

const Node = class extends Position {
    constructor(x, y, gScore, parent) {
        super(x, y);
        this.id = x + ',' + y;
        this.gScore = gScore;
        this.parent = parent;
    }

    calcScore(xG, yG, pas, map) {
        if (map) {
            this.hScore = 0;
        } else {
            let x = Math.abs(this.x - xG);
            let y = Math.abs(this.y - yG);
            if (pas) {
                this.hScore = x + y;
            } else {
                this.hScore = x > y ? x : y;
            }
        }

        this.calcFScore()
    }

    calcFScore() {
        this.fScore = this.gScore + this.hScore;
    }
}

const pathfinding = {
    main({
        x0,
        y0,
        xG,
        yG,
        pas,
        map,
    }) {
        if (x0 === xG && y0 === yG) return [{ x: xG, y: yG }]
        this.init(xG, yG, pas, map);
        let curNode = this.createNode(x0, y0, 0);
        if (map) {
            var distanceMap = {};
            distanceMap[x0 + ',' + y0] = 0;
        }

        while (this.loop++ < MAX_PF_LOOP) {
            curNode = this.createNeighborNodes(curNode);
            if (!curNode) break;
            if (map) {
                distanceMap[curNode.x + ',' + curNode.y] = curNode.gScore;
            } else if (curNode.x === this.xG && curNode.y === this.yG) {
                this.getPath(curNode);
                this.pathList.pop();
                break;
            }

            delete this.openSet[curNode.id];
        }

        if (map) {
            return distanceMap;
        } else {
            return this.pathList[0] ? this.pathList.reverse() : null;
        }
    },

    init(xG, yG, pas, map) {
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

    createNode() {
        let node = new Node(...arguments);
        node.calcScore(this.xG, this.yG, this.pas, this.map);
        this.idList[node.id] = true;
        return node;
    },

    createNeighborNodes(node) {
        let nextNode = null;
        let newNode = null;
        let gScore = node.gScore + 1;
        let count = 0;
        for (let key in drList) {
            if (this.map && gScore > FOV || this.pas && ++count > 4) break;
            let x = node.x + drList[key].x;
            let y = node.y + drList[key].y;
            let loc = map.coords[x][y];
            if (!loc.wall && (!this.pas || !loc.isClosedDoor())) {
                let id = x + ',' + y;
                if (!this.idList[id]) {
                    newNode = this.createNode(x, y, gScore, node);
                    this.openSet[id] = newNode;
                    this.heap.push(newNode);
                } else if (this.openSet[id] &&
                    this.openSet[id].gScore > gScore) {
                    newNode = this.openSet[id];
                    newNode.gScore = gScore;
                    newNode.calcFScore();
                    this.heap.update(newNode);
                } else {
                    continue;
                }

                if (!nextNode && newNode.hScore < node.hScore) {
                    nextNode = true;
                    newNode.next = true;
                    this.heap.update(newNode, true);
                }
            }
        }
        
        return this.heap.shift();
    },

    getPath(node) {
        this.pathList.push({ x: node.x, y: node.y });
        if (node.parent) this.getPath(node.parent);
    },
};
const map = {
    coords: [],
    init(town, load) {
        this.drawShadow();
        this.queue = new Queue();
        this.enemyList = {};
        this.itemList = {};
        this.trapList = {};
        this.staircaseList = {};
        this.portal = null;
        if (!load) {
            this.coords = [];
            let width = town ? IN_WIDTH : WIDTH;
            let height = town ? IN_HEIGHT : HEIGHT;
            for (let i = 0; i < width; i++) {
                this.coords.push([]);
                for (let j = 0; j < height; j++) {
                    this.coords[i].push(new Location(i, j));
                    let loc = this.coords[i][j];
                    if (i === 0 || i === width - 1 || j === 0 || j === height - 1) {
                        loc.indestructible = true;
                        loc.wall = WALL_HP;
                    }
                }
            }
        }
    },

    drawGround() {
        // display.clearOne(display.ctxes.ground);
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                loc.drawGround();
            }
        }
    },

    drawObjectAll() {
        display.clearOne(display.ctxes.object);
        if (!rogue.blinded) {
            this.drawObject(this.staircaseList, SYMBOL_STAIRS);
            this.drawObject(this.trapList, SYMBOL_TRAP);
            this.drawObject(this.itemList, SYMBOL_ITEM);
            if (this.portal) this.drawObject([this.portal], SYMBOL_ENTER);
            this.drawObject(this.enemyList, SYMBOL_FIGHTER);
        }

        this.drawObject([rogue], SYMBOL_FIGHTER);
    },

    drawObject(list, type) {
        for (let key in list) {
            let obj = list[key];
            let loc = this.coords[obj.x][obj.y];
            loc.drawObject(type);
        }
    }, 

    drawShadow() {
        display.clearOne(display.ctxes.shadow);
        let ctx = display.ctxes.shadow;
        let canvas = ctx.canvas;
        display.rect({
            ctx: ctx,
            widthPx: canvas.width,
            heightPx: canvas.height,
        });
    },

    fill(town) {
        let width = this.coords.length;
        let height = this.coords[0].length;
        for (let i = 1; i < width - 1; i++) {
            for (let j = 1; j < height - 1; j++) {
                let loc = this.coords[i][j];
                if (town) {
                    if (!loc.wall) loc.floor = true;
                } else if (!loc.floor && !loc.wall) {
                    if (evalPercentage(0.1)) {
                        creation.item({
                            type: 'coin',
                            tabId: 1,
                            position: POS_LOCATION,
                            x: i,
                            y: j,
                        });
                    }

                    loc.wall = WALL_HP;
                }
            }
        }
    },

    draw(cX=rogue.x, cY=rogue.y, examine, minimap) {
        let dwidth = display.width;
        let dheight = display.height;
        let sx, sy, sxPx, syPx, swidth, sheight, dxPx, dyPx;
        if (minimap) {
            sx = sy = sxPx = syPx = 0;
            let lenX = this.coords.length;
            let lenY = this.coords[0].length;
            swidth = lenX * display.fs;
            sheight = lenY * display.fs;
            dwidth = swidth / 2;
            dheight = sheight / 2;
            /*
            dwidth = Math.floor(dwidth / lenX) * lenX;
            dheight = Math.floor(dheight / lenY) * lenY;
            if (dwidth > swidth) dwidth = swidth;
            if (dheight > sheight) dheight = sheight;
            let ratioX = dwidth / swidth;
            let ratioY = dheight / sheight;
            if (ratioX < 1 || ratioY < 1) {
                if (ratioX < ratioY) {
                    if (ratioX < MINIMAP_MIN_RATIO) {
                        ratioX = MINIMAP_MIN_RATIO;
                        dwidth = swidth * ratioX;
                    }

                    dheight = sheight * ratioX;
                } else {
                    if (ratioY < MINIMAP_MIN_RATIO) {
                        ratioY = MINIMAP_MIN_RATIO;
                        dheight = sheight * ratioY;
                    }

                    dwidth = swidth * ratioY;
                }
            }
            */

            dxPx = Math.floor((display.width - dwidth) / 2);
            dyPx = Math.floor((display.height - dheight) / 2);
        } else {
            dxPx = dyPx = 0;
            sx = cX + .5;
            sy = cY + .5;
            sxPx = -Math.floor(dwidth / 2);
            syPx = -Math.floor(dheight / 2);
            swidth = dwidth;
            sheight = dheight;
        }

        let ctxMain = display.ctxes.main;
        let obj = {
            ctx: ctxMain,
            sx: sx,
            sxPx: sxPx,
            sy: sy,
            syPx: syPx,
            sWidthPx: swidth,
            sHeightPx: sheight,
            dxPx: dxPx,
            dyPx: dyPx,
            dWidthPx: dwidth,
            dHeightPx: dheight,
        };

        display.clearOne(ctxMain);
        if (!rogue.blinded) {
            obj.img = display.canvases.ground;
            display.image(obj);
        }

        obj.img = display.canvases.object;
        display.image(obj);

        if (!rogue.blinded && !minimap) {
            obj.img = display.canvases.shadow;
            display.image(obj);
        }

        if (examine) {
            obj.img = display.canvases.cursor;
            display.image(obj);
        }
    },

    redraw() {
        this.drawGround();
        this.drawObjectAll();
        this.draw();
    },

    lighten(init) {
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                if (loc.hidden) {
                    loc.hidden = false;
                    loc.wall = false;
                }

                loc.lighten = true;
                loc.found = true;
                if (!init) loc.drawGround();
            }
        }

        if (!init) {
            this.drawShadow();
            rogue.litMapIds = {};
            rogue.lightenOrDarken('Lighten');
        }
    },

    drawMini(key) {
        if (!(key === 'a' || // all
            key === 's' || // self
            key === 'c' || // close
            key === 'e' || // enemy
            key === 'i' || // item
            key === 'M' || // map
            key === '<' || // <
            key === '>' || // >
            key === 'p' || // portal
            key === 't')) { // trap
            return;
        }

        if (key === 'c') {
            rogue.cancelCommand();
            return;
        }

        if (key === 'a' || rogue.blinded) {
            this.drawObjectAll();
        } else {
            display.clearOne(display.ctxes.object);
            switch (key) {
                case  'e':
                    this.drawObject(this.enemyList, SYMBOL_FIGHTER);
                    break;
                case  's':
                    this.drawObject([rogue], SYMBOL_FIGHTER);
                    break;
                case  'i':
                    this.drawObject(this.itemList, SYMBOL_ITEM);
                    break;
                case  '<':
                case  '>':
                    this.drawObject(this.staircaseList, SYMBOL_STAIRS);
                    break;
                case  'p':
                    if (this.portal) this.drawObject([this.portal], SYMBOL_ENTER);
                    break;
                case  't':
                    this.drawObject(this.trapList, SYMBOL_TRAP);
                    break;
            }
        }

        this.draw(false, false, false, true);
    },
};

const seeInvisible = (see) => {
    for (let key in map.enemyList) {
        let enemy = map.enemyList[key];
        if (enemy.invisible) {
            if (!see && rogue.ce && rogue.ce.id === enemy.id) rogue.removeCe();
        }
    }
}

const hallucinate = {
    all(undo) {
        this.search(map.enemyList, true, undo);
        this.search(map.itemList, false, undo);
        map.redraw();
    },

    search(list, enemy, undo) {
        for (let key in list) {
            if (enemy && list[key].mimic) continue;
            if (!undo) {
                this.one(list[key], enemy);
            } else {
                this.undoOne(list[key]);
            }
        }
    },

    one(obj, enemy, mimic) {
        let type, tabId;
        if (!obj.nameTemp) obj.nameTemp = {};
        obj.nameTemp['a'] = obj.name['a'];
        obj.nameTemp['b'] = obj.name['b'];
        if (enemy) {
            type = ftList[rndInt(ftList.length - 1)];
            tabId = rndInt(fighterTab[type].length - 1);
            var fighter = fighterTab[type][tabId];
            obj.name['a'] = fighter.name['a'];
            obj.name['b'] = fighter.name['b'];
            obj.symbol = fighter.symbol;
            obj.color = fighter.color ? fighter.color : colorList.white;
        } else {
            type = itList[rndInt(itList.length - 2)];
            obj.typeHalluc = type;
            tabId = rndIntBet(1, itemTab[type].size);
            var item = itemTab[type].get(tabId);
            obj.name['a'] = item.nameReal['a'];
            obj.name['b'] = item.nameReal['b'];
            obj.symbol = item.symbol;
            obj.color = item.color ? item.color : colorList.white;
            if (mimic) {
                obj.__proto__ = Item.prototype;
                obj.name['a'] = obj.getName(false, false, 'a');
                obj.name['b'] = obj.getName(false, false, 'b');
                obj.__proto__ = Enemy.prototype;
            }
        }

        if (!enemy && !item.equipable || mimic) {
            obj.shadow = 0;
            obj.stroke = 0;
            return;
        }

        if (enemy && fighter.mod === MOD_UNIQUE ||
            !enemy && itemUniqueMap[item.type].has(item.tabId) && coinToss()) {
            if (!enemy) {
                if (type === 'amulet' && evalPercentage(1)) {
                    obj.name['a'] = 'Amulet of Yendor';
                    obj.name['b'] = 'イェンダーの魔除け';
                } else {
                    let array = itemUniqueMap[item.type].get(item.tabId);
                    let unique = array[rndInt(array.length - 1)];
                    obj.getUniqueName(unique.name, true);
                }
            }

            obj.shadow = colorList.gold;
            obj.stroke = colorList.gold;
        } else if (coinToss()) {
            obj.stroke = 0;
            let bias = rndIntBet(1, MAX_BIAS_NUMS);
            if (coinToss()) {
                let affixes = modTab.prefix.get(bias).affix;
                let aff = affixes[rndInt(affixes.length - 1)];
                obj.name['a'] = `${obj.name['a']} ${aff.name['a']}`;
                obj.name['b'] = `${aff.name['b']}${obj.name['b']}`;
                obj.shadow = colorList.yellow;
            } else {
                let sufId = rndInt(modTab.suffix.length - 1);
                let pre = modTab.prefix.get(bias);
                let suf = modTab.suffix[sufId];
                obj.name['a'] = `${pre.name['a']} ${obj.name['a']} ${suf.name['a']}`;
                obj.name['b'] = `${pre.name['b']}${obj.name['b']} "${suf.name['b']}"`;
                obj.shadow = colorList.aqua;
            }
        } else {
            obj.shadow = 0;
            obj.stroke = 0;
        }
    },

    undoOne(obj) {
        obj.name['a'] = obj.nameTemp['a'];
        obj.name['b'] = obj.nameTemp['b'];
        obj.typeHalluc = null;
        obj.symbol = obj.symbolReal;
        obj.color = obj.colorReal;
        obj.shadow = obj.shadowReal;
        obj.stroke = obj.strokeReal;
    },
};

const statistics = {
    list: {
        a: { 
            name: { a: 'Strength', b: '筋力' },
            term: 'str',
        },

        b: {
            name: { a: 'Dexterity', b: '器用さ' },
            term: 'dex',
        },

        c: {
            name: { a: 'Constitution', b: '耐久力' },
            term: 'con',
        },

        d: {
            name: { a: 'Intelligence', b: '知力' },
            term: 'int',
        },
    },

    drawEnemyBar(e, examine) {
        if (!e) return;
        if (!(e.isShowing() &&
            (examine || distanceSq(e.x, e.y, rogue.x, rogue.y) <= FOV_SQ &&
            lineOfSight(e.x, e.y, rogue.x, rogue.y)))) {
            vue.barEnemy = null;
            return '';
        }
            
        let name = e.getName(false, true);
        vue.barEnemy = e;
        vue.barName = name;
        if (examine) return name;
    },

    clearEnemyBar() {
        vue.barEnemy = null;
    },
};

const cursor = {
    init() {
        let [x, y] = [rogue.x, rogue.y];
        this.x = this.cX = x;
        this.y = this.cY = y;
        this.draw();
        map.draw(x, y, true);
    },

    draw() {
        display.rect({
            ctx: display.ctxes.cursor,
            x: this.x,
            xPx: 1,
            y: this.y,
            yPx: 1,
            width: 1,
            widthPx: -2,
            height: 1,
            heightPx: -2,
            stroke: true,
        });
    },

    drawPlot(x, y, color) {
        let ctxCur = display.ctxes.cursor;
        ctxCur.save();
        ctxCur.fillStyle = color;
        ctxCur.globalAlpha = 0.5;
        display.rect({
            ctx: ctxCur,
            x: x,
            y: y,
            width: 1,
            height: 1,
            clear: true,
        });

        display.text({
            ctx: ctxCur,
            msg: '＊',
            x: x,
            y: y,
        });

        ctxCur.restore();
    },

    clear() {
        display.rect({
            ctx: display.ctxes.cursor,
            x: this.x, 
            y: this.y,
            width: 1,
            height: 1,
            clear: true,
        });
    },

    clearAll() {
        display.clearOne(display.ctxes.cursor);
    },

    move(key) {
        let dr = getDirection(key);
        if (!dr) return;
        let [x, y] = [this.x, this.y];
        let [xinc, yinc] = [dr.x, dr.y];
        let [xDest, yDest] = [x + xinc, y + yinc];
        let width = map.coords.length - 1;
        let height = map.coords[0].length - 1;
        if (xDest < 0 || xDest > width || yDest < 0 || yDest > height) return;
        if (input.isShift) {
            xinc *= 10;
            yinc *= 10;
            xDest = x + xinc;
            if (xDest < 0 || xDest > width) {
                xinc = (xDest < 0 ? 0 : width) - x;
                if (yinc) yinc = (yinc > 0 ? 1 : -1) * Math.abs(xinc);
            }

            yDest = y + yinc;
            if (yDest < 0 || yDest > height) {
                yinc = (yDest < 0 ? 0 : height) - y;
                if (xinc) xinc = (xinc > 0 ? 1 : -1) * Math.abs(yinc);
            }
        }

        this.clear();
        this.x += xinc;
        this.y += yinc;
        [x, y] = [this.x, this.y];
        let offsetX = Math.floor(display.width / 2 / display.fs - .5);
        let offsetY = Math.floor(display.height / 2 / display.fs - .5);
        let X = x - this.cX;
        let Y = y - this.cY;
        let setCX, setCY;
        if (Math.abs(X) > offsetX) {
            setCX = true
            if (yinc > 0 && Y > 0 || yinc < 0 && Y < 0) setCY = true;
        }
        
        if (Math.abs(Y) > offsetY) {
            setCY = true;
            if (xinc > 0 && X > 0 || xinc < 0 && X < 0) setCX = true;
        }
        
        if (setCX) this.cX = x;
        if (setCY) this.cY = y;
        if (flag.aim) rogue.examinePlot();
        this.draw();
        map.draw(this.cX, this.cY, true);
        let loc = map.coords[x][y];
        loc.getInfo();
    }
};
const Queue = class extends BinaryHeap {
    constructor() {
        super();
    }

    moveAll() {
        while (this.list[0].energy >= 0 && this.list[0].id !== ID_ROGUE) {
            this.list[0].act();
            if (flag.died) return;
		}
		
        if (this.list[0].energy < 0) {
            this.getEnergyAll();
            this.moveAll();
            return;
		}

        if (rogue.cdl && rogue.turn % SPAWN_FREQ === 0) {
            creation.enemy({
                position: POS_AWAY,
                summon: true,
			});
		}

        rogue.turn++;
        rogue.healAndHunger();
        map.drawObjectAll();
        map.draw();
        if (rogue.paralyzed || rogue.sleeping) {
            rogue.decreaseEnergy();
            message.draw(option.isEnglish() ?
                `You are still ${rogue.sleeping? 'sleeping':'paralyzed'}` :
                `まだ${rogue.sleeping? '昏睡':'麻痺'}している`);
            flag.wait = true;
        } else {
            flag.wait = false;
            rogue.done = false;
        }
    }

    getEnergyAll() {
        let list = this.list;
        this.list = [];
        for (let fighter of list) {
            fighter.increaseEnergy();
            this.push(fighter);
        }
    }

    compare(i, j) {
        return this.list[i].energy > this.list[j].energy;
    }
}
const doorIds = {
    close: 1,
    open: 2,
};
const DOOR_CLOSE = 1;
const DOOR_OPEN = 2;

const Location = class extends Position {
    constructor(x, y) {
        super(x, y);
        this.item = {};
    }

    getSymbol(type) {
        let symbol, color, shadow, stroke;
        switch (type) {
            case SYMBOL_FIGHTER:
                let fighter = this.fighter;
                symbol = fighter.symbol;
                color = fighter.color;
                shadow = fighter.shadow;
                stroke = fighter.stroke;
                break;
            case SYMBOL_ITEM:
                let l = Object.keys(this.item).length;
                let item = this.item[eaList[l - 1]];
                let identified = item.identified || rogue.hallucinated;
                symbol = item.symbol;
                color = item.color;
                shadow = identified ? item.shadow : 0;
                stroke = identified ? item.stroke : 0;
                break;
            case SYMBOL_BLANK: 
                symbol = ' ';
                color = colorList.white;
                break;
            case SYMBOL_ENTER:
                let enter = this.enter;
                symbol = enter.symbol;
                color = enter.color;
                shadow = enter.shadow;
                stroke = enter.stroke;
                break;
            case SYMBOL_TRAP:
                let trap = this.trap;
                symbol = trap.symbol;
                color = trap.color;
                break;
            case SYMBOL_DOOR:
                symbol = this.isClosedDoor() ? '+' : '\'';
                color = colorList.brown;
                break;
            case SYMBOL_WALL:
                symbol = '#';
                color = this.indestructible ? colorList.brown : colorList.gray;
                break;
            case SYMBOL_STAIRS:
                let stairs = this.stairs;
                symbol = stairs.symbol;
                color = stairs.color;
                break;
            case SYMBOL_FLOOR:
                symbol = '.';
                color = colorList.white;
                break;
        }

        return {symbol: symbol, color: color, shadow: shadow, stroke: stroke};
    }

    draw(typeCtx, typeSymbol) {
        let {symbol, color, shadow, stroke} = this.getSymbol(typeSymbol);
        let ctx = display.ctxes[typeCtx];
        let [x, y] = [this.x, this.y];
        let obj = {
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
        }

        ctx.save();
        if (typeCtx === 'ground') {
            obj.clear = true;
        } else if (typeCtx === 'object') {
            ctx.fillStyle = colorList.black;
        }
        
        display.rect(obj);
        ctx.fillStyle = color;
        if (!option.shadow.user) {
            stroke = 0;
        } else if(shadow) {
            ctx.shadowColor = shadow;
        } else if (rogue.hallucinated) {
            // ctx.shadowColor = colorList.purple;
        }

        display.text({
            ctx: ctx,
            msg: symbol,
            x: x,
            y: y,
            stroke: stroke,
        });
		
        ctx.restore();
    }

    drawGround() {
        let type;
        if (!this.found) {
            type = SYMBOL_BLANK;
        } else if (this.enter && !this.enter.portal) {
            type = SYMBOL_ENTER;
        } else if (this.wall) {
            type = SYMBOL_WALL;
        } else if (this.door && !this.hidden) {
            type = SYMBOL_DOOR;
        } else if (this.floor) {
            type = SYMBOL_FLOOR;
        }

        if (type) this.draw('ground', type);
    }

    drawObject(type) {
        let draw;
        if (type === SYMBOL_FIGHTER) {
            draw = this.fighter && this.fighter.isShowing();
        } else if (type === SYMBOL_ITEM) {
            draw = this.item['a'] && this.item['a'].isShowing();
        } else if (this.found) {
            if (type === SYMBOL_TRAP) {
                draw = this.trap && !this.hidden;
            } else if (type === SYMBOL_STAIRS) {
                draw = this.stairs && !this.hidden;
            } else if (type === SYMBOL_ENTER) {
                draw = this.enter;
            }
        }
        
        if (draw) this.draw('object', type);
    }

    drawShadow(clear) {
        let ctx = display.ctxes.shadow;
        let [x, y] = [this.x, this.y];
        display.rect({
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
            clear: true,
        });

        if (clear) return;
        display.rect({
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
        });
    }

    getInfo(stepOn) {
        if (flag.examine) rogue.examineMsg();
        let msg = '';
        if (flag.examine && this.fighter && this.fighter.id !== ID_ROGUE && this.fighter.isShowing()) {
			msg = statistics.drawEnemyBar(this.fighter, true);
		}

        if (this.found && this.stairs && !this.hidden) {
            let nameStairs = this.stairs.getName();
            if (option.isEnglish()) {
                msg += (msg ? ' on ' : '') + nameStairs;
			} else {
				msg = nameStairs + (msg ? 'の上に' + msg : '');
			}
		}
		
        if (this.item['a']) {
            let l = Object.keys(this.item).length;
            let item = this.item[eaList[l - 1]];
            if (item.isShowing()) {
                if (this.found && !this.stairs && !this.hidden && msg) {
                    msg = option.isEnglish() ? msg + ' on ' : 'の上に' + msg;
                } else if (l === 1 && msg) {
                    msg = option.isEnglish() ? msg + ' and ' : 'と' + msg;
                } else if (l > 1 && msg) {
                    msg = option.isEnglish() ? msg + ', ' : 'と' + msg;
                }

                let nameItem = item.getName();
                if (item.type === 'coin') {
                    if (option.isEnglish()) {
                        nameItem = 'Gold worth ' + nameItem;
                    } else {
                        nameItem += '相当の金塊';
                    }
                }
                if (this.found && this.wall) {
                    if (option.isEnglish()) {
                        nameItem += ' through the wall';
                    } else {
                        nameItem = '壁の中に' + nameItem;
                    }
                }

                if (l > 1) nameItem += option.isEnglish() ? ' and more' : 'とアイテムの山';

                if (option.isEnglish()) {
                    msg += nameItem;
                } else {
                    msg = nameItem + msg;
                }
            }
		}
		
        if (this.found && this.enter) {
            let msgAdd = flag.examine;
            if (!flag.examine) {
                if (flag.dash) flag.dash = false;
                var entered = true;
                if (this.enter.portal) {
                    if (stepOn && (rogue.cdl || rogue.pdl)) {
                        rogue.enterPortal();
					} else {
                        msgAdd = true;
                        entered = false;
                    }
                } else {
					rogue.enterBuild(this.enter);
				}
			}
			
            if (msgAdd) {
                let nameEnter = this.enter.getName();
                msg = !msg ? nameEnter : nameEnter + (option.isEnglish() ? ', ' : 'と') + msg;
            }
        } else if (this.found && this.trap) {
            let nameTrap = this.trap.getName();
            if (flag.examine && !this.hidden) {
                msg = !msg ? nameTrap : nameTrap + (option.isEnglish() ? ', ' : 'と') + msg;
			} else if (!flag.examine) {
                if (!this.trap.protection && (stepOn || this.hidden && coinToss())) {
                    message.draw(option.isEnglish() ?
                        `You got caught in ${nameTrap}` :
                        `${nameTrap}に捕まった`);
                    rogue.trapped(this.trap, stepOn);
                } else if (!this.hidden) {
					msg += nameTrap;
				}
            }
		}
		
        if (msg && !rogue.blinded) {
            message.draw(option.isEnglish() ?
                `You see ${msg}` :
                `${msg}が見える`);
            if (!flag.examine && this.item['a'] && !this.enter) rogue.itemAuto(this.item);
            if (flag.dash) flag.dash = false;
		}
		
        return entered;
    }

    openOrCloseDoor() {
        let l = distanceSq(this.x, this.y, rogue.x, rogue.y);
        if (!this.isClosedDoor()) {
            this.getDoor(true);
            audio.playSound('shutdoor', l);
        } else {
            this.getDoor();
            audio.playSound('opendoor', l);
		}
		
        this.drawGround();
        if (rogue.litMapIds[this.x + ',' + this.y]) rogue.lightenOrDarken('Lighten');
    }

    deleteItem(a, quantity = 1) {
        let item = this.item[a];
        item.quantity -= quantity;
        if (!item.quantity) {
            delete map.itemList[item.id];
            deleteAndSortItem(this.item, a);
		}
    }

    deleteTrap(draw) {
        if (this.hidden) this.hidden = false;
        this.trap = null;
    }

    deleteDoor(draw) {
        if (this.hidden) {
            this.hidden = false;
            this.wall = false;
		}
		
        this.door = 0;
        this.floor = true;
        if (draw) this.drawGround();
    }

    deleteWall(draw) {
        if (this.indestructible) this.indestructible = false;
        this.wall = false;
        this.floor = true;
        if (draw) this.drawGround();
    }

    findHiddenObject() {
        if (rogue.blinded || !this.hidden || !searchProb()) return;
        this.hidden = false;
        let name;
        if (this.trap) {
            name = this.trap.getName();
		} else if (this.isClosedDoor()) {
            name = option.isEnglish() ? 'door' : 'ドア';
            this.wall = false;
            this.drawGround();
        } else if (this.stairs) {
			name = this.stairs.getName();
		}
		
        message.draw(option.isEnglish() ?
            `You found a hidden ${name}` :
            `隠された${name}を発見した`);
        if (flag.dash) flag.dash = false;
    }

    isClosedDoor() {
        return this.door === DOOR_CLOSE;
    }

    isObstacle() {
        return this.wall || this.isClosedDoor();
    }

    getDoor(close) {
        this.door = close ? DOOR_CLOSE : DOOR_OPEN;
    }
}
const Portal = class extends Thing {
    constructor() {
        super();
        this.name = { a: 'Portal', b: 'ポータル' };
        this.symbol = '＊';
        this.color = colorList.white;
        this.stroke = colorList.skyblue;
        this.portal = true;
    }

    putDown(x, y) {
        if (map.portal) {
            let loc = map.coords[map.portal.x][map.portal.y];
            loc.enter = null;
            map.portal = null;
		}

        this.spiralSearch(x, y, 'portal');
        if (this.abort) return;
        let loc = map.coords[this.x][this.y];
        loc.enter = map.portal = this;
    }
}
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
		this.spiralSearch(x, y, 'trap');
		if (this.abort) return;
		let loc = map.coords[this.x][this.y];
		loc.trap = this;
		loc.hidden = this.hidden;
        map.trapList[this.x + ',' + this.y] = this;
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
const stairsMap = new Map([
	[DR_DOWN, {
        name: { a: 'down staircase', b: '下り階段' },
        symbol: '>',
        color: colorList.white,
        id: DR_DOWN,
	}],
	
	[DR_UP, {
        name: { a: 'up staircase', b: '上り階段' },
        symbol: '<',
        color: colorList.white,
        id: DR_UP,
    }],
]);

const Staircase = class extends Thing {
    constructor(obj, hidden) {
        super(obj);
        this.hidden = hidden;
    }

    putDown(x, y) {
        this.spiralSearch(x, y, 'staircase');
        if (this.abort) return;
        let loc = map.coords[this.x][this.y];
        loc.stairs = this;
        loc.hidden = this.hidden;
        map.staircaseList[this.x + ',' + this.y] = this;
    }
}
const Door = class extends Position {
    constructor(x, y, dr, roomId) {
        super(x, y);
        this.dr = dr;
        this.roomId = roomId;
    }

    getPosInFrontOf() {
        let [x, y] = [this.x, this.y];
        switch (this.dr) {
            case DR_LEFT:
                x--;
                break;
            case DR_DOWN:
                y++;
                break;
            case DR_UP:
                y--;
                break;
            case DR_RIGHT:
                x++;
                break;
		}

        return [x, y];
    }
}

const Room = class extends Position {
    constructor(x, y, id, width, height) {
        super(x, y);
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
const Cave = class extends Room {
    constructor(x, y, id, width, height, lighten) {
        super(x, y, id, width, height);
        this.lighten = lighten;
        this.doors = [];
        this.doorIds = [];
    }

    create() {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let loc = map.coords[i][j];
                loc.lighten = this.lighten;
                if (!loc.indestructible &&
                    	(i === this.x || i === this.x + this.width - 1 ||
                        j === this.y || j === this.y + this.height - 1)) {
                    loc.wall = WALL_HP;
				} else {
					loc.floor = true;
				}
            }
		}
		
        for (let i = 0; i < 4; i++) {
			this.doors[i] = this.getDoor(i);
		}
    }

    getDoor(i) {
        let x, y;
        let found = true;
        if (i === DR_LEFT) { //0
            if (this.id % CAVE_NUM_COL === 0) return null;
            x = this.x;
            y = rndIntBet(this.y + 1, this.y + this.height - 2);
        } else if (i === DR_DOWN) { //1
            if (Math.floor(this.id / CAVE_NUM_COL) === CAVE_NUM_ROW - 1) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y + this.height - 1;
        } else if (i === DR_UP) { //2
            if (Math.floor(this.id / CAVE_NUM_COL) === 0) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y;
        } else { //3 DR_RIGHT
            if (this.id % CAVE_NUM_COL === CAVE_NUM_COL - 1) return null;
            x = this.x + this.width - 1;
            y = rndIntBet(this.y + 1, this.y + this.height - 2);
		}
        
        let loc = map.coords[x][y]; 
        loc.getDoor(true);
        if (evalPercentage(10)) {
            loc.hidden = true;
		} else {
            loc.wall = false;
            loc.floor = true;
		}
		
        this.doorIds.push(i);
        return new Door(x, y, i, this.id);
    }

    createNest() {
        let magic = rogue.cdl >= 20 && evalPercentage(10);
        let boost = NEST_BOOST * (magic ? 2 : 1);
        let bias = RANDOM;
        if (magic && evalPercentage(25)) {
            let pre;
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++]
                pre = modTab.prefix.get(bias);
            } while (pre.lvl > rogue.cdl + boost ||
                evalPercentage(pre.rarity));
		}
		
        let type = RANDOM;
        if (rogue.cdl >= 10 && evalPercentage(5)) {
            do {
                type = ftList[rndInt(ftList.length - 2)];
            } while (fighterTab[type][0].lvl > rogue.cdl + boost);
		}
		
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let loc = map.coords[i][j];
                if (i === this.x || i === this.x + this.width - 1 ||
                  	j === this.y || j === this.y + this.height - 1) {
                    if (magic) {
                        if (loc.wall && !loc.hidden) {
                            loc.indestructible = true;
						} else {
                            if (loc.door) loc.hidden = true;
                            loc.wall = WALL_HP;
                        }
					}
					
                    continue;
				}
				
                if (coinToss()) {
                    if (coinToss()) {
                        creation.item({
                            position: POS_LOCATION,
                            x: i,
                            y: j,
                            magic: magic,
                            boost: boost,
                        });
                    } else {
                        creation.trap(1, RANDOM, POS_LOCATION, i, j);
                    }
				}
				
                if ((!loc.trap || !loc.trap.protection) && evalPercentage(25)) {
                    creation.enemy({
                        type: type,
                        position: POS_LOCATION,
                        x: i,
                        y: j,
                        magic: magic,
                        bias: bias,
                        boost: boost,
					});
				}
            }
        }
    }
}

const dungeon = {
    roomIds: enums(0, CAVE_NUM_MAX - 1),
    create() {
        this.list = [];
        this.rns = []; //room numbers
        let count = 0;
        this.roomIds.shuffle();
        for (let i of this.roomIds) {
            if (evalPercentage(15) && ++count <= 10) continue;
            let width = rndIntBet(CAVE_WIDTH_MIN, CAVE_WIDTH_MAX);
            let height = rndIntBet(CAVE_HEIGHT_MIN, CAVE_HEIGHT_MAX);
            let x = rndInt(CAVE_WIDTH_MAX - width) + ((i % CAVE_NUM_COL) * (CAVE_WIDTH_MAX + 1));
            let y = rndInt(CAVE_HEIGHT_MAX - height) + (Math.floor(i / CAVE_NUM_COL) * (CAVE_HEIGHT_MAX + 1));
            let room = new Cave(x, y, i, width, height, lightenProb());
            room.create();
            this.list[i] = room;
            this.rns.push(i);
		}
		
        this.connect();
        this.deleteDoors();
        map.fill();
        for (let room of this.list) {
            if (room && rogue.cdl >= 10 && evalPercentage(1)) room.createNest();
        }
    },

    connect() {
        this.connectDoors(true);
        for (let i = 0, l = rndIntBet(3, 5); i < l; i++) {
			this.connectDoors();
		}
    },

    connectDoors(all) {
        this.rns.shuffle();
        for (let i = 0, l = this.rns.length; i < l - 1; i++) {
            let room1 = this.list[this.rns[i]];
            if (!room1.doorIds.length) continue;
            let room2 = this.list[this.rns[i + 1]];
            if (!room2.doorIds.length) continue;
            room1.doorIds.shuffle();
            let door1 = room1.doors[room1.doorIds.shift()];
            room2.doorIds.shuffle();
            let door2 = room2.doors[room2.doorIds.shift()];
            this.createPassage(door1, door2);
            if (!all) break;
        }
    },

    createPassage(door1, door2) {
        let [x1, y1] = door1.getPosInFrontOf();
        let [x2, y2] = door2.getPosInFrontOf();
        let path = pathfinding.main({
            x0: x1,
            y0: y1,
            xG: x2,
            yG: y2,
            pas: true,
        });
        if (path === null) throw new Error('path error');
        map.coords[x1][y1].floor = true;
        for (let pos of path) {
			map.coords[pos.x][pos.y].floor = true;
		}
		
        door1.connected = door2.connected = true;
    },

    deleteDoors() {
        for (let room of this.list) {
            if (!room) continue;
            for (let door of room.doors) {
                if (door === null || door.connected) continue;
                let loc = map.coords[door.x][door.y];
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
const Build = class extends Room {
    constructor() {
        super(...arguments);
    }

    create() {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let loc = map.coords[i][j];
                loc.wall = WALL_HP;
                loc.indestructible = true;
            }
		}
		
        this.createEntrance();
    }

    createEntrance() {
        let x, y, name;
        if (this.id === 0 || this.id === 1) {
            if (this.id === 1) {
				[x, y] = [this.x + BUILD_WIDTH - 1, this.y];
                let entrance = new Entrance('cure');
                entrance.init(POS_LOCATION, x, y);
			}
			
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y + BUILD_HEIGHT - 1];
            name = this.id === 0 ? 'book' : 'general';
        } else if (this.id === 2 || this.id === 3) {
            if (this.id === 2) {
				[x, y] = [this.x, this.y];
                let entrance = new Entrance('blacksmith');
                entrance.init(POS_LOCATION, x, y);
			}
			
			[x, y] = [this.x, this.y + BUILD_HEIGHT - 1];
            name = this.id === 2 ? 'potion' : 'scroll';
        } else if (this.id === 4 || this.id === 5) {
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y];
            name = this.id === 4 ? 'wand' : 'weapon';
		} else if (this.id === 6 || this.id === 7) {
			[x, y] = [this.x, this.y];
            name = this.id === 6 ? 'armor' : 'gamble';
		}

        let entrance = new Entrance(name);
        entrance.init(POS_LOCATION, x, y);
    }
}

const town = {
    createAll() {
        this.list = [];
        for (let i = 0; i < BUILD_NUM_MAX; i++) {
            let x = 3 + (i % BUILD_NUM_COL) * BUILD_WIDTH + (i % BUILD_NUM_COL) * 2;
            if (i % BUILD_NUM_COL >= 2) x++;
            let y = 3 + Math.floor(i / BUILD_NUM_COL) * BUILD_HEIGHT + Math.floor(i / BUILD_NUM_COL) * 2;
            if (Math.floor(i / BUILD_NUM_COL)) y++;
            this.createOne(x, y, i, BUILD_WIDTH, BUILD_HEIGHT);
		}
		
        let entrance = new Entrance('stash');
        let pos = positionFixedList.stash;
        entrance.init(POS_LOCATION, pos.x, pos.y);
        map.fill(true);
        map.lighten(true);
	},
	
    createOne() {
        let build = new Build(...arguments);
        build.create();
        this.list.push(build);
    },
};
const inventory = {
    clear() {
        message.clearFixed();
        investigation.clear();
        for (let key in this.list) {
            this.list[key].show = false;
        }
	},
    
    getMaxNumber(place) {
        let maxNum;
        switch (place) {
            case PLACE_PACK:
            case PLACE_FLOOR:
            case PLACE_SHOP:
                maxNum = MAX_PACK_COUNT;
                break;
            case PLACE_BOX:
                maxNum = rogue.numBoxes < MAX_BOX_NUM ? rogue.numBoxes : MAX_BOX_NUM;
                break;
            case PLACE_CUBE:
                maxNum = MAX_CUBE_COUNT;
                break;
            case PLACE_STASH:
                maxNum = MAX_STASH_COUNT;
                break;
		}
		
        return maxNum;
	},
	
    getInvName(place) {
        let name,
            isEnglish = option.isEnglish();
        switch (place) {
            case PLACE_PACK:
                name = isEnglish ? 'Pack' : '持物';
                break;
            case PLACE_FLOOR:
                name = isEnglish ? 'Floor' : '床';
                break;
            case PLACE_SHOP:
                name = isEnglish ? 'Shop' : '店';
                break;
            case PLACE_BOX:
                name = isEnglish ? 'Boxes' : 'ボックス';
                break;
            case PLACE_CUBE:
                name = isEnglish ? 'Alchemy' : '錬金術';
                break;
            case PLACE_STASH:
                name = isEnglish ? 'Stash' : '物置箱';
                break;
		}
        
        return name + (isEnglish ? ' List' : '一覧');
	},
	
    sort(a, list, array) {
        let found = false;
        let item = list[a];
        let index = itList.indexOf(list[a].type);
        for (let key in list) {
            let item2 = list[key];
            let index2 = itList.indexOf(item2.type);
            if (!found && index2 < index) continue;
            if (key >= a) break;
            found = true;
            if (!item.identified) {
                if (index2 === index) continue;
            } else {
                if (item2.identified && item2.tabId <= item.tabId && index2 === index) {
                    if (!(item2.charges >= 0) || item2.tabId !== item.tabId || item2.charges > item.charges) continue;
                }
			}
			
            if (array) {
                let temp = item;
                list.splice(a, 1);
                list.splice(key, 0, temp);
                return key;
            } else {
                let i = eaList.indexOf(a);
                let j = eaList.indexOf(key);
                for (let k = i; k > j; k--) {
					[list[eaList[k]], list[eaList[k - 1]]] = [list[eaList[k - 1]], list[eaList[k]]];
				}
				
                return;
            }
		}
		
        return a; //stash page
    },

    show({
        list,
        dr,
        a,
        place,
        enter,
    }) {
        let inv = this.list[dr === DR_RIGHT ? 'right' : 'left'];
        inv.show = true;

        let items = [];
        if (flag.shop) {
            var quantity2 = !rogue.cn ? 1 : Number(rogue.cn);
            if (a && quantity2 > list[a].quantity) quantity2 = list[a].quantity;
        } else if (place === PLACE_STASH) {
			var l = (enter.page - 1) * MAX_PACK_COUNT;
		}

        let count = 0;
        let weight = 0.0;
        for (let key in list) {
            let item = list[key];
            if (!flag.pack && !item ||
                place === PLACE_STASH && key < l ||
                flag.drop && flag.number && key != a ||
                flag.stash && a !== undefined && key != a ||
                flag.equip && !item.equipable ||
                flag.quaff && item.type != 'potion' ||
                flag.read && item.type != 'scroll' && item.type != 'recipe' && !item.chargeBook ||
                flag.identify && item.identified && key !== a ||
                (flag.repair || flag.blacksmith) && (!item.equipable || item.durab === item.durabMax) ||
                flag.zap && item.type != 'wand' ||
                flag.eat && item.type != 'food' ||
                flag.gain && (item.type != 'book' || !item.skill) ||
                flag.destroy && flag.number && key !== a ||
                (flag.shop || flag.option) && a && key !== a ||
                flag.fuel && (item.type !== 'light' && item.type !== 'oil' ||
                    rogue.equipment['light'].torch & !item.torch ||
                    !rogue.equipment['light'].torch && item.torch)
            ) {
				continue;
            }
            
            let itemVue = {};
            if (place === PLACE_STASH) {
                itemVue.key = eaList[key - l].toUpperCase();
			} else {
				itemVue.key = dr === DR_RIGHT ? key : key.toUpperCase();
			}

            if (flag.pack && !item || flag.option || flag.cure) {
                if (!flag.pack) {
                    itemVue.name = item[option.getLanguage()];
                    if (flag.cure) {
                        itemVue.price = enter.list[key].cost;
                    } else if (!flag.option2) {
                        let select;
                        let opt = option[item['key']];
                        if (opt.select) {
                            select = opt.select[opt.user][option.getLanguage()];
						} else if (option.isEnglish()) {
                            select = opt.user ? 'yes' : 'no';
						} else {
							select = opt.user ? 'はい' : 'いいえ';
						}

                        itemVue.select = select;
                    }
				}
				
                items.push(itemVue);
                continue;
            }
            
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;

            let nameColor;
            if (item.cursed && item.identified) {
                nameColor = colorList.red;
			} else if (item.equipable && !item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
            }
            
            itemVue.nameColor = nameColor;
            itemVue.name = item.getName(false, item.quantity, option.getLanguage(), flag.gamble && place === PLACE_SHOP);

            if (flag.shop || flag.blacksmith) {
                itemVue.price = flag.shop ? item.price * quantity2 : item.getDurabPrice();
			}
			
            let quantity;
            if (place === PLACE_SHOP || flag.shop && flag.number) {
                quantity = quantity2;
			} else {
                quantity = item.quantity;
                weight += item.weight * quantity;
            }
            
            itemVue.weight = (item.weight * quantity).toFixed(1);
            items.push(itemVue);
            if (++count === MAX_PACK_COUNT) break;
		}

        inv.items = items;

        if (flag.option || flag.cure) {
            inv.left = '';
            inv.right = '';
            return;
        }

        let maxNum = this.getMaxNumber(place);
        if (place === PLACE_STASH) {
            let lenStash = enter.list.length;
            count += (enter.page - 1) * MAX_PACK_COUNT;
            if (count > lenStash) count = lenStash;
        }

        inv.left = `[${count}/${maxNum}] ` + this.getInvName(place);

        let msgRight = '';
        if (place === PLACE_SHOP || flag.shop && flag.number) {
            let weight = option.isEnglish() ? 'Weight' : '重量';
            msgRight = `${weight} x${quantity2}`;
        } else if (place === PLACE_STASH) {
            msgRight = ` [${enter.page}/${MAX_STASH_PAGE}]`;
		} else {
            if (flag.gain) {
                let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
                msgRight = `${skillPoints} ${rogue.skillPoints} | `;
			}
			
            let total = option.isEnglish() ? 'Total' : '計';
            msgRight += `${total} ${weight.toFixed(1)}kg`;
		}
		
        if (flag.shop) {
            let sellOrCost;
            if (dr === DR_RIGHT) {
                sellOrCost = option.isEnglish() ? 'Sell Value' : '売値';
			} else {
				sellOrCost = option.isEnglish() ? 'Cost' : '買値';
			}

            msgRight = `${sellOrCost} x${quantity2} | ${msgRight}`;
        } else if (place === PLACE_STASH) {
            msgRight = (option.isEnglish() ? 'Page ' : 'ページ ') + msgRight;
        }
        
        inv.right = msgRight;
    },

    showEquipment(fighter, bp) {
        let inv = this.list.equipment;
        inv.show = true;
        let items = [];
        let keyNum = 0;
        let weight = 0;
        let count = 0;
        if (flag.blacksmith) var priceAll = 0;
        for (let key in fighter.equipment) {
            let item = fighter.equipment[key];
            if (flag.destroy && flag.number && key !== bp ||
                (flag.repair || flag.blacksmith) &&
                (!item || item.durab === item.durabMax)) {
                keyNum++;
                continue;
            }
            
            let itemVue = {};
            itemVue.key = eaList[keyNum++].toUpperCase();

            let parts = option.isEnglish() ? key : translation.bodyParts[key];
            if (key === 'main' || key === 'off') parts += fighter.swapped ? 2 : 1;
            itemVue.parts = parts;

            if (!item) {
                if (key === 'off' && fighter.equipment['main'] && fighter.equipment['main'].twoHanded) {
                    itemVue.name = option.isEnglish() ? `(two-handed)` : `(両手持ち)`;
				}
				
                items.push(itemVue);
                continue;
			}
			
            itemVue.symbol = item.symbol;
            itemVue.symbolColor = item.color;
            itemVue.shadow = item.shadow;
            itemVue.stroke = item.stroke;
            
            let nameColor;
            if (item.cursed) {
                nameColor = colorList.red;
			} else if (!item.durab) {
                nameColor = colorList.gray;
			} else {
				nameColor = colorList.white;
			}

            itemVue.nameColor = nameColor;
            itemVue.name = item.getName();

            if (flag.blacksmith) {
                let price = item.getDurabPrice();
                itemVue.price = price;
                priceAll += price;
			}

            itemVue.weight = (item.weight * item.quantity).toFixed(1);
            weight += item.weight * item.quantity;
            items.push(itemVue);
            count++;
		}
		
        inv.items = items;

        if (!flag.destroy && !flag.number && !flag.repair && !flag.blacksmith) {
            let statsList = [];
            for (let [key, term] of investigationMap.entries()) {
                if (!term || !term.equipList) {
                    if (key === 'end') {
                        break;
                    } else if (key === 'right') {
                        inv.statsLeft = statsList;
                        statsList = [];
                    }

                    continue;
                }
                
                let stats = {};
                if (fighter.findBuffStat(key)) stats.shadow = colorList.buff;
				if (fighter.lowerRes && (key === 'fire' || key === 'water' ||
                    key === 'air' || key === 'earth' || key === 'poison')) {
                    stats.color = colorList.red;
                }
                
                stats.name = term.name[option.getLanguage()];
                stats.value = fighter[key] + (term.perc ? '%' : '');
                if (term.max) {
                    stats.valueMax = fighter[term.max] + (term.perc ? '%' : '');
                }
                
                if (key === 'dmgAvg') {
                    let isMissile;
                    if (fighter.equipment) {
                        let weapon =  fighter.equipment.main;
                        if (weapon && weapon.type === 'missile') isMissile = true;
                    }

                    stats.value += ` x${isMissile ? fighter.timesMissile : fighter.timesMelee}`;
                }

                statsList.push(stats);
            }

            inv.statsRight = statsList;
        } else {
            inv.statsLeft = [];
            inv.statsRight = [];
        }
		
        let maxNum = MAX_EQUIPMENT_NUM;
        inv.left = `[${count}/${maxNum}] ` + (option.isEnglish() ? 'Equipment List' : '装備一覧');

        let total = option.isEnglish() ? 'Total' : '計';
        if (flag.blacksmith) {
            let cost = option.isEnglish() ? 'Total Cost' : '全費用';
            total = `${cost} ${priceAll} ${total}`;
        }

        inv.right = `${total} ${weight.toFixed(1)}kg`;
    },

    showSkill(fighter, list, assign) {
        let inv = this.list[assign ? 'keys' : 'skill'];
        inv.show = true;
        let skills = [];
        let count = 0;
        for (let key in list) {
            if (flag.number && list[key] !== fighter.cs) continue;
            let skill,
                skillVue = {};
            if (list[key]) skill = skillMap.get(list[key].id ? list[key].id : list[key]);
            if (assign) {
                if (skill) skillVue.shadow = skill.color;
                let keyName;
                if (key === '0') {
                    keyName = option.isEnglish() ? 'Main' : 'メイン';
                } else {
                    keyName = `F${key}`;
                }

                skillVue.key = keyName;
                if (!skill) {
                    skills.push(skillVue);
                    continue;
                }
            } else {
                skillVue.key = key;
            }
            
            let reqLvBool = skill.reqLvl <= fighter.lvl;
            let reqSyBool = !skill.reqSynerzy || skill.reqSynerzy <= fighter.getSynerzy(skill);
            if (reqLvBool && reqSyBool && (!flag.gain || fighter.skillPoints)) {
                skillVue.shadow = skill.color;
                if (skill.mp > fighter.mp) skillVue.mpColor = colorList.red;
            } else {
                skillVue.color = colorList.gray;
                if (!reqLvBool) skillVue.reqLvColor = colorList.red;
                if (!reqSyBool) skillVue.reqSyColor = colorList.red;
            }

            skillVue.name = skill.name[option.getLanguage()];
            let lvl = 0;
            if (list[key].lvl) {
                lvl = list[key].lvl
			} else {
                let a = fighter.searchSkill(list[key]);
                if (a) lvl = fighter.skill[a].lvl;
			}
			
            let boost = fighter.getSkillBoost(skill);
            skillVue.lvl = `${lvl}+${boost}`;
            if (skill.rate) {
                let value;
                let bonus = skill.rate * (lvl + boost) + (skill.synerzy ? skill.synerzy * fighter.getSynerzy(skill) : 0);
                if (skill.kind === 'breath') {
                    value = Math.ceil(fighter.hp * BREATH_RATE * (1 + bonus / 100));
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
                    let [min, max] = minMax.getNums(skill.base);
                    let bonusRate = 1 + bonus / 100;
                    min = Math.ceil(min * bonusRate);
                    max = Math.ceil(max * bonusRate);
                    value = `${min}-${max}`;
				}
				
                skillVue.value = value;
			}
			
            skillVue.mp = skill.mp;
            skillVue.reqLv = skill.reqLvl;
            skillVue.reqSy = skill.reqSynerzy;
            skills.push(skillVue);
            count++;
		}
		
        let [lvl, value, mp, reqLv, reqSy] = option.isEnglish() ?
            ['Lv', 'Value', 'MP', 'RLv', 'RSy'] :
            ['レベル', '値', 'MP', '必レ', '必シ'];
        let header = {
            lvl: lvl,
            value, value,
            mp: mp,
            reqLv: reqLv,
            reqSy: reqSy
        };

        skills.unshift(header);
        inv.items = skills;

        let maxNum;
        if (flag.gain) {
            maxNum = Object.keys(list).length;
		} else if (assign) {
            maxNum = MAX_ASSIGN_NUM;
		} else {
			maxNum = MAX_SKILL_NUM;
		}

        let msgLeft = `[${count}/${maxNum}] `;
        if (assign) {
            msgLeft += option.isEnglish() ? 'Key List' : 'キー一覧';
        } else {
            msgLeft += option.isEnglish() ? 'Skill List' : 'スキル一覧';
        }

        inv.left = msgLeft;

        if (!assign) {
            let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
            inv.right = `${skillPoints} ${fighter.skillPoints}`;
        }
    },

    showStats(fighter, a) {
        let inv = this.list.stats;
        inv.show = true;
        let items = [];
        for (let key in statistics.list) {
            if (a && key !== a) continue;
            let item = {};
            let stat = statistics.list[key];
            item.key = key.toUpperCase(); 
            item.name = stat.name[option.getLanguage()]
            item.select = fighter[stat.term + 'Max'];
            items.push(item);
        }
        
        inv.items = items;
        inv.left = option.isEnglish() ? 'Stat List' : 'ステータス一覧';
        let [statPoints, currentValues] = option.isEnglish() ?
            ['Stat Points', 'Current Values'] :
            ['ステータスポイント', '現在値'];
        inv.right = `${statPoints} ${fighter.statPoints} | ${currentValues}`;
    },

    showRecipe() {
        let inv = this.list.recipe;
        inv.show = true;
        let items = [];
        let recipes = itemTab['recipe'];
        let a = option.getLanguage();
        for (let [key, value] of recipes.entries()) {
            if (!rogue.recipes[key]) continue;
            let item = {};
            item.name = value.nameReal[a];
            item.cost = value.cost;
            item.recipe = value.recipe[a];
            items.push(item);
        }

        let header = {};
        header.name = option.isEnglish() ? 'Name' : '名称';
        header.cost = 'MP';
        header.recipe =  option.isEnglish() ? 'Recipe' : 'レシピ';
        items.unshift(header);
        inv.items = items;
    }
}

{
    inventory.list = {};
    let list = ['right', 'left', 'equipment', 'skill', 'keys', 'stats', 'recipe'];
    for (let type of list) {
        inventory.list[type] = {
            items: [],
            left: '',
            right: '',
            show: false,
        }
    }

    inventory.list.equipment.statsRight = [];
    inventory.list.equipment.statsLeft = [];
}
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
const modTab = {
    prefix: new Map([
        [BIAS_FIRE, {
            name: { a: 'Fire', b: '火炎の' },
            color: colorList.fire,
            lvl: 0,
            rarity: 0,
            melee: { dmgFire: '1d10' },
            missile: { dmgFire: '1d10' },
            staff: { fire: '1d10' },
            shield: { fire: '2d10' },
            armor: { fire: '1d10' },
            cloak: { fire: '1d10' },
            belt: { fire: '1d10' },
            helm: { fire: '1d10' },
            gloves: { fire: '1d10' },
            boots: { fire: '1d10' },
            amulet: { fire: '1d10' },
            ring: { fire: '1d10' },
            light: { fire: '1d10', lighten: 1 },
            gem: { fire: '1d5' },
            enemy: { fire: '2d10', str: '1d5', dmgFire: '1d10' },
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
            melee: { atkCold: '1d10' },
            missile: { atkCold: '1d10' },
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
            gem: { water: '1d5' },
            enemy: { water: '2d10', int: '1d5', atkCold: '1d10' },
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
            melee: { dmgLightning: '1d10' },
            missile: { dmgLightning: '1d10' },
            staff: { air: '1d10' },
            shield: { air: '2d10' },
            armor: { air: '1d10' },
            cloak: { air: '1d10' },
            belt: { air: '1d10' },
            helm: { air: '1d10' },
            gloves: { air: '1d10' },
            boots: { air: '1d10' },
            amulet: { air: '1d10' },
            ring: { air: '1d10' },
            light: { air: '1d10' },
            gem: { air: '1d5' },
            enemy: { air: '2d10', dex: '1d5', dmgLightning: '1d10', levi: true },
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
            melee: { atkSlow: '1d10' },
            missile: { atkSlow: '1d10' },
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
            gem: { earth: '1d5' },
            enemy: { earth: '2d10', con: '1d5', atkSlow: '1d10', acBonus: '1d10' },
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
            staff: { poison: '1d10' },
            shield: { poison: '2d10' },
            armor: { poison: '1d10' },
            cloak: { poison: '1d10' },
            belt: { poison: '1d10' },
            helm: { poison: '1d10' },
            gloves: { poison: '1d10' },
            boots: { poison: '1d10' },
            amulet: { poison: '1d10' },
            ring: { poison: '1d10' },
            light: { poison: '1d10' },
            gem: { poison: '1d5' },
            enemy: { poison: '2d10', dmgPoison: '1d10' },
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
            melee: {atkBlind: '1d10', dmgFire: '1d10' },
            missile: {atkBlind: '1d10', dmgFire: '1d10' },
            staff: { skillFire: 1 },
            shield: { fire: '3d10' },
            armor: { fire: '2d10' },
            cloak: { fire: '2d10' },
            belt: { fire: '2d10' },
            helm: { fire: '2d10' },
            gloves: { fire: '2d10' },
            boots: { fire: '2d10' },
            amulet: { skillFire: 1 },
            ring: { skillFire: 1 },
            light: { fire: '2d10', lighten: 1 },
            gem: { fire: '1d10'},
            enemy: { fire: '3d10', skillFire: 1, str: '1d5', atkBlind: '1d10', dmgFire: '1d10' },
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
            melee: { atkCold: '2d10' },
            missile: { atkCold: '2d10' },
            staff: { skillWater: 1 },
            shield: { water: '3d10' },
            armor: { water: '2d10' },
            cloak: { water: '2d10' },
            belt: { water: '2d10' },
            helm: { water: '2d10' },
            gloves: { water: '2d10' },
            boots: { water: '2d10' },
            amulet: { skillWater: 1 },
            ring: { skillWater: 1 },
            light: { water: '2d10' },
            gem: { water: '1d10' },
            enemy: { water: '3d10', skillWater: 1, int: '1d5', atkCold: '2d10' },
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
            melee: { dmgLightning: '2d10' },
            missile: { dmgLightning: '2d10' },
            staff: { skillAir: 1 },
            shield: { air: '3d10' },
            armor: { air: '2d10' },
            cloak: { air: '2d10' },
            belt: { air: '2d10' },
            helm: { air: '2d10' },
            gloves: { air: '2d10' },
            boots: { air: '2d10' },
            amulet: { skillAir: 1 },
            ring: { skillAir: 1 },
            light: { air: '2d10' },
            gem: { air: '1d10' },
            enemy: { air: '3d10', skillAir: 1, dex: '1d5', dmgLightning: '2d10' },
            affix: [
                { name: { a: 'of Sky', b: '天空の' }, rarity: 0 },
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
            melee: { atkSlow: '2d10' },
            missile: { atkSlow: '2d10' },
            staff: { skillEarth: 1 },
            shield: { earth: '3d10' },
            armor: { earth: '2d10' },
            cloak: { earth: '2d10' },
            belt: { earth: '2d10' },
            helm: { earth: '2d10' },
            gloves: { earth: '2d10' },
            boots: { earth: '2d10' },
            amulet: { skillEarth: 1 },
            ring: { skillEarth: 1 },
            light: { earth: '2d10' },
            gem: { earth: '1d10' },
            enemy: { earth: '3d10', skillEarth: 1, con: '1d5', atkSlow: '2d10' },
            affix: [
                { name: { a: 'of Star', b: '星の' }, rarity: 0 },
                { name: { a: 'of Asteroid', b: '小惑星の' }, rarity: 5 },
                { name: { a: 'of Planet', b: '惑星の' }, rarity: 10 },
                { name: { a: 'of Cosmos', b: '宇宙の' }, rarity: 15 },
                { name: { a: 'of Galaxy', b: '銀河の' }, rarity: 20 },
                { name: { a: 'of Stardust', b: '星屑の' }, rarity: 25 },
                { name: { a: 'of Celestial', b: '天上の' }, rarity: 30 },
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
            melee: { atkInf: '1d10', dmgPoison: '1d10' },
            missile: { atkInf: '1d10', dmgPoison: '1d10' },
            staff: { skillPoison: 1 },
            shield: { poison: '3d10' },
            armor: { poison: '2d10' },
            cloak: { poison: '2d10' },
            belt: { poison: '2d10' },
            helm: { poison: '2d10' },
            gloves: { poison: '2d10' },
            boots: { poison: '2d10' },
            amulet: { skillPoison: 1 },
            ring: { skillPoison: 1 },
            light: { poison: '2d10' },
            gem: { poison: '1d10' },
            enemy: { poison: '3d10', skillPoison: 1, atkInf: '1d10', dmgPoison: '1d10' },
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
            melee: { atkBlind: '2d10' },
            missile: { atkBlind: '2d10' },
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
            enemy: { earth: '2d10', air: '2d10', con: '1d5', dex: '1d5', atkBlind: '2d10' },
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
            melee: { atkCold: '1d10', dmgLightning: '1d10' },
            missile: { atkCold: '1d10', dmgLightning: '1d10' },
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
            enemy: { water: '2d10', air: '2d10', int: '1d5', dex: '1d5', atkCold: '1d10', dmgLightning: '1d10'},
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
            melee: { dmgAcid: '2d10' },
            missile: { dmgAcid: '2d10' },
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
            enemy: { water: '2d10', poison: '2d10', int: '1d5', dmgAcid: '2d10' },
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
            melee: { dmgFire: '1d10', atkSlow: '1d10' },
            missile: { dmgFire: '1d10', atkSlow: '1d10' },
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
            enemy: { fire: '2d10', earth: '2d10', str: '1d5', con: '1d5', dmgFire: '1d10', atkSlow: '1d10' },
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
            melee: { atkRadi: '2d10' },
            missile: { atkRadi: '2d10' },
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
            enemy: { fire: '2d10', poison: '2d10', str: '1d5', atkRadi: '2d10' },
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
            melee: { digging: '3d10' }
		},
		
        {
            name: { a: 'of Killer to Animal', b: '動物殺し' },
            lvl: 1,
            rarity: 0,
            melee: { dmgAnimal: '3d10' },
            missile: { dmgAnimal: '3d10' },
            gloves: { dmgAnimal: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Human', b: '人間殺し' },
            lvl: 5,
            rarity: 0,
            melee: { dmgHuman: '3d10' },
            missile: { dmgHuman: '3d10' },
            gloves: { dmgHuman: '2d10' },
            enemy: { dmgHuman: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Undead', b: '不死殺し' },
            lvl: 10,
            rarity: 0,
            melee: { dmgUndead: '3d10' },
            missile: { dmgUndead: '3d10' },
            gloves: { dmgUndead: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Dragon', b: '竜殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgDragon: '3d10' },
            missile: { dmgDragon: '3d10' },
            gloves: { dmgDragon: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Giant', b: '巨人殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgGiant: '3d10' },
            missile: { dmgGiant: '3d10' },
            gloves: { dmgGiant: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Demon', b: '悪魔殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgDemon: '3d10' },
            missile: { dmgDemon: '3d10' },
            gloves: { dmgDemon: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Spirit', b: '精霊殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgSpirit: '3d10' },
            missile: { dmgSpirit: '3d10' },
            gloves: { dmgSpirit: '2d10' }
		},
		
        {
            name: { a: 'of Killer to God', b: '神殺し' },
            lvl: 25,
            rarity: 0,
            melee: { dmgGod: '3d10' },
            missile: { dmgGod: '3d10' },
            gloves: { dmgGod: '2d10' }
		},
		
        {
            name: { a: 'of Multi Color', b: '万色' },
            lvl: 25,
            rarity: 50,
            shield: { resistAll: '2d10' },
            amulet: { resistAll: '1d10' },
            ring: { resistAll: '1d10' },
            enemy: { resistAll: '2d10' }
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
            melee: { str: '1d5' },
            gloves: { str: '1d5' },
            ring: { str: '1d5' },
            enemy: { str: '1d5' }
		},
		
        {
            name: { a: 'of Dexterity', b: '器用さ' },
            lvl: 1,
            rarity: 0,
            missile: { dex: '1d5' },
            boots: { dex: '1d5' },
            ring: { dex: '1d5' },
            enemy: { dex: '1d5' }
		},
		
        {
            name: { a: 'of Constitution', b: '耐久力' },
            lvl: 1,
            rarity: 0,
            armor: { con: '1d5' },
            belt: { con: '1d5' },
            amulet: { con: '1d5' },
            enemy: { con: '1d5' }
		},
		
        {
            name: { a: 'of Intelligence', b: '知力' },
            lvl: 1,
            rarity: 0,
            staff: { int: '1d5' },
            helm: { int: '1d5' },
            amulet: { int: '1d5' },
            enemy: { int: '1d5' }
		},
		
        {
            name: { a: 'of Speed', b: '速度' },
            lvl: 10,
            rarity: 30,
            cloak: { spd: '2d10' },
            amulet: { spd: '1d10' },
            ring: { spd: '1d10' },
            gem: { spd: '1d5' },
            enemy: { spd: '2d10' }
		},
		
        {
            name: { a: 'of Magic Finding', b: '魔法具探求' },
            lvl: 1,
            rarity: 30,
            light: { mf: '3d10' },
            amulet: { mf: '2d10' },
            ring: { mf: '2d10' },
            gem: { mf: '1d10' },
            enemy: { mf: '3d10' }
		},
		
        {
            name: { a: 'of Gold Finding', b: '財宝探求' },
            lvl: 1,
            rarity: 0,
            light: { gf: '4d10' },
            amulet: { gf: '3d10' },
            ring: { gf: '3d10' },
            gem: { gf: '2d10' },
            enemy: { gf: '4d10' }
		},
		
        {
            name: { a: 'of Life', b: '生命力' },
            lvl: 1,
            rarity: 0,
            shield: { hp: '2d10' },
            armor: { hp: '3d10' },
            belt: { hp: '2d10' },
            gem: { hp: '1d10' },
            enemy: { hp: '3d10' }
		},
		
        {
            name: { a: 'of Mana', b: '魔力' },
            lvl: 1,
            rarity: 0,
            staff: { mp: '1d10' },
            armor: { mp: '2d10' },
            helm: { mp: '1d10' },
            gem: { mp: '1d5' },
            enemy: { mp: '2d10' }
		},
		
        {
            name: { a: 'of Life Regeneration', b: '回復力' },
            lvl: 5,
            rarity: 50,
            shield: { hpReg: '1d10' },
            light: { hpReg: '1d10' },
            belt: { hpReg: '2d10' },
            amulet: { hpReg: '1d10' },
            ring: { hpReg: '1d10' },
            gem: { hpReg: '1d5' },
            enemy: { hpReg: '2d10' }
		},
		
        {
            name: { a: 'of Mana Regeneration', b: '魔力回復' },
            lvl: 5,
            rarity: 50,
            staff: { mpReg: '1d10' },
            light: { mpReg: '1d10' },
            belt: { mpReg: '2d10' },
            amulet: { mpReg: '1d10' },
            ring: { mpReg: '1d10' },
            gem: { mpReg: '1d5' },
            enemy: { mpReg: '2d10' }
		},
		
        {
            name: { a: 'of Attack Speed', b: '攻撃速度' },
            lvl: 10,
            rarity: 20,
            melee: { ias: '2d10' },
            missile: { ias: '2d10' },
            gloves: { ias: '2d10' },
            ring: { ias: '2d10' },
            gem: { ias: '1d10' },
            enemy: { ias: '2d10' }
		},
		
        {
            name: { a: 'of Faster Cast', b: '詠唱速度' },
            lvl: 10,
            rarity: 20,
            staff: { fcr: '2d10' },
            helm: { fcr: '2d10' },
            amulet: { fcr: '2d10' },
            gem: { fcr: '1d10' },
            enemy: { fcr: '2d10' }
		},
		
        {
            name: { a: 'of Faster Run Walk', b: '早足' },
            lvl: 10,
            rarity: 20,
            boots: { frw: '2d10' },
            gem: { frw: '1d5' },
            enemy: { frw: '2d10' }
		},
		
        {
            name: { a: 'of Minimum Damage', b: '最小ダメージ' },
            lvl: 10,
            rarity: 0,
            melee: { dmgMinBonus: '1d5' },
            missile: { dmgMinBonus: '1d5' },
            enemy: { dmgMinBonus: '1d5' }
		},
		
        {
            name: { a: 'of Maximum Damage', b: '最大ダメージ' },
            lvl: 5,
            rarity: 0,
            melee: { dmgMaxBonus: '1d10' },
            missile: { dmgMaxBonus: '1d10' },
            enemy: { dmgMaxBonus: '1d10' }
		},
		
        {
            name: { a: 'of Life Steal', b: '生命力吸収' },
            lvl: 5,
            rarity: 20,
            melee: { stealLife: '1d3' },
            missile: { stealLife: '1d3' },
            gloves: { stealLife: '1d3' },
            ring: { stealLife: '1d3' },
            gem: { stealLife: 1 },
            enemy: { stealLife: '1d3' }
		},
		
        {
            name: { a: 'of Mana Steal', b: '魔力吸収' },
            lvl: 5,
            rarity: 20,
            melee: { stealMana: '1d3' },
            missile: { stealMana: '1d3' },
            gloves: { stealMana: '1d3' },
            ring: { stealMana: '1d3' },
            gem: { stealMana: 1 },
            enemy: { stealMana: '1d3' }
		},
		
        {
            name: { a: 'of Damage', b: 'ダメージ' },
            lvl: 1,
            rarity: 0,
            melee: { dmgBonus: '3d10' },
            missile: { dmgBonus: '2d10' },
            gloves: { dmgBonus: '2d10' },
            ring: { dmgBonus: '2d10' },
            gem: { dmgBonus: '1d10' },
            enemy: { dmgBonus: '2d10' }
		},
		
        {
            name: { a: 'of Accuracy', b: '精度' },
            lvl: 1,
            rarity: 0,
            melee: { rateBonus: '2d10' },
            missile: { rateBonus: '3d10' },
            gloves: { rateBonus: '2d10' },
            ring: { rateBonus: '2d10' },
            light: { rateBonus: '2d10' },
            gem: { rateBonus: '1d10' },
            enemy: { rateBonus: '2d10' }
		},
		
        {
            name: { a: 'of Protection', b: '守り' },
            lvl: 1,
            rarity: 0,
            staff: { acBonus: '2d10' },
            shield: { acBonus: '3d10' },
            armor: { acBonus: '2d10' },
            cloak: { acBonus: '2d10' },
            belt: { acBonus: '2d10' },
            helm: { acBonus: '2d10' },
            gloves: { acBonus: '2d10' },
            boots: { acBonus: '2d10' },
            amulet: { acBonus: '2d10' },
            gem: { acBonus: '1d10' },
            enemy: { acBonus: '2d10' }
		},
		
        {
            name: { a: 'of Experience', b: '経験' },
            lvl: 15,
            rarity: 50,
            amulet: { expBonus: '1d10' },
            ring: { expBonus: '1d10' },
            gem: { expBonus: '1d5' },
		},
		
        {
            name: { a: 'of Stealth', b: '隠密' },
            lvl: 1,
            rarity: 0,
            staff: { stealth: '2d10' },
            cloak: { stealth: '3d10' },
            boots: { stealth: '2d10' },
            amulet: { stealth: '2d10' },
            ring: { stealth: '2d10' },
            gem: { stealth: '1d10' },
            enemy: { stealth: '3d10' }
		},
		
        {
            name: { a: 'of Detection', b: '探知' },
            lvl: 1,
            rarity: 0,
            staff: { searching: '2d10' },
            helm: { searching: '2d10' },
            amulet: { searching: '2d10' },
            ring: { searching: '2d10' },
            light: { searching: '3d10' },
            gem: { searching: '1d10' },
            enemy: { searching: '3d10' }
		},
		
        {
            name: { a: 'of Slow Digestion', b: '遅消化' },
            lvl: 1,
            rarity: 0,
            staff: { digest: '2d10' },
            armor: { digest: '2d10' },
            belt: { digest: '3d10' },
            amulet: { digest: '2d10' },
            ring: { digest: '2d10' },
            gem: { digest: '1d10' },
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
            light: { fuelBonus: '4d10' },
		},
		
        {
            name: { a: 'of Sustain Strength', b: '筋力維持' },
            lvl: 1,
            rarity: 0,
            gloves: { strSus: true },
            ring: { strSus: true },
		},
		
        {
            name: { a: 'of Sustain Dexterity', b: '器用さ維持' },
            lvl: 1,
            rarity: 0,
            boots: { dexSus: true },
            ring: { dexSus: true },
		},
		
        {
            name: { a: 'of Sustain Constitution', b: '耐久力維持' },
            lvl: 1,
            rarity: 0,
            belt: { conSus: true },
            amulet: { conSus: true },
		},
		
        {
            name: { a: 'of Sustain Intelligence', b: '知力維持' },
            lvl: 1,
            rarity: 0,
            helm: { intSus: true },
            amulet: { intSus: true },
		},
		
        {
            name: { a: 'of Levitation', b: '浮遊' },
            lvl: 1,
            rarity: 80,
            // cloak: { levi: true },
            // boots: { levi: true },
            // amulet: { levi: true },
            ring: { levi: true },
            // enemy: { levi: true }
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
            gem: { durabBonus: '1d10' },
            light: { durabBonus: '2d10' }
        },
		
        {
            name: { a: 'of Art', b: '技巧' },
            lvl: 10,
            rarity: 40,
            melee: { embeddedBonus: 1 },
            missile: { embeddedBonus: 1 },
            staff: { embeddedBonus: 1 },
            shield: { embeddedBonus: 1 },
            armor: { embeddedBonus: 1 },
            cloak: { embeddedBonus: 1 },
            belt: { embeddedBonus: 1 },
            helm: { embeddedBonus: 1 },
            gloves: { embeddedBonus: 1 },
            boots: { embeddedBonus: 1 },
            amulet: { embeddedBonus: 1 },
            ring: { embeddedBonus: 1 },
            light: { embeddedBonus: 1 }
        },
    ],

    restrict: {
        str: 20,
        dex: 20,
        con: 20,
        int: 20,
        skillFire: 20,
        skillWater: 20,
        skillAir: 20,
        skillEarth: 20,
        skillPoison: 20,
        skillAll: 50,
        numBoxes: 50,
        lighten: 50,
    }
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
        if (!this.colorReal) this.colorReal = this.color;
        if (!this.shadow) this.shadow = 0;
        if (!this.shadowReal) this.shadowReal = this.shadow;
        this.stroke = 0;
        this.strokeReal = 0;
    }

    static evalMod(mod, mf, shop) {
        if (mod === MOD_MAGIC) {
            mf /= 1;
        } else if (mod === MOD_RARE) {
            mf /= 4;
        } else if (mod === MOD_UNIQUE) {
            mf /= 10;
        }

        let perc = 5;
        if (!shop) perc += mf;
        if (perc > 95) perc = 95;
        return evalPercentage(perc);
    }

    getVolumeBase() {
        let rate;
        switch (this.type) {
            case 'enemy':
            case 'armor':
                rate = 1;
                break;
            case 'shield':
                rate = 0.5;
                break;
            case 'helm':
            case 'boots':
                rate = 0.4;
                break;
            case 'gloves':
            case 'melee':
            case 'missile':
            case 'staff':
                rate = 0.3;
                break;
            case 'light':
                rate = 0.2;
                break;
            case 'cloak':
            case 'belt':
                rate = 0.1;
                break;
            case 'amulet':
                rate = 0.02;
            case 'ring':
                rate = 0.01;
                break;
		}
		
        return rate * 10;
    }

    getTRateBase() {
        let rate;
        switch (this.type) {
            case 'shield':
                rate = 1;
                break;
            case 'armor':
                rate = .8;
                break;
            case 'cloak':
                rate = .7;
                break;
            case 'gloves':
                rate = .6;
                break;
            case 'enemy':
            case 'helm':
                rate = .5;
                break;
            case 'boots':
                rate = .4;
                break;
            case 'belt':
                rate = .3;
                break;
		}
		
        return rate;
    }

    getBaseandWeight(mat) {
        let char = this.type === 'enemy';
        let volume = this.getVolumeBase() * this.volumeRate;
        this.weight = Math.ceil(volume / 10 * mat.density * 100) / 100;
        let durabRate = 1;
        if (this.weapon || char) {
            let dmgBase = mat.hardness * this.volumeRate;
            if (this.edge === 1) {
                dmgBase *= 1.1;
                durabRate *= 3 / 4;
            }

            if (this.atkType === AT_BLUNT) durabRate *= 5 / 4;
            if (this.type === 'staff') dmgBase *= .5;
            this.dmgBase = Math.ceil(dmgBase);
            if (char) this.dmgBare = this.dmgBase;
		}
        
        if (this.armor || char) {
            let acTRateBase = this.getTRateBase();
            if (!this.acTRate) this.acTRate = 1;
            let acSBase = volume * mat.hardness;
            let acBBase = volume * mat.toughness;
            let acTBase = volume * mat.tBase * acTRateBase * this.acTRate;
            this.acSBase = this.getAcVar(acSBase, AT_SLASH);
            this.acBBase = this.getAcVar(acBBase, AT_BLUNT);
            this.acTBase = this.getAcVar(acTBase, AT_THRUST);
            this.acAvg = Math.ceil((this.acSBase + this.acBBase + this.acTBase) / 3);
		}
        
        if (!char) this.durabRate = durabRate;
    }

    getAcVar(ac, type) {
        if (!ac) return 0;
        let varRate;
        if (type === AT_SLASH) {
            varRate = 10;
        } else if (type === AT_THRUST) {
            varRate = 15;
        } else if (type === AT_BLUNT) {
            varRate = 5;
        }

        let acVar = Math.ceil(ac * varRate / 100);
        acVar = rndIntBet(-acVar, acVar);
        let func = acVar ? Math.ceil : Math.floor;
        ac = func(ac + acVar);
        if (ac < 1) ac = 1;
        return ac;
    }

    getMaterialBase() {
        let i = 0;
        let list = [...materialList];
        list.shuffle();
        while (!(this.material & list[i])) i++;
        return list[i];
    }

    getMaterial(matBase, matId) {
        let lvl = this.lvl;
        if (!matBase) matBase = this.getMaterialBase();
        this.material = matBase;
        let materials = materialMap.get(matBase);
        let list = materials.list;
        let mat;
        if (!(matId >= 0)) {
            let nums = materials.nums;
            nums.shuffle();
            let i = 0;
            do { 
                matId = nums[i++];
                mat = list.get(matId);
            } while (mat.lvl > lvl || evalPercentage(mat.rarity))

		} else {
            mat = list.get(matId);
        }
        
        this.matId = matId;
        this.priceRate = mat.priceRate;
        if (this.type !== 'enemy' && this.embeddedLimit > mat.embeddedNum) this.embeddedLimit = mat.embeddedNum;
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
        if (matBase === M_BONE && this.type === 'enemy') {
            nameA = nameA.replace(/bone$/i, '');
            nameB = nameB.replace(/ボーン$|骨$/, '');
        } else {
            nameB += 'の';
        }

        if (nameA && nameB) {
            if (this.type === 'enemy') {
                this.name['a'] = nameA + ' ' + this.name['a'];
                this.name['b'] = nameB + this.name['b'];
            } else {
                this.nameReal['a'] = nameA + ' ' + this.nameReal['a'];
                this.nameReal['b'] = nameB + this.nameReal['b'];
                if (this.mod === MOD_UNIQUE) this.getUniqueName();
            }
		}
		
        this.color = this.colorReal = mat.color;
        this.getBaseandWeight(mat);
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
                perc: perc,
                max: max,
			});
            
            color = pre.color;
            if (!(this.material & M_GEM)) {
                namePreA = pre.name['a'];
                namePreB = pre.name['b'];
            }
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
			
            nameSufA = suf.name['a'];
            nameSufB = suf.name['b'];
        }
        
        if (namePreA) namePreA = `<${namePreA}> `;
        if (namePreB) namePreB = `<${namePreB}>`;
        if (nameSufA) nameSufA = ` <${nameSufA}>`;
        if (nameSufB) nameSufB = `<${nameSufB}>`;
		
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
        this.mod = MOD_MAGIC;
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
            perc: perc,
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
		
        this.mod = MOD_RARE;
        this.shadow = this.shadowReal = colorList.yellow;
        let nameAffiA = ` <${affix.name['a']}>`;
        let nameAffiB = `<${affix.name['b']}>`;
        if (char) {
            if (affix.color) this.color = affix.color;
            this.name['a'] = `${this.name['a']}${nameAffiA}`;
            this.name['b'] = `${nameAffiB}${this.name['b']}`;
            this.getOrLooseStats(mods, true, true);
            this.getBias(bias);
        } else {
            if (affix.color) this.colorMod = affix.color;
            this.nameReal['a'] = `${this.nameReal['a']}${nameAffiA}`;
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
        this.shadow = this.shadowReal = !this.boss ? colorList.gold : colorList.indigo;
        this.stroke = this.strokeReal = colorList.gold;
        if (this.type === 'enemy') {
            rogue.cue[this.name[LETTER_ENG]] = true;
        } else {
            mergeMod({
                obj: this,
                obj2: unique.values,
                fixed: true,
			});
            
            let names = unique.name; 
            this.nameUnique = { a: names['a'], b: names['b'], pre: names.pre };
            this.mod = MOD_UNIQUE;
            this.modList = {};
            copyObj(this.modList, unique.values);
        }
    }

    getUniqueName(names, halluc) {
        if (!names) names = this.nameUnique;
        let [nameA, nameB] = [names['a'], names['b']];
        let [namePreB, nameSufB] = names.pre ? [`<${nameB}の>`, ''] : ['', `<${nameB}>`];
        let name = halluc ? this.name : this.nameReal;
        name['a'] = `${name['a']} <of ${nameA}>`;
        name['b'] = `${namePreB}${name['b']}${nameSufB}`;
    }

    makeMaterial(char) {
        if (!this.modList) this.modList = {};
        for (let key in this.modList) {
            if (this.modList[key] === DEFAULT) {
                delete this.modList[key];
                continue;
			}
			
            let num = this.modList[key];
            this.modList[key] = rndIntBet(1, num);
		}
		
        let material = this.getMaterialBase();
        let matBaseList = materialMap.get(material); 
        if (matBaseList.bonus || material === M_GEM) {
            let values;
            if (material === M_GEM) {
                if (this.matId === undefined) return;
                values = matBaseList.list.get(this.matId).values;
            } else {
                values = matBaseList.bonus;
            }

            mergeMod({
                obj: this.modList,
                obj2: values,
                perc: 0,
                max: 1,
                min: 1,
            });
        }

        if (!Object.keys(this.modList).length) return;
        let item = {};
        copyObj(item, this.modList);
        if (char) {
            item.modList = {};
            copyObj(item.modList, this.modList);
            item.desc = {
                a: ``,
                b: `埋め込み可能な${matBaseList.name['b']}の装備品に合成すると属性値が付与される。`    
            };
        } else {
            item.modParts = {};
            item.modParts[this.type] = {};
            copyObj(item.modParts[this.type], this.modList);
            let type = translation.item[this.type];
            item.desc = {
                a: ``,
                b: `埋め込み可能な${matBaseList.name['b']}の${type}に合成すると属性値が付与される。`    
            };
        }

        item.name = {};
        item.nameReal = {};
        copyObj(item.name, this.name);
        copyObj(item.nameReal, this.name);
        item.color = item.colorReal = this.colorReal;
        item.shadow = item.shadowReal = this.shadowReal;
        item.stroke = item.strokeReal = this.strokeReal;
        item.lvl = this.lvl;
        item.mod = this.mod;
        item.rarity = this.rarity;
        item.material = material;
        item.identified = false;
        item.quantity = 1;
        item.type = 'material';
        item.tabId = materialList.indexOf(material);
        item.weight = weightList[item.type];
        item.priceRate = materialMap.get(material).pRate;
        item.__proto__ = Item.prototype;
        item.symbolReal = item.symbol = char ? '\'' : '`';
        item.piece = !char || this.piece;
        item.calcPrice();
        if (char) {
            item.putDown(this.x, this.y, true);
        } else {
            return item;
        }
    }

}

const mergeMod = ({
    obj,
    obj2,
    perc,
    max,
    min,
    fixed,
    remove,
}) => {
    let count = 0;
    for (let key in obj2) {
        let mod = obj2[key];
        let value = 0;
        if (fixed || mod === true || mod === DEFAULT) {
            value = mod;
            if (remove) value = -value;
		} else {
            if (!count) {
                count++;
                let restrict = modTab.restrict[key] ? (1 - modTab.restrict[key] / 100) : 1;
                while (count < min || count < max && evalPercentage(perc * restrict)) {
                    count++;
                    perc /= 2;
                }
			}
			
            for (let i = 0; i < count; i++) {
				value += isFinite(mod) ? mod : minMax.dice(mod);
			}
		}
		
        obj[key] ? obj[key] += value : obj[key] = value;
	}
}
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
const Item = class extends Material {
    constructor(obj, quantity) {
        super(obj);
        this.id = -1;
        this.quantity = quantity;
    }

    static goldAmount(lvl) {
        return 50 * lvl + rndIntBet(1, 50 * (lvl + 1));
    }

    init(position, x, y, magic, lvl, uniqueId, starter, matBase, matId) {
        this.lvl = lvl;
        let gem = this.type === 'gem';
        if (this.equipable || gem) {
            if (!gem) {
                this.durabBonus = 0;
                if (this.equipable) {
                    this.embeddedNum = 0;
                    this.embeddedList = [];
                }
            }
            
            if (!magic) {
                magic = this.mod === MOD_MAGIC ||
                    !starter && Material.evalMod(MOD_MAGIC, rogue.mf, flag.shop);
			}

            if (magic && !flag.shop && itemUniqueMap[this.type].has(this.tabId) &&
              	  (uniqueId >= 0 || Material.evalMod(MOD_UNIQUE, rogue.mf))) {
                let array = itemUniqueMap[this.type].get(this.tabId);
                let found;
                for (let i = 0, l = array.length; i < l; i++) {
                    if (uniqueId >= 0 && uniqueId !== i) continue;
                    let unique = array[i];
                    let id = this.type + ',' + this.tabId + ',' + i;
                    if (!rogue.cui[id] &&
                     		(uniqueId >= 0 || unique.lvl <= this.lvl &&
                            !evalPercentage(unique.rarity))) {
                        this.getUnique(unique);
                        this.uniqueId = i;
                        rogue.cui[id] = true;
                        matBase = unique.matBase;
                        matId = unique.matId;
                        magic = false;
                        break;
                    }
				}
				
                if (magic) this.mod = MOD_RARE;
            }

            if (!gem) this.getMaterial(matBase, matId);
            if (magic || this.material === M_GEM) {
                let bias = this.bias ? this.bias : RANDOM;
                if (this.mod === MOD_RARE || Material.evalMod(MOD_RARE, rogue.mf)) {
                    this.getRare(bias);
				} else {
					this.getMagic(bias);
				}
            } else if (!this.mod) {
                this.mod = MOD_NORMAL;
                this.cursed = !starter && !flag.shop && evalPercentage(CURSE_PERC);
            }

            if (this.equipable) {
                this.calcDurab(true);
                if (starter) {
                    this.embeddedMax = 0;
                } else {
                    this.adjustEmbeddedNum();
                }
            }

            if (this.type === 'light') {
                if (this.fuelBonus) this.fuelValue = Math.ceil(this.fuelValue * (1 + this.fuelBonus / 100));
                this.fuelMax = this.fuelValue;
                if (!flag.shop && !starter) this.fuelValue = Math.ceil(this.fuelValue * (rndInt(100) / 100));
                this.calcFuelLvl();
            } else if (this.weapon) {
                if (!this.dmgBonus) this.dmgBonus = 0;
                if (!this.rateBonus) this.rateBonus = 0;
                if (!starter && !flag.shop && (this.cursed || this.mod === MOD_NORMAL && rogue.cdl)) {
                    let found;
                    if (this.type === 'staff') {
                        if (!this.acBonus) this.acBonus = 0;
                        if (this.cursed || evalPercentage(25)) {
                            this.acBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }
                    } else {
                        if (this.cursed || evalPercentage(25)) {
                            this.dmgBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }

                        if (this.cursed || evalPercentage(25)) {
                            this.rateBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                            found = true;
                        }
                    }

                    if (!this.cursed && found) this.getSuperiorName();
				}
				
                this.calcDmgOne();
            } else if (this.armor) {
                if (!this.acBonus) this.acBonus = 0;
                if (!starter && !flag.shop && (this.cursed ||
                        this.mod === MOD_NORMAL && rogue.cdl && evalPercentage(25))) {
                    this.acBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 20);
                    if (!this.cursed) this.getSuperiorName();
				}
				
                this.calcAcOne();
			}
			
            if (!this.colorMod) this.colorMod = this.color;
            this.calcPrice();
            if (flag.shop || starter) {
                this.identified = true;
                this.changeNameAndPrice();
            }
        } else {
            this.mod = MOD_NORMAL;
            if (flag.shop) this.identified = true;
            if (this.type === 'ammo') {
                if (this.quantity === 1) this.quantity = rndIntBet(80, 100);
            } else if (this.type === 'coin') {
                if (this.quantity === 1)
                    this.priceReal = Math.ceil(Item.goldAmount(rogue.cdl) * (1 + rogue.gf / 100));
                else {
                    this.priceReal = this.quantity;
                    this.quantity = 1;
				}
				
                this.nameReal['a'] = this.nameReal['b'] = '$' + this.priceReal;
            } else if (this.type === 'wand') {
                this.charges = rndIntBet(3, 6);
			} else if (this.type === 'potion' && !this.lethe || this.type === 'scroll') {
                if (this.quantity === 1 && !flag.synthesize) this.quantity = rndIntBet(1, 5);
			}
			
            if (this.type !== 'coin') this.calcPrice();
            if (flag.shop || itemTab[this.type].get(this.tabId).identified) {
                if (this.type === 'wand' && !flag.shop && this.identified) this.identified = false;
                this.changeNameAndPrice();
            }
        }

        if (!this.weight) this.weight = weightList[this.type];
        if (flag.shop) this.price *= flag.gamble ? 10 : 2;
        if (position === POS_LIST) return;
        super.init(position, x, y);
    }

    putDown(x, y, sound) {
        do {
			this.id = Math.random();
		} while (map.itemList[this.id]);

        this.spiralSearch(x, y, 'item');
        if (this.abort) return;
        this.place = PLACE_FLOOR;
        map.itemList[this.id] = this;
        let loc = map.coords[this.x][this.y];
        let l = Object.keys(loc.item).length;
        loc.item[eaList[l]] = this;
        if (sound) audio.playSound(this.type);
        if (rogue.hallucinated) hallucinate.one(this);
    }

    indexOf(list) {
        for (let key in list) {
            if (Object.is(list[key], this)) return key;
        }
    }

    equal(obj) {
        if (this.type !== obj.type || this.tabId !== obj.tabId) return false;
        if (this.type === 'wand' && this.identified && obj.identified || this.chargeBook) {
			return this.charges === obj.charges;
		}

        if (this.type !== 'wand' && !this.equipable && this.type !== 'gem' && this.type !== 'material') {
			 return this.identified === obj.identified;
		}

        return this.identified && obj.identified &&
            JSON.stringify(this, Item.replacer) === JSON.stringify(obj, Item.replacer);
    }

    static replacer(key, value) {
        return key === 'quantity' || key === 'place' || key === 'price' ? undefined : value;
    }

    dropped() {
        let name = this.getName();
        message.draw(option.isEnglish() ?
            `Dropped ${name}` :
            `${name}を落とした`)
    }

    calcDmgOne() {
        let bonus = 1 + (this.dmgBonus ? this.dmgBonus / 100 : 0);
        let minBonus = this.dmgMinBonus ? this.dmgMinBonus : 0;
        let maxBonus = this.dmgMaxBonus ? this.dmgMaxBonus : 0;
        this.dmgValue = Math.floor((this.dmgBase + (minBonus + maxBonus) / 2) * bonus);
        this.reqStr = Math.ceil((this.weight - 3) * 10);
        if (this.reqStr <= 0) this.reqStr = undefined;
    }

    calcAcOne() {
        let perc = 1 + this.acBonus / 100;
        this.acSValue = Math.floor(this.acSBase * perc);
        this.acTValue = Math.floor(this.acTBase * perc);
        this.acBValue = Math.floor(this.acBBase * perc);
        this.acAvgValue = Math.floor(this.acAvg * perc);
    }

    calcDurab(init) {
        if (!this.durabRate) this.durabRate = 1;
        let durabBase = DURAB_BASE + this.weight * DURAB_RATE;
        this.durabMax = Math.ceil(durabBase * this.durabRate + this.durabBonus);
        if (init || this.durab > this.durabMax) this.durab = this.durabMax;
    }

    calcFuelLvl() {
        this.fuelLvl = Math.ceil(this.fuelValue / this.fuelMax * 100);
    }

    identifyAll() { //potion, scroll
        itemTab[this.type].get(this.tabId).identified = true;
        this.identified = true;
        this.changeNameAndPrice();
        searchItemToIdentifiy.main(this.nameReal[LETTER_ENG], this.type);
    }

    identifyWand() {
        let itemT = itemTab[this.type].get(this.tabId);
        if (!itemT.identified) {
            itemT.identified = true;
            searchItemToIdentifiy.main(this.nameReal[LETTER_ENG], this.type);
        }
    }


    getDurabPrice() {
        let price = (this.durabMax - this.durab) * DURAB_PRICE;
        return price;
    }

    getSuperiorName() {
        this.superior = true;
        this.nameReal['a'] = 'Superior ' + this.nameReal['a'];
        this.nameReal['b'] = '上等な' + this.nameReal['b'];
        if (this.identified) {
            this.name['a'] = 'Superior ' + this.name['a'];
            this.name['b'] = '上等な' + this.name['b'];
        }
    }

    uncurse() {
        this.cursed = false;
        audio.playSound('uncurse');
        if (this.embeddedList && this.embeddedList.length) {
            for (let embedded of this.embeddedList) {
                if (embedded.cursed) {
                    embedded.cursed = false;
                    let list = embedded.modParts ? embedded.modParts[this.type] : embedded.modList;
                    list.cursed = false;
                }
            }
        }
    }

    calcPrice() {
        this.price = this.priceReal = priceList[this.type];
        if (this.priceRate) this.priceReal = Math.round(this.priceReal * this.priceRate);
        if (this.equipable || this.type === 'gem' || this.type === 'material') {
            let times;
            switch (this.mod) {
                case MOD_NORMAL:
                    times = 1;
                    break;
                case MOD_MAGIC:
                    times = 2;
                    break;
                case MOD_RARE:
                    times = 5;
                    break;
                case MOD_UNIQUE:
                    times = 10;
                    this.priceReal += 1000;
                    break;
			}
			
            this.priceReal *= times;
            if (this.equipable) {
                let weight = 1 + this.weight / 2;
                this.price = Math.round(this.price * weight);
                this.priceReal = this.cursed ? 1 : Math.round(this.priceReal * weight);
            }
        }
    }

    changeNameAndPrice() { //identified
        let halluc = !!this.typeHalluc;
        let name = halluc ? this.nameTemp : this.name;
        name['a'] = this.nameReal['a'];
        name['b'] = this.nameReal['b'];
        this.changePrice();
        if (this.equipable || this.type === 'material' ||
        this.type === 'gem' || this.type === 'orb') {
            let color = this.colorMod ? this.colorMod : this.colorReal;
            this.colorReal = color;
            if (!halluc) this.color = color
        }
    }

    changePrice() {
        if (this.type === 'wand') {
            this.price = Math.round(this.priceReal * (1 + this.charges * WAND_CHARGE_PRICE_RATE));
		} else {
			this.price = this.priceReal;
		}
    }

    getName(real, quantity = this.quantity, a = option.getLanguage(), gamble) {
        let type = this.typeHalluc ? this.typeHalluc : this.type;
        let halluc = !!this.typeHalluc;
        let name;
        let isEng = a === LETTER_ENG;
        if (gamble) {
            name = isEng ? getUpperCase(type) : translation.item[type];
            if (quantity > 1) name += ` x${quantity}`;
            return name;
		}
		
        name = real ? this.nameReal[a] : this.name[a];
        if (type === 'book' || type === 'potion' || type === 'scroll' ||
            type === 'recipe' || type === 'wand' || type === 'orb') {
            if (this.type2) type = this.type2;
            let typeName;
            if (isEng) {
                typeName = getUpperCase(type);
                if (!this.identified && !halluc) {
                    if (type === 'potion' || type === 'wand') {
                        name += ` ${typeName}`;
					} else if (type === 'scroll' || type === 'recipe') {
						name = `${typeName} titled ${name}`;
					} else if (type === 'orb') {
						name = `${typeName} engraved ${name}`;
                    }
                } else {
					name = `${typeName} of ${name}`;
				}
            } else {
                typeName = translation.item[type];
                if (!this.identified && (type === 'scroll' || type === 'recipe') && !halluc) {
                    name += `と名付けられた${typeName}`;
                } else if (!this.identified && type === 'orb' && !halluc) {
                    name += `と刻まれた${typeName}`;
                } else {
					name += `の${typeName}`;
				}
			}
        }
        
        if (!halluc) {
            if (type === 'light' && this.identified) {
                name += ` [${this.fuelLvl}%]`;
            } else if (type === 'material') {
                let matName;
                if (this.piece) {
                    matName = isEng ? 'Piece' : '欠片';
                    if (isEng) matName = getArticleAndPlural(matName, false, true, quantity);
                } else {
                    matName = materialMap.get(this.material).name[a]
                        .replace(isEng ? /s$/ : /類$|製$|材$/, '');
                }

                name = isEng ? `${matName} of ${name}` : `${name}の${matName}`;
            }

            if (this.equipable) {
                let string = '';
                if (this.weapon) {
                    if (this.twoHanded) string += ' (2H)';
                    if (this.identified) string += ` (${this.dmgValue})`;
                } else if (this.armor && this.identified) {
                        string += ` [${this.acAvgValue}]`;
                        if (rogue.isWizard) string += ` [${this.acSValue},${this.acTValue},${this.acBValue}]`
                }
                
                name += string;
            }
            
            if (this.identified) {
                if (this.durabMax) name += ` {${this.durab}}`;
                if (this.charges >= 0) name += ` [${this.charges}]`;
                if (this.embeddedMax) name += ` <${this.embeddedNum}/${this.embeddedMax}>`;
            }

            if (this.equipable || type === 'material' || type === 'gem') {
                if (!this.identified) {
                    name += isEng ? ' (Unid)' : ' (未識別)';
                } else if (this.cursed) {
                    name = (isEng ? 'Cursed ' : '呪われた') + name;
                }
            }
        }
		
        if (quantity > 1) name += ` x${quantity}`;
        return name;
    }

    split(quantity, list) {
        let item = {};
        copyObj(item, this);
        if (item.embeddedList && item.embeddedList.length) {
            for (let itemEmbedded of item.embeddedList) {
                itemEmbedded.__proto__ = Item.prototype;
            }
        }

        item.__proto__ = Item.prototype;
        item.quantity = quantity;
        this.quantity -= quantity;
        if (!this.quantity) {
            let a = this.indexOf(list);
            if (this.place === PLACE_BOX || this.place === PLACE_EQUIPMENT) {
                list[a] = null;
			} else if (this.place === PLACE_STASH) {
                list.splice(a, 1);
			} else {
				deleteAndSortItem(list, a);
			}

            if (this.place === PLACE_FLOOR) delete map.itemList[item.id];
		}
		
        return item;
    }

    adjustEmbeddedNum() {
        let limit = this.embeddedLimit;
        if (this.mod === MOD_NORMAL) {
            this.embeddedMax = evalPercentage(50) ? 0 : rndIntBet(1, limit);
        } else {
            let bonus = this.embeddedBonus;
            if (bonus) {
                if (this.mod === MOD_MAGIC) {
                    if (bonus > 4) bonus  = 4;
                } else if (this.mod === MOD_RARE) {
                    if (bonus > 2) bonus = 2;
                }

                if (bonus > limit) bonus = limit;
                this.embeddedMax = this.embeddedBonus = bonus;
            } else {
                this.embeddedMax = 0;
            }
        }
    }

    isShowing() {
        let loc = map.coords[this.x][this.y];
        return !rogue.blinded && (loc.found && !loc.wall || this.detected);
    }

    static getType(magic) {
        let type;
        do {
            if (magic) {
                if (evalPercentage(20)) {
                    type = coinToss() ? 'gem' : 'orb';
                } else {
                    let len = equipmentTypeList.length;
                    type = equipmentTypeList[rndInt(len - 1)];
                }
            } else {
                type = itList[rndInt(itList.length - 2)];
            }
        } while (evalPercentage(rarityList[type]) ||
        flag.shop && (type === 'coin' || type === 'recipe' || type === 'orb' || type === 'gem'));
        return type;
    }
            
    static getTabId(type, lvl, magic) {
        let tabId, item;
        let j = 0;
        let itemNums = itemNumsMap.get(type);
        itemNums.shuffle();
        do {
            tabId = itemNums[j++];
            item = itemTab[type].get(tabId);
            if (!item) {
                j = 0;
                type = Item.getType(magic);
                itemNums = itemNumsMap.get(type);
                itemNums.shuffle();
            }
        } while (!item || item.abort ||
            rogue.lethe && item.lethe ||
            item.type === 'recipe' && rogue.recipes[tabId] ||
            item.lvl > lvl || evalPercentage(item.rarity));
        return [type, tabId];
    }

    static getSymbol(type) {
        let symbol;
        switch (type) {
            case 'book':
            case 'scroll':
            case 'recipe':
                symbol = '?';
                break;
            case 'food':
                symbol = ':';
                break;
            case 'potion':
            case 'oil':
                symbol = '!';
                break;
            case 'wand':
                symbol = '-';
                break;
            case 'food':
                symbol = ':';
                break;
            case 'missile':
                symbol = '}';
                break;
            case 'staff':
                symbol = '_';
                break;
            case 'shield':
                symbol = ')';
                break;
            case 'armor':
                symbol = '[';
                break;
            case 'cloak':
                symbol = '(';
                break;
            case 'belt':
                symbol = '~';
                break;
            case 'helm':
            case 'gloves':
            case 'boots':
                symbol = ']';
                break;
            case 'light':
                symbol = '＊';
                break;
            case 'ring':
                symbol = '=';
                break;
            case 'amulet':
                symbol = '"';
                break;
            case 'gem':
                symbol = '*';
                break;
            case 'orb':
                symbol = '・';
                break;
            case 'ammo':
                symbol = '{';
                break;
            case 'coin':
                symbol = '$';
                break;
		}
		
        return symbol;
    }

    static initTab() {
        for (let key in itemTab) {
            for (let [tabId, item] of itemTab[key].entries()) {
                item.type = key;
                item.tabId = tabId;
                if (!item.symbol) item.symbol = Item.getSymbol(item.type);
                if (!item.name) item.name = {};
                if (key === 'book' || key === 'food' || key === 'coin' ||
                	    key === 'ammo' || key === 'oil' || key === 'misc') {
                    item.identified = true;
				} else if (key === 'melee' || key === 'missile' || key === 'staff' || key === 'shield' || key === 'armor' ||
                  		key === 'cloak' || key === 'belt' || key === 'helm' || key === 'gloves' || key === 'boots' ||
                	    key === 'light' || key === 'ring' || key === 'amulet') {
                    item.equipable = true;
                    item.grade = GRADE_NORMAL;
                    if (key === 'melee' || key === 'missile' || key === 'staff') {
                        item.weapon = true;
					} else if (key === 'light' || key === 'ring' || key === 'amulet') {
                        item.ornament = true;
					} else {
						item.armor = true;
					}
                }
                
                if (item.equipable || key === 'gem') {
                    item.name['a'] = item.nameReal['a'];
                    item.name['b'] = item.nameReal['b'];
                }
				
                if (key === 'book') { //sort list
                    if (!item.skill) continue;
                    let list = item.list;
                    let keys = Object.keys(list);
                    for (let i = 0, l = keys.length, found; i < l - 1; i++, found = false) {
                        for (let j = l - 1; j > i; j--) {
                            let [a, b] = [keys[j - 1], keys[j]];
                            if (skillMap.get(list[a]).reqLvl > skillMap.get(list[b]).reqLvl) {
                                [list[a], list[b]] = [list[b], list[a]];
                                found = true;
                            }
						}
						
                        if (!found) break;
                    }
                } else if (key === 'scroll') {
                    item.color = colorList.white;
                } else if (key === 'recipe') {
                    item.color = colorList.red;
                    item.desc = {
                        a: '',
                        b: '錬金術で使用されるレシピ。読み上げる事で習得する。'
                    }
                }

                if (key === 'orb') {
                    item.mod = MOD_NORMAL;
                    item.shadow = colorList.orange;
                    item.priceRate = (10 + tabId) / 10;
                    item.desc = {
                        a: '',
                        b: '埋め込み可能な装備品に合成すると種類に応じて属性値が付与される。'
                    }
                }
            }
        }
    }
}

Item.initTab();

const searchItemToIdentifiy = {
    main(nameReal, type) {
        this.loop(rogue.pack, nameReal, type);
        this.loop(rogue.boxes, nameReal, type);
        this.loop(map.itemList, nameReal, type);
        for (let key in map.enemyList) {
			this.loop(map.enemyList[key].pack, nameReal, type);
		}
	},
	
    loop(list, nameReal, type) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === type && item.nameReal[LETTER_ENG] === nameReal) {
                if (item.type !== 'wand') item.identified = true;
                item.changeNameAndPrice()
            }
        }
    }
};
const fighterTab = {
    ants: [
		{
			name: { a: 'Giant Ant', b: '巨蟻' },
			symbol: 'a',
			color: colorList.acid,
			race: RACE_ANIMAL,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 8,
			rarity: 0,
			hpRate: -10,
			mpRate: 0,
			str: 10,
			dex: 10,
			con: 5,
			int: 5,
			spd: -50,
			dmgBase: 10,
			acBase: 50,
			dmgAcid: 10,
			group: true,
			dropNum: 0,
			matDropRate: 3,
			material: M_SHELL,
			atkType: AT_THRUST,
		},
	],

    bats: [
		{
			name: { a: 'Giant Bat', b: '大蝙蝠' },
			symbol: 'b',
			color: colorList.gray,
			race: RACE_ANIMAL,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 4,
			rarity: 0,
			hpRate: -9,
			mpRate: 0,
			str: 5,
			dex: 20,
			con: 10,
			int: 5,
			spd: 50,
			dmgBase: 10,
			acBase: 20,
			stealLife: 30,
			dropNum: 0,
			matDropRate: 3,
			material: M_FEATHER,
			atkType: AT_THRUST,
			grow: STAT_DEX,
		},
	],

    canines: [
		{
            name: { a: 'She-wolf', b: '雌狼' },
            symbol: 'c',
            color: colorList.brown,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: -10,
            mpRate: 0,
            str: 5,
            dex: 10,
            con: 5,
            int: 5,
            spd: 0,
            dmgBase: 10,
            acBase: 25,
            frw: 20,
            dropNum: 0,
            matDropRate: 2,
            material: M_FUR,
            atkType: AT_SLASH,
            grow: STAT_DEX,
		},
		
        {
            name: { a: 'Laelaps, the Hound of Cephalus', b: '狩人ケパロスの猟犬ラエラプス' },
            symbol: 'c',
            color: colorList.brown,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 20,
            rarity: 30,
            hpRate: -2,
            mpRate: 0,
            str: 40,
            dex: 80,
            con: 30,
            int: 25,
            spd: 25,
            dmgBase: 70,
            acBase: 100,
            frw: 100,
            dropNum: 2,
            matDropRate: 0,
            material: M_FUR,
            atkType: AT_SLASH | AT_THRUST,
            skillProb: 1 / 6,
            skill: {
				a: { id: RAID, lvl: 5 },
            },

            desc: {
                a:'',
                b:'女神アルテミスより授与された、どんな獲物も逃がさないとされる猟犬。同じく、どんな追手にも捕まらないという狐と膠着状態となり、ゼウスにより両者は石に変えられる。',
            }
        },
	],
	
    felines: [
		{
            name: { a: 'Lion', b: '獅子' },
            symbol: 'f',
            color: colorList.yellow,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 13,
            rarity: 0,
            hpRate: -4,
            mpRate: 0,
            str: 25,
            dex: 30,
            con: 25,
            int: 5,
            spd: 25,
            dmgBase: 30,
            acBase: 80,
            dropNum: 0,
            matDropRate: 2,
            material: M_FUR,
            atkType: AT_SLASH | AT_THRUST,
            grow: STAT_STR
		},
		
        {
            name: { a: 'Nemean lion', b: 'ネメアの獅子' },
            symbol: 'f',
            color: colorList.yellow,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 21,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 50,
            dex: 50,
            con: 30,
            int: 25,
            spd: 25,
            dmgBase: 75,
            acBase: 250,
            acRed: 25,
            earth: 50,
            frw: 50,
            dropNum: 2,
            matDropRate: 0,
            material: M_FUR,
            atkType: AT_SLASH | AT_THRUST,
            skillProb: 1 / 5,
            skill: {
				a: { id: RAID, lvl: 5 },
            },

            desc: {
                a:'',
                b:'ネメアの谷に住む獅子。その毛皮は棍棒や矢では傷付かないが、ヘラクレスに手づかみにされ絞殺される。',
            }
        },
	],
	
    golems: [
		{
            name: { a: 'Golem', b: 'ゴーレム' },
            symbol: 'g',
            color: null,
            race: RACE_GIANT,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 14,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 30,
            dex: 10,
            con: 25,
            int: 5,
            spd: -50,
            dmgBase: null,
            acBase: null,
            piece: true,
            volumeRate: 1,
            dropNum: 0,
            matDropRate: 2,
            material: M_STONE,
            atkType: AT_BLUNT,
            grow: STAT_CON,
		},
		
        // {
        //     name: { a: 'Golem', b: 'ゴーレム' },
        //     symbol: 'g',
        //     color: null,
        //     race: RACE_GIANT,
        //     mod: MOD_NORMAL,
        //     grade: GRADE_NORMAL,
        //     lvl: 20,
        //     rarity: 10,
        //     hpRate: 2,
        //     mpRate: 0,
        //     str: 10,
        //     dex: 3,
        //     con: 10,
        //     int: 1,
        //     spd: 0,
        //     dmgBase: null,
        //     acBase: null,
        //     dropNum: 0,
        //     matDropRate: 2,
        //     material: M_METAL,
        //     atkType: AT_THRUST,
        //     grow: STAT_CON,
        //     volumeRate: 2
		// },
		
        // {
        //     name: { a: 'Golem', b: 'ゴーレム' },
        //     symbol: 'g',
        //     color: null,
        //     race: RACE_GIANT,
        //     mod: MOD_NORMAL,
        //     grade: GRADE_NORMAL,
        //     lvl: 30,
        //     rarity: 20,
        //     hpRate: 2,
        //     mpRate: 0,
        //     str: 10,
        //     dex: 3,
        //     con: 10,
        //     int: 1,
        //     spd: 10,
        //     dmgBase: null,
        //     acBase: null,
        //     dropNum: 0,
        //     matDropRate: 2,
        //     material: M_GEM,
        //     atkType: AT_SLASH,
        //     grow: STAT_CON,
        //     volumeRate: 3
        // },
	],
	
    humanoids: [
		{
            name: { a: 'Incarnation', b: '化身' },
            symbol: 'h',
            color: colorList.white,
            race: RACE_GOD,
            mod: MOD_RARE,
            grade: GRADE_NORMAL,
            lvl: 25,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 50,
            dex: 50,
            con: 50,
            int: 50,
            spd: 25,
            dmgBase: 100,
            acBase: 100,
            fire: 30,
            water: 30,
            air: 30,
            earth: 30,
            poison: 30,
            dropNum: 3,
            matDropRate: 1,
            atkType: AT_BLUNT,
        },

        {
            name: { a: 'Calypso, the Sea Goddess', b: '海の女神カリュプソ' },
            symbol: 'h',
            color: colorList.blue,
            race: RACE_GOD,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 150,
            dex: 150,
            con: 150,
            int: 150,
            spd: 100,
            dmgBase: 200,
            acBase: 200,
            water: 100,
            strSus: true,
            dexSus: true,
            conSus: true,
            intSus: true,
            dropNum: 4,
            matDropRate: 0,
            atkType: AT_BLUNT,
            skillProb: 1 / 4,
            skill: { 
				a: { id: ICE_BOLT, lvl: 10 },
				b: { id: HEAL, lvl: 10 },
				c: { id: AQUA_BREATH, lvl: 10 }
            },

            desc: {
                a:'',
                b:'巨人アトラスの娘、仙女。海に漂流したオデュッセウスを救護し、7年間孤島で共に暮す。',
            }
        },
	],
	
    incubuses: [
		{
			name: { a: 'Incubuses', b: '夢魔' },
			symbol: 'i',
			color: colorList.gray,
			race: RACE_DEMON,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 26,
			rarity: 0,
			hpRate: 0,
			mpRate: 0,
			str: 50,
			dex: 75,
			con: 50,
			int: 50,
			spd: 50,
			dmgBase: 70,
			acBase: 100,
			stealMana: 30,
			levi: true,
			awake: true,
			dropNum: 2,
			matDropRate: 2,
			material: M_SKIN,
			atkType: AT_SLASH,
		},
	],

    mimics: [
		{
			name: { a: 'Mimic', b: 'ミミック' },
			symbol: 'm',
			color: colorList.brown,
            race: null,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 10,
			rarity: 0,
			hpRate: -10,
			mpRate: 0,
			str: 25,
			dex: 25,
			con: 5,
			int: 5,
			spd: 0,
			dmgBase: 75,
			acBase: 50,
			stillness: true,
            canAttack: true,
			awake: true,
			mimic: true,
			dropNum: 1,
			matDropRate: 1,
			atkType: AT_BLUNT,
		},
	],

    persons: [
		{
            name: { a: 'Warrior', b: '戦士' },
            symbol: 'p',
            color: colorList.brown,
            race: RACE_HUMAN,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 7,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 15,
            dex: 10,
            con: 10,
            int: 5,
            spd: 0,
            dmgBase: 1,
            acBase: 0,
            dropNum: 1,
            matDropRate: 2,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_STR,
            starter: [
				{ type: 'melee', tabId: M_CLUB },
				{ type: 'armor', tabId: A_ARMOR }
			]
		},
		
        {
            name: { a: 'Hunter', b: '狩人' },
            symbol: 'p',
            color: colorList.red,
            race: RACE_HUMAN,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 10,
            rarity: 0,
            hpRate: -2,
            mpRate: 0,
            str: 10,
            dex: 20,
            con: 10,
            int: 10,
            spd: 0,
            dmgBase: 1,
            acBase: 0,
            dropNum: 1,
            matDropRate: 2,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_DEX,
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
            race: RACE_HUMAN,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 15,
            rarity: 0,
            hpRate: -5,
            mpRate: 2,
            str: 5,
            dex: 5,
            con: 5,
            int: 10,
            spd: 0,
            dmgBase: 1,
            acBase: 0,
            dropNum: 2,
            matDropRate: 2,
            skillProb: 1 / 5,
            skill: { 
				a: { id: FIRE_BOLT, lvl: 10 },
				b: { id: SHORT_TELEPORTATION, lvl: 1 }
			},

            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_INT,
            starter: [
				{ type: 'staff', tabId: S_STAFF },
				{ type: 'armor', tabId: A_ROBE }
			]
		},
		
        {
            name: { a: 'Thief', b: '盗賊' },
            symbol: 'p',
            color: colorList.gray,
            race: RACE_HUMAN,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 20,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 25,
            dex: 50,
            con: 25,
            int: 25,
            spd: 25,
            dmgBase: 1,
            acBase: 0,
            atkStealItem: 20,
            atkStealGold: 20,
            stealth: 25,
            dropNum: 2,
            matDropRate: 2,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_DEX,
            starter: [
				{ type: 'melee', tabId: M_DAGGER },
				{ type: 'armor', tabId: A_VEST }
			]
		},
		
        {
            name: { a: 'Iros, the Beggar', b: '乞食イロス' },
            symbol: 'p',
            color: colorList.brown,
            race: RACE_HUMAN,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 5,
            rarity: 30,
            hpRate: -8,
            mpRate: 0,
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            spd: 0,
            dmgBase: 1,
            acBase: 0,
            atkStealItem: 20,
            dropNum: 1,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            starter: [
                { type: 'staff', tabId: S_STICK, matBase: M_WOOD, matId: WOOD_CYPRESS },
                { type: 'armor', tabId: A_ROBE, matBase: M_CLOTH, matId: CLOTH_LINEN }
            ],

            desc: {
                a:'',
                b:'イタケの町を徘徊する土着の乞食。同業に対して頭面をしていたが、乞食に扮したオデュッセウスと格闘の末打ち据えられる。',
            }
		},
		
        {
            name: { a: 'Dolon, the Spy', b: '偵察者ドロン' },
            symbol: 'p',
            color: colorList.bronze,
            race: RACE_HUMAN,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 10,
            rarity: 30,
            hpRate: -2,
            mpRate: 0,
            str: 35,
            dex: 40,
            con: 30,
            int: 25,
            spd: 50,
            dmgBase: 1,
            acBase: 0,
            dropNum: 1,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            skillProb: 1 / 10,
            skill: {
				a: { id: SHORT_TELEPORTATION, lvl: 1 },
				b: { id: TELEPORTATION, lvl: 1 }
            },

            starter: [
                { type: 'missile', tabId: M_BOW, matBase: M_WOOD, matId: WOOD_CYPRESS },
                { type: 'melee', tabId: M_SPEAR, matBase: M_METAL, matId: METAL_BRONZE, side: 'a' },
                { type: 'cloak', tabId: C_COAT, matBase: M_FUR, matId: FUR_WOLF },
                { type: 'helm', tabId: H_CAP, matBase: M_FUR, matId: FUR_FERRET },
                { type: 'ammo', tabId: A_ARROW },
            ],

            desc: {
                a:'',
                b:'伝令使エウメデスの子、トロイア人。ギリシャ軍の偵察任務を買って出たが捕らわれる。尋問の後、懇願するもディオメデスにより殺される。',
            }
		},
		
        {
            name: { a: 'Pandarus, the Archer of Troy', b: 'トロイアの射手パンダロス' },
            symbol: 'p',
            color: colorList.bronze,
            race: RACE_HUMAN,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 22,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 50,
            dex: 100,
            con: 50,
            int: 50,
            spd: 50,
            dmgBase: 1,
            acBase: 0,
            dexSus: true,
            dropNum: 2,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            starter: [
				{ type: 'missile', tabId: M_BOW, uniqueId: 0 },
				{ type: 'ammo', tabId: A_ARROW },
				{ type: 'melee', tabId: M_SPEAR, matBase: M_METAL, matId: METAL_BRONZE, side: 'a' },
				{ type: 'armor', tabId: A_ARMOR, matBase: M_METAL, matId: METAL_BRONZE },
			],

            skillProb: 1 / 8,
            skill: {
				a: { id: SHORT_TELEPORTATION, lvl: 1 },
				b: { id: ENCOURAGEMENT, lvl: 1 }
			},

            desc: {
                a:'',
                b:'ゼレイア王リュカオンの子。メネラウスに急所を射る矢を放つも、アテネにより防がれ、同じく庇護を受けたディオメデスの槍で息絶える。',
            }
		},
		
        {
            name: { a: 'Nestor, the Knight of Gerenia', b: 'ゲレニアの騎士ネストル' },
            symbol: 'p',
            color: colorList.bronze,
            race: RACE_HUMAN,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 29,
            rarity: 30,
            hpRate: 2,
            mpRate: 0,
            str: 100,
            dex: 100,
            con: 100,
            int: 125,
            spd: 50,
            dmgBase: 1,
            acBase: 0,
            ias: 50,
            strSus: true,
            dexSus: true,
            conSus: true,
            dropNum: 2,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            skillProb: 1 / 6,
            skill: {
				a: { id: RUSH, lvl: 5 },
				b: { id: SPEED, lvl: 5 }
            },

            starter: [
				{ type: 'melee', tabId: M_SWORD, matBase: M_METAL, matId: METAL_BRONZE },
				{ type: 'melee', tabId: M_SPEAR, matBase: M_METAL, matId: METAL_BRONZE, side: 'a' },
				{ type: 'shield', tabId: S_SHIELD, matBase: M_METAL, matId: METAL_GOLD, magic: true },
				{ type: 'armor', tabId: A_ARMOR, matBase: M_METAL, matId: METAL_BRONZE },
				{ type: 'cloak', tabId: C_CLOAK, matBase: M_CLOTH, matId: CLOTH_WOOL },
				{ type: 'belt', tabId: B_SASH, matBase: M_CLOTH, matId: CLOTH_WOOL },
				{ type: 'helm', tabId: H_HELM, matBase: M_METAL, matId: METAL_BRONZE },
				{ type: 'boots', tabId: B_SHOES, matBase: M_CLOTH, matId: CLOTH_WOOL },
            ],

            desc: {
                a:'',
                b:'ネレウスの子、ピュロスの王、ギリシャ軍の武将。老齢期にトロイア戦争に参加、助言・相談役を果たす。',
            }
		},
		
        {
            name: { a: 'Orlando, the Frenzy', b: '狂乱のオルランド' },
            symbol: 'p',
            color: colorList.orange,
            race: RACE_HUMAN,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 32,
            rarity: 30,
            hpRate: 6,
            mpRate: 0,
            str: 150,
            dex: 100,
            con: 150,
            int: 1,
            spd: 100,
            dmgBase: 50,
            acBase: 50,
            ias: 100,
            frw: 100,
            strSus: true,
            dexSus: true,
            conSus: true,
            awake: true,
            dropNum: 4,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            desc: {
                a:'',
                b:'シャルルマーニュの甥、聖騎士。思い人のアンジェリカが他妻となり発狂。その怪力で自身の鎧ごと衣服を引き裂き、分別なく暴れ狂う。',
            }
        },
	],
	
    quadrupeds: [
        {
            name: { a: 'Boar', b: '猪' },
            symbol: 'q',
            color: colorList.brown,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 2,
            rarity: 0,
            hpRate: -8,
            mpRate: 0,
            str: 5,
            dex: 5,
            con: 10,
            int: 5,
            spd: 0,
            dmgBase: 20,
            acBase: 25,
            dropNum: 0,
            matDropRate: 2,
            material: M_FUR,
            atkType: AT_BLUNT,
            grow: STAT_CON
		},
		
		{
            name: { a: 'Horse', b: '馬' },
            symbol: 'q',
            color: colorList.orange,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 3,
            rarity: 0,
            hpRate: -9,
            mpRate: 0,
            str: 10,
            dex: 15,
            con: 5,
            int: 5,
            spd: 0,
            dmgBase: 15,
            acBase: 25,
            frw: 100,
            dropNum: 0,
            matDropRate: 2,
            material: M_SKIN,
            atkType: AT_BLUNT,
            grow: STAT_DEX
		},
		
        {
            name: { a: 'Rays of the Sun, the Horse of Rhesus', b: 'トラキア王レソスの馬 `陽光の矢`' },
            symbol: 'q',
            color: colorList.white,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 12,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 25,
            dex: 35,
            con: 25,
            int: 25,
            spd: 50,
            dmgBase: 30,
            acBase: 100,
            frw: 100,
            dropNum: 2,
            matDropRate: 0,
            material: M_SKIN,
            atkType: AT_BLUNT,
            desc: {
                a:'',
                b:'トラキア産の駿馬。大型で、雪よりも白く、走る速さは風にも劣らない。トロイア軍から奪った際、ネストルはこの馬を見て感嘆し、陽光の矢と評する。',
            }
		},
		
        {
            name: { a: 'Calydonian Boar', b: 'カリュドーンの大猪' },
            symbol: 'q',
            color: colorList.brown,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 23,
            rarity: 30,
            hpRate: 2,
            mpRate: 0,
            str: 100,
            dex: 50,
            con: 100,
            int: 50,
            spd: 25,
            dmgBase: 150,
            acBase: 100,
            frw: 50,
            matDropRate: 0,
            dropNum: 2,
            material: M_FUR,
            atkType: AT_BLUNT,
            skillProb: 1 / 6,
            skill: {
				a: { id: RUSH, lvl: 5 },
            },

            desc: {
                a:'',
                b:'女神アルテミスがカリュドーンの町に放った大猪。辺り一帯を荒すが、青年期のネストルを含む勇士達により討伐される。',
            }
        },
	],
	
    skeletons: [
		{
			name: { a: 'Skeleton', b: 'スケルトン' },
			symbol: 's',
			color: null,
			race: RACE_UNDEAD,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 3,
			rarity: 0,
			hpRate: -9,
			mpRate: 0,
			str: 5,
			dex: 5,
			con: 5,
			int: 5,
			spd: 0,
			dmgBase: null,
			acBase: null,
            piece: true,
			volumeRate: 1,
			dropNum: 0,
			matDropRate: 3,
			material: M_BONE,
			atkType: AT_BLUNT,
		},
	],

    worms: [
		{
			name: { a: 'Giant Worm', b: '大芋虫' },
			symbol: 'w',
			color: colorList.white,
			race: RACE_ANIMAL,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 1,
			rarity: 0,
			hpRate: -15,
			mpRate: 0,
			str: 1,
			dex: 1,
			con: 1,
			int: 1,
			spd: -100,
			dmgBase: null,
			acBase: null,
			atkSlow: 20,
			group: true,
            piece: true,
			volumeRate: 0.5,
			dropNum: 0,
			matDropRate: 3,
			material: M_CLOTH,
			atkType: AT_BLUNT,
		},
	],

    zombies: [
		{
			name: { a: 'Living Bush', b: '生ける繁み' },
			symbol: 'z',
			color: colorList.gray,
			race: RACE_UNDEAD,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 5,
			rarity: 0,
			hpRate: -8,
			mpRate: 0,
			str: 1,
			dex: 1,
			con: 1,
			int: 1,
			spd: -100,
			dmgBase: null,
			acBase: null,
			atkInf: 20,
			group: true,
            piece: true,
			volumeRate: 0.5,
			dropNum: 0,
			matDropRate: 3,
			material: M_WOOD,
			atkType: AT_BLUNT,
		},
	],

    angels: [
		{
			name: { a: 'Fallen Angel', b: '堕天使' },
			symbol: 'A',
			color: colorList.shadow,
			race: RACE_DEMON,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 28,
			rarity: 0,
			hpRate: 2,
			mpRate: 2,
			str: 50,
			dex: 50,
			con: 50,
			int: 100,
			spd: 50,
			dmgBase: 100,
			acBase: 150,
			air: 50,
			levi: true,
			dropNum: 2,
			matDropRate: 1,
			material: M_FEATHER,
			atkType: AT_BLUNT,
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
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: -10,
            mpRate: 0,
            str: 1,
            dex: 20,
            con: 1,
            int: 5,
            spd: 50,
            dmgBase: 15,
            acBase: 5,
            air: 30,
            levi: true,
            dropNum: 0,
            matDropRate: 2,
            material: M_FEATHER,
            atkType: AT_THRUST,
            grow: STAT_DEX
		},
		
        {
            name: { a: 'Aedon, the Nightingale', b: '夜鶯アエドン' },
            symbol: 'B',
            color: colorList.yellowgreen,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 15,
            rarity: 30,
            hpRate: -6,
            mpRate: 0,
            str: 25,
            dex: 50,
            con: 50,
            int: 25,
            spd: 100,
            dmgBase: 25,
            acBase: 50,
            air: 30,
            levi: true,
            awake: true,
            dropNum: 3,
            matDropRate: 0,
            material: M_FEATHER,
            atkType: AT_SLASH | AT_THRUST,
            skillProb: 1 / 8,
            skill: {
				a: { id: WIND_BREATH, lvl: 5 },
				b: { id: SCREAM, lvl: 5 }
            },

            desc: {
                a:'',
                b:'パンダレオスの娘。ニオベに多くの子がいる事を妬み、子の殺害を試みるが、自身の子を誤って殺害。悲しみに泣き暮れる様をゼウスが夜鶯の姿に変化させる。',
            }
		},
		
        {
            name: { a: 'Nisos, the White-tailed Eagle', b: '尾白鷲ニソス' },
            symbol: 'B',
            color: colorList.shadow,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 27,
            rarity: 30,
            hpRate: -6,
            mpRate: 0,
            str: 50,
            dex: 100,
            con: 50,
            int: 50,
            spd: 50,
            dmgBase: 100,
            acBase: 50,
            air: 30,
            ias: 25,
            levi: true,
            dropNum: 4,
            matDropRate: 0,
            material: M_FEATHER,
            atkType: AT_SLASH | AT_THRUST,
            skillProb: 1 / 6,
            skill: {
				a: { id: RAID, lvl: 10 },
            },

            desc: {
                a:'',
                b:'メガラの王。娘スキュラが敵将に恋慕し、父を殺し国を差し出すも拒まれ、海に飛び込む。その後鳥の姿となるが、同じく大鷲と化した父ニソスが復讐を狙う。',
            }
        },
	],
	
    chimeras: [
		{
            name: { a: 'Chimera', b: 'キメラ' },
            symbol: 'C',
            color: null,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 12,
            rarity: 0,
            hpRate: -5,
            mpRate: 0,
            str: 25,
            dex: 25,
            con: 25,
            int: 25,
            spd: 50,
            dmgBase: null,
            acBase: null,
            piece: true,
            volumeRate: 1,
            dropNum: 1,
            matDropRate: 2,
            material: M_SKIN,
            atkType: AT_THRUST,
		},
		
        // {
        //     name: { a: 'Chimera', b: 'キメラ' },
        //     symbol: 'C',
        //     color: null,
        //     race: RACE_ANIMAL,
        //     mod: MOD_NORMAL,
        //     grade: GRADE_NORMAL,
        //     lvl: 20,
        //     rarity: 10,
        //     hpRate: -1,
        //     mpRate: 0,
        //     str: 2,
        //     dex: 5,
        //     con: 2,
        //     int: 2,
        //     spd: 10,
        //     dmgBase: null,
        //     acBase: null,
        //     water: 20,
        //     dropNum: 1,
        //     matDropRate: 2,
        //     material: M_FUR,
        //     atkType: AT_BLUNT,
        //     volumeRate: 1.5
		// },
		
        // {
        //     name: { a: 'Chimera', b: 'キメラ' },
        //     symbol: 'C',
        //     color: null,
        //     race: RACE_ANIMAL,
        //     mod: MOD_NORMAL,
        //     grade: GRADE_NORMAL,
        //     lvl: 30,
        //     rarity: 20,
        //     hpRate: -1,
        //     mpRate: 0,
        //     str: 2,
        //     dex: 5,
        //     con: 2,
        //     int: 2,
        //     spd: 20,
        //     dmgBase: null,
        //     acBase: null,
        //     air: 20,
        //     dropNum: 1,
        //     matDropRate: 2,
        //     levi: true,
        //     material: M_FEATHER,
        //     atkType: AT_SLASH,
        //     volumeRate: 2
        // },
	],
	
    dragons: [
		{
            name: { a: 'Dragon', b: '竜' },
            symbol: 'D',
            color: colorList.green,
            race: RACE_DRAGON,
            mod: MOD_MAGIC,
            grade: GRADE_NORMAL,
            lvl: 24,
            rarity: 0,
            hpRate: 4,
            mpRate: 0,
            str: 40,
            dex: 40,
            con: 40,
            int: 40,
            spd: 25,
            dmgBase: 60,
            acBase: 200,
            fire: 10,
            water: 10,
            air: 10,
            earth: 10,
            poison: 10,
            dropNum: 4,
            matDropRate: 1,
            material: M_SCALE | M_BONE | M_HORN,
            matMain: M_SCALE,
            atkType: AT_SLASH | AT_THRUST | AT_BLUNT,
            grow: STAT_CON
		},
		
        {
            name: { a: 'Dragon, the Never-sleeping', b: '眠らずの竜' },
            symbol: 'D',
            color: colorList.green,
            race: RACE_DRAGON,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 28,
            rarity: 30,
            hpRate: 4,
            mpRate: 1,
            str: 150,
            dex: 100,
            con: 150,
            int: 50,
            spd: 50,
            dmgBase: 200,
            acBase: 250,
            fire: 10,
            water: 10,
            air: 10,
            earth: 10,
            poison: 45,
            conSus: true,
            awake: true,
            dropNum: 6,
            matDropRate: 0,
            material: M_SCALE,
            atkType: AT_SLASH | AT_THRUST | AT_BLUNT,
            skillProb: 1 / 5,
            skill: {
				a: { id: POISON_BREATH, lvl: 10 }
            },

            desc: {
                a:'',
                b:'神ヘルメスがもたらした金羊毛を守護する。メデイアの魔法薬により、眠らないとされるこの竜が昏睡し、その間にイアソンは金羊毛を奪取する。',
            }
        },
	],
	
    elementals: [
		{
			name: { a: 'Elemental', b: '精霊' },
			symbol: 'E',
			color: colorList.white,
			race: RACE_SPIRIT,
			mod: MOD_RARE,
			grade: GRADE_NORMAL,
			lvl: 5,
			rarity: 0,
			hpRate: -8,
			mpRate: 1,
			str: 1,
			dex: 1,
			con: 1,
			int: 25,
			spd: 0,
			dmgBase: 15,
			acBase: 25,
			fire: 20,
			water: 20,
			air: 20,
			earth: 20,
			poison: 20,
			moveRnd: true,
			dropNum: 0,
			matDropRate: 3,
			atkType: AT_SLASH,
			skillProb: 1 / 5,
		},
	],

    fairies: [
		{
			name: { a: 'Fairy', b: '妖精' },
			symbol: 'F',
			color: colorList.lime,
			race: RACE_SPIRIT,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 6,
			rarity: 0,
			hpRate: -6,
			mpRate: 0,
			str: 1,
			dex: 25,
			con: 1,
			int: 15,
			spd: 50,
			dmgBase: 1,
			acBase: 25,
			atkStealGold: 25,
			fire: 10,
			water: 10,
			air: 10,
			earth: 10,
			poison: 10,
			levi: true,
			moveRnd: true,
			dropNum: 0,
			matDropRate: 2,
			material: M_FEATHER,
			atkType: AT_SLASH,
			grow: STAT_DEX
		},
	],

    ghosts: [
		{
			name: { a: 'Phantom', b: '亡者' },
			symbol: 'G',
			color: colorList.skyblue,
			race: RACE_UNDEAD,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 15,
			rarity: 0,
			hpRate: -8,
			mpRate: 0,
			str: 15,
			dex: 35,
			con: 10,
			int: 15,
			spd: 0,
			dmgBase: 25,
			acBase: 5,
			levi: true,
			invisible: true,
			moveRnd: true,
			dropNum: 0,
			matDropRate: 2,
			atkType: AT_BLUNT,
		},
	],

    hybrids: [
		{
            name: { a: 'Snake Woman', b: '蛇女' },
            symbol: 'H',
            color: colorList.green,
            race: RACE_HUMAN | RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 8,
            rarity: 0,
            hpRate: -7,
            mpRate: 0,
            str: 20,
            dex: 20,
            con: 20,
            int: 10,
            spd: 0,
            dmgBase: 20,
            acBase: 50,
            poison: 30,
            atkCon: 20,
            dropNum: 1,
            matDropRate: 2,
            material: M_SCALE,
            atkType: AT_BLUNT,
        },
        
		{
            name: { a: 'Harpy', b: 'ハーピー' },
            symbol: 'H',
            color: colorList.skyblue,
            race: RACE_HUMAN | RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 9,
            rarity: 0,
            hpRate: -7,
            mpRate: 0,
            str: 10,
            dex: 30,
            con: 10,
            int: 10,
            spd: 25,
            dmgBase: 20,
            acBase: 80,
            air: 30,
            levi: true,
            dropNum: 1,
            matDropRate: 2,
            material: M_FEATHER,
            atkType: AT_SLASH | AT_THRUST,
            grow: STAT_DEX,
            skillProb: 1 / 10,
            skill: {
				a: { id: SCREAM, lvl: 5 }
			}
		},
		
        {
            name: { a: 'Centaur', b: 'ケンタウロス' },
            symbol: 'H',
            color: colorList.yellow,
            race: RACE_HUMAN | RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 23,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 40,
            dex: 75,
            con: 50,
            int: 25,
            spd: 25,
            dmgBase: 70,
            acBase: 100,
            frw: 75,
            dexSus: true,
            dropNum: 3,
            matDropRate: 1,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_DEX,
            starter: [
				{ type: 'missile', tabId: M_BOW },
				{ type: 'ammo', tabId: A_ARROW }
			]
		},
		
        {
            name: { a: 'Minotaur', b: 'ミノタウロス' },
            symbol: 'H',
            color: colorList.orange,
            race: RACE_HUMAN | RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 27,
            rarity: 0,
            hpRate: 2,
            mpRate: 0,
            str: 150,
            dex: 75,
            con: 75,
            int: 15,
            spd: 0,
            dmgBase: 120,
            acBase: 100,
            strSus: true,
            dropNum: 3,
            matDropRate: 1,
            material: M_BONE | M_HORN,
            matMain: M_HORN,
            atkType: AT_BLUNT,
            grow: STAT_STR,
            starter: [{ type: 'melee', tabId: M_TWO_HANDED_AXE }]
        },
	],
	
    nymphs: [
		{
			name: { a: 'Nymph', b: 'ニンフ' },
			symbol: 'N',
			color: colorList.olive,
			race: RACE_SPIRIT,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 16,
			rarity: 0,
			hpRate: -6,
			mpRate: 0,
			str: 10,
			dex: 25,
			con: 15,
			int: 15,
			spd: 0,
			dmgBase: 15,
			acBase: 20,
			fire: 10,
			water: 10,
			air: 10,
			earth: 10,
			poison: 10,
			atkStealItem: 25,
			moveRnd: true,
			dropNum: 1,
			matDropRate: 2,
			atkType: AT_SLASH,
		},
	],

    snakes: [
		{
            name: { a: 'Serpent', b: '大蛇' },
            symbol: 'J',
            color: colorList.purple,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 3,
            rarity: 0,
            hpRate: -10,
            mpRate: 0,
            str: 5,
            dex: 10,
            con: 5,
            int: 5,
            spd: 0,
            dmgBase: 15,
            acBase: 30,
            poison: 30,
            dmgPoison: 10,
            dropNum: 0,
            matDropRate: 2,
            material: M_SCALE,
            atkType: AT_THRUST,
		},
		
        {
            name: { a: 'Amphisbaena,the Serpent of the Two-headed', b: '双頭の大蛇`アンフィスバエナ`' },
            symbol: 'J',
            color: colorList.purple,
            race: RACE_ANIMAL,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 24,
            rarity: 30,
            hpRate: -4,
            mpRate: 0,
            str: 80,
            dex: 80,
            con: 50,
            int: 25,
            spd: 50,
            dmgBase: 100,
            acBase: 50,
            poison: 50,
            dmgPoison: 200,
            dropNum: 2,
            matDropRate: 0,
            material: M_SCALE,
            atkType: AT_THRUST,
            skillProb: 1 / 6,
            skill: {
				a: { id: POISON_BREATH, lvl: 20 }
            },

            desc: {
                a:'',
                b:'リビアの砂漠に住むという双頭の毒蛇。ペルセウスが切り落とした、メデューサの首から落ちた血液により、この蛇は生まれたという。',
            }
        },
	],
	
    multiheads: [
		{
            name: { a: 'Hydra', b: 'ヒュドラ' },
            symbol: 'M',
            color: colorList.green,
            race: RACE_DRAGON,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 29,
            rarity: 0,
            hpRate: 4,
            mpRate: 0,
            str: 200,
            dex: 100,
            con: 200,
            int: 50,
            spd: 0,
            dmgBase: 30,
            acBase: 100,
            fire: -30,
            poison: 20,
            hpReg: 100,
            ias: 50,
            dmgPoison: 25,
            dropNum: 2,
            matDropRate: 1,
            material: M_SCALE,
            atkType: AT_THRUST | AT_BLUNT,
            grow: STAT_CON,
            skillProb: 1 / 8,
            skill: {
				a: { id: POISON_BREATH, lvl: 10 }
			}
		},
		
        {
            name: { a: 'Scylla, the Sea-monster', b: '海の怪物スキュラ' },
            symbol: 'M',
            color: colorList.green,
            race: RACE_DRAGON,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 31,
            rarity: 80,
            hpRate: 4,
            mpRate: 0,
            str: 200,
            dex: 100,
            con: 200,
            int: 50,
            spd: 0,
            dmgBase: 50,
            acBase: 100,
            fire: -30,
            poison: 20,
            hpReg: 100,
            ias: 100,
            dmgPoison: 25,
            dropNum: 4,
            matDropRate: 0,
            material: M_SCALE,
            atkType: AT_THRUST | AT_BLUNT,
            skillProb: 1 / 5,
            skill: {
				a: { id: AQUA_BREATH, lvl: 10 },
				b: { id: TELEPORT_TO, lvl: 1 }
            },

            desc: {
                a:'',
                b:'12本の足、6つの頭、3列に並んだ歯を持つ。元は女性であったが、グラウコスの求愛を拒み続け、それを妬んだキルケの毒により怪物に変貌する。',
            }
        },
	],
	
    giants: [
		{
            name: { a: 'Giant', b: '巨人' },
            symbol: 'P',
            color: colorList.yellow,
            race: RACE_GIANT,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 18,
            rarity: 0,
            hpRate: 3,
            mpRate: 0,
            str: 100,
            dex: 15,
            con: 30,
            int: 15,
            spd: -100,
            dmgBase: 100,
            acBase: 50,
            earth: 50,
            dropNum: 0,
            matDropRate: 1,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_CON
		},
		
        {
            name: { a: 'Cyclopes', b: 'サイクロプス' },
            symbol: 'P',
            color: colorList.orange,
            race: RACE_GIANT,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 21,
            rarity: 0,
            hpRate: 5,
            mpRate: 0,
            str: 100,
            dex: 50,
            con: 40,
            int: 15,
            spd: -100,
            dmgBase: 100,
            acBase: 50,
            earth: 50,
            dropNum: 0,
            matDropRate: 1,
            material: M_BONE,
            atkType: AT_BLUNT,
            grow: STAT_CON,
            starter: [
				{ type: 'missile', tabId: M_SLING },
				{ type: 'ammo', tabId: A_ROCK }
			]
		},
		
        {
            name: { a: 'Polyphemus,the One Eyed Giant', b: '隻眼の巨人ポリュペモス' },
            symbol: 'P',
            color: colorList.orange,
            race: RACE_GIANT,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            lvl: 25,
            rarity: 30,
            hpRate: 5,
            mpRate: 0,
            str: 200,
            dex: 75,
            con: 200,
            int: 25,
            spd: -100,
            dmgBase: 300,
            acBase: 50,
            earth: 50,
            conSus: true,
            dropNum: 4,
            matDropRate: 0,
            material: M_BONE,
            atkType: AT_BLUNT,
            skillProb: 1 / 5,
            skill: {
				a: { id: CREATE_GIANT, lvl: 1 },
				b: { id: TELEPORT_TO, lvl: 1 }
            },

            desc: {
                a:'',
                b:'神ポセイドンの子、一つ目の巨人。洞窟内に閉じ込められたオデュッセウスは、この巨人が泥酔し寝ている間に、丸太を目に突き立て盲いにし脱出する。',
            }
        },
	],
	
    spiders: [
		{
            name: { a: 'Giant Spider', b: '大蜘蛛' },
            symbol: 'S',
            color: colorList.gray,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 11,
            rarity: 0,
            hpRate: -6,
            mpRate: 0,
            str: 15,
            dex: 25,
            con: 10,
            int: 5,
            spd: 0,
            dmgBase: 25,
            acBase: 60,
            atkSlow: 20,
            dropNum: 0,
            matDropRate: 2,
            material: M_CLOTH,
            atkType: AT_THRUST,
		},
		
        {
            name: { a: 'Giant Scorpion', b: '大サソリ' },
            symbol: 'S',
            color: colorList.brown,
            race: RACE_ANIMAL,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 17,
            rarity: 0,
            hpRate: -5,
            mpRate: 0,
            str: 15,
            dex: 25,
            con: 15,
            int: 5,
            spd: 0,
            dmgBase: 30,
            acBase: 120,
            atkPara: 10,
            dropNum: 0,
            matDropRate: 2,
            material: M_SHELL,
            atkType: AT_THRUST,
        },
	],
	
    demons: [
		{
			name: { a: 'Demon', b: '悪魔' },
			symbol: 'U',
			color: colorList.gray,
			race: RACE_DEMON,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 22,
			rarity: 0,
			hpRate: 4,
			mpRate: 0,
			str: 50,
			dex: 50,
			con: 50,
			int: 30,
			spd: 0,
			dmgBase: 80,
			acBase: 150,
			fire: 50,
			dropNum: 2,
			matDropRate: 1,
			material: M_SKIN | M_HORN,
            matMain: M_SKIN,
			atkType: AT_SLASH | AT_BLUNT,
			skillProb: 1 / 8,
			skill: {
				a: { id: FIRE_BREATH, lvl: 10 },
				b: { id: ENCOURAGEMENT, lvl: 5 }
			}
		},
	],

    vampires: [
		{
			name: { a: 'Vampire', b: '吸血鬼' },
			symbol: 'V',
			color: colorList.gray,
			race: RACE_UNDEAD,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 19,
			rarity: 0,
			hpRate: 0,
			mpRate: 0,
			str: 30,
			dex: 30,
			con: 30,
			int: 30,
			spd: 0,
			dmgBase: 40,
			acBase: 100,
			fire: -50,
			stealLife: 30,
			dropNum: 2,
			matDropRate: 2,
			material: M_BONE,
			atkType: AT_THRUST,
		},
	],

    wraiths: [
		{
			name: { a: 'Wraith', b: '生霊' },
			symbol: 'W',
			color: colorList.gray,
			race: RACE_UNDEAD,
			mod: MOD_NORMAL,
			grade: GRADE_NORMAL,
			lvl: 25,
			rarity: 0,
			hpRate: -2,
			mpRate: 0,
			str: 50,
			dex: 50,
			con: 25,
			int: 50,
			spd: 0,
			dmgBase: 50,
			acBase: 100,
			atkDrain: 50,
			dropNum: 2,
			matDropRate: 2,
			material: M_CLOTH | M_BONE,
            matMain: M_BONE,
			atkType: AT_THRUST,
		},
	],

    statues: [
		{
            name: { a: 'Trap Statue ', b: '罠像' },
            symbol: '%',
            color: null,
            race: null,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
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
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            stillness: true,
            awake: true,
            piece: true,
            volumeRate: 1,
            dropNum: 0,
            matDropRate: 3,
            material: M_STONE | M_PLATING,
            atkType: AT_BLUNT,
            skillProb: 1 / 8,
            skill: {
				a: { id: CREATE_TRAP, lvl: 1 }
			}
		},
		
        {
            name: { a: 'Summon Statue', b: '召喚像' },
            symbol: '%',
            color: null,
            race: null,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
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
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            awake: true,
            stillness: true,
            piece: true,
            skillProb: 1 / 8,
            dropNum: 0,
            matDropRate: 3,
            material: M_STONE | M_PLATING,
            atkType: AT_BLUNT,
            volumeRate: 1,
            skill: {
				a: { id: CREATE_MONSTER, lvl: 1 }
			}
		},
		
        {
            name: { a: 'Gargoyle Statue', b: 'ガーゴイル像' },
            symbol: '%',
            color: null,
            race: RACE_DEMON,
            mod: MOD_MAGIC,
            grade: GRADE_NORMAL,
            lvl: 30,
            rarity: 30,
            hpRate: 0,
            mpRate: 0,
            str: 50,
            dex: 50,
            con: 50,
            int: 50,
            spd: 0,
            dmgBase: null,
            acBase: null,
            fire: 50,
            water: 50,
            air: 50,
            earth: 50,
            poison: 50,
            stillness: true,
            canAttack: true,
            awake: true,
            piece: true,
            volumeRate: 1,
            dropNum: 0,
            matDropRate: 2,
            material: M_STONE | M_PLATING,
            atkType: AT_SLASH,
        },
	],
	
    misc: [
		{
            name: { a: 'Rogue', b: 'ローグ' },
            symbol: '@',
            color: colorList.white,
            race: RACE_HUMAN,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            spd: 0,
            dmgBase: 1,
            acBase: 0,
            acSRate: 1,
            acTRate: 1,
            acBRate: 1,
            awake: true,
            dropNum: 0,
            matDropRate: 0,
            atkType: AT_BLUNT,
            starter: [
                { type: 'melee', tabId: M_DAGGER, starter: true },
                { type: 'armor', tabId: A_VEST, starter: true },
                { type: 'book', tabId: B_SPELL_1 },
                { type: 'book', tabId: B_SKILL_1 },
                { type: 'food', tabId: F_RATION, quantity: 5 },
                { type: 'light', tabId: L_TORCH, starter: true },
            ],
		},
		
        {
            name: { a: 'Yeti', b: 'イエティ' },
            symbol: 'Y',
            color: colorList.white,
            mod: MOD_NORMAL,
            grade: GRADE_NORMAL,
            lvl: 1,
            rarity: 0,
            hpRate: 0,
            mpRate: 0,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            spd: 0,
            dmgBase: 1,
            acBase: 1,
            acSRate: 1,
            acTRate: 1,
            acBRate: 1,
            dropNum: 0,
            matDropRate: 0,
            atkType: AT_BLUNT,
		},
		
        {
            name: { a: 'Beelzebub, the Lord of the Flies', b: '蝿の王ベルゼブブ' },
            symbol: 'U',
            color: colorList.gray,
            race: RACE_DEMON,
            mod: MOD_UNIQUE,
            grade: GRADE_NORMAL,
            boss: true,
            lvl: 33,
            rarity: 0,
            hpRate: 4,
            mpRate: 5,
            str: 300,
            dex: 300,
            con: 200,
            int: 200,
            spd: 100,
            dmgBase: 150,
            acBase: 300,
            acSRate: 1,
            acTRate: 1,
            acBRate: 1,
            acRed: 50,
            fire: 20,
            water: 20,
            air: 20,
            earth: 20,
            poison: 20,
            dmgPoison: 100,
            levi: true,
            awake: true,
            strSus: true,
            dexSus: true,
            conSus: true,
            intSus: true,
            dropNum: 8,
            matDropRate: 0,
            atkType: AT_SLASH | AT_THRUST | AT_BLUNT,
            skillProb: 1 / 6,
            skill: {
				a: { id: COCYTUS, lvl: 20 },
				b: { id: POISON_BREATH, lvl: 5 },
				c: { id: INFECTION_BREATH, lvl: 5 },
				d: { id: CREATE_MAGIC_MONSTER, lvl: 1 }
            },

            desc: {
                a:'',
                b:'地獄の君主、十六の悪魔の指揮官、悪魔達の皇帝。人間を誘惑し嫉妬心を生み出す。しばしばサタンと同一視される。',
            }
        },
    ],
};

{
    let acTRateList = {
        golems: 2,
        statues: 1.5,
        chimeras: 1,
        skeletons: .7,
        zombies: .5,
        worms: .2,

        giants: 2,
        dragons: 1.9,
        multiheads: 1.8,
        demons: 1.7,
        vampires: 1.6,
        incubuses: 1.5,
        angels: 1.4,
        wraiths: 1.3,
        ghosts: 1.2,
        hybrids: 1.1,
        humanoids: 1,
        persons: 1,
        quadrupeds: .9,
        felines: .8,
        canines: .8,
        nymphs: .7,
        elementals: .7,
        fairies: .6,
        birds: .5,
        snakes: .4,
        spiders: .3,
        ants: .2,
        bats: .1,

        mimics: 1,
    };

    let getAcRate = (fighter) => {
        if (!fighter.material) return [1, 1];
        let mat = fighter.matMain ? fighter.matMain : fighter.material;
        let hRate = materialMap.get(mat).hRate;
        let mean = (1 + MAX_HARDNESS) / 2;
        let sRate = 1 + (hRate - mean) / 10;
        let bRate = 1 - (hRate - mean) / 10;
        return [sRate, bRate];
    }

    for (let key in fighterTab) {
        if (key === 'misc') continue;
        for (let fighter of fighterTab[key]) {
            if (fighter.acBase === null) continue;
            fighter.acTRate = acTRateList[key];
            [fighter.acSRate, fighter.acBRate] = getAcRate(fighter);
        }
    }
}

const fighterNumsMap = (() => {
    let nums = new Map();
    for (let key in fighterTab)
        nums.set(key, enums(0, fighterTab[key].length - 1));
    return nums;
})();

const ftList = Object.keys(fighterTab);
const Fighter = class extends Material {
    constructor(obj) {
        super(obj);
        this.lvlMax = this.lvl;
        this.levi = !!this.levi;
        this.hpSum = 0;
        if (!this.hpReg) this.hpReg = 0;
        this.hpRegBuff = 0;
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
        this.spdBuffDur = 0;
        this.spdNerfDur = 0;
        this.mf = 0;
        this.mfBuff = 0;
        this.gf = 0;
        this.gfBuff = 0;
        this.expBonus = 0;
        this.atkBare = this.atkType;
        this.dmgBare = this.dmgBase;
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
        this.dmgGod = 0;
        this.dmgFire = 0;
        this.dmgLightning = 0;
        if (!this.dmgPoison) this.dmgPoison = 0;
        if (!this.dmgAcid) this.dmgAcid = 0;
        this.dmgMinBonus = 0;
        this.dmgMaxBonus = 0;
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
        if (!this.acBonus) this.acBonus = 0;
        this.acSValueSum = 0;
        this.acTValueSum = 0;
        this.acBValueSum = 0;
        this.acSBaseSum = 0;
        this.acTBaseSum = 0;
        this.acBBaseSum = 0;
        this.acSBase = this.getAcVar(this.acBase * this.acSRate, AT_SLASH);
        this.acTBase = this.getAcVar(this.acBase * this.acTRate, AT_THRUST);
        this.acBBase = this.getAcVar(this.acBase * this.acBRate, AT_BLUNT);
        this.acBuff = 0;
        if (!this.acRed) this.acRed = 0;
        this.iasBase = 0;
        this.fcrBase = 0;
        this.frwBase = 0;
        if (!this.ias) this.ias = 0;
        if (!this.fcr) this.fcr = 0;
        if (!this.frw) this.frw = 0;
        this.pack = {};
        if (!this.fire) this.fire = 0;
        if (!this.water) this.water = 0;
        if (!this.air) this.air = 0;
        if (!this.earth) this.earth = 0;
        if (!this.poison) this.poison = 0;
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
        this.physicalBuff = 0;
        this.physicalBuffDur = 0;
        this.physicalNerf = 0;
        this.physicalNerfDur = 0;
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
        this.initSynerzy();
        this.equipment = {};
        if (this.race & (RACE_HUMAN | RACE_GIANT)) {
            for (let key in bpList) {
				this.equipment[bpList[key]] = null;
			}
		}
        
        if (this.starter) {
            this.eqt = {} //equipment temp
            this.numBoxes = INIT_BOX_NUM;
            this.boxes = {};
            for (let i = 1; i <= this.numBoxes; i++) {
                this.boxes[i] = null;
            }
        }

        //HP Bar Color
        this.sleeping = 0;
        this.paralyzed = 0;
        this.confused = 0;
        this.blinded = 0;
        this.hallucinated = 0;
        this.canceled = 0;
        this.infected = 0;
        this.poisoned = 0;

        //Stats Color
        this.expBuff = 0;

        //Condition Display
        this.seeInvisible = 0;
        this.invisibility = 0;
        this.ecco = 0;
        this.enchantSelfDur = 0;
        this.venomDur = 0;
        this.confusing = 0;
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
        while ((this.id === ID_ROGUE && this.lvl < MAX_FIGHTER_LVL || this.id !== ID_ROGUE) &&
          	  this.exp >= calcLevel(this.lvl + 1)) {
            if (++this.lvl <= this.lvlMax) continue;
            this.lvlMax = this.lvl;
            found = true;
            audio.playSound('level');
            this.skillPoints++;
            if (this.id === ID_ROGUE) {
                message.draw(option.isEnglish() ?
                    `Welcome to level ${this.lvl}` :
                    `レベル${this.lvl}へようこそ`);
                this.statPoints += 5;
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
        if (this.mod === MOD_UNIQUE) {
            exp /= this.boss ? 1 : 2;
		} else {
			exp /= 50;
		}

        if (this.group) exp /= 10;
        if (this.race & RACE_DRAGON) {
            exp *= 3;
		} else if (this.race & RACE_GIANT) {
			exp *= 2;
		}

        if (this.mod === MOD_RARE) {
            exp *= 4;
		} else if (this.mod === MOD_MAGIC) {
			exp *= 2;
		}

        if (this.expRate) exp *= this.expRate;
        return Math.ceil(exp);
    }

    calcNextLvl() {
        return this.lvl >= MAX_FIGHTER_LVL ? 0 : calcLevel(this.lvl + 1);
    }

    calcHP() {
        this.hpMax = (this.lvl - 1 + this.con) * (this.hpRate + HP_BASE_RATE) + this.hpSum;
        if (this.hpMax < 1) this.hpMax = 1;
        if (this.hp > this.hpMax) this.hp = this.hpMax;
    }

    calcMP() {
        this.mpMax = (this.lvl - 1 + this.int) * (this.mpRate + MP_BASE_RATE) + this.mpSum;
        if (this.mpMax < 1) this.mpMax = 1;
        if (this.mp > this.mpMax) this.mp = this.mpMax;
    }

    calcDmg(equip) {

        // Damage
        let dmgSAvg = 0,
            dmgTAvg = 0,
            dmgBAvg = 0,
            count = 0,
            dmgBase = Math.ceil(this.dmgBase + this.str / 2);
        this.dmgSBase = this.atkType & AT_SLASH ? minMax.getBase(dmgBase, atVarMap.get(AT_SLASH)) : 0;
        this.dmgTBase = this.atkType & AT_THRUST ? minMax.getBase(dmgBase, atVarMap.get(AT_THRUST)) : 0;
        this.dmgBBase = this.atkType & AT_BLUNT ? minMax.getBase(dmgBase, atVarMap.get(AT_BLUNT)) : 0;
        this.dmgSValue = this.dmgTValue = this.dmgBValue = 0;
        if (this.dmgSBase) {
            [this.dmgSValue, dmgSAvg] = this.getDmgMinMax(this.dmgSBase);
            count++;
        }

        if (this.dmgTBase) {
            [this.dmgTValue, dmgTAvg] = this.getDmgMinMax(this.dmgTBase);
            count++;
        }

        if (this.dmgBBase) {
            [this.dmgBValue, dmgBAvg] = this.getDmgMinMax(this.dmgBBase);
            count++;
        }

        this.dmgAvg = Math.floor((dmgSAvg + dmgTAvg + dmgBAvg) / count);

        // Hit Rate
        let weapon = this.equipment['main'];
        let weight = weapon ? 3 - weapon.weight : 0;
        if (this.id === ID_ROGUE && weight < 0 && weight * 10 + this.str < 0) {
            weight = -1000;
            if (equip) message.draw(message.get(M_TOO_HEAVY));
        }

        this.rateValue = Math.floor(((this.dex * 20 + weight * 100) *
            (1 + this.rateBonus / 100)) * (1 + this.rateBuff / 100));
        if (this.rateValue < 1) this.rateValue = 1;

        // Speed
        let ias = Math.floor((1 + this.iasBase / 100) * 5 * this.ias);
        let fcr = Math.floor((1 + this.fcrBase / 100) * 5 * this.fcr);
        let str = this.str * 2;
        let dex = this.dex * 2;
        let int = this.int * 2;
        this.spdMelee = ias < str ? ias : str;
        this.spdMissile = ias < dex ? ias : dex;
        this.spdSpell = fcr < int ? fcr : int;
        let limit = COST_REGULAR / 2;
        if (this.spdMelee > limit) this.spdMelee = limit;
        if (this.spdMissile > limit) this.spdMissile = limit;
        if (this.spdSpell > limit) this.spdSpell = limit;
        this.spdMeleeRate = Math.floor(this.spdMelee / COST_REGULAR * 100);
        this.spdMissileRate = Math.floor(this.spdMissile / COST_REGULAR * 100);
        this.spdSpellRate = Math.floor(this.spdSpell / COST_REGULAR * 100);
        this.timesMelee = Math.floor(this.spdMelee / 100) + 1;
        this.timesMissile = Math.floor(this.spdMissile / 100) + 1;
        if (this.timesMelee > 5) this.timesMelee = 5;
        if (this.timesMissile > 5) this.timesMissile = 5;
    }

    getDmgMinMax(base) {
        let [min, max] =  minMax.getNums(base, this.dmgMinBonus, this.dmgMaxBonus);
        let bonus = 1 + this.dmgBonus / 100;
        let buff = 1 + this.dmgBuff / 100;
        min *= bonus * buff;
        max *= bonus * buff;
        let value = Math.floor(min) + '-' + Math.floor(max);
        let avg = (min + max) / 2;
        return [value, avg];
    }

    calcMoveTimes() {
        this.spdMove = Math.floor((1 + this.frwBase / 100) * 5 * this.frw);
        let limit = COST_REGULAR / 2;
        if (this.spdMove > limit) this.spdMove = limit;
        this.spdMoveRate = Math.floor(this.spdMove / COST_REGULAR * 100);
    }

    calcAc() {
        let percBonus = 1 + this.acBonus / 100;
        let percBonusSum = this.acBonus / 100/* / 7*/;
        let percBuff = 1 + this.acBuff / 100;
        this.acSValue = this.acSBase * percBonus + this.dex; //bare
        this.acSBonusValue = this.acSBaseSum * percBonusSum; //weapon, ornament
        this.acSValueTotal = Math.floor((this.acSValue + this.acSBonusValue + this.acSValueSum) * percBuff);
        if (this.acSValueTotal < 0) this.acSValueTotal = 0;
        this.acTValue = this.acTBase * percBonus + this.dex;
        this.acTBonusValue = this.acTBaseSum * percBonusSum;
        this.acTValueTotal = Math.floor((this.acTValue + this.acTBonusValue + this.acTValueSum) * percBuff);
        if (this.acTValueTotal < 0) this.acTValueTotal = 0;
        this.acBValue = this.acBBase * percBonus + this.dex;
        this.acBBonusValue = this.acBBaseSum * percBonusSum;
        this.acBValueTotal = Math.floor((this.acBValue + this.acBBonusValue + this.acBValueSum) * percBuff);
        if (this.acBValueTotal < 0) this.acBValueTotal = 0;
        this.acAvgValueTotal = Math.floor((this.acSValueTotal + this.acTValueTotal + this.acBValueTotal) / 3);
    }

    calcAttack(e, skill, lvl, itemThrown, ammo) {
        let dmgBase, atkType, acEnemy, atCur;
        if (!itemThrown) {
            atkType = this.atkType;
        } else {
            atkType = itemThrown.atkType ? itemThrown.atkType : AT_BLUNT;
		}
        
        [acEnemy, atCur] = this.getEnemyAc(atkType, e);
        let rate = Math.floor((this.rateValue / (this.rateValue + acEnemy)) * 100);
        if (rate > 95) rate = 95;
		if (rate < 5) rate = 5;
        let dmg = 0;
        if (!evalPercentage(rate)) return [dmg, rate, atCur];
        let boost = 0;
        if (itemThrown) {
            dmgBase = itemThrown.dmgBase;
            if (dmgBase) dmgBase = minMax.getBase(Math.ceil(dmgBase + this.str / 2), atVarMap.get(atCur));
            if (itemThrown.dmgBonus) boost = itemThrown.dmgBonus;
        } else {
            dmgBase = atCur === AT_SLASH ? this.dmgSBase :
                atCur === AT_THRUST ? this.dmgTBase :
                atCur === AT_BLUNT ? this.dmgBBase :
                null;
            if (ammo && ammo.dmgBonus) boost = ammo.dmgBonus;
        }

        if (!dmgBase) dmgBase = '1-2';
        if (e.race) boost += this.getRaceBoost(e.race);
        if (e.material === M_STONE) boost += this.digging;
        if (skill) boost += this.calcSkillValue(skill, lvl);
        dmg = this.getDmg(dmgBase, this.dmgMinBonus, this.dmgMaxBonus, this.dmgBonus, this.dmgBuff, boost);
        let add = dmg;
        let element = skill ? skill.element : 'physical';
        dmg *= 1 - e[element] / 100;
        if (this.dmgFire) dmg += add * (this.dmgFire / 100) * (1 - e.fire / 100);
        if (this.dmgLightning) dmg += add * (this.dmgLightning / 100) * (1 - e.lightning / 100);
        if (this.dmgPoison) dmg += add * (this.dmgPoison / 100) * (1 - e.poison / 100);
        if (this.dmgAcid) dmg += add * (this.dmgAcid / 100) * (1 - e.acid / 100);
        dmg = dmg < 1 ? 1 : Math.floor(dmg);
        return [dmg, rate, atCur];
    }

    getDmg(base, min=0, max=0, bonus=0, buff=0, boost=0) {
        return minMax.roll(base, min, max) * (1 + bonus / 100) * (1 + buff / 100) * (1 + boost / 100);
    }

    getEnemyAc(atkType, enemy) {
        let atCur;
        let ac = NaN;
        if (atkType & AT_SLASH && !(ac <= enemy.acSValueTotal)) {
            ac = enemy.acSValueTotal;
            atCur = AT_SLASH;
        }

        if (atkType & AT_THRUST && !(ac <= enemy.acTValueTotal)) {
            ac = enemy.acTValueTotal;
            atCur = AT_THRUST;
        }

        if (atkType & AT_BLUNT && !(ac <= enemy.acBValueTotal)) {
            ac = enemy.acBValueTotal;
            atCur = AT_BLUNT;
        }

        return [ac, atCur];
    }

    getRaceBoost(race) {
        let boost = 0;
        if (race & RACE_HUMAN) boost += this.dmgHuman;
        if (race & RACE_ANIMAL) boost += this.dmgAnimal;
        if (race & RACE_DEMON) boost += this.dmgDemon;
        if (race & RACE_UNDEAD) boost += this.dmgUndead;
        if (race & RACE_DRAGON) boost += this.dmgDragon;
        if (race & RACE_GIANT) boost += this.dmgGiant;
        if (race & RACE_SPIRIT) boost += this.dmgSpirit;
        if (race & RACE_GOD) boost += this.dmgGod;
        return boost;
    }

    attack({
        enemy,
        missile,
        skill,
        lvl,
        itemThrown,
    }) {
        let name, isBasic, ammo;
        let nameE = enemy.getName();
        let isEng = option.isEnglish();
        let count = 0;
        if (itemThrown) {
            name = itemThrown.getName(false, 1);
		} else if (missile) {
            ammo = this.ci;
            name = ammo.getName(false, 1);
            // if (isEng) name = getArticleAndPlural(name, false, true, 1, true);
        } else if (skill) {
            name = skill.name[option.getLanguage()];
            if (skill.type === 'missile') ammo = this.ci;
		} else {
            name = isEng ? this.getName(true) : this.getName() + 'の';
            isBasic = true;
		}

        let third = isEng && (itemThrown || missile || skill || this.id !== ID_ROGUE);
        do {
            let [dmg, rate, atCur] = skill && skill.type === 'spell' ?
                [this.calcSkillValue(skill, lvl, enemy), 100, null] :
                this.calcAttack(enemy, skill, lvl, itemThrown, ammo);
            let msgDmg;
            let msgAT;
            let msgName = name;
            let miss = !dmg || enemy.indestructible || this.id !== ID_ROGUE && enemy.boss;
            if (isBasic) {
                msgAT = this.getAttackTypeName(atCur, isEng, third);
                if (!isEng) msgName += msgAT;
            } else if (isEng) {
                msgAT = 'hit' + (third ? 's' : '');
            }

            if (miss) {
                msgDmg = isEng ? 'miss' : '外れた';
                if (third) msgDmg += 'es';
            } else {
                msgDmg = isEng ? msgAT : `${dmg}のダメージを与えた`;
                enemy.hp -= dmg;
			}
			
            if (missile || itemThrown) {
                let item = ammo || itemThrown;
                let drop = miss || item.indestructible || evalPercentage(50);
                this.deleteAmmo(item, drop, enemy.x, enemy.y);
			}
            
            let msg = isEng ?
                `${msgName} ${msgDmg} ${nameE}` + (!miss ? ' by '+ dmg : '') :
                `${msgName}は${nameE}に${msgDmg}`;
            if (rogue.isWizard) {
                msg += isEng ? ` (hit rating ${rate})` : ` (命中率 ${rate})`;
            }

            message.draw(msg);
            count++;
            if (flag.dash || flag.rest) flag.dash = flag.rest = false;
            if (!skill || skill.type !== 'spell') {
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
                    if (enemy.mod !== MOD_UNIQUE) enemy.mp -= mp;
                    this.mp += mp;
                    if (this.mp > this.mpMax) this.mp = this.mpMax;
				}
				
                if (this.dmgFire) this.getElementEffect('fire', 1, enemy);
                if (this.dmgLightning) this.getElementEffect('lightning', 1, enemy);
                if (this.dmgPoison) this.getElementEffect('poison', 1, enemy);
                if (this.dmgAcid) this.getElementEffect('acid', 1, enemy);
                if (this.cursed && evalPercentage(50 - (enemy.lvl - this.lvl))) enemy.gotCursed();
                if (this.atkCon && evalPercentage(this.atkCon)) this.haveCast(CONFUSION, 1, enemy);
                if (this.atkPara && evalPercentage(this.atkPara)) this.haveCast(PARALYSIS, 1, enemy);
                if (this.atkSlow && evalPercentage(this.atkSlow)) this.haveCast(SLOW, 10, enemy);
                if (this.atkInf && evalPercentage(this.atkInf)) this.haveCast(INFECTION, 1, enemy);
                if (this.atkBlind && evalPercentage(this.atkBlind)) this.haveCast(BLINDNESS, 1, enemy);
                if (this.atkRadi && evalPercentage(this.atkRadi)) this.haveCast(RADIATION, 1, enemy);
                if (this.atkCold && evalPercentage(this.atkCold)) this.haveCast(COLD, 1, enemy);
                if (this.atkDrain && evalPercentage(this.atkDrain - (enemy.lvl - this.lvl))) enemy.decayOrRestore(STAT_EXP, false, this.expGain, this);
                if (!skill && !missile && !this.confused) {
                    if (this.atkStealGold && evalPercentage(this.atkStealGold)) if (this.stealGold(enemy)) count = NaN;
                    if (count && this.atkStealItem && evalPercentage(this.atkStealItem)) if (this.stealItem(enemy)) count = NaN;
                }
			}
			
            if (!itemThrown && (!skill || skill.type !== 'spell')) {
                if (this.decreaseDurab(true)) count = NaN;
			}
			
            enemy.decreaseDurab();
            if (skill && skill.effect && (enemy.hp > 0 && !miss || skill.effect.self)
                && evalPercentage(skill.effect.prob)) this.haveCast(skill.effect.id, lvl, enemy);
            if (enemy.hp <= 0) {
                enemy.died(this);
                break;
			}
			
            if (enemy.sleeping) enemy.wakeUp();
            if (this.id === ID_ROGUE) this.getCe(enemy, !missile && !skill);
            if (skill) this.getElementEffect(skill.element, lvl, enemy)
            if (skill || itemThrown) break;
        } while (missile && this.timesMissile > count && ammo.quantity > count ||
			!missile && this.timesMelee > count
		);
    }

    getAttackTypeName(at, isEng, third) {
        let name;
        if (at === AT_SLASH) {
            name = isEng ? 'slash' : '斬撃';
        } else if (at === AT_THRUST) {
            name = isEng ? 'thrust' : '刺突';
        } else if (at === AT_BLUNT) {
            name = isEng ? 'beat' : '打撃';
        }

        if (third) name = getArticleAndPlural(name, true);
        return name;
    }

    dig(loc) {
        let digging;
        if (this.atkType & AT_THRUST) {
            digging = 3;
		} else if (this.atkType & AT_SLASH) {
            digging = 2;
		} else if (this.atkType & AT_BLUNT) {
			digging = 1;
		}

        if (this.digging) digging *= 10 * (1 + this.digging / 100);
        if (!loc.indestructible) loc.wall -= digging;
        this.decreaseDurab(true);
        audio.playSound('dig');
        if (loc.wall <= 0) {
            loc.deleteWall(true);
            rogue.lightenOrDarken('Lighten');
        }
    }

    getElementEffect(element, lvl, e) {
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
            let base = avg ? minMax.getAvg(skill.base) : minMax.roll(skill.base);
            value = base * (1 + rate / 100);
		}
        
        let limit = skill.limit;
        if (limit && value > limit) value = limit;
        return Math.ceil(value * (1 - resist / 100));
    }

    calcSkillDur(skill, lvl, avg) {
        let base = avg ? minMax.getAvg(skill.durBase) : minMax.roll(skill.durBase);
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
        this.infection = Math.floor(poison / 2);
        this.sand = Math.floor(earth / 4 + air / 4);
        this.blizzard = Math.floor(water / 4 + air / 4);
        this.acid = Math.floor(water / 4 + poison / 4);
        this.magma = Math.floor(fire / 4 + earth / 4);
        this.radiation = Math.floor(fire / 4 + poison / 4);
        this.physicalMax = Math.floor(earth / 4 + this.acRed);
        this.physical = Math.floor(this.physicalMax + this.physicalBuff + this.physicalNerf);
        if (this.physical > limit) this.physical = limit;
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
                boost = this.skillEarth + this.skillAir;
                break;
            case 'blizzard':
                boost = this.skillWater + this.skillAir;
                break;
            case 'acid':
                boost = this.skillWater + this.skillPoison;
                break;
            case 'magma':
                boost = this.skillFire + this.skillEarth;
                break;
            case 'radiation':
                boost = this.skillFire + this.skillPoison;
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
        this.weightLimit = 25 + this.str * 3 / 5;
        if (this.weightLimit > MAX_WEIGHT_LIMIT) this.weightLimit = MAX_WEIGHT_LIMIT;
        this.calcSpeed();
    }

    calcSpeed() {
        this.totalWeight = Math.round(this.totalWeight * 100) / 100;
        this.spd = this.spdMax + this.spdBuff + this.spdNerf -
            (this.totalWeight > this.weightLimit ?
                Math.ceil(this.totalWeight - this.weightLimit) * 10 : 0);
        if (this.spd > 100) this.spd = 100;
    }

    // getConditionColor() {
    //     return this.sleeping ? colorList.royalblue :
    //         this.paralyzed ? colorList.orange :
    //         this.confused ? colorList.yellow :
    //         this.blinded ? colorList.gray :
    //         this.hallucinated ? colorList.purple :
    //         this.canceled ? colorList.white :
    //         this.infected ? colorList.infection :
    //         this.poisoned ? colorList.poison :
    //         colorList.red;
    // }

    calcCondition() {
        let name = this.getName(true);
        let dec = this.mod === MOD_UNIQUE ? 5 : 1;
        if (this.poisoned) {
            if (!this.indestructible) this.hp -= Math.floor(this.poisonedVal * (1 - this.poison / 100));
            if (this.hp <= 0) {
                let fighter;
                if (this.poisonedId && this.poisonedId !== this.id) {
                    fighter = this.poisonedId === ID_ROGUE ? rogue : map.enemyList[this.poisonedId];
                }

                this.poisonedId = 0;
                this.died(fighter);
                return null;
            }
            
            this.poisoned -= dec;
            if (this.poisoned <= 0) {
                this.poisoned = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from poison` :
                    `${name}毒状態から復帰した`);
            }
            
            if (flag.dash || flag.rest) flag.dash = flag.rest = false;
		}
		
        if (this.confused) {
            this.confused -= dec;
            if (this.confused <= 0) {
                this.confused = 0;
                if (this.id !== ID_ROGUE) this.removeCe();
                message.draw(option.isEnglish() ?
                    `${name} recovered from confusion` :
                    `${name}混乱状態から復帰した`);
			}
		}
		
        if (this.paralyzed) {
            this.paralyzed -= dec;
            if (this.paralyzed <= 0) {
                this.paralyzed = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from paralysis` :
                    `${name}麻痺状態から復帰した`);
			}
		}
		
        if (this.sleeping > 0) {
            this.sleeping -= dec;
            if (this.sleeping <= 0) {
                this.sleeping = 0;
                this.wakeUp();
            }
		}
		
        if (this.blinded) {
            this.blinded -= dec;
            if (this.blinded <= 0) {
                this.blinded = 0;
                if (this.id === ID_ROGUE) {
                    this.goBlind(true);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from blindness` :
                    `${name}盲目状態から復帰した`);
			}
		}
		
        if (this.infected > 0) {
            this.infected -= dec;
            if (coinToss()) this.decayOrRestore();
            if (this.infected <= 0) {
                this.infected = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from infection` :
                    `${name}感染状態から復帰した`);
			}
		}
		
        if (this.hallucinated) {
            this.hallucinated -= dec;
            if (this.hallucinated <= 0) {
                this.hallucinated = 0;
                if (this.id === ID_ROGUE) {
                    hallucinate.all(true);
				} else {
					this.removeCe();
				}

                message.draw(option.isEnglish() ?
                    `${name} recovered from hallucination` :
                    `${name}幻覚状態から復帰した`);
			}
		}
		
        if (this.canceled) {
            this.canceled -= dec;
            if (this.canceled <= 0) {
                this.canceled = 0;
                message.draw(option.isEnglish() ?
                    `${name} recovered from cancellation` :
                    `${name}封印状態から復帰した`);
			}
		}
		
        if (this.seeInvisible > 0) {
            if (--this.seeInvisible === 0) {
                message.draw(option.isEnglish() ?
                    `${name} can no longer see invisible things` :
                    `${name}もう透明な物体を見ることが出来なくなった`);
                seeInvisible(false);
			}
		}
		
        if (this.invisibility) {
            if (--this.invisibility === 0) {
                this.invisible = false;
			}
		}
		
        if (this.ecco) {
            if (--this.ecco === 0) {
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Ecco` :
                    `${name}エコーの効果を失った`);
			}
		}
		
        if (this.enchantSelfDur) {
            if (--this.enchantSelfDur === 0) {
                this.dmgBonus -= this.enchantSelf;
                this.rateBonus -= this.enchantSelf;
                this.acBonus -= this.enchantSelf;
                this.ias -= this.enchantSelf;
                this.enchantSelf = 0;
                this.calcDmg();
                this.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Enchant Self` :
                    `${name}自己強化の効果を失った`);
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
		}
		
        if (this.confusing) {
            if (--this.confusing === 0) {
                this.atkCon = 0;
                let name = this.getName(true);
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Touch of Confusion` :
                    `${name}混乱の手の効果を失った`);
			}
		}
		
        if (this.spdBuffDur) {
            this.spdBuffDur -= dec;
            if (this.spdBuffDur <= 0) {
                this.spdBuffDur = 0;
                this.spdBuff = 0;
                this.calcSpeed();
            }
		}
		
        if (this.spdNerfDur) {
            if (--this.spdNerfDur === 0) {
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
		
        if (this.physicalBuffDur) {
            if (--this.physicalBuffDur === 0) {
                this.physicalBuff = 0;
                message.draw(option.isEnglish() ?
                    `${name} lost the effect of Resist Physical` :
                    `${name}耐物の効果を失った`);
                resist = true;
            }
		}
		
        if (this.lowerResDur) {
            this.lowerResDur -= dec;
            if (this.lowerResDur <= 0) {
                this.lowerResDur = 0;
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
            case STAT_STR:
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
                    this.str -= rndIntBet(1, 5);
                    if (this.str - this.strBonus < 0) this.str = this.strBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got weak` :
                        `${name}薄弱になった`);
				}
				
                this.calcWeightLimit();
                this.calcDmg();
                break;
            case STAT_DEX:
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
                    this.dex -= rndIntBet(1, 5);
                    if (this.dex - this.dexBonus < 0) this.dex = this.dexBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got clumsy` :
                        `${name}不器用になった`);
				}
				
                this.calcAc();
                this.calcDmg();
                break;
            case STAT_CON:
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
                    this.con -= rndIntBet(1, 5);
                    if (this.con - this.conBonus < 0) this.con = this.conBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got sick` :
                        `${name}病弱になった`);
				}
				
                this.calcHP();
                break;
            case STAT_INT:
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
                    this.int -= rndIntBet(1, 5);
                    if (this.int - this.intBonus < 0) this.int = this.intBonus;
                    message.draw(option.isEnglish() ?
                        `${name} got stupid` :
                        `${name}愚鈍になった`);
				}
				
                this.calcMP();
                break;
            case STAT_EXP:
                if (restore) {
                    if (this.exp < this.expMax) {
                        message.draw(option.isEnglish() ?
                            `${name} restored the experience` :
                            `${name}経験値が元に戻った`);
                        this.exp = this.expMax;
                        this.lvl = this.lvlMax;
                    }
                } else if (!this.exp || evalPercentage(this.con * 2 / 5)) {
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
            this.hp += Math.ceil(this.hpMax * (this.con / 10 + this.hpReg) / 1000);
            if (this.hp > this.hpMax) this.hp = this.hpMax;
        }
        if (this.mp < this.mpMax) {
            this.mp += Math.ceil(this.mpMax * (this.int / 10 + this.mpReg) / 1000);
            if (this.mp > this.mpMax) this.mp = this.mpMax;
		}
		
        this.healCount = 0;
    }


    drawOrErase(draw, move) {
        let loc = map.coords[this.x][this.y];
        loc.fighter = draw ? this : null;
        if (this.id === ID_ROGUE && draw) {
            this.lightenOrDarken('Lighten', move);
            this.distMap = pathfinding.main({
                x0: this.x,
                y0: this.y,
                map: true,
			});
        }
    }

    lightenOrDarken(type, search, init) {
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
        if (this.id === ID_ROGUE) {
            map.coords[this.x][this.y].traces = ++this.numSteps;
		} else if (f.id === ID_ROGUE) {
			map.coords[f.x][f.y].traces = ++f.numSteps;
		}
    }

    showInventory(place, a) {
        let list, dr, enter;
        switch (place) {
            case PLACE_PACK:
                list = this.pack;
                dr = DR_RIGHT; 
                break;
            case PLACE_FLOOR:
                list = map.coords[this.x][this.y].item;
                dr = DR_RIGHT; 
                break;
            case PLACE_BOX:
                list = this.boxes;
                dr = DR_LEFT;
                break;
            case PLACE_SHOP:
            case PLACE_STASH:
                enter = map.coords[this.x][this.y].enter;
                list = enter.list
                dr = DR_LEFT;
                break;
            case PLACE_CUBE:
                list = this.cube;
                dr = DR_LEFT;
                break;
            case PLACE_EQUIPMENT:
                this.equipmentList(bpList[a]);
                return;
        }

        inventory.show({
            list: list,
            dr: dr,
            a: a,
            place: place,
            enter: enter,
        });
    }

    equipmentList(bp) {
        inventory.showEquipment(this, bp);
    }

    showSkill(list, assign) {
        inventory.showSkill(this, list, assign);
    }

    findBuffStat(key) {
        let found;
        switch (key) {
            case 'dmgAvg':
            case 'dmgSValue':
            case 'dmgTValue':
            case 'dmgBValue':
                if (this.dmgBuff) found = true;
                break;
            case 'rateValue':
                if (this.rateBuff) found = true;
                break;
            case 'acAvgValueTotal':
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
            case 'physical':
                if (this.physicalBuff) found = true;
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
            case 'ias':
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
            case PLACE_PACK:
                list = this.pack;
                break;
            case PLACE_BOX:
                list = this.boxes;
                break;
            case PLACE_EQUIPMENT:
                list = this.equipment;
                break;
            case PLACE_FLOOR:
                list = map.coords[item.x][item.y].item;
                break;
		}
		
        item = item.split(quantity, list);
        if (item.place === PLACE_FLOOR) {
            item.id = -1;
            item.x = item.y = 0;
            if (rogue.hallucinated) hallucinate.undoOne(item);
        } else {
			this.gainOrloseWeight(item, quantity);
		}

        if (item.place === PLACE_EQUIPMENT && item.durab) {
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
        item.place = PLACE_STASH;
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
                item.place = PLACE_BOX;
                return true;
            }
		}
		
        if (this.listAdd(this.pack, item)) {
            item.place = PLACE_PACK
            return true;
		}
		
        let l = Object.keys(this.pack).length;
        if (l < MAX_PACK_COUNT) {
            item.place = PLACE_PACK
            this.pack[eaList[l]] = item;
            inventory.sort(eaList[l], this.pack);
            this.gainOrloseWeight(item, item.quantity, true)
            return true;
		}
		
        item.putDown(this.x, this.y, true);
        return false;
    }

    boxAdd(item, a) {
        let item2 = this.boxes[a];
        if (!item2) {
            item.place = PLACE_BOX;
            this.boxes[a] = item;
        } else if (item2.equal(item)) {
            item2.quantity += item.quantity;
		} else {
            item.place = PLACE_BOX;
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
                    position: POS_LIST,
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
            if (s.cursed) this.cursed = s.cursed;
            if (s.invisible) this.invisible = s.invisible;
		}
		
        if (s.dmgMinBonus) this.dmgMinBonus += num * s.dmgMinBonus;
        if (s.dmgMaxBonus) this.dmgMaxBonus += num * s.dmgMaxBonus;
        if (s.acBonus && (mod || !s.armor)) this.acBonus += num * s.acBonus;
        if (s.atkType) this.atkType = get ? s.atkType : this.atkBare;
        if (s.dmgBase) this.dmgBase = get ? s.dmgBase : this.dmgBare;
        if (s.acSBase) this.acSBaseSum += num * s.acSBase;
        if (s.acTBase) this.acTBaseSum += num * s.acTBase;
        if (s.acBBase) this.acBBaseSum += num * s.acBBase;
        if (s.dmgBonus) this.dmgBonus += num * s.dmgBonus;
        if (s.rateBonus) this.rateBonus += num * s.rateBonus;
        if (s.acSValue) this.acSValueSum += num * s.acSValue;
        if (s.acTValue) this.acTValueSum += num * s.acTValue;
        if (s.acBValue) this.acBValueSum += num * s.acBValue;
        if (s.acRed) this.acRed += num * s.acRed;
        if (s.str) this.str += num * s.str, this.strMax += num * s.str, this.strBonus += num * s.str;
        if (s.dex) this.dex += num * s.dex, this.dexMax += num * s.dex, this.dexBonus += num * s.dex;
        if (s.con) this.con += num * s.con, this.conMax += num * s.con, this.conBonus += num * s.con;
        if (s.int) this.int += num * s.int, this.intMax += num * s.int, this.intBonus += num * s.int;
        if (s.spd) this.spd += num * s.spd, this.spdMax += num * s.spd;
        if (s.mf) this.mf += num * s.mf;
        if (s.gf) this.gf += num * s.gf;
        if (s.hp) this.hpSum += num * s.hp;
        if (s.mp) this.mpSum += num * s.mp;
        if (s.hpRate) this.hpRate += num * s.hpRate;
        if (s.mpRate) this.mpRate += num * s.mpRate;
        if (s.fire) this.fireMax += num * s.fire;
        if (s.water) this.waterMax += num * s.water;
        if (s.air) this.airMax += num * s.air;
        if (s.earth) this.earthMax += num * s.earth;
        if (s.poison) this.poisonMax += num * s.poison;
        if (s.resistAll) {
            this.fireMax += num * s.resistAll;
            this.waterMax += num * s.resistAll;
            this.airMax += num * s.resistAll;
            this.earthMax += num * s.resistAll;
            this.poisonMax += num * s.resistAll;
        }

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
        if (s.dmgGod) this.dmgGod += num * s.dmgGod;
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
        if (s.lighten && (!mod && s.fuelValue || mod)) {
            this.lighten += num * s.lighten;
            if (!mod && !starter) this.lightenOrDarken('Lighten');
		}
		
        if (s.numBoxes) {
            get ? this.getBoxes(s.numBoxes) : this.looseBoxes(s.numBoxes);
            this.numBoxes += num * s.numBoxes;
        }
    }

    getBoxes(numBoxes) {
        let num = this.numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes + numBoxes && i <= MAX_BOX_NUM; i++) {
            if (this.id === ID_ROGUE) {
                Vue.set(vue.rogue.boxes, i, null)
            } else {
				this.boxes[i] = null;
            }
            let item = this.eqt[i];
            if (item) {
                this.boxAdd(item, i);
                delete this.eqt[i];
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
        let num = this.numBoxes - numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes && i <= MAX_BOX_NUM; i++) {
            let item = this.boxes[i];
            if (this.id === ID_ROGUE) {
                Vue.delete(vue.rogue.boxes, i)
            } else {
                delete this.boxes[i];
            }

            if (!item) continue;
            this.gainOrloseWeight(item, item.quantity);
            if (flag.equip) {
                this.eqt[i] = item;
			} else if (!this.packAdd(item)) {
				item.dropped();
			}
        }
    }

    calcAll(equip) {
        this.calcHP();
        this.calcMP();
        this.calcWeightLimit();
        this.calcDmg(equip);
        this.calcAc();
        this.calcResist();
        this.calcMoveTimes();
    }

    haveCast(skillId, lvl, f = this, x, y) {
        let duration,
            name = f.getName(true),
            boss = f.boss,
            skill = skillMap.get(skillId);
        if (skill) {
            if (skill.kind === 'attack' || skill.kind === 'breath') {
                this.attack({
                    enemy: f,
                    skill: skill,
                    lvl: lvl,
                });
                
                return;
            }
            
            if (skill.durBase) duration = this.calcSkillDur(skill, lvl);
        }

        switch (skillId) {
            case HEAL:
            case EXTRA_HEAL: {
                let value = this.calcSkillValue(skill, lvl);
                let limit = f.hpMax - f.hp;
                if (value > limit) value = limit;
                f.hp += value;
                message.draw(option.isEnglish() ?
                    `${name} got well (+${value})` :
                    `${name}傷が癒えた(+${value})`);
                f.poisoned = 0;
                f.confused = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    this.goBlind(true);
				}
				
                if (skillId === EXTRA_HEAL) {
                    f.infected = 0;
                    if (f.hallucinated) {
                        f.hallucinated = 0;
                        if (f.id === ID_ROGUE) hallucinate.all(true);
                    }
				}
				
                break;
            }
            case MANA:
            case EXTRA_MANA: {
                let value = this.calcSkillValue(skill, lvl);
                let limit = f.mpMax - f.mp;
                if (value > limit) value = limit;
                f.mp += value;
                break;
            }
            case REJUVENATION: {
                let perc = this.calcSkillValue(skill, lvl);
                let hpValue = Math.ceil(f.hpMax * perc / 100);
                let mpValue = Math.ceil(f.mpMax * perc / 100);
                let hpLimit = f.hpMax - f.hp;
                let mpLimit = f.mpMax - f.mp;
                if (hpValue > hpLimit) hpValue = hpLimit;
                if (mpValue > mpLimit) mpValue = mpLimit;
                f.hp += hpValue;
                f.mp += mpValue;
                break;
            }
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
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STAT_STR);
                break;
            case CLUMSINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STAT_DEX);
                break;
            case SICKLINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STAT_CON);
                break;
            case STUPIDITY:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STAT_INT);
                break;
            case RESTORE_STRENGTH:
                f.decayOrRestore(STAT_STR, true);
                break;
            case RESTORE_DEXTERITY:
                f.decayOrRestore(STAT_DEX, true);
                break;
            case RESTORE_CONSTITUTION:
                f.decayOrRestore(STAT_CON, true);
                break;
            case RESTORE_INTELLIGENCE:
                f.decayOrRestore(STAT_INT, true);
                break;
            case RESTORE_EXPERIENCE:
                f.decayOrRestore(STAT_EXP, true);
                break;
            case RESTORE_ALL:
                f.decayOrRestore(STAT_STR, true);
                f.decayOrRestore(STAT_DEX, true);
                f.decayOrRestore(STAT_CON, true);
                f.decayOrRestore(STAT_INT, true);
                f.decayOrRestore(STAT_EXP, true);
                break;
            case CURE_ALL:
                f.confused = f.canceled = f.poisoned = f.infected = f.paralyzed = f.sleeping = 0;
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ID_ROGUE) f.goBlind(true);
				}
				
                if (f.hallucinated) {
                    f.hallucinated = 0;
                    if (f.id === ID_ROGUE) hallucinate.all(true);
				}
				
                if (f.spdNerfDur) {
                    f.spdNerfDur = 0;
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
            case RESIST_PHYSICAL:
                f.physicalBuff = this.calcSkillValue(skill, lvl);
                f.physicalBuffDur = duration;
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Resist Physical` :
                    `${name}耐物の効果を得た`);
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
                if (f.id !== ID_ROGUE) return;
                map.lighten();
                break;
            case WORMHOLE:
                inventory.clear();
                input.eventFlag(88); //examine
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
            case IDENTIFY: {
                input.switchFlag();
                flag.identify = true;
                let msg = message.get(M_IDENTIFY) + message.get(M_FLOOR);
                this.showInventory(PLACE_PACK);
                this.equipmentList();
                message.draw(msg, true);
                return null;
            }
            case DISINTEGRATION:
                input.switchFlag();
                flag.disint = true;
                message.draw(message.get(M_DISINTEGRATION), true);
                return null;
            case RESTORE_DURABILITY: {
                input.switchFlag();
                flag.repair = true;
                let msg = message.get(M_REPAIR) + message.get(M_FLOOR);
                this.showInventory(PLACE_PACK);
                this.equipmentList();
                message.draw(msg, true);
                return null;
            }
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
            case EARTHQUAKE: {
                let perc = this.calcSkillValue(skill, lvl);
                circleSearch.main({
                    x0: this.x,
                    y0: this.y,
                    type: skillId,
                    radius: skill.radius,
                    perc: perc,
				});
                
                map.drawShadow();
                rogue.litMapIds = {};
                rogue.lightenOrDarken('Lighten');
                break;
            }
            case SATISFY_HUNGER:
                f.hunger += MAX_HUNGER * this.calcSkillValue(skill, lvl) / 100;
                if (f.hunger > MAX_HUNGER) f.hunger = MAX_HUNGER;
                break;
            case TOWN_PORTAL: {
                let portal = new Portal();
                portal.init(POS_LOCATION, this.x, this.y);
                message.draw(option.isEnglish() ?
                    `Created a Town Portal` :
                    `タウン・ポータルを生成した`);
                break;
            }
            case SPEED:
                f.spdBuff = this.calcSkillValue(skill, lvl);
                f.spdBuffDur = duration;
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
            case POISON: {
                if (evalPercentage(f.poison)) return;
                let value = this.calcSkillValue(skill, lvl);
                f.poisonedVal = value;
                f.poisoned = duration;
                f.poisonedId = this.id;
                message.draw(option.isEnglish() ?
                    `${name} got poisoned(-${value})` :
                    `${name}毒を受けた(-${value})`);
                break;
            }
            case RADIATION:
                if (boss || evalPercentage(f.radiation)) return;
                f.decayOrRestore();
                break;
            case SLOW:
            case GRAVITATIONAL_FIELD:
                if (boss || evalPercentage(f.gravity)) return;
                f.spdNerf = this.calcSkillValue(skill, lvl);
                f.spdNerfDur = duration;
                f.calcSpeed();
                message.draw(option.isEnglish() ?
                    `${name} slowed down` :
                    `${name}減速した`);
                audio.playSound('slow');
                break;
            case CONFUSION:
                if (boss || evalPercentage(f.poison)) return;
                f.confused = duration;
                message.draw(option.isEnglish() ?
                    `${name} got confused` :
                    `${name}混乱した`);
                break;
            case TOUCH_OF_CONFUSION:
                f.atkCon = this.calcSkillValue(skill, lvl);
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
                    f.ias -= f.enchantSelf;
				}
				
                f.enchantSelf = this.calcSkillValue(skill, lvl);
                f.enchantSelfDur = duration;
                f.dmgBonus += f.enchantSelf;
                f.rateBonus += f.enchantSelf;
                f.acBonus += f.enchantSelf;
                f.ias += f.enchantSelf;
                f.calcDmg();
                f.calcAc();
                message.draw(option.isEnglish() ?
                    `${name} got an effect of Enchant Self` :
                    `${name}自己強化の効果を得た`);
                break;
            case PARALYSIS:
            case HOLD_MONSTER:
                if (boss || evalPercentage(f.poison)) return;
                f.paralyzed = duration;
                message.draw(option.isEnglish() ?
                    `${name} got paralyzed` :
                    `${name}麻痺した`);
                audio.playSound('paralyze');
                break;
            case SLEEP:
            case SLEEPING_GAS:
                if (boss || evalPercentage(f.poison)) return;
                f.sleeping = duration;
                message.draw(option.isEnglish() ?
                    `${name} fell asleep` :
                    `${name}昏睡した`);
                break;
            case BLINDNESS:
                if (boss || evalPercentage(f.poison)) return;
                f.blinded = duration;
                if (f.id === ID_ROGUE) f.goBlind();
                message.draw(option.isEnglish() ?
                    `${name} got blinded` :
                    `${name}盲目になった`);
                audio.playSound('blind');
                break;
            case INVISIBILITY:
                if (boss || f.invisible) return;
                f.invisibility = duration;
                f.invisible = true;
                break;
            case SEE_INVISIBLE:
                f.seeInvisible = duration;
                if (f.id === ID_ROGUE) seeInvisible(true);
                message.draw(option.isEnglish() ?
                    `${name} can see invisible things` :
                    `${name}透明の物体が見えるようになった`);
                if (f.blinded) {
                    f.blinded = 0;
                    if (f.id === ID_ROGUE) f.goBlind(true);
				}
				
                break;
            case INFECTION:
                if (boss || evalPercentage(f.infection)) return;
                f.infected = duration;
                message.draw(option.isEnglish() ?
                    `${name} got infected` :
                    `${name}感染した`);
                break;
            case HALLUCINATION:
            case HALLUCINATING_MIST: {
                if (boss || evalPercentage(f.poison)) return;
                let found;
                if (!f.hallucinated && f.id === ID_ROGUE) found = true;
                f.hallucinated = duration;
                if (f.id !== ID_ROGUE) f.removeCe();
                if (found) hallucinate.all();
                message.draw(option.isEnglish() ?
                    `${name} got hallucinated` :
                    `${name}幻覚状態になった`);
                audio.playSound('hallucinate');
                break;
            }
            case POLYMORPH: {
                if (f.id === ID_ROGUE || f.mod === MOD_UNIQUE || evalPercentage(f.poison)) return;
                let [tempX, tempY] = [f.x, f.y];
                f.died();
                creation.enemy({
                    position: POS_LOCATION,
                    x: tempX,
                    y: tempY,
                    summon: true,
                    noGroup: true,
				});
				
                message.draw(option.isEnglish() ?
                    `${name} got polymorphed` :
                    `${name}変容した`);
                break;
            }
            case CANCELLATION:
                if (boss || evalPercentage(f.poison)) return;
                f.canceled = duration * (f.mod !== MOD_UNIQUE ? 1 : 2);
                if (f.invisible) {
                    if (f.invisible !== DEFAULT) f.invisibility = 0;
                    f.invisible = false;
				}
				
                if (f.mimic && !f.identified) {
                    hallucinate.undoOne(f);
                    f.identified = true;
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
            case CREATE_GIANT: {
                let type;
                if (skillId === CREATE_MONSTER || skillId === CREATE_MAGIC_MONSTER) {
                    type = RANDOM;
				} else if (skillId === CREATE_GIANT) {
					type = 'giants';
				}

                creation.enemy({
                    times: rndIntBet(1, 3),
                    type: type,
                    position: POS_LOCATION,
                    x: this.x,
                    y: this.y,
                    summon: true,
                    magic: skillId === CREATE_MAGIC_MONSTER,
				});
				
                audio.playSound('summon');
                break;
            }
            case CREATE_TRAP:
                creation.trap(5, RANDOM, POS_LOCATION, this.x, this.y);
                break;
            case MAGIC_CIRCLE_OF_PROTECTION:
                creation.trap(1, 0, POS_LOCATION, this.x, this.y, true);
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
                audio.playSound('encourage');
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
                if (f.mod === MOD_UNIQUE) return;
                f.respec();
                break;
            case COLD:
            case FREEZE: {
                if (f.cost > COST_REGULAR * 2 || evalPercentage(f.cold)) return;
                let cost = COST_REGULAR * (skillId === FREEZE ? 2 : 1) - f.cold * 5;
                if (f.mod === MOD_UNIQUE) cost /= 5;
                f.cost += cost;
                break;
            }
            case ACCELERATION:
                this.cost -= rndIntBet(100, 300);
                break;
            case STONE_TO_MUD: {
                if (map.coords[x][y].isObstacle()) {
                    let loc = map.coords[x][y];
                    if (loc.wall) {
                        loc.deleteWall(true);
					} else {
						loc.deleteDoor(true);
					}

                    rogue.lightenOrDarken('Lighten');
                    audio.playSound('dig', distanceSq(this.x, this.y, x, y));
				}
				
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
    }

    aim({
        x1,
        y1,
        nameSkill,
        ecco,
        key = null,
    }) {
        if (key === 'x') {
            if (this.blinded) {
                message.draw(message.get(M_CANT_EXAMINE));
                return;
			}
			
            flag.examine = true;
            cursor.init();
            map.coords[rogue.x][rogue.y].getInfo();
            return;
		}
		
        if (key !== null) {
            if (key === 't') {
                [x1, y1] = [this.x, this.y];
			} else {
                var dr = getDirection(key);
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
            this.consumeMana(skill);
            message.draw(option.isEnglish() ?
                `${nameChar} cast ${name}` :
                skill.type === 'spell' ?
                `${nameChar}${name}を唱えた` :
                `${nameChar}${name}を放った`);
            if (skill.type === 'missile') audio.playSound('shoot');
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
		} else if (flag.arrow) {
            audio.playSound('shoot');
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
		
        if (this.id !== ID_ROGUE) return;
        if (!flag.examine) {
             cursor.clearAll();
        }

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
        } else if (this.id === ID_ROGUE && !this.haveBook(skill.id)) {
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
		
        if (this.id === ID_ROGUE && msgId) message.draw(message.get(msgId));
        return check;
    }

    canRead(book) {
        let found = true;
        if (this.blinded || this.confused || !rogue.litMapIds[this.x + ',' + this.y]) {
            if (this.id === ID_ROGUE) {
                let id = book ? M_CANT_READ_BOOK : M_CANT_READ_SCROLL;
                message.draw(message.get(id));
			}
			
            found = false;
		}
		
        return found;
    }

    haveBook(nameSkill) {
        let found = this.haveBookLoop(this.pack, nameSkill);
        if (!found) found = this.haveBookLoop(this.boxes, nameSkill);
        return found;
    }

    haveBookLoop(list, nameSkill) {
        for (let key in list) {
            let item = list[key];
            if (item && item.type === 'book') {
				if (nameSkill && item.skill) {
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
        this.cost -= this['spd' + getUpperCase(skill.type)];
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
            case PLACE_PACK:
                this.deletePackItem(item.indexOf(this.pack), quantity);
                break;
            case PLACE_BOX:
                this.deleteBoxItem(item.indexOf(this.boxes), quantity);
                break;
            case PLACE_FLOOR:
                let loc = map.coords[item.x][item.y];
                loc.deleteItem(item.indexOf(loc.item), quantity);
                break;
            case PLACE_EQUIPMENT:
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
            if ((item.place === PLACE_PACK || item.place === PLACE_BOX) && !this.packAdd(item)) {
                item.dropped();
			} else if (item.place === PLACE_FLOOR) {
				item.putDown(item.x, item.y, true);
			}
        } else {
            item.charges--;
            if (item.identified) {
                item.changePrice();
                if (item.place === PLACE_PACK) inventory.sort(this.getItemIndex(item), this.pack);
            }
        }
    }

    getItemIndex(item) {
        let a;
        switch (item.place) {
            case PLACE_PACK:
                a = item.indexOf(this.pack);
                break;
            case PLACE_BOX:
                a = item.indexOf(this.boxes);
                break;
            case PLACE_FLOOR:
                let loc = map.coords[item.x][item.y];
                a = item.indexOf(loc.item);
                break;
            case PLACE_EQUIPMENT:
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
        audio.playSound('grab');
        if (this.id !== ID_ROGUE) return;
        rogue.done = true;
        this.equipmentList();
        flag.clearInv = true;
    }

    stealGold(enemy) {
        if (!enemy.purse || evalPercentage(enemy.dex * 2 / 5)) return;
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
        if (evalPercentage(enemy.dex * 2 / 5)) return;
        let { pack, box } = enemy.haveItem();
        if (!pack && !box) return;
        if (pack && box) {
            pack = coinToss();
            box = !pack;
		}
		
        let item;
        if (pack) {
            let a = eaList[rndInt(Object.keys(enemy.pack).length - 1)];
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
        let item = this.equipment[weapon ? 'main' : bpList[eaList[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
        if (!item || !item.durab || item.indestructible) return;
        let value;
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

            if (item.material & mat) value = rndIntBet(1, 5);
        } else if (evalPercentage(5)) {
            value = 1;
		}

        if (!value) return;
        item.durab -= value;
        if (item.durab < 0) item.durab = 0;
        if (item.durab) return;
        this.getOrLooseStats(item);
        this.calcAll();
        let name = item.getName();
        audio.playSound('broken');
        message.draw(option.isEnglish() ?
            `${name} broke` :
            `${name}は壊れた`);
        return true;
    }

    gotCursed() {
        let item = this.equipment[bpList[eaList[rndInt(MAX_EQUIPMENT_NUM - 1)]]];
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
        this.energy -= this.cost * (1 + (this.spd < 0 ? -this.spd / 100 : 0)) + rndIntBet(-100, 100);
        if (this.cost !== COST_REGULAR) this.cost = COST_REGULAR;
        map.queue.update(this);
    }

    increaseEnergy() {
        this.energy += COST_REGULAR * (1 + (this.spd > 0 ? this.spd / 100 : 0)) + rndIntBet(-100, 100);
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
		
        if (this.id === ID_ROGUE) {
            let loc = map.coords[this.x][this.y];
            loc.traces = ++this.numSteps;
            loc.getInfo();
        }
    }


    wakeUp() {
        this.sleeping = 0;
        if (this.id !== ID_ROGUE && !this.isShowing()) return;
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
                        if (this.id === ID_ROGUE) message.draw(message.get(M_TWO_HANDED));
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
                position: POS_LIST,
                lvl: this.lvl,
                uniqueId: itemInfo.uniqueId,
                starter: itemInfo.starter,
                matBase: itemInfo.matBase,
                matId: itemInfo.matId,
                magic: itemInfo.magic,
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
            item.place = PLACE_EQUIPMENT;
            this.gainOrloseWeight(item, item.quantity, true);
            if (!side && item.durab) this.getOrLooseStats(item, true, false, true);
            return true;
        }
    }

    respec() {
        this.statPoints = this.skillPoints = this.lvl - 1;
        this.statPoints *= 5;
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
        if (this.id === ID_ROGUE) this.initKeys();
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

    getShootMsg(ammo) {
        let name = this.getName(true);
        let nameArrow = ammo.getName(false, 1);
        // if (option.isEnglish()) nameArrow = getArticleAndPlural(nameArrow, false, true, this.timesMissile);
        message.draw(option.isEnglish() ?
            `${name} shot ${nameArrow}` :
            `${name}${nameArrow}を放った`);
    }
}
const Rogue = class extends Fighter {
    constructor() {
        super(fighterTab['misc'][0])
        this.name['a'] = this.name['b'] = data.name;
        this.id = ID_ROGUE;
        this.expMax = this.exp = 0;
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        this.cube = {};
        this.cubeIndex = {};
        this.hunger = MAX_HUNGER / 2;
        this.purse = 500;
        this.keysList = {};
        this.numSteps = 0;
        this.skill = {};
        this.detected = true;
        this.ce = null; //current enemy
        this.dl = 0; //dungeon level
        this.pdl = 0; //portal dungeon level
        this.cdl = 0; //current dungeon level
        this.cui = {}; //current unique item
        this.cue = {}; //current unique enemy
        this.recipes = {};
        this.recipes[RECIPE_EMBED] = true;
        this.lethe = 0;
        this.turn = 1;
        this.done = false;
        this.initKeys();
        this.isWizard = DEBUG;
    }

    init() {
        if (this.starter) this.getStarterItems();
        this.calcAll();
        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = this.spd / 100;
    }

    initKeys() {
        for (let i = 0; i < MAX_ASSIGN_NUM; i++) {
			this.keysList[i] = null;
		}
    }

    move(key, dr) {
        if (this.confused) {
            dr = drList[rndInt(drList.length - 1)];
		} else if (key) {
			dr = getDirection(key);
		}

        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
        } else if (loc.fighter) {
            if (this.haveMissile()) {
                let ammo = this.getAmmo(this.equipment['main'].throwType);
                if (ammo) {
                    this.ci = ammo;
                    flag.arrow = true;
                    this.getShootMsg(ammo);
                    this.aim({ key: key });
                } else {
                    message.draw(message.get(M_DONT_HAVE_AMMO));
                    return null;
                }
            } else {
                audio.playSound('swing');
                this.attack({ enemy: loc.fighter });
			}
			
            rogue.done = true;
        } else if (this.stuckTrap) {
            message.draw(message.get(M_STUCK));
            rogue.done = true;
            if (flag.dash)　 flag.dash = false;
        } else if (!loc.wall) {
            this.drawOrErase(false, true);
            this.x += dr.x;
            this.y += dr.y;
            loc.traces = ++this.numSteps;
            this.drawOrErase(true, true);
            if (!loc.getInfo()) {
                rogue.done = true;
                this.cost -= this.spdMove;
            }
        } else {
			audio.playSound('hitwall');
		}
    }

    rest() {
        this.decreaseEnergy();
        map.queue.moveAll();
        if (flag.rest && (this.hp !== this.hpMax || this.mp !== this.mpMax)) {
            setTimeout(this.rest.bind(this), WAIT_TIME);
		} else {
            flag.rest = false;
        }
    }

    dash(key) {
        if (this.confused) return;
        let dr = getDirection(key);
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
            return;
        } else if (loc.wall) {
            audio.playSound('hitwall');
            return;
		}
		
        flag.dash = true;
        let drLUp = getNextDirection(dr, true);
        let drRUp = getNextDirection(dr);
        var count = 0;
        var wallLUp = false;
        var wallRUp = false;
        if (map.coords[this.x + drLUp.x][this.y + drLUp.y].wall) wallLUp = true;
        if (map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) wallRUp = true;
        this.dashLoop(dr, drLUp, drRUp, wallLUp, wallRUp, count);
    }

    dashLoop(dr, drLUp, drRUp, wallLUp, wallRUp, count) {
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (!loc.isObstacle() && !flag.died) {
            if (this.move(null, dr) === null) flag.dash = false;
            this.decreaseEnergy();
            map.queue.moveAll();
            if (flag.dash) this.dashCheck(dr, drLUp, drRUp, wallLUp, wallRUp, count);
        } else {
			flag.dash = false;
		}
    }

    dashCheck(dr, drLUp, drRUp, wallLUp, wallRUp, count) {
        var found = false;
        if (wallLUp && !wallRUp) {
            if (!map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
           		map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				found = true;
			}
        } else if (!wallLUp && wallRUp) {
            if (!map.coords[this.x + drRUp.x][this.y + drRUp.y].wall ||
               	map.coords[this.x + drLUp.x][this.y + drLUp.y].wall) {
				found = true;
			}
        } else if (wallLUp && wallRUp) {
            if (count) {
                dr = map.coords[this.x + dr.x][this.y + dr.y].wall ?
                    this.dashSearch(dr) : null;
                if (!dr) {
                    found = true;
				} else {
                    count = 0;
                    drLUp = getNextDirection(dr, true);
                    drRUp = getNextDirection(dr);
                }
			}
			
            if (!map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
               	!map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				count++;
			}
        } else {
            if (map.coords[this.x + drLUp.x][this.y + drLUp.y].wall ||
          	    map.coords[this.x + drRUp.x][this.y + drRUp.y].wall) {
				found = true;
			}
		}
		
        if (found) {
            flag.dash = false;
		} else {
			setTimeout(this.dashLoop.bind(this, dr, drLUp, drRUp, wallLUp, wallRUp, count), WAIT_TIME);
		}
    }

    dashSearch(dr) {
        let key1 = -1;
        let keyDia = -1;
        for (let key in drList) {
            if (!map.coords[this.x + drList[key].x][this.y + drList[key].y].wall &&
               	-drList[key].x !== dr.x && -drList[key].y !== dr.y) {
                if (key < 4) {
                    if (key1 !== -1) {
                        return;
					} else {
						key1 = key;
					}
                } else {
                    if (keyDia !== -1) {
                        return;
					} else {
						keyDia = key;
					}
                }
            }
		}
		
        return keyDia !== -1 && drList[keyDia].x !== drList[key1].x &&
            drList[keyDia].y !== drList[key1].y ? null : drList[key1];
    }

    searchDoor() {
        let tempX, tempY;
        let count = 0;
        for (let key in drList) {
            let [x, y] = [this.x + drList[key].x, this.y + drList[key].y]
            let loc = map.coords[x][y];
            if (loc.door && loc.isClosedDoor() === flag.openDoor &&
                !loc.fighter && !loc.item['a'] && !loc.hidden) {
                if (!count)[tempX, tempY] = [x, y];
                count++;
            }
		}
		
        if (count === 1) {
            map.coords[tempX][tempY].openOrCloseDoor();
            this.done = true;
		}
		
        return count;
    }

    openOrCloseDoor(key) {
        let dr = getDirection(key);
        if (!dr) return;
        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.door && loc.isClosedDoor() === flag.openDoor &&
            !loc.item['a'] && !loc.fighter) {
            loc.openOrCloseDoor();
            this.done = true;
            flag.openDoor = flag.closeDoor = false;
            flag.regular = true;
            inventory.clear();
        }
    }

    searchHiddenObject() {
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
				map.coords[i][j].findHiddenObject();
			}
		}
		
        rogue.done = true;
    }

    attackStationary(key) {
        if (this.keysList[0] !== null) {
            this.castAssignedSkill('M', key);
		} else if (this.haveMissile()) {
            let ammo = this.getAmmo(this.equipment['main'].throwType);
            if (ammo) {
                this.ci = ammo;
                flag.arrow = true;
                this.getShootMsg(ammo);
                this.aim({ key: key });
            } else {
				message.draw(message.get(M_DONT_HAVE_AMMO));
			}
        } else {
            let dr = getDirection(key);
            let loc = map.coords[this.x + dr.x][this.y + dr.y];
            if (loc.wall) {
                this.dig(loc);
			} else {
                audio.playSound('swing');
                if (loc.fighter) this.attack({ enemy: loc.fighter });
			}
			
            rogue.done = true;
        }
    }

    died() {
        inventory.clear();
        if (this.blinded) this.blinded = 0;
        if (this.hallucinated) {
            this.hallucinated = 0;
            hallucinate.all(true);
        } else {
            map.drawObjectAll()
            map.draw();
        }

        audio.playSound('kill');
        audio.stop(audio.curTrack);
        audio.playMusic('gameover');
        message.draw(message.get(M_DIED));
        message.draw(message.get(M_RETRY), true);
        rogue.done = false;
        initFlag();
        flag.regular = false;
        flag.wait = false;
        flag.died = true;
        data.delete();
    }

    getStartPointInTown() {
        if (!rogue.cdl && rogue.dl) {
            let pos = positionFixedList.hell;
            [this.x, this.y] = [pos.x, pos.y];
		} else {
            let pos = positionFixedList.start;
			[this.x, this.y] = [pos.x, pos.y];
		}
    }

    putDown(town, stairs, x, y) {
        if (town) {
            this.getStartPointInTown();
        } else if (stairs) {
            [this.x, this.y] = [x, y];
        } else {
            this.getPositionRandomly(true);
        }

        map.coords[this.x][this.y].traces = ++this.numSteps;
        this.drawOrErase(true);
        map.queue.push(this);
    }

    downOrUpStairs(key, trap) {
        let loc = map.coords[this.x][this.y];
        if (!trap && !loc.stairs || loc.hidden) return;
        let dr = trap ? null : loc.stairs.id;
        if (trap || dr === DR_DOWN && key === '>') {
            if (!trap) audio.playSound('staircase');
            if (option.autosave.user) data.save();
            game.clearLevel();
            if (rogue.cdl === 33) {
                rogue.cdl = 0;
                creation.town();
            } else {
                if (rogue.dl < ++rogue.cdl) rogue.dl = rogue.cdl;
                creation.dungeon(!trap, dr);
            }
        } else if (dr === DR_UP && key === '<') {
            audio.playSound('staircase');
            if (option.autosave.user) data.save();
            game.clearLevel();
            !--rogue.cdl ? creation.town() : creation.dungeon(true, dr);
        }
    }

    enterPortal() {
        if (!this.cdl) {
            if (option.autosave.user) data.save();
            game.clearLevel()
            this.cdl = this.pdl;
            creation.dungeon();
        } else {
            this.pdl = this.cdl;
            game.clearLevel()
            creation.town();
            this.cdl = 0;
            let portal = new Portal();
            portal.init(POS_LOCATION, this.x, this.y);
		}
		
        audio.playSound('tplevel');
    }

    enterBuild(enter) {
        input.switchFlag();
        map.drawObjectAll();
        map.draw();
        if (enter.stash) {
            flag.stash = true;
            enter.page = 1;
            let msg = message.get(M_STASH);
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_STASH);
            message.draw(msg, true);
            return;
        } else if (enter.shop) {
            flag.shop = true;
            this.cn = 1;
            flag.gamble = enter.gamble;
            let msg = message.get(M_SHOP);
            msg = enter.name[option.getLanguage()] + msg;
            this.showInventory(PLACE_PACK);
            if (!enter.list['a']) enter.createShopItem();
            this.showInventory(PLACE_SHOP);
            message.draw(msg, true);
        } else if (enter.cure) {
            flag.cure = true;
            inventory.show({
                list: enter.list,
                dr: DR_RIGHT,
                enter: enter,
            });

            message.draw(message.get(M_CURE), true);
        } else if (enter.blacksmith) {
            flag.blacksmith = true;
            let msg = message.get(M_BLACKSMITH);
            this.equipmentList();
            this.showInventory(PLACE_PACK);
            message.draw(msg, true);
		}
		
        let nameEnter = enter.getName();
        message.draw(option.isEnglish() ?
            `You entered The ${nameEnter}` :
            `${nameEnter}に入った`);
    }

    itemAuto(list) {
        let found;
        for (let key in list) {
            do {
                found = false;
                let item = list[key];
                if (!item) break;
                if (item.type === 'coin' ||
                    item.type === 'ammo' && this.equipment['main'] &&
                    this.equipment['main'].throwType === item.throwType) {
                    flag.grab = true;
                    found = this.grabItem(null, key) !== null;
                    continue;
				}
				
                if (!item.identified && option['auto-identify'].user) this.checkItem(item, IDENTIFY);
                let charged;
                if (item.identified && (item.type === 'scroll' ||
                item.charges && item.quantity === 1) &&
                option['auto-charge'].user && this.mp) { 
                    charged = this.checkItem(item, CHARGE);
                }

                if (charged || option['auto-destroy'].user) {
                    if (!charged || charged.delete) {
                        deleteAndSortItem(list, key);
                        delete map.itemList[item.id];
                        found = true
                    }

                    if (!charged) {
                        let name = item.getName();
                        message.draw(option.isEnglish() ?
                            `Destroyed ${name}` :
                            `${name}を破壊した`);
                    } else {
                        let name = charged.item.getName();
                        message.draw(option.isEnglish() ?
                            `Charged ${name}` :
                            `${name}を充填した`);
                    }
                }
            } while (found);
        }
    }

    grabItem(key, a) {
        let loc = map.coords[this.x][this.y];
        if (flag.grab) {
            if (key) a = getAlphabet(key);
            if (!a || !loc.item[a]) return;
            let item = loc.item[a];
            item = this.inventoryOut(item, item.quantity);
            inventory.clear();
            flag.grab = false;
            flag.regular = true;
            if (item.type !== 'coin' && !this.packAdd(item)) {
                message.draw(message.get(M_CANT_CARRY));
                return null;
            } else {
                let name = item.getName();
                if (item.type === 'coin') this.purse += item.price;
                message.draw(option.isEnglish() ?
                    `Picked up ${name}` :
                    `${name}を拾った`);
                audio.playSound('grab');
                rogue.done = true;
            }
        } else {
            if (!loc.item['a']) return;
            flag.grab = true;
            if (!loc.item['b']) {
                this.grabItem('a');
			} else {
                input.switchFlag();
                let msg = message.get(M_GRAB);
                this.showInventory(PLACE_FLOOR);
                message.draw(msg, true);
            }
        }
    }

    drop(key) {
        let item;
        if (!flag.number) {
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a);
            if (!item || item.place === PLACE_EQUIPMENT && item.cursed) return;
            if (item.quantity > 1) {
                this.ci = item;
                flag.number = true;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
                return;
            } else {
				item = this.inventoryOut(item, 1);
			}
        } else {
            item = this.ci;
            let i = this.cn;
            if (i > item. quantity) i = item.quantity;
            item = this.inventoryOut(item, i);
            this.ci = null;
		}
		
        item.putDown(this.x, this.y, true);
        item.dropped();
        inventory.clear();
        flag.drop = false;
        flag.regular = true;
        rogue.done = true;
    }

    equip(key) {
        if (this.switchInventory(key, M_EQUIP)) return;
        let a = getAlphabetOrNumber(key);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item || !item.equipable) return;
        flag.floor = false;
        let parts = this.getParts(item);
        if (!parts) return;
        item = this.inventoryOut(item, 1);
        item.place = PLACE_EQUIPMENT;
        this.equipment[parts] = item;
        this.gainOrloseWeight(item, item.quantity, true);
        let name = item.getName();
        if (item.weapon) {
            message.draw(option.isEnglish() ?
                `Wielding ${name}` :
                `${name}を握った`);
        } else {
            message.draw(option.isEnglish() ?
                `Wearing ${name}` :
                `${name}を身に付けた`);
		}
		
        if (item.cursed) audio.playSound('curse');
        if (this.eqt['a']) {
            let item2 = this.eqt['a'];
            if (!this.packAdd(item2)) item2.dropped();
            delete this.eqt['a'];
		}
		
        if (item.durab) this.getOrLooseStats(item, true);
        this.calcAll(true);
        inventory.clear();
        this.equipmentList();
        flag.equip = false;
        flag.regular = true;
        rogue.done = true;
        flag.clearInv = true;
    }

    unequip(key, parts) {
        if (!parts) {
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            parts = bpList[a];
        }

        let item = this.equipment[parts];
        if (!item) return;
        let msg;
        if (item.weapon) {
            msg = option.isEnglish() ? 'unwield' : '離す';
		} else {
			msg = option.isEnglish() ? 'take off' : '外す';
		}

        if (item.cursed) {
            message.draw(option.isEnglish() ?
                `You can't ${msg} the cursed item` :
                `呪われたアイテムを${msg}ことが出来ない`);
            return null;
		}
		
        let name = item.getName();
        if (option.isEnglish()) {
            msg = getUpperCase(msg);
            message.draw(`${msg} ${name}`);
        } else {
            msg = msg.charAt(0);
            message.draw(`${name}を${msg}した`);
		}
        
        audio.playSound('grab');
        this.equipment[parts] = null;
        this.gainOrloseWeight(item);
        if (flag.equip) {
            this.eqt['a'] = item;
		} else if (!this.packAdd(item)) {
			item.dropped();
		}

        if (item.durab) this.getOrLooseStats(item, false);
        rogue.done = true;
        inventory.clear();
        flag.unequip = false;
        flag.regular = true;
        if (!flag.equip) {
            this.calcAll();
            this.equipmentList();
            flag.clearInv = true;
        }
    }

    isNaked() {
        for (let key in bpList) {
            if (this.equipment[bpList[key]]) return false;
		}
		
        return true;
    }

    fuel(key, boxItem) {
        if (this.switchInventory(key, M_FUEL, true)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            let a = getAlphabetOrNumber(key);
            if (!a || input.isShift) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'light' && item.type !== 'oil') return;
		}
		
        let light = this.equipment['light'];
        if (light.torch && !item.torch || !light.torch && item.torch) return;
        flag.floor = false;
        if (!light.fuelValue && item.fuelValue && light.durab) {
            this.lighten += light.lighten;
            this.lightenOrDarken('Lighten');
		}
		
        light.fuelValue += item.fuelValue;
        if (light.fuelValue > light.fuelMax) light.fuelValue = light.fuelMax;
        light.calcFuelLvl();
        if (item.mod !== MOD_NORMAL) {
            item.fuelValue = 0;
            item.calcFuelLvl();
        } else {
			this.deleteItem(item, 1);
		}

        let name = light.getName();
        message.draw(option.isEnglish() ?
            `Fueled ${name}` :
            `${name}を補給した`);
        rogue.done = true;
        inventory.clear();
        flag.fuel = false;
        flag.regular = true;
    }

    eat(key, boxItem) {
        if (this.switchInventory(key, M_EAT)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'food') return;
            flag.floor = false;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Ate ${name}` :
            `${name}を食べた`);
        audio.playSound('eat');
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.deleteItem(item, 1);
        if (!boxItem) {
            inventory.clear();
            flag.eat = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    quaffPotion(key, boxItem) {
        if (this.switchInventory(key, M_QUAFF)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'potion') return;
            flag.floor = false;
		}
		
        if (!item.identified) {
            item.identifyAll();
            if (item.place === PLACE_PACK) var sort = true;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Quaffed ${name}` :
            `${name}を飲んだ`);
        audio.playSound('quaff');
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.hunger += HUNGER_POTION;
        if (this.hunger > MAX_HUNGER) this.hunger = MAX_HUNGER;
        this.deleteItem(item, 1);
        if (!boxItem) {
            if (sort && item.quantity > 0) inventory.sort(a, this.pack);
            inventory.clear();
            flag.quaff = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    zap(key, boxItem) {
        if (this.switchInventory(key, M_ZAP)) return;
        let item;
        if (boxItem) {
            input.switchFlag();
            flag.zap = true;
            item = boxItem;
        } else {
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'wand') return;
		}
		
        inventory.clear();
        this.ci = item;
        flag.floor = false;
        message.draw(message.get(M_ZAP_DIR) + message.get(M_TO_EXAMINE), true);
        flag.aim = true;
        this.examinePlot(true);
    }

    throw(key) {
        if (this.switchInventory(key, M_THROW)) return;
        let a = getAlphabetOrNumber(key);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item) return;
        inventory.clear();
        this.ci = item;
        flag.floor = false;
        message.draw(message.get(M_THROW_DIR) + message.get(M_TO_EXAMINE), true);
        flag.aim = true;
        this.examinePlot(true);
    }

    haveThrown(item, fighter, x, y) {
        if (item.type === 'potion' || item.type === 'wand') {
            this.haveCast(item.nameSkill, item.skillLvl, fighter, x, y);
            this.deleteAmmo(item, false, x, y);
            if (!fighter.abort) this.getCe(fighter, false);
            if (item.type === 'potion') {
                item.identifyAll();
			} else {
                let skill = skillMap.get(item.nameSkill);
                if (!skill.wall && fighter.material !== M_STONE) item.identifyWand();
            }
        } else {
            this.attack({
                enemy: fighter,
                itemThrown: item,
            });
        }
    }

    read(key, boxItem) {
        if (this.switchInventory(key, M_READ)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'scroll' && item.type !== 'recipe' && !item.chargeBook) return;
		}
		
        if (item.chargeBook && !item.charges) return;
        flag.floor = false;
        if (!item.identified) {
            item.identifyAll();
            if (item.place === PLACE_PACK) inventory.sort(a, this.pack);
		}
		
        let name = item.getName(true, 1);
        message.draw(option.isEnglish() ?
            `Read ${name}` :
            `${name}を読んだ`);
        if (item.type === 'recipe' && !this.recipes[item.tabId]) {
            this.recipes[item.tabId] = true;
            message.draw(option.isEnglish() ?
                `Learned a new recipe` :
                `新たなレシピを習得した`);
        }

        flag.read = false;
        if (item.type !== 'recipe') {
            flag.scroll = true;
            if (skillMap.get(item.nameSkill).range === 0) {
                this.ci = item;
                if (!boxItem) {
                    inventory.clear();
                    flag.aim = true;
                    message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
                    this.examinePlot(true);
                    return;
                } else {
                    this.aim({
                        x1: this.x,
                        y1: this.y,
                    });
                }
            } else if (this.haveCast(item.nameSkill, item.skillLvl, this) === null) {
                this.ci = item;
                return;
            }
        }

        this.deleteItem(item, 1);
        inventory.clear();
        flag.regular = true;
        rogue.done = true;
    }

    identify(key, item) {
        if (this.switchInventory(key, M_IDENTIFY, true)) return;
        if (key !== null) {
            var a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a, flag.floor);
		}
		
        if (!item || item.identified) return;
        flag.floor = false
        if (item.type === 'wand' && !itemTab[item.type].get(item.tabId).identified ||
            item.type === 'potion' || item.type === 'scroll' || item.type === 'recipe' || item.type === 'orb') {
            item.identifyAll();
		} else {
            item.identified = true;
            item.changeNameAndPrice();
		}
		
        let name = item.getName();

        message.draw(option.isEnglish() ?
            `Identified ${name}` :
            `${name}を判別した`);
        if (key) {
            inventory.clear();
            this.showInventory(item.place, a);
            investigation.main(item, item.place === PLACE_EQUIPMENT || item.place === PLACE_BOX ? DR_RIGHT : DR_LEFT);
            if (item.place === PLACE_PACK) inventory.sort(a, this.pack);
            rogue.done = true;
            flag.identify = false;
            flag.regular = true;
            flag.clearInv = true;
        }
        if (flag.skill) {
            this.consumeMana(skillMap.get(IDENTIFY));
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}
    }

    repairAll(forAmount = '') {
        let found;
        for (let key in this.equipment) {
            let item = this.equipment[key];
            if (item && item.durab < item.durabMax) {
                this.repairOne(item, true);
                found = true;
            }
		}
		
        if (found) {
            message.draw(option.isEnglish() ?
                `Repaired your equipment${forAmount}` :
                `装備を${forAmount}修復した`);
        }
    }

    getDurabPriceAll() {
        let priceTotal = 0;
        for (let key in this.equipment) {
            let item = this.equipment[key];
            if (item && item.durab < item.durabMax)
                priceTotal += item.getDurabPrice();
		}
		
        return priceTotal;
    }

    repair(key) {
        let blacksmithAll = flag.blacksmith && key === 'Enter'; 
        if (!blacksmithAll) {
            if (!flag.blacksmith && this.switchInventory(key, M_REPAIR, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            var item = this.getItem(a, flag.floor);
            if (!item || !item.equipable || item.durab === item.durabMax) return;
            flag.floor = false;
		}
		
        let forAmount = '';
        if (flag.blacksmith) {
            var price = blacksmithAll ? this.getDurabPriceAll() : item.getDurabPrice();
            if (!price) return;
            if (this.purse < price) {
                message.draw(message.get(M_DONT_HAVE_MONEY));
                return;
			}
			
            forAmount = option.isEnglish() ? ` for $${price}` : `$${price}で`;
            if (blacksmithAll) this.repairAll(forAmount);
		}
		
        if (!blacksmithAll) {
            this.repairOne(item, input.isShift);
            let name = item.getName();
            message.draw(option.isEnglish() ?
                `Repaired ${name}${forAmount}` :
                `${name}を${forAmount}修復した`);
		}
		
        inventory.clear();
        if (flag.blacksmith) {
            this.purse -= price;
            let msg = message.get(M_BLACKSMITH);
            this.equipmentList();
            this.showInventory(PLACE_PACK);
            message.draw(msg, true);
            return;
		}
		
        if (flag.skill) {
            this.consumeMana(skillMap.get(RESTORE_DURABILITY));
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}

        rogue.done = true;
        flag.repair = false;
        flag.regular = true;
        flag.clearInv = true;
    }

    repairOne(item, equip) {
        if (item.cursed) item.uncurse();
        if (!item.durab && equip) {
            this.getOrLooseStats(item, true);
            this.calcAll();
		}
		
        item.durab = item.durabMax;
    }

    disintegrate(key) {
        let symbol = key === '%' ? key : getAlphabet(key);
        if (!symbol) return;
        let skill = skillMap.get(DISINTEGRATION);
        let lvl;
        if (flag.skill) {
            lvl = this.cs.lvl + this.getSkillBoost(skill);
		} else {
			lvl = this.ci.skillLvl;
		}

        let radius = this.calcSkillValue(skill, lvl);
        circleSearch.main({
            x0: this.x,
            y0: this.y,
            type: DISINTEGRATION,
            radius: radius,
            symbol: symbol,
		});
		
        inventory.clear();
        if (flag.skill) {
            this.consumeMana(skill);
            flag.skill = false;
        } else if (flag.scroll) {
			this.deleteItem(this.ci, 1);
		}

        flag.disint = false;
        flag.regular = true;
        rogue.done = true;
    }

    wormhole(x, y) {
        let skill = skillMap.get(WORMHOLE);
        let lvl = this.cs.lvl + this.getSkillBoost(skill);
        let radiusSq = this.calcSkillValue(skill, lvl) ** 2;
        let loc = map.coords[x][y];
        if (!loc.found || loc.isObstacle() ||
            distanceSq(x, y, this.x, this.y) > radiusSq) {
            message.draw(message.get(M_CANT_TELE));
            return;
		}
		
        this.teleport(false, false, x, y);
        this.consumeMana(skill);
        flag.skill = false;
        flag.wormhole = false;
        flag.examine = false;
        flag.regular = true;
        rogue.done = true;
        inventory.clear();
        statistics.clearEnemyBar();
        cursor.clearAll();
    }

    investigate(key, item, place, direction) {
        investigation.clear();
        if (!item) {
            if (this.switchInventory(key, M_INVESTIGATE, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            item = this.getItem(a, flag.floor);
            if (!item) return;
        }

        if (!item.identified || item.typeHalluc){
            message.draw(message.get(M_NO_CLUE));
            return;
        }

        if (direction === undefined) direction = item.place === PLACE_EQUIPMENT || item.place === PLACE_BOX ? DR_RIGHT : DR_LEFT;
        investigation.main(item, direction);
    }

    getSkillInfo(skill, lvl, item) {
        let msg = skill.desc[option.getLanguage()];
        if (skill.rate) {
            if (!item) flag.skill = true;
            let value = this.calcSkillValue(skill, lvl, undefined, true);
            if (skill.limit && value > skill.limit) value = skill.limit;
            if (!isFinite(skill.base)) value = (option.isEnglish() ? 'about ' : '約') + value;
            if (skill.perc) {
                if (value > 0) value = '+' + value;
                value += '%';
			}
			
            let replace = skill.radiusRate ? '{radiusRate}' : '{value}';
            msg = msg.replace(replace, value);
            flag.skill = false;
		}
		
        if (skill.radius) msg = msg.replace('{radius}', skill.radius);
        if (skill.durBase) {
            let duration = option.isEnglish() ? 'about ' : '約';
            duration += this.calcSkillDur(skill, lvl, true);
            msg = msg.replace('{dur}', duration);
		}
		
        return msg;
    }

    synthesize(key) {
        if (flag.recipe) {
            if (key !== 'c') return;
            flag.recipe = false;
            inventory.list.recipe.show = false;
            let msg = message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR);
            message.draw(msg, true);
            return;
        } else if (input.isCtrl && key === 'r') {
            flag.recipe = true;
            message.draw(message.get(M_RECIPE), true);
            inventory.showRecipe();
            return;
        }
        
        if (this.switchInventory(key, M_SYNTHESIZE)) return;
        let l = Object.keys(this.cube).length;
        if (key === 'Enter' && l >= 1) { 
            flag.floor = false;
            this.tryToSynthesize();
            return;
        }
        
        let a = getAlphabetOrNumber(key);
        if (!a) return;
        a = a.toLowerCase();
        if (!input.isShift && l === MAX_CUBE_COUNT) {
            message.draw(message.get(M_CANT_ADD));
            return;
        }
        
        let item = input.isShift ? this.cube[a] : this.getItem(a, flag.floor);
        if (!item) return;
        if (input.isShift) {
            this.returnItem(item, a)
            deleteAndSortItem(this.cube, a);
            deleteAndSortItem(this.cubeIndex, a);
        } else {
            let quantity = item.type === 'scroll' ? item.quantity : 1;
            this.cube[eaList[l]] = this.inventoryOut(item, quantity);
            this.cubeIndex[eaList[l]] = a;
        }
        
        this.showInventory(flag.floor ? PLACE_FLOOR : PLACE_PACK);
        this.showInventory(PLACE_CUBE);
    }

    tryToSynthesize() {
        let potion = 0,
            wand = 0,
            light = 0,
            touch = 0,
            lamp = 0,
            oil = 0,
            book = 0,
            scroll = 0,
            gem = 0,
            orb = 0,
            material = 0,
            embeddable = 0,
            unembeddable = 0,
            removable = 0,
            embedded = 0,
            cost = 0,
            num = 0,
            mp = this.mp,
            l = Object.keys(this.cube).length;
        for (let i = 0; i < l; i++) {
            let item = this.cube[eaList[i]];
            if (!item.identified) continue;
            if (item.equipable) {
                if (!item.embeddedMax) unembeddable++;
                if (item.embeddedNum) removable++;
                if (item.embeddedNum < item.embeddedMax) embeddable++;
			}
			
            if (item.type === 'potion') {
                potion++; 
			} else if (item.type === 'wand') {
                wand++;
            } else if (item.type === 'gem') {
                gem++;
                embedded++;
            } else if (item.type === 'orb') {
                orb++;
                embedded++;
            } else if (item.type === 'material') {
                material++;
                embedded++;
            } else if (item.type === 'light') {
                item.torch ? touch++ : lamp++;
            } else if (item.type === 'oil') {
                oil++;
			} else if (item.type === 'book') {
                book++;
            } else if (item.type === 'scroll') {
                scroll++;
            }
		}
		
        let name, msg;
        let recipes = itemTab['recipe'];
        if (l === potion) {
            num = 1;
            if (l === 3) {
                let countGH = 0,
                    countGM = 0;
                let found = true;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.tabId === P_GREATER_HEALING) {
                        countGH++;
                    } else if (item.tabId === P_GREATER_MANA) {
                        countGM++;
                    } else {
                        break;
                    }
                }

                let tabIdRecipe, tabIdPotion;
                if (countGH === l) {
                    tabIdRecipe = RECIPE_EXTRA_HEALING;
                    tabIdPotion = P_EXTRA_HEALING;
                    name = option.isEnglish() ? 'Potion of Extra Healing' : '特大回復の薬';
                } else if (countGM === l) {
                    tabIdRecipe = RECIPE_EXTRA_MANA;
                    tabIdPotion = P_EXTRA_MANA;
                    name = option.isEnglish() ? 'Potion of Extra Mana' : '魔力特大回復の薬';
                } else {
                    found = false;
                }

                if (tabIdRecipe) cost = recipes.get(tabIdRecipe).cost;
                if (found && this.checkRecipe(tabIdRecipe, cost)) {
                    this.createItemIntoPack({
                        type: 'potion',
                        tabId: tabIdPotion,
                        quantity: 1,
                    });
                } else {
                    name = '';
                }
            }
        } else if (l === wand) {
            let tabId = RECIPE_WAND;
            cost = recipes.get(tabId).cost;
            if (l > 1 && this.checkRecipe(tabId, cost)) {
                let found = true;
                let a = 'a';
                let wand = this.cube[a];
                for (let key in this.cube) {
                    if (key === a) continue;
                    let item = this.cube[key];
                    if (wand.nameSkill !== item.nameSkill) {
                        found = false;
                        break;
                    } else if (wand.charges < item.charges) {
                        wand = item;
                        a = key;
                    }
                }

                if (found && wand.charges < MAX_CHARGE_NUM) {
                    num = 0;
                    for (let key in this.cube) {
                        if (key === a) continue;
                        let item = this.cube[key];
                        let obj = this.chargeItem(wand, item, cost, num);
                        if (obj.return) this.returnItem(item, key);
                        if (obj.charges) num += obj.charges;
                    }
                    
                    this.packAdd(wand);
                    name = wand.getName();
                }
            }
        } else if (l === gem) {
            let tabId = RECIPE_WROUGHT_GOLD;
            cost = recipes.get(tabId).cost;
            if (this.checkRecipe(tabId, cost)) {
                let amount = 0;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item, key)
                    } else {
                        num++;
                        this.purse += item.price;
                        amount += item.price;
                    }
                }
                
                name = '$' + amount;
            }
        } else if (l > 1 && l === touch + lamp + oil) {
            let tabId = l === touch ? RECIPE_TORCH : RECIPE_LAMP;
            cost = recipes.get(tabId).cost;
            if ((l === touch || lamp && l === lamp + oil) && this.checkRecipe(tabId, cost)) {
                let item, a;
                for (let key in this.cube) {
                    let item2 = this.cube[key];
                    if (item2.type !== 'oil') {
                        item = item2;
                        a = key;
                        break;
                    }
                }

                let fuelValue = 0;
                for (let key in this.cube) {
                    if (a === key) continue;
                    let item2 = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item2, key)
                        continue;
                    }

                    num++;
                    fuelValue += item2.fuelValue;
                    if (item2.type === 'light' && (item2.mod !== MOD_NORMAL || item2.embeddedList.length)) {
                        item2.fuelValue = 0;
                        item2.calcFuelLvl();
                        this.packAdd(item2);
                    }
                }
                
                item.fuelValue += fuelValue;
                if (item.fuelValue > item.fuelMax) item.fuelValue = item.fuelMax;
                item.calcFuelLvl();
                this.packAdd(item);
                name = item.getName()
            }
        } else if (l === book + scroll) {
            let tabId = RECIPE_CHARGE_BOOK;
            cost = recipes.get(tabId).cost;
            if (l > 1 && book && this.checkRecipe(tabId, cost)) {
                let book, scroll, blankBook, nameSkill, bookKey, scrollKey;
                let count = 0;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.type === 'book') {
                        if (item.tabId === B_BLANK_PAPER) blankBook = true;
                        if (!book || item.charges > book.charges) {
                            book = item;
                            bookKey = key;
                        }
                    } else if (item.type === 'scroll') {
                        scroll = item;
                        scrollKey = key;
                    }

                    if (item.chargeBook || item.type === 'scroll') {
                        if (!nameSkill) {
                            nameSkill = item.nameSkill;
                            count++;
                        } else if (nameSkill === item.nameSkill) {
                            count++;
                        }
                    }
                }

                if (l === 2 && blankBook && scroll) {
                    book.chargeBook = true;
                    book.charges = 0;
                    book.name['a'] = book.nameReal['a'] = scroll.nameReal['a'];
                    book.name['b'] = book.nameReal['b'] = scroll.nameReal['b'];
                    book.nameSkill = scroll.nameSkill;
                    book.skillLvl = scroll.skillLvl;
                    book.tabId = 100 + scroll.tabId;
                    let obj = this.chargeItem(book, scroll, cost, num);
                    if (obj.return) this.returnItem(scroll, scrollKey);
                    if (obj.charges) num += obj.charges;
                    this.packAdd(book);
                    name = book.getName()
                } else if (l > 1 && book && l === count && book.charges < MAX_CHARGE_NUM) {
                    for (let key in this.cube) {
                        if (key === bookKey) continue;
                        let item = this.cube[key];
                        let obj = this.chargeItem(book, item, cost, num);
                        if (obj.return) this.returnItem(item, key);
                        if (obj.charges) num += obj.charges;
                    }
                    
                    this.packAdd(book);
                    name = book.getName();
                }
            }
        } else if (embeddable === 1 && embedded && l === embeddable + embedded) {
            let tabId = RECIPE_EMBED;
            cost = recipes.get(tabId).cost;
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            if (embedded <= item.embeddedMax - item.embeddedNum && this.checkRecipe(tabId, cost)) {
                let found = true;
                for (let key in this.cube) {
                    let item2 = this.cube[key];
                    if (item2.equipable) continue;
                    if (item2.type === 'material' && item2.material !== item.material ||
                    item2.modParts && !item2.modParts[item.type]) {
                        found = false;
                        break;
                    }
                }
                
                if (found) {
                    let weight = 0;
                    for (let key in this.cube) {
                        let item2 = this.cube[key];
                        if (item2.equipable) continue;
                        if (mp < cost * (num + 1)) {
                            this.returnItem(item2, key)
                            continue;
                        }

                        num++;
                        let objMod = item2.modParts ? item2.modParts[item.type] : item2.modList;
                        mergeMod({
                            obj: item,
                            obj2: objMod,
                            fixed: true,
                        });
                        
                        weight += item2.weight;
                        item.embeddedNum++;
                        item.embeddedList.push(item2);
                    }

                    item.calcDurab();
                    item.weight = Math.round((item.weight + weight) * 100) / 100;
                    if (item.weapon) {
                        item.calcDmgOne();
                    } else if (item.armor) {
                        item.calcAcOne();
                    }
                    
                    this.packAdd(item);
                    name = item.getName();
                }
            }
		} else if (removable && l === 1) {
            let tabId = RECIPE_REMOVE;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item = this.cube['a'];
            if (!item.cursed && this.checkRecipe(tabId, cost)) {
                let weight = 0;
                for (let itemEmbedded of item.embeddedList) {
                    let objMod = itemEmbedded.modParts ? itemEmbedded.modParts[item.type] : itemEmbedded.modList;
                    mergeMod({
                        obj: item,
                        obj2: objMod,
                        fixed: true,
                        remove: true,
                    });
                    
                    weight -= itemEmbedded.weight;
                    this.packAdd(itemEmbedded);
                }

                item.embeddedNum = 0;
                item.embeddedList = [];
                item.weight = Math.round((item.weight + weight) * 100) / 100;
                item.calcDurab();
                if (item.weapon) {
                    item.calcDmgOne();
                } else if (item.armor) {
                    item.calcAcOne();
                }
                
                this.packAdd(item);
                msg = option.isEnglish() ?
                    'Removed materials' :
                    '素材を取り除いた';
            }
        } else if (l === 3 && unembeddable && gem && orb ) {
            let tabId = RECIPE_EXTEND;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                    break;
                }
            }

            if (item.mod === MOD_NORMAL && this.checkRecipe(tabId, cost)) {
                item.embeddedMax = rndIntBet(1, item.embeddedLimit);
                this.packAdd(item);
                name = item.getName();
            }
        } else if (l === 4 && unembeddable && gem && orb && material) {
            let tabId = RECIPE_MATERIALIZE;
            cost = recipes.get(tabId).cost;
            num = 1;
            let item, mat;
            for (let key in this.cube) {
                let item2 = this.cube[key];
                if (item2.equipable) {
                    item = item2;
                } else if (item2.type === 'material') {
                    mat = item2;
                }

                if (item && mat) break;
            }

            if ((item.mod === MOD_MAGIC || item.mod === MOD_RARE) && item.material === mat.material && this.checkRecipe(tabId, cost)) {
                item = item.makeMaterial();
                this.packAdd(item);
                name = item.getName();
            }
        }
		
        if (name || msg) {
            this.cube = {};
            this.cubeIndex = {};
            if (!msg) {
                msg = option.isEnglish() ?
                    `Synthesized ${name}` :
                    `${name}を合成した`;
            }

            message.draw(msg);
            this.mp -= cost * num;
        } else {
            this.returnCubeItem()
            message.draw(message.get(M_NOTHING_HAPPENED));
		}
		
        inventory.clear();
        flag.synthesize = false;
        flag.regular = true;
        rogue.done = true;
    }

    checkRecipe(tabId, cost) {
        return this.recipes[tabId] && this.mp >= cost;
    }

    chargeItem(item, item2, cost, num) {
        let obj = {};
        if (this.mp <= cost * num || item.charges >= MAX_CHARGE_NUM) {
            obj.return = true;
            return obj;
        }

        let charges = item2.type === 'scroll' ? item2.quantity : item2.charges;
        let mpLimit = Math.floor(this.mp / cost) - num;
        let chargesLimit = MAX_CHARGE_NUM - item.charges;
        if (chargesLimit > mpLimit) chargesLimit = mpLimit;
        if (charges > chargesLimit) {
            charges = chargesLimit;
            obj.return = true;
            if (item2.type === 'scroll') {
                item2.quantity -= charges;
            } else {
                item2.charges -= charges;
            }
        }

        item.charges += charges;
        obj.charges = charges
        return obj;
    }


    returnCubeItem() {
        for (let key in this.cube) {
			this.returnItem(this.cube[key], key);
		}

        this.cube = {};
        this.cubeIndex = {};
    }

    returnItem(item, a) {
        switch (item.place) {
            case PLACE_PACK:
                this.packAdd(item);
                break;
            case PLACE_BOX:
                this.boxAdd(item, this.cubeIndex[a]);
                break;
            case PLACE_FLOOR:
                item.putDown(this.x, this.y, true);
                break;
        }
    }

    packOrUnpack(key) {
        if (flag.pack !== PLACE_PACK) {
            if (this.switchInventory(key, M_PACK_OR_UNPACK) || input.isShift) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.place === PLACE_BOX) {
                item = this.inventoryOut(item, item.quantity);
                if (!this.packAdd(item)) item.dropped();
            } else {
                this.ci = item;
                flag.pack = PLACE_PACK;
                if (Object.keys(this.boxes).length === 1) {
                    this.packOrUnpack('1');
				} else {
					message.draw(message.get(M_PACK_INTO), true);
				}

                return;
            }
        } else {
            let a = getNumber(key);
            if (!a || this.boxes[a] === undefined) return;
            let item = this.inventoryOut(this.ci, this.ci.quantity);
            this.ci = null;
            this.boxAdd(item, a);
            flag.pack = true;
		}
		
        inventory.clear();
        let msg = message.get(M_PACK_OR_UNPACK) + message.get(flag.floor ? M_PACK : M_FLOOR);
        this.showInventory(flag.floor ? PLACE_FLOOR : PLACE_PACK);
        this.showInventory(PLACE_BOX);
        message.draw(msg, true);
    }

    useBoxItem(key) {
        let item = this.boxes[key];
        if (!item) return;
        if (item.type === 'potion') {
            this.quaffPotion(null, item);
		} else if (item.type === 'scroll' || item.chargeBook) {
            if (this.canRead(item.chargeBook)) this.read(null, item);
        } else if (item.type === 'food') {
            this.eat(null, item);
		} else if (item.type === 'wand') {
            this.zap(null, item);
        } else if (item.type === 'light' || item.type === 'oil') {
            if (this.equipment['light']) this.fuel(null, item);
        } else if (item.type === 'ammo') {
            if (this.equipment['main'] &&
                this.equipment['main'].throwType === item.throwType) {
				this.autoAim(item);
			}
        }
    }

    autoAim(ammo) {
        let x, y;
        if (this.ce) {
            [x, y] = [this.ce.x, this.ce.y];
            if (!this.litMapIds[x + ',' + y] && (!this.ce.detected ||
                distanceSq(x, y, this.x, this.y) > FOV_SQ) ||
                !lineOfSight(this.x, this.y, x, y)) {
				return;
			}
        } else {
            this.searchCe();
            if (!this.ce) return;
            [x, y] = [this.ce.x, this.ce.y];
		}
		
        this.ci = ammo;
        flag.arrow = true;
        this.getShootMsg(ammo);
        this.aim({
            x1: x,
            y1: y,
        });
    }

    examine(key) {
        let loc = map.coords[cursor.x][cursor.y];
		if (key === 'x') {
            if (loc.item['a'] && this.litMapIds[cursor.x + ',' + cursor.y] &&
                distanceSq(cursor.x, cursor.y, this.x, this.y) <= FOV_SQ &&
                lineOfSight(this.x, this.y, cursor.x, cursor.y)) {
                flag.floor = true;
                flag.clearInv = true;
                inventory.show({
                    list: loc.item,
                    dr: DR_RIGHT,
                    place: PLACE_FLOOR
                })
			}
        } else if (key === 'c' || key === 'm' || key === 'e' || key === 'i') {
            let fighter = loc.fighter;
            if (fighter && fighter.isShowing() &&
                (fighter.id === ID_ROGUE || !rogue.hallucinated)) {
                if (fighter.mimic && !fighter.identified && !rogue.isWizard) return;
                if (key === 'c') {
                    flag.character = true;
                    investigation.main(fighter ,DR_MIDDLE, true);
                    Vue.nextTick(function(){
                        investigation.scroll(null, true);
                    });
				} else {
                    if (key === 'm') {
                        fighter.showSkill(fighter.skill);
                    } else if (key === 'e' && this.isWizard) {
                        fighter.equipmentList();
                    } else if (key === 'i' && this.isWizard) {
                        fighter.showInventory(PLACE_PACK);
                    }

                    flag.clearInv = true;
                }
			}
        } else if (key === 't' || key === 'r') { //t
            if (flag.wormhole) {
                if (key === 'r') {
                    flag.wormhole = false;
				} else {
                    this.wormhole(cursor.x, cursor.y);
                    return;
                }
			}
			
            if (key === 'r') {
                this.ce = null;
			} else if (loc.fighter && loc.fighter.id !== ID_ROGUE && loc.fighter.isShowing()) {
                this.ce = loc.fighter;
            } else if (!flag.aim) {
                loc.getInfo();
                return;
			}
			
            if (flag.aim && key === 't') {
                if (flag.skill || flag.scroll) {
                    let nameSkill = flag.skill ? this.cs.id : this.ci.nameSkill;
                    if (skillMap.get(nameSkill).range === 0) [cursor.x, cursor.y] = [this.x, this.y];
				}
				
                this.aim({
                    x1: cursor.x,
                    y1: cursor.y,
                });
			}
			
            this.cancelCommand();
		} else {
            cursor.move(key);
        }
    }

    examinePlot(init) {
        cursor.clearAll();
        let [x, y] = init ? [this.x, this.y] : [cursor.x, cursor.y];
        let color = colorList.white;
        let skill;
        if (flag.zap) {
            if (this.ci.identified || itemTab[this.ci.type].get(this.ci.tabId).identified) { //
                skill = skillMap.get(this.ci.nameSkill);
                color = skill.color;
            }
        } else if (flag.skill || flag.scroll) {
            skill = skillMap.get(flag.skill ? this.cs.id : this.ci.nameSkill);
            color = skill.color;
            if (skill.range === 0) [x, y] = [this.x, this.y];
		}
        
        lineOfSight(this.x, this.y, x, y, color, skill);
        if (init) map.draw(x, y, true);
    }

    examineMsg() {
        let msg = message.get(M_EXAMINE);
        if (this.isWizard) msg += message.get(M_EXAMINE_W);
        message.draw(msg + ` (${cursor.x},${cursor.y})`, true);
    }

    cancelCommand() {
        if (flag.synthesize) {
            this.returnCubeItem();
		} else if (flag.aim || flag.examine) {
            cursor.clearAll();
            map.draw();
            this.checkCe();
        } else if (flag.minimap) {
            map.drawObjectAll();
            map.draw();
        }

        inventory.clear();
        initFlag();
        this.ci = null;
    }

    assginSkills(key) {
        let isFuncKey = /^F\d/.test(key);
        if (flag.assign === 1) {
            if (key === 'M' || isFuncKey) {
                let i = key === 'M' ? 0 : key.replace('F', '');
                if (!this.keysList[i]) return;
                this.keysList[i] = null;
                inventory.clear();
                this.showSkill(this.skill);
                this.showSkill(this.keysList, true);
                message.draw(message.get(M_ASSIGN_SKILL), true);
            } else {
                let a = getAlphabet(key);
                if (!a || !this.skill[a]) return;
                flag.assign = 2;
                this.ca = a;
                message.draw(message.get(M_ASSIGN_SKILL2), true);
            }
        } else {
            if (key !== 'M' && !isFuncKey) return;
            let i = key === 'M' ? 0 : key.replace('F', '');
            this.keysList[i] = this.skill[this.ca].id;
            flag.assign = 1;
            inventory.clear();
            this.showSkill(this.skill);
            this.showSkill(this.keysList, true);
            message.draw(message.get(M_ASSIGN_SKILL), true);
        }
    }

    gainStatOrSkill(key) {
        if (flag.gain === 1 && !flag.number) {
            let gainStat = input.isShift;
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            if (gainStat && !statistics.list[a] || !gainStat && !this.pack[a]) return;
            if (gainStat) {
                if (!this.statPoints) {
                    message.draw(message.get(M_CANT_GAIN_STAT));
                    return;
                } else if (this[statistics.list[a].term + 'Max'] >= MAX_STAT_LVL) {
                    let name = statistics.list[a].name[option.getLanguage()];
                    message.draw(option.isEnglish() ?
                        `You can't gain ${name} anymore` :
                        `これ以上${name}を取得が出来ない`);
                    return;
                }
            } else if (this.pack[a].type !== 'book' || !this.pack[a].skill || !this.canRead(true)) {
                return;
            }
			
            this.ca = a;
            inventory.clear();
            if (gainStat) {
                inventory.showStats(this, a);
                flag.gain = 3;
                flag.number = true;
                this.inputNumber();
            } else {
                this.showSkill(this.pack[a].list);
                flag.gain = 2;
                message.draw(message.get(M_GAIN_SKILL), true);
            }
        } else if (flag.gain === 2 && !flag.number) { //skill
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            let id = this.pack[this.ca].list[a];
            if (!id) return;
            let skill = skillMap.get(id);
            if (input.isShift) {
                investigation.skill(this, skill);
                return;
			}
			
            let keySkill = this.searchSkill(id);

            //TODO
            let lvl = keySkill ? this.skill[keySkill].lvl : 0;
            if (this.lvl < skill.reqLvl + lvl ||
                skill.reqSynerzy && skill.reqSynerzy > this.getSynerzy(skill)) {
				return;
			}

            if (!this.skillPoints ||
                !keySkill && Object.keys(this.skill).length >= MAX_SKILL_NUM) {
                message.draw(message.get(M_CANT_GAIN_SKILL));
                return;
            } else if (keySkill && lvl === MAX_SKILL_LVL) {
                let nameSkill = skill.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't study ${nameSkill} anymore` :
                    `これ以上${nameSkill}の知識を得られない`);
                return;
			}
			
            this.cs = id;
            flag.number = true;
            inventory.clear();
            this.showSkill(this.pack[this.ca].list);
            this.inputNumber();
        } else {
            if (flag.gain === 2) { //skill
                let skill = skillMap.get(this.cs);
                let key = this.searchSkill(this.cs);
                let lvl = key ? this.skill[key].lvl : 0;
                let gainLvl = this.lvl - (lvl + skill.reqLvl) + 1;
                if (MAX_SKILL_LVL < lvl + gainLvl) gainLvl = MAX_SKILL_LVL - lvl;
                let point = this.skillPoints >= gainLvl ? gainLvl : this.skillPoints;
                let i = this.cn;
                if (i > point) i = point;
                let name = skill.name[option.getLanguage()];
                if (!key) { //new skill
                    key = eaList[Object.keys(this.skill).length];
                    this.skill[key] = {}
                    this.skill[key].id = this.cs;
                    this.skill[key].lvl = 0;
                    message.draw(option.isEnglish() ?
                        `You gained ${name}` :
                        `${name}を習得した`);
                } else {
                    message.draw(option.isEnglish() ?
                        `You studied ${name} deeply` :
                        `${name}の知識を深めた`);
				}
                
                this.skillPoints -= i;
                this.skill[key].lvl += i;
                this.gainSynerzy(skill, i);
            } else if (flag.gain === 3) { //stat
                let stat = statistics.list[this.ca];
                let nameMax = stat.term + 'Max';
                let lvl = MAX_STAT_LVL - this[nameMax];
                let point = this.statPoints >= lvl ? lvl : this.statPoints;
                let i = this.cn;
                if (i > point) i = point;
                let name = stat.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You gained ${name}` :
                    `${name}を得た`);
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

    castSkill(key) {
        if (input.isCtrl && key === 's' && Object.keys(this.skill).length >= 2) {
            flag.skill = false;
            flag.sortSkill = 1;
            inventory.clear();
            this.showSkill(this.skill);
            message.draw(message.get(M_SORT_SKILL), true);
            return;
		}
		
        let a = getAlphabet(key);
        a = a.toLowerCase();
        if (!a || !this.skill[a]) return;
        let skill = skillMap.get(this.skill[a].id);
        if (input.isShift) {
            inventory.clear();
            this.showSkill(this.skill);
            investigation.skill(this, skill);
            flag.skill = true;
            message.draw(message.get(M_CAST), true);
            return;
		}
		
        if (!this.checkToCast(skill)) return;
        inventory.clear();
        this.cs = this.skill[a];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
        } else {
            flag.aim = true;
            message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
            this.examinePlot(true);
            return;
		}
		
        flag.skill = false;
        rogue.done = true;
        flag.regular = true;
    }

    castAssignedSkill(key, keyDr) {
        let i = key === 'M' ? 0 : key.replace('F', '');
        if (!this.keysList[i] || !this.checkToCast()) return;
        let id = this.keysList[i];
        let skill = skillMap.get(id);
        if (!this.checkToCast(skill)) return;
        flag.skill = true;
        this.cs = this.skill[this.searchSkill(id)];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
            rogue.done = true;
            flag.skill = false;
        } else if (skill.range === 0) {
            this.aim({
                x1: this.x,
                y1: this.y,
                nameSkill: id,
            });
        } else if (key === 'M') {
            this.aim({
                key: keyDr,
                nameSkill: id,
            });
        } else if (skill.wall) {
            input.switchFlag();
            flag.aim = true;
            message.draw(message.get(M_CAST_DIR) + message.get(M_TO_EXAMINE), true);
            this.examinePlot(true);
        } else {
            let x, y;
            if (this.ce) {
                [x, y] = [this.ce.x, this.ce.y];
                if (!this.litMapIds[x + ',' + y] && (!this.ce.detected ||
                    distanceSq(x, y, this.x, this.y) > FOV_SQ) ||
                    !lineOfSight(this.x, this.y, x, y)) {
                    flag.skill = false;
                    return;
                }
            } else {
                this.searchCe();
                if (!this.ce) {
                    flag.skill = false;
                    return;
                } else {
					[x, y] = [this.ce.x, this.ce.y];
				}
			}
			
            this.aim({
                x1: x,
                y1: y,
                nameSkill: id,
            });
        }
    }

    sortSkill(key) {
        if (flag.sortSkill === 1) {
            this.ca = getAlphabet(key);
            if (!this.ca || !this.skill[this.ca]) return
            flag.sortSkill = 2;
            message.draw(message.get(M_SORT_SKILL2), true);
        } else {
            let a = getAlphabet(key);
            if (!a || !this.skill[a] || a === this.ca) return;
            [this.skill[a], this.skill[this.ca]] = [this.skill[this.ca], this.skill[a]];
            inventory.clear();
            this.showSkill(this.skill);
            flag.sortSkill = 1;
            message.draw(message.get(M_SORT_SKILL), true);
        }
    }

    getItem(a, floor) {
        let item;
        if (isFinite(a)) {
            item = this.boxes[a];
		} else if (floor) {
            item = map.coords[this.x][this.y].item[a];
        } else if (input.isShift) {
            item = this.equipment[bpList[a]];
		} else {
			item = this.pack[a];
		}

        return item;
    }

    switchInventory(key, id, equipment) {
        if (key !== ',' && key !== '.') return false;
        inventory.clear();
        let msg = message.get(id);
        if (flag.synthesize || flag.pack) this.showInventory(flag.pack ? PLACE_BOX : PLACE_CUBE);
        if (key === ',') {
            flag.floor = false;
            if (equipment) this.equipmentList();
            msg += message.get(M_FLOOR);
            this.showInventory(PLACE_PACK);
        } else if (key === '.') {
            flag.floor = true;
            msg += message.get(M_PACK);
            this.showInventory(PLACE_FLOOR);
		}
		
        message.draw(msg, true);
        return true;
    }

    destroy(key) {
        if (!flag.number) {
            if (this.switchInventory(key, M_DESTROY, true)) return;
            let a = getAlphabetOrNumber(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.indestructible || item.cursed && input.isShift && flag.floor) {
                message.draw(message.get(M_CANT_DESTROY));
                return;
			}
			
            inventory.clear();
            flag.number = true;
            flag.floor = false;
            this.showInventory(item.place, a);
            this.inputNumber();
            this.ci = item;
        } else {
            let item = this.ci;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            this.deleteItem(item, i);
            let name = item.getName(false, i)
            message.draw(option.isEnglish() ?
                `Destroyed ${name}` :
                `${name}を破壊した`);
            inventory.clear();
            flag.destroy = false;
            flag.regular = true;
            rogue.done = true;
        }
    }

    shop(key, isAlt) {
        let shop = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            let buy = input.isShift;
            let a = getAlphabet(key);
            if (!a) return;
            a = a.toLowerCase();
            let item = buy ? shop.list[a] : this.pack[a];
            if (!item) return;
            if (isAlt) {
                if (flag.gamble && buy) return;
                let place = buy ? PLACE_SHOP : PLACE_PACK;
                let direction = buy ? DR_RIGHT : DR_LEFT;
                this.investigate(null, item, place, direction);
                return;
            }

            if (!buy && Object.keys(shop.list).length === MAX_PACK_COUNT) {
                message.draw(message.get(M_CANT_SELL));
                return;
            } else if (buy && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ca = a;
            this.ci = item;
            inventory.clear();
            flag.number = true;
            this.showInventory(item.place, a);
            this.inputNumber();
        } else {
            let item = this.ci;
            this.ci = null;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            let amount = item.price * i;
            if (item.place === PLACE_PACK) {
                item = this.inventoryOut(item, i);
                let l = Object.keys(shop.list).length;
                shop.list[eaList[l]] = item;
                item.place = PLACE_SHOP;
                this.purse += amount;
                if (!item.identified) {
                    item.identified = true;
                    item.changeNameAndPrice();
				}
				
                item.price *= 2;
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Sold ${name} for $${amount}` :
                    `${name}を$${amount}で売却した`);
                audio.playSound('coin');
            } else if (this.purse < amount) {
                message.draw(message.get(M_DONT_HAVE_MONEY));
			} else {
                item = item.split(i, shop.list);
                item.changeNameAndPrice();
                this.packAdd(item);
                this.purse -= amount;
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Bought ${name} for $${amount}` :
                    `${name}を$${amount}で購入した`);
                audio.playSound('grab');
			}
			
            flag.number = false;
            inventory.clear();
            this.cn = 1;
            let msg = message.get(M_SHOP);
            msg = shop.name[option.getLanguage()] + msg;
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_SHOP);
            message.draw(msg, true);
        }
    }

    stash(key, isAlt) {
        let stash = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            if (key === '<' || key === '>') {
                if (key === '>' && stash.page < MAX_STASH_PAGE) {
                    stash.page++;
				} else if (key === '<' && stash.page > 1) {
					stash.page--;
				}

                inventory.clear();
                let msg = message.get(M_STASH)
                this.showInventory(PLACE_PACK);
                this.showInventory(PLACE_STASH);
                message.draw(msg, true);
                return;
			}
			
            let a, item;
            if (input.isShift) {
                if (!getAlphabet(key)) return;
                let num = eaList.indexOf(key.toLowerCase());
                if (num >= MAX_PACK_COUNT) return;
                a = num + (stash.page - 1) * MAX_PACK_COUNT;
                item = stash.list[a];
            } else {
                a = getAlphabetOrNumber(key);
                if (!a) return;
                a = a.toLowerCase();
                item = this.getItem(a);
			}
			
            if (!item) return;
            if (isAlt) {
                let place = input.isShift ? PLACE_STASH : PLACE_PACK;
                let direction = input.isShift ? DR_RIGHT : DR_LEFT;
                this.investigate(null, item, place, direction);
                return;
            }

            if (!input.isShift && Object.keys(stash.list).length === MAX_STASH_COUNT &&
                !this.canCarryItem(stash.list, item)) {
                message.draw(message.get(M_CANT_ADD));
                return;
            } else if (input.isShift && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ci = item;
            flag.number = true;
            if (item.quantity === 1) {
                this.cn = 1;
                this.stash();
            } else {
                this.ca = a;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
            }
        } else {
            let item = this.ci;
            this.ci = null;
            let i = this.cn;
            if (i > item.quantity) i = item.quantity;
            if (item.place === PLACE_STASH) {
                item = item.split(i, stash.list);
                this.packAdd(item);
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Take out ${name}` :
                    `${name}を持物に加えた`);
            } else {
                item = this.inventoryOut(item, i);
                let num = this.stashAdd(stash.list, item);
                stash.page = Math.ceil((Number(num) + 1) / MAX_PACK_COUNT);
                let name = item.getName();
                message.draw(option.isEnglish() ?
                    `Stored ${name}` :
                    `${name}を保管した`);
			}
			
            flag.number = false;
            inventory.clear();
            let msg = message.get(M_STASH);
            this.showInventory(PLACE_PACK);
            this.showInventory(PLACE_STASH);
            message.draw(msg, true);
        }
    }

    cureShop(key) {
        let cure = map.coords[this.x][this.y].enter;
        let a = getAlphabet(key);
        if (!a || !cure.list[a]) return;
        let cost = cure.list[a].cost;
        if (cost > this.purse) {
            message.draw(message.get(M_DONT_HAVE_MONEY));
            return;
		}
		
        this.purse -= cost;
        let name = cure.list[a][LETTER_ENG];
        if (name === 'recover completely') {
            this.recovery();
            // message.draw(message.get(M_RECOVER_ALL));
        } else if (name === 'restore health and mana') {
            this.hp = this.hpMax;
            this.mp = this.mpMax;
        } else if (name === 'restore stats') {
            this.haveCast(RESTORE_ALL, 10, this);
		} else if (name === 'restore condition') {
            this.haveCast(CURE_ALL, 10, this);
        } else if (name === 'have a meal') {
			this.hunger = MAX_HUNGER;
		}

        flag.cure = false;
        flag.regular = true;
        inventory.clear();
    }

    revive() {
        this.recovery();
        flag.died = false;
        flag.regular = true;
        rogue.cdl = 0;
        game.clearLevel();
        creation.town();
    }

    recovery() {
        this.haveCast(RESTORE_ALL, 10, this);
        this.haveCast(CURE_ALL, 10, this);
        this.hunger = MAX_HUNGER;
        this.hp = this.hpMax;
        this.mp = this.mpMax;
    }

    trapped(trap, stepOn) {
        if (flag.dash) flag.dash = false;
        let loc = map.coords[this.x][this.y];
        if (loc.hidden) loc.hidden = false;
        if (coinToss()) loc.deleteTrap();
        if (trap.nameSkill) {
            this.haveCast(trap.nameSkill, trap.lvl, this);
            return;
		}
		
        let name = trap.name[LETTER_ENG];
        if (name === 'Trap Door') {
            if (this.levi && !stepOn) {
                message.draw(message.get(M_FLOAT));
			} else if (rogue.cdl !== 33 || this.inferno) {
				this.downOrUpStairs(null, true);
			}
        } else if (name === 'Bear Trap') {
            this.stuckTrap = rndIntBet(4, 6);
        } else if (name === 'Arrow Trap') {
            let dmg = rndIntBet(4, 6);
            this.hp -= dmg;
            message.draw(option.isEnglish() ?
                `An arrow hits you by ${dmg}` :
                `矢はあなたに${dmg}のダメージを与えた`);
            if (this.hp <= 0) this.died();
        }
    }

    healAndHunger() {
        let light = this.equipment['light'];
        if (light && light.fuelValue && light.durab) {
            if (--light.fuelValue === 0) {
                this.lighten -= light.lighten;
                this.lightenOrDarken('Lighten');
                message.draw(message.get(M_LIGHT_GONE));
            }

            light.calcFuelLvl();
		}
		
        if (this.hunger > 0) {
            this.heal();
            let cost = Math.floor((this.hpReg + this.mpReg - this.digest) / 10);
            let hunTemp = this.hunger;
            if (cost > 0) {
                this.hunger -= cost;
                if (this.hunger < 0) this.hunger = 0;
            } else if (rogue.turn % (-cost + 1) === 0) {
                this.hunger--;
            }

            if (hunTemp > 200 && this.hunger <= 200) audio.playSound('hungry');
            if (!this.hunger) message.draw(message.get(M_STARVED));
        } else {
            this.hp--;
            if (this.hp <= 0) this.died();
		}
		
        if (!this.hunger && (flag.dash || flag.rest)) flag.dash = flag.rest = false;
        this.checkCe();
        this.calcCondition();
    }

    inputNumber(key) {
        if (!key) {
            this.cn = 1;
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return
        }
        
        let num = getNumber(key);
        let all = key === 'a';
        let isEnter = key === 'Enter';
        let isBackspace = key === 'Backspace';
		if (!num && !all && !isEnter && !isBackspace) return;
        if (num === '0' && (this.cn === '' || this.cn === 1) || isEnter && this.cn === '') return;
		if (isBackspace || num) {
            if (this.cn === 1) this.cn = '';
            if (isBackspace) {
                this.cn = this.cn.substr(0, this.cn.length - 1);
			} else {
				this.cn += num;
            }
            
            if (flag.shop) {
                inventory.clear();
                this.showInventory(this.ci.place, this.ca);
			}
			
            let msg = message.get(M_NUMBER) + this.cn;
            message.draw(msg, true);
            return;
        }
        
        this.cn = all ? Infinity : Number(this.cn);
        if (flag.drop) {
            this.drop();
		} else if (flag.gain) {
            this.gainStatOrSkill();
        } else if (flag.destroy) {
            this.destroy();
		} else if (flag.shop) {
            this.shop();
        } else if (flag.stash) {
			this.stash();
		}

        flag.number = false;
    }

    checkUnique() {
        this.checkUniqueLoop(map.itemList);
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            this.checkUniqueLoop(enemy.pack);
            this.checkUniqueLoop(enemy.equipment);
            this.checkUniqueLoop(enemy.side);
            this.checkUniqueLoop(enemy.boxes);
            if (enemy.mod === MOD_UNIQUE) delete this.cue[enemy.name[LETTER_ENG]];
        }
    }

    checkUniqueLoop(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            if (item.mod === MOD_UNIQUE && !item.identified) {
                let id = item.type + ',' + item.tabId + ',' + item.uniqueId;
                if (this.cui[id]) delete this.cui[id];
            } else if (item.lethe) {
				this.lethe--;
			}
        }
    }

    checkItem(item, type) {
        let found = this.checkItemLoop(this.boxes, item, type);
        // if(!found) found = this.checkItemLoop(this.pack,item,type);
        return found;
    }

    checkItemLoop(list, item, type) {
        for (let key in list) {
            let item2 = list[key];
            if (!item2) continue;
            if (type === CHARGE && (item.type === 'wand' && item2.type === 'wand' ||
            (item.type === 'scroll' || item.chargeBook) && item2.chargeBook) &&
            item2.nameSkill === item.nameSkill && item2.charges < MAX_CHARGE_NUM) {
                if (item2.quantity > 1) continue;
                if (item.charges && item.charges > item2.charges) {
                    [item.charges, item2.charges] = [item2.charges, item.charges];
                }

                let obj2 = {};
                let cost = itemTab['recipe'].get(item2.chargeBook ? RECIPE_CHARGE_BOOK : RECIPE_WAND).cost;
                let obj = this.chargeItem(item2, item, cost, 0);
                obj2.delete = !obj.return;
                if (obj.charges) this.mp -= obj.charges;
                obj2.item = item2;
                return obj2;
            } else if (type === IDENTIFY && item2.nameSkill === IDENTIFY &&
                (!item2.chargeBook || item2.charges)) {
                this.ci = item2;
                flag.scroll = true;
                this.identify(null, item);
                return;
            }
		}
		
        return false;
    }

    checkCe() {
        statistics.clearEnemyBar();
        if (!this.ce) return;
        if (!this.ce.isShowing()) {
            statistics.clearEnemyBar();
            this.ce = null;
        } else {
			statistics.drawEnemyBar(this.ce);
        }
    }

    getCe(fighter, melee) {
        if (fighter.id !== ID_ROGUE && (melee || !this.ce) && fighter.isShowing()) this.ce = fighter;
    }

    getName(subject, proper) {
        let name;
        if (proper) {
            name = this.name[option.getLanguage()];
		} else if (option.isEnglish()) {
            name = subject ? 'You' : 'you'
        } else {
			name = subject ? '' : 'あなた';
		}

        return name;
    }

    isOpponent(fighter) {
        return fighter.id !== ID_ROGUE;
    }

    isShowing() {
        return !this.invisible;
    }

    removeCe() {
        this.ce = null;
        statistics.clearEnemyBar();
    }

    goBlind(clear) {
        map.drawObjectAll();
        map.draw();
        if (!clear) this.removeCe();
    }
}
const Enemy = class extends Fighter {
    constructor(obj) {
        super(obj)
        this.sensing = SENSING_SQ;
        this.type = 'enemy';
        this.ce = rogue;
    }

    gainStats() {
        for (let i = 0; i < 5; i++ ) {
            switch (this.grow && coinToss() ? this.grow : rndInt(3)) {
                case STAT_STR:
                    this.str = ++this.strMax;
                    break;
                case STAT_DEX:
                    this.dex = ++this.dexMax;
                    break;
                case STAT_CON:
                    this.con = ++this.conMax;
                    break;
                case STAT_INT:
                    this.int = ++this.intMax;
                    break;
            }
        }
    }

    init(position, x, y, summon, magic, bias, lvl) {
        if (this.mod !== MOD_UNIQUE && lvl > this.lvl) {
            let boost = rndInt(lvl - this.lvl);
            for (let i = 0; i < boost; i++) {
				this.gainStats();
			}

            this.lvlMax = this.lvl = this.lvl + boost;
		}
		
        this.skillPoints = this.lvl - 1;
        this.exp = this.expMax = calcLevel(this.lvl);
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        if (this.piece) this.getMaterial();
        if (this.mod === MOD_UNIQUE) {
            this.getUnique();
        } else if (this.mod !== MOD_NORMAL || magic ||
            this.material === M_GEM || Material.evalMod(MOD_MAGIC, rogue.mf)) {
            if (this.bias) bias = this.bias;
            if (this.mod === MOD_RARE || Material.evalMod(MOD_RARE, rogue.mf)) {
                this.getRare(bias);
			} else {
				this.getMagic(bias);
			}
		}
		
        if (evalPercentage(10)) this.dropNum++;
        if (this.mf) this.dropNum += Math.ceil(this.mf / 30);
        // this.calcDmgOne();
        this.gainSynerzyAll();
        if (this.starter) this.getStarterItems();
        if (this.mod !== MOD_NORMAL) this.getOrLooseStats(modBonusMap.get(this.mod), true);
        this.calcAll();
        this.sleeping = this.awake || this.aggravating || summon ? 0 : DEFAULT;
        if (this.mimic) hallucinate.one(this, false, true);
        if (this.dropNum) {
            this.createItemIntoPack({
                times: this.dropNum,
                magic: this.mf || this.mod === MOD_UNIQUE,
                lvl: this.lvl,
            });
        }

        if (this.gf) {
            this.createItemIntoPack({
                times: rndIntBet(1, Math.ceil(this.gf / 40)),
                type: 'coin',
                tabId: C_COIN,
            });
        }

        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = COST_REGULAR * (summon ? -1 : this.spd / 100);
        super.init(position, x, y);
    }

    putDown(x, y) {
        do {
			 this.id = Math.random();
		} while (map.enemyList[this.id]);

        this.spiralSearch(x, y, 'fighter');
        if (this.abort) return;
        map.enemyList[this.id] = this;
        map.queue.push(this);
        if (rogue.hallucinated) hallucinate.one(this, true);
        this.drawOrErase(true);
    }

    act() {
        let dr = null;
        if (this.calcCondition() === null) return;
        this.heal()
        if (!this.ce) {
            if (this.hallucinated) this.searchCe();
            if (!this.ce) this.ce = rogue;
		}
		
        let l = distanceSq(this.x, this.y, this.ce.x, this.ce.y);
        if (this.paralyzed || this.sleeping) {
            if (this.sleeping < 0 && l <= FOV_SQ && (this.ce.aggravating || this.probWakeUp(l))) {
                this.wakeUp();
			} else {
                this.decreaseEnergy();
            }

            return;
		}
		
        let los = l <= FOV_SQ ? lineOfSight(this.x, this.y, this.ce.x, this.ce.y) : false;
        if (this.blinded || this.confused || this.moveRnd && coinToss()) {
            dr = this.getDirection(los, undefined, true);
		} else if (los) {
            dr = this.decide(l);
        } else if (l <= FOV_SQ) {
            dr = this.getDrToMinDistance();
		} else if (l <= this.sensing) {
			dr = this.getDirection(los, true);
		}

        if (!dr && this.drTemp) dr = this.drTemp;
        if (dr) {
            this.dr = dr;
            this.drTemp = null;
            this.move(dr, los);
		}
		
		if ((flag.dash || flag.rest) && los && this.isShowing() &&
			(!this.mimic || this.identified)) {
			flag.dash = flag.rest = false;
		}

        this.decreaseEnergy();
    }

    move(dr, los) {
        let [x, y] = [this.x + dr.x, this.y + dr.y];
        let loc = map.coords[x][y];
        if (loc.trap && loc.trap.protection) {
            if (this.stillness && !this.canAttack) return;
            this.attackCircle(loc);
            return;
        } else if (loc.fighter && this.isOpponent(loc.fighter)) {
            if (this.stillness && !this.canAttack) return;
            this.attack({ enemy: loc.fighter });
            return;
		}
        
        if (this.stillness) return;
        if (loc.isClosedDoor() && (!loc.hidden || this.searching)) {
            if (loc.hidden) {
                if (!evalPercentage(this.searching)) return;
                loc.hidden = false;
                loc.wall = false;
			}
			
            loc.openOrCloseDoor();
        } else {
            this.drawOrErase(false);
            this.x += dr.x, this.y += dr.y;
            this.drawOrErase(true);
            this.cost -= this.spdMove;
        }
    }

    getDirection(los, betw, rand) {
        let dr;
        if (betw) {
            dr = getDirectionBetween(this.x, this.y, this.ce.x, this.ce.y);
		} else if (rand) {
			dr = this.blinded && this.dr ? this.dr : drList[rndInt(drList.length - 1)];
		}

        if (!this.canMove(dr)) dr = this.getDrAround(dr, los); ///
        return dr;
    }

    getDrAround(dr, los) {
        let ccw = coinToss();
        let nextDr = getNextDirection(dr, ccw);
        if (!this.canMove(nextDr)) {
            let nextDr2 = getNextDirection(dr, !ccw)
            if (!this.canMove(nextDr2)) {
                if (!los || this.drTemp) return null;
                let nextDr3 = getNextDirection(nextDr, ccw);
                if (!this.canMove(nextDr3)) {
                    nextDr3 = getNextDirection(nextDr2, !ccw);
                    if (!this.canMove(nextDr3)) return null
				}
				
                nextDr = nextDr3;
            } else {
				nextDr = nextDr2;
			}
		}

        return nextDr;
    }

    canMove(dr) {
        let [x, y] = [this.x + dr.x, this.y + dr.y];
        let loc = map.coords[x][y];
        if (loc.fighter) {
            return this.isOpponent(loc.fighter);
		} else if (loc.wall && (!loc.hidden || !this.searching)) {
            return false;
        } else if (!this.drTemp && loc.trap && loc.trap.protection) {
            this.drTemp = dr;
            return false;
		}
		
        return true;
    }

    getDrToMinDistance() {
        if (this.ce.id !== ID_ROGUE) return this.getDirection(true, true);
        let drT;
        let dist = FOV + 1;
        let distCur = rogue.distMap[this.x + ',' + this.y];
        for (let dr of drList) {
            let [x, y] = [this.x + dr.x, this.y + dr.y];
            if (dist > rogue.distMap[x + ',' + y]) {
                if (!this.canMove(dr)) continue;
                drT = dr;
                dist = rogue.distMap[x + ',' + y];
                if (dist < distCur) break;
            }
		}
		
        return drT ? drT : this.getDirection(true, true);
    }

    attackCircle(loc) {
        if (evalPercentage(25)) {
            if (!loc.hidden) {
                audio.playSound('broken');
                let name = this.getName(true);
                message.draw(option.isEnglish() ?
                    `${name} broke Magic Circle of Protection` :
                    `${name}守りの魔法円を破壊した`)
			}
			
            loc.deleteTrap(true);
        }
    }

    died(f) {
        this.abort = true;
        let loc = map.coords[this.x][this.y];
        loc.fighter = null;
        delete map.enemyList[this.id];
        map.queue.delete(this);
        if (rogue.ce && rogue.ce.id === this.id) rogue.removeCe();
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            if (enemy.ce && enemy.ce.id === this.id) enemy.removeCe();
		}
        
        audio.playSound('kill', distanceSq(rogue.x, rogue.y, this.x, this.y));
        if (!f) return;
        if (rogue.hallucinated || this.mimic && !this.identified) hallucinate.undoOne(this);
        let name = this.getName();
        let nameE = f.getName(true);
        message.draw(option.isEnglish() ?
            `${nameE} defeated ${name}` :
            `${nameE}${name}を倒した`);
        f.gainExp(this.expGain);
        if (f.id !== ID_ROGUE) return;
        if (this.material && this.probMaterial()) this.makeMaterial(true);
        this.dropEquipment(this.equipment);
        this.dropEquipment(this.side);
        for (let key in this.pack) {
			this.pack[key].putDown(this.x, this.y, true);
		}

        if (this.boss && rogue.cdl === 33) {
            creation.stairs(1, DR_DOWN, POS_LOCATION, this.x, this.y, true);
            if (rogue.cdl === 33 && !rogue.lethe) {
                creation.item({
                    type: 'potion',
                    tabId: P_LETHE,
                    position: POS_LOCATION,
                    x: this.x,
                    y: this.y,
                });
            }

            if (rogue.cdl === 33) rogue.inferno = true;
        }
    }

    probMaterial() {
        let perc;
        switch (this.mod) {
            case MOD_NORMAL:
            case MOD_UNIQUE:
                perc = 0;
                break;
            case MOD_MAGIC:
                perc = 20;
                break;
            case MOD_RARE:
                perc = 10;
                break;
		}
		
        return perc && this.matDropRate ? evalPercentage(perc / this.matDropRate) : false;
    }

    dropEquipment(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            item.putDown(this.x, this.y, true);
            list[key] = null;
        }
    }

    decide(distance) {
        if (this.skill && this.skill['a'] && evalPercentage(this.skillProb * 100) && this.checkToCast()) {
            if (this.castSkill(distance)) return;
		}
		
        if (this.haveMissile()) {
            let ammo = this.getAmmo(this.equipment['main'].throwType);
            if (ammo) {
                this.ci = ammo;
                flag.arrow = true;
                this.getShootMsg(ammo);
                this.aim({
                    x1: this.ce.x,
                    y1: this.ce.y,
				});
				
                return;
            } else if (!this.equipment['main'].cursed) {
                this.swap();
                return;
            }
		}
		
        return this.getDrToMinDistance();
    }

    castSkill(distance) {
        let cast;
        let array = Object.keys(this.skill);
        array.shuffle();
        for (let a of array) {
            let id = this.skill[a].id;
            let skill = skillMap.get(id);
            if (!this.checkToCast(skill)) continue;
            if (skill.kind !== 'self' && skill.range >= 0) {
                let l = skill.range;
                l += skill.radius ? skill.radius : 0;
                if (l ** 2 < distance) continue;
            }
            
            if (id === TELEPORT_TO || id === RAID) {
                if (1 > distance) continue;
            } else if (id === HEAL) {
                if (this.hp >= this.hpMax) continue;
            } else if (id === ENCOURAGEMENT) {
                if (this.dmgBuffDur) continue;
            } else if (id === BLESSING) {
                if (this.acBuffDur) continue;
            } else if (id === SPEED) {
                if (this.spdBuffDur) continue;
            }
            
            this.cs = this.skill[a];
            if (skill.kind === 'self') {
                cast = this.castSelfSpell(skill) !== null;
                if (cast) break;
            } else {
                cast = true;
                flag.skill = true;
                let [x, y] = skill.range === 0 ? [this.x, this.y] : [this.ce.x, this.ce.y];
                this.aim({
                    x1: x,
                    y1: y,
                    nameSkill: id,
                });

                break;
            }
        }

        return cast;
    }

    probWakeUp(distanceSq) {
        let perc = (1 - distanceSq / FOV_SQ) * 100 - (this.ce.stealth - this.stealth);
        if (perc > 99) {
            perc = 99;
		} else if (perc < 1) {
			perc = 1;
		}

        return evalPercentage(perc);
    }

    getBias(bias) {
        switch (bias) {
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

    getSkill(id) {
        if (!this.skillPoints) return;
        let skill = skillMap.get(id);
        if (skill.kind === 'breath' && this.race === RACE_HUMAN ||
            skill.kind !== 'breath' && skill.type === 'spell' && this.int < 50) {
			return;
		}

        if (!this.skill) {
            this.skillProb = 1 / ((skill.kind === 'breath' && this.race & RACE_DRAGON ? 7 : 10) - Math.floor(this.lvl / 20));
            this.skill = {};
		}
		
        let i = 0;
        while (this.skill[eaList[i]] && this.skill[eaList[i]].id !== id) i++;
        if (i >= MAX_SKILL_NUM) return;
        if (!this.skill[eaList[i]]) this.skill[eaList[i]] = {};
        skill = this.skill[eaList[i]];
        skill.id = id;
        if (!skill.lvl) skill.lvl = 0;
        let gainLvl = MAX_SKILL_LVL - skill.lvl;
        if (gainLvl > this.skillPoints) gainLvl = this.skillPoints;
        skill.lvl += gainLvl;
        this.skillPoints -= gainLvl;
    }

    gainSynerzyAll() {
        for (let key in this.skill) {
			this.gainSynerzy(skillMap.get(this.skill[key].id), this.skill[key].lvl);
		}
    }

    getName(subject) {
        let name;
        if (this.isShowing()) {
            name = this.name[option.getLanguage()];
            if (this.cursed && this.mod !== MOD_UNIQUE)
                name = (option.isEnglish() ? 'Cursed ' : '呪われた') + name;
        } else {
			name = option.isEnglish() ? 'Something' : '何か';
		}

        if (subject && !option.isEnglish()) name += 'は';
        return name;
    }

    isOpponent(fighter) {
        return /*fighter.id===ID_ROGUE||*/ this.ce && this.ce.id === fighter.id ||
            this.confused || this.blinded;
    }

    isShowing() {
        return (rogue.litMapIds[this.x + ',' + this.y] || this.detected) &&
            !rogue.blinded && (!this.invisible || rogue.seeInvisible);
    }

    removeCe() {
        this.ce = null;
    }
}
const creation = {
    input(key) {
        if (key !== 'Enter') { 
            if (getAlphabetOrNumber(key)) {
                this.string += key;
			} else if (/^\s$|Spacebar/.test(key)) {
                this.string += ' ';
            } else if (key === 'Backspace') {
                this.string = this.string.substr(0, this.string.length - 1);
			} else if (key === 'ArrowDown' && this.stringSave) {
                this.string = this.stringSave;
            } else if (!key) { //init
				this.string = '';
			}

            message.draw(this.string, true);
            return;
		}
		
        this.stringSave = this.string;
        let [type, num, num2, num3] = this.string.split(' ').map((element) =>
			isNaN(Number(element)) ? element : Number(element));
        if (flag.create === 'item') {
            if (type === 'coin') {
                if (num > 0) {
                    rogue.purse += num;
                } else {
                    message.draw('Incorrect syntax');
                }
            } else if ((num2 === undefined || num2 > 0) && itemTab[type] && itemTab[type].has(num)) {
                rogue.createItemIntoPack({
                    type: type,
                    tabId: num,
                    quantity: num2,
                    uniqueId: num3,
                });

                map.drawObjectAll();
                map.draw();
            } else {
				message.draw('Incorrect syntax');
			}
        } else if (flag.create === 'fighter') {
            if (fighterTab[type] && fighterTab[type][num]) {
                this.enemy({
                    type: type,
                    tabId: num,
                    position: POS_LOCATION,
                    x: rogue.x,
                    y: rogue.y,
                    summon: true,
                });
                
                map.drawObjectAll();
                map.draw();
            } else {
				message.draw('Incorrect syntax');
			}
		}

        inventory.clear();
        flag.create = false;
        flag.regular = true;
    },

    dungeon(stairs, dr) {
        map.init();
        dungeon.create();
        let boss = rogue.cdl === 33 && !rogue.inferno;
        this.stairs(rndIntBet(MIN_STAIRS_NUM, MAX_STAIRS_NUM), boss ? DR_UP : RANDOM, POS_INIT);
        this.trap(rndIntBet(MIN_TRAP_NUM, MAX_TRAP_NUM), RANDOM, POS_INIT);
        let [startX, startY] = Object.keys(map.staircaseList)[dr === DR_DOWN ? 0 : 1].split(',');
        rogue.putDown(false, stairs, Number(startX), Number(startY));
        if (boss) {
            this.enemy({
                type: 'misc',
                tabId: 2,
			});
		}

        this.enemy({
            times: ENEMY_NUM_INIT,
            position: POS_INIT,
		});
		
        this.item({
            times: ITEM_NUM_INIT,
            position: POS_INIT,
		});
		
        map.redraw();
        let track = audio.getDungeonTrack(rogue.cdl, boss);
        if (audio.curTrack !== track) {
            audio.stop(audio.curTrack);
            audio.playMusic(track);
        }
    },

    town() {
        map.init(true);
        town.createAll();
        let pos = positionFixedList.hell;
        this.stairs(1, DR_DOWN, POS_LOCATION, pos.x, pos.y, true);
        rogue.putDown(true);
        map.redraw();
        audio.stop(audio.curTrack);
        audio.playMusic(!rogue.inferno ? 'town' : 'town2');
    },

    enemy({
        position,
        x,
        y,
        summon,
        noGroup,
        magic,
        boost,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        bias = RANDOM,
    }) {
        if (!boost) boost = !rogue.cdl ? 1 : 0;
        let lvl = rogue.cdl + boost;
        for (let i = 0; i < times; i++) {
            let [typeT, tabIdT] = [type, tabId];
            if (type === RANDOM) {
                do typeT = ftList[rndInt(ftList.length - 2)];
                while (fighterTab[typeT][0].lvl > lvl);
            }

            let fighter;
            if (tabId === RANDOM) {
                let j = 0;
                let fighterNums = fighterNumsMap.get(typeT);
                fighterNums.shuffle();
                do {
                    tabIdT = fighterNums[j++];
                    if (tabIdT === undefined) return; //
                    fighter = fighterTab[typeT][tabIdT];
                } while (fighter.mod === MOD_UNIQUE && rogue.cue[fighter.name[LETTER_ENG]] ||
                    fighter.lvl > lvl || evalPercentage(fighter.rarity));
            } else {
                fighter = fighterTab[typeT][tabIdT];
            }

            let count = !noGroup && fighter.group ? rndIntBet(2, 4) : 1;
            let [posT, xT, yT] = [position, x, y];
            for (let j = 0; j < count; j++) {
                let fighterNew = new Enemy(fighter);
                fighterNew.init(posT, xT, yT, summon, magic, bias, lvl);
                if (fighter.group && posT !== POS_LOCATION) {
                    posT = POS_LOCATION;
                    [xT, yT] = [fighterNew.x, fighterNew.y];
                }
            }
        }
    },

    setEnemyList(detail, normal, unique) {
        this.enemyList = {};
        for (let key in fighterTab) {
            for (let [tabId, f] of fighterTab[key].entries()) {
                if (key === 'misc' && f.mod !== MOD_UNIQUE) continue;
                if (f.mod === MOD_UNIQUE) {
                    if (!unique) continue;
                } else {
                    if (!normal) continue;
                }

                let func = numberPadding;
                let lvl = func(f.lvl, 2, true);
                let list = `Lv: ${lvl}`;
                if (detail) {
                    let hr = func(f.hpRate, 3);
                    let mr = func(f.mpRate, 3);
                    let str = func(f.str, 3);
                    let dex = func(f.dex, 3);
                    let con = func(f.con, 3);
                    let int = func(f.int, 3);
                    let spd = func(f.spd, 4);
                    let dmg = func(f.dmgBase, 3);
                    let ac = func(f.acBase, 3);
                    let sr = func(f.acSRate, 3);
                    let tr = func(f.acTRate, 3);
                    let br = func(f.acBRate, 3);
                    list += `, HR: ${hr}, MR: ${mr}, Str: ${str}, Dex: ${dex}, Con: ${con}, Int: ${int}, Spd: ${spd}, Dmg: ${dmg}, AC: ${ac}, SR: ${sr}, TR: ${tr}, BR: ${br}`;
                }

                list += `, Mod: ${f.mod}, ${key} ${tabId}`;
				this.enemyList[list] = `${f.name['b']}`;
			}
        }
    },

    item({
        position,
        x,
        y,
        magic,
        boost,
        lvl,
        uniqueId,
        starter,
        matBase,
        matId,
        times = 1,
        type = RANDOM,
        tabId = RANDOM,
        quantity = 1,
    }) {
        if (!boost) boost = !rogue.cdl ? 1 : 0;
        if (!lvl) lvl = rogue.cdl + boost;
        if (uniqueId >= 0) magic = true;
        for (let i = 0; i < times; i++) {
            let [typeT, tabIdT] = [type, tabId];
            if (type === RANDOM) typeT = Item.getType(magic);
            if (tabId === RANDOM) [typeT, tabIdT] = Item.getTabId(typeT, lvl, magic);
            let item = itemTab[typeT].get(tabIdT);
            if (item.lethe) rogue.lethe++;
            let itemNew = new Item(item, quantity);
            itemNew.init(position, x, y, magic, lvl, uniqueId, starter, matBase, matId);
            if (position === POS_LIST) {
                itemNew.place = flag.shop ? PLACE_SHOP : PLACE_PACK;
                return itemNew;
            }
        }
    },

    setItemList() {
        this.itemList = {};
        flag.shop = true;
        for (let type of equipmentTypeList) {
            this.itemList[type] = [];
            for (let [tabId, item] of itemTab[type]) {
                let i = 0;
                let list = [...materialList];
                list.shuffle();
                while (!(item.material & list[i])) i++;
                let matBase = list[i];
                list = materialMap.get(matBase).list;
                for (let i = 0, l = list.size; i < l; i++) {
                    let item = this.item({
                        type: type,
                        tabId: tabId,
                        position: POS_LIST,
                        lvl: 99,
                        matBase: matBase,
                        matId: i,
					});
					
                    item.embeddedMax = 0;
                    let name = item.getName();
                    this.itemList[type].push(`${name},${item.weight}kg`);
                }
            }
		}
		
        flag.shop = false;
    },

    trap(times, tabId = RANDOM, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (tabId === RANDOM) tabIdT = rndInt(trapTab.length - 1);
            let trap = new Trap(trapTab[tabIdT], !show);
            trap.init(position, x, y);
        }
    },

    stairs(times, tabId, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (position === POS_INIT) {
                if (tabId === RANDOM) {
                    if (i <= 1) {
                        tabIdT = i ? DR_DOWN : DR_UP;
                    } else {
                        tabIdT = i % 2 ? DR_DOWN : DR_UP;
                    }
                }

                show = i <= 1 || coinToss();
            } else if (tabId === RANDOM) {
				tabIdT = coinToss() ? DR_DOWN : DR_UP;
			}

            let staircase = new Staircase(stairsMap.get(tabIdT), !show);
            staircase.init(position, x, y);
        }
    },

    setList() {
        if (!rogue.isWizard) return;
        this.setEnemyList(true, true, true);
        this.setItemList();
    }
};
const game = {
    title(init) {
        display.clearAll();
        flag.title = true;
        audio.stop(audio.curTrack);
        if (!init || !DEBUG) audio.playMusic('title');
	},
	
    over() {
        display.clearAll();
        flag.retry = true;
	},
	
    quit(key, save) {
        if (key === 'N') {
            flag.quit = false;
            flag.regular = true;
            inventory.clear();
		}
		
        if (key !== 'Y') return;
        flag.died = true;
        flag.title = true;
        flag.regular = false;
        this.title();
        if (!save) data.delete();
	},
	
    start() {
        initFlag();
        initTab();
        audio.init();
        rogue = new Rogue;
        rogue.init();
        vue.rogue = rogue;
        map.stashList = [];
        message.clear();
        this.clearLevel();
        creation.town();
        creation.setList();
	},
	
    clearLevel() {
        display.clearAll();
        statistics.clearEnemyBar();
        rogue.checkUnique();
        rogue.numSteps = 0;
        rogue.ce = null;
        rogue.litMapIds = {};
	},
};
const help = {
    listLeft: [
        { cmd: { a: 'Arrow keys', b: '方向キー'}, name: { a: 'move', b: '移動' }},
        { cmd: { a: 'h', b: 'h'}, name: { a: 'move left', b: '左移動' }},
        { cmd: { a: 'j', b: 'j'}, name: { a: 'move down', b: '下移動' }},
        { cmd: { a: 'k', b: 'k'}, name: { a: 'move up', b: '上移動' }},
        { cmd: { a: 'l', b: 'l'}, name: { a: 'move right', b: '右移動' }},
        { cmd: { a: 'y', b: 'y'}, name: { a: 'move upleft', b: '左上移動' }},
        { cmd: { a: 'b', b: 'b'}, name: { a: 'move downleft', b: '左下移動' }},
        { cmd: { a: 'u', b: 'u'}, name: { a: 'move upright', b: '右上移動' }},
        { cmd: { a: 'n', b: 'n'}, name: { a: 'move downright', b: '右下移動' }},
        { cmd: { a: 'i', b: 'i'}, name: { a: 'inventory list', b: '持物一覧' }},
        { cmd: { a: 'e', b: 'e'}, name: { a: 'equipment list', b: '装備一覧' }},
        { cmd: { a: 'w', b: 'w'}, name: { a: 'wear or wield', b: '装備する' }},
        { cmd: { a: 'T', b: 'T'}, name: { a: 'take off or unwield', b: '装備を外す' }},
        { cmd: { a: 'G', b: 'G'}, name: { a: 'grab item', b: 'アイテムを拾う' }},
        { cmd: { a: 'd', b: 'd'}, name: { a: 'drop item', b: 'アイテムを置く' }},
        { cmd: { a: 'o', b: 'o'}, name: { a: 'open door', b: 'ドアを開ける' }},
        { cmd: { a: 'c', b: 'c'}, name: { a: 'close door', b: 'ドアを閉める' }},
        { cmd: { a: 's', b: 's'}, name: { a: 'search', b: '捜索する' }},
        { cmd: { a: 'r', b: 'r'}, name: { a: 'read scroll', b: '巻物を読む' }},
        { cmd: { a: 'q', b: 'q'}, name: { a: 'quaff potion', b: '薬を飲む' }},
        { cmd: { a: 'z', b: 'z'}, name: { a: 'zap wand', b: '魔法棒を振る' }},
        { cmd: { a: 'p', b: 'p'}, name: { a: 'pack item', b: 'アイテムを詰める' }},
        { cmd: { a: 'E', b: 'E'}, name: { a: 'eat food', b: '食事する' }},
        { cmd: { a: 'Q', b: 'Q'}, name: { a: 'quit', b: 'ゲームを放棄する' }},
        { cmd: { a: 'x', b: 'x'}, name: { a: 'examine things', b: '探査する' }},
        { cmd: { a: 'm', b: 'm'}, name: { a: 'use skill', b: 'スキルを使う' }},
        { cmd: { a: 'a', b: 'a'}, name: { a: 'assign skill', b: 'スキルを割り当てる' }},
        { cmd: { a: 'G', b: 'G'}, name: { a: 'gain stat/skill', b: 'ステータス/スキルを得る' }},
        { cmd: { a: 'f', b: 'f'}, name: { a: 'fire', b: '射る' }},
        { cmd: { a: 't', b: 't'}, name: { a: 'throw item', b: 'アイテムを投げる' }},
        { cmd: { a: 'S', b: 'S'}, name: { a: 'swap gear', b: '装備を持ち替える' }},
        { cmd: { a: 'C', b: 'C'}, name: { a: 'character description', b: 'キャラ詳細' }},
        { cmd: { a: 'F', b: 'F'}, name: { a: 'fuel', b: '補給する' }},
        { cmd: { a: 'R', b: 'R'}, name: { a: 'Rest', b: '休む' }},
        { cmd: { a: 'A', b: 'A'}, name: { a: 'alchemy', b: '錬金術' }},
    ],

    listRight: [
        { cmd: { a: 'Esc', b: 'Esc'}, name: { a: 'cancel command', b: '取り消す' }},
        { cmd: { a: '1-9', b: '1-9'}, name: { a: 'use item', b: 'アイテムを使う' }},
        { cmd: { a: 'F1-F12', b: 'F1-F12'}, name: { a: 'use skill', b: 'スキルを使う' }},
        { cmd: { a: 'Alt+dir', b: 'Alt+方向'}, name: { a: 'attack stationary/dig', b: 'その場で攻撃する/掘る' }},
        { cmd: { a: 'Shift+dir', b: 'Shift+方向'}, name: { a: 'dash', b: '走る' }},
        { cmd: { a: '.', b: '.'}, name: { a: 'step on', b: '踏む' }},
        { cmd: { a: '>', b: '>'}, name: { a: 'down stairs', b: '階段を降りる' }},
        { cmd: { a: '<', b: '<'}, name: { a: 'up stairs', b: '階段を昇る' }},
        { cmd: { a: '=', b: '='}, name: { a: 'option', b: 'オプション' }},
        { cmd: { a: '?', b: '?'}, name: { a: 'show command', b: 'コマンドを表示' }},
        { cmd: { a: 'Ctrl+p', b: 'Ctrl+p'}, name: { a: 'previous message', b: 'メッセージ履歴' }},
        { cmd: { a: 'Ctrl+r', b: 'Ctrl+r'}, name: { a: 'redraw', b: '再描写' }},
        { cmd: { a: 'Ctrl+m', b: 'Ctrl+m'}, name: { a: 'mute', b: '消音' }},
        { cmd: { a: 'Ctrl+s', b: 'Ctrl+s'}, name: { a: 'save', b: '記録する' }},
        { cmd: { a: 'Ctrl+d', b: 'Ctrl+d'}, name: { a: 'destroy item', b: 'アイテムを破壊する' }},
        { cmd: { a: 'Ctrl+x', b: 'Ctrl+x'}, name: { a: 'save and exit', b: '記録して終了する' }},
        { cmd: { a: 'Ctrl+v', b: 'Ctrl+v'}, name: { a: 'game version', b: 'ゲームのバージョン' }},
    ],

    listWizard: [
        { cmd: { a: 'Ctrl+e', b: 'Ctrl+e'}, name: { a: '*enlightenment*', b: '*啓蒙*' }},
        { cmd: { a: 'Ctrl+z', b: 'Ctrl+z'}, name: { a: '*indestructible*', b: '*破壊不能*' }},
        { cmd: { a: 'Ctrl+q', b: 'Ctrl+q'}, name: { a: '*create trap*', b: '*罠を生成する*' }},
        { cmd: { a: 'Ctrl+a', b: 'Ctrl+a'}, name: { a: '*create monster*', b: '*モンスターを生成する*' }},
        { cmd: { a: 'Ctrl+i', b: 'Ctrl+i'}, name: { a: '*create item*', b: '*アイテムを生成する*' }},
    ],

    scroll(key, init) {
        if (init) {
            message.draw(message.get(M_HELP) + message.get(M_SCROLL), true);
            let $refs = vue.$refs.help.$refs;
            this.eleP = $refs.commandListBox;
            this.eleC = $refs.commandList.$el.firstElementChild;
        }

        input.scroll(this.eleP, this.eleC, key, init);
    }
};
const input = {
    init() {
        document.onkeyup = this.onkeyup.bind(this);
        document.onkeydown = this.onkeydown.bind(this);
    },

    onkeyup(e) {
        let key = e.key;
        if (key === 'Shift') this.isShift = false;
        if (key === 'Control') this.isCtrl = false;
    },

    onkeydown(e) {
        let key = e.key;
        if (flag.wait) {
            if (!flag.died) map.queue.moveAll();
            return false;
        }
       
        if (key === 'Shift' || key === 'Control') {
            if (key === 'Shift') this.isShift = true;
            if (key === 'Control') this.isCtrl = true;
            return false;
        }

        if (flag.dash || flag.rest) {
            message.draw(message.get(M_INTERRUPTED));
            flag.dash = flag.rest = false;
            return false;
        }

        if (flag.clearInv) {
            inventory.clear();
            flag.clearInv = false;
        }
        
        if (/^Esc/.test(key) || !flag.create && /^\s$|Spacebar/.test(key)) {
            if (!flag.died && !flag.retry && !flag.title && !flag.failed) {
                message.clear();
                rogue.cancelCommand();
            }
        } else if (flag.regular) {
            this.eventFlag(key, e.altKey);
        } else if (flag.number) {
            rogue.inputNumber(key);
        } else if (flag.openDoor || flag.closeDoor) {
            rogue.openOrCloseDoor(key);
        } else if (flag.investigate) {
            rogue.investigate(key);
        } else if (flag.drop) {
            rogue.drop(key);
        } else if (flag.destroy) {
            rogue.destroy(key);
        } else if (flag.equip) {
            rogue.equip(key);
        } else if (flag.unequip) {
            rogue.unequip(key);
        } else if (flag.eat) {
            rogue.eat(key);
        } else if (flag.quaff) {
            rogue.quaffPotion(key);
        } else if (flag.read) {
            rogue.read(key);
        } else if (flag.synthesize) {
            rogue.synthesize(key);
        } else if (flag.grab) {
            rogue.grabItem(key);
        } else if (flag.character) {
            investigation.scroll(key);
        } else if (flag.examine) {
            rogue.examine(key);
        } else if (flag.identify) {
            rogue.identify(key);
        } else if (flag.repair || flag.blacksmith) {
            rogue.repair(key);
        } else if (flag.disint) {
            rogue.disintegrate(key);
        } else if (flag.aim) {
            rogue.aim({ key: key });
        } else if (flag.zap) {
            rogue.zap(key);
        } else if (flag.throw) {
            rogue.throw(key);
        } else if (flag.skill) {
            rogue.castSkill(key);
        } else if (flag.sortSkill) {
            rogue.sortSkill(key);
        } else if (flag.message) {
            message.scroll(key);
        } else if (flag.pack) {
            rogue.packOrUnpack(key);
        } else if (flag.assign) {
            rogue.assginSkills(key);
        } else if (flag.gain) {
            rogue.gainStatOrSkill(key);
        } else if (flag.fuel) {
            rogue.fuel(key);
        } else if (flag.shop) {
            rogue.shop(key, e.altKey);
        } else if (flag.cure) {
            rogue.cureShop(key);
        } else if (flag.stash) {
            rogue.stash(key, e.altKey);
        } else if (flag.help) {
            help.scroll(key);
        } else if (flag.create) {
            creation.input(key);
        } else if (flag.minimap) {
            map.drawMini(key);
        } else if (flag.option) {
            option.main(key);
        } else if (flag.quit) {
            game.quit(key);
        }

        if (flag.failed) {
            if (key === 'Y') {
                game.start();
                data.delete();
                message.draw(option.isEnglish() ?
                    'Deleted the data' :
                    'データ消去しました')
            }
        } else if (flag.died) {
            if (key === 'Enter') {
                if (flag.retry || flag.title) {
                    data.load();
                } else if (rogue && rogue.isWizard) {
                    rogue.revive();
                } else {
                    game.over();
                }
            }
        } else {
            if (flag.equipment) rogue.equipmentList();
            if (flag.inventory) rogue.showInventory(PLACE_PACK);
            if (rogue.done) {
                rogue.decreaseEnergy();
                map.queue.moveAll();
            }
        }
        
        if (key === 'm' && this.isCtrl) audio.mute();
        
        //dev tool shortcut
        if (key === 'I' && this.isCtrl) {
            this.isShift = this.isCtrl = false;
        } else {

            //disable browser shortcuts
            return false;
        }
    },

    eventFlag(key, isAlt) {
        switch (key) {
            case 'b':
            case 'h':
            case 'j':
            case 'k':
            case 'l':
            case 'n':
            case 'u':
            case 'y':
            case 'B':
            case 'H':
            case 'J':
            case 'K':
            case 'L':
            case 'N':
            case 'U':
            case 'Y':
                if (!option.rogueStyleMove.user) break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'Left':
            case 'Up':
            case 'Right':
            case 'Down':
            case 'Home':
            case 'End':
            case 'PageUp':
            case 'PageDown':
                if (this.isCtrl) break;
                if (isAlt) {
                    rogue.attackStationary(key);
                } else if (this.isShift) {
                    rogue.dash(key);
                } else {
                    rogue.move(key);
                }

                break;
            case '1': //1~9
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (this.isCtrl) break;
                rogue.useBoxItem(key);
                break;
            case 'a': // assign skill, *create monster*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    this.switchFlag();
                    flag.create = 'fighter';
                    creation.input();
                    message.draw('Input type and tabId', true);
                } else {
                    this.switchFlag();
                    rogue.showSkill(rogue.skill);
                    rogue.showSkill(rogue.keysList, true);
                    message.draw(message.get(M_ASSIGN_SKILL), true);
                    flag.assign = 1;
				}
				
                break;
            case 'A': { // alchemy
                if (!Object.keys(rogue.recipes).length) {
                    message.draw(message.get(M_DONT_KNOW_RECIPE));
                    break;
                }

                this.switchFlag();
                flag.synthesize = true;
                rogue.showInventory(PLACE_PACK);
                rogue.showInventory(PLACE_CUBE);
                let msg = message.get(M_SYNTHESIZE) + message.get(M_FLOOR);
                message.draw(msg, true);
                break
            }
            case 'c': // close door
            case 'o': // openDoor
                if (this.isCtrl) break;
                key === 'o' ? flag.openDoor = true : flag.closeDoor = true;
                if (rogue.searchDoor() <= 1) {
                    flag.openDoor = flag.closeDoor = false;
                    break;
				}
				
                this.switchFlag();
                message.draw(message.get(M_OPEN_OR_CLOSE), true);
                break;
            case 'C': // character description
                this.switchFlag();
                flag.character = true;
                investigation.main(rogue, DR_MIDDLE, true);
                Vue.nextTick(function(){
                    investigation.scroll(key, true);
                });

                break;
            case 'd': // drop, destroy, 
                if (this.isCtrl) {
                    this.switchFlag();
                    let msg = message.get(M_DESTROY) + message.get(M_FLOOR);
                    message.draw(msg, true);
                    flag.destroy = true;
                    rogue.showInventory(PLACE_PACK);
                    rogue.equipmentList();
                } else {
                    this.switchFlag();
                    flag.drop = true;
                    let msg = message.get(M_DROP);
                    rogue.showInventory(PLACE_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true);
				}
				
                break;
            case 'e': // equipmentList, *enlightenment*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    map.lighten();
                    map.draw();
                } else {
                    flag.equipment = !flag.equipment;
                    if (flag.equipment) {
                        rogue.equipmentList();
                    } else {
                        inventory.clear();
                        if (flag.inventory) rogue.showInventory(PLACE_PACK);
                    }
                }

                break;
            case 'E': { // eat
                this.switchFlag();
                flag.eat = true;
                let msg = message.get(M_EAT) + message.get(M_FLOOR);
                rogue.showInventory(PLACE_PACK);
                message.draw(msg, true);
                break
            }
            case 'f': // fire 
                if (this.isCtrl) break;
                if (!rogue.haveMissile(true)) break;
                rogue.ci = rogue.getAmmo(rogue.equipment['main'].throwType);
                if (!rogue.ci) {
                    message.draw(message.get(M_DONT_HAVE_AMMO));
                    break;
                }
                
                this.switchFlag();
                flag.arrow = true;
                flag.aim = true;
                message.draw(message.get(M_FIRE) + message.get(M_TO_EXAMINE), true);
                rogue.examinePlot(true);
                break;
            case 'F': { // fuel
                if (!rogue.equipment['light']) {
                    message.draw(message.get(M_DONT_EQUIP_LIGHT));
                    break;
                }
                
                this.switchFlag();
                flag.fuel = true;
                let msg = message.get(M_FUEL) + message.get(M_FLOOR);
                rogue.showInventory(PLACE_PACK);
                rogue.equipmentList();
                message.draw(msg, true);
                break;
            }
            case 'g': // grab
                if(this.isCtrl) break;
                rogue.grabItem();
                break;
            case 'G': { // gain
                this.switchFlag();
                flag.gain = 1;
                rogue.showInventory(PLACE_PACK);
                inventory.showStats(rogue);
                let msg = message.get(M_GAIN);
                message.draw(msg, true);
                break;
            }
            case 'i': // inventory, *create item*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    this.switchFlag();
                    flag.create = 'item';
                    creation.input();
                    message.draw('Input type, tabId and quantity', true);
                } else {
                    //TODO
                    flag.inventory = !flag.inventory;
                    if (flag.inventory) {
                        rogue.showInventory(PLACE_PACK);
                    } else {
                        inventory.clear();
                        if (flag.equipment) rogue.equipmentList();
                    }
                }
				
                break;
            case 'I': { // investigate
                if (this.isCtrl) break;
                this.switchFlag();
                flag.investigate = true;
                let msg = message.get(M_INVESTIGATE) + message.get(M_FLOOR);
                rogue.showInventory(PLACE_PACK);
                rogue.equipmentList();
                message.draw(msg, true)
                break;
            }
            case 'm': // skill
                if (this.isCtrl) break;
                if (!rogue.checkToCast()) break;
                this.switchFlag();
                flag.skill = true;
                rogue.showSkill(rogue.skill);
                message.draw(message.get(M_CAST), true);
                break;
            case 'M': // minimap
                this.switchFlag();
                flag.minimap = true;
                map.drawMini('a');
                message.draw(message.get(M_MINIMAP), true);
                break;
            case 'p': // pack, previous message
                if (this.isCtrl) {
                    this.switchFlag();
                    flag.message = true;
                    Vue.nextTick(function(){
                        message.scroll(false, true);
                    });
                } else {
                    this.switchFlag();
                    flag.pack = true;
                    let msg = message.get(M_PACK_OR_UNPACK) + message.get(M_FLOOR);
                    rogue.showInventory(PLACE_PACK);
                    rogue.showInventory(PLACE_BOX);
                    message.draw(msg, true);
				}
				
                break;
            case 'q': // quaff, *create trap*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.haveCast(CREATE_TRAP, 10);
                    map.draw();
                } else {
                    this.switchFlag();
                    flag.quaff = true;
                    let msg = message.get(M_QUAFF) + message.get(M_FLOOR);
                    rogue.showInventory(PLACE_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'Q': // quit
                this.switchFlag();
                flag.quit = true;
                message.draw(message.get(M_QUIT), true);
                break;
            case 'r': // read, redraw
                if (this.isCtrl) {
                    map.redraw();
                } else {
                    if (!rogue.canRead()) break;
                    this.switchFlag();
                    flag.read = true;
                    let msg = message.get(M_READ) + message.get(M_FLOOR);
                    rogue.showInventory(PLACE_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'R': // rest
                flag.rest = true;
                rogue.rest();
                break;
            case 's': // searching, save
                if (this.isCtrl) {
                    data.save();
                } else {
                    rogue.searchHiddenObject();
                }

                break;
            case 'S': // swap
                rogue.swap();
                break;
            case 't': { // throw
                if (this.isCtrl) break;
                this.switchFlag();
                let msg = message.get(M_THROW) + message.get(M_FLOOR);
                rogue.showInventory(PLACE_PACK);
                message.draw(msg, true);
                flag.throw = true;
                break;
            }
            case 'T': { // unequip
                if (rogue.isNaked()) {
                    message.draw(message.get(M_DONT_HAVE_EQUIPMENT));
                    break;
                }
                
                this.switchFlag();
                let msg = message.get(M_TAKE_OFF);
                message.draw(msg, true);
                rogue.equipmentList();
                rogue.showInventory(PLACE_PACK);
                flag.unequip = true;
                break;
            }
            case 'v': // version
                if (this.isCtrl) message.draw(`Death and Birth ver ${VERSION.toFixed(3)}`);
                break;
            case 'w': { // equip
                if (this.isCtrl) break;
                this.switchFlag();
                flag.equip = true;
                let msg = message.get(M_EQUIP) + message.get(M_FLOOR);
                rogue.showInventory(PLACE_PACK);
                rogue.equipmentList();
                message.draw(msg, true);
                break;
            }
            case 'x': // examine, exit 
                if (this.isCtrl) {
                    this.switchFlag();
                    data.exit();
                } else {
                    if (rogue.blinded) {
                        message.draw(message.get(M_CANT_EXAMINE));
                        break;
                    }
                    
                    this.switchFlag();
                    flag.examine = true;
                    cursor.init();
                    map.coords[rogue.x][rogue.y].getInfo();
                }

                break;
            case 'z': // zap, *indestructible*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.indestructible = !rogue.indestructible;
                } else {
                    this.switchFlag();
                    flag.zap = true;
                    let msg = message.get(M_ZAP) + message.get(M_FLOOR);
                    rogue.showInventory(PLACE_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'F1': //F1~F12
            case 'F2':
            case 'F3':
            case 'F4':
            case 'F5':
            case 'F6':
            case 'F7':
            case 'F8':
            case 'F9':
            case 'F10':
            case 'F11':
            case 'F12':
                if (this.isCtrl) break;
                rogue.castAssignedSkill(key);
                break;
            case '=': // option
                if (this.isCtrl) break;
                this.switchFlag();
                flag.option = true;
                message.draw(message.get(M_OPTION), true);
                inventory.show({
                    list: option.list,
                    dr: DR_RIGHT,
                });

                break;
            case '<': // stairs
            case '>':
                if (this.isCtrl) break;
                rogue.downOrUpStairs(key);
                break;
            case '.': // step on 
                if (this.isCtrl) break;
                if (!map.coords[rogue.x][rogue.y].getInfo(true)) rogue.done = true;
                break;
            case '?': // help
                if (this.isCtrl) break;
                this.switchFlag();
                flag.help = true;
                Vue.nextTick(function(){
                    help.scroll(false, true);
                });
                break;
        }
        
    },

    switchFlag() {
        inventory.clear();
        flag.inventory = false;
        flag.equipment = false;
        flag.regular = false;
    },

    scroll(eleP, eleC, key, init) {
        if (!init && key === 'c') {
            rogue.cancelCommand();
            return;
        }

        let scrollByX, scrollByY, left, down, up, right,
            dr = getDirection(key);
        if (!init && !dr) return;
        if (init) {
            scrollByX = -eleP.scrollWidth;
            scrollByY = -eleP.scrollHeight;
        } else if (dr.id === DR_LEFT) {
            left = true;
        } else if (dr.id === DR_DOWN) {
            down = true;
        } else if (dr.id === DR_UP) {
            up = true;
        } else if (dr.id === DR_RIGHT) {
            right = true;
        }

        if (up || down) {
            if (this.isCtrl) {
                scrollByY = eleP.scrollHeight;
            } else if (this.isShift) {
                scrollByY = eleP.getBoundingClientRect().height;
            } else if (eleC) {
                scrollByY = eleC.getBoundingClientRect().height;
            }

            if (up) scrollByY = -scrollByY;
        } else if (left || right) {
            if (this.isCtrl) {
                scrollByX = eleP.scrollWidth;
            } else if (this.isShift) {
                scrollByX = eleP.getBoundingClientRect().width;
            } else if (eleC) {
                scrollByX = eleC.getBoundingClientRect().width;
            }

            if (left) scrollByX = -scrollByX;
        }


        // if (scrollByX !== undefined) eleP.scrollBy(scrollByX, 0);
        // if (scrollByY !== undefined) eleP.scrollBy(0, scrollByY);
        if (scrollByX !== undefined) eleP.scrollLeft += scrollByX;
        if (scrollByY !== undefined) eleP.scrollTop += scrollByY;
    }
}
function vueInit() {
    vue = new Vue({
        el: '#game-container',
        data: {
            isEnglish: false,
            flag: flag,
            ver: VERSION,
            verData: 0,
            msgFixed: '',
            rogue: null,
            help: help,
            inventoryList: inventory.list,
            investigationList: investigation.list,
            colorList: colorList,
            msgListTemp: message.listTemp,

            // Message Prev
            msgList: message.list,
            msgTotal: '', 

            // Enemy Bar
            barEnemy: null,
            barName: '',
        }
    });
}

Vue.component('item-key', {
    props:['item'],
    template: /*html*/`
        <li class="item-key">{{ item.key }}</li>
    `
})

Vue.component('item-parts', {
    props:['item'],
    template: /*html*/`
        <li
        v-show="item.parts"
        class="item-parts">{{ item.parts }}</li>
    `
})

Vue.component('item-symbol', {
    props:['item'],
    template: /*html*/`
        <li
            class="item-symbol"
            v-show="item.symbol"
            :style="{ 
                color: item.symbolColor,
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : '',
                'text-stroke': item.stroke ? '1px ' + item.stroke : '',
            }"
        >{{ item.symbol }}</li>
    `
})

Vue.component('item-name', {
    props:['item'],
    template: /*html*/`
        <li
            class="item-name flex-ellipsis"
            :style="{ 
                color: item.nameColor ? item.nameColor : '',
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : '',
                'text-stroke': item.stroke ? '1px ' + item.stroke : '',
            }"
        >{{ item.name }}</li>
    `
})

Vue.component('item-price', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.price"
            class="item-price"
        >{{ item.price }}</li>
    `
})

Vue.component('item-weight', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.weight"
            class="item-weight"
        >{{ item.weight + ' kg' }}</li>
    `
})

Vue.component('item-select', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.select !== undefined"
            class="item-select"
        >{{ item.select }}</li>
    `
})

Vue.component('item-list', {
    props:['items'],
    template: /*html*/`
        <ul class="item-list">
            <li v-for="item in items">
                <ul class="item-prop-list">
                    <item-key :item="item"></item-key>
                    <item-parts :item="item"></item-parts>
                    <item-symbol :item="item"></item-symbol>
                    <item-name :item="item"></item-name>
                    <item-price :item="item"></item-price>
                    <item-weight :item="item"></item-weight>
                    <item-select :item="item"></item-select>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('inv-bottom', {
    props:['left', 'right'],
    template: /*html*/`
        <ul 
            v-show="left || right"
            class="inv-bottom"
         >
            <li v-show="left">{{ left }}</li>
            <li v-show="right">{{ right }}</li>
        </ul>
    `
})

Vue.component('inventory', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory"
        >
            <item-list :items="inv.items"></item-list>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('stats-list', {
    props:['list'],
    template: /*html*/`
        <ul class="stats-list">
            <li
                class="stats-prop-list"
                v-for="stats in list"
                :style="{ 
                    color: stats.color ? stats.color : '',
                    'text-shadow': stats.shadow ? '1px 1px 0 ' + stats.shadow : ''
                }"
            >
                <span class="flex-ellipsis">{{ stats.name }}</span>
                <span>
                    {{ stats.value }}
                    <span v-show="stats.valueMax !== undefined">{{ ' (' + stats.valueMax + ')' }}</span>
                </span>
            </li>
        </ul>
    `
})

Vue.component('equipment', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory left"
        >
            <item-list :items="inv.items"></item-list>
            <div class="stats-list-box">
                <stats-list :list="inv.statsLeft"></stats-list>
                <stats-list :list="inv.statsRight"></stats-list>
            </div>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('skill-list', {
    props:['skills', 'invest'],
    template: /*html*/`
        <ul class="skill-list">
            <li
                v-for="skill in skills"
                class="skill"
                :style="{
                    color: skill.color ? skill.color : '',
                    'text-shadow': skill.shadow ? '1px 1px 0 ' + skill.shadow : ''
                }"
            >
                <ul class="skill-prop-list">
                    <li
                        v-if="!invest"
                        class="skill-key"
                    >{{ skill.key }}</li>
                    <li
                        class="skill-name flex-ellipsis"
                    >{{ skill.name }}</li>
                    <li 
                        v-if="!invest"
                        class="skill-lvl"
                    >{{ skill.lvl }}</li>
                    <li
                        v-if="!invest"
                        class="skill-value"
                    >{{ skill.value }}</li>
                    <li
                        v-if="invest"
                        class="skill-element"
                    >{{ skill.element }}</li>
                    <li
                        v-if="!invest"
                        class="skill-mp"
                        :style="{
                            color: skill.mpColor ? skill.mpColor : '',
                            'text-shadow': skill.mpColor ? 'none' : '',
                        }"
                    >{{ skill.mp }}</li>
                    <li class="skill-reqLv"
                        :style="{
                            color: skill.reqLvColor ? skill.reqLvColor : '',
                            'text-shadow': skill.reqLvColor ? 'none' : '',
                        }"
                    >{{ skill.reqLv }}</li>
                    <li 
                        class="skill-reqSy"
                        :style="{
                            color: skill.reqSyColor ? skill.reqSyColor : '',
                            'text-shadow': skill.reqSyColor ? 'none' : '',
                        }"
                    >{{ skill.reqSy }}</li>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('skill', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory"
        >
            <skill-list :skills="inv.items"></skill-list>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('command-list', {
    props:['cmdList', 'isEnglish'],
    template: /*html*/`
        <ul class="command-list">
            <li v-for="command in cmdList">
                <ul class="command">
                    <li class="command-key">{{ command.cmd[isEnglish ? 'a' : 'b'] }}</li>
                    <li class="command-text">{{ command.name[isEnglish ? 'a' : 'b'] }}</li>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('help', {
    props:['help', 'rogue', 'isEnglish'],
    template: /*html*/`
        <div
            class="inventory middle"
        >
            <div 
                ref="commandListBox"
                class="command-list-box"
            >
                <command-list
                    ref="commandList"
                    :cmd-list="help.listLeft"
                    :isEnglish="isEnglish"
                ></command-list>
                <div class="command-list-box-right">
                    <command-list
                        :cmd-list="help.listRight"
                        :isEnglish="isEnglish"
                    ></command-list>
                    <command-list
                        v-if="rogue&&rogue.isWizard"
                        :cmd-list="help.listWizard"
                        :isEnglish="isEnglish"
                    ></command-list>
                </div>
            </div>
            <inv-bottom
                :left="isEnglish ? 'Command List' : 'コマンド一覧'"
            ></inv-bottom>
        </div>
    `
})

Vue.component('message-temp', {
    props:['list'],
    template: /*html*/`
        <div class="message-temp-box">
            <ul>
                <li
                    v-for="msg in list"
                >{{ msg.text + (msg.count > 1 ? ' (x' + msg.count + ')' : '') }}</li>
            </ul>
        </div>
    `
})

Vue.component('message-prev', {
    props:['list', 'total'],
    template: /*html*/`
        <div class="inventory middle">
            <ul ref="messagePrevList"
                class="message-list"
            >
                <li v-for="msg in list">{{ msg.text + (msg.count > 1 ? ' (x' + msg.count + ')' : '') }}</li>
            </ul>
            <inv-bottom
                :left="total"
            ></inv-bottom>
        </div>
    `
})

Vue.component('investigation-item', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p
                v-show="inv.desc"
                class="description"
                >{{ inv.desc }}</p>
            <ul class="base-prop-list">
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
            <ul class="embedded-list">
                <li v-for="item in inv.embeddedList">
                    <ul class="embedded-prop">
                        <item-symbol :item="item"></item-symbol>
                        <item-name :item="item"></item-name>
                    </ul>
                </li>
            </ul>
            <ul class="mod-prop-list">
                <li v-for="prop in inv.modPropList">
                    <ul class="mod-prop buff">
                        <li>{{ prop.text }}</li>
                        <li v-show="prop.value">{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
            <ul class="mod-parts-list">
                <li v-for="(props, key) in inv.modPartsList">
                    <ul class="mod-parts-prop-list">
                        <li class="mod-parts">{{ key }}</li>
                        <li>
                            <ul
                                v-for="prop in props"
                                class="mod-prop buff"
                            >
                                <li>{{ prop.text }}</li>
                                <li v-show="prop.value">{{ prop.value }}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <skill-list
                :skills="inv.skills"
                :invest="true"
            ></skill-list>
        </div>
    `
})

Vue.component('investigation-fighter', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p
                v-show="inv.desc"
                class="description"
            >{{ inv.desc }}</p>
            <ul
                ref="fighterPropList"
                class="base-prop-list"
            >
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('investigation-skill', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p class="description">{{ inv.desc }}</p>
            <ul class="base-prop-list">
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('recipe', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory middle"
        >
            <ul class="item-list">
                <li v-for="item in inv.items">
                    <ul class="item-prop-list">
                        <li class="item-name">{{ item.name }}</li>
                        <li class="item-cost">{{ item.cost }}</li>
                        <li class="item-recipe">{{ item.recipe }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('enemy-bar', {
    props:['enemy', 'name', 'rogue', 'colorList'],
    template: /*html*/`
        <div>
            <div 
                v-if="enemy"
                class="enemy-bar-box"
            >
                <p
                    :style="{ 
                        color: enemy.cursed ? colorList.red : '',
                        'text-shadow': enemy.shadow ? '1px 1px 0 ' + enemy.shadow : '',
                        'text-stroke': enemy.stroke ? '1px ' + enemy.stroke : '',
                    }"
                >{{ 'Lv' + enemy.lvl + ' ' + name }}</p>
                <div class="enemy-bar">
                    <span 
                        class="hp"
                        :style="{ 
                            width: (enemy.hp < 0 ? 0 : enemy.hp / enemy.hpMax * 100) + '%',
                            'background-color': (
                                enemy.sleeping ? colorList.royalblue :
                                enemy.paralyzed ? colorList.orange :
                                enemy.confused ? colorList.yellow :
                                enemy.blinded ? colorList.gray :
                                enemy.hallucinated ? colorList.purple :
                                enemy.canceled ? colorList.white :
                                enemy.infected ? colorList.infection :
                                enemy.poisoned ? colorList.poison :
                                ''
                            )
                        }"
                    ></span>
                </div>
            </div>
            <span
                v-if="rogue.ce"
                class="enemy-icon"
                :style="{ 
                    color: rogue.ce.color,
                    'text-shadow': rogue.ce.shadow ? '1px 1px 0 ' + rogue.ce.shadow : '',
                    'text-stroke': rogue.ce.stroke ? '1px ' + rogue.ce.stroke : '',
                }"
            >{{ rogue.ce.symbol }}</span>
        </div>
    `
})

Vue.component('condition', {
    props:['rogue', 'colorList', 'isEnglish'],
    template: /*html*/`
        <div 
            :style="{ 
                'background-color': rogue.hallucinated ? 'rgba(128, 0, 128, 0.15)' : '',
            }"
        >
            <ul>
                <li
                    v-if="rogue.hunger >= 1600"
                    :style="{ color: colorList.lime }"
                >{{ isEnglish ? 'full' : '満腹'}}</li>
                <li
                    v-else-if="rogue.hunger > 0 && rogue.hunger <= 200"
                    :style="{ color: colorList.yellow }"
                >{{ isEnglish ? 'hungry' : '空腹'}}</li>
                <li
                    v-else-if="rogue.hunger === 0"
                    :style="{ color: colorList.red }"
                >{{ isEnglish ? 'starved' : '飢餓'}}</li>
                <li
                    v-if="rogue.poisoned"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'poisoned' : '毒'}}</li>
                <li
                    v-if="rogue.confused"
                    :style="{ color: colorList.yellow }"
                >{{ isEnglish ? 'confused' : '混乱'}}</li>
                <li
                    v-if="rogue.paralyzed"
                    :style="{ color: colorList.orange }"
                >{{ isEnglish ? 'paralyzed' : '麻痺'}}</li>
                <li
                    v-if="rogue.sleeping > 0"
                    :style="{ color: colorList.royalblue }"
                >{{ isEnglish ? 'sleeping' : '睡眠'}}</li>
                <li
                    v-if="rogue.blinded"
                    :style="{ color: colorList.gray }"
                >{{ isEnglish ? 'blinded' : '盲目'}}</li>
                <li
                    v-if="rogue.infected"
                    :style="{ color: colorList.infection }"
                >{{ isEnglish ? 'infected' : '感染'}}</li>
                <li
                    v-if="rogue.hallucinated"
                    :style="{ color: colorList.purple }"
                >{{ isEnglish ? 'hallucinated' : '幻覚'}}</li>
                <li
                    v-if="rogue.canceled"
                    :style="{ color: colorList.white }"
                >{{ isEnglish ? 'canceled' : '封印'}}</li>
                <li
                    v-if="rogue.seeInvisible"
                    :style="{
                        color: colorList.light,
                        'text-shadow': '1px 1px 0 ' + colorList.light
                    }"
                >{{ isEnglish ? 'see invisible' : '透視'}}</li>
                <li
                    v-if="rogue.invisibility"
                    :style="{
                        color: colorList.light,
                        'text-shadow': '1px 1px 0 ' + colorList.light
                    }"
                >{{ isEnglish ? 'invisible' : '透明'}}</li>
                <li
                    v-if="rogue.ecco"
                    :style="{ color: colorList.air }"
                >{{ isEnglish ? 'ecco' : 'エコー'}}</li>
                <li
                    v-if="rogue.enchantSelfDur"
                    :style="{ color: colorList.earth }"
                >{{ isEnglish ? 'enchant self' : '自己強化'}}</li>
                <li
                    v-if="rogue.venomDur"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'venom hands' : '猛毒の手'}}</li>
                <li
                    v-if="rogue.confusing"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'confusing hands' : '混乱の手'}}</li>
            </ul>
        </div>
    `
})

Vue.component('stats-fixed', {
    props:['rogue', 'colorList', 'isEnglish'],
    template: /*html*/`
        <div>
            <div class="stats-fixed-left-container">
                <div class="stats-fixed-bar">
                    <span 
                        class="hp"
                        :style="{ 
                            width: (rogue.hp < 0 ? 0 : rogue.hp / rogue.hpMax * 100) + '%',
                            'background-color': (
                                rogue.sleeping ? colorList.royalblue :
                                rogue.paralyzed ? colorList.orange :
                                rogue.confused ? colorList.yellow :
                                rogue.blinded ? colorList.gray :
                                rogue.hallucinated ? colorList.purple :
                                rogue.canceled ? colorList.white :
                                rogue.infected ? colorList.infection :
                                rogue.poisoned ? colorList.poison :
                                ''
                            )
                        }"
                    ></span>
                </div>
                <div class="stats-fixed-box">
                    <ul class="stats-fixed-list-top">
                        <li
                            :style="{ color: rogue.lvl < rogue.lvlMax ? colorList.yellow : '' }"
                        >{{ (isEnglish ? 'Level ' : 'レベル ') + rogue.lvl }}</li>
                        <li
                            :class="{ 
                                buff: rogue.expBuff,
                            }"

                            :style="{
                                color: rogue.exp < rogue.expMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Exp ' : '経験値 ') + rogue.exp }}</li>
                        <li>{{ '$ ' + rogue.purse }}</li>
                        <li
                            :style="{
                                color: rogue.hp <= 0 ? colorList.red : '',
                            }"
                        >{{ 'HP '+ rogue.hp + '/' + rogue.hpMax }}</li>
                    </ul>
                    <ul class="stats-fixed-list-bottom">
                        <li 
                            class="rogue-boxes-list"
                            v-for="(item, key) in rogue.boxes"
                        >
                            <span
                                :style="{ 
                                    color: item ? item && item.color : '',
                                    'text-shadow': item && item.shadow ? '1px 1px 0 ' + item.shadow : '',
                                    'text-stroke': item && item.stroke ? '1px ' + item.stroke : '',
                                }"
                            >{{ item ? item.symbol : key }}</span>
                            <span 
                                class="item-num"
                                v-if="item"
                            >{{ item.quantity }}</span>
                            <span 
                                class="item-charge"
                                v-if="item && item.identified && isFinite(item.charges)"
                            >{{ item.charges}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="stats-fixed-right-container">
                <div class="stats-fixed-bar">
                    <span class="mp"
                        :style="{ 
                            width: (rogue.mp < 0 ? 0 : rogue.mp / rogue.mpMax * 100) + '%'
                        }"
                    ></span>
                </div>
                <div class="stats-fixed-box">
                    <ul class="stats-fixed-list-top">
                        <li
                            :style="{
                                color: rogue.mp <= 0 ? colorList.red : '',
                            }"
                        >{{ 'MP '+ rogue.mp + '/' + rogue.mpMax }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.strSus
                            }"

                            :style="{
                                color: rogue.str < rogue.strMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Str ' : '筋 ') + rogue.str }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.dexSus
                            }"

                            :style="{
                                color: rogue.dex < rogue.dexMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Dex ' : '器 ') + rogue.dex }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.conSus
                            }"

                            :style="{
                                color: rogue.con < rogue.conMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Con ' : '耐 ') + rogue.con }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.intSus
                            }"

                            :style="{
                                color: rogue.int < rogue.intMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Int ' : '知 ') + rogue.int }}</li>
                        <li
                            :class="{ 
                                buff: rogue.spdBuffDur
                            }"

                            :style="{
                                color: rogue.spdNerfDur ? colorList.red : '',
                            }"
                        >{{ (isEnglish ? 'Spd ' : '速 ') + rogue.spd + '%' }}</li>
                    </ul>
                    <div class="stats-fixed-list-bottom">
                        <span v-if="!rogue.cdl">{{ isEnglish ? 'Limbo' : '辺獄' }}</span>
                        <span v-else-if="rogue.cdl >= 1 && rogue.cdl <= 33">{{ (isEnglish ? 'Hell B' : '地獄 地下') + rogue.cdl }}</span>
                        <span v-else-if="rogue.cdl >= 34 && rogue.cdl <= 66">{{ (isEnglish ? 'Purgatory ' : '煉獄') + (rogue.cdl - 33) }}</span>
                        <span v-else-if="rogue.cdl >= 67 && rogue.cdl <= 99">{{ (isEnglish ? 'Heaven ' : '天国') + (rogue.cdl - 66) }}</span>
                    </div>
                </div>
            </div>
        </div>
    `
})

Vue.component('game-loader', {
    props:['flag', 'ver', 'verData', 'isEnglish'],
    template: /*html*/`
		<div>
			<div
				class="title"
				v-if="flag.title || flag.failed"
				v-cloak
			>
				<p
					class="err-msg"
					v-show="flag.failed"
				>
					{{ (isEnglish ?
					"Failed to load. In order to delete your save data and continue, please push 'Y'" :
					"読み込みに失敗しました。セーブデータを消去してゲームを続けるには、'Y'を押してください。")
					+ "(data ver " + verData.toFixed(3) + ")" }}
				</p>
				<div class="msg-box">
					<h1>Death and Birth</h1>
					<h2>{{ isEnglish ?
						'[Enter] to start' :
						'[Enter] ゲームスタート' }}
					</h2>
				</div>
				<small class="ver">{{ "ver " + ver.toFixed(3) }}</small>
			</div>
			<div
				class="retry"
				v-else-if="flag.retry"
				v-cloak
			>
				<div class="msg-box">
					<h1>G A M E  O V E R</h1>
					<h2>{{ isEnglish ?
						'[Enter] to retry' :
						'[Enter] リトライ' }}
					</h2>
				</div>
			</div>
		</div>
    `
})
window.onload = () => {
    vueInit();
    Vue.nextTick(function(){
        display.init();
        game.title(true);
        input.init();
    });
}
})();
