
document.addEventListener("DOMContentLoaded", () => {

  const rangeSlider = document.querySelector('.range__slider');
  const inputMin = document.querySelector('.range__input--min');
  const inputMax = document.querySelector('.range__input--max');

  noUiSlider.create(rangeSlider, {
    start: [100, 1000],
    connect: true,
    padding: [0, 0],
    animate: true,
    // cssPrefix: 'noUi-',
    step: 10,
    range: {
      'min': 50,
      'max': 1200
    }
  });

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    // let value = values[handle];
    let value = parseFloat(values[handle]).toFixed(0);
    if (handle) {
      inputMax.value = value;
    } else {
      inputMin.value = value;
    }
  });

  // Оновлення значень слайдера при зміні input-ів
  inputMin.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });

  const body = document.querySelector('body');
  const header = document.querySelector('.header');

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
// 
  if (window.innerWidth <= 992) {
    const burger = document.querySelector('.burger');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    burger.addEventListener('click', () => {
      body.classList.add('lock');
      mobileNav.classList.add('open');
    })

    closeBtn.addEventListener('click', () => {
      body.classList.remove('lock');
      mobileNav.classList.remove('open');

    })

    document.addEventListener('click', function (e) {//click evryver close burger menu
      if (e.target !== closeBtn && e.target !== burger && e.target !== mobileNav && e.target !== filterBtn && e.target !== filterSidebar) {
        body.classList.remove('lock');
        mobileNav.classList.remove('open');
        filterSidebar.classList.remove('open')
      }
    });

    const filterBtn = document.querySelector('.filter-btn');
    const filterCloseBtn = document.querySelector('.sidebar__btn');
    const filterSidebar = document.querySelector('.sidebar');
    filterBtn.addEventListener('click', () => {
      filterSidebar.classList.add('open')
      body.classList.add('lock');
    })

    filterCloseBtn.addEventListener('click', () => {
      filterSidebar.classList.remove('open')
      body.classList.remove('lock');
    })
  }

  if (window.innerWidth <= 576) {
    const swiper = new Swiper(".resto__slider", {
      sliderPerView: 1,
      sliderPerGroup: 1,
      centeredSlides: true,
      centeredSlidesBounds: true,

      pagination: {
        el: ".resto__dots",
        bulletClass: 'resto__dot',
        bulletActiveClass: 'resto__dot--active',
        clickable: true,
      },
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

  header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };


});