/* Regenerate conservative no-JavaScript parts using the same view as the browser. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/core-data.generated.js'),'utf8'),context);
const data=context.window.CORE_DATA;
const engine=require('../assets/core-engine.js'),view=require('../assets/core-view.js');
const file=path.join(root,'core-performance.html'),html=fs.readFileSync(file,'utf8');
const marker='<div data-core="parts">',start=html.indexOf(marker)+marker.length,end=html.indexOf('</div></div><p class="price-note">',start);
if(start<marker.length||end<start)throw Error('Performance parts boundary missing');
const output=html.slice(0,start)+view.parts(data,engine.derive(data),{unverified:true})+html.slice(end);
if(process.argv.includes('--check')){if(output!==html)throw Error('Run node scripts/render-performance.cjs to update static parts');}
else fs.writeFileSync(file,output);
