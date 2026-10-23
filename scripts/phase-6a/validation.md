# Phase 6A validation

23 October 2026. Baseline main: `35e9b2d2e20609c0c11e4cdf3d23d68125b12bc9`.

## Local results

- `node scripts/build.cjs --check`: passed.
- `node scripts/render-performance.cjs --check`: passed.
- `node --test tests/*.test.cjs`: **53 passed, 0 failed**, including three new tests for metadata inventory, commercial arithmetic and unknown/zero input handling.
- Read-only SEO inventory: 15 HTML pages, expected missing robots/sitemap, existing metadata preserved. This controlled-source scanner is not a standards-compliant HTML parser, rendered audit or Google indexing test.
- Isolated package generation and independent verification: **24 files, 395,865 bytes**, fingerprint `7b2f2929f17671c13169437528a7d79d93382a6aa8407ab23b4d8b3d9d83773e`.
- All public file bytes unchanged from main. Only new files under `scripts/phase-6a/` and a new test file are proposed. No deployment controls, catalogue, public assets or canonical purchasing data changed.
- Live GET audit: 25 URLs, including all 15 public HTML files, aliases, redirects, robots/sitemap, missing/internal paths and saved query. All 15 public HTML responses match source bytes; HTTP/www redirects captured as 301; missing/internal examples return 404. See `http-evidence.json`.
- Commercial workbook: all three selectable cases recalculated and matched the independent calculator's retained-commission results. Model and monthly-report sheets rendered and visually inspected. Inputs remain editable; reporting blanks remain unavailable rather than zero. No Excel desktop execution is claimed.

## Limits

Local browser launch unavailable; Playwright's official Chromium download returned truncated ZIP archives. No successful local browser checks, new mobile visual QA, Lighthouse measurement or field Core Web Vitals result is claimed. Existing CI runs the repository's source and isolated-package browser suites after PR creation; record actual results below before acceptance. No assertions were relaxed.

Authenticated Cloudflare Web Analytics listing was read-only and empty. GSC ownership/indexing, affiliate account rate cards and financial data, newsletter settings/delivery and any agent execution remain unverified. No production configuration changed.

## Reproduction

Run the normal generation/tests/package commands, then:

```sh
node scripts/phase-6a/seo-audit.cjs
node scripts/phase-6a/commercial-model.cjs
```

`seo-audit.cjs` reads repository files only and prints JSON. `commercial-model.cjs` reads fixed labelled assumptions only and prints scenarios. Neither contacts retailers, changes files, publishes or affects buying recommendations.

CI: pending PR creation at the time of this initial record.
