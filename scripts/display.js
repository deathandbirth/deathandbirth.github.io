const display = {
    init() {
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
                ctx.font = fs + 'px ' + FONT_STYLE[ENG];
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
                let rect = document.getElementById("canvas-container")
                    .getBoundingClientRect();
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
        limit,
        xPx = 0,
        yPx = 0,
        limitPx = 0,
        stroke,
        fs = this.fs,
    }) {
        let limitX = limit ? limit * fs + limitPx : undefined;
        x += .5;
        y += .5;
        let args = [msg, x * fs + xPx, y * fs + yPx, limitX];
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.strokeText(...args);
        }

        ctx.fillText(...args);
        ctx.font = fs;

        if (ctx.canvas.id === "canvas-main") {
            
        }
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
    display.canvases = {};
    display.ctxes = {};
    let canvases = [];
    let canvasNames = ['ground', 'object', 'shadow', 'cursor'];
    for (let name of canvasNames) {
        let canvas = document.createElement('canvas');
        canvas.id = 'canvas-' + name;
        canvases.push(canvas);
    }

    canvases.push(document.getElementById('canvas-main'));
    for (let canvas of canvases) {
        let id = canvas.id.replace('canvas-', '');
        display.canvases[id] = canvas;
        display.ctxes[id] = canvas.getContext('2d');
    }

    display.init();
}

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