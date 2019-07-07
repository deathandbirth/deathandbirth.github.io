const game = {
    title(init) {
        display.clearAll();
        flag.title = true;
        audio.stop(audio.curTrack);
        if (!init) audio.playMusic('title');
	},
	
    over() {
        display.clearAll();
        flag.retry = true;
	},
	
    quit(key, save) {
        if (key === 'n') {
            flag.quit = false;
            flag.regular = true;
            inventory.clear();
		}
		
        if (key !== 'y') return;
        flag.died = true;
        flag.title = true;
        flag.regular = false;
        this.title();
        if (!save) data.delete(data.name);
	},
	
    start() {
        initFlag();
        initTab();
        audio.init();
        rogue = new Rogue;
        rogue.init();
        vue.rogue = rogue;
        map.stashList = [];
        vue.msgList.splice(0);
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
