// Computer Science 2210, part 2: algorithm design and problem-solving (7), programming (8), databases (9)
// and Boolean logic (10). Pseudocode follows the Cambridge style (← for assignment).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, code = S.code, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Introduction to Computer Science', 'https://openstax.org/details/books/introduction-computer-science'];

  // ================= small helpers =================
  const GATES = { AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), XOR: (a, b) => a ^ b };
  const bubblePasses = arr => { const a = arr.slice(), out = [a.slice()]; for (let p = 0; p < a.length - 1; p++) { let sw = false; for (let i = 0; i < a.length - 1 - p; i++) if (a[i] > a[i + 1]) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; sw = true; } out.push(a.slice()); if (!sw) break; } return out; };
  const TABLE = [['Ayesha', 'Lahore', 16, 72], ['Ben', 'Lagos', 15, 58], ['Chen', 'Penang', 16, 91], ['Divya', 'Pune', 17, 64], ['Emeka', 'Lagos', 16, 85], ['Farah', 'Dhaka', 15, 47]];
  const tableHTML = rows => `<table class="tbl"><tr><th>StudentID</th><th>Name</th><th>City</th><th>Age</th><th>Score</th></tr>${rows.map(([nm, c, a, s], i) => `<tr><td>S${String(TABLE.findIndex(t => t[0] === nm) + 1).padStart(2, '0')}</td><td>${nm}</td><td>${c}</td><td>${a}</td><td>${s}</td></tr>`).join('')}</table>`;
  S.gateSym = (g, a, b, out) => { const y = 60; let body = '';
    const wire = (x1, y1, x2, y2, v) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${v ? 'var(--c2)' : 'var(--muted)'}" stroke-width="3"/>`;
    if (g === 'NOT') body = `${wire(20, y, 90, y, a)}<polygon points="90,35 90,85 140,60" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/><circle cx="146" cy="60" r="6" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>${wire(152, y, 220, y, out)}`;
    else { body = `${wire(20, 40, 90, 40, a)}${wire(20, 80, 90, 80, b)}`;
      if (g === 'AND' || g === 'NAND') body += `<path d="M90 30 L120 30 A30 30 0 0 1 120 90 L90 90 Z" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>`;
      else body += `${g === 'XOR' ? '<path d="M82 30 Q 100 60 82 90" fill="none" stroke="var(--text)" stroke-width="2.5"/>' : ''}<path d="M90 30 Q 110 60 90 90 Q 135 90 150 60 Q 135 30 90 30 Z" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>`;
      const nx = g === 'NAND' || g === 'NOR'; if (nx) body += `<circle cx="${g === 'NAND' ? 156 : 156}" cy="60" r="6" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>`; body += wire(nx ? 162 : 150, y, 220, y, out); }
    return S.svg(240, 120, `${body}${S.txt(12, g === 'NOT' ? 64 : 44, 'A', 'lbl')}${g === 'NOT' ? '' : S.txt(12, 84, 'B', 'lbl')}${S.txt(230, 64, out, 'lbl acc')}${S.txt(120, 112, g, 'tick')}`, 240); };

  // ================= generators =================
  G.csTestData = () => { const lo = pick([1, 10, 18, 0]), hi = lo + pick([9, 49, 99]); const kind = pick(['normal', 'abnormal', 'boundary', 'extreme']);
    const v = kind === 'normal' ? rnd(lo + 1, hi - 1) : kind === 'abnormal' ? pick([hi + rnd(20, 90), lo - rnd(20, 90), 'twenty']) : kind === 'boundary' ? pick([hi + 1, lo - 1]) : pick([lo, hi]);
    const opts = kind === 'extreme' ? ['extreme', 'normal', 'abnormal'] : ['normal', 'abnormal', 'boundary'];
    return { kind: 'mcq', q: `<p>A program accepts whole numbers from ${lo} to ${hi} inclusive. What type of test data is <b>${v}</b>?</p>`, choices: opts, a: kind, hint: 'Normal: accepted, inside the range. Abnormal: should be rejected. Extreme: the largest/smallest accepted values. Boundary: the accepted end value and the rejected value next to it.', steps: [`<b>${kind}</b>: ${{ normal: 'a typical value that should be accepted', abnormal: 'it should be rejected (out of range or wrong type)', boundary: 'the first rejected value just outside the range', extreme: 'the largest or smallest value that is still accepted' }[kind]}`] }; };
  bank('csValidation', [
    { q: 'Which check makes sure an age is between 11 and 18?', a: 'Range check', w: ['Length check', 'Presence check', 'Format check'], why: 'Range: between limits.' },
    { q: 'Which check makes sure a field is not left empty?', a: 'Presence check', w: ['Type check', 'Range check', 'Check digit'], why: 'Presence: something was entered.' },
    { q: 'Which check makes sure a password has at least 8 characters?', a: 'Length check', w: ['Range check', 'Format check', 'Type check'], why: 'Length: number of characters.' },
    { q: 'Which check makes sure a date is entered as DD/MM/YYYY?', a: 'Format check', w: ['Length check', 'Presence check', 'Range check'], why: 'Format: the right pattern.' },
    { q: 'Which check makes sure "abc" is rejected for an age?', a: 'Type check', w: ['Range check', 'Length check', 'Presence check'], why: 'Type: the right data type.' },
    { q: 'Verification is different from validation because it checks…', a: 'that data has been copied or entered accurately (e.g. double entry, visual check)', w: ['that data is sensible and reasonable', 'that the program has no syntax errors', 'that data is encrypted'], why: 'Validation checks data is reasonable; verification checks it matches the original.' },
    { q: 'A double entry check means…', a: 'entering the data twice and comparing', w: ['checking the data is in range', 'saving the file twice', 'asking two people to vote'], why: 'Common for new passwords and email addresses.' }
  ]);
  bank('csAlgorithms', [
    { q: 'The stages of the program development life cycle are…', a: 'analysis, design, coding, testing', w: ['coding, testing, selling', 'design, analysis, launch', 'input, process, output'], why: 'Analysis includes abstraction and decomposition; design uses structure diagrams, flowcharts and pseudocode.' },
    { q: 'Decomposition means…', a: 'breaking a problem into smaller sub-problems', w: ['removing unnecessary detail', 'testing the program', 'translating code'], why: 'Abstraction removes unnecessary detail.' },
    { q: 'Abstraction means…', a: 'removing unnecessary details to focus on what matters', w: ['breaking a problem into parts', 'writing comments', 'using a loop'], why: 'e.g. a map leaves out every tree.' },
    { q: 'A structure diagram shows…', a: 'how a system is broken down into sub-systems', w: ['the order of every instruction', 'the truth table', 'the data in a database'], why: 'A top-down design tool.' },
    { q: 'Which flowchart symbol is used for a decision?', a: 'A diamond', w: ['A rectangle', 'A parallelogram', 'An oval'], why: 'Rectangle: process. Parallelogram: input/output. Oval (terminator): start/stop.' },
    { q: 'A linear search…', a: 'checks each item in turn until the item is found or the list ends', w: ['only works on sorted lists by halving them', 'sorts the list first', 'checks the middle item first'], why: 'It works on unsorted lists.' },
    { q: 'In a bubble sort, after the first pass…', a: 'the largest value has "bubbled" to the end', w: ['the list is fully sorted', 'the smallest value is at the end', 'nothing has moved'], why: 'It swaps adjacent pairs that are out of order; stop when a pass makes no swaps.' },
    { q: 'A syntax error is…', a: 'code that breaks the rules of the language, so it cannot be translated', w: ['code that runs but gives the wrong answer', 'a hardware fault', 'a missing file'], why: 'A logic error runs but gives wrong results.' },
    { q: 'Why use a trace table?', a: 'To dry-run an algorithm, recording variables and outputs at each step', w: ['To store data permanently', 'To draw logic gates', 'To encrypt data'], why: 'It helps find logic errors.' },
    { q: 'Totalling in a loop uses…', a: 'Total ← Total + Value', w: ['Total ← Value', 'Total ← Total + 1', 'Total ← 0 inside the loop'], why: 'Counting uses Count ← Count + 1.' }
  ]);
  G.csTrace = () => { const kind = pick(['total', 'count', 'while', 'max']);
    if (kind === 'total') { const a = rnd(1, 3), b = rnd(4, 7), step = pick([1, 2]); let t = 0; for (let i = a; i <= b; i += step) t += i;
      return num(`<p>What is output by this pseudocode?</p>${code(`Total ← 0\nFOR Count ← ${a} TO ${b}${step > 1 ? ' STEP ' + step : ''}\n    Total ← Total + Count\nNEXT Count\nOUTPUT Total`)}`, t, '', [`Count takes the values ${Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => a + i * step).join(', ')}`, `Total = ${Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => a + i * step).join(' + ')} = <b>${t}</b>`], 'Dry-run it with a trace table.'); }
    if (kind === 'count') { const vals = Array.from({ length: 6 }, () => rnd(1, 20)), lim = rnd(6, 14); const c = vals.filter(v => v > lim).length;
      return num(`<p>The array Nums holds ${vals.join(', ')} (indexes 1 to 6). What is output?</p>${code(`Count ← 0\nFOR i ← 1 TO 6\n    IF Nums[i] > ${lim} THEN\n        Count ← Count + 1\n    ENDIF\nNEXT i\nOUTPUT Count`)}`, c, '', [`values greater than ${lim}: ${vals.filter(v => v > lim).join(', ') || 'none'}`, `Count = <b>${c}</b>`], 'Count only the values that pass the IF test.'); }
    if (kind === 'while') { const start = pick([1, 2, 3]), lim = pick([50, 100, 200]); let x = start, k = 0; while (x < lim) { x *= 2; k++; }
      return num(`<p>What is output by this pseudocode?</p>${code(`X ← ${start}\nWHILE X < ${lim} DO\n    X ← X * 2\nENDWHILE\nOUTPUT X`)}`, x, '', [`X goes ${Array.from({ length: k + 1 }, (_, i) => start * 2 ** i).join(' → ')}`, `stops when X is no longer < ${lim}: <b>${x}</b>`], 'A pre-condition loop checks before each pass.'); }
    const vals = Array.from({ length: 5 }, () => rnd(1, 99)); const m = Math.max(...vals);
    return num(`<p>The array Data holds ${vals.join(', ')} (indexes 1 to 5). What is output?</p>${code(`Max ← Data[1]\nFOR i ← 2 TO 5\n    IF Data[i] > Max THEN\n        Max ← Data[i]\n    ENDIF\nNEXT i\nOUTPUT Max`)}`, m, '', [`Max keeps the biggest value seen so far → <b>${m}</b>`], 'Finding the maximum: compare each value with the best so far.'); };
  G.csOps = () => { const kind = pick(['MOD', 'DIV', 'MOD', 'ROUND', 'LENGTH', 'SUBSTRING', 'UCASE']); const a = rnd(10, 99), b = rnd(2, 9);
    if (kind === 'MOD') return num(`<p>What is the value of <b>${a} MOD ${b}</b>?</p>`, a % b, '', [`${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${a % b} → <b>${a % b}</b>`], 'MOD gives the remainder.');
    if (kind === 'DIV') return num(`<p>What is the value of <b>${a} DIV ${b}</b>?</p>`, Math.floor(a / b), '', [`${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${a % b} → <b>${Math.floor(a / b)}</b>`], 'DIV gives the whole-number part of a division.');
    if (kind === 'ROUND') { const v = r(rnd(100, 999) / 37, 4), dp = pick([0, 1, 2]); return num(`<p>What is <b>ROUND(${n(v)}, ${dp})</b>?</p>`, r(v, dp), '', [`round ${n(v)} to ${dp} decimal place${dp === 1 ? '' : 's'}: <b>${n(r(v, dp))}</b>`], 'ROUND(value, places).'); }
    const w = pick(['Computer', 'Algorithm', 'Pseudocode', 'Variable', 'Network']);
    if (kind === 'LENGTH') return num(`<p>What is <b>LENGTH("${w}")</b>?</p>`, w.length, '', [`count the characters: <b>${w.length}</b>`], 'LENGTH counts the characters.');
    if (kind === 'UCASE') return { kind: 'text', q: `<p>What does <b>UCASE("${w}")</b> return?</p>`, a: w.toUpperCase(), accept: [w.toUpperCase()].map(x => x), ph: 'type it', hint: 'Upper case.', steps: [`<b>${w.toUpperCase()}</b>`] };
    const s = rnd(1, 3), L = rnd(2, 4); const sub = w.substr(s - 1, L);
    return { kind: 'text', q: `<p>Positions start at 1. What does <b>SUBSTRING("${w}", ${s}, ${L})</b> return?</p>`, a: sub, accept: [sub], ph: 'type it', hint: 'SUBSTRING(string, start, length).', steps: [`start at character ${s}, take ${L} characters → <b>${sub}</b>`] }; };
  bank('csProgramming', [
    { q: 'Which data type should store a price like 4.99?', a: 'REAL', w: ['INTEGER', 'BOOLEAN', 'CHAR'], why: 'INTEGER for whole numbers, CHAR for one character, STRING for text, BOOLEAN for TRUE/FALSE.' },
    { q: 'A constant is…', a: 'a named value that does not change while the program runs', w: ['a value that changes every loop', 'a type of loop', 'a function'], why: 'e.g. CONSTANT Pi ← 3.142.' },
    { q: 'Which loop always runs at least once?', a: 'A post-condition loop (REPEAT … UNTIL)', w: ['A pre-condition loop (WHILE … DO)', 'A count-controlled loop (FOR)', 'None of them'], why: 'It checks the condition at the end.' },
    { q: 'Use a count-controlled (FOR) loop when…', a: 'you know how many times to repeat', w: ['you repeat until the user types "stop"', 'you never want to repeat', 'you want a decision'], why: 'WHILE and REPEAT are for an unknown number of repeats.' },
    { q: 'A CASE statement is a type of…', a: 'selection', w: ['iteration', 'sequence', 'array'], why: 'Like IF, it chooses between options.' },
    { q: 'A function differs from a procedure because a function…', a: 'returns a value', w: ['cannot have parameters', 'is always global', 'runs forever'], why: 'Both can take up to three parameters in the exam.' },
    { q: 'A local variable…', a: 'can only be used inside the procedure or function where it is declared', w: ['can be used anywhere', 'never changes', 'is stored in a file'], why: 'A global variable can be used anywhere in the program.' },
    { q: 'Which makes a program easier to maintain?', a: 'Meaningful identifiers, comments, and procedures/functions', w: ['Single-letter variable names everywhere', 'No comments', 'One very long block of code'], why: 'Maintainable programs are easier for others to read and change.' },
    { q: 'What is the result of NOT (5 > 3)?', a: 'FALSE', w: ['TRUE', '5', '3'], why: '5 > 3 is TRUE, so NOT gives FALSE.' },
    { q: '<> means…', a: 'not equal to', w: ['less than or equal', 'greater than', 'assign'], why: 'Relational operators: =, <, <=, >, >=, <>.' }
  ]);
  G.csArray = () => { const kind = pick(['1d', '2d', 'sum']);
    if (kind === '1d') { const vals = Array.from({ length: 6 }, () => rnd(1, 50)), i = rnd(1, 6); return num(`<p>The array Scores (indexes 1 to 6) holds ${vals.join(', ')}. What is Scores[${i}]?</p>`, vals[i - 1], '', [`index ${i} → <b>${vals[i - 1]}</b>`], 'Count positions from index 1.'); }
    if (kind === '2d') { const g = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd(1, 9))), rr = rnd(1, 3), cc = rnd(1, 3);
      return num(`<p>A 2D array Grid (rows 1–3, columns 1–3) is shown. What is Grid[${rr}, ${cc}]?</p><table class="tbl">${g.map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</table>`, g[rr - 1][cc - 1], '', [`row ${rr}, column ${cc} → <b>${g[rr - 1][cc - 1]}</b>`], 'Grid[row, column].'); }
    const vals = Array.from({ length: 5 }, () => rnd(1, 30)); return num(`<p>Marks (indexes 1 to 5) holds ${vals.join(', ')}. What does this output?</p>${code(`Total ← 0\nFOR i ← 1 TO 5\n    Total ← Total + Marks[i]\nNEXT i\nOUTPUT Total / 5`)}`, vals.reduce((a, b) => a + b, 0) / 5, '', [`Total = ${vals.join(' + ')} = ${vals.reduce((a, b) => a + b, 0)}`, `average = ÷ 5 = <b>${n(vals.reduce((a, b) => a + b, 0) / 5)}</b>`], 'Total in a loop, then divide for the average.'); };
  G.csSort = () => { const a = K.shuffle([rnd(1, 9), rnd(10, 19), rnd(20, 29), rnd(30, 39), rnd(40, 49)]); const passes = bubblePasses(a); const one = passes[1];
    if (Math.random() < .5) return { kind: 'text', q: `<p>A bubble sort (ascending) is applied to ${a.join(', ')}. What is the list after the <b>first pass</b>? Separate values with commas.</p>`, a: one.join(','), accept: [one.join(','), one.join(', ')], ph: 'e.g. 3, 8, 1, …', hint: 'Compare each neighbouring pair left to right, swapping if the left one is bigger.', steps: [`after pass 1: <b>${one.join(', ')}</b>`, 'The largest value ends up at the end.'] };
    const target = pick(a), pos = a.indexOf(target) + 1; return num(`<p>A linear search looks for ${target} in the list ${a.join(', ')}. How many items are checked before it is found (including the one that matches)?</p>`, pos, '', [`check items one by one from the start: found at position ${pos} → <b>${pos}</b> comparisons`], 'Linear search checks each item in order.'); };
  G.csSQL = () => { const kind = pick(['count', 'sum', 'where']); const city = pick(['Lagos', 'Lahore', 'Penang', 'Pune']), age = pick([15, 16]), sc = pick([50, 60, 70]);
    const sel = TABLE.filter(t => t[1] === city), selA = TABLE.filter(t => t[2] === age && t[3] > sc);
    if (kind === 'count') return num(`<p>How many records does this query return?</p>${tableHTML(TABLE)}${code(`SELECT Name\nFROM Students\nWHERE City = "${city}";`)}`, sel.length, '', [`records where City = "${city}": ${sel.map(t => t[0]).join(', ') || 'none'}`, `<b>${sel.length}</b>`], 'Count the rows that match WHERE.');
    if (kind === 'sum') return num(`<p>What does this query output?</p>${tableHTML(TABLE)}${code(`SELECT SUM(Score)\nFROM Students\nWHERE Age = ${age};`)}`, TABLE.filter(t => t[2] === age).reduce((s, t) => s + t[3], 0), '', [`ages = ${age}: ${TABLE.filter(t => t[2] === age).map(t => t[3]).join(' + ')}`, `= <b>${TABLE.filter(t => t[2] === age).reduce((s, t) => s + t[3], 0)}</b>`], 'SUM adds the field for matching records.');
    return num(`<p>How many records does this query return?</p>${tableHTML(TABLE)}${code(`SELECT Name, Score\nFROM Students\nWHERE Age = ${age} AND Score > ${sc};`)}`, selA.length, '', [`both conditions must be true: ${selA.map(t => t[0]).join(', ') || 'none'}`, `<b>${selA.length}</b>`], 'AND: both conditions must be true.'); };
  bank('csDatabase', [
    { q: 'A primary key…', a: 'is a field that uniquely identifies each record', w: ['is always the name field', 'can be the same for two records', 'is a type of validation'], why: 'e.g. StudentID.' },
    { q: 'In a database table, a record is…', a: 'one row (all the data about one item)', w: ['one column', 'the whole table', 'a query'], why: 'A field is one column.' },
    { q: 'Which SQL keyword sorts the results?', a: 'ORDER BY', w: ['WHERE', 'SELECT', 'FROM'], why: 'ORDER BY … ASCENDING / DESCENDING.' },
    { q: 'Which data type suits a field "Paid?" storing Yes/No?', a: 'Boolean', w: ['Real', 'Date/time', 'Integer'], why: 'Two possible values.' },
    { q: 'COUNT in SQL…', a: 'returns the number of records that match', w: ['adds up a numeric field', 'sorts the table', 'deletes records'], why: 'SUM adds values.' }
  ]);
  G.csLogic = () => { const kind = pick(['gate', 'gate', 'expr']);
    if (kind === 'gate') { const g = pick(['AND', 'OR', 'NAND', 'NOR', 'XOR', 'NOT']), a = rnd(0, 1), b = rnd(0, 1); const out = g === 'NOT' ? 1 - a : GATES[g](a, b);
      return num(`<p>What is the output of this gate?</p>${S.gateSym(g, a, b, '?')}<p class="center">A = ${a}${g === 'NOT' ? '' : `, B = ${b}`}</p>`, out, '', [`${g}: ${{ AND: '1 only if both are 1', OR: '1 if at least one is 1', NAND: 'NOT AND: 0 only if both are 1', NOR: 'NOT OR: 1 only if both are 0', XOR: '1 if the inputs are different', NOT: 'flips the input' }[g]}`, `→ <b>${out}</b>`], 'Recall the truth table for this gate.'); }
    const a = rnd(0, 1), b = rnd(0, 1), c = rnd(0, 1); const forms = [[`(A AND B) OR C`, (a & b) | c], [`NOT A AND B`, (1 - a) & b], [`(A OR B) AND NOT C`, (a | b) & (1 - c)], [`A XOR (B AND C)`, a ^ (b & c)], [`NOT (A OR C) OR B`, (1 - (a | c)) | b]]; const [ex, out] = pick(forms);
    return num(`<p>A = ${a}, B = ${b}, C = ${c}. What is the value of <b>${ex}</b>?</p>`, out, '', [`work out the brackets first, then the rest → <b>${out}</b>`], 'Brackets first; NOT applies to the thing straight after it.'); };
  bank('csLogicIdea', [
    { q: 'An AND gate outputs 1 when…', a: 'both inputs are 1', w: ['either input is 1', 'both inputs are 0', 'the inputs are different'], why: 'OR: at least one is 1.' },
    { q: 'An XOR gate outputs 1 when…', a: 'the inputs are different', w: ['both inputs are 1', 'both inputs are 0', 'any input is 1'], why: 'Exclusive OR.' },
    { q: 'A NOR gate outputs 1 when…', a: 'both inputs are 0', w: ['both inputs are 1', 'exactly one input is 1', 'never'], why: 'NOT OR.' },
    { q: 'How many rows does a truth table for 3 inputs have?', a: '8', w: ['3', '6', '9'], why: '2³ = 8 combinations.' },
    { q: 'A NOT gate has…', a: 'one input', w: ['two inputs', 'three inputs', 'no inputs'], why: 'All other gates in the syllabus have two inputs.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'computing', id: 'cs-algo', name: 'Algorithms and problem-solving', icon: '🧭', color: '#7c3aed', book: BOOK,
    blurb: 'Syllabus 7: the development life cycle, decomposition, standard algorithms, validation, test data and trace tables.',
    lessons: [
      { id: 'cs-algorithms', title: 'Algorithms and standard methods', obj: ['7'], kw: 'algorithms program development life cycle decomposition linear search bubble sort flowcharts', learn: [],
        hook: 'An algorithm is a recipe so exact that even a computer can follow it.',
        scenes: [
          { say: idea('Big problems are solved by <b>breaking them down</b> (decomposition) and <b>ignoring irrelevant detail</b> (abstraction). Then you write an <b>algorithm</b>: precise steps in pseudocode or a flowchart. A few standard methods come up again and again: <b>searching</b>, <b>sorting</b>, <b>totalling</b>, <b>counting</b>, <b>max/min/average</b>.') },
          { say: 'Linear search: check each item in turn.', anim: X([{ k: 't', label: 'Find', min: 0, max: 5, v: 3, fmt: i => [14, 3, 27, 9, 41, 99][i] }], v => { const L = [14, 3, 27, 9, 41], t = [14, 3, 27, 9, 41, 99][v.t], pos = L.indexOf(t); return `<p class="center bigq">${L.map((x, i) => i < (pos < 0 ? L.length : pos) ? `<s>${x}</s>` : i === pos ? `<b style="color:var(--c4)">[${x}]</b>` : x).join(' &nbsp; ')}</p><p class="center">${pos < 0 ? `Checked all ${L.length}: not found.` : `Found after ${pos + 1} comparison${pos ? 's' : ''}.`}</p>`; }) },
          { say: 'Bubble sort: swap neighbours that are out of order; repeat until a pass makes no swaps.', anim: X([{ k: 'p', label: 'Pass', min: 0, max: 4, v: 1 }], v => { const ps = bubblePasses([5, 1, 4, 2, 8]); const s = ps[Math.min(v.p, ps.length - 1)]; return `<p class="center bigq">${s.join(' &nbsp; ')}</p><p class="center">${v.p === 0 ? 'Start' : v.p >= ps.length - 1 ? '✅ Sorted (a pass with no swaps)' : `After pass ${v.p}: the largest unsorted value has bubbled to the end.`}</p>`; }) },
          { say: 'The program development life cycle: <b>analysis</b> (abstraction, decomposition, requirements) → <b>design</b> (structure diagrams, flowcharts, pseudocode) → <b>coding</b> → <b>testing</b>. Every system = inputs, processes, outputs and storage.',
            ask: T('Which flowchart symbol shows input or output?', ['Parallelogram', 'Diamond', 'Rectangle', 'Oval'], 0, 'Diamond = decision, rectangle = process, oval = start/stop.') }
        ],
        keys: ['PDLC: analysis, design, coding, testing.', 'Decomposition, abstraction; structure diagrams, flowcharts, pseudocode.', 'Standard methods: linear search, bubble sort, totalling, counting, max/min/average.', 'Explain the purpose of a given algorithm.'],
        gens: ['csSort', 'csAlgorithms'], easy: ['csAlgorithms'] },
      { id: 'cs-testing', title: 'Validation, verification and test data', obj: ['7'], kw: 'validation verification test data normal abnormal extreme boundary', learn: [],
        hook: 'Programs must survive whatever users type, including nonsense.',
        scenes: [
          { say: idea('<b>Validation</b> stops <b>unreasonable</b> data getting in (an age of 200, an empty name). <b>Verification</b> checks data was <b>copied correctly</b> (typing it twice). <b>Test data</b> deliberately tries normal, silly and edge values to prove the checks work.') },
          { say: 'A program accepts marks from 0 to 100. Try values.', anim: X([{ k: 'v', label: 'Test value', min: -20, max: 120, v: 50 }], v => { const t = v.v > 0 && v.v < 100 ? 'normal' : v.v === 0 || v.v === 100 ? 'extreme (and the accepted side of the boundary)' : v.v === -1 || v.v === 101 ? 'boundary (the first rejected value)' : 'abnormal'; return `<p class="center bigq">${v.v} → ${v.v >= 0 && v.v <= 100 ? '✅ accepted' : '❌ rejected'}</p><p class="center"><b>${t}</b></p>`; }) },
          { say: 'Validation checks:', pic: '<ul><li><b>Range</b>: between limits</li><li><b>Length</b>: number of characters</li><li><b>Type</b>: right data type</li><li><b>Presence</b>: not left blank</li><li><b>Format</b>: right pattern (e.g. DD/MM/YYYY)</li><li><b>Check digit</b>: calculated digit catches typing errors</li></ul><p>Verification: <b>visual check</b> and <b>double entry</b>.</p>',
            ask: T('Typing a new password twice is…', ['verification (double entry)', 'a range check', 'a presence check'], 0, 'It checks the copy matches.') }
        ],
        keys: ['Validation: range, length, type, presence, format, check digit.', 'Verification: visual check, double entry.', 'Test data: normal, abnormal, extreme, boundary.'],
        gens: ['csTestData', 'csValidation'], easy: ['csValidation'] },
      { id: 'cs-trace', title: 'Trace tables and errors', obj: ['7'], kw: 'trace table dry run errors pseudocode', learn: [],
        hook: 'Be the computer: run the code in your head, one line at a time.',
        scenes: [
          { say: idea('A <b>trace table</b> is a dry run on paper: one column per variable and output, one row per step. Following the code exactly, step by step, is the surest way to find out what it does, and where it goes wrong.') },
          { say: 'Change n and watch the trace table fill in.', anim: X([{ k: 'n', label: 'n', min: 1, max: 6, v: 4 }], v => { let tot = 0; const rows = []; for (let c = 1; c <= v.n; c++) { tot += c * c; rows.push(`<tr><td>${c}</td><td>${tot}</td><td></td></tr>`); } rows.push(`<tr><td></td><td></td><td>${tot}</td></tr>`); return `${code(`Total ← 0\nFOR Count ← 1 TO ${v.n}\n    Total ← Total + Count * Count\nNEXT Count\nOUTPUT Total`)}<table class="tbl"><tr><th>Count</th><th>Total</th><th>OUTPUT</th></tr>${rows.join('')}</table>`; }) },
          { say: 'Spotting errors: a <b>syntax</b> error breaks the language rules (it won\'t translate); a <b>logic</b> error runs but gives the wrong answer, e.g. using > instead of >=, or resetting a total inside the loop.',
            ask: T('Total is set to 0 INSIDE the loop by mistake. What happens?', ['Total only ever holds the last value added', 'The program won\'t run', 'Nothing changes'], 0, 'Initialise totals before the loop.') }
        ],
        keys: ['Trace tables: variables, outputs and prompts at each step.', 'Syntax vs logic errors; suggest corrections.', 'Write precise algorithms (x > y, not "x is bigger").'],
        gens: ['csTrace', 'csAlgorithms'], easy: ['csTrace'] }
    ] });

  R2O.addModule({ subject: 'computing', id: 'cs-prog', name: 'Programming, databases and logic', icon: '⌨️', color: '#0f766e', book: BOOK,
    blurb: 'Syllabus 8–10: variables, selection, iteration, subroutines, arrays, files, SQL and logic gates.',
    lessons: [
      { id: 'cs-programming', title: 'Programming concepts', obj: ['8.1'], kw: 'variables constants data types selection iteration procedures functions', learn: [],
        hook: 'Every program ever written is built from just three ideas.',
        scenes: [
          { say: idea('All programs are built from <b>sequence</b> (do steps in order), <b>selection</b> (choose with IF or CASE) and <b>iteration</b> (repeat with loops). Store values in <b>variables</b> (they can change) and <b>constants</b> (they don\'t), each with a <b>data type</b>.') },
          { say: 'Selection: change the mark.', anim: X([{ k: 'm', label: 'Mark', min: 0, max: 100, step: 5, v: 65 }], v => { const g = v.m >= 70 ? 0 : v.m >= 50 ? 1 : 2; const lines = [`IF Mark >= 70 THEN`, `    OUTPUT "Distinction"`, `ELSE`, `    IF Mark >= 50 THEN`, `        OUTPUT "Pass"`, `    ELSE`, `        OUTPUT "Try again"`, `    ENDIF`, `ENDIF`]; const hl = [1, 4, 6][g]; return `<pre class="code">${lines.map((l, i) => i === hl ? `<span class="hl">${l}</span>` : l).join('\n')}</pre><p class="center bigq">→ ${['Distinction', 'Pass', 'Try again'][g]}</p>`; }) },
          { say: 'Three kinds of loop:', pic: code(`FOR i ← 1 TO 10          // count-controlled: known number of times\n    OUTPUT i\nNEXT i\n\nWHILE Answer <> "yes" DO  // pre-condition: may run 0 times\n    INPUT Answer\nENDWHILE\n\nREPEAT                    // post-condition: runs at least once\n    INPUT Password\nUNTIL Password = "secret"`),
            ask: T('Which data type stores TRUE or FALSE?', ['BOOLEAN', 'INTEGER', 'STRING', 'REAL'], 0, 'Also INTEGER, REAL, CHAR, STRING.') },
          { say: '<b>Procedures</b> and <b>functions</b> package code you can reuse (up to 3 parameters); a function <b>RETURNS</b> a value. <b>Local</b> variables live only inside them; <b>global</b> ones everywhere. Library routines: MOD, DIV, ROUND, RANDOM, LENGTH, SUBSTRING, UCASE, LCASE. Use meaningful names and comments.' }
        ],
        keys: ['Variables, constants; INTEGER, REAL, CHAR, STRING, BOOLEAN.', 'Sequence, selection (IF, CASE), iteration (FOR, WHILE, REPEAT…UNTIL); nesting (max 3 levels).', 'Totalling, counting; string handling; operators (arithmetic, relational, logical).', 'Procedures, functions, parameters, local/global; library routines; maintainable code.'],
        gens: ['csOps', 'csProgramming', 'csTrace'], easy: ['csProgramming'] },
      { id: 'cs-arrays', title: 'Arrays and files', obj: ['8.2', '8.3'], kw: 'arrays one dimensional two dimensional file handling', learn: [],
        hook: 'Storing 1000 marks without making 1000 variables.',
        scenes: [
          { say: idea('An <b>array</b> is one name for a whole row (1D) or grid (2D) of values; an <b>index</b> picks one out. Loops plus arrays let a few lines of code process thousands of values. <b>Files</b> keep data after the program closes.') },
          { say: 'Pick a cell in a 2D array.', anim: X([{ k: 'r', label: 'Row', min: 1, max: 3, v: 2 }, { k: 'c', label: 'Column', min: 1, max: 4, v: 3 }], v => { const g = [[5, 8, 2, 9], [7, 3, 6, 1], [4, 0, 8, 6]]; return `<table class="tbl">${g.map((row, i) => `<tr>${row.map((x, j) => `<td style="${i + 1 === v.r && j + 1 === v.c ? 'background:color-mix(in srgb, var(--c2) 40%, transparent);font-weight:800' : ''}">${x}</td>`).join('')}</tr>`).join('')}</table><p class="center bigq">Grid[${v.r}, ${v.c}] = ${g[v.r - 1][v.c - 1]}</p>`; }) },
          { say: 'Reading and writing arrays with loops, and using files:', pic: code(`DECLARE Marks : ARRAY[1:30] OF INTEGER\nFOR i ← 1 TO 30\n    INPUT Marks[i]\nNEXT i\n\nOPENFILE "marks.txt" FOR WRITE\nFOR i ← 1 TO 30\n    WRITEFILE "marks.txt", Marks[i]\nNEXT i\nCLOSEFILE "marks.txt"`),
            ask: T('Why store data in a file?', ['So it is kept after the program stops', 'To make the program faster', 'To avoid using variables'], 0, 'Open, read/write, close.') }
        ],
        keys: ['1D and 2D arrays; indexes (first index 0 or 1); variables as indexes.', 'Iterate (and nest loops) to read/write arrays.', 'Files: OPENFILE, READFILE, WRITEFILE, CLOSEFILE; single items and lines of text.'],
        gens: ['csArray', 'csProgramming'], easy: ['csArray'] },
      { id: 'cs-databases', title: 'Databases and SQL', obj: ['9'], kw: 'database table field record primary key sql select where', learn: [],
        hook: 'Ask a table a question and get exactly the rows you need.',
        scenes: [
          { say: idea('A database table stores <b>records</b> (rows) made of <b>fields</b> (columns). A <b>primary key</b> gives every record a unique ID. <b>SQL</b> asks questions: SELECT which fields, FROM which table, WHERE which conditions, ORDER BY how to sort.') },
          { say: 'Change the query.', anim: X([{ k: 'q', label: 'Query', min: 0, max: 3, v: 0, fmt: i => ['City = "Lagos"', 'Score > 70', 'Age = 16 AND Score > 80', 'ORDER BY Score DESC'][i] }], v => { let rows = TABLE.slice(); const qs = ['SELECT Name, City, Age, Score\nFROM Students\nWHERE City = "Lagos";', 'SELECT Name, City, Age, Score\nFROM Students\nWHERE Score > 70;', 'SELECT Name, City, Age, Score\nFROM Students\nWHERE Age = 16 AND Score > 80;', 'SELECT Name, City, Age, Score\nFROM Students\nORDER BY Score DESCENDING;']; if (v.q === 0) rows = rows.filter(t => t[1] === 'Lagos'); if (v.q === 1) rows = rows.filter(t => t[3] > 70); if (v.q === 2) rows = rows.filter(t => t[2] === 16 && t[3] > 80); if (v.q === 3) rows.sort((a, b) => b[3] - a[3]); return `${code(qs[v.q])}${tableHTML(rows)}<p class="center small muted">${rows.length} record${rows.length === 1 ? '' : 's'} returned</p>`; }) },
          { say: 'Field data types: text/alphanumeric, character, Boolean, integer, real, date/time. SQL in the syllabus: SELECT, FROM, WHERE, ORDER BY ASCENDING/DESCENDING, SUM, COUNT, AND, OR.',
            ask: T('Which field is the best primary key?', ['StudentID', 'Name', 'City', 'Age'], 0, 'Names and cities can repeat; an ID is unique.') }
        ],
        keys: ['Table, records (rows), fields (columns), data types, validation.', 'Primary key: unique for every record.', 'SQL: SELECT, FROM, WHERE, ORDER BY, SUM, COUNT, AND, OR.'],
        gens: ['csSQL', 'csDatabase'], easy: ['csDatabase'] },
      { id: 'cs-logic', title: 'Logic gates and truth tables', obj: ['10'], kw: 'logic gates and or not nand nor xor truth tables circuits', learn: [],
        hook: 'Every decision a computer makes comes down to tiny gates saying 0 or 1.',
        scenes: [
          { say: idea('A <b>logic gate</b> takes 0s and 1s in and gives one 0 or 1 out, following a simple rule. Chain gates together and you can build any decision, from "turn the alarm on if the door is open AND it is night" to a whole CPU.') },
          { say: 'Pick a gate and flip the inputs.', anim: X([{ k: 'g', label: 'Gate', min: 0, max: 5, v: 0, fmt: i => ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'][i] }, { k: 'a', label: 'A', min: 0, max: 1, v: 1 }, { k: 'b', label: 'B', min: 0, max: 1, v: 0 }], v => { const g = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'][v.g]; const f = g === 'NOT' ? (a) => 1 - a : GATES[g]; const out = f(v.a, v.b); const rows = g === 'NOT' ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]; return `${S.gateSym(g, v.a, v.b, out)}<table class="tbl"><tr><th>A</th>${g === 'NOT' ? '' : '<th>B</th>'}<th>X</th></tr>${rows.map(rw => `<tr style="${rw[0] === v.a && (g === 'NOT' || rw[1] === v.b) ? 'background:color-mix(in srgb, var(--c2) 30%, transparent)' : ''}"><td>${rw[0]}</td>${g === 'NOT' ? '' : `<td>${rw[1]}</td>`}<td>${f(rw[0], rw[1])}</td></tr>`).join('')}</table>`; }) },
          { say: 'Building circuits: work from the inputs towards the output. With 3 inputs, a truth table has <b>8 rows</b> (000 to 111). Draw circuits exactly as the statement says (no simplifying).',
            ask: T('An alarm sounds (X = 1) if the door is open (A = 1) AND the system is on (B = 1). Which gate?', ['AND', 'OR', 'XOR', 'NOR'], 0, 'Both conditions must be true.') }
        ],
        keys: ['NOT, AND, OR, NAND, NOR, XOR: symbols and truth tables.', 'NOT has one input; the others have two.', 'Build circuits from statements, expressions and truth tables (max 3 inputs); complete truth tables.'],
        gens: ['csLogic', 'csLogicIdea'], easy: ['csLogicIdea'] }
    ] });
})();
