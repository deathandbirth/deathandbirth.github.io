function vueInit() {
    vue = new Vue({
        el: '#game-container',
        data: {
            isEnglish: false,
            flag: flag,
            ver: VERSION,
            verData: 0,
            msgFixed: '',
            rogue: null,
            help: help,
            inventoryList: inventory.list,
            investigationList: investigation.list,
            colorList: colorList,
            msgListTemp: message.listTemp,

            // Message Prev
            msgList: message.list,
            msgTotal: '', 

            // Enemy Bar
            barEnemy: null,
            barName: '',
        }
    });
}

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
            :style="{ 
                color: item.symbolColor,
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : '',
                'text-stroke': item.stroke ? '1px ' + item.stroke : '',
            }"
        >{{ item.symbol }}</li>
    `
})

Vue.component('item-name', {
    props:['item'],
    template: /*html*/`
        <li
            class="item-name flex-ellipsis"
            :style="{ 
                color: item.nameColor ? item.nameColor : '',
                'text-shadow': item.shadow ? '1px 1px 0 ' + item.shadow : '',
                'text-stroke': item.stroke ? '1px ' + item.stroke : '',
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
            v-show="item.select !== undefined"
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
                :style="{ 
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

Vue.component('skill-list', {
    props:['skills', 'invest'],
    template: /*html*/`
        <ul class="skill-list">
            <li
                v-for="skill in skills"
                class="skill"
                :style="{
                    color: skill.color ? skill.color : '',
                    'text-shadow': skill.shadow ? '1px 1px 0 ' + skill.shadow : ''
                }"
            >
                <ul class="skill-prop-list">
                    <li
                        v-if="!invest"
                        class="skill-key"
                    >{{ skill.key }}</li>
                    <li
                        class="skill-name flex-ellipsis"
                    >{{ skill.name }}</li>
                    <li 
                        v-if="!invest"
                        class="skill-lvl"
                    >{{ skill.lvl }}</li>
                    <li
                        v-if="!invest"
                        class="skill-value"
                    >{{ skill.value }}</li>
                    <li
                        v-if="invest"
                        class="skill-element"
                    >{{ skill.element }}</li>
                    <li
                        v-if="!invest"
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
    `
})

