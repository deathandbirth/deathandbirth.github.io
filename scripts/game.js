const game = {
    help: {
        main() {
            this.i = 1;
            this.j = MS + 1;
            inventory.shadow(MIDDLE);
            this.loop(CL);
            if (rogue.isWizard) this.loop(CLW);
		},
		
        loop(list) {
            let i = this.i;
            let j = this.j;
            let ctxInv = display.ctxes.inv;
            for (let key in list) {
                ctxInv.save();
                display.text({
                    ctx: ctxInv,
                    msg: key,
                    x: i - 0.5,
                    y: j,
                });

                ctxInv.textAlign = 'left';
                display.text({
                    ctx: ctxInv,
                    msg: list[key][option.getLanguage()],
                    x: i + 4,
                    y: j++,
                });

                ctxInv.restore();
                if (j === IN_HEIGHT) {
                    j = MS + 1;
                    i += 14;
                }
			}
			
            this.i = i;
            this.j = j;
        }
	},
	
    title() {
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
        audio.playMusic('title');
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
        difficulty.init();
        rogue = new Rogue();
        rogue.init();
        enter[STASH].list = [];
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
        rogue.portal.x = rogue.portal.y = 0;
        rogue.litMapIds = {};
	},
};
