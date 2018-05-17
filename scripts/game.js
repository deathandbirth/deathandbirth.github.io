const game = {
    title(init) {
        display.clearAll();
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.textAlign = 'center'
        let fontStyle = FONT_STYLE[option.getLanguage()];
        ctxInv.font = '40px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: 'Death and Birth',
            x: IN_WIDTH / 2,
            y: IN_HEIGHT / 2,
        });

        ctxInv.font = '20px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                '[Enter] to start' :
                '[Enter] 開始',
            x: IN_WIDTH / 2,
            y: IN_HEIGHT / 2 + 2,
        });

        ctxInv.font = '15px ' + fontStyle;
        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: `ver ${VERSION}`,
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
        ctxInv.font = '40px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: 'G A M E  O V E R',
            x: IN_WIDTH / 2,
            y: IN_HEIGHT / 2,
        });

        ctxInv.font = '20px ' + fontStyle;
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                '[Enter] to retry' :
                '[Enter] リトライ',
            x: IN_WIDTH / 2,
            y: IN_HEIGHT / 2 + 2,
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
