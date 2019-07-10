const message = {
    listTemp: [],
    list: [],
    scroll(key, init) {
        if (init) {
            message.draw(message.get(M_MESSAGE) + message.get(M_SCROLL), true);
            this.eleP = vue.$refs.messagePrevContainer.$refs.messagePrevList;
            this.eleC = this.eleP.firstElementChild;
            let l = this.list.length;
            vue.msgTotal = `[${l}/${MAX_MSG_LIST_LEN}] `
                + (option.isEnglish() ? 'Message List' : 'メッセージ一覧'); 
        }

        input.scroll(this.eleP, this.eleC, key, init);
    },

    clear() {
        // this.listTemp = [];
    },

    clearFixed() {
        vue.msgFixed = '';
    },

    counter: 0,
    countDelete: 0,
    draw(msg, fixed) {
        if (fixed) {
            vue.msgFixed = msg;
            return;
        }

        this.counter++;
        if (!this.list[0] || this.list[0].text !== msg) {
            let obj = { text: msg, count: 1};
            this.listTemp.unshift(obj);
            if (this.listTemp.length > MAX_MSG_LEN) {
                this.listTemp.pop();
                this.countDelete++;
            }

            this.list.unshift(obj);
            if (this.list.length > MAX_MSG_LIST_LEN) this.list.pop();
        } else {
            let obj = this.list[0];
            obj.count++;
            if(!this.listTemp.length){
                this.listTemp.unshift(obj);
            } else {
                this.countDelete++;
            }
        }
        
        setTimeout(() => {
            let list = this.listTemp;
            if(list.length && !this.countDelete) {
                list.pop();
            } else if (this.countDelete) {
                this.countDelete--;
            }
        }, MSG_SPEED * this.counter--);
    },

    get(id) {
        return msgMap.get(id)[option.getLanguage()];
    }
}

const translation = {
    bodyParts: {
        main: 'メイン',
        off: 'オフ',
        neck: '首',
        'R-ring': '右指輪',
        'L-ring': '左指輪',
        light: '光源',
        body: '体',
        back: '背中',
        waist: '腰',
        head: '頭',
        hands: '手',
        feet: '足',
    },

    item: {
        book: '書',
        food: '食料',
        potion: '薬',
        scroll: '巻物',
        wand: '魔法棒',
        melee: '近接武器',
        missile: '遠隔武器',
        staff: '杖',
        shield: '盾',
        armor: '鎧',
        cloak: '外衣',
        belt: 'ベルト',
        helm: '兜',
        gloves: '手袋',
        boots: '靴',
        light: '光源',
        oil: '油',
        amulet: '首飾り',
        ring: '指輪',
        ammo: '弾薬',
        gem: 'ジュエル',
        orb: 'オーブ',
        coin: 'コイン',
        misc: '雑多品',
        water: '水',
        recipe: 'レシピ',
        'Charge Book': '充填書',
        corpse: '死体',
        material: '素材',
    },

    element: {
        fire: '火',
        water: '水',
        air: '風',
        earth: '土',
        poison: '毒',
        light: '光',
        cold: '氷',
        lightning: '電',
        gravity: '重力',
        infection: '感染',
        blizzard: '吹雪',
        sand: '砂',
        acid: '酸',
        magma: '溶岩',
        radiation: '放射線',
        atom: '原子',
        physical: '物理',
    },
};
