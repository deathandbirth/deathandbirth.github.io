const display = {
    list: {
        a: { width: 640, height: 360, fs: 13 },
        b: { width: 768, height: 432, fs: 16 },
        c: { width: 896, height: 504, fs: 18 },
        d: { width: 1024, height: 576, fs: 20 },
    },

    change(a, draw) {
        let list = this.list[a];
        container.style.width = list.width + 'px';
        container.style.height = list.height + 'px';
        canvas.width = list.width;
        canvas.height = list.height;
        let fs = list.fs;
        this.fs = fs;
        minimap.fs = fs / 2;
        for (let key in canvas) {
            if (key === 'width' || key === 'height') continue;
            let cvs = canvas[key];
            let times = key === 'buf' ? 2 : 1;
            cvs.setAttribute('width', list.width * times);
            cvs.setAttribute('height', list.height * times);
        }

        for (let key in this.ctxes) {
            let ctx = this.ctxes[key];
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
        let width = canvas.width;
        let height = canvas.height;
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
    }
};

const canvas = {};

{
    let canvasIds = ['buf', 'main', 'cur', 'msg', 'stats', 'map', 'inv'];
    let parent = document.getElementById('container');
    parent.innerHTML = '';
    display.ctxes = {};
    for (let i = 0, l = canvasIds.length; i < l; i++) {
        let id = canvasIds[i];
        let child = document.createElement('canvas');
        canvas[id] = child;
        display.ctxes[id] = child.getContext('2d');
        if (id === 'buf') continue;
        child.style.position = 'absolute';
        child.style.left = 0;
        child.style.top = 0;
        child.style['z-index'] = i;
        parent.appendChild(child);
    }
}
