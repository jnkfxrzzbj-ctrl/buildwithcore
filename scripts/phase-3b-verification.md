# Phase 3B verification record

14 October 2026. Source baseline: `436e9b0ed86f6be30b6cf79fd3e6ece3f79d51f9`.

Read the supplied Lean Development Strategy, Project Decision Log, full Phase 3A
report and existing build/deployment documentation before implementation.

## Verified before PR creation

- Exactly 23 public files are allowlisted; all packaged bytes equal main.
- Combined path/byte SHA-256: `eb3780f64e86244531bc9e209a8f2ac794e4b140d74a9f6e97e340ed7e734482`.
- Both existing generation/static consistency checks pass without writes.
- All 45 Node tests pass: original 37 plus eight packaging tests, including
  repeated builds, independent public fingerprint, source-only secret/feed/report
  exclusion, all 23 missing-file cases, unsafe paths/links, references, stale
  output rejection, package-loaded modules and CLI behaviour.
- Packaged C is exact and remains HOLD with null eligible purchase total. Both
  revisions, all eight historical configurations and all affiliate mappings are
  unchanged. No pricing/evidence timestamp changes occurred.
- No public HTML/CSS/JS or CNAME changes; no output committed. No live settings,
  DNS, domain, hosting permissions or deployment workflow changes. The existing
  checks workflow only verifies source and package locally in the runner.

## Browser verification

The existing full suite now accepts `CORE_SITE_ROOT` so it can serve either the
checkout or the isolated package. The test runner's fixtures stay outside the
served package. Extra package-mode requests check development URLs are absent.
Local Chromium is unavailable; local launch failed before executing assertions.
Hosted CI results must be recorded on the PR before readiness is claimed.

## Boundaries and remaining risks

- This prepares a package, not a hosting switch. Current branch-root exposure
  continues, including new non-secret development helpers/docs if merged.
- The generated browser bundle remains public and unchanged; excluding canonical
  JSON is not redaction. No private data/credentials may be put in public inputs
  or public Git history. Pattern scanning is limited, not a universal guarantee.
- Reference scanning covers current static literals; browser tests cover actual
  requests. New URL-building syntax/assets require validation review.
- Generic HTTP/local browser tests do not certify a future hosting provider's
  redirects, output-directory support, TLS, domain, cache or missing-page policy.
- No live-site, Cloudflare-account or production-deployment test is attempted.
  No account is configured, permission expanded, subscription bought or cost incurred.
- All merge, deployment and hosting actions await owner approval. The documented
  future procedures are not active workflows; purchasing activation remains out
  of scope.

Full inventory, commands, publication-safety reasoning and proposed hosting
procedures: [public-deployment.md](public-deployment.md).
