const [
    M_DESTROY,
    M_CANT_DESTROY,
    M_NUMBER,
    M_PACK,
    M_FLOOR,
    M_READ,
    M_CANT_READ_SCROLL,
    M_CANT_READ_BOOK,
    M_CANT_TELE,
    M_IDENTIFY,
    M_DISINTEGRATION,
    M_REPAIR,
    M_DONT_HAVE_MISSILE,
    M_DONT_HAVE_AMMO,
    M_ZAP,
    M_TO_EXAMINE,
    M_ZAP_DIR,
    M_CANT_EXAMINE,
    M_NOTHING_HAPPENED,
    M_QUAFF,
    M_EAT,
    M_DROP,
    M_CANT_CARRY,
    M_GRAB,
    M_EQUIP,
    M_TWO_HANDED,
    M_FUEL,
    M_DONT_EQUIP_LIGHT,
    M_INVESTIGATE,
    M_CANT_ADD,
    M_SYNTHESIZE,
    M_PACK_OR_UNPACK,
    M_PACK_INTO,
    M_CANT_SELL,
    M_DONT_HAVE_MONEY,
    M_SHOP,
    M_STASH,
    M_EXAMINE,
    M_BLACKSMITH,
    M_CURE,
    M_MINIMAP,
    M_SORT_SKILL,
    M_SORT_SKILL2,
    M_CANT_GAIN_SKILL,
    M_CANT_GAIN_STAT,
    M_GAIN,
    M_BOOKMARK,
    M_BOOKMARK2,
    M_CAST,
    M_CAST_DIR,
    M_DONT_HAVE_SKILL,
    M_CANT_CAST,
    M_DONT_HAVE_BOOK,
    M_DONT_HAVE_MANA,
    M_DONT_HAVE_MELEE,
    M_EXAMINE_W,
    M_GAIN_SKILL,
    M_OPTION,
    M_PREVIOUS,
    M_STUCK,
    M_DIED,
    M_RECOVER_ALL,
    M_FLOAT,
    M_LIGHT_GONE,
    M_STARVED,
    M_OPEN_OR_CLOSE,
    M_DONT_HAVE_EQUIPMENT,
    M_TAKE_OFF,
    M_FIRE,
    M_ASK_TO_QUIT,
    M_QUIT,
    M_INTERRUPTED,
    M_THROW,
    M_THROW_DIR,
    M_NO_CLUE,
    M_RECIPE,
    M_DONT_KNOW_RECIPE,
] = enums(1, 80);

