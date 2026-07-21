# Copy/Paste Prompt: Implement “The Clearing”

Paste everything below into the implementation agent while its working directory is:

`/Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe`

---

You are the lead frontend engineer and visual designer responsible for implementing a complete illustrated redesign of this Next.js site.

## Mission

Implement the approved **“The Clearing”** direction across the Lake Arrowhead A-Frame guest-facing site.

The current site has some correct ingredients—parchment, forest colors, geometric pine components, concept illustrations, real property photography, and an illustrated route group—but the render is too watered down. It currently looks like a conventional card-based website with tree decorations.

The finished site must instead feel like one continuous illustrated Lake Arrowhead forest journey. Illustration creates the environment. Authentic photography proves the property.

This is an implementation task, not another strategy exercise. Inspect, plan, implement, run the app, capture screenshots, refine the visual result, and verify it. Do not stop after creating component scaffolding or describing what should change.

## Read first

Read the complete approved specification before modifying code:

`docs/superpowers/specs/2026-07-21-the-clearing-illustrated-site-design.md`

Inspect all of these references at full resolution:

- `../docs/brand/illustration-refs/ref-site-motif-heavy.png`
- `../docs/brand/illustration-refs/ref-motif-kit.png`
- `../docs/brand/illustration-refs/ref-concept-a-glass-pines.png`
- `../docs/brand/illustration-refs/ref-concept-b-deck-lights.png`
- `../docs/brand/illustration-refs/ref-concept-c-heat-soak.png`

Inspect the current implementation, particularly:

- `src/app/(illustrated)/page.tsx`
- `src/app/(illustrated)/layout.tsx`
- `src/app/classic/page.tsx`
- `src/app/globals.css`
- `src/components/site-chrome.tsx`
- `src/components/page-shell.tsx`
- `src/components/seo-lander-page.tsx`
- `src/components/review-strip.tsx`
- `src/components/airbnb-button.tsx`
- `src/components/illustration/`
- `src/components/home/`
- `src/data/cabin.ts`
- `src/data/illustrations.ts`
- `src/lib/routes.ts`
- `public/illustrations/`

## Mandatory working-tree safety

This repository already contains extensive uncommitted user work.

Before editing:

1. Run `git status --short`.
2. Inspect diffs for every existing file you plan to touch.
3. Treat all existing modifications and untracked files as user-owned.
4. Preserve and build upon the current illustrated work.
5. Do not restore, delete, or overwrite unrelated changes.
6. Do not use `git reset`, `git checkout --`, destructive clean commands, or broad automated rewrites.
7. Do not commit unless the user explicitly asks you to commit.

## Approved decisions

These choices are final and do not need to be revisited:

1. **Hero:** authentic cabin photo is the focal point inside a dense illustrated forest clearing.
2. **Scope:** the visual system applies across the entire guest-facing site.
3. **Intensity:** homepage uses maximum atmosphere; supporting pages use approximately 50–70% intensity.
4. **Truth rule:** property-specific visual claims must be accurate. Atmospheric art may be imaginative when it is clearly mood rather than proof.
5. **Direction:** “The Clearing,” not field-guide minimalism and not an all-dark midnight site.
6. **Fallback:** preserve `/classic` as the non-illustrated experience.

Do not ask the user to choose a different direction.

## Non-negotiable visual principle

**Illustration establishes the world. Photography proves the property.**

Do not replace real property evidence with generated art. Any visual implying “this is the cabin, deck, sauna, hot tub, yard, or lake access you are booking” must use actual property photography or be immediately paired with actual proof.

The supplied concept images may establish palette, texture, forest density, dusk, and warmth. If an illustrated architectural or amenity detail does not match the actual property, treat it as atmospheric artwork and do not caption it as a literal property view.

## Visual target

The current narrow pale tree rails are insufficient.

At 1440px:

- The opening must immediately read as being inside a forest.
- The real cabin photo must remain the strongest focal point.
- Illustrated forest should occupy 20–28% of the viewport edges collectively, with 20% as the minimum acceptance threshold.
- Use irregular, asymmetrical, layered silhouettes.
- Allow selected foreground branches, shrubs, or rocks to overlap major photos by 3–8%.
- Avoid obvious mirrored copies and repeated identical clusters.
- Use painterly, screen-printed, grainy texture consistent with the references.
- Do not use generic triangles, line icons, emoji, or clean corporate vector trees as primary scene art.

At 390px:

