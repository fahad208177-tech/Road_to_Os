// Additional Mathematics 4037, part 1: subject set-up, functions (1), quadratics (2), polynomials (3),
// equations, inequalities and graphs (4), simultaneous equations (5), logs and exponentials (6),
// straight-line graphs (7) and the circle (8).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, nz, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Precalculus 2e', 'https://openstax.org/details/books/precalculus-2e'];
  const sg = (k, first) => k < 0 ? ` − ${n(-k)}` : first ? n(k) : ` + ${n(k)}`;
  const lin = (a, b, v = 'x') => `${a === 1 ? '' : a === -1 ? '−' : n(a)}${v}${b ? sg(b) : ''}`;
  const quad = (a, b, c) => `${a === 1 ? '' : a === -1 ? '−' : n(a)}x²${b ? (b < 0 ? ' − ' : ' + ') + (Math.abs(b) === 1 ? '' : n(Math.abs(b))) + 'x' : ''}${c ? sg(c) : ''}`;
  S.lin = lin; S.quad = quad;
  const nums = (q, arr, steps, hint, tol) => ({ kind: 'nums', q, a: arr, steps, hint, tol });

  R2O.addSubject({
    id: 'addmath', name: 'Additional Mathematics', short: 'Add Maths', icon: '📈', color: '#be185d',
    blurb: 'Functions, logs, trigonometry and calculus: the bridge to A Level.',
    syl: {
      code: '4037', name: 'Cambridge O Level Additional Mathematics', years: '2025, 2026 and 2027',
      url: 'https://www.cambridgeinternational.org/Images/662720-2025-2027-syllabus.pdf',
      areas: ['Functions', 'Quadratic functions', 'Factors of polynomials', 'Equations, inequalities and graphs', 'Simultaneous equations', 'Logarithmic and exponential functions', 'Straight-line graphs', 'Coordinate geometry of the circle', 'Circular measure', 'Trigonometry', 'Permutations and combinations', 'Series', 'Vectors in two dimensions', 'Calculus'],
      papers: ['Paper 1 (non-calculator): 2 hours, 80 marks, 50%.', 'Paper 2 (calculator): 2 hours, 80 marks, 50%.', 'A List of formulas is on page 2 of both papers. Knowledge of O Level Mathematics is assumed.'],
      suggest: ['Are double angle formulae on my exam?', 'Is integration by parts examinable?', 'Is the quadratic formula given?', 'Explain the discriminant', 'Quiz me on logarithms', 'Do I need points of inflexion?', 'What should I revise first?'],
      formulaNote: '<p><span class="verdict yes">📄 Some are given</span></p><p>The List of formulas (page 2) gives: the <b>quadratic formula</b>, the <b>binomial theorem</b>, the <b>AP and GP</b> nth-term and sum formulas, the <b>trig identities</b> (sin²A + cos²A = 1 etc.), the <b>circle equation</b>, the <b>sine and cosine rules</b>, the area ½ab sin C, and cone/sphere/pyramid formulas.</p><p><span class="verdict maybe">🧠 Not given</span> <b>Arc length and sector area</b> (s = rθ, A = ½r²θ) and <b>all calculus</b> (derivatives and integrals) must be learned.</p>',
      offSyllabus: [
        { k: /matri(x|ces)/, why: 'Matrices are not in 4037 (2025–2027).' },
        { k: /inflexion|inflection/, why: 'Points of inflexion are not included (14.6, 14.9).', obj: '14.6' },
        { k: /first principles/, why: 'Differentiation from first principles is not required (14.1). Only an informal idea of a limit.', obj: '14.1' },
        { k: /by parts/, why: 'Integration by parts is not in 4037.' },
        { k: /partial fraction/, why: 'Partial fractions are not in 4037.' },
        { k: /double angle|compound angle|sin ?\(a ?\+ ?b\)|sin ?2a|addition formula/, why: 'Compound and double angle formulae are not in 4037. You need sin² + cos² = 1, sec² = 1 + tan², cosec² = 1 + cot² (10.4).', obj: '10.4' },
        { k: /r ?sin|r ?cos|harmonic form|r-formula|r formula/, why: 'The R-formula (harmonic form) is not in 4037.' },
        { k: /volumes? of revolution|revolution/, why: 'Volumes of revolution are not in 4037. Integration is used for plane areas (14.13).', obj: '14.13' },
        { k: /maclaurin|taylor|series expansion of e/, why: 'Series expansions of eˣ and ln x are not required (6.1).', obj: '6.1' },
        { k: /complex number|imaginary/, why: 'Complex numbers are not in 4037.' },
        { k: /3d vector|three[- ]dimension/, why: '4037 covers vectors in two dimensions only (13).', obj: '13.1' },
        { k: /circular (arrangement|permutation)|arranged in a circle|repetition/, why: 'Arrangements in a circle and problems with repeated objects are not included (11.3).', obj: '11.3' },
        { k: /induction/, why: 'Proof by induction is not in 4037.' }
      ]
    },
    links: (kw) => [
      ['Khan Academy: videos and exercises', `https://www.khanacademy.org/search?page_search_query=${kw}`],
      ['Desmos: graph anything yourself', 'https://www.desmos.com/calculator'],
      ['Physics & Maths Tutor: Add Maths notes and past papers', 'https://www.physicsandmathstutor.com/maths-revision/']
    ]
  });

  // ================= generators =================
  G.amComposite = () => { const a = nz(-3, 4), b = rnd(-5, 5), c = rnd(-4, 6), k = rnd(-3, 3), kind = pick(['fg', 'gf', 'finv']);
    const f = x => a * x + b, g = x => x * x + c;
    const def = `<p>f(x) = ${lin(a, b)} and g(x) = x²${c ? sg(c) : ''}.</p>`;
    if (kind === 'fg') return num(`${def}<p>Find fg(${n(k)}).</p>`, f(g(k)), '', [`Do g first: g(${n(k)}) = ${n(k)}² ${sg(c) || '+ 0'} = ${n(g(k))}`, `then f: f(${n(g(k))}) = ${n(a)} × ${n(g(k))}${sg(b)} = <b>${n(f(g(k)))}</b>`], 'fg(x) means f(g(x)): do g first, then f.');
    if (kind === 'gf') return num(`${def}<p>Find gf(${n(k)}).</p>`, g(f(k)), '', [`Do f first: f(${n(k)}) = ${n(f(k))}`, `then g: ${n(f(k))}² ${sg(c) || '+ 0'} = <b>${n(g(f(k)))}</b>`], 'gf(x) = g(f(x)): f first.');
    const y = f(k); return num(`${def}<p>Find f⁻¹(${n(y)}).</p>`, k, '', [`f⁻¹ undoes f: solve ${lin(a, b)} = ${n(y)}`, `x = (${n(y)}${sg(-b)}) ÷ ${n(a)} = <b>${n(k)}</b>`], 'Run f backwards: undo + b, then undo × a.'); };
  bank('amFunctions', [
    { q: 'A function is one–one if…', a: 'each output comes from exactly one input', w: ['each input gives two outputs', 'it is a straight line', 'its range is all real numbers'], why: 'Only one–one functions have inverses.' },
    { q: 'Why does f(x) = x² (x ∈ ℝ) not have an inverse?', a: 'It is many–one: e.g. f(2) = f(−2) = 4', w: ['It is one–one', 'It has no range', 'It is not a function'], why: 'Restrict the domain (e.g. x ⩾ 0) to make it one–one.' },
    { q: 'The graph of f⁻¹ is the reflection of the graph of f in…', a: 'the line y = x', w: ['the x-axis', 'the y-axis', 'the origin'], why: 'Inputs and outputs swap.' },
    { q: 'The domain of f⁻¹ is…', a: 'the range of f', w: ['the domain of f', 'all real numbers', 'always x > 0'], why: 'And the range of f⁻¹ is the domain of f.' },
    { q: 'fg(x) means…', a: 'f(g(x)): apply g first, then f', w: ['f(x) × g(x)', 'apply f first, then g', 'f(x) + g(x)'], why: 'Order matters: fg is usually different from gf.' },
    { q: 'The graph of y = |f(x)| is made from y = f(x) by…', a: 'reflecting the parts below the x-axis up above it', w: ['reflecting the whole graph in y = x', 'shifting it up', 'deleting the negative parts'], why: 'Modulus makes every output non-negative.' },
    { q: 'f²(x) means…', a: 'f(f(x))', w: ['(f(x))²', 'f(x²)', '2f(x)'], why: 'Apply f twice. (Not used with trig functions.)' }
  ]);
  G.amDisc = () => { const kind = pick(['count', 'k']);
    if (kind === 'count') { const a = nz(-3, 3), b = rnd(-8, 8), c = rnd(-8, 8), D = b * b - 4 * a * c; const ans = D > 0 ? 'two distinct real roots' : D === 0 ? 'two equal roots' : 'no real roots';
      return { kind: 'mcq', q: `<p>How many real roots does ${quad(a, b, c)} = 0 have?</p>`, choices: ['two distinct real roots', 'two equal roots', 'no real roots'], a: ans, hint: 'Work out the discriminant b² − 4ac.', steps: [`b² − 4ac = ${n(b)}² − 4(${n(a)})(${n(c)}) = ${D}`, `${D > 0 ? '> 0' : D === 0 ? '= 0' : '< 0'} → <b>${ans}</b>`] }; }
    const b = pick([4, 6, 8, 10, 12]), a = pick([1, 2]); const k = b * b / (4 * a);
    return num(`<p>Find the value of k for which ${quad(a, b, 0)} + k = 0 has two equal roots.</p>`, k, '', [`Equal roots: b² − 4ac = 0`, `${b}² − 4(${a})(k) = 0`, `k = ${b * b} ÷ ${4 * a} = <b>${n(k)}</b>`], 'Equal roots ⇔ discriminant = 0.'); };
  G.amMinVal = () => { const h = rnd(-5, 5), m = rnd(-9, 9), a = pick([1, 1, 2, -1]); const b = -2 * a * h, c = a * h * h + m;
    if (Math.random() < .5) return num(`<p>Find the ${a > 0 ? 'minimum' : 'maximum'} value of f(x) = ${quad(a, b, c)}.</p>`, m, '', [`Complete the square: f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}(x${sg(-h)})²${sg(m)}`, `A squared term is never negative, so the ${a > 0 ? 'minimum' : 'maximum'} is when the bracket is 0: <b>${m}</b> (at x = ${h})`], 'Complete the square, or set f′(x) = 0.');
    return num(`<p>f(x) = ${quad(a, b, c)}. At what value of x is the ${a > 0 ? 'minimum' : 'maximum'}?</p>`, h, '', [`f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}(x${sg(-h)})²${sg(m)}`, `turning point at x = <b>${h}</b>`], 'The turning point is where the squared bracket is zero (or f′(x) = 0).'); };
  G.amQuadIneq = () => { let p = rnd(-6, 5), q2 = rnd(p + 1, 7); const less = Math.random() < .5; const b = -(p + q2), c = p * q2;
    const right = less ? `${p} < x < ${q2}` : `x < ${p} or x > ${q2}`, wrongs = [less ? `x < ${p} or x > ${q2}` : `${p} < x < ${q2}`, `${-q2} < x < ${-p}`, `x < ${-q2} or x > ${-p}`, `x > ${q2}`];
    return { kind: 'mcq', q: `<p>Solve ${quad(1, b, c)} ${less ? '<' : '>'} 0.</p>`, choices: K.mcq(right, wrongs), a: right, hint: 'Find the roots, sketch the U-shaped curve, then pick the part below (< 0) or above (> 0) the x-axis.', steps: [`(x${sg(-p)})(x${sg(-q2)}) ${less ? '<' : '>'} 0 → roots ${p} and ${q2}`, `U-shaped curve is ${less ? 'below the axis BETWEEN the roots' : 'above the axis OUTSIDE the roots'}: <b>${right}</b>`] }; };
  bank('amQuadIdea', [
    { q: 'The discriminant of ax² + bx + c is…', a: 'b² − 4ac', w: ['b² + 4ac', '−b ÷ 2a', '4ac − b'], why: '> 0 two roots, = 0 equal roots, < 0 no real roots.' },
    { q: 'A line meets a curve. Substituting gives a quadratic with discriminant 0. The line is…', a: 'a tangent to the curve', w: ['missing the curve', 'cutting it at two points', 'parallel to the y-axis'], why: 'Equal roots = touching at one point.' },
    { q: 'A quadratic with a > 0 has…', a: 'a minimum point (U shape)', w: ['a maximum point', 'no turning point', 'two turning points'], why: 'a < 0 gives an ∩ shape with a maximum.' },
    { q: 'The range of f(x) = (x − 3)² + 5 for x ∈ ℝ is…', a: 'f(x) ⩾ 5', w: ['f(x) ⩽ 5', 'x ⩾ 3', 'all real numbers'], why: 'The squared term is at least 0.' }
  ]);
  G.amRemainder = () => { const a = rnd(-3, 3), c3 = pick([1, 2]), c2 = rnd(-5, 5), c1 = rnd(-8, 8), c0 = rnd(-9, 9); const p = x => c3 * x ** 3 + c2 * x * x + c1 * x + c0; const kind = pick(['rem', 'k']);
    const poly = `${c3 === 1 ? '' : c3}x³${c2 ? (c2 < 0 ? ' − ' : ' + ') + (Math.abs(c2) === 1 ? '' : Math.abs(c2)) + 'x²' : ''}${c1 ? (c1 < 0 ? ' − ' : ' + ') + (Math.abs(c1) === 1 ? '' : Math.abs(c1)) + 'x' : ''}`;
    if (kind === 'rem') return num(`<p>Find the remainder when p(x) = ${poly}${c0 ? sg(c0) : ''} is divided by (x${sg(-a)}).</p>`, p(a), '', [`Remainder theorem: remainder = p(${a})`, `= ${c3}(${a})³ + ${c2}(${a})² + ${c1}(${a}) + ${c0} = <b>${p(a)}</b>`], 'Dividing by (x − a) leaves remainder p(a).');
    const k = -(p(a) - c0); return num(`<p>(x${sg(-a)}) is a factor of ${poly} + k. Find k.</p>`, k, '', [`Factor theorem: p(${a}) = 0`, `${p(a) - c0} + k = 0`, `k = <b>${k}</b>`], '(x − a) is a factor ⇔ p(a) = 0.'); };
  G.amCubicRoots = () => { const rs = K.shuffle([rnd(-4, -1), rnd(0, 2), rnd(3, 5)]); const [p, q2, s] = rs; const b = -(p + q2 + s), c = p * q2 + p * s + q2 * s, d = -p * q2 * s;
    return nums(`<p>Solve x³${b ? (b < 0 ? ' − ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x²' : ''}${c ? (c < 0 ? ' − ' : ' + ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x' : ''}${d ? sg(d) : ''} = 0. Give all three roots, separated by commas.</p>`, [p, q2, s], [`Try small integers: p(${rs[0]}) = 0, so (x${sg(-rs[0])}) is a factor`, `Divide to get a quadratic and factorise it`, `x = <b>${rs.slice().sort((a, b) => a - b).join(', ')}</b>`], 'Find one root by trying factors of the constant, then divide.'); };
  G.amModEq = () => { const a = pick([1, 2, 3]), b = rnd(-6, 6), c = rnd(1, 9); const x1 = (c - b) / a, x2 = (-c - b) / a;
    return nums(`<p>Solve |${lin(a, b)}| = ${c}. Give both answers, separated by a comma (as fractions or to 2 d.p.).</p>`, [x1, x2], [`${lin(a, b)} = ${c} → x = ${n(r(x1, 3))}`, `${lin(a, b)} = −${c} → x = ${n(r(x2, 3))}`], 'The inside can be +c or −c.', .006); };
  G.amModIneq = () => { const a = 1, b = rnd(-5, 5), c = rnd(1, 6); const lo = -c - b, hi = c - b, less = Math.random() < .5;
    const right = less ? `${lo} < x < ${hi}` : `x < ${lo} or x > ${hi}`, wrongs = [less ? `x < ${lo} or x > ${hi}` : `${lo} < x < ${hi}`, `${-hi} < x < ${-lo}`, `x > ${hi}`, `${lo} < x < ${hi + 2 * b || hi + 1}`];
    return { kind: 'mcq', q: `<p>Solve |${lin(a, b)}| ${less ? '<' : '>'} ${c}.</p>`, choices: K.mcq(right, wrongs), a: right, hint: '|A| < c means −c < A < c. |A| > c means A < −c or A > c.', steps: [less ? `−${c} < ${lin(a, b)} < ${c}` : `${lin(a, b)} < −${c} or ${lin(a, b)} > ${c}`, `<b>${right}</b>`] }; };
  G.amSimul = () => { const pt = pick([[3, 4], [4, 3], [-3, 4], [0, 5], [5, 0], [-4, 3]]); const r2 = 25; const m = pick([1, -1, 2, -2, 0.5]);
    const c = pt[1] - m * pt[0]; // line through pt; find the other intersection with x² + y² = 25
    const A = 1 + m * m, B = 2 * m * c, C = c * c - r2; const xs = [(-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A), (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A)];
    return Object.assign(nums(`<p>Find the x-coordinates where the line y = ${m === 1 ? '' : m === -1 ? '−' : n(m)}x${c ? sg(r(c, 4)) : ''} meets the circle x² + y² = 25. Give both, to 2 decimal places if needed.</p>`, xs, [`Substitute: x² + (${m === 1 ? '' : n(m)}x${c ? sg(r(c, 4)) : ''})² = 25`, `${n(r(A, 4))}x² ${B < 0 ? '−' : '+'} ${n(Math.abs(r(B, 4)))}x ${C < 0 ? '−' : '+'} ${n(Math.abs(r(C, 4)))} = 0`, `x = <b>${xs.map(x => n(r(x, 2))).join(' and ')}</b>`], 'Substitute the line into the curve and solve the quadratic.', .006), {}); };
  G.amLogs = () => { const kind = pick(['eval', 'eval', 'solve', 'ln', 'law']);
    if (kind === 'eval') { const b = pick([2, 3, 5, 10]), k = rnd(-2, 4); const x = b ** k; return num(`<p>Evaluate log<sub>${b}</sub> ${x < 1 ? `(${n(r(x, 6))})` : n(x)}.</p>`, k, '', [`${b} to what power gives ${n(r(x, 6))}?`, `${b}<sup>${k}</sup> = ${n(r(x, 6))}, so the answer is <b>${k}</b>`], 'log_b x asks: b to what power gives x?'); }
    if (kind === 'solve') { const a = pick([2, 3, 5, 1.5]), bb = pick([7, 10, 20, 50, 100]); const x = Math.log(bb) / Math.log(a); return Object.assign(num(`<p>Solve ${n(a)}<sup>x</sup> = ${bb}, giving x to 3 significant figures.</p>`, 0, '', [`Take logs: x lg ${n(a)} = lg ${bb}`, `x = lg ${bb} ÷ lg ${n(a)} = <b>${n(K.sf(x, 3))}</b>`], 'Take logs of both sides and bring the power down.'), K.acc3(x)); }
    if (kind === 'ln') { const k = pick([2, 5, 7, 10, 20]), a = pick([1, 2, 3]); const x = Math.log(k) / a; return Object.assign(num(`<p>Solve e<sup>${a === 1 ? '' : a}x</sup> = ${k}, giving x to 3 significant figures.</p>`, 0, '', [`Take ln: ${a === 1 ? '' : a}x = ln ${k}`, `x = ${a === 1 ? '' : `ln ${k} ÷ ${a} = `}<b>${n(K.sf(x, 3))}</b>`], 'ln and e cancel: ln(eᵃ) = a.'), K.acc3(x)); }
    const p = pick([2, 3, 4, 5]), q2 = pick([6, 8, 12, 16]); return num(`<p>Simplify log<sub>${p}</sub> ${p * q2} − log<sub>${p}</sub> ${q2}.</p>`, 1, '', [`log a − log b = log (a ÷ b)`, `log<sub>${p}</sub> (${p * q2} ÷ ${q2}) = log<sub>${p}</sub> ${p} = <b>1</b>`], 'Subtracting logs = dividing inside.'); };
  bank('amLogIdea', [
    { q: 'log a + log b =', a: 'log (ab)', w: ['log (a + b)', 'log a × log b', 'log (a ÷ b)'], why: 'Adding logs multiplies the numbers.' },
    { q: 'n log a =', a: 'log (aⁿ)', w: ['(log a)ⁿ', 'log (na)', 'log a + n'], why: 'Powers come down in front.' },
    { q: 'log_b b =', a: '1', w: ['0', 'b', 'it does not exist'], why: 'b¹ = b. And log_b 1 = 0.' },
    { q: 'Change of base: log_a x =', a: 'log_b x ÷ log_b a', w: ['log_b a ÷ log_b x', 'log_b x × log_b a', 'log_b (x − a)'], why: 'Useful on calculators: log₅ 7 = lg 7 ÷ lg 5.' },
    { q: 'y = eˣ and y = ln x are…', a: 'inverses: reflections of each other in y = x', w: ['the same graph', 'both straight lines', 'parallel'], why: 'ln(eˣ) = x.' },
    { q: 'The graph of y = eˣ has an asymptote at…', a: 'y = 0', w: ['x = 0', 'y = 1', 'x = 1'], why: 'It gets close to the x-axis but never touches. y = ln x has the asymptote x = 0.' },
    { q: 'lg x means…', a: 'log₁₀ x', w: ['logₑ x', 'log₂ x', 'x ÷ 10'], why: 'ln x = logₑ x.' }
  ]);
  G.amLines = () => { const kind = pick(['perp', 'mid', 'len', 'bisect']); const x1 = rnd(-6, 4), y1 = rnd(-6, 4), x2 = x1 + nz(-6, 6) * 1, y2 = y1 + nz(-6, 6);
    if (kind === 'perp') { const m = pick([2, -3, 0.5, -0.25, 4, 1.5]); return num(`<p>A line has gradient ${n(m)}. What is the gradient of a line perpendicular to it?</p>`, -1 / m, '', [`Perpendicular gradients multiply to −1: m₂ = −1 ÷ ${n(m)} = <b>${n(r(-1 / m, 4))}</b>`], 'Flip and change sign.'); }
    if (kind === 'mid') return nums(`<p>Find the midpoint of A(${x1}, ${y1}) and B(${x2}, ${y2}). Give it as x, y.</p>`, [(x1 + x2) / 2, (y1 + y2) / 2], [`((${x1} + ${x2}) ÷ 2, (${y1} + ${y2}) ÷ 2) = <b>(${n((x1 + x2) / 2)}, ${n((y1 + y2) / 2)})</b>`], 'Average the x\'s and average the y\'s.', 1e-6);
    if (kind === 'len') { const L = Math.hypot(x2 - x1, y2 - y1); return Object.assign(num(`<p>Find the length of AB, where A(${x1}, ${y1}) and B(${x2}, ${y2}). Give your answer to 3 s.f. if needed.</p>`, 0, '', [`√((${x2} − ${x1})² + (${y2} − ${y1})²) = √${(x2 - x1) ** 2 + (y2 - y1) ** 2} = <b>${n(K.sf(L, 3))}</b>`], 'Pythagoras on the difference in x and in y.'), Number.isInteger(L) ? { a: L } : K.acc3(L)); }
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, m = (y2 - y1) / (x2 - x1), mp = -1 / m; return num(`<p>The perpendicular bisector of A(${x1}, ${y1}) and B(${x2}, ${y2}) has equation y = mx + c. Find m.</p>`, mp, '', [`gradient AB = ${n(y2 - y1)} ÷ ${n(x2 - x1)} = ${n(r(m, 4))}`, `perpendicular: m = −1 ÷ ${n(r(m, 4))} = <b>${n(r(mp, 4))}</b>`, `it passes through the midpoint (${n(mx)}, ${n(my)})`], 'Perpendicular bisector: through the midpoint, gradient −1/m.'); };
  G.amLinearise = () => { const A = pick([2, 3, 5]), nn = pick([2, 3, -1, 0.5]); const kind = pick(['n', 'A']);
    if (kind === 'n') return num(`<p>y = Axⁿ. A graph of lg y against lg x is a straight line with gradient ${n(nn)} and intercept lg ${A}. What is n?</p>`, nn, '', [`Take lg: lg y = n lg x + lg A`, `Compare with Y = mX + c: gradient = n = <b>${n(nn)}</b>`], 'Taking logs turns a power law into a straight line.');
    const b = pick([2, 3, 1.5]); return num(`<p>y = A × bˣ. A graph of lg y against x is a straight line with intercept ${n(r(Math.log10(A), 4))} on the lg y-axis. Find A (to 3 s.f.).</p>`, A, '', [`lg y = x lg b + lg A`, `intercept = lg A = ${n(r(Math.log10(A), 4))}`, `A = 10^${n(r(Math.log10(A), 4))} = <b>${A}</b>`], 'The intercept is lg A, so A = 10^(intercept).'); };
  G.amCircle = () => { const a = rnd(-5, 5), b = rnd(-5, 5), R = pick([2, 3, 4, 5, 6, 7]); const g = -a, f = -b, c = a * a + b * b - R * R; const kind = pick(['r', 'c']);
    const eqn = `x² + y²${2 * g ? (2 * g < 0 ? ' − ' : ' + ') + Math.abs(2 * g) + 'x' : ''}${2 * f ? (2 * f < 0 ? ' − ' : ' + ') + Math.abs(2 * f) + 'y' : ''}${c ? sg(c) : ''} = 0`;
    if (kind === 'r') return num(`<p>Find the radius of the circle ${eqn}.</p>`, R, '', [`Complete the square: (x${sg(-a)})² + (y${sg(-b)})² = ${a * a + b * b} ${c < 0 ? '+ ' + (-c) : '− ' + c}`, `r² = ${R * R}, so r = <b>${R}</b>`], 'Complete the square in x and in y; the right-hand side is r².');
    return nums(`<p>Find the centre of the circle ${eqn}. Give it as x, y.</p>`, [a, b], [`(x${sg(-a)})² + (y${sg(-b)})² = ${R * R}`, `centre = <b>(${a}, ${b})</b>`], 'For x² + y² + 2gx + 2fy + c = 0 the centre is (−g, −f).', 1e-6); };
  bank('amCircleIdea', [
    { q: 'A circle with centre (a, b) and radius r has equation…', a: '(x − a)² + (y − b)² = r²', w: ['(x + a)² + (y + b)² = r', 'x² + y² = a + b', '(x − a) + (y − b) = r'], why: 'Pythagoras from the centre to any point.' },
    { q: 'Substituting a line into a circle\'s equation gives a quadratic with a negative discriminant. The line…', a: 'does not meet the circle', w: ['is a tangent', 'is a chord', 'passes through the centre'], why: 'Zero → tangent; positive → cuts at two points.' },
    { q: 'A tangent to a circle is perpendicular to…', a: 'the radius at the point of contact', w: ['the x-axis', 'every chord', 'the line y = x'], why: 'Use this to find the equation of a tangent (no calculus needed).' },
    { q: 'Two circles touch when the distance between their centres equals…', a: 'the sum (or difference) of their radii', w: ['zero', 'the product of their radii', 'their diameters multiplied'], why: 'Bigger distance → no intersection; smaller (but more than the difference) → they intersect.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'addmath', id: 'am-alg', name: 'Functions and equations', icon: '🧩', color: '#be185d', book: BOOK,
    blurb: 'Syllabus 1–5: functions, inverses and composites, quadratics and the discriminant, polynomials, modulus, and simultaneous equations.',
    lessons: [
      { id: 'am-functions', title: 'Functions, inverses and composites', obj: ['1.1', '1.2', '1.3', '1.5', '1.6', '1.7', '1.8'], kw: 'functions domain range inverse composite', learn: [],
        hook: 'A function is a machine. Add Maths is about building, combining and reversing machines.',
        scenes: [
          { say: idea('A <b>function</b> turns each input into exactly <b>one</b> output. The <b>domain</b> is what you may put in; the <b>range</b> is what can come out. Chain two machines and you get a <b>composite</b>; run one backwards and you get its <b>inverse</b>.') },
          { say: 'f(x) = 2x + 1 and g(x) = x². Does the order matter?', anim: X([{ k: 'x', label: 'Input x', min: -4, max: 4, v: 3 }], v => { const f = x => 2 * x + 1, g = x => x * x; return `<p class="center bigq">fg(${v.x}) = f(${g(v.x)}) = ${f(g(v.x))}</p><p class="center bigq">gf(${v.x}) = g(${f(v.x)}) = ${g(f(v.x))}</p><p class="center small muted">fg means "do g first". Usually fg ≠ gf.</p>`; }) },
          { say: 'An inverse undoes the machine. Its graph is the mirror image in <b>y = x</b>.', anim: X([{ k: 'a', label: 'Gradient of f', min: 0.5, max: 3, step: 0.5, v: 2 }], v => `${K.plot([{ f: x => v.a * x + 1 }, { f: x => (x - 1) / v.a, dash: true }, { f: x => x, color: 'var(--muted)', dash: true }], [], { xmin: -5, xmax: 5, ymin: -5, ymax: 5, h: 220, gstep: 1, lstep: 2 })}<p class="center">f(x) = ${n(v.a)}x + 1 · f⁻¹(x) = (x − 1) ÷ ${n(v.a)}</p>`) },
          { say: 'Only <b>one–one</b> functions have inverses. x² on all real numbers is many–one (2 and −2 both give 4), so restrict its domain first.', ask: T('The domain of f⁻¹ equals…', ['the range of f', 'the domain of f', 'all real numbers'], 0, 'Inputs and outputs swap roles.') }
        ],
        keys: ['Function: one output per input. One–one vs many–one.', 'fg(x) = f(g(x)); order matters.', 'Inverse: swap x and y, make y the subject; domain of f⁻¹ = range of f.', 'Graphs of f and f⁻¹ are reflections in y = x.'],
        gens: ['amComposite', 'amFunctions'], easy: ['amFunctions'] },
      { id: 'am-quadratics', title: 'Quadratics and the discriminant', obj: ['2.1', '2.2', '2.3', '2.4', '2.5'], kw: 'quadratic discriminant completing the square maximum minimum inequalities', learn: [],
        hook: 'One number, b² − 4ac, tells you everything about where a parabola meets a line.',
        scenes: [
          { say: idea('Completing the square shows a quadratic\'s <b>turning point</b> directly. The <b>discriminant</b> b² − 4ac tells you how many times it crosses the x-axis: positive → twice, zero → touches once, negative → never. The same test tells whether a <b>line</b> cuts, touches or misses a curve.') },
          { say: 'Slide the line y = x + c towards the curve y = x².', anim: X([{ k: 'c', label: 'c', min: -2, max: 3, step: 0.25, v: 1 }], v => { const D = 1 + 4 * v.c; return `${K.plot([{ f: x => x * x }, { f: x => x + v.c, color: 'var(--c4)' }], [], { xmin: -3, xmax: 3, ymin: -3, ymax: 6, h: 220, gstep: 1, lstep: 2 })}<p class="center">x² = x + ${n(v.c)} → x² − x − ${n(v.c)} = 0 · discriminant = ${n(r(D, 2))}</p><p class="center bigq">${D > 0 ? 'cuts at 2 points' : D === 0 ? 'TANGENT (touches once)' : 'misses'}</p>`; }) },
          { say: 'Completing the square:', pic: eq('x² − 6x + 11 = (x − 3)² + 2', 'minimum value 2, at x = 3 (range f(x) ⩾ 2)'),
            ask: T('For x² + 4x + k = 0 to have equal roots, k =', ['4', '16', '−4', '2'], 0, '16 − 4k = 0 → k = 4.') },
          { say: 'Quadratic inequalities: find the roots, sketch, then read the region. For a U shape, "< 0" is <b>between</b> the roots; "> 0" is <b>outside</b> them.' }
        ],
        keys: ['Complete the square → turning point and range.', 'Discriminant: > 0 two roots, = 0 equal roots, < 0 none (also line vs curve).', 'Solve by factorising, formula (given) or completing the square.', 'Inequalities: sketch and read the region.'],
        gens: ['amDisc', 'amMinVal', 'amQuadIneq', 'amQuadIdea'], easy: ['amQuadIdea'] },
      { id: 'am-polynomials', title: 'Polynomials and cubic graphs', obj: ['3.1', '3.2', '3.3', '4.4', '4.5'], kw: 'remainder theorem factor theorem cubic equations cubic graphs', learn: [],
        hook: 'A shortcut that finds a remainder without doing any division.',
        scenes: [
          { say: idea('If you divide p(x) by (x − a), the remainder is simply <b>p(a)</b>. So if p(a) = 0, then (x − a) is a <b>factor</b>. That turns solving cubics into a search: try small numbers until one gives zero.') },
          { say: 'Try values of a for p(x) = x³ − 2x² − 5x + 6.', anim: X([{ k: 'a', label: 'a', min: -3, max: 4, v: 0 }], v => { const p = x => x ** 3 - 2 * x * x - 5 * x + 6, val = p(v.a); return `${K.plot([{ f: p }], [{ x: v.a, y: val }], { xmin: -3.5, xmax: 4.5, ymin: -12, ymax: 12, h: 220, gstep: 1, lstep: 2 })}<p class="center bigq">p(${v.a}) = ${val} ${val === 0 ? '→ (x' + sg(-v.a) + ') is a factor!' : ''}</p>`; }) },
          { say: 'Once you have one factor, divide (or compare coefficients) to get a quadratic, then factorise that.', pic: eq('x³ − 2x² − 5x + 6 = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2)'),
            ask: T('Remainder when x³ + 2x − 1 is divided by (x − 2)?', ['11', '7', '−1', '13'], 0, 'p(2) = 8 + 4 − 1 = 11.') },
          { say: 'A cubic given as three linear factors crosses the x-axis at each root; check the y-intercept. |f(x)| flips the negative parts up. Read cubic inequalities straight from the sketch.' }
        ],
        keys: ['Remainder theorem: remainder = p(a).', 'Factor theorem: p(a) = 0 ⇔ (x − a) is a factor.', 'Cubic → linear × quadratic → solve.', 'Sketch cubics from factors; |f(x)| reflects negative parts.'],
        gens: ['amRemainder', 'amCubicRoots'], easy: ['amRemainder'] },
      { id: 'am-modulus', title: 'Modulus equations and inequalities', obj: ['1.4', '4.1', '4.2'], kw: 'modulus absolute value equations inequalities graphs', learn: [],
        hook: 'The modulus forgets the sign. That gives two answers instead of one.',
        scenes: [
          { say: idea('|x| is the <b>distance from zero</b>, always positive. So |something| = 5 means the something is <b>5 or −5</b>: two cases. On a graph, y = |f(x)| is y = f(x) with every part below the x-axis <b>flipped up</b>.') },
          { say: 'Flip the negative parts.', anim: X([{ k: 'b', label: 'b in y = |2x − b|', min: -3, max: 3, v: 1 }], v => `${K.plot([{ f: x => 2 * x - v.b, dash: true }, { f: x => Math.abs(2 * x - v.b), color: 'var(--c4)' }], [], { xmin: -4, xmax: 4, ymin: -4, ymax: 6, h: 210, gstep: 1, lstep: 2 })}<p class="center">dashed: y = 2x ${sg(-v.b)} · solid: y = |2x ${sg(-v.b)}|</p>`) },
          { say: 'Two cases:', pic: eq('|2x − 3| = 7', '2x − 3 = 7 → x = 5 · 2x − 3 = −7 → x = −2'),
            ask: T('|x − 1| < 3 means…', ['−2 < x < 4', 'x < −2 or x > 4', 'x < 4', '−4 < x < 2'], 0, '−3 < x − 1 < 3.') },
          { say: 'Harder types (|ax + b| = cx + d) can give "fake" solutions: always check each answer in the original equation, or use a graph.' }
        ],
        keys: ['|A| = c → A = c or A = −c.', '|A| < c → −c < A < c; |A| > c → A < −c or A > c.', 'y = |f(x)|: reflect parts below the x-axis.', 'Check answers when the right side contains x.'],
        gens: ['amModEq', 'amModIneq', 'amFunctions'], easy: ['amModEq'] },
      { id: 'am-simul', title: 'Simultaneous equations and substitution', obj: ['5.1', '4.3'], kw: 'simultaneous equations line and curve substitution hidden quadratics', learn: [],
        hook: 'Where a line crosses a curve, and equations in disguise.',
        scenes: [
          { say: idea('With a line and a curve, <b>substitute</b> the line into the curve. You get a <b>quadratic</b>: its roots are the x-coordinates where they meet. Many scary equations are quadratics in disguise: spot the <b>hidden variable</b> (like eˣ or √x) and substitute.') },
          { say: 'Rotate a line through (0, 5) and watch it meet the circle x² + y² = 25.', anim: X([{ k: 'm', label: 'Gradient', min: -3, max: 3, step: 0.25, v: 1 }], v => { const A = 1 + v.m * v.m, B = 10 * v.m; const x2 = -B / A; return `${K.plot([{ f: x => Math.sqrt(Math.max(0, 25 - x * x)) * (Math.abs(x) <= 5 ? 1 : NaN) }, { f: x => -Math.sqrt(Math.max(0, 25 - x * x)) * (Math.abs(x) <= 5 ? 1 : NaN) }, { f: x => v.m * x + 5, color: 'var(--c4)' }], [{ x: 0, y: 5 }, { x: x2, y: v.m * x2 + 5 }], { xmin: -6, xmax: 6, ymin: -6, ymax: 6, h: 230, gstep: 1, lstep: 2 })}<p class="center">meets at x = 0 and x = <b>${n(r(x2, 2))}</b></p>`; }) },
          { say: 'A hidden quadratic:', pic: eq('3eˣ = 12 − 5e⁻ˣ', 'let u = eˣ: 3u = 12 − 5/u → 3u² − 12u + 5 = 0 → solve for u, then x = ln u'),
            ask: T('To solve 2(ln x)² + ln x − 6 = 0, substitute…', ['u = ln x', 'u = x²', 'u = eˣ'], 0, 'Then 2u² + u − 6 = 0.') }
        ],
        keys: ['Substitute the linear equation into the other.', 'Quadratic roots = intersection x-values.', 'Spot hidden quadratics: let u = eˣ, ln x, √x, …'],
        gens: ['amSimul'], easy: ['amSimul'] }
    ] });

  R2O.addModule({ subject: 'addmath', id: 'am-graphs', name: 'Logs, lines and circles', icon: '📐', color: '#9d174d', book: BOOK,
    blurb: 'Syllabus 6–8: logarithms and exponentials, straight lines, linearising data, and the circle.',
    lessons: [
      { id: 'am-logs', title: 'Logarithms and exponentials', obj: ['6.1', '6.2', '6.3'], kw: 'logarithms exponential ln e laws of logs', learn: [],
        hook: 'A logarithm is just a question: "to what power?"',
        scenes: [
          { say: idea('log<sub>b</sub> x asks: <b>"b to what power gives x?"</b> So log₂ 8 = 3 because 2³ = 8. Logs turn <b>multiplying into adding</b> and <b>powers into multiplying</b>, which is why they can bring an unknown down from an exponent.') },
          { say: 'Exponential and log are mirror images in y = x.', anim: X([{ k: 'b', label: 'Base b', min: 1.5, max: 5, step: 0.5, v: 2 }], v => `${K.plot([{ f: x => Math.pow(v.b, x) }, { f: x => x > 0 ? Math.log(x) / Math.log(v.b) : NaN, color: 'var(--c4)' }, { f: x => x, color: 'var(--muted)', dash: true }], [], { xmin: -3, xmax: 6, ymin: -3, ymax: 6, h: 230, gstep: 1, lstep: 2 })}<p class="center">y = ${n(v.b)}ˣ (asymptote y = 0) · y = log<sub>${n(v.b)}</sub> x (asymptote x = 0)</p>`) },
          { say: 'The laws:', pic: eq('log a + log b = log ab · log a − log b = log (a/b) · n log a = log aⁿ') + eq('log_a x = log_b x ÷ log_b a', 'change of base; ln = logₑ, lg = log₁₀'),
            ask: T('Solve 2ˣ = 10 (exactly).', ['x = lg 10 ÷ lg 2', 'x = 5', 'x = 10 ÷ 2', 'x = lg 2 ÷ lg 10'], 0, 'x lg 2 = lg 10.') },
          { say: 'e ≈ 2.718 is the natural base: y = eˣ and y = ln x are inverses. Graphs like y = k eⁿˣ + a have the asymptote y = a.' }
        ],
        keys: ['log_b x = y ⇔ bʸ = x.', 'Laws of logs and change of base.', 'Solve aˣ = b by taking logs.', 'eˣ and ln x are inverses; know their asymptotes.'],
        gens: ['amLogs', 'amLogIdea'], easy: ['amLogIdea'] },
      { id: 'am-lines', title: 'Straight lines', obj: ['7.1', '7.2', '7.3'], kw: 'straight line gradient perpendicular parallel midpoint perpendicular bisector', learn: [],
        hook: 'The O Level line skills, pushed one step further.',
        scenes: [
          { say: idea('A line is fixed by a <b>gradient</b> and one <b>point</b>. Parallel lines share a gradient; perpendicular gradients <b>multiply to −1</b> (turn the staircase 90°: rise and run swap and one changes sign).') },
          { say: 'Turn a line and its perpendicular.', anim: X([{ k: 'm', label: 'Gradient m', min: -3, max: 3, step: 0.5, v: 2 }], v => v.m === 0 ? '<p class="center bigq">m = 0: horizontal. Its perpendicular is vertical (x = constant).</p>' : `${K.plot([{ f: x => v.m * x }, { f: x => -x / v.m, color: 'var(--c4)' }], [], { xmin: -5, xmax: 5, ymin: -5, ymax: 5, h: 220, gstep: 1, lstep: 2 })}<p class="center">${n(v.m)} × ${n(r(-1 / v.m, 3))} = −1</p>`) },
          { say: 'Perpendicular bisector of AB: goes through the <b>midpoint</b>, with the <b>perpendicular</b> gradient.', ask: T('A(1, 2), B(5, 10). Gradient of the perpendicular bisector?', ['−½', '2', '½', '−2'], 0, 'AB has gradient 8 ÷ 4 = 2.') }
        ],
        keys: ['y − y₁ = m(x − x₁).', 'Parallel: equal m. Perpendicular: m₁m₂ = −1.', 'Midpoint, length (Pythagoras), perpendicular bisector.'],
        gens: ['amLines'], easy: ['amLines'] },
      { id: 'am-linearise', title: 'Turning curves into straight lines', obj: ['7.4'], kw: 'linear law lg y against lg x transform straight line form', learn: [],
        hook: 'How scientists find the rule hidden in curved data.',
        scenes: [
          { say: idea('Straight lines are easy: just read the gradient and intercept. So if data follows a curve like y = Axⁿ, <b>take logs</b>: lg y = n lg x + lg A. Plot lg y against lg x and you get a <b>straight line</b> with gradient n and intercept lg A.') },
          { say: 'Data from y = A xⁿ. Change n: the curve bends, but the log-plot stays straight.', anim: X([{ k: 'nn', label: 'n', min: 0.5, max: 3, step: 0.5, v: 2 }], v => `<div class="row2">${K.plot([{ f: x => x > 0 ? 2 * Math.pow(x, v.nn) : NaN }], [], { xmin: 0, xmax: 4, ymin: 0, ymax: 20, h: 170, w: 170, gstep: 1e9, lstep: 1e9, xlab: 'x', ylab: 'y' })}${K.plot([{ f: X => v.nn * X + Math.log10(2) }], [], { xmin: -0.5, xmax: 0.7, ymin: -1, ymax: 2.5, h: 170, w: 170, gstep: 1e9, lstep: 1e9, xlab: 'lg x', ylab: 'lg y' })}</div><p class="center">lg y = ${n(v.nn)} lg x + lg 2 · gradient = n, intercept = lg A</p>`) },
          { say: 'Choose the right axes:', pic: '<ul><li>y = Axⁿ → plot lg y against lg x (gradient n, intercept lg A)</li><li>y = Abˣ → plot lg y against x (gradient lg b, intercept lg A)</li><li>Going the other way, e.g. a line of y² against x³ gives y² = Ax³ + B</li></ul>',
            ask: T('For y = 3 × 2ˣ, plotting lg y against x gives gradient…', ['lg 2', 'lg 3', '2', '3'], 0, 'lg y = x lg 2 + lg 3.') }
        ],
        keys: ['Take logs to linearise y = Axⁿ and y = Abˣ.', 'Read the gradient and intercept to find the constants.', 'Convert from straight-line form back to an equation.'],
        gens: ['amLinearise'], easy: ['amLinearise'] },
      { id: 'am-circle', title: 'The equation of a circle', obj: ['8.1', '8.2', '8.3', '8.4'], kw: 'circle equation centre radius tangent intersection', learn: [],
        hook: 'Pythagoras, spun all the way round.',
        scenes: [
          { say: idea('Every point on a circle is the <b>same distance r</b> from the centre (a, b). Pythagoras on the gap gives the equation <b>(x − a)² + (y − b)² = r²</b>. Expanded, it looks messier, but completing the square gets the centre and radius back.') },
          { say: 'Move the centre and change the radius.', anim: X([{ k: 'a', label: 'a', min: -3, max: 3, v: 1 }, { k: 'b', label: 'b', min: -3, max: 3, v: -1 }, { k: 'r', label: 'r', min: 1, max: 4, v: 3 }], v => `${K.plot([{ f: x => Math.abs(x - v.a) <= v.r ? v.b + Math.sqrt(v.r ** 2 - (x - v.a) ** 2) : NaN }, { f: x => Math.abs(x - v.a) <= v.r ? v.b - Math.sqrt(v.r ** 2 - (x - v.a) ** 2) : NaN }], [{ x: v.a, y: v.b, label: `(${v.a}, ${v.b})` }], { xmin: -7, xmax: 7, ymin: -7, ymax: 7, h: 230, gstep: 1, lstep: 2 })}<p class="center bigq">${v.a ? `(x${sg(-v.a)})²` : 'x²'} + ${v.b ? `(y${sg(-v.b)})²` : 'y²'} = ${v.r * v.r}</p>`) },
          { say: 'In the form x² + y² + 2gx + 2fy + c = 0, the centre is (−g, −f) and r² = g² + f² − c. Lines vs circles: substitute and use the discriminant (two points, tangent, or miss). Two circles: compare the distance between centres with the radii.',
            ask: T('Centre of x² + y² − 6x + 4y − 3 = 0?', ['(3, −2)', '(−3, 2)', '(6, −4)', '(−6, 4)'], 0, '(x − 3)² + (y + 2)² = 16.') },
          { say: 'A tangent is perpendicular to the radius at the point of contact: find the radius gradient, flip and change its sign, then use y − y₁ = m(x − x₁). (No calculus needed.)' }
        ],
        keys: ['(x − a)² + (y − b)² = r²; centre (−g, −f) from the expanded form.', 'Line ∩ circle: substitute, discriminant → chord / tangent / miss.', 'Tangent ⟂ radius.', 'Two circles: compare centre distance with r₁ + r₂ and |r₁ − r₂|.'],
        gens: ['amCircle', 'amCircleIdea'], easy: ['amCircleIdea'] }
    ] });
})();
