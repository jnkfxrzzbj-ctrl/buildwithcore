/* Optional retailer-click measurement. Release gate: no endpoint, no requests or UI.
   No cookies, storage, visitor IDs, URL queries or retailer destinations are sent. */
(function () {
  'use strict';
  const config = {endpoint: '', mode: 'production'};
  if (!config.endpoint || window.__coreClicksInstalled) return;
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const production = /^(www\.)?buildwithcore\.co\.uk$/.test(location.hostname);
  if (config.mode === 'test' ? !local : !production) return;
  let endpoint;
  try { endpoint = new URL(config.endpoint); } catch { return; }
  if (endpoint.pathname !== '/click' || endpoint.search || endpoint.hash || endpoint.username || endpoint.password) return;
  if (endpoint.protocol !== 'https:' && !(local && config.mode === 'test' && endpoint.origin === location.origin)) return;
  window.__coreClicksInstalled = true;
  let consent = false;
  const seen = new WeakSet();
  const recent = new WeakMap();
  const panel = document.createElement('section');
  panel.className = 'core-click-choice';
  panel.setAttribute('aria-label', 'Optional retailer-click measurement');
  panel.innerHTML = '<p>May CORE count your retailer clicks on this page to understand use of our build recommendations and commercial interest? We send the build, component, retailer, link type and time to Cloudflare and keep daily totals for 90 days. We do not store a visitor identifier. <a href="privacy.html#retailer-clicks">Privacy details</a>.</p><button type="button" data-choice="yes">Allow for this page</button> <button type="button" data-choice="no">Do not allow</button> <span role="status">Off. Retailer links work either way.</span>';
  const main = document.querySelector('main');
  if (!main) return;
  main.appendChild(panel);
  // Place beside the buying section where one exists, without changing that section.
  const parts = document.querySelector('[data-core="parts"], .parts');
  if (parts) parts.before(panel);
  else {
    const guide = main.querySelector('a[data-core-build]')?.closest('section');
    if (guide) guide.prepend(panel);
  }
  const status = panel.querySelector('[role="status"]');
  panel.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-choice]');
    if (!button || !event.isTrusted) return;
    consent = button.dataset.choice === 'yes';
    status.textContent = consent ? 'On for this page. Choose Do not allow to withdraw.' : 'Off. Retailer links work either way.';
    panel.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.choice === 'yes') === consent)));
  });
  function record(event) {
    if (!consent || !event.isTrusted || event.defaultPrevented || seen.has(event)) return;
    if (event.type === 'click' && event.button !== 0 || event.type === 'auxclick' && event.button !== 1) return;
    const link = event.target.closest('a[data-core-build][data-core-component][data-core-retailer][data-core-link-type]');
    if (!link || !/^https:\/\//.test(link.href)) return;
    const now = Date.now();
    if (now - (recent.get(link) || 0) < 500) return;
    seen.add(event); recent.set(link, now);
    try {
      const body = JSON.stringify({v:1, build:link.dataset.coreBuild, component:link.dataset.coreComponent,
        retailer:link.dataset.coreRetailer, linkType:link.dataset.coreLinkType,
        page:location.pathname.split('/').pop(), timestamp:new Date(now).toISOString(),
        eventId:crypto.randomUUID(), synthetic:config.mode === 'test', consent:'page-opt-in-v1'});
      // One attempt only: ambiguous network failures must not produce retry duplicates.
      // omit credentials and referrer even when the endpoint is on the same origin.
      fetch(endpoint.href, {method:'POST', body, headers:{'Content-Type':'application/json'},
        credentials:'omit', referrerPolicy:'no-referrer', keepalive:true, mode:'cors'}).catch(function () {});
    } catch (_) { /* Measurement must never affect navigation. */ }
  }
  document.addEventListener('click', record);
  document.addEventListener('auxclick', record);
})();
