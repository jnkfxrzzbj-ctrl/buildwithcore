'use strict';
// Read-only hosted replay of the existing saved-configuration and HOLD checks.
const {chromium} = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');
const assert = require('node:assert/strict');
const configurations = require('../core-data.json').guideConfigurations;
const C = 'performance-1.2-c-asus9070xt-fitv28-sn5100';
(async () => {
  const origin = new URL(process.env.CORE_PAGES_ORIGIN);
  assert.equal(origin.protocol, 'https:');
  assert.equal(origin.pathname, '/');
  assert.ok(origin.hostname.endsWith('.core-preview-test.pages.dev') ||
    origin.origin === process.env.CORE_APPROVED_PRODUCTION_ORIGIN,
    'Explicit exact production origin required outside isolated preview');
  const browser = await chromium.launch({headless:true});
  let checks = 0;
  try {
    for (const width of [390,320]) for (const javaScriptEnabled of [false,true]) {
      const context = await browser.newContext({viewport:{width,height:900},
        javaScriptEnabled, reducedMotion:'reduce', ignoreHTTPSErrors:false});
      const page = await context.newPage(), errors=[];
      page.on('pageerror', e => errors.push(e.message));
      for (const [id,cfg] of Object.entries(configurations)) {
        const response = await page.goto(new URL('/core-performance-guide.html?configuration='+id, origin).href);
        assert.equal(response.status(),200);
        assert.equal(new URL(page.url()).searchParams.get('configuration'),id); checks+=2;
        let parts;
        if (javaScriptEnabled) {
          parts=page.locator('[data-core="guide"] .core-guide-parts');
          if(id===C){assert.match(await page.locator('[data-core="guide"]').innerText(),/HOLD/);checks++;}
        } else {
          const entry=page.locator('[id="'+id+'"]'),summary=entry.locator(':scope>summary');
          assert.equal(await entry.evaluate(e=>e.open),false);checks++;
          await page.locator('a[href="#'+id+'"]').focus();
          await Promise.all([page.waitForURL(u=>u.hash==='#'+id),page.keyboard.press('Enter')]);
          if(id===C){
            assert.match(await summary.innerText(),/Configuration C · HOLD/);
            assert.ok(await summary.evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}));checks+=2;
          }
          await summary.focus();await page.keyboard.press('Enter');
          assert.equal(await entry.evaluate(e=>e.open),true);checks++;
          parts=entry.locator('.core-guide-parts');
        }
        assert.equal(await parts.locator(':scope>li').count(),8);checks++;
        for(const part of cfg.hardwareSnapshot){
          assert.ok((await parts.innerText()).includes(part.component.manufacturer+' '+part.component.name));checks++;
        }
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
      }
      await page.goto(new URL('/core-performance.html',origin).href);
      assert.match(await page.locator('[data-core="panel"]').innerText(),/HOLD/);checks++;
      assert.equal(await page.getByRole('link',{name:'View exact offer ↗'}).count(),0);checks++;
      if(javaScriptEnabled){
        assert.equal(await page.evaluate(()=>CORE_RESULT.state),'HOLD');
        assert.equal(await page.evaluate(()=>CORE_RESULT.eligiblePurchaseTotal),null);checks+=2;
      }
      assert.deepEqual(errors,[]);checks++;
      await context.close();
    }
    console.log(checks+' hosted browser assertions passed; 390/320px, JS on/off, TLS validation enabled');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
