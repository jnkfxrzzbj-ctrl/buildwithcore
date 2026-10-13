const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const expected=require('./affiliate-expectations.cjs');
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve('.',decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')||'index.html');
  if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(data);});
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 let browser,checks=0;
 try{
 browser=await chromium.launch({headless:true,...(process.env.CORE_CHROMIUM_PATH?{executablePath:process.env.CORE_CHROMIUM_PATH}:{})});
 for(const javaScriptEnabled of [true,false])for(const width of [1440,390]){
  const ctx=await browser.newContext({javaScriptEnabled,viewport:{width,height:900}}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url()+': '+r.status());});
  await page.goto(origin+'/core-performance.html');
  assert.equal(await page.locator('.core-part').count(),8);checks++;
  const cpu=page.locator('#part-cpu');await cpu.locator('summary').click();
  const amazon=cpu.getByRole('link',{name:'Check price at Amazon ↗'});
  assert.equal(await amazon.count(),1);assert.equal(await amazon.getAttribute('href'),'https://www.amazon.co.uk/dp/B0D6NN6TM7?tag=buildwithcore-21');assert.equal(await amazon.getAttribute('rel'),'sponsored noopener noreferrer');assert.equal(await amazon.getAttribute('target'),'_blank');checks+=4;
  // Inspect each selected part, including every newly verified preferred destination.
  const preferred={cpu:'ryzen9600x',gpu:'asus9070xtprimeoc',motherboard:'msib850mwifi6e',ram:'fitv28',ssd:'sn5100',psu:'rm850x2024uk',cooler:'pa120se',case:'h6flow'};
  for(const [slot,id] of Object.entries(preferred)){
   const links=page.locator('#part-'+slot+' a[href*="amazon.co.uk"]');
   assert.equal(await links.count(),expected[id]?1:0);checks++;
   if(expected[id]){
    assert.equal(await links.getAttribute('href'),'https://www.amazon.co.uk/dp/'+expected[id]+'?tag=buildwithcore-21');
    assert.equal(await links.getAttribute('rel'),'sponsored noopener noreferrer');
    assert.equal(await links.getAttribute('target'),'_blank');checks+=3;
   }
  }
  assert.equal(await page.locator('a[href*="amazon.co.uk"]').count(),4);checks++;
  assert.equal(await cpu.getByRole('link',{name:'Reference retailer listing ↗'}).count(),1);assert.equal(await cpu.getByRole('link',{name:'Product source 1 ↗'}).count(),1);checks+=2;
  assert.match(await page.locator('[data-core="panel"]').innerText(),/HOLD/);checks++;
  assert.equal(await page.locator('.core-price-unchecked').count(),8);checks++;
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
  if(javaScriptEnabled){assert.equal(await page.evaluate(()=>window.CORE_RESULT.eligiblePurchaseTotal),null);checks++;}
  assert.deepEqual(errors,[]);checks++;
  await page.locator('.core-part details').evaluateAll(nodes=>nodes.forEach(node=>node.open=true));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
  await page.screenshot({path:path.join(require('node:os').tmpdir(),'core-performance-'+width+'-'+javaScriptEnabled+'.png'),fullPage:true});
  if(javaScriptEnabled){
   // Exercise all approved selections through the real browser engine and view.
   const scenarios=await page.evaluate(()=>{
    const base=window.CORE_DATA,now='2026-10-04T20:30:00Z',out=[];
    for(const cfg of Object.values(base.guideConfigurations)){
     if(cfg.buildRevision!==base.performanceRevisions['performance-1.1-approved'].build.revision)continue;
     const d=JSON.parse(JSON.stringify(base));d.currentPerformanceRevision='performance-1.1-approved';
     for(const s of d.performanceRevisions['performance-1.1-approved'].build.slots){
      d.performanceRevisions['performance-1.1-approved'].selectionState[s.id]=d.offers.find(o=>o.componentId===cfg.components[s.id]).id;
      for(const o of d.offers)if(s.approvedIds.includes(o.componentId))Object.assign(o,{checkedAt:now,stock:o.componentId===cfg.components[s.id]?'in_stock':'out_of_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',vatIncluded:true,deliveryPence:0,itemPence:s.targetPence-1000});
     }
     const r=CoreEngine.derive(d,now),before=JSON.stringify(r);
     document.querySelector('[data-core="parts"]').innerHTML=CoreView.parts(d,r);
     out.push({selected:r.selectedIds,expected:cfg.components,unchanged:JSON.stringify(CoreEngine.derive(d,now))===before,state:r.state,
      parts:[...document.querySelectorAll('.core-part')].map(p=>({slot:p.id.slice(5),links:[...p.querySelectorAll('a[href*="amazon.co.uk"]')].map(a=>({url:a.href,rel:a.rel,target:a.target}))})),
      noOverflow:document.documentElement.scrollWidth<=innerWidth});
    }
    return out;
   });
   for(const scenario of scenarios){
    assert.deepEqual(scenario.selected,scenario.expected);assert.equal(scenario.unchanged,true);assert.equal(scenario.state,'GOOD BUY');assert.equal(scenario.noOverflow,true);checks+=4;
    for(const part of scenario.parts){
     const asin=expected[scenario.selected[part.slot]];
     assert.deepEqual(part.links,asin?[{url:'https://www.amazon.co.uk/dp/'+asin+'?tag=buildwithcore-21',rel:'sponsored noopener noreferrer',target:'_blank'}]:[]);checks++;
    }
   }
  }
  await ctx.close();
 }
 const ctx=await browser.newContext(),page=await ctx.newPage();
 for(const file of fs.readdirSync('.').filter(x=>x.endsWith('.html'))){
  const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
  const response=await page.goto(origin+'/'+file);assert.equal(response.status(),200);checks++;
  const broken=await page.evaluate(async()=>{
   const urls=[...new Set([...document.querySelectorAll('a[href],script[src],link[href],img[src]')].map(el=>el.href||el.src).filter(u=>u.startsWith(location.origin)))];
   const results=await Promise.all(urls.map(async u=>[u,(await fetch(u)).status]));return results.filter(([,status])=>status>=400);
  });assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);checks+=2;page.off('pageerror',onError);
 }
 await ctx.close();
 // Phase 1 public journeys, including narrow phones, keyboard navigation and no-JS recovery.
 const shots=process.env.CORE_QA_DIR;
 if(shots)fs.mkdirSync(shots,{recursive:true});
 for(const javaScriptEnabled of [true,false])for(const width of [1440,390,320]){
  const context=await browser.newContext({javaScriptEnabled,viewport:{width,height:900}}),p=await context.newPage();
  for(const file of fs.readdirSync('.').filter(x=>x.endsWith('.html'))){
   const errors=[];const onError=e=>errors.push(e.message);p.on('pageerror',onError);
   await p.goto(origin+'/'+file);
   assert.equal(await p.locator('main#main-content').count(),1,file);checks++;
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),file+' '+width+' overflow');checks++;
   await p.keyboard.press('Tab');assert.equal(await p.locator('.skip-link').evaluate(e=>e===document.activeElement),true);checks++;
   if(width<900&&javaScriptEnabled){
    const menu=p.getByRole('button',{name:'Open navigation'});await menu.click();
    for(const name of ['Home','Builds','Guides','FAQ']){assert.ok(await p.locator('.core-nav').getByRole('link',{name,exact:true}).isVisible());checks++;}
    await p.locator('.core-links a').first().focus();await p.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await menu.evaluate(e=>e===document.activeElement),true);checks+=2;
    await menu.click();await p.mouse.click(4,450);assert.equal(await menu.getAttribute('aria-expanded'),'false');checks++;
   }else if(!javaScriptEnabled){
    for(const a of await p.locator('.core-links a').all()){assert.ok(await a.isVisible());checks++;}
   }
   if(file==='builds.html'){
    assert.equal(await p.locator('thead th').count(),4);checks++;
    assert.equal(await p.locator('tbody tr').count(),8);checks++;
    const region=p.getByRole('region',{name:'Build comparison'});
    await region.evaluate(e=>{e.scrollLeft=e.scrollWidth;});
    assert.ok(await p.locator('thead th').last().evaluate(e=>{const r=e.getBoundingClientRect();return r.right<=innerWidth&&r.left>=0;}));checks++;
   }
   if(file==='core-performance.html'){
    assert.match(await p.locator('[data-core="panel"]').innerText(),/HOLD/);checks++;
    assert.equal(await p.locator('.core-part .core-mpn').count(),8);checks++;
    for(const a of await p.locator('a[rel~="sponsored"]').all()){
     assert.ok(await a.isVisible());assert.match(await a.locator('..').innerText(),/Affiliate link/);checks+=2;
    }
   }
   await p.locator('main').focus();await p.locator('main').evaluate(e=>e.blur());
   if(shots&&width!==320)await p.screenshot({path:path.join(shots,file.replace('.html','')+'-'+width+'-'+javaScriptEnabled+'.png'),fullPage:true});
   assert.deepEqual(errors,[],file);checks++;p.off('pageerror',onError);
  }
  await p.goto(origin+'/guides.html');await p.getByRole('link',{name:'Explore Performance hardware notes'}).click();
  if(javaScriptEnabled){assert.equal(await p.locator('[data-core="guide"] .core-guide-parts>li').count(),8);checks++;}
  else {assert.match(await p.locator('.core-noscript').innerText(),/exact configuration index/);checks++;await p.locator('.core-noscript a').click();assert.equal(await p.locator('.core-saved-configuration').count(),9);checks++;for(const section of await p.locator('.core-saved-configuration').all()){await section.locator(':scope>summary').click();assert.equal(await section.locator('.core-guide-parts>li').count(),8);checks++;}}
  if(javaScriptEnabled){
   for(const id of ['', '?configuration=unknown','?configuration=__proto__']){
    await p.goto(origin+'/core-performance-guide.html'+id);
    assert.equal(await p.locator('[data-core="guide"] .core-guide-parts').count(),0);checks++;
    assert.ok(await p.locator('[data-core="guide"]').getByRole('link',{name:'Find your exact saved configuration →'}).isVisible());checks++;
   }
   // C must stay on HOLD with a complete, fresh, artificially cheap fixture.
   await p.goto(origin+'/core-performance.html');
   await p.evaluate(()=>{
    const r=CORE_DATA.performanceRevisions['performance-1.2-c'],template=CORE_DATA.offers[0];
    CORE_DATA.offers=r.build.slots.map(s=>({...template,id:'test-'+s.id,componentId:s.preferredId,checkedAt:new Date().toISOString(),stock:'in_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',currency:'GBP',vatIncluded:true,deliveryPence:0,itemPence:100}));
    document.dispatchEvent(new Event('visibilitychange'));
   });
   assert.equal(await p.evaluate(()=>CORE_RESULT.state),'HOLD');assert.equal(await p.evaluate(()=>CORE_RESULT.reasonCode),'PRICING_POLICY_PENDING');assert.equal(await p.evaluate(()=>CORE_RESULT.eligiblePurchaseTotal),null);assert.match(await p.locator('[data-core="panel"]').innerText(),/buying criteria awaiting approval/);assert.equal(await p.locator('.core-price-unchecked').count(),8);assert.equal(await p.getByRole('link',{name:'View exact offer ↗'}).count(),0);checks+=6;
   await p.evaluate(()=>{CORE_DATA.offers=[];document.dispatchEvent(new Event('visibilitychange'));});
   assert.equal(await p.locator('.core-part').count(),8);assert.equal(await p.evaluate(()=>CORE_RESULT.state),'HOLD');checks+=2;
   await p.evaluate(()=>{CORE_DATA.guideConfigurations['performance-1.2-c-asus9070xt-fitv28-sn5100'].powerPlan.psuId='rm750x';document.dispatchEvent(new Event('visibilitychange'));});
   assert.equal(await p.evaluate(()=>CORE_RESULT.state),'UNAVAILABLE');assert.equal(await p.locator('.core-part').count(),0);checks+=2;
   // Each legacy URL resolves to its original hardware, not the current revision.
   for(const [id,cfg] of Object.entries(require('../core-data.json').guideConfigurations)){
    await p.goto(origin+'/core-performance-guide.html?configuration='+id);
    const notes=p.locator('[data-core="guide"]');assert.equal(await notes.locator('.core-guide-parts>li').count(),8);checks++;
    for(const entry of cfg.hardwareSnapshot){assert.ok((await notes.innerText()).includes(entry.component.manufacturer+' '+entry.component.name));checks++;}
   }

   // Preserve the independent browser publication lock for an internally eligible legacy fixture.
   await p.goto(origin+'/core-performance.html');
   await p.evaluate(()=>{
    CORE_DATA.currentPerformanceRevision='performance-1.1-approved';
    const r=CORE_DATA.performanceRevisions[CORE_DATA.currentPerformanceRevision];
    for(const o of CORE_DATA.offers){const s=r.build.slots.find(s=>s.approvedIds.includes(o.componentId));Object.assign(o,{checkedAt:new Date().toISOString(),stock:'in_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',vatIncluded:true,deliveryPence:0,itemPence:s.targetPence-1000});}
    document.dispatchEvent(new Event('visibilitychange'));
   });
   assert.equal(await p.evaluate(()=>CORE_RESULT.state),'GOOD BUY');
   assert.match(await p.locator('[data-core="panel"]').innerText(),/HOLD/);
   assert.equal(await p.locator('.core-price-unchecked').count(),8);
   assert.equal(await p.getByRole('link',{name:'View exact offer ↗'}).count(),0);checks+=4;

  }
  await context.close();
 }
 console.log(checks+' browser/site checks passed across desktop, mobile, no-JS and all HTML pages');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
