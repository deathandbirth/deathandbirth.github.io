const help = {
    list: {
        h: { a: 'move left', b: '左移動' },
        j: { a: 'move down', b: '下移動' },
        k: { a: 'move up', b: '上移動' },
        l: { a: 'move right', b: '右移動' },
        y: { a: 'move upleft', b: '左上移動' },
        b: { a: 'move downleft', b: '左下移動' },
        u: { a: 'move upright', b: '右上移動' },
        n: { a: 'move downright', b: '右下移動' },
        i: { a: 'inventory list', b: '持物一覧' },
        e: { a: 'equipment list', b: '装備一覧' },
        w: { a: 'wear or wield', b: '装備する' },
        T: { a: 'take off or unwield', b: '装備を外す' },
        g: { a: 'grab item', b: 'アイテムを拾う' },
        d: { a: 'drop item', b: 'アイテムを落とす' },
        o: { a: 'open door', b: 'ドアを開ける' },
        c: { a: 'close door', b: 'ドアを閉める' },
        s: { a: 'search', b: '捜索する' },
        r: { a: 'read scroll', b: '巻物を読む' },
        q: { a: 'quaff potion', b: '薬を飲む' },
        z: { a: 'zap wand', b: '棒を振る' },
        p: { a: 'pack item', b: 'アイテムを詰める' },
        E: { a: 'eat food', b: '食事する' },
        Q: { a: 'quit', b: 'ゲームを放棄する' },
        Esc: { a: 'cancel command', b: '取り消す' },
        x: { a: 'examine things', b: '探査する' },
        a: { a: 'add bookmark', b: 'しおりを挟む' },
        G: { a: 'gain stat/skill', b: 'スキル/能力値を得る' },
        f: { a: 'fire', b: '射る' },
        t: { a: 'throw item', b: 'アイテムを投げる' },
        S: { a: 'swap gear', b: '装備を持ち替える' },
        C: { a: 'character description', b: 'キャラ詳細' },
        F: { a: 'fuel', b: '補給する' },
        R: { a: 'Rest', b: '休む' },
        A: { a: 'alchemy', b: '錬金術' },
        '1-9': { a: 'use item', b: 'アイテムを使う' },
        'm,F1-F12': { a: 'use skill', b: 'スキルを使う' },
        'Alt+dir': { a: 'attack stationary/dig', b: 'その場で攻撃する/掘る' },
        'Shift+dir': { a: 'dash', b: '走る' },
        '.': { a: 'stap on', b: '踏む' },
        '>': { a: 'down stairs', b: '階段を降りる' },
        '<': { a: 'up stairs', b: '階段を昇る' },
        '=': { a: 'option', b: 'オプション' },
        'Ctrl+p': { a: 'previous message', b: 'メッセージ履歴' },
        'Ctrl+r': { a: 'redraw', b: '再描写' },
        'Ctrl+m': { a: 'mute', b: '消音' },
        'Ctrl+s': { a: 'save', b: '記録する' },
        'Ctrl+d': { a: 'destroy item', b: 'アイテムを破壊する' },
        'Ctrl+x': { a: 'save and exit', b: '記録して終了する' },
        'Ctrl+v': { a: 'game version', b: 'ゲームのバージョン' },
    },

    wizardList: { 
        'Ctrl+e': { a: '*enlightenment*', b: '*啓蒙*' },
        'Ctrl+z': { a: '*indestructible*', b: '*破壊不能*' },
        'Ctrl+q': { a: '*create trap*', b: '*罠を生成する*' },
        'Ctrl+a': { a: '*create monster*', b: '*モンスターを生成する*' },
        'Ctrl+i': { a: '*create item*', b: '*アイテムを生成する*' },
    },

    main() {
        this.i = 1;
        this.j = MS + 1;
        inventory.shadow(MIDDLE);
        this.loop(this.list);
        if (rogue.isWizard) this.loop(this.wizardList);
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
};
