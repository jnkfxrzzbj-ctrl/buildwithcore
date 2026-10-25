# Phase 5I — final design polish

Implementation: 24 October 2026; hosted acceptance completed: 25 October 2026. Existing draft PR #30, `phase-5i/final-design-polish`. Base main: `2ea814d3fead6938ddbed748a33ee0cfc0f6b668`; starting draft: `f4ea14279d9d972baba5b01af0de15091732f560`. The two initial metadata corrections are retained.

## Implementation

- Shared header and footer presentation on all 15 pages, About CORE in primary navigation and a visible Choose a build action on narrow phones. Native links remain available without JavaScript; menu Escape/focus behavior is retained.
- Clear HOLD warning before build actions, human-readable component labels, shared exclusions and guide shortcuts. No hardware or product-reference destination changes.
- Current Performance hardware notes are the default. The secondary Saved and historical configurations disclosure retains all ten IDs, snapshots and native disclosure rows. Hash navigation opens enclosing disclosures with JavaScript; without it, native fragment navigation and the explicit index remain usable. Unknown IDs never borrow another configuration. A prominent no-JavaScript notice explains that query strings cannot select historical content automatically.
- Representative case image on Home, Builds and all three specifications. Two existing Starter SVG instructional diagrams are byte-for-byte unchanged. Guide navigation points to start-here, the ten assembly stages, Windows, glossary and care; no unverified extra wiring diagram was introduced.
- Larger, brighter supporting labels, wrapping headings/identifiers, keyboard-accessible comparison scrolling with sticky row labels. Corrected guide metadata and heading levels, removed historical target prices from general FAQ, clarified Starter's Nvidia choice and retained accurate affiliate independence/disclosures and GitHub Pages hosting copy.
- Magnification checks exposed and corrected minimum-width problems in guide cards, the comparison page's 12-column mobile layout, FAQ rows, build metrics and glossary definitions.

## Image provenance and limitations

`assets/h6-exterior.webp`: 1152 × 768, 22,496 bytes; generated with OpenAI's image-generation tool for this task on 24 October 2026, then resized and encoded as WebP. No external photograph, retailer image or third-party stock asset was copied. Reference for case characteristics: [NZXT H6 Flow (2023) specifications](https://support.nzxt.com/hc/en-us/articles/40183529624347-H6-Flow-2023-Specs).

Prompt direction: original realistic studio product illustration of the black non-RGB NZXT H6 Flow exterior, dark tinted glass concealing internal components, angled intake mesh, dark navy background, no visible GPU, motherboard, cooler, radiator, lighting or text. This is an illustrative approximation, not a manufacturer-verified product photograph or evidence of an assembled/tested CORE configuration. Owner review of visual accuracy remains necessary before publication. A single exterior is intentionally reused because all three specifications share the case; it must not imply different cases or physically tested interiors.

Every placement states: “Representative AI illustration of the shared black H6 Flow exterior; not a photograph of a CORE build. Internal components are not shown.” Explicit dimensions reserve layout space; the homepage hero is eager/high priority and other placements are lazy-loaded. Original generation has no external photo licensing dependency; no trademark endorsement or exclusivity claim is made.

## Safeguards and package

Canonical `core-data.json`, generated data, buying engine and affiliate module are unchanged. Independent SHA-256 locks and existing historical-snapshot tests enforce this. All three builds remain HOLD. Purchasing remains **NO-GO**. No thresholds, offers, freshness, substitutions, component identities or affiliate attribution were changed.

The public allowlist contains 25 files: the previous 24 plus the WebP. The packager allows flat WebP assets and retains fail-closed inventory, references, credential checks and source parity. Reports, tests, scripts, screenshots, source research and credentials are excluded.

Reviewed package fingerprint: `d7a40cfe43616d94cad485951195490b768922b6e044f85d7d2a1b5385338b7a`.

## Verification record

