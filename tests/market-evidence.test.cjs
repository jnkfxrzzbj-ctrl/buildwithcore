const {test}=require('node:test'), assert=require('node:assert/strict');
const {summarise}=require('../scripts/market-evidence.cjs');
const now='2026-10-21T12:00:00Z';
const fixture=()=>['cpu','gpu','motherboard','ram','ssd','psu','cooler','case'].map(slot=>({slot,
  mpn:'EXACT-'+slot,seller:'Test retailer',itemPence:100,deliveryPence:0,
  deliveryBasis:'verified_basket_allocation',verifiedAt:now,evidenceKind:'verified_offer',
  identityVerified:true,sellerVerified:true,condition:'new',currency:'GBP',vatIncluded:true,
  stock:'in_stock',dispatchWorkingDays:2}));
test('complete evidence is arithmetic, never purchasing approval',()=>{
  const rows=fixture(); rows[0].deliveryPence=500;
  const result=summarise(rows,now);
  assert.equal(result.deliveredEvidenceTotalPence,1300);
  assert.equal(result.purchasingApproval,false);
});
test('unknown postage and missing prices cannot become zero-cost offers',()=>{
  const rows=fixture(); rows[0].deliveryPence=null;
  assert.equal(summarise(rows,now).deliveredEvidenceTotalPence,null);
  rows[1].itemPence=null;
  assert.equal(summarise(rows,now).indicativeItemSubtotalPence,null);
});
test('cached, future, date-only and expired observations cannot establish freshness',()=>{
  for(const value of [null,'2026-10-21','2026-10-21T12:00:01Z','2026-10-20T11:59:59Z']) {
    const rows=fixture(); rows[0].verifiedAt=value;
    assert.equal(summarise(rows,now).deliveredEvidenceTotalPence,null);
  }
  const rows=fixture(); rows[0].verifiedAt='2026-10-20T12:00:00Z';
  assert.equal(summarise(rows,now).deliveredEvidenceTotalPence,800);
});
test('stock, identity, seller and contradictory evidence remain independent gates',()=>{
  for(const patch of [{stock:'preorder'},{identityVerified:false},{sellerVerified:false},
    {contradictory:true},{dispatchWorkingDays:6},{currency:'USD'},{vatIncluded:false},
    {condition:'used'},{evidenceKind:'retailer_product'},{deliveryBasis:null}]) {
    const rows=fixture(); Object.assign(rows[0],patch);
    assert.equal(summarise(rows,now).deliveredEvidenceTotalPence,null);
  }
});
test('missing or duplicate slots fail before totals are calculated',()=>{
  assert.throws(()=>summarise(fixture().slice(1),now));
  const rows=fixture(); rows[0].slot='gpu'; assert.throws(()=>summarise(rows,now));
});
