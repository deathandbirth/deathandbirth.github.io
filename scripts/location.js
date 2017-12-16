const Location = class extends Position {
    constructor(x, y) {
        super(x, y);
        this.item = {};
    }

    getSymbol() {
        if (this.fighter && this.fighter.isShowing()) {
            this.symbol = this.fighter.symbol;
            this.color = this.fighter.color;
            this.shadow = this.fighter.shadow;
            this.stroke = this.fighter.stroke;
        } else if (!this.found) {
            this.symbol = ' ';
            this.color = WHITE;
            this.shadow = 0;
            this.stroke = 0;
        } else if (this.enter) {
            this.symbol = this.enter.symbol;
            this.color = this.enter.color;
            this.shadow = 0;
            this.stroke = this.enter.stroke;
        } else if (this.trap && !this.hidden) {
            this.symbol = this.trap.symbol;
            this.color = this.trap.color;
            this.shadow = 0;
            this.stroke = 0;
        } else if (this.door && !this.hidden) {
            this.symbol = this.door === CLOSE ? '+' : '\'';
            this.color = BROWN;
            this.shadow = 0;
            this.stroke = 0;
        } else if (this.wall) {
            this.symbol = '#';
            this.color = this.indestructible ? BROWN : GRAY;
            this.shadow = 0;
            this.stroke = 0;
        } else if (this.item['a']) {
            let l = Object.keys(this.item).length;
            let item = this.item[EA[l - 1]];
            this.symbol = item.symbol;
            this.color = item.color;
            if (item.identified || rogue.hallucinated) {
                this.shadow = item.shadow;
                this.stroke = item.stroke;
            } else {
                this.shadow = 0;
                this.stroke = 0;
            }
        } else if (this.stairs && !this.hidden) {
            this.symbol = this.stairs.symbol;
            this.color = this.stairs.color;
            this.shadow = 0;
            this.stroke = 0;
        } else if (this.floor) {
            this.symbol = '.';
            this.color = WHITE;
            this.shadow = 0;
            this.stroke = 0;
        }
    }

    draw() {
        this.getSymbol();
        let ctxBuf = display.ctxes.buf;
        display.rect({
            ctx: ctxBuf,
            x: this.x,
            y: this.y,
            width: 1,
            height: 1,
            clear: true,
        });
        
        if (rogue.blinded && (!this.fighter || this.fighter.id !== ROGUE)) return;
        ctxBuf.save();
        ctxBuf.fillStyle = this.color;
        if (rogue.hallucinated && !this.shadow) ctxBuf.shadowColor = PURPLE;
        if (this.shadow && option.shadow.user) ctxBuf.shadowColor = this.shadow;
        display.text({
            ctx: ctxBuf,
            msg: this.symbol,
            x: this.x + 0.5,
            y: this.y + 0.5,
            stroke: this.stroke,
        });

        if (!rogue.litMapIds[this.x + ',' + this.y]) {
            ctxBuf.globalAlpha = 0.5;
            ctxBuf.fillStyle = BLACK;
            ctxBuf.shadowColor = CLEAR;
            display.rect({
                ctx: ctxBuf,
                x: this.x,
                y: this.y,
                width: 1,
                height: 1,
            });
		}
		
        ctxBuf.restore();
    }

    getInfo(stepOn) {
        if (flag.examine) {
            let msg = message.get(M_EXAMINE);
            if (rogue.isWizard) msg += message.get(M_EXAMINE_W);
            message.draw(msg + ` (${cursol.x},${cursol.y})`, true);
		}
		
        if (!this.found && !this.detected) return;
        let msg = '';
        if (flag.examine && this.fighter && this.fighter.id !== ROGUE) {
			msg = statistics.drawEnemyBar(this.fighter, true);
		}

        if (this.stairs && !this.hidden) {
            let nameStairs = this.stairs.getName();
            if (option.isEnglish()) {
                msg += (msg ? ' on ' : '') + nameStairs;
			} else {
				msg = nameStairs + (msg ? 'の上に' + msg : '');
			}
		}
		
        if (this.item['a'] && !this.wall) {
            let l = Object.keys(this.item).length;
            let item = this.item[EA[l - 1]];
            if (!this.stairs && !this.hidden && msg) {
                msg = option.isEnglish() ? msg + ' on ' : 'の上に' + msg;
            } else if (l === 1 && msg) {
                msg = option.isEnglish() ? msg + ' and ' : 'と' + msg;
			} else if (l > 1 && msg) {
				msg = option.isEnglish() ? msg + ', ' : 'と' + msg;
			}

            let nameItem = item.getName();
            if (option.isEnglish()) {
                msg = msg + nameItem + (l > 1 ? ' and more' : '');
			} else {
				msg = nameItem + (l > 1 ? 'とアイテムの山' : '') + msg;
			}
		}
		
        if (this.enter) {
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
                let nameEnter = this.enter.name[option.getLanguage()];
                msg = !msg ? nameEnter : nameEnter + (option.isEnglish() ? ', ' : 'と') + msg;
            }
        } else if (this.trap) {
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
        if (this.door === OPEN) {
            this.door = CLOSE;
            audio.playSound('shutdoor', l);
        } else {
            this.door = OPEN;
            audio.playSound('opendoor', l);
		}
		
        this.draw();
        if (rogue.litMapIds[this.x + ',' + this.y]) rogue.lightenOrDarken('Lighten');
    }

    deleteItem(a, quantity = 1) {
        let item = this.item[a];
        item.quantity -= quantity;
        if (!item.quantity) {
            delete Item.list[item.id];
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
		} else if (this.door === CLOSE) {
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
}
