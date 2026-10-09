// SVG artwork used as lightweight, crisp placeholders for real photography.
// Swap for real photos by replacing the <svg> with <img> in build.mjs (search "ART:").

export const logoMark = `<svg class="logo__mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="48" height="48" rx="12" fill="url(#lg)"/>
<path d="M10 20 24 9l14 11" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 24h24v3a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" fill="#7fe3d7"/>
<path d="M31 31v8" stroke="#7fe3d7" stroke-width="3" stroke-linecap="round"/>
<path d="M14 40c3-2 5-2 8 0s5 2 8 0" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
<defs><linearGradient id="lg" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#2f8fd6"/><stop offset="1" stop-color="#0b2545"/></linearGradient></defs>
</svg>`;

// Hero: house with seamless gutter highlighted and animated rain.
export const heroHouse = (gutterColor = "#f3f3f0") => `<svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a South Florida home with seamless gutters channeling rain safely away">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#13375f"/><stop offset="1" stop-color="#1b6ca8"/></linearGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f6f1e8"/><stop offset="1" stop-color="#e3dccd"/></linearGradient>
  <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b85c3a"/><stop offset="1" stop-color="#8f4328"/></linearGradient>
  <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#2f8f5b"/><stop offset="1" stop-color="#1f6a42"/></linearGradient>
  <clipPath id="skyclip"><rect x="0" y="0" width="640" height="480" rx="28"/></clipPath>
</defs>
<g clip-path="url(#skyclip)">
<rect width="640" height="480" fill="url(#sky)"/>
<circle cx="520" cy="90" r="46" fill="#ffe08a" opacity=".9"/>
<ellipse cx="120" cy="110" rx="70" ry="26" fill="#fff" opacity=".12"/><ellipse cx="160" cy="100" rx="50" ry="22" fill="#fff" opacity=".12"/>
<g class="rain">${Array.from({ length: 28 }, (_, i) => `<line x1="${20 + i * 22}" y1="0" x2="${14 + i * 22}" y2="26"/>`).join("")}</g>
<!-- Palm -->
<path d="M560 420c-4-80-2-150 10-200" stroke="#5a3b22" stroke-width="10" stroke-linecap="round" fill="none"/>
<g fill="#2e9c66"><path d="M570 220c-40-30-80-20-100 10 40-10 70 0 100-10z"/><path d="M570 220c40-30 80-20 100 10-40-10-70 0-100-10z"/><path d="M570 220c-10-45 10-80 50-90-25 25-35 55-50 90z"/><path d="M570 220c10-45-10-80-50-90 25 25 35 55 50 90z"/><path d="M570 222c-50 5-80 40-80 80 30-30 55-55 80-80z"/><path d="M570 222c50 5 80 40 80 80-30-30-55-55-80-80z"/></g>
<!-- Ground -->
<rect x="0" y="420" width="640" height="60" fill="url(#grass)"/>
<rect x="0" y="412" width="640" height="10" fill="#3fa36b"/>
<!-- House body -->
<rect x="110" y="210" width="360" height="210" fill="url(#wall)"/>
<rect x="110" y="210" width="360" height="210" fill="none" stroke="#cfc6b4" stroke-width="2"/>
<!-- Door & windows -->
<rect x="268" y="300" width="56" height="120" rx="4" fill="#3b2a1d"/><circle cx="314" cy="362" r="3" fill="#d9b24a"/>
<g fill="#8fd2f5" stroke="#fff" stroke-width="5"><rect x="150" y="260" width="80" height="70"/><rect x="360" y="260" width="80" height="70"/></g>
<path d="M190 260v70M150 295h80M400 260v70M360 295h80" stroke="#fff" stroke-width="4"/>
<!-- Roof -->
<path d="M80 212 290 92l210 120z" fill="url(#roof)"/>
<path d="M80 212 290 92l210 120" fill="none" stroke="#6f3420" stroke-width="4" stroke-linejoin="round"/>
${Array.from({ length: 9 }, (_, i) => `<path d="M${110 + i * 22} 212 290 ${106 + i * 0}" stroke="#7a3a24" stroke-width="1" opacity=".35"/>`).join("")}
<!-- Fascia + seamless gutter (highlighted) -->
<rect x="76" y="206" width="428" height="10" fill="#e9e4d8"/>
<rect class="gutter-fill" x="72" y="214" width="436" height="16" rx="6" fill="${gutterColor}" stroke="#9aa3ad" stroke-width="1.5"/>
<rect x="72" y="214" width="436" height="5" rx="3" fill="#fff" opacity=".6"/>
<!-- Downspouts -->
<rect class="gutter-fill" x="76" y="228" width="12" height="192" rx="3" fill="${gutterColor}" stroke="#9aa3ad" stroke-width="1.2"/>
<rect class="gutter-fill" x="492" y="228" width="12" height="192" rx="3" fill="${gutterColor}" stroke="#9aa3ad" stroke-width="1.2"/>
<path class="gutter-fill" d="M88 414h30a6 6 0 0 1 0 12H88z" fill="${gutterColor}"/>
<path class="gutter-fill" d="M492 414h-30a6 6 0 0 0 0 12h30z" fill="${gutterColor}"/>
<!-- Water flow animation -->
<path class="flow" d="M82 232v180M498 232v180"/>
<path class="flow" d="M118 420c14 0 26 2 36 6M462 420c-14 0-26 2-36 6"/>
<!-- Shrubs -->
<g fill="#2e9c66"><ellipse cx="160" cy="418" rx="34" ry="18"/><ellipse cx="420" cy="418" rx="34" ry="18"/><ellipse cx="200" cy="420" rx="26" ry="14"/><ellipse cx="380" cy="420" rx="26" ry="14"/></g>
<!-- Callout label on gutter -->
<g transform="translate(290 150)"><rect x="-86" y="-16" width="172" height="32" rx="16" fill="#071a33" opacity=".85"/><text x="0" y="5" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#7fe3d7">6" SEAMLESS · NO LEAKS</text></g>
</g>
</svg>`;

