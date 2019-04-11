window.onload = () => {
    display.change(option.display.user);
    vuejs.loader();
    Vue.nextTick(function(){
        game.title(true);
        document.getElementById("game-loader").classList.remove('hide');
        input.init();
    });
}
