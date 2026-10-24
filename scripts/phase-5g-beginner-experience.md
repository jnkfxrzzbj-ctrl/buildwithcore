# Phase 5G — First-time builder experience improvement

Status: scoped implementation brief; no buying activation, physical validation, or production deployment.

## Objective
Make a person who has never assembled a PC feel able to choose a CORE build, prepare safely, follow the correct order, recognise successful completion of each stage, and know when to stop and seek help. CORE is about the satisfaction and learning of building your own computer, not necessarily beating a prebuilt on price.

## Baseline (Phase 5F draft PR #23)
- Homepage already promises "YOUR FIRST PC. BUILT BY YOU." and offers Starter / Performance / High-End.
- All three have exact eight-part specifications and hardware notes. Buying is HOLD.
- guides.html provides a useful general assembly checklist but explicitly is not a physically tested walkthrough.
- Starter and High-End guide pages repeat exact hardware notes and link to guides.html#assembly; Performance has historical saved configurations that must remain accessible.
- Manufacturer manuals are authoritative for exact socket, mounting, connectors and firmware.
- No physical CORE assembly, photography, or novice usability study has been completed.

## Implementation scope — small, isolated, and testable
1. **Start-here route**: On the Guides landing page, explain the path: choose build -> read exact parts and HOLD status -> prepare workspace and manuals -> follow assembly stages -> first boot -> Windows -> care. Do not imply purchasing is approved.
2. **Assembly-stage structure**: Break the existing shared checklist into clearly labelled numbered stages. Each stage should say (a) what you are about to do, (b) which exact manual/hardware note to consult, (c) what completion looks like, and (d) what should make you stop. Keep technical instructions unchanged unless separately verified.
3. **Exact-hardware wayfinding**: From each current build, make it easy to find the matching notes and shared checklist. On Performance, foreground the current pending Option B while preserving all nine historical configurations, IDs, URLs, snapshots and HOLD status.
4. **Jargon and mobile check**: Explain essential terms at point of use (standoff, EPS, PCIe, M.2, BIOS, memory training) in plain language. Verify at 320px and 390px, keyboard and JS-disabled states; no new dependence on JavaScript.
5. **Accurate visual guidance**: Inventory 5-8 high-value visual opportunities (CPU orientation, RAM A2/B2, M.2 retaining hardware, board standoffs, front-panel headers, EPS vs PCIe power, GPU slot/power, first-boot diagnostics). Use exact-model manufacturer assets only with suitable permission/attribution or original verified photos/diagrams. Never present generic generated imagery as the exact hardware. Defer visuals that cannot be verified.
6. **Novice trial protocol**: Observe at least one genuine first-time builder, preferably on a phone beside an unpowered practice build or under competent supervision for actual assembly. Ask them to narrate the next action; record confusion, external help, errors, stop points and time. Do not claim a usability test occurred until it has.

## Safety and truthfulness
- Preserve all eight exact parts per build, identity matching, price evidence, BUY/HOLD safeguards, affiliate architecture and historical configurations.
- Preserve explicit HOLD on all three launch builds.
- Preserve clear distinction between documentary compatibility and physical validation.
- Never replace manufacturer instructions with speculative diagrams, especially for CPU/socket alignment, cooler mounting, power cables or firmware updates.
- Never suggest a user energise hardware when clearances, power cabling or cooling are uncertain.
- Keep existing style and 24-file public-package allowlist unless separately justified and approved.
- No production deployment, merging, or changing Phase 5F/6A branches.

## Acceptance checks
- Newcomer can find the current build's matching guide from homepage/build page in a short, obvious path.
- Guide has visible sequence, completion checks and stop conditions, not just an undifferentiated technical checklist.
- Existing safety warnings and manufacturer-manual links remain intact.
- Historical Performance IDs still resolve to their exact snapshots, including C HOLD.
- No claim of physical testing or live purchasing availability is introduced.
- Run Node, deterministic generation/package and browser suites, including 320/390/1440 widths, keyboard and JS/no-JS.
- Produce a separate novice-trial findings log after an actual observation.

## Suggested delivery order
A. Low-risk navigation, plain-language and checklist-stage improvements.
B. Verified exact-hardware visuals, only where rights and accuracy are established.
C. Novice observation and iterative fixes.

## Approval boundary
This document scopes the work only. Changes to public pages, new media, external user testing and any merge/deploy require their own review. Coordinate implementation against PR #23 before beginning so Phase 5F remains isolated.
