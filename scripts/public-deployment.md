# CORE Phase 3B — public packaging and future deployment

Phase 3B: 14 October 2026; updated for Phase 3D on 18 October 2026. Baseline: main `436e9b0ed86f6be30b6cf79fd3e6ece3f79d51f9`.
Read alongside the generation README and Phase 3A report. This implements only a
local/CI packager. Phase 3D adds only a public 404 document. No hosting settings,
DNS, domain, deployment job, prices, affiliates or specifications change.

## What is published

`scripts/public-files.json` is the reviewed, explicit allowlist. Exactly 24 files
are copied byte for byte; there is no recursive repository copy or runtime fetch
of canonical JSON. The dedicated `404.html` disables Cloudflare Pages SPA fallback. No redirect rules,
Functions or hosting configuration are generated. All paths below remain stable, including their case.

| Public path | Purpose / dependency |
| --- | --- |
| `CNAME` | Existing custom-domain declaration, unchanged; not DNS configuration |
| `404.html` | CORE-styled missing-page document; root-relative links/assets work at any URL depth |
| `index.html` | Homepage, also served at `/` |
| `builds.html` | Build comparison |
| `core-performance.html` | Configuration C and conservative generated static parts/status |
| `core-performance-guide.html` | Query-selected hardware notes and static index of all nine configurations |
| `core-starter.html` | Existing Starter reference |
| `core-starter-guide.html` | Existing Starter guide status |
| `core-high-end.html` | Existing High-End reference |
| `core-high-end-guide.html` | Existing High-End guide status |
| `guides.html` | Guide index |
| `faq.html` | FAQ |
| `about.html` | About |
| `affiliate-disclosure.html` | Disclosures |
| `privacy.html` | Privacy |
| `contact.html` | Contact |
| `assets/core-data.generated.js` | Generated public browser data, including both revisions and nine snapshots |
| `assets/core-engine.js` | Browser validation/purchasing calculations; also used by Node checks |
| `assets/core-view.js` | Browser rendering and static-fallback generation |
| `assets/core-client.js` | Browser refresh, saved-configuration lookup and publication safeguards |
| `assets/core-affiliates.js` | Existing exact-product affiliate catalogue/resolver |
| `assets/navigation.js` | Keyboard/mobile navigation |
| `assets/performance.css` | Existing Performance/guide styling |
| `assets/public.css` | Shared public styling |

No local image/font directory exists in this baseline. Embedded styles and any
external destinations stay unchanged. External retailer/affiliate availability
is not validated by the packaging checks.

Historical URLs use `core-performance-guide.html?configuration=` plus each of:

- `performance-1.1-gigabyte9070-fitv28-sn5100`
- `performance-1.1-gigabyte9070-fitv28-sn7100`
- `performance-1.1-gigabyte9070-vulcan38-sn5100`
- `performance-1.1-gigabyte9070-vulcan38-sn7100`
- `performance-1.1-pulse9070-fitv28-sn5100`
- `performance-1.1-pulse9070-fitv28-sn7100`
- `performance-1.1-pulse9070-vulcan38-sn5100`
- `performance-1.1-pulse9070-vulcan38-sn7100`

C remains `performance-1.2-c-asus9070xt-fitv28-sn5100`. These are static HTML query
routes, not server endpoints. Preserve queries through any hosting redirects.
The `#saved-configurations`, per-configuration anchors, `#parts`, page anchors and
all relative navigation links are unchanged. Without JavaScript, the existing
index lets readers select their exact saved ID manually.

## Development inventory — never in the package

| Paths | Reason excluded |
| --- | --- |
| `core-data.json` | Canonical generation input; browser uses the generated JS instead |
| `scripts/build.cjs`, `scripts/render-performance.cjs` | Generation and static rendering; read-only checks during packaging |
| `scripts/README.md` | Development/build documentation |
| `scripts/amazon-destinations-verification.md` | Internal affiliate verification record |
| `scripts/configuration-c-verification.md` | Internal implementation evidence |
| `scripts/phase-1-public-journey.md` | Internal prior implementation record |
| `tests/affiliate-expectations.cjs`, `tests/affiliates.test.cjs` | Independent affiliate expectations and tests |
| `tests/browser-check.cjs` | Browser test harness; never a client script |
| `tests/generation.test.cjs`, `tests/public-journey.test.cjs`, `tests/revisions.test.cjs` | Existing automated tests |
| `.github/workflows/checks.yml` | CI verification only |
| `scripts/public-files.json`, `scripts/package-public.cjs` | New allowlist and packager |
| `scripts/public-deployment.md`, `scripts/phase-3b-verification.md` | New inventory, procedure and concise verification report |
| `tests/deployment.test.cjs` | New packaging failure/parity tests |
| `.git/`, dependency/cache directories, output directories | Source/control/build material |
| Reports, fixtures, logs, `.env`, credentials, private feed files, anything else not explicitly allowlisted | Excluded by construction; never infer publication from location alone |

