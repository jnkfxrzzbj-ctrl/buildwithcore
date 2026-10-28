# CORE — project history and decision register

Updated: 25 October 2026. Repository: `jnkfxrzzbj-ctrl/buildwithcore`.

## Purpose and authority
This is a navigation and continuity record, not a replacement for the original phase reports, technical decisions, source code, or current GitHub state. Historical statements are dated; verify live status before acting. The supplied Lean Development Strategy and original Project Decision Log remain governing inputs where available. Do not infer that a phase report's old GO authorises current deployment or purchasing.

## Product and business direction
CORE (buildwithcore.co.uk) is an independent UK guide to choosing and building a gaming PC, with Starter (1080p), Performance (1440p), and High-End journeys. Priorities: beginner clarity, exact compatible components, evidence-based buying advice, independent affiliate disclosure, and accessible practical assembly guidance. Growth is measured by qualified website engagement, not social impressions alone.

## Development chronology and evidence
| Phase | Recorded result | Primary reference |
|---|---|---|
| Phase 1 | Established public visitor journey and brand direction | `scripts/phase-1-public-journey.md` |
| Phase 3B–3D | Explicit public packaging and Cloudflare preview routing/404 verification | `scripts/phase-3d-verification.md`, `scripts/phase-3d-closure.md` |
| Phase 4 | Prepared isolated preview, conditional migration architecture and restricted GitHub fallback; full DNS/registrar evidence remains a separate gate | `scripts/phase-4-migration.md` |
| Phase 5 readiness | Audited product, buying, guide, editorial, contact and SEO readiness; earlier findings may have been superseded | `scripts/phase-5-launch-readiness.md` |
| Phase 5F | Integrated three exact build journeys while keeping purchasing on HOLD; squash merge `becd4e7` | GitHub main history |
| Phase 5G | Beginner start-here, ten assembly stages and glossary; merged `abcd58d` | `scripts/phase-5g-release-acceptance.md`, PR #28 |
| Phase 5H | Six-stage Starter build-along and labelled teaching diagrams; merged `2ea814d` | PR #29 |
| Phase 5I | Navigation, responsive design, accessible guide routes and clearly labelled representative case illustration; merged `8a155f1` | `scripts/phase-5i-design-polish.md`, PR #30 |
| Analytics preparation | Cloudflare Web Analytics production-domain-only beacon and privacy changes; merged `d3c9c87` | PR #31 and main commit |

## Durable decisions and safeguards
1. Preserve CORE's brand, simple static-site approach and exact three-build structure; do not introduce unnecessary framework or service migration.
2. Treat canonical product data, saved configurations, manufacturer identity and affiliate resolver as controlled. Never infer a current exact retailer listing from a historical one.
3. Starter, Performance and High-End remain **HOLD**; purchasing **NO-GO** until independently reviewed hardware, pricing, delivered-basket, freshness, compatibility and owner-release gates are met.
4. Maintain the explicit public package allowlist, byte-level verification, tests, controlled fingerprint and exclusion of internal scripts, tests, reports and secrets from deployed artifacts.
5. Current live domain uses GitHub Pages; Cloudflare `core-preview-test` is an isolated preview, not authorised production hosting. DNS/registrar changes, Cloudflare production migration and buying activation require separate approval and verification.
6. Preserve all saved Performance configurations and deep links; do not substitute current parts or prices for historical records.
7. AI representative imagery must be labelled as illustration, not a photographed or physically tested CORE build.
8. Do not mistake automated Chromium/HTTP checks for physical-build validation, independent accessibility certification or end-user testing.

## Operational references
- `scripts/core-current-handover.md`: latest status and next actions; refresh at each phase transition.
- `scripts/phase-4-migration.md`: production migration gates.
- `.github/workflows/github-fallback.yml`: owner-gated restricted GitHub Pages publisher.
- `scripts/package-public.cjs`, `scripts/verify-public.cjs`: public inventory and release fingerprint.
- GitHub PRs and Actions: immutable source of implementation and CI history.

## Maintenance rule
At every major merge, release, gate change or conversation handover, update the current handover with verification date, commit, PRs, test evidence, blockers and explicit next action. Add to this history only for material architectural, commercial or safeguard decisions. Do not rewrite historical outcomes as if they were fresh checks.
