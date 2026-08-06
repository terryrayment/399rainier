import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  allowedSeasonalHrefs,
  stableInternalHrefs,
  staticAirbnbHrefs,
  stickyAirbnbHref,
} from "./fixtures/home-links";

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

type Viewport = { width: number; height: number };
type Box = NonNullable<Awaited<ReturnType<Locator["boundingBox"]>>>;

const geometryTolerance = 2;
const paper = "rgb(234, 231, 216)";
const forest = "rgb(30, 35, 31)";
const sage = "rgb(227, 230, 216)";
const dusk = "rgb(28, 42, 56)";
const night = "rgb(14, 20, 18)";

async function openHome(page: Page, viewport: Viewport) {
  await page.setViewportSize(viewport);
  await page.goto("/");
  await page.waitForFunction(() => document.fonts.ready.then(() => true));
}

async function lazyScrollAndWaitForImages(page: Page) {
  const step = Math.max(1, Math.floor((await page.evaluate(() => window.innerHeight)) * 0.75));
  let y = 0;

  while (y < (await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight))) {
    y += step;
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    // A single render yield lets IntersectionObserver-backed lazy images receive the scroll.
    await page.waitForTimeout(20);
  }

  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>('img:not([alt=""])')].every(
      (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
    ),
  );
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function gridColumnCount(locator: Locator) {
  return locator.evaluate((element) => {
    const template = getComputedStyle(element).gridTemplateColumns;
    let depth = 0;
    let columns = 0;
    let inToken = false;

    for (const character of template) {
      if (character === "(") depth += 1;
      if (character === ")") depth -= 1;
      if (/\s/.test(character) && depth === 0) {
        inToken = false;
      } else if (!inToken) {
        columns += 1;
        inToken = true;
      }
    }

    return columns;
  });
}

async function requiredBox(locator: Locator, label: string): Promise<Box> {
  const box = await locator.boundingBox();
  expect(box, `${label} must have a bounding box`).not.toBeNull();
  if (!box) throw new Error(`${label} has no bounding box`);
  expect.soft(box.width, `${label} width`).toBeGreaterThan(0);
  expect.soft(box.height, `${label} height`).toBeGreaterThan(0);
  return box;
}

function expectInside(child: Box, parent: Box, label: string) {
  expect.soft(child.x, `${label} left edge`).toBeGreaterThanOrEqual(parent.x - geometryTolerance);
  expect.soft(child.y, `${label} top edge`).toBeGreaterThanOrEqual(parent.y - geometryTolerance);
  expect
    .soft(child.x + child.width, `${label} right edge`)
    .toBeLessThanOrEqual(parent.x + parent.width + geometryTolerance);
  expect
    .soft(child.y + child.height, `${label} bottom edge`)
    .toBeLessThanOrEqual(parent.y + parent.height + geometryTolerance);
}

async function expectChildrenInside(page: Page, childSelector: string, parentSelector: string) {
  const parent = await requiredBox(page.locator(parentSelector), parentSelector);
  const children = page.locator(childSelector);
  expect(await children.count(), `${childSelector} should render`).toBeGreaterThan(0);
  for (let index = 0; index < (await children.count()); index += 1) {
    const child = await requiredBox(children.nth(index), `${childSelector}[${index}]`);
    expectInside(child, parent, `${childSelector}[${index}]`);
  }
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
  );
}

async function computedRgbColors(locator: Locator) {
  return locator.evaluate((element) => {
    const image = getComputedStyle(element).backgroundImage;
    const matches = image.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g) ?? [];
    return [...new Set(matches.map((color) => color.replace(/\s+/g, " ")))];
  });
}

