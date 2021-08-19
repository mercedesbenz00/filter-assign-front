import $ from '../Common/wrapper.js';

export default (navigator, closeSidebar) => {

    var $html = $('html');
    var $body = $('body');
    var $sidebar = $('.sidebar');

    // AUTOCOLLAPSE ITEMS
    // -----------------------------------

    var sidebarCollapse = $sidebar.find('.collapse');
    sidebarCollapse.on('show.bs.collapse', function(event) {

        event.stopPropagation();
        if ($(this).parents('.collapse').length === 0)
            sidebarCollapse.filter('.show').collapse('hide');

    });

    // SIDEBAR COLLAPSED ITEM HANDLER
    // -----------------------------------


    var eventName = isTouch() ? 'click' : 'mouseenter';
    var subNav = $();
    $sidebar.find('.sidebar-nav > li').on(eventName, function() {

        if (isSidebarCollapsed() || useAsideHover()) {

            subNav.trigger('mouseleave');
            subNav = toggleMenuItem($(this));

            // Used to detect click and touch events outside the sidebar
            sidebarAddBackdrop();
        }

    });

    var sidebarAnyclickClose = $sidebar.data('sidebarAnyclickClose');

    // Allows to close
    if (typeof sidebarAnyclickClose !== 'undefined') {

        $('.wrapper').on('click.sidebar', function(e) {
            // don't check if sidebar not visible
            if (!isSidebarToggled()) return;

            var $target = $(e.target);
            if (!$target.parents('.aside-container').length && // if not child of sidebar
                !$target.parents('.topnavbar-wrapper').length && // if not child of header
                !$target.is('#user-block-toggle') && // user block toggle anchor
                !$target.parent().is('#user-block-toggle') // user block toggle icon
            ) {
                closeSidebar()
            }

        });
    }



    function sidebarAddBackdrop() {
        var $backdrop = $('<div/>', { 'class': 'sidebar-backdrop' });
        $backdrop.insertAfter('.aside-container').on("click mouseenter", function() {
            removeFloatingNav();
        });
    }

    // Open the collapse sidebar submenu items when on touch devices
    // - desktop only opens on hover
    function toggleTouchItem($element) {
        $element
            .siblings('li')
            .removeClass('open');
        $element
            .toggleClass('open');
    }

    // Handles hover to open items under collapsed menu
    // -----------------------------------
    function toggleMenuItem($listItem) {

        removeFloatingNav();

        var ul = $listItem.find('.sidebar-nav');

        if (!ul.length) return $();
        if ($listItem.hasClass('open')) {
            toggleTouchItem($listItem);
            return $();
        }

        var $aside = $('.aside-container');
        var $asideInner = $('.aside-inner'); // for top offset calculation
        // float aside uses extra padding on aside
        var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);

        var subNav = reactClone(ul.clone()).appendTo($aside);

        toggleTouchItem($listItem);

        var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
        var vwHeight = document.body.clientHeight;

        subNav.find('a')
            .on('click.subnav', function(e) {
                e.preventDefault();
                var href = $(this).attr('href');
                navigator(href);
            });

        subNav
            .addClass('nav-floating')
            .css({
                position: isFixed() ? 'fixed' : 'absolute',
                top: itemTop,
                bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

        subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
        });

        return subNav;
    }

    function reactClone(domNode) {
        // quick element clone using a dummy reactid
        // domNode.find('[data-reactid]').andSelf().each(function(idx, el){
        //     el.setAttribute('data-reactid', el.getAttribute('data-reactid') + ('.0'+idx));
        // });
        return domNode;
    }

    function removeFloatingNav() {
        $('.sidebar-subnav.nav-floating').remove();
        $('.sidebar-backdrop').remove();
        $('.sidebar li.open').removeClass('open');
    }

    function isTouch() {
        return $html.hasClass('touch');
    }

    function isSidebarCollapsed() {
        return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
    }
    function isSidebarToggled() {
        return $body.hasClass('aside-toggled');
    }
    /*
    function isMobile() {
        return document.body.clientWidth < APP_MEDIAQUERY.tablet;
    }*/
    function isFixed() {
        return $body.hasClass('layout-fixed');
    }

    function useAsideHover() {
        return $body.hasClass('aside-hover');
    }

} // rendered