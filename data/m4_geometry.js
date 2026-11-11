// Modules 3, 4, 5: Coordinate geometry (3.x), Geometry (4.x), Mensuration (5.x)
(() => {
  const K = R2O.K, G = R2O.GEN, W = R2O.WIDGETS, { rnd, nz, pick, mcq, n, fr, frs, poly, term } = K;
  const lineEq = (m, c) => { // y = mx + c with fractional m allowed as [p,q]
    if (Array.isArray(m)) { const [p, q] = m; const g = K.gcd(p, q); const P = p / g, Q = q / g; const mm = Q === 1 ? (P === 1 ? '' : P === -1 ? '−' : n(P)) : (P < 0 ? '−' : '') + fr(Math.abs(P), Q); return `y = ${P === 0 ? '' : mm + 'x'}${P === 0 ? n(c) : (c ? term(c) : '')}`; }
    return `y = ${m === 0 ? n(c) : (m === 1 ? '' : m === -1 ? '−' : n(m)) + 'x' + (c ? term(c) : '')}`;
  };

  // ======== 3 Coordinate geometry ========
  G.readPoint = () => {
    const x = rnd(-5, 5), y = rnd(-5, 5);
    return { kind: 'nums', ordered: true, q: `<p>Write down the coordinates of point P.</p>${K.plot([], [{ x, y, label: 'P' }], { xmin: -6, xmax: 6, ymin: -6, ymax: 6, h: 260, lstep: 1 })}`, a: [x, y], show: `(${n(x)}, ${n(y)})`, ph: '(x, y)', hint: 'Across first (x), then up or down (y).', steps: [`Across ${n(x)}, ${y >= 0 ? 'up' : 'down'} ${Math.abs(y)}: <b>(${n(x)}, ${n(y)})</b>`] };
  };
  G.onLine = () => {
    const m = nz(-4, 4), c = rnd(-6, 6), x = rnd(-4, 5); const on = Math.random() < .5; const y = m * x + c + (on ? 0 : nz(-3, 3));
    return { kind: 'mcq', q: `<p>Does the point <b>(${n(x)}, ${n(y)})</b> lie on the line <b>${lineEq(m, c)}</b>?</p>`, a: on ? 'Yes' : 'No', choices: ['Yes', 'No'], hint: 'Substitute the x-value and see if you get the y-value.', steps: [`x = ${n(x)}: y = ${n(m)} × ${n(x)}${term(c) || ''} = ${n(m * x + c)}`, `${on ? 'That matches' : `That is not ${n(y)}`}: <b>${on ? 'Yes' : 'No'}</b>`] };
  };
  G.gradient2 = () => {
    let x1 = rnd(-6, 6), y1 = rnd(-6, 6), x2 = rnd(-6, 6), y2 = rnd(-6, 6); while (x2 === x1) x2 = rnd(-6, 6);
    const dy = y2 - y1, dx = x2 - x1;
    return { kind: 'frac', q: `<p>Find the gradient of the line through <b>(${n(x1)}, ${n(y1)})</b> and <b>(${n(x2)}, ${n(y2)})</b>.</p>`, a: dy / dx, show: frs(dy, dx), ph: 'e.g. −3/2', hint: 'Gradient = change in y ÷ change in x.', steps: [`${fr(`${n(y2)} − (${n(y1)})`, `${n(x2)} − (${n(x1)})`)} = ${fr(n(dy), n(dx))}`, `= <b>${frs(dy, dx)}</b>`] };
  };
  G.midLen = () => {
    if (Math.random() < .5) { const x1 = rnd(-8, 8), y1 = rnd(-8, 8), x2 = x1 + 2 * rnd(-5, 5), y2 = y1 + 2 * rnd(-5, 5); return { kind: 'nums', ordered: true, q: `<p>Find the midpoint of the line joining <b>(${n(x1)}, ${n(y1)})</b> and <b>(${n(x2)}, ${n(y2)})</b>.</p>`, a: [(x1 + x2) / 2, (y1 + y2) / 2], show: `(${n((x1 + x2) / 2)}, ${n((y1 + y2) / 2)})`, ph: '(x, y)', hint: 'Average the x-values and average the y-values.', steps: [`x: (${n(x1)} + ${n(x2)}) ÷ 2 = ${n((x1 + x2) / 2)}`, `y: (${n(y1)} + ${n(y2)}) ÷ 2 = ${n((y1 + y2) / 2)}`] }; }
    const t = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]]); const x1 = rnd(-5, 5), y1 = rnd(-5, 5); const sx = pick([1, -1]), sy = pick([1, -1]);
    return { kind: 'num', q: `<p>Find the length of the line joining <b>(${n(x1)}, ${n(y1)})</b> and <b>(${n(x1 + sx * t[0])}, ${n(y1 + sy * t[1])})</b>.</p>`, a: t[2], hint: 'Draw a right-angled triangle and use Pythagoras: √(Δx² + Δy²).', steps: [`Δx = ${t[0]}, Δy = ${t[1]}`, `√(${t[0] * t[0]} + ${t[1] * t[1]}) = √${t[2] * t[2]} = <b>${t[2]}</b>`] };
  };
  G.eqLine = () => pick([
    () => { const m = nz(-5, 5), x1 = rnd(-4, 4), c = rnd(-8, 8); const y1 = m * x1 + c; const right = lineEq(m, c); return { kind: 'mcq', q: `<p>Find the equation of the line with gradient <b>${n(m)}</b> passing through <b>(${n(x1)}, ${n(y1)})</b>.</p>`, a: right, choices: mcq(right, [lineEq(m, y1), lineEq(m, -c), lineEq(-m, c), lineEq(m, c + m)]), hint: 'Use y = mx + c and substitute the point to find c.', steps: [`${n(y1)} = ${n(m)} × ${n(x1)} + c`, `c = ${n(c)}`, `<b>${right}</b>`] }; },
    () => { let a = nz(-6, 6), b = nz(-6, 6); const c = nz(-12, 12); const mm = [-a, b]; const g = K.gcd(a, b); return { kind: 'frac', q: `<p>Find the gradient of the line <b>${poly([a, 0]).replace('x', 'x')} ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${n(c)}</b>.</p>`, a: -a / b, show: frs(-a, b), ph: 'e.g. −5/4', hint: 'Rearrange into y = mx + c.', steps: [`${n(b)}y = ${n(-a)}x${term(c)}`, `y = ${fr(n(-a), n(b))}x + …`, `Gradient = <b>${frs(-a, b)}</b>`] }; },
    () => { const x1 = rnd(-4, 2), x2 = x1 + rnd(1, 4), m = nz(-3, 3), c = rnd(-5, 5); const y1 = m * x1 + c, y2 = m * x2 + c; const right = lineEq(m, c); return { kind: 'mcq', q: `<p>Find the equation of the line through <b>(${n(x1)}, ${n(y1)})</b> and <b>(${n(x2)}, ${n(y2)})</b>.</p>`, a: right, choices: mcq(right, [lineEq(-m, c), lineEq(m, -c), lineEq(m, y1), lineEq(K.round(1 / m, 2), c)]), hint: 'Gradient first, then substitute one point to find c.', steps: [`m = ${fr(n(y2 - y1), n(x2 - x1))} = ${n(m)}`, `c: ${n(y1)} = ${n(m)}(${n(x1)}) + c → c = ${n(c)}`, `<b>${right}</b>`] }; }
  ])();
  G.parPerp = () => {
    const m = nz(-4, 4), c = rnd(-6, 6), x1 = rnd(-4, 4), y1 = rnd(-6, 6);
    if (Math.random() < .5) { const nc = y1 - m * x1; const right = lineEq(m, nc); return { kind: 'mcq', q: `<p>Find the equation of the line <b>parallel</b> to <b>${lineEq(m, c)}</b> that passes through <b>(${n(x1)}, ${n(y1)})</b>.</p>`, a: right, choices: mcq(right, [lineEq(m, c), lineEq(-m, nc), lineEq([-1, m], y1), lineEq(m, y1 + m * x1)]), hint: 'Parallel lines have the same gradient.', steps: [`Gradient ${n(m)}`, `${n(y1)} = ${n(m)}(${n(x1)}) + c → c = ${n(nc)}`, `<b>${right}</b>`] }; }
    return { kind: 'frac', q: `<p>Find the gradient of a line <b>perpendicular</b> to <b>${lineEq(m, c)}</b>.</p>`, a: -1 / m, show: frs(-1, m), ph: 'e.g. −1/3', hint: 'Perpendicular gradients multiply to −1: flip and change the sign.', steps: [`Gradient ${n(m)}`, `Perpendicular: −1 ÷ ${n(m)} = <b>${frs(-1, m)}</b>`] };
  };
  W.lineExplorer = el => {
    el.innerHTML = `<div class="sliders"><label>gradient m = <b class="mv"></b><input type="range" min="-4" max="4" step="0.5" value="1" class="m"></label><label>intercept c = <b class="cv"></b><input type="range" min="-5" max="5" step="1" value="2" class="c"></label></div><div class="out"></div>`;
    const M = el.querySelector('.m'), C = el.querySelector('.c'), out = el.querySelector('.out');
    const draw = () => { const m = +M.value, c = +C.value; el.querySelector('.mv').textContent = m; el.querySelector('.cv').textContent = c;
      out.innerHTML = K.plot([{ f: x => m * x + c }, { f: x => m * x, color: 'var(--muted)', dash: true }], [{ x: 0, y: c, label: `(0, ${c})` }], { xmin: -6, xmax: 6, ymin: -6, ymax: 6, h: 260 }) + `<p class="center bigq">${lineEq(m, c)}</p><p class="center muted small">${m > 0 ? 'Positive gradient: uphill ↗' : m < 0 ? 'Negative gradient: downhill ↘' : 'Zero gradient: flat'} · the dashed line is parallel (same m)</p>`; };
    M.oninput = C.oninput = draw; draw();
  };

  R2O.addModule({
    id: 'coord', name: 'Coordinate geometry', icon: '📈', color: '#0891b2', blurb: 'Syllabus section 3: coordinates, straight-line graphs, gradient, length, midpoint, parallel and perpendicular lines.',
    book: ['Elementary Algebra 2e', 'https://openstax.org/details/books/elementary-algebra-2e'],
    lessons: [
      { id: 'c-coords', title: 'Coordinates and straight lines', obj: ['3.1', '3.2'], kw: 'coordinates plotting straight line graphs',
        learn: [
          { h: 'Plotting points', b: `<p>(x, y): <b>across</b> first, then <b>up</b>. "Along the corridor, then up the stairs."</p>${K.plot([], [{ x: 3, y: 2, label: '(3, 2)' }, { x: -4, y: -1, label: '(−4, −1)' }], { xmin: -5, xmax: 5, ymin: -4, ymax: 4, h: 200, lstep: 1 })}` },
          { h: 'Drawing a line from its equation', b: `<p>For y = −2x + 5, make a table: x = 0 → 5, x = 1 → 3, x = 2 → 1. Plot and join with a ruler.</p><p>For 3x + 2y = 5, either rearrange to y = … or find where it crosses each axis.</p>`, check: { q: 'Which point is on y = 2x − 1?', opts: ['(2, 3)', '(3, 2)', '(0, 1)', '(1, 2)'], a: 0, why: '2 × 2 − 1 = 3.' } }
        ],
        keys: ['(x, y): across then up.', 'Make a table of at least 3 points to draw a line.', 'A point lies on a line if its coordinates satisfy the equation.'],
        gens: ['readPoint', 'onLine'] },
      { id: 'c-grad', title: 'Gradient', obj: ['3.3'], kw: 'gradient of a line', widget: 'lineExplorer',
        learn: [
          { h: 'Rise over run', b: `<p class="tri">gradient = ${fr('change in y', 'change in x')} = ${fr('y₂ − y₁', 'x₂ − x₁')}</p><p>Through (1, 2) and (4, 11): ${fr(9, 3)} = <b>3</b>.</p>` },
          { h: 'Sign of the gradient', b: `<p>Positive ↗ uphill, negative ↘ downhill, zero → horizontal. Vertical lines (x = k) have no gradient.</p>`, check: { q: 'Gradient through (0, 5) and (2, 1)?', opts: ['2', '−2', '½', '−½'], a: 1, why: '(1 − 5) ÷ (2 − 0) = −2.' } }
        ],
        keys: ['Gradient = Δy ÷ Δx.', 'Keep the points in the same order on top and bottom.', 'Downhill lines have negative gradients.'],
        gens: ['gradient2'] },
      { id: 'c-midlen', title: 'Length and midpoint', obj: ['3.4'], kw: 'midpoint and length of a line segment',
        learn: [
          { h: 'Midpoint', b: `<p>Average the coordinates: midpoint of (2, 3) and (8, −5) = (${fr('2 + 8', 2)}, ${fr('3 + (−5)', 2)}) = <b>(5, −1)</b>.</p>` },
          { h: 'Length', b: `<p>Make a right-angled triangle and use Pythagoras: length = √((x₂ − x₁)² + (y₂ − y₁)²).</p><p>(1, 2) to (4, 6): √(3² + 4²) = √25 = <b>5</b>.</p>`, check: { q: 'Midpoint of (0, 0) and (6, 10)?', opts: ['(3, 5)', '(6, 10)', '(5, 3)', '(12, 20)'], a: 0 } }
        ],
        keys: ['Midpoint: average the x\'s and the y\'s.', 'Length: Pythagoras on the differences.'],
        gens: ['midLen'] },
      { id: 'c-eq', title: 'Equation of a straight line', obj: ['3.5'], kw: 'equation of a straight line y=mx+c', widget: 'lineExplorer',
        learn: [
          { h: 'y = mx + c', b: `<p><b>m</b> is the gradient and <b>c</b> is the y-intercept (where it crosses the y-axis).</p><p>y = 3x − 2: gradient 3, crosses at (0, −2).</p>` },
          { h: 'Other forms', b: `<p>5x + 4y = 8 → 4y = −5x + 8 → y = −${fr(5, 4)}x + 2. Gradient −${fr(5, 4)}, intercept 2.</p><p>x = k is a vertical line; y = k is horizontal.</p>` },
          { h: 'Finding the equation', b: `<ol><li>Find the gradient m.</li><li>Substitute a point into y = mx + c to find c.</li><li>Write it fully simplified.</li></ol>`, check: { q: 'Gradient 2 through (1, 7). c = ?', opts: ['5', '7', '9', '2'], a: 0, why: '7 = 2(1) + c.' } }
        ],
        keys: ['y = mx + c: m gradient, c y-intercept.', 'Rearrange ax + by = c into y = … to read m.', 'Find m, then substitute a point for c.'],
        gens: ['eqLine'] },
      { id: 'c-parperp', title: 'Parallel and perpendicular lines', obj: ['3.6', '3.7'], kw: 'parallel and perpendicular lines gradient',
        learn: [
          { h: 'Parallel: same gradient', b: `<p>y = 4x − 1 and y = 4x + 7 are parallel. Through (1, −3): −3 = 4 + c → <b>y = 4x − 7</b>.</p>` },
          { h: 'Perpendicular: m₁ × m₂ = −1', b: `<p>Flip the gradient and change its sign: perpendicular to gradient ${fr(3, 2)} is <b>−${fr(2, 3)}</b>.</p>${K.plot([{ f: x => 1.5 * x }, { f: x => -x / 1.5 }], [], { xmin: -4, xmax: 4, ymin: -4, ymax: 4, h: 200 })}`, check: { q: 'Perpendicular to y = −4x + 1, the gradient is…', opts: ['4', '¼', '−¼', '−4'], a: 1, why: '−1 ÷ −4 = ¼.' } },
          { h: 'Perpendicular bisector', b: `<p>The line through the <b>midpoint</b> of AB, perpendicular to AB. For (−3, 8) and (9, −2): midpoint (3, 3), gradient of AB = −${fr(5, 6)}, so the bisector has gradient ${fr(6, 5)}.</p>` }
        ],
        keys: ['Parallel lines: equal gradients.', 'Perpendicular: gradients multiply to −1.', 'Perpendicular bisector: midpoint + perpendicular gradient.'],
        gens: ['parPerp'] }
    ]
  });

  // ======== 4 Geometry ========
  G.shapeName = () => {
    const S = pick([['kite', 'Two pairs of equal adjacent sides; one line of symmetry; diagonals cross at right angles.'], ['rhombus', 'Four equal sides; opposite sides parallel; diagonals bisect each other at right angles.'], ['parallelogram', 'Opposite sides equal and parallel; no lines of symmetry; rotational symmetry of order 2.'], ['trapezium', 'Exactly one pair of parallel sides.'], ['rectangle', 'Four right angles; opposite sides equal; two lines of symmetry.'], ['isosceles triangle', 'Two equal sides and two equal angles.'], ['scalene triangle', 'No equal sides and no equal angles.'], ['regular hexagon', 'Six equal sides and six equal angles of 120°.']]);
    const all = ['kite', 'rhombus', 'parallelogram', 'trapezium', 'rectangle', 'square', 'isosceles triangle', 'scalene triangle', 'regular hexagon', 'regular pentagon'];
    return { kind: 'mcq', q: `<p>Which shape is this?</p><p class="bigq small">${S[1]}</p>`, a: S[0], choices: mcq(S[0], K.shuffle(all.filter(x => x !== S[0]))), steps: [`<b>${S[0]}</b>: ${S[1]}`] };
  };
  G.angleType = () => {
    const a = pick([rnd(5, 85), 90, rnd(95, 175), 180, rnd(185, 355)]); const t = a < 90 ? 'acute' : a === 90 ? 'right angle' : a < 180 ? 'obtuse' : a === 180 ? 'straight line' : 'reflex';
    return { kind: 'mcq', q: `<p>What type of angle is <b class="bigq">${a}°</b>?</p>`, a: t, choices: mcq(t, ['acute', 'right angle', 'obtuse', 'reflex', 'straight line'].filter(x => x !== t)), steps: ['Acute < 90° · right = 90° · obtuse 90°–180° · reflex > 180°', `<b>${t}</b>`] };
  };
  G.bearing = () => {
    if (Math.random() < .5) { const b = rnd(1, 359); const back = (b + 180) % 360; return { kind: 'num', q: `<p>The bearing of B from A is <b>${String(b).padStart(3, '0')}°</b>. Find the bearing of A from B.</p>`, a: back, unit: '°', show: String(back).padStart(3, '0'), hint: 'Back bearing: add 180° (or subtract 180° if the bearing is over 180°).', steps: [`${b} ${b < 180 ? '+' : '−'} 180 = <b>${String(back).padStart(3, '0')}°</b>`] }; }
    const d = pick([['due east', 90], ['due south', 180], ['due west', 270], ['north-east', 45], ['south-west', 225], ['south-east', 135], ['north-west', 315]]);
    return { kind: 'num', q: `<p>Town Q is <b>${d[0]}</b> of town P. What is the bearing of Q from P?</p>`, a: d[1], unit: '°', show: String(d[1]).padStart(3, '0'), hint: 'Bearings are measured clockwise from north, with 3 figures.', steps: [`Clockwise from north to ${d[0]}: <b>${String(d[1]).padStart(3, '0')}°</b>`] };
  };
  G.scaleDraw = () => {
    const s = pick([[1, 50, 'cm', 'm'], [1, 200, 'cm', 'm'], [2, 1, 'cm', 'km']]); const cm = rnd(2, 14) + pick([0, 0.5]);
    if (s[3] === 'km') { const km = cm / 2; return { kind: 'num', q: `<p>A scale drawing uses <b>2 cm to represent 1 km</b>. A road is ${n(cm)} cm long on the drawing. How long is the real road?</p>`, a: km, unit: 'km', steps: [`${n(cm)} ÷ 2 = <b>${n(km)} km</b>`] }; }
    const m = cm * s[1] / 100;
    return { kind: 'num', q: `<p>A plan has scale <b>1 : ${s[1]}</b>. A wall is ${n(cm)} cm long on the plan. Find its real length in metres.</p>`, a: m, unit: 'm', steps: [`${n(cm)} × ${s[1]} = ${n(cm * s[1])} cm`, `÷ 100 = <b>${n(m)} m</b>`] };
  };
  G.similar = () => {
    if (Math.random() < .5) { const a = rnd(3, 9), k = pick([1.5, 2, 2.5, 3, 4]), b = rnd(4, 12); return { kind: 'num', q: `<p>Triangles ABC and PQR are similar. AB = ${a} cm and PQ = ${n(a * k)} cm. BC = ${b} cm. Find QR.</p>`, a: b * k, unit: 'cm', hint: 'Find the scale factor from a pair of matching sides.', steps: [`Scale factor = ${n(a * k)} ÷ ${a} = ${n(k)}`, `QR = ${b} × ${n(k)} = <b>${n(b * k)} cm</b>`] }; }
    const k = pick([2, 3, 4, 5]), what = pick(['area', 'volume']); const v = what === 'area' ? rnd(3, 20) : rnd(2, 15);
    return { kind: 'num', q: `<p>Two similar ${what === 'area' ? 'shapes' : 'solids'}: the larger is ${k} times as long as the smaller. The smaller has ${what} ${v} ${what === 'area' ? 'cm²' : 'cm³'}.</p><p>Find the ${what} of the larger.</p>`, a: v * k ** (what === 'area' ? 2 : 3), unit: what === 'area' ? 'cm²' : 'cm³', hint: `Length factor k → area factor k², volume factor k³.`, steps: [`${what === 'area' ? 'Area' : 'Volume'} factor = ${k}${what === 'area' ? '²' : '³'} = ${k ** (what === 'area' ? 2 : 3)}`, `${v} × ${k ** (what === 'area' ? 2 : 3)} = <b>${v * k ** (what === 'area' ? 2 : 3)}</b>`] };
  };
  G.symmetry = () => {
    const S = pick([['square', 4, 4], ['rectangle', 2, 2], ['rhombus', 2, 2], ['parallelogram', 0, 2], ['kite', 1, 1], ['isosceles trapezium', 1, 1], ['equilateral triangle', 3, 3], ['isosceles triangle', 1, 1], ['regular pentagon', 5, 5], ['regular hexagon', 6, 6], ['regular octagon', 8, 8]]);
    const askLines = Math.random() < .5;
    return { kind: 'num', q: `<p>How many ${askLines ? '<b>lines of symmetry</b>' : 'is the <b>order of rotational symmetry</b> of'} ${askLines ? 'does a' : 'a'} <b>${S[0]}</b>${askLines ? ' have' : ''}?</p>`, a: askLines ? S[1] : S[2], hint: askLines ? 'Imagine folding it so the halves match exactly.' : 'How many times does it look the same in one full turn?', steps: [`A ${S[0]}: ${S[1]} line${S[1] === 1 ? '' : 's'} of symmetry, rotational order ${S[2]}.`] };
  };
  G.angleFacts = () => pick([
    () => { const a = rnd(20, 160); return { kind: 'num', q: `<p>Two angles on a straight line are ${a}° and x°. Find x.</p>`, a: 180 - a, unit: '°', steps: [`Angles on a straight line add to 180°`, `x = 180 − ${a} = <b>${180 - a}°</b>`] }; },
    () => { const a = rnd(60, 150), b = rnd(40, 300 - a - 20); const c = 360 - a - b; return { kind: 'num', q: `<p>Three angles meet at a point: ${a}°, ${b}° and x°. Find x.</p>`, a: c, unit: '°', steps: [`Angles at a point add to 360°`, `x = 360 − ${a} − ${b} = <b>${c}°</b>`] }; },
    () => { const a = rnd(20, 80), b = rnd(30, 150 - a); return { kind: 'num', q: `<p>A triangle has angles ${a}°, ${b}° and x°. Find x.</p>${K.triangle({ angA: a + '°', angB: b + '°', angC: 'x' })}`, a: 180 - a - b, unit: '°', steps: [`Angles in a triangle add to 180°`, `x = 180 − ${a} − ${b} = <b>${180 - a - b}°</b>`] }; },
    () => { const a = rnd(30, 75); return { kind: 'num', q: `<p>An isosceles triangle has two equal angles of ${a}°. Find the third angle.</p>`, a: 180 - 2 * a, unit: '°', steps: [`180 − 2 × ${a} = <b>${180 - 2 * a}°</b>`] }; },
    () => { const a = rnd(50, 120), b = rnd(50, 120), c = rnd(50, 330 - a - b - 30); return { kind: 'num', q: `<p>A quadrilateral has angles ${a}°, ${b}°, ${c}° and x°. Find x.</p>`, a: 360 - a - b - c, unit: '°', steps: [`Angles in a quadrilateral add to 360°`, `x = 360 − ${a} − ${b} − ${c} = <b>${360 - a - b - c}°</b>`] }; }
  ])();
  G.parallelAngles = () => {
    const a = rnd(35, 145); const k = pick([['corresponding', 'tr', 'TR', a], ['alternate', 'br', 'TL', a], ['co-interior', 'br', 'TR', 180 - a], ['vertically opposite', 'tr', 'bl', a]]);
    return { kind: 'num', q: `<p>The two horizontal lines are parallel. Find <b>x</b>.</p>${K.parallel({ pos: k[1], text: a + '°' }, { pos: k[2], text: 'x' })}`, a: k[3], unit: '°', hint: 'Corresponding (F) and alternate (Z) angles are equal; co-interior (C) angles add to 180°.', steps: [`These are <b>${k[0]}</b> angles`, `x = <b>${k[3]}°</b>`] };
  };
  G.polygon = () => pick([
    () => { const nn = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]); return { kind: 'num', q: `<p>Find the size of one <b>interior</b> angle of a regular polygon with ${nn} sides.</p>`, a: 180 - 360 / nn, unit: '°', hint: 'Exterior angle = 360 ÷ n. Interior = 180 − exterior.', steps: [`Exterior = 360 ÷ ${nn} = ${n(360 / nn)}°`, `Interior = 180 − ${n(360 / nn)} = <b>${n(180 - 360 / nn)}°</b>`] }; },
    () => { const nn = pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 36]); return { kind: 'num', q: `<p>Each exterior angle of a regular polygon is ${n(360 / nn)}°. How many sides does it have?</p>`, a: nn, hint: 'Exterior angles add to 360°.', steps: [`n = 360 ÷ ${n(360 / nn)} = <b>${nn}</b>`] }; },
    () => { const nn = rnd(5, 12); return { kind: 'num', q: `<p>Find the <b>sum</b> of the interior angles of a polygon with ${nn} sides.</p>`, a: (nn - 2) * 180, unit: '°', hint: 'A polygon with n sides splits into (n − 2) triangles.', steps: [`(${nn} − 2) × 180 = <b>${(nn - 2) * 180}°</b>`] }; }
  ])();
  G.circleTheorem = () => pick([
    () => { const x = rnd(20, 80); return { kind: 'num', q: `<p>O is the centre. The angle at the circumference ACB is ${x}°. Find the angle AOB at the centre.</p>${K.circleThm('centre')}`, a: 2 * x, unit: '°', hint: 'The angle at the centre is twice the angle at the circumference.', steps: [`2 × ${x} = <b>${2 * x}°</b> (angle at centre = 2 × angle at circumference)`] }; },
    () => { const a = rnd(55, 125); return { kind: 'num', q: `<p>ABCD is a cyclic quadrilateral. Angle DAB = ${a}°. Find angle BCD.</p>${K.circleThm('cyclic')}`, a: 180 - a, unit: '°', hint: 'Opposite angles of a cyclic quadrilateral add to 180°.', steps: [`180 − ${a} = <b>${180 - a}°</b>`] }; },
    () => { const a = rnd(20, 70); return { kind: 'num', q: `<p>AB is a diameter of the circle and C is on the circumference. Angle CAB = ${a}°. Find angle CBA.</p>${K.circleThm('semicircle')}`, a: 90 - a, unit: '°', hint: 'The angle in a semicircle (at C) is 90°.', steps: [`Angle ACB = 90° (angle in a semicircle)`, `CBA = 180 − 90 − ${a} = <b>${90 - a}°</b>`] }; },
    () => { const x = rnd(25, 75); return { kind: 'num', q: `<p>C and D are on the circumference, on the same side of chord AB. Angle ACB = ${x}°. Find angle ADB.</p>${K.circleThm('segment')}`, a: x, unit: '°', hint: 'Angles in the same segment are equal.', steps: [`<b>${x}°</b> (angles in the same segment)`] }; },
    () => { const x = rnd(20, 70); return { kind: 'num', q: `<p>PT is a tangent to the circle at T, and O is the centre. Angle OPT = ${x}°. Find angle POT.</p>${K.circleThm('tangent')}`, a: 90 - x, unit: '°', hint: 'The angle between a tangent and a radius is 90°.', steps: [`Angle OTP = 90° (tangent ⟂ radius)`, `POT = 180 − 90 − ${x} = <b>${90 - x}°</b>`] }; }
  ])();
  G.circleSym = () => {
    if (Math.random() < .5) { const t = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]); return { kind: 'num', q: `<p>A circle has radius ${t[2]} cm. A chord is ${2 * t[1]} cm long. How far is the chord from the centre?</p>`, a: t[0], unit: 'cm', hint: 'The perpendicular from the centre bisects the chord. Use Pythagoras with half the chord.', steps: [`Half the chord: ${t[1]} cm`, `√(${t[2]}² − ${t[1]}²) = √${t[0] * t[0]} = <b>${t[0]} cm</b>`] }; }
    const pa = rnd(5, 20); return { kind: 'num', q: `<p>PA and PB are tangents from an external point P. PA = ${pa} cm. Find PB.</p>${K.circleThm('tangents')}`, a: pa, unit: 'cm', steps: [`Tangents from an external point are equal: <b>${pa} cm</b>`] };
  };
  W.polyAngles = el => {
    el.innerHTML = `<label class="field">Number of sides: <b class="nv"></b><input type="range" min="3" max="12" value="6" class="ns"></label><div class="out"></div>`;
    const s = el.querySelector('.ns'), out = el.querySelector('.out');
    const draw = () => { const k = +s.value; el.querySelector('.nv').textContent = k; out.innerHTML = K.ngon(k, '') + `<p class="center">Sum of interior angles = (${k} − 2) × 180 = <b>${(k - 2) * 180}°</b><br>Each interior angle = <b>${n(K.round(180 - 360 / k, 2))}°</b> · each exterior angle = <b>${n(K.round(360 / k, 2))}°</b></p>`; };
    s.oninput = draw; draw();
  };

  R2O.addModule({
    id: 'geometry', name: 'Geometry', icon: '📐', color: '#ea580c', blurb: 'Syllabus section 4: terms, constructions, bearings, similarity, symmetry, angles and circle theorems.',
    book: ['Prealgebra 2e (geometry chapter)', 'https://openstax.org/details/books/prealgebra-2e'],
    lessons: [
      { id: 'g-terms', title: 'Geometrical terms and shapes', obj: ['4.1'], kw: 'types of angles quadrilaterals properties',
        learn: [
          { h: 'Angles', b: `<p><b>Acute</b> &lt; 90° · <b>right</b> = 90° · <b>obtuse</b> 90°–180° · <b>reflex</b> &gt; 180°.</p><p>Parallel lines never meet; perpendicular lines meet at 90°.</p>` },
          { h: 'Triangles and quadrilaterals', b: `<ul><li>Triangles: equilateral, isosceles, scalene, right-angled</li><li>Square, rectangle, rhombus (4 equal sides), parallelogram, kite, trapezium (one pair of parallel sides)</li></ul>`, check: { q: 'A quadrilateral with exactly one pair of parallel sides is a…', opts: ['kite', 'trapezium', 'rhombus', 'parallelogram'], a: 1 } },
          { h: 'Circles and solids', b: `<p>Circle: centre, radius, diameter, circumference, chord, tangent, arc (major/minor), sector, segment.</p><p>Solids: cube, cuboid, prism, cylinder, pyramid, cone, sphere, hemisphere, frustum (a cone with its top cut off).</p><p><b>Congruent</b> = identical shape and size. <b>Similar</b> = same shape, different size.</p>` }
        ],
        keys: ['Know the angle types and the special quadrilaterals.', 'Know circle vocabulary: chord, tangent, sector, segment, arc.', 'Congruent: same shape and size. Similar: same shape.'],
        gens: ['shapeName', 'angleType'] },
      { id: 'g-bearings', title: 'Constructions, scale drawings and bearings', obj: ['4.2', '4.3'], kw: 'three figure bearings scale drawing',
        learn: [
          { h: 'Constructing a triangle (SSS)', b: `<p>Draw one side with a ruler. Set your compasses to the second length and draw an arc from one end; repeat with the third length from the other end. Where the arcs cross is the third vertex. <b>Leave your arcs showing.</b></p>` },
          { h: 'Nets', b: `<p>A net is a flat shape that folds into a solid. A cube has 11 different nets. Use measurements from a net to find surface area.</p>` },
          { h: 'Three-figure bearings', b: `<p>Measured <b>clockwise from north</b>, always 3 figures: east = 090°, south = 180°, west = 270°.</p><p><b>Back bearing</b>: the bearing of A from B = bearing of B from A ± 180°. If B from A is 025°, A from B is 205°.</p>`, check: { q: 'Bearing of B from A is 300°. Bearing of A from B?', opts: ['120°', '060°', '480°', '030°'], a: 0, why: '300 − 180 = 120.' } }
        ],
        keys: ['Constructions: show your arcs.', 'Bearings: clockwise from north, 3 figures.', 'Back bearing: ± 180°.', 'Constructing perpendicular or angle bisectors is not required.'],
        gens: ['bearing', 'scaleDraw'] },
      { id: 'g-similar', title: 'Similarity', obj: ['4.4'], kw: 'similar shapes area and volume scale factor',
        learn: [
          { h: 'Similar shapes', b: `<p>Same angles; all sides in the same ratio (the <b>scale factor</b> k). Two triangles are similar if their angles are equal.</p>` },
          { h: 'Area and volume factors', b: `<p>Length × k → area × <b>k²</b> → volume × <b>k³</b>.</p><p>Twice as long: 4 times the area, 8 times the volume.</p>`, check: { q: 'Lengths × 3. Volume is multiplied by…', opts: ['3', '6', '9', '27'], a: 3, why: '3³ = 27.' } }
        ],
        keys: ['Scale factor k = new length ÷ old length.', 'Area factor k², volume factor k³.', 'Show triangles are similar using equal angles.'],
        gens: ['similar'] },
      { id: 'g-sym', title: 'Symmetry', obj: ['4.5'], kw: 'line symmetry rotational symmetry',
        learn: [
          { h: 'Line and rotational symmetry', b: `<p><b>Line symmetry</b>: fold along the line and both halves match. <b>Rotational order</b>: how many times it fits onto itself in one turn.</p><p>A regular n-gon has n lines and order n. A parallelogram has 0 lines, order 2.</p>${K.ngon(5)}`, check: { q: 'Lines of symmetry of a rhombus?', opts: ['0', '1', '2', '4'], a: 2 } },
          { h: 'In 3D', b: `<p>Solids have <b>planes</b> of symmetry. A cylinder has an <b>axis</b> of rotational symmetry through its centre.</p>` }
        ],
        keys: ['Regular n-gon: n lines, order n.', 'Parallelogram: no lines, order 2. Kite: 1 line, order 1.', 'Solids have planes of symmetry.'],
        gens: ['symmetry'] },
      { id: 'g-angles', title: 'Angle facts and parallel lines', obj: ['4.6'], kw: 'angles in parallel lines',
        learn: [
          { h: 'Basic facts', b: `<ul><li>On a straight line: 180°</li><li>At a point: 360°</li><li>Vertically opposite angles are equal</li><li>Triangle: 180°; quadrilateral: 360°</li></ul>` },
          { h: 'Parallel lines', b: `${K.parallel({ pos: 'tr', text: 'a' }, { pos: 'TR', text: 'a' })}<ul><li><b>Corresponding</b> (F-shape): equal</li><li><b>Alternate</b> (Z-shape): equal</li><li><b>Co-interior</b> (C-shape): add to 180°</li></ul>`, check: { q: 'Co-interior angles…', opts: ['are equal', 'add to 90°', 'add to 180°', 'add to 360°'], a: 2 } },
          { h: 'Give reasons', b: `<p>Exams want the <b>reason</b> using correct words, e.g. "alternate angles are equal". Use three-letter notation: angle ABC is the angle at B.</p>` }
        ],
        keys: ['Line 180°, point 360°, triangle 180°, quadrilateral 360°.', 'Corresponding and alternate are equal; co-interior add to 180°.', 'Always state the reason.'],
        gens: ['angleFacts', 'parallelAngles'] },
      { id: 'g-polygons', title: 'Angles in polygons', obj: ['4.6'], kw: 'interior and exterior angles of polygons', widget: 'polyAngles',
        learn: [
          { h: 'Exterior angles', b: `<p>The exterior angles of any polygon add to <b>360°</b>. Regular n-gon: each exterior angle = 360 ÷ n.</p>` },
          { h: 'Interior angles', b: `<p>Interior + exterior = 180°. Sum of interior angles = (n − 2) × 180°.</p><p>Regular hexagon: exterior 60°, interior 120°, sum 720°.</p>`, check: { q: 'Interior angle of a regular octagon?', opts: ['45°', '135°', '120°', '1080°'], a: 1, why: 'Exterior 45°, so interior 135°.' } }
        ],
        keys: ['Exterior angles sum to 360°.', 'Interior sum = (n − 2) × 180°.', 'Interior + exterior = 180°.'],
        gens: ['polygon'] },
      { id: 'g-circle1', title: 'Circle theorems', obj: ['4.7'], kw: 'circle theorems',
        hook: 'Six facts unlock almost every circle question. Learn the picture for each.',
        learn: [
          { h: 'Angle in a semicircle; tangent and radius', b: `<div class="two">${K.circleThm('semicircle')}${K.circleThm('tangent')}</div><p>Angle in a semicircle = <b>90°</b>. Tangent ⟂ radius = <b>90°</b>.</p>` },
          { h: 'Centre and same segment', b: `<div class="two">${K.circleThm('centre')}${K.circleThm('segment')}</div><p>Angle at the centre = <b>2 ×</b> angle at the circumference. Angles in the <b>same segment</b> are equal.</p>` },
          { h: 'Cyclic quadrilateral and alternate segment', b: `${K.circleThm('cyclic')}<p>Opposite angles of a cyclic quadrilateral add to <b>180°</b>.</p><p><b>Alternate segment theorem</b>: the angle between a tangent and a chord equals the angle in the alternate segment.</p>`, check: { q: 'Angle at circumference is 35°. Angle at centre (same arc)?', opts: ['35°', '70°', '145°', '17.5°'], a: 1 } }
        ],
        keys: ['Semicircle: 90°. Tangent–radius: 90°.', 'Centre = 2 × circumference.', 'Same segment: equal. Cyclic quad: opposite angles 180°.', 'Alternate segment theorem.'],
        gens: ['circleTheorem'] },
      { id: 'g-circle2', title: 'Chords and tangents', obj: ['4.8'], kw: 'chord perpendicular bisector tangents from a point',
        learn: [
          { h: 'Symmetry properties', b: `<ul><li>Equal chords are equidistant from the centre.</li><li>The perpendicular bisector of a chord passes through the centre.</li><li>Tangents from an external point are equal in length.</li></ul>${K.circleThm('tangents')}` },
          { h: 'Using Pythagoras', b: `<p>Radius 13, chord 24: the perpendicular from the centre bisects the chord into 12 and 12, so the distance is √(13² − 12²) = <b>5</b>.</p>`, check: { q: 'Radius 5, distance from centre to chord 3. Chord length?', opts: ['4', '8', '6', '10'], a: 1, why: 'Half chord = 4, full = 8.' } }
        ],
        keys: ['The perpendicular from the centre bisects a chord.', 'Tangents from a point are equal.', 'Combine with Pythagoras.'],
        gens: ['circleSym'] }
    ]
  });

  // ======== 5 Mensuration ========
  G.units = () => pick([
    () => { const v = rnd(2, 90) * pick([1, 10, 0.1]); return { kind: 'num', q: `<p>Convert <b>${n(K.round(v, 1))} m²</b> into cm².</p>`, a: K.round(v, 1) * 10000, unit: 'cm²', hint: '1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm².', steps: [`× 10 000 = <b>${n(K.round(v, 1) * 10000)} cm²</b>`] }; },
    () => { const v = rnd(5, 950) * 100; return { kind: 'num', q: `<p>Convert <b>${n(v)} cm²</b> into m².</p>`, a: v / 10000, unit: 'm²', steps: [`÷ 10 000 = <b>${n(v / 10000)} m²</b>`] }; },
    () => { const v = rnd(1, 30) / pick([1, 10]); return { kind: 'num', q: `<p>A tank holds <b>${n(v)} m³</b> of water. How many litres is that?</p>`, a: v * 1000, unit: 'litres', hint: '1 m³ = 1000 litres (and 1 litre = 1000 cm³).', steps: [`${n(v)} × 1000 = <b>${n(v * 1000)} litres</b>`] }; },
    () => { const v = rnd(2, 99) * 50; return { kind: 'num', q: `<p>Convert <b>${n(v)} ml</b> into litres.</p>`, a: v / 1000, unit: 'l', steps: [`÷ 1000 = <b>${n(v / 1000)} l</b>`] }; },
    () => { const v = rnd(2, 40) / 10; return { kind: 'num', q: `<p>Convert <b>${n(v)} cm³</b> into mm³.</p>`, a: v * 1000, unit: 'mm³', hint: '1 cm = 10 mm, so 1 cm³ = 1000 mm³.', steps: [`× 1000 = <b>${n(v * 1000)} mm³</b>`] }; }
  ])();
  G.area2d = () => pick([
    () => { const b = rnd(3, 20), h = rnd(2, 15); return { kind: 'num', q: `<p>Find the area of a triangle with base ${b} cm and height ${h} cm.</p>`, a: b * h / 2, unit: 'cm²', steps: [`½ × ${b} × ${h} = <b>${n(b * h / 2)} cm²</b>`] }; },
    () => { const b = rnd(3, 20), h = rnd(2, 15); return { kind: 'num', q: `<p>Find the area of a parallelogram with base ${b} cm and perpendicular height ${h} cm.</p>`, a: b * h, unit: 'cm²', hint: 'Base × perpendicular height (not the slanted side).', steps: [`${b} × ${h} = <b>${b * h} cm²</b>`] }; },
    () => { const a = rnd(3, 12), b = a + rnd(2, 10), h = rnd(2, 12); return { kind: 'num', q: `<p>A trapezium has parallel sides ${a} cm and ${b} cm, and height ${h} cm. Find its area.</p>`, a: (a + b) * h / 2, unit: 'cm²', hint: 'Area = ½(a + b)h. This formula is NOT given.', steps: [`½ × (${a} + ${b}) × ${h} = <b>${n((a + b) * h / 2)} cm²</b>`] }; },
    () => { const l = rnd(4, 25), w = rnd(2, 15); return { kind: 'num', q: `<p>A rectangle is ${l} m by ${w} m. Find its perimeter.</p>`, a: 2 * (l + w), unit: 'm', steps: [`2 × (${l} + ${w}) = <b>${2 * (l + w)} m</b>`] }; },
    () => { const A = rnd(4, 30) * 2, b = pick([4, 5, 6, 8, 10]); if ((2 * A) % b) return G.area2d(); return { kind: 'num', q: `<p>A triangle has area ${A} cm² and base ${b} cm. Find its height.</p>`, a: 2 * A / b, unit: 'cm', steps: [`${A} = ½ × ${b} × h`, `h = ${2 * A} ÷ ${b} = <b>${n(2 * A / b)} cm</b>`] }; }
  ])();
  G.circleCalc = () => {
    const r = rnd(2, 20), useD = Math.random() < .4, ask = pick(['area', 'circ']); const v = ask === 'area' ? Math.PI * r * r : 2 * Math.PI * r;
    return Object.assign({ kind: 'num', q: `<p>A circle has ${useD ? 'diameter ' + 2 * r : 'radius ' + r} cm. Find its <b>${ask === 'area' ? 'area' : 'circumference'}</b>, correct to 3 s.f.</p>`, unit: ask === 'area' ? 'cm²' : 'cm', hint: (useD ? 'Halve the diameter to get the radius. ' : '') + (ask === 'area' ? 'A = πr²' : 'C = 2πr'), steps: [useD ? `r = ${2 * r} ÷ 2 = ${r}` : `r = ${r}`, ask === 'area' ? `π × ${r}² = ${n(K.round(v, 3))}` : `2 × π × ${r} = ${n(K.round(v, 3))}`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v));
  };
  G.arcSector = () => {
    const r = rnd(3, 15), ang = pick([30, 40, 45, 60, 72, 80, 90, 120, 135, 150, 210, 240, 270]), ask = pick(['arc', 'sector']);
    const v = ask === 'arc' ? ang / 360 * 2 * Math.PI * r : ang / 360 * Math.PI * r * r;
    return Object.assign({ kind: 'num', q: `<p>A sector has radius ${r} cm and angle ${ang}°. Find its <b>${ask === 'arc' ? 'arc length' : 'area'}</b>, correct to 3 s.f.</p>`, unit: ask === 'arc' ? 'cm' : 'cm²', hint: `It is ${ang}/360 of the whole circle.`, steps: [`${fr(ang, 360)} × ${ask === 'arc' ? `2π × ${r}` : `π × ${r}²`}`, `= <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v));
  };
  G.solidVol = () => pick([
    () => { const l = rnd(2, 15), w = rnd(2, 10), h = rnd(2, 10); return { kind: 'num', q: `<p>Find the volume of a cuboid ${l} cm × ${w} cm × ${h} cm.</p>`, a: l * w * h, unit: 'cm³', steps: [`${l} × ${w} × ${h} = <b>${l * w * h} cm³</b>`] }; },
    () => { const r = rnd(2, 10), h = rnd(3, 20); const v = Math.PI * r * r * h; return Object.assign({ kind: 'num', q: `<p>Find the volume of a cylinder with radius ${r} cm and height ${h} cm (3 s.f.).</p>`, unit: 'cm³', hint: 'V = πr²h (given).', steps: [`π × ${r}² × ${h}`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const r = rnd(2, 10), h = rnd(3, 20); const v = Math.PI * r * r * h / 3; return Object.assign({ kind: 'num', q: `<p>Find the volume of a cone with radius ${r} cm and height ${h} cm (3 s.f.).</p>`, unit: 'cm³', hint: 'V = ⅓πr²h (given).', steps: [`⅓ × π × ${r}² × ${h}`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const r = rnd(2, 12); const v = 4 / 3 * Math.PI * r ** 3; return Object.assign({ kind: 'num', q: `<p>Find the volume of a sphere with radius ${r} cm (3 s.f.).</p>`, unit: 'cm³', hint: 'V = ⁴⁄₃πr³ (given).', steps: [`⁴⁄₃ × π × ${r}³`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const b = rnd(3, 12), h = rnd(2, 10), l = rnd(5, 20); return { kind: 'num', q: `<p>A prism has a triangular cross-section with base ${b} cm and height ${h} cm. It is ${l} cm long. Find its volume.</p>`, a: b * h / 2 * l, unit: 'cm³', hint: 'Volume of a prism = area of cross-section × length.', steps: [`Cross-section: ½ × ${b} × ${h} = ${n(b * h / 2)}`, `× ${l} = <b>${n(b * h / 2 * l)} cm³</b>`] }; },
    () => { const s = rnd(3, 12), h = rnd(3, 15); return { kind: 'num', q: `<p>A pyramid has a square base of side ${s} cm and height ${h} cm. Find its volume.</p>`, a: s * s * h / 3, unit: 'cm³', ...(Number.isInteger(s * s * h / 3 * 100) ? {} : K.acc3(s * s * h / 3)), steps: [`⅓ × ${s * s} × ${h} = <b>${n(K.round(s * s * h / 3, 2))} cm³</b>`] }; }
  ])();
  G.surfaceArea = () => pick([
    () => { const l = rnd(2, 12), w = rnd(2, 10), h = rnd(2, 10); return { kind: 'num', q: `<p>Find the total surface area of a cuboid ${l} cm × ${w} cm × ${h} cm.</p>`, a: 2 * (l * w + l * h + w * h), unit: 'cm²', hint: 'Six faces in three matching pairs.', steps: [`2(${l}×${w} + ${l}×${h} + ${w}×${h})`, `= <b>${2 * (l * w + l * h + w * h)} cm²</b>`] }; },
    () => { const r = rnd(2, 10); const v = 4 * Math.PI * r * r; return Object.assign({ kind: 'num', q: `<p>Find the surface area of a sphere with radius ${r} cm (3 s.f.).</p>`, unit: 'cm²', hint: 'A = 4πr² (given).', steps: [`4π × ${r}²`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const r = rnd(2, 9), h = rnd(3, 15); const v = 2 * Math.PI * r * h + 2 * Math.PI * r * r; return Object.assign({ kind: 'num', q: `<p>Find the <b>total</b> surface area of a closed cylinder with radius ${r} cm and height ${h} cm (3 s.f.).</p>`, unit: 'cm²', hint: 'Curved surface 2πrh plus two circles πr².', steps: [`2π(${r})(${h}) + 2π(${r})²`, `<b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const t = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]); const v = Math.PI * t[0] * t[2]; return Object.assign({ kind: 'num', q: `<p>A cone has radius ${t[0]} cm and perpendicular height ${t[1]} cm. Find its <b>curved</b> surface area (3 s.f.).</p>`, unit: 'cm²', hint: 'Curved SA = πrl, where l is the slant height. Find l with Pythagoras.', steps: [`l = √(${t[0]}² + ${t[1]}²) = ${t[2]}`, `π × ${t[0]} × ${t[2]} = <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); }
  ])();
  G.compound = () => pick([
    () => { const a = rnd(6, 14), b = rnd(6, 14), c = rnd(2, a - 2), d = rnd(2, b - 2); return { kind: 'num', q: `<p>An L-shaped room is a ${a} m × ${b} m rectangle with a ${c} m × ${d} m rectangle cut out of one corner. Find its area.</p>`, a: a * b - c * d, unit: 'm²', hint: 'Big rectangle minus the missing piece.', steps: [`${a} × ${b} − ${c} × ${d} = ${a * b} − ${c * d} = <b>${a * b - c * d} m²</b>`] }; },
    () => { const r = rnd(2, 8), h = rnd(4, 15); const v = Math.PI * r * r * h + 2 / 3 * Math.PI * r ** 3; return Object.assign({ kind: 'num', q: `<p>A solid is a cylinder (radius ${r} cm, height ${h} cm) with a hemisphere on top of the same radius. Find its total volume (3 s.f.).</p>`, unit: 'cm³', hint: 'Cylinder + half a sphere.', steps: [`Cylinder: π(${r})²(${h})`, `Hemisphere: ½ × ⁴⁄₃π(${r})³`, `Total: <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const s = rnd(6, 16); const v = s * s - Math.PI * (s / 2) ** 2; return Object.assign({ kind: 'num', q: `<p>A circle fits exactly inside a square of side ${s} cm. Find the area of the square <b>not</b> covered by the circle (3 s.f.).</p>`, unit: 'cm²', hint: 'The circle\'s diameter equals the side of the square.', steps: [`Square: ${s * s}; circle: π × ${n(s / 2)}² = ${n(K.round(Math.PI * (s / 2) ** 2, 2))}`, `Difference: <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); },
    () => { const R = rnd(6, 10), H = 2 * rnd(5, 8); const r = R / 2, h = H / 2; const v = Math.PI * (R * R * H - r * r * h) / 3; return Object.assign({ kind: 'num', q: `<p>A cone of radius ${R} cm and height ${H} cm has its top cut off halfway up, leaving a <b>frustum</b>. The small cone removed has radius ${n(r)} cm and height ${n(h)} cm. Find the volume of the frustum (3 s.f.).</p>`, unit: 'cm³', hint: 'Big cone volume − small cone volume.', steps: [`Big: ⅓π(${R})²(${H}); small: ⅓π(${n(r)})²(${n(h)})`, `Frustum: <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v)); }
  ])();

  R2O.addModule({
    id: 'mensuration', name: 'Mensuration', icon: '📏', color: '#ca8a04', blurb: 'Syllabus section 5: units, perimeter and area, circles and sectors, surface area and volume.',
    book: ['Prealgebra 2e (geometry chapter)', 'https://openstax.org/details/books/prealgebra-2e'],
    lessons: [
      { id: 'm-units', title: 'Units of measure', obj: ['5.1'], kw: 'converting area and volume units',
        learn: [
          { h: 'Length, mass, capacity', b: `<p>10 mm = 1 cm · 100 cm = 1 m · 1000 m = 1 km · 1000 g = 1 kg · 1000 ml = 1 l.</p>` },
          { h: 'Area and volume units: the trap', b: `<p>1 m = 100 cm, but 1 m² = 100 × 100 = <b>10 000 cm²</b> and 1 m³ = <b>1 000 000 cm³</b>.</p><p>1 cm³ = 1 ml, so 1 m³ = 1000 litres.</p>`, check: { q: '3 m² = ? cm²', opts: ['300', '3000', '30 000', '300 000'], a: 2 } }
        ],
        keys: ['Square the length factor for area, cube it for volume.', '1 m² = 10 000 cm²; 1 m³ = 1 000 000 cm³.', '1 cm³ = 1 ml; 1 m³ = 1000 l.'],
        gens: ['units'] },
      { id: 'm-area', title: 'Perimeter and area', obj: ['5.2'], kw: 'area of trapezium parallelogram triangle',
        learn: [
          { h: 'The formulas', b: `<ul><li>Rectangle: l × w</li><li>Triangle: ½ × base × height <span class="muted">(given)</span></li><li>Parallelogram: base × perpendicular height</li><li>Trapezium: ½(a + b)h</li></ul><p class="muted">Only the triangle formula is given in the exam. Learn the rest.</p>`, check: { q: 'Trapezium: parallel sides 5 and 9, height 4. Area?', opts: ['28', '56', '180', '18'], a: 0, why: '½ × 14 × 4 = 28.' } },
          { h: 'Perimeter', b: `<p>The total distance around the outside. Add every side, including ones you have to work out.</p>` }
        ],
        keys: ['Height is always perpendicular to the base.', 'Trapezium = ½(a + b)h (not given).', 'Perimeter: add all the outside edges.'],
        gens: ['area2d'] },
      { id: 'm-circles', title: 'Circles, arcs and sectors', obj: ['5.3'], kw: 'arc length sector area',
        learn: [
          { h: 'Circumference and area', b: `<p>C = 2πr = πd · A = πr² (both given). Use the π button or 3.142.</p><p>"In terms of π": leave π in, e.g. r = 5 → A = 25π.</p>` },
          { h: 'Arcs and sectors', b: `<p>A sector with angle θ is ${fr('θ', 360)} of the circle.</p><p>Arc length = ${fr('θ', 360)} × 2πr · Sector area = ${fr('θ', 360)} × πr².</p>${K.pie([{ label: 'sector 90°', v: 90 }, { label: 'rest', v: 270 }])}`, check: { q: 'A semicircle has radius 4. Its area in terms of π?', opts: ['8π', '16π', '4π', '2π'], a: 0, why: '½ × 16π.' } }
        ],
        keys: ['C = 2πr, A = πr².', 'Sector fraction = angle ÷ 360.', 'Perimeter of a sector = arc + 2 radii.'],
        gens: ['circleCalc', 'arcSector'] },
      { id: 'm-solids', title: 'Surface area and volume', obj: ['5.4'], kw: 'volume and surface area of solids',
        learn: [
          { h: 'Prisms and cylinders', b: `<p>Volume = area of cross-section × length. Cylinder: πr²h.</p>` },
          { h: 'Pyramids, cones, spheres', b: `<p>Pyramid ⅓Ah · Cone ⅓πr²h · Sphere ⁴⁄₃πr³. Curved surface: cylinder 2πrh, cone πrl (l = slant height), sphere 4πr². <b>These are all given</b> on the formula page.</p>`, check: { q: 'A cone and a cylinder have the same r and h. The cone\'s volume is…', opts: ['the same', 'half', 'one third', 'double'], a: 2 } },
          { h: 'Surface area of a cuboid', b: `<p>Six faces: 2(lw + lh + wh). Sketch the net if it helps.</p>` }
        ],
        keys: ['Prism: cross-section × length.', 'Pyramid and cone: one third of the prism/cylinder.', 'Volume and curved-surface formulas are given.', 'Cone slant height l: use Pythagoras.'],
        gens: ['solidVol', 'surfaceArea'] },
      { id: 'm-compound', title: 'Compound shapes and solids', obj: ['5.5'], kw: 'compound shapes frustum volume',
        learn: [
          { h: 'Split or subtract', b: `<p>Break the shape into pieces you know, or take a big shape and <b>subtract</b> what's missing.</p>` },
          { h: 'Frustum', b: `<p>A frustum is a cone with the top cut off: volume = big cone − small cone. The two cones are <b>similar</b>, which often gives you the missing lengths.</p>`, check: { q: 'Volume of a hemisphere of radius r?', opts: ['⁴⁄₃πr³', '⅔πr³', '2πr²', '⅓πr³'], a: 1 } }
        ],
        keys: ['Add the parts or subtract the hole.', 'Frustum = big cone − small cone.', 'Hemisphere = ½ sphere; curved surface 2πr².'],
        gens: ['compound'] }
    ]
  });
})();