async function expectResponsiveGeometry(page: Page, width: (typeof boundaryWidths)[number]) {
  const galleryGrid = page.locator(".editorial-gallery-grid");
  const galleryDetails = page.locator(".editorial-gallery-details");
  const ritualGrid = page.locator(".ritual-sequence-steps");
  const galleryBox = await requiredBox(galleryGrid, "gallery grid");
  const dominantBox = await requiredBox(
    page.locator(".editorial-gallery-dominant"),
    "gallery dominant frame",
  );
  const supportingBox = await requiredBox(
    page.locator(".editorial-gallery-mediums"),
    "gallery supporting column",
  );
  const ritualBox = await requiredBox(ritualGrid, "ritual grid");
  const thirdRitualBox = await requiredBox(page.locator(".ritual-step").nth(2), "third ritual card");

  if (width < 600) {
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(1);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(1);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(1);
  } else if (width < 900) {
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(2);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(3);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(2);
    expect.soft(dominantBox.width, "dominant gallery frame spans both columns").toBeGreaterThanOrEqual(
      galleryBox.width - geometryTolerance,
    );
    expect.soft(thirdRitualBox.width, "third ritual card spans both columns").toBeGreaterThanOrEqual(
      ritualBox.width - geometryTolerance,
    );
  } else {
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(2);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(3);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(3);
    expect.soft(dominantBox.width, "dominant frame is wider than supporting column").toBeGreaterThan(
      supportingBox.width,
    );
    expect.soft(thirdRitualBox.width, "third ritual card is less than half the grid").toBeLessThan(
      ritualBox.width / 2,
    );
  }

  if (width < 900) {
    await expect.soft(page.locator(".site-nav-menu-trigger"), "compact navigation trigger").toBeVisible();
    await expect.soft(page.locator(".site-nav-links"), "desktop navigation links").toBeHidden();
  } else {
    await expect.soft(page.locator(".site-nav-menu-trigger"), "compact navigation trigger").toBeHidden();
    await expect.soft(page.locator(".site-nav-links"), "desktop navigation links").toBeVisible();
  }

  await expectChildrenInside(
    page,
    ".editorial-gallery-dominant, .editorial-gallery-medium, .editorial-gallery .photo-clearing-frame, .editorial-gallery-detail",
    ".editorial-gallery-grid",
  );
  await expectChildrenInside(page, ".ritual-step", ".ritual-sequence-steps");

  const ritualCards = page.locator(".ritual-step");
  for (let index = 0; index < (await ritualCards.count()); index += 1) {
    const card = await requiredBox(ritualCards.nth(index), `ritual card ${index + 1}`);
    const proof = await requiredBox(
      ritualCards.nth(index).locator(".ritual-step-proof"),
      `ritual proof ${index + 1}`,
    );
    expectInside(proof, card, `ritual proof ${index + 1}`);
  }
}

test.describe("responsive geometry", () => {
  for (const width of boundaryWidths) {
    test(`approved gallery, ritual, and navigation geometry at ${width}px`, async ({ page }) => {
      await openHome(page, { width, height: 900 });
      await expectResponsiveGeometry(page, width);
    });
  }
});

