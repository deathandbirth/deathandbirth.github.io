const modTab = {
    prefix: new Map([
        [BIAS_FIRE, {
            name: { a: 'Fire', b: '火炎の' },
            color: colorList.fire,
            lvl: 0,
            rarity: 0,
            melee: { dmgFire: '1d10' },
            missile: { dmgFire: '1d10' },
            staff: { fire: '1d10' },
            shield: { fire: '2d10' },
            armor: { fire: '1d10' },
            cloak: { fire: '1d10' },
            belt: { fire: '1d10' },
            helm: { fire: '1d10' },
            gloves: { fire: '1d10' },
            boots: { fire: '1d10' },
            amulet: { fire: '1d10' },
            ring: { fire: '1d10' },
            light: { fire: '1d10', lighten: 1 },
            gem: { fire: '1d5' },
            enemy: { fire: '2d10', str: '1d5', dmgFire: '1d10' },
            affix: [
                { name: { a: 'of Heat', b: '発熱の' }, rarity: 0 },
                { name: { a: 'of Fever', b: '熱狂の' }, rarity: 5 },
                { name: { a: 'of Combustion', b: '燃焼の' }, rarity: 10 },
                { name: { a: 'of Ignition', b: '発火の' }, rarity: 15 },
                { name: { a: 'of Blaze', b: '焔光の' }, rarity: 20 },
                { name: { a: 'of Flame', b: '焔の' }, rarity: 25 },
                { name: { a: 'of Flare', b: '爆炎の' }, rarity: 30 },
                { name: { a: 'of Burning', b: '灼熱の' }, rarity: 35 },
                { name: { a: 'of Inferno', b: '業火の' }, rarity: 40 },
                { name: { a: 'of Salamander', b: 'サラマンダーの' }, rarity: 50 },
                { name: { a: 'of Hestia', b: '炉の女神ヘスティアの' }, rarity: 60 },
                { name: { a: 'of Hephaestus', b: '鍛冶の神ヘパイストスの' }, rarity: 80 },
                { name: { a: 'of Prometheus', b: '火神プロメテウスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_WATER, {
            name: { a: 'Aqua', b: '水の' },
            color: colorList.water,
            lvl: 0,
            rarity: 0,
            melee: { atkCold: '1d10' },
            missile: { atkCold: '1d10' },
            staff: { water: '1d10' },
            shield: { water: '2d10' },
            armor: { water: '1d10' },
            cloak: { water: '1d10' },
            belt: { water: '1d10' },
            helm: { water: '1d10' },
            gloves: { water: '1d10' },
            boots: { water: '1d10' },
            amulet: { water: '1d10' },
            ring: { water: '1d10' },
            light: { water: '1d10' },
            gem: { water: '1d5' },
            enemy: { water: '2d10', int: '1d5', atkCold: '1d10' },
            affix: [
                { name: { a: 'of Rain', b: '降雨の' }, rarity: 0 },
                { name: { a: 'of Lake', b: '湖の' }, rarity: 5 },
                { name: { a: 'of River', b: '河川の' }, rarity: 10 },
                { name: { a: 'of Waterfall', b: '滝の' }, rarity: 15 },
                { name: { a: 'of Ocean', b: '大洋の' }, rarity: 20 },
                { name: { a: 'of Flow', b: '流動の' }, rarity: 25 },
                { name: { a: 'of Tide', b: '潮流の' }, rarity: 30 },
                { name: { a: 'of Splashing', b: '飛散の' }, rarity: 35 },
                { name: { a: 'of Flood', b: '氾濫の' }, rarity: 40 },
                { name: { a: 'of Whirlpool', b: '渦潮の' }, rarity: 45 },
                { name: { a: 'of Undine', b: 'ウィンディーネの' }, rarity: 50 },
                { name: { a: 'of Triton', b: '人魚の海神トリトンの' }, rarity: 60 },
                { name: { a: 'of Tethys', b: '水の女神テテュスの' }, rarity: 70 },
                { name: { a: 'of Achelous', b: '河神アケオロスの' }, rarity: 80 },
                { name: { a: 'of Poseidon', b: '海王ポセイドンの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_AIR, {
            name: { a: 'Air', b: '大気の' },
            color: colorList.air,
            lvl: 0,
            rarity: 0,
            melee: { dmgLightning: '1d10' },
            missile: { dmgLightning: '1d10' },
            staff: { air: '1d10' },
            shield: { air: '2d10' },
            armor: { air: '1d10' },
            cloak: { air: '1d10' },
            belt: { air: '1d10' },
            helm: { air: '1d10' },
            gloves: { air: '1d10' },
            boots: { air: '1d10' },
            amulet: { air: '1d10' },
            ring: { air: '1d10' },
            light: { air: '1d10' },
            gem: { air: '1d5' },
            enemy: { air: '2d10', dex: '1d5', dmgLightning: '1d10', levi: true },
            affix: [
                { name: { a: 'of Feather', b: '羽の' }, rarity: 0 },
                { name: { a: 'of Wing', b: '翼の' }, rarity: 5 },
                { name: { a: 'of Wind', b: '風の' }, rarity: 10 },
                { name: { a: 'of Drifting', b: '漂流の' }, rarity: 15 },
                { name: { a: 'of Gust', b: '突風の' }, rarity: 20 },
                { name: { a: 'of Gale', b: '疾風の' }, rarity: 25 },
                { name: { a: 'of Blast', b: '爆風の' }, rarity: 30 },
                { name: { a: 'of Vortex', b: '旋風の' }, rarity: 35 },
                { name: { a: 'of Tempest', b: '暴風の' }, rarity: 40 },
                { name: { a: 'of Cyclone', b: '大竜巻の' }, rarity: 45 },
                { name: { a: 'of Sylph', b: 'シルフの' }, rarity: 50 },
                { name: { a: 'of Eurus', b: '東風エウロスの' }, rarity: 55 },
                { name: { a: 'of Zephyrus', b: '西風ゼピュロスの' }, rarity: 60 },
                { name: { a: 'of Notos', b: '南風ノトスの' }, rarity: 65 },
                { name: { a: 'of Boreas', b: '北風ボレアスの' }, rarity: 70 },
                { name: { a: 'of Aeolus', b: '風神アイオロスの' }, rarity: 80 },
                { name: { a: 'of Aether', b: '大気の神アイテルの' }, rarity: 90 },
                //azure
            ]
		}],
		
        [BIAS_EARTH, {
            name: { a: 'Earth', b: '大地の' },
            color: colorList.earth,
            lvl: 0,
            rarity: 0,
            melee: { atkSlow: '1d10' },
            missile: { atkSlow: '1d10' },
            staff: { earth: '1d10' },
            shield: { earth: '2d10' },
            armor: { earth: '1d10' },
            cloak: { earth: '1d10' },
            belt: { earth: '1d10' },
            helm: { earth: '1d10' },
            gloves: { earth: '1d10' },
            boots: { earth: '1d10' },
            amulet: { earth: '1d10' },
            ring: { earth: '1d10' },
            light: { earth: '1d10' },
            gem: { earth: '1d5' },
            enemy: { earth: '2d10', con: '1d5', atkSlow: '1d10', acBonus: '1d10' },
            affix: [
                { name: { a: 'of Rock', b: '岩の' }, rarity: 0 },
                { name: { a: 'of Ground', b: '地の' }, rarity: 5 },
                { name: { a: 'of Highland', b: '高原の' }, rarity: 10 },
                { name: { a: 'of Hill', b: '塚の' }, rarity: 15 },
                { name: { a: 'of Mountain', b: '山岳の' }, rarity: 20 },
                { name: { a: 'of Surface', b: '地表の' }, rarity: 25 },
                { name: { a: 'of Terrestrial', b: '地上の' }, rarity: 30 },
                { name: { a: 'of Gnome', b: 'ノームの' }, rarity: 50 },
                { name: { a: 'of Pan', b: '山野の神パンの' }, rarity: 60 },
                { name: { a: 'of Dionysus', b: '陶酔の神デュオニュソスの' }, rarity: 70 },
                { name: { a: 'of Demeter', b: '豊穣の女神デメテルの' }, rarity: 80 },
                { name: { a: 'of Rhea', b: '大地の女神レアの' }, rarity: 85 },
                { name: { a: 'of Gaia', b: '地母神ガイアの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_POISON, {
            name: { a: 'Poison', b: '毒の' },
            color: colorList.poison,
            lvl: 0,
            rarity: 0,
            melee: { dmgPoison: '1d10' },
            missile: { dmgPoison: '1d10' },
            staff: { poison: '1d10' },
            shield: { poison: '2d10' },
            armor: { poison: '1d10' },
            cloak: { poison: '1d10' },
            belt: { poison: '1d10' },
            helm: { poison: '1d10' },
            gloves: { poison: '1d10' },
            boots: { poison: '1d10' },
            amulet: { poison: '1d10' },
            ring: { poison: '1d10' },
            light: { poison: '1d10' },
            gem: { poison: '1d5' },
            enemy: { poison: '2d10', dmgPoison: '1d10' },
            affix: [
                { name: { a: 'of Dirtiness', b: '不潔の' }, rarity: 0 },
                { name: { a: 'of Fraud', b: '詐欺の' }, rarity: 5 },
                { name: { a: 'of Malice', b: '悪意の' }, rarity: 10 },
                { name: { a: 'of Hatred', b: '憎悪の' }, rarity: 15 },
                { name: { a: 'of Foulness', b: '悪臭の' }, rarity: 20 },
                { name: { a: 'of Corruption', b: '堕落の' }, rarity: 25 },
                { name: { a: 'of Rot', b: '腐敗の' }, rarity: 30 },
                { name: { a: 'of Toxicity', b: '毒性の' }, rarity: 35 },
                { name: { a: 'of Venom', b: '猛毒の' }, rarity: 40 },
                { name: { a: 'of Filth', b: '不浄の' }, rarity: 45 },
                { name: { a: 'of Arachne', b: '蜘蛛の女王アラクネの' }, rarity: 60 },
                { name: { a: 'of Medusa', b: 'メデューサの' }, rarity: 70 },
                { name: { a: 'of Euryale', b: 'エウリュアレの' }, rarity: 80 },
                { name: { a: 'of Stheno', b: 'ステンノの' }, rarity: 90 },
                //horror
            ]
		}],
		
        [BIAS_LIGHT, {
            name: { a: 'Light', b: '光の' },
            color: colorList.light,
            lvl: 10,
            rarity: 30,
            melee: {atkBlind: '1d10', dmgFire: '1d10' },
            missile: {atkBlind: '1d10', dmgFire: '1d10' },
            staff: { skillFire: 1 },
            shield: { fire: '3d10' },
            armor: { fire: '2d10' },
            cloak: { fire: '2d10' },
            belt: { fire: '2d10' },
            helm: { fire: '2d10' },
            gloves: { fire: '2d10' },
            boots: { fire: '2d10' },
            amulet: { skillFire: 1 },
            ring: { skillFire: 1 },
            light: { fire: '2d10', lighten: 1 },
            gem: { fire: '1d10'},
            enemy: { fire: '3d10', skillFire: 1, str: '1d5', atkBlind: '1d10', dmgFire: '1d10' },
            affix: [
                { name: { a: 'of Glow', b: '白熱の' }, rarity: 0 },
                { name: { a: 'of Flash', b: '閃光の' }, rarity: 5 },
                { name: { a: 'of Luminescence', b: '発光の' }, rarity: 10 },
                { name: { a: 'of Brightness', b: '光明の' }, rarity: 15 },
                { name: { a: 'of Shining', b: '光輝の' }, rarity: 20 },
                { name: { a: 'of Holiness', b: '聖なる' }, rarity: 25 },
                { name: { a: 'of Halo', b: '光輪の' }, rarity: 30 },
                { name: { a: 'of Purity', b: '清浄の' }, rarity: 35 },
                { name: { a: 'of Sanctuary', b: '聖域の' }, rarity: 40 },
                { name: { a: 'of Divinity', b: '神性の' }, rarity: 45 },
                { name: { a: 'of Sun', b: '太陽の' }, rarity: 50 },
                { name: { a: 'of Eos', b: '暁の女神エオスの' }, rarity: 60 },
                { name: { a: 'of Phoebe', b: '光明神ボイべの' }, rarity: 70 },
                { name: { a: 'of Hemera', b: '昼の女神ヘメラの' }, rarity: 75 },
                { name: { a: 'of Helios', b: '陽の神エエリオスの' }, rarity: 85 },
                { name: { a: 'of Hyperion', b: '太陽神ヒュペリオンの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_COLD, {
            name: { a: 'Cold', b: '冷気の' },
            color: colorList.cold,
            lvl: 10,
            rarity: 30,
            melee: { atkCold: '2d10' },
            missile: { atkCold: '2d10' },
            staff: { skillWater: 1 },
            shield: { water: '3d10' },
            armor: { water: '2d10' },
            cloak: { water: '2d10' },
            belt: { water: '2d10' },
            helm: { water: '2d10' },
            gloves: { water: '2d10' },
            boots: { water: '2d10' },
            amulet: { skillWater: 1 },
            ring: { skillWater: 1 },
            light: { water: '2d10' },
            gem: { water: '1d10' },
            enemy: { water: '3d10', skillWater: 1, int: '1d5', atkCold: '2d10' },
            affix: [
                { name: { a: 'of Chill', b: '寒気の' }, rarity: 0 },
                { name: { a: 'of Snowflake', b: '雪片の' }, rarity: 5 },
                { name: { a: 'of Frost', b: '霜の' }, rarity: 10 },
                { name: { a: 'of Icicle', b: '氷柱の' }, rarity: 15 },
                { name: { a: 'of Icing', b: '氷結の' }, rarity: 20 },
                { name: { a: 'of Freezing', b: '凍結の' }, rarity: 25 },
                { name: { a: 'of Iceberg', b: '氷山の' }, rarity: 30 },
                { name: { a: 'of Avalanche', b: '雪崩の' }, rarity: 35 },
                { name: { a: 'of Permafrost', b: '永久凍土の' }, rarity: 40 },
                { name: { a: 'of Cocytus', b: 'コキュートスの' }, rarity: 50 },
                { name: { a: 'of Viviane', b: '湖の女王ヴィヴィアンの' }, rarity: 80 },
                { name: { a: 'of Oceanus', b: '海神オケアノスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_LIGHTNING, {
            name: { a: 'Lightning', b: '稲妻の' },
            color: colorList.lightning,
            lvl: 10,
            rarity: 30,
            melee: { dmgLightning: '2d10' },
            missile: { dmgLightning: '2d10' },
            staff: { skillAir: 1 },
            shield: { air: '3d10' },
            armor: { air: '2d10' },
            cloak: { air: '2d10' },
            belt: { air: '2d10' },
            helm: { air: '2d10' },
            gloves: { air: '2d10' },
            boots: { air: '2d10' },
            amulet: { skillAir: 1 },
            ring: { skillAir: 1 },
            light: { air: '2d10' },
            gem: { air: '1d10' },
            enemy: { air: '3d10', skillAir: 1, dex: '1d5', dmgLightning: '2d10' },
            affix: [
                { name: { a: 'of Sky', b: '天空の' }, rarity: 0 },
                { name: { a: 'of Electricity', b: '電気の' }, rarity: 5 },
                { name: { a: 'of Charge', b: '帯電の' }, rarity: 10 },
                { name: { a: 'of Discharge', b: '放電の' }, rarity: 15 },
                { name: { a: 'of Spark', b: '煌きの' }, rarity: 20 },
                { name: { a: 'of Potential', b: '電位の' }, rarity: 25 },
                { name: { a: 'of Voltage', b: '電圧の' }, rarity: 30 },
                { name: { a: 'of Power', b: '電力の' }, rarity: 35 },
                { name: { a: 'of Thunder', b: '雷鳴の' }, rarity: 40 },
                { name: { a: 'of Thunderbolt', b: '雷電の' }, rarity: 45 },
                { name: { a: 'of Thunderstroke', b: '雷撃の' }, rarity: 50 },
                { name: { a: 'of Storm', b: '嵐の' }, rarity: 55 },
                { name: { a: 'of Uranus', b: '天の神ウラノスの' }, rarity: 90 },
                { name: { a: 'of Zeus', b: 'オリュンポスの主神ゼウスの' }, rarity: 95 },
            ]
		}],
		
        [BIAS_GRAVITY, {
            name: { a: 'Gravity', b: '重力の' },
            color: colorList.gravity,
            lvl: 10,
            rarity: 30,
            melee: { atkSlow: '2d10' },
            missile: { atkSlow: '2d10' },
            staff: { skillEarth: 1 },
            shield: { earth: '3d10' },
            armor: { earth: '2d10' },
            cloak: { earth: '2d10' },
            belt: { earth: '2d10' },
            helm: { earth: '2d10' },
            gloves: { earth: '2d10' },
            boots: { earth: '2d10' },
            amulet: { skillEarth: 1 },
            ring: { skillEarth: 1 },
            light: { earth: '2d10' },
            gem: { earth: '1d10' },
            enemy: { earth: '3d10', skillEarth: 1, con: '1d5', atkSlow: '2d10' },
            affix: [
                { name: { a: 'of Star', b: '星の' }, rarity: 0 },
                { name: { a: 'of Asteroid', b: '小惑星の' }, rarity: 5 },
                { name: { a: 'of Planet', b: '惑星の' }, rarity: 10 },
                { name: { a: 'of Cosmos', b: '宇宙の' }, rarity: 15 },
                { name: { a: 'of Galaxy', b: '銀河の' }, rarity: 20 },
                { name: { a: 'of Stardust', b: '星屑の' }, rarity: 25 },
                { name: { a: 'of Celestial', b: '天上の' }, rarity: 30 },
                { name: { a: 'of Mass', b: '大塊の' }, rarity: 40 },
                { name: { a: 'of Astraeus', b: '星神アストライオスの' }, rarity: 70 },
                { name: { a: 'of Selene', b: '月の女神セレネの' }, rarity: 80 },
                { name: { a: 'of Chronos', b: '時の神クロノスの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_INFECTION, {
            name: { a: 'Infection', b: '感染の' },
            color: colorList.infection,
            lvl: 10,
            rarity: 30,
            melee: { atkInf: '1d10', dmgPoison: '1d10' },
            missile: { atkInf: '1d10', dmgPoison: '1d10' },
            staff: { skillPoison: 1 },
            shield: { poison: '3d10' },
            armor: { poison: '2d10' },
            cloak: { poison: '2d10' },
            belt: { poison: '2d10' },
            helm: { poison: '2d10' },
            gloves: { poison: '2d10' },
            boots: { poison: '2d10' },
            amulet: { skillPoison: 1 },
            ring: { skillPoison: 1 },
            light: { poison: '2d10' },
            gem: { poison: '1d10' },
            enemy: { poison: '3d10', skillPoison: 1, atkInf: '1d10', dmgPoison: '1d10' },
            affix: [
                { name: { a: 'of Disease', b: '疾患の' }, rarity: 0 },
                { name: { a: 'of Bacteria', b: '細菌の' }, rarity: 5 },
                { name: { a: 'of Fungus', b: '真菌の' }, rarity: 10 },
                { name: { a: 'of Virus', b: 'ウイルス性の' }, rarity: 15 },
                { name: { a: 'of Contagion', b: '伝染の' }, rarity: 20 },
                { name: { a: 'of Epidemic', b: '疫病の' }, rarity: 25 },
                { name: { a: 'of Plague', b: '悪疫の' }, rarity: 30 },
                { name: { a: 'of Alecto', b: 'アレクトの' }, rarity: 70 },
                { name: { a: 'of Tisiphone', b: 'ティシポネの' }, rarity: 80 },
                { name: { a: 'of Megaera', b: 'メガイラの' }, rarity: 90 },
            ]
		}],
		
        [BIAS_SAND, {
            name: { a: 'Sand', b: '砂の' },
            color: colorList.sand,
            lvl: 20,
            rarity: 50,
            melee: { atkBlind: '2d10' },
            missile: { atkBlind: '2d10' },
            staff: { earth: '1d10', air: '1d10' },
            shield: { earth: '2d10', air: '2d10' },
            armor: { earth: '1d10', air: '1d10' },
            cloak: { earth: '1d10', air: '1d10' },
            belt: { earth: '1d10', air: '1d10' },
            helm: { earth: '1d10', air: '1d10' },
            gloves: { earth: '1d10', air: '1d10' },
            boots: { earth: '1d10', air: '1d10' },
            amulet: { earth: '1d10', air: '1d10' },
            ring: { earth: '1d10', air: '1d10' },
            light: { earth: '1d10', air: '1d10' },
            gem: { earth: '1d5', air: '1d5' },
            enemy: { earth: '2d10', air: '2d10', con: '1d5', dex: '1d5', atkBlind: '2d10' },
            affix: [
                { name: { a: 'of Drying', b: '乾燥の' }, rarity: 0 },
                { name: { a: 'of Dust', b: '砂塵の' }, rarity: 5 },
                { name: { a: 'of Barren', b: '不毛の' }, rarity: 10 },
                { name: { a: 'of Desert', b: '砂漠の' }, rarity: 15 },
                { name: { a: 'of Ruin', b: '荒廃の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_BLIZZARD, {
            name: { a: 'Blizzard', b: '吹雪の' },
            color: colorList.blizzard,
            lvl: 20,
            rarity: 50,
            melee: { atkCold: '1d10', dmgLightning: '1d10' },
            missile: { atkCold: '1d10', dmgLightning: '1d10' },
            staff: { water: '1d10', air: '1d10' },
            shield: { water: '2d10', air: '2d10' },
            armor: { water: '1d10', air: '1d10' },
            cloak: { water: '1d10', air: '1d10' },
            belt: { water: '1d10', air: '1d10' },
            helm: { water: '1d10', air: '1d10' },
            gloves: { water: '1d10', air: '1d10' },
            boots: { water: '1d10', air: '1d10' },
            amulet: { water: '1d10', air: '1d10' },
            ring: { water: '1d10', air: '1d10' },
            light: { water: '1d10', air: '1d10' },
            gem: { water: '1d5', air: '1d5' },
            enemy: { water: '2d10', air: '2d10', int: '1d5', dex: '1d5', atkCold: '1d10', dmgLightning: '1d10'},
            affix: [
                { name: { a: 'of Snow', b: '雪の' }, rarity: 0 },
                { name: { a: 'of Sleet', b: '霙の' }, rarity: 5 },
                { name: { a: 'of Graupel', b: '霰の' }, rarity: 10 },
                { name: { a: 'of Hail', b: '雹の' }, rarity: 15 },
                { name: { a: 'of Glacier', b: '氷河の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_ACID, {
            name: { a: 'Acid', b: '酸の' },
            color: colorList.acid,
            lvl: 20,
            rarity: 50,
            melee: { dmgAcid: '2d10' },
            missile: { dmgAcid: '2d10' },
            staff: { water: '1d10', poison: '1d10' },
            shield: { water: '2d10', poison: '2d10' },
            armor: { water: '1d10', poison: '1d10' },
            cloak: { water: '1d10', poison: '1d10' },
            belt: { water: '1d10', poison: '1d10' },
            helm: { water: '1d10', poison: '1d10' },
            gloves: { water: '1d10', poison: '1d10' },
            boots: { water: '1d10', poison: '1d10' },
            amulet: { water: '1d10', poison: '1d10' },
            ring: { water: '1d10', poison: '1d10' },
            light: { water: '1d10', poison: '1d10' },
            gem: { water: '1d5', poison: '1d5' },
            enemy: { water: '2d10', poison: '2d10', int: '1d5', dmgAcid: '2d10' },
            affix: [
                { name: { a: 'of Rust', b: '錆の' }, rarity: 30 },
                { name: { a: 'of Melting', b: '溶解の' }, rarity: 5 },
                { name: { a: 'of Dissolving', b: '分解の' }, rarity: 10 },
                { name: { a: 'of Corrosion', b: '腐食の' }, rarity: 15 },
                { name: { a: 'of Erosion', b: '浸食の' }, rarity: 20 },
            ]
		}],
		
        [BIAS_MAGMA, {
            name: { a: 'Magma', b: '溶岩の' },
            color: colorList.magma,
            lvl: 20,
            rarity: 50,
            melee: { dmgFire: '1d10', atkSlow: '1d10' },
            missile: { dmgFire: '1d10', atkSlow: '1d10' },
            staff: { fire: '1d10', earth: '1d10' },
            shield: { fire: '2d10', earth: '2d10' },
            armor: { fire: '1d10', earth: '1d10' },
            cloak: { fire: '1d10', earth: '1d10' },
            belt: { fire: '1d10', earth: '1d10' },
            helm: { fire: '1d10', earth: '1d10' },
            gloves: { fire: '1d10', earth: '1d10' },
            boots: { fire: '1d10', earth: '1d10' },
            amulet: { fire: '1d10', earth: '1d10' },
            ring: { fire: '1d10', earth: '1d10' },
            light: { fire: '1d10', earth: '1d10' },
            gem: { fire: '1d5', earth: '1d5' },
            enemy: { fire: '2d10', earth: '2d10', str: '1d5', con: '1d5', dmgFire: '1d10', atkSlow: '1d10' },
            affix: [
                { name: { a: 'of Smoke', b: '煙の' }, rarity: 0 },
                { name: { a: 'of Ash', b: '灰の' }, rarity: 5 },
                { name: { a: 'of Fissure', b: '亀裂の' }, rarity: 10 },
                { name: { a: 'of Lava', b: '溶岩の' }, rarity: 15 },
                { name: { a: 'of Volcano', b: '火山の' }, rarity: 20 },
                { name: { a: 'of Eruption', b: '噴火の' }, rarity: 25 },
                { name: { a: 'of Mereor', b: '流星の' }, rarity: 35 }, //
            ]
		}],
		
        [BIAS_RADIATION, {
            name: { a: 'Radioactive', b: '放射能の' },
            color: colorList.radiation,
            lvl: 20,
            rarity: 50,
            melee: { atkRadi: '2d10' },
            missile: { atkRadi: '2d10' },
            staff: { fire: '1d10', poison: '1d10' },
            shield: { fire: '2d10', poison: '2d10' },
            armor: { fire: '1d10', poison: '1d10' },
            cloak: { fire: '1d10', poison: '1d10' },
            belt: { fire: '1d10', poison: '1d10' },
            helm: { fire: '1d10', poison: '1d10' },
            gloves: { fire: '1d10', poison: '1d10' },
            boots: { fire: '1d10', poison: '1d10' },
            amulet: { fire: '1d10', poison: '1d10' },
            ring: { fire: '1d10', poison: '1d10' },
            light: { fire: '1d10', poison: '1d10' },
            gem: { fire: '1d5', poison: '1d5' },
            enemy: { fire: '2d10', poison: '2d10', str: '1d5', atkRadi: '2d10' },
            affix: [
                { name: { a: 'of Decay', b: '崩壊の' }, rarity: 0 },
                { name: { a: 'of Contamination', b: '汚染の' }, rarity: 5 },
                { name: { a: 'of Nucleus', b: '核の' }, rarity: 10 },
                { name: { a: 'of Fission', b: '分裂の' }, rarity: 15 },
                { name: { a: 'of Fusion', b: '融合の' }, rarity: 20 },
                { name: { a: 'of Catastrophe', b: '大惨事の' }, rarity: 25 },
            ]
        }],
	]),

	suffix: [
        {
            name: { a: 'of Digging', b: '採掘' },
            lvl: 1,
            rarity: 0,
            melee: { digging: '3d10' }
		},
		
        {
            name: { a: 'of Killer to Animal', b: '動物殺し' },
            lvl: 1,
            rarity: 0,
            melee: { dmgAnimal: '3d10' },
            missile: { dmgAnimal: '3d10' },
            gloves: { dmgAnimal: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Human', b: '人間殺し' },
            lvl: 5,
            rarity: 0,
            melee: { dmgHuman: '3d10' },
            missile: { dmgHuman: '3d10' },
            gloves: { dmgHuman: '2d10' },
            enemy: { dmgHuman: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Undead', b: '不死殺し' },
            lvl: 10,
            rarity: 0,
            melee: { dmgUndead: '3d10' },
            missile: { dmgUndead: '3d10' },
            gloves: { dmgUndead: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Dragon', b: '竜殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgDragon: '3d10' },
            missile: { dmgDragon: '3d10' },
            gloves: { dmgDragon: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Giant', b: '巨人殺し' },
            lvl: 15,
            rarity: 0,
            melee: { dmgGiant: '3d10' },
            missile: { dmgGiant: '3d10' },
            gloves: { dmgGiant: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Demon', b: '悪魔殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgDemon: '3d10' },
            missile: { dmgDemon: '3d10' },
            gloves: { dmgDemon: '2d10' }
		},
		
        {
            name: { a: 'of Killer to Spirit', b: '精霊殺し' },
            lvl: 20,
            rarity: 0,
            melee: { dmgSpirit: '3d10' },
            missile: { dmgSpirit: '3d10' },
            gloves: { dmgSpirit: '2d10' }
		},
		
        {
            name: { a: 'of Killer to God', b: '神殺し' },
            lvl: 25,
            rarity: 0,
            melee: { dmgGod: '3d10' },
            missile: { dmgGod: '3d10' },
            gloves: { dmgGod: '2d10' }
		},
		
        {
            name: { a: 'of Multi Color', b: '万色' },
            lvl: 25,
            rarity: 50,
            shield: { resistAll: '2d10' },
            amulet: { resistAll: '1d10' },
            ring: { resistAll: '1d10' },
            enemy: { resistAll: '2d10' }
		},
		
        {
            name: { a: 'of All Aound', b: '万能' },
            lvl: 20,
            rarity: 80,
            melee: { skillAll: 1 },
            missile: { skillAll: 1 },
            staff: { skillAll: 1 },
            amulet: { skillAll: 1 },
            ring: { skillAll: 1 },
            enemy: { skillAll: 1 }
		},
		
        {
            name: { a: 'of Strength', b: '筋力' },
            lvl: 1,
            rarity: 0,
            melee: { str: '1d5' },
            gloves: { str: '1d5' },
            ring: { str: '1d5' },
            enemy: { str: '1d5' }
		},
		
        {
            name: { a: 'of Dexterity', b: '器用さ' },
            lvl: 1,
            rarity: 0,
            missile: { dex: '1d5' },
            boots: { dex: '1d5' },
            ring: { dex: '1d5' },
            enemy: { dex: '1d5' }
		},
		
        {
            name: { a: 'of Constitution', b: '耐久力' },
            lvl: 1,
            rarity: 0,
            armor: { con: '1d5' },
            belt: { con: '1d5' },
            amulet: { con: '1d5' },
            enemy: { con: '1d5' }
		},
		
        {
            name: { a: 'of Intelligence', b: '知力' },
            lvl: 1,
            rarity: 0,
            staff: { int: '1d5' },
            helm: { int: '1d5' },
            amulet: { int: '1d5' },
            enemy: { int: '1d5' }
		},
		
        {
            name: { a: 'of Speed', b: '速度' },
            lvl: 10,
            rarity: 30,
            cloak: { spd: '2d10' },
            amulet: { spd: '1d10' },
            ring: { spd: '1d10' },
            gem: { spd: '1d5' },
            enemy: { spd: '2d10' }
		},
		
        {
            name: { a: 'of Magic Finding', b: '魔法具探求' },
            lvl: 1,
            rarity: 30,
            light: { mf: '3d10' },
            amulet: { mf: '2d10' },
            ring: { mf: '2d10' },
            gem: { mf: '1d10' },
            enemy: { mf: '3d10' }
		},
		
        {
            name: { a: 'of Gold Finding', b: '財宝探求' },
            lvl: 1,
            rarity: 0,
            light: { gf: '4d10' },
            amulet: { gf: '3d10' },
            ring: { gf: '3d10' },
            gem: { gf: '2d10' },
            enemy: { gf: '4d10' }
		},
		
        {
            name: { a: 'of Life', b: '生命力' },
            lvl: 1,
            rarity: 0,
            shield: { hp: '2d10' },
            armor: { hp: '3d10' },
            belt: { hp: '2d10' },
            gem: { hp: '1d10' },
            enemy: { hp: '3d10' }
		},
		
        {
            name: { a: 'of Mana', b: '魔力' },
            lvl: 1,
            rarity: 0,
            staff: { mp: '1d10' },
            armor: { mp: '2d10' },
            helm: { mp: '1d10' },
            gem: { mp: '1d5' },
            enemy: { mp: '2d10' }
		},
		
        {
            name: { a: 'of Life Regeneration', b: '回復力' },
            lvl: 5,
            rarity: 50,
            shield: { hpReg: '1d10' },
            light: { hpReg: '1d10' },
            belt: { hpReg: '2d10' },
            amulet: { hpReg: '1d10' },
            ring: { hpReg: '1d10' },
            gem: { hpReg: '1d5' },
            enemy: { hpReg: '2d10' }
		},
		
        {
            name: { a: 'of Mana Regeneration', b: '魔力回復' },
            lvl: 5,
            rarity: 50,
            staff: { mpReg: '1d10' },
            light: { mpReg: '1d10' },
            belt: { mpReg: '2d10' },
            amulet: { mpReg: '1d10' },
            ring: { mpReg: '1d10' },
            gem: { mpReg: '1d5' },
            enemy: { mpReg: '2d10' }
		},
		
        {
            name: { a: 'of Attack Speed', b: '攻撃速度' },
            lvl: 10,
            rarity: 20,
            melee: { ias: '2d10' },
            missile: { ias: '2d10' },
            gloves: { ias: '2d10' },
            ring: { ias: '2d10' },
            gem: { ias: '1d10' },
            enemy: { ias: '2d10' }
		},
		
        {
            name: { a: 'of Faster Cast', b: '詠唱速度' },
            lvl: 10,
            rarity: 20,
            staff: { fcr: '2d10' },
            helm: { fcr: '2d10' },
            amulet: { fcr: '2d10' },
            gem: { fcr: '1d10' },
            enemy: { fcr: '2d10' }
		},
		
        {
            name: { a: 'of Faster Run Walk', b: '早足' },
            lvl: 10,
            rarity: 20,
            boots: { frw: '2d10' },
            gem: { frw: '1d5' },
            enemy: { frw: '2d10' }
		},
		
        {
            name: { a: 'of Minimum Damage', b: '最小ダメージ' },
            lvl: 10,
            rarity: 0,
            melee: { dmgMinBonus: '1d5' },
            missile: { dmgMinBonus: '1d5' },
            enemy: { dmgMinBonus: '1d5' }
		},
		
        {
            name: { a: 'of Maximum Damage', b: '最大ダメージ' },
            lvl: 5,
            rarity: 0,
            melee: { dmgMaxBonus: '1d10' },
            missile: { dmgMaxBonus: '1d10' },
            enemy: { dmgMaxBonus: '1d10' }
		},
		
        {
            name: { a: 'of Life Steal', b: '生命力吸収' },
            lvl: 5,
            rarity: 20,
            melee: { stealLife: '1d3' },
            missile: { stealLife: '1d3' },
            gloves: { stealLife: '1d3' },
            ring: { stealLife: '1d3' },
            gem: { stealLife: 1 },
            enemy: { stealLife: '1d3' }
		},
		
        {
            name: { a: 'of Mana Steal', b: '魔力吸収' },
            lvl: 5,
            rarity: 20,
            melee: { stealMana: '1d3' },
            missile: { stealMana: '1d3' },
            gloves: { stealMana: '1d3' },
            ring: { stealMana: '1d3' },
            gem: { stealMana: 1 },
            enemy: { stealMana: '1d3' }
		},
		
        {
            name: { a: 'of Damage', b: 'ダメージ' },
            lvl: 1,
            rarity: 0,
            melee: { dmgBonus: '3d10' },
            missile: { dmgBonus: '2d10' },
            gloves: { dmgBonus: '2d10' },
            ring: { dmgBonus: '2d10' },
            gem: { dmgBonus: '1d10' },
            enemy: { dmgBonus: '2d10' }
		},
		
        {
            name: { a: 'of Accuracy', b: '精度' },
            lvl: 1,
            rarity: 0,
            melee: { rateBonus: '2d10' },
            missile: { rateBonus: '3d10' },
            gloves: { rateBonus: '2d10' },
            ring: { rateBonus: '2d10' },
            light: { rateBonus: '2d10' },
            gem: { rateBonus: '1d10' },
            enemy: { rateBonus: '2d10' }
		},
		
        {
            name: { a: 'of Protection', b: '守り' },
            lvl: 1,
            rarity: 0,
            staff: { acBonus: '2d10' },
            shield: { acBonus: '3d10' },
            armor: { acBonus: '2d10' },
            cloak: { acBonus: '2d10' },
            belt: { acBonus: '2d10' },
            helm: { acBonus: '2d10' },
            gloves: { acBonus: '2d10' },
            boots: { acBonus: '2d10' },
            amulet: { acBonus: '2d10' },
            gem: { acBonus: '1d10' },
            enemy: { acBonus: '2d10' }
		},
		
        {
            name: { a: 'of Experience', b: '経験' },
            lvl: 15,
            rarity: 50,
            amulet: { expBonus: '1d10' },
            ring: { expBonus: '1d10' },
            gem: { expBonus: '1d5' },
		},
		
        {
            name: { a: 'of Stealth', b: '隠密' },
            lvl: 1,
            rarity: 0,
            staff: { stealth: '2d10' },
            cloak: { stealth: '3d10' },
            boots: { stealth: '2d10' },
            amulet: { stealth: '2d10' },
            ring: { stealth: '2d10' },
            gem: { stealth: '1d10' },
            enemy: { stealth: '3d10' }
		},
		
        {
            name: { a: 'of Detection', b: '探知' },
            lvl: 1,
            rarity: 0,
            staff: { searching: '2d10' },
            helm: { searching: '2d10' },
            amulet: { searching: '2d10' },
            ring: { searching: '2d10' },
            light: { searching: '3d10' },
            gem: { searching: '1d10' },
            enemy: { searching: '3d10' }
		},
		
        {
            name: { a: 'of Slow Digestion', b: '遅消化' },
            lvl: 1,
            rarity: 0,
            staff: { digest: '2d10' },
            armor: { digest: '2d10' },
            belt: { digest: '3d10' },
            amulet: { digest: '2d10' },
            ring: { digest: '2d10' },
            gem: { digest: '1d10' },
		},
		
        {
            name: { a: 'of Illumination', b: 'イルミネーション' },
            lvl: 1,
            rarity: 0,
            light: { lighten: 1 }
		},
		
        {
            name: { a: 'High Capasity', b: '大容量' },
            lvl: 1,
            rarity: 50,
            belt: { numBoxes: 1 },
            light: { fuelBonus: '4d10' },
		},
		
        {
            name: { a: 'of Sustain Strength', b: '筋力維持' },
            lvl: 1,
            rarity: 0,
            gloves: { strSus: true },
            ring: { strSus: true },
		},
		
        {
            name: { a: 'of Sustain Dexterity', b: '器用さ維持' },
            lvl: 1,
            rarity: 0,
            boots: { dexSus: true },
            ring: { dexSus: true },
		},
		
        {
            name: { a: 'of Sustain Constitution', b: '耐久力維持' },
            lvl: 1,
            rarity: 0,
            belt: { conSus: true },
            amulet: { conSus: true },
		},
		
        {
            name: { a: 'of Sustain Intelligence', b: '知力維持' },
            lvl: 1,
            rarity: 0,
            helm: { intSus: true },
            amulet: { intSus: true },
		},
		
        {
            name: { a: 'of Levitation', b: '浮遊' },
            lvl: 1,
            rarity: 80,
            // cloak: { levi: true },
            // boots: { levi: true },
            // amulet: { levi: true },
            ring: { levi: true },
            // enemy: { levi: true }
		},
		
        {
            name: { a: 'of Aggravation', b: '憤怒' },
            lvl: 5,
            rarity: 50,
            melee: { aggravating: true, cursed: true },
            missile: { aggravating: true, cursed: true },
            staff: { aggravating: true, cursed: true },
            shield: { aggravating: true, cursed: true },
            armor: { aggravating: true, cursed: true },
            cloak: { aggravating: true, cursed: true },
            belt: { aggravating: true, cursed: true },
            helm: { aggravating: true, cursed: true },
            gloves: { aggravating: true, cursed: true },
            boots: { aggravating: true, cursed: true },
            amulet: { aggravating: true, cursed: true },
            ring: { aggravating: true, cursed: true },
            light: { aggravating: true, cursed: true },
            enemy: { aggravating: true, cursed: true }
		},
		
        {
            name: { a: 'of Teleportation', b: 'テレポート' },
            lvl: 5,
            rarity: 50,
            melee: { teleported: true, cursed: true },
            missile: { teleported: true, cursed: true },
            staff: { teleported: true, cursed: true },
            shield: { teleported: true, cursed: true },
            armor: { teleported: true, cursed: true },
            cloak: { teleported: true, cursed: true },
            belt: { teleported: true, cursed: true },
            helm: { teleported: true, cursed: true },
            gloves: { teleported: true, cursed: true },
            boots: { teleported: true, cursed: true },
            amulet: { teleported: true, cursed: true },
            ring: { teleported: true, cursed: true },
            light: { teleported: true, cursed: true },
            enemy: { teleported: true, cursed: true }
		},
		
        {
            name: { a: 'of Indestructible', b: '破壊不能' },
            lvl: 30,
            rarity: 80,
            indestructible: true,
            melee: { indestructible: true },
            missile: { indestructible: true },
            staff: { indestructible: true },
            shield: { indestructible: true },
            armor: { indestructible: true },
            cloak: { indestructible: true },
            belt: { indestructible: true },
            helm: { indestructible: true },
            gloves: { indestructible: true },
            boots: { indestructible: true },
            amulet: { indestructible: true },
            ring: { indestructible: true },
            light: { indestructible: true },
            enemy: { indestructible: true }
		},
		
        {
            name: { a: 'of Durability', b: '耐久度' },
            lvl: 1,
            rarity: 0,
            melee: { durabBonus: '2d10' },
            missile: { durabBonus: '2d10' },
            staff: { durabBonus: '2d10' },
            shield: { durabBonus: '2d10' },
            armor: { durabBonus: '2d10' },
            cloak: { durabBonus: '2d10' },
            belt: { durabBonus: '2d10' },
            helm: { durabBonus: '2d10' },
            gloves: { durabBonus: '2d10' },
            boots: { durabBonus: '2d10' },
            amulet: { durabBonus: '2d10' },
            ring: { durabBonus: '2d10' },
            gem: { durabBonus: '1d10' },
            light: { durabBonus: '2d10' }
        },
		
        {
            name: { a: 'of Art', b: '技巧' },
            lvl: 10,
            rarity: 40,
            melee: { embeddedBonus: 1 },
            missile: { embeddedBonus: 1 },
            staff: { embeddedBonus: 1 },
            shield: { embeddedBonus: 1 },
            armor: { embeddedBonus: 1 },
            cloak: { embeddedBonus: 1 },
            belt: { embeddedBonus: 1 },
            helm: { embeddedBonus: 1 },
            gloves: { embeddedBonus: 1 },
            boots: { embeddedBonus: 1 },
            amulet: { embeddedBonus: 1 },
            ring: { embeddedBonus: 1 },
            light: { embeddedBonus: 1 }
        },
    ],

    restrict: {
        str: 20,
        dex: 20,
        con: 20,
        int: 20,
        skillFire: 20,
        skillWater: 20,
        skillAir: 20,
        skillEarth: 20,
        skillPoison: 20,
        skillAll: 50,
        numBoxes: 50,
        lighten: 50,
    }
};

{
    if (MAX_BIAS_NUMS < modTab.prefix.size) throw new Error('Incorrect bias numbers');
    for (let biasList of modTab.prefix.values()) {
        for (let key in biasList.affix) {
            let affix = biasList.affix[key];
            let rarity = affix.rarity;
            let lvl = Math.floor(rarity / 2 - 20);
            if (lvl <= 0) lvl = 1;
            affix.lvl = lvl;
            affix.min = rarity >= 50 ? Math.ceil((rarity - 50) / 10) + 2 : 1;
        }
    }
}

const modBiasNums = enums(1, MAX_BIAS_NUMS);
const modSufNums = enums(0, modTab.suffix.length - 1);
const modAffNumsMap = (() => {
    let nums = new Map();
    for (let [bias, pre] of modTab.prefix.entries()) {
		nums.set(bias, enums(0, pre.affix.length - 1));
	}

    return nums;
})();
