const game = {
    help: {
        main() {
            this.i = 1;
            this.j = MS + 1;
            inventory.shadow(MIDDLE);
            this.loop(CL);
            if (wizard) this.loop(CLW);
		},
		
        loop(list) {
            let i = this.i;
            let j = this.j;
            for (let key in list) {
                ctsInv.save();
                ctsInv.fillText(key, (i - 0.5) * fs, j * fs);
                ctsInv.textAlign = 'left';
                ctsInv.fillText(list[key][option.getLanguage()], (i + 4) * fs, (j++) * fs);
                ctsInv.restore();
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
        this.clearDisplay();
        ctsInv.save();
        ctsInv.textAlign = 'center'
        ctsInv.font = '40px Arial';
        ctsInv.fillText('Death and Birth', IN_WIDTH / 2 * fs, IN_HEIGHT / 2 * fs);
        ctsInv.font = '20px Arial';
        ctsInv.fillText(option.isEnglish() ?
            '[Enter] to start' :
            '[Enter] 開始', IN_WIDTH / 2 * fs, (IN_HEIGHT / 2 + 2) * fs);
        ctsInv.font = '15px Arial';
        ctsInv.textAlign = 'right';
        ctsInv.fillText(`ver ${VERSION}`, canvas.width - 2 * fs, canvas.height - 2 * fs);
        ctsInv.restore();
        flag.retry = true;
        audio.stop(audio.curTrack);
        audio.playMusic('title');
	},
	
    over() {
        this.clearDisplay();
        ctsInv.save();
        ctsInv.textAlign = 'center'
        ctsInv.font = '40px Arial';
        ctsInv.fillText('G A M E  O V E R', IN_WIDTH / 2 * fs, IN_HEIGHT / 2 * fs);
        ctsInv.font = '20px Arial';
        ctsInv.fillText(option.isEnglish() ?
            '[Enter] to retry' :
            '[Enter] リトライ', IN_WIDTH / 2 * fs, (IN_HEIGHT / 2 + 2) * fs);
        ctsInv.restore();
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
        this.clearDisplay();
        rogue.checkUnique();
        Enemy.list = {};
        Item.list = {};
        Staircase.list = {};
        rogue.numSteps = 0;
        rogue.ce = null;
        queue.list = [];
        rogue.portal.x = rogue.portal.y = 0;
        litMapIds = {};
	},

    clearDisplay() {
        ctxBuf.clearRect(0, 0, canvas.width * 2, canvas.height * 2);
        ctxMain.clearRect(0, 0, canvas.width, canvas.height);
        ctsInv.clearRect(0, 0, canvas.width, canvas.height);
        ctxStats.clearRect(0, 0, canvas.width, canvas.height);
        ctxMsg.clearRect(0, 0, canvas.width, canvas.height);
        // ctxMap.clearRect(0,0,canvas.width,canvas.height);
    }
};
