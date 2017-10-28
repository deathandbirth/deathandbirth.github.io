document.onkeyup = function(e) {
    if (e.keyCode === 16) isShift = false; //Shift
    if (e.keyCode === 17) isCtrl = false; //Ctrl
}

document.onkeydown = function(e) {
    if (flag.wait) {
        if (!flag.died) queue.moveAll();
        return false;
	}
	
    if (e.keyCode === 16) isShift = true; //Shift
    if (e.keyCode === 17) isCtrl = true; //Ctrl
    if ((flag.dash || flag.rest) && e.keyCode !== 16) {
        message.draw(message.get(M_INTERRUPTED));
        flag.dash = flag.rest = false;
        return false;
    }

    if (flag.equipment || flag.inventory) inventory.clear();
    if (e.keyCode !== 16 && e.keyCode !== 17) {
        if (flag.clearInv) {
            inventory.clear();
            flag.clearInv = false;
        }
	}
	
    if (e.keyCode === 27 || e.keyCode === 32) message.clear();
    if (flag.regular) {
        switch (e.keyCode) {
            case 72: //h
            case 74: //j
            case 75: //k
            case 76: //l
            case 89: //y
            case 66: //b
            case 85: //u
            case 78: //n
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
                if (e.altKey) {
                    rogue.attackStationary(e.keyCode);
				} else if (!isShift) {
                    rogue.move(e.keyCode);
                } else {
					rogue.dash(e.keyCode);
				}

                break;
            case 79: //o openDoor
            case 87: //w equip
                if (!isShift && !isCtrl) rogue.eventFlag(e.keyCode);
                break;
            case 65: //a add bookmark, A alchemy ^a *create monster*
                if (!isShift && !isCtrl || isShift && !isCtrl || isCtrl && wizard) rogue.eventFlag(e.keyCode);
                break;
            case 90: //z zap, ^z *indestructible*
                if (isCtrl && wizard) {
                    rogue.indestructible = !rogue.indestructible;
				} else {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 68: //d drop, ^d destroy, 
                if (!isShift) rogue.eventFlag(e.keyCode);
                break;
            case 83: //s searching, S swap, ^s 
                if (!isShift && !isCtrl) {
                    rogue.searchHiddenObject();
				} else if (!isCtrl) {
                    rogue.swap();
                } else if (isCtrl) {
					data.save();
				}

                break;
            case 69: //e equipmentList, E eat, ^e *enlightenment*
                if (isCtrl && wizard) {
                    map.lighten();
                    map.draw(rogue.x, rogue.y);
                } else if (isShift) {
                    rogue.eventFlag(e.keyCode);
				} else {
					flag.equipment = !flag.equipment;
				}

                break;
            case 73: //i inventory, I investigate, ^i *create item*
                if (!isCtrl && !isShift) {
                    flag.inventory = !flag.inventory;
				} else if (!isCtrl || wizard) {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 84: //t ,T unequip
                rogue.eventFlag(e.keyCode);
                break;
            case 190: //. stap on, > down stairs
            case 110: //T.
                if (e.keyCode === 110 || !isShift) {
                    if (!coords[rogue.x][rogue.y].getInfor(true)) rogue.done = true;
                } else {
					rogue.downOrUpStairs(e.keyCode);
				}

                break;
            case 188: //<
                if (isShift) rogue.downOrUpStairs(e.keyCode);
                break;
            case 70: //f fire, F fuel
                rogue.eventFlag(e.keyCode);
                break;
            case 71: //g
                if (isShift) {
                    rogue.eventFlag(e.keyCode);
				} else {
					rogue.grabItem();
				}

                break;
            case 81: //q quaff, Q quit, ^q *create trap*
                if (isCtrl && wizard) {
                    rogue.haveCast(CREATE_TRAP, 10, this);
                    map.draw(rogue.x, rogue.y);
                } else if (!isCtrl && isShift) {
                    rogue.eventFlag(e.keyCode);
				} else if (!isCtrl && !isShift) {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 77: //m skill, M minimap
                if (!isCtrl) rogue.eventFlag(e.keyCode);
                break;
            case 82: //r read,^r redraw
                if (isCtrl && !isShift) {
                    map.redraw(rogue.x, rogue.y);
                    map.draw(rogue.x, rogue.y);
                } else if (isShift) {
                    flag.rest = true;
                    rogue.rest();
                } else {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 191: //? help
                if (isShift) rogue.eventFlag(e.keyCode);
                break;
            case 80: //p pack sort, ^p previous message
                if (!isShift) rogue.eventFlag(e.keyCode);
                break;
            case 67: //c close door, C character description
                if (isShift) {
                    rogue.investigate(MIDDLE, true);
                    flag.clearInv = true;
                } else {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 88: //x examine, ^x exit 
                if (isCtrl && !isShift) {
                    data.exit();
				} else if (!isCtrl && !isShift) {
					rogue.eventFlag(e.keyCode);
				}

                break;
            case 187: //= option
            case 189: //JIS keyboard
                rogue.eventFlag(e.keyCode);
            case 49: //1~9
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                rogue.useBoxItem(e.keyCode);
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
                rogue.castBookmarkedSkill(e.keyCode);
                break;
            case 86: //^v version
                if (isCtrl) message.draw(`Death and Birth ver ${VERSION}`);
                break;
        }
    } else if (!flag.died && !flag.retry && (e.keyCode === 27 || (!flag.create && e.keyCode == 32) || (flag.message && e.keyCode === 80 && isCtrl))) { //ESC,  Space, ^p
        rogue.cancelCommand();
    } else if (flag.number) {
        rogue.inputNumber(e.keyCode);
    } else if (flag.openDoor || flag.closeDoor) {
        rogue.openOrCloseDoor(e.keyCode);
    } else if (flag.investigate) {
        rogue.investigateOne(e.keyCode);
    } else if (flag.drop) {
        rogue.drop(e.keyCode);
    } else if (flag.destroy) {
        rogue.destroy(e.keyCode);
    } else if (flag.equip) {
        rogue.equip(e.keyCode);
    } else if (flag.unequip) {
        rogue.unequip(e.keyCode);
    } else if (flag.eat) {
        rogue.eat(e.keyCode);
    } else if (flag.quaff) {
        rogue.quaffPotion(e.keyCode);
    } else if (flag.read) {
        rogue.read(e.keyCode);
    } else if (flag.synthesize) {
        rogue.synthesize(e.keyCode);
    } else if (flag.grab) {
        rogue.grabItem(e.keyCode);
    } else if (flag.examine) {
        rogue.examine(e.keyCode);
    } else if (flag.identify) {
        rogue.identify(e.keyCode);
    } else if (flag.repair || flag.blacksmith) {
        rogue.repair(e.keyCode);
    } else if (flag.disint) {
        rogue.disintegrate(e.keyCode);
    } else if (flag.aim) {
        rogue.aim({ keyCode: e.keyCode });
    } else if (flag.zap) {
        rogue.zap(e.keyCode);
    } else if (flag.throw) {
        rogue.throw(e.keyCode);
    } else if (flag.skill) {
        rogue.castSkill(e.keyCode);
    } else if (flag.sortSkill) {
        rogue.sortSkill(e.keyCode);
    } else if (flag.message) {
        message.previous(e.keyCode);
    } else if (flag.pack) {
        rogue.packOrUnpack(e.keyCode);
    } else if (flag.bookmark) {
        rogue.addOrRemoveBookmark(e.keyCode);
    } else if (flag.gain) {
        rogue.gainStatOrSkill(e.keyCode);
    } else if (flag.fuel) {
        rogue.fuel(e.keyCode);
    } else if (flag.shop) {
        rogue.shop(e.keyCode);
    } else if (flag.cure) {
        rogue.cureShop(e.keyCode);
    } else if (flag.stash) {
        rogue.stash(e.keyCode);
    } else if (flag.help && e.keyCode === 191 && isShift) { //?
        inventory.clear();
        flag.help = false;
        flag.regular = true;
    } else if (flag.create) {
        creation.input(e.keyCode);
    } else if (flag.minimap) {
        minimap.draw(e.keyCode);
    } else if (flag.option) {
        option.main(e.keyCode);
    } else if (flag.quit) {
        game.quit(e.keyCode);
    }

    if (flag.died) {
        if (data.failed) {
            if (e.keyCode === 89 && isShift) { //Y
                game.start();
                data.failed = false;
                data.delete(data.name);
                message.draw(option.isEnglish() ?
                    'Deleted the data' :
                    'データ消去しました')
            }
        } else if (e.keyCode === 13) { //Enter
            if (wizard && rogue) {
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
            queue.moveAll();
		}
		
        if (flag.equipment) {
            if (flag.regular && e.keyCode !== 27 && e.keyCode !== 32 && !flag.clearInv) { //Esc, Back space
                rogue.equipmentList();
			} else {
				flag.equipment = false;
			}
		}

        if (flag.inventory) {
            if (flag.regular && e.keyCode !== 27 && e.keyCode !== 32 && !flag.clearInv) {
                rogue.showInventory(P_PACK);
			} else {
				flag.inventory = false;
			}
        }
	}
	
    //^m
	if (e.keyCode === 77 && isCtrl) audio.mute();
	
    //disable browser shortcuts
    if (!isShift || !isCtrl || e.keyCode !== 73) return false;
}
