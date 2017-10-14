const inventory = {
	shadow(direction){
		ctsInv.save();
		ctsInv.shadowColor = CLEAR
		ctsInv.globalAlpha = 0.9;
		ctsInv.fillStyle = BLACK;
		if(direction===LEFT||direction===MIDDLE)
			ctsInv.fillRect(0,(MS-0.5)*fs,canvas.width/2,(IN_HEIGHT-MS+0.5)*fs);
		if(direction===RIGHT||direction===MIDDLE)
			ctsInv.fillRect(canvas.width/2,(MS-0.5)*fs,canvas.width/2,(IN_HEIGHT-MS+0.5)*fs);
		ctsInv.restore();
	},
	clear(){
		ctsInv.clearRect(0,0,canvas.width,canvas.height/*-SS*fs*/);
	},
	show(list,direction,a,place){
		if(flag.shop){
			var quantity2 = !cn? 1:Number(cn);
			if(a&&quantity2>list[a].quantity)
				quantity2 = list[a].quantity;
		} else if(place===P_STASH)
			var l = (enter[STASH].page-1)*MAX_PACK_COUNT;
		this.shadow(direction);
		let i = 1.5+(direction===RIGHT? IN_WIDTH/2:0);
		let j = MS+1;
		let count = 0;
		let weight = 0.0;
		for(let key in list){
			let item = list[key];
			if(!flag.pack&&!item
			||place===P_STASH&&key<l
			||flag.stash&&a!==undefined&&key!=a
			||flag.equip&&!item.equipable
			||flag.quaff&&item.type!='potion'
			||flag.read&&item.type!='scroll'&&!item.chargeBook
			||flag.identify&&item.identified&&key!==a
			||(flag.repair||flag.blacksmith)&&(!item.equipable||item.durab===item.durabMax)
			||flag.synthesize&&item.alchemy
			||flag.zap&&item.type!='wand'
			||flag.eat&&item.type!='food'
			||flag.gain&&(item.type!='book'||!item.skill)
			||flag.destroy&&flag.number&&key!==a
			||(flag.shop||flag.option)&&a&&key!==a
			||flag.investigate&&!item.identified
			||flag.fuel&&(item.type!=='light'&&item.type!=='oil'
				||rogue.equipment['light'].torch&!item.torch
				||!rogue.equipment['light'].torch&&item.torch)
			)
				continue;
			ctsInv.save();
			ctsInv.textAlign = 'center';
			let char;
			if(place===P_STASH)
				char = EA[key-l].toUpperCase();
			else
				char = direction===RIGHT? key:key.toUpperCase();
			ctsInv.fillText(char,i*fs,j*fs);
			ctsInv.fillText(')',i*fs+fs/3,j*fs);
			if(flag.pack&&!item||flag.option||flag.cure){
				if(!flag.pack){
					ctsInv.textAlign = 'left';
					ctsInv.fillText(item[rogue.cl],(i+1)*fs,j*fs,14*fs);
					ctsInv.textAlign = 'right';
					if(flag.cure){
						let cost = enter[CURE].list[key].cost;
						ctsInv.fillText(`$${cost}`,(i+22.5)*fs,j*fs);
					} else if(!flag.option2){
						let msg = '';
						let opt = option[item['a']];
						if(opt.choise)
							msg = opt.choise[opt.user][rogue.cl];
						else if(rogue.cl===ENG)
							msg = opt.user? 'yes':'no';
						else
							msg = opt.user? 'はい':'いいえ';
						ctsInv.fillText(msg,(i+22.5)*fs,j*fs);
					}				
				}
				j++;
				ctsInv.restore();
				continue;
			}
			ctsInv.fillStyle = item.color;
			if(item.shadow) ctsInv.shadowColor = item.shadow;
			if(item.stroke){
				ctsInv.strokeStyle = item.stroke;
				ctsInv.strokeText(item.symbol,(i+1)*fs,j*fs);
			}
			ctsInv.fillText(item.symbol,(i+1)*fs,j*fs);
			if(item.cursed&&item.identified)
				ctsInv.fillStyle = RED;
			else if(item.equipable&&!item.durab)
				ctsInv.fillStyle = GRAY;
			else
				ctsInv.fillStyle = WHITE;
			ctsInv.textAlign = 'left';
			let name = item.getName(false,item.quantity,rogue.cl,flag.gamble&&place===P_SHOP);
			if(item.stroke) ctsInv.strokeText(name,(i+1.5)*fs,j*fs,15*fs);
			ctsInv.fillText(name,(i+1.5)*fs,j*fs,15*fs);
			ctsInv.fillStyle = WHITE;
			ctsInv.shadowColor = SHADOW;
			ctsInv.textAlign = 'right';
			if(flag.shop||flag.blacksmith){
				let price = flag.shop? item.price*quantity2:item.getDurabPrice();
				ctsInv.fillText(`$${price}`,(i+20.3)*fs,j*fs,3.5*fs);
			}
			let quantity;
			if(place===P_SHOP||flag.shop&&flag.number)
				quantity = quantity2;
			else {
				quantity = item.quantity;
				weight += item.weight*quantity;
			}
			ctsInv.fillText((item.weight*quantity).toFixed(1),(i+22.5)*fs,(j++)*fs);
			ctsInv.restore();
			if(++count===MAX_PACK_COUNT) break;
		}
		if(flag.option||flag.cure) return;
		let maxNum = this.getMaxNumber(place);
		ctsInv.fillText(`[${count}/${maxNum}]`,i*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.save();
		ctsInv.textAlign = 'right';
		let msg = '';
		if(place===P_SHOP){
			let weight = rogue.cl===ENG? 'Weight':'重量';
			msg = `${weight} x${quantity2}`;
		}else if(place===P_STASH)
			msg =` [${enter[STASH].page}/${MAX_STASH_PAGE}]`;
		else{
			if(flag.gain){
				let skillPoints = rogue.cl===ENG? 'Skill Points':'スキルポイント';
				msg = `${skillPoints} ${rogue.skillPoints} `;
			}
			let total = rogue.cl===ENG? 'Total':'計';
			msg += `${total} ${weight.toFixed(1)}kg`;
		}
		if(flag.shop){
			let sellOrCost;
			if(direction===RIGHT)
				sellOrCost = rogue.cl===ENG? 'Sell Value':'売値';
			else
				sellOrCost = rogue.cl===ENG? 'Cost':'買値';
			msg = `${sellOrCost} x${quantity2} ${msg}`;
		}
		ctsInv.fillText(msg,(i+22.5)*fs,(IN_HEIGHT-MS+1)*fs);
		ctsInv.restore();
	},
	getMaxNumber(place){
		let maxNum;
		switch(place){
			case P_PACK:
			case P_FLOOR:
			case P_SHOP:
				maxNum = MAX_PACK_COUNT;
				break;
			case P_BOX:
				maxNum = rogue.numBoxes;
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
	sort(a,list,array){
		let found = false;
		let item = list[a];
		let index = IT.indexOf(list[a].type);
		for(let key in list){
			let item2 = list[key];
			let index2 = IT.indexOf(item2.type);
			if(!found&&index2<index) continue;
			if(key>=a) break;
			found = true;
			if(!item.identified){
				if(index2===index) continue;
			}else{
				if((item2.identified&&item2.tabId<=item.tabId)
				&&index2===index){
					if(!(item2.charges>=0)||item2.charges>item.charges) continue;
				}
			}
			if(array){
				let temp = item;
				list.splice(a,1);
				list.splice(key,0,temp);
				return key;
			} else{
				let i = EA.indexOf(a);
				let j = EA.indexOf(key);
				for(let k=i;k>j;k--)
					[list[EA[k]], list[EA[k-1]]] = [list[EA[k-1]], list[EA[k]]];
				return;
			}
		}
		return a; //stash page
	}
}
