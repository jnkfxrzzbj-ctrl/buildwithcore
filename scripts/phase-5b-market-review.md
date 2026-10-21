# CORE Phase 5B — Performance specification and pricing proposal
Prepared 21 October 2026; retailer research primarily 20 October 2026. **Research proposal, not buying approval.**

## Recommendation
Develop **Option B: Ryzen 5 9600X, PowerColor Reaper RX 9070 XT, 32GB RAM, 1TB SSD**, with Arctic Freezer 36 cooling. This preserves the gaming capability while simplifying cooling and reducing initial storage cost. Retain the existing Wi-Fi motherboard, H6 case and RM850x provisionally. Do not introduce a new platform or expand launch scope to three operational builds.

B's observed item subtotal is **£1,924.83, with delivery incomplete**. This is a design recommendation, not a good-buy verdict. AWD-IT advertises a 9600X/9070 XT/32GB/1TB/Windows prebuilt at £1,849.99. CORE cannot claim a general price advantage at the researched basket cost.

Propose **£1,750 delivered as good-buy; £1,750–£1,850 acceptable; normally discourage above £1,850**. These rounded commercial judgements need owner approval and confirmation of the prebuilt's selected specification. They are not verified available deals. Reaching the acceptable band requires at least £74.83 plus delivery removed from B's observed item subtotal.

The historical £1,550 figure is not supported for this specification. Preserve it only in the historical revision. Do not raise every component ceiling until today's basket passes: a price can be genuine and still poor value.

## Baseline and source decisions
Verified main: `a6bf03b3b94df70758c1c9dd943d1af7358eb108`, unchanged on resuming 21 October. PR #15 remains open at `0f4cf8567cfc8968e96a1406f355bfcd70f10371`; untouched.

Read canonical product/buying data, Amazon destination record, Configuration C implementation and Phase 5 launch-readiness report. The attached Lean Development Strategy and Project Decision Log were read on 21 October. They support manual verification, a small catalogue, Performance first, preserved branding and no major expenditure. The September Product System explains the prior preference for 2TB; 1TB below is an explicit reversal for cost, not an unnoticed downgrade. The current user instruction authorises revisiting historical prices and specifications; it does not authorise live activation.

## Evidence quality
The table records **retailer asking prices including VAT**, not checkout-certified offers. All rows were retrieved on **20 October 2026**. Precise original verification times were not recorded, and full seller/delivery/dispatch checks were incomplete; `verifiedAt` is therefore **null**, not a fabricated timestamp. Reopening the Reaper and Atlas pages on 21 October returned the same headline prices, but did not refresh the whole basket.

Stock and delivery dates are retailer statements, not guarantees. Search tools can return cached material. Buyer postcode, final basket delivery, offer seller and dispatch must be checked in one purchasing session before a positive recommendation. Failed page access means unknown, not zero stock. The internal JSON deliberately cannot qualify as production offers.