Static-reference validation finds no public dependency on development files.
The generated bundle's comment mentions its canonical source; that is not a
network request or dependency. Browser tests serve the package alone and require
representative internal URLs to return 404. They still read private test fixtures
from the test runner's checkout, not through the web server.

**Not a data-redaction tool:** the unchanged generated JS contains the public
specification, historical evidence and snapshot fields already delivered to
browsers. Excluding `core-data.json` does not hide those same values in the JS.
Never put secrets or licensed private feed rows into any browser-bound input.
The allowlist keeps files out; the supplemental credential-pattern scan is not
a proof that arbitrary content contains no secret. Human review remains needed
when public files or the allowlist change. Public Git history is a separate
exposure surface and is not made private by packaging.

## Build and verify (Node 24, no new dependencies)

From the checkout root:

```sh
node scripts/build.cjs --check
node scripts/render-performance.cjs --check
node --test tests/*.test.cjs
CORE_PUBLIC_DIR="$(node scripts/package-public.cjs)"
CORE_SITE_ROOT="$CORE_PUBLIC_DIR" node tests/browser-check.cjs
```

The browser command needs the existing Playwright installation documented in
`scripts/README.md`. Run `node tests/browser-check.cjs` separately for the source
site. CI runs both, using the same desktop/mobile/no-JS tests.

The packager prints only the new output directory on stdout; failures go to
stderr and exit nonzero. Default output is a unique `core-public-*` directory in
the system temporary area, outside the repository. For a predictable fresh path:

```sh
node scripts/package-public.cjs --out ../core-public
```

The parent must exist and have no symlink components. The destination must not
exist; the script will not empty or overwrite an old directory. Choose another
path for another build. It refuses repository-internal paths (including `dist/`),
ancestors of the repository, source symlinks/hardlinks, non-regular files, unsafe
manifest paths, unknown public pages/assets, broken local references and obvious
credential patterns. Source-only non-public files are ignored, never copied.
New public pages or assets require explicit allowlist and test/inventory review.

Before copying, both existing generation consistency checks must pass. Packaging
does not repair or regenerate source files. If a check fails, stop and inspect;
only run the documented generators after any underlying change is authorised.
Captured source bytes are rechecked after validation. A failed write removes only
the new output created by that invocation. Do not mutate the checkout/output
concurrently with a build; this is not a sandbox for hostile concurrent writers.

Output bytes, relative paths, ordering, file modes and modification times are
stable. Files are 0644; directories 0755; timestamps are fixed to 1 January 2000
UTC. The random default directory name is not part of the reproducibility claim.
No build-time clock, environment secret, manifest, log or report is inserted into
the site. `inventory()` returns a sorted SHA-256 inventory to development callers.
Archive compression/container metadata is host-controlled, not claimed identical.

## Safety under today's branch-root deployment

Owner-confirmed configuration: Deploy from a branch, `main`, `/ (root)`, domain
`buildwithcore.co.uk`. No API/settings/DNS mutation is part of this PR.

Before opening the PR, the original 23 public files matched the main baseline fingerprint.
Phase 3D preserves all original public bytes and adds `404.html`. No change to
`CNAME`, existing HTML/CSS/JS, Jekyll configuration or generator behaviour occurs. The existing Phase 3B checks workflow includes a
second local browser run against temporary output: no Pages actions, deployment
permissions, artifact publication, workflow dispatch or commit/push step.
Branch-root Pages does not execute these Node helpers. No output is committed.
Thus a later approved merge may trigger the existing Pages build but will not
change existing page bytes. After a separately approved merge, GitHub Pages may
use the new 404 document for missing URLs. No merge is performed in Phase 3D.

**Merging this PR alone does not fix current file exposure.** Existing branch-root
publication can still serve development files, including the new non-secret
packaging docs/helpers. Those files contain no private feed data or credentials.
Do not add sensitive inputs to this repository. The separate future switch must
publish only the isolated package. Do not add `_config.yml` exclusions, `.nojekyll`,
redirects, a `dist/` folder or a deployment workflow as an unreviewed shortcut.

