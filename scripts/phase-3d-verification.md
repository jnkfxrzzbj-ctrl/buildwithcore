# CORE Phase 3D — routing and migration readiness

18 October 2026 (UK). Source: current main
`ac0f943be4472e5a033d7d56fb75e7a1c824f304`; independently cloned and checked.
Read the supplied Lean Development Strategy, Project Decision Log, Phase 3C
feasibility report and committed Phase 3B deployment/verification documentation.
The older supplied v16 ZIP was not used as implementation baseline.

## Assessment and root cause

Cloudflare Pages treats a static deployment without a root `404.html` as an SPA,
serving `/` for unmatched paths. This explains soft-200 responses without implying
internal-file contents were exposed. Official documentation retrieved this session:
https://developers.cloudflare.com/pages/configuration/serving-pages/

Add the standard root `404.html`, using CORE's navy/cyan design, existing shared
public CSS/navigation script, accessible navigation and no-JS recovery links.
Every file/navigation URL is root-relative because the error response retains the
original requested path. No redirect rules or purchasing runtime are needed.
Provider handling of this page still requires hosted verification after approval.

Read-only Cloudflare API inspection confirmed `core-preview-test`, production
branch `core-production-disabled`, no custom domain, no canonical production
deployment, no Functions, and exactly one successful preview deployment:
`46c7074e-c4b6-48cb-bd25-66f82eb83064`, branch `core-phase3c-preview`, commit
`ac0f943be4472e5a033d7d56fb75e7a1c824f304`.
Its upload metadata says `commit_dirty: true`; metadata alone does not prove exact
uploaded bytes. The user-reported original package is 23 files / 391,668 bytes;
local reconstruction independently confirms that inventory and byte count.

## Changes and security boundary

- `404.html`: one new 3,816-byte public recovery page, no pricing/affiliate runtime.
- `scripts/public-files.json`: exact addition; output now 24 files / 395,484 bytes.
- `scripts/package-public.cjs`: permit only the exact numeric name `404.html`.
- `tests/deployment.test.cjs`: independent 24-file inventory, original 23-file
  fingerprint retained; numeric-name rejection and nested recovery checks.
- `tests/browser-check.cjs`: generic test server serves the custom body with 404;
  adds real browser recovery checks at nested URLs and query/fragment coverage.
- Deployment docs: updated current inventory, evidence and safe preview proposal.

All original public files, canonical JSON, generators, specifications, buying
thresholds, freshness rules, C HOLD policy, nine configuration identities and
Amazon/Awin architecture are unchanged. Public generated JS remains public;
excluding canonical JSON does not redact browser data or public Git history.
No internal source, credential, feed or documentation is allowlisted.

## Tests and evidence

- Local Node 24: `node scripts/build.cjs --check` PASS;
  `node scripts/render-performance.cjs --check` PASS.
- Local `node --test tests/*.test.cjs`: **46 passed, 0 failed** (37 existing
  regression checks, eight strengthened packaging checks, one focused 404 check).
- Two independent packages: identical sorted path/size/SHA-256 inventories;
  packaging tests also check stable modes/timestamps and fail-closed mutations.
- All original 23 public files compared against `git show origin/main:<path>`:
  identical. Their independent combined fingerprint is retained in the tests.
- New full package path/byte fingerprint:
  `dc808515c798ead293807bd67a5e91e2db28b77d267269a5867b7a5743ae4c55`.
- Reference scan: all literal local targets and fragments resolve within allowlist;
  404 URLs also resolve from nested missing paths. No new external dependency.
- Local actual browser launch: BLOCKED before assertions. Playwright Chromium
  download returned truncated ZIP archives; no local browser pass is claimed.
- CI browser results: to be recorded on this branch/PR after execution. The suite
  exercises all HTML pages at 1440/390/320 pixels with and without JS, navigation,
  links/assets, all nine exact configurations, HOLD/publication lock, affiliate
  separation, nested 404 recovery and query/fragment links. Synthetic pricing
  fixtures run only inside tests and never alter deployed buying evidence.
