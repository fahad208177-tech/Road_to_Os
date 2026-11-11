// Additional Mathematics 4037, part 2: circular measure (9), trigonometry (10), permutations and combinations (11),
// series (12), vectors (13) and calculus (14).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, nz, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Calculus Volume 1', 'https://openstax.org/details/books/calculus-volume-1'];
  const D = Math.PI / 180, sg = (k, first) => k < 0 ? ` − ${n(-k)}` : first ? n(k) : ` + ${n(k)}`;
  const nums = (q, arr, steps, hint, tol) => ({ kind: 'nums', q, a: arr, steps, hint, tol });
  const fact = k => k <= 1 ? 1 : k * fact(k - 1), P = (a, b) => fact(a) / fact(a - b), C = (a, b) => fact(a) / (fact(b) * fact(a - b));
  const term = (c, p) => { if (!c) return ''; const s = c < 0 ? ' − ' : ' + ', a = Math.abs(c); return s + (p === 0 ? n(a) : `${a === 1 ? '' : n(a)}x${p === 1 ? '' : `<sup>${n(p)}</sup>`}`); };
  const poly = cs => { const t = cs.map(([c, p]) => term(c, p)).join('').trim(); return t.startsWith('+ ') ? t.slice(2) : t.replace(/^− /, '−'); };

  // ================= generators =================
  G.amRadian = () => { const kind = pick(['toRad', 'toDeg', 'arc', 'sector', 'sector']), R = pick([3, 4, 5, 6, 8, 10, 12]), th = pick([0.5, 0.8, 1.2, 1.5, 2, 2.5]);
    if (kind === 'toRad') { const d = pick([30, 45, 60, 90, 120, 135, 150, 270]); return Object.assign(num(`<p>Convert ${d}° to radians (3 s.f.).</p>`, 0, 'rad', [`× π ÷ 180: ${d} × π ÷ 180 = <b>${n(K.sf(d * D, 3))}</b>`], 'π radians = 180°.'), K.acc3(d * D)); }
    if (kind === 'toDeg') return Object.assign(num(`<p>Convert ${n(th)} radians to degrees (1 d.p.).</p>`, 0, '°', [`× 180 ÷ π: ${n(th)} × 180 ÷ π = <b>${n(r(th / D, 1))}°</b>`], 'π radians = 180°.'), K.accDP(th / D, 1));
    if (kind === 'arc') return num(`<p>A sector has radius ${R} cm and angle ${n(th)} radians. Find the arc length.</p>`, R * th, 'cm', [`s = rθ = ${R} × ${n(th)} = <b>${n(r(R * th, 3))} cm</b>`], 'Arc length s = rθ (θ in radians). Not given on the formula list!');
    return num(`<p>A sector has radius ${R} cm and angle ${n(th)} radians. Find its area.</p>`, .5 * R * R * th, 'cm²', [`A = ½r²θ = ½ × ${R}² × ${n(th)} = <b>${n(r(.5 * R * R * th, 3))} cm²</b>`], 'Sector area = ½r²θ (θ in radians).'); };
  G.amTrigGraph = () => { const a = rnd(1, 5), b = pick([1, 2, 3, 4, 0.5]), c = rnd(-3, 3), f = pick(['sin', 'cos']), kind = pick(['per', 'amp', 'max', 'min']);
    const eqn = `y = ${a === 1 ? '' : a} ${f} ${b === 1 ? '' : b === 0.5 ? '½' : b}x${c ? sg(c) : ''}`;
    if (kind === 'per') return num(`<p>What is the period of ${eqn}, in degrees?</p>`, 360 / b, '°', [`period = 360° ÷ ${n(b)} = <b>${n(360 / b)}°</b>`], 'b squeezes the graph: period = 360° ÷ b.');
    if (kind === 'amp') return num(`<p>What is the amplitude of ${eqn}?</p>`, a, '', [`amplitude = a = <b>${a}</b>`], 'a stretches it vertically.');
    if (kind === 'max') return num(`<p>What is the maximum value of ${eqn}?</p>`, a + c, '', [`max of ${f} is 1, so max = ${a} × 1${sg(c)} = <b>${a + c}</b>`], 'Largest = a + c.');
    return num(`<p>What is the minimum value of ${eqn}?</p>`, -a + c, '', [`min of ${f} is −1, so min = ${a} × (−1)${sg(c)} = <b>${-a + c}</b>`], 'Smallest = −a + c.'); };
  G.amTrigSolve = () => { const f = pick(['sin', 'cos', 'tan']), k = f === 'tan' ? pick([0.5, 1, 2, -1, 3]) : pick([0.3, 0.5, 0.7, -0.4, -0.6, 0.8]); let xs;
    if (f === 'sin') { const p = Math.asin(k) / D; xs = [p < 0 ? 180 - p : p, p < 0 ? 360 + p : 180 - p]; }
    else if (f === 'cos') { const p = Math.acos(k) / D; xs = [p, 360 - p]; }
    else { const p = Math.atan(k) / D; xs = [p < 0 ? p + 180 : p, p < 0 ? p + 360 : p + 180]; }
    xs.sort((a, b) => a - b);
    return nums(`<p>Solve ${f} x = ${n(k)} for 0° ⩽ x ⩽ 360°. Give both answers to 1 d.p., separated by a comma.</p>`, xs, [`principal value: ${f}⁻¹(${n(k)}) = ${n(r(f === 'sin' ? Math.asin(k) / D : f === 'cos' ? Math.acos(k) / D : Math.atan(k) / D, 1))}°`, f === 'sin' ? 'sin is also positive/negative in the matching quadrant: use 180° − x (and add 360° if negative)' : f === 'cos' ? 'cos: the second answer is 360° − x' : 'tan repeats every 180°: add 180°', `x = <b>${xs.map(x => n(r(x, 1))).join('°, ')}°</b>`], 'Find the calculator value, then use the graph (or CAST) for the second solution.', .06); };
  G.amIdentity = () => { const t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]); const [o, a, h] = t; const fnName = pick(['sec', 'cosec', 'cot', 'sec2']);
    const val = { sec: h / a, cosec: h / o, cot: a / o, sec2: (h / a) ** 2 }[fnName];
    return num(`<p>Angle A is acute and tan A = ${o}/${a}. Find the exact value of ${fnName === 'sec2' ? 'sec² A' : fnName + ' A'}, as a decimal.</p>`, val, '', [`Right triangle: opposite ${o}, adjacent ${a}, hypotenuse √(${o}² + ${a}²) = ${h}`, fnName === 'sec2' ? `sec² A = 1 + tan² A = 1 + ${o * o}/${a * a} = <b>${n(r(val, 4))}</b>` : `${fnName} A = ${fnName === 'sec' ? `hyp ÷ adj = ${h}/${a}` : fnName === 'cosec' ? `hyp ÷ opp = ${h}/${o}` : `adj ÷ opp = ${a}/${o}`} = <b>${n(r(val, 4))}</b>`], 'sec = 1/cos, cosec = 1/sin, cot = 1/tan.'); };
  bank('amTrigIdea', [
    { q: 'sec x =', a: '1 ÷ cos x', w: ['1 ÷ sin x', '1 ÷ tan x', 'cos x ÷ sin x'], why: 'cosec x = 1 ÷ sin x, cot x = 1 ÷ tan x.' },
    { q: 'Which identity is true?', a: 'sec² A = 1 + tan² A', w: ['sec² A = 1 − tan² A', 'sin A + cos A = 1', 'cosec² A = 1 − cot² A'], why: 'Divide sin² + cos² = 1 by cos² A. (Given on the formula list.)' },
    { q: 'The period of y = 3 sin 2x is…', a: '180°', w: ['360°', '720°', '120°'], why: '360° ÷ 2.' },
    { q: 'y = tan x has asymptotes at…', a: 'x = 90°, 270°, …', w: ['x = 0°, 180°', 'y = 1', 'no asymptotes'], why: 'Where cos x = 0.' },
    { q: 'In which quadrant are both sin and tan negative?', a: 'The fourth (270°–360°)', w: ['The first', 'The second', 'The third'], why: 'CAST: only cos is positive in the 4th quadrant.' },
    { q: 'To prove an identity, you should…', a: 'work on one side until it becomes the other', w: ['assume it is true and solve', 'substitute one value only', 'square both sides'], why: 'Use sin² + cos² = 1 and the other given identities.' }
  ]);
  G.amPerm = () => { const kind = pick(['nPr', 'nCr', 'arr', 'committee']);
    if (kind === 'nPr') { const a = rnd(5, 10), b = rnd(2, 4); return num(`<p>In how many ways can ${b} different prizes be given to ${a} people (one prize each)?</p>`, P(a, b), '', [`Order matters (different prizes): ⁿPᵣ = ${a}P${b} = ${a}!/${a - b}! = <b>${n(P(a, b))}</b>`], 'Different prizes → order matters → permutation.'); }
    if (kind === 'nCr') { const a = rnd(5, 12), b = rnd(2, 5); return num(`<p>In how many ways can a team of ${b} be chosen from ${a} people?</p>`, C(a, b), '', [`Order doesn't matter: ⁿCᵣ = ${a}C${b} = ${a}!/(${b}! × ${a - b}!) = <b>${n(C(a, b))}</b>`], 'A team is just a group → combination.'); }
    if (kind === 'arr') { const w = pick(['MATHS', 'PRIZE', 'LEARN', 'FOCUS', 'GRAPHIC']); return num(`<p>How many different arrangements are there of all the letters of the word <b>${w}</b>?</p>`, fact(w.length), '', [`${w.length} different letters: ${w.length}! = <b>${n(fact(w.length))}</b>`], 'n different objects in a line: n!'); }
    const m = rnd(4, 7), f = rnd(4, 7), sz = pick([3, 4]), k = rnd(1, sz - 1); const v = C(m, k) * C(f, sz - k);
    return num(`<p>A committee of ${sz} is chosen from ${m} men and ${f} women. How many committees have exactly ${k} m${k > 1 ? 'en' : 'an'}?</p>`, v, '', [`choose the men: ${m}C${k} = ${C(m, k)}`, `choose the women: ${f}C${sz - k} = ${C(f, sz - k)}`, `multiply: <b>${n(v)}</b>`], 'Choose each part separately, then multiply.'); };
  bank('amPermIdea', [
    { q: 'Arranging books on a shelf is a…', a: 'permutation (order matters)', w: ['combination', 'neither', 'probability'], why: 'Choosing a group where order doesn\'t matter is a combination.' },
    { q: '0! =', a: '1', w: ['0', 'it does not exist', 'infinity'], why: 'By definition, so that the formulas work.' },
    { q: 'ⁿPᵣ =', a: 'n! ÷ (n − r)!', w: ['n! ÷ r!', 'n! ÷ (r!(n − r)!)', 'n × r'], why: 'ⁿCᵣ = n! ÷ (r!(n − r)!).' },
    { q: 'Why is ⁿCᵣ smaller than ⁿPᵣ?', a: 'Each group of r can be ordered in r! ways, and combinations count each group once', w: ['Combinations use fewer people', 'Permutations repeat objects', 'They are equal'], why: 'ⁿCᵣ = ⁿPᵣ ÷ r!.' }
  ]);
  G.amBinomial = () => { const a = pick([1, 2, 3]), b = pick([1, 2, -1, -2, 3]), nn = rnd(4, 7), k = rnd(1, Math.min(3, nn)); const coef = C(nn, k) * a ** (nn - k) * b ** k;
    return num(`<p>Find the coefficient of x<sup>${k}</sup> in the expansion of (${a}${b < 0 ? ' − ' : ' + '}${Math.abs(b) === 1 ? '' : Math.abs(b)}x)<sup>${nn}</sup>.</p>`, coef, '', [`General term: ⁿCᵣ aⁿ⁻ʳ (bx)ʳ with r = ${k}`, `${nn}C${k} × ${a}<sup>${nn - k}</sup> × (${b})<sup>${k}</sup> = ${C(nn, k)} × ${a ** (nn - k)} × ${b ** k} = <b>${n(coef)}</b>`], 'Use ⁿCᵣ aⁿ⁻ʳ bʳ; remember to raise the whole of bx (including its sign) to the power.'); };
  G.amAP = () => { const a = rnd(-5, 10), d = nz(-4, 6), nn = rnd(8, 25), kind = pick(['nth', 'sum']);
    if (kind === 'nth') return num(`<p>An arithmetic progression has first term ${a} and common difference ${d}. Find the ${nn}th term.</p>`, a + (nn - 1) * d, '', [`uₙ = a + (n − 1)d = ${a} + ${nn - 1} × ${d} = <b>${a + (nn - 1) * d}</b>`], 'Each term adds d. The nth term has added d (n − 1) times.');
    const Sn = nn / 2 * (2 * a + (nn - 1) * d); return num(`<p>An AP has first term ${a} and common difference ${d}. Find the sum of the first ${nn} terms.</p>`, Sn, '', [`Sₙ = n/2 (2a + (n − 1)d) = ${nn}/2 × (${2 * a} + ${(nn - 1) * d}) = <b>${n(Sn)}</b>`], 'Sₙ = n/2 (2a + (n − 1)d). (Given on the formula list.)'); };
  G.amGP = () => { const a = pick([2, 3, 4, 5, 8, 10, 64, 81]), rr = pick([2, 3, 0.5, -2, 0.25, -0.5]), nn = rnd(4, 8), kind = Math.abs(rr) < 1 ? pick(['nth', 'sum', 'inf', 'inf']) : pick(['nth', 'sum']);
    if (kind === 'nth') return num(`<p>A geometric progression has first term ${a} and common ratio ${n(rr)}. Find the ${nn}th term.</p>`, a * rr ** (nn - 1), '', [`uₙ = arⁿ⁻¹ = ${a} × ${n(rr)}<sup>${nn - 1}</sup> = <b>${n(r(a * rr ** (nn - 1), 6))}</b>`], 'Multiply by r each time.');
    if (kind === 'sum') { const Sn = a * (1 - rr ** nn) / (1 - rr); return Object.assign(num(`<p>A GP has first term ${a} and common ratio ${n(rr)}. Find the sum of the first ${nn} terms (3 s.f. if needed).</p>`, Sn, '', [`Sₙ = a(1 − rⁿ) ÷ (1 − r) = <b>${n(K.sf(Sn, 4))}</b>`], 'Sₙ = a(1 − rⁿ)/(1 − r). (Given.)'), Number.isInteger(r(Sn, 6)) ? { a: r(Sn, 6) } : K.acc3(Sn)); }
    const Sinf = a / (1 - rr); return num(`<p>A GP has first term ${a} and common ratio ${n(rr)}. Find its sum to infinity.</p>`, Sinf, '', [`|r| < 1, so it converges`, `S∞ = a ÷ (1 − r) = ${a} ÷ ${n(1 - rr)} = <b>${n(r(Sinf, 4))}</b>`], 'Only when −1 < r < 1.'); };
  bank('amSeriesIdea', [
    { q: 'A geometric progression has a sum to infinity only when…', a: '−1 < r < 1', w: ['r > 1', 'r = 1', 'a > 0'], why: 'Then the terms shrink towards 0.' },
    { q: '3, 7, 11, 15, … is…', a: 'an arithmetic progression (d = 4)', w: ['a geometric progression', 'neither', 'both'], why: 'A constant difference.' },
    { q: '2, 6, 18, 54, … is…', a: 'a geometric progression (r = 3)', w: ['an arithmetic progression', 'neither', 'convergent'], why: 'A constant ratio. It does not have a sum to infinity (r > 1).' },
    { q: 'The number of terms in the expansion of (a + b)⁷ is…', a: '8', w: ['7', '6', '14'], why: 'n + 1 terms.' }
  ]);
  G.amVector = () => { const kind = pick(['mag', 'unit', 'pos', 'pos', 'AB']); const a = nz(-8, 8), b = nz(-8, 8);
    if (kind === 'mag') { const t = pick([[3, 4], [5, 12], [6, 8], [8, 15], [-3, 4], [7, -24]]); return num(`<p>Find the magnitude of ${t[0]}i ${t[1] < 0 ? '−' : '+'} ${Math.abs(t[1])}j.</p>`, Math.hypot(...t), '', [`|v| = √(${t[0]}² + ${t[1]}²) = <b>${Math.hypot(...t)}</b>`], 'Pythagoras.'); }
    if (kind === 'unit') { const t = pick([[3, 4], [5, 12], [-6, 8], [8, -15]]); const m = Math.hypot(...t); return nums(`<p>Find the unit vector in the direction of ${t[0]}i ${t[1] < 0 ? '−' : '+'} ${Math.abs(t[1])}j. Give the i and j components as decimals, separated by a comma.</p>`, [t[0] / m, t[1] / m], [`magnitude = ${m}`, `unit vector = (${t[0]}i + ${t[1]}j) ÷ ${m} = <b>${n(r(t[0] / m, 4))}i ${t[1] < 0 ? '−' : '+'} ${n(Math.abs(r(t[1] / m, 4)))}j</b>`], 'Divide by the magnitude.', .005); }
    if (kind === 'AB') { const p = [rnd(-5, 5), rnd(-5, 5)], q = [rnd(-5, 5), rnd(-5, 5)]; return nums(`<p>A has position vector ${p[0]}i ${p[1] < 0 ? '−' : '+'} ${Math.abs(p[1])}j and B has ${q[0]}i ${q[1] < 0 ? '−' : '+'} ${Math.abs(q[1])}j. Find the vector AB→ as i, j components (separated by a comma).</p>`, [q[0] - p[0], q[1] - p[1]], [`AB = b − a = (${q[0]} − ${p[0]})i + (${q[1]} − ${p[1]})j = <b>${q[0] - p[0]}i ${q[1] - p[1] < 0 ? '−' : '+'} ${Math.abs(q[1] - p[1])}j</b>`], 'AB = b − a (end minus start).', 1e-6); }
    const v = [nz(-5, 5), nz(-5, 5)], t = rnd(2, 6), r0 = [rnd(-10, 10), rnd(-10, 10)];
    return nums(`<p>A particle starts at position vector (${r0[0]}i ${r0[1] < 0 ? '−' : '+'} ${Math.abs(r0[1])}j) m and moves with constant velocity (${v[0]}i ${v[1] < 0 ? '−' : '+'} ${Math.abs(v[1])}j) m/s. Find its position vector after ${t} s (i, j components, separated by a comma).</p>`, [r0[0] + t * v[0], r0[1] + t * v[1]], [`r = r₀ + tv = (${r0[0]} + ${t} × ${v[0]})i + (${r0[1]} + ${t} × ${v[1]})j`, `= <b>${r0[0] + t * v[0]}i ${r0[1] + t * v[1] < 0 ? '−' : '+'} ${Math.abs(r0[1] + t * v[1])}j</b>`], 'position = start + time × velocity.', 1e-6); };
  bank('amVectorIdea', [
    { q: 'The unit vector in the direction of a is…', a: 'a ÷ |a|', w: ['a × |a|', '|a|', 'a − 1'], why: 'Same direction, length 1.' },
    { q: 'If a and b are not parallel and pa + qb = 3a − 2b, then…', a: 'p = 3 and q = −2', w: ['p = −2 and q = 3', 'p = q', 'there is no solution'], why: 'Equate like vectors.' },
    { q: 'A boat heads across a river while a current flows downstream. Its actual velocity is…', a: 'the vector sum of its own velocity and the current', w: ['just the boat\'s velocity', 'the difference of the speeds', 'the current only'], why: 'Compose velocities by adding vectors.' }
  ]);
  // calculus
  G.amDiff = () => { const kind = pick(['poly', 'poly', 'chain', 'trig', 'exp', 'product']); const x0 = rnd(1, 3);
    if (kind === 'poly') { const cs = [[nz(-4, 5), 3], [rnd(-6, 6), 2], [rnd(-8, 8), 1], [rnd(-9, 9), 0]]; if (Math.random() < .4) cs[3] = [pick([2, 4, 6, -8]), -1]; const d = cs.reduce((s, [c, p]) => s + c * p * x0 ** (p - 1), 0);
      return num(`<p>y = ${poly(cs)}. Find dy/dx when x = ${x0}.</p>`, d, '', [`dy/dx = ${poly(cs.filter(([c, p]) => p !== 0).map(([c, p]) => [c * p, p - 1]))}`, `at x = ${x0}: <b>${n(r(d, 4))}</b>`], 'Multiply by the power, then reduce the power by 1.'); }
    if (kind === 'chain') { const a = pick([2, 3]), b = rnd(1, 5), nn = pick([2, 3, 4, -1]); const d = nn * a * (a * x0 + b) ** (nn - 1);
      return num(`<p>y = (${a}x + ${b})<sup>${nn}</sup>. Find dy/dx when x = ${x0}.</p>`, d, '', [`chain rule: dy/dx = ${nn} × ${a} × (${a}x + ${b})<sup>${nn - 1}</sup>`, `at x = ${x0}: ${nn * a} × ${a * x0 + b}<sup>${nn - 1}</sup> = <b>${n(r(d, 4))}</b>`], 'Power down, reduce the power, multiply by the derivative of the inside.'); }
    if (kind === 'trig') { const k = pick([2, 3]), f = pick(['sin', 'cos']); const xr = pick([0, Math.PI / 6, Math.PI / 4, Math.PI / 3]); const d = f === 'sin' ? k * Math.cos(k * xr) : -k * Math.sin(k * xr); const lab = { 0: '0', [Math.PI / 6]: 'π/6', [Math.PI / 4]: 'π/4', [Math.PI / 3]: 'π/3' }[xr];
      return Object.assign(num(`<p>y = ${f} ${k}x. Find dy/dx when x = ${lab} (radians), to 3 s.f.</p>`, 0, '', [`dy/dx = ${f === 'sin' ? `${k} cos ${k}x` : `−${k} sin ${k}x`}`, `at x = ${lab}: <b>${n(K.sf(d, 3))}</b>`], 'd/dx sin kx = k cos kx; d/dx cos kx = −k sin kx (radians!).'), Math.abs(d) < 1e-9 ? { a: 0 } : K.acc3(d)); }
    if (kind === 'exp') { const k = pick([2, 3, -1]); const d = k * Math.exp(k * 0); if (Math.random() < .5) return num(`<p>y = e<sup>${k}x</sup>. Find dy/dx when x = 0.</p>`, d, '', [`dy/dx = ${k}e<sup>${k}x</sup>; at x = 0, e⁰ = 1 → <b>${k}</b>`], 'd/dx e^(kx) = k e^(kx).');
      const a = pick([2, 3, 5]); return num(`<p>y = ln(${a}x). Find dy/dx when x = ${x0}.</p>`, 1 / x0, '', [`ln(${a}x) = ln ${a} + ln x, so dy/dx = 1/x`, `at x = ${x0}: <b>${n(r(1 / x0, 4))}</b>`], 'd/dx ln(ax) = 1/x.'); }
    const a = rnd(1, 4); // y = x(x + a)³ → y′ = (x + a)³ + 3x(x + a)²
    const dv = (x0 + a) ** 3 + 3 * x0 * (x0 + a) ** 2; return num(`<p>y = x(x + ${a})³. Find dy/dx when x = ${x0}.</p>`, dv, '', [`product rule: dy/dx = (x + ${a})³ + x × 3(x + ${a})²`, `at x = ${x0}: ${(x0 + a) ** 3} + ${3 * x0 * (x0 + a) ** 2} = <b>${dv}</b>`], 'Product rule: u′v + uv′.'); };
  G.amStationary = () => { const p = rnd(-3, 0), q2 = rnd(1, 4); const a = 1, b = -1.5 * (p + q2), c = 3 * p * q2; const kind = pick(['x', 'nature']); const cs = [[a, 3], [b, 2], [c, 1], [rnd(-5, 5), 0]];
    if (kind === 'x') return nums(`<p>Find the x-coordinates of the stationary points of y = ${poly(cs)}. Give both, separated by a comma.</p>`, [p, q2], [`dy/dx = 3x² ${b * 2 < 0 ? '−' : '+'} ${n(Math.abs(2 * b))}x ${3 * p * q2 < 0 ? '−' : '+'} ${n(Math.abs(c))} = 0`, `÷ 3: x² ${-(p + q2) < 0 ? '−' : '+'} ${n(Math.abs(p + q2))}x ${p * q2 < 0 ? '−' : '+'} ${n(Math.abs(p * q2))} = 0 → (x${sg(-p)})(x${sg(-q2)}) = 0`, `x = <b>${p} and ${q2}</b>`], 'Stationary points: dy/dx = 0.', 1e-6);
    const which = pick([p, q2]); const d2 = 6 * which + 2 * b; const nat = d2 > 0 ? 'minimum' : 'maximum';
    return { kind: 'mcq', q: `<p>y = ${poly(cs)} has a stationary point at x = ${which}. Is it a maximum or a minimum?</p>`, choices: ['maximum', 'minimum'], a: nat, hint: 'Find d²y/dx² there: positive → minimum, negative → maximum.', steps: [`d²y/dx² = 6x ${2 * b < 0 ? '−' : '+'} ${n(Math.abs(2 * b))}`, `at x = ${which}: ${n(d2)} ${d2 > 0 ? '> 0 → <b>minimum</b>' : '< 0 → <b>maximum</b>'}`] }; };
  G.amTangent = () => { const a = nz(-2, 3), b = rnd(-4, 4), c = rnd(-5, 5), x0 = rnd(-2, 3); const m = 2 * a * x0 + b, kind = pick(['tan', 'norm']);
    const cs = [[a, 2], [b, 1], [c, 0]];
    if (kind === 'tan' || m === 0) return num(`<p>Find the gradient of the tangent to y = ${poly(cs)} at x = ${x0}.</p>`, m, '', [`dy/dx = ${2 * a}x${sg(b)}`, `at x = ${x0}: <b>${m}</b>`], 'Gradient of the tangent = dy/dx at that point.');
    return num(`<p>Find the gradient of the normal to y = ${poly(cs)} at x = ${x0}.</p>`, -1 / m, '', [`tangent gradient = ${2 * a}(${x0})${sg(b)} = ${m}`, `normal ⟂ tangent: −1 ÷ ${m} = <b>${n(r(-1 / m, 4))}</b>`], 'Normal gradient = −1 ÷ tangent gradient.'); };
  G.amRates = () => { const kind = pick(['circle', 'sphere', 'small']);
    if (kind === 'circle') { const rr = pick([2, 3, 5, 10]), dr = pick([0.1, 0.2, 0.5, 2]); const v = 2 * Math.PI * rr * dr; return Object.assign(num(`<p>The radius of a circle increases at ${n(dr)} cm/s. How fast is the area increasing when r = ${rr} cm? (3 s.f.)</p>`, 0, 'cm²/s', [`A = πr², dA/dr = 2πr`, `dA/dt = dA/dr × dr/dt = 2π(${rr}) × ${n(dr)} = <b>${n(K.sf(v, 3))} cm²/s</b>`], 'Chain rule: dA/dt = dA/dr × dr/dt.'), K.acc3(v)); }
    if (kind === 'sphere') { const rr = pick([2, 3, 5]), dV = pick([10, 20, 50, 100]); const drdt = dV / (4 * Math.PI * rr * rr); return Object.assign(num(`<p>Air is pumped into a spherical balloon at ${dV} cm³/s. How fast is the radius increasing when r = ${rr} cm? (3 s.f.) (V = 4/3 πr³)</p>`, 0, 'cm/s', [`dV/dr = 4πr² = ${n(r(4 * Math.PI * rr * rr, 3))}`, `dr/dt = dV/dt ÷ dV/dr = ${dV} ÷ ${n(r(4 * Math.PI * rr * rr, 3))} = <b>${n(K.sf(drdt, 3))} cm/s</b>`], 'dr/dt = dV/dt ÷ dV/dr.'), K.acc3(drdt)); }
    const x0 = pick([2, 3, 4, 5]), dx = pick([0.01, 0.02, 0.05]); const dy = 3 * x0 * x0 * dx; return num(`<p>y = x³. Use calculus to find the approximate change in y when x increases from ${x0} to ${x0 + dx}.</p>`, dy, '', [`δy ≈ dy/dx × δx = 3x² × δx = 3(${x0})² × ${dx} = <b>${n(r(dy, 4))}</b>`], 'Small increments: δy ≈ (dy/dx) δx.'); };
  G.amIntegral = () => { const kind = pick(['poly', 'poly', 'area', 'exp', 'lin']);
    if (kind === 'poly' || kind === 'area') { const a = rnd(0, 2), b = a + rnd(1, 3); const cs = [[nz(-2, 3), 2], [rnd(-4, 4), 1], [rnd(1, 6), 0]]; const F = x => cs.reduce((s, [c, p]) => s + c * x ** (p + 1) / (p + 1), 0); const v = F(b) - F(a);
      return Object.assign(num(`<p>Evaluate ∫<sub>${a}</sub><sup>${b}</sup> (${poly(cs)}) dx.${kind === 'area' ? ' (This is the area between the curve and the x-axis if the curve stays above it.)' : ''}</p>`, 0, '', [`Integrate: [${poly(cs.map(([c, p]) => [c / (p + 1), p + 1]).map(([c, p]) => [r(c, 4), p]))}]`, `F(${b}) − F(${a}) = ${n(r(F(b), 4))} − ${n(r(F(a), 4))} = <b>${n(r(v, 4))}</b>`], 'Raise the power by 1, divide by the new power, then top limit minus bottom limit.'), Math.abs(v - r(v, 2)) < 1e-9 ? { a: r(v, 2) } : K.acc3(v)); }
    if (kind === 'exp') { const k = pick([1, 2, 3]); const v = (Math.exp(k) - 1) / k; return Object.assign(num(`<p>Evaluate ∫<sub>0</sub><sup>1</sup> e<sup>${k === 1 ? '' : k}x</sup> dx to 3 s.f.</p>`, 0, '', [`∫ e^(kx) dx = (1/k) e^(kx)`, `[(1/${k}) e<sup>${k}x</sup>] from 0 to 1 = (e<sup>${k}</sup> − 1) ÷ ${k} = <b>${n(K.sf(v, 3))}</b>`], 'Divide by k when you integrate e^(kx).'), K.acc3(v)); }
    const a = pick([2, 3]), b = pick([1, 2]), nn = pick([2, 3]); const F = x => (a * x + b) ** (nn + 1) / (a * (nn + 1)); const v = F(1) - F(0);
    return Object.assign(num(`<p>Evaluate ∫<sub>0</sub><sup>1</sup> (${a}x + ${b})<sup>${nn}</sup> dx to 3 s.f.</p>`, 0, '', [`∫ (ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ ÷ (a(n + 1))`, `[(${a}x + ${b})<sup>${nn + 1}</sup> ÷ ${a * (nn + 1)}] from 0 to 1 = <b>${n(K.sf(v, 3))}</b>`], 'Reverse chain rule: also divide by a.'), Number.isInteger(r(v, 6)) ? { a: r(v, 6) } : K.acc3(v)); };
  G.amKinematics = () => { const kind = pick(['v', 'a', 'rest']); const p = rnd(1, 3), q2 = p + rnd(1, 3); const A = 1, B = -3 * (p + q2) / 2, Cc = 3 * p * q2; // s = t³ + Bt² + Ct
    const s = t => A * t ** 3 + B * t * t + Cc * t, v = t => 3 * t * t + 2 * B * t + Cc, a = t => 6 * t + 2 * B; const t0 = rnd(0, 5); const eqn = poly([[1, 3], [B, 2], [Cc, 1]]).replace(/x/g, 't');
    if (kind === 'v') return num(`<p>A particle moves in a straight line with displacement s = ${eqn} m at time t s. Find its velocity when t = ${t0}.</p>`, v(t0), 'm/s', [`v = ds/dt = 3t² ${2 * B < 0 ? '−' : '+'} ${n(Math.abs(2 * B))}t${sg(Cc)}`, `at t = ${t0}: <b>${n(v(t0))} m/s</b>`], 'velocity = ds/dt.');
    if (kind === 'a') return num(`<p>s = ${eqn}. Find the acceleration when t = ${t0}.</p>`, a(t0), 'm/s²', [`v = 3t² ${2 * B < 0 ? '−' : '+'} ${n(Math.abs(2 * B))}t${sg(Cc)}`, `a = dv/dt = 6t ${2 * B < 0 ? '−' : '+'} ${n(Math.abs(2 * B))}`, `at t = ${t0}: <b>${n(a(t0))} m/s²</b>`], 'acceleration = dv/dt = d²s/dt².');
    return nums(`<p>s = ${eqn}. At what times is the particle instantaneously at rest? Give both, separated by a comma.</p>`, [p, q2], [`At rest: v = 0`, `3t² ${2 * B < 0 ? '−' : '+'} ${n(Math.abs(2 * B))}t${sg(Cc)} = 0 → 3(t − ${p})(t − ${q2}) = 0`, `t = <b>${p} and ${q2}</b>`], 'At rest means v = 0.', 1e-6); };
  bank('amCalcIdea', [
    { q: 'dy/dx tells you…', a: 'the gradient of the curve (rate of change of y with x)', w: ['the area under the curve', 'the y-intercept', 'the maximum value'], why: 'At each point it is the gradient of the tangent.' },
    { q: 'At a stationary point…', a: 'dy/dx = 0', w: ['y = 0', 'd²y/dx² = 0 always', 'x = 0'], why: 'The tangent is horizontal.' },
    { q: 'If d²y/dx² > 0 at a stationary point, it is a…', a: 'minimum', w: ['maximum', 'point of inflexion', 'root'], why: 'The gradient is increasing: a U shape.' },
    { q: 'd/dx (sin x) =', a: 'cos x (x in radians)', w: ['−cos x', 'sin x', '−sin x'], why: 'd/dx cos x = −sin x; d/dx tan x = sec² x.' },
    { q: 'd/dx (ln x) =', a: '1/x', w: ['ln x', 'eˣ', 'x'], why: 'd/dx eˣ = eˣ.' },
    { q: '∫ (1/x) dx =', a: 'ln |x| + c', w: ['x⁰/0', '−1/x² + c', 'eˣ + c'], why: 'The power rule fails for n = −1.' },
    { q: 'Why add "+ c" to an indefinite integral?', a: 'Differentiating removes constants, so any constant could have been there', w: ['It is a convention with no reason', 'c is always 1', 'To make the area positive'], why: 'Integration reverses differentiation.' },
    { q: 'In kinematics, v = …', a: 'ds/dt', w: ['dv/dt', '∫ a ds', 's × t'], why: 'a = dv/dt; s = ∫ v dt.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'addmath', id: 'am-trig', name: 'Radians and trigonometry', icon: '🌀', color: '#7c3aed', book: ['Algebra and Trigonometry 2e', 'https://openstax.org/details/books/algebra-and-trigonometry-2e'],
    blurb: 'Syllabus 9–10: radian measure, arcs and sectors, the six trig functions, graphs, identities and equations.',
    lessons: [
      { id: 'am-radians', title: 'Radians, arcs and sectors', obj: ['9.1'], kw: 'radians arc length sector area', learn: [],
        hook: 'A more natural way to measure angles, using the circle itself.',
        scenes: [
          { say: idea('One <b>radian</b> is the angle where the arc is exactly as long as the radius. So arc length = radius × angle: <b>s = rθ</b>. Half a turn is π radians (= 180°). With radians, arc and sector formulas become beautifully simple.') },
          { say: 'Open the angle (radius 1).', anim: X([{ k: 't', label: 'θ (radians)', min: 0.2, max: 6.2, step: 0.2, v: 1 }], v => { const x = Math.cos(v.t), y = Math.sin(v.t), big = v.t > Math.PI ? 1 : 0; return `${S.svg(220, 220, `<circle cx="110" cy="110" r="80" fill="none" stroke="var(--line)" stroke-width="2"/><path d="M110 110 L190 110 A80 80 0 ${big} 0 ${r(110 + 80 * x, 1)} ${r(110 - 80 * y, 1)} Z" fill="color-mix(in srgb, var(--c4) 25%, transparent)" stroke="var(--c4)" stroke-width="2"/>`, 220)}<p class="center bigq">θ = ${n(v.t)} rad = ${n(r(v.t / D, 1))}°</p><p class="center">arc s = rθ · area = ½r²θ</p>`; }) },
          { say: 'The formulas (θ in radians, not given in the exam):', pic: eq('s = rθ') + eq('A = ½r²θ') + eq('π rad = 180°'),
            ask: T('Arc length of a sector, r = 5 cm, θ = 1.2 rad?', ['6 cm', '15 cm', '3 cm', '0.24 cm'], 0, '5 × 1.2 = 6.') },
          { say: 'Compound shapes: segments = sector − triangle (½r² sin θ); perimeters add arcs and straight edges.' }
        ],
        keys: ['1 radian: arc = radius. π rad = 180°.', 's = rθ; A = ½r²θ (learn them).', 'Segments and compound shapes.'],
        gens: ['amRadian'], easy: ['amRadian'] },
      { id: 'am-trigfn', title: 'Trig functions and graphs', obj: ['10.1', '10.2', '10.3'], kw: 'trigonometric functions sec cosec cot graphs amplitude period', learn: [],
        hook: 'Waves of every size and speed, from three dials.',
        scenes: [
          { say: idea('sin, cos and tan describe a point going round a circle, so they <b>repeat</b>. In y = a sin bx + c: <b>a</b> stretches it up and down (amplitude), <b>b</b> squeezes it sideways (period = 360° ÷ b), <b>c</b> slides it up or down.') },
          { say: 'Turn the three dials.', anim: X([{ k: 'a', label: 'a (amplitude)', min: 1, max: 4, v: 2 }, { k: 'b', label: 'b', min: 1, max: 4, v: 1 }, { k: 'c', label: 'c (shift)', min: -2, max: 2, v: 0 }], v => `${K.plot([{ f: x => v.a * Math.sin(v.b * x * D) + v.c }], [], { xmin: 0, xmax: 360, ymin: -6, ymax: 6, h: 210, gstep: 1e9, lstep: 1e9, xlab: 'x (0° to 360°)', ylab: 'y' })}<p class="center">y = ${v.a} sin ${v.b === 1 ? '' : v.b}x${v.c ? sg(v.c) : ''} · amplitude ${v.a} · period ${n(360 / v.b)}° · max ${v.a + v.c}, min ${v.c - v.a}</p>`) },
          { say: 'Three more functions, the reciprocals:', pic: eq('sec x = 1/cos x · cosec x = 1/sin x · cot x = 1/tan x'),
            ask: T('Period of y = cos 3x?', ['120°', '360°', '1080°', '3°'], 0, '360° ÷ 3.') },
          { say: 'Angles of any size: use the graphs or the CAST diagram to know which functions are positive in each quadrant. tan graphs have asymptotes where cos = 0 (label them!). Periods can be given in radians too (2π ÷ b).' }
        ],
        keys: ['Six functions: sin, cos, tan and their reciprocals sec, cosec, cot.', 'y = a sin bx + c: amplitude a, period 360°/b (2π/b), shift c.', 'tan: period 180°, asymptotes.', 'Signs in each quadrant (CAST).'],
        gens: ['amTrigGraph', 'amTrigIdea'], easy: ['amTrigIdea'] },
      { id: 'am-identities', title: 'Identities and trig equations', obj: ['10.4', '10.5', '10.6'], kw: 'trigonometric identities equations proving identities', learn: [],
        hook: 'One triangle fact, three useful identities.',
        scenes: [
          { say: idea('On a circle of radius 1, Pythagoras gives <b>sin²A + cos²A = 1</b> for every angle. Divide through by cos²A or sin²A and you get two more. These let you <b>swap</b> one function for another, turning hard equations into quadratics.') },
          { say: 'Move the angle: sin² + cos² never changes.', anim: X([{ k: 'a', label: 'Angle A (°)', min: 0, max: 360, step: 15, v: 30 }], v => { const s = Math.sin(v.a * D), c = Math.cos(v.a * D); return `${S.svg(220, 220, `<circle cx="110" cy="110" r="80" fill="none" stroke="var(--line)" stroke-width="2"/><line x1="110" y1="110" x2="${r(110 + 80 * c, 1)}" y2="${r(110 - 80 * s, 1)}" stroke="var(--c4)" stroke-width="3"/><line x1="${r(110 + 80 * c, 1)}" y1="110" x2="${r(110 + 80 * c, 1)}" y2="${r(110 - 80 * s, 1)}" stroke="var(--c2)" stroke-width="3"/><line x1="110" y1="110" x2="${r(110 + 80 * c, 1)}" y2="110" stroke="var(--c1)" stroke-width="3"/>`, 220)}<p class="center">sin A = ${n(r(s, 3))} · cos A = ${n(r(c, 3))}</p><p class="center bigq">sin² + cos² = ${n(r(s * s + c * c, 6))}</p>`; }) },
          { say: 'The three identities (given on the formula list):', pic: eq('sin²A + cos²A = 1') + eq('sec²A = 1 + tan²A') + eq('cosec²A = 1 + cot²A'),
            ask: T('2 sec²θ + tan θ − 3 = 0 becomes, using sec² = 1 + tan²…', ['2tan²θ + tan θ − 1 = 0', '2tan²θ + tan θ − 3 = 0', 'tan θ = 3'], 0, '2(1 + tan²θ) + tan θ − 3 = 2tan²θ + tan θ − 1. Factorise: (2tan θ − 1)(tan θ + 1) = 0.') },
          { say: 'Solving: get one function alone, find the calculator value, then use the graph (or CAST) to find <b>every</b> solution in the given range. Proving: start from one side and transform it into the other.' }
        ],
        keys: ['sin² + cos² = 1; sec² = 1 + tan²; cosec² = 1 + cot².', 'Swap to one function → often a quadratic.', 'Find all solutions in the range.', 'Proofs: work one side into the other.'],
        gens: ['amTrigSolve', 'amIdentity', 'amTrigIdea'], easy: ['amIdentity'] }
    ] });

  R2O.addModule({ subject: 'addmath', id: 'am-count', name: 'Counting, series and vectors', icon: '🔢', color: '#0e7490', book: ['Precalculus 2e', 'https://openstax.org/details/books/precalculus-2e'],
    blurb: 'Syllabus 11–13: permutations and combinations, the binomial theorem, APs and GPs, and vectors in 2D.',
    lessons: [
      { id: 'am-perm', title: 'Permutations and combinations', obj: ['11.1', '11.2', '11.3'], kw: 'permutations combinations factorial arrangements selections', learn: [],
        hook: 'How many different 4-digit PINs? How many lottery tickets? Counting without listing.',
        scenes: [
          { say: idea('If <b>order matters</b> (arranging, ranking, different prizes) it is a <b>permutation</b>. If order <b>doesn\'t</b> matter (choosing a team, a hand of cards) it is a <b>combination</b>. Each group of r things can be ordered in r! ways, so combinations = permutations ÷ r!.') },
          { say: 'Choose r from n.', anim: X([{ k: 'n', label: 'n', min: 3, max: 10, v: 5 }, { k: 'r', label: 'r', min: 1, max: 5, v: 3 }], v => { const rr = Math.min(v.r, v.n); return `<p class="center bigq">ⁿPᵣ = ${n(P(v.n, rr))}</p><p class="center bigq">ⁿCᵣ = ${n(C(v.n, rr))}</p><p class="center">${n(P(v.n, rr))} ÷ ${rr}! (= ${fact(rr)}) = ${n(C(v.n, rr))} · each group of ${rr} is counted ${fact(rr)} times in the permutations</p>`; }) },
          { say: 'The formulas:', pic: eq('n! = n × (n − 1) × … × 1 · 0! = 1') + eq('ⁿPᵣ = n! ÷ (n − r)! · ⁿCᵣ = n! ÷ (r!(n − r)!)'),
            ask: T('Choosing 3 students from 10 for a trip (no roles):', ['¹⁰C₃ = 120', '¹⁰P₃ = 720', '10³', '3!'], 0, 'A group, order doesn\'t matter.') },
          { say: 'Harder problems: split into stages and multiply (e.g. choose the boys, then the girls). Fixed positions: place those first. (Repeated objects and circles are not examined.)' }
        ],
        keys: ['Order matters → permutation; group → combination.', 'n!, ⁿPᵣ, ⁿCᵣ; 0! = 1.', 'Multi-stage: multiply the choices.'],
        gens: ['amPerm', 'amPermIdea'], easy: ['amPermIdea'] },
      { id: 'am-binomial', title: 'The binomial theorem', obj: ['12.1', '12.2'], kw: 'binomial expansion pascals triangle general term coefficient', learn: [],
        hook: 'Expanding (a + b)¹⁰ without multiplying out ten brackets.',
        scenes: [
          { say: idea('Multiplying out (a + b)ⁿ, each term picks a or b from every bracket. The term with bʳ appears once for every way of <b>choosing which r brackets</b> give a b: that is <b>ⁿCᵣ</b>. So the coefficients are combinations, which form <b>Pascal\'s triangle</b>.') },
          { say: 'Pick a row of Pascal\'s triangle.', anim: X([{ k: 'n', label: 'n', min: 1, max: 8, v: 4 }], v => `<p class="center bigq">${Array.from({ length: v.n + 1 }, (_, k) => C(v.n, k)).join(' &nbsp; ')}</p><p class="center">(a + b)<sup>${v.n}</sup> = ${Array.from({ length: v.n + 1 }, (_, k) => `${C(v.n, k) === 1 ? '' : C(v.n, k)}${v.n - k ? 'a' + (v.n - k > 1 ? `<sup>${v.n - k}</sup>` : '') : ''}${k ? 'b' + (k > 1 ? `<sup>${k}</sup>` : '') : ''}`).join(' + ')}</p><p class="center small muted">Each number = the two above it added.</p>`) },
          { say: 'The general term:', pic: eq('ⁿCᵣ aⁿ⁻ʳ bʳ', 'given on the formula list'),
            ask: T('Coefficient of x² in (1 + 2x)⁵?', ['40', '10', '20', '80'], 0, '⁵C₂ × 2² = 10 × 4 = 40.') },
          { say: 'Watch the signs and the powers: in (2 − 3x)⁴ the "b" is −3x, so the whole of (−3x) is raised to the power. "Term independent of x": find r so that the powers of x cancel.' }
        ],
        keys: ['(a + b)ⁿ: n + 1 terms, coefficients ⁿCᵣ.', 'General term ⁿCᵣ aⁿ⁻ʳ bʳ.', 'Raise the whole term (sign and coefficient) to the power.'],
        gens: ['amBinomial', 'amSeriesIdea'], easy: ['amSeriesIdea'] },
      { id: 'am-progressions', title: 'Arithmetic and geometric progressions', obj: ['12.3', '12.4', '12.5'], kw: 'arithmetic progression geometric progression sum to infinity', learn: [],
        hook: 'Can you add infinitely many numbers and still get a finite answer? Sometimes!',
        scenes: [
          { say: idea('An <b>AP</b> adds the same amount each time (steady growth). A <b>GP</b> multiplies by the same amount (exponential growth or decay). If a GP shrinks (−1 < r < 1), its terms get so small that the endless sum <b>settles</b> on a value: the <b>sum to infinity</b>.') },
          { say: 'Add up a GP with first term 1.', anim: X([{ k: 'r', label: 'ratio r', min: -0.9, max: 1.5, step: 0.1, v: 0.5 }, { k: 'n', label: 'terms', min: 1, max: 20, v: 6 }], v => { const S = Math.abs(v.r - 1) < 1e-9 ? v.n : (1 - Math.pow(v.r, v.n)) / (1 - v.r); return `<p class="center bigq">S<sub>${v.n}</sub> = ${n(r(S, 4))}</p><p class="center">${Math.abs(v.r) < 1 ? `converges to S∞ = 1 ÷ (1 − ${n(r(v.r, 1))}) = <b>${n(r(1 / (1 - v.r), 4))}</b>` : '|r| ⩾ 1: the sum grows forever (no sum to infinity)'}</p>`; }) },
          { say: 'Formulas (given):', pic: eq('AP: uₙ = a + (n − 1)d · Sₙ = n/2 (2a + (n − 1)d)') + eq('GP: uₙ = arⁿ⁻¹ · Sₙ = a(1 − rⁿ)/(1 − r) · S∞ = a/(1 − r), |r| < 1'),
            ask: T('Sum to infinity of 8 + 4 + 2 + 1 + …?', ['16', '15', '∞', '8'], 0, 'a = 8, r = ½: 8 ÷ ½ = 16.') }
        ],
        keys: ['AP: constant difference. GP: constant ratio.', 'nth term and sum formulas (given).', 'S∞ only when −1 < r < 1; explain why.'],
        gens: ['amAP', 'amGP', 'amSeriesIdea'], easy: ['amAP'] },
      { id: 'am-vectors', title: 'Vectors and velocities', obj: ['13.1', '13.2', '13.3', '13.4'], kw: 'vectors position vectors unit vectors magnitude velocity', learn: [],
        hook: 'How a pilot steers into the wind to fly in a straight line.',
        scenes: [
          { say: idea('A vector is a <b>step</b> with size and direction, like ai + bj (a across, b up). Steps <b>add</b> tip to tail. Velocities are vectors too: a boat\'s own velocity plus the current\'s velocity gives where it <b>actually</b> goes.') },
          { say: 'Cross a river. Change the current.', anim: X([{ k: 'c', label: 'Current (m/s, i direction)', min: 0, max: 4, step: 0.5, v: 2 }], v => { const R = Math.hypot(3, v.c); return `${S.svg(260, 180, `<rect x="10" y="20" width="240" height="140" fill="color-mix(in srgb, var(--c5) 15%, transparent)"/>${S.arrow(60, 150, 60, 50, 'var(--c1)', 3)}${S.arrow(60, 150, 60 + v.c * 33, 150, 'var(--c5)', 3)}${S.arrow(60, 150, 60 + v.c * 33, 50, 'var(--c4)', 4)}${S.txt(40, 100, '3j', 'lbl')}${S.txt(60 + v.c * 16, 170, n(v.c) + 'i', 'lbl')}`, 260)}<p class="center">actual velocity = ${n(v.c)}i + 3j · speed = √(${n(v.c)}² + 3²) = <b>${n(r(R, 2))} m/s</b></p>`; }) },
          { say: 'Tools:', pic: eq('|ai + bj| = √(a² + b²)') + eq('unit vector = a ÷ |a| · AB = b − a') + eq('position = start + t × velocity'),
            ask: T('|5i − 12j| =', ['13', '17', '7', '√7'], 0, '√(25 + 144) = 13.') },
          { say: 'If a and b are not parallel, equal vectors must have equal coefficients ("equate like vectors"). Two particles collide if their position vectors are equal at the same time t.' }
        ],
        keys: ['Notation: column vectors, AB, bold, ai + bj.', 'Magnitude, unit vectors, position vectors, AB = b − a.', 'Add, subtract, scale; equate like vectors.', 'Velocities: compose and resolve; r = r₀ + tv.'],
        gens: ['amVector', 'amVectorIdea'], easy: ['amVectorIdea'] }
    ] });

  R2O.addModule({ subject: 'addmath', id: 'am-calc', name: 'Calculus', icon: '∫', color: '#b91c1c', book: BOOK,
    blurb: 'Syllabus 14: differentiation, tangents, stationary points, rates of change, integration, areas and kinematics.',
    lessons: [
      { id: 'am-diff', title: 'Differentiation', obj: ['14.1', '14.2', '14.3', '14.4'], kw: 'differentiation derivative chain rule product rule quotient rule', learn: [],
        hook: 'The maths of change: how steep is a curve at one exact point?',
        scenes: [
          { say: idea('A curve\'s steepness changes from point to point. Zoom in close enough and any smooth curve looks like a <b>straight line</b>: the <b>tangent</b>. Its gradient is the <b>derivative</b>, dy/dx. Differentiation is a set of rules for finding it without drawing.') },
          { say: 'Slide a point along y = x². Watch the tangent\'s gradient.', anim: X([{ k: 'x', label: 'x', min: -3, max: 3, step: 0.5, v: 1 }], v => `${K.plot([{ f: x => x * x }, { f: x => 2 * v.x * (x - v.x) + v.x * v.x, color: 'var(--c4)' }], [{ x: v.x, y: v.x * v.x }], { xmin: -4, xmax: 4, ymin: -2, ymax: 10, h: 220, gstep: 1, lstep: 2 })}<p class="center bigq">gradient = ${n(2 * v.x)} = 2 × ${n(v.x)}</p><p class="center small muted">For y = x², the gradient is always 2x: that is dy/dx.</p>`) },
          { say: 'The rules:', pic: '<table class="tbl"><tr><th>y</th><th>dy/dx</th></tr><tr><td>xⁿ</td><td>nxⁿ⁻¹</td></tr><tr><td>sin x</td><td>cos x</td></tr><tr><td>cos x</td><td>−sin x</td></tr><tr><td>tan x</td><td>sec² x</td></tr><tr><td>eˣ</td><td>eˣ</td></tr><tr><td>ln x</td><td>1/x</td></tr></table><p class="center">Chain rule: dy/dx = dy/du × du/dx · Product: u′v + uv′ · Quotient: (u′v − uv′)/v²</p><p class="center small muted">Angles in radians. These are NOT given in the exam.</p>',
            ask: T('d/dx (5x³) =', ['15x²', '5x²', '15x³', '3x⁵'], 0, 'Multiply by the power, reduce the power.') },
          { say: 'Notation: f′(x), dy/dx, and the second derivative f″(x) or d²y/dx² (the derivative of the derivative).' }
        ],
        keys: ['dy/dx = gradient of the tangent.', 'xⁿ, sin, cos, tan, eˣ, ln x derivatives.', 'Chain, product and quotient rules.', 'Second derivative d²y/dx².'],
        gens: ['amDiff', 'amCalcIdea'], easy: ['amCalcIdea'] },
      { id: 'am-diffapp', title: 'Using differentiation', obj: ['14.5', '14.6', '14.7', '14.8', '14.9'], kw: 'tangents normals stationary points maximum minimum rates of change small increments', learn: [],
        hook: 'Find the biggest box you can fold from a sheet of card.',
        scenes: [
          { say: idea('At the top of a hill or the bottom of a valley the tangent is <b>flat</b>: dy/dx = 0. That is how you find <b>maximum and minimum</b> values. The derivative also links rates: if r changes with time, so does the area that depends on r.') },
          { say: 'Cut squares of side x from the corners of a 12 cm card and fold up a box.', anim: X([{ k: 'x', label: 'x (cm)', min: 0.5, max: 5.5, step: 0.5, v: 1 }], v => { const V = v.x * (12 - 2 * v.x) ** 2; return `${K.plot([{ f: x => x > 0 && x < 6 ? x * (12 - 2 * x) ** 2 : NaN }], [{ x: v.x, y: V }], { xmin: 0, xmax: 6, ymin: 0, ymax: 140, h: 200, gstep: 1e9, lstep: 1e9, xlab: 'x', ylab: 'volume' })}<p class="center bigq">V = ${n(r(V, 1))} cm³</p><p class="center small muted">dV/dx = 12x² − 96x + 144 = 0 → x = 2 gives the maximum (128 cm³).</p>`; }) },
          { say: 'Tools:', pic: '<ul><li><b>Tangent</b>: gradient dy/dx at the point; <b>normal</b>: −1 ÷ that gradient.</li><li><b>Stationary points</b>: dy/dx = 0. Test: d²y/dx² > 0 → minimum, < 0 → maximum (or check the gradient either side).</li><li><b>Connected rates</b>: dA/dt = dA/dr × dr/dt.</li><li><b>Small changes</b>: δy ≈ (dy/dx) δx.</li></ul>',
            ask: T('d²y/dx² = −4 at a stationary point. It is a…', ['maximum', 'minimum', 'neither'], 0, 'Negative second derivative: ∩ shape.') }
        ],
        keys: ['Tangent and normal equations.', 'Stationary points: dy/dx = 0; nature by first or second derivative test (justify fully).', 'Practical max/min problems.', 'Connected rates (chain rule) and small increments.'],
        gens: ['amTangent', 'amStationary', 'amRates', 'amCalcIdea'], easy: ['amTangent'] },
      { id: 'am-integrate', title: 'Integration and areas', obj: ['14.10', '14.11', '14.12', '14.13'], kw: 'integration indefinite definite area under curve', learn: [],
        hook: 'Adding up infinitely many thin strips to get an exact area.',
        scenes: [
          { say: idea('<b>Integration reverses differentiation</b>. And it measures <b>area</b>: slice the region under a curve into thin rectangles; as they get thinner, their total becomes exact, and that exact value is the definite integral.') },
          { say: 'Estimate the area under y = x² from 0 to 3 with rectangles.', anim: X([{ k: 'k', label: 'Number of rectangles', min: 2, max: 40, step: 2, v: 4 }], v => { const w = 3 / v.k; let s = 0; const segs = []; for (let i = 0; i < v.k; i++) { const x0 = i * w, h = x0 * x0; s += h * w; segs.push({ pts: [[x0, 0], [x0, h], [x0 + w, h], [x0 + w, 0]], color: 'var(--c2)' }); } return `${K.plot([{ f: x => x * x }], [], { xmin: 0, xmax: 3.2, ymin: 0, ymax: 10, h: 200, gstep: 1e9, lstep: 1e9, segs })}<p class="center bigq">≈ ${n(r(s, 3))}</p><p class="center">exact: ∫₀³ x² dx = [x³/3]₀³ = <b>9</b></p>`; }) },
          { say: 'The rules (add + c for indefinite integrals):', pic: '<table class="tbl"><tr><th>f(x)</th><th>∫ f(x) dx</th></tr><tr><td>xⁿ (n ≠ −1)</td><td>xⁿ⁺¹/(n + 1)</td></tr><tr><td>1/x</td><td>ln x</td></tr><tr><td>(ax + b)ⁿ</td><td>(ax + b)ⁿ⁺¹/(a(n + 1))</td></tr><tr><td>e^(ax+b)</td><td>e^(ax+b)/a</td></tr><tr><td>sin(ax + b)</td><td>−cos(ax + b)/a</td></tr><tr><td>cos(ax + b)</td><td>sin(ax + b)/a</td></tr><tr><td>sec²(ax + b)</td><td>tan(ax + b)/a</td></tr></table>',
            ask: T('∫₁² 3x² dx =', ['7', '3', '8', '21'], 0, '[x³]₁² = 8 − 1 = 7.') },
          { say: 'Areas: between a line and a curve, subtract (top − bottom) and integrate. If part of the region is below the x-axis, find each part separately and add their sizes.' }
        ],
        keys: ['Integration = reverse of differentiation; + c.', 'Standard integrals including (ax + b)ⁿ, eᵃˣ⁺ᵇ, sin, cos, sec².', 'Definite integrals; areas (line and curve, two curves, sums of areas).'],
        gens: ['amIntegral', 'amCalcIdea'], easy: ['amCalcIdea'] },
      { id: 'am-kinematics', title: 'Kinematics', obj: ['14.14', '14.15'], kw: 'kinematics displacement velocity acceleration calculus', learn: [],
        hook: 'Calculus was invented to describe motion. Here it is doing exactly that.',
        scenes: [
          { say: idea('Displacement s, velocity v and acceleration a are linked by calculus: <b>differentiate</b> to go s → v → a; <b>integrate</b> to go a → v → s. "At rest" means v = 0; "maximum velocity" means a = 0.') },
          { say: 'Watch a particle with s = t³ − 9t² + 24t.', anim: X([{ k: 't', label: 't (s)', min: 0, max: 5, step: 0.25, v: 1 }], v => { const s = v.t ** 3 - 9 * v.t ** 2 + 24 * v.t, vel = 3 * v.t ** 2 - 18 * v.t + 24, acc = 6 * v.t - 18; return `${K.plot([{ f: t => t ** 3 - 9 * t * t + 24 * t }, { f: t => 3 * t * t - 18 * t + 24, color: 'var(--c4)', dash: true }], [{ x: v.t, y: s }], { xmin: 0, xmax: 5, ymin: -5, ymax: 25, h: 200, gstep: 1e9, lstep: 1e9, xlab: 't', ylab: 's, v' })}<p class="center">s = ${n(r(s, 2))} m · v = ${n(r(vel, 2))} m/s · a = ${n(r(acc, 2))} m/s²</p><p class="center small muted">${Math.abs(vel) < .01 ? '⏸️ At rest!' : vel < 0 ? 'Moving backwards (v < 0).' : 'Moving forwards.'} At rest when t = 2 and t = 4.</p>`; }) },
          { say: 'The links:', pic: eq('v = ds/dt · a = dv/dt = d²s/dt²') + eq('s = ∫ v dt · v = ∫ a dt', 'use initial conditions to find c'),
            ask: T('v = 3t² − 30t + 72. Acceleration at t = 2?', ['−18 m/s²', '24 m/s²', '−24 m/s²', '6 m/s²'], 0, 'a = 6t − 30 = −18.') },
          { say: 'Distance vs displacement: if the particle turns back (v changes sign), find the distance travelled in each direction separately and add them.' }
        ],
        keys: ['v = ds/dt, a = dv/dt; integrate to go back (+ c from given conditions).', 'At rest: v = 0. Max/min velocity: a = 0.', 'Distance ≠ displacement when the particle reverses.', 'Sketch s–t, v–t, a–t graphs.'],
        gens: ['amKinematics', 'amCalcIdea'], easy: ['amKinematics'] }
    ] });
})();
