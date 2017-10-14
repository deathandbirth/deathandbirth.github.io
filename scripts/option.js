const option = {
	list:{a:{a:'language',b:'言語'},b:{a:'display',b:'解像度'},
		c:{a:'shadow',b:'影'},d:{a:'mute',b:'消音'},e:{a:'BGM',b:'BGM'},
		f:{a:'SE',b:'効果音'},g:{a:'autosave',b:'自動記録'},h:{a:'auto-destroy',b:'自動破壊'},
		i:{a:'auto-charge',b:'自動充填'},j:{a:'auto-identify',b:'自動識別'}
		},
	display:{defaults:'b',choise:{}},
	shadow:{defaults:false},
	mute:{defaults:false},
	autosave:{defaults:true},
	language:{defaults:'b',choise:{a:{a:'English',b:'英語'},b:{a:'Japanese',b:'日本語'}}},
	'auto-destroy':{defaults:false},
	'auto-charge':{defaults:true},
	'auto-identify':{defaults:true},
	BGM:{defaults:'k',choise:{}},
	SE:{defaults:'k',choise:{}},
	main(keyCode){
		let list = !flag.option2? this.list:this[this.name].choise;
		if(keyCode<65||keyCode>=Object.keys(list).length+65) return;
		let a = getAlphabet(keyCode);
		if(!flag.option2) this.name = this.list[a]['a'];
		if(this.name==='display'||this.name==='language'
		||this.name==='BGM'||this.name==='SE'){
			if(!flag.option2){
				this.choose(a);
				return;
			} else if(a===this[this.name].user)
				return;
			else if(this.name==='display'){
				this[this.name].user = a;
				display.change(a,true);
			} else if(this.name==='language'){
				this[this.name].user = rogue.cl = a;
				rogue.drawStats();
			} else if(this.name==='BGM'||this.name==='SE'){
				this[this.name].user = a;
				let vol = (keyCode-65)/10;
				if(this.name==='BGM'){
					audio.volBGM = vol
					audio.music[audio.curTrack].volume = vol;
				}else
					audio.volSE = vol;
			}
			flag.option2 = false; 
		} else if(this.name==='shadow'){
			this[this.name].user = !this[this.name].user;
			ctxBuf.shadowColor = this[this.name].user? SHADOW2:CLEAR;
			map.redraw(rogue.x,rogue.y);
			map.draw(rogue.x,rogue.y);
		} else if(this.name==='mute'){
			audio.mute();
		} else if(this.name==='autosave'||this.name==='auto-identify'
		||this.name==='auto-destroy'||this.name==='auto-charge'){
			this[this.name].user = !this[this.name].user;
		} 
		inventory.clear();
		inventory.show(this.list,RIGHT);
		message.draw(message.get(M_OPTION),true);
	},
	choose(a){
		inventory.clear();
		inventory.show(this.list,RIGHT,a);
		flag.option2 = true;
		inventory.show(this[this.name].choise,LEFT);
		message.draw(message.get(M_OPTION),true);
	}
};
{
	for(let key in option.list){
		let key2 = option.list[key]['a'];
		option[key2].user = option[key2].defaults;
		if(key2==='BGM'||key2==='SE'){
			for(let i=0;i<=10;i++)
				option[key2].choise[EA[i]] = {a:i,b:i};
		}
	}
	let choise = option.display.choise;
	for(let key in display.list){
		let size = display.list[key];
		choise[key] = {};
		choise[key]['a'] = choise[key]['b'] = size.width+' x '+size.height;
	}
}