## Assessment of Configuration C's exact eight parts
| Component | Assessment, alternatives and recommendation |
|---|---|
| AMD Ryzen 5 9600X — 100-100001405WOF | Retain for Performance. £189.98 observed; efficient six-core AM5 CPU at stock settings. The boxed 7600 is £169.99, only £19.99 cheaper. No bundled cooler with 9600X. Check retail-box warranty and shipped BIOS support, rather than accepting a cheaper tray variant. No evidence here justifies paying for X3D at this budget. |
| ASUS Prime RX 9070 XT OC — 90YV0L71-M0NA00 | Good 1440p and useful settings-adjusted 4K performance, but £869.95 at AWD-IT is explicitly out of stock. Reaper at £799.99 avoids £69.96 of brand/OC premium. ASUS confirms 312×130×50mm and **three 8-pin power sockets**, contradicting retailer two-socket copy. Use manufacturer specifications for assembly. |
| MSI B850M GAMING PLUS WIFI6E | £129.95 is reasonable for AM5, Wi-Fi and a beginner-friendly board. Retain rather than paying more for ATX. Amazon identifies 7E81-001R / GTIN 04711377365345, matching OcUK EAN 4711377365345; review before adding identifiers to canonical data. Do not confuse with original B850 GAMING PLUS WIFI, MAX or back-connect variants. Confirm UK warranty and CPU-support/BIOS list. |
| KLEVV FIT V 32GB 6000 CL28 black — KD5AGU880-60B280L | Capacity and low profile suit Performance; £399.95 is a significant cost. Alternatives checked: FIT V CL30 £398.99 and Patriot 32GB CL30 £399.95 offer no meaningful saving. Retain provisionally, but permit individually qualified CL30–36 2×16GB EXPO kits when cheaper. CL28 is not essential. Use A2/B2, first boot at JEDEC then test EXPO. Verify warranty process; a profile is not a stability guarantee. |
| WD Blue SN5100 2TB — WDS200T5B0E-00CPE0 | QLC gaming storage, canonical 900TBW/five-year rating; weaker sustained writes beyond cache. OcUK now says unavailable; Ballicom asks £277.94. B's 1TB SN7100 at £159.98 saves £117.96 but halves capacity. 2TB SN7100 at Scan is unavailable there, not necessarily discontinued worldwide. Lexar NM790 2TB is a credible TLC alternative, but no verified competing price was obtained. |
| Corsair RM850x 2024 UK — CP-9020270-UK | Retain initially: stock-power headroom, 160mm depth, established Type 4 cable plan and ten-year warranty family. Direct price £139.99, estimated arrival 27–28 October. RM850e 2025 CP-9020296-UK is £109.99 at Scan, but supplied PCIe leads must be checked before substitution. Do not confuse it with later ThermalProtect versions. |
| Thermalright Peerless Assassin 120 SE non-RGB — PA120 SE 1700 | Good cooling, nominal 155mm height, but £29.99 listing is preorder. Arctic Freezer 36 ACFRE00121A is £19.99 and listed in stock, AM5-compatible, manufacturer height 159mm/six-year warranty. Simpler single tower; only 4mm nominal clearance in H6, so confirm installed height and fan position. Thermalright V2/V3/ARGB are different products; UK warranty/packaging remains to verify for A. |
| NZXT H6 Flow original black — CC-H61FB-01 | Retain provisionally. Three intake fans, spacious wiring chamber, 365mm GPU/163mm cooler/200mm PSU allowances. Computer Orbit lists £85 warehouse availability. A £49.99 Montech AIR 903 BASE has useful airflow/clearance, but Scan lists preorder due 26 October, so it cannot be counted as an in-stock saving. Confirm case warranty and delivery. |

Physical clearances are paper checks, not a physical build. Preserve exact standoffs, A2/B2 RAM, primary SSD/GPU slots and stock power settings. Never reuse another PSU's modular cables. Reaper connector/manual and seller warranty confirmation remain required: Argos says two-year warranty while Amazon metadata says three.

## UK retailer evidence
Identifiers below define all eight parts of every option. Prices exclude any separately stated delivery. Seller means the retailer website; no marketplace buy-box or final checkout seller has been certified.

