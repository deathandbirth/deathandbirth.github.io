window.onload = () => {
    vueInit();
    Vue.nextTick(function(){
        display.init();
        game.title(true);
        input.init();
    });
}
