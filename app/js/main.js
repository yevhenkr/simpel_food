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
});

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
});