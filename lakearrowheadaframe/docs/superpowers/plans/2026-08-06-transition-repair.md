# Restrained Treeline Transition Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's broad gray transition bands with shallow, endpoint-colored treeline edges and tighten the oversized trust chapter spacing.

**Architecture:** Keep chapter backgrounds and markup unchanged. Add regression coverage that measures bridge geometry and samples rendered gradient pixels, then implement the repair exclusively in the scoped `ui-system.css` override layer so the recovered `globals.css` baseline remains protected.

**Tech Stack:** Next.js 16, React 19, scoped CSS, Playwright, TypeScript

---

## File Structure

- Modify `lakearrowheadaframe/tests/ui-audit.spec.ts`: add rendered-pixel sampling and transition geometry regression assertions at the supplied 2048 × 1246 viewport plus mobile.
- Modify `lakearrowheadaframe/src/app/ui-system.css`: own the repaired bridge heights, clipping, endpoint-colored gradients, restrained artwork opacity, and trust chapter spacing.
- Do not modify `lakearrowheadaframe/src/app/globals.css` or component markup.

### Task 1: Add the failing transition regression contract

**Files:**
- Modify: `lakearrowheadaframe/tests/ui-audit.spec.ts`

- [ ] **Step 1: Add a rendered-pixel sampling helper**

Add a helper that screenshots a locator, loads the PNG buffer into an in-page canvas via a data URL, and returns center-column RGB values at requested vertical fractions. This verifies the actual painted gradient rather than merely parsing CSS text.

```ts
async function sampleVerticalPixels(locator: Locator, fractions: number[]) {
  const screenshot = await locator.screenshot({
    style: ".scene-bridge-art, .scene-bridge-pines { visibility: hidden !important; }",
  });
  return locator.page().evaluate(
    async ({ dataUrl, fractions }) => {
      const image = new Image();
      image.src = dataUrl;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Canvas context unavailable");
      context.drawImage(image, 0, 0);
      return fractions.map((fraction) => {
        const y = Math.min(image.height - 1, Math.max(0, Math.round((image.height - 1) * fraction)));
        return Array.from(context.getImageData(Math.floor(image.width / 2), y, 1, 1).data.slice(0, 3));
      });
    },
    { dataUrl: `data:image/png;base64,${screenshot.toString("base64")}`, fractions },
  );
}
```

The injected screenshot style isolates the painted wash from sibling artwork. Test the real composed bridge separately by asserting pine opacity `<= 0.24`, art opacity `<= 0.18`, and clipping on the bridge owner.

- [ ] **Step 2: Add the supplied-viewport transition test**

At 2048 × 1246 assert:

- arrival-to-trust height is 60px and trust-to-interior height is 56px;
- both bridges have `overflow: hidden`, zero block margins, and no layout gap/overlap;
- trust inner top/bottom padding is between 72px and 96px;
- arrival bridge samples at 0%, 60%, 82%, and 100% start at parchment, remain green-biased, and finish at forest;
- trust bridge samples at 0%, 64%, 84%, and 100% start at forest, remain green-biased, and finish at sage;
- endpoints stay within 2 RGB channel values of the expected adjacent-surface color (to allow rasterization rounding);
- every intermediate sample has `max(rgb) - min(rgb) >= 8` and its green channel is at least as large as its red and blue channels, preventing a broad neutral-gray band.

At 768 × 1024 assert 52px and 48px bridge heights. At 390 × 844 assert 40px and 36px. At both responsive sizes assert computed `overflow: hidden`, zero block margins, exact adjacency with the neighboring surfaces within 2px, and no horizontal document overflow.

- [ ] **Step 3: Run the focused test and verify RED**

Run:

```bash
cd lakearrowheadaframe
npx playwright test tests/ui-audit.spec.ts --grep "restrained treeline transitions"
```

Expected: FAIL because current bridge heights are 112px/96px at desktop and 72px/64px on mobile, the trust padding reaches 128px, and the current full-height interpolation produces disallowed neutral midpoint samples.

- [ ] **Step 4: Commit the failing contract**

```bash
cd lakearrowheadaframe
git add tests/ui-audit.spec.ts
git commit -m "test: cover restrained chapter transitions"
```

### Task 2: Implement the scoped transition repair

**Files:**
- Modify: `lakearrowheadaframe/src/app/ui-system.css`
- Test: `lakearrowheadaframe/tests/ui-audit.spec.ts`

