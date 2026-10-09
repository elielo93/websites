#!/usr/bin/env node
// Static site generator for Ocean1Gutters.
// Usage: node build.mjs → writes ../dist (upload to Hostinger) and exports partials/content to ../wordpress/ocean1gutters
import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync, readdirSync, readFileSync, cpSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as data from "./data/site.mjs";
import * as P from "./templates/pages.mjs";
import { head, header, footer } from "./templates/layout.mjs";
import { logoMark } from "./templates/art.mjs";
import { icons } from "./templates/icons.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = join(root, "dist");
const wp = join(root, "wordpress", "ocean1gutters");
const { business: b, services, cities, posts } = data;

rmSync(dist, { recursive: true, force: true });
const write = (rel, content) => { const p = join(dist, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, content); };
const shell = (pg) => head(pg) + `<body>` + header({ solid: pg.solid }) + `<main id="main">` + pg.body + `</main>` + footer({ services, cities });
const urls = [];
const partials = {};

function emit(pg, { partial, priority = "0.7", changefreq = "monthly", sitemap = true } = {}) {
  const file = pg.path === "/404.html" ? "404.html" : join(pg.path, "index.html");
  write(file, shell(pg));
  if (sitemap && !pg.noindex) urls.push({ loc: b.url + pg.path, priority, changefreq });
  if (partial) partials[partial] = pg;
}

// ---- Pages
emit(P.homePage(), { partial: "home", priority: "1.0", changefreq: "weekly" });
emit(P.servicesIndexPage(), { partial: "services-index", priority: "0.9" });
services.forEach((s) => emit(P.servicePage(s), { partial: `service-${s.slug}`, priority: "0.9" }));
emit(P.areasIndexPage(), { partial: "areas-index", priority: "0.8" });
cities.forEach((c) => emit(P.cityPage(c), { partial: `city-${c.slug}`, priority: "0.8" }));
emit(P.aboutPage(), { partial: "about", priority: "0.6" });
emit(P.contactPage(), { partial: "contact", priority: "0.9", changefreq: "weekly" });
emit(P.blogIndexPage(), { priority: "0.7", changefreq: "weekly" });
posts.forEach((p) => emit(P.postPage(p), { priority: "0.6" }));
emit(P.thankYouPage(), { partial: "thank-you", sitemap: false });
emit(P.privacyPage(), { sitemap: false });
emit(P.notFoundPage(), { sitemap: false });

// ---- Assets
mkdirSync(join(dist, "assets/css"), { recursive: true }); mkdirSync(join(dist, "assets/js"), { recursive: true }); mkdirSync(join(dist, "assets/img"), { recursive: true });
copyFileSync(join(here, "assets/css/main.css"), join(dist, "assets/css/main.css"));
cpSync(join(here, "assets/js"), join(dist, "assets/js"), { recursive: true });
const plainLogo = logoMark.replace('class="logo__mark" ', "");
write("favicon.svg", plainLogo);
write("assets/img/logo.svg", plainLogo);
write("assets/img/og-default.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071a33"/><stop offset="1" stop-color="#1b6ca8"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="80" y="300" font-family="system-ui,sans-serif" font-size="72" font-weight="800" fill="#fff">Ocean1Gutters</text><text x="80" y="370" font-family="system-ui,sans-serif" font-size="34" fill="#7fe3d7">Seamless Gutters · Palm Beach County, FL</text><text x="80" y="440" font-family="system-ui,sans-serif" font-size="30" fill="#c3d3e5">${b.phone} · ocean1gutters.com</text></svg>`);
const imgSrc = join(here, "assets/img");
if (existsSync(imgSrc)) for (const f of readdirSync(imgSrc)) {
  if (f.startsWith(".")) continue;
  copyFileSync(join(imgSrc, f), join(dist, f === "apple-touch-icon.png" ? f : "assets/img/" + f));
}

// ---- SEO files
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /thank-you/\nDisallow: /contact.php\n\nSitemap: ${b.url}/sitemap.xml\n`);

