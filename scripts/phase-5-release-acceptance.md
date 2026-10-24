# CORE Phase 5 — hosted release acceptance

## Final hosted closure — 24 October 2026

**GO for owner-approved merging of PR #23 as an educational HOLD release.** The previously outstanding preview gate is closed. Purchasing remains **NO-GO**; no buying evidence, specification, rules or affiliate behaviour changed. This recommendation is not merge or production-deployment authorisation.

- Exact checked-out, packaged and deployed PR head: `24ab40ce140f6e198865b619fb2be2bb127a7fc0`. GitHub showed PR #23 open, targeting main and mergeable. Both checks passed: [40042159723](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40042159723) and [40042154440](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40042154440). No new public code was added during this closure.
- Ran the existing `node scripts/package-public.cjs --out ../phase5-resume-public` and `node scripts/verify-public.cjs ../phase5-resume-public` from that exact clean checkout. Result: **24 files, 449,298 bytes**, fingerprint **`cd5d280e6966271077bf6e243e6d02cdccccb7d4e44b7875e90ba33c936551af`**, exactly matching the approved final-layout package recorded below.
- Immutable preview: **https://f992f454.core-preview-test.pages.dev**. Deployment ID: **`f992f454-6b3b-430a-a417-366f6852bdc1`**. Existing project `core-preview-test`, explicit branch `core-phase5-release-preview`, exact source commit metadata and `commit_dirty=false`.
- Cloudflare API confirms `environment=preview` and successful deploy stage, completed `2026-10-24T11:06:56.700414Z`. The production branch remains `core-production-disabled`, canonical production deployment remains absent, and domains remain only `core-preview-test.pages.dev`.
- **43 hosted HTTP route checks passed:** every one of the 24 public files is byte-identical to the verified package; nine representative internal/missing paths return the exact 404 page; all ten saved-configuration queries survive redirects. Curl TLS certificate verification remained enabled.
- **142 targeted hosted browser assertions passed, with zero retries in the completed run.** Corrected introductory text stays within the hero and viewport at 320, 390 and 1440px, with JavaScript enabled and disabled. Mobile menu open/close, Escape/focus recovery, visible no-JS navigation, keyboard 404-to-home recovery, privacy text and all three HOLD states were checked. No exact-offer purchase action appeared. Representative hosted screenshots were visually inspected; the previously clipped introduction is readable.
- Hosted Chromium still needed the previously documented inspection-proxy certificate exception. The separate HTTP byte checks retained TLS verification. This is targeted closure of the final fix, not a repeat hardware audit or new physical/novice study.

The update containing this closure is report-only: public bytes and fingerprint are unchanged, so the immutable preview remains representative. Check that report-only head's CI before merging. No PR was merged/closed; no production/DNS/account configuration or paid service changed. The purchasing gates and #25 → #26 review sequence below remain in force.

### Historical acceptance record

The conditional decision and access blocker below describe the earlier, now-superseded state. The final hosted closure above is authoritative for release readiness.


24 October 2026. **CONDITIONAL GO for an educational HOLD release; do not merge yet.** The final mobile-layout fix passes local tests but still needs an isolated preview deployment and targeted hosted acceptance. Purchasing remains **NO-GO**.

## Exact candidates and previews

| Candidate | Public package | Hosted status |
|---|---|---|
| Original `e04b5edd8348c191aede72422c6598a9afb11027` | 24 files, 449,305 bytes; `8edab4e85028119f01f5797ccc3102d68ec4ebacf107b5e84db50ab8d23bfc76` | Successfully deployed and tested at https://1ea805ab.core-preview-test.pages.dev |
| Contact-copy fix `8d75aaa6360715d3324286addeffa59684cb896e` | 24 files, 449,288 bytes; `a38da54d61cc6e600196e57c3f6ac0588529ee7242384607e2271fcfef363bfe` | Successfully uploaded as preview at https://e7214c9b.core-preview-test.pages.dev; actual hosted pages tested |
| Final layout fix `6a955a9082f22c09d4a4b2a8557e1e0cba20ae37` | 24 files, 449,298 bytes; `cd5d280e6966271077bf6e243e6d02cdccccb7d4e44b7875e90ba33c936551af` | **Not deployed.** Local packaged-browser acceptance passed |

Fingerprints use the existing verifier's ordered path/NUL/bytes/NUL SHA-256. The report-only commit following the layout fix does not change public bytes.

