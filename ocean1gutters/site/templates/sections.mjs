import { business as b, services, cities, reviews, colors, stats } from "../data/site.mjs";
import { icons, starRow } from "./icons.mjs";
import { heroHouse, beforeSvg, afterSvg, previewHouse, areaMap, placeholderPhoto, photoOr, logoMark } from "./art.mjs";
import { esc } from "./layout.mjs";

export function leadForm({ id = "quote", title = "Get Your Free Estimate", sub = "Written quote within 24 hours. No pressure, no obligation.", service = "", city = "", compact = false } = {}) {
  return `<div class="card lead-card" id="${id}">
  <h3>${title}</h3>
  <p class="lead-card__sub">${sub}</p>
  <form class="form" data-lead action="/contact.php" method="post" id="${id}-form">
    <input type="hidden" name="source" value="${esc(id)}">
    <input type="hidden" name="est_summary" id="${id === "quote" ? "est-summary" : id + "-est"}" value="">
    <input type="hidden" name="color_choice" id="${id === "quote" ? "color-choice" : id + "-color"}" value="">
    <p class="hp"><label>Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
    <div class="form__row form__row--2">
      <div class="field"><label for="${id}-name">Name</label><input id="${id}-name" name="name" type="text" autocomplete="name" required><span class="field__error">Please enter your name</span></div>
      <div class="field"><label for="${id}-phone">Phone</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required><span class="field__error">Enter a 10-digit phone</span></div>
    </div>
    <div class="form__row form__row--2">
      <div class="field"><label for="${id}-email">Email</label><input id="${id}-email" name="email" type="email" autocomplete="email" required><span class="field__error">Enter a valid email</span></div>
      <div class="field"><label for="${id}-city">City</label><select id="${id}-city" name="city">${cities.map((c) => `<option${c.name === city ? " selected" : ""}>${c.name}</option>`).join("")}<option>Other (Palm Beach County)</option></select></div>
    </div>
    <div class="field"><label for="${id}-service">What do you need?</label><select id="${id}-service" name="service">${services.map((s) => `<option${s.name === service ? " selected" : ""}>${s.name}</option>`).join("")}<option>Not sure / Inspection</option></select></div>
    ${compact ? "" : `<div class="field"><label for="${id}-message">Details (optional)</label><textarea id="${id}-message" name="message" placeholder="Stories, approx. linear feet, problem you're seeing, best time to call…"></textarea></div>`}
    <div class="form__status" role="status" aria-live="polite"></div>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Get My Free Estimate ${icons.arrow}</button>
    <p class="form__fine">Or call/text <a href="tel:${b.phoneRaw}">${b.phone}</a>. We reply fast, usually within the hour.</p>
  </form>
</div>`;
}

