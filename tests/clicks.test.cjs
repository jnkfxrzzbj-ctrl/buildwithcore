const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {DatabaseSync}=require('node:sqlite');
const {randomUUID}=require('node:crypto');
async function setup(){
 const {default:worker,validEvent}=await import('../analytics/worker.mjs');
 const {default:registry}=await import('../analytics/registry.mjs');
 const sql=new DatabaseSync(':memory:');sql.exec(fs.readFileSync('analytics/schema.sql','utf8'));
 const DB={prepare(query){return {query,args:[],bind(...args){return {query,args};}}},async batch(statements){sql.exec('BEGIN');try{const r=statements.map(s=>({meta:sql.prepare(s.query).run(...s.args)}));sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 const env={DB,ENABLED:'true',MODE:'test',ALLOWED_ORIGINS:'http://localhost:8765'};
 const event=(row=registry[0])=>({v:1,build:row[0],component:row[1],retailer:row[2],linkType:row[3],page:row[4],timestamp:new Date().toISOString(),eventId:randomUUID(),synthetic:true,consent:'page-opt-in-v1'});
 const send=(e,changes={})=>worker.fetch(new Request('http://localhost/click',{method:'POST',headers:{Origin:env.ALLOWED_ORIGINS,'Content-Type':'application/json'},body:JSON.stringify(e),...changes}),env);
 return {worker,validEvent,registry,sql,env,event,send};
}
test('all rendered attribution tuples validate; atomic duplicate prevention and report totals',async()=>{
 const t=await setup();for(const row of t.registry){let e=t.event(row);assert.equal((await t.send(e)).status,204);assert.equal((await t.send(e)).status,202);}
 assert.equal(t.sql.prepare('SELECT SUM(clicks) n FROM daily_clicks').get().n,t.registry.length);
 assert.equal(t.sql.prepare('SELECT COUNT(DISTINCT build) n FROM daily_clicks').get().n,3);
 for(const query of fs.readFileSync('analytics/report.sql','utf8').replace(/--[^\n]*/g,'').split(';').filter(x=>x.trim()))assert.ok(t.sql.prepare(query).all().length);
});
test('reject unknown dimensions, extra identifying fields, stale events and production test contamination',async()=>{
 const t=await setup();for(const mutation of [{build:'fake'},{component:'unknown'},{retailer:'evil'},{page:'privacy.html'},{linkType:'unknown'},{email:'no@example.test'},{timestamp:'2000-01-01T00:00:00.000Z'},{eventId:'visitor'},{consent:'no'},{synthetic:false}])assert.equal((await t.send({...t.event(),...mutation})).status,400);
 t.env.MODE='production';assert.equal((await t.send(t.event())).status,400);assert.equal((await t.send({...t.event(),synthetic:false})).status,204);
});
test('origin, size, method and configuration gates fail closed; storage failure is contained',async()=>{
 const t=await setup();assert.equal((await t.send(t.event(),{headers:{Origin:'https://evil.test','Content-Type':'application/json'}})).status,403);
 assert.equal((await t.send(t.event(),{body:'x'.repeat(2050)})).status,400);
 assert.equal((await t.send(t.event(),{headers:{Origin:t.env.ALLOWED_ORIGINS,'Content-Type':'text/plain'}})).status,415);
 assert.equal((await t.send(null,{method:'GET',body:undefined})).status,405);
 t.env.ENABLED='false';assert.equal((await t.send(t.event())).status,503);t.env.ENABLED='true';t.env.DB.batch=()=>Promise.reject(Error('offline'));assert.equal((await t.send(t.event())).status,503);
});
test('retention removes expired event IDs and old aggregates; daily cap contains stored spam',async()=>{
 const t=await setup();await t.send(t.event());t.sql.exec("INSERT INTO seen_events VALUES ('old',0); UPDATE daily_clicks SET day='2000-01-01'");
 t.env.ENABLED='false';await t.worker.scheduled({},t.env);t.env.ENABLED='true';assert.equal(t.sql.prepare('SELECT COUNT(*) n FROM daily_clicks').get().n,0);assert.equal(t.sql.prepare("SELECT COUNT(*) n FROM seen_events WHERE id='old'").get().n,0);
 await t.send(t.event());t.sql.exec('UPDATE daily_clicks SET clicks=5000');assert.equal((await t.send(t.event())).status,202);assert.equal(t.sql.prepare('SELECT SUM(clicks) n FROM daily_clicks').get().n,5000);
});
test('daily reporting keeps dates separate and CORS allows only the configured origin',async()=>{
 const t=await setup();await t.send(t.event());t.sql.exec("UPDATE daily_clicks SET day='2026-01-01'");await t.send(t.event());
 const rows=t.sql.prepare('SELECT day,SUM(clicks) n FROM daily_clicks GROUP BY day ORDER BY day').all();assert.equal(rows.length,2);assert.equal(rows[0].n,1);assert.equal(rows[1].n,1);
 const r=await t.send(null,{method:'OPTIONS',body:undefined});assert.equal(r.status,204);assert.equal(r.headers.get('Access-Control-Allow-Origin'),t.env.ALLOWED_ORIGINS);assert.equal(r.headers.get('Access-Control-Allow-Credentials'),null);
});
test('committed configuration is disabled and schema contains no visitor columns',()=>{
 const js=fs.readFileSync('assets/core-clicks.js','utf8');assert.match(js,/endpoint: ''/);assert.doesNotMatch(js,/localStorage|sessionStorage|document\.cookie|preventDefault/);
 assert.equal(JSON.parse(fs.readFileSync('analytics/wrangler.jsonc')).vars.ENABLED,'false');
});
