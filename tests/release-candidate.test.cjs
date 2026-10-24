'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {packagePublic} = require('../scripts/package-public.cjs');
const {verify} = require('../scripts/verify-public.cjs');
test('release verification rejects extra, missing and changed restored files', () => {
  const {directory} = packagePublic();
  try {
    assert.equal(verify(directory).count, 25);
    const extra = path.join(directory, 'internal.txt');
    fs.writeFileSync(extra, 'must not deploy');
    assert.throws(() => verify(directory)); fs.unlinkSync(extra);
    const file = path.join(directory, 'index.html'), original = fs.readFileSync(file);
    fs.writeFileSync(file, 'wrong release'); assert.throws(() => verify(directory));
    fs.unlinkSync(file); assert.throws(() => verify(directory));
    fs.writeFileSync(file, original); assert.equal(verify(directory).count, 25);
  } finally { fs.rmSync(directory, {recursive:true, force:true}); }
});
