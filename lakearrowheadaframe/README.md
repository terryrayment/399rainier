# Lake Arrowhead A-Frame

Guest-facing STR site for **lakearrowheadaframe.com**. Bjerk-inspired editorial design driving bookings to [Airbnb](https://airbnb.com/h/lakearrowheadcabinrental).

## Development

```bash
cd lakearrowheadaframe
npm install
npm run dev
```

Runs on [http://localhost:3001](http://localhost:3001). Gallery photos live in `public/photos/` (copied from the sale site; not a symlink, so Vercel can deploy them).

## Deploy (Vercel)

**Live preview:** [lakearrowheadaframe.vercel.app](https://lakearrowheadaframe.vercel.app)

Project: `terry-rayment/lakearrowheadaframe` (root directory = this folder)

1. Push repo to GitHub and connect in Vercel, or deploy with `npx vercel --prod` from this folder
2. Environment variables (Production):
   - `NEXT_PUBLIC_SITE_URL=https://lakearrowheadaframe.com`
   - `GOOGLE_SITE_VERIFICATION=` (after Search Console setup)
   - `BING_SITE_VERIFICATION=` (after Bing setup)
3. In Vercel → Project → Settings → Domains, add:
   - `lakearrowheadaframe.com`
   - `www.lakearrowheadaframe.com` (redirects to apex via `vercel.json`)

## DNS (Namecheap)

Domain is on **BasicDNS** at Namecheap. Point it to Vercel:

1. Namecheap → Domain List → **lakearrowheadaframe.com** → **Manage**
2. **Advanced DNS** tab
3. Delete any conflicting A/CNAME records for `@` and `www`
4. Add:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `@` | `76.76.21.21` | Automatic |
| CNAME Record | `www` | `cname.vercel-dns.com.` | Automatic |

5. Wait 5–30 minutes (sometimes up to 48h). Vercel → Domains should show **Valid Configuration**
6. Vercel auto-provisions HTTPS once DNS propagates

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Hub. Lake Arrowhead cabin rental, Airbnb gallery order |
| `/shoreline-rights` | Honest ALA lake access decoder for STR guests |
| `/lake-arrowhead-cabin-with-sauna` | Sauna + hot tub SEO lander |
| `/dog-friendly-lake-arrowhead-cabin` | Dog-friendly / fenced yard lander |
| `/lake-arrowhead-a-frame-cabin` | A-frame cabin rental lander |
| `/weekend-from-los-angeles` | LA drive-market weekend lander |
| `/chapters` | Review anthology |
| `/burnout-reset` | 48-hour recovery quiz |
| `/holiday-ready` | Optional paid Holiday Ready kits (Airbnb add-on) |
| `/llms.txt` | AI/crawler summary of property facts |

Photos use **Airbnb gallery order** (see `src/data/photos.ts`).

## SEO ops

- [docs/seo-launch-checklist.md](docs/seo-launch-checklist.md). GSC/Bing, sitemap, verification
- [docs/authority-playbook.md](docs/authority-playbook.md). GBP, citations, PR, review loop
- [docs/airbnb-listing-keyword-sync.md](docs/airbnb-listing-keyword-sync.md). Listing copy alignment
- [docs/holiday-kits-ops.md](docs/holiday-kits-ops.md). Holiday Ready tote checklists, saved replies, soft-launch
- [docs/seo-measurement.md](docs/seo-measurement.md). KPIs and UTM campaigns

```bash
bash scripts/check-seo.sh
bash scripts/check-seo.sh https://lakearrowheadaframe.vercel.app
```

## Related

- Design reference: [Bjerk case study](https://nordehq.com/case-studies/bjerk/)
