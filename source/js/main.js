'use strict';
var siteNav = document.querySelector('.site-nav');
var navToggle = siteNav.querySelector('.site-nav__toggle');

// Menu

siteNav.classList.remove('site-nav--nojs');

navToggle.addEventListener('click', function () {
  siteNav.classList.toggle('site-nav--closed');
  siteNav.classList.toggle('site-nav--opened');
});
