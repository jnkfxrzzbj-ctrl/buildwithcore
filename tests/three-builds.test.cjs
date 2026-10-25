const {test}=require('node:test'),assert=require('node:assert/strict'),{createHash}=require('node:crypto'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const d=require('../core-data.json'),E=require('../assets/core-engine.js');
test('all nine historical configurations, both policies and offer observations are unchanged from PR19',()=>{
 const old={guideConfigurations:Object.fromEntries(Object.entries(d.guideConfigurations).filter(([,c])=>c.buildRevision!=='performance-1.3-b')),performanceRevisions:Object.fromEntries(Object.entries(d.performanceRevisions).filter(([id])=>id!=='performance-1.3-b')),offers:d.offers,pricingPolicy:d.pricingPolicy};
 assert.equal(createHash('sha256').update(JSON.stringify(old)).digest('hex'),'b4081c9969b85585889d297860d854a882508fb03ca79e4aa6c98792768c5f77');
});
test('all three complete specifications render without JavaScript and never imply buying approval',()=>{
 execFileSync(process.execPath,['scripts/render-launch.cjs','--check']);
 for(const [tier,b] of Object.entries(d.launchBuilds)){
  assert.equal(b.parts.length,8);assert.equal(new Set(b.parts.map(p=>p.slot)).size,8);assert.equal(b.state,'HOLD');assert.equal(b.purchasingApproved,false);assert.equal(b.deliveredTotalPence,null);
  const page=fs.readFileSync('core-'+tier.toLowerCase()+'.html','utf8'),guide=fs.readFileSync('core-'+tier.toLowerCase()+'-guide.html','utf8');
  for(const p of b.parts){assert.ok(page.includes(p.manufacturerModel),p.manufacturerModel);assert.ok(guide.includes(p.manufacturerModel),p.manufacturerModel);}
  assert.match(page,/HOLD/);assert.match(guide,/guides.html#assembly/);assert.doesNotMatch(page,/earlier component list|360mm AIO|View exact offer/);
 }
});
test('Option B and C stay HOLD with fresh, complete, cheap offers; cable swaps fail closed',()=>{
 for(const revision of ['performance-1.3-b','performance-1.2-c']){
  const x=structuredClone(d);x.currentPerformanceRevision=revision;const r=x.performanceRevisions[revision],now='2026-10-22T12:00:00Z';
  x.offers=r.build.slots.map(s=>({...d.offers[0],id:'fixture-'+s.id,componentId:s.preferredId,checkedAt:now,observedOn:null,itemPence:100,deliveryPence:0,stock:'in_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',currency:'GBP',vatIncluded:true}));
  const result=E.derive(x,now);assert.equal(result.state,'HOLD');assert.equal(result.reasonCode,'PRICING_POLICY_PENDING');assert.equal(result.eligiblePurchaseTotal,null);
  x.offers=[];assert.equal(E.derive(x,now).state,'HOLD');assert.equal(Object.keys(E.derive(x,now).selectedIds).length,8);
  x.guideConfigurations[r.defaultConfigurationId].powerPlan.separatePcieLeads=1;assert.throws(()=>E.derive(x,now));
 }
});
test('launch rendering rejects incomplete hardware and accidental purchasing activation',()=>{
 const {validate}=require('../scripts/render-launch.cjs');
 for(const mutate of [b=>b.parts.pop(),b=>b.parts[0].manufacturerModel='',b=>b.state='GOOD BUY',b=>b.purchasingApproved=true,b=>b.deliveredTotalPence=0]){const b=structuredClone(d.launchBuilds.Starter);mutate(b);assert.throws(()=>validate(b));}
});
