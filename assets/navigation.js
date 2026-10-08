/* Shared public navigation. Links remain available through the existing no-JS fallback. */
(function () {
  'use strict';
  document.querySelectorAll('.core-nav').forEach(function (nav) {
    var button = nav.querySelector('.core-menu');
    if (!button) return;
    function close(restoreFocus) {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      if (restoreFocus) button.focus();
    }
    button.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) close(true);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { close(false); });
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) close(false);
    });
    nav.addEventListener('focusout', function (event) {
      if (!nav.contains(event.relatedTarget)) close(false);
    });
  });
})();
