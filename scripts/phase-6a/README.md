# CORE Phase 6A — launch growth and commercial foundations

23 October 2026. Planning window: 1 November 2026–31 January 2027. Owner: Rory Cridland.

## Executive decision

Proceed with a small educational launch experiment, conditional on an accurately described public journey. Do not advertise three ready-to-buy PCs until Phase 5F's hardware, delivered-basket, value and release gates close. HOLD is useful buying guidance, but it is not evidence that the site can yet complete a beginner's purchase and assembly journey.

The recommended experiment is two original short videos per week, reused on YouTube Shorts and Instagram, one useful search article every fortnight and one newsletter each month after approval. Spend nothing on advertising for the first 30 days. Measure whether people understand CORE and progress to build information before spending on acquisition or an autonomous agent.

## Completed work and evidence boundaries

- Cloned current main `35e9b2d2e20609c0c11e4cdf3d23d68125b12bc9`; created independent branch `phase-6a/launch-growth-foundations`. Read open PRs #7, #15–19 and #23, Phase 5F report, canonical data, affiliate catalogue, renderer, packaging controls, workflows and tests. No other branch changed.
- Read supplied Lean Development Strategy, Decision Log, Product System, external audit and competitive report. The old v16 archive is historical, not the baseline for this work. The strategy's Performance-first sequence is superseded by the owner's three-build direction, but its low-cost and trust constraints remain relevant.
- Direct GET checks verified the live home/build/guide/privacy routes, missing route behaviour, aliases and absence of robots/sitemap. The web search reader could not fetch CORE, so findings use direct HTTP evidence, not a claimed search-engine crawl. See [SEO audit](seo-audit.md).
- Authenticated read-only Cloudflare Web Analytics site listing returned an empty list in the connected account. Source and sampled live pages contain no analytics beacon. Search Console ownership, Amazon/Awin earnings and subscriber accounts were not accessible or verified.
- Researched official provider pricing, Google guidance, ICO guidance, community rules and Cloudflare architecture. Public prices were checked on 23 October; currency, tax, account terms and plan limits must be rechecked before purchase.
- Implemented internal read-only SEO inventory and a deterministic commercial calculator with tests. No public HTML, assets, hardware, purchasing logic, affiliate architecture, deployment manifest or workflow changed. The 24-file public package is unchanged.

## Deliverable index

1. [SEO audit and content opportunities](seo-audit.md).
2. [November–January campaign, first 30 days, ten scripts and three issues](campaign-content.md).
3. [Newsletter comparison and proposed signup design](newsletter.md).
4. [Measurement specification and monthly reporting template](measurement.md).
5. [Commercial scenario assumptions and interpretation](commercial.md); run `node scripts/phase-6a/commercial-model.cjs` for exact arithmetic. The accompanying workbook provides editable assumptions and blank monthly reporting.
6. [Cloudflare operations-agent architecture and costs](agent-architecture.md).
7. [Evidence register](sources.md) and [validation record](validation.md).

## Costs and commercial interpretation

Recommended launch services can start at £0 incremental monthly subscription cost using existing static hosting, free Web Analytics/Search Console and an approved free newsletter plan. Domain renewal, mailbox, existing AI subscriptions and any existing hosting invoices remain unknown; this is not a claim that CORE has no costs. Use a £15 monthly planning allowance and replace it with actual invoices. No spending was incurred or authorised here.

The central *assumed* scenario of 5,000 monthly visits produces £101.25 retained commission and £86.25 cash surplus before tax and owner time. At those same conversion economics, approximately 13,087 monthly visits are needed for £250 cash surplus. This is a sensitivity exercise, not a November traffic or earnings forecast. A modest side income is plausible if useful traffic converts, but high-value PC recommendations do not imply commission on a whole PC. The actual account rate card, eligible products, attribution losses and returns can materially reduce income.

Manual research is the larger constraint: budget roughly 6–10 hours a week across research, content and administration. Record time for four weeks before automating. Three constantly fresh buying recommendations could require more effort; allow stale evidence to fail safely rather than weakening the 24-hour requirement or advertising continuous monitoring.

## Owner decisions, in order

| Decision | Recommendation / concrete scope | Approval boundary |
|---|---|---|
| Public launch scope | Educational early launch until Phase 5F gates close; Performance remains hero | Approve claims and launch scope; existing Phase 5F approvals stay separate |
| Phase 6A PR | Review internal reports, read-only SEO inventory and scenario calculator | Separate merge approval; nothing here deploys |
| Measurement | Free Cloudflare Web Analytics plus Search Console, revised privacy notice and documented objection/consent treatment | Approve privacy arrangements before any beacon; verify GSC using existing ownership or later approved verification method |
| Newsletter | MailerLite Free for the first ≤250 active subscribers; reassess at 200 | Approve provider/DPA/transfers, sender/controller details, retention, tracking disabled, exact form and privacy copy; then account setup and testing |
| Marketing commitment | Two shorts/week, one fortnightly article, monthly email; £0 paid ads | Owner approves publication; no posts/emails sent in Phase 6A |
| Public SEO work | Sitemap/robots, descriptive metadata and selective schema after Phase 5F reconciliation | Separate public implementation/release review, including manifest/fingerprint changes |
| Agent | Authorised-source, read-only evidence pilot before AI research | Approve source rights, retention, security and explicit cost cap before provisioning; no production-write credentials |

## Launch checklist and first review

Before promotion: resolve Phase 5F gates or use truthful educational messaging; confirm contact monitoring; verify exact public release and mobile/no-JS behaviour; prepare Search Console; approve privacy and measurement; verify account affiliate terms and permitted destinations. Newsletter is optional for launching educational content and must not block an otherwise useful site.

During 1–7 November: baseline measurement after approval, test five genuine beginner journeys, publish the first two educational shorts and record time. During 8–21 November: repeat the two-short cadence, publish two useful buying/compatibility articles across the fortnightly schedule, review questions and referral traffic. During 22–30 November: publish Black Friday safeguards, recheck any offer before mention, and issue the first newsletter only if approved. On 30 November review reach → visits → build interest → retailer clicks → attributed orders separately. Keep the better-performing topics and remove work that produces no learning.

No merge, deployment, DNS change, provider activation, subscriber collection or agent provisioning was performed. SEO indexing, measurement collection, subscriptions and an operational agent are not certified by this phase.