export function hero() {
  const words = (txt) => txt.split(" ").map((w, i) => `<span class="w" style="--i:${i}"><i>${w}</i></span>`).join(" ");
  const chips = colors.slice(0, 9).map((c, i) => `<button type="button" class="swatch swatch--story" data-hex="${c.hex}" data-name="${c.name}" style="background:${c.hex}" aria-label="${c.name}" aria-pressed="${i === 0}"></button>`).join("");
  return `<div class="curtain" aria-hidden="true"><div class="curtain__inner">${logoMark.replace(/#lg\b|id="lg"/g, (m) => m.replace("lg", "lgc"))}<span>Ocean<em>1</em>Gutters</span></div></div>
<section class="story" id="top" data-story>
  <div class="story__stage">
    <div class="hero__scene" aria-hidden="true" data-scene>
      <div class="hero__fallback">${heroHouse()}</div>
      <div class="hero__scrim"></div>
      <div class="hero__vignette"></div>
    </div>
    <div class="story__ui">
      <div class="container hero__grid story__block story__hero" data-range="0,0.17">
        <div class="hero__copy">
          <span class="badge"><span class="dot"></span> Boca Raton · Delray Beach · Boynton Beach</span>
          <h1>${words("Seamless Gutter Installation &")} <span class="hl">${words("Leaf Guards.")}</span><br>${words("Boca Raton to Boynton Beach.")}</h1>
          <p class="hero__lead">Custom 6" and 7" seamless aluminum gutters and clog-proof leaf guard gutters, roll-formed in your driveway and installed in a day. Licensed, insured, lifetime workmanship warranty.</p>
          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="#quote" data-magnetic>Get a Free Estimate ${icons.arrow}</a>
            <a class="btn btn--ghost-light btn--lg" href="tel:${b.phoneRaw}" data-magnetic>${icons.phone} ${b.phone}</a>
          </div>
          <div class="hero__trust">
            <span class="rating-pill" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15);color:#fff">${starRow(5)} <strong>${b.rating.value}</strong> <small style="color:#b8c9dc">Google rating</small></span>
            <ul><li>${icons.shield} Licensed &amp; Insured</li><li>${icons.award} Lifetime Warranty</li><li>${icons.bolt} 24-Hour Quotes</li></ul>
          </div>
        </div>
        <div class="hero__form">${leadForm({ id: "quote" })}</div>
      </div>
      <div class="container story__block story__caption" data-range="0.2,0.42">
        <span class="story__num">01 — The problem</span>
        <h2>60 inches of rain a year.<br>Most of it in 20-minute bursts.</h2>
        <p>Builder-grade 5" gutters overflow at the fascia, rot the soffit and dump water at your foundation. Sectional gutters leak at every seam.</p>
      </div>
      <div class="container story__block story__caption story__caption--right" data-range="0.46,0.68">
        <span class="story__num">02 — Seamless installation</span>
        <h2>One continuous piece.<br>Formed on your driveway.</h2>
        <p>Heavy-gauge .032 aluminum, roll-formed to the exact length of each run, hung on screw-in hidden hangers every 24". No seams. No leaks.</p>
      </div>
      <div class="container story__block story__caption" data-range="0.7,0.88">
        <span class="story__num">03 — Leaf guards &amp; downspouts</span>
        <h2>Leaves stay out.<br>Water goes where it should.</h2>
        <p>Stainless micro-mesh leaf guards stop palm fronds, pine needles and roof grit. Oversized 3"x4" downspouts carry the water away from your home.</p>
      </div>
      <div class="container story__block story__caption story__caption--center" data-range="0.9,1">
        <span class="story__num">04 — Your color</span>
        <h2>30+ colors. Choose yours.</h2>
        <div class="swatches swatches--story" role="group" aria-label="Gutter colors">${chips}</div>
        <p class="colors__name" style="color:#fff">Selected: <span id="story-color-name">${colors[0].name}</span></p>
        <a class="btn btn--primary btn--lg" href="#quote" data-magnetic>Get my free estimate ${icons.arrow}</a>
      </div>
    </div>
    <ol class="story__dots" aria-hidden="true"><li data-at="0"></li><li data-at="0.3"></li><li data-at="0.56"></li><li data-at="0.78"></li><li data-at="0.95"></li></ol>
    <a class="hero__scrollhint" href="#services" aria-label="Scroll"><span></span>Scroll</a>
  </div>
</section>
${ticker()}`;
}

export function ticker() {
  const items = cities.map((c) => c.name).concat(["Seamless Gutters", "Leaf Guard Gutters", "Gutter Repair", "Gutter Cleaning"]);
  const row = items.map((i) => `<span>${i}</span>`).join('<i aria-hidden="true">✦</i>');
  return `<div class="ticker" aria-label="Service areas"><div class="ticker__track">${row}<i aria-hidden="true">✦</i>${row}<i aria-hidden="true">✦</i></div></div>`;
}

export function trustBar() {
  const items = [
    [icons.shield, "Licensed & Insured", "Florida LLC, fully covered"],
    [icons.award, "Lifetime Workmanship Warranty", "On every new installation"],
    [icons.bolt, "Quotes in 24 Hours", "Most installs within a week"],
    [icons.users, "Family-Owned & Local", `Based in ${b.city} since ${b.founded}`],
  ];
  return `<div class="trustbar"><div class="container trustbar__inner">${items.map(([i, t, s]) => `<div class="trust-item">${i}<div>${t}<small>${s}</small></div></div>`).join("")}</div></div>`;
}

