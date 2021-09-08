'use strict';
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const navToggle = siteNav.querySelector('.site-nav__toggle');
const links = document.querySelectorAll('a[href^="#"]');
const form = document.querySelector('.form');
const inputs = form.querySelectorAll('input');
const submit = form.querySelector('button');
const inputPhone = form.querySelector('input[name=phone]');
const regularPhone =  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

//SmoothScroll

for (let link of links) {
  link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = link.getAttribute('href');

      document.querySelector(id).scrollIntoView({
          behavior: 'smooth'
      });
  });
};

// Menu

header.classList.remove('site-header--nojs');

const toggleMenu = () => {
  siteNav.classList.toggle('site-nav--closed');
  siteNav.classList.toggle('site-nav--opened')

  if(siteNav.classList.contains('site-nav--closed')){
    bodyUnfixPosition();
  } else {
    bodyFixPosition();
  }
};

navToggle.addEventListener('click', toggleMenu, {passive: true});

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

// Validation

inputPhone.addEventListener('input', () => {
  if (!regularPhone.test(inputPhone.value)) {
    inputPhone.setCustomValidity('Введите корректный номер телефона');
    inputPhone.classList.add('form__input--error');
  } else {inputPhone.setCustomValidity('');
  inputPhone.classList.remove('form__input--error');}
  inputPhone.reportValidity();
})
