'use strict';
// Exact-file packaging only. Never generates prices, modifies source or deploys.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const {createHash}=require('node:crypto');
const ROOT=path.resolve(__dirname,'..');
const EPOCH=new Date('2000-01-01T00:00:00Z');
const fail=message=>{throw Error('Public package: '+message);};
const within=(base,target)=>target===base||target.startsWith(base+path.sep);
function regular(root,name){
 let file=root;
 for(const part of name.split('/')){
  file=path.join(file,part);
  const stat=fs.lstatSync(file);
  if(stat.isSymbolicLink())fail('symlink rejected: '+name);
 }
 const stat=fs.lstatSync(file);
 if(!stat.isFile()||stat.nlink!==1||!within(root,fs.realpathSync(file)))fail('unsafe file: '+name);
 return fs.readFileSync(file);
}
function manifest(root){
 const files=JSON.parse(regular(root,'scripts/public-files.json'));
 if(!Array.isArray(files)||!files.length||files.some(f=>typeof f!=='string'))fail('invalid allowlist');
 if(new Set(files).size!==files.length||JSON.stringify([...files].sort())!==JSON.stringify(files))fail('allowlist must be unique and sorted');
 for(const f of files){
  // Only this site's flat HTML pages, browser assets and domain file are eligible.
  // No JSON, Markdown, maps, hidden paths, feeds, keys or arbitrary directories.
  if(!(f==='CNAME'||f==='404.html'||/^[a-z][a-z0-9-]*\.html$/.test(f)||/^assets\/[a-z][a-z0-9.-]*\.(js|css|webp)$/.test(f)))fail('unsafe allowlist path: '+f);
 }
 return files;
}
function references(files){
 const origin='https://buildwithcore.co.uk';
 for(const [name,bytes] of files){
  const source=bytes.toString('utf8'),refs=[];
  if(name.endsWith('.html')){
   if(/<base\b|\bsrcset\s*=/i.test(source))fail('unsupported base/srcset; review reference validation: '+name);
   for(const m of source.matchAll(/\b(?:href|src|data-src|action|poster)\s*=\s*(["'])(.*?)\1/gi))refs.push(m[2]);
  }
  if(/\.(html|css)$/.test(name)){
   for(const m of source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi))refs.push(m[1]);
   for(const m of source.matchAll(/@import\s+["']([^"']+)["']/gi))refs.push(m[1]);
  }
  if(name.endsWith('.js')){
   // Literal static routes and CommonJS browser-module counterparts. Dynamic
   // browser requests are additionally covered by the browser regression suite.
   for(const m of source.matchAll(/["']((?:\.\/)?(?:assets\/)?[a-z][a-z0-9.-]*\.(?:html|js|css)(?:[?#][^"']*)?)["']/gi))refs.push(m[1]);
  }
  for(const raw of refs){
   const ref=raw.replaceAll('&amp;','&');
   if(/^(?:mailto:|tel:|data:)/i.test(ref))continue;
   const base=name.endsWith('.js')&&/\.html(?:[?#]|$)/.test(ref)?'index.html':name;
   const u=new URL(ref,origin+'/'+base);
   if(!['http:','https:'].includes(u.protocol))fail('unsafe reference in '+name);
   if(u.origin!==origin)continue;
   let target=decodeURIComponent(u.pathname).slice(1)||'index.html';
   if(target.endsWith('/'))target+='index.html';
   if(!files.has(target))fail('unpublished reference in '+name+': '+target);
   if(u.hash&&target.endsWith('.html')){
    const id=decodeURIComponent(u.hash.slice(1));
    const ids=[...files.get(target).toString('utf8').matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)].map(m=>m[2]);
    if(!ids.includes(id))fail('missing fragment in '+name+': '+target+'#'+id);
   }
  }
 }
}
function secretCheck(name,bytes){
 // Defence in depth, not a universal secret detector. Never print matched values.
 const text=bytes.toString('utf8');
 if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:AKIA|ASIA)[A-Z0-9]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b|[?&](?:api[_-]?key|access[_-]?token|auth[_-]?token|token)=|\b(?:api[_-]?key|client[_-]?secret|password)\s*["']?\s*[:=]\s*["'][^"']+["']/i.test(text))fail('possible credential in '+name);
}
function audit(root){
 const list=manifest(root),allowed=new Set(list);
 for(const entry of fs.readdirSync(root)){
  if(/\.(?:html?|js|css|png|jpe?g|svg|ico|webp|woff2?)$/i.test(entry)&&!allowed.has(entry))fail('unexpected public file: '+entry);
 }
 if(fs.lstatSync(path.join(root,'assets')).isSymbolicLink())fail('symlink rejected: assets');
 for(const entry of fs.readdirSync(path.join(root,'assets'))){
  if(!allowed.has('assets/'+entry))fail('unexpected public asset: '+entry);
 }
 const files=new Map(list.map(name=>[name,regular(root,name)]));
 if(files.get('CNAME')?.toString('utf8').trim()!=='buildwithcore.co.uk')fail('unexpected CNAME');
 for(const [name,bytes] of files)secretCheck(name,bytes);
 references(files);
 // Check, do not repair: stale generated/static output is a failed package.
 for(const name of ['core-data.json','scripts/build.cjs','scripts/render-performance.cjs','scripts/render-launch.cjs'])regular(root,name);
 for(const name of ['build.cjs','render-performance.cjs','render-launch.cjs']){
  try{execFileSync(process.execPath,[path.join(root,'scripts',name),'--check'],{cwd:root,stdio:'pipe'});}
  catch{fail(name+' --check failed; run the documented verification commands');}
 }
 // Detect source changes during checks; never publish a mixture of revisions.
 for(const [name,bytes] of files)if(!bytes.equals(regular(root,name)))fail('source changed during validation: '+name);
 return files;
}
function inventory(directory){
 const result=[];
 function visit(relative){
  for(const entry of fs.readdirSync(path.join(directory,relative),{withFileTypes:true}).sort((a,b)=>a.name<b.name?-1:1)){
   const name=relative?relative+'/'+entry.name:entry.name;
   if(entry.isSymbolicLink())fail('output symlink: '+name);
   if(entry.isDirectory())visit(name);
   else {const bytes=regular(directory,name);result.push({path:name,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
  }
 }
 visit('');return result;
}
function packagePublic({root=ROOT,out}={}){
 root=fs.realpathSync(root);const files=audit(root);
 let destination;
 if(out){
  destination=path.resolve(out);const parent=path.dirname(destination);
  if(fs.realpathSync(parent)!==parent)fail('output parent must not contain symlinks');
  if(within(root,destination)||within(destination,root))fail('output must be outside repository and not its ancestor');
  // mkdir without recursive/overwrite: an existing file, directory or link fails.
  fs.mkdirSync(destination,{mode:0o755});
 }else{
  const parent=fs.realpathSync(os.tmpdir());
  if(within(root,parent))fail('temporary directory is inside repository');
  destination=fs.mkdtempSync(path.join(parent,'core-public-'));fs.chmodSync(destination,0o755);
 }
 try{
  fs.mkdirSync(path.join(destination,'assets'),{mode:0o755});
  for(const [name,bytes] of files){
   const target=path.join(destination,name);
   fs.writeFileSync(target,bytes,{flag:'wx',mode:0o644});fs.chmodSync(target,0o644);fs.utimesSync(target,EPOCH,EPOCH);
  }
  for(const dir of ['assets','']){const p=path.join(destination,dir);fs.chmodSync(p,0o755);fs.utimesSync(p,EPOCH,EPOCH);}
  const entries=inventory(destination);
  if(JSON.stringify(entries.map(x=>x.path))!==JSON.stringify([...files.keys()]))fail('output inventory mismatch');
  return {directory:destination,files:entries};
 }catch(error){
  // Only remove the new directory this invocation created; never user output.
  fs.rmSync(destination,{recursive:true,force:true});throw error;
 }
}
if(require.main===module){
 try{
  const args=process.argv.slice(2);
  if(args.length&&!(args.length===2&&args[0]==='--out'&&args[1]))fail('usage: node scripts/package-public.cjs [--out NEW_EXTERNAL_DIRECTORY]');
  const result=packagePublic({out:args[1]});
  // Directory on stdout permits shell capture. No logs/manifests enter the site.
  console.log(result.directory);
 }catch(error){console.error(error.message);process.exitCode=1;}
}
module.exports={packagePublic,audit,manifest,inventory,references,secretCheck};
