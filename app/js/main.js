$(function () {

  $('img').on('error', function () {
    $(this).attr('src', '../images/no-image.jpg');
    $(this).css({
      'border-radius': '0 0 0 0'
    });
  });

  $('.burger-btn').on('click', function () {
    $('.curtain').toggleClass('curtain-onscreen');
    $('.curtaine-bg-disappear').toggleClass('curtaine-bg-appear');
  });

  $('.cross-btn').on('click', function () {
    $('.curtain').toggleClass('curtain-onscreen');
    $('.curtaine-bg-disappear').toggleClass('curtaine-bg-appear');
  });

  $('.reviews__inner').slick({
    dots: true,
    infinite: false,
    arrows: true,
    appendDots: '.review-scroller',
    appendArrows: '.review-scroller'
  });

  if (window.innerWidth < 768) {
    $('.restaurants__list').slick({
      dots: true,
      infinite: false,
      arrows: false,
      vertical: false,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  var mixer = mixitup('.category__grid');
  mixer.filter('.burger-cat');

  const headearHeight = 60;

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