const msgMap = new Map([
    [M_NUMBER, {
        a: '[0-9] then [Enter] or [a] for all: ',
        b: '[0-9] 数値 [Enter] 決定 [a] すべて: '
    }],

    [M_PACK, {
        a: ' [,] for stuff',
        b: ' [,] 持物'
    }],

    [M_FLOOR, {
        a: ' [.] for floor',
        b: ' [.] 床'
    }],

    [M_TO_EXAMINE, {
        a: ' [x] to examine',
        b: ' [x] 探査'
    }],

    [M_EXAMINE_W, {
        a: ' [e] to equipment [i] for inventory',
        b: ' [e] 装備 [i] 持物'
    }],

    [M_CANT_DESTROY, {
        a: 'You can\'t destroy it',
        b: 'それを壊す事は出来ない'
    }],

    [M_CANT_READ_SCROLL, {
        a: 'You can\'t read any scrolls',
        b: '巻物を読む事が出来ない'
    }],

    [M_CANT_READ_BOOK, {
        a: 'You can\'t read any books',
        b: '本を読む事が出来ない'
    }],

    [M_CANT_TELE, {
        a: 'You can\'t teleport there',
        b: 'そこへテレポートする事は出来ない'
    }],

    [M_CANT_EXAMINE, {
        a: 'You can\'t examine',
        b: '探査出来ない'
    }],

    [M_CANT_CARRY, {
        a: 'You can\'t carry anymore',
        b: 'もう持つことが出来ない'
    }],

    [M_CANT_ADD, {
        a: 'You can\'t add them anymore',
        b: 'これ以上詰め込めない'
    }],

    [M_CANT_SELL, {
        a: 'You can\'t sell anymore',
        b: 'これ以上売却出来ない'
    }],

    [M_CANT_GAIN_SKILL, {
        a: 'You can\'t gain any skills',
        b: 'スキルを習得出来ない'
    }],

    [M_CANT_GAIN_STAT, {
        a: 'You can\'t gain any stats',
        b: '能力値を習得出来ない'
    }],

    [M_CANT_CAST, {
        a: 'You can\'t cast any skills',
        b: 'スキルを行使出来ない'
    }],

    [M_DONT_HAVE_MISSILE, {
        a: 'You have nothing to fire with',
        b: '遠隔武器を持っていない'
    }],

    [M_DONT_HAVE_AMMO, {
        a: 'You have no ammunition to fire',
        b: '弾薬を持っていない'
    }],

    [M_DONT_KNOW_RECIPE, {
        a: 'You don\'t know any recipes',
        b: 'レシピを習得していない'
    }],

    [M_DONT_EQUIP_LIGHT, {
        a: 'You don\'t equip any light sources',
        b: '光源を身に付けていない'
    }],

    [M_DONT_HAVE_MONEY, {
        a: 'You don\'t have enough money',
        b: '金額が足りない'
    }],

    [M_DONT_HAVE_SKILL, {
        a: 'You don\'t have any skills to cast',
        b: '行使するスキルを覚えていない'
    }],

    [M_DONT_HAVE_BOOK, {
        a: 'You don\'t have any books to cast',
        b: '行使するための魔法書を持っていない'
    }],

    [M_DONT_HAVE_MANA, {
        a: 'You don\'t have enough mana to cast',
        b: '行使するためのマナが足りない'
    }],

    [M_DONT_HAVE_MELEE, {
        a: 'You have nothing to combat with',
        b: '近接武器を持っていない'
    }],

    [M_DONT_HAVE_EQUIPMENT, {
        a: 'You have nothing to take off or unwield',
        b: '何も身に着けていない'
    }],

    [M_INTERRUPTED, {
        a: 'Interrupted',
        b: '中断した'
    }],

    [M_ASK_TO_QUIT, {
        a: 'Are you sure you want to quit?',
        b: '本当にゲームを放棄しますか?'
    }],

    [M_STARVED, {
        a: 'You are starved',
        b: '飢餓状態に陥った'
    }],

    [M_LIGHT_GONE, {
        a: 'Your light has gone out',
        b: '灯火が消え去った'
    }],

    [M_FLOAT, {
        a: 'You\'re floating in the air',
        b: '空中に浮かんだ'
    }],

    [M_RECOVER_ALL, {
        a: 'You recovered completely',
        b: '全快した'
    }],

    [M_DIED, {
        a: 'You died',
        b: '死亡した'
    }],

    [M_STUCK, {
        a: 'You are still stuck',
        b: 'まだ動けない'
    }],

    [M_TWO_HANDED, {
        a: 'You are using both hands already',
        b: '既に両手を使っている'
    }],

    [M_NOTHING_HAPPENED, {
        a: 'Nothing happened',
        b: '何も起こらなかった'
    }],

    [M_NO_CLUE, {
        a: 'You have no clue',
        b: '詳細が掴めない'
    }],

    [M_DESTROY, {
        a: '[a-Z] [1-9] to destroy',
        b: '[a-Z] [1-9] 破壊'
    }],

    [M_READ, {
        a: '[a-Z] [1-9] to read',
        b: '[a-Z] [1-9] 読み上げ'
    }],

    [M_IDENTIFY, {
        a: '[a-Z] [1-9] to identify',
        b: '[a-Z] [1-9] 識別'
    }],

    [M_DISINTEGRATION, {
        a: '[a-Z] symbol to disintegrate',
        b: '[a-Z] シンボルを分解'
    }],

    [M_REPAIR, {
        a: '[a-Z] [1-9] to repair',
        b: '[a-Z] [1-9] 修復'
    }],

    [M_ZAP, {
        a: '[a-Z] [1-9] to zap',
        b: '[a-Z] [1-9] 振り下ろし'
    }],

    [M_ZAP_DIR, {
        a: '[direction] [.] to zap',
        b: '[方向] [.] 振り下ろし'
    }],

    [M_QUAFF, {
        a: '[a-Z] [1-9] to quaff',
        b: '[a-Z] [1-9] 飲用'
    }],

    [M_EAT, {
        a: '[a-Z] [1-9] to eat',
        b: '[a-Z] [1-9] 食事'
    }],

    [M_DROP, {
        a: '[a-Z] [1-9] to drop',
        b: '[a-Z] [1-9] 床置き'
    }],

    [M_GRAB, {
        a: '[a-Z] to grab',
        b: '[a-Z] 拾う'
    }],

    [M_EQUIP, {
        a: '[a-Z] [1-9] to wear or wield',
        b: '[a-Z] [1-9] 装備'
    }],

    [M_FUEL, {
        a: '[a-Z] [1-9] to fuel',
        b: '[a-Z] [1-9] 補給'
    }],

    [M_INVESTIGATE, {
        a: '[a-Z] [1-9] to investigate',
        b: '[a-Z] [1-9] 調査'
    }],

    [M_SYNTHESIZE, {
        a: '[a-z] [1-9] to choose [A-Z] to remove [Enter] to synthesize [Ctrl + r] to show recipes',
        b: '[a-z] [1-9] 選択 [A-Z] 除外 [Enter] 合成 [Ctrl + r] レシピを表示'
    }],

    [M_RECIPE, {
        a: '[Enter] to go back',
        b: '[Enter] 戻る'
    }],

    [M_PACK_OR_UNPACK, {
        a: '[a-z] to pack [1-9] to unpack',
        b: '[a-z] 荷詰め  [1-9] 荷解き'
    }],

    [M_PACK_INTO, {
        a: '[1-9] to pack into',
        b: '[1-9] 荷詰め箇所'
    }],

    [M_SHOP, {
        a: '[A-Z] to buy [a-z] to sell [alt + a-Z] details',
        b: '[A-Z] 購入 [a-z] 売却 [alt + a-Z] 詳細'
    }],

    [M_STASH, {
        a: '[a-z] to store [A-Z] to take out [,] to previous [.] to next page [alt + a-Z] details',
        b: '[a-z] 保管 [A-Z] 持参 [,] 前項 [.] 次項 [alt + a-Z] 詳細'
    }],

    [M_EXAMINE, {
        a: '[t] for target [r] for release [c] for char [m] for skill [x] for item details',
        b: '[t] ターゲット [r] 解除 [c] キャラ [m] スキル [x] アイテム詳細'
    }],

    [M_BLACKSMITH, {
        a: '[a-Z] to repair, [Enter] to repair all equipment',
        b: '[a-Z] 修理, [Enter] 装備全修理'
    }],

    [M_CURE, {
        a: '[a-z] to get cured',
        b: '[a-z] 治療'
    }],

    [M_MINIMAP, {
        a: '[a] for all [s] for yourself [c] for char [i] for item [t] fot trap [p] for portal [<],[>] for staircase',
        b: '[a] すべて [s] 自身 [c] キャラ [i] アイテム [t] 罠 [p] ポータル [<],[>] 階段'
    }],

    [M_SORT_SKILL, {
        a: '[a-z] to replace',
        b: '[a-z] 交換元'
    }],

    [M_SORT_SKILL2, {
        a: '[a-z] to replace with',
        b: '[a-z] 交換先'
    }],

    [M_GAIN, {
        a: '[a-Z] to gain',
        b: '[a-Z] 取得'
    }],

    [M_GAIN_SKILL, {
        a: '[a-z] to gain [A-Z] details',
        b: '[a-z] 取得 [A-Z] 詳細'
    }],

    [M_BOOKMARK, {
        a: '[a-z] to add bookmarks on or [M], [F1-F12] to remove',
        b: '[a-z] しおりを挿入 [M], [F1-F12] 除外'
    }],

    [M_BOOKMARK2, {
        a: '[M], [F1-F12] to choose a bookmark',
        b: '[M], [F1-F12] しおりを選択'
    }],

    [M_CAST, {
        a: '[a-z] to cast [A-Z] details [Ctrl+s] to sort',
        b: '[a-z] 行使 [A-Z] 詳細 [Ctrl+s] 整理'
    }],

    [M_CAST_DIR, {
        a: '[direction] [.] to cast',
        b: '[方向] [.] 行使'
    }],

    [M_OPTION, {
        a: '[a-z] to change option',
        b: '[a-z] オプション変更'
    }],

    [M_PREVIOUS, {
        a: '[direction] to scroll',
        b: '[方向] 項移動'
    }],

    [M_OPEN_OR_CLOSE, {
        a: '[direction] to open or close',
        b: '[方向] 開閉'
    }],

    [M_TAKE_OFF, {
        a: '[A-Z] to take off or unwield',
        b: '[A-Z] 取り外し'
    }],

    [M_FIRE, {
        a: '[direction] to fire',
        b: '[方向]　発射'
    }],

    [M_QUIT, {
        a: '[y/n] to quit',
        b: '[y/n] 放棄'
    }],

    [M_THROW, {
        a: '[a-z] [1-9] to throw',
        b: '[a-z] [1-9] 投擲'
    }],

    [M_THROW_DIR, {
        a: '[direction] [.] to throw',
        b: '[方向] [.] 投擲'
    }],
]);

