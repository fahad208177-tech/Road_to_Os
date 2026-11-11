// Shared helpers: random numbers, maths formatting and small SVG drawings.
// Everything is plain JS so the app works offline on a cheap phone.
window.R2O = window.R2O || {};
R2O.GEN = R2O.GEN || {};
R2O.WIDGETS = R2O.WIDGETS || {};
R2O.LESSONS = R2O.LESSONS || [];

const K = R2O.K = {};

// ---------- random ----------
K.rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
K.nz = (a, b) => { let v = 0; while (v === 0) v = K.rnd(a, b); return v; };
K.pick = arr => arr[Math.floor(Math.random() * arr.length)];
K.shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
K.gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
K.lcm = (a, b) => Math.abs(a * b) / K.gcd(a, b);
K.isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
K.round = (x, dp) => { const f = Math.pow(10, dp); return Math.round((x + Number.EPSILON) * f) / f; };
K.sf = (x, s) => { if (x === 0) return 0; const d = Math.ceil(Math.log10(Math.abs(x))); const f = Math.pow(10, s - d); return Math.round(x * f) / f; };

// Answers given "correct to 3 s.f." or "to n d.p.": accept any value that rounds correctly
// (or a more precise one). Returns fields to spread into a question: {a, tol, show}.
K.acc3 = (exact, unit) => {
  const mag = Math.floor(Math.log10(Math.abs(exact) || 1));
  return { a: exact, tol: 0.5 * Math.pow(10, mag - 2) * 1.0001 + 1e-12, show: K.n(K.sf(exact, 3)) + (unit ? ' ' + unit : '') };
};
K.accDP = (exact, dp, unit) => ({ a: exact, tol: 0.5 * Math.pow(10, -dp) * 1.0001 + 1e-12, show: K.n(K.round(exact, dp)) + (unit ? ' ' + unit : '') });

// ---------- formatting ----------
K.minus = s => String(s).replace(/-/g, '−');
K.n = x => { // tidy number: no float noise, real minus sign, thin-space thousands
  if (typeof x !== 'number') return x;
  let s = String(K.round(x, 10));
  if (s.includes('e')) return K.minus(s);
  const [i, d] = s.replace('-', '').split('.');
  const grouped = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : i;
  return (x < 0 ? '−' : '') + grouped + (d ? '.' + d : '');
};
K.fr = (a, b) => `<span class="fr"><span>${K.n(a)}</span><span>${K.n(b)}</span></span>`;
K.frs = (a, b) => { // simplified fraction html, sign out front
  const g = K.gcd(a, b) || 1; let p = a / g, q = b / g; if (q < 0) { p = -p; q = -q; }
  if (q === 1) return K.n(p);
  return (p < 0 ? '−' : '') + K.fr(Math.abs(p), q);
};
K.frText = (a, b) => { const g = K.gcd(a, b) || 1; let p = a / g, q = b / g; if (q < 0) { p = -p; q = -q; } return q === 1 ? String(p) : `${p}/${q}`; };
K.sup = (base, p) => `${base}<sup>${K.minus(p)}</sup>`;
K.sqrt = x => `√<span class="ov">${x}</span>`;
K.vec = (x, y) => `<span class="vec"><span>${K.n(x)}</span><span>${K.n(y)}</span></span>`;
// one algebra term with sign handling: term(3,'x',true) -> "3x", term(-1,'x') -> " − x"
K.term = (c, v = '', first = false) => {
  if (c === 0) return '';
  const abs = Math.abs(c);
  const body = (abs === 1 && v) ? v : K.n(abs) + v;
  if (first) return (c < 0 ? '−' : '') + body;
  return (c < 0 ? ' − ' : ' + ') + body;
};
K.poly = (coefs, v = 'x') => { // [a,b,c] -> ax² + bx + c
  const deg = coefs.length - 1; let out = ''; let first = true;
  coefs.forEach((c, i) => {
    const p = deg - i; if (c === 0) return;
    const vv = p === 0 ? '' : p === 1 ? v : v + '<sup>' + p + '</sup>';
    out += K.term(c, vv, first); first = false;
  });
  return out || '0';
};
K.bracket = (a, b, v = 'x') => `(${K.poly([a, b], v)})`;
K.money = x => '$' + x.toFixed(2);

