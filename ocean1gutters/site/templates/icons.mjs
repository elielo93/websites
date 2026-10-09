// Inline SVG icon set (stroke-based, 24px grid). Returns markup strings.
const wrap = (paths, attrs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${paths}</svg>`;

export const icons = {
  phone: wrap('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/>'),
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>`,
  mail: wrap('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
  pin: wrap('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
  clock: wrap('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  check: wrap('<path d="M20 6 9 17l-5-5"/>'),
  checkCircle: wrap('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
  shield: wrap('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`,
  chevron: wrap('<path d="m6 9 6 6 6-6"/>'),
  arrow: wrap('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  arrowLeft: wrap('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
  bolt: wrap('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>'),
  award: wrap('<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>'),
  home: wrap('<path d="m3 11 9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>'),
  calendar: wrap('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  camera: wrap('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'),
  droplet: wrap('<path d="M12 2.7 6.3 8.4a8 8 0 1 0 11.4 0z"/>'),
  ruler: wrap('<path d="m3 17 14-14 4 4L7 21z"/><path d="m7 9 2 2M10 6l2 2M13 3l2 2M4 12l2 2"/>'),
  tag: wrap('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>'),
  users: wrap('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>`,
  instagram: wrap('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>'),
  google: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path d="M6.4 13.9A6 6 0 0 1 6.4 10V7.5H3.1a10 10 0 0 0 0 9z"/><path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6c.8-2.4 3-4.2 5.6-4.2z"/></svg>`,
  yelp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.5 2.3c.5-.3 1.2 0 1.3.6l.6 8.3c0 .7-.8 1.1-1.3.6L5.9 6.6c-.4-.4-.3-1.1.2-1.4zm2.2 12.1 4.6 5.9c.4.5.1 1.2-.5 1.3l-2.6.4c-.6.1-1.1-.4-1.1-1l-.4-6c0-.8 1-1.2 1.5-.6h-1.5zm-1.3-.8-5.7 3c-.5.3-1.2 0-1.3-.6l-.4-2.6c-.1-.6.4-1.1 1-1.1l6 .1c.8 0 1.1 1 .4 1.2zm1.9-1.2 5.4-3.5c.5-.3 1.2 0 1.3.6l.4 2.6c.1.6-.4 1.1-1 1.1l-6-.1c-.8 0-1.1-1-.4-1.3l.3.6z"/></svg>`,
  // Service icons
  install: wrap('<path d="M3 10h18"/><path d="M3 10v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2"/><path d="M18 15v6"/><path d="m2 10 10-7 10 7"/>'),
  repair: wrap('<path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9z"/><path d="m14.7 6.3 3-3"/><path d="M3 3l4 4"/>'),
  clean: wrap('<path d="M3 11h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="m8 7 2-4M14 7l2-4M11 7V3"/><path d="M12 17v4"/>'),
  guard: wrap('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 12h8M8 9h8M8 15h8"/>'),
  copper: wrap('<path d="M4 8h16v3a8 8 0 0 1-16 0z"/><path d="M12 19v3"/><path d="M2 8c3-3 17-3 20 0"/>'),
  ladder: wrap('<path d="M7 2v20M17 2v20M7 7h10M7 12h10M7 17h10"/>'),
  truck: wrap('<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
  dollar: wrap('<path d="M12 2v20"/><path d="M17 6.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
  leaf: wrap('<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.4 20 5 22 2c-1 2-1 10-3 13-1.6 2.4-4.4 4.4-8 5z"/><path d="M2 21c0-3 1.9-5.5 5-7"/>'),
  sun: wrap('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  image: wrap('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
  doc: wrap('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'),
};

export const starRow = (n = 5) => `<span class="stars" aria-label="${n} out of 5 stars">${icons.star.repeat(n)}</span>`;
