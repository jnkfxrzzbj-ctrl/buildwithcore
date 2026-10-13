'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {createHash} = require('node:crypto');
const {spawnSync} = require('node:child_process');
const {generate, build} = require('../scripts/build.cjs');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'core-data.json'), 'utf8');
const bundle = fs.readFileSync(path.join(root, 'assets/core-data.generated.js'), 'utf8');
const data = JSON.parse(source);

function browserData(script) {
  const context = {window: {}};
  vm.runInNewContext(script, context, {timeout: 1000});
  return JSON.parse(JSON.stringify(context.window.CORE_DATA));
}

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'core-generation-'));
  t.after(() => fs.rmSync(dir, {recursive: true, force: true}));
  fs.mkdirSync(path.join(dir, 'assets'));
  fs.mkdirSync(path.join(dir, 'scripts'));
  fs.writeFileSync(path.join(dir, 'core-data.json'), source);
  fs.writeFileSync(path.join(dir, 'assets/core-data.generated.js'), bundle);
  for (const file of ['scripts/build.cjs', 'assets/core-engine.js']) {
    fs.copyFileSync(path.join(root, file), path.join(dir, file));
  }
  return {root: dir, output: path.join(dir, 'assets/core-data.generated.js')};
}

test('recovered source preserves the entire reviewed baseline and browser data', () => {
  assert.deepEqual(data, browserData(bundle));
  // Independent migration fingerprint of JSON.stringify(CORE_DATA) from
  // 6503b72c77a187c819ca023dc61882904a980454. Do not regenerate automatically.
  assert.equal(createHash('sha256').update(JSON.stringify(data)).digest('hex'),
    '1bf61da9af81eedcffbf1ed791bf8bd2183e86af6bb5fc41c3d2d85cee0d626f');
  assert.equal(generate(source), bundle);
  assert.deepEqual(browserData(generate(source)), data);
});

test('generation is deterministic across source formatting and does not refresh timestamps', () => {
  const compact = JSON.stringify(data);
  const first = generate(source);
  assert.equal(generate(compact), first);
  assert.equal(generate(source), first);
  assert.deepEqual(browserData(first).offers, data.offers);
});

test('CLI generates identical bytes repeatedly, from another cwd and timezone', t => {
  const f = fixture(t);
  fs.unlinkSync(f.output);
  for (const tz of ['UTC', 'Pacific/Auckland']) {
    const result = spawnSync(process.execPath, [path.join(f.root, 'scripts/build.cjs')],
      {cwd: os.tmpdir(), env: {...process.env, TZ: tz}, encoding: 'utf8'});
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(f.output, 'utf8'), bundle);
  }
});

test('--check accepts matching output without rewriting it', t => {
  const f = fixture(t);
  fs.utimesSync(f.output, 1, 1);
  const before = fs.statSync(f.output).mtimeMs;
  const result = spawnSync(process.execPath,
    [path.join(f.root, 'scripts/build.cjs'), '--check'], {encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.statSync(f.output).mtimeMs, before);
  assert.equal(fs.readFileSync(f.output, 'utf8'), bundle);
});

test('--check rejects drift and missing output without repairing either', t => {
  const f = fixture(t);
  fs.writeFileSync(f.output, 'stale output\n');
  let result = spawnSync(process.execPath,
    [path.join(f.root, 'scripts/build.cjs'), '--check'], {encoding: 'utf8'});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing or out of date/);
  assert.equal(fs.readFileSync(f.output, 'utf8'), 'stale output\n');
  fs.unlinkSync(f.output);
  result = spawnSync(process.execPath,
    [path.join(f.root, 'scripts/build.cjs'), '--check'], {encoding: 'utf8'});
  assert.notEqual(result.status, 0);
  assert.equal(fs.existsSync(f.output), false);
});

test('malformed JSON and invalid data fail before changing the existing output', t => {
  const f = fixture(t);
  const mutations = [
    d => { d.builds.performance.targetPence = -1; },
    d => { d.components.ryzen9600x.mpn = null; },
    d => { d.offers[0].itemPence = 1.5; },
    d => { d.offers[0].checkedAt = 'not-a-timestamp'; },
    d => { d.offers[0].componentId = 'unknown'; },
    d => { d.offers.push({...d.offers[0]}); },
    d => { Object.values(d.guideConfigurations)[0].guideVariantIds.cpu = 'wrong'; }
  ];
  const invalid = ['{malformed JSON', ...mutations.map(mutate => {
    const copy = structuredClone(data);
    mutate(copy);
    return JSON.stringify(copy);
  })];
  for (const input of invalid) {
    fs.writeFileSync(path.join(f.root, 'core-data.json'), input);
    for (const check of [false, true]) {
      assert.throws(() => build({root: f.root, check}));
      assert.equal(fs.readFileSync(f.output, 'utf8'), bundle);
    }
  }
});

test('CLI reports invalid source and unknown arguments as failures without writing', t => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'core-data.json'), '{bad JSON');
  for (const args of [[], ['--check'], ['--typo'], ['--check', '--typo']]) {
    const result = spawnSync(process.execPath,
      [path.join(f.root, 'scripts/build.cjs'), ...args], {encoding: 'utf8'});
    assert.notEqual(result.status, 0);
    assert.ok(result.stderr.length > 0);
    assert.equal(fs.readFileSync(f.output, 'utf8'), bundle);
  }
});
