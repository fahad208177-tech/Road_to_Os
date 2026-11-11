// Module 2: Algebra and graphs (syllabus 2.1 to 2.12)
(() => {
  const K = R2O.K, G = R2O.GEN, W = R2O.WIDGETS, { rnd, nz, pick, mcq, n, fr, frs, sup, poly, term } = K;
  const expr = terms => { let s = '', first = true; terms.forEach(([c, v]) => { if (!c) return; s += term(c, v, first); first = false; }); return s || '0'; };
  const br = (a, b, v = 'x') => `(${poly([a, b], v)})`;
  const X2 = 'x<sup>2</sup>';

  // ----- 2.1 Substitution -----
  G.subst = () => pick([
    () => { const x = nz(-5, 5), y = nz(-5, 5), a = rnd(2, 5), b = rnd(2, 6); const v = a * x * x - b * y; return { kind: 'num', q: `<p>Find the value of <b class="bigq">${a}x² − ${b}y</b> when x = ${n(x)} and y = ${n(y)}.</p>`, a: v, hint: 'Put brackets around negative numbers when you substitute. Square before you multiply.', steps: [`${a} × (${n(x)})² − ${b} × (${n(y)})`, `= ${a} × ${x * x} − ${n(b * y)}`, `= <b>${n(v)}</b>`] }; },
    () => { const u = rnd(0, 20), a = rnd(2, 10), t = rnd(2, 12); return { kind: 'num', q: `<p>v = u + at. Find v when u = ${u}, a = ${a} and t = ${t}.</p>`, a: u + a * t, steps: [`v = ${u} + ${a} × ${t}`, `= <b>${u + a * t}</b>`] }; },
    () => { const p = rnd(2, 12), q = rnd(1, 9), r = pick([2, 3, 4, 5]); const top = p + q; const v = top / r; return { kind: 'num', q: `<p>Find the value of <span class="bigq">${fr('p + q', 'r')}</span> when p = ${p}, q = ${q} and r = ${r}.</p>`, a: v, steps: [`(${p} + ${q}) ÷ ${r} = ${top} ÷ ${r}`, `= <b>${n(K.round(v, 4))}</b>`], ...(Number.isInteger(v * 100) ? {} : K.acc3(v)) }; },
    () => { const r = rnd(2, 9), h = rnd(2, 12); const v = Math.PI * r * r * h; return Object.assign({ kind: 'num', q: `<p>V = πr²h. Find V when r = ${r} and h = ${h}, correct to 3 significant figures.</p>`, steps: [`π × ${r}² × ${h} = π × ${r * r * h}`, `= ${n(K.round(v, 3))}…`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); }
  ])();

  // ----- 2.2 Simplify and expand -----
  G.collect = () => {
    const p = [nz(-6, 7), nz(-6, 7)], q = [nz(-9, 9), nz(-9, 9)], r = [nz(-9, 9), nz(-9, 9)];
    const q1 = expr([[p[0], 'a²'], [q[0], 'ab'], [r[0], '']]) + ' ' + (p[1] < 0 ? '− ' : '+ ') + expr([[Math.abs(p[1]), 'a²'], [q[1], 'ab'], [r[1], '']]);
    const ans = expr([[p[0] + p[1], 'a²'], [q[0] + q[1], 'ab'], [r[0] + r[1], '']]);
    return { kind: 'mcq', q: `<p>Simplify <b class="bigq">${q1.replace(/a²/g, 'a<sup>2</sup>')}</b></p>`, a: ans.replace(/a²/g, 'a<sup>2</sup>'),
      choices: mcq(ans.replace(/a²/g, 'a<sup>2</sup>'), [expr([[p[0] + p[1], 'a²'], [q[0] - q[1], 'ab'], [r[0] + r[1], '']]), expr([[p[0] - p[1], 'a²'], [q[0] + q[1], 'ab'], [r[0] - r[1], '']]), expr([[p[0] + p[1], 'a²'], [q[0] + q[1], 'ab'], [-(r[0] + r[1]), '']]), expr([[p[0] + p[1] + 1, 'a²'], [q[0] + q[1], 'ab'], [r[0] + r[1], '']])].map(s => s.replace(/a²/g, 'a<sup>2</sup>'))),
      hint: 'Collect a² terms together, ab terms together, and number terms together. Keep each sign with the term after it.', steps: [`a² terms: ${n(p[0])} + ${n(p[1])} = ${n(p[0] + p[1])}`, `ab terms: ${n(q[0])} + ${n(q[1])} = ${n(q[0] + q[1])}`, `numbers: ${n(r[0])} + ${n(r[1])} = ${n(r[0] + r[1])}`, `<b>${ans.replace(/a²/g, 'a<sup>2</sup>')}</b>`] };
  };
  G.expand = () => {
    if (Math.random() < .35) { const k = nz(-5, 6), m = nz(-4, 5), c = nz(-6, 6); const ans = expr([[k * m, X2], [k * c, 'xy']]); return { kind: 'mcq', q: `<p>Expand <b class="bigq">${k === 1 ? '' : k === -1 ? '−' : n(k)}x(${expr([[m, 'x'], [c, 'y']])})</b></p>`, a: ans, choices: mcq(ans, [expr([[k * m, X2], [c, 'xy']]), expr([[k * m, 'x'], [k * c, 'xy']]), expr([[k * m, X2], [-k * c, 'xy']]), expr([[k + m, X2], [k * c, 'xy']])]), hint: 'Multiply the term outside by every term inside.', steps: [`${n(k)}x × ${n(m)}x = ${expr([[k * m, X2]])}`, `${n(k)}x × ${n(c)}y = ${expr([[k * c, 'xy']])}`, `<b>${ans}</b>`] }; }
    const a = pick([1, 1, 2, 3]), b = nz(-7, 7), c = pick([1, 1, 2]), d = nz(-7, 7);
    const right = poly([a * c, a * d + b * c, b * d]);
    return { kind: 'mcq', q: `<p>Expand and simplify <b class="bigq">${br(a, b)}${br(c, d)}</b></p>`, a: right,
      choices: mcq(right, [poly([a * c, a * d - b * c, b * d]), poly([a * c, a * d + b * c, -b * d]), poly([a * c, b + d, b * d]), poly([a * c, 0, b * d]), poly([a + c, a * d + b * c, b * d])]),
      hint: 'Multiply every term in the first bracket by every term in the second (FOIL), then collect like terms.', steps: [`${poly([a, 0])} × ${poly([c, 0])} = ${poly([a * c, 0, 0])}`, `Outer + inner: ${n(a * d)}x + ${n(b * c)}x = ${n(a * d + b * c)}x`, `Last: ${n(b)} × ${n(d)} = ${n(b * d)}`, `<b>${right}</b>`] };
  };

  // ----- 2.2 Factorise -----
  G.factorCommon = () => {
    let p, q; do { p = nz(1, 9); q = nz(-9, 9); } while (K.gcd(p, q) !== 1);
    const g = rnd(2, 7); const Q = expr([[g * p, X2], [g * q, 'xy']]);
    const right = `${g}x(${expr([[p, 'x'], [q, 'y']])})`;
    return { kind: 'mcq', q: `<p>Factorise <b>fully</b>: <b class="bigq">${Q}</b></p>`, a: right, choices: mcq(right, [`${g}(${expr([[p, X2], [q, 'xy']])})`, `x(${expr([[g * p, 'x'], [g * q, 'y']])})`, `${g}x(${expr([[p, 'x'], [-q, 'y']])})`, `${g * p}x(x${term(q, 'y')})`]), hint: 'Take out the highest common factor of the numbers AND of the letters.', steps: [`HCF of ${g * p} and ${Math.abs(g * q)} is ${g}; both terms contain x.`, `<b>${right}</b>`] };
  };
  G.factorQuad = () => {
    if (Math.random() < .3) { const a = pick([1, 2, 3, 4, 5]), b = rnd(1, 9); const right = `(${a === 1 ? '' : a}x − ${b}y)(${a === 1 ? '' : a}x + ${b}y)`; const ax = a === 1 ? '' : a * a; return { kind: 'mcq', q: `<p>Factorise <b class="bigq">${ax}x<sup>2</sup> − ${b * b}y<sup>2</sup></b></p>`, a: right, choices: mcq(right, [`(${a === 1 ? '' : a}x − ${b}y)<sup>2</sup>`, `(${a === 1 ? '' : a}x + ${b}y)<sup>2</sup>`, `(${a === 1 ? '' : a * a}x − ${b}y)(x + ${b}y)`]), hint: 'Difference of two squares: a² − b² = (a − b)(a + b).', steps: [`${ax}x² = (${a === 1 ? '' : a}x)² and ${b * b}y² = (${b}y)²`, `<b>${right}</b>`] }; }
    let p = nz(-9, 9), q = nz(-9, 9); if (p === -q) q = q + 1 || 2;
    const lead = pick([1, 1, 1, 2, 3]);
    const right = lead === 1 ? `(x${term(p)})(x${term(q)})` : `(${lead}x${term(p)})(x${term(q)})`;
    const Q = poly([lead, lead * q + p, p * q]);
    const wr = lead === 1 ? [`(x${term(-p)})(x${term(-q)})`, `(x${term(p)})(x${term(-q)})`, `(x${term(-p)})(x${term(q)})`, `(x${term(p + q)})(x${term(1)})`]
      : [`(${lead}x${term(q)})(x${term(p)})`, `(${lead}x${term(-p)})(x${term(-q)})`, `(${lead}x${term(p)})(x${term(-q)})`, `(x${term(p)})(${lead}x${term(-q)})`];
    return { kind: 'mcq', q: `<p>Factorise <b class="bigq">${Q}</b></p>`, a: right, choices: mcq(right, wr.filter(w => w !== right)), hint: lead === 1 ? `Find two numbers that multiply to ${n(p * q)} and add to ${n(p + q)}.` : 'Try factor pairs and expand to check the middle term.', steps: [lead === 1 ? `${n(p)} × ${n(q)} = ${n(p * q)} and ${n(p)} + ${n(q)} = ${n(p + q)}` : `Check: ${right} expands to ${Q}`, `<b>${right}</b>`] };
  };
  G.factorGroup = () => {
    const a = rnd(2, 6), b = rnd(2, 7), k = rnd(2, 5);
    const right = `(${a}x + ${b})(x + ${k}y)`;
    // (ax + b)(x + ky) = ax² + bx + akxy + bky
    return { kind: 'mcq', q: `<p>Factorise by grouping: <b class="bigq">${a}x<sup>2</sup> + ${b}x + ${a * k}xy + ${b * k}y</b></p>`, a: right, choices: mcq(right, [`(${a}x + ${b})(x + ${k})`, `(${a}x + ${k}y)(x + ${b})`, `x(${a}x + ${b}) + ${k}y`, `(${a}x + ${b}y)(x + ${k})`]), hint: 'Group the first two terms and the last two. Take a common factor from each pair.', steps: [`x(${a}x + ${b}) + ${k}y(${a}x + ${b})`, `<b>${right}</b>`] };
  };

  // ----- 2.2 Completing the square -----
  G.compSq = () => {
    const p = nz(-6, 6), c = rnd(-12, 15); const qv = c - p * p;
    const right = `(x${term(p)})<sup>2</sup>${qv ? term(qv) : ''}`;
    return { kind: 'mcq', q: `<p>Write <b class="bigq">${poly([1, 2 * p, c])}</b> in the form (x + a)² + b.</p>`, a: right,
      choices: mcq(right, [`(x${term(2 * p)})<sup>2</sup>${term(c - 4 * p * p) || ' + 0'}`, `(x${term(p)})<sup>2</sup>${term(c + p * p) || ' + 0'}`, `(x${term(-p)})<sup>2</sup>${qv ? term(qv) : ' + 0'}`, `(x${term(p)})<sup>2</sup>${term(c) || ' + 0'}`]),
      hint: 'Halve the x coefficient to get a. Then subtract a² from the constant.', steps: [`Half of ${n(2 * p)} is ${n(p)}: (x${term(p)})² = ${poly([1, 2 * p, p * p])}`, `So ${poly([1, 2 * p, c])} = (x${term(p)})² ${term(c - p * p) || '+ 0'}`, `<b>${right}</b>`] };
  };
  W.quadExplorer = el => {
    el.innerHTML = `<div class="sliders"><label>a = <b class="av"></b><input type="range" min="-3" max="3" step="0.5" value="1" class="a"></label><label>b = <b class="bv"></b><input type="range" min="-8" max="8" step="1" value="-2" class="b"></label><label>c = <b class="cv"></b><input type="range" min="-8" max="8" step="1" value="-3" class="c"></label></div><div class="out"></div>`;
    const [A, B, C] = ['.a', '.b', '.c'].map(s => el.querySelector(s)); const out = el.querySelector('.out');
    const draw = () => {
      let a = +A.value || 0.5; if (+A.value === 0) A.value = a = 0.5; const b = +B.value, c = +C.value;
      el.querySelector('.av').textContent = a; el.querySelector('.bv').textContent = b; el.querySelector('.cv').textContent = c;
      const disc = b * b - 4 * a * c, tx = -b / (2 * a), ty = a * tx * tx + b * tx + c;
      const roots = disc < 0 ? [] : disc === 0 ? [tx] : [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)];
      const pts = roots.map(r => ({ x: r, y: 0, color: 'var(--c2)' })).concat([{ x: tx, y: ty, color: 'var(--c3)' }]);
      out.innerHTML = K.plot([{ f: x => a * x * x + b * x + c }], pts.filter(p => Math.abs(p.x) <= 8 && Math.abs(p.y) <= 10), { xmin: -8, xmax: 8, ymin: -10, ymax: 10, lstep: 2, h: 260 }) +
        `<p class="center">y = ${poly([a, b, c])}<br><span style="color:var(--c3)">● turning point (${n(K.round(tx, 2))}, ${n(K.round(ty, 2))})</span> · <span style="color:var(--c2)">● ${roots.length ? 'roots x = ' + roots.map(r => n(K.round(r, 2))).join(', ') : 'no real roots'}</span><br><span class="muted small">b² − 4ac = ${n(disc)}: ${disc > 0 ? 'two roots' : disc === 0 ? 'one repeated root' : 'no real roots'}</span></p>`;
    };
    [A, B, C].forEach(i => i.oninput = draw); draw();
  };

  // ----- 2.3 Algebraic fractions -----
  G.algFracSimplify = () => pick([
    () => { const k = rnd(1, 9); const right = `x − ${k}`; return { kind: 'mcq', q: `<p>Simplify <span class="bigq">${fr(`x<sup>2</sup> − ${k * k}`, `x + ${k}`)}</span></p>`, a: right, choices: mcq(right, [`x + ${k}`, `x − ${k * k}`, `${fr('x', k)}`, `x<sup>2</sup> − ${k}`]), hint: 'Factorise the top using the difference of two squares, then cancel.', steps: [`x² − ${k * k} = (x − ${k})(x + ${k})`, `Cancel (x + ${k}): <b>${right}</b>`] }; },
    () => { let p = nz(-6, 6), q = nz(-6, 6); while (q === p) q = nz(-6, 6); const right = `x${term(q)}`; return { kind: 'mcq', q: `<p>Simplify <span class="bigq">${fr(poly([1, p + q, p * q]), `x${term(p)}`)}</span></p>`, a: right, choices: mcq(right, [`x${term(p)}`, `x${term(-q)}`, `x${term(p * q)}`, `${fr('1', `x${term(q)}`)}`]), hint: 'Factorise the top, then cancel the common bracket.', steps: [`${poly([1, p + q, p * q])} = (x${term(p)})(x${term(q)})`, `<b>${right}</b>`] }; },
    () => { let p = rnd(2, 6), q = rnd(1, 6); while (q === p) q = rnd(1, 6); const right = fr('x', `x − ${q}`); return { kind: 'mcq', q: `<p>Simplify <span class="bigq">${fr(`x<sup>2</sup> − ${p}x`, poly([1, -(p + q), p * q]))}</span></p>`, a: right, choices: mcq(right, [fr('x', `x − ${p}`), fr(`x − ${p}`, `x − ${q}`), fr(1, `x − ${q}`), fr('x', `x + ${q}`)]), hint: 'Factorise top and bottom separately.', steps: [`Top: x(x − ${p})`, `Bottom: (x − ${p})(x − ${q})`, `Cancel (x − ${p}): <b>${right}</b>`] }; }
  ])();
  G.algFracAdd = () => {
    const a = rnd(2, 5), b = rnd(2, 6); if (a === b) return G.algFracSimplify();
    const p = nz(-5, 5), q = nz(-5, 5), L = a * b; // (x+p)/a + (x+q)/b = (b(x+p) + a(x+q))/ab
    const cx = b + a, c0 = b * p + a * q; const g = K.gcd(K.gcd(cx, c0), L);
    const right = fr(poly([cx / g, c0 / g]), L / g);
    return { kind: 'mcq', q: `<p>Write as a single fraction in its simplest form: <span class="bigq">${fr(`x${term(p)}`, a)} + ${fr(`x${term(q)}`, b)}</span></p>`, a: right,
      choices: mcq(right, [fr(poly([2, p + q]), a + b), fr(poly([cx, b * p - a * q]), L), fr(poly([2, p + q]), L), fr(poly([cx, p + q]), L)]), hint: `Common denominator ${L}. Multiply each numerator by what its denominator was multiplied by.`,
      steps: [`${fr(`${b}(x${term(p)})`, L)} + ${fr(`${a}(x${term(q)})`, L)}`, `= ${fr(`${poly([b, b * p])} + ${poly([a, a * q])}`, L)}`, `= <b>${right}</b>`] };
  };

  // ----- 2.4 Indices II -----
  G.solveIndex = () => pick([
    () => { const b = pick([2, 3, 5]), m = b === 2 ? rnd(3, 7) : rnd(2, 4), c = nz(-3, 3); return { kind: 'num', q: `<p>Solve <b class="bigq">${b}<sup>x${term(c)}</sup> = ${n(b ** m)}</b></p>`, a: m - c, hint: `Write ${b ** m} as a power of ${b}.`, steps: [`${b ** m} = ${sup(b, m)}`, `x ${c > 0 ? '+' : '−'} ${Math.abs(c)} = ${m}`, `x = <b>${m - c}</b>`] }; },
    () => { const b = pick([2, 3]), m = rnd(1, 7); return { kind: 'num', q: `<p>Solve <b class="bigq">${b * b}<sup>x</sup> = ${n(b ** m)}</b></p>`, a: m / 2, hint: `Write both sides as powers of ${b}: ${b * b} = ${b}².`, steps: [`(${b}²)<sup>x</sup> = ${sup(b, m)}, so ${sup(b, '2x')} = ${sup(b, m)}`, `2x = ${m}, x = <b>${n(m / 2)}</b>`] }; },
    () => { const b = pick([2, 3, 5]), c = rnd(1, 4); return { kind: 'num', q: `<p>Solve <b class="bigq">${b}<sup>x + ${c}</sup> = ${b * b}<sup>x</sup></b></p>`, a: c, hint: `${b * b} = ${b}², so the right side is ${b}<sup>2x</sup>.`, steps: [`${sup(b, 'x + ' + c)} = ${sup(b, '2x')}`, `x + ${c} = 2x, so x = <b>${c}</b>`] }; }
  ])();
  G.simplifyIndex = () => {
    const a = rnd(2, 6), b = pick([2, 3, -1, -2, 0.5]), c = rnd(1, 5);
    const powr = a * b + c; const pp = v => Number.isInteger(v) ? n(v) : (v === 0.5 ? '½' : n(v));
    return { kind: 'num', q: `<p>Simplify <b class="bigq">(x<sup>${a}</sup>)<sup>${pp(b)}</sup> × x<sup>${c}</sup></b>. Write the answer as x<sup>n</sup> and type n.</p>`, a: powr, ph: 'the power n', hint: 'Power of a power: multiply. Then multiplying: add.', steps: [`(x<sup>${a}</sup>)<sup>${pp(b)}</sup> = x<sup>${pp(a * b)}</sup>`, `x<sup>${pp(a * b)}</sup> × x<sup>${c}</sup> = <b>x<sup>${pp(powr)}</sup></b>`] };
  };

  // ----- 2.5 Linear equations -----
  G.linEq = () => pick([
    () => { const a = nz(2, 9), x = nz(-9, 12), b = nz(-15, 15); const c = a * x + b; return { kind: 'num', q: `<p>Solve <b class="bigq">${poly([a, b])} = ${n(c)}</b></p>`, a: x, ph: 'x = ', hint: `Undo the ${b > 0 ? '+' : '−'} ${Math.abs(b)} first, then divide by ${a}.`, steps: [`${a}x = ${n(c)} ${b > 0 ? '−' : '+'} ${Math.abs(b)} = ${n(c - b)}`, `x = ${n(c - b)} ÷ ${a} = <b>${n(x)}</b>`] }; },
    () => { const a = rnd(2, 6), b = nz(-6, 6), x = nz(-6, 9); const c = a * (x + b); return { kind: 'num', q: `<p>Solve <b class="bigq">${a}(x${term(b)}) = ${n(c)}</b></p>`, a: x, ph: 'x = ', hint: 'Divide both sides by the number outside the bracket, or expand first.', steps: [`x${term(b)} = ${n(c)} ÷ ${a} = ${n(c / a)}`, `x = <b>${n(x)}</b>`] }; },
    () => { let a = nz(-6, 8), c = nz(-6, 8); while (a === c) c = nz(-6, 8); const x = nz(-8, 8), b = nz(-12, 12); const d = (a - c) * x + b; return { kind: 'num', q: `<p>Solve <b class="bigq">${poly([a, b])} = ${poly([c, d])}</b></p>`, a: x, ph: 'x = ', hint: 'Get all the x terms on one side and the numbers on the other.', steps: [`${n(a)}x − ${n(c) === n(Math.abs(c)) ? c : '(' + n(c) + ')'}x = ${n(d)} − ${n(b) === n(Math.abs(b)) ? b : '(' + n(b) + ')'}`, `${n(a - c)}x = ${n(d - b)}`, `x = <b>${n(x)}</b>`] }; }
  ])();
  G.fracEq = () => pick([
    () => { const b = rnd(2, 6), c = nz(-5, 8), a = nz(-9, 9); const x = b * c - a; return { kind: 'num', q: `<p>Solve <span class="bigq">${fr(`x${term(a)}`, b)} = ${n(c)}</span></p>`, a: x, ph: 'x = ', hint: `Multiply both sides by ${b}.`, steps: [`x${term(a)} = ${b} × ${n(c)} = ${n(b * c)}`, `x = <b>${n(x)}</b>`] }; },
    () => { const a = rnd(2, 5), b = rnd(2, 6); if (a === b) return G.linEq(); const L = K.lcm(a, b), k = rnd(1, 6), x = L * k; const c = x / a + x / b; return { kind: 'num', q: `<p>Solve <span class="bigq">${fr('x', a)} + ${fr('x', b)} = ${n(c)}</span></p>`, a: x, ph: 'x = ', hint: `Multiply every term by ${L}.`, steps: [`× ${L}: ${L / a}x + ${L / b}x = ${n(c * L)}`, `${L / a + L / b}x = ${n(c * L)}`, `x = <b>${n(x)}</b>`] }; },
    () => { const x = pick([2, 3, 4, 5, 6, 7, 8]); const c = rnd(2, 5), a = rnd(1, 9); const lhs = (c * x + a) / x; if (!Number.isInteger(lhs)) return G.linEq(); return { kind: 'num', q: `<p>Solve <span class="bigq">${fr(`${c}x + ${a}`, 'x')} = ${lhs}</span></p>`, a: x, ph: 'x = ', hint: 'Multiply both sides by x.', steps: [`${c}x + ${a} = ${lhs}x`, `${a} = ${lhs - c}x`, `x = <b>${x}</b>`] }; }
  ])();
  G.construct = () => pick([
    () => { const m = rnd(2, 7), a = rnd(2, 15), x = rnd(2, 15); return { kind: 'num', q: `<p>I think of a number. I multiply it by ${m} and add ${a}. The answer is ${m * x + a}. What was my number?</p>`, a: x, hint: `Write an equation: ${m}x + ${a} = ${m * x + a}.`, steps: [`${m}x + ${a} = ${m * x + a}`, `${m}x = ${m * x}`, `x = <b>${x}</b>`] }; },
    () => { const x = rnd(3, 20), d = rnd(1, 6); const P = 2 * (x + x + d); return { kind: 'num', q: `<p>A rectangle is x cm wide and (x + ${d}) cm long. Its perimeter is ${P} cm. Find x.</p>`, a: x, unit: 'cm', hint: 'Perimeter = 2 × (width + length).', steps: [`2(x + x + ${d}) = ${P}`, `4x + ${2 * d} = ${P}`, `x = <b>${x}</b>`] }; },
    () => { const x = rnd(5, 40), k = rnd(3, 5); const s = k * x + k * (k - 1) / 2; return { kind: 'num', q: `<p>The sum of ${k} consecutive whole numbers is ${s}. What is the smallest number?</p>`, a: x, hint: `Call them n, n + 1, …, n + ${k - 1}.`, steps: [`${k}n + ${k * (k - 1) / 2} = ${s}`, `${k}n = ${s - k * (k - 1) / 2}`, `n = <b>${x}</b>`] }; },
    () => { const y = rnd(8, 20), d = rnd(20, 30); return { kind: 'num', q: `<p>Ama is ${d} years older than her son. In ${y} years, she will be twice his age. How old is her son now?</p>`, a: d - y, hint: 'Son now = s, mother = s + ' + d + '. Write the "in ' + y + ' years" equation.', steps: [`s + ${d} + ${y} = 2(s + ${y})`, `s + ${d + y} = 2s + ${2 * y}`, `s = <b>${d - y}</b>`] }; }
  ])();

  // ----- 2.5 Simultaneous equations -----
  G.simul = () => {
    let a, b, c, d; const x = nz(-6, 8), y = nz(-6, 8);
    do { a = nz(-5, 6); b = nz(-5, 6); c = nz(-5, 6); d = nz(-5, 6); } while (a * d - b * c === 0 || Math.abs(a * d - b * c) > 30);
    const e = a * x + b * y, f = c * x + d * y;
    return { kind: 'nums', ordered: true, q: `<p>Solve the simultaneous equations</p><p class="bigq">${expr([[a, 'x'], [b, 'y']])} = ${n(e)}<br>${expr([[c, 'x'], [d, 'y']])} = ${n(f)}</p><p class="muted small">Type x then y, e.g. x = 2, y = −1</p>`, a: [x, y], show: `x = ${n(x)}, y = ${n(y)}`, ph: 'x = …, y = …',
      hint: 'Make the coefficients of one letter the same, then add or subtract the equations to eliminate it.', steps: [`Multiply to match the y terms: (1) × ${n(d)} and (2) × ${n(b)}`, `Subtract: ${n(a * d - b * c)}x = ${n(e * d - f * b)}, so x = ${n(x)}`, `Substitute back: y = ${n(y)}`, `<b>x = ${n(x)}, y = ${n(y)}</b>`] };
  };

  // ----- 2.5 Quadratic equations -----
  G.quadFactorSolve = () => {
    if (Math.random() < .3) { const r = pick([1, 3, 5, 7]) * pick([1, -1]), q = nz(-6, 6); // (2x - r)(x - q) = 0
      return { kind: 'nums', q: `<p>Solve <b class="bigq">${poly([2, -(r + 2 * q), r * q])} = 0</b></p><p class="muted small">Type both solutions, e.g. 3, −1/2</p>`, a: [r / 2, q], show: `x = ${frs(r, 2)} or x = ${n(q)}`, ph: 'x = …, …', hint: 'Factorise into two brackets, then set each bracket to zero.', steps: [`(2x${term(-r)})(x${term(-q)}) = 0`, `2x = ${n(r)} or x = ${n(q)}`, `<b>x = ${frs(r, 2)} or x = ${n(q)}</b>`] }; }
    let p = nz(-9, 9), q = nz(-9, 9); if (p === q) q = p === 9 ? -2 : p + 1;
    return { kind: 'nums', q: `<p>Solve <b class="bigq">${poly([1, -(p + q), p * q])} = 0</b></p><p class="muted small">Type both solutions, e.g. 2, −5</p>`, a: [p, q], show: `x = ${n(p)} or x = ${n(q)}`, ph: 'x = …, …', hint: `Two numbers that multiply to ${n(p * q)} and add to ${n(-(p + q))}.`, steps: [`(x${term(-p)})(x${term(-q)}) = 0`, `<b>x = ${n(p)} or x = ${n(q)}</b>`] };
  };
  G.quadFormula = () => {
    let a, b, c, D; do { a = pick([1, 1, 2, 3]); b = nz(-9, 9); c = nz(-9, 9); D = b * b - 4 * a * c; } while (D <= 0 || Number.isInteger(Math.sqrt(D)));
    const r1 = (-b + Math.sqrt(D)) / (2 * a), r2 = (-b - Math.sqrt(D)) / (2 * a);
    return { kind: 'nums', tol: 0.0051, q: `<p>Solve <b class="bigq">${poly([a, b, c])} = 0</b>, giving your answers correct to <b>2 decimal places</b>.</p>`, a: [r1, r2], show: `x = ${r1.toFixed(2)} or x = ${r2.toFixed(2)}`, ph: 'x = …, …',
      hint: 'Use x = (−b ± √(b² − 4ac)) ÷ 2a. It is given on the formula page.', steps: [`a = ${a}, b = ${n(b)}, c = ${n(c)}`, `b² − 4ac = ${n(b * b)} − ${n(4 * a * c)} = ${D}`, `x = (${n(-b)} ± √${D}) ÷ ${2 * a}`, `<b>x = ${r1.toFixed(2)} or x = ${r2.toFixed(2)}</b>`] };
  };
  G.changeSubject = () => {
    const f = pick([
      ['v = u + at', 't', fr('v − u', 'a'), [fr('v + u', 'a'), 'v − u − a', fr('u − v', 'a'), fr('v', 'a') + ' − u']],
      ['A = πr²', 'r', K.sqrt(fr('A', 'π')), [fr('A', '2π'), fr('A', 'π') + '²', K.sqrt('A') + ' − π', K.sqrt('Aπ')]],
      ['y = 3x − 7', 'x', fr('y + 7', 3), [fr('y − 7', 3), '3y + 7', fr('y', 3) + ' − 7', fr('y + 7', '−3')]],
      ['P = 2(l + w)', 'w', fr('P', 2) + ' − l', ['P − 2l', fr('P − l', 2), '2P − l', fr('P + l', 2)]],
      ['y = ' + fr('x + 2', 'x − 3'), 'x', fr('3y + 2', 'y − 1'), [fr('3y − 2', 'y + 1'), fr('y + 2', 'y − 3'), fr('3y + 2', 'y + 1'), '3y + 2']],
      ['T = 2π' + K.sqrt(fr('l', 'g')), 'l', fr('gT²', '4π²'), [fr('gT', '2π'), fr('T²', '4π²g'), fr('g²T²', '4π²'), fr('4π²g', 'T²')]],
      ['E = ½mv²', 'v', K.sqrt(fr('2E', 'm')), [fr('2E', 'm'), K.sqrt(fr('E', '2m')), fr('2E', 'v'), K.sqrt('2Em')]]
    ]);
    return { kind: 'mcq', q: `<p>Make <b>${f[1]}</b> the subject of <span class="bigq">${f[0]}</span></p>`, a: f[2], choices: mcq(f[2], f[3]), hint: 'Undo the operations in reverse order, doing the same to both sides.', steps: [`Undo each operation on ${f[1]} in reverse order.`, `<b>${f[1]} = ${f[2]}</b>`] };
  };

  // ----- 2.6 Inequalities -----
  const SYM = { '<': '<', '>': '>', '<=': '⩽', '>=': '⩾' }, FLIP = { '<': '>', '>': '<', '<=': '>=', '>=': '<=' };
  G.ineqSolve = () => {
    const a = nz(-5, 6), k = nz(-8, 8), b = nz(-10, 10), s = pick(['<', '>', '<=', '>=']); const c = a * k + b;
    const res = a > 0 ? s : FLIP[s]; const right = `x ${SYM[res]} ${n(k)}`;
    return { kind: 'mcq', q: `<p>Solve <b class="bigq">${poly([a, b])} ${SYM[s]} ${n(c)}</b></p>`, a: right, choices: mcq(right, [`x ${SYM[FLIP[res]]} ${n(k)}`, `x ${SYM[res]} ${n(-k)}`, `x ${SYM[res.includes('=') ? res[0] : res + '=']} ${n(k)}`, `x ${SYM[res]} ${n(K.round((c + b) / a, 2))}`]),
      hint: a < 0 ? 'Careful: dividing by a negative number flips the inequality sign!' : 'Solve it like an equation.', steps: [`${n(a)}x ${SYM[s]} ${n(c)} − (${n(b)}) = ${n(c - b)}`, a < 0 ? `Divide by ${n(a)} and <b>flip</b> the sign` : `Divide by ${a}`, `<b>${right}</b>`] };
  };
  G.ineqIntegers = () => {
    let L, U, p, q; do { L = rnd(-5, 3); U = L + rnd(2, 5); p = rnd(1, 4); q = rnd(-6, 6); } while (false);
    const lo = Math.random() < .5, hi = Math.random() < .5; // inclusive flags
    const ints = []; for (let x = L - 1; x <= U + 1; x++) { const okL = lo ? x >= L : x > L, okU = hi ? x <= U : x < U; if (okL && okU) ints.push(x); }
    if (!ints.length) return G.ineqSolve();
    return { kind: 'nums', q: `<p>List all the <b>integers</b> x that satisfy</p><p class="bigq">${n(p * L + q)} ${lo ? '⩽' : '<'} ${poly([p, q])} ${hi ? '⩽' : '<'} ${n(p * U + q)}</p>`, a: ints, show: ints.map(n).join(', '), ph: 'e.g. −1, 0, 1, 2', hint: `Subtract ${n(q)} from all three parts, then divide all parts by ${p}.`, steps: [`${n(L)} ${lo ? '⩽' : '<'} x ${hi ? '⩽' : '<'} ${n(U)}`, `Integers: <b>${ints.map(n).join(', ')}</b>`],
      after: K.numberLine(L - 1, U + 1, { range: { from: L, to: U, fromClosed: lo, toClosed: hi } }) };
  };

  // ----- 2.7 Sequences -----
  G.nthTerm = () => {
    const d = nz(-5, 7), a = rnd(-6, 12); const seq = [0, 1, 2, 3].map(i => a + i * d); const c = a - d;
    const right = `${d === 1 ? '' : d === -1 ? '−' : n(d)}n${c ? term(c) : ''}`;
    return { kind: 'mcq', q: `<p>Find the n-th term of the sequence <b class="bigq">${seq.map(n).join(', ')}, …</b></p>`, a: right, choices: mcq(right, [`${n(d)}n${term(a) || ''}`, `n${term(d)}`, `${n(d)}n${term(c + 1) || ''}`, `${n(-d)}n${term(c) || ''}`, `${n(c)}n${term(d)}`]), hint: 'The difference between terms gives the number in front of n. Then adjust to fit the first term.', steps: [`Difference: ${n(d)}, so ${n(d)}n`, `n = 1: ${n(d)} + ? = ${n(a)}, so ? = ${n(c)}`, `<b>${right}</b>`] };
  };
  G.seqTerm = () => pick([
    () => { const a = rnd(2, 6), b = rnd(-9, 9), k = rnd(8, 50); return { kind: 'num', q: `<p>The n-th term of a sequence is <b>${a}n${term(b)}</b>. Find the ${k}th term.</p>`, a: a * k + b, steps: [`${a} × ${k}${term(b)} = <b>${a * k + b}</b>`] }; },
    () => { const b = rnd(-5, 5), k = rnd(5, 15); return { kind: 'num', q: `<p>T<sub>n</sub> = n²${term(b)}. Find T<sub>${k}</sub>.</p>`, a: k * k + b, steps: [`${k}² ${b < 0 ? '−' : '+'} ${Math.abs(b)} = <b>${k * k + b}</b>`] }; },
    () => { const a = rnd(2, 9), b = rnd(1, 30), t = a * rnd(5, 20) + b; return { kind: 'num', q: `<p>The n-th term is <b>${a}n + ${b}</b>. Which term is equal to ${t}?</p>`, a: (t - b) / a, ph: 'n = ', hint: `Solve ${a}n + ${b} = ${t}.`, steps: [`${a}n = ${t - b}`, `n = <b>${(t - b) / a}</b>`] }; }
  ])();
  G.nextTerm = () => pick([
    () => { const a = rnd(1, 5), r = pick([2, 3, -2]); const s = [0, 1, 2, 3].map(i => a * r ** i); return { kind: 'num', q: `<p>Find the next term: <b class="bigq">${s.map(n).join(', ')}, …</b></p>`, a: a * r ** 4, hint: 'Is it adding the same amount, or multiplying?', steps: [`Each term × ${n(r)}`, `${n(s[3])} × ${n(r)} = <b>${n(a * r ** 4)}</b>`] }; },
    () => { const b = rnd(-3, 4); const s = [1, 2, 3, 4].map(i => i * i + b); return { kind: 'num', q: `<p>Find the next term: <b class="bigq">${s.map(n).join(', ')}, …</b></p>`, a: 25 + b, hint: 'Look at the differences, then the differences of the differences.', steps: [`Differences: 3, 5, 7 → next 9`, `${n(s[3])} + 9 = <b>${n(25 + b)}</b> (these are n² ${term(b) || '+ 0'})`] }; },
    () => { const s = [1, 8, 27, 64]; const b = rnd(0, 3); return { kind: 'num', q: `<p>Find the next term: <b class="bigq">${s.map(x => n(x + b)).join(', ')}, …</b></p>`, a: 125 + b, hint: 'Think of cube numbers.', steps: [`n³${term(b) || ''}: next is 5³${term(b) || ''} = <b>${125 + b}</b>`] }; }
  ])();

  // ----- 2.8 Proportion -----
  G.proportion = () => {
    const t = pick([['x', 1, 'directly'], ['x²', 2, 'directly as the square of'], ['x³', 3, 'directly as the cube of'], ['√x', .5, 'directly as the square root of'], ['1/x', -1, 'inversely as'], ['1/x²', -2, 'inversely as the square of']]);
    const p = t[1]; const xs = p === .5 ? [pick([4, 9, 16, 25]), pick([36, 49, 64, 81, 100])] : p === 3 ? [rnd(1, 3), rnd(2, 5)] : [rnd(1, 6), rnd(2, 10)];
    if (xs[0] === xs[1]) xs[1]++;
    const k = pick([2, 3, 4, 5, 6, 12, 24, 36]); const f = x => k * Math.pow(x, p); const y1 = f(xs[0]), y2 = f(xs[1]);
    const res = { kind: 'num', q: `<p>y varies <b>${t[2]} x</b>. When x = ${xs[0]}, y = ${n(K.round(y1, 4))}.</p><p>Find y when x = ${xs[1]}.</p>`, hint: `Write y = k × ${t[0]}, find k from the first pair, then use it.`, steps: [`y = k${t[0].startsWith('1/') ? ' ÷ ' + t[0].slice(2) : ' × ' + t[0]}`, `${n(K.round(y1, 4))} = k${t[0].startsWith('1/') ? ' ÷ ' : ' × '}${n(Math.pow(xs[0], Math.abs(p)))} → k = ${k}`, `y = ${k}${t[0].startsWith('1/') ? ' ÷ ' : ' × '}${n(K.round(Math.pow(xs[1], Math.abs(p)), 4))} = <b>${n(K.round(y2, 4))}</b>`] };
    return Number.isInteger(y2 * 1000) ? Object.assign(res, { a: y2 }) : Object.assign(res, K.acc3(y2));
  };

  // ----- 2.9 Practical graphs -----
  G.speedTime = () => {
    const v = pick([10, 12, 15, 20, 24, 30]), t1 = pick([2, 4, 5, 6, 10]), t2 = pick([5, 10, 15, 20]), t3 = pick([2, 3, 4, 5, 6, 8]);
    const T = t1 + t2 + t3; const segs = [{ pts: [[0, 0], [t1, v], [t1 + t2, v], [T, 0]] }];
    const ask = pick(['dist', 'acc', 'dec']);
    const plot = K.plot([], [], { xmin: 0, xmax: T + 2, ymin: 0, ymax: v + 6, segs, gstep: T > 30 ? 5 : 2, lstep: T > 30 ? 10 : 4, h: 220, xlab: 't (s)', ylab: 'v (m/s)' });
    const dist = 0.5 * v * t1 + v * t2 + 0.5 * v * t3;
    if (ask === 'dist') return { kind: 'num', q: `<p>The speed–time graph shows a car's journey. It speeds up to ${v} m/s in ${t1} s, travels at ${v} m/s for ${t2} s, then slows to rest in ${t3} s.</p>${plot}<p>Find the <b>total distance</b> travelled.</p>`, a: dist, unit: 'm', hint: 'Distance = area under a speed–time graph. Split into triangles and a rectangle.', steps: [`Triangle: ½ × ${t1} × ${v} = ${0.5 * v * t1}`, `Rectangle: ${t2} × ${v} = ${v * t2}`, `Triangle: ½ × ${t3} × ${v} = ${0.5 * v * t3}`, `Total = <b>${n(dist)} m</b>`] };
    if (ask === 'acc') return { kind: 'num', q: `${plot}<p>The car reaches ${v} m/s after ${t1} s. Find its <b>acceleration</b> in the first ${t1} seconds.</p>`, a: v / t1, unit: 'm/s²', hint: 'Acceleration = gradient = change in speed ÷ time.', steps: [`${v} ÷ ${t1} = <b>${n(K.round(v / t1, 3))} m/s²</b>`] };
    return { kind: 'num', q: `${plot}<p>The car slows from ${v} m/s to rest in the last ${t3} s. Find its <b>deceleration</b>.</p>`, a: v / t3, unit: 'm/s²', hint: 'Deceleration = speed lost ÷ time.', ...(Number.isInteger(v / t3 * 100) ? {} : K.acc3(v / t3)), steps: [`${v} ÷ ${t3} = <b>${n(K.round(v / t3, 3))} m/s²</b>`] };
  };
  G.distTime = () => {
    const d1 = pick([10, 20, 30, 40]), t1 = pick([1, 2]), stop = pick([1, 2]), t3 = pick([1, 2, 3]);
    const segs = [{ pts: [[0, 0], [t1, d1], [t1 + stop, d1], [t1 + stop + t3, 0]] }];
    const plot = K.plot([], [], { xmin: 0, xmax: t1 + stop + t3 + 1, ymin: 0, ymax: d1 + 10, segs, gstep: d1 >= 30 ? 10 : 5, lstep: d1 >= 30 ? 10 : 10, h: 220, xlab: 'time (h)', ylab: 'km' });
    const back = Math.random() < .5;
    return back ? { kind: 'num', q: `<p>The distance–time graph shows a cyclist's trip from home and back.</p>${plot}<p>What was the speed on the way <b>home</b>?</p>`, a: d1 / t3, unit: 'km/h', hint: 'Speed = gradient of the line = distance ÷ time.', ...(Number.isInteger(d1 / t3 * 100) ? {} : K.acc3(d1 / t3)), steps: [`Distance ${d1} km in ${t3} h`, `${d1} ÷ ${t3} = <b>${n(K.round(d1 / t3, 2))} km/h</b>`] }
      : { kind: 'num', q: `<p>The distance–time graph shows a cyclist's trip.</p>${plot}<p>For how many hours did the cyclist <b>stop</b>?</p>`, a: stop, unit: 'h', hint: 'A flat (horizontal) line means no distance is covered: stopped.', steps: [`The flat part lasts from ${t1} to ${t1 + stop}: <b>${stop} h</b>`] };
  };

  // ----- 2.10 Graphs of functions -----
  G.tableValue = () => pick([
    () => { const a = pick([1, 2, -1]), b = nz(-4, 4), c = rnd(-5, 5), x = nz(-3, 3); const y = a * x ** 3 + b * x + c; return { kind: 'num', q: `<p>Complete the table of values for <b>y = ${poly([a, 0, b, c])}</b>.</p><p>Find y when x = ${n(x)}.</p>`, a: y, steps: [`${n(a)} × (${n(x)})³ + ${n(b)} × (${n(x)}) + ${n(c)}`, `= <b>${n(y)}</b>`] }; },
    () => { const a = pick([2, 4, 6, 12]), b = nz(-3, 3), x = pick([1, 2, 3, 4, -1, -2]); const y = a / x + b * x; return { kind: 'num', q: `<p>y = ${fr(a, 'x')} ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}x. Find y when x = ${n(x)}.</p>`, a: y, ...(Number.isInteger(y * 100) ? {} : K.acc3(y)), steps: [`${a} ÷ ${n(x)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} × ${n(x)}`, `= <b>${n(K.round(y, 3))}</b>`] }; },
    () => { const c = rnd(-3, 3), x = rnd(-2, 4); const y = Math.pow(2, x) + c; return { kind: 'num', q: `<p>y = 2<sup>x</sup> ${c < 0 ? '−' : '+'} ${Math.abs(c)}. Find y when x = ${n(x)}.</p>`, a: y, steps: [`2<sup>${n(x)}</sup> = ${n(Math.pow(2, x))}`, `y = <b>${n(y)}</b>`] }; }
  ])();
  G.graphRoots = () => {
    let p = rnd(-5, 4), q = rnd(-4, 5); if (p === q) q = p + 2;
    const k = Math.random() < .5 ? 0 : rnd(-3, 3);
    const f = x => (x - p) * (x - q); const lo = Math.min(p, q), hi = Math.max(p, q);
    // roots of f(x) = k shown on the graph: only ask k = 0 for exact integers
    return { kind: 'nums', q: `<p>The graph of <b>y = ${poly([1, -(p + q), p * q])}</b> is drawn below.</p>${K.plot([{ f }], [], { xmin: -7, xmax: 7, ymin: -8, ymax: 10, h: 250 })}<p>Use the graph to solve <b>${poly([1, -(p + q), p * q])} = 0</b>.</p>`, a: [p, q], show: `x = ${n(p)} or x = ${n(q)}`, ph: 'x = …, …', hint: 'The solutions are where the curve crosses the x-axis (y = 0).', steps: [`The curve crosses the x-axis at x = ${n(lo)} and x = ${n(hi)}`, `<b>x = ${n(p)} or x = ${n(q)}</b>`] };
  };

  // ----- 2.11 Sketching curves -----
  G.turningPoint = () => {
    if (Math.random() < .5) { const p = nz(-6, 6), q = rnd(-9, 9); return { kind: 'nums', ordered: true, q: `<p>Write down the coordinates of the turning point of <b class="bigq">y = (x${term(-p)})<sup>2</sup>${term(q) || ''}</b></p>`, a: [p, q], show: `(${n(p)}, ${n(q)})`, ph: '(x, y)', hint: 'In y = (x − a)² + b the turning point is (a, b). Watch the sign of a!', steps: [`(x${term(-p)})² is smallest (zero) when x = ${n(p)}`, `Then y = ${n(q)}: <b>(${n(p)}, ${n(q)})</b>`] }; }
    const p = nz(-5, 5), c = rnd(-10, 12); const q = c - p * p;
    return { kind: 'nums', ordered: true, q: `<p>By completing the square, find the turning point of <b class="bigq">y = ${poly([1, 2 * p, c])}</b></p>`, a: [-p, q], show: `(${n(-p)}, ${n(q)})`, ph: '(x, y)', hint: 'Write it as (x + a)² + b first.', steps: [`y = (x${term(p)})²${term(q) || ' + 0'}`, `Turning point: <b>(${n(-p)}, ${n(q)})</b> (a minimum)`] };
  };
  G.whichGraph = () => {
    const T = [['linear', 'y = 2x + 1', x => 2 * x + 1], ['quadratic', 'y = x<sup>2</sup> − 3', x => x * x - 3], ['cubic', 'y = x<sup>3</sup> − 4x', x => x ** 3 - 4 * x], ['reciprocal', 'y = ' + fr(2, 'x'), x => 2 / x], ['exponential', 'y = 2<sup>x</sup>', x => Math.pow(2, x)], ['negative quadratic', 'y = 4 − x<sup>2</sup>', x => 4 - x * x]];
    const pickT = pick(T);
    return { kind: 'mcq', q: `<p>Which equation could this be the graph of?</p>${K.plot([{ f: pickT[2] }], [], { xmin: -5, xmax: 5, ymin: -6, ymax: 8, h: 230 })}`, a: pickT[1], choices: mcq(pickT[1], K.shuffle(T.filter(t => t !== pickT).map(t => t[1]))), hint: 'Straight = linear; U or ∩ = quadratic; S-shape = cubic; two separate branches = reciprocal; shoots up on one side only = exponential.', steps: [`The shape is ${pickT[0]}: <b>${pickT[1]}</b>`] };
  };
  G.asymptote = () => {
    const a = nz(-6, 6), b = nz(-5, 5);
    return { kind: 'num', q: `<p>The graph of <b>y = ${fr(a, 'x')} ${b < 0 ? '−' : '+'} ${Math.abs(b)}</b> has a horizontal asymptote y = c. Find c.</p>`, a: b, ph: 'c = ', hint: `As x gets very large, ${fr(a, 'x')} gets closer and closer to 0.`, steps: [`${fr(a, 'x')} → 0 as x → ∞`, `So y → ${n(b)}: asymptote <b>y = ${n(b)}</b> (and the vertical asymptote is x = 0)`] };
  };

  // ----- 2.12 Functions -----
  G.fEval = () => pick([
    () => { const a = nz(-5, 6), b = nz(-9, 9), x = nz(-6, 6); return { kind: 'num', q: `<p>f(x) = ${poly([a, b])}. Find <b>f(${n(x)})</b>.</p>`, a: a * x + b, steps: [`${n(a)} × (${n(x)}) ${b < 0 ? '−' : '+'} ${Math.abs(b)} = <b>${n(a * x + b)}</b>`] }; },
    () => { const a = rnd(2, 4), c = nz(-9, 9), x = nz(-4, 4); return { kind: 'num', q: `<p>h(x) = ${a}x² ${c < 0 ? '−' : '+'} ${Math.abs(c)}. Find <b>h(${n(x)})</b>.</p>`, a: a * x * x + c, steps: [`${a} × (${n(x)})² ${c < 0 ? '−' : '+'} ${Math.abs(c)} = <b>${n(a * x * x + c)}</b>`] }; },
    () => { const a = nz(2, 6), b = nz(-9, 9), x = nz(-6, 8); return { kind: 'num', q: `<p>f(x) = ${poly([a, b])}. Solve <b>f(x) = ${n(a * x + b)}</b>.</p>`, a: x, ph: 'x = ', steps: [`${poly([a, b])} = ${n(a * x + b)}`, `x = <b>${n(x)}</b>`] }; }
  ])();
  G.fInverse = () => {
    const a = pick([2, 3, 4, 5]), b = nz(-9, 9);
    const right = fr(`x${term(-b)}`, a);
    return { kind: 'mcq', q: `<p>f(x) = ${poly([a, b])}. Find <b>f<sup>−1</sup>(x)</b>.</p>`, a: right, choices: mcq(right, [fr(`x${term(b)}`, a), `${a}x${term(-b)}`, fr(1, poly([a, b])), `${fr('x', a)}${term(-b)}`]), hint: 'Write y = f(x), swap x and y, then make y the subject.', steps: [`y = ${poly([a, b])}`, `Swap: x = ${poly([a, b], 'y')}`, `y = ${right}`, `<b>f<sup>−1</sup>(x) = ${right}</b>`] };
  };
  G.fComposite = () => {
    const a = nz(-4, 5), b = nz(-6, 6), c = rnd(1, 3), x = nz(-3, 3); const f = t => a * t + b, g = t => c * t * t;
    const fg = Math.random() < .5;
    const v = fg ? f(g(x)) : g(f(x));
    return { kind: 'num', q: `<p>f(x) = ${poly([a, b])} and g(x) = ${c === 1 ? '' : c}x².</p><p>Find <b>${fg ? 'fg' : 'gf'}(${n(x)})</b>.</p>`, a: v, hint: `${fg ? 'fg' : 'gf'}(x) means do ${fg ? 'g' : 'f'} first, then ${fg ? 'f' : 'g'}.`, steps: fg ? [`g(${n(x)}) = ${n(g(x))}`, `f(${n(g(x))}) = <b>${n(v)}</b>`] : [`f(${n(x)}) = ${n(f(x))}`, `g(${n(f(x))}) = <b>${n(v)}</b>`] };
  };

  R2O.addModule({
    id: 'algebra', name: 'Algebra and graphs', icon: '🔤', color: '#7c3aed', blurb: 'Syllabus section 2: expressions, equations, inequalities, sequences, proportion, graphs and functions.',
    book: ['Elementary Algebra 2e', 'https://openstax.org/details/books/elementary-algebra-2e'],
    lessons: [
      { id: 'a-intro', title: 'Letters and substitution', obj: ['2.1'], kw: 'substitution algebra',
        hook: 'Algebra uses letters for numbers we don\'t know yet, or for any number at all.',
        learn: [
          { h: 'Letters stand for numbers', b: `<p>3x means 3 × x. x² means x × x. ${fr('a', 'b')} means a ÷ b. ab means a × b.</p><p>"Think of a number, double it, add 5" is <b>2n + 5</b>.</p>` },
          { h: 'Substituting', b: `<p>Replace each letter with its value, <b>using brackets</b> for negatives. If x = −3: x² = (−3)² = 9, but −x² = −9.</p>`, check: { q: 'If x = −2, what is 3x² ?', opts: ['−12', '12', '36', '−36'], a: 1, why: '(−2)² = 4, then 3 × 4 = 12.' } }
        ],
        keys: ['3x = 3 × x; x² = x × x.', 'Substitute with brackets around negative values.', 'Follow BIDMAS after substituting.'],
        gens: ['subst'] },
      { id: 'a-expand', title: 'Simplifying and expanding', obj: ['2.2'], kw: 'expanding brackets collecting like terms',
        learn: [
          { h: 'Like terms', b: `<p>Only <b>like terms</b> (same letters, same powers) can be combined: 3x + 5x = 8x, but 3x + 5x² cannot be simplified.</p><p>2a² + 3ab − 1 + 5a² − 9ab + 4 = <b>7a² − 6ab + 3</b>.</p>` },
          { h: 'Expanding a single bracket', b: `<p>Multiply everything inside: 3x(2x − 4y) = <b>6x² − 12xy</b>.</p>` },
          { h: 'Double brackets', b: `<p>Each term times each term:</p><p>(x + 3)(x − 5) = x² − 5x + 3x − 15 = <b>x² − 2x − 15</b>.</p><p>For three brackets, expand two first, then multiply by the third.</p>`, check: { q: '(x + 4)(x + 2) = ?', opts: ['x² + 6x + 8', 'x² + 8x + 6', 'x² + 6x + 6', 'x² + 8'], a: 0, why: 'x² + 2x + 4x + 8.' } }
        ],
        keys: ['Combine only like terms.', 'Keep the sign in front of each term.', 'Double brackets: four multiplications, then collect.'],
        gens: ['collect', 'expand'] },
      { id: 'a-factor', title: 'Factorising', obj: ['2.2'], kw: 'factorising quadratics',
        hook: 'Factorising is expanding in reverse. It is the key to solving quadratics.',
        learn: [
          { h: 'Common factors', b: `<p>Take out the HCF: 9x² + 15xy = <b>3x(3x + 5y)</b>. "Factorise" means factorise <b>fully</b>.</p>` },
          { h: 'Quadratics x² + bx + c', b: `<p>Find two numbers that <b>multiply to c</b> and <b>add to b</b>.</p><p>x² + 7x + 12: 3 × 4 = 12, 3 + 4 = 7 → <b>(x + 3)(x + 4)</b>.</p>`, check: { q: 'Factorise x² − x − 6', opts: ['(x − 3)(x + 2)', '(x + 3)(x − 2)', '(x − 6)(x + 1)', '(x − 3)(x − 2)'], a: 0, why: '−3 × 2 = −6 and −3 + 2 = −1.' } },
          { h: 'Special forms', b: `<ul><li>Difference of two squares: a² − b² = (a − b)(a + b), e.g. 4x² − 9y² = (2x − 3y)(2x + 3y)</li><li>Perfect square: a² + 2ab + b² = (a + b)²</li><li>Grouping: ax + bx + kay + kby = (a + b)(x + ky)</li><li>Cubic: ax³ + bx² + cx = x(ax² + bx + c), then factorise the quadratic</li></ul>` }
        ],
        keys: ['Always take out common factors first.', 'x² + bx + c: two numbers multiply to c and add to b.', 'a² − b² = (a − b)(a + b).', 'Check by expanding.'],
        gens: ['factorCommon', 'factorQuad', 'factorGroup'] },
      { id: 'a-compsq', title: 'Completing the square', obj: ['2.2', '2.11'], kw: 'completing the square', widget: 'quadExplorer',
        learn: [
          { h: 'The idea', b: `<p>Write x² + bx + c as <b>(x + ${fr('b', 2)})² − (${fr('b', 2)})² + c</b>.</p><p>x² + 6x + 1 = (x + 3)² − 9 + 1 = <b>(x + 3)² − 8</b>.</p>`, check: { q: 'x² − 4x + 7 = ?', opts: ['(x − 2)² + 3', '(x − 4)² + 7', '(x − 2)² + 7', '(x + 2)² + 3'], a: 0, why: '(x − 2)² = x² − 4x + 4, and 7 − 4 = 3.' } },
          { h: 'Why it helps', b: `<p>(x + 3)² is never negative, so (x + 3)² − 8 is smallest when x = −3: the <b>turning point</b> is (−3, −8).</p><p>When a ≠ 1, take a out first: 2x² + 12x + 5 = 2(x² + 6x) + 5 = 2(x + 3)² − 13.</p>` }
        ],
        keys: ['Halve the coefficient of x.', 'Subtract the square of that half.', 'y = (x + p)² + q has turning point (−p, q).'],
        gens: ['compSq'] },
      { id: 'a-algfrac', title: 'Algebraic fractions', obj: ['2.3'], kw: 'algebraic fractions',
        learn: [
          { h: 'Same rules as number fractions', b: `<p>${fr('x', 3)} + ${fr('x', 4)} = ${fr('4x', 12)} + ${fr('3x', 12)} = <b>${fr('7x', 12)}</b>.</p><p>${fr('3a', 4)} × ${fr(10, '9a')} = ${fr('30a', '36a')} = ${fr(5, 6)}.</p>` },
          { h: 'Simplify by factorising', b: `<p>Factorise top and bottom, then cancel <b>whole brackets</b>:</p><p>${fr('x² − 2x', 'x² − 5x + 6')} = ${fr('x(x − 2)', '(x − 2)(x − 3)')} = <b>${fr('x', 'x − 3')}</b>.</p><p class="muted">Never cancel single terms from a sum.</p>`, check: { q: `Simplify ${fr('x² − 9', 'x − 3')}`, opts: ['x + 3', 'x − 3', 'x + 9', '3'], a: 0, why: 'x² − 9 = (x − 3)(x + 3).' } }
        ],
        keys: ['Add/subtract: common denominator.', 'Multiply: tops × tops; divide: flip and multiply.', 'Factorise first, then cancel whole factors.'],
        gens: ['algFracSimplify', 'algFracAdd'] },
      { id: 'a-ind2', title: 'Indices II', obj: ['2.4'], kw: 'solving exponential equations indices',
        learn: [
          { h: 'Laws with letters', b: `<p>x³ × x⁵ = x⁸ · x⁷ ÷ x² = x⁵ · (x³)⁴ = x¹² · (2x³)² = 4x⁶ · x<sup>−2</sup> = ${fr(1, 'x²')}.</p>` },
          { h: 'Solving index equations', b: `<p>Write both sides with the <b>same base</b>, then equate powers.</p><p>5<sup>x+1</sup> = 25<sup>x</sup> → 5<sup>x+1</sup> = 5<sup>2x</sup> → x + 1 = 2x → <b>x = 1</b>.</p>`, check: { q: 'Solve 2ˣ = 32', opts: ['4', '5', '16', '6'], a: 1, why: '32 = 2⁵.' } }
        ],
        keys: ['Same laws as number indices.', 'Index equations: make the bases match, then equate powers.', 'Logarithms are not required.'],
        gens: ['solveIndex', 'simplifyIndex'] },
      { id: 'a-linear', title: 'Linear equations', obj: ['2.5'], sg: true, kw: 'solving linear equations',
        hook: 'An equation is a balance. Whatever you do to one side, do to the other.',
        learn: [
          { h: 'Balance method', b: `<p>3x + 4 = 10 → subtract 4: 3x = 6 → divide by 3: <b>x = 2</b>.</p><p>5 − 2x = 3(x + 7) → 5 − 2x = 3x + 21 → −16 = 5x → x = −3.2.</p>` },
          { h: 'Fractions: multiply them away', b: `<p>${fr('x + 2', 2)} + ${fr('2x − 1', 3)} = 1: multiply every term by 6 → 3(x + 2) + 2(2x − 1) = 6 → 7x + 4 = 6 → x = ${fr(2, 7)}.</p>` },
          { h: 'Building equations: bar model', b: `<p>"Sam has 3 times as many marbles as Tia. Together they have 48."</p>${K.barModel([{ label: 'Tia', parts: [{ n: 1, color: 'var(--c1)' }] }, { label: 'Sam', parts: [{ n: 3, color: 'var(--c2)' }] }], { brace: { units: 3, text: '' } })}<p>4 units = 48 → 1 unit = 12. In algebra: x + 3x = 48, x = 12.</p>`, check: { q: 'Solve 4x − 7 = 2x + 5', opts: ['x = 6', 'x = −1', 'x = 2', 'x = 1'], a: 0, why: '2x = 12.' } }
        ],
        keys: ['Do the same to both sides.', 'Expand brackets, collect x on one side.', 'Fractions: multiply every term by the LCM of the denominators.', 'Word problems: name the unknown, write the equation.'],
        gens: ['linEq', 'fracEq', 'construct'] },
      { id: 'a-simul', title: 'Simultaneous equations', obj: ['2.5'], kw: 'simultaneous equations elimination',
        learn: [
          { h: 'Elimination', b: `<p>2x + y = 7 … (1)<br>3x − y = 8 … (2)</p><p>Add: 5x = 15, x = 3. Substitute in (1): 6 + y = 7, <b>y = 1</b>.</p>` },
          { h: 'Making coefficients match', b: `<p>3x + 2y = 12 and 5x − 3y = 1: multiply (1) by 3 and (2) by 2 so the y terms are 6y and −6y, then add.</p><p><b>Same signs → subtract. Different signs → add.</b></p>`, check: { q: 'x + y = 10 and x − y = 4. x = ?', opts: ['3', '6', '7', '14'], a: 2, why: 'Add: 2x = 14.' } },
          { h: 'Check your answer', b: `<p>Put both values into the <b>other</b> equation. If it works, you're right.</p>` }
        ],
        keys: ['Match one coefficient, then add or subtract to eliminate.', 'Same signs subtract; different signs add.', 'Substitute back to find the other letter; check in the other equation.'],
        gens: ['simul'] },
      { id: 'a-quad', title: 'Quadratic equations', obj: ['2.5'], kw: 'solving quadratic equations quadratic formula',
        learn: [
          { h: 'By factorising', b: `<p>x² − x − 12 = 0 → (x − 4)(x + 3) = 0 → <b>x = 4 or x = −3</b>.</p><p>If two things multiply to 0, one of them must be 0.</p><p class="muted">Rearrange to "= 0" first!</p>` },
          { h: 'Quadratic formula', b: `<p class="tri">x = ${fr('−b ± √(b² − 4ac)', '2a')}</p><p>This is given on the formula page. Use it when it won't factorise, or the question says "to 2 decimal places".</p>`, check: { q: 'For 2x² − 3x − 4 = 0, what is b² − 4ac?', opts: ['41', '−23', '23', '25'], a: 0, why: '9 − 4(2)(−4) = 9 + 32 = 41.' } },
          { h: 'By completing the square', b: `<p>x² + 6x + 2 = 0 → (x + 3)² − 7 = 0 → x + 3 = ±√7 → x = −3 ± √7. Answers can be left in surd form.</p>` }
        ],
        keys: ['Rearrange to ... = 0.', 'Factorise and set each bracket to 0.', 'Formula: x = (−b ± √(b² − 4ac)) / 2a (given).', 'Completing the square gives exact surd answers.'],
        gens: ['quadFactorSolve', 'quadFormula'] },
      { id: 'a-subject', title: 'Changing the subject', obj: ['2.5'], kw: 'changing the subject of a formula',
        learn: [
          { h: 'Undo in reverse order', b: `<p>v = u + at, make t the subject: subtract u → v − u = at → divide by a → <b>t = ${fr('v − u', 'a')}</b>.</p>` },
          { h: 'Powers and roots', b: `<p>A = πr² → ${fr('A', 'π')} = r² → r = ${K.sqrt(fr('A', 'π'))}.</p>` },
          { h: 'Subject appears twice', b: `<p>y = ${fr('x + 2', 'x − 3')}: multiply out: y(x − 3) = x + 2 → xy − 3y = x + 2 → xy − x = 3y + 2 → x(y − 1) = 3y + 2 → <b>x = ${fr('3y + 2', 'y − 1')}</b>.</p><p>Collect the subject's terms on one side, then <b>factorise</b> it out.</p>` }
        ],
        keys: ['Undo operations in reverse order.', 'Square to undo a root; root to undo a square.', 'Subject twice: collect, factorise, divide.'],
        gens: ['changeSubject'] },
      { id: 'a-ineq', title: 'Inequalities', obj: ['2.6'], kw: 'solving linear inequalities',
        learn: [
          { h: 'On a number line', b: `${K.numberLine(-4, 3, { range: { from: -3, to: 1, fromClosed: true, toClosed: false } })}<p>−3 ⩽ x &lt; 1: <b>closed</b> circle for ⩽ (included), <b>open</b> circle for &lt; (not included).</p>` },
          { h: 'Solving: like equations, one trap', b: `<p>3x &lt; 2x + 4 → <b>x &lt; 4</b>.</p><p>Multiplying or dividing by a <b>negative</b> number <b>flips the sign</b>: −2x &gt; 6 → x &lt; −3.</p>`, check: { q: 'Solve 5 − x ⩾ 2', opts: ['x ⩾ 3', 'x ⩽ 3', 'x ⩽ −3', 'x ⩾ −3'], a: 1, why: '−x ⩾ −3, divide by −1 and flip: x ⩽ 3.' } },
          { h: 'Regions on a graph', b: `<p>Broken line for &lt; or &gt;, solid line for ⩽ or ⩾. <b>Shade the unwanted region</b> unless told otherwise.</p>${K.plot([{ f: x => x / 2 + 1, dash: true }], [], { xmin: -4, xmax: 4, ymin: -3, ymax: 4, h: 200 })}<p class="muted small">y &lt; ½x + 1 is below the broken line.</p>` }
        ],
        keys: ['○ open for < >, ● closed for ⩽ ⩾.', 'Dividing by a negative flips the inequality.', 'Graphs: broken line for strict, solid for inclusive; shade what you don\'t want.', 'Linear programming is not included.'],
        gens: ['ineqSolve', 'ineqIntegers'] },
      { id: 'a-seq', title: 'Sequences', obj: ['2.7'], kw: 'nth term sequences',
        learn: [
          { h: 'Term-to-term rules', b: `<p>5, 8, 11, 14, … add 3 each time. 3, 6, 12, 24, … multiply by 2 (exponential).</p>` },
          { h: 'n-th term of a linear sequence', b: `<p>5, 8, 11, 14: difference 3 → <b>3n</b>. 3n gives 3, 6, 9… we need 2 more → <b>3n + 2</b>.</p>`, check: { q: 'n-th term of 7, 11, 15, 19?', opts: ['4n + 3', '4n + 7', 'n + 4', '3n + 4'], a: 0, why: 'Difference 4; 4 × 1 + 3 = 7.' } },
          { h: 'Other sequences', b: `<p>Squares 1, 4, 9, 16 (n²); cubes 1, 8, 27 (n³); 2, 4, 8, 16 (2ⁿ).</p><p>If the <b>second</b> differences are constant, it is quadratic: e.g. n² + 1 gives 2, 5, 10, 17.</p>` }
        ],
        keys: ['Linear: difference d → dn + (first term − d).', 'Quadratic: second differences constant.', 'Exponential: multiply by the same number.', 'Check: substitute n = 1, 2, 3.'],
        gens: ['nthTerm', 'seqTerm', 'nextTerm'] },
      { id: 'a-prop', title: 'Direct and inverse proportion', obj: ['2.8'], kw: 'direct and inverse proportion',
        learn: [
          { h: 'Direct proportion', b: `<p>y ∝ x means <b>y = kx</b>. y ∝ x² means y = kx². Double x → y doubles (or × 4 for x²).</p>` },
          { h: 'Inverse proportion', b: `<p>y ∝ ${fr(1, 'x')} means <b>y = ${fr('k', 'x')}</b>. Double x → y halves. More workers → fewer days.</p>` },
          { h: 'Method', b: `<ol><li>Write the equation with k.</li><li>Substitute the given pair to find k.</li><li>Use the equation to find the unknown.</li></ol><p>y ∝ x², y = 12 when x = 2: 12 = 4k, k = 3. When x = 5, y = 75.</p>`, check: { q: 'y ∝ 1/x and y = 6 when x = 2. y when x = 3?', opts: ['9', '4', '2', '12'], a: 1, why: 'k = 12, y = 12 ÷ 3 = 4.' } }
        ],
        keys: ['Direct: y = kxⁿ. Inverse: y = k / xⁿ.', 'Find k from the given values first.', 'You must know the ∝ symbol.'],
        gens: ['proportion'] },
      { id: 'a-practical', title: 'Travel and speed–time graphs', obj: ['2.9'], kw: 'distance time graphs speed time graphs',
        learn: [
          { h: 'Distance–time graphs', b: `<p><b>Gradient = speed.</b> A flat line means stopped. A steeper line means faster.</p>` },
          { h: 'Speed–time graphs', b: `<p><b>Gradient = acceleration</b> (negative gradient = deceleration). <b>Area under the graph = distance</b>.</p>${K.plot([], [], { xmin: 0, xmax: 22, ymin: 0, ymax: 16, segs: [{ pts: [[0, 0], [5, 12], [15, 12], [20, 0]] }], gstep: 2, lstep: 4, h: 180 })}<p class="muted small">Area = ½(5)(12) + 10(12) + ½(5)(12) = 180 m.</p>`, check: { q: 'On a speed–time graph, a horizontal line means…', opts: ['stopped', 'constant speed', 'accelerating', 'going backwards'], a: 1, why: 'Speed is not changing.' } },
          { h: 'Gradient of a curve', b: `<p>For a curved graph, draw a <b>tangent</b> at the point and find its gradient: rise ÷ run.</p>` }
        ],
        keys: ['Distance–time: gradient = speed.', 'Speed–time: gradient = acceleration, area = distance.', 'Split the area into triangles, rectangles and trapezia.'],
        gens: ['speedTime', 'distTime'] },
      { id: 'a-graphs', title: 'Graphs of functions', obj: ['2.10'], kw: 'plotting graphs of functions',
        learn: [
          { h: 'Table of values', b: `<p>For y = x³ + x − 4, substitute each x: x = 2 gives 8 + 2 − 4 = 6. Plot the points with crosses and join with a <b>smooth curve</b>.</p>` },
          { h: 'Solving equations with graphs', b: `<p>Solutions of f(x) = 0 are where the curve crosses the <b>x-axis</b>. To solve f(x) = k, draw the line y = k and read the x-values where it meets the curve.</p>${K.plot([{ f: x => x * x - 2 * x - 3 }, { f: () => 0, color: 'var(--muted)', dash: true }], [{ x: -1, y: 0 }, { x: 3, y: 0 }], { xmin: -3, xmax: 5, ymin: -5, ymax: 6, h: 200 })}`, check: { q: 'The curve y = x² − 2x − 3 above crosses the x-axis at…', opts: ['x = −1 and 3', 'x = 1 and −3', 'x = −3', 'x = 0'], a: 0 } },
          { h: 'Exponential graphs', b: `<p>y = a × bˣ grows (or decays) faster and faster. Growth problems: read values off the curve.</p>` }
        ],
        keys: ['Substitute carefully, especially negative x.', 'Plot with crosses; join curves smoothly.', 'Roots: where the curve meets the x-axis.', 'f(x) = k: where the curve meets y = k.'],
        gens: ['tableValue', 'graphRoots'] },
      { id: 'a-sketch', title: 'Sketching curves', obj: ['2.11'], kw: 'sketching graphs quadratic cubic reciprocal exponential', widget: 'quadExplorer',
        learn: [
          { h: 'Know the shapes', b: `<div class="shapes">${[['linear', x => x / 2 + 1], ['quadratic', x => x * x - 2], ['cubic', x => x ** 3 / 2 - 2 * x], ['reciprocal', x => 2 / x], ['exponential', x => Math.pow(2, x) - 1]].map(([nm, f]) => `<figure>${K.plot([{ f }], [], { xmin: -4, xmax: 4, ymin: -4, ymax: 5, w: 140, h: 140, lstep: 10 })}<figcaption>${nm}</figcaption></figure>`).join('')}</div>` },
          { h: 'Key features to show', b: `<ul><li><b>Roots</b> (x-intercepts) and the <b>y-intercept</b></li><li><b>Turning points</b>: from completing the square for quadratics</li><li><b>Asymptotes</b>: y = ${fr('a', 'x')} + b has x = 0 and y = b</li><li><b>Symmetry</b>: a parabola is symmetric about its turning point's x-value</li></ul>`, check: { q: 'y = 3/x + 2 has a horizontal asymptote at…', opts: ['y = 3', 'y = 2', 'x = 2', 'y = 0'], a: 1 } }
        ],
        keys: ['Linear / U-shaped / S-shaped / two branches / exponential: know them on sight.', 'y = (x − a)² + b: turning point (a, b).', 'Label intercepts and asymptotes on a sketch.'],
        gens: ['turningPoint', 'whichGraph', 'asymptote'] },
      { id: 'a-func', title: 'Functions', obj: ['2.12'], kw: 'functions inverse composite',
        hook: 'A function is a machine: put a number in, get exactly one number out.',
        learn: [
          { h: 'Notation, domain and range', b: `<p>f(x) = 3x − 5 means f(4) = 3(4) − 5 = 7. The <b>domain</b> is the set of inputs; the <b>range</b> is the set of outputs.</p>` },
          { h: 'Inverse functions', b: `<p>f<sup>−1</sup> undoes f. For f(x) = 3x − 5: y = 3x − 5 → swap → x = 3y − 5 → <b>f<sup>−1</sup>(x) = ${fr('x + 5', 3)}</b>.</p>`, check: { q: 'f(x) = 2x + 1. f⁻¹(7) = ?', opts: ['15', '3', '4', '6'], a: 1, why: 'Undo: (7 − 1) ÷ 2 = 3.' } },
          { h: 'Composite functions', b: `<p><b>gf(x) = g(f(x))</b>: do f first, then g. If f(x) = x + 2 and g(x) = x², gf(3) = g(5) = 25 but fg(3) = f(9) = 11.</p>` }
        ],
        keys: ['f(a): substitute a for x.', 'Inverse: swap x and y, make y the subject.', 'gf(x): f first, then g.', 'Domains and ranges of composite functions are not required.'],
        gens: ['fEval', 'fInverse', 'fComposite'] }
    ]
  });
})();
