const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const files=require('../scripts/public-files.json');
test('Phase 5I preserves canonical hardware, engine, attribution and Starter diagrams',()=>{
 const hash=b=>require('node:crypto').createHash('sha256').update(b).digest('hex');
 const locks={"core-data.json": "2e27a81c7e8a891cce31946946fdbd008d0bb8d64a8c828f94154f4063780222", "assets/core-data.generated.js": "7d4b0f21732df41c4995ed8ee3862f1acc7371f1c4ac66291fe0734e58c83bd2", "assets/core-engine.js": "3eb4c3a76f407694e4b14b8d14d8b3e76202967503b32921fc23d86289e392d3", "assets/core-affiliates.js": "1ff72d584ecc979b906f3347af86df16837ea0708e38f557e4e6ea14ab0f0483"};
 for(const [name,digest] of Object.entries(locks))assert.equal(hash(fs.readFileSync(name)),digest);
 assert.equal(hash(JSON.stringify(fs.readFileSync('core-starter-guide.html','utf8').match(/<svg\b[\s\S]*?<\/svg>/g))),'8b6bd97f5a356a16c5d66b8587e2373fdc51562a8efd0131ad71576e1900b438');
});
test('all 15 pages share the shell, exact current-page context and build action',()=>{
 const pages=files.filter(x=>x.endsWith('.html'));assert.equal(pages.length,15);
 for(const file of pages){const s=fs.readFileSync(file,'utf8');assert.match(s,/<div class="wrap core-header">/);assert.match(s,/>About CORE<\/a>/);assert.match(s,/<a class="navcta" href="\/?builds.html">Choose a build<\/a>/);assert.equal((s.match(/<h1[ >]/g)||[]).length,1);}
});
test('representative imagery is explicit, dimensioned, optimized and limited to useful pages',()=>{
 const bytes=fs.readFileSync('assets/h6-exterior.webp');assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');assert.ok(bytes.length<80000);
 for(const f of ['index.html','builds.html','core-starter.html','core-performance.html','core-high-end.html']){const s=fs.readFileSync(f,'utf8');assert.match(s,/Illustrative image — not an actual CORE build\./);assert.doesNotMatch(s,/Representative AI illustration/);assert.match(s,/width="1152" height="768"/);}
});
