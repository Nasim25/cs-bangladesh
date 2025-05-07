
$(document).ready(function () {
    // Initialize AOS animation
    AOS.init({
        once: true,
        offset: 100
    });

    // Check if device is mobile or desktop
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
        // COMPLETELY NEW APPROACH FOR MOBILE

        // 1. Prevent Bootstrap's default dropdown behavior from closing dropdowns when clicking inside
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });

        // 2. Handle submenu parent clicks
        $(document).on('click', '.submenu-parent', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const $submenu = $(this).next('.dropdown-submenu');

            // Toggle only this submenu
            if ($submenu.hasClass('show')) {
                $submenu.removeClass('show');
            } else {
                // Close other submenus at the same level
                $(this).parent().siblings().find('.dropdown-submenu').removeClass('show');
                $submenu.addClass('show');
            }

            return false;
        });

        // 3. Keep parent dropdown open when clicking anywhere inside it
        $('.dropdown').on('hide.bs.dropdown', function (e) {
            // Only if we're on mobile
            if (window.innerWidth <= 992) {
                // If the click was inside this dropdown, prevent it from closing
                if ($(e.target).closest('.dropdown-menu').length) {
                    e.preventDefault();
                }
            }
        });

        // 4. Make sure clicking on submenu items doesn't close the menu
        $(document).on('click', '.dropdown-submenu .dropdown-item', function (e) {
            // If this is a link to a page, allow normal behavior
            if ($(this).attr('href') && $(this).attr('href') !== '#') {
                return true;
            }

            // Otherwise prevent default and stop propagation
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }

    // Handle window resize
    $(window).resize(function () {
        const isNowMobile = window.innerWidth <= 992;

        // If switched from mobile to desktop or vice versa, reload to reset menu behavior
        if (isNowMobile !== isMobile) {
            location.reload();
        }
    });
});

// Navbar scroll effect
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
});