- Keep the hero photo large and recognizable.
- Convert side forests into corner clusters, foreground silhouettes, and full-width transitions.
- Do not narrow body copy into a corridor.
- Keep the availability action thumb-reachable.
- Prevent all horizontal overflow.

## Scene progression

Build a continuous atmospheric journey:

1. `arrival`: warm parchment, morning sage, pale mist, tall pines.
2. `interior`: warm paper, moss, stone, low foliage.
3. `gallery`: open light clearing with sparse foreground.
4. `ritual`: dusk blue, deep green, steam, ember light.
5. `lake`: sage lake mist, mountains, shoreline, rocks, water.
6. `night`: deep forest, mountain silhouettes, warm window light.

No more than two consecutive homepage chapters may use the same base tone.

Each scene can compose these layers independently:

1. Base color and paper grain.
2. Distant canopy or mountains.
3. Mist or haze.
4. Midground trees and shrubs.
5. Foreground branches, rocks, water, or forest floor.

## Asset phase: do this before layout polish

Audit every existing file in `public/illustrations/` and record which assets are:

- Property accurate.
- Atmospheric only.
- Decorative and reusable.
- Unsuitable for production.

The motif reference sheet is not a ready-made transparent sprite. Create or prepare production assets for at least:

- Dense tall-pine cluster, left.
- Dense tall-pine cluster, right, independently composed rather than mirrored.
- Distant pine canopy.
- Low shrub mass in two or more variants.
- Rock and forest-floor cluster.
- Foreground branch in two orientations.
- Mist band in at least two variants.
- Lake-water motif.
- Smoke/steam wisp.
- Warm window-glow motif.
- Distant mountain silhouette.

Prefer transparent WebP/AVIF or textured SVG where genuinely appropriate. Preserve grain and irregularity.

If your environment has image-generation or image-editing capability, use the five references to create original, production-ready transparent assets. Do not copy a single reference composition. If that capability is unavailable, use the existing painterly concept art as large masked atmospheric plates and build organic CSS/SVG support layers; do not regress to repeated flat geometric pines. Clearly report any remaining asset limitation.

Do not use `ref-site-motif-heavy.png` as a literal page background because it contains placeholder interface blocks.

## Required component architecture

Implement or adapt these responsibilities as focused components. Names may vary slightly only when the existing codebase has a clearly better convention.

### Illustration primitives

- `ForestScene`
  - Owns scene tone, distant canopy, mist, side density, foreground, and responsive asset selection.
  - Accepts a typed scene configuration.
  - Provides a predictable layering context.

- `SceneChapter`
  - Semantic section wrapper.
  - Supports `arrival`, `interior`, `gallery`, `ritual`, `lake`, and `night` variants.
  - Controls content width and chapter-level theme tokens.

- `PhotoClearing`
  - Holds authentic property photography.
  - Supports controlled foliage overlap without covering important details.

- `AtmosphericArtwork`
  - Displays explicitly non-literal concept art.
  - Keeps its semantics distinct from property photography.

- `ForestTransition`
  - Creates continuous scene changes.
  - Replaces repetitive triple-pine and mist-divider separators.

- `BookingDock`
  - Desktop booking controls attached to natural decision points.
  - Persistent mobile availability action.

- `EditorialGallery`
  - Supports dominant, medium, and detail-photo roles.
  - Does not render six equal ecommerce cards.

- `RitualSequence`
  - Presents heat, cold air, and soaking as a single dusk narrative.

- `IllustratedMap`
  - Preserves accurate map/location data and interactions.
  - Supplies atmospheric landscape framing.

### Data model

Create a typed scene configuration module, preferably:

`src/data/illustration-scenes.ts`

It should capture at least:

```ts
type SceneName = "arrival" | "interior" | "gallery" | "ritual" | "lake" | "night";

type SceneConfig = {
  name: SceneName;
  tone: "paper" | "sage" | "dusk" | "forest" | "night";
  density: "open" | "medium" | "dense";
  foreground: "none" | "branches" | "shrubs" | "rocks" | "water" | "forest-floor";
  mist: "none" | "low" | "medium" | "heavy";
  intensity: number;
};
```

Extend this type only for concrete scene requirements. Do not build a general animation or page-builder framework.

### Homepage organization

Split the current large homepage route into focused components under `src/components/home/`. The route should mainly compose sections and preserve JSON-LD.

Create equivalent responsibilities for:

1. `ArrivalClearing`
2. `TrustForestFloor`
3. `InsideTheGlassChapter`
4. `PhotographicClearing`
5. `RitualAtDusk`
6. `PlaceAndPracticalTruth`
7. `NightBookingClose`

