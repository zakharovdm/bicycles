'use strict';
const siteNav = document.querySelector('.site-nav');
const navToggle = siteNav.querySelector('.site-nav__toggle');
const links = document.querySelectorAll('a[href^="#"]');

// Menu

siteNav.classList.remove('site-nav--nojs');

navToggle.addEventListener('click', function () {
  siteNav.classList.toggle('site-nav--closed');
  siteNav.classList.toggle('site-nav--opened');
});

//SmoothScroll

for (let link of links) {
  link.addEventListener('click', function (evt) {
      evt.preventDefault();
      const id = link.getAttribute('href');

      document.querySelector(id).scrollIntoView({
          behavior: 'smooth'
      });
  });
};