Vue.component('skill', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory"
        >
            <skill-list :skills="inv.items"></skill-list>
            <inv-bottom
                :left="inv.left"
                :right="inv.right"
            ></inv-bottom>
        </div>
    `
})

Vue.component('command-list', {
    props:['cmdList', 'isEnglish'],
    template: /*html*/`
        <ul class="command-list">
            <li v-for="command in cmdList">
                <ul class="command">
                    <li class="command-key">{{ command.cmd[isEnglish ? 'a' : 'b'] }}</li>
                    <li class="command-text">{{ command.name[isEnglish ? 'a' : 'b'] }}</li>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('help', {
    props:['help', 'rogue', 'isEnglish'],
    template: /*html*/`
        <div
            class="inventory middle"
        >
            <div 
                ref="commandListBox"
                class="command-list-box"
            >
                <command-list
                    ref="commandList"
                    :cmd-list="help.listLeft"
                    :isEnglish="isEnglish"
                ></command-list>
                <div class="command-list-box-right">
                    <command-list
                        :cmd-list="help.listRight"
                        :isEnglish="isEnglish"
                    ></command-list>
                    <command-list
                        v-if="rogue&&rogue.isWizard"
                        :cmd-list="help.listWizard"
                        :isEnglish="isEnglish"
                    ></command-list>
                </div>
            </div>
            <inv-bottom
                :left="isEnglish ? 'Command List' : 'コマンド一覧'"
            ></inv-bottom>
        </div>
    `
})

Vue.component('message-temp', {
    props:['list'],
    template: /*html*/`
        <div class="message-temp-box">
            <ul>
                <li
                    v-for="msg in list"
                >{{ msg.text + (msg.count > 1 ? ' (x' + msg.count + ')' : '') }}</li>
            </ul>
        </div>
    `
})

Vue.component('message-prev', {
    props:['list', 'total'],
    template: /*html*/`
        <div class="inventory middle">
            <ul ref="messagePrevList"
                class="message-list"
            >
                <li v-for="msg in list">{{ msg.text + (msg.count > 1 ? ' (x' + msg.count + ')' : '') }}</li>
            </ul>
            <inv-bottom
                :left="total"
            ></inv-bottom>
        </div>
    `
})

Vue.component('investigation-item', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p
                v-show="inv.desc"
                class="description"
                >{{ inv.desc }}</p>
            <ul class="base-prop-list">
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
            <ul class="embedded-list">
                <li v-for="item in inv.embeddedList">
                    <ul class="embedded-prop">
                        <item-symbol :item="item"></item-symbol>
                        <item-name :item="item"></item-name>
                    </ul>
                </li>
            </ul>
            <ul class="mod-prop-list">
                <li v-for="prop in inv.modPropList">
                    <ul class="mod-prop buff">
                        <li>{{ prop.text }}</li>
                        <li v-show="prop.value">{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
            <ul class="mod-parts-list">
                <li v-for="(props, key) in inv.modPartsList">
                    <ul class="mod-parts-prop-list">
                        <li class="mod-parts">{{ key }}</li>
                        <li>
                            <ul
                                v-for="prop in props"
                                class="mod-prop buff"
                            >
                                <li>{{ prop.text }}</li>
                                <li v-show="prop.value">{{ prop.value }}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <skill-list
                :skills="inv.skills"
                :invest="true"
            ></skill-list>
        </div>
    `
})

Vue.component('investigation-fighter', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p
                v-show="inv.desc"
                class="description"
            >{{ inv.desc }}</p>
            <ul
                ref="fighterPropList"
                class="base-prop-list"
            >
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('investigation-skill', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory investigation"
        >
            <ul class="item-prop-list">
                <item-symbol :item="inv.obj"></item-symbol>
                <item-name :item="inv.obj"></item-name>
            </ul>
            <p class="description">{{ inv.desc }}</p>
            <ul class="base-prop-list">
                <li v-for="prop in inv.basePropList">
                    <ul
                        class="base-prop"
                        :style="{ 
                            'text-shadow': prop && prop.shadow ? '1px 1px 0 ' + prop.shadow : ''
                        }"
                    >
                        <li>{{ prop.text }}</li>
                        <li>{{ prop.value }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('recipe', {
    props:['inv'],
    template: /*html*/`
        <div
            v-if="inv.show"
            class="inventory middle"
        >
            <ul class="item-list">
                <li v-for="item in inv.items">
                    <ul class="item-prop-list">
                        <li class="item-name">{{ item.name }}</li>
                        <li class="item-cost">{{ item.cost }}</li>
                        <li class="item-recipe">{{ item.recipe }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})

Vue.component('enemy-bar', {
    props:['enemy', 'name', 'rogue', 'colorList'],
    template: /*html*/`
        <div>
            <div 
                v-if="enemy"
                class="enemy-bar-box"
            >
                <p
                    :style="{ 
                        color: enemy.cursed ? colorList.red : '',
                        'text-shadow': enemy.shadow ? '1px 1px 0 ' + enemy.shadow : '',
                        'text-stroke': enemy.stroke ? '1px ' + enemy.stroke : '',
                    }"
                >{{ 'Lv' + enemy.lvl + ' ' + name }}</p>
                <div class="enemy-bar">
                    <span 
                        class="hp"
                        :style="{ 
                            width: (enemy.hp < 0 ? 0 : enemy.hp / enemy.hpMax * 100) + '%',
                            'background-color': (
                                enemy.sleeping ? colorList.royalblue :
                                enemy.paralyzed ? colorList.orange :
                                enemy.confused ? colorList.yellow :
                                enemy.blinded ? colorList.gray :
                                enemy.hallucinated ? colorList.purple :
                                enemy.canceled ? colorList.white :
                                enemy.infected ? colorList.infection :
                                enemy.poisoned ? colorList.poison :
                                ''
                            )
                        }"
                    ></span>
                </div>
            </div>
            <span
                v-if="rogue.ce"
                class="enemy-icon"
                :style="{ 
                    color: rogue.ce.color,
                    'text-shadow': rogue.ce.shadow ? '1px 1px 0 ' + rogue.ce.shadow : '',
                    'text-stroke': rogue.ce.stroke ? '1px ' + rogue.ce.stroke : '',
                }"
            >{{ rogue.ce.symbol }}</span>
        </div>
    `
})

Vue.component('condition', {
    props:['rogue', 'colorList', 'isEnglish'],
    template: /*html*/`
        <div 
            :style="{ 
                'background-color': rogue.hallucinated ? 'rgba(128, 0, 128, 0.15)' : '',
            }"
        >
            <ul>
                <li
                    v-if="rogue.hunger >= 1600"
                    :style="{ color: colorList.lime }"
                >{{ isEnglish ? 'full' : '満腹'}}</li>
                <li
                    v-else-if="rogue.hunger > 0 && rogue.hunger <= 200"
                    :style="{ color: colorList.yellow }"
                >{{ isEnglish ? 'hungry' : '空腹'}}</li>
                <li
                    v-else-if="rogue.hunger === 0"
                    :style="{ color: colorList.red }"
                >{{ isEnglish ? 'starved' : '飢餓'}}</li>
                <li
                    v-if="rogue.poisoned"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'poisoned' : '毒'}}</li>
                <li
                    v-if="rogue.confused"
                    :style="{ color: colorList.yellow }"
                >{{ isEnglish ? 'confused' : '混乱'}}</li>
                <li
                    v-if="rogue.paralyzed"
                    :style="{ color: colorList.orange }"
                >{{ isEnglish ? 'paralyzed' : '麻痺'}}</li>
                <li
                    v-if="rogue.sleeping > 0"
                    :style="{ color: colorList.royalblue }"
                >{{ isEnglish ? 'sleeping' : '睡眠'}}</li>
                <li
                    v-if="rogue.blinded"
                    :style="{ color: colorList.gray }"
                >{{ isEnglish ? 'blinded' : '盲目'}}</li>
                <li
                    v-if="rogue.infected"
                    :style="{ color: colorList.infection }"
                >{{ isEnglish ? 'infected' : '感染'}}</li>
                <li
                    v-if="rogue.hallucinated"
                    :style="{ color: colorList.purple }"
                >{{ isEnglish ? 'hallucinated' : '幻覚'}}</li>
                <li
                    v-if="rogue.canceled"
                    :style="{ color: colorList.white }"
                >{{ isEnglish ? 'canceled' : '封印'}}</li>
                <li
                    v-if="rogue.seeInvisible"
                    :style="{
                        color: colorList.light,
                        'text-shadow': '1px 1px 0 ' + colorList.light
                    }"
                >{{ isEnglish ? 'see invisible' : '透視'}}</li>
                <li
                    v-if="rogue.invisibility"
                    :style="{
                        color: colorList.light,
                        'text-shadow': '1px 1px 0 ' + colorList.light
                    }"
                >{{ isEnglish ? 'invisible' : '透明'}}</li>
                <li
                    v-if="rogue.ecco"
                    :style="{ color: colorList.air }"
                >{{ isEnglish ? 'ecco' : 'エコー'}}</li>
                <li
                    v-if="rogue.enchantSelfDur"
                    :style="{ color: colorList.earth }"
                >{{ isEnglish ? 'enchant self' : '自己強化'}}</li>
                <li
                    v-if="rogue.venomDur"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'venom hands' : '猛毒の手'}}</li>
                <li
                    v-if="rogue.confusing"
                    :style="{ color: colorList.poison }"
                >{{ isEnglish ? 'confusing hands' : '混乱の手'}}</li>
            </ul>
        </div>
    `
})

Vue.component('stats-fixed', {
    props:['rogue', 'colorList', 'isEnglish'],
    template: /*html*/`
        <div>
            <div class="stats-fixed-left-container">
                <div class="stats-fixed-bar">
                    <span 
                        class="hp"
                        :style="{ 
                            width: (rogue.hp < 0 ? 0 : rogue.hp / rogue.hpMax * 100) + '%',
                            'background-color': (
                                rogue.sleeping ? colorList.royalblue :
                                rogue.paralyzed ? colorList.orange :
                                rogue.confused ? colorList.yellow :
                                rogue.blinded ? colorList.gray :
                                rogue.hallucinated ? colorList.purple :
                                rogue.canceled ? colorList.white :
                                rogue.infected ? colorList.infection :
                                rogue.poisoned ? colorList.poison :
                                ''
                            )
                        }"
                    ></span>
                </div>
                <div class="stats-fixed-box">
                    <ul class="stats-fixed-list-top">
                        <li
                            :style="{ color: rogue.lvl < rogue.lvlMax ? colorList.yellow : '' }"
                        >{{ (isEnglish ? 'Level ' : 'レベル ') + rogue.lvl }}</li>
                        <li
                            :class="{ 
                                buff: rogue.expBuff,
                            }"

                            :style="{
                                color: rogue.exp < rogue.expMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Exp ' : '経験値 ') + rogue.exp }}</li>
                        <li>{{ '$ ' + rogue.purse }}</li>
                        <li
                            :style="{
                                color: rogue.hp <= 0 ? colorList.red : '',
                            }"
                        >{{ 'HP '+ rogue.hp + '/' + rogue.hpMax }}</li>
                    </ul>
                    <ul class="stats-fixed-list-bottom">
                        <li 
                            class="rogue-boxes-list"
                            v-for="(item, key) in rogue.boxes"
                        >
                            <span
                                :style="{ 
                                    color: item ? item && item.color : '',
                                    'text-shadow': item && item.shadow ? '1px 1px 0 ' + item.shadow : '',
                                    'text-stroke': item && item.stroke ? '1px ' + item.stroke : '',
                                }"
                            >{{ item ? item.symbol : key }}</span>
                            <span 
                                class="item-num"
                                v-if="item"
                            >{{ item.quantity }}</span>
                            <span 
                                class="item-charge"
                                v-if="item && item.identified && isFinite(item.charges)"
                            >{{ item.charges}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="stats-fixed-right-container">
                <div class="stats-fixed-bar">
                    <span class="mp"
                        :style="{ 
                            width: (rogue.mp < 0 ? 0 : rogue.mp / rogue.mpMax * 100) + '%'
                        }"
                    ></span>
                </div>
                <div class="stats-fixed-box">
                    <ul class="stats-fixed-list-top">
                        <li
                            :style="{
                                color: rogue.mp <= 0 ? colorList.red : '',
                            }"
                        >{{ 'MP '+ rogue.mp + '/' + rogue.mpMax }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.strSus
                            }"

                            :style="{
                                color: rogue.str < rogue.strMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Str ' : '筋 ') + rogue.str }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.dexSus
                            }"

                            :style="{
                                color: rogue.dex < rogue.dexMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Dex ' : '器 ') + rogue.dex }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.conSus
                            }"

                            :style="{
                                color: rogue.con < rogue.conMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Con ' : '耐 ') + rogue.con }}</li>
                        <li
                            :class="{ 
                                sustain: rogue.intSus
                            }"

                            :style="{
                                color: rogue.int < rogue.intMax ? colorList.yellow : '',
                            }"
                        >{{ (isEnglish ? 'Int ' : '知 ') + rogue.int }}</li>
                        <li
                            :class="{ 
                                buff: rogue.spdBuffDur
                            }"

                            :style="{
                                color: rogue.spdNerfDur ? colorList.red : '',
                            }"
                        >{{ (isEnglish ? 'Spd ' : '速 ') + rogue.spd + '%' }}</li>
                    </ul>
                    <div class="stats-fixed-list-bottom">
                        <span v-if="!rogue.cdl">{{ isEnglish ? 'Limbo' : '辺獄' }}</span>
                        <span v-else-if="rogue.cdl >= 1 && rogue.cdl <= 33">{{ (isEnglish ? 'Hell B' : '地獄 地下') + rogue.cdl }}</span>
                        <span v-else-if="rogue.cdl >= 34 && rogue.cdl <= 66">{{ (isEnglish ? 'Purgatory ' : '煉獄') + (rogue.cdl - 33) }}</span>
                        <span v-else-if="rogue.cdl >= 67 && rogue.cdl <= 99">{{ (isEnglish ? 'Heaven ' : '天国') + (rogue.cdl - 66) }}</span>
                    </div>
                </div>
            </div>
        </div>
    `
})

Vue.component('game-loader', {
    props:['flag', 'ver', 'verData', 'isEnglish'],
    template: /*html*/`
		<div>
			<div
				class="title"
				v-if="flag.title || flag.failed"
				v-cloak
			>
				<p
					class="err-msg"
					v-show="flag.failed"
				>
					{{ (isEnglish ?
					"Failed to load. In order to delete your save data and continue, please push 'Y'" :
					"読み込みに失敗しました。セーブデータを消去してゲームを続けるには、'Y'を押してください。")
					+ "(data ver " + verData.toFixed(3) + ")" }}
				</p>
				<div class="msg-box">
					<h1>Death and Birth</h1>
					<h2>{{ isEnglish ?
						'[Enter] to start' :
						'[Enter] ゲームスタート' }}
					</h2>
				</div>
				<small class="ver">{{ "ver " + ver.toFixed(3) }}</small>
			</div>
			<div
				class="retry"
				v-else-if="flag.retry"
				v-cloak
			>
				<div class="msg-box">
					<h1>G A M E  O V E R</h1>
					<h2>{{ isEnglish ?
						'[Enter] to retry' :
						'[Enter] リトライ' }}
					</h2>
				</div>
			</div>
		</div>
    `
})