| ID | Exact model / manufacturer part number | Retailer evidence URL | VAT-inclusive item | Delivery shown | Stock / dispatch evidence |
|---|---|---|---:|---:|---|
| cpu9600 | AMD Ryzen 5 9600X; `100-100001405WOF` | [Scan](https://www.scan.co.uk/products/amd-ryzen-5-9600x-am5-zen-5-6-core-12-thread-39ghz-54ghz-turbo-32mb-cache-pcie-50-65w-cpu-retail-box) | £189.98 | £5.48 | in_stock; 22 October delivery |
| asus | ASUS Prime RX 9070 XT OC; `90YV0L71-M0NA00` | [AWD-IT](https://www.awd-it.co.uk/asus-prime-radeon-rx-9070-xt-oc-edition-16gb-gddr6-prime-rx9070xt-o16g.html) | £869.95 | Unknown | out_of_stock; No dispatch |
| board | MSI B850M GAMING PLUS WIFI6E; `B850M GAMING PLUS WIFI6E` | [Overclockers UK](https://www.overclockers.co.uk/msi-b850m-gaming-plus-wifi6e-amd-am5-b850-ddr5-micro-atx-motherboard/MOT-MSI-05943.html) | £129.95 | Unknown | in_stock; 22 October premium delivery; fee unverified |
| ram32 | KLEVV FIT V black 32GB (2x16) 6000 CL28; `KD5AGU880-60B280L` | [Overclockers UK](https://www.overclockers.co.uk/klevv-fit-v-expo-32gb-2x16gb-6000mhz-c28-ddr5-dual-channel-kit-black/MEM-KLV-07037.html) | £399.95 | Unknown | in_stock; 22 October premium delivery; fee unverified |
| ssd2 | WD Blue SN5100 2TB; `WDS200T5B0E-00CPE0` | [Ballicom](https://www.ballicom.co.uk/sandisk-wds200t5b0e-00cpe0-wd-blue-sn5100.p1677569.html) | £277.94 | £0.00 | in_stock; 7 listed; free 7-working-day delivery; 3-day £4.98, next-day £7.97 options |
| psu850 | Corsair RM850x 2024 UK; `CP-9020270-UK` | [Corsair](https://www.corsair.com/uk/en/p/psu/CP-9020270-UK/rmx-series-rm850x-fully-modular-power-supply-uk-cp-9020270-uk) | £139.99 | £0.00 | orderable; 27–28 October estimated delivery; dispatch not verified |
| pa | Thermalright Peerless Assassin 120 SE non-RGB; `PA120 SE 1700` | [Overclockers UK](https://www.overclockers.co.uk/thermalright-peerless-assassin-120-se-cpu-cooler-120mm/COO-TLR-02665.html) | £29.99 | Unknown | preorder; No dispatch date; packaging identity needs final check |
| case | NZXT H6 Flow original black non-RGB; `CC-H61FB-01` | [Computer Orbit](https://computerorbit.com/products/nzxt-h6-flow-black-dual-chamber-atx-case) | £85.00 | Unknown | available; Warehouse ready to dispatch per site legend; fee/date unknown |
| reaper | PowerColor Reaper RX 9070 XT 16GB; `RX9070XT 16G-A` | [Overclockers UK](https://www.overclockers.co.uk/powercolor-radeon-rx-9070-xt-reaper-16gb-gddr6-pci-express-graphics-card/GRA-PWC-04017.html) | £799.99 | Unknown | in_stock; 22 October premium delivery; fee unverified |
| ssd1 | WD Black SN7100 1TB; `WDS100T4X0E-00CJA0` | [Scan](https://www.scan.co.uk/products/1tb-wd-black-sn7100-m2-2280-pcie-40-x4-nvme-ssd-7250mb-s-read-6900mb-s-write-1000k-1400k-iops) | £159.98 | £0.00 | in_stock; 22 October delivery |
| arctic | Arctic Freezer 36 standard; `ACFRE00121A` | [Scan](https://www.scan.co.uk/products/arctic-freezer-36-cpu-air-cooler-2x120mm-p12-fans-aluminium-fins-copper-heatpipes-lga1700-1851-am4-5) | £19.99 | £5.48 | in_stock; 22 October delivery |
| cpu7600 | AMD Ryzen 5 7600 boxed; `100-100001015BOX` | [Scan](https://www.scan.co.uk/products/amd-ryzen-5-7600-am5-zen-4-6-core-12-thread-38ghz-51ghz-turbo-32mb-cache-pcie-50-65w-cpu) | £169.99 | £5.48 | in_stock; 21 October promise on 20 October page; now requires refresh |
| gpu9060 | PowerColor Reaper RX 9060 XT 16GB; `RX9060 XT 16G-A` | [Overclockers UK](https://www.overclockers.co.uk/powercolor-radeon-rx-9060-xt-reaper-16gb-gddr6-pci-express-graphics-card/GRA-PWC-05257.html) | £569.99 | Unknown | in_stock; 22 October premium delivery; fee unverified |
| ram16 | Patriot Viper Venom 16GB (2x8) 6000 CL36; `PVV516G600C36K` | [Overclockers UK](https://www.overclockers.co.uk/pc-components/ram-computer-memory/ddr5-ram/6000-mhz-ddr5-ram) | £218.99 | Unknown | in_stock; Category observation; direct product/dispatch not verified |
| psu650 | Corsair RM650e 2025 UK; `CP-9020302-UK` | [Scan](https://www.scan.co.uk/products/650w-corsair-rme-series-rm650e-fully-modular-cybenetics-gold-pcie-51-single-rail-542a-120mm-fan-atx) | £79.99 | £5.48 | in_stock; 22 October delivery |

The Patriot URL is **category evidence only**, not a proposed buying destination. A direct exact product page remains missing. No category/search URL should become a buy button.

Other checks:
- [Sapphire Pulse RX 9070 XT 11348-03-20G](https://www.scan.co.uk/products/sapphire-radeon-rx-9070-xt-pulse-16gb-gddr6-graphics-card-rdna-4-4096-streams-2970-boost): £899.99, in stock/free delivery; worse than Reaper.
- [Scan RTX 5070 category](https://www.scan.co.uk/shop/computer-hardware/gpu-nvidia-gaming/geforce-rtx-5070-graphics-cards): ASUS Dual OC and MSI Ventus 2X OC at £819.98. No general gaming-value case versus the £799.99 16GB Radeon. These are comparison observations, not verified exact affiliate links.
- [Sapphire Pulse 9060 XT 11350-03-20G](https://www.overclockers.co.uk/sapphire-pulse-radeon-rx-9060-xt-gaming-16gb-gddr6-pci-express-graphics-card/GRA-SPR-05179.html): £599.99 out of stock. Reaper is cheaper; Scan's Reaper asks £649.99 versus OcUK £569.99.
- Scan H6 page showed £84.98 but expired 14 October delivery; old search £59.99 excluded. Computer Orbit's £75 snippet became £85 on opening. Crucial CP2K16G60C36U5B Currys page redirected to a category. Novatech GPU returned 403; availability remains unknown.
- Reaper aggregator £656.85 led to unknown-stock Temu, not a verified reputable-seller offer. Argos 9060 XT £459.99 search result could not be confirmed on opening. Neither supports an available saving.

## Three complete options
Research **Option C** below is not the existing **Configuration C**. Each cell refers to the exact manufacturer model, part number and evidence row above.

| Slot | A: retain Configuration C | B: optimised Performance | C: lower-cost position |
|---|---|---|---|
| cpu | cpu9600 | cpu9600 | cpu7600 |
| gpu | asus | reaper | gpu9060 |
| motherboard | board | board | board |
| ram | ram32 | ram32 | ram16 |
| ssd | ssd2 | ssd1 | ssd1 |
| psu | psu850 | psu850 | psu650 |
| cooler | pa | arctic | arctic |
| case | case | case | case |

| Option | Observed item subtotal | Verified delivered cost | Gaming / commercial assessment |
|---|---:|---|---|
| A | £2,122.75 | Incomplete | 9600X/9070 XT/32GB/2TB. Strong 1440p, selective 4K; includes out-of-stock GPU and preorder cooler. Not purchasable as researched. |
| B | £1,924.83 | Incomplete | Same CPU/GPU class, 32GB, 1TB. Best direction; cooler available, lower initial cost, but still above proposed value band. |
| C | £1,433.88 | Incomplete | 7600/9060 XT **16GB GPU**, **16GB system RAM**, 1TB. Good 1080p and settings-adjusted 1440p; weaker RT/4K and multitasking headroom. RAM direct-page evidence missing. |

These are item-price sums, including unavailable listings where stated. They are **not buyable totals**. OS, monitor/peripherals, tools and optional fans are excluded. Do not sum single-item postage blindly: confirm actual retailer baskets and allocate delivery once.

B saves £197.92 versus A: £69.96 GPU, £10 cooling, £117.96 from reducing storage capacity. C saves £490.95 versus B, chiefly by reducing graphics performance and RAM capacity. A 32GB C variant adds £180.96, reaching £1,614.84 before delivery. Do not present the budget build as equivalent to Performance.

B retains the known motherboard/case/PSU but needs new GPU/cooler/SSD guide snapshots. C also needs CPU/RAM/PSU changes. The 650W PSU is proposed for C only; check GPU recommendation and supplied cable. Avoid promises of trouble-free four-DIMM 6000MT/s expansion: later replacing 2×8 with 2×16 may be preferable. The boxed 7600 cooler could save £19.99 after box-content confirmation, but Arctic is retained in the complete proposal for cooling/noise.

### Independent performance evidence
[TechSpot's September 2026 52-game comparison](https://www.techspot.com/review/3168-geforce-rtx-5070-vs-radeon-rx-9070-xt/) measured 9070 XT averages 24% ahead of RTX 5070 at 1440p and 25% at 4K. Particular full-ray-traced games can favour Nvidia; CUDA workflows and DLSS preferences deserve individual consideration. Test CPU/cards differ from CORE: no exact CORE FPS is claimed, and dollar pricing is not used for UK value.

[Budget Ryzen tests](https://www.techspot.com/review/3041-budget-ryzen-5-cpu/) support modest, game-dependent 9600X gains over Zen 4 six-cores, making its £20 premium reasonable for B. [9060 XT 16GB tests](https://www.techspot.com/review/2996-amd-radeon-9060-xt/) support 1080p/1440p positioning with demanding-game compromises. Equal VRAM does not mean equal performance; frame generation is not native FPS.

## DIY versus prebuilts
| Comparable system | Observed price / service | Implication |
|---|---|---|
| [AWD-IT Atlas C10-FD0-0AB-P](https://www.awd-it.co.uk/awd-it-atlas-ryzen-5-rx-9070-xt-16gb-ram-1tb-ssd-windows-11-prebuilt-gaming-pc.html) | £1,849.99; built to order, advertised free mainland delivery, 9600X/9070 XT/32GB 6000/1TB/Windows; three-year warranty advertised | Closest B rival. B's items alone cost £74.84 more, before postage/OS/assembly. Exact motherboard, PSU, GPU model and final selector options need verification before claiming equivalence. CORE offers named components, learning and control, not an evidenced price advantage. |
| [Scan 3XS Edge RX LN157159](https://www.scan.co.uk/products/3xs-edge-rx-amd-ryzen-5-9600x-32gb-ddr5-16gb-amd-rx-9070xt-2tb-m2-ssd-win-11) | £2,499.98; free delivery, built to order 3–5 days; 9600X/9070 XT/32GB/2TB/Windows | A's list is £377.23 less but unavailable and excludes OS/service. B's £575.15 difference also sacrifices 1TB, so not like-for-like. |
| Lower-cost 9060 XT prebuilts | No fully specified equivalent verified | C cannot be advertised as prebuilt-beating. Ares/aggregator headlines leave CPU, VRAM and selected options ambiguous. |

C and its 32GB variant are the competing complete DIY specifications in this review. This is not an exhaustive cheapest-UK-basket claim. Add a genuine Windows licence quote if needed; do not assume a transferable licence or use grey-market key prices.

## Market-led pricing policy proposal
B: **up to £1,750 good-buy; over £1,750 to £1,850 acceptable; above £1,850 normally discourage**. Delivered, VAT included, OS/peripherals clearly separate. The approximate £100 gap below the prebuilt is a commercial allowance for DIY effort and possible OS cost, not a Windows price quote. Confirmation of the prebuilt configuration may change these thresholds.

| B part | Desirable item price | Review above | Basis |
|---|---:|---:|---|
| 9600X | £190 | £200 | £189.98 observed, 7600 only £20 less |
| Qualified 9070 XT | £700 | £750 | Needed £50–100 improvement on £799.99 asking price to compete; **not a verified deal** |
| MSI board | £130 | £140 | £129.95 observed, adequate features |
| 32GB EXPO kit | £350 | £400 | £399.95 observed; lower latency optional; £350 is a desired improvement |
| 1TB SSD | £150 | £160 | £159.98 observed |
| RM850x | £140 | £145 | £139.99 observed; qualified RMe may save £30 |
| Arctic cooler | £20 | £25 | £19.99 observed |
| H6 case | £80 | £90 | £85 observed; cheaper case not presently confirmed in stock |

These are review limits, not automatic production settings. They do not add up to permission to exceed the total. A small individual overage may be manually justified by a better whole basket after policy approval; never silently bypass it. Any alternative requires exact compatibility, identity and guide approval.

For A, an illustrative extra £100 for another 1TB gives £1,850 good / £1,950 acceptable. This capacity premium is a value judgement, not an available drive quote; A still fails on price/availability. C's provisional positioning is £1,300 good / £1,400 acceptable, requiring roughly £450 savings versus B's acceptable maximum to compensate for GPU/RAM compromises. **C's thresholds are lower-confidence and require a matched prebuilt quote; do not activate them.** Its current £1,433.88 plus delivery fails that positioning.

Retain the **24-hour maximum** for active purchase evidence. During campaigns recheck the complete basket before promotion; volatile GPU/RAM and limited offers may need 4–6-hour attention. If maintenance cannot keep up, show dated reference information and HOLD rather than extend freshness. Keep stable compatibility evidence and weekly editorial thresholds separate from price/stock timestamps. Date-only evidence gets no invented time; preserve the conservative existing treatment.

A 48-hour historical display must say “last checked”, not “current total”. Contradictory cache dates invalidate evidence regardless of retrieval time. Review thresholds weekly during November–December, after material launches/supply changes or sustained 5–10% market moves; fortnightly outside campaigns. Approximately 3–5% basket variation is ordinary review tolerance, not proof of a bargain. Gather seven-day history and two reputable sellers for expensive parts before declaring a genuine opportunity. This cross-section does not establish a sale history.

## Amazon and PCNova
Existing C has stored Amazon destinations for CPU B0D6NN6TM7, KLEVV B0FMR83P3F, SN5100 B0FJ8QMW4H and H6 B0C89FCDFP: four of eight, established by earlier identity research, not refreshed offer evidence. B retains CPU/RAM/case coverage (3/8); C retains H6 (1/8). The stored SN7100 ASIN is **2TB**, not B's 1TB.

New identity matches found 20 October; proposals only:
| Exact product | Amazon product destination | Identifier corroboration |
|---|---|---|
| ASUS Prime RX 9070 XT OC | https://www.amazon.co.uk/dp/B0DSG52H7D | Amazon MPN 90YV0L71-M0NA00 / GTIN 04711387829585 matches retailer EAN |
| MSI B850M GAMING PLUS WIFI6E | https://www.amazon.co.uk/dp/B096Y414R3 | 7E81-001R / GTIN 04711377365345 matches OcUK EAN |
| Reaper RX 9070 XT | https://www.amazon.co.uk/dp/B0DSWJJRQX | RX9070XT 16G-A / GTIN 04713436175759 matches OcUK/Argos |

After review the existing resolver can attach `buildwithcore-21`; no public mapping changes here. Product identity is distinct from Amazon seller, stock, price, warranty and tracking eligibility. Reaper metadata includes implausible weight and conflicting warranty, so do not use generic Amazon fields for technical approval. Do not use searches or similar-model ASINs. Keep Amazon out of any new price-history/alert automation until programme permission is established, consistent with the Lean Strategy.

[Public Awin profile 125822](https://ui.awin.com/merchant-profile/125822) identifies PcNova/IT-Supplies, points to **www.it-supplies.co.uk** and states a 30-day attribution period. Authenticated Awin access was not available in this review. Owner-reported acceptance is not a verified account-state read. **The owner-supplied PcNova.co.uk Terms.pdf (last updated 2 April 2026; read 21 October) confirms that the commission base excludes VAT, delivery, card fees and service charges, and lists no excluded product categories. It allows editorial, comparison and social-traffic partner types, with restrictions on brand-related paid search. This is a dated supplied document, not a live account verification. The 1.5% rate, publisher ID, validation/cancellation terms, subsequent term changes and feed permission remain unverified.** The retailer homepage timed out and exact-product searches yielded third-party hints, not reliable direct offers.

[Link Builder](https://help.awin.com/apidocs/generatelink) supports authenticated advertiser destination links; [enhanced feeds](https://help.awin.com/apidocs/retail-publisher-productapidocumentation-1) require an existing feed and granted access. These platform features do not prove PCNova enables them. Confirm current programme terms and obtain a few exact generated links first; verify redirects, identity, seller and delivered cost independently. Current resolver rejects non-Amazon retailers: Awin needs its own reviewed adapter and mismatch tests. No tracking URL or publisher ID has been guessed. PCNova is optional and commission never determines part/retailer choice.

## Implementation and owner decisions
This separate draft adds this report, non-public JSON observations, a pure research-summary helper and five tests. No production data, public files, workflow or approval control changes. The helper requires eight distinct slots and distinguishes an indicative subtotal from verified delivered evidence; even complete evidence returns `purchasingApproval:false`. It does not scrape, store Amazon prices or activate recommendations.

After owner approval:
1. **21–23 October:** choose B and confirm 1TB/cooler/GPU trade-offs; verify exact seller/postcode basket and competing prebuilt, Reaper sockets/warranty, MSI identifiers, PSU box leads and Arctic fit (0.5–1 research day).
2. **23–27 October:** create a new pending revision/immutable guide snapshots, preserving all nine existing configurations (1–2 development days).
3. **By 30 October:** full generation, unit/browser/no-JS/mobile/keyboard QA, exact guide review and public-package fingerprint verification (1–2 QA days; physical build timing separate).
4. Before marketing: owner separately approves exact specification, pricing policy, complete fresh evidence, merge and release. If prices remain poor, provide honest reference guidance/prebuilt comparison rather than a bargain claim.

Affected later files:
- `core-data.json`: decision rationale, exact components, offers, retailer identities, pricing policy, revisions/configurations/guide snapshots. Preserve history; C stays pending.
- `assets/core-engine.js`: total delivered price/review semantics only if approved; tests must ensure component limits alone cannot approve an expensive basket.
- `assets/core-affiliates.js`, `scripts/amazon-destinations-verification.md`, `tests/affiliate-expectations.cjs`, `tests/affiliates.test.cjs`: reviewed exact destination mappings; separate Awin adapter later.
- `assets/core-view.js`, `assets/core-client.js`, `core-performance.html`, `core-performance-guide.html`: capacity, cooler/cabling, exclusions and readiness wording.
- `scripts/build.cjs`, `scripts/render-performance.cjs`: regenerate `assets/core-data.generated.js` and static regions; do not hand-edit generated output.
- `tests/revisions.test.cjs`, `tests/generation.test.cjs`, `tests/public-journey.test.cjs`, `tests/browser-check.cjs`: nine existing configurations, new tuple, C HOLD, freshness/identity/total boundaries and accessible journeys.
- Review homepage/build discovery copy only after approval, coordinating separately with PR #15.
- Public allowlist remains 24 files. Any later public change requires established packaging/verification and a newly reviewed fingerprint. Hosting/DNS/secrets/approval controls are out of scope.

Owner decisions: approve B's hardware direction and £1,750/£1,850 bands; decide whether to qualify the cheaper RMe; keep C as a fallback rather than an extra launch project; confirm the current Awin rate/account access if desired; arrange one lean physical validation build when ready. No expenditure or activation follows automatically.

## Validation
Five local Node tests pass: complete arithmetic without approval, unknown cost, stale/future/date-only evidence, independent offer gates and duplicate/missing slots. Existing repository CI is required on the actual draft commit. Only four new internal files are proposed; public source bytes and the approved package fingerprint are unchanged. Full browser CI, retailer checkout verification and physical validation are distinct checks; none can substitute for the others.

