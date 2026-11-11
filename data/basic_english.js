// Basic English: the English every lesson needs, in small, simple steps.
// Students pass the English check (R2O.ENGTEST) to open the O Level subjects they chose.
// Not a Cambridge syllabus: it is the bridge into one. Words are short and sentences are simple on purpose.
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { pick } = K;
  const idea = S.idea, X = S.X, bank = S.bank;
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const big = t => `<p class="center bigq">${t}</p>`;
  const pics = (...items) => `<div class="wordpics">${items.map(([e, w]) => `<span><b>${e}</b>${w}</span>`).join('')}</div>`;

  R2O.SYLS.basic = { objectives: [
    { id: 'B1', a: 0, p: 1, t: 'Everyday and school words', los: ['Know common words for school, home, the body, time and numbers.'], kw: 'vocabulary words everyday school' },
    { id: 'B2', a: 0, p: 1, t: 'Building a sentence', los: ['Write a sentence: who + does what. Start with a capital letter, end with a full stop.'], kw: 'sentence capital letter full stop subject verb' },
    { id: 'B3', a: 0, p: 1, t: 'am, is, are, have, has', los: ['Use am / is / are and have / has correctly.'], kw: 'am is are have has to be' },
    { id: 'B4', a: 0, p: 1, t: 'Now and before (present and past)', los: ['Use the present simple (she plays) and the past simple (she played, she went).'], kw: 'present tense past tense verbs' },
    { id: 'B5', a: 0, p: 1, t: 'One or many; a, an, the', los: ['Make plurals and use a, an and the.'], kw: 'plural articles a an the' },
    { id: 'B6', a: 0, p: 1, t: 'Where things are', los: ['Use in, on, under, next to, between, above and below.'], kw: 'prepositions place in on under' },
    { id: 'B7', a: 1, p: 1, t: 'Asking questions', los: ['Know who, what, where, when, why, how and how many.'], kw: 'question words who what where when why how' },
    { id: 'B8', a: 1, p: 1, t: 'Joining ideas', los: ['Join ideas with and, but, because, so, first, then.'], kw: 'linking words connectives because so but' },
    { id: 'B9', a: 1, p: 1, t: 'Words in exam questions', los: ['Know what state, describe, explain, calculate, compare, suggest and define ask you to do.'], kw: 'command words exam state explain describe calculate' },
    { id: 'B10', a: 1, p: 1, t: 'Reading short texts', los: ['Read a short text and find the answer.'], kw: 'reading comprehension short text' }
  ], areas: ['Words and sentences', 'Using English to learn'] };

  R2O.addSubject({
    id: 'basic', name: 'Basic English', short: 'Basic English', icon: '🔤', color: '#7c3aed',
    blurb: 'The English you need for every lesson, in tiny steps.',
    syl: {
      code: 'Basic', name: 'Basic English for O Level learners', years: 'any', url: 'https://www.cambridgeenglish.org/learning-english/',
      foot: 'Basic English is the bridge into the O Level subjects. Pass the English check (14 out of 20) to open the subjects you chose. Free practice: <a href="https://learnenglishteens.britishcouncil.org/" target="_blank" rel="noopener">British Council LearnEnglish Teens ↗</a>.',
      suggest: ['What does "explain" mean?', 'How do I pass the English check?'],
      formulaNote: '<p>Basic English has no formulas. Learn the question words and the exam command words: they appear in every subject.</p>'
    },
    links: kw => [
      ['British Council LearnEnglish Teens: grammar and vocabulary', 'https://learnenglishteens.britishcouncil.org/'],
      ['BBC Learning English', 'https://www.bbc.co.uk/learningenglish/'],
      ['Khan Academy: grammar', 'https://www.khanacademy.org/humanities/grammar']
    ]
  });
  // Basic English is first in the subject bar
  R2O.SUBJECTS.unshift(R2O.SUBJECTS.pop());

  // ================= question banks =================
  bank('beWords', [
    { q: 'What is this? 📚', a: 'books', w: ['pens', 'chairs', 'shoes'] },
    { q: 'What is this? ✏️', a: 'a pencil', w: ['a ruler', 'a bag', 'a desk'] },
    { q: 'What is this? 🕐', a: 'a clock', w: ['a phone', 'a cup', 'a door'] },
    { q: 'What is this? 🏫', a: 'a school', w: ['a hospital', 'a shop', 'a farm'] },
    { q: 'What is the opposite of <b>big</b>?', a: 'small', w: ['tall', 'fast', 'long'] },
    { q: 'What is the opposite of <b>hot</b>?', a: 'cold', w: ['warm', 'wet', 'dark'] },
    { q: 'What is the opposite of <b>open</b>?', a: 'closed', w: ['empty', 'full', 'broken'] },
    { q: 'What is the opposite of <b>increase</b> (go up)?', a: 'decrease (go down)', w: ['repeat', 'stay', 'begin'] },
    { q: 'Which day comes after <b>Monday</b>?', a: 'Tuesday', w: ['Sunday', 'Thursday', 'Friday'] },
    { q: 'How do you write <b>15</b> in words?', a: 'fifteen', w: ['fifty', 'five', 'fiveteen'] },
    { q: 'You see with your…', a: 'eyes 👀', w: ['ears 👂', 'hands ✋', 'feet 🦶'] },
    { q: 'A <b>teacher</b> works in a…', a: 'school', w: ['bank', 'farm', 'kitchen'] }
  ]);
  bank('beSentence', [
    { q: 'Which is a correct sentence?', a: 'The dog runs fast.', w: ['the dog runs fast', 'The dog runs fast', 'the dog runs fast.'], why: 'A capital letter at the start, a full stop at the end.' },
    { q: 'Which is a correct sentence?', a: 'My sister reads a book.', w: ['my sister reads a book.', 'My sister reads a book', 'my sister reads a book'], why: 'Capital letter at the start. Full stop at the end.' },
    { q: 'Which word order is right?', a: 'Ali plays football.', w: ['Football plays Ali.', 'Plays Ali football.', 'Ali football plays.'], why: 'Who (Ali) + does what (plays) + what (football).' },
    { q: 'Which word order is right?', a: 'We eat rice.', w: ['Rice we eat.', 'Eat we rice.', 'We rice eat.'], why: 'Who + does what + what.' },
    { q: 'In "Sara cooks dinner", who does the action?', a: 'Sara', w: ['cooks', 'dinner', 'nobody'], why: 'Sara is the "who". She does the cooking.' },
    { q: 'In "The boy kicks the ball", what is the action word (verb)?', a: 'kicks', w: ['boy', 'ball', 'the'], why: 'The verb is what someone does.' },
    { q: 'Which is a full sentence?', a: 'The sun is hot.', w: ['The hot sun.', 'Is hot.', 'The sun.'], why: 'A sentence needs a who/what and a verb.' },
    { q: 'Which word always needs a capital letter?', a: 'I (when it means me)', w: ['and', 'the', 'is'], why: 'Always write "I" as a capital: "Today I am happy."' },
    { q: 'Which word needs a capital letter?', a: 'Pakistan', w: ['country', 'city', 'river'], why: 'Names of people, places, days and months start with a capital letter.' },
    { q: 'What goes at the end of a question?', a: '?', w: ['.', ',', '!'], why: '"Where is my bag?"' },
    { q: 'Which word order is right?', a: 'The plant needs water.', w: ['Water needs the plant.', 'The plant water needs.', 'Needs the plant water.'], why: 'Who/what (the plant) + verb (needs) + what (water).' }
  ]);
  bank('beBe', [
    { q: 'I ___ a student.', a: 'am', w: ['is', 'are', 'be'], why: 'I am.' },
    { q: 'She ___ my friend.', a: 'is', w: ['am', 'are', 'be'], why: 'He / she / it is.' },
    { q: 'They ___ in the classroom.', a: 'are', w: ['is', 'am', 'be'], why: 'We / you / they are.' },
    { q: 'The water ___ cold.', a: 'is', w: ['are', 'am', 'have'], why: 'One thing (the water) → is.' },
    { q: 'The books ___ on the table.', a: 'are', w: ['is', 'am', 'has'], why: 'Many things (books) → are.' },
    { q: 'We ___ ready.', a: 'are', w: ['is', 'am', 'has'], why: 'We are.' },
    { q: 'I ___ two brothers.', a: 'have', w: ['has', 'is', 'am'], why: 'I / you / we / they have.' },
    { q: 'He ___ a red bag.', a: 'has', w: ['have', 'is', 'are'], why: 'He / she / it has.' },
    { q: 'A triangle ___ three sides.', a: 'has', w: ['have', 'are', 'am'], why: 'One thing (a triangle) → has.' },
    { q: 'Plants ___ green leaves.', a: 'have', w: ['has', 'is', 'am'], why: 'Many things (plants) → have.' },
    { q: 'It ___ raining today.', a: 'is', w: ['are', 'am', 'have'], why: 'It is.' }
  ]);
  bank('bePresent', [
    { q: 'Every day, she ___ to school.', a: 'walks', w: ['walk', 'walking', 'walked'], why: 'He / she / it → add -s: she walks.' },
    { q: 'I ___ tea every morning.', a: 'drink', w: ['drinks', 'drinking', 'drunk'], why: 'I / you / we / they → no -s: I drink.' },
    { q: 'Water ___ at 100 °C.', a: 'boils', w: ['boil', 'boiling', 'boiled'], why: 'A fact that is always true uses the present: water boils.' },
    { q: 'The Earth ___ around the Sun.', a: 'moves', w: ['move', 'moving', 'moved'], why: 'One thing (the Earth) → moves.' },
    { q: 'My parents ___ on a farm.', a: 'work', w: ['works', 'working', 'worked'], why: 'Many people (they) → no -s.' },
    { q: 'He ___ his homework after dinner.', a: 'does', w: ['do', 'doing', 'dos'], why: 'do → he does.' },
    { q: 'She ___ to the market on Fridays.', a: 'goes', w: ['go', 'gos', 'going'], why: 'go → she goes.' },
    { q: 'Which sentence is correct?', a: 'He likes mangoes.', w: ['He like mangoes.', 'He liking mangoes.', 'He likes mango is.'], why: 'He → likes (add -s).' },
    { q: 'Which sentence is correct?', a: 'They play cricket.', w: ['They plays cricket.', 'They playing cricket.', 'They is play cricket.'], why: 'They → play (no -s).' },
    { q: 'Right now, I ___ a book. (it is happening now)', a: 'am reading', w: ['reads', 'is reading', 'reading'], why: 'Happening now: am / is / are + -ing.' },
    { q: 'Look! The baby ___ .', a: 'is sleeping', w: ['are sleeping', 'sleep', 'sleeping'], why: 'Happening now: the baby is sleeping.' }
  ]);
  bank('bePast', [
    { q: 'Yesterday I ___ football.', a: 'played', w: ['play', 'plays', 'playing'], why: 'Past: add -ed. play → played.' },
    { q: 'Last year we ___ in Lahore.', a: 'lived', w: ['live', 'lives', 'living'], why: 'live → lived.' },
    { q: 'Yesterday she ___ to the shop.', a: 'went', w: ['goed', 'go', 'goes'], why: 'go is special: go → went.' },
    { q: 'Last night I ___ rice for dinner.', a: 'ate', w: ['eated', 'eat', 'eats'], why: 'eat → ate.' },
    { q: 'He ___ a letter to his friend last week.', a: 'wrote', w: ['writed', 'write', 'writes'], why: 'write → wrote.' },
    { q: 'They ___ a big bird this morning.', a: 'saw', w: ['seed', 'see', 'sees'], why: 'see → saw.' },
    { q: 'The war ___ in 1945.', a: 'ended', w: ['ends', 'end', 'ending'], why: 'History happened in the past: end → ended.' },
    { q: 'I ___ my book at home yesterday.', a: 'left', w: ['leaved', 'leave', 'leaves'], why: 'leave → left.' },
    { q: 'Which word tells you it is the past?', a: 'yesterday', w: ['tomorrow', 'now', 'every day'], why: 'Yesterday, last week, in 1990, ago → past.' },
    { q: 'What is the past of "is"?', a: 'was', w: ['were', 'be', 'has'], why: 'I / he / she / it was. We / you / they were.' },
    { q: 'They ___ very tired after the match.', a: 'were', w: ['was', 'is', 'be'], why: 'They → were.' }
  ]);
  bank('bePlural', [
    { q: 'One cat, two ___.', a: 'cats', w: ['cat', 'cates', 'caties'], why: 'Most words: add -s.' },
    { q: 'One box, three ___.', a: 'boxes', w: ['boxs', 'box', 'boxies'], why: 'Words ending in x, s, sh, ch: add -es.' },
    { q: 'One baby, two ___.', a: 'babies', w: ['babys', 'babyes', 'baby'], why: 'Consonant + y → change y to -ies.' },
    { q: 'One child, many ___.', a: 'children', w: ['childs', 'childes', 'childrens'], why: 'Special plural: child → children.' },
    { q: 'One man, two ___.', a: 'men', w: ['mans', 'mens', 'manes'], why: 'Special plural: man → men, woman → women.' },
    { q: 'One leaf, many ___.', a: 'leaves', w: ['leafs', 'leafes', 'leaf'], why: 'leaf → leaves, knife → knives.' },
    { q: 'I have ___ apple.', a: 'an', w: ['a', 'the', 'two'], why: 'Use "an" before a vowel sound (a, e, i, o, u): an apple.' },
    { q: 'She has ___ dog.', a: 'a', w: ['an', 'many', 'two'], why: 'Use "a" before other sounds: a dog.' },
    { q: 'He waited for ___ hour.', a: 'an', w: ['a', 'two', 'many'], why: '"hour" starts with a vowel sound (our), so: an hour.' },
    { q: '___ Sun is very hot.', a: 'The', w: ['A', 'An', 'Two'], why: 'There is only one Sun: use "the".' },
    { q: 'One tooth, many ___.', a: 'teeth', w: ['tooths', 'toothes', 'teeths'], why: 'Special plural: tooth → teeth, foot → feet.' }
  ]);
  bank('bePlace', [
    { q: 'The cat is ___ the box. 📦🐱 (the cat is inside)', a: 'in', w: ['on', 'under', 'next to'], why: 'Inside → in.' },
    { q: 'The book is ___ the table. (on the top)', a: 'on', w: ['in', 'under', 'between'], why: 'On the top → on.' },
    { q: 'The shoes are ___ the bed. (below it, on the floor)', a: 'under', w: ['on', 'above', 'in'], why: 'Below something → under.' },
    { q: 'The school is ___ the bank and the shop. 🏦🏫🏪', a: 'between', w: ['under', 'in', 'on'], why: 'In the middle of two things → between.' },
    { q: 'The bird flies ___ the trees. (higher than the trees)', a: 'above', w: ['under', 'in', 'between'], why: 'Higher than → above.' },
    { q: 'Ali sits ___ Sara. (at her side)', a: 'next to', w: ['under', 'in', 'above'], why: 'At the side → next to (beside).' },
    { q: 'The fish lives ___ the water.', a: 'in', w: ['on', 'above', 'between'], why: 'Inside the water → in.' },
    { q: 'The picture is ___ the wall.', a: 'on', w: ['in', 'under', 'between'], why: 'Touching a surface → on.' },
    { q: 'Roots grow ___ the ground.', a: 'below', w: ['above', 'on', 'between'], why: 'Lower than the ground → below (under).' },
    { q: 'School starts ___ 8 o\'clock.', a: 'at', w: ['in', 'on', 'under'], why: 'Times: at 8 o\'clock. Days: on Monday. Months and years: in June, in 2027.' },
    { q: 'My exam is ___ June.', a: 'in', w: ['at', 'on', 'under'], why: 'Months and years: in June.' }
  ]);
  bank('beQuestion', [
    { q: '___ is your name? — My name is Hira.', a: 'What', w: ['Where', 'When', 'Who'], why: 'What → a thing or an idea.' },
    { q: '___ do you live? — In Karachi.', a: 'Where', w: ['When', 'Why', 'Who'], why: 'Where → a place.' },
    { q: '___ is your exam? — In June.', a: 'When', w: ['Where', 'Who', 'What'], why: 'When → a time.' },
    { q: '___ is your teacher? — Mr Khan.', a: 'Who', w: ['What', 'Where', 'How'], why: 'Who → a person.' },
    { q: '___ are you late? — Because the bus was slow.', a: 'Why', w: ['When', 'Where', 'Who'], why: 'Why → a reason. The answer often starts with "because".' },
    { q: '___ do you go to school? — By bus.', a: 'How', w: ['Why', 'Who', 'When'], why: 'How → the way something happens.' },
    { q: '___ brothers do you have? — Three.', a: 'How many', w: ['How much', 'What time', 'Where'], why: 'How many → a number of things you can count.' },
    { q: 'A question asks "Why do plants need light?" Your answer should give…', a: 'a reason', w: ['a place', 'a time', 'a name'], why: 'Why → give a reason: "Because…"' },
    { q: 'A question asks "Where are the lungs?" Your answer should give…', a: 'a place', w: ['a reason', 'a time', 'a number'], why: 'Where → a place: "In the chest."' },
    { q: 'A question asks "When did the war start?" Your answer should give…', a: 'a time or date', w: ['a reason', 'a place', 'a person'], why: 'When → a time: "In 1914."' },
    { q: 'Which is a question?', a: 'Where is the library?', w: ['The library is there.', 'Go to the library.', 'I like the library.'], why: 'Questions often start with a question word and end with "?".' }
  ]);
  bank('beLink', [
    { q: 'I was hungry, ___ I ate some bread.', a: 'so', w: ['but', 'because', 'or'], why: 'so → what happened next (a result).' },
    { q: 'I ate some bread ___ I was hungry.', a: 'because', w: ['so', 'but', 'or'], why: 'because → the reason.' },
    { q: 'It was raining, ___ we played outside.', a: 'but', w: ['so', 'because', 'and'], why: 'but → something different or surprising.' },
    { q: 'I like maths ___ science.', a: 'and', w: ['but', 'because', 'so'], why: 'and → adds another thing.' },
    { q: 'Do you want tea ___ water?', a: 'or', w: ['and', 'because', 'so'], why: 'or → a choice.' },
    { q: '___, heat the water. Then add the salt.', a: 'First', w: ['Because', 'But', 'So'], why: 'First, then, next, finally → put steps in order.' },
    { q: 'Plants grow towards light ___ they need it for photosynthesis.', a: 'because', w: ['but', 'or', 'so'], why: 'because → gives the reason. This is how you "explain".' },
    { q: 'The metal was heated, ___ it expanded (got bigger).', a: 'so', w: ['but', 'or', 'because'], why: 'so → the result.' },
    { q: 'Which word gives a <b>reason</b>?', a: 'because', w: ['and', 'or', 'then'], why: '"because" answers "why?"' },
    { q: 'He studied hard. ___, he passed the exam.', a: 'As a result', w: ['However', 'For example', 'First'], why: 'As a result = so.' },
    { q: 'The plan was good. ___, it cost too much money.', a: 'However', w: ['Because', 'So', 'For example'], why: 'However = but (something different).' }
  ]);
  bank('beCommand', [
    { q: 'An exam question says <b>State</b>. You should…', a: 'give a short answer, no reason needed', w: ['write a long essay', 'draw a graph', 'give reasons with "because"'], why: 'State = say it simply. Example: "State the unit of force." → newton.' },
    { q: 'An exam question says <b>Explain</b>. You should…', a: 'give reasons: say why or how, using "because" or "so"', w: ['just give one word', 'copy the question', 'draw a picture only'], why: 'Explain = why or how. Use "because…", "this means that…".' },
    { q: 'An exam question says <b>Describe</b>. You should…', a: 'say what it is like or what happens, step by step', w: ['give only a number', 'say if you agree', 'write one word'], why: 'Describe = what it looks like, or what happens.' },
    { q: 'An exam question says <b>Calculate</b>. You should…', a: 'work out a number and show your working', w: ['write a story', 'give your opinion', 'draw a map'], why: 'Calculate = do the maths, show the steps, give the unit.' },
    { q: 'An exam question says <b>Compare</b>. You should…', a: 'say how two things are the same and how they are different', w: ['describe only one thing', 'give one number', 'copy the text'], why: 'Compare → use words like "both", "but", "whereas", "more than".' },
    { q: 'An exam question says <b>Suggest</b>. You should…', a: 'give a sensible idea, using what you know', w: ['copy the answer from the text', 'leave it blank', 'give the exact definition'], why: 'Suggest = there may be more than one good answer.' },
    { q: 'An exam question says <b>Define</b>. You should…', a: 'give the exact meaning of the word', w: ['give an example only', 'draw a graph', 'say if you like it'], why: 'Define "density" → mass per unit volume.' },
    { q: 'An exam question says <b>Name</b> or <b>Identify</b>. You should…', a: 'give the name or pick it out, in a word or two', w: ['write a paragraph of reasons', 'calculate a number', 'draw a table'], why: 'Short answer, like "State".' },
    { q: '"Explain why ice floats." Which answer explains?', a: 'Ice floats because it is less dense than water.', w: ['Ice floats.', 'Ice is cold.', 'Water.'], why: 'An explanation gives a reason: "because…".' },
    { q: '"Describe the shape of the graph." Which answer describes?', a: 'The line goes up steeply, then it becomes flat.', w: ['Because it is a graph.', 'Graph.', 'I like graphs.'], why: 'Describe = say what you see.' },
    { q: 'A question gives <b>[3]</b> marks. This usually means…', a: 'you should make about three points', w: ['you have 3 minutes', 'write three words', 'it is question 3'], why: 'The marks tell you how much to write.' }
  ]);
  const P1 = 'Hamza lives in a small village. Every morning he wakes up at six o\'clock. He helps his father feed the goats, then he walks to school. The walk takes forty minutes. Hamza likes science best because he wants to be a doctor.';
  const P2 = 'Water is very important for living things. Plants take in water through their roots. Animals drink water. When water is heated, it turns into a gas called steam. When it is very cold, water turns into ice.';
  const P3 = 'Last year, Nusrat saved money to buy a bicycle. She sold vegetables at the market every Saturday. After ten months, she had enough money. Now she rides her bicycle to school, so she is never late.';
  const box = t => `<div class="passage">${t}</div>`;
  bank('beRead', [
    { q: 'What time does Hamza wake up?', pic: box(P1), a: 'six o\'clock', w: ['seven o\'clock', 'forty minutes', 'at night'] },
    { q: 'How does Hamza get to school?', pic: box(P1), a: 'He walks.', w: ['By bus.', 'By bicycle.', 'His father drives him.'] },
    { q: 'Why does Hamza like science?', pic: box(P1), a: 'He wants to be a doctor.', w: ['His father is a teacher.', 'It is easy.', 'He has goats.'], why: 'Look for "because": "because he wants to be a doctor".' },
    { q: 'What does Hamza do before school?', pic: box(P1), a: 'He helps feed the goats.', w: ['He plays football.', 'He reads a book.', 'He cooks breakfast.'] },
    { q: 'How do plants take in water?', pic: box(P2), a: 'Through their roots.', w: ['Through their leaves.', 'They drink it.', 'As steam.'] },
    { q: 'What is steam?', pic: box(P2), a: 'Water as a gas.', w: ['Very cold water.', 'Ice.', 'A plant.'] },
    { q: 'What happens to water when it is very cold?', pic: box(P2), a: 'It turns into ice.', w: ['It turns into steam.', 'It disappears.', 'It gets hotter.'] },
    { q: 'What did Nusrat want to buy?', pic: box(P3), a: 'A bicycle.', w: ['Vegetables.', 'A book.', 'A bus ticket.'] },
    { q: 'How did Nusrat get the money?', pic: box(P3), a: 'She sold vegetables at the market.', w: ['Her father gave it to her.', 'She found it.', 'She worked at a school.'] },
    { q: 'How long did Nusrat save for?', pic: box(P3), a: 'Ten months.', w: ['One Saturday.', 'Ten years.', 'One week.'] },
    { q: 'Why is Nusrat never late now?', pic: box(P3), a: 'She rides her bicycle to school.', w: ['She wakes up early.', 'The market is near.', 'Her school starts late.'], why: '"so she is never late" gives the result.' }
  ]);
  R2O.ENGTEST = ['beWords', 'beSentence', 'beBe', 'bePresent', 'bePast', 'bePlural', 'bePlace', 'beQuestion', 'beLink', 'beCommand', 'beRead'];

  // ================= lessons =================
  const WHO = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
  const placeSVG = p => { // a ball in different places around a box
    const pos = [[150, 112, 'in'], [150, 52, 'on'], [150, 168, 'under'], [228, 112, 'next to'], [150, 20, 'above']][p];
    return S.svg(300, 200, `<rect x="100" y="70" width="100" height="84" rx="6" fill="var(--surface2)" stroke="var(--brand)" stroke-width="3"${p === 0 ? ' fill-opacity=".5"' : ''}/>${p === 2 ? '<line x1="60" y1="190" x2="240" y2="190" stroke="var(--muted)" stroke-width="3"/>' : ''}<circle cx="${pos[0]}" cy="${pos[1]}" r="16" fill="var(--c4)"/><text x="150" y="${p === 4 ? 196 : 196}" class="lbl" text-anchor="middle"></text>`, 300) + big(`The ball is <b>${pos[2]}</b> the box.`);
  };
  R2O.addModule({ subject: 'basic', id: 'be-words', name: 'Words and sentences', icon: '🧱', color: '#7c3aed',
    blurb: 'Words you need every day, and how to put them into sentences.',
    lessons: [
      { id: 'be-words', title: 'Words for school and every day', obj: ['B1'], kw: 'everyday words school words', learn: [], icon: '🏫',
        hook: 'Every lesson uses the same small words again and again. Learn them once, use them everywhere.',
        scenes: [
          { say: idea('Words are names for things. Look at the picture and say the word. Tap 🔊 to hear it.'), pic: pics(['📚', 'book'], ['✏️', 'pencil'], ['📏', 'ruler'], ['🎒', 'bag'], ['🪑', 'chair'], ['🕐', 'clock']) },
          { say: 'Some words are opposites.', pic: pics(['🐘', 'big'], ['🐭', 'small'], ['🔥', 'hot'], ['🧊', 'cold'], ['⬆️', 'up / increase'], ['⬇️', 'down / decrease']),
            ask: T('What is the opposite of <b>up</b>?', ['down', 'big', 'hot'], 0, '"Increase" means go up. "Decrease" means go down. You will see these in maths and science.') },
          { say: 'Days of the week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Months: January, February, March, April, May, June, July, August, September, October, November, December.',
            ask: T('O Level exams are in June and…', ['November', 'Sunday', 'morning'], 0, 'June and November are months.') }
        ],
        keys: ['Say the word for each picture.', 'Opposites: big/small, hot/cold, increase/decrease.', 'Days and months start with a capital letter.'],
        gens: ['beWords'], easy: ['beWords'] },
      { id: 'be-sentence', title: 'Making a sentence', obj: ['B2'], kw: 'sentence word order capital full stop', learn: [], icon: '🧩',
        hook: 'A sentence is like a train: the words go in order.',
        scenes: [
          { say: idea('A sentence tells you <b>who</b> and <b>what they do</b>. Start with a <b>capital letter</b>. End with a <b>full stop</b> (.)'), pic: big('<span class="tagw">Ali</span> + <span class="tagv">plays</span> + <span class="tago">football</span> <b>.</b>') + '<p class="center small muted">who + does what + what</p>' },
          { say: 'Try a different person. The order stays the same.', anim: X([{ k: 'i', label: 'Example', min: 0, max: 3, v: 0 }], v => big(['<b>Sara</b> reads a book.', '<b>The dog</b> eats meat.', '<b>My father</b> drives a bus.', '<b>Plants</b> need water.'][v.i]) + '<p class="center muted">who → does what → what</p>') },
          { say: 'Find the mistake.', ask: T('Which is a correct sentence?', ['My brother is tall.', 'my brother is tall', 'Tall my brother is.'], 0, 'Capital M at the start, full stop at the end, and the words in order.') }
        ],
        keys: ['Who + does what (+ what).', 'Capital letter at the start. Full stop at the end.', 'Names, places and "I" always have capital letters.'],
        gens: ['beSentence'], easy: ['beSentence'] },
      { id: 'be-tobe', title: 'am, is, are, have, has', obj: ['B3'], kw: 'am is are have has', learn: [], icon: '🙋',
        hook: 'These little words are in almost every sentence you will read.',
        scenes: [
          { say: idea('<b>am / is / are</b> say what someone or something <b>is</b>. Which one you use depends on <b>who</b>.'), pic: '<table class="tbl"><tr><td>I</td><td><b>am</b></td></tr><tr><td>he, she, it, one thing</td><td><b>is</b></td></tr><tr><td>you, we, they, many things</td><td><b>are</b></td></tr></table>' },
          { say: 'Move the slider: who is it?', anim: X([{ k: 'w', label: 'Who', min: 0, max: 6, v: 0, fmt: i => WHO[i] }], v => big(`${WHO[v.w]} <b>${['am', 'are', 'is', 'is', 'is', 'are', 'are'][v.w]}</b> happy. 😊`) + `<p class="center">${WHO[v.w]} <b>${['have', 'have', 'has', 'has', 'has', 'have', 'have'][v.w]}</b> a book. 📘</p>`) },
          { say: '<b>have / has</b> say what someone owns. He, she, it → <b>has</b>. Everyone else → <b>have</b>.', ask: T('A square ___ four sides.', ['has', 'have', 'are'], 0, 'One thing (a square) → has.') }
        ],
        keys: ['I am. He/she/it is. You/we/they are.', 'He/she/it has. I/you/we/they have.', 'One thing → is / has. Many things → are / have.'],
        gens: ['beBe'], easy: ['beBe'] },
      { id: 'be-plural', title: 'One or many? a, an, the', obj: ['B5'], kw: 'plurals a an the', learn: [], icon: '🍎',
        hook: 'One apple 🍎. Two apples 🍎🍎. The little "s" matters.',
        scenes: [
          { say: idea('For <b>more than one</b>, most words add <b>-s</b>: one cat, two cat<b>s</b>. Some words change: child → children, man → men, tooth → teeth.'), pic: pics(['🐱', 'cat → cats'], ['📦', 'box → boxes'], ['👶', 'baby → babies'], ['🧒', 'child → children'], ['🍃', 'leaf → leaves'], ['🦷', 'tooth → teeth']) },
          { say: '<b>a</b> or <b>an</b>? Listen to the first sound. a, e, i, o, u sounds → <b>an</b>. Other sounds → <b>a</b>.', pic: big('<b>a</b> dog · <b>a</b> book · <b>an</b> apple · <b>an</b> egg · <b>an</b> hour'),
            ask: T('___ orange', ['an', 'a'], 0, '"orange" starts with an "o" sound → an orange.') },
          { say: 'Use <b>the</b> when we know which one, or when there is only one: <b>the</b> Sun, <b>the</b> Earth, <b>the</b> teacher in my class.' }
        ],
        keys: ['Add -s (or -es after s, x, sh, ch).', 'Consonant + y → -ies (baby → babies).', 'Special: children, men, women, teeth, feet, leaves.', 'an before a vowel sound; a before others; the for one we know.'],
        gens: ['bePlural'], easy: ['bePlural'] },
      { id: 'be-place', title: 'Where is it? in, on, under', obj: ['B6'], kw: 'prepositions in on under between', learn: [], icon: '📦',
        hook: 'Science and geography ask "where?" all the time.',
        scenes: [
          { say: idea('Small words like <b>in, on, under, next to, above</b> tell us <b>where</b> something is. Move the slider and watch the ball.'), anim: X([{ k: 'p', label: 'Place', min: 0, max: 4, v: 0, fmt: i => ['in', 'on', 'under', 'next to', 'above'][i] }], v => placeSVG(v.p)) },
          { say: '<b>between</b> means in the middle of two things.', pic: big('🏦 🏫 🏪') + '<p class="center">The school is <b>between</b> the bank and the shop.</p>',
            ask: T('The heart is ___ the two lungs.', ['between', 'under', 'on'], 0, 'In the middle of two things → between.') },
          { say: 'For time: <b>at</b> 8 o\'clock, <b>on</b> Monday, <b>in</b> June, <b>in</b> 2027.' }
        ],
        keys: ['in = inside; on = on top / touching; under = below.', 'next to = beside; between = in the middle of two.', 'Time: at 8 o\'clock, on Monday, in June.'],
        gens: ['bePlace'], easy: ['bePlace'] }
    ] });
  const VERBS = [['play', 'plays', 'played'], ['walk', 'walks', 'walked'], ['go', 'goes', 'went'], ['eat', 'eats', 'ate'], ['see', 'sees', 'saw'], ['write', 'writes', 'wrote'], ['have', 'has', 'had']];
  R2O.addModule({ subject: 'basic', id: 'be-use', name: 'Using English to learn', icon: '🎓', color: '#6d28d9',
    blurb: 'Now and before, questions, joining ideas, exam words and reading.',
    lessons: [
      { id: 'be-present', title: 'Things that happen every day', obj: ['B4'], kw: 'present simple tense', learn: [], icon: '🔁',
        hook: 'Science facts are always true, so they use the present: "Water boils at 100 °C."',
        scenes: [
          { say: idea('For things that happen <b>every day</b>, or are <b>always true</b>, use the present. With <b>he, she, it</b> (or one thing), add <b>-s</b>.'), pic: big('I walk · you walk · he walk<b>s</b> · she walk<b>s</b> · they walk') },
          { say: 'Try different people and verbs.', anim: X([{ k: 'w', label: 'Who', min: 0, max: 6, v: 2, fmt: i => WHO[i] }, { k: 'v', label: 'Verb', min: 0, max: 6, v: 0, fmt: i => VERBS[i][0] }], v => big(`${WHO[v.w]} <b>${[2, 3, 4].includes(v.w) ? VERBS[v.v][1] : VERBS[v.v][0]}</b> every day.`) + `<p class="center muted">${[2, 3, 4].includes(v.w) ? 'he / she / it → add -s' : 'no -s'}</p>`) },
          { say: 'Happening <b>right now</b>? Use am / is / are + <b>-ing</b>: "I am reading", "She is writing".', ask: T('The Earth ___ around the Sun.', ['moves', 'move', 'moving'], 0, 'One thing (the Earth), always true → moves.') }
        ],
        keys: ['Every day or always true → present.', 'He/she/it → add -s (goes, does, has).', 'Right now → am/is/are + -ing.'],
        gens: ['bePresent'], easy: ['bePresent'] },
      { id: 'be-past', title: 'Things that already happened', obj: ['B4'], kw: 'past simple tense irregular verbs', learn: [], icon: '⏪',
        hook: 'History is all in the past: "The war ended in 1918."',
        scenes: [
          { say: idea('For things that <b>already happened</b> (yesterday, last year, in 1945), use the past. Most verbs add <b>-ed</b>: play → play<b>ed</b>.'), pic: big('Yesterday I play<b>ed</b>. Last year we live<b>d</b> here.') },
          { say: 'Some verbs are special. Move the slider to learn them.', anim: X([{ k: 'v', label: 'Verb', min: 0, max: 6, v: 2, fmt: i => VERBS[i][0] }], v => big(`Today I <b>${VERBS[v.v][0]}</b>. Yesterday I <b>${VERBS[v.v][2]}</b>.`) + `<p class="center muted">${VERBS[v.v][2].endsWith('ed') ? 'normal: add -ed' : 'special: learn this one'}</p>`) },
          { say: '<b>is → was</b> and <b>are → were</b>.', ask: T('Last week they ___ ill.', ['were', 'was', 'are'], 0, 'They → were.') }
        ],
        keys: ['Past: add -ed (played, lived).', 'Special: go → went, eat → ate, see → saw, write → wrote, have → had.', 'is → was; are → were.', 'Past words: yesterday, last week, ago, in 1990.'],
        gens: ['bePast'], easy: ['bePast'] },
      { id: 'be-questions', title: 'Asking questions', obj: ['B7'], kw: 'question words who what where when why how', learn: [], icon: '❓',
        hook: 'Every exam question starts with a question word. Know what each one wants.',
        scenes: [
          { say: idea('Each question word wants a different kind of answer.'), pic: '<table class="tbl"><tr><th>word</th><th>wants</th></tr><tr><td>Who?</td><td>a person</td></tr><tr><td>What?</td><td>a thing or idea</td></tr><tr><td>Where?</td><td>a place</td></tr><tr><td>When?</td><td>a time</td></tr><tr><td>Why?</td><td>a reason (because…)</td></tr><tr><td>How?</td><td>the way it happens</td></tr><tr><td>How many?</td><td>a number</td></tr></table>' },
          { say: 'Try it.', ask: T('"Why do we sweat?" The answer should be…', ['a reason: because…', 'a place', 'a number'], 0, 'Why → because. "We sweat because it cools us down."') },
          { say: 'A question ends with a question mark (?). "Where is the library?"' }
        ],
        keys: ['Who = person, What = thing, Where = place, When = time.', 'Why = reason (because…), How = the way, How many = number.', 'Questions end with ?'],
        gens: ['beQuestion'], easy: ['beQuestion'] },
      { id: 'be-linking', title: 'Joining ideas: and, but, because, so', obj: ['B8'], kw: 'linking words because so but and', learn: [], icon: '🔗',
        hook: '"because" and "so" are the two most useful words in every exam.',
        scenes: [
          { say: idea('Linking words join two ideas. <b>because</b> gives the <b>reason</b>. <b>so</b> gives the <b>result</b>. <b>but</b> shows something <b>different</b>.'), pic: big('I was tired <b>because</b> I worked hard.') + big('I worked hard, <b>so</b> I was tired.') },
          { say: 'Pick a link and see how the meaning changes.', anim: X([{ k: 'l', label: 'Link', min: 0, max: 3, v: 0, fmt: i => ['because', 'so', 'but', 'and'][i] }], v => big(['The ice melted <b>because</b> the sun was hot.', 'The sun was hot, <b>so</b> the ice melted.', 'The sun was hot, <b>but</b> the ice did not melt.', 'The sun was hot <b>and</b> the sky was blue.'][v.l]) + `<p class="center muted">${['reason', 'result', 'something different', 'adds more'][v.l]}</p>`) },
          { say: 'For steps in order: <b>first, then, next, finally</b>.', ask: T('Plants need light ___ they make food with it.', ['because', 'but', 'or'], 0, 'because → the reason.') }
        ],
        keys: ['because → reason; so → result; but / however → different; and → more.', 'Steps: first, then, next, finally.', 'Use "because" to explain.'],
        gens: ['beLink'], easy: ['beLink'] },
      { id: 'be-command', title: 'Exam words: state, explain, describe', obj: ['B9'], kw: 'command words exam questions', learn: [], icon: '📝',
        hook: 'The first word of an exam question tells you exactly what to do.',
        scenes: [
          { say: idea('Exam questions start with a <b>command word</b>. It tells you <b>what kind of answer</b> to give and <b>how much</b> to write.'), pic: '<table class="tbl"><tr><th>word</th><th>what to do</th></tr><tr><td>State / Name</td><td>short answer</td></tr><tr><td>Describe</td><td>say what happens or what it is like</td></tr><tr><td>Explain</td><td>give reasons (because…)</td></tr><tr><td>Calculate</td><td>work out a number, show working</td></tr><tr><td>Compare</td><td>same and different</td></tr><tr><td>Suggest</td><td>a sensible idea</td></tr><tr><td>Define</td><td>the exact meaning</td></tr></table>' },
          { say: 'Same topic, different command word: different answer.', anim: X([{ k: 'c', label: 'Command', min: 0, max: 2, v: 0, fmt: i => ['State', 'Describe', 'Explain'][i] }], v => `<p class="center"><b>${['State', 'Describe', 'Explain'][v.c]}</b> ${['what happens to ice when it is heated.', 'what happens to ice when it is heated.', 'why ice melts when it is heated.'][v.c]}</p>` + big(['It melts.', 'It turns into water. First it gets wet on the outside, then it becomes a liquid.', 'The heat gives the particles more energy, so they move apart and the ice becomes liquid.'][v.c])) },
          { say: 'Look at the marks too: <b>[1]</b> = one point, <b>[3]</b> = about three points.', ask: T('"Explain why…" means you should…', ['give reasons, using because', 'write one word', 'draw a picture'], 0, 'Explain = why or how.') }
        ],
        keys: ['State/Name → short. Describe → what happens.', 'Explain → why (because…). Calculate → number + working + unit.', 'Compare → same and different. Define → exact meaning.', 'Marks [3] → about 3 points.'],
        gens: ['beCommand'], easy: ['beCommand'] },
      { id: 'be-reading', title: 'Reading a short text', obj: ['B10'], kw: 'reading comprehension find the answer', learn: [], icon: '📰',
        hook: 'Most answers are hiding in the text. Here is how to find them.',
        scenes: [
          { say: idea('To answer a reading question: <b>1)</b> read the question first, <b>2)</b> find the key word, <b>3)</b> look for that word in the text, <b>4)</b> read the sentence around it.'),
            pic: '<div class="passage">Hamza lives in a small village. Every morning he wakes up at <mark>six o\'clock</mark>. He helps his father feed the goats, then he walks to school.</div><p class="center">Question: What time does Hamza <b>wake up</b>? → key words: <b>wakes up</b> → <b>six o\'clock</b></p>' },
          { say: 'For a "why" question, look for <b>because</b> or <b>so</b> in the text.', ask: T('"Hamza likes science because he wants to be a doctor." Why does Hamza like science?', ['He wants to be a doctor.', 'He lives in a village.', 'He has goats.'], 0, 'The reason comes after "because".') }
        ],
        keys: ['Read the question first.', 'Find the key word, then find it in the text.', 'Why? → look for because / so.'],
        gens: ['beRead'], easy: ['beRead'] }
    ] });
})();
