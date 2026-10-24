const {test}=require('node:test'),assert=require('node:assert/strict');
const {assess}=require('../scripts/check-delivered-basket.cjs');
const proposal=require('../scripts/phase-5d-performance-proposal.json');
const now='2026-10-22T12:00:00Z';
function complete(){const d=structuredClone(proposal);for(const p of d.parts){p.verifiedAt=now;p.dispatchVerified=true;}for(const b of d.baskets){b.verifiedAt=now;b.shippingPence=0;b.postcodeVerified=true;}return d;}
test('observed baskets cannot become a delivered offer or approve C',()=>{
 const r=assess(proposal,now);assert.equal(r.itemSubtotalPence,192481);assert.equal(r.verifiedDeliveredTotalPence,null);assert.equal(r.evidenceComplete,false);assert.equal(r.configurationCStatus,'HOLD');
});
test('consolidated shipping is counted once and never confers approval',()=>{
 const d=complete();d.baskets[0].shippingPence=548;d.baskets[1].shippingPence=799;
 d.purchasingApproved=true;d.policyApproved=true;
 const r=assess(d,now);assert.equal(r.verifiedDeliveredTotalPence,193828);assert.equal(r.proposedBandComparison,'ABOVE_ACCEPTABLE_LIMIT');assert.equal(r.purchasingApproved,false);
});
test('missing, duplicated, mismatched or negative shipping fails closed',()=>{
 for(const mutate of [d=>d.baskets[0].shippingPence=null,d=>d.baskets[0].shippingPence=-1,d=>d.baskets[0].postcodeVerified=false,d=>d.baskets.pop(),d=>d.baskets[0].slots.push('gpu'),d=>d.baskets[0].seller='Other',d=>d.parts.pop(),d=>d.parts[1].slot='cpu']){
  const d=complete();mutate(d);assert.equal(assess(d,now).verifiedDeliveredTotalPence,null);
 }
});
test('freshness applies to every item and consolidated quote, including future dates',()=>{
 for(const target of ['parts','baskets'])for(const date of [null,'not a date','2026-10-21T11:59:59Z','2026-10-22T12:00:01Z']){
  const d=complete();d[target][0].verifiedAt=date;assert.equal(assess(d,now).evidenceComplete,false);
 }
 const d=complete();for(const p of d.parts)p.verifiedAt='2026-10-21T12:00:00Z';assert.equal(assess(d,now).evidenceComplete,true);
});
test('identity, stock, VAT, seller and dispatch uncertainty cannot pass',()=>{
 for(const patch of [{identityVerified:false},{availabilityObserved:'preorder'},{vatIncluded:false},{sellerIsRetailer:false},{dispatchVerified:false},{quantity:2},{itemPricePence:NaN},{condition:'used'}]){
  const d=complete();Object.assign(d.parts[0],patch);assert.equal(assess(d,now).evidenceComplete,false);
 }
});
test('proposal checker preserves canonical data and nine historical configurations plus pending revision',()=>{
 const d=require('../core-data.json'),before=JSON.stringify(d);assess(proposal,now);
 assert.equal(JSON.stringify(d),before);assert.equal(Object.keys(d.guideConfigurations).length,10);
 assert.equal(Object.keys(d.guideConfigurations).filter(id=>id!=='performance-1.3-b-reaper9070xt-fitv28-sn7100').length,9);
 assert.equal(require('../assets/core-engine.js').derive(d,now).state,'HOLD');
});
