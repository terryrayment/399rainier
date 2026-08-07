# Extreme Trust Veil Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the trust chapter into the dark center of a maximum atmospheric veil with extremely long, measurable, balanced tapers.

**Architecture:** Keep markup and chapter content unchanged. Expand only the two bridge owners, remove all bridge artwork, paint fixed seven-stop endpoint-owned washes, and extend the existing every-row screenshot regression to both sides of the trust surface.

**Tech Stack:** Next.js 16, scoped CSS, Playwright, TypeScript

---

## File Structure

- Modify `tests/ui-audit.spec.ts`: assert both taper geometries, every-row color progression, artwork removal, and responsive continuity.
- Modify `src/app/ui-system.css`: set maximum-veil heights and seven-stop entrance/exit gradients.
- Do not modify `src/app/globals.css`, markup, assets, content, or parent-site files.

### Task 1: Add the failing two-sided veil contract

**Files:**
- Modify: `tests/ui-audit.spec.ts`

- [ ] Update transition fixture expectations at 2048×1246, 768×1024, and 390×844 to entrance/exit heights of 224/192px, 168/144px, and 112/96px.
- [ ] Generalize the existing long-dissolve test over both `.scene-bridge--arrival-trust` and `.scene-bridge--trust-interior`.
- [ ] For each bridge at each viewport assert: exact CSS height; screenshot row count of height or height+1; exact computed endpoint colors; raster endpoints within ±8/channel; every original adjacent-row Euclidean 8-bit-sRGB distance `<= 8`; Rec. 709 delta `<= 3`; rows 16–90% have green >= red/blue and channel spread >=5; art/pines `display:none`; hidden overflow; zero margins; adjacency within 2px; no horizontal overflow.
- [ ] Run `cd lakearrowheadaframe && npx playwright test tests/ui-audit.spec.ts --grep "maximum trust veil"` and verify RED on current heights and compressed exit.
- [ ] Commit with `test: define maximum trust veil`.

### Task 2: Implement the fixed maximum veil

**Files:**
- Modify: `src/app/ui-system.css`

- [ ] Set entrance/exit heights to 14rem/12rem desktop, 10.5rem/9rem tablet, and 7rem/6rem mobile, with equal `min-height`.
- [ ] Keep arrival art/pines hidden and explicitly hide any art/pines under trust-interior.
- [ ] Use entrance stops at 0/16/32/48/64/80/100% with colors: endpoint parchment, `#c8cec1`, `#abb6a8`, `#8a9a8b`, `#69796b`, `#465548`, endpoint forest.
- [ ] Use exit stops at the same positions with: endpoint forest, `#3e4b40`, `#667567`, `#899789`, `#adb8aa`, `#cbd2c6`, endpoint sage.
- [ ] Do not add holds, filters, blur, pseudo-elements, or overlapping artwork.
- [ ] Run the focused maximum-veil test and verify GREEN without loosening thresholds.
- [ ] Commit with `fix: add extreme trust veil`.

### Task 3: Full QC

- [ ] Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test` from `lakearrowheadaframe`; require all 15 routes and all tests.
- [ ] Run a temporary Chromium script with `deviceScaleFactor:1`, reduced motion, disabled animation, fonts ready, and identical left/center/right crops spanning both tapers plus the complete trust section at 2048×1246, 1440×1000, 768×1024, and 390×844 under `/tmp/lakearrow-extreme-veil/`.
- [ ] Print local JSON for height, row count, maximum RGB distance, maximum luminance delta, artwork display, margins, clipping, adjacency, and horizontal overflow for both tapers.
- [ ] Inspect all 12 crops and reject any dark rectangular framing, bright rim, band, asset edge, endpoint hold, or visibly unbalanced taper.
- [ ] Require `git diff --name-only origin/main...HEAD` to contain only the approved spec, plan, `src/app/ui-system.css`, and `tests/ui-audit.spec.ts`; require clean nested scope and `git diff --check`.

### Task 4: Publish to main and verify production

- [ ] Push `codex/extreme-trust-veil`, create a focused PR to `main`, and wait for `Vercel – 399rainier`, `Vercel – lakearrowheadaframe`, and `Vercel Preview Comments`.
- [ ] Read `headRefOid` and merge with `gh pr merge <PR> --merge --match-head-commit <headRefOid>`.
- [ ] Fetch `origin/main`, require it to equal the PR merge commit, and poll both Vercel production contexts to success.
- [ ] Repeat the same JSON measurements and 12 trust-composition crops on `https://lakearrowheadaframe.com/` using `production-` artifact names.
- [ ] Visually inspect every production crop before completion.
