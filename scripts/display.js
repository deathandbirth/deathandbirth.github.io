const canvasIds = ['buf', 'main', 'cur', 'msg', 'stats', 'map', 'inv'];
const canvas = {};
const ctxes = {};

{
    let parent = document.getElementById('container');
    parent.innerHTML = '';
    for (let i = 0, l = canvasIds.length; i < l; i++) {
        let id = canvasIds[i];
        let child = document.createElement('canvas');
        canvas[id] = child;
        ctxes[id] = child.getContext('2d');
        if (id === 'buf') continue;
        child.style.position = 'absolute';
        child.style.left = 0;
        child.style.top = 0;
        child.style['z-index'] = i;
        parent.appendChild(child);
    }
}

let ctxBuf = ctxes.buf;
let ctxMain = ctxes.main;
let ctxCur = ctxes.cur;
let ctxStats = ctxes.stats;
let ctxMap = ctxes.map;
let ctxInv = ctxes.inv;
let ctxMsg = ctxes.msg;

const display = {
    list: {
        a: { width: 640, height: 360, fs: 13 },
        b: { width: 768, height: 432, fs: 16 },
    },

    change(a, draw) {
        let list = this.list[a];
        container.style.width = list.width + 'px';
        container.style.height = list.height + 'px';
        canvas.width = list.width;
        canvas.height = list.height;
        fs = list.fs;
        minimap.fs = fs / 2;
        for (let key in canvas) {
            if (key === 'width' || key === 'height') continue;
            let cvs = canvas[key];
            let times = key === 'buf' ? 2 : 1;
            cvs.setAttribute('width', list.width * times);
            cvs.setAttribute('height', list.height * times);
        }

        for (let key in ctxes) {
            let ctx = ctxes[key];
            if (key === 'main') continue;
            ctx.textBaseline = 'middle';
            ctx.lineJoin = 'round';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = WHITE;
            let fontStyle = FONT_STYLE[option.getLanguage()];
            if (key === 'cur') {
                ctx.font = fs + 6 + 'px ' + fontStyle;
                ctx.strokeStyle = YELLOW;
            } else if (key === 'map') {
                ctx.font = '10px ' + fontStyle;
            } else if (key === 'buf') {
                ctx.font = fs - 1 + 'px ' + FONT_STYLE[ENG];
            } else {
                ctx.font = fs - 1 + 'px ' + fontStyle;
            }

            ctx.textAlign = key === 'stats' || key === 'inv' || key === 'msg' ? 'left' : 'center';
        }

        textLen.init();
        if (draw) {
            map.redraw(rogue.x, rogue.y);
            map.draw(rogue.x, rogue.y);
            rogue.drawStats();
        }
    },
};