## Future hosting procedures — proposals, not active configuration

### GitHub Pages artifact deployment

After separate approval, resolve the Phase 3A hosting-suitability question and
confirm domain/HTTPS and rollback settings. Switch the Pages source to GitHub
Actions. A future workflow should check out an approved commit, run consistency,
Node and both browser suites, build with `--out "$RUNNER_TEMP/core-public"`, upload
only that folder using the reviewed `upload-pages-artifact` action, and deploy
only that artifact in a protected `github-pages` environment. Grant Pages write
and OIDC permissions only to the approved deployment job; require the build job
and owner gate to succeed. Never upload `.`. Pin reviewed action versions.

This follows [GitHub's custom-workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
(checked 14 October 2026). No executable deployment YAML is supplied in this PR.
After the approved switch, verify all stable paths/queries, custom domain/HTTPS,
HOLD, mobile/no-JS and absence of internal files at the live URL. Retain the prior
approved package for rollback, rather than republishing the repository root.

### Cloudflare Pages, GitHub-connected build

Only after separate hosting approval, connect the repository to a Pages project,
select the intended branch, use no framework preset, Node 24, and the package
command as the build. Proposed build command: `node scripts/package-public.cjs
--out ../core-public`; proposed output directory: `../core-public`. Confirm that
Cloudflare accepts this external output path in an approved preview experiment;
its documentation describes configurable output directories but this exact path
has not been verified against an account. Do not claim production readiness.

If the provider requires an in-checkout output folder, design a separately
approved host-only staging step that copies **only the verified package** into
the provider's ephemeral `dist/`; never copy the source repository or commit that
folder. Do not relax this packager's repository-root guard. Neither route is
configured or run here. Keep DNS/custom-domain migration and any automatic
production deployment disabled until separately approved. `CNAME` is retained
for byte parity, but Cloudflare domain setup is a separate account action.

[Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
and [GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
were checked on 14 October 2026. This is an ordinary static package with relative
assets and no GitHub runtime API, repository-name prefix, Functions or database.

[Cloudflare's serving defaults](https://developers.cloudflare.com/pages/configuration/serving-pages/)
redirect `.html` paths to extensionless URLs and use an SPA fallback when there is
no top-level `404.html`. `404.html` is now explicitly allowlisted; no redirect rule is needed. Before a
switch, explicitly verify old `.html?configuration=...` bookmarks, preserved
queries/fragments and missing-file responses; approve any host-specific response
policy separately. An HTML fallback response is not proof an internal file leaked,
but must not be misreported as a verified 404. Preview-only tests and provider
configuration remain outstanding. No paid service or account resource is created.

## Manual gates before switching

- Review this PR and approve merge separately from any hosting/deployment switch.
- Confirm hosting suitability, actual source/settings, domain/HTTPS and rollback.
- Approve a deployment workflow or host-connected build, permissions and triggers.
- Verify that only the 24-file package is served, internal files are unavailable,
  and all historical queries, HOLD, affiliate destinations, mobile and no-JS work.
- Resolve any provider URL/output-folder differences without weakening packaging.
- Keep Configuration C purchasing activation, prices, feeds and affiliate changes
  outside this work. Packaging does not approve any of them.

## Phase 3D routing checks and preview gate

See [phase-3d-verification.md](phase-3d-verification.md) for exact evidence,
package fingerprint, limitations and the proposed preview redeployment procedure.

The allowlist path grammar permits only the exact numeric exception `404.html`;
other numeric HTML filenames remain rejected. Every allowlisted file must exist.
The original 23-file fingerprint remains independently pinned in deployment tests.
`tests/pages-routing-check.cjs` performs read-only Pages-specific HTTP checks
against a local emulator or the isolated CORE preview; it never deploys.

```sh
CORE_PAGES_ORIGIN=http://127.0.0.1:8788 CORE_PUBLIC_DIR=/absolute/verified/package node tests/pages-routing-check.cjs
```

Use `wrangler pages dev /absolute/verified/package --ip 127.0.0.1 --port 8788`
in a separate terminal for local emulation. Install Wrangler outside the checkout
if needed; it is QA tooling, not a website dependency. Local success is not hosted
certification. After separately approved preview deployment, use its immutable
HTTPS URL instead and run the hosted browser/manual matrix in the verification
record. The HTTP script does not test fragments, which browsers handle.
