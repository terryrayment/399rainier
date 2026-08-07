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

At 2048×1246 assert:

- `.scene-bridge--arrival-trust .scene-bridge-art` and both `.scene-bridge-pines` have `display: none`;
- the isolated wash has 96 rows;
- first/last rows match parchment/forest within the existing 8-channel screenshot tolerance;
- for rows 28% through 88%, `max(rgb) - min(rgb) >= 8`, green is at least red, and green is at least blue;
- every adjacent-row Euclidean RGB distance is `<= 12`;
- every adjacent-row Rec. 709 luminance delta is `<= 5`.

Repeat the row-distance and luminance checks at 768×1024 and 390×844 to cover 72px and 56px rasterization.

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
  #e2e3d7 16%,
  #d4d9cc 32%,
  #bbc5b8 48%,
  #98a697 64%,
  #718071 78%,
  #465548 90%,
  var(--bridge-to) 100%
);
```

Do not add filters, blur, pseudo-elements, or overlapping art.

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

Capture full pages and identical left/center/right boundary crops at 2048×1246, 1440×1000, 768×1024, and 390×844 under `/tmp/lakearrow-soft-dissolve/`.

Inspect all captures for dark stripes, abrupt row changes, neutral gray, rectangular asset edges, muddy overlaps, clipping, and horizontal overflow. Reject the implementation if any edge crop reads as a separate bar.

- [ ] **Step 3: Verify protected scope**

```bash
cd lakearrowheadaframe
git diff --check -- .
git diff fecd5ecd..HEAD -- src/app/globals.css
git status --short -- .
```

Expected: no protected baseline change and a clean nested-app scope.

### Task 4: Publish and verify production

- [ ] Push `codex/soft-arrival-dissolve`, open a focused PR to `main`, and wait for both Vercel checks.
- [ ] Merge with an expected-head-SHA guard.
- [ ] Wait for the post-merge production deployment on `https://lakearrowheadaframe.com/`.
- [ ] Re-run the responsive geometry, full-row RGB/luminance analysis, overflow checks, and identical left/center/right crops against the custom domain.
- [ ] Visually inspect the production crops before declaring completion.
