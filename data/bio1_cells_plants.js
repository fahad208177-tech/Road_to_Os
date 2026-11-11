// Biology 5090, part 1: subject set-up, biology pictures, cells and classification (1–2), movement in and out
// of cells (3), biological molecules and enzymes (4–5), plants (6–7), human nutrition, gas exchange and respiration (8–10).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Biology 2e', 'https://openstax.org/details/books/biology-2e'];
  const svg = S.svg, txt = S.txt;

  R2O.addSubject({
    id: 'biology', name: 'Biology', short: 'Biology', icon: '🌱', color: '#16a34a',
    blurb: 'How living things work, from cells to ecosystems.',
    syl: {
      code: '5090', name: 'Cambridge O Level Biology', years: '2026, 2027 and 2028',
      url: 'https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf',
      areas: ['Cells', 'Classification', 'Movement into and out of cells', 'Biological molecules', 'Enzymes', 'Plant nutrition', 'Transport in flowering plants', 'Human nutrition', 'Human gas exchange', 'Respiration', 'Transport in humans', 'Disease and immunity', 'Excretion', 'Coordination and control', 'Coordination and response in plants', 'Development of organisms and continuity of life', 'Inheritance', 'Biotechnology and genetic modification', 'Relationships of organisms with one another and with the environment'],
      papers: ['Paper 1 Multiple Choice: 1 hour, 40 marks, 30%.', 'Paper 2 Theory: 1 hour 45 minutes, 80 marks, 50%. Short-answer and structured questions.', 'Paper 3 Practical Test (1 hour 30 minutes) OR Paper 4 Alternative to Practical (1 hour): 40 marks, 20%.'],
      suggest: ['Is the Krebs cycle on my exam?', 'Do I need to know Punnett squares?', 'Explain osmosis', 'Quiz me on enzymes', 'Are the stages of mitosis examinable?', 'Do I need to know the menstrual cycle hormones?', 'What should I revise first?'],
      formulaNote: '<p><span class="verdict maybe">🧠 You need to know it</span></p><p>Biology has few formulas. Learn <b>magnification = image size ÷ actual size</b>, how to calculate <b>percentage change</b>, rates (e.g. bubbles per minute), and phenotypic ratios from <b>Punnett squares</b> (1 : 1 and 3 : 1). You also need the word and balanced equations for <b>photosynthesis</b> and <b>aerobic respiration</b>.</p>',
      offSyllabus: [
        { k: /krebs|glycolysis|\batp\b|electron transport/, why: 'The biochemistry of respiration (glycolysis, Krebs cycle, ATP) is not in 5090. You need the word and balanced equations for aerobic respiration and the word equations for anaerobic respiration (10).', obj: '10.2' },
        { k: /calvin|light[- ]dependent|light[- ]independent/, why: 'The stages of photosynthesis (light-dependent reactions, Calvin cycle) are not in 5090 (6.1).', obj: '6.1' },
        { k: /dihybrid/, why: 'Dihybrid crosses are not in 5090. Monohybrid crosses with 1 : 1 and 3 : 1 ratios are (17.3).', obj: '17.3' },
        { k: /sex[- ]link/, why: 'Sex-linked inheritance is not in 5090. Sex determination (XX, XY) is (17.3).', obj: '17.3' },
        { k: /transcription|translation|mrna|codon|ribosome.*protein synthesis/, why: 'Transcription, translation and mRNA are not in 5090. You need: the base sequence of a gene decides the amino acid sequence of a protein (17.2).', obj: '17.2' },
        { k: /\badh\b|antidiuretic/, why: 'ADH is not in 5090. The kidney topics are filtration, reabsorption and urea (13.2).', obj: '13.2' },
        { k: /hardy|weinberg/, why: 'Hardy–Weinberg is not in 5090.' },
        { k: /clon(e|ing)/, why: 'Cloning is not in 5090. Asexual reproduction and genetic modification are (16.2, 18.2).' },
        { k: /(stage|phase)s? of (mitosis|meiosis)|prophase|metaphase|anaphase|telophase/, why: 'The stages of mitosis and meiosis are not required in 5090 (16.1). You need what each division produces and why.', obj: '16.1' },
        { k: /endosperm/, why: 'Production of endosperm is not required (16.3).', obj: '16.3' }
      ]
    },
    links: (kw) => [
      ['Khan Academy: biology videos and practice', `https://www.khanacademy.org/search?page_search_query=${kw}`],
      ['BBC Bitesize: GCSE Biology revision', `https://www.bbc.co.uk/bitesize/search?q=${kw}`],
      ['Amoeba Sisters: friendly biology videos', `https://www.youtube.com/@AmoebaSisters/search?query=${kw}`]
    ]
  });

  // ================= biology kit =================
  // cell diagrams: type 'animal' | 'plant' | 'bacteria'; hi = name of a part to highlight
  const PARTS = {
    animal: [['cell membrane', 'M'], ['cytoplasm', 'C'], ['nucleus', 'N'], ['mitochondria', 'Mi'], ['ribosomes', 'R']],
    plant: [['cellulose cell wall', 'W'], ['cell membrane', 'M'], ['cytoplasm', 'C'], ['nucleus', 'N'], ['sap vacuole', 'V'], ['chloroplasts', 'Ch'], ['mitochondria', 'Mi'], ['ribosomes', 'R']],
    bacteria: [['cell wall', 'W'], ['cell membrane', 'M'], ['cytoplasm', 'C'], ['circular DNA', 'D'], ['plasmids', 'P'], ['ribosomes', 'R']]
  };
  S.cell = (type, hi) => {
    const H = p => hi && p === hi ? 'stroke="var(--c4)" stroke-width="4"' : '';
    let b = '';
    if (type === 'animal') {
      b += `<path d="M60 40 C 130 10, 220 30, 250 80 C 275 130, 230 190, 150 190 C 70 195, 30 140, 40 90 C 45 65, 50 50, 60 40Z" fill="color-mix(in srgb, var(--c4) 10%, transparent)" stroke="var(--c4)" stroke-width="2.5" ${H('cell membrane')}/>`;
      b += `<circle cx="150" cy="110" r="30" fill="color-mix(in srgb, var(--c3) 30%, transparent)" stroke="var(--c3)" stroke-width="2" ${H('nucleus')}/>`;
      [[90, 70], [210, 150], [200, 70]].forEach(([x, y]) => b += `<ellipse cx="${x}" cy="${y}" rx="16" ry="8" fill="#fb923c" stroke="#c2410c" ${H('mitochondria')}/>`);
    } else if (type === 'plant') {
      b += `<rect x="30" y="20" width="240" height="180" rx="6" fill="none" stroke="var(--c1)" stroke-width="6" ${H('cellulose cell wall')}/><rect x="38" y="28" width="224" height="164" rx="4" fill="color-mix(in srgb, var(--c1) 8%, transparent)" stroke="var(--c4)" stroke-width="1.5" ${H('cell membrane')}/>`;
      b += `<rect x="80" y="55" width="140" height="110" rx="20" fill="color-mix(in srgb, var(--c5) 22%, transparent)" stroke="var(--c5)" stroke-width="2" ${H('sap vacuole')}/>`;
      b += `<circle cx="62" cy="60" r="18" fill="color-mix(in srgb, var(--c3) 30%, transparent)" stroke="var(--c3)" stroke-width="2" ${H('nucleus')}/>`;
      [[60, 120], [60, 165], [245, 60], [245, 110], [245, 160], [150, 185], [150, 37]].forEach(([x, y]) => b += `<ellipse cx="${x}" cy="${y}" rx="13" ry="7" fill="#22c55e" stroke="#15803d" ${H('chloroplasts')}/>`);
      b += `<ellipse cx="110" cy="182" rx="10" ry="5" fill="#fb923c" stroke="#c2410c" ${H('mitochondria')}/>`;
    } else {
      b += `<rect x="40" y="60" width="220" height="100" rx="50" fill="color-mix(in srgb, var(--c2) 12%, transparent)" stroke="var(--c2)" stroke-width="6" ${H('cell wall')}/><rect x="48" y="68" width="204" height="84" rx="42" fill="none" stroke="var(--c4)" stroke-width="1.5" ${H('cell membrane')}/>`;
      b += `<path d="M110 110 C 120 80, 170 80, 180 110 C 190 140, 130 140, 120 120 C 115 108, 140 98, 150 112" fill="none" stroke="var(--c3)" stroke-width="3" ${H('circular DNA')}/>`;
      [[215, 95], [215, 130]].forEach(([x, y]) => b += `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="var(--c5)" stroke-width="3" ${H('plasmids')}/>`);
    }
    for (let i = 0; i < 14; i++) b += `<circle cx="${K.round(70 + (i * 37) % 170, 1)}" cy="${K.round((type === 'bacteria' ? 78 : 45) + (i * 53) % (type === 'bacteria' ? 64 : 130), 1)}" r="2.6" fill="var(--text)" ${H('ribosomes')}/>`;
    return svg(300, 220, b, 300);
  };
  S.cellParts = PARTS;
  // a plant cell in a solution: wp = water potential of the solution relative to the cell (−1 … +1)
  S.osmoCell = (wp, plant = true) => {
    const k = Math.max(-1, Math.min(1, wp)); // + : water moves in
    const shrink = Math.max(0, -k), swell = Math.max(0, k);
    let b = '';
    if (plant) { b += `<rect x="60" y="30" width="180" height="140" rx="10" fill="none" stroke="var(--c1)" stroke-width="7"/>`;
      const mx = 66 + shrink * 40, my = 36 + shrink * 30; b += `<rect x="${mx}" y="${my}" width="${K.round(168 - shrink * 80, 1)}" height="${K.round(128 - shrink * 60, 1)}" rx="${10 + shrink * 30}" fill="color-mix(in srgb, var(--c5) ${18 + swell * 14}%, transparent)" stroke="var(--c4)" stroke-width="2"/>`; }
    else { const R = 55 + k * 25; b += `<circle cx="150" cy="100" r="${K.round(R, 1)}" fill="color-mix(in srgb, #ef4444 ${22 + swell * 10}%, transparent)" stroke="#dc2626" stroke-width="2.5" ${k > .85 ? 'stroke-dasharray="6 5"' : ''}/>`; }
    const dir = k > 0.05 ? 'in' : k < -0.05 ? 'out' : '';
    [[30, 100, 58, 100], [270, 100, 242, 100], [150, 8, 150, 26]].forEach(([x1, y1, x2, y2]) => { if (dir) b += dir === 'in' ? S.arrow(x1, y1, x2, y2, 'var(--c5)', 3) : S.arrow(x2, y2, x1, y1, 'var(--c5)', 3); });
    return svg(300, 200, b, 280);
  };
  // Punnett square for two parents' genotypes, e.g. 'Aa' × 'aa'
  S.punnett = (p1, p2, show = g => g) => {
    const g1 = [p1.slice(0, p1.length / 2), p1.slice(p1.length / 2)], g2 = [p2.slice(0, p2.length / 2), p2.slice(p2.length / 2)];
    const cellG = (a, b) => [a, b].sort((x, y) => (x.toLowerCase() === x) - (y.toLowerCase() === y) || x.localeCompare(y)).join('');
    let b = `${txt(40, 30, '', 'tick')}`;
    g1.forEach((g, i) => b += `<rect x="${70 + i * 80}" y="10" width="76" height="40" fill="var(--surface2)"/>${txt(108 + i * 80, 36, g, 'lbl big')}`);
    g2.forEach((g, j) => b += `<rect x="10" y="${54 + j * 70}" width="56" height="66" fill="var(--surface2)"/>${txt(38, 93 + j * 70, g, 'lbl big')}`);
    g1.forEach((a, i) => g2.forEach((c, j) => { const o = cellG(a, c); b += `<rect x="${70 + i * 80}" y="${54 + j * 70}" width="76" height="66" rx="6" fill="${show(o)}" opacity=".35"/>${txt(108 + i * 80, 94 + j * 70, o, 'lbl big')}`; }));
    return svg(230, 200, b, 240);
  };

  // ================= generators =================
  bank('bCells', [
    { q: 'Which structure is found in plant cells but NOT animal cells?', a: 'Chloroplasts', w: ['Mitochondria', 'Ribosomes', 'Cell membrane'], why: 'Plant cells also have a cellulose cell wall and a large sap vacuole.' },
    { q: 'Where does aerobic respiration happen in a cell?', a: 'Mitochondria', w: ['Ribosomes', 'Nucleus', 'Cell wall'], why: 'They release energy from glucose.' },
    { q: 'Ribosomes are where…', a: 'proteins are made', w: ['energy is released', 'photosynthesis happens', 'DNA is stored'], why: 'Protein synthesis.' },
    { q: 'The cell membrane…', a: 'controls what enters and leaves the cell', w: ['makes the cell rigid', 'contains the DNA', 'makes food'], why: 'It is partially permeable.' },
    { q: 'The cellulose cell wall…', a: 'supports the cell and stops it bursting', w: ['controls what enters the cell', 'makes proteins', 'stores sap'], why: 'It is fully permeable.' },
    { q: 'A bacterial cell has…', a: 'circular DNA and plasmids, but no nucleus', w: ['a nucleus and chloroplasts', 'a nucleus and plasmids', 'no ribosomes'], why: 'Bacteria are prokaryotes.' },
    { q: 'Which stain is used to see animal cells (e.g. cheek cells)?', a: 'Methylene blue', w: ['Benedict\'s solution', 'Limewater', 'Biuret'], why: 'Iodine is used for plant cells such as onion.' },
    { q: 'The sap vacuole…', a: 'stores cell sap and keeps the cell firm (turgid)', w: ['makes proteins', 'releases energy', 'traps light'], why: 'It presses the cytoplasm against the wall.' }
  ]);
  G.bMagnif = () => { const q = pick(['M', 'A', 'I']), act = pick([0.02, 0.05, 0.1, 0.25, 0.5, 2]), M = pick([40, 100, 200, 400, 1000]); const img = r(act * M, 3);
    if (q === 'M') return num(`<p>A drawing of a cell is ${n(img)} mm long. The real cell is ${n(act)} mm long. What is the magnification?</p>`, M, '×', [`magnification = image size ÷ actual size = ${n(img)} ÷ ${n(act)} = <b>× ${M}</b>`], 'Both lengths must be in the same unit.');
    if (q === 'A') return num(`<p>A photo at × ${M} shows a cell ${n(img)} mm long. What is the actual length of the cell in mm?</p>`, act, 'mm', [`actual = image ÷ magnification = ${n(img)} ÷ ${M} = <b>${n(act)} mm</b>`], 'actual size = image size ÷ magnification');
    return num(`<p>A cell ${n(act * 1000)} µm long is drawn at × ${M}. How long is the drawing, in mm? (1 mm = 1000 µm)</p>`, img, 'mm', [`actual = ${n(act * 1000)} µm = ${n(act)} mm`, `image = ${n(act)} × ${M} = <b>${n(img)} mm</b>`], 'Convert µm to mm first (÷ 1000).'); };
  bank('bOrganisation', [
    { q: 'A group of similar cells working together is a…', a: 'tissue', w: ['organ', 'organ system', 'organism'], why: 'cell → tissue → organ → organ system → organism.' },
    { q: 'The heart is an example of…', a: 'an organ', w: ['a tissue', 'a cell', 'an organ system'], why: 'It is made of several tissues working together.' },
    { q: 'A root hair cell is adapted for absorbing water by having…', a: 'a long extension that gives a large surface area', w: ['many chloroplasts', 'a thick wall with lignin', 'no cytoplasm'], why: 'Structure relates to function.' },
    { q: 'Red blood cells have no nucleus so that…', a: 'there is more room for haemoglobin to carry oxygen', w: ['they can divide quickly', 'they can make proteins', 'they can photosynthesise'], why: 'They are also biconcave for a large surface area.' },
    { q: 'Ciliated cells in the airways…', a: 'waft mucus (with trapped dust and pathogens) up to the throat', w: ['make digestive enzymes', 'carry oxygen', 'absorb food'], why: 'Goblet cells make the mucus.' }
  ]);
  bank('bClassify', [
    { q: 'A species is a group of organisms that…', a: 'can reproduce together to produce fertile offspring', w: ['look exactly alike', 'live in the same place', 'eat the same food'], why: 'E.g. horses and donkeys make infertile mules, so they are different species.' },
    { q: 'In the binomial name Homo sapiens, "Homo" is the…', a: 'genus', w: ['species', 'kingdom', 'family'], why: 'Genus then species.' },
    { q: 'Which kingdom do bacteria belong to?', a: 'Prokaryote', w: ['Protoctist', 'Fungus', 'Plant'], why: 'They have no nucleus.' },
    { q: 'Mushrooms belong to the…', a: 'Fungus kingdom', w: ['Plant kingdom', 'Prokaryote kingdom', 'Animal kingdom'], why: 'They don\'t photosynthesise and have cell walls made of chitin-like material.' },
    { q: 'Which vertebrate group has feathers and lays hard-shelled eggs?', a: 'Birds', w: ['Reptiles', 'Mammals', 'Amphibians'], why: 'Reptiles have dry scales; mammals have fur and mammary glands.' },
    { q: 'Which vertebrate group has moist skin and lays eggs in water?', a: 'Amphibians', w: ['Reptiles', 'Fish', 'Birds'], why: 'E.g. frogs.' },
    { q: 'Insects have…', a: 'three body parts and six legs', w: ['eight legs', 'two body parts and eight legs', 'many legs on many segments'], why: 'Arachnids have 8 legs; myriapods many; crustaceans have 2 pairs of antennae.' },
    { q: 'Spiders are…', a: 'arachnids (eight legs)', w: ['insects', 'myriapods', 'crustaceans'], why: 'Two body parts, eight legs.' },
    { q: 'A monocotyledon has…', a: 'parallel leaf veins and one seed leaf', w: ['branching veins and two seed leaves', 'no flowers', 'spores'], why: 'Dicotyledons have branching (net) veins and two cotyledons.' },
    { q: 'Ferns reproduce by…', a: 'spores, not seeds', w: ['flowers', 'seeds in fruits', 'pollen only'], why: 'They have no flowers.' },
    { q: 'A virus has…', a: 'a protein coat and genetic material, and can only reproduce inside living cells', w: ['a nucleus and cell wall', 'chloroplasts', 'its own ribosomes'], why: 'Viruses are not cells.' },
    { q: 'A dichotomous key works by…', a: 'asking a series of questions, each with two choices', w: ['measuring DNA', 'counting cells', 'comparing ages'], why: '"Di" = two.' }
  ]);
  bank('bDiffusion', [
    { q: 'Diffusion is the net movement of particles…', a: 'from a higher to a lower concentration, as a result of random movement', w: ['from a lower to a higher concentration using energy', 'only through a membrane', 'only of water'], why: 'Down a concentration gradient.' },
    { q: 'The energy for diffusion comes from…', a: 'the kinetic energy of the particles\' random movement', w: ['respiration in the cell', 'ATP from mitochondria', 'sunlight'], why: 'No energy from the cell is needed.' },
    { q: 'Which makes diffusion faster?', a: 'A steeper concentration gradient', w: ['A lower temperature', 'A smaller surface area', 'A longer distance'], why: 'Also higher temperature, bigger surface area, shorter distance.' },
    { q: 'Osmosis is the movement of…', a: 'water from higher water potential to lower water potential through a partially permeable membrane', w: ['any particle through any membrane', 'salt into a cell', 'water using energy against the gradient'], why: 'A dilute solution has a high water potential.' },
    { q: 'A plant cell put in pure water becomes…', a: 'turgid', w: ['plasmolysed', 'flaccid', 'burst'], why: 'Water enters by osmosis; the wall stops it bursting.' },
    { q: 'A plant cell in a concentrated salt solution becomes…', a: 'plasmolysed: the membrane pulls away from the wall', w: ['turgid', 'larger', 'unchanged'], why: 'Water leaves by osmosis.' },
    { q: 'A red blood cell put in pure water…', a: 'swells and bursts', w: ['shrinks', 'stays the same', 'becomes turgid'], why: 'Animal cells have no wall to stop them bursting.' },
    { q: 'Active transport moves particles…', a: 'against a concentration gradient, using energy from respiration', w: ['down a concentration gradient', 'without energy', 'only water'], why: 'Through protein carriers in the membrane.' },
    { q: 'Root hair cells take in mineral ions by active transport because…', a: 'the ions are more concentrated inside the cell than in the soil', w: ['ions are too big for diffusion', 'water carries them', 'they are made in the leaf'], why: 'They must move against the gradient.' },
    { q: 'Plants are supported because…', a: 'water in the cells presses outwards on the cell walls (turgor pressure)', w: ['they have bones', 'the cell wall is made of lignin', 'air pushes them up'], why: 'Without enough water they wilt.' }
  ]);
  G.bOsmosis = () => { const m0 = pick([2.0, 2.5, 3.0, 4.0, 5.0]), ch = pick([-25, -20, -12, -8, 5, 10, 15, 20]); const m1 = r(m0 * (1 + ch / 100), 3);
    return num(`<p>A potato strip had a mass of ${n(m0)} g. After 30 minutes in a solution it was ${n(m1)} g. Calculate the percentage change in mass.</p>`, ch, '%', [`change = ${n(m1)} − ${n(m0)} = ${n(r(m1 - m0, 3))} g`, `% change = change ÷ original × 100 = <b>${ch > 0 ? '+' : ''}${ch}%</b>`, ch > 0 ? 'It GAINED mass: water entered by osmosis (the solution was more dilute than the cells).' : 'It LOST mass: water left by osmosis (the solution was more concentrated than the cells).'], 'Percentage change = (final − initial) ÷ initial × 100. A loss is negative.'); };
  bank('bMolecules', [
    { q: 'Starch is made of many…', a: 'glucose molecules', w: ['amino acids', 'fatty acids', 'nucleotides'], why: 'Cellulose and glycogen are also made from glucose.' },
    { q: 'Proteins are made of…', a: 'amino acids', w: ['glucose', 'glycerol', 'nucleotides'], why: 'Lipids are made from fatty acids and glycerol.' },
    { q: 'Which element is in proteins but NOT in carbohydrates?', a: 'Nitrogen', w: ['Carbon', 'Hydrogen', 'Oxygen'], why: 'Carbohydrates and lipids: C, H, O. Proteins: C, H, O, N. DNA also has P.' },
    { q: 'Iodine solution turns blue-black with…', a: 'starch', w: ['glucose', 'protein', 'fat'], why: 'It stays orange-brown if there is no starch.' },
    { q: 'Benedict\'s solution, heated, turns brick-red with…', a: 'reducing sugars such as glucose and maltose', w: ['starch', 'protein', 'lipids'], why: 'It goes blue → green → yellow → orange → brick-red as sugar increases.' },
    { q: 'The biuret test gives a purple colour with…', a: 'protein', w: ['starch', 'glucose', 'fat'], why: 'It stays blue without protein.' },
    { q: 'The ethanol emulsion test for lipids gives…', a: 'a milky-white emulsion', w: ['a blue-black colour', 'a brick-red precipitate', 'a purple colour'], why: 'Shake with ethanol, then add water.' },
    { q: 'DNA is made from…', a: 'nucleotides', w: ['amino acids', 'glucose', 'fatty acids'], why: 'It contains C, H, O, N and P.' }
  ]);
  bank('bEnzymes', [
    { q: 'Enzymes are…', a: 'proteins that act as biological catalysts', w: ['carbohydrates that store energy', 'fats that insulate', 'hormones'], why: 'They speed up reactions and are not used up.' },
    { q: 'The substrate binds to the enzyme\'s…', a: 'active site', w: ['nucleus', 'cell wall', 'product'], why: 'Forming an enzyme–substrate complex.' },
    { q: 'Each enzyme only works on one substrate because…', a: 'the active site has a shape complementary to that substrate (lock and key)', w: ['enzymes are very small', 'substrates are all the same', 'enzymes are alive'], why: 'Specificity.' },
    { q: 'Above the optimum temperature, enzyme activity falls because…', a: 'the active site changes shape (the enzyme is denatured), so the substrate no longer fits', w: ['the enzyme dies', 'the enzyme gets bigger', 'there are fewer collisions'], why: 'Denaturing is permanent.' },
    { q: 'At low temperatures enzymes work slowly because…', a: 'molecules have less kinetic energy, so fewer effective collisions', w: ['they are denatured', 'the active site disappears', 'they turn into substrate'], why: 'Warming them up speeds them up again.' },
    { q: 'Pepsin works best at pH 2 because…', a: 'it works in the acidic stomach; other pH values change the shape of its active site', w: ['it likes neutral conditions', 'it is a lipase', 'it works in the mouth'], why: 'Trypsin, in the duodenum, works best at a higher pH.' },
    { q: 'You can follow an enzyme reaction by measuring…', a: 'how fast the substrate disappears or the product appears', w: ['the colour of the enzyme', 'the mass of the test tube', 'the size of the active site'], why: 'E.g. starch disappearing (iodine test) with amylase.' }
  ]);
  G.bEnzymeRate = () => { const t = pick([2, 4, 5, 8, 10, 20, 25, 40]); if (Math.random() < .5) return num(`<p>Amylase took ${t} minutes to break down all the starch (iodine stopped turning blue-black). Calculate the rate as 1 ÷ time.</p>`, 1 / t, 'per min', [`rate = 1 ÷ ${t} = <b>${n(r(1 / t, 4))} per minute</b>`, 'A shorter time means a faster rate.'], 'rate = 1 ÷ time taken');
    const v = pick([12, 18, 24, 30, 45]); return num(`<p>An enzyme reaction released ${v} cm³ of oxygen in ${t} minutes. What was the average rate?</p>`, v / t, 'cm³/min', [`rate = ${v} ÷ ${t} = <b>${n(r(v / t, 3))} cm³/min</b>`], 'rate = amount of product ÷ time'); };
  bank('bPhotosynthesis', [
    { q: 'The word equation for photosynthesis is…', a: 'carbon dioxide + water → glucose + oxygen', w: ['glucose + oxygen → carbon dioxide + water', 'oxygen + water → glucose + carbon dioxide', 'glucose → ethanol + carbon dioxide'], why: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, using light energy and chlorophyll.' },
    { q: 'Chlorophyll is found in…', a: 'chloroplasts', w: ['mitochondria', 'the nucleus', 'the cell wall'], why: 'It transfers light energy into chemical energy.' },
    { q: 'Plants store carbohydrate as…', a: 'starch', w: ['glucose only', 'cellulose', 'sucrose only'], why: 'Cellulose builds cell walls; sucrose is transported in phloem; glucose is used in respiration.' },
    { q: 'To show light is needed, you…', a: 'cover part of a destarched leaf, then test it for starch', w: ['put the plant in the dark only', 'test the roots', 'add more water'], why: 'Only the uncovered part goes blue-black.' },
    { q: 'At a high light intensity, adding more light doesn\'t increase the rate. The limiting factor might be…', a: 'carbon dioxide concentration or temperature', w: ['light intensity', 'the colour of the leaf', 'oxygen concentration'], why: 'Whatever is in shortest supply limits the rate.' },
    { q: 'Hydrogencarbonate indicator turns purple around a pondweed in bright light because…', a: 'the plant is removing CO₂ by photosynthesis', w: ['it is releasing CO₂', 'the water is warming', 'the plant is dying'], why: 'Purple = low CO₂; yellow = high CO₂.' },
    { q: 'Plants need nitrate ions to make…', a: 'amino acids for proteins', w: ['chlorophyll only', 'starch', 'glucose'], why: 'Magnesium ions are needed to make chlorophyll.' },
    { q: 'A plant lacking magnesium has yellow leaves because…', a: 'it cannot make enough chlorophyll', w: ['it cannot make proteins', 'it has too much water', 'its stomata are closed'], why: 'Magnesium is part of chlorophyll.' },
    { q: 'Leaves are thin because…', a: 'gases have only a short distance to diffuse', w: ['it saves water', 'it makes them strong', 'it reflects light'], why: 'They are broad for a large surface area to absorb light.' },
    { q: 'Palisade mesophyll cells are near the top of the leaf and packed with…', a: 'chloroplasts, to absorb as much light as possible', w: ['mitochondria only', 'xylem', 'stomata'], why: 'The spongy mesophyll has air spaces for gas exchange.' },
    { q: 'Stomata are…', a: 'pores, mainly on the lower surface, that let CO₂ in and O₂ and water vapour out', w: ['cells that make chlorophyll', 'tubes that carry water', 'the waxy layer'], why: 'Guard cells open and close them.' }
  ]);
  G.bPhotoRate = () => { const b = pick([12, 18, 24, 30, 36, 45]), t = pick([2, 3, 5]); return num(`<p>A pondweed released ${b} bubbles of oxygen in ${t} minutes. What is the rate of photosynthesis in bubbles per minute?</p>`, b / t, 'bubbles/min', [`rate = ${b} ÷ ${t} = <b>${n(r(b / t, 2))} bubbles per minute</b>`], 'rate = bubbles ÷ time'); };
  bank('bPlantTransport', [
    { q: 'Water moves through a plant along the path…', a: 'root hair cell → root cortex → xylem → mesophyll cells', w: ['xylem → root hair → phloem → leaf', 'leaf → stem → root', 'phloem → xylem → root hair'], why: 'Then it evaporates and diffuses out through the stomata.' },
    { q: 'Transpiration is…', a: 'the loss of water vapour from leaves', w: ['the transport of sugar', 'the uptake of water by roots', 'photosynthesis at night'], why: 'Mostly through the stomata.' },
    { q: 'Which increases the rate of transpiration?', a: 'Windy, warm, dry, bright conditions', w: ['Humid, still, cold, dark conditions', 'Covering the leaves', 'Closing the stomata'], why: 'Wind and dry air keep the concentration gradient of water vapour steep.' },
    { q: 'Water rises up the xylem because…', a: 'transpiration pull draws up a column of water molecules held together by attraction', w: ['the roots pump it with energy', 'the phloem pushes it', 'gravity pulls it up'], why: 'Water evaporating from the leaves pulls the column up.' },
    { q: 'Xylem vessels are adapted by having…', a: 'thick lignified walls, no cell contents, and no cross walls', w: ['many chloroplasts', 'living cytoplasm and nuclei', 'sieve plates and companion cells'], why: 'A long, strong, open tube.' },
    { q: 'Translocation is…', a: 'the movement of sucrose and amino acids in the phloem from sources to sinks', w: ['water moving up the xylem', 'gas exchange in leaves', 'roots absorbing ions'], why: 'E.g. from leaves to roots or fruits.' },
    { q: 'A plant wilts when…', a: 'it loses more water than it takes in, so its cells become flaccid', w: ['it has too much water', 'it photosynthesises fast', 'its xylem is full'], why: 'Turgor pressure is lost.' },
    { q: 'Root hair cells are adapted for absorbing water by…', a: 'their large surface area', w: ['having chloroplasts', 'having thick walls', 'being dead'], why: 'Long thin extensions into the soil.' }
  ]);
  bank('bDiet', [
    { q: 'Which nutrient is the main source of energy?', a: 'Carbohydrate', w: ['Protein', 'Vitamin C', 'Fibre'], why: 'Lipids also give energy (and insulation); proteins are for growth and repair.' },
    { q: 'A lack of vitamin C causes…', a: 'scurvy', w: ['rickets', 'anaemia', 'diabetes'], why: 'Bleeding gums, poor wound healing. Citrus fruits are a good source.' },
    { q: 'A lack of vitamin D or calcium causes…', a: 'rickets (soft, weak bones)', w: ['scurvy', 'anaemia', 'goitre'], why: 'Both are needed for strong bones and teeth.' },
    { q: 'A lack of iron causes…', a: 'anaemia', w: ['rickets', 'scurvy', 'obesity'], why: 'Iron is needed to make haemoglobin, so less oxygen is carried.' },
    { q: 'Fibre (roughage) is important because it…', a: 'helps food move through the gut and prevents constipation', w: ['provides lots of energy', 'builds muscle', 'carries oxygen'], why: 'Found in vegetables and wholegrains.' },
    { q: 'A balanced diet contains…', a: 'all the nutrients in the right amounts for a person\'s needs', w: ['only protein', 'as much energy as possible', 'no fat at all'], why: 'Needs depend on age, activity and pregnancy.' }
  ]);
  bank('bDigestion', [
    { q: 'Amylase breaks down…', a: 'starch into maltose', w: ['protein into amino acids', 'fat into fatty acids', 'maltose into glucose'], why: 'Maltase then breaks maltose into glucose.' },
    { q: 'Protease (pepsin, trypsin) breaks down…', a: 'protein into amino acids', w: ['starch into maltose', 'fats into glycerol', 'glucose into starch'], why: 'Pepsin in the stomach; trypsin in the duodenum.' },
    { q: 'Lipase breaks down…', a: 'fats into fatty acids and glycerol', w: ['proteins into amino acids', 'starch into glucose', 'bile into salts'], why: 'Bile emulsifies fat first.' },
    { q: 'Bile helps digestion by…', a: 'emulsifying fats, increasing the surface area for lipase', w: ['digesting protein', 'killing bacteria', 'absorbing water'], why: 'It is made in the liver and stored in the gall bladder.' },
    { q: 'Hydrochloric acid in the stomach…', a: 'kills ingested bacteria', w: ['digests starch', 'emulsifies fat', 'absorbs nutrients'], why: 'It also gives pepsin its best pH.' },
    { q: 'Physical digestion is important because it…', a: 'increases the surface area of food for enzymes to work on', w: ['changes food molecules chemically', 'absorbs nutrients', 'makes enzymes'], why: 'Chewing and churning.' },
    { q: 'Which teeth are for grinding and chewing?', a: 'Molars and premolars', w: ['Incisors', 'Canines', 'All teeth equally'], why: 'Incisors cut and bite; canines grip and tear.' },
    { q: 'The hardest outer layer of a tooth is…', a: 'enamel', w: ['dentine', 'pulp', 'cement'], why: 'Pulp contains nerves and blood vessels.' },
    { q: 'Peristalsis is…', a: 'waves of muscle contraction that push food along the gut', w: ['the digestion of fat', 'absorption in the ileum', 'chewing'], why: 'Circular and longitudinal muscles work together.' },
    { q: 'Most foods must be digested before absorption because…', a: 'large molecules are too big to pass through the gut wall into the blood', w: ['they are too hot', 'they contain bacteria', 'enzymes are poisonous'], why: 'Only small soluble molecules can be absorbed.' },
    { q: 'Where are most nutrients absorbed?', a: 'The small intestine (ileum)', w: ['The stomach', 'The large intestine', 'The mouth'], why: 'Most water is also absorbed there.' },
    { q: 'Villi help absorption by…', a: 'greatly increasing the surface area, with capillaries and a lacteal close by', w: ['making enzymes', 'storing food', 'producing bile'], why: 'Microvilli increase it even more. Lacteals absorb fatty acids and glycerol.' },
    { q: 'The hepatic portal vein carries…', a: 'absorbed nutrients from the ileum to the liver', w: ['oxygen to the lungs', 'urine to the bladder', 'bile to the duodenum'], why: 'The liver processes them.' },
    { q: 'Assimilation is…', a: 'the uptake and use of nutrients by body cells', w: ['the breakdown of food', 'the removal of waste', 'swallowing'], why: 'E.g. amino acids built into proteins.' }
  ]);
  bank('bBreathing', [
    { q: 'Compared with inspired air, expired air contains…', a: 'less oxygen, more carbon dioxide and more water vapour', w: ['more oxygen and less carbon dioxide', 'the same gases', 'no oxygen at all'], why: 'About 16% O₂ and 4% CO₂ instead of 21% and 0.04%.' },
    { q: 'When you breathe in, the diaphragm…', a: 'contracts and flattens', w: ['relaxes and domes up', 'stays still', 'moves the ribs down'], why: 'The external intercostals contract, lifting the ribs up and out. Volume up, pressure down, air rushes in.' },
    { q: 'Air enters the lungs because…', a: 'the volume of the thorax increases, lowering the pressure', w: ['the lungs suck it in with muscles', 'the pressure in the thorax rises', 'the diaphragm relaxes'], why: 'Air moves from high to low pressure.' },
    { q: 'Alveoli are good gas exchange surfaces because they…', a: 'have a huge surface area, thin walls and a good blood supply', w: ['are thick and muscular', 'have few capillaries', 'are dry'], why: 'Also kept ventilated with air.' },
    { q: 'Goblet cells…', a: 'make mucus that traps dust and pathogens', w: ['carry oxygen', 'digest food', 'sweep mucus with cilia'], why: 'Ciliated cells sweep the mucus away.' },
    { q: 'During exercise, breathing gets faster and deeper to…', a: 'supply more oxygen and remove more carbon dioxide', w: ['cool the lungs', 'remove lactic acid directly', 'slow the heart'], why: 'Muscles respire faster.' },
    { q: 'Atmospheric air is about…', a: '78% nitrogen, 21% oxygen, 0.04% carbon dioxide', w: ['21% nitrogen, 78% oxygen', '50% oxygen', '4% carbon dioxide'], why: 'Plus some noble gases and water vapour.' }
  ]);
  bank('bRespiration', [
    { q: 'Respiration is…', a: 'the chemical reactions in all living cells that release energy from glucose', w: ['breathing in and out', 'gas exchange in the lungs', 'only in muscles'], why: 'It happens in every living cell, all the time.' },
    { q: 'The word equation for aerobic respiration is…', a: 'glucose + oxygen → carbon dioxide + water', w: ['carbon dioxide + water → glucose + oxygen', 'glucose → lactic acid', 'glucose → ethanol + carbon dioxide'], why: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. A relatively large amount of energy.' },
    { q: 'Anaerobic respiration in human muscles makes…', a: 'lactic acid', w: ['ethanol and carbon dioxide', 'carbon dioxide and water', 'glucose'], why: 'Glucose → lactic acid. A small amount of energy.' },
    { q: 'Anaerobic respiration in yeast makes…', a: 'ethanol and carbon dioxide', w: ['lactic acid', 'oxygen', 'water only'], why: 'Used to make bread rise and to make alcohol.' },
    { q: 'After hard exercise you keep breathing fast because…', a: 'oxygen is needed to break down the lactic acid (the oxygen debt)', w: ['your lungs are tired', 'you need more nitrogen', 'lactic acid is a gas'], why: 'The heart keeps beating fast to carry lactic acid to the liver.' },
    { q: 'Which is a use of energy from respiration?', a: 'Muscle contraction', w: ['Photosynthesis', 'Diffusion', 'Osmosis'], why: 'Also protein synthesis, cell division, active transport, growth, nerve impulses and keeping warm.' },
    { q: 'Yeast respires faster at 35 °C than 15 °C because…', a: 'its enzymes work faster at warmer temperatures', w: ['it photosynthesises', 'it is denatured', 'it uses less glucose'], why: 'Too hot and the enzymes denature.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'biology', id: 'bi-cells', name: 'Cells and classification', icon: '🔬', color: '#16a34a', book: BOOK,
    blurb: 'Syllabus sections 1–2: cell structure, specialised cells, magnification and classifying living things.',
    lessons: [
      { id: 'bi-cells', title: 'Animal, plant and bacterial cells', obj: ['1.1'], kw: 'cell structure organelles plant animal bacteria', learn: [],
        hook: 'Every living thing is built from tiny boxes called cells.',
        scenes: [
          { say: idea('A cell is a tiny factory. Each part has a <b>job</b>: the <b>nucleus</b> holds the instructions (DNA), <b>mitochondria</b> release energy, <b>ribosomes</b> make proteins, the <b>membrane</b> controls what goes in and out. Plants add <b>chloroplasts</b> (make food), a <b>cell wall</b> (support) and a <b>vacuole</b> (keeps them firm).') },
          { say: 'Explore each type of cell. Tap through the parts.', anim: X([{ k: 't', label: 'Cell', min: 0, max: 2, v: 1, fmt: i => ['animal', 'plant', 'bacterium'][i] }, { k: 'p', label: 'Highlight part', min: 0, max: 7, v: 2 }], v => { const type = ['animal', 'plant', 'bacteria'][v.t], parts = PARTS[type], part = parts[v.p % parts.length][0]; const jobs = { 'cell membrane': 'controls what enters and leaves', cytoplasm: 'where most reactions happen', nucleus: 'contains DNA, controls the cell', mitochondria: 'aerobic respiration: releases energy', ribosomes: 'make proteins', 'cellulose cell wall': 'supports; stops the cell bursting', 'sap vacuole': 'stores sap; keeps the cell turgid', chloroplasts: 'photosynthesis (contain chlorophyll)', 'cell wall': 'supports and protects', 'circular DNA': 'the bacterium\'s main genes (no nucleus)', plasmids: 'small extra loops of DNA' }; return `${S.cell(type, part)}<p class="center bigq">${part}</p><p class="center">${jobs[part]}</p>`; }) },
          { say: 'Spot the differences:', pic: '<table class="tbl"><tr><th></th><th>animal</th><th>plant</th><th>bacterium</th></tr><tr><td>nucleus</td><td>✅</td><td>✅</td><td>❌ circular DNA</td></tr><tr><td>cell wall</td><td>❌</td><td>✅ cellulose</td><td>✅</td></tr><tr><td>chloroplasts</td><td>❌</td><td>✅</td><td>❌</td></tr><tr><td>large vacuole</td><td>❌</td><td>✅</td><td>❌</td></tr><tr><td>plasmids</td><td>❌</td><td>❌</td><td>✅</td></tr></table>',
            ask: T('A cell has a cell wall, ribosomes and plasmids but no nucleus. It is…', ['a bacterium', 'a plant cell', 'an animal cell'], 0, 'Plasmids and no nucleus → prokaryote.') },
          { say: 'In the lab: stain onion (plant) cells with <b>iodine</b>, cheek (animal) cells with <b>methylene blue</b>, then look under the microscope and draw what you see.' }
        ],
        keys: ['Animal: membrane, cytoplasm, nucleus, mitochondria, ribosomes.', 'Plant adds: cellulose wall, chloroplasts, sap vacuole.', 'Bacterium: wall, membrane, cytoplasm, ribosomes, circular DNA, plasmids (no nucleus).'],
        gens: ['bCells'], easy: ['bCells'] },
      { id: 'bi-specialised', title: 'Specialised cells and magnification', obj: ['1.2'], kw: 'specialised cells tissues organs magnification', learn: [],
        hook: 'A nerve cell can be a metre long. A red blood cell has no nucleus. Why?',
        scenes: [
          { say: idea('Cells <b>specialise</b>: their <b>shape fits their job</b>. Similar cells form <b>tissues</b>, tissues form <b>organs</b>, organs form <b>organ systems</b>, and systems make an <b>organism</b>.') },
          { say: 'Build up a body:', anim: { type: 'reveal', keep: true, stages: ['<p class="center bigq">🔴 cell (muscle cell)</p>', '<p class="center bigq">➡️ tissue (muscle tissue)</p>', '<p class="center bigq">➡️ organ (heart)</p>', '<p class="center bigq">➡️ organ system (circulatory system)</p>', '<p class="center bigq">➡️ organism (you!)</p>'] } },
          { say: 'Microscopes make cells look bigger. How much bigger?', anim: X([{ k: 'm', label: 'Magnification', min: 10, max: 400, step: 10, v: 100 }], v => `<p class="center">Real cell: 0.05 mm</p><p class="center bigq">Image = 0.05 × ${v.m} = ${n(r(0.05 * v.m, 2))} mm</p><div class="xbar"><div style="width:${Math.min(100, v.m / 4)}%"></div></div>`) },
          { say: 'The formula:', pic: eq('magnification = image size ÷ actual size', 'same units! 1 mm = 1000 µm'),
            ask: T('An image is 20 mm; the real object is 0.1 mm. Magnification?', ['× 200', '× 2', '× 0.005', '× 20'], 0, '20 ÷ 0.1 = 200.') }
        ],
        keys: ['Structure fits function (e.g. root hair, red blood cell, ciliated cell).', 'cell → tissue → organ → organ system → organism.', 'magnification = image size ÷ actual size (same units).'],
        gens: ['bMagnif', 'bOrganisation'], easy: ['bOrganisation'] },
      { id: 'bi-classify', title: 'Classifying living things', obj: ['2.1', '2.2'], kw: 'classification species binomial kingdoms vertebrates arthropods keys viruses', learn: [],
        hook: 'Sorting millions of species into a family tree.',
        scenes: [
          { say: idea('Scientists sort organisms into groups by the <b>features they share</b>. The smallest group is a <b>species</b>: organisms that can breed together and have <b>fertile</b> offspring. Every species gets a two-part Latin name: <i>Genus species</i>.') },
          { say: 'Five kingdoms:', pic: '<ul><li>🐾 <b>Animal</b>: many cells, no cell wall, feed on others</li><li>🌿 <b>Plant</b>: many cells, cellulose walls, chlorophyll</li><li>🍄 <b>Fungus</b>: cell walls, no chlorophyll, feed on dead or living matter</li><li>🦠 <b>Prokaryote</b>: one cell, no nucleus (bacteria)</li><li>🌊 <b>Protoctist</b>: mostly one cell with a nucleus (e.g. Amoeba)</li></ul>' },
          { say: 'Use a key: pick an animal and follow the questions.', anim: X([{ k: 'a', label: 'Animal', min: 0, max: 4, v: 0, fmt: i => ['frog', 'eagle', 'shark', 'cat', 'lizard'][i] }], v => { const p = [['no', 'no', 'no', 'moist skin, eggs in water → amphibian'], ['yes: feathers → bird'], ['no', 'no', 'yes: fins and scales → fish'], ['no', 'yes: fur → mammal'], ['no', 'no', 'no', 'dry scales → reptile']][v.a]; const qs = ['Feathers?', 'Fur?', 'Fins?', '…']; return `<p class="center bigq">${['🐸', '🦅', '🦈', '🐈', '🦎'][v.a]}</p><ol>${p.map((x, i) => `<li>${qs[i] || ''} ${x}</li>`).join('')}</ol>`; }) },
          { say: 'Arthropods (jointed legs): <b>insects</b> (6 legs), <b>arachnids</b> (8 legs), <b>crustaceans</b> (2 pairs of antennae), <b>myriapods</b> (many legs). Plants: <b>ferns</b> (spores) and <b>flowering plants</b> (monocots with parallel veins; dicots with branching veins).',
            ask: T('A virus…', ['has a protein coat and genetic material, and can only reproduce inside living cells', 'is a small bacterium', 'has a nucleus'], 0, 'Viruses aren\'t cells at all.') }
        ],
        keys: ['Species: breed together → fertile offspring.', 'Binomial name: Genus species.', 'Five kingdoms; vertebrate and arthropod groups; ferns and flowering plants.', 'Dichotomous keys: two choices at each step. Viruses: protein coat + genetic material.'],
        gens: ['bClassify'], easy: ['bClassify'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-move', name: 'Molecules, transport and enzymes', icon: '💧', color: '#0891b2', book: BOOK,
    blurb: 'Syllabus sections 3–5: diffusion, osmosis, active transport, biological molecules, food tests and enzymes.',
    lessons: [
      { id: 'bi-diffusion', title: 'Diffusion, osmosis and active transport', obj: ['3.1', '3.2'], kw: 'diffusion osmosis water potential active transport turgid plasmolysis', learn: [],
        hook: 'Why a salad goes limp, and why sea water can\'t quench your thirst.',
        scenes: [
          { say: idea('Particles are always jiggling randomly, so they spread from <b>crowded</b> places to <b>less crowded</b> places on their own: <b>diffusion</b>. <b>Osmosis</b> is the same idea for <b>water</b> crossing a membrane: water moves to where it is <b>less</b> plentiful (lower water potential).') },
          { say: 'Put a plant cell into different solutions.', anim: X([{ k: 's', label: 'Solution', min: 0, max: 4, v: 2, fmt: i => ['pure water', 'dilute', 'same as the cell', 'concentrated', 'very salty'][i] }, { k: 'p', label: 'Cell type', min: 0, max: 1, v: 0, fmt: i => ['plant cell', 'red blood cell'][i] }], v => { const k = [1, .5, 0, -.5, -1][v.s]; return `${S.osmoCell(k, !v.p)}<p class="center bigq">${k > 0 ? 'water moves IN' : k < 0 ? 'water moves OUT' : 'no net movement'}</p><p class="center">${v.p ? (k > .6 ? '💥 swells and bursts (no cell wall)' : k > 0 ? 'swells' : k < 0 ? 'shrinks and crinkles' : 'normal') : (k > 0 ? '<b>turgid</b>: firm, pushing on the wall' : k < -.6 ? '<b>plasmolysed</b>: membrane pulls off the wall' : k < 0 ? '<b>flaccid</b>: soft and floppy' : 'normal')}</p>`; }) },
          { say: 'Diffusion is faster with a <b>bigger surface area</b>, <b>higher temperature</b>, <b>steeper concentration gradient</b> and <b>shorter distance</b>. The energy comes from the particles\' own movement, not from the cell.',
            ask: T('Salted strawberries become soft and shrunken because…', ['water leaves their cells by osmosis', 'salt enters and dissolves the cells', 'they lose sugar'], 0, 'The salty outside has a lower water potential.') },
          { say: '<b>Active transport</b> pushes particles the <b>other way</b>, from low to high concentration, using <b>energy from respiration</b>. Root hair cells use it to take in mineral ions from soil where they are scarce.' }
        ],
        keys: ['Diffusion: net movement down a concentration gradient, by random motion.', 'Osmosis: water, from high to low water potential, across a partially permeable membrane.', 'Plant cells: turgid / flaccid / plasmolysed. Animal cells can burst.', 'Active transport: against the gradient, uses energy.'],
        gens: ['bOsmosis', 'bDiffusion'], easy: ['bDiffusion'] },
      { id: 'bi-molecules', title: 'Biological molecules and food tests', obj: ['4.1'], kw: 'carbohydrates proteins lipids food tests benedicts biuret iodine', learn: [],
        hook: 'Four simple tests to find out what is in your food.',
        scenes: [
          { say: idea('Big food molecules are <b>chains of small units</b>: starch is a chain of <b>glucose</b>, proteins are chains of <b>amino acids</b>, fats are built from <b>fatty acids and glycerol</b>. Simple chemical tests change colour to show which are present.') },
          { say: 'Test a food.', anim: X([{ k: 't', label: 'Test', min: 0, max: 3, v: 0, fmt: i => ['iodine (starch)', 'Benedict\'s, heated (glucose)', 'biuret (protein)', 'ethanol emulsion (fat)'][i] }, { k: 'y', label: 'Present?', min: 0, max: 1, v: 1, fmt: i => ['no', 'yes'][i] }], v => { const c = [['#b45309', '#1e1b4b', 'orange-brown → blue-black'], ['#2563eb', '#b91c1c', 'blue → brick-red'], ['#3b82f6', '#7e22ce', 'blue → purple'], ['#e2e8f0', '#f8fafc', 'clear → milky white']][v.t]; return `${S.svg(100, 140, `<rect x="35" y="10" width="30" height="110" rx="12" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="36" y="64" width="28" height="54" rx="10" fill="${v.y ? c[1] : c[0]}" opacity=".9"/>`, 100)}<p class="center">${v.y ? '✅ positive: ' + c[2].split('→')[1] : 'negative: stays ' + c[2].split('→')[0]}</p>`; }) },
          { say: 'Elements: carbohydrates and lipids contain <b>C, H, O</b>; proteins also have <b>N</b>; DNA has C, H, O, N and <b>P</b>.', ask: T('Glycogen, starch and cellulose are all made of…', ['glucose', 'amino acids', 'fatty acids', 'nucleotides'], 0, 'Three different ways of chaining glucose.') }
        ],
        keys: ['Starch, cellulose, glycogen ← glucose; proteins ← amino acids; lipids ← fatty acids + glycerol; DNA ← nucleotides.', 'Iodine: blue-black (starch). Benedict\'s (heat): brick-red (reducing sugar). Biuret: purple (protein). Ethanol: milky (lipid).'],
        gens: ['bMolecules'], easy: ['bMolecules'] },
      { id: 'bi-enzymes', title: 'Enzymes', obj: ['5.1', '5.2'], kw: 'enzymes active site lock and key denaturation temperature ph', learn: [],
        hook: 'Your body runs on thousands of tiny molecular machines.',
        scenes: [
          { say: idea('Enzymes are <b>protein catalysts</b>: they speed up reactions without being used up. Each has an <b>active site</b> with a shape that fits only its own <b>substrate</b>, like a <b>lock and key</b>. Change the shape (too hot, wrong pH) and the key no longer fits.') },
          { say: 'Heat up an enzyme.', anim: X([{ k: 't', label: 'Temperature (°C)', min: 0, max: 70, step: 5, v: 37 }], v => { const a = v.t <= 37 ? v.t / 37 : Math.max(0, 1 - (v.t - 37) / 18); return `${K.plot([{ f: x => x <= 37 ? x / 37 : Math.max(0, 1 - (x - 37) / 18) }], [{ x: v.t, y: a }], { xmin: 0, xmax: 70, ymin: 0, ymax: 1.15, h: 170, gstep: 1e9, lstep: 1e9, xlab: 'temperature', ylab: 'activity' })}<p class="center">${v.t < 30 ? 'Cold: molecules move slowly, few effective collisions.' : v.t <= 42 ? '🎯 Optimum: fastest.' : v.t < 55 ? 'Too hot: the active site is changing shape.' : '💀 Denatured: the substrate no longer fits. Permanent.'}</p>`; }) },
          { say: 'pH matters too: <b>pepsin</b> in the acidic stomach works best at about pH 2; <b>trypsin</b> in the duodenum works best at a higher pH.', pic: K.plot([{ f: x => Math.exp(-((x - 2) ** 2) / 1.2) }, { f: x => Math.exp(-((x - 8) ** 2) / 1.6), dash: true }], [], { xmin: 0, xmax: 12, ymin: 0, ymax: 1.2, h: 160, gstep: 1e9, lstep: 2, xlab: 'pH', ylab: 'activity' }) + '<p class="center small muted">solid: pepsin · dashed: trypsin</p>',
            ask: T('Why does each enzyme only act on one substrate?', ['Its active site has a complementary shape to that substrate', 'It is used up', 'It is alive'], 0, 'Lock and key.') }
        ],
        keys: ['Enzyme: protein, biological catalyst, unchanged.', 'Substrate + active site → enzyme–substrate complex → products.', 'Specific: complementary shapes (lock and key).', 'Temperature: optimum then denatured. pH: optimum depends on the enzyme.'],
        gens: ['bEnzymeRate', 'bEnzymes'], easy: ['bEnzymes'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-plants', name: 'Plants', icon: '🌿', color: '#65a30d', book: BOOK,
    blurb: 'Syllabus sections 6–7: photosynthesis, limiting factors, leaves, minerals, and water and sugar transport.',
    lessons: [
      { id: 'bi-photo', title: 'Photosynthesis', obj: ['6.1', '6.3'], kw: 'photosynthesis chlorophyll limiting factors light carbon dioxide', learn: [],
        hook: 'Plants make their own food out of air, water and sunlight.',
        scenes: [
          { say: idea('Plants capture <b>light energy</b> with green <b>chlorophyll</b> and use it to build <b>glucose</b> from <b>carbon dioxide</b> and <b>water</b>, giving off <b>oxygen</b>. Almost all food on Earth starts here.') },
          { say: 'The equation:', pic: eq('carbon dioxide + water → glucose + oxygen', 'light energy, chlorophyll') + eq('6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂') },
          { say: 'Count the oxygen bubbles from pondweed. Change the light and CO₂.', anim: X([{ k: 'L', label: 'Light intensity', min: 0, max: 10, v: 4 }, { k: 'C', label: 'Carbon dioxide', min: 1, max: 10, v: 5 }], v => { const rate = Math.min(v.L * 3, v.C * 3); const lim = v.L * 3 < v.C * 3 ? 'light' : v.C * 3 < v.L * 3 ? 'carbon dioxide' : 'both'; return `<p class="center bigq">${'🫧'.repeat(Math.max(0, Math.round(rate / 3)))} ${rate} bubbles/min</p><p class="center">Limiting factor: <b>${lim}</b></p><p class="center small muted">Raising the factor in shortest supply is the only thing that helps (temperature can limit it too).</p>`; }) },
          { say: 'Glucose is used for respiration, stored as <b>starch</b>, built into <b>cellulose</b> walls, and sent round the plant as <b>sucrose</b>. Plants also need <b>nitrate</b> ions (to make amino acids for proteins) and <b>magnesium</b> ions (to make chlorophyll).',
            ask: T('A plant with yellow leaves is probably short of…', ['magnesium', 'nitrogen gas', 'oxygen'], 0, 'No magnesium → not enough chlorophyll.') },
          { say: 'To prove a factor is needed, destarch a plant (leave it in the dark), change ONE factor, keep a control, and test a leaf for starch with iodine.' }
        ],
        keys: ['CO₂ + water → glucose + oxygen (light, chlorophyll). 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', 'Uses of glucose: respiration, starch, cellulose, sucrose for transport.', 'Limiting factors: light, CO₂, temperature.', 'Nitrate → proteins; magnesium → chlorophyll.'],
        gens: ['bPhotoRate', 'bPhotosynthesis'], easy: ['bPhotosynthesis'] },
      { id: 'bi-leaf', title: 'Leaves', obj: ['6.2'], kw: 'leaf structure palisade spongy mesophyll stomata cuticle', learn: [],
        hook: 'A leaf is a solar panel designed by evolution.',
        scenes: [
          { say: idea('Every part of a leaf helps it <b>catch light</b> and <b>swap gases</b>. It is <b>broad</b> (big surface for light) and <b>thin</b> (short distance for gases). Inside, cells are arranged in layers like a carefully designed factory.') },
          { say: 'Travel down through a leaf.', anim: X([{ k: 'l', label: 'Layer', min: 0, max: 5, v: 1, fmt: i => ['cuticle', 'upper epidermis', 'palisade mesophyll', 'spongy mesophyll', 'vascular bundle', 'stomata and guard cells'][i] }], v => `<p class="center bigq">${['🛡️', '🪟', '🟩🟩🟩', '🫧', '🚰', '👄'][v.l]}</p><p class="center">${['Waxy and waterproof: reduces water loss.', 'Thin and transparent: lets light through.', 'Tall cells packed with chloroplasts: most photosynthesis happens here.', 'Loose cells with air spaces: gases diffuse in and out.', 'Xylem brings water; phloem takes sugars away.', 'Pores (mostly underneath): let CO₂ in and O₂ and water vapour out. Guard cells open and close them.'][v.l]}</p>`) },
          { say: 'Why most stomata are on the <b>underside</b>: it is shaded and cooler there, so less water is lost.', ask: T('Where do most chloroplasts sit?', ['Palisade mesophyll', 'Cuticle', 'Lower epidermis', 'Xylem'], 0, 'Near the top, where the light is strongest.') }
        ],
        keys: ['Broad (light) and thin (gas diffusion).', 'Cuticle, epidermis, palisade (photosynthesis), spongy (air spaces), xylem and phloem, stomata and guard cells.'],
        gens: ['bPhotosynthesis'], easy: ['bPhotosynthesis'] },
      { id: 'bi-plant-transport', title: 'Water and sugar transport in plants', obj: ['7.1', '7.2'], kw: 'xylem phloem transpiration translocation root hair', learn: [],
        hook: 'How a 100 m tree lifts water to its top leaves with no pump.',
        scenes: [
          { say: idea('Water <b>evaporates</b> from the leaves (transpiration). That pulls the whole <b>column of water</b> up the <b>xylem</b>, because water molecules stick together. Roots soak up more from the soil. Sugar travels separately in the <b>phloem</b>, from where it is made to where it is needed.') },
          { say: 'Change the weather and watch transpiration.', anim: X([{ k: 'w', label: 'Wind', min: 0, max: 5, v: 2 }, { k: 'h', label: 'Humidity', min: 0, max: 5, v: 2 }, { k: 't', label: 'Temperature', min: 0, max: 5, v: 3 }], v => { const rate = Math.max(0, r((1 + v.w * .4) * (1 + v.t * .3) * (1.2 - v.h * .2), 1)); return `<p class="center bigq">💨 water loss ≈ ${rate}</p><div class="xbar"><div style="width:${Math.min(100, rate * 12)}%"></div></div><p class="center small muted">Windy, warm, dry (low humidity), bright → fastest. Humid, still, cold → slowest.</p>`; }) },
          { say: 'The path of water: <b>root hair cell → root cortex → xylem → leaf mesophyll cells</b> → evaporates into air spaces → diffuses out through stomata.', pic: '<p class="center">🌱 Xylem: thick walls with lignin, no cell contents, no cross walls → a strong open tube. It also supports the plant.</p>',
            ask: T('Translocation means…', ['moving sucrose and amino acids in the phloem from sources to sinks', 'water moving up the xylem', 'roots absorbing water'], 0, 'E.g. from leaves to growing fruit.') },
          { say: 'If a plant loses water faster than it takes it in, its cells go flaccid and it <b>wilts</b>. You can see the xylem by standing a cut stem in coloured dye.' }
        ],
        keys: ['Water path: root hair → cortex → xylem → mesophyll → stomata.', 'Transpiration pull; water molecules attract each other.', 'Faster transpiration: wind, warmth, low humidity, light.', 'Phloem: translocation of sucrose and amino acids (source → sink).'],
        gens: ['bPlantTransport'], easy: ['bPlantTransport'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-humans1', name: 'Nutrition, breathing and respiration', icon: '🍎', color: '#ea580c', book: BOOK,
    blurb: 'Syllabus sections 8–10: diet, the digestive system, absorption, gas exchange and respiration.',
    lessons: [
      { id: 'bi-diet', title: 'A balanced diet', obj: ['8.1'], kw: 'balanced diet nutrients vitamins minerals deficiency', learn: [],
        hook: 'You really are what you eat.',
        scenes: [
          { say: idea('Food gives you <b>energy</b> (carbohydrates, fats), <b>building materials</b> (proteins, calcium) and <b>helpers</b> (vitamins, iron). Missing one causes a <b>deficiency disease</b>. A balanced diet has everything in the right amounts for <b>you</b>.') },
          { say: 'Pick a nutrient.', anim: X([{ k: 'n', label: 'Nutrient', min: 0, max: 7, v: 4, fmt: i => ['carbohydrate', 'lipid', 'protein', 'vitamin C', 'vitamin D', 'calcium', 'iron', 'fibre'][i] }], v => { const d = [['🍚 rice, bread, potatoes', 'main energy source', '–'], ['🥑 oil, butter, nuts', 'energy store, insulation', '–'], ['🥚 meat, fish, eggs, beans', 'growth and repair', '–'], ['🍊 citrus fruit, vegetables', 'healthy skin and gums', 'scurvy'], ['🐟 oily fish, sunlight on skin', 'absorbing calcium for bones', 'rickets'], ['🥛 milk, cheese', 'strong bones and teeth', 'rickets'], ['🥬 red meat, spinach, beans', 'making haemoglobin', 'anaemia'], ['🥦 vegetables, wholegrains', 'keeps food moving (peristalsis)', 'constipation']][v.n]; return `<p class="center bigq">${d[0]}</p><p class="center">Why: <b>${d[1]}</b></p><p class="center">Deficiency: <b>${d[2]}</b></p>`; }) },
          { say: 'Water is needed too: it dissolves things for digestion, excretion and transport.', ask: T('A person with soft, bowed leg bones may lack…', ['vitamin D or calcium', 'vitamin C', 'iron', 'fibre'], 0, 'Rickets.') }
        ],
        keys: ['Carbohydrates, lipids, proteins, vitamins C and D, calcium, iron, fibre, water.', 'Scurvy (vit C), rickets (vit D, calcium), anaemia (iron).', 'Balanced diet depends on age, activity, pregnancy.'],
        gens: ['bDiet'], easy: ['bDiet'] },
      { id: 'bi-digestion', title: 'Digestion and absorption', obj: ['8.2', '8.3'], kw: 'digestion enzymes amylase protease lipase bile villi absorption', learn: [],
        hook: 'A 9-metre journey that turns a sandwich into you.',
        scenes: [
          { say: idea('Food molecules are too <b>big</b> to get into your blood. So the gut <b>breaks them up</b>: physically (teeth, churning) to make more surface, then chemically with <b>enzymes</b> into small soluble molecules that can be <b>absorbed</b> in the small intestine.') },
          { say: 'Follow a meal through the gut.', anim: X([{ k: 's', label: 'Stop', min: 0, max: 5, v: 0, fmt: i => ['mouth', 'stomach', 'duodenum', 'ileum', 'liver', 'large intestine'][i] }], v => `<p class="center bigq">${['👄', '🫃', '🔄', '🌀', '🟤', '💧'][v.s]}</p><p class="center">${['Teeth chew (incisors cut, canines tear, molars grind). Saliva\'s <b>amylase</b> starts on starch.', '<b>Hydrochloric acid</b> kills bacteria. <b>Pepsin</b> (a protease) digests protein at pH 2. Churning mixes everything.', 'Pancreatic juice: <b>amylase, trypsin, lipase</b>. <b>Bile</b> from the liver emulsifies fats into tiny droplets.', 'Maltase finishes sugars. Small molecules are <b>absorbed</b> through millions of <b>villi</b>.', 'The <b>hepatic portal vein</b> brings absorbed food here to be processed.', 'Remaining water is absorbed; waste is egested.'][v.s]}</p>`) },
          { say: 'The enzymes:', pic: '<table class="tbl"><tr><th>enzyme</th><th>breaks down</th><th>into</th></tr><tr><td>amylase</td><td>starch</td><td>maltose</td></tr><tr><td>maltase</td><td>maltose</td><td>glucose</td></tr><tr><td>protease (pepsin, trypsin)</td><td>protein</td><td>amino acids</td></tr><tr><td>lipase</td><td>fats</td><td>fatty acids + glycerol</td></tr></table>',
            ask: T('Bile helps digest fat by…', ['emulsifying it, giving lipase more surface area', 'breaking bonds in fat molecules', 'killing bacteria'], 0, 'Bile is not an enzyme.') },
          { say: 'Villi have a huge surface area, thin walls, <b>capillaries</b> (take glucose and amino acids) and a <b>lacteal</b> (takes fatty acids and glycerol). <b>Peristalsis</b>: muscle waves push food along. <b>Assimilation</b>: cells use the absorbed nutrients.' }
        ],
        keys: ['Physical digestion increases surface area; chemical digestion breaks large → small molecules.', 'Amylase, maltase, protease (pepsin, trypsin), lipase; bile emulsifies; HCl kills bacteria.', 'Absorption in the small intestine via villi (capillaries, lacteals).', 'Hepatic portal vein → liver; assimilation.'],
        gens: ['bDigestion'], easy: ['bDigestion'] },
      { id: 'bi-breathing', title: 'Gas exchange and breathing', obj: ['9.1'], kw: 'lungs alveoli breathing gas exchange inspired expired air', learn: [],
        hook: 'You breathe about 20 000 times a day. Here is how it works.',
        scenes: [
          { say: idea('Breathing changes the <b>volume</b> of your chest. Bigger chest → lower pressure → air rushes <b>in</b>. In the lungs, oxygen <b>diffuses</b> into the blood through millions of tiny <b>alveoli</b>, which have a huge, thin, well-supplied surface.') },
          { say: 'Breathe in and out.', anim: X([{ k: 'b', label: 'Breath', min: 0, max: 1, v: 0, fmt: i => ['breathing in', 'breathing out'][i] }], v => `<p class="center bigq">${v.b ? '😮‍💨' : '😤'}</p><p class="center">${v.b ? 'Diaphragm <b>relaxes</b> (domes up), external intercostals relax, ribs move <b>down and in</b> → volume ↓, pressure ↑ → air goes <b>out</b>.' : 'Diaphragm <b>contracts</b> (flattens), external intercostals contract, ribs move <b>up and out</b> → volume ↑, pressure ↓ → air comes <b>in</b>.'}</p>`) },
          { say: 'What changes in the air you breathe:', pic: '<table class="tbl"><tr><th></th><th>inspired</th><th>expired</th></tr><tr><td>oxygen</td><td>21%</td><td>16%</td></tr><tr><td>carbon dioxide</td><td>0.04%</td><td>4%</td></tr><tr><td>water vapour</td><td>less</td><td>more</td></tr></table>',
            ask: T('Alveoli are efficient because they have…', ['a large surface area, thin walls and lots of capillaries', 'thick muscular walls', 'few blood vessels'], 0, 'Plus a good air supply from ventilation.') },
          { say: 'Air travels: larynx → trachea → bronchi → bronchioles → alveoli. <b>Goblet cells</b> make mucus to trap dust and pathogens; <b>ciliated cells</b> sweep it away. Exercise makes breathing faster and deeper.' }
        ],
        keys: ['Inhale: diaphragm and external intercostals contract → volume ↑, pressure ↓.', 'Alveoli: large area, thin, good blood and air supply.', 'Inspired vs expired air: O₂ 21→16%, CO₂ 0.04→4%.', 'Goblet cells (mucus) and cilia protect the airways.'],
        gens: ['bBreathing'], easy: ['bBreathing'] },
      { id: 'bi-respiration', title: 'Respiration', obj: ['10.1', '10.2', '10.3'], kw: 'aerobic anaerobic respiration lactic acid oxygen debt yeast', learn: [],
        hook: 'Breathing is not respiration. Respiration happens inside every cell, all the time.',
        scenes: [
          { say: idea('<b>Respiration</b> is how every living cell releases energy from <b>glucose</b>. With oxygen (<b>aerobic</b>) you get lots of energy. Without oxygen (<b>anaerobic</b>) you get only a little, plus a by-product (lactic acid in muscles; ethanol and CO₂ in yeast).') },
          { say: 'Sprint harder and harder.', anim: X([{ k: 'e', label: 'Effort', min: 0, max: 10, v: 3 }], v => `<p class="center bigq">${v.e < 6 ? '🏃 aerobic' : '🏃‍♂️💨 aerobic + anaerobic'}</p><p class="center">${v.e < 6 ? 'Enough oxygen reaches the muscles.' : 'Oxygen can\'t arrive fast enough: muscles also respire anaerobically, making <b>lactic acid</b>.'}</p><p class="center small muted">After exercise: keep breathing fast and deep (oxygen debt) to break down lactic acid in the liver; the heart keeps racing to carry it there.</p>`) },
          { say: 'The equations:', pic: eq('glucose + oxygen → carbon dioxide + water', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O (aerobic: lots of energy)') + eq('glucose → lactic acid', 'anaerobic, in muscles') + eq('glucose → ethanol + carbon dioxide', 'anaerobic, in yeast (bread, brewing)'),
            ask: T('Which gives the MOST energy per glucose?', ['Aerobic respiration', 'Anaerobic respiration in muscles', 'Anaerobic respiration in yeast'], 0, 'Glucose is broken down completely.') },
          { say: 'Energy is used for: muscle contraction, making proteins, cell division, active transport, growth, nerve impulses and keeping warm.' }
        ],
        keys: ['Respiration releases energy from glucose in all cells.', 'Aerobic: glucose + oxygen → CO₂ + water (lots of energy).', 'Anaerobic: muscles → lactic acid; yeast → ethanol + CO₂ (little energy).', 'Oxygen debt (EPOC) removes lactic acid after exercise.'],
        gens: ['bRespiration'], easy: ['bRespiration'] }
    ] });
})();
