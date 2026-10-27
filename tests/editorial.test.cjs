'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const d=require('../core-data.json'),V=require('../assets/core-view.js'),E=require('../assets/core-engine.js');
test('editorial addition preserves the complete PR34 canonical baseline',()=>{
 const copy=structuredClone(d);delete copy.editorialRecommendations;
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(copy)).digest('hex'),'4153993c55d5bfc311bf5f1be1d62cdc3e0d6c2c8d4bfa555a39ba2b89f86a4d');
});
test('every editorial state is independent of buying evidence, policy and publication lock',()=>{
 const now='2026-10-25T12:00:00Z',before=E.derive(d,now);
 for(const status of ['RECOMMENDED','UNDER REVIEW','NOT CURRENTLY RECOMMENDED']){
  const x=structuredClone(d);for(const v of Object.values(x.editorialRecommendations)){v.status=status;v.evidenceGaps=[];}
  V.validateEditorial(x);assert.deepEqual(E.derive(x,now),before);
  assert.match(V.editorial(x,'Performance'),new RegExp('Specification: '+status));
  assert.match(V.panel(x,before),/HOLD/);assert.doesNotMatch(V.panel(x,before),/GOOD BUY|Ready to buy/);
 }
 const x=structuredClone(d);delete x.editorialRecommendations;assert.deepEqual(E.derive(x,now),before);
 assert.equal(before.state,'HOLD');assert.equal(before.eligiblePurchaseTotal,null);
});
test('invalid editorial identities, incomplete rationale and unsafe sources block generation',()=>{
 for(const mutate of [x=>x.revision='wrong',x=>x.status='GOOD BUY',x=>x.reviewedOn='2026-02-31',x=>x.nextReviewOn=x.reviewedOn,x=>x.rationale='',x=>x.observedSubtotalPence=-1,x=>x.sources[0].url='javascript:alert(1)',x=>x.evidenceGaps=['Unresolved compatibility']]){
  const copy=structuredClone(d);mutate(copy.editorialRecommendations.Performance);assert.throws(()=>V.validateEditorial(copy));
 }
 const x=structuredClone(d);x.editorialRecommendations.Performance.revision='wrong';assert.match(V.editorial(x,'Performance'),/UNDER REVIEW/);assert.doesNotMatch(V.editorial(x,'Performance'),/Specification: RECOMMENDED/);
});
test('static editorial pages expose dated context, trade-offs, guide routes and offer warnings',()=>{
 V.validateEditorial(d);
 for(const [tier,x] of Object.entries(d.editorialRecommendations))for(const suffix of ['','-guide']){
  const s=fs.readFileSync(`core-${tier.toLowerCase()}${suffix}.html`,'utf8');
  assert.ok(s.includes(V.editorial(d,tier)));assert.match(s,/datetime="2026-10-25"/);assert.match(s,/Not a current quote/);assert.match(s,/Trade-offs/);assert.match(s,/HOLD/);assert.match(s,suffix?/guides.html#assembly/:new RegExp('core-'+tier.toLowerCase()+'-guide.html'));
 }
 assert.equal(d.editorialRecommendations.Starter.status,'UNDER REVIEW');
 for(const tier of ['Performance','High-End'])assert.equal(d.editorialRecommendations[tier].status,'RECOMMENDED');
});
