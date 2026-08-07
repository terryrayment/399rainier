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

- Both washes use exactly seven stops at 0%, 16%, 32%, 48%, 64%, 80%, and 100%. No adjacent stop-position gap exceeds 20 percentage points.
- Color and luminance progress continuously through the full bridge height. Endpoints occur only at 0% and 100%; there are no duplicated-color hold ranges.
- Maximum adjacent-row Rec. 709 luminance delta is 3 at every required viewport.
- Maximum adjacent-row RGB distance is 8 at every required viewport.
- For sampled rows from 16% through 90%, green is greater than or equal to red and blue, and `max(r,g,b) - min(r,g,b) >= 5`.
- The deepest forest endpoint appears only at the edge touching the trust surface.
- No bridge artwork, pines, plates, filters, blur, or pseudo-element overlays may contribute to either taper.
- Computed CSS gradients must begin and end with the exact adjacent-surface colors. Raster endpoint samples may differ by at most 8 values per 8-bit channel because Chromium screenshot color conversion shifts known CSS colors.
- Preserve hidden overflow, zero margins, exact adjacency within 2 CSS pixels, and zero horizontal overflow.
- The trust content, spacing, typography, proof points, interior chapter, and all later transitions remain unchanged.

## Scope

Modify only:

- `src/app/ui-system.css`
- `tests/ui-audit.spec.ts`

Do not modify `src/app/globals.css`, React markup, assets, content, or parent-site files.

## Regression and QC

- Demonstrate RED against current 96/72/56px entrance and 56/48/36px exit geometry plus the compressed exit gradient.
- Measure every center-column raster row for both washes at 2048×1246, 768×1024, and 390×844 using Chromium screenshots with `deviceScaleFactor: 1`, opaque page compositing, and PNG output. Sample `x = floor(image.width / 2)` for each integer row from 0 through `image.height - 1`. When a bridge begins at a fractional document Y-coordinate and the element screenshot contains one extra raster row, normalize to the exact integer CSS height with endpoint-preserving nearest-row resampling: for normalized row `i`, select source row `round(i * (sourceRowCount - 1) / (cssHeight - 1))`. All endpoint and adjacent-row assertions operate on the normalized rows.
- Define adjacent-row RGB distance in 8-bit sRGB as `sqrt((r2-r1)^2 + (g2-g1)^2 + (b2-b1)^2)`.
- Define Rec. 709 luminance on the same 0–255 channel scale as `0.2126*r + 0.7152*g + 0.0722*b`; compare the absolute difference between adjacent rows without intermediate rounding.
- Enforce endpoint tolerance, green-bias, RGB-distance, luminance-delta, art removal, geometry, adjacency, margins, clipping, and horizontal overflow for both tapers at all three widths.
- Run lint, typecheck, the 15-route production build, and the complete Playwright suite.
- Capture and inspect identical full-page plus left/center/right trust-composition crops at 2048×1246, 1440×1000, 768×1024, and 390×844.
- The responsive geometry table, fixed stop positions, and numerical pixel thresholds in this committed spec are the durable authority for taper proportions; the temporary option C companion mockup is illustrative only. Automated thresholds are necessary but not sufficient: Codex must visually inspect local left/center/right crops and reject visible single-row bands, rectangular asset boundaries, or a fully-dark hold inside either bridge. The user remains the final aesthetic approver of production.
- Publish through a focused PR, merge with an expected-head-SHA guard, wait for the post-merge production deployment, then repeat all row measurements and visual crop inspection on `https://lakearrowheadaframe.com/`.
