# Phase 3D — final verification and closure assessment

18 October 2026. Base/current main: `25b840d3c67ec081eea030b11aad219d8571a13d`.
Branch: `fix/phase3d-nojs-hold-discovery`. Nothing merged or deployed.
Existing preview: [immutable deployment](https://f46d0470.core-preview-test.pages.dev).

## Decision

**NO-GO for formally closing Phase 3D today. GO for reviewing this focused fix.**
The existing preview still contains a material warning-discoverability problem.
The correction passes local source/package tests but is not on the hosted preview.
Review, merge and preview deployment each require separate owner authorisation;
none is performed here. After an approved preview update, rerun hosted content/
routing checks and the changed no-JS journey before closure.

Cloudflare is technically suitable for this static site. This remaining issue
belongs to CORE's presentation, not Cloudflare routing. No infrastructure,
redirect rule, dependency or purchasing-engine change is justified.

## Baseline and evidence reviewed

Read the supplied Lean Development Strategy, Project Decision Log and Phase 3C
feasibility report; repository public-packaging and Phase 3D verification records;
and the latest no-JS investigation. The old v16 ZIP is not the source baseline.
Main was fetched again and remained at the SHA above. GitHub confirms both PRs
merged: #8 at `79d6951087e08af0a9f86eeaadc71fa0708b0d2a` (regular merge, **not**
squash), #9 at current main (squash). The deployment predates this proposed fix.

A fresh read-only replay of the existing Pages HTTP suite passed **199 assertions** against the immutable preview and the retained main package. Every public response matched its approved bytes after redirects; all nine configuration queries survived; 11 missing/internal paths returned the exact 404 page with GET/HEAD agreement. A scratch-only fetch timeout/retry wrapper bounded network waits without altering assertions.

Approved deployed baseline: **24 files, 395,367 bytes**. Ordered
path/NUL/bytes/NUL SHA-256:
`6509ca7625abbffece1ded68b6095efd0e51388da754d72b2308ad45e2090a70`.
These observations supersede older documentation saying the new 404 package had
not been hosted. They do not establish account/project settings from the dashboard.

## Reproduction and usability assessment

Actual hosted Chromium tests at **390px and 320px**, JS on/off, reproduced direct
query entry, index-fragment entry and fresh direct query-plus-fragment entry.
Without JS, the nine native disclosures are initially closed. C's body warning
is hidden and its summary contains only the long configuration ID. The index
link targets the outer disclosure, so native fragment navigation does not open
it. Enter/Space and pointer expansion work. With JS, the query renders C's warning
in the selected guide and `core-client.js` opens the fragment's disclosure.

The prior report correctly established technical operability, but its conclusion
that no correction was necessary was too narrow. A beginner following “choose the
ID” reaches another copy of that ID, with no explicit second-step instruction and
no visible buying warning. A native control that works is not, by itself, evidence
that this journey communicates the intended caution clearly. This is an expert
usability assessment, not a claim of measured beginner-study failure or a formal
WCAG violation.

## Smallest correction

- Show **“Configuration C · HOLD — buying criteria awaiting approval.”** in C's
  index link and native summary, outside the collapsed content.
- Say explicitly to open the matching configuration row to read its eight parts.
- Regenerate the static guide index from `CoreView.guideIndex`; do not hand-edit
  generated HTML. Preserve all native disclosure behaviour, IDs and destinations.

The warning is now visible at C's fragment before expansion at 390/320px, and in
its index link before selection. The detailed warning remains inside as well.
A bare query still cannot select content without JS: users must use the index;
this limitation is now stated with the action they need. The fix does not promise
that C is automatically selected or visible in the initial viewport of a query-only
no-JS visit. Opening all nine sections or adding scripting/routing would be more
complex than necessary to expose the caution.

Only two public files change: `assets/core-view.js` and its generated
`core-performance-guide.html`. Eight historical summaries and all hardware notes
remain unchanged. No CSS, client behaviour, data, engine, affiliate catalogue,
allowlist or packager change. Tests and this record are development-only.

## Candidate verification

