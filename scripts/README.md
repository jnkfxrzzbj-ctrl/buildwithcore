# Performance affiliate maintenance

`assets/core-affiliates.js` is the destination catalogue. It is separate from `CORE_DATA` and is never read by the purchasing engine. Add an entry only after checking the exact Amazon UK product against the component MPN (or exact EAN when CORE has no MPN); record the ASIN and identity-verification note. No product-name searches or guessed ASINs. See [the verification record](amazon-destinations-verification.md) for evidence, variant exclusions and unresolved components.

The shared view resolves links by the selected exact component ID and matching MPN, or matching EAN for an EAN-only record. MPN records cannot fall back to EAN. Missing or mismatched records produce no affiliate link. Entries are retailer-specific so future networks can add their own destination resolvers without changing purchasing evidence.

After changing catalogue or parts rendering:

```sh
node scripts/render-performance.cjs
node --test tests/*.test.cjs
```

The render script updates the conservative static parts markup for visitors without JavaScript. Never edit affiliate buttons directly in the HTML. Do not put Amazon prices or stock in this catalogue. Qualifying fresh Amazon offers would need a separate, authorised pricing integration.

Browser/site checks (Node 24):

```sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
node tests/browser-check.cjs
```

GitHub Actions runs both checks. Tests and scripts are development material and should be excluded from any separately prepared public deployment package.
