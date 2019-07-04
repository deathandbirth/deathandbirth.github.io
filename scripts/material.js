const Material = class extends Thing {
    constructor(obj) {
        super(obj);
        this.symbolReal = this.symbol;
        if (!this.colorReal) this.colorReal = this.color;
        if (!this.shadow) this.shadow = 0;
        if (!this.shadowReal) this.shadowReal = this.shadow;
        this.stroke = 0;
        this.strokeReal = 0;
    }

    static evalMod(mod, mf, shop) {
        if (mod === MAGIC) {
            mf /= 1;
        } else if (mod === RARE) {
            mf /= 4;
        } else if (mod === UNIQUE) {
            mf /= 10;
        }

        let perc = 5;
        if (!shop) perc += mf;
        if (perc > 95) perc = 95;
        return evalPercentage(perc);
    }

    getVolumeBase() {
        let rate;
        switch (this.type) {
            case 'enemy':
            case 'armor':
                rate = 1;
                break;
            case 'shield':
                rate = 0.5;
                break;
            case 'helm':
            case 'boots':
                rate = 0.4;
                break;
            case 'gloves':
            case 'melee':
            case 'missile':
            case 'staff':
                rate = 0.3;
                break;
            case 'light':
                rate = 0.2;
                break;
            case 'cloak':
            case 'belt':
                rate = 0.1;
                break;
            case 'amulet':
                rate = 0.02;
            case 'ring':
                rate = 0.01;
                break;
		}
		
        return rate * 10;
    }

    getTRateBase() {
        let rate;
        switch (this.type) {
            case 'shield':
                rate = 1;
                break;
            case 'armor':
                rate = .8;
                break;
            case 'cloak':
                rate = .7;
                break;
            case 'gloves':
                rate = .6;
                break;
            case 'enemy':
            case 'helm':
                rate = .5;
                break;
            case 'boots':
                rate = .4;
                break;
            case 'belt':
                rate = .3;
                break;
		}
		
        return rate;
    }

    getBaseandWeight(mat) {
        let char = this.type === 'enemy';
        let volume = this.getVolumeBase() * this.volumeRate;
        this.weight = Math.ceil(volume / 10 * mat.density * 100) / 100;
        let durabRate = 1;
        if (this.weapon || char) {
            let dmgBase = mat.hardness * this.volumeRate;
            if (this.edge === 1) {
                dmgBase *= 1.1;
                durabRate *= 3 / 4;
            }

            if (this.atkType === AT_B) durabRate *= 5 / 4;
            if (this.type === 'staff') dmgBase *= .5;
            this.dmgBase = Math.ceil(dmgBase);
            if (char) this.dmgBare = this.dmgBase;
		}
        
        if (this.armor || char) {
            let acTRateBase = this.getTRateBase();
            if (!this.acTRate) this.acTRate = 1;
            let acSBase = volume * mat.hardness;
            let acBBase = volume * mat.toughness;
            let acTBase = volume * mat.tBase * acTRateBase * this.acTRate;
            this.acSBase = this.getAcVar(acSBase, AT_S);
            this.acBBase = this.getAcVar(acBBase, AT_B);
            this.acTBase = this.getAcVar(acTBase, AT_T);
            this.acAvg = Math.ceil((this.acSBase + this.acBBase + this.acTBase) / 3);
		}
        
        if (!char) this.durabRate = durabRate;
    }

    getAcVar(ac, type) {
        if (!ac) return 0;
        let varRate;
        if (type === AT_S) {
            varRate = 10;
        } else if (type === AT_T) {
            varRate = 15;
        } else if (type === AT_B) {
            varRate = 5;
        }

        let acVar = Math.ceil(ac * varRate / 100);
        acVar = rndIntBet(-acVar, acVar);
        let func = acVar ? Math.ceil : Math.floor;
        ac = func(ac + acVar);
        if (ac < 1) ac = 1;
        return ac;
    }

    getMaterialBase() {
        let i = 0;
        let list = [...materialList];
        list.shuffle();
        while (!(this.material & list[i])) i++;
        return list[i];
    }

    getMaterial(matBase, matId) {
        let lvl = this.lvl;
        if (!matBase) matBase = this.getMaterialBase();
        this.material = matBase;
        let materials = materialMap.get(matBase);
        let list = materials.list;
        let mat;
        if (!(matId >= 0)) {
            let nums = materials.nums;
            nums.shuffle();
            let i = 0;
            do { 
                matId = nums[i++];
                mat = list.get(matId);
            } while (mat.lvl > lvl || evalPercentage(mat.rarity))

		} else {
            mat = list.get(matId);
        }
        
        this.matId = matId;
        this.priceRate = mat.priceRate;
        if (this.type !== 'enemy' && this.embeddedLimit > mat.embeddedNum) this.embeddedLimit = mat.embeddedNum;
        if (mat.values) {
            mergeMod({
                obj: this,
                obj2: mat.values,
                perc: 0,
                max: 1,
                min: 1,
            });
		}
		
        let [nameA, nameB] = [mat.name['a'], mat.name['b']];
        if (matBase === M_GEM) this.bias = mat.bias;
        if (matBase === M_BONE && this.type === 'enemy') {
            nameA = nameA.replace(/bone$/i, '');
            nameB = nameB.replace(/ボーン$|骨$/, '');
        } else {
            nameB += 'の';
        }

        if (nameA && nameB) {
            if (this.type === 'enemy') {
                this.name['a'] = nameA + ' ' + this.name['a'];
                this.name['b'] = nameB + this.name['b'];
            } else {
                this.nameReal['a'] = nameA + ' ' + this.nameReal['a'];
                this.nameReal['b'] = nameB + this.nameReal['b'];
                if (this.mod === UNIQUE) this.getUniqueName();
            }
		}
		
        this.color = this.colorReal = mat.color;
        this.getBaseandWeight(mat);
    }

    getMagic(bias) {
        let lvl = this.lvl;
        let char = this.type === 'enemy';
        let pre, suf;
        if (bias !== RANDOM) {
            pre = modTab.prefix.get(bias);
		} else if (coinToss()) {
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++];
                pre = modTab.prefix.get(bias);
            } while (!pre[this.type] || pre.lvl > lvl ||
				evalPercentage(pre.rarity)
			);
		}
		
        if (!pre || coinToss()) {
            let i = 0;
            modSufNums.shuffle();
            do {
                suf = modTab.suffix[modSufNums[i++]];
            } while (!suf[this.type] || suf.lvl > lvl ||
                evalPercentage(suf.rarity) ||
				suf.indestructible && char && evalPercentage(99)
			);
		}
		
        let perc = Math.ceil(lvl + MAGIC_RARITY);
        let max = Math.floor(lvl / 10) + 1;
        let color;
        let namePreA = '';
        let namePreB = '';
        let mods = {};
        if (pre) {
            mergeMod({
                obj: mods,
                obj2: pre[this.type],
                perc: perc,
                max: max,
			});
            
            color = pre.color;
            if (!(this.material & M_GEM)) {
                namePreA = pre.name['a'];
                namePreB = pre.name['b'];
            }
		}
		
        let nameSufA = '';
        let nameSufB = '';
        if (suf) {
            mergeMod({
                obj: mods,
                obj2: suf[this.type],
                perc: perc,
                max: max,
			});
			
            nameSufA = suf.name['a'];
            nameSufB = suf.name['b'];
        }
        
        if (namePreA) namePreA = `<${namePreA}> `;
        if (namePreB) namePreB = `<${namePreB}>`;
        if (nameSufA) nameSufA = ` <${nameSufA}>`;
        if (nameSufB) nameSufB = `<${nameSufB}>`;
		
        if (char) {
            if (color) this.color = color;
            this.name['a'] = `${namePreA}${this.name['a']}${nameSufA}`;
            this.name['b'] = `${namePreB}${this.name['b']}${nameSufB}`;
            this.getOrLooseStats(mods, true, true);
            if (pre) this.getBias(bias);
        } else {
            if (color) this.colorMod = color;
            this.nameReal['a'] = `${namePreA}${this.nameReal['a']}${nameSufA}`;
            this.nameReal['b'] = `${namePreB}${this.nameReal['b']}${nameSufB}`;
            mergeMod({
                obj: this,
                obj2: mods,
                fixed: true,
            });
		}
		
        this.modList = mods;
        this.mod = MAGIC;
        this.shadow = this.shadowReal = colorList.aqua;
    }

    getRare(bias) {
        let lvl = this.lvl;
        let char = this.type === 'enemy';
        let pre;
        if (bias === RANDOM) {
            let i = 0;
            modBiasNums.shuffle();
            do {
                bias = modBiasNums[i++];
                pre = modTab.prefix.get(bias);
            } while (!pre[this.type] || pre.lvl > lvl ||
				evalPercentage(pre.rarity)
			);
        } else {
			pre = modTab.prefix.get(bias);
		}

        let affix;
        let j = 0;
        let affNums = modAffNumsMap.get(bias);
        affNums.shuffle();
        do {
            affix = pre.affix[affNums[j++]];
		} while (affix.lvl > lvl || evalPercentage(affix.rarity));
		
        let perc = Math.ceil(lvl + affix.rarity);
        let max = Math.floor(lvl / 10) + 1;
        let min = affix.min;
        if (min > max) min = max;
        let mods = {};
        mergeMod({
            obj: mods,
            obj2: pre[this.type],
            perc: perc,
            max: max,
		});
		
        let suf;
        let i = 0;
        let count = 0;
        let perc2 = perc;
        modSufNums.shuffle();
        do {
            suf = modTab.suffix[modSufNums[i++]];
            if (suf[this.type] && suf.lvl <= lvl &&
                !evalPercentage(suf.rarity) &&
                !(suf.indestructible && char && evalPercentage(99))) {
                mergeMod({
                    obj: mods,
                    obj2: suf[this.type],
                    perc: perc,
                    max: max,
                    min: min,
				});
				
                if (++count >= RARE_MOD_NUM) {
                    if (count >= min || !evalPercentage(perc2)) {
                        break;
					} else {
						perc2 /= 2;
					}
                }
            }
		} while (modSufNums[i] !== undefined);
		
        this.mod = RARE;
        this.shadow = this.shadowReal = colorList.yellow;
        let nameAffiA = ` <${affix.name['a']}>`;
        let nameAffiB = `<${affix.name['b']}>`;
        if (char) {
            if (affix.color) this.color = affix.color;
            this.name['a'] = `${this.name['a']}${nameAffiA}`;
            this.name['b'] = `${nameAffiB}${this.name['b']}`;
            this.getOrLooseStats(mods, true, true);
            this.getBias(bias);
        } else {
            if (affix.color) this.colorMod = affix.color;
            this.nameReal['a'] = `${this.nameReal['a']}${nameAffiA}`;
            this.nameReal['b'] = `${nameAffiB}${this.nameReal['b']}`;
            mergeMod({
                obj: this,
                obj2: mods,
                fixed: true,
            });
		}
		
        this.modList = mods;
    }

    getUnique(unique) {
        this.shadow = this.shadowReal = colorList.gold;
        this.stroke = this.strokeReal = colorList.gold;
        if (this.type === 'enemy') {
            rogue.cue[this.name[ENG]] = true;
        } else {
            mergeMod({
                obj: this,
                obj2: unique.values,
                fixed: true,
			});
            
            let names = unique.name; 
            this.nameUnique = { a: names['a'], b: names['b'], pre: names.pre };
            this.mod = UNIQUE;
            this.modList = {};
            copyObj(this.modList, unique.values);
        }
    }

    getUniqueName(names, halluc) {
        if (!names) names = this.nameUnique;
        let [nameA, nameB] = [names['a'], names['b']];
        let [namePreB, nameSufB] = names.pre ? [`<${nameB}の>`, ''] : ['', `<${nameB}>`];
        let name = halluc ? this.name : this.nameReal;
        name['a'] = `${name['a']} <of ${nameA}>`;
        name['b'] = `${namePreB}${name['b']}${nameSufB}`;
    }

    makeMaterial(char) {
        if (!this.modList) this.modList = {};
        for (let key in this.modList) {
            if (this.modList[key] === DEFAULT) {
                delete this.modList[key];
                continue;
			}
			
            let num = this.modList[key];
            this.modList[key] = rndIntBet(1, num);
		}
		
        let material = this.getMaterialBase();
        let matBaseList = materialMap.get(material); 
        if (matBaseList.bonus || material === M_GEM) {
            let values;
            if (material === M_GEM) {
                if (this.matId === undefined) return;
                values = matBaseList.list.get(this.matId).values;
            } else {
                values = matBaseList.bonus;
            }

            mergeMod({
                obj: this.modList,
                obj2: values,
                perc: 0,
                max: 1,
                min: 1,
            });
        }

        if (!Object.keys(this.modList).length) return;
        let item = {};
        copyObj(item, this.modList);
        if (char) {
            item.modList = {};
            copyObj(item.modList, this.modList);
            item.desc = {
                a: ``,
                b: `埋め込み可能な${matBaseList.name['b']}の装備品に合成すると属性値が付与される。`    
            };
        } else {
            item.modParts = {};
            item.modParts[this.type] = {};
            copyObj(item.modParts[this.type], this.modList);
            let type = translation.item[this.type];
            item.desc = {
                a: ``,
                b: `埋め込み可能な${matBaseList.name['b']}の${type}に合成すると属性値が付与される。`    
            };
        }

        item.name = {};
        item.nameReal = {};
        copyObj(item.name, this.name);
        copyObj(item.nameReal, this.name);
        item.color = item.colorReal = this.colorReal;
        item.shadow = item.shadowReal = this.shadowReal;
        item.stroke = item.strokeReal = this.strokeReal;
        item.lvl = this.lvl;
        item.mod = this.mod;
        item.rarity = this.rarity;
        item.material = material;
        item.identified = false;
        item.quantity = 1;
        item.type = 'material';
        item.tabId = materialList.indexOf(material);
        item.weight = WEIGHT[item.type];
        item.priceRate = materialMap.get(material).pRate;
        item.__proto__ = Item.prototype;
        item.symbolReal = item.symbol = char ? '\'' : '`';
        item.piece = !char || this.piece;
        item.calcPrice();
        if (char) {
            item.putDown(this.x, this.y, true);
        } else {
            return item;
        }
    }

}

const mergeMod = ({
    obj,
    obj2,
    perc,
    max,
    min,
    fixed,
    remove,
}) => {
    let count = 0;
    for (let key in obj2) {
        let mod = obj2[key];
        let value = 0;
        if (fixed || mod === true || mod === DEFAULT) {
            value = mod;
            if (remove) value = -value;
		} else {
            if (!count) {
                count++;
                let restrict = modTab.restrict[key] ? (1 - modTab.restrict[key] / 100) : 1;
                while (count < min || count < max && evalPercentage(perc * restrict)) {
                    count++;
                    perc /= 2;
                }
			}
			
            for (let i = 0; i < count; i++) {
				value += isFinite(mod) ? mod : minMax.dice(mod);
			}
		}
		
        obj[key] ? obj[key] += value : obj[key] = value;
	}
}
