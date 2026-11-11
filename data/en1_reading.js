// English Language 1123, part 1: subject set-up (skills-based syllabus) and Reading (Paper 1).
// All passages are original, written for Road to O's.
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, bank = S.bank, eq = S.eq;
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const P = 'https://cambridgeinternational.org/Images/721416-2027-2028-syllabus.pdf';
  const passage = t => `<div class="passage">${t}</div>`;
  S.passage = passage;
  const wc = s => (s.trim().match(/\S+/g) || []).length;

  R2O.SYLS.english = { objectives: [
    { id: 'R1', a: 0, p: 9, t: 'Understand explicit meanings', los: ['Demonstrate understanding of explicit meanings.'], kw: 'comprehension explicit meaning find information retrieve' },
    { id: 'R2', a: 0, p: 9, t: 'Understand implicit meanings and attitudes', los: ['Demonstrate understanding of implicit meanings and attitudes.'], kw: 'inference implicit meaning attitude suggest imply' },
    { id: 'R3', a: 0, p: 9, t: 'Analyse, evaluate and develop facts, ideas and opinions', los: ['Analyse, evaluate and develop facts, ideas and opinions, using appropriate support from the text.'], kw: 'evaluate facts opinions bias argument evidence' },
    { id: 'R4', a: 0, p: 9, t: 'How writers achieve effects', los: ['Demonstrate understanding of how writers achieve effects and influence readers.'], notes: ['Recognise and respond to linguistic devices, figurative language and imagery (page 10).'], kw: 'language effects imagery simile metaphor personification connotation writers craft use of language' },
    { id: 'R5', a: 0, p: 9, t: 'Select and use information for specific purposes', los: ['Select and use information for specific purposes.'], kw: 'select information summary points' },
    { id: 'W1', a: 1, p: 9, t: 'Articulate experience; express thoughts, feelings and imagination', los: ['Articulate experience and express what is thought, felt and imagined.'], kw: 'express ideas feelings imagination creative' },
    { id: 'W2', a: 1, p: 9, t: 'Organise and structure ideas for deliberate effect', los: ['Organise and structure ideas and opinions for deliberate effect.'], kw: 'structure paragraphs organisation planning' },
    { id: 'W3', a: 1, p: 9, t: 'Range of vocabulary and sentence structures', los: ['Use a range of vocabulary and sentence structures appropriate to context.'], kw: 'vocabulary sentence structures variety sentences' },
    { id: 'W4', a: 1, p: 9, t: 'Register appropriate to context', los: ['Use register appropriate to context.'], notes: ['Demonstrate an understanding of audience, purpose and form (page 10).'], kw: 'register formal informal tone audience purpose form' },
    { id: 'W5', a: 1, p: 9, t: 'Accurate spelling, punctuation and grammar', los: ['Make accurate use of spelling, punctuation and grammar.'], kw: 'spelling punctuation grammar apostrophes commas tenses accuracy' },
    { id: 'P1Q1', a: 2, p: 11, t: 'Paper 1 Question 1: Comprehension (Text A)', los: ['Short-answer sub-questions on Text A, a narrative text of about 900 words, testing explicit and implicit meanings (16 marks; R1, R2).'], kw: 'paper 1 question 1 comprehension text a narrative' },
    { id: 'P1Q2', a: 2, p: 11, t: 'Paper 1 Question 2: Use of Language', los: ['Short-answer sub-questions on Text A about the author\'s use of language and its effect (9 marks; R4).'], kw: 'paper 1 question 2 use of language effect writers' },
    { id: 'P1Q3a', a: 2, p: 11, t: 'Paper 1 Question 3a: Summary', los: ['Write a summary of Text B (about 550–600 words) as continuous writing of no more than 150 words (20 marks: R1, R5, W2, W3).'], kw: 'summary 150 words text b continuous writing own words' },
    { id: 'P1Q3b', a: 2, p: 12, t: 'Paper 1 Question 3b: Short response', los: ['A short response showing understanding of implicit meanings and attitude in Text B (5 marks; R2).'], kw: 'short response implicit attitude text b' },
    { id: 'P2A', a: 3, p: 12, t: 'Paper 2 Section A: Directed Writing', los: ['Read one or two texts (about 400–450 words) and use, develop and evaluate the information to write a discursive, argumentative or persuasive speech, email, report, letter or article of about 250–350 words (25 marks).'], notes: ['Text types to study: email, letter, report, article, speech and summary (page 10).'], kw: 'directed writing speech email report letter article persuasive argumentative discursive' },
    { id: 'P2B', a: 3, p: 13, t: 'Paper 2 Section B: Composition', los: ['Write one composition of about 350–450 words from a choice of four: two descriptive and two narrative (25 marks).'], notes: ['Descriptive: describes a person, place or situation (including atmosphere) in detail so the reader can picture it.', 'Narrative: tells a story containing a sequence of connected events, real or imaginary.'], kw: 'composition descriptive writing narrative writing story creative' }
  ] };

  R2O.addSubject({
    id: 'english', name: 'English Language', short: 'English', icon: '📖', color: '#c2410c',
    blurb: 'Read closely, think clearly, and write so people listen.',
    syl: {
      code: '1123', name: 'Cambridge O Level English Language', years: '2027 and 2028', url: P,
      areas: ['Reading skills', 'Writing skills', 'Paper 1 Reading', 'Paper 2 Writing'],
      papers: ['Paper 1 Reading: 2 hours, 50 marks, 50%. Section A: comprehension and use of language (Text A). Section B: summary (max 150 words) and short response (Text B).', 'Paper 2 Writing: 2 hours, 50 marks, 50%. Section A: directed writing (250–350 words). Section B: one composition (350–450 words), descriptive or narrative.', 'Dictionaries must not be used.'],
      suggest: ['Is poetry on my exam?', 'How long is the summary?', 'Explain directed writing', 'Quiz me on punctuation', 'Is there a speaking test?', 'What text types do I need?', 'What should I revise first?'],
      formulaNote: '<p>English has no formulas, but it does have <b>word limits</b>: the summary is <b>no more than 150 words</b>; directed writing is about <b>250–350 words</b>; the composition is about <b>350–450 words</b>.</p>',
      offSyllabus: [
        { k: /speaking|listening|oral|talk test/, why: 'There is no speaking or listening test in O Level English Language 1123. It is assessed by two written papers: Reading and Writing.' },
        { k: /poetry|poem/, why: 'Poetry analysis is not listed for 1123. Reading texts are fiction and non-fiction prose (narrative texts, articles, essays, reviews, blogs). Poetry belongs to Literature in English.' },
        { k: /shakespeare|set text|novel study|literature/, why: 'Set texts and literature study are not part of 1123 English Language; they belong to Literature in English. 1123 uses unseen passages in the exam.' },
        { k: /coursework|portfolio/, why: '1123 has no coursework. Both components are written exams.' },
        { k: /dictionar/, why: 'Dictionaries must not be used in either paper.' }
      ]
    },
    links: (kw) => [
      ['BBC Bitesize: English Language revision', `https://www.bbc.co.uk/bitesize/search?q=${kw}`],
      ['Khan Academy: grammar', 'https://www.khanacademy.org/humanities/grammar'],
      ['Project Gutenberg: free books to read', 'https://www.gutenberg.org/']
    ]
  });

  // ================= original passages =================
  const TXT = {
    market: 'The market woke before the sun did. By five o\'clock, Amira had already stacked the mangoes into a careful pyramid, the ripest at the top where customers\' eyes would land first. Her grandfather watched from his stool, saying nothing, though his fingers drummed the edge of the table whenever she placed one too roughly. When the first buyer, a woman in a faded blue scarf, picked up a mango, squeezed it and put it back, Amira felt her stomach tighten. The woman moved on. Grandfather finally spoke: "Patience is also a fruit," he said, "but it ripens slower than these."',
    storm: 'The storm arrived like an uninvited guest who refuses to leave. Rain hammered the tin roof, and the wind prowled around the house, rattling every shutter as if searching for a way in. Inside, Daniel counted the seconds between each flash and each growl of thunder. Seven. Five. Three. His little sister pressed herself against his side, pretending she was not afraid. He pretended too.',
    bike: 'Kofi had saved for eleven months. Every coin from selling water at the bus stop went into a rusted tin under his bed. Now the bicycle stood in front of him, its red paint gleaming under the shop lights, and he found he could not speak. The shopkeeper laughed kindly. "It won\'t bite," he said. Kofi reached out and touched the handlebar as if it might disappear.'
  };

  // ================= generators =================
  bank('enExplicit', [
    { q: 'Read the passage. At what time had Amira already stacked the mangoes?', pic: passage(TXT.market), a: 'By five o\'clock', w: ['At sunrise', 'At noon', 'After the first customer'], why: 'Explicit: the answer is stated directly ("By five o\'clock").' },
    { q: 'Where did Amira put the ripest mangoes?', pic: passage(TXT.market), a: 'At the top of the pyramid', w: ['At the bottom', 'Under the table', 'In a basket by her grandfather'], why: '"the ripest at the top where customers\' eyes would land first".' },
    { q: 'What did the first buyer do with the mango?', pic: passage(TXT.market), a: 'She squeezed it and put it back', w: ['She bought it', 'She dropped it', 'She gave it to the grandfather'], why: 'Stated directly in the passage.' },
    { q: 'How long had Kofi saved for?', pic: passage(TXT.bike), a: 'Eleven months', w: ['A year', 'Eleven weeks', 'Since he was eleven'], why: '"Kofi had saved for eleven months."' },
    { q: 'How did Kofi earn the money?', pic: passage(TXT.bike), a: 'By selling water at the bus stop', w: ['By working in the bicycle shop', 'His sister gave it to him', 'By selling mangoes'], why: 'Explicitly stated.' },
    { q: 'What did Daniel count during the storm?', pic: passage(TXT.storm), a: 'The seconds between each flash and each growl of thunder', w: ['The raindrops on the roof', 'The shutters in the house', 'His sister\'s breaths'], why: 'Explicitly stated.' }
  ]);
  bank('enImplicit', [
    { q: 'Why did Amira\'s "stomach tighten" when the woman put the mango back?', pic: passage(TXT.market), a: 'She was anxious about making a sale and pleasing her grandfather', w: ['She felt sick from eating mangoes', 'She was angry with the woman', 'She was hungry'], why: 'Implicit: the writer suggests nerves without stating them.' },
    { q: 'What does the grandfather\'s drumming fingers suggest?', pic: passage(TXT.market), a: 'He disapproves when she handles the fruit roughly but chooses not to say so', w: ['He is listening to music', 'He is bored', 'He is cold'], why: 'Body language reveals an attitude he does not voice.' },
    { q: 'What does the grandfather mean by "Patience is also a fruit"?', pic: passage(TXT.market), a: 'Success takes time, so Amira should not lose heart', w: ['He wants to sell patience', 'Mangoes grow slowly', 'He is hungry'], why: 'A metaphor with an implied lesson.' },
    { q: 'What do the numbers "Seven. Five. Three." suggest?', pic: passage(TXT.storm), a: 'The storm is getting closer', w: ['Daniel is doing homework', 'The storm is moving away', 'It is three o\'clock'], why: 'Shorter gaps between lightning and thunder mean the storm is nearer.' },
    { q: 'What does "He pretended too" reveal about Daniel?', pic: passage(TXT.storm), a: 'He is also frightened but hides it to protect his sister', w: ['He is not scared at all', 'He is playing a game', 'He is annoyed with his sister'], why: 'An implied feeling and an attitude of care.' },
    { q: 'Why did Kofi "find he could not speak"?', pic: passage(TXT.bike), a: 'He was overwhelmed with emotion after waiting so long', w: ['He did not speak the language', 'He was angry about the price', 'He had a sore throat'], why: 'The long saving makes the moment emotional.' },
    { q: 'Why did Kofi touch the handlebar "as if it might disappear"?', pic: passage(TXT.bike), a: 'He could hardly believe the bicycle was finally his', w: ['The bicycle was broken', 'He was afraid of bicycles', 'The shop was closing'], why: 'The simile suggests disbelief and wonder.' }
  ]);
  bank('enLanguage', [
    { q: '"The storm arrived like an uninvited guest who refuses to leave." This is…', a: 'a simile', w: ['a metaphor', 'alliteration', 'onomatopoeia'], why: 'It compares using "like". The effect: the storm is unwelcome and lingering.' },
    { q: '"the wind prowled around the house" is an example of…', a: 'personification', w: ['a simile', 'onomatopoeia', 'hyperbole'], why: 'The wind is given an animal-like action, making it sound threatening, like a predator.' },
    { q: 'What effect does "hammered" have in "Rain hammered the tin roof"?', a: 'It suggests the rain was loud, heavy and forceful', w: ['It suggests gentle, quiet rain', 'It shows the roof was being built', 'It suggests the rain was warm'], why: 'Connotations of a hammer: loud, violent, repeated blows.' },
    { q: '"Patience is also a fruit" is…', a: 'a metaphor', w: ['a simile', 'personification', 'a rhetorical question'], why: 'It says patience IS a fruit (no "like" or "as").' },
    { q: 'The "growl of thunder" makes the thunder seem…', a: 'like a dangerous animal', w: ['soft and comforting', 'musical and happy', 'distant and harmless'], why: 'Growling suggests threat.' },
    { q: 'Which word has the most positive connotation for a smell?', a: 'aroma', w: ['stench', 'odour', 'reek'], why: 'Aroma suggests pleasant; stench and reek suggest disgust.' },
    { q: '"Buzz", "crash" and "sizzle" are examples of…', a: 'onomatopoeia', w: ['alliteration', 'similes', 'personification'], why: 'Words that sound like what they describe.' },
    { q: '"I\'ve told you a million times!" is an example of…', a: 'hyperbole (deliberate exaggeration)', w: ['understatement', 'a simile', 'a fact'], why: 'It exaggerates to show frustration.' },
    { q: 'The best way to explain a writer\'s effect is to…', a: 'quote the words, then explain what they suggest and how they make the reader feel', w: ['just name the technique', 'retell the story', 'give your opinion of the writer'], why: 'Naming a device earns little; explaining the effect earns the marks.' },
    { q: '"red paint gleaming under the shop lights" makes the bicycle seem…', a: 'new, precious and almost magical to Kofi', w: ['old and damaged', 'dangerous', 'ordinary and boring'], why: '"Gleaming" connotes shine and value.' }
  ]);
  bank('enVocab', [
    { q: 'In "a careful pyramid", "careful" suggests the stacking was done…', a: 'with attention and precision', w: ['quickly', 'angrily', 'by accident'], why: 'Use the context: she places the ripest at the top on purpose.' },
    { q: 'Choose the best meaning of "reluctant" in: "She was reluctant to leave her friends."', a: 'unwilling', w: ['eager', 'quick', 'sad to arrive'], why: 'Reluctant = not wanting to.' },
    { q: 'Choose the best meaning of "scarce" in: "Water was scarce during the drought."', a: 'in short supply', w: ['dirty', 'expensive', 'frightening'], why: 'Context clue: drought.' },
    { q: 'Choose the best meaning of "meticulous" in: "a meticulous record of every coin".', a: 'very careful and detailed', w: ['careless', 'secret', 'huge'], why: 'Every coin recorded = great care.' },
    { q: 'Choose the best meaning of "elated" in: "Elated, she ran home to share the news."', a: 'extremely happy', w: ['exhausted', 'confused', 'worried'], why: 'Running to share news suggests joy.' },
    { q: 'Choose the best meaning of "ominous" in: "an ominous silence fell".', a: 'threatening, suggesting something bad will happen', w: ['peaceful', 'loud', 'funny'], why: 'Ominous = like a bad omen.' },
    { q: 'Choose the best meaning of "frugal" in: "Living frugally, they saved enough for school fees."', a: 'spending very little', w: ['spending a lot', 'living sadly', 'living far away'], why: 'Saving money = frugal.' }
  ]);
  bank('enEvaluate', [
    { q: 'Which is a FACT?', a: 'The school has 600 students.', w: ['The school is the best in the city.', 'Everyone loves the new library.', 'Homework is a waste of time.'], why: 'A fact can be checked and proved.' },
    { q: 'Which is an OPINION?', a: 'Electric cars are the most exciting invention of our time.', w: ['Electric cars run on batteries.', 'The car was sold in 2024.', 'The battery holds 60 kWh.'], why: 'An opinion is a belief that others could disagree with.' },
    { q: 'A writer only gives arguments for one side and uses emotional words. The article is likely to be…', a: 'biased', w: ['balanced', 'neutral', 'a summary'], why: 'Bias = one-sided presentation.' },
    { q: '"Nine out of ten dentists recommend…" is mainly used to…', a: 'persuade by using statistics and expert opinion', w: ['describe a setting', 'tell a story', 'show bias against dentists'], why: 'Numbers and experts add authority.' },
    { q: 'To evaluate an argument in a text, you should…', a: 'judge how convincing each point is and whether evidence supports it', w: ['copy the strongest sentence', 'count the paragraphs', 'agree with everything'], why: 'Evaluate = judge quality and value.' }
  ]);
  bank('enSummary', [
    { q: 'The summary in Paper 1 must be…', a: 'continuous writing of no more than 150 words', w: ['bullet points of any length', 'at least 300 words', 'copied sentences from the text'], why: 'It tests selection (R5) and your own clear writing (W2, W3).' },
    { q: 'Which belongs in a summary?', a: 'The main points relevant to the question', w: ['Examples, quotations and descriptive detail', 'Your own opinions', 'Everything in the text'], why: '"Summarise: select and present the main points, without detail."' },
    { q: 'Why should you use your own words in a summary?', a: 'It shows understanding and is usually more concise', w: ['Copying is always marked wrong', 'It makes it longer', 'The examiner wants new ideas'], why: 'Rephrase key points; keep technical terms that have no simpler word.' },
    { q: 'Which shortens "In spite of the fact that it was raining heavily"?', a: 'Despite the heavy rain', w: ['Because it rained', 'Although rain', 'It was raining heavily, in spite of that'], why: 'Concise phrasing saves words for more points.' },
    { q: 'A good first step for a summary is to…', a: 'underline only the points that answer the specific question', w: ['start writing immediately', 'count every word in the text', 'write an introduction about the writer'], why: 'Read the question carefully: it tells you what to select.' },
    { q: 'Which joins two points most concisely?', a: 'Volunteers clean beaches and plant mangroves.', w: ['Volunteers clean beaches. Also, as well as that, they plant mangroves too.', 'One thing volunteers do is cleaning beaches and another thing that they do is planting mangroves.', 'There are volunteers. They clean. Beaches. Mangroves are planted.'], why: 'Combine related points in one sentence.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'english', id: 'en-read', name: 'Reading', icon: '🔍', color: '#c2410c', book: ['Writing Guide with Handbook', 'https://openstax.org/details/books/writing-guide'],
    blurb: 'Paper 1: finding information, reading between the lines, how writers create effects, evaluating ideas, and writing a summary.',
    lessons: [
      { id: 'en-explicit', title: 'Finding information (explicit meaning)', obj: ['R1', 'P1Q1'], kw: 'comprehension explicit information retrieval', learn: [],
        hook: 'The easiest marks on the paper, if you know where to look.',
        scenes: [
          { say: idea('<b>Explicit</b> means <b>stated directly</b> in the text. The answer is sitting there in the words. Your job is to find the exact part, then answer the question <b>precisely</b>, usually briefly and often in your own words.') },
          { say: 'Read this passage.', pic: passage(TXT.market) },
          { say: 'The method: 1) underline the key word in the question, 2) scan for it (or a synonym), 3) read around it, 4) answer only what was asked.',
            ask: T('Who was watching Amira?', ['Her grandfather', 'The woman in the blue scarf', 'Her mother', 'Nobody'], 0, '"Her grandfather watched from his stool".') },
          { say: 'Precision matters: if the question asks "when", give a time; "why", give a reason. Don\'t copy whole paragraphs: lift only the relevant part, or rephrase it.' }
        ],
        keys: ['Explicit = directly stated.', 'Key word → scan → read around → answer exactly what is asked.', 'Brief, precise answers; own words where asked.'],
        gens: ['enExplicit', 'enVocab'], easy: ['enExplicit'] },
      { id: 'en-implicit', title: 'Reading between the lines (implicit meaning)', obj: ['R2', 'P1Q1', 'P1Q3b'], kw: 'inference implicit meaning attitude', learn: [],
        hook: 'Writers rarely say "she was nervous". They show you, and trust you to work it out.',
        scenes: [
          { say: idea('<b>Implicit</b> meaning is <b>suggested, not stated</b>. You are a detective: <b>clues</b> in the text (actions, words, body language, details) + <b>what you know about people</b> = a <b>conclusion</b> about feelings, attitudes or reasons.') },
          { say: 'Clue → conclusion. Pick a clue from the passage.', anim: S.X([{ k: 'c', label: 'Clue', min: 0, max: 3, v: 0, fmt: i => ['fingers drummed', 'stomach tighten', 'saying nothing', '"Patience is also a fruit"'][i] }], v => `${passage(TXT.market)}<p class="center bigq">🔎 "${['his fingers drummed the edge of the table', 'Amira felt her stomach tighten', 'watched … saying nothing', 'Patience is also a fruit'][v.c]}"</p><p class="center">→ ${['He is <b>impatient or disapproving</b>, but holds it in.', 'Amira is <b>anxious</b>: she badly wants to sell.', 'He is <b>observing and testing</b> her, letting her learn.', 'He is <b>encouraging</b> her: success takes time.'][v.c]}</p>`) },
          { say: 'Back every inference with evidence: "<b>I can tell that</b> … <b>because</b> the text says …".',
            ask: T('In the storm story, "His little sister pressed herself against his side, pretending she was not afraid." She is…', ['frightened but trying to be brave', 'calm and relaxed', 'angry with Daniel'], 0, 'The action shows fear; "pretending" shows she hides it.') },
          { say: 'Paper 1 Question 3b asks for a short response about implicit meanings and attitudes in Text B. Same skill, applied to non-fiction: what does the writer <b>feel</b> or <b>believe</b>, and how can you tell?' }
        ],
        keys: ['Implicit = suggested; infer from clues.', 'Clue + knowledge → conclusion.', 'Always support with evidence from the text.', 'Attitudes: what the writer or character feels/believes.'],
        gens: ['enImplicit'], easy: ['enImplicit'] },
      { id: 'en-language', title: 'How writers create effects', obj: ['R4', 'P1Q2'], kw: 'use of language effects imagery simile metaphor personification connotation', learn: [],
        hook: 'One word can change everything. Here\'s how to explain why.',
        scenes: [
          { say: idea('Writers choose words for their <b>connotations</b>: the feelings and pictures that come with them. "Walked", "strolled" and "stomped" all mean moving on foot, but each makes you feel something different. Explaining <b>what the words make you see and feel</b> is what earns marks.') },
          { say: 'Swap the verb. Watch the meaning shift.', anim: S.X([{ k: 'w', label: 'Verb', min: 0, max: 4, v: 0, fmt: i => ['fell', 'pattered', 'hammered', 'drizzled', 'lashed'][i] }], v => `<p class="center bigq">The rain <b>${['fell', 'pattered', 'hammered', 'drizzled', 'lashed'][v.w]}</b> on the roof.</p><p class="center">${['Neutral: just information.', 'Light and gentle, even cosy.', 'Loud, heavy, forceful, maybe frightening.', 'Soft, fine and grey: a dull mood.', 'Violent and painful, like a whip: aggressive.'][v.w]}</p>`) },
          { say: 'Devices to recognise:', pic: '<ul><li><b>Simile</b>: compares using like/as ("like an uninvited guest")</li><li><b>Metaphor</b>: says something IS something else ("Patience is also a fruit")</li><li><b>Personification</b>: human/animal actions for things ("the wind prowled")</li><li><b>Onomatopoeia</b>: sound words (crash, hiss)</li><li><b>Alliteration</b>: repeated first sounds</li><li><b>Hyperbole</b>: deliberate exaggeration</li></ul>',
            ask: T('"The wind prowled around the house." What is the EFFECT?', ['The wind seems like a predator hunting, which feels threatening', 'It shows the wind was weak', 'It is just a description of weather'], 0, 'Name it, quote it, then explain the effect.') },
          { say: 'A strong answer: <b>quote</b> the words → <b>explain</b> what they literally suggest → say how they make the <b>reader feel</b> or what <b>mood</b> they create.' }
        ],
        keys: ['Connotations: the feelings words carry.', 'Simile, metaphor, personification, onomatopoeia, alliteration, hyperbole.', 'Quote → meaning → effect on the reader. Effect matters more than naming the device.'],
        gens: ['enLanguage', 'enVocab'], easy: ['enLanguage'] },
      { id: 'en-evaluate', title: 'Facts, opinions and bias', obj: ['R3'], kw: 'facts opinions bias evaluate arguments evidence', learn: [],
        hook: 'Not everything written confidently is true.',
        scenes: [
          { say: idea('A <b>fact</b> can be checked; an <b>opinion</b> is a belief. Writers mix them to <b>persuade</b>. Reading critically means asking: what is the evidence? Is this one-sided (<b>biased</b>)? How convincing is it?') },
          { say: 'Sort each sentence.', anim: S.X([{ k: 's', label: 'Sentence', min: 0, max: 4, v: 0, fmt: i => String(i + 1) }], v => { const d = [['The library opened in 2019.', 'FACT: can be checked.'], ['The library is the most beautiful building in town.', 'OPINION: "most beautiful" is a judgement.'], ['About 300 students visit it each day.', 'FACT (if the figure is accurate).'], ['Anyone who skips it is wasting their education.', 'OPINION, and biased: an exaggerated judgement.'], ['Studies show reading daily improves vocabulary.', 'FACT presented as evidence, but ask: which studies?']][v.s]; return `<p class="center bigq">"${d[0]}"</p><p class="center">${d[1]}</p>`; }) },
          { say: 'In directed writing (Paper 2) you must <b>evaluate</b> the ideas in the texts, not just copy them: which points are strongest, which are weak or one-sided, and why.',
            ask: T('An article lists only benefits of a new mall and calls opponents "selfish". It is…', ['biased', 'balanced', 'purely factual'], 0, 'One-sided and emotionally loaded.') }
        ],
        keys: ['Fact (checkable) vs opinion (belief).', 'Bias: one-sided, loaded language.', 'Evaluate: judge how strong and well-supported ideas are.'],
        gens: ['enEvaluate'], easy: ['enEvaluate'] },
      { id: 'en-summary', title: 'Writing a summary', obj: ['R5', 'P1Q3a'], kw: 'summary writing 150 words select points own words concise', learn: [],
        hook: 'Say more with fewer words: a skill you\'ll use for life.',
        scenes: [
          { say: idea('A summary keeps the <b>main points</b> that answer the question and <b>drops everything else</b>: examples, quotes, descriptions, repetition. Then write them as <b>connected sentences</b> in your own words, in <b>no more than 150 words</b>.') },
          { say: 'Trim this sentence. Watch the word count.', anim: S.X([{ k: 'v', label: 'Version', min: 0, max: 3, v: 0, fmt: i => ['original', 'remove padding', 'remove example', 'own words'][i] }], v => { const vs = ['It is a very important and well-known fact that, in many coastal towns around the world, such as the ones in Indonesia and Kenya, volunteers regularly give up their free time at weekends in order to clean beaches.', 'In many coastal towns, volunteers regularly give up their free time at weekends to clean beaches.', 'In many coastal towns, volunteers give up their weekends to clean beaches.', 'Volunteers clean beaches at weekends.']; return `<p class="center">${vs[v.v]}</p><p class="center bigq">${wc(vs[v.v])} words</p>`; }) },
          { say: 'The method:', pic: '<ol><li>Read the question: what exactly must you summarise?</li><li>Underline only matching points (usually 10–15).</li><li>Rewrite each point briefly in your own words.</li><li>Combine related points; use linking words.</li><li>Check: 150 words or fewer, continuous prose, no opinions.</li></ol>',
            ask: T('Which should you LEAVE OUT of a summary?', ['A vivid example used to illustrate a point', 'A main point that answers the question', 'A key fact the question asks for'], 0, 'Examples illustrate; they are not main points.') }
        ],
        keys: ['Select only relevant main points.', 'Own words, concise, connected prose.', 'No examples, quotes, opinions or introductions.', '150 words maximum.'],
        gens: ['enSummary'], easy: ['enSummary'] }
    ] });
})();
