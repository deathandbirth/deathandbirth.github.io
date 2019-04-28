const input = {
    init() {
        document.onkeyup = this.onkeyup.bind(this);
        document.onkeydown = this.onkeydown.bind(this);
    },

    onkeyup(e) {
        let keyCode = e.keyCode;
        if (keyCode === 16) this.isShift = false;
        if (keyCode === 17) this.isCtrl = false;
    },

    onkeydown(e) {
        if (flag.wait) {
            if (!flag.died) map.queue.moveAll();
            return false;
        }
       
        let keyCode = e.keyCode;
        if (keyCode === 16) this.isShift = true;
        if (keyCode === 17) this.isCtrl = true;
        if ((flag.dash || flag.rest) && keyCode !== 16) {
            message.draw(message.get(M_INTERRUPTED));
            flag.dash = flag.rest = false;
            return false;
        }

        if (flag.equipment || flag.inventory) inventory.clear();
        if (keyCode !== 16 && keyCode !== 17) {
            if (flag.clearInv) {
                inventory.clear();
                flag.clearInv = false;
            }
        }
        
        if (keyCode === 27 || keyCode === 32) message.clear();
        if (flag.regular) {
            this.eventFlag(keyCode, e.altKey);
        } else if (!flag.died && !flag.retry && !flag.title && !flag.failed &&
            (keyCode === 27 || (!flag.create && keyCode == 32))) { //ESC,  Space
            rogue.cancelCommand();
        } else if (flag.number) {
            rogue.inputNumber(keyCode);
        } else if (flag.openDoor || flag.closeDoor) {
            rogue.openOrCloseDoor(keyCode);
        } else if (flag.investigate) {
            rogue.investigate(keyCode);
        } else if (flag.drop) {
            rogue.drop(keyCode);
        } else if (flag.destroy) {
            rogue.destroy(keyCode);
        } else if (flag.equip) {
            rogue.equip(keyCode);
        } else if (flag.unequip) {
            rogue.unequip(keyCode);
        } else if (flag.eat) {
            rogue.eat(keyCode);
        } else if (flag.quaff) {
            rogue.quaffPotion(keyCode);
        } else if (flag.read) {
            rogue.read(keyCode);
        } else if (flag.synthesize) {
            rogue.synthesize(keyCode);
        } else if (flag.grab) {
            rogue.grabItem(keyCode);
        } else if (flag.character) {
            investigation.scroll(keyCode);
        } else if (flag.examine) {
            rogue.examine(keyCode);
        } else if (flag.identify) {
            rogue.identify(keyCode);
        } else if (flag.repair || flag.blacksmith) {
            rogue.repair(keyCode);
        } else if (flag.disint) {
            rogue.disintegrate(keyCode);
        } else if (flag.aim) {
            rogue.aim({ keyCode: keyCode });
        } else if (flag.zap) {
            rogue.zap(keyCode);
        } else if (flag.throw) {
            rogue.throw(keyCode);
        } else if (flag.skill) {
            rogue.castSkill(keyCode);
        } else if (flag.sortSkill) {
            rogue.sortSkill(keyCode);
        } else if (flag.message) {
            message.scroll(keyCode);
        } else if (flag.pack) {
            rogue.packOrUnpack(keyCode);
        } else if (flag.bookmark) {
            rogue.addOrRemoveBookmark(keyCode);
        } else if (flag.gain) {
            rogue.gainStatOrSkill(keyCode);
        } else if (flag.fuel) {
            rogue.fuel(keyCode);
        } else if (flag.shop) {
            rogue.shop(keyCode, e.altKey);
        } else if (flag.cure) {
            rogue.cureShop(keyCode);
        } else if (flag.stash) {
            rogue.stash(keyCode, e.altKey);
        } else if (flag.help) {
            help.scroll(keyCode);
        } else if (flag.create) {
            creation.input(keyCode);
        } else if (flag.minimap) {
            map.drawMini(keyCode);
        } else if (flag.option) {
            option.main(keyCode);
        } else if (flag.quit) {
            game.quit(keyCode);
        }

        if (flag.failed) {
            if (keyCode === 89 && this.isShift) { //Y
                game.start();
                data.delete(data.name);
                message.draw(option.isEnglish() ?
                    'Deleted the data' :
                    'データ消去しました')
            }
        } else if (flag.died) {
            if (keyCode === 13) { //Enter
                if (flag.retry || flag.title) {
                    data.load();
                } else if (rogue && rogue.isWizard) {
                    rogue.revive();
                } else {
                    game.over();
                }
            }
        } else {
            if (rogue.done) {
                rogue.decreaseEnergy();
                map.queue.moveAll();
            }
            
            if (flag.equipment) {
                if (flag.regular && keyCode !== 27 && keyCode !== 32 && !flag.clearInv) { //Esc, Back space
                    rogue.equipmentList();
                } else {
                    flag.equipment = false;
                }
            }

            if (flag.inventory) {
                if (flag.regular && keyCode !== 27 && keyCode !== 32 && !flag.clearInv) {
                    rogue.showInventory(P_PACK);
                } else {
                    flag.inventory = false;
                }
            }
        }
        
        //^m
        if (keyCode === 77 && this.isCtrl) audio.mute();
        
        //dev tool shortcut
        if (this.isShift && this.isCtrl && keyCode === 73) {
            this.isShift = this.isCtrl = false;
        } else {

            //disable browser shortcuts
            return false;
        }
    },

    eventFlag(keyCode, isAlt) {
        switch (keyCode) {
            case 66: //b
            case 72: //h
            case 74: //j
            case 75: //k
            case 76: //l
            case 78: //n
            case 85: //u
            case 89: //y
                if (!option.rogueStyleMove.user) break;
            case 37: //left arrow
            case 38: //up arrow
            case 39: //right arrow
            case 40: //down arrow
            case 97: //T1
            case 98: //T2
            case 99: //T3
            case 100: //T4
            case 102: //T6
            case 103: //T7
            case 104: //T8
            case 105: //T9
                if (this.isCtrl) break;
                if (isAlt) {
                    rogue.attackStationary(keyCode);
                } else if (this.isShift) {
                    rogue.dash(keyCode);
                } else {
                    rogue.move(keyCode);
                }

                break;
            case 49: //1~9
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                if (this.isShift || this.isCtrl) break;
                rogue.useBoxItem(keyCode);
                break;
            case 65: //a add bookmark, A alchemy, ^a *create monster*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    flag.create = 'fighter';
                    creation.input();
                    message.draw('Input type and tagId', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    if (!Object.keys(rogue.recipes).length) {
                        message.draw(message.get(M_DONT_KNOW_RECIPE));
                        break;
                    }

                    flag.synthesize = true;
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_CUBE);
                    let msg = message.get(M_SYNTHESIZE) + message.get(M_FLOOR);
                    message.draw(msg, true);
                    flag.regular = false;
                } else {
                    rogue.showSkill(rogue.skill);
                    rogue.showSkill(rogue.bookmarks, true);
                    message.draw(message.get(M_BOOKMARK), true);
                    flag.bookmark = 1;
                    flag.regular = false;
				}
				
                break;
            case 67: //c close door, C character description
                if (this.isShift) {
                    flag.character = true;
                    investigation.main(rogue, MIDDLE, true);
                    Vue.nextTick(function(){
                        investigation.scroll(keyCode, true);
                    });

                    flag.regular = false;
                    break;
                }
            case 79: //o openDoor
                if (this.isShift || this.isCtrl) break;
                keyCode === 79 ? flag.openDoor = true : flag.closeDoor = true;
                if (rogue.searchDoor() <= 1) {
                    flag.openDoor = flag.closeDoor = false;
                    break;
				}
				
                message.draw(message.get(M_OPEN_OR_CLOSE), true);
                flag.regular = false;
                break;
            case 68: //d drop, ^d destroy, 
                if (this.isShift) break;
                if (this.isCtrl) {
                    let msg = message.get(M_DESTROY) + message.get(M_FLOOR);
                    message.draw(msg, true);
                    flag.destroy = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    flag.regular = false;
                } else {
                    flag.drop = true;
                    let msg = message.get(M_DROP);
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true);
                    flag.regular = false;
				}
				
                break;
            case 69: //e equipmentList, E eat, ^e *enlightenment*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    map.lighten();
                    map.draw();
                } else if (this.isShift) {
                    flag.eat = true;
                    let msg = message.get(M_EAT) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                    flag.regular = false;
                } else {
                    flag.equipment = !flag.equipment;
                }

                break;
            case 70: //f fire, F fuel
                if (this.isCtrl) break;
                if (this.isShift) {
                    if (!rogue.equipment['light']) {
                        message.draw(message.get(M_DONT_EQUIP_LIGHT));
                        break;
					}
					
                    flag.fuel = true;
                    let msg = message.get(M_FUEL) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true);
                    flag.regular = false;
                } else {
                    if (!rogue.haveMissile(true)) break;
                    rogue.ci = rogue.getAmmo(rogue.equipment['main'].throwType);
                    if (!rogue.ci) {
                        message.draw(message.get(M_DONT_HAVE_AMMO));
                        break;
					}
					
                    flag.arrow = true;
                    flag.aim = true;
                    message.draw(message.get(M_FIRE) + message.get(M_TO_EXAMINE), true);
                    rogue.examinePlot(true);
                    flag.regular = false;
				}
				
                break;
            case 71: //g grab, G gain
                if(this.isCtrl) break;
                if (this.isShift) {
                    flag.gain = 1;
                    rogue.showInventory(P_PACK);
                    inventory.showStats(rogue);
                    let msg = message.get(M_GAIN);
                    message.draw(msg, true);
                    flag.regular = false;
                } else {
                    rogue.grabItem();
                }

                break;
            case 73: //i inventory, I investigate, ^i *create item*
                if (this.isCtrl && this.isShift) break;
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    flag.create = 'item';
                    creation.input();
                    message.draw('Input type, tagId and quantity', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    flag.investigate = true;
                    let msg = message.get(M_INVESTIGATE) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true)
                    flag.regular = false;
                } else {
                    flag.inventory = !flag.inventory;
                }
				
                break;
            case 77: //m skill, M minimap
                if (this.isCtrl) break;
                if (this.isShift) {
                    flag.minimap = true;
                    map.drawMini(65); // a
                    message.draw(message.get(M_MINIMAP), true);
                    flag.regular = false;
                } else {
                    if (!rogue.checkToCast()) break;
                    flag.skill = true;
                    rogue.showSkill(rogue.skill);
                    message.draw(message.get(M_CAST), true);
                    flag.regular = false;
				}
				
                break;
            case 80: //p pack sort, ^p previous message
                if (this.isShift) break;
                if (this.isCtrl) {
                    flag.message = true;
                    Vue.nextTick(function(){
                        message.scroll(false, true);
                    });

                    flag.regular = false;
                } else {
                    flag.pack = true;
                    let msg = message.get(M_PACK_OR_UNPACK) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_BOX);
                    message.draw(msg, true);
                    flag.regular = false;
				}
				
                break;
            case 81: //q quaff, Q quit, ^q *create trap*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.haveCast(CREATE_TRAP, 10);
                    map.draw();
                } else if (this.isShift) {
                    flag.quit = true;
                    message.draw(message.get(M_ASK_TO_QUIT));
                    message.draw(message.get(M_QUIT), true);
                    flag.regular = false;
                } else {
                    flag.quaff = true;
                    let msg = message.get(M_QUAFF) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                    flag.regular = false;
                }

                break;
            case 82: //r read, R rest, ^r redraw
                if (this.isCtrl) {
                    map.redraw();
                } else if (this.isShift) {
                    flag.rest = true;
                    rogue.rest();
                } else {
                    if (!rogue.canRead()) break;
                    flag.read = true;
                    let msg = message.get(M_READ) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                    flag.regular = false;
                }

                break;
            case 83: //s searching, S swap, ^s save
                if (this.isCtrl) {
                    data.save();
                } else if (this.isShift) {
                    rogue.swap();
                } else {
                    rogue.searchHiddenObject();
                }

                break;
            case 84: //t throw, T unequip
                if (this.isCtrl) break;
                if (this.isShift) {
                    if (rogue.isNaked()) {
                        message.draw(message.get(M_DONT_HAVE_EQUIPMENT));
                        break;
					}
                    
                    let msg = message.get(M_TAKE_OFF);
                    message.draw(msg, true);
                    rogue.equipmentList();
                    rogue.showInventory(P_PACK);
                    flag.unequip = true;
                    flag.regular = false;
                } else {
                    let msg = message.get(M_THROW) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                    flag.throw = true;
                    flag.regular = false;
				}
				
                break;
            case 86: //^v version
                if (this.isShift) break;
                if (this.isCtrl) message.draw(`Death and Birth ver ${VERSION.toFixed(3)}`);
                break;
            case 87: { //w equip
                    if (this.isShift || this.isCtrl) break;
                    flag.equip = true;
                    let msg = message.get(M_EQUIP) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true);
                    flag.regular = false;
                    break;
            }
            case 88: //x examine, ^x exit 
                if (this.isShift) break;
                if (this.isCtrl) {
                    data.exit();
                } else {
                    if (rogue.blinded) {
                        message.draw(message.get(M_CANT_EXAMINE));
                        break;
                    }
                    
                    flag.examine = true;
                    cursor.init();
                    rogue.examine();
                    flag.regular = false;
                }

                break;
            case 90: //z zap, ^z *indestructible*
                if (this.isShift) break;
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.indestructible = !rogue.indestructible;
                } else {
                    flag.zap = true;
                    let msg = message.get(M_ZAP) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                    flag.regular = false;
                }

                break;
            case 112: //F1~F12
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
                if (this.isCtrl) break;
                rogue.castBookmarkedSkill(keyCode);
                break;
            case 187: //= option
            case 189: //JIS keyboard
            case 173: //firefox
                if (this.isCtrl) break;
                flag.option = true;
                inventory.show({
                    list: option.list,
                    dr: RIGHT,
                });

                message.draw(message.get(M_OPTION), true);
                flag.regular = false;
                break;
            case 188: //<
                if (this.isCtrl) break;
                if (this.isShift) rogue.downOrUpStairs(keyCode);
                break;
            case 190: //. step on, > down stairs
            case 110: //T. step on
                if (this.isCtrl) break;
                if (keyCode === 190 && this.isShift) {
                    rogue.downOrUpStairs(keyCode);
                } else if (!map.coords[rogue.x][rogue.y].getInfo(true)) {
                    rogue.done = true;
                }

                break;
            case 191: //? help
                if (this.isCtrl) break;
                if (this.isShift) {
                    flag.regular = false;
                    flag.help = true;
                    Vue.nextTick(function(){
                        help.scroll(false, true);
                    });
                }

                break;
		}
    },

    scroll(eleP, eleC, keyCode, init) {
        if (!init && keyCode === 67) { // c
            rogue.cancelCommand();
            return;
        }

        let scrollByX, scrollByY, left, down, up, right;
        if (init) {
            scrollByX = -eleP.scrollWidth;
            scrollByY = -eleP.scrollHeight;
        } else if (keyCode === 72 || keyCode === 37 | keyCode === 100) { // h, left arrow, T4
            left = true;
        } else if (keyCode === 74 || keyCode === 40 || keyCode === 98) { // j, down arrow, T2
            down = true;
        } else if (keyCode === 75 || keyCode === 38 || keyCode === 104) { // k, up arrow, T8
            up = true;
        } else if (keyCode === 76 || keyCode === 39 || keyCode === 102) { // l, right arrow, T6
            right = true;

        }

        if (up || down) {
            if (this.isCtrl) {
                scrollByY = eleP.scrollHeight;
            } else if (this.isShift) {
                scrollByY = eleP.getBoundingClientRect().height;
            } else if (eleC) {
                scrollByY = eleC.getBoundingClientRect().height;
            }

            if (up) scrollByY = -scrollByY;
        } else if (left || right) {
            if (this.isCtrl) {
                scrollByX = eleP.scrollWidth;
            } else if (this.isShift) {
                scrollByX = eleP.getBoundingClientRect().width;
            } else if (eleC) {
                scrollByX = eleC.getBoundingClientRect().width;
            }

            if (left) scrollByX = -scrollByX;
        }


        if (scrollByX !== undefined) eleP.scrollBy(scrollByX, 0);
        if (scrollByY !== undefined) eleP.scrollBy(0, scrollByY);
    }
}
