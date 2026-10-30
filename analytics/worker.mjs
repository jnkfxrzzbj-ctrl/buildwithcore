import registry from './registry.mjs';
const allowed = new Set(registry.map(JSON.stringify));
const keys = ['build','component','consent','eventId','linkType','page','retailer','synthetic','timestamp','v'];
const reply = (status,origin) => new Response(null,{status,headers:{'Cache-Control':'no-store','Vary':'Origin',...(origin?{'Access-Control-Allow-Origin':origin}: {})}});
export function validEvent(e,mode,now=Date.now()) {
  return e && JSON.stringify(Object.keys(e).sort()) === JSON.stringify(keys) && e.v===1 &&
    e.consent==='page-opt-in-v1' && e.synthetic===(mode==='test') &&
    typeof e.eventId==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e.eventId) &&
    typeof e.timestamp==='string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(e.timestamp) &&
    Math.abs(Date.parse(e.timestamp)-now)<=300000 &&
    allowed.has(JSON.stringify([e.build,e.component,e.retailer,e.linkType,e.page]));
}
export async function boundedJSON(request) {
  if(!request.body)throw Error('body');
  const reader=request.body.getReader();let size=0;const chunks=[];
  try {for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2048){await reader.cancel();throw Error('size');}chunks.push(value);}}
  finally {reader.releaseLock();}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
}
export default {
 async fetch(request,env) {
  if(env.ENABLED!=='true'||!['test','production'].includes(env.MODE))return reply(503);
  const url=new URL(request.url),origin=request.headers.get('Origin');
  if(url.pathname!=='/click'||url.search)return reply(404);
  if(!origin || !(env.ALLOWED_ORIGINS||'').split(',').includes(origin))return reply(403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin','Cache-Control':'no-store'}});
  if(request.method!=='POST')return reply(405,origin);
  if(request.headers.get('Content-Type')!=='application/json')return reply(415,origin);
  const now=Date.now();let e;
  try {e=await boundedJSON(request);}catch{return reply(400,origin);}
  if(!validEvent(e,env.MODE,now))return reply(400,origin);
  // Server UTC receipt day, not a client-controlled reporting bucket. Timestamp is discarded.
  const day=new Date(now).toISOString().slice(0,10);
  try {
   // D1 batch is transactional. changes() is connection-local to the preceding insert.
   // Unique event ID provides retry/replay dedup; global daily cap limits stored spam.
   const result=await env.DB.batch([
    env.DB.prepare('INSERT OR IGNORE INTO seen_events(id,expires) SELECT ?,? WHERE (SELECT COALESCE(SUM(clicks),0) FROM daily_clicks WHERE day=?) < 5000').bind(e.eventId,now+86400000,day),
    env.DB.prepare('INSERT INTO daily_clicks(day,build,component,retailer,link_type,page,clicks) SELECT ?,?,?,?,?,?,1 WHERE changes()=1 ON CONFLICT(day,build,component,retailer,link_type,page) DO UPDATE SET clicks=clicks+1').bind(day,e.build,e.component,e.retailer,e.linkType,e.page)
   ]);
   return reply(result[0].meta.changes ? 204 : 202,origin);
  } catch {return reply(503,origin);}
 },
 async scheduled(controller,env) {
  // Retention continues even when collection is disabled for rollback or abuse.
  await env.DB.batch([
   env.DB.prepare('DELETE FROM seen_events WHERE expires < ?').bind(Date.now()),
   env.DB.prepare("DELETE FROM daily_clicks WHERE day < date('now','-88 days')")
  ]);
 }
};
