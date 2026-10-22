# Phase 5E — launch completion review

22 October 2026. **NO-GO today for marketing three complete, approved build journeys.** Useful public copy and guide work is implemented in this draft; hardware completion is partial. Do not describe the draft as all three builds launch-ready.

## Scope and baseline
Main verified at a6bf03b3b94df70758c1c9dd943d1af7358eb108. This branch is based on PR #15 (0f4cf8567cfc8968e96a1406f355bfcd70f10371), so its editorial fixes are incorporated without changing that PR. Review/merge #15 first, then retarget this draft to main; recheck the combined diff and fingerprint. PRs #16–18 are research inputs, not dependencies or modified branches. Phase 5D remains Performance's proposed specification baseline; canonical C remains unchanged.

Read Lean Development Strategy, decision log, public implementation and uploaded guide prototype README/illustration audit. The visual prototype flags inaccurate socket, cooler, cable and case images, so none is published. Its preparation/assembly/first-boot structure informs the simpler text checklist. Live homepage returned HTTP 200 during this phase; web-reader access failed. Source was audited across all 15 public HTML pages. No hosted mobile/interaction acceptance claim is made.

## Concise launch-gap audit

| Page / journey | Classification after this draft | Remaining work |
|---|---|---|
| Homepage, About, build discovery | Requires focused fix | Final approved three-build specifications/readiness text; wording now avoids a cheapest-PC promise. |
| Starter specification → guide → Windows | Requires focused fix (P0) | Exact complete available basket, BIOS/manual checks and approved specification. Checklist route now works. |
| Performance specification → saved notes → checklist | Requires focused fix (P0) | Decide/approve Option B integration; fresh complete delivered evidence and policy approval. C/history preserved. |
| High-End specification → guide → Windows | Requires focused fix (P0) | Approve differentiated exact design; final compatibility and basket. Old AIO clearances not certified. |
| Guides / Windows / care | Ready for editorial review | Practical text checklist added; no claim of physically tested exact walkthrough. |
| FAQ, disclosure, privacy | Ready for editorial review | Keep aligned with any later specification switch. |
| Contact/help | Requires focused fix (P1) | Owner public contact channel. Placeholder removed; retailer support and FAQ routes supplied. No invented inbox. |
| 404 and internal navigation | Ready subject to browser CI | Existing recovery routes retained. |
| Bespoke diagrams, Linux walkthrough, advanced interaction | Defer | Do not block a text-first launch on these. |

## Proposed specifications — not activated
These are the final design directions recommended by this review, **not fully verified final shopping lists**. Companion JSON records exact model identifiers. Unresolved compatibility and stock remain explicit; do not replace public hardware with these proposals until reviewed.

| Slot | Starter | Performance (Phase 5D) | High-End proposed revision |
|---|---|---|---|
| CPU | Ryzen 5 5600 boxed, 100-100000927BOX | Ryzen 5 9600X, 100-100001405WOF | Ryzen 7 9800X3D, 100-100001084WOF |
| GPU | PowerColor Reaper RX9060XT 16G-A | PowerColor Reaper RX9070XT 16G-A | Same Reaper RX9070XT 16G-A |
| Board | MSI B550M PRO-VDH WIFI | MSI B850M GAMING PLUS WIFI6E | Same exact B850M WIFI6E |
| RAM | Corsair LPX 16GB 2×8, CMK16GX4M2E3200C16 | Klevv FIT V 32GB, KD5AGU880-60B280L | Same Klevv FIT V 32GB |
| SSD | Kingston NV3 1TB, SNV3S/1000G | SN7100 1TB, WDS100T4X0E-00CJA0 | SN5100 2TB, WDS200T5B0E-00CPE0 |
| PSU | RM650e 2025 UK, CP-9020302-UK | RM850x 2024 UK, CP-9020270-UK | Same RM850x 2024 UK |
| Cooler | Wraith Stealth included with boxed CPU | Standard Freezer 36, ACFRE00121A | Peerless Assassin 120 SE non-RGB, PA120 SE 1700 |
| Case | Original Montech AIR 903 MAX (B) | Original H6 Flow black, CC-H61FB-01 | Same original non-RGB H6 Flow |

