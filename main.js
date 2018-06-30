'use strict';
const generateNumber = function*(i, j, bit) {
    while (i <= j) yield bit ? 1 << i++ : i++;
}

const enums = (i, j) => [...generateNumber(i, j)];
const enumsBit = (i, j) => [...generateNumber(i, j, true)];
const VERSION = 0.010;
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
const MAX_STASH_COUNT = MAX_PACK_COUNT * 10;
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
const INIT_BOX_NUM = 4;
const MAX_EMBEDDED_NUM = 6;
const MAX_CHARGE_NUM = 100;
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

const WEIGHT = { 
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

const PRICE = {
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

const RARITY = {
    book: 70,
    food: 50,
    potion: 0,
    scroll: 0,
    recipe: 30,
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
    coin: 70,
    gem: 80,
    orb: 80,
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
const BREATH_RATE = 1 / 15;
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
    c: 'Stardos Stencil, sans serif'
};

let rogue;
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
const textLenList = {
    names: {
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
};

const display = {
    list: {
        a: { width: 640, height: 360, fs: 13 },
        b: { width: 768, height: 432, fs: 16 },
        c: { width: 896, height: 504, fs: 18 },
        d: { width: 1024, height: 576, fs: 20 },
    },

    change(a, draw) {
        let list = this.list[a];
        let container = document.getElementById('canvas-container');
        container.style.width = list.width + 'px';
        container.style.height = list.height + 'px';
        this.width = list.width;
        this.height = list.height;
        let fs = list.fs;
        this.fs = fs;
        minimap.fs = fs / 2;
        for (let key in this.canvases) {
            if (key === 'width' || key === 'height') continue;
            let cvs = this.canvases[key];
            let times = key === 'buf' ? 2 : 1;
            cvs.setAttribute('width', list.width * times);
            cvs.setAttribute('height', list.height * times);
        }

        for (let key in this.ctxes) {
            let ctx = this.ctxes[key];
            if (key === 'main') continue;
            ctx.textBaseline = 'middle';
            ctx.lineJoin = 'bevel';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = colorList.white;
            let fontStyle = FONT_STYLE[option.getLanguage()];
            if (key === 'cur') {
                ctx.font = fs + 6 + 'px ' + fontStyle;
                ctx.strokeStyle = colorList.yellow;
            } else if (key === 'map') {
                ctx.font = '10px ' + fontStyle;
            } else if (key === 'buf') {
                ctx.font = fs - 2  + 'px ' + FONT_STYLE[ENG];
            } else {
                ctx.font = fs - 2 + 'px ' + fontStyle;
            }

            ctx.textAlign = key === 'stats' || key === 'inv' || key === 'msg' ? 'left' : 'center';
        }

        this.textLenInit();
        if (draw) {
            map.redraw(rogue.x, rogue.y);
            map.draw(rogue.x, rogue.y);
            rogue.drawStats();
        }
    },

    text({
        ctx,
        msg,
        x = 0,
        y = 0,
        limit,
        xPx = 0,
        yPx = 0,
        limitPx = 0,
        stroke,
        fs = this.fs,
    }) {
        let limitX = limit ? limit * fs + limitPx : undefined;
        let args = [msg, x * fs + xPx, y * fs + yPx, limitX];
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.strokeText(...args);
        }

        ctx.fillText(...args);
        ctx.font = fs;
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
        sx,
        sy,
        sWidth,
        sHeight,
        dx, 
        dxPx,
        dy,
        dWidth,
        dHeight,
    }) {
        let fs = this.fs;
        ctx.drawImage(img, sx * fs, sy * fs, sWidth * fs, sHeight * fs, dx * fs + dxPx, dy, dWidth * fs, dHeight * fs);
    },

    clearOne(ctx, buf) {
        let width = this.width;
        let height = this.height;
        if (buf) {
            width *= 2;
            height *= 2;
        }

        this.rect({
            ctx: ctx,
            widthPx: width,
            heightPx: height,
            clear: true,
        });
    },

    clearAll() {
        for (let i in this.ctxes) {
            this.clearOne(this.ctxes[i], i === 'buf');
        };
    },

    textLenInit() {
        let ctxStats = this.ctxes.stats;
        let names = textLenList.names;
        for (let key in names) {
            textLenList[key] = {};
            textLenList[key].a = ctxStats.measureText(key).width + this.fs;
            textLenList[key].b = ctxStats.measureText(names[key]).width + this.fs;
        }
    },
};

{
    display.canvases = {};
    display.ctxes = {};
    let canvas = document.createElement('canvas');
    display.canvases['buf'] = canvas;
    display.ctxes['buf'] = canvas.getContext('2d');
    let children = document.getElementById('canvas-container').children;
    for (let i = 0, l = children.length; i < l; i++) {
        let child = children[i];
        if (child.id === "msg-err") {
           child.style.display = 'none';
           continue; 
        }

        let id = child.id.replace('canvas-', '');
        display.canvases[id] = child;
        display.ctxes[id] = child.getContext('2d');
    }
}
const option = {
    list: {
        a: { a: 'Language', b: '言語' , key:'language'},
        b: { a: 'Display', b: '解像度', key:'display'},
        c: { a: 'Shadow', b: '影', key:'shadow'},
        d: { a: 'Mute', b: '消音', key:'mute'},
        e: { a: 'BGM', b: 'BGM', key:'BGM'},
        f: { a: 'SE', b: '効果音', key:'SE'},
        g: { a: 'Autosave', b: '自動記録', key:'autosave'},
        h: { a: 'Auto-destroy', b: '自動破壊', key:'auto-destroy'},
        i: { a: 'Auto-charge', b: '自動充填', key:'auto-charge'},
        j: { a: 'Auto-identify', b: '自動識別', key:'auto-identify'},
        k: { a: 'Rogue Style Movement', b: 'ローグ型移動', key:'rogueStyleMove'}
    },

    display: { defaults: 'c', choise: {} },
    shadow: { defaults: false },
    mute: { defaults: false },
    autosave: { defaults: true },
    'auto-destroy': { defaults: false },
    'auto-charge': { defaults: true },
    'auto-identify': { defaults: true },
    BGM: { defaults: 'k', choise: {} },
    SE: { defaults: 'k', choise: {} },
    rogueStyleMove: { defaults: true },
    language: { 
        defaults: 'b',
        choise: { 
            a: { a: 'English', b: '英語' },
            b: { a: 'Japanese', b: '日本語' }
        }
    },

    main(keyCode) {
        let list = !flag.option2 ? this.list : this[this.name].choise;
        if (keyCode < 65 || keyCode >= Object.keys(list).length + 65) return;
        let a = getAlphabet(keyCode);
        if (!flag.option2) this.name = this.list[a]['key'];
        if (this.name === 'display' || this.name === 'language' ||
            this.name === 'BGM' || this.name === 'SE') {
            if (!flag.option2) {
                this.choose(a);
                return;
            } else if (a === this[this.name].user) {
                return;
            } else if (this.name === 'display') {
                this[this.name].user = a;
                display.change(a, true);
            } else if (this.name === 'language') {
                this[this.name].user = a;
                display.change(this.display.user, true);
            } else if (this.name === 'BGM' || this.name === 'SE') {
                this[this.name].user = a;
                let vol = (keyCode - 65) / 10;
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
            map.redraw(rogue.x, rogue.y);
            map.draw(rogue.x, rogue.y);
        } else if (this.name === 'mute') {
            audio.mute();
        } else if (this.name === 'autosave' || this.name === 'auto-identify' ||
            this.name === 'auto-destroy' || this.name === 'auto-charge' ||
            this.name === 'rogueStyleMove') {
            this[this.name].user = !this[this.name].user;
        }

        inventory.clear();
        inventory.show(this.list, RIGHT);
        message.draw(message.get(M_OPTION), true);
    },

    choose(a) {
        inventory.clear();
        inventory.show(this.list, RIGHT, a);
        flag.option2 = true;
        inventory.show(this[this.name].choise, LEFT);
        message.draw(message.get(M_OPTION), true);
    },
    
    isEnglish() {
        return this.language.user === ENG;
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
                option[key2].choise[EA[i]] = { a: i, b: i };
            }
        }
    }
    
    let choise = option.display.choise;
    for (let key in display.list) {
        let size = display.list[key];
        choise[key] = {};
        choise[key]['a'] = choise[key]['b'] = size.width + ' x ' + size.height;
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
            let j = rndInt(i - 1);
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

const lightenProb = () => !evalPercentage((rogue.cdl - 1) * 5);
const searchProb = () => evalPercentage(10 + rogue.searching);
const calcLevel = x => (x - 1) ** 4 + 10 * (x - 1);

const initTab = () => {
    getRndName.init();
    for (let key in itemTab) {
        if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe') continue;
        for (let item of itemTab[key].values()) {
            item.identified = false;
            getRndName[key](item);
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
        let l = EA.length;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                msg += EA[rndInt(l - 1)];
            }

            if (i !== 2) msg += ' ';
        }

        item.name['a'] = item.name['b'] = `'${msg}'`;
    }
}

const dice = {
    get(dmgBase, numBonus = 0, sidesBonus = 0) {
        let num = '';
        let sides = '';
        let i = 0;
        do {
            num += dmgBase.charAt(i++);
        } while (dmgBase.charAt(i) !== 'd');

        while (dmgBase.charAt(++i) !== '') {
            sides += dmgBase.charAt(i);
        }

        num = Number(num) + numBonus;
        sides = Number(sides) + sidesBonus;
        return { num, sides };
    },

    getAvg() {
        let { num, sides } = this.get(...arguments);
        return Math.ceil((1 + sides) / 2 * num);
    },

    roll() {
        let { num, sides } = this.get(...arguments);
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
const getAlphabet = (keyCode) => keyCode < 65 || keyCode > 90 ? null : EA[keyCode - 65];
const getNumber = (keyCode) => keyCode < 48 || keyCode > 57 ? null : keyCode - 48;
const getAlphabetOrNumber = (keyCode) => {
    let a = getAlphabet(keyCode);
    if (!a) a = getNumber(keyCode);
    return a;
}

const getUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getDirection = (keyCode) => {
    let id;
    switch (keyCode) {
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

const getDirectionBetween = (x1, y1, x2, y2) => {
    return x1 > x2 && y1 === y2 ? DR[LEFT] :
        x1 === x2 && y1 < y2 ? DR[DOWN] :
        x1 === x2 && y1 > y2 ? DR[UP] :
        x1 < x2 && y1 === y2 ? DR[RIGHT] :
        x1 > x2 && y1 > y2 ? DR[UPLEFT] :
        x1 > x2 && y1 < y2 ? DR[DOWNLEFT] :
        x1 < x2 && y1 > y2 ? DR[UPRIGHT] :
        x1 < x2 && y1 < y2 ? DR[DOWNRIGHT] :
        null;
}

const getNextDirection = (dr, ccw) => { //counterclockwise
    let id;
    switch (dr.id) {
        case LEFT:
            id = ccw ? DOWNLEFT : UPLEFT;
            break;
        case DOWNLEFT:
            id = ccw ? DOWN : LEFT;
            break;
        case DOWN:
            id = ccw ? DOWNRIGHT : DOWNLEFT;
            break;
        case DOWNRIGHT:
            id = ccw ? RIGHT : DOWN;
            break;
        case RIGHT:
            id = ccw ? UPRIGHT : DOWNRIGHT;
            break;
        case UPRIGHT:
            id = ccw ? UP : RIGHT;
            break;
        case UP:
            id = ccw ? UPLEFT : UPRIGHT;
            break;
        case UPLEFT:
            id = ccw ? LEFT : UP;
            break;
        default:
            return null;
    }
    return DR[id];
}

const deleteAndSortItem = (list, a) => {
    let i = EA.indexOf(a);
    let j = Object.keys(list).length - 1 - i;
    for (let k = 0; k < j; k++) {
        list[EA[i]] = list[EA[++i]];
    }
    
    delete list[EA[i]];
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
    }

    init(position, x, y) {
        if (position !== LOCATION) {
            this.getPositionRandomly(position === INIT, position === AWAY);
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
		} else if (!tele && this.id !== ROGUE) {
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
		} else if (this.id !== ROGUE) {
			this.dissapear();
		}
    }

    spiralSearchCheck(x, y, x0, y0, type, count) {
        let loc = map.coords[x][y];
        if (!loc.isObstacle() && !loc.enter) {
            if ((type === 'fighter' && !loc.fighter ||
                    type === 'item' && !loc.trap && !loc.door &&
                    !loc.item[EA[count]] ||
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
                this.list[EA[k++]] = creation.item({ position: LIST });
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
                this.list[EA[k]] = creation.item({
                    type: type,
                    tabId: tabId,
                    quantity: quantity,
                    position: LIST,
                });
                
                inventory.sort(EA[k++], this.list);
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
    M_BOOKMARK,
    M_BOOKMARK2,
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
    M_PREVIOUS,
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
    M_ASK_TO_QUIT,
    M_QUIT,
    M_INTERRUPTED,
    M_THROW,
    M_THROW_DIR,
    M_NO_CLUE,
    M_RECIPE,
    M_DONT_KNOW_RECIPE,
] = enums(1, 80);

const msgMap = new Map([
    [M_NUMBER, {
        a: '[0-9] then [Enter] or [a] for all: ',
        b: '[0-9] 数値 [Enter] 決定 [a] すべて: '
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
        a: ' [e] to equipment [i] for inventory',
        b: ' [e] 装備 [i] 持物'
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

    [M_ASK_TO_QUIT, {
        a: 'Are you sure you want to quit?',
        b: '本当にゲームを放棄しますか?'
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

    [M_DESTROY, {
        a: '[a-Z] [1-9] to destroy',
        b: '[a-Z] [1-9] 破壊'
    }],

    [M_READ, {
        a: '[a-Z] [1-9] to read',
        b: '[a-Z] [1-9] 読み上げ'
    }],

    [M_IDENTIFY, {
        a: '[a-Z] [1-9] to identify',
        b: '[a-Z] [1-9] 識別'
    }],

    [M_DISINTEGRATION, {
        a: '[a-Z] symbol to disintegrate',
        b: '[a-Z] シンボルを分解'
    }],

    [M_REPAIR, {
        a: '[a-Z] [1-9] to repair',
        b: '[a-Z] [1-9] 修復'
    }],

    [M_ZAP, {
        a: '[a-Z] [1-9] to zap',
        b: '[a-Z] [1-9] 振り下ろし'
    }],

    [M_ZAP_DIR, {
        a: '[direction] [.] to zap',
        b: '[方向] [.] 振り下ろし'
    }],

    [M_QUAFF, {
        a: '[a-Z] [1-9] to quaff',
        b: '[a-Z] [1-9] 飲用'
    }],

    [M_EAT, {
        a: '[a-Z] [1-9] to eat',
        b: '[a-Z] [1-9] 食事'
    }],

    [M_DROP, {
        a: '[a-Z] [1-9] to drop',
        b: '[a-Z] [1-9] 床置き'
    }],

    [M_GRAB, {
        a: '[a-Z] to grab',
        b: '[a-Z] 拾う'
    }],

    [M_EQUIP, {
        a: '[a-Z] [1-9] to wear or wield',
        b: '[a-Z] [1-9] 装備'
    }],

    [M_FUEL, {
        a: '[a-Z] [1-9] to fuel',
        b: '[a-Z] [1-9] 補給'
    }],

    [M_INVESTIGATE, {
        a: '[a-Z] [1-9] to investigate',
        b: '[a-Z] [1-9] 調査'
    }],

    [M_SYNTHESIZE, {
        a: '[a-z] [1-9] to choose [A-Z] to remove [Enter] to synthesize [Ctrl + r] to show recipes',
        b: '[a-z] [1-9] 選択 [A-Z] 除外 [Enter] 合成 [Ctrl + r] レシピを表示'
    }],

    [M_RECIPE, {
        a: '[Enter] to go back',
        b: '[Enter] 戻る'
    }],

    [M_PACK_OR_UNPACK, {
        a: '[a-z] to pack [1-9] to unpack',
        b: '[a-z] 荷詰め  [1-9] 荷解き'
    }],

    [M_PACK_INTO, {
        a: '[1-9] to pack into',
        b: '[1-9] 荷詰め箇所'
    }],

    [M_SHOP, {
        a: '[A-Z] to buy [a-z] to sell [alt + a-Z] details',
        b: '[A-Z] 購入 [a-z] 売却 [alt + a-Z] 詳細'
    }],

    [M_STASH, {
        a: '[a-z] to store [A-Z] to take out [,] to previous [.] to next page [alt + a-Z] details',
        b: '[a-z] 保管 [A-Z] 持参 [,] 前項 [.] 次項 [alt + a-Z] 詳細'
    }],

    [M_EXAMINE, {
        a: '[t] for target [r] for release [c] for char [m] for skill [x] for item details',
        b: '[t] ターゲット [r] 解除 [c] キャラ [m] スキル [x] アイテム詳細'
    }],

    [M_BLACKSMITH, {
        a: '[a-Z] to repair, [Enter] to repair all equipment',
        b: '[a-Z] 修理, [Enter] 装備全修理'
    }],

    [M_CURE, {
        a: '[a-z] to get cured',
        b: '[a-z] 治療'
    }],

    [M_MINIMAP, {
        a: '[a] for all [s] for yourself [c] for char [i] for item [t] fot trap [p] for portal [<],[>] for staircase',
        b: '[a] すべて [s] 自身 [c] キャラ [i] アイテム [t] 罠 [p] ポータル [<],[>] 階段'
    }],

    [M_SORT_SKILL, {
        a: '[a-z] to replace',
        b: '[a-z] 交換元'
    }],

    [M_SORT_SKILL2, {
        a: '[a-z] to replace with',
        b: '[a-z] 交換先'
    }],

    [M_GAIN, {
        a: '[a-Z] to gain',
        b: '[a-Z] 取得'
    }],

    [M_GAIN_SKILL, {
        a: '[a-z] to gain [A-Z] details',
        b: '[a-z] 取得 [A-Z] 詳細'
    }],

    [M_BOOKMARK, {
        a: '[a-z] to add bookmarks on or [M], [F1-F12] to remove',
        b: '[a-z] しおりを挿入 [M], [F1-F12] 除外'
    }],

    [M_BOOKMARK2, {
        a: '[M], [F1-F12] to choose a bookmark',
        b: '[M], [F1-F12] しおりを選択'
    }],

    [M_CAST, {
        a: '[a-z] to cast [A-Z] details [Ctrl+s] to sort',
        b: '[a-z] 行使 [A-Z] 詳細 [Ctrl+s] 整理'
    }],

    [M_CAST_DIR, {
        a: '[direction] [.] to cast',
        b: '[方向] [.] 行使'
    }],

    [M_OPTION, {
        a: '[a-z] to change option',
        b: '[a-z] オプション変更'
    }],

    [M_PREVIOUS, {
        a: '[direction] to scroll',
        b: '[方向] 項移動'
    }],

    [M_OPEN_OR_CLOSE, {
        a: '[direction] to open or close',
        b: '[方向] 開閉'
    }],

    [M_TAKE_OFF, {
        a: '[A-Z] to take off or unwield',
        b: '[A-Z] 取り外し'
    }],

    [M_FIRE, {
        a: '[direction] to fire',
        b: '[方向]　発射'
    }],

    [M_QUIT, {
        a: '[y/n] to quit',
        b: '[y/n] 放棄'
    }],

    [M_THROW, {
        a: '[a-z] [1-9] to throw',
        b: '[a-z] [1-9] 投擲'
    }],

    [M_THROW_DIR, {
        a: '[direction] [.] to throw',
        b: '[方向] [.] 投擲'
    }],
]);

const message = {
    list: [],
    page: 1,
    previous(keyCode) {
        let l = this.list.length;
        let p = Math.ceil(l / (IN_HEIGHT - MS - 2));
        if (p === 0) p = 1;
        if (keyCode === 72 || keyCode === 37 | keyCode === 100) { //h,left arrow,T4
            this.page = 1;
        } else if (keyCode === 74 || keyCode === 40 || keyCode === 98) { //j,down arrow,T2
            if (p !== this.page) this.page++;
        } else if (keyCode === 75 || keyCode === 38 || keyCode === 104) { //k,up arrow,T8
            if (this.page !== 1) this.page--;
        } else if (keyCode === 76 || keyCode === 39 || keyCode === 102) { //l,right arrow,T6
            this.page = p;
        } else {
            return;
        }

        inventory.clear();
        inventory.shadow(MIDDLE);
        let i = (this.page - 1) * (IN_HEIGHT - MS - 2);
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        for (i; i < this.page * (IN_HEIGHT - MS - 2); i++) {
            if (!this.list[i]) break;
            let msg = this.list[i].text;
            if (this.list[i].count > 1) msg += ` (x${this.list[i].count})`;
            display.text({
                ctx: ctxInv,
                msg: `${msg}`,
                x: 0.5,
                y: j++,
            });
        }

        ctxInv.save();
        display.text({
            ctx: ctxInv,
            msg: `[${l}/${MAX_MSG_LIST_LEN}]`,
            x: 1,
            y: - SS - .9,
            yPx: display.height,
        });

        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                `Message List [${this.page}/${p}]` :
                `メッセージ項目 [${this.page}/${p}]`,
            x: -1,
            xPx: display.width,
            y: - SS - .9,
            yPx: display.height,
        });

        ctxInv.restore();
        message.draw(message.get(M_PREVIOUS), true);
    },

    counter: 0,
    clear(all) {
        let num = all ? 1 : 2;
        display.rect({
            ctx: display.ctxes.msg,
            widthPx: display.width / num,
            heightPx: display.height / num,
            clear: true,
        });
    },

    delete() {
        setTimeout(() => {
            display.rect({
                ctx: display.ctxes.msg,
                y: this.counter - 0.5,
                widthPx: display.width / 2,
                height: this.counter--,
                heightPx: 1,
                clear: true,
            });
        }, MSG_SPEED);
    },

    draw(msg, fixed) {
        if (!fixed) {
            this.counter++;
            let ctxMsg = display.ctxes.msg;
            if (!this.list[0] || this.list[0].text !== msg) {
                this.list.unshift({ text: msg, count: 1 });
                if (this.list.length > MAX_MSG_LIST_LEN) this.list.pop();
                let curMap = ctxMsg.getImageData(0, 0, display.width / 2, (MAX_MSG_LEN - 0.5) * display.fs);
                this.clear();
                ctxMsg.putImageData(curMap, 0, display.fs);
            } else {
                msg += ` (x${++this.list[0].count})`;
                display.rect({
                    ctx: ctxMsg,
                    y: 0.5,
                    widthPx: display.width / 2 + 1,
                    height: 1,
                    heightPx: 1,
                    clear: true,
                });
            }
            
            this.delete();
            display.text({
                ctx: ctxMsg,
                msg: msg,
                x: 0.5,
                y: 1,
                limit: -0.5,
                limitPx: display.width / 2,
            });
        } else {
			let ctxInv = display.ctxes.inv;
            display.rect({
                ctx: ctxInv,
                x: 0.5,
                xPx: display.width / 2,
                y: 0.5,
                widthPx: display.width / 2 + 1,
                height: 1,
                heightPx: 1,
                clear: true,
            });

            display.text({
                ctx: ctxInv,
                msg: msg,
                x: 0.5,
                y: 1,
                limit: -0.5,
                xPx: display.width / 2,
                limitPx: display.width / 2,
            });
        }
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
] = enums(1, TOTAL_SKILL_NUM);

const skillMap = new Map([
    //spell
    [FIRE_BOLT, {
        reqLvl: 1,
        base: '5d5',
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
        base: '6d6',
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
        base: '10d10',
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
        mp: 5,
        element: 'fire',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Strength', b: '筋力復活' },
        reqSynerzy: 5,
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
        durBase: '10d2',
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
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 10,
        element: 'light',
        kind: 'self',
        type: 'spell',
        name: { a: 'See Invisible', b: '透視' },
        reqSynerzy: 5,
        durBase: '10d2',
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
        durBase: '10d2',
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
        reqLvl: 10,
        base: '10d2',
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Heal', b: '回復' },
        reqSynerzy: 5,
        desc: { a: '', b: '体力を{value}回復する。' }
    }],

    [EXTRA_HEAL, {
        reqLvl: 30,
        base: '30d2',
        rate: 10,
        synerzy: 5,
        mp: 30,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Extra Heal', b: '特大回復' },
        reqSynerzy: 20,
        desc: { a: '', b: '体力を{value}回復する。' }
    }],

    [RESTORE_INTELLIGENCE, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Intelligence', b: '知力復活' },
        reqSynerzy: 5,
        desc: { a: '', b: '知力を回復する。' }
    }],

    [RESTORE_ALL, {
        reqLvl: 25,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore All', b: '全復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '能力値を回復する。' }
    }],

    [CURE_ALL, {
        reqLvl: 25,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Cure All', b: '全治療' },
        reqSynerzy: 10,
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
        durBase: '10d2',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、水の耐性を{value}上昇させる。' }
    }],

    [RESIST_ALL, {
        reqLvl: 20,
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
        durBase: '10d2',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、すべての耐性を{value}上昇させる。' }
    }],

    [MANA, {
        reqLvl: 0,
        base: '5d2',
        rate: 10,
        synerzy: 5,
        mp: 1,
        element: 'water',
        kind: 'self',
        type: 'spell',
        name: { a: 'Mana', b: '魔力回復' },
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        base: '2d10',
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
        base: '4d20',
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
        base: '1d20',
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
        reqLvl: 20,
        base: '1d15',
        rate: 20,
        synerzy: 10,
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
        durBase: '10d2',
        durRate: 5,
        desc: { a: '', b: '{dur}ターンの間、スキルを2回連続で放つ。' }
    }],

    [SPEED, {
        reqLvl: 15,
        base: 5,
        rate: 1,
        synerzy: false,
        mp: 10,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Speed', b: '速度' },
        reqSynerzy: 10,
        durBase: '10d2',
        durRate: 3,
        desc: { a: '', b: '{dur}ターンの間、速度を{value}上昇させる。' }
    }],

    [RESTORE_DEXTERITY, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'air',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Dexterity', b: '器用さ復活' },
        reqSynerzy: 5,
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
        durBase: '10d2',
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
        base: '1d10',
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
        reqLvl: 30,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 30,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Enlightenment', b: '啓蒙' },
        reqSynerzy: 20,
        desc: { a: '', b: 'マップ全域を照らし、地形・アイテム及び隠された罠や階段を検出する。' }
    }],

    [IDENTIFY, {
        reqLvl: 15,
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
        reqLvl: 5,
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
        reqLvl: 10,
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
        reqLvl: 20,
        base: 30,
        rate: 1,
        synerzy: 1,
        mp: 10,
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
        reqLvl: 15,
        base: '10d10',
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'earth',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Stone to Mud', b: '岩石溶解' },
        wall: true,
        reqSynerzy: 10,
        desc: { a: '', b: '壁を取り壊し、石の敵に{value}の土ダメージを与える。' }
    }],

    [RESTORE_DURABILITY, {
        reqLvl: 20,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Durability', b: '耐久度復活' },
        reqSynerzy: 15,
        desc: { a: '', b: '装備品の耐久度を回復する。' }
    }],

    [EARTHQUAKE, {
        reqLvl: 20,
        base: 30,
        rate: 1,
        synerzy: 1,
        mp: 20,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Earthquake', b: '地震' },
        perc: true,
        limit: 100,
        radius: FOV,
        reqSynerzy: 10,
        desc: { a: '', b: '半径{radius}の範囲内に、{value}の強度で地震を起こす。' }
    }],

    [REPAIR_ALL, {
        reqLvl: 30,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 30,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Repair All', b: '全修復' },
        reqSynerzy: 20,
        desc: { a: '', b: 'すべての装備品の耐久度を回復する。' }
    }],

    [ENCHANT_SELF, {
        reqLvl: 30,
        base: 50,
        rate: 5,
        synerzy: 1,
        mp: 30,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Enchant Self', b: '自己強化' },
        perc: true,
        reqSynerzy: 20,
        durBase: '50d2',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、物理ダメージ・命中値・守備力をそれぞれ{value}上昇させる。' }
    }],

    [RESTORE_CONSTITUTION, {
        reqLvl: 15,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'earth',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Constitution', b: '耐久力復活' },
        reqSynerzy: 5,
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        reqLvl: 20,
        base: 10,
        rate: 1,
        synerzy: false,
        mp: 20,
        element: 'gravity',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Gravitational Field', b: '重力場' },
        radius: 10,
        range: 0,
        reqSynerzy: 10,
        durBase: '10d2',
        durRate: 3,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、速度を{value}低下させる。' }
    }],

    [TOWN_PORTAL, {
        reqLvl: 25,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 20,
        element: 'gravity',
        kind: 'self',
        type: 'spell',
        name: { a: 'Town Portal', b: 'タウン・ポータル' },
        reqSynerzy: 10,
        desc: { a: '', b: '街またはダンジョンに帰還するポータルを生成する。' }
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
        base: 0,
        rate: 1,
        synerzy: false,
        mp: 1,
        element: 'gravity',
        kind: 'self',
        type: 'spell',
        name: { a: 'Slow', b: '鈍足' },
        durBase: '10d2',
        durRate: 3,
        desc: { a: '', b: '{dur}ターンの間、速度を{value}低下させる。' }
    }],

    [POISON_BOLT, {
        reqLvl: 1,
        base: '2d10',
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
        base: '2d15',
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
        reqLvl: 5,
        base: 20,
        rate: 3,
        synerzy: 1,
        mp: 5,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Touch of Confusion', b: '混乱の手' },
        perc: true,
        limit: 100,
        durBase: '10d2',
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
        durBase: '50d2',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、物理攻撃に毒ダメージを{value}付与する。' }
    }],

    [SLEEPING_GAS, {
        reqLvl: 10,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Sleeping Gas', b: '睡眠ガス' },
        radius: 1,
        reqSynerzy: 5,
        durBase: '5d2',
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
        radius: 1,
        range: 0,
        reqSynerzy: 10,
        durBase: '2d2',
        durRate: 0,
        desc: { a: '', b: '半径{radius}の範囲内の敵を、{dur}ターンの間、麻痺状態にする。' }
    }],

    [RESTORE_EXPERIENCE, {
        reqLvl: 20,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 5,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Restore Experience', b: '経験値復活' },
        reqSynerzy: 10,
        desc: { a: '', b: '失った経験値を回復する。' }
    }],

    [LOWER_RESIST, {
        reqLvl: 20,
        base: -10,
        rate: -2,
        synerzy: -1,
        mp: 20,
        element: 'poison',
        kind: 'aim',
        type: 'spell',
        name: { a: 'Lower Resist', b: '耐性低下' },
        radius: 1,
        perc: true,
        reqSynerzy: 10,
        durBase: '10d2',
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
        durBase: '10d2',
        durRate: 10,
        desc: { a: '', b: '{dur}ターンの間、毒の耐性を{value}上昇させる。' }
    }],

    [HALLUCINATING_MIST, {
        reqLvl: 20,
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
        durBase: '10d2',
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
        durBase: '2d3',
        durRate: 1,
        desc: { a: '', b: '{dur}ターンの間、混乱状態にする。' }
    }],

    [POISON, {
        reqLvl: 0,
        base: 0,
        rate: 0,
        synerzy: false,
        mp: 1,
        element: 'poison',
        kind: 'self',
        type: 'spell',
        name: { a: 'Poison', b: '毒' },
        durBase: '5d2',
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
        durBase: '2d2',
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
        durBase: '5d2',
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        durBase: '2d2',
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
        durBase: '5d2',
        durRate: 2,
        desc: { a: '', b: '{dur}ターンの間、感染状態にする。' }
    }],

    [PESTILENCE, {
        reqLvl: 30,
        base: '2d15',
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
        reqLvl: 30,
        base: '2d25',
        rate: 20,
        synerzy: 10,
        mp: 30,
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
        base: '2d20',
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
        reqLvl: 10,
        base: '2d10',
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
        base: '5d7',
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
        reqLvl: 30,
        base: '6d7',
        rate: 20,
        synerzy: 10,
        mp: 30,
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
        durBase: '10d2',
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
        durBase: '10d2',
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
        effectSelf: true,
        parabora: true,
        desc: { a: '', b: '放物線を描く矢を放ち、敵1体に、{value}の氷ダメージを与え、凍結させる。' }
    }],

    [PHOTON_ARROW, {
        reqLvl: 20,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 10,
        element: 'light',
        kind: 'attack',
        type: 'missile',
        name: { a: 'Photon Arrow', b: '光子の矢' },
        perc: true,
        penetrate: true,
        effectSelf: true,
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
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'fire',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Fire Breath', b: '火炎のブレス' }
    }],

    [AQUA_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'water',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Aqua Breath', b: '水のブレス' }
    }],

    [WIND_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'air',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Wind Breath', b: '風のブレス' }
    }],

    [POISON_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'poison',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Poison Breath', b: '毒のブレス' }
    }],

    [LIGHT_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'light',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Light Breath', b: '閃光のブレス' }
    }],

    [COLD_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'cold',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Cold Breath', b: '冷気のブレス' }
    }],

    [LIGHTNING_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'lightning',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Lightning Breath', b: '稲妻のブレス' }
    }],

    [GRAVITY_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'gravity',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Gravity Breath', b: '重力のブレス' }
    }],

    [INFECTION_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'infection',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Infection Breath', b: '感染のブレス' }
    }],

    [BLIZZARD_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'blizzard',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Blizzard Breath', b: '吹雪のブレス' }
    }],

    [DUST_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'sand',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Dust Breath', b: '砂塵のブレス' }
    }],

    [ACID_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'acid',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Acid Breath', b: '酸のブレス' }
    }],

    [MAGMA_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'magma',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Magma Breath', b: '溶岩のブレス' }
    }],

    [RADIOACTIVE_BREATH, {
        reqLvl: 0,
        base: 0,
        rate: 10,
        synerzy: 5,
        mp: 5,
        element: 'radiation',
        kind: 'breath',
        type: 'spell',
        name: { a: 'Radioactive Breath', b: '放射能のブレス' }
    }],
]);

