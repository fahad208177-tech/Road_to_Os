// Biology 5090, part 3: reproduction (16), inheritance (17), biotechnology (18) and ecology (19).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Biology 2e', 'https://openstax.org/details/books/biology-2e'];

  // ================= generators =================
  bank('bDivision', [
    { q: 'Mitosis produces…', a: 'genetically identical cells with the same chromosome number', w: ['genetically different cells with half the chromosomes', 'gametes', 'four different cells'], why: 'Used for growth, repair, replacing cells and asexual reproduction.' },
    { q: 'Meiosis produces…', a: 'gametes with half the chromosome number (haploid), genetically different', w: ['identical body cells', 'diploid cells', 'cells for repair'], why: 'A reduction division.' },
    { q: 'A human diploid cell has…', a: '46 chromosomes (23 pairs)', w: ['23 chromosomes', '92 chromosomes', '46 pairs'], why: 'Gametes are haploid: 23.' },
    { q: 'A haploid nucleus contains…', a: 'a single set of chromosomes', w: ['two sets', 'no chromosomes', 'four sets'], why: 'Diploid = two sets.' },
    { q: 'Stem cells are…', a: 'unspecialised cells that divide by mitosis and can become specialised', w: ['gametes', 'dead cells', 'cancer cells'], why: 'E.g. in bone marrow and embryos.' },
    { q: 'Cancer is the result of…', a: 'uncontrolled cell division', w: ['too much meiosis', 'too little sunlight', 'osmosis'], why: 'Cells divide when they should not.' },
    { q: 'Genes are…', a: 'sections of DNA on chromosomes that carry genetic information', w: ['types of protein', 'whole chromosomes', 'cells'], why: 'Chromosomes contain DNA.' }
  ]);
  bank('bRepro', [
    { q: 'Asexual reproduction produces offspring that are…', a: 'genetically identical to the single parent', w: ['genetically different', 'from two parents', 'always sterile'], why: 'Advantage: fast, no mate needed. Disadvantage: no variation to cope with change.' },
    { q: 'An advantage of sexual reproduction is…', a: 'variation, so a population can adapt to changes', w: ['it is faster', 'no mate is needed', 'offspring are identical'], why: 'Disadvantage: slower and needs a mate.' },
    { q: 'Fertilisation is…', a: 'the fusion of two haploid gamete nuclei to form a diploid zygote', w: ['cell division', 'pollen landing on a stigma', 'the release of an egg'], why: '23 + 23 = 46 in humans.' },
    { q: 'Which is an example of asexual reproduction?', a: 'Potato tubers growing into new plants', w: ['Pollination of a flower', 'Human fertilisation', 'Seed production by cross-pollination'], why: 'Also bacteria dividing, runners in strawberries.' }
  ]);
  bank('bFlowers', [
    { q: 'The anther…', a: 'makes pollen', w: ['receives pollen', 'contains ovules', 'attracts insects with colour'], why: 'The anther and filament make up the stamen (male).' },
    { q: 'The stigma…', a: 'receives pollen', w: ['makes pollen', 'becomes the fruit', 'protects the bud'], why: 'Stigma, style and ovary make up the carpel (female).' },
    { q: 'Wind-pollinated flowers have…', a: 'small dull petals, anthers and stigmas hanging outside, and light smooth pollen', w: ['bright petals and scent', 'sticky spiky pollen', 'nectar'], why: 'Insect-pollinated flowers are bright, scented, with nectar and sticky pollen.' },
    { q: 'Pollination is…', a: 'the transfer of pollen from an anther to a stigma', w: ['fertilisation of the ovule', 'seed dispersal', 'germination'], why: 'Self-pollination: same plant. Cross-pollination: different plant.' },
    { q: 'A disadvantage of self-pollination for a population is…', a: 'less variation, so it copes less well with environmental change', w: ['it needs insects', 'it gives more variation', 'it cannot make seeds'], why: 'But it doesn\'t rely on pollinators.' },
    { q: 'After fertilisation, the ovary becomes…', a: 'the fruit', w: ['the seed', 'the petal', 'the pollen tube'], why: 'The ovules become seeds.' },
    { q: 'Seeds need which conditions to germinate?', a: 'Water, oxygen and a suitable temperature', w: ['Light and soil', 'Carbon dioxide only', 'Fertiliser and darkness'], why: 'Enzymes break down stored food to release energy for growth.' },
    { q: 'Why are seeds dispersed?', a: 'To colonise new areas and reduce competition with the parent', w: ['To make more pollen', 'To photosynthesise', 'To stop germination'], why: 'By wind (wings, parachutes) or animals (hooks, juicy fruits).' },
    { q: 'The radicle of an embryo grows into…', a: 'the root', w: ['the shoot', 'the leaf', 'the flower'], why: 'The plumule becomes the shoot; cotyledons store food; the testa protects.' }
  ]);
  bank('bHumanRepro', [
    { q: 'Sperm are made in the…', a: 'testes', w: ['prostate gland', 'sperm ducts', 'urethra'], why: 'The prostate adds fluid; sperm ducts carry sperm to the urethra.' },
    { q: 'Fertilisation usually happens in the…', a: 'oviduct', w: ['uterus', 'ovary', 'vagina'], why: 'The embryo then implants in the uterus lining.' },
    { q: 'Sperm cells have many mitochondria to…', a: 'release energy for swimming (with the flagellum)', w: ['store food for the embryo', 'make hormones', 'digest the egg'], why: 'The acrosome contains enzymes to get into the egg.' },
    { q: 'Compared with sperm, egg cells are…', a: 'larger, fewer, and do not move by themselves', w: ['smaller and more numerous', 'able to swim', 'made in the testes'], why: 'Eggs have energy stores and a jelly coat that changes at fertilisation.' },
    { q: 'The placenta…', a: 'exchanges nutrients, oxygen and wastes between mother\'s and fetus\'s blood', w: ['mixes the two bloods', 'produces sperm', 'is the baby\'s lung'], why: 'Some viruses can cross it.' },
    { q: 'The amniotic fluid…', a: 'protects the fetus from bumps', w: ['feeds the fetus', 'carries oxygen', 'removes urea'], why: 'It is held in the amniotic sac.' },
    { q: 'Oestrogen…', a: 'causes female secondary sexual characteristics and builds up the uterus lining', w: ['makes sperm', 'releases the egg directly', 'causes menstruation'], why: 'Testosterone causes male secondary sexual characteristics.' },
    { q: 'Which hormone triggers ovulation?', a: 'LH', w: ['FSH', 'Progesterone', 'Insulin'], why: 'FSH makes an egg mature; a surge of LH releases it.' },
    { q: 'Progesterone…', a: 'maintains the uterus lining', w: ['makes eggs mature', 'triggers menstruation by rising', 'is made by the pituitary'], why: 'When it falls, the lining breaks down (menstruation).' }
  ]);
  const GENO = ['AA', 'Aa', 'aa'];
  const TRAITS = [['pea plants', 'tall', 'short', 'T'], ['guinea pigs', 'black fur', 'white fur', 'B'], ['flowers', 'purple', 'white', 'P'], ['peas', 'round seeds', 'wrinkled seeds', 'R']];
  G.bCross = () => { const [org, dom, rec, L] = pick(TRAITS); let p1, p2; do { p1 = pick(GENO); p2 = pick(GENO); } while (p1 === 'AA' && p2 === 'AA');
    const sub = g => g.replace(/A/g, L).replace(/a/g, L.toLowerCase()); const kids = [];
    [p1[0], p1[1]].forEach(a => [p2[0], p2[1]].forEach(b => kids.push(a + b)));
    const recN = kids.filter(k => k === 'aa').length, ask = pick(['rec', 'dom']); const pct = (ask === 'rec' ? recN : 4 - recN) * 25;
    return num(`<p>In ${org}, ${dom} (${L}) is dominant to ${rec} (${L.toLowerCase()}). Two ${org} with genotypes <b>${sub(p1)}</b> and <b>${sub(p2)}</b> are crossed. What percentage of the offspring are expected to be <b>${ask === 'rec' ? rec : dom}</b>?</p>`, pct, '%',
      [`gametes: ${sub(p1[0])}, ${sub(p1[1])} and ${sub(p2[0])}, ${sub(p2[1])}`, `offspring: ${kids.map(k => sub(k.split('').sort().join(''))).join(', ')}`, `${ask === 'rec' ? rec : dom}: ${(ask === 'rec' ? recN : 4 - recN)} out of 4 = <b>${pct}%</b>`], 'Draw a Punnett square. Only two recessive alleles show the recessive phenotype.'); };
  G.bABO = () => { const pairs = [['IAIo', 'IBIo'], ['IAIA', 'IBIB'], ['IAIo', 'IoIo'], ['IBIo', 'IoIo'], ['IAIB', 'IoIo'], ['IAIB', 'IAIB'], ['IAIo', 'IAIo']]; const [p1, p2] = pick(pairs);
    const al = g => [g.slice(0, 2), g.slice(2)], kids = []; al(p1).forEach(a => al(p2).forEach(b => kids.push([a, b])));
    const grp = ([a, b]) => { const s = new Set([a, b]); if (s.has('IA') && s.has('IB')) return 'AB'; if (s.has('IA')) return 'A'; if (s.has('IB')) return 'B'; return 'O'; };
    const groups = kids.map(grp); const target = pick([...new Set(groups)].concat(['O', 'AB'])); const pct = groups.filter(g => g === target).length * 25;
    const show = g => g.replace(/I([ABo])/g, 'I<sup>$1</sup>');
    return num(`<p>Blood group alleles: I<sup>A</sup> and I<sup>B</sup> are codominant; I<sup>o</sup> is recessive. A parent with genotype <b>${show(p1)}</b> and a parent with <b>${show(p2)}</b> have a child. What is the percentage chance it has blood group <b>${target}</b>?</p>`, pct, '%',
      [`children: ${kids.map(k => show(k.join(''))).join(', ')}`, `blood groups: ${groups.join(', ')}`, `group ${target}: <b>${pct}%</b>`], 'I^A I^B gives group AB (codominant). I^o I^o gives group O.'); };
  G.bDNA = () => { const A = pick([10, 15, 20, 22, 25, 30, 35, 40]), q = pick(['T', 'G', 'C']); const v = q === 'T' ? A : (100 - 2 * A) / 2;
    return num(`<p>In a DNA molecule, ${A}% of the bases are A. What percentage are ${q}?</p>`, v, '%', [`A pairs with T, so T = ${A}%`, `A + T = ${2 * A}%, leaving ${100 - 2 * A}% for C + G`, `C pairs with G, so C = G = ${n((100 - 2 * A) / 2)}%`, `${q} = <b>${n(v)}%</b>`], 'A always pairs with T, and C with G.'); };
  bank('bGenetics', [
    { q: 'An allele is…', a: 'an alternative form of a gene', w: ['a whole chromosome', 'a type of cell', 'a protein'], why: 'E.g. the gene for height has a tall allele and a short allele.' },
    { q: 'A heterozygous genotype is…', a: 'two different alleles, e.g. Tt', w: ['two identical alleles', 'only recessive alleles', 'the phenotype'], why: 'TT and tt are homozygous.' },
    { q: 'The phenotype is…', a: 'the observable feature, e.g. tall', w: ['the alleles, e.g. Tt', 'the DNA sequence', 'the number of chromosomes'], why: 'Genotype = the alleles.' },
    { q: 'A recessive allele only shows in the phenotype when…', a: 'two copies are present (homozygous recessive)', w: ['one copy is present', 'it is with a dominant allele', 'never'], why: 'A dominant allele masks it.' },
    { q: 'Crossing two heterozygous parents (Tt × Tt) gives a phenotype ratio of…', a: '3 dominant : 1 recessive', w: ['1 : 1', 'all dominant', '1 : 2 : 1 phenotypes'], why: 'TT, Tt, Tt, tt.' },
    { q: 'Observed ratios often differ from expected ratios because…', a: 'fertilisation is random, especially with small numbers of offspring', w: ['the Punnett square is wrong', 'alleles change', 'dominant alleles disappear'], why: 'Bigger samples get closer to the expected ratio.' },
    { q: 'A person with genotype I<sup>A</sup>I<sup>B</sup> has blood group…', a: 'AB', w: ['A', 'B', 'O'], why: 'Codominance: both alleles show.' },
    { q: 'What determines a baby\'s sex?', a: 'Whether the sperm carries an X or a Y chromosome', w: ['The egg', 'The mother\'s diet', 'The temperature'], why: 'XX female, XY male; a 50% chance each time.' },
    { q: 'Sickle cell anaemia is an example of…', a: 'a gene mutation (a change in the base sequence)', w: ['a chromosome mutation', 'continuous variation', 'an infectious disease'], why: 'Down\'s syndrome is a chromosome mutation (47 chromosomes).' },
    { q: 'Which increases the rate of mutation?', a: 'Ionising radiation and some chemicals', w: ['Exercise', 'Eating fruit', 'Sleeping'], why: 'They damage DNA.' },
    { q: 'Pure-breeding means…', a: 'two identical homozygous individuals always produce offspring like themselves', w: ['heterozygous parents', 'any two parents', 'mutated parents'], why: 'E.g. TT × TT always gives tall.' },
    { q: 'DNA controls a cell by…', a: 'coding for proteins, including enzymes', w: ['making glucose', 'storing energy', 'carrying oxygen'], why: 'Base sequence → amino acid sequence → protein shape.' },
    { q: 'In DNA, A always pairs with…', a: 'T', w: ['C', 'G', 'A'], why: 'And C pairs with G.' }
  ]);
  bank('bVariation', [
    { q: 'Height is an example of…', a: 'continuous variation', w: ['discontinuous variation', 'a mutation', 'codominance'], why: 'A range of values between two extremes; caused by genes and environment.' },
    { q: 'ABO blood group is an example of…', a: 'discontinuous variation', w: ['continuous variation', 'environmental variation', 'natural selection'], why: 'A few distinct groups, no in-betweens; usually genes only.' },
    { q: 'Which are sources of genetic variation?', a: 'Mutation, meiosis, random mating and random fertilisation', w: ['Mitosis only', 'Exercise', 'Asexual reproduction'], why: 'Mitosis makes identical cells.' }
  ]);
  bank('bSelection', [
    { q: 'In natural selection, which individuals are most likely to survive and reproduce?', a: 'Those best adapted to the environment', w: ['The biggest', 'The oldest', 'All equally'], why: 'They pass on their alleles.' },
    { q: 'Natural selection relies on…', a: 'variation, overproduction of offspring, competition and survival of the better adapted', w: ['individuals changing during their life', 'humans choosing features', 'all offspring surviving'], why: 'Over many generations the population evolves.' },
    { q: 'Antibiotic-resistant bacteria become common because…', a: 'resistant bacteria survive the antibiotic and reproduce', w: ['antibiotics cause the resistance', 'bacteria learn resistance', 'viruses help them'], why: 'An example of natural selection.' },
    { q: 'Selective breeding (artificial selection) means…', a: 'humans choose parents with desired features and breed them over many generations', w: ['nature chooses which survive', 'inserting genes', 'cloning'], why: 'E.g. high-yield crops, cows that give more milk.' }
  ]);
  bank('bBiotech', [
    { q: 'Yeast is used in bread making because…', a: 'its anaerobic respiration releases CO₂, making the dough rise', w: ['it adds vitamins only', 'it makes the bread sweeter', 'it kills bacteria'], why: 'In brewing, the ethanol is the useful product.' },
    { q: 'Bacteria are useful in biotechnology because…', a: 'they reproduce quickly and contain plasmids', w: ['they are large', 'they photosynthesise', 'they have a nucleus'], why: 'Few ethical concerns and they can make complex molecules.' },
    { q: 'In a fermenter, which must be controlled?', a: 'Temperature, pH, oxygen, nutrients and waste products', w: ['Only light', 'Only the colour', 'Nothing'], why: 'For the microorganisms to grow well.' },
    { q: 'Biological washing powders contain…', a: 'enzymes that digest stains at low temperatures', w: ['antibiotics', 'yeast', 'hormones'], why: 'E.g. proteases and lipases.' },
    { q: 'Pectinase is used to…', a: 'get more juice out of fruit', w: ['make lactose-free milk', 'make bread rise', 'kill bacteria'], why: 'It breaks down cell walls.' },
    { q: 'Lactase is used to make…', a: 'lactose-free milk', w: ['fruit juice', 'bread', 'insulin'], why: 'It breaks lactose into glucose and galactose.' },
    { q: 'Genetic modification means…', a: 'changing an organism\'s genetic material by removing, changing or inserting genes', w: ['selective breeding', 'cloning', 'natural selection'], why: 'E.g. the human insulin gene inserted into bacteria.' },
    { q: 'Which is a use of GM crops in the syllabus?', a: 'Resistance to herbicides or insect pests, or extra vitamins', w: ['Making crops blue', 'Making crops grow without water', 'Removing all DNA'], why: 'Risks include genes spreading to wild plants and effects on food chains.' }
  ]);
  G.bFood = () => { const q = pick(['eff', 'next']), E1 = pick([10000, 20000, 50000, 100000, 3000]), pc = pick([5, 10, 10, 15, 20]); const E2 = E1 * pc / 100;
    if (q === 'eff') return num(`<p>Grass captures ${n(E1)} kJ. The rabbits that eat it store ${n(E2)} kJ. What percentage of the energy was transferred?</p>`, pc, '%', [`efficiency = ${n(E2)} ÷ ${n(E1)} × 100 = <b>${pc}%</b>`, 'The rest is lost in respiration, movement, heat, waste and parts not eaten.'], 'energy in the next level ÷ energy in this level × 100');
    return num(`<p>Producers in a food chain contain ${n(E1)} kJ. About 10% is passed on at each step. How much energy reaches the <b>secondary</b> consumers?</p>`, E1 * .01, 'kJ', [`producer → primary consumer: × 0.1 = ${n(E1 * .1)} kJ`, `primary → secondary consumer: × 0.1 = <b>${n(E1 * .01)} kJ</b>`], 'Multiply by 10% for each step.'); };
  bank('bEcology', [
    { q: 'The main source of energy for most food chains is…', a: 'the Sun', w: ['the soil', 'water', 'decomposers'], why: 'Producers capture it by photosynthesis.' },
    { q: 'A producer is…', a: 'an organism that makes its own food, e.g. a green plant', w: ['an animal that eats plants', 'a fungus', 'a top predator'], why: 'Consumers eat other organisms.' },
    { q: 'A herbivore is…', a: 'a primary consumer that eats plants', w: ['a meat-eater', 'a decomposer', 'a producer'], why: 'Carnivores eat other animals.' },
    { q: 'Energy transfer between trophic levels is inefficient because…', a: 'energy is lost in respiration, movement, heat, faeces and parts not eaten', w: ['animals store all the energy', 'plants absorb all the light', 'energy is created at each level'], why: 'So food chains rarely have more than 4–5 levels.' },
    { q: 'Why is it more efficient for humans to eat crops than livestock fed on crops?', a: 'There is one fewer trophic level, so less energy is lost', w: ['Crops have more protein', 'Animals are bigger', 'Livestock make energy'], why: 'More people can be fed from the same land.' },
    { q: 'A pyramid of numbers can be upside down because…', a: 'one large producer (like a tree) can feed many consumers', w: ['energy increases up the chain', 'it is drawn wrongly', 'there are no producers'], why: 'Pyramids of energy are always the right way up.' },
    { q: 'Decomposers are…', a: 'bacteria and fungi that break down dead organisms and waste', w: ['plants', 'herbivores', 'top carnivores'], why: 'They recycle nutrients.' },
    { q: 'In the carbon cycle, carbon is removed from the air by…', a: 'photosynthesis', w: ['respiration', 'combustion', 'decomposition'], why: 'The others release CO₂.' },
    { q: 'Nitrogen-fixing bacteria…', a: 'turn nitrogen gas into compounds plants can use', w: ['turn nitrates into nitrogen gas', 'cause decay only', 'make glucose'], why: 'Lightning also fixes nitrogen. Denitrifying bacteria return nitrogen to the air.' },
    { q: 'Nitrification is…', a: 'bacteria converting ammonium ions into nitrates', w: ['nitrogen gas → ammonia by lightning', 'nitrates → nitrogen gas', 'plants absorbing nitrogen gas'], why: 'Plants absorb the nitrates to make amino acids and proteins.' },
    { q: 'A population is…', a: 'all the organisms of one species in an area at the same time', w: ['all the species in an area', 'the living and non-living parts', 'the number of species'], why: 'A community = all the populations; ecosystem = community + environment.' },
    { q: 'Biodiversity is…', a: 'the number of different species in an area', w: ['the number of individuals', 'the size of the area', 'the amount of rainfall'], why: 'High biodiversity = many species.' },
    { q: 'Which limits the growth of a population?', a: 'Food supply, competition, predation and disease', w: ['Only sunlight', 'Only temperature', 'Nothing'], why: 'The growing human population increases demand for resources.' }
  ]);
  bank('bHumans', [
    { q: 'Deforestation can lead to…', a: 'loss of biodiversity, soil erosion, flooding and more CO₂ in the air', w: ['more biodiversity', 'cleaner air', 'more rainfall in the soil'], why: 'Fewer trees to absorb CO₂ and hold soil.' },
    { q: 'Eutrophication starts when…', a: 'fertilisers or sewage add extra nitrate ions to water, so producers grow fast', w: ['fish eat too much', 'the water gets too cold', 'plants stop growing'], why: 'Then producers die, decomposers respire aerobically and oxygen runs out.' },
    { q: 'In eutrophication, fish die because…', a: 'decomposers use up the dissolved oxygen', w: ['the water gets too warm', 'algae poison them directly', 'there is too much oxygen'], why: 'Increased aerobic respiration by decomposers.' },
    { q: 'Introducing a non-native species can…', a: 'out-compete or prey on native species', w: ['always increase biodiversity', 'have no effect', 'only help'], why: 'It may have no natural predators.' },
    { q: 'A sustainable resource is one that…', a: 'is produced as fast as it is removed, so it does not run out', w: ['will run out soon', 'is never used', 'is always free'], why: 'E.g. well-managed forests and fish stocks.' },
    { q: 'Fish stocks can be conserved by…', a: 'quotas, closed seasons, protected areas and controlled net mesh sizes', w: ['catching more young fish', 'using smaller mesh nets', 'fishing all year'], why: 'Also education and monitoring.' },
    { q: 'Forests can be conserved by…', a: 'education, protected areas, quotas and replanting', w: ['cutting down more trees', 'introducing pests', 'burning undergrowth'], why: 'Replanting makes logging sustainable.' },
    { q: 'Why conserve species?', a: 'To maintain biodiversity, reduce extinction and protect vulnerable environments', w: ['Only for money', 'To reduce biodiversity', 'There is no reason'], why: 'All three reasons are in the syllabus.' },
    { q: 'Non-biodegradable plastics harm…', a: 'both aquatic and land ecosystems', w: ['only the sea', 'only the land', 'nothing'], why: 'Animals swallow or get tangled in them.' },
    { q: 'Over-use of insecticides can harm…', a: 'non-target species, including useful pollinators', w: ['only pests', 'nothing', 'only plants'], why: 'They can also build up along food chains.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'biology', id: 'bi-repro', name: 'Cell division and reproduction', icon: '🌸', color: '#db2777', book: BOOK,
    blurb: 'Syllabus section 16: mitosis, meiosis, asexual and sexual reproduction, flowers and human reproduction.',
    lessons: [
      { id: 'bi-division', title: 'Mitosis and meiosis', obj: ['16.1'], kw: 'mitosis meiosis haploid diploid chromosomes stem cells', learn: [],
        hook: 'You began as one cell. Now you are about 37 trillion.',
        scenes: [
          { say: idea('<b>Mitosis</b> copies a cell exactly: same chromosomes, identical cells, for <b>growth and repair</b>. <b>Meiosis</b> halves the chromosome number to make <b>gametes</b> (sex cells), each one different, so that when two join at fertilisation the number is back to normal.') },
          { say: 'Follow the chromosome number.', anim: X([{ k: 's', label: 'Step', min: 0, max: 3, v: 0, fmt: i => ['body cell', 'after mitosis', 'gametes (meiosis)', 'zygote (fertilisation)'][i] }], v => `<p class="center bigq">${['🧬 46 (diploid: 23 pairs)', '🧬🧬 46 + 46: identical copies', '🥚 23 + 🐟 23 (haploid, all different)', '👶 23 + 23 = 46 (diploid again)'][v.s]}</p>`) },
          { say: 'Mitosis is for growth, repairing damage, replacing dying cells and asexual reproduction. <b>Stem cells</b> are unspecialised cells that divide by mitosis and can become specialised. <b>Cancer</b> is uncontrolled cell division.',
            ask: T('Why must gametes be haploid?', ['So the zygote has the normal (diploid) number after fertilisation', 'So they can swim', 'So they are identical'], 0, 'Otherwise the number would double every generation.') },
          { say: 'Chromosomes are made of DNA; a <b>gene</b> is a length of DNA carrying information. (The stages of mitosis and meiosis are not required.)' }
        ],
        keys: ['Diploid (2 sets, 46 in humans) vs haploid (1 set, 23).', 'Mitosis: identical cells; growth, repair, replacement, asexual reproduction.', 'Meiosis: halves chromosome number; genetically different gametes.', 'Stem cells; cancer = uncontrolled division.'],
        gens: ['bDivision'], easy: ['bDivision'] },
      { id: 'bi-plantrepro', title: 'Reproduction in plants', obj: ['16.2', '16.3'], kw: 'asexual sexual reproduction flowers pollination seeds germination dispersal', learn: [],
        hook: 'Why flowers are colourful, and why grass flowers aren\'t.',
        scenes: [
          { say: idea('<b>Asexual</b> reproduction: one parent, identical offspring, fast. <b>Sexual</b> reproduction: two gametes join, offspring vary, which helps a species survive change. A flower is a plant\'s machine for sexual reproduction: move <b>pollen</b> (male) to the <b>stigma</b> (female).') },
          { say: 'Compare flower types.', anim: X([{ k: 't', label: 'Pollinated by', min: 0, max: 1, v: 0, fmt: i => ['insects', 'wind'][i] }], v => `<p class="center bigq">${v.t ? '🌾' : '🌺'}</p><ul>${v.t ? '<li>small, dull petals, no scent or nectar</li><li>anthers and feathery stigmas hang outside</li><li>lots of light, smooth pollen</li>' : '<li>large, bright, scented petals and nectar</li><li>anthers and stigmas inside the flower</li><li>less pollen, sticky or spiky to cling to insects</li>'}</ul>`) },
          { say: 'After pollination, a <b>pollen tube</b> grows down the style into an ovule; the nuclei fuse (fertilisation). The <b>ovules become seeds</b> and the <b>ovary becomes the fruit</b>. Fruits are dispersed by wind or animals to spread out and avoid competition.',
            ask: T('Which part of a flower becomes the fruit?', ['ovary', 'anther', 'petal', 'stigma'], 0, 'Ovules inside become the seeds.') },
          { say: 'A seed: embryo (<b>radicle</b> → root, <b>plumule</b> → shoot, <b>cotyledons</b> → food store) inside a <b>testa</b>. To germinate it needs <b>water, oxygen and warmth</b>; enzymes break down stored food for growth.' }
        ],
        keys: ['Asexual vs sexual: identical vs varied; pros and cons.', 'Flower parts: sepals, petals, stamens (anther, filament), carpels (stigma, style, ovary, ovules).', 'Insect vs wind pollination; self vs cross-pollination.', 'Ovule → seed, ovary → fruit; dispersal; germination needs water, oxygen, warmth.'],
        gens: ['bRepro', 'bFlowers'], easy: ['bFlowers'] },
      { id: 'bi-humanrepro', title: 'Human reproduction', obj: ['16.4'], kw: 'human reproduction menstrual cycle hormones fertilisation placenta', learn: [],
        hook: 'The monthly cycle, explained with four hormones.',
        scenes: [
          { say: idea('Each month the body <b>prepares an egg</b> and <b>builds a soft lining</b> in the uterus in case a baby needs it. Four hormones run this like a timetable. If no fertilisation happens, the lining breaks down (a period) and the cycle restarts.') },
          { say: 'Slide through a 28-day cycle.', anim: X([{ k: 'd', label: 'Day', min: 1, max: 28, v: 14 }], v => { const ev = v.d <= 5 ? '🩸 Menstruation: the lining breaks down' : v.d < 13 ? '📈 FSH matures an egg; oestrogen rebuilds the lining' : v.d <= 15 ? '🥚 LH surge → ovulation (egg released)' : '🛏️ Progesterone keeps the lining thick'; return `${K.plot([{ f: x => 1 + 3.5 * Math.exp(-((x - 13) ** 2) / 20), color: '#f59e0b' }, { f: x => 6 * Math.exp(-((x - 14) ** 2) / 1.5), color: '#db2777' }, { f: x => 4 * Math.exp(-((x - 21) ** 2) / 14), color: '#6366f1', dash: true }], [{ x: v.d, y: 0.3 }], { xmin: 1, xmax: 28, ymin: 0, ymax: 7, h: 170, gstep: 1e9, lstep: 1e9, xlab: 'day', ylab: 'level' })}<p class="center small"><span style="color:#f59e0b">■ oestrogen</span> · <span style="color:#db2777">■ LH</span> · <span style="color:#6366f1">■ progesterone</span></p><p class="center"><b>Day ${v.d}:</b> ${ev}</p>`; }) },
          { say: 'Gametes compared:', pic: '<table class="tbl"><tr><th></th><th>sperm</th><th>egg</th></tr><tr><td>size</td><td>tiny</td><td>large</td></tr><tr><td>number</td><td>millions</td><td>one a month</td></tr><tr><td>moves?</td><td>yes (flagellum, mitochondria)</td><td>no</td></tr><tr><td>special</td><td>acrosome enzymes</td><td>energy store, jelly coat</td></tr></table>',
            ask: T('Where does fertilisation usually happen?', ['Oviduct', 'Uterus', 'Ovary', 'Cervix'], 0, 'The embryo (a ball of cells) then implants in the uterus lining.') },
          { say: 'During pregnancy the <b>placenta</b> lets food, oxygen and wastes pass between mother\'s and baby\'s blood (without mixing); the <b>umbilical cord</b> connects them; <b>amniotic fluid</b> cushions the fetus. Some viruses can cross the placenta. <b>Testosterone</b> and <b>oestrogen</b> cause puberty changes.' }
        ],
        keys: ['Male: testes, scrotum, sperm ducts, prostate, urethra, penis. Female: ovaries, oviducts, uterus, cervix, vagina.', 'FSH (egg matures), LH (ovulation), oestrogen (builds lining), progesterone (maintains lining).', 'Fertilisation in the oviduct; implantation in the uterus.', 'Placenta, umbilical cord, amniotic sac and fluid.'],
        gens: ['bHumanRepro'], easy: ['bHumanRepro'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-genetics', name: 'Inheritance and biotechnology', icon: '🧬', color: '#9333ea', book: BOOK,
    blurb: 'Syllabus sections 17–18: variation, DNA, inheritance, selection, biotechnology and genetic modification.',
    lessons: [
      { id: 'bi-dna', title: 'Variation and DNA', obj: ['17.1', '17.2'], kw: 'variation continuous discontinuous dna bases genes', learn: [],
        hook: 'Why no two people (except identical twins) are exactly alike.',
        scenes: [
          { say: idea('Your <b>DNA</b> is a long code written in four letters (bases A, T, C, G). A <b>gene</b> is one instruction: its base order decides the order of amino acids in a <b>protein</b>, and so the protein\'s shape and job. Different instructions → <b>variation</b>.') },
          { say: 'Pair up the bases: A with T, C with G.', anim: X([{ k: 'i', label: 'Sequence', min: 0, max: 3, v: 0, fmt: i => ['ATGC', 'GGTA', 'CATT', 'TACG'][i] }], v => { const s = ['ATGCAT', 'GGTACC', 'CATTGA', 'TACGGA'][v.i], c = s.split('').map(b => ({ A: 'T', T: 'A', C: 'G', G: 'C' })[b]).join(''); return `<p class="center bigq" style="letter-spacing:6px">${s}</p><p class="center bigq" style="letter-spacing:6px">${'|'.repeat(6)}</p><p class="center bigq" style="letter-spacing:6px">${c}</p><p class="center small muted">Two strands twist into a double helix, held by the base pairs.</p>`; }) },
          { say: 'Two kinds of variation:', anim: X([{ k: 'k', label: 'Feature', min: 0, max: 1, v: 0, fmt: i => ['height', 'blood group'][i] }], v => v.k ? `${K.plot([], [], { xmin: 0, xmax: 5, ymin: 0, ymax: 50, h: 150, gstep: 1e9, lstep: 1e9, segs: [[1, 40], [2, 10], [3, 42], [4, 4]].map(([x, y]) => ({ pts: [[x - .3, 0], [x - .3, y], [x + .3, y], [x + .3, 0]] })), xlab: 'A   B   O   AB', ylab: '%' })}<p class="center"><b>Discontinuous</b>: a few distinct groups, no in-betweens. Usually genes only.</p>` : `${K.plot([{ f: x => 40 * Math.exp(-((x - 165) ** 2) / 120) }], [], { xmin: 140, xmax: 190, ymin: 0, ymax: 50, h: 150, gstep: 1e9, lstep: 1e9, xlab: 'height', ylab: 'number' })}<p class="center"><b>Continuous</b>: a smooth range. Genes AND environment (e.g. diet).</p>`) },
          { say: 'DNA controls the cell by controlling which <b>proteins</b> (including enzymes) are made. Different amino acid sequences fold into different shapes.', ask: T('If 30% of the bases in DNA are A, what % are T?', ['30%', '20%', '40%', '70%'], 0, 'A pairs with T, so they are always equal.') }
        ],
        keys: ['Continuous (range; genes + environment) vs discontinuous (groups; genes).', 'DNA: double helix, nucleotides, bases A–T and C–G.', 'Gene = DNA coding for a protein; base sequence → amino acid sequence → shape.'],
        gens: ['bDNA', 'bVariation'], easy: ['bVariation'] },
      { id: 'bi-inheritance', title: 'Inheritance', obj: ['17.3'], kw: 'inheritance alleles dominant recessive punnett square codominance sex determination mutation', learn: [],
        hook: 'How two brown-eyed parents can have a blue-eyed child.',
        scenes: [
          { say: idea('You get <b>two copies</b> of each gene, one from each parent. The versions are called <b>alleles</b>. A <b>dominant</b> allele shows even if there is only one; a <b>recessive</b> one only shows if you have two. A <b>Punnett square</b> lists every way the alleles can combine.') },
          { say: 'Build a cross: T = tall (dominant), t = short.', anim: X([{ k: 'a', label: 'Parent 1', min: 0, max: 2, v: 1, fmt: i => ['TT', 'Tt', 'tt'][i] }, { k: 'b', label: 'Parent 2', min: 0, max: 2, v: 1, fmt: i => ['TT', 'Tt', 'tt'][i] }], v => { const p1 = ['TT', 'Tt', 'tt'][v.a], p2 = ['TT', 'Tt', 'tt'][v.b]; const kids = []; [p1[0], p1[1]].forEach(x => [p2[0], p2[1]].forEach(y => kids.push(x + y))); const short = kids.filter(k => k === 'tt').length; return `${S.punnett(p1, p2, g => g.includes('T') ? '#16a34a' : '#f59e0b')}<p class="center bigq">tall ${(4 - short) * 25}% · short ${short * 25}%</p>`; }) },
          { say: 'Words to know: <b>genotype</b> (the alleles, e.g. Tt), <b>phenotype</b> (what you see, e.g. tall), <b>homozygous</b> (TT or tt), <b>heterozygous</b> (Tt). Two identical homozygous parents are <b>pure-breeding</b>. Real ratios drift from 3 : 1 or 1 : 1 when there are few offspring, because fertilisation is random.',
            ask: T('Tt × tt gives what ratio of tall : short?', ['1 : 1', '3 : 1', 'all tall', '1 : 3'], 0, 'Tt, Tt, tt, tt.') },
          { say: '<b>Codominance</b>: in ABO blood groups, I<sup>A</sup> and I<sup>B</sup> both show (group AB); I<sup>o</sup> is recessive. <b>Sex</b>: XX female, XY male, a 50% chance each time. <b>Mutations</b>: a gene mutation changes the base sequence (sickle cell anaemia); a chromosome mutation changes the number (Down\'s syndrome, 47 chromosomes). Radiation and some chemicals increase mutation rates.' }
        ],
        keys: ['Allele, dominant, recessive, genotype, phenotype, homozygous, heterozygous.', 'Punnett squares: 3 : 1 (Tt × Tt) and 1 : 1 (Tt × tt).', 'Codominance: ABO blood groups.', 'XX/XY; gene vs chromosome mutation; sources of variation.'],
        gens: ['bCross', 'bABO', 'bGenetics'], easy: ['bGenetics'] },
      { id: 'bi-selection', title: 'Natural and artificial selection', obj: ['17.4'], kw: 'natural selection evolution adaptation antibiotic resistance selective breeding', learn: [],
        hook: 'How a whole species can change colour in 50 years.',
        scenes: [
          { say: idea('In every population, individuals <b>vary</b>. More are born than can survive, so they <b>compete</b>. Those with features that suit the environment <b>survive and breed</b> more, passing on their alleles. Over many generations, the population <b>changes</b>: natural selection.') },
          { say: 'Peppered moths on trees blackened by soot. Run the generations.', anim: X([{ k: 'g', label: 'Generations', min: 0, max: 40, step: 2, v: 0 }], v => { const p = 1 / (1 + 99 * Math.exp(-v.g * .25)); return `<p class="center bigq">${'⬛'.repeat(Math.round(p * 10))}${'⬜'.repeat(10 - Math.round(p * 10))}</p><p class="center">dark moths: <b>${Math.round(p * 100)}%</b></p><p class="center small muted">Birds spot pale moths on dark bark, so dark moths survive to breed and pass on the dark allele.</p>`; }) },
          { say: 'The same thing happens with bacteria: an antibiotic kills most, but a few <b>resistant</b> ones survive and multiply (e.g. MRSA).',
            ask: T('In selective breeding, who chooses which individuals reproduce?', ['Humans', 'The environment', 'Chance only'], 0, 'Choose parents with desired features, breed, select the best offspring, repeat for many generations.') }
        ],
        keys: ['Natural selection: variation, many offspring, struggle for survival, better adapted reproduce, alleles passed on.', 'Antibiotic resistance (MRSA) is natural selection.', 'Artificial selection: humans choose parents over many generations (crops, livestock).'],
        gens: ['bSelection'], easy: ['bSelection'] },
      { id: 'bi-biotech', title: 'Biotechnology and genetic modification', obj: ['18.1', '18.2'], kw: 'biotechnology yeast fermenter enzymes genetic modification insulin', learn: [],
        hook: 'Using microbes as tiny factories.',
        scenes: [
          { say: idea('Microbes multiply fast and can make complex molecules. Put them in the right conditions and they become <b>factories</b>: yeast makes bread rise, bacteria make medicines. <b>Genetic modification</b> goes further: <b>move a useful gene</b> into an organism so it makes a new product.') },
          { say: 'Run a fermenter. Keep the conditions right.', anim: X([{ k: 't', label: 'Temperature (°C)', min: 10, max: 60, step: 5, v: 35 }, { k: 'o', label: 'Oxygen supply', min: 0, max: 10, v: 7 }], v => { const ok = v.t >= 25 && v.t <= 40 && v.o >= 5; return `<p class="center bigq">${ok ? '🏭✅ high yield' : '🏭⚠️ poor yield'}</p><p class="center small muted">Also control pH, nutrients and remove waste products. Too hot denatures enzymes; too little oxygen slows aerobic microbes.</p>`; }) },
          { say: 'Making human insulin:', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ Cut the <b>insulin gene</b> out of human DNA.</p>', '<p>2️⃣ Insert it into a bacterial <b>plasmid</b>.</p>', '<p>3️⃣ Put the plasmid into bacteria.</p>', '<p>4️⃣ Grow them in a fermenter: they make <b>human insulin</b> for people with diabetes. 💉</p>'] } },
          { say: 'Enzymes in industry: <b>biological washing powders</b> (digest stains), <b>pectinase</b> (more fruit juice), <b>lactase</b> (lactose-free milk). GM crops can resist herbicides or insects, or contain extra vitamins. Weigh the benefits against risks (genes spreading to wild plants, effects on food chains).',
            ask: T('Why are bacteria used in genetic modification?', ['They reproduce fast and have plasmids', 'They have a nucleus', 'They photosynthesise'], 0, 'And there are few ethical concerns about growing them.') }
        ],
        keys: ['Yeast: bread (CO₂) and ethanol.', 'Bacteria: fast reproduction, plasmids, no ethical concerns.', 'Fermenter: control temperature, pH, oxygen, nutrients, wastes.', 'GM: insulin gene into bacteria; GM crops; advantages and risks.'],
        gens: ['bBiotech'], easy: ['bBiotech'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-ecology', name: 'Ecology', icon: '🌍', color: '#15803d', book: BOOK,
    blurb: 'Syllabus section 19: food chains and energy flow, nutrient cycles, ecosystems, human impact and conservation.',
    lessons: [
      { id: 'bi-food', title: 'Food chains and energy flow', obj: ['19.1'], kw: 'food chains food webs trophic levels pyramids energy transfer', learn: [],
        hook: 'Why there are no animals that eat lions.',
        scenes: [
          { say: idea('Energy enters food chains from the <b>Sun</b> through <b>producers</b>. At each step up, most energy is <b>lost</b> (respiration, movement, heat, waste, parts not eaten). Only about 10% passes on, so after a few steps there is too little left to support another level.') },
          { say: 'Change how efficiently energy is passed on.', anim: X([{ k: 'e', label: 'Energy passed on (%)', min: 5, max: 30, step: 5, v: 10 }], v => { const lv = [10000]; for (let i = 1; i < 4; i++) lv.push(lv[i - 1] * v.e / 100); return `${S.svg(300, 150, lv.map((E, i) => { const w = Math.max(6, 280 * Math.pow(E / 10000, .35)); return `<rect x="${150 - w / 2}" y="${120 - i * 34}" width="${w}" height="28" rx="4" fill="var(--c${i + 1})" opacity=".85"/>${S.txt(150, 139 - i * 34, n(r(E, 1)) + ' kJ', 'in')}`; }).join(''), 300)}<p class="center small">🌿 producer → 🐇 herbivore → 🦊 carnivore → 🦅 top carnivore</p>`; }) },
          { say: 'Words: <b>producer</b> (makes food), <b>consumer</b> (eats), <b>herbivore</b>, <b>carnivore</b>, <b>decomposer</b> (breaks down dead material). Food <b>webs</b> are interlinked food chains. Pyramids show <b>numbers</b>, <b>biomass</b> or <b>energy</b> at each level.',
            ask: T('Why is it more energy-efficient for people to eat crops than meat?', ['There is one fewer step, so less energy is lost', 'Crops contain more energy than the Sun', 'Animals create energy'], 0, 'Feeding crops to animals wastes about 90% of the energy.') }
        ],
        keys: ['Sun → producers → consumers; decomposers.', 'Energy transfer is inefficient (~10%), so chains are short (< 5 levels).', 'Pyramids of numbers, biomass and energy.', 'Eating crops is more efficient than eating livestock.'],
        gens: ['bFood', 'bEcology'], easy: ['bEcology'] },
      { id: 'bi-cycles', title: 'Carbon and nitrogen cycles', obj: ['19.2'], kw: 'carbon cycle nitrogen cycle decomposition nitrification nitrogen fixation', learn: [],
        hook: 'The carbon in your body may once have been part of a dinosaur.',
        scenes: [
          { say: idea('Energy flows through and is lost, but <b>matter is recycled</b>. Atoms of carbon and nitrogen go round and round between the air, living things and the soil, with <b>decomposers</b> (bacteria and fungi) doing a lot of the recycling.') },
          { say: 'The carbon cycle:', anim: { type: 'reveal', keep: true, stages: ['<p>🌿 <b>Photosynthesis</b> takes CO₂ out of the air.</p>', '<p>🐄 <b>Feeding</b> passes carbon along food chains.</p>', '<p>💨 <b>Respiration</b> by all living things returns CO₂.</p>', '<p>🍂 <b>Decomposition</b>: decomposers respire as they break down dead things.</p>', '<p>⛏️ Some dead material becomes <b>fossil fuels</b>; <b>combustion</b> releases its CO₂.</p>'] } },
          { say: 'The nitrogen cycle (plants need nitrogen for proteins but can\'t use N₂ gas):', anim: { type: 'reveal', keep: true, stages: ['<p>⚡🦠 <b>Nitrogen fixation</b>: lightning and bacteria turn N₂ into usable compounds.</p>', '<p>🍂 <b>Decomposition</b>: dead protein → ammonium ions.</p>', '<p>🦠 <b>Nitrification</b>: bacteria turn ammonium into <b>nitrates</b>.</p>', '<p>🌱 Plants <b>absorb nitrates</b> → amino acids → proteins; animals eat and digest them.</p>', '<p>💨 <b>Denitrification</b>: bacteria turn nitrates back into N₂ gas.</p>'] },
            ask: T('Which process REMOVES carbon dioxide from the air?', ['Photosynthesis', 'Respiration', 'Combustion', 'Decomposition'], 0, 'All the others release it.') }
        ],
        keys: ['Carbon: photosynthesis, respiration, feeding, decomposition, fossil fuels, combustion.', 'Nitrogen: decomposition → ammonium, nitrification → nitrates, fixation, absorption, proteins, denitrification.', 'Decomposers: bacteria and fungi.'],
        gens: ['bEcology'], easy: ['bEcology'] },
      { id: 'bi-ecosystems', title: 'Ecosystems and human impact', obj: ['19.3', '19.4'], kw: 'population community ecosystem biodiversity deforestation eutrophication pollution', learn: [],
        hook: 'Why fertiliser on a farm can kill fish in a lake.',
        scenes: [
          { say: idea('An <b>ecosystem</b> is all the living things in an area and their surroundings, interacting. Humans change ecosystems a lot: cutting forests, polluting water and air, over-harvesting, and moving species around. Each change ripples through the food web.') },
          { say: 'Watch eutrophication happen.', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ Fertiliser or sewage washes in: <b>more nitrate ions</b>.</p>', '<p>2️⃣ Algae and plants (<b>producers</b>) grow fast.</p>', '<p>3️⃣ They block light, then <b>die</b>.</p>', '<p>4️⃣ <b>Decomposers</b> multiply and respire aerobically…</p>', '<p>5️⃣ …using up the <b>dissolved oxygen</b>. 🐟💀 Fish and other animals die.</p>'] } },
          { say: 'Terms: <b>population</b> (one species in an area), <b>community</b> (all the populations), <b>ecosystem</b> (community + environment), <b>biodiversity</b> (number of species). Population growth depends on food, competition, predation and disease.',
            ask: T('Deforestation increases atmospheric CO₂ because…', ['fewer trees photosynthesise, and burning releases CO₂', 'trees release CO₂ when alive', 'soil absorbs oxygen'], 0, 'It also reduces biodiversity and causes soil loss and flooding.') },
          { say: 'Other impacts: over-harvesting, non-native species, greenhouse gases (global warming), insecticides and herbicides, non-biodegradable plastics on land and in water.' }
        ],
        keys: ['Population, community, ecosystem, biodiversity.', 'Factors limiting population growth; human population and resources.', 'Deforestation effects; over-harvesting; non-native species.', 'Eutrophication steps; greenhouse gases; pesticides; plastics.'],
        gens: ['bHumans', 'bEcology'], easy: ['bHumans'] },
      { id: 'bi-conservation', title: 'Conservation', obj: ['19.5'], kw: 'conservation sustainable resources fish stocks forests', learn: [],
        hook: 'How to keep using nature without using it up.',
        scenes: [
          { say: idea('A resource is <b>sustainable</b> if we take it no faster than it can replace itself. Conservation keeps species and habitats going, protecting <b>biodiversity</b> and preventing <b>extinction</b>.') },
          { say: 'Fish a lake. Change how much you catch each year.', anim: X([{ k: 'c', label: 'Catch (% of fish per year)', min: 0, max: 60, step: 5, v: 20 }], v => { let P = 1000; for (let y = 0; y < 10; y++) P = Math.max(0, P + P * .3 * (1 - P / 1500) - P * v.c / 100); return `<p class="center bigq">🐟 after 10 years: ${Math.round(P)} fish</p><p class="center">${P > 800 ? '✅ Sustainable' : P > 200 ? '⚠️ Declining' : '❌ Collapsed'}</p><p class="center small muted">Tools: quotas, closed seasons, protected areas, bigger net mesh (young fish escape), monitoring, education.</p>`; }) },
          { say: 'Forests are conserved with <b>education, protected areas, quotas and replanting</b>.', ask: T('Why do nets with a bigger mesh help conserve fish?', ['Young fish escape and grow up to breed', 'They catch more fish', 'They are cheaper'], 0, 'The population can replace itself.') }
        ],
        keys: ['Reasons: biodiversity, reducing extinction, protecting vulnerable environments.', 'Forests: education, protected areas, quotas, replanting.', 'Fish: education, closed seasons, protected areas, net types and mesh size, quotas, monitoring.', 'Sustainable resource: produced as fast as it is removed.'],
        gens: ['bHumans'], easy: ['bHumans'] }
    ] });
})();