// Before/after: same house, sagging/overflowing sectional gutters vs new seamless.
const baBase = (inner, bg) => `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="bg${bg}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${bg === "a" ? "#7a8da3" : "#4fb0e8"}"/><stop offset="1" stop-color="${bg === "a" ? "#b9c3cf" : "#bfe6ff"}"/></linearGradient></defs>
<rect width="640" height="400" fill="url(#bg${bg})"/>
<rect x="0" y="340" width="640" height="60" fill="${bg === "a" ? "#6c7f5a" : "#3fa36b"}"/>
<rect x="100" y="170" width="440" height="170" fill="#efe9dc" stroke="#cfc6b4" stroke-width="2"/>
<rect x="290" y="250" width="60" height="90" fill="#3b2a1d"/>
<g fill="#8fd2f5" stroke="#fff" stroke-width="4"><rect x="140" y="205" width="80" height="60"/><rect x="420" y="205" width="80" height="60"/></g>
<path d="M70 172 320 60l250 112z" fill="#9b4a2e"/>
${inner}
</svg>`;

export const beforeSvg = baBase(`
<!-- sagging sectional gutters with gaps, leaks and debris -->
<path d="M66 176h150l10 8h60l-6-6h110l8 10h140" stroke="#8d8d85" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M66 176h150l10 8h60l-6-6h110l8 10h140" stroke="#5f5f58" stroke-width="2" fill="none" opacity=".6"/>
<g fill="#6b5a2d"><ellipse cx="150" cy="172" rx="22" ry="7"/><ellipse cx="300" cy="178" rx="26" ry="7"/><ellipse cx="470" cy="183" rx="24" ry="7"/></g>
<g fill="#4fb0e8" opacity=".8"><path d="M226 184c0 8 10 30 12 60-6-18-14-40-12-60z"/><path d="M380 180c0 8 10 30 12 60-6-18-14-40-12-60z"/><path d="M538 190c0 8 10 30 12 60-6-18-14-40-12-60z"/></g>
<path d="M226 190c0 50 0 100-4 150" stroke="#4fb0e8" stroke-width="3" stroke-dasharray="4 6" fill="none"/>
<path d="M380 186c0 50 0 100 0 154" stroke="#4fb0e8" stroke-width="3" stroke-dasharray="4 6" fill="none"/>
<rect x="100" y="176" width="440" height="20" fill="#000" opacity=".12"/>
<path d="M240 190c-8 20-10 60-8 150M400 186c6 30 2 80 4 154" stroke="#a7a39a" stroke-width="2" opacity=".5"/>
<text x="320" y="382" text-anchor="middle" font-family="system-ui" font-size="14" fill="#fff" font-weight="700">Sagging · Leaking seams · Overflowing</text>`, "a");

export const afterSvg = baBase(`
<rect x="64" y="172" width="512" height="14" rx="6" fill="#f3f3f0" stroke="#9aa3ad" stroke-width="1.5"/>
<rect x="64" y="172" width="512" height="4" rx="2" fill="#fff" opacity=".7"/>
<rect x="70" y="184" width="10" height="156" rx="3" fill="#f3f3f0" stroke="#9aa3ad"/>
<rect x="560" y="184" width="10" height="156" rx="3" fill="#f3f3f0" stroke="#9aa3ad"/>
<path d="M80 334h26a5 5 0 0 1 0 10H80zM560 334h-26a5 5 0 0 0 0 10h26z" fill="#f3f3f0"/>
<path d="M75 188v146M565 188v146" stroke="#19c3b1" stroke-width="3" stroke-dasharray="8 10" fill="none"/>
<text x="320" y="382" text-anchor="middle" font-family="system-ui" font-size="14" fill="#fff" font-weight="700">Seamless · Pitched · Oversized downspouts</text>`, "b");

