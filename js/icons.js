// One icon set for the whole app: simple line icons drawn as inline SVG (works offline, follows the text colour).
// Use R2O.icon('name') in markup. Decorative icons are hidden from screen readers; the text beside them says it.
(() => {
  const P = {
    road: '<path d="M8 21 11 3M16 21 13 3"/><path d="M12 6v2M12 11v2M12 16v2"/>',
    flame: '<path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8Z"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    chat: '<path d="M5 5h14v10H10l-4 4v-4H5Z"/><path d="M9 9h6M9 12h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    play: '<path d="M8 5v14l11-7Z"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="M14 6l4 4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.7l6.2-.9Z"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    next: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    speaker: '<path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
    hand: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6 7s-5-2-6.5-5L3 13a1.5 1.5 0 0 1 2.5-1.5L8 14"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19V5M8 7h7"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    save: '<path d="M5 4h11l3 3v13H5Z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.2-5 6.5-5s5.7 1.5 6.5 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.6 5"/>'
  };
  R2O.icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[name] || ''}</svg>`;
  // The logo: a road running to the horizon, inside a road-sign tile
  R2O.logo = (cls = '') => `<svg class="logo-mark ${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="8" fill="var(--brand)"/><path d="M9 28 14.5 6h3L23 28Z" fill="var(--brand-ink)" opacity=".92"/><path d="M16 9v3M16 15v3.5M16 22v4" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  // Subjects get a short typographic badge instead of an emoji
  R2O.badge = s => `<span class="sbadge" style="--sc:${s.color}" aria-hidden="true">${s.mono || s.short.slice(0, 2)}</span>`;
  // Fill the static header and menu (index.html marks the spots with data-ic)
  if (typeof document !== 'undefined') document.querySelectorAll('[data-ic]').forEach(el => { el.outerHTML = R2O.icon(el.dataset.ic); });
})();
