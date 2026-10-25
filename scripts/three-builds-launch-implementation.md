# Three-build launch implementation — 25 October 2026

Owner-authorised implementation on `launch/three-builds-purchasing`, based on the completed 25 October three-build owner review and main `2b06a79d460d8bafb07ac2729b038002f3e784da`. No new broad audit. Specifications are editorial choices, not permission to purchase.

## Final specifications

- Starter retains Ryzen 5 5600 boxed/Wraith Stealth, Palit RTX 5060 Dual non-OC, MSI B550M PRO-VDH WIFI, Corsair LPX 16GB DDR4-3200 CL16, Kingston NV3 1TB, CX650 UK and original black H6 Flow.
- Performance retains current Option B: Ryzen 5 9600X, PowerColor Reaper RX 9070 XT, MSI B850M GAMING PLUS WIFI6E, KLEVV FIT V 32GB DDR5-6000 CL28, SN7100 1TB, RM850x UK, standard Freezer 36 and H6 Flow. Its saved identity remains unchanged.
- High-End revision `high-end-2026-10-5080` uses Ryzen 7 9800X3D, Inno3D RTX 5080 X3 non-OC `N50803-16D7-176068N`, the same B850M board/KLEVV kit/RM850x/H6, WD Blue SN5100 2TB and Thermalright Phantom Spirit 120 EVO. Full manufacturer model is the cooler identity; regional numeric MPN/EAN is not claimed.

The owner prioritises performance, quality, assembly experience and upgradeability over lowest cost. Starter remains an AM4 entry point with a limited platform upgrade path, not equivalent to AM5. The shared case supports guide consistency and assembly access. Performance remains the balanced AM5 recommendation. High-End adds GPU capability as well as the gaming CPU and storage; neither superior performance in every game nor better value than every prebuilt is claimed.

## Preservation and purchasing separation

`launchBuildHistory` retains the previous High-End object exactly, including its Reaper/Peerless Assassin identities and separate PCIe cable plan. Its original notes remain accessible in the High-End guide's historical disclosure. All ten Performance saved configurations, historical revisions, offers, purchasing policy and affiliate catalogue remain unchanged.

`retailerReferences` is an exact-identity editorial catalogue, not an offer feed. The 25 October review supplies its model/destination associations. It contains no prices, stock, dispatch promises, delivered costs, ASIN additions or commission assumptions. The renderer fails closed for mismatched identities and unsafe links. It labels these links as references and never feeds them into purchasing decisions. The Wraith entry points to the boxed CPU and explicitly says not to buy a separate cooler.

Every launch build retains HOLD, purchasingApproved false and null delivered total. Existing policy/freshness gates, engine and public publication lock are unchanged. No research subtotal has been promoted into a live price. Existing Amazon links and disclosures are preserved; no new affiliate eligibility is asserted.

## Saved-link handling

Normal Performance pages show the current specification. The guide's historical index is hidden on ordinary entry, including the current configuration query. Historical/invalid queries expose recovery, and existing fragments remain supported. Without JavaScript, the explicit recovery link reveals the retained native disclosure index. Unknown IDs never silently resolve to current hardware. Historical records are not deleted or redirected.

## Ongoing review procedure

Review retailer destinations and value weekly, and the component specification monthly or immediately after a discontinuation, compatibility issue or material market change. This is an owner-run maintenance procedure, not an activated scheduler.

1. Check exact MPN/model, variant, seller, condition and destination; do not silently replace with a similarly named item.
2. Review quality, performance, assembly and upgrade trade-offs alongside available comparable prebuilts. A higher price is not automatically disqualifying; policy ceilings still require explicit editorial approval before changing.
3. Record new-condition stock, dispatch and VAT-inclusive component prices plus consolidated postcode-specific delivery quotations. Buying evidence and all shipping quotes must satisfy the existing 24-hour rule. Never refresh timestamps without a new observation.
4. Keep HOLD when any gate fails. A reference link is useful even when an offer is stale or unavailable; it cannot turn HOLD into a buying endorsement.
5. For a component change, retain the old exact configuration and guide snapshot, assign a new revision, review its BIOS/RAM/cooling/power/case implications, and regenerate data/pages. Run the full regression and isolated-package browser checks before proposing publication.
6. Review affiliate identity and account eligibility separately; never let commission determine the build or supply purchasing evidence.

## Validation and remaining blockers

Run `node scripts/build.cjs --check`, both renderers with `--check`, `node --test tests/*.test.cjs`, `node tests/browser-check.cjs`, then `CORE_SITE_ROOT` pointing to the output of `node scripts/package-public.cjs` with the same browser test. Packaging continues to contain exactly 25 public files; no workflow, hosting, production approval setting or public inventory change is required.

The baseline-data regression now reconstructs and hashes the entire prior canonical object, rather than locking the superseded live High-End bytes. Engine/affiliate and independent historical fingerprints remain unchanged. New tests cover reference identity rejection, purchasing independence, High-End history/cabling and normal-versus-saved guide behaviour.

Launch blockers remain fresh complete delivered baskets, approved buying policy, actual shipped BIOS, physical cooler/RAM and GPU-power-cable clearance, stability/thermals and confirmation of the exact EVO package. These builds are not physically validated or ready to buy. Performance should be the first physical guide-validation build. No merge, deployment, DNS/hosting change, purchasing activation or PR #32 change is included.
