(function() {
    function modalOpen() {
        var $this = $(this);
        if ($this.hasClass('modal-open')) return false;
        if ($('.modal-open').length) modalClose();
        var href = $this.attr('href');
        $(href).show();
        $this.addClass('modal-open');
        return false;
    }

    function modalClose() {
        $('.modal-container').hide();
        $('.modal-link').removeClass('modal-open');
        return false;
    }

    $('.modal-link').on('click', modalOpen);
    $('.modal-overlay').on('click', modalClose);
})();
