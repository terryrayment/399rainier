import { expect, test, type Locator, type Page } from "@playwright/test";
import { existsSync } from "node:fs";
import { lstat, mkdir, mkdtemp, readdir, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import * as editorialGalleryModule from "../src/components/illustration/editorial-gallery";
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

const projectRoot = path.resolve(__dirname, "..");
const auditRelativePath = path.join("docs", "ui-audit", "after");
const auditRoot = path.join(projectRoot, auditRelativePath);
const capturePath = (viewportName: string, fileName: string) =>
  path.join(auditRoot, viewportName, fileName);
const sectionCaptureViewportNames = new Set([
  "desktop-1440x1000",
  "tablet-768x1024",
  "mobile-390x844",
]);
const sectionCaptureNames = ["hero", "gallery", "ritual", "place", "final"] as const;
const expectedAuditManifest = [
  "desktop-1280x800/full-page.png",
  "desktop-1440x1000/final.png",
  "desktop-1440x1000/full-page.png",
  "desktop-1440x1000/gallery.png",
  "desktop-1440x1000/hero.png",
  "desktop-1440x1000/place.png",
  "desktop-1440x1000/ritual.png",
  "mobile-375x667/full-page.png",
  "mobile-390x844/final.png",
  "mobile-390x844/full-page.png",
  "mobile-390x844/gallery.png",
  "mobile-390x844/hero.png",
  "mobile-390x844/place.png",
  "mobile-390x844/ritual.png",
  "tablet-1024x768/full-page.png",
  "tablet-767x900/full-page.png",
  "tablet-768x1024/final.png",
  "tablet-768x1024/full-page.png",
  "tablet-768x1024/gallery.png",
  "tablet-768x1024/hero.png",
  "tablet-768x1024/place.png",
  "tablet-768x1024/ritual.png",
  "tablet-769x900/full-page.png",
] as const;
const sectionCaptureSelectors: Record<(typeof sectionCaptureNames)[number], string> = {
  hero: ".arrival-clearing",
  gallery: "#gallery",
  ritual: "#ritual",
  place: "#location",
  final: "#reviews",
};
const fullPageCaptureStyle = "nextjs-portal { display: none !important; }";
const sectionCaptureStyle = `${fullPageCaptureStyle}
  .site-nav, .booking-dock--mobile { display: none !important; }`;
const mapReadinessSelector = ".gm-style img";
const mapRenderTimeout = 8_000;
const mapSnapshotSelector = "[data-ui-audit-map-snapshot]";
const mapDiagnosticFrameLimit = 6;
const mapDiagnosticTileLimit = 5;
const mapDiagnosticUrlLimit = 240;

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
        const y = Math.min(
          image.height - 1,
          Math.max(0, Math.round((image.height - 1) * fraction)),
        );
        return Array.from(
          context.getImageData(Math.floor(image.width / 2), y, 1, 1).data.slice(0, 3),
        );
      });
    },
    { dataUrl: `data:image/png;base64,${screenshot.toString("base64")}`, fractions },
  );
}

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
      Array.from(
        context.getImageData(Math.floor(image.width / 2), y, 1, 1).data.slice(0, 3),
      ),
    );
  }, `data:image/png;base64,${screenshot.toString("base64")}`);
}

function rgbDistance(first: number[], second: number[]) {
  return Math.hypot(...first.map((channel, index) => channel - second[index]));
}

function rec709Luminance([red, green, blue]: number[]) {
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function expectRgbClose(actual: number[], expected: number[], label: string) {
  for (let channel = 0; channel < 3; channel += 1) {
    expect.soft(Math.abs(actual[channel] - expected[channel]), `${label} channel ${channel}`).toBeLessThanOrEqual(8);
  }
}

function expectGreenBiased(actual: number[], label: string) {
  expect.soft(Math.max(...actual) - Math.min(...actual), `${label} channel spread`).toBeGreaterThanOrEqual(8);
  expect.soft(actual[1], `${label} green >= red`).toBeGreaterThanOrEqual(actual[0]);
  expect.soft(actual[1], `${label} green >= blue`).toBeGreaterThanOrEqual(actual[2]);
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
  await page.waitForFunction(() => window.scrollY === 0);
}

function renderedMapReady(tileSelector: string) {
  const mapRoot = document.querySelector("#mapDiv");
  const mapRegion = mapRoot?.querySelector<HTMLElement>(
    '[role="region"][aria-roledescription="map"]',
  );
  const renderedTile = [...(mapRoot?.querySelectorAll<HTMLImageElement>(tileSelector) ?? [])].find(
    (image) => {
      const box = image.getBoundingClientRect();
      return (
        image.complete &&
        image.naturalWidth > 0 &&
        image.naturalHeight > 0 &&
        box.width > 0 &&
        box.height > 0
      );
    },
  );
  const regionBox = mapRegion?.getBoundingClientRect();
  return Boolean(regionBox?.width && regionBox.height && renderedTile);
}

async function collectMapDiagnostics(page: Page) {
  const iframe = page.locator(".illustrated-map-iframe");
  const mapFrame = page.frames().find((frame) => frame.url().includes("/maps/embed"));
  const frameState = await mapFrame
    ?.evaluate(
      ({ tileLimit, tileSelector, urlLimit }) => {
        const body = document.body;
        const tiles = [...document.querySelectorAll<HTMLImageElement>(tileSelector)];
        return {
          bodyCount: body ? 1 : 0,
          bodyChildCount: body?.childElementCount ?? 0,
          mapRegionCount:
            body?.querySelectorAll('[role="region"][aria-roledescription="map"]').length ?? 0,
          mapRootCount: body?.querySelectorAll("#mapDiv").length ?? 0,
          tileCount: tiles.length,
          tileSample: tiles.slice(0, tileLimit).map((image) => ({
            complete: image.complete,
            height: image.naturalHeight,
            src: (image.currentSrc || image.src).slice(0, urlLimit),
            width: image.naturalWidth,
          })),
        };
      },
      {
        tileLimit: mapDiagnosticTileLimit,
        tileSelector: mapReadinessSelector,
        urlLimit: mapDiagnosticUrlLimit,
      },
    )
    .catch(() => ({ diagnostic: "map frame unavailable" }));

  return {
    frameCount: page.frames().length,
    frameUrls: page
      .frames()
      .slice(0, mapDiagnosticFrameLimit)
      .map((frame) => frame.url().slice(0, mapDiagnosticUrlLimit)),
    iframeBounds: await iframe.boundingBox().catch(() => null),
    iframeCount: await iframe.count().catch(() => 0),
    frameState: frameState ?? { diagnostic: "map frame missing" },
  };
}

async function withMapDiagnostics<T>(page: Page, phase: string, action: () => Promise<T>) {
  try {
    return await action();
  } catch (cause) {
    const diagnostics = await collectMapDiagnostics(page).catch(() => ({
      diagnostic: "map diagnostics unavailable",
    }));
    throw new Error(
      `Map ${phase} failed (each readiness wait is bounded to ${mapRenderTimeout}ms): ${JSON.stringify(diagnostics)}`,
      { cause },
    );
  }
}

async function waitForMapRender(page: Page) {
  return withMapDiagnostics(page, "initial readiness", async () => {
    const iframe = page.locator(".illustrated-map-iframe");
    await iframe.waitFor({ state: "attached", timeout: mapRenderTimeout });
    await iframe.waitFor({ state: "visible", timeout: mapRenderTimeout });
    await iframe.scrollIntoViewIfNeeded({ timeout: mapRenderTimeout });

    await expect
      .poll(() => page.frames().find((frame) => frame.url().includes("/maps/embed"))?.url() ?? "", {
        message: "map iframe navigates to the Google embed",
        timeout: mapRenderTimeout,
      })
      .toContain("/maps/embed");

    const mapFrame = page.frames().find((frame) => frame.url().includes("/maps/embed"));
    if (!mapFrame) throw new Error("Map iframe did not expose a content frame");
    const mapFrameLocator = page.frameLocator(".illustrated-map-iframe");

    await mapFrame.waitForLoadState("domcontentloaded", { timeout: mapRenderTimeout });
    await mapFrame.waitForLoadState("load", { timeout: mapRenderTimeout });
    await mapFrameLocator.locator("body").waitFor({ state: "attached", timeout: mapRenderTimeout });
    await mapFrameLocator.locator("#mapDiv").waitFor({ state: "visible", timeout: mapRenderTimeout });
    await mapFrame.waitForFunction(renderedMapReady, mapReadinessSelector, {
      timeout: mapRenderTimeout,
    });
    await expect
      .poll(
        () =>
          iframe.evaluate((element) => {
            const box = element.getBoundingClientRect();
            return box.bottom > 0 && box.right > 0 && box.top < window.innerHeight && box.left < window.innerWidth;
          }),
        { message: "rendered map remains in the viewport for full-page capture", timeout: mapRenderTimeout },
      )
      .toBe(true);
    return { inViewport: true, ready: true, selector: mapReadinessSelector } as const;
  });
}

async function freezeRenderedMap(page: Page) {
  const iframe = page.locator(".illustrated-map-iframe");
  const png = await iframe.screenshot({ style: sectionCaptureStyle });
  const snapshotSource = `data:image/png;base64,${png.toString("base64")}`;

  await iframe.evaluate(async (element, source) => {
    const snapshot = document.createElement("img");
    snapshot.dataset.uiAuditMapSnapshot = "true";
    snapshot.alt = "";
    snapshot.src = source;
    snapshot.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;pointer-events:none";
    element.parentElement?.append(snapshot);
    await snapshot.decode();
  }, snapshotSource);
}

async function returnToTopAndSettle(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => window.scrollY === 0);
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  await expect
    .poll(() =>
      page.locator(".arrival-clearing").evaluate((element) => {
        const box = element.getBoundingClientRect();
        return box.bottom > 0 && box.top < window.innerHeight;
      }),
    )
    .toBe(true);
  await expect(page.locator(".booking-dock--mobile")).toBeHidden();
}

