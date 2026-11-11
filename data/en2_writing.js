// English Language 1123, part 2: Writing (Paper 2 and the writing skills W1–W5).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, bank = S.bank, passage = S.passage;
  const T = (q, opts, a, why) => ({ q, opts, a, why });

  // ================= generators =================
  const SUBJ = [['The list of names', 'was', 'were'], ['Each of the students', 'has', 'have'], ['The children', 'were', 'was'], ['Neither the teacher nor the students', 'were', 'was'], ['The team', 'is', 'are'], ['My brother and I', 'are', 'is'], ['Everyone in the room', 'was', 'were'], ['The results of the test', 'were', 'was']];
  G.enAgree = () => { const [s, right, wrong] = pick(SUBJ); return { kind: 'mcq', q: `<p>Choose the correct verb: "${s} ___ on the board."</p>`, choices: K.shuffle([right, wrong]), a: right, hint: 'Find the real subject: ignore the words in between.', steps: [`The subject is <b>${s.replace(/ of .*/, '')}</b>, so: "${s} <b>${right}</b> …"`] }; };
  const APOS = [["the dog's bone", 'one dog'], ["the dogs' bones", 'several dogs'], ["the children's toys", 'the children (irregular plural)'], ["it's raining", 'it is'], ["its tail", 'belonging to it'], ["James's book", 'one person called James'], ["the teachers' room", 'a room for several teachers']];
  G.enApostrophe = () => { const [right, why] = pick(APOS); const wrongs = { "the dog's bone": ["the dogs bone", "the dogs' bone"], "the dogs' bones": ["the dog's bones", "the dogs bones'"], "the children's toys": ["the childrens' toys", "the childrens toys"], "it's raining": ["its raining", "its' raining"], "its tail": ["it's tail", "its' tail"], "James's book": ["Jame's book", "James book"], "the teachers' room": ["the teacher's room", "the teachers room"] }[right];
    return { kind: 'mcq', q: `<p>Which is correct for <b>${why}</b>?</p>`, choices: K.mcq(right, wrongs), a: right, hint: "Possession: 's for one owner; s' for plural owners ending in s; it's = it is.", steps: [`<b>${right}</b>`] }; };
  bank('enPunct', [
    { q: 'Which sentence is punctuated correctly?', a: 'When the bell rang, everyone rushed outside.', w: ['When the bell rang everyone, rushed outside.', 'When, the bell rang everyone rushed outside.', 'When the bell rang everyone rushed, outside.'], why: 'A comma after an opening subordinate clause.' },
    { q: 'Which is a comma splice (an error)?', a: 'It was late, we went home.', w: ['It was late, so we went home.', 'It was late; we went home.', 'It was late. We went home.'], why: 'Two full sentences can\'t be joined with just a comma.' },
    { q: 'Which uses speech marks correctly?', a: '"Come here," she said.', w: ['"Come here" she said.', '"Come here, she said."', 'Come here, "she said".'], why: 'Punctuation goes inside the speech marks.' },
    { q: 'A semicolon can join…', a: 'two closely related complete sentences', w: ['a list of single words always', 'a question and an answer', 'any two words'], why: 'e.g. "The rain stopped; the sun came out."' },
    { q: 'Which word is spelled correctly?', a: 'necessary', w: ['neccessary', 'necesary', 'neccesary'], why: 'One collar (c), two sleeves (ss).' },
    { q: 'Which word is spelled correctly?', a: 'definitely', w: ['definately', 'defenitely', 'definitly'], why: 'It contains "finite".' },
    { q: '"Their / There / They\'re going to the market." Which fits?', a: "They're", w: ['Their', 'There'], why: "They're = they are." },
    { q: 'Which uses the past tense consistently?', a: 'She opened the door and saw a stranger.', w: ['She opens the door and saw a stranger.', 'She opened the door and sees a stranger.', 'She open the door and seen a stranger.'], why: 'Keep tenses consistent.' }
  ]);
  bank('enSentences', [
    { q: '"Although it was raining, we played football." This is a…', a: 'complex sentence', w: ['simple sentence', 'compound sentence', 'fragment'], why: 'A main clause plus a subordinate clause (Although…).' },
    { q: '"It was raining, but we played football." This is a…', a: 'compound sentence', w: ['simple sentence', 'complex sentence', 'fragment'], why: 'Two main clauses joined by a conjunction (and, but, so, or).' },
    { q: 'Why might a writer use a very short sentence after long ones?', a: 'To create impact, shock or tension', w: ['Because they ran out of ideas', 'To make it more formal', 'Short sentences are always wrong'], why: 'e.g. "Then the lights went out."' },
    { q: 'Which opening adds the most variety?', a: 'Trembling, she reached for the handle.', w: ['She reached for the handle.', 'She was trembling. She reached for the handle.', 'She reached and she reached.'], why: 'Starting with a verb (-ing) varies sentence openings.' },
    { q: 'Which is the most precise vocabulary?', a: 'The old man shuffled across the room.', w: ['The old man went across the room.', 'The old man moved across the room.', 'The old man did walking across the room.'], why: '"Shuffled" shows how he moved (slowly, feet dragging).' }
  ]);
  bank('enRegister', [
    { q: 'Which is suitable for a formal letter to a headteacher?', a: 'I am writing to suggest improvements to the school canteen.', w: ['Hey! The canteen food is gross lol.', 'Yo, fix the canteen pls.', 'OMG the canteen!!!'], why: 'Formal register: full sentences, no slang, polite tone.' },
    { q: 'A speech to classmates should…', a: 'address the audience directly and sound natural when spoken', w: ['have headings and bullet points', 'start with "Dear Sir"', 'avoid ever saying "you"'], why: 'Use direct address, rhetorical questions and a clear call to action.' },
    { q: 'A report usually has…', a: 'a clear title, sub-headings and an objective tone', w: ['dialogue between characters', 'a "Dear…" greeting', 'lots of exclamation marks'], why: 'It informs and recommends.' },
    { q: 'A newspaper or magazine article usually needs…', a: 'an eye-catching headline and engaging opening', w: ['"Yours faithfully" at the end', 'a list of characters', 'no paragraphs'], why: 'It informs or persuades a general readership.' },
    { q: 'In a formal letter beginning "Dear Sir or Madam", end with…', a: 'Yours faithfully', w: ['Yours sincerely', 'Love from', 'Cheers'], why: 'If you name the person ("Dear Mr Tan"), use "Yours sincerely".' },
    { q: 'An informal email to a friend can use…', a: 'contractions and a chatty, friendly tone', w: ['legal language', 'sub-headings and a reference number', 'no greeting at all'], why: 'Match register to audience and purpose.' },
    { q: 'Which is the clearest PURPOSE of a persuasive speech?', a: 'To convince listeners to think or act in a certain way', w: ['To describe a place', 'To tell a fictional story', 'To list facts with no opinion'], why: 'Purpose shapes every choice you make.' }
  ]);
  bank('enPersuade', [
    { q: '"Wouldn\'t you want your child to be safe?" is a…', a: 'rhetorical question', w: ['statistic', 'anecdote', 'fact'], why: 'It engages the reader and implies the answer.' },
    { q: 'Mentioning a personal story to support your point is using an…', a: 'anecdote', w: ['alliteration', 'statistic', 'counter-argument'], why: 'Stories make arguments relatable.' },
    { q: 'Why include a counter-argument?', a: 'To show you have considered other views, then rebut them, which makes you more convincing', w: ['To agree with the opposite side', 'To fill space', 'Because examiners require it in every answer'], why: '"Some may argue… However…"' },
    { q: 'Which is the strongest conclusion to a persuasive speech?', a: 'A clear call to action, e.g. "Sign the petition today."', w: ['"That\'s all I have to say."', '"Thanks for listening, bye."', 'Introducing a brand-new topic'], why: 'Tell the audience what to do next.' },
    { q: 'In directed writing you should…', a: 'use and develop ideas from the texts, and evaluate them, in your own words', w: ['copy long sections of the texts', 'ignore the texts and write anything', 'only give your own unrelated opinions'], why: 'The task tests R3 and R5 as well as writing.' },
    { q: '"Three out of four students skip breakfast" is…', a: 'a statistic used as evidence', w: ['an anecdote', 'a rhetorical question', 'hyperbole'], why: 'Numbers add authority.' }
  ]);
  bank('enCreative', [
    { q: 'Which "shows" rather than "tells" that someone is nervous?', a: 'Her fingers twisted the hem of her shirt.', w: ['She was very nervous.', 'She felt nervous inside.', 'Nervousness was what she had.'], why: 'Show through actions and details, and let the reader infer.' },
    { q: 'A descriptive composition should mainly…', a: 'help the reader picture a person, place or situation, including its atmosphere', w: ['tell a long story with many events', 'argue a point of view', 'list facts'], why: 'Narrative tells a sequence of connected events.' },
    { q: 'Which uses more than one sense?', a: 'The bread was warm, and its yeasty smell filled the crackling silence.', w: ['The bread was nice.', 'There was bread on the table.', 'Bread is food.'], why: 'Touch, smell and sound together make writing vivid.' },
    { q: 'A good narrative structure is…', a: 'opening hook → build-up → complication → climax → resolution', w: ['climax first, then nothing', 'only description', 'random events'], why: 'Connected events with rising tension.' },
    { q: 'A strong opening line for a story…', a: 'grabs attention, e.g. with action, dialogue or a mystery', w: ['always begins "One day"', 'explains the whole plot', 'describes the weather for a page'], why: 'e.g. "The letter arrived three years too late."' },
    { q: 'In descriptive writing, "zooming in" means…', a: 'moving from the whole scene to small, telling details', w: ['writing very large letters', 'skipping description', 'describing only the ending'], why: 'Like a camera: wide shot, then close-up.' },
    { q: 'Ending a story with "and then I woke up — it was all a dream" is usually…', a: 'weak, because it cancels everything the reader cared about', w: ['the best ending', 'required', 'very original'], why: 'Choose an ending that resolves or reflects.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'english', id: 'en-write', name: 'Writing', icon: '✍️', color: '#9a3412', book: ['Writing Guide with Handbook', 'https://openstax.org/details/books/writing-guide'],
    blurb: 'Paper 2 and the writing skills: audience and register, directed writing, persuasion, description, narrative, sentences and accuracy.',
    lessons: [
      { id: 'en-register', title: 'Audience, purpose and register', obj: ['W4', 'P2A'], kw: 'register formal informal audience purpose form text types', learn: [],
        hook: 'You wouldn\'t text your headteacher the way you text your best friend.',
        scenes: [
          { say: idea('Before writing anything, ask three questions: <b>Who</b> is reading (audience)? <b>Why</b> am I writing (purpose: inform, persuade, describe, argue)? <b>What</b> form (letter, email, speech, report, article)? The answers decide your <b>register</b>: how formal your words and tone are.') },
          { say: 'Slide from informal to formal.', anim: X([{ k: 'f', label: 'Formality', min: 0, max: 3, v: 0 }], v => `<p class="center bigq">${['"Hey, the canteen food is kinda awful tbh 😅"', '"Hi! The canteen food isn\'t great, could we change it?"', '"I would like to suggest some changes to the canteen menu."', '"I am writing to propose several improvements to the nutritional quality of the school canteen\'s menu."'][v.f]}</p><p class="center">${['Chat with a friend', 'Friendly email', 'Polite letter or speech', 'Formal letter or report'][v.f]}</p>`) },
          { say: 'Five text types to know:', pic: '<table class="tbl"><tr><th>form</th><th>key features</th></tr><tr><td>letter</td><td>greeting, paragraphs, sign-off (Yours faithfully / sincerely)</td></tr><tr><td>email</td><td>subject line idea, greeting, concise paragraphs</td></tr><tr><td>report</td><td>title, sub-headings, objective tone, recommendations</td></tr><tr><td>article</td><td>headline, engaging opening, paragraphs for readers</td></tr><tr><td>speech</td><td>address the audience, rhetorical questions, call to action</td></tr></table>',
            ask: T('Writing to a newspaper editor about pollution, you should use…', ['a formal register', 'slang to sound relatable', 'text-speak'], 0, 'Formal audience, serious purpose.') }
        ],
        keys: ['Audience, purpose, form → register.', 'Text types: email, letter, report, article, speech (and summary).', 'Keep register consistent throughout.'],
        gens: ['enRegister'], easy: ['enRegister'] },
      { id: 'en-directed', title: 'Directed writing and persuasion', obj: ['P2A', 'W2', 'R3'], kw: 'directed writing persuasive argumentative discursive techniques', learn: [],
        hook: 'Turn someone else\'s facts into your own convincing argument.',
        scenes: [
          { say: idea('In directed writing you read 1–2 short texts, then <b>use</b> their ideas, <b>develop</b> them (add reasons, consequences, examples) and <b>evaluate</b> them (which are strong, which are weak) in a new piece for a stated <b>audience</b> and <b>form</b>. Aim for about 250–350 words.') },
          { say: 'Build a paragraph step by step.', anim: { type: 'reveal', keep: true, stages: ['<p><b>Point:</b> A longer lunch break would improve learning.</p>', '<p><b>Use the text:</b> The article says students eat too quickly and feel tired in the afternoon.</p>', '<p><b>Develop:</b> Rushed meals mean poor digestion and low energy, so lessons after lunch are wasted.</p>', '<p><b>Evaluate:</b> Although the article\'s claim comes from one small survey, most of us know the afternoon slump is real.</p>', '<p><b>Persuade:</b> Wouldn\'t twenty extra minutes be a small price for focused, healthier students?</p>'] } },
          { say: 'Persuasive tools: rhetorical questions, statistics, expert opinion, anecdotes, emotive language, direct address ("you"), the rule of three, counter-argument + rebuttal, and a call to action.',
            ask: T('Why is evaluating the source texts important?', ['It shows critical thinking and earns reading marks (R3)', 'It makes the piece longer', 'It proves you read quickly'], 0, 'Don\'t just copy: judge and develop.') },
          { say: 'Plan in 5 minutes: one idea per paragraph, an opening that hooks the audience, a logical order, and a strong ending. Then check the form features and register.' }
        ],
        keys: ['Use, develop and evaluate ideas from the texts, in your own words.', 'Clear structure: hook, one point per paragraph, conclusion/call to action.', 'Persuasive techniques; counter-argument and rebuttal.', 'About 250–350 words; correct form and register.'],
        gens: ['enPersuade', 'enRegister', 'enEvaluate'], easy: ['enPersuade'] },
      { id: 'en-descriptive', title: 'Descriptive writing', obj: ['P2B', 'W1', 'W3'], kw: 'descriptive writing senses show not tell imagery atmosphere', learn: [],
        hook: 'Paint a picture so clear the reader feels they are standing there.',
        scenes: [
          { say: idea('Descriptive writing isn\'t a story: it\'s a <b>picture made of words</b>. Use your <b>five senses</b>, precise words, and <b>show</b> feelings through details instead of naming them. Build an <b>atmosphere</b>: the overall mood the reader feels.') },
          { say: 'Turn "telling" into "showing".', anim: X([{ k: 'i', label: 'Example', min: 0, max: 3, v: 0 }], v => { const d = [['The market was busy.', 'Elbows jostled for space as sellers bellowed prices over the clatter of crates.'], ['It was cold.', 'Frost silvered the windows, and my breath hung in the air like a ghost.'], ['He was angry.', 'His jaw tightened; the pen snapped between his fingers.'], ['The room was old.', 'Dust drifted through a blade of light, settling on chairs nobody had touched in years.']][v.i]; return `<p class="center">❌ Tell: <b>${d[0]}</b></p><p class="center bigq">✅ Show: ${d[1]}</p>`; }) },
          { say: 'Structure a description like a camera: <b>wide shot</b> (the whole scene) → <b>zoom in</b> on details → maybe a change (time passes, weather shifts) → a closing image that echoes the start.',
            ask: T('Which sentence uses the most senses?', ['Hot oil hissed in the pan, and the sharp smell of chilli stung my eyes.', 'The food was cooked.', 'There was a kitchen.'], 0, 'Sound, smell and touch.') },
          { say: 'Choose precise verbs and nouns over piles of adjectives. Vary sentence lengths: a short sentence after long ones lands with weight. About 350–450 words.' }
        ],
        keys: ['Describe a person, place or situation so the reader can picture it, including atmosphere.', 'Five senses; show, don\'t tell; precise vocabulary; imagery.', 'Camera structure: wide → zoom → change → closing image.'],
        gens: ['enCreative', 'enLanguage'], easy: ['enCreative'] },
      { id: 'en-narrative', title: 'Narrative writing', obj: ['P2B', 'W1', 'W2'], kw: 'narrative writing story structure tension character', learn: [],
        hook: 'A great story is a problem that someone we care about must face.',
        scenes: [
          { say: idea('A narrative is a <b>sequence of connected events</b>. Readers keep reading because they <b>care about a character</b> who wants something and meets a <b>problem</b>. Tension rises, peaks at a <b>climax</b>, then resolves. Keep it focused: one main event, told well.') },
          { say: 'Follow the tension through a story.', anim: X([{ k: 's', label: 'Stage', min: 0, max: 4, v: 0, fmt: i => ['hook', 'build-up', 'problem', 'climax', 'resolution'][i] }], v => `${K.plot([{ f: x => x < 3.2 ? 1 + x * x * .6 : 7.1 - (x - 3.2) * 4 }], [{ x: v.s, y: v.s < 3.2 ? 1 + v.s * v.s * .6 : 7.1 - (v.s - 3.2) * 4 }], { xmin: 0, xmax: 4.2, ymin: 0, ymax: 8, h: 160, gstep: 1e9, lstep: 1e9, xlab: 'story', ylab: 'tension' })}<p class="center">${['<b>Hook</b>: start with action, dialogue or a mystery.', '<b>Build-up</b>: who, where, what they want.', '<b>Problem</b>: something goes wrong.', '<b>Climax</b>: the moment of highest tension.', '<b>Resolution</b>: what changed? End with a reflection or image.'][v.s]}</p>`) },
          { say: 'Techniques: a consistent viewpoint (first or third person), dialogue that reveals character, short sentences at tense moments, and details that matter later.',
            ask: T('Which is the best opening line?', ['"The letter arrived three years too late."', '"One day I woke up and had breakfast."', '"This story is about a girl."'], 0, 'It raises a question the reader wants answered.') },
          { say: 'Avoid: too many characters, too many events, and "it was all a dream" endings. About 350–450 words.' }
        ],
        keys: ['Character + want + problem → tension.', 'Hook, build-up, problem, climax, resolution.', 'Consistent viewpoint and tense; purposeful dialogue; varied sentences.'],
        gens: ['enCreative'], easy: ['enCreative'] },
      { id: 'en-sentences', title: 'Sentences and vocabulary', obj: ['W3'], kw: 'sentence types simple compound complex vocabulary variety', learn: [],
        hook: 'Same ideas, different sentences: a completely different feel.',
        scenes: [
          { say: idea('Sentences come in three shapes: <b>simple</b> (one idea), <b>compound</b> (two equal ideas joined by and/but/so), and <b>complex</b> (a main idea plus a supporting one: because, although, when…). <b>Mixing</b> them, and choosing precise words, makes writing flow and lets you control pace.') },
          { say: 'Join the same two ideas in different ways.', anim: X([{ k: 't', label: 'Type', min: 0, max: 3, v: 0, fmt: i => ['simple ×2', 'compound', 'complex', 'complex (fronted)'][i] }], v => `<p class="center bigq">${['The power failed. We lit candles.', 'The power failed, so we lit candles.', 'We lit candles because the power failed.', 'When the power failed, we lit candles.'][v.t]}</p>`) },
          { say: 'Vary openings (an adverb, an -ing verb, a place, a short phrase) and lengths. Short sentences = impact. Long sentences = flow and detail.',
            ask: T('"Although she was tired, she kept running." is…', ['complex', 'simple', 'compound'], 0, 'Subordinate clause + main clause.') }
        ],
        keys: ['Simple, compound, complex sentences.', 'Vary openings and lengths for effect.', 'Precise, ambitious (but correct) vocabulary.'],
        gens: ['enSentences'], easy: ['enSentences'] },
      { id: 'en-accuracy', title: 'Spelling, punctuation and grammar', obj: ['W5'], kw: 'punctuation apostrophes commas grammar spelling subject verb agreement', learn: [],
        hook: 'Small errors cost marks and confuse readers. Here are the big ones.',
        scenes: [
          { say: idea('Punctuation tells the reader <b>how to read</b> your writing: where to pause (comma), stop (full stop), link closely (semicolon) or who owns what (apostrophe). Grammar keeps the meaning clear: verbs must <b>agree</b> with their subjects and tenses must stay <b>consistent</b>.') },
          { say: 'Apostrophes have two jobs.', anim: X([{ k: 'i', label: 'Example', min: 0, max: 4, v: 0 }], v => { const d = [["it's late", 'missing letter: it is'], ["the cat's bowl", 'one cat owns it'], ["the cats' bowls", 'several cats own them'], ["the women's shoes", 'irregular plural: add \'s'], ["its fur", 'NO apostrophe: "its" already means belonging to it']][v.i]; return `<p class="center bigq">${d[0]}</p><p class="center">${d[1]}</p>`; }) },
          { say: 'Common traps: comma splices (joining two sentences with a comma), speech punctuation, their/there/they\'re, your/you\'re, subject–verb agreement ("The list of names <b>was</b>…"), switching tenses mid-story.',
            ask: T('Which is correct?', ['The results of the test were good.', 'The results of the test was good.'], 0, 'The subject is "results" (plural).') },
          { say: 'Always leave 5 minutes to proofread: read slowly, as if aloud, and fix what you spot.' }
        ],
        keys: ['Apostrophes: omission and possession; its vs it\'s.', 'Avoid comma splices; punctuate speech correctly.', 'Subject–verb agreement; consistent tense.', 'Proofread.'],
        gens: ['enApostrophe', 'enAgree', 'enPunct'], easy: ['enPunct'] }
    ] });
})();
