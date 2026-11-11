// Chemistry 5070, part 3: chemistry of the environment (10), organic chemistry (11),
// experimental techniques and chemical analysis (12).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Chemistry 2e', 'https://openstax.org/details/books/chemistry-2e'];
  const svg = S.svg, txt = S.txt;

  // ================= organic helpers =================
  const STEM = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex'];
  const sub = k => String(k).split('').map(c => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('');
  const F = (c, h, extra = '') => `C${c > 1 ? sub(c) : ''}H${sub(h)}${extra}`;
  S.organic = (nC, type) => {
    if (type === 'ane') return { name: STEM[nC] + 'ane', formula: F(nC, 2 * nC + 2), general: 'CₙH₂ₙ₊₂' };
    if (type === 'ene') return { name: nC > 3 ? STEM[nC] + '-1-ene' : STEM[nC] + 'ene', formula: F(nC, 2 * nC), general: 'CₙH₂ₙ' };
    if (type === 'ol') return { name: nC > 2 ? STEM[nC] + 'an-1-ol' : STEM[nC] + 'anol', formula: `${F(nC, 2 * nC + 1)}OH`, general: 'CₙH₂ₙ₊₁OH' };
    return { name: STEM[nC] + 'anoic acid', formula: nC === 1 ? 'HCOOH' : `${F(nC - 1, 2 * nC - 1)}COOH`, general: 'CₙH₂ₙ₊₁COOH' };
  };
  // displayed formula of an unbranched chain: type ane | ene (C=C at the start) | ol (OH on the last C) | oic (COOH)
  S.displayed = (nC, type) => {
    const W = 60 + nC * 52 + (type === 'ol' || type === 'oic' ? 60 : 0), y = 70; let b = '';
    const at = (x, yy, t, c = 'lbl') => txt(x, yy + 5, t, c);
    const bond = (x1, y1, x2, y2, dbl) => dbl ? `<line x1="${x1}" y1="${y1 - 3}" x2="${x2}" y2="${y2 - 3}" class="thin"/><line x1="${x1}" y1="${y1 + 3}" x2="${x2}" y2="${y2 + 3}" class="thin"/>` : `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="thin"/>`;
    const xs = Array.from({ length: nC }, (_, i) => 50 + i * 52);
    xs.forEach((x, i) => {
      const last = i === nC - 1, acid = type === 'oic' && last;
      b += at(x, y, 'C', 'lbl big');
      if (i) b += bond(xs[i - 1] + 9, y, x - 9, y, type === 'ene' && i === 1);
      const dblHere = type === 'ene' && (i === 0 || i === 1);
      const nH = acid ? 0 : dblHere ? 1 : 2;
      if (nH >= 1) { b += bond(x, y - 9, x, y - 28) + at(x, y - 38, 'H'); }
      if (nH >= 2) { b += bond(x, y + 9, x, y + 28) + at(x, y + 38, 'H'); }
      if (i === 0 && !(type === 'oic' && nC === 1)) b += bond(x - 9, y, x - 28, y) + at(x - 38, y, 'H');
      if (last && !acid) {
        if (type === 'ol') b += bond(x + 9, y, x + 28, y) + at(x + 40, y, 'O') + bond(x + 52, y, x + 70, y) + at(x + 80, y, 'H');
        else if (!(type === 'ene' && nC === 1)) b += bond(x + 9, y, x + 28, y) + at(x + 38, y, 'H');
      }
      if (acid) { b += bond(x, y - 9, x, y - 28, true) + at(x, y - 38, 'O') + bond(x + 9, y, x + 28, y) + at(x + 40, y, 'O') + bond(x + 52, y, x + 70, y) + at(x + 80, y, 'H'); if (nC === 1) b += bond(x - 9, y, x - 28, y) + at(x - 38, y, 'H'); }
    });
    return svg(W, 140, b, Math.min(360, W));
  };
  S.sub = sub;

  // ================= generators =================
  bank('chWater', [
    { q: 'Anhydrous copper(II) sulfate turns from white to blue when…', a: 'water is added', w: ['it is heated', 'acid is added', 'it is cooled'], why: 'Anhydrous cobalt(II) chloride turns from blue to pink.' },
    { q: 'How can you show that a sample of water is pure?', a: 'It boils at exactly 100 °C and freezes at exactly 0 °C', w: ['It is colourless', 'It has no smell', 'It turns cobalt chloride pink'], why: 'Impurities change the melting and boiling points.' },
    { q: 'Distilled water is used in experiments rather than tap water because…', a: 'it contains fewer chemical impurities', w: ['it is colder', 'it reacts faster', 'it is cheaper'], why: 'Dissolved substances could interfere.' },
    { q: 'In water treatment, chlorine is added to…', a: 'kill microbes', w: ['remove solids', 'remove tastes and smells', 'add minerals'], why: 'Sedimentation and filtration remove solids; carbon removes tastes and odours.' },
    { q: 'Nitrates and phosphates from fertilisers in rivers cause…', a: 'deoxygenation of the water, harming aquatic life', w: ['more dissolved oxygen', 'acid rain', 'nothing harmful'], why: 'They cause rapid algae growth; decay uses up oxygen.' },
    { q: 'Which substance in river water is beneficial?', a: 'Dissolved oxygen', w: ['Sewage', 'Toxic metal compounds', 'Plastics'], why: 'Aquatic life needs it. Some metal compounds also supply essential minerals.' },
    { q: 'NPK fertilisers provide…', a: 'nitrogen, phosphorus and potassium for plant growth', w: ['nickel, platinum and krypton', 'sodium, potassium and calcium', 'only nitrogen'], why: 'Ammonium salts and nitrates are common fertilisers.' }
  ]);
  bank('chAir', [
    { q: 'Clean, dry air is about…', a: '78% nitrogen, 21% oxygen, the rest noble gases and CO₂', w: ['78% oxygen, 21% nitrogen', '50% nitrogen, 50% oxygen', '21% nitrogen, 78% carbon dioxide'], why: 'Mostly nitrogen.' },
    { q: 'Carbon monoxide is produced by…', a: 'incomplete combustion of carbon-containing fuels', w: ['complete combustion', 'photosynthesis', 'volcanoes only'], why: 'Not enough oxygen. CO is toxic.' },
    { q: 'Sulfur dioxide in the air comes from…', a: 'burning fossil fuels that contain sulfur compounds', w: ['animals digesting food', 'car tyres', 'photosynthesis'], why: 'It causes acid rain.' },
    { q: 'Oxides of nitrogen form in car engines because…', a: 'the high temperature makes nitrogen and oxygen from the air react', w: ['petrol contains nitrogen', 'catalysts make them', 'the exhaust is cold'], why: 'They cause acid rain, photochemical smog and breathing problems.' },
    { q: 'A catalytic converter removes NO and CO by the reaction…', a: '2CO + 2NO → 2CO₂ + N₂', w: ['CO + O₂ → CO₃', '2NO → N₂O₂', 'CO₂ → C + O₂'], why: 'Harmless N₂ and less harmful CO₂.' },
    { q: 'Methane in the atmosphere comes mainly from…', a: 'decomposing vegetation and digestion in animals', w: ['car exhausts', 'burning sulfur', 'volcanoes'], why: 'It is a powerful greenhouse gas.' },
    { q: 'Greenhouse gases cause global warming by…', a: 'absorbing thermal energy radiated by the Earth and reducing its loss to space', w: ['blocking sunlight from reaching the Earth', 'destroying oxygen', 'making acid rain'], why: 'They absorb and re-emit infrared.' },
    { q: 'Which strategy reduces acid rain?', a: 'Flue gas desulfurisation with calcium oxide', w: ['Planting trees', 'Burning more coal', 'More livestock farming'], why: 'Also low-sulfur fuels and catalytic converters.' },
    { q: 'Which strategy reduces climate change?', a: 'Using more renewable energy and hydrogen instead of fossil fuels', w: ['Using low-sulfur fuel', 'Building taller chimneys', 'Using more fertiliser'], why: 'Also planting trees and reducing livestock farming.' },
    { q: 'Particulates in the air increase the risk of…', a: 'respiratory problems and cancer', w: ['acid rain only', 'global cooling', 'nothing'], why: 'Tiny solid particles from incomplete combustion.' },
    { q: 'The word equation for photosynthesis is…', a: 'carbon dioxide + water → glucose + oxygen', w: ['glucose + oxygen → carbon dioxide + water', 'oxygen + water → glucose + carbon dioxide', 'carbon dioxide → carbon + oxygen'], why: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, using light and chlorophyll.' }
  ]);
  G.chOrgFormula = () => { const type = pick(['ane', 'ane', 'ene', 'ol', 'oic']), nC = type === 'ene' ? rnd(2, 4) : rnd(1, 5); const o = S.organic(nC, type); const plain = o.formula.replace(/[₀-₉]/g, d => '₀₁₂₃₄₅₆₇₈₉'.indexOf(d));
    return { kind: 'text', q: `<p>Write the molecular formula of <b>${o.name}</b>.</p><p class="small muted">General formula of this series: ${o.general}. Type subscripts as normal numbers, e.g. C2H6.</p>`, a: plain, accept: [plain, type === 'oic' ? `C${nC > 1 ? nC : ''}H${2 * nC}O2` : type === 'ol' ? `C${nC > 1 ? nC : ''}H${2 * nC + 2}O` : plain], ph: 'e.g. C3H8', hint: `"${STEM[nC]}-" means ${nC} carbon${nC > 1 ? 's' : ''}. Use the general formula ${o.general}.`, steps: [`${STEM[nC]}- = ${nC} C`, `${o.general} → <b>${o.formula}</b>`] }; };
  G.chOrgName = () => { const type = pick(['ane', 'ene', 'ol', 'oic']), nC = type === 'ene' ? rnd(2, 3) : rnd(1, 4); const o = S.organic(nC, type); const wrong = [];
    ['ane', 'ene', 'ol', 'oic'].forEach(t => { [1, 2, 3, 4].forEach(k => { if ((t !== 'ene' || k > 1) && !(t === type && k === nC)) wrong.push(S.organic(k, t).name); }); });
    return { kind: 'mcq', q: `<p>Name this compound:</p>${S.displayed(nC, type)}`, choices: K.mcq(o.name, K.shuffle(wrong.filter(w => w.startsWith(STEM[nC]) || w.endsWith(o.name.slice(-4))))), a: o.name, hint: 'Count the carbons (meth 1, eth 2, prop 3, but 4) and look at the functional group: C=C → -ene, –OH → -ol, –COOH → -oic acid.', steps: [`${nC} carbon${nC > 1 ? 's' : ''} → ${STEM[nC]}-`, `functional group → <b>${o.name}</b>`] }; };
  const ESTERS = [['methanol', 'ethanoic acid', 'methyl ethanoate'], ['ethanol', 'ethanoic acid', 'ethyl ethanoate'], ['ethanol', 'methanoic acid', 'ethyl methanoate'], ['propanol', 'ethanoic acid', 'propyl ethanoate'], ['methanol', 'propanoic acid', 'methyl propanoate'], ['butanol', 'methanoic acid', 'butyl methanoate'], ['ethanol', 'butanoic acid', 'ethyl butanoate']];
  G.chEster = () => { const [al, ac, es] = pick(ESTERS); const alk = al.replace('anol', 'yl'), oate = ac.replace('oic acid', 'oate'); const wrong = [`${ac.replace('anoic acid', 'yl')} ${al.replace('anol', 'anoate')}`, `${alk} ${al.replace('anol', 'anoate')}`, `${ac.replace('anoic acid', 'yl')} ${oate}`, `${alk}anol ${oate}`];
    return { kind: 'mcq', q: `<p>${al[0].toUpperCase() + al.slice(1)} reacts with ${ac} (acid catalyst). Name the ester formed.</p>`, choices: K.mcq(es, wrong), a: es, hint: 'Alcohol part first, ending -yl; acid part second, ending -oate.', steps: [`${al} → ${alk}-`, `${ac} → -${oate}`, `<b>${es}</b>`] }; };
  bank('chOrganic', [
    { q: 'A homologous series has…', a: 'the same functional group and general formula, each member differing by CH₂', w: ['the same molecular formula', 'the same boiling point', 'only one member'], why: 'Physical properties show a trend; chemical properties are similar.' },
    { q: 'Structural isomers have…', a: 'the same molecular formula but different structural formulae', w: ['the same structural formula', 'different molecular formulae', 'different numbers of carbons'], why: 'E.g. butane and methylpropane, both C₄H₁₀.' },
    { q: 'An unsaturated compound contains…', a: 'at least one C=C (or other non-single) carbon–carbon bond', w: ['only C–C single bonds', 'no carbon', 'oxygen'], why: 'Alkenes are unsaturated; alkanes are saturated.' },
    { q: 'Aqueous bromine is shaken with an alkene. It turns…', a: 'from orange to colourless', w: ['from colourless to orange', 'from orange to blue', 'nothing happens'], why: 'Addition across the C=C. Alkanes leave it orange.' },
    { q: 'Petroleum is separated into fractions by…', a: 'fractional distillation', w: ['filtration', 'cracking', 'chromatography'], why: 'Different boiling points.' },
    { q: 'Fractions at the TOP of the fractionating column have…', a: 'shorter chains, lower boiling points, higher volatility, lower viscosity', w: ['longer chains and higher boiling points', 'higher viscosity', 'the most carbon atoms'], why: 'Small molecules rise furthest before condensing.' },
    { q: 'Which fraction is used for making roads?', a: 'Bitumen', w: ['Refinery gas', 'Naphtha', 'Kerosene'], why: 'Kerosene: jet fuel. Naphtha: chemical feedstock. Refinery gas: heating and cooking.' },
    { q: 'Which fraction is a chemical feedstock?', a: 'Naphtha', w: ['Bitumen', 'Fuel oil', 'Diesel'], why: 'Used to make other chemicals.' },
    { q: 'Cracking is used to…', a: 'break large alkanes into smaller, more useful alkanes and alkenes (and hydrogen)', w: ['join small molecules', 'separate petroleum', 'make polymers directly'], why: 'High temperature and a catalyst. There is more demand for small molecules.' },
    { q: 'Alkanes are generally unreactive except for…', a: 'combustion and substitution with chlorine in UV light', w: ['addition reactions', 'reacting with acids', 'turning bromine water colourless'], why: 'Substitution: one H is replaced by Cl.' },
    { q: 'Ethene + steam (acid catalyst) →', a: 'ethanol', w: ['ethane', 'ethanoic acid', 'poly(ethene)'], why: 'Addition of steam: 300 °C, 60 atm.' },
    { q: 'Ethene + hydrogen (nickel catalyst) →', a: 'ethane', w: ['ethanol', 'ethyne', 'methane'], why: 'Addition of hydrogen.' },
    { q: 'An advantage of making ethanol by fermentation rather than from ethene is…', a: 'it uses renewable sugar and low temperatures', w: ['it is faster', 'it makes pure ethanol', 'it is continuous'], why: 'But it is slow and batch-wise; the ethene route is fast and continuous but uses crude oil.' },
    { q: 'Fermentation of glucose needs…', a: 'yeast, 25–35 °C and no oxygen', w: ['a nickel catalyst and 300 °C', 'UV light', 'bromine water'], why: 'Glucose → ethanol + carbon dioxide.' },
    { q: 'Ethanol can be oxidised to ethanoic acid by…', a: 'acidified potassium manganate(VII), or bacteria (vinegar)', w: ['bromine water', 'hydrogen and nickel', 'cracking'], why: 'Carboxylic acids react with metals, bases and carbonates like other acids.' },
    { q: 'Ethanol is used as…', a: 'a solvent and a fuel', w: ['a polymer', 'a fertiliser', 'a refrigerant only'], why: 'It burns to give carbon dioxide and water.' }
  ]);
  const POLY = [['ethene', 'poly(ethene)'], ['propene', 'poly(propene)'], ['chloroethene', 'poly(chloroethene) (PVC)']];
  bank('chPolymers', [
    { q: 'A polymer is…', a: 'a large molecule made from many small monomers joined together', w: ['a small molecule', 'a mixture of metals', 'a type of salt'], why: 'Plastics are made from polymers.' },
    { q: 'Ethene molecules join to form…', a: 'poly(ethene), by addition polymerisation', w: ['ethanol', 'nylon', 'polyester'], why: 'The C=C opens up; only one product forms.' },
    { q: 'Condensation polymerisation is different from addition because…', a: 'a small molecule (such as water) is also produced', w: ['only one product forms', 'it uses alkenes', 'it doesn\'t need monomers'], why: 'Nylon and PET are condensation polymers.' },
    { q: 'Nylon is a…', a: 'polyamide, made from a dicarboxylic acid and a diamine', w: ['polyester', 'addition polymer', 'protein'], why: 'Amide linkages –CONH–.' },
    { q: 'PET is a…', a: 'polyester, made from a dicarboxylic acid and a diol', w: ['polyamide', 'addition polymer of ethene', 'natural polymer'], why: 'It can be converted back into monomers and re-polymerised.' },
    { q: 'Proteins are natural…', a: 'polyamides made from amino acid monomers', w: ['polyesters', 'addition polymers', 'alkanes'], why: 'Amino acids join by amide (peptide) linkages.' },
    { q: 'A problem with disposing of plastics is…', a: 'most don\'t biodegrade, so they fill landfill sites and build up in oceans', w: ['they dissolve in rain', 'they are too heavy', 'they turn into metals'], why: 'Burning them can release toxic gases.' }
  ]);
  G.chRf = () => { const s = pick([4, 5, 6, 8, 10]), d = r(s * pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]), 2); return num(`<p>On a chromatogram, the solvent front moved ${s} cm and a spot moved ${n(d)} cm from the baseline. Calculate the Rf value.</p>`, d / s, '', [`Rf = distance moved by substance ÷ distance moved by solvent = ${n(d)} ÷ ${s} = <b>${n(r(d / s, 3))}</b>`], 'Rf is always less than 1.'); };
  bank('chTests', [
    { q: 'A gas relights a glowing splint. It is…', a: 'oxygen', w: ['hydrogen', 'carbon dioxide', 'chlorine'], why: 'Hydrogen gives a squeaky pop with a lighted splint.' },
    { q: 'A gas gives a "pop" with a lighted splint. It is…', a: 'hydrogen', w: ['oxygen', 'ammonia', 'nitrogen'], why: 'Hydrogen burns with a squeaky pop.' },
    { q: 'Carbon dioxide is identified by…', a: 'turning limewater milky', w: ['relighting a glowing splint', 'bleaching litmus', 'turning red litmus blue'], why: 'Limewater = calcium hydroxide solution.' },
    { q: 'Chlorine is identified by…', a: 'bleaching damp litmus paper', w: ['turning limewater milky', 'a squeaky pop', 'relighting a splint'], why: 'It may turn blue litmus red first.' },
    { q: 'Ammonia turns damp red litmus paper…', a: 'blue', w: ['white', 'colourless', 'green'], why: 'Ammonia is alkaline.' },
    { q: 'Sulfur dioxide turns acidified potassium manganate(VII)…', a: 'from purple to colourless', w: ['from colourless to purple', 'green', 'milky'], why: 'SO₂ is a reducing agent.' },
    { q: 'A solution is acidified with dilute nitric acid, then aqueous silver nitrate is added. A white precipitate forms. The anion is…', a: 'chloride', w: ['bromide', 'iodide', 'sulfate'], why: 'Bromide: cream precipitate. Iodide: yellow precipitate.' },
    { q: 'Acidify, then add aqueous barium nitrate: a white precipitate. The anion is…', a: 'sulfate', w: ['chloride', 'carbonate', 'nitrate'], why: 'Barium sulfate is insoluble.' },
    { q: 'Adding dilute acid gives effervescence and a gas that turns limewater milky. The anion is…', a: 'carbonate', w: ['chloride', 'sulfate', 'nitrate'], why: 'CO₃²⁻ + 2H⁺ → CO₂ + H₂O.' },
    { q: 'Test for nitrate ions:', a: 'add aqueous NaOH and aluminium foil, warm: ammonia is given off', w: ['add silver nitrate: white precipitate', 'add barium nitrate: white precipitate', 'add limewater'], why: 'The nitrate is reduced to ammonia.' },
    { q: 'Adding a little acidified potassium manganate(VII) turns it colourless. This shows…', a: 'sulfite ions', w: ['sulfate ions', 'chloride ions', 'nitrate ions'], why: 'Sulfite is a reducing agent.' },
    { q: 'Aqueous NaOH gives a light blue precipitate, insoluble in excess. The cation is…', a: 'copper(II)', w: ['iron(III)', 'zinc', 'calcium'], why: 'With aqueous ammonia, Cu²⁺ gives a light blue precipitate that dissolves in excess to a dark blue solution.' },
    { q: 'Aqueous NaOH gives a red-brown precipitate. The cation is…', a: 'iron(III)', w: ['iron(II)', 'copper(II)', 'chromium(III)'], why: 'Iron(II) gives a green precipitate.' },
    { q: 'Aqueous NaOH gives a green precipitate, insoluble in excess. With ammonia, also green and insoluble. The cation is…', a: 'iron(II)', w: ['chromium(III)', 'copper(II)', 'iron(III)'], why: 'Chromium(III) also gives green, but it DISSOLVES in excess NaOH.' },
    { q: 'A white precipitate forms with NaOH and dissolves in excess. With aqueous ammonia, a white precipitate forms that ALSO dissolves in excess. The cation is…', a: 'zinc', w: ['aluminium', 'calcium', 'ammonium'], why: 'Aluminium\'s white precipitate does NOT dissolve in excess ammonia.' },
    { q: 'A white precipitate with NaOH that does NOT dissolve in excess; little or no precipitate with ammonia. The cation is…', a: 'calcium', w: ['zinc', 'aluminium', 'copper(II)'], why: 'Calcium hydroxide is only slightly soluble.' },
    { q: 'Warming a solution with NaOH gives ammonia. The cation is…', a: 'ammonium', w: ['sodium', 'calcium', 'zinc'], why: 'NH₄⁺ + OH⁻ → NH₃ + H₂O.' },
    { q: 'Flame test: lilac. The metal ion is…', a: 'potassium', w: ['sodium', 'lithium', 'copper(II)'], why: 'Li red, Na yellow, K lilac, Ca orange-red, Ba light green, Cu blue-green.' },
    { q: 'Flame test: yellow. The metal ion is…', a: 'sodium', w: ['potassium', 'calcium', 'barium'], why: 'A strong yellow-orange flame.' },
    { q: 'Flame test: blue-green. The metal ion is…', a: 'copper(II)', w: ['barium', 'lithium', 'sodium'], why: 'Barium gives light green.' }
  ]);
  bank('chSeparation', [
    { q: 'How do you get salt from salt water?', a: 'Crystallisation (evaporate some water, leave to crystallise)', w: ['Filtration', 'Chromatography', 'Fractional distillation'], why: 'Filtration can\'t separate a dissolved solid.' },
    { q: 'How do you get pure water from sea water?', a: 'Simple distillation', w: ['Filtration', 'Crystallisation', 'Chromatography'], why: 'Water boils off and condenses; the salt stays behind.' },
    { q: 'How do you separate sand from water?', a: 'Filtration', w: ['Distillation', 'Chromatography', 'Crystallisation'], why: 'The sand is the residue; the water is the filtrate.' },
    { q: 'How do you separate ethanol from water?', a: 'Fractional distillation', w: ['Filtration', 'Simple distillation with no column', 'Crystallisation'], why: 'Their boiling points are close, so a fractionating column is needed.' },
    { q: 'How do you separate the dyes in an ink?', a: 'Paper chromatography', w: ['Filtration', 'Distillation', 'Magnetism'], why: 'Different dyes travel different distances.' },
    { q: 'In chromatography, a pure substance gives…', a: 'a single spot', w: ['several spots', 'no spots', 'a spot on the baseline only'], why: 'Impure substances give more than one spot.' },
    { q: 'A locating agent is used in chromatography when…', a: 'the substances are colourless', w: ['the solvent is water', 'the spots are too dark', 'the paper is wet'], why: 'It makes colourless spots visible.' },
    { q: 'The best apparatus to measure exactly 25.0 cm³ of solution is…', a: 'a volumetric pipette', w: ['a beaker', 'a measuring cylinder', 'a conical flask'], why: 'Burettes give variable volumes accurately (titrations).' },
    { q: 'The end-point of a titration is when…', a: 'the indicator just changes colour permanently', w: ['the burette is empty', 'the flask is full', 'bubbles stop'], why: 'Add the last drops slowly, swirling.' },
    { q: 'A saturated solution is…', a: 'one holding the maximum amount of dissolved solute at that temperature', w: ['a very dilute solution', 'pure solvent', 'a solution with no solute'], why: 'Solute dissolves in a solvent to make a solution.' },
    { q: 'An impure solid melts…', a: 'at a lower temperature and over a range', w: ['at a sharp, higher temperature', 'at exactly the same temperature', 'only in water'], why: 'Pure substances have sharp melting points.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'chemistry', id: 'ch-env', name: 'Chemistry of the environment', icon: '🌍', color: '#15803d', book: BOOK,
    blurb: 'Syllabus section 10: water, fertilisers, air pollution, the greenhouse effect and photosynthesis.',
    lessons: [
      { id: 'ch-water', title: 'Water and fertilisers', obj: ['10.1', '10.2'], kw: 'water treatment tests for water fertilisers npk', learn: [],
        hook: 'From river to tap: what has to be taken out?',
        scenes: [
          { say: idea('Natural water carries <b>dissolved</b> things: some helpful (oxygen for fish, minerals), some harmful (toxic metals, plastics, sewage microbes, too many nitrates and phosphates). Treating it means removing the harmful parts <b>step by step</b>.') },
          { say: 'Clean the water, one stage at a time.', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ <b>Sedimentation</b>: heavy bits settle.</p>', '<p>2️⃣ <b>Filtration</b>: sand and gravel trap small solids.</p>', '<p>3️⃣ <b>Carbon</b>: removes tastes and smells.</p>', '<p>4️⃣ <b>Chlorination</b>: kills harmful microbes. 🚰</p>'] } },
          { say: 'Tests for water: anhydrous <b>copper(II) sulfate</b> white → blue; anhydrous <b>cobalt(II) chloride</b> blue → pink. Pure water boils at exactly 100 °C and melts at 0 °C.',
            ask: T('Fertiliser washing into a lake makes algae grow, then die and rot. The water…', ['loses oxygen, so fish die', 'gains oxygen', 'becomes pure'], 0, 'Nitrates and phosphates lead to deoxygenation.') },
          { say: 'Plants need <b>N</b>itrogen, <b>P</b>hosphorus and <b>K</b> (potassium): NPK fertilisers. Ammonium salts and nitrates supply nitrogen.' }
        ],
        keys: ['Water treatment: sedimentation, filtration, carbon, chlorination.', 'Water tests: CuSO₄ white→blue; CoCl₂ blue→pink; purity by m.p./b.p.', 'Beneficial vs harmful substances in water.', 'NPK fertilisers.'],
        gens: ['chWater'], easy: ['chWater'] },
      { id: 'ch-air', title: 'Air quality and climate', obj: ['10.3'], kw: 'air pollution greenhouse effect acid rain catalytic converter photosynthesis', learn: [],
        hook: 'What comes out of exhaust pipes and chimneys, and what it does.',
        scenes: [
          { say: idea('Burning fuels adds gases to the air. <b>CO₂</b> and <b>methane</b> trap heat (global warming → climate change). <b>SO₂</b> and <b>nitrogen oxides</b> make acid rain. Incomplete burning makes toxic <b>CO</b> and <b>particulates</b>. Each problem has its own fix.') },
          { say: 'Pick a pollutant.', anim: X([{ k: 'p', label: 'Pollutant', min: 0, max: 5, v: 0, fmt: i => ['CO₂', 'CO', 'particulates', 'methane', 'NOx', 'SO₂'][i] }], v => { const d = [['complete combustion of carbon fuels', 'global warming → climate change', 'renewables, hydrogen, planting trees'], ['incomplete combustion', 'toxic', 'enough oxygen when burning; catalytic converters'], ['incomplete combustion', 'breathing problems and cancer', 'cleaner burning'], ['rotting vegetation, animal digestion', 'global warming → climate change', 'less livestock farming'], ['car engines (N₂ + O₂ at high temperature)', 'acid rain, smog, breathing problems', 'catalytic converters'], ['burning fuels containing sulfur', 'acid rain', 'low-sulfur fuels, flue gas desulfurisation (CaO)']][v.p]; return `<p class="center bigq">${['CO₂', 'CO', 'particulates', 'CH₄', 'NOx', 'SO₂'][v.p]}</p><p>🏭 <b>Source:</b> ${d[0]}</p><p>⚠️ <b>Effect:</b> ${d[1]}</p><p>✅ <b>Fix:</b> ${d[2]}</p>`; }) },
          { say: 'The greenhouse effect: sunlight warms the Earth; the Earth gives off infrared; greenhouse gases <b>absorb</b> and re-emit it, <b>reducing heat loss to space</b>.', ask: T('Clean dry air is about…', ['78% N₂ and 21% O₂', '21% N₂ and 78% O₂', '50% each', '78% CO₂'], 0, 'The rest is noble gases and CO₂.') },
          { say: 'Photosynthesis removes CO₂:', pic: eq('6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'carbon dioxide + water → glucose + oxygen (light, chlorophyll)') + '<p class="center">Catalytic converter: 2CO + 2NO → 2CO₂ + N₂</p>' }
        ],
        keys: ['Air ≈ 78% N₂, 21% O₂.', 'Sources and effects of CO₂, CO, particulates, CH₄, NOx, SO₂.', 'Greenhouse gases absorb IR and reduce heat loss to space.', 'Fixes: renewables, trees, catalytic converters, low-sulfur fuel, flue gas desulfurisation.'],
        gens: ['chAir'], easy: ['chAir'] }
    ] });

  R2O.addModule({ subject: 'chemistry', id: 'ch-organic', name: 'Organic chemistry', icon: '🛢️', color: '#b45309', book: BOOK,
    blurb: 'Syllabus section 11: homologous series, naming, fuels, alkanes, alkenes, alcohols, carboxylic acids, esters and polymers.',
    lessons: [
      { id: 'ch-organic', title: 'Families of carbon compounds', obj: ['11.1', '11.2'], kw: 'homologous series functional group naming organic displayed formula isomers', learn: [],
        hook: 'Millions of compounds, but only a few patterns to learn.',
        scenes: [
          { say: idea('Carbon atoms link into <b>chains</b>. Compounds with the same "special group" of atoms (the <b>functional group</b>) form a family, a <b>homologous series</b>: they react alike and each member has one more CH₂. The name tells you both: the <b>start</b> gives the number of carbons, the <b>ending</b> gives the family.') },
          { say: 'Build a molecule.', anim: X([{ k: 'n', label: 'Carbons', min: 1, max: 6, v: 2 }, { k: 't', label: 'Family', min: 0, max: 3, v: 0, fmt: i => ['alkane', 'alkene', 'alcohol', 'carboxylic acid'][i] }], v => { const type = ['ane', 'ene', 'ol', 'oic'][v.t]; if (type === 'ene' && v.n < 2) return '<p class="center bigq">An alkene needs at least 2 carbons for a C=C.</p>'; const o = S.organic(v.n, type); return `${S.displayed(v.n, type)}<p class="center bigq">${o.name} · ${o.formula}</p><p class="center small muted">general formula ${o.general}</p>`; }) },
          { say: 'Name parts:', pic: '<p class="center">meth = 1 · eth = 2 · prop = 3 · but = 4 C</p><p class="center">-ane (C–C only) · -ene (C=C) · -ol (–OH) · -oic acid (–COOH)</p>',
            ask: T('Which is propan-1-ol?', ['C₃H₇OH', 'C₃H₈', 'C₃H₆', 'C₂H₅COOH'], 0, '3 carbons, –OH group on carbon 1.') },
          { say: '<b>Saturated</b>: only single C–C bonds (alkanes). <b>Unsaturated</b>: at least one C=C (alkenes). <b>Structural isomers</b>: same molecular formula, different structure (e.g. butane and methylpropane, both C₄H₁₀; but-1-ene and but-2-ene).' }
        ],
        keys: ['Homologous series: same functional group, same general formula, differ by CH₂, trend in physical properties.', 'Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alcohols CₙH₂ₙ₊₁OH, acids CₙH₂ₙ₊₁COOH.', 'Displayed formula shows every bond.', 'Isomers: same molecular formula, different structure.'],
        gens: ['chOrgFormula', 'chOrgName', 'chOrganic'], easy: ['chOrgName'] },
      { id: 'ch-fuels', title: 'Fuels, alkanes and alkenes', obj: ['11.3', '11.4', '11.5'], kw: 'petroleum fractional distillation alkanes alkenes cracking bromine water', learn: [],
        hook: 'One black liquid becomes petrol, jet fuel, plastics and roads.',
        scenes: [
          { say: idea('Petroleum is a <b>mixture</b> of hydrocarbons with chains of different lengths. Longer chains have <b>higher boiling points</b>. Heat it in a tall column and each length condenses at a different height: <b>fractional distillation</b>.') },
          { say: 'Move up the fractionating column.', anim: X([{ k: 'h', label: 'Height up the column', min: 0, max: 7, v: 6, fmt: i => ['bitumen', 'lubricating oil', 'fuel oil', 'diesel', 'kerosene', 'naphtha', 'gasoline (petrol)', 'refinery gas'][i] }], v => `<p class="center bigq">${['🛣️ making roads', '🔧 lubricants, waxes, polishes', '🚢 ships, home heating', '🚚 diesel engines', '✈️ jet fuel', '🧪 chemical feedstock', '🚗 car fuel', '🔥 heating and cooking gas'][v.h]}</p><div class="xbar"><div style="width:${(v.h + 1) * 12.5}%"></div></div><p class="center small muted">Higher up: shorter chains, lower boiling points, more volatile, less viscous.</p>`) },
          { say: '<b>Alkanes</b> (C–C single bonds) are fairly unreactive: they burn, and react with chlorine in UV light by <b>substitution</b> (an H is swapped for Cl). <b>Cracking</b> breaks long alkanes into shorter, more useful alkanes and <b>alkenes</b> (high temperature + catalyst).',
            ask: T('Why do refineries crack long alkanes?', ['There is more demand for short molecules like petrol and for alkenes', 'Long alkanes are explosive', 'To make bitumen'], 0, 'Supply and demand.') },
          { say: '<b>Alkenes</b> have a C=C, so they do <b>addition</b> reactions (one product): with bromine (orange → colourless: the test for unsaturation), with hydrogen (Ni catalyst → alkane), with steam (acid catalyst → alcohol).', pic: `<p class="center">${S.displayed(2, 'ene').replace('<svg', '<svg style="max-width:150px"')}</p><p class="center">ethene + Br₂ → 1,2-dibromoethane</p>` }
        ],
        keys: ['Fractional distillation by boiling point; fractions and their uses.', 'Alkanes: saturated, combustion and substitution (Cl₂ + UV).', 'Cracking → smaller alkanes + alkenes + hydrogen.', 'Alkenes: addition with Br₂ (test), H₂ (Ni), steam (acid catalyst).'],
        gens: ['chOrganic', 'chOrgFormula'], easy: ['chOrganic'] },
      { id: 'ch-alcohols', title: 'Alcohols, acids and esters', obj: ['11.6', '11.7'], kw: 'ethanol fermentation carboxylic acids esters', learn: [],
        hook: 'Bread, vinegar and the smell of fruit.',
        scenes: [
          { say: idea('An <b>alcohol</b> has an –OH group. Oxidise it and it becomes a <b>carboxylic acid</b> (–COOH), a weak acid (vinegar). Mix an alcohol with an acid and they join, losing water, to make an <b>ester</b>: often fruity-smelling.') },
          { say: 'Two ways to make ethanol:', pic: '<table class="tbl"><tr><th></th><th>Fermentation</th><th>Ethene + steam</th></tr><tr><td>Raw material</td><td>sugar (renewable)</td><td>crude oil (non-renewable)</td></tr><tr><td>Conditions</td><td>yeast, 25–35 °C, no oxygen</td><td>300 °C, 60 atm, acid catalyst</td></tr><tr><td>Speed</td><td>slow, batch</td><td>fast, continuous</td></tr><tr><td>Product</td><td>impure, needs distilling</td><td>pure</td></tr></table>',
            ask: T('Ethanol is used as…', ['a fuel and a solvent', 'a polymer', 'a catalyst'], 0, 'It burns to CO₂ and H₂O.') },
          { say: 'Name an ester: the alcohol part first (ending <b>-yl</b>), then the acid part (ending <b>-oate</b>).', anim: X([{ k: 'a', label: 'Alcohol', min: 1, max: 4, v: 2, fmt: i => ['', 'methanol', 'ethanol', 'propanol', 'butanol'][i] }, { k: 'c', label: 'Acid', min: 1, max: 4, v: 2, fmt: i => ['', 'methanoic', 'ethanoic', 'propanoic', 'butanoic'][i] }], v => `<p class="center bigq">${['', 'meth', 'eth', 'prop', 'but'][v.a]}yl ${['', 'meth', 'eth', 'prop', 'but'][v.c]}anoate</p><p class="center small muted">alcohol + carboxylic acid ⇌ ester + water (acid catalyst)</p>`) },
          { say: 'Carboxylic acids react like other acids: with metals (salt + hydrogen), bases (salt + water) and carbonates (salt + water + CO₂). Ethanoic acid gives <b>ethanoate</b> salts, e.g. sodium ethanoate.' }
        ],
        keys: ['Ethanol: fermentation vs hydration of ethene (compare).', 'Ethanol → ethanoic acid (acidified KMnO₄ or bacteria).', 'Carboxylic acids: metals, bases, carbonates → -oate salts.', 'Alcohol + acid → ester + water; name = alkyl alkanoate.'],
        gens: ['chEster', 'chOrganic'], easy: ['chEster'] },
      { id: 'ch-polymers', title: 'Polymers and plastics', obj: ['11.8'], kw: 'polymers addition condensation nylon pet proteins plastics', learn: [],
        hook: 'Thousands of small molecules holding hands make a plastic bag.',
        scenes: [
          { say: idea('A <b>polymer</b> is a huge chain built from thousands of small <b>monomers</b>. <b>Addition</b> polymers form when the C=C in alkenes opens up and links (one product only). <b>Condensation</b> polymers form when two different monomers join and give off a small molecule like water each time.') },
          { say: 'Join some ethene monomers.', anim: X([{ k: 'n', label: 'Monomers joined', min: 1, max: 8, v: 3 }], v => `<p class="center bigq">${'[–CH₂–CH₂–]'.repeat(v.n)}</p><p class="center">${v.n} ethene → part of a <b>poly(ethene)</b> chain</p><p class="center small muted">Real chains have thousands of units. The repeat unit is –CH₂–CH₂–.</p>`) },
          { say: 'Condensation polymers:', pic: '<ul><li><b>Nylon</b> (a polyamide): dicarboxylic acid + diamine, amide links –CONH–</li><li><b>PET</b> (a polyester): dicarboxylic acid + diol, ester links –COO–. It can be broken back into monomers and re-made.</li><li><b>Proteins</b>: natural polyamides made from amino acids</li></ul>',
            ask: T('What extra product forms in condensation polymerisation?', ['A small molecule such as water', 'Nothing', 'An alkene'], 0, 'Addition polymerisation forms only the polymer.') },
          { say: 'Plastics are useful because they don\'t rot, which is also the problem: they fill <b>landfill</b>, build up in <b>oceans</b>, and burning them can release <b>toxic gases</b>.' }
        ],
        keys: ['Polymer = many monomers. Plastics are polymers.', 'Addition: from alkenes, one product. Condensation: two monomers, water given off.', 'Nylon = polyamide; PET = polyester; proteins = natural polyamides.', 'Disposal problems: landfill, oceans, toxic gases.'],
        gens: ['chPolymers'], easy: ['chPolymers'] }
    ] });

  R2O.addModule({ subject: 'chemistry', id: 'ch-lab', name: 'Lab techniques and analysis', icon: '🔬', color: '#4338ca', book: BOOK,
    blurb: 'Syllabus section 12: apparatus, titrations, chromatography, separation and tests for ions and gases.',
    lessons: [
      { id: 'ch-separate', title: 'Separating and purifying', obj: ['12.1', '12.2', '12.3', '12.4'], kw: 'separation filtration distillation crystallisation chromatography titration apparatus', learn: [],
        hook: 'How to pull a mixture apart, piece by piece.',
        scenes: [
          { say: idea('To separate a mixture, use a <b>difference</b> between its parts: particle size (<b>filtration</b>), boiling point (<b>distillation</b>), solubility (<b>crystallisation</b>, a suitable solvent), or how far each travels on paper (<b>chromatography</b>).') },
          { say: 'Choose a mixture.', anim: X([{ k: 'm', label: 'Mixture', min: 0, max: 4, v: 0, fmt: i => ['sand + water', 'salt water → salt', 'salt water → water', 'ethanol + water', 'inks in a pen'][i] }], v => `<p class="center bigq">${['🧻 filtration', '♨️ crystallisation', '🧪 simple distillation', '🌡️ fractional distillation', '📜 paper chromatography'][v.m]}</p><p class="center">${['The solid (residue) stays on the filter paper; the liquid (filtrate) passes through.', 'Evaporate some water, then let crystals form as it cools.', 'Boil off the water and condense it; the salt stays behind.', 'Their boiling points are close, so a fractionating column separates them.', 'Each dye moves a different distance up the paper with the solvent.'][v.m]}</p>`) },
          { say: 'Chromatography: compare spots with known substances. A <b>pure</b> substance gives one spot. Colourless spots need a <b>locating agent</b>.', anim: X([{ k: 'd', label: 'Distance moved by spot (cm)', min: 1, max: 8, v: 4 }], v => `${S.svg(250, 200, `<rect x="40" y="10" width="80" height="180" fill="color-mix(in srgb, var(--c2) 8%, transparent)" stroke="var(--line)"/><line x1="40" y1="170" x2="120" y2="170" stroke="var(--muted)" stroke-dasharray="4 3"/><line x1="40" y1="30" x2="120" y2="30" stroke="var(--c5)" stroke-width="2"/><circle cx="80" cy="${170 - v.d * 17.5}" r="7" fill="var(--c4)"/>${S.txt(130, 34, 'solvent front', 'tick', 'start')}${S.txt(130, 174, 'baseline', 'tick', 'start')}`, 250)}<p class="center bigq">Rf = ${v.d} ÷ 8 = ${n(r(v.d / 8, 3))}</p>`) },
          { say: 'Apparatus: stopwatch (time), thermometer, balance (mass), burette, volumetric pipette, measuring cylinder, gas syringe (volume). In a <b>titration</b>: pipette the alkali into a flask, add indicator, run in acid from the burette until the colour just changes (the <b>end-point</b>).',
            ask: T('An impure solid…', ['melts over a range, below the pure melting point', 'melts at a sharp, higher temperature', 'doesn\'t melt'], 0, 'Pure substances have sharp melting and boiling points.') }
        ],
        keys: ['Filtration (insoluble solid), crystallisation (dissolved solid), distillation (liquid from solution), fractional distillation (close b.p. liquids), chromatography (dyes).', 'Rf = distance of substance ÷ distance of solvent.', 'Titration with burette, pipette and indicator; end-point.', 'Purity: sharp m.p./b.p.; one spot on a chromatogram.'],
        gens: ['chRf', 'chSeparation'], easy: ['chSeparation'] },
      { id: 'ch-tests', title: 'Tests for ions and gases', obj: ['12.5'], kw: 'tests for ions cations anions gases flame tests', learn: [],
        hook: 'Be a chemical detective: colours and fizzes reveal what\'s inside.',
        scenes: [
          { say: idea('Every ion and gas has a <b>fingerprint</b>: a colour, a precipitate or a fizz that only it gives. Do the test, match the result, name the substance.') },
          { say: 'Add aqueous sodium hydroxide to a mystery solution.', anim: X([{ k: 'c', label: 'Cation', min: 0, max: 7, v: 4, fmt: i => ['Al³⁺', 'NH₄⁺', 'Ca²⁺', 'Cr³⁺', 'Cu²⁺', 'Fe²⁺', 'Fe³⁺', 'Zn²⁺'][i] }], v => { const d = [['white ppt, dissolves in excess', 'white ppt, insoluble in excess'], ['ammonia gas given off on warming', '–'], ['white ppt, insoluble in excess', 'no ppt (or very slight white)'], ['green ppt, dissolves in excess', 'green ppt, insoluble in excess'], ['light blue ppt, insoluble in excess', 'light blue ppt, dissolves in excess → dark blue solution'], ['green ppt, insoluble in excess', 'green ppt, insoluble in excess'], ['red-brown ppt, insoluble in excess', 'red-brown ppt, insoluble in excess'], ['white ppt, dissolves in excess', 'white ppt, dissolves in excess']][v.c]; const col = ['#f1f5f9', '#ffffff', '#f8fafc', '#16a34a', '#60a5fa', '#4d7c0f', '#9a3412', '#f1f5f9'][v.c]; return `${S.svg(100, 140, `<rect x="35" y="10" width="30" height="110" rx="12" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="36" y="70" width="28" height="48" rx="10" fill="${col}" opacity=".9"/>`, 100)}<p><b>NaOH(aq):</b> ${d[0]}</p><p><b>NH₃(aq):</b> ${d[1]}</p>`; }) },
          { say: 'Anions:', pic: '<ul><li><b>Carbonate</b>: add acid → fizzing, CO₂ turns limewater milky</li><li><b>Chloride / bromide / iodide</b>: dilute nitric acid, then silver nitrate → <b>white / cream / yellow</b> precipitate</li><li><b>Sulfate</b>: dilute nitric acid, then barium nitrate → white precipitate</li><li><b>Nitrate</b>: NaOH + aluminium foil, warm → ammonia</li><li><b>Sulfite</b>: acidified KMnO₄ → purple to colourless</li></ul>' },
          { say: 'Gases: O₂ relights a glowing splint · H₂ pops with a lighted splint · CO₂ turns limewater milky · Cl₂ bleaches damp litmus · NH₃ turns damp red litmus blue · SO₂ turns acidified KMnO₄ colourless.', ask: T('Flame test colours: which is potassium?', ['lilac', 'yellow', 'red', 'blue-green'], 0, 'Li red, Na yellow, K lilac, Ca orange-red, Ba light green, Cu blue-green.') }
        ],
        keys: ['Cation tests with NaOH(aq) and NH₃(aq): colours and "in excess".', 'Anion tests: carbonate, halides (Ag⁺), sulfate (Ba²⁺), nitrate (Al + NaOH), sulfite (KMnO₄).', 'Gas tests: O₂, H₂, CO₂, Cl₂, NH₃, SO₂.', 'Flame tests: Li, Na, K, Ca, Ba, Cu.'],
        gens: ['chTests'], easy: ['chTests'] }
    ] });
})();