// Color-picker preview house (gutter + downspout use class gutter-fill)
export const previewHouse = (hex = "#f3f3f0") => `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="House preview showing selected gutter color">
<defs><linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#5fb0ea"/><stop offset="1" stop-color="#d9efff"/></linearGradient></defs>
<rect width="640" height="400" fill="url(#pbg)"/>
<rect x="0" y="340" width="640" height="60" fill="#3fa36b"/>
<rect x="100" y="170" width="440" height="170" fill="#e8e2d3" stroke="#cfc6b4" stroke-width="2"/>
<rect x="290" y="250" width="60" height="90" fill="#4a3a2c"/>
<g fill="#8fd2f5" stroke="#fff" stroke-width="4"><rect x="140" y="205" width="80" height="60"/><rect x="420" y="205" width="80" height="60"/></g>
<path d="M70 172 320 60l250 112z" fill="#4b4f54"/>
<rect x="66" y="166" width="508" height="8" fill="#f5f2ea"/>
<rect class="gutter-fill" x="62" y="172" width="516" height="16" rx="6" fill="${hex}" stroke="#7d868f" stroke-width="1.5"/>
<rect class="gutter-fill" x="68" y="186" width="12" height="154" rx="3" fill="${hex}" stroke="#7d868f"/>
<rect class="gutter-fill" x="560" y="186" width="12" height="154" rx="3" fill="${hex}" stroke="#7d868f"/>
<path class="gutter-fill" d="M80 334h28a5 5 0 0 1 0 10H80zM560 334h-28a5 5 0 0 0 0 10h28z" fill="${hex}"/>
</svg>`;

// Palm Beach County service-area map (stylized coastline + pins).
// Pins positioned via simple lat/lng projection into the viewBox.
export function areaMap(cities) {
  const latMin = 26.3, latMax = 26.98, lngMin = -80.35, lngMax = -79.98;
  const W = 640, H = 560;
  const px = (lng) => ((lng - lngMin) / (lngMax - lngMin)) * (W - 80) + 40;
  const py = (lat) => H - (((lat - latMin) / (latMax - latMin)) * (H - 80) + 40);
  const pins = cities.map((c) => {
    const x = px(c.lng).toFixed(1), y = py(c.lat).toFixed(1);
    const anchor = c.lng > -80.12 ? "end" : "start", tx = c.lng > -80.12 ? -12 : 12;
    return `<g class="pin${c.hq ? " is-hq" : ""}" data-city="${c.slug}" transform="translate(${x} ${y})" tabindex="0" role="link" aria-label="Gutter services in ${c.name}">
      <circle class="ring" r="6" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0"/>
      <circle class="dot" r="${c.hq ? 9 : 7}" fill="${c.hq ? "#ff6b35" : "#19c3b1"}" stroke="#fff" stroke-width="2.5"/>
      <text x="${tx}" y="4" text-anchor="${anchor}">${c.name}${c.hq ? " (HQ)" : ""}</text></g>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Ocean1Gutters service area across Palm Beach County">
<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0v32" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern>
<linearGradient id="ocean" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#1b6ca8"/><stop offset="1" stop-color="#2f8fd6"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#grid)"/>
<!-- Atlantic coastline -->
<path d="M${px(-80.03)} 0 C ${px(-80.05)} 140, ${px(-80.07)} 300, ${px(-80.04)} 420 S ${px(-80.07)} 520, ${px(-80.05)} ${H} L ${W} ${H} L ${W} 0 Z" fill="url(#ocean)" opacity=".9"/>
<text x="${W - 30}" y="${H / 2}" text-anchor="end" font-family="system-ui" font-size="13" font-weight="700" fill="#bfe6ff" letter-spacing="3" transform="rotate(90 ${W - 30} ${H / 2})">ATLANTIC OCEAN</text>
<!-- I-95 / Turnpike hint lines -->
<path d="M${px(-80.09)} 0 V ${H}" stroke="#fff" stroke-opacity=".18" stroke-width="3" stroke-dasharray="2 10"/>
<path d="M${px(-80.17)} 0 V ${H}" stroke="#fff" stroke-opacity=".12" stroke-width="2" stroke-dasharray="2 10"/>
<text x="${px(-80.3)}" y="40" font-family="system-ui" font-size="12" font-weight="700" fill="#8fa6bf" letter-spacing="2">PALM BEACH COUNTY</text>
${pins}
</svg>`;
}

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const imgDir = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "img");
// Drop a photo named <slot>.jpg / .webp / .png into site/assets/img and rebuild: it replaces the placeholder.
export function placeholderPhoto(label, slot, alt = "") {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (existsSync(join(imgDir, `${slot}.${ext}`))) return `<img src="/assets/img/${slot}.${ext}" alt="${alt || label}" loading="lazy" width="1200" height="900">`;
  }
  return `<!--IMG:${slot}--><div class="media__ph"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>${label}</div></div>`;
}

// Use a real photo for a slot if present, otherwise the given SVG fallback.
export function photoOr(slot, fallbackSvg, alt) {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (existsSync(join(imgDir, `${slot}.${ext}`))) return `<img src="/assets/img/${slot}.${ext}" alt="${alt}" loading="lazy" width="1280" height="800">`;
  }
  return `<!--IMG:${slot}-->` + fallbackSvg;
}
