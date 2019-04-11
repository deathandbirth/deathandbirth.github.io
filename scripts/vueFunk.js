/* TEMP */

Vue.component('item-key', {
    props:['item'],
    template: /*html*/`
        <li class="item-key">{{ item.key }}</li>
    `
})

Vue.component('item-parts', {
    props:['item'],
    template: /*html*/`
        <li
        v-show="item.parts"
        class="item-parts">{{ item.parts }}</li>
    `
})

Vue.component('item-symbol', {
    props:['item'],
    template: /*html*/`
        <li
            class="item-symbol"
            v-show="item.symbol"
            v-bind:class="{ 
                'unique-color': item.stroke,
            }"

            v-bind:style="{ 
                color: item.symbolColor,
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : ''
            }"
        >{{ item.symbol }}</li>
    `
})

Vue.component('item-name', {
    props:['item'],
    template: /*html*/`
        <li
            class="item-name flex-ellipsis"
            v-bind:class="{ 
                'unique-color': item.stroke,
            }"

            v-bind:style="{ 
                color: item.nameColor ? item.nameColor : '',
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : ''
            }"
        >{{ item.name }}</li>
    `
})

Vue.component('item-price', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.price"
            class="item-price"
        >{{ item.price }}</li>
    `
})

Vue.component('item-weight', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.weight"
            class="item-weight"
        >{{ item.weight + ' kg' }}</li>
    `
})

Vue.component('item-select', {
    props:['item'],
    template: /*html*/`
        <li
            v-show="item.select"
            class="item-select"
        >{{ item.select }}</li>
    `
})

