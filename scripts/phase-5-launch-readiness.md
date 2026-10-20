# Phase 5 — launch readiness and first editorial implementation

20 October 2026. Audited GitHub main: `a6bf03b3b94df70758c1c9dd943d1af7358eb108`.

## Executive assessment

**Not ready for a full choose–buy–build marketing promise. A useful Performance-first early-access launch is achievable, conditional on the gates below.** The existing design can stay. The constraint is product readiness: no current build is endorsed for purchase, and no complete assembly guide is released. More affiliate buttons alone will not solve this.

This is a source audit with external research and a focused proposed implementation, not completed live/browser acceptance. The local execution environment is unavailable. The web reader could not access the live apex, www or Builds page. This is a tool limitation, not evidence that CORE is down. The supplied local DOCX/ZIP sources could not be opened; their contents have not been independently read in this turn. Repository Phase 1 and Phase 4 records describe their earlier use of the Lean Strategy and Decision Log. Current user instructions and immutable main govern this limited patch; the old ZIP was not substituted for current code.

Read all 24 public source files, canonical product data, affiliate resolver, browser/packaging tests, generation/deployment documentation, Phase 1 journey record, Amazon verification record, fallback rehearsal and Phase 4 migration introduction. GitHub reports a successful owner-gated fallback run [39447046103](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/39447046103) at the audited SHA. Owner confirms Actions publishing. Neither proves current live bytes or environment settings. No settings were changed.

## Audit findings

| Area | Evidence and consequence |
| --- | --- |
| First visit | Home explains the model and shows EARLY ACCESS/HOLD, but “No guesswork”, “One easy decision” and a higher-performance High-End claim overstate readiness. Corrected in this PR. |
| Discovery/comparison | Three journeys exist; Performance is featured. Semantic comparison has all three columns in a keyboard-scrollable region. No literal empty/hash-only links or missing local href/src targets/fragments found across 15 HTML documents (14 normal pages plus 404). This does not verify network redirects. |
| Buying journey | C has eight exact parts, four resolved Amazon destinations, reference listings and visible disclosure. All remain research/reference destinations. There is no endorsed complete basket. |
| Specs | C is ASUS 9070 XT, B850M WIFI6E and RM850x, not the earlier 9070/ATX board/RM750x. Historical destinations must never be borrowed for the new parts. Starter and High-End are reference specifications. Their remaining “Best value”, “Flagship” and easy-build language needs a later editorial pass. |
| Guides | Performance has hardware notes and nine saved configurations, not assembly instructions. Starter/High-End guide pages are status pages. Guides hub placed available Performance notes second on mobile; this PR puts them first and replaces a generic proposed assembly sequence with a preparation checklist. |
| Contact | A visible authoring placeholder is present. This PR removes it and gives FAQ/guide routes, but a working owner-supplied contact address remains necessary. It does not invent a mailbox. |
| FAQ | Beginner answer assumes a released guide; troubleshooting omits unplugging before internal work. Corrected. |
| Mobile/accessibility | Source has shared navigation, Escape/focus handling, skip links, visible focus, no-JS navigation, responsive comparison and reduced-motion support. Existing CI has 1440/390/320px coverage, JS/no-JS and keyboard tests. New rendered results and visual inspection remain required; no WCAG conformance claim. |
| SEO/social | All 14 normal pages have title, description and canonical tags. Social text tags exist. No og:image found. No sitemap/robots file in the 24-file package. Social artwork is useful before campaign launch; sitemap is a smaller later task. |
| Performance | Static site; no framework migration justified. Source scan found no img tags in current HTML. CSS gradients and repeated embedded styles exist. No measured Core Web Vitals/Lighthouse result available; do not optimise speculatively. |
| Deployment | Explicit 24-file allowlist, source-byte equality, generated fallback checks, isolated browser tests and owner-gated publisher exist. Report and tests are excluded. Actual internal-file HTTP 404s, TLS and deployed hashes still need live acceptance. |
| Readiness policy | C has pending policy, not merely stale prices. Fresh cheap offers alone cannot activate it. Public view also suppresses positive synthetic eligibility. Any launch activation needs separately reviewed implementation and owner approval; simply updating timestamps will not work. |

## Prioritised backlog

Estimates are focused engineering/editorial time, excluding account responses, delivery and physical testing.