Starter is for lower-cost 1080p use, with selective 1440p settings. AM4/DDR4 limits later platform upgrades; 16GB is a budget compromise, not a universal recommendation for every new game. No verified complete price exists. Retain only if a full basket supports a real saving; do not call the current £649.99 Reaper listing good value.

Performance remains the balanced 1440p design with selective 4K settings. Phase 5D's £1,924.81 subtotal is dated 21–22 October, excludes Windows and lacks verified complete shipping. Its £1,750/£1,850 proposed bands are not active. Owner's clarified willingness to pay a modest premium means this review does not treat prebuilt price parity as an absolute ceiling; any revised premium/bands must be explicit, supported by the complete basket and approved rather than silently relaxed.

High-End should spend on an X3D CPU and 2TB capacity rather than an unverified thick AIO/RGB combination. It serves CPU-sensitive/high-refresh gaming and users wanting more storage; it is **not** a blanket promise of faster 4K gaming because the GPU is unchanged. The exact 9800X3D BIOS minimum and cooler thermal/clearance review remain gates. Reusing known board/PSU/case parts reduces variation, but does not substitute for reviewing the full tuple. No new High-End complete price or positive badge is claimed.

## Bounded market checks and blockers
Retrieved 22 October 2026. These are dated source observations; individual checkout timestamps were not retained and no production offer timestamps are created. Prices below are VAT-inclusive where the retailer identifies that basis. Shipping is advertised, not a new postcode quote. Failed pages are not evidence of zero stock.

