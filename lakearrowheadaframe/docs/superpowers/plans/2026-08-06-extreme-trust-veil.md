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
- [ ] For each bridge at each viewport assert: exact CSS height; screenshot row count of height or height+1; exact computed endpoint colors; raster endpoints within ±8/channel; every original adjacent-row Euclidean 8-bit-sRGB distance `<= 8`; Rec. 709 delta `<= 3`; art/pines `display:none`; hidden overflow; zero margins; adjacency within 2px; no horizontal overflow.
- [ ] Define intermediate green-bias membership using each source raster row's normalized pixel center: `position = (rowIndex + 0.5) / sourceRowCount`. Apply green >= red/blue and channel spread >=5 only when `position >= 0.16 && position <= 0.90`; keep first/last source rows for endpoints and every original adjacent source-row pair for deltas.
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
- [ ] Add an environment-gated `trust veil QC captures and reports metrics` Playwright test inside `tests/ui-audit.spec.ts`. Skip unless `UI_AUDIT_CAPTURE_DIR` is set; use `UI_AUDIT_TARGET_URL` when present, otherwise `/`. This preserves the reusable capture/measurement implementation inside the existing allowed test file.
- [ ] The QC test must use Chromium with project `deviceScaleFactor:1`, reduced motion, injected `animation:none/transition:none`, `document.fonts.ready`, one animation frame, and readiness of all non-empty-alt images inside arrival/trust/interior. For 2048×1246, 1440×1000, 768×1024, and 390×844, compute `compositionTop = arrivalBridge.y - 160` and `compositionBottom = exitBridge.y + exitBridge.height + 160`; clamp to document bounds. Capture full page plus 320px-wide left (`x=0`), center (`x=(viewportWidth-320)/2`), and right (`x=viewportWidth-320`) crops using that identical vertical clip.
- [ ] Use deterministic names `<prefix>-<width>x<height>-full.png` and `<prefix>-<width>x<height>-<left|center|right>.png`, where `UI_AUDIT_CAPTURE_PREFIX` is `local` or `production`. Write `<prefix>-metrics.json` containing target URL, viewport, both bridge metrics (CSS height, source row count, endpoints, maximum RGB/luminance deltas, artwork display, margins, clipping, adjacency), horizontal overflow, and all artifact filenames. Write `<prefix>-manifest.json` as the sorted artifact filename list.
- [ ] The QC test must reuse the same measurement/assertion helper as the maximum-veil contract test. It must fail—not merely report—if either bridge violates geometry, source-row count, exact computed endpoints, ±8 raster endpoints, RGB `<=8`, luminance `<=3`, pixel-center green bias, art removal, margins, clipping, adjacency, or horizontal overflow at any viewport.
- [ ] Run local QC with `UI_AUDIT_CAPTURE_DIR=/tmp/lakearrow-extreme-veil UI_AUDIT_CAPTURE_PREFIX=local npx playwright test tests/ui-audit.spec.ts --grep "trust veil QC"` against the configured local web server.
- [ ] Inspect all 16 local images (4 full pages plus 12 crops) and reject any dark rectangular framing, bright rim, band, asset edge, endpoint hold, or visibly unbalanced taper.
- [ ] Require `git diff --name-only origin/main...HEAD` to contain only the approved spec, plan, `src/app/ui-system.css`, and `tests/ui-audit.spec.ts`; require clean nested scope and `git diff --check`.

### Task 4: Publish to main and verify production

- [ ] Push `codex/extreme-trust-veil`, create a focused PR to `main`, and wait for `Vercel – 399rainier`, `Vercel – lakearrowheadaframe`, and `Vercel Preview Comments`.
- [ ] Read `headRefOid` and merge with `gh pr merge <PR> --merge --match-head-commit <headRefOid>`.
- [ ] Before merge, record the vanity domain's `x-vercel-id` and sorted host-independent Next.js CSS/JS asset paths (including content hashes, excluding origin/query) as the old fingerprint. After merge, fetch `origin/main`, require it to equal the PR merge commit, and poll both Vercel commit contexts to success.
- [ ] Query GitHub Deployments for the exact merge SHA and its deployment statuses. Select the successful `Production` deployment for `lakearrowheadaframe`, obtain its `environment_url`, require HTTP 200, and record its sorted Next.js CSS/JS asset fingerprint. This resolved deployment is the commit-bound source of truth.
- [ ] Poll `https://lakearrowheadaframe.com/` until its `x-vercel-id` differs from the pre-merge value and its sorted host-independent Next.js CSS/JS asset-path/content-hash fingerprint exactly matches the merge-SHA deployment URL. Only then is alias convergence proven.
- [ ] Run `UI_AUDIT_CAPTURE_DIR=/tmp/lakearrow-extreme-veil UI_AUDIT_CAPTURE_PREFIX=production UI_AUDIT_TARGET_URL=https://lakearrowheadaframe.com/ npx playwright test tests/ui-audit.spec.ts --grep "trust veil QC"` and require all metrics plus all 16 images.
- [ ] Visually inspect all 16 production images (4 full pages plus 12 crops) before completion.
