# Soft Arrival Dissolve Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the compressed, artwork-overlaid arrival transition with the approved long atmospheric dissolve and verify its smoothness on pixels and production captures.

**Architecture:** Preserve the existing chapter markup and scoped override architecture. Extend the arrival bridge at each responsive tier, remove its decorative artwork from rendering, and paint one continuous green-biased linear wash whose adjacent screenshot rows cannot introduce a visible contrast jump.

**Tech Stack:** Next.js 16, scoped CSS, Playwright, TypeScript

---

## File Structure

- Modify `tests/ui-audit.spec.ts`: update arrival geometry expectations and add row-by-row smoothness/artwork-removal assertions.
- Modify `src/app/ui-system.css`: own the responsive dissolve geometry, smooth wash, and removal of arrival bridge art/pines.
- Do not modify `src/app/globals.css`, React markup, assets, or parent-site files.

### Task 1: Add the failing dissolve contract

**Files:**
- Modify: `tests/ui-audit.spec.ts`

- [ ] **Step 1: Add an isolated center-column row sampler**

Reuse the existing wash screenshot isolation and return every center-column RGB row rather than only fractional samples.

```ts
async function sampleCenterColumn(locator: Locator) {
  const screenshot = await locator.screenshot({
    style: ".scene-bridge-art, .scene-bridge-pines { visibility: hidden !important; }",
  });
  return locator.page().evaluate(async (dataUrl) => {
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas context unavailable");
    context.drawImage(image, 0, 0);
    return Array.from({ length: image.height }, (_, y) =>
      Array.from(context.getImageData(Math.floor(image.width / 2), y, 1, 1).data.slice(0, 3)),
    );
  }, `data:image/png;base64,${screenshot.toString("base64")}`);
}
```

- [ ] **Step 2: Update responsive arrival geometry**

In the existing `restrained treeline transitions` test, change only arrival expectations to 96px at 2048×1246, 72px at 768×1024, and 56px at 390×844. Preserve trust bridge expectations and all adjacency/overflow checks.

- [ ] **Step 3: Add the smooth-dissolve behavior test**

For each fixture—2048×1246, 768×1024, and 390×844—assert:

- `.scene-bridge--arrival-trust .scene-bridge-art` and both `.scene-bridge-pines` have `display: none`;
- the isolated wash has the expected 96, 72, or 56 rows;
- first/last rows match parchment/forest within the existing 8-channel screenshot tolerance;
- for rows 28% through 88%, `max(rgb) - min(rgb) >= 8`, green is at least red, and green is at least blue;
- every adjacent-row Euclidean RGB distance is `<= 12`;
- every adjacent-row Rec. 709 luminance delta is `<= 5`.

- artwork is `display: none`;
- height, hidden overflow, zero margins, exact adjacency, and no horizontal overflow match the existing transition contract.

Structure the test around the three fixtures so no responsive assertion is desktop-only.

- [ ] **Step 4: Run the focused tests and verify RED**

```bash
cd lakearrowheadaframe
npx playwright test tests/ui-audit.spec.ts --grep "restrained treeline transitions|long atmospheric dissolve"
```

Expected: FAIL because the arrival bridge is currently 60/52/40px and its art/pines remain rendered.

- [ ] **Step 5: Commit the failing contract**

```bash
cd lakearrowheadaframe
git add tests/ui-audit.spec.ts
git commit -m "test: define smooth arrival dissolve"
```

### Task 2: Implement the approved dissolve

**Files:**
- Modify: `src/app/ui-system.css`
- Test: `tests/ui-audit.spec.ts`

- [ ] **Step 1: Set responsive geometry**

Use 6rem desktop, 4.5rem tablet, and 3.5rem mobile for `.scene-bridge--arrival-trust`, keeping matching `min-height`, hidden overflow, and zero margins.

- [ ] **Step 2: Remove overlapping arrival bridge artwork**

Set `display: none` on the arrival bridge's `.scene-bridge-art` and `.scene-bridge-pines`. Scope the selectors to `.scene-bridge--arrival-trust` so later decorative transitions are unchanged.