test.describe("visual integrity", () => {
  for (const viewport of requiredViewports) {
    test(`${viewport.name} preserves content, controls, and chapter flow`, async ({ page }) => {
      await openHome(page, viewport);
      await lazyScrollAndWaitForImages(page);

      expect.soft(await horizontalOverflow(page), "horizontal overflow").toBeLessThanOrEqual(1);

      const meaningfulImages = page.locator('img:not([alt=""])');
      for (let index = 0; index < (await meaningfulImages.count()); index += 1) {
        const dimensions = await meaningfulImages.nth(index).evaluate((image) => ({
          width: (image as HTMLImageElement).naturalWidth,
          height: (image as HTMLImageElement).naturalHeight,
        }));
        expect.soft(dimensions.width, `meaningful image ${index + 1} natural width`).toBeGreaterThan(0);
        expect.soft(dimensions.height, `meaningful image ${index + 1} natural height`).toBeGreaterThan(0);
      }

      const headline = page.locator(".arrival-clearing-headline");
      const headlineBox = await requiredBox(headline, "hero headline");
      const copyBox = await requiredBox(page.locator(".arrival-clearing-copy"), "hero copy");
      const heroContainerBox = await requiredBox(
        page.locator(".arrival-clearing-photo .photo-clearing-frame"),
        "hero container",
      );
      expectInside(headlineBox, copyBox, "hero headline within copy");
      expectInside(headlineBox, heroContainerBox, "hero headline within hero container");
      const fourteenCh = await headline.evaluate((element) => {
        const ruler = document.createElement("span");
        ruler.style.cssText = "position:absolute;visibility:hidden;width:14ch;font:inherit";
        element.append(ruler);
        const width = ruler.getBoundingClientRect().width;
        ruler.remove();
        return width;
      });
      expect.soft(headlineBox.width, "headline respects min(14ch, 100%)").toBeLessThanOrEqual(
        Math.min(copyBox.width, fourteenCh) + geometryTolerance,
      );

      const menuTrigger = page.locator(".site-nav-menu-trigger");
      const compactNavigation = await menuTrigger.isVisible();
      if (compactNavigation) {
        await menuTrigger.click();
        await expect(menuTrigger).toHaveAttribute("aria-expanded", "true");
      }

      const controls = page.locator(
        ".site-nav-menu-trigger, a.airbnb-button, .booking-pill-submit, .site-nav-brand, .site-nav-links a, .site-nav-mobile-panel a",
      );
      for (let index = 0; index < (await controls.count()); index += 1) {
        const control = controls.nth(index);
        if (!(await control.isVisible())) continue;
        const box = await requiredBox(control, `visible primary control ${index + 1}`);
        expect.soft(Math.min(box.width, box.height), `visible primary control ${index + 1}`).toBeGreaterThanOrEqual(44);
      }
      if (compactNavigation) {
        await page.keyboard.press("Escape");
        await expect(menuTrigger).toHaveAttribute("aria-expanded", "false");
      }

      const surfaces = page.locator(".clearing-home > .scene-chapter, .clearing-home > .scene-bridge");
      let previous: Box | undefined;
      for (let index = 0; index < (await surfaces.count()); index += 1) {
        const current = await requiredBox(surfaces.nth(index), `homepage surface ${index + 1}`);
        if (previous) {
          expect.soft(current.y, `surface ${index + 1} remains monotonic`).toBeGreaterThanOrEqual(previous.y);
          expect
            .soft(current.y, `surface ${index + 1} overlaps its predecessor by no more than 2px`)
            .toBeGreaterThanOrEqual(previous.y + previous.height - geometryTolerance);
        }
        previous = current;
      }
    });
  }

  test("transition surfaces use approved adjacent endpoint colors", async ({ page }) => {
    await openHome(page, { width: 1440, height: 1000 });

    expect.soft(await computedRgbColors(page.locator(".scene-bridge--arrival-trust .scene-bridge-wash"))).toEqual([
      paper,
      forest,
    ]);
    expect.soft(await computedRgbColors(page.locator(".scene-bridge--trust-interior .scene-bridge-wash"))).toEqual([
      forest,
      sage,
    ]);
    expect.soft(await computedRgbColors(page.locator(".scene-bridge--interior-gallery .scene-bridge-wash"))).toEqual([
      sage,
      paper,
    ]);

    const placeColors = await computedRgbColors(page.locator(".scene-chapter--lake .forest-scene-bg"));
    expect.soft(placeColors[0], "Place owns dusk at its opening edge").toBe(dusk);
    expect.soft(placeColors.at(-1), "Place resolves to paper").toBe(paper);

    const finalColors = await computedRgbColors(page.locator(".scene-chapter--night .forest-scene-bg"));
    expect.soft(finalColors[0], "Final opens on paper").toBe(paper);
    expect.soft(finalColors.at(-1), "Final resolves to night").toBe(night);
  });
});

