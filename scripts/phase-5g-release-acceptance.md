# CORE Phase 5G — hosted release acceptance

24 October 2026. **GO for owner-approved merging of PR #28 as an educational HOLD release.** Hosted acceptance is complete. Purchasing remains **NO-GO**; this is not approval to buy components or a claim of physical/novice validation.

## Exact release and deployment

| Item | Verified value |
|---|---|
| Repository / PR | `jnkfxrzzbj-ctrl/buildwithcore` / #28 |
| Branch | `phase-5g/reconciled-main` |
| Tested, packaged and deployed SHA | `4b8be5d09fbaf76b9bf9f08a522fb30c7776e0ee` |
| Main included | `becd4e7db8b3abd3d994c6cb34b70776ce4fe00b`; candidate zero behind, five ahead when checked |
| Public package | **24 files, 456,190 bytes** |
| Approved and reproduced fingerprint | **`56df0d3792bb56eb6304749239b266317135d696af47a42464e9f6f013f303b2`** |
| Cloudflare project | Existing `core-preview-test` |
| Explicit preview branch | `core-phase5g-release-preview` |
| Immutable preview | https://65a7815e.core-preview-test.pages.dev |
| Deployment ID | `65a7815e-ed99-417b-a86d-de8b24810332` |
| Deployment result | API confirms `environment=preview`, deploy stage `success`, exact source SHA and `commit_dirty=false` |
| Completion timestamp | `2026-10-24T11:57:33.548305Z` (12:57:33 BST) |

The package fingerprint is the existing verifier's ordered path/NUL/bytes/NUL SHA-256, not a ZIP hash. No allowlist expansion occurred. The acceptance-report commit after the tested SHA changes no public file and therefore does not require a different deployment package.

## CI and local verification

GitHub showed the candidate open, targeting main and conflict-free. Both candidate checks succeeded: [40090616742](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40090616742) and [40090612695](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40090612695). Check the report-only latest head's checks before merging; older successful runs are not a substitute for a later code change.

From the exact clean checkout:

- `node scripts/build.cjs --check`: PASS.
- `node scripts/render-performance.cjs --check`: PASS.
- `node --test tests/*.test.cjs`: **70 passed, zero failures/skips**.
- `node scripts/package-public.cjs --out ../phase5g-public`: PASS; existing consistency/reference checks retained.
- `node scripts/verify-public.cjs ../phase5g-public`: PASS; exact approved 24-file fingerprint above.
- Existing `tests/browser-check.cjs` against only the isolated package, using Chromium: **2,826 checks passed**. Includes accepted Phase 5F safeguards plus Phase 5G beginner-route assertions.

The PR description's earlier warning about an unupdated package digest was stale: the tested head already contains the reviewed Phase 5G digest. No digest or public code was changed during this acceptance task.

## Hosted acceptance

**43 HTTP route checks passed**, with TLS certificate validation enabled:

- All **24 public files** match the generated package byte-for-byte after Cloudflare redirects.
- Nine representative internal/missing paths return the exact CORE 404 body with HTTP 404, including scripts, tests, canonical JSON, `.env`, `.git/config`, private-feed and missing-asset examples.
- All ten saved Performance configuration query strings survive `.html` redirects (nine historical configurations plus pending Option B).

**382 targeted real-browser assertions passed**, with zero retries in the completed run. Each viewport **320px, 390px and 1440px** was tested with JavaScript **enabled and disabled**. Coverage:

- Homepage text bounds and navigation; mobile menu open/close, Escape/focus recovery; no-JS links remain available.
- Keyboard 404 recovery back to the homepage, privacy-page access and preserved corrected contact copy.
- Starter, Performance and High-End remain **HOLD**, with no exact-offer purchase action.
- Visible start-here heading and explicit “HOLD — do not order yet” message.
- Exactly ten assembly stages, each with completion checks and “Pause and get help” conditions; stage bounds remain inside the viewport.
- Six glossary terms; no document overflow at the tested widths.
- Keyboard activation of the start-here assembly link preserves `#assembly`; all same-page guide anchors resolve to existing IDs.
- Start-here comparison link navigates to Builds. Existing full packaged-browser coverage also verifies guide selection and exact historical configuration retention.

Visually inspected all ten assembly-stage screenshots, plus desktop/mobile start-here, glossary and homepage views. The start-here grid becomes one column at 320px and two at 390px; completion/stop notes and glossary text wrap readably. The existing fixed navigation can overlay the top of an automatically scrolled element screenshot; this is a capture limitation, not evidence that text is absent. Assembly/Windows/care targets retain their existing 100px scroll margin. No release-blocking layout or navigation defect was identified.

Hosted Chromium used the environment's inspection proxy and its previously documented `ignoreHTTPSErrors` exception. Independent HTTP verification retained TLS checking. Browser results therefore do not certify browser trust of the proxy CA. This is basic accessibility/keyboard/viewport acceptance, not a full WCAG audit, external retailer uptime test, physical build, thermal/FPS test or observed novice trial.

## Safeguards and scope

Cloudflare preflight and post-deployment checks confirm production branch **`core-production-disabled`**, no canonical production deployment and only `core-preview-test.pages.dev` in the project domain list. The exact public package alone was uploaded; temporary short-lived upload-token material was removed locally.

No production deployment, domain/DNS/account-setting change, paid service activation, purchasing activation, hardware edit or affiliate change occurred. Internal-file exclusion does not make the public GitHub repository private; public generated JS still intentionally includes approved specification/history data.

Relative to accepted main, the reviewed candidate changes the Guides page, its internal implementation brief and focused browser/package tests. This acceptance task adds only this report and updates PR metadata. No new feature or public fix was needed, and PR #26 was not started or modified.

## Decision and next step

**GO — PR #28 is technically ready for owner-approved merging as an educational HOLD release**, subject to the final report-only head's checks remaining green. The accepted preview is the URL above. Owner approval to merge remains separate; nothing was merged or closed here.

Purchasing remains **NO-GO**. Existing fresh-evidence, exact-identity, delivered-basket, editorial buying-band, availability and outstanding physical fit/thermal gates remain unchanged. Beginner guidance explicitly supports exact manufacturer instructions and does not claim a physically tested walkthrough. Do not activate buying recommendations based on this acceptance.

Review/merge PR #28 only when the owner approves. Do not begin PR #26 or another development phase as part of this acceptance.