Vue.component('item-list', {
    props:['items'],
    template: /*html*/`
        <ul class="item-list">
            <li v-for="item in items">
                <ul class="item-prop-list">
                    <item-key :item="item"></item-key>
                    <item-parts :item="item"></item-parts>
                    <item-symbol :item="item"></item-symbol>
                    <item-name :item="item"></item-name>
                    <item-price :item="item"></item-price>
                    <item-weight :item="item"></item-weight>
                    <item-select :item="item"></item-select>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('inv-bottom', {
    props:['left', 'right'],
    template: /*html*/`
        <ul 
            v-show="left || right"
            class="inv-bottom"
         >
            <li v-show="left">{{ left }}</li>
            <li v-show="right">{{ right }}</li>
        </ul>
    `
})

Vue.component('inventory', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory"
        >
            <item-list :items="inv.items"></item-list>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('stats-list', {
    props:['list'],
    template: /*html*/`
        <ul class="stats-list">
            <li
                class="stats-prop-list"
                v-for="stats in list"
                v-bind:style="{ 
                    color: stats.color ? stats.color : '',
                    'text-shadow': stats.shadow ? '1px 1px 0 ' + stats.shadow : ''
                }"
            >
                <span class="flex-ellipsis">{{ stats.name }}</span>
                <span>
                    {{ stats.value }}
                    <span v-show="stats.valueMax !== undefined">{{ ' (' + stats.valueMax + ')' }}</span>
                </span>
            </li>
        </ul>
    `
})

Vue.component('equipment', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory left"
        >
            <item-list :items="inv.items"></item-list>
            <div class="stats-list-box">
                <stats-list :list="inv.statsLeft"></stats-list>
                <stats-list :list="inv.statsRight"></stats-list>
            </div>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})


Vue.component('skill', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory"
        >
            <ul class="skill-list">
                <li
                    v-for="skill in inv.items"
                    class="skill"
                    :style="{
                        color: skill.color ? skill.color : '',
                        'text-shadow': skill.shadow ? '1px 1px 0 ' + skill.shadow : ''
                    }"
                >
                    <ul class="skill-prop-list">
                        <li class="skill-key">{{ skill.key }}</li>
                        <li class="skill-name flex-ellipsis">{{ skill.name }}</li>
                        <li class="skill-lvl"
                        >{{ skill.lvl }}</li>
                        <li class="skill-value">{{ skill.value }}</li>
                        <li
                            class="skill-mp"
                            :style="{
                                color: skill.mpColor ? skill.mpColor : '',
                                'text-shadow': skill.mpColor ? 'none' : '',
                            }"
                        >{{ skill.mp }}</li>
                        <li class="skill-reqLv"
                            :style="{
                                color: skill.reqLvColor ? skill.reqLvColor : '',
                                'text-shadow': skill.reqLvColor ? 'none' : '',
                            }"
                        >{{ skill.reqLv }}</li>
                        <li 
                            class="skill-reqSy"
                            :style="{
                                color: skill.reqSyColor ? skill.reqSyColor : '',
                                'text-shadow': skill.reqSyColor ? 'none' : '',
                            }"
                        >{{ skill.reqSy }}</li>
                    </ul>
                </li>
            </ul>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('command-list', {
    props:['cmdList', 'vueList'],
    template: /*html*/`
        <ul class="command-list">
            <li v-for="command in cmdList">
                <ul class="command">
                    <li class="command-key">{{ command.cmd[vueList.isEnglish ? 'a' : 'b'] }}</li>
                    <li class="command-text">{{ command.name[vueList.isEnglish ? 'a' : 'b'] }}</li>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('help', {
    props:['help', 'rogue', 'vueList'],
    template: /*html*/`
        <div
            class="inventory middle"
        >
            <div 
                id="command-list-box"
                class="command-list-box"
            >
                <command-list
                    id="command-list"
                    :cmd-list="help.listLeft"
                    :vue-list="vueList"
                ></command-list>
                <div class="command-list-box-right">
                    <command-list
                        :cmd-list="help.listRight"
                        :vue-list="vueList"
                    ></command-list>
                    <command-list
                        v-show="rogue.isWizard"
                        :cmd-list="help.listWizard"
                        :vue-list="vueList"
                    ></command-list>
                </div>
            </div>
            <inv-bottom
                :left="vueList.isEnglish ? 'Command List' : 'コマンド一覧'"
            ></inv-bottom>
        </div>
    `
})

Vue.component('grid-map', {
    props:['coords', 'rogue'],
    template: /*html*/`
        <div 
            class="grid-map"
            v-bind:class="{
                blinded: rogue.blinded,
                hallucinated: rogue.hallucinated
            }"
        >
            <ul v-for="row in coords">
                <li
                    v-for="loc in row"
                    v-bind:class="{ 
                        'sight-shadow': !loc.sight,
                        cursor: loc.cursor,
                        'rogue': loc.fighter && loc.fighter.id === rogue.id,
                    }"
                    v-bind:style="{ 
                        color: loc.color,
                        'text-shadow': loc.shadow ? '1px 1px 0px ' + loc.shadow : '',
                        '-webkit-text-stroke': loc.stroke ? '1px ' + loc.stroke : ''
                    }">
                    {{ loc.symbol }}
                    <span class="asterisk"
                        v-show="loc.plot"
                        v-bind:style="{ 
                            color: loc.plot
                        }">
                        ＊
                    </span>
                </li>
            </ul>	
        </div>
    `
})


const vuejs = {
    list: {
        isEnglish: false
    },

    loader() {
        this.gameLoader = new Vue({
            el: '#game-loader',
            data: {
                flag: flag,
                ver: VERSION,
                verData: 0,
                vueList: this.list 
            }
        });
    },

    initDone: false,
    init() {
        if (this.initDone) {
            this.update();
            return;
        }
        
        this.initDone = true;
        this.msgFixed = new Vue({
            el: '#message-fixed',
            data: {
                msg: '' 
            }
        });

        this.mapMain = new Vue({
            el: '#map-main-container',
            data: {
                coords: map.coords,
                rogue: rogue,
            }
        });

        this.mapMini = new Vue({
            el: '#map-mini-container',
            data: {
                coords: minimap.coords,
                rogue: rogue,
                flag: flag
            }
        });

        this.msgTemp = new Vue({
            el: '#msg-temp-container',
            data: {
                msgs: message.listTemp
            }
        }); 

        this.statsFixed =  new Vue({
            el: '#stats-fixed-container',
            data: {
                rogue: rogue,
                colorList: colorList,
                vueList: this.list 
            },
        });

        this.condition =  new Vue({
            el: '#condition-container',
            data: {
                rogue: rogue,
                colorList: colorList,
                vueList: this.list 
            },
        });

        this.enemyBar =  new Vue({
            el: '#enemy-bar-container',
            data: {
                enemy: null,
                name: '',
                rogue: rogue,
                colorList: colorList,
                vueList: this.list 
            },
        });

        this.inventory =  new Vue({
            el: '#inventory-right',
            data: {
                inv: inventory.list.right,
            },
        });

        this.inventory =  new Vue({
            el: '#inventory-left',
            data: {
                inv: inventory.list.left,
            },
        });

        this.equipment =  new Vue({
            el: '#equipment',
            data: {
                inv: inventory.list.equipment,
            },
        });

        this.skill =  new Vue({
            el: '#skill',
            data: {
                inv: inventory.list.skill,
            },
        });

        this.stats =  new Vue({
            el: '#stats',
            data: {
                inv: inventory.list.stats,
            },
        });

        this.recipe =  new Vue({
            el: '#recipe',
            data: {
                inv: inventory.list.recipe,
            },
        });

        this.bookmark =  new Vue({
            el: '#bookmark',
            data: {
                inv: inventory.list.bookmark,
            },
        });

        this.message =  new Vue({
            el: '#message-list-container',
            data: {
                flag: flag,
                message: message,
                vueList: this.list 
            },
        });

        this.help =  new Vue({
            el: '#help',
            data: {
                flag: flag,
                help: help,
                rogue: rogue,
                vueList: this.list 
            },
        });

        this.investigationItem =  new Vue({
            el: '#investigation-item',
            data: {
                inv: investigation.list.item
            },
        });

        this.investigationFighter =  new Vue({
            el: '#investigation-fighter',
            data: {
                inv: investigation.list.fighter
            },
        });

        this.investigationSkill =  new Vue({
            el: '#investigation-skill',
            data: {
                inv: investigation.list.skill
            },
        });
    },

    update() {
        this.statsFixed.rogue = rogue;
        this.condition.rogue = rogue;
        this.enemyBar.rogue = rogue;
    }
}

