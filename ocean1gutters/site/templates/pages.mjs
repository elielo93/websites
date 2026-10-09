import { business as b, services, cities, posts, homeFaqs, reviews } from "../data/site.mjs";
import { icons, starRow } from "./icons.mjs";
import { head, header, footer, crumbs, breadcrumbSchema, faqSchema, localBusinessSchema, abs, esc } from "./layout.mjs";
import * as S from "./sections.mjs";
import { placeholderPhoto } from "./art.mjs";

const shell = (opts, body, { solid = false } = {}) => ({ ...opts, body, solid });

export function homePage() {
  const title = `Seamless Gutter Installation & Leaf Guard Gutters | Boca Raton, Delray Beach, Boynton Beach | ${b.name}`;
  const description = `Seamless gutter installation and leaf guard gutters from Boca Raton to Boynton Beach. Licensed & insured, lifetime warranty, 4.9★ rated. Installed in a day. Free 24-hour estimates: ${b.phone}.`;
  const schema = [
    localBusinessSchema({ cities, services }),
    { "@context": "https://schema.org", "@type": "WebSite", "@id": abs("/#website"), url: b.url, name: b.name, publisher: { "@id": abs("/#business") } },
    faqSchema(homeFaqs),
  ];
  const body = S.hero() + S.trustBar() + S.servicesGrid({ heading: "Installation, Leaf Guards, Repair. One Local Crew.", intro: "From brand-new seamless systems with leaf guards to a single leaking corner, we handle the full life of your gutters.", hscroll: true }) + S.whyUs() + S.beforeAfter() + S.process() + S.estimator() + S.colorPicker() + S.statsBand() + S.reviewsSection() + S.serviceArea() + S.faqSection(homeFaqs) + S.ctaBand();
  return shell({ title, description, path: "/", schema }, body);
}

export function servicesIndexPage() {
  const title = `Gutter Services in Palm Beach County | Installation, Repair, Cleaning, Guards`;
  const description = `All gutter services for South Florida homes: seamless installation, repair, cleaning, gutter guards, copper & commercial. Licensed & insured. Free estimates from ${b.name}.`;
  const cr = [{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }];
  const body = S.pageHero({ eyebrow: "Services", h1: "Gutter Services for Palm Beach County Homes", lead: "One local crew for the entire life of your gutters: install, protect, maintain, repair.", crumbsHtml: crumbs(cr) })
    + S.servicesGrid({ heading: "Choose a Service", intro: "Every service includes a free inspection and a written quote. No surprises." })
    + S.process() + S.reviewsSection() + S.ctaBand()
    + `<section class="section section--alt"><div class="container" style="max-width:720px">${S.leadForm({ id: "quote" })}</div></section>`;
  return shell({ title, description, path: "/services/", schema: [breadcrumbSchema(cr)] }, body);
}