// ---------- multiple choice ----------
K.mcq = (correct, wrongs) => {
  const seen = new Set([correct]); const opts = [correct];
  for (const w of wrongs) { if (opts.length >= 4) break; if (!seen.has(w)) { seen.add(w); opts.push(w); } }
  return K.shuffle(opts);
};

// ---------- SVG drawings ----------
const COLORS = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c5)'];
K.COLORS = COLORS;

// Bar model (Singapore method). bars: [{label, parts:[{n, text, color}] }]
K.barModel = (bars, opts = {}) => {
  const unitW = opts.unitW || 34, h = 34, gap = 18, left = 78;
  const maxUnits = Math.max(...bars.map(b => b.parts.reduce((s, p) => s + p.n, 0)));
  const W = left + maxUnits * unitW + 50, H = bars.length * (h + gap) + (opts.brace ? 34 : 10);
  let s = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="bar model">`;
  bars.forEach((b, bi) => {
    const y = 8 + bi * (h + gap); let x = left;
    s += `<text x="${left - 8}" y="${y + h / 2 + 5}" text-anchor="end" class="lbl">${b.label}</text>`;
    b.parts.forEach((p, pi) => {
      for (let u = 0; u < p.n; u++) {
        s += `<rect x="${x}" y="${y}" width="${unitW}" height="${h}" rx="3" fill="${p.color || COLORS[pi % 5]}" class="unit"/>`;
        x += unitW;
      }
      if (p.text) s += `<text x="${x - (p.n * unitW) / 2}" y="${y + h / 2 + 5}" text-anchor="middle" class="in">${p.text}</text>`;
    });
    if (b.right) s += `<text x="${x + 8}" y="${y + h / 2 + 5}" class="lbl">${b.right}</text>`;
  });
  if (opts.brace) {
    const y = bars.length * (h + gap) - 4, x2 = left + opts.brace.units * unitW;
    s += `<path d="M${left} ${y} q0 10 10 10 H${(left + x2) / 2 - 8} l8 8 l8 -8 H${x2 - 10} q10 0 10 -10" class="brace"/>`;
    s += `<text x="${(left + x2) / 2}" y="${y + 32}" text-anchor="middle" class="lbl">${opts.brace.text}</text>`;
  }
  return s + '</svg>';
};

// Fraction bar: n shaded out of d
K.fracBar = (n, d, color = 'var(--c1)') => {
  const W = 320, h = 40, w = W / d;
  let s = `<svg class="viz" viewBox="0 0 ${W + 4} ${h + 4}" role="img" aria-label="${n} out of ${d}">`;
  for (let i = 0; i < d; i++) s += `<rect x="${2 + i * w}" y="2" width="${w}" height="${h}" fill="${i < n ? color : 'var(--surface2)'}" class="unit"/>`;
  return s + '</svg>';
};

// Number line from a to b. marks: [{x, label, open, closed, color}], arrow: {from, to}
K.numberLine = (a, b, opts = {}) => {
  const W = 340, pad = 22, y = 40, step = opts.step || 1;
  const X = v => pad + (v - a) / (b - a) * (W - 2 * pad);
  let s = `<svg class="viz" viewBox="0 0 ${W} 76" role="img" aria-label="number line">`;
  s += `<line x1="6" y1="${y}" x2="${W - 6}" y2="${y}" class="axis" marker-end="url(#ar)" marker-start="url(#ar)"/>`;
  s += `<defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="arrowhead"/></marker></defs>`;
  for (let v = a; v <= b + 1e-9; v += step) {
    s += `<line x1="${X(v)}" y1="${y - 6}" x2="${X(v)}" y2="${y + 6}" class="axis"/>`;
    s += `<text x="${X(v)}" y="${y + 24}" text-anchor="middle" class="tick">${K.n(K.round(v, 4))}</text>`;
  }
  if (opts.range) {
    const r = opts.range, x1 = r.from === -Infinity ? 8 : X(r.from), x2 = r.to === Infinity ? W - 8 : X(r.to);
    s += `<line x1="${x1}" y1="${y - 14}" x2="${x2}" y2="${y - 14}" class="hl"/>`;
    if (r.from !== -Infinity) s += `<circle cx="${x1}" cy="${y - 14}" r="6" class="${r.fromClosed ? 'dotc' : 'doto'}"/>`;
    if (r.to !== Infinity) s += `<circle cx="${x2}" cy="${y - 14}" r="6" class="${r.toClosed ? 'dotc' : 'doto'}"/>`;
  }
  (opts.marks || []).forEach(m => {
    s += `<circle cx="${X(m.x)}" cy="${y}" r="6" fill="${m.color || 'var(--accent)'}"/>`;
    if (m.label) s += `<text x="${X(m.x)}" y="${y - 12}" text-anchor="middle" class="lbl">${m.label}</text>`;
  });
  if (opts.jump) {
    const j = opts.jump, x1 = X(j.from), x2 = X(j.to), mid = (x1 + x2) / 2;
    s += `<path d="M${x1} ${y - 4} Q${mid} ${y - 40} ${x2} ${y - 4}" class="jump" marker-end="url(#ar)"/>`;
    if (j.label) s += `<text x="${mid}" y="${y - 28}" text-anchor="middle" class="lbl">${j.label}</text>`;
  }
  return s + '</svg>';
};

// Graph plotter. fns: [{f, color, dash}], pts: [{x,y,label}], opts: {xmin,xmax,ymin,ymax,grid}
K.plot = (fns, pts = [], o = {}) => {
  const xmin = o.xmin ?? -6, xmax = o.xmax ?? 6, ymin = o.ymin ?? -6, ymax = o.ymax ?? 6;
  const W = o.w || 320, H = o.h || 320, pad = 4;
  const X = x => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
  const Y = y => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
  let s = `<svg class="viz plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="graph">`;
  const gs = o.gstep || 1;
  for (let x = Math.ceil(xmin / gs) * gs; x <= xmax; x += gs) s += `<line x1="${X(x)}" y1="${Y(ymin)}" x2="${X(x)}" y2="${Y(ymax)}" class="grid"/>`;
  for (let y = Math.ceil(ymin / gs) * gs; y <= ymax; y += gs) s += `<line x1="${X(xmin)}" y1="${Y(y)}" x2="${X(xmax)}" y2="${Y(y)}" class="grid"/>`;
  if (ymin <= 0 && ymax >= 0) s += `<line x1="${X(xmin)}" y1="${Y(0)}" x2="${X(xmax)}" y2="${Y(0)}" class="axis"/>`;
  if (xmin <= 0 && xmax >= 0) s += `<line x1="${X(0)}" y1="${Y(ymin)}" x2="${X(0)}" y2="${Y(ymax)}" class="axis"/>`;
  const ls = o.lstep || 2;
  for (let x = Math.ceil(xmin / ls) * ls; x <= xmax; x += ls) if (x !== 0) s += `<text x="${X(x)}" y="${Math.min(Math.max(Y(0) + 14, 12), H - 4)}" text-anchor="middle" class="tick">${K.n(x)}</text>`;
  for (let y = Math.ceil(ymin / ls) * ls; y <= ymax; y += ls) if (y !== 0) s += `<text x="${Math.min(Math.max(X(0) - 5, 18), W - 4)}" y="${Y(y) + 4}" text-anchor="end" class="tick">${K.n(y)}</text>`;
  fns.forEach((fn, i) => {
    let d = '', pen = false; const N = 240;
    for (let k = 0; k <= N; k++) {
      const x = xmin + (xmax - xmin) * k / N, y = fn.f(x);
      if (!isFinite(y) || y > ymax + (ymax - ymin) || y < ymin - (ymax - ymin)) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); pen = true;
    }
    s += `<path d="${d}" class="curve" stroke="${fn.color || COLORS[i % 5]}" ${fn.dash ? 'stroke-dasharray="6 5"' : ''}/>`;
  });
  (o.segs || []).forEach(sg => { s += `<polyline points="${sg.pts.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}" class="curve" stroke="${sg.color || 'var(--c1)'}"/>`; });
  pts.forEach(p => {
    s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="5" fill="${p.color || 'var(--accent)'}"/>`;
    if (p.label) s += `<text x="${X(p.x) + 8}" y="${Y(p.y) - 8}" class="lbl">${p.label}</text>`;
  });
  if (o.xlab) s += `<text x="${W - 8}" y="${Math.min(Y(0) - 6, H - 6)}" text-anchor="end" class="lbl">${o.xlab}</text>`;
  if (o.ylab) s += `<text x="${X(0) + 6}" y="14" class="lbl">${o.ylab}</text>`;
  return s + '</svg>';
};

// Right-angled triangle with labels {a: vertical, b: horizontal, c: hypotenuse, angle: label at bottom-left}
K.rightTri = (L = {}) => {
  let s = `<svg class="viz" viewBox="0 0 300 200" role="img" aria-label="right-angled triangle">`;
  s += `<polygon points="40,170 260,170 260,30" class="shape"/>`;
  s += `<polyline points="244,170 244,154 260,154" class="thin"/>`;
  if (L.angle) s += `<path d="M78 170 A38 38 0 0 0 72 150" class="thin"/><text x="86" y="160" class="lbl">${L.angle}</text>`;
  if (L.b) s += `<text x="150" y="192" text-anchor="middle" class="lbl">${L.b}</text>`;
  if (L.a) s += `<text x="270" y="105" class="lbl">${L.a}</text>`;
  if (L.c) s += `<text x="138" y="88" text-anchor="end" class="lbl">${L.c}</text>`;
  return s + '</svg>';
};

// General triangle with vertex labels and side/angle labels
K.triangle = (L = {}) => {
  const A = [40, 170], B = [270, 170], C = [L.apex || 120, 35];
  let s = `<svg class="viz" viewBox="0 0 310 200" role="img" aria-label="triangle">`;
  s += `<polygon points="${A} ${B} ${C}" class="shape"/>`;
  const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  if (L.A) s += `<text x="${A[0] - 18}" y="${A[1] + 6}" class="lbl">${L.A}</text>`;
  if (L.B) s += `<text x="${B[0] + 8}" y="${B[1] + 6}" class="lbl">${L.B}</text>`;
  if (L.C) s += `<text x="${C[0] - 5}" y="${C[1] - 10}" class="lbl">${L.C}</text>`;
  if (L.c) { const m = mid(A, B); s += `<text x="${m[0]}" y="${m[1] + 20}" text-anchor="middle" class="lbl">${L.c}</text>`; }
  if (L.a) { const m = mid(B, C); s += `<text x="${m[0] + 10}" y="${m[1]}" class="lbl">${L.a}</text>`; }
  if (L.b) { const m = mid(A, C); s += `<text x="${m[0] - 12}" y="${m[1]}" text-anchor="end" class="lbl">${L.b}</text>`; }
  if (L.angA) s += `<text x="${A[0] + 30}" y="${A[1] - 8}" class="lbl acc">${L.angA}</text>`;
  if (L.angB) s += `<text x="${B[0] - 52}" y="${B[1] - 8}" class="lbl acc">${L.angB}</text>`;
  if (L.angC) s += `<text x="${C[0] - 6}" y="${C[1] + 30}" class="lbl acc">${L.angC}</text>`;
  return s + '</svg>';
};

// Two-set Venn diagram with region counts/labels
K.venn = (L = {}) => {
  let s = `<svg class="viz" viewBox="0 0 320 200" role="img" aria-label="Venn diagram">`;
  s += `<rect x="4" y="4" width="312" height="192" rx="8" class="thin"/><text x="14" y="24" class="lbl">ℰ</text>`;
  s += `<circle cx="125" cy="105" r="70" class="setA"/><circle cx="195" cy="105" r="70" class="setB"/>`;
  s += `<text x="70" y="40" class="lbl">${L.A || 'A'}</text><text x="240" y="40" class="lbl">${L.B || 'B'}</text>`;
  if (L.a != null) s += `<text x="95" y="110" text-anchor="middle" class="lbl big">${L.a}</text>`;
  if (L.ab != null) s += `<text x="160" y="110" text-anchor="middle" class="lbl big">${L.ab}</text>`;
  if (L.b != null) s += `<text x="225" y="110" text-anchor="middle" class="lbl big">${L.b}</text>`;
  if (L.out != null) s += `<text x="290" y="182" text-anchor="middle" class="lbl big">${L.out}</text>`;
  return s + '</svg>';
};

// Pie chart. data: [{label, v}]
K.pie = data => {
  const tot = data.reduce((s, d) => s + d.v, 0); let a0 = -Math.PI / 2;
  let s = `<svg class="viz" viewBox="0 0 320 210" role="img" aria-label="pie chart">`;
  data.forEach((d, i) => {
    const a1 = a0 + d.v / tot * 2 * Math.PI, large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (a, r = 90) => [105 + r * Math.cos(a), 105 + r * Math.sin(a)];
    s += `<path d="M105 105 L${p(a0)} A90 90 0 ${large} 1 ${p(a1)} Z" fill="${COLORS[i % 5]}" class="slice"/>`;
    s += `<rect x="215" y="${30 + i * 26}" width="14" height="14" rx="3" fill="${COLORS[i % 5]}"/><text x="236" y="${42 + i * 26}" class="lbl">${d.label}</text>`;
    a0 = a1;
  });
  return s + '</svg>';
};

// Bar chart. data: [{label, v}]
K.bars = (data, o = {}) => {
  const max = o.max || Math.max(...data.map(d => d.v)), W = 320, H = 200, bw = Math.min(46, 240 / data.length - 10);
  let s = `<svg class="viz" viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="bar chart">`;
  const step = o.step || Math.ceil(max / 5);
  for (let v = 0; v <= max; v += step) { const y = H - v / max * (H - 20); s += `<line x1="40" y1="${y}" x2="${W - 4}" y2="${y}" class="grid"/><text x="34" y="${y + 4}" text-anchor="end" class="tick">${v}</text>`; }
  data.forEach((d, i) => {
    const x = 52 + i * (240 / data.length), h = d.v / max * (H - 20);
    s += `<rect x="${x}" y="${H - h}" width="${bw}" height="${h}" rx="3" fill="${COLORS[i % 5]}"/>`;
    s += `<text x="${x + bw / 2}" y="${H + 18}" text-anchor="middle" class="tick">${d.label}</text>`;
  });
  return s + '</svg>';
};

// Polygon with n sides (regular)
K.ngon = (n, label = '') => {
  let pts = [];
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([150 + 80 * Math.cos(a), 100 + 80 * Math.sin(a)]); }
  return `<svg class="viz" viewBox="0 0 300 200" role="img" aria-label="${n}-sided polygon"><polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" class="shape"/><text x="150" y="105" text-anchor="middle" class="lbl">${label}</text></svg>`;
};

// Parallel lines cut by a transversal, with one angle given and one asked
K.parallel = (given, ask) => {
  let s = `<svg class="viz" viewBox="0 0 320 200" role="img" aria-label="parallel lines with a transversal">`;
  s += `<line x1="10" y1="60" x2="310" y2="60" class="shape"/><line x1="10" y1="150" x2="310" y2="150" class="shape"/>`;
  s += `<path d="M150 55 l8 5 l-8 5 M150 145 l8 5 l-8 5" class="thin"/>`;
  s += `<line x1="100" y1="10" x2="230" y2="195" class="shape"/>`;
  const at = { tl: [118, 52], tr: [150, 52], bl: [110, 76], br: [146, 78], TL: [182, 142], TR: [214, 142], BL: [176, 168], BR: [210, 168] };
  if (given) { const p = at[given.pos]; s += `<text x="${p[0]}" y="${p[1]}" class="lbl acc" text-anchor="middle">${given.text}</text>`; }
  if (ask) { const p = at[ask.pos]; s += `<text x="${p[0]}" y="${p[1]}" class="lbl big" text-anchor="middle">${ask.text}</text>`; }
  return s + '</svg>';
};

// Circle with labelled points (for circle theorem illustrations). kind selects a diagram.
K.circleThm = kind => {
  const C = [160, 105], r = 85;
  const P = deg => [C[0] + r * Math.cos(deg * Math.PI / 180), C[1] - r * Math.sin(deg * Math.PI / 180)];
  const pt = (p, l, dx = 0, dy = 0) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" class="dot"/><text x="${p[0] + dx}" y="${p[1] + dy}" class="lbl">${l}</text>`;
  let s = `<svg class="viz" viewBox="0 0 320 210" role="img" aria-label="circle theorem diagram"><circle cx="${C[0]}" cy="${C[1]}" r="${r}" class="shape"/>`;
  s += `<circle cx="${C[0]}" cy="${C[1]}" r="3" class="dot"/><text x="${C[0] + 6}" y="${C[1] + 16}" class="tick">O</text>`;
  if (kind === 'semicircle') { const A = P(180), B = P(0), X = P(70); s += `<polyline points="${A} ${X} ${B}" class="thin"/><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" class="thin"/>` + pt(A, 'A', -16, 4) + pt(B, 'B', 6, 4) + pt(X, 'C', 0, -8) + `<text x="${X[0] - 6}" y="${X[1] + 28}" class="lbl acc">90°</text>`; }
  if (kind === 'centre') { const A = P(210), B = P(330), X = P(100); s += `<polyline points="${A} ${X} ${B}" class="thin"/><polyline points="${A} ${C} ${B}" class="thin"/>` + pt(A, 'A', -16, 8) + pt(B, 'B', 6, 8) + pt(X, 'C', 0, -8) + `<text x="${X[0] - 4}" y="${X[1] + 30}" class="lbl acc">x</text><text x="${C[0] - 10}" y="${C[1] + 36}" class="lbl acc">2x</text>`; }
  if (kind === 'cyclic') { const A = P(150), B = P(30), X = P(300), D = P(230); s += `<polygon points="${A} ${B} ${X} ${D}" class="thin"/>` + pt(A, 'A', -16, -4) + pt(B, 'B', 6, -4) + pt(X, 'C', 6, 12) + pt(D, 'D', -16, 12) + `<text x="${A[0] + 14}" y="${A[1] + 20}" class="lbl acc">a</text><text x="${X[0] - 26}" y="${X[1] - 8}" class="lbl acc">180° − a</text>`; }
  if (kind === 'tangent') { const T = P(270); s += `<line x1="40" y1="${T[1]}" x2="280" y2="${T[1]}" class="thin"/><line x1="${C[0]}" y1="${C[1]}" x2="${T[0]}" y2="${T[1]}" class="thin"/><polyline points="${T[0] + 12},${T[1]} ${T[0] + 12},${T[1] - 12} ${T[0]},${T[1] - 12}" class="thin"/>` + pt(T, 'T', -4, 18); }
  if (kind === 'segment') { const A = P(200), B = P(340), X = P(60), Y = P(120); s += `<polyline points="${A} ${X} ${B}" class="thin"/><polyline points="${A} ${Y} ${B}" class="thin"/>` + pt(A, 'A', -16, 8) + pt(B, 'B', 6, 8) + pt(X, 'D', 4, -8) + pt(Y, 'C', -14, -8) + `<text x="${X[0] - 6}" y="${X[1] + 28}" class="lbl acc">x</text><text x="${Y[0]}" y="${Y[1] + 28}" class="lbl acc">x</text>`; }
  if (kind === 'tangents') { const E = [300, 105]; const T1 = P(62), T2 = P(-62); s += `<line x1="${E[0]}" y1="${E[1]}" x2="${T1[0]}" y2="${T1[1]}" class="thin"/><line x1="${E[0]}" y1="${E[1]}" x2="${T2[0]}" y2="${T2[1]}" class="thin"/>` + pt(E, 'P', 6, 4) + pt(T1, 'A', -4, -8) + pt(T2, 'B', -4, 18) + `<text x="262" y="72" class="lbl acc">PA = PB</text>`; }
  return s + '</svg>';
};

// Spinner / dice / tree diagrams are drawn by their own lessons.
K.tree = (p1, l1, l2, p2a, p2b) => {
  let s = `<svg class="viz" viewBox="0 0 320 210" role="img" aria-label="tree diagram">`;
  const br = (x1, y1, x2, y2, t, lab) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="thin"/><text x="${(x1 + x2) / 2 - 4}" y="${(y1 + y2) / 2 + (y2 < y1 ? -6 : 16)}" class="tick">${t}</text><text x="${x2 + 6}" y="${y2 + 5}" class="lbl">${lab}</text>`;
  s += br(20, 105, 120, 55, p1[0], l1[0]) + br(20, 105, 120, 155, p1[1], l1[1]);
  s += br(150, 55, 250, 25, p2a[0], l2[0]) + br(150, 55, 250, 85, p2a[1], l2[1]);
  s += br(150, 155, 250, 125, p2b[0], l2[0]) + br(150, 155, 250, 185, p2b[1], l2[1]);
  return s + '</svg>';
};
