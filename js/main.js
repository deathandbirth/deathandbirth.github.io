$(function() {

    $('.navbar-brand, .nav-link:not(.nav-play), .nav-back').click(function(event) {
        event.preventDefault();
        var speed = 1000;
        var href= $(this).attr('href');
        var top = $(href === '#' ? 'html' : href).offset().top;
        var offset = $('nav').outerHeight();
        $('html, body').animate({ scrollTop: top - offset }, speed);
    });

    function parallax() {
		var top = $(document).scrollTop();
        $('.header-bg').css({
			'top': - top / 2 + 'px'
		});
    }

    function changeNavColor() {
        var $this = $('nav');
        var name = 'navbar-transparent';
        var height = $this.outerHeight();
        var top = $this.offset().top;
        if (top > height) {
            $this.removeClass(name);
        } else {
            $this.addClass(name);
        }
    }

    $(window).on('load scroll', function(){
        parallax();
        changeNavColor();
    });

    $('.music-btn').on('click', function(){
        $this = $(this);
        var audio = $this.siblings('audio')[0];
        var $popup = $this.siblings('.popup');
        var $icon = $this.children('i');
        $icon.toggleClass('fa-volume-off');
        $icon.toggleClass('fa-volume-up');
        if (audio.paused) {
            audio.play();
            $popup.text('Sound Off');
        } else {
            audio.pause();
            $popup.text('Sound On');
        }
    });

    function getMousePos(e) {
        var rect = e.currentTarget.getBoundingClientRect();
        var offsetX = 10;
        var offsetY = 15;
        var x = e.clientX - rect.left + offsetX;
        var y = e.clientY - rect.top + offsetY;
        return { x: x, y: y };
    }

    $('.music-btn').on({
        'mouseenter': function(e) {
            var pos = getMousePos(e);
            $(this).siblings('.popup')
                .css({
                    'top': pos.y,
                    'left': pos.x 
                })
                .fadeIn('fast');
        },

        'mousemove': function(e) {
            var pos = getMousePos(e);
            $(this).siblings('.popup')
                .css({
                    'top': pos.y,
                    'left': pos.x - 80 
                });
        },

        'mouseleave': function() {
            $(this).siblings('.popup').fadeOut('fast');
        }
    });

    $('.game-link').on({
        'mouseenter':function(){
            var $ele = $(this).find('.play-at');
            $ele.fadeOut(function(){
                $ele.text('@')
                    .fadeIn(function(){
                        $ele.addClass('bounce');
                    })
            })
        },
        'mouseleave':function(){
            var $ele = $(this).find('.play-at');
            $ele.removeClass('bounce');
        }
    });
    
    $('.link-box').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('slideInLeft');
            $(this).css({ 'opacity': 1});
        } else {
        }
    });
    $('.section-news .news-box').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeIn');
        } else {
        }
    });
    $('.section-system h3').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeInDown');
        } else {
        }
    });
    $('.section-system .img-box.left').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeInLeft');
        } else {
        }
    });
    $('.section-system .img-box.right').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeInRight');
        } else {
        }
    });
    $('.section-system .text-box').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeInUp');
        } else {
        }
    });
    $('.section-story p, .section-story small').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeIn slow');
        } else {
        }
    });
    $('.section-spec .text-box').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeIn');
        } else {
        }
    });
    $('.section-line').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeIn');
        } else {
        }
    });
});