- The generic local server is not Cloudflare. Its 404 body tests prove client
  recovery usability, not hosted redirect/status behaviour. A direct `/404.html`
  request is tested as a regular file (200 locally); missing URLs must be 404.

## Proposed preview-only verification — not executed

Requires explicit owner deployment approval and an agreed immutable PR/merged SHA.
Do not deploy an unreviewed moving branch. Do not merge under this task's authority.

1. Recheck the target SHA, clean checkout and project settings through read-only
   API calls. Require production branch `core-production-disabled`, no custom
   domains, and no production deployment. Preserve existing Phase 3C preview.
2. Run consistency, Node, source browser and isolated-package browser suites.
   Build twice into fresh external directories; require 24 files / 395,484 bytes
   and the recorded fingerprint. Upload only the verified directory, never `.`.
3. With a reviewed Wrangler v4, deploy only to a new preview branch, e.g.:
   `wrangler pages deploy ../core-public --project-name core-preview-test --branch core-phase3d-preview --commit-hash <approved-sha>`.
   This is a proposed command, not executed here. Do not use dashboard production
   upload, omit `--branch`, or use `core-production-disabled`. Any new terms,
   payment request or permissions require owner intervention.
4. Verify API deployment `environment=preview`, the exact approved SHA and branch;
   record its immutable deployment URL as well as branch alias. Reconfirm no
   production deployment/custom domain and original Phase 3C preview unchanged.
5. On the immutable hosted URL test GET and HEAD for `/core-data.json`,
   `/package.json`, `/this-page-does-not-exist-12345`, `/nested/missing/page`,
   `/assets/missing.css`, `.env`, `.git/config`, `scripts/public-files.json`,
   `scripts/README.md`, `tests/revisions.test.cjs`, and `private-feed.json`.
   Require HTTP 404 and the CORE error body, never internal bytes or homepage.
   Fetch `/404.html` separately and record the provider's canonical redirect.
6. Fetch every allowlisted legitimate page and asset (including extensionless
   routes). Record each redirect hop, Location, final status, MIME type, asset
   byte hashes and cache behaviour. Require 200 final legitimate responses.
7. Test `.html?configuration=<id>#<id>` for C and all eight historical IDs from
   `public-deployment.md`: require query retention through redirects, exact
   eight-part hardware and final fragment in a real browser. Also test `#parts`
   and `#saved-configurations`. Fragments are client-side, absent from HTTP.
8. Repeat desktop/mobile 1440/390/320, JS/no-JS, keyboard/menu/skip-link, error-page
   recovery, saved-index selection, purchasing HOLD and affiliate separation
   checks. Capture screenshots and inspect actual rendered layout; require no
   broken assets/links, overflow or script errors. Do not claim screenshots alone
   establish HTTP status, or static scans establish browser behaviour.
9. Record HTTPS, content types, `x-content-type-options`, `referrer-policy`, cache
   headers and preview `x-robots-tag`. Compare documents/assets/error responses;
   assess CSP/HSTS/frame policy separately against the proposed final hostname.
   Do not silently add headers that break current inline styles/scripts.
10. Stop and report. No DNS, Wix, GitHub Pages settings, custom domain, production
    branch, pricing, feed or paid-service action. A passing preview is evidence
    for a later migration decision, not migration authorisation.

## Residual risks and decision

**CONDITIONAL GO for the proposed preview validation; NO-GO for migration now.**
The fix is small and follows Pages' documented static routing. Actual new-package
Cloudflare 404s, redirects, headers, cache and rendered hosted compatibility remain
unverified because redeployment is prohibited in this task. CI/local browser
results cannot certify the edge. Direct Upload does not certify a future Git build
or its proposed external output directory. Choose/review one publication pipeline.
Custom-domain TLS, DNS/email/DNSSEC inventory, Wix control, rollback and any future
migration window require separate verification/approval. Existing branch-root
GitHub Pages continues to expose development files; this PR does not change that.
A later merge can add GitHub Pages' 404 page and trigger its existing deployment.

No live hosting settings, domain, DNS, preview deployment or production deployment
were modified. No paid services, purchasing recommendations or auto-merge enabled.