export function servicesGrid({ heading = "Everything Your Gutters Need, One Call", intro = "From brand-new seamless systems to a single leaking corner, we handle the full life of your gutters.", hscroll = false } = {}) {
  if (hscroll) {
    return `<section class="hscroll section--dark" id="services" data-hscroll data-spot>
  <div class="hscroll__pin">
    <div class="container"><div class="section-head reveal"><span class="eyebrow">Our Services</span><h2>${heading}</h2><p class="lead">${intro}</p></div></div>
    <div class="hscroll__track">
      ${services.map((s, i) => `<a class="svc-card svc-card--glass reveal" data-tilt data-delay="${(i % 3) + 1}" href="/services/${s.slug}/"><span class="svc-card__index">0${i + 1}</span><div class="svc-card__icon">${icons[s.icon]}</div><h3>${s.name}</h3><p>${s.blurb}</p><span class="link">Learn more ${icons.arrow}</span></a>`).join("")}
      <a class="svc-card svc-card--glass svc-card--cta reveal" data-tilt href="/contact/"><span class="svc-card__index">06</span><div class="svc-card__icon">${icons.camera}</div><h3>Not sure what you need?</h3><p>Text us a photo of the problem and we'll tell you what it is and roughly what it costs, usually within the hour.</p><span class="link">Send a photo ${icons.arrow}</span></a>
    </div>
  </div>
</section>`;
  }
  return `<section class="section" id="services">
  <div class="container">
    <div class="section-head section-head--center reveal"><span class="eyebrow">Our Services</span><h2>${heading}</h2><p class="lead">${intro}</p></div>
    <div class="grid grid-3">
      ${services.map((s, i) => `<a class="svc-card reveal" data-tilt data-delay="${(i % 3) + 1}" href="/services/${s.slug}/"><div class="svc-card__icon">${icons[s.icon]}</div><h3>${s.name}</h3><p>${s.blurb}</p><span class="link">Learn more ${icons.arrow}</span></a>`).join("")}
      <a class="svc-card reveal" data-tilt data-delay="3" href="/contact/" style="background:linear-gradient(135deg,var(--navy-800),var(--ocean-600));color:#fff;border:0"><div class="svc-card__icon" style="background:rgba(255,255,255,.12);color:#fff">${icons.camera}</div><h3 style="color:#fff">Not sure what you need?</h3><p style="color:#c3d3e5">Text us a photo of the problem and we'll tell you what it is and roughly what it costs, usually within the hour.</p><span class="link" style="color:var(--aqua-300)">Send a photo ${icons.arrow}</span></a>
    </div>
  </div>
</section>`;
}

export function whyUs() {
  const feats = [
    [icons.ruler, "Measured & formed on site", "Our truck-mounted machine rolls each gutter to the exact length of your roofline. No seams, no leaks, ever."],
    [icons.shield, "Heavier metal, stronger hangers", ".032 aluminum and screw-in hidden hangers every 24\". Built for hurricane season, not just the showroom."],
    [icons.dollar, "The quote is the price", "Written, itemized, and honored. If we find rotted fascia, we show you photos before touching it."],
    [icons.camera, "Photo-documented work", "Before, during and after photos texted to you. See the job without climbing a ladder."],
  ];
  return `<section class="section section--alt" id="why">
  <div class="container split">
    <div class="reveal">
      <div class="media" data-parallax="0.12">${placeholderPhoto("Photo slot: crew installing seamless gutters (add assets/img/why-crew.jpg)", "why-crew", "Ocean1Gutters crew installing seamless gutters on a Palm Beach County home")}</div>
    </div>
    <div>
      <div class="section-head reveal"><span class="eyebrow">Why Ocean1Gutters</span><h2>Built Like We're Going to See You Again. Because We Will.</h2><p class="lead">We're a local, family-owned crew in ${b.city}. Our name is on every job, so we don't cut the corners that fail two rainy seasons from now.</p></div>
      <div class="grid grid-2">${feats.map(([i, h, p], k) => `<div class="feature reveal" data-delay="${k + 1}"><div class="feature__icon">${i}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}</div>
    </div>
  </div>
