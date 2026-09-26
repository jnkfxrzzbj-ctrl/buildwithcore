/* Generated HTML works offline. Browser refreshes time-based states from the generated JSON bundle. */
(function(){
'use strict';const d=window.CORE_DATA,E=window.CoreEngine,V=window.CoreView;
if(!d||!E||!V)return;
function refresh(){
 const r=E.derive(d,Date.now());
 document.querySelectorAll('[data-core]').forEach(el=>{
  const type=el.dataset.core;
  if(type==='panel')el.innerHTML=r.eligiblePurchaseTotal===null?V.panel(d,r):V.fallback(d);
  if(type==='parts')el.innerHTML=V.parts(d,r,{unverified:true});
  if(type==='compact')el.innerHTML=r.eligiblePurchaseTotal===null?V.compact(d,r):'<strong>HOLD · NOT VERIFIED</strong><br>Wait before buying';
  if(type==='capacity')el.textContent=d.components[r.selectedIds.ssd]?.capacityTB+'TB NVMe';
  if(type==='guide'){const id=new URLSearchParams(location.search).get('configuration');el.innerHTML=V.guide(d,id);}
 });
 document.querySelectorAll('[data-core-guide-link]').forEach(a=>a.href=V.configurationLink(r));
 window.CORE_RESULT=r;
}
function signature(r){return JSON.stringify(r.slots.map(s=>[s.selected?.offer.id,s.selected?.state,s.selected?.fresh,s.selected?.visible,s.eligible]));}
// No image URL enters the active DOM until the draft is explicitly opened.
document.querySelectorAll('.core-legacy').forEach(section=>section.addEventListener('toggle',()=>{
 if(section.open)section.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src;img.removeAttribute('data-src');});
}));
refresh();
// Recalculate on return and periodically, without destroying open disclosures on every timer tick.
let lastMinute=Math.floor(Date.now()/60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
setInterval(()=>{const minute=Math.floor(Date.now()/60000);if(minute!==lastMinute){lastMinute=minute;const next=E.derive(d,Date.now());if(signature(next)!==signature(window.CORE_RESULT))refresh();}},60000);
})();
