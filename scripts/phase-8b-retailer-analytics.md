# CORE Phase 8B — retailer-click analytics review

Prepared 30 October 2026. Baseline: approved main `7b990411b1e8fce8fb39404cbacffa94107a7d4a` (Phase 6 / PR #35). Branch: `phase-8b/retailer-click-analytics`. Phase 8A is not included. No production changes, endpoint deployment, paid resources or merge were performed.

## Recommendation

PASS for local implementation and owner review. NOT APPROVED FOR PRODUCTION ACTIVATION. The browser endpoint is deliberately empty; the Worker is disabled, has no published route and has a placeholder database binding. Activation requires the resource, cost and privacy checks below. No real customer activity has been measured.

## Existing analytics audit

- `assets/navigation.js` loads Cloudflare Web Analytics only on buildwithcore.co.uk and www.buildwithcore.co.uk. The existing token is unchanged. The connected Cloudflare account confirms one Web Analytics site for buildwithcore.co.uk, matching that token, with automatic injection disabled.
- Repository inspection found no existing outbound-event listener, Google Analytics, advertising pixel, or custom event collector. This establishes the checked repository baseline, not an audit of every possible external hosting configuration.
- `assets/core-affiliates.js` resolves identity-verified Amazon URLs with the existing affiliate tag. `assets/core-view.js` renders Performance references, recorded offer sources and affiliate links. `scripts/render-launch.cjs` renders Starter/High-End links, including guide references. `core-client.js` refreshes Performance markup from the same renderer. All these links have static HTML fallbacks.
- Manufacturer documentation links are not click targets. Retailer-hosted product references are included, including Scan and Overclockers links labelled as product sources. Corsair product-store links are included; support/manual pages are excluded. Current retailer references, affiliate buttons and recorded retailer offers are included. Historical High-End retailer product references in its existing guide are also included; their exact component identifier distinguishes them.
- Cloudflare's FAQ explicitly says Web Analytics does not support custom events. Its normal visit/page-view dashboard cannot provide these click breakdowns. No undocumented beacon API is used.

## Implementation

`assets/core-clicks.js` adds one delegated listener for primary/keyboard clicks and one for middle clicks. Native links remain responsible for navigation. The code never prevents default navigation, rewrites a URL, or waits for collection before opening a retailer. It sends one asynchronous fetch with keepalive, omitted credentials and no referrer; errors are ignored and there is no automatic retry.

Opt-in is off initially on every page. Equal-weight Allow/Do not allow controls explain the purpose and link to the privacy notice. Consent is only in memory, can be withdrawn, and resets on navigation/reload. No cookie/localStorage/sessionStorage is used. Refusing does not affect any link. This deliberately sacrifices measurement coverage to avoid cross-page tracking or a consent-preference store.

Event fields: schema version; build; exact component ID (Performance catalogue ID or launch manufacturer-model identifier); retailer; affiliate/reference type; page filename; ISO UTC event timestamp; fresh random UUID for that event only; synthetic flag; consent-policy version. No full page URL, query, retailer destination, referrer, visitor ID, name, email, IP, fingerprint or device attributes are read into the event.

Duplicate handling: installation guard, one event-type per mouse button, WeakSet per event, 500ms same-link suppression, no retries, and server UUID deduplication. Repeated genuine clicks after the debounce interval count separately. New-tab/context-menu “open link” is not consistently observable and may be missed. Navigation can succeed even when an event is lost.

`analytics/worker.mjs` uses strict field and tuple allowlists, 2KB streamed body limit, timestamp freshness, exact Origin allowlist, method/content-type checks and separate test/production modes. Client-supplied dimensions cannot create arbitrary reporting categories. `scripts/build-click-registry.cjs` generates allowed tuples from rendered public links, with a CI staleness check.

D1 stores daily counters immediately. Exact event timestamps are validated and discarded; the server's UTC receipt date controls the bucket. A separate dedup table retains only an event UUID and expiry, with no connection to the event dimensions. Daily cleanup removes expired IDs (normally within 24–48 hours) and older aggregate buckets (89 retained UTC dates, within 90 days with the scheduled daily cleanup). Retention requires the cron to remain operational. A transactional insert/upsert prevents duplicate retries from incrementing counts. A 5,000 accepted-click daily ceiling bounds stored spam and stops further counting for that day.

## Reporting and interpretation

Run `analytics/report.sql` in the authenticated Cloudflare D1 console. It provides totals, build, build/component, retailer, affiliate/reference, page and daily trend breakdowns. No public reporting API or browser database credential exists. Export query results for charting if needed; a paid dashboard is unnecessary at this scale.

`tests/phase8b-evidence/synthetic-report.json` is example output from the local Cloudflare runtime, clearly marked synthetic. Every stored dimension group and its count is compared with accepted test requests. Unit tests also verify separate daily buckets. Customer clicks represented in this evidence: **zero**.

Clicks are not people, unique visits, confirmed purchases, affiliate conversions or commissions. The opt-in subset is biased; do not divide these totals by all Cloudflare visits and call it a reliable conversion rate. Affiliate-network sales/commission reports remain a separate source. Date buckets are UTC, not British local time.

## Privacy and security assessment

The purpose includes commercial interest in affiliate recommendations. Do not assume the PECR statistical-purpose exception applies: the ICO's current guidance limits it to qualifying statistical service improvement, excludes online advertising purposes and requires clear information plus a simple objection mechanism. This implementation uses affirmative consent for optional retailer measurement instead. The absence of cookies is not a legal exemption. The notice describes this separately from the existing Web Analytics service; Phase 8B does not replace or expand that service.

CORE's application does not collect/store IP addresses, but Cloudflare necessarily receives network addresses when processing HTTP. Absolute “no IP processing anywhere” is not achievable with an internet endpoint. Application observability is explicitly disabled and the Worker does not log bodies, headers or identifiers. Cloudflare may independently process operational/security data. Confirm the current Cloudflare DPA, processor/subprocessor arrangements, UK transfer mechanism and actual retention before enabling the collector. The privacy notice flags this pending check. If raw request logging, Logpush or tracing is enabled later, review the privacy assessment first.

No click payload is shared with retailers or affiliate networks. Existing outbound links still invoke the retailer's own privacy practices after navigation. No profiles, visitor-level histories or automated decisions are made. Aggregate data cannot support locating an individual's contributions. Confirm CORE's controller/contact details and publish the final active notice before release. Keep a versioned record of the consent wording and configuration; this intentionally does not create a persistent per-person consent log.

Origin checks and `isTrusted` prevent accidental/casual contamination, not a determined attacker. Non-browser clients can forge Origin and payloads; browser automation can generate trusted input. There is no claim of bot-proof measurement. The daily cap bounds accepted storage, not incoming request volume or paid-plan billing. An attacker could exhaust counting or skew totals. Use the Free plan's hard limits, monitor account usage and aggregate anomalies, disable collection on abuse, and consider stronger controls only if justified. Avoid introducing IP-based identifiers merely to improve analytics.

Automated tests use localhost, synthetic:true and an in-memory test D1 database. Production rejects those payloads. Normal preview hosts are excluded by the client; test mode is only allowed on localhost/127.0.0.1. Do not run a test with production mode and opt-in against the live endpoint: it would be counted. Ad blockers, failed preflights, early browser termination, clock skew and no-JS visits can cause undercounting.

Cloudflare D1 recovery/backups may retain deleted rows beyond primary-table cleanup. Confirm the plan's Time Travel window and document it before release; do not promise immediate physical deletion of backups. Operational security metadata also needs its own provider assessment. No identifying event history is deliberately persisted in D1.

## Resources and estimated cost

Proposed: one small Worker and one D1 production database, plus a separately isolated test database only if a hosted rehearsal is approved. Keep the existing static site and DNS unchanged. An approved workers.dev collector URL can serve cross-origin POSTs from the two exact CORE origins; no domain migration is necessary. Reporting stays behind Cloudflare account authentication.

Expected ongoing cost: **£0 on Workers Free**, within shared account quotas. Current published limits: 100,000 Worker requests/day; D1 5 million rows read/day, 100,000 rows written/day and 5GB total storage. At 1,000 clicks/day the collector performs roughly several thousand row writes including indexes/cleanup, and reads a small daily aggregate set. Monitor measured D1 row metrics rather than treating requests as equivalent to rows. Caps/quotas can cause measurement loss while links still work.

The connection could not read account subscriptions: Cloudflare returned HTTP 403 because OAuth does not cover the billing endpoint. Therefore the actual account plan and remaining shared allowance are **unverified**. Free-plan quota exhaustion returns errors rather than paid overages. A paid Workers account has a published $5/month minimum and metered overages; this is not authorized. Do not upgrade, assume a spending cap, or deploy on an unverified paid account. No charges were incurred in this work.

Analytics Engine and Zaraz are alternative Cloudflare products, but add different event/reporting, retention or configuration considerations. Direct daily D1 counters and authenticated SQL are sufficient here. Cloudflare Web Analytics remains useful for visits; it cannot absorb these custom events directly.

## Validation and evidence

- `node --test tests/*.test.cjs`: **87 passed, 0 failed**, including six new collector tests; full output in `tests/phase8b-evidence/regression.txt`.
- `node tests/clicks-browser.cjs`: **1,137 checks passed; 150 accepted synthetic events from 152 attempts**. Actual Chromium at 1440px and 390px; local workerd + D1, real browser click/tap, keyboard/middle clicks, affiliate/reference attribution, HOLD text, consent/no consent/withdrawal/reload, failure navigation, duplicate replay and exact grouped aggregate validation. Retailer requests are intercepted locally; no purchases or retailer traffic are generated.
- Existing `tests/browser-check.cjs`: **5,451 source checks passed**, including no-JS and saved configurations; **5,461 restricted-package checks passed**; source and packaged runs recorded separately.
- Render/build/registry staleness checks, `git diff --check`, package manifest and independent link comparison. All existing href, rel and target values on changed pages were compared with baseline. Product data, affiliate catalogue, engine and client remain unchanged.
- Screenshots for all three build pages and two guides at both widths are in the evidence directory. Controls remain in the content grid, keyboard reachable, without an overlay or horizontal overflow.
- Public package grows from 25 to 26 files solely for `assets/core-clicks.js`. Worker, database schema, tests and reports are excluded. The fixed package test fingerprint was updated after reviewing the public diff; production workflow approval settings were not changed.
- Local runtime: Miniflare 4.20260730.0, compatibility date 2026-08-06 (latest supported by installed workerd). The pinned configuration is tested. Hosted runtime, actual CORS routing, account plan, DPA and live cron remain release checks, not claimed passes.

Reviewed disabled package fingerprint: `e9ac064cc89a3906b63fdae5f1bb90bcd7b8f9782da03e50cd319c77a9dafacb` (26 files). Enabling an endpoint necessarily changes this fingerprint and requires a new reviewed release.

## Exact owner-approved release procedure

1. Review this branch, consent UX, scope, privacy text and evidence. Reconcile any later Phase 8A changes without overwriting them. Re-run renderers and registry generation after resolving page changes.
2. Verify the Cloudflare account is Workers Free, sufficient shared quotas remain, and no billable upgrade or automatic paid service is enabled. Confirm DPA/UK transfers, backup retention, controller contact details and application logging exclusions. Record those decisions. Obtain owner approval for the named Worker and database configuration before creating/publishing them.
3. For an approved isolated rehearsal, create a separate empty D1 test database and a Worker configured MODE=test, ENABLED=true, with a localhost origin used by a controlled test harness. Leave production origins and production database out of this test. Test preflight, POST, reject cases, queries and scheduled cleanup on the hosted runtime. Do not change the public site's hostname gate for ordinary preview visitors.
4. Create the approved production D1 database; execute `analytics/schema.sql` in its authenticated console. Copy `analytics/wrangler.jsonc` into a reviewed deployment configuration: production resource name, real database ID, MODE=production, ENABLED=false, exact ALLOWED_ORIGINS=https://buildwithcore.co.uk,https://www.buildwithcore.co.uk, approved workers.dev serving enabled, no routes/DNS changes, logging disabled, daily cron retained. The repository placeholder configuration is not directly deployable.
5. Deploy the approved Worker disabled. Confirm the database binding and private report access. Finish the privacy notice: replace the pending-activation statement, document confirmed transfer/backup arrangements and effective date. Set the browser endpoint to the exact approved HTTPS `/click` URL, keeping mode=production. Rebuild, regenerate registry, review the public diff and refresh the fixed package fingerprint. Run all checks again. Approve the exact resulting commit and package fingerprint.
6. After explicit merge/release approval, merge that reviewed commit and deploy only the 26-file public package using CORE's existing protected release workflow. Do not change DNS, hosting or approval settings. Enable the Worker only after the final notice and client are live. Consent still defaults off. Validate non-counting preflight, disabled/no-consent behaviour and rejected synthetic payloads. Use the isolated test database for counted QA; do not mistake a live smoke click for genuine interest.
7. Inspect authenticated aggregate results and Cloudflare request/row metrics daily initially. Verify cleanup actually runs and set an operational review cadence. Retain no ad hoc event dumps. If paid usage risk, abuse, incorrect attribution or privacy concerns arise, set ENABLED=false immediately; links continue normally. Clear the browser endpoint on the next approved static release. Revert via the existing protected release process if necessary.

## Sources checked

- https://developers.cloudflare.com/web-analytics/faq/ — custom events unsupported.
- https://developers.cloudflare.com/web-analytics/about/ — existing page/performance analytics.
- https://developers.cloudflare.com/workers/platform/pricing/ — plans and request limits.
- https://developers.cloudflare.com/d1/platform/pricing/ — row/storage limits and free-plan failures.
- https://developers.cloudflare.com/d1/worker-api/d1-database/ — prepared statements and transactional batch.
- https://developers.cloudflare.com/workers/best-practices/workers-best-practices/ — runtime guidance; request logging intentionally disabled here for minimisation.
- https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/ — statistical-purpose exception limitations.
- https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/ — scope beyond cookies and affirmative consent.