- `node scripts/build.cjs --check`, `node scripts/render-performance.cjs --check`, `node scripts/render-launch.cjs --check`.
- `node --test tests/*.test.cjs`: 73 tests passed, including exact hardware/affiliate locks, preserved Starter SVGs, 25-file inventory, HTTP MIME coverage and original purchasing regressions.
- Browser suite runs on source and isolated package: all 15 pages at 1440, 390 and 320 CSS pixels, JavaScript enabled/disabled; menu and keyboard behavior, image decode/alt/dimensions, HOLD order, current/default and historical routes, links, assembly stages and two-times CSS magnification. Source run: 3,365 checks passed. Isolated-package run: 3,375 checks passed.
- Shared supporting text #b6c1d0 on #030824 measures 10.83:1; cyan #9aebff measures 14.76:1. This is colour-pair verification, not a whole-site accessibility certification.
- CSS magnification is an automated layout stress test, not certification across every browser's native zoom implementation. Testing uses Chromium; no claim of full WCAG conformance, assistive-technology certification, physical hardware validation or real-device Safari testing.

## Hosted acceptance

- Preview: https://50571d39.core-preview-test.pages.dev/
- Cloudflare deployment: `50571d39-545e-4172-bb62-ede60d8819f2`, environment `preview`, branch `core-phase5i-design-preview`.
- Deployed public candidate: `f42bbfaaa64a494a93a820177a4b79d123b4e134`. Subsequent commit `afbecef2cf0cdb036a59263918cdecf782994da2` changes only the browser test to await keyboard fragment navigation before asserting `#assembly`; the assertion is retained and all 25 public files are unchanged. The evidence/report commit also changes no public file.
- GitHub checks on `afbecef`: both CORE verification runs and the no-deployment package workflow passed. [Push verification](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40124152571), [PR verification](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40124156523), [package workflow](https://github.com/jnkfxrzzbj-ctrl/buildwithcore/actions/runs/40124156532).
- Hosted HTTP: 44 routes passed; all 25 public files byte-identical to the package, nine internal/missing paths returned the correct 404, all ten saved query strings retained. Curl TLS verification remained enabled. The preview also opened normally in the connected browser.
- Hosted browser: 1,642 checks passed across all 90 combinations (15 pages × 1440/390/320px × JavaScript on/off). Every saved configuration retained its eight exact parts in both JavaScript modes at 390px. All three click-through journeys (Builds → specification → matching guide → assembly) passed with JavaScript on/off. No horizontal overflow at normal size or two-times CSS magnification; keyboard skip/menu/Escape checks and image loading passed.
- Image loading: 15 local packaged-image checks passed (five illustrated pages × three widths), with identical reserved image dimensions before and after loading.
- Browser automation uses Chromium through the managed test proxy; certificate handling in that harness is not treated as TLS certification. Independent curl verification and the ordinary connected-browser visit provide separate HTTPS evidence. Real-device Safari, screen-reader user testing and manufacturer verification of the AI illustration remain outside this acceptance.
- Preview isolation rechecked: production branch remains `core-production-disabled`; no canonical production deployment; only the existing pages.dev project domain. No production, DNS, Wix, analytics, newsletter, retailer-feed or purchasing activation occurred.

## Evidence and owner review

[Deployment record](phase5i-evidence/deployment.json), [HTTP file parity](phase5i-evidence/http.json), [package inventory](phase5i-evidence/package.json), [browser matrix](phase5i-evidence/browser.json).

Screenshots: [Homepage](phase5i-evidence/index.webp), [Builds](phase5i-evidence/builds.webp), [Starter](phase5i-evidence/core-starter.webp), [Performance](phase5i-evidence/core-performance.webp), [High-End](phase5i-evidence/core-high-end.webp), [mobile navigation](phase5i-evidence/mobile-navigation.webp). These are hosted captures, stored outside the public allowlist.

**Recommendation: ready for owner design review. Keep PR #30 as a draft.** The owner should review the visual treatment, representative image and its caption before approving merge/publication. This is educational website acceptance, not hardware or purchasing validation. Current complete delivered baskets, purchasing-policy approval, evidence freshness and outstanding physical fit/thermal validation are separate gates. **Starter, Performance and High-End remain HOLD; purchasing remains NO-GO.**
