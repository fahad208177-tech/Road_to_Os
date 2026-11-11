// Module 1: Number (syllabus 1.1 to 1.18)
(() => {
  const K = R2O.K, G = R2O.GEN, W = R2O.WIDGETS, { rnd, nz, pick, mcq, n, fr, frs, sup } = K;
  const idxProd = f => Object.entries(f).filter(([, e]) => e).map(([p, e]) => e > 1 ? sup(p, e) : p).join(' × ');
  const rec = s => `<span class="rec">${s}</span>`; // digit with a recurring dot

  // ----- 1.1 Types of number -----
  G.primeFactors = () => {
    let f, v; do { f = { 2: rnd(0, 4), 3: rnd(0, 3), 5: rnd(0, 2), 7: rnd(0, 1) }; v = Object.entries(f).reduce((s, [p, e]) => s * Math.pow(+p, e), 1); } while (v < 24 || v > 600 || Object.values(f).filter(Boolean).length < 2);
    const right = idxProd(f);
    const wr = [];
    const keys = Object.keys(f).filter(k => f[k]);
    keys.forEach(k => { const g = Object.assign({}, f); g[k] = f[k] + 1; wr.push(idxProd(g)); if (f[k] > 1) { const h = Object.assign({}, f); h[k] = f[k] - 1; wr.push(idxProd(h)); } });
    wr.push(keys.map(k => k * f[k] > 0 ? `${k} × ${f[k]}` : '').filter(Boolean).join(' × '));
    return { kind: 'mcq', q: `<p>Write <b class="bigq">${v}</b> as a product of its prime factors.</p>`, a: right, choices: mcq(right, K.shuffle(wr)), hint: 'Keep dividing by the smallest prime that works: 2, then 3, then 5…', steps: [`Divide repeatedly: ${v} = ${Object.entries(f).flatMap(([p, e]) => Array(e).fill(p)).join(' × ')}`, `With indices: <b>${right}</b>`] };
  };
  G.hcfLcm = () => {
    let x, y; do { x = rnd(2, 9); y = rnd(2, 9); } while (x === y || K.gcd(x, y) !== 1);
    const g = rnd(2, 12), a = g * x, b = g * y, askH = Math.random() < .5;
    return askH ? { kind: 'num', q: `<p>Find the <b>highest common factor</b> (HCF) of ${a} and ${b}.</p>`, a: g, hint: 'List the factors of each number, or use prime factors and take the primes they share.', steps: [`${a} = ${g} × ${x} and ${b} = ${g} × ${y}`, `${x} and ${y} share no factors, so HCF = <b>${g}</b>`] }
      : { kind: 'num', q: `<p>Find the <b>lowest common multiple</b> (LCM) of ${a} and ${b}.</p>`, a: g * x * y, hint: 'List multiples of the bigger number until one is also a multiple of the smaller one.', steps: [`${a} = ${g} × ${x}, ${b} = ${g} × ${y}`, `LCM = ${g} × ${x} × ${y} = <b>${g * x * y}</b>`] };
  };
  G.classify = () => pick([
    () => { const p = pick([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53]); return { kind: 'mcq', q: '<p>Which of these is a <b>prime</b> number?</p>', a: String(p), choices: mcq(String(p), K.shuffle(['1', '9', '15', '21', '27', '33', '39', '49', '51', '57'])), hint: 'A prime has exactly two factors: 1 and itself. 1 is not prime.', steps: [`${p} can only be divided by 1 and ${p}.`] }; },
    () => { const r = pick(['√2', '√3', 'π', '√5', '√7']); return { kind: 'mcq', q: '<p>Which of these is <b>irrational</b>?</p>', a: r, choices: mcq(r, K.shuffle(['√9', '0.25', fr(3, 7), '√16', '−4', '0.333…'])), hint: 'Rational numbers can be written as a fraction of two integers. Square roots of non-square numbers cannot.', steps: [`${r} cannot be written as a fraction, and its decimal never repeats.`] }; },
    () => { const c = pick([8, 27, 64, 125, 1000]); return { kind: 'mcq', q: '<p>Which of these is a <b>cube</b> number?</p>', a: String(c), choices: mcq(String(c), K.shuffle(['9', '16', '36', '49', '100', '81', '12'])), steps: [`${c} = ${Math.round(Math.cbrt(c))} × ${Math.round(Math.cbrt(c))} × ${Math.round(Math.cbrt(c))}`] }; }
  ])();
  G.reciprocal = () => {
    if (Math.random() < .5) { const a = rnd(1, 8), b = rnd(a + 1, 12); return { kind: 'frac', q: `<p>Write down the reciprocal of ${fr(a, b)}.</p>`, a: b / a, show: frs(b, a), hint: 'The reciprocal flips a fraction upside down. A number × its reciprocal = 1.', steps: [`Flip it: ${fr(b, a)}${K.gcd(a, b) > 1 ? ` = ${frs(b, a)}` : ''}`] }; }
    const k = pick([2, 4, 5, 8, 10]); return { kind: 'frac', q: `<p>Write down the reciprocal of <b>${k}</b>.</p>`, a: 1 / k, show: fr(1, k), steps: [`${k} = ${fr(k, 1)}, flipped: <b>${fr(1, k)}</b>`] };
  };

  // ----- 1.2 Sets -----
  G.vennCount = () => {
    const a = rnd(2, 15), c = rnd(1, 9), b = rnd(2, 15), o = rnd(0, 9);
    const A = pick(['Football', 'Music', 'Maths club', 'Chess']), B = pick(['Swimming', 'Art', 'Debate', 'Robotics'].filter(x => x !== A));
    const ask = pick([
      ['n(A ∪ B)', a + b + c, 'Union: in A or B or both'], ['n(A ∩ B)', c, 'Intersection: in both'], ['n(A)', a + c, 'Everything inside circle A'],
      ["n(A′)", b + o, "Complement: everything NOT in A"], ["n(A ∩ B′)", a, 'In A but not in B'], ['n(ℰ)', a + b + c + o, 'Everything in the rectangle']]);
    return { kind: 'num', q: `<p>A = students in ${A}, B = students in ${B}.</p>${K.venn({ A: 'A', B: 'B', a, ab: c, b, out: o })}<p>Find <b>${ask[0]}</b>.</p>`, a: ask[1], hint: ask[2] + '.', steps: [`${ask[2]}.`, `Add the regions: <b>${ask[1]}</b>`] };
  };
  G.setSymbol = () => {
    const s = pick([['∪', 'union (in A or B or both)'], ['∩', 'intersection (in both)'], ['∈', 'is an element of'], ['∉', 'is not an element of'], ['∅', 'the empty set'], ["A′", 'the complement of A'], ['⊆', 'is a subset of']]);
    const all = ['union (in A or B or both)', 'intersection (in both)', 'is an element of', 'is not an element of', 'the empty set', 'the complement of A', 'is a subset of'];
    return { kind: 'mcq', q: `<p>What does the symbol <b class="bigq">${s[0]}</b> mean?</p>`, a: s[1], choices: mcq(s[1], K.shuffle(all.filter(x => x !== s[1]))), steps: [`${s[0]} means ${s[1]}.`] };
  };

  // ----- 1.3 Powers and roots -----
  G.sqCube = () => pick([
    () => { const k = rnd(2, 15); return { kind: 'num', q: `<p>Write down the value of <b class="bigq">${k}²</b></p>`, a: k * k, steps: [`${k} × ${k} = <b>${k * k}</b>`] }; },
    () => { const k = rnd(2, 15); return { kind: 'num', q: `<p>Write down the value of <b class="bigq">${K.sqrt(k * k)}</b></p>`, a: k, hint: 'Which number times itself gives this?', steps: [`${k} × ${k} = ${k * k}, so the square root is <b>${k}</b>`] }; },
    () => { const k = pick([1, 2, 3, 4, 5, 10]); return { kind: 'num', q: `<p>Write down the value of <b class="bigq">${k}³</b></p>`, a: k ** 3, steps: [`${k} × ${k} × ${k} = <b>${k ** 3}</b>`] }; },
    () => { const k = pick([2, 3, 4, 5, 10]); return { kind: 'num', q: `<p>Write down the value of <b class="bigq">∛${k ** 3}</b></p>`, a: k, steps: [`${k} × ${k} × ${k} = ${k ** 3}, so the cube root is <b>${k}</b>`] }; },
    () => { const k = rnd(2, 9), m = pick([4, 9, 16, 25]); return { kind: 'num', q: `<p>Work out <b class="bigq">${K.sqrt(m)} × ${k}²</b></p>`, a: Math.sqrt(m) * k * k, steps: [`${K.sqrt(m)} = ${Math.sqrt(m)} and ${k}² = ${k * k}`, `${Math.sqrt(m)} × ${k * k} = <b>${Math.sqrt(m) * k * k}</b>`] }; }
  ])();

  // ----- 1.4 FDP -----
  G.fdpConvert = () => pick([
    () => { const d = pick([2, 4, 5, 10, 20, 25, 50]), k = rnd(1, d - 1); return { kind: 'num', q: `<p>Write ${fr(k, d)} as a <b>percentage</b>.</p>`, a: k / d * 100, unit: '%', hint: 'Make the denominator 100, or multiply the fraction by 100.', steps: [`${fr(k, d)} × 100 = <b>${n(k / d * 100)}%</b>`] }; },
    () => { const p = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 64, 75, 80, 85, 12, 8]); return { kind: 'frac', simplest: true, q: `<p>Write <b>${p}%</b> as a fraction in its simplest form.</p>`, a: p / 100, show: frs(p, 100), ph: 'e.g. 3/4', hint: 'Percent means "out of 100". Write it over 100, then simplify.', steps: [`${p}% = ${fr(p, 100)}`, `Divide by ${K.gcd(p, 100)}: <b>${frs(p, 100)}</b>`] }; },
    () => { const v = pick([0.4, 0.25, 0.75, 0.6, 0.35, 0.125, 0.05, 0.84, 0.375]); const den = 1000, num = Math.round(v * 1000); return { kind: 'frac', simplest: true, q: `<p>Write <b>${v}</b> as a fraction in its simplest form.</p>`, a: v, show: frs(num, den), ph: 'e.g. 3/4', steps: [`${v} = ${fr(num, den)}`, `Simplify: <b>${frs(num, den)}</b>`] }; },
    () => { const d = pick([4, 5, 8, 20, 25]), k = rnd(1, d - 1); return { kind: 'num', q: `<p>Write ${fr(k, d)} as a <b>decimal</b>.</p>`, a: k / d, hint: 'Divide the top by the bottom.', steps: [`${k} ÷ ${d} = <b>${n(k / d)}</b>`] }; }
  ])();
  G.recurring = () => pick([
    () => { const a = rnd(1, 8); return { kind: 'frac', simplest: true, q: `<p>Write <b class="bigq">0.${rec(a)}</b> as a fraction in its simplest form.</p><p class="muted small">The dot means the digit repeats forever: 0.${a}${a}${a}${a}…</p>`, a: a / 9, show: frs(a, 9), ph: 'e.g. 5/9', hint: 'Let x = 0.aaa…, then 10x = a.aaa…; subtract.', steps: [`x = 0.${a}${a}${a}…`, `10x = ${a}.${a}${a}${a}…`, `10x − x = 9x = ${a}`, `x = <b>${frs(a, 9)}</b>`] }; },
    () => { let a, b; do { a = rnd(0, 9); b = rnd(1, 9); } while (a === b); const v = 10 * a + b; return { kind: 'frac', simplest: true, q: `<p>Write <b class="bigq">0.${rec(a)}${rec(b)}</b> as a fraction in its simplest form.</p><p class="muted small">0.${a}${b}${a}${b}${a}${b}…</p>`, a: v / 99, show: frs(v, 99), ph: 'e.g. 4/33', hint: 'Two digits repeat, so multiply by 100.', steps: [`x = 0.${a}${b}${a}${b}…`, `100x = ${v}.${a}${b}${a}${b}…`, `99x = ${v}`, `x = ${fr(v, 99)} = <b>${frs(v, 99)}</b>`] }; },
    () => { let a, b; do { a = rnd(1, 9); b = rnd(1, 9); } while (a === b); const num = 10 * a + b - a; return { kind: 'frac', simplest: true, q: `<p>Write <b class="bigq">0.${a}${rec(b)}</b> as a fraction in its simplest form.</p><p class="muted small">0.${a}${b}${b}${b}…</p>`, a: num / 90, show: frs(num, 90), ph: 'e.g. 7/45', hint: 'Use 100x and 10x so the repeating parts line up.', steps: [`x = 0.${a}${b}${b}${b}…`, `100x = ${10 * a + b}.${b}${b}…, 10x = ${a}.${b}${b}…`, `90x = ${10 * a + b} − ${a} = ${num}`, `x = ${fr(num, 90)} = <b>${frs(num, 90)}</b>`] }; }
  ])();

  // ----- 1.5 Ordering -----
  G.order = () => {
    const vals = new Set(); const items = [];
    while (items.length < 4) {
      const d = pick([4, 5, 8, 20, 25, 40]), k = rnd(Math.ceil(d * .3), Math.floor(d * .95)); const v = k / d;
      if (vals.has(v)) continue; vals.add(v);
      const form = pick(['f', 'd', 'p']);
      items.push({ v, t: form === 'f' ? `${k}/${d}` : form === 'd' ? n(v) : n(K.round(v * 100, 2)) + '%' });
    }
    const big = Math.random() < .5; const sorted = items.slice().sort((a, b) => a.v - b.v); const ans = big ? sorted[3] : sorted[0];
    return { kind: 'mcq', q: `<p>Which is the <b>${big ? 'largest' : 'smallest'}</b>?</p>`, a: ans.t, choices: K.shuffle(items.map(i => i.t)), hint: 'Change them all to decimals (or percentages) first.', steps: [items.map(i => `${i.t} = ${n(K.round(i.v, 4))}`).join(', '), `${big ? 'Largest' : 'Smallest'}: <b>${ans.t}</b>`] };
  };

  // ----- 1.6 Four operations -----
  G.bidmas = () => pick([
    () => { const a = rnd(2, 20), b = rnd(2, 9), c = rnd(2, 9); return { kind: 'num', q: `<p>Work out <b class="bigq">${a} + ${b} × ${c}</b></p>`, a: a + b * c, hint: 'Multiply before you add.', steps: [`× first: ${b} × ${c} = ${b * c}`, `${a} + ${b * c} = <b>${a + b * c}</b>`] }; },
    () => { const a = rnd(2, 12), b = rnd(2, 9), c = rnd(2, 9); return { kind: 'num', q: `<p>Work out <b class="bigq">(${a} + ${b}) × ${c}</b></p>`, a: (a + b) * c, hint: 'Brackets first.', steps: [`Brackets: ${a} + ${b} = ${a + b}`, `${a + b} × ${c} = <b>${(a + b) * c}</b>`] }; },
    () => { const c = rnd(2, 9), q = rnd(2, 9), a = rnd(q + 1, 40); return { kind: 'num', q: `<p>Work out <b class="bigq">${a} − ${c * q} ÷ ${c}</b></p>`, a: a - q, hint: 'Divide before you subtract.', steps: [`÷ first: ${c * q} ÷ ${c} = ${q}`, `${a} − ${q} = <b>${a - q}</b>`] }; },
    () => { const a = rnd(2, 9), b = rnd(2, 6), c = rnd(2, 6); return { kind: 'num', q: `<p>Work out <b class="bigq">${a}² − ${b} × ${c}</b></p>`, a: a * a - b * c, hint: 'Indices, then ×, then −.', steps: [`${a}² = ${a * a}`, `${b} × ${c} = ${b * c}`, `${a * a} − ${b * c} = <b>${a * a - b * c}</b>`] }; },
    () => { const a = nz(-6, 6), b = rnd(2, 9), c = rnd(1, 9), d = rnd(1, 20); return { kind: 'num', q: `<p>Work out <b class="bigq">${n(a)} × (${b} − ${c}) + ${d}</b></p>`, a: a * (b - c) + d, hint: 'Brackets, then ×, then +.', steps: [`${b} − ${c} = ${b - c}`, `${n(a)} × ${n(b - c)} = ${n(a * (b - c))}`, `${n(a * (b - c))} + ${d} = <b>${n(a * (b - c) + d)}</b>`] }; }
  ])();
  G.fracOps = () => {
    const op = pick(['+', '−', '×', '÷']);
    const b = rnd(2, 9), d = rnd(2, 9), a = rnd(1, b - 1 || 1), c = rnd(1, d - 1 || 1);
    let p, q, steps;
    if (op === '+' || op === '−') {
      const L = K.lcm(b, d); p = op === '+' ? a * L / b + c * L / d : a * L / b - c * L / d; q = L;
      steps = [`Common denominator ${L}: ${fr(a * L / b, L)} ${op} ${fr(c * L / d, L)}`, `= ${fr(p, q)}`,`Simplest form: <b>${frs(p, q)}</b>`];
    } else if (op === '×') { p = a * c; q = b * d; steps = [`Multiply tops and bottoms: ${fr(a * c, b * d)}`, `Simplest form: <b>${frs(p, q)}</b>`]; }
    else { p = a * d; q = b * c; steps = [`Flip the second fraction and multiply: ${fr(a, b)} × ${fr(d, c)}`, `= ${fr(p, q)} = <b>${frs(p, q)}</b>`]; }
    return { kind: 'frac', simplest: true, q: `<p>Work out <span class="bigq">${fr(a, b)} ${op} ${fr(c, d)}</span></p><p class="muted small">Give your answer as a fraction in its simplest form.</p>`, a: p / q, show: frs(p, q), ph: 'e.g. 7/12',
      hint: op === '+' || op === '−' ? 'Use a common denominator first.' : op === '×' ? 'Multiply the tops, multiply the bottoms.' : 'Keep the first, flip the second, multiply.', steps };
  };

  // ----- 1.7 Indices I -----
  G.indexEval = () => pick([
    () => { const a = rnd(2, 12); return { kind: 'num', q: `<p>Find the value of <b class="bigq">${sup(a, 0)}</b></p>`, a: 1, steps: ['Anything (except 0) to the power 0 is <b>1</b>.'] }; },
    () => { const a = rnd(2, 10), p = pick([1, 2]); return { kind: 'frac', q: `<p>Find the value of <b class="bigq">${sup(a, -p)}</b></p>`, a: 1 / a ** p, show: fr(1, a ** p), ph: 'e.g. 1/49', hint: 'A negative power means "one over".', steps: [`${sup(a, -p)} = ${fr(1, sup(a, p))} = <b>${fr(1, a ** p)}</b>`] }; },
    () => { const k = rnd(2, 12); return { kind: 'num', q: `<p>Find the value of <b class="bigq">${k * k}<sup>½</sup></b></p>`, a: k, hint: 'Power ½ means square root.', steps: [`${k * k}<sup>½</sup> = ${K.sqrt(k * k)} = <b>${k}</b>`] }; },
    () => { const k = pick([2, 3, 4, 5]), c = k ** 3; return { kind: 'num', q: `<p>Find the value of <b class="bigq">${c}<sup>2/3</sup></b></p>`, a: k * k, hint: 'Cube root first, then square.', steps: [`∛${c} = ${k}`, `${k}² = <b>${k * k}</b>`] }; },
    () => { const k = pick([2, 3, 4]), c = k ** 3; return { kind: 'frac', q: `<p>Find the value of <b class="bigq">${c}<sup>−2/3</sup></b></p>`, a: 1 / (k * k), show: fr(1, k * k), ph: 'e.g. 1/4', hint: 'Negative → one over. Then cube root, then square.', steps: [`${c}<sup>−2/3</sup> = ${fr(1, c + '<sup>2/3</sup>')}`, `∛${c} = ${k}, ${k}² = ${k * k}`, `Answer: <b>${fr(1, k * k)}</b>`] }; }
  ])();
  G.indexLaws = () => {
    const b = pick([2, 3, 5, 7]), m = nz(-4, 7), k = nz(-4, 6), t = pick(['×', '÷', '()']);
    const r = t === '×' ? m + k : t === '÷' ? m - k : m * Math.abs(k);
    const kk = t === '()' ? Math.abs(k) : k;
    const expr = t === '()' ? `(${sup(b, m)})<sup>${kk}</sup>` : `${sup(b, m)} ${t} ${sup(b, k)}`;
    return { kind: 'num', q: `<p>Write as a single power of ${b}: <b class="bigq">${expr}</b></p><p class="muted small">Type just the power.</p>`, a: r, ph: 'the power', hint: t === '×' ? 'Multiplying: add the powers.' : t === '÷' ? 'Dividing: subtract the powers.' : 'Power of a power: multiply the powers.',
      steps: [t === '×' ? `${n(m)} + ${n(k)} = ${n(r)}` : t === '÷' ? `${n(m)} − (${n(k)}) = ${n(r)}` : `${n(m)} × ${kk} = ${n(r)}`, `Answer: <b>${sup(b, r)}</b>`] };
  };

  // ----- 1.8 Standard form -----
  const SF = (a, e) => `${n(a)} × ${sup(10, e)}`;
  G.toSF = () => {
    const big = Math.random() < .5, a = rnd(11, 99) / 10, e = big ? rnd(3, 8) : -rnd(2, 6);
    const val = a * Math.pow(10, e);
    const plain = big ? n(Math.round(val)) : val.toFixed(-e + 1).replace(/0+$/, '');
    const right = SF(a, e);
    return { kind: 'mcq', q: `<p>Write <b class="bigq">${plain}</b> in standard form.</p>`, a: right, choices: mcq(right, [SF(a, e + 1), SF(a, e - 1), SF(K.round(a * 10, 1), e - 1), SF(a, -e)]), hint: 'Put the decimal point after the first non-zero digit. Count how many places it moved.',
      steps: [`First non-zero digits: ${n(a)}`, `The point moves ${Math.abs(e)} places ${big ? 'left (big number, positive power)' : 'right (small number, negative power)'}`, `<b>${right}</b>`] };
  };
  G.sfCalc = () => {
    const a = rnd(11, 50) / 10, b = rnd(11, 50) / 10, m = rnd(-4, 6), k = rnd(-4, 6), mul = Math.random() < .6;
    let v = mul ? a * b : a / b, e = mul ? m + k : m - k;
    let A = v; while (A >= 10) { A /= 10; e++; } while (A < 1) { A *= 10; e--; }
    A = K.round(A, 2);
    if (A >= 10) { A = K.round(A / 10, 2); e++; }
    const right = SF(A, e);
    return { kind: 'mcq', q: `<p>Work out, giving your answer in standard form${mul ? '' : ' (to 3 s.f. where needed)'}:</p><p class="bigq">(${SF(a, m)}) ${mul ? '×' : '÷'} (${SF(b, k)})</p>`, a: right,
      choices: mcq(right, [SF(A, e + 1), SF(A, e - 1), SF(K.round(A * 10, 1), e - 1), SF(K.round(mul ? a * b : a / b, 2), mul ? m + k : m - k)]),
      hint: mul ? 'Multiply the numbers, add the powers, then fix so the number is between 1 and 10.' : 'Divide the numbers, subtract the powers, then fix the number to be between 1 and 10.',
      steps: [`${n(a)} ${mul ? '×' : '÷'} ${n(b)} = ${n(K.round(mul ? a * b : a / b, 4))}`, `Powers: ${n(m)} ${mul ? '+' : '−'} ${n(k)} = ${n(mul ? m + k : m - k)}`, `Adjust: <b>${right}</b>`] };
  };

  // ----- 1.9 Estimation -----
  G.roundDP = () => { const x = rnd(1000, 99999) / 1000 * pick([1, 10]), dp = rnd(1, 2); const ans = K.round(x, dp); return { kind: 'num', q: `<p>Round <b class="bigq">${n(x)}</b> to <b>${dp} decimal place${dp > 1 ? 's' : ''}</b>.</p>`, a: ans, show: ans.toFixed(dp), hint: 'Look at the next digit: 5 or more rounds up.', steps: [`Keep ${dp} digit${dp > 1 ? 's' : ''} after the point and look at the next one.`, `<b>${ans.toFixed(dp)}</b>`] }; };
  G.roundSF = () => {
    const x = pick([rnd(10000, 999999), rnd(1000, 99999) / 100, rnd(1, 9999) / 100000]); const s = rnd(1, 3); const ans = K.sf(x, s);
    return { kind: 'num', q: `<p>Write <b class="bigq">${n(x)}</b> correct to <b>${s} significant figure${s > 1 ? 's' : ''}</b>.</p>`, a: ans, hint: 'Start counting at the first non-zero digit. Fill the gaps before the decimal point with zeros.', steps: [`The first ${s} significant figure${s > 1 ? 's' : ''}, then round using the next digit.`, `<b>${n(ans)}</b>`] };
  };
  G.estimate = () => {
    const a = rnd(15, 95) / pick([1, 10]), b = rnd(15, 95) / pick([1, 10]), c = pick([2, 4, 5, 8, 2.1, 3.9, 4.8, 0.48, 0.21]);
    const a1 = K.sf(a, 1), b1 = K.sf(b, 1), c1 = K.sf(c, 1), est = K.round(a1 * b1 / c1, 6);
    return { kind: 'num', q: `<p>By writing each number correct to 1 significant figure, estimate the value of</p><p class="bigq">${fr(n(a) + ' × ' + n(b), n(c))}</p>`, a: est, hint: 'Round every number to 1 s.f. first, then calculate.', steps: [`${n(a)} ≈ ${n(a1)}, ${n(b)} ≈ ${n(b1)}, ${n(c)} ≈ ${n(c1)}`, `${n(a1)} × ${n(b1)} ÷ ${n(c1)} = <b>${n(est)}</b>`] };
  };

  // ----- 1.10 Limits of accuracy -----
  G.bounds = () => {
    const t = pick([['1', 1, 'cm', 'to the nearest centimetre'], ['10', 10, 'm', 'to the nearest 10 metres'], ['0.1', 0.1, 'kg', 'correct to 1 decimal place'], ['5', 5, 'cm', 'to the nearest 5 cm'], ['100', 100, 'people', 'to the nearest 100']]);
    const v = t[1] < 1 ? rnd(11, 99) / 10 : rnd(2, 90) * t[1]; const upper = Math.random() < .5; const ans = K.round(v + (upper ? 1 : -1) * t[1] / 2, 4);
    return { kind: 'num', q: `<p>A measurement is <b>${n(v)} ${t[2]}</b>, ${t[3]}.</p><p>Write down the <b>${upper ? 'upper' : 'lower'} bound</b>.</p>`, a: ans, unit: t[2], hint: `Half of ${n(t[1])} is ${n(t[1] / 2)}. ${upper ? 'Add' : 'Subtract'} it.`, steps: [`Half the unit of accuracy: ${n(t[1])} ÷ 2 = ${n(t[1] / 2)}`, `${n(v)} ${upper ? '+' : '−'} ${n(t[1] / 2)} = <b>${n(ans)}</b>`] };
  };
  G.boundsCalc = () => {
    const L = rnd(5, 20), Wd = rnd(3, 12), upper = Math.random() < .5, per = Math.random() < .5;
    const l = L + (upper ? .5 : -.5), w = Wd + (upper ? .5 : -.5); const ans = per ? 2 * (l + w) : l * w;
    return { kind: 'num', q: `<p>A rectangle measures ${L} cm by ${Wd} cm, both to the nearest centimetre.</p><p>Calculate the <b>${upper ? 'upper' : 'lower'} bound</b> of its <b>${per ? 'perimeter' : 'area'}</b>.</p>`, a: K.round(ans, 4), unit: per ? 'cm' : 'cm²', hint: `Use the ${upper ? 'upper' : 'lower'} bound of both sides.`, steps: [`Bounds: ${n(l)} cm and ${n(w)} cm`, per ? `2 × (${n(l)} + ${n(w)}) = <b>${n(ans)}</b>` : `${n(l)} × ${n(w)} = <b>${n(ans)}</b>`] };
  };

  // ----- 1.11 Ratio -----
  G.ratioSimplify = () => {
    const three = Math.random() < .35; let p = rnd(1, 7), q = rnd(1, 7), r = rnd(1, 7); while (K.gcd(K.gcd(p, q), three ? r : p) !== 1) { p = rnd(1, 7); q = rnd(1, 7); r = rnd(1, 7); }
    const k = rnd(2, 12); const parts = three ? [p, q, r] : [p, q];
    return { kind: 'nums', ordered: true, q: `<p>Write <b class="bigq">${parts.map(x => x * k).join(' : ')}</b> in its simplest form.</p>`, a: parts, show: parts.join(' : '), ph: 'e.g. 2 : 3', hint: 'Divide every part by the highest common factor.', steps: [`HCF of ${parts.map(x => x * k).join(', ')} is ${k}`, `Divide each part by ${k}: <b>${parts.join(' : ')}</b>`] };
  };
  G.ratioShare = () => {
    let p = rnd(1, 7), q = rnd(1, 7); while (p === q) q = rnd(1, 7); const u = rnd(3, 25) * pick([1, 5, 10]), tot = u * (p + q);
    const big = Math.random() < .5; const names = K.shuffle(['Amir', 'Bea', 'Chen', 'Dev', 'Esi', 'Farah']);
    const ansWho = big ? (p > q ? names[0] : names[1]) : (p < q ? names[0] : names[1]); const ans = big ? Math.max(p, q) * u : Math.min(p, q) * u;
    return { kind: 'num', q: `<p>${names[0]} and ${names[1]} share $${n(tot)} in the ratio ${p} : ${q}.</p><p>How much does <b>${ansWho}</b> get?</p>`, a: ans, unit: 'dollars', hint: `Total parts: ${p} + ${q}. Find one part first.`,
      steps: [`Total units: ${p} + ${q} = ${p + q}`, `1 unit = ${n(tot)} ÷ ${p + q} = ${n(u)}`, `${ansWho}: ${ansWho === names[0] ? p : q} × ${n(u)} = <b>$${n(ans)}</b>`],
      after: K.barModel([{ label: names[0], parts: [{ n: p, color: 'var(--c1)', text: `$${n(p * u)}` }] }, { label: names[1], parts: [{ n: q, color: 'var(--c2)', text: `$${n(q * u)}` }] }], { unitW: Math.min(34, 220 / Math.max(p, q)) }) };
  };
  G.recipe = () => {
    const s = pick([2, 3, 4, 5, 6]), t = pick([2, 3, 4, 5, 6, 8, 10, 12].filter(x => x !== s)), u = rnd(10, 60), x = s * u;
    const item = pick(['grams of flour', 'grams of rice', 'ml of milk', 'grams of lentils']);
    return { kind: 'num', q: `<p>A recipe for <b>${s} people</b> uses <b>${x} ${item}</b>.</p><p>How much is needed for <b>${t} people</b>?</p>`, a: t * u, hint: 'Find the amount for 1 person first (the unitary method).', steps: [`1 person: ${x} ÷ ${s} = ${u}`, `${t} people: ${u} × ${t} = <b>${t * u}</b>`] };
  };
  G.mapScale = () => {
    const sc = pick([25000, 50000, 100000, 200000]), cm = rnd(2, 15) + pick([0, 0.5]); const km = cm * sc / 100000;
    return { kind: 'num', q: `<p>A map has a scale of <b>1 : ${n(sc)}</b>. Two towns are <b>${n(cm)} cm</b> apart on the map.</p><p>What is the real distance in <b>kilometres</b>?</p>`, a: km, unit: 'km', hint: '1 km = 100 000 cm.', steps: [`Real distance: ${n(cm)} × ${n(sc)} = ${n(cm * sc)} cm`, `÷ 100 000 = <b>${n(km)} km</b>`] };
  };
  W.ratioBar = el => {
    el.innerHTML = `<div class="sliders"><label>Ratio <input class="inp sm" value="3" inputmode="numeric"> : <input class="inp sm" value="5" inputmode="numeric"></label><label>Total <input class="inp sm" value="64" inputmode="numeric"></label></div><div class="out"></div>`;
    const [i1, i2, i3] = el.querySelectorAll('input'), out = el.querySelector('.out');
    const draw = () => {
      const p = Math.max(1, Math.min(12, +i1.value || 1)), q = Math.max(1, Math.min(12, +i2.value || 1)), t = +i3.value || 0, u = t / (p + q);
      out.innerHTML = K.barModel([{ label: 'A', parts: [{ n: p, color: 'var(--c1)' }], right: n(K.round(p * u, 2)) }, { label: 'B', parts: [{ n: q, color: 'var(--c2)' }], right: n(K.round(q * u, 2)) }], { unitW: Math.min(30, 230 / Math.max(p, q)) }) +
        `<p class="center">${p + q} units = ${n(t)} → 1 unit = ${n(K.round(u, 3))}</p>`;
    };
    el.querySelectorAll('input').forEach(i => i.oninput = draw); draw();
  };

  // ----- 1.12 Rates -----
  G.speed = () => {
    const v = 4 * rnd(3, 25), t = pick([0.75, 1.25, 1.5, 2.25, 2.5, 3.75, 1.75]); const d = v * t; const hh = Math.floor(t), mm = Math.round((t - hh) * 60);
    const ts = (hh ? `${hh} hour${hh > 1 ? 's' : ''} ` : '') + (mm ? `${mm} minutes` : '');
    const ask = pick(['v', 'd']);
    if (ask === 'v') return { kind: 'num', q: `<p>A cyclist travels <b>${n(d)} km</b> in <b>${ts.trim()}</b>. What is their average speed?</p>`, a: v, unit: 'km/h', hint: 'Speed = distance ÷ time. Change the minutes into a fraction of an hour first.', steps: [`${ts.trim()} = ${t} hours`, `Speed = ${n(d)} ÷ ${t} = <b>${v} km/h</b>`] };
    return { kind: 'num', q: `<p>A bus travels at an average speed of <b>${v} km/h</b> for <b>${ts.trim()}</b>. How far does it go?</p>`, a: d, unit: 'km', hint: 'Distance = speed × time (time in hours).', steps: [`${ts.trim()} = ${t} hours`, `Distance = ${v} × ${t} = <b>${n(d)} km</b>`] };
  };
  G.density = () => {
    const dens = pick([0.8, 1.2, 2.5, 7.8, 11.3, 19.3, 2.7]), vol = rnd(5, 80), m = K.round(dens * vol, 2); const ask = pick(['d', 'm']);
    return ask === 'd' ? { kind: 'num', q: `<p>A block has mass <b>${n(m)} g</b> and volume <b>${vol} cm³</b>.</p><p>Density = mass ÷ volume. Find its density.</p>`, a: dens, unit: 'g/cm³', steps: [`${n(m)} ÷ ${vol} = <b>${n(dens)} g/cm³</b>`] }
      : { kind: 'num', q: `<p>A metal has density <b>${n(dens)} g/cm³</b>. Density = mass ÷ volume.</p><p>Find the mass of <b>${vol} cm³</b> of it.</p>`, a: m, unit: 'g', hint: 'Mass = density × volume.', steps: [`${n(dens)} × ${vol} = <b>${n(m)} g</b>`] };
  };
  G.bestValue = () => {
    const a = rnd(2, 6) * 100, b = a * pick([2, 3]) ; const pa = K.round(rnd(80, 300) / 100, 2), pb = K.round(pa * (b / a) * pick([0.85, 0.9, 1.1, 1.2]), 2);
    const ua = pa / a, ub = pb / b; const best = ua < ub ? 'Small' : 'Large';
    return { kind: 'mcq', q: `<p>Which is better value?</p><ul><li><b>Small:</b> ${a} g for $${pa.toFixed(2)}</li><li><b>Large:</b> ${b} g for $${pb.toFixed(2)}</li></ul>`, a: best, choices: ['Small', 'Large'], hint: 'Work out the cost per gram (or per 100 g) of each.', steps: [`Small: $${pa.toFixed(2)} ÷ ${a / 100} = $${(pa / (a / 100)).toFixed(3)} per 100 g`, `Large: $${pb.toFixed(2)} ÷ ${b / 100} = $${(pb / (b / 100)).toFixed(3)} per 100 g`, `Cheaper per gram: <b>${best}</b>`] };
  };

  // ----- 1.13 Percentages -----
  G.pctOf = () => { const p = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 120, 150]), x = rnd(2, 40) * 20; return { kind: 'num', q: `<p>Find <b>${p}%</b> of <b>${n(x)}</b>.</p>`, a: p * x / 100, hint: '10% is ÷ 10, 5% is half of 10%, 1% is ÷ 100.', steps: [`${p}% of ${n(x)} = ${fr(p, 100)} × ${n(x)}`, `= <b>${n(p * x / 100)}</b>`] }; };
  G.pctExpress = () => { const b = pick([20, 25, 40, 50, 80, 200, 250, 400, 500]), p = pick([5, 10, 15, 20, 30, 35, 45, 60, 64, 72, 85]); const a = b * p / 100; return { kind: 'num', q: `<p>A student scores <b>${n(a)}</b> out of <b>${b}</b>. Write this as a percentage.</p>`, a: p, unit: '%', hint: 'Fraction first, then × 100.', steps: [`${fr(n(a), b)} × 100 = <b>${p}%</b>`] }; };
  G.pctChange = () => {
    if (Math.random() < .5) { const x = rnd(4, 50) * 20, p = pick([5, 10, 15, 20, 25, 30, 40]), up = Math.random() < .5; const ans = x * (1 + (up ? p : -p) / 100); return { kind: 'num', q: `<p>A price of <b>$${n(x)}</b> is ${up ? 'increased' : 'decreased'} by <b>${p}%</b>. Find the new price.</p>`, a: ans, unit: 'dollars', hint: `Multiplier: ${up ? '1 + ' : '1 − '}${p / 100} = ${n(1 + (up ? p : -p) / 100)}`, steps: [`Multiplier = ${n(1 + (up ? p : -p) / 100)}`, `${n(x)} × ${n(1 + (up ? p : -p) / 100)} = <b>$${n(ans)}</b>`] }; }
    const old = rnd(4, 50) * 10, p = pick([5, 10, 15, 20, 25, 30, 40, 50]), up = Math.random() < .5, nw = old * (1 + (up ? p : -p) / 100);
    return { kind: 'num', q: `<p>The number of visitors went from <b>${n(old)}</b> to <b>${n(nw)}</b>. Find the percentage ${up ? 'increase' : 'decrease'}.</p>`, a: p, unit: '%', hint: 'Percentage change = change ÷ original × 100.', steps: [`Change: ${n(Math.abs(nw - old))}`, `${n(Math.abs(nw - old))} ÷ ${n(old)} × 100 = <b>${p}%</b>`] };
  };
  G.interest = () => {
    const P = rnd(5, 50) * 100, r = pick([2, 2.5, 3, 4, 5, 6]), yrs = rnd(2, 5), comp = Math.random() < .6;
    if (!comp) { const I = P * r * yrs / 100; return { kind: 'num', q: `<p>$${n(P)} is invested at <b>${r}% per year simple interest</b> for ${yrs} years. How much <b>interest</b> is earned?</p>`, a: I, unit: 'dollars', hint: 'Simple interest = P × r × n ÷ 100.', steps: [`Each year: ${r}% of ${n(P)} = ${n(P * r / 100)}`, `${yrs} years: ${n(P * r / 100)} × ${yrs} = <b>$${n(I)}</b>`] }; }
    const A = P * Math.pow(1 + r / 100, yrs);
    return Object.assign({ kind: 'num', q: `<p>$${n(P)} is invested at <b>${r}% per year compound interest</b>. Find the value after <b>${yrs} years</b>, to the nearest cent.</p>`, unit: 'dollars', hint: `Multiply by ${n(1 + r / 100)} once for each year.`, steps: [`Multiplier ${n(1 + r / 100)} for ${yrs} years: ${n(P)} × ${n(1 + r / 100)}<sup>${yrs}</sup>`, `= <b>$${A.toFixed(2)}</b>`] }, K.accDP(A, 2));
  };
  G.reversePct = () => {
    const orig = rnd(3, 40) * 20, p = pick([10, 15, 20, 25, 30, 40]), up = Math.random() < .5, now = orig * (1 + (up ? p : -p) / 100);
    return { kind: 'num', q: `<p>After a <b>${p}% ${up ? 'increase' : 'discount'}</b>, a phone costs <b>$${n(now)}</b>. What was the price before?</p>`, a: orig, unit: 'dollars', hint: `$${n(now)} is ${up ? 100 + p : 100 - p}% of the original. Divide, don't subtract!`,
      steps: [`${n(now)} is ${up ? 100 + p : 100 - p}% of the original`, `1%: ${n(now)} ÷ ${up ? 100 + p : 100 - p} = ${n(now / (up ? 100 + p : 100 - p))}`, `100%: <b>$${n(orig)}</b>`] };
  };
  W.compound = el => {
    el.innerHTML = `<div class="sliders"><label>Rate: <b class="rv"></b>% per year<input type="range" min="1" max="15" value="5" class="r"></label><label>Years: <b class="yv"></b><input type="range" min="1" max="30" value="10" class="y"></label></div><div class="out"></div>`;
    const r = el.querySelector('.r'), y = el.querySelector('.y'), out = el.querySelector('.out');
    const draw = () => {
      const R = +r.value, Y = +y.value; el.querySelector('.rv').textContent = R; el.querySelector('.yv').textContent = Y;
      const simple = 1000 * (1 + R * Y / 100), comp = 1000 * Math.pow(1 + R / 100, Y), top = Math.max(comp, simple) * 1.1;
      out.innerHTML = K.plot([{ f: t => 1000 * (1 + R * t / 100), color: 'var(--c2)' }, { f: t => 1000 * Math.pow(1 + R / 100, t), color: 'var(--c1)' }], [], { xmin: 0, xmax: Y, ymin: 0, ymax: top, gstep: Math.pow(10, Math.floor(Math.log10(top))), lstep: Math.pow(10, Math.floor(Math.log10(top))), h: 220 })
        + `<p class="center small">Starting with $1000: <span style="color:var(--c1)">■ compound $${comp.toFixed(2)}</span> · <span style="color:var(--c2)">■ simple $${simple.toFixed(2)}</span></p>`;
    };
    r.oninput = y.oninput = draw; draw();
  };

  // ----- 1.14 Using a calculator -----
  G.calcDisplay = () => pick([
    () => { const h = rnd(1, 5), q = pick([0.25, 0.5, 0.75, 0.2, 0.1, 0.4]); const m = Math.round(q * 60); const right = `${h} h ${m} min`; return { kind: 'mcq', q: `<p>A calculator shows a time of <b class="bigq">${n(h + q)}</b> hours. What is this in hours and minutes?</p>`, a: right, choices: mcq(right, [`${h} h ${Math.round(q * 100)} min`, `${h} h ${m + 10} min`, `${h + 1} h ${m} min`]), hint: 'Multiply the decimal part by 60.', steps: [`${q} × 60 = ${m} minutes`, `<b>${right}</b>`] }; },
    () => { const d = rnd(1, 99) + pick([0.1, 0.2, 0.3, 0.5, 0.8, 0.9]); const right = '$' + d.toFixed(2); return { kind: 'mcq', q: `<p>A calculator answer for a price shows <b class="bigq">${n(K.round(d, 1))}</b>. How do you write this in money?</p>`, a: right, choices: mcq(right, ['$' + K.round(d, 1) + '0'.replace('0', ''), '$' + Math.floor(d) + '.0' + Math.round((d % 1) * 10), '$' + Math.round(d) + '.00']), steps: [`Money always has 2 decimal places: <b>${right}</b>`] }; }
  ])();
  G.calcUse = () => {
    const f = pick([
      () => { const a = rnd(20, 90) / 10, b = rnd(20, 90) / 10, c = rnd(11, 59) / 10, d = rnd(2, 9) / 10; return { t: `${fr(n(a) + ' + ' + n(b), n(c) + ' × ' + n(d))}`, v: (a + b) / (c * d), how: 'Put brackets round the top and the bottom: (a + b) ÷ (c × d).' }; },
      () => { const a = rnd(3, 15), b = rnd(3, 15), c = rnd(2, 9); return { t: `${fr(K.sqrt(a + '² + ' + b + '²'), c)}`, v: Math.sqrt(a * a + b * b) / c, how: 'Use the √ key with brackets around a² + b².' }; },
      () => { const a = rnd(11, 99) / 10, b = rnd(2, 6); return { t: `${n(a)}<sup>${b}</sup> − ${K.sqrt(n(a * 3))}`, v: Math.pow(a, b) - Math.sqrt(a * 3), how: 'Use the power key, then subtract the square root.' }; }
    ])();
    return Object.assign({ kind: 'num', q: `<p>Use your calculator to work out the value, correct to <b>3 significant figures</b>:</p><p class="bigq">${f.t}</p>`, hint: f.how + ' Only round at the very end.', steps: [f.how, `Full display: ${n(K.round(f.v, 6))}`, `To 3 s.f.: <b>${n(K.sf(f.v, 3))}</b>`] }, K.acc3(f.v));
  };

  // ----- 1.15 Time -----
  const hhmm = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ' ' + String(m % 60).padStart(2, '0'); };
  G.timeAdd = () => {
    const s = rnd(5 * 60, 20 * 60) + pick([0, 5, 10, 15, 20, 25, 35, 40, 45, 50, 55]), dur = rnd(25, 200); const e = s + dur;
    const t = hhmm(e).replace(' ', '');
    return { kind: 'text', q: `<p>A train leaves at <b>${hhmm(s)}</b> and the journey takes <b>${Math.floor(dur / 60) ? Math.floor(dur / 60) + ' h ' : ''}${dur % 60} min</b>.</p><p>At what time does it arrive? (24-hour clock)</p>`, a: hhmm(e), accept: [t, hhmm(e)], ph: 'e.g. 14 05', hint: 'Add the hours, then the minutes. 60 minutes make 1 hour.', steps: [`${hhmm(s)} + ${Math.floor(dur / 60)} h ${dur % 60} min`, `= <b>${hhmm(e)}</b>`] };
  };
  G.timeDiff = () => { const s = rnd(6 * 60, 12 * 60), d = rnd(40, 400); return { kind: 'num', q: `<p>A lesson block starts at <b>${hhmm(s)}</b> and ends at <b>${hhmm(s + d)}</b>. How long is it in <b>minutes</b>?</p>`, a: d, unit: 'min', hint: 'Count up to the next full hour, then on to the end time.', steps: [`From ${hhmm(s)} to ${hhmm(s + d)}`, `= ${Math.floor(d / 60)} h ${d % 60} min = <b>${d} min</b>`] }; };
  G.to24 = () => {
    const h = rnd(1, 12), m = pick([0, 5, 15, 20, 30, 45, 50]), pm = Math.random() < .5; const H = pm ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h); const s = String(H).padStart(2, '0') + ' ' + String(m).padStart(2, '0');
    return { kind: 'text', q: `<p>Write <b>${h}.${String(m).padStart(2, '0')} ${pm ? 'p.m.' : 'a.m.'}</b> using the 24-hour clock.</p>`, a: s, accept: [s, s.replace(' ', '')], ph: 'e.g. 15 15', hint: 'p.m. times (except 12 noon) add 12 to the hours. 12 midnight is 00.', steps: [`<b>${s}</b>`] };
  };
  G.timezone = () => {
    const z = pick([['Singapore', 8, 'London', 0], ['Mumbai', 5.5, 'London', 0], ['Lagos', 1, 'Tokyo', 9], ['Karachi', 5, 'Singapore', 8], ['Dhaka', 6, 'London', 0]]);
    const t = rnd(0, 23) * 60 + pick([0, 15, 30, 45]); const t2 = t + (z[3] - z[1]) * 60;
    const s = hhmm(t2);
    return { kind: 'text', q: `<p>${z[0]} is UTC${z[1] >= 0 ? '+' : ''}${z[1]}. ${z[2]} is UTC${z[3] >= 0 ? '+' : ''}${z[3]}.</p><p>When it is <b>${hhmm(t)}</b> in ${z[0]}, what time is it in ${z[2]}?</p>`, a: s, accept: [s, s.replace(' ', '')], ph: 'e.g. 07 30', hint: `Difference: ${z[3] - z[1]} hours.`, steps: [`${z[2]} is ${Math.abs(z[3] - z[1])} hours ${z[3] > z[1] ? 'ahead' : 'behind'}`, `${hhmm(t)} ${z[3] > z[1] ? '+' : '−'} ${Math.abs(z[3] - z[1])} h = <b>${s}</b>`] };
  };

  // ----- 1.16 Money -----
  G.exchange = () => {
    const r = pick([['$1', '₹', 62.4], ['$1', '₨', 210.5], ['£1', '$', 1.72], ['€1', '৳', 129.6], ['$1', 'RM', 3.48]]); const amt = rnd(2, 40) * 25, toForeign = Math.random() < .6;
    if (toForeign) { const v = amt * r[2]; return Object.assign({ kind: 'num', q: `<p>The exchange rate is <b>${r[0]} = ${r[1]}${r[2]}</b>. Change <b>${r[0][0]}${n(amt)}</b> into ${r[1]}.</p>`, hint: 'Multiply by the rate.', steps: [`${n(amt)} × ${r[2]} = <b>${r[1]}${n(K.round(v, 2))}</b>`] }, K.accDP(v, 2)); }
    const f = K.round(amt * r[2], 0), v = f / r[2];
    return Object.assign({ kind: 'num', q: `<p>The exchange rate is <b>${r[0]} = ${r[1]}${r[2]}</b>. Change <b>${r[1]}${n(f)}</b> into ${r[0][0]}. Give your answer to the nearest cent.</p>`, hint: 'Divide by the rate.', steps: [`${n(f)} ÷ ${r[2]} = <b>${r[0][0]}${v.toFixed(2)}</b>`] }, K.accDP(v, 2));
  };
  G.moneyCalc = () => {
    const items = [['notebooks', rnd(80, 350) / 100], ['pens', rnd(40, 180) / 100], ['rulers', rnd(50, 150) / 100]]; const [it, p] = pick(items); const qn = rnd(3, 12), paid = Math.ceil(p * qn / 10) * 10 + pick([0, 10]);
    const ch = K.round(paid - p * qn, 2);
    return { kind: 'num', q: `<p>Ravi buys <b>${qn} ${it}</b> at <b>$${p.toFixed(2)}</b> each. He pays with <b>$${paid}</b>. How much change does he get?</p>`, a: ch, unit: 'dollars', show: '$' + ch.toFixed(2), steps: [`Cost: ${qn} × ${p.toFixed(2)} = $${(p * qn).toFixed(2)}`, `Change: ${paid} − ${(p * qn).toFixed(2)} = <b>$${ch.toFixed(2)}</b>`] };
  };

  // ----- 1.17 Exponential growth and decay -----
  G.expGrowth = () => {
    if (Math.random() < .5) {
      const P = rnd(20, 90) * 1000, r = pick([1.5, 2, 2.5, 3, 4, 5]), y = rnd(3, 10); const v = P * Math.pow(1 + r / 100, y);
      return { kind: 'num', q: `<p>A town has <b>${n(P)}</b> people. The population grows by <b>${r}%</b> each year. Estimate the population after <b>${y} years</b>, to the nearest whole number.</p>`, a: v, tol: 0.5001, show: n(Math.round(v)), hint: `Multiplier ${n(1 + r / 100)}, applied ${y} times.`, steps: [`${n(P)} × ${n(1 + r / 100)}<sup>${y}</sup>`, `= <b>${n(Math.round(v))}</b>`] };
    }
    const V = rnd(8, 40) * 1000, r = pick([8, 10, 12, 15, 20]), y = rnd(2, 6), v = V * Math.pow(1 - r / 100, y);
    return { kind: 'num', q: `<p>A car costs <b>$${n(V)}</b>. It loses <b>${r}%</b> of its value every year (depreciation). Find its value after <b>${y} years</b>, to the nearest dollar.</p>`, a: v, tol: 0.5001, show: '$' + n(Math.round(v)), unit: 'dollars', hint: `Multiplier ${n(1 - r / 100)}, applied ${y} times.`, steps: [`${n(V)} × ${n(1 - r / 100)}<sup>${y}</sup>`, `= <b>$${n(Math.round(v))}</b>`] };
  };

  // ----- 1.18 Surds -----
  G.surdSimplify = () => {
    const b = pick([2, 3, 5, 6, 7, 10, 11]), a = rnd(2, 9);
    return { kind: 'nums', ordered: true, q: `<p>Simplify <b class="bigq">${K.sqrt(a * a * b)}</b></p><p class="muted small">Write it as a√b, e.g. type 3√5.</p>`, a: [a, b], show: `${a}√${b}`, ph: 'e.g. 3√5', hint: `Find the biggest square number that divides ${a * a * b}.`, steps: [`${a * a * b} = ${a * a} × ${b}`, `${K.sqrt(a * a * b)} = ${K.sqrt(a * a)} × ${K.sqrt(b)} = <b>${a}√${b}</b>`] };
  };
  G.surdAdd = () => {
    const b = pick([2, 3, 5, 7]), p = rnd(2, 6), q = rnd(1, 5), add = Math.random() < .6; const r = add ? p + q : p - q;
    if (r === 0) return G.surdSimplify();
    return { kind: 'nums', ordered: true, q: `<p>Simplify <b class="bigq">${K.sqrt(p * p * b)} ${add ? '+' : '−'} ${K.sqrt(q * q * b)}</b></p><p class="muted small">Give your answer as a√b.</p>`, a: [r, b], show: `${n(r)}√${b}`, ph: 'e.g. 6√2', hint: 'Simplify each surd first, then collect like surds.', steps: [`${K.sqrt(p * p * b)} = ${p}√${b}`, `${K.sqrt(q * q * b)} = ${q}√${b}`, `${p}√${b} ${add ? '+' : '−'} ${q}√${b} = <b>${n(r)}√${b}</b>`] };
  };
  G.rationalise = () => {
    const b = pick([2, 3, 5, 6, 7, 10]), k = pick([1, 2, 3, 4, 5, 6, 10, 12, 15].filter(x => x !== b));
    const g = K.gcd(k, b); const top = k / g, bot = b / g;
    const right = bot === 1 ? (top === 1 ? `√${b}` : `${top}√${b}`) : `${fr((top === 1 ? '' : top) + '√' + b, bot)}`;
    return { kind: 'mcq', q: `<p>Rationalise the denominator: <span class="bigq">${fr(k, '√' + b)}</span></p>`, a: right, choices: mcq(right, [fr(k, b), `${k}√${b}`, fr('√' + b, k), fr(k + '√' + b, b * b)]), hint: `Multiply top and bottom by √${b}.`, steps: [`${fr(k, '√' + b)} × ${fr('√' + b, '√' + b)} = ${fr(k + '√' + b, b)}`, `Simplify: <b>${right}</b>`] };
  };

  R2O.addModule({
    id: 'number', name: 'Number', icon: '🔢', color: '#2563eb', blurb: 'Syllabus section 1: types of number, fractions, percentages, ratio, standard form, bounds, surds and more.',
    book: ['Prealgebra 2e', 'https://openstax.org/details/books/prealgebra-2e'],
    lessons: [
      { id: 'n-types', title: 'Types of number', obj: ['1.1'], kw: 'prime factorization HCF LCM',
        hook: 'Primes are the building blocks of every whole number, like atoms in chemistry.',
        learn: [
          { h: 'Names for numbers', b: `<ul><li><b>Natural numbers</b>: 1, 2, 3, …</li><li><b>Integers</b>: …, −2, −1, 0, 1, 2, …</li><li><b>Prime</b>: exactly two factors (2, 3, 5, 7, 11…). 1 is <i>not</i> prime.</li><li><b>Square</b>: 1, 4, 9, 16… &nbsp;<b>Cube</b>: 1, 8, 27, 64…</li><li><b>Rational</b>: can be written as a fraction, e.g. 0.75 = ¾. <b>Irrational</b>: cannot, e.g. √2, π.</li><li><b>Reciprocal</b> of x is ${fr(1, 'x')}: the reciprocal of ${fr(2, 3)} is ${fr(3, 2)}.</li></ul>`,
            check: { q: 'Which is NOT prime?', opts: ['2', '17', '21', '29'], a: 2, why: '21 = 3 × 7.' } },
          { h: 'Prime factors with a factor tree', b: `<p>72 = 8 × 9 = 2 × 2 × 2 × 3 × 3 = <b>2³ × 3²</b>.</p><p>Keep splitting until every branch ends in a prime. Write the answer with indices.</p>` },
          { h: 'HCF and LCM', b: `<p><b>HCF</b> (highest common factor): biggest number that divides both. HCF of 12 and 18 = <b>6</b>.</p><p><b>LCM</b> (lowest common multiple): smallest number both divide into. LCM of 4 and 6 = <b>12</b>.</p><p>With prime factors: HCF takes the <b>lowest</b> powers of shared primes; LCM takes the <b>highest</b> powers of all primes.</p>` }
        ],
        ex: [{ q: 'Find the HCF and LCM of 60 and 84.', steps: ['60 = 2² × 3 × 5 and 84 = 2² × 3 × 7', 'HCF: shared primes, lowest powers: 2² × 3 = 12', 'LCM: all primes, highest powers: 2² × 3 × 5 × 7 = 420'], a: 'HCF = 12, LCM = 420' }],
        keys: ['1 is not prime; 2 is the only even prime.', 'Write prime factorisations with indices, e.g. 72 = 2³ × 3².', 'HCF: lowest powers of shared primes. LCM: highest powers of all primes.', 'Irrational numbers (√2, π) cannot be written as fractions.'],
        gens: ['primeFactors', 'hcfLcm', 'classify', 'reciprocal'] },
      { id: 'n-sets', title: 'Sets and Venn diagrams', obj: ['1.2'], kw: 'venn diagrams sets',
        hook: 'Sets sort things into groups. Venn diagrams show the overlaps at a glance.',
        learn: [
          { h: 'Set language', b: `<p>A set is a collection: A = {2, 4, 6, 8}. <b>n(A)</b> = 4 elements. 6 <b>∈</b> A ("is an element of"); 5 <b>∉</b> A.</p><p><b>ℰ</b> is the universal set (everything), <b>∅</b> the empty set.</p>` },
          { h: 'Union, intersection, complement', b: `${K.venn({ a: 'A only', ab: 'both', b: 'B only', out: 'neither' })}<ul><li><b>A ∪ B</b> (union): in A <i>or</i> B or both</li><li><b>A ∩ B</b> (intersection): in <i>both</i></li><li><b>A′</b> (complement): <i>not</i> in A</li></ul>`,
            check: { q: 'A = {1,2,3,4}, B = {3,4,5}. What is A ∩ B?', opts: ['{1,2,3,4,5}', '{3,4}', '{1,2}', '{5}'], a: 1, why: '3 and 4 are in both.' } },
          { h: 'Filling a Venn diagram', b: `<p>Always fill the <b>overlap first</b>, then the "only" parts, then the outside. Check the total matches n(ℰ).</p>` }
        ],
        keys: ['∪ union = or; ∩ intersection = and; A′ = not A.', 'Fill the overlap first.', 'Venn diagrams in the exam have two or three sets.'],
        gens: ['vennCount', 'setSymbol'] },
      { id: 'n-powers', title: 'Powers and roots', obj: ['1.3'], kw: 'squares and square roots',
        hook: 'Squares up to 15² and cubes of 1 to 5 and 10 must be known by heart for the non-calculator paper.',
        learn: [
          { h: 'Squares and square roots', b: `<p>5² = 5 × 5 = 25, so √25 = 5. Learn: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.</p>` },
          { h: 'Cubes and cube roots', b: `<p>4³ = 4 × 4 × 4 = 64, so ∛64 = 4. Learn: 1, 8, 27, 64, 125 and 10³ = 1000.</p>`, check: { q: '∛125 = ?', opts: ['5', '25', '15', '41.7'], a: 0, why: '5 × 5 × 5 = 125.' } }
        ],
        keys: ['Know squares 1² to 15² and their roots.', 'Know cubes of 1, 2, 3, 4, 5, 10 and their roots.'],
        gens: ['sqCube'] },
      { id: 'n-fdp', title: 'Fractions, decimals and percentages', obj: ['1.4'], sg: true, kw: 'converting fractions decimals percentages',
        hook: 'Three ways to write the same amount. Switching between them is a skill used in nearly every paper.',
        learn: [
          { h: 'Same amount, three forms', b: `<p>${fr(3, 4)} = 0.75 = 75%. ${K.fracBar(3, 4)}</p><ul><li>Fraction → decimal: divide top by bottom.</li><li>Decimal → percentage: × 100.</li><li>Percentage → fraction: write over 100 and simplify.</li></ul>` },
          { h: 'Mixed numbers and improper fractions', b: `<p>2${fr(1, 3)} = ${fr(7, 3)} (2 wholes = 6 thirds, plus 1 third). Going back: 7 ÷ 3 = 2 remainder 1.</p>`, check: { q: `Write ${fr(11, 4)} as a mixed number`, opts: ['2¾', '3¼', '2¼', '11¼'], a: 0, why: '11 ÷ 4 = 2 remainder 3.' } },
          { h: 'Recurring decimals', b: `<p>${fr(1, 3)} = 0.333… written 0.${rec(3)}. ${fr(4, 33)} = 0.121212… written 0.${rec(1)}${rec(2)}.</p><p>To convert back: if x = 0.${rec(4)}, then 10x = 4.${rec(4)}, so 9x = 4 and x = ${fr(4, 9)}.</p>` }
        ],
        keys: ['Fraction → decimal: divide. Decimal → % : × 100.', 'Always give fractions in simplest form.', 'Recurring decimal → fraction: multiply by 10 or 100 and subtract.'],
        gens: ['fdpConvert', 'recurring'] },
      { id: 'n-order', title: 'Ordering', obj: ['1.5'], kw: 'ordering fractions decimals',
        learn: [
          { h: 'Compare like with like', b: `<p>To order ${fr(5, 8)}, 0.6 and 62%: convert all to decimals: 0.625, 0.6, 0.62. Order: 0.6, 62%, ${fr(5, 8)}.</p>` },
          { h: 'The symbols', b: `<p>= equal, ≠ not equal, &gt; greater than, &lt; less than, ⩾ greater than or equal to, ⩽ less than or equal to.</p><p>The arrow points to the smaller number: 3 &lt; 7.</p>`, check: { q: 'Which is true?', opts: ['−5 > −2', '0.3 > 1/3', '4/9 < 0.45', '2/5 ≠ 0.4'], a: 2, why: '4/9 = 0.444…, which is less than 0.45.' } }
        ],
        keys: ['Convert everything to decimals to compare.', 'The pointy end of < or > points at the smaller number.'],
        gens: ['order'] },
      { id: 'n-ops', title: 'The four operations', obj: ['1.6'], kw: 'order of operations fractions',
        hook: 'BIDMAS tells everyone in the world to calculate in the same order, so we all get the same answer.',
        learn: [
          { h: 'Order of operations: BIDMAS', b: `<p><b>B</b>rackets → <b>I</b>ndices → <b>D</b>ivision and <b>M</b>ultiplication (left to right) → <b>A</b>ddition and <b>S</b>ubtraction (left to right).</p><p>3 + 4 × 2 = 3 + 8 = <b>11</b>, not 14.</p>`, check: { q: '20 − 6 ÷ 2 = ?', opts: ['7', '17', '13', '4'], a: 1, why: 'Divide first: 6 ÷ 2 = 3, then 20 − 3 = 17.' } },
          { h: 'Adding and subtracting fractions', b: `<p>Make the denominators the same: ${fr(1, 4)} + ${fr(2, 3)} = ${fr(3, 12)} + ${fr(8, 12)} = <b>${fr(11, 12)}</b>.</p>` },
          { h: 'Multiplying and dividing fractions', b: `<p>× : multiply tops and bottoms. ${fr(2, 3)} × ${fr(3, 5)} = ${fr(6, 15)} = ${fr(2, 5)}.</p><p>÷ : keep, change, <b>flip</b>. ${fr(3, 4)} ÷ ${fr(1, 2)} = ${fr(3, 4)} × ${fr(2, 1)} = ${fr(3, 2)} = 1${fr(1, 2)}.</p><p>With mixed numbers, change them to improper fractions first.</p>` }
        ],
        keys: ['BIDMAS: brackets, indices, ÷ ×, + −.', '+ and − fractions: common denominator.', '× fractions: tops × tops, bottoms × bottoms.', '÷ fractions: flip the second and multiply.'],
        gens: ['bidmas', 'fracOps'] },
      { id: 'n-ind1', title: 'Indices I', obj: ['1.7'], kw: 'laws of indices negative fractional',
        learn: [
          { h: 'The three laws', b: `<p>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup> &nbsp;·&nbsp; a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup> &nbsp;·&nbsp; (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup></p><p>2³ × 2⁴ = 2⁷ = 128.</p>`, check: { q: '5⁶ ÷ 5² = ?', opts: ['5³', '5⁴', '5⁸', '1³'], a: 1, why: 'Subtract powers: 6 − 2 = 4.' } },
          { h: 'Zero and negative powers', b: `<p>a<sup>0</sup> = 1. &nbsp; a<sup>−n</sup> = ${fr(1, 'a<sup>n</sup>')}. &nbsp; 7<sup>−2</sup> = ${fr(1, 49)}.</p>` },
          { h: 'Fractional powers', b: `<p>a<sup>½</sup> = √a, a<sup>⅓</sup> = ∛a. a<sup>m/n</sup>: take the n-th root, then the power m.</p><p>8<sup>2/3</sup> = (∛8)² = 2² = <b>4</b>. 81<sup>½</sup> = 9.</p>` }
        ],
        keys: ['× add powers, ÷ subtract powers, power of power multiply.', 'Anything to the power 0 is 1.', 'Negative power: one over. Fractional power: root first, then power.'],
        gens: ['indexEval', 'indexLaws'] },
      { id: 'n-sf', title: 'Standard form', obj: ['1.8'], kw: 'standard form',
        hook: 'The Sun is 150 000 000 000 m away. Standard form writes that as 1.5 × 10¹¹.',
        learn: [
          { h: 'The shape: A × 10ⁿ', b: `<p>1 ⩽ A &lt; 10 and n is an integer.</p><p>45 000 = 4.5 × 10⁴ &nbsp;·&nbsp; 0.0032 = 3.2 × 10⁻³</p><p>Big numbers → positive power. Small numbers → negative power.</p>`, check: { q: '0.00071 in standard form?', opts: ['7.1 × 10⁻⁴', '71 × 10⁻⁵', '7.1 × 10⁴', '0.71 × 10⁻³'], a: 0, why: 'The point moves 4 places right.' } },
          { h: 'Calculating', b: `<p>(3 × 10⁴) × (5 × 10³) = 15 × 10⁷ = <b>1.5 × 10⁸</b> (fix A so it is between 1 and 10).</p><p>(8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴.</p>` }
        ],
        keys: ['A × 10ⁿ with 1 ⩽ A < 10.', '× : multiply A values, add powers. ÷ : divide A values, subtract powers.', 'Always adjust at the end so 1 ⩽ A < 10.'],
        gens: ['toSF', 'sfCalc'] },
      { id: 'n-est', title: 'Rounding and estimation', obj: ['1.9'], kw: 'significant figures rounding estimation',
        learn: [
          { h: 'Decimal places', b: `<p>3.14159 to 2 d.p. → look at the 3rd decimal (1) → <b>3.14</b>. To 3 d.p. → 3.142 (5 rounds up).</p>` },
          { h: 'Significant figures', b: `<p>Start counting at the <b>first non-zero digit</b>.</p><p>5764 to 1 s.f. = 6000 · 0.004078 to 2 s.f. = 0.0041 · 48.65 to 3 s.f. = 48.7</p>`, check: { q: '0.03049 to 2 s.f.?', opts: ['0.03', '0.030', '0.031', '0.0305'], a: 1, why: 'Start counting at the 3: the 2 s.f. are 3 and 0. The next digit is 4, so round down: 0.030 (that last zero is significant).' } },
          { h: 'Estimating', b: `<p>Round every number to 1 s.f., then calculate: ${fr('41.3 × 9.79', '0.765')} ≈ ${fr('40 × 10', '0.8')} = <b>500</b>.</p>` }
        ],
        keys: ['d.p. counts after the decimal point; s.f. counts from the first non-zero digit.', 'Look at the next digit: 5 or more rounds up.', 'Estimate: round each number to 1 s.f. first.'],
        gens: ['roundDP', 'roundSF', 'estimate'] },
      { id: 'n-bounds', title: 'Limits of accuracy', obj: ['1.10'], kw: 'upper and lower bounds',
        learn: [
          { h: 'Bounds of a measurement', b: `${K.numberLine(22, 24, { step: 0.5, range: { from: 22.5, to: 23.5, fromClosed: true, toClosed: false } })}<p>23 cm to the nearest cm could be anything from <b>22.5</b> (lower bound) up to <b>23.5</b> (upper bound). 22.5 ⩽ x &lt; 23.5.</p><p>Rule: ± half the unit of accuracy.</p>` },
          { h: 'Bounds of a calculation', b: `<ul><li><b>Largest sum/product</b>: upper + upper, upper × upper</li><li><b>Largest difference</b>: upper − lower</li><li><b>Largest quotient</b>: upper ÷ lower</li></ul><p>Speed upper bound = distance UB ÷ time LB.</p>`, check: { q: 'To make a ÷ b as SMALL as possible, use…', opts: ['UB of a ÷ UB of b', 'LB of a ÷ UB of b', 'LB of a ÷ LB of b', 'UB of a ÷ LB of b'], a: 1, why: 'Small top, big bottom.' } }
        ],
        keys: ['Bounds = value ± half the unit of accuracy.', 'Max of a ÷ b: max a ÷ min b. Min: min a ÷ max b.', 'Max of a − b: max a − min b.'],
        gens: ['bounds', 'boundsCalc'] },
      { id: 'n-ratio', title: 'Ratio and proportion', obj: ['1.11'], sg: true, kw: 'ratio sharing', widget: 'ratioBar',
        hook: 'The Singapore bar model turns every ratio problem into a picture of equal units.',
        learn: [
          { h: 'Simplifying ratios', b: `<p>Divide every part by the HCF: 20 : 30 : 40 = <b>2 : 3 : 4</b>. Use the same units first: 50 cm : 2 m = 50 : 200 = 1 : 4.</p>` },
          { h: 'Sharing with a bar model', b: `<p>Share $64 in the ratio 3 : 5.</p>${K.barModel([{ label: 'Ali', parts: [{ n: 3, color: 'var(--c1)' }], right: '?' }, { label: 'Bina', parts: [{ n: 5, color: 'var(--c2)' }], right: '?' }])}<p>8 units = $64, so 1 unit = $8. Ali gets 3 × 8 = <b>$24</b>, Bina 5 × 8 = <b>$40</b>.</p>`, check: { q: 'Share 45 in the ratio 2 : 7. The smaller share is…', opts: ['5', '10', '9', '35'], a: 1, why: '9 units = 45, 1 unit = 5, 2 units = 10.' } },
          { h: 'Proportion in context', b: `<p><b>Unitary method</b>: find the value of 1, then scale. 4 pens cost $6 → 1 pen $1.50 → 7 pens $10.50.</p><p>Map scale 1 : 50 000 means 1 cm on the map is 50 000 cm = 0.5 km in real life.</p>` }
        ],
        keys: ['Simplify by dividing all parts by the HCF.', 'Share: total ÷ number of units = 1 unit.', 'Unitary method: find 1 first, then scale up.', 'Best value: compare price per unit.'],
        gens: ['ratioSimplify', 'ratioShare', 'recipe', 'mapScale', 'bestValue'] },
      { id: 'n-rates', title: 'Rates and speed', obj: ['1.12'], kw: 'speed distance time',
        learn: [
          { h: 'Speed, distance, time', b: `<p class="tri">Speed = ${fr('Distance', 'Time')}</p><p>Distance = Speed × Time &nbsp;·&nbsp; Time = Distance ÷ Speed</p><p class="muted">You must know this formula. It is not given.</p>` },
          { h: 'Watch the time units', b: `<p>3 hours 45 minutes = 3${fr(45, 60)} = <b>3.75 hours</b>, not 3.45!</p><p>A cyclist going 45 km in 3 h 45 min: 45 ÷ 3.75 = <b>12 km/h</b>.</p>`, check: { q: '1 hour 20 minutes as a decimal of an hour?', opts: ['1.2', '1.33…', '1.20', '1.4'], a: 1, why: '20 min = 20/60 = 1/3 hour.' } },
          { h: 'Other rates', b: `<p>Density = mass ÷ volume (g/cm³), pressure = force ÷ area, population density = people ÷ area. In the exam, these formulas are given in the question.</p>` }
        ],
        keys: ['Speed = distance ÷ time: you must know it.', 'Convert minutes to hours by dividing by 60.', 'Units of rates read as "per": km/h, g/cm³.'],
        gens: ['speed', 'density'] },
      { id: 'n-pct', title: 'Percentages', obj: ['1.13'], sg: true, kw: 'percentage increase decrease reverse percentage', widget: 'compound',
        hook: 'Discounts, salaries, interest and inflation: percentages are the maths of money.',
        learn: [
          { h: 'Multipliers', b: `<p>Increase by 15% → × 1.15. Decrease by 15% → × 0.85.</p><p>$80 increased by 15% = 80 × 1.15 = <b>$92</b>.</p>` },
          { h: 'Percentage change', b: `<p class="tri">% change = ${fr('change', 'original')} × 100</p><p>From 50 to 65: change 15, ${fr(15, 50)} × 100 = <b>30% increase</b>.</p>` },
          { h: 'Simple vs compound interest', b: `<p><b>Simple</b>: the same interest every year: $1000 at 5% for 3 years = 3 × $50 = $150.</p><p><b>Compound</b>: interest earns interest: 1000 × 1.05³ = <b>$1157.63</b>.</p>` },
          { h: 'Reverse percentages', b: `<p>After a 20% discount a bag costs $48. The original price?</p>${K.barModel([{ label: 'Original', parts: [{ n: 4, color: 'var(--c1)', text: '80% = $48' }, { n: 1, color: 'var(--c3)', text: '20%' }] }])}<p>80% = $48 → 1% = $0.60 → 100% = <b>$60</b>. (Not 48 + 20%!)</p>`, check: { q: 'After a 25% increase, a price is $100. Original?', opts: ['$75', '$80', '$125', '$120'], a: 1, why: '125% = 100, so 100% = 100 ÷ 1.25 = 80.' } }
        ],
        keys: ['Use multipliers: +x% → × (1 + x/100).', '% change = change ÷ original × 100.', 'Compound interest: P × (1 + r/100)ⁿ (formula not given).', 'Reverse %: divide by the multiplier.'],
        gens: ['pctOf', 'pctExpress', 'pctChange', 'interest', 'reversePct'] },
      { id: 'n-calc', title: 'Using a calculator', obj: ['1.14'], kw: 'using a calculator',
        hook: 'Topic 1.14 only appears on Paper 2, but using your calculator well saves marks everywhere.',
        learn: [
          { h: 'Brackets and fractions', b: `<p>For ${fr('3.2 + 4.7', '2.5 × 0.6')}, type <b>(3.2 + 4.7) ÷ (2.5 × 0.6)</b> or use the fraction key. Without brackets you would get a wrong answer.</p>` },
          { h: 'Don\'t round too early', b: `<p>Keep full values in your calculator (use ANS or memory). Round <b>only the final answer</b>, usually to 3 s.f.</p>` },
          { h: 'Read the display', b: `<p>Money: 4.8 means <b>$4.80</b>. Time: 3.25 hours means <b>3 h 15 min</b> (0.25 × 60).</p>`, check: { q: '2.4 hours = ?', opts: ['2 h 40 min', '2 h 24 min', '2 h 4 min', '2 h 14 min'], a: 1, why: '0.4 × 60 = 24 minutes.' } }
        ],
        keys: ['Put brackets around the top and bottom of fractions.', 'Round only at the end (3 s.f.).', 'Decimal hours × 60 = minutes. Money needs 2 d.p.'],
        gens: ['calcDisplay', 'calcUse'] },
      { id: 'n-time', title: 'Time', obj: ['1.15'], kw: '24 hour clock time',
        learn: [
          { h: '12-hour and 24-hour clocks', b: `<p>3.15 a.m. = <b>03 15</b>; 3.15 p.m. = <b>15 15</b>. Midnight is 00 00.</p>`, check: { q: '7.40 p.m. in 24-hour time?', opts: ['07 40', '17 40', '19 40', '21 40'], a: 2, why: '7 + 12 = 19.' } },
          { h: 'Adding times', b: `<p>There are <b>60</b> minutes in an hour, not 100. 14 50 + 25 min = 15 15.</p>` },
          { h: 'Time zones', b: `<p>If Singapore is UTC+8 and London is UTC+0, London is 8 hours behind: 15 00 in Singapore is 07 00 in London.</p>` }
        ],
        keys: ['p.m.: add 12 to the hour (except 12 noon).', '60 minutes = 1 hour; 1 year = 365 days.', 'Ahead time zone: add hours; behind: subtract.'],
        gens: ['timeAdd', 'timeDiff', 'to24', 'timezone'] },
      { id: 'n-money', title: 'Money', obj: ['1.16'], kw: 'currency exchange rates',
        learn: [
          { h: 'Calculating with money', b: `<p>Always give money to <b>2 decimal places</b>: $3.5 → $3.50.</p>` },
          { h: 'Exchange rates', b: `<p>If $1 = ₹62.40, then $250 = 250 × 62.40 = ₹15 600. Going back: ₹5000 ÷ 62.40 = $80.13.</p><p>To the foreign currency: <b>×</b>. Back to your currency: <b>÷</b>.</p>` }
        ],
        keys: ['Money to 2 d.p.', 'Into the other currency: multiply by the rate. Back: divide.'],
        gens: ['exchange', 'moneyCalc'] },
      { id: 'n-exp', title: 'Exponential growth and decay', obj: ['1.17'], kw: 'exponential growth and decay',
        learn: [
          { h: 'Growing by a percentage each time', b: `<p>A population of 5000 grows 3% a year: after n years it is 5000 × 1.03ⁿ.</p>${K.plot([{ f: t => 5000 * Math.pow(1.03, t) }], [], { xmin: 0, xmax: 30, ymin: 0, ymax: 13000, gstep: 5000, lstep: 5000, h: 180 })}` },
          { h: 'Decay (depreciation)', b: `<p>A car worth $20 000 loses 15% a year: after 3 years it is 20 000 × 0.85³ = <b>$12 282.50</b>.</p>`, check: { q: 'Multiplier for a 12% decrease each year?', opts: ['0.12', '1.12', '0.88', '0.988'], a: 2, why: '100% − 12% = 88%.' } }
        ],
        keys: ['Growth: × (1 + r/100) each period. Decay: × (1 − r/100).', 'Value after n periods: start × multiplierⁿ.', 'Knowledge of e is not required.'],
        gens: ['expGrowth'] },
      { id: 'n-surds', title: 'Surds', obj: ['1.18'], kw: 'simplifying surds rationalising the denominator',
        hook: 'Surds keep answers exact. √2 is exact; 1.414 is only close.',
        learn: [
          { h: 'Simplifying', b: `<p>Use √(ab) = √a × √b with a square number: √20 = √4 × √5 = <b>2√5</b>. √200 = 10√2.</p>`, check: { q: 'Simplify √48', opts: ['4√3', '3√4', '2√12', '16√3'], a: 0, why: '48 = 16 × 3, √16 = 4.' } },
          { h: 'Adding like surds', b: `<p>Only add surds with the same root: 3√2 + 5√2 = 8√2. √200 − √32 = 10√2 − 4√2 = <b>6√2</b>.</p>` },
          { h: 'Rationalising the denominator', b: `<p>Multiply top and bottom by the surd: ${fr(10, '√5')} = ${fr('10√5', 5)} = <b>2√5</b>.</p><p>With ${fr(1, '3 − √2')}, multiply by (3 + √2): the bottom becomes 9 − 2 = 7.</p>` }
        ],
        keys: ['√(ab) = √a√b: pull out square factors.', 'Only like surds add: 3√2 + 5√2 = 8√2.', 'Rationalise: multiply top and bottom by the root (or by a + √b for a − √b).'],
        gens: ['surdSimplify', 'surdAdd', 'rationalise'] }
    ]
  });
})();
