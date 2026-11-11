// Road to O's: app engine. Views are rendered into #view by a tiny hash router.
(() => {
  const K = R2O.K;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  R2O.esc = esc;

  // ---------------- state (saved on this device only) ----------------
  // Several learners can share one phone: each profile has its own saved state.
  const KEY = 'r2o_state_v1', PKEY = 'r2o_profiles_v1';
  const fresh = () => ({ name: '', xp: 0, streak: 0, lastDay: null, daily: { day: null, xp: 0 }, goal: 50,
    L: {}, badges: {}, boss: {}, exam: null, sound: true, asked: 0, warm: null, onboarded: false, bestCombo: 0, subj: 'math',
    chosen: null, career: null, engPass: false, engBest: null, voice: true, writing: {} });
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode: progress lasts this visit */ } }, del: k => { try { localStorage.removeItem(k); } catch (e) { } } };
  let prof; try { prof = JSON.parse(store.get(PKEY)); } catch (e) { }
  if (!prof || !Array.isArray(prof.list) || !prof.list.length) prof = { cur: 'p1', list: [{ id: 'p1', name: '' }] };
  const skey = id => id === 'p1' ? KEY : KEY + '_' + id;
  const load = id => { let s; try { s = JSON.parse(store.get(skey(id))); } catch (e) { } const o = Object.assign(fresh(), s || {});
    if (s && s.onboarded && s.engPass === undefined && Object.keys(s.L || {}).length) o.engPass = true; // learners from before the English check keep their access
    return o; };
  let st = load(prof.cur);
  const save = () => {
    store.set(skey(prof.cur), JSON.stringify(st));
    const me = prof.list.find(p => p.id === prof.cur); if (me && me.name !== st.name) { me.name = st.name; store.set(PKEY, JSON.stringify(prof)); }
  };
  R2O.state = () => st;
  R2O.save = save;
  R2O.profiles = () => prof.list.map(p => ({ ...p, cur: p.id === prof.cur }));
  R2O.switchProfile = id => { if (!prof.list.some(p => p.id === id)) return; save(); prof.cur = id; store.set(PKEY, JSON.stringify(prof)); location.hash = '#/'; location.reload(); };
  R2O.addProfile = () => { save(); const id = 'p' + Date.now().toString(36); prof.list.push({ id, name: '' }); prof.cur = id; store.set(PKEY, JSON.stringify(prof)); location.hash = '#/'; location.reload(); };
  R2O.deleteProfile = id => {
    if (prof.list.length < 2) return; prof.list = prof.list.filter(p => p.id !== id); store.del(skey(id));
    if (prof.cur === id) prof.cur = prof.list[0].id; store.set(PKEY, JSON.stringify(prof)); location.hash = '#/me'; location.reload();
  };
  // Backup code: the whole profile as text the student can copy, send to themselves, and paste on another phone.
  const b64 = s => btoa(unescape(encodeURIComponent(s))), unb64 = s => decodeURIComponent(escape(atob(s)));
  R2O.backupCode = () => 'R2O1.' + b64(JSON.stringify(st));
  R2O.restoreCode = code => {
    const m = String(code).replace(/\s+/g, '').match(/^R2O1\.([A-Za-z0-9+/=]+)$/); if (!m) return 'That doesn\'t look like a Road to O\'s backup code. It starts with R2O1.';
    let s; try { s = JSON.parse(unb64(m[1])); } catch (e) { return 'This code is incomplete. Copy the whole code and try again.'; }
    if (!s || typeof s !== 'object' || typeof s.L !== 'object') return 'This code is incomplete. Copy the whole code and try again.';
    st = Object.assign(fresh(), s); save(); return true;
  };

  const dayStr = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };
  const level = xp => Math.floor(Math.sqrt(xp / 50)) + 1;
  const levelXP = lv => 50 * (lv - 1) * (lv - 1);
  const LEVEL_NAMES = ['Starter', 'Explorer', 'Builder', 'Solver', 'Thinker', 'Strategist', 'Scholar', 'Expert', 'Master', 'Legend'];
  const levelName = lv => LEVEL_NAMES[Math.min(lv - 1, LEVEL_NAMES.length - 1)];

  // ---------------- subjects ----------------
  // Each subject has its own syllabus (R2O.SYLS[id]) and modules; progress is shared (XP, streak).
  const SUBJECTS = R2O.SUBJECTS = [];
  R2O.addSubject = s => { s.syl = Object.assign(R2O.SYLS[s.id] = R2O.SYLS[s.id] || {}, s.syl || {}); SUBJECTS.push(s); };
  R2O.SYLS = R2O.SYLS || {};
  R2O.SYLS.math = R2O.SYLLABUS;
  R2O.addSubject({ id: 'math', name: 'Mathematics', short: 'Maths', icon: '🧮', color: '#0d9488', start: 'found',
    blurb: 'From 3 + 3 to O Level, with pictures first.' });
  const subjOf = id => SUBJECTS.find(s => s.id === id) || SUBJECTS[0];
  R2O.subject = (id = st.subj) => subjOf(id);
  R2O.curSyl = () => subjOf(st.subj).syl;
  const ready = s => MODS.some(m => m.subject === s.id);
  // Basic English comes first; the subjects a student chose open once they pass the English check.
  const BASIC = 'basic';
  const shown = () => SUBJECTS.filter(s => ready(s) && (s.id === BASIC || !st.chosen || st.chosen.includes(s.id) || s.id === st.subj));
  const locked = sid => sid !== BASIC && !st.engPass && SUBJECTS.some(s => s.id === BASIC);
  R2O.locked = locked;

  // ---------------- modules & lessons ----------------
  const MODS = R2O.MODULES = R2O.MODULES || [];
  const byId = {}; const byObj = {};
  R2O.addModule = mod => {
    mod.subject = mod.subject || 'math';
    MODS.push(mod);
    mod.lessons.forEach((l, i) => { l.mod = mod.id; l.subj = mod.subject; l.idx = i; byId[l.id] = l; (l.obj || []).forEach(o => { const k = mod.subject + '|' + o; (byObj[k] = byObj[k] || []).push(l); }); });
  };
  const subjMods = (sid = st.subj) => MODS.filter(m => m.subject === sid);
  R2O.subjMods = subjMods;
  R2O.lesson = id => byId[id];
  R2O.lessonsFor = (obj, sid = st.subj) => byObj[sid + '|' + obj] || [];
  R2O.objective = (id, sid = st.subj) => ((subjOf(sid).syl || {}).objectives || []).find(o => o.id === id);

  const ls = id => (st.L[id] = st.L[id] || { c: 0, a: 0, learned: false, best: 0 });
  const stars = id => {
    const s = st.L[id]; if (!s) return 0;
    const acc = s.a ? s.c / s.a : 0;
    if (s.c >= 15 && s.best >= 5 && acc >= 0.7) return 3;
    if (s.c >= 8 && acc >= 0.6) return 2;
    if (s.learned && s.c >= 3) return 1;
    return 0;
  };
  R2O.stars = stars;
  const nextStarMsg = id => {
    const s = ls(id), n = stars(id);
    if (n === 0) return s.learned ? `${Math.max(0, 3 - s.c)} more correct for ★` : 'Finish the lesson and get 3 correct for ★';
    if (n === 1) return `${Math.max(0, 8 - s.c)} more correct (60%+ accuracy) for ★★`;
    if (n === 2) return s.c < 15 ? `${15 - s.c} more correct and a 5-combo for ★★★` : 'Get a 5-in-a-row combo for ★★★';
    return 'Mastered! ★★★';
  };
  const modProgress = m => { const t = m.lessons.length * 3; const g = m.lessons.reduce((s, l) => s + stars(l.id), 0); return Math.round(g / t * 100); };

  // ---------------- XP, streaks, badges ----------------
  const BADGES = [
    { id: 'first', icon: 'check', name: 'First step', desc: 'Answer your first question correctly' },
    { id: 'combo5', icon: 'flame', name: 'On fire', desc: '5 correct in a row' },
    { id: 'combo10', icon: 'bolt', name: 'Unstoppable', desc: '10 correct in a row' },
    { id: 'streak3', icon: 'calendar', name: 'Habit', desc: 'Practise 3 days in a row' },
    { id: 'streak7', icon: 'target', name: 'One week strong', desc: 'Practise 7 days in a row' },
    { id: 'star3', icon: 'star', name: 'Mastery', desc: 'Get 3 stars on a lesson' },
    { id: 'boss', icon: 'flag', name: 'Checkpoint cleared', desc: 'Beat a module checkpoint' },
    { id: 'curious', icon: 'chat', name: 'Curious mind', desc: 'Ask Syllabuddy 5 questions' },
    { id: 'warm', icon: 'sun', name: 'Early bird', desc: 'Finish a daily warm-up' },
    { id: 'lv5', icon: 'layers', name: 'Level 5', desc: 'Reach level 5' }
  ];
  const award = id => {
    if (st.badges[id]) return; st.badges[id] = dayStr(); save();
    const b = BADGES.find(x => x.id === id); if (b) toast(`${R2O.icon(b.icon)}Badge unlocked: <b>${b.name}</b>`), confetti();
  };
  R2O.award = award;
  const addXP = n => {
    const before = level(st.xp);
    const t = dayStr();
    if (st.lastDay !== t) { st.streak = st.lastDay === yesterday() ? st.streak + 1 : 1; st.lastDay = t; }
    if (st.daily.day !== t) st.daily = { day: t, xp: 0 };
    const goalBefore = st.daily.xp >= st.goal;
    st.xp += n; st.daily.xp += n; save();
    if (!goalBefore && st.daily.xp >= st.goal) { toast(`${R2O.icon('target')}Daily goal reached!`); confetti(); }
    const after = level(st.xp);
    if (after > before) { toast(`${R2O.icon('layers')}Level ${after}: <b>${levelName(after)}</b>`); confetti(); sound('level'); }
    if (after >= 5) award('lv5');
    if (st.streak >= 3) award('streak3');
    if (st.streak >= 7) award('streak7');
    updateTop();
  };
  R2O.addXP = addXP;

  // ---------------- feedback effects ----------------
  let actx = null;
  const sound = kind => {
    if (!st.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { ok: [660, 880], bad: [220, 180], level: [523, 659, 784, 1047] }[kind] || [440];
      notes.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = f;
        const t0 = actx.currentTime + i * 0.09; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
        o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + 0.22);
      });
    } catch (e) { }
  };
  R2O.sound = sound;
  const toast = html => {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), 2600); setTimeout(() => t.remove(), 3100);
  };
  R2O.toast = toast;
  const confetti = () => {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = $('#confetti'), x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const cols = ['#16a34a', '#f59e0b', '#2563eb', '#db2777', '#0ea5e9'];
    const P = Array.from({ length: 90 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -10 - 3, s: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * 5)], r: Math.random() * 6 }));
    let f = 0; const tick = () => {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); });
      if (++f < 90) requestAnimationFrame(tick); else x.clearRect(0, 0, c.width, c.height);
    }; tick();
  };
  R2O.confetti = confetti;
  const floatXP = (el, n) => { const f = document.createElement('div'); f.className = 'xpfloat'; f.textContent = `+${n} XP`; el.appendChild(f); setTimeout(() => f.remove(), 1100); };

  // ---------------- answer checking ----------------
  const parseNums = str => {
    let s = String(str).replace(/[−–—]/g, '-').replace(/,(?=\d{3}\b)/g, '').replace(/ | (?=\d{3}\b)/g, '');
    const out = []; const re = /(-?\d+(?:\.\d+)?)\s+(\d+)\/(\d+)|(-?\d*\.?\d+)\s*\/\s*(-?\d*\.?\d+)|(-?\d*\.?\d+)/g; let m;
    while ((m = re.exec(s))) {
      if (m[1] !== undefined) { const w = parseFloat(m[1]); out.push({ v: w + Math.sign(w || 1) * (+m[2] / +m[3]), frac: [w * +m[3] + Math.sign(w || 1) * +m[2], +m[3]] }); }
      else if (m[4] !== undefined) out.push({ v: parseFloat(m[4]) / parseFloat(m[5]), frac: [parseFloat(m[4]), parseFloat(m[5])] });
      else out.push({ v: parseFloat(m[6]) });
    }
    return out;
  };
  const close = (x, a, tol) => Math.abs(x - a) <= (tol != null ? tol : 1e-6 * Math.max(1, Math.abs(a)));
  const checkAnswer = (q, input) => {
    if (q.kind === 'mcq') return input === q.a;
    if (q.kind === 'text') {
      // Forgive the extra words students naturally write: "The answer is B8", "x = 4", "It's 1010".
      const lead = /^\s*(?:(?:so\s+)?(?:the\s+)?(?:final\s+)?(?:answer|ans)\s*(?:is|=|:)?|it\s+is|it's|[a-z]\s*=)\s*/i;
      const norm = s => String(s).replace(lead, '').toLowerCase().replace(/[−–—]/g, '-').replace(/[\s():.]/g, '');
      const want = (q.accept || [q.a]), got = norm(input);
      if (want.some(a => norm(a) === got)) return true;
      // Binary with the leading zeros left off: right value, so nudge rather than mark wrong
      if (/^[01]+$/.test(q.a) && /^[01]+$/.test(got) && got.length < q.a.length && got.padStart(q.a.length, '0') === q.a) return 'pad';
      return false;
    }
    const nums = parseNums(input);
    if (q.kind === 'nums') {
      const want = q.a.slice(); if (nums.length !== want.length) return false;
      const got = nums.map(n => n.v);
      if (q.ordered) return got.every((g, i) => close(g, want[i], q.tol));
      const w = want.slice().sort((a, b) => a - b), g = got.slice().sort((a, b) => a - b); return g.every((x, i) => close(x, w[i], q.tol));
    }
    if (!nums.length) return false;
    const n = nums[0];
    if (q.kind === 'frac' && q.simplest && n.frac && K.gcd(n.frac[0], n.frac[1]) !== 1) return 'simplify';
    if (close(n.v, q.a, q.tol)) return true;
    // Rounded too early (e.g. 8.6 for 8.571…): the method is right, so ask for one more digit
    if (q.kind === 'num' && q.a !== 0 && K.sf(q.a, 2) !== K.sf(q.a, 3) && close(n.v, K.sf(q.a, 2), 1e-9 * Math.max(1, Math.abs(q.a)))) return 'moreSF';
    return false;
  };
  R2O.checkAnswer = checkAnswer; R2O.parseNums = parseNums;
  const answerText = q => (q.show || (q.kind === 'nums' ? q.a.map(K.n).join(', ') : q.kind === 'mcq' || q.kind === 'text' ? q.a : K.n(q.a))) +
    (q.unit && !String(q.show || '').startsWith('$') ? ' ' + q.unit : '');

  // Make one question from a lesson's generators.
  const makeQ = (lesson, genId) => {
    const id = genId || K.pick(lesson.gens);
    const g = R2O.GEN[id]; if (!g) throw new Error('missing generator ' + id);
    const q = g(); q.gen = id; q.lesson = lesson.id; return q;
  };
  R2O.makeQ = makeQ;

  // Render a question into box. opts.onDone({correct, firstTry}), opts.retry (allow a second try), opts.compact
  const renderQ = (box, q, opts = {}) => {
    const allowRetry = opts.retry !== false;
    let tries = 0, done = false;
    const keypad = q.kind === 'num' || q.kind === 'frac' || q.kind === 'nums';
    box.innerHTML = `
      <div class="q">${q.q}</div>
      ${q.kind === 'mcq' ? `<div class="choices">${q.choices.map((c, i) => `<button class="choice" data-i="${i}">${c}</button>`).join('')}</div>` :
        `<div class="ans"><input class="inp" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${q.kind === 'text' ? 'text' : 'decimal'}" placeholder="${q.ph || (q.kind === 'num' && q.tol ? 'Your answer (3 s.f. is fine)' : 'Your answer')}" aria-label="Your answer">${q.unit ? `<span class="unit">${q.unit}</span>` : ''}</div>
         ${keypad ? `<div class="kpad">${['−', '/', '.', ','].map(k => `<button class="key" data-k="${k}" tabindex="-1">${k}</button>`).join('')}</div>` : ''}
         <button class="btn primary check">Check</button>`}
      <div class="qtools">${q.hint ? `<button class="link hintb">${R2O.icon('bulb')}Hint</button>` : ''}${R2O.canSpeak && R2O.canSpeak() ? `<button class="link speakb">${R2O.icon('speaker')}Read aloud</button>` : ''}<button class="link askb">${R2O.icon('hand')}Ask someone</button></div>
      <div class="fb" aria-live="polite"></div>`;
    const fb = $('.fb', box);
    const spB = $('.speakb', box); if (spB) spB.onclick = () => R2O.speak(q.q + (q.choices ? '. ' + q.choices.join('. ') : ''));
    $('.askb', box).onclick = () => R2O.askSomeone && R2O.askSomeone(q);
    const hintB = $('.hintb', box);
    if (hintB) hintB.onclick = () => { fb.innerHTML = `<div class="hint">${q.hint}</div>`; q.usedHint = true; };
    const steps = () => q.steps ? `<details class="steps" ${opts.openSteps ? 'open' : ''}><summary>See the working</summary><ol>${q.steps.map(s => `<li>${s}</li>`).join('')}</ol></details>` : '';
    const finish = correct => {
      done = true;
      $$('button.choice, .check, .inp, .key', box).forEach(b => b.disabled = true);
      if (correct) { sound('ok'); fb.innerHTML = `<div class="ok">${R2O.icon('check')}${K.pick(['Correct!', 'Nice!', 'Spot on!', 'Brilliant!', 'Great work!'])}</div>${steps()}`; }
      else {
        sound('bad');
        fb.innerHTML = `<div class="bad">That's okay, this one was tricky. The answer is <b>${answerText(q)}</b>. Here's how:</div>${steps().replace('<details class="steps" ', '<details class="steps" open ')}` +
          (q.lesson ? `<p class="small center"><a href="#/lesson/${q.lesson}">Go back to the lesson with pictures</a></p>` : '');
      }
      if (q.after) fb.insertAdjacentHTML('beforeend', `<div class="note">${q.after}</div>`);
      if (q.walk && R2O.ANIM && R2O.ANIM.columns) {
        const wb = document.createElement('button'); wb.className = 'btn ghost walkb'; wb.textContent = 'Show me step by step';
        wb.onclick = () => { const d = document.createElement('div'); d.className = 'walk'; wb.replaceWith(d); R2O.ANIM.columns(d, q.walk, () => { }); };
        fb.appendChild(wb); if (!correct) wb.click();
      }
      const nb = document.createElement('button'); nb.className = 'btn primary next'; nb.textContent = opts.nextLabel || 'Continue'; fb.appendChild(nb);
      nb.onclick = () => opts.onNext && opts.onNext();
      setTimeout(() => nb.focus(), 50);
      opts.onDone && opts.onDone({ correct, firstTry: correct && tries === 1 && !q.usedHint, box });
    };
    const attempt = val => {
      if (done) return; tries++;
      const r = checkAnswer(q, val);
      if (r === 'simplify') { tries--; fb.innerHTML = `<div class="hint">Right value, but give it in its <b>simplest form</b>.</div>`; return; }
      if (r === 'pad') { tries--; fb.innerHTML = `<div class="hint">Right value! This answer needs all <b>${q.a.length} digits</b>, so put zeros at the front until there are ${q.a.length}. Type it again.</div>`; return; }
      if (r === 'moreSF') { tries--; fb.innerHTML = `<div class="hint">So close, your method is right! You rounded a bit too early. Give <b>3 significant figures</b> (one more digit).</div>`; return; }
      if (r) return finish(true);
      if (tries === 1 && allowRetry) {
        sound('bad'); box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
        fb.innerHTML = `<div class="hint">Not quite. Have another go${q.hint ? `. Hint: ${q.hint}` : '.'}</div>`; q.usedHint = true;
        return;
      }
      finish(false);
    };
    if (q.kind === 'mcq') {
      $$('.choice', box).forEach(b => b.onclick = () => {
        const val = q.choices[+b.dataset.i]; const ok = checkAnswer(q, val);
        b.classList.add(ok ? 'right' : 'wrong'); if (!ok && tries === 0 && allowRetry) b.disabled = true;
        if (ok || !allowRetry || tries >= 1) $$('.choice', box).forEach(c => { if (q.choices[+c.dataset.i] === q.a) c.classList.add('right'); });
        attempt(val);
      });
    } else {
      const inp = $('.inp', box);
      $('.check', box).onclick = () => { if (inp.value.trim()) attempt(inp.value); else inp.focus(); };
      inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (inp.value.trim()) attempt(inp.value); } };
      $$('.key', box).forEach(k => k.onmousedown = e => e.preventDefault());
      $$('.key', box).forEach(k => k.onclick = () => { const p = inp.selectionStart ?? inp.value.length; const ch = k.dataset.k === '−' ? '-' : k.dataset.k; inp.value = inp.value.slice(0, p) + ch + inp.value.slice(p); inp.focus(); inp.setSelectionRange(p + 1, p + 1); });
      if (!opts.noFocus) setTimeout(() => inp.focus({ preventScroll: true }), 60);
    }
  };
  R2O.renderQ = renderQ;

  // Record a result against a lesson. Returns XP gained.
  let combo = 0;
  const record = (lessonId, correct, firstTry) => {
    const s = ls(lessonId); s.a++; const before = stars(lessonId);
    let xp = 0;
    if (correct) {
      s.c++; combo = firstTry ? combo + 1 : 0;
      xp = firstTry ? 10 + Math.min(combo - 1, 5) * 2 : 5;
      s.best = Math.max(s.best, combo); st.bestCombo = Math.max(st.bestCombo, combo);
      award('first'); if (combo >= 5) award('combo5'); if (combo >= 10) award('combo10');
    } else combo = 0;
    s.last = Date.now();
    save(); if (xp) addXP(xp);
    const after = stars(lessonId);
    if (after > before) { toast(`<span class="tstars">${'★'.repeat(after)}</span> <b>${byId[lessonId].title}</b>`); confetti(); if (after === 3) award('star3'); }
    return xp;
  };
  R2O.record = record;

  // ---------------- top bar & nav ----------------
  const updateTop = () => {
    const lv = level(st.xp), a = levelXP(lv), b = levelXP(lv + 1);
    $('#tb-streak').textContent = st.streak || 0;
    $('#tb-xp').textContent = st.xp;
    $('#tb-lv').textContent = lv;
    const dg = st.daily.day === dayStr() ? st.daily.xp : 0;
    const pct = Math.min(1, dg / st.goal);
    $('#tb-ring').style.setProperty('--p', pct);
    $('#tb-ring').title = `Daily goal: ${dg}/${st.goal} XP`;
    $('#tb-lvbar').style.transform = `scaleX(${Math.max(0, Math.min(1, (st.xp - a) / (b - a)))})`;
  };
  R2O.updateTop = updateTop;
  const setNav = name => $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === name));
  const view = () => $('#view');

  // ---------------- views ----------------
  const viewHome = () => {
    setNav('road');
    const lv = level(st.xp);
    const greet = st.name ? `Hi ${esc(st.name)}!` : 'Welcome!';
    const S = subjOf(st.subj), mods = subjMods();
    const nextL = (() => { for (const m of mods) for (const l of m.lessons) if (stars(l.id) < 1) return l; return null; })();
    const isLocked = locked(S.id);
    let html = subjectBar() + `<section class="hero">
      <div><h1>${greet}</h1><p class="muted">Level ${lv}, ${levelName(lv)}<br>${st.streak ? `${st.streak}-day streak. Keep it going!` : 'Practise today to start a streak.'}</p></div>
      ${countdownHTML()}
    </section>
    ${isLocked ? gateCard(S) : ''}
    ${S.id === BASIC ? basicCard() : ''}
    ${S.needs && !isLocked ? `<div class="card note-card">${S.needs}</div>` : ''}
    <div class="quick">
      ${nextL && !isLocked ? `<a class="card cta" href="#/lesson/${nextL.id}">${R2O.icon('play')}<div><b>Continue the road</b><br><span class="muted">${esc(nextL.title)}</span></div></a>` : ''}
      ${!isLocked ? `<a class="card cta warm" href="#/warmup">${R2O.icon('sun')}<div><b>Daily warm-up</b><br><span class="muted">${st.warm === dayStr() ? 'Done today. Play again?' : '5 quick questions, +20 bonus XP'}</span></div></a>` : ''}
      ${R2O.writingTasks && R2O.writingTasks(S.id).length && !isLocked ? `<a class="card cta write" href="#/write?s=${S.id}">${R2O.icon('pen')}<div><b>Write and get marked</b><br><span class="muted">${R2O.writingTasks(S.id).length} writing tasks with instant feedback</span></div></a>` : ''}
    </div>`;
    mods.forEach((m, mi) => {
      const pct = modProgress(m);
      html += `<section class="module" style="--mc:${m.color}">
        <header class="mhead"><span class="mnum" aria-hidden="true">${mi + 1}</span><div><h2>${m.name}</h2><p class="muted">${m.blurb}</p></div><div class="mpct" title="${pct}% of stars">${pct}%</div></header>
        <div class="road">`;
      m.lessons.forEach((l, i) => {
        const s = stars(l.id), started = st.L[l.id];
        html += `<a class="node ${i % 2 ? 'r' : 'l'} ${s ? 'done' : started ? 'started' : ''} ${nextL === l ? 'next' : ''}" href="#/lesson/${l.id}">
          <span class="dot">${s === 3 ? R2O.icon('star') : s ? R2O.icon('check') : i + 1}</span>
          <span class="nl"><b>${esc(l.title)}</b><span class="st" aria-label="${s} of 3 stars">${'★'.repeat(s)}<i>${'★'.repeat(3 - s)}</i></span></span></a>`;
      });
      html += `<a class="node boss ${st.boss[m.id] ? 'done' : ''}" href="#/boss/${m.id}"><span class="dot">${R2O.icon(st.boss[m.id] ? 'check' : 'flag')}</span><span class="nl"><b>Checkpoint: ${esc(m.name)}</b><span class="muted">10 mixed questions, 3 lives</span></span></a>`;
      html += `</div></section>`;
    });
    html += S.syl.foot ? `<p class="foot muted">${S.syl.foot}</p>` : `<p class="foot muted">Course content follows the official <a href="${S.syl.url}" target="_blank" rel="noopener">${esc(S.syl.name)} ${S.syl.code} syllabus</a> (exams ${S.syl.years}). Lessons and questions are written for Road to O's; links point to free resources.</p>`;
    view().innerHTML = html;
    const bar = $('.subjbar'), on = $('.subjbar .on'); // centre the current subject without scrolling the page
    if (bar && on) bar.scrollLeft = on.offsetLeft - bar.offsetLeft - (bar.clientWidth - on.clientWidth) / 2;
  };
  // Subject switcher: every subject that has lessons, current one highlighted
  const subjectBar = () => `<nav class="subjbar" aria-label="Subjects">${shown().map(s => {
    const all = subjMods(s.id).flatMap(m => m.lessons), got = all.reduce((t, l) => t + stars(l.id), 0);
    return `<a href="#/subject/${s.id}" class="${s.id === st.subj ? 'on' : ''}" style="--sc:${s.color}"${s.id === st.subj ? ' aria-current="page"' : ''}>${R2O.badge(s)}<b>${s.short}</b><i>${locked(s.id) ? R2O.icon('lock') + '<span class="vh">locked</span>' : (all.length ? Math.round(got / (all.length * 3) * 100) : 0) + '%'}</i></a>`;
  }).join('')}<a href="#/subjects" class="more" style="--sc:var(--brand)">${R2O.icon('plus')}<b>Subjects</b></a></nav>`;
  const setSubject = id => { if (SUBJECTS.some(s => s.id === id) && st.subj !== id) { st.subj = id; save(); } };
  R2O.setSubject = setSubject;

  const countdownHTML = () => {
    if (!st.exam) return `<a class="card exam" href="#/me">${R2O.icon('calendar')}<span class="muted">Set your exam date</span></a>`;
    const days = Math.ceil((new Date(st.exam) - new Date()) / 864e5);
    return `<a class="card exam" href="#/me"><b>${days > 0 ? days : 0}</b><span class="muted">days to your exam</span></a>`;
  };

  const resLinks = l => {
    const kw = encodeURIComponent(l.kw || l.title);
    const mod = MODS.find(m => m.id === l.mod), S = subjOf(l.subj);
    const links = S.links ? S.links(kw, l) : [
      [`Khan Academy: videos and exercises`, `https://www.khanacademy.org/search?page_search_query=${kw}`],
      [`Corbettmaths: videos and worksheets`, `https://corbettmaths.com/?s=${kw}`]
    ];
    if (mod && mod.book) links.push([`Free textbook: ${mod.book[0]} (OpenStax)`, mod.book[1]]);
    const o = R2O.objective((l.obj || [])[0], l.subj);
    if (o) links.push([`Official syllabus, topic ${o.id} (page ${o.p})`, S.syl.url + '#page=' + o.p]);
    return `<section class="res"><h3>Free resources</h3><ul>${links.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}<span class="vh"> (opens in a new tab)</span></a></li>`).join('')}</ul></section>`;
  };

  const viewLesson = id => {
    const l = byId[id]; if (!l) return go('#/');
    setNav('road'); setSubject(l.subj);
    const m = MODS.find(x => x.id === l.mod), code = subjOf(l.subj).syl.code;
    const objs = (l.obj || []).map(o => R2O.objective(o, l.subj)).filter(Boolean);
    let html = `<div class="lesson" style="--mc:${m.color}">
      <div class="crumbs"><a href="#/">${R2O.icon('back')}Road</a><span class="muted">${esc(m.name)}</span></div>
      <h1>${esc(l.title)}</h1>
      <div class="chips">${objs.map(o => `<button class="chip syl" data-obj="${o.id}" title="What the syllabus says">${R2O.icon('book')}Syllabus ${o.id}: ${esc(o.t)}</button>`).join('')}${l.sg ? '<span class="chip sg" title="Uses a Singapore maths teaching method">Singapore method</span>' : ''}${l.foundation ? '<span class="chip">Foundation</span>' : ''}</div>
      ${l.hook ? `<p class="hook">${l.hook}</p>` : ''}
      ${l.pre && l.pre.some(p => byId[p]) ? `<div class="card pre"><b>Builds on</b> ${l.pre.filter(p => byId[p]).map(p => `<a href="#/lesson/${p}">${esc(byId[p].title)}</a>${stars(p) ? ' (done)' : ''}`).join(', ')}. <span class="muted">New to these? Do them first, it will make this much easier.</span></div>` : ''}
      <section class="card learnbox"></section>
      <div class="after hidden">
      <div class="card done-banner center"><h2>Lesson complete</h2><p>Now let's practise. The first questions use pictures, then they slowly get harder. You've got this.</p></div>`;
    if (l.widget) html += `<section class="card play"><h3>Try it yourself</h3><div class="widget" data-w="${l.widget}"></div></section>`;
    (l.ex || []).forEach((e, i) => {
      html += `<section class="card ex"><h3>Worked example ${l.ex.length > 1 ? i + 1 : ''}</h3><div class="q">${e.q}</div><ol class="wsteps">${e.steps.map((s, j) => `<li class="${j ? 'hidden' : ''}">${s}</li>`).join('')}</ol>
        ${e.steps.length > 1 ? '<button class="btn ghost reveal">Show next step</button>' : ''}${e.a ? `<p class="exa hidden">Answer: <b>${e.a}</b></p>` : ''}</section>`;
    });
    if (l.keys) html += `<section class="keys"><h3>Remember</h3><ul>${l.keys.map(k => `<li>${k}</li>`).join('')}</ul></section>`;
    const wt = R2O.writingTasks ? R2O.writingTasks(l.subj).filter(t => (t.lessons || []).includes(l.id)) : [];
    if (wt.length) html += `<section class="card writecta"><h3>Write and get marked</h3><p>Practise writing a real answer. You get feedback straight away.</p><ul>${wt.map(t => `<li><a href="#/write/${t.id}">${esc(t.title)}</a> <span class="muted small">(${t.min} to ${t.max} words)</span></li>`).join('')}</ul></section>`;
    html += `<div class="ctas"><a class="btn primary big go-practice" href="#/practice/${l.id}">Start practising</a>
      <button class="btn ghost ask" data-q="Is ${esc(l.title)} on my exam?">Is this on my exam?</button></div>
      <p class="muted center">${nextStarMsg(l.id)}</p>
      ${resLinks(l)}</div></div>`;
    view().innerHTML = html;

    const showAfter = (fresh) => {
      $('.after').classList.remove('hidden');
      if (fresh) { $('.after').scrollIntoView({ behavior: 'smooth', block: 'start' }); if (!ls(l.id).learned) { addXP(20); confetti(); sound('level'); } }
      else $('.done-banner').remove();
      ls(l.id).learned = true; save();
    };
    R2O.playScenes($('.learnbox'), l, () => showAfter(true));
    if (ls(l.id).learned) showAfter(false);
    $$('.reveal').forEach(b => b.onclick = () => {
      const card = b.closest('.card'); const hidden = $$('.wsteps li.hidden', card);
      if (hidden.length) hidden[0].classList.remove('hidden');
      if (hidden.length <= 1) { b.remove(); const a = $('.exa', card); if (a) a.classList.remove('hidden'); }
    });
    $$('.card.ex').forEach(card => { if (!$('.reveal', card)) { const a = $('.exa', card); if (a) a.classList.remove('hidden'); } });
    $$('.widget').forEach(w => { const fn = R2O.WIDGETS[w.dataset.w]; if (fn) fn(w); });
    $$('.chip.syl').forEach(b => b.onclick = () => { go('#/buddy'); setTimeout(() => R2O.buddy.showObjective(b.dataset.obj), 30); });
    $('.ask').onclick = e => { go('#/buddy'); setTimeout(() => R2O.buddy.ask(e.target.dataset.q), 30); };
    window.scrollTo(0, 0);
  };

  // Practice loop for one lesson
  const viewPractice = id => {
    const l = byId[id]; if (!l) return go('#/');
    setNav('road'); combo = 0; setSubject(l.subj);
    const m = MODS.find(x => x.id === l.mod);
    if (!ls(l.id).learned) return go('#/lesson/' + l.id); // learning comes first
    let n = 0, right = 0, xpGain = 0, lastGen = null, wrongRun = 0, easyLeft = 0; const seen = new Set();
    view().innerHTML = `<div class="practice" style="--mc:${m.color}">
      <div class="crumbs"><a href="#/lesson/${l.id}">${R2O.icon('back')}${esc(l.title)}</a><span class="combo" id="combo"></span></div>
      <div class="pbar"><div id="pfill"></div></div>
      <p class="muted center" id="pstar"></p>
      <div class="card qcard" id="qbox"></div>
      <div class="center"><button class="btn ghost" id="pend">Finish practice</button></div></div>`;
    const upd = () => {
      $('#combo').innerHTML = combo >= 2 ? `${R2O.icon('flame')}${combo} in a row` : '';
      $('#pstar').textContent = nextStarMsg(l.id);
      const s = ls(l.id); const target = stars(l.id) === 0 ? 3 : stars(l.id) === 1 ? 8 : 15;
      $('#pfill').style.width = Math.min(100, s.c / target * 100) + '%';
    };
    // Several wrong in a row: offer a way forward instead of more of the same
    const stuck = () => {
      $('#qbox').innerHTML = `<div class="stuck center"><h3>This part is tricky. That's normal!</h3>
        <p>Everyone gets stuck sometimes. Pick what helps you most:</p>
        <div class="ctas col"><a class="btn primary" href="#/lesson/${l.id}">Watch the big idea again</a>
        ${l.easy ? '<button class="btn ghost" id="st-easy">Try some easier questions</button>' : ''}
        ${l.pre && l.pre.length ? l.pre.map(p => byId[p] ? `<a class="btn ghost" href="#/lesson/${p}">Practise the basics first: ${esc(byId[p].title)}</a>` : '').join('') : ''}
        <button class="btn ghost" id="st-go">Keep trying</button></div></div>`;
      const e = $('#st-easy'); if (e) e.onclick = () => { easyLeft = 4; nextQ(); };
      $('#st-go').onclick = nextQ;
    };
    const nextQ = () => {
      if (wrongRun >= 3) { wrongRun = 0; return stuck(); }
      // start gently: picture questions first, then the full range
      const pool = [...new Set(easyLeft > 0 && l.easy ? l.easy : l.easy && n < 3 ? l.easy : l.easy && n < 6 ? l.easy.concat(l.gens) : l.gens)];
      if (easyLeft > 0) easyLeft--;
      let g = K.pick(pool); if (pool.length > 1) while (g === lastGen) g = K.pick(pool); lastGen = g;
      // avoid showing the same question twice in one session
      let q = makeQ(l, g); for (let t = 0; t < 6 && seen.has(q.q); t++) q = makeQ(l, K.pick(pool)); seen.add(q.q);
      renderQ($('#qbox'), q, {
        onDone: r => { n++; if (r.correct) { right++; wrongRun = 0; } else wrongRun++; const x = record(l.id, r.correct, r.firstTry); xpGain += x; if (x) floatXP($('#qbox'), x); upd(); },
        onNext: nextQ
      });
      upd();
    };
    $('#pend').onclick = () => {
      view().innerHTML = `<div class="card summary center"><h2>Practice complete</h2><p class="big">${right}/${n} correct</p><p>+${xpGain} XP</p>
        <p class="stars">${'★'.repeat(stars(l.id))}<i>${'★'.repeat(3 - stars(l.id))}</i></p><p class="muted">${nextStarMsg(l.id)}</p>
        <div class="ctas"><a class="btn primary" href="#/practice/${l.id}">Keep going</a><a class="btn ghost" href="#/">Back to the road</a></div></div>`;
      if (right >= 5) confetti();
    };
    nextQ();
  };

  // Module checkpoint: 10 mixed questions, 3 lives
  const viewBoss = mid => {
    const m = MODS.find(x => x.id === mid); if (!m) return go('#/');
    setNav('road'); combo = 0; setSubject(m.subject);
    let lives = 3, n = 0, total = 10, right = 0;
    view().innerHTML = `<div class="practice boss" style="--mc:${m.color}">
      <div class="crumbs"><a href="#/">${R2O.icon('back')}Road</a><span id="lives" class="lives"></span></div>
      <h2 class="center">Checkpoint: ${esc(m.name)}</h2>
      <div class="pbar"><div id="pfill"></div></div>
      <div class="card qcard" id="qbox"></div></div>`;
    const upd = () => { $('#lives').innerHTML = Array.from({ length: 3 }, (_, i) => `<span class="${i < lives ? 'on' : ''}">${R2O.icon('heart')}</span>`).join('') + `<span class="vh">${lives} lives left</span>`; $('#pfill').style.width = (n / total * 100) + '%'; };
    const end = win => {
      if (win) { st.boss[mid] = true; save(); addXP(100); award('boss'); confetti(); sound('level'); }
      view().innerHTML = `<div class="card summary center"><h2>${win ? 'Checkpoint cleared!' : 'So close!'}</h2><p class="big">${right}/${n} correct</p>
        <p>${win ? '+100 XP bonus. On to the next part of the road!' : 'You ran out of lives. Review the lessons with the fewest stars, then try again.'}</p>
        <div class="ctas"><a class="btn primary" href="#/boss/${mid}">${win ? 'Play again' : 'Try again'}</a><a class="btn ghost" href="#/">Back to the road</a></div></div>`;
    };
    const nextQ = () => {
      if (lives <= 0) return end(false);
      if (n >= total) return end(true);
      const l = K.pick(m.lessons); const q = makeQ(l);
      q.q = `<p class="from muted">${esc(l.title)}</p>` + q.q;
      renderQ($('#qbox'), q, { retry: false, onDone: r => { n++; if (r.correct) right++; else lives--; const x = record(l.id, r.correct, r.firstTry); if (x) floatXP($('#qbox'), x); upd(); }, onNext: nextQ });
      upd();
    };
    nextQ();
  };

  // Daily warm-up: 5 questions favouring weak, already-started lessons
  const viewWarmup = () => {
    setNav('warm'); combo = 0;
    const started = Object.keys(st.L).filter(id => byId[id] && byId[id].subj === st.subj && st.L[id].a > 0);
    let pool = started.map(id => ({ l: byId[id], w: 1 + (1 - (st.L[id].c / Math.max(1, st.L[id].a))) * 3 }));
    if (pool.length < 3) pool = pool.concat(subjMods()[0].lessons.slice(0, 4).map(l => ({ l, w: 1 })));
    const pickW = () => { const t = pool.reduce((s, p) => s + p.w, 0); let r = Math.random() * t; for (const p of pool) { if ((r -= p.w) <= 0) return p.l; } return pool[0].l; };
    let n = 0, right = 0;
    view().innerHTML = `<div class="practice"><h2 class="center">Daily warm-up: ${subjOf(st.subj).short}</h2><p class="muted center">Mixed questions from topics you've started</p>
      <div class="pbar"><div id="pfill"></div></div><div class="card qcard" id="qbox"></div></div>`;
    const nextQ = () => {
      $('#pfill').style.width = (n / 5 * 100) + '%';
      if (n >= 5) {
        const first = st.warm !== dayStr(); st.warm = dayStr(); save();
        if (first) { addXP(20); award('warm'); }
        confetti();
        view().innerHTML = `<div class="card summary center"><h2>Warm-up done!</h2><p class="big">${right}/5</p><p>${first ? '+20 bonus XP' : 'Extra practice counts too!'}</p>
          <div class="ctas"><a class="btn primary" href="#/">Back to the road</a><a class="btn ghost" href="#/warmup">Another round</a></div></div>`;
        return;
      }
      const l = pickW(); const q = makeQ(l); q.q = `<p class="from muted">${esc(l.title)}</p>` + q.q;
      renderQ($('#qbox'), q, { onDone: r => { n++; if (r.correct) right++; const x = record(l.id, r.correct, r.firstTry); if (x) floatXP($('#qbox'), x); }, onNext: nextQ });
    };
    nextQ();
  };

  const viewMe = () => {
    setNav('me');
    const lv = level(st.xp);
    const rows = [];
    MODS.forEach(m => m.lessons.forEach(l => { const s = st.L[l.id]; if (s && s.a) rows.push({ l, acc: s.c / s.a, s }); }));
    rows.sort((a, b) => a.acc - b.acc);
    const totalStars = MODS.reduce((t, m) => t + m.lessons.reduce((s, l) => s + stars(l.id), 0), 0);
    const maxStars = MODS.reduce((t, m) => t + m.lessons.length * 3, 0);
    view().innerHTML = `<div class="me">
      <section class="card center"><div class="avatar">${(st.name || '?').slice(0, 1).toUpperCase()}</div><h2>${esc(st.name || 'Student')}</h2>
        <p>Level ${lv}, <b>${levelName(lv)}</b></p><div class="pbar"><div style="width:${(st.xp - levelXP(lv)) / (levelXP(lv + 1) - levelXP(lv)) * 100}%"></div></div>
        <p class="muted">${st.xp} XP, ${levelXP(lv + 1) - st.xp} more to level ${lv + 1}</p>
        <div class="stats"><div><b>${R2O.icon('flame')}${st.streak}</b><span>day streak</span></div><div><b>${R2O.icon('star')}${totalStars}</b><span>of ${maxStars} stars</span></div><div><b>${R2O.icon('bolt')}${st.bestCombo}</b><span>best combo</span></div></div></section>
      <section class="card"><h3>Badges</h3><div class="badges">${BADGES.map(b => `<div class="badge ${st.badges[b.id] ? 'got' : ''}" title="${b.desc}">${R2O.icon(b.icon)}<b>${b.name}</b><small>${b.desc}</small>${st.badges[b.id] ? '' : '<span class="vh">(not yet earned)</span>'}</div>`).join('')}</div></section>
      <section class="card"><h3>Topics to work on</h3>${rows.length ? `<ul class="weak">${rows.slice(0, 6).map(r => `<li><a href="#/practice/${r.l.id}">${esc(r.l.title)}</a><span class="acc ${r.acc < .6 ? 'lo' : r.acc < .8 ? 'mid' : 'hi'}">${Math.round(r.acc * 100)}%</span></li>`).join('')}</ul>` : '<p class="muted">Answer some questions and your weakest topics will show here.</p>'}</section>
      <section class="card"><h3>Settings</h3>
        <label class="field">Your name<input id="s-name" value="${esc(st.name)}" maxlength="24"></label>
        <label class="field">Exam date (O Level papers are in June and November)<input id="s-exam" type="date" value="${st.exam || ''}"></label>
        <label class="field">Daily goal<select id="s-goal">${[30, 50, 100, 150].map(g => `<option ${st.goal === g ? 'selected' : ''} value="${g}">${g} XP a day</option>`).join('')}</select></label>
        <label class="field row"><input id="s-sound" type="checkbox" ${st.sound ? 'checked' : ''}> Sound effects</label>
        ${R2O.canSpeak && R2O.canSpeak() ? `<label class="field row"><input id="s-voice" type="checkbox" ${st.voice ? 'checked' : ''}> Show read-aloud buttons</label>` : '<p class="muted small">Read-aloud isn\'t available in this browser.</p>'}
        <button class="btn primary" id="s-save">Save</button>
        <p class="muted small">Your progress is saved on this device only. No account, no data sent anywhere.</p></section>
      <section class="card"><h3>My subjects and goal</h3>
        ${st.career && R2O.CAREERS ? `<p>Goal: <b>${esc((R2O.CAREERS.find(c => c.id === st.career) || {}).name || '')}</b></p>` : ''}
        <ul class="mysubj">${(st.chosen || SUBJECTS.filter(s => s.id !== BASIC && ready(s)).map(s => s.id)).map(id => `<li>${R2O.badge(subjOf(id))}${subjOf(id).short}</li>`).join('')}</ul>
        <p>${st.engPass ? 'English check passed.' : `English check: ${st.engBest != null ? `best ${st.engBest}/20, ` : ''}pass mark 14/20.`}</p>
        <div class="ctas"><a class="btn ghost" href="#/subjects">Change subjects</a><a class="btn ghost" href="#/engtest">${st.engPass ? 'Retake' : 'Take'} the English check</a></div></section>
      <section class="card"><h3>Who's learning on this phone?</h3>
        <p class="muted small">Brothers, sisters and friends can each have their own progress on one phone.</p>
        <ul class="profiles">${R2O.profiles().map(p => `<li><b>${esc(p.name || 'New learner')}</b>${p.cur ? ' <span class="muted">(you)</span>' : ` <button class="btn ghost small" data-sw="${p.id}">Switch</button> <button class="link small" data-del="${p.id}">Remove</button>`}</li>`).join('')}</ul>
        <button class="btn ghost" id="p-add">${R2O.icon('plus')}Add another learner</button></section>
      <section class="card"><h3>Back up my progress</h3>
        <p class="muted small">If you clear the browser or change phone, your progress is lost. Copy this code and send it to yourself (WhatsApp, SMS or email). To get your progress back, paste it here.</p>
        <div class="ctas"><button class="btn primary" id="b-copy">${R2O.icon('save')}Copy my backup code</button>${navigator.share ? '<button class="btn ghost" id="b-share">Send it to myself</button>' : ''}</div>
        <label class="field">Paste a backup code<textarea id="b-in" rows="3" placeholder="R2O1.…"></textarea></label>
        <button class="btn ghost" id="b-restore">Restore from code</button></section>
      <section class="card"><button class="btn danger" id="s-reset">Reset all progress</button></section></div>`;
    $('#s-save').onclick = () => { st.name = $('#s-name').value.trim(); st.exam = $('#s-exam').value || null; st.goal = +$('#s-goal').value; st.sound = $('#s-sound').checked; if ($('#s-voice')) st.voice = $('#s-voice').checked; save(); updateTop(); toast('Settings saved'); };
    $$('[data-sw]').forEach(b => b.onclick = () => R2O.switchProfile(b.dataset.sw));
    $$('[data-del]').forEach(b => b.onclick = () => { const p = R2O.profiles().find(x => x.id === b.dataset.del); if (confirm(`Remove ${p.name || 'this learner'} and all their progress from this phone?`)) R2O.deleteProfile(p.id); });
    $('#p-add').onclick = () => R2O.addProfile();
    const code = R2O.backupCode();
    $('#b-copy').onclick = async () => { try { await navigator.clipboard.writeText(code); toast('Backup code copied. Paste it into a message to yourself.'); } catch (e) { $('#b-in').value = code; $('#b-in').select(); toast('Select the code in the box and copy it'); } };
    if ($('#b-share')) $('#b-share').onclick = () => navigator.share({ title: 'My Road to O\'s backup', text: code }).catch(() => { });
    $('#b-restore').onclick = () => { const v = $('#b-in').value.trim(); if (!v) return; if (!confirm('Replace the progress on this phone with the backup?')) return; const r = R2O.restoreCode(v); if (r === true) { toast('Progress restored'); updateTop(); viewMe(); } else toast(r); };
    $('#s-reset').onclick = () => { if (confirm('Delete all your progress on this device? This cannot be undone.')) { st = fresh(); st.onboarded = true; save(); updateTop(); viewMe(); toast('Progress reset'); } };
  };

  // ---------------- welcome: jobs → subjects → English check ----------------
  const cambridge = () => SUBJECTS.filter(s => s.id !== BASIC && ready(s));
  const subjChecklist = picked => `<div class="subjpick">${cambridge().map(s => `<label class="spick" style="--sc:${s.color}"><input type="checkbox" value="${s.id}" ${picked.includes(s.id) ? 'checked' : ''}>${R2O.badge(s)}<b>${s.name}</b></label>`).join('')}</div>
    <p class="muted small">Not here yet: Combined Science, Economics, Accounting, Business, Pakistan Studies, Islamiyat, Urdu and Bangla. We hope to add them.</p>`;
  const readPicked = () => $$('.subjpick input:checked').map(i => i.value);
  const careerPanel = c => `<div class="cpanel"><h3>${esc(c.name)}</h3><p>${c.say}</p>
    <p><b>Useful O Level subjects:</b></p><ul class="needlist">${c.need.map(id => SUBJECTS.find(s => s.id === id)).filter(Boolean).map(s => `<li>${R2O.badge(s)}${s.name}</li>`).join('')}</ul>
    ${c.note ? `<p class="muted small">${c.note}</p>` : ''}</div>`;

  const viewWelcome = (step = 1) => {
    setNav('');
    const v = view(); window.scrollTo(0, 0);
    const dots = `<div class="wdots">${[1, 2, 3, 4].map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
    if (step === 1) {
      v.innerHTML = `<div class="welcome card">${dots}${R2O.logo('big')}<h1>Welcome to Road to O's</h1>
        <p>Free lessons for <b>Cambridge O Levels</b>, from the very beginning, on any phone. Every lesson starts with pictures.</p>
        <p>Good O Level results open doors: to A Levels, college, scholarships and jobs. <b>Different jobs need different subjects</b>, so first let's choose yours.</p>
        <label class="field">What should we call you?<input id="ob-name" maxlength="24" placeholder="Your first name" value="${esc(st.name)}"></label>
        <button class="btn primary big wide" id="w-next">Next</button>
        ${R2O.profiles().length > 1 ? `<p class="center small"><a href="#/me">Not you? Switch learner</a></p>` : ''}</div>`;
      $('#w-next').onclick = () => { st.name = $('#ob-name').value.trim(); save(); viewWelcome(2); };
      return;
    }
    if (step === 2) {
      const C = R2O.CAREERS || [];
      v.innerHTML = `<div class="welcome card">${dots}<h2>What would you like to be?</h2>
        <p class="muted">Tap a job to see which subjects help. Almost every college and job asks for <b>English and Maths</b>. These are common choices: always check what the place you want to study asks for.</p>
        <div class="careers">${C.map(c => `<button class="career ${st.career === c.id ? 'on' : ''}" data-c="${c.id}" aria-pressed="${st.career === c.id}">${esc(c.name)}</button>`).join('')}</div>
        <div id="cp"></div>
        <div class="ctas"><button class="btn ghost" id="w-back">${R2O.icon('back')}Back</button><button class="btn primary" id="w-next" ${st.career ? '' : 'disabled'}>Choose my subjects</button></div></div>`;
      const show = id => { const c = C.find(x => x.id === id); st.career = id; save(); $$('.career').forEach(b => { b.classList.toggle('on', b.dataset.c === id); b.setAttribute('aria-pressed', b.dataset.c === id); }); $('#cp').innerHTML = careerPanel(c); $('#w-next').disabled = false; $('#cp').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      $$('.career').forEach(b => b.onclick = () => show(b.dataset.c));
      if (st.career) show(st.career);
      $('#w-back').onclick = () => viewWelcome(1);
      $('#w-next').onclick = () => { const c = C.find(x => x.id === st.career); if (c && !st.chosen) st.chosen = c.need.filter(id => SUBJECTS.some(s => s.id === id)); save(); viewWelcome(3); };
      return;
    }
    if (step === 3) {
      const c = (R2O.CAREERS || []).find(x => x.id === st.career);
      v.innerHTML = `<div class="welcome card">${dots}<h2>Choose your subjects</h2>
        <p class="muted">${c ? `We ticked the ones that help a future <b>${esc(c.name.toLowerCase())}</b>. ` : ''}Add or remove any. Most students take 6 to 8 subjects. As a private candidate you pay for each exam, so choose carefully.</p>
        ${subjChecklist(st.chosen || [])}
        <p class="hint small" id="w-warn"></p>
        <div class="ctas"><button class="btn ghost" id="w-back">${R2O.icon('back')}Back</button><button class="btn primary" id="w-next">Next</button></div></div>`;
      $('#w-back').onclick = () => { st.chosen = readPicked(); save(); viewWelcome(2); };
      $('#w-next').onclick = () => { const p = readPicked(); if (!p.length) { $('#w-warn').textContent = 'Choose at least one subject.'; return; } st.chosen = p; save(); if (st.onboarded) { toast('Subjects saved'); return go('#/'); } viewWelcome(4); };
      return;
    }
    v.innerHTML = `<div class="welcome card">${dots}<h2>First, a quick English check</h2>
      <p>All the lessons are in English, so let's make sure English won't hold you back.</p>
      <ol class="steps-list"><li><b>20 short questions</b>, about 10 minutes.</li><li>Get <b>14 or more</b> right and your subjects open straight away.</li><li>Not yet? No problem. We start with <b>Basic English</b> lessons, then you try again. You can try as many times as you like.</li></ol>
      <div class="ctas col"><button class="btn primary big" id="w-test">Start the English check</button><button class="btn ghost" id="w-basic">Start with Basic English lessons</button></div></div>`;
    const done = () => { st.onboarded = true; save(); updateTop(); };
    $('#w-test').onclick = () => { done(); go('#/engtest'); };
    $('#w-basic').onclick = () => { done(); setSubject(BASIC); go('#/'); };
  };

  const viewSubjects = () => {
    setNav('road');
    view().innerHTML = `<div class="welcome card"><div class="crumbs"><a href="#/">${R2O.icon('back')}Road</a></div><h2>My subjects</h2>
      <p class="muted">Choose the subjects you will take. Basic English is always there for you.</p>
      ${subjChecklist(st.chosen || cambridge().map(s => s.id))}
      <p><a href="#/welcome/2">See which subjects different jobs need</a></p>
      <p class="hint small" id="w-warn"></p><button class="btn primary" id="s-ok">Save</button></div>`;
    $('#s-ok').onclick = () => { const p = readPicked(); if (!p.length) { $('#w-warn').textContent = 'Choose at least one subject.'; return; } st.chosen = p; if (!p.includes(st.subj) && st.subj !== BASIC) st.subj = p[0]; save(); toast('Subjects saved'); go('#/'); };
  };

  // ---------------- the English check (unlocks the chosen subjects) ----------------
  const PASS = 14, TEST_N = 20;
  const gateCard = S => `<div class="card gate"><h3>${R2O.icon('lock')}${esc(S.short)} opens after the English check</h3>
    <p>The lessons are in English, so first we make sure English is easy for you. ${st.engBest != null ? `Your best score so far: <b>${st.engBest}/${TEST_N}</b>. You need ${PASS}.` : `You need ${PASS} out of ${TEST_N}.`}</p>
    <div class="ctas"><a class="btn primary" href="#/engtest">Take the English check</a><a class="btn ghost" href="#/subject/${BASIC}">Learn Basic English</a></div></div>`;
  const basicCard = () => st.engPass
    ? `<div class="card gate ok"><b>You passed the English check!</b> Your subjects are open. Basic English stays here whenever you want to practise.</div>`
    : `<div class="card gate"><h3>Basic English first</h3><p>Go through these lessons, then take the English check (${TEST_N} questions, pass mark ${PASS}). Passing opens your subjects.</p><a class="btn primary" href="#/engtest">Take the English check${st.engBest != null ? ` (best ${st.engBest}/${TEST_N})` : ''}</a></div>`;
  const viewEngTest = () => {
    setNav('road'); combo = 0;
    const T = R2O.ENGTEST; if (!T) return go('#/');
    const ids = K.shuffle(T.flatMap(t => [t, t])).slice(0, TEST_N);
    let n = 0, right = 0; const miss = {};
    view().innerHTML = `<div class="practice"><div class="crumbs"><a href="#/">${R2O.icon('back')}Road</a><span id="etn"></span></div><h2 class="center">English check</h2>
      <p class="muted center">Take your time. There's no time limit.</p><div class="pbar"><div id="pfill"></div></div><div class="card qcard" id="qbox"></div></div>`;
    const end = () => {
      const pass = right >= PASS; st.engBest = Math.max(st.engBest || 0, right);
      const first = pass && !st.engPass; if (pass) st.engPass = true; save();
      if (pass) { confetti(); sound('level'); if (first) addXP(100); }
      const weak = Object.entries(miss).sort((a, b) => b[1] - a[1]).map(([lid]) => byId[lid]).filter(Boolean).slice(0, 3);
      const mine = (st.chosen || []).map(id => subjOf(id));
      view().innerHTML = `<div class="card summary center"><h2>${pass ? 'You passed!' : 'Good try!'}</h2><p class="big">${right}/${TEST_N}</p>
        ${pass ? `<p>Your English is ready for the lessons.${first ? ' +100 XP!' : ''} Your subjects are open now:</p><div class="ctas col">${mine.map(s => `<a class="btn ghost" href="#/subject/${s.id}">${R2O.badge(s)}Start ${s.name}</a>`).join('')}</div>`
          : `<p>You need ${PASS} to pass. Let's practise the parts that were tricky, then try again. You can do it!</p>${weak.length ? `<div class="ctas col">${weak.map(l => `<a class="btn ghost" href="#/lesson/${l.id}">${esc(l.title)}</a>`).join('')}</div>` : ''}
          <div class="ctas"><a class="btn primary" href="#/subject/${BASIC}">Basic English lessons</a><a class="btn ghost" href="#/engtest">Try again</a></div>`}</div>`;
    };
    const nextQ = () => {
      $('#pfill').style.width = (n / TEST_N * 100) + '%'; $('#etn').textContent = `Question ${Math.min(n + 1, TEST_N)} of ${TEST_N}`;
      if (n >= TEST_N) return end();
      const gid = ids[n], l = MODS.flatMap(m => m.lessons).find(x => x.subj === BASIC && x.gens.includes(gid));
      const q = R2O.GEN[gid](); q.gen = gid;
      renderQ($('#qbox'), q, { retry: false, nextLabel: n === TEST_N - 1 ? 'See my score' : 'Next question', onDone: r => { n++; if (r.correct) right++; else if (l) miss[l.id] = (miss[l.id] || 0) + 1; }, onNext: nextQ });
    };
    nextQ();
  };

  // ---------------- router ----------------
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  R2O.go = go;
  const route = () => {
    const [path, qs] = (location.hash || '#/').slice(2).split('?'); const parts = path.split('/');
    const query = Object.fromEntries((qs || '').split('&').filter(Boolean).map(p => p.split('=').map(decodeURIComponent)));
    $('#view').classList.remove('enter'); void $('#view').offsetWidth; $('#view').classList.add('enter');
    if (R2O.stopSpeaking) R2O.stopSpeaking();
    if (!st.onboarded && !['welcome', 'me'].includes(parts[0])) return viewWelcome(1);
    // a locked subject's lessons wait until the English check is passed
    const subjOfRoute = parts[0] === 'lesson' || parts[0] === 'practice' ? (byId[parts[1]] || {}).subj : parts[0] === 'boss' ? (MODS.find(m => m.id === parts[1]) || {}).subject : parts[0] === 'warmup' ? st.subj : null;
    if (subjOfRoute && locked(subjOfRoute)) { setSubject(subjOfRoute); window.scrollTo(0, 0); return viewHome(); }
    switch (parts[0]) {
      case 'lesson': return viewLesson(parts[1]);
      case 'practice': window.scrollTo(0, 0); return viewPractice(parts[1]);
      case 'boss': window.scrollTo(0, 0); return viewBoss(parts[1]);
      case 'warmup': window.scrollTo(0, 0); return viewWarmup();
      case 'buddy': setNav('buddy'); return R2O.buddy.view($('#view'));
      case 'me': window.scrollTo(0, 0); return viewMe();
      case 'welcome': return viewWelcome(+parts[1] || 1);
      case 'subjects': window.scrollTo(0, 0); return viewSubjects();
      case 'engtest': window.scrollTo(0, 0); return viewEngTest();
      case 'write': window.scrollTo(0, 0); setNav('road'); return R2O.writing ? R2O.writing.view($('#view'), parts[1], query) : viewHome();
      case 'subject': setSubject(parts[1]); history.replaceState(null, '', '#/'); window.scrollTo(0, 0); return viewHome();
      default: return viewHome();
    }
  };
  R2O.start = () => {
    window.addEventListener('hashchange', route);
    updateTop(); route();
  };
})();
