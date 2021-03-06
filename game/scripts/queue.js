const Queue = class extends BinaryHeap {
    constructor() {
        super();
    }

    moveAll() {
        while (this.list[0].energy >= 0 && this.list[0].id !== ID_ROGUE) {
            this.list[0].act();
            if (flag.died) return;
		}
		
        if (this.list[0].energy < 0) {
            this.getEnergyAll();
            this.moveAll();
            return;
		}

        if (rogue.cdl && rogue.turn % SPAWN_FREQ === 0) {
            creation.enemy({
                position: POS_AWAY,
                summon: true,
			});
		}

        rogue.turn++;
        rogue.healAndHunger();
        map.drawObjectAll();
        map.draw();
        if (rogue.paralyzed || rogue.sleeping) {
            rogue.decreaseEnergy();
            message.draw(option.isEnglish() ?
                `You are still ${rogue.sleeping? 'sleeping':'paralyzed'}` :
                `まだ${rogue.sleeping? '昏睡':'麻痺'}している`);
            flag.wait = true;
        } else {
            flag.wait = false;
            rogue.done = false;
        }
    }

    getEnergyAll() {
        let list = this.list;
        this.list = [];
        for (let fighter of list) {
            fighter.increaseEnergy();
            this.push(fighter);
        }
    }

    compare(i, j) {
        return this.list[i].energy > this.list[j].energy;
    }
}
