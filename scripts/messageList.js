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
    M_ASSIGN_SKILL,
    M_ASSIGN_SKILL2,
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
    M_MESSAGE,
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
    M_QUIT,
    M_INTERRUPTED,
    M_THROW,
    M_THROW_DIR,
    M_NO_CLUE,
    M_RECIPE,
    M_DONT_KNOW_RECIPE,
    M_SCROLL,
    M_HELP,
    M_CHARACTER,
    M_TOO_HEAVY,
] = enums(1, 80);

const msgMap = new Map([
    [M_NUMBER, {
        a: 'Input Number - [0-9] [Backspace] to remove [Enter] to decide [a] for all: ',
        b: '数値を入力 - [0-9] [Backspace] 削除 [Enter] 決定 [a] すべて: '
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
        a: ' [e] for equipment [i] for inventory',
        b: ' [e] 装備 [i] 持物'
    }],

    [M_SCROLL, {
        a: ' [direction] + [Shift/Ctrl] to scroll [c] to close',
        b: ' [方向] + [Shift/Ctrl] ページ移動 [c] 閉じる'
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

    [M_TOO_HEAVY, {
        a: 'It\'s too heavy to lift',
        b: '重くて持ち上げられない'
    }],

    [M_DESTROY, {
        a: 'Destroy Item: [a-Z] [1-9] to choose',
        b: 'アイテムを壊す: [a-Z] [1-9] 選択'
    }],

    [M_READ, {
        a: 'Read Scroll: [a-Z] [1-9] to choose',
        b: '巻物を読む: [a-Z] [1-9] 選択'
    }],

    [M_IDENTIFY, {
        a: 'Identify Item: [a-Z] [1-9] to choose',
        b: 'アイテムを識別する: [a-Z] [1-9] 選択'
    }],

    [M_DISINTEGRATION, {
        a: 'Disintegrate Enemy: [a-Z] to choose the symbol',
        b: '敵を分解する: [a-Z] シンボルを選択'
    }],

    [M_REPAIR, {
        a: 'Repair Equipment: [a-Z] [1-9] to choose',
        b: '装備品を修復する: [a-Z] [1-9] 選択'
    }],

    [M_ZAP, {
        a: 'Zap Wand: [a-Z] [1-9] to choose',
        b: '魔法棒を振る: [a-Z] [1-9] 選択'
    }],

    [M_ZAP_DIR, {
        a: 'Zap Wand: [direction] [t] to decide',
        b: '魔法棒を振る: [方向] [t] 決定'
    }],

    [M_QUAFF, {
        a: 'Quaff Potion: [a-Z] [1-9] to choose',
        b: '薬を飲む: [a-Z] [1-9] 選択'
    }],

    [M_EAT, {
        a: 'Eat: [a-Z] [1-9] to choose',
        b: '食事する: [a-Z] [1-9] 選択'
    }],

    [M_DROP, {
        a: 'Drop Item: [a-Z] [1-9] to choose',
        b: 'アイテムを置く: [a-Z] [1-9] 選択'
    }],

    [M_GRAB, {
        a: 'Grab Item: [a-Z] to choose',
        b: 'アイテムを拾う: [a-Z] 選択'
    }],

    [M_EQUIP, {
        a: 'Equip: [a-Z] [1-9] to choose',
        b: '装備する: [a-Z] [1-9] 選択'
    }],

    [M_FUEL, {
        a: 'Fuel: [a-Z] [1-9] to choose',
        b: '燃料を補給する: [a-Z] [1-9] 選択'
    }],

    [M_INVESTIGATE, {
        a: 'Investigate Item: [a-Z] [1-9] to choose',
        b: 'アイテムを調査する: [a-Z] [1-9] 選択'
    }],

    [M_SYNTHESIZE, {
        a: 'Alchemy: [a-z] [1-9] to choose [A-Z] to remove [Enter] to synthesize [Ctrl + r] to show recipes',
        b: '錬金術: [a-z] [1-9] 選択 [A-Z] 除外 [Enter] 合成 [Ctrl + r] レシピを表示'
    }],

    [M_RECIPE, {
        a: '[c] to close',
        b: '[c] 閉じる'
    }],

    [M_PACK_OR_UNPACK, {
        a: 'Pack Item: [a-z] to pack [1-9] to unpack',
        b: 'アイテムを詰める: [a-z] 荷詰め  [1-9] 荷解き'
    }],

    [M_PACK_INTO, {
        a: 'Pack Item: [1-9] to pack into',
        b: 'アイテムを詰める: [1-9] 荷詰め箇所'
    }],

    [M_SHOP, {
        a: ': [A-Z] to buy [a-z] to sell [alt + a-Z] details',
        b: ': [A-Z] 購入 [a-z] 売却 [alt + a-Z] 詳細'
    }],

    [M_STASH, {
        a: 'Stash: [a-z] to store [A-Z] to take out [<] to previous [>] to next page [alt + a-Z] details',
        b: '物置箱: [a-z] 保管 [A-Z] 持参 [<] 前項 [>] 次項 [alt + a-Z] 詳細'
    }],

    [M_EXAMINE, {
        a: 'Examine: [t] for target [r] for release [c] for char [m] for skill [x] for item details',
        b: '探査: [t] ターゲット [r] 解除 [c] キャラ [m] スキル [x] アイテム詳細'
    }],

    [M_BLACKSMITH, {
        a: 'Blacksmith: [a-Z] to repair, [Enter] to repair all equipment',
        b: '鍛冶屋: [a-Z] 修理, [Enter] 装備全修理'
    }],

    [M_CURE, {
        a: 'Cure Shop: [a-z] to choose',
        b: '治療店: [a-z] 選択'
    }],

    [M_MINIMAP, {
        a: 'Map: [a] for all [s] for yourself [e] for enemy [i] for item [t] fot trap [p] for portal [<],[>] for staircase [c] to close',
        b: 'マップ: [a] すべて [s] 自身 [e] 敵 [i] アイテム [t] 罠 [p] ポータル [<],[>] 階段 [c] 閉じる'
    }],

    [M_SORT_SKILL, {
        a: 'Sort Skill: [a-z] to replace',
        b: 'スキルの整理: [a-z] 交換元'
    }],

    [M_SORT_SKILL2, {
        a: 'Sort Skill: [a-z] to replace with',
        b: 'スキルの整理: [a-z] 交換先'
    }],

    [M_GAIN, {
        a: 'Gain Stat/Skill: [a-Z] to choose',
        b: 'ステータス/スキルを取得する: [a-Z] 選択'
    }],

    [M_GAIN_SKILL, {
        a: 'Gain Skill: [a-z] to choose [A-Z] details',
        b: 'スキルを取得する: [a-z] 選択 [A-Z] 詳細'
    }],

    [M_ASSIGN_SKILL, {
        a: 'Assign Skill: [a-z] to choose [M], [F1-F12] to remove',
        b: 'スキルを割り当てる: [a-z] 選択 [M], [F1-F12] 除外'
    }],

    [M_ASSIGN_SKILL2, {
        a: 'Assign Skill: [M], [F1-F12] to choose',
        b: 'スキルを割り当てる: [M], [F1-F12] 選択'
    }],

    [M_CAST, {
        a: 'Use Skill: [a-z] to choose [A-Z] details [Ctrl+s] to sort',
        b: 'スキルを使う: [a-z] 選択 [A-Z] 詳細 [Ctrl+s] 整理'
    }],

    [M_CAST_DIR, {
        a: 'Use Skill: [direction] [t] to decide',
        b: 'スキルを使う: [方向] [t] 決定'
    }],

    [M_OPTION, {
        a: 'Option: [a-z] to choose',
        b: 'オプション: [a-z] 選択'
    }],

    [M_MESSAGE, {
        a: 'Previous Massage:',
        b: 'メッセージ履歴:'
    }],

    [M_HELP, {
        a: 'Help - Command:',
        b: 'ヘルプ - コマンド:'
    }],

    [M_CHARACTER, {
        a: 'Character Description:',
        b: 'キャラ詳細:'
    }],

    [M_OPEN_OR_CLOSE, {
        a: 'Open/Close Door: [direction] to decide',
        b: 'ドアの開閉: [方向] 決定'
    }],

    [M_TAKE_OFF, {
        a: 'Take off Equipment: [A-Z] to choose' ,
        b: '装備を外す: [A-Z] 選択'
    }],

    [M_FIRE, {
        a: 'Fire: [direction] to decide',
        b: '発射する: [方向] 決定'
    }],

    [M_QUIT, {
        a: 'Are you sure you want to quit? [Y/N]',
        b: '本当にゲームを放棄しますか? [Y/N]'
    }],

    [M_THROW, {
        a: 'Trow Item: [a-z] [1-9] to choose',
        b: 'アイテムを投げる: [a-z] [1-9] 選択'
    }],

    [M_THROW_DIR, {
        a: 'Trow Item: [direction] [t] to decide',
        b: 'アイテムを投げる: [方向] [t] 決定'
    }],
]);