| Priority | Work / customer benefit | Effort | Dependency / acceptance |
| --- | --- | --- | --- |
| P0 | Finish and review this readiness-copy patch; visitors understand what exists | 0.5–1 day | CI, visual desktop/mobile review, owner merge/deploy |
| P0 for purchase-led launch | Establish an approved C buying policy and current exact eight-part evidence; avoid stale/overpriced orders | 1–2 days plus owner decision | Separate approval for targets/ceilings/status; stock, seller, VAT, shipping, dispatch and <24h checks; preserve fail-closed publication safeguards |
| P0 for full build promise | Complete exact C assembly/first-boot help, verify BIOS, cable contents/clearance and physical steps | 3–5 days plus hardware availability | Exact hardware/manuals and physical validation; no mismatched instructional imagery |
| P0 | Working contact channel and accurate privacy/contact copy | 1–2 hours after mailbox supplied | Owner supplies monitored public address; no DNS change in this phase |
| P0 | Live release acceptance: 24 hashes, exclusions, TLS, all journeys/nine IDs, C HOLD, keyboard/JS/no-JS | 0.5 day | Browser/runtime access and approved release; existing scripts |
| P1 | Recheck all nine Amazon destinations and fill C gaps only on exact identity evidence | 0.5–1 day, potentially account-dependent | Real product-page access; never generic searches or guessed ASINs |
| P1 | Shorten technical buying detail while retaining evidence and clear warnings | 0.5–1 day | Generated renderer, static regeneration and tests together |
| P1 | Remove remaining overconfident Starter/High-End and guide-status headings | 0.5 day | Editorial review; keep specifications untouched |
| P1 | Add accurate social-sharing image and campaign landing-page metadata | 0.5 day | Approved graphic, explicit public-package review and new fingerprint |
| P1 conditional | Add a few verified PCNova/Awin exact-product destinations | 0.5–1 day after access | Programme identity/terms, retailer trust, actual catalogue and generated deep links verified |
| P2 | Review/relaunch Starter and High-End as distinct value propositions | 2–4 days each | Current UK research, guide work, owner spec approval |
| P2 | Automated feeds, price alerts, saved baskets/accounts and purchase exports | Defer; scope separately | Proven manual workflow and programme permissions |
| P2 | CSS consolidation, sitemap and optional analytics | 0.5–2 days | Demonstrable benefit; package/privacy review as applicable |

An affiliate relationship is optional for an exact useful retailer link. Do not delay a useful site simply to monetise every part. Conversely, do not call an incomplete shopping list commercially complete.

## Amazon audit

Resolver exercised in the JavaScript orchestration environment against canonical data: all nine catalogue entries return exact /dp/ASIN URLs carrying `buildwithcore-21`. It requires the complete MPN, or exact EAN for EAN-only entries; wrong identities fail closed. It accepts only Amazon UK and the approved tag. No search URLs found in the resolver. Existing browser tests assert sponsored/noopener/noreferrer and visible disclosure.

| Component / scope | ASIN | Current finding |
| --- | --- | --- |
| Ryzen 5 9600X / C + historical | B0D6NN6TM7 | Resolves; existing owner identity record |
| KLEVV FIT V CL28 / C + historical | B0FMR83P3F | Resolves; 4 October identity record |
| WD Blue SN5100 2TB / C + historical | B0FJ8QMW4H | Resolves; manufacturer suffix mapping documented |
| NZXT H6 Flow black / C + historical | B0C89FCDFP | Resolves; non-RGB identity documented |
| MSI B850 GAMING PLUS WIFI / historical only | B0DPKV94MX | Resolves by EAN; not C’s micro-ATX WIFI6E board |
| Gigabyte RX 9070 / historical only | B0DS2QZC9P | Resolves; not C’s RX 9070 XT |
| Sapphire PULSE RX 9070 / historical alternative | B0DRPSF34T | Resolves to its own identity |
| WD_BLACK SN7100 2TB / historical alternative | B0DN6ZQ3PD | Resolves; not silently substituted for C SSD |
| Corsair RM750x UK / historical only | B0D9BZ2BDB | Resolves; not C’s RM850x |
| ASUS Prime RX 9070 XT OC / C | None | Exact MPN 90YV0L71-M0NA00 needs verified destination |
| MSI B850M GAMING PLUS WIFI6E / C | None | Numeric SKU/EAN unresolved; strict resolver cannot safely identify by name alone |
| Corsair RM850x 2024 UK / C | None | Exact CP-9020270-UK destination needed; do not use EU/refurbished/RM750x |
| Thermalright PA120 SE / C + historical | None | Prior candidate had conflicting MPN/ASIN; unresolved |
| TEAMGROUP Vulcanα CL38 / historical alternative | None | No exact verified destination |

All nine Amazon page opens were inaccessible to the web reader in this session. **None is newly certified working at the retailer today; none is classified broken solely from that failure.** Seller, stock, price and tracking attribution remain unverified. No link or catalogue entry changed. Site disclosure exists, but account eligibility and the earlier Amazon price-tracking terms concern remain owner/account checks; this report is not a compliance certification.

## PCNova / Awin

