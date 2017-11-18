const Data = class {
    constructor() {
        this.convertCe(true);
        this.saveItemTab();
        this.coords = coords;
        this.option = option;
        this.difficulty = difficulty;
        this.messageList = message.list;
        this.litMapIds = litMapIds;
        if (rogue.cdl) this.stashList = enter[STASH].list;
        this.track = audio.curTrack;
        this.date = new Date();
        this.ver = VERSION;
    }

    loadInit() {
        this.loadOption();
        getRndName.init();
        this.loadItemTab();
        this.loadCoords();
        this.loadDifficulty();
        message.list = this.messageList;
        litMapIds = this.litMapIds;
        if (rogue.cdl) {
            this.loadItem(this.stashList);
            enter[STASH].list = this.stashList;
        }

        this.convertCe();
        display.clearAll();
        display.change(option.display.user, true);
        initFlag();
        this.loadAudio();
    }

    saveItemTab() {
        this.itemTab = {};
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll') continue;
            this.itemTab[key] = [];
            for (let [tabId, item] of itemTab[key].entries()) {
                let thisItem = {};
                thisItem.identified = item.identified;
                thisItem.name = {};
                thisItem.name['a'] = item.name['a'];
                thisItem.name['b'] = item.name['b'];
                if (key === 'potion') thisItem.color = item.color;
                this.itemTab[key][tabId] = thisItem;
            }
        }
    }

    loadItemTab() {
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll') continue;
            for (let [tabId, item] of itemTab[key].entries()) {
                let thisItem = this.itemTab[key][tabId];
                if (!thisItem) {
                    item.identified = false;
                    getRndName[key](item);
                    continue;
                }

                item.identified = thisItem.identified;
                item.name['a'] = thisItem.name['a'];
                item.name['b'] = thisItem.name['b'];
                if (key === 'potion') item.color = thisItem.color;
            }
        }
    }

    loadCoords() {
        queue.list = [];
        coords = this.coords;
        for (let locs of coords) {
            for (let loc of locs) {
                loc.__proto__ = Location.prototype;
                if (loc.fighter) {
                    if (loc.fighter.id === ROGUE) {
                        loc.fighter.__proto__ = Rogue.prototype;
                        rogue = loc.fighter;
                    } else {
                        loc.fighter.__proto__ = Enemy.prototype;
                        Enemy.list[loc.fighter.id] = loc.fighter;
                    }

                    queue.push(loc.fighter);
                    this.loadItem(loc.fighter.boxes);
                    this.loadItem(loc.fighter.equipment);
                    this.loadItem(loc.fighter.side);
                    this.loadItem(loc.fighter.pack);
                }

                if (loc.item['a']) this.loadItem(loc.item, true);
                if (loc.trap) loc.trap.__proto__ = Trap.prototype;
                if (loc.stairs) loc.stairs.__proto__ = Staircase.prototype;
                if (loc.enter) this.loadEntrance(loc);
            }
        }
    }

    loadItem(list, floor) {
        for (let key in list) {
            if (!list[key]) continue;
            list[key].__proto__ = Item.prototype;
            if (floor) Item.list[list[key].id] = list[key];
        }
    }

    loadEntrance(loc) {
        let entLoaded = loc.enter;
        if (entLoaded.shop || entLoaded.stash) {
            this.loadItem(entLoaded.list)
            enter[entLoaded.id].list = entLoaded.list;
        }

        if (!entLoaded.portal) loc.enter = enter[entLoaded.id];
    }

    loadOption() {
        for (let key in option.list) {
            let key2 = option.list[key]['a'];
            if (!this.option[key2]) {
                this.option[key2] = {};
                this.option[key2].user = option[key2].default;
            }

            option[key2].user = this.option[key2].user;
        }
    }

    loadDifficulty() {
        for (let key in this.difficulty) {
            difficulty[key] = this.difficulty[key];
        }
    }

    convertCe(save) {
        if (rogue.ce) rogue.ce = save ? rogue.ce.id : Enemy.list[rogue.ce];
        for (let key in Enemy.list) {
            let enemy = Enemy.list[key];
            if (enemy.ce) {
                if (save) {
                    enemy.ce = enemy.ce.id;
                } else {
                    enemy.ce = enemy.ce === ROGUE ? rogue : Enemy.list[enemy.ce];
                }
            }
        }
    }

    loadAudio() {
        audio.stop(audio.curTrack);
        audio.curTrack = this.track;
        let a = this.option['BGM'].user;
        audio.volBGM = option['BGM'].choise[a].a / 10;
        a = this.option['SE'].user;
        audio.volSE = option['SE'].choise[a].a / 10;
        audio.playMusic(audio.curTrack);
    }
}

const data = {
    name: 'Player',
    save(unload) {
        if (unload && audio.curTrack) audio.music[audio.curTrack].pause();
        if (flag.died || flag.retry || this.error) {
            return;
        } else if (flag.synthesize) {
            rogue.returnCubeItem();
        }

        message.draw(option.isEnglish() ? 'Saved' : '記録した');
        let saveData = new Data();
        localStorage.setItem(this.name, JSON.stringify(saveData));
    },

    load() {
        let found;
        let saveData = JSON.parse(localStorage.getItem(this.name));
        if (saveData !== null) {
            saveData.__proto__ = Data.prototype;
            try {
                saveData.loadInit();
                message.draw(option.isEnglish() ? 'Loaded' : '記録を読み込んだ');
            } catch (e) {
                this.failed = true;
                let ver = saveData.ver;
                display.text({
                    ctx: ctxInv,
                    msg: option.isEnglish() ?
                        `Failed to load. In order to delete your save data and continue, please push 'Y'.(ver ${ver})` :
                        `読み込みに失敗しました。セーブデータを消去してゲームを続けるには、'Y'を押してください。(ver ${ver})`,
                    x: 1,
                    y: 1,
                });
            }
        } else {
            game.start();
        }
    },

    delete(name) {
        localStorage.removeItem(name);
    },

    exit() {
        this.save();
        game.quit(89, true);
    },

    dontSave() {
        this.error = true;
        message.draw(option.isEnglish() ?
            'Error occurred' :
            'エラーが発生した');
    }
};

{
    window.addEventListener('beforeunload', data.save.bind(data, true), false);
    window.addEventListener('error', data.dontSave.bind(data), false);
}
