// Simulated students. Run: node tests/simulate.js
// 100 seeded personas use the real lessons, generators and marker (R2O.checkAnswer). Each persona
// reads, answers lesson checks and practises in its favourite subject, typing answers the way that
// kind of student would. We log every point where the app makes learning harder than it should be.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { console, setTimeout, clearTimeout }; ctx.window = ctx; vm.createContext(ctx);
for (const f of [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"?]+)/g)].map(m => m[1]))
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const R = ctx.R2O, K = R.K;

// ---------- seeded randomness (so the run is repeatable) ----------
let seed = 20261101; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const pick = a => a[Math.floor(rnd() * a.length)], chance = p => rnd() < p;
const KR = K.rnd, KP = K.pick; // keep generators random but repeatable too
K.rnd = (a, b) => a + Math.floor(rnd() * (b - a + 1)); K.pick = a => a[Math.floor(rnd() * a.length)];
Math.random = rnd;

// ---------- text helpers ----------
const strip = s => String(s || '').replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<sub>(.*?)<\/sub>/g, '$1').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const words = s => (strip(s).match(/[A-Za-z']+/g) || []);
const syl = w => { w = w.toLowerCase().replace(/e$/, ''); const m = w.match(/[aeiouy]+/g); return Math.max(1, m ? m.length : 1); };
const fkGrade = s => { const w = words(s); const sent = Math.max(1, (strip(s).match(/[.!?](\s|$)/g) || []).length); if (w.length < 20) return null;
  return 0.39 * (w.length / sent) + 11.8 * (w.reduce((a, x) => a + syl(x), 0) / w.length) - 15.59; };
const lessonText = l => (l.scenes || []).map(s => [s.say, s.pic, s.ask && s.ask.q, s.ask && s.ask.opts.join(' ')].join(' ')).join(' ');

// ---------- personas ----------
const COUNTRIES = [['Pakistan', ['Ayesha', 'Hamza', 'Zainab', 'Bilal', 'Fatima', 'Usman', 'Hira', 'Ali']], ['Bangladesh', ['Nusrat', 'Rafi', 'Tania', 'Arif', 'Mim', 'Sakib']],
  ['India', ['Priya', 'Arjun', 'Sneha', 'Rahul', 'Kavya', 'Vikram']], ['Nigeria', ['Chiamaka', 'Tunde', 'Ngozi', 'Emeka', 'Aisha']], ['Kenya', ['Wanjiru', 'Otieno', 'Achieng', 'Kamau']],
  ['Zimbabwe', ['Tendai', 'Rudo', 'Farai', 'Nyasha']], ['Sri Lanka', ['Nimal', 'Ishara', 'Kasun']], ['Nepal', ['Sita', 'Bikash', 'Anjali']], ['Refugee camp', ['Amina', 'Yusuf', 'Hassan', 'Mariam']]];
const SUBJ_BY_INTEREST = { football: ['math', 'physics'], doctors: ['biology', 'chemistry'], games: ['computing', 'math'], stories: ['english', 'history'], nature: ['geography', 'biology'],
  building: ['physics', 'addmath'], money: ['math', 'addmath'], phones: ['computing', 'physics'], cooking: ['chemistry', 'biology'], maps: ['geography', 'history'], music: ['english', 'physics'], cars: ['physics', 'math'] };
const HABITS = ['reads every word', 'skims the text', 'jumps to the questions', 'plays with every slider', 'rushes and guesses', 'gives up when stuck', 'repeats until perfect', 'studies late at night, tired'];
const personas = [];
for (let i = 0; i < 100; i++) {
  const [country, names] = pick(COUNTRIES), interest = pick(Object.keys(SUBJ_BY_INTEREST));
  const p = {
    id: i + 1, name: pick(names), country, age: 14 + Math.floor(rnd() * 3), interest, subject: pick(SUBJ_BY_INTEREST[interest]),
    english: country === 'Refugee camp' ? 1 + Math.floor(rnd() * 3) : 1 + Math.floor(rnd() * 5),        // 1 = very weak, 5 = fluent
    prior: rnd() * (country === 'Refugee camp' ? .55 : .9) + .05,                                        // how much they already know (0–1)
    patience: 60 + Math.floor(rnd() * 400),                                                              // words they'll read before skimming
    resilience: 1 + Math.floor(rnd() * 5),                                                               // wrong-in-a-row before quitting the session
    habit: pick(HABITS), phone: pick(['iPhone', 'Android', 'Android', 'Android', 'Android', 'shared family Android']),
    width: pick([320, 360, 360, 393, 412]),
    // how this student types an answer they actually know (realistic habits)
    style: {
      units: chance(.35), commas: chance(.3), xEquals: chance(.15), roundsEarly: chance(.4), sciNotation: chance(.3),
      fractionAsDecimal: chance(.3), capitals: chance(.5), plural: chance(.2), americanSpelling: country === 'Refugee camp' ? chance(.3) : chance(.15), enDash: chance(.05), fullSentence: chance(.1)
    }
  };
  personas.push(p);
}

// ---------- how a persona types an answer they know ----------
const toFrac = v => { for (let q = 1; q <= 2000; q++) { const pp = Math.round(v * q); if (Math.abs(pp / q - v) < 1e-9) { const g = K.gcd(pp, q); return `${pp / g}/${q / g}`; } } return null; };
const sig = (v, n) => Number(Number(v).toPrecision(n));
const humanTyped = (q, st, science) => {
  const variants = []; // [label, text]
  if (q.kind === 'mcq') return [['tap', q.a]];
  if (q.kind === 'text') {
    let t = String(q.a);
    if (st.capitals) variants.push(['capital letters', t.toUpperCase()]);
    if (st.plural && /[a-z]$/i.test(t)) variants.push(['plural/singular', /s$/i.test(t) ? t.slice(0, -1) : t + 's']);
    if (st.americanSpelling) { const am = t.replace(/sulph/gi, 'sulf').replace(/aluminium/gi, 'aluminum').replace(/colour/gi, 'color').replace(/haemo/gi, 'hemo').replace(/oesoph/gi, 'esoph'); if (am !== t) variants.push(['US spelling', am]); }
    if (st.fullSentence) variants.push(['wrote a sentence', `The answer is ${t}`]);
    if (/^[01]+$/.test(t) && t.length < 8) variants.push(['leading zeros', t.padStart(8, '0')]);
    if (/^[01]{5,}$/.test(t) && t.startsWith('0')) variants.push(['dropped leading zeros', t.replace(/^0+(?=.)/, '')]);
    if (!variants.length) variants.push(['typed as shown', t]);
    return variants;
  }
  if (q.kind === 'nums') return [['list', q.a.map(v => String(K.round(v, 4))).join(st.commas ? ', ' : ' and ')]];
  const v = q.a;
  const tidy = Math.abs(v * 100 - Math.round(v * 100)) < 1e-6;              // exact to 2 d.p.: a careful student types it exactly
  let base = tidy ? String(K.round(v, 2)) : String(sig(v, 3));
  if (science && tidy && !Number.isInteger(K.round(v * 10, 6)) && st.roundsEarly) variants.push(['rounded to 1 d.p. (as in science exams)', String(K.round(v, 1))]);
  if (q.kind === 'frac') { const f = toFrac(v); base = st.fractionAsDecimal ? String(K.round(v, 2)) : (f || base); if (st.fractionAsDecimal) variants.push(['fraction as decimal', base]); }
  if (st.roundsEarly && !tidy) variants.push(['rounded to 2 s.f.', String(sig(v, 2))]);
  if (st.sciNotation && (Math.abs(v) >= 1e5 || (Math.abs(v) < 1e-3 && v !== 0))) { const e = Math.floor(Math.log10(Math.abs(v))); variants.push(['standard form', `${K.round(v / 10 ** e, 2)} × 10^${e}`]); }
  if (st.units && q.unit) variants.push(['added the unit', `${base} ${q.unit}`]);
  if (st.commas && Math.abs(v) >= 1000) variants.push(['thousands commas', Number(base).toLocaleString('en-US')]);
  if (st.xEquals) variants.push(['wrote "x ="', `x = ${base}`]);
  if (st.enDash && v < 0) variants.push(['phone typed – (en dash)', base.replace('-', '–')]);
  if (!variants.length) variants.push(['typed plainly', base]);
  return variants;
};
// The iPhone decimal keypad has digits and "." only, but the app shows − / . , buttons under every
// number answer (renderQ .kpad), so no answer is impossible to type. (The first run of this simulation
// wrongly counted these as blocked.)
const needsKey = () => null;

// ---------- run ----------
const subjLessons = sid => R.MODULES.filter(m => (m.subject || 'math') === sid).flatMap(m => m.lessons);
const log = { falseNeg: {}, nudged: {}, keypad: {}, hardRead: {}, longRead: {}, quits: [], repeats: {}, perPersona: [] };
const bump = (o, k, ex) => { o[k] = o[k] || { n: 0, ex: [] }; o[k].n++; if (ex && o[k].ex.length < 4) o[k].ex.push(ex); };
for (const p of personas) {
  const ls = subjLessons(p.subject); let done = 0, wrongRun = 0, quit = null, rights = 0, tries = 0, unfair = 0; const seenQ = new Map();
  const sessionLessons = p.habit === 'gives up when stuck' ? 3 : p.habit === 'repeats until perfect' ? 5 : 6;
  for (const l of ls.slice(0, sessionLessons)) {
    const text = lessonText(l), w = words(text).length, g = fkGrade(text);
    const readsAll = p.habit === 'reads every word' || p.habit === 'repeats until perfect';
    const skims = p.habit === 'jumps to the questions' || p.habit === 'rushes and guesses' || (!readsAll && w > p.patience);
    if (g && g > 4 + p.english * 1.6) bump(log.hardRead, `${p.subject}|${l.id}`, `${p.name} (${p.country}, English ${p.english}/5): reading grade ≈ ${g.toFixed(1)}`);
    if (skims && w > p.patience) bump(log.longRead, `${p.subject}|${l.id}`, `${p.name} skimmed: ${w} words, patience ≈ ${p.patience}`);
    // understanding: prior knowledge + reading + pictures
    const understood = Math.min(.97, p.prior * .5 + (skims ? .15 : .35) + (g && g > 4 + p.english * 1.6 ? -.15 : .1) + (p.habit === 'plays with every slider' ? .12 : 0) + (p.habit === 'studies late at night, tired' ? -.1 : 0));
    // practice: 8 questions
    const pool = [...new Set((l.easy || []).concat(l.gens))];
    for (let k = 0; k < 8; k++) {
      const gid = k < 3 && l.easy ? pick(l.easy) : pick(pool);
      let q; try { q = R.GEN[gid](); } catch (e) { continue; }
      const key = strip(q.q).slice(0, 140); seenQ.set(key, (seenQ.get(key) || 0) + 1); if (seenQ.get(key) === 2) bump(log.repeats, `${p.subject}|${gid}`, key.slice(0, 90));
      tries++;
      const knows = p.habit === 'rushes and guesses' ? chance(understood * .6) : chance(understood);
      let correct = false;
      if (knows) {
        const kp = needsKey(q, p.phone);
        if (kp) { bump(log.keypad, `${p.subject}|${gid}`, `${p.name} on iPhone needed ${kp}`); unfair++; }
        else {
          const [label, typed] = pick(humanTyped(q, p.style, !['math', 'addmath'].includes(p.subject)));
          const ok = R.checkAnswer(q, typed);
          if (ok === true) correct = true;
          else if (ok === 'pad' || ok === 'moreSF' || ok === 'simplify') { correct = true; bump(log.nudged, label); } // gentle nudge, then they fix it
          else { unfair++; bump(log.falseNeg, label, `${p.subject} · ${gid}: typed "${typed}", expected ${q.kind === 'text' ? '"' + q.a + '"' : K.round(q.a, 6)}${q.unit ? ' ' + q.unit : ''}`); }
        }
      } else if (q.kind === 'mcq') correct = chance(1 / (q.choices || [1, 2, 3, 4]).length);
      if (correct) { rights++; wrongRun = 0; } else wrongRun++;
      if (wrongRun >= p.resilience + 2 && p.habit !== 'repeats until perfect') { quit = `${l.title} (after ${wrongRun} wrong in a row)`; break; }
    }
    if (quit) break; done++;
  }
  if (quit) log.quits.push({ who: `${p.name}, ${p.age}, ${p.country}`, subject: p.subject, habit: p.habit, english: p.english, at: quit });
  log.perPersona.push({ ...p, lessons: done, quit: !!quit, accuracy: tries ? Math.round(rights / tries * 100) : 0, unfair });
}

// ---------- whole-app checks the personas expose ----------
const all = R.MODULES.flatMap(m => m.lessons.map(l => ({ ...l, subj: m.subject || 'math' })));
const reading = all.map(l => ({ id: l.id, subj: l.subj, w: words(lessonText(l)).length, g: fkGrade(lessonText(l)) }));
const bySubj = {}; reading.forEach(r => { const b = bySubj[r.subj] = bySubj[r.subj] || { n: 0, w: 0, g: 0, gn: 0, hard: 0 }; b.n++; b.w += r.w; if (r.g) { b.g += r.g; b.gn++; if (r.g > 10) b.hard++; } });
const variety = {}; for (const id of Object.keys(R.GEN)) { const s = new Set(); for (let i = 0; i < 40; i++) { try { s.add(strip(R.GEN[id]().q)); } catch (e) { } } variety[id] = s.size; }
const lowVariety = Object.entries(variety).filter(([, v]) => v <= 8).sort((a, b) => a[1] - b[1]);
let negAns = 0, fracAns = 0, multiAns = 0, numQs = 0;
for (const id of Object.keys(R.GEN)) for (let i = 0; i < 10; i++) { let q; try { q = R.GEN[id](); } catch (e) { continue; } if (q.kind === 'mcq' || q.kind === 'text') continue; numQs++; if (q.kind === 'nums') multiAns++; else if (q.a < 0) negAns++; else if (q.kind === 'frac' && !Number.isInteger(q.a)) fracAns++; }

const out = { personas: log.perPersona, falseNeg: log.falseNeg, keypad: log.keypad, hardRead: log.hardRead, longRead: log.longRead, quits: log.quits, repeats: log.repeats,
  reading: bySubj, lowVariety, keypadShare: { numQs, negAns, fracAns, multiAns } };
fs.writeFileSync(path.join(__dirname, 'simulate_out.json'), JSON.stringify(out, null, 1));

// ---------- summary ----------
const sum = o => Object.values(o).reduce((a, x) => a + x.n, 0);
console.log(`Students: ${personas.length}. Finished their session: ${personas.length - log.quits.length}. Quit early: ${log.quits.length}.`);
console.log(`Correct answers marked WRONG: ${sum(log.falseNeg)}`); Object.entries(log.falseNeg).sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) => console.log(`  ${v.n} × ${k}  e.g. ${v.ex[0]}`));
console.log(`Right value, nudged to fix the format instead of marked wrong: ${sum(log.nudged)}`); Object.entries(log.nudged).forEach(([k, v]) => console.log(`  ${v.n} × ${k}`));
console.log(`Answers an iPhone keypad cannot type: ${sum(log.keypad)} (numeric questions sampled: ${numQs}; negative ${negAns}, fraction ${fracAns}, multi-answer ${multiAns})`);
console.log(`Lessons too hard to read for that student: ${sum(log.hardRead)} events in ${Object.keys(log.hardRead).length} lessons`);
console.log(`Long lessons skimmed: ${sum(log.longRead)} events in ${Object.keys(log.longRead).length} lessons`);
console.log(`Same practice question seen twice in one session: ${sum(log.repeats)}`);
console.log('Reading by subject (avg words per lesson / avg reading grade / lessons above grade 10):');
for (const [s, b] of Object.entries(bySubj)) console.log(`  ${s}: ${Math.round(b.w / b.n)} words, grade ${(b.g / b.gn).toFixed(1)}, ${b.hard} hard`);
console.log(`Generators with ≤ 8 different questions in 40 draws: ${lowVariety.length}`);
console.log('Quits by habit:', JSON.stringify(log.quits.reduce((a, q) => (a[q.habit] = (a[q.habit] || 0) + 1, a), {})));
console.log('Quits by English level:', JSON.stringify(log.quits.reduce((a, q) => (a[q.english] = (a[q.english] || 0) + 1, a), {})));
