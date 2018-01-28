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

    getRndTerm() {
        return this.list[EA[rndInt(3)]].term;
    }
};
