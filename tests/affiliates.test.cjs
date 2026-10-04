const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('../assets/core-engine.js'),V=require('../assets/core-view.js'),A=require('../assets/core-affiliates.js');
const expected=require('./affiliate-expectations.cjs');
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/core-data.generated.js','utf8'),context);
const base=JSON.parse(JSON.stringify(context.window.CORE_DATA));
const clone=x=>JSON.parse(JSON.stringify(x));
const url=asin=>'https://www.amazon.co.uk/dp/'+asin+'?tag=buildwithcore-21';
const now='2026-10-04T20:30:00Z';
function fresh(){
 const d=clone(base);
 for(const o of d.offers){
  const slot=d.builds.performance.slots.find(s=>s.approvedIds.includes(o.componentId));
  Object.assign(o,{checkedAt:now,stock:'in_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',vatIncluded:true,deliveryPence:0,itemPence:slot.targetPence-1000});
 }
 return d;
}
function assertDestinations(d,r,html){
 const articles=html.match(/<article\b[\s\S]*?<\/article>/g)||[];
 assert.equal(articles.length,8);
 for(const [i,s] of r.slots.entries()){
  const id=s.selected?.offer.componentId,asin=expected[id],article=articles[i];
  const urls=[...article.matchAll(/href="(https:\/\/www.amazon.co.uk[^\"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(urls,asin?[url(asin)]:[],id||s.id);
  if(asin)assert.match(article,/target="_blank" rel="sponsored noopener noreferrer">Check price at Amazon ↗/);
  if(s.selected){assert.match(article,/Product source 1/);assert.ok(article.includes(V.esc(s.selected.offer.url)));}
 }
}
for(const [id,c] of Object.entries(base.components))test('exact destination and identity guards: '+id,()=>{
 const asin=expected[id];
 assert.deepEqual(A.links(id,c),asin?[{name:'Amazon',url:url(asin)}]:[]);
 assert.deepEqual(A.links(id,undefined),[]);
 assert.deepEqual(A.links(id,{...c,mpn:'different-MPN'}),[]);
 if(c.mpn)assert.deepEqual(A.links(id,{...c,mpn:null}),[]);
 else for(const ean of [null,'4711377285439','04711377285438'])assert.deepEqual(A.links(id,{...c,ean}),[]);
 for(const [otherId,other] of Object.entries(base.components))if(otherId!==id)assert.deepEqual(A.links(id,other),[],id+' must not match '+otherId);
 if(asin){
  const entry=A.catalogue.products[id][0];assert.ok(entry.verificationNote);
  for(const patch of [{identityVerified:false},{asin:'javascript:alert(1)'},{asin:'bad'},{retailerId:'unknown'},c.mpn?{mpn:'wrong'}:{ean:'wrong'}]){
   const data=clone(A.catalogue);Object.assign(data.products[id][0],patch);assert.deepEqual(A.links(id,c,data),[]);
  }
 }
});
test('catalogue contains only reviewed destinations and identity metadata',()=>{
 assert.deepEqual(Object.keys(A.catalogue.products).sort(),Object.keys(expected).sort());
 for(const records of Object.values(A.catalogue.products)){
  assert.equal(records.length,1);
  for(const key of Object.keys(records[0]))assert.ok(['retailerId','mpn','ean','asin','identityVerified','verificationNote'].includes(key),key);
 }
 assert.deepEqual(A.links('unknown',base.components.ryzen9600x),[]);
 for(const id of Object.keys(expected)){
  const d=clone(A.catalogue);d.retailers.amazonUK.tag='other-21';assert.deepEqual(A.links(id,base.components[id],d),[]);
 }
 const d=clone(A.catalogue);d.products.ryzen9600x[0].ean='1234567890123';
 assert.deepEqual(A.links('ryzen9600x',{mpn:'wrong',ean:'1234567890123'},d),[]);
});
test('every approved guide selection renders only its own exact destinations',()=>{
 for(const cfg of Object.values(base.guideConfigurations)){
  if(cfg.buildRevision!==base.builds.performance.revision)continue;
  const d=fresh();
  for(const s of d.builds.performance.slots){
   const chosen=cfg.components[s.id];
   d.selectionState[s.id]=d.offers.find(o=>o.componentId===chosen).id;
   for(const o of d.offers)if(s.approvedIds.includes(o.componentId)&&o.componentId!==chosen)o.stock='out_of_stock';
  }
  const r=E.derive(d,now);assert.deepEqual(r.selectedIds,cfg.components);
  for(const unverified of [true,false])assertDestinations(d,r,V.parts(d,r,{unverified}));
 }
});
test('all purchasing states and the 24-hour boundary are independent of affiliate data',()=>{
 const scenarios=[
  ['GOOD BUY',fresh(),now],
  ['ACCEPTABLE',fresh(),now],
  ['HOLD',fresh(),now],
  ['STALE',fresh(),'2026-10-05T20:30:00.001Z'],
  ['UNAVAILABLE',fresh(),now],
  ['GOOD BUY',fresh(),'2026-10-05T20:30:00Z']
 ];
 for(const o of scenarios[1][1].offers)o.itemPence=scenarios[1][1].builds.performance.slots.find(s=>s.approvedIds.includes(o.componentId)).maxPence;
 for(const o of scenarios[2][1].offers)if(o.componentId==='ryzen9600x')o.itemPence=19001;
 for(const o of scenarios[4][1].offers)o.stock='out_of_stock';
 const script=fs.readFileSync('assets/core-view.js','utf8'),engine=fs.readFileSync('assets/core-engine.js','utf8');
 for(const [state,d,time] of scenarios){
  const before=clone(d),reference=E.derive(d,time);assert.equal(reference.state,state);
  for(const catalogue of [A.catalogue,{retailers:{},products:{}},null]){
   const ctx={URL,CoreAffiliates:catalogue?{links:(id,c)=>A.links(id,c,catalogue)}:undefined};
   vm.runInNewContext(engine,ctx);vm.runInNewContext(script,ctx);
   const result=ctx.CoreEngine.derive(d,time);
   const html=ctx.CoreView.parts(d,result);ctx.CoreView.summary(d,result);
   assert.deepEqual(clone(result),reference);assert.deepEqual(clone(ctx.CoreEngine.derive(d,time)),reference);assert.deepEqual(d,before);
   if(catalogue===A.catalogue)assertDestinations(d,result,html);else assert.doesNotMatch(html,/amazon\.co\.uk/);
  }
  // Even accidental placement of bogus affiliate price/stock fields in CORE_DATA is ignored.
  const poisoned=clone(d);poisoned.affiliates=clone(A.catalogue);
  for(const entries of Object.values(poisoned.affiliates.products))Object.assign(entries[0],{itemPence:1,stock:'in_stock',checkedAt:time});
  assert.deepEqual(E.derive(poisoned,time),reference);
 }
 assert.equal(base.pricingPolicy.freshHours,24);
});
test('reference rendering retains links without promoting stale prices',()=>{
 for(const time of ['2026-09-24T12:00:00Z',now])for(const unverified of [true,false]){
  const r=E.derive(base,time),html=V.parts(base,r,{unverified});assertDestinations(base,r,html);
  assert.match(html,/Reference retailer listing/);
 }
});
test('unknown selected identity and missing offers never borrow another destination',()=>{
 const r=E.derive(clone(base),now);r.slots[0].selected.offer.componentId='unknown';
 assert.doesNotMatch(V.parts(base,r).split('</article>')[0],/amazon\.co\.uk/);
 const d=clone(base);d.offers=[];const empty=E.derive(d,now);
 assert.equal(empty.state,'UNAVAILABLE');assert.equal(empty.eligiblePurchaseTotal,null);assert.doesNotMatch(V.parts(d,empty),/amazon\.co\.uk/);
});
test('static markup is reproducible and presentation has no destination special cases',()=>{
 require('node:child_process').execFileSync(process.execPath,['scripts/render-performance.cjs','--check']);
 const view=fs.readFileSync('assets/core-view.js','utf8');
 for(const asin of Object.values(expected))assert.ok(!view.includes(asin));
 assert.doesNotMatch(view,/s\.id==='cpu'|buildwithcore-21/);
 const html=fs.readFileSync('core-performance.html','utf8');assert.match(html,/core-affiliates\.js/);assert.match(html,/HOLD · NOT VERIFIED/);
 assertDestinations(base,E.derive(base,now),html.slice(html.indexOf('<article class="core-part"')));
});
