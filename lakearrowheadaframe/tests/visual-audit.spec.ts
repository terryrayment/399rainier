import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/shoreline-rights",
  "/weekend-from-los-angeles",
  "/chapters",
  "/lake-arrowhead-cabin-with-sauna",
  "/dog-friendly-lake-arrowhead-cabin",
  "/lake-arrowhead-a-frame-cabin",
  "/holiday-ready",
  "/burnout-reset",
  "/classic",
  "/route-that-does-not-exist",
] as const;

const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1180, height: 820 },
  { width: 1280, height: 800 },
  { width: 1365, height: 900 },
  { width: 1440, height: 900 },
  { width: 1536, height: 960 },
  { width: 1920, height: 1080 },
] as const;

const coreRoutes = ["/", "/weekend-from-los-angeles"] as const;
const breakpointWidths = [767, 768, 1023, 1024, 1199, 1200, 1279, 1280, 1439, 1440] as const;
const qaBaseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3101";
const qaOrigin = new URL(qaBaseURL).origin;

test("QA target matches the requested deployment origin", async ({ page }) => {
  const requestedBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
  test.skip(!requestedBaseUrl, "A deployment URL was not requested.");
  await page.goto("/");
  expect(new URL(page.url()).origin).toBe(new URL(requestedBaseUrl!).origin);
});

async function settle(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForLoadState("domcontentloaded");
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(100);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.race([
      Promise.all(
        Array.from(document.images, (image) =>
          image.decode().catch(() => undefined),
        ),
      ),
      new Promise((resolve) => window.setTimeout(resolve, 2_000)),
    ]);
  });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}",
  });
}

async function layoutDiagnostics(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const viewport = root.clientWidth;
    const overflow = root.scrollWidth - viewport;
    const visible = Array.from(document.body.querySelectorAll<HTMLElement>("body *")).filter((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) > 0 &&
        rect.width > 1 &&
        rect.height > 1
      );
    });
    const outside = visible
      .filter((el) => {
        if (el.closest(".comparison-scroll, [data-intentional-scroll]")) return false;
        if (el.closest('[aria-hidden="true"]')) return false;
        const clippingParent = el.parentElement?.closest<HTMLElement>("*");
        if (clippingParent) {
          const parentStyle = getComputedStyle(clippingParent);
          if (
            (parentStyle.overflowX === "hidden" || parentStyle.overflowX === "clip") &&
            !el.matches("a, button, input, select, textarea") &&
            !el.textContent?.trim()
          ) {
            return false;
          }
        }
        const rect = el.getBoundingClientRect();
        return rect.left < -1 || rect.right > viewport + 1;
      })
      .slice(0, 20)
      .map((el) => ({
        selector: `${el.tagName.toLowerCase()}.${Array.from(el.classList).join(".")}`,
        rect: el.getBoundingClientRect().toJSON(),
      }));
    const clippedText = visible
      .filter((el) => {
        if (el.classList.contains("sr-only")) return false;
        if (!el.textContent?.trim() || el.children.length > 0) return false;
        const style = getComputedStyle(el);
        if (style.overflowX === "visible" && style.overflowY === "visible") return false;
        return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
      })
      .slice(0, 20)
      .map((el) => `${el.tagName.toLowerCase()}.${Array.from(el.classList).join(".")}`);
    const invalidControls = visible
      .filter((el) => el.matches("a[href], button, input, select, textarea"))
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width < 1 || rect.height < 1;
      })
      .map((el) => `${el.tagName.toLowerCase()}.${Array.from(el.classList).join(".")}`);
    return { overflow, outside, clippedText, invalidControls };
  });
}

async function installWindowOpenCapture(page: Page) {
  await page.addInitScript(() => {
    const capture = window as Window & { __qaLastOpenedUrl?: string };
    window.open = (url?: string | URL) => {
      capture.__qaLastOpenedUrl = String(url ?? "");
      return null;
    };
  });
}

async function capturedWindowOpenUrl(page: Page) {
  return page.evaluate(
    () => (window as Window & { __qaLastOpenedUrl?: string }).__qaLastOpenedUrl ?? "",
  );
}

