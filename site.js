(function() {
    var recipeClose = true;
    document.getElementById("recipe-btn").onclick = function() {
        var style = document.getElementById("recipe-container").style;
        style.display = recipeClose ? 'block' : 'none';
        recipeClose = !recipeClose;
        if (!cmdClose) {
            style = document.getElementById("command-container").style;
            style.display = 'none';
            cmdClose = true;
        }
    };

    var cmdClose = true;
    document.getElementById("command-btn").onclick = function() {
        var style = document.getElementById("command-container").style;
        style.display = cmdClose ? 'block' : 'none';
        cmdClose = !cmdClose;
        if (!recipeClose) {
            style = document.getElementById("recipe-container").style;
            style.display = 'none';
            recipeClose = true;
        }
    };
})();
