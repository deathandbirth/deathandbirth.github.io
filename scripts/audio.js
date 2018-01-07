const [
    IN,
    OUT
] = enums(1, 2);

const audio = {
    volBGM: 1,
    volSE: 1,
    music: {
        title: new Audio('music/title.ogg'),
        town: new Audio('music/town.ogg'),
        town2: new Audio('music/town2.ogg'),
        dungeon: new Audio('music/dungeon.ogg'),
        dungeon2: new Audio('music/dungeon2.ogg'),
        dungeon3: new Audio('music/dungeon3.ogg'),
        dungeon4: new Audio('music/dungeon4.ogg'),
        boss: new Audio('music/boss.ogg'),
        gameover: new Audio('music/gameover.ogg'),
    },

    sound: {
        level: new Audio('sound/level.wav'),
        opendoor: new Audio('sound/opendoor.wav'),
        shutdoor: new Audio('sound/shutdoor.wav'),
        teleport: new Audio('sound/teleport.wav'),
        curse: new Audio('sound/curse.wav'),
        amulet: new Audio('sound/amulet.wav'),
        ring: new Audio('sound/ring.wav'),
        gem: new Audio('sound/gem.wav'),
        grab: new Audio('sound/grab.wav'),
        tplevel: new Audio('sound/tplevel.wav'),
        dig: new Audio('sound/dig.wav'),
        coin: new Audio('sound/coin.wav'),
        hitwall: new Audio('sound/hitwall.wav'),
        uncurse: new Audio('sound/uncurse.wav'),
        swing: new Audio('sound/swing.wav'),
        kill: new Audio('sound/kill.wav'),
        paralyze: new Audio('sound/paralyze.wav'),
        blind: new Audio('sound/blind.wav'),
        probe: new Audio('sound/probe.wav'),
        summon: new Audio('sound/summon.wav'),
        hungry: new Audio('sound/hungry.wav'),
        probe2: new Audio('sound/probe2.wav'),
        fire: new Audio('sound/fire.wav'),
        air: new Audio('sound/wind.wav'),
        acid: new Audio('sound/acid.wav'),
        speed: new Audio('sound/speed.wav'),
        slow: new Audio('sound/slow.wav'),
        staircase: new Audio('sound/staircase.wav'),
        broken: new Audio('sound/broken.wav'),
    },

    init() {
        for (let key in this.music) {
            this.music[key].currentTime = 0;
        }
    },

    fadeIn(track) {
        if (track.fade !== IN) return;
        if (track.volume < this.volBGM) {
            track.volume = Math.round((track.volume + 0.1) * 10) / 10;
            setTimeout(this.fadeIn.bind(this, track), 100);
        } else {
            track.fade = null;
        }
    },

    fadeOut(track, loop) {
        if (track.fade !== OUT) return;
        if (track.volume > 0) {
            track.volume = Math.round((track.volume - 0.1) * 10) / 10;
            setTimeout(this.fadeOut.bind(this, track, loop), 100);
        } else {
            if (!loop) track.pause();
            track.fade = null;
        }

    },

    playSafely(track) { //play() request error
        setTimeout(() => {
            if (this.curTrack === track.title && track.paused) track.play();
        }, 0);
    },

    playMusic(trackName) {
        if (!this.music[trackName]) return;
        let track = this.music[trackName];
        this.curTrack = trackName;
        track.volume = 0;
        track.fade = IN;
        this.fadeIn(track);
        if (!option.mute.user) this.playSafely(track);
    },

    playSound(trackName, distance) {
        if (!this.sound[trackName]) return;
        let track = this.sound[trackName];
        if (!distance) {
            track.volume = this.volSE;
        } else {
            if (distance > HEARING_SQ) return;
            let vol = Math.round(this.volSE * (1 - distance / HEARING_SQ) * 10) / 10;
            track.volume = vol;
        }

        track.currentTime = 0;
        if (!option.mute.user) track.play();
    },

    stop(trackName) {
        if (!trackName) return;
        let track = this.music[trackName];
        track.fade = OUT;
        this.fadeOut(track);
    },

    mute() {
        option.mute.user = !option.mute.user;
        let track = this.music[this.curTrack];
        option.mute.user ? track.pause() : this.playSafely(track);
    },

    getDungeonTrack(lvl, boss) {
        return lvl < 10 ? 'dungeon' :
            lvl < 20 ? 'dungeon2' :
            lvl < 30 ? 'dungeon3' :
            !boss ? 'dungeon4' :
            'boss';
    }
};

{
    for (let key in audio.music) {
        let track = audio.music[key];
        track.title = key;
        track.addEventListener('timeupdate', function() {
            if (this.fade !== OUT && this.currentTime >= this.duration - 0.5) {
                this.fade = OUT;
                audio.fadeOut(this, true);
            }
        }, false);
        track.addEventListener('ended', function() {
            if (audio.curTrack === key) {
                this.fade = IN;
                audio.fadeIn(this);
                audio.playSafely(this);
            }
        }, false);
    }
}
