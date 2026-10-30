/* Synthetic local-only browser + real workerd/D1 integration. Never visits retailers. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {Miniflare}=require('miniflare');
const {chromium}=require('playwright');
(async()=>{
 let mf,browser;const requests=[],accepted=[];let failure=false,mode='test';
 const root=path.resolve(__dirname,'..');
 const server=http.createServer(async(req,res)=>{
  if(req.url==='/click'){
   let body='';for await(const chunk of req)body+=chunk;
   requests.push(JSON.parse(body));
   if(failure){res.writeHead(503);res.end();return;}
   const r=await mf.dispatchFetch('http://localhost/click',{method:'POST',headers:req.headers,body});if(r.status===204)accepted.push(JSON.parse(body));res.writeHead(r.status,Object.fromEntries(r.headers));res.end();return;
  }
  const file=path.resolve(root,'.'+req.url.split('?')[0]);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{let data=fs.readFileSync(file);
   if(file.endsWith('/core-clicks.js')&&mode==='test')data=data.toString().replace("{endpoint: '', mode: 'production'}",`{endpoint: '${origin}/click', mode: 'test'}`);
   res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.webp')?'image/webp':'text/html');res.end(data);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 let checks=0;
 try{
 mf=new Miniflare({modules:true,scriptPath:path.join(root,'analytics/worker.mjs'),compatibilityDate:'2026-08-06',d1Databases:['DB'],bindings:{ENABLED:'true',MODE:'test',ALLOWED_ORIGINS:origin}});
 const db=await mf.getD1Database('DB');await db.exec(fs.readFileSync(path.join(root,'analytics/schema.sql'),'utf8').replace(/--[^\n]*/g,'').replace(/\n/g,' '));
 browser=await chromium.launch({headless:true,...(process.env.CORE_CHROMIUM_PATH?{executablePath:process.env.CORE_CHROMIUM_PATH,args:process.env.CORE_CHROMIUM_ARGS?JSON.parse(process.env.CORE_CHROMIUM_ARGS):[]}: {})});
 const expected=[];const pages=['core-starter.html','core-performance.html','core-high-end.html','core-starter-guide.html','core-high-end-guide.html'];
 for(const width of [1440,390]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width===390});
  await ctx.route('https://**/*',r=>r.fulfill({status:200,body:'Synthetic retailer destination. No external request.'}));
  ctx.on('page',p=>{if(p.url()==='about:blank')p.on('load',()=>{if(!p.url().startsWith(origin))p.close().catch(()=>{});});});
  const page=await ctx.newPage();
  for(const name of pages){
   console.log('Checking',width,name);await page.goto(origin+'/'+name);assert.match(await page.locator('body').innerText(),/HOLD/);checks++;
   const links=page.locator('a[data-core-build]');const before=await links.evaluateAll(xs=>xs.map(x=>({href:x.getAttribute('href'),rel:x.getAttribute('rel')})));
   await links.first().evaluate(el=>{for(let p=el.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;});
   let n=requests.length;await links.first().click();await page.waitForTimeout(80);assert.equal(requests.length,n);checks++;
   if(width===390)await page.getByRole('button',{name:'Allow for this page'}).tap();else await page.getByRole('button',{name:'Allow for this page'}).click();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
   const count=await links.count();
   for(let i=0;i<count;i++){
    const a=links.nth(i);await a.evaluate(el=>{for(let p=el.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;});
    const tuple=await a.evaluate(el=>({build:el.dataset.coreBuild,component:el.dataset.coreComponent,retailer:el.dataset.coreRetailer,linkType:el.dataset.coreLinkType,page:location.pathname.slice(1)}));
    n=requests.length;
    if(width===390)await a.tap();else await a.click();
    await page.waitForFunction(()=>true);for(let k=0;k<50&&requests.length===n;k++)await page.waitForTimeout(20);
    assert.equal(requests.length,n+1);for(const key of Object.keys(tuple))assert.equal(requests.at(-1)[key],tuple[key]);assert.equal(requests.at(-1).synthetic,true);expected.push(tuple);checks+=7;
   }
   assert.deepEqual(await links.evaluateAll(xs=>xs.map(x=>({href:x.getAttribute('href'),rel:x.getAttribute('rel')}))),before);checks++;
   await page.getByRole('button',{name:'Do not allow'}).click();n=requests.length;await links.first().click();await page.waitForTimeout(80);assert.equal(requests.length,n);checks++;
   {await page.locator('.core-click-choice').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,`tests/phase8b-evidence/${name.replace('.html','')}-${width}.png`)});}
  }
  // Keyboard and middle button are distinct supported activations.
  await page.goto(origin+'/core-performance.html');await page.getByRole('button',{name:'Allow for this page'}).click();
  const a=page.locator('a[data-core-build]').first();await a.evaluate(el=>{for(let p=el.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;});
  let n=requests.length;await a.focus();await page.keyboard.press('Enter');await page.waitForTimeout(100);assert.equal(requests.length,n+1);checks++;
  await page.waitForTimeout(510);n=requests.length;await a.click({button:'middle'});await page.waitForTimeout(100);assert.equal(requests.length,n+1);checks++;
  await page.waitForTimeout(510);n=requests.length;await a.dblclick({delay:40});await page.waitForTimeout(100);assert.equal(requests.length,n+1);checks++;
  n=requests.length;await a.dispatchEvent('click',{button:0});assert.equal(requests.length,n);checks++;
  // Network failure does not cancel the native popup navigation.
  await page.waitForTimeout(510);failure=true;n=requests.length;const popup=page.waitForEvent('popup');await a.click();const out=await popup;assert.ok(out);await page.waitForTimeout(100);assert.equal(requests.length,n+1);checks++;failure=false;
  await page.reload();n=requests.length;await page.locator('a.core-reference-link').first().click();await page.waitForTimeout(80);assert.equal(requests.length,n);checks++;
  await ctx.close();
 }
 const rows=(await db.prepare('SELECT * FROM daily_clicks ORDER BY day,build,component,retailer,link_type,page').all()).results;
 const expectedGroups=new Map();
 for(const e of accepted){const key=JSON.stringify([e.build,e.component,e.retailer,e.linkType,e.page]);expectedGroups.set(key,(expectedGroups.get(key)||0)+1);}
 assert.equal(rows.length,expectedGroups.size);
 for(const r of rows)assert.equal(r.clicks,expectedGroups.get(JSON.stringify([r.build,r.component,r.retailer,r.link_type,r.page])));checks+=rows.length+1;
 const total=rows.reduce((n,r)=>n+r.clicks,0);assert.equal(total,requests.length-2);checks++;
 // Replay through the real Worker must not increment aggregate counts.
 const replay=await mf.dispatchFetch('http://localhost/click',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(requests[0])});assert.equal(replay.status,202);assert.equal((await db.prepare('SELECT SUM(clicks) n FROM daily_clicks').first()).n,total);checks+=2;
 for(const width of [1440,390]){
  const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}});await ctx.route('https://**/*',r=>r.fulfill({body:'Synthetic retailer'}));const page=await ctx.newPage();
  for(const name of pages){await page.goto(origin+'/'+name);const a=page.locator('a.core-reference-link').first();const popup=page.waitForEvent('popup');await a.click();const p=await popup;await p.waitForLoadState();assert.match(p.url(),/^https:/);await p.close();checks++;}
  await ctx.close();
 }
 mode='disabled';const page=await browser.newPage();await page.goto(origin+'/core-performance.html');assert.equal(await page.locator('.core-click-choice').count(),0);checks++;
 fs.writeFileSync(path.join(root,'tests/phase8b-evidence/synthetic-report.json'),JSON.stringify({synthetic:true,realCustomerClicks:0,checks,acceptedClicks:total,attemptedEvents:requests.length,rows},null,2)+'\n');
 console.log(JSON.stringify({checks,synthetic:true,acceptedClicks:total,attemptedEvents:requests.length}));
 }finally{if(browser)await browser.close();if(mf)await mf.dispose();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
