# Lake Arrowhead A-Frame Visual UI Audit Design

**Date:** 2026-08-06  
**Status:** Approved  
**Target:** `lakearrowheadaframe` rental site linked to `https://lakearrowheadaframe.vercel.app/`

## Goal

Make the rental site calm, polished, cohesive, and intentional while preserving its content, photography, illustrated woodland character, routes, metadata, structured data, booking links, analytics, weather behavior, and accessibility.

This is a corrective styling pass, not a new template or brand redesign.

## Recovered Baseline

The workspace contained two different applications:

- the top-level `399rainier` real-estate sales site;
- the requested rental site in `lakearrowheadaframe`, whose source and package metadata were missing while its dependencies, Vercel link, build output, screenshots, and source maps remained.

The user approved reconstructing only the nested rental project and leaving the sales site untouched. The rental source was recovered from the production source maps without content changes. Its deployed visual assets were restored from the linked Vercel deployment. The recovered project type-checks and builds, and its local render matches the deployed site.

The deployed and recovered baselines are captured at:

- `docs/ui-audit/deployed-reference/`
- `lakearrowheadaframe/docs/ui-audit/before/`

## Evidence and Root Causes

The baseline inspection covered 1440×1000, 1280×800, 1024×768, 769×900, 768×1024, 767×900, 390×844, and 375×667.

The current design problems come from interacting implementation patterns rather than one isolated defect:

1. **Too many boundary owners.** Scene backgrounds, explicit `SceneBridge` components, pine rails, foreground plates, masks, negative overlaps, and local gradients often participate in the same transition. The result is muddy color stacking, apparent seams, and heavy dark bands.
2. **Artwork is used as layout structure.** Decorative scene plates and overlaps influence chapter geometry instead of staying behind stable content flow. This makes the page sensitive to viewport width and lazy image timing.
3. **Breakpoint discontinuities.** Gallery and ritual layouts switch at separate 768px and 900px thresholds. Combined with fixed aspect-ratio roles, height inheritance, and custom grid-area rules, the page changes sharply around tablet widths.
4. **Fragmented visual tokens.** The site has strong core colors but adds one-off background mixtures, radius values, shadows, opacities, spacing, and typography rules at component level. Similar cards and headings therefore look unrelated.
5. **Dense environmental framing.** The same pine rails, canopy, mist, floor texture, and foreground treatments recur with high intensity. The environment competes with property photography and booking decisions.
6. **Compound hero geometry.** The hero photo, booking dock, pine skirt, forest scene, and arrival-to-trust bridge overlap. The composition works at selected widths but is fragile and visually congested.
7. **Generated baseline stylesheet.** The exact authored stylesheet was not recoverable, but the production-equivalent compiled stylesheet was. Editing that 5,000-line artifact directly would be unsafe and obscure intent.

No horizontal document overflow was detected at the tested baseline widths. The pass must preserve that behavior while fixing internal balance and overlap.

## Considered Directions

### A. Surgical normalization

Fix collisions, sizing, gradients, and tokens while retaining nearly every decorative layer.

**Trade-off:** lowest visible change, but the page remains dense and the chapter system stays harder to reason about.

### B. Atmospheric restraint — approved

Preserve the illustrated woodland world and chapter narrative, but reduce its visual volume. Give each boundary one owner, normalize the design system, move primary layout into normal flow, and make photography and booking content dominant.

**Trade-off:** moderate CSS and limited markup changes, with substantially better calm and maintainability while preserving brand character.

### C. Photographic editorial reset

Remove most environmental illustration and convert the page into a quieter travel-magazine layout.

**Trade-off:** strongest simplification, but too much loss of the site's distinguishing visual identity.

## Approved Visual System

### Color

Use the existing woodland palette with explicit roles:

- **Parchment `#eae7d8`:** primary page field.
- **Elevated parchment `#f1e9d2`:** booking and decision surfaces.
- **Ink `#241f1a`:** main light-surface text.
- **Muted `#5f5a52`:** supporting light-surface text.
- **Pine `#2f523c`:** links, actions, focus, and restrained accents.
- **Forest `#1e231f`:** dark proof sections.
- **Dusk `#1c2a38`:** ritual chapter.
- **Night `#0e1412`:** final CTA and footer.
- **Line:** one low-opacity border derived from ink or parchment according to surface.

Gradients may bridge two adjacent surface colors only. Transparent gradients over unrelated colors are not allowed. A transition must fully resolve into the next section color.

### Typography

Retain DM Sans and Familjen Grotesk. Use one display treatment and one body treatment with a small hierarchy:

- hero headline: responsive, bold display, tight leading, maximum 13–15 characters per line;
- section headline: responsive display, consistent line height and tracking;
- card headline: one shared size and weight;
- body copy: 16px-equivalent, approximately 1.7 line height, generally 55–75 characters per line;
- supporting copy: one smaller body size with adequate contrast;
- eyebrow, navigation, and button labels: one compact semibold style with restrained uppercase tracking;
- FAQ questions: card-heading treatment, not a separate type system.

Major headings use balanced wrapping where supported. Hardcoded line breaks may remain only where the phrase is intentional and verified at all target widths.

### Spacing and Containers

Define a 4/8-based spacing scale and responsive section tokens. One content container serves prose and decision content; one wider container serves photography. Shared gutters use `clamp()` and never collapse against mobile viewport edges.

Section spacing is derived from tokens instead of unrelated local margins. Adjacent sections should either share a surface continuously or have one explicit transition.

