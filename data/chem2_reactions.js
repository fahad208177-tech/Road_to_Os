// Chemistry 5070, part 2: electrochemistry (4), energetics (5), chemical reactions (6), acids, bases and salts (7),
// the Periodic Table (8) and metals (9).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Chemistry 2e', 'https://openstax.org/details/books/chemistry-2e'];

  // ================= generators =================
  const ELEC = [
    ['molten lead(II) bromide', 'lead', 'bromine (red-brown vapour)'], ['molten sodium chloride', 'sodium', 'chlorine'], ['molten zinc chloride', 'zinc', 'chlorine'], ['molten aluminium oxide', 'aluminium', 'oxygen'],
    ['concentrated aqueous sodium chloride', 'hydrogen', 'chlorine'], ['dilute sulfuric acid', 'hydrogen', 'oxygen'], ['aqueous copper(II) sulfate (carbon electrodes)', 'copper', 'oxygen'],
    ['dilute aqueous sodium chloride', 'hydrogen', 'oxygen'], ['concentrated hydrochloric acid', 'hydrogen', 'chlorine'], ['aqueous copper(II) chloride', 'copper', 'chlorine']];
  G.chElecProducts = () => { const [e, cat, an] = pick(ELEC), at = pick(['cathode', 'anode']); const right = at === 'cathode' ? cat : an;
    const opts = at === 'cathode' ? ['hydrogen', 'copper', 'sodium', 'lead', 'zinc', 'aluminium', 'oxygen', 'chlorine'] : ['oxygen', 'chlorine', 'bromine (red-brown vapour)', 'hydrogen', 'copper', 'sodium'];
    return { kind: 'mcq', q: `<p>What forms at the <b>${at}</b> (${at === 'cathode' ? 'negative' : 'positive'} electrode) during the electrolysis of <b>${e}</b> with inert electrodes?</p>`, choices: K.mcq(right, K.shuffle(opts.filter(o => o !== right))), a: right,
      hint: at === 'cathode' ? 'Cathode: a metal, or hydrogen if the metal is more reactive than hydrogen (in water).' : 'Anode: a non-metal. Concentrated halide → the halogen; otherwise usually oxygen.',
      steps: [`${e}: cathode → ${cat}, anode → ${an}`, at === 'cathode' ? 'Positive ions are attracted to the cathode and GAIN electrons (reduction).' : 'Negative ions are attracted to the anode and LOSE electrons (oxidation).'] }; };
  bank('chElec', [
    { q: 'Electrolysis only works when an ionic compound is molten or dissolved because…', a: 'the ions must be free to move', w: ['electrons only flow in liquids', 'solids have no ions', 'heat is needed to make ions'], why: 'In a solid lattice the ions are fixed.' },
    { q: 'The cathode is the…', a: 'negative electrode, where reduction happens', w: ['positive electrode, where oxidation happens', 'negative electrode, where oxidation happens', 'electrolyte'], why: 'Cations gain electrons at the cathode.' },
    { q: 'Which half-equation shows what happens at the cathode when copper is deposited?', a: 'Cu²⁺ + 2e⁻ → Cu', w: ['Cu → Cu²⁺ + 2e⁻', '2Cl⁻ → Cl₂ + 2e⁻', '4OH⁻ → O₂ + 2H₂O + 4e⁻'], why: 'Gain of electrons = reduction.' },
    { q: 'At the anode, chloride ions form chlorine: 2Cl⁻ → Cl₂ + 2e⁻. This is…', a: 'oxidation (loss of electrons)', w: ['reduction', 'neutralisation', 'not a redox change'], why: 'OIL RIG: oxidation is loss.' },
    { q: 'In the external wires of an electrolysis circuit, charge is carried by…', a: 'electrons', w: ['ions', 'protons', 'neutrons'], why: 'In the electrolyte it is carried by moving ions.' },
    { q: 'Electrolysing copper(II) sulfate with COPPER electrodes: what happens to the anode?', a: 'It dissolves (gets smaller) as copper ions go into solution', w: ['Oxygen bubbles off', 'It gets bigger', 'Nothing'], why: 'This is how copper is purified and objects are electroplated.' },
    { q: 'To electroplate a spoon with silver, the spoon should be the…', a: 'cathode, in a solution containing silver ions', w: ['anode', 'electrolyte', 'battery'], why: 'Silver ions gain electrons and coat the spoon. Plating improves appearance and resists corrosion.' },
    { q: 'A hydrogen–oxygen fuel cell produces electricity and…', a: 'water as the only chemical product', w: ['carbon dioxide', 'hydrogen chloride', 'methane'], why: 'Advantage: no CO₂ from the car. Disadvantages: hydrogen is hard to store and is often made from fossil fuels.' }
  ]);
  const BONDS = [
    { eq: 'H₂ + Cl₂ → 2HCl', brk: [['H–H', 436, 1], ['Cl–Cl', 242, 1]], mk: [['H–Cl', 431, 2]] },
    { eq: 'N₂ + 3H₂ → 2NH₃', brk: [['N≡N', 945, 1], ['H–H', 436, 3]], mk: [['N–H', 391, 6]] },
    { eq: '2H₂ + O₂ → 2H₂O', brk: [['H–H', 436, 2], ['O=O', 498, 1]], mk: [['O–H', 464, 4]] },
    { eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O', brk: [['C–H', 413, 4], ['O=O', 498, 2]], mk: [['C=O', 805, 2], ['O–H', 464, 4]] },
    { eq: 'H₂ + Br₂ → 2HBr', brk: [['H–H', 436, 1], ['Br–Br', 193, 1]], mk: [['H–Br', 366, 2]] }];
  G.chBondEnergy = () => { const R = pick(BONDS); const B = R.brk.reduce((s, x) => s + x[1] * x[2], 0), M = R.mk.reduce((s, x) => s + x[1] * x[2], 0), dH = B - M; const all = [...R.brk, ...R.mk];
    return num(`<p>${R.eq}</p><p>Use the bond energies (kJ/mol) to calculate ΔH for this reaction: ${all.map(x => `${x[0]} = ${x[1]}`).join(', ')}.</p>`, dH, 'kJ/mol', [`Bonds broken (energy IN): ${R.brk.map(x => `${x[2]} × ${x[1]}`).join(' + ')} = ${B}`, `Bonds made (energy OUT): ${R.mk.map(x => `${x[2]} × ${x[1]}`).join(' + ')} = ${M}`, `ΔH = broken − made = ${B} − ${M} = <b>${dH} kJ/mol</b> (${dH < 0 ? 'exothermic' : 'endothermic'})`], 'ΔH = energy to break bonds − energy released making bonds. Negative = exothermic.'); };
  bank('chEnergetics', [
    { q: 'In an exothermic reaction, the temperature of the surroundings…', a: 'increases', w: ['decreases', 'stays the same', 'drops to zero'], why: 'Energy is transferred TO the surroundings; ΔH is negative.' },
    { q: 'For an endothermic reaction, ΔH is…', a: 'positive', w: ['negative', 'zero', 'always −92'], why: 'Energy is taken in from the surroundings.' },
    { q: 'Breaking bonds is…', a: 'endothermic (needs energy)', w: ['exothermic', 'neither', 'always faster'], why: 'Making bonds is exothermic.' },
    { q: 'Activation energy is…', a: 'the minimum energy colliding particles need in order to react', w: ['the energy released', 'the total energy of the products', 'the energy of the catalyst'], why: 'Shown as the "hump" on a reaction pathway diagram.' },
    { q: 'A reaction is exothermic overall when…', a: 'more energy is released making bonds than is taken in breaking bonds', w: ['more energy is taken in breaking bonds', 'no bonds break', 'it needs heating to start'], why: 'Many exothermic reactions still need a little energy to start (activation energy).' },
    { q: 'On a pathway diagram for an EXOTHERMIC reaction, the products are…', a: 'lower in energy than the reactants', w: ['higher than the reactants', 'at the same level', 'above the activation energy'], why: 'The difference is ΔH (negative).' }
  ]);
  G.chRate = () => { const V = pick([24, 30, 40, 48, 60, 90]), t = pick([10, 20, 30, 60]); return num(`<p>A reaction produces ${V} cm³ of gas in the first ${t} s. What is the average rate over that time?</p>`, V / t, 'cm³/s', [`rate = amount of product ÷ time = ${V} ÷ ${t} = <b>${n(r(V / t, 3))} cm³/s</b>`], 'Average rate = change ÷ time.'); };
  bank('chRates', [
    { q: 'Increasing the temperature increases the rate because particles…', a: 'move faster, collide more often, and more collisions have energy ≥ activation energy', w: ['get bigger', 'need less energy to react because they are hot', 'stop colliding'], why: 'Both more frequent and more successful collisions.' },
    { q: 'Powdered marble reacts faster with acid than lumps because…', a: 'it has a larger surface area, so more collisions per second', w: ['powder is more reactive chemically', 'lumps are heavier', 'powder has more energy'], why: 'More particles exposed to the acid.' },
    { q: 'A catalyst increases the rate by…', a: 'providing a pathway with lower activation energy', w: ['increasing the temperature', 'being used up', 'adding more reactant'], why: 'It is unchanged at the end of the reaction.' },
    { q: 'Increasing the concentration of a solution increases the rate because…', a: 'there are more particles per unit volume, so more frequent collisions', w: ['particles move faster', 'the activation energy is higher', 'the products form slower'], why: 'Collision frequency rises.' },
    { q: 'For reacting gases, increasing the pressure…', a: 'increases the rate (particles are closer together)', w: ['decreases the rate', 'has no effect', 'stops the reaction'], why: 'Same as increasing concentration.' },
    { q: 'On a graph of gas volume against time, the reaction is fastest when…', a: 'the line is steepest (at the start)', w: ['the line is flat', 'at the end', 'the line goes down'], why: 'It slows as reactants are used up; flat = finished.' },
    { q: 'Which is a CHEMICAL change?', a: 'Burning magnesium', w: ['Melting ice', 'Dissolving sugar', 'Boiling water'], why: 'A new substance is made. Physical changes are easily reversed and make no new substance.' },
    { q: 'How could you follow the rate of marble chips reacting with acid?', a: 'Measure the loss of mass as CO₂ escapes, or collect the gas in a gas syringe', w: ['Measure the colour of the chips', 'Weigh the acid bottle', 'Time how long it takes to buy the chips'], why: 'Change in mass or volume of gas over time.' }
  ]);
  bank('chEquilibrium', [
    { q: 'A reversible reaction is at equilibrium in a closed system when…', a: 'the forward and reverse rates are equal and concentrations stop changing', w: ['the reaction stops completely', 'all the reactants are used up', 'there are equal amounts of reactants and products'], why: 'It is dynamic: both reactions keep going.' },
    { q: 'N₂ + 3H₂ ⇌ 2NH₃ (forward reaction exothermic). Increasing the pressure…', a: 'moves the equilibrium right: more ammonia (fewer gas molecules on the right)', w: ['moves it left', 'has no effect', 'stops the reaction'], why: '4 molecules of gas on the left, 2 on the right.' },
    { q: 'For the exothermic Haber process, LOWER temperatures give a higher yield, but 450 °C is used because…', a: 'at low temperatures the rate is far too slow; 450 °C is a compromise', w: ['ammonia melts at low temperature', 'the catalyst only works cold', 'it saves energy'], why: 'Rate vs yield.' },
    { q: 'Why is the Haber process not run at an even higher pressure than 200 atm?', a: 'It would be too expensive and dangerous to build and run', w: ['The yield would decrease', 'Ammonia would explode', 'The catalyst would stop working'], why: 'Safety and economics.' },
    { q: 'Adding a catalyst to a reaction at equilibrium…', a: 'does not change the position of equilibrium; it is reached faster', w: ['moves it to the right', 'moves it to the left', 'increases the yield'], why: 'It speeds up both directions equally.' },
    { q: 'Where does the hydrogen for the Haber process come from?', a: 'Methane (natural gas)', w: ['The air', 'Water only', 'Ammonia'], why: 'Nitrogen comes from the air.' },
    { q: 'The Contact process conditions are…', a: '450 °C, 2 atm, vanadium(V) oxide catalyst', w: ['450 °C, 200 atm, iron catalyst', '25 °C, 1 atm, no catalyst', '1000 °C, 200 atm, nickel catalyst'], why: '2SO₂ + O₂ ⇌ 2SO₃. The yield is already high at 2 atm.' },
    { q: 'Heating blue hydrated copper(II) sulfate gives…', a: 'white anhydrous copper(II) sulfate (and water); adding water turns it blue again', w: ['a red solid', 'a gas only', 'a permanent change'], why: 'A reversible reaction. Cobalt(II) chloride: blue anhydrous → pink hydrated.' },
    { q: 'Increasing the concentration of a reactant at equilibrium moves the position…', a: 'to the right, making more product', w: ['to the left', 'nowhere', 'to whichever side has more molecules'], why: 'The system uses up the added substance.' }
  ]);
  const OXN = [['Mn', 'MnO₄⁻', 7], ['S', 'SO₄²⁻', 6], ['Fe', 'Fe₂O₃', 3], ['Cr', 'Cr₂O₇²⁻', 6], ['N', 'NO₃⁻', 5], ['Cu', 'CuO', 2], ['S', 'SO₂', 4], ['Cl', 'Cl₂', 0], ['N', 'NH₃', -3], ['C', 'CO₂', 4], ['Fe', 'FeCl₂', 2], ['S', 'H₂S', -2], ['Mn', 'MnO₂', 4], ['Na', 'Na⁺', 1]];
  G.chOxNum = () => { const [el, f, v] = pick(OXN); return num(`<p>What is the oxidation number of <b>${el}</b> in ${f}?</p>`, v, '', [`Oxygen is usually −2, hydrogen +1. The oxidation numbers add up to the overall charge.`, `So ${el} = <b>${v > 0 ? '+' : ''}${v}</b>`], 'Element alone = 0. Simple ion = its charge. O = −2, H = +1. Total = charge on the particle.'); };
  bank('chRedox', [
    { q: 'Oxidation is…', a: 'gain of oxygen, loss of electrons, or an increase in oxidation number', w: ['loss of oxygen or gain of electrons', 'gain of hydrogen only', 'any reaction with water'], why: 'OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).' },
    { q: 'In Mg + CuO → MgO + Cu, which substance is reduced?', a: 'Copper(II) oxide', w: ['Magnesium', 'Magnesium oxide', 'Copper'], why: 'CuO loses oxygen. Mg is the reducing agent.' },
    { q: 'An oxidising agent…', a: 'oxidises another substance and is itself reduced', w: ['is itself oxidised', 'is never changed', 'always contains hydrogen'], why: 'It takes electrons.' },
    { q: 'Zn + Cu²⁺ → Zn²⁺ + Cu. The reducing agent is…', a: 'Zn', w: ['Cu²⁺', 'Zn²⁺', 'Cu'], why: 'Zn loses electrons (is oxidised), giving them to Cu²⁺.' },
    { q: 'Acidified potassium manganate(VII) turns from purple to colourless. This shows the other substance is…', a: 'a reducing agent', w: ['an oxidising agent', 'an acid', 'neutral'], why: 'The manganate(VII) has been reduced.' },
    { q: 'Aqueous potassium iodide turns brown. This shows the added substance is…', a: 'an oxidising agent (iodide is oxidised to iodine)', w: ['a reducing agent', 'an alkali', 'a catalyst'], why: '2I⁻ → I₂ + 2e⁻.' },
    { q: 'What does the (II) in iron(II) chloride mean?', a: 'Iron has an oxidation number of +2', w: ['There are 2 chlorine atoms only', 'It has 2 iron atoms', 'It is the second compound of iron'], why: 'Roman numerals show oxidation numbers.' }
  ]);
  bank('chAcidBase', [
    { q: 'Acids in water produce…', a: 'H⁺ ions', w: ['OH⁻ ions', 'Na⁺ ions', 'electrons'], why: 'Alkalis produce OH⁻ ions.' },
    { q: 'Acids are proton donors. A proton here means…', a: 'an H⁺ ion', w: ['a neutron', 'an electron', 'a whole hydrogen atom'], why: 'Bases are proton acceptors.' },
    { q: 'Acid + metal →', a: 'salt + hydrogen', w: ['salt + water', 'salt + carbon dioxide', 'base + water'], why: 'Acid + base → salt + water; acid + carbonate → salt + water + CO₂.' },
    { q: 'Acid + carbonate →', a: 'salt + water + carbon dioxide', w: ['salt + hydrogen', 'salt only', 'water only'], why: 'The fizzing is CO₂ (turns limewater milky).' },
    { q: 'An alkali is…', a: 'a soluble base', w: ['any acid', 'an insoluble metal oxide', 'a salt'], why: 'Bases are metal oxides or hydroxides.' },
    { q: 'Ammonium chloride is warmed with sodium hydroxide. What gas is given off?', a: 'Ammonia', w: ['Chlorine', 'Hydrogen', 'Oxygen'], why: 'Bases react with ammonium salts to release ammonia (turns damp red litmus blue).' },
    { q: 'The ionic equation for neutralisation is…', a: 'H⁺(aq) + OH⁻(aq) → H₂O(l)', w: ['Na⁺ + Cl⁻ → NaCl', 'H₂ + O → H₂O', 'H⁺ + Cl⁻ → HCl'], why: 'Only the H⁺ and OH⁻ actually change.' },
    { q: 'A strong acid…', a: 'is completely dissociated into ions in water', w: ['is very concentrated', 'is partially dissociated', 'has a pH of 7'], why: 'HCl, HNO₃, H₂SO₄ are strong; carboxylic acids are weak.' },
    { q: 'Ethanoic acid is a weak acid because…', a: 'only some of its molecules release H⁺ (it partially dissociates)', w: ['it is dilute', 'it is a solid', 'it has no hydrogen'], why: 'CH₃COOH ⇌ H⁺ + CH₃COO⁻.' },
    { q: 'Methyl orange in an alkali is…', a: 'yellow', w: ['red', 'colourless', 'blue'], why: 'Red in acid, yellow in alkali.' },
    { q: 'Thymolphthalein in an alkali is…', a: 'blue', w: ['colourless', 'red', 'yellow'], why: 'Colourless in acid, blue in alkali.' },
    { q: 'Universal indicator shows pH 1. The solution is…', a: 'strongly acidic (high H⁺ concentration)', w: ['neutral', 'weakly alkaline', 'strongly alkaline'], why: 'Lower pH = more H⁺.' }
  ]);
  G.chpH = () => { const p = rnd(0, 14); const c = p < 3 ? 'strongly acidic' : p < 7 ? 'weakly acidic' : p === 7 ? 'neutral' : p < 12 ? 'weakly alkaline' : 'strongly alkaline';
    return { kind: 'mcq', q: `<p>Universal indicator turns this colour. What does it tell you about the solution?</p>${S.phbar(p)}`, choices: ['strongly acidic', 'weakly acidic', 'neutral', 'weakly alkaline', 'strongly alkaline'], a: c, hint: 'pH 7 is neutral; below is acidic, above is alkaline. Further from 7 = stronger.', steps: [`pH ${p} → <b>${c}</b>`] }; };
  const SALTS = [['sodium chloride', true], ['potassium nitrate', true], ['ammonium sulfate', true], ['copper(II) nitrate', true], ['silver chloride', false], ['lead(II) chloride', false], ['barium sulfate', false], ['calcium sulfate', false], ['lead(II) sulfate', false], ['calcium carbonate', false], ['copper(II) carbonate', false], ['sodium carbonate', true], ['magnesium sulfate', true], ['zinc chloride', true], ['potassium carbonate', true], ['copper(II) hydroxide', false], ['sodium hydroxide', true]];
  G.chSoluble = () => { const [s, sol] = pick(SALTS); return { kind: 'mcq', q: `<p>Is <b>${s}</b> soluble or insoluble in water?</p>`, choices: ['soluble', 'insoluble'], a: sol ? 'soluble' : 'insoluble', hint: 'Na, K, NH₄ and nitrates: always soluble. Chlorides: soluble except Pb, Ag. Sulfates: soluble except Ba, Ca, Pb. Carbonates and hydroxides: insoluble except Na, K, NH₄ (Ca(OH)₂ slightly).', steps: [`<b>${sol ? 'soluble' : 'insoluble'}</b>`] }; };
  bank('chSalts', [
    { q: 'To make copper(II) sulfate crystals from copper(II) oxide, you…', a: 'add excess CuO to warm sulfuric acid, filter off the excess, then crystallise', w: ['titrate with an indicator', 'mix two solutions to form a precipitate', 'heat copper in air'], why: 'Insoluble base in excess, so all the acid is used.' },
    { q: 'Sodium chloride is made from hydrochloric acid and sodium hydroxide by…', a: 'titration, because both are solutions', w: ['adding excess insoluble base', 'precipitation', 'electrolysis'], why: 'Find the exact volumes with an indicator, then repeat without it.' },
    { q: 'An insoluble salt such as barium sulfate is made by…', a: 'precipitation: mix two solutions, filter, wash and dry', w: ['titration', 'adding excess metal', 'crystallisation from the acid'], why: 'E.g. barium chloride + sodium sulfate.' },
    { q: 'Water of crystallisation is…', a: 'water molecules chemically combined in a hydrated crystal', w: ['water used to wash crystals', 'steam', 'impure water'], why: 'E.g. CuSO₄•5H₂O.' },
    { q: 'An amphoteric oxide…', a: 'reacts with both acids and bases to give a salt and water', w: ['does not react at all', 'only reacts with acids', 'only reacts with water'], why: 'Limited to Al₂O₃ and ZnO.' },
    { q: 'Carbon dioxide and sulfur dioxide are…', a: 'acidic oxides (non-metal oxides)', w: ['basic oxides', 'amphoteric', 'neutral salts'], why: 'Metal oxides like CuO and CaO are basic.' },
    { q: 'Calcium oxide is a…', a: 'basic oxide', w: ['acidic oxide', 'amphoteric oxide', 'salt'], why: 'Metal oxides are basic.' }
  ]);
  bank('chPeriodic', [
    { q: 'The Periodic Table arranges elements in order of…', a: 'increasing proton number', w: ['increasing mass number', 'date of discovery', 'alphabetical order'], why: 'Rows = periods, columns = groups.' },
    { q: 'Across a period from left to right, elements change from…', a: 'metals to non-metals', w: ['non-metals to metals', 'gases to solids', 'solids to liquids'], why: 'E.g. Na, Mg, Al (metals) … S, Cl, Ar (non-metals).' },
    { q: 'Elements in the same group react similarly because…', a: 'they have the same number of outer-shell electrons', w: ['they have the same mass', 'they have the same number of shells', 'they are all metals'], why: 'Chemistry depends on outer electrons.' },
    { q: 'Group II elements form ions with charge…', a: '2+', w: ['2−', '1+', '6+'], why: 'They lose 2 outer electrons. Group VI forms 2− ions.' },
    { q: 'Noble gases are unreactive and monatomic because…', a: 'they have full outer shells', w: ['they are very heavy', 'they are liquids', 'they have no protons'], why: 'They don\'t need to bond.' },
    { q: 'Going DOWN Group I (Li, Na, K), reactivity…', a: 'increases', w: ['decreases', 'stays the same', 'drops to zero'], why: 'The outer electron is further from the nucleus and lost more easily. Melting point decreases, density increases.' },
    { q: 'Going DOWN Group VII (Cl, Br, I), reactivity…', a: 'decreases', w: ['increases', 'stays the same', 'doubles'], why: 'Density increases down the group.' },
    { q: 'Bromine at room temperature is…', a: 'a red-brown liquid', w: ['a pale yellow-green gas', 'a grey-black solid', 'a colourless gas'], why: 'Chlorine: yellow-green gas. Iodine: grey-black solid.' },
    { q: 'Chlorine water is added to potassium bromide solution. What happens?', a: 'Bromine is displaced (solution turns orange) because chlorine is more reactive', w: ['No reaction', 'Chlorine is displaced', 'Potassium is displaced'], why: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.' },
    { q: 'Iodine is added to potassium chloride solution. What happens?', a: 'No reaction: iodine is less reactive than chlorine', w: ['Chlorine is displaced', 'A white precipitate forms', 'It explodes'], why: 'A less reactive halogen cannot displace a more reactive one.' },
    { q: 'Which is a typical property of transition elements?', a: 'They form coloured compounds and often act as catalysts', w: ['Low melting points', 'Low densities', 'Only one oxidation number'], why: 'Also high density, high melting point, variable oxidation numbers.' },
    { q: 'Rubidium is below potassium in Group I. Predict how it reacts with water.', a: 'Even more violently than potassium', w: ['Less violently than lithium', 'Not at all', 'The same as sodium'], why: 'Reactivity increases down Group I.' }
  ]);
  bank('chMetals', [
    { q: 'Which is a typical property of metals?', a: 'Good conductors of heat and electricity', w: ['Low melting points', 'Brittle', 'Poor conductors'], why: 'Also malleable and ductile.' },
    { q: 'Aluminium is used for aircraft because of its…', a: 'low density', w: ['high density', 'colour', 'magnetism'], why: 'Also overhead cables (low density, good conductor) and food containers (resists corrosion).' },
    { q: 'Copper is used for electrical wiring because it is…', a: 'a good electrical conductor and ductile', w: ['very reactive', 'magnetic', 'cheap and brittle'], why: 'It can be drawn into wires.' },
    { q: 'An alloy is…', a: 'a mixture of a metal with other elements', w: ['a pure metal', 'a compound of two metals', 'a type of ore'], why: 'Brass = copper + zinc; stainless steel = iron + chromium, nickel and carbon.' },
    { q: 'Alloys are harder than pure metals because…', a: 'different sized atoms stop the layers sliding over each other', w: ['they have more electrons', 'they are ionic', 'they are more reactive'], why: 'Distorted layers.' },
    { q: 'Stainless steel is used for cutlery because it is…', a: 'hard and resists rusting', w: ['soft and shiny', 'very reactive', 'a good insulator'], why: 'Chromium and nickel prevent rusting.' }
  ]);
  const REACT = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', 'carbon', 'zinc', 'iron', 'hydrogen', 'copper', 'silver', 'gold'];
  G.chDisplace = () => { const mets = ['magnesium', 'zinc', 'iron', 'copper', 'silver']; let a, b; do { a = pick(mets); b = pick(mets); } while (a === b); const yes = REACT.indexOf(a) < REACT.indexOf(b);
    return { kind: 'mcq', q: `<p>A piece of <b>${a}</b> is placed in aqueous <b>${b}${b === 'silver' ? '' : b === 'copper' || b === 'iron' ? '(II)' : ''} nitrate</b>. Is there a reaction?</p>`, choices: [`Yes: ${a} displaces ${b}`, 'No reaction'], a: yes ? `Yes: ${a} displaces ${b}` : 'No reaction', hint: 'A more reactive metal displaces a less reactive metal from a solution of its ions.', steps: [`Reactivity: … magnesium > zinc > iron > copper > silver`, yes ? `${a} is MORE reactive than ${b}, so it gives its electrons to the ${b} ions: <b>reaction</b>.` : `${a} is LESS reactive than ${b}: <b>no reaction</b>.`] }; };
  bank('chReactivity', [
    { q: 'Which metal reacts with cold water?', a: 'Sodium', w: ['Copper', 'Iron', 'Gold'], why: 'Potassium, sodium and calcium react with cold water to give a hydroxide and hydrogen.' },
    { q: 'Magnesium reacts with steam to give…', a: 'magnesium oxide and hydrogen', w: ['magnesium hydroxide only', 'no products', 'oxygen'], why: 'Mg + H₂O → MgO + H₂.' },
    { q: 'Which metal does NOT react with dilute hydrochloric acid?', a: 'Copper', w: ['Magnesium', 'Zinc', 'Iron'], why: 'Metals below hydrogen in the reactivity series don\'t.' },
    { q: 'Aluminium seems unreactive because…', a: 'a thin, tough oxide layer protects its surface', w: ['it is below gold', 'it has no electrons', 'it is a non-metal'], why: 'Underneath, it is quite reactive.' },
    { q: 'A more reactive metal…', a: 'forms positive ions more easily', w: ['forms negative ions', 'never reacts with acid', 'has more protons'], why: 'Reactivity = tendency to lose electrons.' },
    { q: 'Which order is correct (most reactive first)?', a: 'potassium, magnesium, zinc, copper', w: ['copper, zinc, magnesium, potassium', 'zinc, potassium, copper, magnesium', 'magnesium, potassium, copper, zinc'], why: 'K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au.' }
  ]);
  bank('chRustExtract', [
    { q: 'Iron rusts when it is in contact with…', a: 'both oxygen (air) and water', w: ['air only', 'water only', 'neither'], why: 'Rust is hydrated iron(III) oxide.' },
    { q: 'Painting a bridge prevents rusting because…', a: 'it keeps out oxygen and water (a barrier)', w: ['paint reacts with rust', 'paint is magnetic', 'it makes iron more reactive'], why: 'Also greasing, oiling, plastic coating.' },
    { q: 'In galvanising, iron is coated with zinc. Even if scratched, the iron doesn\'t rust because…', a: 'zinc is more reactive and corrodes instead, losing electrons (sacrificial protection)', w: ['zinc is less reactive', 'zinc is a barrier only', 'zinc turns into iron'], why: 'Zinc gives electrons to iron.' },
    { q: 'Why is aluminium extracted by electrolysis, not by heating with carbon?', a: 'Aluminium is more reactive than carbon', w: ['Aluminium is less reactive than carbon', 'Carbon is too expensive', 'Aluminium is a liquid'], why: 'Carbon can only reduce oxides of metals below it in the series.' },
    { q: 'In the blast furnace, iron(III) oxide is reduced by…', a: 'carbon monoxide', w: ['oxygen', 'limestone', 'nitrogen'], why: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂.' },
    { q: 'Limestone is added to the blast furnace to…', a: 'remove impurities (silicon dioxide) as slag', w: ['provide heat', 'reduce the iron oxide', 'cool the furnace'], why: 'CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag).' },
    { q: 'Cryolite is used in aluminium extraction to…', a: 'lower the melting point of aluminium oxide, saving energy', w: ['react with aluminium', 'make the anodes', 'colour the aluminium'], why: 'Molten Al₂O₃ in cryolite is electrolysed.' },
    { q: 'The carbon anodes in aluminium extraction must be replaced because…', a: 'oxygen made at the anode reacts with the carbon to form CO₂', w: ['aluminium dissolves them', 'they melt', 'they turn into cryolite'], why: 'They burn away.' },
    { q: 'Gold is found as the metal itself because…', a: 'it is very unreactive', w: ['it is very reactive', 'it is light', 'it is magnetic'], why: 'The less reactive a metal, the easier it is to extract.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'chemistry', id: 'ch-reactions', name: 'Energy, rates and redox', icon: '🔋', color: '#0d9488', book: BOOK,
    blurb: 'Syllabus sections 4–6: electrolysis, fuel cells, energy changes, rates, equilibrium and redox.',
    lessons: [
      { id: 'ch-electrolysis', title: 'Electrolysis', obj: ['4.1', '4.2'], kw: 'electrolysis electrodes cathode anode electroplating fuel cell', learn: [],
        hook: 'Use electricity to rip compounds apart.',
        scenes: [
          { say: idea('In a molten or dissolved ionic compound, the ions can move. Connect a battery: <b>positive ions</b> drift to the <b>negative electrode</b> (cathode) and <b>gain</b> electrons; <b>negative ions</b> drift to the <b>positive electrode</b> (anode) and <b>lose</b> electrons. The compound splits into elements.') },
          { say: 'Pick an electrolyte and see what forms.', anim: X([{ k: 'e', label: 'Electrolyte', min: 0, max: 5, v: 0, fmt: i => ['molten PbBr₂', 'conc. NaCl(aq)', 'dilute H₂SO₄', 'CuSO₄(aq), carbon', 'CuSO₄(aq), copper', 'molten Al₂O₃'][i] }], v => { const d = [['lead (grey metal)', 'bromine (red-brown vapour)'], ['hydrogen (bubbles)', 'chlorine (bubbles, bleaches litmus)'], ['hydrogen', 'oxygen'], ['copper (pink coating)', 'oxygen (bubbles); blue colour fades'], ['copper (cathode grows)', 'anode dissolves; blue colour stays'], ['aluminium', 'oxygen']][v.e]; return `${S.svg(300, 150, `<rect x="50" y="40" width="200" height="100" fill="color-mix(in srgb, var(--c5) 18%, transparent)" stroke="var(--text)" stroke-width="2"/><rect x="85" y="20" width="12" height="90" fill="var(--muted)"/><rect x="203" y="20" width="12" height="90" fill="var(--muted)"/>${S.txt(91, 14, '− cathode', 'tick')}${S.txt(209, 14, '+ anode', 'tick')}${S.arrow(150, 80, 105, 80, 'var(--c4)', 2)}${S.txt(150, 74, '+ ions', 'tick')}${S.arrow(150, 110, 195, 110, 'var(--c3)', 2)}${S.txt(150, 128, '− ions', 'tick')}`)}<p class="center">Cathode: <b>${d[0]}</b> · Anode: <b>${d[1]}</b></p>`; }) },
          { say: 'Rules: at the cathode, a <b>metal</b> forms, or <b>hydrogen</b> if the metal is more reactive than hydrogen (in solutions). At the anode, a <b>non-metal</b>: a halogen from a concentrated halide, otherwise usually oxygen.',
            ask: T('Electrolysis of molten zinc chloride. Product at the cathode?', ['zinc', 'chlorine', 'hydrogen', 'oxygen'], 0, 'Molten binary compound: metal at the cathode, non-metal at the anode.') },
          { say: 'Half-equations: cathode (reduction) Cu²⁺ + 2e⁻ → Cu; anode (oxidation) 2Cl⁻ → Cl₂ + 2e⁻. <b>Electroplating</b>: make the object the cathode in a solution of the plating metal\'s ions. A <b>hydrogen–oxygen fuel cell</b> makes electricity with water as the only product.' }
        ],
        keys: ['Electrolysis: molten/aqueous ionic compound split by current.', 'Cathode (−): metal or H₂ — reduction. Anode (+): non-metal — oxidation.', 'Electrons flow in the wires; ions move in the electrolyte.', 'Electroplating: object = cathode. Fuel cell: H₂ + O₂ → electricity + water.'],
        gens: ['chElecProducts', 'chElec'], easy: ['chElec'] },
      { id: 'ch-energetics', title: 'Energy changes in reactions', obj: ['5.1'], kw: 'exothermic endothermic enthalpy activation energy bond energy', learn: [],
        hook: 'Hand warmers, cold packs, and why fuels burn.',
        scenes: [
          { say: idea('Breaking bonds <b>takes in</b> energy; making bonds <b>gives out</b> energy. If making the new bonds gives out <b>more</b> than breaking the old ones took in, the reaction is <b>exothermic</b> (gets hot, ΔH negative). If less, it is <b>endothermic</b> (gets cold, ΔH positive).') },
          { say: 'Build a reaction pathway diagram.', anim: X([{ k: 'dH', label: 'ΔH (kJ/mol)', min: -200, max: 200, step: 20, v: -100 }, { k: 'Ea', label: 'Activation energy', min: 40, max: 260, step: 20, v: 160 }, { k: 'c', label: 'Catalyst', min: 0, max: 1, v: 0, fmt: i => ['no', 'yes'][i] }], v => `${S.pathway(v.dH, Math.max(v.Ea, v.dH + 40), v.c)}<p class="center">${v.dH < 0 ? '🔥 Exothermic: products lower than reactants' : v.dH > 0 ? '🧊 Endothermic: products higher than reactants' : 'No overall change'}${v.c ? ' · the catalyst lowers Ea but not ΔH' : ''}</p>`) },
          { say: 'Calculating ΔH from bond energies:', pic: eq('ΔH = energy to break bonds − energy released making bonds') + '<p class="center">H–H (436) + Cl–Cl (242) = 678 in · 2 × H–Cl (431) = 862 out · ΔH = 678 − 862 = <b>−184 kJ/mol</b></p>',
            ask: T('A reaction takes in 500 kJ breaking bonds and gives out 700 kJ making bonds. ΔH?', ['−200 kJ/mol', '+200 kJ/mol', '+1200 kJ/mol', '−1200 kJ/mol'], 0, '500 − 700 = −200: exothermic.') }
        ],
        keys: ['Exothermic: surroundings heat up, ΔH −. Endothermic: cool down, ΔH +.', 'Bond breaking = endothermic; bond making = exothermic.', 'ΔH = bonds broken − bonds made.', 'Ea = minimum collision energy to react.'],
        gens: ['chBondEnergy', 'chEnergetics'], easy: ['chEnergetics'] },
      { id: 'ch-rates', title: 'Rates of reaction', obj: ['6.1', '6.2'], kw: 'rate of reaction collision theory catalyst temperature concentration surface area', learn: [],
        hook: 'Why food lasts longer in the fridge.',
        scenes: [
          { say: idea('Particles only react when they <b>collide</b> with <b>enough energy</b> (at least the activation energy). Anything that makes <b>more collisions per second</b>, or makes <b>more of them energetic enough</b>, speeds the reaction up.') },
          { say: 'Turn up the temperature.', anim: X([{ k: 't', label: 'Temperature (°C)', min: 10, max: 80, step: 10, v: 20 }], v => { const f = Math.min(98, r(4 * Math.pow(2, (v.t - 20) / 10), 0)); return `${S.particles('gas', v.t / 80)}<p class="center">collisions with energy ≥ Ea: about <b>${f}%</b></p><p class="center small muted">Faster particles: more frequent collisions AND many more energetic ones. (Roughly doubles every 10 °C.)</p>`; }) },
          { say: 'Factors: higher <b>concentration</b> or gas <b>pressure</b> (more particles per volume), larger <b>surface area</b> (powder beats lumps), higher <b>temperature</b>, and a <b>catalyst</b> (lower Ea, unchanged at the end).',
            ask: T('Which makes marble react FASTER with acid?', ['Crushing it into powder', 'Using bigger lumps', 'Cooling the acid', 'Diluting the acid'], 0, 'More surface area → more collisions.') },
          { say: 'Following a rate: measure gas given off (gas syringe) or mass lost over time. The graph is steepest at the start and flattens when a reactant runs out.', pic: K.plot([{ f: x => 60 * (1 - Math.exp(-x / 12)) }, { f: x => 60 * (1 - Math.exp(-x / 5)), dash: true }], [], { xmin: 0, xmax: 50, ymin: 0, ymax: 70, h: 180, gstep: 1e9, lstep: 1e9, xlab: 'time', ylab: 'gas volume' }) + '<p class="center small muted">dashed: faster (e.g. hotter); same final volume</p>' },
          { say: '<b>Chemical change</b>: a new substance forms (often hard to reverse). <b>Physical change</b>: no new substance (melting, dissolving).' }
        ],
        keys: ['Collision theory: frequency of collisions + energy ≥ Ea.', 'Faster: ↑ concentration/pressure, ↑ surface area, ↑ temperature, catalyst.', 'Catalyst: lowers Ea, unchanged at the end.', 'Steepest gradient = fastest rate.'],
        gens: ['chRate', 'chRates'], easy: ['chRates'] },
      { id: 'ch-equilibrium', title: 'Reversible reactions and equilibrium', obj: ['6.3'], kw: 'reversible reaction equilibrium haber process contact process', learn: [],
        hook: 'Some reactions run both ways at once, and industry has to bargain with them.',
        scenes: [
          { say: idea('A <b>reversible</b> reaction (⇌) can go forwards and backwards. In a closed container it settles at <b>equilibrium</b>: both directions keep going at the <b>same rate</b>, so the amounts stop changing. Change the conditions and the equilibrium <b>shifts to oppose the change</b>.') },
          { say: 'The Haber process: N₂ + 3H₂ ⇌ 2NH₃ (forward is exothermic). Change the conditions (approximate values).', anim: X([{ k: 'T', label: 'Temperature (°C)', min: 300, max: 600, step: 50, v: 450 }, { k: 'P', label: 'Pressure (atm)', min: 50, max: 400, step: 50, v: 200 }], v => { const y = Math.max(3, Math.min(70, r(25 * (v.P / 200) ** .7 * Math.exp(-(v.T - 450) / 90), 0))), rate = r(Math.pow(2, (v.T - 450) / 50) * 10, 0); return `<p class="center">yield of ammonia ≈ <b>${y}%</b></p><div class="xbar"><div style="width:${y}%"></div></div><p class="center">rate ≈ <b>${rate}</b> (450 °C = 10)</p><div class="xbar"><div style="width:${Math.min(100, rate * 2)}%"></div></div><p class="center small muted">${v.T < 400 ? 'Great yield, but painfully slow.' : v.T > 500 ? 'Fast, but the yield is poor.' : 'A compromise.'} ${v.P > 250 ? 'Very high pressure: expensive and dangerous.' : ''}</p>`; }) },
          { say: 'Predicting shifts: <b>higher temperature</b> favours the endothermic direction; <b>higher pressure</b> favours the side with fewer gas molecules; <b>adding a reactant</b> pushes towards products; a <b>catalyst</b> doesn\'t shift it, it just gets there faster.',
            ask: T('Haber: why is the pressure HIGH (200 atm)?', ['Fewer gas molecules on the right (2 vs 4), so more NH₃', 'It makes the reaction endothermic', 'The catalyst needs it'], 0, 'High pressure → higher yield and faster rate.') },
          { say: 'Conditions to learn:', pic: '<p><b>Haber</b>: N₂ (air) + 3H₂ (methane) ⇌ 2NH₃ · 450 °C, 200 atm (20 000 kPa), iron catalyst.</p><p><b>Contact</b>: 2SO₂ + O₂ ⇌ 2SO₃ · 450 °C, 2 atm (200 kPa), vanadium(V) oxide catalyst. SO₂ from burning sulfur or roasting sulfide ores.</p><p>Hydrated CuSO₄ (blue) ⇌ anhydrous (white) + water. CoCl₂: pink hydrated ⇌ blue anhydrous.</p>' }
        ],
        keys: ['Equilibrium: forward rate = reverse rate; concentrations constant (closed system).', 'Shifts oppose changes in temperature, pressure, concentration; catalysts don\'t shift it.', 'Haber: 450 °C, 200 atm, Fe. Contact: 450 °C, 2 atm, V₂O₅.', 'Conditions = compromise of rate, yield, safety and cost.'],
        gens: ['chEquilibrium'], easy: ['chEquilibrium'] },
      { id: 'ch-redox', title: 'Redox', obj: ['6.4'], kw: 'redox oxidation reduction oxidation number oxidising agent reducing agent', learn: [],
        hook: 'Rusting, burning, batteries: one idea links them all.',
        scenes: [
          { say: idea('<b>Oxidation</b> and <b>reduction</b> always happen together (<b>redox</b>). One substance <b>loses electrons</b> (oxidised), another <b>gains</b> them (reduced). Remember <b>OIL RIG</b>: Oxidation Is Loss, Reduction Is Gain.') },
          { say: 'Magnesium in copper(II) sulfate solution:', anim: { type: 'reveal', keep: true, stages: ['<p class="center bigq">Mg + Cu²⁺ → Mg²⁺ + Cu</p>', '<p class="center">Mg → Mg²⁺ + 2e⁻ &nbsp; (loses electrons: <b>oxidised</b>)</p>', '<p class="center">Cu²⁺ + 2e⁻ → Cu &nbsp; (gains electrons: <b>reduced</b>)</p>', '<p class="center">Mg is the <b>reducing agent</b> (it gives electrons). Cu²⁺ is the <b>oxidising agent</b>.</p>'] } },
          { say: 'Oxidation numbers track electrons. Rules: element alone = 0; simple ion = its charge; O = −2, H = +1; they add up to the overall charge. An <b>increase</b> = oxidation.', pic: '<p class="center">In MnO₄⁻: Mn + 4(−2) = −1 → Mn = <b>+7</b> · written manganate(VII)</p>',
            ask: T('In CuO + H₂ → Cu + H₂O, which is oxidised?', ['H₂ (it gains oxygen)', 'CuO', 'Cu', 'H₂O'], 0, 'CuO loses oxygen (reduced); H₂ gains oxygen (oxidised).') },
          { say: 'Tests: acidified potassium manganate(VII) goes <b>purple → colourless</b> with a reducing agent; potassium iodide goes <b>colourless → brown</b> with an oxidising agent.' }
        ],
        keys: ['Oxidation: + oxygen, − electrons, ↑ oxidation number. Reduction: the opposite.', 'Oxidising agent is reduced; reducing agent is oxidised.', 'Roman numerals = oxidation numbers, e.g. iron(III).', 'KMnO₄ purple→colourless (reducing agent); KI → brown (oxidising agent).'],
        gens: ['chOxNum', 'chRedox'], easy: ['chRedox'] }
    ] });

  R2O.addModule({ subject: 'chemistry', id: 'ch-acids', name: 'Acids, bases and salts', icon: '🍋', color: '#ea580c', book: BOOK,
    blurb: 'Syllabus section 7: acids and alkalis, pH and indicators, strong and weak acids, oxides and making salts.',
    lessons: [
      { id: 'ch-acidbase', title: 'Acids, alkalis and pH', obj: ['7.1'], kw: 'acids alkalis ph indicators neutralisation strong weak', learn: [],
        hook: 'Lemon juice, soap and stomach acid on one scale.',
        scenes: [
          { say: idea('An <b>acid</b> gives away H⁺ ions (protons) in water; an <b>alkali</b> gives OH⁻ ions. Mix them and H⁺ + OH⁻ → H₂O: they cancel out (<b>neutralisation</b>). The <b>pH</b> scale measures how acidic or alkaline something is.') },
          { say: 'Slide the pH.', anim: X([{ k: 'p', label: 'pH', min: 0, max: 14, v: 3 }], v => `${S.phbar(v.p)}<p class="center bigq">${v.p < 7 ? 'acidic' : v.p > 7 ? 'alkaline' : 'neutral'}${v.p <= 2 || v.p >= 12 ? ' (strong)' : ''}</p><p class="center">litmus: <b>${v.p < 7 ? 'red' : v.p > 7 ? 'blue' : 'purple'}</b> · methyl orange: <b>${v.p < 4 ? 'red' : 'yellow'}</b> · thymolphthalein: <b>${v.p > 10 ? 'blue' : 'colourless'}</b></p><p class="center small muted">Lower pH = more H⁺ ions.</p>`) },
          { say: 'Reactions of acids:', pic: '<ul><li>acid + metal → salt + hydrogen</li><li>acid + base → salt + water</li><li>acid + carbonate → salt + water + carbon dioxide</li><li>base + ammonium salt → salt + water + ammonia</li></ul>',
            ask: T('Zinc + sulfuric acid →', ['zinc sulfate + hydrogen', 'zinc sulfate + water', 'zinc oxide + hydrogen', 'no reaction'], 0, 'Acid + metal → salt + hydrogen.') },
          { say: '<b>Strong</b> acids (HCl, HNO₃, H₂SO₄) dissociate <b>completely</b>: HCl → H⁺ + Cl⁻. <b>Weak</b> acids (carboxylic acids like ethanoic acid) dissociate only <b>partly</b>: CH₃COOH ⇌ H⁺ + CH₃COO⁻. Bases are metal oxides and hydroxides; alkalis are bases that dissolve.' }
        ],
        keys: ['Acid: H⁺ (proton donor). Alkali: OH⁻. Base: proton acceptor (metal oxide/hydroxide).', 'H⁺ + OH⁻ → H₂O.', 'Litmus, methyl orange, thymolphthalein colours; universal indicator for pH.', 'Strong = fully dissociated; weak = partially (⇌).'],
        gens: ['chpH', 'chAcidBase'], easy: ['chpH'] },
      { id: 'ch-salts', title: 'Oxides and making salts', obj: ['7.2', '7.3'], kw: 'oxides salts preparation titration precipitation solubility', learn: [],
        hook: 'How chemists make pure crystals on purpose.',
        scenes: [
          { say: idea('A <b>salt</b> is what you get when an acid\'s hydrogen is replaced by a metal (or ammonium). How you make it depends on whether the salt and the things you start with <b>dissolve</b>: that decides whether you <b>filter off extra solid</b>, <b>titrate</b>, or <b>precipitate</b>.') },
          { say: 'Choose a method:', anim: { type: 'reveal', keep: true, stages: ['<p>Is the salt <b>soluble</b>?</p>', '<p>➡️ <b>No</b> → <b>precipitation</b>: mix two solutions, filter, wash, dry. (e.g. barium sulfate)</p>', '<p>➡️ <b>Yes</b>, starting from an <b>insoluble</b> metal, base or carbonate → add it in <b>excess</b> to the acid, filter off the leftover, then crystallise.</p>', '<p>➡️ <b>Yes</b>, starting from an <b>alkali</b> (soluble) → <b>titration</b> to find the exact amounts, then repeat without indicator and crystallise.</p>'] } },
          { say: 'Solubility rules:', pic: '<ul><li>All sodium, potassium and ammonium salts and all nitrates: <b>soluble</b></li><li>Chlorides: soluble except <b>lead and silver</b></li><li>Sulfates: soluble except <b>barium, calcium and lead</b></li><li>Carbonates and hydroxides: <b>insoluble</b> except sodium, potassium, ammonium (calcium hydroxide slightly soluble)</li></ul>',
            ask: T('Silver chloride is…', ['insoluble, so made by precipitation', 'soluble, so made by titration', 'made from silver + acid'], 0, 'Chlorides are soluble except lead and silver.') },
          { say: '<b>Oxides</b>: non-metal oxides (CO₂, SO₂) are <b>acidic</b>; metal oxides (CuO, CaO) are <b>basic</b>; Al₂O₃ and ZnO are <b>amphoteric</b> (react with acids and bases). Hydrated crystals contain <b>water of crystallisation</b>, e.g. CuSO₄•5H₂O.' }
        ],
        keys: ['Insoluble salt → precipitation.', 'Soluble salt + insoluble reactant → excess, filter, crystallise. + alkali → titration.', 'Solubility rules (Na/K/NH₄/nitrates; chlorides; sulfates; carbonates/hydroxides).', 'Acidic, basic and amphoteric oxides.'],
        gens: ['chSoluble', 'chSalts'], easy: ['chSoluble'] }
    ] });

  R2O.addModule({ subject: 'chemistry', id: 'ch-table', name: 'The Periodic Table and metals', icon: '🔢', color: '#7c3aed', book: BOOK,
    blurb: 'Syllabus sections 8–9: groups and periods, Group I, Group VII, transition elements, noble gases, metals, alloys, reactivity, corrosion and extraction.',
    lessons: [
      { id: 'ch-periodic', title: 'Groups and trends', obj: ['8.1', '8.2', '8.3', '8.4', '8.5'], kw: 'periodic table group I alkali metals group VII halogens transition elements noble gases', learn: [],
        hook: 'One table that predicts how 118 elements behave.',
        scenes: [
          { say: idea('Elements in the same <b>group</b> have the same number of <b>outer electrons</b>, so they react in similar ways, with a steady <b>trend</b> down the group. Across a <b>period</b>, elements change from <b>metals to non-metals</b>.') },
          { say: 'Walk down Group I (the alkali metals).', anim: X([{ k: 'e', label: 'Element', min: 0, max: 2, v: 1, fmt: i => ['lithium', 'sodium', 'potassium'][i] }], v => `<p class="center bigq">${['🫧 fizzes steadily', '💨 whizzes around, melts into a ball', '🔥 bursts into lilac flame'][v.e]}</p><p class="center">with water → hydroxide + hydrogen</p><p class="center small">reactivity ↑ · melting point ↓ · density ↑ going down</p><p class="center small muted">The outer electron is further from the nucleus, so it is lost more easily.</p>`) },
          { say: 'Now Group VII (the halogens, diatomic: Cl₂, Br₂, I₂).', anim: X([{ k: 'e', label: 'Element', min: 0, max: 2, v: 1, fmt: i => ['chlorine', 'bromine', 'iodine'][i] }], v => `<p class="center bigq">${['🟢 pale yellow-green gas', '🟤 red-brown liquid', '⚫ grey-black solid'][v.e]}</p><p class="center small">reactivity ↓ · density ↑ going down</p>`) },
          { say: 'A more reactive halogen <b>displaces</b> a less reactive one from its salt: Cl₂ + 2KBr → 2KCl + Br₂ (solution turns orange).',
            ask: T('Will bromine displace chlorine from potassium chloride?', ['No: bromine is less reactive', 'Yes', 'Only if heated'], 0, 'Only a more reactive halogen can displace.') },
          { say: '<b>Transition elements</b>: high density, high melting point, variable oxidation numbers, coloured compounds, catalysts. <b>Noble gases</b> (Group VIII): full outer shells, unreactive, monatomic. Group number tells the ion charge: I → 1+, II → 2+, VI → 2−, VII → 1−.' }
        ],
        keys: ['Same group → same outer electrons → similar reactions.', 'Group I down: more reactive, lower m.p., denser.', 'Group VII down: less reactive, denser; Cl₂ gas, Br₂ liquid, I₂ solid; displacement.', 'Transition metals: coloured compounds, catalysts, variable oxidation numbers.'],
        gens: ['chPeriodic', 'chGroup'], easy: ['chPeriodic'] },
      { id: 'ch-metals', title: 'Metals, alloys and reactivity', obj: ['9.1', '9.2', '9.3', '9.4'], kw: 'metals alloys reactivity series displacement', learn: [],
        hook: 'Why gold stays shiny for thousands of years but sodium is kept under oil.',
        scenes: [
          { say: idea('Metals react by <b>losing electrons</b> to form positive ions. The <b>reactivity series</b> ranks how eagerly they do it. A more reactive metal will even <b>steal</b> the place of a less reactive one in its compounds (displacement).') },
          { say: 'Pick a metal.', anim: X([{ k: 'm', label: 'Metal', min: 0, max: 7, v: 3, fmt: i => ['potassium', 'sodium', 'calcium', 'magnesium', 'zinc', 'iron', 'copper', 'gold'][i] }], v => `<p class="center bigq">${['K', 'Na', 'Ca', 'Mg', 'Zn', 'Fe', 'Cu', 'Au'][v.m]}</p><p class="center">cold water: <b>${v.m <= 2 ? 'reacts (hydroxide + hydrogen)' : 'no reaction'}</b></p><p class="center">steam: <b>${v.m <= 2 ? 'violent' : v.m === 3 ? 'reacts (oxide + hydrogen)' : v.m <= 5 ? 'slowly, when hot' : 'no reaction'}</b></p><p class="center">dilute HCl: <b>${v.m <= 2 ? 'dangerously violent' : v.m <= 5 ? 'fizzes (salt + hydrogen)' : 'no reaction (below hydrogen)'}</b></p>`) },
          { say: 'The series: <b>K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au</b>. Aluminium looks unreactive only because of a tough oxide layer.',
            ask: T('Zinc is added to copper(II) sulfate solution. What happens?', ['Copper is displaced; zinc sulfate forms', 'No reaction', 'Zinc is displaced'], 0, 'Zinc is more reactive than copper.') },
          { say: 'Physical properties: metals conduct heat and electricity, are malleable and ductile, usually high melting points. <b>Alloys</b> (brass = Cu + Zn; stainless steel = Fe + Cr, Ni, C) are harder because different-sized atoms stop layers sliding.', pic: S.metal(true) }
        ],
        keys: ['Reactivity series K Na Ca Mg Al C Zn Fe H Cu Ag Au.', 'More reactive metals displace less reactive ones from solutions.', 'Reactions with water/steam/acid follow the series.', 'Alloys: harder because layers can\'t slide; uses match properties.'],
        gens: ['chDisplace', 'chReactivity', 'chMetals'], easy: ['chMetals'] },
      { id: 'ch-extraction', title: 'Corrosion and extracting metals', obj: ['9.5', '9.6'], kw: 'rusting galvanising sacrificial protection blast furnace aluminium extraction', learn: [],
        hook: 'Getting metals out of rocks, and stopping them going back.',
        scenes: [
          { say: idea('Most metals are found as <b>compounds</b> (ores). The more reactive a metal, the more tightly it holds on, and the harder it is to extract. Carbon can pull oxygen from metals <b>below it</b> in the series; metals <b>above</b> carbon need <b>electrolysis</b>.') },
          { say: 'Pick a metal to extract.', anim: X([{ k: 'm', label: 'Metal', min: 0, max: 4, v: 2, fmt: i => ['aluminium', 'zinc', 'iron', 'copper', 'gold'][i] }], v => `<p class="center bigq">${['⚡ electrolysis (more reactive than carbon)', '🔥 heat with carbon', '🔥 heat with carbon (blast furnace)', '🔥 heat with carbon', '⛏️ found pure: just dig it up'][v.m]}</p>`) },
          { say: 'The <b>blast furnace</b>:', pic: '<ol><li>C + O₂ → CO₂ (burning coke gives heat)</li><li>CO₂ + C → 2CO</li><li>Fe₂O₃ + 3CO → 2Fe + 3CO₂ (reduction)</li><li>CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag removes impurities)</li></ol><p><b>Aluminium</b>: electrolysis of Al₂O₃ dissolved in molten <b>cryolite</b> (lower melting point). Al³⁺ + 3e⁻ → Al at the cathode; oxygen at the carbon anodes burns them away, so they are replaced.</p>' },
          { say: '<b>Rusting</b> needs <b>oxygen and water</b>. Prevent it with barriers (paint, grease, plastic) or <b>sacrificial protection</b>: attach a more reactive metal (zinc) that corrodes instead. Galvanising (zinc coating) does both.',
            ask: T('A scratched galvanised bucket still doesn\'t rust because…', ['zinc is more reactive and corrodes instead of the iron', 'the scratch heals', 'zinc is less reactive than iron'], 0, 'Zinc loses electrons in preference to iron.') }
        ],
        keys: ['Ease of extraction depends on reactivity.', 'Blast furnace: CO reduces Fe₂O₃; limestone forms slag.', 'Al: electrolysis in cryolite; carbon anodes burn away.', 'Rusting needs O₂ + H₂O; barrier methods; sacrificial protection; galvanising.'],
        gens: ['chRustExtract'], easy: ['chRustExtract'] }
    ] });
})();
