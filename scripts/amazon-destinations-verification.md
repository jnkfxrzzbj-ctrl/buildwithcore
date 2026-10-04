# Performance Amazon UK destination verification

Reviewed 2026-10-04 against `main` commit `46f3f8104242c9d6a39a527263d9903fc7c5f2c5`, its actual `CORE_DATA` preferred/approved components, and the Project Lean Development Strategy and Project Decision Log. Amazon UK product-detail pages were read directly, including model/manufacturer-part-number tables and selected variants. This is an editorial identity check, not a price, seller, availability or purchasing check. No Amazon prices or stock were recorded.

The existing owner-verified Ryzen 5 9600X / `100-100001405WOF` / `B0D6NN6TM7` entry is unchanged.

| CORE component | Exact MPN/SKU in CORE | Amazon UK ASIN | Verification evidence | Confidence | Action |
|---|---|---|---|---|---|
| MSI B850 GAMING PLUS WIFI (`msib850`) | No MPN; EAN `4711377285438` | [B0DPKV94MX](https://www.amazon.co.uk/dp/B0DPKV94MX) | Amazon GTIN `04711377285438` equals CORE EAN with a leading GTIN padding zero. Original ATX AM5 B850 GAMING PLUS WIFI, Wi-Fi 7, 5G LAN; Amazon model `7E56-001R`. [MSI specification](https://uk.msi.com/Motherboard/B850-GAMING-PLUS-WIFI/Specification). | VERIFIED | VERIFIED — add |
| Thermalright Peerless Assassin 120 SE (`pa120se`) | `PA120 SE 1700`; EAN `0814256003759` | — | [Candidate B0DFNM8MSS](https://www.amazon.co.uk/dp/B0DFNM8MSS) returned MPN `PA120SE D6-Y 1700` and a detail-table ASIN `B0B4G8QKZP`. Physical specifications alone do not establish the exact SKU/EAN; no authoritative alias found. [Manufacturer](https://www.thermalright.com/product/peerless-assassin-120-se/). | UNRESOLVED | UNRESOLVED — do not add |
| Gigabyte RX 9070 GAMING OC 16G (`gigabyte9070`) | `GV-R9070GAMING OC-16GD` | [B0DS2QZC9P](https://www.amazon.co.uk/dp/B0DS2QZC9P) | Amazon model and manufacturer part number match exactly; Gigabyte RX 9070 GAMING OC, 16GB GDDR6, 288 × 132mm; UPC `889523047552`. [Manufacturer model/specification](https://www.gigabyte.com/Graphics-Card/GV-R9070GAMING-OC-16GD/sp). | VERIFIED | VERIFIED — add |
| Sapphire PULSE RX 9070 16GB (`pulse9070`, alternative) | `11349-03-20G` | [B0DRPSF34T](https://www.amazon.co.uk/dp/B0DRPSF34T) | Amazon model and manufacturer part number match exactly; 16GB GDDR6, dual HDMI/DP; GTIN `04895106295971`. [Sapphire specification](https://www.sapphiretech.com/en/consumer/pulse-radeon-rx-9070-16g-gddr6). | VERIFIED | VERIFIED — add |
| KLEVV FIT V black 32GB (`fitv28`) | `KD5AGU880-60B280L` | [B0FMR83P3F](https://www.amazon.co.uk/dp/B0FMR83P3F) | Amazon title and model match full MPN; black 2×16GB, DDR5-6000 CL28, EXPO, 1.4V, 33.2mm. [KLEVV ordering table](https://www.klevv.com/ken/products_details/memory/Klevv_FITV) maps this MPN to EAN `4895194969037`. | VERIFIED | VERIFIED — add |
| TEAMGROUP Vulcanα black 32GB (`vulcan38`, alternative) | `FLABD532G6000HC38ADC01` | — | No exact Amazon UK listing verified. Similar results with different family, colour or revision identifiers cannot establish this black 2×16GB DDR5-6000 CL38 EXPO kit. [Existing CORE exact-product source](https://www.overclockers.co.uk/teamgroup-vulcan-expo-32gb-2x16gb-ddr5-pc5-48000c38-6000mhz-dual-channel-kit-black-flabd532g6000hc38adc01/MY-0B2-TG.html). | UNRESOLVED | UNRESOLVED — do not add |
| WD Blue SN5100 2TB (`sn5100`) | `WDS200T5B0E-00CPE0` | [B0FJ8QMW4H](https://www.amazon.co.uk/dp/B0FJ8QMW4H) | Amazon base MPN `WDS200T5B0E`, UPC `718037906263`, 2TB bare M.2 2280 PCIe 4.0, 7100/6700 MB/s. [SanDisk 2TB ordering SKU](https://www.sandisk.com/en-gb/products/ssd/internal-ssd/wd-blue-sn5100-nvme-ssd) maps this model to full SKU `WDS200T5B0E-00CPE0`; CORE datasheet confirms 900 TBW. | VERIFIED | VERIFIED — add |
| WD_BLACK SN7100 2TB (`sn7100`, alternative) | `WDS200T4X0E-00CJA0` | [B0DN6ZQ3PD](https://www.amazon.co.uk/dp/B0DN6ZQ3PD) | Amazon base MPN `WDS200T4X0E`, UPC `718037893211`, 2TB bare M.2 2280 TLC, 7250/6900 MB/s, 1200 TBW. [SanDisk exact full-SKU page](https://www.sandisk.com/en-gb/products/ssd/internal-ssd/wd-black-sn7100-nvme-internal-ssd?sku=WDS200T4X0E-00CJA0) matches. | VERIFIED | VERIFIED — add |
| Corsair RM750x 2024 UK (`rm750x`) | `CP-9020285-UK` | [B0D9BZ2BDB](https://www.amazon.co.uk/dp/B0D9BZ2BDB) | Amazon model and manufacturer part number match the UK SKU exactly; ATX 3.1, PCIe 5.1, native 12V-2x6, black; UPC `840006676911`. [Corsair exact SKU](https://www.corsair.com/uk/en/p/psu/cp-9020285-uk/rmx-series-rm750x-fully-modular-power-supply-uk-cp-9020285-uk). | VERIFIED | VERIFIED — add |
| NZXT H6 Flow black non-RGB (`h6flow`) | `CC-H61FB-01` | [B0C89FCDFP](https://www.amazon.co.uk/dp/B0C89FCDFP) | Amazon model, manufacturer part number and box contents all identify `CC-H61FB-01`; black, original H6 Flow, three 120mm fans; UPC `810074844147`. [NZXT manual](https://cdn-g.nzxt.com/dl/1698993634-h6-flow_digital-manual_231027_v2-pdf.pdf). | VERIFIED | VERIFIED — add |

## Variant and metadata checks

- KLEVV `B0FF5CQ4GN` is **not** used: its actual MPN ends `60B280F`, not `60B280L`, despite a similar product title.
- Sapphire's UK listing was verified independently; a different US ASIN was not assumed to work in the UK.
- MSI's catalogue entry is EAN-only because CORE has no MPN. The resolver compares the exact recorded 13-digit EAN, not names or fuzzy model strings. The leading zero was removed from Amazon's 14-digit GTIN during editorial verification, not by a permissive runtime matcher. MAX, PZ, WIFI6E and B850M models are excluded.
- Amazon's SSD tables omit the manufacturer's trailing SKU suffix. The manufacturer maps each exact 2TB base model to the CORE full SKU; capacity, form factor and performance corroborate the mapping. The resolver still requires the **full CORE MPN**, never a prefix match.
- Gigabyte has inconsistent generic Amazon fields (including a GPU-series field). Its title and repeated exact manufacturer part number identify the RX 9070 GAMING OC 16G. Generic Amazon fields do not override the exact manufacturer SKU.
- NZXT has a generic light-colour field mentioning RGB. Repeated exact SKU `CC-H61FB-01`, box contents and manufacturer documentation identify the non-RGB black model; no RGB or white SKU is accepted.
- Cooler physical dimensions/fan similarity are insufficient to resolve its differing seller MPN and ASIN metadata. No destination is added.

## Scope and maintenance

Eight new destinations; nine total including the unchanged CPU. Only selected components render links: the two verified alternatives do not borrow the preferred component's destination, and the unresolved alternative has none. Links are editorial destinations, not evidence that any offer qualifies. No price, stock or freshness data belongs here.

The EAN-only resolver path fixes the existing inability to identify MSI's valid EAN-only CORE record. Records with an MPN require that exact MPN and cannot fall back to EAN. No component, offer, threshold, guide or engine data is changed.

## Associates concerns for owner review

The existing disclosure page contains the Amazon Associate disclosure. The link text identifies Amazon and links retain `sponsored noopener noreferrer`, but those machine-readable attributes are not a visible commercial disclosure. Review whether the existing disclosure placement is sufficiently prominent near affiliate links.

Amazon's published [participation requirements, clause (y)](https://affiliate-program.amazon.co.uk/help/operating/policiesoct1) prohibit price tracking/alerting unless Amazon agrees otherwise. This is a site-level concern for CORE's broader price-monitoring model; separation from Amazon prices alone is not a compliance determination. Confirm the terms applicable to this account and obtain Amazon clarification as needed. This change adds no tracking/alerting functionality or pricing integration and makes no claim of Amazon approval.
