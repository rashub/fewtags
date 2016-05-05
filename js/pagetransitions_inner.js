var PageTransitions2 = (function() {

	var $main2 = $( '.page-home-portfolio-items' ),
		$pages2 = $main2.children( '.page-home-portfolio-item' ),
		$iterate = $( '.page-home-portfolio-pagination-next,.page-home-portfolio-pagination-prev,#page-home .page-home-portfolio-mobile-nav .page-home-portfolio-mobile-nav-next,#page-home .page-home-portfolio-mobile-nav .page-home-portfolio-mobile-nav-prev' ),
		animcursor2 = 51,
		current2 = 0,
		isAnimating2 = false,
		endCurrPage2 = false,
		endNextPage2 = false,
		animEndEventName2s2 = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName2 = animEndEventName2s2[ Modernizr.prefixed( 'animation' ) ],
		// support2 css animations
		support2 = Modernizr.cssanimations;
	function SwipeTriger(direction) {
        if( isAnimating2 ) {
				return false;
			}
        if(direction=="left")
        {
            $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item[data-enable="true"]' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
            current2 = $pages2.filter('.pt-page-current');
            current2 = $pages2.index(current2);
            current2++;
            if(current2== $pages2.length)
            {
                return;
            }
		    nextPage( animcursor2 ,current2);
        }
        else if(direction=="right")
        {
            $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item[data-enable="true"]' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
            current2 = $pages2.filter('.pt-page-current');
            current2 = $pages2.index(current2);
            current2--;
            if(current2<0)
            {
                return;
            }
		    nextPage( 50 ,current2);
        }


        current2 = $pages2.filter('.pt-page-current');
        current2 = $pages2.index(current2);
        current2++;
        if(current2== $pages2.length)
        {
        current2=0;
        }
		nextPage( animcursor2 ,current2);

    }
	function init() {


        $main2.each( function() {
			var $pagesinner = $( this ).children( '.page-home-portfolio-item' );
            $pagesinner.each( function() {
			    var $page = $( this );
			    $page.data( 'originalClassList', $page.attr( 'class' ) );
		    } );
            $pages2 = $( this ).children( '.page-home-portfolio-item[data-enable="true"]' ).not('.page-home-portfolio-item.item-filter');
            $pages2.eq( current2 ).addClass( 'pt-page-current' );
		} );







		//$pages2.each( function() {
		//	var $page = $( this );
		//	$page.data( 'originalClassList', $page.attr( 'class' ) );
		//} );
        //$pages2 = $main2.children( '.page-home-portfolio-item[data-enable="true"]' ).not('.page-home-portfolio-item.item-filter');
        //$pages2.eq( current2 ).addClass( 'pt-page-current' );

        $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');

		$iterate.on( 'click', function(e) {
        e.preventDefault();
			if( isAnimating2 ) {
				return false;
			}
            var type = $(this).attr("data-type");
            if(type=="filter"){
                $pages2 = $('.pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
                nextPage( animcursor2 ,0);
            }
            else if(type=="filter-portfolio")
            {

                if ($(".main-container  .pt-page.pt-page-current .page-home-portfolio-items").hasClass("open-filter")) {
                    $(".main-container  .pt-page.pt-page-current .page-home-portfolio-items").removeClass("open-filter");
                    setTimeout(function () {
                        $(".main-container  .pt-page.pt-page-current .page-home-portfolio-items").removeClass("filter-over");
                    }, 500);
                }
                var filterval = $(this).attr('data-filter');
                $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
                $pages2.attr("data-enable","true");
                if(filterval!='')
                {
                    $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter , .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter-'+filterval);
                    $pages2.attr("data-enable","false");
                    $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item[data-enable="true"]' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
                    nextPage( animcursor2 ,0);
                }
            }
            else if(type=="next")
            {
                $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item[data-enable="true"]' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
                current2 = $pages2.filter('.pt-page-current');
                current2 = $pages2.index(current2);
                current2++;
                if(current2== $pages2.length)
                {
                    return;
                }
			    nextPage( animcursor2 ,current2);
            }
            else if(type=="prev")
            {
                $pages2 = $( ' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item[data-enable="true"]' ).not(' .pt-page.pt-page-current .page-home-portfolio-items .page-home-portfolio-item.item-filter');
                current2 = $pages2.filter('.pt-page-current');
                current2 = $pages2.index(current2);
                current2--;
                if(current2<0)
                {
                    return;
                }
			    nextPage( animcursor2 ,current2);
            }


            current2 = $pages2.filter('.pt-page-current');
            current2 = $pages2.index(current2);
            current2++;
            if(current2== $pages2.length)
            {
            current2=0;
            }
			nextPage( animcursor2 ,current2);
		} );

	}

	function nextPage(options , next_page) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating2 ) {
			return false;
		}

		isAnimating2 = true;
		

        if(current2<$pages2.length)
        {
            $(".page-home-portfolio-pagination-next").removeClass("disabled");
        }
        if(current2>0)
        {
            $(".page-home-portfolio-pagination-prev").removeClass("disabled");
        }
        if((current2+1)==$pages2.length)
        {
            $(".page-home-portfolio-pagination-next").addClass("disabled");
        }
        if((current2)==0)
        {
            $(".page-home-portfolio-pagination-prev").addClass("disabled");
        }
        

		var $currPage = $(" .pt-page.pt-page-current  .page-home-portfolio-item.pt-page-current");

		var $nextPage = $pages2.eq( next_page ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName2, function() {
			$currPage.off( animEndEventName2 );
			endCurrPage2 = true;
			if( endNextPage2 ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName2, function() {
			$nextPage.off( animEndEventName2 );
			endNextPage2 = true;
			if( endCurrPage2 ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support2 ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage2 = false;
		endNextPage2 = false;
		resetPage( $outpage, $inpage );
		isAnimating2 = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
        SwipeTriger: SwipeTriger,
	};

})();