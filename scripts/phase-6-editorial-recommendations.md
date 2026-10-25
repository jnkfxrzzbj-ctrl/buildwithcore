# Phase 6 — editorial build recommendations

Review date: 25 October 2026. Base: b1a85d63b1ddc558c73c74ccafec0dbcec0febd9 (merged PR34). One feature branch; no production release.

## Targeted gap assessment
PR34 already supplies the exact three specifications, reference catalogue, guides and historical recovery. The missing piece was a specification assessment independent of purchasing eligibility. Existing public HOLD language treated unapproved baskets as the overall build verdict. Reused the canonical hardware, engine, retailer links, generators and historical records. Open PRs were inspected; none was modified or used as an implementation base.

## Proposed owner-reviewed editorial decisions
| Build | Status | Intended use | Value position and limitations |
|---|---|---|---|
| Starter | UNDER REVIEW | First-time 1080p builder | Documentary compatibility is credible, but the owner review's £1,067.86 component subtotal includes £409.99 for the 8GB GPU and £154.99 for 16GB DDR4. Insufficient value for an endorsement. AM4 upgrade limits, 8GB graphics memory and budget NV3 remain explicit. Reassess exact GPU/RAM value before endorsement; no substitution is made. |
| Performance | RECOMMENDED | Quality-focused 1440p DIY builder | Balanced six-core/16GB GPU design, AM5, 32GB RAM, specified SSD/PSU and simple air cooling. £1,864.85 dated component reference. The RAM premium is a weakness, not justified solely by CL28; 1TB capacity is a compromise. A motivated DIY buyer may reasonably value the exact parts and assembly experience, but CORE does not claim savings over the £1,849.99 historical prebuilt comparison including Windows and support. |
| High-End | RECOMMENDED | Premium 4K/ray tracing or CPU-limited high refresh | £2,874.81 dated component reference. 5080/9800X3D/2TB creates a distinct tier. Diminishing returns, 16GB VRAM in both upper tiers and upscaling requirements are explicit. Performance remains the default for most 1440p users. |

These are proposed publication decisions for this draft, not new purchasing-policy approvals. The price observations are reused from the completed 25 October owner review; no new current stock or delivery claim was made. Public numerical references display their observation date, basis and exclusions. They are neither live prices nor approved ceilings. No price is refreshed by generation.

The change in recommendation framework is explicitly authorised by the Phase 6 brief. The owner review's earlier requirement for delivered baskets is retained for offer approval, not imposed on documentary editorial endorsement. Missing physical assembly evidence is disclosed, not represented as completed. No new material hardware substitution or buying-policy change is proposed.

## Evidence reused and focused checks
- `three-builds-launch-implementation.md`, Phase 5F and Phase 5D establish exact identity, BIOS minimums, connectors, slots and documentary envelopes. Full 25 October owner review was read; PR34 has already integrated its 5080/EVO revision.
- Starter: [TechSpot original testing](https://www.techspot.com/review/2992-nvidia-geforce-rtx-5060/) supports 1080p positioning and significant 8GB limitations. It does not certify this exact 5600 system's frame rates.
- Performance: [TechSpot original RX 9070 XT testing](https://www.techspot.com/review/2961-amd-radeon-9070-xt/) supports 1440p use with substantial game-to-game variation. No universal FPS guarantee is published.
- High-End: the [Tweakers original June 2026 comparison](https://tweakers.net/reviews/14672/had-beter-rx-9070-meh-kunnen-heten-amd-radeon-rx-9070-gre.html), already used in the owner review, supports a larger ray-tracing than raster benefit. [9800X3D testing](https://www.techspot.com/review/2915-amd-ryzen-7-9800x3d/) supports its CPU-limited gaming role. These are component benchmark inferences, not CORE system measurements.
- Rechecked [exact Inno3D X3](https://www.inno3d.com/product/inno3d-geforce-rtx-5080-x3) dimensions (300 × 116 × 41mm) and [exact EVO](https://www.thermalright.com/product/phantom-spirit-120-evo/) AM5 support and 157mm heatsink height. Against the existing H6 163mm cooler allowance, the nominal 6mm is not a promise that a raised fan fits. Follow the existing full installed-height, RAM and side-panel checks; native 12V-2x6 seating and bend clearance remain mandatory. No physical clearance, thermal, stability or acoustics certification is claimed.

No broad new hardware survey, checkout basket work or new affiliate integration was undertaken. The focused evidence did not establish a material reason to replace the approved hardware.

## Small implementation
`core-data.json.editorialRecommendations` records status, exact revision, intended user, rationale, strengths, limitations, dated cost basis, evidence gaps, sources and review dates. It is never read by the buying engine. The existing view module validates and renders it; existing generators produce static HTML, including no-JavaScript access. Build/guide pages display complete assessments; Home/Builds use compact summaries. Historical guide data remains unchanged and editorial blocks explicitly identify the current specification.

Reference buttons say “Check current price at retailer”; reference-only status, exact identity matching and safe external-link behaviour remain. Public pages explain the distinction between specification and offer approval. The 25-file public allowlist, engine, affiliates, workflows, publication lock, historical configurations and buying thresholds are unchanged. A new independent hash test preserves the entire PR34 canonical object with only the new editorial key removed. The reviewed public presentation digest changes because generated content and copy change.

## Maintenance for one owner
Weekly: inspect indicative costs and exact retailer destinations for material changes, persistent unavailability, superior alternatives or a changed value proposition. Record the source, observation date and conclusion. No full checkout baskets are required for this editorial review. A material problem triggers UNDER REVIEW; use NOT CURRENTLY RECOMMENDED for an established technical/value reason to withhold endorsement.

Monthly (next specification review 25 November 2026): reassess audience fit, CPU/GPU balance, memory/storage, platform support, assembly notes and material hardware developments. Keep the unchanged specification unless an evidence-backed change is worthwhile. For replacements, seek owner approval, preserve the old configuration and revise the exact guide and editorial revision together.

Event-driven: immediately review discontinuation, incompatibility, recall or a major value change. Withdraw or revise the editorial state via an owner-reviewed PR. No autonomous publication or background state changes.

Implemented automation: generation validates editorial completeness, dates and revision identity; tests protect independent purchasing decisions and unchanged baseline data; package checks reject stale generated editorial HTML. Review dates are metadata, not a scheduler. Weekly/monthly research, assessment and publication remain manual. No paid service, scraping job, reminder or live price infrastructure was created.

## Owner decisions
Review the proposed editorial verdicts and presentation together when preview acceptance is complete. Starter remains a specifically identified unresolved editorial value judgment. No reapproval of unchanged parts is requested. Merging or production deployment is a separate owner action. Offer approval continues to require the existing policy and fresh evidence; this draft cannot grant it.

## Verification
Local regression and hosted/CI evidence are recorded in the draft PR after execution. A local Chromium install attempt failed with truncated downloads; do not infer a browser pass from Node tests. Preview must use the exact PR commit and `core-preview-test` with production branch `core-production-disabled`.
