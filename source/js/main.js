'use strict';
(function () {
  var siteNav = document.querySelector('.site-nav');
  var header = document.querySelector('.site-header');
  var links = document.querySelectorAll('a[href^="#"]');
  var form = document.querySelector('form');
  var inputPhone = form.querySelector('input[name=phone]');
  var regularPhone =  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  //SmoothScroll

  scrollTo();

  function scrollTo() {
    for (var link of links) {
      link.addEventListener("click", (evt) => {
        evt.scrollAnchors;
        if (siteNav.classList.contains('site-nav--opened')) {
          bodyUnfixPosition();
          siteNav.classList.remove('site-nav--opened');
          siteNav.classList.add('site-nav--closed');
        }
      })
    }
    links.forEach(each => (each.onclick = scrollAnchors));
  }

  function scrollAnchors(e, respond = null) {
    var distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    var targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    var originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    var checkIfDone = setInterval(function() {
      var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = '-1';
        targetAnchor.focus();
        window.history.pushState('', '', targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }

  // Menu

  header.classList.remove('site-header--nojs');

  function toggleMenu (evt) {
    if (evt.target.className === 'site-nav__toggle') {
      siteNav.classList.toggle('site-nav--closed');
      siteNav.classList.toggle('site-nav--opened');

      if (siteNav.classList.contains('site-nav--closed')){
        bodyUnfixPosition();
      } else {
        bodyFixPosition();
      }
    }
  };

  siteNav.addEventListener('click', toggleMenu, {passive: true});

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
