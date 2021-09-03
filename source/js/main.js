'use strict';
const siteNav = document.querySelector('.site-nav');
const navToggle = siteNav.querySelector('.site-nav__toggle');
const links = document.querySelectorAll('a[href^="#"]');

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

// Menu

siteNav.classList.remove('site-nav--nojs');

const toggleMenu = () => {
  siteNav.classList.toggle('site-nav--closed');
  siteNav.classList.toggle('site-nav--opened')

  if(siteNav.classList.contains('site-nav--closed')){
    bodyUnfixPosition();
  } else {
    bodyFixPosition();
  }
};

navToggle.addEventListener('click', toggleMenu);

function bodyFixPosition() {
  setTimeout( () => {
    if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('data-body-scroll-fix', scrollPosition);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${  scrollPosition  }px`;
      document.body.style.left = '0';
      document.body.style.width = '100%';
    }
  }, 15 );
}

function bodyUnfixPosition() {
  if ( document.body.hasAttribute('data-body-scroll-fix') ) {
    const scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    document.body.removeAttribute('data-body-scroll-fix');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scroll(0, scrollPosition);
  }
}