export function servicePage(s) {
  const cr = [{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: s.name, href: `/services/${s.slug}/` }];
  const schema = [
    breadcrumbSchema(cr),
    { "@context": "https://schema.org", "@type": "Service", "@id": abs(`/services/${s.slug}/#service`), name: s.name, serviceType: s.name, description: s.description, provider: { "@id": abs("/#business") }, areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, FL` })), url: abs(`/services/${s.slug}/`), offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", url: abs("/contact/") } },
    faqSchema(s.faqs),
  ];
  const others = services.filter((o) => o.slug !== s.slug);
  const body = S.pageHero({ eyebrow: "Service", h1: s.h1, lead: s.blurb, crumbsHtml: crumbs(cr) })
    + `<section class="section"><div class="container with-aside">
      <div class="content">
        <p class="lead">${s.intro}</p>
        <div class="media" style="margin:28px 0">${placeholderPhoto(`Photo slot: ${s.name} (add assets/img/${s.slug}.jpg)`, s.slug, `${s.name} by Ocean1Gutters in Palm Beach County`)}</div>
        <h2>What's Included</h2>
        <div class="benefit-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${s.benefits.map((x) => `<div class="benefit" data-tilt><h3>${x.h}</h3><p>${x.p}</p></div>`).join("")}</div>
        <h2>How ${s.short} Works</h2>
        <ol class="checklist" style="counter-reset:none">${s.process.map((p) => `<li>${icons.checkCircle}<span>${p}</span></li>`).join("")}</ol>
        <h2>Serving All of Palm Beach County</h2>
        <p>We provide ${s.name.toLowerCase()} in ${cities.map((c, i) => `<a href="/gutters-${c.slug}-fl/">${c.name}</a>${i < cities.length - 1 ? ", " : ""}`).join("")} and surrounding communities.</p>
        <div class="callout">${icons.shield}<div><strong>${b.warranty}.</strong> ${b.license}.</div></div>
        <h2>Related Services</h2>
        <ul class="tags">${others.map((o) => `<li><a href="/services/${o.slug}/">${o.name}</a></li>`).join("")}</ul>
      </div>
      ${S.contactAside({ service: s.name })}
    </div></section>`
    + S.reviewsSection({ heading: `What Customers Say About Our ${s.short}` })
    + S.faqSection(s.faqs, { heading: `${s.short} FAQ` })
    + S.ctaBand({ heading: `Need ${s.short}? Get a Free Quote Today.` });
  return shell({ title: s.title, description: s.description, path: `/services/${s.slug}/`, schema }, body, { solid: false });
}

export function areasIndexPage() {
  const title = `Gutter Installation Service Area: Boca Raton to Boynton Beach | ${b.name}`;
  const description = `Ocean1Gutters installs seamless gutters and leaf guards across southern Palm Beach County: Boca Raton, Delray Beach, Boynton Beach, Highland Beach, Lake Worth Beach, Lantana, Wellington and more.`;
  const cr = [{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas/" }];
  const body = S.pageHero({ eyebrow: "Service Areas", h1: "Gutter Services Across Palm Beach County", lead: `Based in ${b.city}, our crews run daily from Boca Raton to Jupiter. Pick your city for local details.`, crumbsHtml: crumbs(cr) })
    + S.serviceArea()
    + `<section class="section"><div class="container"><div class="grid grid-3">${cities.map((c) => `<a class="svc-card reveal" data-tilt href="/gutters-${c.slug}-fl/"><div class="svc-card__icon">${icons.pin}</div><h3>${c.name}, FL</h3><p>${c.note}</p><span class="link">Gutters in ${c.name} ${icons.arrow}</span></a>`).join("")}</div></div></section>`
    + S.ctaBand();
  return shell({ title, description, path: "/service-areas/", schema: [breadcrumbSchema(cr)] }, body);
}

export function cityPage(c) {
  const path = `/gutters-${c.slug}-fl/`;
  const title = `Seamless Gutter Installation & Leaf Guard Gutters in ${c.name}, FL | ${b.name}`;
  const description = `Seamless gutter installation and leaf guard gutters in ${c.name}, FL, plus repair and cleaning. Local, licensed & insured, 4.9★ rated. 6" & 7" aluminum gutters with lifetime warranty. Free estimates: ${b.phone}.`;
  const cr = [{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas/" }, { label: c.name, href: path }];
  const faqs = [
    { q: `How much do seamless gutters cost in ${c.name}?`, a: `Most ${c.name} homes run $1,500 to $4,000 for a complete 6" seamless aluminum system, or roughly $9 to $16 per linear foot installed. Use our instant estimator on the homepage or request a free on-site quote.` },
    { q: `Do you offer gutter cleaning in ${c.name}?`, a: `Yes. We offer one-time cleanings and twice-a-year maintenance plans for ${c.name} homeowners, with before and after photos texted to you.` },
    { q: `How quickly can you get to ${c.name}?`, a: c.hq ? `We're headquartered in ${c.name}, so same-week estimates and installs are typical.` : `${c.name} is a core part of our daily route. Free estimates are usually scheduled within 24–48 hours.` },
    { q: `Are you licensed and insured to work in ${c.name}?`, a: `Yes. ${b.legalName} is a registered Florida business, fully insured for residential and commercial gutter work throughout Palm Beach County.` },
  ];
  const schema = [
    breadcrumbSchema(cr),
    { "@context": "https://schema.org", "@type": "Service", name: `Gutter Services in ${c.name}, FL`, serviceType: "Seamless gutter installation, repair, cleaning and gutter guards", provider: { "@id": abs("/#business") }, areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: "Palm Beach County, FL" } }, url: abs(path) },
    faqSchema(faqs),
  ];
  const localReviews = reviews.filter((r) => r.city.toLowerCase().includes(c.name.split(" ")[0].toLowerCase()));
  const body = S.pageHero({ eyebrow: `${c.name}, Florida`, h1: `Seamless Gutter Installation & Leaf Guards in ${c.name}, FL`, lead: `Installation, repair, cleaning and gutter guards for ${c.name} homeowners. ${c.hq ? "Our home base." : `Serving ${c.name} since ${b.founded}.`}`, crumbsHtml: crumbs(cr) })
    + `<section class="section"><div class="container with-aside">
      <div class="content">
        <h2>${c.name}'s Local Seamless Gutter Company</h2>
        <p class="lead">${c.note}</p>
        <p>${c.name} gets the same 60+ inches of rain a year as the rest of South Florida, delivered in short, violent bursts that overwhelm builder-grade 5" gutters. Ocean1Gutters installs oversized 6" and 7" seamless aluminum gutters, roll-formed in your driveway to the exact length of each run, hung on screw-in hidden hangers every 24", and pitched to 3"x4" downspouts that don't clog.</p>
        <h2>Gutter Services We Offer in ${c.name}</h2>
        <div class="benefit-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${services.map((s) => `<a class="benefit" href="/services/${s.slug}/" style="display:block"><h3>${s.name}</h3><p>${s.blurb}</p></a>`).join("")}</div>
        <h2>Neighborhoods We Serve in ${c.name}</h2>
        <ul class="tags">${c.neighborhoods.map((n) => `<li>${n}</li>`).join("")}<li>…and every neighborhood in ${c.zip}</li></ul>
        ${localReviews.length ? `<h2>What ${c.name} Homeowners Say</h2>${localReviews.map((r) => `<blockquote class="callout" style="margin:0 0 12px"><div>${starRow(r.stars)}<p style="margin:8px 0 4px">“${r.text}”</p><small><strong>${r.name}</strong>, ${r.city}</small></div></blockquote>`).join("")}` : ""}
        <h2>Why ${c.name} Chooses Ocean1Gutters</h2>
        <ul class="checklist">
          <li>${icons.checkCircle}<span><strong>Local & fast:</strong> ${c.hq ? "headquartered right here" : `minutes from our ${b.city} shop`}, free estimates within 24–48 hours</span></li>
          <li>${icons.checkCircle}<span><strong>${b.license}</strong> with certificates on request</span></li>
          <li>${icons.checkCircle}<span><strong>${b.warranty}</strong></span></li>
          <li>${icons.checkCircle}<span><strong>HOA-friendly:</strong> we carry the color charts and paperwork most ${c.name} communities require</span></li>
          <li>${icons.checkCircle}<span><strong>Photo-documented</strong> before, during and after every job</span></li>
        </ul>
        <div class="callout">${icons.phone}<div><strong>Call or text ${b.phone}</strong> for same-week service in ${c.name}, or use the form for a written quote in 24 hours.</div></div>
      </div>
      ${S.contactAside({ city: c.name })}
    </div></section>`
    + S.estimator()
    + S.faqSection(faqs, { heading: `Gutter Questions from ${c.name} Homeowners` })
    + `<section class="section section--alt section--tight"><div class="container"><p class="eyebrow">Nearby</p><ul class="tags">${cities.filter((o) => o.slug !== c.slug).map((o) => `<li><a href="/gutters-${o.slug}-fl/">${o.name}</a></li>`).join("")}</ul></div></section>`
    + S.ctaBand({ heading: `Get Your Free ${c.name} Gutter Estimate` });
  return shell({ title, description, path, schema }, body);
}

