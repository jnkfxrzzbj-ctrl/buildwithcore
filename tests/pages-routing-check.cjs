'use strict';
// Read-only HTTP integration checks. Run against Wrangler Pages dev, or an
// owner-approved preview after redeployment. Never creates or changes a host.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {inventory}=require('../scripts/package-public.cjs');
(async()=>{
 const origin=new URL(process.env.CORE_PAGES_ORIGIN),root=fs.realpathSync(process.env.CORE_PUBLIC_DIR);
 assert.ok(['http:','https:'].includes(origin.protocol));assert.equal(origin.pathname,'/');
 const local=['127.0.0.1','localhost'].includes(origin.hostname);
 assert.ok(local||origin.hostname.endsWith('.core-preview-test.pages.dev')||
  (origin.protocol==='https:'&&origin.origin===process.env.CORE_APPROVED_PRODUCTION_ORIGIN),
  'Explicit exact production origin required outside local/isolated preview');
 let checks=0;
 const request=(url,options={})=>fetch(url,{...options,signal:AbortSignal.timeout(20000)});
 const get=route=>request(new URL(route,origin),{redirect:'manual'});
 for(const {path:name} of inventory(root)){
  const response=await get('/'+name);
  if(name.endsWith('.html')){
   assert.ok([301,308].includes(response.status),name);checks++;
   const next=new URL(response.headers.get('location'),origin);assert.equal(next.origin,origin.origin);checks++;
   const final=await request(next);assert.equal(final.status,200);assert.deepEqual(Buffer.from(await final.arrayBuffer()),fs.readFileSync(path.join(root,name)));checks+=2;
  }else{
   assert.equal(response.status,200);assert.deepEqual(Buffer.from(await response.arrayBuffer()),fs.readFileSync(path.join(root,name)));checks+=2;
   if(name.startsWith('assets/')){assert.match(response.headers.get('content-type'),name.endsWith('.css')?/text\/css/:/javascript/);checks++;}
  }
 }
 for(const route of ['/core-data.json','/package.json','/this-page-does-not-exist-12345','/nested/missing/page','/assets/missing.css','/scripts/public-files.json','/scripts/README.md','/tests/deployment.test.cjs','/.env','/.git/config','/private-feed.json']){
  const r=await get(route);assert.equal(r.status,404,route);assert.deepEqual(Buffer.from(await r.arrayBuffer()),fs.readFileSync(path.join(root,'404.html')));checks+=2;
  const head=await request(new URL(route,origin),{method:'HEAD',redirect:'manual'});assert.equal(head.status,404);assert.equal((await head.arrayBuffer()).byteLength,0);checks+=2;
  if(!local){
   assert.equal(r.headers.get('x-content-type-options'),'nosniff');checks++;
   // Cloudflare's custom 404 page carries an HTML robots directive; a CDN
   // X-Robots-Tag header is not guaranteed without a separate _headers rule.
   assert.match(fs.readFileSync(path.join(root,'404.html'),'utf8'),/<meta\s+name=["']robots["']\s+content=["']noindex["']\s*\/?\s*>/i);checks++;
   const robotsHeader=r.headers.get('x-robots-tag');
   if(robotsHeader!==null){assert.match(robotsHeader,/(?:^|,)\s*noindex\b/i);checks++;}
  }
 }
 for(const id of Object.keys(require('../core-data.json').guideConfigurations)){
  const query='?configuration='+id,route='/core-performance-guide.html'+query;
  const r=await get(route);assert.ok([301,308].includes(r.status));checks++;
  const next=new URL(r.headers.get('location'),origin);assert.equal(next.pathname,'/core-performance-guide');assert.equal(next.search,query);checks+=2;
  const final=await request(next);assert.equal(final.status,200);assert.deepEqual(Buffer.from(await final.arrayBuffer()),fs.readFileSync(path.join(root,'core-performance-guide.html')));checks+=2;
 }
 const home=await request(origin);assert.equal(home.status,200);assert.deepEqual(Buffer.from(await home.arrayBuffer()),fs.readFileSync(path.join(root,'index.html')));checks+=2;
 console.log(checks+' Pages HTTP routing checks passed ('+(local?'local emulator':'hosted origin')+'); fragments require browser verification');
})().catch(e=>{console.error(e);process.exitCode=1;});
