// Picture-first lessons (concrete → pictorial → abstract) and easy picture questions
// that start each practice session. Loaded after the modules; attaches to lessons by id.
(() => {
  const K = R2O.K, G = R2O.GEN, { rnd, pick, n, fr, frs } = K, obs = K.objs;
  const L = (id, scenes, easy) => { const l = R2O.lesson(id); if (!l) throw new Error('no lesson ' + id); l.scenes = scenes; if (easy) l.easy = easy; };
  const FRUIT = ['🍎', '🍊', '🍓', '🍌', '🥭', '🍇', '🍐', '🥥'];
  const SWEET = ['🍬', '🍪', '🧁', '🍩', '🥟', '⚽', '🖍️', '🪙'];
  const group = (k, e) => `<div class="groups"><div class="grp">${obs(k, e)}</div></div>`;

  // ---------- static pictures ----------
  const pizzaPic = (k, d) => {
    let s = `<svg class="viz pizza" viewBox="0 0 220 220">`;
    for (let i = 0; i < d; i++) { const a0 = -Math.PI / 2 + i * 2 * Math.PI / d, a1 = a0 + 2 * Math.PI / d, P = a => [110 + 95 * Math.cos(a), 110 + 95 * Math.sin(a)]; s += `<path d="M110 110 L${P(a0)} A95 95 0 0 1 ${P(a1)} Z" class="slice2 ${i < k ? 'on' : ''}"/>`; }
    return s + '</svg>';
  };
  const gridPic = k => `<div class="g100 still">${Array.from({ length: 100 }, (_, i) => `<i class="${i < k ? 'on' : ''}"></i>`).join('')}</div>`;
  const balancePic = (a, b, c) => `<div class="scale"><div class="pans"><div class="pan l"><div class="items">${'<span class="bag">x</span>'.repeat(a)}${'<span class="blk"></span>'.repeat(b)}</div></div><div class="eq">=</div><div class="pan r"><div class="items">${'<span class="blk"></span>'.repeat(c)}</div></div></div></div><div class="beam">⚖️</div>`;
  const towersPic = t => `<div class="towers">${t.map(h => `<div class="tw2"><div class="stack" style="height:${h * 18}px"></div><b>${h}</b></div>`).join('')}</div>`;
  const bagPic = balls => `<div class="bagbox"><div class="bagpic">👜</div><div class="inbag">${balls.map(([e, k]) => obs(k, e)).join('')}</div></div>`;
  const sticks = k => { // matchstick squares in a row
    let s = `<svg class="viz" viewBox="0 0 ${k * 44 + 20} 64">`;
    for (let i = 0; i < k; i++) { const x = 10 + i * 44; s += `<line x1="${x}" y1="10" x2="${x + 44}" y2="10" class="stick"/><line x1="${x}" y1="54" x2="${x + 44}" y2="54" class="stick"/>${i === 0 ? `<line x1="${x}" y1="10" x2="${x}" y2="54" class="stick"/>` : ''}<line x1="${x + 44}" y1="10" x2="${x + 44}" y2="54" class="stick"/>`; }
    return s + '</svg>';
  };
  const cubes = (k, label) => `<div class="cubes">${Array.from({ length: k }, () => '<span class="cube"></span>').join('')}</div><p class="center small">${label || ''}</p>`;
  const pythSquares = (a, b) => {
    const u = 14, ox = 150, oy = 170; // right angle at (ox, oy); legs go left (b) and up (a)
    const cells = (x, y, w, h, col) => { let s = ''; for (let i = 0; i < w / u; i++) for (let j = 0; j < h / u; j++) s += `<rect x="${x + i * u}" y="${y + j * u}" width="${u}" height="${u}" fill="${col}" fill-opacity=".35" stroke="${col}"/>`; return s; };
    let s = `<svg class="viz" viewBox="0 0 330 260">`;
    s += cells(ox - b * u, oy, b * u, b * u, 'var(--c2)') + cells(ox, oy - a * u, a * u, a * u, 'var(--c1)');
    const P1 = [ox - b * u, oy], P2 = [ox, oy - a * u]; const dx = P2[0] - P1[0], dy = P2[1] - P1[1];
    s += `<polygon points="${P1} ${P2} ${P2[0] - dy},${P2[1] + dx} ${P1[0] - dy},${P1[1] + dx}" fill="var(--c4)" fill-opacity=".25" stroke="var(--c4)" stroke-width="2" transform="rotate(180 ${(P1[0] + P2[0]) / 2} ${(P1[1] + P2[1]) / 2})"/>`;
    s += `<polygon points="${P1} ${P2} ${ox},${oy}" class="shape"/>`;
    s += `<text x="${ox - b * u / 2}" y="${oy + b * u / 2 + 5}" text-anchor="middle" class="lbl">${b}² = ${b * b}</text><text x="${ox + a * u / 2}" y="${oy - a * u / 2 + 5}" text-anchor="middle" class="lbl">${a}² = ${a * a}</text>`;
    return s + '</svg>';
  };
  const tree = rows => `<div class="ftree">${rows.map(r => `<div class="frow">${r.map(c => `<span class="${/^\d+$/.test(c) && K.isPrime(+c) ? 'prime' : ''}">${c}</span>`).join('')}</div>`).join('')}</div>`;
  K.pizzaPic = pizzaPic; K.gridPic = gridPic;

  // ---------- easy picture questions ----------
  G.picAdd = () => { const a = rnd(1, 6), b = rnd(1, 6), e = pick(FRUIT); return { kind: 'num', q: `<p>How many ${e} altogether?</p><div class="groups"><div class="grp">${obs(a, e)}</div><div class="plus">+</div><div class="grp">${obs(b, e)}</div></div>`, a: a + b, hint: 'Count the first group, then keep counting on through the second group.', steps: [`${a} + ${b}`, group(a + b, e), `= <b>${a + b}</b>`] }; };
  G.picTake = () => { const nn = rnd(4, 10), k = rnd(1, nn - 1), e = pick(SWEET); return { kind: 'num', q: `<p>There were ${nn} ${e}. ${k} were eaten (crossed out). How many are left?</p><div class="groups"><div class="grp">${obs(nn - k, e)}${obs(k, e, 'gone still')}</div></div>`, a: nn - k, hint: 'Count only the ones that are not crossed out.', steps: [`${nn} − ${k} = <b>${nn - k}</b>`] }; };
  G.picArray = () => { const r = rnd(2, 5), c = rnd(2, 6), e = pick(SWEET); return { kind: 'num', q: `<p>How many ${e} are there?</p>${K.dots(r, c, e)}`, a: r * c, hint: `Count one row (${c}), then count in ${c}s for each row.`, steps: [`${r} rows of ${c}`, `${r} × ${c} = <b>${r * c}</b>`] }; };
  G.picShare = () => { const k = rnd(2, 5), q = rnd(2, 6), e = pick(SWEET); return { kind: 'num', q: `<p>${k * q} ${e} are shared equally onto ${k} plates. How many on each plate?</p>${group(k * q, e)}<p class="center">${'🍽️ '.repeat(k)}</p>`, a: q, hint: `Deal them out one at a time to each of the ${k} plates.`, steps: [`<div class="plates">${Array.from({ length: k }, () => `<div class="plate"><div class="on">${obs(q, e)}</div></div>`).join('')}</div>`, `${k * q} ÷ ${k} = <b>${q}</b>`] }; };
  G.picBlocks = () => { const h = rnd(0, 3), t = rnd(0, 9), o = rnd(1, 9); return { kind: 'num', q: `<p>What number do these blocks show?</p>${K.blocks(h, t, o)}`, a: h * 100 + t * 10 + o, hint: 'Big squares are hundreds, long sticks are tens, small cubes are ones.', steps: [`${h} hundreds + ${t} tens + ${o} ones`, `= <b>${h * 100 + t * 10 + o}</b>`] }; };
  G.picHop = () => { const s = rnd(-5, 5), j = K.nz(-6, 6); return { kind: 'num', q: `<p>The frog starts at <b>${n(s)}</b> and jumps ${j > 0 ? 'right' : 'left'} ${Math.abs(j)}. Where does it land?</p>${K.numberLine(-10, 10, { step: 2, marks: [{ x: s, label: '🐸' }] })}`, a: s + j, hint: 'Right means add, left means subtract. Count the jumps one at a time.', steps: [K.numberLine(-10, 10, { step: 2, marks: [{ x: s + j, label: '🐸' }], jump: { from: s, to: s + j } }), `${n(s)} ${j > 0 ? '+' : '−'} ${Math.abs(j)} = <b>${n(s + j)}</b>`] }; };
  G.picPizza = () => { const d = pick([2, 3, 4, 6, 8]), k = rnd(1, d - 1); return { kind: 'frac', q: `<p>What fraction of the pizza is shaded?</p>${pizzaPic(k, d)}`, a: k / d, show: frs(k, d), ph: 'e.g. 3/8', hint: 'Shaded slices on top, total slices on the bottom.', steps: [`${k} shaded out of ${d} slices: ${fr(k, d)}`] }; };
  G.picFracAmount = () => { const d = pick([2, 3, 4, 5]), k = rnd(1, d - 1), u = rnd(2, 6), e = pick(FRUIT); return { kind: 'num', q: `<p>What is ${fr(k, d)} of these ${d * u} ${e}?</p>${K.dots(d, u, e)}<p class="muted small center">Each row is ${fr(1, d)} of them.</p>`, a: k * u, hint: `There are ${d} equal rows. Take ${k} of them.`, steps: [`One row = ${fr(1, d)} = ${u}`, `${k} rows = <b>${k * u}</b>`] }; };
  G.picGrid = () => { const k = rnd(3, 97); const ask = pick(['%', 'dec']); return ask === '%' ? { kind: 'num', q: `<p>What percentage of the grid is shaded?</p>${gridPic(k)}`, a: k, unit: '%', hint: 'The grid has 100 squares. Per cent means "out of 100".', steps: [`${k} out of 100 = <b>${k}%</b>`] } : { kind: 'num', q: `<p>Write the shaded part as a <b>decimal</b>.</p>${gridPic(k)}`, a: k / 100, hint: 'Each small square is one hundredth: 0.01.', steps: [`${k} hundredths = <b>${n(k / 100)}</b>`] }; };
  G.picBalance = () => { const a = rnd(1, 3), x = rnd(1, 4), b = rnd(0, 4); const c = a * x + b; return { kind: 'num', q: `<p>The scale balances. Each bag holds the same number of blocks. How many blocks are in one bag?</p>${balancePic(a, b, c)}`, a: x, ph: 'x = ', hint: 'Take the same number of loose blocks off both sides, then share between the bags.', steps: [`${a > 1 ? a : ''}x + ${b} = ${c}`, b ? `Take ${b} off both sides: ${a > 1 ? a : ''}x = ${c - b}` : '', a > 1 ? `Share between ${a} bags: x = <b>${x}</b>` : `x = <b>${x}</b>`].filter(Boolean) }; };
  G.picRatio = () => { const p = rnd(1, 4), q = rnd(1, 4), u = rnd(2, 8); return { kind: 'num', q: `<p>Red and blue beads are in the ratio ${p} : ${q}. There are <b>${(p + q) * u}</b> beads altogether. How many are <b>red</b>?</p>${K.barModel([{ label: 'Red', parts: [{ n: p, color: 'var(--c4)' }] }, { label: 'Blue', parts: [{ n: q, color: 'var(--c5)' }] }])}`, a: p * u, hint: `${p + q} boxes altogether. Find what one box is worth first.`, steps: [`${p + q} boxes = ${(p + q) * u}`, `1 box = ${u}`, `Red = ${p} × ${u} = <b>${p * u}</b>`] }; };
  G.picMean = () => { const k = rnd(3, 5), m = rnd(2, 6); let t = Array(k).fill(m); for (let i = 0; i < 4; i++) { const a = rnd(0, k - 1), b = rnd(0, k - 1); if (t[a] > 1) { t[a]--; t[b]++; } } return { kind: 'num', q: `<p>If you shared these blocks out so every tower was the same height, how tall would each tower be?</p>${towersPic(t)}`, a: m, hint: 'Add up all the blocks, then share them between the towers.', steps: [`Total: ${t.join(' + ')} = ${k * m}`, `${k * m} ÷ ${k} = <b>${m}</b> (the mean)`] }; };
  G.picBag = () => { const r = rnd(1, 5), b = rnd(1, 5), g = rnd(0, 3); const t = r + b + g; return { kind: 'frac', q: `<p>You pick one ball without looking. What is the probability it is 🔴?</p>${bagPic([['🔴', r], ['🔵', b], ['🟢', g]])}`, a: r / t, show: frs(r, t), ph: 'e.g. 2/7', hint: 'Red balls on top, all the balls on the bottom.', steps: [`${r} red out of ${t} balls: <b>${frs(r, t)}</b>`] }; };
  G.picSquares = () => { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]); return { kind: 'num', q: `<p>The two smaller squares have areas <b>${t[0] * t[0]}</b> and <b>${t[1] * t[1]}</b>. What is the area of the biggest square?</p>${pythSquares(Math.min(t[0], 8), Math.min(t[1], 8))}`, a: t[2] * t[2], hint: 'The two small squares together make the big one.', steps: [`${t[0] * t[0]} + ${t[1] * t[1]} = <b>${t[2] * t[2]}</b>`, `So the long side is √${t[2] * t[2]} = ${t[2]}`] }; };
  G.picSticks = () => { const k = rnd(4, 9); return { kind: 'num', q: `<p>1 square uses 4 matchsticks, 2 squares use 7, 3 squares use 10.</p>${sticks(3)}<p>How many matchsticks for <b>${k} squares</b>?</p>`, a: 3 * k + 1, hint: 'Each new square needs 3 more sticks.', steps: [`4, 7, 10, … goes up by 3: 3n + 1`, `3 × ${k} + 1 = <b>${3 * k + 1}</b>`] }; };
  G.picArea = () => { const w = rnd(2, 7), h = rnd(2, 5); return { kind: 'num', q: `<p>Each small square is 1 cm². What is the area of the rectangle?</p>${K.dots(h, w, '🟩')}`, a: w * h, unit: 'cm²', hint: `Count one row (${w} squares), then times by the number of rows.`, steps: [`${h} rows of ${w}`, `${h} × ${w} = <b>${w * h} cm²</b>`] }; };
  G.picBags = () => { const x = rnd(2, 8), a = rnd(2, 4), b = rnd(1, 5); return { kind: 'num', q: `<p>Each 🎒 holds <b>x</b> sweets. Here are ${a} bags and ${b} loose sweets: <b>${a}x + ${b}</b>.</p><p class="center bigq">${'🎒'.repeat(a)} ${'🍬'.repeat(b)}</p><p>If x = ${x}, how many sweets are there?</p>`, a: a * x + b, hint: `Put ${x} sweets in every bag, then add the loose ones.`, steps: [`${a} × ${x} + ${b}`, `= <b>${a * x + b}</b>`] }; };

  // ========== FOUNDATIONS ==========
  L('f-place', [
    { say: "Hi! I'm your guide 🦉. Let's count some pencils. Counting one by one is slow… so let's be clever.", anim: { type: 'bundle', n: 23, e: '✏️' } },
    { say: 'Bundles of ten make big numbers easy to see.', ask: { q: 'In 23, how many <b>tens</b> are there?', opts: ['2', '3', '20', '23'], a: 0, why: '23 is 2 tens and 3 ones.' } },
    { say: 'Mathematicians draw them as blocks: a <b>cube</b> is 1, a <b>stick</b> is 10, a <b>flat square</b> is 100.', pic: K.blocks(2, 4, 5) + '<p class="center">2 hundreds, 4 tens and 5 ones = <b>245</b></p>' },
    { say: 'Your turn!', pic: K.blocks(1, 3, 4), ask: { q: 'What number is this?', opts: ['134', '143', '1 034', '8'], a: 0, why: '1 hundred + 3 tens + 4 ones.' } },
    { say: 'What if there are no tens? We write a <b>0</b> to hold the place.', pic: K.blocks(3, 0, 5) + '<p class="center">3 hundreds, <b>0 tens</b>, 5 ones = <b>305</b>, not 35!</p>' },
    { say: 'Each column is worth <b>10 times</b> the one on its right.', pic: `<div class="pvt"><span>Th</span><span>H</span><span>T</span><span>O</span><b>4</b><b>7</b><b>3</b><b>0</b></div>`, ask: { q: 'In 4 730, what is the 7 worth?', opts: ['7', '70', '700', '7 000'], a: 2, why: 'It sits in the hundreds column.' } },
    { say: 'Big numbers are read in groups of three digits.', pic: `<p class="bigq center">6 000 000 000</p><p class="center">six <b>billion</b></p><p class="bigq center">10 007</p><p class="center">ten thousand <b>and</b> seven</p>` }
  ], ['picBlocks']);

  L('f-addsub', [
    { say: 'Here are 3 apples… and 3 more apples.', anim: { type: 'join', a: 3, b: 3, e: '🍎' }, ask: { q: 'How many apples now?', opts: ['5', '6', '7', '33'], a: 1, why: '3 + 3 = 6' } },
    { say: 'Adding means <b>putting together</b>. Try oranges!', anim: { type: 'join', a: 4, b: 5, e: '🍊' }, ask: { q: '4 + 5 = ?', opts: ['8', '9', '10', '45'], a: 1 } },
    { say: 'You can also <b>count on</b>: start at the bigger number and count up.', anim: { type: 'hop', min: 0, max: 12, start: 7, jumps: [1, 1, 1, 1], label: 'Count on 4' }, ask: { q: '7 + 4 = ?', opts: ['10', '11', '12', '74'], a: 1 } },
    { say: 'Bigger numbers? Add the <b>tens</b> together and the <b>ones</b> together.', anim: { type: 'reveal', stages: [`<p class="center bigq">24 + 13</p>${K.blocks(0, 2, 4)}<p class="center">+</p>${K.blocks(0, 1, 3)}`, `<p class="center">Tens: 2 + 1 = 3 &nbsp;·&nbsp; Ones: 4 + 3 = 7</p>${K.blocks(0, 3, 7)}<p class="center bigq">= 37</p>`] } },
    { say: 'When the ones make 10 or more, bundle 10 ones into a new ten. That is <b>carrying</b>.', anim: { type: 'reveal', stages: [`<p class="center bigq">18 + 7</p>${K.blocks(0, 1, 8)}<p class="center">+</p>${K.blocks(0, 0, 7)}`, `<p class="center">Ones: 8 + 7 = 15 ones. That's too many!</p>${K.blocks(0, 1, 15)}`, `<p class="center">Bundle 10 ones into 1 ten: 2 tens and 5 ones</p>${K.blocks(0, 2, 5)}<p class="center bigq">= 25</p>`] } },
    { say: 'On paper, that bundling is called <b>"carrying"</b>. Let\'s watch 38 + 45 one tiny step at a time. Tap <b>Next step</b>.', anim: { type: 'columns', kind: 'add', a: 38, b: 45 } },
    { say: 'This one carries <b>twice</b>! Step through it, then answer.', anim: { type: 'columns', kind: 'add', a: 476, b: 358 }, ask: { q: '476 + 358 = ?', opts: ['834', '724', '824', '7214'], a: 0, why: '6 + 8 = 14, 7 + 5 + 1 = 13, 4 + 3 + 1 = 8.' } },
    { say: 'Taking away means <b>removing</b>. There are 8 cupcakes…', anim: { type: 'remove', n: 8, k: 3, e: '🧁', label: 'Eat 3 of them' }, ask: { q: '8 − 3 = ?', opts: ['4', '5', '6', '11'], a: 1 } },
    { say: 'For bigger take-aways, hop <b>backwards</b> on a number line: first the tens, then the ones.', anim: { type: 'hop', min: 30, max: 54, step: 2, start: 52, jumps: [-10, -7], label: 'Take away 17' }, ask: { q: '52 − 17 = ?', opts: ['35', '45', '39', '25'], a: 0 } },
    { say: 'On paper, taking away sometimes needs <b>borrowing</b>. It\'s the opposite of carrying: we break 1 ten into 10 ones. Watch 52 − 17.', anim: { type: 'columns', kind: 'sub', a: 52, b: 17 } },
    { say: 'The trickiest kind: borrowing when the next column is <b>0</b>. Go slowly, one step at a time.', anim: { type: 'columns', kind: 'sub', a: 503, b: 127 }, ask: { q: '503 − 127 = ?', opts: ['376', '486', '424', '384'], a: 0, why: 'Check: 376 + 127 = 503 ✓' } }
  ], ['picAdd', 'picTake']);

  L('f-muldiv', [
    { say: 'A baker puts cookies in rows. Watch!', anim: { type: 'array', r: 3, c: 4, e: '🍪' }, ask: { q: '3 rows of 4 cookies. How many cookies?', opts: ['7', '12', '34', '10'], a: 1, why: '4 + 4 + 4 = 12, so 3 × 4 = 12.' } },
    { say: '<b>Multiplying</b> is a quick way to add equal groups. 3 × 4 means "3 groups of 4".', pic: K.dots(4, 3, '🍪') + '<p class="center">Turn it sideways: 4 rows of 3 is <b>still 12</b>!</p>', ask: { q: 'So 4 × 3 = 3 × 4?', opts: ['Yes', 'No'], a: 0, why: 'The order does not matter when you multiply.' } },
    { say: 'Now <b>sharing</b>. 12 sweets, 3 friends, everyone gets the same.', anim: { type: 'share', n: 12, k: 3, e: '🍬' }, ask: { q: '12 ÷ 3 = ?', opts: ['3', '4', '9', '36'], a: 1, why: 'Each plate got 4.' } },
    { say: 'Dividing <b>undoes</b> multiplying. 3 × 4 = 12, so 12 ÷ 3 = 4.', ask: { q: '5 × 6 = 30. So 30 ÷ 5 = ?', opts: ['5', '6', '25', '150'], a: 1 } },
    { say: 'Sharing big numbers on paper uses <b>short division</b> (the "bus stop"). Unlike adding, we start on the <b>left</b>. Watch 156 ÷ 4.', anim: { type: 'columns', kind: 'div', a: 156, b: 4 }, ask: { q: '156 ÷ 4 = ?', opts: ['39', '41', '34', '29'], a: 0, why: 'Check: 39 × 4 = 156 ✓' } },
    { say: 'Multiplying on paper also uses carrying. Watch 47 × 6.', anim: { type: 'columns', kind: 'mul', a: 47, b: 6 }, ask: { q: '47 × 6 = ?', opts: ['242', '282', '2442', '272'], a: 1, why: '6 × 7 = 42 (write 2, carry 4); 6 × 4 = 24, + 4 = 28.' } },
    { say: 'Another way to see big multiplications: cut them into easy pieces. 23 × 4:', anim: { type: 'reveal', stages: [K.area([[20, '20'], [3, '3']], [[4, '4']]), K.area([[20, '20'], [3, '3']], [[4, '4']], { cells: [['80', '12']] }) + '<p class="center bigq">80 + 12 = 92</p>'] }, ask: { q: '23 × 4 = ?', opts: ['82', '92', '96', '27'], a: 1 } }
  ], ['picArray', 'picShare']);

  L('f-neg', [
    { say: 'It\'s 3 °C on a winter morning. Then it gets 5 degrees colder…', anim: { type: 'thermo', start: 3, change: -5, label: 'Get 5 degrees colder' }, ask: { q: 'What is the temperature now?', opts: ['2 °C', '−2 °C', '−8 °C', '8 °C'], a: 1, why: 'It went below zero: −2 °C.' } },
    { say: 'Numbers below zero are <b>negative</b>. On a number line they live on the left.', anim: { type: 'hop', min: -6, max: 6, start: -2, jumps: [5], label: 'Add 5' }, ask: { q: '−2 + 5 = ?', opts: ['3', '−7', '7', '−3'], a: 0 } },
    { say: 'Taking away moves <b>left</b>.', anim: { type: 'hop', min: -10, max: 2, start: -4, jumps: [-3], label: 'Take away 3' }, ask: { q: '−4 − 3 = ?', opts: ['−1', '−7', '7', '1'], a: 1 } },
    { say: 'Think of negatives as <b>debts</b>. If you owe $5 and someone <b>takes away</b> $3 of your debt, you are $3 better off!', pic: `<p class="center bigq">−5 − (−3) = −5 + 3 = −2</p><p class="center">Two minus signs side by side make a plus.</p>`, ask: { q: '6 − (−2) = ?', opts: ['4', '8', '−8', '−4'], a: 1 } },
    { say: 'Multiplying? Look at this pattern. Each answer goes up by 2…', anim: { type: 'reveal', stages: ['<p class="center bigq">3 × (−2) = −6<br>2 × (−2) = −4<br>1 × (−2) = −2<br>0 × (−2) = 0</p>', '<p class="center bigq">3 × (−2) = −6<br>2 × (−2) = −4<br>1 × (−2) = −2<br>0 × (−2) = 0<br><span style="color:var(--c4)">−1 × (−2) = 2</span></p><p class="center">Same signs → positive. Different signs → negative.</p>'] }, ask: { q: '(−3) × (−4) = ?', opts: ['−12', '12', '−7', '7'], a: 1 } }
  ], ['picHop']);

  L('f-frac', [
    { say: 'A pizza is cut into 4 equal slices. You eat 1 slice. Tap one slice!', anim: { type: 'pizza', d: 4, target: 1, after: 'One out of four equal slices: one quarter.' } },
    { say: 'The <b>bottom</b> number says how many equal slices. The <b>top</b> says how many you have. Now tap 3 of 8 slices.', anim: { type: 'pizza', d: 8, target: 3 } },
    { say: 'Your turn to read a fraction.', pic: pizzaPic(2, 6), ask: { q: 'What fraction is shaded?', opts: [fr(2, 6), fr(2, 4), fr(4, 6), fr(6, 2)], a: 0, why: '2 shaded out of 6 slices.' } },
    { say: 'Look: half a pizza is the same as 2 quarters, or 4 eighths. These are <b>equivalent fractions</b>.', pic: `<div class="two">${pizzaPic(1, 2)}${pizzaPic(2, 4)}${pizzaPic(4, 8)}</div><p class="center bigq">${fr(1, 2)} = ${fr(2, 4)} = ${fr(4, 8)}</p>` },
    { say: 'Fraction of an amount: share 12 cookies between 4 plates. One plate is ¼ of them.', anim: { type: 'share', n: 12, k: 4, e: '🍪' }, ask: { q: '¼ of 12 = ?', opts: ['3', '4', '8', '48'], a: 0 } },
    { say: 'Singapore students draw a <b>bar model</b>. What is ${fr(3, 5)} of 40?'.replace('${fr(3, 5)}', fr(3, 5)), anim: { type: 'reveal', stages: [K.barModel([{ label: '40', parts: [{ n: 5, color: 'var(--surface2)' }] }]) + '<p class="center">Cut the bar into 5 equal units.</p>', K.barModel([{ label: '40', parts: [{ n: 5, text: '', color: 'var(--c5)' }] }]) + '<p class="center">5 units = 40, so 1 unit = 8</p>', K.barModel([{ label: '40', parts: [{ n: 3, text: '24', color: 'var(--c1)' }, { n: 2, color: 'var(--surface2)' }] }]) + '<p class="center bigq">3 units = 24</p>'] }, ask: { q: `${fr(2, 5)} of 40 = ?`, opts: ['8', '16', '20', '80'], a: 1, why: '2 units × 8 = 16.' } }
  ], ['picPizza', 'picFracAmount']);

  L('f-dec', [
    { say: '$1 is 100 cents. Here is $1 as 100 little squares. Let\'s shade 35 cents.', anim: { type: 'grid100', k: 35, p: '35 squares', after: '35 out of 100 = <b>0.35</b> of a dollar = $0.35' } },
    { say: 'Each <b>column</b> of 10 squares is one <b>tenth</b> (0.1). Each little square is one <b>hundredth</b> (0.01).', pic: gridPic(70), ask: { q: 'What decimal is shaded?', opts: ['0.7', '0.07', '7', '70'], a: 0, why: '7 tenths = 0.7' } },
    { say: 'Careful! These look similar but are very different.', pic: `<div class="two">${gridPic(40)}${gridPic(4)}</div>`, ask: { q: 'Which picture shows 0.04?', opts: ['The left one', 'The right one'], a: 1, why: '4 hundredths is just 4 little squares.' } },
    { say: '× 10 makes every digit move <b>one place left</b> (10 times bigger).', anim: { type: 'reveal', stages: ['<div class="pvt"><span>H</span><span>T</span><span>O</span><span>.t</span><b></b><b></b><b>3</b><b>.6</b></div><p class="center">3.6</p>', '<div class="pvt"><span>H</span><span>T</span><span>O</span><span>.t</span><b></b><b>3</b><b>6</b><b>.</b></div><p class="center">3.6 × 10 = <b>36</b></p>', '<div class="pvt"><span>H</span><span>T</span><span>O</span><span>.t</span><b>3</b><b>6</b><b>0</b><b>.</b></div><p class="center">3.6 × 100 = <b>360</b></p>'] }, ask: { q: '4.5 ÷ 10 = ?', opts: ['45', '0.45', '0.045', '4.05'], a: 1, why: 'Dividing moves digits right.' } }
  ], ['picGrid']);

  // ========== NUMBER ==========
  L('n-types', [
    { say: 'Try to arrange 6 dots into a rectangle…', pic: K.dots(2, 3) + '<p class="center">6 = 2 × 3 ✓</p>' },
    { say: '…now try 7 dots. Only one long row works!', pic: K.dots(1, 7) + '<p class="center">7 = 1 × 7 only</p>' },
    { say: 'Numbers that only make one row are <b>prime</b>: exactly two factors, 1 and itself.', ask: { q: 'Which is prime?', opts: ['9', '11', '15', '21'], a: 1, why: '11 can only be 1 × 11.' } },
    { say: 'Every number can be broken into primes with a <b>factor tree</b>. Watch 72:', anim: { type: 'reveal', stages: [tree([['72']]), tree([['72'], ['8', '9']]), tree([['72'], ['8', '9'], ['2', '4', '3', '3']]), tree([['72'], ['8', '9'], ['2', '4', '3', '3'], ['2', '2']]) + '<p class="center bigq">72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3²</p>'] } },
    { say: 'Two important words:', pic: `<p><b>HCF</b> (highest common factor): the biggest number that goes into both. HCF of 12 and 18 = 6.</p><p><b>LCM</b> (lowest common multiple): the first number in both times tables. LCM of 4 and 6 = 12.</p><p class="center">4, 8, <b>12</b>, 16 … &nbsp; 6, <b>12</b>, 18 …</p>`, ask: { q: 'LCM of 3 and 5?', opts: ['8', '15', '1', '30'], a: 1 } },
    { say: 'More names you will meet:', pic: `<ul><li><b>Integers</b>: whole numbers, including negatives and 0</li><li><b>Square</b>: 1, 4, 9, 16 (dots make a square) &nbsp;<b>Cube</b>: 1, 8, 27</li><li><b>Rational</b>: can be a fraction. <b>Irrational</b>: can't, e.g. √2, π</li><li><b>Reciprocal</b>: flip it. Reciprocal of ${fr(2, 3)} is ${fr(3, 2)}</li></ul>${K.dots(4, 4)}<p class="center">16 is a square number</p>` }
  ]);

  L('n-fdp', [
    { say: 'Fractions, decimals and percentages are three names for the same amount. Watch ¾:', anim: { type: 'grid100', k: 75, p: '¾ of the grid', after: `${fr(3, 4)} = 75 out of 100 = <b>0.75</b> = <b>75%</b>` } },
    { say: '<b>Per cent</b> just means "out of 100".', pic: gridPic(40), ask: { q: 'What percentage is shaded?', opts: ['4%', '40%', '0.4%', '60%'], a: 1 } },
    { say: 'Fraction → decimal: divide the top by the bottom. ${fr(1, 4)} = 1 ÷ 4 = 0.25'.replace('${fr(1, 4)}', fr(1, 4)), pic: `<div class="two">${pizzaPic(1, 4)}${gridPic(25)}</div>`, ask: { q: `${fr(1, 2)} as a percentage?`, opts: ['12%', '50%', '20%', '2%'], a: 1 } },
    { say: 'Simplest form: share the top and bottom by the same number.', pic: `<div class="two">${pizzaPic(6, 8)}${pizzaPic(3, 4)}</div><p class="center bigq">${fr(6, 8)} = ${fr(3, 4)}</p>` },
    { say: 'Some decimals go on forever: ${fr(1, 3)} = 0.3333… We write a dot over the repeating digit.'.replace('${fr(1, 3)}', fr(1, 3)), pic: `<p class="center bigq">0.<span class="rec">3</span> = ${fr(1, 3)} &nbsp;&nbsp; 0.<span class="rec">4</span> = ${fr(4, 9)}</p><p class="center small">Trick: if x = 0.444…, then 10x = 4.444…, so 9x = 4.</p>` }
  ], ['picGrid']);

  L('n-ratio', [
    { say: 'In a necklace, for every 2 red beads there are 3 blue beads.', pic: `<p class="center bigq">🔴🔴🔵🔵🔵 &nbsp; 🔴🔴🔵🔵🔵</p><p class="center">red : blue = <b>2 : 3</b></p>` },
    { say: 'Singapore students draw it as a <b>bar model</b>: one box for each part.', pic: K.barModel([{ label: 'Red', parts: [{ n: 2, color: 'var(--c4)' }] }, { label: 'Blue', parts: [{ n: 3, color: 'var(--c5)' }] }]) },
    { say: 'The necklace has <b>40 beads</b>. How many are red?', anim: { type: 'reveal', stages: [K.barModel([{ label: 'Red', parts: [{ n: 2, color: 'var(--c4)' }] }, { label: 'Blue', parts: [{ n: 3, color: 'var(--c5)' }] }], { brace: { units: 3, text: '' } }) + '<p class="center">5 boxes altogether = 40 beads</p>', K.barModel([{ label: 'Red', parts: [{ n: 2, color: 'var(--c4)', text: '8 8' }] }, { label: 'Blue', parts: [{ n: 3, color: 'var(--c5)', text: '8 8 8' }] }]) + '<p class="center">1 box = 40 ÷ 5 = <b>8</b></p>'] }, ask: { q: 'So how many red beads?', opts: ['8', '16', '24', '20'], a: 1, why: '2 boxes × 8 = 16.' } },
    { say: 'Simplifying a ratio is like simplifying a fraction: share every part by the same number.', pic: '<p class="center bigq">20 : 30 : 40 = 2 : 3 : 4</p>', ask: { q: 'Simplify 6 : 9', opts: ['2 : 3', '3 : 2', '1 : 3', '6 : 9'], a: 0 } },
    { say: '<b>Unitary method</b>: find what ONE costs, then scale up.', pic: `<p class="center">4 🖊️ = $6</p><p class="center">1 🖊️ = $6 ÷ 4 = $1.50</p><p class="center">7 🖊️ = 7 × $1.50 = <b>$10.50</b></p>` }
  ], ['picRatio']);

  L('n-pct', [
    { say: 'A shop has a <b>25% off</b> sale. 25% means 25 out of every 100.', anim: { type: 'grid100', k: 25, p: '25%', after: '25% = ¼ of the whole' } },
    { say: 'Easy trick: <b>10%</b> means divide by 10. Then build any percentage from it.', anim: { type: 'reveal', stages: [`<p class="center">Find 35% of $80</p>${K.barModel([{ label: '$80', parts: [{ n: 10, color: 'var(--surface2)' }] }], { unitW: 24 })}`, `${K.barModel([{ label: '$80', parts: [{ n: 1, color: 'var(--c1)', text: '' }, { n: 9, color: 'var(--surface2)' }] }], { unitW: 24 })}<p class="center">10% = $8</p>`, `${K.barModel([{ label: '$80', parts: [{ n: 3, color: 'var(--c1)' }, { n: 1, color: 'var(--c2)' }, { n: 6, color: 'var(--surface2)' }] }], { unitW: 24 })}<p class="center">30% = $24, 5% = half of 10% = $4</p><p class="center bigq">35% = $28</p>`] }, ask: { q: '20% of $60 = ?', opts: ['$6', '$12', '$20', '$3'], a: 1, why: '10% = $6, so 20% = $12.' } },
    { say: 'A $50 shirt is 20% off. You pay the other 80%.', pic: K.barModel([{ label: '$50', parts: [{ n: 4, color: 'var(--c1)', text: 'pay 80%' }, { n: 1, color: 'var(--c3)', text: '20%' }] }]), ask: { q: 'How much do you pay?', opts: ['$10', '$40', '$30', '$48'], a: 1 } },
    { say: 'Reverse percentage: after 20% off, a bag costs $48. What was the price before?', anim: { type: 'reveal', stages: [K.barModel([{ label: 'before', parts: [{ n: 4, color: 'var(--c1)', text: '$48' }, { n: 1, color: 'var(--c3)', text: '?' }] }]) + '<p class="center">The 4 green boxes (80%) are $48</p>', K.barModel([{ label: 'before', parts: [{ n: 4, color: 'var(--c1)', text: '12 12 12 12' }, { n: 1, color: 'var(--c3)', text: '12' }] }]) + '<p class="center">1 box = $12, so 5 boxes = <b>$60</b></p>'] } },
    { say: 'Savings grow with <b>interest</b>. With <b>compound</b> interest, the interest also earns interest, so it grows faster every year.', pic: `${K.plot([{ f: t => 100 * Math.pow(1.1, t), color: 'var(--c1)' }, { f: t => 100 + 10 * t, color: 'var(--c2)' }], [], { xmin: 0, xmax: 20, ymin: 0, ymax: 700, gstep: 100, lstep: 200, h: 180 })}<p class="center small"><span style="color:var(--c1)">■ compound 10%</span> · <span style="color:var(--c2)">■ simple 10%</span> on $100</p>`, ask: { q: '$100 earns 10% compound interest. After 1 year it is $110. After 2 years?', opts: ['$120', '$121', '$111', '$200'], a: 1, why: '10% of $110 is $11, so $121.' } }
  ], ['picGrid']);

  L('n-ind1', [
    { say: 'Powers are a short way to write repeated multiplication.', anim: { type: 'reveal', stages: [cubes(2, '2¹ = 2'), cubes(4, '2² = 2 × 2 = 4'), cubes(8, '2³ = 2 × 2 × 2 = 8'), cubes(16, '2⁴ = 2 × 2 × 2 × 2 = 16')] } },
    { say: 'Multiplying powers of the same number? Just <b>count</b> how many 2s there are.', pic: '<p class="center bigq">2³ × 2² = (2×2×2) × (2×2) = 2⁵</p><p class="center">Add the powers: 3 + 2 = 5</p>', ask: { q: '3⁴ × 3² = ?', opts: ['3⁶', '3⁸', '9⁶', '3²'], a: 0 } },
    { say: 'Now walk <b>down</b> the pattern. Each step divides by 2…', anim: { type: 'reveal', stages: ['<p class="center bigq">2³ = 8<br>2² = 4<br>2¹ = 2</p>', '<p class="center bigq">2³ = 8<br>2² = 4<br>2¹ = 2<br><span style="color:var(--c4)">2⁰ = 1</span></p>', `<p class="center bigq">2² = 4<br>2¹ = 2<br>2⁰ = 1<br><span style="color:var(--c4)">2⁻¹ = ${fr(1, 2)}<br>2⁻² = ${fr(1, 4)}</span></p><p class="center">Negative power = "one over"</p>`] }, ask: { q: '5⁰ = ?', opts: ['0', '1', '5', '−5'], a: 1 } },
    { say: 'A power of ½ means square root, because √9 × √9 = 9.', pic: `<p class="center bigq">9<sup>½</sup> = √9 = 3 &nbsp;&nbsp; 8<sup>⅓</sup> = ∛8 = 2</p>` }
  ]);

  const fbar = (k, d, col = 'var(--c1)', lab) => `<div class="fbrow">${K.fracBar(k, d, col)}${lab ? `<b>${lab}</b>` : ''}</div>`;
  const fgrid = (rows, cols, shadeCols, shadeRows) => `<div class="fgrid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({ length: rows * cols }, (_, i) => { const r = Math.floor(i / cols), c = i % cols; return `<i class="${c < shadeCols ? 'a' : ''} ${c < shadeCols && r < shadeRows ? 'b' : ''}"></i>`; }).join('')}</div>`;
  L('n-ops', [
    { say: 'Two friends work out <b>3 + 4 × 2</b> and get different answers. Who is right?', anim: { type: 'reveal', stages: ['<p class="center bigq">3 + 4 × 2</p><p class="center">Ali: 3 + 4 = 7, then 7 × 2 = <b>14</b><br>Bea: 4 × 2 = 8, then 3 + 8 = <b>11</b></p>', '<p class="center bigq">Bea is right: 11 ✓</p><p class="center">The whole world agrees: <b>× and ÷ come before + and −</b>. Otherwise the same sum could have two answers!</p>'] } },
    { say: 'The order is <b>BIDMAS</b>. Watch one tiny step at a time, always doing the highlighted part.', anim: { type: 'reveal', stages: ['<p class="center bigq"><mark>(2 + 3)</mark> × 4² − 6</p><p class="center">1. <b>B</b>rackets first: 2 + 3 = 5</p>', '<p class="center bigq">5 × <mark>4²</mark> − 6</p><p class="center">2. <b>I</b>ndices (powers): 4² = 16</p>', '<p class="center bigq"><mark>5 × 16</mark> − 6</p><p class="center">3. <b>D</b>ivide and <b>M</b>ultiply: 5 × 16 = 80</p>', '<p class="center bigq"><mark>80 − 6</mark></p><p class="center">4. <b>A</b>dd and <b>S</b>ubtract last: 80 − 6 = <b>74</b></p>'] }, ask: { q: '20 − 6 ÷ 2 = ?', opts: ['7', '17', '13', '4'], a: 1, why: 'Divide first: 6 ÷ 2 = 3. Then 20 − 3 = 17.' } },
    { say: 'Fractions with the <b>same bottom number</b> are easy: the slices are the same size, so just count them.', pic: fbar(1, 5, 'var(--c1)', '1/5') + fbar(2, 5, 'var(--c2)', '+ 2/5') + fbar(3, 5, 'var(--c3)', '= 3/5') + '<p class="center">The bottom number stays 5: the slices are still fifths!</p>', ask: { q: `${fr(2, 7)} + ${fr(3, 7)} = ?`, opts: [fr(5, 7), fr(5, 14), fr(6, 7), fr(5, 49)], a: 0, why: 'We have 5 slices, each a seventh.' } },
    { say: 'But ${fr(1, 2)} + ${fr(1, 3)}? The slices are <b>different sizes</b>. You can\'t just count them, like adding 1 apple and 1 watermelon.'.replace('${fr(1, 2)}', fr(1, 2)).replace('${fr(1, 3)}', fr(1, 3)), anim: { type: 'reveal', stages: [fbar(1, 2, 'var(--c1)', '1/2') + fbar(1, 3, 'var(--c2)', '1/3') + '<p class="center">A half-slice is bigger than a third-slice.</p>', fbar(3, 6, 'var(--c1)', '3/6') + fbar(2, 6, 'var(--c2)', '2/6') + '<p class="center">Cut both bars into <b>6</b> equal slices (6 is in both the 2 and 3 times tables).<br>Same amount shaded, but now the slices match!</p>', `<div class="fbrow"><svg class="viz" viewBox="0 0 324 44">${Array.from({ length: 6 }, (_, i) => `<rect x="${2 + i * 53.33}" y="2" width="53.33" height="40" fill="${i < 3 ? 'var(--c1)' : i < 5 ? 'var(--c2)' : 'var(--surface2)'}" class="unit"/>`).join('')}</svg><b>5/6</b></div><p class="center bigq">${fr(3, 6)} + ${fr(2, 6)} = ${fr(5, 6)}</p>`] }, ask: { q: `${fr(1, 4)} + ${fr(1, 2)} = ?`, opts: [fr(3, 4), fr(2, 6), fr(2, 4), fr(1, 6)], a: 0, why: `${fr(1, 2)} = ${fr(2, 4)}, so ${fr(1, 4)} + ${fr(2, 4)} = ${fr(3, 4)}.` } },
    { say: 'Multiplying fractions means "<b>of</b>". What is ½ <b>of</b> ⅓?', anim: { type: 'reveal', stages: [fgrid(2, 3, 1, 0) + '<p class="center">Shade ⅓ of the bar.</p>', fgrid(2, 3, 1, 1) + `<p class="center">Now take <b>half</b> of that shaded part. It is <b>1 of 6</b> little boxes.</p><p class="center bigq">${fr(1, 2)} × ${fr(1, 3)} = ${fr(1, 6)}</p><p class="center">Tops × tops, bottoms × bottoms: 1 × 1 = 1, 2 × 3 = 6</p>`] } },
    { say: 'Dividing: <b>3 ÷ ½</b> asks "how many halves fit into 3?" Cut 3 pizzas in half…', pic: `<div class="two">${pizzaPic(2, 2)}${pizzaPic(2, 2)}${pizzaPic(2, 2)}</div><p class="center">3 pizzas = <b>6</b> halves. So 3 ÷ ½ = 6, the same as 3 × 2!</p><p class="center">That's why we <b>flip</b> the second fraction and multiply.</p>`, ask: { q: '2 ÷ ¼ = ? (how many quarters in 2 pizzas?)', opts: ['8', '½', '6', '2¼'], a: 0, why: 'Each pizza has 4 quarters, 2 pizzas have 8.' } },
    { say: '<b>Mixed numbers</b>: 2¾ means 2 whole pizzas and 3 quarters. How many quarters is that altogether?', pic: `<div class="two">${pizzaPic(4, 4)}${pizzaPic(4, 4)}${pizzaPic(3, 4)}</div><p class="center">4 + 4 + 3 = 11 quarters, so 2¾ = ${fr(11, 4)}</p>`, ask: { q: `1⅔ = ?`, opts: [fr(5, 3), fr(4, 3), fr(3, 5), fr(12, 3)], a: 0, why: '1 whole = 3 thirds, plus 2 thirds = 5 thirds.' } }
  ]);

  // ========== ALGEBRA ==========
  L('a-intro', [
    { say: 'Each 🎒 has the same number of sweets inside, but we can\'t see how many. Let\'s call that number <b>x</b>.', pic: `<p class="center bigq">🎒🎒🎒 🍬🍬</p><p class="center">3 bags and 2 loose sweets: <b>3x + 2</b></p>` },
    { say: 'If you open a bag and find 4 sweets, then x = 4.', anim: { type: 'reveal', stages: [`<p class="center bigq">🎒🎒🎒 🍬🍬</p>`, `<div class="groups">${['', '', ''].map(() => `<div class="grp">${obs(4, '🍬')}</div>`).join('')}<div class="grp">${obs(2, '🍬')}</div></div><p class="center">3 × 4 + 2 = <b>14</b> sweets</p>`] }, ask: { q: 'If x = 5, how many sweets is 3x + 2?', opts: ['10', '17', '15', '35'], a: 1, why: '3 × 5 + 2 = 17.' } },
    { say: 'Letters stand for numbers. 3x means 3 × x. x² means x × x.', ask: { q: 'If y = 6, what is 2y − 1?', opts: ['11', '25', '13', '62'], a: 0 } }
  ], ['picBags']);

  L('a-linear', [
    { say: 'An equation is a <b>balance scale</b>. Both sides weigh the same. Each bag holds x blocks.', anim: { type: 'balance', a: 2, b: 3, c: 11 } },
    { say: 'Whatever you do to one side, do to the other, and it stays balanced.', pic: `<p class="center bigq">2x + 3 = 11</p><p class="center">−3 both sides: 2x = 8</p><p class="center">÷2 both sides: x = 4</p>`, ask: { q: 'Solve x + 5 = 12', opts: ['x = 7', 'x = 17', 'x = 5', 'x = 60'], a: 0 } },
    { say: 'Try one on the scale yourself!', anim: { type: 'balance', a: 3, b: 2, c: 14 }, ask: { q: 'So 3x + 2 = 14 means…', opts: ['x = 4', 'x = 12', 'x = 6', 'x = 5'], a: 0 } },
    { say: 'Word problems: Sam has 3 times as many marbles as Tia. Together they have 48.', pic: K.barModel([{ label: 'Tia', parts: [{ n: 1, color: 'var(--c1)' }] }, { label: 'Sam', parts: [{ n: 3, color: 'var(--c2)' }] }]) + '<p class="center">4 boxes = 48, so 1 box = 12. In algebra: x + 3x = 48</p>', ask: { q: 'How many does Sam have?', opts: ['12', '36', '16', '44'], a: 1 } }
  ], ['picBalance']);

  L('a-expand', [
    { say: 'Expanding brackets is just finding the area of a rectangle. 3(x + 2):', anim: { type: 'reveal', stages: [K.area([[5, 'x'], [2, '2']], [[3, '3']]), K.area([[5, 'x'], [2, '2']], [[3, '3']], { cells: [['3x', '6']] }) + '<p class="center bigq">3(x + 2) = 3x + 6</p>'] } },
    { say: 'Two brackets? Make a bigger rectangle: (x + 2)(x + 3).', anim: { type: 'reveal', stages: [K.area([[5, 'x'], [2, '2']], [[5, 'x'], [3, '3']]), K.area([[5, 'x'], [2, '2']], [[5, 'x'], [3, '3']], { cells: [['x²', '2x'], ['3x', '6']] }), K.area([[5, 'x'], [2, '2']], [[5, 'x'], [3, '3']], { cells: [['x²', '2x'], ['3x', '6']] }) + '<p class="center bigq">x² + 5x + 6</p><p class="center">Add up the four pieces. 2x + 3x = 5x</p>'] }, ask: { q: '(x + 1)(x + 4) = ?', opts: ['x² + 5x + 4', 'x² + 4x + 1', 'x² + 5', 'x² + 4x + 5'], a: 0 } },
    { say: 'Only <b>like terms</b> join together, like apples with apples.', pic: '<p class="center">3🍎 + 2🍌 + 4🍎 = 7🍎 + 2🍌</p><p class="center bigq">3a + 2b + 4a = 7a + 2b</p>' }
  ]);

  L('a-factor', [
    { say: 'Factorising is expanding <b>backwards</b>: you know the area, find the sides.', pic: K.area([[5, '?'], [2, '?']], [[5, '?'], [3, '?']], { cells: [['x²', '2x'], ['3x', '6']] }) + '<p class="center">x² + 5x + 6 = (x + 2)(x + 3)</p>' },
    { say: 'The two numbers <b>multiply to 6</b> and <b>add to 5</b>: that\'s 2 and 3!', ask: { q: 'Factorise x² + 7x + 10', opts: ['(x + 2)(x + 5)', '(x + 1)(x + 10)', '(x + 3)(x + 4)', '(x + 7)(x + 10)'], a: 0, why: '2 × 5 = 10 and 2 + 5 = 7.' } },
    { say: 'First, always look for a <b>common factor</b> you can take out.', pic: '<p class="center bigq">6x + 9 = 3(2x + 3)</p>' }
  ]);

  L('a-seq', [
    { say: 'Matchstick squares! Count the sticks.', anim: { type: 'reveal', stages: [sticks(1) + '<p class="center">1 square: 4 sticks</p>', sticks(2) + '<p class="center">2 squares: 7 sticks</p>', sticks(3) + '<p class="center">3 squares: 10 sticks</p>'] } },
    { say: 'Each new square adds <b>3</b> sticks. 4, 7, 10, 13…', ask: { q: 'How many sticks for 4 squares?', opts: ['12', '13', '14', '16'], a: 1 } },
    { say: 'Rule: <b>3 times the number of squares, plus 1</b> (for the first stick on the left). So the n-th term is <b>3n + 1</b>.', ask: { q: 'Sticks for 10 squares?', opts: ['30', '31', '40', '13'], a: 1, why: '3 × 10 + 1 = 31.' } }
  ], ['picSticks']);

  // ========== GEOMETRY / MEASURES ==========
  L('m-area', [
    { say: 'Area is how many 1 cm squares cover a shape.', pic: K.dots(3, 5, '🟩') + '<p class="center">3 rows of 5 = <b>15 cm²</b>. That is length × width!</p>' },
    { say: 'A triangle is <b>half</b> a rectangle.', pic: `<svg class="viz" viewBox="0 0 240 140"><rect x="20" y="20" width="200" height="100" class="thin"/><polygon points="20,120 220,120 220,20" class="shape"/><text x="120" y="138" text-anchor="middle" class="lbl">base</text><text x="226" y="74" class="lbl">height</text></svg><p class="center">Triangle = ½ × base × height</p>`, ask: { q: 'Base 10, height 6. Area?', opts: ['60', '30', '16', '8'], a: 1 } },
    { say: 'A parallelogram can be cut and slid into a rectangle!', anim: { type: 'reveal', stages: [`<svg class="viz" viewBox="0 0 260 120"><polygon points="60,100 240,100 200,20 20,20" class="shape" transform="translate(0,0)"/></svg>`, `<svg class="viz" viewBox="0 0 260 120"><polygon points="60,100 200,100 200,20 60,20" class="shape"/><polygon points="200,100 240,100 200,20" fill="var(--c2)" fill-opacity=".4" stroke="var(--c2)"/><polygon points="20,20 60,20 60,100" fill="none" stroke="var(--c2)" stroke-dasharray="4 4"/></svg><p class="center">Area = base × perpendicular height</p>`] } }
  ], ['picArea']);

  L('t-pyth', [
    { say: 'Build a square on each side of a right-angled triangle…', pic: pythSquares(3, 4) },
    { say: 'The two small squares (9 and 16 little squares) fit exactly into the big one!', pic: '<p class="center bigq">9 + 16 = 25</p><p class="center">so the long side is √25 = 5</p>', ask: { q: 'Small squares 36 and 64. Big square?', opts: ['100', '28', '10', '2304'], a: 0 } },
    { say: 'That is <b>Pythagoras\' theorem</b>: a² + b² = c². c is the longest side, the <b>hypotenuse</b>.', pic: K.rightTri({ a: 'a', b: 'b', c: 'c' }) }
  ], ['picSquares']);

  L('p-intro', [
    { say: 'This bag has 3 red and 2 blue balls. Pick one without looking!', anim: { type: 'bag', balls: [['🔴', 3], ['🔵', 2]] } },
    { say: 'Red is more likely because there are more red balls.', pic: bagPic([['🔴', 3], ['🔵', 2]]) + `<p class="center bigq">P(red) = ${fr(3, 5)}</p><p class="center">3 red out of 5 balls</p>`, ask: { q: 'P(blue) = ?', opts: [fr(2, 5), fr(3, 5), fr(2, 3), fr(1, 2)], a: 0 } },
    { say: 'Probability goes from <b>0</b> (impossible) to <b>1</b> (certain).', pic: K.numberLine(0, 1, { step: 0.5, marks: [{ x: 0, label: 'impossible' }, { x: 0.5, label: 'even' }, { x: 1, label: 'certain' }] }), ask: { q: 'P(picking a 🟢 from this bag)?', opts: ['0', fr(1, 5), '1', fr(1, 2)], a: 0, why: 'There are no green balls: impossible.' } }
  ], ['picBag']);

  L('s-avg', [
    { say: 'Four friends built towers of blocks. Let\'s make them fair.', anim: { type: 'level', t: [3, 6, 2, 5] } },
    { say: 'The <b>mean</b> is the "fair share": add everything up, then share it out equally.', pic: '<p class="center bigq">(3 + 6 + 2 + 5) ÷ 4 = 16 ÷ 4 = 4</p>', ask: { q: 'Mean of 2, 4 and 9?', opts: ['5', '4', '15', '3'], a: 0 } },
    { say: 'The <b>median</b> is the middle one when you line them up in order.', pic: '<p class="center bigq">2 3 <span style="color:var(--c4)">5</span> 6 9</p>', ask: { q: 'Median of 7, 1, 4?', opts: ['1', '4', '7', '12'], a: 1, why: 'In order: 1, 4, 7.' } },
    { say: 'The <b>mode</b> is the most common. The <b>range</b> is biggest − smallest.', pic: '<p class="center bigq">3, 5, 5, 8 → mode 5, range 5</p>' }
  ], ['picMean']);
})();
