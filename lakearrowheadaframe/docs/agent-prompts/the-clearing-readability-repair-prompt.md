# Copy/Paste Prompt: Repair “The Clearing” Without Watering It Down

Paste everything below into the implementation agent while its working directory is:

`/Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe`

---

You are the lead frontend engineer responsible for repairing the current illustrated Lake Arrowhead A-Frame site. Work directly in the existing Next.js codebase and finish the implementation, visual QA, accessibility QA, and verification.

## Outcome

Keep the approved **“The Clearing”** art direction at full intensity: painterly forest edges, parchment grain, dusk/ember scenes, atmospheric transitions, and authentic cabin photography. Do **not** retreat to a generic beige card site or remove the brand world.

The current build has a strong concept but several concrete CSS, layering, typography, responsive, accessibility, and tooling defects. Repair those defects so the site feels immersive **and** every word, photo, form, map control, and CTA is easy to see and use.

This is an implementation task, not another design proposal. Inspect the current state, make the fixes, run the application, test it at the specified routes and viewports, refine screenshots, and do not stop at recommendations.

## Read before editing

Read:

- `docs/superpowers/specs/2026-07-21-the-clearing-illustrated-site-design.md`
- `docs/agent-prompts/the-clearing-implementation-prompt.md`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/(illustrated)/layout.tsx`
- `src/app/(illustrated)/page.tsx`
- `src/components/illustration/illustrated-world.tsx`
- `src/components/illustration/forest-scene.tsx`
- `src/components/illustration/photo-clearing.tsx`
- `src/components/illustration/forest-transition.tsx`
- `src/components/illustration/scene-motion.tsx`
- `src/components/illustration/booking-dock.tsx`
- `src/components/illustration/atmospheric-artwork.tsx`
- `src/components/home/`
- `src/components/page-shell.tsx`
- `src/components/seo-lander-page.tsx`
- `src/components/site-chrome.tsx`
- `src/components/airbnb-button.tsx`
- `src/data/photos.ts`
- `eslint.config.mjs`

Use these as visual direction, not literal page backgrounds:

- `../docs/brand/illustration-refs/ref-site-motif-heavy.png`
- `../docs/brand/illustration-refs/ref-motif-kit.png`
- `../docs/brand/illustration-refs/ref-concept-a-glass-pines.png`
- `../docs/brand/illustration-refs/ref-concept-b-deck-lights.png`
- `../docs/brand/illustration-refs/ref-concept-c-heat-soak.png`

## Protect the existing work

This is a heavily modified working tree containing user-owned work.

1. Run `git status --short` before editing.
2. Inspect the diff of every existing file you intend to change.
3. Build on the current implementation; do not restore, delete, or overwrite unrelated work.
4. Do not use `git reset`, `git checkout --`, destructive clean commands, or broad automated rewrites.
5. Do not commit unless the user explicitly asks.
6. Preserve `/classic`, SEO metadata, JSON-LD, analytics, URLs, cabin facts, and booking-link behavior.

## Verified defects to fix

These are observed failures, not hypotheses. Address every item.

### P0. Content is obscured by decoration

The scene stacking contract is backwards:

- `src/app/globals.css` defines content at z-index 4 and foreground at 5.
- `.forest-layer--mid` uses the foreground z-index.
- `.forest-layer--fore` also uses z-index 5.
- `.forest-scene-content` stays at z-index 4.
- `ForestScene` mounts these rails and foreground layers around every chapter.

As rendered, forests cover trust proof, “Inside the glass” truths, ritual titles and descriptions, practical/FAQ text, final review copy, and CTAs. It is catastrophic on mobile and still occurs on desktop.

Repair the layer model. Generic canopy, mist, rails, forest floor, and transitions must stay behind content. The only artwork allowed above content is a deliberately bounded, photo-local overlap inside or immediately around a `PhotoClearing`; it may cross a photo corner by roughly 3–8%, but may never cross a text or interactive-control rectangle. Navigation, forms, links, buttons, and map controls must always be topmost and clickable.

Use a simple, documented z-index contract. For example: scene base 0, distant art 1, mist 2, environmental rails/floor 3, content 10, photo-local overlap 11 within its own isolated component, sticky booking 55, navigation 60. Keep grain behind text/chrome or prove that its opacity does not reduce contrast.

### P0. Mobile dark scenes collapse into a narrow strip

The mobile `.forest-scene-bg { left: 0; right: 0; }` rule is overridden by later, more specific dusk/night rules. At 390px, the dark background is only about 278px wide, leaving roughly 56px mismatched strips on each side. Dense rail desktop rules also beat the mobile rail rule; ritual/night rails become about 168px **each** on a 390px screen.

Put definitive mobile overrides after all tone/density variants and match their specificity. Below 768px:

- Dusk, forest, and night backgrounds must be full bleed with `inset-inline: 0`.
- Do not render full-height side rails through content-heavy scenes.
- Convert decoration to asymmetrical corner/edge clusters or hide it where necessary.
- Cap any mobile edge cluster around 20–24vw and keep the readable content column intact.
- Do not create pale side stripes, a 54px text corridor, or any horizontal overflow.

### P0. Dark-scene text inherits the wrong color

Dark tone text color is currently assigned to the empty `.forest-scene-bg` sibling, so it cannot inherit into `.forest-scene-content`. The final review and “Wake where the pines begin” render ink-on-night at roughly 1:1 contrast.

Apply tone foreground colors to `.forest-scene` or `.forest-scene-content`, then explicitly style secondary copy, metadata, and links. Night and dusk headings/body must be visibly parchment/light; ember/amber remains an accent, not the default body color.

### P0. Shoreline hero CTA is invisible

On `/shoreline-rights`, the hero CTA’s foreground computes to the same dark color as its background. `.page-shell-hero .inline-flex { color: inherit; }` overrides the button’s intended light text on light/sage PageShell variants.

Remove or narrow that override and preserve the explicit button variant color. Audit every PageShell route for the same regression.

### P1. Font wiring is broken and typography is inconsistent

`src/app/layout.tsx` loads DM Sans and Cormorant Garamond correctly, but runtime `--font-sans` and `--font-serif` aliases are unresolved. Body copy falls back to Apple/system sans. Tailwind’s `.font-serif` behavior wins on many elements, and a late selector list in `globals.css` force-fixes only eight headings.

Observed result: the hero is Cormorant, while “The Glass,” “The Pines,” “The Sauna,” ritual step headings, map title, practical headings, FAQ titles, supporting-page card titles, and the final CTA are system UI. Some system headings also inherit an awkward 1.5 line-height.

Create one reliable type system:

- Body/utility/navigation/labels: `var(--font-dm-sans)` with a system sans fallback.
- Editorial H1/H2/H3 and story/quote titles: `var(--font-cormorant)` with Georgia fallback.
- Use a proper Tailwind v4 utility or a single semantic display class whose computed style reliably wins; do not maintain a selector-by-selector `!important` list.
- Give display headings deliberate line-height, weight, tracking, and readable responsive sizes.
- Do not use Cormorant for tiny metadata or controls.

Verify computed `font-family` in the browser, not merely class names in JSX.

### P1. Low contrast and undersized type

Known failures include:

- `--color-muted` on parchment is about 4.27:1, below the 4.5:1 requirement for normal text.
- `--color-muted-light` on light surfaces is approximately 2.4–2.7:1.
- The orange 10.4px “Atmosphere” label is approximately 1.69:1 in the tested context.
- 11px booking labels and table headers are too small and weak.
- 12px footer legal text at 40% opacity is approximately 3.3:1 on night.
- Dark overlays create additional failures that automated tools cannot accurately model.

Create surface-aware text tokens rather than solving contrast with random local overrides. Meet WCAG AA: 4.5:1 for normal text and 3:1 for large text. Use approximately 16px minimum for body copy, 14px for captions/supporting copy, and at least 12px with adequate weight/contrast for true uppercase kickers. Increase footer legal text to a readable size/color. Add a local image scrim behind hero copy when needed; do not blur or wash out the photograph.

### P1. Mobile booking controls compete and overlap

The homepage renders both the full hero `BookingPill` and a fixed mobile `BookingDock`. The 275px-tall mobile form retains `border-radius: 9999px`, creating a giant oval, while the fixed CTA covers its helper text and later page content.

At mobile widths:

- Show only one primary booking action at a time.
- Use a compact, normal-radius hero action/panel, or hide the full form in favor of a clear hero CTA.
- Reveal the sticky availability CTA only after the hero action leaves the viewport; hide it when the final booking action/footer is in view.
- Reserve bottom padding including `env(safe-area-inset-bottom)` so it never covers content.
- Standardize primary CTA language to **“Check availability”**. Use a secondary phrase only when its behavior is genuinely different.

At desktop, keep the useful date/guest booking dock and ensure it remains visually attached to the hero without clipping.

### P1. Mobile navigation is absent

Below 768px, both the nav links and header CTA are hidden and no replacement exists. Add a compact, keyboard-operable mobile menu containing the same key routes. The trigger must be at least 44×44px, expose `aria-expanded`/`aria-controls`, have a visible focus state, close with Escape and route selection, and manage focus correctly. Do not cover the sticky booking action.

### P1. Fixed nav covers anchor headings

The site uses fixed navigation and smooth scrolling without an offset. Clicking Gallery places its heading partly beneath the ~85px nav. Add `scroll-padding-top` and/or section `scroll-margin-top` for `#gallery`, `#ritual`, `#location`, `#reviews`, and any other anchored chapter. Respect `prefers-reduced-motion` by disabling smooth scrolling and parallax/drift.

