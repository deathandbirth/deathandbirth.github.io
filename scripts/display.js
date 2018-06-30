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