### Surfaces

Use two component families:

1. flat editorial groups with minimal or no border;
2. subtly elevated booking or decision cards with one radius, one border, and one restrained shadow.

Do not nest multiple rounded, bordered surfaces without a functional reason.

## Approved Layout and Chapter Rules

### Arrival

The hero photograph and booking control remain one visual composition. The booking surface is attached within the hero composition in normal flow rather than positioned as a free-floating layer. The pine skirt is reduced or removed if it duplicates the following bridge.

### Arrival to Trust

One forest-floor bridge owns the parchment-to-forest transition. It may contain restrained edge pines, but it must not combine a hard background change, oversized floor plate, overlapping pine skirt, and multiple shadow/gradient layers.

### Trust

Use one continuous forest field for review and proof content. Environmental art stays behind content at low intensity. The proof content uses a shared text and spacing grid.

### Trust to Interior

One mist transition resolves from forest to sage. Its start and end colors exactly match the adjacent sections. It cannot use a transparent cutoff that reveals an unrelated body background.

### Interior and Gallery

Use stable image aspect ratios and normal-flow grids:

- desktop: dominant photograph plus two supporting photographs, with detail images below;
- tablet: dominant image spanning two columns, then supporting images in two columns;
- mobile: a single readable stack with no fixed-height blank columns.

All images use explicit aspect ratios, `object-fit: cover`, stable container dimensions, and consistent radius treatment. Photography remains visually dominant over environmental rails.

### Gallery to Ritual

Use a controlled parchment-to-dusk background transition. The ritual section owns its dusk opening; no separate banner-like landscape plate is introduced.

### Ritual Sequence

The sauna, cool-air deck, and hot-tub proof cards use the same structure and styling.

- desktop: three columns;
- tablet: two columns with the third card spanning the row when useful;
- mobile: one column.

Each card grows naturally with content. Image geometry comes from `aspect-ratio`; copy is not absolutely positioned.

### Place, FAQ, and Booking Truth

Return to a clean parchment reading field. Environmental artwork does not overlap practical decision content. The location panel, feature list, and FAQ share container alignment and type hierarchy.

### Final CTA and Footer

The final CTA and footer share one continuous night base. The mobile sticky booking bar disappears before footer actions enter view and accounts for safe-area insets.

## Responsive and Interaction Rules

- Validate required widths plus 769px and 767px to cover the current discontinuity.
- Do not hide meaningful content to make a layout fit.
- Primary layout uses document flow, Grid, and Flexbox. Absolute positioning is reserved for decorative layers and image overlays.
- No horizontal scroll, clipped text, escaping media, or controls against viewport edges.
- Touch targets are at least 44px in their smaller dimension.
- Hover and focus effects may change color, opacity, shadow, or transform, but cannot move surrounding layout.
- The existing mobile menu retains focus cycling, Escape close, body scroll lock, semantic navigation, and explicit expanded state.
- The existing booking links, campaign parameters, and navigation destinations are unchanged.

## Motion and Accessibility

- Preserve the skip link and visible `:focus-visible` treatment.
- Preserve semantic heading order and landmark structure.
- Maintain readable contrast on photographs and dark sections.
- All parallax, hover zoom, mist, steam, and transition motion stops under `prefers-reduced-motion`.
- Image alternative text and decorative empty-alt behavior remain unchanged.
- Form controls and booking inputs retain labels and keyboard access.

## Implementation Architecture

The recovered `src/app/globals.css` remains the exact deployed baseline. Add `src/app/ui-system.css` and import it after the baseline stylesheet. The new stylesheet owns named tokens and corrective component rules, making the pass reviewable without rewriting the recovered 5,000-line generated artifact.

Markup edits are limited to components where structure causes fragile layout:

- `src/components/home/arrival-clearing.tsx`
- `src/components/illustration/editorial-gallery.tsx`
- `src/components/illustration/ritual-sequence.tsx`
- `src/components/illustration/scene-bridge.tsx`
- `src/components/site-chrome.tsx`
- `src/app/layout.tsx`

Other components may receive class-name-only adjustments when required by the normalized grid. Content data, routes, SEO helpers, JSON-LD, booking behavior, analytics, and weather logic stay unchanged.

## Testing and Verification

Use test-first browser checks before production CSS changes. The baseline must demonstrate the targeted failures or unstable geometry, then the corrective implementation must make the tests pass.

Playwright coverage must include:

- 1440×1000, 1280×800, 1024×768, 769×900, 768×1024, 767×900, 390×844, and 375×667;
- zero horizontal overflow;
- all meaningful images loaded with nonzero natural dimensions;
- stable gallery and ritual geometry without unintended overlaps;
- section transition surfaces that resolve to adjacent colors;
- mobile menu open, keyboard cycle, Escape close, and body scroll restoration;
- booking, navigation, and external links retaining their destinations;
- visible focus states and minimum touch target sizes;
- reduced-motion behavior;
- full-page before and after screenshots and section-level visual inspection.

Project verification commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

If no `test` script exists, the implementation plan will add a Playwright test command rather than substituting manual checks.

The weather endpoint's existing fallback behavior remains unchanged and does not block visual rendering when upstream data is unavailable.

## Non-Goals

- No content rewrite.
- No route, metadata, schema, or tracking rewrite.
- No new UI framework.
- No heavy visual effects.
- No replacement photography or meaning changes.
- No redesign of the separate top-level sales site.
- No deployment or external publication without separate user authorization.
