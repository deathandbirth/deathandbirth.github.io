const investigationMap = new Map([
    ['lvl', {
        name: { a: 'Level', b: 'レベル' },
        char: true,
        max: 'lvlMax',
    }],

    ['exp', {
        name: { a: 'Exp', b: '経験値' },
        char: true,
        max: 'expMax',
    }],

    ['expNext', {
        name: { a: 'Exp Next', b: '次経験値' },
        char: true,
    }],

    ['expGain', {
        name: { a: 'Exp Gain', b: '取得経験値' },
        char: true,
    }],

    ['totalWeight', {
        name: { a: 'Total Weight', b: '総重量' },
        char: true,
        weight: true,
        max: 'weightLimit',
    }],

    ['weight', {
        name: { a: 'Weight', b:'重量' },
        item: true,
        weight: true,
    }],

    ['atkType', {
        name: { a: 'Attack Type', b: '攻撃種類' },
    }],

    ['dmgBase', {
        name: { a: 'Damage Base', b: 'ダメージ基礎値' },
    }],

    ['dmgAvg', {
        name: { a: 'Damage Average', b: 'ダメージ期待値' },
        char: true,
        equipList: true,
    }],

    ['rateValue', {
        name: { a: 'Hit Rating', b: '命中値' },
        char: true,
        equipList: true,
    }],

    ['acSValue', {
        name: { a: 'Slash Defence', b: '斬守備力 ' },
        item: true,
    }],

    ['acTValue', {
        name: { a: 'Thrust Defence', b: '突守備力 ' },
        item: true,
    }],

    ['acBValue', {
        name: { a: 'Blunt Defence', b: '打守備力 ' },
        item: true,
    }],

    ['acSValueTotal', {
        name: { a: 'Slash Defence', b: '斬守備力' },
        char: true,
        equipList: true,
    }],

    ['acTValueTotal', {
        name: { a: 'Thrust Defence', b: '突守備力' },
        char: true,
        equipList: true,
    }],

    ['acBValueTotal', {
        name: { a: 'Blunt Defence', b: '打守備力' },
        char: true,
        equipList: true,
    }],

    ['timesMelee', {
        name: { a: 'Melee Attack Times', b: '近接攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesMissile', {
        name: { a: 'Missile Attack Times', b: '遠隔攻撃回数' },
        char: true,
        equipList: true,
    }],

    ['timesSpell', {
        name: { a: 'Spell Cast Speed', b: '魔法詠唱速度' },
        char: true,
        equipList: true,
    }],
    
    ['timesMove', {
        name: { a: 'Move Speed', b: '移動速度' },
        char: true,
        equipList: true,
    }],
    
    ['statPoints', {
        name: { a: 'Stat Points', b: 'ステータスポイント' },
        char: true,
        equipList: true,
    }],

    ['skillPoints', {
        name: { a: 'Skill Points', b: 'スキルポイント' },
        char: true,
        equipList: true,
    }],

    ['duration', {
        name: { a: 'Duration', b: '持続期間' },
        item: true,
    }],
    
    ['durationMax', {
        name: { a: 'Max Duration', b: '最大持続期間' },
        item: true,
    }],

    ['durab', {
        name: { a: 'Durability', b: '耐久度' },
        item: true,
        max: 'durabMax'
    }],

    ['iasBase', {
        name: { a: 'Base Attack Speed', b: '基礎攻撃速度' },
        item: true,
    }],
    
    ['fcrBase', {
        name: { a: 'Base Cast Speed', b: '基礎詠唱速度' },
        item: true,
    }],
    
    ['frwBase', {
        name: { a: 'Base Move Speed', b: '基礎移動速度' },
        item: true,
    }],
    
    ['material', {
        name: { a: 'Material', b: '素材' },
        item: true,
    }],
    
    ['embeddedNum', {
        name: { a: 'Embedded Number', b: '埋め込み数' },
        item: true,
        max: 'embeddedMax'
    }],
    
    ['mod', null],
    
    ['hp', {
        name: { a: 'Life', b: '体力' },
        plus: true,
        max: 'hpMax',
    }],
    
    ['mp', {
        name: { a: 'Mana', b: '魔力' },
        plus: true,
        max: 'mpMax',
    }],
    
    ['str', {
        name: { a: 'Strength', b: '筋力' },
        plus: true,
        max: 'strMax',
    }],
    
    ['dex', {
        name: { a: 'Dexterity', b: '器用さ' },
        plus: true,
        max: 'dexMax',
    }],
    
    ['con', {
        name: { a: 'Constitution', b: '耐久力' },
        plus: true,
        max: 'conMax',
    }],
    
    ['int', {
        name: { a: 'Intelligence', b: '知力' },
        plus: true,
        max: 'intMax',
    }],
    
    ['spd', {
        name: { a: 'Speed', b: '速度' },
        plus: true,
        max: 'spdMax',
    }],
    
    ['resistAll', {
        name: { a: 'Resist All', b: '全耐性' },
        plus: true,
        perc: true,
        item: true,
    }],
    
    ['fire', {
        name: { a: 'Fire Resist', b: '耐火' },
        plus: true,
        perc: true,
        max: 'fireMax',
        equipList: true,
    }],
    
    ['water', {
        name: { a: 'Water Resist', b: '耐水' },
        plus: true,
        perc: true,
        max: 'waterMax',
        equipList: true,
    }],
    
    ['air', {
        name: { a: 'Air Resist', b: '耐風' },
        plus: true,
        perc: true,
        max: 'airMax',
        equipList: true,
    }],
    
    ['earth', {
        name: { a: 'Earth Resist', b: '耐土' },
        plus: true,
        perc: true,
        max: 'earthMax',
        equipList: true,
    }],
    
    ['poison', {
        name: { a: 'Poison Resist', b: '耐毒' },
        plus: true,
        perc: true,
        max: 'poisonMax',
        equipList: true,
    }],
    
    ['end', null],
    
    ['skillFire', {
        name: { a: 'Fire Skill', b: '火スキル' },
        plus: true,
    }],
    
    ['skillWater', {
        name: { a: 'Water Skill', b: '水スキル' },
        plus: true,
    }],
    
    ['skillAir', {
        name: { a: 'Air Skill', b: '風スキル' },
        plus: true,
    }],
    
    ['skillEarth', {
        name: { a: 'Earth Skill', b: '土スキル' },
        plus: true,
    }],
    
    ['skillPoison', {
        name: { a: 'Poison Skill', b: '毒スキル' },
        plus: true,
    }],
    
    ['skillAll', {
        name: { a: 'All Skill ', b: '全スキル' },
        plus: true,
    }],
    
    ['synerzyMelee', {
        name: { a: 'Melee Synerzy', b: '近接シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyMissile', {
        name: { a: 'Missile Synerzy', b: '遠隔シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyFire', {
        name: { a: 'Fire Spell Synerzy', b: '火魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyWater', {
        name: { a: 'Water Spell Synerzy', b: '水魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyAir', {
        name: { a: 'Air Spell Synerzy', b: '風魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyEarth', {
        name: { a: 'Earth Spell Synerzy', b: '土魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['synerzyPoison', {
        name: { a: 'Poison Spell Synerzy', b: '毒魔法シナジー' },
        char: true,
        plus: true,
    }],
    
    ['ias', {
        name: { a: 'Increase Attack Speed', b: '攻撃速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['fcr', {
        name: { a: 'Faster Cast Rate', b: '詠唱速度上昇' },
        plus: true,
        perc: true,
    }],
    
    ['frw', {
        name: { a: 'Faster Run Walk', b: '早足' },
        plus: true,
        perc: true,
    }],
    
    ['digest', {
        name: { a: 'Slow Digestion', b: '遅消化' },
        plus: true,
        perc: true,
    }],
    
    ['stealth', {
        name: { a: 'Stealth', b: '隠密' },
        plus: true,
        perc: true,
    }],
    
    ['searching', {
        name: { a: 'Searching', b: '捜索' },
        plus: true,
        perc: true,
    }],
    
    ['hpReg', {
        name: { a: 'Life Regeneration', b: '再生' },
        plus: true,
        perc: true,
    }],
    
    ['mpReg', {
        name: { a: 'Mana Regeneration', b: '魔力再生' },
        plus: true,
        perc: true,
    }],
    
    ['mf', {
        name: { a: 'Magic Finding', b: '魔法具探求' },
        plus: true,
        perc: true,
    }],
    
    ['gf', {
        name: { a: 'Gold Finding', b: '財宝探求' },
        plus: true,
        perc: true,
    }],
    
    ['expBonus', {
        name: { a: 'Experience Bonus', b: '経験値加算値' },
        plus: true,
        perc: true,
    }],
    
    ['lighten', {
        name: { a: 'Lighten', b: '照明' },
        plus: true,
    }],
    
    ['durationBonus', {
        name: { a: 'Duration Bonus', b: '持続期間加算値' },
        item: true,
        plus: true,
    }],
    
    ['numBoxes', {
        name: { a: 'Slot numbers', b: 'スロット数' },
        plus: true,
    }],

    ['dmgDiceNum', {
        name: { a: 'Damage Dice Number', b: 'ダメージ・ダイス数' },
        plus: true,
    }],
    
    ['dmgDiceSides', {
        name: { a: 'Damage Dice Sides', b: 'ダメージ・ダイス面数' },
        plus: true,
    }],
    
    ['dmgBonus', {
        name: { a: 'Damage Bonus', b: 'ダメージ加算値' },
        plus: true,
        perc: true,
    }],
    
    ['rateBonus', {
        name: { a: 'Hit Rating Bonus', b: '命中率加算値' },
        plus: true,
        perc: true,
    }],
    
    ['acBonus', {
        name: { a: 'Defence Bonus', b: '守備力加算値' },
        plus: true,
        perc: true,
    }],
    
    ['durabBonus', {
        name: { a: 'Durability Bonus', b: '耐久度加算値' },
        item: true,
        plus: true,
    }],
    
    ['embeddedBonus', {
        name: { a: 'Embedded Bonus', b: '埋め込み加算値' },
        item: true,
        plus: true,
    }],
    
    ['digging', {
        name: { a: 'Digging', b: '採掘' },
        plus: true,
    }],
    
    ['dmgHuman', {
        name: { a: 'Damage to Human', b: '対人間ダメージ' },
        plus: true,
    }],
    
    ['dmgDemon', {
        name: { a: 'Damage to Demon', b: '対悪魔ダメージ' },
        plus: true,
    }],
    
    ['dmgAnimal', {
        name: { a: 'Damage to Animal', b: '対動物ダメージ' },
        plus: true,
    }],
    
    ['dmgDragon', {
        name: { a: 'Damage to Dragon', b: '対ドラゴンダメージ' },
        plus: true,
    }],
    
    ['dmgUndead', {
        name: { a: 'Damage to Undead', b: '対不死ダメージ' },
        plus: true,
    }],
    
    ['dmgGiant', {
        name: { a: 'Damage to Giant', b: '対巨人ダメージ' },
        plus: true,
    }],
    
    ['dmgSpirit', {
        name: { a: 'Damage to Spirit', b: '対精霊ダメージ' },
        plus: true,
    }],
    
    ['dmgFire', {
        name: { a: 'Fire Damage', b: '火ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgLightning', {
        name: { a: 'Lightning Damage', b: '電撃ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgPoison', {
        name: { a: 'Poison Damage', b: '毒ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['dmgAcid', {
        name: { a: 'Acid Damage', b: '酸ダメージ' },
        plus: true,
        perc: true,
    }],
    
    ['stealLife', {
        name: { a: 'Life Steal', b: '生命力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['stealMana', {
        name: { a: 'Mana Steal', b: '魔力吸収' },
        plus: true,
        perc: true,
    }],
    
    ['atkCon', {
        name: { a: 'Confusion Attack', b: '混乱攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkPara', {
        name: { a: 'Paralysis Attack', b: '麻痺攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkSlow', {
        name: { a: 'Slow Attack', b: '減速攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkInf', {
        name: { a: 'Infection Attack', b: '感染攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkBlind', {
        name: { a: 'Blindness Attack', b: '盲目攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkRadi', {
        name: { a: 'Radioactive Attack', b: '放射能攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkCold', {
        name: { a: 'Freezing Attack', b: '凍結攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkDrain', {
        name: { a: 'Drain Attack', b: '吸収攻撃' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealGold', {
        name: { a: 'Gold Steal', b: '金貨強奪' },
        plus: true,
        perc: true,
    }],
    
    ['atkStealItem', {
        name: { a: 'Item Steal', b: 'アイテム強奪' },
        plus: true,
        perc: true,
    }],
    
    ['strSus', {
        name: { a: 'Sustain Strength', b: '筋力維持' },
        bool: true,
    }],
    
    ['dexSus', {
        name: { a: 'Sustain Dexterity', b: '器用さ維持' },
        bool: true,
    }],
    
    ['conSus', {
        name: { a: 'Sustain Constitution', b: '耐久力維持' },
        bool: true,
    }],
    
    ['intSus', {
        name: { a: 'Sustain Intelligence', b: '知力維持' },
        bool: true,
    }],
    
    ['levi', {
        name: { a: 'Levitation', b: '浮遊' },
        bool: true,
    }],
    
    ['indestructible', {
        name: { a: 'Indestructible', b: '破壊不能' },
        bool: true,
    }],
    
    ['teleported', {
        name: { a: 'Random Teleportation', b: 'ランダム・テレポート' },
        bool: true,
    }],
    
    ['aggravating', {
        name: { a: 'Aggravate Monster', b: '反感' },
        bool: true,
    }],
]);
