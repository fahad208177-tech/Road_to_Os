// Module 0: Foundations, for students starting from the very beginning.
(() => {
  const K = R2O.K, G = R2O.GEN, W = R2O.WIDGETS, { rnd, nz, pick, mcq, n, fr, frs } = K;

  // number -> words (international style: "ten thousand and seven")
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const under1000 = x => {
    const h = Math.floor(x / 100), r = x % 100; let s = '';
    if (h) s += ONES[h] + ' hundred';
    if (r) { s += (h ? ' and ' : '') + (r < 20 ? ONES[r] : TENS[Math.floor(r / 10)] + (r % 10 ? '-' + ONES[r % 10] : '')); }
    return s;
  };
  const words = x => {
    if (x === 0) return 'zero';
    const parts = []; const scales = [[1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']];
    let rest = x;
    for (const [v, name] of scales) if (rest >= v) { parts.push(under1000(Math.floor(rest / v)) + ' ' + name); rest %= v; }
    if (rest) parts.push((parts.length && rest < 100 ? 'and ' : '') + under1000(rest));
    return parts.join(' ');
  };
  K.words = words;

  G.pvDigit = () => {
    const len = rnd(4, 7); const digits = K.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, len);
    const num = +digits.join(''); const pos = rnd(0, len - 2); const d = digits[pos]; const val = d * Math.pow(10, len - 1 - pos);
    const names = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'];
    return { kind: 'num', q: `<p>In the number <b class="bigq">${n(num)}</b>, what is the <b>value</b> of the digit <b>${d}</b>?</p>`, a: val,
      hint: 'Count the columns from the right: ones, tens, hundreds, thousands…', steps: [`The ${d} is in the <b>${names[len - 1 - pos]}</b> column.`, `So it is worth ${d} × ${n(Math.pow(10, len - 1 - pos))} = <b>${n(val)}</b>.`] };
  };
  G.numWords = () => {
    const base = pick([[10007, [10070, 1007, 100007]], [6000000000, [600000000, 60000000000, 6000000]], [250040, [254000, 205040, 25040]], [1300009, [1309000, 130009, 1030009]], [70070, [77000, 7070, 700070]], [405016, [450016, 45016, 405160]]]);
    const askWords = Math.random() < .5;
    if (askWords) return { kind: 'mcq', q: `<p>Which number is <b>"${words(base[0])}"</b>?</p>`, a: n(base[0]), choices: mcq(n(base[0]), base[1].map(n)), steps: [`Split it into groups: ${words(base[0])}.`, `Write each group in its place-value columns: <b>${n(base[0])}</b>.`] };
    return { kind: 'mcq', q: `<p>How do you write <b class="bigq">${n(base[0])}</b> in words?</p>`, a: words(base[0]), choices: mcq(words(base[0]), base[1].map(words)), steps: [`Read it in groups of three digits from the left: <b>${words(base[0])}</b>.`] };
  };
  W.placeValue = el => {
    el.innerHTML = `<label class="field">Type any whole number<input class="inp" inputmode="numeric" value="4072519" maxlength="10"></label><div class="pv"></div><p class="pw muted"></p>`;
    const inp = el.querySelector('input'), out = el.querySelector('.pv'), pw = el.querySelector('.pw');
    const cols = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions', 'hundred millions', 'billions'];
    const draw = () => {
      const s = (inp.value.match(/\d/g) || ['0']).join('').replace(/^0+(?=\d)/, '').slice(0, 10);
      out.innerHTML = s.split('').map((d, i) => `<div class="pvc"><b>${d}</b><small>${cols[s.length - 1 - i]}</small><span>${n(+d * Math.pow(10, s.length - 1 - i))}</span></div>`).join('');
      pw.textContent = '“' + words(+s) + '”';
    };
    inp.oninput = draw; draw();
  };

  G.addSub = () => {
    const a = rnd(120, 9800), b = rnd(45, 4999), add = Math.random() < .55;
    const [x, y] = add ? [a, b] : [Math.max(a, b), Math.min(a, b)];
    const ans = add ? x + y : x - y;
    return { kind: 'num', q: `<p>Work out <b class="bigq">${n(x)} ${add ? '+' : '−'} ${n(y)}</b></p>`, a: ans, walk: { kind: add ? 'add' : 'sub', a: x, b: y },
      hint: add ? 'Line up the ones, tens, hundreds. Add each column from the right and carry when a column passes 9.' : 'Line up the columns. Subtract from the right; borrow 10 from the next column when you need to.',
      steps: [`Write ${n(y)} under ${n(x)} with the ones lined up.`, `${add ? 'Add' : 'Subtract'} column by column from the right.`, `Answer: <b>${n(ans)}</b>`] };
  };
  G.wordAddSub = () => {
    const ctx = pick([
      () => { const a = rnd(300, 900), b = rnd(120, 280); return { q: `A school has ${a} students. ${b} of them go on a trip. How many stay at school?`, a: a - b, s: `${a} − ${b} = ${a - b}` }; },
      () => { const a = rnd(1200, 3000), b = rnd(400, 1500); return { q: `A shop sells ${n(a)} bottles of water in June and ${n(b)} in July. How many bottles is that altogether?`, a: a + b, s: `${n(a)} + ${n(b)} = ${n(a + b)}` }; },
      () => { const a = rnd(50, 95), b = rnd(10, 40); return { q: `Priya has $${a}. She buys a bag for $${b}. How much money does she have left?`, a: a - b, s: `${a} − ${b} = ${a - b}`, u: 'dollars' }; }
    ])();
    return { kind: 'num', q: `<p>${ctx.q}</p>`, a: ctx.a, hint: '"Left", "stay", "difference" usually mean subtract. "Altogether", "total" mean add.', steps: [ctx.s] };
  };

  G.times = () => {
    const a = rnd(2, 12), b = rnd(2, 12), div = Math.random() < .35;
    return div ? { kind: 'num', q: `<p><b class="bigq">${a * b} ÷ ${a}</b> = ?</p>`, a: b, hint: `Which number times ${a} makes ${a * b}?`, steps: [`${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = <b>${b}</b>.`] }
      : { kind: 'num', q: `<p><b class="bigq">${a} × ${b}</b> = ?</p>`, a: a * b, hint: `Think of ${a} groups of ${b}.`, steps: [`${a} × ${b} = <b>${a * b}</b>`] };
  };
  G.longMult = () => {
    const a = rnd(12, 98), b = rnd(3, 46), p = a * b;
    const steps = b >= 10 ? [`Split ${b} into ${Math.floor(b / 10) * 10} + ${b % 10}.`, `${a} × ${Math.floor(b / 10) * 10} = ${a * Math.floor(b / 10) * 10}`, `${a} × ${b % 10} = ${a * (b % 10)}`, `Add: ${a * Math.floor(b / 10) * 10} + ${a * (b % 10)} = <b>${p}</b>`]
      : [`Split ${a} into ${Math.floor(a / 10) * 10} + ${a % 10}.`, `${Math.floor(a / 10) * 10} × ${b} = ${Math.floor(a / 10) * 10 * b}`, `${a % 10} × ${b} = ${(a % 10) * b}`, `Add: <b>${p}</b>`];
    return { kind: 'num', q: `<p>Work out <b class="bigq">${a} × ${b}</b></p>`, a: p, walk: b < 10 ? { kind: 'mul', a, b } : (a < 10 ? { kind: 'mul', a: b, b: a } : undefined), hint: 'Split one number into tens and ones, multiply each part, then add.', steps };
  };
  G.shareDiv = () => {
    const d = rnd(3, 9), qn = rnd(12, 120), t = d * qn;
    return { kind: 'num', q: `<p>${n(t)} sweets are shared equally between ${d} children. How many does each child get?</p>`, a: qn, walk: { kind: 'div', a: t, b: d }, hint: `Divide ${t} by ${d}. Short division: how many ${d}s go into each digit?`, steps: [`${n(t)} ÷ ${d} = <b>${qn}</b>`, `Check: ${qn} × ${d} = ${t} ✓`] };
  };

  G.negAdd = () => {
    const a = nz(-12, 12), b = nz(-12, 12), op = pick(['+', '−']); const ans = op === '+' ? a + b : a - b;
    const bs = b < 0 ? `(${n(b)})` : b;
    return { kind: 'num', q: `<p>Work out <b class="bigq">${n(a)} ${op} ${n(bs)}</b></p>`, a: ans,
      hint: 'On a number line: adding a positive moves right, adding a negative moves left. Subtracting a negative is the same as adding.',
      steps: [op === '−' && b < 0 ? `Subtracting a negative is adding: ${n(a)} + ${n(-b)}.` : `Start at ${n(a)} on the number line.`, `Answer: <b>${n(ans)}</b>`],
      after: K.numberLine(Math.min(a, ans, 0) - 1, Math.max(a, ans, 0) + 1, { step: Math.max(1, Math.ceil((Math.max(a, ans, 0) - Math.min(a, ans, 0) + 2) / 12)), jump: { from: a, to: ans } }) };
  };
  G.negMul = () => {
    const a = nz(-9, 9), b = nz(-9, 9), div = Math.random() < .4;
    if (div) return { kind: 'num', q: `<p>Work out <b class="bigq">${n(a * b)} ÷ ${b < 0 ? '(' + n(b) + ')' : b}</b></p>`, a: a, hint: 'Same signs give a positive answer; different signs give a negative answer.', steps: [`${Math.abs(a * b)} ÷ ${Math.abs(b)} = ${Math.abs(a)}`, `Signs: ${a * b < 0 ? '−' : '+'} ÷ ${b < 0 ? '−' : '+'} gives ${a < 0 ? '−' : '+'}, so <b>${n(a)}</b>`] };
    return { kind: 'num', q: `<p>Work out <b class="bigq">${n(a)} × ${b < 0 ? '(' + n(b) + ')' : b}</b></p>`, a: a * b, hint: 'Same signs give a positive answer; different signs give a negative answer.', steps: [`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}`, `Signs: ${a < 0 ? '−' : '+'} × ${b < 0 ? '−' : '+'} gives ${a * b < 0 ? '−' : '+'}, so <b>${n(a * b)}</b>`] };
  };
  G.tempChange = () => {
    const t1 = rnd(-15, 8), drop = rnd(3, 14), up = Math.random() < .5;
    const city = pick(['Moscow', 'Beijing', 'Toronto', 'Leh', 'Kabul', 'Ulaanbaatar']);
    return up ? { kind: 'num', q: `<p>At night the temperature in ${city} is ${n(t1 - drop)} °C. By noon it has risen by ${drop} °C. What is the temperature at noon?</p>`, a: t1, unit: '°C', hint: 'Rising means add.', steps: [`${n(t1 - drop)} + ${drop} = <b>${n(t1)}</b> °C`] }
      : { kind: 'num', q: `<p>At noon it is ${n(t1)} °C in ${city}. At midnight it is ${n(t1 - drop)} °C. By how many degrees did the temperature fall?</p>`, a: drop, unit: '°C', hint: 'Find the difference: noon temperature − midnight temperature.', steps: [`${n(t1)} − (${n(t1 - drop)}) = <b>${drop}</b> °C`] };
  };

  G.fracShade = () => {
    const d = pick([2, 3, 4, 5, 6, 8, 10]), k = rnd(1, d - 1);
    return { kind: 'frac', q: `<p>What fraction of this bar is shaded?</p>${K.fracBar(k, d)}`, a: k / d, show: frs(k, d), simplest: true, ph: 'e.g. 3/4',
      hint: 'Count the shaded parts (top number) and the total equal parts (bottom number), then simplify.', steps: [`${k} parts out of ${d} are shaded: ${fr(k, d)}`, K.gcd(k, d) > 1 ? `Simplify by dividing top and bottom by ${K.gcd(k, d)}: <b>${frs(k, d)}</b>` : `This is already in its simplest form.`] };
  };
  G.equivFrac = () => {
    const d = rnd(2, 9), k = rnd(1, d - 1), m = rnd(2, 6);
    return { kind: 'num', q: `<p>Fill in the missing number: <span class="bigq">${fr(k, d)} = ${fr('?', d * m)}</span></p>`, a: k * m, hint: `What did ${d} get multiplied by to make ${d * m}? Do the same to the top.`, steps: [`${d} × ${m} = ${d * m}`, `So the top is ${k} × ${m} = <b>${k * m}</b>`] };
  };
  G.fracOfAmount = () => {
    const d = pick([3, 4, 5, 6, 8]), k = rnd(1, d - 1), unit = rnd(2, 15), total = unit * d;
    return { kind: 'num', q: `<p>Find ${fr(k, d)} of ${total}.</p>`, a: unit * k, hint: `Split ${total} into ${d} equal parts first (one part = ${total} ÷ ${d}).`,
      steps: [`One part: ${total} ÷ ${d} = ${unit}`, `${k} parts: ${unit} × ${k} = <b>${unit * k}</b>`],
      after: K.barModel([{ label: n(total), parts: [{ n: k, text: `${k} × ${unit}`, color: 'var(--c1)' }, { n: d - k, color: 'var(--surface2)' }] }], { brace: { units: k, text: `${fr(k, d)} = ${unit * k}` } }) };
  };
  W.fracBar = el => {
    el.innerHTML = `<div class="sliders"><label>Top (shaded parts) <input type="range" min="0" max="12" value="3" class="sn"></label><label>Bottom (equal parts) <input type="range" min="1" max="12" value="4" class="sd"></label></div><div class="out"></div>`;
    const sn = el.querySelector('.sn'), sd = el.querySelector('.sd'), out = el.querySelector('.out');
    const draw = () => {
      let a = +sn.value, b = +sd.value; if (a > b) { sn.value = b; a = b; }
      const g = K.gcd(a, b) || 1;
      out.innerHTML = `<p class="bigq center">${fr(a, b)} ${g > 1 ? `= ${fr(a / g, b / g)}` : ''} = ${n(K.round(a / b, 3))} = ${n(K.round(a / b * 100, 1))}%</p>${K.fracBar(a, b)}${g > 1 ? K.fracBar(a / g, b / g, 'var(--c2)') + '<p class="muted center small">Same amount shaded: equivalent fractions</p>' : ''}`;
    };
    sn.oninput = sd.oninput = draw; draw();
  };

  G.decValue = () => {
    const ip = rnd(1, 99), dps = [rnd(1, 9), rnd(1, 9), rnd(1, 9)]; const num = ip + dps[0] / 10 + dps[1] / 100 + dps[2] / 1000;
    const pos = rnd(0, 2); const d = dps[pos]; const names = ['tenths', 'hundredths', 'thousandths'];
    const correct = fr(d, [10, 100, 1000][pos]);
    return { kind: 'mcq', q: `<p>In <b class="bigq">${num.toFixed(3)}</b>, what is the value of the digit in the <b>${names[pos]}</b> column?</p>`, a: correct,
      choices: mcq(correct, [fr(d, 10), fr(d, 100), fr(d, 1000), String(d), String(d * 10)].filter(x => x !== correct)), steps: [`After the decimal point the columns are tenths, hundredths, thousandths.`, `The ${names[pos]} digit is ${d}, worth <b>${correct}</b>.`] };
  };
  G.decAddSub = () => {
    const a = rnd(10, 999) / 100, b = rnd(10, 999) / 10, add = Math.random() < .6;
    const [x, y] = add ? [a, b] : [Math.max(a, b), Math.min(a, b)];
    const ans = K.round(add ? x + y : x - y, 2);
    return { kind: 'num', q: `<p>Work out <b class="bigq">${n(x)} ${add ? '+' : '−'} ${n(y)}</b></p>`, a: ans, hint: 'Line up the decimal points. Fill gaps with zeros, e.g. 4.5 = 4.50.', steps: [`Line up the decimal points: ${x.toFixed(2)} ${add ? '+' : '−'} ${y.toFixed(2)}`, `Answer: <b>${n(ans)}</b>`] };
  };
  G.decTimes10 = () => {
    const x = rnd(11, 9999) / pick([10, 100, 1000]), p = pick([10, 100, 1000]), mul = Math.random() < .5;
    const ans = K.round(mul ? x * p : x / p, 6);
    return { kind: 'num', q: `<p>Work out <b class="bigq">${n(x)} ${mul ? '×' : '÷'} ${n(p)}</b></p>`, a: ans, hint: `${mul ? 'Multiplying' : 'Dividing'} by ${p} moves every digit ${Math.log10(p)} place${p > 10 ? 's' : ''} to the ${mul ? 'left (the number gets bigger)' : 'right (the number gets smaller)'}.`, steps: [`Move the digits ${Math.log10(p)} place${p > 10 ? 's' : ''}: <b>${n(ans)}</b>`] };
  };

  R2O.addModule({
    id: 'found', name: 'Foundations', icon: '🧱', color: '#0d9488', blurb: 'Start here if maths feels shaky. Numbers, the four operations, negatives, fractions and decimals.',
    book: ['Prealgebra 2e', 'https://openstax.org/details/books/prealgebra-2e'],
    lessons: [
      { id: 'f-place', title: 'Place value and big numbers', icon: '🔢', foundation: true, obj: ['1.1'], kw: 'place value', widget: 'placeValue',
        hook: 'Every number is built from just ten digits, 0 to 9. Where a digit sits decides what it is worth.',
        learn: [
          { h: 'Columns give digits their value', b: `<p>In <b>3 405</b> the 3 is not worth 3. It sits in the <b>thousands</b> column, so it is worth 3 000.</p><div class="pvt"><span>Th</span><span>H</span><span>T</span><span>O</span><b>3</b><b>4</b><b>0</b><b>5</b></div><p>Each column is worth <b>10 times</b> the column to its right.</p>`,
            check: { q: 'In 5 721, what is the 7 worth?', opts: ['7', '70', '700', '7 000'], a: 2, why: 'The 7 is in the hundreds column: 700.' } },
          { h: 'Zero holds a place', b: `<p>The 0 in 3 405 means "no tens". Without it, 3 405 would become 345, a very different number.</p>` },
          { h: 'Reading big numbers', b: `<p>Split the digits into groups of three from the right: <b>6 000 000 000</b> = six <b>billion</b>; <b>10 007</b> = ten thousand <b>and</b> seven.</p><p class="muted">The exam can ask you to convert between numbers and words.</p>` }
        ],
        keys: ['Each column is worth 10 times the one to its right.', 'Zero is a placeholder.', 'Read big numbers in groups of three digits: thousands, millions, billions.'],
        gens: ['pvDigit', 'numWords'] },
      { id: 'f-addsub', title: 'Adding and subtracting', icon: '➕', foundation: true, obj: ['1.6'], kw: 'column addition subtraction',
        hook: 'Putting things together and taking things away. You already do this every day!',
        learn: [
          { h: 'Line up the columns', b: `<p>Write the numbers with the <b>ones under ones</b>, tens under tens.</p><pre class="col">  1 4 7 8\n+   9 6 5\n─────────\n  2 4 4 3</pre><p>8 + 5 = 13: write 3, <b>carry</b> 1 to the tens.</p>` },
          { h: 'Subtracting with exchange', b: `<p>If the top digit is smaller, <b>exchange</b> (borrow) 10 from the next column. 52 − 17: 2 − 7 is impossible, so make it 12 − 7 = 5 and 4 − 1 = 3: <b>35</b>.</p>`,
            check: { q: '83 − 46 = ?', opts: ['37', '43', '47', '33'], a: 0, why: '13 − 6 = 7, then 7 − 4 = 3: 37.' } },
          { h: 'Check with the opposite', b: `<p>Adding and subtracting undo each other. Check 52 − 17 = 35 with 35 + 17 = 52 ✓</p>` }
        ],
        keys: ['Line up ones under ones.', 'Carry when a column adds to 10 or more.', 'Exchange 10 from the next column when subtracting a bigger digit.', 'Check by doing the opposite operation.'],
        gens: ['addSub', 'wordAddSub'] },
      { id: 'f-muldiv', title: 'Multiplying and dividing', icon: '✖️', foundation: true, obj: ['1.6'], kw: 'multiplication division times tables',
        hook: 'Multiplying is a fast way to count equal groups. Dividing is sharing fairly.',
        learn: [
          { h: 'Times tables are facts to own', b: `<p>Aim to know every fact up to 12 × 12 instantly. Tricks: × 9 digits add to 9 (9 × 7 = <b>63</b>, 6 + 3 = 9); × 5 is half of × 10.</p>` },
          { h: 'Bigger multiplications: split them', b: `<p>34 × 6 = (30 × 6) + (4 × 6) = 180 + 24 = <b>204</b>.</p><p>This is the <b>grid method</b>: split into tens and ones, multiply the parts, add.</p>`,
            check: { q: '23 × 4 = ?', opts: ['82', '92', '96', '86'], a: 1, why: '20 × 4 = 80 and 3 × 4 = 12, so 92.' } },
          { h: 'Division is sharing equally', b: `<p>84 ÷ 7 asks "how many 7s make 84?" Since 7 × 12 = 84, the answer is <b>12</b>. Division undoes multiplication.</p>` }
        ],
        keys: ['Learn times tables to 12 × 12.', 'Split bigger numbers into tens and ones.', 'Division undoes multiplication: check with ×.'],
        gens: ['times', 'longMult', 'shareDiv'] },
      { id: 'f-neg', title: 'Negative numbers', icon: '🌡️', foundation: true, obj: ['1.6', '1.1'], kw: 'negative numbers',
        hook: 'Temperatures below zero, bank overdrafts, floors below ground: negative numbers are everywhere.',
        learn: [
          { h: 'The number line', b: `${K.numberLine(-6, 6, { marks: [{ x: -4, label: '−4' }, { x: 3, label: '3' }] })}<p>Numbers to the <b>left</b> are smaller: −4 &lt; 3, and −6 &lt; −2.</p>` },
          { h: 'Adding and subtracting', b: `<p>Adding a positive moves <b>right</b>; adding a negative moves <b>left</b>.</p><p>Two minus signs side by side make a plus: 5 − (−3) = 5 + 3 = <b>8</b>.</p>`,
            check: { q: '−2 − 5 = ?', opts: ['3', '−3', '−7', '7'], a: 2, why: 'Start at −2 and move 5 left: −7.' } },
          { h: 'Multiplying and dividing', b: `<p><b>Same signs → positive</b>, <b>different signs → negative</b>.</p><p>(−4) × (−3) = 12 &nbsp;·&nbsp; (−12) ÷ 4 = −3</p>` }
        ],
        keys: ['Left on the number line is smaller.', 'Subtracting a negative = adding.', 'Same signs give +, different signs give −.'],
        gens: ['negAdd', 'negMul', 'tempChange'] },
      { id: 'f-frac', title: 'Fractions: first steps', icon: '🍕', foundation: true, sg: true, obj: ['1.4'], kw: 'fractions', widget: 'fracBar',
        hook: 'A fraction is a part of a whole. Singapore students learn fractions with bar models: draw it and you can see the answer.',
        learn: [
          { h: 'Top and bottom', b: `${K.fracBar(3, 4)}<p>${fr(3, 4)}: the <b>bottom</b> number (denominator) says how many <b>equal parts</b>; the <b>top</b> (numerator) says how many we take.</p>` },
          { h: 'Equivalent fractions', b: `<p>${fr(1, 2)} = ${fr(2, 4)} = ${fr(4, 8)}: the same amount, cut into more pieces. Multiply or divide top <b>and</b> bottom by the same number.</p><p><b>Simplest form</b>: divide top and bottom by their highest common factor: ${fr(6, 8)} = ${fr(3, 4)}.</p>`,
            check: { q: `Which is equal to ${fr(2, 3)}?`, opts: [fr(4, 5), fr(4, 6), fr(3, 4), fr(2, 6)], a: 1, why: 'Multiply top and bottom by 2.' } },
          { h: 'Fraction of an amount: bar model', b: `<p>Find ${fr(3, 5)} of 40. Draw a bar for 40 and cut it into 5 equal units.</p>${K.barModel([{ label: '40', parts: [{ n: 3, text: '3 units', color: 'var(--c1)' }, { n: 2, color: 'var(--surface2)' }] }], { brace: { units: 3, text: '?' } })}<p>1 unit = 40 ÷ 5 = 8, so 3 units = <b>24</b>.</p>` }
        ],
        keys: ['Denominator = number of equal parts; numerator = parts taken.', 'Equivalent fractions: multiply or divide top and bottom by the same number.', 'Fraction of an amount: divide by the bottom, multiply by the top.'],
        gens: ['fracShade', 'equivFrac', 'fracOfAmount'] },
      { id: 'f-dec', title: 'Decimals: first steps', icon: '🔹', foundation: true, obj: ['1.4', '1.6'], kw: 'decimals place value',
        hook: 'Money, measurements and calculator answers are all decimals.',
        learn: [
          { h: 'Columns after the point', b: `<div class="pvt"><span>O</span><span>.</span><span>t</span><span>h</span><b>2</b><b>.</b><b>4</b><b>7</b></div><p>2.47 = 2 ones + 4 <b>tenths</b> + 7 <b>hundredths</b>.</p>` },
          { h: 'Adding and subtracting', b: `<p>Line up the <b>decimal points</b>. 3.5 + 1.25: write 3.50 + 1.25 = <b>4.75</b>.</p>`,
            check: { q: '0.6 + 0.45 = ?', opts: ['0.51', '1.05', '0.105', '1.5'], a: 1, why: '0.60 + 0.45 = 1.05.' } },
          { h: '× and ÷ by 10, 100, 1000', b: `<p>× 10 moves digits one place <b>left</b> (bigger): 3.6 × 100 = <b>360</b>.</p><p>÷ 10 moves digits one place <b>right</b> (smaller): 45 ÷ 1000 = <b>0.045</b>.</p>` }
        ],
        keys: ['After the point: tenths, hundredths, thousandths.', 'Line up decimal points to add or subtract.', '× 10 moves digits left; ÷ 10 moves digits right.'],
        gens: ['decValue', 'decAddSub', 'decTimes10'] }
    ]
  });
})();
