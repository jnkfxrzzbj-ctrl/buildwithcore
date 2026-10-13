/* Static fallbacks remain conservative. No network prices or affiliate inputs. */
(function(){
'use strict';const d=window.CORE_DATA,E=window.CoreEngine,V=window.CoreView;
if(!d||!E||!V)return;
function refreshGuide(){
 const id=new URLSearchParams(location.search).get('configuration');
 document.querySelectorAll('[data-core="guide"]').forEach(el=>el.innerHTML=V.guide(d,id));
}
function refresh(){
 // Saved hardware notes do not depend on current pricing validation.
 refreshGuide();
 let r;
 try{r=E.derive(d,Date.now());}
 catch(error){
  document.querySelectorAll('[data-core="panel"],[data-core="parts"],[data-core="compact"]').forEach(el=>el.innerHTML=V.unavailable());
  window.CORE_RESULT={state:'UNAVAILABLE',reasonCode:'DATA_INVALID',completeEligible:false,eligiblePurchaseTotal:null};
  return;
 }
 document.querySelectorAll('[data-core]').forEach(el=>{
  const type=el.dataset.core;
  if(type==='panel')el.innerHTML=r.eligiblePurchaseTotal===null?V.panel(d,r):V.fallback(d);
  if(type==='parts')el.innerHTML=r.configurationId?V.parts(d,r,{unverified:true}):V.unavailable();
  if(type==='compact')el.innerHTML=V.compact(d,r);
  if(type==='capacity')el.textContent=(d.components[r.selectedIds.ssd]?.capacityTB||'')+'TB NVMe';
 });
 // Only current-specification entry links follow the active revision.
 document.querySelectorAll('[data-core-current-guide-link]').forEach(a=>a.href=V.configurationLink(r));
 window.CORE_RESULT=r;
}
function signature(r){return JSON.stringify([r.state,r.reasonCode,r.revisionId,r.configurationId,r.slots?.map(s=>[s.selected?.offer.id,s.selected?.state,s.selected?.fresh,s.selected?.visible,s.eligible])]);}
document.querySelectorAll('.core-legacy').forEach(section=>section.addEventListener('toggle',()=>{
 if(section.open)section.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src;img.removeAttribute('data-src');});
}));
function openSavedSection(){
 const id=location.hash.slice(1),el=document.getElementById(id);
 if(el?.classList.contains('core-saved-configuration'))el.open=true;
}
refresh();openSavedSection();window.addEventListener('hashchange',openSavedSection);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
setInterval(()=>{try{if(signature(E.derive(d,Date.now()))!==signature(window.CORE_RESULT))refresh();}catch{refresh();}},60000);
})();