### P1. Illustration is multiplied instead of composed

The homepage currently mounts:

- A fixed multi-layer `IllustratedWorld`.
- Another 3–5 forest layers inside every `ForestScene`.
- More repeated branch plates on almost every `PhotoClearing`.

Runtime evidence on the homepage: 63 images, 45 raw `<img>` elements, 36 forest layers, and individual pine/branch assets repeated 6–8 times. This creates a stamped, repetitive look and the mobile pileup. Fixed full-page artwork also repeats/corrupts stitched full-page screenshots.

Choose one environmental owner per region. Make scene-level `ForestScene` the primary owner of meaningful forest art. Reduce `IllustratedWorld` to a subtle, non-fixed underlay such as paper atmosphere/mist, or remove it if scene backgrounds already provide continuity. Do not keep dense fixed forest walls and dense per-scene rails simultaneously. Use photo-local branches selectively, not on every image. Preserve asymmetry, texture, and the intended 20–28% collective forest-edge presence at 1440px.

Full-page screenshots and print capture must show one continuous journey, not fixed trees/nav stamped repeatedly into capture segments.

### P1. Repeated photography weakens the editorial rhythm

`rainier_46.jpg` is the hero and `rainier_5.jpg` is the narrative image, but both appear again immediately in the homepage gallery because it takes the first six photos unchanged. Exclude hero/narrative sources from the homepage gallery or reorder around unique room, deck, hot tub, sauna, and detail proof. Do not invent or relabel property imagery.

