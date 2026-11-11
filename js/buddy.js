// Syllabuddy inside Road to O's.
// A browser port of the Syllabuddy idea: answers "is this on my exam?" straight from the
// official 4024 syllabus, never by guessing. No language model and no server: exclusions and
// removed topics are matched first, then BM25 search over every learning objective decides
// whether a topic is examinable. It also explains topics (from the lesson's key points),
// quizzes you on your weakest objective, tells you which formulas are on the paper, and
// keeps your exam countdown.
(() => {
  const K = R2O.K, esc = s => R2O.esc(s);
  // Everything follows the subject that is open: R2O.curSyl() is that subject's syllabus.
  const SUB = () => R2O.subject(), sylNow = () => R2O.curSyl();
  let SYL = sylNow();
  const $ = (s, e = document) => e.querySelector(s);

  // ---------------- search index ----------------
  const STOP = new Set(('a an the is are am be was were do does did i me my we you your it its of on in at to for from with and or not no ' +
    'what which who how when where why can could should would will shall may might must need needs know learn study revise ' +
    'exam exams examinable examined tested test syllabus syllabi o level olevel 4024 5054 5070 5090 4037 2210 1123 2217 2147 maths math mathematics physics chemistry biology computing computer science english geography history additional topic topics part ' +
    'this that these those there their they them about any some come came out paper papers required require include included ' +
    'question questions please tell explain teach show help define meaning mean whats whats if have has got get also still really').split(' '));
  const SYN = { hcf: 'highest common factor', lcm: 'lowest common multiple', gcd: 'highest common factor', bodmas: 'order of operations', bidmas: 'order of operations',
    pemdas: 'order of operations', sohcahtoa: 'sine cosine tangent', soh: 'sine', cah: 'cosine', toa: 'tangent', sin: 'sine', cos: 'cosine', tan: 'tangent',
    trig: 'trigonometry', pythag: 'pythagoras', sd: 'standard deviation', iqr: 'interquartile range', factorize: 'factorise', factorization: 'factorise',
    factorisation: 'factorise', rearrange: 'change the subject', rearranging: 'change the subject', percent: 'percentage', '%': 'percentage', sqrt: 'square root',
    stats: 'statistics', prob: 'probability', simultaneous: 'simultaneous equations', quadratics: 'quadratic', graph: 'graph', vector: 'vectors', surd: 'surds',
    venn: 'venn diagram', bearing: 'bearings', indices: 'indices', powers: 'indices', exponent: 'indices', exponents: 'indices', fractions: 'fraction',
    ratios: 'ratio', angle: 'angles', circles: 'circle', speed: 'speed', inequality: 'inequalities', sequence: 'sequences', function: 'functions', inverse: 'inverse' };
  const stem = w => w.length < 4 ? w : w.replace(/(ies)$/, 'y').replace(/(ising|izing)$/, 'ise').replace(/(ised|ized)$/, 'ise').replace(/ize$/, 'ise').replace(/(ing|ed)$/, '').replace(/(es|s)$/, '').replace(/e$/, '');
  const tokens = text => {
    const raw = String(text).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9%²³ ]+/g, ' ').split(/\s+/).filter(Boolean);
    const out = [];
    raw.forEach(w => { const s = SYN[w]; if (s) s.split(' ').forEach(x => out.push(x)); else out.push(w); });
    return out.filter(w => !STOP.has(w) && w.length > 1).map(stem);
  };

  let IDX = null; const IDXS = {};
  const build = () => {
    const docs = SYL.objectives.map(o => {
      const lessons = R2O.lessonsFor(o.id);
      const text = [o.t, o.t, o.t, ...(o.los || []), ...(o.notes || []), o.kw || '', o.kw || '', ...lessons.map(l => l.title + ' ' + (l.keys || []).join(' ').replace(/<[^>]+>/g, ' '))].join(' ');
      const tf = {}; const toks = tokens(text); toks.forEach(t => tf[t] = (tf[t] || 0) + 1);
      return { o, tf, len: toks.length };
    });
    const df = {}; docs.forEach(d => Object.keys(d.tf).forEach(t => df[t] = (df[t] || 0) + 1));
    const N = docs.length, avg = docs.reduce((s, d) => s + d.len, 0) / N;
    const idf = t => Math.log(1 + (N - (df[t] || 0) + 0.5) / ((df[t] || 0) + 0.5));
    IDX = IDXS[SUB().id] = { docs, df, N, avg, idf };
  };
  const search = q => {
    SYL = sylNow(); IDX = IDXS[SUB().id]; if (!IDX) build();
    const qt = [...new Set(tokens(q))]; if (!qt.length) return { qt, hits: [] };
    const k1 = 1.4, b = 0.75;
    const hits = IDX.docs.map(d => {
      let score = 0, cover = 0, total = 0;
      qt.forEach(t => {
        const w = IDX.idf(t); total += w;
        const f = d.tf[t] || 0; if (!f) return;
        cover += w; score += w * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / IDX.avg));
      });
      return { o: d.o, score, conf: total ? cover / total : 0 };
    }).filter(h => h.score > 0).sort((a, b) => b.score - a.score);
    return { qt, hits };
  };

  // ---------------- answers ----------------
  const card = (o, verdict) => {
    const ls = R2O.lessonsFor(o.id);
    const badge = { yes: '<span class="verdict yes">Examinable</span>', excl: '<span class="verdict no">Not examinable</span>', unclear: '<span class="verdict maybe">Closest match</span>', info: '' }[verdict] || '';
    return `<div class="objcard">${badge}
      <div class="objt"><b>${o.id} ${esc(o.t)}</b><span class="muted"> (${esc((SYL.areas || [])[o.a] || '')})</span></div>
      <div class="muted small">The syllabus says candidates should be able to:</div>
      <ul>${o.los.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${o.notes && o.notes.length ? `<details><summary>Notes and examples</summary><ul>${o.notes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}
      ${o.ex && o.ex.length ? `<div class="excl">${o.ex.map(esc).join('<br>')}</div>` : ''}
      <div class="src"><a href="${SYL.url}#page=${o.p}" target="_blank" rel="noopener">Source: ${SYL.code} syllabus, page ${o.p}<span class="vh"> (opens in a new tab)</span></a></div>
      <div class="acts">${ls.map(l => `<a class="btn small primary" href="#/lesson/${l.id}">Open lesson: ${esc(l.title)}</a>`).join('')}
        ${ls.length ? `<button class="btn small ghost" data-quiz="${o.id}">Quiz me on this</button>` : ''}</div></div>`;
  };

  const examinable = (topic, raw = '') => {
    const t = topic.toLowerCase();
    SYL = sylNow();
    for (const x of SYL.offSyllabus || []) {
      // entries marked raw also see the whole question, because years like 1789 are stripped from the topic
      if (x.k.test(t) || (x.raw && x.k.test(raw))) {
        const o = x.obj && R2O.objective(x.obj);
        return `<p><span class="verdict no">Not examinable</span></p><p>${esc(x.why)}</p>${o ? card(o, 'info') : ''}`;
      }
    }
    const { qt, hits } = search(topic);
    if (!qt.length) return `<p>Which topic do you mean? Try something like <i>"Is completing the square on my exam?"</i></p>`;
    const top = hits[0];
    if (!top || top.conf < 0.34) return `<p><span class="verdict none">Not found in the syllabus</span></p><p>I couldn't find <b>${esc(topic)}</b> anywhere in the ${SYL.code} syllabus, so it's most likely <b>not examinable</b>. If your teacher says otherwise, check the <a href="${SYL.url}" target="_blank" rel="noopener">official syllabus</a>.</p>`;
    // An exclusion statement inside the matched objective wins only when the question uses a word
    // that the exclusion has and the included content doesn't ("increasing by a ratio" vs "ratio").
    const o = top.o;
    if (o.ex) {
      const inc = new Set(tokens([o.t, ...(o.los || []), o.kw || ''].join(' ')));
      for (const e of o.ex) {
        const et = new Set(tokens(e)); const hit = qt.filter(w => et.has(w));
        if (hit.length >= Math.ceil(qt.length * 0.6) && hit.some(w => !inc.has(w))) return `<p><span class="verdict no">Not examinable</span></p><p>${esc(e)}</p>${card(o, 'info')}`;
      }
    }
    const conf = top.conf >= 0.6 ? 'yes' : 'unclear';
    const also = hits.slice(1, 3).filter(h => h.conf >= 0.5 && h.score > top.score * 0.6);
    return (conf === 'yes' ? `<p>Yes, <b>${esc(topic)}</b> is in the syllabus.</p>` : `<p>I'm not completely sure what you mean by <b>${esc(topic)}</b>. This is the closest part of the syllabus:</p>`) +
      card(o, conf) + (also.length ? `<p class="muted small">Also related: ${also.map(h => `<button class="link" data-obj="${h.o.id}">${h.o.id} ${esc(h.o.t)}</button>`).join(', ')}</p>` : '');
  };

  const explain = topic => {
    const t = topic.toLowerCase();
    SYL = sylNow();
    for (const x of SYL.offSyllabus || []) if (x.k.test(t)) return `<p><span class="verdict no">Not examinable</span></p><p>${esc(x.why)}</p>`;
    const { hits } = search(topic); const top = hits[0];
    if (!top || top.conf < 0.34) return `<p>I couldn't match <b>${esc(topic)}</b> to the ${SYL.code} syllabus. Try another word for it, or browse the road.</p>`;
    const ls = R2O.lessonsFor(top.o.id); const l = ls[0];
    if (!l) return card(top.o, 'yes');
    return `<p><b>${esc(l.title)}</b>, in a nutshell:</p><ul class="keys">${(l.keys || []).map(k => `<li>${k}</li>`).join('')}</ul>
      <div class="acts"><a class="btn small primary" href="#/lesson/${l.id}">Open the full lesson</a><button class="btn small ghost" data-quiz="${top.o.id}">Quiz me on this</button><button class="btn small ghost" data-obj="${top.o.id}">What the syllabus says</button></div>`;
  };

  const formula = topic => {
    const t = topic.toLowerCase(); SYL = sylNow();
    // "Are double angle formulae on my exam?" is really an examinable question about an excluded topic
    const off = (SYL.offSyllabus || []).find(x => x.k.test(t));
    if (off) return `<p><span class="verdict no">Not examinable</span></p><p>${esc(off.why)}</p>`;
    if (!SYL.formulaFacts) return SYL.formulaNote || `<p>There is no formula sheet for ${esc(SYL.code)}.</p>`;
    const f = SYL.formulaFacts.find(x => x.k.test(t));
    if (!f) return `<p>These formulas are printed on page 2 of <b>both</b> papers:</p><ul>${SYL.givenFormulas.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="muted small">Anything not on this list (for example speed = distance ÷ time, percentages, Pythagoras, SOH CAH TOA, area of a trapezium) you need to know yourself.</p>`;
    return `<p>${f.given ? '<span class="verdict yes">Given on the paper</span>' : '<span class="verdict maybe">You need to learn it</span>'}</p><p>${esc(f.text)}</p>${R2O.objective(f.obj) ? `<p class="muted small">Syllabus topic ${f.obj}: ${esc(R2O.objective(f.obj).t)}</p>` : ''}`;
  };

  const revise = () => {
    const st = R2O.state(); const rows = [];
    SYL = sylNow(); const MODS = R2O.subjMods();
    MODS.forEach(m => m.lessons.forEach(l => { const s = st.L[l.id]; if (s && s.a) rows.push({ l, acc: s.c / s.a, a: s.a }); }));
    rows.sort((a, b) => a.acc - b.acc || b.a - a.a);
    const weak = rows.filter(r => r.acc < 0.8).slice(0, 5);
    const unseen = []; MODS.forEach(m => m.lessons.forEach(l => { if (!st.L[l.id] || !st.L[l.id].a) unseen.push(l); }));
    const days = st.exam ? Math.ceil((new Date(st.exam) - new Date()) / 864e5) : null;
    const seenObjs = new Set(); MODS.forEach(m => m.lessons.forEach(l => { if (st.L[l.id] && st.L[l.id].a) (l.obj || []).forEach(o => seenObjs.add(o)); }));
    let h = `<p><b>Your revision list</b></p>`;
    if (days != null) h += `<p><b>${Math.max(0, days)} days</b> to your exam.${days > 0 ? ` About ${Math.max(1, Math.ceil(unseen.length / Math.max(1, Math.floor(days / 7))))} new lessons a week covers everything.` : ''}</p>`;
    h += `<p>You've practised <b>${seenObjs.size} of ${SYL.objectives.length}</b> syllabus topics.</p>`;
    if (weak.length) h += `<p>Work on these first (lowest accuracy):</p><ol>${weak.map(r => `<li><a href="#/practice/${r.l.id}">${esc(r.l.title)}</a>: ${Math.round(r.acc * 100)}% correct</li>`).join('')}</ol>`;
    else if (rows.length) h += `<p>No weak spots yet, nice!</p>`;
    if (unseen.length) h += `<p>Next new topic${unseen.length > 1 ? 's' : ''}: ${unseen.slice(0, 3).map(l => `<a href="#/lesson/${l.id}">${esc(l.title)}</a>`).join(', ')}</p>`;
    if (!st.exam) h += `<p class="muted small">Tip: tell me your exam date, e.g. "my exam is 1 June 2027".</p>`;
    return h;
  };

  const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const parseDate = s => {
    const t = s.toLowerCase();
    let m = t.match(/(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = t.match(/(\d{1,2})\s*(?:st|nd|rd|th)?\s+([a-z]+)\s+(\d{4})/); if (m) { const mi = MONTHS.findIndex(x => x.startsWith(m[2].slice(0, 3))); if (mi >= 0) return new Date(+m[3], mi, +m[1]); }
    m = t.match(/([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/); if (m) { const mi = MONTHS.findIndex(x => x.startsWith(m[1].slice(0, 3))); if (mi >= 0) return new Date(+m[3], mi, +m[2]); }
    m = t.match(/([a-z]+)\s+(\d{4})/); if (m) { const mi = MONTHS.findIndex(x => x.startsWith(m[1].slice(0, 3))); if (mi >= 0) return new Date(+m[2], mi, 1); }
    return null;
  };
  const ds = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // ---------------- intent router ----------------
  const strip = (q, re) => q.replace(re, ' ').replace(/[?!.]+$/, '').replace(/\s+/g, ' ').trim();
  const answer = raw => {
    const q = raw.trim(); const t = q.toLowerCase();
    if (/^(hi|hello|hey|help|what can you do|menu)\b/.test(t)) return { html: helpHTML() };
    if (/(exam|paper|test)\b.*\b(is|on|in)\b/.test(t) && parseDate(t) && /\d{4}/.test(t)) {
      const d = parseDate(t); const st = R2O.state(); st.exam = ds(d); R2O.save();
      const days = Math.ceil((d - new Date()) / 864e5);
      return { html: `<p>Saved! Your exam is on <b>${d.toDateString()}</b>, which is <b>${days}</b> days away. I'll keep the countdown on your road.</p>` };
    }
    if (/revis|what should i (do|study|work|practi)|weak|where (do|should) i start|study plan|plan for me/.test(t)) return { html: revise() };
    if (/quiz|test me|give me a question|practi[cs]e question|question on/.test(t)) {
      const topic = strip(t, /quiz me|quiz|test me|give me a question|practi[cs]e question|question|\bon\b|\babout\b|please|\bme\b/g);
      return { quiz: topic };
    }
    if (/formula/.test(t)) return { html: formula(t) };
    SYL = sylNow();
    if (/calculator/.test(t) && SUB().id === 'math') return { html: `<p><b>Paper 1</b> is non-calculator and <b>Paper 2</b> needs a scientific calculator. Each is 2 hours, 100 marks and 50% of the grade.</p><p>Topic 1.14 <i>Using a calculator</i> is only tested on Paper 2. Every other topic can appear on either paper, so practise the non-calculator methods too.</p>` };
    if (/how (long|many marks)|paper 1|paper 2|grade|grades/.test(t)) return { html: `<ul>${SYL.papers.map(p => `<li>${esc(p)}</li>`).join('')}</ul><p class="muted small">Grades A* to E.${SUB().id === 'math' ? ' Both papers test all topics (except 1.14 on Paper 1).' : ''}</p>` };
    if (/(explain|what is|what are|what's|whats|how do i|how do you|how to|teach me|meaning of|define)/.test(t)) {
      const topic = strip(t, /explain|what is|what are|what's|whats|how do i|how do you|how to|teach me|meaning of|define|\ba\b|\ban\b|\bthe\b/g);
      return { html: explain(topic) };
    }
    // default: is it on the exam?
    const topic = strip(t, /\b(is|are|do i need( to know)?|does|will|would|can|the|my|on|in|o ?level|\d{4}|exam|syllabus|examinable|tested|required|come out|need to learn|maths?|physics|chemistry|biology|computing|computer science|english|geography|history|part of)\b/g);
    return { html: examinable(topic || q, t) };
  };

  const SUGGEST_MATH = ['Is matrices on my exam?', 'Is the quadratic formula given?', 'Explain surds', 'Quiz me on percentages', 'What should I revise first?', 'Do I need logarithms?', 'Is completing the square examinable?', 'My exam is 1 June 2027'];
  const helpHTML = () => `<p>Hi${R2O.state().name ? ' ' + esc(R2O.state().name) : ''}! I'm <b>Syllabuddy</b>. I answer from the official <b>Cambridge O Level ${esc(SUB().short)} ${esc(sylNow().code)}</b> syllabus, never by guessing.</p>
    <ul><li><b>"Is ___ on my exam?"</b>: I'll quote the syllabus, with its page</li><li><b>"Is the ___ formula given?"</b>: what's printed on the paper</li><li><b>"Explain ___"</b>: the key ideas and the lesson</li><li><b>"Quiz me on ___"</b>: a question right here</li><li><b>"What should I revise?"</b>: your weak spots and exam countdown</li></ul>`;

  // ---------------- chat view ----------------
  const LOGS = {}; let log = [];
  const push = (who, html) => { log.push({ who, html }); };
  const render = root => {
    const box = $('.chatlog', root); if (!box) return;
    box.innerHTML = log.map(m => `<div class="msg ${m.who}">${m.who === 'bot' ? `<span class="av">${R2O.icon('chat')}</span>` : ''}<div class="bubble">${m.html}</div></div>`).join('');
    box.lastElementChild && box.lastElementChild.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  let rootEl = null;
  const doQuiz = (topicOrObj) => {
    const st = R2O.state(); let lessons = [];
    const obj = R2O.objective(topicOrObj);
    if (obj) lessons = R2O.lessonsFor(obj.id);
    else if (topicOrObj) { const { hits } = search(topicOrObj); if (hits[0] && hits[0].conf >= 0.34) lessons = R2O.lessonsFor(hits[0].o.id); }
    if (!lessons.length) { // weakest started lesson, else first unstarted
      const all = []; R2O.subjMods().forEach(m => m.lessons.forEach(l => all.push(l)));
      const started = all.filter(l => st.L[l.id] && st.L[l.id].a).sort((a, b) => st.L[a.id].c / st.L[a.id].a - st.L[b.id].c / st.L[b.id].a);
      lessons = started.length ? [started[0]] : [all[0]];
      push('bot', `<p>Here's one from <b>${esc(lessons[0].title)}</b>${started.length ? ', your weakest topic so far' : ''}:</p>`);
    } else push('bot', `<p>Here's a question on <b>${esc(lessons[0].title)}</b>:</p>`);
    const l = K.pick(lessons); const q = R2O.makeQ(l);
    const id = 'bq' + Date.now();
    push('bot', `<div class="qcard inchat" id="${id}"></div>`);
    render(rootEl);
    const box = document.getElementById(id);
    R2O.renderQ(box, q, { noFocus: false, nextLabel: 'Another one', onDone: r => { const x = R2O.record(l.id, r.correct, r.firstTry); const lg = log.find(m => m.html.includes(id)); }, onNext: () => { freeze(box); doQuiz(l.obj[0]); } });
  };
  const freeze = box => { const lg = log.find(m => m.html.includes(box.id)); if (lg) lg.html = `<div class="qcard inchat done">${box.innerHTML}</div>`; };
  const send = text => {
    if (!text.trim()) return;
    $$q('.qcard.inchat:not(.done)').forEach(b => freeze(b));
    push('me', esc(text));
    const st = R2O.state(); st.asked = (st.asked || 0) + 1; R2O.save(); if (st.asked >= 5) R2O.award('curious');
    const r = answer(text);
    if (r.quiz !== undefined) return doQuiz(r.quiz);
    push('bot', r.html); render(rootEl);
  };
  const $$q = s => Array.from(document.querySelectorAll(s));

  R2O.buddy = {
    answer, search, examinable,
    view: root => {
      rootEl = root; log = LOGS[SUB().id] = LOGS[SUB().id] || []; SYL = sylNow();
      if (!log.length) push('bot', helpHTML());
      const SUGGEST = SYL.suggest || SUGGEST_MATH;
      root.innerHTML = `<div class="buddy"><div class="chatlog" aria-live="polite"></div>
        <div class="sugs">${SUGGEST.map(s => `<button class="chip">${s}</button>`).join('')}</div>
        <form class="chatbar"><input id="bq" autocomplete="off" placeholder="Ask about ${esc(SUB().short)} ${esc(SYL.code)}…" aria-label="Ask Syllabuddy"><button class="btn primary" aria-label="Send">${R2O.icon('next')}</button></form></div>`;
      render(root);
      root.querySelector('.sugs').onclick = e => { if (e.target.classList.contains('chip')) send(e.target.textContent); };
      root.querySelector('.chatbar').onsubmit = e => { e.preventDefault(); const i = $('#bq'); const v = i.value; i.value = ''; send(v); };
      root.querySelector('.chatlog').onclick = e => {
        const qz = e.target.closest('[data-quiz]'); if (qz) return doQuiz(qz.dataset.quiz);
        const ob = e.target.closest('[data-obj]'); if (ob) return R2O.buddy.showObjective(ob.dataset.obj);
      };
    },
    ask: text => send(text),
    showObjective: id => { const o = R2O.objective(id); if (!o) return; push('bot', card(o, 'yes')); render(rootEl); }
  };
})();
