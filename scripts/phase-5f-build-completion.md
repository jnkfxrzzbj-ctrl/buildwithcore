# Phase 5F — three-build implementation, 22 October 2026

**NO-GO for an unconditional three-build November launch today.** The website implementation is reviewable; purchasing and a small number of hardware acceptance checks remain open. All three public journeys deliberately show HOLD. No merge, deployment, hosting change, purchase or buying activation was performed.

## Branch and dependency handling
Based on PR #19, which depends on PR #15. The draft incorporates the approved contact text and browser wait fix from current main `35e9b2d2e20609c0c11e4cdf3d23d68125b12bc9`, plus its release-candidate workflow input. It does not modify PRs #15–19. Review/merge order remains #15 → #19 → this draft, with main reconciled before merging. PRs #16–18 remain evidence/policy proposals, not assumed approvals. Phase 5D Option B is integrated as a new pending revision; its purchasing evidence gate is not represented as activated.

## Recommended exact specifications
These are technical proposals for owner review, not individually approved purchases. The complete recommended lists also live in `core-data.json` → `launchBuilds`; older proposal JSON remains historical.

| Slot | Starter | Performance | High-End |
|---|---|---|---|
| cpu | AMD Ryzen 5 5600 boxed — `100-100000927BOX` | AMD Ryzen 5 9600X — `100-100001405WOF` | AMD Ryzen 7 9800X3D — `100-100001084WOF` |
| gpu | Palit GeForce RTX 5060 Dual 8GB (non-OC) — `NE75060019P1-GB2063D` | PowerColor Reaper Radeon RX 9070 XT 16GB — `RX9070XT 16G-A` | PowerColor Reaper RX 9070 XT 16GB — `RX9070XT 16G-A` |
| motherboard | MSI B550M PRO-VDH WIFI — `B550M PRO-VDH WIFI` | MSI B850M GAMING PLUS WIFI6E — `B850M GAMING PLUS WIFI6E` | MSI B850M GAMING PLUS WIFI6E — `B850M GAMING PLUS WIFI6E` |
| ram | Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200 CL16 — `CMK16GX4M2E3200C16` | KLEVV FIT V black 32GB (2×16GB) DDR5-6000 CL28 — `KD5AGU880-60B280L` | Klevv FIT V 32GB (2×16GB) DDR5-6000 CL28 — `KD5AGU880-60B280L` |
| ssd | Kingston NV3 1TB M.2 2280 — `SNV3S/1000G` | WD Black SN7100 1TB — `WDS100T4X0E-00CJA0` | WD Blue SN5100 2TB — `WDS200T5B0E-00CPE0` |
| psu | Corsair CX650 (2023), UK — `CP-9020278-UK` | Corsair RM850x (2024) ATX 3.1 — UK — `CP-9020270-UK` | Corsair RM850x (2024), UK — `CP-9020270-UK` |
| cooler | AMD Wraith Stealth bundled with boxed CPU — `Included with 100-100000927BOX` | Arctic Freezer 36 — standard silver fins / black fans — `ACFRE00121A` | Thermalright Peerless Assassin 120 SE non-RGB — `PA120 SE 1700` |
| case | NZXT H6 Flow black (2023) — `CC-H61FB-01` | NZXT H6 Flow black — original non-RGB — `CC-H61FB-01` | NZXT H6 Flow black (2023) — `CC-H61FB-01` |

Starter changes: reject the £649.99 RX 9060 XT offer; select the exact £409.99 Palit RTX 5060 Dual as a lower-cost, 1080p-focused alternative. This is an 8GB compromise, not an equivalent 16GB card. Replace preorder RM650e with CX650 2023 and the unresolved AIR 903 case with the original H6 Flow. The case is roomy rather than the cheapest; three included fans and one verified revision simplify first assembly. At the observed RAM price, Starter still needs a complete value check before a positive recommendation.

Performance: retain Phase 5D Option B, including the unambiguous two-separate-lead RM850x cable plan, standard Freezer 36 and 1TB SN7100. The £399.95 memory observation materially weakens value; no qualified cheaper exact alternative was established in the bounded review. This is a reason for HOLD, not a claim that CL28 merits the premium.

High-End: 9800X3D and 2TB differentiate it from Performance for CPU-limited gaming and library size. Same GPU: no promised improvement in GPU-limited 4K games. Original non-RGB Peerless Assassin is the technical recommendation, but its current preorder status prevents a complete purchasing basket. No silent substitution to V3, Extreme or RGB models.

