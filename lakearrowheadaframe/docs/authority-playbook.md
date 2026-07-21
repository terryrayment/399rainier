# Authority Playbook. Lake Arrowhead cabin rental

Phase 3 of the climb plan. Do these in order; none require code changes unless noted.

## 1. Google Business Profile

If eligible for a vacation rental / lodging category:

- Claim or create the profile for 399 Rainier / Lake Arrowhead A-Frame
- Categories: Vacation home rental / Cabin (use the closest allowed lodging category)
- Photos: glass wall, sauna, hot tub, dog yard, Village-adjacent context
- Q&A: pin an answer linking to `/shoreline-rights` for “Can guests use the lake / beach clubs?”
- Website field: `https://lakearrowheadaframe.com`
- Booking link: Airbnb short link

## 2. Local citations

Submit or update listings with consistent NAP:

- Name: Lake Arrowhead A-Frame
- Address: 399 Rainier Road, Lake Arrowhead, CA 92352
- Website: https://lakearrowheadaframe.com
- Phone: host phone used on Airbnb (keep consistent)

Targets:

- Lake Arrowhead Chamber of Commerce directory
- Visit Lake Arrowhead / tourism partner lists if they accept STRs
- Visit San Bernardino Mountains resources (especially if they link lake-access guides)

## 3. Digital PR angle (shoreline honesty)

Pitch angle: **“What Airbnb listings get wrong about Lake Arrowhead lake access.”**

Assets ready on-site:

- `/shoreline-rights` YES / NO / VERIFY matrix
- ALA PDF sources + Visit SB Mountains comparison
- Clear “beach clubs NO” stance

Where to pitch:

- Local mountain blogs / Chamber newsletter
- LA/OC weekend-travel newsletters
- Relevant Reddit / Facebook groups (value-first, not spam)

## 4. Review → content loop

When Airbnb review count increases:

1. Update `cabin.reviewCount` and `cabin.rating` in `src/data/cabin.ts`
2. Update `anthologyMeta` in `src/data/chapters.ts`
3. Add a new chapter or quotes that match search language (e.g. “winter escape from LA”, “sauna”, “dog”)
4. Redeploy so AggregateRating JSON-LD stays accurate

## 5. Airbnb listing keyword sync

See [airbnb-listing-keyword-sync.md](./airbnb-listing-keyword-sync.md). Keep listing title/description aligned with Tier A site keywords without keyword stuffing.

## 6. Cross-promotion guardrails

- Sale site footer may link to lakearrowheadaframe.com (already does)
- Do **not** put sale CTAs on rental SEO landers
- Do **not** send Meta buyer traffic to rental landers as the primary CTA
