# Restrained Treeline Transition Repair

## Problem

The homepage's paper-to-forest and forest-to-sage chapter boundaries read as broad gray blur bands rather than intentional atmospheric transitions. The current full-height linear gradients interpolate very light and very dark endpoint colors across the entire bridge, producing a muddy neutral midpoint. The forest-to-sage bridge also permits decorative overflow, visually enlarging the band. At a 2048 × 1246 desktop viewport the issue is especially prominent around the Guest Favorite review chapter.

## Approved Direction

Use restrained treeline edges. Each chapter keeps ownership of its actual background color. A shallow bridge provides only a short endpoint-colored blend, while low-opacity pine or forest-floor silhouettes define the boundary. There must be no broad neutral-gray midpoint and no decorative overflow beyond the bridge box.

## Visual Contract

### Arrival to trust

- Reduce the desktop bridge from 112px to a target range of 48–64px and the mobile bridge to 32–48px.
- Hold parchment through the upper portion of the bridge, then transition quickly into the exact forest endpoint near the lower edge.
- Use forest-tinted intermediate stops only; do not interpolate through an unqualified 50/50 light/dark midpoint.
- Retain pine silhouettes as a restrained edge detail, with low opacity and no full-height black walls.
- Keep all bridge artwork clipped to the bridge box.

### Trust to interior

- Reduce the desktop bridge from 96px to a target range of 48–64px and the mobile bridge to 32–48px.
- Hold forest through most of the bridge, then lift into the exact sage endpoint near the lower edge.
- Eliminate visible overflow and the large mist slab.
- Do not introduce additional decorative plates; the transition should be primarily color and edge texture.

### Trust chapter spacing

- Reduce the trust chapter's desktop vertical padding from 128px per side to a restrained responsive range around 72–96px.
- Preserve comfortable mobile spacing and the existing content order, copy, links, and accessibility behavior.

## Responsive Behavior

- Mobile below 600px: 32–48px bridges with minimal silhouettes.
- Tablet 600–899px: 40–56px bridges.
- Desktop 900px and above: 48–64px bridges.
- The supplied 2048 × 1246 viewport is a required regression viewport in addition to the existing responsive matrix.
- No transition may create horizontal overflow, negative layout overlap, or a gap between adjacent endpoint colors.

## Implementation Boundary

- Prefer scoped overrides in `src/app/ui-system.css`.
- Do not modify the recovered `src/app/globals.css` baseline.
- Change component markup only if CSS cannot establish correct ownership and clipping.
- Preserve all content, routes, metadata, analytics, booking behavior, and the isolated classic page.

## Verification

- Add a Playwright regression contract for the supplied desktop viewport.
- Assert bridge heights, clipped overflow, zero margins/negative overlap, exact endpoint colors, and absence of broad neutral midpoint colors at sampled vertical positions.
- Assert the trust chapter's vertical padding remains within the approved range.
- Run the complete Playwright suite, lint, typecheck, and production build.
- Capture and visually inspect the repaired transition at desktop, tablet, and mobile widths, including 2048 × 1246.
- After deployment, verify the live custom domain rather than only the Vercel deployment URL.
