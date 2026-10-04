const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('../assets/core-engine.js'),V=require('../assets/core-view.js'),A=require('../assets/core-affiliates.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/core-data.generated.js','utf8'),context);
const base=JSON.parse(JSON.stringify(context.window.CORE_DATA));
const clone=x=>JSON.parse(JSON.stringify(x));
test('only the verified exact CPU has an Amazon destination',()=>{
 assert.deepEqual(A.links('ryzen9600x',base.components.ryzen9600x),[{name:'Amazon',url:'https://www.amazon.co.uk/dp/B0D6NN6TM7?tag=buildwithcore-21'}]);
 for(const [id,c] of Object.entries(base.components))if(id!=='ryzen9600x')assert.deepEqual(A.links(id,c),[]);
});
test('wrong MPN, unknown ID, missing component and unverified or malformed records fail closed',()=>{
 assert.deepEqual(A.links('ryzen9600x',{mpn:'wrong'}),[]);
 assert.deepEqual(A.links('unknown',base.components.ryzen9600x),[]);
 assert.deepEqual(A.links('ryzen9600x',undefined),[]);
 for(const patch of [{identityVerified:false},{asin:'javascript:alert(1)'},{asin:'bad'},{retailerId:'unknown'},{mpn:'wrong'}]){
  const data=clone(A.catalogue);Object.assign(data.products.ryzen9600x[0],patch);
  assert.deepEqual(A.links('ryzen9600x',base.components.ryzen9600x,data),[]);
 }
 const data=clone(A.catalogue);data.retailers.amazonUK.tag='other-21';assert.deepEqual(A.links('ryzen9600x',base.components.ryzen9600x,data),[]);
});
test('affiliate catalogue never affects derived buying decisions, totals, substitutions or guide IDs',()=>{
 for(const time of ['2026-09-24T12:00:00Z','2026-09-25T00:00:01Z','2026-10-04T20:30:00Z']){
  const expected=E.derive(base,time);
  const d=clone(base);d.affiliates=clone(A.catalogue);
  assert.deepEqual(E.derive(d,time),expected);
  d.affiliates.products.ryzen9600x[0].itemPence=1;
  d.affiliates.products.ryzen9600x[0].stock='in_stock';
  assert.deepEqual(E.derive(d,time),expected);
 }
});
test('a cheap affiliate destination cannot rescue an over-ceiling build or stale evidence',()=>{
 const d=clone(base),now='2026-10-04T20:30:00Z';
 for(const o of d.offers){o.checkedAt=now;o.stock='in_stock';o.dispatchWorkingDays=1;o.identityVerified=true;o.sellerIsRetailer=true;o.condition='new';o.vatIncluded=true;o.deliveryPence=0;o.itemPence=100;}
 const good=E.derive(d,now);assert.equal(good.state,'GOOD BUY');
 const ramSlot=d.builds.performance.slots.find(s=>s.id==='ram');
 for(const o of d.offers)if(ramSlot.approvedIds.includes(o.componentId))o.itemPence=ramSlot.maxPence+1;
 const hold=E.derive(d,now);assert.equal(hold.state,'HOLD');assert.equal(hold.eligiblePurchaseTotal,null);
 d.affiliates=clone(A.catalogue);assert.deepEqual(E.derive(d,now),hold);
 for(const o of d.offers)o.itemPence=100;
 assert.equal(E.derive(d,'2026-10-05T20:30:01Z').eligiblePurchaseTotal,null);
 assert.equal(d.pricingPolicy.freshHours,24);
});
test('all purchasing states render one sponsored CPU link while retaining references and sources',()=>{
 for(const time of ['2026-09-24T12:00:00Z','2026-10-04T20:30:00Z'])for(const unverified of [true,false]){
  const r=E.derive(base,time),html=V.parts(base,r,{unverified});
  assert.equal((html.match(/Check price at Amazon/g)||[]).length,1);
  assert.match(html,/rel="sponsored noopener noreferrer"/);
  assert.match(html,/Product source 1/);assert.match(html,/Reference retailer listing/);
  assert.equal(JSON.stringify(E.derive(base,time)),JSON.stringify(r));
 }
});
test('selected component identity, rather than slot name, determines affiliate destination',()=>{
 const r=E.derive(base,'2026-10-04T20:30:00Z');
 r.slots[0].selected.offer.componentId='unknown';
 assert.doesNotMatch(V.parts(base,r),/amazon\.co\.uk/);
});
test('static markup is reproducible and public scripts contain no CPU or ASIN special case',()=>{
 require('node:child_process').execFileSync(process.execPath,['scripts/render-performance.cjs','--check']);
 const view=fs.readFileSync('assets/core-view.js','utf8');assert.doesNotMatch(view,/B0D6NN6TM7|s\.id==='cpu'|buildwithcore-21/);
 const html=fs.readFileSync('core-performance.html','utf8');assert.match(html,/core-affiliates\.js/);
 assert.match(html,/HOLD · NOT VERIFIED/);
});