| Check | Result |
|---|---|
| `node scripts/build.cjs --check` | PASS |
| `node scripts/render-performance.cjs --check` | PASS |
| `node --test tests/*.test.cjs` | **47 passed**, no failures/skips |
| Source Chromium browser suite | **2,546 assertions passed** |
| Isolated-package Chromium browser suite | **2,556 assertions passed** |
| Public package inventory | Exactly 24 allowlisted files; no added runtime file |
| Visual inspection | Collapsed C warning readable at 1440/390/320px, no JS |
| Protected sources | Data, generated data, engine, client, affiliates, main Performance page, manifest and packager byte-identical to main |
| Candidate on Cloudflare | **NOT TESTED: no deployment authorised** |

New browser regressions test all nine IDs at 1440/390/320px without JS: query and
fresh direct-fragment entry, keyboard activation of index links, closed/open
states, C's warning before expansion, keyboard/pointer disclosure operation,
eight exact snapshot parts and overflow. The existing complete JS/no-JS suites
also cover all public pages, navigation/menu/Escape/skip links, queries/fragments,
404 recovery, exact affiliate destinations and conservative purchasing safeguards.
Totals are assertions, not counts of independent test cases.

A first scratch reproduction assertion wrongly expected Enter always to open a
section already opened by JS. It was corrected to close the section first;
this was a harness assumption, not a site defect. The first GitHub CI run also
failed because the new keyboard test read the URL before fragment navigation
completed. The test now registers and awaits the exact expected fragment before
checking it; the expected URL and all warning/native-control assertions remain
unchanged. See PR checks for the latest CI result. Hosted browser access uses a
network proxy with certificate checks bypassed because of proxy trust; it does
not certify origin TLS. Local Chromium is 153.0.8010.0; Node is 24.19.0. Functional
contexts use reduced motion. No Safari/Firefox, physical touch or screen-reader
certification is claimed. Earlier broad hosted browser results remain historical
evidence; this task freshly rechecks content and the specific reported journey.

Candidate: **24 files, 396,023 bytes**; fingerprint:
`643c83c855293f056326467fcd435d2740ab8e5a220a697fdd77dbe52ad2fdce`.
The deployment test now pins the **22 unaffected public files** to their main
baseline instead of pretending the original 23-file hash can survive an intentional
view/index change. Inventory, source/output equality, repeatability, exclusions,
unsafe-output rejection and generated-output checks remain strict. This report
is excluded from the public package.

C remains permanently HOLD under its pending policy, with no eligible basket total
or activated purchase recommendation, including with cheap fresh synthetic offers.
All eight historical configurations and affiliate/evidence separation pass their
existing regressions. Specifications, prices, thresholds, evidence timestamps and
buying rules are untouched.

## Closure requirements versus later migration

**Before Phase 3D closes:** approve/review this fix; complete required PR checks;
separately authorise the appropriate merge and isolated preview upload; verify the
candidate's exact bytes, hosted routing and 390/320px no-JS collapsed warning, then
JS C HOLD and historical links. Confirm the preview opens in an ordinary browser
with normal certificate validation. Until then the hosted defect is unresolved.
Safari/iPhone/Firefox spot checks are useful additional confidence; a formal
assistive-technology audit is not asserted as a new mandatory Phase 3D scope.

**Later production migration:** choose and validate one publisher, verify account/
production-trigger settings, inventory DNS/mail/DNSSEC, validate custom-domain TLS
and redirects, and prepare a secure artifact-based rollback. Direct Upload does
not certify an external Git-build output path. Those are migration prerequisites,
not reasons to keep retesting an unchanged static preview indefinitely. Current
GitHub branch-root exposure remains until separately changed. A previously noted
stale affiliate-disclosure metadata sentence is a separate editorial follow-up;
it was not changed in this focused fix.

**Recommended next phase:** controlled preview acceptance and closure of this fix;
then secure publication/migration preparation, before any production cutover.
No live website, DNS, domain, hosting settings, deployment or purchasing activation
was changed. This assessment grants no merge or deployment approval.
