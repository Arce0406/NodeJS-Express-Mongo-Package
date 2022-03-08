
$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger.top-navbar-menu-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(this).toggleClass("is-active");
        $("#top-navbar-menu").toggleClass("is-active");;
    });

    $(".navbar-burger.side-menu-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(this).toggleClass("is-active");
        $(".sidebar-menu").toggleClass("is-active");
    });
});
