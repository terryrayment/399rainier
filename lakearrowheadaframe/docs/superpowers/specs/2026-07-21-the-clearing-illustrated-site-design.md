# The Clearing: Full-Site Illustrated Redesign

**Status:** Approved design  
**Date:** 2026-07-21  
**Site:** `https://lakearrowheadaframe.com/`  
**Application root:** `/Users/terryrayment/Documents/GitHub/399rainier/lakearrowheadaframe`

## Objective

Transform the existing illustrated treatment from small decorative motifs around a conventional card-based site into a continuous, immersive Lake Arrowhead forest world. The real cabin remains the commercial and factual center of the experience. Illustration supplies atmosphere, transitions, and brand distinction.

The approved direction is **The Clearing**:

- The authentic cabin photograph is the hero focal point.
- Layered illustration forms the surrounding environment.
- The treatment applies across the entire guest-facing site.
- Property-specific scenes are accurate when they imply what a guest will book.
- More imaginative scenes are allowed when clearly used as atmosphere rather than proof.

## Current-State Diagnosis

The current implementation already includes useful foundations:

- An illustrated route group and `/classic` fallback.
- `IllustratedWorld`, `ForestFrame`, `MistDivider`, motif components, and vignette data.
- Parchment, forest, sage, amber, and ember color tokens.
- Real cabin photography, generated concept scenes, booking controls, reviews, map, SEO metadata, structured data, and analytics.

The present visual result is still too restrained because:

- The forest is implemented as narrow, pale, repeated rails.
- Illustration behaves like decoration around centered cards.
- Most sections use the same parchment background and composition.
- The strongest concept artwork is confined to one late section.
- Identical geometric pine clusters are visibly repeated.
- The homepage repeats the same three amenity ideas in two sections.
- Photography and illustration sit beside each other rather than sharing one spatial world.
- The footer exits the illustrated world and returns to a conventional beige layout.

## Reference Material

Use these files as art-direction references:

- `../docs/brand/illustration-refs/ref-site-motif-heavy.png`
- `../docs/brand/illustration-refs/ref-motif-kit.png`
- `../docs/brand/illustration-refs/ref-concept-a-glass-pines.png`
- `../docs/brand/illustration-refs/ref-concept-b-deck-lights.png`
- `../docs/brand/illustration-refs/ref-concept-c-heat-soak.png`

Interpret them as follows:

| Reference | Governs |
| --- | --- |
| `ref-site-motif-heavy.png` | Page density, central clearing, forest edges, vertical continuity |
| `ref-motif-kit.png` | Motif vocabulary: pines, shrubs, rocks, branch, mist, smoke, water, window glow |
| `ref-concept-a-glass-pines.png` | Forest depth, painterly texture, cabin warmth, twilight scale |
| `ref-concept-b-deck-lights.png` | Night palette, amber light, intimate framing |
| `ref-concept-c-heat-soak.png` | Ritual chapter, dusk-to-ember transition, sauna/hot-tub mood |

These references are not interchangeable production assets. The motif sheet contains an opaque background and must not be dropped onto the site as a transparent sprite. Concept scenes that do not exactly match the property must be treated as atmospheric art.

## Brand Principle

**Illustration establishes the world. Photography proves the property.**

Any visual implying “this is the cabin, deck, sauna, hot tub, yard, or access you are booking” must be based on actual property photography or accompanied by authentic property proof. Decorative forest, fog, mountains, rocks, water, smoke, and folklore may be imaginative.

## Visual World

### Spatial composition

- A central clearing holds readable content and authentic photography.
- Layered forest occupies approximately 20–28% of the desktop viewport edges collectively.
- Forest silhouettes are irregular and asymmetrical, not equal mirrored rails.
- Foreground branches, shrubs, or rocks may overlap photographs by 3–8%.
- Mobile uses corner clusters and full-width transitions rather than narrow side rails.
- Decorative layers never obscure copy, navigation, form controls, or calls to action.

### Five-layer scene model

Each major chapter can compose up to five independent visual layers:

1. Paper grain and atmospheric color.
2. Distant mountain or canopy silhouettes.
3. Mist or haze.
4. Midground trees and shrubs.
5. Dark foreground branches, rocks, water, or forest floor.

The scene configuration may omit unnecessary layers, especially on mobile and long-form SEO pages.

### Atmospheric progression

| Chapter | Base atmosphere | Key motifs |
| --- | --- | --- |
| Arrival | Warm parchment, morning sage, pale mist | Tall pines, shrubs, amber sparks |
| Interior | Warm paper, moss, stone | Branches and low foliage opening around photography |
| Gallery | Open light clearing | Sparse foliage and irregular photo overlaps |
| Ritual | Dusk blue, forest green, ember orange | Sauna glow, deck bulbs, steam, dense pines |
| Place | Sage lake mist | Shoreline, water, mountains, rocks |
| Night | Deep forest, near-night blue | Mountain silhouette, warm window, forest floor |