async function confirmMapRenderAfterTop(page: Page) {
  const mapFrame = page.frames().find((frame) => frame.url().includes("/maps/embed"));
  if (!mapFrame) throw new Error("Map iframe disappeared after returning to the top");
  await mapFrame.waitForFunction(renderedMapReady, mapReadinessSelector, {
    timeout: mapRenderTimeout,
  });
  await expect(page.locator(mapSnapshotSelector)).toHaveCount(1);
  return true;
}

async function removeRenderedMapSnapshot(page: Page) {
  if (page.isClosed()) return;
  await page.locator(mapSnapshotSelector).evaluateAll((snapshots) =>
    snapshots.forEach((snapshot) => snapshot.remove()),
  );
}

function assertPathContainedBy(root: string, candidate: string) {
  const relativePath = path.relative(root, candidate);
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Audit capture path escapes its root: ${candidate}`);
  }
}

async function validateAuditWriteParent(root: string, outputPath: string) {
  assertPathContainedBy(root, outputPath);
  const outputParent = path.dirname(outputPath);
  assertPathContainedBy(root, outputParent);
  const relativeParent = path.relative(root, outputParent);
  const parentComponents = relativeParent ? relativeParent.split(path.sep) : [];
  const existingParents = [
    root,
    ...parentComponents.map((_, index) =>
      path.join(root, ...parentComponents.slice(0, index + 1)),
    ),
  ];

  for (const parentPath of existingParents) {
    try {
      const parentStats = await lstat(parentPath);
      if (parentStats.isSymbolicLink()) {
        throw new Error(`Audit capture parent must not be a symbolic link: ${parentPath}`);
      }
    } catch (cause) {
      if ((cause as NodeJS.ErrnoException).code !== "ENOENT") throw cause;
    }
  }
}

async function expectSymlinkedCaptureParentRejected() {
  const sandbox = await mkdtemp(path.join(tmpdir(), "ui-audit-symlink-"));
  const isolatedAuditRoot = path.join(sandbox, "audit");
  const outsideDirectory = path.join(sandbox, "outside");
  const symlinkedViewport = path.join(isolatedAuditRoot, "tablet-768x1024");
  try {
    await mkdir(isolatedAuditRoot);
    await mkdir(outsideDirectory);
    await symlink(outsideDirectory, symlinkedViewport, "dir");
    await expect(
      validateAuditWriteParent(
        isolatedAuditRoot,
        path.join(symlinkedViewport, "full-page.png"),
      ),
    ).rejects.toThrow(/symbolic link/i);
  } finally {
    await rm(sandbox, { recursive: true, force: true });
  }
}

async function validateAuditRoot() {
  if (path.relative(projectRoot, auditRoot) !== auditRelativePath) {
    throw new Error(`Audit root is not anchored to the project: ${auditRoot}`);
  }
  assertPathContainedBy(projectRoot, auditRoot);

  try {
    const auditRootStats = await lstat(auditRoot);
    if (auditRootStats.isSymbolicLink()) {
      throw new Error(`Audit root must not be a symbolic link: ${auditRoot}`);
    }
  } catch (cause) {
    if ((cause as NodeJS.ErrnoException).code !== "ENOENT") throw cause;
  }
}

async function listAuditFiles(directory = auditRoot): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? listAuditFiles(entryPath)
        : [path.relative(auditRoot, entryPath)];
    }),
  );
  return files.flat().sort();
}

async function captureAuditEvidence(page: Page, viewportName: string) {
  if (process.env.UPDATE_UI_SCREENSHOTS !== "1") return;

  let captureStep = 0;
  const mapReadiness = await waitForMapRender(page);
  const captureSequence = {
    fullPageCapture: 0,
    mapReadyInViewport: ++captureStep,
    returnedTopAndSettled: 0,
  };
  let mapReadyAfterTop = false;
  await freezeRenderedMap(page);
  try {
    mapReadyAfterTop = await withMapDiagnostics(
      page,
      "return-to-top and post-return readiness",
      async () => {
        await returnToTopAndSettle(page);
        return confirmMapRenderAfterTop(page);
      },
    );
    captureSequence.returnedTopAndSettled = ++captureStep;
    const fullPagePath = capturePath(viewportName, "full-page.png");
    await validateAuditRoot();
    await validateAuditWriteParent(auditRoot, fullPagePath);
    await mkdir(path.dirname(fullPagePath), { recursive: true });
    captureSequence.fullPageCapture = ++captureStep;
    await page.screenshot({ path: fullPagePath, fullPage: true, style: fullPageCaptureStyle });
  } finally {
    await removeRenderedMapSnapshot(page);
  }

  if (sectionCaptureViewportNames.has(viewportName)) {
    for (const sectionName of sectionCaptureNames) {
      const sectionPath = capturePath(viewportName, `${sectionName}.png`);
      await validateAuditWriteParent(auditRoot, sectionPath);
      await page
        .locator(sectionCaptureSelectors[sectionName])
        .screenshot({
          path: sectionPath,
          style: sectionCaptureStyle,
        });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => window.scrollY === 0);
  }

  return {
    auditRelativePath,
    auditRoot,
    captureSequence,
    fullPageStyle: fullPageCaptureStyle,
    mapReadyAfterTopBeforeFullPageCapture: mapReadyAfterTop,
    mapReadinessSelector: mapReadiness.selector,
    projectRoot,
    sectionStyle: sectionCaptureStyle,
  };
}

async function computedGridTracks(
  locator: Locator,
  property: "gridTemplateColumns" | "gridTemplateRows",
) {
  return locator.evaluate((element, gridProperty) => {
    const template = getComputedStyle(element)[gridProperty];
    let depth = 0;
    let token = "";
    const tracks: string[] = [];

    for (const character of template) {
      if (character === "(") depth += 1;
      if (character === ")") depth -= 1;
      if (/\s/.test(character) && depth === 0) {
        if (token) tracks.push(token);
        token = "";
      } else {
        token += character;
      }
    }
    if (token) tracks.push(token);

    return tracks;
  }, property);
}

async function gridColumnCount(locator: Locator) {
  return (await computedGridTracks(locator, "gridTemplateColumns")).length;
}

async function gridRowCount(locator: Locator) {
  return (await computedGridTracks(locator, "gridTemplateRows")).length;
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

async function expectInsideImmediateParents(
  page: Page,
  selector: string,
  expectedCount: number,
  label: string,
) {
  const items = page.locator(selector);
  expect(await items.count(), `${label} count`).toBe(expectedCount);
  for (let index = 0; index < expectedCount; index += 1) {
    const item = items.nth(index);
    const itemBox = await requiredBox(item, `${label} ${index + 1}`);
    const parentBox = await requiredBox(item.locator("xpath=.."), `${label} ${index + 1} parent`);
    expectInside(itemBox, parentBox, `${label} ${index + 1}`);
  }
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
  );
}

async function expectNamedActionTargetsAndSurfaces(page: Page, viewport: Viewport) {
  const namedTargets = [
    ["trust proof chips", ".trust-proof-chip"],
    ["editorial gallery action", ".editorial-gallery-link"],
    ["place truth CTAs", ".place-truth-link"],
    ["ritual action", ".ritual-sequence-link"],
    ["night review link", ".night-link"],
    ["night cluster links", ".night-cluster-link"],
    ["site footer links", ".site-footer-links a"],
  ] as const;
  for (const [label, selector] of namedTargets) {
    const targets = page.locator(selector);
    expect(await targets.count(), `${label} render`).toBeGreaterThan(0);
    for (let index = 0; index < (await targets.count()); index += 1) {
      const box = await requiredBox(targets.nth(index), `${label} ${index + 1}`);
      expect.soft(box.height, `${label} ${index + 1} block size`).toBeGreaterThanOrEqual(44);
    }
  }

  const visibleBookingPill = page.locator(".arrival-clearing .booking-pill:visible");
  await expect(visibleBookingPill).toHaveCount(1);
  const surface = await visibleBookingPill.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      background: style.backgroundColor,
      borderRadius: Number.parseFloat(style.borderRadius),
      boxShadow: style.boxShadow,
    };
  });
  expect.soft(surface.background, "booking surface token").toBe("rgb(241, 233, 210)");
  expect.soft(surface.borderRadius, "booking surface radius").toBeGreaterThan(0);
  expect.soft(surface.boxShadow, "booking surface shadow").not.toBe("none");

  const supportingCopyColor = await page
    .locator(".place-truth-item-body")
    .first()
    .evaluate((element) => getComputedStyle(element).color);
  expect.soft(supportingCopyColor, "illustrated muted role").toBe("rgb(95, 90, 82)");

  const bookingSelect = page.locator(".booking-pill select");
  const dogTarget = page.locator(".booking-pill-dog");
  if (viewport.width < 768) {
    await expect(bookingSelect).toBeHidden();
    await expect(dogTarget).toBeHidden();
  } else {
    for (const [label, target] of [
      ["booking select", bookingSelect],
      ["dog checkbox label", dogTarget],
    ] as const) {
      const box = await requiredBox(target, label);
      expect.soft(box.height, `${label} block size`).toBeGreaterThanOrEqual(44);
    }
  }
}

async function computedRgbColors(locator: Locator) {
  return locator.evaluate((element) => {
    const image = getComputedStyle(element).backgroundImage;
    const matches = image.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g) ?? [];
    return [...new Set(matches.map((color) => color.replace(/\s+/g, " ")))];
  });
}

async function computedGradientEndpoints(locator: Locator) {
  const colors = await computedRgbColors(locator);
  return colors.length ? [colors[0], colors.at(-1)] : [];
}

async function computedColorStopOffset(locator: Locator, color: string) {
  return locator.evaluate((element, expectedColor) => {
    const image = getComputedStyle(element).backgroundImage;
    const colorIndex = image.indexOf(expectedColor);
    if (colorIndex < 0) return null;
    const afterColor = image.slice(colorIndex + expectedColor.length);
    const stop = afterColor.match(/^\s+(-?[\d.]+)(%|px)/);
    return stop ? { value: Number.parseFloat(stop[1]), unit: stop[2] as "%" | "px" } : null;
  }, color);
}

async function computedSurfaceBackground(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { image: style.backgroundImage, color: style.backgroundColor };
  });
}

async function expectEqualGalleryDetails(page: Page, galleryDetails: Locator) {
  const tracks = await computedGridTracks(galleryDetails, "gridTemplateColumns");
  expect.soft(tracks, "gallery details compute three tracks").toHaveLength(3);
  const trackWidths = tracks.map((track) => Number.parseFloat(track));
  expect.soft(trackWidths.every(Number.isFinite), "gallery detail tracks resolve to pixels").toBe(true);
  expect
    .soft(Math.max(...trackWidths) - Math.min(...trackWidths), "gallery detail track widths")
    .toBeLessThanOrEqual(geometryTolerance);

  const detailItems = page.locator(".editorial-gallery-detail");
  const detailWidths: number[] = [];
  for (let index = 0; index < (await detailItems.count()); index += 1) {
    detailWidths.push((await requiredBox(detailItems.nth(index), `gallery detail ${index + 1}`)).width);
  }
  expect.soft(detailWidths, "gallery renders three detail children").toHaveLength(3);
  expect
    .soft(Math.max(...detailWidths) - Math.min(...detailWidths), "gallery detail child widths")
    .toBeLessThanOrEqual(geometryTolerance);
}

async function expectImmediateGalleryBounds(page: Page, width: (typeof boundaryWidths)[number]) {
  const galleryGrid = await requiredBox(page.locator(".editorial-gallery-grid"), "gallery grid");

  const dominant = page.locator(".editorial-gallery-dominant");
  const dominantBox = await requiredBox(dominant, "gallery dominant container");
  expectInside(dominantBox, galleryGrid, "gallery dominant container");
  expectInside(
    await requiredBox(dominant.locator(".photo-clearing-frame"), "gallery dominant frame"),
    dominantBox,
    "gallery dominant frame",
  );

  const mediums = page.locator(".editorial-gallery-mediums");
  let mediumsBox = galleryGrid;
  if (width >= 600 && width < 900) {
    expect.soft(await mediums.evaluate((element) => getComputedStyle(element).display)).toBe("contents");
  } else {
    mediumsBox = await requiredBox(mediums, "gallery medium group");
    expectInside(mediumsBox, galleryGrid, "gallery medium group");
  }
  const mediumItems = mediums.locator(".editorial-gallery-medium");
  for (let index = 0; index < (await mediumItems.count()); index += 1) {
    const medium = mediumItems.nth(index);
    const mediumBox = await requiredBox(medium, `gallery medium ${index + 1}`);
    expectInside(mediumBox, mediumsBox, `gallery medium ${index + 1}`);
    expectInside(
      await requiredBox(medium.locator(".photo-clearing-frame"), `gallery medium frame ${index + 1}`),
      mediumBox,
      `gallery medium frame ${index + 1}`,
    );
  }

  const details = page.locator(".editorial-gallery-details");
  const detailsBox = await requiredBox(details, "gallery detail group");
  expectInside(detailsBox, galleryGrid, "gallery detail group");
  const detailItems = details.locator(".editorial-gallery-detail");
  for (let index = 0; index < (await detailItems.count()); index += 1) {
    const detail = detailItems.nth(index);
    const detailBox = await requiredBox(detail, `gallery detail ${index + 1}`);
    expectInside(detailBox, detailsBox, `gallery detail ${index + 1}`);
    expectInside(
      await requiredBox(detail.locator(":scope > div"), `gallery detail frame ${index + 1}`),
      detailBox,
      `gallery detail frame ${index + 1}`,
    );
  }
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
  const ritualBox = await requiredBox(ritualGrid, "ritual grid");
  const thirdRitualBox = await requiredBox(page.locator(".ritual-step").nth(2), "third ritual card");

  if (width < 600) {
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(1);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(1);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(1);
  } else if (width < 900) {
    const supportingItems = page.locator(".editorial-gallery-medium");
    expect.soft(await supportingItems.count(), "gallery renders two supporting items").toBe(2);
    const firstSupportingBox = await requiredBox(supportingItems.nth(0), "first supporting gallery item");
    const secondSupportingBox = await requiredBox(supportingItems.nth(1), "second supporting gallery item");
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(2);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(3);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(2);
    expect.soft(dominantBox.width, "dominant gallery frame spans both columns").toBeGreaterThanOrEqual(
      galleryBox.width - geometryTolerance,
    );
    expect.soft(thirdRitualBox.width, "third ritual card spans both columns").toBeGreaterThanOrEqual(
      ritualBox.width - geometryTolerance,
    );
    expect
      .soft(
        Math.abs(firstSupportingBox.width - secondSupportingBox.width),
        "supporting gallery item widths",
      )
      .toBeLessThanOrEqual(geometryTolerance);
    expect
      .soft(firstSupportingBox.x, "supporting gallery items have distinct horizontal positions")
      .toBeLessThan(secondSupportingBox.x);
    expect
      .soft(firstSupportingBox.x + firstSupportingBox.width, "supporting gallery items do not overlap")
      .toBeLessThanOrEqual(secondSupportingBox.x + geometryTolerance);
    await expectEqualGalleryDetails(page, galleryDetails);
  } else {
    const supportingBox = await requiredBox(
      page.locator(".editorial-gallery-mediums"),
      "gallery supporting column",
    );
    expect.soft(await gridColumnCount(galleryGrid), "gallery columns").toBe(2);
    expect.soft(await gridColumnCount(galleryDetails), "gallery detail columns").toBe(3);
    expect.soft(await gridColumnCount(ritualGrid), "ritual columns").toBe(3);
    expect.soft(dominantBox.width, "dominant frame is wider than supporting column").toBeGreaterThan(
      supportingBox.width,
    );
    expect.soft(thirdRitualBox.width, "third ritual card is less than half the grid").toBeLessThan(
      ritualBox.width / 2,
    );
    await expectEqualGalleryDetails(page, galleryDetails);
    expect.soft(await gridRowCount(page.locator(".editorial-gallery-mediums")), "supporting gallery rows").toBe(2);
  }

  if (width < 900) {
    expect
      .soft(await page.locator(".site-nav-menu-trigger").isVisible(), "compact navigation trigger")
      .toBe(true);
    expect.soft(await page.locator(".site-nav-links").isVisible(), "desktop navigation links").toBe(false);
  } else {
    expect
      .soft(await page.locator(".site-nav-menu-trigger").isVisible(), "compact navigation trigger")
      .toBe(false);
    expect.soft(await page.locator(".site-nav-links").isVisible(), "desktop navigation links").toBe(true);
  }

  await expectImmediateGalleryBounds(page, width);
  await expectInsideImmediateParents(page, ".editorial-gallery-frame", 3, "editorial gallery frame");
  await expectInsideImmediateParents(page, ".editorial-gallery-detail", 3, "editorial gallery detail");
  await expectChildrenInside(page, ".ritual-step", ".ritual-sequence-steps");
  await expectInsideImmediateParents(page, ".ritual-step", 3, "ritual step");
  await expectInsideImmediateParents(page, ".ritual-step-proof", 3, "ritual step proof");
}

test.describe("responsive geometry", () => {
  for (const width of boundaryWidths) {
    test(`approved gallery, ritual, and navigation geometry at ${width}px`, async ({ page }) => {
      await openHome(page, { width, height: 900 });
      await expectResponsiveGeometry(page, width);
      expect.soft(await horizontalOverflow(page), `${width}px horizontal overflow`).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("adaptive gallery sizing", () => {
  test("photo counts map to measured responsive source slots", () => {
    const getSizes = (
      editorialGalleryModule as typeof editorialGalleryModule & {
        getEditorialGallerySizes?: (
          displayedMediumCount: number,
          displayedDetailCount: number,
        ) => { dominant: string; supporting: string; detail: string };
      }
    ).getEditorialGallerySizes;
    expect(typeof getSizes).toBe("function");
    if (!getSizes) throw new Error("getEditorialGallerySizes must be exported");

    expect(getSizes(2, 3)).toEqual({
      dominant:
        "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 52rem, 56vw",
      supporting:
        "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 28rem, 31vw",
      detail:
        "(max-width: 599px) 100vw, (max-width: 899px) 33vw, (min-width: 1440px) 26rem, 29vw",
    });
    expect(getSizes(1, 0).supporting).toBe(
      "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 28rem, 31vw",
    );
    expect(getSizes(0, 0).dominant).toBe(
      "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 80rem, 92vw",
    );
    expect(getSizes(2, 1).detail).toBe(
      "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 80rem, 92vw",
    );
    expect(getSizes(2, 2).detail).toBe(
      "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 40rem, 46vw",
    );
  });

  test("current photo roles declare measured responsive source slots", async ({ page, browser }) => {
    await openHome(page, { width: 1440, height: 1000 });

    await expect(
      page.locator(".editorial-gallery-dominant .photo-clearing-frame > img"),
    ).toHaveAttribute(
      "sizes",
      "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 52rem, 56vw",
    );
    expect(
      await page.locator(".editorial-gallery-medium img").evaluateAll((images) =>
        images.map((image) => image.getAttribute("sizes")),
      ),
    ).toEqual([
      "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 28rem, 31vw",
      "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 28rem, 31vw",
    ]);
    expect(
      await page.locator(".editorial-gallery-detail img").evaluateAll((images) =>
        images.map((image) => image.getAttribute("sizes")),
      ),
    ).toEqual([
      "(max-width: 599px) 100vw, (max-width: 899px) 33vw, (min-width: 1440px) 26rem, 29vw",
      "(max-width: 599px) 100vw, (max-width: 899px) 33vw, (min-width: 1440px) 26rem, 29vw",
      "(max-width: 599px) 100vw, (max-width: 899px) 33vw, (min-width: 1440px) 26rem, 29vw",
    ]);

    for (const deviceScaleFactor of [1, 2]) {
      for (const width of [600, 768, 899]) {
        const context = await browser.newContext({
          deviceScaleFactor,
          viewport: { width, height: 900 },
        });
        const page = await context.newPage();
        await openHome(page, { width, height: 900 });
        const ritualImages = page.locator(".ritual-step-proof .photo-clearing-frame > img");
        await ritualImages.first().scrollIntoViewIfNeeded();
        await page.waitForFunction(() =>
          [...document.querySelectorAll<HTMLImageElement>(".ritual-step-proof .photo-clearing-frame > img")].every(
            (image) => image.complete && image.naturalWidth > 0,
          ),
        );

        expect(await ritualImages.evaluateAll((images) => images.map((image) => image.getAttribute("sizes")))).toEqual([
          "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 26rem, 29vw",
          "(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 26rem, 29vw",
          "(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 26rem, 29vw",
        ]);

        const candidates = await ritualImages.evaluateAll((images) =>
          images.map((image) => {
            const ritualImage = image as HTMLImageElement;
            const renderedWidth = ritualImage.getBoundingClientRect().width;
            const sourceWidths = (ritualImage.getAttribute("srcset") ?? "")
              .split(",")
              .map((candidate) => Number.parseInt(candidate.trim().match(/\s(\d+)w$/)?.[1] ?? "0", 10))
              .filter((candidate) => candidate > 0);
            const intrinsicMax = Math.max(...sourceWidths, ritualImage.naturalWidth);
            const currentUrl = new URL(ritualImage.currentSrc, window.location.href);
            const selectedWidth =
              Number.parseInt(currentUrl.searchParams.get("w") ?? "0", 10) ||
              ritualImage.naturalWidth;
            return {
              intrinsicMax,
              renderedWidth,
              requiredWidth: Math.min(renderedWidth * window.devicePixelRatio, intrinsicMax),
              selectedWidth,
            };
          }),
        );
        for (const [index, candidate] of candidates.entries()) {
          expect.soft(
            candidate.selectedWidth,
            `${width}px DPR${deviceScaleFactor} ritual card ${index + 1} candidate`,
          ).toBeGreaterThanOrEqual(Math.ceil(candidate.requiredWidth));
        }
        await context.close();
      }
    }
  });

  test("desktop gallery collapses an empty supporting wrapper", async ({ page }) => {
    await openHome(page, { width: 1440, height: 1000 });

    const grid = page.locator(".editorial-gallery-grid");
    const mediums = page.locator(".editorial-gallery-mediums");
    await mediums.locator(".editorial-gallery-medium").evaluateAll((items) =>
      items.forEach((item) => item.remove()),
    );

    const gridBox = await requiredBox(grid, "gallery grid without supporting photos");
    const dominantBox = await requiredBox(
      page.locator(".editorial-gallery-dominant"),
      "dominant gallery without supporting photos",
    );
    const detailsBox = await requiredBox(
      page.locator(".editorial-gallery-details"),
      "detail gallery without supporting photos",
    );
    expect.soft(await gridColumnCount(grid), "empty supporting column collapses").toBe(1);
    expect.soft(await mediums.isHidden(), "empty supporting wrapper is hidden").toBe(true);
    expect
      .soft(dominantBox.width, "dominant gallery fills the collapsed grid")
      .toBeGreaterThanOrEqual(gridBox.width - geometryTolerance);
    expect
      .soft(detailsBox.width, "detail gallery remains full width")
      .toBeGreaterThanOrEqual(gridBox.width - geometryTolerance);
    expect
      .soft(detailsBox.y, "detail gallery remains below the dominant photo")
      .toBeGreaterThanOrEqual(dominantBox.y + dominantBox.height - geometryTolerance);
  });
});

test.describe("visual integrity", () => {
  for (const viewport of requiredViewports) {
    test(`${viewport.name} preserves content, controls, and chapter flow`, async ({ page }) => {
      if (process.env.UPDATE_UI_SCREENSHOTS === "1") test.slow();
      if (viewport === requiredViewports[0]) await expectSymlinkedCaptureParentRejected();
      await openHome(page, viewport);
      await lazyScrollAndWaitForImages(page);
      const captureConfig = await captureAuditEvidence(page, viewport.name);

      if (process.env.UPDATE_UI_SCREENSHOTS === "1") {
        const expectedProjectRoot = path.dirname(require.resolve("../package.json"));
        expect(captureConfig).toEqual({
          auditRelativePath: path.join("docs", "ui-audit", "after"),
          auditRoot: path.join(expectedProjectRoot, "docs", "ui-audit", "after"),
          captureSequence: {
            fullPageCapture: 3,
            mapReadyInViewport: 1,
            returnedTopAndSettled: 2,
          },
          fullPageStyle: expect.stringContaining("nextjs-portal"),
          mapReadyAfterTopBeforeFullPageCapture: true,
          mapReadinessSelector: ".gm-style img",
          projectRoot: expectedProjectRoot,
          sectionStyle: expect.stringContaining(".site-nav"),
        });
        if (!captureConfig) throw new Error("Opt-in capture did not return sequencing metadata");
        expect(captureConfig.captureSequence.mapReadyInViewport).toBeLessThan(
          captureConfig.captureSequence.returnedTopAndSettled,
        );
        expect(captureConfig.captureSequence.returnedTopAndSettled).toBeLessThan(
          captureConfig.captureSequence.fullPageCapture,
        );
        expect(captureConfig?.sectionStyle).toContain(".booking-dock--mobile");
        expect(projectRoot).toBe(expectedProjectRoot);
        expect(path.relative(projectRoot, auditRoot)).toBe(auditRelativePath);
        expect(capturePath(viewport.name, "full-page.png")).toBe(
          path.join(auditRoot, viewport.name, "full-page.png"),
        );
        const expectedFullPage = path.resolve(
          projectRoot,
          auditRelativePath,
          viewport.name,
          "full-page.png",
        );
        expect(existsSync(expectedFullPage), `${viewport.name} opt-in full-page capture`).toBe(true);
        if (sectionCaptureViewportNames.has(viewport.name)) {
          for (const sectionName of sectionCaptureNames) {
            expect(
              existsSync(capturePath(viewport.name, `${sectionName}.png`)),
              `${viewport.name} ${sectionName} capture`,
            ).toBe(true);
          }
        }
        if (viewport.name === requiredViewports[requiredViewports.length - 1].name) {
          expect(expectedAuditManifest).toHaveLength(23);
          expect(await listAuditFiles()).toEqual([...expectedAuditManifest]);
        }
      }

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

      if ([390, 768, 1440].includes(viewport.width)) {
        await expectNamedActionTargetsAndSurfaces(page, viewport);
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

  test("restrained treeline transitions replace broad gray bands", async ({ page }) => {
    const cases = [
      { viewport: { width: 2048, height: 1246 }, arrival: 96, trust: 56 },
      { viewport: { width: 768, height: 1024 }, arrival: 72, trust: 48 },
      { viewport: { width: 390, height: 844 }, arrival: 56, trust: 36 },
    ] as const;

    for (const fixture of cases) {
      await openHome(page, fixture.viewport);
      const bridges = [
        { locator: page.locator(".scene-bridge--arrival-trust"), height: fixture.arrival },
        { locator: page.locator(".scene-bridge--trust-interior"), height: fixture.trust },
      ];

      for (const [index, bridge] of bridges.entries()) {
        const box = await requiredBox(bridge.locator, `transition ${index + 1}`);
        expect.soft(box.height, `transition ${index + 1} height at ${fixture.viewport.width}px`).toBe(bridge.height);
        const flow = await bridge.locator.evaluate((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const previous = element.previousElementSibling?.getBoundingClientRect();
          const next = element.nextElementSibling?.getBoundingClientRect();
          return {
            overflow: style.overflow,
            marginTop: Number.parseFloat(style.marginTop),
            marginBottom: Number.parseFloat(style.marginBottom),
            previousDelta: previous ? rect.top - previous.bottom : Number.NaN,
            nextDelta: next ? next.top - rect.bottom : Number.NaN,
          };
        });
        expect.soft(flow.overflow, `transition ${index + 1} clipping`).toBe("hidden");
        expect.soft(flow.marginTop, `transition ${index + 1} top margin`).toBe(0);
        expect.soft(flow.marginBottom, `transition ${index + 1} bottom margin`).toBe(0);
        expect.soft(Math.abs(flow.previousDelta), `transition ${index + 1} upper adjacency`).toBeLessThanOrEqual(geometryTolerance);
        expect.soft(Math.abs(flow.nextDelta), `transition ${index + 1} lower adjacency`).toBeLessThanOrEqual(geometryTolerance);
      }

      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect.soft(horizontalOverflow, `horizontal overflow at ${fixture.viewport.width}px`).toBeLessThanOrEqual(0);
    }

    await openHome(page, { width: 2048, height: 1246 });
    const trustSpacing = await page.locator(".trust-forest-floor .scene-chapter-inner").evaluate((element) => {
      const style = getComputedStyle(element);
      return [Number.parseFloat(style.paddingTop), Number.parseFloat(style.paddingBottom)];
    });
    for (const [index, spacing] of trustSpacing.entries()) {
      expect.soft(spacing, `trust spacing ${index + 1}`).toBeGreaterThanOrEqual(72);
      expect.soft(spacing, `trust spacing ${index + 1}`).toBeLessThanOrEqual(96);
    }

    const arrivalSamples = await sampleVerticalPixels(
      page.locator(".scene-bridge--arrival-trust .scene-bridge-wash"),
      [0, 0.6, 0.82, 1],
    );
    const trustSamples = await sampleVerticalPixels(
      page.locator(".scene-bridge--trust-interior .scene-bridge-wash"),
      [0, 0.64, 0.84, 1],
    );
    expectRgbClose(arrivalSamples[0], [234, 231, 216], "arrival parchment endpoint");
    expectGreenBiased(arrivalSamples[1], "arrival 60% sample");
    expectGreenBiased(arrivalSamples[2], "arrival 82% sample");
    expectRgbClose(arrivalSamples[3], [30, 35, 31], "arrival forest endpoint");
    expectRgbClose(trustSamples[0], [30, 35, 31], "trust forest endpoint");
    expectGreenBiased(trustSamples[1], "trust 64% sample");
    expectGreenBiased(trustSamples[2], "trust 84% sample");
    expectRgbClose(trustSamples[3], [227, 230, 216], "trust sage endpoint");

    const artworkOpacity = await page.locator(".scene-bridge--arrival-trust").evaluate((element) => ({
      art: Number.parseFloat(getComputedStyle(element.querySelector(".scene-bridge-art")!).opacity),
      pines: [...element.querySelectorAll(".scene-bridge-pines")].map((pine) =>
        Number.parseFloat(getComputedStyle(pine).opacity),
      ),
    }));
    expect.soft(artworkOpacity.art, "arrival floor artwork opacity").toBeLessThanOrEqual(0.18);
    for (const [index, opacity] of artworkOpacity.pines.entries()) {
      expect.soft(opacity, `arrival pine opacity ${index + 1}`).toBeLessThanOrEqual(0.24);
    }
  });

  test("arrival uses a long atmospheric dissolve without a harsh row", async ({ page }) => {
    const cases = [
      { viewport: { width: 2048, height: 1246 }, height: 96 },
      { viewport: { width: 768, height: 1024 }, height: 72 },
      { viewport: { width: 390, height: 844 }, height: 56 },
    ] as const;

    for (const fixture of cases) {
      await openHome(page, fixture.viewport);
      const bridge = page.locator(".scene-bridge--arrival-trust");
      const box = await requiredBox(bridge, `arrival dissolve at ${fixture.viewport.width}px`);
      const contract = await bridge.evaluate((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const previous = element.previousElementSibling!.getBoundingClientRect();
        const next = element.nextElementSibling!.getBoundingClientRect();
        return {
          art: getComputedStyle(element.querySelector(".scene-bridge-art")!).display,
          pines: [...element.querySelectorAll(".scene-bridge-pines")].map(
            (pine) => getComputedStyle(pine).display,
          ),
          overflow: style.overflow,
          marginTop: Number.parseFloat(style.marginTop),
          marginBottom: Number.parseFloat(style.marginBottom),
          previousDelta: rect.top - previous.bottom,
          nextDelta: next.top - rect.bottom,
        };
      });
      expect.soft(box.height, `arrival dissolve height at ${fixture.viewport.width}px`).toBe(fixture.height);
      expect.soft(contract.art, `arrival art at ${fixture.viewport.width}px`).toBe("none");
      expect.soft(contract.pines, `arrival pines at ${fixture.viewport.width}px`).toEqual(["none", "none"]);
      expect.soft(contract.overflow, `arrival clipping at ${fixture.viewport.width}px`).toBe("hidden");
      expect.soft(contract.marginTop, `arrival top margin at ${fixture.viewport.width}px`).toBe(0);
      expect.soft(contract.marginBottom, `arrival bottom margin at ${fixture.viewport.width}px`).toBe(0);
      expect.soft(Math.abs(contract.previousDelta), `arrival upper adjacency at ${fixture.viewport.width}px`).toBeLessThanOrEqual(geometryTolerance);
      expect.soft(Math.abs(contract.nextDelta), `arrival lower adjacency at ${fixture.viewport.width}px`).toBeLessThanOrEqual(geometryTolerance);
      expect.soft(
        await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
        `arrival horizontal overflow at ${fixture.viewport.width}px`,
      ).toBeLessThanOrEqual(0);

      const rows = await sampleCenterColumn(bridge.locator(".scene-bridge-wash"));
      expect.soft(rows.length, `arrival minimum row count at ${fixture.viewport.width}px`).toBeGreaterThanOrEqual(fixture.height);
      expect.soft(rows.length, `arrival maximum row count at ${fixture.viewport.width}px`).toBeLessThanOrEqual(fixture.height + 1);
      expectRgbClose(rows[0], [234, 231, 216], `arrival top endpoint at ${fixture.viewport.width}px`);
      expectRgbClose(rows.at(-1)!, [30, 35, 31], `arrival bottom endpoint at ${fixture.viewport.width}px`);

      const firstIntermediate = Math.floor(rows.length * 0.28);
      const lastIntermediate = Math.floor(rows.length * 0.88);
      for (let row = firstIntermediate; row <= lastIntermediate; row += 1) {
        expectGreenBiased(rows[row], `arrival row ${row} at ${fixture.viewport.width}px`);
      }
      for (let row = 1; row < rows.length; row += 1) {
        expect.soft(
          rgbDistance(rows[row - 1], rows[row]),
          `arrival RGB delta row ${row} at ${fixture.viewport.width}px`,
        ).toBeLessThanOrEqual(12);
        expect.soft(
          Math.abs(rec709Luminance(rows[row - 1]) - rec709Luminance(rows[row])),
          `arrival luminance delta row ${row} at ${fixture.viewport.width}px`,
        ).toBeLessThanOrEqual(5);
      }
    }
  });

  test("arrival foreground plate feathers its rectangular boundary", async ({ page }) => {
    await openHome(page, { width: 2048, height: 1246 });

    const foreground = page.locator(".arrival-clearing .forest-scene-foreground");
    const treatment = await foreground.evaluate((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const chapter = element.closest(".arrival-clearing")!.getBoundingClientRect();
      return {
        maskImage: style.maskImage,
        webkitMaskImage: style.webkitMaskImage,
        startsBeforeChapterEnd: rect.top < chapter.bottom,
      };
    });

    expect(treatment.startsBeforeChapterEnd, "foreground overlaps the outgoing chapter boundary").toBe(true);
    expect(treatment.maskImage, "foreground owns a vertical feather instead of a hard image edge").toContain(
      "rgba(0, 0, 0, 0) 0%",
    );
    expect(treatment.webkitMaskImage, "WebKit receives the same vertical feather").toContain(
      "rgba(0, 0, 0, 0) 0%",
    );
  });

  test("transition surfaces use approved adjacent endpoint colors", async ({ page }) => {
    await openHome(page, { width: 1440, height: 1000 });

    expect.soft(await computedGradientEndpoints(page.locator(".scene-bridge--arrival-trust .scene-bridge-wash"))).toEqual([
      paper,
      forest,
    ]);
    expect.soft(await computedGradientEndpoints(page.locator(".scene-bridge--trust-interior .scene-bridge-wash"))).toEqual([
      forest,
      sage,
    ]);
    expect.soft(await computedRgbColors(page.locator(".scene-bridge--interior-gallery .scene-bridge-wash"))).toEqual([
      sage,
      paper,
    ]);

    expect.soft(await computedRgbColors(page.locator(".scene-chapter--ritual .forest-scene-bg"))).toEqual([
      paper,
      dusk,
    ]);
    expect.soft(await computedRgbColors(page.locator(".scene-chapter--lake .forest-scene-bg"))).toEqual([
      dusk,
      paper,
    ]);
    expect.soft(await computedRgbColors(page.locator(".scene-chapter--night .forest-scene-bg"))).toEqual([
      paper,
      night,
    ]);
    const footerBackground = await computedSurfaceBackground(page.locator(".site-footer--night"));
    expect.soft(footerBackground.image, "footer has no separate gradient").toBe("none");
    expect.soft(footerBackground.color, "footer continues night").toBe(night);
  });

});

test.describe("interaction and preservation", () => {
  test("desktop transition closes compact navigation and restores body scroll", async ({ page }) => {
    await openHome(page, { width: 899, height: 900 });

    const trigger = page.locator(".site-nav-menu-trigger");
    const panel = page.locator(".site-nav-mobile-panel");
    const initialBodyOverflow = await page.evaluate(() => document.body.style.overflow);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.setViewportSize({ width: 900, height: 900 });
    await page.waitForFunction(() => window.matchMedia("(min-width: 900px)").matches);
    await page.waitForTimeout(50);

    await expect.soft(trigger).toHaveAttribute("aria-expanded", "false");
    expect.soft(await page.evaluate(() => document.body.style.overflow)).toBe(initialBodyOverflow);
    await expect.soft(trigger).toBeHidden();
    await expect.soft(panel).toBeHidden();
    await expect.soft(page.locator(".site-nav-links")).toBeVisible();
    await expect.soft(page.locator(".site-nav-brand")).toBeFocused();

    await page.setViewportSize({ width: 899, height: 900 });
    const galleryAction = page.locator(".editorial-gallery-link");
    await galleryAction.focus();
    await expect(galleryAction).toBeFocused();
    await page.setViewportSize({ width: 900, height: 900 });
    await page.waitForFunction(() => window.matchMedia("(min-width: 900px)").matches);
    await expect.soft(galleryAction, "closed menu transition does not steal focus").toBeFocused();
  });

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

    const motionFamilies = [
      { label: "scene mist", selector: ".forest-scene-mist", count: 5 },
      { label: "world mist", selector: ".world-mist-band", count: 2 },
      { label: "ritual steam", selector: ".ritual-steam", count: 1 },
      { label: "scene bridge plate", selector: ".scene-bridge-plate", count: 2 },
      {
        label: "parallax layer",
        selector: ".photo-clearing-parallax-wrap .parallax-frame > div",
        count: 2,
      },
      {
        label: "gallery image",
        selector:
          ".editorial-gallery .photo-clearing-frame img, .editorial-gallery .editorial-gallery-detail img",
        count: 6,
      },
    ] as const;
    const identityTransforms = new Set([
      "none",
      "matrix(1, 0, 0, 1, 0, 0)",
      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    ]);
    for (const family of motionFamilies) {
      const surfaces = page.locator(family.selector);
      expect(await surfaces.count(), `${family.label} count`).toBe(family.count);
      for (let index = 0; index < family.count; index += 1) {
        const style = await surfaces.nth(index).evaluate((element) => {
          const computed = getComputedStyle(element);
          return {
            animationName: computed.animationName,
            transitionDuration: computed.transitionDuration,
            transform: computed.transform,
          };
        });
        expect.soft(style.animationName, `${family.label} ${index + 1} animation`).toBe("none");
        expect.soft(style.transitionDuration, `${family.label} ${index + 1} transition`).toBe("0s");
        expect
          .soft(identityTransforms.has(style.transform), `${family.label} ${index + 1} transform`)
          .toBe(true);
      }
    }

    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect(page.locator(".booking-dock--mobile")).toBeHidden();
  });

  test("live reduced motion clears parallax and stops decorative motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await openHome(page, { width: 1440, height: 1000 });

    const parallaxLayer = page.locator(".photo-clearing-parallax-wrap .parallax-frame > div").first();
    await parallaxLayer.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 240));
    await expect
      .poll(() => parallaxLayer.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe("none");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() => parallaxLayer.evaluate((element) => getComputedStyle(element).transform))
      .toBe("none");

    await page.evaluate(() => window.scrollBy(0, 240));
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    expect(await parallaxLayer.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

    const stoppedDecorations = page.locator(
      ".forest-scene-mist, .ritual-steam, .editorial-gallery img",
    );
    for (let index = 0; index < (await stoppedDecorations.count()); index += 1) {
      const style = await stoppedDecorations.nth(index).evaluate((element) => {
        const computed = getComputedStyle(element);
        return {
          animationName: computed.animationName,
          transitionDuration: computed.transitionDuration,
        };
      });
      expect.soft(style.animationName, `decoration ${index + 1} animation`).toBe("none");
      expect.soft(style.transitionDuration, `decoration ${index + 1} transition`).toBe("0s");
    }
  });

  test("mobile sticky booking hides when the final booking enters before the footer", async ({
    page,
  }) => {
    await openHome(page, { width: 390, height: 844 });

    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await expect(page.locator(".booking-dock--mobile")).toBeVisible();

    await page.locator("#reviews").scrollIntoViewIfNeeded();
    expect(
      await page.locator(".site-footer").evaluate((footer) => footer.getBoundingClientRect().top),
      "footer remains below the viewport when final booking takes over",
    ).toBeGreaterThanOrEqual(844);
    await expect(page.locator(".booking-dock--mobile")).toBeHidden();
  });

  test("mobile sticky hero observer uses the entry threshold and processes batched updates", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const NativeIntersectionObserver = window.IntersectionObserver;
      type ObserverRecord = {
        callback: IntersectionObserverCallback;
        observer: IntersectionObserver;
        options?: IntersectionObserverInit;
        targets: Element[];
      };
      const records: ObserverRecord[] = [];
      Reflect.set(window, "__stickyObserverRecords", records);

      window.IntersectionObserver = class extends NativeIntersectionObserver {
        private readonly record: ObserverRecord;

        constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
          super(callback, options);
          this.record = { callback, observer: this, options, targets: [] };
          records.push(this.record);
        }

        override observe(target: Element) {
          this.record.targets.push(target);
          // Manual batches are the sole state source in this harness; registering the
          // target natively would race those deterministic callbacks.
        }
      };
    });
    await openHome(page, { width: 390, height: 844 });

    const observerThreshold = await page.evaluate(() => {
      const hero = document.getElementById("hero-booking");
      type ObserverRecord = {
        options?: IntersectionObserverInit;
        targets: Element[];
      };
      const records = Reflect.get(window, "__stickyObserverRecords") as ObserverRecord[];
      return records.find((record) => hero != null && record.targets.includes(hero))?.options
        ?.threshold;
    });
    expect.soft(observerThreshold, "hero observer reacts as soon as the hero crosses the viewport").toBe(0);

    const dispatchHeroBatch = async (states: boolean[]) => {
      await page.evaluate((intersectionStates) => {
        const hero = document.getElementById("hero-booking");
        if (!hero) throw new Error("Hero booking target is missing");
        type ObserverRecord = {
          callback: IntersectionObserverCallback;
          observer: IntersectionObserver;
          targets: Element[];
        };
        const records = Reflect.get(window, "__stickyObserverRecords") as ObserverRecord[];
        const heroRecord = records.find((record) => record.targets.includes(hero));
        if (!heroRecord) throw new Error("Hero observer is missing");
        const boundingClientRect = hero.getBoundingClientRect();
        const entries: IntersectionObserverEntry[] = intersectionStates.map(
          (isIntersecting) => ({
            boundingClientRect,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: isIntersecting ? boundingClientRect : new DOMRectReadOnly(),
            isIntersecting,
            rootBounds: new DOMRectReadOnly(0, 0, window.innerWidth, window.innerHeight),
            target: hero,
            time: performance.now(),
          }),
        );
        heroRecord.callback(entries, heroRecord.observer);
      }, states);
    };

    await dispatchHeroBatch([true, false]);
    await expect.soft(page.locator(".booking-dock--mobile")).toBeVisible();

    const closingThreshold = await page.evaluate(() => {
      const finalBooking = document.getElementById("reviews");
      const footer = document.querySelector(".site-footer");
      type ObserverRecord = {
        options?: IntersectionObserverInit;
        targets: Element[];
      };
      const records = Reflect.get(window, "__stickyObserverRecords") as ObserverRecord[];
      return records.find(
        (record) =>
          finalBooking != null &&
          footer != null &&
          record.targets.includes(finalBooking) &&
          record.targets.includes(footer),
      )?.options?.threshold;
    });
    expect.soft(closingThreshold, "closing observer uses the entry threshold").toBe(0);

    const dispatchClosingBatch = async (
      states: Array<{ target: "final" | "footer"; isIntersecting: boolean }>,
    ) => {
      await page.evaluate((intersectionStates) => {
        const finalBooking = document.getElementById("reviews");
        const footer = document.querySelector(".site-footer");
        if (!finalBooking || !footer) throw new Error("Closing booking targets are missing");
        type ObserverRecord = {
          callback: IntersectionObserverCallback;
          observer: IntersectionObserver;
          targets: Element[];
        };
        const records = Reflect.get(window, "__stickyObserverRecords") as ObserverRecord[];
        const closingRecord = records.find(
          (record) => record.targets.includes(finalBooking) && record.targets.includes(footer),
        );
        if (!closingRecord) throw new Error("Closing observer is missing");
        const entries: IntersectionObserverEntry[] = intersectionStates.map((state) => {
          const target = state.target === "final" ? finalBooking : footer;
          const boundingClientRect = target.getBoundingClientRect();
          return {
            boundingClientRect,
            intersectionRatio: state.isIntersecting ? 1 : 0,
            intersectionRect: state.isIntersecting ? boundingClientRect : new DOMRectReadOnly(),
            isIntersecting: state.isIntersecting,
            rootBounds: new DOMRectReadOnly(0, 0, window.innerWidth, window.innerHeight),
            target,
            time: performance.now(),
          };
        });
        closingRecord.callback(entries, closingRecord.observer);
      }, states);
    };

    await dispatchClosingBatch([
      { target: "final", isIntersecting: true },
      { target: "footer", isIntersecting: false },
    ]);
    await expect.soft(page.locator(".booking-dock--mobile")).toBeHidden();

    await dispatchClosingBatch([
      { target: "final", isIntersecting: false },
      { target: "footer", isIntersecting: true },
    ]);
    await expect.soft(page.locator(".booking-dock--mobile")).toBeHidden();

    await dispatchClosingBatch([
      { target: "final", isIntersecting: false },
      { target: "footer", isIntersecting: false },
    ]);
    await expect.soft(page.locator(".booking-dock--mobile")).toBeVisible();

    await dispatchHeroBatch([false, true]);
    await expect.soft(page.locator(".booking-dock--mobile")).toBeHidden();
  });
});

test.describe("late surface continuity", () => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844 },
  ] as const) {
    test(`${viewport.name} final booking meets the footer without a gap`, async ({ page }) => {
      await openHome(page, viewport);
      const finalBox = await requiredBox(page.locator("#reviews"), "Final booking section");
      const footerBox = await requiredBox(page.locator(".site-footer"), "Site footer");
      expect(Math.abs(footerBox.y - (finalBox.y + finalBox.height))).toBeLessThanOrEqual(
        geometryTolerance,
      );
    });
  }
});

test.describe("future responsive surface contracts", () => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000, minimumSpacing: 72 },
    { name: "mobile", width: 390, height: 844, minimumSpacing: 64 },
  ] as const) {
    test(`visual restraint: ${viewport.name} rails, atmosphere, and token spacing`, async ({ page }) => {
      await openHome(page, viewport);

      const restrainedFamilies = [
        {
          label: "Trust rails",
          selector: ".scene-chapter--trust .forest-scene-rail",
          expectedCount: 2,
        },
        {
          label: "Interior rails",
          selector: ".scene-chapter--interior .forest-scene-rail",
          expectedCount: 2,
        },
        {
          label: "Interior atmosphere",
          selector:
            ".scene-chapter--interior .forest-scene-mist, .scene-chapter--interior .forest-scene-canopy",
          minimumCount: 1,
        },
        {
          label: "Gallery atmosphere",
          selector:
            ".scene-chapter--gallery .forest-scene-mist, .scene-chapter--gallery .forest-scene-canopy, .scene-chapter--gallery .forest-scene-foreground",
          minimumCount: 1,
        },
      ] as const;
      for (const family of restrainedFamilies) {
        const layers = page.locator(family.selector);
        const count = await layers.count();
        if ("expectedCount" in family) {
          expect(count, `${family.label} count`).toBe(family.expectedCount);
        } else {
          expect(count, `${family.label} count`).toBeGreaterThanOrEqual(family.minimumCount);
        }
        for (let index = 0; index < count; index += 1) {
          const opacity = await layers.nth(index).evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).opacity),
          );
          expect.soft(opacity, `${family.label} ${index + 1} opacity`).toBeLessThanOrEqual(0.45);
        }
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

    expect(await computedGradientEndpoints(page.locator(".scene-bridge--arrival-trust .scene-bridge-wash"))).toEqual([
      paper,
      forest,
    ]);
    expect(await computedGradientEndpoints(page.locator(".scene-bridge--trust-interior .scene-bridge-wash"))).toEqual([
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

    await expect(
      page.locator(".clearing-home > .scene-bridge--interior-gallery ~ .scene-bridge"),
    ).toHaveCount(0);

    const cardRadii = await page
      .locator(
        ".trust-proof-chip, .photo-clearing-frame, .editorial-gallery-detail, .ritual-step, .ritual-step-proof .photo-clearing-frame, .booking-pill, .illustrated-map-panel, .place-truth-item, .place-truth-faq-item, .night-cta",
      )
      .evaluateAll((elements) => [
        ...new Set(elements.map((element) => getComputedStyle(element).borderTopLeftRadius)),
      ]);
    const nonZeroRadii = cardRadii.filter((radius) => radius !== "0px");
    expect.soft(cardRadii).toContain("0px");
    expect.soft(new Set(nonZeroRadii).size, "all elevated cards share one radius").toBeLessThanOrEqual(1);

    expect.soft(await computedRgbColors(page.locator(".scene-chapter--ritual .forest-scene-bg"))).toEqual([
      paper,
      dusk,
    ]);

    const placeBackground = page.locator(".scene-chapter--lake .forest-scene-bg");
    expect.soft(await computedRgbColors(placeBackground), "Place owns exactly dusk to paper").toEqual([
      dusk,
      paper,
    ]);
    const placeBackgroundBox = await requiredBox(placeBackground, "Place background");
    const placeGridBox = await requiredBox(page.locator(".place-truth-grid"), "Place truth grid");
    const parchmentStop = await computedColorStopOffset(placeBackground, paper);
    expect.soft(parchmentStop, "Place defines a resolved parchment stop").not.toBeNull();
    if (parchmentStop != null) {
      const parchmentOffset =
        parchmentStop.unit === "%"
          ? (placeBackgroundBox.height * parchmentStop.value) / 100
          : parchmentStop.value;
      const parchmentStopY = placeBackgroundBox.y + parchmentOffset;
      expect
        .soft(parchmentStopY, "Place reaches parchment before practical truth content")
        .toBeLessThanOrEqual(placeGridBox.y + geometryTolerance);
    }

    expect
      .soft(
        await computedRgbColors(page.locator(".scene-chapter--night .forest-scene-bg")),
        "Final owns exactly paper to night",
      )
      .toEqual([paper, night]);
    const footerBackground = await computedSurfaceBackground(page.locator(".site-footer--night"));
    expect.soft(footerBackground.image, "footer has no separate gradient").toBe("none");
    expect.soft(footerBackground.color, "footer continues a flat night surface").toBe(night);
  });
});
