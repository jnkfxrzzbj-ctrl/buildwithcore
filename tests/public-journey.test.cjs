const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const V=require('../assets/core-view.js');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('assets/core-data.generated.js','utf8'),ctx);
const d=ctx.window.CORE_DATA;
test('known saved parts retain their own exact identities; unknown links do not borrow current parts',()=>{
 for(const [id,cfg] of Object.entries(d.guideConfigurations)){
  const html=V.guide(d,id);
  assert.equal((html.match(/<li>/g)||[]).length,8);
  for(const component of Object.values(cfg.components)){const c=d.components[component];assert.ok(html.includes(V.esc(c.mpn||c.ean)));}
  assert.match(html,/not a purchase record/);assert.match(html,/assembly instructions are not yet released/);
 }
 for(const id of ['missing','__proto__','constructor','<script>alert(1)</script>']){
  const html=V.guide(d,id);assert.match(html,/could not be found/);assert.doesNotMatch(html,/core-guide-parts|<script>/);
 }
 assert.match(V.guide(d,null),/Performance hardware notes/);
});
test('public copy no longer contradicts affiliate use or unreleased guides',()=>{
 assert.doesNotMatch(fs.readFileSync('faq.html','utf8'),/Not yet\. Current retailer links/);
 assert.doesNotMatch(fs.readFileSync('about.html','utf8'),/Future affiliate commission/);
 for(const tier of ['starter','high-end']){
  assert.match(fs.readFileSync('core-'+tier+'.html','utf8'),/UNDER REVIEW/);
  assert.doesNotMatch(fs.readFileSync('core-'+tier+'-guide.html','utf8'),/YOU BUILT IT|Enable the memory profile/);
 }
});
