const doorIds = {
    close: 1,
    open: 2,
};
const DOOR_CLOSE = 1;
const DOOR_OPEN = 2;

const Location = class extends Position {
    constructor(x, y) {
        super(x, y);
        this.item = {};
    }

    getSymbol(type) {
        let symbol, color, shadow, stroke;
        switch (type) {
            case SYMBOL_FIGHTER:
                let fighter = this.fighter;
                symbol = fighter.symbol;
                color = fighter.color;
                shadow = fighter.shadow;
                stroke = fighter.stroke;
                break;
            case SYMBOL_ITEM:
                let l = Object.keys(this.item).length;
                let item = this.item[eaList[l - 1]];
                let identified = item.identified || rogue.hallucinated;
                symbol = item.symbol;
                color = item.color;
                shadow = identified ? item.shadow : 0;
                stroke = identified ? item.stroke : 0;
                break;
            case SYMBOL_BLANK: 
                symbol = ' ';
                color = colorList.white;
                break;
            case SYMBOL_ENTER:
                let enter = this.enter;
                symbol = enter.symbol;
                color = enter.color;
                shadow = enter.shadow;
                stroke = enter.stroke;
                break;
            case SYMBOL_TRAP:
                let trap = this.trap;
                symbol = trap.symbol;
                color = trap.color;
                break;
            case SYMBOL_DOOR:
                symbol = this.isClosedDoor() ? '+' : '\'';
                color = colorList.brown;
                break;
            case SYMBOL_WALL:
                symbol = '#';
                color = this.indestructible ? colorList.brown : colorList.gray;
                break;
            case SYMBOL_STAIRS:
                let stairs = this.stairs;
                symbol = stairs.symbol;
                color = stairs.color;
                break;
            case SYMBOL_FLOOR:
                symbol = '.';
                color = colorList.white;
                break;
        }

        return {symbol: symbol, color: color, shadow: shadow, stroke: stroke};
    }

    draw(typeCtx, typeSymbol) {
        let {symbol, color, shadow, stroke} = this.getSymbol(typeSymbol);
        let ctx = display.ctxes[typeCtx];
        let [x, y] = [this.x, this.y];
        let obj = {
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
        }

        ctx.save();
        if (typeCtx === 'ground') {
            obj.clear = true;
        } else if (typeCtx === 'object') {
            ctx.fillStyle = colorList.black;
        }
        
        display.rect(obj);
        ctx.fillStyle = color;
        if (!option.shadow.user) {
            stroke = 0;
        } else if(shadow) {
            ctx.shadowColor = shadow;
        } else if (rogue.hallucinated) {
            // ctx.shadowColor = colorList.purple;
        }

        display.text({
            ctx: ctx,
            msg: symbol,
            x: x,
            y: y,
            stroke: stroke,
        });
		
        ctx.restore();
    }

    drawGround() {
        let type;
        if (!this.found) {
            type = SYMBOL_BLANK;
        } else if (this.enter && !this.enter.portal) {
            type = SYMBOL_ENTER;
        } else if (this.wall) {
            type = SYMBOL_WALL;
        } else if (this.door && !this.hidden) {
            type = SYMBOL_DOOR;
        } else if (this.floor) {
            type = SYMBOL_FLOOR;
        }

        if (type) this.draw('ground', type);
    }

    drawObject(type) {
        let draw;
        if (type === SYMBOL_FIGHTER) {
            draw = this.fighter && this.fighter.isShowing();
        } else if (type === SYMBOL_ITEM) {
            draw = this.item['a'] && this.item['a'].isShowing();
        } else if (this.found) {
            if (type === SYMBOL_TRAP) {
                draw = this.trap && !this.hidden;
            } else if (type === SYMBOL_STAIRS) {
                draw = this.stairs && !this.hidden;
            } else if (type === SYMBOL_ENTER) {
                draw = this.enter;
            }
        }
        
        if (draw) this.draw('object', type);
    }

    drawShadow(clear) {
        let ctx = display.ctxes.shadow;
        let [x, y] = [this.x, this.y];
        display.rect({
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
            clear: true,
        });

        if (clear) return;
        display.rect({
            ctx: ctx,
            x: x,
            y: y,
            width: 1,
            height: 1,
        });
    }

    getInfo(stepOn) {
        if (flag.examine) rogue.examineMsg();
        let msg = '';
        if (flag.examine && this.fighter && this.fighter.id !== ID_ROGUE && this.fighter.isShowing()) {
			msg = statistics.drawEnemyBar(this.fighter, true);
		}

        if (this.found && this.stairs && !this.hidden) {
            let nameStairs = this.stairs.getName();
            if (option.isEnglish()) {
                msg += (msg ? ' on ' : '') + nameStairs;
			} else {
				msg = nameStairs + (msg ? 'の上に' + msg : '');
			}
		}
		
        if (this.item['a']) {
            let l = Object.keys(this.item).length;
            let item = this.item[eaList[l - 1]];
            if (item.isShowing()) {
                if (this.found && !this.stairs && !this.hidden && msg) {
                    msg = option.isEnglish() ? msg + ' on ' : 'の上に' + msg;
                } else if (l === 1 && msg) {
                    msg = option.isEnglish() ? msg + ' and ' : 'と' + msg;
                } else if (l > 1 && msg) {
                    msg = option.isEnglish() ? msg + ', ' : 'と' + msg;
                }

                let nameItem = item.getName();
                if (item.type === 'coin') {
                    if (option.isEnglish()) {
                        nameItem = 'Gold worth ' + nameItem;
                    } else {
                        nameItem += '相当の金塊';
                    }
                }
                if (this.found && this.wall) {
                    if (option.isEnglish()) {
                        nameItem += ' through the wall';
                    } else {
                        nameItem = '壁の中に' + nameItem;
                    }
                }

                if (l > 1) nameItem += option.isEnglish() ? ' and more' : 'とアイテムの山';

                if (option.isEnglish()) {
                    msg += nameItem;
                } else {
                    msg = nameItem + msg;
                }
            }
		}
		
        if (this.found && this.enter) {
            let msgAdd = flag.examine;
            if (!flag.examine) {
                if (flag.dash) flag.dash = false;
                var entered = true;
                if (this.enter.portal) {
                    if (stepOn && (rogue.cdl || rogue.pdl)) {
                        rogue.enterPortal();
					} else {
                        msgAdd = true;
                        entered = false;
                    }
                } else {
					rogue.enterBuild(this.enter);
				}
			}
			
            if (msgAdd) {
                let nameEnter = this.enter.getName();
                msg = !msg ? nameEnter : nameEnter + (option.isEnglish() ? ', ' : 'と') + msg;
            }
        } else if (this.found && this.trap) {
            let nameTrap = this.trap.getName();
            if (flag.examine && !this.hidden) {
                msg = !msg ? nameTrap : nameTrap + (option.isEnglish() ? ', ' : 'と') + msg;
			} else if (!flag.examine) {
                if (!this.trap.protection && (stepOn || this.hidden && coinToss())) {
                    message.draw(option.isEnglish() ?
                        `You got caught in ${nameTrap}` :
                        `${nameTrap}に捕まった`);
                    rogue.trapped(this.trap, stepOn);
                } else if (!this.hidden) {
					msg += nameTrap;
				}
            }
		}
		
        if (msg && !rogue.blinded) {
            message.draw(option.isEnglish() ?
                `You see ${msg}` :
                `${msg}が見える`);
            if (!flag.examine && this.item['a'] && !this.enter) rogue.itemAuto(this.item);
            if (flag.dash) flag.dash = false;
		}
		
        return entered;
    }

    openOrCloseDoor() {
        let l = distanceSq(this.x, this.y, rogue.x, rogue.y);
        if (!this.isClosedDoor()) {
            this.getDoor(true);
            audio.playSound('shutdoor', l);
        } else {
            this.getDoor();
            audio.playSound('opendoor', l);
		}
		
        this.drawGround();
        if (rogue.litMapIds[this.x + ',' + this.y]) rogue.lightenOrDarken('Lighten');
    }

    deleteItem(a, quantity = 1) {
        let item = this.item[a];
        item.quantity -= quantity;
        if (!item.quantity) {
            delete map.itemList[item.id];
            deleteAndSortItem(this.item, a);
		}
    }

    deleteTrap(draw) {
        if (this.hidden) this.hidden = false;
        this.trap = null;
    }

    deleteDoor(draw) {
        if (this.hidden) {
            this.hidden = false;
            this.wall = false;
		}
		
        this.door = 0;
        this.floor = true;
        if (draw) this.drawGround();
    }

    deleteWall(draw) {
        if (this.indestructible) this.indestructible = false;
        this.wall = false;
        this.floor = true;
        if (draw) this.drawGround();
    }

    findHiddenObject() {
        if (rogue.blinded || !this.hidden || !searchProb()) return;
        this.hidden = false;
        let name;
        if (this.trap) {
            name = this.trap.getName();
		} else if (this.isClosedDoor()) {
            name = option.isEnglish() ? 'door' : 'ドア';
            this.wall = false;
            this.drawGround();
        } else if (this.stairs) {
			name = this.stairs.getName();
		}
		
        message.draw(option.isEnglish() ?
            `You found a hidden ${name}` :
            `隠された${name}を発見した`);
        if (flag.dash) flag.dash = false;
    }

    isClosedDoor() {
        return this.door === DOOR_CLOSE;
    }

    isObstacle() {
        return this.wall || this.isClosedDoor();
    }

    getDoor(close) {
        this.door = close ? DOOR_CLOSE : DOOR_OPEN;
    }
}
