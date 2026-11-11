// Picture-first learning: concrete → pictorial → abstract (the Singapore approach).
// A lesson's `scenes` are played one step at a time. Each step can have:
//   say:  what the guide says (html)
//   pic:  a picture (html/svg)
//   anim: an interactive picture {type, ...} the student taps to make something happen
//   ask:  a gentle question about the picture {q, opts, a, why, hint}
(() => {
  const K = R2O.K, n = K.n, fr = K.fr;
  const $ = (s, e = document) => e.querySelector(s), $$ = (s, e = document) => Array.from(e.querySelectorAll(s));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const A = R2O.ANIM = {};
  const obs = (k, e, cls = '') => Array.from({ length: k }, () => `<span class="ob ${cls}">${e}</span>`).join('');
  const act = (label, cls = 'primary') => `<button class="btn ${cls} act">${label}</button>`;
  const cap = (el, html) => { const c = $('.cap', el); if (c) { c.innerHTML = html; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); } };

  // Tap objects to count them 1, 2, 3…
  const countable = (el, sel = '.ob:not(.gone)') => {
    let k = 0; const items = $$(sel, el);
    items.forEach(o => o.onclick = () => { if (o.dataset.c) return; o.dataset.c = ++k; o.classList.add('counted'); R2O.sound && R2O.sound('ok'); if (k === items.length) cap(el, `You counted <b>${k}</b>!`); });
    const hint = document.createElement('p'); hint.className = 'muted small center'; hint.textContent = 'Tap each one to count it'; el.appendChild(hint);
  };

  // Two groups come together (addition)
  A.join = (el, o, done) => {
    el.innerHTML = `<div class="groups"><div class="grp g1">${obs(o.a, o.e)}</div><div class="plus">+</div><div class="grp g2">${obs(o.b, o.e2 || o.e)}</div></div>${act(o.label || 'Put them together')}<p class="cap"></p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); const g1 = $('.g1', el), g2 = $('.g2', el); $('.plus', el).classList.add('gone');
      for (const ob of $$('.ob', g2)) { g1.appendChild(ob); ob.classList.add('pop'); await sleep(170); }
      g2.remove(); $('.plus', el).remove(); g1.classList.add('merged');
      cap(el, o.after || 'All together now!'); countable(el); done();
    };
  };
  // Some objects are taken away (subtraction)
  A.remove = (el, o, done) => {
    el.innerHTML = `<div class="groups"><div class="grp">${obs(o.n, o.e)}</div></div>${act(o.label || `Take away ${o.k}`)}<p class="cap"></p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); const all = $$('.ob', el);
      for (const ob of all.slice(-o.k).reverse()) { ob.classList.add('gone'); await sleep(220); }
      cap(el, o.after || `${o.k} gone. How many are left?`); countable(el); done();
    };
  };
  // Rows of objects (multiplication as repeated groups)
  A.array = (el, o, done) => {
    let rows = 0;
    el.innerHTML = `<div class="arr"></div>${act('Add a row')}<p class="cap">0 rows</p>`;
    $('.act', el).onclick = () => {
      rows++; const r = document.createElement('div'); r.className = 'arow pop'; r.innerHTML = obs(o.c, o.e); $('.arr', el).appendChild(r);
      cap(el, `${rows} row${rows > 1 ? 's' : ''} of ${o.c} = <b>${rows * o.c}</b>`);
      if (rows === o.r) { $('.act', el).remove(); done(); }
    };
  };
  // Share objects equally onto plates (division)
  A.share = (el, o, done) => {
    el.innerHTML = `<div class="pile">${obs(o.n, o.e)}</div><div class="plates">${Array.from({ length: o.k }, () => `<div class="plate"><span class="pl">${o.plate || '🍽️'}</span><div class="on"></div></div>`).join('')}</div>${act(o.label || 'Share them out')}<p class="cap"></p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); const plates = $$('.plate .on', el); let i = 0;
      for (const ob of $$('.pile .ob', el)) { plates[i % o.k].appendChild(ob); ob.classList.add('pop'); i++; await sleep(Math.max(60, 600 / o.n * 3)); }
      cap(el, o.after || `Each plate gets <b>${o.n / o.k}</b>.`); done();
    };
  };
  // Bundle ones into tens (place value)
  A.bundle = (el, o, done) => {
    el.innerHTML = `<div class="groups"><div class="grp wide">${obs(o.n, o.e)}</div></div>${act('Bundle them in tens')}<p class="cap"></p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); const g = $('.grp', el); const items = $$('.ob', g); const tens = Math.floor(o.n / 10);
      g.innerHTML = '';
      for (let t = 0; t < tens; t++) { const b = document.createElement('span'); b.className = 'ten pop'; b.innerHTML = `<span>${obs(10, o.e, 'tiny')}</span><b>10</b>`; g.appendChild(b); await sleep(350); }
      for (let i = 0; i < o.n % 10; i++) { const s = document.createElement('span'); s.className = 'ob pop'; s.textContent = o.e; g.appendChild(s); }
      cap(el, `<b>${tens}</b> tens and <b>${o.n % 10}</b> ones = <b>${o.n}</b>`); done();
    };
  };
  // A frog hops along a number line
  A.hop = (el, o, done) => {
    const draw = (pos, jump) => K.numberLine(o.min, o.max, { step: o.step || 1, marks: [{ x: pos, label: '🐸' }], jump });
    el.innerHTML = `<div class="nl">${draw(o.start)}</div>${act(o.label || 'Hop!')}<p class="cap">Start at <b>${n(o.start)}</b></p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); let pos = o.start;
      for (const j of o.jumps) { const to = pos + j; $('.nl', el).innerHTML = draw(to, { from: pos, to, label: (j > 0 ? '+' : '−') + Math.abs(j) }); R2O.sound && R2O.sound('ok'); cap(el, `${n(pos)} ${j > 0 ? '+' : '−'} ${Math.abs(j)} = <b>${n(to)}</b>`); pos = to; await sleep(900); }
      if (o.after) cap(el, o.after); done();
    };
  };
  // Pizza: tap slices to shade them (fractions)
  A.pizza = (el, o, done) => {
    let on = new Set(o.pre || []);
    const draw = () => {
      let s = `<svg class="viz pizza" viewBox="0 0 220 220">`;
      for (let i = 0; i < o.d; i++) {
        const a0 = -Math.PI / 2 + i * 2 * Math.PI / o.d, a1 = a0 + 2 * Math.PI / o.d, P = a => [110 + 95 * Math.cos(a), 110 + 95 * Math.sin(a)];
        s += o.d === 1 ? `<circle cx="110" cy="110" r="95" data-i="0" class="slice2 ${on.has(0) ? 'on' : ''}"/>` : `<path d="M110 110 L${P(a0)} A95 95 0 0 1 ${P(a1)} Z" data-i="${i}" class="slice2 ${on.has(i) ? 'on' : ''}"/>`;
      }
      return s + `</svg>`;
    };
    const upd = () => { $('.pz', el).innerHTML = draw(); cap(el, `<span class="bigq">${fr(on.size, o.d)}</span> &nbsp;${on.size} of ${o.d} slices`); $$('.slice2', el).forEach(p => p.onclick = () => { if (o.lock) return; const i = +p.dataset.i; on.has(i) ? on.delete(i) : on.add(i); R2O.sound && R2O.sound('ok'); upd(); if (o.target == null || on.size === o.target) { if (o.target != null) cap(el, `<span class="bigq">${fr(on.size, o.d)}</span> ✅ ${o.after || ''}`); done(); } }); };
    el.innerHTML = `<div class="pz"></div><p class="cap"></p>${o.target != null ? `<p class="muted small center">👆 Tap ${o.target} slice${o.target > 1 ? 's' : ''}</p>` : ''}`;
    upd(); if (o.target == null) done();
  };
  // Step-by-step picture reveal (bar models, factor trees, area models…)
  A.reveal = (el, o, done) => {
    let i = 0;
    el.innerHTML = `<div class="stage"></div>${act(o.label || 'Show me')}`;
    const show = () => { $('.stage', el).innerHTML = o.keep ? o.stages.slice(0, i + 1).join('') : o.stages[i]; $('.stage', el).firstElementChild && $('.stage', el).classList.remove('pop'); void el.offsetWidth; $('.stage', el).classList.add('pop'); };
    show();
    $('.act', el).onclick = e => { i++; show(); if (i === o.stages.length - 1) { e.target.remove(); done(); } else e.target.textContent = o.next || 'Next ▸'; };
    if (o.stages.length === 1) { $('.act', el).remove(); done(); }
  };
  // Balance scale for equations: take the same from both sides
  A.balance = (el, o, done) => { // o: {a: number of x bags, b: loose blocks left, c: blocks right}
    let L = o.b, R = o.c, split = false;
    const pan = (bags, blocks, side) => `<div class="pan ${side}"><div class="items">${'<span class="bag">x</span>'.repeat(bags)}${'<span class="blk"></span>'.repeat(blocks)}</div></div>`;
    const draw = msg => {
      $('.scale', el).innerHTML = split
        ? `<div class="pans">${pan(1, 0, 'l')}<div class="eq">=</div>${pan(0, R / o.a, 'r')}</div>`
        : `<div class="pans">${pan(o.a, L, 'l')}<div class="eq">=</div>${pan(0, R, 'r')}</div>`;
      cap(el, msg);
    };
    el.innerHTML = `<div class="scale"></div><div class="beam">⚖️</div><div class="ctas"></div><p class="cap"></p>`;
    const btns = () => {
      const c = $('.ctas', el); c.innerHTML = '';
      if (L > 0) { const b = document.createElement('button'); b.className = 'btn primary'; b.textContent = 'Take 1 block off BOTH sides'; b.onclick = () => { L--; R--; R2O.sound && R2O.sound('ok'); draw(`${o.a > 1 ? o.a : ''}x + ${L} = ${R}` .replace(' + 0', '') + ' &nbsp;· still balanced ✓'); btns(); }; c.appendChild(b); }
      else if (o.a > 1 && !split) { const b = document.createElement('button'); b.className = 'btn primary'; b.textContent = `Split both sides into ${o.a} equal groups`; b.onclick = () => { split = true; R2O.sound && R2O.sound('ok'); draw(`<b>x = ${R / o.a}</b> 🎉`); btns(); done(); }; c.appendChild(b); }
      else { if (!split) draw(`<b>x = ${R}</b> 🎉`); done(); }
    };
    draw(`${o.a > 1 ? o.a : ''}x + ${L} = ${R} &nbsp;(each bag holds x blocks)`); btns();
  };
  // 10 × 10 grid: shade a percentage or hundredths
  A.grid100 = (el, o, done) => {
    el.innerHTML = `<div class="g100">${'<i></i>'.repeat(100)}</div>${act(o.label || `Shade ${o.p}`)}<p class="cap">1 whole = 100 small squares</p>`;
    $('.act', el).onclick = async e => {
      e.target.remove(); const cells = $$('.g100 i', el);
      for (let i = 0; i < o.k; i++) { cells[i].classList.add('on'); if (i % 5 === 4) await sleep(25); }
      cap(el, o.after); done();
    };
  };
  // Thermometer goes up or down (negative numbers)
  A.thermo = (el, o, done) => {
    const lo = -10, hi = 10, pos = t => (hi - t) / (hi - lo) * 100;
    el.innerHTML = `<div class="thermo"><div class="scaleT">${Array.from({ length: 21 }, (_, i) => `<span style="top:${i * 5}%">${n(hi - i)}</span>`).join('')}</div><div class="tube"><div class="mercury"></div><div class="tmark"></div></div></div>${act(o.label)}<p class="cap"></p>`;
    const set = t => { $('.mercury', el).style.top = pos(t) + '%'; $('.tmark', el).style.top = pos(t) + '%'; cap(el, `<span class="bigq">${n(t)} °C</span>`); };
    set(o.start);
    $('.act', el).onclick = async e => { e.target.remove(); const s = Math.sign(o.change); for (let t = o.start; t !== o.start + o.change;) { t += s; set(t); await sleep(220); } if (o.after) cap(el, o.after); done(); };
  };
  // Towers of blocks levelled out (the mean)
  A.level = (el, o, done) => {
    const mean = o.t.reduce((a, b) => a + b, 0) / o.t.length;
    el.innerHTML = `<div class="towers">${o.t.map(h => `<div class="tw2"><div class="stack" style="height:${h * 22}px"></div><b>${h}</b></div>`).join('')}</div>${act('Share the blocks out evenly')}<p class="cap">Total: ${o.t.join(' + ')} = ${o.t.reduce((a, b) => a + b, 0)} blocks</p>`;
    $('.act', el).onclick = e => { e.target.remove(); $$('.stack', el).forEach(s => s.style.height = mean * 22 + 'px'); $$('.tw2 b', el).forEach(b => b.textContent = n(mean)); setTimeout(() => { cap(el, `Every tower is now <b>${n(mean)}</b> high. That is the <b>mean</b>!`); done(); }, 700); };
  };
  // Bag of balls: pick one at random (probability)
  A.bag = (el, o, done) => {
    const pool = o.balls.flatMap(([e, k]) => Array(k).fill(e)); const tally = {};
    el.innerHTML = `<div class="bagbox"><div class="bagpic">👜</div><div class="inbag">${pool.map(e => `<span class="ob">${e}</span>`).join('')}</div></div>${act('Pick one without looking')}<div class="picked"></div><p class="cap"></p>`;
    let picks = 0;
    $('.act', el).onclick = () => {
      const e = K.pick(pool); tally[e] = (tally[e] || 0) + 1; picks++;
      $('.picked', el).innerHTML = `<span class="ob pop big">${e}</span>`;
      cap(el, `Picks so far: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(' · ')} (put it back each time)`);
      if (picks === 3) done();
    };
  };

  // ---------- written methods, one tiny step at a time ----------
  // Pure step builders (no DOM) so they can be tested. Columns are indexed from the right: 0 = ones.
  const NAMES = ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'hundred-thousands'];
  const ONE = ['one', 'ten', 'hundred', 'thousand', 'ten-thousand', 'hundred-thousand'];
  const digs = v => String(v).split('').reverse().map(Number);
  const dotsPic = (groups) => `<div class="cdots">${groups.map(([k, cls, lab]) => k ? `<span class="dg">${('<i class="' + cls + '"></i>').repeat(k)}${lab ? `<small>${lab}</small>` : ''}</span>` : '').join('<b>+</b>')}</div>`;
  const bundlePic = (s, i) => `<div class="cdots"><span class="dg bundle">${'<i class="d1"></i>'.repeat(10)}<small>10 ${NAMES[i]}</small></span><b>→</b><span class="dg moved"><i class="big"></i><small>1 ${ONE[i + 1]}<br>goes next door ⬅</small></span>${s - 10 ? `<span class="dg">${'<i class="d1"></i>'.repeat(s - 10)}<small>${s - 10} left here</small></span>` : ''}</div>`;
  const breakPic = (k) => `<div class="cdots"><span class="dg moved"><i class="big"></i><small>1 ${ONE[k]}</small></span><b>→</b><span class="dg">${'<i class="d1"></i>'.repeat(10)}<small>10 ${NAMES[k - 1]}</small></span></div>`;
  const C = R2O.colFrames = {};
  C.add = (a, b) => {
    const da = digs(a), db = digs(b), W = Math.max(da.length, db.length) + 1;
    const st = { top: Array.from({ length: W }, (_, i) => da[i] != null ? [da[i]] : []), bot: db, carry: Array(W).fill(''), res: Array(W).fill('') };
    const F = []; const snap = (hl, text, pic) => F.push({ hl, text, pic, top: st.top.map(x => x.slice()), bot: st.bot.slice(), carry: st.carry.slice(), res: st.res.slice() });
    snap(-1, `Write the numbers in <b>columns</b>: ones under ones, tens under tens. We always start on the <b>right</b>, with the ones.`);
    let c = 0;
    for (let i = 0; i < W - 1 || c; i++) {
      if (i >= W) break;
      const x = da[i] || 0, y = db[i] || 0, s = x + y + c;
      if (i >= Math.max(da.length, db.length)) { st.res[i] = c; snap(i, `Nothing else to add in the ${NAMES[i]} column, just the <b>1</b> we carried. Write it at the bottom.`); c = 0; break; }
      snap(i, `<b>${NAMES[i][0].toUpperCase() + NAMES[i].slice(1)} column:</b> ${x} + ${y}${c ? ` + <span class="cr">${c}</span> (the one we carried)` : ''} = <b>${s}</b> ${NAMES[i]}`, dotsPic([[x, 'd1', String(x)], [y, 'd2', String(y)], [c, 'd3', 'carried']]));
      if (s >= 10) {
        st.res[i] = s - 10; st.carry[i + 1] = '1';
        snap(i, `${s} ${NAMES[i]} is <b>too many</b> for one column (each column can only hold 0 to 9). So we bundle <b>10 ${NAMES[i]}</b> together: they make <b>1 ${ONE[i + 1]}</b>.<br>Write the <b>${s - 10}</b> left over at the bottom. Then move the bundle to the ${NAMES[i + 1]} column: write a small <span class="cr">1</span> at the top of that column so we don't forget it. <i>That is what "carry the one" means!</i>`, bundlePic(s, i));
        c = 1;
      } else { st.res[i] = s; snap(i, `${s} is less than 10, so it fits. Write <b>${s}</b> at the bottom of the ${NAMES[i]} column.`); c = 0; }
    }
    snap(-1, `Done! <b>${n(a)} + ${n(b)} = ${n(a + b)}</b>`); F.answer = a + b; return F;
  };
  C.sub = (a, b) => {
    const da = digs(a), db = digs(b), W = da.length;
    const st = { top: da.map(d => [d]), bot: db, carry: Array(W).fill(''), res: Array(W).fill('') };
    const F = []; const snap = (hl, text, pic) => F.push({ hl, text, pic, top: st.top.map(x => x.slice()), bot: st.bot.slice(), carry: st.carry.slice(), res: st.res.slice() });
    const cur = i => st.top[i][st.top[i].length - 1];
    snap(-1, `Write the bigger number on top, in <b>columns</b>. Start on the <b>right</b>, with the ones.`);
    for (let i = 0; i < W; i++) {
      const y = db[i] || 0;
      if (cur(i) < y) {
        snap(i, `<b>${NAMES[i][0].toUpperCase() + NAMES[i].slice(1)} column:</b> ${cur(i)} − ${y}. We can't take ${y} away from ${cur(i)}: there aren't enough ${NAMES[i]}! We need to <b>borrow</b> from the next column.`, dotsPic([[cur(i), 'd1', `only ${cur(i)}`]]));
        let j = i + 1; while (cur(j) === 0) j++;
        if (j > i + 1) snap(j - 1, `But the ${NAMES[i + 1]} column has <b>0</b>, nothing to borrow! So first we go further left, to the ${NAMES[j]} column.`);
        for (let k = j; k > i; k--) {
          const o1 = cur(k), o2 = cur(k - 1);
          st.top[k].push(o1 - 1); st.top[k - 1].push(o2 + 10);
          snap(k - 1, `Take <b>1 ${ONE[k]}</b> from the ${NAMES[k]} column: cross out ${o1}, write <span class="cr">${o1 - 1}</span>.<br>1 ${ONE[k]} = <b>10 ${NAMES[k - 1]}</b>, so the ${NAMES[k - 1]} column gets 10 more: ${o2} becomes <span class="cr">${o2 + 10}</span>.`, breakPic(k));
        }
      }
      const r = cur(i) - y; st.res[i] = (i === W - 1 && r === 0 && W > 1) ? '' : r;
      snap(i, `<b>${NAMES[i][0].toUpperCase() + NAMES[i].slice(1)}:</b> ${cur(i)} − ${y} = <b>${r}</b>. Write ${r} at the bottom.`);
    }
    for (let k = W - 1; k > 0 && (st.res[k] === 0 || st.res[k] === ''); k--) st.res[k] = '';
    snap(-1, `Done! <b>${n(a)} − ${n(b)} = ${n(a - b)}</b>. Check: ${n(a - b)} + ${n(b)} = ${n(a)} ✓`); F.answer = a - b; return F;
  };
  C.mul = (a, d) => {
    const da = digs(a), W = da.length + 1;
    const st = { top: Array.from({ length: W }, (_, i) => da[i] != null ? [da[i]] : []), bot: [d], carry: Array(W).fill(''), res: Array(W).fill('') };
    const F = []; const snap = (hl, text, pic) => F.push({ hl, text, pic, top: st.top.map(x => x.slice()), bot: st.bot.slice(), carry: st.carry.slice(), res: st.res.slice() });
    snap(-1, `${n(a)} × ${d} means ${d} lots of ${n(a)}. We multiply each column by ${d}, starting on the <b>right</b>.`);
    let c = 0;
    for (let i = 0; i < da.length; i++) {
      const p = d * da[i] + c;
      snap(i, `<b>${NAMES[i][0].toUpperCase() + NAMES[i].slice(1)}:</b> ${d} × ${da[i]} = ${d * da[i]}${c ? `, plus the <span class="cr">${c}</span> we carried = <b>${p}</b>` : ''} ${NAMES[i]}.`);
      if (p >= 10) { st.res[i] = p % 10; st.carry[i + 1] = String(Math.floor(p / 10)); snap(i, `${p} ${NAMES[i]} = <b>${Math.floor(p / 10)} ${NAMES[i + 1]}</b> and <b>${p % 10} ${NAMES[i]}</b>. Write ${p % 10} at the bottom, and carry ${Math.floor(p / 10)} over to the ${NAMES[i + 1]} column (small <span class="cr">${Math.floor(p / 10)}</span> on top).`); c = Math.floor(p / 10); }
      else { st.res[i] = p; snap(i, `Write <b>${p}</b> at the bottom.`); c = 0; }
    }
    if (c) { st.res[da.length] = c; snap(da.length, `Nothing left to multiply, so the carried <span class="cr">${c}</span> just drops down to the bottom.`); }
    snap(-1, `Done! <b>${n(a)} × ${d} = ${n(a * d)}</b>`); F.answer = a * d; return F;
  };
  C.div = (num, d) => { // short division ("bus stop")
    const ds = String(num).split('').map(Number); const ans = Array(ds.length).fill(''), carry = Array(ds.length).fill('');
    const F = []; const snap = (hl, text, pic) => F.push({ hl, text, pic, bus: true, d, ds: ds.slice(), ans: ans.slice(), carry: carry.slice() });
    snap(-1, `${n(num)} ÷ ${d} means sharing ${n(num)} into ${d} equal groups. For division we start on the <b>left</b>, with the biggest place.`);
    let r = 0;
    for (let i = 0; i < ds.length; i++) {
      const cur = r * 10 + ds[i], q = Math.floor(cur / d), rr = cur - q * d; const place = NAMES[ds.length - 1 - i];
      snap(i, `How many ${d}s fit into <b>${cur}</b>${r ? ` (the carried <span class="cr">${r}</span> and the ${ds[i]} make ${cur})` : ''}? <b>${q}</b>, because ${q} × ${d} = ${q * d}.`, cur > 60 ? '' : `<div class="cdots"><span class="dg">${Array.from({ length: q }, () => `<i class="d1 grp${d}"></i>`.repeat(d)).join('<i class="sep"></i>')}${rr ? '<i class="sep"></i>' + '<i class="d3"></i>'.repeat(rr) : ''}<small>${cur} ${place} → ${q} groups of ${d}${rr ? `, ${rr} left over` : ''}</small></span></div>`);
      ans[i] = (q === 0 && i === 0 && ds.length > 1) ? '' : q;
      const lead = ans[i] === '' ? `No ${d}s fit, so we write nothing on top yet.` : `Write <b>${q}</b> on top.`;
      const pl = rr === 1 ? ONE[ds.length - 1 - i] : place;
      if (rr && i < ds.length - 1) { carry[i + 1] = String(rr); snap(i, `${lead} <b>${rr}</b> ${pl} ${rr === 1 ? 'is' : 'are'} left over. ${rr} ${pl} = <b>${rr * 10} ${NAMES[ds.length - 2 - i]}</b>, so carry the ${rr} to the next digit: write a small <span class="cr">${rr}</span> in front of the ${ds[i + 1]}. Now it reads <b>${rr}${ds[i + 1]}</b>.`); }
      else snap(i, `${lead}${rr ? ` <b>${rr}</b> is left over at the end: that is the <b>remainder</b>.` : ' Nothing left over.'}`);
      r = rr;
    }
    snap(-1, `Done! <b>${n(num)} ÷ ${d} = ${Math.floor(num / d)}${r ? ` remainder ${r}` : ''}</b>. Check: ${Math.floor(num / d)} × ${d}${r ? ` + ${r}` : ''} = ${n(num)} ✓`); F.answer = Math.floor(num / d); F.rem = r; return F;
  };
  const gridHTML = (o, f) => {
    if (f.bus) {
      const L = f.ds.length;
      return `<div class="bus"><div class="busrow ansrow"><span class="dv"></span>${f.ans.map((v, i) => `<span class="cell ${i === f.hl ? 'hl' : ''}">${v}</span>`).join('')}</div><div class="busrow"><span class="dv">${f.d}</span><span class="stop">${f.ds.map((v, i) => `<span class="cell ${i === f.hl ? 'hl' : ''}">${f.carry[i] ? `<sup class="cr">${f.carry[i]}</sup>` : ''}${v}</span>`).join('')}</span></div></div>`;
    }
    const W = f.top.length, idx = Array.from({ length: W }, (_, k) => W - 1 - k), sym = o.kind === 'add' ? '+' : o.kind === 'sub' ? '−' : '×';
    const td = (i, inner, cls = '') => `<td class="${i === f.hl ? 'hl' : ''} ${cls}">${inner}</td>`;
    const topCell = h => h.length ? (h.length > 1 ? `<span class="hist"><s>${h[0]}</s><sup class="cr">${h[h.length - 1]}</sup></span>` : h[0]) : '';
    const botDigits = o.kind === 'mul' ? idx.map(i => i === 0 ? f.bot[0] : '') : idx.map(i => f.bot[i] != null ? f.bot[i] : '');
    return `<table class="cgrid"><tr class="ph"><td></td>${idx.map(i => td(i, (['O', 'T', 'H', 'Th', 'TTh', 'HTh'][i] || ''), 'ph')).join('')}</tr>
      <tr class="carry"><td></td>${idx.map(i => td(i, f.carry[i] ? `<span class="cr">${f.carry[i]}</span>` : '')).join('')}</tr>
      <tr><td></td>${idx.map(i => td(i, topCell(f.top[i]))).join('')}</tr>
      <tr><td class="op">${sym}</td>${idx.map((i, k) => td(i, botDigits[k])).join('')}</tr>
      <tr class="line"><td></td>${idx.map(i => td(i, '')).join('')}</tr>
      <tr class="res"><td></td>${idx.map(i => td(i, f.res[i] !== '' && f.res[i] != null ? f.res[i] : '')).join('')}</tr></table>`;
  };
  A.columns = (el, o, done) => {
    const F = C[o.kind](o.a, o.b); let i = 0, fin = false;
    el.innerHTML = `<div class="colwrap"><div class="cg"></div><p class="cexp"></p><div class="cpic"></div></div><div class="ctas"><button class="btn ghost cprev" aria-label="Previous step">◀</button><button class="btn primary cnext">Next step ▸</button></div>`;
    const draw = () => {
      const f = F[i]; $('.cg', el).innerHTML = gridHTML(o, f);
      $('.cexp', el).innerHTML = `<span class="stepno">Step ${i + 1} of ${F.length}</span><br>${f.text}`; $('.cpic', el).innerHTML = f.pic || '';
      $('.cprev', el).disabled = i === 0; $('.cnext', el).textContent = i === F.length - 1 ? 'Watch again ↺' : 'Next step ▸';
      $('.cexp', el).classList.remove('pop'); void el.offsetWidth; $('.cexp', el).classList.add('pop');
      if (i === F.length - 1 && !fin) { fin = true; done(); }
    };
    $('.cnext', el).onclick = () => { i = i < F.length - 1 ? i + 1 : 0; R2O.sound && R2O.sound('ok'); draw(); };
    $('.cprev', el).onclick = () => { if (i > 0) { i--; draw(); } };
    draw();
  };

  // "Try any numbers": sliders redraw a picture, so students see the idea holds for every number,
  // not just the example. o.controls: [{k, label, min, max, step, v}], o.draw(vals) → html.
  A.explore = (el, o, done) => {
    const vals = {}; o.controls.forEach(c => vals[c.k] = c.v);
    el.innerHTML = `<div class="xbox"><div class="xtag">Try any numbers</div><div class="xout"></div><div class="sliders">${o.controls.map(c => `<label>${c.label} = <b data-v="${c.k}">${c.fmt ? c.fmt(c.v) : n(c.v)}</b><input type="range" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${c.v}" data-k="${c.k}" aria-label="${c.label}"></label>`).join('')}</div><p class="muted small center xhint">Move the slider${o.controls.length > 1 ? 's' : ''} and watch what changes, and what stays the same</p></div>`;
    const draw = () => { $('.xout', el).innerHTML = o.draw(vals); };
    let moved = false;
    $$('input', el).forEach(i => i.oninput = () => {
      const c = o.controls.find(x => x.k === i.dataset.k); vals[c.k] = +i.value; $(`[data-v="${c.k}"]`, el).textContent = c.fmt ? c.fmt(+i.value) : n(+i.value); draw();
      if (!moved) { moved = true; $('.xhint', el).textContent = 'Keep exploring, or press Continue when you\'re ready'; done(); }
    });
    draw();
  };

  // Shared picture helpers used in lesson scripts
  K.blocks = (h, t, o) => { // base-ten blocks
    const flat = `<span class="b100">${'<i></i>'.repeat(100)}</span>`, rod = `<span class="b10">${'<i></i>'.repeat(10)}</span>`, one = '<span class="b1"></span>';
    return `<div class="blocks">${h ? `<div class="bcol"><div>${flat.repeat(h)}</div><small>${h} hundred${h > 1 ? 's' : ''}</small></div>` : ''}${t ? `<div class="bcol"><div>${rod.repeat(t)}</div><small>${t} ten${t > 1 ? 's' : ''}</small></div>` : ''}${o ? `<div class="bcol"><div class="ones">${one.repeat(o)}</div><small>${o} one${o > 1 ? 's' : ''}</small></div>` : ''}</div>`;
  };
  K.dots = (r, c, e = '●') => `<div class="arr">${Array.from({ length: r }, () => `<div class="arow">${obs(c, e, 'dotob')}</div>`).join('')}</div>`;
  K.area = (cols, rows, opt = {}) => { // rectangle split into labelled parts: cols [[w,label]], rows [[h,label]], cells labels
    const W = 280, H = 200, tw = cols.reduce((s, c) => s + c[0], 0), th = rows.reduce((s, r) => s + r[0], 0);
    const sx = (W - 40) / tw, sy = (H - 40) / th; let s = `<svg class="viz" viewBox="0 0 ${W} ${H}">`; let x = 40;
    cols.forEach((c, i) => { s += `<text x="${x + c[0] * sx / 2}" y="22" text-anchor="middle" class="lbl">${c[1]}</text>`; let y = 30; rows.forEach((r, j) => { const col = K.COLORS[(i + j * 2) % 5]; s += `<rect x="${x}" y="${y}" width="${c[0] * sx}" height="${r[0] * sy}" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="2"/>`; if (opt.cells) s += `<text x="${x + c[0] * sx / 2}" y="${y + r[0] * sy / 2 + 5}" text-anchor="middle" class="lbl">${opt.cells[j][i]}</text>`; y += r[0] * sy; }); x += c[0] * sx; });
    let y = 30; rows.forEach(r => { s += `<text x="30" y="${y + r[0] * sy / 2 + 5}" text-anchor="end" class="lbl">${r[1]}</text>`; y += r[0] * sy; });
    return s + '</svg>';
  };
  K.objs = obs;

  // ---------------- the player ----------------
  // Turn plain learn cards into steps for lessons without hand-made scenes.
  const fromCards = l => l.learn.flatMap(c => {
    const steps = [{ say: `<b>${c.h}</b>`, pic: c.b }];
    if (c.check) steps.push({ say: 'Quick check 🤔', ask: { q: c.check.q, opts: c.check.opts, a: c.check.a, why: c.check.why } });
    return steps;
  });
  const KIND = ['Yes!', 'Spot on!', 'You got it!', 'Nice thinking!', 'Exactly!'];
  const GENTLE = ['Not quite. Have another look at the picture.', 'Close! Try once more.', 'That\'s okay, mistakes help us learn. Look again.'];

  R2O.playScenes = (box, l, onFinish) => {
    const steps = l.scenes || fromCards(l); let i = 0;
    box.innerHTML = `<div class="player"><div class="dots">${steps.map(() => '<i></i>').join('')}</div><div class="step"></div><div class="pfoot"><button class="btn ghost back" aria-label="Back">${R2O.icon('back')}</button><button class="btn primary cont" disabled>Continue</button></div></div>`;
    const cont = $('.cont', box), back = $('.back', box);
    const render = () => {
      const s = steps[i]; let needAnim = !!s.anim, needAsk = !!s.ask; const ready = () => { cont.disabled = needAnim || needAsk; };
      $$('.dots i', box).forEach((d, j) => d.className = j < i ? 'done' : j === i ? 'on' : '');
      const st = $('.step', box); st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
      st.innerHTML = `${s.say ? `<div class="guide"><div class="speech">${s.say}</div></div>` : ''}${s.pic ? `<div class="spic">${s.pic}</div>` : ''}${s.anim ? '<div class="sanim"></div>' : ''}${s.ask ? `<div class="sask"><p class="mq">${s.ask.q}</p><div class="opts">${s.ask.opts.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join('')}</div><div class="afb"></div></div>` : ''}`;
      // 🔊 read the step aloud; tap hard words to see their meaning (not in Maths, where words are simple)
      if (R2O.canSpeak && R2O.canSpeak() && (s.say || s.ask)) {
        const b = document.createElement('button'); b.className = 'spk'; b.type = 'button'; b.setAttribute('aria-label', 'Read aloud'); b.innerHTML = R2O.icon('speaker');
        b.onclick = () => R2O.speak([s.say, s.ask && s.ask.q, s.ask && s.ask.opts.join('. ')].filter(Boolean).join('. '));
        ($('.guide', st) || $('.sask', st)).appendChild(b);
      }
      if (R2O.glossify && !['math', 'addmath'].includes(l.subj)) { R2O.glossify($('.speech', st)); R2O.glossify($('.mq', st)); }
      if (s.anim) A[s.anim.type]($('.sanim', st), s.anim, () => { needAnim = false; ready(); if (s.ask) $('.sask', st).classList.remove('wait'); });
      if (s.ask) {
        if (s.anim) $('.sask', st).classList.add('wait');
        let wrong = 0;
        $$('.opt', st).forEach(b => b.onclick = () => {
          if (b.disabled) return;
          if (+b.dataset.j === s.ask.a) {
            b.classList.add('right'); $$('.opt', st).forEach(x => x.disabled = true); R2O.sound && R2O.sound('ok');
            $('.afb', st).innerHTML = `<div class="ok">${K.pick(KIND)} ${s.ask.why || ''}</div>`;
            if (!wrong) R2O.addXP && R2O.addXP(2);
            needAsk = false; ready();
          } else {
            wrong++; b.classList.add('wrong'); b.disabled = true; R2O.sound && R2O.sound('bad');
            $('.afb', st).innerHTML = wrong < 2 ? `<div class="hint">${s.ask.hint || K.pick(GENTLE)}</div>` : `<div class="hint">The answer is <b>${s.ask.opts[s.ask.a]}</b>. ${s.ask.why || ''}</div>`;
            if (wrong >= 2) { $$('.opt', st)[s.ask.a].classList.add('right'); $$('.opt', st).forEach(x => x.disabled = true); needAsk = false; ready(); }
          }
        });
      }
      back.disabled = i === 0;
      cont.textContent = i === steps.length - 1 ? 'Finish lesson' : 'Continue';
      ready();
    };
    cont.onclick = () => { if (i < steps.length - 1) { i++; render(); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else onFinish(); };
    back.onclick = () => { if (i > 0) { i--; render(); } };
    render();
  };
})();