Deployment IDs: original `1ea805ab-f54a-4284-84ba-efec48faa3a4`; contact-copy preview `e7214c9b-a18c-4f09-8f68-67e76f596b95`. Both used existing project `core-preview-test`, explicit branch `core-phase5-release-preview`, `commit_dirty=false` and the exact source commit in the table. The API classified both as **preview**. Original deployment's success stage was also retrieved; later contact-copy deployment was verified by reading its hosted content.

Before both uploads, the project retained production branch `core-production-disabled`, no canonical production deployment and only `core-preview-test.pages.dev` in its domain list. No DNS, Wix, GitHub Pages, domain, production branch, account setting, paid service or buying activation was changed. Project-specific short-lived upload tokens were removed locally after upload.

## Repository and CI

Main verified as `5a40a5c4267604503a647a16bc1929bdde09e848`, an ancestor of original #23 (zero commits behind, eleven ahead). Main remains included by both fixes. Local merge-tree succeeded and GitHub reported clean/mergeable. PR #23 was retargeted from the stale Phase 5E branch to **main**, without merging or closing anything.

All observed checks passed on original `e04b5ed`: CORE checks runs [39985161864](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/39985161864) and [39985169877](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/39985169877), and no-deployment release candidate [39985170058](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/39985170058). Contact-copy commit `8d75aaa` passed CORE checks [40006688981](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40006688981) and [40006680707](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40006680707).

The final layout candidate passes **70 Node tests, zero failures/skips**, generation/package verification and **2,778 isolated-package Chromium browser checks**. Its GitHub CORE checks also passed: [40041951401](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40041951401) and [40041947728](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40041947728). Check the report-only head's latest checks before merging rather than treating earlier green runs as approval of a later SHA. Main had no enforced branch-protection status contexts in the observed API response.

Two packages were independently generated for each final revision. Paths, bytes and verifier fingerprints agree; the initial package also had matching modes and timestamps. The allowlist remains exactly 24 files. Hardware, canonical purchasing data, thresholds, evidence timestamps, affiliate catalogue and engine were not changed in this acceptance task.

## Hosted and visual acceptance

- Original preview: the established HTTP suite passed **204 assertions** with TLS validation enabled. All 24 hosted files matched package bytes after redirects; `.html` redirects retained saved queries; GET/HEAD missing/internal routes returned genuine 404s with the exact recovery page. JS/CSS types and root content passed.
- Original preview: **1,348 page/configuration assertions** passed across the completed matrix runs (187 desktop-JS assertions plus 1,161 remaining assertions). All 15 HTML pages were checked at 1440/390/320px, JS on/off. Checks covered semantic main/H1, keyboard skip links, mobile menu/Escape/focus recovery, build comparison, all three exact specifications, HOLD, affiliate disclosure/link markup, overflow and all ten Performance configurations (nine historical plus pending Option B) at 320px with JS on/off.
- Original preview: **120 additional actual navigation assertions** passed for homepage → build selection → each matching guide, at all three widths with JS on/off, plus privacy/disclosure page access.
- Contact-copy preview: **114 targeted browser assertions passed**, with zero retries in that completed run: corrected privacy text, all three HOLD states and absent exact-offer actions, 404 keyboard recovery and homepage access at 1440/390/320px, JS on/off.
- Representative screenshots were inspected, including Starter desktop guide, High-End 320px no-JS guide, Performance mobile parts, 404 recovery and homepage. **Visual inspection found clipped homepage text despite passing document-width assertions**; see the fixed defect below. Passing the original automated matrix alone was insufficient for acceptance.

Contact-copy preview HTTP verification also passed: **43 routes**, comprising byte-identical responses for all 24 packaged files, nine genuine internal/missing 404 responses and ten preserved configuration queries. Curl TLS validation remained enabled. This independently verifies the newer preview; it does not include the later grid fix.

Browser sessions used official Chrome for Testing with Playwright. Hosted browser sessions required `ignoreHTTPSErrors` for this environment's inspection-proxy certificate; this is **not a browser TLS certification**. Separate HTTP checks retained TLS validation. Initial replay attempts encountered HTTP 429s and test-harness timing/locator assumptions. Those failed attempts are not counted as completed passes. Paced navigation and bounded retries were used, with no changes to Cloudflare settings. The source of intermittent 429s (proxy versus upstream) was not established; no load-test claim is made.

