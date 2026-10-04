const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
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
  assert.equal(await page.locator('a[href*="amazon.co.uk"]').count(),1);checks++;
  assert.equal(await cpu.getByRole('link',{name:'Reference retailer listing ↗'}).count(),1);assert.equal(await cpu.getByRole('link',{name:'Product source 1 ↗'}).count(),1);checks+=2;
  assert.match(await page.locator('[data-core="panel"]').innerText(),/HOLD/);checks++;
  assert.equal(await page.locator('.core-price-unchecked').count(),8);checks++;
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
  if(javaScriptEnabled){assert.equal(await page.evaluate(()=>window.CORE_RESULT.eligiblePurchaseTotal),null);checks++;}
  assert.deepEqual(errors,[]);checks++;
  await page.screenshot({path:path.join(require('node:os').tmpdir(),'core-performance-'+width+'-'+javaScriptEnabled+'.png'),fullPage:true});
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
 await ctx.close();console.log(checks+' browser/site checks passed across desktop, mobile, no-JS and all HTML pages');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