Do not duplicate content already present in `cabin.ts`. Reuse the current source of truth.

## Exact homepage requirements

### Arrival Clearing

- Target approximately one viewport in height without hiding content on short screens.
- Use the real exterior hero photograph.
- Integrate the headline with the clearing.
- Use layered trees beyond the image top and sides.
- Include selected foreground overlap.
- Attach the booking controls to the lower edge like a lodge check-in desk.
- Start navigation visually transparent, then condense it into a small translucent lodge bar after scrolling.
- Ensure the navigation remains readable before and after transition.

### Trust Forest Floor

- Attach it visually to the hero.
- Include rating, review proof, location, guest count, sauna, hot tub, and dog-friendly status.
- Replace the clipping horizontal marquee with a calmer responsive proof treatment.

### Inside the Glass

- One dominant interior image plus narrative and three concise property truths.
- Consolidate the two duplicated “three pleasures” treatments into this single chapter.
- Remove redundant repetition while preserving useful SEO links.

### Photographic Clearing

- Use an editorial asymmetric gallery.
- One dominant A-frame photo.
- Two medium lifestyle photos.
- Smaller detail photos.
- Minimal captions and one full-gallery action.
- Avoid six equal rounded cards.

### Ritual at Dusk

- Make this the strongest tonal transition.
- Combine sauna, cold air, deck, and hot tub into one continuous sequence.
- Use authentic amenity photos as proof.
- Use `heat-soak` and `deck-lights` only as atmospheric art where accurate labeling would otherwise be misleading.
- Deep dusk blue and forest green should contrast with amber light and steam.

### Place and Practical Truth

- Combine location, drive times, map, lake-access clarification, dog/parking information, differentiators, and FAQs into one illustrated field-guide landscape.
- Preserve all factual caveats and interactive map behavior.
- Avoid returning to a generic FAQ card grid.

### Night Booking Close

- Use the deepest tone on the page.
- Include a large featured review, cabin-window glow, and final availability action.
- Carry the mountain and forest-floor composition through the footer.
- Do not return to a plain beige footer.

Desktop booking prompts belong at the hero, after the gallery, and at the final close. Avoid placing the same CTA after every section.

## Supporting-page rollout

Update shared templates rather than manually redesigning every SEO route.

Extend `PageShell` and `SeoLanderPage` with scene/intensity options and map page families as follows:

- Sauna pages → ember and dusk.
- Dog-friendly pages → morning trail and forest floor.
- Weekend-from-LA pages → arrival and evening lights.
- Lake-access and shoreline pages → pale lake mist, water, shoreline.
- Reviews/chapters → dark lodge storytelling.
- Burnout reset → quiet morning clearing.
- Holiday ready → winter forest variation.
- General SEO landers → lighter scene treatment optimized for long-form reading.

Do not independently rewrite dozens of SEO pages. The shared shell must provide most of the transformation.

Apply this exact current-route mapping:

| Route | Scene family | Intensity |
| --- | --- | --- |
| `/` | Full arrival-to-night journey | Maximum |
| `/lake-arrowhead-a-frame-cabin` | Arrival and interior clearing | Medium |
| `/lake-arrowhead-cabin-with-sauna` | Ritual, dusk, and ember | High |
| `/dog-friendly-lake-arrowhead-cabin` | Morning trail and forest floor | Medium |
| `/weekend-from-los-angeles` | Arrival and evening lights | Medium-high |
| `/shoreline-rights` | Lake mist, shoreline, and water | Medium |
| `/chapters` | Dark lodge storytelling | Medium-high |
| `/burnout-reset` | Quiet morning clearing | Medium |
| `/holiday-ready` | Winter forest variation | Medium-high |
| `/classic` | No illustrated system | None |

## Navigation and footer

- Keep all current destinations and booking behavior.
- The initial nav should feel embedded in the hero atmosphere.
- After scrolling, use a compact translucent surface with adequate contrast.
- Preserve keyboard focus and mobile navigation usability.
- Integrate the footer into the final night scene and forest floor.
- Preserve legal text, STR number, route links, and booking action.

## Typography and visual tokens

- Ensure Cormorant Garamond actually renders for editorial headings; diagnose the current neutral/sans-looking result.
- Keep DM Sans for utility copy and navigation.
- Use larger editorial type and more compositional hierarchy instead of adding extra icons.
- Keep the core parchment, forest, sage, amber, and ember family, but introduce explicit dusk and night tokens.
- Centralize scene colors, spacing, and layering values.
- Do not scatter one-off hex colors throughout components.

