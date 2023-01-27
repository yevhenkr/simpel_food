$(function() {
  var mixer = mixitup('.category__grid');
  
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