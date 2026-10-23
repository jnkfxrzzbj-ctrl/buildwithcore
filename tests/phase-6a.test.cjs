'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {inspect}=require('../scripts/phase-6a/seo-audit.cjs');
const {calculate,assumptions}=require('../scripts/phase-6a/commercial-model.cjs');
test('SEO inventory distinguishes canonical and Open Graph and preserves duplicate metadata',()=>{
 const p=inspect(`<title>Example</title><meta content='First' name='description'><meta name="description" content="Second"><meta property="og:url" content="wrong"><link href='https://example.test/' rel='canonical'><main><h1>A<br>B</h1></main><meta content='noindex' name='robots'>`,'sample.html');
 assert.deepEqual(p.canonicals,['https://example.test/']);assert.deepEqual(p.descriptions,['First','Second']);assert.deepEqual(p.h1,['A B']);assert.deepEqual(p.robots,['noindex']);assert.equal(p.mainCount,1);
});
test('commercial model separates clicks, orders, eligible value, reversals and time',()=>{
 const r=calculate(assumptions.central);assert.equal(r.clicks,750);assert.equal(r.orders,22.5);assert.equal(r.eligibleSales,5625);assert.equal(r.revenue,101.25);assert.equal(r.cashSurplus,86.25);assert.equal(r.economicSurplus,-393.75);assert.equal(r.visitsFor250CashSurplus,13087);
});
test('zero income cannot produce finite required traffic; unknown inputs fail instead of becoming zero',()=>{
 assert.equal(calculate({...assumptions.central,commission:0}).visitsFor250CashSurplus,null);
 assert.throws(()=>calculate({...assumptions.central,conversion:null}));assert.throws(()=>calculate({...assumptions.central,retained:1.1}));
 assert.equal(calculate({...assumptions.central,visits:0}).revenue,0);
});