- [ ] **Step 3: Paint one continuous atmospheric wash**

Use this endpoint-owned gradient:

```css
background: linear-gradient(
  180deg,
  var(--bridge-from) 0%,
  #c8cec1 16%,
  #abb6a8 32%,
  #8a9a8b 48%,
  #69796b 64%,
  #465548 80%,
  var(--bridge-to) 100%
);
```

These stops distribute luminance across the full height rather than compressing the darkest change into the final 10%. Before committing, the focused pixel test must prove the gradient satisfies `RGB distance <= 12` and `luminance delta <= 5` at the 56px mobile raster; if it does not, revise the stop colors/positions—not the approved thresholds. Do not add filters, blur, pseudo-elements, or overlapping art.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run the Task 1 command. Expected: both tests pass at all required viewports.

- [ ] **Step 5: Commit the implementation**

```bash
cd lakearrowheadaframe
git add src/app/ui-system.css
git commit -m "fix: soften arrival chapter dissolve"
```

### Task 3: Full QC

**Files:** Verify only.

- [ ] **Step 1: Run complete static and browser verification**

```bash
cd lakearrowheadaframe
npm run lint
npm run typecheck
npm run build
npm test
```

Expected: all commands pass and the production build generates all 15 routes.

- [ ] **Step 2: Capture QC evidence outside the repository**

Start the production build locally and run a temporary Playwright script from the nested app directory with Chromium, `deviceScaleFactor: 1`, reduced motion, and animations disabled. For each of 2048×1246, 1440×1000, 768×1024, and 390×844:

- navigate with `waitUntil: "domcontentloaded"`, wait for `document.fonts.ready`, and wait one render frame;
- obtain the arrival bridge bounding box;
- save a full-page image as `/tmp/lakearrow-soft-dissolve/local-<width>x<height>-full.png`;
- save 320px-wide crops at left (`x=0`), center (`x=(viewportWidth-320)/2`), and right (`x=viewportWidth-320`), with `y=bridge.y-160` and height `bridge.height+320`, named `local-<width>x<height>-<edge>.png`;
- run the same center-column RGB/luminance analysis used by the regression and print JSON results.

Inspect all captures for dark stripes, abrupt row changes, neutral gray, rectangular asset edges, muddy overlaps, clipping, and horizontal overflow. Reject the implementation if any edge crop reads as a separate bar.

- [ ] **Step 3: Verify protected scope**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git diff --check -- lakearrowheadaframe
git diff --name-only origin/main...HEAD
```

Expected branch diff allowlist after implementation:

```text
lakearrowheadaframe/docs/superpowers/plans/2026-08-06-soft-arrival-dissolve.md
lakearrowheadaframe/docs/superpowers/specs/2026-08-06-soft-arrival-dissolve-design.md
lakearrowheadaframe/src/app/ui-system.css
lakearrowheadaframe/tests/ui-audit.spec.ts
```

No markup, asset, `globals.css`, or parent-site path is permitted. The nested app must have no uncommitted changes.

### Task 4: Publish and verify production

- [ ] Push `codex/soft-arrival-dissolve`, open a focused PR to `main`, and verify `git diff --name-only origin/main...HEAD` exactly matches the four-file allowlist above.
- [ ] Wait for `Vercel – 399rainier`, `Vercel – lakearrowheadaframe`, and `Vercel Preview Comments` to pass with `gh pr checks <PR> --watch`.
- [ ] Read the PR `headRefOid`, then merge with `gh pr merge <PR> --merge --match-head-commit <headRefOid>`.
- [ ] Wait for the post-merge production deployment on `https://lakearrowheadaframe.com/`.
- [ ] Read the PR `mergeCommit.oid`, fetch `origin/main`, require the remote SHA to match, and poll that commit's GitHub status until both Vercel contexts report success.
- [ ] Re-run the exact temporary Playwright procedure from Task 3 against the custom domain, changing the artifact prefix from `local-` to `production-`; repeat responsive geometry, full-row RGB/luminance analysis, overflow checks, and identical left/center/right crops.
- [ ] Visually inspect the production crops before declaring completion.
