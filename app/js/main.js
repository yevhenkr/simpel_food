
document.addEventListener("DOMContentLoaded", () => {

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

  const filterBtns = document.querySelectorAll(".categories-nav__btn");
  const grid = document.querySelector(".categories-list");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
      });
      // add active class to clicked button
      btn.classList.add("active");

      // get the filter value from the clicked button
      const filterValue = btn.getAttribute("data-filter");

      // filter the grid items based on the filter value
      for (const item of grid.children) {
        if (filterValue === "all") {
          // item.style.display = "block";
          item.classList.remove('hide');
          item.classList.add('show');
        } else if (item.classList.contains(filterValue)) {
          // item.style.display = "block";
          item.classList.remove('hide')
          item.classList.add('show')
        } else {
          // item.style.display = "none";
          item.classList.remove('show')
          item.classList.add('hide')
        }
      }
    });
  });

  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  const swiper = new Swiper(".reviews__slider", {
    pagination: {
      el: ".reviews__dots",
      bulletClass: 'reviews__dot',
      bulletActiveClass: 'reviews__dot--active',
      clickable: true,
    },
    navigation: {
      nextEl: ".reviews__btn--next",
      prevEl: ".reviews__btn--prev",
    },
  });
});