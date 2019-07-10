const Data = class {
    constructor() {
        this.convertCe(true);
        this.saveItemTab();
        this.coords = map.coords;
        this.option = option;
        this.messageList = message.list;
        if (rogue.cdl) this.stashList = map.stashList;
        this.track = audio.curTrack;
        this.date = new Date();
        this.ver = VERSION;
    }

    loadInit() {
        display.clearAll();
        this.loadOption();
        getRndName.init();
        this.loadItemTab();
        this.loadCoords();
        message.list = this.messageList;
        vue.msgList = message.list;
        if(this.ver < 0.003) {
            rogue.litMapIds = this.litMapIds;
            rogue.inferno = this.difficulty.inferno;
        }

        if (rogue.cdl) {
            this.loadItem(this.stashList);
            map.stashList = this.stashList;
        }

        this.convertCe();
        vue.rogue = rogue;
        vue.isEnglish = option.isEnglish();
        initFlag();
        rogue.litMapIds = {};
        rogue.lightenOrDarken('Lighten');
        map.redraw();
        this.loadAudio();
        creation.setList();
    }

    saveItemTab() {
        this.itemTab = {};
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe' && key !== 'orb') continue;
            this.itemTab[key] = [];
            for (let [tabId, item] of itemTab[key].entries()) {
                let thisItem = {};
                thisItem.identified = item.identified;
                thisItem.name = {};
                thisItem.name['a'] = item.name['a'];
                thisItem.name['b'] = item.name['b'];
                if (key === 'potion' || key === 'wand') thisItem.color = item.color;
                this.itemTab[key][tabId] = thisItem;
            }
        }
    }

    loadItemTab() {
        for (let key in itemTab) {
            if (key !== 'potion' && key !== 'wand' && key !== 'scroll' && key !== 'recipe' && key !== 'orb') continue;
            if (this.ver < 0.007 && key === 'orb') continue;
            if (this.ver < 0.009 && key === 'recipe') {
                for (let item of itemTab[key].values()) {
                    item.identified = false;
                    getRndName[key](item);
                }

                continue;
            }

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
                if (key === 'potion' || key === 'wand') item.color = thisItem.color;
            }
        }
    }

    loadCoords() {
        map.coords = this.coords;
        map.init(false, true);
        for (let locs of map.coords) {
            for (let loc of locs) {
                loc.__proto__ = Location.prototype;
                if (loc.fighter) this.loadFighter(loc.fighter);
                if (loc.item['a']) this.loadItem(loc.item, true);
                if (loc.enter) this.loadEntrance(loc.enter);
                if (loc.trap) { 
                    loc.trap.__proto__ = Trap.prototype;
                    map.trapList[loc.x + ',' + loc.y] = loc.trap;
                }

                if (loc.stairs) {
                    loc.stairs.__proto__ = Staircase.prototype;
                    map.staircaseList[loc.x + ',' + loc.y] = loc.stairs;
                }
            }
        }
    }

    loadFighter(fighter) {
        if (fighter.id === ID_ROGUE) {
            fighter.__proto__ = Rogue.prototype;
            rogue = fighter;
            if (this.ver < 0.009) {
                rogue.recipes = {};
                for (let key of itemTab['recipe'].keys()) {
                    rogue.recipes[key] = true;
                }
            }
        } else {
            fighter.__proto__ = Enemy.prototype;
            map.enemyList[fighter.id] = fighter;
        }

        map.queue.push(fighter);
        this.loadItem(fighter.boxes);
        this.loadItem(fighter.equipment);
        this.loadItem(fighter.side);
        this.loadItem(fighter.pack);
        if (this.ver < 0.007) {
            fighter.calcHP();
            fighter.calcMP();
        }
    }

    loadItem(list, floor) {
        for (let key in list) {
            let item = list[key]; 
            if (!item) continue;
            item.__proto__ = Item.prototype;
            if (floor) map.itemList[item.id] = item;
            if (item.embeddedList && item.embeddedList.length) this.loadItem(item.embeddedList);
            if (this.ver < 0.006 && item.type === 'gem') item.material = undefined;
            if (this.ver < 0.008 && item.type === 'material') item.tabId = materialList.indexOf(item.material);
        }
    }

    loadEntrance(enter) {
        if (enter.shop || enter.stash) this.loadItem(enter.list);
        if (enter.stash) map.stashList = enter.list;
        if (enter.portal) {
            map.portal = enter;
            enter.__proto__ = Portal.prototype;
        } else {
            enter.__proto__ = Entrance.prototype;
        }
    }

    loadOption() {
        for (let key in option.list) {
            let key2 = option.list[key]['key'];
            if (!this.option[key2]) {
                this.option[key2] = {};
                this.option[key2].user = option[key2].default;
            }

            option[key2].user = this.option[key2].user;
        }
    }

    /* TODO */
    convertCe(save) {
        if (rogue.ce) rogue.ce = save ? rogue.ce.id : map.enemyList[rogue.ce];
        for (let key in map.enemyList) {
            let enemy = map.enemyList[key];
            if (enemy.ce) {
                if (save) {
                    enemy.ce = enemy.ce.id;
                } else {
                    enemy.ce = enemy.ce === ID_ROGUE ? rogue : map.enemyList[enemy.ce];
                }
            }
        }
    }

    loadAudio() {
        audio.stop(audio.curTrack);
        audio.curTrack = this.track;
        let a = this.option['BGM'].user;
        audio.volBGM = option['BGM'].select[a].a / 10;
        a = this.option['SE'].user;
        audio.volSE = option['SE'].select[a].a / 10;
        audio.playMusic(audio.curTrack);
    }
}

const data = {
    name: 'Player',
    save(unload) {
        if (unload && audio.curTrack) audio.music[audio.curTrack].pause();
        if (flag.died || flag.retry || flag.title || this.error) {
            return;
        } else if (flag.synthesize) {
            rogue.returnCubeItem();
        }

        cursor.clearAll();
        message.draw(option.isEnglish() ? 'Saved' : '記録した');
        let saveData = new Data();
        localStorage.setItem(this.name, JSON.stringify(saveData));
    },

    load() {
        let saveData = JSON.parse(localStorage.getItem(this.name));
        if (saveData !== null) {
            saveData.__proto__ = Data.prototype;
            try {
                saveData.loadInit();
                message.draw(option.isEnglish() ? 'Loaded' : '記録を読み込んだ');
            } catch (e) {
                console.log(e);
                let ver = saveData.ver;
                vue.verData = ver;
                flag.regular = false;
                flag.failed = true;
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
        game.quit('Y', true);
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
