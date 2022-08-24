window.addEventListener("scroll", function () {
  if (window.pageYOffset > 200) {
    $("#notification-bar").addClass("up");
    $(".nav-bar").addClass("up");
    $(".site-header").addClass("up");
  } else {
    $("#notification-bar").removeClass("up");
    $(".nav-bar").removeClass("up");
    $(".site-header").removeClass("up");
  }
});
