# Ocean1Gutters — Website Redesign

Modern, conversion-focused redesign of [ocean1gutters.com](https://www.ocean1gutters.com) (seamless gutters, Boynton Beach / Palm Beach County, FL).

Two deployable outputs are generated from **one** content source:

| Output | Folder | Deploy to |
|---|---|---|
| **Static site** (fastest, zero maintenance) | `dist/` | Hostinger `public_html` via File Manager / FTP |
| **WordPress theme** (client can edit in WP) | `wordpress/ocean1gutters/` | Any WordPress install (Hostinger WordPress hosting) |

Both share the same CSS/JS and render identically. Pick one; the content, SEO and lead capture work the same way.

---

## What's included

**Pages (27)**: Home, Services hub + 5 service pages, Service Areas hub + 10 city landing pages, About, Contact, Blog + 3 SEO articles, Thank-you, Privacy, 404.

**Cinematic homepage**
- Scroll-driven 3D story (Three.js): a rendered South Florida home with barrel-tile roof, stucco, impact windows and seamless gutters. Scrolling moves the camera through five shots (establishing → storm → gutter close-up → leaf guards & downspout → dusk pull-back with live gutter color picker). Rain, water running through the gutters, bloom, pointer parallax.
- Smooth inertial scrolling (Lenis), pinned horizontal-scroll services strip, word-by-word heading reveals, 3D tilt cards, cursor spotlight on dark sections, magnetic buttons, custom cursor, intro curtain, page transitions.
- Everything is lazy-loaded after the page is interactive, degrades automatically on slow GPUs (bloom off, pixel ratio 1) and respects `prefers-reduced-motion`. No-WebGL browsers get an illustrated fallback. SEO content is plain server-rendered HTML underneath.
- Libraries are self-hosted in `site/assets/js/vendor/` (Three.js r128 + bloom passes, Lenis). No CDN dependency.

**SEO focus**: primary keywords are *seamless gutter installation* and *leaf guard gutters / gutter guards*, targeted at Boca Raton → Delray Beach → Boynton Beach and surrounding South Palm Beach County (Highland Beach, Deerfield Beach, Lake Worth Beach, Lantana, Greenacres, Wellington, West Palm Beach).

**Lead generation**
- Lead form in the hero, on every service/city page (sticky sidebar), contact page and blog posts
- Click-to-call + WhatsApp everywhere; sticky mobile call bar
- **Instant price estimator** (slider → live price range → pre-fills the quote form)
- Drag before/after comparison, gutter color picker, animated stats, reviews carousel, service-area map
- Spam protection: honeypot, timing check, per-IP rate limit
- Leads are emailed, logged (CSV on static / **Leads** inbox in WordPress) and optionally POSTed to a webhook (Zapier/Make/CRM)
- `generate_lead` event pushed to `dataLayer`/GA4 on submit, dedicated `/thank-you/` page for conversion tracking

**SEO**
- Unique title/meta description per page, canonical, Open Graph, geo meta
- JSON-LD: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `WebSite`
- City landing pages (`/gutters-boca-raton-fl/` etc.) with neighborhoods, local FAQs and local reviews
- `sitemap.xml`, `robots.txt`, 301 redirects from the old `/about-us/<city>` URLs
- Performance: no frameworks, no jQuery, ~38 KB CSS + 12 KB JS, deferred JS, async font, lazy images, Brotli/gzip + 1-year cache headers in `.htaccess`

---

## Option A — Static site on Hostinger (recommended for speed)

1. `npm run build` (or just use the committed `dist/` folder).
2. In Hostinger **hPanel → Files → File Manager**, open `public_html` and delete the old site (back it up first).
3. Upload **everything inside `dist/`** (including the hidden `.htaccess`). Tip: zip `dist/`, upload, extract.
4. Create a mailbox in **hPanel → Emails**, e.g. `leads@ocean1gutters.com`.
5. Copy `config.sample.php` → `config.php` on the server and set:
   - `to` → where leads should go (client's inbox; comma-separate for several)
   - `from` → the mailbox you created (must be on the domain or Hostinger will drop it)
   - `webhook` → optional Zapier/Make/CRM URL
6. Submit the form once to confirm delivery. Leads also append to `leads-log.csv` one level above `public_html`.
7. Add Google Tag Manager / GA4: paste the snippet where `<!-- TRACKING -->` appears in `site/templates/layout.mjs`, rebuild, re-upload.

## Option B — WordPress theme

1. `npm run zip:theme` → `wordpress/ocean1gutters-theme.zip`.
2. WP Admin → **Appearance → Themes → Add New → Upload Theme** → activate.
3. Click the banner **Open Ocean1 Setup** (Appearance → Ocean1 Setup) → **Install pages, menu & posts**. This creates all 23 pages with their designed layouts, the blog posts, the menu, sets the front page, and sets permalinks to `/blog/%postname%/`.
4. **Customizer → Ocean1Gutters Settings**: phone, email, address, rating, social links, lead notification email, webhook, GTM ID, and **Photos** (upload real job photos to replace the illustrated placeholders).
5. Leads appear under **Leads** in the admin sidebar and are emailed. On Hostinger install **WP Mail SMTP** (or similar) using a mailbox on the domain so notifications don't land in spam.
6. SEO is built in. If Yoast / Rank Math is installed the theme automatically steps aside. Sitemap: `/wp-sitemap.xml`.
7. Recommended plugins only: an SMTP plugin, and LiteSpeed Cache (Hostinger ships it). No page builder needed.

Pages created by the installer use the **Ocean1 Designed Page** template. Anything typed into the page editor is appended below the designed sections, so the client can add content without breaking the layout.

---

## Editing content

Everything lives in **`site/data/site.mjs`**: business details, services, cities/neighborhoods, FAQs, reviews, colors, blog posts, navigation. Edit, then `npm run build`. The build regenerates `dist/` **and** the theme's `inc/content.json` + `inc/partials/*.html`, so both outputs stay in sync.

**Photos**: the client's real job photos are the single biggest upgrade left. Drop files into `site/assets/img/` using these names and rebuild. They replace the illustrated placeholders automatically:

| File | Where it shows |
|---|---|
| `why-crew.jpg` | Home → Why Ocean1Gutters |
| `before.jpg`, `after.jpg` | Home → before/after slider |
| `about-team.jpg` | About page |
| `seamless-gutter-installation.jpg`, `gutter-repair.jpg`, `gutter-cleaning.jpg`, `gutter-guards.jpg`, `copper-and-specialty-gutters.jpg` | Service pages |
| `og-default.jpg` (1200×630) | Social share image |
| `apple-touch-icon.png` (180×180) | iOS home-screen icon |

In WordPress the same slots are set under Customizer → Photos (no rebuild needed).

## Project layout

```
site/
  data/site.mjs          ← all content (single source of truth)
  templates/             ← layout, sections, pages, icons, SVG art
  assets/css/main.css    ← design system
  assets/js/main.js      ← interactions (estimator, slider, forms…)
  server/                ← contact.php, .htaccess, config.sample.php (static deploy)
  build.mjs              ← generator
dist/                    ← built static site (upload to Hostinger)
wordpress/ocean1gutters/ ← WordPress theme (templates, Customizer, Leads CPT, importer, SEO)
```

## Launch checklist (confirm with the client)

- [ ] Email address (`info@ocean1gutters.com` is assumed) and lead notification inbox
- [ ] ZIP code for 2505 NW 24th St (33436 assumed) and business hours
- [ ] Google Business Profile review link and real review count (4.9★ / 200+ assumed)
- [ ] Facebook / Instagram URLs
- [ ] Pricing ranges in the estimator and FAQs (`$9–$16/ft` for 6", set in `main.js` → `rates`)
- [ ] Replace illustrated placeholders with real job photos (crew on ladder, leaf guard close-up, finished downspouts, logo file)
- [ ] Submit `sitemap.xml` in Google Search Console; verify the 301s from the old URLs
- [ ] Add GTM/GA4 and set up a conversion on `/thank-you/`

## Verification performed

- Build generates 27 pages; HTML structure, duplicate-id and single-H1 checks pass on every page
- 3D story rendered in headless Chromium (software WebGL) at every scroll stage on desktop and mobile with zero console errors
- Zero JS console errors at desktop (1440px) and mobile (390px)
- Estimator, color picker, before/after, menus and form validation exercised in headless Chromium
- WordPress theme installed on a local WordPress (SQLite) instance: importer, all routes (200), 404, sitemap, schema JSON, Customizer tokens, and an end-to-end form submission landing in the Leads inbox and redirecting to `/thank-you/`
- `php -l` clean on all PHP files
