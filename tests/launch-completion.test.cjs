const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('all three guide routes reach usable assembly and OS guidance without JavaScript',()=>{
 for(const tier of ['starter','performance','high-end'])assert.match(fs.readFileSync('core-'+tier+'-guide.html','utf8'),/guides.html#assembly/);
 const g=fs.readFileSync('guides.html','utf8');for(const id of ['assembly','windows','care'])assert.ok(g.includes('id="'+id+'"'));
 for(const phrase of ['never open','AM4 and AM5','EPS and PCIe','5V addressable RGB','deleting partitions','at least 8GB'])assert.ok(g.toLowerCase().includes(phrase.toLowerCase()),phrase);
 assert.match(g,/https:\/\/www.microsoft.com\/en-gb\/software-download\/windows11/);
});
test('public placeholders and unsupported budget anchors are removed without changing C',()=>{
 for(const f of fs.readdirSync('.').filter(f=>f.endsWith('.html')))assert.doesNotMatch(fs.readFileSync(f,'utf8'),/\[ADD YOUR|>EARLY ACCESS</);
 for(const t of ['starter','high-end']){const s=fs.readFileSync('core-'+t+'.html','utf8');assert.match(s,/HOLD/);assert.doesNotMatch(s,/Earlier budget estimate|~£|Watch pricing/);}
 const d=require('../core-data.json');assert.equal(Object.keys(d.guideConfigurations).length,10);assert.equal(d.currentPerformanceRevision,'performance-1.3-b');assert.equal(require('../assets/core-engine.js').derive(d,'2026-10-22T12:00:00Z').state,'HOLD');
});