Package/reference validation and hosted file checks cover local assets/routes. External retailer/manual destinations were inspected as links; this task does not certify external-site uptime, checkout availability, prices or attribution. Internal scripts/tests/canonical JSON/credential-path examples were inaccessible through the preview. The repository itself is public, and generated browser JS intentionally contains public specifications/history: packaging does not make that public data private or prove arbitrary embedded content secret-free.

## Issues and fixes

| Severity | Finding and evidence | Resolution |
|---|---|---|
| Medium — release acceptance | At 320px the homepage hero's `1fr` grid track expanded to its child's intrinsic width; `overflow:hidden` clipped introductory words while document scroll-width checks still passed. | Changed the mobile track to `minmax(0,1fr)` in `index.html`. Added a browser assertion requiring the introduction's bounds to remain inside the hero/viewport. Local visual check confirms text fits the 292px content area, right edge 306px. Packaged suite passes. **Hosted verification outstanding.** |
| Low — copy | Privacy page said contact details were being set up despite the existing published email on Contact. | Changed only that sentence to “For contact details, see the Contact page.” Hosted and tested in `8d75aaa`. No new privacy policy, form or collection feature. |
| Release management | #23 still targeted old Phase 5E. | Retargeted to main; no merge. |
| Test environment | Intermittent 429 responses and untrusted proxy CA in Chromium. | Recorded limitations; bounded retries/independent TLS-validating HTTP checks. No provider settings altered. |

Only `privacy.html` and `index.html` differ publicly from the original tested candidate. Their reviewed package integrity hashes were updated; the fixed allowlist and historical safeguards were retained.

## Remaining blocker and recommendation

**CONDITIONAL GO for the educational HOLD scope, but NO-GO for immediate merging until the new layout fix is hosted and checked.** The Cloudflare connector was removed/unavailable before the layout fix could be deployed. No production fallback or account change was attempted. The existing `e7214c9b` preview is useful for review but **does not contain the grid fix**.

Once preview access is restored, deploy the final 24-file package from the approved latest #23 head using `core-phase5-release-preview`, preserve the disabled production branch, verify the fingerprint above, and recheck hosted parity plus homepage introduction and navigation at 320/390/1440px with JS on/off. Check fresh CI and owner acceptance before merging. Any later public edit requires its own package fingerprint and relevant regression checks.

Educational readiness means a truthful informational journey through all three specifications and matching assembly notes, with visible HOLD and links to manufacturer instructions. It does not mean a photographed or physically tested beginner walkthrough, full WCAG certification, or approval to buy/energise an unverified assembly. No new novice study was performed here.

## Purchasing gates — unchanged NO-GO

All three builds remain HOLD. Required before any later buying activation:

1. Fresh exact-product UK VAT-inclusive offers, stock/dispatch, delivery charges and complete delivered baskets. No timestamps were renewed in this task.
2. Resolve Starter RAM evidence, High-End SSD/original cooler availability, Performance RAM value and owner-approved buying bands. Different revisions are not automatic substitutes.
3. High-End front-fan/RAM/panel clearance and stock-load cooling remain unproven; exact-assembly BIOS/first-boot, fan/cable and stability checks remain separate hardware acceptance.
4. Keep pending-policy/publication locks, 24-hour freshness, immutable snapshots and delivered-basket safeguards. Browser QA provides no new purchasing evidence.

## Next steps for #25 and #26

- **#25 first, after #23:** the observed head `5045dd8a63f8d79a4d9d759ad000870449e3f869` is no longer planning-only. It changes `guides.html` with a start-here route, ten-stage completion/stop notes and glossary, plus tests. Reconcile onto approved main, correct its outdated PR description, preserve this release's privacy/layout fixes and update reviewed package fingerprints. Run checks and a fresh isolated preview; record beginner observation separately.
- **#26 after #25:** observed head `3f1799a239e210c0b6c06c582fd578acaa4cd43b` adds the Starter companion and conceptual RAM-slot/EPS-versus-PCIe diagrams. Reconcile the dependency, verify diagrams against exact manufacturer material, accessible labels and mobile/no-JS behaviour, then review a fresh preview. Do not imply exact pinouts, original hardware photography or physical validation.
- Do not separately merge stale #15/#19 branches: their ancestry is already in #23, together with main's research-preservation work. No PR was closed here. #24 remains an independent internal-only growth-planning decision.
- Explicit owner merge approval remains necessary and must account for any existing live publication triggered by merging. No merge, live deployment, purchasing activation, paid infrastructure or separate AI-agent project was initiated.
