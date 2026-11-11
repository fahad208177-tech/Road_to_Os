// Chemistry 5070, part 1: subject set-up, chemistry pictures, particles and bonding (sections 1–2),
// formulae and the mole (section 3).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Chemistry 2e', 'https://openstax.org/details/books/chemistry-2e'];

  R2O.addSubject({
    id: 'chemistry', name: 'Chemistry', short: 'Chemistry', icon: '🧪', color: '#059669',
    blurb: 'What everything is made of, and how it changes.',
    syl: {
      code: '5070', name: 'Cambridge O Level Chemistry', years: '2026, 2027 and 2028',
      url: 'https://www.cambridgeinternational.org/Images/697326-2026-2028-syllabus.pdf',
      areas: ['States of matter', 'Atoms, elements and compounds', 'Stoichiometry', 'Electrochemistry', 'Chemical energetics', 'Chemical reactions', 'Acids, bases and salts', 'The Periodic Table', 'Metals', 'Chemistry of the environment', 'Organic chemistry', 'Experimental techniques and chemical analysis'],
      papers: ['Paper 1 Multiple Choice: 1 hour, 40 marks, 30%. 40 four-option questions.', 'Paper 2 Theory: 1 hour 45 minutes, 80 marks, 50%. Short-answer and structured questions.', 'Paper 3 Practical Test (1 hour 30 minutes) OR Paper 4 Alternative to Practical (1 hour): 40 marks, 20%.'],
      suggest: ['Is Hess\'s law on my exam?', 'Do I need to know the Haber process?', 'Explain the mole', 'Quiz me on electrolysis', 'Is there a data sheet?', 'Are orbitals examinable?', 'What should I revise first?'],
      formulaNote: '<p><span class="verdict maybe">🧠 Mostly you need to learn them</span></p><p>The question paper includes a <b>Periodic Table</b> (with relative atomic masses), and you use <b>24 dm³</b> per mole of gas at r.t.p. You must know relationships such as moles = mass ÷ molar mass, concentration = moles ÷ volume, percentage yield, and Rf = distance moved by substance ÷ distance moved by solvent.</p>',
      offSyllabus: [
        { k: /hess/, why: 'Hess\'s law is not in 5070. You calculate enthalpy changes from bond energies (5.1).', obj: '5.1' },
        { k: /equilibrium constant|\bkc\b|\bkp\b/, why: 'Equilibrium constants (Kc, Kp) are not in 5070. You predict how the position of equilibrium moves (6.3).', obj: '6.3' },
        { k: /orbital|\bspd\b|s ?p ?d/, why: 'Orbitals are not in 5070. Electrons are described in shells, e.g. 2,8,3 (2.2).', obj: '2.2' },
        { k: /electronegativ/, why: 'Electronegativity is not in 5070.' },
        { k: /hydrogen bond|van der waals|dipole|london/, why: 'Specific types of intermolecular forces are not required in 5070 (2.5). Just "weak intermolecular forces".', obj: '2.5' },
        { k: /benzene|aromatic|arene/, why: 'Benzene and aromatic compounds are not in 5070.' },
        { k: /aldehyde|ketone/, why: 'Aldehydes and ketones are not in 5070. Organic chemistry covers alkanes, alkenes, alcohols, carboxylic acids, esters and polymers (11).' },
        { k: /ionisation energ|ionization energ/, why: 'Ionisation energies are not in 5070.' },
        { k: /vsepr|shapes? of molecules|bond angle/, why: 'Shapes of molecules and bond angles are not in 5070.' },
        { k: /le chatelier/, why: 'You don\'t need the name "Le Chatelier", but you DO need to predict how equilibrium moves when conditions change (6.3).', obj: '6.3' }
      ]
    },
    links: (kw) => [
      ['Khan Academy: chemistry videos and practice', `https://www.khanacademy.org/search?page_search_query=${kw}`],
      ['BBC Bitesize: GCSE Chemistry revision', `https://www.bbc.co.uk/bitesize/search?q=${kw}`],
      ['PhET: chemistry simulations', 'https://phet.colorado.edu/en/simulations/filter?subjects=chemistry&type=html']
    ]
  });

  // ================= chemistry kit =================
  const AR = { H: 1, He: 4, Li: 7, C: 12, N: 14, O: 16, F: 19, Ne: 20, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, Ar: 40, K: 39, Ca: 40, Mn: 55, Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108, I: 127, Ba: 137, Pb: 207 };
  S.AR = AR;
  // count atoms in a formula, e.g. "Ca(OH)2" → { Ca: 1, O: 2, H: 2 }
  S.atoms = f => {
    const stack = [{}]; const re = /([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)/g; let m;
    while ((m = re.exec(f))) {
      if (m[1]) { const top = stack[stack.length - 1]; top[m[1]] = (top[m[1]] || 0) + (+m[2] || 1); }
      else if (m[3]) stack.push({});
      else { const g = stack.pop(), k = +m[5] || 1, top = stack[stack.length - 1]; for (const e in g) top[e] = (top[e] || 0) + g[e] * k; }
    }
    return stack[0];
  };
  S.mr = f => { const a = S.atoms(f); return K.round(Object.keys(a).reduce((s, e) => s + AR[e] * a[e], 0), 2); };
  S.f = f => String(f).replace(/(\d+)/g, '<sub>$1</sub>');   // pretty formula
  S.mrSteps = f => { const a = S.atoms(f); return `M<sub>r</sub>(${S.f(f)}) = ${Object.keys(a).map(e => `${a[e] > 1 ? a[e] + ' × ' : ''}${n(AR[e])}`).join(' + ')} = <b>${n(S.mr(f))}</b>`; };
  S.config = Z => { const sh = []; let left = Z; [2, 8, 8, 2].forEach(c => { if (left > 0) { sh.push(Math.min(c, left)); left -= c; } }); return sh.join(','); };
  const EL = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const NAME = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminium', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
  S.EL = EL; S.NAME = NAME;
  const svg = S.svg, txt = S.txt;
  // electron shells drawn as rings, electrons as dots (or crosses), symbol in the middle
  S.shellAtom = (Z, o = {}) => {
    const sh = S.config(Z).split(',').map(Number); let b = `<circle cx="100" cy="100" r="16" fill="var(--c4)" opacity=".85"/>${txt(100, 105, EL[Z], 'in')}`;
    sh.forEach((k, s) => { const rad = 32 + s * 22; b += `<circle cx="100" cy="100" r="${rad}" fill="none" stroke="var(--line)" stroke-width="2"/>`; for (let j = 0; j < k; j++) { const a = (j / k) * 6.283 - 1.57; b += o.cross ? txt(K.round(100 + rad * Math.cos(a), 1), K.round(104 + rad * Math.sin(a), 1), '×', 'lbl acc') : `<circle cx="${K.round(100 + rad * Math.cos(a), 1)}" cy="${K.round(100 + rad * Math.sin(a), 1)}" r="5" fill="var(--c5)"/>`; } });
    return svg(200, 200, b, o.max || 180);
  };
  // dot-and-cross for a molecule: centre atom with outer atoms; pairs = shared pairs per bond; lone = lone pairs on centre
  S.dotcross = (centre, outer, pairs, lone, label) => {
    const k = outer.length, R = 40, D = 62; let b = `<circle cx="150" cy="100" r="${R}" fill="none" stroke="var(--c3)" stroke-width="2.5"/>${txt(150, 106, centre, 'lbl big')}`;
    const angs = k === 1 ? [0] : k === 2 ? [Math.PI, 0] : k === 3 ? [Math.PI, 0, Math.PI / 2] : [Math.PI, 0, Math.PI / 2, -Math.PI / 2];
    outer.forEach((o, i) => { const a = angs[i], x = 150 + D * Math.cos(a), y = 100 + D * Math.sin(a); b += `<circle cx="${K.round(x, 1)}" cy="${K.round(y, 1)}" r="${o === 'H' ? 26 : R}" fill="none" stroke="var(--c2)" stroke-width="2.5"/>${txt(K.round(x + 26 * Math.cos(a), 1), K.round(y + 26 * Math.sin(a) + 5, 1), o, 'lbl')}`;
      const mx = 150 + (R - 6) * Math.cos(a), my = 100 + (R - 6) * Math.sin(a), px = -Math.sin(a), py = Math.cos(a);
      for (let p = 0; p < pairs; p++) { const off = (p - (pairs - 1) / 2) * 13; b += `<circle cx="${K.round(mx + px * off - 4 * Math.cos(a), 1)}" cy="${K.round(my + py * off - 4 * Math.sin(a), 1)}" r="3.5" fill="var(--c3)"/>${txt(K.round(mx + px * off + 6 * Math.cos(a), 1), K.round(my + py * off + 6 * Math.sin(a) + 4, 1), '×', 'tick')}`; } });
    const free = [-Math.PI / 2, Math.PI / 2, -Math.PI / 4, Math.PI / 4].filter(a => !angs.slice(0, k).some(b2 => Math.abs(Math.cos(a - b2) - 1) < .01));
    for (let l = 0; l < lone; l++) { const a = free[l % free.length]; const x = 150 + (R - 10) * Math.cos(a), y = 100 + (R - 10) * Math.sin(a); b += `<circle cx="${K.round(x - 5 * Math.sin(a), 1)}" cy="${K.round(y + 5 * Math.cos(a), 1)}" r="3.5" fill="var(--c3)"/><circle cx="${K.round(x + 5 * Math.sin(a), 1)}" cy="${K.round(y - 5 * Math.cos(a), 1)}" r="3.5" fill="var(--c3)"/>`; }
    return svg(300, 226, b + (label ? txt(150, 220, label, 'tick') : ''), 300);
  };
  // giant ionic lattice: alternating + and − ions
  S.lattice = (pos = 'Na⁺', neg = 'Cl⁻') => { let b = ''; for (let y = 0; y < 4; y++) for (let x = 0; x < 6; x++) { const p = (x + y) % 2 === 0; b += `<circle cx="${30 + x * 46}" cy="${30 + y * 46}" r="${p ? 14 : 20}" fill="${p ? 'var(--c4)' : 'var(--c3)'}" opacity=".85"/>${txt(30 + x * 46, 35 + y * 46, p ? '+' : '−', 'in')}`; } return svg(290, 200, b + txt(145, 196, pos + ' and ' + neg + ' ions in a regular lattice', 'tick'), 290); };
  // metallic lattice: positive ions in a sea of electrons
  S.metal = (mixed) => { let b = '<rect x="5" y="5" width="280" height="170" rx="14" fill="color-mix(in srgb, var(--c5) 14%, transparent)"/>'; const R = (x, y) => (x * 7 + y * 3) % 5 === 0; for (let y = 0; y < 4; y++) for (let x = 0; x < 6; x++) { const big = mixed && R(x, y); b += `<circle cx="${32 + x * 45}" cy="${30 + y * 40}" r="${big ? 20 : 15}" fill="${big ? 'var(--c2)' : 'var(--c4)'}" opacity=".85"/>${txt(32 + x * 45, 35 + y * 40, '+', 'in')}`; }
    for (let i = 0; i < 26; i++) b += txt(20 + (i * 53) % 260, 22 + (i * 37) % 150, 'e⁻', 'tick'); return svg(290, 180, b, 290); };
  // energy profile: dH (negative = exothermic), Ea, optional catalyst curve
  S.pathway = (dH, Ea, cat) => {
    const base = 150, rY = 92, pY = rY - dH * .25, top = rY - Ea * .25;
    const curve = (h) => `M20 ${rY} L80 ${rY} C 120 ${rY}, 130 ${h}, 160 ${h} C 190 ${h}, 200 ${pY}, 240 ${pY} L300 ${pY}`;
    let b = `<line x1="14" y1="10" x2="14" y2="${base + 10}" class="axis"/><line x1="14" y1="${base + 10}" x2="306" y2="${base + 10}" class="axis"/>${txt(18, 12, 'energy', 'tick', 'start')}${txt(300, base + 24, 'progress of reaction', 'tick', 'end')}`;
    b += `<path d="${curve(top)}" class="curve" stroke="var(--c4)"/>`;
    if (cat) b += `<path d="${curve(rY - Ea * .25 * .55)}" class="curve" stroke="var(--c1)" stroke-dasharray="6 4"/>${txt(160, rY - Ea * .25 * .55 + 16, 'with catalyst', 'tick')}`;
    b += txt(50, rY - 6, 'reactants', 'tick') + txt(250, dH < 0 ? pY + 16 : pY - 8, 'products', 'tick');
    b += S.arrow(120, rY, 120, top + 2, 'var(--c2)', 2) + txt(124, (rY + top) / 2, 'Ea', 'lbl', 'start');
    b += S.arrow(285, rY, 285, pY + (pY > rY ? -2 : 2), 'var(--c3)', 2) + `<line x1="240" y1="${rY}" x2="300" y2="${rY}" stroke="var(--muted)" stroke-dasharray="4 3"/>` + txt(280, (rY + pY) / 2 + 4, 'ΔH', 'lbl', 'end');
    return svg(320, base + 30, b, 320);
  };
  // universal indicator strip
  S.UI = ['#d7263d', '#e8463b', '#f36b2c', '#f59e0b', '#facc15', '#d9e021', '#a3d830', '#22c55e', '#14b8a6', '#0ea5e9', '#3b82f6', '#4f46e5', '#6d28d9', '#7c3aed', '#5b21b6'];
  S.phbar = ph => { let b = ''; for (let i = 0; i <= 14; i++) b += `<rect x="${5 + i * 20}" y="20" width="19" height="34" fill="${S.UI[i]}" ${i === Math.round(ph) ? 'stroke="var(--text)" stroke-width="3"' : ''}/>${txt(14 + i * 20, 70, i, 'tick')}`; return svg(310, 76, b + txt(30, 14, 'acid', 'tick') + txt(155, 14, 'neutral', 'tick') + txt(280, 14, 'alkali', 'tick')); };

  // ================= generators: matter and bonding =================
  bank('chStates', [
    { q: 'In which state are particles far apart and moving randomly at high speed?', a: 'Gas', w: ['Solid', 'Liquid', 'All states'], why: 'Gas particles have lots of space between them.' },
    { q: 'On a cooling curve, the temperature stays constant while a liquid freezes because…', a: 'energy is released as particles form bonds, balancing the energy lost', w: ['the particles stop moving', 'no energy is transferred', 'the thermometer is broken'], why: 'Changes of state happen at constant temperature.' },
    { q: 'A gas is heated at constant pressure. Its volume…', a: 'increases, because particles move faster and push the walls out', w: ['decreases', 'stays the same', 'becomes zero'], why: 'Kinetic particle theory.' },
    { q: 'Increasing the pressure on a gas at constant temperature makes its volume…', a: 'decrease', w: ['increase', 'stay the same', 'double'], why: 'The particles are pushed closer together.' },
    { q: 'Diffusion is…', a: 'the random movement of particles from high concentration to low concentration', w: ['particles moving only downwards', 'a chemical reaction', 'particles joining together'], why: 'It happens in liquids and gases because the particles move randomly.' },
    { q: 'Ammonia (Mr 17) and hydrogen chloride (Mr 36.5) diffuse towards each other along a tube. The white ring forms…', a: 'nearer the hydrogen chloride end', w: ['nearer the ammonia end', 'exactly in the middle', 'outside the tube'], why: 'Lighter molecules (lower Mr) diffuse faster, so ammonia travels further.' },
    { q: 'Which change of state is boiling?', a: 'liquid → gas, throughout the liquid at the boiling point', w: ['gas → liquid', 'solid → liquid', 'liquid → gas, only at the surface below the boiling point'], why: 'Evaporation happens at the surface at any temperature.' }
  ]);
  bank('chMixtures', [
    { q: 'Which is a compound?', a: 'Water (H₂O)', w: ['Oxygen (O₂)', 'Air', 'Iron (Fe)'], why: 'A compound is two or more elements chemically joined.' },
    { q: 'Which is a mixture?', a: 'Air', w: ['Carbon dioxide', 'Sodium chloride', 'Copper'], why: 'The gases in air are not chemically joined, and can be separated.' },
    { q: 'An element is…', a: 'a substance made of only one type of atom', w: ['two elements joined together', 'any mixture', 'a substance that dissolves'], why: 'Elements are listed in the Periodic Table.' },
    { q: 'A key difference between a mixture and a compound is that a mixture…', a: 'can be separated by physical methods and has variable composition', w: ['always has a fixed formula', 'needs a chemical reaction to separate', 'contains only one element'], why: 'Compounds have a fixed composition and need chemical reactions to break down.' }
  ]);
  G.chConfig = () => { const Z = rnd(1, 20), c = S.config(Z), ion = Math.random() < .3 && [3, 11, 12, 13, 19, 20, 8, 9, 16, 17].includes(Z);
    if (ion) { const ch = { 3: 1, 11: 1, 12: 2, 13: 3, 19: 1, 20: 2, 8: -2, 9: -1, 16: -2, 17: -1 }[Z]; const ce = S.config(Z - ch); return { kind: 'text', q: `<p>Write the electronic configuration of the <b>${NAME[Z]} ion</b> (${EL[Z]}${Math.abs(ch) > 1 ? Math.abs(ch) : ''}${ch > 0 ? '⁺' : '⁻'}). Proton number ${Z}. Use commas, e.g. 2,8,1.</p>`, a: ce, accept: [ce, ce.replace(/,/g, '')], ph: 'e.g. 2,8', hint: ch > 0 ? `It LOSES ${ch} electron${ch > 1 ? 's' : ''}: ${Z} − ${ch} = ${Z - ch} electrons.` : `It GAINS ${-ch} electron${ch < -1 ? 's' : ''}: ${Z} + ${-ch} = ${Z - ch} electrons.`, steps: [`${EL[Z]} atom: ${c}`, `ion has ${Z - ch} electrons → <b>${ce}</b> (a full outer shell)`] }; }
    return { kind: 'text', q: `<p>Write the electronic configuration of <b>${NAME[Z]}</b> (proton number ${Z}). Use commas, e.g. 2,8,1.</p>`, a: c, accept: [c, c.replace(/,/g, '')], ph: 'e.g. 2,8,1', hint: 'Fill shells in order: 2, then 8, then 8, then 2.', steps: [`${Z} electrons: 2 in the first shell, up to 8 in the second, up to 8 in the third → <b>${c}</b>`] }; };
  G.chGroup = () => { const Z = rnd(3, 20); const c = S.config(Z).split(',').map(Number), outer = c[c.length - 1], per = c.length; const q = pick(['g', 'p']);
    const grp = outer === 8 || Z === 2 ? 'VIII' : ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][outer];
    if (q === 'p') return num(`<p>${NAME[Z][0].toUpperCase() + NAME[Z].slice(1)} has the configuration ${c.join(',')}. Which <b>period</b> is it in?</p>`, per, '', [`Number of occupied shells = period = <b>${per}</b>`], 'Count the shells.');
    return { kind: 'mcq', q: `<p>${NAME[Z][0].toUpperCase() + NAME[Z].slice(1)} has the configuration ${c.join(',')}. Which <b>group</b> is it in?</p>`, choices: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'], a: grp, hint: 'Outer-shell electrons = group number (a full shell = Group VIII).', steps: [`${outer} electrons in the outer shell → Group <b>${grp}</b>`] }; };
  G.chAr = () => { const sets = [['chlorine', 35, 37, 75], ['copper', 63, 65, 69], ['boron', 10, 11, 20], ['lithium', 6, 7, 8], ['bromine', 79, 81, 50], ['gallium', 69, 71, 60]]; const [nm, a, b, pa] = pick(sets); const Ar = (a * pa + b * (100 - pa)) / 100;
    return num(`<p>Naturally occurring ${nm} is ${pa}% ${nm}-${a} and ${100 - pa}% ${nm}-${b}. Calculate its relative atomic mass.</p>`, Ar, '', [`Ar = (${a} × ${pa} + ${b} × ${100 - pa}) ÷ 100`, `= ${a * pa + b * (100 - pa)} ÷ 100 = <b>${n(Ar)}</b>`], 'A weighted average: mass × percentage for each isotope, add, ÷ 100.'); };
  bank('chAtom', [
    { q: 'The relative charge of an electron is…', a: '−1', w: ['+1', '0', '−2'], why: 'Proton +1, neutron 0, electron −1.' },
    { q: 'The relative mass of an electron is about…', a: '1/1840 (very small)', w: ['1', '0', '2'], why: 'Protons and neutrons each have relative mass 1.' },
    { q: 'Isotopes of an element have the same chemical properties because they have…', a: 'the same number of electrons, so the same electronic configuration', w: ['the same number of neutrons', 'the same mass', 'different numbers of protons'], why: 'Chemistry is decided by electrons.' },
    { q: 'Noble gases are unreactive because…', a: 'they have a full outer shell of electrons', w: ['they are gases', 'they have no electrons', 'they have no protons'], why: 'They don\'t need to gain, lose or share electrons.' },
    { q: 'Mass number (nucleon number) is…', a: 'the number of protons + neutrons', w: ['the number of protons', 'the number of electrons', 'the number of shells'], why: 'Proton number counts protons only.' }
  ]);
  bank('chIonic', [
    { q: 'Sodium forms a Na⁺ ion by…', a: 'losing one electron', w: ['gaining one electron', 'gaining a proton', 'sharing an electron'], why: 'Metals lose outer electrons to form positive ions (cations).' },
    { q: 'An ionic bond is…', a: 'the strong electrostatic attraction between oppositely charged ions', w: ['a shared pair of electrons', 'a weak force between molecules', 'a sea of electrons'], why: 'It forms between metals and non-metals.' },
    { q: 'Why does sodium chloride have a high melting point?', a: 'Lots of energy is needed to overcome the strong attractions between ions in the giant lattice', w: ['Its molecules are heavy', 'It has weak intermolecular forces', 'It contains free electrons'], why: 'Giant ionic lattice.' },
    { q: 'Solid sodium chloride does not conduct electricity, but molten sodium chloride does, because…', a: 'when molten, the ions are free to move', w: ['electrons appear when it melts', 'it becomes a metal', 'the ions disappear'], why: 'In the solid, ions are fixed in the lattice.' },
    { q: 'Negative ions are called…', a: 'anions', w: ['cations', 'isotopes', 'molecules'], why: 'Positive ions are cations.' },
    { q: 'Oxygen forms the ion…', a: 'O²⁻ (it gains 2 electrons)', w: ['O²⁺', 'O⁻', 'O⁶⁺'], why: 'Configuration 2,6 → gains 2 to reach 2,8.' }
  ]);
  bank('chCovalent', [
    { q: 'A covalent bond is…', a: 'a shared pair of electrons between two atoms', w: ['the transfer of electrons', 'an attraction between ions', 'a sea of delocalised electrons'], why: 'It forms between non-metal atoms.' },
    { q: 'How many covalent bonds does carbon form in methane, CH₄?', a: '4', w: ['1', '2', '3'], why: 'Carbon (2,4) shares 4 electrons to reach 8.' },
    { q: 'Simple molecular substances have low melting points because…', a: 'the intermolecular forces between molecules are weak', w: ['the covalent bonds are weak', 'they contain ions', 'they have free electrons'], why: 'Melting separates molecules; it does not break the covalent bonds.' },
    { q: 'Why do simple molecular substances not conduct electricity?', a: 'They have no ions or free electrons', w: ['Their molecules are too big', 'Their bonds are too strong', 'They are always gases'], why: 'Nothing charged can move.' },
    { q: 'The N₂ molecule contains…', a: 'a triple bond (three shared pairs)', w: ['a single bond', 'a double bond', 'an ionic bond'], why: 'Each N (2,5) needs 3 more electrons.' },
    { q: 'Diamond is very hard because…', a: 'each carbon atom is covalently bonded to four others in a giant structure', w: ['it has weak intermolecular forces', 'it has free electrons', 'it is ionic'], why: 'Used in cutting tools.' },
    { q: 'Graphite conducts electricity because…', a: 'each carbon has one delocalised electron that can move between the layers', w: ['it is a metal', 'it contains ions', 'its layers are strongly bonded'], why: 'Used as electrodes; its layers slide, so it is a lubricant.' },
    { q: 'Silicon(IV) oxide is similar to diamond because both…', a: 'have giant covalent structures, so they are hard with high melting points', w: ['are metals', 'are simple molecules', 'conduct electricity'], why: 'Each atom is held by strong covalent bonds in all directions.' },
    { q: 'Metallic bonding is…', a: 'attraction between positive metal ions and a sea of delocalised electrons', w: ['sharing of electron pairs', 'attraction between + and − ions', 'weak forces between molecules'], why: 'The electrons can move, so metals conduct.' },
    { q: 'Metals are malleable because…', a: 'layers of ions can slide over each other without breaking the metallic bonding', w: ['they have weak bonds', 'they are ionic', 'their electrons are fixed'], why: 'The sea of electrons keeps holding the layers together.' }
  ]);
  // ================= generators: formulae and moles =================
  const IONS_P = [['Na', 1, 'sodium'], ['K', 1, 'potassium'], ['Mg', 2, 'magnesium'], ['Ca', 2, 'calcium'], ['Al', 3, 'aluminium'], ['Cu', 2, 'copper(II)'], ['Fe', 3, 'iron(III)'], ['Zn', 2, 'zinc'], ['NH4', 1, 'ammonium']];
  const IONS_N = [['Cl', 1, 'chloride'], ['O', 2, 'oxide'], ['OH', 1, 'hydroxide'], ['SO4', 2, 'sulfate'], ['NO3', 1, 'nitrate'], ['CO3', 2, 'carbonate'], ['Br', 1, 'bromide'], ['S', 2, 'sulfide']];
  G.chIonicFormula = () => { let p, q2; do { p = pick(IONS_P); q2 = pick(IONS_N); } while (p[0] === 'NH4' && ['O', 'S', 'OH'].includes(q2[0]));
    const g = K.gcd(p[1], q2[1]), np = q2[1] / g, nn = p[1] / g; const grp = (x, k) => k > 1 ? (x.length > 2 || /[A-Z].*[A-Z]|\d/.test(x) ? `(${x})${k}` : x + k) : x;
    const F = grp(p[0], np) + grp(q2[0], nn); const wrong = [p[0] + q2[0], grp(p[0], nn) + grp(q2[0], np), grp(p[0], 2) + q2[0], p[0] + grp(q2[0], 2), grp(p[0], 3) + grp(q2[0], 2)].map(x => x);
    return { kind: 'mcq', q: `<p>What is the formula of <b>${p[2]} ${q2[2]}</b>? (ions: ${S.f(p[0])}${p[1] > 1 ? p[1] : ''}⁺ and ${S.f(q2[0])}${q2[1] > 1 ? q2[1] : ''}⁻)</p>`, choices: K.mcq(S.f(F), wrong.map(S.f)), a: S.f(F), hint: 'The charges must cancel out to zero. Swap and simplify the charges.', steps: [`charges +${p[1]} and −${q2[1]}`, `need ${np} × ${p[0]} and ${nn} × ${q2[0]} to balance (+${p[1] * np} and −${q2[1] * nn})`, `<b>${S.f(F)}</b>`] }; };
  const MRF = ['H2O', 'CO2', 'NaCl', 'CaCO3', 'H2SO4', 'NaOH', 'MgO', 'CuSO4', 'NH3', 'CH4', 'C2H5OH', 'Ca(OH)2', 'Al2O3', 'Fe2O3', 'KNO3', '(NH4)2SO4', 'HNO3', 'ZnO', 'MgCl2', 'C6H12O6', 'Na2CO3', 'HCl', 'CuO', 'SO2'];
  G.chMr = () => { const f = pick(MRF); return num(`<p>Calculate the relative formula mass, M<sub>r</sub>, of ${S.f(f)}.</p><p class="small muted">A<sub>r</sub>: ${Object.keys(S.atoms(f)).map(e => `${e} = ${n(AR[e])}`).join(', ')}</p>`, S.mr(f), '', [S.mrSteps(f)], 'Add up the Ar of every atom. Brackets multiply everything inside.'); };
  G.chMoles = () => { const f = pick(['H2O', 'CO2', 'NaCl', 'CaCO3', 'NaOH', 'MgO', 'CH4', 'O2', 'Cu', 'Mg', 'C', 'H2SO4', 'CuSO4']), M = S.mr(f), nn = pick([0.1, 0.2, 0.25, 0.5, 1.5, 2, 3]), m = r(nn * M, 3), q = pick(['n', 'm', 'N']);
    const arh = `<p class="small muted">A<sub>r</sub>: ${Object.keys(S.atoms(f)).map(e => `${e} = ${n(AR[e])}`).join(', ')}</p>`;
    if (q === 'n') return num(`<p>How many moles are in ${n(m)} g of ${S.f(f)}?</p>${arh}`, nn, 'mol', [S.mrSteps(f) + ' g/mol', `moles = mass ÷ molar mass = ${n(m)} ÷ ${n(M)} = <b>${n(nn)} mol</b>`], 'moles = mass ÷ Mr');
    if (q === 'm') return num(`<p>What is the mass of ${n(nn)} mol of ${S.f(f)}?</p>${arh}`, m, 'g', [S.mrSteps(f) + ' g/mol', `mass = moles × molar mass = ${n(nn)} × ${n(M)} = <b>${n(m)} g</b>`], 'mass = moles × Mr');
    const k = pick([0.5, 2, 3, 0.1]); return num(`<p>How many moles of particles are in ${n(r(k * 6.02, 3))} × 10²³ particles?</p>`, k, 'mol', [`1 mol = 6.02 × 10²³ particles`, `${n(r(k * 6.02, 3))} ÷ 6.02 = <b>${n(k)} mol</b>`], 'Divide by the Avogadro constant, 6.02 × 10²³.'); };
  G.chGasVol = () => { const nn = pick([0.1, 0.25, 0.5, 2, 3, 0.05]), q = pick(['V', 'n', 'Vcm']); const g = pick(['oxygen', 'carbon dioxide', 'hydrogen', 'ammonia']);
    if (q === 'V') return num(`<p>What volume does ${n(nn)} mol of ${g} gas occupy at r.t.p.?</p>`, r(nn * 24, 3), 'dm³', [`1 mol of any gas = 24 dm³ at r.t.p.`, `${n(nn)} × 24 = <b>${n(r(nn * 24, 3))} dm³</b>`], 'volume = moles × 24 dm³');
    if (q === 'n') return num(`<p>How many moles of ${g} are in ${n(r(nn * 24, 3))} dm³ of the gas at r.t.p.?</p>`, nn, 'mol', [`moles = volume ÷ 24 = ${n(r(nn * 24, 3))} ÷ 24 = <b>${n(nn)} mol</b>`], 'moles = volume (dm³) ÷ 24');
    return num(`<p>How many moles of ${g} are in ${n(r(nn * 24000, 2))} cm³ of the gas at r.t.p.?</p>`, nn, 'mol', [`1 mol = 24 dm³ = 24 000 cm³`, `${n(r(nn * 24000, 2))} ÷ 24 000 = <b>${n(nn)} mol</b>`], 'In cm³, divide by 24 000.'); };
  G.chConc = () => { const q = pick(['c', 'n', 'gdm', 'vol']), nn = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5]), Vc = pick([25, 50, 100, 200, 250, 500]); const c = nn / (Vc / 1000);
    if (q === 'c') return num(`<p>${n(nn)} mol of solute is dissolved to make ${Vc} cm³ of solution. What is the concentration in mol/dm³?</p>`, c, 'mol/dm³', [`volume = ${Vc} ÷ 1000 = ${n(Vc / 1000)} dm³`, `concentration = moles ÷ volume = ${n(nn)} ÷ ${n(Vc / 1000)} = <b>${n(K.sf(c, 3))} mol/dm³</b>`], 'Convert cm³ → dm³ (÷ 1000) first.');
    if (q === 'n') { const cc = pick([0.1, 0.2, 0.5, 1, 2]); return num(`<p>How many moles of solute are in ${Vc} cm³ of a ${n(cc)} mol/dm³ solution?</p>`, r(cc * Vc / 1000, 4), 'mol', [`moles = concentration × volume (dm³) = ${n(cc)} × ${n(Vc / 1000)} = <b>${n(r(cc * Vc / 1000, 4))} mol</b>`], 'moles = c × V, with V in dm³.'); }
    if (q === 'gdm') { const f = pick(['NaOH', 'NaCl', 'HCl', 'CuSO4']), cc = pick([0.1, 0.2, 0.5, 1]); return num(`<p>A solution of ${S.f(f)} has a concentration of ${n(cc)} mol/dm³. What is its concentration in g/dm³? (Mr = ${n(S.mr(f))})</p>`, r(cc * S.mr(f), 3), 'g/dm³', [`g/dm³ = mol/dm³ × Mr = ${n(cc)} × ${n(S.mr(f))} = <b>${n(r(cc * S.mr(f), 3))} g/dm³</b>`], 'Multiply by the molar mass.'); }
    const cc = pick([0.1, 0.2, 0.5]); const V = nn / cc * 1000; return num(`<p>What volume (in cm³) of ${n(cc)} mol/dm³ solution contains ${n(nn)} mol of solute?</p>`, V, 'cm³', [`V = moles ÷ concentration = ${n(nn)} ÷ ${n(cc)} = ${n(nn / cc)} dm³`, `= <b>${n(V)} cm³</b>`], 'V (dm³) = n ÷ c, then × 1000 for cm³.'); };
  const RXN = [
    { eq: 'CaCO₃ → CaO + CO₂', a: ['CaCO3', 1], b: ['CaO', 1], nm: ['calcium carbonate', 'calcium oxide'] },
    { eq: '2Mg + O₂ → 2MgO', a: ['Mg', 2], b: ['MgO', 2], nm: ['magnesium', 'magnesium oxide'] },
    { eq: 'C + O₂ → CO₂', a: ['C', 1], b: ['CO2', 1], nm: ['carbon', 'carbon dioxide'] },
    { eq: 'CuO + H₂SO₄ → CuSO₄ + H₂O', a: ['CuO', 1], b: ['CuSO4', 1], nm: ['copper(II) oxide', 'copper(II) sulfate'] },
    { eq: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', a: ['Fe2O3', 1], b: ['Fe', 2], nm: ['iron(III) oxide', 'iron'] },
    { eq: '2H₂ + O₂ → 2H₂O', a: ['H2', 2], b: ['H2O', 2], nm: ['hydrogen', 'water'] },
    { eq: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O', a: ['NaOH', 2], b: ['Na2SO4', 1], nm: ['sodium hydroxide', 'sodium sulfate'] }
  ];
  G.chReacting = () => { const R = pick(RXN), na = pick([0.1, 0.2, 0.25, 0.5, 1, 2]); const ma = r(na * S.mr(R.a[0]), 3), nb = na * R.b[1] / R.a[1], mb = r(nb * S.mr(R.b[0]), 3);
    return num(`<p>${R.eq}</p><p>What mass of ${R.nm[1]} is made from ${n(ma)} g of ${R.nm[0]}? (Mr: ${S.f(R.a[0])} = ${n(S.mr(R.a[0]))}, ${S.f(R.b[0])} = ${n(S.mr(R.b[0]))})</p>`, mb, 'g',
      [`moles of ${S.f(R.a[0])} = ${n(ma)} ÷ ${n(S.mr(R.a[0]))} = ${n(na)} mol`, `ratio ${S.f(R.a[0])} : ${S.f(R.b[0])} = ${R.a[1]} : ${R.b[1]} → ${n(nb)} mol of ${S.f(R.b[0])}`, `mass = ${n(nb)} × ${n(S.mr(R.b[0]))} = <b>${n(mb)} g</b>`], 'Three steps: grams → moles, use the ratio from the equation, moles → grams.'); };
  G.chLimiting = () => { const nMg = pick([0.1, 0.2, 0.3]), nHCl = pick([0.1, 0.2, 0.4, 0.8]); const need = 2 * nMg; const lim = nHCl < need ? 'hydrochloric acid' : 'magnesium'; const H2 = Math.min(nMg, nHCl / 2);
    return Object.assign(num(`<p>Mg + 2HCl → MgCl₂ + H₂</p><p>${n(nMg)} mol of magnesium is added to ${n(nHCl)} mol of hydrochloric acid. What volume of hydrogen (dm³ at r.t.p.) is produced?</p>`, r(H2 * 24, 3), 'dm³',
      [`${n(nMg)} mol Mg needs ${n(need)} mol HCl. There is ${n(nHCl)} mol, so the <b>${lim}</b> is the limiting reactant${nHCl === need ? ' (they react exactly)' : ''}.`, `moles of H₂ = ${n(r(H2, 4))} mol`, `volume = ${n(r(H2, 4))} × 24 = <b>${n(r(H2 * 24, 3))} dm³</b>`], 'Find which reactant runs out first. The product is limited by it.'), {}); };
  G.chTitration = () => { const acid = pick(['HCl', 'H2SO4']), cA = pick([0.1, 0.2, 0.5]), vA = pick([10, 12.5, 20, 25]), vB = 25; const ratio = acid === 'HCl' ? 1 : 2; const nA = cA * vA / 1000, nB = nA * ratio, cB = nB / (vB / 1000);
    return num(`<p>${vB} cm³ of sodium hydroxide is neutralised by ${n(vA)} cm³ of ${n(cA)} mol/dm³ ${acid === 'HCl' ? 'hydrochloric acid' : 'sulfuric acid'}.</p><p>${acid === 'HCl' ? 'HCl + NaOH → NaCl + H₂O' : 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O'}</p><p>What is the concentration of the sodium hydroxide in mol/dm³?</p>`, cB, 'mol/dm³',
      [`moles of acid = ${n(cA)} × ${n(vA / 1000)} = ${n(r(nA, 5))} mol`, `ratio acid : NaOH = 1 : ${ratio} → ${n(r(nB, 5))} mol NaOH`, `c = ${n(r(nB, 5))} ÷ ${n(vB / 1000)} = <b>${n(K.sf(cB, 3))} mol/dm³</b>`], 'Moles of the solution you know → use the ratio → divide by the other volume in dm³.'); };
  const EMP = [[['C', 'H'], [75, 25], 'CH4'], [['C', 'H'], [80, 20], 'CH3'], [['C', 'H'], [85.7, 14.3], 'CH2'], [['Mg', 'O'], [60, 40], 'MgO'], [['Fe', 'O'], [70, 30], 'Fe2O3'], [['C', 'H', 'O'], [40, 6.7, 53.3], 'CH2O'], [['Na', 'S', 'O'], [32.4, 22.5, 45.1], 'Na2SO4'], [['Cu', 'O'], [80, 20], 'CuO'], [['N', 'H'], [82.4, 17.6], 'NH3'], [['C', 'O'], [27.3, 72.7], 'CO2']];
  G.chEmpirical = () => { const [els, pct, F] = pick(EMP); const mol = els.map((e, i) => pct[i] / AR[e]), mn = Math.min(...mol);
    const wrongs = ['CH', 'CH2', 'CH3', 'CH4', 'C2H5', 'MgO2', 'Mg2O', 'FeO', 'Fe3O4', 'C2H4O', 'CHO', 'NaSO4', 'Na2SO3', 'Cu2O', 'CuO2', 'NH2', 'N2H', 'CO', 'C2O'].filter(w => w !== F && Object.keys(S.atoms(w)).every(e => els.includes(e)) && Object.keys(S.atoms(w)).length === els.length);
    return { kind: 'mcq', q: `<p>A compound contains ${els.map((e, i) => `${pct[i]}% ${e}`).join(', ')} by mass. What is its empirical formula?</p><p class="small muted">A<sub>r</sub>: ${els.map(e => `${e} = ${AR[e]}`).join(', ')}</p>`, choices: K.mcq(S.f(F), K.shuffle(wrongs).map(S.f)), a: S.f(F), hint: 'Divide each % by its Ar, then divide by the smallest answer to get a whole-number ratio.',
      steps: [els.map((e, i) => `${e}: ${pct[i]} ÷ ${AR[e]} = ${n(K.round(mol[i], 3))}`).join(' · '), `÷ smallest: ${els.map((e, i) => `${e} ${n(K.round(mol[i] / mn, 2))}`).join(', ')}`, `simplest whole-number ratio → <b>${S.f(F)}</b>`] }; };
  G.chPercent = () => { const q = pick(['comp', 'yield', 'purity']);
    if (q === 'comp') { const f = pick(['H2O', 'CO2', 'CaCO3', 'Fe2O3', 'NH3', 'MgO', 'CuSO4', 'NaOH', 'Al2O3', 'NH4NO3']); const a = S.atoms(f), el = pick(Object.keys(a)); const p = AR[el] * a[el] / S.mr(f) * 100;
      return num(`<p>What is the percentage by mass of ${el} in ${S.f(f)}? (Mr = ${n(S.mr(f))}, Ar of ${el} = ${n(AR[el])})</p>`, p, '%', [`% = (${a[el] > 1 ? a[el] + ' × ' : ''}${n(AR[el])}) ÷ ${n(S.mr(f))} × 100 = <b>${n(K.sf(p, 3))}%</b>`], 'Mass of that element in one formula ÷ Mr × 100.'); }
    if (q === 'yield') { const th = pick([10, 20, 25, 40, 50]), pc = pick([60, 70, 75, 80, 85, 90]); return num(`<p>A reaction should make ${th} g of product, but only ${n(th * pc / 100)} g is collected. What is the percentage yield?</p>`, pc, '%', [`% yield = actual ÷ theoretical × 100 = ${n(th * pc / 100)} ÷ ${th} × 100 = <b>${pc}%</b>`], 'actual yield ÷ theoretical yield × 100'); }
    const tot = pick([20, 25, 40, 50]), pc = pick([80, 85, 90, 95]); return num(`<p>A ${tot} g sample of impure calcium carbonate contains ${n(tot * pc / 100)} g of pure calcium carbonate. What is its percentage purity?</p>`, pc, '%', [`% purity = pure mass ÷ total mass × 100 = <b>${pc}%</b>`], 'mass of pure substance ÷ mass of sample × 100'); };
  bank('chFormulaIdea', [
    { q: 'The empirical formula of a compound is…', a: 'the simplest whole-number ratio of atoms', w: ['the actual number of atoms in a molecule', 'the mass of one mole', 'the structural formula'], why: 'E.g. ethene C₂H₄ has empirical formula CH₂.' },
    { q: 'What does (aq) mean in a symbol equation?', a: 'Dissolved in water', w: ['A gas', 'A liquid', 'A solid'], why: '(s) solid, (l) liquid, (g) gas, (aq) aqueous.' },
    { q: 'One mole of any substance contains…', a: '6.02 × 10²³ particles', w: ['24 particles', '12 g', '1 g'], why: 'The Avogadro constant.' },
    { q: 'One mole of any gas at room temperature and pressure occupies…', a: '24 dm³', w: ['22.4 cm³', '1 dm³', '6.02 dm³'], why: '24 dm³ = 24 000 cm³ at r.t.p.' },
    { q: 'Relative atomic mass compares the mass of an atom to…', a: '1/12 of the mass of a carbon-12 atom', w: ['a hydrogen molecule', 'one proton exactly', 'one gram'], why: 'Carbon-12 is the standard.' },
    { q: 'The molecular formula of ethene is C₂H₄. Its empirical formula is…', a: 'CH₂', w: ['C₂H₄', 'CH', 'C₄H₈'], why: 'Divide by 2.' },
    { q: 'The limiting reactant is…', a: 'the reactant that is used up first, which decides how much product forms', w: ['the reactant in excess', 'the catalyst', 'the product'], why: 'The other reactant is left over (in excess).' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'chemistry', id: 'ch-matter', name: 'Particles, atoms and bonding', icon: '⚛️', color: '#059669', book: BOOK,
    blurb: 'Syllabus sections 1–2: states, diffusion, atoms, isotopes, and ionic, covalent and metallic bonding.',
    lessons: [
      { id: 'ch-states', title: 'States of matter and diffusion', obj: ['1.1', '1.2'], kw: 'states of matter kinetic particle theory diffusion', learn: [],
        hook: 'Why you can smell perfume from across the room.',
        scenes: [
          { say: idea('Everything is made of <b>tiny moving particles</b>. How close they are and how fast they move explain solids, liquids and gases, and why smells spread out (<b>diffusion</b>): particles wander randomly from where there are lots to where there are few.') },
          { say: 'Change the state and the temperature.', anim: X([{ k: 's', label: 'State', min: 0, max: 2, v: 2, fmt: i => ['solid', 'liquid', 'gas'][i] }, { k: 'h', label: 'Temperature', min: 0, max: 10, v: 4 }], v => `${S.particles(['solid', 'liquid', 'gas'][v.s], v.h / 10)}<p class="center">${['Close, regular, vibrating', 'Close, random, sliding past each other', 'Far apart, random, fast'][v.s]}</p>`) },
          { say: 'Ammonia and hydrogen chloride gases diffuse towards each other in a tube and make a white ring where they meet. Change the gases\' masses.', anim: X([{ k: 'a', label: 'Mr of gas from the left', min: 10, max: 80, step: 1, v: 17 }, { k: 'b', label: 'Mr of gas from the right', min: 10, max: 80, step: 1, v: 36.5 }], v => { const va = 1 / Math.sqrt(v.a), vb = 1 / Math.sqrt(v.b), x = 20 + 260 * va / (va + vb); return `${S.svg(300, 60, `<rect x="15" y="20" width="270" height="20" rx="10" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="${K.round(x - 4, 1)}" y="21" width="8" height="18" fill="var(--muted)"/>${S.txt(15, 56, 'left', 'tick', 'start')}${S.txt(285, 56, 'right', 'tick', 'end')}`)}<p class="center">The ring forms ${x < 140 ? 'nearer the LEFT' : x > 160 ? 'nearer the RIGHT' : 'near the middle'}: the <b>lighter</b> gas diffuses faster and travels further.</p>`; }) },
          { say: 'A <b>heating curve</b> has flat parts: while melting or boiling, the energy breaks the attractions between particles, so the temperature doesn\'t rise.', ask: T('Gas particles hit the walls of a container. Heating the gas at constant volume makes the pressure…', ['increase', 'decrease', 'stay the same'], 0, 'Faster particles hit the walls harder and more often.') }
        ],
        keys: ['Solid/liquid/gas: arrangement, separation, motion.', 'Flat parts of heating/cooling curves = changes of state.', 'Diffusion: random movement from high to low concentration; lower Mr → faster.', 'Gas volume: ↑ temperature → expands; ↑ pressure → contracts.'],
        gens: ['chStates'], easy: ['chStates'] },
      { id: 'ch-atoms', title: 'Atoms, elements and electron shells', obj: ['2.1', '2.2', '2.3'], kw: 'atomic structure electronic configuration isotopes elements compounds mixtures', learn: [],
        hook: '118 elements build everything, and their electrons decide how they behave.',
        scenes: [
          { say: idea('An atom is a tiny <b>nucleus</b> (protons + neutrons) with <b>electrons in shells</b> around it. The number of protons decides the <b>element</b>. The electrons in the <b>outer shell</b> decide how the element <b>reacts</b>, which is why the Periodic Table groups elements the way it does.') },
          { say: 'Add protons (and the same number of electrons). Watch the shells fill: 2, then 8, then 8.', anim: X([{ k: 'Z', label: 'Proton number', min: 1, max: 20, v: 11 }], v => { const c = S.config(v.Z).split(','); return `${S.shellAtom(v.Z)}<p class="center bigq">${NAME[v.Z]}: ${c.join(',')}</p><p class="center">${c.length} shells → <b>Period ${c.length}</b> · ${c[c.length - 1]} outer electron${c[c.length - 1] > 1 ? 's' : ''} → <b>Group ${+c[c.length - 1] === 8 || v.Z === 2 ? 'VIII (full shell!)' : ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][+c[c.length - 1]]}</b></p>`; }) },
          { say: 'Particles in the atom:', pic: '<table class="tbl"><tr><th></th><th>relative charge</th><th>relative mass</th></tr><tr><td>proton</td><td>+1</td><td>1</td></tr><tr><td>neutron</td><td>0</td><td>1</td></tr><tr><td>electron</td><td>−1</td><td>1/1840</td></tr></table>',
            ask: T('Electronic configuration of magnesium (12 electrons)?', ['2,8,2', '2,10', '8,2,2', '2,2,8'], 0, 'Fill 2, then 8, then the remaining 2.') },
          { say: '<b>Isotopes</b>: same element (same protons), different numbers of neutrons. Same electrons, so same chemistry. Relative atomic mass is the <b>average</b>, weighted by how common each isotope is.', anim: X([{ k: 'p', label: '% of chlorine-35', min: 0, max: 100, step: 5, v: 75 }], v => `<p class="center bigq">Ar = (35 × ${v.p} + 37 × ${100 - v.p}) ÷ 100 = ${n(r((35 * v.p + 37 * (100 - v.p)) / 100, 2))}</p><p class="center small muted">Real chlorine is about 75% Cl-35, giving Ar = 35.5.</p>`) },
          { say: '<b>Element</b>: one type of atom. <b>Compound</b>: elements chemically joined in fixed proportions. <b>Mixture</b>: not chemically joined, separable by physical methods.' }
        ],
        keys: ['Proton +1 (mass 1), neutron 0 (mass 1), electron −1 (mass 1/1840).', 'Shells fill 2, 8, 8, 2. Outer electrons = group; shells = period.', 'Isotopes: same protons, different neutrons, same chemistry.', 'Ar = weighted average of isotope masses.'],
        gens: ['chConfig', 'chGroup', 'chAr', 'chAtom', 'chMixtures'], easy: ['chAtom', 'chMixtures'] },
      { id: 'ch-ionic', title: 'Ions and ionic bonding', obj: ['2.4'], kw: 'ions ionic bonding lattice', learn: [],
        hook: 'A metal gives away electrons; a non-metal grabs them. Then they can\'t let go of each other.',
        scenes: [
          { say: idea('Atoms want a <b>full outer shell</b> like the noble gases. A metal can get one by <b>losing</b> its few outer electrons (becoming a <b>+ ion</b>); a non-metal by <b>gaining</b> electrons (becoming a <b>− ion</b>). The opposite charges then attract strongly: an <b>ionic bond</b>.') },
          { say: 'Sodium (2,8,1) meets chlorine (2,8,7).', anim: { type: 'reveal', keep: true, stages: [`<div class="row2">${S.shellAtom(11, { max: 140 })}${S.shellAtom(17, { max: 140, cross: true })}</div>`, '<p class="center bigq">Na gives its 1 outer electron to Cl</p>', '<p class="center bigq">Na⁺ [2,8] &nbsp; Cl⁻ [2,8,8]</p><p class="center">Both now have full shells. + and − attract: ionic bond.</p>'] } },
          { say: 'Millions of ions stack in a regular <b>giant lattice</b>.', pic: S.lattice(),
            ask: T('Why does molten salt conduct electricity but solid salt doesn\'t?', ['In the liquid the ions can move', 'Electrons are made when it melts', 'The solid has no ions'], 0, 'In the solid, the ions are locked in place.') },
          { say: 'Strong attractions in all directions → <b>high melting and boiling points</b>. Conducts only when <b>molten or dissolved</b>.' }
        ],
        keys: ['Metals lose electrons → cations (+). Non-metals gain → anions (−).', 'Ionic bond = strong electrostatic attraction between opposite ions.', 'Giant lattice: high m.p./b.p.; conducts when molten or aqueous.'],
        gens: ['chIonic', 'chConfig'], easy: ['chIonic'] },
      { id: 'ch-covalent', title: 'Covalent and metallic bonding', obj: ['2.5', '2.6', '2.7'], kw: 'covalent bonding dot and cross diamond graphite metallic bonding', learn: [],
        hook: 'Why diamond is the hardest natural substance, but candle wax melts in your hand.',
        scenes: [
          { say: idea('Two non-metals can\'t both win electrons, so they <b>share</b> a pair: a <b>covalent bond</b>. Small groups of atoms sharing make <b>simple molecules</b> (weak forces between them, low melting points). Atoms sharing in a never-ending network make <b>giant covalent</b> structures (very hard, very high melting points).') },
          { say: 'Dot-and-cross diagrams show the shared pairs. Pick a molecule.', anim: X([{ k: 'm', label: 'Molecule', min: 0, max: 4, v: 1, fmt: i => ['H₂', 'H₂O', 'CH₄', 'NH₃', 'CO₂'][i] }], v => [S.dotcross('H', ['H'], 1, 0, 'H₂: one shared pair'), S.dotcross('O', ['H', 'H'], 1, 2, 'H₂O: two shared pairs, two lone pairs on O'), S.dotcross('C', ['H', 'H', 'H', 'H'], 1, 0, 'CH₄: four shared pairs'), S.dotcross('N', ['H', 'H', 'H'], 1, 1, 'NH₃: three shared pairs, one lone pair'), S.dotcross('C', ['O', 'O'], 2, 0, 'CO₂: two double bonds')][v.m] + '<p class="center small muted">Count the outer electrons round each atom: 8 (or 2 for H).</p>') },
          { say: 'Simple molecules: melting only separates the molecules (weak intermolecular forces), so melting points are low. No ions or free electrons, so they don\'t conduct.', ask: T('Diamond is used in cutting tools because…', ['every carbon is strongly bonded to 4 others in a giant structure', 'its molecules are small', 'it conducts electricity'], 0, 'Graphite has layers that slide (lubricant) and free electrons (electrodes).') },
          { say: '<b>Metallic bonding</b>: positive metal ions in a <b>sea of delocalised electrons</b>. The moving electrons carry current; the layers of ions can slide without breaking (malleable, ductile).', pic: S.metal() }
        ],
        keys: ['Covalent bond = shared pair of electrons.', 'Simple molecular: low m.p. (weak intermolecular forces), non-conductors.', 'Giant covalent (diamond, graphite, SiO₂): very high m.p.; graphite conducts and is slippery.', 'Metallic: + ions in a sea of delocalised electrons → conduct, malleable.'],
        gens: ['chCovalent'], easy: ['chCovalent'] }
    ] });

  R2O.addModule({ subject: 'chemistry', id: 'ch-moles', name: 'Formulae and the mole', icon: '⚖️', color: '#047857', book: BOOK,
    blurb: 'Syllabus section 3: formulae and equations, relative masses, the mole, reacting masses, concentrations and yields.',
    lessons: [
      { id: 'ch-formulae', title: 'Formulae and equations', obj: ['3.1'], kw: 'chemical formulae ionic formula equations state symbols', learn: [],
        hook: 'Chemistry has its own language. Here is how to read and write it.',
        scenes: [
          { say: idea('A formula is a <b>recipe of atoms</b>. For ionic compounds, the charges must <b>add up to zero</b>. An equation must be <b>balanced</b>: atoms are never created or destroyed, only rearranged, so each side has the same number of each atom.') },
          { say: 'Make the charges cancel. Calcium is Ca²⁺ and chloride is Cl⁻.', anim: X([{ k: 'c', label: 'Number of Cl⁻', min: 1, max: 4, v: 1 }], v => `<p class="center bigq">Ca²⁺ + ${v.c} × Cl⁻ → total charge ${2 - v.c > 0 ? '+' : ''}${2 - v.c}</p><p class="center">${v.c === 2 ? '✅ Zero! The formula is <b>CaCl₂</b>.' : 'Not zero yet: keep adjusting.'}</p>`) },
          { say: 'Balancing: count atoms on each side, then add big numbers in front (never change the small ones).', pic: '<p class="center bigq">H₂ + O₂ → H₂O ❌ (2 O on the left, 1 on the right)</p><p class="center bigq">2H₂ + O₂ → 2H₂O ✅</p>',
            ask: T('Balance: Mg + HCl → MgCl₂ + H₂. The number in front of HCl is…', ['2', '1', '3', '4'], 0, 'MgCl₂ has 2 Cl, so you need 2 HCl.') },
          { say: 'State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. <b>Ionic equations</b> show only the ions that change, e.g. H⁺(aq) + OH⁻(aq) → H₂O(l).' }
        ],
        keys: ['Ionic formula: charges balance to zero.', 'Balance with numbers in front; never change subscripts.', 'Molecular formula = actual atoms; empirical = simplest ratio.', 'State symbols (s) (l) (g) (aq).'],
        gens: ['chIonicFormula', 'chFormulaIdea'], easy: ['chFormulaIdea'] },
      { id: 'ch-mole', title: 'Relative mass and the mole', obj: ['3.2', '3.3'], kw: 'relative formula mass mole avogadro molar gas volume', learn: [],
        hook: 'Chemists count atoms by weighing them.',
        scenes: [
          { say: idea('Atoms are far too small to count, so chemists count them in huge batches called <b>moles</b> (6.02 × 10²³ particles, like a "dozen" but enormous). The clever part: one mole of anything weighs its <b>M<sub>r</sub> in grams</b>. So weighing tells you how many particles you have.') },
          { say: 'M<sub>r</sub> = add up the A<sub>r</sub> of every atom in the formula.', pic: `<p class="center">${S.mrSteps('H2O')}</p><p class="center">${S.mrSteps('CaCO3')}</p>`,
            ask: T('Mr of CO₂ (C = 12, O = 16)?', ['44', '28', '40', '56'], 0, '12 + 2 × 16 = 44.') },
          { say: 'Weigh out some water (Mr = 18).', anim: X([{ k: 'm', label: 'Mass of water (g)', min: 9, max: 90, step: 9, v: 36 }], v => `<p class="center bigq">${'💧'.repeat(v.m / 9)}</p><p class="center">moles = ${v.m} ÷ 18 = <b>${n(v.m / 18)} mol</b> = ${n(r(v.m / 18 * 6.02, 2))} × 10²³ molecules</p>`) },
          { say: 'The key equations:', pic: eq('moles = mass (g) ÷ molar mass (g/mol)') + eq('gas volume (dm³) = moles × 24', 'at room temperature and pressure') + eq('concentration (mol/dm³) = moles ÷ volume (dm³)', 'cm³ ÷ 1000 = dm³'),
            ask: T('How many moles in 48 dm³ of oxygen at r.t.p.?', ['2', '0.5', '1152', '24'], 0, '48 ÷ 24 = 2 mol.') }
        ],
        keys: ['Mr = sum of Ar.', '1 mol = 6.02 × 10²³ particles = Mr in grams.', 'n = m ÷ M; V(gas) = n × 24 dm³; c = n ÷ V(dm³).', 'Concentration also in g/dm³ = mol/dm³ × Mr.'],
        gens: ['chMr', 'chMoles', 'chGasVol', 'chConc', 'chFormulaIdea'], easy: ['chMr'] },
      { id: 'ch-reacting', title: 'Reacting masses and titrations', obj: ['3.3'], kw: 'reacting masses limiting reactant titration calculation', learn: [],
        hook: 'How much product will you get? The equation tells you.',
        scenes: [
          { say: idea('A balanced equation is a ratio of <b>moles</b>, not grams. So every calculation goes: <b>grams → moles → use the ratio → moles → grams</b> (or volume or concentration).') },
          { say: 'Heat calcium carbonate: CaCO₃ → CaO + CO₂. Choose how much you start with.', anim: X([{ k: 'm', label: 'Mass of CaCO₃ (g)', min: 25, max: 200, step: 25, v: 50 }], v => `<p class="center">${v.m} g ÷ 100 = <b>${n(v.m / 100)} mol</b> CaCO₃</p><p class="center">ratio 1 : 1 → ${n(v.m / 100)} mol CaO</p><p class="center bigq">${n(v.m / 100)} × 56 = ${n(r(v.m * .56, 2))} g CaO</p><p class="center small muted">plus ${n(r(v.m / 100 * 24, 2))} dm³ of CO₂ at r.t.p.</p>`) },
          { say: 'If one reactant runs out first, it is the <b>limiting reactant</b>: it decides how much product forms. The other is <b>in excess</b>.', ask: T('Mg + 2HCl → MgCl₂ + H₂. 1 mol Mg and 1 mol HCl. Which is limiting?', ['HCl (1 mol Mg needs 2 mol HCl)', 'Mg', 'Neither'], 0, 'Only 0.5 mol Mg can react.') },
          { say: '<b>Titration</b> maths: moles of the solution you know (c × V) → ratio → divide by the other volume.' }
        ],
        keys: ['Mass → moles → ratio → moles → mass.', 'Limiting reactant runs out first.', 'Titration: n = c × V(dm³), use the ratio, c = n ÷ V.'],
        gens: ['chReacting', 'chLimiting', 'chTitration'], easy: ['chReacting'] },
      { id: 'ch-empirical', title: 'Empirical formulae and percentages', obj: ['3.3'], kw: 'empirical formula percentage yield percentage composition purity', learn: [],
        hook: 'From a few measurements to the formula of a new compound.',
        scenes: [
          { say: idea('If you know how much of each element is in a compound, divide each by its A<sub>r</sub> to turn grams into <b>moles of atoms</b>. Then the simplest whole-number ratio of those moles is the <b>empirical formula</b>.') },
          { say: 'A hydrocarbon is 75% carbon and 25% hydrogen.', anim: { type: 'reveal', keep: true, stages: ['<p class="center">C: 75 ÷ 12 = 6.25 · H: 25 ÷ 1 = 25</p>', '<p class="center">÷ the smallest (6.25): C = 1, H = 4</p>', '<p class="center bigq">Empirical formula: CH₄</p>'] } },
          { say: 'Percentages to know:', pic: eq('% yield = actual ÷ theoretical × 100') + eq('% purity = mass of pure substance ÷ mass of sample × 100') + eq('% of an element = (number of atoms × Ar) ÷ Mr × 100'),
            ask: T('Expected 20 g, got 15 g. Percentage yield?', ['75%', '133%', '25%', '5%'], 0, '15 ÷ 20 × 100 = 75%.') }
        ],
        keys: ['Empirical: ÷ Ar, ÷ smallest, make whole numbers.', 'Molecular formula = a whole-number multiple of the empirical formula.', '% yield, % purity, % composition.'],
        gens: ['chEmpirical', 'chPercent'], easy: ['chPercent'] }
    ] });
})();
