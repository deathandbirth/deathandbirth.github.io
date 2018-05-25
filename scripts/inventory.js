const inventory = {
    shadow(direction) {
        let ctxInv = display.ctxes.inv;
        ctxInv.save();
        ctxInv.shadowColor = colorList.clear
        ctxInv.globalAlpha = 0.9;
        ctxInv.fillStyle = colorList.black;
        let offsetY = MS - 0.5;
        if (direction === LEFT || direction === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}

		if (direction === RIGHT || direction === MIDDLE) {
            display.rect({
                ctx: ctxInv,
                x: 0,
                xPx: display.width /2,
                y :offsetY,
                widthPx: display.width / 2,
                height: -offsetY - SS,
                heightPx: display.height,
            });
		}
		
		ctxInv.restore();
	},
	
    clear() {
        display.clearOne(display.ctxes.inv);
	},
	
    show(list, direction, a, place, enter) {
        if (flag.shop) {
            var quantity2 = !rogue.cn ? 1 : Number(rogue.cn);
            if (a && quantity2 > list[a].quantity) quantity2 = list[a].quantity;
        } else if (place === P_STASH) {
			var l = (enter.page - 1) * MAX_PACK_COUNT;
		}

        this.shadow(direction);
        let i = 1.5;
        let j = MS + 1;
        let right = direction === RIGHT ? display.width / 2 : 0;
        let count = 0;
        let weight = 0.0;
        let ctxInv = display.ctxes.inv;
        for (let key in list) {
            let item = list[key];
            if (!flag.pack && !item ||
                place === P_STASH && key < l ||
                flag.stash && a !== undefined && key != a ||
                flag.equip && !item.equipable ||
                flag.quaff && item.type != 'potion' ||
                flag.read && item.type != 'scroll' && !item.chargeBook ||
                flag.identify && item.identified && key !== a ||
                (flag.repair || flag.blacksmith) && (!item.equipable || item.durab === item.durabMax) ||
                flag.zap && item.type != 'wand' ||
                flag.eat && item.type != 'food' ||
                flag.gain && (item.type != 'book' || !item.skill) ||
                flag.destroy && flag.number && key !== a ||
                (flag.shop || flag.option) && a && key !== a ||
                flag.fuel && (item.type !== 'light' && item.type !== 'oil' ||
                    rogue.equipment['light'].torch & !item.torch ||
                    !rogue.equipment['light'].torch && item.torch)
            ) {
				continue;
			}

            ctxInv.save();
            ctxInv.textAlign = 'center';
            let char;
            if (place === P_STASH) {
                char = EA[key - l].toUpperCase();
			} else {
				char = direction === RIGHT ? key : key.toUpperCase();
			}

            display.text({
                ctx: ctxInv,
                msg: char,
                x: i,
                y: j,
                xPx: right,
            });

            if (flag.pack && !item || flag.option || flag.cure) {
                if (!flag.pack) {
                    ctxInv.textAlign = 'left';
                    display.text({
                        ctx: ctxInv,
                        msg: item[option.getLanguage()],
                        x: i + 1,
                        y: j,
                        limit: 14,
                        xPx: right,
                    });

                    ctxInv.textAlign = 'right';
                    if (flag.cure) {
                        let cost = enter.list[key].cost;
                        display.text({
                            ctx: ctxInv,
                            msg: `$${cost}`,
                            x: i + 22.5,
                            y: j,
                            xPx: right,
                        });
                    } else if (!flag.option2) {
                        let msg = '';
                        let opt = option[item['key']];
                        if (opt.choise) {
                            msg = opt.choise[opt.user][option.getLanguage()];
						} else if (option.isEnglish()) {
                            msg = opt.user ? 'yes' : 'no';
						} else {
							msg = opt.user ? 'はい' : 'いいえ';
						}

                        display.text({
                            ctx: ctxInv,
                            msg: msg,
                            x: i + 22.5,
                            y: j,
                            xPx: right,
                        });
                    }
				}
				
                j++;
                ctxInv.restore();
                continue;
			}
			
            ctxInv.fillStyle = item.color;
            if (item.shadow) ctxInv.shadowColor = item.shadow;
            display.text({
                ctx: ctxInv,
                msg: item.symbol,
                x: i + 1,
                y: j,
                xPx: right,
                stroke: item.stroke,
            });

            if (item.cursed && item.identified) {
                ctxInv.fillStyle = colorList.red;
			} else if (item.equipable && !item.durab) {
                ctxInv.fillStyle = colorList.gray;
			} else {
				ctxInv.fillStyle = colorList.white;
			}

            ctxInv.textAlign = 'left';
            let name = item.getName(false, item.quantity, option.getLanguage(), flag.gamble && place === P_SHOP);
            display.text({
                ctx: ctxInv,
                msg: name,
                x: i + 1.5,
                y: j,
                limit: 15,
                xPx: right,
                stroke: item.stroke,
            });

            ctxInv.fillStyle = colorList.white;
            ctxInv.shadowColor = colorList.clear;
            ctxInv.textAlign = 'right';
            if (flag.shop || flag.blacksmith) {
                let price = flag.shop ? item.price * quantity2 : item.getDurabPrice();
                display.text({
                    ctx: ctxInv,
                    msg: `$${price}`,
                    x: i + 20.3,
                    y: j,
                    limit: 3.5,
                    xPx: right,
                });
			}
			
            let quantity;
            if (place === P_SHOP || flag.shop && flag.number) {
                quantity = quantity2;
			} else {
                quantity = item.quantity;
                weight += item.weight * quantity;
			}
			
            display.text({
                ctx: ctxInv,
                msg: (item.weight * quantity).toFixed(1),
                x: i + 22.5,
                y: j++,
                xPx: right,
            });

            ctxInv.restore();
            if (++count === MAX_PACK_COUNT) break;
		}
		
        if (flag.option || flag.cure) return;
        let maxNum = this.getMaxNumber(place);
        if (place === P_STASH) {
            let lenStash = enter.list.length;
            count += (enter.page - 1) * MAX_PACK_COUNT;
            if (count > lenStash) count = lenStash;
        }

        display.text({
            ctx: ctxInv,
            msg: `[${count}/${maxNum}]`,
            x: i,
            y: -SS - 1,
            xPx: right,
            yPx: display.height,
        });

        ctxInv.save();
        ctxInv.textAlign = 'right';
        let msg = '';
        if (place === P_SHOP) {
            let weight = option.isEnglish() ? 'Weight' : '重量';
            msg = `${weight} x${quantity2}`;
        } else if (place === P_STASH) {
            msg = ` [${enter.page}/${MAX_STASH_PAGE}]`;
		} else {
            if (flag.gain) {
                let skillPoints = option.isEnglish() ? 'Skill Points' : 'スキルポイント';
                msg = `${skillPoints} ${rogue.skillPoints} `;
			}
			
            let total = option.isEnglish() ? 'Total' : '計';
            msg += `${total} ${weight.toFixed(1)}kg`;
		}
		
        if (flag.shop) {
            let sellOrCost;
            if (direction === RIGHT) {
                sellOrCost = option.isEnglish() ? 'Sell Value' : '売値';
			} else {
				sellOrCost = option.isEnglish() ? 'Cost' : '買値';
			}

            msg = `${sellOrCost} x${quantity2} ${msg}`;
		}
		
        display.text({
            ctx: ctxInv,
            msg: msg,
            x: i + 22.5,
            y: -SS - 1,
            xPx: right,
            yPx: display.height,
        });

        ctxInv.restore();
	},
	
    getMaxNumber(place) {
        let maxNum;
        switch (place) {
            case P_PACK:
            case P_FLOOR:
            case P_SHOP:
                maxNum = MAX_PACK_COUNT;
                break;
            case P_BOX:
                maxNum = rogue.numBoxes < MAX_BOX_NUM ? rogue.numBoxes : MAX_BOX_NUM;
                break;
            case P_CUBE:
                maxNum = MAX_CUBE_COUNT;
                break;
            case P_STASH:
                maxNum = MAX_STASH_COUNT;
                break;
		}
		
        return maxNum;
	},
	
    sort(a, list, array) {
        let found = false;
        let item = list[a];
        let index = IT.indexOf(list[a].type);
        for (let key in list) {
            let item2 = list[key];
            let index2 = IT.indexOf(item2.type);
            if (!found && index2 < index) continue;
            if (key >= a) break;
            found = true;
            if (!item.identified) {
                if (index2 === index) continue;
            } else {
                if (item2.identified && item2.tabId <= item.tabId && index2 === index) {
                    if (!(item2.charges >= 0) || item2.tabId !== item.tabId || item2.charges > item.charges) continue;
                }
			}
			
            if (array) {
                let temp = item;
                list.splice(a, 1);
                list.splice(key, 0, temp);
                return key;
            } else {
                let i = EA.indexOf(a);
                let j = EA.indexOf(key);
                for (let k = i; k > j; k--) {
					[list[EA[k]], list[EA[k - 1]]] = [list[EA[k - 1]], list[EA[k]]];
				}
				
                return;
            }
		}
		
        return a; //stash page
    }
}
