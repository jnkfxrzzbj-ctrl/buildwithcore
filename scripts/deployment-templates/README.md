# Inactive production publishing templates

These `.yml.disabled` files are outside `.github/workflows`. They cannot run as
Actions workflows. Do not move/rename them, create environments or provision a
token until the corresponding owner approval in `../phase-4-migration.md`.

Both templates accept a full main-history `release_sha` and an independently
reviewed public `fingerprint`. They reject branch dispatches, require an explicit
repository enable variable, check ancestry against the dispatch main commit, run
existing checks, build outside the checkout and test the package. Older approved
main commits support rollback; neither template silently follows moving main.
The fingerprint must come from a reviewed inventory, not an arbitrary value
copied from a failed run. Build permissions are read-only. Deployment consumes
only the artifact from the same run after environment review. Both share a serial
concurrency group; no automatic push, PR or workflow_run deployment trigger exists.

## Activation prerequisites (future owner-authorised change)

1. Merge reviewed preparation code. Create the environment **before** activating
   the matching workflow; merely naming an environment in YAML does not protect it.
2. Require the owner's approval; allow only the `main` deployment branch. Disable
   administrator bypass if available. CORE currently has one owner: leave
   “Prevent self-review” OFF so that the owner can approve their own dispatch.
   If independent review is required instead, appoint another trusted reviewer;
   do not create an impossible sole-owner approval gate.
3. Review action commit pins and Wrangler version at activation. Copy the chosen
   template to `.github/workflows/<name>.yml` in a separately approved activation
   PR. Do not copy both merely because both are available.
4. Set the corresponding repository variable to exactly `approved` only when the
   owner authorises publication. An unset variable fails closed. Keep it unset
   during preparation. This is a stop switch, not a substitute for reviewers.
5. Dispatch from main with the approved SHA and fingerprint. Inspect build logs,
   source identity and fingerprint before approving the deployment job. Archive
   the package and inventory outside 14-day CI retention; record deployment ID,
   immutable URL and run URL. Re-run host acceptance after every deployment.

### GitHub fallback

Environment: `github-pages`; enable variable: `CORE_GITHUB_FALLBACK_ENABLED`.
No provider secret. Only deploy job receives `pages: write` and `id-token: write`.
Official `upload-pages-artifact` receives only the verified public directory;
`deploy-pages` consumes the same-run artifact. Switching Settings → Pages →
Source to GitHub Actions affects the current live publisher and requires explicit
approval. Preserve configured domain and HTTPS; the CNAME file alone does not
configure these settings for Actions. Record current settings first.

### Cloudflare production

Environment: `cloudflare-production`; enable variable: `CORE_CLOUDFLARE_ENABLED`.
Environment variables: `CLOUDFLARE_ACCOUNT_ID` = the verified account ID;
`CORE_PRODUCTION_PROJECT` = `core-production`. If that name is unavailable,
review/change the literal project/domain assertions in the template before use.
Environment secret: `CLOUDFLARE_API_TOKEN`, Account / Cloudflare Pages / Edit,
restricted to this account, with an expiry and documented renewal owner; no DNS,
zone, billing, registrar or global key access. This token can affect other Pages
projects in the account: it is not project-scoped. Do not claim otherwise.

Create a separate Direct Upload project with production branch `main` only after
approval. No Git integration, Functions, paid bindings or secrets in the project.
The job installs pinned Wrangler without credentials, downloads and verifies the
same-run package, then exposes the token only to a read-only preflight and the
upload command. Preflight refuses a missing/wrong project or branch, Git
integration and unexpected domains. No project/domain/DNS creation is scripted.
Package source is never the Wrangler working directory, preventing repository
Wrangler configuration or Functions from being auto-selected.

The production job has no automatic post-upload rollback: a failed acceptance
requires the owner to select the recorded known-good release in the runbook.
After a deliberate rollback, cancel pending deployments and unset the enable
variable; the concurrency setting does not itself freeze queued releases.

## Verification boundary

YAML parsing, shell syntax, action SHA resolution, local package verification and
HTTP fixture tests were performed in Phase 4B. Neither template has been activated
or executed by GitHub. Actual environment review, Pages artifact publication,
Wrangler upload and custom-domain TLS require an authorised rehearsal. The local
fixture is not evidence of deployed GitHub response behaviour.
