// Help for students who find the English hard: read-aloud (the phone's own voice, works offline),
// tap-a-word meanings (R2O.GLOSS), and "ask someone" to share a question with a teacher or friend.
(() => {
  const plain = html => String(html || '').replace(/<sup>2<\/sup>/g, ' squared').replace(/<sup>3<\/sup>/g, ' cubed').replace(/<sup>(.*?)<\/sup>/g, ' to the power $1')
    .replace(/<(svg|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, 'and').replace(/&[a-z]+;/g, ' ')
    .replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/−/g, ' minus ').replace(/ = /g, ' equals ').replace(/___+/g, ' blank ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, ' ').replace(/\s+/g, ' ').trim();
  R2O.plain = plain;
  const synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  R2O.canSpeak = () => !!synth() && R2O.state().voice !== false;
  let voice = null;
  const pickVoice = () => { const vs = synth().getVoices(); voice = vs.find(v => /^en[-_](GB|IN|PK|NG|KE)/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null; };
  R2O.speak = html => {
    const s = synth(); if (!s) return;
    s.cancel(); if (!voice) pickVoice();
    const u = new SpeechSynthesisUtterance(plain(html)); u.rate = .9; u.lang = voice ? voice.lang : 'en-GB'; if (voice) u.voice = voice;
    s.speak(u);
  };
  R2O.stopSpeaking = () => { const s = synth(); if (s) s.cancel(); };
  if (synth() && synth().addEventListener) synth().addEventListener('voiceschanged', pickVoice);

  // Share a question with a teacher, parent or friend (WhatsApp, SMS…). Works with the phone's share menu.
  R2O.askSomeone = q => {
    const text = `Can you help me with this question? (from Road to O's)\n\n${plain(q.q)}${q.choices ? '\n\nOptions: ' + q.choices.map(plain).join(' / ') : ''}`;
    if (navigator.share) navigator.share({ text }).catch(() => { });
    else window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  };

  // ---------- tap-a-word meanings ----------
  let RE = null;
  const build = () => { const keys = Object.keys(R2O.GLOSS || {}).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); RE = keys.length ? new RegExp(`\\b(${keys.join('|')})(s|es)?\\b`, 'i') : null; };
  const meaning = w => { const g = R2O.GLOSS, k = w.toLowerCase(); return g[k] || g[k.replace(/(es|s)$/, '')] || g[k.replace(/s$/, '')]; };
  R2O.glossify = el => {
    if (!R2O.GLOSS || !el) return; if (!RE) build(); if (!RE) return;
    const used = new Set(); const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('button,svg,.gw,.tbl,code,.passage,input,textarea,.cgrid,.bigq') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      let t = node.nodeValue, m, frag = null, at = 0;
      const re = new RegExp(RE.source, 'gi');
      while ((m = re.exec(t))) {
        const key = (meaning(m[0]) && m[0].toLowerCase()) || null; if (!key || used.has(key.replace(/(es|s)$/, ''))) continue;
        used.add(key.replace(/(es|s)$/, ''));
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(t.slice(at, m.index)));
        const b = document.createElement('button'); b.className = 'gw'; b.type = 'button'; b.textContent = m[0]; b.title = 'Tap to see what this word means'; frag.appendChild(b); at = m.index + m[0].length;
      }
      if (frag) { frag.appendChild(document.createTextNode(t.slice(at))); node.parentNode.replaceChild(frag, node); }
    }
    el.querySelectorAll('.gw').forEach(b => b.onclick = e => {
      e.stopPropagation(); document.querySelectorAll('.gpop').forEach(p => p.remove());
      const p = document.createElement('span'); p.className = 'gpop'; p.setAttribute('role', 'status');
      p.innerHTML = `<b>${R2O.esc(b.textContent)}</b>: ${R2O.esc(meaning(b.textContent))}${R2O.canSpeak() ? ' <button class="link spk2" type="button" aria-label="Read aloud">' + R2O.icon('speaker') + '</button>' : ''}`;
      b.after(p); const s = p.querySelector('.spk2'); if (s) s.onclick = ev => { ev.stopPropagation(); R2O.speak(b.textContent + '. ' + meaning(b.textContent)); };
      setTimeout(() => document.addEventListener('click', () => p.remove(), { once: true }), 0);
    });
  };
})();