for (const route of routes) {
  test(`layout: ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await settle(page);
    expect(await layoutDiagnostics(page)).toEqual({
      overflow: 0,
      outside: [],
      clippedText: [],
      invalidControls: [],
    });
  });
}

for (const viewport of viewports) {
  for (const route of routes) {
    test(`full matrix: ${route} at ${viewport.width}x${viewport.height}`, async ({
      browserName,
      page,
    }) => {
      test.skip(browserName !== "chromium", "Full route matrix runs in Chromium.");
      await page.setViewportSize(viewport);
      await page.goto(route);
      await settle(page);
      const diagnostics = await layoutDiagnostics(page);
      expect(diagnostics.overflow, JSON.stringify(diagnostics, null, 2)).toBeLessThanOrEqual(1);
      expect(diagnostics.outside, JSON.stringify(diagnostics, null, 2)).toEqual([]);
      expect(diagnostics.clippedText, JSON.stringify(diagnostics, null, 2)).toEqual([]);
      if (process.env.AUDIT_SCREENSHOTS) {
        const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
        const prefix = `/tmp/lakearrowheadaframe-audit/${slug}-${viewport.width}x${viewport.height}`;
        await page.screenshot({ path: `${prefix}-viewport.png` });
        await page.screenshot({ path: `${prefix}-full.png`, fullPage: true });
      }
    });
  }
}

for (const width of breakpointWidths) {
  for (const route of coreRoutes) {
    test(`breakpoint edge: ${route} at ${width}px`, async ({ browserName, page }) => {
      test.skip(browserName !== "chromium", "Breakpoint matrix runs in Chromium.");
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await settle(page);
      const diagnostics = await layoutDiagnostics(page);
      expect(diagnostics.overflow, JSON.stringify(diagnostics, null, 2)).toBeLessThanOrEqual(1);
      expect(diagnostics.clippedText, JSON.stringify(diagnostics, null, 2)).toEqual([]);
    });
  }
}

for (const zoom of [1, 1.25, 1.5, 2]) {
  for (const route of coreRoutes) {
    test(`zoom: ${route} at ${zoom * 100}%`, async ({ browserName, page }) => {
      test.skip(browserName !== "chromium", "Zoom matrix runs in Chromium.");
      await page.setViewportSize({
        width: Math.round(1440 / zoom),
        height: Math.round(900 / zoom),
      });
      await page.goto(route);
      await settle(page);
      const diagnostics = await layoutDiagnostics(page);
      expect(diagnostics.overflow, JSON.stringify(diagnostics, null, 2)).toBeLessThanOrEqual(1);
      expect(diagnostics.clippedText, JSON.stringify(diagnostics, null, 2)).toEqual([]);
    });
  }
}

for (const route of coreRoutes) {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1365, height: 900 },
  ]) {
    test(`cross-browser smoke: ${route} at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);
      await settle(page);
      const diagnostics = await layoutDiagnostics(page);
      expect(diagnostics.overflow, JSON.stringify(diagnostics, null, 2)).toBeLessThanOrEqual(1);
      expect(diagnostics.clippedText, JSON.stringify(diagnostics, null, 2)).toEqual([]);
    });
  }
}

test("guide hero keeps one aligned, decoration-safe content stack", async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 900 });
  await page.goto("/weekend-from-los-angeles");
  await settle(page);
  const result = await page.evaluate(() => {
    const rect = (selector: string) =>
      document.querySelector<HTMLElement>(selector)?.getBoundingClientRect().toJSON();
    const content = [
      rect(".page-shell-title"),
      rect(".page-shell-lead"),
      rect(".page-shell-hero-cta .airbnb-button"),
    ].filter(Boolean) as DOMRect[];
    const decorations = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".page-shell-hero-scene .forest-layer:not(.forest-scene-mist)",
      ),
      (el) => el.getBoundingClientRect().toJSON(),
    );
    const overlaps = content.flatMap((item) =>
      decorations.filter(
        (art) =>
          item.left < art.right &&
          item.right > art.left &&
          item.top < art.bottom &&
          item.bottom > art.top,
      ),
    );
    return {
      origins: content.map((item) => Math.round(item.left)),
      overlaps: overlaps.length,
    };
  });
  expect(new Set(result.origins).size).toBe(1);
  expect(result.overlaps).toBe(0);
});

