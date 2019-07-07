const help = {
    listLeft: [
        { cmd: { a: 'Arrow keys', b: '方向キー'}, name: { a: 'move', b: '移動' }},
        { cmd: { a: 'h', b: 'h'}, name: { a: 'move left', b: '左移動' }},
        { cmd: { a: 'j', b: 'j'}, name: { a: 'move down', b: '下移動' }},
        { cmd: { a: 'k', b: 'k'}, name: { a: 'move up', b: '上移動' }},
        { cmd: { a: 'l', b: 'l'}, name: { a: 'move right', b: '右移動' }},
        { cmd: { a: 'y', b: 'y'}, name: { a: 'move upleft', b: '左上移動' }},
        { cmd: { a: 'b', b: 'b'}, name: { a: 'move downleft', b: '左下移動' }},
        { cmd: { a: 'u', b: 'u'}, name: { a: 'move upright', b: '右上移動' }},
        { cmd: { a: 'n', b: 'n'}, name: { a: 'move downright', b: '右下移動' }},
        { cmd: { a: 'i', b: 'i'}, name: { a: 'inventory list', b: '持物一覧' }},
        { cmd: { a: 'e', b: 'e'}, name: { a: 'equipment list', b: '装備一覧' }},
        { cmd: { a: 'w', b: 'w'}, name: { a: 'wear or wield', b: '装備する' }},
        { cmd: { a: 'T', b: 'T'}, name: { a: 'take off or unwield', b: '装備を外す' }},
        { cmd: { a: 'G', b: 'G'}, name: { a: 'grab item', b: 'アイテムを拾う' }},
        { cmd: { a: 'd', b: 'd'}, name: { a: 'drop item', b: 'アイテムを落とす' }},
        { cmd: { a: 'o', b: 'o'}, name: { a: 'open door', b: 'ドアを開ける' }},
        { cmd: { a: 'c', b: 'c'}, name: { a: 'close door', b: 'ドアを閉める' }},
        { cmd: { a: 's', b: 's'}, name: { a: 'search', b: '捜索する' }},
        { cmd: { a: 'r', b: 'r'}, name: { a: 'read scroll', b: '巻物を読む' }},
        { cmd: { a: 'q', b: 'q'}, name: { a: 'quaff potion', b: '薬を飲む' }},
        { cmd: { a: 'z', b: 'z'}, name: { a: 'zap wand', b: '魔法棒を振る' }},
        { cmd: { a: 'p', b: 'p'}, name: { a: 'pack item', b: 'アイテムを詰める' }},
        { cmd: { a: 'E', b: 'E'}, name: { a: 'eat food', b: '食事する' }},
        { cmd: { a: 'Q', b: 'Q'}, name: { a: 'quit', b: 'ゲームを放棄する' }},
        { cmd: { a: 'x', b: 'x'}, name: { a: 'examine things', b: '探査する' }},
        { cmd: { a: 'a', b: 'a'}, name: { a: 'add bookmark', b: 'しおりを挟む' }},
        { cmd: { a: 'G', b: 'G'}, name: { a: 'gain stat/skill', b: 'スキル/能力値を得る' }},
        { cmd: { a: 'f', b: 'f'}, name: { a: 'fire', b: '射る' }},
        { cmd: { a: 't', b: 't'}, name: { a: 'throw item', b: 'アイテムを投げる' }},
        { cmd: { a: 'S', b: 'S'}, name: { a: 'swap gear', b: '装備を持ち替える' }},
        { cmd: { a: 'C', b: 'C'}, name: { a: 'character description', b: 'キャラ詳細' }},
        { cmd: { a: 'F', b: 'F'}, name: { a: 'fuel', b: '補給する' }},
        { cmd: { a: 'R', b: 'R'}, name: { a: 'Rest', b: '休む' }},
        { cmd: { a: 'A', b: 'A'}, name: { a: 'alchemy', b: '錬金術' }},
    ],

    listRight: [
        { cmd: { a: 'Esc', b: 'Esc'}, name: { a: 'cancel command', b: '取り消す' }},
        { cmd: { a: '1-9', b: '1-9'}, name: { a: 'use item', b: 'アイテムを使う' }},
        { cmd: { a: 'F1-F12', b: 'F1-F12'}, name: { a: 'use skill', b: 'スキルを使う' }},
        { cmd: { a: 'Alt+dir', b: 'Alt+方向'}, name: { a: 'attack stationary/dig', b: 'その場で攻撃する/掘る' }},
        { cmd: { a: 'Shift+dir', b: 'Shift+方向'}, name: { a: 'dash', b: '走る' }},
        { cmd: { a: '.', b: '.'}, name: { a: 'step on', b: '踏む' }},
        { cmd: { a: '>', b: '>'}, name: { a: 'down stairs', b: '階段を降りる' }},
        { cmd: { a: '<', b: '<'}, name: { a: 'up stairs', b: '階段を昇る' }},
        { cmd: { a: '=', b: '='}, name: { a: 'option', b: 'オプション' }},
        { cmd: { a: '?', b: '?'}, name: { a: 'show command', b: 'コマンドを表示' }},
        { cmd: { a: 'Ctrl+p', b: 'Ctrl+p'}, name: { a: 'previous message', b: 'メッセージ履歴' }},
        { cmd: { a: 'Ctrl+r', b: 'Ctrl+r'}, name: { a: 'redraw', b: '再描写' }},
        { cmd: { a: 'Ctrl+m', b: 'Ctrl+m'}, name: { a: 'mute', b: '消音' }},
        { cmd: { a: 'Ctrl+s', b: 'Ctrl+s'}, name: { a: 'save', b: '記録する' }},
        { cmd: { a: 'Ctrl+d', b: 'Ctrl+d'}, name: { a: 'destroy item', b: 'アイテムを破壊する' }},
        { cmd: { a: 'Ctrl+x', b: 'Ctrl+x'}, name: { a: 'save and exit', b: '記録して終了する' }},
        { cmd: { a: 'Ctrl+v', b: 'Ctrl+v'}, name: { a: 'game version', b: 'ゲームのバージョン' }},
    ],

    listWizard: [
        { cmd: { a: 'Ctrl+e', b: 'Ctrl+e'}, name: { a: '*enlightenment*', b: '*啓蒙*' }},
        { cmd: { a: 'Ctrl+z', b: 'Ctrl+z'}, name: { a: '*indestructible*', b: '*破壊不能*' }},
        { cmd: { a: 'Ctrl+q', b: 'Ctrl+q'}, name: { a: '*create trap*', b: '*罠を生成する*' }},
        { cmd: { a: 'Ctrl+a', b: 'Ctrl+a'}, name: { a: '*create monster*', b: '*モンスターを生成する*' }},
        { cmd: { a: 'Ctrl+i', b: 'Ctrl+i'}, name: { a: '*create item*', b: '*アイテムを生成する*' }},
    ],

    scroll(key, init) {
        if (init) {
            message.draw(message.get(M_HELP) + message.get(M_SCROLL), true);
            let $refs = vue.$refs.help.$refs;
            this.eleP = $refs.commandListBox;
            this.eleC = $refs.commandList.$el.firstElementChild;
        }

        input.scroll(this.eleP, this.eleC, key, init);
    }
};