// ---- Server files
copyFileSync(join(here, "server/contact.php"), join(dist, "contact.php"));
copyFileSync(join(here, "server/htaccess"), join(dist, ".htaccess"));
copyFileSync(join(here, "server/config.sample.php"), join(dist, "config.sample.php"));

// ---- Export to the WordPress theme: assets, content, icons, tokenized partials
for (const d of ["inc", "inc/partials", "assets/css", "assets/js", "assets/img"]) mkdirSync(join(wp, d), { recursive: true });
copyFileSync(join(here, "assets/css/main.css"), join(wp, "assets/css/main.css"));
cpSync(join(here, "assets/js"), join(wp, "assets/js"), { recursive: true });
writeFileSync(join(wp, "assets/img/logo.svg"), plainLogo);
if (existsSync(imgSrc)) for (const f of readdirSync(imgSrc)) if (!f.startsWith(".")) copyFileSync(join(imgSrc, f), join(wp, "assets/img", f));
writeFileSync(join(wp, "assets/img/og-default.svg"), readFileSync(join(dist, "assets/img/og-default.svg")));
writeFileSync(join(wp, "inc/content.json"), JSON.stringify({ business: b, stats: data.stats, services, cities, reviews: data.reviews, homeFaqs: data.homeFaqs, colors: data.colors, posts, nav: data.nav }, null, 2));
writeFileSync(join(wp, "inc/icons.json"), JSON.stringify({ ...icons, logo: logoMark }));

// Tokenize business details so the WP Customizer controls them.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function tokenize(html) {
  return html
    .replace(/action="\/contact\.php"/g, 'action="{{form_action}}"')
    .replace(/src="\/assets\/img\//g, 'src="{{theme_uri}}/assets/img/')
    .replace(new RegExp(`https://wa\\.me/${b.whatsapp}`, "g"), "https://wa.me/{{whatsapp}}")
    .replace(new RegExp(`tel:${esc(b.phoneRaw)}`, "g"), "tel:{{phone_raw}}")
    .replace(new RegExp(esc(b.phone), "g"), "{{phone}}")
    .replace(new RegExp(esc(b.email), "g"), "{{email}}")
    .replace(new RegExp(esc(b.social.google), "g"), "{{google_url}}")
    .replace(new RegExp(`${esc(b.street)}, ${b.city}, ${b.state} ${b.zip}`, "g"), "{{address_inline}}")
    .replace(new RegExp(`${esc(b.street)}<br>${b.city}, ${b.state} ${b.zip}`, "g"), "{{address_br}}")
    .replace(new RegExp(`<strong>${esc(b.rating.value)}</strong>`, "g"), "<strong>{{rating}}</strong>")
    .replace(new RegExp(`<strong>${esc(b.rating.value)} / 5</strong> <small>from ${b.rating.count}\\+ reviews</small>`, "g"), "<strong>{{rating}} / 5</strong> <small>from {{rating_count}}+ reviews</small>")
    .replace(new RegExp(esc(encodeURIComponent(`${b.street}, ${b.city}, ${b.state} ${b.zip}`)), "g"), "{{address_q}}")
    .replace(new RegExp(`${esc(b.street)}<br>${b.city}, ${b.state} ${b.zip}`, "g"), "{{address_br}}");
}
for (const [key, pg] of Object.entries(partials)) writeFileSync(join(wp, "inc/partials", `${key}.html`), tokenize(pg.body));
writeFileSync(join(wp, "inc/partials", "_meta.json"), JSON.stringify(Object.fromEntries(Object.entries(partials).map(([k, pg]) => [k, { title: pg.title, description: pg.description, path: pg.path, solid: !!pg.solid }])), null, 2));

console.log(`Built ${urls.length + 3} pages → ${dist}; exported ${Object.keys(partials).length} partials → ${wp}/inc/partials`);