export function aboutPage() {
  const title = `About ${b.name} | Family-Owned Gutter Company in Boynton Beach, FL`;
  const description = `Meet ${b.name}: a family-owned, licensed & insured seamless gutter company serving Palm Beach County since ${b.founded}. Honest quotes, photo-documented work, lifetime warranty.`;
  const cr = [{ label: "Home", href: "/" }, { label: "About", href: "/about/" }];
  const schema = [breadcrumbSchema(cr), { "@context": "https://schema.org", "@type": "AboutPage", name: title, url: abs("/about/"), mainEntity: { "@id": abs("/#business") } }];
  const body = S.pageHero({ eyebrow: "About Us", h1: "A Local Crew That Treats Your House Like Our Own", lead: `Ocean1Gutters is a family-owned gutter company based in ${b.city}. We started in ${b.founded} with one truck and a simple rule: do the job the way we'd want it done on our own home.`, crumbsHtml: crumbs(cr) })
    + `<section class="section"><div class="container split">
      <div class="reveal"><div class="media">${placeholderPhoto("Photo slot: team in front of the truck (add assets/img/about-team.jpg)", "about-team", "The Ocean1Gutters team in Boynton Beach, FL")}</div></div>
      <div class="content reveal">
        <h2>Why We Started Ocean1Gutters</h2>
        <p>After years in the trade, we kept seeing the same thing: homeowners paying for gutters that sagged in two seasons, leaked at every seam, and were nailed into fascia with spikes that rust out. The products exist to do it right. Most companies just don't bother.</p>
        <p>So we built a company around doing it right: heavier .032 aluminum, screw-in hidden hangers, oversized downspouts, seamless runs formed on site, and a written lifetime workmanship warranty that means something because we're not going anywhere.</p>
        <h2>What You Can Expect</h2>
        <ul class="checklist">
          <li>${icons.checkCircle}<span>A real person answers the phone, and we show up when we say we will</span></li>
          <li>${icons.checkCircle}<span>An itemized written quote. The quote is the price.</span></li>
          <li>${icons.checkCircle}<span>Uniformed, background-checked crew with our own equipment</span></li>
          <li>${icons.checkCircle}<span>Photos of every stage of the job sent to your phone</span></li>
          <li>${icons.checkCircle}<span>Spotless clean-up and a water test before we leave</span></li>
        </ul>
      </div>
    </div></section>`
    + S.statsBand() + S.whyUs() + S.reviewsSection() + S.serviceArea() + S.ctaBand();
  return shell({ title, description, path: "/about/", schema }, body);
}