[Awin programme 125822](https://ui.awin.com/merchant-profile/125822) is publicly titled PcNova.co.uk, describes IT-Supplies and links to **www.it-supplies.co.uk**. Its public page confirms a **30-day attribution period**. The similarly named `itsupplies.uk` is not the linked domain and must not be treated as the same merchant.

Public PCNova fetch returned 403; the actual Awin-linked retailer timed out. No exact component catalogue, current delivered price, stock or seller quality could be verified. Search results did not establish exact matching PCNova products. Therefore no price-competitiveness claim or retailer endorsement is made.

No authenticated Awin tool was available; plugin discovery found no Awin connector. Owner-reported acceptance is recorded but not independently checked. **1.5%, VAT/shipping exclusions, category eligibility, cancellations, validation periods, allowed promotion methods, account membership and publisher ID remain unverified.** No test order, merchant message or account change was made.

Awin’s [Link Builder API](https://help.awin.com/apidocs/generatelink) supports advertiser-specific destination links; [enhanced feeds](https://help.awin.com/apidocs/retail-publisher-productapidocumentation-1) require an existing feed and permission. These platform capabilities do not prove this advertiser enables deep linking or supplies a feed.

Recommended minimum integration, once evidence is available:
1. Verify programme 125822, membership, current domain and terms in the account.
2. Verify each exact product identifier, condition, delivered VAT-inclusive price and dispatch independently of commission.
3. Generate a small number of exact links in Awin Link Builder; verify redirects retain the correct product and publisher attribution. Do not manufacture links using guessed account IDs.
4. Add a retailer-specific resolver branch with explicit destination/identity validation. The current resolver intentionally rejects every non-Amazon retailer, so simply adding Awin rows would yield no links.
5. Keep affiliate destination data separate from purchasing evidence. Test unknown/mismatched identity, wrong merchant/domain, malformed URL and missing verification as no-link outcomes; test the correct deep link, visible disclosure and unchanged HOLD.
6. Keep API/feed credentials and licensed raw feeds out of public bundles. Prefer manual verified links for launch; feed automation can wait.

No Awin code is activated in this PR. PCNova should not be a launch dependency.

## Editorial/UX direction implemented

Five HTML files only: Home, Builds, Guides, Contact and FAQ. Preserve the established design, navigation, specifications and all generated regions. Available Performance notes now precede unreleased guide cards. New copy distinguishes a researched part list from a buy recommendation, removes an unsupported High-End superiority implication and replaces the contact authoring placeholder with real next steps. The mailbox itself remains outstanding. FAQ explains guide availability and unplugging before internal checks.

Further improvements should prioritise one obvious next action per page, short everyday component explanations, an expandable exact-model/evidence layer, and a compact “what you still need” checklist. Avoid repeated slogans and promises that depend on unreleased features.

## Scope and timetable

- **21–23 October:** review/merge first copy patch after QA; provide mailbox; verify retailer destinations and agree whether November is an early-access editorial launch or a full buying/building launch.
- **24–30 October:** focus exclusively on C buying policy/evidence and exact build help. Allow 3–5 working days of guide work, with hardware delays treated explicitly.
- **31 October–2 November:** final desktop/mobile/keyboard/no-JS review, fresh retailer checks and approved package release.
- **3–6 November:** start modest social promotion only after relevant gates pass. If buying/assembly work is incomplete, market honest early-access hardware notes; do not promise “buy this now and build it with our complete guide”.
- **November–December:** maintain evidence freshness during campaigns, check retailer delivery promises without inventing Christmas cut-offs, and expand only after the Performance journey works.

These are planning estimates, not commitments. A date alone never overrides HOLD. Keep all three categories visible but clearly mark the two reference tiers. Defer configurators, accounts, feeds and broad redesign.

## Owner decisions

1. Approve a Performance-first early-access scope if full purchasing/assembly gates cannot be met in time.
2. Supply the monitored public contact address.
3. Provide Awin programme terms/publisher ID and exact generated product links through an appropriate account workflow; never paste API secrets.
4. Separately approve researched C buying thresholds and any purchasing activation after evidence review.
5. Decide how to obtain physical build validation/exact guide photography and allocate time/budget.
6. Review the implementation PR; merge and publication remain separate owner actions.

## QA and fingerprint record

Public allowlist unchanged: 24 paths. Five reviewed HTML files change. Engine, data, affiliate catalogue, view/static generated sections, nine configurations, CSS and workflows are unchanged. Tests/report remain internal.

Baseline full source fingerprint: `643c83c855293f056326467fcd435d2740ab8e5a220a697fdd77dbe52ad2fdce`.
Proposed full source fingerprint: `9d56efea73367b2865db759366202e519b3f2a1d536837889ac4d4fed2605d97`.
The existing 22-file regression hash was independently reproduced before explicitly updating it from `54ba40d7d90580e03072378b8cb4c929a781cfd0301398b953f227d79acc36fa` to `7087d9ee9653a1f595ca44d5999d356ac363be38702838c66e965354759bf957`.
Ordering is sorted path + NUL + exact UTF-8 content + NUL.

The packaging test now also calls the established `verify-public.cjs` on its isolated output and asserts/prints the fixed full fingerprint. Existing CI must recreate this package and pass the Node, source-browser and package-browser suites. No test assertion or exclusion is removed to hide a failure.

Source link checks and resolver execution passed in orchestration; these are not substitutes for Node/Playwright. Local shell, browser screenshots, live hashes/TLS/exclusion checks and attachment reading were unavailable. Record actual GitHub CI results in the PR; until then the patch is draft/unverified. Even green CI does not establish retailer availability or live deployment. Owner review is still required.

Initial CI at df3fc3e passed Node/package checks but caught Guides overflow at 320px. The new headings were shortened; browser assertions were preserved. Follow-up CI must pass before review.
