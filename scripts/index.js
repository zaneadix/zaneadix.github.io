
$(function() {

    var $window = $(window);
    var $header = $('header.navbar');
    var $postHeaders = $('.post-header');
    var $ratings = $('.rating');

    // function initRatings () {
    //     $ratings.each(function (index) {
    //         $rating = $(this);
    //         $fill = $rating.find('.fill');
    //         $fill.attr('style', 'width: 0%');
    //     })
    // }

    function initFixiePositions () {
        $header.data('setHeight', $header.outerHeight());
        $postHeaders.each(function () {
            $postHeader = $(this);
            var attrs = scrubFixie($postHeader);
            setFixiePositions($postHeader);
            $postHeader
                .attr('class', attrs.clazz)
                .attr('style', attrs.style);
        });
        fixieCheck();
    }

    function setFixiePositions ($postHeader) {
        $postHeader
            .data('setTop', $postHeader.offset().top)
            .data('setHeight', $postHeader.outerHeight())
            .parent()
            .height($postHeader.outerHeight());
    }

    function scrubFixie ($postHeader) {
        var attrs = {};
        attrs.clazz = $postHeader.attr('class');
        attrs.style = $postHeader.attr('style');
        $postHeader.removeClass('fix push').removeAttr("style");
        return attrs;
    }
    
    function fixieCheck () {

        var headerHeight = $header.data('setHeight');

        $postHeaders.each(function (index) {

            var $postHeader = $(this);
            var $post = $postHeader.parents('.post');
            var $postContent = $post.find('.post-content');

            var scrollTop = $window.scrollTop();
            var setTop = $postHeader.data('setTop');
            var postBottom = ($postContent.offset().top + $postContent.outerHeight()) - $postHeader.data('setHeight');


            if (setTop <= (scrollTop + headerHeight)) {
                $postHeader.addClass("fix").css("top", headerHeight);
                if ((scrollTop+headerHeight) >= postBottom) {
                    $postHeader.addClass("push").css("top", postBottom);
                } else {
                    $postHeader.removeClass("push").css("top", headerHeight);
                }
            } else {
                scrubFixie($postHeader);
            }

            // if (setTop <= ($window.scrollTop() + headerHeight)) {
                
            //     var $nextPostHeader = $postHeaders.eq(index+1);
            //     var pushPosition = $nextPostHeader.data('setTop') - $postHeader.data('setHeight');

            //     if ($nextPostHeader.length && ($postHeader.offset().top >= pushPosition)) {
            //         $postHeader.addClass("push").css("top", pushPosition);
            //     } else {
            //         $postHeader.addClass("fix").css("top", headerHeight);
            //     }

            // } else {

            //     scrubFixie($postHeader);
            //     var $prevPostHeader = $postHeaders.eq(index-1);

            //     if ($prevPostHeader.length && $prevPostHeader.hasClass('push')) {
            //         if ($prevPostHeader.offset().top >= ($window.scrollTop() + headerHeight)) {
            //             $prevPostHeader.removeClass("push").css("top", headerHeight);
            //         }
            //     }
            // }
        });
    }

    $postHeaders.wrap('<div class="fixieHeightKeeper" />');
    $window.on('resize', initFixiePositions);
    $window.on("scroll", fixieCheck);
    initFixiePositions();
    // initRatings();
});