### P1. Guest-facing copy contains internal instructions

On `/chapters`, remove or rewrite this internal maintenance note:

> When the Airbnb review count grows, refresh anthologyMeta.issue and add a new chapter so search language stays current.

“Issue 85 of 85” and “Write chapter 86” also read like release bookkeeping. Replace them with polished, guest-centered wording using only facts already present in the data. Do not fabricate review counts or claims.

### P2. Accessibility and interaction cleanup

- Add a visible-on-focus “Skip to main content” link and a stable main-content target.
- Add explicit high-contrast `:focus-visible` treatment to every link, button, input, select, checkbox, calendar control, menu trigger, and menu item. Remove `outline-none` unless an equivalent ring is present.
- On `/shoreline-rights`, make the horizontally scrollable comparison table keyboard accessible with a labeled focusable wrapper and instructions, or redesign it as responsive cards while retaining semantic table data.
- Decorative assets must remain `aria-hidden`, empty-alt, and `pointer-events: none`.
- Preserve meaningful alt text for property photography and the explicit distinction between authentic property proof and atmospheric artwork.
- No focusable element may be hidden behind a rail, transition, fixed CTA, or nav.

### P2. Performance and motion

The fully scrolled mobile page currently transfers the same approximately 2.6MB of raw illustration assets as desktop. Largest plates are roughly 316–609KB. Runtime also has many blend/filter/transform layers and ten active animations.

- Replace raw full-size decorative `<img>` usage with appropriately sized `next/image` or `<picture>` sources and accurate `sizes` values.
- Mobile should receive mobile-sized art, not desktop-width source files.
- Lazy-load offscreen chapter art; only the actual above-fold LCP asset for a route/viewport may be eager/priority.
- Resolve Next’s LCP warnings for `/illustrations/heat-soak.webp` on the sauna route and `/photos/rainier_46.jpg` by identifying the real above-fold LCP per route - not by making every image eager.
- Reduce stacked full-screen blur, blend mode, live-filter, and transform work where it does not materially improve the composition.
- Replace the fixed live SVG turbulence overlay with a small pre-rendered texture, or otherwise ensure it is cheap and sits behind readable content.
- Use scene-local intersection/progress for motion, or remove parallax on mobile. Do not drive every on- and off-screen scene from one page-level scroll value capped at 4000px.
- Under `prefers-reduced-motion: reduce`, disable smooth scrolling, mist drift, and parallax transforms.

### P2. Repair lint configuration