No more than two consecutive homepage chapters should share the same base tone.

### Typography

- Cormorant Garamond drives major editorial headings.
- DM Sans remains the utility, navigation, label, and body face.
- Headings use generous scale and line height rather than relying on decorative icons.
- Italicized nature words are used sparingly as a brand gesture.
- Fix the current font-token/wiring issue so `.font-serif` visibly renders the intended serif.

### Motif treatment

- The current geometric pine SVGs may survive only as small utility marks.
- Immersive scenes require textured, irregular assets consistent with the references.
- Pine stands, shrubs, rocks, branches, mist, smoke, water, and window glow must be available as separate transparent production assets or purpose-built textured scene plates.
- Do not substitute flat triangles, generic line icons, emoji, or repeated clip-art clusters.
- Vary crop, scale, offset, density, and layering. Do not use obvious mirrored copies in the same viewport.

## Homepage Journey

### 1. Arrival Clearing

- Approximately one viewport tall.
- Authentic exterior cabin photograph is the dominant central focal point.
- Dense pines extend beyond the top and sides.
- Foreground branches partially cross selected photo corners.
- Warm window light is echoed by restrained amber sparks.
- Large editorial headline is integrated with the image and clearing.
- Booking controls attach to the lower edge like a lodge check-in desk.
- Navigation begins transparent and condenses into a small translucent lodge bar after scrolling.

### 2. Proof at the Forest Floor

- Rating, featured review fragments, location, guest count, sauna, hot tub, and dog-friendly status sit in a dark ground layer attached to the hero.
- Replace the visually detached marquee treatment with a calmer proof band.
- Ensure review text remains readable and does not clip at common desktop widths.

### 3. Inside the Glass

- One large interior photograph paired with the narrative and three concise property truths.
- Foliage opens around the image rather than appearing in equal side columns.
- Consolidate the duplicated “three pleasures” content into this chapter.

### 4. Photographic Clearing

- Editorial, irregular gallery composition rather than six equal cards.
- One dominant A-frame photo, two medium lifestyle photos, and smaller detail photos.
- Minimal captions and one clear full-gallery action.
- Selected foliage overlaps photo corners without obscuring property details.

### 5. Ritual at Dusk

- Major tonal transition from parchment into dusk blue and deep green.
- One continuous sequence: heat inside, step into cold mountain air, soak beneath the pines.
- Authentic photos provide proof of the sauna, deck, and hot tub.
- `heat-soak` and `deck-lights` artwork supplies atmosphere behind or beside that proof.
- If existing concept art depicts inaccurate construction or amenities, it must not be captioned as a literal property view.

### 6. Place and Practical Truth

- One illustrated Lake Arrowhead landscape unifies drive times, map, lake-access explanation, dog and parking notes, honest expectations, and FAQs.
- Replace disconnected differentiator and FAQ card grids with a coherent field-guide chapter.
- Factual content and map interactions remain fully accessible.

### 7. Night Clearing and Booking Close

- Deepest background tone on the page.
- Featured review in large editorial typography.
- Warm cabin-window emblem and final availability action.
- Dense foreground forest and mountain silhouettes.
- Footer remains integrated into the dark forest floor rather than returning to plain parchment.
- Desktop booking prompts appear at the hero, after the gallery, and in this final scene.
- Mobile retains a persistent one-thumb availability action.

## Site-Wide Treatment

The homepage uses maximum visual density. Supporting pages use the same scene system at approximately 50–70% intensity.

| Page family | Scene direction |
| --- | --- |
| Sauna | Ember and dusk |
| Dog friendly | Morning trail and forest floor |
| Weekend from LA | Arrival and evening lights |
| Lake access / shoreline | Pale lake mist, water, shoreline |
| Reviews / chapters | Dark lodge storytelling |
| Burnout reset | Quiet morning clearing |
| Holiday ready | Winter forest variation |
| General SEO landers | Light scene treatment optimized for long-form readability |

Shared page templates must carry the system so every SEO page does not require bespoke artwork or duplicated layout code.

Map the current routes explicitly:

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

## Component Architecture

Replace the single fixed world plus repeated frame pattern with scene-level components:

- `ForestScene`: owns scene tone, canopy, mist, side density, foreground, and responsive asset selection.
- `SceneChapter`: semantic section wrapper with variants such as `arrival`, `clearing`, `dusk`, `lake`, and `night`.
- `PhotoClearing`: embeds authentic property photography with controlled foliage overlap.
- `AtmosphericArtwork`: displays explicitly atmospheric, non-literal concept art.
- `EditorialGallery`: supports dominant, medium, and detail-photo compositions.
- `RitualSequence`: composes the sauna, cold-air, and hot-tub story.
- `BookingDock`: desktop booking panel and persistent mobile action.
- `ForestTransition`: produces meaningful chapter transitions without repeated pine emblems.
- `IllustratedMap`: combines accurate location data with landscape framing.