export function contactPage() {
  const title = `Contact ${b.name} | Free Gutter Estimate in Palm Beach County`;
  const description = `Request a free gutter estimate from ${b.name}. Call or text ${b.phone}, WhatsApp, or send the form for a written quote within 24 hours. ${b.city}, FL.`;
  const cr = [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }];
  const schema = [breadcrumbSchema(cr), { "@context": "https://schema.org", "@type": "ContactPage", name: title, url: abs("/contact/"), mainEntity: { "@id": abs("/#business") } }];
  const mapQ = encodeURIComponent(`${b.street}, ${b.city}, ${b.state} ${b.zip}`);
  const body = S.pageHero({ eyebrow: "Contact", h1: "Get Your Free Estimate", lead: "Fill out the form, call, or text us a photo. Written quotes within 24 hours, usually much faster.", crumbsHtml: crumbs(cr), cta: false })
    + `<section class="section"><div class="container with-aside" style="grid-template-columns:1fr;gap:40px">
      <div class="grid" style="grid-template-columns:1fr;gap:40px;max-width:1000px;margin:0 auto;width:100%">
        <div class="split" style="align-items:start">
          <div>${S.leadForm({ id: "quote", title: "Request a Free Estimate", sub: "No pressure. No obligation. Just an honest number." })}</div>
          <div class="aside" style="position:static">
            <div class="card"><h3>Call or Text</h3><p><a class="btn btn--navy btn--block" href="tel:${b.phoneRaw}">${icons.phone} ${b.phone}</a></p><p style="margin:0"><a class="btn btn--whatsapp btn--block" href="https://wa.me/${b.whatsapp}?text=Hi%20Ocean1Gutters%2C%20I%27d%20like%20a%20free%20gutter%20estimate." rel="noopener">${icons.whatsapp} WhatsApp</a></p><p class="form__fine" style="margin-top:12px">Text a photo of the problem for the fastest ballpark.</p></div>
            <div class="card"><h3>Hours</h3><table class="hours-table">${b.hours.map((h) => `<tr><td>${h.days}</td><td>${h.open}${h.close ? " – " + h.close : ""}</td></tr>`).join("")}</table></div>
            <div class="card"><h3>Office</h3><p style="margin:0">${b.legalName}<br>${b.street}<br>${b.city}, ${b.state} ${b.zip}<br><a href="mailto:${b.email}">${b.email}</a></p></div>
          </div>
        </div>
        <div class="map-embed reveal"><iframe title="Map to ${b.name} in ${b.city}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${mapQ}&output=embed"></iframe></div>
      </div>
    </div></section>`
    + S.serviceArea() + S.faqSection(homeFaqs);
  return shell({ title, description, path: "/contact/", schema }, body);
}

