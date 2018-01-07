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
        } else if (!flag.died && !flag.retry &&
            (keyCode === 27 ||
            (!flag.create && keyCode == 32) ||
            (flag.message && keyCode === 80 && this.isCtrl))) { //ESC,  Space, ^p
            rogue.cancelCommand();
        } else if (flag.number) {
            rogue.inputNumber(keyCode);
        } else if (flag.openDoor || flag.closeDoor) {
            rogue.openOrCloseDoor(keyCode);
        } else if (flag.investigate) {
            rogue.investigateOne(keyCode);
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
            message.previous(keyCode);
        } else if (flag.pack) {
            rogue.packOrUnpack(keyCode);
        } else if (flag.bookmark) {
            rogue.addOrRemoveBookmark(keyCode);
        } else if (flag.gain) {
            rogue.gainStatOrSkill(keyCode);
        } else if (flag.fuel) {
            rogue.fuel(keyCode);
        } else if (flag.shop) {
            rogue.shop(keyCode);
        } else if (flag.cure) {
            rogue.cureShop(keyCode);
        } else if (flag.stash) {
            rogue.stash(keyCode);
        } else if (flag.help && keyCode === 191 && this.isShift) { //?
            inventory.clear();
            flag.help = false;
            flag.regular = true;
        } else if (flag.create) {
            creation.input(keyCode);
        } else if (flag.minimap) {
            minimap.draw(keyCode);
        } else if (flag.option) {
            option.main(keyCode);
        } else if (flag.quit) {
            game.quit(keyCode);
        }

        if (flag.died) {
            if (data.failed) {
                if (keyCode === 89 && this.isShift) { //Y
                    game.start();
                    data.failed = false;
                    data.delete(data.name);
                    message.draw(option.isEnglish() ?
                        'Deleted the data' :
                        'データ消去しました')
                }
            } else if (keyCode === 13) { //Enter
                if (rogue && rogue.isWizard) {
                    rogue.revive();
                } else if (!flag.retry) {
                    game.over();
                } else {
                    data.load();
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
        
        //disable browser shortcuts
        if (!this.isShift || !this.isCtrl || keyCode !== 73) return false;
    },

    eventFlag(keyCode, isAlt) {
        switch (keyCode) {
            case 37: //left arrow
            case 38: //up arrow
            case 39: //right arrow
            case 40: //down arrow
            case 66: //b
            case 72: //h
            case 74: //j
            case 75: //k
            case 76: //l
            case 78: //n
            case 85: //u
            case 89: //y
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
                    flag.create = FIGHTER;
                    creation.input();
                    message.draw('Input type and tagId', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    if (!rogue.haveBook(undefined, true)) {
                        message.draw(message.get(M_DONT_HAVE_RECIPES));
                        break;
					}
					
                    flag.synthesize = true;
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_CUBE);
                    message.draw(message.get(M_SYNTHESIZE) + message.get(M_FLOOR), true);
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
                    rogue.investigate(MIDDLE, true);
                    flag.clearInv = true;
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
                    message.draw(message.get(M_DESTROY) + message.get(M_FLOOR), true);
                    flag.destroy = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    flag.regular = false;
                } else {
                    flag.drop = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_DROP), true);
                    flag.regular = false;
				}
				
                break;
            case 69: //e equipmentList, E eat, ^e *enlightenment*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    map.lighten();
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.eat = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_EAT) + message.get(M_FLOOR), true);
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
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_FUEL) + message.get(M_FLOOR), true);
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
                    rogue.showStats();
                    message.draw(message.get(M_GAIN), true);
                    flag.regular = false;
                } else {
                    rogue.grabItem();
                }

                break;
            case 73: //i inventory, I investigate, ^i *create item*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    flag.create = ITEM;
                    creation.input();
                    message.draw('Input type, tagId and quantity', true);
                    flag.regular = false;
                } else if (this.isShift) {
                    flag.investigate = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(message.get(M_INVESTIGATE) + message.get(M_FLOOR), true)
                    flag.regular = false;
                } else {
                    flag.inventory = !flag.inventory;
                }
				
                break;
            case 77: //m skill, M minimap
                if (this.isCtrl) break;
                if (this.isShift) {
                    minimap.draw(65);
                    message.draw(message.get(M_MINIMAP), true);
                    flag.minimap = true;
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
                    message.previous(72); //h
                    flag.message = true;
                    flag.regular = false;
                } else {
                    flag.pack = true;
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_BOX);
                    message.draw(message.get(M_PACK_OR_UNPACK) + message.get(M_FLOOR), true);
                    flag.regular = false;
				}
				
                break;
            case 81: //q quaff, Q quit, ^q *create trap*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.haveCast(CREATE_TRAP, 10);
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.quit = true;
                    message.draw(message.get(M_ASK_TO_QUIT));
                    message.draw(message.get(M_QUIT), true);
                    flag.regular = false;
                } else {
                    flag.quaff = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_QUAFF) + message.get(M_FLOOR), true);
                    flag.regular = false;
                }

                break;
            case 82: //r read, R rest, ^r redraw
                if (this.isCtrl) {
                    map.redraw(rogue.x, rogue.y);
                    map.draw(rogue.x, rogue.y);
                } else if (this.isShift) {
                    flag.rest = true;
                    rogue.rest();
                } else {
                    if (!rogue.canRead()) break;
                    flag.read = true;
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_READ) + message.get(M_FLOOR), true);
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
					
                    message.draw(message.get(M_TAKE_OFF), true);
                    rogue.equipmentList();
                    rogue.showInventory(P_PACK);
                    flag.unequip = true;
                    flag.regular = false;
                } else {
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_THROW) + message.get(M_FLOOR), true);
                    flag.throw = true;
                    flag.regular = false;
				}
				
                break;
            case 86: //^v version
                if (this.isShift) break;
                if (this.isCtrl) message.draw(`Death and Birth ver ${VERSION}`);
                break;
            case 87: //w equip
                if (this.isShift || this.isCtrl) break;
                flag.equip = true;
                rogue.showInventory(P_PACK);
                rogue.equipmentList();
                message.draw(message.get(M_EQUIP) + message.get(M_FLOOR), true);
                flag.regular = false;
                break;
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
                    cursol.init();
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
                    rogue.showInventory(P_PACK);
                    message.draw(message.get(M_ZAP) + message.get(M_FLOOR), true);
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
                if (this.isCtrl) break;
                flag.option = true;
                inventory.show(option.list, RIGHT);
                message.draw(message.get(M_OPTION), true);
                flag.regular = false;
                break;
            case 188: //<
                if (this.isCtrl) break;
                if (this.isShift) rogue.downOrUpStairs(keyCode);
                break;
            case 190: //. stap on, > down stairs
            case 110: //T. stap on
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
                    flag.help = true;
                    game.help.main();
                    flag.regular = false;
                }

                break;
		}
    }
}
