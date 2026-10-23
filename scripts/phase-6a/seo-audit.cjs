'use strict';
// Read-only inventory for CORE's controlled static HTML. Not a general HTML parser
// or proof of Google indexing. Never writes site files or contacts a network.
const fs=require('node:fs'),path=require('node:path');
const text=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
function attrs(tag){return Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/g)].map(m=>[m[1].toLowerCase(),m[3]]));}
function inspect(html,file){
 const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0]));
 const links=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0]));
 return {file,bytes:Buffer.byteLength(html),title:text((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||''),
  descriptions:metas.filter(m=>m.name==='description').map(m=>m.content),
  canonicals:links.filter(l=>l.rel==='canonical').map(l=>l.href),
  robots:metas.filter(m=>m.name==='robots').map(m=>m.content),
  h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>text(m[1])),
  mainCount:[...html.matchAll(/<main\b/gi)].length,
  structuredDataCount:[...html.matchAll(/type=["']application\/ld\+json["']/gi)].length,
  externalScripts:[...html.matchAll(/<script\b[^>]*src=["'](https?:[^"']+)["']/gi)].map(m=>m[1])};
}
function audit(root){
 const pages=JSON.parse(fs.readFileSync(path.join(root,'scripts/public-files.json'),'utf8')).filter(f=>f.endsWith('.html')).map(f=>inspect(fs.readFileSync(path.join(root,f),'utf8'),f));
 const findings=[];
 for(const p of pages){
  if(p.h1.length!==1||p.mainCount!==1)findings.push({file:p.file,code:'semantic-landmarks',h1:p.h1.length,main:p.mainCount});
  if(p.file==='404.html')continue;
  if(!p.title||p.descriptions.length!==1||p.canonicals.length!==1)findings.push({file:p.file,code:'metadata-missing-or-duplicate'});
  if(p.robots.some(r=>/noindex|none/i.test(r)))findings.push({file:p.file,code:'noindex'});
 }
 for(const name of ['robots.txt','sitemap.xml'])if(!fs.existsSync(path.join(root,name)))findings.push({file:name,code:'absent-source-file'});
 return {scope:'Source inventory only; HTTP headers, redirects, rendering and indexing require separate checks.',pages,findings};
}
if(require.main===module)console.log(JSON.stringify(audit(path.resolve(__dirname,'../..')),null,2));
module.exports={inspect,audit};
