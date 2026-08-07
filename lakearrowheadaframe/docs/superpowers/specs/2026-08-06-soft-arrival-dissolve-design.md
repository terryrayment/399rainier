# Soft Arrival Dissolve Design

## Problem

The arrival-to-trust boundary remains visibly harsh after the rectangular foreground seam was removed. Its 60px bridge compresses parchment, several mid-greens, and deep forest into a narrow band. Pine and floor artwork overlap that wash, increasing local contrast and producing a dark stripe.

## Approved Direction

Use visual option A: a long atmospheric dissolve with no visible stripe or abrupt black edge.

## Visual Contract

- Arrival-to-trust visual depth is 96px on desktop (900px and wider), 72px on tablet (600–899px), and 56px on mobile (below 600px).
- The wash progresses continuously from parchment through muted sage and pine into forest. Deep forest appears only at the final edge.
- Intermediate stops remain green-biased and preserve enough chroma to avoid a neutral gray band.
- No single sampled row may introduce a large luminance or RGB-distance jump relative to the previous row.
- Remove the bridge floor texture and pine silhouettes from the arrival-to-trust boundary. The feathered arrival foreground may remain, but no separate artwork may overlap the dissolve.
- Keep `overflow: hidden`, zero block margins, exact adjacency, and no horizontal overflow.
- The trust chapter, trust-to-interior transition, and all later chapter boundaries remain unchanged.

## Implementation Scope

Modify only:

- `src/app/ui-system.css`
- `tests/ui-audit.spec.ts`

Do not modify `src/app/globals.css`, React markup, assets, or unrelated parent-site files.

## Regression Contract

At 2048×1246, 768×1024, and 390×844:

- assert exact bridge heights of 96px, 72px, and 56px;
- assert hidden overflow, zero margins, adjacency, and no horizontal overflow;
- assert arrival bridge artwork and pine layers are not rendered (`display: none`);
- screenshot the isolated wash and sample every vertical row at the center column;
- require exact adjacent-surface endpoints within the established screenshot color-profile tolerance;
- reject intermediate neutral rows;
- calculate adjacent-row RGB distance and luminance delta, enforcing conservative thresholds selected from a verified smooth implementation;
- preserve the existing exact computed-style endpoint assertion.

The new test must demonstrate RED against the current compressed/art-overlaid implementation and GREEN only after the approved dissolve is applied.

## QC and Release

- Run lint, typecheck, production build, and the complete Playwright suite.
- Capture full-page and identical boundary crops at 2048×1246, 1440×1000, 768×1024, and 390×844.
- Inspect every crop for stripes, asset rectangles, muddy gray, hard seams, clipping, and horizontal overflow.
- Publish through a focused pull request, merge with an expected-head-SHA guard, wait for the production deployment, and repeat the pixel measurements and crop inspection on `https://lakearrowheadaframe.com/`.
- Do not declare completion based on preview deployment or automated tests alone.
