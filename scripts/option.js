const option = {
    list: {
        a: { a: 'Language', b: '言語' , key:'language'},
        b: { a: 'Display', b: '解像度', key:'display'},
        c: { a: 'Shadow', b: '影', key:'shadow'},
        d: { a: 'Mute', b: '消音', key:'mute'},
        e: { a: 'BGM', b: 'BGM', key:'BGM'},
        f: { a: 'SE', b: '効果音', key:'SE'},
        g: { a: 'Autosave', b: '自動記録', key:'autosave'},
        h: { a: 'Auto-destroy', b: '自動破壊', key:'auto-destroy'},
        i: { a: 'Auto-charge', b: '自動充填', key:'auto-charge'},
        j: { a: 'Auto-identify', b: '自動識別', key:'auto-identify'},
        k: { a: 'Rogue Style Movement', b: 'ローグ型移動', key:'rogueStyleMove'}
    },

    display: { defaults: 'c', select: {} },
    shadow: { defaults: false },
    mute: { defaults: false },
    autosave: { defaults: true },
    'auto-destroy': { defaults: false },
    'auto-charge': { defaults: true },
    'auto-identify': { defaults: true },
    BGM: { defaults: 'k', select: {} },
    SE: { defaults: 'k', select: {} },
    rogueStyleMove: { defaults: true },
    language: { 
        defaults: 'b',
        select: { 
            a: { a: 'English', b: '英語' },
            b: { a: 'Japanese', b: '日本語' }
        }
    },

    main(keyCode) {
        let list = !flag.option2 ? this.list : this[this.name].select;
        if (keyCode < 65 || keyCode >= Object.keys(list).length + 65) return;
        let a = getAlphabet(keyCode);
        if (!flag.option2) this.name = this.list[a]['key'];
        if (this.name === 'display' || this.name === 'language' ||
            this.name === 'BGM' || this.name === 'SE') {
            if (!flag.option2) {
                this.choose(a);
                return;
            } else if (a === this[this.name].user) {
                return;
            } else if (this.name === 'display') {
                this[this.name].user = a;
                display.change(a, true);
            } else if (this.name === 'language') {
                this[this.name].user = a;
                vuejs.list.isEnglish = this.isEnglish();
                display.change(this.display.user, true);
            } else if (this.name === 'BGM' || this.name === 'SE') {
                this[this.name].user = a;
                let vol = (keyCode - 65) / 10;
                if (this.name === 'BGM') {
                    audio.volBGM = vol
                    audio.music[audio.curTrack].volume = vol;
                } else {
                    audio.volSE = vol;
                }
            }

            flag.option2 = false;
        } else if (this.name === 'shadow') {
            this[this.name].user = !this[this.name].user;
            map.redraw(rogue.x, rogue.y);
            map.draw(rogue.x, rogue.y);
        } else if (this.name === 'mute') {
            audio.mute();
        } else if (this.name === 'autosave' || this.name === 'auto-identify' ||
            this.name === 'auto-destroy' || this.name === 'auto-charge' ||
            this.name === 'rogueStyleMove') {
            this[this.name].user = !this[this.name].user;
        }

        inventory.clear();
        inventory.show({
            list: this.list,
            dr: RIGHT,
        });
        
        message.draw(message.get(M_OPTION), true);
    },

    choose(a) {
        inventory.clear();
        inventory.show({
            list: this.list,
            dr: RIGHT,
            a: a,
        });

        flag.option2 = true;
        inventory.show({
            list: this[this.name].select,
            dr: LEFT
        });

        message.draw(message.get(M_OPTION), true);
    },
    
    isEnglish() {
        return this.language.user === ENG;
    },

    getLanguage() {
        return this.language.user;
    }
};

{
    for (let key in option.list) {
        let key2 = option.list[key]['key'];
        option[key2].user = option[key2].defaults;
        if (key2 === 'BGM' || key2 === 'SE') {
            for (let i = 0; i <= 10; i++) {
                option[key2].select[EA[i]] = { a: i, b: i };
            }
        }
    }
    
    let select = option.display.select;
    for (let key in display.list) {
        let size = display.list[key];
        select[key] = {};
        select[key]['a'] = select[key]['b'] = size.width + ' x ' + size.height;
    }
}
