# Configuration C implementation and verification record

Baseline: main `4e668a1d408fe86d0c1969398bb085e812ed2125` (PR #4), checked 13 October 2026.
Scope: authorised Phase 2E PR 2 only. No purchasing activation or deployment.

## Revision and preservation

Schema 2 replaces the single build pointer with `currentPerformanceRevision`
and two explicit `performanceRevisions`. The original build and selection state
are preserved in `performance-1.1-approved`; C is `performance-1.2-c`.
The eight original configuration IDs and original fields remain unchanged.
Each configuration has a hardware snapshot so historical compatibility text is
not rewritten when C needs different notes for a shared component. All original
components, guide variants, offers, dates, retailers and pricing policy are
retained. The original PR 1 SHA-256 fingerprint still passes against the exact
legacy projection; it was not replaced with a fingerprint of the new data.

C permits only `performance-1.2-c-asus9070xt-fitv28-sn5100`, the authorised eight
parts. Its three new component IDs do not repurpose old identities. MSI identity
is the exact manufacturer model `B850M GAMING PLUS WIFI6E`; `mpn` is null because
an exact regional manufacturer SKU was not established. Do not substitute a
similarly named B850/B850M board or invent an EAN/MPN.

`CoreEngine.validate` checks registered, unique complete tuples, snapshots,
revision membership and guide mapping. `configurationValid` also requires an
explicit documented power plan. The small engine table permits only the two
historical GPU/RM750x pairs and the ASUS/RM850x pair, with their reviewed lead
counts. This is intentionally not a general wattage-based compatibility solver.
`derive` requires a matching complete tuple before returning any eligible total.
Malformed data throws and the client publishes UNAVAILABLE; missing selected
mapping returns CONFIGURATION_NOT_APPROVED. No automatic PSU repair occurs.

C policy is pending, all component thresholds and the build target are null,
and the unapproved whole-build maximum is null. A valid C tuple always returns
HOLD / PRICING_POLICY_PENDING, false complete eligibility, and null eligible
purchase/delivered totals, including with fresh cheap synthetic offers. The
browser's independent positive-recommendation suppression remains. Historical
£1,550/component thresholds and delivered-price switching logic are unchanged;
unknown delivery remains unknown without adding a new historic eligibility rule.
No research prices or refreshed evidence dates were imported.

## Documentary hardware checks and unresolved work

Sources checked 13 October 2026:

- [ASUS exact GPU specifications](https://www.asus.com/motherboards-components/graphics-cards/prime/prime-rx9070xt-o16g/techspec/): PRIME-RX9070XT-O16G, three 8-pin power sockets, 312 × 130 × 50 mm. The model is paired only with the specified RM850x. H6 dimensional allowance is documentary, not a cable-bend or support-bracket fit test.
- [MSI exact board specifications](https://www.msi.com/Motherboard/B850M-GAMING-PLUS-WIFI6E/Specification) and [English manual](https://download-2.msi.com/archive/mnu_exe/mb/B850MGAMINGPLUSWIFI6E_English.pdf): micro-ATX board; primary GPU slot is PCI_E2 (not PCI_E1); use M2_1 and A2/B2. Match actual micro-ATX mounting holes and remove unused standoffs. Notes identify CPU_FAN1, SYS_FAN connections, JFP1, JAUD1 and front USB headers; verify actual plugs, fan mode and header loading against the supplied hardware before assembly.
- [Corsair exact UK RM850x](https://www.corsair.com/uk/en/p/psu/cp-9020270-uk/rmx-series-rm850x-fully-modular-power-supply-uk-cp-9020270-uk) and [RMx ATX 3.1 cable guide](https://www.corsair.com/uk/en/explorer/diy-builder/power-supply-units/rmx-atx-31-psus-cable-compatibility/): the 850 W model is supplied with three Type 4 PCIe 6+2-pin leads. Use one separate appropriate supplied lead per GPU socket; EPS and the native 16-pin cable are not substitutes. Confirm the exact UK box contents and never mix modular PSU cables.

Shared components retain their original manufacturer sources in the data.
Outstanding: exact shipped/minimum 9600X BIOS and CPU-support confirmation;
exact KLEVV QVL coverage/EXPO stability and memory training; cooler/fan height,
RAM clearance, standoffs, PSU cable routing, GPU support and side-panel clearance;
supplied paste, mounting hardware, fan splitter/header loading and accessories.
No measurements, photographs, successful first boot, stress tests or physical
validation by CORE are claimed. Full step-by-step instructions remain unreleased.

## Affiliate decision

No mappings were added, removed or changed in `core-affiliates.js`.
The four existing exact C destinations retained are CPU B0D6NN6TM7,
RAM B0FMR83P3F, SSD B0FJ8QMW4H and case B0C89FCDFP. The cooler already has no
approved destination. All historical mappings remain available for old tuples.

Amazon UK searches using exact model/MPN combinations did not establish a
confident exact destination for the following products. Search results or
similar names are insufficient evidence, so all three buttons are omitted:

| Component ID | Required identity | Decision |
| --- | --- | --- |
| asus9070xtprimeoc | 90YV0L71-M0NA00 / PRIME-RX9070XT-O16G | No verified ASIN; omit |
| msib850mwifi6e | B850M GAMING PLUS WIFI6E | No verified exact variant/ASIN; omit |
| rm850x2024uk | CP-9020270-UK | No verified UK 2024 variant/ASIN; omit |

Future approval requires opening the actual Amazon UK product/selected variant,
matching manufacturer identity and regional version, and recording that evidence.
Affiliate destinations never supply price, stock, seller, freshness or eligibility.

## Public journey and no-JavaScript behaviour

Homepage, comparison, Performance, guide/index, FAQ, About and disclosure now
state C's researched status and pending purchasing policy. Starter/High-End
specifications and guides are unchanged; their historical status remains clear.
Only links marked `data-core-current-guide-link` follow the active specification.
Saved query links resolve their own snapshots, independently of current offers.
Unknown links do not redirect to C. A generated static index contains all nine
complete hardware-note sections; without JavaScript readers find the ID in their
saved URL and expand that section. Query auto-selection requires JavaScript.

Generation commands remain in README. `render-performance.cjs --check` validates
both static parts/status and the saved index. Tests cover baseline fingerprint,
exact identities, pending policy, incompatible/missing/duplicate mappings,
historical switching, freshness, stock and affiliate separation. Browser checks
cover desktop, 390/320 px phones, no-JS, every HTML page, all nine saved links,
synthetic fresh offers, missing offers and invalid power plans.

## Deployment and owner gates

The checks workflow is unchanged and does not deploy. GitHub's main-branch API
reports protection disabled and no required status checks; repository rulesets
returned an empty list. Check outcomes must therefore be reviewed manually before
merge. No settings were changed.

The connector rejects the Pages-settings endpoint, so actual configured Pages
source/folder cannot be certified from repository workflow files alone. Previous
main has a Pages deployment, but that does not establish the current settings.
Before merging, the owner must confirm Settings → Pages source/branch/folder and
understand whether merging into main will automatically publish this revision.
No merge, workflow dispatch or deliberate deployment is included in this PR.

Owner approval remains required for merge/deployment, independently calibrated
component and whole-build prices, policy activation, any additional tuple,
new exact affiliate mappings, and release of a physically validated assembly
guide. £1,650 and £1,800 remain research proposals, not operational thresholds.
This implements Phase 2D's single focused PR 2; the only verification limitation
is inaccessible Pages settings/local browser availability, to be reported with
CI results. No existing research report or Library file was modified or deleted.
