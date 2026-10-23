'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const {createHash}=require('node:crypto'),{spawnSync}=require('node:child_process');
const P=require('../scripts/package-public.cjs');
const root=path.resolve(__dirname,'..'),now='2026-10-14T12:00:00Z';
// Independent public inventory for this approved baseline, not inferred from copy output.
const expected=['404.html','CNAME','about.html','affiliate-disclosure.html','assets/core-affiliates.js','assets/core-client.js','assets/core-data.generated.js','assets/core-engine.js','assets/core-view.js','assets/navigation.js','assets/performance.css','assets/public.css','builds.html','contact.html','core-high-end-guide.html','core-high-end.html','core-performance-guide.html','core-performance.html','core-starter-guide.html','core-starter.html','faq.html','guides.html','index.html','privacy.html'];
function temp(t){const dir=fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()),'core-package-test-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));return dir;}
function fixture(t){
 const parent=temp(t),dir=path.join(parent,'repo');fs.mkdirSync(dir);fs.mkdirSync(path.join(dir,'assets'));fs.mkdirSync(path.join(dir,'scripts'));
 for(const name of [...expected,'core-data.json','scripts/build.cjs','scripts/render-performance.cjs','scripts/render-launch.cjs','scripts/public-files.json'])fs.copyFileSync(path.join(root,name),path.join(dir,name));
 return {root:dir,out:path.join(parent,'site'),parent};
}
function readData(dir){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(dir,'assets/core-data.generated.js'),'utf8'),ctx);return JSON.parse(JSON.stringify(ctx.window.CORE_DATA));}
test('package contains exactly 24 approved public files with source bytes, modes and stable timestamps',t=>{
 const parent=temp(t),a=P.packagePublic({out:path.join(parent,'a')}),b=P.packagePublic({out:path.join(parent,'b')});
 assert.deepEqual(P.manifest(root),expected);assert.deepEqual(a.files.map(f=>f.path),expected);assert.deepEqual(a.files,b.files);
 const hash=createHash('sha256');
 for(const name of expected){const bytes=fs.readFileSync(path.join(a.directory,name));assert.deepEqual(bytes,fs.readFileSync(path.join(root,name)));if(!['assets/core-view.js','core-performance-guide.html'].includes(name)){hash.update(name+'\0');hash.update(bytes);hash.update('\0');}
  for(const directory of [a.directory,b.directory]){const s=fs.statSync(path.join(directory,name));assert.equal(s.nlink,1);assert.equal(s.mode&0o777,0o644);assert.equal(s.mtimeMs,946684800000);}
 }
 // Phase 5F reviews exact hardware and checklist integration; see phase-5f-build-completion.md.
 // Historical data has a separate PR19 digest lock; affiliates and 24-file allowlist remain unchanged.
 // This fixed digest must not be regenerated without reviewing the public diff.
 assert.equal(hash.digest('hex'),'f5811475fe3553c42c68e6c524617ba960d8c46d47f4d4fc775e86e77572d5fb');
 const verified=require('../scripts/verify-public.cjs').verify(a.directory);
 assert.equal(verified.fingerprint,'3eafa3f5de4c5a39589663f764a3acc46e760aa3b7a9786c92f65e83157afd4f');
 console.log('Phase 5 verified public package:',verified.count,verified.fingerprint);
 for(const name of ['core-data.json','scripts','tests','.github','.git','.env','dist'])assert.equal(fs.existsSync(path.join(a.directory,name)),false);
});
test('source-only secrets, research, private feeds and unrelated development files are never copied',t=>{
 const f=fixture(t);for(const name of ['.env','private-feed.json','internal-research.md','debug.log','credentials.json'])fs.writeFileSync(path.join(f.root,name),'NOT_PUBLIC_SENTINEL');
 fs.mkdirSync(path.join(f.root,'fixtures'));fs.writeFileSync(path.join(f.root,'fixtures','retailer.json'),'NOT_PUBLIC_SENTINEL');
 const result=P.packagePublic(f);assert.deepEqual(result.files.map(x=>x.path),expected);
 for(const {path:name} of result.files)assert.ok(!fs.readFileSync(path.join(result.directory,name),'utf8').includes('NOT_PUBLIC_SENTINEL'));
});
test('every missing public file fails before producing output',t=>{
 for(const name of expected){const f=fixture(t);fs.unlinkSync(path.join(f.root,name));assert.throws(()=>P.packagePublic(f));assert.equal(fs.existsSync(f.out),false,name);}
});
test('unexpected public assets, pages, directory payloads, unsafe manifests and known credential patterns fail closed',t=>{
 const mutations=[
  f=>fs.writeFileSync(path.join(f.root,'assets','private-feed.json'),'{}'),
  f=>fs.writeFileSync(path.join(f.root,'notes.html'),'<p>internal</p>'),
  f=>fs.mkdirSync(path.join(f.root,'assets','extra')),
  f=>fs.writeFileSync(path.join(f.root,'scripts/public-files.json'),'["../private.json"]'),
  f=>fs.writeFileSync(path.join(f.root,'scripts/public-files.json'),'["403.html"]'),
  f=>fs.writeFileSync(path.join(f.root,'scripts/public-files.json'),'["CNAME","CNAME"]'),
  f=>fs.appendFileSync(path.join(f.root,'assets/navigation.js'),'\n// -----BEGIN PRIVATE KEY-----'),
  f=>fs.appendFileSync(path.join(f.root,'assets/navigation.js'),'\n// https://example.test/?access_token=sentinel'),
  f=>fs.writeFileSync(path.join(f.root,'CNAME'),'wrong.example')
 ];
 for(const mutate of mutations){const f=fixture(t);mutate(f);assert.throws(()=>P.packagePublic(f));assert.equal(fs.existsSync(f.out),false);}
});
test('file/directory symlinks, hardlinks, in-repository output and existing destinations are rejected without damage',t=>{
 for(const name of ['index.html','assets','core-data.json']){
  const f=fixture(t),target=path.join(f.parent,'outside');fs.writeFileSync(target,'outside sentinel');fs.rmSync(path.join(f.root,name),{recursive:true});fs.symlinkSync(target,path.join(f.root,name));
  assert.throws(()=>P.packagePublic(f));assert.equal(fs.readFileSync(target,'utf8'),'outside sentinel');assert.equal(fs.existsSync(f.out),false);
 }
 {const f=fixture(t);fs.linkSync(path.join(f.root,'index.html'),path.join(f.parent,'hardlink'));assert.throws(()=>P.packagePublic(f),/unsafe file/);}
 {const f=fixture(t);for(const out of [f.root,path.join(f.root,'dist'),f.parent])assert.throws(()=>P.packagePublic({...f,out}));assert.equal(fs.existsSync(path.join(f.root,'dist')),false);}
 {const f=fixture(t);fs.mkdirSync(f.out);fs.writeFileSync(path.join(f.out,'keep'),'sentinel');assert.throws(()=>P.packagePublic(f));assert.equal(fs.readFileSync(path.join(f.out,'keep'),'utf8'),'sentinel');}
 {const f=fixture(t);const link=path.join(f.parent,'linked');fs.symlinkSync(f.root,link,'dir');assert.throws(()=>P.packagePublic({...f,out:path.join(link,'dist')}));assert.equal(fs.existsSync(path.join(f.root,'dist')),false);}
});
test('broken public references and stale generated/static fallbacks fail without repair or partial output',t=>{
 const mutations=[
  f=>fs.appendFileSync(path.join(f.root,'index.html'),'<a href="scripts/README.md">internal</a>'),
  f=>fs.appendFileSync(path.join(f.root,'index.html'),'<img src="missing.png">'),
  f=>fs.appendFileSync(path.join(f.root,'index.html'),'<a href="core-performance.html#missing">broken</a>'),
  f=>fs.appendFileSync(path.join(f.root,'assets/public.css'),'a{background:url(missing.svg)}'),
  f=>fs.appendFileSync(path.join(f.root,'assets/core-data.generated.js'),'\n'),
  f=>{const p=path.join(f.root,'core-performance.html');fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('Wait before buying this PC.','Wrong fallback'));},
  f=>{const p=path.join(f.root,'core-starter.html');fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('NE75060019P1-GB2063D','WRONG GPU'));},
  f=>{const p=path.join(f.root,'core-performance-guide.html');fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('Exact configuration index','Wrong index'));}
 ];
 for(const mutate of mutations){const f=fixture(t);mutate(f);const before=fs.readFileSync(path.join(f.root,'core-performance.html'));assert.throws(()=>P.packagePublic(f));assert.equal(fs.existsSync(f.out),false);assert.deepEqual(fs.readFileSync(path.join(f.root,'core-performance.html')),before);}
});
test('packaged browser modules retain exact C, all eight historical configurations, affiliate results and permanent HOLD',t=>{
 const f=fixture(t);P.packagePublic(f);const d=readData(f.out),source=require('../core-data.json');assert.deepEqual(d,source);
 const E=require(path.join(f.out,'assets/core-engine.js')),V=require(path.join(f.out,'assets/core-view.js')),A=require(path.join(f.out,'assets/core-affiliates.js'));
 const before=require('../assets/core-engine.js').derive(source,now),r=E.derive(d,now);assert.deepEqual(r,before);assert.equal(r.state,'HOLD');assert.equal(r.completeEligible,false);assert.equal(r.eligiblePurchaseTotal,null);
 const exact={cpu:'ryzen9600x',gpu:'reaper9070xt',motherboard:'msib850mwifi6e',ram:'fitv28',ssd:'sn7100_1tb',psu:'rm850x2024uk',cooler:'freezer36standard',case:'h6flow'};assert.deepEqual(r.selectedIds,exact);
 const page=fs.readFileSync(path.join(f.out,'core-performance.html'),'utf8'),guide=fs.readFileSync(path.join(f.out,'core-performance-guide.html'),'utf8');assert.match(page,/HOLD — buying criteria awaiting approval/);assert.equal((page.match(/class="core-price-unchecked"/g)||[]).length,8);assert.doesNotMatch(page,/View exact offer|A good time to buy|Ready to buy\. Above our target/);assert.match(page,/details need a fresh check/);
 for(const id of Object.values(exact)){const c=d.components[id];assert.ok(page.includes(V.esc(c.mpn||c.ean||c.model)));assert.deepEqual(A.links(id,c),require('../assets/core-affiliates.js').links(id,c));}
 const old=d.performanceRevisions['performance-1.1-approved'].approvedConfigurationIds;assert.equal(old.length,8);
 for(const id of old){assert.equal(V.guide(d,id),require('../assets/core-view.js').guide(source,id));assert.ok(guide.includes('id="'+id+'"'));assert.equal((V.guide(d,id).match(/<li>/g)||[]).length,8);}
 assert.equal((guide.match(/class="core-saved-configuration"/g)||[]).length,10);assert.match(guide,/exact configuration index/);
});
test('CLI works from another cwd/timezone and prints only an external directory; invalid arguments do not write',t=>{
 const parent=temp(t),script=path.join(root,'scripts/package-public.cjs');
 for(const [i,tz]of ['UTC','Pacific/Auckland'].entries()){
  const out=path.join(parent,'out-'+i);const r=spawnSync(process.execPath,[script,'--out',out],{cwd:parent,env:{...process.env,TZ:tz},encoding:'utf8'});assert.equal(r.status,0,r.stderr);assert.equal(r.stdout.trim(),out);assert.deepEqual(P.inventory(out).map(x=>x.path),expected);
 }
 assert.deepEqual(P.inventory(path.join(parent,'out-0')),P.inventory(path.join(parent,'out-1')));
 for(const args of [['--check'],['--out'],['--out',path.join(parent,'bad'),'extra']]){const r=spawnSync(process.execPath,[script,...args],{encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/usage:/);assert.equal(fs.existsSync(path.join(parent,'bad')),false);}
});

test('404 recovery links and assets are root-relative at nested missing routes',()=>{
 const html=fs.readFileSync(path.join(root,'404.html'),'utf8');
 assert.match(html,/<meta name="robots" content="noindex">/);
 assert.match(html,/404 · Page not found/);assert.doesNotMatch(html,/<base\b|http-equiv="refresh"/i);
 for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  assert.ok(ref.startsWith('/')||ref.startsWith('#'),ref);
 }
});
