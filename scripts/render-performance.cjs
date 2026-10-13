/* Deterministic conservative parts, status and saved hardware notes. No clock or network. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'core-data.json'),'utf8'));
const engine=require('../assets/core-engine.js'),view=require('../assets/core-view.js');
const result=engine.derive(data,'2026-10-13T00:00:00Z');
function region(html,name,content){
 const start='<!-- core:'+name+':start -->',end='<!-- core:'+name+':end -->';
 if(html.split(start).length!==2||html.split(end).length!==2)throw Error('Missing or duplicate '+name+' boundary');
 const a=html.indexOf(start)+start.length,b=html.indexOf(end);if(b<a)throw Error('Invalid '+name+' boundary');
 return html.slice(0,a)+content+html.slice(b);
}
for(const name of ['core-performance.html','core-performance-guide.html']){
 const file=path.join(root,name),html=fs.readFileSync(file,'utf8');let output;
 if(name==='core-performance.html'){
  const marker='<div data-core="parts">',a=html.indexOf(marker)+marker.length,b=html.indexOf('</div></div><p class="price-note">',a);
  if(a<marker.length||b<a)throw Error('Performance parts boundary missing');
  output=region(html.slice(0,a)+view.parts(data,result,{unverified:true})+html.slice(b),'status',view.fallback(data));
 }else output=region(html,'guide-index',view.guideIndex(data));
 if(process.argv.includes('--check')){if(output!==html)throw Error('Run node scripts/render-performance.cjs to update '+name);}
 else fs.writeFileSync(file,output);
}