Scene values belong in a typed data module rather than scattered class strings. Recommended configuration keys:

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

The exact type may evolve during implementation, but composition choices must remain data-driven and reusable.

The large homepage should be split into focused section components instead of growing the current route file. Existing `PageShell` and `SeoLanderPage` should accept scene variants so supporting routes inherit the system without copying homepage markup.

## Layering Contract

Use a predictable stacking model:

1. Scene base/background.
2. Distant canopy and mountains.
3. Mist.
4. Main content and photography.
5. Decorative foreground.
6. Navigation, booking controls, and focusable UI.
7. Global grain overlay, if retained, with pointer events disabled.

Every decorative layer must use `pointer-events: none` and be hidden from assistive technology.

## Motion

- Use one shared motion controller or observer, not one scroll listener per frame.
- Distant layers move more slowly than near layers.
- Total movement through a scene remains approximately 8–32 pixels.
- Mist may drift horizontally; trees and foliage should not appear to float.
- No scroll-jacking, cursor effects, or delayed content reveals.
- `prefers-reduced-motion` disables all atmospheric movement.

## Responsive Rules

### Desktop

- Forest should occupy 20–28% of the viewport edges collectively, with 20% as the minimum acceptance threshold.
- Central content remains readable between forest layers.
- Major photos include intentional foreground overlap.

### Tablet

- Reduce layer count and overlap depth.
- Preserve tonal progression and asymmetry.

### Mobile

- Replace side rails with corner clusters, bottom silhouettes, and full-width transitions.
- Preserve a large, recognizable hero photo.
- Keep the availability action reachable with one thumb.
- Do not narrow text into a forest corridor.
- Prevent all horizontal overflow.

## Performance and Failure Behavior

- The hero photograph is the only eagerly loaded large image.
- Decorative raster art uses responsive WebP/AVIF assets.
- Mobile must not download desktop-scale forest plates.
- Supply stable image aspect ratios to prevent layout shift.
- Missing decorative assets fall back to the scene color without hiding content.
- The page remains navigable and booking actions remain usable if atmospheric JavaScript fails.
- Preserve readable contrast in paper, dusk, forest, and night scenes.

## Preservation Requirements

Implementation must preserve:

- Metadata and canonical URLs.
- Lodging, website, FAQ, and other structured data.
- Analytics, attribution, booking URLs, and click-event tracking.
- Existing public routes and route-group behavior.
- Current factual and SEO copy unless a design change requires relocation.
- `/classic` as a non-illustrated fallback.
- Unrelated user changes in the dirty worktree.

Do not delete, restore, or rename routes as part of the visual redesign.

## Acceptance Criteria

### Visual: 1440px desktop

- The opening immediately reads as an immersive forest, not a website with pine icons.
- The authentic cabin is the dominant hero focal point.
- The forest occupies at least 20% of the viewport edges collectively.
- At least one foreground element overlaps every major photographic chapter.
- No more than two consecutive chapters share the same base tone.
- Identical repeated forest clusters are not visibly detectable.
- The ritual chapter is materially darker and warmer than the gallery.
- The footer remains inside the illustrated world.

### Visual: 390px mobile

- Hero remains large and property-identifiable.
- Forest atmosphere remains visible without narrowing the content.
- Availability action is reachable with one thumb.
- No horizontal overflow or copy hidden beneath decoration.
- Photography remains legible without clutter.

### Functional and quality

- Existing metadata and structured data remain present.
- Booking and analytics events still fire.
- Existing public routes render successfully.
- Keyboard navigation and visible focus states work.
- Reduced-motion mode is verified.
- Decorative images are ignored by assistive technology.
- Production build and lint complete without new errors.
- Desktop and mobile screenshots are reviewed against the five references before completion.

## Out of Scope

- Rewriting the property’s business strategy or factual positioning.
- Changing booking providers.
- Removing or consolidating public SEO routes.
- Replacing all authentic property photography with generated imagery.
- Building a general-purpose animation framework.
- Adding unrelated dependencies or redesigning analytics.

## Delivery Strategy

Implementation planning should separate the work into reviewable phases:

1. Baseline audit and screenshots.
2. Production asset preparation and manifest.
3. Scene primitives and visual tokens.
4. Homepage composition.
5. Shared supporting-page treatment.
6. Responsive, accessibility, motion, and performance pass.
7. Visual and functional verification.

Do not implement all guest-facing routes as independent page rewrites. Establish the reusable scene system on the homepage, then propagate it through shared templates.
