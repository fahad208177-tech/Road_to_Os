// Modules 6-9: Trigonometry (6.x), Transformations and vectors (7.x), Probability (8.x), Statistics (9.x)
(() => {
  const K = R2O.K, G = R2O.GEN, W = R2O.WIDGETS, { rnd, nz, pick, mcq, n, fr, frs } = K;
  const D = Math.PI / 180, sin = d => Math.sin(d * D), cos = d => Math.cos(d * D), tan = d => Math.tan(d * D);
  const asinD = x => Math.asin(x) / D, acosD = x => Math.acos(x) / D, atanD = x => Math.atan(x) / D;

  // ======== 6 Trigonometry ========
  G.pyth = () => {
    const leg = Math.random() < .45, exact = Math.random() < .5;
    let a, b, c; if (exact) { const t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]); const k = pick([1, 1, 2, 3]); [a, b, c] = t.map(x => x * k); } else { a = rnd(3, 15); b = rnd(3, 15); c = Math.sqrt(a * a + b * b); }
    if (!leg) { const res = { kind: 'num', q: `<p>Find the length of the hypotenuse.</p>${K.rightTri({ a: a + ' cm', b: b + ' cm', c: '?' })}`, unit: 'cm', hint: 'c² = a² + b²: square, add, square root.', steps: [`c² = ${a}² + ${b}² = ${a * a + b * b}`, `c = √${a * a + b * b} = <b>${n(K.sf(c, 3))}</b>`] }; return exact ? Object.assign(res, { a: c }) : Object.assign(res, K.acc3(c)); }
    const cc = exact ? c : rnd(Math.max(a, b) + 1, 25); const other = Math.sqrt(cc * cc - a * a);
    const res = { kind: 'num', q: `<p>Find the missing side x.</p>${K.rightTri({ a: a + ' cm', b: 'x', c: n(cc) + ' cm' })}`, unit: 'cm', hint: 'Finding a shorter side: subtract. x² = c² − a².', steps: [`x² = ${n(cc)}² − ${a}² = ${n(cc * cc - a * a)}`, `x = <b>${n(K.sf(other, 3))}</b>`] };
    return Number.isInteger(other) ? Object.assign(res, { a: other }) : Object.assign(res, K.acc3(other));
  };
  G.trigSide = () => {
    const ang = rnd(15, 75), known = pick(['a', 'b', 'c']); let want = pick(['a', 'b', 'c'].filter(x => x !== known)); const L = rnd(4, 25);
    const H = known === 'c' ? L : known === 'a' ? L / sin(ang) : L / cos(ang); const sides = { a: H * sin(ang), b: H * cos(ang), c: H };
    const v = sides[want]; const lab = { a: '', b: '', c: '', angle: ang + '°' }; lab[known] = L + ' cm'; lab[want] = 'x';
    const ratio = (known === 'c' || want === 'c') ? ((known === 'a' || want === 'a') ? 'SOH: sin θ = opp ÷ hyp' : 'CAH: cos θ = adj ÷ hyp') : 'TOA: tan θ = opp ÷ adj';
    return Object.assign({ kind: 'num', q: `<p>Find x, correct to 3 significant figures.</p>${K.rightTri(lab)}`, unit: 'cm', hint: `Label the sides opp, adj, hyp from the angle. Use ${ratio.split(':')[0]}.`, steps: [`Use ${ratio}`, `x = <b>${n(K.sf(v, 3))}</b>`] }, K.acc3(v));
  };
  G.trigAngle = () => {
    const ang = rnd(12, 78) + rnd(0, 9) / 10; const H = rnd(6, 20); const sides = { a: K.round(H * sin(ang), 1), b: K.round(H * cos(ang), 1), c: H };
    const pair = pick([['a', 'b'], ['a', 'c'], ['b', 'c']]); const lab = { angle: 'θ' }; pair.forEach(p => lab[p] = n(sides[p]) + ' cm');
    const th = pair[0] === 'a' && pair[1] === 'b' ? atanD(sides.a / sides.b) : pair[0] === 'a' ? asinD(sides.a / sides.c) : acosD(sides.b / sides.c);
    const how = pair[0] === 'a' && pair[1] === 'b' ? `tan θ = ${n(sides.a)} ÷ ${n(sides.b)}` : pair[0] === 'a' ? `sin θ = ${n(sides.a)} ÷ ${n(sides.c)}` : `cos θ = ${n(sides.b)} ÷ ${n(sides.c)}`;
    return Object.assign({ kind: 'num', q: `<p>Find the angle θ, correct to 1 decimal place.</p>${K.rightTri(lab)}`, unit: '°', hint: 'Choose SOH, CAH or TOA, then use the inverse (shift) key.', steps: [how, `θ = ${how.split(' = ')[0].replace(' θ', '⁻¹')}(…) = <b>${K.round(th, 1)}°</b>`] }, K.accDP(th, 1));
  };
  G.elevation = () => {
    if (Math.random() < .5) { const d = rnd(15, 80), a = rnd(15, 60); const h = d * tan(a); return Object.assign({ kind: 'num', q: `<p>From a point on flat ground ${d} m from the foot of a tower, the angle of <b>elevation</b> of the top is ${a}°. Find the height of the tower (3 s.f.).</p>`, unit: 'm', hint: 'Draw it: the height is opposite the angle, the ground distance is adjacent. Use tan.', steps: [`tan ${a}° = h ÷ ${d}`, `h = ${d} × tan ${a}° = <b>${n(K.sf(h, 3))} m</b>`] }, K.acc3(h)); }
    const h = rnd(20, 120), a = rnd(10, 50); const d = h / tan(a);
    return Object.assign({ kind: 'num', q: `<p>From the top of a cliff ${h} m high, the angle of <b>depression</b> of a boat is ${a}°. How far is the boat from the foot of the cliff (3 s.f.)?</p>`, unit: 'm', hint: 'The angle of depression from the top equals the angle of elevation from the boat (alternate angles).', steps: [`tan ${a}° = ${h} ÷ d`, `d = ${h} ÷ tan ${a}° = <b>${n(K.sf(d, 3))} m</b>`] }, K.acc3(d));
  };
  G.sineRule = () => {
    const A = rnd(30, 80), B = rnd(25, Math.min(80, 165 - A)), a = rnd(5, 20); const findSide = Math.random() < .6;
    if (findSide) { const b = a * sin(B) / sin(A); return Object.assign({ kind: 'num', q: `<p>In triangle ABC, angle A = ${A}°, angle B = ${B}° and BC = a = ${a} cm. Find AC = b (3 s.f.).</p>${K.triangle({ A: 'A', B: 'B', C: 'C', a: a + ' cm', b: 'b', angA: A + '°', angB: B + '°' })}`, unit: 'cm', hint: 'Sine rule: a / sin A = b / sin B (given).', steps: [`b = ${a} × sin ${B}° ÷ sin ${A}°`, `= <b>${n(K.sf(b, 3))} cm</b>`] }, K.acc3(b)); }
    const b = K.round(a * sin(B) / sin(A), 1); const Bc = asinD(b * sin(A) / a);
    return Object.assign({ kind: 'num', q: `<p>In triangle ABC, angle A = ${A}°, a = ${a} cm and b = ${n(b)} cm. Find the acute angle B (1 d.p.).</p>`, unit: '°', hint: 'sin B / b = sin A / a.', steps: [`sin B = ${n(b)} × sin ${A}° ÷ ${a}`, `B = <b>${K.round(Bc, 1)}°</b>`] }, K.accDP(Bc, 1));
  };
  G.cosineRule = () => {
    const b = rnd(4, 15), c = rnd(4, 15), A = rnd(25, 140);
    if (Math.random() < .55) { const a = Math.sqrt(b * b + c * c - 2 * b * c * cos(A)); return Object.assign({ kind: 'num', q: `<p>In triangle ABC, b = ${b} cm, c = ${c} cm and angle A = ${A}°. Find a (3 s.f.).</p>${K.triangle({ A: 'A', B: 'B', C: 'C', b: b + ' cm', c: c + ' cm', a: 'a', angA: A + '°' })}`, unit: 'cm', hint: 'Cosine rule: a² = b² + c² − 2bc cos A (given).', steps: [`a² = ${b}² + ${c}² − 2(${b})(${c}) cos ${A}°`, `a² = ${n(K.round(a * a, 3))}`, `a = <b>${n(K.sf(a, 3))} cm</b>`] }, K.acc3(a)); }
    let x, y, z; do { x = rnd(4, 15); y = rnd(4, 15); z = rnd(4, 15); } while (x + y <= z || x + z <= y || y + z <= x);
    const ang = acosD((y * y + z * z - x * x) / (2 * y * z));
    return Object.assign({ kind: 'num', q: `<p>A triangle has sides ${x} cm, ${y} cm and ${z} cm. Find the angle opposite the ${x} cm side (1 d.p.).</p>`, unit: '°', hint: 'Rearranged: cos A = (b² + c² − a²) ÷ 2bc.', steps: [`cos A = (${y}² + ${z}² − ${x}²) ÷ (2 × ${y} × ${z}) = ${n(K.round((y * y + z * z - x * x) / (2 * y * z), 4))}`, `A = <b>${K.round(ang, 1)}°</b>`] }, K.accDP(ang, 1));
  };
  G.areaSinC = () => {
    const a = rnd(4, 18), b = rnd(4, 18), C = rnd(20, 160); const v = 0.5 * a * b * sin(C);
    return Object.assign({ kind: 'num', q: `<p>Two sides of a triangle are ${a} cm and ${b} cm, and the angle between them is ${C}°. Find the area (3 s.f.).</p>`, unit: 'cm²', hint: 'Area = ½ab sin C (given). C must be the angle between a and b.', steps: [`½ × ${a} × ${b} × sin ${C}°`, `= <b>${n(K.sf(v, 3))} cm²</b>`] }, K.acc3(v));
  };
  G.trig3d = () => {
    const l = rnd(3, 12), w = rnd(3, 10), h = rnd(3, 10); const base = Math.sqrt(l * l + w * w); const diag = Math.sqrt(l * l + w * w + h * h);
    if (Math.random() < .5) return Object.assign({ kind: 'num', q: `<p>A cuboid measures ${l} cm × ${w} cm × ${h} cm. Find the length of the space diagonal (from a bottom corner to the opposite top corner), 3 s.f.</p>`, unit: 'cm', hint: 'Pythagoras twice: first across the base, then up.', steps: [`Base diagonal = √(${l}² + ${w}²) = ${n(K.round(base, 3))}`, `Space diagonal = √(${l}² + ${w}² + ${h}²) = <b>${n(K.sf(diag, 3))} cm</b>`] }, K.acc3(diag));
    const ang = atanD(h / base);
    return Object.assign({ kind: 'num', q: `<p>A cuboid measures ${l} cm × ${w} cm × ${h} cm (height ${h}). Find the angle between the space diagonal and the base (1 d.p.).</p>`, unit: '°', hint: 'The angle between a line and a plane: project the line onto the plane (the base diagonal), then use tan.', steps: [`Base diagonal = √(${l}² + ${w}²) = ${n(K.round(base, 3))}`, `tan θ = ${h} ÷ ${n(K.round(base, 3))}`, `θ = <b>${K.round(ang, 1)}°</b>`] }, K.accDP(ang, 1));
  };
  W.trigExplorer = el => {
    el.innerHTML = `<label class="field">Angle θ = <b class="tv"></b>°<input type="range" min="5" max="85" value="35" class="t"></label><div class="out"></div>`;
    const t = el.querySelector('.t'), out = el.querySelector('.out');
    const draw = () => { const a = +t.value; el.querySelector('.tv').textContent = a; const H = 10, O = H * sin(a), A = H * cos(a);
      out.innerHTML = `<svg class="viz" viewBox="0 0 300 200"><polygon points="30,180 ${30 + A * 24},180 ${30 + A * 24},${180 - O * 16}" class="shape"/><text x="${30 + A * 12}" y="196" text-anchor="middle" class="lbl">adj ${n(K.round(A, 2))}</text><text x="${36 + A * 24}" y="${180 - O * 8}" class="lbl">opp ${n(K.round(O, 2))}</text><text x="${20 + A * 10}" y="${170 - O * 9}" class="lbl" text-anchor="end">hyp 10</text><text x="62" y="172" class="lbl acc">${a}°</text></svg>
        <p class="center">sin ${a}° = ${n(K.round(sin(a), 3))} · cos ${a}° = ${n(K.round(cos(a), 3))} · tan ${a}° = ${n(K.round(tan(a), 3))}</p><p class="center muted small">The ratios depend only on the angle, not the size of the triangle.</p>`; };
    t.oninput = draw; draw();
  };

  R2O.addModule({
    id: 'trig', name: 'Trigonometry', icon: '📐', color: '#be123c', blurb: "Syllabus section 6: Pythagoras' theorem, SOH CAH TOA, sine and cosine rules, and 3D problems.",
    book: ['Algebra and Trigonometry 2e', 'https://openstax.org/details/books/algebra-and-trigonometry-2e'],
    lessons: [
      { id: 't-pyth', title: "Pythagoras' theorem", obj: ['6.1'], kw: 'pythagoras theorem',
        hook: 'Over 2500 years old and still the most useful fact about right-angled triangles.',
        learn: [
          { h: 'a² + b² = c²', b: `${K.rightTri({ a: 'a', b: 'b', c: 'c' })}<p>c is the <b>hypotenuse</b>: the longest side, opposite the right angle.</p><p class="muted">Not on the formula page: you must know it.</p>` },
          { h: 'Two directions', b: `<p><b>Finding the hypotenuse</b>: add. 6, 8 → √(36 + 64) = 10.</p><p><b>Finding a shorter side</b>: subtract. 13, 5 → √(169 − 25) = 12.</p>`, check: { q: 'Legs 9 and 12. Hypotenuse?', opts: ['15', '21', '√63', '10.5'], a: 0, why: '81 + 144 = 225 = 15².' } }
        ],
        keys: ['Hypotenuse²= sum of the other two squared.', 'Hypotenuse: add then root. Shorter side: subtract then root.', 'Check: the hypotenuse must be the longest side.'],
        gens: ['pyth'] },
      { id: 't-soh', title: 'SOH CAH TOA', obj: ['6.2'], kw: 'sohcahtoa trigonometry', widget: 'trigExplorer',
        learn: [
          { h: 'Label the sides from the angle', b: `${K.rightTri({ a: 'opposite', b: 'adjacent', c: 'hypotenuse', angle: 'θ' })}<p><b>S</b>in = <b>O</b>/<b>H</b> · <b>C</b>os = <b>A</b>/<b>H</b> · <b>T</b>an = <b>O</b>/<b>A</b></p>` },
          { h: 'Finding a side', b: `<p>Angle 35°, hypotenuse 12, want the opposite: sin 35° = x ÷ 12 → x = 12 sin 35° = <b>6.88</b>.</p><p>If the unknown is on the bottom: tan 40° = 8 ÷ x → x = 8 ÷ tan 40°.</p>`, check: { q: 'Know the adjacent, want the opposite. Use…', opts: ['sin', 'cos', 'tan', 'Pythagoras'], a: 2 } },
          { h: 'Finding an angle', b: `<p>opp 5, hyp 9: sin θ = ${fr(5, 9)} → θ = sin⁻¹(${fr(5, 9)}) = <b>33.7°</b>. Give angles to 1 d.p.</p><p>The shortest distance from a point to a line is the <b>perpendicular</b> distance.</p>` }
        ],
        keys: ['Label opp, adj, hyp from the angle you are using.', 'Pick the ratio with the two sides involved.', 'Angles: use sin⁻¹, cos⁻¹, tan⁻¹; give to 1 d.p.', 'SOH CAH TOA is not given: learn it.'],
        gens: ['trigSide', 'trigAngle'] },
      { id: 't-elev', title: 'Elevation and depression', obj: ['6.2'], kw: 'angles of elevation and depression',
        learn: [
          { h: 'Looking up and down', b: `<p><b>Elevation</b>: angle looking <b>up</b> from the horizontal. <b>Depression</b>: angle looking <b>down</b> from the horizontal.</p><p>The angle of depression from A to B equals the angle of elevation from B to A (alternate angles).</p>` },
          { h: 'Always draw the triangle', b: `<p>Mark the horizontal, the right angle and the angle. Then it is just SOH CAH TOA. Bearings questions combine this with 3-figure bearings.</p>`, check: { q: 'Elevation of a kite is 40° and the string is 50 m. Height?', opts: ['50 sin 40°', '50 cos 40°', '50 tan 40°', '50 ÷ sin 40°'], a: 0, why: 'Height is opposite, string is the hypotenuse.' } }
        ],
        keys: ['Both are measured from the horizontal.', 'Depression from the top = elevation from the bottom.', 'Draw it, then use SOH CAH TOA.'],
        gens: ['elevation'] },
      { id: 't-sine', title: 'The sine rule', obj: ['6.3'], kw: 'sine rule',
        learn: [
          { h: 'For any triangle', b: `<p class="tri">${fr('a', 'sin A')} = ${fr('b', 'sin B')} = ${fr('c', 'sin C')}</p><p>Side a is opposite angle A. Use it when you know a <b>side and its opposite angle</b>. Given on the formula page.</p>` },
          { h: 'The ambiguous case', b: `<p>When finding an angle, sin x = 0.6 gives x = 36.9° <b>or</b> 180° − 36.9° = 143.1°. Check whether the obtuse answer is possible.</p>`, check: { q: 'sin B = 0.5 could mean B = 30° or…', opts: ['60°', '150°', '120°', '330°'], a: 1 } }
        ],
        keys: ['Sine rule: a/sin A = b/sin B = c/sin C (given).', 'Needs a matching side–angle pair.', 'Angles: watch for a second, obtuse answer.'],
        gens: ['sineRule'] },
      { id: 't-cosine', title: 'The cosine rule and area', obj: ['6.3'], kw: 'cosine rule area of triangle half ab sin c',
        learn: [
          { h: 'Cosine rule', b: `<p class="tri">a² = b² + c² − 2bc cos A</p><p>Use it with <b>two sides and the angle between</b> them (to find the third side), or <b>three sides</b> (to find an angle): cos A = (b² + c² − a²) ÷ 2bc.</p>` },
          { h: 'Area = ½ab sin C', b: `<p>Two sides and the <b>included</b> angle: sides 7 and 9, angle 50° → ½ × 7 × 9 × sin 50° = <b>24.1</b>.</p>`, check: { q: 'You know all three sides and want an angle. Use…', opts: ['sine rule', 'cosine rule', 'SOH CAH TOA', 'area formula'], a: 1 } }
        ],
        keys: ['Cosine rule: SAS for a side, SSS for an angle (given).', 'A negative cosine means an obtuse angle.', 'Area = ½ab sin C, C between a and b (given).'],
        gens: ['cosineRule', 'areaSinC'] },
      { id: 't-3d', title: 'Trigonometry in 3D', obj: ['6.4'], kw: '3d trigonometry pythagoras angle between line and plane',
        learn: [
          { h: 'Find the right triangle', b: `<p>Pull a flat right-angled triangle out of the 3D shape and draw it separately.</p><p>Space diagonal of a cuboid: √(l² + w² + h²).</p>` },
          { h: 'Angle between a line and a plane', b: `<p>Drop a perpendicular from the top of the line to the plane. The angle is between the line and its <b>projection</b> on the plane.</p>`, check: { q: 'A cuboid 3 × 4 × 12. Space diagonal?', opts: ['13', '19', '12.6', '5'], a: 0, why: '√(9 + 16 + 144) = √169.' } }
        ],
        keys: ['Draw each 2D triangle separately.', 'Space diagonal = √(l² + w² + h²).', 'Line–plane angle uses the projection onto the plane.'],
        gens: ['trig3d'] }
    ]
  });

  // ======== 7 Transformations and vectors ========
  G.reflectPt = () => {
    const x = nz(-6, 6), y = nz(-6, 6); const m = pick([['the x-axis', [x, -y]], ['the y-axis', [-x, y]], ['the line y = x', [y, x]], ['the line y = −x', [-y, -x]], ['the line x = 2', [4 - x, y]], ['the line y = −1', [x, -2 - y]]]);
    return { kind: 'nums', ordered: true, q: `<p>The point P(${n(x)}, ${n(y)}) is <b>reflected</b> in ${m[0]}. Find the coordinates of its image.</p>`, a: m[1], show: `(${n(m[1][0])}, ${n(m[1][1])})`, ph: '(x, y)', hint: 'The image is the same distance from the mirror line, on the other side.', steps: [`Reflect in ${m[0]}`, `<b>(${n(m[1][0])}, ${n(m[1][1])})</b>`] };
  };
  G.rotatePt = () => {
    const x = nz(-6, 6), y = nz(-6, 6); const r = pick([['90° clockwise', [y, -x]], ['90° anticlockwise', [-y, x]], ['180°', [-x, -y]]]);
    return { kind: 'nums', ordered: true, q: `<p>The point (${n(x)}, ${n(y)}) is <b>rotated ${r[0]}</b> about the origin. Find its image.</p>`, a: r[1], show: `(${n(r[1][0])}, ${n(r[1][1])})`, ph: '(x, y)', hint: '90° clockwise: (x, y) → (y, −x). 90° anticlockwise: (x, y) → (−y, x). 180°: (−x, −y).', steps: [`Rotation ${r[0]}: <b>(${n(r[1][0])}, ${n(r[1][1])})</b>`] };
  };
  G.enlargePt = () => {
    const x = nz(-4, 5), y = nz(-4, 5), k = pick([2, 3, 0.5, -1, -2]), cx = rnd(-2, 2), cy = rnd(-2, 2);
    const ix = cx + k * (x - cx), iy = cy + k * (y - cy);
    return { kind: 'nums', ordered: true, q: `<p>The point (${n(x)}, ${n(y)}) is <b>enlarged</b> by scale factor <b>${n(k)}</b>, centre (${n(cx)}, ${n(cy)}). Find its image.</p>`, a: [ix, iy], show: `(${n(ix)}, ${n(iy)})`, ph: '(x, y)', hint: 'Find the vector from the centre to the point, multiply it by the scale factor, then add it to the centre.', steps: [`Centre → point: (${n(x - cx)}, ${n(y - cy)})`, `× ${n(k)}: (${n(k * (x - cx))}, ${n(k * (y - cy))})`, `Image: <b>(${n(ix)}, ${n(iy)})</b>`] };
  };
  G.describeT = () => {
    const pts = [[1, 1], [3, 1], [1, 2]]; const T = pick([
      ['Reflection in the y-axis', p => [-p[0], p[1]]], ['Reflection in the x-axis', p => [p[0], -p[1]]], ['Rotation 90° anticlockwise about (0, 0)', p => [-p[1], p[0]]],
      ['Rotation 180° about (0, 0)', p => [-p[0], -p[1]]], ['Enlargement, scale factor 2, centre (0, 0)', p => [2 * p[0], 2 * p[1]]], ['Translation by the vector (2, −3)', p => [p[0] + 2, p[1] - 3]]]);
    const img = pts.map(T[1]);
    const all = ['Reflection in the y-axis', 'Reflection in the x-axis', 'Rotation 90° anticlockwise about (0, 0)', 'Rotation 90° clockwise about (0, 0)', 'Rotation 180° about (0, 0)', 'Enlargement, scale factor 2, centre (0, 0)', 'Translation by the vector (2, −3)'];
    const poly = (p, c) => `<polygon points="${p.map(q => `${150 + q[0] * 20},${130 - q[1] * 20}`).join(' ')}" fill="${c}" fill-opacity=".45" stroke="${c}" stroke-width="2"/>`;
    let grid = ''; for (let i = -7; i <= 7; i++) { grid += `<line x1="${150 + i * 20}" y1="0" x2="${150 + i * 20}" y2="260" class="grid"/><line x1="0" y1="${130 + i * 20}" x2="300" y2="${130 + i * 20}" class="grid"/>`; }
    const svg = `<svg class="viz" viewBox="0 0 300 260">${grid}<line x1="0" y1="130" x2="300" y2="130" class="axis"/><line x1="150" y1="0" x2="150" y2="260" class="axis"/>${poly(pts, 'var(--c1)')}${poly(img, 'var(--c2)')}<text x="${150 + 1.6 * 20}" y="${130 - 1.2 * 20}" class="lbl">A</text><text x="${150 + img[0][0] * 20 + 4}" y="${130 - img[0][1] * 20 - 4}" class="lbl">B</text></svg>`;
    return { kind: 'mcq', q: `<p>Describe fully the single transformation that maps shape A onto shape B.</p>${svg}`, a: T[0], choices: mcq(T[0], K.shuffle(all.filter(x => x !== T[0]))), hint: 'Same size and flipped? Reflection. Same size, turned? Rotation. Bigger or smaller? Enlargement. Just slid? Translation.', steps: [`<b>${T[0]}</b>`, 'A full description needs: reflection + mirror line; rotation + angle + direction + centre; enlargement + scale factor + centre; translation + vector.'] };
  };
  G.vecCalc = () => {
    const a = [nz(-5, 5), nz(-5, 5)], b = [nz(-5, 5), nz(-5, 5)], p = nz(-3, 3), q = nz(-3, 3);
    const r = [p * a[0] + q * b[0], p * a[1] + q * b[1]];
    const lbl = (k, v) => (k === 1 ? '' : k === -1 ? '−' : n(k)) + `<b>${v}</b>`;
    return { kind: 'nums', ordered: true, q: `<p><b>a</b> = ${K.vec(...a)} and <b>b</b> = ${K.vec(...b)}.</p><p>Find ${lbl(p, 'a')} ${q < 0 ? '−' : '+'} ${lbl(Math.abs(q), 'b')} as a column vector.</p><p class="muted small">Type the top number then the bottom, e.g. 4, −2</p>`, a: r, show: K.vec(...r), ph: 'top, bottom', hint: 'Multiply each vector by its number, then add the tops and add the bottoms.', steps: [`${n(p)}${K.vec(...a)} = ${K.vec(p * a[0], p * a[1])}`, `${n(q)}${K.vec(...b)} = ${K.vec(q * b[0], q * b[1])}`, `Sum: <b>${K.vec(...r)}</b>`] };
  };
  G.vecMag = () => {
    const exact = Math.random() < .5; let x, y;
    if (exact) { const t = pick([[3, 4], [5, 12], [8, 15], [6, 8], [7, 24]]); x = t[0] * pick([1, -1]); y = t[1] * pick([1, -1]); if (Math.random() < .5) [x, y] = [y, x]; } else { x = nz(-9, 9); y = nz(-9, 9); }
    const m = Math.sqrt(x * x + y * y);
    const res = { kind: 'num', q: `<p>Find the magnitude of the vector ${K.vec(x, y)}${exact ? '' : ', correct to 3 s.f.'}.</p>`, hint: '|v| = √(x² + y²). It is the length of the arrow.', steps: [`√(${n(x)}² + ${n(y)}²) = √${x * x + y * y}`, `= <b>${n(K.sf(m, 3))}</b>`] };
    return exact ? Object.assign(res, { a: m }) : Object.assign(res, K.acc3(m));
  };
  G.vecGeom = () => pick([
    () => ({ kind: 'mcq', q: `<p>O is the origin, <b>OA</b> = <b>a</b> and <b>OB</b> = <b>b</b>. Express <b>AB</b> in terms of <b>a</b> and <b>b</b>.</p>`, a: '<b>b</b> − <b>a</b>', choices: K.shuffle(['<b>b</b> − <b>a</b>', '<b>a</b> − <b>b</b>', '<b>a</b> + <b>b</b>', '½(<b>a</b> + <b>b</b>)']), hint: 'Go from A back to O, then from O to B.', steps: ['AB = AO + OB = −<b>a</b> + <b>b</b> = <b>b − a</b>'] }),
    () => ({ kind: 'mcq', q: `<p><b>OA</b> = <b>a</b>, <b>OB</b> = <b>b</b>, and M is the midpoint of AB. Express <b>OM</b> in terms of <b>a</b> and <b>b</b>.</p>`, a: '½(<b>a</b> + <b>b</b>)', choices: K.shuffle(['½(<b>a</b> + <b>b</b>)', '½(<b>b</b> − <b>a</b>)', '<b>a</b> + <b>b</b>', '<b>a</b> + ½<b>b</b>']), hint: 'OM = OA + AM, and AM = ½AB.', steps: ['AB = b − a, so AM = ½(b − a)', 'OM = a + ½(b − a) = <b>½(a + b)</b>'] }),
    () => { const k = pick([[1, 2], [1, 3], [2, 1], [3, 1]]); const t = k[0] + k[1]; const ca = `${frs(k[1], t)}<b>a</b> + ${frs(k[0], t)}<b>b</b>`; return { kind: 'mcq', q: `<p><b>OA</b> = <b>a</b>, <b>OB</b> = <b>b</b>. P lies on AB with AP : PB = ${k[0]} : ${k[1]}. Express <b>OP</b> in terms of <b>a</b> and <b>b</b>.</p>`, a: ca, choices: mcq(ca, [`${frs(k[0], t)}<b>a</b> + ${frs(k[1], t)}<b>b</b>`, `<b>a</b> + ${frs(k[0], t)}<b>b</b>`, `${frs(k[0], k[1])}(<b>b</b> − <b>a</b>)`]), hint: `AP is ${frs(k[0], t)} of AB.`, steps: [`AP = ${frs(k[0], t)}(b − a)`, `OP = a + ${frs(k[0], t)}(b − a) = <b>${ca}</b>`] }; },
    () => { const k = pick([2, 3, -2, 4]), x = nz(-4, 4), y = nz(-4, 4); const is = Math.random() < .5; const v = is ? [k * x, k * y] : [k * x, k * y + nz(-2, 2)]; return { kind: 'mcq', q: `<p>Is ${K.vec(x, y)} parallel to ${K.vec(...v)}?</p>`, a: is ? 'Yes' : 'No', choices: ['Yes', 'No'], hint: 'Parallel vectors are multiples of each other.', steps: [is ? `${K.vec(...v)} = ${n(k)} × ${K.vec(x, y)}: <b>Yes</b>` : `No single number multiplies ${K.vec(x, y)} to give ${K.vec(...v)}: <b>No</b>`] }; }
  ])();

  R2O.addModule({
    id: 'vectors', name: 'Transformations and vectors', icon: '➡️', color: '#4f46e5', blurb: 'Syllabus section 7: reflections, rotations, enlargements, translations and vectors.',
    book: ['Precalculus 2e (vectors)', 'https://openstax.org/details/books/precalculus-2e'],
    lessons: [
      { id: 'v-transform', title: 'Transformations', obj: ['7.1'], kw: 'transformations reflection rotation enlargement translation',
        learn: [
          { h: 'The four transformations', b: `<ul><li><b>Reflection</b> in a mirror line (y = x, x = 2, the y-axis…)</li><li><b>Rotation</b> by 90°, 180° or 270° about a centre, clockwise or anticlockwise</li><li><b>Enlargement</b> by a scale factor from a centre</li><li><b>Translation</b> by a vector ${K.vec('x', 'y')}: x right, y up</li></ul>` },
          { h: 'Describe fully', b: `<p>Reflection → mirror line. Rotation → angle, direction, centre. Enlargement → scale factor, centre. Translation → vector. Missing one detail loses marks.</p>`, check: { q: 'Rotating (2, 5) by 180° about the origin gives…', opts: ['(−2, −5)', '(5, −2)', '(−5, 2)', '(2, −5)'], a: 0 } },
          { h: 'Unusual scale factors', b: `<p>Scale factor ½ makes the shape smaller. A <b>negative</b> scale factor puts the image on the other side of the centre, upside down.</p>` }
        ],
        keys: ['Reflection: mirror line. Rotation: angle, direction, centre.', 'Enlargement: scale factor and centre. Translation: vector.', 'Negative scale factor: image on the opposite side of the centre.'],
        gens: ['reflectPt', 'rotatePt', 'enlargePt', 'describeT'] },
      { id: 'v-vectors', title: 'Column vectors', obj: ['7.2'], kw: 'column vectors adding scalar multiplication',
        learn: [
          { h: 'What a vector is', b: `<p>A vector has <b>size</b> and <b>direction</b>. ${K.vec(3, -2)} means 3 right, 2 down. Written <b>a</b> or <span class="ovr">AB</span>.</p>` },
          { h: 'Adding and multiplying', b: `<p>${K.vec(3, -2)} + ${K.vec(1, 5)} = ${K.vec(4, 3)} · 3${K.vec(2, -1)} = ${K.vec(6, -3)}.</p><p>−<b>a</b> has the same size as <b>a</b> but the opposite direction.</p>`, check: { q: `2${K.vec(1, 4)} − ${K.vec(3, 2)} = ?`, opts: [K.vec(-1, 6), K.vec(5, 10), K.vec(-1, 2), K.vec(1, 6)], a: 0 } }
        ],
        keys: ['Top = across, bottom = up.', 'Add/subtract component by component.', 'k × vector multiplies both components.'],
        gens: ['vecCalc'] },
      { id: 'v-mag', title: 'Magnitude of a vector', obj: ['7.3'], kw: 'magnitude of a vector',
        learn: [
          { h: 'Length of the arrow', b: `<p>|${K.vec('x', 'y')}| = √(x² + y²): Pythagoras again. |${K.vec(-6, 8)}| = √(36 + 64) = <b>10</b>.</p>`, check: { q: `|${K.vec(5, -12)}| = ?`, opts: ['13', '17', '7', '√119'], a: 0 } }
        ],
        keys: ['Magnitude = √(x² + y²).', 'Written |a| or |AB|.', 'Magnitude is never negative.'],
        gens: ['vecMag'] },
      { id: 'v-geom', title: 'Vector geometry', obj: ['7.4'], kw: 'vector geometry proofs collinear',
        learn: [
          { h: 'Routes', b: `<p>To find <b>AB</b>, go any route: AB = AO + OB = −<b>a</b> + <b>b</b> = <b>b − a</b>.</p>` },
          { h: 'Parallel and collinear', b: `<p>Parallel: one vector is a multiple of the other, e.g. 2<b>a</b> + 4<b>b</b> = 2(<b>a</b> + 2<b>b</b>).</p><p>Three points are <b>collinear</b> if AB and BC are parallel <b>and</b> share the point B.</p>`, check: { q: 'If OP = a + b and OQ = 3a + 3b, then…', opts: ['P and Q are the same point', 'OQ is parallel to OP and 3 times as long', 'OP ⟂ OQ', 'Nothing can be said'], a: 1 } },
          { h: 'Ratios', b: `<p>If P divides AB in the ratio 1 : 2, then AP = ⅓ AB, so OP = <b>a</b> + ⅓(<b>b</b> − <b>a</b>) = ⅔<b>a</b> + ⅓<b>b</b>.</p>` }
        ],
        keys: ['AB = OB − OA = b − a.', 'Parallel: multiples. Collinear: parallel and a shared point.', 'Ratio m : n on AB: AP = m/(m + n) of AB.'],
        gens: ['vecGeom'] }
    ]
  });

  // ======== 8 Probability ========
  G.probSingle = () => {
    const r = rnd(1, 9), b = rnd(1, 9), g = rnd(0, 6); const t = r + b + g;
    const ask = pick([['red', r], ['blue', b], ['not red', b + g], ['red or blue', r + b]]);
    if (ask[1] === 0 || ask[1] === t) return G.probComp();
    return { kind: 'frac', simplest: true, q: `<p>A bag has ${r} red, ${b} blue${g ? ` and ${g} green` : ''} counters. One is taken at random.</p><p>Find P(${ask[0]}).</p>`, a: ask[1] / t, show: frs(ask[1], t), ph: 'e.g. 3/8', hint: 'P = number of ways it can happen ÷ total number of outcomes.', steps: [`${ask[1]} out of ${t}: ${fr(ask[1], t)}`, `<b>${frs(ask[1], t)}</b>`] };
  };
  G.probComp = () => { const p = rnd(1, 99) / 100; return { kind: 'num', q: `<p>The probability that it rains tomorrow is ${n(p)}. Find the probability that it does <b>not</b> rain.</p>`, a: K.round(1 - p, 2), hint: 'P(not A) = 1 − P(A).', steps: [`1 − ${n(p)} = <b>${n(K.round(1 - p, 2))}</b>`] }; };
  G.expected = () => {
    if (Math.random() < .5) { const tr = pick([50, 80, 100, 120, 200, 250]), p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.15]); const hits = tr * p; const N = pick([400, 500, 600, 1000]); return { kind: 'num', q: `<p>A spinner landed on <b>red</b> ${hits} times in ${tr} spins.</p><p>Use this relative frequency to estimate how many times it lands on red in <b>${N}</b> spins.</p>`, a: N * p, hint: 'Relative frequency = hits ÷ trials. Expected = probability × number of trials.', steps: [`Relative frequency = ${hits} ÷ ${tr} = ${n(p)}`, `${n(p)} × ${N} = <b>${n(N * p)}</b>`] }; }
    const k = pick([2, 4, 5, 6, 10]), N = k * rnd(5, 60); return { kind: 'num', q: `<p>A fair ${k === 6 ? 'six-sided dice' : k === 2 ? 'coin' : k + '-sided spinner'} is used ${N} times. How many times would you expect ${k === 2 ? 'heads' : 'a 1'}?</p>`, a: N / k, hint: 'Expected frequency = probability × trials.', steps: [`${fr(1, k)} × ${N} = <b>${N / k}</b>`] };
  };
  G.twoDice = () => {
    const ask = pick([['the total is ' + rnd(2, 12), (a, b, k) => a + b === k], ['both numbers are even', (a, b) => a % 2 === 0 && b % 2 === 0], ['at least one 6', (a, b) => a === 6 || b === 6], ['the numbers are the same', (a, b) => a === b], ['the product is odd', (a, b) => (a * b) % 2 === 1]]);
    const k = +ask[0].replace(/\D/g, '') || 0; let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (ask[1](a, b, k)) c++;
    if (!c) return G.probSingle();
    return { kind: 'frac', simplest: true, q: `<p>Two fair dice are rolled. Find the probability that <b>${ask[0]}</b>.</p>`, a: c / 36, show: frs(c, 36), ph: 'e.g. 5/36', hint: 'Draw the 6 × 6 sample space diagram: 36 equally likely outcomes. Count the ones that work.', steps: [`${c} of the 36 outcomes work`, `${fr(c, 36)} = <b>${frs(c, 36)}</b>`] };
  };
  G.treeDiag = () => {
    const r = rnd(2, 7), b = rnd(2, 7), t = r + b, repl = Math.random() < .5; const ask = pick(['both red', 'one of each colour', 'both the same colour']);
    const d2 = repl ? t : t - 1; const rr = r * (repl ? r : r - 1), bb = b * (repl ? b : b - 1), rb = r * b;
    const num = ask === 'both red' ? rr : ask === 'one of each colour' ? 2 * rb : rr + bb; const den = t * d2;
    return { kind: 'frac', simplest: true, q: `<p>A bag has ${r} red and ${b} blue sweets. Two are taken <b>${repl ? 'with' : 'without'} replacement</b>.</p><p>Find P(${ask}).</p>${K.tree([fr(r, t), fr(b, t)], ['R', 'B'], ['R', 'B'], [fr(repl ? r : r - 1, d2), fr(b, d2)], [fr(r, d2), fr(repl ? b : b - 1, d2)])}`, a: num / den, show: frs(num, den), ph: 'e.g. 7/15',
      hint: 'Multiply along the branches; add the results for different routes.' + (repl ? '' : ' Without replacement, the second pick has one fewer sweet.'),
      steps: ask === 'both red' ? [`${fr(r, t)} × ${fr(repl ? r : r - 1, d2)} = ${fr(rr, den)}`, `<b>${frs(num, den)}</b>`] : ask === 'one of each colour' ? [`RB + BR = ${fr(rb, den)} + ${fr(rb, den)}`, `= <b>${frs(num, den)}</b>`] : [`RR + BB = ${fr(rr, den)} + ${fr(bb, den)}`, `= <b>${frs(num, den)}</b>`] };
  };
  G.vennProb = () => {
    const a = rnd(2, 12), c = rnd(1, 8), b = rnd(2, 12), o = rnd(1, 8), T = a + b + c + o;
    const ask = pick([['A ∩ B', c], ['A ∪ B', a + b + c], ["A′", b + o], ['A only', a]]);
    return { kind: 'frac', simplest: true, q: `<p>One of the ${T} students in the Venn diagram is picked at random.</p>${K.venn({ a, ab: c, b, out: o })}<p>Find P(${ask[0]}).</p>`, a: ask[1] / T, show: frs(ask[1], T), ph: 'e.g. 3/10', steps: [`${ask[0]}: ${ask[1]} students out of ${T}`, `<b>${frs(ask[1], T)}</b>`] };
  };
  W.spinner = el => {
    el.innerHTML = `<p class="small">This spinner has P(red) = 0.3. Spin it lots of times and watch the <b>relative frequency</b> get close to 0.3.</p><div class="ctas"><button class="btn primary s1">Spin 1</button><button class="btn ghost s10">Spin 10</button><button class="btn ghost s100">Spin 100</button><button class="btn ghost rs">Reset</button></div><div class="out"></div>`;
    let N = 0, R = 0; const hist = []; const out = el.querySelector('.out');
    const draw = () => { const rf = N ? R / N : 0; out.innerHTML = `<p class="center bigq">${R} red / ${N} spins = ${N ? n(K.round(rf, 3)) : '–'}</p>` + (hist.length > 1 ? K.plot([{ f: () => 0.3, color: 'var(--c2)', dash: true }], [], { xmin: 0, xmax: Math.max(10, hist.length), ymin: 0, ymax: 1, gstep: hist.length > 50 ? 50 : 10, lstep: hist.length > 100 ? 100 : 20, h: 180, segs: [{ pts: hist.map((v, i) => [i + 1, v]) }] }) : ''); };
    const spin = k => { for (let i = 0; i < k; i++) { N++; if (Math.random() < .3) R++; hist.push(R / N); } draw(); };
    el.querySelector('.s1').onclick = () => spin(1); el.querySelector('.s10').onclick = () => spin(10); el.querySelector('.s100').onclick = () => spin(100);
    el.querySelector('.rs').onclick = () => { N = 0; R = 0; hist.length = 0; draw(); }; draw();
  };

  R2O.addModule({
    id: 'prob', name: 'Probability', icon: '🎲', color: '#16a34a', blurb: 'Syllabus section 8: the probability scale, relative and expected frequency, combined events and tree diagrams.',
    book: ['Introductory Statistics 2e', 'https://openstax.org/details/books/introductory-statistics-2e'],
    lessons: [
      { id: 'p-intro', title: 'Introduction to probability', obj: ['8.1'], kw: 'probability basics',
        learn: [
          { h: 'The scale', b: `<p>0 = impossible · 0.5 = even chance · 1 = certain. Probabilities are written as fractions, decimals or percentages, never "1 in 4" or "1 : 4".</p>` },
          { h: 'Calculating', b: `<p class="tri">P(A) = ${fr('number of ways A happens', 'total number of equally likely outcomes')}</p><p>P(rolling a 5 on a dice) = ${fr(1, 6)}.</p>`, check: { q: 'P(A) = 0.35. P(A′) = ?', opts: ['0.35', '0.65', '0.75', '−0.35'], a: 1 } },
          { h: 'Not happening', b: `<p>P(not A) = P(A′) = <b>1 − P(A)</b>.</p>` }
        ],
        keys: ['0 ⩽ P ⩽ 1.', 'P = favourable ÷ total (for equally likely outcomes).', "P(A′) = 1 − P(A)."],
        gens: ['probSingle', 'probComp'] },
      { id: 'p-freq', title: 'Relative and expected frequency', obj: ['8.2'], kw: 'relative frequency expected frequency', widget: 'spinner',
        learn: [
          { h: 'Relative frequency', b: `<p>From an experiment: relative frequency = ${fr('times it happened', 'number of trials')}. More trials → a better estimate of the probability.</p>` },
          { h: 'Expected frequency', b: `<p>Expected number = probability × number of trials. A fair coin tossed 50 times: expect 25 heads.</p><p><b>Fair</b>: all outcomes equally likely. <b>Biased</b>: not. <b>Random</b>: no outcome can be predicted.</p>`, check: { q: 'P(win) = 0.2. Expected wins in 40 games?', opts: ['2', '8', '20', '0.2'], a: 1 } }
        ],
        keys: ['Relative frequency estimates probability.', 'More trials, better estimate.', 'Expected frequency = P × number of trials.'],
        gens: ['expected'] },
      { id: 'p-combined', title: 'Combined events', obj: ['8.3', '1.2'], kw: 'tree diagrams probability',
        learn: [
          { h: 'Sample space diagrams', b: `<p>For two dice, draw a 6 × 6 grid: 36 equally likely outcomes. P(total 7) = ${fr(6, 36)} = ${fr(1, 6)}.</p>` },
          { h: 'Tree diagrams', b: `${K.tree([fr(3, 5), fr(2, 5)], ['R', 'B'], ['R', 'B'], [fr(2, 4), fr(2, 4)], [fr(3, 4), fr(1, 4)])}<p><b>Multiply along</b> branches, <b>add down</b> different routes. Without replacement, the second-pick fractions change.</p>`, check: { q: 'P(R then R) from this tree?', opts: ['3/10', '6/25', '1/2', '9/20'], a: 0, why: '3/5 × 2/4 = 6/20 = 3/10.' } },
          { h: 'Venn diagrams', b: `<p>P(A ∩ B) = number in the overlap ÷ total. P(A ∪ B) = number in A or B or both ÷ total.</p>` }
        ],
        keys: ['AND → multiply; OR (different routes) → add.', 'Without replacement: the total goes down by 1 on the second pick.', 'Use a sample space for two dice; a tree for stages.'],
        gens: ['twoDice', 'treeDiag', 'vennProb'] }
    ]
  });

  // ======== 9 Statistics ========
  G.twoWay = () => {
    const a = rnd(5, 30), b = rnd(5, 30), c = rnd(5, 30), d = rnd(5, 30);
    const cells = { a, b, c, d, r1: a + b, r2: c + d, c1: a + c, c2: b + d, t: a + b + c + d };
    const hide = pick(['a', 'b', 'c', 'd']); const show = k => k === hide ? '<b>?</b>' : cells[k];
    const h2 = K.shuffle(['r1', 'r2', 'c1', 'c2']).slice(0, 1)[0];
    return { kind: 'num', q: `<p>The two-way table shows how ${cells.t} students travel to school.</p><table class="tw"><tr><th></th><th>Bus</th><th>Walk</th><th>Total</th></tr><tr><th>Boys</th><td>${show('a')}</td><td>${show('b')}</td><td>${cells.r1}</td></tr><tr><th>Girls</th><td>${show('c')}</td><td>${show('d')}</td><td>${cells.r2}</td></tr><tr><th>Total</th><td>${cells.c1}</td><td>${cells.c2}</td><td>${cells.t}</td></tr></table><p>Find the missing number.</p>`, a: cells[hide], hint: 'Each row and each column adds up to its total.', steps: [`Use the ${hide === 'a' || hide === 'b' ? 'Boys row' : 'Girls row'}: total minus the other cell`, `<b>${cells[hide]}</b>`] };
  };
  G.averages = () => {
    const len = rnd(6, 9); let data; do { const mode = rnd(2, 20); data = [mode, mode]; while (data.length < len) { const v = rnd(1, 25); if (v !== mode && !data.includes(v)) data.push(v); } } while (false);
    data = K.shuffle(data); const sorted = data.slice().sort((x, y) => x - y); const sum = data.reduce((s, v) => s + v, 0);
    const mid = len % 2 ? sorted[(len - 1) / 2] : (sorted[len / 2 - 1] + sorted[len / 2]) / 2; const modeV = sorted.find((v, i) => sorted.indexOf(v) !== sorted.lastIndexOf(v));
    const ask = pick(['mean', 'median', 'mode', 'range']);
    const base = { kind: 'num', q: `<p>Here are some test scores:</p><p class="bigq">${data.join(', ')}</p><p>Find the <b>${ask}</b>${ask === 'mean' ? ', correct to 1 decimal place if needed' : ''}.</p>` };
    if (ask === 'mean') return Object.assign(base, { hint: 'Add them all, divide by how many there are.', steps: [`Sum = ${sum}, count = ${len}`, `${sum} ÷ ${len} = <b>${n(K.round(sum / len, 1))}</b>`] }, Number.isInteger(sum / len * 10) ? { a: sum / len } : K.accDP(sum / len, 1));
    if (ask === 'median') return Object.assign(base, { a: mid, hint: 'Put them in order first, then find the middle.', steps: [`In order: ${sorted.join(', ')}`, len % 2 ? `Middle value: <b>${mid}</b>` : `Middle two: ${sorted[len / 2 - 1]} and ${sorted[len / 2]} → <b>${n(mid)}</b>`] });
    if (ask === 'mode') return Object.assign(base, { a: modeV, hint: 'The value that appears most often.', steps: [`<b>${modeV}</b> appears twice`] });
    return Object.assign(base, { a: sorted[len - 1] - sorted[0], hint: 'Range = largest − smallest.', steps: [`${sorted[len - 1]} − ${sorted[0]} = <b>${sorted[len - 1] - sorted[0]}</b>`] });
  };
  G.groupedMean = () => {
    const w = pick([5, 10, 20]), k = 4 + rnd(0, 1); const start = pick([0, 10, 20]); const f = Array.from({ length: k }, () => rnd(2, 15));
    const rows = f.map((fi, i) => ({ lo: start + i * w, hi: start + (i + 1) * w, f: fi, mid: start + i * w + w / 2 }));
    const tot = f.reduce((s, v) => s + v, 0), fx = rows.reduce((s, r) => s + r.f * r.mid, 0); const mean = fx / tot;
    const askModal = Math.random() < .3; const maxF = Math.max(...f);
    const table = `<table class="tw"><tr><th>Time t (min)</th><th>Frequency</th></tr>${rows.map(r => `<tr><td>${r.lo} &lt; t ⩽ ${r.hi}</td><td>${r.f}</td></tr>`).join('')}</table>`;
    if (askModal && f.filter(v => v === maxF).length === 1) { const r = rows[f.indexOf(maxF)]; const right = `${r.lo} < t ⩽ ${r.hi}`; return { kind: 'mcq', q: `${table}<p>Write down the <b>modal class</b>.</p>`, a: right, choices: rows.map(x => `${x.lo} < t ⩽ ${x.hi}`), steps: [`The class with the highest frequency (${maxF}): <b>${right}</b>`] }; }
    return Object.assign({ kind: 'num', q: `${table}<p>Calculate an <b>estimate</b> of the mean, correct to 3 s.f.</p>`, hint: 'Use the midpoint of each class. Mean ≈ Σ(f × midpoint) ÷ Σf.', steps: [`Midpoints: ${rows.map(r => r.mid).join(', ')}`, `Σfx = ${rows.map(r => `${r.f}×${r.mid}`).join(' + ')} = ${fx}`, `${fx} ÷ ${tot} = <b>${n(K.sf(mean, 3))}</b>`] }, K.acc3(mean));
  };
  G.pieAngle = () => {
    const N = pick([36, 40, 60, 72, 90, 120, 180]); const cats = ['Rice', 'Noodles', 'Bread', 'Roti', 'Other'].slice(0, rnd(3, 5));
    const unit = 360 / N; let counts; do { counts = cats.map(() => rnd(1, Math.floor(N / 2))); const s = counts.slice(0, -1).reduce((a, b) => a + b, 0); counts[counts.length - 1] = N - s; } while (counts[counts.length - 1] < 1);
    const i = rnd(0, cats.length - 1);
    if (Math.random() < .5) return { kind: 'num', q: `<p>${N} people were asked their favourite breakfast. ${counts[i]} chose <b>${cats[i]}</b>.</p><p>What angle should the ${cats[i]} sector have on a pie chart?</p>`, a: counts[i] * unit, unit: '°', hint: `Each person gets 360 ÷ ${N} = ${n(unit)}°.`, steps: [`360 ÷ ${N} = ${n(unit)}° per person`, `${counts[i]} × ${n(unit)} = <b>${n(counts[i] * unit)}°</b>`] };
    return { kind: 'num', q: `<p>In a pie chart showing ${N} people, the <b>${cats[i]}</b> sector has an angle of ${n(counts[i] * unit)}°.</p>${K.pie(cats.map((c, j) => ({ label: c, v: counts[j] })))}<p>How many people chose ${cats[i]}?</p>`, a: counts[i], hint: 'Fraction of the circle = angle ÷ 360.', steps: [`${n(counts[i] * unit)} ÷ 360 × ${N} = <b>${counts[i]}</b>`] };
  };
  G.barRead = () => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; const v = labels.map(() => rnd(1, 9) * 2);
    const i = rnd(0, 4), j = (i + rnd(1, 4)) % 5; const diff = Math.random() < .5;
    return { kind: 'num', q: `<p>The bar chart shows how many books were borrowed each day.</p>${K.bars(labels.map((l, k) => ({ label: l, v: v[k] })), { max: 20, step: 2 })}<p>${diff ? `How many more books were borrowed on ${labels[i]} than on ${labels[j]}?` : `How many books were borrowed on ${labels[i]}?`}</p>`, a: diff ? v[i] - v[j] : v[i], hint: 'Read across from the top of each bar to the scale.', steps: diff ? [`${labels[i]}: ${v[i]}, ${labels[j]}: ${v[j]}`, `<b>${v[i] - v[j]}</b>`] : [`<b>${v[i]}</b>`] };
  };
  G.correlation = () => {
    const t = pick(['positive', 'negative', 'no']); const pts = Array.from({ length: 14 }, () => { const x = rnd(1, 11); const y = t === 'positive' ? x * 0.8 + rnd(-2, 2) + 1 : t === 'negative' ? 10 - x * 0.8 + rnd(-2, 2) : rnd(1, 10); return { x, y: Math.max(0.5, Math.min(11, y)), color: 'var(--c1)' }; });
    const right = t === 'no' ? 'No (zero) correlation' : t[0].toUpperCase() + t.slice(1) + ' correlation';
    return { kind: 'mcq', q: `<p>What type of correlation does this scatter diagram show?</p>${K.plot([], pts, { xmin: 0, xmax: 12, ymin: 0, ymax: 12, h: 230 })}`, a: right, choices: ['Positive correlation', 'Negative correlation', 'No (zero) correlation'], hint: 'Do the points go uphill, downhill, or show no pattern?', steps: [`<b>${right}</b>`, 'Correlation does not prove that one thing causes the other.'] };
  };
  G.cumFreq = () => {
    const w = 10, k = 5, f = Array.from({ length: k }, () => rnd(3, 20)); const cf = []; f.reduce((s, v, i) => (cf[i] = s + v), 0);
    const tot = cf[k - 1]; const bounds = Array.from({ length: k }, (_, i) => (i + 1) * w + 20);
    if (Math.random() < .5) { const i = rnd(0, k - 2); return { kind: 'num', q: `<table class="tw"><tr><th>Mass m (kg)</th>${bounds.map((b, j) => `<th>${b - w} &lt; m ⩽ ${b}</th>`).join('')}</tr><tr><th>Frequency</th>${f.map(v => `<td>${v}</td>`).join('')}</tr></table><p>How many people have a mass of <b>${bounds[i]} kg or less</b>? (Find the cumulative frequency.)</p>`, a: cf[i], hint: 'Add up the frequencies up to and including that class.', steps: [`${f.slice(0, i + 1).join(' + ')} = <b>${cf[i]}</b>`] }; }
    const half = tot / 2; let j = cf.findIndex(c => c >= half); const prev = j ? cf[j - 1] : 0; const med = bounds[j] - w + (half - prev) / f[j] * w;
    const segs = [{ pts: [[20, 0], ...bounds.map((b, i) => [b, cf[i]])] }];
    return { kind: 'num', tol: w / 4, q: `<p>The cumulative frequency graph shows the masses of ${tot} people.</p>${K.plot([{ f: () => half, color: 'var(--muted)', dash: true }], [], { xmin: 20, xmax: 20 + k * w + 2, ymin: 0, ymax: Math.ceil(tot / 10) * 10 + 5, segs, gstep: 10, lstep: 10, h: 240, xlab: 'kg', ylab: 'cf' })}<p>Use the graph to estimate the <b>median</b> mass.</p>`, a: med, show: n(K.round(med, 1)) + ' (about)', unit: 'kg', hint: `The median is at half the total: ${n(half)}. Go across from ${n(half)} to the curve, then down.`, steps: [`Half of ${tot} = ${n(half)} (dashed line)`, `Reading down: about <b>${n(K.round(med, 1))} kg</b>`] };
  };
  G.histogram = () => {
    const widths = pick([[10, 10, 20, 40], [5, 5, 10, 20], [10, 20, 20, 50]]); const fd = widths.map(() => rnd(1, 12) / 2);
    const i = rnd(0, 3); const f = fd[i] * widths[i]; let lo = 0; const cls = widths.map(w => { const c = [lo, lo + w]; lo += w; return c; });
    if (Math.random() < .5) return { kind: 'num', q: `<p>A class ${cls[i][0]} &lt; x ⩽ ${cls[i][1]} has frequency <b>${n(f)}</b>.</p><p>Find its frequency density.</p>`, a: fd[i], hint: 'Frequency density = frequency ÷ class width.', steps: [`Class width = ${widths[i]}`, `${n(f)} ÷ ${widths[i]} = <b>${n(fd[i])}</b>`] };
    return { kind: 'num', q: `<p>On a histogram, the bar for ${cls[i][0]} &lt; x ⩽ ${cls[i][1]} has a frequency density of <b>${n(fd[i])}</b>.</p><p>How many items are in this class?</p>`, a: f, hint: 'Frequency = frequency density × class width (the area of the bar).', steps: [`${n(fd[i])} × ${widths[i]} = <b>${n(f)}</b>`] };
  };
  W.statsLab = el => {
    el.innerHTML = `<label class="field">Type some numbers separated by commas<input class="inp" value="4, 7, 7, 9, 12, 15, 3"></label><div class="out"></div>`;
    const inp = el.querySelector('input'), out = el.querySelector('.out');
    const draw = () => { const d = (inp.value.match(/-?\d+(\.\d+)?/g) || []).map(Number); if (!d.length) { out.innerHTML = ''; return; }
      const s = d.slice().sort((a, b) => a - b), L = d.length, mean = d.reduce((a, b) => a + b, 0) / L, med = L % 2 ? s[(L - 1) / 2] : (s[L / 2 - 1] + s[L / 2]) / 2;
      const cnt = {}; d.forEach(v => cnt[v] = (cnt[v] || 0) + 1); const mx = Math.max(...Object.values(cnt)); const modes = mx > 1 ? Object.keys(cnt).filter(k => cnt[k] === mx) : [];
      out.innerHTML = `<p>In order: ${s.join(', ')}</p><div class="stats"><div><b>${n(K.round(mean, 2))}</b><span>mean</span></div><div><b>${n(med)}</b><span>median</span></div><div><b>${modes.length ? modes.join(', ') : 'none'}</b><span>mode</span></div><div><b>${n(s[L - 1] - s[0])}</b><span>range</span></div></div><p class="muted small">Try adding a really big number: watch the mean jump but the median barely move.</p>`; };
    inp.oninput = draw; draw();
  };

  R2O.addModule({
    id: 'stats', name: 'Statistics', icon: '📊', color: '#0f766e', blurb: 'Syllabus section 9: tables, averages, charts, scatter diagrams, cumulative frequency and histograms.',
    book: ['Introductory Statistics 2e', 'https://openstax.org/details/books/introductory-statistics-2e'],
    lessons: [
      { id: 's-data', title: 'Tables and interpreting data', obj: ['9.1', '9.2'], kw: 'two way tables',
        learn: [
          { h: 'Tally and two-way tables', b: `<p>Tally in groups of five (𝍸). A two-way table splits data two ways, e.g. boys/girls × bus/walk. Every row and column adds to its total.</p>` },
          { h: 'Drawing conclusions', b: `<p>Compare averages <b>and</b> spread. Be careful: a small sample, or a biased one, limits what you can conclude.</p>`, check: { q: 'Class A mean 62, range 40. Class B mean 62, range 12. Which is more consistent?', opts: ['A', 'B', 'Same', 'Cannot tell'], a: 1, why: 'Smaller range: less spread.' } }
        ],
        keys: ['Rows and columns add to their totals.', 'Compare an average and a measure of spread.', 'Small or biased samples limit conclusions.'],
        gens: ['twoWay'] },
      { id: 's-avg', title: 'Mean, median, mode and range', obj: ['9.3'], kw: 'mean median mode range', widget: 'statsLab',
        learn: [
          { h: 'Three averages and a spread', b: `<ul><li><b>Mean</b>: total ÷ how many</li><li><b>Median</b>: middle value once in order</li><li><b>Mode</b>: most common</li><li><b>Range</b>: largest − smallest</li></ul>` },
          { h: 'Which average?', b: `<p>The mean uses every value but is pulled by extreme values. The median ignores extremes. The mode works for non-numbers (favourite colour).</p>`, check: { q: 'Median of 3, 9, 4, 7, 1, 8?', opts: ['5.5', '7', '4', '5.3'], a: 0, why: 'In order 1, 3, 4, 7, 8, 9: middle two 4 and 7.' } }
        ],
        keys: ['Order the data before finding the median.', 'Even count: median = mean of the middle two.', 'Extreme values affect the mean, not the median.'],
        gens: ['averages'] },
      { id: 's-grouped', title: 'Grouped data', obj: ['9.3'], kw: 'estimated mean grouped frequency table',
        learn: [
          { h: 'Estimating the mean', b: `<p>We don't know the exact values, so use each class's <b>midpoint</b>.</p><table class="tw"><tr><th>t</th><th>f</th><th>mid</th><th>f × mid</th></tr><tr><td>0–10</td><td>4</td><td>5</td><td>20</td></tr><tr><td>10–20</td><td>6</td><td>15</td><td>90</td></tr><tr><td>20–30</td><td>10</td><td>25</td><td>250</td></tr></table><p>Mean ≈ 360 ÷ 20 = <b>18</b>.</p>` },
          { h: 'Modal class', b: `<p>The class with the highest frequency (here 20–30). It is only an <b>estimate</b> because we used midpoints.</p>`, check: { q: 'Midpoint of 40 < x ⩽ 60?', opts: ['40', '50', '60', '20'], a: 1 } }
        ],
        keys: ['Use class midpoints.', 'Mean ≈ Σ(f × mid) ÷ Σf.', 'Modal class: highest frequency.'],
        gens: ['groupedMean'] },
      { id: 's-charts', title: 'Charts and diagrams', obj: ['9.4'], kw: 'pie charts bar charts',
        learn: [
          { h: 'Bar charts and pictograms', b: `${K.bars([{ label: 'A', v: 6 }, { label: 'B', v: 9 }, { label: 'C', v: 4 }], { max: 10, step: 2 })}<p>Bars have equal widths and gaps. Stacked (composite) and side-by-side (dual) bar charts compare groups. Pictograms need a key.</p>` },
          { h: 'Pie charts', b: `<p>Angle = ${fr('frequency', 'total')} × 360°. 90 people, 15 chose tea: ${fr(15, 90)} × 360 = <b>60°</b>.</p>`, check: { q: '40 people; 10 chose blue. Sector angle?', opts: ['10°', '25°', '90°', '36°'], a: 2 } }
        ],
        keys: ['Pie chart angle = frequency ÷ total × 360°.', 'Frequency from angle = angle ÷ 360 × total.', 'Pictograms need a key.'],
        gens: ['pieAngle', 'barRead'] },
      { id: 's-scatter', title: 'Scatter diagrams', obj: ['9.5'], kw: 'scatter graphs correlation line of best fit',
        learn: [
          { h: 'Correlation', b: `<div class="two">${K.plot([], [[1, 2], [2, 3], [3, 3.5], [4, 5], [5, 5.5], [6, 7]].map(p => ({ x: p[0], y: p[1] })), { xmin: 0, xmax: 7, ymin: 0, ymax: 8, w: 150, h: 150, lstep: 10 })}${K.plot([], [[1, 7], [2, 6], [3, 5.5], [4, 4], [5, 3], [6, 1.5]].map(p => ({ x: p[0], y: p[1] })), { xmin: 0, xmax: 7, ymin: 0, ymax: 8, w: 150, h: 150, lstep: 10 })}</div><p>Uphill = <b>positive</b>; downhill = <b>negative</b>; no pattern = <b>zero</b> correlation.</p>` },
          { h: 'Line of best fit', b: `<p>One <b>ruled</b> straight line, drawn by eye across the whole data set, with roughly equal points on each side. Use it to estimate values inside the data range.</p>`, check: { q: 'Hours of revision vs test score usually shows…', opts: ['positive correlation', 'negative correlation', 'no correlation', 'a curve'], a: 0 } }
        ],
        keys: ['Positive, negative or zero correlation.', 'Line of best fit: single ruled line, balanced points either side.', 'Correlation is not causation.'],
        gens: ['correlation'] },
      { id: 's-cumfreq', title: 'Cumulative frequency', obj: ['9.6'], kw: 'cumulative frequency median quartiles',
        learn: [
          { h: 'Running totals', b: `<p>Add the frequencies as you go. Plot each running total at the <b>upper end</b> of its class, and join with a smooth curve.</p>` },
          { h: 'Reading the curve', b: `<p>For n values: median at ${fr('n', 2)}, lower quartile at ${fr('n', 4)}, upper quartile at ${fr('3n', 4)}. <b>IQR = UQ − LQ</b>.</p><p>Percentiles work the same way: the 90th percentile is at 0.9n.</p>`, check: { q: '80 values. Read the lower quartile at cumulative frequency…', opts: ['20', '40', '60', '25'], a: 0 } }
        ],
        keys: ['Plot at upper class boundaries.', 'Median at n/2, LQ at n/4, UQ at 3n/4.', 'IQR = UQ − LQ.'],
        gens: ['cumFreq'] },
      { id: 's-hist', title: 'Histograms', obj: ['9.7'], kw: 'histograms frequency density',
        learn: [
          { h: 'Area shows frequency', b: `<p>With unequal class widths, the vertical axis is <b>frequency density</b>:</p><p class="tri">frequency density = ${fr('frequency', 'class width')}</p><p>So the <b>area</b> of each bar = frequency.</p>`, check: { q: 'Class 20 < x ⩽ 50 has frequency 45. Frequency density?', opts: ['1.5', '45', '0.67', '15'], a: 0, why: '45 ÷ 30.' } }
        ],
        keys: ['Frequency density = frequency ÷ class width.', 'Frequency = area of bar = fd × width.', 'Bars touch; no gaps.'],
        gens: ['histogram'] }
    ]
  });
})();