test.describe("interaction and preservation", () => {
  test("mobile navigation, links, sticky booking, and reduced motion preserve contracts", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openHome(page, { width: 390, height: 844 });

    const internalHrefs = await page
      .locator('.site-nav a[href], .clearing-home a[href], .site-footer a[href]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter((href): href is string => Boolean(href?.startsWith("/"))),
      );
    const allowedSeasonal = new Set<string>(allowedSeasonalHrefs);
    const renderedSeasonal = [...new Set(internalHrefs.filter((href) => href.startsWith("/holiday-ready#")))];
    const renderedStable = [
      ...new Set(internalHrefs.filter((href) => !href.startsWith("/holiday-ready#"))),
    ].sort();
    expect(renderedStable).toEqual([...stableInternalHrefs].sort());
    for (const href of renderedSeasonal) expect(allowedSeasonal.has(href), href).toBe(true);

    const renderedAirbnbHrefs = await page
      .locator("a.airbnb-button[href]")
      .evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).href))].sort());
    expect(renderedAirbnbHrefs).toEqual([...staticAirbnbHrefs].sort());

    const trigger = page.locator(".site-nav-menu-trigger");
    await trigger.focus();
    const outline = await trigger.evaluate((element) => {
      const style = getComputedStyle(element);
      return { width: Number.parseFloat(style.outlineWidth), style: style.outlineStyle };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);

    const initialBodyOverflow = await page.evaluate(() => document.body.style.overflow);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press("Tab");
      expect(
        await page.evaluate(() => Boolean(document.activeElement?.closest(".site-nav"))),
        `Tab ${index + 1} remains in site navigation`,
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(initialBodyOverflow);

    await page.locator("#gallery").scrollIntoViewIfNeeded();
    const sticky = page.locator(".booking-dock--mobile a.airbnb-button");
    await expect(sticky).toBeVisible();
    await expect(sticky).toHaveAttribute("href", stickyAirbnbHref);

    const motionSurfaces = page.locator(
      ".forest-layer--mist, .world-mist-band, .ritual-steam, .scene-bridge-plate, .photo-clearing-parallax-wrap > div, .editorial-gallery img",
    );
    const identityTransforms = new Set([
      "none",
      "matrix(1, 0, 0, 1, 0, 0)",
      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    ]);
    for (let index = 0; index < (await motionSurfaces.count()); index += 1) {
      const style = await motionSurfaces.nth(index).evaluate((element) => {
        const computed = getComputedStyle(element);
        return {
          animationName: computed.animationName,
          transitionDuration: computed.transitionDuration,
          transform: computed.transform,
        };
      });
      expect.soft(style.animationName, `motion surface ${index + 1} animation`).toBe("none");
      expect.soft(style.transitionDuration, `motion surface ${index + 1} transition`).toBe("0s");
      expect.soft(identityTransforms.has(style.transform), `motion surface ${index + 1} transform`).toBe(true);
    }

    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect(page.locator(".booking-dock--mobile")).toHaveCount(0);
  });
});

