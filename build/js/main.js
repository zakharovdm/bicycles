'use strict';
(function () {
  var siteNav = document.querySelector('.site-nav');
  var header = document.querySelector('.site-header');
  var navToggle = siteNav.querySelector('.site-nav__toggle');
  var links = document.querySelectorAll('a[href^="#"]');
  var form = document.querySelector('form');
  var inputPhone = form.querySelector('input[name=phone]');
  var regularPhone =  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  //SmoothScroll

  for (let link of links) {
    link.addEventListener('click', (evt) => {
        evt.preventDefault();
        var id = link.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    });
  };

  // Menu

  header.classList.remove('site-header--nojs');

  var toggleMenu = () => {
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
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
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
      var scrollPosition = document.body.getAttribute('data-body-scroll-fix');
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
      inputPhone.classList.add('form-inner__input--error');
    } else {inputPhone.setCustomValidity('');
    inputPhone.classList.remove('form-inner__input--error');}
    inputPhone.reportValidity();
  })
})();