- [ ] **Step 1: Separate trust spacing from the shared section rule**

Keep the existing shared padding for interior/gallery surfaces, then give the trust inner its own desktop range:

```css
.site-illustrated .trust-forest-floor .scene-chapter-inner {
  padding-top: clamp(4.5rem, 5vw, 6rem);
  padding-bottom: clamp(4.5rem, 5vw, 6rem);
}
```

For mobile below 600px, use `4.5rem` on both sides.

- [ ] **Step 2: Set exact shallow bridge geometry and clipping**

Use:

```css
.site-illustrated .clearing-home .scene-bridge--arrival-trust {
  height: 3.75rem;
  min-height: 3.75rem;
  overflow: hidden;
}

.site-illustrated .clearing-home .scene-bridge--trust-interior {
  height: 3.5rem;
  min-height: 3.5rem;
  overflow: hidden;
}
```

Below 600px use `2.5rem` and `2.25rem`. Preserve zero margins and normal-flow ownership.

From 600px through 899px use `3.25rem` (52px) and `3rem` (48px), preserving the same clipping and flow ownership.

- [ ] **Step 3: Replace the generic full-height wash for the two affected bridges**

Use asymmetrical, endpoint-owned gradients:

```css
.site-illustrated .clearing-home .scene-bridge--arrival-trust .scene-bridge-wash {
  background: linear-gradient(
    180deg,
    var(--bridge-from) 0 52%,
    #cfd3c2 66%,
    #748476 80%,
    #3d5042 91%,
    var(--bridge-to) 100%
  );
}

.site-illustrated .clearing-home .scene-bridge--trust-interior .scene-bridge-wash {
  background: linear-gradient(
    180deg,
    var(--bridge-from) 0 56%,
    #3b493e 70%,
    #718071 83%,
    #b9c1b1 94%,
    var(--bridge-to) 100%
  );
}
```

The exact endpoint variables must remain the first and last colors. Intermediate colors are deliberately green-biased and non-neutral.

- [ ] **Step 4: Restrain treeline artwork**

For the arrival bridge, cap pine opacity at `0.24`, floor artwork opacity at `0.18`, keep artwork inside the bridge, and avoid black full-height side walls. The trust-to-interior bridge remains wash-only with all decorative overflow clipped.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run the focused test from Task 1. Expected: PASS.

- [ ] **Step 6: Commit the implementation**

```bash
cd lakearrowheadaframe
git add src/app/ui-system.css
git commit -m "fix: repair homepage transition bands"
```

### Task 3: Verify the full visual and functional surface

**Files:**
- Verify only; do not update the committed screenshot archive unless a contract intentionally changes.

- [ ] **Step 1: Run static verification**

```bash
cd lakearrowheadaframe
npm run lint
npm run typecheck
npm run build
```

Expected: all pass; build emits all 15 rental pages.

- [ ] **Step 2: Run the complete Playwright suite**

```bash
cd lakearrowheadaframe
npm test
```

Expected: all tests pass, including existing boundary, interaction, image, and continuity contracts.

- [ ] **Step 3: Capture visual evidence outside the repository**

Capture full-page and transition-focused PNGs at 2048 × 1246, 1440 × 1000, 768 × 1024, and 390 × 844 under `/tmp/lakearrow-transition-repair/`. Visually confirm:

- no gray slab or hard seam;
- shallow, green-biased transitions;
- restrained pines;
- compact trust chapter;
- populated images/map;
- no clipping or horizontal overflow.

- [ ] **Step 4: Verify protected scope**

```bash
cd lakearrowheadaframe
git diff --check -- .
git diff fecd5ecd..HEAD -- src/app/globals.css
git status --short -- .
```

Expected: no `globals.css` post-baseline diff and no uncommitted rental changes.

### Task 4: Publish and verify production

**Files:**
- No further source changes expected.

- [ ] **Step 1: Push the focused branch and open a PR to `main`**

PR body must include the screenshot-reproduced root cause, exact CSS repair, test results, and visual evidence locations.

- [ ] **Step 2: Merge with an expected-head-SHA guard after checks pass**

Do not stage or publish unrelated parent-site changes.

- [ ] **Step 3: Verify the production custom domain**

At `https://lakearrowheadaframe.com/`, verify the new deployment ID, route 200s, bridge geometry, rendered pixel samples, no horizontal overflow, image/map readiness, and desktop/mobile screenshots. Do not declare completion from a Vercel deployment URL alone.
