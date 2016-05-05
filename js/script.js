"use strict";
var $gallery;
var $gallery2;
var swiper;
function GetHeightCss() {
    var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

    var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
    var css = "";
    var fullh = 0;
    var fullhSingle = 0;
    var guttersize = 0;
    var mobile_guttersize = 0;
    fullh = h - (guttersize * 2);
    fullhSingle = h - mobile_guttersize;
    var smallh = h / 2;
    var halfh = fullh;
    if ((halfh % 2) == 0) { halfh = halfh / 2; }
    else { halfh = (halfh - 1) / 2; }
    css = '.height-one-one { height: ' + fullh + 'px;}';
    css += '.height-one-half { height: ' + halfh + 'px;}';
    css += '.page-portfolio-item-container.height-one-half.col-md-6.swiper-slide {height: ' + halfh + 'px !important;}';
    css += '@media screen and (max-width:1024px){';
    css += '.height-one-one {height: auto;}';
    css += '.height-one-half {height: auto;}';
    css += '.single-page-imagepart.height-one-one,.page-blog-inner-mobile-nav.height-one-one,.page-portfolio-inner-mobile-nav.height-one-one ,.page-blog-inner-mobile-nav.height-one-one { height: ' + smallh + 'px;}';
    css += '.single-page-contentpart.height-one-one { height: auto;}';
    css += '.pt-page.pt-mobile-menu.pt-page-current { min-height: ' + fullhSingle + 'px;}';
    css += '.page-blog.height-one-one,.container.site-container,.row.main-container.height-one-one { height: auto;}';
    css += '.comming-soon-page .height-one-one ,#page-home .height-one-one ,.page-portfolio.height-one-one,.page-blog.height-one-one,.container.site-container,.page-blog .page-blog-mobile-blog-list-container {height: ' + fullh + 'px;}';
    css += '.page-portfoilo-mobile-portfolio-list-container,.page-portfolio-item-container.height-one-half.col-md-6.swiper-slide {height: ' + fullh + 'px !important;}';
    css += '}';
    var cssEle = document.getElementById('heightStyle');

    if (cssEle == null) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute("id", "heightStyle");
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));

        }
        head.appendChild(style);
    }
    else {
        cssEle.innerHTML = css;
    }

    if (w > 1024 && $(".page-blog-item.flickity-enabled").length == 0) {
        $gallery2 = $('.page-blog-item').flickity({
            freeScroll: true,
            contain: true,
            prevNextButtons: true,
            pageDots: false,
            cellAlign: "left"
        });


        if (!(typeof swiper === 'undefined') && !(typeof swiper.destroy === 'undefined')) {
            swiper.destroy(true, true);
        };
    }
    else {
        if (w < 1025 && $(".page-blog-item.flickity-enabled").length > 0) {
            $gallery2.flickity('destroy');
        }

        swiper = new Swiper('.swiper-container', {
            pagination: '.page-portfoilo-mobile-portfolio-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });
    }
}
GetHeightCss();
$(window).resize(function () {
    GetHeightCss();
	resetItems();
});

$(function () {


    $(".top-menu-menu-appear").on("click", function (a) {
        a.preventDefault();
        if ($(this).hasClass("opened")) {
            $(this).removeClass("opened");
            $("body").removeClass("top-menu-menu-from-right-oppened");
        }
        else {
            $(this).addClass("opened");
            $("body").addClass("top-menu-menu-from-right-oppened");
        }
    });


    	function selectedSwitch() {
            
                $('.page-home-portfolio-category-lable').each(function() {
                    $(this).on("mouseover", function(e) {
                        e.preventDefault();
                        var current = $(this).data('selected');
                        $('#' + current).stop().animate({
                            'opacity': 1
                        }, 200);
                        $('#' + current).siblings().stop().animate({
                            'opacity': 0
                        }, 200);
                    });
                    $(this).on("mouseout", function(e) {
                        e.preventDefault();
                        var current = $(this).data('selected');
                        $('#' + current).stop().animate({
                            'opacity': 0
                        }, 200);
                    });
                });
            
        }
        selectedSwitch();


    $(".page-portfolio .page-portfolio-inner-items  .page-portfolio-inner-item").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            PageTransitions3.SwipeTriger(direction);
        },
        threshold: 70
    });
    $("div").scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('body').addClass('fixed-header');
        } else {
            $('body').removeClass('fixed-header');
        }
    });

    //$(".pt-page .page-portfolio .page-portfolio-inner-items .page-portfolio-inner-item:first").addClass("CurrentPost");
    $(".pt-page .page-blog .page-blog-inner-items .page-blog-inner-item:first").addClass("CurrentPost");

    $('.NiceScrollbar').scrollbar({ duration: 0 });

    $("#menu-btn,#mobile-menu-btn").on("click", function (e) {
        e.preventDefault();
        if ($("body").hasClass("menu-open")) {
            $("body").removeClass("menu-open");
        }
        else {
            $("body").addClass("menu-open");
        }
    });


    swiper = new Swiper('.swiper-container', {
        pagination: '.page-portfoilo-mobile-portfolio-pagination',
        paginationClickable: true,
        direction: 'vertical'
    });




    // portfolio animation start
    $(".page-portfolio-view").on("click", function (e) {
        e.preventDefault();

        $(".pt-page-current .page-portfolio .page-portfolio-inner-item").removeClass("pt-page-current");
        var curPost = $(this).attr("href");
        $(curPost).addClass("pt-page-current").addClass("ClickedPost");
        $(this).parents(".page-portfolio").addClass("post-over");
        setTimeout(function () {
            $(".pt-page-current .page-portfolio").addClass("open");
        }, 500);
        $("body").addClass("post-open");
        $(".page-portfolio-inner-nav-prev-outer,.page-portfolio-inner-nav-next-outer").fadeIn();

        $(".footer-filter-info-link").fadeIn('slow');
    });
    $(".page-portfolio-pagination-back,.page-portfolio-mobile-close").on("click", function () {
        var ClickedEle = this;
        $(".main-container  .pt-page.pt-page-current .page-portfolio.open  .page-portfolio-inner-item.pt-page-current .page.single-page  .single-page-contentpart").removeClass("open-content");
        var setPages = $('.pt-page-current.pt-page .page-portfolio  .page-portfolio-inner-items .page-portfolio-inner-item').not('.pt-page-current.pt-page .page-portfolio  .pt-page .page-portfolio-inner-items .page-portfolio-inner-item.item-filter');
        setPages.attr("data-enable", "true");
        setTimeout(function () {
            $(".pt-page-current .page-portfolio .page-portfolio-inner-item").removeClass("ClickedPost");
            var cls_page = $(".pt-page-current.pt-page .page-portfolio");
            cls_page.removeClass("open");
            $("body").removeClass("post-open");
            setTimeout(function () {
                cls_page.removeClass("post-over");
            }, 700);
        }, 500);
        $(".page-portfolio-inner-nav-prev-outer,.page-portfolio-inner-nav-next-outer").fadeOut();

        $(".footer-filter-info-link").fadeOut('slow');
    });



    $(".page-portfolio-pagination-info,.page-portfolio-close").on("click", function () {
        if ($(".main-container  .pt-page.pt-page-current .page-portfolio.open  .page-portfolio-inner-item.pt-page-current .page.single-page  .single-page-contentpart").hasClass("open-content")) {
            var cls_page = $(".main-container  .pt-page.pt-page-current .page-portfolio.open  .page-portfolio-inner-item.pt-page-current .page.single-page  .single-page-contentpart");
            cls_page.removeClass("open-content");
        }
        else {
            var cls_page = $(".main-container  .pt-page.pt-page-current .page-portfolio.open  .page-portfolio-inner-item.pt-page-current .page.single-page  .single-page-contentpart");
            cls_page.addClass("open-content");
        }

    });

    //portfolio post chagne navigation 





    // portfolio mobile navigation

    $(".page-portfolio-inner-mobile-nav .page-portfolio-inner-mobile-nav-next").on("click", function () {
        var cur_page = $(".pt-page-current .page-portfolio-inner-item.pt-page-current");
        var nxt_page = cur_page.next();
        if (nxt_page.length > 0 && (!nxt_page.hasClass("item-filter-links"))) {
            nxt_page.addClass("mob_next_page");
            setTimeout(function () {
                nxt_page.addClass("animate");
                setTimeout(function () {
                    nxt_page.addClass("pt-page-current");
                    nxt_page.removeClass("mob_next_page");
                    nxt_page.removeClass("animate");
                    cur_page.removeClass("pt-page-current");
                }, 800);
            }, 100);
        }
    });

    $(".page-portfolio-inner-mobile-nav .page-portfolio-inner-mobile-nav-prev").on("click", function () {
        var cur_page = $(".pt-page-current .page-portfolio-inner-item.pt-page-current");
        var nxt_page = cur_page.prev();
        if (nxt_page.length > 0 && (!nxt_page.hasClass("item-filter")) && (nxt_page.hasClass("page-portfolio-inner-item"))) {
            nxt_page.addClass("mob_prev_page");
            setTimeout(function () {
                nxt_page.addClass("animate");
                setTimeout(function () {
                    nxt_page.addClass("pt-page-current");
                    nxt_page.removeClass("mob_prev_page");
                    nxt_page.removeClass("animate");
                    cur_page.removeClass("pt-page-current");
                }, 800);
            }, 100);
        }
    });

    //portfolio mobile navigation 


    //portfolio filter start
    $(".page-portfolio-pagination-filter").on("click", function () {

        if ($(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items").hasClass("open-filter")) {
            $(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items").removeClass("open-filter");
            setTimeout(function () {
                $(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items").removeClass("filter-over");
            }, 500);
        } else {
            if ($(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items .page-portfolio-inner-item.pt-page-current .page-portfolio-inner-item-container .page.single-page  .single-page-contentpart").hasClass("open-content")) {
                var cls_page = $(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items .page-portfolio-inner-item.pt-page-current .page-portfolio-inner-item-container .page.single-page  .single-page-contentpart");
                cls_page.removeClass("open-content");
                setTimeout(function () {
                    $(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items").addClass("filter-over").addClass("open-filter");
                }, 800);

            }
            else {
                $(".main-container  .pt-page.pt-page-current .page-portfolio-inner-items").addClass("filter-over").addClass("open-filter");
            }
        }
    });
    //portfolio filter end







    // blog animation start
    $(".page-blog-view").on("click", function (e) {
        e.preventDefault();
        $(".pt-page-current .page-blog .page-blog-inner-item").removeClass("CurrentPost");
        var curPost = $(this).attr("href");
        $(curPost).addClass("ClickedPost").addClass("CurrentPost");
        $(this).parents(".page-blog").addClass("open").addClass("post-over");
        $("body").addClass("post-open");
        $(".page-blog-inner-nav-prev-outer,.page-blog-inner-nav-next-outer").toggle();
    });
    $(".page-blog-close,.page-blog-mobile-close").on("click", function () {
        $(".pt-page-current .page-blog .page-blog-inner-item").removeClass("ClickedPost");
        var cls_page = $(this).parents(".page-blog");
        cls_page.removeClass("open");
        $("body").removeClass("post-open");
        setTimeout(function () {
            cls_page.removeClass("post-over");
        }, 700);
        $(".page-blog-inner-nav-prev-outer,.page-blog-inner-nav-next-outer").toggle();
    });
    //Blog post chagne navigation 

    $(".page-blog-inner-nav .page-blog-inner-nav-next,.page-blog-inner-nav-outer .page-blog-inner-nav-next-outer").on("click", function () {
        var cur_page = $(".pt-page-current .page-blog-inner-item.CurrentPost");
        var nxt_page = cur_page.next();
        if (nxt_page.length > 0) {
            cur_page.addClass("cur_next_post_animate");
            nxt_page.addClass("next_post_animate");

            setTimeout(function () {
                cur_page.addClass("animate");
                nxt_page.addClass("animate");
                nxt_page.addClass("CurrentPost");
                nxt_page.addClass("ClickedPost");
                setTimeout(function () {
                    nxt_page.removeClass("next_post_animate");
                    nxt_page.removeClass("animate");
                    cur_page.removeClass("CurrentPost");
                    cur_page.removeClass("ClickedPost");
                    cur_page.removeClass("animate");
                    cur_page.removeClass("cur_next_post_animate");
                }, 800);
            }, 100);
        }
    });

    $(".page-blog-inner-nav .page-blog-inner-nav-prev,.page-blog-inner-nav-outer .page-blog-inner-nav-prev-outer").on("click", function () {
        var cur_page = $(".pt-page-current .page-blog-inner-item.CurrentPost");
        var nxt_page = cur_page.prev();
        if (nxt_page.length > 0 && (!nxt_page.hasClass("item-filter")) && (nxt_page.hasClass("page-blog-inner-item"))) {
            nxt_page.addClass("prev_post_animate");
            cur_page.addClass("cur_prev_post_animate");
            setTimeout(function () {
                nxt_page.addClass("animate");
                cur_page.addClass("animate");
                setTimeout(function () {
                    nxt_page.addClass("CurrentPost");
                    nxt_page.addClass("ClickedPost");
                    cur_page.removeClass("CurrentPost");
                    cur_page.removeClass("ClickedPost");
                    setTimeout(function () {
                        nxt_page.removeClass("prev_post_animate");
                        nxt_page.removeClass("animate");
                        cur_page.removeClass("cur_prev_post_animate");
                        cur_page.removeClass("animate");
                    }, 1200);

                }, 100);
            }, 100);
        }
    });




    // blog animation close

    // blog mobile navigation

    $(".page-blog-inner-mobile-nav .page-blog-inner-mobile-nav-next").on("click", function () {
        var cur_page = $(".pt-page-current .page-blog-inner-item.CurrentPost");
        var nxt_page = cur_page.next();
        if (nxt_page.length > 0) {
            nxt_page.addClass("mob_next_page");
            setTimeout(function () {
                nxt_page.addClass("animate");
                setTimeout(function () {
                    nxt_page.addClass("CurrentPost");
                    nxt_page.removeClass("mob_next_page");
                    nxt_page.removeClass("animate");
                    cur_page.removeClass("CurrentPost");
                }, 800);
            }, 100);
        }
    });

    $(".page-blog-inner-mobile-nav .page-blog-inner-mobile-nav-prev").on("click", function () {
        var cur_page = $(".pt-page-current .page-blog-inner-item.CurrentPost");
        var nxt_page = cur_page.prev();
        if (nxt_page.length > 0 && (!nxt_page.hasClass("item-filter")) && (nxt_page.hasClass("page-blog-inner-item"))) {
            nxt_page.addClass("mob_prev_page");
            setTimeout(function () {
                nxt_page.addClass("animate");
                setTimeout(function () {
                    nxt_page.addClass("CurrentPost");
                    nxt_page.removeClass("mob_prev_page");
                    nxt_page.removeClass("animate");
                    cur_page.removeClass("CurrentPost");
                }, 800);
            }, 100);
        }
    });

    //blog mobile navigation 

    $gallery = $('.gallery').flickity({
        freeScroll: true,
        contain: true,
        prevNextButtons: true,
        pageDots: false,
        cellAlign: "center"
    });
    $gallery.on('dragStart', function (event, pointer) { $("body").addClass("dragging"); });
    $gallery.on('dragEnd', function (event, pointer) { $("body").removeClass("dragging"); });


    


    // Contact form script

    // validate signup form on keyup and submit
    var validator = $("#contact-form").validate({
        rules: {
            txtname: "required",
            txtemail: {
                required: true,
                email: true
            },
            txtwebsite: "required",
            txtcomment: "required"
        },
        messages: {
            txtname: "Please enter your name",
            txtemail: "Please enter a valid email address",
            txtwebsite: "Please enter your website",
            txtcomment: "Please enter your comment"
        },
        submitHandler: function (form) {
            jQuery(form).ajaxSubmit({
                target: "#formresult",
                success: function () {
                    validator.resetForm();
                }
            });
        }
    });

    // Contact form script
	$( window ).on( "orientationchange", function( event ) {
		resetItems();
	});

});





function EventOnpageChange() {
    $('.NiceScrollbar').scrollbar({ duration: 0 });
}


function resetItems() {
    
    if (!(typeof $gallery2 === 'undefined')) {
        $gallery2.flickity('resize');
    };
    if (!(typeof swiper === 'undefined') && !(typeof swiper.update === 'undefined')) {
        swiper.update();   
		setTimeout(function(){swiper.update();},500);
    };
}