## Layering contract

Use consistent z-index bands:

1. Scene background.
2. Distant canopy or mountains.
3. Mist.
4. Content and photography.
5. Decorative foreground.
6. Navigation and interactive UI.
7. Optional global grain.

All decorative layers must:

- Use `pointer-events: none`.
- Be hidden from assistive technology.
- Never cover focus rings or interactive controls.

## Motion

- Replace per-frame scroll listeners with one shared motion controller, one observer, or a CSS-driven solution.
- Distant layers move less than foreground layers.
- Keep total motion in approximately the 8–32px range per scene.
- Mist may drift horizontally.
- Trees and shrubs must not look like they are floating.
- No scroll-jacking, cursor effects, or delayed content reveals.
- Fully disable atmospheric movement under `prefers-reduced-motion`.

## Performance and failure behavior

- Hero photo is the only eagerly loaded large image.
- Use `next/image` appropriately for content photography.
- Use responsive WebP/AVIF for decorative raster art.
- Mobile must not download unnecessary desktop scene plates.
- Define stable aspect ratios and sizes to avoid layout shift.
- If a decorative asset fails, the chapter color and content must remain intact.
- If atmospheric JavaScript fails, navigation and booking must still work.
- Avoid adding dependencies unless a clear requirement cannot be met with the existing stack.

## Preserve without regression

Do not break or remove:

- Metadata and canonical URLs.
- Lodging, website, FAQ, and other JSON-LD.
- Analytics and traffic attribution.
- Booking URLs, labels, and event tracking.
- Existing factual and SEO copy.
- Existing public routes and route grouping.
- `/classic`.
- The current Google Maps interaction.
- Unrelated worktree changes.

Do not invent amenities, lake privileges, travel times, guest claims, ratings, or property features.

## Implementation sequence

Use this order:

1. Inspect git status, existing diffs, current route structure, and assets.
2. Run baseline `npm run lint` and `npm run build`; record pre-existing failures separately.
3. Run the current site locally and capture baseline screenshots at:
   - Homepage: 1440×1000 and 390×844.
   - Sauna page: 1440×1000 and 390×844.
   - Lake-access or shoreline page: 1440×1000 and 390×844.
4. Prepare the production asset manifest and required scene assets.
5. Implement tokens, `ForestScene`, `SceneChapter`, and supporting primitives.
6. Rebuild the homepage as seven focused chapters.
7. Update shared supporting-page templates and apply the page-family mappings.
8. Implement responsive scene behavior.
9. Consolidate motion and reduced-motion behavior.
10. Run functional, accessibility, SEO, build, lint, and visual checks.
11. Capture matching final screenshots and compare them against both the baseline and references.
12. Refine until the visual acceptance criteria are met; do not stop after the first technically valid render.

## Visual acceptance criteria

At 1440px:

- Immediate “inside the forest” impression.
- Authentic cabin dominates the hero.
- Forest occupies at least 20% of viewport edges collectively.
- At least one foreground overlap in each major photographic chapter.
- No more than two consecutive chapters share a base tone.
- No visible repeated identical forest clusters.
- Ritual chapter is materially darker and warmer than gallery.
- Footer remains within the illustrated world.
- The page does not read as a sequence of equal rounded cards.

At 390px:

- Hero remains large and property-identifiable.
- Forest atmosphere remains visible without squeezing copy.
- Availability CTA remains thumb-reachable.
- No horizontal overflow.
- No text or controls hidden by foliage.
- Real photographs remain clear and uncluttered.

## Functional acceptance criteria

- `npm run lint` completes without new errors.
- `npm run build` completes without new errors.
- Homepage and all existing public routes render.
- Metadata and structured data are preserved.
- Booking and analytics events still fire.
- Keyboard navigation works and focus remains visible.
- Reduced-motion mode has no atmospheric movement.
- Decorative layers are excluded from the accessibility tree.
- No console errors are introduced.

## Required completion report

When finished, report:

1. What changed visually.
2. Files and production assets added or changed.
3. How the homepage seven-chapter journey maps to components.
4. How supporting routes inherit the scene system.
5. Tests and commands run with results.
6. Screenshot paths for desktop and mobile comparisons.
7. Any pre-existing failures kept separate from regressions.
8. Any remaining art-asset limitations.

Do not claim completion until you have personally inspected the final desktop and mobile screenshots.

---
