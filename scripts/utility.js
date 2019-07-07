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
            id = LEFT;
            break;
        case 'j':
        case 'J':
        case 'ArrowDown':
        case 'Down':
            id = DOWN;
            break;
        case 'k':
        case 'K':
        case 'ArrowUp':
        case 'Up':
            id = UP;
            break;
        case 'l':
        case 'L':
        case 'ArrowRight':
        case 'Right':
            id = RIGHT;
            break;
        case 'y': 
        case 'Y':
        case 'Home':
            id = UPLEFT;
            break;
        case 'b':
        case 'B':
        case 'End':
            id = DOWNLEFT;
            break;
        case 'u':
        case 'U':
        case 'PageUp':
            id = UPRIGHT;
            break;
        case 'n':
        case 'N':
        case 'PageDown':
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