{
    if (TOTAL_SKILL_NUM < skillMap.size) throw new Error('Incorrect skill numbers');
    for (let [key, value] of skillMap.entries()) {
        value.id = key;
        value.color = colorList[value.element];
    }
}
const investigationMap = new Map([
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

    ['charges', {
        name: { a: 'Charges', b:'充填数' },
        item: true,
    }],

    ['atkType', {
        name: { a: 'Attack Type', b: '攻撃種類' },
    }],

    ['dmgBase', {
        name: { a: 'Damage Base', b: 'ダメージ基礎値' },
    }],

    ['dmgAvg', {
        name: { a: 'Damage Average', b: 'ダメージ期待値' },
        char: true,
        equipList: true,
    }],

    ['rateValue', {
        name: { a: 'Hit Rating', b: '命中値' },
        char: true,
        equipList: true,
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

    ['acSValueTotal', {
        name: { a: 'Slash Defence', b: '斬守備力' },
        char: true,
        equipList: true,
    }],

    ['acTValueTotal', {
        name: { a: 'Thrust Defence', b: '突守備力' },
        char: true,
        equipList: true,
    }],

    ['acBValueTotal', {
        name: { a: 'Blunt Defence', b: '打守備力' },
        char: true,
        equipList: true,
    }],

    ['timesMelee', {
        name: { a: 'Melee Attack Times', b: '近接攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesMissile', {
        name: { a: 'Missile Attack Times', b: '遠隔攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesSpell', {
        name: { a: 'Spell Cast Speed', b: '魔法詠唱速度' },
        char: true,
        equipList: true,
    }],
    
    ['timesMove', {
        name: { a: 'Move Speed', b: '移動速度' },
        char: true,
        equipList: true,
    }],
    
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

    ['duration', {
        name: { a: 'Duration', b: '持続期間' },
        item: true,
    }],
    
    ['durationMax', {
        name: { a: 'Max Duration', b: '最大持続期間' },
        item: true,
    }],

    ['durab', {
        name: { a: 'Durability', b: '耐久度' },
        item: true,
        max: 'durabMax'
    }],

    ['iasBase', {
        name: { a: 'Base Attack Speed', b: '基礎攻撃速度' },
        item: true,
    }],
    
    ['fcrBase', {
        name: { a: 'Base Cast Speed', b: '基礎詠唱速度' },
        item: true,
    }],
    
    ['frwBase', {
        name: { a: 'Base Move Speed', b: '基礎移動速度' },
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
    
    ['durationBonus', {
        name: { a: 'Duration Bonus', b: '持続期間加算値' },
        item: true,
        plus: true,
    }],
    
    ['numBoxes', {
        name: { a: 'Slot numbers', b: 'スロット数' },
        plus: true,
    }],

    ['dmgDiceNum', {
        name: { a: 'Damage Dice Number', b: 'ダメージ・ダイス数' },
        plus: true,
    }],
    
    ['dmgDiceSides', {
        name: { a: 'Damage Dice Sides', b: 'ダメージ・ダイス面数' },
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
    }],
    
    ['dmgHuman', {
        name: { a: 'Damage to Human', b: '対人間ダメージ' },
        plus: true,
    }],
    
    ['dmgDemon', {
        name: { a: 'Damage to Demon', b: '対悪魔ダメージ' },
        plus: true,
    }],
    
    ['dmgAnimal', {
        name: { a: 'Damage to Animal', b: '対動物ダメージ' },
        plus: true,
    }],
    
    ['dmgDragon', {
        name: { a: 'Damage to Dragon', b: '対ドラゴンダメージ' },
        plus: true,
    }],
    
    ['dmgUndead', {
        name: { a: 'Damage to Undead', b: '対不死ダメージ' },
        plus: true,
    }],
    
    ['dmgGiant', {
        name: { a: 'Damage to Giant', b: '対巨人ダメージ' },
        plus: true,
    }],
    
    ['dmgSpirit', {
        name: { a: 'Damage to Spirit', b: '対精霊ダメージ' },
        plus: true,
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
        this.loadOption();
        getRndName.init();
        this.loadItemTab();
        this.loadCoords();
        message.list = this.messageList;
        if(this.ver < 0.003) {
            rogue.litMapIds = this.litMapIds;
            rogue.inferno = this.difficulty.inferno;
        }

        if (rogue.cdl) {
            this.loadItem(this.stashList);
            map.stashList = this.stashList;
        }

        this.convertCe();
        display.clearAll();
        display.change(option.display.user, true);
        initFlag();
        this.loadAudio();
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
                if (key === 'potion') thisItem.color = item.color;
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
                if (key === 'potion') item.color = thisItem.color;
            }
        }
    }

    loadCoords() {
        map.init(false, true);
        map.coords = this.coords;
        for (let locs of map.coords) {
            for (let loc of locs) {
                loc.__proto__ = Location.prototype;
                if (loc.fighter) this.loadFighter(loc.fighter);
                if (loc.item['a']) this.loadItem(loc.item, true);
                if (loc.enter) this.loadEntrance(loc.enter);
                if (loc.trap) loc.trap.__proto__ = Trap.prototype;
                if (loc.stairs) {
                    loc.stairs.__proto__ = Staircase.prototype;
                    map.staircaseList[loc.x + ',' + loc.y] = loc.stairs;
                }
            }
        }
    }

    loadFighter(fighter) {
        if (fighter.id === ROGUE) {
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

    convertCe(save) {
        if (rogue.ce) rogue.ce = save ? rogue.ce.id : map.enemyList[rogue.ce];
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            if (enemy.ce) {
                if (save) {
                    enemy.ce = enemy.ce.id;
                } else {
                    enemy.ce = enemy.ce === ROGUE ? rogue : map.enemyList[enemy.ce];
                }
            }
        }
    }

    loadAudio() {
        audio.stop(audio.curTrack);
        audio.curTrack = this.track;
        let a = this.option['BGM'].user;
        audio.volBGM = option['BGM'].choise[a].a / 10;
        a = this.option['SE'].user;
        audio.volSE = option['SE'].choise[a].a / 10;
        audio.playMusic(audio.curTrack);
    }
}

const data = {
    name: 'Player',
    save(unload) {
        if (unload && audio.curTrack) audio.music[audio.curTrack].pause();
        if (flag.died || flag.retry || this.error) {
            return;
        } else if (flag.synthesize) {
            rogue.returnCubeItem();
        }

        message.draw(option.isEnglish() ? 'Saved' : '記録した');
        let saveData = new Data();
        localStorage.setItem(this.name, JSON.stringify(saveData));
    },

    load() {
        let found;
        let saveData = JSON.parse(localStorage.getItem(this.name));
        if (saveData !== null) {
            saveData.__proto__ = Data.prototype;
            try {
                saveData.loadInit();
                message.draw(option.isEnglish() ? 'Loaded' : '記録を読み込んだ');
            } catch (e) {
                this.failed = true;
                let ver = saveData.ver;
                display.text({
                    ctx: display.ctxes.inv,
                    msg: option.isEnglish() ?
                        `Failed to load. In order to delete your save data and continue, please push 'Y'.(ver ${ver})` :
                        `読み込みに失敗しました。セーブデータを消去してゲームを続けるには、'Y'を押してください。(ver ${ver})`,
                    x: 1,
                    y: 1,
                });
            }
        } else {
            game.start();
        }
    },

    delete(name) {
        localStorage.removeItem(name);
    },

    exit() {
        this.save();
        game.quit(89, true);
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
    IN,
    OUT
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
    },

    init() {
        for (let key in this.music) {
            this.music[key].currentTime = 0;
        }
    },

    fadeIn(track) {
        if (track.fade !== IN) return;
        if (track.volume < this.volBGM) {
            track.volume = Math.round((track.volume + 0.1) * 10) / 10;
            setTimeout(this.fadeIn.bind(this, track), 100);
        } else {
            track.fade = null;
        }
    },

    fadeOut(track, loop) {
        if (track.fade !== OUT) return;
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
        track.fade = IN;
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
        track.fade = OUT;
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
            if (this.fade !== OUT && this.currentTime >= this.duration - 0.5) {
                this.fade = OUT;
                audio.fadeOut(this, true);
            }
        }, false);
        track.addEventListener('ended', function() {
            if (audio.curTrack === key) {
                this.fade = IN;
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
                loc.draw();
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

                loc.draw();
                break;
            case MONSTER_DETECTION:
                if (!loc.fighter || loc.fighter.id === ROGUE || loc.fighter.detected) return;
                loc.fighter.detected = true;
                loc.draw();
                this.count++;
                break;
            case SCREAM:
                if (!loc.fighter || !loc.fighter.sleeping) return;
                loc.fighter.wakeUp();
                break;
            case DISINTEGRATION:
                if (!loc.fighter || loc.fighter.id === ROGUE || loc.fighter.symbol !== this.symbol) return;
                if (loc.fighter.mod !== UNIQUE &&
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
                loc.fighter && loc.fighter.id === ROGUE) return;
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
                            items[EA[i++]] = item;
                            found = true;
                            continue;
                        }

                        if (item.mod === UNIQUE && !item.identified) {
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
                        if (loc.fighter.mod === UNIQUE) delete rogue.cue[loc.fighter.name[ENG]];
                        loc.fighter.died();
                    }
                }

                loc.wall = WALL_HP * (!found && coinToss());
                loc.floor = !loc.wall;
                loc.draw();
                break;
        }
    }
};

const lineOfSight = (x0, y0, x1, y1, color, skill) => {
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

            cursol.plot(xS, yS, color);
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
                map.coords[x][y].draw();
            }
        }
    },

    line(i, x0, y0, radius, search) {
        for (let j = 1; j <= radius; j++) {
            let [x1, y1] = [DR[i].x * j, DR[i].y * j];
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
            cursol.plot(x, y, this.color);
        } else if (this.type === 'Lighten') {
            if ((!this.lightRadSq || distance > this.lightRadSq) &&
                !loc.lighten) return;
            let id = x + ',' + y;
            rogue.litMapIds[id] = true;
            if (this.oldLitMap[id]) {
                delete this.oldLitMap[id];
            } else {
                loc.found = true;
                loc.draw();
            }
        } else if (this.type === 'Light') {
            if (!loc.lighten) {
                loc.lighten = true;
                loc.found = true;
                loc.draw();
            }
        } else if (this.type === 'Dark') {
            if (loc.lighten) {
                loc.lighten = false;
                loc.draw();
            }
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
        for (let key in DR) {
            if (this.map && gScore > FOV || this.pas && ++count > 4) break;
            let x = node.x + DR[key].x;
            let y = node.y + DR[key].y;
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
const minimap = {
    shadow() {
        let ctxMap = display.ctxes.map;
        ctxMap.save();
        ctxMap.shadowColor = colorList.clear;
        ctxMap.globalAlpha = 0.9;
        ctxMap.fillStyle = colorList.black;
        display.rect({
            ctx: ctxMap,
            widthPx: display.width,
            height: -SS,
            heightPx: display.height,
        });

        ctxMap.restore();
    },

    draw(keyCode) {
        if (!(keyCode === 65 || //a all
            keyCode === 83 || //s self
            keyCode === 67 || //c char
            keyCode === 73 || //i item
            keyCode === 77 && input.isShift || //M map
            keyCode === 188 && input.isShift || //<
            keyCode === 190 && input.isShift || //>
            keyCode === 80 || //p portal
            keyCode === 84)) { //t trap
            return;
        }

        display.clearOne(display.ctxes.map);
        if (keyCode === 77 && input.isShift) { //M
            flag.minimap = false;
            flag.regular = true;
            return;
        }

        this.shadow();
        if (rogue.blinded) return;
        for (let i = 0, l = map.coords.length; i < l; i++) {
            for (let loc of map.coords[i]) {
                let type;
                switch (keyCode) {
                    case  83: //s
                        if (loc.fighter && loc.fighter.id === ROGUE) type = SYMBOL_FIGHTER;
                        break;
                    case  67: //c
                        if (loc.fighter && loc.fighter.isShowing()) type = SYMBOL_FIGHTER;
                        break;
                    case  73: //i
                        if (loc.item['a']) {
                            let item = loc.item[EA[Object.keys(loc.item).length - 1]];
                            if (item.isShowing()) type = SYMBOL_ITEM;
                        }

                        break;
                    case  188: //<
                    case  190: //>
                        if (loc.found && loc.stairs && !loc.hidden) type = SYMBOL_STAIRS;
                        break;
                    case  80: //p
                        if (loc.found && loc.enter && loc.enter.portal) type = SYMBOL_ENTER;
                        break;
                    case  84: //t
                        if (loc.found && loc.trap && !loc.hidden) type = SYMBOL_TRAP;
                        break;
                }

                if (!type && keyCode !== 65) { //a
                    if (!loc.found) {
                        type = SYMBOL_BLANK;
                    } else if (loc.wall) {
                        type = SYMBOL_WALL;
                    } else if (loc.door && !loc.hidden) {
                        type = SYMBOL_DOOR;
                    } else if (loc.enter && !loc.enter.portal && !rogue.cdl) {
                        type = SYMBOL_ENTER;
                    } else if (loc.floor) {
                        type = SYMBOL_BLANK;
                    }
                }

                loc.draw(true, type, this.fs);
            }
        }
    },
};

const map = {
    init(town, load) {
        this.coords = [];
        this.queue = new Queue();
        this.enemyList = {};
        this.itemList = {};
        this.staircaseList = {};
        this.portal = null;
        if (load) return;
        let width = town ? IN_WIDTH : WIDTH;
        let height = town ? IN_HEIGHT : HEIGHT;
        for (let i = 0; i < width; i++) {
            this.coords.push([]);
            for (let j = 0; j < height; j++) {
                this.coords[i].push(new Location(i, j));
                if (i === 0 || i === width - 1 || j === 0 || j === height - 1) {
                    this.coords[i][j].indestructible = true;
                    this.coords[i][j].wall = WALL_HP;
                }
            }
        }
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
                            position: LOCATION,
                            x: i,
                            y: j,
                        });
                    }

                    loc.wall = WALL_HP;
                }
            }
        }
    },

    draw(cX, cY) {
        let ctxMain = display.ctxes.main;
        display.clearOne(ctxMain);
        display.image({
            ctx: ctxMain,
            img: display.canvases.buf,
            sx: cX - (IN_WIDTH - 1) / 2,
            sy: cY - IN_HEIGHT / 2,
            sWidth: IN_WIDTH,
            sHeight: IN_HEIGHT,
            dx: -IN_WIDTH / 2, 
            dxPx: display.width / 2,
            dy: 0,
            dWidth: IN_WIDTH,
            dHeight: IN_HEIGHT,
        });
    },

    redraw(cX, cY) {
        display.clearOne(display.ctxes.buf, true)
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                loc.draw();
            }
        }

        rogue.drawStats();
    },

    lighten(init) {
        for (let i = 0, l = this.coords.length; i < l; i++) {
            for (let loc of this.coords[i]) {
                if (loc.hidden) {
                    loc.hidden = false;
                    loc.wall = false;
                } else if (loc.lighten && loc.found) {
                    continue;
                }

                loc.lighten = true;
                loc.found = true;
                loc.draw();
            }
        }

        if (!init) rogue.lightenOrDarken('Lighten');
    },
};

