const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const E=require('../assets/core-engine.js'),V=require('../assets/core-view.js');
const base=require('../core-data.json'),clone=()=>({...structuredClone(base),currentPerformanceRevision:"performance-1.2-c"});
const C='performance-1.2-c',L='performance-1.1-approved',CID='performance-1.2-c-asus9070xt-fitv28-sn5100',now='2026-10-13T12:00:00Z';
const ids={cpu:'ryzen9600x',gpu:'asus9070xtprimeoc',motherboard:'msib850mwifi6e',ram:'fitv28',ssd:'sn5100',psu:'rm850x2024uk',cooler:'pa120se',case:'h6flow'};
function fresh(revision=C){const d=clone();d.currentPerformanceRevision=revision;const r=d.performanceRevisions[revision];d.offers=r.build.slots.flatMap(s=>s.approvedIds.map(id=>({...structuredClone(base.offers[0]),id:'test-'+id,componentId:id,checkedAt:now,observedOn:null,itemPence:revision===C?100:s.targetPence-1000,deliveryPence:0,stock:'in_stock',dispatchWorkingDays:1,identityVerified:true,sellerIsRetailer:true,condition:'new',currency:'GBP',vatIncluded:true})));r.selectionState=Object.fromEntries(r.build.slots.map(s=>[s.id,'test-'+s.preferredId]));return d;}
function hold(d){const r=E.derive(d,now);assert.equal(r.state,'HOLD');assert.equal(r.reasonCode,'PRICING_POLICY_PENDING');assert.equal(r.completeEligible,false);assert.equal(r.eligiblePurchaseTotal,null);assert.equal(r.deliveredEstimate,null);assert.equal(r.targetPence,null);assert.equal(r.targetDifference,null);assert.equal(r.configurationId,CID);assert.deepEqual(r.selectedIds,ids);for(const html of [V.parts(d,r),V.panel(d,r),V.compact(d,r),V.fallback(d)])assert.doesNotMatch(html,/GOOD BUY|ACCEPTABLE|Good price|Within our limit|View exact offer|£1,550|£1,650|£1,800/);return r;}
test('C has exact separate identities, fixed tuple and genuinely null pricing',()=>{
 assert.equal(base.currentPerformanceRevision,"performance-1.3-b");assert.deepEqual(base.guideConfigurations[CID].components,ids);
 assert.equal(base.components.asus9070xtprimeoc.mpn,'90YV0L71-M0NA00');assert.equal(base.components.asus9070xtprimeoc.model,'PRIME-RX9070XT-O16G');assert.equal(base.components.rm850x2024uk.mpn,'CP-9020270-UK');assert.equal(base.components.msib850mwifi6e.mpn,null);assert.equal(base.components.msib850mwifi6e.model,'B850M GAMING PLUS WIFI6E');
 const r=base.performanceRevisions[C];assert.deepEqual(r.approvedConfigurationIds,[CID]);assert.equal(r.purchasingPolicy.approvalStatus,'pending');assert.equal(r.purchasingPolicy.wholeBuildMaximumPence,null);
 for(const s of r.build.slots){assert.deepEqual(s.approvedIds,[ids[s.id]]);assert.equal(s.policy,'FIXED');for(const key of ['targetPence','maxPence','switchSavingPence'])assert.equal(s[key],null);}
 hold(clone());hold(fresh());
});
test('C retains eight identities without offers, or with stale/unavailable/untrusted evidence',()=>{
 for(const mutate of [d=>d.offers=[],d=>d.offers.forEach(o=>o.checkedAt='2026-10-10T00:00:00Z'),d=>d.offers.forEach(o=>o.stock='preorder'),d=>d.offers.forEach(o=>o.identityVerified=false),d=>d.offers.forEach(o=>o.itemPence=null)]){
  const d=fresh();mutate(d);const r=hold(d),html=V.parts(d,r);assert.equal((html.match(/<article/g)||[]).length,8);for(const id of Object.values(ids))assert.ok(html.includes(V.esc(d.components[id].name)));
 }
});
test('unapproved, missing or placeholder thresholds never activate C',()=>{
 for(const mutate of [r=>r.purchasingPolicy=null,r=>r.purchasingPolicy.approvalStatus='approved',r=>r.build.targetPence=0,r=>r.build.targetPence=165000,r=>r.purchasingPolicy.wholeBuildMaximumPence=180000,r=>r.build.slots[0].maxPence=Infinity,r=>r.build.slots[0].targetPence=17000]){
  const d=fresh();mutate(d.performanceRevisions[C]);assert.throws(()=>E.derive(d,now));
 }
});
test('missing complete tuple cannot be eligible even when all legacy offers qualify',()=>{
 const d=fresh(L),r=E.derive(d,now);assert.equal(r.state,'GOOD BUY');
 delete d.guideConfigurations[r.configurationId];const reg=d.performanceRevisions[L];reg.approvedConfigurationIds=reg.approvedConfigurationIds.filter(id=>id!==r.configurationId);reg.defaultConfigurationId=reg.approvedConfigurationIds[0];
 const blocked=E.derive(d,now);assert.equal(blocked.state,'UNAVAILABLE');assert.equal(blocked.reasonCode,'CONFIGURATION_NOT_APPROVED');assert.equal(blocked.completeEligible,false);assert.equal(blocked.eligiblePurchaseTotal,null);assert.doesNotMatch(V.parts(d,blocked),/View exact offer/);
});
test('duplicates, wrong power plans, cross-revision parts and incomplete guide maps fail closed',()=>{
 const mutations=[
  d=>{d.guideConfigurations.duplicate=structuredClone(d.guideConfigurations[CID]);d.performanceRevisions[C].approvedConfigurationIds.push('duplicate');},
  d=>delete d.guideConfigurations[CID],
  d=>{const cfg=d.guideConfigurations[CID],s=d.performanceRevisions[C].build.slots.find(s=>s.id==='psu');s.approvedIds=['rm750x'];s.preferredId='rm750x';cfg.components.psu='rm750x';cfg.guideVariantIds.psu=d.components.rm750x.guideVariantId;cfg.powerPlan.psuId='rm750x';cfg.hardwareSnapshot.find(s=>s.id==='psu').componentId='rm750x';cfg.hardwareSnapshot.find(s=>s.id==='psu').component=structuredClone(d.components.rm750x);},
  d=>d.guideConfigurations[CID].powerPlan.separatePcieLeads=2,
  d=>d.guideConfigurations[CID].components.gpu='gigabyte9070',
  d=>d.guideConfigurations[CID].buildRevision=L,
  d=>d.guideConfigurations[CID].compatibilityReviewed=false,
  d=>delete d.guideConfigurations[CID].guideVariantIds.ram,
  d=>d.guideConfigurations[CID].hardwareSnapshot[0].component.mpn='wrong',
  d=>d.guideVariants[d.components.asus9070xtprimeoc.guideVariantId].compatibilityReviewed=false
 ];
 for(const mutate of mutations){const d=fresh();mutate(d);assert.throws(()=>E.derive(d,now));assert.equal(E.configurationValid(d,CID),false);assert.doesNotMatch(V.guide(d,CID),/core-guide-parts/);}
});
test('legacy rules retain stock, identity, condition, delivery and 24-hour semantics',()=>{
 const good=fresh(L);assert.equal(E.derive(good,now).state,'GOOD BUY');assert.equal(E.derive(good,'2026-10-14T12:00:00Z').state,'GOOD BUY');assert.equal(E.derive(good,'2026-10-14T12:00:00.001Z').state,'STALE');
 for(const patch of [{identityVerified:false},{sellerIsRetailer:false},{condition:'used'},{currency:'USD'},{vatIncluded:false},{stock:'preorder'},{dispatchWorkingDays:99},{itemPence:null}]){const d=fresh(L);Object.assign(d.offers[0],patch);assert.equal(E.derive(d,now).state,'UNAVAILABLE');assert.equal(E.derive(d,now).eligiblePurchaseTotal,null);}
 const d=fresh(L);d.offers[0].deliveryPence=null;const r=E.derive(d,now);assert.equal(r.state,'GOOD BUY');assert.equal(r.deliveredEstimate,null); // Existing rule: unknown delivery does not itself disqualify.
 const absent=fresh(L);absent.offers=absent.offers.filter(o=>o.componentId!=='ryzen9600x');assert.equal(E.derive(absent,now).state,'UNAVAILABLE');
});
test('legacy alternative switching keeps the incumbent below the approved saving threshold',()=>{
 for(const slotId of ['gpu','ram','ssd']){
  const d=fresh(L),s=d.performanceRevisions[L].build.slots.find(s=>s.id===slotId),alt=s.approvedIds.find(id=>id!==s.preferredId),inc=d.offers.find(o=>o.componentId===s.preferredId),other=d.offers.find(o=>o.componentId===alt);
  other.itemPence=inc.itemPence-s.switchSavingPence+1;assert.equal(E.derive(d,now).selectedIds[slotId],s.preferredId);
  other.itemPence--;assert.equal(E.derive(d,now).selectedIds[slotId],alt);
  other.deliveryPence=null;assert.equal(E.derive(d,now).selectedIds[slotId],s.preferredId);
 }
});
test('saved historical snapshots do not depend on offers or current selection; static index includes all nine',()=>{
 const d=clone();d.offers=[];d.currentPerformanceRevision='unknown';
 for(const id of base.performanceRevisions[L].approvedConfigurationIds){const cfg=d.guideConfigurations[id];assert.equal(cfg.hardwareSnapshot.length,8);const before=V.guide(d,id);d.components.ryzen9600x.compatibility='different current note';assert.equal(V.guide(d,id),before);assert.match(before,/Historical Performance/);assert.ok(fs.readFileSync('core-performance-guide.html','utf8').includes('id="'+id+'"'));}
 for(const id of ['unknown','__proto__','constructor',null])assert.doesNotMatch(V.guide(d,id),/core-guide-parts/);
 assert.equal((V.guideIndex(base).match(/class="core-saved-configuration"/g)||[]).length,10);
 const html=V.guide(base,CID);for(const text of ['PCI_E2','M2_1','A2/B2','three separate','standoff','BIOS','CPU_FAN1','JFP1','not physically built'])assert.ok(html.includes(text),text);
});

test('the current HOLD is in the index link and native summary before expansion',()=>{
 const html=V.guideIndex(base),notice='Configuration C · HOLD — buying criteria awaiting approval.';
 assert.ok(html.includes('then open the matching configuration row to read its eight parts'));
 assert.ok(html.includes(`<a href="#${CID}">${CID}<br><strong>${notice}</strong></a>`));
 const entries=[...html.matchAll(/<details id="([^"]+)" class="core-saved-configuration"><summary>(.*?)<\/summary>/g)];
 assert.deepEqual(entries.map(e=>e[1]),Object.keys(base.guideConfigurations));
 for(const [,id,summary] of entries){
  if(id===CID)assert.equal(summary,`${CID}<br><strong>${notice}</strong>`);
  else if(id.startsWith("performance-1.3-b"))assert.equal(summary,`${id}<br><strong>Option B · HOLD — buying criteria awaiting approval.</strong>`);
  else assert.equal(summary,id); // Historical summaries and identities stay untouched.
 }
 assert.equal(entries.length,10);
 assert.ok(fs.readFileSync('core-performance-guide.html','utf8').includes(html));
});
