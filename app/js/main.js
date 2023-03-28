$(function () {

  $('img').on('error', function () {
    $(this).attr('src', '../images/no-image.jpg');
    $(this).css({
      'border-radius': '0 0 0 0'
    });
  });

  if (window.innerWidth <= 992) {
    const burger = document.querySelector('.burger-btn');
    const crossBtn = document.querySelector('.cross-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    $('.burger-btn').on('click', function () {
      $('.mobile-nav').toggleClass('open');
      $('.header').toggleClass('lock');
    })

    $('.cross-btn').on('click', function () {
      $('.mobile-nav').toggleClass('open');
      $('.header').toggleClass('lock');
    })

    document.addEventListener('click', function (e) {
      if (e.target !== burger && e.target !== crossBtn && e.target !== mobileNav) {
        $('.mobile-nav').removeClass('open');
        $('.header').removeClass('lock');
      }
    });
  }

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