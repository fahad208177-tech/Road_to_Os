// "Write and get marked": students write real answers and get feedback straight away.
// The marker runs on the phone, offline and free. It checks the task's key points, structure,
// vocabulary and sentences, and accuracy, then gives gentle, specific next steps.
// Optional: deeper feedback from an AI model when online, if CONFIG.aiUrl points to the free
// Cloudflare Worker in server/ai-worker.js (see server/README.md). Leave it empty to stay offline only.
(() => {
  const CONFIG = R2O.WCONFIG = { aiUrl: '' };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------- language data ----------------
  const MISSPELL = { alot: 'a lot', becuase: 'because', becasue: 'because', beacuse: 'because', bcoz: 'because', bcz: 'because', coz: 'because', cuz: 'because', definately: 'definitely', defiantly: 'definitely (if you mean "for sure")',
    recieve: 'receive', beleive: 'believe', belive: 'believe', freind: 'friend', frend: 'friend', wich: 'which', whitch: 'which', untill: 'until', tommorow: 'tomorrow', tomorow: 'tomorrow', tommorrow: 'tomorrow',
    goverment: 'government', enviroment: 'environment', enviornment: 'environment', occured: 'occurred', occuring: 'occurring', seperate: 'separate', seperately: 'separately', neccessary: 'necessary', necesary: 'necessary', neccesary: 'necessary',
    accomodation: 'accommodation', arguement: 'argument', begining: 'beginning', beutiful: 'beautiful', beautifull: 'beautiful', buisness: 'business', calender: 'calendar', comming: 'coming', commited: 'committed', concious: 'conscious',
    dissapear: 'disappear', dissapoint: 'disappoint', embarass: 'embarrass', existance: 'existence', finaly: 'finally', foriegn: 'foreign', fourty: 'forty', gaurd: 'guard', happend: 'happened', happyness: 'happiness', hieght: 'height',
    immediatly: 'immediately', independant: 'independent', intrest: 'interest', intresting: 'interesting', knowlege: 'knowledge', libary: 'library', lenght: 'length', mispell: 'misspell', noticable: 'noticeable', occassion: 'occasion',
    peice: 'piece', persue: 'pursue', posession: 'possession', prefered: 'preferred', probaly: 'probably', probly: 'probably', promiss: 'promise', realy: 'really', reccomend: 'recommend', recomend: 'recommend', remeber: 'remember', rember: 'remember',
    resturant: 'restaurant', rythm: 'rhythm', sentance: 'sentence', shoud: 'should', sincerly: 'sincerely', sincerley: 'sincerely', studing: 'studying', suprise: 'surprise', thier: 'their', truely: 'truly', tounge: 'tongue', wierd: 'weird',
    writting: 'writing', wrting: 'writing', whould: 'would', woud: 'would', allways: 'always', alot_: '', everytime: 'every time', infact: 'in fact', ofcourse: 'of course', incase: 'in case', aswell: 'as well', eachother: 'each other',
    nowdays: 'nowadays', untill_: '', grammer: 'grammar', adress: 'address', advertisment: 'advertisement', apparantly: 'apparently', basicly: 'basically', belived: 'believed', carefull: 'careful', completly: 'completely', diffrent: 'different',
    differant: 'different', easly: 'easily', especialy: 'especially', excercise: 'exercise', experiance: 'experience', familar: 'familiar', fullfill: 'fulfil', helpfull: 'helpful', hopefull: 'hopeful', importent: 'important', importand: 'important',
    langauge: 'language', languge: 'language', liesure: 'leisure', lisence: 'licence', medecine: 'medicine', millenium: 'millennium', minature: 'miniature', mischievious: 'mischievous', neice: 'niece', ocurred: 'occurred', oppurtunity: 'opportunity', oppertunity: 'opportunity',
    parliment: 'parliament', peaple: 'people', poeple: 'people', pepole: 'people', perfom: 'perform', persuit: 'pursuit', politition: 'politician', possable: 'possible', possibile: 'possible', practicle: 'practical', presense: 'presence', propoganda: 'propaganda',
    publically: 'publicly', reconise: 'recognise', reffer: 'refer', relevent: 'relevant', religous: 'religious', rescource: 'resource', responsable: 'responsible', scedule: 'schedule', sciene: 'science', scince: 'science', shcool: 'school', skool: 'school',
    speach: 'speech', stoped: 'stopped', succesful: 'successful', successfull: 'successful', sucess: 'success', temprature: 'temperature', temperture: 'temperature', thru: 'through', threw_: '', togather: 'together', togeather: 'together', usefull: 'useful', vegatable: 'vegetable', vegetible: 'vegetable',
    wether: 'whether (or weather)', wheather: 'weather (or whether)', whereever: 'wherever', wonderfull: 'wonderful', yeild: 'yield', countrys: 'countries', citys: 'cities', familys: 'families', studys: 'studies', childs: 'children', womans: 'women',
    teached: 'taught', buyed: 'bought', thinked: 'thought', goed: 'went', eated: 'ate', writed: 'wrote', catched: 'caught', bringed: 'brought', runned: 'ran', swimmed: 'swam', drinked: 'drank', sended: 'sent', leaved: 'left', maked: 'made', taked: 'took', gived: 'gave', telled: 'told', knowed: 'knew',
    disolve: 'dissolve', dissolveing: 'dissolving', resperation: 'respiration', photosythesis: 'photosynthesis', photosynthisis: 'photosynthesis', osmossis: 'osmosis', diffussion: 'diffusion', chlorophyl: 'chlorophyll', energie: 'energy', enery: 'energy', partical: 'particle', particals: 'particles', molecul: 'molecule',
    acelleration: 'acceleration', accelaration: 'acceleration', velocty: 'velocity', resistence: 'resistance', currant: 'current (if you mean electricity)', erossion: 'erosion', errosion: 'erosion', deposit_: '', percipitation: 'precipitation', resevoir: 'reservoir', reperations: 'reparations', reprations: 'reparations', treatys: 'treaties', germeny: 'Germany', britian: 'Britain', britan: 'Britain' };
  Object.keys(MISSPELL).forEach(k => { if (!MISSPELL[k]) delete MISSPELL[k]; });
  const TEXTSPEAK = { u: 'you', ur: 'your / you\'re', r: 'are', pls: 'please', plz: 'please', thx: 'thanks', gonna: 'going to', wanna: 'want to', gotta: 'have to', lol: '(leave it out)', omg: '(leave it out)', tbh: 'to be honest', idk: 'I don\'t know', btw: 'by the way', bcoz: 'because', cuz: 'because', coz: 'because', dont: 'don\'t', cant: 'can\'t', wont: 'won\'t', im: 'I\'m', ive: 'I\'ve', didnt: 'didn\'t', isnt: 'isn\'t', doesnt: 'doesn\'t' };
  const STOP = new Set('the a an and or but so of to in on at for with is are was were be been it this that these those i you he she we they my your his her our their me him them us as by from not no do does did have has had will would can could should there here then than also very just more most some any all which who what when where why how if because into about up down out over its it\'s'.split(' '));
  const LINKS = ['firstly', 'first', 'secondly', 'then', 'next', 'after', 'finally', 'also', 'moreover', 'furthermore', 'in addition', 'however', 'although', 'whereas', 'on the other hand', 'because', 'so', 'therefore', 'as a result', 'this means', 'this meant', 'for example', 'for instance', 'such as', 'in conclusion', 'overall', 'to conclude', 'meanwhile', 'suddenly', 'later', 'eventually'];
  const COMPLEX = /\b(because|although|though|when|while|whereas|which|who|if|unless|since|until|after|before|so that)\b/i;
  const CONTRACT = /\b(don't|can't|won't|isn't|aren't|didn't|doesn't|wasn't|weren't|i'm|it's|that's|they're|we're|you're|i've|we've|shouldn't|couldn't|wouldn't)\b/i;

  // ---------------- text helpers (pure, so they can be tested) ----------------
  const words = t => (t.match(/[A-Za-z][A-Za-z'’-]*/g) || []).map(w => w.replace(/’/g, '\''));
  const sentences = t => (t.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) || []).map(s => s.trim()).filter(s => /[A-Za-z]/.test(s));
  const paragraphs = t => t.split(/\n+/).map(p => p.trim()).filter(p => words(p).length >= 3);
  const has = (low, kw) => new RegExp('(^|[^a-z])' + kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(low);
  const countWords = t => words(t).length;
  R2O.countWords = countWords;

  // ---------------- the marker ----------------
  const markWriting = (text, task) => {
    const T = String(text || ''), low = T.toLowerCase(), W = words(T), n = W.length, S = sentences(T), P = paragraphs(T);
    const good = [], next = [], issues = [];
    const crit = (name, got, max, note) => ({ name, got: Math.max(0, Math.min(max, Math.round(got * 2) / 2)), max, note });

    // ---- task & content ----
    const pts = (task.points || []).map(p => ({ ...p, hit: p.any.some(k => has(low, k)) }));
    const hit = pts.filter(p => p.hit), need = task.needPoints || Math.min(pts.length, Math.max(2, Math.round(pts.length * .6)));
    let content = pts.length ? Math.min(1, hit.length / need) * 7 : 5;
    if (hit.length) good.push(`You covered ${hit.length === 1 ? 'a key point' : hit.length + ' key points'}: ${hit.slice(0, 4).map(p => p.t).join('; ')}.`);
    const missed = pts.filter(p => !p.hit);
    if (hit.length < need && missed.length) next.push(`Add more key points. You could write about: <b>${missed.slice(0, 3).map(p => p.t).join('</b>, <b>')}</b>.`);
    const len = n < task.min * .5 ? 0 : n < task.min ? .6 : n > task.max * 1.25 ? .6 : 1;
    content += len * 3;
    if (n < task.min) next.push(`Write a bit more: you have <b>${n}</b> words and the task asks for <b>${task.min}–${task.max}</b>.`);
    else if (n > task.max * 1.1) next.push(`It's a bit long (${n} words). Aim for ${task.min}–${task.max}${task.type === 'summary' ? ': in a summary the word limit really matters' : ''}. Cut repeated ideas.`);
    else good.push(`Good length: ${n} words.`);
    // type-specific features
    const feat = [];
    if (task.type === 'letter') {
      feat.push([/^\s*dear\b/i.test(T), 'You started with a greeting ("Dear…").', 'Start a letter with a greeting, e.g. "Dear Sir or Madam," or "Dear Mrs Ahmed,".']);
      feat.push([/yours (faithfully|sincerely)/i.test(T), 'You ended the letter properly.', 'End with "Yours faithfully," (if you started "Dear Sir or Madam") or "Yours sincerely," (if you used their name).']);
    }
    if (task.type === 'speech') {
      feat.push([(T.match(/\?/g) || []).length >= 1, 'You used a question to involve your audience.', 'Ask your audience a rhetorical question, e.g. "Wouldn\'t you want…?"']);
      feat.push([/\b(you|we|us|our|everyone|fellow)\b/i.test(T), 'You spoke directly to your audience.', 'Speak directly to your audience: use "you" and "we".']);
      feat.push([/\b(let us|let's|join|sign|start|stop|choose|together we|today)\b/i.test(T), 'You ended with a call to action.', 'End with a call to action: tell the audience what to do next.']);
    }
    if (task.type === 'describe') {
      const senses = [/\b(saw|see|bright|colou?r|red|blue|green|yellow|golden|shin|glow|dark|light)/i, /\b(hear|heard|sound|noise|loud|quiet|silen|shout|whisper|hum|clatter|crash|buzz|rattl|call|cr(y|ied))/i, /\b(smell|scent|aroma|stink|stench|fragran)/i, /\b(touch|rough|smooth|soft|warm|cold|sticky|wet|hot|felt)/i, /\b(taste|sweet|sour|bitter|salty|spicy)/i];
      const k = senses.filter(r => r.test(T)).length;
      feat.push([k >= 3, `You used ${k} of the five senses.`, `Use more senses (you used ${k}). What can you hear, smell and feel, not just see?`]);
      feat.push([/\b(like|as if|as though)\b/i.test(T) || /\bas \w+ as\b/i.test(T), 'You used a comparison (simile) to paint a picture.', 'Try a simile, e.g. "the noise rose like a wave".']);
    }
    if (task.type === 'story') {
      feat.push([/["“”]/.test(T), 'You used dialogue (speech).', 'Add a little dialogue to bring a character to life: "…," she said.']);
      feat.push([P.length >= 4, 'Your story has clear paragraphs.', 'Use more paragraphs: a new one for each new event or speaker (aim for 4 or more).']);
      feat.push([(T.match(/\b\w+ed\b/g) || []).length >= 3, 'You kept to the past tense.', 'Tell the story in the past tense (walked, saw, ran).']);
    }
    if (task.type === 'summary' && task.source) {
      const src = words(task.source).map(w => w.toLowerCase()), sw = W.map(w => w.toLowerCase()); const grams = new Set();
      for (let i = 0; i + 5 < src.length; i++) grams.add(src.slice(i, i + 6).join(' '));
      let copied = 0; for (let i = 0; i + 5 < sw.length; i++) if (grams.has(sw.slice(i, i + 6).join(' '))) copied++;
      feat.push([copied <= 2, 'You used your own words.', 'Use your own words: some parts are copied from the text. Change the words but keep the meaning.']);
    }
    if (task.type === 'explain') {
      const linksN = (low.match(/\b(because|so|therefore|this means|this meant|as a result|which (meant|means|led|causes|caused)|leading to|so that)\b/g) || []).length;
      feat.push([linksN >= Math.min(3, Math.max(1, hit.length)), `You explained with linking words (${linksN}× because / so / this means…).`, 'Don\'t just list points: explain each one. Add "because…", "so…" or "this means that…" after each point.']);
      if (task.judge) feat.push([/\b(overall|in conclusion|most important|main reason|i (agree|disagree)|to a (large|great|small|certain) extent|partly)\b/i.test(T), 'You made a clear judgement.', 'End with a judgement: "Overall, the most important reason was… because…".']);
    }
    feat.forEach(([ok, yes, no]) => (ok ? good : next).push(ok ? yes : no));
    const featScore = feat.length ? feat.filter(f => f[0]).length / feat.length : 1;

    // ---- organisation ----
    const usedLinks = LINKS.filter(k => new RegExp('\\b' + k + '\\b', 'i').test(T));
    const wantParas = task.type === 'explain' ? (task.max > 150 ? 3 : 1) : task.type === 'summary' ? 1 : Math.max(2, Math.round(task.min / 80));
    let org = (Math.min(1, P.length / wantParas) * 2) + Math.min(2, usedLinks.length * .5) + featScore;
    if (P.length < wantParas && n >= task.min * .6) next.push(`Split your writing into paragraphs (aim for about ${wantParas}). Press Enter to start a new one for each new idea.`);
    if (usedLinks.length >= 3) good.push(`You linked your ideas well (${usedLinks.slice(0, 4).join(', ')}).`);
    else if (n >= 30) next.push('Join your ideas with linking words: <b>because, however, for example, as a result, finally</b>.');

    // ---- vocabulary and sentences ----
    const content_w = W.map(w => w.toLowerCase()).filter(w => !STOP.has(w) && w.length > 2);
    const freq = {}; content_w.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const allowed = new Set((task.points || []).flatMap(p => p.any).map(k => k.toLowerCase()).concat(words(String(task.prompt).replace(/<[^>]+>/g, ' ')).map(w => w.toLowerCase()).filter(w => w.length > 3)));
    const repeated = Object.entries(freq).filter(([w, c]) => c >= Math.max(4, n / 40) && ![...allowed].some(k => w.startsWith(k.slice(0, 5)))).sort((a, b) => b[1] - a[1]);
    const longS = S.filter(s => words(s).length > 35), avg = S.length ? n / S.length : 0;
    const complexN = S.filter(s => COMPLEX.test(s)).length, ambitious = new Set(content_w.filter(w => w.length >= 8)).size;
    const starts = S.map(s => (words(s)[0] || '').toLowerCase()); const startFreq = {}; starts.forEach(w => startFreq[w] = (startFreq[w] || 0) + 1);
    const sameStart = Object.entries(startFreq).find(([w, c]) => w && c >= 3 && c / S.length > .4);
    let lang = 5;
    if (repeated.length) { lang -= 1; next.push(`You used "<b>${repeated[0][0]}</b>" ${repeated[0][1]} times. Try another word sometimes.`); issues.push(...repeated.slice(0, 3).map(([w]) => ({ kind: 'rep', w }))); }
    if (longS.length) { lang -= 1; next.push('Some sentences are very long. Break them into two shorter sentences.'); issues.push(...longS.map(s => ({ kind: 'long', s }))); }
    if (S.length >= 4 && complexN / S.length < .2) { lang -= 1; next.push('Mix your sentences: join some ideas with "because", "although", "when" or "which".'); }
    else if (complexN >= 2) good.push('You used longer sentences with because / although / when.');
    if (sameStart) { lang -= .5; next.push(`Many sentences start with "${sameStart[0]}". Start some sentences in a different way.`); }
    if (ambitious >= Math.max(3, n / 40)) good.push('You used some strong, precise words.');
    else if (n >= 60 && task.type !== 'explain') lang -= .5;
    if (avg && avg < 6 && S.length > 3) { lang -= .5; next.push('Your sentences are very short. Join some of them with "and", "but" or "because".'); }

    // ---- accuracy ----
    const spell = [];
    W.forEach(w => { const k = w.toLowerCase().replace(/'/g, ''); if (MISSPELL[k] && !spell.some(s => s.w === k)) spell.push({ w: k, fix: MISSPELL[k] }); });
    const ts = !['physics', 'chemistry', 'math', 'addmath', 'computing'].includes(task.subj) ? W.filter(w => TEXTSPEAK[w.toLowerCase()] && (w.length <= 2 ? w === w.toLowerCase() : true)).map(w => w.toLowerCase()) : [];
    const lowerI = (T.match(/(^|[^A-Za-z'])i([^A-Za-z'])/g) || []).length;
    const lowerStart = S.filter(s => /^[a-z]/.test(s)).length;
    const noEnd = task.type !== 'letter' && /[A-Za-z0-9)"”]\s*$/.test(T.trim()) && n > 8 ? 1 : 0;
    const splices = (T.match(/,\s+(i|he|she|it|they|we|you|this|there)\s+(am|is|are|was|were|has|have|had|will|can|did|went|said|felt|saw)\b/gi) || []).length;
    let acc = 5;
    if (spell.length) { acc -= Math.min(2, spell.length * .5); next.push(`Check the spelling of: ${spell.slice(0, 5).map(s => `<b>${esc(s.w)}</b> → ${esc(s.fix)}`).join(', ')}.`); issues.push(...spell.map(s => ({ kind: 'sp', w: s.w, fix: s.fix }))); }
    if (lowerI) { acc -= .5; next.push('Always write "I" as a capital letter when it means you.'); }
    if (lowerStart) { acc -= Math.min(1, lowerStart * .25); next.push(`Start every sentence with a capital letter (${lowerStart} ${lowerStart === 1 ? 'sentence doesn\'t' : 'sentences don\'t'}).`); }
    if (noEnd) { acc -= .5; next.push('Finish your last sentence with a full stop.'); }
    if (splices) { acc -= .5; next.push('Check for two sentences joined with just a comma. Use a full stop, or "and / but / so".'); }
    if (ts.length) { acc -= .5; next.push(`Write words in full, not like a text message: ${[...new Set(ts)].slice(0, 4).map(w => `<b>${esc(w)}</b> → ${esc(TEXTSPEAK[w])}`).join(', ')}.`); issues.push(...[...new Set(ts)].map(w => ({ kind: 'sp', w, fix: TEXTSPEAK[w] }))); }
    if (task.register === 'formal' && CONTRACT.test(T)) next.push('In formal writing, write words in full: "do not" instead of "don\'t".');
    if (!spell.length && !lowerI && !lowerStart && !splices && n >= 20) good.push('Your spelling and punctuation look careful. Well done!');

    // ---- total ----
    // a very short answer can't earn full marks for style and accuracy: there isn't enough to judge
    const lenF = Math.min(1, n / Math.max(10, task.min * .6)); org *= lenF; lang *= lenF; acc *= lenF;
    const C = [crit('Task and content', content, 10, 'Did you answer the question with the key points?'), crit('Organisation', org, 5, 'Paragraphs, order and linking words'),
      crit('Words and sentences', lang, 5, 'Precise words and a mix of sentences'), crit('Accuracy', acc, 5, 'Spelling, capitals and punctuation')];
    if (n < 5) C.forEach(c => c.got = 0);
    const got = C.reduce((a, c) => a + c.got, 0), pct = Math.round(got / 25 * 100);
    const band = pct >= 80 ? ['Strong', 'star'] : pct >= 60 ? ['Good', 'check'] : pct >= 40 ? ['Developing', 'layers'] : ['Getting started', 'flag'];
    const marks = task.marks ? Math.max(0, Math.min(task.marks, Math.round(task.marks * Math.min(1, hit.length / Math.max(1, need)) * (featScore * .3 + .7)))) : null;
    return { words: n, criteria: C, score: pct, band: band[0], icon: band[1], good: good.slice(0, 4), next: next.slice(0, 4), issues, marks, hit: hit.map(p => p.t), missed: missed.map(p => p.t) };
  };
  R2O.markWriting = markWriting;

  // Show the student's text with spelling and long-sentence notes highlighted
  const annotate = (T, issues) => {
    let h = esc(T);
    issues.filter(i => i.kind === 'long').forEach(i => { const e = esc(i.s); h = h.replace(e, `<span class="w-long" title="Very long sentence: try splitting it">${e}</span>`); });
    issues.filter(i => i.kind === 'sp').forEach(i => { h = h.replace(new RegExp(`\\b(${i.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi'), `<mark class="w-sp" title="Did you mean: ${esc(i.fix)}?">$1</mark>`); });
    issues.filter(i => i.kind === 'rep').forEach(i => { h = h.replace(new RegExp(`\\b(${i.w})\\b`, 'gi'), '<u class="w-rep" title="Repeated word">$1</u>'); });
    return h.replace(/\n/g, '<br>');
  };

  // ---------------- tasks ----------------
  const TREES = 'Trees do far more for cities than make them look pleasant. On hot days, the shade from a single large tree can make a street several degrees cooler, which means people use less electricity for fans and air conditioners. Trees also clean the air: their leaves trap dust and smoke, and they take in carbon dioxide. When heavy rain falls, tree roots help the soil soak up water, so streets flood less often. Parks with trees give birds, insects and other wildlife a place to live in the middle of the city. Doctors have found that people who can see trees from their windows often feel calmer and recover from illness more quickly. Finally, homes on streets lined with trees are often worth more money, and shops in green streets attract more customers.';
  const TASKS = R2O.WTASKS = [
    { id: 'be-w-me', subj: 'basic', lessons: ['be-sentence', 'be-tobe', 'be-linking'], title: 'All about me', type: 'short', min: 40, max: 90,
      prompt: 'Write about yourself. Say your name, how old you are, where you live, who is in your family, your favourite subject <b>and why</b>, and the job you dream of.',
      tips: ['Start each sentence with a capital letter and end with a full stop.', 'Use "because" to say why you like your subject.', 'Example start: "My name is Hira. I am 15 years old."'],
      points: [{ t: 'your name', any: ['my name', 'i am called', 'name is'] }, { t: 'your age', any: ['years old', 'year old', 'age'] }, { t: 'where you live', any: ['live in', 'from', 'village', 'city', 'town'] }, { t: 'your family', any: ['family', 'mother', 'father', 'brother', 'sister', 'parents'] }, { t: 'favourite subject and why', any: ['favourite subject', 'favorite subject', 'like', 'love'] }, { t: 'a reason (because…)', any: ['because'] }, { t: 'your dream job', any: ['want to be', 'dream', 'become', 'job'] }], needPoints: 5,
      model: 'My name is Hira and I am 15 years old. I live in a small town near Multan with my parents and my two younger brothers. My favourite subject is Biology because I want to understand how the human body works. In the future, I want to be a doctor, so I study every evening after I help my mother at home.' },
    { id: 'be-w-day', subj: 'basic', lessons: ['be-present', 'be-linking'], title: 'My day', type: 'short', min: 50, max: 110,
      prompt: 'Describe a normal day in your life, from morning to night. Use <b>first, then, after that, finally</b> to put the events in order.',
      tips: ['Use the present: "I wake up", "she cooks".', 'Use time words: in the morning, at 7 o\'clock, after school, at night.'],
      points: [{ t: 'the morning', any: ['morning', 'wake up', 'breakfast'] }, { t: 'school or work', any: ['school', 'class', 'work', 'lesson', 'study'] }, { t: 'the afternoon or evening', any: ['afternoon', 'evening', 'after school', 'dinner'] }, { t: 'the night', any: ['night', 'sleep', 'bed'] }, { t: 'order words', any: ['first', 'then', 'after that', 'finally', 'next'] }], needPoints: 4,
      model: 'First, I wake up at six o\'clock and help my mother make breakfast. Then I walk to school with my friend. School starts at eight o\'clock and finishes at two. After that, I eat lunch and rest for a short time. In the evening, I study for one hour and play cricket with my brothers. Finally, I go to bed at ten o\'clock.' },
    { id: 'en-w-letter', subj: 'english', lessons: ['en-register', 'en-directed'], title: 'Formal letter: a longer lunch break', type: 'letter', register: 'formal', min: 250, max: 350,
      prompt: 'Your school is thinking about making the lunch break longer. Write a <b>letter to your headteacher</b> giving your views. Say why a longer break would help students, deal with one worry the teachers might have, and make a clear suggestion.',
      tips: ['Start "Dear Mr / Mrs …," and end "Yours sincerely,".', 'One idea per paragraph: reasons, a worry and your answer to it, your suggestion.', 'Formal register: no slang, words in full.'],
      points: [{ t: 'students are tired or need energy', any: ['tired', 'energy', 'exhaust', 'rest', 'relax'] }, { t: 'eating properly or health', any: ['eat', 'food', 'meal', 'health', 'digest'] }, { t: 'better learning or concentration', any: ['concentrat', 'focus', 'learn', 'attention', 'results'] }, { t: 'time with friends, clubs or activities', any: ['friend', 'club', 'activit', 'sport', 'play', 'social'] }, { t: 'a worry and your answer to it', any: ['however', 'some teachers', 'may worry', 'might worry', 'concern', 'some may argue', 'although'] }, { t: 'a clear suggestion', any: ['suggest', 'propose', 'recommend', 'could', 'minutes'] }], needPoints: 4,
      model: 'Dear Mrs Ahmed,\nI am writing to support the idea of a longer lunch break. At the moment, many students rush their food in fifteen minutes and return to lessons feeling tired…\n(…paragraphs on concentration and health, a teacher\'s worry about lost lesson time and an answer to it, and a clear suggestion: a 40-minute break with the school day ending ten minutes later.)\nYours sincerely,\nAli Raza' },
    { id: 'en-w-speech', subj: 'english', lessons: ['en-directed', 'en-register'], title: 'Persuasive speech: stop wasting water', type: 'speech', register: 'formal', min: 250, max: 350,
      prompt: 'Write a <b>speech to your classmates</b> persuading them to waste less water at school and at home. Use persuasive techniques and finish with a call to action.',
      tips: ['Talk to your audience: "you", "we", "all of us".', 'Use a rhetorical question, a fact or number, and the rule of three.', 'End by telling them exactly what to do.'],
      points: [{ t: 'why water matters', any: ['life', 'drink', 'farm', 'crops', 'health', 'precious'] }, { t: 'a fact or number', any: ['percent', '%', 'litre', 'million', 'billion'] }, { t: 'a problem (shortage or waste)', any: ['shortage', 'drought', 'waste', 'running out', 'scarce', 'dry'] }, { t: 'practical ideas', any: ['tap', 'shower', 'bucket', 'leak', 'reuse', 'turn off', 'fix'] }, { t: 'a counter-argument', any: ['some of you', 'some people', 'you may think', 'you might think', 'however'] }], needPoints: 4,
      model: 'Good morning, everyone. How many of you left a tap running this morning? …(develop the problem with a fact, three practical ideas, answer the "one person can\'t make a difference" argument)… So today, let\'s make a promise together: turn off the tap, fix the leak, and tell one friend.' },
    { id: 'en-w-describe', subj: 'english', lessons: ['en-descriptive'], title: 'Descriptive: a market at sunrise', type: 'describe', min: 350, max: 450,
      prompt: 'Describe a busy market as it wakes up early in the morning. Help the reader see, hear, smell and feel the place, and build its atmosphere.',
      tips: ['Use at least three senses.', 'Camera structure: wide shot → zoom in on details → change (the sun rises) → closing image.', 'Precise verbs and nouns are better than lots of adjectives.'],
      points: [{ t: 'the setting at the start (light, time)', any: ['dawn', 'sunrise', 'sun', 'morning', 'light', 'dark'] }, { t: 'people and what they do', any: ['seller', 'trader', 'customer', 'shout', 'woman', 'man', 'boy', 'girl', 'crowd'] }, { t: 'goods and details', any: ['fruit', 'vegetable', 'fish', 'spice', 'cloth', 'basket', 'stall', 'mango', 'onion'] }, { t: 'a change as time passes', any: ['later', 'soon', 'by the time', 'now', 'gradually', 'slowly', 'as the sun'] }], needPoints: 3,
      model: 'Before the sun had climbed over the rooftops, the market was already breathing… (wide view) … (zoom: a seller\'s cracked hands arranging limes, the sharp smell of coriander, the clatter of crates) … (change: light floods the street, the noise swells) … (closing image echoing the start).' },
    { id: 'en-w-story', subj: 'english', lessons: ['en-narrative'], title: 'Story: "The letter arrived three years too late."', type: 'story', min: 350, max: 450,
      prompt: 'Write a story that begins with the sentence: <b>"The letter arrived three years too late."</b>',
      tips: ['One main event, told well. Few characters.', 'Hook → build-up → problem → climax → resolution.', 'Use dialogue and short sentences at tense moments.'],
      points: [{ t: 'the letter', any: ['letter', 'envelope'] }, { t: 'a character with feelings', any: ['felt', 'heart', 'tears', 'smile', 'hands', 'afraid', 'angry', 'hope'] }, { t: 'a problem or mystery', any: ['why', 'secret', 'too late', 'problem', 'lost', 'mistake'] }, { t: 'an ending that resolves or reflects', any: ['finally', 'at last', 'in the end', 'now', 'never', 'learned', 'realised', 'realized'] }], needPoints: 3,
      model: '"The letter arrived three years too late." … (who receives it and why the timing matters) … (they open it; what it says) … (the climax: they act on it) … (an ending that shows how they have changed).' },
    { id: 'en-w-summary', subj: 'english', lessons: ['en-summary'], title: 'Summary: trees in cities', type: 'summary', min: 50, max: 90, source: TREES,
      prompt: `<div class="passage">${TREES}</div><p>In <b>no more than 90 words</b>, summarise the <b>benefits of trees in cities</b>. Use your own words as far as possible.</p>`,
      tips: ['Find each benefit first and list them.', 'Use your own words. Leave out examples and extra detail.', 'Write in full sentences, as one paragraph.'],
      points: [{ t: 'shade / cooler streets / less electricity', any: ['cool', 'shade', 'temperature', 'electricity', 'heat'] }, { t: 'cleaner air', any: ['air', 'dust', 'pollut', 'carbon', 'smoke'] }, { t: 'less flooding', any: ['flood', 'rain', 'soak', 'water'] }, { t: 'homes for wildlife', any: ['wildlife', 'bird', 'insect', 'animal', 'habitat'] }, { t: 'calmer people / faster recovery', any: ['calm', 'stress', 'recover', 'health', 'mental', 'relax'] }, { t: 'homes and shops worth more', any: ['money', 'value', 'price', 'worth', 'customer', 'shop', 'economic'] }], needPoints: 5,
      model: 'Trees make city streets cooler, so people need less electricity. Their leaves catch dust and absorb carbon dioxide, cleaning the air. Roots help the ground take in rain, reducing floods. Trees give wildlife somewhere to live, help people relax and recover more quickly, and raise the value of homes and businesses nearby.' },
    { id: 'hi-w-versailles', subj: 'history', lessons: ['hi-versailles'], title: 'Explain why Germans hated the Treaty of Versailles [6]', type: 'explain', marks: 6, min: 100, max: 220,
      prompt: '<b>Explain why many Germans were angry about the Treaty of Versailles.</b> [6]',
      tips: ['Give two or three reasons, one paragraph each.', 'For each reason: what the treaty did → why that made Germans angry ("This made them angry because…").', 'Use details: dates, numbers, names.'],
      points: [{ t: 'war guilt (Article 231)', any: ['guilt', 'blame', '231'] }, { t: 'reparations', any: ['reparation', 'pay', '6.6', '£6', 'money', 'billion'] }, { t: 'army and navy limits', any: ['army', '100,000', '100 000', 'navy', 'military', 'air force', 'rhineland'] }, { t: 'lost land and colonies', any: ['land', 'territor', 'colon', 'alsace', 'lorraine', 'saar', 'polish corridor', 'empire'] }, { t: 'a "Diktat": Germany was not allowed to negotiate', any: ['diktat', 'dictated', 'not invited', 'no say', 'forced', 'negotiat'] }], needPoints: 3,
      model: 'One reason Germans were angry was the war guilt clause (Article 231), which made Germany accept the blame for the war. Many Germans believed they had fought to defend their country, so this felt deeply unfair. Another reason was reparations of £6.6 billion. This angered Germans because the economy was already weak and the payments seemed impossible. Finally, the treaty was a "Diktat": Germany was not allowed to negotiate, so it felt like a punishment forced on them.' },
    { id: 'hi-w-league', subj: 'history', lessons: ['hi-league'], title: '"How far do you agree?" The League of Nations [10]', type: 'explain', judge: true, marks: 10, min: 200, max: 380,
      prompt: '<b>"The Great Depression was the main reason the League of Nations failed." How far do you agree with this statement? Explain your answer.</b> [10]',
      tips: ['Paragraph 1: how the Depression weakened the League (explain).', 'Paragraphs 2–3: other reasons (weaknesses of the League, Manchuria, Abyssinia).', 'Conclusion: your judgement and why ("Overall… because…").'],
      points: [{ t: 'the Depression (economic problems)', any: ['depression', 'economic', 'unemploy', '1929', 'wall street'] }, { t: 'Manchuria (Japan)', any: ['manchuria', 'japan'] }, { t: 'Abyssinia (Italy)', any: ['abyssinia', 'ethiopia', 'mussolini', 'italy'] }, { t: 'USA not a member', any: ['usa', 'united states', 'america'] }, { t: 'no army / weak sanctions', any: ['army', 'sanction', 'no force', 'troops'] }, { t: 'Britain and France put themselves first', any: ['britain', 'france', 'self-interest', 'own interest'] }], needPoints: 4,
      model: 'The Depression did weaken the League, because countries facing unemployment were unwilling to impose sanctions… (Manchuria explained) … However, the League also had weaknesses from the start: the USA never joined and it had no army, so… (Abyssinia: Britain and France put their own interests first)… Overall, I partly agree: the Depression made aggression more likely, but the League failed mainly because… ' },
    { id: 'ge-w-floods', subj: 'geography', lessons: ['ge-floods', 'ge-rivers'], title: 'Explain why rivers flood [6]', type: 'explain', marks: 6, min: 80, max: 200,
      prompt: '<b>Explain why some rivers flood.</b> Use both natural and human causes. [6]',
      tips: ['For each cause: what happens to the water → why it reaches the river faster or in larger amounts.', 'Use the words: precipitation, infiltration, surface run-off, impermeable.'],
      points: [{ t: 'heavy or long rainfall', any: ['heavy rain', 'rainfall', 'precipitation', 'storm', 'monsoon', 'rain'] }, { t: 'saturated or impermeable ground', any: ['saturat', 'impermeable', 'clay', 'rock', 'frozen'] }, { t: 'steep slopes', any: ['steep', 'slope', 'relief'] }, { t: 'towns and concrete (urbanisation)', any: ['urban', 'concrete', 'tarmac', 'road', 'building', 'drain'] }, { t: 'deforestation', any: ['deforest', 'cut down', 'trees', 'forest', 'vegetation'] }, { t: 'snowmelt', any: ['snow', 'melt'] }], needPoints: 3,
      model: 'Heavy rainfall can cause flooding because the ground cannot soak up the water quickly enough, so more surface run-off reaches the river. If the soil is already saturated or the rock is impermeable, infiltration is low, so water flows over the surface instead. Human activities also matter. In towns, concrete and tarmac are impermeable and drains carry water quickly to the river. Deforestation means fewer trees intercept the rain, so water reaches the channel faster and the discharge rises above the banks.' },
    { id: 'bi-w-osmosis', subj: 'biology', lessons: ['bi-diffusion'], title: 'Explain how water enters root hair cells [4]', type: 'explain', marks: 4, min: 50, max: 130,
      prompt: '<b>Explain how water moves from the soil into a root hair cell.</b> [4]',
      tips: ['Name the process.', 'Say where the water is more and less concentrated.', 'Say what the water passes through, and why root hairs help.'],
      points: [{ t: 'osmosis', any: ['osmosis'] }, { t: 'partially permeable membrane', any: ['partially permeable', 'membrane', 'semi-permeable', 'selectively permeable'] }, { t: 'from dilute (soil) to concentrated (cell)', any: ['dilute', 'concentrated', 'higher water', 'lower water', 'more water', 'less water', 'water potential', 'concentration gradient'] }, { t: 'root hairs give a large surface area', any: ['surface area', 'large area', 'long', 'thin'] }], needPoints: 3,
      model: 'Water enters the root hair cell by osmosis. The soil water is more dilute than the cell sap, so water moves from the soil into the cell, down its concentration gradient. It passes through the partially permeable cell membrane. The root hair is long and thin, which gives a large surface area, so more water can enter.' },
    { id: 'ph-w-terminal', subj: 'physics', lessons: ['ph-friction', 'ph-newton'], title: 'Describe and explain a skydiver\'s fall [5]', type: 'explain', marks: 5, min: 60, max: 160,
      prompt: '<b>A skydiver jumps from a plane. Describe and explain how her speed changes before she opens her parachute.</b> [5]',
      tips: ['Talk about the two forces: weight (down) and air resistance (up).', 'Say what happens to air resistance as speed increases.', 'Use "resultant force" and "terminal velocity".'],
      points: [{ t: 'weight pulls her down', any: ['weight', 'gravity'] }, { t: 'air resistance acts upwards', any: ['air resistance', 'drag', 'friction'] }, { t: 'she speeds up at first (resultant force down)', any: ['accelerat', 'speeds up', 'speed increases', 'faster', 'resultant'] }, { t: 'air resistance increases with speed', any: ['increases', 'gets bigger', 'grows', 'more air resistance'] }, { t: 'forces balance → terminal velocity', any: ['terminal', 'balanced', 'equal', 'constant speed', 'steady speed', 'zero'] }], needPoints: 4,
      model: 'At first her weight is much bigger than the air resistance, so there is a resultant force downwards and she accelerates. As her speed increases, the air resistance increases. Eventually the air resistance equals her weight, so the resultant force is zero. She then falls at a constant speed, called terminal velocity.' },
    { id: 'ch-w-rates', subj: 'chemistry', lessons: ['ch-rates'], title: 'Explain temperature and rate with particles [3]', type: 'explain', marks: 3, min: 40, max: 110,
      prompt: '<b>Use ideas about particles to explain why a reaction is faster at a higher temperature.</b> [3]',
      tips: ['What happens to the particles\' energy and speed?', 'How often do they collide?', 'What about collisions with enough energy (activation energy)?'],
      points: [{ t: 'particles gain energy and move faster', any: ['more energy', 'kinetic', 'move faster', 'faster', 'energy'] }, { t: 'more frequent collisions', any: ['collide more', 'more collisions', 'collisions', 'frequent', 'collide'] }, { t: 'more collisions have the activation energy', any: ['activation', 'enough energy', 'successful', 'minimum energy'] }], needPoints: 3,
      model: 'At a higher temperature the particles have more kinetic energy, so they move faster. They collide more often. A greater proportion of the collisions have energy equal to or greater than the activation energy, so there are more successful collisions per second and the rate increases.' },
    { id: 'cs-w-security', subj: 'computing', lessons: ['cs-security'], title: 'Describe two ways to protect data [4]', type: 'explain', marks: 4, min: 50, max: 140,
      prompt: '<b>Describe two ways a company can protect its data from hackers.</b> [4]',
      tips: ['Name the method, then say how it protects the data.', 'Two methods, two marks each.'],
      points: [{ t: 'firewall', any: ['firewall'] }, { t: 'strong passwords or two-step login', any: ['password', 'two-factor', '2fa', 'two-step', 'biometric', 'fingerprint'] }, { t: 'encryption', any: ['encrypt'] }, { t: 'anti-malware software', any: ['anti-malware', 'antivirus', 'anti-virus', 'malware'] }, { t: 'access rights', any: ['access right', 'access level', 'permission', 'privilege'] }, { t: 'updates and backups', any: ['update', 'patch', 'backup', 'back up'] }], needPoints: 2,
      model: 'A firewall checks data coming into and out of the network and blocks traffic that does not meet the rules, so hackers cannot easily get in. Encryption scrambles the data using a key, so even if a hacker steals it, they cannot understand it without the key.' }
  ];
  R2O.writingTasks = sid => TASKS.filter(t => !sid || t.subj === sid);

  // ---------------- views ----------------
  const $ = (s, e = document) => e.querySelector(s);
  const rec = id => { const st = R2O.state(); st.writing = st.writing || {}; return (st.writing[id] = st.writing[id] || { draft: '', best: null, tries: [] }); };
  const list = (box, q) => {
    const st = R2O.state(), sid = q.s, subjects = R2O.SUBJECTS.filter(s => TASKS.some(t => t.subj === s.id) && (!sid || s.id === sid));
    box.innerHTML = `<div class="writelist"><div class="crumbs"><a href="#/">${R2O.icon('back')}Road</a></div><h1>Write and get marked</h1>
      <p class="muted">Write a real answer and get feedback straight away, on your phone, with no internet needed.</p>
      ${subjects.map(s => `<section class="card"><h3 class="wsubj">${R2O.badge(s)}${s.name}${R2O.locked(s.id) ? R2O.icon('lock') + '<span class="vh">locked</span>' : ''}</h3><ul class="wtasks">${TASKS.filter(t => t.subj === s.id).map(t => { const r = (st.writing || {})[t.id]; return `<li><a href="#/write/${t.id}">${esc(t.title)}</a><span class="muted small">${t.min} to ${t.max} words${r && r.best != null ? `. Best so far: ${r.best}%` : ''}</span></li>`; }).join('')}</ul></section>`).join('')}
      ${sid ? '<p class="center"><a href="#/write">See writing tasks for every subject</a></p>' : ''}</div>`;
  };
  const resultHTML = (r, task, text) => `<div class="card wresult">
      <div class="wband">${R2O.icon(r.icon)}<div><b>${r.band}</b>, ${r.score}%${r.marks != null ? `<br><span class="muted small">Rough estimate: about ${r.marks} out of ${task.marks} marks</span>` : ''}</div></div>
      <div class="wcrit">${r.criteria.map(c => `<div><span>${c.name}</span><div class="pbar"><div style="width:${c.got / c.max * 100}%"></div></div><b>${c.got}/${c.max}</b></div>`).join('')}</div>
      ${r.good.length ? `<h4>What went well</h4><ul>${r.good.map(g => `<li>${g}</li>`).join('')}</ul>` : ''}
      ${r.next.length ? `<h4>Next steps</h4><ol>${r.next.map(g => `<li>${g}</li>`).join('')}</ol>` : '<p>Excellent work. Try a harder task next!</p>'}
      <details><summary>See your writing with notes</summary><p class="wtext">${annotate(text, r.issues)}</p><ul class="muted small wkey"><li><mark class="w-sp">Yellow</mark>: check the spelling (tap and hold for the fix)</li><li><u class="w-rep">Underlined</u>: a repeated word</li><li><span class="w-long">Red wavy line</span>: a very long sentence</li></ul></details>
      <details><summary>See an example answer</summary><p class="wtext">${esc(task.model).replace(/\n/g, '<br>')}</p><p class="muted small">This is one good way to answer. Yours can be different and still be very good.</p></details>
      <p class="muted small">This feedback comes from the app on your phone, not a teacher. It checks key points, structure and accuracy, but it can't judge everything. Show your best writing to a teacher when you can.</p></div>`;
  const task = (box, id) => {
    const t = TASKS.find(x => x.id === id); if (!t) return R2O.go('#/write');
    if (R2O.locked(t.subj)) return R2O.go('#/subject/' + t.subj);
    const r = rec(t.id), S = R2O.subject(t.subj);
    box.innerHTML = `<div class="writetask"><div class="crumbs"><a href="#/write?s=${t.subj}">${R2O.icon('back')}Writing tasks</a><span class="muted">${S.short}</span></div>
      <h1>${esc(t.title)}</h1>
      <section class="card"><div class="wprompt">${t.prompt}</div>${R2O.canSpeak && R2O.canSpeak() ? `<button class="link" id="w-say">${R2O.icon('speaker')}Read the task aloud</button>` : ''}
        <details><summary>Tips</summary><ul>${t.tips.map(x => `<li>${x}</li>`).join('')}</ul></details>
        ${t.lessons && t.lessons[0] && R2O.lesson(t.lessons[0]) ? `<p class="small">Lesson: <a href="#/lesson/${t.lessons[0]}">${esc(R2O.lesson(t.lessons[0]).title)}</a></p>` : ''}</section>
      <label class="field"><span>Your answer <span class="muted small">(${t.min} to ${t.max} words)</span></span><textarea id="w-text" rows="12" spellcheck="false" placeholder="Start writing here. Press Enter to start a new paragraph.">${esc(r.draft || '')}</textarea></label>
      <p class="wcount"><span id="w-n">0</span> words <span class="muted">(saved automatically on this phone)</span></p>
      <div class="ctas"><button class="btn primary big" id="w-mark">Mark my writing</button>${CONFIG.aiUrl ? '<button class="btn ghost" id="w-ai">Deeper AI feedback (needs internet)</button>' : ''}</div>
      <div id="w-out"></div>
      ${r.tries.length ? `<p class="muted small center">Your past scores: ${r.tries.slice(-5).map(x => x.score + '%').join(', then ')}</p>` : ''}</div>`;
    const ta = $('#w-text', box), upd = () => { const n = R2O.countWords(ta.value); $('#w-n', box).textContent = n; $('#w-n', box).className = n < t.min ? 'lo' : n > t.max ? 'hi' : 'okc'; };
    let tm; ta.oninput = () => { upd(); clearTimeout(tm); tm = setTimeout(() => { r.draft = ta.value; R2O.save(); }, 400); };
    upd();
    if ($('#w-say', box)) $('#w-say', box).onclick = () => R2O.speak(t.prompt);
    $('#w-mark', box).onclick = () => {
      const text = ta.value; r.draft = text;
      if (R2O.countWords(text) < 5) { $('#w-out', box).innerHTML = '<p class="hint">Write a few sentences first, then press Mark.</p>'; return; }
      const res = markWriting(text, t); const first = r.best == null;
      r.tries.push({ d: Date.now(), score: res.score }); r.best = Math.max(r.best || 0, res.score); R2O.save();
      $('#w-out', box).innerHTML = resultHTML(res, t, text);
      if (first) R2O.addXP(30); else if (res.score > (r.tries[r.tries.length - 2] || {}).score) { R2O.addXP(15); R2O.toast('Better than last time!'); }
      if (res.score >= 80) R2O.confetti();
      $('#w-out', box).scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const ai = $('#w-ai', box);
    if (ai) ai.onclick = async () => {
      const text = ta.value; if (R2O.countWords(text) < 20) return R2O.toast('Write at least 20 words first');
      if (navigator.onLine === false) return R2O.toast('You\'re offline. The normal marking still works without internet.');
      ai.disabled = true; ai.textContent = 'Thinking…';
      try {
        const res = await fetch(CONFIG.aiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: { title: t.title, prompt: R2O.plain(t.prompt).slice(0, 1500), type: t.type, marks: t.marks || null, min: t.min, max: t.max, points: (t.points || []).map(p => p.t) }, text: text.slice(0, 4000) }) });
        const j = await res.json(); if (!res.ok || !j.feedback) throw new Error(j.error || 'no feedback');
        $('#w-out', box).insertAdjacentHTML('afterbegin', `<div class="card wai"><h4>AI feedback</h4><p class="wtext">${esc(j.feedback).replace(/\n/g, '<br>')}</p><p class="muted small">From an AI model. It can make mistakes, so use it as advice, not as a final mark.</p></div>`);
      } catch (e) { R2O.toast('Couldn\'t reach the AI marker right now. The normal marking still works.'); }
      ai.disabled = false; ai.textContent = 'Deeper AI feedback (needs internet)';
    };
  };
  R2O.writing = { view: (box, id, q = {}) => id ? task(box, id) : list(box, q) };
})();
