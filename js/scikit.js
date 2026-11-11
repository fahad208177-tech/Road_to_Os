// Science kit: pictures (SVG) and question helpers shared by Physics, Chemistry and Biology.
// Every picture is drawn from numbers, so explorers can redraw it as a slider moves.
(() => {
  const K = R2O.K, G = R2O.GEN = R2O.GEN || {};
  const S = R2O.SCI = {};
  const n = K.n, r1 = x => K.round(x, 1);

  // ---------- question helpers ----------
  // A bank of multiple-choice questions, served in a shuffled cycle so repeats are rare.
  // items: [{ q, a, w: [wrong answers], why, pic, hint }]
  S.bank = (id, items) => {
    let order = [], at = 0;
    G[id] = () => {
      if (at >= order.length) { order = K.shuffle(items.map((_, i) => i)); at = 0; }
      const it = items[order[at++]];
      return { kind: 'mcq', q: `<p>${it.q}</p>${it.pic || ''}`, choices: K.mcq(it.a, it.w), a: it.a, hint: it.hint, steps: it.why ? [it.why] : undefined };
    };
    return id;
  };
  // A numeric answer: exact if it is a tidy number, otherwise accept 3 significant figures.
  // Tidy but long (63.62) also accepts the usual exam rounding to 3 s.f. (63.6).
  S.num = (q, v, unit, steps, hint) => {
    const tidy = Math.abs(v - K.round(v, 2)) < 1e-9 && Math.abs(v) < 1e7;
    const long = tidy && K.sf(v, 3) !== K.round(v, 2);
    return Object.assign({ kind: 'num', q, unit, steps, hint }, tidy && !long ? { a: K.round(v, 2) } : long ? { a: K.round(v, 2), tol: K.acc3(v).tol, show: K.n(K.round(v, 2)) } : K.acc3(v));
  };
  S.idea = t => `<div class="idea">${t}</div>`; // the idea opens the step itself, no label above it
  S.X = (controls, draw) => ({ type: 'explore', controls, draw });
  S.eq = (t, sub) => `<p class="center bigq">${t}</p>${sub ? `<p class="center small muted">${sub}</p>` : ''}`;

  // ---------- drawing basics ----------
  const svg = (w, h, body, max) => `<svg class="viz sci" viewBox="0 0 ${w} ${h}" style="max-width:${max || w}px" role="img">${body}</svg>`;
  S.svg = svg;
  const arrow = (x1, y1, x2, y2, col = 'var(--c4)', w = 4) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), h = Math.min(12, L * .5);
    const bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${bx + 6 * Math.sin(a)},${by - 6 * Math.cos(a)} ${bx - 6 * Math.sin(a)},${by + 6 * Math.cos(a)}" fill="${col}"/>`;
  };
  S.arrow = arrow;
  const txt = (x, y, t, cls = 'lbl', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${t}</text>`;
  S.txt = txt;
  // seeded pseudo-random numbers so pictures look the same every time
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // ---------- forces on an object ----------
  // items: [{ d: 'up'|'down'|'left'|'right', m: size (N), l: label, c: colour }]
  S.forces = (items, o = {}) => {
    const cx = 160, cy = 110, k = o.k || 1.6;
    let b = `<rect x="${cx - 38}" y="${cy - 30}" width="76" height="60" rx="8" class="shape"/>${o.icon ? txt(cx, cy + 9, o.icon, 'lbl big') : ''}`;
    if (o.ground) b += `<line x1="20" y1="${cy + 30}" x2="300" y2="${cy + 30}" stroke="var(--muted)" stroke-width="3"/>`;
    items.forEach(f => {
      const L = 18 + f.m * k, c = f.c || 'var(--c4)';
      if (f.d === 'up') { b += arrow(cx, cy - 30, cx, cy - 30 - L, c); b += txt(cx + 8, cy - 36 - L, f.l, 'lbl', 'start'); }
      if (f.d === 'down') { b += arrow(cx, cy + 30, cx, cy + 30 + L, c); b += txt(cx + 8, cy + 42 + L * .5, f.l, 'lbl', 'start'); }
      if (f.d === 'right') { b += arrow(cx + 38, cy, cx + 38 + L, cy, c); b += txt(cx + 42 + L * .5, cy - 10, f.l); }
      if (f.d === 'left') { b += arrow(cx - 38, cy, cx - 38 - L, cy, c); b += txt(cx - 42 - L * .5, cy - 10, f.l); }
    });
    return svg(320, 230, b, 320);
  };

  // ---------- particles in solids, liquids and gases ----------
  // heat (0..1) makes them jiggle more; for a gas the particles spread out
  S.particles = (state, heat = .3, o = {}) => {
    const r = rng(state === 'solid' ? 7 : state === 'liquid' ? 11 : 23); let b = `<rect x="4" y="4" width="192" height="152" rx="10" fill="none" stroke="var(--line)" stroke-width="2"/>`;
    const pts = [];
    if (state === 'solid') for (let y = 0; y < 5; y++) for (let x = 0; x < 7; x++) pts.push([30 + x * 23, 132 - y * 23]);
    else if (state === 'liquid') { let x = 22, y = 136; for (let i = 0; i < 30; i++) { pts.push([x + r() * 6, y - r() * 5]); x += 24; if (x > 180) { x = 22 + r() * 12; y -= 21; } } }
    else for (let i = 0; i < 9; i++) pts.push([20 + r() * 160, 20 + r() * 120]);
    const jig = state === 'gas' ? 0 : 2 + heat * (state === 'solid' ? 5 : 8);
    pts.forEach(([x, y], i) => {
      const dx = (r() - .5) * 2 * jig, dy = (r() - .5) * 2 * jig;
      b += `<circle cx="${r1(x + dx)}" cy="${r1(y + dy)}" r="9" fill="var(--c${state === 'solid' ? 3 : state === 'liquid' ? 5 : 2})" opacity=".9"/>`;
      if (state === 'gas') { const a = r() * 6.28, L = 14 + heat * 26; b += arrow(x, y, r1(x + L * Math.cos(a)), r1(y + L * Math.sin(a)), 'var(--muted)', 2); }
    });
    if (o.label !== false) b += txt(100, 154, '', 'tick');
    return svg(200, 160, b, 220);
  };

  // ---------- waves ----------
  S.wave = (o = {}) => {
    const A = o.A ?? 30, lam = o.lam ?? 120, W = 320, H = 140, mid = 70; let d = '';
    for (let x = 0; x <= W; x += 3) d += (x ? 'L' : 'M') + x + ' ' + r1(mid - A * Math.sin(2 * Math.PI * x / lam + (o.phase || 0)));
    let b = `<line x1="0" y1="${mid}" x2="${W}" y2="${mid}" class="grid"/><path d="${d}" class="curve" stroke="var(--c5)"/>`;
    if (o.labels !== false) {
      const x0 = lam / 4;
      b += `<line x1="${x0}" y1="${mid - A}" x2="${x0 + lam}" y2="${mid - A}" stroke="var(--c4)" stroke-width="2" stroke-dasharray="4 3"/>` + txt(x0 + lam / 2, mid - A - 6, 'wavelength λ', 'lbl acc');
      b += `<line x1="${x0 + lam * .5}" y1="${mid}" x2="${x0 + lam * .5}" y2="${mid + A}" stroke="var(--c2)" stroke-width="3"/>` + txt(x0 + lam * .5 + 6, mid + A / 2 + 4, 'amplitude', 'lbl', 'start');
      b += txt(x0, mid - A - 22 > 8 ? mid - A - 22 : 12, 'crest', 'tick') + txt(x0 + lam / 2, Math.min(mid + A + 16, H - 4), 'trough', 'tick');
    }
    return svg(W, H, b);
  };
  // longitudinal wave: dots bunched in compressions
  S.longi = (lam = 80, amp = 9) => {
    let b = '';
    for (let i = 0; i < 46; i++) { const x0 = 8 + i * 6.8, x = x0 + amp * Math.sin(2 * Math.PI * x0 / lam); b += `<line x1="${r1(x)}" y1="20" x2="${r1(x)}" y2="80" stroke="var(--c3)" stroke-width="2.4"/>`; }
    b += txt(lam * .5 + 8, 98, 'compression', 'tick') + txt(lam + 8, 12, 'rarefaction', 'tick');
    return svg(320, 104, b);
  };

  // ---------- circuits ----------
  // symbols drawn centred at (x, y) on a horizontal wire
  const sym = (t, x, y, lab) => {
    let s = `<rect x="${x - 22}" y="${y - 14}" width="44" height="28" fill="var(--surface)" stroke="none"/>`;
    if (t === 'cell') s += `<line x1="${x - 4}" y1="${y - 14}" x2="${x - 4}" y2="${y + 14}" class="thin" stroke-width="2.5"/><line x1="${x + 4}" y1="${y - 7}" x2="${x + 4}" y2="${y + 7}" class="thin" stroke-width="5"/><line x1="${x - 22}" y1="${y}" x2="${x - 4}" y2="${y}" class="thin"/><line x1="${x + 4}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (t === 'lamp') s += `<circle cx="${x}" cy="${y}" r="11" fill="var(--surface)" class="thin"/><line x1="${x - 8}" y1="${y - 8}" x2="${x + 8}" y2="${y + 8}" class="thin"/><line x1="${x - 8}" y1="${y + 8}" x2="${x + 8}" y2="${y - 8}" class="thin"/><line x1="${x - 22}" y1="${y}" x2="${x - 11}" y2="${y}" class="thin"/><line x1="${x + 11}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (t === 'res' || t === 'ldr' || t === 'therm') s += `<rect x="${x - 15}" y="${y - 7}" width="30" height="14" fill="var(--surface)" class="thin"/><line x1="${x - 22}" y1="${y}" x2="${x - 15}" y2="${y}" class="thin"/><line x1="${x + 15}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (t === 'ldr') s += `<circle cx="${x}" cy="${y}" r="17" fill="none" class="thin"/>${arrow(x - 26, y - 26, x - 12, y - 12, 'var(--c2)', 2)}`;
    if (t === 'therm') s += `<line x1="${x - 16}" y1="${y + 12}" x2="${x + 12}" y2="${y - 12}" class="thin"/><line x1="${x - 16}" y1="${y + 12}" x2="${x - 22}" y2="${y + 12}" class="thin"/>`;
    if (t === 'A' || t === 'V') s += `<circle cx="${x}" cy="${y}" r="12" fill="var(--surface)" class="thin"/>${txt(x, y + 5, t, 'lbl')}<line x1="${x - 22}" y1="${y}" x2="${x - 12}" y2="${y}" class="thin"/><line x1="${x + 12}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (t === 'sw') s += `<circle cx="${x - 12}" cy="${y}" r="3" class="dot"/><circle cx="${x + 12}" cy="${y}" r="3" class="dot"/><line x1="${x - 12}" y1="${y}" x2="${x + 10}" y2="${y - 12}" class="thin"/><line x1="${x - 22}" y1="${y}" x2="${x - 12}" y2="${y}" class="thin"/><line x1="${x + 12}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (t === 'diode') s += `<polygon points="${x - 8},${y - 9} ${x - 8},${y + 9} ${x + 7},${y}" fill="var(--surface)" class="thin"/><line x1="${x + 7}" y1="${y - 9}" x2="${x + 7}" y2="${y + 9}" class="thin"/><line x1="${x - 22}" y1="${y}" x2="${x - 8}" y2="${y}" class="thin"/><line x1="${x + 7}" y1="${y}" x2="${x + 22}" y2="${y}" class="thin"/>`;
    if (lab) s += txt(x, y - 20, lab, 'tick');
    return s;
  };
  S.sym = sym;
  // a single loop: the cell on the bottom wire, parts spread along the top wire
  S.series = (parts, o = {}) => {
    const W = 320, H = 170, top = 40, bot = 140, l = 30, r = 290;
    let b = `<polyline points="${l},${bot} ${l},${top} ${r},${top} ${r},${bot} ${l},${bot}" class="thin"/>`;
    parts.forEach((p, i) => { const x = l + (r - l) * (i + 1) / (parts.length + 1); b += sym(p.t, x, top, p.l); });
    b += sym(o.cell || 'cell', (l + r) / 2, bot, o.cellLabel || '');
    if (o.I != null) b += arrow(l, bot - 40, l, top + 30, 'var(--c4)', 3) + txt(l + 8, (top + bot) / 2, 'I = ' + o.I, 'lbl acc', 'start');
    return svg(W, H, b);
  };
  // two branches in parallel, the cell on the bottom wire
  S.parallel = (b1, b2, o = {}) => {
    const W = 320, H = 210, y1 = 30, y2 = 95, bot = 180, l = 40, r = 280;
    let b = `<polyline points="${l},${bot} ${l},${y1} ${r},${y1} ${r},${bot} ${l},${bot}" class="thin"/><line x1="${l}" y1="${y2}" x2="${r}" y2="${y2}" class="thin"/>`;
    [[b1, y1], [b2, y2]].forEach(([parts, y]) => parts.forEach((p, i) => { b += sym(p.t, l + (r - l) * (i + 1) / (parts.length + 1), y, p.l); }));
    b += `<circle cx="${l}" cy="${y2}" r="4" class="dot"/><circle cx="${r}" cy="${y2}" r="4" class="dot"/>`;
    b += sym(o.cell || 'cell', (l + r) / 2, bot, o.cellLabel || '');
    return svg(W, H, b);
  };

  // k identical components, each on its own parallel branch
  S.ladder = (k, t, cellLabel) => {
    const W = 320, l = 40, r = 280, gap = 44, top = 24, bot = top + gap * k + 20;
    let b = `<polyline points="${l},${bot} ${l},${top} ${r},${top} ${r},${bot} ${l},${bot}" class="thin"/>`;
    for (let i = 0; i < k; i++) { const y = top + gap * i; if (i) b += `<line x1="${l}" y1="${y}" x2="${r}" y2="${y}" class="thin"/><circle cx="${l}" cy="${y}" r="4" class="dot"/><circle cx="${r}" cy="${y}" r="4" class="dot"/>`; b += sym(t, (l + r) / 2, y); }
    b += sym('cell', (l + r) / 2, bot, cellLabel || '');
    return svg(W, bot + 20, b);
  };
  // ---------- light ----------
  // reflection: angle i measured from the normal; mirror horizontal at the bottom
  S.reflect = (i) => {
    const cx = 160, cy = 150, L = 120, a = i * Math.PI / 180;
    const sx = cx - L * Math.sin(a), sy = cy - L * Math.cos(a), ex = cx + L * Math.sin(a), ey = sy;
    return svg(320, 180, `<line x1="30" y1="${cy}" x2="290" y2="${cy}" stroke="var(--c5)" stroke-width="5"/><line x1="${cx}" y1="${cy}" x2="${cx}" y2="20" stroke="var(--muted)" stroke-dasharray="5 4" stroke-width="2"/>
      ${txt(cx, 14, 'normal', 'tick')}${arrow(r1(sx), r1(sy), cx, cy, 'var(--c2)', 3)}${arrow(cx, cy, r1(ex), r1(ey), 'var(--c2)', 3)}
      ${txt(cx - 26, cy - 50, i + '°', 'lbl acc')}${txt(cx + 26, cy - 50, i + '°', 'lbl acc')}${txt(cx - 60, cy - 70, 'i', 'lbl')}${txt(cx + 60, cy - 70, 'r', 'lbl')}${txt(260, cy + 20, 'mirror', 'tick')}`);
  };
  // refraction from air into a block with refractive index nIdx
  S.refract = (i, nIdx = 1.5) => {
    const cx = 160, cy = 100, a = i * Math.PI / 180, rr = Math.asin(Math.sin(a) / nIdx), L = 95;
    const sx = cx - L * Math.sin(a), sy = cy - L * Math.cos(a), ex = cx + L * Math.sin(rr), ey = cy + L * Math.cos(rr);
    return svg(320, 200, `<rect x="20" y="${cy}" width="280" height="95" fill="color-mix(in srgb, var(--c5) 18%, transparent)"/>
      <line x1="${cx}" y1="5" x2="${cx}" y2="195" stroke="var(--muted)" stroke-dasharray="5 4" stroke-width="2"/>
      ${arrow(r1(sx), r1(sy), cx, cy, 'var(--c2)', 3)}${arrow(cx, cy, r1(ex), r1(ey), 'var(--c2)', 3)}
      ${txt(40, 30, 'air', 'tick', 'start')}${txt(40, cy + 22, 'glass', 'tick', 'start')}${txt(cx - 22, cy - 34, 'i = ' + i + '°', 'lbl acc', 'end')}${txt(cx + 18, cy + 44, 'r = ' + r1(rr * 180 / Math.PI) + '°', 'lbl acc', 'start')}`);
  };
  // converging lens ray diagram. u = object distance, f = focal length (both in cm, drawn ×4)
  S.lens = (u, f, h = 5) => {
    const k = 6, ax = 110, cx = 170; const v = 1 / (1 / f - 1 / u), m = v / u; // v < 0 means a virtual image
    const X = d => cx + d * k, Y = y => ax - y * k;
    const ox = X(-u), oy = Y(h), ix = X(v), iy = Y(-m * h);
    let b = `<line x1="0" y1="${ax}" x2="340" y2="${ax}" class="grid"/><ellipse cx="${cx}" cy="${ax}" rx="7" ry="80" fill="color-mix(in srgb, var(--c5) 25%, transparent)" stroke="var(--c5)" stroke-width="2"/>
      <circle cx="${X(-f)}" cy="${ax}" r="3" class="dot"/><circle cx="${X(f)}" cy="${ax}" r="3" class="dot"/>${txt(X(f), ax + 16, 'F', 'tick')}${txt(X(-f), ax + 16, 'F', 'tick')}
      ${arrow(ox, ax, ox, oy, 'var(--c1)', 4)}`;
    const clip = (x1, y1, x2, y2) => { const t = (x2 - x1) ? Math.min(1, (x1 < x2 ? 340 - x1 : -x1) / (x2 - x1)) : 1; return [r1(x1 + (x2 - x1) * t), r1(y1 + (y2 - y1) * t)]; };
    // ray 1: parallel then through F; ray 2: through the centre
    b += `<line x1="${ox}" y1="${oy}" x2="${cx}" y2="${oy}" stroke="var(--c2)" stroke-width="2"/>`;
    const p1 = clip(cx, oy, X(f), ax); const p1b = [r1(cx + (p1[0] - cx) * 3), r1(oy + (p1[1] - oy) * 3)];
    b += `<line x1="${cx}" y1="${oy}" x2="${p1b[0]}" y2="${p1b[1]}" stroke="var(--c2)" stroke-width="2"/>`;
    const p2 = [r1(cx + (cx - ox) * 3), r1(ax + (ax - oy) * 3)];
    b += `<line x1="${ox}" y1="${oy}" x2="${p2[0]}" y2="${p2[1]}" stroke="var(--c2)" stroke-width="2"/>`;
    if (isFinite(v) && Math.abs(v) < 60) {
      if (v < 0) b += `<line x1="${cx}" y1="${oy}" x2="${ix}" y2="${iy}" stroke="var(--c2)" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="${ox}" y1="${oy}" x2="${ix}" y2="${iy}" stroke="var(--c2)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
      b += `<line x1="${ix}" y1="${ax}" x2="${ix}" y2="${iy}" stroke="var(--c4)" stroke-width="4" ${v < 0 ? 'stroke-dasharray="6 4"' : ''}/>`;
    }
    return { svg: svg(340, 220, b), v, m };
  };

  // ---------- springs, levers, atoms ----------
  S.spring = (ext, load) => {
    const top = 14, L = 70 + ext * 6, coils = 10; let d = `M150 ${top} L150 ${top + 10}`;
    for (let i = 0; i < coils; i++) { const y = top + 10 + (L - 20) * (i + .5) / coils; d += ` L${i % 2 ? 136 : 164} ${r1(y)}`; }
    d += ` L150 ${top + L - 10} L150 ${top + L}`;
    return svg(300, 240, `<line x1="90" y1="${top}" x2="210" y2="${top}" stroke="var(--text)" stroke-width="6"/><path d="${d}" fill="none" stroke="var(--c3)" stroke-width="3"/>
      ${load ? `<rect x="128" y="${top + L}" width="44" height="34" rx="5" class="shape"/>${txt(150, top + L + 22, load, 'lbl')}` : ''}
      <line x1="230" y1="${top + 70}" x2="230" y2="${top + L}" stroke="var(--c4)" stroke-width="3"/>${txt(238, top + 70 + (L - 70) / 2 + 4, ext ? 'extension ' + n(ext) + ' cm' : '', 'lbl acc', 'start')}`, 300);
  };
  // see-saw: left/right = { F (N), d (m) }; drawn with the pivot in the middle (beam 2 m each side)
  S.beam = (left, right, o = {}) => {
    const px = 160, py = 110, k = 60, tilt = o.tilt || 0;
    const ang = tilt * Math.PI / 180, ex = d => r1(px + d * k * Math.cos(ang)), ey = d => r1(py + d * k * Math.sin(ang));
    let b = `<polygon points="${px},${py + 4} ${px - 16},${py + 34} ${px + 16},${py + 34}" fill="var(--c2)"/><line x1="${ex(-2.2)}" y1="${ey(-2.2)}" x2="${ex(2.2)}" y2="${ey(2.2)}" stroke="var(--text)" stroke-width="7" stroke-linecap="round"/>`;
    [[left, -1], [right, 1]].forEach(([s, sg]) => { if (!s) return; const x = ex(sg * Math.min(s.d, 2.1)), y = ey(sg * Math.min(s.d, 2.1)); b += arrow(x, y - 6 - Math.min(60, 14 + s.F * .6), x, y - 4, 'var(--c4)', 4) + txt(x, y - 14 - Math.min(60, 14 + s.F * .6), (s.l || s.F + ' N'), 'lbl') + txt(x, y + 22, s.dl || (s.d + ' m'), 'tick'); });
    return svg(320, 160, b);
  };
  // Bohr-style atom: Z protons, N neutrons, electrons in shells of 2, 8, 8
  S.atom = (Z, N, o = {}) => {
    const r = rng(Z * 31 + N); let b = '';
    const tot = Z + N, R = 8 + Math.sqrt(tot) * 5;
    for (let i = 0; i < tot; i++) { const a = r() * 6.28, d = Math.sqrt(r()) * (R - 6); b += `<circle cx="${r1(100 + d * Math.cos(a))}" cy="${r1(100 + d * Math.sin(a))}" r="6" fill="${i < Z ? 'var(--c4)' : 'var(--muted)'}" stroke="var(--surface)"/>`; }
    if (o.electrons !== false) { let left = Z; [38, 62, 86].forEach((rad, s) => { if (left <= 0) return; const k = Math.min(left, s ? 8 : 2); left -= k; b = `<circle cx="100" cy="100" r="${rad}" fill="none" stroke="var(--line)" stroke-width="2"/>` + b; for (let j = 0; j < k; j++) { const a = j / k * 6.28 + s; b += `<circle cx="${r1(100 + rad * Math.cos(a))}" cy="${r1(100 + rad * Math.sin(a))}" r="5" fill="var(--c5)"/>`; } }); }
    return svg(200, 200, b, 200);
  };
  // the electromagnetic spectrum, optionally highlighting one region
  S.EM = ['Radio waves', 'Microwaves', 'Infrared', 'Visible light', 'Ultraviolet', 'X-rays', 'Gamma rays'];
  S.spectrum = (hi = -1) => {
    const cols = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'];
    let b = ''; S.EM.forEach((t, i) => { b += `<rect x="${5 + i * 44}" y="30" width="42" height="44" rx="5" fill="${cols[i]}" opacity="${hi < 0 || hi === i ? .9 : .25}"/>${txt(26 + i * 44, 92, ['Radio', 'Micro', 'IR', 'Visible', 'UV', 'X-ray', 'Gamma'][i], 'tick')}`; });
    b += arrow(30, 16, 290, 16, 'var(--text)', 2) + txt(160, 11, 'frequency increases, wavelength decreases →', 'tick');
    return svg(320, 100, b);
  };
  // oscilloscope screen: 10 × 8 squares, a sine trace of `cycles` across the screen and `amp` squares tall
  S.scope = (cycles, amp, o = {}) => {
    let b = '<rect x="0" y="0" width="300" height="240" rx="10" fill="#0b2a1f"/>';
    for (let i = 1; i < 10; i++) b += `<line x1="${i * 30}" y1="0" x2="${i * 30}" y2="240" stroke="#1f5a44" stroke-width="1"/>`;
    for (let j = 1; j < 8; j++) b += `<line x1="0" y1="${j * 30}" x2="300" y2="${j * 30}" stroke="#1f5a44" stroke-width="1"/>`;
    let d = ''; for (let x = 0; x <= 300; x += 2) d += (x ? 'L' : 'M') + x + ' ' + r1(120 - amp * 30 * Math.sin(2 * Math.PI * cycles * x / 300));
    b += `<path d="${d}" fill="none" stroke="#4ade80" stroke-width="3"/>`;
    return svg(300, 240, b, 280);
  };
  // energy stores as bars: [[name, joules], ...]
  S.stores = (rows, max) => {
    max = max || Math.max(...rows.map(x => x[1]), 1); let b = '';
    rows.forEach(([t, v], i) => { const w = 200 * v / max; b += txt(8, 26 + i * 30, t, 'lbl', 'start') + `<rect x="110" y="${12 + i * 30}" width="${r1(Math.max(w, 1))}" height="20" rx="4" fill="var(--c${i % 5 + 1})"/>` + txt(116 + w, 27 + i * 30, n(K.round(v, 1)) + ' J', 'tick', 'start'); });
    return svg(360, 20 + rows.length * 30, b);
  };
  // bar magnet with field lines from N to S
  S.magnet = () => {
    let b = '';
    [26, 48, 72].forEach(h => { b += `<path d="M100 90 C 100 ${90 - h * 1.6}, 220 ${90 - h * 1.6}, 220 90" fill="none" stroke="var(--c5)" stroke-width="2"/><path d="M100 110 C 100 ${110 + h * 1.6}, 220 ${110 + h * 1.6}, 220 110" fill="none" stroke="var(--c5)" stroke-width="2"/>`; });
    b += `<rect x="100" y="85" width="60" height="30" fill="#ef4444"/><rect x="160" y="85" width="60" height="30" fill="#3b82f6"/>${txt(130, 105, 'N', 'in')}${txt(190, 105, 'S', 'in')}`;
    [[160, 33], [160, 167]].forEach(([x, y], i) => { b += arrow(x - 8, y + (i ? 0 : 0), x + 10, y, 'var(--c5)', 2); });
    return svg(320, 200, b);
  };
  // a beaker of liquid with a depth marker (pressure grows with depth)
  S.tank = (depth) => {
    const top = 30, bot = 190, y = top + 10 + depth * 14;
    return svg(260, 200, `<rect x="40" y="${top}" width="140" height="${bot - top}" fill="color-mix(in srgb, var(--c5) 22%, transparent)" stroke="var(--text)" stroke-width="2"/>
      <circle cx="110" cy="${y}" r="7" fill="var(--c4)"/>${[0, 1, 2, 3].map(k => { const a = k * Math.PI / 2, L = 12 + depth * 2.2; return arrow(r1(110 + (L + 10) * Math.cos(a)), r1(y + (L + 10) * Math.sin(a)), r1(110 + 9 * Math.cos(a)), r1(y + 9 * Math.sin(a)), 'var(--c4)', 2.5); }).join('')}
      <line x1="200" y1="${top + 10}" x2="200" y2="${y}" stroke="var(--c2)" stroke-width="3"/>${txt(208, (top + 10 + y) / 2 + 4, 'h = ' + n(depth) + ' m', 'lbl', 'start')}`, 260);
  };
})();