</section>`;
}

export function beforeAfter() {
  return `<section class="section section--dark" id="results" data-spot>
  <div class="container split">
    <div>
      <div class="section-head reveal"><span class="eyebrow">See the Difference</span><h2>Drag to Compare: Old Sectional vs. New Seamless</h2><p class="lead">Sagging, leaking, overflowing gutters are the #1 cause of fascia rot and foundation washout in South Florida. Here's what a proper seamless system looks like.</p></div>
      <ul class="checklist reveal">
        <li>${icons.checkCircle}<span><strong>Zero seams</strong> along every run, so there's nothing to leak</span></li>
        <li>${icons.checkCircle}<span><strong>Correct pitch</strong> toward oversized 3"x4" downspouts</span></li>
        <li>${icons.checkCircle}<span><strong>Hidden hangers</strong> screwed into rafter tails, not nailed into fascia</span></li>
        <li>${icons.checkCircle}<span><strong>Color-matched</strong> to your trim so they disappear</span></li>
      </ul>
    </div>
    <div class="reveal" data-delay="2">
      <div class="ba" data-parallax="0.1" data-tilt data-tilt-max="4">
        <div class="ba__layer ba__layer--after">${photoOr("after", afterSvg, "After: new seamless gutters installed by Ocean1Gutters")}</div>
        <div class="ba__layer ba__layer--before">${photoOr("before", beforeSvg, "Before: sagging, leaking sectional gutters")}</div>
        <div class="ba__handle"></div>
        <span class="ba__tag ba__tag--before">Before</span><span class="ba__tag ba__tag--after">After</span>
        <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
      </div>
      <p class="form__fine" style="margin-top:10px">Drag the handle to compare.</p>
    </div>
  </div>
</section>`;
}

export function process({ steps, heading = "How It Works", eyebrow = "Simple Process" } = {}) {
  const def = [
    ["Request a quote", "Call, text a photo, or use the form. We schedule a free on-site visit within 24–48 hours."],
    ["We measure & price it", "Written, itemized quote on the spot. Choose your gutter size, color and guard options."],
    ["Installed in a day", "Gutters roll-formed on site to exact lengths. Old gutters hauled away. Most jobs done in one visit."],
    ["Water-tested & warrantied", "We run water through every section, clean up, and hand you a lifetime workmanship warranty."],
  ];
  const list = steps || def;
  return `<section class="section section--alt" id="process">
  <div class="container">
    <div class="section-head section-head--center reveal"><span class="eyebrow">${eyebrow}</span><h2>${heading}</h2></div>
    <div class="steps${list.length === 5 ? " steps--5" : ""}">${list.map((s, i) => `<div class="step reveal" data-tilt data-delay="${i + 1}"><h3>${Array.isArray(s) ? s[0] : `Step ${i + 1}`}</h3><p>${Array.isArray(s) ? s[1] : s}</p></div>`).join("")}</div>
  </div>
