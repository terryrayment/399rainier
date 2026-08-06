# Lake Arrowhead A-Frame Visual UI Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Correct the recovered Lake Arrowhead rental site’s visual hierarchy, chapter transitions, responsive gallery and ritual layouts, and interaction accessibility without changing content, routes, SEO, analytics, weather behavior, or booking destinations.

**Architecture:** Keep the recovered production-equivalent `src/app/globals.css` untouched. Import a new `src/app/ui-system.css` after it so all intentional design-system tokens and corrective overrides are isolated and reviewable. Make only the small markup changes required to remove duplicate decorative ownership; use Playwright geometry and interaction tests to lock the approved 600px/900px responsive contract.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, CSS, Playwright 1.62, ESLint 9.

---

## Guardrails

- Work only in `/Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe`. The temporary top-level audit helper is untracked and must remain untouched.
- Treat the rest of the dirty repository as user-owned. Every `git add` command below names exact nested files; never stage the repository wholesale.
- Do not edit `src/app/globals.css`. It is the recovered deployed baseline.
- Do not change copy, routes, metadata, structured data, analytics, weather logic, image alternative text, or Airbnb campaign/content parameters.
- Do not deploy.
- Store generated audit screenshots locally under `lakearrowheadaframe/docs/ui-audit/`; ignore them from Git because they are large. Report their absolute paths at handoff.

## Task 1: Make the recovered app a safe, reproducible baseline

**Files:**

- Create: `lakearrowheadaframe/.gitignore`
- Modify: `lakearrowheadaframe/package.json`
- Modify: `lakearrowheadaframe/eslint.config.mjs`
- Existing baseline to stage: `lakearrowheadaframe/src/**`, `lakearrowheadaframe/public/**`, `lakearrowheadaframe/package-lock.json`, `lakearrowheadaframe/tsconfig.json`, `lakearrowheadaframe/next.config.ts`, `lakearrowheadaframe/eslint.config.mjs`

**Step 1: Record the immutable comparison point**

