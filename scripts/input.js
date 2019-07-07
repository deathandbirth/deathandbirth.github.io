const input = {
    init() {
        document.onkeyup = this.onkeyup.bind(this);
        document.onkeydown = this.onkeydown.bind(this);
    },

    onkeyup(e) {
        let key = e.key;
        if (key === 'Shift') this.isShift = false;
        if (key === 'Control') this.isCtrl = false;
    },

    onkeydown(e) {
        let key = e.key;
        if (flag.wait) {
            if (!flag.died) map.queue.moveAll();
            return false;
        }
       
        if (key === 'Shift' || key === 'Control') {
            if (key === 'Shift') this.isShift = true;
            if (key === 'Control') this.isCtrl = true;
            return false;
        }

        if (flag.dash || flag.rest) {
            message.draw(message.get(M_INTERRUPTED));
            flag.dash = flag.rest = false;
            return false;
        }

        if (flag.clearInv) {
            inventory.clear();
            flag.clearInv = false;
        }
        
        if (/^Esc/.test(key) || !flag.create && /^\s$|Spacebar/.test(key)) {
            if (!flag.died && !flag.retry && !flag.title && !flag.failed) {
                message.clear();
                rogue.cancelCommand();
            }
        } else if (flag.regular) {
            this.eventFlag(key, e.altKey);
        } else if (flag.number) {
            rogue.inputNumber(key);
        } else if (flag.openDoor || flag.closeDoor) {
            rogue.openOrCloseDoor(key);
        } else if (flag.investigate) {
            rogue.investigate(key);
        } else if (flag.drop) {
            rogue.drop(key);
        } else if (flag.destroy) {
            rogue.destroy(key);
        } else if (flag.equip) {
            rogue.equip(key);
        } else if (flag.unequip) {
            rogue.unequip(key);
        } else if (flag.eat) {
            rogue.eat(key);
        } else if (flag.quaff) {
            rogue.quaffPotion(key);
        } else if (flag.read) {
            rogue.read(key);
        } else if (flag.synthesize) {
            rogue.synthesize(key);
        } else if (flag.grab) {
            rogue.grabItem(key);
        } else if (flag.character) {
            investigation.scroll(key);
        } else if (flag.examine) {
            rogue.examine(key);
        } else if (flag.identify) {
            rogue.identify(key);
        } else if (flag.repair || flag.blacksmith) {
            rogue.repair(key);
        } else if (flag.disint) {
            rogue.disintegrate(key);
        } else if (flag.aim) {
            rogue.aim({ key: key });
        } else if (flag.zap) {
            rogue.zap(key);
        } else if (flag.throw) {
            rogue.throw(key);
        } else if (flag.skill) {
            rogue.castSkill(key);
        } else if (flag.sortSkill) {
            rogue.sortSkill(key);
        } else if (flag.message) {
            message.scroll(key);
        } else if (flag.pack) {
            rogue.packOrUnpack(key);
        } else if (flag.bookmark) {
            rogue.addOrRemoveBookmark(key);
        } else if (flag.gain) {
            rogue.gainStatOrSkill(key);
        } else if (flag.fuel) {
            rogue.fuel(key);
        } else if (flag.shop) {
            rogue.shop(key, e.altKey);
        } else if (flag.cure) {
            rogue.cureShop(key);
        } else if (flag.stash) {
            rogue.stash(key, e.altKey);
        } else if (flag.help) {
            help.scroll(key);
        } else if (flag.create) {
            creation.input(key);
        } else if (flag.minimap) {
            map.drawMini(key);
        } else if (flag.option) {
            option.main(key);
        } else if (flag.quit) {
            game.quit(key);
        }

        if (flag.failed) {
            if (key === 'Y') {
                game.start();
                data.delete(data.name);
                message.draw(option.isEnglish() ?
                    'Deleted the data' :
                    'データ消去しました')
            }
        } else if (flag.died) {
            if (key === 'Enter') {
                if (flag.retry || flag.title) {
                    data.load();
                } else if (rogue && rogue.isWizard) {
                    rogue.revive();
                } else {
                    game.over();
                }
            }
        } else {
            if (flag.equipment) rogue.equipmentList();
            if (flag.inventory) rogue.showInventory(P_PACK);
            if (rogue.done) {
                rogue.decreaseEnergy();
                map.queue.moveAll();
            }
        }
        
        if (key === 'm' && this.isCtrl) audio.mute();
        
        //dev tool shortcut
        if (key === 'I' && this.isCtrl) {
            this.isShift = this.isCtrl = false;
        } else {

            //disable browser shortcuts
            return false;
        }
    },

    eventFlag(key, isAlt) {
        switch (key) {
            case 'b':
            case 'h':
            case 'j':
            case 'k':
            case 'l':
            case 'n':
            case 'u':
            case 'y':
            case 'B':
            case 'H':
            case 'J':
            case 'K':
            case 'L':
            case 'N':
            case 'U':
            case 'Y':
                if (!option.rogueStyleMove.user) break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'Left':
            case 'Up':
            case 'Right':
            case 'Down':
            case 'Home':
            case 'End':
            case 'PageUp':
            case 'PageDown':
                if (this.isCtrl) break;
                if (isAlt) {
                    rogue.attackStationary(key);
                } else if (this.isShift) {
                    rogue.dash(key);
                } else {
                    rogue.move(key);
                }

                break;
            case '1': //1~9
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (this.isCtrl) break;
                rogue.useBoxItem(key);
                break;
            case 'a': // add bookmark, *create monster*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    this.switchFlag();
                    flag.create = 'fighter';
                    creation.input();
                    message.draw('Input type and tabId', true);
                } else {
                    this.switchFlag();
                    rogue.showSkill(rogue.skill);
                    rogue.showSkill(rogue.bookmarks, true);
                    message.draw(message.get(M_BOOKMARK), true);
                    flag.bookmark = 1;
				}
				
                break;
            case 'A': { // alchemy
                if (!Object.keys(rogue.recipes).length) {
                    message.draw(message.get(M_DONT_KNOW_RECIPE));
                    break;
                }

                this.switchFlag();
                flag.synthesize = true;
                rogue.showInventory(P_PACK);
                rogue.showInventory(P_CUBE);
                let msg = message.get(M_SYNTHESIZE) + message.get(M_FLOOR);
                message.draw(msg, true);
                break
            }
            case 'c': // close door
            case 'o': // openDoor
                if (this.isCtrl) break;
                key === 'o' ? flag.openDoor = true : flag.closeDoor = true;
                if (rogue.searchDoor() <= 1) {
                    flag.openDoor = flag.closeDoor = false;
                    break;
				}
				
                this.switchFlag();
                message.draw(message.get(M_OPEN_OR_CLOSE), true);
                break;
            case 'C': // character description
                this.switchFlag();
                flag.character = true;
                investigation.main(rogue, MIDDLE, true);
                Vue.nextTick(function(){
                    investigation.scroll(key, true);
                });

                break;
            case 'd': // drop, destroy, 
                if (this.isCtrl) {
                    this.switchFlag();
                    let msg = message.get(M_DESTROY) + message.get(M_FLOOR);
                    message.draw(msg, true);
                    flag.destroy = true;
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                } else {
                    this.switchFlag();
                    flag.drop = true;
                    let msg = message.get(M_DROP);
                    rogue.showInventory(P_PACK);
                    rogue.equipmentList();
                    message.draw(msg, true);
				}
				
                break;
            case 'e': // equipmentList, *enlightenment*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    map.lighten();
                    map.draw();
                } else {
                    flag.equipment = !flag.equipment;
                    if (flag.equipment) {
                        rogue.equipmentList();
                    } else {
                        inventory.clear();
                        if (flag.inventory) rogue.showInventory(P_PACK);
                    }
                }

                break;
            case 'E': { // eat
                this.switchFlag();
                flag.eat = true;
                let msg = message.get(M_EAT) + message.get(M_FLOOR);
                rogue.showInventory(P_PACK);
                message.draw(msg, true);
                break
            }
            case 'f': // fire 
                if (this.isCtrl) break;
                if (!rogue.haveMissile(true)) break;
                rogue.ci = rogue.getAmmo(rogue.equipment['main'].throwType);
                if (!rogue.ci) {
                    message.draw(message.get(M_DONT_HAVE_AMMO));
                    break;
                }
                
                this.switchFlag();
                flag.arrow = true;
                flag.aim = true;
                message.draw(message.get(M_FIRE) + message.get(M_TO_EXAMINE), true);
                rogue.examinePlot(true);
                break;
            case 'F': { // fuel
                if (!rogue.equipment['light']) {
                    message.draw(message.get(M_DONT_EQUIP_LIGHT));
                    break;
                }
                
                this.switchFlag();
                flag.fuel = true;
                let msg = message.get(M_FUEL) + message.get(M_FLOOR);
                rogue.showInventory(P_PACK);
                rogue.equipmentList();
                message.draw(msg, true);
                break;
            }
            case 'g': // grab
                if(this.isCtrl) break;
                rogue.grabItem();
                break;
            case 'G': { // gain
                this.switchFlag();
                flag.gain = 1;
                rogue.showInventory(P_PACK);
                inventory.showStats(rogue);
                let msg = message.get(M_GAIN);
                message.draw(msg, true);
                break;
            }
            case 'i': // inventory, *create item*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    this.switchFlag();
                    flag.create = 'item';
                    creation.input();
                    message.draw('Input type, tabId and quantity', true);
                } else {
                    //TODO
                    flag.inventory = !flag.inventory;
                    if (flag.inventory) {
                        rogue.showInventory(P_PACK);
                    } else {
                        inventory.clear();
                        if (flag.equipment) rogue.equipmentList();
                    }
                }
				
                break;
            case 'I': { // investigate
                if (this.isCtrl) break;
                this.switchFlag();
                flag.investigate = true;
                let msg = message.get(M_INVESTIGATE) + message.get(M_FLOOR);
                rogue.showInventory(P_PACK);
                rogue.equipmentList();
                message.draw(msg, true)
                break;
            }
            case 'm': // skill
                if (this.isCtrl) break;
                if (!rogue.checkToCast()) break;
                this.switchFlag();
                flag.skill = true;
                rogue.showSkill(rogue.skill);
                message.draw(message.get(M_CAST), true);
                break;
            case 'M': // minimap
                this.switchFlag();
                flag.minimap = true;
                map.drawMini('a');
                message.draw(message.get(M_MINIMAP), true);
                break;
            case 'p': // pack, previous message
                if (this.isCtrl) {
                    this.switchFlag();
                    flag.message = true;
                    Vue.nextTick(function(){
                        message.scroll(false, true);
                    });
                } else {
                    this.switchFlag();
                    flag.pack = true;
                    let msg = message.get(M_PACK_OR_UNPACK) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    rogue.showInventory(P_BOX);
                    message.draw(msg, true);
				}
				
                break;
            case 'q': // quaff, *create trap*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.haveCast(CREATE_TRAP, 10);
                    map.draw();
                } else {
                    this.switchFlag();
                    flag.quaff = true;
                    let msg = message.get(M_QUAFF) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'Q': // quit
                this.switchFlag();
                flag.quit = true;
                message.draw(message.get(M_ASK_TO_QUIT));
                message.draw(message.get(M_QUIT), true);
                break;
            case 'r': // read, redraw
                if (this.isCtrl) {
                    map.redraw();
                } else {
                    if (!rogue.canRead()) break;
                    this.switchFlag();
                    flag.read = true;
                    let msg = message.get(M_READ) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'R': // rest
                flag.rest = true;
                rogue.rest();
                break;
            case 's': // searching, save
                if (this.isCtrl) {
                    data.save();
                } else {
                    rogue.searchHiddenObject();
                }

                break;
            case 'S': // swap
                rogue.swap();
                break;
            case 't': { // throw
                if (this.isCtrl) break;
                this.switchFlag();
                let msg = message.get(M_THROW) + message.get(M_FLOOR);
                rogue.showInventory(P_PACK);
                message.draw(msg, true);
                flag.throw = true;
                break;
            }
            case 'T': { // unequip
                if (rogue.isNaked()) {
                    message.draw(message.get(M_DONT_HAVE_EQUIPMENT));
                    break;
                }
                
                this.switchFlag();
                let msg = message.get(M_TAKE_OFF);
                message.draw(msg, true);
                rogue.equipmentList();
                rogue.showInventory(P_PACK);
                flag.unequip = true;
                break;
            }
            case 'v': // version
                if (this.isCtrl) message.draw(`Death and Birth ver ${VERSION.toFixed(3)}`);
                break;
            case 'w': { // equip
                if (this.isCtrl) break;
                this.switchFlag();
                flag.equip = true;
                let msg = message.get(M_EQUIP) + message.get(M_FLOOR);
                rogue.showInventory(P_PACK);
                rogue.equipmentList();
                message.draw(msg, true);
                break;
            }
            case 'x': // examine, exit 
                if (this.isCtrl) {
                    this.switchFlag();
                    data.exit();
                } else {
                    if (rogue.blinded) {
                        message.draw(message.get(M_CANT_EXAMINE));
                        break;
                    }
                    
                    this.switchFlag();
                    flag.examine = true;
                    cursor.init();
                    map.coords[rogue.x][rogue.y].getInfo();
                }

                break;
            case 'z': // zap, *indestructible*
                if (this.isCtrl) {
                    if (!rogue.isWizard) break;
                    rogue.indestructible = !rogue.indestructible;
                } else {
                    this.switchFlag();
                    flag.zap = true;
                    let msg = message.get(M_ZAP) + message.get(M_FLOOR);
                    rogue.showInventory(P_PACK);
                    message.draw(msg, true);
                }

                break;
            case 'F1': //F1~F12
            case 'F2':
            case 'F3':
            case 'F4':
            case 'F5':
            case 'F6':
            case 'F7':
            case 'F8':
            case 'F9':
            case 'F10':
            case 'F11':
            case 'F12':
                if (this.isCtrl) break;
                rogue.castBookmarkedSkill(key);
                break;
            case '=': // option
                if (this.isCtrl) break;
                this.switchFlag();
                flag.option = true;
                message.draw(message.get(M_OPTION), true);
                inventory.show({
                    list: option.list,
                    dr: RIGHT,
                });

                break;
            case '<': // stairs
            case '>':
                if (this.isCtrl) break;
                rogue.downOrUpStairs(key);
                break;
            case '.': // step on 
                if (this.isCtrl) break;
                if (!map.coords[rogue.x][rogue.y].getInfo(true)) rogue.done = true;
                break;
            case '?': // help
                if (this.isCtrl) break;
                this.switchFlag();
                flag.help = true;
                Vue.nextTick(function(){
                    help.scroll(false, true);
                });
                break;
        }
        
    },

    switchFlag() {
        inventory.clear();
        flag.inventory = false;
        flag.equipment = false;
        flag.regular = false;
    },

    scroll(eleP, eleC, key, init) {
        if (!init && key === 'c') {
            rogue.cancelCommand();
            return;
        }

        let scrollByX, scrollByY, left, down, up, right,
            dr = getDirection(key);
        if (!init && !dr) return;
        if (init) {
            scrollByX = -eleP.scrollWidth;
            scrollByY = -eleP.scrollHeight;
        } else if (dr.id === LEFT) {
            left = true;
        } else if (dr.id === DOWN) {
            down = true;
        } else if (dr.id === UP) {
            up = true;
        } else if (dr.id === RIGHT) {
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
