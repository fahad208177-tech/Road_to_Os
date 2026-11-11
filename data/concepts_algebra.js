// Concept-first teaching, part 2: Algebra and graphs (section 2).
(() => {
  const K = R2O.K, { n, fr, frs, poly, term } = K, obs = K.objs, idea = R2O.idea;
  const L = (id, scenes) => { const l = R2O.lesson(id); if (!l) throw new Error('no lesson ' + id); l.scenes = scenes; };
  const ins = (id, at, ...steps) => R2O.lesson(id).scenes.splice(at, 0, ...steps);
  const X = (controls, draw) => ({ type: 'explore', controls, draw });
  const flow = (items) => `<div class="flow">${items.map(t => t.startsWith('→') ? `<i>→</i>` : `<span class="${/[×÷+−]|square|:/.test(t) ? 'm' : ''}">${t}</span>`).join('')}</div>`;

  // explorers and big ideas for algebra lessons that already had pictures
  ins('a-intro', 0, { say: idea('A letter is a <b>box for a number we don\'t know yet</b>, or for a number that can change. Algebra lets us talk about <b>all</b> numbers at once.') });
  ins('a-intro', 3, { say: 'Change how many sweets are in each bag. The <b>expression</b> 3x + 2 stays the same; only its value changes.', anim: X([{ k: 'x', label: 'Sweets per bag (x)', min: 0, max: 9, v: 4 }], v => `<div class="groups">${[0, 1, 2].map(() => `<div class="grp">${obs(v.x, '🍬') || '<small>empty</small>'}</div>`).join('')}<div class="grp">${obs(2, '🍬')}</div></div><p class="center bigq">3x + 2 = 3 × ${v.x} + 2 = ${3 * v.x + 2}</p>`) });
  ins('a-linear', 0, { say: idea('Solving an equation means finding the number that <b>makes both sides equal</b>. The goal is to get <b>x on its own</b>. To keep it fair, whatever you do to one side you must do to the other, like a balance.') });
  ins('a-expand', 0, { say: idea('Expanding means <b>multiplying everything inside the brackets</b>. Why everything? Because a(b + c) is the area of a rectangle made of two parts, and you need both parts.') });
  ins('a-expand', 3, { say: 'Choose any numbers for the brackets. Watch the four areas.', anim: X([{ k: 'a', label: 'a in (x + a)', min: 1, max: 6, v: 2 }, { k: 'b', label: 'b in (x + b)', min: 1, max: 6, v: 3 }], v => `${K.area([[6, 'x'], [v.a, String(v.a)]], [[6, 'x'], [v.b, String(v.b)]], { cells: [['x²', v.a + 'x'], [v.b + 'x', String(v.a * v.b)]] })}<p class="center bigq">(x + ${v.a})(x + ${v.b}) = x² + ${v.a + v.b}x + ${v.a * v.b}</p><p class="center small">middle: ${v.a} + ${v.b} = ${v.a + v.b} · end: ${v.a} × ${v.b} = ${v.a * v.b}</p>`) });
  ins('a-factor', 0, { say: idea('Factorising is <b>expanding backwards</b>: you are given the area and must find the length and width of the rectangle. We do it because a product is much easier to work with, especially for solving equations.') });
  ins('a-seq', 0, { say: idea('A sequence follows a <b>rule</b>. If you find the rule, you can jump straight to the 100th term without writing out all 99 before it.') });
  ins('a-seq', 4, { say: 'Choose how many squares. The rule 3n + 1 always gives the number of sticks.', anim: X([{ k: 'k', label: 'Squares (n)', min: 1, max: 7, v: 4 }], v => { let s = `<svg class="viz" viewBox="0 0 ${v.k * 44 + 20} 64">`; for (let i = 0; i < v.k; i++) { const x = 10 + i * 44; s += `<line x1="${x}" y1="10" x2="${x + 44}" y2="10" class="stick"/><line x1="${x}" y1="54" x2="${x + 44}" y2="54" class="stick"/>${i === 0 ? `<line x1="${x}" y1="10" x2="${x}" y2="54" class="stick"/>` : ''}<line x1="${x + 44}" y1="10" x2="${x + 44}" y2="54" class="stick"/>`; } return s + `</svg><p class="center bigq">3 × ${v.k} + 1 = ${3 * v.k + 1} sticks</p>`; }) });

  // ---- 2.2 completing the square ----
  const csq = h => { // x² + 2hx drawn as tiles with the missing corner
    const X0 = 30, S = 120, u = 14, w = h * u;
    return `<svg class="viz" viewBox="0 0 ${X0 + S + w + 20} ${S + w + 30}"><rect x="${X0}" y="10" width="${S}" height="${S}" fill="var(--c1)" fill-opacity=".35" stroke="var(--c1)"/><text x="${X0 + S / 2}" y="${10 + S / 2 + 5}" text-anchor="middle" class="lbl">x²</text>
      <rect x="${X0 + S}" y="10" width="${w}" height="${S}" fill="var(--c2)" fill-opacity=".4" stroke="var(--c2)"/><text x="${X0 + S + w / 2}" y="${10 + S / 2 + 5}" text-anchor="middle" class="lbl">${h}x</text>
      <rect x="${X0}" y="${10 + S}" width="${S}" height="${w}" fill="var(--c2)" fill-opacity=".4" stroke="var(--c2)"/><text x="${X0 + S / 2}" y="${10 + S + w / 2 + 5}" text-anchor="middle" class="lbl">${h}x</text>
      <rect x="${X0 + S}" y="${10 + S}" width="${w}" height="${w}" fill="none" stroke="var(--c4)" stroke-width="2.5" stroke-dasharray="5 4"/><text x="${X0 + S + w / 2}" y="${10 + S + w / 2 + 5}" text-anchor="middle" class="lbl acc">${h * h}</text></svg>`;
  };
  L('a-compsq', [
    { say: idea('Completing the square means rearranging x² + bx into an <b>almost-perfect square</b>, then fixing the missing corner. We do it because a square can never be negative, which tells us the <b>smallest value</b> and the <b>turning point</b>.') },
    { say: 'x² + 6x as tiles: one x² square and 6x split into two strips of 3x, one on each side…', pic: csq(3) + '<p class="center">The square is <b>nearly</b> complete. The missing corner is 3 × 3 = <b>9</b>.</p>' },
    { say: 'So x² + 6x is the big square (x + 3)² <b>minus</b> the missing 9: x² + 6x = (x + 3)² − 9.', ask: { q: 'x² + 6x + 1 = (x + 3)² − 9 + 1 = ?', opts: ['(x + 3)² − 8', '(x + 3)² + 10', '(x + 6)² + 1', '(x + 3)² − 10'], a: 0 } },
    { say: 'Change the middle number. The corner is always (half of b)².', anim: X([{ k: 'b', label: 'b in x² + bx', min: 2, max: 10, step: 2, v: 4 }], v => `${csq(v.b / 2)}<p class="center bigq">x² + ${v.b}x = (x + ${v.b / 2})² − ${(v.b / 2) ** 2}</p>`) },
    { say: 'Why it helps: (x + 3)² − 8 is smallest when (x + 3)² = 0, so when x = −3. The lowest point of the curve is (−3, −8).', pic: K.plot([{ f: x => (x + 3) ** 2 - 8 }], [{ x: -3, y: -8, label: '(−3, −8)' }], { xmin: -8, xmax: 3, ymin: -9, ymax: 8, h: 220 }) }
  ]);

  // ---- 2.3 algebraic fractions ----
  L('a-algfrac', [
    { say: idea('Algebraic fractions follow <b>exactly the same rules</b> as number fractions, because letters are just numbers in disguise. If you can do ${fr(6, 8)} = ${fr(3, 4)}, you can do these.'.replace('${fr(6, 8)}', fr(6, 8)).replace('${fr(3, 4)}', fr(3, 4))) },
    { say: 'Simplifying means dividing top and bottom by a <b>common factor</b>. A factor must <b>multiply</b> the whole top and the whole bottom.', pic: `<p class="center bigq">${fr('6', '8')} = ${fr('2 × 3', '2 × 4')} = ${fr(3, 4)}</p><p class="center bigq">${fr('x(x − 2)', '(x − 2)(x − 3)')} = ${fr('x', 'x − 3')}</p>` },
    { say: 'The big trap: you <b>can\'t</b> cancel things that are <b>added</b>. Test it with a number!', anim: { type: 'reveal', stages: [`<p class="center bigq">Is ${fr('x + 3', '3')} = x ?</p>`, `<p class="center">Try x = 6: ${fr('6 + 3', 3)} = ${fr(9, 3)} = <b>3</b>, not 6 ❌</p><p class="center">The 3 is <b>added</b>, not multiplied, so it can't cancel. Always factorise first.</p>`] }, ask: { q: `Simplify ${fr('x² − 9', 'x − 3')}`, opts: ['x + 3', 'x − 3', 'x² − 3', '3'], a: 0, why: 'x² − 9 = (x − 3)(x + 3); the (x − 3) is a factor of both.' } },
    { say: 'Adding needs a common denominator, just like ${fr(1, 3)} + ${fr(1, 4)} = ${fr(4, 12)} + ${fr(3, 12)}.'.replace('${fr(1, 3)}', fr(1, 3)).replace('${fr(1, 4)}', fr(1, 4)).replace('${fr(4, 12)}', fr(4, 12)).replace('${fr(3, 12)}', fr(3, 12)), pic: `<p class="center bigq">${fr('x', 3)} + ${fr('x', 4)} = ${fr('4x', 12)} + ${fr('3x', 12)} = ${fr('7x', 12)}</p>` }
  ]);

  // ---- 2.4 indices II ----
  L('a-ind2', [
    { say: idea('The index rules are just <b>counting</b>. x³ × x² is (x·x·x)(x·x): five x\'s, so x⁵. You never need to memorise anything you can count.') },
    { say: 'Count them:', anim: { type: 'reveal', stages: ['<p class="center bigq">x³ × x² = (x·x·x) × (x·x) = x⁵</p><p class="center">Multiply → <b>add</b> the powers</p>', '<p class="center bigq">x⁵ ÷ x² = (x·x·x·x·x) ÷ (x·x) = x³</p><p class="center">Divide → <b>subtract</b> the powers (two pairs cancel)</p>', '<p class="center bigq">(x²)³ = x² · x² · x² = x⁶</p><p class="center">Power of a power → <b>multiply</b> the powers</p>'] } },
    { say: 'Solving 2ˣ = 32 asks: <b>how many 2s</b> multiply to make 32? Climb the doubling ladder.', pic: '<p class="center bigq">2 → 4 → 8 → 16 → 32</p><p class="center">That\'s 5 doublings, so 2⁵ = 32 and x = 5.</p>', ask: { q: 'Solve 3ˣ = 81', opts: ['4', '27', '3', '9'], a: 0, why: '3 → 9 → 27 → 81: four 3s.' } },
    { say: 'If the bases are different, rewrite them so they <b>match</b>: 25 = 5², so 5ˣ⁺¹ = 25ˣ becomes 5ˣ⁺¹ = 5²ˣ, then x + 1 = 2x and x = 1.' }
  ]);

  // ---- 2.5 simultaneous equations ----
  L('a-simul', [
    { say: idea('One equation with <b>two</b> unknowns has endless answers. A second equation pins down the <b>one</b> pair that works for both. The trick to solving them is to <b>get rid of one letter</b>, so you are left with an easy equation with only one unknown.') },
    { say: 'x + y = 10. Slide x. How many pairs work?', anim: X([{ k: 'x', label: 'x', min: 0, max: 10, v: 3 }], v => `${K.plot([{ f: t => 10 - t }], [{ x: v.x, y: 10 - v.x, label: `(${v.x}, ${10 - v.x})` }], { xmin: 0, xmax: 11, ymin: 0, ymax: 11, h: 220 })}<p class="center bigq">${v.x} + ${10 - v.x} = 10 ✓</p><p class="center small">Every point on the line works. One equation is not enough!</p>`) },
    { say: 'Real life: two shopping receipts. We don\'t know the price of a 🍔 or a 🥤.', pic: '<div class="receipts"><span class="receipt">🍔🍔 🥤 = $9</span><span class="receipt">🍔 🥤 = $6</span></div>' },
    { say: 'Compare them. What is the <b>difference</b> between the two receipts?', anim: { type: 'reveal', keep: true, stages: ['<div class="receipts"><span class="receipt">🍔🍔 🥤 = $9</span><b>−</b><span class="receipt">🍔 🥤 = $6</span></div>', '<div class="receipts"><span class="receipt">🍔 = $3</span></div><p class="center">The 🥤 is on both receipts, so taking one receipt from the other <b>cancels the drink</b>! The only difference is one burger, which cost $9 − $6 = $3.</p>', '<p class="center">Put it back: 🍔 + 🥤 = $6, so $3 + 🥤 = $6, and 🥤 = <b>$3</b>.</p>'] }, ask: { q: 'So why did we subtract the receipts?', opts: ['To get rid of the drink, leaving one unknown', 'Because subtracting is always right', 'To make the numbers smaller'], a: 0, why: 'That is called elimination: getting rid of one letter.' } },
    { say: 'In algebra: x = burger, y = drink. Same idea, same reason.', pic: '<p class="center bigq">2x + y = 9<br>x + y = 6</p><p class="center">Subtract: (2x + y) − (x + y) = 9 − 6 → <b>x = 3</b>. The y\'s cancel.</p>' },
    { say: 'Sometimes <b>adding</b> cancels a letter instead. +y and −y add to nothing, like +1 and −1.', pic: '<p class="center bigq">x + y = 10<br>x − y = 4</p><p class="center">Add: 2x + 0 = 14 → x = 7, then y = 3.</p><p class="center"><b>Same signs → subtract. Opposite signs → add.</b> Either way, the aim is the same: one letter disappears.</p>', ask: { q: '3x + 2y = 16 and x − 2y = 0. Which removes y?', opts: ['Add them', 'Subtract them', 'Multiply them'], a: 0, why: '+2y and −2y add to 0.' } },
    { say: 'If no letter matches, <b>make</b> one match first by multiplying a whole equation. Then cancel.', pic: '<p class="center">x + y = 5 and 2x + 3y = 12<br>× 2 the first: 2x + 2y = 10<br>Now subtract: y = 2, then x = 3</p>' },
    { say: 'On a graph, each equation is a line. The answer is where the lines <b>cross</b>: the only point on both.', pic: K.plot([{ f: x => 10 - x }, { f: x => x - 4 }], [{ x: 7, y: 3, label: '(7, 3)' }], { xmin: 0, xmax: 11, ymin: -4, ymax: 11, h: 230 }) }
  ]);

  // ---- 2.5 quadratic equations ----
  L('a-quad', [
    { say: idea('If two numbers multiply to make <b>0</b>, one of them <b>must</b> be 0. That one fact is why we factorise quadratics: (x − 4)(x + 3) = 0 means x − 4 = 0 or x + 3 = 0.') },
    { say: 'Try to find two numbers that multiply to 0 where neither is 0. You can\'t!', pic: '<p class="center bigq">5 × 0 = 0 &nbsp; 0 × (−3) = 0 &nbsp; 4 × 2 = 8 ≠ 0</p>', ask: { q: '(x − 5)(x + 2) = 0. So…', opts: ['x = 5 or x = −2', 'x = −5 or x = 2', 'x = 10', 'x = 3'], a: 0, why: 'x − 5 = 0 gives 5; x + 2 = 0 gives −2.' } },
    { say: 'On a graph, the solutions are where the curve <b>crosses the x-axis</b> (where y = 0). Move the curve up and down: it can cross twice, touch once, or miss.', anim: X([{ k: 'c', label: 'c in y = x² − 2x + c', min: -8, max: 4, v: -3 }], v => { const D = 4 - 4 * v.c; const r = D < 0 ? [] : D === 0 ? [1] : [1 - Math.sqrt(D) / 2, 1 + Math.sqrt(D) / 2]; return `${K.plot([{ f: x => x * x - 2 * x + v.c }], r.map(x => ({ x, y: 0, color: 'var(--c4)' })), { xmin: -4, xmax: 6, ymin: -10, ymax: 10, h: 220 })}<p class="center">${r.length === 2 ? `two solutions: x = ${r.map(x => n(K.round(x, 2))).join(' and ')}` : r.length ? 'one (repeated) solution: x = 1' : 'no solutions: the curve never reaches y = 0'}</p><p class="center small">b² − 4ac = ${n(D)}</p>`; }) },
    { say: 'When it won\'t factorise nicely, the <b>quadratic formula</b> always works. It comes from completing the square for any quadratic, and it is given in the exam.', pic: `<p class="tri">x = ${fr('−b ± √(b² − 4ac)', '2a')}</p><p class="center">The ± gives the two crossing points. b² − 4ac tells you how many there are.</p>` }
  ]);

  // ---- 2.5 changing the subject ----
  L('a-subject', [
    { say: idea('A formula is a <b>machine</b>: put a number in, it does steps, a number comes out. Changing the subject means running the machine <b>backwards</b>: undo the last step first, like taking off your shoes before your socks.') },
    { say: 'y = 3x − 7 as a machine, then backwards:', anim: { type: 'reveal', stages: [flow(['x', '→', '× 3', '→', '− 7', '→', 'y']), flow(['x', '→', '× 3', '→', '− 7', '→', 'y']) + flow(['x', '→', '÷ 3', '→', '+ 7', '→', 'y']).replace('<div class="flow">', '<div class="flow" style="flex-direction:row-reverse">') + '<p class="center">Backwards: undo − 7 with + 7, then undo × 3 with ÷ 3.</p><p class="center bigq">x = ' + fr('y + 7', 3) + '</p>'] }, ask: { q: 'Make x the subject of y = x + 5', opts: ['x = y − 5', 'x = y + 5', 'x = 5y', 'x = y ÷ 5'], a: 0 } },
    { say: 'Each step has an opposite: + ↔ −, × ↔ ÷, square ↔ square root.', pic: `<p class="center bigq">A = πr² → r² = ${fr('A', 'π')} → r = ${K.sqrt(fr('A', 'π'))}</p>` },
    { say: 'If the subject appears <b>twice</b>, collect both on one side, then factorise it out so it appears once.', pic: `<p class="center">ax + b = cx + d → ax − cx = d − b → x(a − c) = d − b → x = ${fr('d − b', 'a − c')}</p>` }
  ]);

  // ---- 2.6 inequalities ----
  L('a-ineq', [
    { say: idea('An equation has one answer. An inequality has a <b>whole range</b> of answers. "A lift holds at most 8 people" means 0, 1, 2… up to 8 are all fine.') },
    { say: 'Slide x. Which values make x &lt; 3 true?', anim: X([{ k: 'x', label: 'x', min: -5, max: 7, step: 0.5, v: 1 }], v => `${K.numberLine(-5, 7, { range: { from: -Infinity, to: 3, toClosed: false }, marks: [{ x: v.x, label: n(v.x) }] })}<p class="center bigq">${n(v.x)} &lt; 3 is ${v.x < 3 ? 'TRUE ✅' : 'FALSE ❌'}</p><p class="center small">Open circle at 3: 3 itself is not included. ⩽ would use a filled circle.</p>`) },
    { say: 'Solving works like equations, with <b>one</b> twist. Why does dividing by a negative flip the sign?', anim: { type: 'reveal', stages: ['<p class="center bigq">2 &lt; 5 ✓</p>' + K.numberLine(-6, 6, { marks: [{ x: 2, label: '2' }, { x: 5, label: '5' }] }), '<p class="center bigq">Multiply both by −1: −2 ? −5</p>' + K.numberLine(-6, 6, { marks: [{ x: -2, label: '−2' }, { x: -5, label: '−5' }] }) + '<p class="center">Now −2 is to the <b>right</b> of −5, so −2 &gt; −5. Negatives are a mirror image, so the order flips!</p>'] }, ask: { q: 'Solve −2x > 6', opts: ['x < −3', 'x > −3', 'x > 3', 'x < 3'], a: 0, why: 'Divide by −2 and flip: x < −3.' } },
    { say: 'On a graph, an inequality is a whole <b>region</b>: every point where the rule is true. Test any point to see which side is right.', pic: K.plot([{ f: x => x / 2 + 1, dash: true }], [{ x: 0, y: 0, label: '(0,0): 0 < 1 ✓' }], { xmin: -4, xmax: 4, ymin: -3, ymax: 4, h: 200 }) + '<p class="center small">y &lt; ½x + 1: the side containing (0, 0)</p>' }
  ]);

  // ---- 2.8 proportion ----
  L('a-prop', [
    { say: idea('<b>Direct proportion</b>: when one thing doubles, the other doubles (twice the people, twice the rice). <b>Inverse proportion</b>: when one thing doubles, the other <b>halves</b> (twice the friends sharing a pizza, half a slice each).') },
    { say: 'Inverse: share one pizza between more people.', anim: X([{ k: 'p', label: 'People', min: 1, max: 8, v: 2 }], v => `${K.pizzaPic(1, v.p)}<p class="center bigq">each gets ${fr(1, v.p)} of the pizza</p><p class="center small">people × share = 1 whole pizza, always</p>`) },
    { say: 'Direct: rice for a recipe.', anim: X([{ k: 'p', label: 'People', min: 1, max: 8, v: 2 }], v => `<p class="center bigq">${'🍚'.repeat(v.p)}</p><p class="center bigq">${v.p} people → ${v.p * 75} g rice</p><p class="center small">rice ÷ people = 75 g, always</p>`) },
    { say: `The thing that stays the same is called <b>k</b>. Direct: y = kx. Inverse: y = ${fr('k', 'x')}. Find k from one pair, then use it.`, ask: { q: '4 workers take 6 days. How long for 8 workers?', opts: ['3 days', '12 days', '6 days', '2 days'], a: 0, why: 'Inverse: twice the workers, half the time.' } },
    { say: 'Sometimes it\'s the <b>square</b>: the area of a square ∝ side². Double the side → 4 × the area.' }
  ]);

  // ---- 2.9 practical graphs ----
  L('a-practical', [
    { say: idea('A travel graph tells a <b>story</b>. Read it like a comic strip: going up means moving away, flat means stopped, and steeper means faster.') },
    { say: 'Amir walks to the shop, buys snacks, then runs home.', pic: K.plot([], [], { xmin: 0, xmax: 50, ymin: 0, ymax: 1200, segs: [{ pts: [[0, 0], [20, 1000], [30, 1000], [40, 0]] }], gstep: 10, lstep: 10, h: 200, xlab: 'min', ylab: 'm' }).replace('<polyline', '<polyline') + '<p class="center">Up: walking there · flat: in the shop · steep down: running home</p>', ask: { q: 'Which part was fastest?', opts: ['Running home', 'Walking there', 'In the shop'], a: 0, why: 'The steepest line covers distance in the least time.' } },
    { say: 'Speed–time graphs: distance = speed × time, which is the <b>area</b> of a rectangle. So the area under a speed–time graph is the distance!', anim: X([{ k: 'v', label: 'Speed (m/s)', min: 2, max: 10, v: 6 }, { k: 't', label: 'Time (s)', min: 2, max: 10, v: 5 }], v => `${K.plot([], [], { xmin: 0, xmax: 11, ymin: 0, ymax: 11, segs: [{ pts: [[0, v.v], [v.t, v.v], [v.t, 0]] }], h: 200 }).replace('</svg>', `<rect x="4" y="${196 - v.v / 11 * 192}" width="${v.t / 11 * 312}" height="${v.v / 11 * 192}" fill="var(--c2)" fill-opacity=".3"/></svg>`)}<p class="center bigq">area = ${v.v} × ${v.t} = ${v.v * v.t} m travelled</p>`) },
    { say: 'And the <b>slope</b> (gradient) of a speed–time graph is the <b>acceleration</b>: how much faster you get each second.' }
  ]);

  // ---- 2.10 graphs of functions ----
  L('a-graphs', [
    { say: idea('A graph is a <b>picture of every answer</b> to an equation. Each x gives one y; plot every (x, y) pair and they make a line or curve.') },
    { say: 'Slide x along y = x² − 2x − 3. Each x makes one point.', anim: X([{ k: 'x', label: 'x', min: -2, max: 4, step: 0.5, v: 0 }], v => { const y = v.x * v.x - 2 * v.x - 3; return `${K.plot([{ f: t => t * t - 2 * t - 3 }], [{ x: v.x, y, label: `(${n(v.x)}, ${n(y)})` }], { xmin: -3, xmax: 5, ymin: -5, ymax: 8, h: 220 })}<p class="center">x = ${n(v.x)} → y = (${n(v.x)})² − 2(${n(v.x)}) − 3 = <b>${n(y)}</b></p>`; }) },
    { say: 'So to <b>solve</b> x² − 2x − 3 = 0, look for the points where y is 0: where the curve crosses the x-axis.', ask: { q: 'From the graph, x² − 2x − 3 = 0 when…', opts: ['x = −1 or 3', 'x = −3', 'x = 0', 'x = 1'], a: 0 } },
    { say: 'To solve "curve = something else", draw both and find where they <b>meet</b>: at those points, both equations are true.' }
  ]);

  // ---- 2.11 sketching ----
  L('a-sketch', [
    { say: idea('Each type of equation has its own <b>shape</b>, and the shape comes from a reason. Know the reason and you\'ll recognise the graph.') },
    { say: 'Why is x² a U shape? Because squaring makes negatives positive, so both sides go up.', pic: K.plot([{ f: x => x * x }], [{ x: -2, y: 4, label: '(−2, 4)' }, { x: 2, y: 4, label: '(2, 4)' }], { xmin: -4, xmax: 4, ymin: -1, ymax: 9, h: 200 }) },
    { say: `Why does y = ${fr(1, 'x')} never touch the axes? You can't divide by 0, and 1 ÷ (big number) gets tiny but never reaches 0.`, anim: X([{ k: 'x', label: 'x', min: 0.1, max: 10, step: 0.1, v: 2, fmt: v => n(K.round(v, 1)) }], v => `${K.plot([{ f: t => 1 / t }], [{ x: v.x, y: 1 / v.x }], { xmin: -1, xmax: 10, ymin: -1, ymax: 10, h: 200 })}<p class="center bigq">1 ÷ ${n(K.round(v.x, 1))} = ${n(K.round(1 / v.x, 3))}</p><p class="center small">These lines it approaches but never touches are called <b>asymptotes</b>.</p>`) },
    { say: 'Exponential 2ˣ doubles every step, so it shoots up. Cubic x³ keeps the sign of x, so it goes from bottom-left to top-right.', ask: { q: 'A graph has two separate branches and never touches the axes. It is…', opts: ['reciprocal', 'quadratic', 'linear', 'cubic'], a: 0 } }
  ]);

  // ---- 2.12 functions ----
  L('a-func', [
    { say: idea('A function is a <b>machine</b>: one input in, exactly one output out. f(4) means "put 4 into machine f".') },
    { say: 'Machine f(x) = 2x + 3. Choose an input.', anim: X([{ k: 'x', label: 'Input x', min: -5, max: 10, v: 4 }], v => `${flow([String(v.x), '→', '× 2', '→', '+ 3', '→', String(2 * v.x + 3)])}<p class="center bigq">f(${v.x}) = ${2 * v.x + 3}</p>`) },
    { say: 'The <b>inverse</b> f⁻¹ is the machine run backwards: it takes the output back to the input.', pic: `${flow(['11', '→', '− 3', '→', '÷ 2', '→', '4'])}<p class="center bigq">f⁻¹(x) = ${fr('x − 3', 2)}</p>`, ask: { q: 'f(x) = x + 10. f⁻¹(15) = ?', opts: ['5', '25', '150', '1.5'], a: 0 } },
    { say: 'A <b>composite</b> function is two machines in a row. gf(x) means do <b>f first</b> (it\'s next to x), then g. Order matters, like socks then shoes.', pic: `${flow(['3', '→', 'f: + 2', '→', '5', '→', 'g: square', '→', '25'])}<p class="center">gf(3) = 25, but fg(3) = 3² + 2 = 11</p>` }
  ]);
})();
