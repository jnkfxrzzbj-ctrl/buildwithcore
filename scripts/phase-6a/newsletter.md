# CORE Build Intelligence — newsletter proposal

Status: service selection and design proposal only. No account, form, subscription list or email campaign created. Prices and published limits checked 23 October 2026; USD figures below are not converted UK quotations and may exclude tax.

## Recommendation

Start with **MailerLite Free**, subject to owner approval of provider terms, privacy arrangements, sender identity and final form. Its hosted/embedded signup, double opt-in, subscriber groups and editor suit a small occasional newsletter with little custom code. Use one group and one welcome flow; do not build a separate CRM. Review at 200 active subscribers, before the 250 free limit. If growth is stronger than expected, compare the current paid quote with EmailOctopus before committing annually.

This choice is an operational judgment, not a claim that MailerLite has the most generous free plan. Brevo is a credible alternative if CORE prioritises API-driven communications later. A future operations agent does not require choosing the most complex email platform today.

| Criterion | MailerLite | Brevo | EmailOctopus |
|---|---|---|---|
| Current free allowance | 250 active subscribers; 2,500 emails/month; two seats | 300 emails/day; up to 100,000 stored contacts; one seat | 2,500 subscribers; 10,000 emails/month; one user |
| Entry paid terms observed | Comfort from $12/month, 500-subscriber entry tier; $10.80/month billed yearly | Starter from $9/month; entry 5,000 sends, up to 500 contacts in official help | Pricing page shows $9/month billed yearly at entry; exact monthly/GBP quote needs confirmation |
| Static site | Embedded forms and hosted landing page; no secret in frontend | Hosted/embedded form with double confirmation; no custom backend needed | One free form and landing page; generous capacity |
| Consent/unsubscribe | Double opt-in, consent fields, unsubscribed status | Double confirmation and subscription history; test global suppression, especially consent-group behaviour | Verify exact exportable consent fields and suppression in trial before selection |
| Reporting | Subscriber and campaign reports; verify free export/API limits | Basic reports, form event logs and double-opt-in attribute | Free reports available for 30 days; export/archive promptly |
| Automation | Free tier limited automations; API/webhooks plan limits require check | Free automation up to 2,000 contacts; outbound webhooks; richer future integration | Enough for simple newsletter; integration/automation limits require confirmation |
| Main drawback | Small free subscriber ceiling | 300/day makes a larger simultaneous issue awkward; daily allowance also needs room for confirmation traffic | Short free report retention and less verified fit in this audit |

Sources: official MailerLite plan update/pricing, Brevo pricing help and form guidance, EmailOctopus pricing [S7–S10]. Do not rely on older claims of 1,000/500 MailerLite subscribers or unlimited Brevo contacts. Brevo's daily cap is not a promise that a 1,000-person campaign automatically sends over four days. Confirm campaign queue/resend behaviour before selecting it. A managed provider's compliance features do not discharge CORE's own duties.

## Proposed signup design and exact copy

Placement: a restrained section after the build-selection explanation and at the end of relevant guides. Navy `#030824`, cyan `#35D2FF`, secondary cyan `#9AEBFF`; use existing type and spacing. No modal, countdown, forced account or interruption to the parts journey. First approved version can link to a provider-hosted form to minimise third-party scripts on CORE; embedded integration comes later if justified.

**CORE Build Intelligence**

Occasional UK PC build recommendations, specification updates and evidence-backed buying guidance. Clear explanations of what changed and what is worth checking before you buy.

Field label: **Email address**. Email only; no name, age, address, budget or gaming-profile collection.

Unchecked required box: **Yes, email me CORE Build Intelligence from CORE. I can unsubscribe at any time.**

Button: **Subscribe to Build Intelligence**.

Supporting line: **We aim to send about one email a month. This is not an instant deal-alert service. Read our Privacy Notice.**

After submission: **Check your inbox. Confirm your email address to join CORE Build Intelligence. You are not subscribed until you confirm.**

After confirmation: **You're subscribed. We'll send occasional build updates and buying guidance. You can unsubscribe using the link in every email.**

Failure: **We couldn't submit your request. Please try again later.** Do not falsely show subscription success. Handle already-subscribed addresses without exposing subscription status to strangers. Never place email addresses in URLs, analytics events or public logs.

No live form prototype is needed to approve this copy. Later UI acceptance: visible labels; keyboard submission; descriptive errors announced accessibly; readable contrast; touch-size button; 320px layout; provider failure behaviour; no-JS link fallback; double-opt-in and unsubscribe tests using owner-controlled test addresses.

## Privacy and operational arrangements for approval

Use explicit consent for electronic marketing to individuals. Do not rely on a soft opt-in from a website visit or an affiliate click: those are not CORE selling the visitor a product [S11]. Double opt-in is recommended evidence and address validation, not a claim that GDPR universally mandates it.

Owner must supply/approve controller identity, monitored privacy contact and appropriate sender/postal identity; review the provider DPA, subprocessors, processing locations and UK transfer mechanism. Keep the notice clear about purposes, provider, lawful basis, retention, rights, complaints to ICO and withdrawal. Review whether a data-protection fee is applicable rather than assuming it is or is not owed. No home address or guessed controller details should be published automatically.

Consent record: email, consent wording/version, source form ID, requested/confirmed timestamps, confirmation evidence, subscription status and withdrawal timestamp. Keep any provider-retained IP/security metadata documented and access-limited; do not copy it into a marketing spreadsheet. Proposal: delete unconfirmed submissions after 30 days where supported; review inactive subscribers after 12 months; retain only minimal suppression/consent evidence for a justified documented period after withdrawal. Confirm the provider's actual capabilities before approving these durations.

Disable open pixels and individual link tracking initially. Email marketing consent does not automatically cover every tracking purpose; ICO treats pixels under separate storage/access rules [S12]. Use issue-level links back to CORE without recipient IDs. Confirm the rendered email has no tracking image or per-recipient link rewrite. If tracking cannot be disabled, revisit the service/configuration before activation.

Use the provider's global unsubscribe link in every marketing email; test it immediately excludes the address from future campaigns and automations. Avoid multiple consent groups initially. Brevo's own documentation warns that leaving all groups is not necessarily global unsubscribe [S9]. No purchased/scraped lists, contact-email imports, cold marketing or newsletter signup via presumed consent.

Before sending, approve sender domain and SPF/DKIM/DMARC changes in a separate DNS task, preserving existing mail records. Test confirmation, delivery, unsubscribe, bounce/suppression and a deleted contact re-import. Only confirmed subscribers receive the welcome issue. A welcome email counts against sending limits. Keep newsletter content links to CORE rather than inserting Amazon Special Links into email; programme rules for off-site placements require separate verification.

## Upgrade rule

At 200 active subscribers or 80% of any send limit, obtain exact monthly UK billing terms. Approve a monthly rather than annual subscription only if subscriber engagement justifies it. Proposed extra newsletter budget: up to £15/month, **not authorised spending**. If that cap is exceeded, reduce scope or evaluate the managed alternative before buying. Preserve consent/suppression history when migrating.