Run before changing or staging any implementation file:

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git rev-parse HEAD > /tmp/lakearrowheadaframe-ui-audit-base-sha
{ git status --short | rg -v '^.. lakearrowheadaframe/' || true; } > /tmp/lakearrowheadaframe-ui-audit-start-status.txt
```

Expected: both files exist. Use `UI_AUDIT_BASE_SHA=$(</tmp/lakearrowheadaframe-ui-audit-base-sha)` in the final review so the diff covers every commit in this pass without guessing a `HEAD~N` count.

**Step 2: Add nested build and audit ignores**

Create `lakearrowheadaframe/.gitignore`:

```gitignore
/node_modules/
/.next/
/.next-playwright/
/.superpowers/
/docs/screenshots/
/docs/ui-audit/
*.tsbuildinfo
next-env.d.ts
```

This keeps generated recovery/build/audit output out of the commit without relying on the root-anchored top-level ignore rules.

**Step 3: Exclude the isolated Next test build from ESLint**

Change the final line of `eslint.config.mjs` to:

```js
globalIgnores([
  ".next/**",
  ".next-playwright/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
]),
```

`.gitignore` does not control ESLint flat-config traversal; this explicit ignore prevents generated `.next-playwright/**` code from failing the lint gate.

**Step 4: Add the browser test scripts**

Add these scripts to `lakearrowheadaframe/package.json` while preserving the existing scripts:

```json
"test": "playwright test",
"test:ui": "playwright test tests/ui-audit.spec.ts",
"test:ui:update": "UPDATE_UI_SCREENSHOTS=1 playwright test tests/ui-audit.spec.ts"
```

**Step 5: Verify the recovered baseline before staging it**

Run:

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run typecheck
npm run build
```

Expected: both exit 0 and Next lists all recovered routes. No styling change has happened yet.

**Step 6: Review exact staged scope**

Run:

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git status --short -- lakearrowheadaframe
git add lakearrowheadaframe/.gitignore lakearrowheadaframe/package.json lakearrowheadaframe/package-lock.json lakearrowheadaframe/tsconfig.json lakearrowheadaframe/next.config.ts lakearrowheadaframe/eslint.config.mjs lakearrowheadaframe/src lakearrowheadaframe/public
git diff --cached --stat
```

Expected: only the nested rental app baseline and package metadata are staged. The top-level sales app and generated folders are absent.

**Step 7: Commit the recovered baseline**

```bash
git commit -m "chore: restore rental site source baseline"
```

## Task 2: Add failing Playwright contracts for the approved responsive system

**Files:**

- Create: `lakearrowheadaframe/playwright.config.ts`
- Create: `lakearrowheadaframe/tests/fixtures/home-links.ts`
- Create: `lakearrowheadaframe/tests/ui-audit.spec.ts`

**Step 1: Configure an isolated production-like test server**

Create `playwright.config.ts` exactly as follows:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-first-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

Do not use snapshot comparison as the primary correctness signal. Geometry and computed styles make the breakpoint contract deterministic; final screenshots remain human-reviewed evidence.

**Step 2: Commit exact navigation and booking fixtures**

Create `tests/fixtures/home-links.ts`. The literal values intentionally do not import production URL builders, so an implementation-time destination or campaign change fails:

```ts
export const expectedInternalHrefs = [
  "/",
  "/#gallery",
  "/burnout-reset",
  "/chapters",
  "/classic",
  "/dog-friendly-lake-arrowhead-cabin",
  "/holiday-ready",
  "/lake-arrowhead-a-frame-cabin",
  "/lake-arrowhead-cabin-with-sauna",
  "/shoreline-rights",
  "/weekend-from-los-angeles",
] as const;

export const allowedSeasonalHrefs = [
  "/holiday-ready#thanksgiving",
  "/holiday-ready#christmas",
  "/holiday-ready#new-year",
  "/holiday-ready#valentines",
  "/holiday-ready#halloween",
  "/holiday-ready#fourth-of-july",
] as const;

const listing = "https://airbnb.com/h/lakearrowheadcabinrental";
const tracking = "utm_source=lakearrowheadaframe&utm_medium=website";

export const expectedAirbnbHrefs = [
  `${listing}?${tracking}&utm_campaign=footer&utm_content=footer-cta`,
  `${listing}?${tracking}&utm_campaign=homepage&utm_content=final-cta`,
  `${listing}?${tracking}&utm_campaign=homepage&utm_content=gallery-cta`,
  `${listing}?${tracking}&utm_campaign=homepage&utm_content=hero-mobile`,
  `${listing}?${tracking}&utm_campaign=nav&utm_content=nav-cta`,
  `${listing}?${tracking}&utm_campaign=nav&utm_content=nav-mobile-cta`,
] as const;

export const expectedStickyAirbnbHref =
  `${listing}?${tracking}&utm_campaign=homepage&utm_content=mobile-sticky`;
```

**Step 3: Build shared browser helpers**

In `tests/ui-audit.spec.ts`, define:

```ts
const requiredViewports = [
  { name: "desktop-1440x1000", width: 1440, height: 1000 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "tablet-1024x768", width: 1024, height: 768 },
  { name: "tablet-769x900", width: 769, height: 900 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-767x900", width: 767, height: 900 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-375x667", width: 375, height: 667 },
] as const;

const boundaryWidths = [599, 600, 767, 768, 769, 899, 900, 901] as const;
```

Add helpers that:

- navigate to `/` and wait for `document.fonts.ready`;
- scroll a requested section into view before measuring it;
- wait until all `img` elements currently in the document are either decorative or have `naturalWidth > 0` after lazy-scrolling the page;
- return computed grid-column counts using `getComputedStyle(element).gridTemplateColumns.split(" ").length`;
- compare bounding boxes with a 2px tolerance;
- report horizontal overflow as `document.documentElement.scrollWidth - document.documentElement.clientWidth`.

Use these exact helper signatures so later steps can add assertions without inventing new test infrastructure:

```ts
import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  expectedAirbnbHrefs,
  expectedInternalHrefs,
  expectedStickyAirbnbHref,
  allowedSeasonalHrefs,
} from "./fixtures/home-links";

async function openHome(page: Page, width: number, height = 900) {
  await page.setViewportSize({ width, height });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

async function lazyScroll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
  });
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll<HTMLImageElement>('img:not([alt=""])'))
      .every((image) => image.complete && image.naturalWidth > 0),
    undefined,
    { timeout: 15_000 },
  );
  await page.evaluate(() => scrollTo(0, 0));
}

async function columns(locator: Locator) {
  return locator.evaluate((element) => {
    const value = getComputedStyle(element).gridTemplateColumns;
    return value === "none" ? 1 : value.split(" ").filter(Boolean).length;
  });
}

async function bounds(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box!;
}

function expectInside(child: { x: number; y: number; width: number; height: number }, parent: { x: number; y: number; width: number; height: number }) {
  expect(child.x).toBeGreaterThanOrEqual(parent.x - 2);
  expect(child.y).toBeGreaterThanOrEqual(parent.y - 2);
  expect(child.x + child.width).toBeLessThanOrEqual(parent.x + parent.width + 2);
  expect(child.y + child.height).toBeLessThanOrEqual(parent.y + parent.height + 2);
}
```

**Step 4: Write the responsive geometry contract**

For each `boundaryWidths` value at height 900:

- below 600px, assert `.editorial-gallery-grid` and `.ritual-sequence-steps` each have one computed column;
- 600–899px, assert both have two computed columns, `.editorial-gallery-dominant` spans the full gallery width, and the third `.ritual-step` spans the full ritual grid width;
- 900px and above, assert the gallery has its dominant/supporting desktop composition, the ritual has three columns, and the third ritual card does not span the full grid;
- below 900px, assert `.site-nav-menu-trigger` is visible and `.site-nav-links` is hidden;
- 900px and above, assert the inverse.

Also assert `.editorial-gallery-details` is one column below 600px, three equal columns at 600px and above, and every `.editorial-gallery-frame`, `.editorial-gallery-detail`, `.ritual-step`, and `.ritual-step-proof` has positive width/height and stays inside its parent bounds.

Implement this as a table-driven `test.describe("responsive geometry")` block. Use `test.beforeEach` only for shared navigation, and put each width in its own named test so a failing boundary is obvious. For the desktop gallery, assert `columns(.editorial-gallery-grid) === 2`, dominant width is greater than supporting-column width, and `.editorial-gallery-mediums` has two rows. Do not infer layout mode from screenshot appearance.

Use this executable core:

```ts
test.describe("responsive geometry", () => {
  for (const width of boundaryWidths) {
    test(`${width}px follows the 600/900 contract`, async ({ page }) => {
      await openHome(page, width);
      const gallery = page.locator(".editorial-gallery-grid");
      const details = page.locator(".editorial-gallery-details");
      const ritual = page.locator(".ritual-sequence-steps");
      await gallery.scrollIntoViewIfNeeded();

      if (width < 600) {
        expect(await columns(gallery)).toBe(1);
        expect(await columns(details)).toBe(1);
        expect(await columns(ritual)).toBe(1);
      } else if (width < 900) {
        expect(await columns(gallery)).toBe(2);
        expect(await columns(details)).toBe(3);
        expect(await columns(ritual)).toBe(2);
        const gridBox = await bounds(gallery);
        const dominantBox = await bounds(page.locator(".editorial-gallery-dominant"));
        const ritualBox = await bounds(ritual);
        const thirdBox = await bounds(page.locator(".ritual-step").nth(2));
        expect(Math.abs(dominantBox.width - gridBox.width)).toBeLessThanOrEqual(2);
        expect(Math.abs(thirdBox.width - ritualBox.width)).toBeLessThanOrEqual(2);
      } else {
        expect(await columns(gallery)).toBe(2);
        expect(await columns(details)).toBe(3);
        expect(await columns(ritual)).toBe(3);
        const dominantBox = await bounds(page.locator(".editorial-gallery-dominant"));
        const supportingBox = await bounds(page.locator(".editorial-gallery-mediums"));
        const ritualBox = await bounds(ritual);
        const thirdBox = await bounds(page.locator(".ritual-step").nth(2));
        expect(dominantBox.width).toBeGreaterThan(supportingBox.width);
        expect(thirdBox.width).toBeLessThan(ritualBox.width / 2);
      }

      if (width < 900) {
        await expect(page.locator(".site-nav-menu-trigger")).toBeVisible();
        await expect(page.locator(".site-nav-links")).toBeHidden();
      } else {
        await expect(page.locator(".site-nav-menu-trigger")).toBeHidden();
        await expect(page.locator(".site-nav-links")).toBeVisible();
      }

      for (const selector of [
        ".editorial-gallery-frame",
        ".editorial-gallery-detail",
        ".ritual-step",
        ".ritual-step-proof",
      ]) {
        for (const item of await page.locator(selector).all()) {
          const itemBox = await bounds(item);
          expect(itemBox.width).toBeGreaterThan(0);
          expect(itemBox.height).toBeGreaterThan(0);
        }
      }
    });
  }
});
```

**Step 5: Write global visual integrity checks**

For each `requiredViewports` entry:

- assert zero horizontal document overflow;
- lazy-scroll from top to bottom in increments no larger than one viewport, wait for images, and assert every meaningful image has nonzero natural dimensions;
- assert the hero `h1` width does not exceed its container and its computed `max-width` resolves to no more than 14 average headline characters at desktop while remaining within the mobile viewport;
- assert visible primary controls (`button`, `.airbnb-button`, `.booking-pill a`, `.site-nav a`) have a minimum smaller dimension of 44px, excluding ordinary inline editorial/footer text links by selector;
- assert section rectangles are monotonically ordered in document flow and adjacent chapter rectangles do not overlap by more than 2px;
- assert `.scene-bridge--arrival-trust` resolves from parchment to forest and `.scene-bridge--trust-interior` from forest to sage;
- assert the Place owner begins at dusk (`rgb(28, 42, 56)`), resolves to parchment (`rgb(234, 231, 216)`) before `.place-truth-grid`, and the Final owner resolves from parchment to night (`rgb(14, 20, 18)`). Use the owning section’s computed background/background-image contract, not pixel screenshot sampling.

Use this executable integrity core:

```ts
test.describe("visual integrity", () => {
  for (const viewport of requiredViewports) {
    test(`${viewport.name} has stable flow`, async ({ page }) => {
      await openHome(page, viewport.width, viewport.height);
      await lazyScroll(page);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      const brokenImages = await page.locator('img:not([alt=""])').evaluateAll(
        (images) => images.filter((image) => !(image as HTMLImageElement).naturalWidth).length,
      );
      expect(brokenImages).toBe(0);

      const headline = await bounds(page.locator(".arrival-clearing-headline"));
      const heroCopy = await bounds(page.locator(".arrival-clearing-copy"));
      expect(headline.width).toBeLessThanOrEqual(heroCopy.width + 2);

      const chapterBoxes = await page
        .locator(".clearing-home > .scene-chapter, .clearing-home > .scene-bridge")
        .evaluateAll((elements) => elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
        }));
      for (let index = 1; index < chapterBoxes.length; index += 1) {
        expect(chapterBoxes[index]!.top)
          .toBeGreaterThanOrEqual(chapterBoxes[index - 1]!.bottom - 2);
      }

      for (const control of await page.locator(
        ".site-nav-menu-trigger:visible, .airbnb-button:visible, .booking-pill-submit:visible, .site-nav-brand:visible, .site-nav-links a:visible, .site-nav-mobile-panel a:visible",
      ).all()) {
        const box = await bounds(control);
        expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44);
      }
    });
  }

  test("transition surfaces use approved adjacent colors", async ({ page }) => {
    await openHome(page, 1440, 1000);
    const background = (selector: string) => page.locator(selector).evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    );
    expect(await background(".scene-bridge--arrival-trust .scene-bridge-wash"))
      .toContain("rgb(234, 231, 216)");
    expect(await background(".scene-bridge--arrival-trust .scene-bridge-wash"))
      .toContain("rgb(30, 35, 31)");
    expect(await background(".scene-bridge--trust-interior .scene-bridge-wash"))
      .toContain("rgb(227, 230, 216)");
    expect(await background(".scene-chapter--lake .forest-scene-bg"))
      .toContain("rgb(28, 42, 56)");
    expect(await background(".scene-chapter--lake .forest-scene-bg"))
      .toContain("rgb(234, 231, 216)");
    expect(await background(".night-booking-close .forest-scene-bg"))
      .toContain("rgb(14, 20, 18)");
  });
});
```

**Step 6: Write interaction and preservation checks**

At 390×844:

- focus the menu trigger and assert a visible focus indicator;
- open the menu, assert `aria-expanded="true"`, body overflow is locked, Tab cycles inside the trigger/panel group, Escape closes the panel, focus returns to the trigger, and body overflow is restored;
- collect unique internal `href` attributes, sort them, and compare them to sorted `expectedInternalHrefs`;
- collect unique `a.airbnb-button` absolute `href` values before sticky activation, sort them, and compare them to sorted `expectedAirbnbHrefs`;
- after sticky activation assert its only anchor equals `expectedStickyAirbnbHref`;
- scroll the final CTA/footer into view and assert the mobile sticky booking dock is not visible.

With `page.emulateMedia({ reducedMotion: "reduce" })`, assert parallax/zoom/mist/steam elements have no running animation and no nonzero transition duration.

The preservation assertion must use the committed literal fixture; never regenerate expected values from the runtime DOM or production `buildAirbnbUrl` function.

Use this executable test:

```ts
test("mobile menu, links, sticky CTA, focus, and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openHome(page, 390, 844);

  const renderedInternal = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")!))].sort(),
  );
  const seasonal = renderedInternal.filter((href) => href.startsWith("/holiday-ready#"));
  const stableInternal = renderedInternal.filter((href) => !href.startsWith("/holiday-ready#"));
  expect(stableInternal).toEqual([...expectedInternalHrefs].sort());
  expect(seasonal.every((href) => allowedSeasonalHrefs.includes(
    href as (typeof allowedSeasonalHrefs)[number],
  ))).toBe(true);

  const airbnb = await page.locator("a.airbnb-button").evaluateAll((links) =>
    [...new Set(links.map((link) => (link as HTMLAnchorElement).href))].sort(),
  );
  expect(airbnb).toEqual([...expectedAirbnbHrefs].sort());

  const trigger = page.locator(".site-nav-menu-trigger");
  await trigger.focus();
  expect(await trigger.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe("2px");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest(".site-nav")))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  expect(await page.locator("body").evaluate((body) => body.style.overflow)).toBe("");

  await page.locator("#gallery").scrollIntoViewIfNeeded();
  const sticky = page.locator(".booking-dock--mobile a");
  await expect(sticky).toBeVisible();
  await expect(sticky).toHaveAttribute("href", expectedStickyAirbnbHref);
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".booking-dock--mobile")).toBeHidden();

  for (const animated of await page.locator(
    ".forest-scene-mist, .ritual-steam, .photo-clearing-parallax-wrap, .editorial-gallery img",
  ).all()) {
    const motion = await animated.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        animationName: style.animationName,
        transitionDuration: style.transitionDuration,
        transform: style.transform,
      };
    });
    expect(motion.animationName).toBe("none");
    expect(motion.transitionDuration).toBe("0s");
    expect(motion.transform).toBe("none");
  }
});
```

**Step 7: Run the narrow tests and confirm they fail for the intended reasons**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run test:ui -- --grep "responsive geometry"
```

Expected before corrective CSS: failures at 600–899px because gallery and ritual are still single-column, plus the mobile gallery-detail contract. Save the failure output in the task notes; do not weaken assertions to fit the baseline.

**Step 8: Commit the test harness**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git add lakearrowheadaframe/playwright.config.ts lakearrowheadaframe/tests/fixtures/home-links.ts lakearrowheadaframe/tests/ui-audit.spec.ts lakearrowheadaframe/package.json lakearrowheadaframe/package-lock.json
git diff --cached --stat
git commit -m "test: define visual layout contracts"
```

## Task 3: Establish the visual token layer and stable page flow

**Files:**

- Create: `lakearrowheadaframe/src/app/ui-system.css`
- Modify: `lakearrowheadaframe/src/app/layout.tsx`

**Step 1: Make the failing contract importable without changing behavior**

Create `src/app/ui-system.css` with only a file comment, then import it immediately after `./globals.css` in `src/app/layout.tsx`.

Run the responsive geometry test again. Expected: the same targeted failures, proving the later stylesheet is wired in but empty.

**Step 2: Define approved tokens in `:root`**

Add these exact color roles and a 4/8-derived sizing system:

```css
:root {
  --ui-parchment: #eae7d8;
  --ui-elevated: #f1e9d2;
  --ui-sage: #e3e6d8;
  --ui-ink: #241f1a;
  --ui-muted: #5f5a52;
  --ui-pine: #2f523c;
  --ui-forest: #1e231f;
  --ui-dusk: #1c2a38;
  --ui-night: #0e1412;
  --ui-line-light: rgb(36 31 26 / 14%);
  --ui-line-dark: rgb(234 231 216 / 18%);
  --ui-space-1: 0.25rem;
  --ui-space-2: 0.5rem;
  --ui-space-3: 0.75rem;
  --ui-space-4: 1rem;
  --ui-space-6: 1.5rem;
  --ui-space-8: 2rem;
  --ui-space-12: 3rem;
  --ui-space-16: 4rem;
  --ui-space-24: 6rem;
  --ui-gutter: clamp(1rem, 4vw, 3rem);
  --ui-section: clamp(4.5rem, 9vw, 8rem);
  --ui-content: 72rem;
  --ui-wide: 86rem;
  --ui-radius: 1rem;
  --ui-shadow: 0 18px 45px rgb(36 31 26 / 12%);
}
```

**Step 3: Normalize global typography, focus, containers, and surfaces**

Append this exact foundation block, scoped to the illustrated site so `/classic` is unchanged:

```css
.site-illustrated {
  color: var(--ui-ink);
  background: var(--ui-parchment);
}

.clearing-home {
  --color-forest-deep: var(--ui-forest);
}

.site-illustrated :is(h1, h2) {
  text-wrap: balance;
}

.site-illustrated :is(p, dd, li) {
  text-wrap: pretty;
}

.site-illustrated :is(
  a,
  button,
  input,
  select,
  textarea,
  [tabindex]:not([tabindex="-1"])
):focus-visible {
  outline: 2px solid var(--ui-pine);
  outline-offset: 3px;
}

.site-illustrated :is(
  .scene-chapter--tone-forest,
  .scene-chapter--tone-dusk,
  .scene-chapter--tone-night,
  .site-footer--night
) :is(a, button, input, select, textarea):focus-visible {
  outline-color: var(--ui-parchment);
}

.site-illustrated :is(
  button,
  .airbnb-button,
  .booking-pill-submit,
  .site-nav-brand,
  .site-nav-menu-trigger
) {
  min-block-size: 44px;
}

.site-illustrated .scene-chapter-inner {
  width: min(100%, var(--ui-content));
  max-width: none;
  margin-inline: auto;
  padding-inline: var(--ui-gutter);
}

.site-illustrated :is(
  .photographic-clearing-inner,
  .ritual-at-dusk-inner
) {
  width: min(100%, var(--ui-wide));
}

.arrival-clearing .scene-chapter-inner {
  width: min(100%, var(--ui-content));
  max-width: none;
  min-height: auto;
  padding: clamp(5.5rem, 8vw, 7rem) var(--ui-gutter) var(--ui-space-8);
}

.arrival-clearing-headline {
  max-width: min(14ch, 100%);
  font-size: clamp(2.35rem, 6vw, 4.6rem);
  line-height: 1.02;
}

.arrival-clearing-subhead,
.inside-glass-body,
.inside-glass-seo,
.ritual-sequence-lead,
.ritual-step-body,
.place-truth-item-body,
.place-truth-faq-a,
.night-cta-body,
.site-footer-copy {
  line-height: 1.7;
}

.inside-glass-title,
.editorial-gallery-title,
.ritual-sequence-title,
.place-truth-heading,
.night-cta-title {
  letter-spacing: -0.025em;
  line-height: 1.08;
}

.inside-glass-truth-title,
.ritual-step-title,
.place-truth-item-title,
.place-truth-faq-q {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  line-height: 1.2;
}

.booking-pill,
.illustrated-map-panel,
.night-cta {
  border: 1px solid var(--ui-line-light);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}

.trust-forest-floor .scene-chapter-inner,
.inside-glass-inner,
.photographic-clearing-inner {
  padding-top: var(--ui-section);
  padding-bottom: var(--ui-section);
}

.inside-glass-photo {
  margin-top: 0;
}

.trust-forest-floor .forest-scene-rail,
.inside-glass-chapter .forest-scene-rail {
  opacity: 0.28;
}

.trust-forest-floor .forest-scene-rail .forest-scene-plate,
.inside-glass-chapter .forest-scene-rail .forest-scene-plate {
  opacity: 0.45;
}

.inside-glass-chapter :is(.forest-scene-mist, .forest-scene-canopy),
.scene-chapter--gallery :is(.forest-scene-mist, .forest-scene-canopy, .forest-scene-foreground) {
  opacity: 0.18;
}
```

Add a `visual restraint` Playwright test before implementation that reads the computed opacity of Trust/Interior rails and Interior/Gallery mist/canopy elements and expects each to be `<= 0.45`. Assert computed `paddingTop` and `paddingBottom` on `.trust-forest-floor .scene-chapter-inner`, `.inside-glass-inner`, and `.photographic-clearing-inner` are each at least 72px at 1440px and at least 64px at 390px. Confirm this test fails against the dense baseline, then passes after the block above.

Do not use `!important` unless an inherited baseline rule cannot otherwise be overridden at equal or greater specificity; document any necessary use beside the rule.

**Step 4: Run static checks**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run lint
npm run typecheck
```

Expected: both exit 0.

**Step 5: Commit the design-system foundation**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git add lakearrowheadaframe/src/app/ui-system.css lakearrowheadaframe/src/app/layout.tsx
git commit -m "style: add rental UI system foundation"
```

## Task 4: Give every early chapter boundary one owner

**Files:**

- Modify: `lakearrowheadaframe/src/components/home/arrival-clearing.tsx`
- Modify: `lakearrowheadaframe/src/components/illustration/scene-bridge.tsx`
- Modify: `lakearrowheadaframe/src/app/ui-system.css`

**Step 1: Add a transition-owner test before markup changes**

Extend `tests/ui-audit.spec.ts` with a test that asserts:

- the arrival stage has no `.arrival-pine-skirt`;
- only the forest-floor bridge contains pine plates;
- mist-lift and clearing bridges do not contain pine plates;
- every bridge has normalized computed layout: zero negative block margins and no more than 2px intersection with adjacent chapters, regardless of the recovered prop class retained on the page.

Run this test and confirm it fails because the pine skirt and negative overlaps still exist.

**Step 2: Remove duplicate hero decoration**

In `arrival-clearing.tsx`, remove the `Image` and `sceneAssets` imports and remove only the decorative `.arrival-pine-skirt` subtree. Preserve the `PhotoClearing`, headline, subhead, hero booking dock, image content, and parallax behavior.

**Step 3: Simplify bridge rendering within the approved component scope**

In `scene-bridge.tsx`, delete the `pineMotifs` set and replace:

```ts
const showPines = motif !== "none" && pineMotifs.has(motif);
```

with:

```ts
const showPines = motif === "forest-floor";
```

Keep the existing API, page props, assets, and decorative empty alternative text. Bridge dimensions and recovered overlap classes are normalized in the corrective stylesheet; `src/app/(illustrated)/page.tsx` remains untouched as required by the approved markup scope.

**Step 4: Correct the hero and bridge CSS**

Append these exact rules to `ui-system.css`:

```css
.arrival-clearing-stage,
.arrival-clearing .booking-dock--hero,
.arrival-clearing-dock {
  position: relative;
}

.arrival-clearing .booking-dock--hero,
.arrival-clearing-dock {
  margin-block: 0;
}

.arrival-clearing .booking-pill {
  margin-top: var(--ui-space-4);
}

.scene-bridge--overlap-up,
.scene-bridge--overlap-down,
.scene-bridge--overlap-both,
.scene-bridge--arrival-trust.scene-bridge--overlap-both,
.scene-bridge--mist-lift.scene-bridge--overlap-down {
  margin-block: 0;
}

.scene-bridge--arrival-trust {
  height: 7rem;
  min-height: 7rem;
  overflow: hidden;
}

.scene-bridge--trust-interior {
  height: 6rem;
}

.scene-bridge--interior-gallery {
  height: 3rem;
}

.scene-bridge-wash,
.scene-bridge--forest-floor .scene-bridge-wash,
.scene-bridge--mist-lift .scene-bridge-wash,
.scene-bridge--clearing .scene-bridge-wash {
  background: linear-gradient(180deg, var(--bridge-from) 0%, var(--bridge-to) 100%);
}

.scene-bridge--forest-floor .scene-bridge-art {
  inset: 35% 0 -10%;
  opacity: 0.35;
}

.scene-bridge--forest-floor .scene-bridge-pines {
  opacity: 0.42;
}

.scene-bridge-edge {
  display: none;
}

@media (max-width: 599px) {
  .scene-bridge--arrival-trust {
    height: 4.5rem;
    min-height: 4.5rem;
  }

  .scene-bridge--trust-interior {
    height: 4rem;
  }

  .scene-bridge--interior-gallery {
    height: 2rem;
  }
}
```

These later `height` declarations override the recovered inline custom-property values without `!important`; the selectors target the three homepage bridges only.

In the transition-owner test, read each `.scene-bridge-wash` computed `backgroundImage`, extract every `rgb(...)` occurrence, de-duplicate it, and assert the exact arrays are:

```ts
const colors = (selector: string) => page.locator(selector).evaluate((element) => [
  ...new Set(getComputedStyle(element).backgroundImage.match(/rgb\([^)]*\)/g) ?? []),
]);

expect(await colors(".scene-bridge--arrival-trust .scene-bridge-wash"))
  .toEqual(["rgb(234, 231, 216)", "rgb(30, 35, 31)"]);
expect(await colors(".scene-bridge--trust-interior .scene-bridge-wash"))
  .toEqual(["rgb(30, 35, 31)", "rgb(227, 230, 216)"]);
expect(await colors(".scene-bridge--interior-gallery .scene-bridge-wash"))
  .toEqual(["rgb(227, 230, 216)", "rgb(234, 231, 216)"]);
```

This catches any reintroduction of the recovered multi-stop Mist or Clearing colors, not merely the presence of the correct endpoints.

**Step 5: Run focused tests**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run test:ui -- --grep "transition owner|chapter flow"
```

Expected: transition-owner and chapter-flow assertions pass, with no chapter overlap. Do not run the broad `visual integrity` group here because its navigation target assertions intentionally become green in Task 5.

**Step 6: Commit**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git add lakearrowheadaframe/src/components/home/arrival-clearing.tsx lakearrowheadaframe/src/components/illustration/scene-bridge.tsx lakearrowheadaframe/src/app/ui-system.css lakearrowheadaframe/tests/ui-audit.spec.ts
git commit -m "style: simplify chapter transition ownership"
```

## Task 5: Implement continuous gallery and ritual breakpoint behavior

**Files:**

- Modify: `lakearrowheadaframe/src/components/illustration/editorial-gallery.tsx`
- Modify: `lakearrowheadaframe/src/components/illustration/ritual-sequence.tsx`
- Modify: `lakearrowheadaframe/src/app/ui-system.css`

**Step 1: Make image size hints match the approved ranges**

Update `sizes` only; do not change images or alt text:

- gallery dominant: `(max-width: 599px) 100vw, (max-width: 899px) 100vw, 55vw`;
- gallery supporting: `(max-width: 599px) 100vw, (max-width: 899px) 50vw, 32vw`;
- gallery details: `(max-width: 599px) 100vw, (max-width: 899px) 33vw, 18vw`;
- ritual proof: `(max-width: 599px) 100vw, (max-width: 899px) 50vw, 28vw`.

No DOM restructure is necessary: the existing wrappers can become grid participants with `display: contents` in the tablet range and return to a nested supporting stack at desktop.

**Step 2: Implement the mobile range below 600px**

Append these exact base rules to `ui-system.css`:

```css
.editorial-gallery-grid,
.editorial-gallery-mediums,
.editorial-gallery-details,
.ritual-sequence-steps {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ui-space-4);
}

.editorial-gallery-grid {
  margin-top: var(--ui-space-12);
}

.editorial-gallery-details {
  grid-column: 1 / -1;
}

.editorial-gallery :is(
  .photo-clearing-frame,
  .editorial-gallery-detail,
  .editorial-gallery-detail > div
),
.ritual-step-proof .photo-clearing-frame {
  overflow: clip;
  border-radius: var(--ui-radius);
}

.editorial-gallery-dominant .editorial-gallery-frame {
  aspect-ratio: 3 / 4;
}

.editorial-gallery-medium .editorial-gallery-frame,
.editorial-gallery-detail > div {
  aspect-ratio: 4 / 3;
}

.editorial-gallery img,
.ritual-step-proof img {
  object-fit: cover;
}

.ritual-sequence-steps {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ritual-step {
  min-width: 0;
}

.ritual-step-proof,
.ritual-step-proof .photo-clearing,
.ritual-step-proof .photo-clearing-frame {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
}

.ritual-step-copy {
  padding-top: var(--ui-space-4);
}
```

**Step 3: Implement the tablet range from 600px through 899px**

Add the exact tablet block:

```css
@media (min-width: 600px) and (max-width: 899px) {
  .editorial-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .editorial-gallery-dominant,
  .editorial-gallery-details {
    grid-column: 1 / -1;
  }

  .editorial-gallery-mediums {
    display: contents;
  }

  .editorial-gallery-details {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ritual-sequence-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--ui-space-8) var(--ui-space-6);
  }

  .ritual-sequence-steps > :nth-child(3) {
    grid-column: 1 / -1;
  }
}
```

**Step 4: Implement desktop at 900px and above**

Add the exact desktop block:

```css
@media (min-width: 900px) {
  .editorial-gallery-grid {
    grid-template-columns: minmax(0, 1.55fr) minmax(18rem, 0.85fr);
    align-items: stretch;
    gap: var(--ui-space-4) var(--ui-space-6);
  }

  .editorial-gallery-dominant {
    grid-area: 1 / 1;
  }

  .editorial-gallery-mediums {
    grid-area: 1 / 2;
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .editorial-gallery-medium,
  .editorial-gallery-medium .photo-clearing,
  .editorial-gallery-medium .editorial-gallery-frame {
    min-height: 0;
    height: 100%;
  }

  .editorial-gallery-medium .editorial-gallery-frame {
    aspect-ratio: auto;
  }

  .editorial-gallery-details {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ritual-sequence-steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--ui-space-6);
  }

  .ritual-sequence-steps > :nth-child(3) {
    grid-column: auto;
  }
}
```

Keep navigation as a separate rule block, but implement it in this task before the shared responsive gate.

**Step 5: Align navigation with the same 900px contract**

Append before running the boundary matrix:

```css
.site-illustrated .site-nav-cta,
.site-illustrated .site-nav-links {
  display: none;
}

.site-illustrated .site-nav-menu-trigger {
  display: inline-flex;
}

.site-illustrated .site-nav-mobile-panel.is-open {
  display: block;
}

.site-illustrated .site-nav-mobile-panel a {
  min-height: 44px;
  display: flex;
  align-items: center;
}

@media (min-width: 900px) {
  .site-illustrated .site-nav-links,
  .site-illustrated .site-nav-cta {
    display: flex;
  }

  .site-illustrated .site-nav-links a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  .site-illustrated .site-nav-menu-trigger,
  .site-illustrated .site-nav-mobile-panel,
  .site-illustrated .site-nav-mobile-panel.is-open {
    display: none;
  }
}
```

**Step 6: Run the exact boundary matrix**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run test:ui -- --grep "responsive geometry"
```

Expected: 599, 600, 767, 768, 769, 899, 900, and 901 all pass with no geometry discontinuity at 767/768/769.

**Step 7: Commit**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git add lakearrowheadaframe/src/components/illustration/editorial-gallery.tsx lakearrowheadaframe/src/components/illustration/ritual-sequence.tsx lakearrowheadaframe/src/app/ui-system.css
git commit -m "style: stabilize gallery and ritual layouts"
```

## Task 6: Normalize late chapter surfaces, navigation, cards, and motion

**Files:**

- Modify: `lakearrowheadaframe/src/app/ui-system.css`
- Modify: `lakearrowheadaframe/tests/ui-audit.spec.ts`
- Modify: `lakearrowheadaframe/src/components/illustration/booking-dock.tsx`

The existing semantic classes and menu behavior are sufficient. Task 2 browser evidence proved the mobile sticky booking bar remains visible over the footer, so this task is explicitly authorized to correct the existing observer behavior in `booking-dock.tsx`. Do not edit Place, Final, or site-chrome markup unless a newly failing browser assertion proves CSS cannot address another issue; if that happens, stop and update the plan/spec before expanding scope.

**Step 1: Write focused surface and accessibility assertions**

Extend `tests/ui-audit.spec.ts` to assert:

- Ritual owns one dusk opening gradient and the Place chapter owns one dusk→parchment opening gradient;
- the final CTA owns one parchment→night opening gradient and the footer remains continuously night;
- no separate `SceneBridge` exists after the interior→gallery bridge;
- FAQ, differentiator, ritual, booking, and gallery card radii resolve to either `0px` (flat editorial) or the single shared radius;
- focus indicators have at least 2px outline width;
- all existing route paths and every Airbnb `href` including query parameters equal the committed literal fixture from `tests/fixtures/home-links.ts`.

Run the new test and confirm the surface/radius assertions fail against the mixed baseline values.

**Step 2: Correct late chapter backgrounds**

Append these exact ownership rules:

```css
.clearing-home .scene-chapter--ritual {
  background: var(--ui-dusk);
}

.clearing-home .scene-chapter--ritual .forest-scene-bg {
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--ui-parchment) 0,
    var(--ui-dusk) clamp(5rem, 10vw, 8rem),
    var(--ui-dusk) 100%
  );
  mask-image: none;
}

.clearing-home .scene-chapter--ritual .scene-chapter-inner {
  padding-top: clamp(7rem, 12vw, 10rem);
  padding-bottom: var(--ui-section);
}

.clearing-home .scene-chapter--lake {
  color: var(--ui-ink);
  background: var(--ui-parchment);
}

.clearing-home .scene-chapter--lake .forest-scene-bg {
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--ui-dusk) 0,
    var(--ui-parchment) clamp(5rem, 10vw, 8rem),
    var(--ui-parchment) 100%
  );
  mask-image: none;
}

.clearing-home .scene-chapter--lake .scene-chapter-inner {
  padding-top: clamp(7rem, 12vw, 10rem);
  padding-bottom: var(--ui-section);
}

.clearing-home .night-booking-close {
  background: var(--ui-night);
}

.clearing-home .night-booking-close .forest-scene-bg {
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--ui-parchment) 0,
    var(--ui-night) clamp(5rem, 10vw, 8rem),
    var(--ui-night) 100%
  );
  mask-image: none;
}

.night-booking-inner {
  padding-top: clamp(7rem, 12vw, 10rem);
  padding-bottom: var(--ui-section);
}

.site-footer--night {
  margin-top: 0;
  background: var(--ui-night);
}

.site-footer-floor {
  opacity: 0.18;
}

.clearing-home :is(
  .scene-chapter--ritual,
  .scene-chapter--lake,
  .night-booking-close
) :is(.forest-scene-canopy, .forest-scene-foreground, .forest-scene-rail) {
  opacity: 0.18;
}
```

No pseudo-element is added: the existing owning section background layer carries the sole gradient. Decorative artwork remains pointer-inert through the recovered `.forest-layer` rule.

**Step 3: Normalize decision content**

Append:

```css
.illustrated-map-panel {
  border-color: var(--ui-line-dark);
  border-radius: var(--ui-radius);
  background: var(--ui-forest);
  box-shadow: var(--ui-shadow);
}

.place-truth-grid {
  gap: clamp(var(--ui-space-12), 6vw, var(--ui-space-24));
  margin-top: var(--ui-space-16);
}

.place-truth-list,
.place-truth-faq {
  gap: var(--ui-space-6);
}

.place-truth-item,
.place-truth-faq-item,
.ritual-step {
  border: 0;
  border-bottom: 1px solid var(--ui-line-light);
  border-radius: 0;
  padding-bottom: var(--ui-space-6);
  box-shadow: none;
}

.ritual-step {
  border-bottom-color: var(--ui-line-dark);
}

.place-truth-item-body,
.place-truth-faq-a,
.night-cta-body {
  max-width: 68ch;
}

.night-booking-layout {
  gap: clamp(var(--ui-space-8), 5vw, var(--ui-space-16));
}

.night-cta {
  padding: clamp(var(--ui-space-6), 4vw, var(--ui-space-12));
  color: var(--ui-parchment);
  background: rgb(234 231 216 / 6%);
  border-color: var(--ui-line-dark);
}
```

**Step 4: Fix the sticky booking visibility contract**

The existing component comment says the mobile bar hides when the final booking/footer enters view, but the implementation observes only the footer and leaves the bar visible over footer actions. Update `MobileStickyBooking` to observe both `#reviews` (the final booking section) and the site footer. Track whether either target intersects; render the sticky bar only when the hero is out and neither closing target is visible. Use `threshold: 0` so the state changes as the target enters the viewport, disconnect every observer during cleanup, and preserve the existing campaign/content URL behavior.

Run:

```bash
npm run test:ui -- --grep "mobile menu, links, sticky CTA"
```

Expected: the sticky CTA appears after Gallery enters view, retains the literal `homepage/mobile-sticky` URL, and becomes hidden when the Final booking section or footer enters view.

**Step 5: Complete reduced-motion behavior**

Navigation already follows the 900px contract from Task 5. Append only the reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  .site-illustrated,
  .site-illustrated * {
    scroll-behavior: auto;
  }

  .site-illustrated :is(
    .forest-layer,
    .forest-scene-mist,
    .ritual-steam,
    .photo-clearing-parallax-wrap,
    .editorial-gallery img
  ) {
    animation: none;
    transition-duration: 0s;
    transform: none;
  }
}
```

Preserve the existing menu implementation. If the focused browser test exposes a behavior bug, diagnose it under the systematic-debugging workflow before changing `site-chrome.tsx`.

**Step 6: Run interaction, link, and accessibility tests**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run test:ui -- --grep "menu|link|motion|surface|touch|focus"
```

Expected: all pass. Any failure must be fixed in the narrowest relevant rule/component; do not loosen the preserved-link fixture.

**Step 7: Commit**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
git add lakearrowheadaframe/src/app/ui-system.css lakearrowheadaframe/tests/ui-audit.spec.ts lakearrowheadaframe/src/components/illustration/booking-dock.tsx
git diff --cached --stat
git commit -m "style: unify late chapters and interactions"
```

## Task 7: Capture final evidence and run the complete verification gate

**Files:**

- Modify: `lakearrowheadaframe/tests/ui-audit.spec.ts`
- Generated but ignored: `lakearrowheadaframe/docs/ui-audit/after/**`

**Step 1: Add opt-in screenshot capture to the real test harness**

In `tests/ui-audit.spec.ts`, when `process.env.UPDATE_UI_SCREENSHOTS === "1"`, capture full-page PNGs after lazy-scrolling and returning to the top for each `requiredViewports` entry. Resolve paths from the nested project directory:

```ts
import path from "node:path";

const auditRoot = path.resolve(process.cwd(), "docs/ui-audit/after");
const capturePath = (viewportName: string, fileName: string) =>
  path.join(auditRoot, viewportName, fileName);
```

Write each full-page capture to `capturePath(viewport.name, "full-page.png")`. Also capture section-level `hero.png`, `gallery.png`, `ritual.png`, `place.png`, and `final.png` inside the same viewport directory at 1440×1000, 768×1024, and 390×844. This prevents viewport passes from overwriting one another and avoids a duplicated nested-project path. Screenshots are evidence only; normal `npm test` must not rewrite them.

**Step 2: Preserve the pre-existing audit helper**

Do not delete or stage `/Users/terryrayment/Documents/GitHub/399rainier/scripts/ui_audit_capture.py`; it is untracked in the dirty worktree and may be user-owned. The new Playwright capture is self-contained and does not depend on it.

**Step 3: Archive prior generated evidence and run the full screenshot matrix**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
test ! -L docs/ui-audit/after
test ! -e docs/ui-audit/after || mv docs/ui-audit/after "docs/ui-audit/after.$(date +%Y%m%d-%H%M%S)"
UPDATE_UI_SCREENSHOTS=1 npm run test:ui:update
```

Resolve the exact target as the nested `lakearrowheadaframe/docs/ui-audit/after` path and confirm it is not a symlink. Expected: all required screenshots and section crops are regenerated while every prior capture remains recoverable.

**Step 4: Inspect screenshots visually**

Open all full-page images and the 1440, 768, and 390 section crops. Check:

- no blank lazy-image regions;
- no clipped text, collisions, accidental bands, or color seams;
- hero headline wrap is intentional;
- property photography dominates decorative art;
- gallery and ritual follow the approved structures;
- Place and Final transitions each have one owner;
- footer and sticky booking states are calm and unobstructed.

If any screenshot reveals an issue that geometry tests missed, first add a Playwright regression assertion, observe it fail, then make the smallest CSS/markup correction and recapture.

**Step 5: Run the full project gate from a clean process**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: every command exits 0. Record exact command results for the handoff.

**Step 6: Review all changes and verify scope**

```bash
cd /Users/terryrayment/Documents/GitHub/399rainier
UI_AUDIT_BASE_SHA=$(</tmp/lakearrowheadaframe-ui-audit-base-sha)
git status --short
git diff --check "$UI_AUDIT_BASE_SHA"
git diff --stat "$UI_AUDIT_BASE_SHA" -- lakearrowheadaframe
git diff "$UI_AUDIT_BASE_SHA" -- lakearrowheadaframe/src/app/globals.css
{ git status --short | rg -v '^.. lakearrowheadaframe/' || true; } > /tmp/lakearrowheadaframe-ui-audit-end-status.txt
diff -u /tmp/lakearrowheadaframe-ui-audit-start-status.txt /tmp/lakearrowheadaframe-ui-audit-end-status.txt
```

Expected: `globals.css` has no diff, there are no whitespace errors, no top-level sales-site file is staged or modified by this pass, and ignored screenshots/build outputs are not in Git.

**Step 7: Commit final verification harness adjustments**

```bash
git add lakearrowheadaframe/tests/ui-audit.spec.ts
git diff --cached --stat
git commit -m "test: complete responsive visual audit coverage"
```

The temporary top-level helper remains untouched and unstaged. The production rental project contains only the reusable Playwright harness.

## Final Handoff Contents

Report:

1. concise findings and root causes;
2. the restored/changed file list;
3. the token and component-system changes;
4. responsive behavior at mobile, tablet, and desktop, including exact 600px and 900px boundaries;
5. accessibility and reduced-motion improvements;
6. exact results for lint, typecheck, Playwright, and build;
7. absolute paths to `docs/ui-audit/deployed-reference`, `lakearrowheadaframe/docs/ui-audit/before`, and `lakearrowheadaframe/docs/ui-audit/after`;
8. remaining concerns, including the existing `npm install` audit report if it still reports four high-severity dependency advisories;
9. confirmation that no deployment occurred and the separate top-level sales site was untouched.
