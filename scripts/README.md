# CORE data generation and maintenance

## Canonical data and reproducible generation

`core-data.json` is the canonical source for `assets/core-data.generated.js`.
It was recovered from the committed bundle at main
`6503b72c77a187c819ca023dc61882904a980454`, not from the older v16 archive.
PR 1 regenerated that bundle byte for byte. Schema 2 now adds the authorised
Configuration C revision. The original 11 component identities, eight guide
configurations, 12 offers, thresholds and evidence timestamps remain unchanged
in the historical revision. The original fingerprint is still checked against
an explicit projection of that historical data.

Use Node 24. The generator uses only Node built-ins and the existing engine's
`validate` function; no dependency installation or network access is needed:

```sh
node scripts/build.cjs
node scripts/build.cjs --check
node scripts/render-performance.cjs --check
node --test tests/*.test.cjs
```

The first command validates the JSON and writes only the generated data bundle
if its bytes differ. `--check` exits nonzero for a missing or different bundle
without writing anything. Paths are relative to the script's repository, not
the calling directory. Generation preserves source key/array order and never
reads the clock, refreshes evidence, chooses components or renders HTML.

Edit the canonical JSON only when the underlying data change is authorised;
never edit the generated bundle directly. After an authorised data change, run
the generator, then the separate static renderer if the rendered parts need
updating, and review every resulting diff. A generation command does not make
old price evidence fresh or approve new hardware or buying thresholds.

The generation tests compare source and browser data, check the migration's
baseline fingerprint, and exercise repeated generation, read-only drift checks
and invalid input without damaging existing output. The fingerprint deliberately
locks this recovery to the reviewed baseline; a future approved data revision
must explicitly review/update that regression assertion rather than silently
regenerating an expected value. The schema-2 validator additionally requires an approved complete tuple, exact
snapshots, guide associations and a documented GPU/PSU cable plan. Configuration C
has a pending price policy with null thresholds; even fresh inexpensive offers
cannot make it eligible. See [the C implementation record](configuration-c-verification.md).

## Performance affiliate maintenance

`assets/core-affiliates.js` is the destination catalogue. It is separate from `CORE_DATA` and is never read by the purchasing engine. Add an entry only after checking the exact Amazon UK product against the component MPN (or exact EAN when CORE has no MPN); record the ASIN and identity-verification note. No product-name searches or guessed ASINs. See [the verification record](amazon-destinations-verification.md) for evidence, variant exclusions and unresolved components.

The shared view resolves links by the selected exact component ID and matching MPN, or matching EAN for an EAN-only record. MPN records cannot fall back to EAN. Missing or mismatched records produce no affiliate link. Entries are retailer-specific so future networks can add their own destination resolvers without changing purchasing evidence.

After changing catalogue or parts rendering:

```sh
node scripts/render-performance.cjs
node --test tests/*.test.cjs
```

The render script updates conservative static parts/status and the nine-section hardware-note index for visitors without JavaScript. Its fixed evaluation time only supports unverified rendering; it never creates current-price evidence. Never edit affiliate buttons directly in the HTML. Do not put Amazon prices or stock in this catalogue. Qualifying fresh Amazon offers would need a separate, authorised pricing integration.

Browser/site checks (Node 24):

```sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
node tests/browser-check.cjs
```

GitHub Actions checks generated-data consistency, runs the Node tests, then runs
the browser/site checks. This workflow verifies changes; it does not deploy.
Tests, scripts and the canonical JSON are development inputs and should be
excluded from any separately prepared public deployment package. The browser
continues to load the committed generated bundle; no runtime JSON fetch is added.

Phase 5F: after editing `core-data.json`, run `node scripts/build.cjs`,
`node scripts/render-performance.cjs` and `node scripts/render-launch.cjs`.
Their `--check` modes never repair stale output. Run `node --test tests/*.test.cjs`
and `node tests/browser-check.cjs`, then test the isolated package as in CI.
See `phase-5f-build-completion.md` for exact specifications, evidence gaps and HOLD gates.
