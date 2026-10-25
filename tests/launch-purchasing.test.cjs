'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const d=require('../core-data.json'),V=require('../assets/core-view.js'),E=require('../assets/core-engine.js');
test('all launch parts have exact reference destinations without purchasing or affiliate evidence',()=>{
 for(const b of Object.values(d.launchBuilds))for(const p of b.parts){
  const ref=d.retailerReferences[p.manufacturerModel];
  assert.equal(ref.manufacturerModel,p.manufacturerModel);
  assert.equal(ref.status,'reference-only');assert.equal(ref.affiliate,false);
  assert.equal(new URL(ref.url).protocol,'https:');
  for(const forbidden of ['itemPence','deliveryPence','stock','checkedAt','commission','asin'])assert.equal(Object.hasOwn(ref,forbidden),false);
  assert.match(V.referenceLink(d,p),/Check current price at retailer/);
 }
 const before=E.derive(d,'2026-10-25T12:00:00Z'),x=structuredClone(d);delete x.retailerReferences;
 assert.deepEqual(E.derive(x,'2026-10-25T12:00:00Z'),before);
 assert.equal(before.state,'HOLD');assert.equal(before.eligiblePurchaseTotal,null);
 const r=E.derive(d,'2026-10-25T12:00:00Z');
 assert.equal((V.parts(d,r,{unverified:true}).match(/class="core-reference-link"/g)||[]).length,8);
});
test('reference resolver fails closed for wrong identity, unsafe URL and unapproved link types',()=>{
 const c={mpn:'CP-9020270-UK'};
 for(const change of [r=>r.manufacturerModel='CP-9020285-UK',r=>r.url='javascript:alert(1)',r=>r.affiliate=true,r=>r.status='verified-offer']){
  const x=structuredClone(d);change(x.retailerReferences[c.mpn]);assert.equal(V.referenceLink(x,c),'');
 }
 assert.equal(V.referenceLink(d,{mpn:'unknown'}),'');assert.equal(V.referenceLink(d,{model:'__proto__'}),'');
});
test('High-End revision keeps original snapshot and separates incompatible GPU cable plans',()=>{
 const current=d.launchBuilds['High-End'],old=d.launchBuildHistory['high-end-2026-10'];
 const part=(b,s)=>b.parts.find(p=>p.slot===s);
 assert.equal(require('node:crypto').createHash('sha256').update(JSON.stringify(old)).digest('hex'),'7a8d90b89176627b25b341cfb52cd9a3a3857c8c04a75be5c72fe32eb421b501');
 assert.equal(current.revision,'high-end-2026-10-5080');
 assert.equal(part(current,'gpu').manufacturerModel,'N50803-16D7-176068N');
 assert.equal(part(current,'cooler').manufacturerModel,'Phantom Spirit 120 EVO');
 assert.match(part(current,'psu').notes,/native 12V-2x6/);assert.doesNotMatch(part(current,'psu').notes,/Leave the native.*unused/);
 assert.match(part(old,'psu').notes,/two separate/);
 for(const b of [current,old]){assert.equal(b.state,'HOLD');assert.equal(b.deliveredTotalPence,null);assert.equal(b.purchasingApproved,false);}
 const page=fs.readFileSync('core-high-end.html','utf8'),guide=fs.readFileSync('core-high-end-guide.html','utf8');
 assert.match(page,/RTX 5080/);assert.doesNotMatch(page,/shares Performance|Peerless Assassin|RX9070XT 16G-A/);
 assert.match(guide,/id="high-end-2026-10"/);assert.match(guide,/Historical specification/);
 assert.match(guide,/not physically built or thermally tested/);
});
test('history is a recovery route, with current and unknown saved links handled safely',()=>{
 const page=fs.readFileSync('core-performance.html','utf8'),css=fs.readFileSync('assets/performance.css','utf8');
 assert.doesNotMatch(page,/<select|core-history|core-saved-configuration/);
 assert.match(css,/\.core-history\{display:none\}/);
 assert.match(css,/\.core-history:target/);
 for(const id of Object.keys(d.guideConfigurations))assert.equal((V.guide(d,id).match(/<li>/g)||[]).length,8);
 assert.doesNotMatch(V.guide(d,'unknown'),/core-guide-parts/);
 assert.match(V.guideIndex(d),/id="saved-configurations"/);
});
