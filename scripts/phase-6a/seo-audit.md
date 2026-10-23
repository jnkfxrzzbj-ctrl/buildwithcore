# SEO audit

Evidence date: 23 October 2026. Source baseline: main `35e9b2d`. Live GET sample and source inventory are distinct. Search visibility and field performance remain unknown without Search Console/real-user data.

## Verified baseline

All 14 normal HTML pages have a title, description, canonical and one H1; all 15 pages including 404 have a main landmark and one H1. There is no JSON-LD. Metadata and internal navigation already exist; wholesale SEO rebuilding is unnecessary. The 404 page deliberately has no canonical/description and carries `noindex`.

Live root and `/index.html` both return 200 with identical bytes. The root canonical is `https://buildwithcore.co.uk/`. `/core-performance` and `/core-performance.html` both return 200 with identical bytes and the `.html` canonical. Follow-up GET checks captured a 301 from HTTP to HTTPS apex and a 301 from HTTPS www to HTTPS apex. Do not rewrite all URLs for cosmetic reasons.

All 15 packaged HTML routes were subsequently fetched and matched current-main bytes, including the directly requested `/404.html` (200 with its source `noindex`). A saved Performance configuration guide URL also returns 200 and preserves its query. No sampled `X-Robots-Tag` blocks production. `/robots.txt` and `/sitemap.xml` return genuine 404s, as does a deliberately missing route. `/scripts/README.md` and `/core-data.json` also return 404, so older repository-root exposure concerns are not reproduced for these sampled paths. This does not establish exclusion of every internal file. Reproducible URLs, status, redirect chains and body hashes are in [HTTP evidence](http-evidence.json).

The static Performance fallback retains HOLD and exact saved configuration notes. Links are conventional HTML anchors, supporting discovery without JavaScript. Starter/High-End guides on main are status pages, not completed guides. Their duplicated headings and similar short text provide limited distinct search value. Phase 5F changes this content; reassess its final approved version before applying `noindex` or rewriting it.

## Priorities and acceptance criteria

| Priority | Finding / consequence | Recommendation | Acceptance |
|---|---|---|---|
| P0 before buying campaign | Phase 5F remains draft, buying/physical gates open; main has under-review pages | Close gates or label campaign educational; no ready-to-buy or exact tested-build promises | Owner accepts public claims against approved release |
| P1 before broader promotion | robots/sitemap absent; absence of robots does **not** block crawling | Add permissive robots with canonical sitemap URL; XML lists only useful canonical 200 pages, no queries/fragments/404/internal reports | GET correct types/status; parse XML; URLs canonical/indexable; release package includes files |
| P1 | GSC verification/indexing status unknown | Inspect existing property first; add property only if needed. URL-prefix HTML verification can avoid DNS, but needs approved file/meta release | Verified ownership; inspect Home/Builds/Performance; submit sitemap; inspect exclusions, selected canonical and mobile rendered content |
| P1 | Build titles omit UK/use case; H1s are slogans | Preserve hero design; add descriptive visible context and improve titles/descriptions after 5F | Unique relevant metadata with no unsupported prices/claims; mobile review |
| P1 | Thin guide status pages on main | Complete useful exact-hardware content through 5F; until then keep clear status and don't target assembly-guide searches | Beginner can follow promised scope; no empty steps or misleading guide CTA |
| P1 before analytics | Current privacy says no analytics/signup | Approve new notice and implementation together | Observed network behaviour agrees with notice |
| P2 | Canonical aliases return 200 | Retain coherent canonical signals; consider permanent alias redirects only in hosting review | Query/fragment journeys preserved, no loops, canonical destination 200 |
| P2 | No structured data | Add truthful Organization/WebSite and BreadcrumbList; Article only to authored guides | Matches visible content and identity; validated syntax; no invented rating/Offer/stock |
| P2 | Inline CSS repeated across pages; guide HTML is largest (~44.7KB) | Measure first; defer CSS extraction until it has a measurable benefit | LCP/INP/CLS and transferred bytes measured before/after |

The sitemap needs coordinated changes to `scripts/public-files.json`, package path guards, independent inventories/tests and fixed file-count release checks. Those are intentionally deferred to avoid Phase 5F overlap. A sitemap is a discovery aid, not a guarantee of indexing [S1]. Do not use robots blocking to remove thin pages from the index; crawlers must see a `noindex` if one is later chosen.

## Proposed metadata, for approval after hardware integration

