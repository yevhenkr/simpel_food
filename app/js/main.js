$(function () {
  $('.burger').on('click', function () {
    $('.header__menu').toggleClass('header__menu--сurtain');
  });

  $('.reviews__inner').slick({
    dots: true,
    infinite: false,
    arrows: true
  });

  var mixer = mixitup('.category__grid');
  mixer.filter('.burger-cat');

  const headearHeight = $('.header').outerHeight();

  $('.header__link').on('click', function (event) {
    event.preventDefault();

    const scrollAnchor = $(this).attr('href');

    let scrollPoint = $(scrollAnchor).offset().top - headearHeight;

    $('html, body').animate({
      scrollTop: scrollPoint
    }, 200);
    return false;
  });

  var firstScroll = true;
  $(window).on('scroll', function () {
    if (firstScroll) {
      $(".header__nav").animate({ height: "60px" }, 500);
      firstScroll = false;
    }
  });
});