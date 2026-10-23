# Commercial viability model

The model evaluates **monthly steady-state scenarios**, not a forecast for November, December or January. Every numeric input is an assumption, including commission rates. There is no verified CORE traffic, affiliate conversion or income history in this audit.

## Definitions and equation

Visits × affiliate click events per visit × attributed orders per affiliate click × eligible commissionable value per order × effective commission rate × retained share after reversals = retained commission.

The click assumption is an event ratio, not a deduplicated proportion of people. Orders/conversion must use the same programme's definitions. A buyer can make multiple retailer purchases, but the model does not multiply by eight components. Eligible order value is the **attributed commissionable portion**, after programme exclusions such as VAT/shipping where applicable, not the advertised full build cost. Do not apply a second attribution haircut if the observed conversion rate already reflects attribution loss. The retention factor represents later returns/cancellations, not a duplicate attribution adjustment.

Cash surplus = retained commission − cash operating costs. Economic surplus also deducts owner hours × illustrative £15/hour. Figures exclude tax and are neither tax advice nor a full accounting forecast. Paid cash can lag validated revenue. Fractional orders are expected values used for sensitivity analysis, not actual orders.

| Monthly driver / result | Low | Central | Optimistic |
|---|---:|---:|---:|
| Visits | 1,000 | 5,000 | 15,000 |
| Affiliate click events per visit | 8% | 15% | 25% |
| Attributed orders per click | 1.5% | 3% | 5% |
| Eligible value per order | £150 | £250 | £350 |
| Effective commission rate | 1% | 2% | 3% |
| Retained after reversals | 85% | 90% | 95% |
| Affiliate clicks | 80 | 750 | 3,750 |
| Expected attributed orders | 1.2 | 22.5 | 187.5 |
| Eligible sales value | £180 | £5,625 | £65,625 |
| Gross commission | £1.80 | £112.50 | £1,968.75 |
| Retained commission | £1.53 | £101.25 | £1,870.31 |
| Cash operating allowance | £10 | £15 | £25 |
| Cash surplus | −£8.47 | £86.25 | £1,845.31 |
| Owner hours | 24 | 32 | 40 |
| Economic surplus at £15/hour | −£368.47 | −£393.75 | £1,245.31 |
| Revenue per visit | £0.00153 | £0.02025 | £0.12469 |
| Visits for cash break-even | 6,536 | 741 | 201 |
| Visits for £250 cash surplus | 169,935 | 13,087 | 2,206 |

Optimistic results require several favourable factors simultaneously. They are not a likely early outcome. Keeping central conversion economics but changing traffic gives about £20.25 at 1,000 visits, £101.25 at 5,000, and £202.50 at 10,000. Central economics require roughly 25,433 visits for £500 cash surplus, before valuing time. If a build stays HOLD and visitors do not buy, commission can remain zero despite useful learning.

## Programme verification

The repository's nine Amazon destinations and fixed tag are verified as implementation, not account acceptance or income. The public Amazon rate-card route redirected to account login. A search result showing 2% for computers proved to be **Onsite Associates** on opening; that table concerns content on Amazon and is not evidence of CORE's external-site rate. It was deliberately excluded from the model [S13].

Awin advertiser-specific accepted terms, commission tiers, excluded products, validation rules, cookie duration and feed rights were not available in this audit. Do not generalise a public 30-day cookie statement from one advertiser into a portfolio assumption. Before income forecasting obtain the actual account rate card and accepted advertiser terms. Retain a dated record and test programme reporting without making a purchase for the purpose of generating self-commission.

Revenue may be lost through non-qualifying products/sellers, cookies/consent, competing affiliate clicks, cross-device behaviour, ad blockers, returns and unpaid/declined transactions. Actual rates may differ by component category. Some recommended components have no affiliate destination. A complete hardware basket can therefore generate commission on only a small fraction of its value, or none.

## Operating burden and costs

Initial weekly time budget: 3–5 hours price/evidence exceptions, 2–3 hours content, 0.5–1 hour administration/measurement, plus occasional 1–2 hour guide or support work. These are planning estimates. A small catalogue helps, but exact identity, stock, delivery and conflicting sources are the expensive tasks. Daily manual coverage of all three baskets may exceed the budget. On days evidence is stale, retain conservative HOLD. Do not promise 24/7 active research.

Initial incremental service spend can be £0, subject to free limits and existing hosting. The £10–£25 model allowances reserve room for domain/mailbox allocations and small services; they are not verified invoices. Unknowns include annual domains, mailbox, existing AI subscription allocation, any paid feed and future agent API use. Exclude a physical PC purchase from monthly operating cost and record it separately if later approved. No multiple-system test budget is assumed.

Learning value is real but should be recorded separately: reusable tests, source adapters, content process, research time saved and observed beginner problems. Do not count it as revenue. At January review, continue if evidence supports either useful learning within the agreed time budget or improving commercial performance. Do not spend more merely because three months have elapsed.

## Model use and checks

Run `node scripts/phase-6a/commercial-model.cjs`. Update assumptions in a reviewed copy; the tool rejects unknown/non-finite inputs and returns `null` for impossible traffic targets at zero earnings per visit. It has no runtime connection to CORE's buying engine. The workbook uses the same assumptions with one selectable active case and formulas. The table above is a dated comparison; rerun the calculator when changing assumptions.

Decision thresholds are proposed experiments, not industry benchmarks: review at least 100 affiliate clicks before treating conversion differences as more than weak signals; show exact counts and uncertainty. If 500 relevant visits produce no evidence of build interest, inspect proposition and landing-page comprehension. If interest is present but retailer clicks are low, distinguish expected HOLD behaviour from usability problems. Never weaken buying safeguards to increase conversion.
