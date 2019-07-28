const game = {
    title(init) {
        display.clearAll();
        flag.title = true;
        audio.stop(audio.curTrack);
        if (!init || !DEBUG) audio.playMusic('title');
	},
	
    over() {
        display.clearAll();
        flag.retry = true;
	},
	
    quit(key, save) {
        if (key === 'N') {
            flag.quit = false;
            flag.regular = true;
            inventory.clear();
		}
		
        if (key !== 'Y') return;
        flag.died = true;
        flag.title = true;
        flag.regular = false;
        this.title();
        if (!save) data.delete();
	},
	
    start() {
        initFlag();
        initTab();
        audio.init();
        rogue = new Rogue;
        rogue.init();
        vue.rogue = rogue;
        map.stashList = [];
        message.clear();
        this.clearLevel();
        creation.town();
        creation.setList();
	},
	
    clearLevel() {
        display.clearAll();
        statistics.clearEnemyBar();
        rogue.checkUnique();
        rogue.numSteps = 0;
        rogue.ce = null;
        rogue.litMapIds = {};
	},
};
