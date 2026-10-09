/* Ocean1Gutters — interactive layer (vanilla JS, no dependencies, deferred) */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const cfg = window.O1G || {};
  const assetBase = cfg.assets || ((document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/main\.js(\?.*)?$/, "") : "/assets/js/");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
      const sn = $("#story-color-name"); if (sn) sn.textContent = s.dataset.name;
      if (window.O1G_scene) window.O1G_scene.setGutterColor(s.dataset.hex);
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


  /* ---------- Cinematic: lazy-load the 3D hero scene ---------- */
  const sceneHost = $("[data-scene]");
  if (sceneHost && !reduceMotion) {
    const webgl = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (_) { return false; } })();
    const saveData = navigator.connection && navigator.connection.saveData;
    if (webgl && !saveData) {
      const load = (src) => new Promise((res, rej) => { const el = document.createElement("script"); el.src = src; el.async = true; el.onload = res; el.onerror = rej; document.head.appendChild(el); });
      const start = () => load(assetBase + "vendor/three.min.js").then(() => load(assetBase + "vendor/three.post.js")).then(() => load(assetBase + "scene.js")).catch(() => {});
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
      if (document.readyState === "complete") idle(start); else window.addEventListener("load", () => idle(start), { once: true });
    }
  }

  /* ---------- Cinematic: 3D tilt cards ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach((el) => {
      const max = parseFloat(el.dataset.tiltMax || "8");
      let raf = 0;
      el.addEventListener("pointerenter", () => el.classList.add("is-tilting"));
      el.addEventListener("pointermove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * max * 2).toFixed(2)}deg) translateY(-4px)`;
          el.style.setProperty("--gx", (px * 100).toFixed(1) + "%"); el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
        });
      });
      el.addEventListener("pointerleave", () => { el.classList.remove("is-tilting"); el.style.transform = ""; });
    });

    /* Magnetic buttons */
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); el.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.25).toFixed(1)}px)`; });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });

    /* Cursor spotlight on dark surfaces */
    $$("[data-spot]").forEach((el) => {
      el.addEventListener("pointerenter", () => el.classList.add("is-lit"));
      el.addEventListener("pointerleave", () => el.classList.remove("is-lit"));
      el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }

  /* ---------- Cinematic: scroll parallax ---------- */
  const px = $$("[data-parallax]");
  if (px.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      px.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const centre = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-centre * parseFloat(el.dataset.parallax || "0.1")).toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Phone formatting ---------- */
  $$('input[type="tel"]').forEach((t) => t.addEventListener("input", () => {
    const d = t.value.replace(/\D/g, "").slice(0, 10);
    t.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
  }));

  /* ---------- Smooth anchor offset for in-page links ---------- */
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1); const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const inStory = el.closest(".story");
    const target = inStory ? 0 : el; // the hero form lives in the pinned story: scroll to the top
    if (window.O1G_lenis) window.O1G_lenis.scrollTo(target, { offset: inStory ? 0 : -80, duration: 1.2 });
    else if (inStory) window.scrollTo({ top: 0, behavior: "smooth" }); else el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (inStory) setTimeout(() => { const f = el.querySelector("input"); f && f.focus({ preventScroll: true }); }, 900);
    history.replaceState(null, "", "#" + id);
  }));

  /* ---------- Story: scroll-driven captions + 3D camera progress ---------- */
  const storyEl = $("[data-story]");
  if (storyEl) {
    const blocks = $$("[data-range]", storyEl).map((el) => { const [a, b] = el.dataset.range.split(",").map(Number); return { el, a, b }; });
    const dots = $$(".story__dots li", storyEl);
    const st = (window.O1G_story = window.O1G_story || { progress: 0 });
    const fade = 0.045;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = storyEl.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - vh)));
      st.progress = p;
      blocks.forEach(({ el, a, b }) => {
        let o = 0, y = 0;
        if (p >= a && p <= b) {
          const inA = a === 0 ? 1 : Math.min(1, (p - a) / fade), outB = b >= 1 ? 1 : Math.min(1, (b - p) / fade);
          o = Math.min(inA, outB); y = (1 - inA) * 40 - (1 - outB) * 40;
        } else if (p > b && a === 0) { o = 0; }
        const active = o > 0.01;
        el.classList.toggle("is-active", active);
        if (active || el.style.opacity !== "0") { el.style.opacity = o.toFixed(3); el.style.transform = el.classList.contains("story__caption--center") ? `translate(-50%, calc(-50% + ${y.toFixed(1)}px))` : (window.innerWidth < 1024 && el.classList.contains("story__hero")) ? `translateY(${y.toFixed(1)}px)` : `translateY(calc(-50% + ${y.toFixed(1)}px))`; }
      });
      let near = 0; dots.forEach((d, i) => { if (Math.abs(parseFloat(d.dataset.at) - p) < Math.abs(parseFloat(dots[near].dataset.at) - p)) near = i; });
      dots.forEach((d, i) => d.classList.toggle("is-active", i === near));
      const hint = $(".hero__scrollhint", storyEl); if (hint) hint.style.opacity = p < 0.05 ? "" : "0";
      $(".story__stage", storyEl).classList.toggle("is-past-hero", p > 0.15);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); update();
  }

  /* ---------- Pinned horizontal scroll (desktop) ---------- */
  const hs = $("[data-hscroll]");
  if (hs && !reduceMotion) {
    const track = $(".hscroll__track", hs);
    let dist = 0, raf = 0;
    const measure = () => {
      if (window.innerWidth < 1024) { hs.style.height = ""; track.style.transform = ""; dist = 0; return; }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      hs.style.height = (window.innerHeight + dist) + "px";
    };
    const update = () => {
      raf = 0; if (!dist) return;
      const rect = hs.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / dist));
      track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure(); update();
    window.addEventListener("resize", () => { measure(); update(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", () => { measure(); update(); });
  }

  /* ---------- Reading progress bar ---------- */
  const bar = document.createElement("div"); bar.className = "progress"; document.body.appendChild(bar);
  const paintBar = () => { const max = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = `scaleX(${max > 0 ? (window.scrollY / max).toFixed(4) : 0})`; };
  window.addEventListener("scroll", paintBar, { passive: true }); paintBar();

  /* ---------- Split section headings into words ---------- */
  $$(".section-head h2").forEach((h) => {
    if (h.querySelector(".w")) return;
    h.innerHTML = h.innerHTML.split(/(<br\s*\/?>)/).map((part) => /^<br/.test(part) ? part : part.split(" ").filter(Boolean).map((w, i) => `<span class="w" style="--i:${i}"><i>${w}</i></span>`).join(" ")).join("");
  });

  /* ---------- Smooth inertial scrolling (Lenis) ---------- */
  if (finePointer && !reduceMotion && !/nolenis/.test(location.search)) {
    const el = document.createElement("script"); el.src = assetBase + "vendor/lenis.min.js"; el.async = true;
    el.onload = () => {
      if (!window.Lenis) return;
      const lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
      window.O1G_lenis = lenis;
      const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
    };
    document.head.appendChild(el);
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduceMotion) {
    const c = document.createElement("div"); c.className = "cursor"; document.body.appendChild(c);
    let x = 0, y = 0, tx = 0, ty = 0, on = false;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; if (!on) { on = true; c.classList.add("is-on"); } const link = e.target.closest("a, button, [data-tilt], input[type=range], .swatch, summary"); c.classList.toggle("is-link", !!link); }, { passive: true });
    window.addEventListener("pointerdown", () => c.classList.add("is-down")); window.addEventListener("pointerup", () => c.classList.remove("is-down"));
    document.addEventListener("mouseleave", () => c.classList.remove("is-on")); document.addEventListener("mouseenter", () => c.classList.add("is-on"));
    const loop = () => { x += (tx - x) * 0.22; y += (ty - y) * 0.22; c.style.left = x + "px"; c.style.top = y + "px"; requestAnimationFrame(loop); }; loop();
  }

  /* ---------- Page transitions ---------- */
  if (!reduceMotion) document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]"); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href"); if (!href || href.startsWith("#") || /^(tel|mailto|sms|https?:\/\/(?!${location.host}))/.test(href) || a.hasAttribute("download")) return;
    e.preventDefault(); document.body.classList.add("is-leaving"); setTimeout(() => { location.href = a.href; }, 240);
  });
  window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));
})();
