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
	
    quit(keyCode, save) {
        if (keyCode !== 89 && keyCode !== 78) return; //y, n
        if (keyCode === 78) {
            flag.quit = false;
            flag.regular = true;
            inventory.clear();
            return;
		}
		
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
