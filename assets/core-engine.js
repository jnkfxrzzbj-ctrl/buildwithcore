/* Shared pure pricing engine: Node build/tests and static browser. No network or affiliate inputs. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.CoreEngine=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const money=v=>Number.isSafeInteger(v)&&v>=0;
const stamp=o=>o.checkedAt?Date.parse(o.checkedAt):(/^\d{4}-\d{2}-\d{2}$/.test(o.observedOn||'')?Date.parse(o.observedOn+'T00:00:00Z'):NaN);
const clone=x=>JSON.parse(JSON.stringify(x));
function validate(d){
 const fail=m=>{throw new Error('Invalid CORE data: '+m)};
 if(d.schemaVersion!==1||!d.builds?.performance)fail('schema / build');
 const b=d.builds.performance;if(!money(b.targetPence))fail('build target');
 if(!Array.isArray(b.slots)||b.slots.length!==8)fail('Performance requires eight slots');
 if(!d.components||!d.retailers||!d.guideVariants||!d.guideConfigurations||!d.selectionState||!Array.isArray(d.offers))fail('missing manifest sections');
 const text=v=>typeof v==='string'&&v.trim().length>0;
 const https=v=>{try{const u=new URL(v);return typeof v==='string'&&u.protocol==='https:'&&!!u.hostname&&!u.username&&!u.password;}catch{return false;}};
 const date=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;
 const timestamp=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(v)&&date(v.slice(0,10))&&Number.isFinite(Date.parse(v));
 if(!d.pricingPolicy)fail('pricing policy');
 for(const key of ['freshHours','hideCurrentTotalAfterHours','dispatchMaximumWorkingDays'])if(!Number.isSafeInteger(d.pricingPolicy[key])||d.pricingPolicy[key]<0)fail('policy '+key);
 for(const [id,c] of Object.entries(d.components)){
  if(!text(c.name)||!text(c.manufacturer)||!text(c.slot)||(!text(c.mpn)&&!text(c.ean)))fail('component identity '+id);
  if(!Array.isArray(c.sources)||!c.sources.length||!c.sources.every(https))fail('component sources '+id);
 }
 for(const [id,r] of Object.entries(d.retailers))if(!text(r.name)||typeof r.approved!=='boolean')fail('retailer '+id);
 for(const [id,g] of Object.entries(d.guideVariants))if(!d.components[g.componentId]||typeof g.compatibilityReviewed!=='boolean')fail('guide variant '+id);
 if(d.pricingPolicy.affiliateInfluence!==false)fail('affiliate selection is forbidden');
 if(!(d.pricingPolicy.freshHours>0&&d.pricingPolicy.hideCurrentTotalAfterHours>d.pricingPolicy.freshHours))fail('freshness policy');
 const slots=new Set(),oids=new Set();
 for(const s of b.slots){
  if(!text(s.id)||!text(s.label))fail('slot identity');
  if(slots.has(s.id))fail('duplicate slot');slots.add(s.id);
  if(!['FIXED','SWITCHABLE'].includes(s.policy)||!Number.isInteger(s.quantity)||s.quantity<1)fail('slot policy/quantity');
  if(!money(s.targetPence)||!money(s.maxPence)||s.maxPence<s.targetPence||!money(s.switchSavingPence))fail('slot prices');
  if(!Array.isArray(s.approvedIds)||!s.approvedIds.length||new Set(s.approvedIds).size!==s.approvedIds.length||!s.approvedIds.includes(s.preferredId))fail('approved list');
  if(s.policy==='FIXED'&&s.approvedIds.length!==1)fail('fixed component substitution');
  for(const id of s.approvedIds){let c=d.components[id];if(!c||c.slot!==s.id||(!c.mpn&&!c.ean))fail('component identity');if(!d.guideVariants[c.guideVariantId])fail('guide variant missing');}
 }
 for(const o of d.offers){
  if(!text(o.id))fail('offer ID');
  if(oids.has(o.id))fail('duplicate offer');oids.add(o.id);
  if(!d.components[o.componentId]||!d.retailers[o.retailerId])fail('offer identity');
  for(const key of ['itemPence','deliveryPence'])if(o[key]!==null&&!money(o[key]))fail(key+' must be integer pence or null');
  if(!https(o.url))fail('offer URL');
  if(!['in_stock','out_of_stock','preorder','dispatch_unconfirmed','unknown'].includes(o.stock))fail('offer '+o.id+': invalid stock');
  for(const key of ['sellerIsRetailer','identityVerified','vatIncluded'])if(typeof o[key]!=='boolean')fail('offer '+o.id+': '+key+' must be boolean');
  if(o.dispatchWorkingDays!==null&&(!Number.isSafeInteger(o.dispatchWorkingDays)||o.dispatchWorkingDays<0))fail('offer '+o.id+': dispatchWorkingDays must be non-negative integer or null');
  if(!['new','used','refurbished','unknown'].includes(o.condition))fail('offer '+o.id+': invalid condition');
  if(typeof o.currency!=='string'||!/^([A-Z]{3})$/.test(o.currency))fail('offer '+o.id+': invalid currency');
  if(o.checkedAt!==null&&!timestamp(o.checkedAt))fail('offer '+o.id+': invalid checkedAt');
  if(o.observedOn!==null&&!date(o.observedOn))fail('offer '+o.id+': invalid observedOn');
  if(o.checkedAt===null&&o.observedOn===null)fail('offer '+o.id+': evidence date required');
 }
 for(const c of Object.values(d.guideConfigurations)){
  if(c.buildRevision!==b.revision)continue;
  for(const s of b.slots){let id=c.components[s.id];if(!s.approvedIds.includes(id)||c.guideVariantIds[s.id]!==d.components[id].guideVariantId)fail('configuration/guide mapping');}
 }
 return true;
}
function assess(d,s,o,now){
 const t=stamp(o),ageHours=(now-t)/3600000;
 const validDate=Number.isFinite(t)&&ageHours>=0;
 const fresh=validDate&&ageHours<=d.pricingPolicy.freshHours;
 const visible=validDate&&ageHours<=d.pricingPolicy.hideCurrentTotalAfterHours;
 const c=d.components[o.componentId],v=d.guideVariants[c.guideVariantId];
 const trusted=o.identityVerified===true&&o.sellerIsRetailer===true&&o.condition==='new'&&o.currency==='GBP'&&o.vatIncluded===true&&d.retailers[o.retailerId]?.approved===true;
 const stocked=o.stock==='in_stock'&&Number.isInteger(o.dispatchWorkingDays)&&o.dispatchWorkingDays>=0&&o.dispatchWorkingDays<=d.pricingPolicy.dispatchMaximumWorkingDays;
 const guideCompatible=v?.compatibilityReviewed===true&&v.componentId===o.componentId;
 const aboveMaximum=money(o.itemPence)&&o.itemPence>s.maxPence;
 const reasons=[];
 if(!trusted)reasons.push('Offer identity or condition needs checking');
 if(!money(o.itemPence))reasons.push('Item price unknown');
 if(aboveMaximum)reasons.push('Price above CORE maximum');
 if(!stocked)reasons.push(o.stock==='preorder'?'Preorder — not eligible':o.stock==='dispatch_unconfirmed'?'Stock needs confirmation':'Unavailable');
 if(!fresh)reasons.push('Price needs checking');
 if(!guideCompatible)reasons.push('Guide mapping requires review');
 const eligible=trusted&&stocked&&fresh&&guideCompatible&&money(o.itemPence)&&!aboveMaximum;
 const state=!trusted||!guideCompatible||!money(o.itemPence)?'UNAVAILABLE':aboveMaximum?'HOLD':!stocked?'UNAVAILABLE':!fresh?'STALE':o.itemPence<=s.targetPence?'GOOD BUY':'ACCEPTABLE';
 return {offer:o,component:c,eligible,state,reasons,fresh,visible,ageHours:validDate?ageHours:null,aboveMaximum,stocked,trusted,guideCompatible,deliveredPence:money(o.itemPence)&&money(o.deliveryPence)?o.itemPence+o.deliveryPence:null};
}
const compare=(a,b)=>(a.deliveredPence-b.deliveredPence)||a.offer.componentId.localeCompare(b.offer.componentId)||a.offer.retailerId.localeCompare(b.offer.retailerId)||a.offer.id.localeCompare(b.offer.id);
function choose(d,s,now){
 const options=d.offers.filter(o=>s.approvedIds.includes(o.componentId)).map(o=>assess(d,s,o,now));
 const valid=options.filter(x=>x.eligible);
 const incumbent=options.find(x=>x.offer.id===d.selectionState[s.id]);
 let pick=null,selectionReason='',comparisonComplete=valid.every(x=>x.deliveredPence!==null);
 if(valid.length){
  if(incumbent?.eligible){
   pick=incumbent;selectionReason='Keep the eligible incumbent';
   // Only compare known delivered prices. Unknown delivery can never become zero.
   const best=valid.filter(x=>x.deliveredPence!==null).sort(compare)[0];
   if(best&&pick.deliveredPence!==null){
    const saving=pick.deliveredPence-best.deliveredPence;
    const samePart=best.offer.componentId===pick.offer.componentId;
    if(saving>0&&(samePart||saving>=s.switchSavingPence)){pick=best;selectionReason=samePart?'Lower verified delivered offer for the same part':'Approved alternative meets the saving threshold';}
   }
  }else{
   if(comparisonComplete){pick=[...valid].sort(compare)[0];selectionReason='Lowest eligible delivered offer';}
   else{pick=[...valid].sort((a,b)=>(a.offer.componentId!==s.preferredId)-(b.offer.componentId!==s.preferredId)||a.offer.id.localeCompare(b.offer.id))[0];selectionReason='Eligible preferred option; delivery comparison incomplete';}
  }
 }else{
  // Keep the recorded configuration as a dated cost example, never a buy recommendation.
  pick=incumbent||options.find(x=>x.offer.componentId===s.preferredId)||options[0]||null;
  selectionReason='Costed reference only — no eligible approved offer';
 }
 return {...s,selected:pick,options,eligible:!!pick?.eligible,selectionReason,comparisonComplete,switched:!!pick&&!!incumbent&&pick.offer.componentId!==incumbent.offer.componentId};
}
function configuration(d,ids){return Object.entries(d.guideConfigurations).find(([,c])=>c.buildRevision===d.builds.performance.revision&&d.builds.performance.slots.every(s=>c.components[s.id]===ids[s.id]))?.[0]||null;}
function derive(d,asOf=Date.now()){
 validate(d);const now=typeof asOf==='number'?asOf:Date.parse(asOf);if(!Number.isFinite(now))throw new Error('Invalid evaluation time');
 const b=d.builds.performance,slots=b.slots.map(s=>choose(d,s,now));
 const allPrices=slots.every(s=>s.selected?.trusted&&money(s.selected.offer.itemPence));
 const referenceSubtotal=allPrices?slots.reduce((n,s)=>n+s.selected.offer.itemPence*s.quantity,0):null;
 const allVisible=slots.every(s=>s.selected?.visible);
 const allFresh=slots.every(s=>s.selected?.fresh);
 const indicativeSubtotal=allVisible?referenceSubtotal:null;
 const eligible=slots.every(s=>s.eligible);
 const eligiblePurchaseTotal=eligible?referenceSubtotal:null;
 const deliveryKnown=slots.every(s=>money(s.selected?.offer.deliveryPence));
 // Standalone quoted shipping only; basket consolidation is not inferred.
 const quotedDeliverySum=deliveryKnown?slots.reduce((n,s)=>n+s.selected.offer.deliveryPence,0):null;
 const deliveredEstimate=eligible&&deliveryKnown?eligiblePurchaseTotal+quotedDeliverySum:null;
 const hasHold=slots.some(s=>s.selected?.aboveMaximum);
 const unavailable=slots.some(s=>!s.selected||!s.selected.stocked||!s.selected.trusted||!money(s.selected.offer.itemPence)||!s.selected.guideCompatible);
 const state=hasHold?'HOLD':unavailable?'UNAVAILABLE':!allFresh?'STALE':eligible&&eligiblePurchaseTotal<=b.targetPence?'GOOD BUY':'ACCEPTABLE';
 const selectedIds=Object.fromEntries(slots.map(s=>[s.id,s.selected?.offer.componentId||null]));
 return {asOf:new Date(now).toISOString(),state,slots,selectedIds,configurationId:configuration(d,selectedIds),referenceSubtotal,indicativeSubtotal,eligiblePurchaseTotal,quotedDeliverySum,deliveredEstimate,allFresh,allVisible,deliveryKnown,targetPence:b.targetPence,targetDifference:indicativeSubtotal===null?null:indicativeSubtotal-b.targetPence,referenceDifference:referenceSubtotal===null?null:referenceSubtotal-b.targetPence,completeEligible:eligible};
}
return {validate,derive,assess,clone,money,stamp};
});