</section>`;
}

export function estimator() {
  return `<section class="section" id="estimate">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Instant Estimator</span><h2>What Will New Gutters Cost? Find Out in 30 Seconds.</h2><p class="lead">Slide to your home's approximate gutter length and get a real Palm Beach County price range. Then lock it in with a free on-site measurement.</p></div>
    <div class="estimator" id="estimator">
      <div class="est__controls card reveal">
        <div class="range">
          <div class="range__head"><label for="est-feet">Linear feet of gutter</label><span class="range__val" id="est-feet-val">150 ft</span></div>
          <input type="range" id="est-feet" min="60" max="400" step="10" value="150">
          <span class="range__hint">Tip: walk the perimeter of your home. Most single-story homes have 120–200 ft; two-story 180–300 ft.</span>
        </div>
        <div>
          <p style="font-weight:700;margin-bottom:8px">Stories</p>
          <div class="chips"><label class="chip"><input type="radio" name="est-stories" value="1" checked><span>1 story</span></label><label class="chip"><input type="radio" name="est-stories" value="2"><span>2 stories</span></label></div>
        </div>
        <div>
          <p style="font-weight:700;margin-bottom:8px">Gutter size</p>
          <div class="chips"><label class="chip"><input type="radio" name="est-size" value="6" checked><span>6" seamless (most homes)</span></label><label class="chip"><input type="radio" name="est-size" value="7"><span>7" (tile / large roofs)</span></label></div>
        </div>
        <div>
          <p style="font-weight:700;margin-bottom:8px">Add-ons</p>
          <div class="chips"><label class="chip"><input type="checkbox" id="est-removal" checked><span>Remove old gutters</span></label><label class="chip"><input type="checkbox" id="est-guards"><span>Add micro-mesh guards</span></label></div>
        </div>
      </div>
      <div class="est__result reveal" data-delay="2">
        <span class="label">Estimated investment</span>
        <div class="est__price"><span id="est-low">$1,350</span> – <span id="est-high">$1,950</span></div>
        <p class="est__sub">Installed, including hangers, miters, downspouts and clean-up.</p>
        <ul class="est__lines" id="est-lines"></ul>
        <a class="btn btn--primary btn--lg btn--block" id="est-cta" href="#quote">Lock In My Price ${icons.arrow}</a>
        <p class="est__fine">Ballpark only. Final pricing depends on roof complexity, fascia condition and downspout count. Your written on-site quote is the number you pay.</p>
      </div>
    </div>
  </div>
</section>`;
}

export function colorPicker() {
  return `<section class="section section--alt" id="colors">
  <div class="container colors">
    <div class="reveal">
      <div class="section-head"><span class="eyebrow">30+ Colors</span><h2>Pick a Color. See It on the House.</h2><p class="lead">Baked-on enamel finishes that never chalk, peel or fade in the Florida sun. Match your trim, roof or stucco, or make a statement.</p></div>
      <div class="swatches" role="group" aria-label="Gutter colors">${colors.map((c, i) => `<button type="button" class="swatch" data-hex="${c.hex}" data-name="${c.name}" style="background:${c.hex}" aria-label="${c.name}" aria-pressed="${i === 0}"></button>`).join("")}</div>
      <p class="colors__name">Selected: <span id="color-name">${colors[0].name}</span></p>
      <a class="btn btn--navy" href="#quote">Quote in this color ${icons.arrow}</a>
    </div>
    <div class="house-preview reveal" data-parallax="0.1" data-tilt data-tilt-max="5" data-delay="2">${previewHouse(colors[0].hex)}</div>
  </div>
</section>`;
}

export function statsBand() {
  return `<section class="section section--dark section--tight" data-spot>
  <div class="container stats">${stats.map((s, i) => `<div class="stat reveal" data-tilt data-delay="${i + 1}"><div class="stat__num"><span data-count="${s.value}" data-decimals="${s.decimals || 0}">${s.value.toLocaleString("en-US")}</span><small>${s.suffix}</small></div><div class="stat__label">${s.label}</div></div>`).join("")}</div>
</section>`;
}

export function reviewsSection({ heading = "Palm Beach County Homeowners Trust Us With Their Homes" } = {}) {
  return `<section class="section" id="reviews">
  <div class="container">
    <div class="section-head section-head--center reveal"><span class="eyebrow">Reviews</span><h2>${heading}</h2>
      <p><span class="rating-pill">${starRow(5)} <strong>${b.rating.value} / 5</strong> <small>from ${b.rating.count}+ reviews</small></span></p></div>
    <div class="reviews reveal">
      <div class="reviews__track" tabindex="0" aria-label="Customer reviews">
        ${reviews.map((r) => `<article class="review" data-tilt>${starRow(r.stars)}<p class="review__text">“${r.text}”</p><div class="review__meta"><div class="avatar" aria-hidden="true">${r.name[0]}</div><div><strong>${r.name}</strong><small>${r.city}, FL · Verified customer</small></div></div></article>`).join("")}
      </div>
      <div class="reviews__nav"><button class="reviews__btn reviews__btn--prev" type="button" aria-label="Previous reviews">${icons.arrowLeft}</button><button class="reviews__btn reviews__btn--next" type="button" aria-label="Next reviews">${icons.arrow}</button></div>
      <p class="text-center" style="margin-top:20px"><a class="btn btn--outline" href="${b.social.google}" target="_blank" rel="noopener">${icons.google} Read all reviews on Google</a></p>
    </div>
  </div>
