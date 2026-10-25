/* Static launch specifications and hardware checklists; never changes buying state. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),{esc}=require('../assets/core-view.js');
const root=path.resolve(__dirname,'..'),d=require('../core-data.json');
const slots=['cpu','gpu','motherboard','ram','ssd','psu','cooler','case'];
function validate(build){
 if(build.state!=='HOLD'||build.purchasingApproved!==false||build.deliveredTotalPence!==null)throw Error('Launch purchasing is not approved');
 if(JSON.stringify(build.parts.map(p=>p.slot))!==JSON.stringify(slots))throw Error('Eight exact ordered components required');
 for(const p of build.parts){if(!p.name||!p.manufacturerModel||!p.notes||new URL(p.productUrl).protocol!=='https:')throw Error('Incomplete launch component');}
}
function region(html,key,content){const start=`<!-- launch:${key}:start -->`,end=`<!-- launch:${key}:end -->`;if(html.split(start).length!==2||html.split(end).length!==2)throw Error('Launch region missing: '+key);return html.slice(0,html.indexOf(start)+start.length)+content+html.slice(html.indexOf(end));}
for(const [tier,b] of Object.entries(d.launchBuilds)){
 validate(b);if(tier==='Performance')continue;
 const slug=tier.toLowerCase();
 const parts=b.parts.map((p,i)=>`<article class="part"><div class="index">${String(i+1).padStart(2,'0')}</div><div><div class="kind">${esc({cpu:"Processor (CPU)",gpu:"Graphics card (GPU)",motherboard:"Motherboard",ram:"Memory (RAM)",ssd:"Storage (SSD)",psu:"Power supply",cooler:"CPU cooler",case:"Case"}[p.slot])}</div><h3>${esc(p.name)}</h3><p class="core-mpn">${esc(p.manufacturerModel)}</p></div><div class="why"><p>${esc(p.notes)}</p><a href="${esc(p.productUrl)}" target="_blank" rel="noopener noreferrer">Exact product reference ↗</a></div><div class="target"><small>Buying advice</small><b>HOLD</b></div></article>`).join('');
 const notes=`<h2>Exact hardware checklist</h2><p>Match these eight models to the parts you receive. Product references help identify hardware; they are not live buying recommendations. Keep the exact manufacturer manuals beside you.</p><ol>${b.parts.map(p=>`<li><h3>${esc(p.name)}</h3><p><strong>${esc(p.manufacturerModel)}</strong></p><p>${esc(p.notes)}</p><p><a href="${esc(p.productUrl)}" target="_blank" rel="noopener noreferrer">Exact product reference ↗</a></p></li>`).join('')}</ol><h2>Assembly, first boot and care</h2><p>Follow the <a href="guides.html#assembly">assembly checklist</a>, then <a href="guides.html#windows">install Windows</a>. Check CPU temperature and fan operation at first boot, then check temperatures and stability under load before enabling memory profiles. Stop if cooling is not working; inspect mounting and cabling with the power disconnected.</p><p>CORE has not physically built or thermally tested this exact configuration. Keep your parts list and manuals for maintenance and upgrades. <a href="guides.html#care">Looking after your PC →</a></p>`;
 for(const [file,key,content] of [[`core-${slug}.html`,'parts',parts],[`core-${slug}-guide.html`,'notes',notes]]){
  const name=path.join(root,file),before=fs.readFileSync(name,'utf8'),after=region(before,key,content);
  if(process.argv.includes('--check')){if(after!==before)throw Error('Run node scripts/render-launch.cjs: '+file);}else fs.writeFileSync(name,after);
 }
}
module.exports={validate};
