'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {spawn}=require('node:child_process');
const {packagePublic}=require('../scripts/package-public.cjs');
test('HTTP acceptance handles both hosts and rejects development-file exposure', async()=>{
 const {directory,files}=packagePublic();
 const names=new Set(files.map(f=>f.path));
 let provider='github',leak=false;
 const server=http.createServer((req,res)=>{
  const u=new URL(req.url,'http://localhost');
  let name=u.pathname.slice(1)||'index.html';
  if(provider==='cloudflare'&&u.pathname.endsWith('.html')){
   res.writeHead(308,{location:u.pathname.replace(/\.html$/,'')+u.search});return res.end();
  }
  if(!names.has(name)&&names.has(name+'.html'))name+='.html';
  const found=names.has(name);
  res.statusCode=leak&&name==='core-data.json'?200:found?200:404;
  res.setHeader('content-type',name.endsWith('.webp')?'image/webp':name.endsWith('.css')?'text/css':name.endsWith('.js')?'text/javascript':'text/html');
  res.end(req.method==='HEAD'?undefined:fs.readFileSync(path.join(directory,found?name:'404.html')));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const run=()=>new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[path.join(__dirname,'pages-routing-check.cjs')],{env:{...process.env,CORE_PAGES_ORIGIN:`http://127.0.0.1:${server.address().port}`,CORE_PUBLIC_DIR:directory,CORE_HOSTING_PROVIDER:provider}});
  let output='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
  child.on('error',reject);child.on('close',code=>resolve({code,output}));
 });
 try{
  for(provider of ['github','cloudflare']){const r=await run();assert.equal(r.code,0,r.output);}
  provider='github';leak=true;assert.notEqual((await run()).code,0);
  leak=false;provider='typo';assert.notEqual((await run()).code,0);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));fs.rmSync(directory,{recursive:true,force:true});}
});
