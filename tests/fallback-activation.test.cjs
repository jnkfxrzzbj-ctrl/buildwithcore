'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const workflow=fs.readFileSync(path.join(__dirname,'../.github/workflows/github-fallback.yml'),'utf8');
test('publication guard refuses absent, stale and previous-attempt approvals',()=>{
 const block=workflow.split('      - name: Require approval for this run attempt\n')[1].split('      - name: Publish')[0];
 const shell=block.split('        run: |\n')[1].split('\n').map(l=>l.replace(/^          /,'')).join('\n');
 for(const [value,ok] of [['',false],['99:1',false],['100:1',false],['100:2',true]]){
  const r=spawnSync('bash',['-c',shell],{env:{...process.env,GITHUB_RUN_ID:'100',GITHUB_RUN_ATTEMPT:'2',CORE_APPROVED_RUN:value}});
  assert.equal(r.status===0,ok,'approval must match this run and attempt');
 }
 assert.match(block,/secrets\.CORE_GITHUB_APPROVED_RUN/);
 assert.match(workflow,/environment:\n      name: github-pages/);
 assert.match(workflow,/needs: build/);
 assert.match(workflow,/path: \$\{\{ runner.temp \}\}\/core-public/);
 assert.doesNotMatch(workflow,/^  (?:push|pull_request|pull_request_target|workflow_run):/m);
});
