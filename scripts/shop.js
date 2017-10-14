const initShopItem =()=>{
	for(let value of enter)
		if(value.shop) value.list = {};
}
const createShopItem =(shop)=>{
	let k = 0;
	if(shop.gamble){
		for(let i=0;i<10;i++){
			shop.list[EA[k++]] = creation.item({
				position: LIST,
			});
		}
		return;
	}
	for(let type in shop.type){
		let max = shop.type[type];
		let j = 0;
		let count = 0;
		let itemNums = itemNumsMap.get(type);
		itemNums.shuffle();
		do{
			let item,tabId;
			do{
				tabId = itemNums[j++];
				item = itemTab[type].get(tabId);
			} while(item&&!item.shop)
			if(!item){
				j = 0;
				itemNums.shuffle();
				continue;
			}
			let quantity = item.equipable? 1:rndIntBet(10,99);
			shop.list[EA[k]] = creation.item({
				type: type,
				tabId: tabId,
				quantity: quantity,
				position: LIST,
			});
			inventory.sort(EA[k++],shop.list);
			if(k===MAX_PACK_COUNT) return;
			count++;
		} while(count<max);
	}
}
