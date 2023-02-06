$(function () {
  $('.reviews__inner').slick({
    dots: true,
    arrows: true
  });

  var mixer = mixitup('.category__grid');
  mixer.filter('.burger');

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


});