const message = {
    list: [],
    page: 1,
    previous(keyCode) {
        let l = this.list.length;
        let p = Math.ceil(l / (IN_HEIGHT - MS - 2));
        if (p === 0) p = 1;
        if (keyCode === 72 || keyCode === 37 | keyCode === 100) { //h,left arrow,T4
            this.page = 1;
        } else if (keyCode === 74 || keyCode === 40 || keyCode === 98) { //j,down arrow,T2
            if (p !== this.page) this.page++;
        } else if (keyCode === 75 || keyCode === 38 || keyCode === 104) { //k,up arrow,T8
            if (this.page !== 1) this.page--;
        } else if (keyCode === 76 || keyCode === 39 || keyCode === 102) { //l,right arrow,T6
            this.page = p;
        } else {
            return;
        }

        inventory.clear();
        inventory.shadow(MIDDLE);
        let i = (this.page - 1) * (IN_HEIGHT - MS - 2);
        let j = MS + 1;
        let ctxInv = display.ctxes.inv;
        for (i; i < this.page * (IN_HEIGHT - MS - 2); i++) {
            if (!this.list[i]) break;
            let msg = this.list[i].text;
            if (this.list[i].count > 1) msg += ` (x${this.list[i].count})`;
            display.text({
                ctx: ctxInv,
                msg: `${msg}`,
                x: 0.5,
                y: j++,
            });
        }

        ctxInv.save();
        display.text({
            ctx: ctxInv,
            msg: `[${l}/${MAX_MSG_LIST_LEN}]`,
            x: 1.5,
            y: - SS - 1,
            yPx: display.height,
        });

        ctxInv.textAlign = 'right';
        display.text({
            ctx: ctxInv,
            msg: option.isEnglish() ?
                `Message List [${this.page}/${p}]` :
                `メッセージ項目 [${this.page}/${p}]`,
            x: -1,
            xPx: display.width,
            y: - SS - 1,
            yPx: display.height,
        });

        ctxInv.restore();
        message.draw(message.get(M_PREVIOUS), true);
    },

    counter: 0,
    clear(all) {
        let num = all ? 1 : 2;
        display.rect({
            ctx: display.ctxes.msg,
            widthPx: display.width / num,
            heightPx: display.height / num,
            clear: true,
        });
    },

    delete() {
        setTimeout(() => {
            display.rect({
                ctx: display.ctxes.msg,
                y: this.counter - 0.5,
                widthPx: display.width / 2,
                height: this.counter--,
                heightPx: 1,
                clear: true,
            });
        }, MSG_SPEED);
    },

    draw(msg, fixed) {
        if (!fixed) {
            this.counter++;
            let ctxMsg = display.ctxes.msg;
            if (!this.list[0] || this.list[0].text !== msg) {
                this.list.unshift({ text: msg, count: 1 });
                if (this.list.length > MAX_MSG_LIST_LEN) this.list.pop();
                let curMap = ctxMsg.getImageData(0, 0, display.width / 2, (MAX_MSG_LEN - 0.5) * display.fs);
                this.clear();
                ctxMsg.putImageData(curMap, 0, display.fs);
            } else {
                msg += ` (x${++this.list[0].count})`;
                display.rect({
                    ctx: ctxMsg,
                    y: 0.5,
                    widthPx: display.width / 2 + 1,
                    height: 1,
                    heightPx: 1,
                    clear: true,
                });
            }
            
            this.delete();
            display.text({
                ctx: ctxMsg,
                msg: msg,
                x: 0.5,
                y: 1,
                limit: -0.5,
                limitPx: display.width / 2,
            });
        } else {
			let ctxInv = display.ctxes.inv;
            display.rect({
                ctx: ctxInv,
                x: 0.5,
                xPx: display.width / 2,
                y: 0.5,
                widthPx: display.width / 2 + 1,
                height: 1,
                heightPx: 1,
                clear: true,
            });

            display.text({
                ctx: ctxInv,
                msg: msg,
                x: 0.5,
                y: 1,
                limit: -0.5,
                xPx: display.width / 2,
                limitPx: display.width / 2,
            });
        }
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
        wand: '棒',
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