`npm run build` and TypeScript currently pass, but `npm run lint` crashes before checking files with `TypeError: Converting circular structure to JSON`. The cause is the legacy `FlatCompat` configuration in `eslint.config.mjs` with Next 16 / ESLint 9.

Migrate to the native flat exports from `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, retaining appropriate ignores. Then resolve genuine lint errors without mass-disabling rules.

## Implementation order

Work in this order so visual polish is not performed on broken foundations:

1. Capture baseline screenshots of the required route/viewport matrix.
2. Repair z-index/layer ownership and mobile tone/density cascade.
3. Repair dark-scene foreground colors and the invisible PageShell CTA.
4. Repair font wiring, type hierarchy, sizes, and contrast tokens.
5. Repair mobile booking behavior, mobile navigation, anchor offsets, focus styles, skip link, and the shoreline table.
6. Remove repeated gallery images and internal review-maintenance copy.
7. Optimize illustration loading and motion without reducing the approved atmosphere.
8. Repair ESLint config and address actual lint findings.
9. Run the full verification matrix, inspect screenshots, and refine until every criterion passes.

Do not treat a green build as visual verification.

## Required verification matrix

Test at minimum these routes:

- `/`
- `/lake-arrowhead-cabin-with-sauna`
- `/shoreline-rights`
- `/chapters`

At each viewport:

- `390×844`
- `768×1024`
- `1440×1000`

Then perform a quick smoke pass over every other guest-facing illustrated route plus `/classic` to ensure shared-component changes did not regress them.

For the required matrix:

1. Capture top, representative middle/dark-scene, and bottom screenshots; capture full-page screenshots too.
2. Scroll the full page to exercise lazy loading and sticky behavior.
3. Verify there is no horizontal overflow and no unexpected blank band.
4. Inspect computed font families for body, H1, representative H2, and representative H3.
5. Use axe-core or an equivalent automated WCAG 2.1 A/AA pass, then manually inspect contrast over images and decorative overlays.
6. Keyboard-test skip link, desktop nav, mobile menu, hero booking, calendar, form fields, CTAs, scrollable table, map/link controls, and footer.
7. Click every in-page anchor and confirm the target heading sits fully below the fixed nav.
8. Test `prefers-reduced-motion: reduce`.
9. Check console, page exceptions, and failed network requests.
10. Inspect mobile network image requests and confirm responsive illustration delivery.

Run from the application root:

```bash
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

## Pass/fail acceptance criteria

Do not report completion unless all are true:

- No decorative layer obscures any text, photo subject, form field, table, map control, navigation item, or CTA at 390, 768, or 1440px.
- Mobile dusk/night/forest backgrounds are full width; no pale side strips or narrow central corridor remain.
- Mobile forest art is composed as corner/edge clusters and never crushes the content column.
- Body computed font begins with DM Sans; every intended editorial H1/H2/H3 begins with Cormorant Garamond.
- Normal text meets 4.5:1 and large text meets 3:1; captions and legal copy are readable without zoom.
- Final night review, CTA title/body, and links are visibly light and legible.
- The shoreline hero CTA has visible text in every state.
- Only one primary mobile booking action is visible at a time; it never covers content and respects the safe area.
- Mobile has a complete keyboard-accessible primary menu.
- A keyboard user can skip directly to main content and see a focus indicator on every control.
- The shoreline comparison is keyboard accessible on narrow screens.
- In-page anchors land below the fixed nav.
- Homepage gallery does not repeat the hero and narrative photos.
- `/chapters` contains no internal maintenance instructions or release-bookkeeping language.
- Full-page captures show one continuous design rather than repeated fixed artwork.
- Mobile receives appropriately sized illustration files and does not eagerly load offscreen scene art.
- Reduced-motion mode removes nonessential drift/parallax/smooth scrolling.
- Required routes return 200 with no console errors, page exceptions, failed image requests, or horizontal overflow.
- Automated accessibility checks have zero serious or critical violations on the required matrix. Manually verified image-overlay contrast also passes.
- `npx tsc --noEmit --pretty false`, `npm run lint`, and `npm run build` all exit successfully.
- `/classic`, metadata, structured data, analytics, factual copy, and Airbnb booking behavior remain intact.

## Final handoff

When finished, report:

1. Root causes fixed, grouped by layering, typography, responsive UI, accessibility, performance, and tooling.
2. Files changed.
3. Commands run and exact results.
4. Routes/viewports tested.
5. Screenshot paths for before/after comparison.
6. Any remaining limitation, with evidence.

Do not claim “fixed” based only on code inspection. The final state must be verified in a real browser at the required widths.
