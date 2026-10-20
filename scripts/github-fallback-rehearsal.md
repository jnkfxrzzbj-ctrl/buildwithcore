# GitHub fallback: first rehearsal and recovery

This is a proposed activation procedure, not permission to publish. The Phase 4C
PR adds `.github/workflows/github-fallback.yml` but must remain unmerged until
owner review. It has only a manual trigger; neither merging nor pushing publishes.
The Cloudflare template remains inactive. Use this workflow rather than copying
the older disabled GitHub template: this version adds a final 24-file/domain gate
and a run-attempt-specific publication approval.

## Preconditions and explicit owner approvals

1. Capture authenticated Settings → Pages source/branch/folder, custom domain,
   Enforce HTTPS and certificate status, plus the last successful deployment.
   Record the exact existing settings for emergency restoration. No DNS or Wix
   change is needed for this GitHub-only rehearsal. An incomplete Wix inventory
   blocks Cloudflare migration, but does not itself block this rehearsal.
2. Owner approves configuring `github-pages`: required owner reviewer, main-only
   deployment branch, and administrator bypass disabled where available. A sole
   owner must allow self-review or appoint another reviewer. Do not assume that
   naming an environment in YAML creates these protections. Do not change an
   environment used by current branch publishing until its impact is approved.
3. Owner approves merging the activation PR, then separately approves the live
   publisher transition and rehearsal. Preserve `buildwithcore.co.uk` and HTTPS
   in Settings → Pages. A CNAME artifact alone cannot configure these settings.
4. Keep repository variable `CORE_GITHUB_FALLBACK_ENABLED` unset until approval.
   Reserve `CORE_GITHUB_APPROVED_RUN` **only as an environment secret** in
   `github-pages`; never create a repository/organisation secret with that name.
   It contains an approval value, not an API credential. Keep it absent or `blocked`
   except when authorising one exact run attempt. No new provider token is needed.

## First live rehearsal (future approved actions)

1. Freeze merges and cancel other Pages publication runs. Retain the current good
   release archive, source commit and per-file inventory beyond CI expiry. Confirm
   the old branch publishing fallback can be restored from the settings capture.
2. Set `CORE_GITHUB_FALLBACK_ENABLED=approved`. Dispatch **from main** with a full
   approved main-history `release_sha` and independently reviewed `fingerprint`.
   The workflow validates ancestry and builds/tests an external package without
   deployment permissions. Review its summary, artifact and all successful checks.
   The `deploy` job must wait for the required environment review; if it does not,
   cancel and fix protection before continuing.
3. For the first transition, switch Settings → Pages → Source to GitHub Actions
   only after the build/artifact is successful and ready. Preserve the existing
   domain and Enforce HTTPS. If these cannot be retained, stop before publishing.
4. Set the **environment** secret `CORE_GITHUB_APPROVED_RUN` to exactly
   `RUN_ID:RUN_ATTEMPT` for the intended run (for example `123456:1`), then approve
   its waiting deploy job. Check the actual run attempt; retries increment it.
   The guard runs immediately before `deploy-pages`, which consumes the same-run
   Pages artifact. No PR artifact or repository-root directory is published.
5. Record deployment/run IDs, SHA, fingerprint and retained artifact. Immediately
   set the approval secret to `blocked` and unset the enable variable. Run the
   acceptance commands below; a successful upload alone is not acceptance.
6. After success, perform an explicitly approved recovery rehearsal: dispatch a
   new run selecting a previously approved main-history SHA and its fingerprint,
   repeat approval, and verify the resulting public bytes. An identical-content
   older SHA can test the publishing path without changing user-facing content;
   report that limitation. Revoke approval again afterwards.

## Prevent stale releases undoing recovery

The workflow-level concurrency group serializes publication but does not freeze
queued work. Before rollback: set the environment approval secret to `blocked`,
unset the enable variable, cancel all waiting/queued/in-progress publication runs,
and confirm every running deploy has stopped. A job already running has already
read its secrets: changing the secret does not revoke an in-flight API request.
Do not begin recovery until those jobs are terminal.

Then dispatch only the chosen recovery run and approve its exact `RUN_ID:ATTEMPT`.
Any older queued run/attempt that subsequently starts cannot match that value.
Environment secrets are read when their job starts; repository secrets are read
when the workflow is queued, which is why repository scope is prohibited here.
After recovery revoke the approval value and freeze publishing again. Never
re-run an old failed deploy job as a shortcut around this sequence.

## Acceptance (read-only)

From the approved release checkout, using its verified external package:

```sh
node scripts/verify-public.cjs "$CORE_RELEASE_DIR"
CORE_HOSTING_PROVIDER=github CORE_PAGES_ORIGIN=https://buildwithcore.co.uk CORE_APPROVED_PRODUCTION_ORIGIN=https://buildwithcore.co.uk CORE_PUBLIC_DIR="$CORE_RELEASE_DIR" node tests/pages-routing-check.cjs
CORE_PAGES_ORIGIN=https://buildwithcore.co.uk CORE_APPROVED_PRODUCTION_ORIGIN=https://buildwithcore.co.uk node tests/hosted-browser-check.cjs
```

Install the same pinned Playwright/browser dependency used by CI. Confirm all
24 public responses, internal-file 404s, nine configurations, C HOLD, 390/320px,
JS/no-JS, and normal browser TLS. Check HTTPS certificate hostname/chain/expiry,
HTTP→HTTPS and www→apex redirects with path/query preserved. Use the GitHub mode;
Cloudflare's extensionless redirect assumptions do not apply. Do not weaken a
failed check without investigating actual host behaviour (including CNAME/404).

## If the first deployment fails

Allow a proposed maximum 15-minute observation window; stop earlier for exposed
internal files, wrong content or broken purchasing safeguards. Freeze all jobs as
above. If a previously accepted Actions release exists, dispatch a fresh run with
its exact SHA/fingerprint and obtain a new approval value. Verify the restored
bytes. The packager copies approved generated files; it does not refresh prices.
The retained archive supports independent file recovery, but the workflow rebuilds
from immutable source and verifies its fingerprint rather than accepting an
arbitrary uploaded archive. Missing source/tool infrastructure requires a separate
reviewed archive-based recovery path; that capability is not claimed here.

If no successful Actions fallback exists and service cannot be recovered, the
owner must explicitly approve restoring the captured branch/folder publisher.
This restores availability with the known development-file exposure. Wait for the
branch Pages build/deployment to succeed and verify the live site. Keep domain and
HTTPS unchanged. Do not delete or unpublish the Pages site, change DNS, or reset
main to perform recovery. Record any temporary exposure and resume secure
publishing only after a new approval.

## Evidence boundary

Local guard tests exercise empty, stale and previous-attempt rejection; package
verification and archive restoration test bytes. Neither proves environment
protection, secret timing integration, actual Pages deployment, TLS continuity or
hosting rollback. These remain live rehearsal acceptance gates. See GitHub's
[secret timing documentation](https://docs.github.com/en/actions/reference/security/secrets).
