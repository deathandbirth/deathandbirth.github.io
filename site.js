(function() {
    var close = true;
    document.getElementById("recipe-btn").onclick = function() {
        var style = document.getElementById("recipe-container").style;
        style.display = close ? 'block' : 'none';
        close = !close;
    };
})();