const seeInvisible = (see) => {
    for (let key in map.enemyList) {
        let enemy = map.enemyList[key];
        if (enemy.invisible) {
            map.coords[enemy.x][enemy.y].draw();
            if (!see && rogue.ce && rogue.ce.id === enemy.id) rogue.removeCe();
        }
    }

    map.draw(rogue.x, rogue.y);
}

const hallucinate = {
    all(undo) {
        this.search(map.enemyList, true, undo);
        this.search(map.itemList, false, undo);
        map.redraw(rogue.x, rogue.y);
    },

    search(list, enemy, undo) {
        for (let key in list) {
            if (enemy && list[key].mimic) continue;
            if (!undo) {
                this.one(list[key], enemy);
            } else {
                this.undoOne(list[key]);
            }

            map.coords[list[key].x][list[key].y].getSymbol();
        }
    },

    one(obj, enemy, mimic) {
        let type, tabId;
        if (!obj.nameTemp) obj.nameTemp = {};
        obj.nameTemp['a'] = obj.name['a'];
        obj.nameTemp['b'] = obj.name['b'];
        if (enemy) {
            type = FT[rndInt(FT.length - 1)];
            tabId = rndInt(fighterTab[type].length - 1);
            var fighter = fighterTab[type][tabId];
            obj.name['a'] = fighter.name['a'];
            obj.name['b'] = fighter.name['b'];
            obj.symbol = fighter.symbol;
            obj.color = fighter.color;
        } else {
            type = IT[rndInt(IT.length - 2)];
            obj.typeHalluc = type;
            tabId = rndIntBet(1, itemTab[type].size);
            var item = itemTab[type].get(tabId);
            obj.name['a'] = item.nameReal['a'];
            obj.name['b'] = item.nameReal['b'];
            obj.symbol = item.symbol;
            obj.color = item.color;
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

        if (enemy && fighter.mod === UNIQUE ||
            !enemy && itemUniqueMap[item.type].has(item.tabId) && coinToss()) {
            if (!enemy) {
                if (type === 'amulet' && evalPercentage(1)) {
                    obj.name['a'] = 'Amulet of Yendor';
                    obj.name['b'] = 'イェンダーの魔除け';
                } else {
                    let array = itemUniqueMap[item.type].get(item.tabId);
                    let unique = array[rndInt(array.length - 1)];
                    [obj.name['a'], obj.name['b']] = obj.getUniqueName(unique.name);
                }
            }

            obj.shadow = colorList.gold;
            obj.stroke = colorList.indigo;
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

    draw({
        msg,
        x,
        xPx,
        y,
        color,
        shadow,
        right,
        limit,
    }) {
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        if (color) ctxStats.fillStyle = color;
        if (shadow) ctxStats.shadowColor = shadow;
        if (right) ctxStats.textAlign = 'right';
        display.text({
            ctx: ctxStats,
            msg: msg,
            x: x,
            y: y,
            limit: limit,
            xPx: xPx,
            yPx: display.height + 5,
        });

        ctxStats.restore();
    },

    clear() {
        display.rect({
            ctx: display.ctxes.stats,
            y: -SS,
            yPx: display.height,
            widthPx: display.width,
            height: SS,
            clear: true,
        });
    },

    clearCondition() {
        display.rect({
            ctx: display.ctxes.stats,
            y: -SS - 2,
            yPx: display.height,
            widthPx: display.width,
            height: 2,
            clear: true,
        });
    },

    ShadowAndBar(e) {
        let ctxStats = display.ctxes.stats;
        let width = ctxStats.measureText(e.name).width;
        ctxStats.save();
        ctxStats.shadowColor = colorList.clear;
        ctxStats.fillStyle = colorList.black;
        ctxStats.globalAlpha = 0.5;
        display.rect({
            ctx: ctxStats,
            xPx: display.width / 2 - width / 2 - 3,
            y: MS,
            widthPx: width + 6,
            height: 2,
        });

        ctxStats.fillStyle = e.getConditionColor();
        display.rect({
            ctx: ctxStats,
            xPx: display.width / 2 - width / 2 - 3,
            y: MS + 1,
            widthPx: e.hp / e.hpMax * width + 6,
            height: 1,
        });

        ctxStats.restore();
    },

    drawEnemyBar(e, examine) {
        if (!e) return;
        this.clearEnemyBar();
        if (!(e.isShowing() &&
            (examine || distanceSq(e.x, e.y, rogue.x, rogue.y) <= FOV_SQ &&
            lineOfSight(e.x, e.y, rogue.x, rogue.y)))) {
            return '';
        }
            
        this.ShadowAndBar(e);
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        ctxStats.textAlign = 'center';
        if (e.shadow) ctxStats.shadowColor = e.shadow;
        let name = e.getName(false, true);
        if (e.cursed) ctxStats.fillStyle = colorList.red;
        display.text({
            ctx: ctxStats,
            msg: `Lv${e.lvl} ${name}`,
            x: 0,
            y: MS + 0.5,
            xPx: display.width / 2,
            stroke: e.stroke,
        });

        ctxStats.restore();
        if (examine) return name;
    },

    clearEnemyBar() {
        display.rect({
            ctx: display.ctxes.stats,
            y: MS,
            yPx: -5,
            widthPx: display.width,
            height: 2,
            heightPx: 5,
            clear: true,
        });
    },

    drawCurrentEnemy(enemy) {
        let ctxStats = display.ctxes.stats;
        if (!enemy) return;
        ctxStats.save();
        ctxStats.textAlign = 'center';
        ctxStats.strokeStyle = colorList.gray;
        display.rect({
            ctx: ctxStats,
            x: -1.95,
            xPx: display.width,
            y: -4.45,
            yPx: display.height,
            width: 1,
            height: 1,
            stroke: true,
        });

        let symbol = enemy.symbol;
        ctxStats.fillStyle = enemy.color;
        if (enemy.shadow) ctxStats.shadowColor = enemy.shadow;
        display.text({
            ctx: ctxStats,
            msg: symbol,
            x: -1.5,
            y: -4,
            xPx: display.width,
            yPx: display.height,
            stroke: enemy.stroke,
        });

        ctxStats.restore();
    },
};

const cursol = {
    init() {
        this.x = this.cX = rogue.x;
        this.y = this.cY = rogue.y;
    },

    draw(x, y) {
        display.rect({
            ctx: display.ctxes.cur,
            x: x - IN_WIDTH / 2,
            xPx: display.width / 2,
            y: y,
            width: 1,
            height: 1,
            stroke: true,
        });
    },

    clear(x, y) {
        display.rect({
            ctx: display.ctxes.cur,
            x: x - IN_WIDTH / 2, 
            xPx: display.width / 2 -1,
            y: y,
            yPx: -1,
            width: 1,
            widthPx: 3,
            height: 1,
            heightPx: 3,
            clear: true,
        });
    },

    plot(x, y, color) {
        let X = x - this.cX;
        let Y = y - this.cY + (IN_HEIGHT) / 2;
        let ctxCur = display.ctxes.cur;
        ctxCur.save();
        ctxCur.fillStyle = color;
        ctxCur.globalAlpha = 0.3;
        display.rect({
            ctx: ctxCur,
            x: X - 0.5,
            xPx: display.width / 2,
            y: Y,
            width: 1,
            height: 1,
            clear: true,
        });

        display.text({
            ctx: ctxCur,
            msg: '＊',
            x: X,
            y: Y + 0.5,
            xPx: display.width / 2,
        });

        ctxCur.restore();
    }
};
const Queue = class extends BinaryHeap {
    constructor() {
        super();
    }

    moveAll() {
        while (this.list[0].energy >= 0 && this.list[0].id !== ROGUE) {
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
                position: AWAY,
                summon: true,
			});
		}

        rogue.turn++;
        rogue.healAndHunger();
        if (!flag.rest) map.draw(rogue.x, rogue.y);
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

const Location = class extends Position {
    constructor(x, y) {
        super(x, y);
        this.item = {};
    }

    getType() {
        return this.fighter && this.fighter.isShowing() ? SYMBOL_FIGHTER :
            this.item['a'] && this.item['a'].isShowing() ? SYMBOL_ITEM :
            !this.found ? SYMBOL_BLANK :
            this.enter ? SYMBOL_ENTER :
            this.trap && !this.hidden ? SYMBOL_TRAP :
            this.door && !this.hidden ? SYMBOL_DOOR :
            this.wall ? SYMBOL_WALL :
            this.stairs && !this.hidden ? SYMBOL_STAIRS :
            this.floor ? SYMBOL_FLOOR :
            -1;
    }

    getSymbol(minimap, type) {
        let symbol, color, shadow, stroke;
        if (!type) type = this.getType(); 
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
                let item = this.item[EA[l - 1]];
                let identified = item.identified || rogue.hallucinated;
                symbol = item.symbol;
                color = item.color;
                shadow = identified ? item.shadow : 0;
                stroke = identified ? item.stroke : 0;
                break;
            case SYMBOL_BLANK: 
                symbol = ' ';
                color = colorList.white;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_ENTER:
                let enter = this.enter;
                symbol = enter.symbol;
                color = enter.color;
                shadow = 0;
                stroke = enter.stroke;
                break;
            case SYMBOL_TRAP:
                let trap = this.trap;
                symbol = trap.symbol;
                color = trap.color;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_DOOR:
                symbol = this.isClosedDoor() ? '+' : '\'';
                color = colorList.brown;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_WALL:
                symbol = '#';
                color = this.indestructible ? colorList.brown : colorList.gray;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_STAIRS:
                let stairs = this.stairs;
                symbol = stairs.symbol;
                color = stairs.color;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_FLOOR:
                symbol = '.';
                color = colorList.white;
                shadow = 0;
                stroke = 0;
                break;
        }

        if (!minimap) {
            this.symbol = symbol;
            this.color = color;
            this.shadow = shadow;
            this.stroke = stroke;
        }

        return {symbol: symbol, color: color, shadow: shadow, stroke: stroke};
    }

    draw(minimap, type, fs) {
        let {symbol, color, shadow, stroke} = this.getSymbol(minimap, type);
        let ctx = display.ctxes[minimap ? 'map' : 'buf'];
        let [x, y] = [this.x, this.y];
        if (!minimap) {
            display.rect({
                ctx: ctx,
                x: x,
                y: y,
                width: 1,
                height: 1,
                fs: fs,
                clear: true,
            });
        }
        
        if (rogue.blinded && (!this.fighter || this.fighter.id !== ROGUE)) return;
        ctx.save();
        ctx.fillStyle = color;
        if (rogue.hallucinated && !shadow) ctx.shadowColor = colorList.purple;
        if (shadow && option.shadow.user) ctx.shadowColor = shadow;
        let xPx, yPx;
        if (minimap && !rogue.cdl) {
            xPx = display.width / 4;
            yPx = display.height / 4;
        }

        display.text({
            ctx: ctx,
            msg: symbol,
            x: x + 0.5,
            y: y + 0.5,
            xPx: xPx,
            yPx: yPx,
            fs: fs,
            stroke: stroke,
        });

        if (!minimap && (!rogue.litMapIds[x + ',' + y] || this.wall && this.item['a'])) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = colorList.black;
            ctx.shadowColor = colorList.clear;
            display.rect({
                ctx: ctx,
                x: x,
                y: y,
                width: 1,
                height: 1,
                fs: fs,
            });
		}
		
        ctx.restore();
    }

    getInfo(stepOn) {
        if (flag.examine) {
            let msg = message.get(M_EXAMINE);
            if (rogue.isWizard) msg += message.get(M_EXAMINE_W);
            message.draw(msg + ` (${cursol.x},${cursol.y})`, true);
		}
		
        let msg = '';
        if (flag.examine && this.fighter && this.fighter.id !== ROGUE && this.fighter.isShowing()) {
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
            let item = this.item[EA[l - 1]];
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
		
        this.draw();
        if (rogue.litMapIds[this.x + ',' + this.y]) rogue.lightenOrDarken('Lighten');
    }

    deleteItem(a, quantity = 1) {
        let item = this.item[a];
        item.quantity -= quantity;
        if (!item.quantity) {
            delete map.itemList[item.id];
            deleteAndSortItem(this.item, a);
		}
		
        this.draw();
    }

    deleteTrap(draw) {
        if (this.hidden) this.hidden = false;
        this.trap = null;
        if (draw) this.draw();
    }

    deleteDoor(draw) {
        if (this.hidden) {
            this.hidden = false;
            this.wall = false;
		}
		
        this.door = 0;
        this.floor = true;
        if (draw) this.draw();
    }

    deleteWall(draw) {
        if (this.indestructible) this.indestructible = false;
        this.wall = false;
        this.floor = true;
        if (draw) this.draw();
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
        } else if (this.stairs) {
			name = this.stairs.getName();
		}
		
        message.draw(option.isEnglish() ?
            `You found a hidden ${name}` :
            `隠された${name}を発見した`);
        this.draw();
        if (flag.dash) flag.dash = false;
    }

    isClosedDoor() {
        return this.door === doorIds['close'];
    }

    isObstacle() {
        return this.wall || this.isClosedDoor();
    }

    getDoor(close) {
        this.door = doorIds[close ? 'close' : 'open'];;
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
            loc.draw();
            map.portal = null;
		}

        this.spiralSearch(x, y, 'portal');
        if (this.abort) return;
        let loc = map.coords[this.x][this.y];
        loc.enter = map.portal = this;
        loc.draw();
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
const stairsMap = new Map([
	[DOWN, {
        name: { a: 'down staircase', b: '下り階段' },
        symbol: '>',
        color: colorList.white,
        id: DOWN,
	}],
	
	[UP, {
        name: { a: 'up staircase', b: '上り階段' },
        symbol: '<',
        color: colorList.white,
        id: UP,
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
        if (!this.hidden) loc.draw();
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
        if (i === LEFT) { //0
            if (this.id % CAVE_NUM_COL === 0) return null;
            x = this.x;
            y = rndIntBet(this.y + 1, this.y + this.height - 2);
        } else if (i === DOWN) { //1
            if (Math.floor(this.id / CAVE_NUM_COL) === CAVE_NUM_ROW - 1) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y + this.height - 1;
        } else if (i === UP) { //2
            if (Math.floor(this.id / CAVE_NUM_COL) === 0) return null;
            x = rndIntBet(this.x + 1, this.x + this.width - 2);
            y = this.y;
        } else { //3 RIGHT
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
                type = FT[rndInt(FT.length - 2)];
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
                            position: LOCATION,
                            x: i,
                            y: j,
                            magic: magic,
                            boost: boost,
                        });
                    } else {
                        creation.trap(1, RANDOM, LOCATION, i, j);
                    }
				}
				
                if ((!loc.trap || !loc.trap.protection) && evalPercentage(25)) {
                    creation.enemy({
                        type: type,
                        position: LOCATION,
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
                entrance.init(LOCATION, x, y);
			}
			
            [x, y] = [this.x + BUILD_WIDTH - 1, this.y + BUILD_HEIGHT - 1];
            name = this.id === 0 ? 'book' : 'general';
        } else if (this.id === 2 || this.id === 3) {
            if (this.id === 2) {
				[x, y] = [this.x, this.y];
                let entrance = new Entrance('blacksmith');
                entrance.init(LOCATION, x, y);
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
        entrance.init(LOCATION, x, y);
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
        entrance.init(LOCATION, POSITION.stash.x, POSITION.stash.y);
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
    shadow(direction) {
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.shadowColor = colorList.clear
        ctxInv.globalAlpha = 0.9;
        ctxInv.fillStyle = colorList.black;
        let offsetY = MS - 0.5;
        if (direction === LEFT || direction === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}

		if (direction === RIGHT || direction === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                xPx: display.width /2,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}
		
		ctxInv.restore();
	},
	
    clear() {
        display.clearOne(display.ctxes.inv);
	},
	
    show(list, direction, a, place, enter) {
        if (flag.shop) {
            var quantity2 = !rogue.cn ? 1 : Number(rogue.cn);
            if (a && quantity2 > list[a].quantity) quantity2 = list[a].quantity;
        } else if (place === P_STASH) {
			var l = (enter.page - 1) * MAX_PACK_COUNT;
		}

        this.shadow(direction);
        let i = 1;
        let j = MS + 0.5;
        let right = direction === RIGHT ? display.width / 2 : 0;
        let count = 0;
        let weight = 0.0;
        let ctxInv = display.ctxes.inv;
        for (let key in list) {
            let item = list[key];
            if (!flag.pack && !item ||
                place === P_STASH && key < l ||
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

            ctxInv.save();
            ctxInv.textAlign = 'center';
            let char;
            if (place === P_STASH) {
                char = EA[key - l].toUpperCase();
			} else {
				char = direction === RIGHT ? key : key.toUpperCase();
			}

            display.text({
                ctx: ctxInv,
                msg: char,
                x: i,
                y: j,
                xPx: right,
            });

            if (flag.pack && !item || flag.option || flag.cure) {
                if (!flag.pack) {
                    ctxInv.textAlign = 'left';
                    display.text({
                        ctx: ctxInv,
                        msg: item[option.getLanguage()],
                        x: i + 1,
                        y: j,
                        limit: 14,
                        xPx: right,
                    });

                    ctxInv.textAlign = 'right';
                    if (flag.cure) {
                        let cost = enter.list[key].cost;
                        display.text({
                            ctx: ctxInv,
                            msg: `$${cost}`,
                            x: -0.5,
                            y: j,
                            xPx: display.width / 2 + right,
                        });
                    } else if (!flag.option2) {
                        let msg = '';
                        let opt = option[item['key']];
                        if (opt.choise) {
                            msg = opt.choise[opt.user][option.getLanguage()];
						} else if (option.isEnglish()) {
                            msg = opt.user ? 'yes' : 'no';
						} else {
							msg = opt.user ? 'はい' : 'いいえ';
						}

                        display.text({
                            ctx: ctxInv,
                            msg: msg,
                            x: -0.5,
                            y: j,
                            xPx: display.width / 2 + right,
                        });
                    }
				}
				
                j++;
                ctxInv.restore();
                continue;
			}
			
            ctxInv.fillStyle = item.color;
            if (item.shadow) ctxInv.shadowColor = item.shadow;
            display.text({
                ctx: ctxInv,
                msg: item.symbol,
                x: i + 1,
                y: j,
                xPx: right,
                stroke: item.stroke,
            });

            if (item.cursed && item.identified) {
                ctxInv.fillStyle = colorList.red;
			} else if (item.equipable && !item.durab) {
                ctxInv.fillStyle = colorList.gray;
			} else {
				ctxInv.fillStyle = colorList.white;
			}

            ctxInv.textAlign = 'left';
            let name = item.getName(false, item.quantity, option.getLanguage(), flag.gamble && place === P_SHOP);
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 1.5,
                y: j,
                limit: 15,
                xPx: right,
                stroke: item.stroke,
            });

            ctxInv.fillStyle = colorList.white;
            ctxInv.shadowColor = colorList.clear;
            ctxInv.textAlign = 'right';
            if (flag.shop || flag.blacksmith) {
                let price = flag.shop ? item.price * quantity2 : item.getDurabPrice();
                display.text({
                    ctx: ctxInv,
                    msg: `$${price}`,
                    x: -2.5,
                    y: j,
                    limit: 3.5,
                    xPx: display.width / 2 + right,
                });
			}
			
            let quantity;
            if (place === P_SHOP || flag.shop && flag.number) {
                quantity = quantity2;
			} else {
                quantity = item.quantity;
                weight += item.weight * quantity;
			}
			
            display.text({
                ctx: ctxInv,
                msg: (item.weight * quantity).toFixed(1),
                x: -0.5,
                y: j++,
                xPx: display.width / 2 + right,
                limit: 1.8,
            });

            ctxInv.restore();
            if (++count === MAX_PACK_COUNT) break;
		}
		
        if (flag.option || flag.cure) return;
        let maxNum = this.getMaxNumber(place);
        if (place === P_STASH) {
            let lenStash = enter.list.length;
            count += (enter.page - 1) * MAX_PACK_COUNT;
            if (count > lenStash) count = lenStash;
        }

        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS - .9,
            xPx: right,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let msg = '';
        if (place === P_SHOP) {
            let weight = option.isEnglish() ? 'Weight' : '重量';
            msg = `${weight} x${quantity2}`;
        } else if (place === P_STASH) {
            msg = ` [${enter.page}/${MAX_STASH_PAGE}]`;
		} else {
            if (flag.gain) {
                let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
                msg = `${skillPoints} ${rogue.skillPoints} `;
			}
			
            let total = option.isEnglish() ? 'Total' : '計';
            msg += `${total} ${weight.toFixed(1)}kg`;
		}
		
        if (flag.shop) {
            let sellOrCost;
            if (direction === RIGHT) {
                sellOrCost = option.isEnglish() ? 'Sell Value' : '売値';
			} else {
				sellOrCost = option.isEnglish() ? 'Cost' : '買値';
			}

            msg = `${sellOrCost} x${quantity2} ${msg}`;
		}
		
        display.text({
            ctx: ctxInv,
            msg: msg,
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2 + right,
            yPx: display.height,
        });

        ctxInv.restore();
	},
	
    getMaxNumber(place) {
        let maxNum;
        switch (place) {
            case P_PACK:
            case P_FLOOR:
            case P_SHOP:
                maxNum = MAX_PACK_COUNT;
                break;
            case P_BOX:
                maxNum = rogue.numBoxes < MAX_BOX_NUM ? rogue.numBoxes : MAX_BOX_NUM;
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
	
    sort(a, list, array) {
        let found = false;
        let item = list[a];
        let index = IT.indexOf(list[a].type);
        for (let key in list) {
            let item2 = list[key];
            let index2 = IT.indexOf(item2.type);
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
                let i = EA.indexOf(a);
                let j = EA.indexOf(key);
                for (let k = i; k > j; k--) {
					[list[EA[k]], list[EA[k - 1]]] = [list[EA[k - 1]], list[EA[k]]];
				}
				
                return;
            }
		}
		
        return a; //stash page
    }
}
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
        tRate: 6,
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
            [HORN_UNICORN, { name: { a: 'Unicorn Horn', b: 'ユニコーン・ホーン' }, rarity: 90, color: colorList.white }],
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
            [METAL_ADAMANTITE, { name: { a: 'Adamantite', b: 'アダマンタイト' }, rarity: 80, color: colorList.steel }],
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
            gem: { fire: '1d5' },
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
            gem: { water: '1d5' },
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
            gem: { air: '1d5' },
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
            gem: { earth: '1d5' },
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
            gem: { poison: '1d5' },
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
            gem: { fire: '1d10'},
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
            gem: { water: '1d10' },
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
            gem: { air: '1d10' },
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
            gem: { earth: '1d10' },
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
            gem: { poison: '1d10' },
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
            shield: { resistAll: '1d10' },
            armor: { resistAll: '1d5' },
            cloak: { resistAll: '1d5' },
            belt: { resistAll: '1d5' },
            helm: { resistAll: '1d5' },
            gloves: { resistAll: '1d5' },
            boots: { resistAll: '1d5' },
            amulet: { resistAll: '1d5' },
            ring: { resistAll: '1d5' },
            light: { resistAll: '1d5' },
            gem: { resistAll: '1d3' },
            enemy: { resistAll: '1d10' }
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
            rarity: 30,
            cloak: { spd: '1d4' },
            boots: { spd: '1d4' },
            ring: { spd: '1d4' },
            amulet: { spd: '1d4' },
            gem: { spd: 1 },
            enemy: { spd: '1d4' }
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
            gem: { hp: '1d5' },
            enemy: { hp: '2d5' }
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
            light: { hpReg: '1d10' },
            belt: { hpReg: '2d10' },
            amulet: { hpReg: '2d10' },
            ring: { hpReg: '1d10' },
            gem: { hpReg: '1d5' },
            enemy: { hpReg: '2d10' }
		},
		
        {
            name: { a: 'of Mana Regeneration', b: '魔力回復' },
            lvl: 5,
            rarity: 50,
            light: { mpReg: '1d10' },
            belt: { mpReg: '2d10' },
            amulet: { mpReg: '2d10' },
            ring: { mpReg: '1d10' },
            gem: { mpReg: '1d5' },
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
            gem: { ias: '1d5' },
            enemy: { ias: '5d2' }
		},
		
        {
            name: { a: 'of Faster Cast', b: '詠唱速度' },
            lvl: 10,
            rarity: 20,
            staff: { fcr: '5d2' },
            helm: { fcr: '5d2' },
            amulet: { fcr: '5d2' },
            gem: { fcr: '1d5' },
            enemy: { fcr: '5d2' }
		},
		
        {
            name: { a: 'of Faster Run Walk', b: '早足' },
            lvl: 10,
            rarity: 20,
            cloak: { frw: '2d4' },
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
            lvl: 5,
            rarity: 20,
            melee: { stealLife: '1d3' },
            missile: { stealLife: '1d3' },
            staff: { stealLife: '1d3' },
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
            staff: { stealMana: '1d3' },
            gloves: { stealMana: '1d3' },
            ring: { stealMana: '1d3' },
            gem: { stealMana: 1 },
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
            gem: { dmgBonus: '1d10' },
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
            light: { rateBonus: '10d3' },
            gem: { rateBonus: '1d10' },
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
            gem: { acBonus: '1d10' },
            enemy: { acBonus: '10d3' }
		},
		
        {
            name: { a: 'of Experience', b: '経験' },
            lvl: 15,
            rarity: 50,
            amulet: { expBonus: '2d5' },
            ring: { expBonus: '1d5' },
            gem: { expBonus: 1 },
		},
		
        {
            name: { a: 'of Stealth', b: '隠密' },
            lvl: 1,
            rarity: 0,
            missile: { stealth: '2d10' },
            cloak: { stealth: '2d10' },
            boots: { stealth: '2d10' },
            amulet: { stealth: '2d10' },
            gem: { stealth: '1d10' },
            enemy: { stealth: '2d10' }
		},
		
        {
            name: { a: 'of Detection', b: '探知' },
            lvl: 1,
            rarity: 0,
            staff: { searching: '2d10' },
            helm: { searching: '2d10' },
            gloves: { searching: '2d10' },
            ring: { searching: '1d10' },
            light: { searching: '2d10' },
            gem: { searching: '1d5' },
            enemy: { searching: '2d10' }
		},
		
        {
            name: { a: 'of Slow Digestion', b: '遅消化' },
            lvl: 1,
            rarity: 0,
            shield: { digest: '2d10' },
            armor: { digest: '2d10' },
            belt: { digest: '2d10' },
            amulet: { digest: '2d10' },
            ring: { digest: '1d10' },
            gem: { digest: '1d5' },
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
            gem: { durabBonus: '1d5' },
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
        spd: 20,
        skillFire: 20,
        skillWater: 20,
        skillAir: 20,
        skillEarth: 20,
        skillPoison: 20,
        skillAll: 20,
        dmgDiceNum: 50,
        dmgDiceSides: 20,
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

    investigate(direction, char) {
        if (char && this.mimic && !this.identified) return;
        inventory.shadow(direction);
        let i = 1;
        let j = MS + 1;
        let xPx = direction === RIGHT ? display.width / 2 : 0;
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
            xPx: xPx,
            stroke: this.stroke,
        });

        if (this.cursed) {
            ctxInv.fillStyle = colorList.red;
        } else if (this.equipable && !this.durab) {
            ctxInv.fillStyle = colorList.gray;
        } else {
            ctxInv.fillStyle = colorList.white;
        }

        ctxInv.textAlign = 'left';
        let name = char ? this.getName(false, true) : this.getName(false, 1);
        display.text({
            ctx: ctxInv,
            msg: name,
            x: i + 0.6,
            y: j++,
            xPx: xPx,
            limit: 17.5,
            stroke: this.stroke,
        });

        j += 0.75;
        ctxInv.fillStyle = colorList.white;
        ctxInv.shadowColor = colorList.clear;
        let limit = char ? 47 : 23;
        if (this.desc) {
            this.desc[option.getLanguage()].replace(/\t/g, '').split('\n').forEach((value, key) => {
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: i - 0.5,
                    y: j,
                    xPx: xPx,
                    limit: limit,
                });

                j += 1.1
            });
        } else if (this.nameSkill) {
            let msg = rogue.getSkillInfo(skillMap.get(this.nameSkill), this.skillLvl, true);
            display.text({
                ctx: ctxInv,
                msg: msg,
                x: i - 0.5,
                y: j++,
                xPx: xPx,
                limit: limit,
            });
        }

        j += 0.75;
        if (char) j++;
        ctxInv.restore();
        let mod;
        let count = 0;
        let jSaved = j;
        let fs;
        if (char) fs = display.fs - 3;
        for (let [key, term] of investigationMap.entries()) {
            if (!term) {
                if (key === 'mod' && !char) {
                    mod = true;
                    if (this.modParts) break;
                    xPx += display.width / 4;
                    j = jSaved;
				}
				
                continue;
			}
			
            if (!char && (term.char || mod&&!this[key]) ||
                char && term.item ||
                this[key] === undefined) {
				continue;
            }
            
            this.investigateLoop(char, ctxInv, key, term, this[key], mod, i, j, fs, xPx);
            j += 1.05;
            if (key === 'embeddedNum' && this[key]) {
                for (let k = 0, l = this.embeddedList.length; k < l; k++) {
                    ctxInv.save();
                    let item = this.embeddedList[k]
                    let name = item.getName();
                    if (item.shadow) ctxInv.shadowColor = item.shadow;
                    if (item.cursed) ctxInv.fillStyle = colorList.red;
                    display.text({
                        ctx: ctxInv,
                        msg: name,
                        x: i + 0.5,
                        y: j,
                        xPx: xPx,
                        limit: 10,
                        stroke: item.stroke,
                    });

                    j += 1.05;
                    ctxInv.restore();
                }
			}
			
            if (char && !(++count % /*18*/ 21)) {
                xPx += display.width / 5;
                j = jSaved;
			} else if (mod) {
                if (j * display.fs > display.height - SS * display.fs) break;
            }
        }
        
        if (this.modParts) {
            j++;
            for (let key in this.modParts) {
                ctxInv.textAlign = 'right';
                display.text({
                    ctx: ctxInv,
                    msg: option.isEnglish() ? key : translation.item[key],
                    x: i - 4.5,
                    y: j,
                    xPx: xPx + display.width / 4,
                    limit: 10,
                });

                ctxInv.textAlign = 'left';
                let objMod = this.modParts[key];
                
                if (this.type === 'orb') {
                    for (let key2 in objMod) {
                        let term = investigationMap.get(key2);
                        this.investigateLoop(false, ctxInv, key2, term, objMod[key2], true, i - 3, j, undefined, xPx + display.width / 4);
                        j += 1.1;
                    }
                } else {
                    let mod;
                    for (let [key2, term] of investigationMap.entries()) {
                         if (!mod || !term || term.char || !objMod[key2]) {
                            if (key2 === 'mod') mod = true;
                            continue;
                        }

                        this.investigateLoop(false, ctxInv, key2, term, objMod[key2], true, i - 3, j, undefined, xPx + display.width / 4);
                        j += 1.1;
                        if (j * display.fs > display.height - SS * display.fs) break;
                    }
                }
            }
        }
    }

    investigateLoop(char, ctxInv, key, term, value, mod, i, j, fs, xPx) {
        ctxInv.save();
        if (fs) {
            let fontStyle = FONT_STYLE[option.getLanguage()];
            ctxInv.font = fs - 1 + 'px ' + fontStyle;
        }
    
        let msg = term.name[option.getLanguage()];
        if (term.plus && !char && value > 0) value = '+' + value;
        if (term.perc) value += '%';
        if (term.weight) value += 'kg';
        if (key === 'atkType') {
            value = this.getAtkTypeName();
        } else if (char) {
            if (this.findBuffStat(key) || this.modList &&
            (this.modList[key] || this.modList['resistAll'] &&
            (key === 'fire' || key === 'water' || key === 'air' || key === 'earth' || key === 'poison'))) {
                ctxInv.shadowColor = colorList.buff;
            }
        } else if (mod) {
            ctxInv.shadowColor = colorList.buff;
        }

        if (term.max && this[term.max] !== undefined) {
            let max = this[term.max];
            if (term.perc) max += '%';
            if (term.weight) max += 'kg';
            value += ` (${max})`;
        }

        if (term.bool) {
            if (value) {
                value = option.isEnglish() ? 'yes' : '有り';
            } else {
                value = option.isEnglish() ? 'no' : '無し';
            }
        }
        
        if (key === 'material') {
            value = materialMap.get(value).name[option.getLanguage()];
        }
        
        let rightPx = display.width / (char ? 5 : 4);
        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: value,
            x: i - 1.5,
            y: j,
            xPx: xPx + rightPx,
            limit: 4.5,
            fs: fs,
        });

        ctxInv.textAlign = 'left';
        display.text({
            ctx: ctxInv,
            msg: msg,
            x: i - 0.5,
            y: j,
            xPx: xPx,
            limit: 6,
            fs: fs,
        });

        ctxInv.restore();
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
        
        if (!char) this.durabRate = durabRate;
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
        this.density = mat.density;
        this.hardness = mat.hardness;
        this.toughness = mat.toughness;
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
        if (this.mod !== UNIQUE) {
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
            
            color = pre.color;
            if (!(this.material & M_GEM)) {
                namePreA = pre.name['a'] + ' ';
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
            this.modList = {};
            copyObj(this.modList, unique.values);
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
        item.weight = WEIGHT[item.type];
        item.priceRate = materialMap.get(material).pRate;
        item.__proto__ = Item.prototype;
        item.symbolReal = item.symbol = char ? '\'' : '`';
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
				value += isFinite(mod) ? mod : dice.roll(mod);
			}
		}
		
        obj[key] ? obj[key] += value : obj[key] = value;
	}
}
const [ //book
	B_BLANK_PAPER,
	B_ALCHEMY_1,
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
	P_EXTRA_HEALING,
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
	P_MANA,
	P_SPEED,
	P_SEE_INVISIBLE,
	P_RAISE_LEVEL,
	P_ENLIGHTENMENT,
	P_Lower_Resist,
	P_CURE_ALL,
	P_RESTORE_EXPERIENCE,
	P_LETHE,
] = enums(1, 35);

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
	M_AXE,
	M_TWO_HANDED_AXE,
	M_PICK,
	M_MAUL,
    M_TWO_HANDED_HAMMER,
] = enums(1, 10);

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
    RECIPE_WAND,
    RECIPE_CHARGE_BOOK,
    RECIPE_TORCH,
    RECIPE_LAMP,
    RECIPE_EMBED,
    RECIPE_REMOVE,
    RECIPE_EXTEND,
    RECIPE_MATERIALIZE,
] = enums(1, 10);

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
                a: 'Torches [2-4] -> Torch [duration sum]',
                b: '松明 [2-4] -> 松明 [期間 計]'
            }
		}],

        [RECIPE_LAMP, {
            nameReal: { a: 'Lamp', b: 'ランプ' },
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            cost: 1,
            recipe:{
                a: 'Lamps or Lanthanums + oil [2-4] -> Light Source [duration sum]',
                b: 'ランプまたはランタン + オイル [2-4] -> ランプまたはランタン [期間 計]'
            }
		}],

        [RECIPE_EMBED, {
            nameReal: { a: 'Embed', b: '埋め込み' },
            priceRate: 1,
            lvl: 5,
            rarity: 5,
            cost: 5,
            recipe:{
                a: 'Embeddable Equipment + The Same Materials・Jewel・Orb -> Equipment [Materials・Jewel・Orb]',
                b: '埋め込み可能な装備品 + 同素材・ジュエル・オーブ -> 装備品 [素材・ジュエル・オーブ]'
            }
		}],

        [RECIPE_REMOVE, {
            nameReal: { a: 'Remove', b: '取り外し' },
            priceRate: 1,
            lvl: 10,
            rarity: 10,
            cost: 1,
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
            cost: 10,
            recipe:{
                a: 'Potion of Healing [3] -> Potion of Extra Healing',
                b: '回復の薬 [3] -> 特大回復の薬'
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
		
        [B_ALCHEMY_1, {
            nameReal: { a: 'Alchemy for Beginners', b: '初級錬金術' },
            color: colorList.red,
            type2: 'recipe',
            priceRate: 1,
            lvl: 1,
            rarity: 0,
            abort: true
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
                p: SLEEPING_GAS
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
                c: POISON_MIST,
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
                p: MAGIC_MAPPING,
                q: VENOM_HANDS,
                r: HOLD_MONSTER
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
                e: TOWN_PORTAL,
                f: RESTORE_DURABILITY,
                g: GRAVITATIONAL_FIELD,
                h: CURE_ALL,
                i: SATISFY_HUNGER,
                j: RESTORE_ALL,
                k: RESIST_ALL,
                l: RESTORE_EXPERIENCE,
                m: EARTHQUAKE,
                n: HALLUCINATING_MIST
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
                n: TOWN_PORTAL,
                o: RESTORE_DURABILITY,
                p: REPAIR_ALL,
                q: ENCHANT_SELF,
                r: EARTHQUAKE
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
				d: DISINTEGRATION
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
            duration: 2500,
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
		
        [P_EXTRA_HEALING, {
            nameReal: { a: 'Extra Healing', b: '特大回復' },
            nameSkill: EXTRA_HEAL,
            skillLvl: 10,
            priceRate: 4,
            lvl: 15,
            rarity: 30
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
		
        [P_MANA, {
            nameReal: { a: 'Mana', b: '魔力回復' },
            nameSkill: MANA,
            skillLvl: 10,
            priceRate: 2,
            shop: true,
            lvl: 1,
            rarity: 10
		}],
		
        [P_SPEED, {
            nameReal: { a: 'Speed', b: '速度' },
            nameSkill: SPEED,
            skillLvl: 5,
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
            skillLvl: 20,
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
            skillLvl: 20,
            priceRate: 5,
            lvl: 30,
            rarity: 80
        }],
	]),
	
    melee: new Map([
        //sword
        [M_KNIFE, {
            nameReal: { a: 'Knife', b: 'ナイフ' },
            symbol: '|',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -10,
            volumeRate: 0.3,
            embeddedLimit: 2,
            atkType: AT_S | AT_T,
            edge: 1,
            material: M_WOOD | M_BONE
		}],
		
        [M_DAGGER, {
            nameReal: { a: 'Dagger', b: '短剣' },
            symbol: '|',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -10,
            volumeRate: 0.5,
            embeddedLimit: 3,
            atkType: AT_S | AT_T,
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
            atkType: AT_S,
            edge: 2,
            material: M_METAL | M_STONE
		}],
		
        //polearm	
        [M_SPEAR, {
            nameReal: { a: 'Spear', b: '槍' },
            symbol: '/',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_T,
            material: M_METAL
		}],
		
        //misc	
        [M_CLUB, {
            nameReal: { a: 'Club', b: '棍棒' },
            symbol: '￥',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 0.6,
            embeddedLimit: 3,
            atkType: AT_B,
            material: M_WOOD | M_BONE
		}],
		
        [M_AXE, {
            nameReal: { a: 'Axe', b: '斧' },
            symbol: '/',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 10,
            volumeRate: 2,
            embeddedLimit: 4,
            atkType: AT_S,
            edge: 1,
            material: M_METAL
		}],
		
        [M_TWO_HANDED_AXE, {
            nameReal: { a: 'Two-handed Axe', b: '両手斧' },
            symbol: '/',
            lvl: 5,
            rarity: 20,
            iasBase: 15,
            volumeRate: 3,
            embeddedLimit: 5,
            atkType: AT_S,
            twoHanded: true,
            edge: 1,
            material: M_METAL
		}],
		
        [M_PICK, {
            nameReal: { a: 'Pick', b: 'ピック' },
            symbol: '￥',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 5,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_T,
            digging: 1,
            material: M_METAL
		}],
		
        [M_MAUL, {
            nameReal: { a: 'Maul', b: '大木槌' },
            symbol: '￥',
            lvl: 5,
            rarity: 20,
            iasBase: 20,
            volumeRate: 4,
            embeddedLimit: 5,
            atkType: AT_B,
            twoHanded: true,
            material: M_WOOD
		}],
		
        [M_TWO_HANDED_HAMMER, {
            nameReal: { a: 'Two-handed Hammer', b: '両手槌' },
            symbol: '￥',
            lvl: 10,
            rarity: 40,
            iasBase: 25,
            volumeRate: 4,
            embeddedLimit: 6,
            atkType: AT_B,
            twoHanded: true,
            material: M_METAL | M_STONE
        }],
	]),
	
    missile: new Map([
        [M_SLING, {
            nameReal: { a: 'Sling', b: 'スリング' },
            throwType: 'sling',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 0,
            volumeRate: 0.5,
            embeddedLimit: 2,
            atkType: AT_B,
            material: M_SKIN
		}],
		
        [M_STAFF_SLING, {
            nameReal: { a: 'Staff Sling', b: '棒スリング' },
            throwType: 'sling',
            lvl: 5,
            rarity: 20,
            iasBase: 5,
            volumeRate: 0.8,
            embeddedLimit: 3,
            atkType: AT_B,
            material: M_WOOD
		}],
		
        [M_BOW, {
            nameReal: { a: 'Bow', b: '弓' },
            throwType: 'bow',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: -10,
            volumeRate: 0.5,
            embeddedLimit: 4,
            atkType: AT_T,
            twoHanded: true,
            material: M_WOOD | M_BONE | M_HORN
		}],
		
        [M_CROSSBOW, {
            nameReal: { a: 'Crossbow', b: 'クロスボウ' },
            throwType: 'crossbow',
            shop: true,
            lvl: 1,
            rarity: 0,
            iasBase: 5,
            volumeRate: 1.5,
            embeddedLimit: 4,
            atkType: AT_T,
            twoHanded: true,
            material: M_WOOD | M_METAL
        }],
	]),
	
    staff: new Map([
        [S_STICK, {
            nameReal: { a: 'Stick', b: 'スティック' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: -10,
            volumeRate: 0.5,
            embeddedLimit: 2,
            atkType: AT_B,
            material: M_WOOD
		}],
		
        [S_ROD, {
            nameReal: { a: 'Rod', b: 'ロッド' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: -10,
            volumeRate: 0.7,
            embeddedLimit: 3,
            atkType: AT_B,
            material: M_METAL
		}],
		
        [S_STAFF, {
            nameReal: { a: 'Staff', b: '杖' },
            shop: true,
            lvl: 1,
            rarity: 0,
            fcrBase: -15,
            volumeRate: 1,
            embeddedLimit: 4,
            atkType: AT_B,
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
            dmgBase: '2d1',
            atkType: AT_B,
            lvl: 1,
            rarity: 0
		}],
		
        [A_ARROW, {
            nameReal: { a: 'Arrow', b: '矢' },
            color: colorList.brown,
            throwType: 'bow',
            weight: 0.02,
            priceRate: 2,
            shop: true,
            dmgBase: '1d2',
            atkType: AT_T,
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
            dmgBase: '1d3',
            atkType: AT_T,
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
        [A_ROBE, {
            nameReal: { a: 'Robe', b: 'ローブ' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_CLOTH | M_FEATHER
		}],
		
        [A_VESTMENT, {
            nameReal: { a: 'Vestment', b: '法衣' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.6,
            embeddedLimit: 4,
            material: M_GEM
		}],
		
        [A_VEST, {
            nameReal: { a: 'Vest', b: 'ベスト' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.8,
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
            volumeRate: 1.2,
            embeddedLimit: 5,
            material: M_METAL | M_WOOD
		}],
		
        [A_PLATE_MAIL, {
            nameReal: { a: 'Plate Mail', b: '板金鎧' },
            lvl: 10,
            rarity: 40,
            volumeRate: 1.5,
            embeddedLimit: 6,
            material: M_METAL | M_STONE
        }],
	]),
	
    cloak: new Map([
        [C_MANTLE, {
            nameReal: { a: 'Mantle', b: 'マント' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.8,
            embeddedLimit: 2,
            material: M_FEATHER | M_SCALE
		}],
		
        [C_COAT, {
            nameReal: { a: 'Coat', b: 'コート' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 2,
            material: M_FUR | M_SKIN
		}],
		
        [C_CLOAK, {
            nameReal: { a: 'Cloak', b: 'クローク' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 1.2,
            embeddedLimit: 2,
            material: M_CLOTH
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
        [H_CIRCLET, {
            nameReal: { a: 'Circlet', b: '冠' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.2,
            embeddedLimit: 2,
            material: M_FEATHER | M_PLATING
		}],
		
        [H_CAP, {
            nameReal: { a: 'Cap', b: '帽子' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_CLOTH | M_FUR | M_SKIN | M_SCALE
		}],
		
        [H_CROWN, {
            nameReal: { a: 'Crown', b: '王冠' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.7,
            embeddedLimit: 4,
            material: M_GEM
		}],
		
        [H_MASK, {
            nameReal: { a: 'Mask', b: '仮面' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.8,
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
        [G_MITTEN, {
            nameReal: { a: 'Mitten', b: 'ミトン' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_CLOTH | M_FUR | M_FEATHER
		}],
		
        [G_BRACER, {
            nameReal: { a: 'Bracer', b: 'ブレイサー' },
            lvl: 5,
            rarity: 60,
            volumeRate: 0.7,
            embeddedLimit: 4,
            material: M_GEM
		}],
		
        [G_VAMBRACE, {
            nameReal: { a: 'Vambrace', b: '腕甲' },
            shop: true,
            lvl: 1,
            rarity: 0,
            volumeRate: 0.8,
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
            iasBase: 10,
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
            frwBase: -10,
            volumeRate: 0.5,
            embeddedLimit: 2,
            material: M_CLOTH | M_FEATHER
		}],
		
        [B_SHOES, {
            nameReal: { a: 'Shoes', b: '短靴' },
            shop: true,
            lvl: 1,
            rarity: 0,
            frwBase: -5,
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
            frwBase: 5,
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
            duration: 5000,
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
            duration: 10000,
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
            duration: 7500,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_METAL
        }],
	]),
	
    amulet: new Map([
        [A_AMULET, {
            nameReal: { a: 'Amulet', b: '首飾り' },
            color: colorList.orange,
            mod: MAGIC,
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
            mod: MAGIC,
            lvl: 1,
            rarity: 0,
            volumeRate: 1,
            embeddedLimit: 1,
            material: M_METAL | M_STONE
        }],
        
        [R_RING_GEM, {
            nameReal: { a: 'Ring', b: '指輪' },
            color: colorList.red,
            mod: MAGIC,
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
            mod: MAGIC,
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
            nameReal: { a: '<Kingship>', b: '<王国>' },
            color: colorList.olive,
            lvl: 1,
            rarity: 0,
            modParts: {
                melee: { digging: 2 },
                missile: { stealth: 20 },
                staff: { searching: 20 },
                shield: { digest: 20 },
                amulet: { stealth: 20 },
                ring: { searching: 20 },
                light: { searching: 20 },
                armor: { digest: 20 },
                cloak: { stealth: 20 },
                belt: { digest: 20 },
                helm: { searching: 20 },
                gloves: { searching: 20 },
                boots: { stealth: 20 },
            }
        }],

        [O_YESOD, {
            name: { a: '<9>', b: '<9>' },
            nameReal: { a: '<Foundation>', b: '<基礎>' },
            color: colorList.purple,
            lvl: 4,
            rarity: 5,
            modParts: {
                melee: { dmgBonus: 25 },
                missile: { rateBonus: 25 },
                staff: { acBonus: 10 },
                shield: { acBonus: 25 },
                amulet: { acBonus: 10 },
                ring: { dmgBonus: 25 },
                light: { rateBonus: 25 },
                armor: { acBonus: 25 },
                cloak: { acBonus: 25 },
                belt: { acBonus: 25 },
                helm: { acBonus: 25 },
                gloves: { acBonus: 25 },
                boots: { acBonus: 25 },
            }
        }],

        [O_HOD, {
            name: { a: '<8>', b: '<8>' },
            nameReal: { a: '<Splendour>', b: '<栄光>' },
            color: colorList.orange,
            lvl: 7,
            rarity: 10,
            modParts: {
                melee: { stealLife: 5 },
                missile: { stealLife: 5 },
                staff: { stealLife: 5 },
                shield: { hp: 15 },
                amulet: { gf: 40 },
                ring: { gf: 40 },
                light: { hpReg: 20 },
                armor: { hp: 20 },
                cloak: { gf: 40 },
                belt: { hpReg: 20 },
                helm: { gf: 40 },
                gloves: { stealLife: 5 },
                boots: { gf: 40 },
            }
        }],

        [O_NETZACH, {
            name: { a: '<7>', b: '<7>' },
            nameReal: { a: '<Eternity>', b: '<勝利>' },
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
            nameReal: { a: '<Beauty>', b: '<美>' },
            color: colorList.yellow,
            lvl: 13,
            rarity: 20,
            modParts: {
                melee: { stealMana: 5 },
                missile: { stealMana: 5 },
                staff: { stealMana: 5 },
                shield: { mp: 15 },
                amulet: { mf: 20 },
                ring: { mf: 20 },
                light: { mpReg: 20 },
                armor: { mp: 20 },
                cloak: { mf: 20 },
                belt: { mpReg: 20 },
                helm: { mf: 20 },
                gloves: { stealMana: 5 },
                boots: { mf: 20 },
            }
        }],

        [O_GEVURAH, {
            name: { a: '<5>', b: '<5>' },
            nameReal: { a: '<Severity>', b: '<峻厳>' },
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
                gloves: { str: 1 },
                boots: { fire: 20 },
            }
        }],

        [O_CHESED, {
            name: { a: '<4>', b: '<4>' },
            nameReal: { a: '<Kindness>', b: '<慈悲>' },
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
                helm: { int: 1 },
                gloves: { atkCold: 20 },
                boots: { water: 20 },
            }
        }],

        [O_BINAH, {
            name: { a: '<3>', b: '<3>' },
            nameReal: { a: '<Understanding>', b: '<理解>' },
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
                belt: { con: 1 },
                helm: { earth: 20 },
                gloves: { atkSlow: 20 },
                boots: { earth: 20 },
            }
        }],

        [O_CHOKHMAH, {
            name: { a: '<2>', b: '<2>' },
            nameReal: { a: '<Wisdom>', b: '<知恵>' },
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
                cloak: { spd: 5 },
                belt: { air: 20 },
                helm: { air: 20 },
                gloves: { dmgLightning: 20 },
                boots: { dex: 1 },
            }
        }],

        [O_KETER, {
            name: { a: '<1>', b: '<1>' },
            nameReal: { a: '<Crown>', b: '<王冠>' },
            color: colorList.white,
            lvl: 30,
            rarity: 50,
            modParts: {
                melee: { ias: 20 },
                missile: { ias: 20 },
                staff: { fcr: 20 },
                shield: { resistAll: 15 },
                amulet: { fcr: 20 },
                ring: { ias: 20 },
                light: { resistAll: 10 },
                armor: { resistAll: 10 },
                cloak: { frw: 20 },
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

const IT = Object.keys(itemTab);
IT.push('material');

const AEGIS = -1;
const itemUniqueMap = {
    melee: new Map([]),
    missile: new Map([
        [M_BOW, [{
            name: { a: 'Pandarus', b: 'パンダロス', pre: true },
            lvl: 10,
            rarity: 20,
            matBase: M_HORN,
            matId: HORN_GOAT,
            values: { hp: 30, mp: 30, dmgDiceNum: 1, dmgBonus: 50, rateBonus: 50 },
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
				magic = this.mod === MAGIC || (!starter &&
				evalPercentage(5 + (flag.shop ? 0 : rogue.mf)));
			}

            if (magic && !flag.shop && itemUniqueMap[this.type].has(this.tabId) &&
              	  (uniqueId >= 0 || evalPercentage((10 + rogue.mf) / 10))) {
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
				
                if (magic) this.mod = RARE;
            }

            if (!gem) {
                this.getMaterial(matBase, matId);
                this.getBaseandWeight();
            }

            if (magic || this.material === M_GEM) {
                let bias = this.bias ? this.bias : RANDOM;
                if (this.mod === RARE || evalPercentage((10 + rogue.mf) / 4)) {
                    this.getRare(bias);
				} else {
					this.getMagic(bias);
				}
            } else if (!this.mod) {
                this.mod = NORMAL;
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
                this.durationMax = this.duration;
                if (this.durationBonus) this.durationMax += this.durationBonus;
                this.duration = 2500;
            } else if (this.weapon) {
                this.dmgBare = this.dmgBase;
                if (!this.dmgBonus) this.dmgBonus = 0;
                if (!this.rateBonus) this.rateBonus = 0;
                if (!starter && !flag.shop && (this.cursed || this.mod === NORMAL && rogue.cdl)) {
                    let found;
                    if (this.cursed || evalPercentage(25)) {
                        this.dmgBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 50);
                        found = true;
                    }

                    if (this.cursed || evalPercentage(25)) {
                        this.rateBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 50);
                        found = true;
                    }

                    if (!this.cursed && found) this.getSuperior();
				}
				
                this.calcDmgOne();
            } else if (this.armor) {
                if (!this.acBonus) this.acBonus = 0;
                if (!starter && !flag.shop && (this.cursed ||
                        this.mod === NORMAL && rogue.cdl && evalPercentage(25))) {
                    this.acBonus += (this.cursed ? -1 : 1) * rndIntBet(1, 50);
                    if (!this.cursed) this.getSuperior();
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
            this.mod = NORMAL;
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

        if (!this.weight) this.weight = WEIGHT[this.type];
        if (flag.shop) this.price *= flag.gamble ? 10 : 2;
        if (position === LIST) return;
        super.init(position, x, y);
    }

    putDown(x, y, sound) {
        do {
			this.id = Math.random();
		} while (map.itemList[this.id]);

        this.spiralSearch(x, y, 'item');
        if (this.abort) return;
        this.place = P_FLOOR;
        map.itemList[this.id] = this;
        let loc = map.coords[this.x][this.y];
        let l = Object.keys(loc.item).length;
        loc.item[EA[l]] = this;
        if (sound) audio.playSound(this.type);
        if (rogue.hallucinated) hallucinate.one(this);
        loc.draw();
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
        if (!this.dmgBare) return;
        let { num, sides } = dice.get(this.dmgBare, this.dmgDiceNum, this.dmgDiceSides);
        this.dmgBase = num + 'd' + sides;
    }

    calcAcOne() {
        let perc = 1 + this.acBonus / 100;
        this.acSValue = Math.floor(this.acSBase * perc);
        this.acTValue = Math.floor(this.acTBase * perc);
        this.acBValue = Math.floor(this.acBBase * perc);
    }

    calcDurab(init) {
        if (!this.durabRate) this.durabRate = 1;
        let durabBase = DURAB_BASE + this.weight * DURAB_RATE;
        this.durabMax = Math.ceil(durabBase * this.durabRate + this.durabBonus);
        if (init || this.durab > this.durabMax) this.durab = this.durabMax;
    }

    identifyAll() { //potion, scroll
        itemTab[this.type].get(this.tabId).identified = true;
        this.identified = true;
        this.changeNameAndPrice();
        searchItemToIdentifiy.main(this.nameReal[ENG], this.type);
    }

    identifyWand() {
        let itemT = itemTab[this.type].get(this.tabId);
        if (!itemT.identified) {
            itemT.identified = true;
            searchItemToIdentifiy.main(this.nameReal[ENG], this.type);
        }
    }


    getDurabPrice() {
        let price = (this.durabMax - this.durab) * DURAB_PRICE;
        return price;
    }

    getSuperior() {
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
        this.price = this.priceReal = PRICE[this.type];
        if (this.priceRate) this.priceReal = Math.round(this.priceReal * this.priceRate);
        if (this.equipable || this.type === 'gem' || this.type === 'material') {
            let times;
            switch (this.mod) {
                case NORMAL:
                    times = 1;
                    break;
                case MAGIC:
                    times = 2;
                    break;
                case RARE:
                    times = 5;
                    break;
                case UNIQUE:
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
        this.name['a'] = this.nameReal['a'];
        this.name['b'] = this.nameReal['b'];
        this.changePrice();
        if (this.equipable || this.type === 'material' || this.type === 'gem') {
            this.color = this.colorReal = this.colorMod;
        } else if (this.type === 'orb') {
            this.color = this.colorReal;
        }
    }

    changePrice() {
        if (this.type === 'wand') {
            this.price = Math.round(this.priceReal * (1 + this.charges * WAND_PRICE));
		} else {
			this.price = this.priceReal;
		}
    }

    getQuantity(keyCode, num) {
        let i;
        if (keyCode === 13) { //Enter
            i = Number(num);
            if (i > this.quantity) i = this.quantity;
        } else {
			i = this.quantity;
		}

        return i;
    }

    getName(real, quantity = this.quantity, a = option.getLanguage(), gamble) {
        let type = this.typeHalluc ? this.typeHalluc : this.type;
        let halluc = !!this.typeHalluc;
        let name;
        if (gamble) {
            name = a === ENG ? getUpperCase(type) : translation.item[type];
            if (quantity > 1) name += ` x${quantity}`;
            return name;
		}
		
        name = real ? this.nameReal[a] : this.name[a];
        if (type === 'book' || type === 'potion' ||
      	      type === 'scroll' || type === 'recipe' || type === 'wand' || type === 'orb') {
            if (this.type2) type = this.type2;
            let typeName;
            if (a === ENG) {
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
            if ((type === 'light' || type === 'oil') && this.identified) {
                let duration = type === 'oil' ? this.duration :
                    Math.ceil(this.duration / this.durationMax * 100) + '%';
                name += ` [${duration}]`;
            } else if (type === 'material') {
                let matBase = materialMap.get(this.material).name[a]
                    .replace(a === ENG ? /s$/ : /類$|製$|材$/, '');
                name = a === ENG ? `${matBase} of ${name}` : `${name}の${matBase}`;
            }

            if (this.equipable) {
                let string = '';
                if (this.weapon) {
                    if (this.twoHanded) string += ' (2H)';
                    if (this.identified) string += ` (${this.dmgBase})`;
                } else if (this.armor) {
                    if (this.identified) string += ` [${this.acSBase},${this.acTBase},${this.acBBase}]`;
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
                    name += a === ENG ? ' (Unid)' : ' (未識別)';
                } else if (this.cursed) {
                    name = (a === ENG ? 'Cursed ' : '呪われた') + name;
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
            if (this.place === P_BOX || this.place === P_EQUIPMENT) {
                list[a] = null;
			} else if (this.place === P_STASH) {
                list.splice(a, 1);
			} else {
				deleteAndSortItem(list, a);
			}

            if (this.place === P_FLOOR) delete map.itemList[item.id];
		}
		
        return item;
    }

    adjustEmbeddedNum() {
        let limit = this.embeddedLimit;
        if (this.mod === NORMAL) {
            this.embeddedMax = evalPercentage(50) ? 0 : rndIntBet(1, limit);
        } else {
            let bonus = this.embeddedBonus;
            if (bonus) {
                if (this.mod === MAGIC) {
                    if (bonus > 4) bonus  = 4;
                } else if (this.mod === RARE) {
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
                    type = equipmentList[rndInt(equipmentList.length - 1)];
                }
            } else {
                type = IT[rndInt(IT.length - 2)];
            }
        } while (evalPercentage(RARITY[type]) ||
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
                    item.grade = NORMAL;
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
                    item.mod = NORMAL;
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
            if (item && item.type === type && item.nameReal[ENG] === nameReal) {
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
            atkType: AT_S | AT_T,
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
            atkType: AT_S | AT_T,
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
            canAttack: true,
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
            acBase: 0,
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
            acBase: 0,
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
            acBase: 0,
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
            acBase: 0,
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
            acBase: 0,
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
            acBase: 0,
            dropNum: 1,
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
            acBase: 0,
            dropNum: 2,
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
            spd: 0,
            dmgBase: '1d1',
            acBase: 0,
            dropNum: 2,
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
            skillProb: 1 / 6,
            skill: {
				a: { id: TELEPORT_TO, lvl: 1 },
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
            frw: 50,
            desc: {
                a:'',
                b:'シャルルマーニュの甥、聖騎士。思い人のアンジェリカが他妻となり発狂。その怪力で自身の鎧ごと衣服を引き裂き、分別なく暴れ狂う。',
            }
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
            color: colorList.white,
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
            frw: 60,
            desc: {
                a:'',
                b:'トラキア産の駿馬。大型で、雪よりも白く、走る速さは風にも劣らない。トロイア軍から奪った際、ネストルはこの馬を見て感嘆し、陽光の矢と評する。',
            }
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
            color: colorList.yellowgreen,
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
            frw: 50,
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
            name: { a: 'Trap Statue ', b: '罠像' },
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
            material: M_STONE | M_PLATING,
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
            name: { a: 'Summon Statue', b: '召喚像' },
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
            material: M_STONE | M_PLATING,
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
            name: { a: 'Gargoyle Statue', b: 'ガーゴイル像' },
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
            material: M_STONE | M_PLATING,
            atkType: AT_S,
            stillness: true,
            canAttack: true,
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
                { type: 'book', tabId: B_SPELL_1 },
                { type: 'book', tabId: B_SKILL_1 },
                { type: 'food', tabId: F_RATION, quantity: 5 },
                { type: 'light', tabId: L_TORCH, starter: true },
                { type: 'light', tabId: L_TORCH, starter: true, pack: true},
            ],
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
            },

            desc: {
                a:'',
                b:'地獄の君主、十六の悪魔の指揮官、悪魔達の皇帝。人間を誘惑し嫉妬心を生み出す。しばしばサタンと同一視される。',
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
        this.initSynerzy();
        this.equipment = {};
        if (this.race & (HUMAN | GIANT)) {
            for (let key in BP) {
				this.equipment[BP[key]] = null;
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
        this.hpMax = (this.lvl + this.con * 2 + 1) * this.hpRate + this.hpSum;
        if (this.hpMax < 1) this.hpMax = 1;
        if (this.hp > this.hpMax) this.hp = this.hpMax;
    }

    calcMP() {
        this.mpMax = (this.lvl + this.int * 4 + 1) * this.mpRate + this.mpSum;
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
        this.acSBonusValue = this.acSBaseSum * this.acBonus / 100; //weapon, ornament
        this.acSValueTotal = Math.floor((this.acSValue + this.acSBonusValue + this.acSValueSum) * percBuff);
        if (this.acSValueTotal < 0) this.acSValueTotal = 0;
        this.acTValue = this.acTBase * percBonus + this.dex / 2;
        this.acTBonusValue = this.acTBaseSum * this.acBonus / 100;
        this.acTValueTotal = Math.floor((this.acTValue + this.acTBonusValue + this.acTValueSum) * percBuff);
        if (this.acTValueTotal < 0) this.acTValueTotal = 0;
        this.acBValue = this.acBBase * percBonus + this.dex / 2;
        this.acBBonusValue = this.acBBaseSum * this.acBonus / 100;
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
        loc.fighter = draw ? this : null;
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
        let i = 1;
        let j = MS + 0.5;
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
                x: i,
                y: j,
            });

            ctxInv.textAlign = 'left';
            let parts = option.isEnglish() ? key : translation.bodyParts[key];
            if (key === 'main' || key === 'off') parts += this.swapped ? 2 : 1;
            display.text({
                ctx: ctxInv,
                msg: parts,
                x: i + 0.5,
                y: j,
            });

            if (!item) {
                if (key === 'off' && this.equipment['main'] && this.equipment['main'].twoHanded) {
                    display.text({
                        ctx: ctxInv,
                        msg: option.isEnglish() ?
                            `(two-handed)` :
                            `(両手持ち)`,
                        x: i + 5,
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
                x: i + 4.5,
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
                x: i + 5,
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
                    x: -2.5,
                    y: j,
                    xPx: display.width / 2,
                    limit: 3.5,
                });

                priceAll += price;
			}
			
            display.text({
                ctx: ctxInv,
                msg: (item.weight * item.quantity).toFixed(1),
                x: -0.5,
                y: j,
                xPx: display.width / 2,
                limit: 1.8,
            });

            weight += item.weight * item.quantity;
            count++;
            j++;
            ctxInv.restore();
		}
		
        if (!flag.destroy && !flag.number && !flag.repair && !flag.blacksmith) {
            j += 0.5;
            let xPx = 0;
            let row = j;
            let count2 = 0;
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
                    x: i,
                    y: j,
                    xPx: xPx,
                    limit: 7,
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
                    x: -0.5,
                    y: j++,
                    xPx: xPx + display.width / 4,
                    limit: 3.5,
                });

                ctxInv.restore();
                if (!(++count2 % 8)) {
                    xPx += display.width / 4;
                    j = row;
                }
            }
		}
		
        let maxNum = MAX_EQUIPMENT_NUM;
        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS - .9,
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
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2,
            yPx: display.height,
        });

        ctxInv.textAlign = 'left';
    }

    showSkill(list, bookmark) {
        inventory.shadow(bookmark ? LEFT : RIGHT);
        let i = 1;
        let j = MS + 1.7;
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
                    x: i - 0.5,
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
                x: -10,
                y: j,
                xPx: display.width / 2 + right,
                limit: 3,
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
                    let avg = Math.ceil(dice.getAvg(skill.base) * (1 + bonus / 100));
                    value = `Avg ${avg}`;
				}
				
                display.text({
                    ctx: ctxInv,
                    msg: value,
                    x: -5.5,
                    y: j,
                    xPx: display.width / 2 + right,
                    limit: 4,
                });
			}
			
            if (skill.reqLvl <= this.lvl && skill.mp > this.mp) {
                ctxInv.shadowColor = colorList.clear;
                ctxInv.fillStyle = colorList.red;
			}
			
            display.text({
                ctx: ctxInv,
                msg: skill.mp,
                x: -3.5,
                y: j,
                xPx: display.width / 2 + right,
            });

            if (skill.reqLvl <= this.lvl) {
                ctxInv.shadowColor = skill.color;
                ctxInv.fillStyle = colorList.white;
			}
			
            display.text({
                ctx: ctxInv,
                msg: skill.reqLvl,
                x: -2,
                y: j,
                xPx: display.width / 2 + right,
            });

            if (skill.reqSynerzy){
                display.text({
                    ctx: ctxInv,
                    msg: skill.reqSynerzy,
                    x: -0.5,
                    y: j,
                    xPx: display.width / 2 + right,
                });
            }

            ctxInv.restore();
            count++;
            j++;
		}
		
        ctxInv.save();
        j = MS + 0.5;
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
            x: -10,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: value,
            x: -5.5,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: mp,
            x: -3.5,
            y: j,
            xPx: display.width / 2 + right,
        });

        display.text({
            ctx: ctxInv,
            msg: reqLv,
            x: -2,
            y: j,
            xPx: display.width / 2 + right,
            limit: 1.3,
        });

        display.text({
            ctx: ctxInv,
            msg: reqSy,
            x: -0.5,
            y: j,
            xPx: display.width / 2 + right,
            limit: 1.3,
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
		
        if (s.acBonus && (mod || !s.armor)) this.acBonus += num * s.acBonus;
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
        let num = this.numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes + numBoxes && i <= MAX_BOX_NUM; i++) {
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
        let num = this.numBoxes - numBoxes + 1;
        if (num > MAX_BOX_NUM) return;
        for (let i = num; i <= this.numBoxes && i <= MAX_BOX_NUM; i++) {
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
        let boss = f.boss;
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
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(STR);
                break;
            case CLUMSINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(DEX);
                break;
            case SICKLINESS:
                if (boss || evalPercentage(f.poison)) return;
                f.decayOrRestore(CON);
                break;
            case STUPIDITY:
                if (boss || evalPercentage(f.poison)) return;
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
                if (boss || evalPercentage(f.radiation)) return;
                f.decayOrRestore();
                break;
            case SLOW:
            case GRAVITATIONAL_FIELD:
                if (boss || evalPercentage(f.gravity)) return;
                f.spdNerf = this.calcSkillValue(skill, lvl);
                f.slowed = duration;
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
                if (f.id === ROGUE) f.goBlind();
                message.draw(option.isEnglish() ?
                    `${name} got blinded` :
                    `${name}盲目になった`);
                audio.playSound('blind');
                break;
            case INVISIBILITY:
                if (boss || f.invisible) return;
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
                if (boss || evalPercentage(f.infection)) return;
                f.infected = duration;
                message.draw(option.isEnglish() ?
                    `${name} got infected` :
                    `${name}感染した`);
                break;
            case HALLUCINATION:
            case HALLUCINATING_MIST:
                if (boss || evalPercentage(f.poison)) return;
                let found2;
                if (!f.hallucinated && f.id === ROGUE) found2 = true;
                f.hallucinated = duration;
                if (f.id !== ROGUE) f.removeCe();
                if (found2) hallucinate.all();
                message.draw(option.isEnglish() ?
                    `${name} got hallucinated` :
                    `${name}幻覚状態になった`);
                audio.playSound('hallucinate');
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
                if (boss || evalPercentage(f.poison)) return;
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
            this.consumeMana(skill);
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
const Rogue = class extends Fighter {
    constructor() {
        super(fighterTab['misc'][0])
        this.name['a'] = this.name['b'] = data.name;
        this.id = ROGUE;
        this.dmgBare = this.dmgBase;
        this.expMax = this.exp = 0;
        this.expGain = this.getExp();
        this.expNext = this.calcNextLvl();
        this.cube = {};
        this.cubeIndex = {};
        this.hunger = MAX_HUNGER / 2;
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
        this.recipes = {};
        this.lethe = 0;
        this.turn = 1;
        this.done = false;
        this.initBookmarks();
    }

    init() {
        if (this.starter) this.getStarterItems();
        this.calcAll();
        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = this.spd;
    }

    initBookmarks() {
        for (let i = 0; i < MAX_BOOKMARK_NUM; i++) {
			this.bookmarks[i] = null;
		}
    }

    move(keyCodeDr, dr) {
        if (this.confused) {
            dr = DR[rndInt(DR.length - 1)];
		} else if (keyCodeDr) {
			dr = getDirection(keyCodeDr);
		}

        let loc = map.coords[this.x + dr.x][this.y + dr.y];
        if (loc.isClosedDoor() && !loc.hidden) {
            loc.openOrCloseDoor();
            rogue.done = true;
        } else if (loc.fighter) {
            if (this.haveMissile()) {
                this.ci = this.getAmmo(this.equipment['main'].throwType);
                if (this.ci) {
                    flag.arrow = true;
                    let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows'
                    message.draw(option.isEnglish() ?
                        `You shot ${arrow}` :
                        `矢を放った`);
                    this.aim({ keyCode: keyCodeDr });
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
                this.cost -= this.timesMove;
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
            map.draw(rogue.x, rogue.y);
        }
    }

    dash(keyCodeDr) {
        if (this.confused) return;
        let dr = getDirection(keyCodeDr);
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
                    this.dashSearch(dr, drLUp, drRUp) : null;
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

    dashSearch(dr, drLUp, drRUp) {
        let key1 = -1;
        let keyDia = -1;
        for (let key in DR) {
            if (!map.coords[this.x + DR[key].x][this.y + DR[key].y].wall &&
               	-DR[key].x !== dr.x && -DR[key].y !== dr.y) {
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
		
        return keyDia !== -1 && DR[keyDia].x !== DR[key1].x &&
            DR[keyDia].y !== DR[key1].y ? null : DR[key1];
    }

    searchDoor() {
        let tempX, tempY;
        let count = 0;
        for (let key in DR) {
            let [x, y] = [this.x + DR[key].x, this.y + DR[key].y]
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

    openOrCloseDoor(keyCode) {
        let dr = getDirection(keyCode);
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

    attackStationary(keyCodeDr) {
        if (this.bookmarks[0] !== null) {
            this.castBookmarkedSkill(48, keyCodeDr);
		} else if (this.haveMissile()) {
            this.ci = this.getAmmo(this.equipment['main'].throwType);
            if (this.ci) {
                flag.arrow = true;
                let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
                message.draw(option.isEnglish() ?
                    `You shot ${arrow}` :
                    `矢を放った`);
                this.aim({ keyCode: keyCodeDr });
            } else {
				message.draw(message.get(M_DONT_HAVE_AMMO));
			}
        } else {
            let dr = getDirection(keyCodeDr);
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
        rogue.drawStats();
        if (this.blinded || this.hallucinated) {
            this.blinded = 0;
            if (this.hallucinated) {
                this.hallucinated = 0;
                hallucinate.all(true);
            } else {
				map.redraw(rogue.x, rogue.y);
			}
		}
		
        map.draw(rogue.x, rogue.y);
        audio.playSound('kill');
        audio.stop(audio.curTrack);
        audio.playMusic('gameover');
        message.draw(message.get(M_DIED));
        rogue.done = false;
        initFlag();
        flag.regular = false;
        flag.wait = false;
        flag.died = true;
        data.delete(data.name);
    }

    drawStats() {
        let j = -2.4;
        statistics.drawEnemyBar(this.ce);
        this.calcCondition(false, true);
        statistics.clear();
        this.drawBoxes();
        statistics.drawCurrentEnemy(this.ce);
        let ctxStats = display.ctxes.stats;
        ctxStats.save();
        ctxStats.fillStyle = this.getConditionColor();
        display.rect({
            ctx: ctxStats,
            y:  -SS,
            yPx: display.height,
            widthPx: (this.hp / this.hpMax) * display.width / 2,
            heightPx: 3,
        });

        ctxStats.fillStyle = colorList.blue;
        display.rect({
            ctx: ctxStats,
            xPx: (2 - this.mp / this.mpMax) * display.width / 2,
            y: -SS,
            yPx: display.height,
            widthPx: display.width / 2,
            heightPx: 3,
        });

        ctxStats.restore();

        let [level, exp, str, dex, con, int, spd] = option.isEnglish() ? ['Level', 'Exp', 'Str', 'Dex', 'Con', 'Int', 'Spd'] :
            ['レベル', '経験値', '筋', '器', '耐', '知', '速'];
        statistics.draw({
            msg: `${level} ${this.lvl}`,
            x: 0.5,
            y: j,
            color: this.lvl < this.lvlMax ? colorList.yellow : undefined,
        });

        statistics.draw({
            msg: `${exp} ${this.exp}`,
            x: 5,
            y: j,
            color: this.exp < this.expMax ? colorList.yellow : undefined,
            shadow: this.expBuff ? colorList.buff : undefined,
            limit: 6,
        });

        statistics.draw({
            msg: `$ ${this.purse}`,
            x: 11.5,
            y: j,
            limit: 5,
        });

        statistics.draw({
            msg: `HP ${this.hp}/${this.hpMax}`,
            x: 17,
            y: j,
            color: this.hp <= 0 ? colorList.red : undefined,
            limit: 7,
        });

        statistics.draw({
            msg: `MP ${this.mp}/${this.mpMax}`,
            x: 0.5,
            y: j,
            xPx: display.width / 2,
            color: this.mp <= 0 ? colorList.red : undefined,
            limit: 6,
        });

        statistics.draw({
            msg: `${str} ${this.str}`,
            x: 7,
            y: j,
            xPx: display.width / 2,
            color: this.str < this.strMax ? colorList.yellow :
                this.strSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${dex} ${this.dex}`,
            x: 10.5,
            y: j,
            xPx: display.width / 2,
            color: this.dex < this.dexMax ? colorList.yellow :
                this.dexSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${con} ${this.con}`,
            x: 14,
            y: j,
            xPx: display.width / 2,
            color: this.con < this.conMax ? colorList.yellow :
                this.conSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${int} ${this.int}`,
            x: 17.5,
            y: j,
            xPx: display.width / 2,
            color: this.int < this.intMax ? colorList.yellow :
                this.intSus ? colorList.lime :
                undefined,
            limit: 3,
        });

        statistics.draw({
            msg: `${spd} ${this.spd}`,
            x: 21,
            y: j,
            xPx: display.width / 2,
            color: this.slowed ? colorList.red : undefined,
            shadow: this.speeded ? colorList.buff : undefined,
            limit: 2.5,
        });

        let msg;
        if (!rogue.cdl) {
            msg = option.isEnglish() ? 'Limbo' : '辺獄';
		} else {
            if (rogue.cdl >= 1 && rogue.cdl <= 33) {
                msg = option.isEnglish() ? 'Hell B' : '地獄 地下';
                msg += rogue.cdl;
            } else if (rogue.cdl >= 34 && rogue.cdl <= 66) {
                msg = option.isEnglish() ? 'Purgatory' : '煉獄';
                msg += rogue.cdl - 33;
            } else if (rogue.cdl >= 67 && rogue.cdl <= 99) {
                msg = option.isEnglish() ? 'Heaven' : '天国';
                msg += rogue.cdl - 66;
            }
		}
		
        statistics.draw({
            msg: msg,
            x: -0.5,
            y: j + 1.2,
            xPx: display.width,
            right: true,
        });
    }

    drawBoxes() {
        let x = 1;
        let j = 0.1;
        let ctxStats = display.ctxes.stats;
        for (let i = 1; i <= this.numBoxes; i++) {
            let item = this.boxes[i];
            ctxStats.save();
            ctxStats.textAlign = 'center';
            ctxStats.fillStyle = colorList.gray;
            ctxStats.strokeStyle = colorList.gray;
            ctxStats.lineWidth = 0.5;
            display.rect({
                ctx: ctxStats,
                x: x + i * 1.4 - 1,
                y: -1.5 + j,
                yPx: display.height,
                width: 1,
                height: 1,
                stroke: true,
            });

            if (!item) {
                display.text({
                    ctx: ctxStats,
                    msg: i,
                    x: x + i * 1.4 - 0.5,
                    y: -1 + j,
                    yPx: display.height,
                });
			} else {
                if (item.shadow) ctxStats.shadowColor = item.shadow;
                ctxStats.fillStyle = item.color;
                display.text({
                    ctx: ctxStats,
                    msg: item.symbol,
                    x: x + i * 1.4 - 0.5,
                    y: -1 + j,
                    yPx: display.height,
                    stroke: item.stroke,
                });

                ctxStats.font = display.fs / 2 + 'px ' + FONT_STYLE[option.getLanguage()];
                ctxStats.fillStyle = colorList.white;
                ctxStats.shadowColor = colorList.clear;
                display.text({
                    ctx: ctxStats,
                    msg: item.quantity,
                    x: x + i * 1.4,
                    y: -0.5 + j,
                    yPx: display.height,
                    stroke: item.stroke,
                });

                if (item.charges >= 0 && item.identified) {
                    display.text({
                        ctx: ctxStats,
                        msg: item.charges,
                        x: x + i * 1.4,
                        y: -1.2 + j,
                        yPx: display.height,
                    });
                }
			}
            
            x += 0.1;
            ctxStats.restore();
            if (i === MAX_BOX_NUM) break;
        }
    }

    getStartPointInTown() {
        if (!rogue.cdl && rogue.dl) {
            [this.x, this.y] = [POSITION.hell.x, POSITION.hell.y];
		} else {
			[this.x, this.y] = [POSITION.start.x, POSITION.start.y];
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
        this.drawStats();
        map.queue.push(this);
    }

    downOrUpStairs(keyCode, trap) {
        let loc = map.coords[this.x][this.y];
        if (!trap && !loc.stairs || loc.hidden) return;
        let dr = trap ? null : loc.stairs.id;
        if (trap || dr === DOWN && keyCode === 190) {
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
        } else if (dr === UP && keyCode === 188) {
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
            portal.init(LOCATION, this.x, this.y);
		}
		
        audio.playSound('tplevel');
    }

    enterBuild(enter) {
        flag.regular = false;
        map.draw(rogue.x, rogue.y);
        if (enter.stash) {
            flag.stash = true;
            enter.page = 1;
            this.showInventory(P_PACK);
            this.showInventory(P_STASH);
            message.draw(message.get(M_STASH), true);
            return;
        } else if (enter.shop) {
            flag.shop = true;
            this.cn = 1;
            flag.gamble = enter.gamble;
            this.showInventory(P_PACK);
            if (!enter.list['a']) enter.createShopItem();
            this.showInventory(P_SHOP);
            message.draw(message.get(M_SHOP), true);
        } else if (enter.cure) {
            flag.cure = true;
            inventory.show(enter.list, RIGHT, false, false, enter);
            message.draw(message.get(M_CURE), true);
        } else if (enter.blacksmith) {
            flag.blacksmith = true;
            this.equipmentList();
            this.showInventory(P_PACK);
            message.draw(message.get(M_BLACKSMITH), true);
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

    grabItem(keyCode, a) {
        let loc = map.coords[this.x][this.y];
        if (flag.grab) {
            if (keyCode) a = getAlphabet(keyCode);
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
                this.grabItem(65);
			} else {
                this.showInventory(P_FLOOR);
                message.draw(message.get(M_GRAB), true);
                flag.regular = false;
            }
        }
    }

    drop(keyCode) {
        let item;
        if (!flag.number) {
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a);
            if (!item || item.place === P_EQUIPMENT && item.cursed) return;
            if (item.quantity > 1) {
                this.ci = item;
                flag.number = true;
                this.inputNumber();
                return;
            } else {
				item = this.inventoryOut(item, 1);
			}
        } else {
            item = this.ci;
            let i = item.getQuantity(keyCode, this.cn);
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

    equip(keyCode) {
        if (this.switchInventory(keyCode, M_EQUIP)) return;
        let a = getAlphabetOrNumber(keyCode);
        if (!a || input.isShift) return;
        let item = this.getItem(a, flag.floor);
        if (!item || !item.equipable) return;
        flag.floor = false;
        let parts = this.getParts(item);
        if (!parts) return;
        item = this.inventoryOut(item, 1);
        item.place = P_EQUIPMENT;
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
        this.calcAll();
        inventory.clear();
        this.equipmentList();
        flag.equip = false;
        flag.regular = true;
        rogue.done = true;
        flag.clearInv = true;
    }

    unequip(keyCode, parts) {
        if (!parts) {
            let a = getAlphabet(keyCode);
            if (!a) return;
            parts = BP[a];
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
        for (let key in BP) {
            if (this.equipment[BP[key]]) return false;
		}
		
        return true;
    }

    fuel(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_FUEL, true)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            let a = getAlphabetOrNumber(keyCode);
            if (!a || input.isShift) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'light' && item.type !== 'oil') return;
		}
		
        let light = this.equipment['light'];
        if (light.torch && !item.torch || !light.torch && item.torch) return;
        flag.floor = false;
        if (!light.duration && item.duration && light.durab) {
            this.lighten += light.lighten;
            this.lightenOrDarken('Lighten');
		}
		
        light.duration += item.duration;
        if (light.duration > light.durationMax) light.duration = light.durationMax;
        if (item.mod !== NORMAL) {
            item.duration = 0;
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

    eat(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_EAT)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'food') return;
            flag.floor = false;
		}
		
        let name = item.getName(true, true);
        message.draw(option.isEnglish() ?
            `Ate ${name}` :
            `${name}を食べた`);
        this.haveCast(item.nameSkill, item.skillLvl, this);
        this.deleteItem(item, 1);
        if (!boxItem) {
            inventory.clear();
            flag.eat = false;
            flag.regular = true;
		}
		
        rogue.done = true;
    }

    quaffPotion(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_QUAFF)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'potion') return;
            flag.floor = false;
		}
		
        if (!item.identified) {
            item.identifyAll();
            if (item.place === P_PACK) var sort = true;
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

    zap(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_ZAP)) return;
        let item;
        if (boxItem) {
            flag.zap = true;
            flag.regular = false;
            item = boxItem;
        } else {
            let a = getAlphabetOrNumber(keyCode);
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

    throw (keyCode) {
        if (this.switchInventory(keyCode, M_THROW)) return;
        let a = getAlphabetOrNumber(keyCode);
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
                itemThrow: item,
            });
        }
    }

    read(keyCode, boxItem) {
        if (this.switchInventory(keyCode, M_READ)) return;
        let item;
        if (boxItem) {
            item = boxItem;
		} else {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item || item.type !== 'scroll' && item.type !== 'recipe' && !item.chargeBook) return;
		}
		
        if (item.chargeBook && !item.charges) return;
        flag.floor = false;
        if (!item.identified) {
            item.identifyAll();
            if (item.place === P_PACK) inventory.sort(a, this.pack);
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
                    this.aim({ keyCode: 88 }); //examine
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

    identify(keyCode, item) {
        if (this.switchInventory(keyCode, M_IDENTIFY, true)) return;
        if (keyCode !== null) {
            var a = getAlphabetOrNumber(keyCode);
            if (!a) return;
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
        if (keyCode) {
            inventory.clear();
            this.showInventory(item.place, a);
            item.investigate(item.place === P_EQUIPMENT || item.place === P_BOX ? RIGHT : LEFT);
            if (item.place === P_PACK) inventory.sort(a, this.pack);
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

    repair(keyCode) {
        let blacksmithAll = flag.blacksmith & keyCode === 13; //Enter
        if (!blacksmithAll) {
            if (!flag.blacksmith && this.switchInventory(keyCode, M_REPAIR, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
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
            this.drawStats();
            this.equipmentList();
            this.showInventory(P_PACK);
            message.draw(message.get(M_BLACKSMITH), true);
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

    disintegrate(keyCode) {
        if (keyCode < 65 || keyCode > 90) return;
        let skill = skillMap.get(DISINTEGRATION);
        let lvl;
        if (flag.skill) {
            lvl = this.cs.lvl + this.getSkillBoost(skill);
		} else {
			lvl = this.ci.skillLvl;
		}

        let radius = this.calcSkillValue(skill, lvl);
        let symbol = EA[keyCode - 65];
        if (input.isShift) symbol = symbol.toUpperCase()
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
        display.clearOne(display.ctxes.cur);
    }

    investigateOne(keyCode, item, place, direction, msg) {
        if (!item) {
            if (this.switchInventory(keyCode, M_INVESTIGATE, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            item = this.getItem(a, flag.floor);
            if (!item) return;
        }

        if (!item.identified){
            message.draw(message.get(M_NO_CLUE));
            return;
        }

        inventory.clear();
        if (place === undefined) place = item.place;
        this.showInventory(place);
        if (direction === undefined) direction = item.place === P_EQUIPMENT || item.place === P_BOX ? RIGHT : LEFT;
        item.investigate(direction);
        if (msg === undefined) msg = message.get(M_INVESTIGATE) + message.get(flag.floor ? M_PACK : M_FLOOR);
        message.draw(msg, true);
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

    synthesize(keyCode) {
        if (this.switchInventory(keyCode, M_SYNTHESIZE)) return;
        if (!flag.recipe && input.isCtrl && keyCode === 82) { //^r
            flag.recipe = true;
            this.showRecipe();
            return;
        }
        
        if (flag.recipe) {
            if (keyCode !== 13) return; //Enter
            flag.recipe = false;
            inventory.clear();
            this.showInventory(flag.floor ? P_FLOOR : P_PACK);
            this.showInventory(P_CUBE);
            message.draw(message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
            return;
        }

        let l = Object.keys(this.cube).length;
        if (keyCode === 13 && l >= 1) { //Enter
            flag.floor = false;
            this.tryToSynthesize();
            return;
        }
        
        let a = getAlphabetOrNumber(keyCode);
        if (!a || !input.isShift && l === MAX_CUBE_COUNT) {
            if (a) message.draw(message.get(M_CANT_ADD));
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
            this.cube[EA[l]] = this.inventoryOut(item, quantity);
            this.cubeIndex[EA[l]] = a;
        }
        
        inventory.clear();
        if (item.place === P_BOX) this.drawStats();
        this.showInventory(flag.floor ? P_FLOOR : P_PACK);
        this.showInventory(P_CUBE);
        message.draw(message.get(M_SYNTHESIZE) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
    }

    showRecipe() {
        let i = 1;
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        let a = option.getLanguage();
        inventory.clear();
        inventory.shadow(MIDDLE);
        message.draw(message.get(M_RECIPE), true);
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'Name' : '名称',
            x: i,
            y: j,
        });

        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'MP(per)' : 'MP(毎)',
            x: i + 8,
            y: j,
        });

        ctxInv.textAlign = 'left';
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ? 'Recipe' : 'レシピ',
            x: i + 9,
            y: j,
        });

        j += 2; 
        let recipes = itemTab['recipe'];
        for (let [key, value] of recipes.entries()) {
            if (!this.recipes[key]) continue;
            let name = value.nameReal[a];
            let cost = value.cost;
            let recipe = value.recipe[a];
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i,
                y: j,
                limit: 6
            });

            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: cost,
                x: i + 8,
                y: j,
            });

            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: recipe,
                x: i + 9,
                y: j,
                limit: 37
            });

            j += 1.2;
        }
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
            let item = this.cube[EA[i]];
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
            let tabId = RECIPE_EXTRA_HEALING;
            cost = recipes.get(tabId).cost;
            num = 1;
            if (l === 3 && this.checkRecipe(tabId, cost)) {
                let found = true;
                for (let key in this.cube) {
                    let item = this.cube[key];
                    if (item.nameSkill !== HEAL) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    name = option.isEnglish() ? 'Potion of Extra Healing' : '特大回復の薬';
                    this.createItemIntoPack({
                        type: 'potion',
                        tabId: P_EXTRA_HEALING,
                        quantity: 1,
                    });
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

                let duration = 0;
                for (let key in this.cube) {
                    if (a === key) continue;
                    let item2 = this.cube[key];
                    if (mp < cost * (num + 1)) {
                        this.returnItem(item2, key)
                        continue;
                    }

                    num++;
                    duration += item2.duration;
                    if (item2.type === 'light' && (item2.mod !== NORMAL || item2.embeddedList.length)) {
                        item2.duration = 0;
                        this.packAdd(item2);
                    }
                }
                
                item.duration += duration;
                if (item.duration > item.durationMax) item.duration = item.durationMax;
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
                    } else {
                        item.dmgDiceNum = item.dmgDiceSides = undefined;
                        if (item.armor) item.calcAcOne();
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
                } else {
                    item.dmgDiceNum = item.dmgDiceSides = undefined;
                    if (item.armor) item.calcAcOne();
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

            if (item.mod === NORMAL && this.checkRecipe(tabId, cost)) {
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

            if ((item.mod === MAGIC || item.mod === RARE) && item.material === mat.material && this.checkRecipe(tabId, cost)) {
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
        this.drawStats();
    }

    returnItem(item, a) {
        switch (item.place) {
            case P_PACK:
                this.packAdd(item);
                break;
            case P_BOX:
                this.boxAdd(item, this.cubeIndex[a]);
                break;
            case P_FLOOR:
                item.putDown(this.x, this.y, true);
                break;
        }
    }

    packOrUnpack(keyCode) {
        if (flag.pack !== P_PACK) {
            if (this.switchInventory(keyCode, M_PACK_OR_UNPACK) || input.isShift) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
            let item = this.getItem(a, flag.floor);
            if (!item) return;
            if (item.place === P_BOX) {
                item = this.inventoryOut(item, item.quantity);
                if (!this.packAdd(item)) item.dropped();
            } else {
                this.ci = item;
                flag.pack = P_PACK;
                if (Object.keys(this.boxes).length === 1) {
                    this.packOrUnpack(49); //1
				} else {
					message.draw(message.get(M_PACK_INTO), true);
				}

                return;
            }
        } else {
            let a = getNumber(keyCode);
            if (!a || this.boxes[a] === undefined) return;
            let item = this.inventoryOut(this.ci, this.ci.quantity);
            this.ci = null;
            this.boxAdd(item, a);
            flag.pack = true;
		}
		
        inventory.clear();
        this.showInventory(flag.floor ? P_FLOOR : P_PACK);
        this.showInventory(P_BOX);
        message.draw(message.get(M_PACK_OR_UNPACK) + message.get(flag.floor ? M_PACK : M_FLOOR), true);
        this.drawStats();
    }

    useBoxItem(keyCode) {
        let i = keyCode - 48;
        let item = this.boxes[i];
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

    autoAim(item) {
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
		
        this.ci = item;
        flag.arrow = true;
        let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
        message.draw(option.isEnglish() ?
            `You shot ${arrow}` :
            `矢を放った`);
        this.aim({
            x1: x,
            y1: y,
        });
    }

    examine(keyCode) {
        if (keyCode === 88) { //x
            let loc = map.coords[cursol.x][cursol.y];
            if (loc.item['a'] && this.litMapIds[cursol.x + ',' + cursol.y] &&
                distanceSq(cursol.x, cursol.y, this.x, this.y) <= FOV_SQ &&
                lineOfSight(this.x, this.y, cursol.x, cursol.y)) {
                inventory.show(loc.item, RIGHT, undefined, P_FLOOR)
                flag.clearInv = true;
			}
			
            return;
        } else if (keyCode === 67 || keyCode === 77 ||
            keyCode === 69 || keyCode === 73) { //c,m,e,i
            let loc = map.coords[cursol.x][cursol.y];
            let fighter = loc.fighter;
            if (fighter && fighter.isShowing() &&
                (fighter.id === ROGUE || !rogue.hallucinated)) {
                if (keyCode === 67) {
                    fighter.investigate(MIDDLE, true);
				} else if (keyCode === 77) {
                    fighter.showSkill(fighter.skill);
				} else if (keyCode === 69 && this.isWizard) {
                    fighter.equipmentList();
				} else if (keyCode === 73 && this.isWizard) {
					fighter.showInventory(P_PACK);
				}

                flag.clearInv = true;
			}
			
            return;
        } else if (keyCode === 84 || keyCode === 82) { //t,r
            let loc = map.coords[cursol.x][cursol.y];
            if (flag.wormhole) {
                if (keyCode === 82) {
                    flag.wormhole = false;
				} else {
                    this.wormhole(cursol.x, cursol.y);
                    return;
                }
			}
			
            if (keyCode === 82) {
                this.ce = null;
			} else if (loc.fighter && loc.fighter.id !== ROGUE && loc.fighter.isShowing()) {
                this.ce = loc.fighter;
            } else if (!flag.aim) {
                loc.getInfo();
                return;
			}
			
            if (flag.aim && keyCode !== 82) {
                if (flag.skill || flag.scroll) {
                    let nameSkill = flag.skill ? this.cs.id : this.ci.nameSkill;
                    if (skillMap.get(nameSkill).range === 0) [cursol.x, cursol.y] = [this.x, this.y];
				}
				
                this.aim({
                    x1: cursol.x,
                    y1: cursol.y,
                });
			}
			
            this.cancelCommand();
            this.drawStats();
            return;
		}
		
        let offsetX = (IN_WIDTH - 1) / 2;
        let offsetY = IN_HEIGHT / 2;
        let X = cursol.x - cursol.cX + offsetX;
        let Y = cursol.y - cursol.cY + offsetY;
        if (!keyCode) {
            if (flag.aim) this.examinePlot();
            cursol.draw(X, Y);
            map.coords[cursol.x][cursol.y].getInfo();
            return;
		}
		
        let dr = getDirection(keyCode);
        if (!dr) return;
        let [x, y] = [cursol.x + dr.x, cursol.y + dr.y];
        let width = map.coords.length;
        let height = map.coords[0].length;
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        let [xinc, yinc] = [dr.x, dr.y];
        if (input.isShift) {
            xinc *= 10;
            yinc *= 10;
            if (cursol.x + xinc < 0) {
                xinc = -cursol.x;
                if (yinc) yinc = (yinc > 0 ? -1 : 1) * xinc;
            } else if (cursol.x + xinc >= width) {
                xinc = width - cursol.x - 1;
                if (yinc) yinc = (yinc > 0 ? 1 : -1) * xinc;
			}
			
            if (cursol.y + yinc < 0) {
                yinc = -cursol.y;
                if (xinc) xinc = (xinc > 0 ? -1 : +1) * yinc;
            } else if (cursol.y + yinc >= height) {
                yinc = height - cursol.y - 1;
                if (xinc) xinc = (xinc > 0 ? 1 : -1) * yinc;
            }
		}
		
        cursol.clear(X, Y);
        cursol.x += xinc;
        cursol.y += yinc;
        X += xinc;
        Y += yinc;
        let found;
        if (X < 0 || X >= IN_WIDTH) {
            cursol.cX = cursol.x;
            X = offsetX;
            if (yinc > 0 && Y > offsetY && Y < IN_HEIGHT ||
                yinc < 0 && Y < offsetY && Y >= 0) {
                cursol.cY = cursol.y;
                Y = offsetY;
			}
			
            found = true;
		}
		
        if (Y < 0 || Y >= IN_HEIGHT) {
            cursol.cY = cursol.y;
            Y = offsetY;
            if (Y >= IN_HEIGHT) {
                cursol.cY++;
                Y++;
			}
			
            if (xinc > 0 && X > offsetX && X < IN_WIDTH ||
                xinc < 0 && X < offsetX && X >= 0) {
                cursol.cX = cursol.x;
                X = offsetX;
			}
			
            found = true;
		}
		
        if (found) map.draw(cursol.cX, cursol.cY);
        if (flag.aim) this.examinePlot();
        cursol.draw(X, Y);
        map.coords[cursol.x][cursol.y].getInfo();
    }

    examinePlot(aim) {
        if (aim) cursol.init();
        let [x, y] = [cursol.x, cursol.y];
        let color = colorList.white;
        let skill;
        display.clearOne(display.ctxes.cur);
        if (flag.zap) {
            if (this.ci.identified || itemTab[this.ci.type].get(this.ci.tabId).identified) { //
                skill = skillMap.get(this.ci.nameSkill);
                color = skill.color;
            }
        } else if (flag.skill || flag.scroll) {
            skill = skillMap.get(flag.skill ? this.cs.id : this.ci.nameSkill);
            color = skill.color;
            if (skill.range === 0)[x, y] = [this.x, this.y];
		}
		
        lineOfSight(this.x, this.y, x, y, color, skill);
    }

    cancelCommand() {
        if (flag.synthesize) {
            this.returnCubeItem();
		} else if (flag.aim || flag.examine) {
            display.clearOne(display.ctxes.cur);
            map.draw(rogue.x, rogue.y);
            statistics.clearEnemyBar();
            statistics.drawEnemyBar(this.ce);
        } else if (flag.minimap) {
            display.clearOne(display.ctxes.map);
		}

        inventory.clear();
        initFlag();
        this.ci = null;
    }

    showStats(a) {
        inventory.shadow(LEFT);
        let i = 1;
        let j = MS + 0.5;
        let count = 0;
        let ctxInv = display.ctxes.inv;
        for (let key in statistics.list) {
            if (a && key !== a) continue;
            let stat = statistics.list[key];
            ctxInv.save();
            ctxInv.textAlign = 'center';
            display.text({
                ctx: ctxInv,
                msg: key.toUpperCase(),
                x: i,
                y: j,
            });

            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: stat.name[option.getLanguage()],
                x: i + 1,
                y: j,
            });

            ctxInv.textAlign = 'right';
            display.text({
                ctx: ctxInv,
                msg: this[stat.term + 'Max'],
                x: -0.5,
                y: j++,
                xPx: display.width / 2,
            });

            ctxInv.restore();
            count++;
		}
		
        let maxNum = count; //
        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS - .9,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let [statPoints, currentValues] = option.isEnglish() ? ['Stat Points', 'Current Values'] : ['ステータスポイント', '現在値'];
        display.text({
            ctx: ctxInv,
            msg: `${statPoints} ${this.statPoints} ${currentValues}`,
            x: -0.5,
            y: -SS - .9,
            xPx: display.width / 2,
            yPx: display.height,
        });

        ctxInv.restore();
    }


    showSKillDetail(skill, dir) {
        inventory.shadow(dir);
        let i = 0.5;
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.shadowColor = skill.color;
        let nameEle = option.isEnglish() ? getUpperCase(skill.element) : translation.element[skill.element];
        display.text({
            ctx: ctxInv,
            msg: skill.name[option.getLanguage()] + ` [${nameEle}]`,
            x: i,
            y: j++,
        });

        ctxInv.shadowColor = colorList.shadow;
        j++;
        let lvl = 0;
        let a = this.searchSkill(skill.id);
        if (a) lvl = this.skill[a].lvl;
        let boost = this.getSkillBoost(skill);
        let msg = this.getSkillInfo(skill, lvl + boost);
        display.text({
            ctx: ctxInv,
            msg: msg,
            x: i + 1,
            y: j++,
            limit: 22,
        });

        j++;
        let [base, perLvl, perSy, durBase] = option.isEnglish() ? ['Base', 'per Level', 'per Synerzy', 'Duration Base'] : ['基礎値', 'レベル毎', 'シナジー毎', '期間基礎値'];
        let perc = skill.perc ? '%' : '';
        if (skill.rate) {
            let skillBase = skill.base;
            if (isFinite(skillBase) && perc && skillBase > 0) {
                skillBase = '+' + skillBase;
			} else if (skill.radiusRate) {
				skillBase = (option.isEnglish() ? 'radius ' : '半径') + skillBase;
			}

            display.text({
                ctx: ctxInv,
                msg: `${base} ${skillBase}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });

            if (!isFinite(skill.base)) perc = '%';
            let sign = skill.rate > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perLvl} ${sign}${skill.rate}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.synerzy) {
            let sign = skill.synerzy > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perSy} ${sign}${skill.synerzy}${perc}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.durBase) {
            display.text({
                ctx: ctxInv,
                msg: `${durBase} ${skill.durBase}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        if (skill.durRate) {
            let sign = skill.durRate > 0 ? '+' : '';
            display.text({
                ctx: ctxInv,
                msg: `${perLvl} ${sign}${skill.durRate}`,
                x: i + 1,
                y: j++,
                limit: 22,
            });
		}
		
        ctxInv.restore();
    }


    addOrRemoveBookmark(keyCode) {
        if (flag.bookmark === 1) {
            if (keyCode >= 112 || input.isShift && keyCode === 77) { //F1~, M
                let i = keyCode === 77 ? 0 : keyCode - 111;
                if (!this.bookmarks[i]) return;
                this.bookmarks[i] = null;
                inventory.clear();
                this.showSkill(this.skill);
                this.showSkill(this.bookmarks, true);
                message.draw(message.get(M_BOOKMARK), true);
            } else {
                let a = getAlphabet(keyCode);
                if (!a || !this.skill[a]) return;
                flag.bookmark = 2;
                this.ca = a;
                message.draw(message.get(M_BOOKMARK2), true);
            }
        } else {
            if (!(input.isShift && keyCode === 77) && (keyCode < 112 || keyCode > 123)) return;
            let i = keyCode === 77 ? 0 : keyCode - 111;
            this.bookmarks[i] = this.skill[this.ca].id;
            flag.bookmark = 1;
            inventory.clear();
            this.showSkill(this.skill);
            this.showSkill(this.bookmarks, true);
            message.draw(message.get(M_BOOKMARK), true);
        }
    }

    gainStatOrSkill(keyCode) {
        if (flag.gain === 1 && !flag.number) {
            let a = getAlphabet(keyCode);
            if (!a || input.isShift && !statistics.list[a] || !input.isShift && !this.pack[a]) return;
            if (!input.isShift && (this.pack[a].type !== 'book' || !this.pack[a].skill || !this.canRead(true))) {
                return;
			} else if (input.isShift && !this.statPoints) {
                message.draw(message.get(M_CANT_GAIN_STAT));
                return;
            } else if (input.isShift && this[statistics.list[a].term + 'Max'] >= MAX_STAT_LVL) {
                let name = statistics.list[a].name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't gain ${name} anymore` :
                    `これ以上${name}を取得が出来ない`);
                return;
			}
			
            this.ca = a;
            inventory.clear();
            if (input.isShift) {
                this.showStats(a);
                flag.gain = 3;
                flag.number = true;
                this.inputNumber();
            } else {
                this.showSkill(this.pack[a].list);
                flag.gain = 2;
                message.draw(message.get(M_GAIN_SKILL), true);
            }
        } else if (flag.gain === 2 && !flag.number) { //skill
            let a = getAlphabet(keyCode);
            if (!a) return;
            let id = this.pack[this.ca].list[a];
            if (!id) return;
            let skill = skillMap.get(id);
            if (input.isShift) {
                inventory.clear();
                this.showSkill(this.pack[this.ca].list);
                this.showSKillDetail(skill, LEFT);
                message.draw(message.get(M_GAIN_SKILL), true);
                return;
			}
			
            let key = this.searchSkill(id);
            let lvl = key ? this.skill[key].lvl : 0;
            if (this.lvl < skill.reqLvl + lvl ||
                skill.reqSynerzy && skill.reqSynerzy > this.getSynerzy(skill)) {
				return;
			}

            if (!this.skillPoints ||
                !key && Object.keys(this.skill).length >= MAX_SKILL_NUM) {
                message.draw(message.get(M_CANT_GAIN_SKILL));
                return;
            } else if (key && lvl === MAX_SKILL_LVL) {
                let nameSkill = skill.name[option.getLanguage()];
                message.draw(option.isEnglish() ?
                    `You can't study ${nameSkill} anymore` :
                    `これ以上${nameSkill}の知識を得られない`);
                return;
			}
			
            inventory.clear();
            this.cs = id;
            flag.number = true;
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
                let i;
                if (keyCode === 13) {
                    i = Number(this.cn);
                    if (i > point) i = point;
                } else {
					i = point;
				}

                let name = skill.name[option.getLanguage()];
                if (!key) { //new skill
                    key = EA[Object.keys(this.skill).length];
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
                let i;
                if (keyCode === 13) {
                    i = Number(this.cn);
                    if (i > point) i = point;
                } else {
					i = point;
				}

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

    castSkill(keyCode) {
        if (input.isCtrl && keyCode === 83 && Object.keys(this.skill).length >= 2) { //S
            flag.skill = false;
            flag.sortSkill = 1;
            inventory.clear();
            this.showSkill(this.skill);
            message.draw(message.get(M_SORT_SKILL), true);
            return;
		}
		
        let a = getAlphabet(keyCode);
        if (!a || !this.skill[a]) return;
        let skill = skillMap.get(this.skill[a].id);
        if (input.isShift) {
            inventory.clear();
            this.showSkill(this.skill);
            this.showSKillDetail(skill, LEFT);
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

    castBookmarkedSkill(keyCode, keyCodeDr) {
        let i = keyCode === 48 ? 0 : keyCode - 111;
        if (!this.bookmarks[i] || !this.checkToCast()) return;
        let id = this.bookmarks[i];
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
        } else if (i === 0) {
            this.aim({
                keyCode: keyCodeDr,
                nameSkill: id,
            });
        } else if (skill.wall) {
            flag.regular = false;
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

    sortSkill(keyCode) {
        if (flag.sortSkill === 1) {
            this.ca = getAlphabet(keyCode);
            if (!this.ca || !this.skill[this.ca]) return
            flag.sortSkill = 2;
            message.draw(message.get(M_SORT_SKILL2), true);
        } else {
            let a = getAlphabet(keyCode);
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
            item = this.equipment[BP[a]];
		} else {
			item = this.pack[a];
		}

        return item;
    }

    switchInventory(keyCode, id, equipment) {
        if (keyCode !== 188 && keyCode !== 190) return false;
        inventory.clear();
        let msg = message.get(id);
        if (flag.synthesize || flag.pack) this.showInventory(flag.pack ? P_BOX : P_CUBE);
        if (keyCode === 188) { //,
            flag.floor = false;
            if (equipment) this.equipmentList();
            this.showInventory(P_PACK);
            msg += message.get(M_FLOOR);
        } else if (keyCode === 190 || keyCode === 110) { //., T.
            flag.floor = true;
            this.showInventory(P_FLOOR);
            msg += message.get(M_PACK);
		}
		
        message.draw(msg, true);
        return true;
    }

    destroy(keyCode) {
        if (!flag.number) {
            if (this.switchInventory(keyCode, M_DESTROY, true)) return;
            let a = getAlphabetOrNumber(keyCode);
            if (!a) return;
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
            let i = item.getQuantity(keyCode, this.cn);
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

    shop(keyCode, isAlt) {
        let shop = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            let a = getAlphabet(keyCode);
            if (!a) return;
            let item = input.isShift ? shop.list[a] : this.pack[a];
            if (!item) return;
            if (isAlt) {
                if (flag.gamble && input.isShift) return;
                let place = input.isShift ? P_SHOP : P_PACK;
                let direction = input.isShift ? RIGHT : LEFT;
                let msg = message.get(M_SHOP);
                this.investigateOne(null, item, place, direction, msg);
                return;
            }

            if (!input.isShift && Object.keys(shop.list).length === MAX_PACK_COUNT) {
                message.draw(message.get(M_CANT_SELL));
                return;
            } else if (input.isShift && Object.keys(this.pack).length >= MAX_PACK_COUNT &&
                !this.canCarryItem(this.pack, item) &&
                !this.canCarryItem(this.boxes, item)) {
                message.draw(message.get(M_CANT_CARRY));
                return;
			}
			
            this.ca = a;
            this.ci = item;
            inventory.clear();
            flag.number = true;
            flag.shop = item.place;
            this.showInventory(item.place, a);
            this.inputNumber();
        } else {
            let item = this.ci;
            this.ci = null;
            let i = item.getQuantity(keyCode, this.cn);
            let amount = item.price * i;
            if (flag.shop === P_PACK) {
                item = this.inventoryOut(item, i);
                let l = Object.keys(shop.list).length;
                shop.list[EA[l]] = item;
                item.place = P_SHOP;
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
			
            this.drawStats();
            flag.shop = true;
            flag.number = false;
            inventory.clear();
            this.cn = 1;
            this.showInventory(P_PACK);
            this.showInventory(P_SHOP);
            message.draw(message.get(M_SHOP), true);
        }
    }

    stash(keyCode, isAlt) {
        let stash = map.coords[this.x][this.y].enter;
        if (!flag.number) {
            if (keyCode === 188 || keyCode === 190) { //, .
                if (keyCode === 190 && stash.page < MAX_STASH_PAGE) {
                    stash.page++;
				} else if (keyCode === 188 && stash.page > 1) {
					stash.page--;
				}

                inventory.clear();
                this.showInventory(P_STASH);
                this.showInventory(P_PACK);
                message.draw(message.get(M_STASH), true);
                return;
			}
			
            let a, item;
            if (input.isShift) {
                if (!getAlphabet(keyCode)) return;
                a = keyCode - 65 + (stash.page - 1) * MAX_PACK_COUNT;
                item = stash.list[a];
            } else {
                a = getAlphabetOrNumber(keyCode);
                if (!a) return;
                item = this.getItem(a);
			}
			
            if (!item) return;
            if (isAlt) {
                let place = input.isShift ? P_STASH : P_PACK;
                let direction = input.isShift ? RIGHT : LEFT;
                let msg = message.get(M_STASH);
                this.investigateOne(null, item, place, direction, msg);
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
            flag.stash = item.place;
            if (item.quantity === 1) {
                this.cn = 1;
                this.stash(13);
            } else {
                this.ca = a;
                inventory.clear();
                this.showInventory(item.place, a);
                this.inputNumber();
            }
        } else {
            let item = this.ci;
            this.ci = null;
            let i = item.getQuantity(keyCode, this.cn);
            if (flag.stash === P_STASH) {
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
			
            this.drawStats();
            flag.stash = true;
            flag.number = false;
            inventory.clear();
            this.showInventory(P_STASH);
            this.showInventory(P_PACK);
            message.draw(message.get(M_STASH), true);
        }
    }

    cureShop(keyCode) {
        let cure = map.coords[this.x][this.y].enter;
        let a = getAlphabet(keyCode);
        if (!a || !cure.list[a]) return;
        let cost = cure.list[a].cost;
        if (cost > this.purse) {
            message.draw(message.get(M_DONT_HAVE_MONEY));
            return;
		}
		
        this.purse -= cost;
        let name = cure.list[a][ENG];
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

        this.drawStats();
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
		
        let name = trap.name[ENG];
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
        if (light && light.duration && light.durab) {
            if (--light.duration === 0) {
                this.lighten -= light.lighten;
                this.lightenOrDarken('Lighten');
                message.draw(message.get(M_LIGHT_GONE));
            }
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
        this.calcCondition(true);
        this.drawStats();
    }

    inputNumber(keyCode) {
        if (!keyCode) {
            this.cn = 1;
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return
		}
		
		if ((keyCode < 48 || keyCode > 57) && keyCode !== 65 &&
			keyCode !== 13 && keyCode !== 8) { //a, Enter, Back space
			return;
		}

        if (keyCode === 48 && (this.cn === '' || this.cn === 1) || keyCode === 13 && this.cn === '') {
            return;
		} else if (keyCode === 8 || keyCode >= 48 && keyCode <= 57) {
            if (this.cn === 1) this.cn = '';
            if (keyCode === 8) {
                this.cn = this.cn.substr(0, this.cn.length - 1);
			} else {
				this.cn += keyCode - 48;
			}

            if (!flag.gain) {
                inventory.clear();
                let place;
                if (flag.shop) {
                    place = flag.shop;
				} else if (flag.stash) {
                    place = flag.stash;
                } else {
					place = P_PACK;
				}

                this.showInventory(place, this.ca);
			}
			
            message.draw(message.get(M_NUMBER) + this.cn, true);
            return;
		}
		
        if (flag.drop) {
            this.drop(keyCode);
		} else if (flag.gain) {
            this.gainStatOrSkill(keyCode);
        } else if (flag.destroy) {
            this.destroy(keyCode);
		} else if (flag.shop) {
            this.shop(keyCode);
        } else if (flag.stash) {
			this.stash(keyCode);
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
            if (enemy.mod === UNIQUE) delete this.cue[enemy.name[ENG]];
        }
    }

    checkUniqueLoop(list) {
        for (let key in list) {
            let item = list[key];
            if (!item) continue;
            if (item.mod === UNIQUE && !item.identified) {
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
        if (!this.ce) return;
        if (!this.ce.isShowing()) {
            statistics.clearEnemyBar();
            this.ce = null;
        }
    }

    getCe(fighter, melee) {
        if (fighter.id !== ROGUE && (melee || !this.ce) && fighter.isShowing()) this.ce = fighter;
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
        return fighter.id !== ROGUE;
    }

    isShowing() {
        return !this.invisible;
    }

    removeCe() {
        this.ce = null;
        statistics.clearEnemyBar();
    }

    goBlind() {
        display.clearOne(display.ctxes.buf, true);
        map.coords[this.x][this.y].draw();
        this.removeCe();
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
        switch (this.grow && coinToss() ? this.grow : rndInt(3)) {
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

    init(position, x, y, summon, magic, bias, lvl) {
        if (this.mod !== UNIQUE && lvl > this.lvl) {
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
        if (this.volumeRate) {
            this.getMaterial();
            this.getBaseandWeight();
		}
		
        if (this.mod === UNIQUE) {
            this.getUnique();
		} else if (this.mod === MAGIC || magic || this.material === M_GEM ||
            evalPercentage(10 + rogue.mf)) {
            if (this.bias) bias = this.bias;
            if (evalPercentage((10 + rogue.mf) / 4)) {
                this.getRare(bias);
			} else {
				this.getMagic(bias);
			}
		}
		
        if (evalPercentage(10)) this.dropNum++;
        if (this.mf) this.dropNum += Math.ceil(this.mf / 10);
        this.calcDmgOne();
        this.gainSynerzyAll();
        if (this.starter) this.getStarterItems();
        if (this.mod !== NORMAL) this.getOrLooseStats(modBonusMap.get(this.mod), true);
        this.calcAll();
        this.sleeping = this.awake || this.aggravating || summon ? 0 : DEFAULT;
        if (this.mimic) hallucinate.one(this, false, true);
        if (this.dropNum) {
            this.createItemIntoPack({
                times: this.dropNum,
                magic: this.mf || this.mod === UNIQUE,
                lvl: this.lvl,
            });
        }

        if (this.gf) {
            this.createItemIntoPack({
                times: rndIntBet(1, Math.ceil(this.gf / 20)),
                type: 'coin',
                tabId: C_COIN,
            });
        }

        this.hp = this.hpMax;
        this.mp = this.mpMax;
        this.energy = summon ? -COST_REGULAR : this.spd;
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
        if (this.calcCondition(true) === null) return;
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
                return;
            }
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
            this.cost -= this.frw >= 100 ? 5 : Math.floor(this.frw / 20);
        }
    }

    getDirection(los, betw, rand) {
        let dr;
        if (betw) {
            dr = getDirectionBetween(this.x, this.y, this.ce.x, this.ce.y);
		} else if (rand) {
			dr = this.blinded && this.dr ? this.dr : DR[rndInt(DR.length - 1)];
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
        if (this.ce.id !== ROGUE) return this.getDirection(true, true);
        let drT;
        let dist = FOV + 1;
        let distCur = rogue.distMap[this.x + ',' + this.y];
        for (let dr of DR) {
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
		
        loc.draw();
        audio.playSound('kill', distanceSq(rogue.x, rogue.y, this.x, this.y));
        if (!f) return;
        if (rogue.hallucinated || this.mimic && !this.identified) hallucinate.undoOne(this);
        let name = this.getName();
        let nameE = f.getName(true);
        message.draw(option.isEnglish() ?
            `${nameE} defeated ${name}` :
            `${nameE}${name}を倒した`);
        f.gainExp(this.expGain);
        if (f.id !== ROGUE) return;
        if (this.material && this.probMaterial()) this.makeMaterial(true);
        this.dropEquipment(this.equipment);
        this.dropEquipment(this.side);
        for (let key in this.pack) {
			this.pack[key].putDown(this.x, this.y, true);
		}

        if (this.boss && rogue.cdl === 33) {
            creation.stairs(1, DOWN, LOCATION, this.x, this.y, true);
            if (rogue.cdl === 33 && !rogue.lethe) {
                creation.item({
                    type: 'potion',
                    tabId: P_LETHE,
                    position: LOCATION,
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
		
        return perc && this.matRedTimes ? evalPercentage(perc / this.matRedTimes) : false;
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
        if (this.skillProb && evalPercentage(this.skillProb * 100) && this.checkToCast()) {
            if (this.castSkill(distance)) return;
		}
		
        if (this.haveMissile()) {
            this.ci = this.getAmmo(this.equipment['main'].throwType);
            if (this.ci) {
                flag.arrow = true;
                let name = this.getName(true);
                let arrow = this.timesMissile === 1 ? 'an arrow' : 'arrows';
                message.draw(option.isEnglish() ?
                    `${name} shot ${arrow}` :
                    `${name}矢を放った`);
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
        let a = EA[rndInt(Object.keys(this.skill).length - 1)];
        let id = this.skill[a].id;
        let skill = skillMap.get(id);
        if (!this.checkToCast(skill)) return;
        if (skill.kind !== 'self' && skill.range >= 0) {
            let l = skill.range;
            l += skill.radius ? skill.radius : 0;
            if (l ** 2 < distance) return;
		}
		
        this.cs = this.skill[a];
        if (skill.kind === 'self') {
            if (this.castSelfSpell(skill) === null) return;
        } else {
            flag.skill = true;
            let [x, y] = skill.range === 0 ? [this.x, this.y] : [this.ce.x, this.ce.y];
            this.aim({
                x1: x,
                y1: y,
                nameSkill: id,
            });
		}
		
        return true;
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
        if (skill.kind === 'breath' && this.race === HUMAN ||
            skill.kind !== 'breath' && skill.type === 'spell' && this.int < 10) {
			return;
		}

        if (!this.skill) {
            this.skillProb = 1 / ((skill.kind === 'breath' && this.race & DRAGON ? 7 : 10) - Math.floor(this.lvl / 20));
            this.skill = {};
		}
		
        let i = 0;
        while (this.skill[EA[i]] && this.skill[EA[i]].id !== id) i++;
        if (i >= MAX_SKILL_NUM) return;
        if (!this.skill[EA[i]]) this.skill[EA[i]] = {};
        skill = this.skill[EA[i]];
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
            if (this.cursed && this.mod !== UNIQUE)
                name = (option.isEnglish() ? 'Cursed ' : '呪われた') + name;
        } else {
			name = option.isEnglish() ? 'Something' : '何か';
		}

        if (subject && !option.isEnglish()) name += 'は';
        return name;
    }

    isOpponent(fighter) {
        return /*fighter.id===ROGUE||*/ this.ce && this.ce.id === fighter.id ||
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
    input(keyCode) {
        if (keyCode !== 13) { //Enter
            if (keyCode >= 48 && keyCode <= 57) {
                this.string += String(getNumber(keyCode));
			} else if (keyCode >= 65 && keyCode <= 90) {
                this.string += getAlphabet(keyCode);
			} else if (keyCode === 32) {
                this.string += ' ';
            } else if (keyCode === 8) {
                this.string = this.string.substr(0, this.string.length - 1);
			} else if (keyCode === 40 && this.stringSave) { //down
                this.string = this.stringSave;
            } else if (!keyCode) { //init
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
                    rogue.drawStats();
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
            } else {
				message.draw('Incorrect syntax');
			}
        } else if (flag.create === 'fighter') {
            if (fighterTab[type] && fighterTab[type][num]) {
                this.enemy({
                    type: type,
                    tabId: num,
                    position: LOCATION,
                    x: rogue.x,
                    y: rogue.y,
                    summon: true,
				});
				
                map.draw(rogue.x, rogue.y);
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
        this.stairs(rndIntBet(MIN_STAIRS_NUM, MAX_STAIRS_NUM), boss ? UP : RANDOM, INIT);
        this.trap(rndIntBet(MIN_TRAP_NUM, MAX_TRAP_NUM, RANDOM, RANDOM), RANDOM, INIT);
        let [startX, startY] = Object.keys(map.staircaseList)[dr === DOWN ? 0 : 1].split(',');
        rogue.putDown(false, stairs, Number(startX), Number(startY));
        if (boss) {
            this.enemy({
                type: 'misc',
                tabId: 2,
                position: RANDOM
			});
		}

        this.enemy({
            times: 10,
            position: INIT,
		});
		
        this.item({
            times: 10,
            position: INIT,
		});
		
        map.draw(rogue.x, rogue.y);
        let track = audio.getDungeonTrack(rogue.cdl, boss);
        if (audio.curTrack !== track) {
            audio.stop(audio.curTrack);
            audio.playMusic(track);
        }
    },

    town() {
        map.init(true);
        town.createAll();
        this.stairs(1, DOWN, LOCATION, POSITION.hell.x, POSITION.hell.y, true);
        rogue.putDown(true);
        map.draw(rogue.x, rogue.y);
        audio.stop(audio.curTrack);
        audio.playMusic(!rogue.inferno ? 'town' : 'town2');
    },

    enemy({
        position,
        x,
        y,
        summon,
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
            if (type === undefined || type === RANDOM) {
                do typeT = FT[rndInt(FT.length - 2)];
                while (fighterTab[typeT][0].lvl > lvl);
            }

            let fighter;
            if (tabId === undefined || tabId === RANDOM) {
                let j = 0;
                let fighterNums = fighterNumsMap.get(typeT);
                fighterNums.shuffle();
                do {
                    tabIdT = fighterNums[j++];
                    if (tabIdT === undefined) return; //
                    fighter = fighterTab[typeT][tabIdT];
                } while (fighter.mod === UNIQUE && rogue.cue[fighter.name[ENG]] ||
                    fighter.lvl > lvl || evalPercentage(fighter.rarity));
            } else {
                fighter = fighterTab[typeT][tabIdT];
            }

            let count = fighter.group ? rndIntBet(2, 4) : 1;
            let [posT, xT, yT] = [position, x, y];
            for (let j = 0; j < count; j++) {
                let fighterNew = new Enemy(fighter);
                fighterNew.init(posT, xT, yT, summon, magic, bias, lvl);
                if (fighter.group && posT !== LOCATION) {
                    posT = LOCATION;
                    [xT, yT] = [fighterNew.x, fighterNew.y];
                }
            }
        }
    },

    enemyList() {
        this.enemies = {};
        for (let key in fighterTab) {
            for (let fighter of fighterTab[key]) {
				this.enemies[`${fighter.lvl},${fighter.mod},${key}`] = fighter.name['b'];
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
            if (type === undefined || type === RANDOM) typeT = Item.getType(magic);
            if (tabId === undefined || tabId === RANDOM) [typeT, tabIdT] = Item.getTabId(typeT, lvl, magic);
            let item = itemTab[typeT].get(tabIdT);
            if (item.lethe) rogue.lethe++;
            let itemNew = new Item(item, quantity);
            itemNew.init(position, x, y, magic, lvl, uniqueId, starter, matBase, matId);
            if (position === LIST) {
                itemNew.place = flag.shop ? P_SHOP : P_PACK;
                return itemNew;
            }
        }
    },

    itemList() {
        this.items = {};
        flag.shop = true;
        for (let type of equipmentList) {
            this.items[type] = [];
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
                        position: LIST,
                        lvl: 99,
                        matBase: matBase,
                        matId: i,
					});
					
                    item.embeddedMax = 0;
                    let name = item.getName();
                    this.items[type].push(`${name},${item.weight}kg`);
                }
            }
		}
		
        flag.shop = false;
    },

    trap(times, tabId, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (tabId === undefined || tabId === RANDOM) tabIdT = rndInt(trapTab.length - 1);
            let trap = new Trap(trapTab[tabIdT], !show);
            trap.init(position, x, y);
        }
    },

    stairs(times, tabId, position, x, y, show) {
        for (let i = 0; i < times; i++) {
            let tabIdT = tabId;
            if (position === INIT) {
                if (tabId === RANDOM) {
                    if (i <= 1) {
                        tabIdT = i ? DOWN : UP;
                    } else {
                        tabIdT = i % 2 ? DOWN : UP;
                    }
                }

                show = i <= 1 || coinToss();
            } else if (tabId === RANDOM) {
				tabIdT = coinToss() ? DOWN : UP;
			}

            let staircase = new Staircase(stairsMap.get(tabIdT), !show);
            staircase.init(position, x, y);
        }
    },
};
const game = {
    title(init) {
        display.clearAll();
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.textAlign = 'center'
        let fontStyle = FONT_STYLE[option.getLanguage()];
        let fs = display.fs;
        ctxInv.font = fs + 30 + 'px ' + FONT_STYLE['c'];
        display.text({
            ctx: ctxInv,
            msg: 'Death and Birth',
            xPx: display.width / 2,
            yPx: display.height * 3 / 7,
        });

        ctxInv.font = fs + 2 + 'px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                '[Enter] to start' :
                '[Enter] ゲームスタート',
            y: 2,
            xPx: display.width / 2,
            yPx: display.height / 2,
        });

        ctxInv.font = fs - 3 + 'px ' + fontStyle;
        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: `ver ${VERSION.toFixed(3)}`,
            x: -2,
            y: -2,
            xPx: display.width,
            yPx: display.height,
        });

        ctxInv.restore();
        flag.retry = true;
        audio.stop(audio.curTrack);
        if (!init) audio.playMusic('title');
	},
	
    over() {
        display.clearAll();
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.textAlign = 'center'
        let fontStyle = FONT_STYLE[option.getLanguage()];
        let fs = display.fs;
        ctxInv.font = fs + 30 + 'px ' + FONT_STYLE['c'];
        display.text({
            ctx: ctxInv,
            msg: 'G A M E  O V E R',
            xPx: display.width / 2,
            yPx: display.height * 3 / 7,
        });

        ctxInv.font = fs + 2 + 'px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                '[Enter] to retry' :
                '[Enter] リトライ',
            y: 2,
            xPx: display.width / 2,
            yPx: display.height / 2,
        });

        ctxInv.restore();
        flag.retry = true;
	},
	
    quit(keyCode, save) {
        if (keyCode !== 89 && keyCode !== 78) return; //y, n
        if (keyCode === 78) {
            flag.quit = false;
            flag.regular = true;
            inventory.clear();
            return;
		}
		
        flag.died = true;
        flag.regular = false;
        this.title();
        if (!save) data.delete(data.name);
        rogue = null;
	},
	
    start() {
        initFlag();
        initTab();
        audio.init();
        rogue = new Rogue();
        rogue.init();
        map.stashList = [];
        message.list = [];
        message.clear(true);
        this.clearLevel();
        creation.town();
	},
	
    clearLevel() {
        display.clearAll();
        rogue.checkUnique();
        rogue.numSteps = 0;
        rogue.ce = null;
        rogue.litMapIds = {};
	},
};
const help = {
    list: [
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
        { cmd: { a: 'd', b: 'd'}, name: { a: 'drop item', b: 'アイテムを落とす' }},
        { cmd: { a: 'o', b: 'o'}, name: { a: 'open door', b: 'ドアを開ける' }},
        { cmd: { a: 'c', b: 'c'}, name: { a: 'close door', b: 'ドアを閉める' }},
        { cmd: { a: 's', b: 's'}, name: { a: 'search', b: '捜索する' }},
        { cmd: { a: 'r', b: 'r'}, name: { a: 'read scroll', b: '巻物を読む' }},
        { cmd: { a: 'q', b: 'q'}, name: { a: 'quaff potion', b: '薬を飲む' }},
        { cmd: { a: 'z', b: 'z'}, name: { a: 'zap wand', b: '魔法棒を振る' }},
        { cmd: { a: 'p', b: 'p'}, name: { a: 'pack item', b: 'アイテムを詰める' }},
        { cmd: { a: 'E', b: 'E'}, name: { a: 'eat food', b: '食事する' }},
        { cmd: { a: 'Q', b: 'Q'}, name: { a: 'quit', b: 'ゲームを放棄する' }},
        { cmd: { a: 'Esc', b: 'Esc'}, name: { a: 'cancel command', b: '取り消す' }},
        { cmd: { a: 'x', b: 'x'}, name: { a: 'examine things', b: '探査する' }},
        { cmd: { a: 'a', b: 'a'}, name: { a: 'add bookmark', b: 'しおりを挟む' }},
        { cmd: { a: 'G', b: 'G'}, name: { a: 'gain stat/skill', b: 'スキル/能力値を得る' }},
        { cmd: { a: 'f', b: 'f'}, name: { a: 'fire', b: '射る' }},
        { cmd: { a: 't', b: 't'}, name: { a: 'throw item', b: 'アイテムを投げる' }},
        { cmd: { a: 'S', b: 'S'}, name: { a: 'swap gear', b: '装備を持ち替える' }},
        { cmd: { a: 'C', b: 'C'}, name: { a: 'character description', b: 'キャラ詳細' }},
        { cmd: { a: 'F', b: 'F'}, name: { a: 'fuel', b: '補給する' }},
        { cmd: { a: 'R', b: 'R'}, name: { a: 'Rest', b: '休む' }},
        { cmd: { a: 'A', b: 'A'}, name: { a: 'alchemy', b: '錬金術' }},
        { cmd: { a: '1-9', b: '1-9'}, name: { a: 'use item', b: 'アイテムを使う' }},
        { cmd: { a: 'F1-F12', b: 'F1-F12'}, name: { a: 'use skill', b: 'スキルを使う' }},
        { cmd: { a: 'Alt+dir', b: 'Alt+方向'}, name: { a: 'attack stationary/dig', b: 'その場で攻撃する/掘る' }},
        { cmd: { a: 'Shift+dir', b: 'Shift+方向'}, name: { a: 'dash', b: '走る' }},
        { cmd: { a: '.', b: '.'}, name: { a: 'stap on', b: '踏む' }},
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

    wizardList: [ 
        { cmd: { a: 'Ctrl+e', b: 'Ctrl+e'}, name: { a: '*enlightenment*', b: '*啓蒙*' }},
        { cmd: { a: 'Ctrl+z', b: 'Ctrl+z'}, name: { a: '*indestructible*', b: '*破壊不能*' }},
        { cmd: { a: 'Ctrl+q', b: 'Ctrl+q'}, name: { a: '*create trap*', b: '*罠を生成する*' }},
        { cmd: { a: 'Ctrl+a', b: 'Ctrl+a'}, name: { a: '*create monster*', b: '*モンスターを生成する*' }},
        { cmd: { a: 'Ctrl+i', b: 'Ctrl+i'}, name: { a: '*create item*', b: '*アイテムを生成する*' }},
    ],

    main() {
        this.i = 1;
        this.j = MS + 1;
        this.xPx = 0;
        inventory.shadow(MIDDLE);
        this.loop(this.list);
        if (rogue.isWizard) this.loop(this.wizardList);
    },
    
    loop(list) {
        let i = this.i;
        let j = this.j;
        let xPx = this.xPx;
        let ctxInv = display.ctxes.inv;
        let a = option.getLanguage();
        for (let value of list) {
            let cmd = value.cmd[a];
            ctxInv.save();
            display.text({
                ctx: ctxInv,
                msg: cmd,
                x: i - 0.5,
                y: j,
                xPx: xPx,
                limit: 3,
            });

            let name = value.name[a];
            ctxInv.textAlign = 'left';
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 3,
                y: j++,
                xPx: xPx,
                limit: 12,
            });

            ctxInv.restore();
            if (j === IN_HEIGHT) {
                j = MS + 1;
                xPx += display.width / 3;
            }
        }
        
        this.i = i;
        this.j = j;
        this.xPx = xPx;
    }
};
const input = {
    init() {
        document.onkeyup = this.onkeyup.bind(this);
        document.onkeydown = this.onkeydown.bind(this);
    },

    onkeyup(e) {
        let keyCode = e.keyCode;
        if (keyCode === 16) this.isShift = false;
        if (keyCode === 17) this.isCtrl = false;
    },

    onkeydown(e) {
        if (flag.wait) {
            if (!flag.died) map.queue.moveAll();
            return false;
        }
       
        let keyCode = e.keyCode;
        if (keyCode === 16) this.isShift = true;
        if (keyCode === 17) this.isCtrl = true;
        if ((flag.dash || flag.rest) && keyCode !== 16) {
            message.draw(message.get(M_INTERRUPTED));
            flag.dash = flag.rest = false;
            return false;
        }

        if (flag.equipment || flag.inventory) inventory.clear();
        if (keyCode !== 16 && keyCode !== 17) {
            if (flag.clearInv) {
                inventory.clear();
                flag.clearInv = false;
            }
        }
        
        if (keyCode === 27 || keyCode === 32) message.clear();
        if (flag.regular) {
            this.eventFlag(keyCode, e.altKey);
        } else if (!flag.died && !flag.retry &&
            (keyCode === 27 ||
            (!flag.create && keyCode == 32) ||
            (flag.message && keyCode === 80 && this.isCtrl))) { //ESC,  Space, ^p
            rogue.cancelCommand();
        } else if (flag.number) {
            rogue.inputNumber(keyCode);
        } else if (flag.openDoor || flag.closeDoor) {
            rogue.openOrCloseDoor(keyCode);
        } else if (flag.investigate) {
            rogue.investigateOne(keyCode);
        } else if (flag.drop) {
            rogue.drop(keyCode);
        } else if (flag.destroy) {
            rogue.destroy(keyCode);
        } else if (flag.equip) {
            rogue.equip(keyCode);
        } else if (flag.unequip) {
            rogue.unequip(keyCode);
        } else if (flag.eat) {
            rogue.eat(keyCode);
        } else if (flag.quaff) {
            rogue.quaffPotion(keyCode);
        } else if (flag.read) {
            rogue.read(keyCode);
        } else if (flag.synthesize) {
            rogue.synthesize(keyCode);
        } else if (flag.grab) {
            rogue.grabItem(keyCode);
        } else if (flag.examine) {
            rogue.examine(keyCode);
        } else if (flag.identify) {
            rogue.identify(keyCode);
        } else if (flag.repair || flag.blacksmith) {
            rogue.repair(keyCode);
        } else if (flag.disint) {
            rogue.disintegrate(keyCode);
        } else if (flag.aim) {
            rogue.aim({ keyCode: keyCode });
        } else if (flag.zap) {
            rogue.zap(keyCode);
        } else if (flag.throw) {
            rogue.throw(keyCode);
        } else if (flag.skill) {
            rogue.castSkill(keyCode);
        } else if (flag.sortSkill) {
            rogue.sortSkill(keyCode);
        } else if (flag.message) {
            message.previous(keyCode);
        } else if (flag.pack) {
            rogue.packOrUnpack(keyCode);
        } else if (flag.bookmark) {
            rogue.addOrRemoveBookmark(keyCode);
        } else if (flag.gain) {
            rogue.gainStatOrSkill(keyCode);
        } else if (flag.fuel) {
            rogue.fuel(keyCode);
        } else if (flag.shop) {
            rogue.shop(keyCode, e.altKey);
        } else if (flag.cure) {
            rogue.cureShop(keyCode);
        } else if (flag.stash) {
            rogue.stash(keyCode, e.altKey);
        } else if (flag.help && keyCode === 191 && this.isShift) { //?
            inventory.clear();
            flag.help = false;
            flag.regular = true;
        } else if (flag.create) {
            creation.input(keyCode);
        } else if (flag.minimap) {
            minimap.draw(keyCode);
        } else if (flag.option) {
            option.main(keyCode);
        } else if (flag.quit) {
            game.quit(keyCode);
        }

        if (flag.died) {
            if (data.failed) {
                if (keyCode === 89 && this.isShift) { //Y
                    game.start();
                    data.failed = false;
                    data.delete(data.name);
                    message.draw(option.isEnglish() ?
                        'Deleted the data' :
                        'データ消去しました')
                }
            } else if (keyCode === 13) { //Enter
                if (rogue && rogue.isWizard) {
                    rogue.revive();
                } else if (!flag.retry) {
                    game.over();
                } else {
                    data.load();
                }
            }
        } else {
            if (rogue.done) {
                rogue.decreaseEnergy();
                map.queue.moveAll();
            }
            
            if (flag.equipment) {
                if (flag.regular && keyCode !== 27 && keyCode !== 32 && !flag.clearInv) { //Esc, Back space
                    rogue.equipmentList();
                } else {
                    flag.equipment = false;
                }
            }

            if (flag.inventory) {
                if (flag.regular && keyCode !== 27 && keyCode !== 32 && !flag.clearInv) {
                    rogue.showInventory(P_PACK);
                } else {
                    flag.inventory = false;
                }
            }
        }
        
        //^m
        if (keyCode === 77 && this.isCtrl) audio.mute();
        
        //disable browser shortcuts
        if (!this.isShift || !this.isCtrl || keyCode !== 73) return false;
    },

    eventFlag(keyCode, isAlt) {
        switch (keyCode) {
            case 66: //b
            case 72: //h
            case 74: //j
            case 75: //k
            case 76: //l
            case 78: //n
            case 85: //u
            case 89: //y
                if (!option.rogueStyleMove.user) break;
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
                if (this.isCtrl) break;
                if (isAlt) {
                    rogue.attackStationary(keyCode);
                } else if (this.isShift) {
                    rogue.dash(keyCode);
                } else {
                    rogue.move(keyCode);
                }

                break;
            case 49: //1~9
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                if (this.isShift || this.isCtrl) break;
                rogue.useBoxItem(keyCode);
                break;
            case 65: //a add bookmark, A alchemy, ^a *create monster*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    flag.create = 'fighter';
                    creation.input();
                    message.draw('Input type and tagId', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    if (!Object.keys(rogue.recipes).length) {
                        message.draw(message.get(M_DONT_KNOW_RECIPE));
                        break;
                    }

                    flag.synthesize = true;
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_CUBE);
                    message.draw(message.get(M_SYNTHESIZE) + message.get(M_FLOOR), true);
                    flag.regular = false;
                } else {
                    rogue.showSkill(rogue.skill);
                    rogue.showSkill(rogue.bookmarks, true);
                    message.draw(message.get(M_BOOKMARK), true);
                    flag.bookmark = 1;
                    flag.regular = false;
				}
				
                break;
            case 67: //c close door, C character description
                if (this.isShift) {
                    rogue.investigate(MIDDLE, true);
                    flag.clearInv = true;
                    break;
                }
            case 79: //o openDoor
                if (this.isShift || this.isCtrl) break;
                keyCode === 79 ? flag.openDoor = true : flag.closeDoor = true;
                if (rogue.searchDoor() <= 1) {
                    flag.openDoor = flag.closeDoor = false;
                    break;
				}
				
                message.draw(message.get(M_OPEN_OR_CLOSE), true);
                flag.regular = false;
                break;
            case 68: //d drop, ^d destroy, 
                if (this.isShift) break;
                if (this.isCtrl) {
                    message.draw(message.get(M_DESTROY) + message.get(M_FLOOR), true);
                    flag.destroy = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    flag.regular = false;
                } else {
                    flag.drop = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_DROP), true);
                    flag.regular = false;
				}
				
                break;
            case 69: //e equipmentList, E eat, ^e *enlightenment*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    map.lighten();
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.eat = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_EAT) + message.get(M_FLOOR), true);
                    flag.regular = false;
                } else {
                    flag.equipment = !flag.equipment;
                }

                break;
            case 70: //f fire, F fuel
                if (this.isCtrl) break;
                if (this.isShift) {
                    if (!rogue.equipment['light']) {
                        message.draw(message.get(M_DONT_EQUIP_LIGHT));
                        break;
					}
					
                    flag.fuel = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_FUEL) + message.get(M_FLOOR), true);
                    flag.regular = false;
                } else {
                    if (!rogue.haveMissile(true)) break;
                    rogue.ci = rogue.getAmmo(rogue.equipment['main'].throwType);
                    if (!rogue.ci) {
                        message.draw(message.get(M_DONT_HAVE_AMMO));
                        break;
					}
					
                    flag.arrow = true;
                    flag.aim = true;
                    message.draw(message.get(M_FIRE) + message.get(M_TO_EXAMINE), true);
                    rogue.examinePlot(true);
                    flag.regular = false;
				}
				
                break;
            case 71: //g grab, G gain
                if(this.isCtrl) break;
                if (this.isShift) {
                    flag.gain = 1;
                    rogue.showInventory(P_PACK);
                    rogue.showStats();
                    message.draw(message.get(M_GAIN), true);
                    flag.regular = false;
                } else {
                    rogue.grabItem();
                }

                break;
            case 73: //i inventory, I investigate, ^i *create item*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    flag.create = 'item';
                    creation.input();
                    message.draw('Input type, tagId and quantity', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    flag.investigate = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_INVESTIGATE) + message.get(M_FLOOR), true)
                    flag.regular = false;
                } else {
                    flag.inventory = !flag.inventory;
                }
				
                break;
            case 77: //m skill, M minimap
                if (this.isCtrl) break;
                if (this.isShift) {
                    minimap.draw(65);
                    message.draw(message.get(M_MINIMAP), true);
                    flag.minimap = true;
                    flag.regular = false;
                } else {
                    if (!rogue.checkToCast()) break;
                    flag.skill = true;
                    rogue.showSkill(rogue.skill);
                    message.draw(message.get(M_CAST), true);
                    flag.regular = false;
				}
				
                break;
            case 80: //p pack sort, ^p previous message
                if (this.isShift) break;
                if (this.isCtrl) {
                    message.previous(72); //h
                    flag.message = true;
                    flag.regular = false;
                } else {
                    flag.pack = true;
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_BOX);
                    message.draw(message.get(M_PACK_OR_UNPACK) + message.get(M_FLOOR), true);
                    flag.regular = false;
				}
				
                break;
            case 81: //q quaff, Q quit, ^q *create trap*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.haveCast(CREATE_TRAP, 10);
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.quit = true;
                    message.draw(message.get(M_ASK_TO_QUIT));
                    message.draw(message.get(M_QUIT), true);
                    flag.regular = false;
                } else {
                    flag.quaff = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_QUAFF) + message.get(M_FLOOR), true);
                    flag.regular = false;
                }

                break;
            case 82: //r read, R rest, ^r redraw
                if (this.isCtrl) {
                    map.redraw(rogue.x, rogue.y);
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.rest = true;
                    rogue.rest();
                } else {
                    if (!rogue.canRead()) break;
                    flag.read = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_READ) + message.get(M_FLOOR), true);
                    flag.regular = false;
                }

                break;
            case 83: //s searching, S swap, ^s save
                if (this.isCtrl) {
                    data.save();
                } else if (this.isShift) {
                    rogue.swap();
                } else {
                    rogue.searchHiddenObject();
                }

                break;
            case 84: //t throw, T unequip
                if (this.isCtrl) break;
                if (this.isShift) {
                    if (rogue.isNaked()) {
                        message.draw(message.get(M_DONT_HAVE_EQUIPMENT));
                        break;
					}
					
                    message.draw(message.get(M_TAKE_OFF), true);
                    rogue.equipmentList();
                    rogue.showInventory(P_PACK);
                    flag.unequip = true;
                    flag.regular = false;
                } else {
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_THROW) + message.get(M_FLOOR), true);
                    flag.throw = true;
                    flag.regular = false;
				}
				
                break;
            case 86: //^v version
                if (this.isShift) break;
                if (this.isCtrl) message.draw(`Death and Birth ver ${VERSION.toFixed(3)}`);
                break;
            case 87: //w equip
                if (this.isShift || this.isCtrl) break;
                flag.equip = true;
                rogue.showInventory(P_PACK);
                rogue.equipmentList();
                message.draw(message.get(M_EQUIP) + message.get(M_FLOOR), true);
                flag.regular = false;
                break;
            case 88: //x examine, ^x exit 
                if (this.isShift) break;
                if (this.isCtrl) {
                    data.exit();
                } else {
                    if (rogue.blinded) {
                        message.draw(message.get(M_CANT_EXAMINE));
                        break;
                    }
                    
                    flag.examine = true;
                    cursol.init();
                    rogue.examine();
                    flag.regular = false;
                }

                break;
            case 90: //z zap, ^z *indestructible*
                if (this.isShift) break;
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.indestructible = !rogue.indestructible;
                } else {
                    flag.zap = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_ZAP) + message.get(M_FLOOR), true);
                    flag.regular = false;
                }

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
                if (this.isCtrl) break;
                rogue.castBookmarkedSkill(keyCode);
                break;
            case 187: //= option
            case 189: //JIS keyboard
            case 173: //firefox
                if (this.isCtrl) break;
                flag.option = true;
                inventory.show(option.list, RIGHT);
                message.draw(message.get(M_OPTION), true);
                flag.regular = false;
                break;
            case 188: //<
                if (this.isCtrl) break;
                if (this.isShift) rogue.downOrUpStairs(keyCode);
                break;
            case 190: //. stap on, > down stairs
            case 110: //T. stap on
                if (this.isCtrl) break;
                if (keyCode === 190 && this.isShift) {
                    rogue.downOrUpStairs(keyCode);
                } else if (!map.coords[rogue.x][rogue.y].getInfo(true)) {
                    rogue.done = true;
                }

                break;
            case 191: //? help
                if (this.isCtrl) break;
                if (this.isShift) {
                    flag.help = true;
                    help.main();
                    flag.regular = false;
                }

                break;
		}
    }
}
window.onload = () => {
    display.change(option.display.user);
    game.title(true);
    input.init();
}
