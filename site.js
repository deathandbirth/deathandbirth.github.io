(function() {
    var recipeClose = true;
    document.getElementById("site-recipe-btn").onclick = function() {
        var style = document.getElementById("site-recipe-container").style;
        style.display = recipeClose ? 'block' : 'none';
        recipeClose = !recipeClose;
        if (!cmdClose) {
            style = document.getElementById("site-command-container").style;
            style.display = 'none';
            cmdClose = true;
        }
    };

    var cmdClose = true;
    document.getElementById("site-command-btn").onclick = function() {
        var style = document.getElementById("site-command-container").style;
        style.display = cmdClose ? 'block' : 'none';
        cmdClose = !cmdClose;
        if (!recipeClose) {
            style = document.getElementById("site-recipe-container").style;
            style.display = 'none';
            recipeClose = true;
        }
    };
})();
