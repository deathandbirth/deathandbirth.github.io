const entranceList = {
    stash: {
        name: { a: 'Stash', b: '物置箱' },
        symbol: '&',
        color: colorList.brown,
        page: 1,
        stash: true,
    },

    book: {
        name: { a: 'Book Shop', b: '魔法書店' },
        symbol: '?',
        color: colorList.gray,
        shop: true,
        type: { 'book': 10 },
    },

    general: { 
        name: { a: 'General Shop', b: '雑貨屋' },
        symbol: ':',
        color: colorList.brown,
        shop: true,
        type: { 'food': 2, 'light': 6, 'oil': 2, },
    },

    potion: {
        name: { a: 'Potion Shop', b: '薬屋' },
        symbol: '!',
        color: colorList.blue,
        shop: true,
        type: { 'potion': 15 },
    },

    scroll: {
        name: { a: 'Scroll Shop', b: '巻物店' },
        symbol: '?',
        color: colorList.white,
        shop: true,
        type: { 'scroll': 15 },
    },

    wand: {
        name: { a: 'Wand Shop', b: '魔法棒店' },
        symbol: '-',
        color: colorList.white,
        shop: true,
        type: { 'wand': 10 },
    },

    weapon: { 
        name: { a: 'Weapon Shop', b: '武器屋' },
        symbol: '|',
        color: colorList.white,
        shop: true,
        equipment: true,
        type: { 'melee': 8, 'missile': 3, 'staff': 2, 'ammo': 6 },
    },

    armor: {
        name: { a: 'Armor Shop', b: '防具屋' },
        symbol: '[',
        color: colorList.gray,
        shop: true,
        equipment: true,
        type: { 'shield': 2, 'armor': 3, 'cloak': 2, 'belt': 2, 'helm': 2, 'gloves': 2, 'boots': 2 },
    },

    gamble: {
        name: { a: 'Gamble Shop', b: 'ギャンブル店' },
        symbol: '$',
        color: colorList.yellow,
        gamble: true,
        shop: true,
    },

    cure: {
        name: { a: 'Cure Shop', b: '治療店' },
        symbol: '+',
        color: colorList.lime,
        cure: true,
        list: {
            a: { a: 'recover completely', b: '全快する', cost: 400 },
            b: { a: 'restore health and mana', b: '体力と魔力を回復する', cost: 100 },
            c: { a: 'restore stats', b: '能力値を元に戻す', cost: 100 },
            d: { a: 'restore condition', b: '状態異常を元に戻す', cost: 100 },
            e: { a: 'have a meal', b: '食事をとる', cost: 100 }
        }
    },

    blacksmith: {
        name: { a: 'Blacksmith Shop', b: '鍛冶屋' },
        symbol: '/',
        color: colorList.gray,
        blacksmith: true,
    },
};

const Entrance  = class extends Thing {
    constructor(name) {
        super(entranceList[name]);
        if (this.shop) {
            this.list = {};
        } else if (this.stash) {
            this.list = map.stashList;
        }
    }

    putDown(x, y) {
        let loc = map.coords[x][y];
        loc.deleteWall();
        loc.enter = this;
    }

    createShopItem() {
        let k = 0;
        if (this.gamble) {
            for (let i = 0; i < 10; i++) {
                this.list[eaList[k++]] = creation.item({ position: POS_LIST });
            }

            return;
        }

        for (let type in this.type) {
            let max = this.type[type];
            let j = 0;
            let count = 0;
            let itemNums = itemNumsMap.get(type);
            itemNums.shuffle();
            do {
                let item, tabId;
                do {
                    tabId = itemNums[j++];
                    item = itemTab[type].get(tabId);
                } while (item && !item.shop);

                if (!item) {
                    j = 0;
                    itemNums.shuffle();
                    continue;
                }

                let quantity = item.equipable ? 1 : rndIntBet(10, 99);
                this.list[eaList[k]] = creation.item({
                    type: type,
                    tabId: tabId,
                    quantity: quantity,
                    position: POS_LIST,
                });
                
                inventory.sort(eaList[k++], this.list);
                if (k === MAX_PACK_COUNT) return;
                count++;
            } while (count < max);
        }
    }
}