</section>`;
}

export function serviceArea() {
  return `<section class="section section--dark" id="areas" data-spot>
  <div class="container area">
    <div class="area__map reveal" data-parallax="0.08">${areaMap(cities)}</div>
    <div>
      <div class="section-head reveal"><span class="eyebrow">Service Area</span><h2>Boca Raton to Boynton Beach, and Everywhere Between</h2><p class="lead">Headquartered in ${b.city}, with crews running daily from Deerfield Beach up to West Palm Beach. Hover a city to see it on the map.</p></div>
      <ul class="area__list reveal">${cities.map((c) => `<li><a href="/gutters-${c.slug}-fl/" data-city="${c.slug}">${icons.pin} ${c.name}</a></li>`).join("")}</ul>
      <p class="form__fine" style="text-align:left;color:#8fa6bf">Don't see your city? We cover all of southern Palm Beach County and northern Broward. <a href="/contact/" style="color:#7fe3d7">Ask us.</a></p>
    </div>
  </div>
</section>`;
}

export function faqSection(faqs, { heading = "Questions Homeowners Ask Us Every Week", eyebrow = "FAQ" } = {}) {
  return `<section class="section" id="faq">
  <div class="container">
    <div class="section-head section-head--center reveal"><span class="eyebrow">${eyebrow}</span><h2>${heading}</h2></div>
    <div class="faq reveal">${faqs.map((f, i) => `<details${i === 0 ? " open" : ""}><summary>${f.q}</summary><div class="faq__a"><p>${f.a}</p></div></details>`).join("")}</div>
  </div>
</section>`;
}

export function ctaBand({ heading = "Ready for Gutters That Actually Work?", sub = "Free on-site estimate. Written quote in 24 hours. Most installs done in a single day." } = {}) {
  return `<section class="section section--tight"><div class="container"><div class="cta-band reveal" data-spot>
    <div><h2>${heading}</h2><p>${sub}</p></div>
    <div class="cta-band__actions"><a class="btn btn--primary btn--lg" href="/contact/">Get a Free Estimate ${icons.arrow}</a><a class="btn btn--ghost-light btn--lg" href="tel:${b.phoneRaw}">${icons.phone} ${b.phone}</a></div>
  </div></div></section>`;
}

export function pageHero({ eyebrow, h1, lead, crumbsHtml = "", cta = true }) {
  const rainLines = Array.from({ length: 36 }, (_, i) => `<line x1="${i * 40 + 10}" y1="0" x2="${i * 40 + 2}" y2="28"/>`).join("");
  return `<section class="page-hero"><svg class="page-hero__rain" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true"><g class="rain">${rainLines}</g></svg><div class="container">${crumbsHtml}${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}${cta ? `<div class="hero__actions"><a class="btn btn--primary btn--lg" href="#quote">Get a Free Estimate ${icons.arrow}</a><a class="btn btn--ghost-light btn--lg" href="tel:${b.phoneRaw}">${icons.phone} ${b.phone}</a></div>` : ""}</div></section>`;
}

export function contactAside({ service, city } = {}) {
  return `<aside class="aside">
    ${leadForm({ id: "quote", title: "Free Estimate", sub: "We'll call you back within the hour during business hours.", service, city, compact: true })}
    <div class="card"><h3>Prefer to talk?</h3><p style="margin:0 0 12px"><a class="btn btn--navy btn--block" href="tel:${b.phoneRaw}">${icons.phone} ${b.phone}</a></p><p style="margin:0"><a class="btn btn--whatsapp btn--block" href="https://wa.me/${b.whatsapp}" rel="noopener">${icons.whatsapp} Text us on WhatsApp</a></p></div>
  </aside>`;
}

export { heroHouse };
