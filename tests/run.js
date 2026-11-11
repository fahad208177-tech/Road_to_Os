// Self-test for Road to O's. Run: node tests/run.js
// Loads every script in a sandbox, runs every question generator many times, and checks that
// (1) questions are well formed, (2) the stored correct answer is accepted by the marker,
// (3) lesson quick-checks point at a real option, (4) Syllabuddy gives the right verdicts.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { console, setTimeout, clearTimeout, btoa, atob };
ctx.window = ctx; vm.createContext(ctx);
const files = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"?]+)/g)].map(m => m[1]);
for (const f of files)
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const R = ctx.R2O, K = R.K;
let fails = 0; const fail = (...m) => { fails++; if (fails < 60) console.log('FAIL', ...m); };
const strip = s => String(s).replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const toFrac = v => { // value -> "p/q" with small denominator
  for (let q = 1; q <= 20000; q++) { const p = Math.round(v * q); if (Math.abs(p / q - v) < 1e-9) { const g = K.gcd(p, q); return `${p / g}/${q / g}`; } }
  return String(v);
};
const typed = q => {
  if (q.kind === 'mcq' || q.kind === 'text') return q.a;
  if (q.kind === 'frac') return toFrac(q.a);
  if (q.kind === 'nums') return q.a.map(v => Number.isInteger(K.round(v, 9)) ? String(K.round(v, 9)) : (q.tol ? String(K.round(v, 4)) : toFrac(v))).join(', ');
  if (q.show && q.tol) return strip(q.show).replace(/^\$/, '').replace(/[^\d.\-−  ]/g, '').trim();
  return String(K.round(q.a, 10));
};
const BAD = /\bNaN\b|undefined|Infinity|\[object/; // whole word: sodium nitrate is NaNO3
let lessons = 0, gens = new Set(), runs = 0, scened = 0, explorers = 0;
R.MODULES.forEach(m => m.lessons.forEach(l => {
  lessons++;
  if (!l.gens || !l.gens.length) fail(l.id, 'no generators');
  
  (l.learn || []).forEach((c, i) => { if (c.check && !(c.check.a >= 0 && c.check.a < c.check.opts.length)) fail(l.id, 'card', i, 'check index out of range'); });
  (l.scenes || []).forEach((s, i) => {
    if (s.ask && !(s.ask.a >= 0 && s.ask.a < s.ask.opts.length)) fail(l.id, 'scene', i, 'ask index out of range');
    if (s.anim && !R.ANIM[s.anim.type]) fail(l.id, 'scene', i, 'unknown anim', s.anim.type);
    if (BAD.test([s.say, s.pic, s.ask && s.ask.q, ...(s.anim && s.anim.stages || [])].join(' '))) fail(l.id, 'scene', i, 'bad text');
  });
  if (l.scenes) scened++; else fail(l.id, 'no concept scenes');
  if (l.scenes && !l.scenes.some(s => /class="idea"/.test(s.say || ''))) fail(l.id, 'no big-idea step');
  (l.scenes || []).forEach((s, i) => {
    if (!(s.anim && s.anim.type === 'explore')) return;
    explorers++;
    const vals = {}; s.anim.controls.forEach(c => vals[c.k] = c.v);
    const tries = [vals, ...s.anim.controls.map(c => ({ ...vals, [c.k]: c.min })), ...s.anim.controls.map(c => ({ ...vals, [c.k]: c.max }))];
    for (const v of tries) { let h; try { h = s.anim.draw(v); } catch (e) { fail(l.id, 'explore', i, 'threw', e.message); break; } if (BAD.test(h)) { fail(l.id, 'explore', i, 'bad output', JSON.stringify(v)); break; } }
  });
  [...(l.gens || []), ...(l.easy || [])].forEach(g => {
    gens.add(g);
    if (!R.GEN[g]) return fail(l.id, 'missing generator', g);
    for (let i = 0; i < 400; i++) {
      runs++;
      let q; try { q = R.GEN[g](); } catch (e) { fail(g, 'threw', e.message); break; }
      const text = [q.q, q.hint, ...(q.steps || []), ...(q.choices || []), q.show, q.after].join(' ');
      if (BAD.test(text)) { fail(g, 'bad text', strip(text).slice(0, 200)); break; }
      if (!['num', 'frac', 'nums', 'mcq', 'text'].includes(q.kind)) { fail(g, 'kind', q.kind); break; }
      if (q.kind === 'mcq') {
        if (!q.choices.includes(q.a)) { fail(g, 'answer not in choices', q.a, q.choices); break; }
        if (new Set(q.choices).size !== q.choices.length || q.choices.length < 2) { fail(g, 'choices', q.choices); break; }
      } else if (q.kind === 'nums') { if (!q.a.every(Number.isFinite)) { fail(g, 'nums', q.a); break; } }
      else if (q.kind !== 'text' && !Number.isFinite(q.a)) { fail(g, 'answer', q.a); break; }
      const t = typed(q); const ok = R.checkAnswer(q, t);
      if (ok !== true) { fail(g, 'own answer rejected:', JSON.stringify(t), 'a=', JSON.stringify(q.a), 'result', ok, strip(q.q).slice(0, 120)); break; }
    }
  });
}));
console.log(`${R.MODULES.length} modules, ${lessons} lessons (${scened} with concept scenes, ${explorers} explorers), ${gens.size} generators, ${runs} questions generated`);

// objectives covered by at least one lesson
R.SUBJECTS.filter(S => R.MODULES.some(m => m.subject === S.id)).forEach(S => {
  const objs = S.syl.objectives || [];
  const uncovered = objs.filter(o => !R.lessonsFor(o.id, S.id).length).map(o => o.id);
  if (uncovered.length) fail(S.id, 'objectives without a lesson:', uncovered.join(', ')); else console.log(`${S.short}: all ${objs.length} syllabus objectives have a lesson`);
  R.MODULES.filter(m => m.subject === S.id).forEach(m => m.lessons.forEach(l => (l.obj || []).forEach(o => { if (!R.objective(o, S.id)) fail(l.id, 'objective not in', S.id, 'syllabus:', o); })));
});

// step-by-step written methods must reach the right answer, and the final grid must show it
const CF = R.colFrames; let walks = 0;
const gridNum = f => Number([...f.res].reverse().join('')) ;
for (let i = 0; i < 3000; i++) {
  const a = K.rnd(1, 99999), b = K.rnd(1, 99999), d = K.rnd(2, 9), x = Math.max(a, b), y = Math.min(a, b);
  const add = CF.add(a, b), sub = CF.sub(x, y), mul = CF.mul(a, d), div = CF.div(a, d); walks += 4;
  if (add.answer !== a + b || gridNum(add[add.length - 1]) !== a + b) fail('walk add', a, b, gridNum(add[add.length - 1]));
  if (sub.answer !== x - y || (gridNum(sub[sub.length - 1]) || 0) !== x - y) fail('walk sub', x, y, gridNum(sub[sub.length - 1]));
  if (mul.answer !== a * d || gridNum(mul[mul.length - 1]) !== a * d) fail('walk mul', a, d, gridNum(mul[mul.length - 1]));
  const dl = div[div.length - 1]; if (div.answer !== Math.floor(a / d) || Number(dl.ans.join('')) !== Math.floor(a / d) || div.rem !== a % d) fail('walk div', a, d, dl.ans.join(''));
  if ([add, sub, mul, div].some(F => F.some(f => BAD.test(f.text + (f.pic || ''))))) fail('walk text', a, b, d);
}
console.log(`${walks} step-by-step walkthroughs checked`);

// answer parser edge cases
const P = (q, s, want) => { const r = R.checkAnswer(q, s); if (r !== want) fail('checkAnswer', JSON.stringify(s), 'expected', want, 'got', r); };
P({ kind: 'num', a: 1500 }, '1 500', true); P({ kind: 'num', a: 1500 }, '1,500', true); P({ kind: 'num', a: -3 }, 'x = −3', true);
P({ kind: 'frac', a: 0.75, simplest: true }, '6/8', 'simplify'); P({ kind: 'frac', a: 0.75, simplest: true }, '3/4', true); P({ kind: 'frac', a: 2.75 }, '2 3/4', true);
P({ kind: 'nums', a: [2, -1], ordered: true }, 'x = 2, y = −1', true); P({ kind: 'nums', a: [2, -1], ordered: true }, '-1, 2', false); P({ kind: 'nums', a: [3, -5] }, 'x=-5 or x=3', true);
P({ kind: 'text', a: '14 05', accept: ['1405', '14 05'] }, '14:05', true);
P(Object.assign({ kind: 'num' }, K.acc3(12.3456)), '12.3', true); P(Object.assign({ kind: 'num' }, K.acc3(12.3456)), '12.4', false); P(Object.assign({ kind: 'num' }, K.acc3(12.3456)), '12.35', true);

// kinder marking: right value written a different way gets a nudge or is accepted
P({ kind: 'text', a: '00010001' }, '10001', 'pad'); P({ kind: 'text', a: '00010001' }, '00010001', true);
P({ kind: 'text', a: 'B8' }, 'The answer is B8', true); P({ kind: 'text', a: '1010' }, 'x = 1010', true); P({ kind: 'text', a: 'B8' }, 'B9', false);
P({ kind: 'num', a: -7 }, '–7', true); P({ kind: 'num', a: -7 }, '—7', true);
P(Object.assign({ kind: 'num' }, K.acc3(8.571428)), '8.6', 'moreSF'); P(Object.assign({ kind: 'num' }, K.acc3(8.571428)), '8.57', true); P({ kind: 'num', a: 47 }, '50', false);
const sq = R.SCI.num('q', 63.62, ''); P(sq, '63.6', true); P(sq, '63.62', true); P(sq, '63.7', false);

// pathways, careers, English check
Object.entries(R.PRE).forEach(([id, pre]) => { if (!R.lesson(id)) fail('pre: no lesson', id); pre.forEach(p => { if (!R.lesson(p)) fail('pre: missing lesson', id, '→', p); }); });
R.CAREERS.forEach(c => c.need.forEach(s => { if (!R.SUBJECTS.some(x => x.id === s)) fail('career subject missing', c.id, s); }));
R.ENGTEST.forEach(g => { if (!R.GEN[g]) fail('English check generator missing', g); });
if (R.ENGTEST.length * 2 < 20) fail('English check needs 20 distinct draws');
Object.entries(R.GLOSS).forEach(([k, v]) => { if (!v || v.length > 140) fail('glossary', k); });

// writing marker: model answers beat weak ones, empty scores 0, no broken text
const wscores = [];
R.WTASKS.forEach(t => {
  (t.lessons || []).forEach(l => { if (!R.lesson(l)) fail('writing task lesson missing', t.id, l); });
  if (!R.SUBJECTS.some(s => s.id === t.subj)) fail('writing task subject', t.id);
  const m = R.markWriting(t.model, t), e = R.markWriting('', t), weak = R.markWriting('i like it. it is good. i like it alot u know', t);
  if (!(m.score > weak.score)) fail('writing: model not better than a weak answer', t.id, m.score, weak.score);
  if (e.score !== 0) fail('writing: empty answer not 0', t.id, e.score);
  if ([m, weak].some(r => BAD.test(JSON.stringify(r)))) fail('writing: bad text', t.id);
  if (!weak.next.length) fail('writing: weak answer got no next steps', t.id);
  wscores.push(`${t.id} ${m.score}/${weak.score}`);
});
const fl = R.WTASKS.find(t => t.id === 'ge-w-floods'), flm = R.markWriting(fl.model, fl); if (flm.score < 60 || flm.marks < 4) fail('floods model scored too low', flm.score, flm.marks);
const sp = R.markWriting('I beleive the goverment should act becuase it is neccessary.', fl); if (!sp.issues.some(i => i.w === 'beleive') || !sp.issues.some(i => i.w === 'goverment')) fail('spelling not caught', JSON.stringify(sp.issues));
console.log(`${R.WTASKS.length} writing tasks marked (model/weak %): ${wscores.join(', ')}`);

// backup code round trip
const code = R.backupCode(); if (R.restoreCode(code) !== true) fail('backup round trip'); if (R.restoreCode('nonsense') === true || R.restoreCode('R2O1.abc') === true) fail('backup accepts junk');

// Syllabuddy verdicts
const B = q => strip(R.buddy.answer(q).html || '');
const expect = (q, re) => { const a = B(q).replace(/\s+/g, " "); if (!re.test(a)) fail('buddy', JSON.stringify(q), '→', a.slice(0, 160)); };
expect('Is matrices on my exam?', /Not examinable.*Matrices were removed/);
expect('Do I need logarithms?', /Not examinable.*logarithms/i);
expect('is loci examinable', /Not examinable.*Loci/);
expect('Is completing the square examinable?', /Examinable.*2\.2/);
expect('is the sine rule on the syllabus', /Examinable.*6\.3/);
expect('are histograms tested', /Examinable.*9\.7/);
expect('is ratio on my exam', /Examinable.*1\.11/);
expect('is increasing a quantity by a given ratio examinable', /Not examinable.*ratio/i);
expect('do I need to construct a perpendicular bisector', /Not examinable.*bisector/);
expect('is the equation of the perpendicular bisector examinable', /Examinable.*3\.7/);
expect('is differentiation on o level', /Not examinable.*Calculus/);
expect('is standard deviation on the exam', /Not examinable.*Standard deviation/);
expect('is the alternate segment theorem examinable', /Examinable.*4\.7/);
expect('do i need to know hcf', /Examinable.*1\.1/);
expect('is quantum chromodynamics on my exam', /Not found/);
expect('Is the quadratic formula given?', /Given on the paper/);
expect('is the formula for compound interest given', /learn it/);
expect('is pythagoras formula given', /learn it/);
expect('Explain surds', /Surds.*nutshell/);
expect('what should I revise first', /revision list/i);
expect('can I use a calculator', /Paper 1/);
const ex = R.buddy.answer('My exam is 1 June 2027'); if (!/Saved/.test(ex.html)) fail('exam date not saved');
const qz = R.buddy.answer('quiz me on percentages'); if (qz.quiz !== 'percentages') fail('quiz topic parse', JSON.stringify(qz));

// Syllabuddy follows the open subject
R.setSubject('physics');
expect('Is specific latent heat on my exam?', /Not examinable.*latent heat/i);
expect('is the hubble constant examinable', /Not examinable.*Hubble/);
expect('do I need suvat equations', /Not examinable/);
expect('Is half-life examinable?', /Examinable.*5\.2\.5/);
expect('is total internal reflection on my exam', /Examinable.*3\.2\.2/);
expect('do i need to know the transformer equation', /Examinable.*4\.5\.6/);
expect('is p1v1 = p2v2 on the exam', /Examinable.*2\.1\.2/);
expect('Is there a formula sheet?', /no formula sheet/);
expect('is matrices on my exam', /Not found/);
expect('Explain half-life', /Half-life.*nutshell/);
R.setSubject('chemistry');
expect("Is Hess's law on my exam?", /Not examinable.*Hess/);
expect('are orbitals examinable', /Not examinable.*shells/);
expect('do I need to know hydrogen bonding', /Not examinable.*intermolecular/);
expect('Do I need to know the Haber process?', /Examinable.*6\.3/);
expect('is electroplating on my exam', /Examinable.*4\.1/);
expect('are flame tests examinable', /Examinable.*12\.5/);
expect('Explain the mole', /nutshell/);
R.setSubject('biology');
expect('Is the Krebs cycle on my exam?', /Not examinable.*respiration/);
expect('are the stages of mitosis examinable', /Not examinable.*stages/);
expect('do i need dihybrid crosses', /Not examinable.*Monohybrid/);
expect('Do I need to know Punnett squares?', /Examinable.*17\.3/);
expect('is the menstrual cycle on my exam', /Examinable.*16\.4/);
expect('is eutrophication examinable', /Examinable.*19\.4/);
expect('Explain osmosis', /nutshell/);
R.setSubject('addmath');
expect('Are double angle formulae on my exam?', /Not examinable.*Compound and double/);
expect('Is integration by parts examinable?', /Not examinable.*by parts/);
expect('do i need points of inflexion', /Not examinable.*inflexion/);
expect('is the binomial theorem examinable', /Examinable.*12\./);
expect('is the remainder theorem on my exam', /Examinable.*3\.1/);
expect('Is the quadratic formula given?', /given/i);
R.setSubject('computing');
expect('Is object-oriented programming examinable?', /Not examinable.*Object-oriented/);
expect('do i need binary search', /Not examinable.*linear search/);
expect("Is two's complement on my exam?", /Examinable.*1\.1/);
expect('Do I need to know SQL?', /Examinable.*9/);
expect('are logic gates on the exam', /Examinable.*10/);
expect('Explain packet switching', /nutshell/);
R.setSubject('geography');
expect('Is glaciation on my exam?', /Not examinable.*Glaciation/);
expect('are weather instruments like the anemometer examinable', /Not examinable/);
expect('Do I need to know the Bradshaw model?', /Examinable.*1\./);
expect('Is the demographic transition model examinable?', /Examinable.*6\./);
expect('are grid references on my exam', /Examinable/);
R.setSubject('history');
expect('Is the French Revolution of 1789 on my exam?', /Not examinable.*1848/);
expect('Do I need to study Option A and B?', /EITHER/);
expect('Is the Cuban Missile Crisis examinable?', /Examinable.*B5/);
expect('is the treaty of versailles on my exam', /Examinable.*B1/);
expect('Is Stalingrad examinable?', /Examinable.*DE/);
R.setSubject('math');
expect('Is matrices on my exam?', /Not examinable.*Matrices were removed/);

console.log(fails ? `\n${fails} problem(s) found` : '\nAll checks passed ✓');
process.exit(fails ? 1 : 0);