## Purchasing evidence
All prices below are dated observations, not live offers. Delivery advertising is not a postcode quote. Unknown delivery is never zero. No new offer timestamps, stock approvals, retail approvals or affiliate destinations were invented. Full source URLs and per-row limitations: `phase-5f-purchasing-evidence.json`.

### Starter

| Part | Retailer | Observed item price | Stock evidence | Delivery / limitation |
|---|---|---|---|---|
| cpu | [AWD-IT](https://www.awd-it.co.uk/amd-ryzen-5-5600-cpu-six-core-3-5ghz-processor-socket-am4-retail.html) | £124.99 | in_stock | Free delivery advertised; no destination quote. 22 October page observation |
| gpu | [Scan](https://www.scan.co.uk/products/palit-nvidia-geforce-rtx-5060-dual-8gb-gddr7-ray-tracing-graphics-card-dlss-4-3840-cores-2497-mhz-bo) | £409.99 | in_stock | £5.48 advertised; 23 October delivery displayed. 22 October page observation |
| motherboard | [PCUpgrade](https://www.pcupgrade.co.uk/components/motherboards/msi-b550m-pro-vdh-wifi-amd-socket-am4-motherboard/) | £107.94 | in_stock | Delivery charge and dispatch unverified. 22 October page observation; new condition, exact model |
| ram | [Scan](https://www.scan.co.uk/products/16gb-2x8gb-corsair-ddr4-vengeance-lpx-black-pc4-25600-3200-non-ecc-unbuffered-cas-16-20-20-38-xmp-20) | £154.99 | unconfirmed | Unverified. Retrieved 22 October but cached delivery date 17 October: not current evidence |
| ssd | [Scan](https://www.scan.co.uk/products/1tb-kingston-nv3-ssd-m2-2280-pcie-40-x4-nvme-ssd-3d-nand-6000mb-s-read-4000mb-s-write-oem) | £129.98 | in_stock | Free delivery advertised; 23 October displayed. 22 October page observation |
| psu | [Corsair](https://www.corsair.com/uk/en/p/psu/cp-9020278-uk/cx-series-cx650-650-watt-80-plus-bronze-atx-power-supply-uk-cp-9020278-uk) | £54.99 | in_stock | 27–28 October estimated; shipping charge unverified. 22 October canonical page; conflicting cached £44.99 ignored |
| cooler | [Included with boxed CPU](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600.html) | Included | bundled | Included in CPU line. No separate purchase; boxed CPU only |
| case | [Scan](https://www.scan.co.uk/products/nzxt-h6-flow-black-compact-dual-chamber-chassis-w-tempered-glass-3x-120mm-fans-e-atx-atx-matx-mitx) | £84.98 | in_stock | £5.48 advertised; 23 October displayed. 22 October page observation |

Verified delivered total: **unknown**.

### Performance

| Part | Retailer | Observed item price | Stock evidence | Delivery / limitation |
|---|---|---|---|---|
| cpu | [Scan](https://www.scan.co.uk/products/amd-ryzen-5-9600x-am5-zen-5-6-core-12-thread-39ghz-54ghz-turbo-32mb-cache-pcie-50-65w-cpu-retail-box) | £189.98 | in_stock | Basket quote incomplete. Phase 5D, 21 October; not refreshed into buying engine |
| gpu | [Overclockers UK](https://www.overclockers.co.uk/powercolor-radeon-rx-9070-xt-reaper-16gb-gddr6-pci-express-graphics-card/GRA-PWC-04017.html) | £799.99 | in_stock | Basket delivery not verified. Phase 5D, 21 October |
| motherboard | [Overclockers UK](https://www.overclockers.co.uk/msi-b850m-gaming-plus-wifi6e-amd-am5-b850-ddr5-micro-atx-motherboard/MOT-MSI-05943.html) | £129.95 | in_stock | Basket delivery not verified. Phase 5D, 21 October |
| ram | [Overclockers UK](https://www.overclockers.co.uk/klevv-fit-v-expo-32gb-2x16gb-6000mhz-c28-ddr5-dual-channel-kit-black/MEM-KLV-07037.html) | £399.95 | in_stock | Basket delivery not verified. Phase 5D, 21 October; material value concern |
| ssd | [Scan](https://www.scan.co.uk/products/1tb-wd-black-sn7100-m2-2280-pcie-40-x4-nvme-ssd-7250mb-s-read-6900mb-s-write-1000k-1400k-iops) | £159.98 | in_stock | Basket quote incomplete. Phase 5D, 21 October |
| psu | [Corsair](https://www.corsair.com/uk/en/p/psu/CP-9020270-UK/rmx-series-rm850x-fully-modular-power-supply-uk-cp-9020270-uk) | £139.99 | in_stock | Free shipping advertised; no combined checkout quote. Phase 5D, 21 October |
| cooler | [Scan](https://www.scan.co.uk/products/arctic-freezer-36-cpu-air-cooler-2x120mm-p12-fans-aluminium-fins-copper-heatpipes-lga1700-1851-am4-5) | £19.99 | in_stock | Basket quote incomplete. Phase 5D, 21 October |
| case | [Scan](https://www.scan.co.uk/products/nzxt-h6-flow-black-compact-dual-chamber-chassis-w-tempered-glass-3x-120mm-fans-e-atx-atx-matx-mitx) | £84.98 | in_stock | £5.48 advertised; 23 October displayed. 22 October page observation |

Verified delivered total: **unknown**.

### High-End

| Part | Retailer | Observed item price | Stock evidence | Delivery / limitation |
|---|---|---|---|---|
| cpu | [Scan](https://www.scan.co.uk/products/amd-ryzen-7-9800x3d-am5-zen-5-8-core-16-threads-47ghz-52ghz-turbo-104mb-cache-pcie-50-120w-cpu-retai) | £399.98 | in_stock | £5.48 advertised; 23 October displayed. Phase 5E 22 October observation; category/search offers differ, confirm exact product checkout |
| gpu | [Overclockers UK](https://www.overclockers.co.uk/powercolor-radeon-rx-9070-xt-reaper-16gb-gddr6-pci-express-graphics-card/GRA-PWC-04017.html) | £799.99 | in_stock | Basket delivery not verified. Phase 5D, 21 October |
| motherboard | [Overclockers UK](https://www.overclockers.co.uk/msi-b850m-gaming-plus-wifi6e-amd-am5-b850-ddr5-micro-atx-motherboard/MOT-MSI-05943.html) | £129.95 | in_stock | Basket delivery not verified. Phase 5D, 21 October |
| ram | [Overclockers UK](https://www.overclockers.co.uk/klevv-fit-v-expo-32gb-2x16gb-6000mhz-c28-ddr5-dual-channel-kit-black/MEM-KLV-07037.html) | £399.95 | in_stock | Basket delivery not verified. Phase 5D, 21 October; material value concern |
| ssd | [Overclockers UK](https://www.overclockers.co.uk/wd-blue-sn5100-2tb-ssd-nvme-m.2-2280-pcie-4.0-solid-state-drive/STO-WDC-06214.html) | Unverified | unconfirmed | Unverified. 22 October: exact page available, current price/stock not retrievable; aggregator £249.95 excluded |
| psu | [Corsair](https://www.corsair.com/uk/en/p/psu/CP-9020270-UK/rmx-series-rm850x-fully-modular-power-supply-uk-cp-9020270-uk) | £139.99 | in_stock | Free shipping advertised; no combined checkout quote. Phase 5D, 21 October |
| cooler | [Overclockers UK](https://www.overclockers.co.uk/thermalright-peerless-assassin-120-se-cpu-cooler-120mm/COO-TLR-02665.html) | £29.99 | preorder | No qualified dispatch date. 22 October: preorder; AWD-IT original cooler also out of stock. Not a buying offer |
| case | [Scan](https://www.scan.co.uk/products/nzxt-h6-flow-black-compact-dual-chamber-chassis-w-tempered-glass-3x-120mm-fans-e-atx-atx-matx-mitx) | £84.98 | in_stock | £5.48 advertised; 23 October displayed. 22 October page observation |

Verified delivered total: **unknown**.

## Technical review and guide implementation
- Starter CPU support: MSI live compatibility table lists 5600 B0 / 7C95v2A. Performance 9600X and High-End 9800X3D list 7E81v1A0 on the exact B850M WIFI6E support page. These are minimum support versions, not statements about shipped stock. Guides require checking the supplied BIOS and following the exact board Flash BIOS procedure if necessary.
- Starter: AM4/DDR4; bundled Wraith Stealth, retained backplate and pre-applied paste; no CPU integrated graphics. RAM A2/B2, SSD M2_1, GPU PCI_E1. Palit dimensions 262.1×126.3×40.1mm, one 8-pin connector, 550W recommended supply; CX650 supplies 650W. PCIe 4.0 platform limits the PCIe 5.0 card to Gen4 operation.
- Performance/High-End: AM5/DDR5; RAM A2/B2, SSD M2_1, GPU **PCI_E2**, not the short PCI_E1. Reaper 289mm body / 304mm including bracket versus H6 365mm allowance. Two separate RM850x PCIe 6+2 leads; CPU/EPS cables remain distinct. RM850x 160mm versus 200mm PSU allowance. Original H6 has three intake fans; header ratings/control, front USB/audio and standoffs are called out.
- Freezer 36 is 159mm versus case 163mm: 4mm nominal margin. Peerless Assassin is 155mm, RAM 33.21mm: front-fan position must keep assembled height within 163mm. Physical fan/RAM clearance, panel closure and loaded temperatures have not been demonstrated. Stock settings, first-boot temperatures and stability checks precede EXPO. Exact EXPO QVL membership is not claimed.
- All three guides link preparation → assembly → first boot → official Windows installation → care. No invented diagrams, advanced interactive guide or liquid-cooling instructions remain in the new High-End route. Historical snapshots retain their original hardware.

Primary support references:
- https://www.msi.com/Motherboard/B550M-PRO-VDH-WIFI/support#cpu (live CPU table read 22 October)
- https://www.msi.com/Motherboard/B850M-GAMING-PLUS-WIFI6E/support#cpu (live CPU table read 22 October)
- https://www.palit.com/palit/vgapro.php?id=5575&lang=en&pn=NE75060019P1-GB2063D&tab=sp
- https://www.powercolor.com/product-detail212.htm (Phase 5D evidence retained; this turn's retrieval timed out)
- https://support.arctic.de/freezer-36
- https://www.thermalright.com/product/peerless-assassin-120-se/
- Exact board manuals, Corsair cables and NZXT original case manual are linked from the component snapshots.

## Implementation and safeguards
New Performance revision `performance-1.3-b`, fixed exact tuple, null price targets/maxima and pending purchasing policy. All nine historical configurations, both old revision objects, all original offers and pricing policy are locked by an independent PR19 SHA-256 regression. C retains HOLD in its saved index and notes. The only engine change is the exact Reaper/RM850x two-lead compatibility mapping; original GOOD BUY/ACCEPTABLE/HOLD semantics remain covered.

Starter/High-End remain static pages within the original architecture. A source-only renderer checks exact eight-slot data, renders their existing part cards and hardware notes, and rejects any accidental purchasing activation. Packaging now rejects stale content for all three builds. No new public file, tracking, affiliate programme or design system. Existing exact-identity affiliate resolver and disclosures are unchanged; unresolved models get no invented affiliate link.

Focused copy updates align homepage, comparison and guides with 1080p Starter, 1TB Performance and 9800X3D/2TB air-cooled High-End. Buying caveats remain visible. Main's approved contact email and tagline are preserved.

## Validation
- 59 Node tests passed locally, including historical-data digest, new tuple/cabling rejection, HOLD under synthetic cheap/fresh offers, no-offer full specifications, static guide identity and package drift checks.
- Deterministic data, Performance HTML and Starter/High-End HTML checks passed; `git diff --check` passed.
- Public package: exact existing 24-file allowlist, no internal reports/JSON/tests; fingerprint `8edab4e85028119f01f5797ccc3102d68ec4ebacf107b5e84db50ab8d23bfc76`.
- Local browser execution blocked by missing Chromium; official Playwright download returned a truncated archive. Browser CI result must be recorded on the draft before claiming mobile/keyboard/no-JS acceptance.

## Remaining launch blockers — bounded list
1. **Purchasing:** obtain fresh exact offers and complete delivered baskets; resolve Starter RAM freshness, High-End SSD price/stock and original cooler availability. Recheck Performance RAM value and agree actual buying bands. Preserve PR #18's delivered-evidence requirements before any later activation.
2. **Hardware acceptance:** physically verify High-End cooler fan/RAM/panel fit and adequate stock-load cooling, plus first-boot BIOS, fan and stability checks for each exact assembly. Do not replace these checks with an approval checkbox or claim tested performance.
3. **Release acceptance:** successful browser CI for source and isolated package, then owner specification/content approval and separate merge/deploy decisions.

The website may be reviewed as a complete informational HOLD journey. It is not yet a certified three-build buying launch. November remains achievable if the specific blockers above close; no unconditional GO is justified today.
