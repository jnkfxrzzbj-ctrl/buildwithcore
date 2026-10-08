# Phase 1 — public website improvements

## Baseline and scope

Reviewed current `main`, `2e9910491e3143a3432fbf3f8c524872ca69f71e`, against the 5 October 2026 whole-site audit and the supplied Lean Development Strategy and Project Decision Log. Main had not changed since that audit. Keep the established CORE brand/design and Performance-first approach.

| Earlier finding | Baseline check | Phase 1 treatment |
| --- | --- | --- |
| Mobile comparison hides Performance and High-End | Still present: columns 3 and 4 hidden below 900px | Semantic table with all tiers, labelled horizontal scroll region and keyboard access |
| Starter/High-End appear as equally ready products | Still present | Mark under review on Home, Builds and product pages; retain specifications and targets |
| Unvalidated difficulty/build-time and exact-shopping claims | Still present | Replace legacy certainty with review/guide status |
| High-End storage comparison is false | Still present | State 2TB matches Performance; retain the SSD |
| FAQ denies affiliate use; About uses future tense | Still present | Correct both; link disclosure |
| Affiliate links lack visible commercial identification | Still present | Label each button, explain destination versus buying evidence beside shopping links |
| Retailer destinations buried in technical details | Still present | Expose existing reference and affiliate destinations with exact identifiers and unchanged buying status |
| Guide hub sends visitors to a configuration-less dead end | Still present | Route to the current selected hardware notes through the existing configuration-link mechanism |
| Missing/unknown saved guide links use internal terminology | Still present | Plain overview/recovery, no substitution for unknown links; preserve known IDs |
| Unreleased guides say “YOU BUILT IT” | Still present | Replace false completion/first-boot instructions with guide readiness and return route |
| Mobile navigation broken (historical Claude audit) | Already resolved before Phase 1 | Preserve working/no-JS links; add Escape, outside-click/focus dismissal, current-section indication, shared script, skip link and focus support |
| Old instructional image sequence (historical audit) | Already removed before Phase 1 | No new instructional images |
| Contact address not operational | Still present; no owner-supplied address | Leave transparent status; requires owner input |

Home now explains choose → buying verdict → exact retailer check → available help. Performance explains bookmarking an existing hardware-notes link, checking received model identities and the absence of a purchase record or released assembly guide. This does not implement confirmed purchases, exports, revision management or alerts.

## Boundaries

No changes to `core-engine.js`, `core-client.js`, `core-data.generated.js` or `core-affiliates.js`. Specifications, alternatives, offers, timestamps, component/build thresholds, 24-hour freshness, configuration mappings, Amazon identities and public positive-verdict safeguard remain unchanged. No feed integration, monitoring, alerts, accounts, paid infrastructure or visual redesign. Navigation stays Home / Builds / Guides / FAQ.

The guide renderer additionally rejects inherited object-property names such as `__proto__` as unknown IDs; it does not infer or replace a configuration.

## Validation

Run:

```sh
node scripts/render-performance.cjs --check
node --test tests/*.test.cjs
node tests/browser-check.cjs
```

The browser suite retains existing affiliate/engine scenarios and adds all 14 public pages at 1440, 390 and 320px, both with and without JavaScript: page overflow, navigation and keyboard recovery, all comparison columns, visible exact identifiers/disclosures, guide entry and fallback, and the existing publication safeguard under synthetic fresh GOOD BUY inputs. Set `CORE_QA_DIR` to an external scratch directory to capture desktop/mobile screenshots. `CORE_CHROMIUM_PATH` remains available for a local browser executable. CI uses its existing pinned Playwright installation.

Local result (8 October 2026): **19/19 regression tests and 1,254 browser/site checks passed**. Inspected desktop/mobile/no-JS screenshots for all 14 pages, including detailed Performance shopping sections. Narrow-screen information-page heading sizing was corrected after visual review. Final re-run passed. Confirmed the four protected engine/client/data/affiliate files are byte-for-byte unchanged from main.

Screenshots and local browser tooling are not deployment assets. Tests do not visit retailer checkout or claim hardware validation.

## Deferred audit work

Evidence publication/refresh, confirmed-purchase retention, immutable exports, exact assembly/first-boot guides, physical validation, Starter/High-End product research and migration, feed validation, notifications, a branded 404, hosting/deployment verification and broad template consolidation remain separate work. Contact activation needs a supplied working address. This PR must not be merged automatically.