export function blogIndexPage() {
  const title = `Gutter Tips, Pricing & Advice for South Florida | ${b.name} Blog`;
  const description = `Straight answers on gutter cost, gutter guards, cleaning schedules and storm prep for Palm Beach County homeowners, from the crew at ${b.name}.`;
  const cr = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }];
  const body = S.pageHero({ eyebrow: "Blog", h1: "Gutter Advice for South Florida Homeowners", lead: "Pricing guides, maintenance schedules and honest product reviews from people who hang gutters every day.", crumbsHtml: crumbs(cr), cta: false })
    + `<section class="section"><div class="container"><div class="grid grid-3">${posts.map((p) => `<a class="post-card reveal" data-tilt href="/blog/${p.slug}/"><div class="post-card__img">${icons.doc}</div><div class="post-card__body"><span class="post-card__meta">${new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · ${p.readTime} read</span><h3>${p.title}</h3><p>${p.excerpt}</p></div></a>`).join("")}</div></div></section>`
    + S.ctaBand();
  return shell({ title, description, path: "/blog/", schema: [breadcrumbSchema(cr)] }, body);
}

export function postPage(p) {
  const path = `/blog/${p.slug}/`;
  const cr = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: p.title, href: path }];
  const schema = [breadcrumbSchema(cr), { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date, author: { "@type": "Organization", name: b.name }, publisher: { "@id": abs("/#business") }, mainEntityOfPage: abs(path), image: abs("/assets/img/og-default.jpg") }];
  const body = S.pageHero({ eyebrow: `${new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · ${p.readTime} read`, h1: p.title, lead: p.description, crumbsHtml: crumbs(cr), cta: false })
    + `<section class="section"><div class="container with-aside"><article class="content">${p.body}<hr style="border:0;border-top:1px solid var(--line);margin:32px 0"><p><strong>About the author:</strong> ${b.name} is a family-owned seamless gutter company in ${b.city}, FL, serving Palm Beach County since ${b.founded}. <a href="/contact/">Request a free estimate</a>.</p></article>${S.contactAside()}</div></section>`
    + `<section class="section section--alt"><div class="container"><h2 class="text-center">More Gutter Tips</h2><div class="grid grid-3">${posts.filter((o) => o.slug !== p.slug).map((o) => `<a class="post-card" href="/blog/${o.slug}/"><div class="post-card__body"><h3>${o.title}</h3><p>${o.excerpt}</p></div></a>`).join("")}</div></div></section>`
    + S.ctaBand();
  return shell({ title: `${p.title} | ${b.name}`, description: p.description, path, schema }, body);
}

export function thankYouPage() {
  const body = `<section class="section thanks" style="padding-top:calc(var(--header-h) + 64px)"><div class="container" style="max-width:640px"><div class="big">${icons.check}</div><h1>Thanks! We've Got Your Request.</h1><p class="lead">A real person from our ${b.city} office will reach out shortly, usually within the hour during business hours. Need it faster?</p><p><a class="btn btn--primary btn--lg" href="tel:${b.phoneRaw}">${icons.phone} Call ${b.phone}</a></p><p class="form__fine">While you wait: <a href="/blog/how-much-do-seamless-gutters-cost-palm-beach-county/">see what seamless gutters cost in Palm Beach County</a>.</p></div></section>`;
  return shell({ title: `Thank You | ${b.name}`, description: "Your estimate request was received.", path: "/thank-you/", noindex: true }, body, { solid: true });
}

export function privacyPage() {
  const body = `<section class="section" style="padding-top:calc(var(--header-h) + 48px)"><div class="container content"><h1>Privacy Policy</h1><p>${b.legalName} ("we") collects the information you submit through forms on this site (name, phone, email, address, project details) solely to respond to your request and provide gutter services. We do not sell your information. We may use analytics tools (such as Google Analytics) that collect anonymized usage data. By submitting a form you consent to be contacted by phone, text or email about your request. To have your data removed, email <a href="mailto:${b.email}">${b.email}</a>.</p><p>Last updated: ${new Date().toISOString().slice(0, 10)}.</p></div></section>`;
  return shell({ title: `Privacy Policy | ${b.name}`, description: `Privacy policy for ${b.name}.`, path: "/privacy/", noindex: true }, body, { solid: true });
}

export function notFoundPage() {
  const body = `<section class="section thanks notfound" style="padding-top:calc(var(--header-h) + 48px)"><div class="container"><h1>404</h1><h2>That page washed away.</h2><p class="lead">Try one of these instead.</p><p><a class="btn btn--primary" href="/">Home</a> <a class="btn btn--outline" href="/services/">Services</a> <a class="btn btn--outline" href="/contact/">Free Estimate</a></p></div></section>`;
  return shell({ title: `Page Not Found | ${b.name}`, description: "Page not found.", path: "/404.html", noindex: true }, body, { solid: true });
}
