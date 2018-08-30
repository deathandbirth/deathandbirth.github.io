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
