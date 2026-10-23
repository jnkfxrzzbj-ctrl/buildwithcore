# Measurement specification

Status: proposal, no collector activated. Main and sampled live HTML have no analytics scripts. Cloudflare's authenticated Web Analytics site list returned `[]` on 23 October 2026. This establishes absence in the connected account, not every possible account. Search Console, newsletter subscriber data and affiliate financial reports are unverified.

## Lean measurement stack

| Measure | Source / definition | Limitation and handling |
|---|---|---|
| Traffic and sources | Cloudflare Web Analytics after approval: visits, page views, referrer, country/device | Visits are provider-defined, not identified unique people. Bots, blockers and privacy settings affect totals. Record definition/version |
| Search discovery | Search Console: UK web-search impressions/clicks, query/page, CTR, average position | GSC clicks are not site visits. Low-volume queries can be hidden. Compare same filters and date range |
| Build interest | Views of each canonical build path / total page views; also absolute views | Repeat views are not distinct people. Do not sum per-page visitors into unique site visitors |
| Retailer clicks | Initially affiliate dashboard clicks where accessible; later aggregate outbound event collector | Dashboard clicks may include other registered placements and bots. Outbound click ≠ purchase |
| Signup conversion | Provider confirmed double-opt-in additions divided by newsletter landing-page visits | Ratio is directional, not a user-level funnel; do not count submission/success-page views as confirmed subscriptions |
| Sales and income | Programme exports: ordered, shipped/validated, reversed, payable and actually paid separately | Attribution windows, last-click overrides, cross-device loss, exclusions and returns apply |
| Revenue per visit | Validated/retained commission for reporting period ÷ measured visits | Period ratio, not proof those visitors caused that month's payments. Track lagged cohorts where reports allow |
| Costs/time | Actual monthly invoices and owner time log by research/content/support/admin | Show cash surplus separately from economic surplus including owner time |

Cloudflare Web Analytics is free and privacy-oriented, but its official FAQ says custom events are not supported [S4]. Do not invent a `track()` API or claim it measures retailer clicks/signups automatically. Start with aggregate traffic, GSC and provider exports. Leave unavailable cells blank/“not measured,” not zero.

## Optional outbound-event phase, after approval

Add a small independent first-party collector only if programme reports cannot answer a concrete question. It must observe the existing resolved anchor without changing the href, Amazon tag, affiliate catalogue, identity matching or purchasing rules. No redirect/shortener layer. Keep native navigation working if JavaScript, the collector or its network request fails.

Allowlisted event schema: `event=retailer_outbound`, `day`, canonical `page_id`, `build_id`, exact `component_id`, `retailer_id`, `link_kind=affiliate|nonaffiliate`. Optional allowlisted campaign code may be read from the current URL without persistence. No full query string, email, raw referrer, user ID, device fingerprint or stored IP. Strip configuration strings unless they are a bounded public hardware ID genuinely needed for the question. Send only after a real click, including keyboard activation; distinguish middle-click support in test coverage. Aggregate counts cannot deduplicate people and must be called click events.

Server requirements: strict schema/enums/body size, same-origin controls plus rate limiting (Origin alone is not authentication), edge abuse controls, aggregate daily increments, no payload/access logging beyond necessary security logs, retention proposal of 13 months for aggregates. Audit provider/security logging separately: “we don't store IP in our event table” is not “no provider processes IP.” Respect the chosen objection/consent controls. Test collector outage, malformed/forged input, double handling, keyboard/native new-tab behaviour, no-JS fallback and unchanged affiliate URL bytes. No endpoint is implemented or provisioned in Phase 6A.

## Privacy decision

Current notice explicitly says no analytics or email signups. It must change with approved activation. Cookie-free alone does not prove UK GDPR/PECR compliance. ICO's current statistical-purpose exception has conditions including limited purpose, aggregate output, clear information and a simple free objection route [S5]. Treat general site-improvement statistics and commercial/advertising attribution separately; do not assume the exception covers affiliate advertising measurement or visitor profiling. If the planned use does not fit an exception, obtain the appropriate consent before collection. The owner must approve the data map, provider terms and implementation behaviour.

No user-level cross-site attribution, fingerprinting, remarketing pixels or ad audiences are proposed. Newsletter opens and per-person link tracking should be disabled initially. Use issue-level website campaign links; no recipient IDs in URLs.

## Affiliate baseline and reconciliation

The catalogue contains nine exact-product Amazon UK records with `buildwithcore-21`. They cover historical component identities, not all eight slots of every future build. Resolver identity checks fail closed. Presence of a tag proves neither account eligibility nor current commission earnings. Awin is not implemented in this catalogue. Membership and feed rights in prior research do not establish accepted retailer programmes or rates.

Monthly export routine: retain account-specific rate-card date and eligible categories; obtain clicks, qualifying orders, eligible revenue, gross commission, reversals, validated/payable commission and paid amount. Match periods/currency and record extraction date. Reconcile opening payable + new payable − cash received ± adjustments to closing payable where the programme supplies those figures. Never add ordered and shipped totals as separate sales. Keep Amazon and Awin definitions separate before combining retained commission. Do not add a new tracking ID or sub-ID until a separately reviewed attribution change is approved.

## Campaign naming and reporting

Use inbound URLs such as `https://buildwithcore.co.uk/core-performance.html?utm_source=instagram&utm_medium=organic_social&utm_campaign=launch_2026_11&utm_content=s01_hold`. Use lowercase bounded codes; no personal data. Do not add marketing UTMs to retailer URLs. GSC works independently of UTMs. Cloudflare referrer reports may not give the desired UTM breakdown; verify available dimensions after setup and retain native channel profile-click metrics. Do not promise cross-channel attribution from UTMs alone.

YouTube Shorts descriptions/comments do not provide clickable URLs [S6]. Use the channel profile link and spoken/on-screen “link on our profile.” Instagram uses its profile link; record native profile visits/link taps. Do not treat video views as website visitors.

## Monthly report template

Reporting month: ____; extraction date: ____; release SHA: ____; measurement coverage/downtime: ____.

| Metric | This month | Previous month | Source / definition | Decision |
|---|---|---|---|---|
| Visits; page views; top referrers | | | Web Analytics, same filters | |
| UK search impressions; clicks; CTR | | | GSC web search | |
| Top five queries and landing pages | | | GSC; suppressed queries noted | |
| Starter / Performance / High-End views | | | Canonical path grouping | |
| Retailer click events, by retailer | | | Collector or programme; never silently mix | |
| Confirmed subscribers / unsubscribes / active total | | | Provider export | |
| Orders; eligible sales; retained commission | | | Each affiliate programme | |
| Payable balance; cash received | | | Statements and bank records | |
| Revenue/visit; cash cost; cash surplus | | | Retained revenue basis | |
| Owner hours: research/content/support/admin | | | Weekly time log | |
| Stale-basket days; failed checks; corrections | | | Research log | |
| Best experiment / next change | | | Evidence plus limitations | |

Cadence: 20-minute weekly check; 60-minute month end review. Freeze a dated export because dashboards change and some free providers retain reports briefly. Report invalid/missing data visibly. January review uses three months of evidence, not a single successful post or a handful of orders.
