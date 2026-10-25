/* Deterministic CORE_DATA generation. No prices, timestamps or HTML are updated. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {validate} = require('../assets/core-engine.js');

function generate(source) {
  const data = JSON.parse(source);
  validate(data);
  require('../assets/core-view.js').validateEditorial(data);
  return '/* GENERATED from core-data.json. Run node scripts/build.cjs; never edit. */\n'
    + 'window.CORE_DATA = ' + JSON.stringify(data) + ';\n';
}

function build({root = path.resolve(__dirname, '..'), check = false} = {}) {
  // Parse and validate everything before opening the output for writing.
  const output = generate(fs.readFileSync(path.join(root, 'core-data.json'), 'utf8'));
  const destination = path.join(root, 'assets/core-data.generated.js');
  let existing;
  try {
    existing = fs.readFileSync(destination, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (existing === output) return;
  if (check) throw new Error('Generated data missing or out of date. Run node scripts/build.cjs');
  fs.writeFileSync(destination, output, 'utf8');
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
      throw new Error('Usage: node scripts/build.cjs [--check]');
    }
    build({check: args[0] === '--check'});
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {generate, build};
