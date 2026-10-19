# CORE Phase 4 — secure production migration preparation

19 October 2026. Source: `jnkfxrzzbj-ctrl/buildwithcore`, main
`38ec85392ae1100c77be4a564895910950240ffa` (PR #11 squash merge).
Preparation PR #12 was squash-merged into main at
`f54390295b1b893073daf86286900659a916c6fb`. The evidence below describes the
original Phase 4 baseline. See [inactive workflow templates](deployment-templates/README.md) for
publishing prerequisites. The separate Phase 4B owner handover contains the
account inventory and remaining approvals.

**CONDITIONAL GO for the proposed migration approach; NO-GO for cutover today.**
The public package is reproducible and the preparation workflow has no deployment
capability. Remaining gates are full DNS/registrar inventory, controlled production
credentials/project, secure GitHub fallback activation, and custom-domain acceptance.
This document does not authorise any of those changes.

## 1. Current architecture and access

Read: supplied Lean Development Strategy and Project Decision Log; repository
Phase 3B verification/public deployment documentation, Phase 3D closure; supplied
Phase 3C feasibility report. The old v16 ZIP was not used as source code.

| Layer | Observed position / confidence |
| --- | --- |
| GitHub | Public repository; main at the SHA above. Connector reports admin/maintain/push/pull permissions. Branch/PR creation works. These repository permissions do not prove access to every settings endpoint. |
| Live publishing | Owner/Phase 3B record: GitHub Pages from `main / (root)`. Current DNS, GitHub response headers, CNAME and exact served source bytes corroborate it. Fresh Pages settings API read is unavailable: connector rejects that endpoint; unauthenticated API returns 404. Settings must be captured before cutover. |
| Live exposure | `/core-data.json`, `/scripts/package-public.cjs`, `/scripts/phase-3d-closure.md`, `/tests/browser-check.cjs` return 200 and exact current source bytes. `/.github/workflows/checks.yml` and `/.git/config` return 404. This is a sampled inventory, not a claim every repository file is served. |
| DNS authority | Public NS lookup: `ns12.wixdns.net`, `ns13.wixdns.net`, TTL 21,600 seconds. Cloudflare account zone list is empty. |
| Apex web records | A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; TTL 3,600. No apex AAAA answer observed. |
| www | CNAME `jnkfxrzzbj-ctrl.github.io`, TTL 3,600; target resolves to GitHub IPv4/IPv6. |
| Email / DNSSEC | Google DNS-over-HTTPS returned no apex MX/TXT/CAA/DS answers; `_dmarc` returned NXDOMAIN. These observations do not enumerate DKIM selectors, other subdomains, verification records, forwarding or registrar settings, and do not prove email is unused. |
| Registrar | Historically reported as Wix; current authenticated registrar account/registration settings not inspected. Wix DNS authority alone does not prove registrar identity. No transfer is recommended. |
| Cloudflare preview | Direct Upload project `core-preview-test`; production branch `core-production-disabled`; no custom domains; canonical production deployment null; all three listed deployments are previews; no Functions or environment variables. |
| Current preview | Successful `c06cc7c7-cce1-4f81-bb5a-291adf414b85`, branch `core-phase3d-closure`, source metadata `9f75266…`. API records `commit_dirty: true`, so metadata alone is not provenance proof. Exact served bytes must establish parity. |
| Account permissions | Account/project/domain/deployment/zone GETs work. No deployment token was created or requested and no production write was attempted. Previous owner Wrangler OAuth success is inherited evidence, not a credential available to GitHub CI. |

No Cloudflare resource, domain binding, DNS setting, nameserver, production branch,
GitHub Pages setting or live file was changed. No need to upload identical public
bytes again simply to give Phase 4 a new deployment ID.

## 2. Publishing recommendation

Use **a separate production Direct Upload Pages project**, proposed name
`core-production` if available, and retain `core-preview-test` as an isolated test
project. Create/configure the production project only after approval. This keeps
experimental uploads away from the project that owns the live domains. It is one
additional small project, not another service or runtime.

| Option | Assessment |
| --- | --- |
| GitHub Actions builds/validates package, Wrangler Direct Upload | Recommended. Reuses packager and CI tests; explicit dependency/gate ordering; package outside checkout; no uncertain provider build-output path. Requires a tightly controlled Pages API token. |
| Cloudflare Git integration | Fewer credential steps, but existing Direct Upload project cannot become Git-integrated. Separate build/trigger controls and external output path still need testing; Cloudflare builds do not automatically wait for GitHub checks. No benefit sufficient to justify that work here. |
| Manual verified package upload | Useful first release/emergency fallback. Cheap and simple but easy to select wrong directory/branch; insufficient as the routine long-term publisher. Avoid dashboard drag-and-drop defaults. |
| Reuse preview as production | Technically possible later, but mixes test and live lifecycle and changes the deliberate production-disabled setup. Not recommended. |

**After migration:** PRs run checks; an approved merge to main should build and test
a release candidate. Initially require owner approval in a protected
`cloudflare-production` GitHub environment before its deploy job. Once a complete
release/rollback cycle is proven, a separately approved change may let passing
main merges publish automatically. Never deploy from `pull_request_target`, PR
code with production secrets, fork artifacts or a mutable unverified branch.
Use one publisher, a serial production concurrency group, `cancel-in-progress:
false`, and recheck the approved SHA before release. Never rebuild after approval
and silently substitute different bytes. Do not change pricing timestamps.

Token design: Account / Cloudflare Pages / Edit, restricted to the one account;
no DNS/zone/registrar permissions. Pages permission is account-scoped, not a
proven per-project isolation boundary. Put it only in the deployment environment;
restrict branches to main and require the owner. Confirm available environment
protections before relying on them. PR build jobs receive no deployment secrets.
The account ID is not a secret. Do not paste tokens in chat, logs or source.

## 3. Implementation prepared

PR #12 adds:

- `scripts/verify-public.cjs`: exact allowlist and byte equality against the
  checked-out release source, per-file hashes and combined fingerprint. Output is
  evidence outside the public directory. It verifies restored archives as well.
- `tests/release-candidate.test.cjs`: fails closed on extra, missing and corrupted
  release files. Existing packager retains its link/path/source guards.
- `.github/workflows/release-candidate.yml`: read-only contents permission, pinned
  action SHAs, no persisted checkout credentials, existing tests, package-only tar,
  restore/reverify rehearsal, source SHA and archive checksum, 14-day artifact.
  Manual dispatch and narrowly scoped PR verification only; **no deploy job,
  provider secret, Pages write/OIDC permission, domain operation or push-to-main
  production trigger**. Adding secrets alone cannot make it deploy.
- `tests/hosted-browser-check.cjs`: reuses existing assertions for nine exact
  snapshots at 390/320px, JS on/off, keyboard expansion, C HOLD/no eligible basket,
  no overflow and normal browser certificate validation. No site writes.
- HTTP suite supports an explicitly approved exact HTTPS production origin for
  later read-only cutover checks, with 20-second per-request timeouts. Default
  scope remains localhost or isolated preview.

The candidate workflow currently compares against the immutable Phase 3D preview.
For a later public-content change, deploy an authorised isolated preview first
and review/update that URL; a mismatch is meant to fail. A PR artifact records
GitHub's checked-out merge SHA, not just the head SHA; use an approved main commit
for the first production release. Keep release archives beyond CI's 14-day expiry
in owner-controlled storage before relying on them for rollback.

No public allowlist, HTML/CSS/JS, canonical data, hardware, price, threshold,
affiliate destination or purchasing rule changes. Merging preparation docs alone
would still expose them under today's branch-root hosting; they contain no secrets.

## 4. Verification evidence

Package: **24 files, 396,023 bytes**. Independent Python verification compared every
path and byte to main and computed ordered `path/NUL/bytes/NUL` SHA-256:

`643c83c855293f056326467fcd435d2740ab8e5a220a697fdd77dbe52ad2fdce`

Local generation/static checks pass. Original 47 Node tests pass; with the new
corrupt-release test, **48/48 pass**. Local tar creation, extraction into an empty
external directory and exact revalidation pass. This tests file restoration, not
DNS reversal or an actual hosting rollback.

Fresh cloud-browser inspection opened the immutable preview without a certificate
warning or bypass; followed Performance to C's guide; checked all nine `.html`
query entries redirected to extensionless paths retaining their IDs and rendered
eight selected parts. C's main-page and selected-guide warnings both show HOLD.
This desktop inspection is not itself a 390/320px or no-JS test.

Local browser limitation: supplied Playwright browser absent; download returned
invalid archives; an available Chromium binary terminated on launch. No local
browser-suite success is claimed. Local direct Node HTTP requests stalled;
Python requests returned 403, while normal curl and the cloud browser worked.
These are transport/runtime limitations, not established origin defects. A
scratch curl transport replay keeps the HTTP suite assertions and TLS validation;
GitHub's standard runner provides the authoritative fresh automated replay.

**Fresh Phase 4 CI:** [run 39267248111](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/39267248111)
completed successfully on implementation head `ee708804f0214247eca703bfbf1a6244ffaf6d38`.
It ran both existing browser suites, built/restored/verified the exact package,
ran the existing hosted HTTP suite and the new 390/320px JS/no-JS hosted suite,
then uploaded the release artifact. These are agent-triggered standard GitHub
runner executions with inspected job logs, not inherited owner reports.
The PR merge checkout was `f2a9dc276cf9947e42f43a04fc211a17e1c6326b`.
Observed log totals: **2,546 source browser assertions; 2,556 isolated-package
browser assertions; 199 hosted HTTP assertions; 490 hosted browser assertions**.
The 199 include all 24 exact responses after redirects, nine query routes and
11 internal/missing paths with GET/HEAD handling. The 490 cover all nine exact
hardware snapshots at both mobile widths with JS enabled and disabled, keyboard
selection/expansion, collapsed C warning, C HOLD and normal TLS. These are
assertion counts, not counts of independent test scenarios. Firefox, Safari,
physical touch and screen-reader certification are not claimed.
Artifact ID `12193782668`, size 76,393 bytes, ZIP digest
`22d4b5708414aff89e50d97011f7bcc7ca4c9a6ae03f3f76ee420ef8b2543928`;
expires 2 November 2026. The artifact ZIP contains the package tar and separate
evidence, not a folder to upload wholesale to Pages.
Phase 3D's earlier counts remain inherited evidence; they are not added to new counts.

The scratch curl adapter did not complete the suite (a HEAD result was 200 where
404 was expected). It is not counted as passing or used to override the successful
unmodified suite on GitHub's runner. No TLS bypass was used.

Fresh sampled headers: preview homepage `Cache-Control: public, max-age=0,
must-revalidate`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Robots-Tag: noindex`.
Missing `core-data.json`: 404 with CORE page, `Cache-Control: no-store`, nosniff and
same referrer policy. Live homepage uses GitHub `max-age=600`.
No CSP/HSTS/X-Frame-Options header was observed in those samples. No blanket CSP
or HSTS preload is added: inline scripts/styles require an explicit CSP design,
and HSTS affects fallback/subdomains. No long-lived immutable cache policy suits
these unversioned asset names. Recheck headers on real custom domains; preview
noindex must not become a production policy. Browser data remains public by design;
allowlisting is not a secret-redaction mechanism.

## 5. Approval-gated execution runbook

All steps below are future actions. Stop at any failed prerequisite; do not
interpret this document as approval to mutate production.

### Gate A — records and recovery readiness

1. PR #12 merge is complete. Review the Phase 4B preparation PR separately from
   any workflow activation or migration approval.
2. Capture authenticated GitHub Settings → Pages: source/branch/folder, domain,
   HTTPS enforcement, successful deployment ID/SHA. Keep the custom-domain claim.
3. Obtain complete Wix DNS export/screenshots: all A/AAAA/CNAME/MX/TXT, DKIM,
   DMARC/SPF, SRV, CAA, verification and wildcard records; registrar nameservers,
   DNSSEC/DS state, domain renewal, forwarding and mail services. Confirm the
   actual account permits custom nameservers. Check any other owner-confirmed domains
   for forwarding/dependencies without assuming ownership or changing them. Public DNS queries cannot
   replace this account inventory.
4. Choose the approved main SHA; run the candidate workflow and retain its archive,
   `source-sha.txt`, inventory and archive checksum. Verify that the recorded SHA
   is the intended release and public fingerprint is expected.
5. Secure GitHub fallback must be approved and rehearsed **before hosting cutover**:
   switch Pages source to GitHub Actions in a separate approved change; use the
   official `upload-pages-artifact` and `deploy-pages` actions, reviewed/pinned at
   activation, with only the external verified package as upload path. The deploy
   job alone gets `pages: write`, `id-token: write`, a protected `github-pages`
   environment and needs the successful build job. No repository-root upload.
   Keep CNAME/custom-domain claim and HTTPS. Verify live bytes and internal 404s.
   This changes live publication, so it was not activated here. If deferred, the
   emergency old-host fallback still restores development-file exposure; that is
   a material risk requiring express owner acceptance, not a secure equivalent.

### Gate B — production publisher, no domain traffic yet

1. Approve a separate free Direct Upload project and its production branch `main`;
   use actual available project name in all commands. Do not alter preview project.
2. Approve token/environment provisioning and the later deployment job described
   in section 2. First release is manual/owner-gated; no automatic cutover trigger.
3. In a clean checkout of the approved SHA, run existing generation/Node/browser
   suites and packager. Verify its external output. Install the reviewed pinned
   Wrangler version outside the checkout (Phase 3D used `4.151.1`; recheck at
   activation). Read project settings before upload and require production branch
   `main`, correct account/name and no unexpected custom domains.
4. The authorised publication command is:

   ```sh
   node scripts/verify-public.cjs "$CORE_RELEASE_DIR"
   wrangler pages deploy "$CORE_RELEASE_DIR" --project-name "$CORE_PRODUCTION_PROJECT" --branch main --commit-hash "$CORE_APPROVED_SHA" --commit-dirty=false
   ```

   Set all three variables from verified records; never use `.` or the checkout
   as release directory. Never omit branch. Run from the matching clean checkout;
   `--commit-dirty=false` is not a substitute for checking it is clean.
5. Record immutable URL/deployment ID and API environment=production. Run HTTP and
   hosted-browser suites against its exact origin using
   `CORE_APPROVED_PRODUCTION_ORIGIN` equal to `CORE_PAGES_ORIGIN` (no trailing slash).
   Confirm public bytes, true 404s, no preview noindex and expected headers.
   No custom domain is attached yet. Retain this successful production deployment
   as the known-good baseline; previews are not rollback targets.

### Gate C — DNS authority migration while keeping GitHub hosting

1. Approve adding `buildwithcore.co.uk` as a **Free** Cloudflare zone in the same
   account. Copy the complete verified record set, not merely automatic scan
   results. Mirror GitHub apex A and www CNAME as **DNS only**. Mail records and
   associated mail hosts remain DNS only; preserve every unrelated service.
2. Compare new authoritative responses to the export. If DS exists at that time,
   follow registrar/provider DNSSEC transition instructions: remove the old DS,
   wait for cached DS expiry and verify absence before changing delegation. No DS
   was observed today, but stale evidence must not decide cutover security.
3. At Wix Domains → Domain Actions → Manage DNS records → Nameservers → Use custom
   nameservers, enter exactly the two assigned to the new Cloudflare zone. If a
   Wix-site unassignment is required, verify its effect first; stop if unexpected.
   Keep domain registration/renewal where it is. Do not guess nameservers.
4. Allow up to 48 hours for delegation propagation. Check multiple resolvers and
   authoritative servers; apex/www must continue to serve the GitHub package with
   valid HTTPS. Confirm any email/forwarding/verification services still work.
   Do not combine authority migration and hosting cutover in one unobserved step.
5. After stable delegation, decide DNSSEC enablement separately and record new DS;
   coordinate rollback accordingly. Do not add preload/HSTS/subdomain redirects.

### Gate D — hosting cutover, separately approved

1. Freeze merges/releases. Record current working A/AAAA/CNAME/TTL/proxy state,
   GitHub fallback SHA/certificate and Cloudflare baseline deployment. Recheck
   full DNS/mail inventory and package. Reduce only web-record TTL to 300 if
   supported, at least one existing TTL (observed 3,600s) before cutover; this does
   not shorten cached NS/DS lifetimes.
2. Pages → production project → Custom domains → Set up domain:
   `buildwithcore.co.uk`. Review the resulting apex CNAME and remove only conflicting
   old web A/AAAA records as required. Add `www.buildwithcore.co.uk` through Pages
   too, replacing its old GitHub CNAME. A CNAME alone without Pages association is
   insufficient. Keep all mail and unrelated records intact.
3. Wait for both domain and certificate statuses to be active. Check CAA if
   validation fails; do not arbitrarily delete restrictions or promise zero
   downtime. Test browser HTTPS without bypass and the actual certificate chain,
   names and expiry. No origin certificate assurance is inferred from proxy curl.
4. Preserve the apex canonical URL. Configure/review an exact-host www → apex
   redirect with path/query preserved (301), and HTTP → HTTPS. Avoid catch-all
   path rewrites. Verify `.html` redirect, query and fragment behaviour, including
   saved historical URLs. Redirect production pages.dev to apex only after live
   acceptance; never redirect or bind the test project's previews to live.
5. Run immediate acceptance below. Roll back on wrong content/hashes, internal-file
   exposure, missing historical routes, TLS failure, broken navigation or HOLD
   regression. Do not keep troubleshooting a broken live site past a short agreed
   observation window (proposed 15 minutes).
6. Observe for at least 48 hours, including mail checks and different networks.
   Keep the approved GitHub fallback functional during this period. Afterwards,
   separately approve retiring its publisher while retaining ownership protection,
   release artifacts and a rehearsed redeploy route. Only Cloudflare should publish
   ordinary future releases. No paid services/Functions/storage are needed.

### Immediate acceptance commands

From the approved release checkout, with `CORE_RELEASE_DIR` its verified package:

```sh
node scripts/verify-public.cjs "$CORE_RELEASE_DIR"
CORE_PAGES_ORIGIN=https://buildwithcore.co.uk CORE_APPROVED_PRODUCTION_ORIGIN=https://buildwithcore.co.uk CORE_PUBLIC_DIR="$CORE_RELEASE_DIR" node tests/pages-routing-check.cjs
CORE_PAGES_ORIGIN=https://buildwithcore.co.uk CORE_APPROVED_PRODUCTION_ORIGIN=https://buildwithcore.co.uk node tests/hosted-browser-check.cjs
```

Also check HTTP apex, HTTP/HTTPS www and production pages.dev redirects preserve
path/query; fragments in a real browser; 404 navigation recovery; header/noindex
policy; no mixed content; both authoritative DNS and independent recursive
resolvers. The suites assume the final apex serves Cloudflare's native `.html`
redirects and exact public bytes; www redirects are a separate host-policy check.
Do not run a Pages-specific redirect assertion unchanged against GitHub fallback.

## 6. Practical rollback

**Tested now:** package → archive → fresh directory → inventory/source-byte
verification. Not tested: a production deployment rollback, GitHub artifact
activation, domain TLS transition, DNS reversal, nameserver reversal or email.
Those would change live settings and require approval.

### Content-only failure on Cloudflare

Freeze the publisher: unset its enable variable and cancel queued/in-progress
deployment jobs before recovery. In the production project's Deployments list, choose the
recorded successful known-good **production** deployment → Rollback to this
deployment. Verify its ID and rerun acceptance. Preview `c06cc7c7…` is not a valid
rollback target. For a first-release failure, redeploy the retained approved
archive after checking its checksum and exact 24 files; do not rebuild from
moving main. The first release has no previous production deployment to select.

### Hosting/TLS failure: return web traffic to GitHub

1. Freeze Cloudflare releases; unset the enable variable and cancel pending jobs. Confirm the previously rehearsed secure GitHub
   artifact release still exists, is successful, retains the domain association
   and valid certificate. Use SNI/Host-aware testing to GitHub's recorded addresses
   before routing traffic back; do not assume the `github.io` redirect proves TLS.
2. Leave DNS authority at Cloudflare for the fast path. Delete only the apex Pages
   CNAME/conflicting web AAAA; restore the **recorded** DNS-only GitHub records:

   | Type | Name | Value | Previous TTL |
   | --- | --- | --- | --- |
   | A | @ | 185.199.108.153 | 3600 |
   | A | @ | 185.199.109.153 | 3600 |
   | A | @ | 185.199.110.153 | 3600 |
   | A | @ | 185.199.111.153 | 3600 |
   | CNAME | www | jnkfxrzzbj-ctrl.github.io | 3600 |

   Reconfirm these values against the pre-cutover snapshot; today's table is not
   authority for an unrelated future migration. Restore no apex AAAA unless the
   actual pre-cutover inventory includes it. Restore the chosen TTL after recovery.
3. Disable only newly added redirects/rules that interfere with GitHub. Do not
   alter MX/TXT/mail hosts. Check resolver convergence, both hostnames, HTTPS,
   public hashes, true 404/exclusions, all nine query routes and C HOLD.
4. Remove Pages custom-domain associations only after traffic is back and the
   fallback is verified. Returning DNS to Pages later needs domain reactivation;
   its prior certificate status cannot be assumed. Retain GitHub ownership claim
   to avoid leaving a dangling custom-domain target.
5. If GitHub artifact fallback was not approved/rehearsed, returning to current
   root publication may restore availability **and the known file exposure**.
   This is an emergency tradeoff requiring owner direction, not the preferred
   rollback. Do not conceal it by calling a root checkout a secure package.

### DNS authority itself fails

First ensure Wix still holds the complete current record set, including any mail
changes. At the registrar reset to recorded `ns12.wixdns.net` and
`ns13.wixdns.net` only after reconfirming they are assigned to this domain. If a
Cloudflare DS was introduced, remove it and wait for cached DS expiry before
reverting NS; re-enable Wix DNSSEC only with Wix's corresponding DS after stable
restoration. Expect up to 48 hours; changing web A records is usually faster than
reversing delegation. Verify email and external services independently.

Record incident times, source SHA, restored deployment ID, DNS changes and
verification outputs. Owner controls resumption; no automatic retry should undo
an intentional rollback.

## 7. Costs, maintenance and owner gates

Expected incremental hosting cost: **£0** for the current static package under
Cloudflare Free; domain renewal remains payable. Official limits currently list
500 monthly Git builds and 20,000 files on Free; CORE has 24 files and no Functions.
Direct Upload from Actions avoids provider build-path uncertainty, not quotas or
terms. Use standard GitHub-hosted runners for the public repository and short
artifact retention; verify account billing before any paid runner/service.
No plan upgrade or charge was authorised or initiated.

Owner remains release/DNS/credential owner. Routine work: review PRs and failed
checks; retain last good archive; monitor token expiry; periodically review pinned
Node/Playwright/actions/Wrangler versions and domain renewal. Estimated ordinary
hosting administration is minutes per release, not a managed-service subscription;
incident response and pricing-data maintenance are separate.

| Outstanding gate | Why it matters |
| --- | --- |
| Full Wix export, registrar controls and mail/DS inventory | Cannot safely clone or roll back an unknown zone from public apex queries alone. |
| GitHub Pages settings and secure artifact fallback | Current root exposure is proven; production fallback is not yet rehearsed. |
| Production project, protected environment and token | Intentionally absent; connector read access is not CI publication access. |
| Real custom-domain certificate and host redirect verification | Preview TLS/routing does not certify live apex/www configuration. |
| Stale affiliate disclosure metadata | Phase 3D flagged it; still an editorial follow-up before migration. Not changed here. |

**Exact approvals required:** (1) merge preparation PR; (2) activate/rehearse secure
GitHub artifact fallback; (3) create production project and provision limited
publisher credentials/environment; (4) publish the approved package there;
(5) create/audit the Free DNS zone and change nameservers with a DNSSEC plan;
(6) bind apex/www, change web DNS and configure canonical redirects at cutover;
(7) retire the old publisher after observation; (8) later enable automatic
main-merge deployment if desired. These are distinct gates, not a request to
approve everything blindly. No cutover approval is being assumed.

## Sources checked

- Repository source and reports at the baseline SHA; PR #12 and its Actions logs.
- Public Google DNS-over-HTTPS queries for NS/A/AAAA/MX/TXT/CAA/DS/SOA and www/DMARC;
  live HTTP byte comparisons; authenticated Cloudflare GETs on 19 October 2026.
- [Cloudflare Direct Upload CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)
- [Serving/caching](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Free limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Wix custom nameservers](https://support.wix.com/en/article/changing-nameserver-ns-records-for-a-wix-domain)
- [GitHub Pages artifact workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
