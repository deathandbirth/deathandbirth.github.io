window.onload = () => {
    vuejs.loader();
    Vue.nextTick(function(){
        game.title(true);
        input.init();
    });
}
