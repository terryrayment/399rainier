# Extreme Trust Veil Design

## Problem

The trust chapter still reads as a dark rectangle. Its approved 96px entrance is substantially longer than its 56px exit, while the exit holds forest for 56% of its height and compresses forest-to-sage into roughly 25px. This produces an imbalanced bright lower rim.

## Approved Direction

Use visual option C: a maximum veil that makes the dark trust surface feel like the center of one atmospheric composition rather than a separately framed panel.

## Responsive Geometry

| Viewport | Paper → forest entrance | Forest → sage exit |
| --- | ---: | ---: |
| Desktop, 900px+ | 224px | 192px |
| Tablet, 600–899px | 168px | 144px |
| Mobile, below 600px | 112px | 96px |

The exit is intentionally slightly shorter and lighter than the entrance, but both are visually dominant tapers.

## Visual Contract

- Both washes use seven or more evenly paced, green-biased color stops.
- Color and luminance progress continuously through the full bridge height. Neither wash may hold its endpoint across a large percentage of the bridge.
- Maximum adjacent-row Rec. 709 luminance delta is 3 at every required viewport.
- Maximum adjacent-row RGB distance is 8 at every required viewport.
- Intermediate rows remain chromatic and green-biased; no neutral gray band is allowed.
- The deepest forest endpoint appears only at the edge touching the trust surface.
- No bridge artwork, pines, plates, filters, blur, or pseudo-element overlays may contribute to either taper.
- Preserve exact adjacent-surface endpoint colors, hidden overflow, zero margins, exact adjacency, and zero horizontal overflow.
- The trust content, spacing, typography, proof points, interior chapter, and all later transitions remain unchanged.

## Scope

Modify only:

- `src/app/ui-system.css`
- `tests/ui-audit.spec.ts`

Do not modify `src/app/globals.css`, React markup, assets, content, or parent-site files.

## Regression and QC

- Demonstrate RED against current 96/72/56px entrance and 56/48/36px exit geometry plus the compressed exit gradient.
- Measure every center-column raster row for both washes at 2048×1246, 768×1024, and 390×844.
- Enforce endpoint tolerance, green-bias, RGB-distance, luminance-delta, art removal, geometry, adjacency, margins, clipping, and horizontal overflow for both tapers at all three widths.
- Run lint, typecheck, the 15-route production build, and the complete Playwright suite.
- Capture and inspect identical full-page plus left/center/right trust-composition crops at 2048×1246, 1440×1000, 768×1024, and 390×844.
- Reject any crop with a dark rectangle, bright rim, stripe, muddy gray, asset edge, visible blur boundary, or asymmetric pacing.
- Publish through a focused PR, merge with an expected-head-SHA guard, wait for the post-merge production deployment, then repeat all row measurements and visual crop inspection on `https://lakearrowheadaframe.com/`.