| Page | Proposed title | Proposed description |
|---|---|---|
| Home | Gaming PC Builds UK for Beginners \| CORE | Choose a curated UK gaming PC build, understand the buying checks and learn what to prepare before assembly. See each build's current readiness. |
| Builds | Compare UK Gaming PC Builds: 1080p & 1440p \| CORE | Compare Starter, Performance and High-End by intended use, trade-offs and build readiness. Check the exact parts and buying status before purchasing. |
| Performance | 1440p Gaming PC Build UK: Performance \| CORE | Explore CORE Performance's exact parts, compatibility notes and buying safeguards. Check the current status and matching guide before buying. |
| Starter | Beginner 1080p Gaming PC Build UK \| CORE | Explore a value-focused 1080p build with clear trade-offs, exact components and current readiness. Check the buying status before ordering. |

Titles need not fit a rigid character count; check relevance and truncation in actual results. Do not insert a £1,000 or £1,500 claim until a fresh complete delivered basket supports it. Keep a stable route and update substantive content rather than generating one thin page per month or price band. The brand decision is locked; descriptive titles compensate for the broad word CORE without reopening naming.

## Search opportunity assessment

Sample searches on 23 October included `gaming pc build UK 1000 1440p beginner build guide`, beginner UK buying guides and budget builds. Returned examples included AWD-IT, AS Computers, H&C, PC Games Guide and Pixalrig [S2]. This is a qualitative search sample, not a UK-personalised ranking study or keyword-volume dataset. No volumes, positions, keyword-difficulty scores or market shares are asserted.

Broad “best gaming PC under £1000 UK” mixes prebuilts and DIY. Retailers have conversion-focused content and established catalogues; CORE should explicitly identify itself as self-build guidance. Some sampled pages use generic parts, targets, incomplete exclusions or predicted frame rates. Their presence does not validate their hardware claims. CORE's opportunity is exact identity, visible uncertainty, delivered cost and matching instructions, not claiming a feature monopoly over PCPartPicker or other services.

| Priority | Search intent / illustrative queries | Landing destination | Original value and release gate |
|---|---|---|---|
| 1 | “should I buy PC parts on Black Friday UK”, “buy PC parts together or separately” | New evergreen buying-check article, linked from FAQ and builds | Explain all-in delivered cost, incomplete baskets and testing/return windows; no instant alerts |
| 1 | “1440p gaming PC build UK beginner” | Existing Performance page | Exact approved parts, rationale, exclusions, visible status; 5F approval |
| 1 | “how to check PC parts compatibility beginner” | New compatibility checklist linked to exact guide | Socket, BIOS, RAM, dimensions and connectors with manufacturer evidence; don't promise a universal checker |
| 2 | “1080p gaming PC build UK budget”, “gaming PC build £1000 UK” | Starter plus budget explainer | Budget term is research intent, not approved page claim; honest dated basket and compromises |
| 2 | “what do I need to build my first gaming PC” | Guides/preparation page | Tools, manuals, work area, OS/licence/peripherals and first-boot scope |
| 2 | “PC build cost Windows delivery UK” | Total-cost explainer | Item price versus delivered hardware versus complete usable setup |
| 3 | Exact motherboard/cooler/PSU setup questions | Approved configuration-specific guide | Real exact-hardware photos or manufacturer diagrams with rights; source citations; no fabricated testing |

## Mobile, semantic and performance assessment

Source includes viewport metadata, responsive shared navigation, skip links/main landmarks and no-JS navigation. Existing browser tests exercise 320/390/1440px, keyboard and no-JS journeys; their current-run result is in validation.md. Slogan H1s are a relevance opportunity, not a claim that Google cannot understand the pages. Source size alone does not establish performance.

Local Chromium installation returned a truncated archive. No current Lighthouse score, Core Web Vitals pass, mobile screenshot inspection or live browser-rendering certification is claimed. Before release run the existing browser suite, inspect screenshots at 320/390/1440px and perform three mobile Lighthouse runs on the approved hosted candidate, reporting median lab results and network profile. Once sufficient traffic exists inspect field LCP/INP/CLS separately; low-traffic lack of field data is not a failure. Check navigation focus, tap targets, long configuration labels, HOLD visibility and affiliate disclosures.

Structured data is P2. Do not describe CORE as the seller of a complete PC, invent Product offers for unverified baskets, claim physical reviews, or prioritise HowTo/FAQ rich-result work. Google's current documentation changelog and older HowTo deprecation explain why these are not launch growth tactics [S3].
