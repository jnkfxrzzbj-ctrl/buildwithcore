'use strict';
// Read-only release/restore verification. Evidence goes to stdout, never the site.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {manifest, inventory} = require('./package-public.cjs');
const ROOT = path.resolve(__dirname, '..');
function verify(directory) {
  const root = fs.realpathSync(directory);
  assert.notEqual(root, ROOT, 'Verify an isolated package, not the checkout');
  const files = inventory(root);
  assert.deepEqual(files.map(f => f.path), manifest(ROOT).sort(), 'Exact allowlist required');
  const digest = createHash('sha256');
  for (const file of files) {
    const bytes = fs.readFileSync(path.join(root, file.path));
    assert.deepEqual(bytes, fs.readFileSync(path.join(ROOT, file.path)), file.path);
    digest.update(file.path).update('\0').update(bytes).update('\0');
  }
  return {count: files.length, bytes: files.reduce((n, f) => n + f.bytes, 0),
    fingerprint: digest.digest('hex'), files};
}
if (require.main === module) {
  try {
    assert.equal(process.argv.length, 3, 'Usage: node scripts/verify-public.cjs PACKAGE_DIRECTORY');
    console.log(JSON.stringify(verify(process.argv[2]), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = {verify};