- [AWD-IT boxed 5600](https://www.awd-it.co.uk/amd-ryzen-5-5600-cpu-six-core-3-5ghz-processor-socket-am4-retail.html): £124.99 incl VAT, in stock, free delivery advertised; exact MPN and cooler stated. This is a usable CPU lead after [Scan](https://www.scan.co.uk/products/amd-ryzen-5-5600-am4-zen-3-6-core-12-thread-35ghz-44ghz-turbo-35mb-cache-pcie-40-65w-cpu) marked its offer end-of-life. No claim of global CPU unavailability.
- [MSI direct B550M PRO-VDH WIFI](https://uk-store.msi.com/collections/mb-amd/products/b550m-pro-vdh-wifi): £99.99 VAT included, sold out. Scan's linked page returned 404. No qualified available motherboard offer established.
- [Corsair exact LPX E kit](https://www.corsair.com/uk/en/p/memory/cmk16gx4m2e3200c16/vengeancea-lpx-16gb-2-x-8gb-ddr4-dram-3200mhz-c16-memory-kit-black-cmk16gx4m2e3200c16): in-stock text, no retrievable price. Similar B kit at Scan is end-of-life. Do not substitute kit suffixes silently.
- [Scan Reaper 9060 XT 16GB](https://www.scan.co.uk/products/powercolor-radeon-rx-9060-xt-reaper-16gb-gddr6-graphics-card-rdna4-2048-streams-3230mhz-boost): £649.99, in stock, free delivery advertised. Exact identity/GTIN 4713436175964, one 8-pin PCIe, 500W minimum and 200×100×39mm documented by retailer. At this price it materially undermines Starter value; no qualified cheaper offer was established in this bounded review. Currys retrieval failed; no stock inference.
- [Scan RM650e CP-9020302-UK](https://www.scan.co.uk/products/650w-corsair-rme-series-rm650e-fully-modular-cybenetics-gold-pcie-51-single-rail-542a-120mm-fan-atx): £79.99, preorder due 30 October, £5.48 advertised shipping. Not in-stock buying evidence.
- [Scan AIR 903 MAX](https://www.scan.co.uk/products/36montech-air-903-max-black-mid-tower-chassis-w-tempered-glass-3x-140mm-argb-fans-usb-c-e-atx-atx-se): call for price, no qualified offer. Listing naming includes 2026; original-versus-refresh identity needs resolution. Do not use dimensions from one revision to approve another.
- [Scan 9800X3D](https://www.scan.co.uk/products/amd-ryzen-7-9800x3d-am5-zen-5-8-core-16-threads-47ghz-52ghz-turbo-104mb-cache-pcie-50-120w-cpu-retai): £399.98, in stock, £5.48 advertised shipping, 23 October delivery advertising. Exact CPU model established, not exact shipped-board BIOS.
- [John Lewis NM790 2TB](https://www.johnlewis.com/lexar-nm790-pcie-4-0-nvme-solid-state-drive-2tb-black/p115507488): £399, add-to-basket and free standard delivery advertised; full MPN not established. Not admitted as an exact offer. [Scan SN7100 2TB](https://www.scan.co.uk/products/2tb-wd-black-sn7100-m2-2280-pcie-40-x4-nvme-ssd-7250mb-s-read-6900mb-s-write-1000k-1400k-iops) is end-of-life at that seller. Retain the canonical exact SN5100 2TB as design proposal, requiring a fresh offer rather than inventing its price.
- Performance shared components and NV3 carry forward Phase 5D/5C research as dated evidence, not freshly verified prices. No full totals for Starter/High-End are calculable from qualified current evidence.

Compatibility: AM4/DDR4 Starter, AM5/DDR5 other designs; exact BIOS support is required. Retain C's verified three-lead plan and all nine historical snapshots. Proposed Reaper 9070 XT uses two separate supplied RM850x PCIe leads. Phase 5D's MSI 9600X minimum BIOS 7E81v1A0 remains documented. Freezer 36/H6 has only 4mm nominal clearance. Peerless Assassin is 155mm versus H6 163mm, but fan lift over RAM still needs checking. No generic radiator support claim validates the old Arctic 360 combination. Manuals, exact PSU leads, standoffs, fans and connector labels remain authoritative.

## Editorial and placeholder resolution
Removed all visible EARLY ACCESS badges and the bracketed email placeholder. Contact now explains available help without inventing an address. Removed stale Starter/High-End headline budgets and unsupported component targets. Humanised homepage/About, reduced High-End performance/value exaggeration and removed the unsupported Nvidia-price comparison. Added concise maintenance/upgrading guidance, acknowledging that prebuilts can also be upgraded.

Replaced empty Starter/High-End guide pages with safety/compatibility notes and working routes to a ten-step shared checklist, first-boot troubleshooting, official Windows media guidance and care. No diagrams or new public files added. Historical Performance notes retain their exact-assembly-not-released disclaimer: this is deliberately truthful, not a forgotten placeholder. Under-review/HOLD text also remains deliberately because the hardware work is incomplete.

Official Windows source: https://www.microsoft.com/en-gb/software-download/windows11 (retrieved successfully). Guide explains licence separation, blank USB requirement, data-erasure risk, exact-board boot instructions and official drivers. Linux remains optional/deferred. No alerts, accounts, configurator, new tracking or affiliate changes.

## Affiliate and commercial safeguards
Existing exact-product Amazon resolver and disclosures are unchanged. Starter/High-End have no newly invented affiliate destinations. No Amazon search links, Awin IDs, PCNova offers or commission assumptions were added. PR #18 remains the proposed delivered-cost evidence gate; no buying thresholds or approval states changed. All nine canonical configurations and engine bytes are unchanged.

## Validation and remaining decisions
Node and deterministic-generation results are recorded with the draft PR. Public allowlist remains 24 files. Reviewed public changes: brand badge removal across HTML, homepage/About/contact/privacy/FAQ copy, obsolete Starter/High-End price anchors, guide content, guide routes and three CSS rules. Engine, generated data, affiliate implementation and history are unchanged. New independently verified package fingerprint: `8f4d98ada692b95a8175f7ccb30ce8f325f28454ed4a0293f029624e9d9e219e`.

Local Chromium installation returned truncated downloads, so local mobile/keyboard/no-JS browser checks could not run. The unchanged CI browser suite covers all three journeys, 320/390px, keyboard, JS/no-JS, nine configurations, links, affiliates and package exclusions; a CI pass must be observed before release, not presumed.

Owner decisions: approve the proposed three-build design directions (especially High-End air cooling/X3D), choose a public contact channel, and review the dependent draft. Fresh complete baskets, exact BIOS/clearance checks and matching approved guides are technical work still required; they cannot be cured by approval alone. Merge/deploy and purchasing activation remain separate owner decisions. No hosting or publishing controls changed.

November remains a possible target, not a certified launch date. Complete the P0 hardware gates and browser acceptance before marketing all three as ready. Do not repeat a broad audit; focus the next work on the missing Starter basket, High-End exact tuple and Performance proposal integration.
