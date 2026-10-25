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

/* Privacy-first site analytics: load only on the public CORE domain.
   This guard excludes Cloudflare preview, localhost and GitHub Pages staging. */
(function () {
  'use strict';
  var host = window.location.hostname.toLowerCase();
  if (host !== 'buildwithcore.co.uk' && host !== 'www.buildwithcore.co.uk') return;
  var beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({token:'9f4b8198b6d34841bdf4bff9edb40daf'}));
  document.head.appendChild(beacon);
})();
