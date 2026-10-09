/* Ocean1Gutters — interactive layer (vanilla JS, no dependencies, deferred) */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const cfg = window.O1G || {};
  const loadedAt = Date.now(); // used by the server-side "too fast" bot check

  /* ---------- Header: solid on scroll ---------- */
  const header = $(".header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Desktop nav dropdowns (keyboard + touch) ---------- */
  $$(".nav__item--has-menu > .nav__link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const item = btn.parentElement;
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      $$(".nav__item--has-menu").forEach((o) => { if (o !== item) { o.classList.remove("is-open"); o.querySelector(".nav__link").setAttribute("aria-expanded", "false"); } });
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--has-menu")) $$(".nav__item--has-menu.is-open").forEach((o) => { o.classList.remove("is-open"); o.querySelector(".nav__link").setAttribute("aria-expanded", "false"); });
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { $$(".nav__item--has-menu.is-open").forEach((o) => o.classList.remove("is-open")); closeDrawer(); } });

  /* ---------- Mobile drawer ---------- */
  const burger = $(".burger"), drawer = $(".drawer");
  function closeDrawer() { if (!drawer) return; drawer.classList.remove("is-open"); burger && burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = !drawer.classList.contains("is-open");
      drawer.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".drawer__group > button", drawer).forEach((b) => b.addEventListener("click", () => {
      const g = b.parentElement; const open = g.classList.toggle("is-open"); b.setAttribute("aria-expanded", open);
    }));
    $$("a", drawer).forEach((a) => a.addEventListener("click", closeDrawer));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("is-visible"));

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        const el = en.target, target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || "0", 10);
        const dur = 1400, start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - p, 3);
          el.firstChild.nodeValue = (target * eased).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => { c.firstChild.nodeValue = "0"; io.observe(c); });
  }

  /* ---------- Sticky mobile CTA ---------- */
  const sticky = $(".sticky-cta");
  if (sticky) {
    const toggle = () => sticky.classList.toggle("is-visible", window.scrollY > 500);
    toggle(); window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ---------- Range inputs: fill track ---------- */
  function paintRange(r) { const min = +r.min || 0, max = +r.max || 100; r.style.setProperty("--pct", ((r.value - min) / (max - min)) * 100 + "%"); }
  $$('input[type="range"]').forEach((r) => { paintRange(r); r.addEventListener("input", () => paintRange(r)); });

  /* ---------- Instant estimator ---------- */
  const est = $("#estimator");
  if (est) {
    const feet = $("#est-feet", est), stories = $$('input[name="est-stories"]', est), size = $$('input[name="est-size"]', est), guards = $("#est-guards", est), removal = $("#est-removal", est);
    const out = { low: $("#est-low", est), high: $("#est-high", est), feet: $("#est-feet-val", est), lines: $("#est-lines", est) };
    const money = (n) => "$" + (Math.round(n / 10) * 10).toLocaleString("en-US");
    const rates = { 6: [9, 13], 7: [11, 16] }; // per linear foot, installed
    function calc() {
      const lf = +feet.value;
      const st = +(stories.find((s) => s.checked) || {}).value || 1;
      const sz = (size.find((s) => s.checked) || {}).value || "6";
      let [lo, hi] = rates[sz];
      if (st === 2) { lo *= 1.25; hi *= 1.3; }
      let low = lf * lo, high = lf * hi;
      const lines = [[`${sz}" seamless aluminum, ${lf} ft`, `${money(low)} – ${money(high)}`]];
      if (st === 2) lines.push(["Two-story surcharge", "included"]);
      if (removal && removal.checked) { low += 150; high += 350; lines.push(["Old gutter removal & disposal", "$150 – $350"]); }
      if (guards && guards.checked) { const gl = lf * 8, gh = lf * 14; low += gl; high += gh; lines.push(["Micro-mesh gutter guards", `${money(gl)} – ${money(gh)}`]); }
      out.low.textContent = money(low); out.high.textContent = money(high); out.feet.textContent = lf + " ft";
      out.lines.innerHTML = lines.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("");
      const hidden = $("#est-summary"); if (hidden) hidden.value = `Estimator: ${lf} ft, ${st}-story, ${sz}" gutters, guards: ${guards && guards.checked ? "yes" : "no"}, removal: ${removal && removal.checked ? "yes" : "no"} → ${money(low)}–${money(high)}`;
      const link = $("#est-cta"); if (link) link.href = "#quote";
    }
    est.addEventListener("input", calc); calc();
    const lock = $("#est-cta");
    if (lock) lock.addEventListener("click", () => {
      const msg = $('#quote textarea[name="message"]'); const summary = $("#est-summary");
      if (msg && summary && !msg.value) msg.value = "I used the instant estimator. " + summary.value.replace("Estimator: ", "");
    });
  }

  /* ---------- Before / After slider ---------- */
  $$(".ba").forEach((ba) => {
    const r = $('input[type="range"]', ba);
    const set = (v) => ba.style.setProperty("--ba", v + "%");
    if (r) { set(r.value); r.addEventListener("input", () => set(r.value)); }
  });

  /* ---------- Color picker ---------- */
  const swatches = $$(".swatch");
  if (swatches.length) {
    const fills = $$(".gutter-fill"), name = $("#color-name");
    swatches.forEach((s) => s.addEventListener("click", () => {
      swatches.forEach((o) => o.setAttribute("aria-pressed", "false")); s.setAttribute("aria-pressed", "true");
      fills.forEach((f) => f.setAttribute("fill", s.dataset.hex)); if (name) name.textContent = s.dataset.name;
      const hidden = $("#color-choice"); if (hidden) hidden.value = s.dataset.name;
    }));
  }

  /* ---------- Reviews carousel ---------- */
  const track = $(".reviews__track");
  if (track) {
    const step = () => (track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 20 : 320);
    $(".reviews__btn--prev") && $(".reviews__btn--prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    $(".reviews__btn--next") && $(".reviews__btn--next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    let timer = setInterval(auto, 5000);
    function auto() { if (document.hidden) return; const max = track.scrollWidth - track.clientWidth; if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: "smooth" }); else track.scrollBy({ left: step(), behavior: "smooth" }); }
    ["pointerenter", "touchstart", "focusin"].forEach((ev) => track.addEventListener(ev, () => clearInterval(timer), { passive: true }));
    track.addEventListener("pointerleave", () => { clearInterval(timer); timer = setInterval(auto, 5000); });
  }

  /* ---------- Service-area map pins ---------- */
  const pins = $$(".pin"), areaLinks = $$(".area__list a[data-city]");
  function activate(city) {
    pins.forEach((p) => p.classList.toggle("is-active", p.dataset.city === city));
    areaLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.city === city));
  }
  pins.forEach((p) => { p.addEventListener("mouseenter", () => activate(p.dataset.city)); p.addEventListener("click", () => { const a = areaLinks.find((x) => x.dataset.city === p.dataset.city); if (a) window.location.href = a.href; }); });
  areaLinks.forEach((a) => a.addEventListener("mouseenter", () => activate(a.dataset.city)));
  if (pins.length) activate(pins[0].dataset.city);

  /* ---------- Lead forms ---------- */
  $$("form[data-lead]").forEach((form) => {
    const status = $(".form__status", form), btn = $('button[type="submit"]', form);
    form.setAttribute("novalidate", "");
    const validate = () => {
      let ok = true;
      $$("[required]", form).forEach((inp) => {
        const field = inp.closest(".field"); let valid = !!inp.value.trim();
        if (valid && inp.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);
        if (valid && inp.type === "tel") valid = inp.value.replace(/\D/g, "").length >= 10;
        field && field.classList.toggle("field--error", !valid); if (!valid) ok = false;
      });
      return ok;
    };
    $$("input, select, textarea", form).forEach((i) => i.addEventListener("input", () => { const f = i.closest(".field"); f && f.classList.remove("field--error"); }));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (status) { status.className = "form__status"; status.textContent = ""; }
      if (!validate()) { status && (status.className = "form__status is-error", status.textContent = "Please check the highlighted fields."); return; }
      const hp = $('input[name="website"]', form); if (hp && hp.value) return; // honeypot
      btn && btn.classList.add("is-loading");
      const data = new FormData(form);
      data.append("page", location.href);
      data.append("ts", String(loadedAt));
      try {
        const endpoint = form.getAttribute("action") || cfg.endpoint || "/contact.php";
        const res = await fetch(endpoint, { method: "POST", body: data, headers: { "X-Requested-With": "fetch" } });
        const json = await res.json().catch(() => ({ ok: res.ok }));
        if (res.ok && json.ok !== false) {
          try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "generate_lead", form: form.id || "lead" }); } catch (_) {}
          try { if (window.gtag) gtag("event", "generate_lead", { form: form.id || "lead" }); } catch (_) {}
          window.location.href = json.redirect || cfg.thanks || "/thank-you/";
        } else throw new Error(json.error || "Could not send");
      } catch (err) {
        if (status) { status.className = "form__status is-error"; status.innerHTML = `Something went wrong. Please call us at <a href="tel:${cfg.phoneRaw || ""}">${cfg.phone || "our office"}</a>.`; }
      } finally { btn && btn.classList.remove("is-loading"); }
    });
  });

  /* ---------- Phone formatting ---------- */
  $$('input[type="tel"]').forEach((t) => t.addEventListener("input", () => {
    const d = t.value.replace(/\D/g, "").slice(0, 10);
    t.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
  }));

  /* ---------- Smooth anchor offset for in-page links ---------- */
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1); const el = id && document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", "#" + id); }
  }));
})();
