# SEO Launch Checklist. Lakearrowheadaframe.com

Use this after deploying the guest site SEO work.

## Environment variables (Vercel → Production)

```env
NEXT_PUBLIC_SITE_URL=https://lakearrowheadaframe.com
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
```

Leave verification blank until you create the Search Console / Bing properties, then paste tokens and redeploy.

## Domains

1. Apex `lakearrowheadaframe.com` and `www.lakearrowheadaframe.com` both attached in Vercel.
2. Confirm www → apex redirect (configured in `vercel.json`).
3. Confirm HTTPS valid for both.

## Post-deploy checks

```bash
curl -sI https://lakearrowheadaframe.com/ | head -n 5
curl -sI https://www.lakearrowheadaframe.com/ | head -n 10
curl -s https://lakearrowheadaframe.com/robots.txt
curl -s https://lakearrowheadaframe.com/sitemap.xml
curl -sI https://lakearrowheadaframe.com/llms.txt | head -n 5
```

Expect:

- Homepage 200
- www redirects 301/308 to apex
- robots lists the sitemap
- sitemap returns 200 XML with all SEO routes
- llms.txt 200

## Google Search Console

1. Add property `https://lakearrowheadaframe.com`
2. HTML tag verification → set `GOOGLE_SITE_VERIFICATION` → redeploy → Verify
3. Submit sitemap: `https://lakearrowheadaframe.com/sitemap.xml`
4. Request indexing for:
   - `/`
   - `/shoreline-rights`
   - `/lake-arrowhead-cabin-with-sauna`
   - `/dog-friendly-lake-arrowhead-cabin`
   - `/lake-arrowhead-a-frame-cabin`
   - `/weekend-from-los-angeles`
   - `/chapters`
   - `/burnout-reset`
   - `/holiday-ready`

## Bing Webmaster Tools

1. Add the site
2. Meta tag verification → `BING_SITE_VERIFICATION` → redeploy → Verify
3. Submit the same sitemap URL

## Schema smoke test

Paste homepage HTML into [Rich Results Test](https://search.google.com/test/rich-results) and confirm `LodgingBusiness` + `AggregateRating` parse cleanly.
