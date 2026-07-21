# SEO Measurement. Lakearrowheadaframe.com

Phase 4 tracking plan. Vercel Analytics is already installed site-wide.

## Primary conversion

Organic (or any) session → Airbnb click-out.

Every CTA uses `buildAirbnbUrl()` with:

- `utm_source=lakearrowheadaframe`
- `utm_medium=website`
- `utm_campaign=<page campaign>`
- `utm_content=<placement>`

### Campaign map

| Surface | utm_campaign |
|---------|----------------|
| Homepage | `homepage` |
| Nav | `nav` |
| Footer | `footer` |
| Shoreline | `shoreline-rights` |
| Sauna lander | `sauna-lander` |
| Dog-friendly lander | `dog-friendly-lander` |
| A-frame lander | `aframe-lander` |
| Weekend LA lander | `weekend-la-lander` |
| Chapters | `chapters` |
| Burnout quiz | `burnout-reset` |
| Holiday Ready | `holiday-ready` (utm_content = kit slug) |

In Airbnb or your link analytics, group by `utm_campaign` to see which SEO pages drive booking intent.

## Google Search Console. 90 day KPIs

Track weekly:

1. **Coverage:** all sitemap URLs indexed (no soft 404s)
2. **Tier A queries** (impressions + average position):
   - lake arrowhead cabin with sauna
   - dog friendly lake arrowhead cabin
   - lake arrowhead a-frame rental / a-frame cabin
   - can airbnb guests use lake arrowhead / shoreline access
   - lake arrowhead weekend from los angeles / 90 minutes from LA cabin
3. **Brand queries:** lake arrowhead a-frame, lakearrowheadaframe
4. **Head term watch** (expect slow progress): lake arrowhead cabin rentals

## 90-day success bar

- Sitemap 200 + pages indexed
- Tier A queries earning impressions (even if positions 20–40)
- Measurable Airbnb click-outs attributed to lander campaigns
- Brand query growth after GSC + GBP work

## 6–12 month success bar

- Top 10 for ≥3 Tier A keywords
- Shoreline page ranking or cited for lake-access questions
- Organic → Airbnb bookings visible in host analytics / UTM reporting

## Monthly ops checklist

- [ ] Pull GSC Performance for the last 28 days; note top Tier A movers
- [ ] Confirm AggregateRating still matches Airbnb (`cabin.ts` + `chapters.ts`)
- [ ] Spot-check top landing pages in Vercel Analytics
- [ ] Refresh one review chapter if new guest language appears
- [ ] Re-request indexing only for materially updated URLs
