# Illustration asset manifest — The Clearing

Audit date: 2026-07-21

## Existing plates (`public/illustrations/`)

| Asset | Classification | Notes |
| --- | --- | --- |
| `glass-pines.webp` | Atmospheric only | Concept A-frame; do not caption as property proof |
| `deck-lights.webp` | Atmospheric only | Mood/night deck; pair with real amenity photos |
| `heat-soak.webp` | Atmospheric only | Ritual mood; not literal sauna/hot-tub proof |
| `motif-kit.webp` | Unsuitable as sprite | Opaque kit sheet; reference only |
| `site-atmosphere.webp` | Unsuitable as page bg | Contains UI placeholders; reference only |

## Production scene plates (`public/illustrations/scenes/`)

| Asset | Role | Notes |
| --- | --- | --- |
| `scene-pines-left.webp` | Dense tall-pine cluster, left | Independently composed; parchment plate → multiply blend |
| `scene-pines-right.webp` | Dense tall-pine cluster, right | Not a mirror of left |
| `scene-mist-canopy.webp` | Distant canopy + mist | Arrival / gallery distant layer |
| `scene-night-floor.webp` | Night forest floor + mountains | Night close + footer |
| `scene-branch-left.webp` | Foreground branch | PhotoClearing overlap |
| `scene-branch-right.webp` | Foreground branch (alt orientation) | PhotoClearing overlap |
| `scene-shrubs-rocks.webp` | Shrub + rock / forest-floor mass | Trust band + place chapter |
| `scene-lake-mist.webp` | Lake water + shoreline mist | Place / shoreline family |

## Limitations

- Generated plates ship with parchment-colored backgrounds (not true alpha). Production CSS uses `mix-blend-mode: multiply` (light scenes) and soft-light/screen treatments (dusk/night) so parchment dissolves into chapter tones.
- Steam / window-glow motifs are CSS/SVG layered accents rather than separate raster sprites.
- True cutout WebP with alpha would further improve edge quality; current plates meet density and texture goals when blended.
