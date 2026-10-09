import { business as b, nav } from "../data/site.mjs";
import { icons } from "./icons.mjs";
import { logoMark } from "./art.mjs";

export const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const abs = (p) => b.url.replace(/\/$/, "") + p;

export function head({ title, description, path, schema = [], image = "/assets/img/og-default.jpg", noindex = false }) {
  const canonical = abs(path);
  const ld = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : { "@context": "https://schema.org", "@graph": schema.map((s) => { const { "@context": _c, ...rest } = s; return rest; }) })}</script>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#0b2545">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(b.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(image)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-FL">
<meta name="geo.placename" content="${esc(b.city)}">
<meta name="geo.position" content="${b.geo.lat};${b.geo.lng}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="/assets/css/main.css">
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"></noscript>
<script>window.O1G={phone:"${b.phone}",phoneRaw:"${b.phoneRaw}",endpoint:"/contact.php",thanks:"/thank-you/"};</script>
<!-- TRACKING: paste Google Tag Manager / GA4 snippet below (see README) -->
${ld}
</head>`;
}

export function header({ solid = false } = {}) {
  const items = nav.map((n) => {
    if (n.children) {
      return `<li class="nav__item nav__item--has-menu"><a class="nav__link" href="${n.href}" aria-expanded="false" aria-haspopup="true">${n.label} ${icons.chevron}</a>
        <ul class="nav__menu${n.children.length > 6 ? " nav__menu--wide" : ""}">${n.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join("")}</ul></li>`;
    }
    return `<li class="nav__item"><a class="nav__link" href="${n.href}">${n.label}</a></li>`;
  }).join("");
  const drawerItems = nav.map((n) => n.children
    ? `<div class="drawer__group"><button type="button" aria-expanded="false">${n.label} ${icons.chevron}</button><ul class="drawer__sub"><li><a href="${n.href}">All ${n.label}</a></li>${n.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join("")}</ul></div>`
    : `<div class="drawer__group"><a href="${n.href}">${n.label}</a></div>`).join("");
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="header${solid ? " header--solid" : ""}">
  <div class="container header__inner">
    <a class="logo" href="/" aria-label="${b.name} home">${logoMark}<span>Ocean<em>1</em>Gutters</span></a>
    <nav class="nav" aria-label="Primary"><ul style="display:contents;list-style:none;margin:0;padding:0">${items}</ul></nav>
    <div style="display:flex;align-items:center;gap:8px">
      <a class="header__phone" href="tel:${b.phoneRaw}">${icons.phone} ${b.phone}</a>
      <a class="btn btn--primary btn--sm header__cta" href="/contact/">Free Estimate</a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer">
  ${drawerItems}
  <div class="drawer__cta">
    <a class="btn btn--primary btn--lg" href="/contact/">Get a Free Estimate</a>
    <a class="btn btn--ghost-light" href="tel:${b.phoneRaw}">${icons.phone} Call ${b.phone}</a>
    <a class="btn btn--whatsapp" href="https://wa.me/${b.whatsapp}?text=Hi%20Ocean1Gutters%2C%20I%27d%20like%20a%20free%20gutter%20estimate.">${icons.whatsapp} WhatsApp Us</a>
  </div>
</div>`;
}

export function footer({ services, cities }) {
  const year = new Date().getFullYear();
  return `<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="logo" href="/">${logoMark.replace(/#lg\b|id="lg"/g, (m) => m.replace("lg", "lgf"))}<span>Ocean<em>1</em>Gutters</span></a>
        <p style="margin-top:16px">Seamless gutter installation, repair, cleaning and gutter guards for homes and businesses across Palm Beach County. ${b.license}. Serving South Florida since ${b.founded}.</p>
        <div class="social">
          <a href="${b.social.facebook}" aria-label="Facebook" rel="noopener" target="_blank">${icons.facebook}</a>
          <a href="${b.social.instagram}" aria-label="Instagram" rel="noopener" target="_blank">${icons.instagram}</a>
          <a href="${b.social.google}" aria-label="Google Reviews" rel="noopener" target="_blank">${icons.google}</a>
          <a href="${b.social.yelp}" aria-label="Yelp" rel="noopener" target="_blank">${icons.yelp}</a>
        </div>
      </div>
      <div><h4>Services</h4><ul>${services.map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join("")}<li><a href="/blog/">Gutter Tips & Pricing</a></li></ul></div>
      <div><h4>Service Areas</h4><ul>${cities.map((c) => `<li><a href="/gutters-${c.slug}-fl/">${c.name}, FL</a></li>`).join("")}</ul></div>
      <div><h4>Contact</h4><ul class="footer__contact">
        <li>${icons.phone}<a href="tel:${b.phoneRaw}">${b.phone}</a></li>
        <li>${icons.whatsapp}<a href="https://wa.me/${b.whatsapp}" rel="noopener">WhatsApp</a></li>
        <li>${icons.mail}<a href="mailto:${b.email}">${b.email}</a></li>
        <li>${icons.pin}<span>${b.street}<br>${b.city}, ${b.state} ${b.zip}</span></li>
        <li>${icons.clock}<span>Mon–Fri 7am–6pm<br>Sat 8am–4pm</span></li>
      </ul></div>
    </div>
    <div class="footer__bottom">
      <span>© ${year} ${b.legalName}. All rights reserved. ${b.license}.</span>
      <span><a href="/privacy/">Privacy</a> · <a href="/sitemap.xml">Sitemap</a></span>
    </div>
  </div>
</footer>
<div class="sticky-cta" aria-label="Quick contact">
  <a class="btn btn--navy" href="tel:${b.phoneRaw}">${icons.phone} Call Now</a>
  <a class="btn btn--primary" href="/contact/">Free Estimate</a>
</div>
<script src="/assets/js/main.js" defer></script>
</body></html>`;
}

export function crumbs(items) {
  return `<ol class="crumbs">${items.map((c, i) => i < items.length - 1 ? `<li><a href="${c.href}">${c.label}</a></li>` : `<li aria-current="page">${c.label}</li>`).join("")}</ol>`;
}

export function breadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: abs(c.href) })) };
}

export function faqSchema(faqs) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

export function localBusinessSchema({ cities, services }) {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": abs("/#business"),
    name: b.name, legalName: b.legalName, url: b.url, telephone: b.phoneRaw, email: b.email,
    image: abs("/assets/img/og-default.jpg"), logo: abs("/assets/img/logo.svg"),
    description: "Seamless gutter installation, gutter repair, gutter cleaning and gutter guards in Palm Beach County, Florida.",
    foundingDate: b.founded, priceRange: "$$",
    address: { "@type": "PostalAddress", streetAddress: b.street, addressLocality: b.city, addressRegion: b.state, postalCode: b.zip, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, FL` })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "16:00" },
    ],
    sameAs: Object.values(b.social),
    aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating.value, reviewCount: b.rating.count, bestRating: "5" },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Gutter Services", itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: abs(`/services/${s.slug}/`) } })) },
  };
}
