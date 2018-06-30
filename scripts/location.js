const doorIds = {
    close: 1,
    open: 2,
};

const Location = class extends Position {
    constructor(x, y) {
        super(x, y);
        this.item = {};
    }

    getType() {
        return this.fighter && this.fighter.isShowing() ? SYMBOL_FIGHTER :
            this.item['a'] && this.item['a'].isShowing() ? SYMBOL_ITEM :
            !this.found ? SYMBOL_BLANK :
            this.enter ? SYMBOL_ENTER :
            this.trap && !this.hidden ? SYMBOL_TRAP :
            this.door && !this.hidden ? SYMBOL_DOOR :
            this.wall ? SYMBOL_WALL :
            this.stairs && !this.hidden ? SYMBOL_STAIRS :
            this.floor ? SYMBOL_FLOOR :
            -1;
    }

    getSymbol(minimap, type) {
        let symbol, color, shadow, stroke;
        if (!type) type = this.getType(); 
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
                let item = this.item[EA[l - 1]];
                let identified = item.identified || rogue.hallucinated;
                symbol = item.symbol;
                color = item.color;
                shadow = identified ? item.shadow : 0;
                stroke = identified ? item.stroke : 0;
                break;
            case SYMBOL_BLANK: 
                symbol = ' ';
                color = colorList.white;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_ENTER:
                let enter = this.enter;
                symbol = enter.symbol;
                color = enter.color;
                shadow = 0;
                stroke = enter.stroke;
                break;
            case SYMBOL_TRAP:
                let trap = this.trap;
                symbol = trap.symbol;
                color = trap.color;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_DOOR:
                symbol = this.isClosedDoor() ? '+' : '\'';
                color = colorList.brown;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_WALL:
                symbol = '#';
                color = this.indestructible ? colorList.brown : colorList.gray;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_STAIRS:
                let stairs = this.stairs;
                symbol = stairs.symbol;
                color = stairs.color;
                shadow = 0;
                stroke = 0;
                break;
            case SYMBOL_FLOOR:
                symbol = '.';
                color = colorList.white;
                shadow = 0;
                stroke = 0;
                break;
        }

        if (!minimap) {
            this.symbol = symbol;
            this.color = color;
            this.shadow = shadow;
            this.stroke = stroke;
        }

        return {symbol: symbol, color: color, shadow: shadow, stroke: stroke};
    }

    draw(minimap, type, fs) {
        let {symbol, color, shadow, stroke} = this.getSymbol(minimap, type);
        let ctx = display.ctxes[minimap ? 'map' : 'buf'];
        let [x, y] = [this.x, this.y];
        if (!minimap) {
            display.rect({
                ctx: ctx,
                x: x,
                y: y,
                width: 1,
                height: 1,
                fs: fs,
                clear: true,
            });
        }
        
        if (rogue.blinded && (!this.fighter || this.fighter.id !== ROGUE)) return;
        ctx.save();
        ctx.fillStyle = color;
        if (rogue.hallucinated && !shadow) ctx.shadowColor = colorList.purple;
        if (shadow && option.shadow.user) ctx.shadowColor = shadow;
        let xPx, yPx;
        if (minimap && !rogue.cdl) {
            xPx = display.width / 4;
            yPx = display.height / 4;
        }

        display.text({
            ctx: ctx,
            msg: symbol,
            x: x + 0.5,
            y: y + 0.5,
            xPx: xPx,
            yPx: yPx,
            fs: fs,
            stroke: stroke,
        });

        if (!minimap && (!rogue.litMapIds[x + ',' + y] || this.wall && this.item['a'])) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = colorList.black;
            ctx.shadowColor = colorList.clear;
            display.rect({
                ctx: ctx,
                x: x,
                y: y,
                width: 1,
                height: 1,
                fs: fs,
            });
		}
		
        ctx.restore();
    }

    getInfo(stepOn) {
        if (flag.examine) {
            let msg = message.get(M_EXAMINE);
            if (rogue.isWizard) msg += message.get(M_EXAMINE_W);
            message.draw(msg + ` (${cursol.x},${cursol.y})`, true);
		}
		
        let msg = '';
        if (flag.examine && this.fighter && this.fighter.id !== ROGUE && this.fighter.isShowing()) {
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
            let item = this.item[EA[l - 1]];
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
		
        this.draw();
        if (rogue.litMapIds[this.x + ',' + this.y]) rogue.lightenOrDarken('Lighten');
    }

    deleteItem(a, quantity = 1) {
        let item = this.item[a];
        item.quantity -= quantity;
        if (!item.quantity) {
            delete map.itemList[item.id];
            deleteAndSortItem(this.item, a);
		}
		
        this.draw();
    }

    deleteTrap(draw) {
        if (this.hidden) this.hidden = false;
        this.trap = null;
        if (draw) this.draw();
    }

    deleteDoor(draw) {
        if (this.hidden) {
            this.hidden = false;
            this.wall = false;
		}
		
        this.door = 0;
        this.floor = true;
        if (draw) this.draw();
    }

    deleteWall(draw) {
        if (this.indestructible) this.indestructible = false;
        this.wall = false;
        this.floor = true;
        if (draw) this.draw();
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
        } else if (this.stairs) {
			name = this.stairs.getName();
		}
		
        message.draw(option.isEnglish() ?
            `You found a hidden ${name}` :
            `隠された${name}を発見した`);
        this.draw();
        if (flag.dash) flag.dash = false;
    }

    isClosedDoor() {
        return this.door === doorIds['close'];
    }

    isObstacle() {
        return this.wall || this.isClosedDoor();
    }

    getDoor(close) {
        this.door = doorIds[close ? 'close' : 'open'];;
    }
}
