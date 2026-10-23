# CORE — Release consolidation and approval gates

Date: 23 October 2026. Status: internal release planning; **no approval to merge or deploy**.

## Source branches verified

- Current main: `35e9b2d2e20609c0c11e4cdf3d23d68125b12bc9`.
- `phase-5f/three-build-integration`: 7 commits ahead of main, zero behind.
- `phase-5g/beginner-experience`: 6 commits ahead of 5F, zero behind.
- `phase-5h/starter-walkthrough`: 4 commits ahead of 5G at the time of comparison, zero behind.
- `phase-6a/launch-growth-foundations`: 1 commit ahead of main, zero behind; 13 internal files only, no public-file changes.

Branch ancestry does not itself establish conflict-free mergeability after retargeting, or certify a release.

## Disposition of open PRs

| PR | Proposed disposition | Gate |
|---|---|---|
| #15 | Foundational merge candidate | Check current CI, public claims and diff, owner approves |
| #16 | Retain research, then close as superseded if no unique needed work | Check evidence and provenance against #23 |
| #17 | Retain exact-hardware decision history, then close if superseded | Check alternatives and owner decisions against #23 |
| #18 | Retain delivered-basket evidence and test utilities; close only after checking what #23 does not contain | Verify any independent scripts/tests worth preserving |
| #19 | Merge after #15 | Retarget/recheck checks and diff |
| #23 | Merge after #19 | All builds remain HOLD; check exact components, snapshots, tests, preview |
| #24 | Independent internal-only merge candidate | Verify CI, assumptions, reports and workbook parity; owner approves |
| #25 | Merge after #23 | Update outdated PR description; visual/novice QA limitations explicit |
| #26 | Merge after #25 | Latest targeted browser CI passed; manual/visual QA outstanding |

Do not automatically merge or close older research PRs: a later report may reference an earlier evidence file without carrying its bytes or reusable tests into the eventual main branch.

## Two release gates

**Educational release:** honest HOLD status; complete and navigable guides; correct claims about untested physical builds; mobile/keyboard/no-JS checks; exact immutable configuration URLs; accessibility/manual review; approved privacy/contact/disclosures; isolated hosted preview accepted by owner. Educational launch must not imply complete buying readiness.

**Purchasing release:** separate owner approval after fresh UK VAT-inclusive delivered baskets, exact identity, value thresholds, stock and dispatch, physical fit/thermal validation where outstanding, and deterministic buying-engine evidence. Missing or stale data remains HOLD.

## Phase 6A assessment

Phase 6A's commercial workbook has editable low/central/optimistic assumptions and blank monthly reporting. Central assumptions: 5,000 monthly visits; 750 affiliate click events; 22.5 expected attributed orders; £101.25 retained commission; £86.25 cash surplus before tax and owner time; minus £393.75 after valuing 32 owner hours at £15/h. These are scenarios, not forecasts; actual programme rate cards and attribution are unverified.

Approve separately before activation: Web Analytics/GSC and privacy changes; newsletter provider and controller/consent; publishing cadence; robots/sitemap public changes; any read-only evidence agent. No advertising spend for first 30 days is recommended, not already authorised. Newsletter is optional for educational launch.

## Immediate execution order

1. Verify all open PR CI and base/head/diff metadata; reconcile unique #16–18 evidence and tests.
2. Complete Starter diagram/manual verification and visual QA; do not represent conceptual SVGs as hardware photos.
3. Prepare #15 and then #19 as owner-reviewed merges, with checks repeated after retargeting.
4. Prepare #23, #25 and #26 in dependency order, preserving HOLD and saved configurations.
5. Consider #24 separately for internal-only merge after checking CI; it should not block public UX work.
6. Deploy to an isolated preview and complete owner acceptance before any live release.
7. Only then ask for explicit production approval.

No PR closed, merged, retargeted or deployed by this plan.