test("mobile menu traps focus, closes with Escape, and releases focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await settle(page);
  const trigger = page.locator(".site-nav-menu-trigger");
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile primary" })).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile primary" })
      .getByRole("link", { name: "Lake Access" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Mobile primary" })).toBeHidden();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile primary" })
    .getByRole("link", { name: "Lake Access" })
    .click();
  await expect(page).toHaveURL(/\/shoreline-rights$/);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("burnout quiz supports backtracking and restart without stale height", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/burnout-reset");
  await settle(page);
  await page.getByRole("button", { name: "Screen-fatigued. I need quiet" }).click();
  await expect(page.getByText("Question 2 of 4")).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByText("Question 1 of 4")).toBeVisible();
  for (const label of [
    "Screen-fatigued. I need quiet",
    "Just me or us two",
    "Sauna, fireplace, Ms Pac-Man",
    "Up to 90 minutes from LA",
  ]) {
    await page.getByRole("button", { name: label }).click();
  }
  await expect(page.getByRole("heading", { name: "48-Hour Reset Protocol" })).toBeVisible();
  await page.getByRole("button", { name: "Restart quiz" }).click();
  await expect(page.getByText("Question 1 of 4")).toBeVisible();
  expect((await layoutDiagnostics(page)).clippedText).toEqual([]);
});

test("booking form preserves guest and dog state in the Airbnb link", async ({ page }) => {
  await installWindowOpenCapture(page);
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  await settle(page);
  const form = page.locator(".booking-pill").first();
  await form.getByLabel("Guests").selectOption("8");
  await form.getByLabel("Bringing a dog?").check();
  await form.getByRole("button", { name: "Check availability" }).click();
  const openedUrl = await capturedWindowOpenUrl(page);
  expect(openedUrl).toContain("adults=8");
  expect(openedUrl).toContain("pets=1");
});

test("booking calendar stays contained and emits a dated Airbnb URL", async ({ page }) => {
  await installWindowOpenCapture(page);
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await settle(page);
  const form = page.locator(".booking-pill").first();
  await form.getByRole("button", { name: /Check-in/ }).click();
  const dialog = page.getByRole("dialog", { name: "Select stay dates" });
  const days = dialog.locator(".booking-calendar-day:not(:disabled)");
  await days.nth(0).click();
  await days.nth(1).click();
  expect((await layoutDiagnostics(page)).overflow).toBeLessThanOrEqual(1);
  await form.getByRole("button", { name: "Check availability" }).click();
  const openedUrl = await capturedWindowOpenUrl(page);
  expect(openedUrl).toContain("check_in=");
  expect(openedUrl).toContain("check_out=");
});

for (const route of routes) {
  test(`resource and link health: ${route}`, async ({ browserName, page, request }) => {
    test.skip(browserName !== "chromium", "Resource/link crawl runs once in Chromium.");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      const isExpectedNotFoundLog =
        route === "/route-that-does-not-exist" &&
        message.text().includes("Failed to load resource") &&
        message.text().includes("404");
      if (
        message.type() === "error" &&
        !isExpectedNotFoundLog
      ) {
        errors.push(`console: ${message.text()}`);
      }
    });
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (
        url.origin === qaOrigin &&
        response.status() >= 400 &&
        !(route === "/route-that-does-not-exist" && response.request().isNavigationRequest())
      ) {
        errors.push(`${response.status()} ${url.pathname}`);
      }
    });
    await page.goto(route);
    await settle(page);
    const links = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => (anchor as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    for (const href of [...new Set(links)]) {
      const target = new URL(href, qaBaseURL);
      const response = await request.get(target.origin + target.pathname + target.search);
      expect(response.status(), `${route} links to ${href}`).toBeLessThan(400);
      if (target.hash && target.pathname === new URL(page.url()).pathname) {
        expect(
          await page.locator(target.hash).count(),
          `${route} is missing hash target ${target.hash}`,
        ).toBeGreaterThan(0);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("gallery hash target clears the fixed header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#gallery");
  await settle(page);
  await page.locator("#gallery").evaluate((target) => target.scrollIntoView());
  const positions = await page.evaluate(() => ({
    target: document.querySelector("#gallery")?.getBoundingClientRect().top ?? -1,
    header: document.querySelector("header")?.getBoundingClientRect().bottom ?? 0,
  }));
  expect(positions.target).toBeGreaterThanOrEqual(positions.header - 1);
});

test("mobile home hero starts as an intentional first-screen composition", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await settle(page);
  const spacing = await page.evaluate(() => {
    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const photoTop =
      document.querySelector(".arrival-clearing-photo")?.getBoundingClientRect().top ?? 9999;
    return photoTop - headerBottom;
  });
  expect(spacing).toBeGreaterThanOrEqual(16);
  expect(spacing).toBeLessThanOrEqual(96);
});

test("404 page provides a branded route back into the site", async ({ page }) => {
  await page.goto("/route-that-does-not-exist");
  await settle(page);
  await expect(page.getByRole("heading", { name: "Lost in the pines." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to the cabin" })).toHaveAttribute(
    "href",
    "/",
  );
});
