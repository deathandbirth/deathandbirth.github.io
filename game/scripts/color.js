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