test.describe("future responsive surface contracts", () => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000, minimumSpacing: 72 },
    { name: "mobile", width: 390, height: 844, minimumSpacing: 64 },
  ] as const) {
    test(`visual restraint: ${viewport.name} rails, atmosphere, and token spacing`, async ({ page }) => {
      await openHome(page, viewport);

      const restrainedLayers = page.locator(
        ".scene-chapter--trust .forest-scene-rail, .scene-chapter--interior .forest-scene-rail, .scene-chapter--interior .forest-scene-mist, .scene-chapter--gallery .forest-scene-mist, .scene-chapter--gallery .forest-scene-canopy, .scene-chapter--gallery .forest-scene-foreground",
      );
      for (let index = 0; index < (await restrainedLayers.count()); index += 1) {
        const opacity = await restrainedLayers.nth(index).evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).opacity),
        );
        expect.soft(opacity, `restrained atmosphere ${index + 1}`).toBeLessThanOrEqual(0.45);
      }

      for (const scene of ["trust", "interior", "gallery"] as const) {
        const spacing = await page.locator(`.scene-chapter--${scene} .scene-chapter-inner`).evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            top: Number.parseFloat(style.paddingTop),
            bottom: Number.parseFloat(style.paddingBottom),
          };
        });
        expect.soft(spacing.top, `${scene} top spacing`).toBeGreaterThanOrEqual(viewport.minimumSpacing);
        expect.soft(spacing.bottom, `${scene} bottom spacing`).toBeGreaterThanOrEqual(viewport.minimumSpacing);
      }
    });
  }

  test("transition owner: one bridge owns each early chapter boundary", async ({ page }) => {
    await openHome(page, { width: 1440, height: 1000 });

    await expect(page.locator(".arrival-clearing .arrival-pine-skirt")).toHaveCount(0);
    await expect(page.locator(".scene-bridge--forest-floor .scene-bridge-pines")).toHaveCount(2);
    await expect(page.locator(".scene-bridge--mist-lift .scene-bridge-pines")).toHaveCount(0);
    await expect(page.locator(".scene-bridge--clearing .scene-bridge-pines")).toHaveCount(0);

    const earlyBridges = page.locator(
      ".scene-bridge--arrival-trust, .scene-bridge--trust-interior, .scene-bridge--interior-gallery",
    );
    for (let index = 0; index < (await earlyBridges.count()); index += 1) {
      const bridge = earlyBridges.nth(index);
      const margins = await bridge.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          top: Number.parseFloat(style.marginTop),
          bottom: Number.parseFloat(style.marginBottom),
        };
      });
      expect.soft(margins.top, `early bridge ${index + 1} top margin`).toBeGreaterThanOrEqual(0);
      expect.soft(margins.bottom, `early bridge ${index + 1} bottom margin`).toBeGreaterThanOrEqual(0);

      const bridgeBox = await requiredBox(bridge, `early bridge ${index + 1}`);
      const previous = await requiredBox(bridge.locator("xpath=preceding-sibling::*[1]"), "previous chapter");
      const next = await requiredBox(bridge.locator("xpath=following-sibling::*[1]"), "next chapter");
      expect.soft(bridgeBox.y, "bridge overlap above").toBeGreaterThanOrEqual(
        previous.y + previous.height - geometryTolerance,
      );
      expect.soft(next.y, "bridge overlap below").toBeGreaterThanOrEqual(
        bridgeBox.y + bridgeBox.height - geometryTolerance,
      );
    }

    expect(await computedRgbColors(page.locator(".scene-bridge--arrival-trust .scene-bridge-wash"))).toEqual([
      paper,
      forest,
    ]);
    expect(await computedRgbColors(page.locator(".scene-bridge--trust-interior .scene-bridge-wash"))).toEqual([
      forest,
      sage,
    ]);
    expect(await computedRgbColors(page.locator(".scene-bridge--interior-gallery .scene-bridge-wash"))).toEqual([
      sage,
      paper,
    ]);
  });

  test("surface and preservation: bridge count, card radii, and late ownership", async ({ page }) => {
    await openHome(page, { width: 1440, height: 1000 });

    await expect(page.locator(".scene-bridge--interior-gallery")).toHaveCount(0);

    const cardRadii = await page
      .locator(
        ".trust-proof-chip, .photo-clearing-frame, .editorial-gallery-detail, .ritual-step-proof .photo-clearing-frame, .illustrated-map-panel, .place-truth-item, .place-truth-faq-item",
      )
      .evaluateAll((elements) => [
        ...new Set(elements.map((element) => getComputedStyle(element).borderTopLeftRadius)),
      ]);
    const nonZeroRadii = cardRadii.filter((radius) => radius !== "0px");
    expect(cardRadii).toContain("0px");
    expect(new Set(nonZeroRadii).size, "all elevated cards share one radius").toBeLessThanOrEqual(1);

    const placeColors = await computedRgbColors(page.locator(".scene-chapter--lake .forest-scene-bg"));
    expect(placeColors[0]).toBe(dusk);
    expect(placeColors.at(-1)).toBe(paper);
    const finalColors = await computedRgbColors(page.locator(".scene-chapter--night .forest-scene-bg"));
    expect(finalColors[0]).toBe(paper);
    expect(finalColors.at(-1)).toBe(night);
  });
});
