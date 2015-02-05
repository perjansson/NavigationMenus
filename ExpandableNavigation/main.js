$(document).ready(function ($) {
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
        $content_wrapper = $('.cd-main-content'),
        $navigation = $('header');

    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function (event) {
        event.preventDefault();

        $lateral_menu_trigger.toggleClass('is-clicked');
        $navigation.toggleClass('lateral-menu-is-open');
        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $('body').toggleClass('overflow-hidden');
        });
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');

        //check if transitions are not supported - i.e. in IE9
        if ($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    });

    //close lateral menu clicking outside the menu itself
    $content_wrapper.on('click', function (event) {
        if (!$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span')) {
            $lateral_menu_trigger.removeClass('is-clicked');
            $navigation.removeClass('lateral-menu-is-open');
            $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').removeClass('overflow-hidden');
            });
            $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
            //check if transitions are not supported
            if ($('html').hasClass('no-csstransitions')) {
                $('body').removeClass('overflow-hidden');
            }
        }
    });

    // First level navigation clicked
    $('.first-level-navigation').children('a').on('click', function (event) {
        console.log("1 level clicked!");
        $(this).toggleClass('submenu-open').next('.second-level-navigation').slideToggle(200).end().parent('.first-level-navigation').siblings('.first-level-navigation').children('a').removeClass('submenu-open').next('.second-level-navigation').slideUp(200);
    });

    // Second level navigation clicked
    $('.second-level-navigation').children('li').children('a').on('click', function (event) {
        console.log("2 level clicked!");
    });

    $(window).on('hashchange', function () {
        $('#header').text(location.hash.slice(1));
    });
});