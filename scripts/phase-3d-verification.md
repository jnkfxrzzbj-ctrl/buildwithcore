# Phase 3D — Cloudflare routing and migration readiness

18 October 2026. Source: current `main` independently cloned and checked at
`ac0f943be4472e5a033d7d56fb75e7a1c824f304`. Development branch:
`phase-3d-routing-verification-20261018`. No merge or deployment performed.

## Assessment and root cause

**CONDITIONAL GO for a separately authorised preview redeployment. NO-GO for
immediate production migration.** The smallest fix is one static root `404.html`.
Cloudflare Pages assumes an SPA when that file is absent, serving `/` for missing
paths. Its documented custom-404 lookup disables that fallback; no Worker,
Functions, framework, `_redirects`, `_headers` or paid service is necessary.

Sources read before edits: supplied Lean Development Strategy, supplied Project
Decision Log (brand entry), supplied Phase 3C feasibility report, committed
`scripts/README.md`, `scripts/public-deployment.md`, `scripts/phase-3b-verification.md`,
allowlist, packager, regression/browser tests and checks workflow. The old v16 ZIP
was not used as the implementation baseline. The supplied Phase 3C report predates
the owner's successful upload; actual endpoint observations below supplement it.

Official references checked 18 October 2026:

- [Serving Pages: route matching, custom 404 and SPA fallback](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Direct Upload and explicit preview branches](https://developers.cloudflare.com/pages/get-started/direct-upload/)

## Independent baseline verification (read only)

- Local generation and rendering consistency checks passed.
- Baseline Node suite: **45 passed, 0 failed**, including eight packaging tests.
- Baseline package reproduced: **23 files, 391,668 bytes**; original fingerprint
  `eb3780f64e86244531bc9e209a8f2ac794e4b140d74a9f6e97e340ed7e734482`.
- Existing `core-phase3c-preview.core-preview-test.pages.dev`: 29 HTTP GET probes.
  All 23 public-file bodies matched the baseline after following HTML redirects;
  homepage and Configuration C query route also matched. The other four probes
  (`/core-data.json`, `/package.json`, `/this-page-does-not-exist-12345`,
  `/nested/missing/page`) returned 200 and the exact homepage bytes. These were
  soft-404 responses, not exposure of the named internal files.
- Missing-route response headers observed: HTML UTF-8; `nosniff`;
  `strict-origin-when-cross-origin`; preview `noindex`;
  `public, max-age=0, must-revalidate`. No custom header policy added.
- This endpoint check does not independently establish Cloudflare account project
  settings, production branch, deployment environment metadata or custom domains.
  Those owner-reported settings must be re-read before any future deployment.
- Initial Python urllib probes received 403 in this environment; the successful
  content comparisons above used curl. No browser verification of the old hosted
  preview is claimed in this phase.

## Files changed and publication safety

- `404.html`: restrained navy/cyan CORE page; Home/Builds recovery links, shared
  navigation/footer, skip link, no-JS menu, noindex. Root-relative asset/navigation
  references work even when served at a nested missing URL. No URL echo, JS
  redirect, price data or affiliate link is added.
- `scripts/public-files.json`: explicitly allowlist only the new 404 document.
- `scripts/package-public.cjs`: permit exact `404.html` in the path grammar;
  retain rejection of other numeric pages, JSON, documentation and unsafe paths.
- `tests/deployment.test.cjs`: independent 24-file inventory; missing-404 failure;
  root-relative recovery checks; unsafe numeric-path rejection. The original
  23-file public-byte fingerprint remains unchanged and pinned.
- `tests/browser-check.cjs`: local error-document fallback and actual-browser
  checks for nested missing URLs, asset loading, recovery navigation, mobile,
  no-JS and query/fragment identity for all nine configurations. Functional
  contexts request reduced motion to avoid smooth-scroll actionability timeouts;
  this changes test preferences only. Animation behaviour is not certified.
- `tests/pages-routing-check.cjs`: repeatable read-only integration probe for local
  Pages emulation or the isolated CORE preview. Checks actual HTTP statuses,
  byte identity, redirects and all nine configuration queries. This is not a
  mocked routing implementation and never deploys.
- Updated `scripts/public-deployment.md` and this verification record.

The new package is **24 files, 395,367 bytes** (new page: **3,699 bytes**).
Combined ordered path/NUL/bytes/NUL SHA-256:
`6509ca7625abbffece1ded68b6095efd0e51388da754d72b2308ad45e2090a70`.
All original 23 public files and canonical JSON are unchanged. Generation checks
remain read-only. Repeated-package tests verify paths, bytes, modes, timestamps,
unsafe source/output rejection and exclusions. No output or QA dependency is
committed. Generated browser data is still intentionally public; packaging is
not redaction and does not protect public Git history.

## Test results and evidence limits

| Check | Result / evidence |
| --- | --- |
| `node scripts/build.cjs --check` | PASS; read-only deterministic data consistency |
| `node scripts/render-performance.cjs --check` | PASS; read-only static fallback consistency |
| `node --test tests/*.test.cjs` | **46 passed, 0 failed/skipped**: 37 prior regressions plus 9 packaging tests |
| Repeated packaging / exclusions / byte preservation | PASS in deployment suite; independent comparison of original 23 public files and canonical JSON to baseline also passed |
| `node tests/browser-check.cjs` | **1,988 passed**, actual local Chromium browser against source |
| `CORE_SITE_ROOT=… node tests/browser-check.cjs` | **1,998 passed**, actual local Chromium browser against isolated 24-file package |
| `tests/pages-routing-check.cjs` against Wrangler Pages dev | **177 passed**, actual local emulator HTTP: 24 files, 11 negative routes with GET/HEAD, asset MIME checks, 9 query redirects and homepage |
| Existing hosted baseline HTTP | 29 successful curl GET probes; 25 public-content matches and 4 confirmed soft 404s |
| Visual QA | Inspected screenshots of nested 404 at desktop 1440px, mobile 390px and 320px no-JS; navy/cyan styling, readable recovery links and accessible navigation |
| `git diff --check` | PASS |
| New hosted Cloudflare package | **NOT RUN**; requires explicit redeployment approval |

Browser matrix: 1440/390/320px, JS on/off, all public HTML; keyboard navigation,
mobile menu, no overflow, internal links/assets, exact current/historical notes,
query/fragment retention, HOLD and affiliate separation. Source screenshots were
captured for every public page at 1440/390px and JS on/off, plus nested 404 at all
three widths; only the specific 404 images listed above were visually inspected.
The assertion totals are harness checks, not counts of independent test cases.
The generic HTTP server intentionally serves the 404 document with 404 status;
that browser suite alone does not prove provider routing. The separate Pages
emulator provides routing evidence; neither substitutes for hosted CDN QA.

Local QA tooling: Node 24.19.0, runtime Playwright, Chromium 153.0.0 from an
external scratch-only `@sparticuz/chromium` installation. Default Playwright
browser download failed (invalid ZIP). The first browser run hit smooth-scroll
actionability timeouts in the guide index; final runs use reduced-motion browser
contexts and all assertions pass. No site CSS was changed for this.
Wrangler 4.151.1 initially failed on this container's `os.networkInterfaces()`;
final local-emulator execution used a scratch-only Node shim returning an empty
interface inventory, with explicit loopback IP/port. The emulator also warned
that remote `Request.cf` lookup timed out and used its placeholder. These are
local environment limitations; no shim/tool dependency enters the repository or
public package. Hosted settings, edge TLS, cache and CDN headers remain untested
for the new artifact. Existing GitHub checks are unchanged and will run on PR.

Commands for the two actual browser runs used `CORE_CHROMIUM_PATH=/tmp/chromium`;
package mode additionally set `CORE_SITE_ROOT` to the independently built external
package. Standard CI uses its own Playwright Chromium, as before.

No hardware, alternatives, evidence, thresholds, freshness, state logic,
historical identities or affiliate architecture changed. Tests retain exact C,
permanent HOLD and null eligible total even with cheap fresh synthetic offers;
all eight historical snapshots and affiliate/evidence separation are covered.

## Proposed safe preview redeployment — not executed

1. Review this PR and approve its exact commit. Approval to merge and approval to
   redeploy are separate; neither is assumed. A PR-head preview can be tested
   without merging.
2. Read the authenticated project settings: correct account; `core-preview-test`;
   Direct Upload; production branch exactly `core-production-disabled`; no custom
   domains or production deployment. Stop if these differ. Record previous
   deployment ID/immutable URL, current alias and verified package for comparison.
3. Check out the approved commit cleanly. Run both consistency checks, all Node
   tests, source browser suite, and package browser suite. Build a fresh external
   directory with `node scripts/package-public.cjs --out ../core-public-3d`.
   Independently verify the 24-file inventory, bytes and fingerprint; never upload
   repository root. Do not reuse an existing output directory.
4. Only after explicit redeployment approval, use an explicit non-production
   branch. Prefer a new branch `core-phase3d-preview` to preserve the existing
   Phase 3C alias. Proposed command:

   ```sh
   wrangler pages deploy /absolute/verified/core-public-3d --project-name core-preview-test --branch core-phase3d-preview
   ```

   Do not omit `--branch`, use the disabled production branch, use dashboard
   production upload, associate a domain or change DNS. Capture deployment ID,
   commit, immutable URL and alias; confirm environment is **preview** before QA.
5. Run the read-only HTTP script against the immutable preview URL:

   ```sh
   CORE_PAGES_ORIGIN=https://DEPLOYMENT.core-preview-test.pages.dev CORE_PUBLIC_DIR=/absolute/verified/core-public-3d node tests/pages-routing-check.cjs
   ```

   Require all missing/internal URLs to return actual 404 with the exact error
   document; GET and HEAD should agree on status. Verify legitimate assets' MIME
   types, no redirect loop and query retention. Check preview noindex, nosniff,
   referrer policy and cache headers on 200/404 responses. Record any absent or
   different headers rather than assuming local-emulator defaults equal the CDN.
6. In an actual browser, on immutable URL and branch alias, test 1440px desktop,
   390px/320px mobile and JS disabled. Verify navigation/keyboard/Escape/skip link;
   all nine `.html?configuration=ID#ID` redirects retain queries/fragments and
   display the original eight parts; no-JS manual exact-ID selection works;
   `#parts`/`#saved-configurations` work; C remains HOLD with no eligible total;
   affiliate links remain labelled and distinct from purchasing evidence. Follow
   nested 404 recovery links and inspect failed network requests/broken assets.
   Direct `/404.html` is a legitimate document route and may redirect to `/404`
   with 200; **unknown routes** must return 404, not a redirect to that document.
7. If any check fails, retain the old Phase 3C alias, record the failed new
   deployment and stop. Do not attempt production rollback or DNS changes.
   Preview deployments are not production rollback targets.

## Residual migration gates

- New package hosted 404/HEAD behaviour, CDN headers/cache, redirects/fragments
  and browser matrix remain unverified until the approved redeployment.
- Direct Upload testing does not certify external Git-build output directory
  `../core-public`; choose and separately approve the eventual publisher.
- Account settings, production triggers, DNS/email/DNSSEC inventory, TLS/custom
  domain activation and a secure artifact-based rollback need separate approval
  and verification. Current GitHub branch-root exposure continues; this PR does
  not switch publishing or remove development files from the existing live site.
- Root-relative 404 links assume deployment at the hostname root, as used by
  CORE's custom domain and isolated Pages preview. Subpath hosting needs review.
- A later approved merge can cause existing GitHub Pages to adopt the 404 page;
  no existing page bytes change. During this task no merge, deployment, DNS,
  domain, Pages settings, Cloudflare project settings or purchasing activation
  has been performed. The current live site and existing preview are unchanged.
