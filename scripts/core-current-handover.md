# CORE — current status and ChatGPT handover

Snapshot date: 25 October 2026 (UTC). **Read this first in a new conversation.**

## Repository and release baseline
- GitHub: https://github.com/jnkfxrzzbj-ctrl/buildwithcore
- Last checked main HEAD before this documentation branch: `d3c9c87e62bd4fb2fd9c7c48f7df31029f5a0001` (PR #31, analytics/privacy preparation).
- Previous main merges: PR #30 `8a155f1648873536e4d6c45eae00b98ffd53f1fb`; PR #29 `2ea814d3fead6938ddbed748a33ee0cfc0f6b668`; PR #28 `abcd58dc42037f0c5a4f24bbdf39f014bd4486dd`.
- Live origin: https://buildwithcore.co.uk — GitHub Pages. **Live deployment of the latest main commit has not been independently confirmed in this handover.**
- Cloudflare Pages project: `core-preview-test` for isolated preview; no production cutover authorised.
- PR #30 accepted preview: https://50571d39.core-preview-test.pages.dev/ . Its phase report recorded a 25-file package; **do not reuse its fingerprint for the later PR #31 release without rechecking**.

## Status
| Gate | State |
|---|---|
| Three build journeys and beginner education in repository | Implemented; latest live publication unverified |
| Starter / Performance / High-End purchasing | **HOLD / NO-GO** |
| GitHub main CI at PR #31 merge | Previously reported successful; recheck current runs before deployment |
| Cloudflare Web Analytics | Prepared in source; actual production beacon/traffic/dashboard not verified |
| Restricted GitHub Pages publication | Prepared workflow; production deployment not performed/verified at this handover |
| Cloudflare production migration | Blocked pending authenticated full DNS/registrar and hosting settings inventory |
| Physical build, thermals, complete live buying evidence | Not certified; remain independent launch gates |

## Immediate next task — controlled GitHub Pages release
1. Read current main, workflow and release reports; inspect actual GitHub Pages source mode and environment approvals. Do not assume branch-root publication has been disabled.
2. Resolve workflow/version inconsistencies before activation: `.github/workflows/github-fallback.yml` currently has a hardcoded **24-file** final gate while the Phase 5I report records **25 public files**. The expected release fingerprint for PR #31 must be generated and independently verified for its exact immutable commit; do not use an older digest.
3. Confirm public package allowlist, no internal-file exposure, production-only analytics beacon and accurate privacy wording. Confirm relevant Cloudflare Analytics dashboard access and UK privacy review as appropriate.
4. Follow the owner-gated approval process for any deployment; do not bypass `CORE_GITHUB_FALLBACK_ENABLED`, the environment run-attempt secret or required approvals. Never publish an unreviewed artifact.
5. After authorised deployment, check HTTPS/domain, byte parity, excluded paths (404), all three HOLD states, ten saved Performance IDs, mobile/keyboard/no-JS journeys, beacon on production only and actual analytics ingestion. Record immutable SHA, fingerprint, workflow run, timestamp and rollback target.
6. If permissions or evidence are missing, stop safely and report the exact blocker rather than claiming release success.

## Non-negotiable boundaries
No DNS or nameserver change, no Cloudflare Pages production cutover, no unapproved production deployment, no change to hardware/purchasing/affiliate logic, no invented prices, and no publication of internal development files. Do not interpret a successful CI check as proof that the latest site is live.

## Next-phase record template
- Date/time and operator:
- Verified main SHA / branch / PR:
- Scope and owner approval:
- Tests / Actions links:
- Public file count, fingerprint, preview URL:
- Production publication status / exact URL / acceptance evidence:
- Purchasing gate and hosting/DNS status:
- Unresolved risks:
- Single next recommended action:

## Companion record
Read `scripts/core-project-history.md` for chronology and durable decisions; consult original phase reports and PRs for evidence. This snapshot becomes stale after subsequent merges or deployments.
