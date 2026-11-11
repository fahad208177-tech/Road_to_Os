// Physics 5054, part 4: Nuclear physics (section 5) and Space physics (section 6).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const BOOK = ['College Physics 2e', 'https://openstax.org/details/books/college-physics-2e'];
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const EL = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminium', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
  const SYM = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const nuc = (A, Z, X) => `<span class="nuc"><span><sup>${A}</sup><sub>${Z}</sub></span>${X}</span>`;
  S.nuc = nuc;

  // ================= generators =================
  const NUCS = [[12, 6, 'C'], [14, 6, 'C'], [16, 8, 'O'], [23, 11, 'Na'], [27, 13, 'Al'], [35, 17, 'Cl'], [37, 17, 'Cl'], [40, 19, 'K'], [56, 26, 'Fe'], [60, 27, 'Co'], [90, 38, 'Sr'], [131, 53, 'I'], [235, 92, 'U'], [238, 92, 'U'], [241, 95, 'Am']];
  G.phNuclide = () => { const [A, Z, X] = pick(NUCS), q = pick(['n', 'n', 'p', 'nucleons']);
    if (q === 'n') return num(`<p>How many <b>neutrons</b> are in the nucleus ${nuc(A, Z, X)}?</p>`, A - Z, '', [`Top number A = protons + neutrons = ${A}; bottom number Z = protons = ${Z}`, `neutrons = A − Z = ${A} − ${Z} = <b>${A - Z}</b>`], 'neutrons = nucleon number − proton number');
    if (q === 'p') return num(`<p>How many <b>protons</b> are in ${nuc(A, Z, X)}?</p>`, Z, '', [`The bottom number (proton number Z) = <b>${Z}</b>`], 'Z, the bottom number, counts protons.');
    return num(`<p>How many <b>nucleons</b> (protons + neutrons) are in ${nuc(A, Z, X)}?</p>`, A, '', [`The top number (nucleon number A) = <b>${A}</b>`], 'A, the top number, counts all the nucleons.'); };
  const DECAYS = [[238, 92, 'U', 'α', 234, 90, 'Th'], [226, 88, 'Ra', 'α', 222, 86, 'Rn'], [210, 84, 'Po', 'α', 206, 82, 'Pb'], [241, 95, 'Am', 'α', 237, 93, 'Np'], [14, 6, 'C', 'β', 14, 7, 'N'], [90, 38, 'Sr', 'β', 90, 39, 'Y'], [131, 53, 'I', 'β', 131, 54, 'Xe'], [60, 27, 'Co', 'β', 60, 28, 'Ni']];
  G.phDecay = () => { const [A, Z, X, t, A2, Z2, X2] = pick(DECAYS), ask = pick(['A', 'Z']); const part = t === 'α' ? nuc(4, 2, 'α') : nuc(0, '−1', 'β');
    return num(`<p>${nuc(A, Z, X)} decays by emitting ${t === 'α' ? 'an alpha' : 'a beta'} particle into ${X2}. What is the ${ask === 'A' ? '<b>nucleon number</b> (top)' : '<b>proton number</b> (bottom)'} of the new nucleus?</p><p class="center bigq">${nuc(A, Z, X)} → ${nuc('?', '?', X2)} + ${part}</p>`, ask === 'A' ? A2 : Z2, '', [t === 'α' ? 'An α-particle is 2 protons + 2 neutrons: A drops by 4, Z drops by 2.' : 'In β-decay a neutron turns into a proton and an electron: A stays the same, Z goes up by 1.', `Top numbers balance: ${A} = ${A2} + ${t === 'α' ? 4 : 0}. Bottom numbers balance: ${Z} = ${Z2} + (${t === 'α' ? 2 : -1}).`, `<b>${ask === 'A' ? A2 : Z2}</b>`], 'The top numbers and the bottom numbers must add up the same on both sides.'); };
  G.phCount = () => { const bg = pick([12, 15, 18, 20, 24, 30]), src = pick([100, 150, 240, 300, 500]);
    return num(`<p>A Geiger counter reads ${src + bg} counts per minute near a source. With the source removed it reads ${bg} counts per minute. What is the corrected count rate due to the source?</p>`, src, 'counts/min', [`corrected = measured − background = ${src + bg} − ${bg} = <b>${src} counts/min</b>`], 'Subtract the background count.'); };
  G.phHalf = () => { const q = pick(['left', 'left', 'time', 'hl']), hl = pick([2, 3, 5, 6, 8, 10, 20]), k = pick([1, 2, 3, 4]), N0 = pick([800, 1600, 3200, 6400, 640]);
    const left = N0 / 2 ** k, unit = pick(['days', 'hours', 'years', 'minutes']);
    if (q === 'left') return num(`<p>A sample has a count rate of ${N0} counts/s. Its half-life is ${hl} ${unit}. What will the count rate be after ${hl * k} ${unit}?</p>`, left, 'counts/s', [`${hl * k} ÷ ${hl} = ${k} half-lives`, `${N0}${Array.from({ length: k }, (_, i) => ` → ${N0 / 2 ** (i + 1)}`).join('')}`, `<b>${n(left)} counts/s</b>`], 'Count the half-lives, then halve that many times.');
    if (q === 'time') return num(`<p>The activity of a sample falls from ${N0} to ${n(left)} counts/s. The half-life is ${hl} ${unit}. How long did that take?</p>`, hl * k, unit, [`${N0} → … → ${n(left)} is ${k} halvings`, `time = ${k} × ${hl} = <b>${hl * k} ${unit}</b>`], 'Count how many times it halved.');
    return num(`<p>A sample's count rate falls from ${N0} to ${n(left)} counts/s in ${hl * k} ${unit}. What is its half-life?</p>`, hl, unit, [`${k} halvings happened`, `half-life = ${hl * k} ÷ ${k} = <b>${hl} ${unit}</b>`], 'Count the halvings, then divide the time by that number.'); };
  bank('phAtomIdea', [
    { q: 'In the alpha-scattering experiment, most α-particles went straight through the gold foil. This showed…', a: 'the atom is mostly empty space', w: ['the nucleus is negative', 'atoms are solid balls', 'electrons are heavy'], why: 'A few bounced back, showing a tiny, dense, positive nucleus.' },
    { q: 'A few α-particles bounced straight back. This showed the nucleus is…', a: 'tiny, positive and contains most of the mass', w: ['large and empty', 'negative', 'made of electrons'], why: 'Only something small, massive and positive could repel them so strongly.' },
    { q: 'Isotopes of an element have…', a: 'the same number of protons but different numbers of neutrons', w: ['different numbers of protons', 'the same nucleon number', 'different numbers of electrons only'], why: 'E.g. carbon-12 and carbon-14.' },
    { q: 'An atom that loses an electron becomes…', a: 'a positive ion', w: ['a negative ion', 'an isotope', 'a neutron'], why: 'It now has more protons than electrons.' },
    { q: 'The nucleus contains…', a: 'protons and neutrons', w: ['protons and electrons', 'only electrons', 'neutrons and electrons'], why: 'Electrons orbit outside the nucleus.' }
  ]);
  bank('phRadiation', [
    { q: 'Which radiation is stopped by a sheet of paper?', a: 'Alpha (α)', w: ['Beta (β)', 'Gamma (γ)', 'None of them'], why: 'α is stopped by paper, β by a few mm of aluminium, γ is only reduced by thick lead or concrete.' },
    { q: 'Which radiation is the most ionising?', a: 'Alpha (α)', w: ['Gamma (γ)', 'Beta (β)', 'They are equal'], why: 'Big and highly charged, it rips electrons off atoms but is quickly stopped.' },
    { q: 'A β-particle is…', a: 'a fast electron emitted from the nucleus', w: ['a helium nucleus', 'an EM wave', 'a proton'], why: 'A neutron turns into a proton and an electron.' },
    { q: 'Gamma radiation is…', a: 'a high-frequency electromagnetic wave', w: ['a helium nucleus', 'an electron', 'a neutron'], why: 'No mass and no charge, so it is not deflected by fields.' },
    { q: 'Which radiation is NOT deflected by electric or magnetic fields?', a: 'Gamma', w: ['Alpha', 'Beta', 'All are deflected'], why: 'It has no charge.' },
    { q: 'α and β are deflected in opposite directions in a magnetic field because…', a: 'they have opposite charges', w: ['they have the same charge', 'α is a wave', 'β is heavier'], why: 'α is +, β is −. β is deflected more because it is much lighter.' },
    { q: 'Radioactive decay is random. This means…', a: 'you cannot predict when a particular nucleus will decay', w: ['it happens at the same time every day', 'heating speeds it up', 'it only happens in sunlight'], why: 'It is spontaneous: nothing triggers it.' },
    { q: 'Which is a source of background radiation?', a: 'Radon gas in the air', w: ['Mobile phones', 'Microwave ovens', 'Light bulbs'], why: 'Also rocks and buildings, food and drink, and cosmic rays.' },
    { q: 'β and γ are detected with…', a: 'a Geiger-Müller tube and counter', w: ['a thermometer', 'a voltmeter only', 'a compass'], why: 'α can be detected with a cloud chamber or spark counter.' }
  ]);
  bank('phNuclearUse', [
    { q: 'Smoke alarms use an α-source with a long half-life because…', a: 'α is easily stopped by smoke, and a long half-life means it lasts for years', w: ['α passes through walls', 'a short half-life is safer', 'γ is stopped by smoke'], why: 'Smoke absorbs the α-particles, the current drops and the alarm sounds.' },
    { q: 'To check the thickness of paper being made, which radiation is used?', a: 'Beta: thicker paper absorbs more of it', w: ['Alpha: it passes through paper easily', 'Gamma: paper absorbs it all', 'Radio waves'], why: 'β is partly absorbed by paper, so changes in thickness change the count.' },
    { q: 'Medical tracers use gamma emitters with a short half-life so that…', a: 'they can be detected outside the body and do not stay radioactive for long', w: ['they stay in the body forever', 'they are easy to stop with skin', 'they are cheaper'], why: 'γ penetrates the body; short half-life limits the dose.' },
    { q: 'Sterilising medical equipment uses…', a: 'gamma rays', w: ['alpha particles', 'radio waves', 'visible light'], why: 'They kill bacteria even through the packaging.' },
    { q: 'Carbon-14 dating works because…', a: 'living things stop taking in C-14 when they die, and it decays with a known half-life', w: ['C-14 never decays', 'dead things gain C-14', 'it measures gamma rays'], why: 'Less C-14 left → older.' },
    { q: 'Nuclear fission is…', a: 'a large nucleus (like U-235) splitting after absorbing a neutron, releasing energy and more neutrons', w: ['two small nuclei joining', 'an electron leaving an atom', 'a chemical reaction'], why: 'The extra neutrons can cause a chain reaction.' },
    { q: 'Fusion is…', a: 'two small nuclei joining to make a larger one, releasing energy', w: ['a heavy nucleus splitting', 'burning hydrogen in air', 'the decay of carbon'], why: 'It powers the stars.' },
    { q: 'In a nuclear reactor, the control rods…', a: 'absorb neutrons to control the chain reaction', w: ['speed up the neutrons', 'cool the reactor', 'produce the fuel'], why: 'The moderator slows neutrons; the coolant carries the heat away.' },
    { q: 'The best ways to reduce your dose when handling a source are…', a: 'less time, more distance, and shielding', w: ['more time and touching it', 'wearing sunglasses only', 'heating the source'], why: 'Use tongs, lead-lined boxes and short exposures.' },
    { q: 'Ionising radiation can harm living things by…', a: 'killing cells or causing mutations and cancer', w: ['making them heavier', 'turning them radioactive forever', 'making them magnetic'], why: 'It damages DNA.' }
  ]);
  G.phOrbit = () => { const o = pick([['the Moon around the Earth', 384000, 655, 'km', 'h'], ['the International Space Station', 6800, 1.5, 'km', 'h'], ['a geostationary satellite', 42000, 24, 'km', 'h'], ['the Earth around the Sun', 150000000, 8760, 'km', 'h']]); const [nm, rr, TT, du, tu] = o; const v = 2 * Math.PI * rr / TT;
    return num(`<p>${nm[0].toUpperCase() + nm.slice(1)} has an average orbital radius of ${n(rr)} ${du} and an orbital period of ${n(TT)} hours. What is its average orbital speed in km/h?</p>`, v, 'km/h', [`v = 2πr ÷ T`, `= 2 × π × ${n(rr)} ÷ ${n(TT)}`, `= <b>${n(K.sf(v, 3))} km/h</b>`], 'One orbit is a circle of length 2πr, travelled in time T.'); };
  G.phLightTime = () => { const p = pick([['the Sun to the Earth', 150], ['the Sun to Mars', 225], ['the Sun to Venus', 108], ['the Sun to Jupiter', 780], ['the Earth to Mars (closest)', 60]]);
    const t = p[1] * 1e9 / 3e8; return num(`<p>Light travels at 3.0 × 10⁸ m/s. How long does it take light to travel from ${p[0]}, a distance of ${p[1]} million km?</p>`, t, 's', [`distance = ${p[1]} million km = ${n(p[1] * 1e9)} m`, `time = distance ÷ speed = ${n(p[1] * 1e9)} ÷ 300 000 000 = <b>${n(K.sf(t, 3))} s</b>`], 'Convert km to m (× 1000), then time = distance ÷ speed.'); };
  bank('phSpace', [
    { q: 'How long does the Earth take to orbit the Sun?', a: 'About 365 days', w: ['About 24 hours', 'About one month', 'About 500 s'], why: 'It spins on its tilted axis once in about 24 hours.' },
    { q: 'Day and night are caused by…', a: 'the Earth rotating on its axis', w: ['the Earth orbiting the Sun', 'the Moon blocking the Sun', 'the Sun moving round the Earth'], why: 'One rotation ≈ 24 hours.' },
    { q: 'Which is the correct order of the planets from the Sun?', a: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune', w: ['Mercury, Venus, Mars, Earth, Jupiter, Saturn, Neptune, Uranus', 'Venus, Mercury, Earth, Mars, Saturn, Jupiter, Uranus, Neptune', 'Mercury, Earth, Venus, Mars, Jupiter, Uranus, Saturn, Neptune'], why: '"My Very Easy Method Just Speeds Up Naming."' },
    { q: 'What keeps the planets in orbit around the Sun?', a: 'The Sun\'s gravitational attraction', w: ['Magnetism', 'Air resistance', 'The planets\' own light'], why: 'Gravity provides the force towards the centre.' },
    { q: 'Planets further from the Sun…', a: 'orbit more slowly, because the Sun\'s gravitational field is weaker there', w: ['orbit faster', 'have no gravity', 'orbit in exactly one year'], why: 'Orbital speed decreases with distance.' },
    { q: 'Pluto is now classed as…', a: 'a dwarf planet', w: ['the ninth planet', 'a moon', 'a comet'], why: 'Minor planets include dwarf planets and asteroids.' },
    { q: 'The gravitational field strength at a planet\'s surface depends mainly on…', a: 'the mass of the planet', w: ['its colour', 'its number of moons', 'its temperature'], why: 'And around a planet, g decreases with distance.' },
    { q: 'The Moon orbits the Earth in about…', a: 'one month', w: ['one day', 'one year', 'one week'], why: 'About 27–29 days.' },
    { q: 'Light takes about how long to reach Earth from the Sun?', a: '500 s (about 8 minutes)', w: ['1 second', '1 day', '1 year'], why: '150 million km ÷ 300 000 km/s.' }
  ]);
  bank('phStars', [
    { q: 'The Sun is…', a: 'a medium-sized star made mostly of hydrogen and helium', w: ['a giant star made of iron', 'a planet', 'a white dwarf'], why: 'It radiates mostly infrared, visible and ultraviolet.' },
    { q: 'Stable stars like the Sun are powered by…', a: 'nuclear fusion of hydrogen into helium', w: ['burning coal', 'nuclear fission of uranium', 'chemical reactions with oxygen'], why: 'Fusion in the hot, dense core.' },
    { q: 'A star is stable when…', a: 'the inward pull of gravity balances the outward push from the hot core', w: ['it stops making energy', 'it has no gravity', 'it runs out of hydrogen'], why: 'When the hydrogen runs out, the balance changes.' },
    { q: 'What happens to a Sun-sized star at the end of its life?', a: 'Red giant → planetary nebula with a white dwarf at its centre', w: ['Supernova → black hole', 'It explodes immediately', 'It turns into a planet'], why: 'Only much more massive stars go supernova.' },
    { q: 'A red supergiant ends its life as…', a: 'a supernova, leaving a neutron star or black hole', w: ['a white dwarf in a planetary nebula', 'a protostar', 'a comet'], why: 'The nebula contains new, heavier elements.' },
    { q: 'Stars form from…', a: 'clouds of gas and dust containing hydrogen, collapsing under gravity', w: ['exploding planets', 'black holes', 'comets'], why: 'A collapsing, heating cloud is a protostar.' },
    { q: 'A light-year is a unit of…', a: 'distance (how far light travels in a year)', w: ['time', 'speed', 'brightness'], why: 'Astronomical distances are huge.' },
    { q: 'The Milky Way is…', a: 'our galaxy, about 100 000 light-years across', w: ['the Solar System', 'a single star', 'the whole Universe'], why: 'One of many billions of galaxies.' },
    { q: 'Redshift means the light from a galaxy has…', a: 'longer observed wavelengths, because the galaxy is moving away', w: ['shorter wavelengths', 'turned red-hot', 'stopped moving'], why: 'More distant galaxies show more redshift: they recede faster.' },
    { q: 'Redshift of distant galaxies is evidence for…', a: 'the Big Bang: the Universe is expanding', w: ['the Universe shrinking', 'the Sun being the centre', 'galaxies standing still'], why: 'Everything is moving apart, so it was once all together.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'physics', id: 'ph-nuclear', name: 'Nuclear physics', icon: '☢️', color: '#16a34a', book: BOOK,
    blurb: 'Syllabus section 5: the atom, isotopes, radioactivity, half-life, fission, fusion and safety.',
    lessons: [
      { id: 'ph-atom', title: 'The atom and the nucleus', obj: ['5.1.1', '5.1.2'], kw: 'atom nucleus protons neutrons isotopes nuclide', learn: [],
        hook: 'If an atom were a football stadium, the nucleus would be a pea in the centre.',
        scenes: [
          { say: idea('An atom is a tiny, heavy, <b>positive nucleus</b> (protons + neutrons) with <b>negative electrons</b> orbiting far away. It is <b>mostly empty space</b>. The number of <b>protons</b> decides which element it is.') },
          { say: 'Build a nucleus.', anim: X([{ k: 'Z', label: 'Protons', min: 1, max: 20, v: 6 }, { k: 'N', label: 'Neutrons', min: 0, max: 22, v: 6 }], v => `${S.atom(v.Z, v.N)}<p class="center bigq">${nuc(v.Z + v.N, v.Z, SYM[v.Z])} = ${EL[v.Z]}-${v.Z + v.N}</p><p class="center small">proton number Z = ${v.Z} (decides the element) · nucleon number A = ${v.Z + v.N}</p><p class="center small muted">Change only the neutrons: same element, different <b>isotope</b>. ${v.N < v.Z - 1 || v.N > v.Z * 1.6 + 2 ? '⚠️ This nucleus would be very unstable: real nuclei have about as many neutrons as protons, or a few more.' : ''}</p>`) },
          { say: 'How we know: in the <b>alpha-scattering</b> experiment, α-particles were fired at thin gold foil. Most went straight through (mostly empty space); a very few bounced back (a tiny, dense, positive nucleus).',
            ask: T('Neutrons in ¹⁴₆C?', ['8', '6', '14', '20'], 0, 'A − Z = 14 − 6 = 8.') },
          { say: 'Atoms that lose electrons become <b>positive ions</b>; atoms that gain electrons become <b>negative ions</b>.' }
        ],
        keys: ['Nucleus: protons (+) and neutrons (0). Electrons (−) orbit.', 'Z = proton number; A = nucleon number; neutrons = A − Z.', 'Isotopes: same Z, different numbers of neutrons.', 'α-scattering: tiny, massive, positive nucleus; atom mostly empty.'],
        gens: ['phNuclide', 'phAtomIdea'], easy: ['phAtomIdea'] },
      { id: 'ph-radiation', title: 'Alpha, beta and gamma', obj: ['5.2.1', '5.2.2', '5.2.3'], kw: 'radioactivity alpha beta gamma decay background radiation', learn: [],
        hook: 'Some nuclei are unstable. Sooner or later, they throw something out.',
        scenes: [
          { say: idea('An <b>unstable</b> nucleus becomes more stable by spitting out radiation: <b>alpha</b> (2 protons + 2 neutrons), <b>beta</b> (a fast electron) or <b>gamma</b> (a burst of EM energy). It happens <b>randomly</b> and <b>spontaneously</b>: nothing triggers it.') },
          { say: 'Put a barrier in front of each radiation.', anim: X([{ k: 'b', label: 'Barrier', min: 0, max: 3, v: 0, fmt: i => ['none', 'paper', 'aluminium (few mm)', 'thick lead'][i] }], v => `<p class="center bigq">α ${v.b >= 1 ? '🛑' : '➡️'} &nbsp; β ${v.b >= 2 ? '🛑' : '➡️'} &nbsp; γ ${v.b >= 3 ? '↘️ much reduced' : '➡️'}</p><p class="center small muted">More ionising = stopped more easily. α is the most ionising, γ the least.</p>`) },
          { say: 'Decay equations: the top numbers and the bottom numbers must balance.', pic: `<p class="center bigq">${nuc(238, 92, 'U')} → ${nuc(234, 90, 'Th')} + ${nuc(4, 2, 'α')}</p><p class="center bigq">${nuc(14, 6, 'C')} → ${nuc(14, 7, 'N')} + ${nuc(0, '−1', 'β')}</p>`,
            ask: T('In β-decay, the proton number…', ['goes up by 1', 'goes down by 2', 'stays the same', 'goes down by 1'], 0, 'A neutron becomes a proton (and the electron is emitted). A stays the same.') },
          { say: 'We are always surrounded by a low level of <b>background radiation</b>: radon gas, rocks and buildings, food and drink, cosmic rays. Measure it with a Geiger counter and <b>subtract</b> it to get the count from a source.' }
        ],
        keys: ['α: ⁴₂He, most ionising, stopped by paper. β: fast electron, stopped by aluminium. γ: EM wave, reduced by thick lead.', 'α decay: A − 4, Z − 2. β decay: A same, Z + 1.', 'Decay is random and spontaneous.', 'Corrected count = measured − background.'],
        gens: ['phDecay', 'phCount', 'phRadiation'], easy: ['phRadiation'] },
      { id: 'ph-halflife', title: 'Half-life and uses of radioactivity', obj: ['5.2.5'], kw: 'half-life carbon dating uses of radioactivity', learn: [],
        hook: 'You can\'t predict one atom, but you can predict millions of them very precisely.',
        scenes: [
          { say: idea('Each nucleus decays at random, but in a huge sample, <b>half</b> of the nuclei always decay in the same amount of time: the <b>half-life</b>. After one half-life, half is left; after two, a quarter; after three, an eighth.') },
          { say: 'Watch a sample of 1000 nuclei with a half-life of 2 days.', anim: X([{ k: 't', label: 'Time (days)', min: 0, max: 10, v: 2 }], v => `${K.plot([{ f: x => 1000 * Math.pow(.5, x / 2) }], [{ x: v.t, y: 1000 * Math.pow(.5, v.t / 2), label: n(r(1000 * Math.pow(.5, v.t / 2), 0)) }], { xmin: 0, xmax: 10, ymin: 0, ymax: 1100, h: 200, gstep: 1e9, lstep: 1e9, xlab: 'days', ylab: 'nuclei left' })}<p class="center bigq">${n(r(v.t / 2, 1))} half-lives → ${n(r(1000 * Math.pow(.5, v.t / 2), 0))} left</p>`) },
          { say: 'Count the halvings:', pic: '<p class="center bigq">800 → 400 → 200 → 100</p><p class="center">3 halvings = 3 half-lives</p>',
            ask: T('Half-life 5 years. What fraction is left after 15 years?', ['⅛', '⅓', '¼', '½'], 0, '15 ÷ 5 = 3 half-lives: ½ × ½ × ½ = ⅛.') },
          { say: 'Choosing an isotope for a job depends on <b>which radiation</b> (how penetrating) and <b>how long the half-life</b> is.', pic: '<ul><li>🔥 Smoke alarm: α, long half-life</li><li>📄 Thickness gauge: β (paper) or γ (metal)</li><li>🏥 Tracers and cancer treatment: γ, short half-life</li><li>🦠 Sterilising and irradiating food: γ</li><li>🦴 Dating old objects: carbon-14</li></ul>' }
        ],
        keys: ['Half-life: time for half the nuclei (or the count rate) to fall to half.', 'n half-lives → (½)ⁿ left.', 'Use = right radiation (penetration) + right half-life.'],
        gens: ['phHalf', 'phNuclearUse'], easy: ['phNuclearUse'] },
      { id: 'ph-fission', title: 'Fission, fusion and safety', obj: ['5.2.4', '5.2.6'], kw: 'fission fusion chain reaction reactor radiation safety', learn: [],
        hook: 'Splitting atoms runs power stations; joining them runs the Sun.',
        scenes: [
          { say: idea('<b>Fission</b>: a big nucleus (U-235) absorbs a neutron, <b>splits</b> into two smaller ones, releases energy and <b>2 or 3 more neutrons</b>, which can split more nuclei: a chain reaction. <b>Fusion</b>: two small nuclei <b>join</b>, releasing energy. Fusion powers the stars.') },
          { say: 'Lower or raise the control rods. They absorb neutrons.', anim: X([{ k: 'c', label: 'Neutrons absorbed by control rods (%)', min: 0, max: 80, step: 5, v: 60 }], v => { const k = 2.5 * (1 - v.c / 100); return `<p class="center bigq">each fission causes ${n(r(k, 2))} more</p><p class="center">${k > 1.05 ? '⚠️ Growing chain reaction: too fast!' : k < 0.95 ? '📉 Dying out: the reactor shuts down.' : '✅ Steady: exactly one more fission each time.'}</p>`; }) },
          { say: 'In a reactor: <b>control rods</b> absorb neutrons, the <b>moderator</b> slows neutrons so they cause fission, and the <b>coolant</b> carries the heat to boil water for the turbines.',
            ask: T('Why do the control rods go deeper into the reactor if it gets too hot?', ['They absorb more neutrons, slowing the chain reaction', 'They add more fuel', 'They speed up the neutrons'], 0, 'Fewer neutrons → fewer fissions.') },
          { say: 'Ionising radiation can kill cells or cause mutations and cancer. To stay safe: <b>less time</b> near the source, <b>more distance</b> (use tongs), and <b>shielding</b> (lead-lined boxes).' }
        ],
        keys: ['Fission: U-235 + neutron → 2 daughter nuclei + 2–3 neutrons + energy; chain reaction.', 'Reactor: control rods absorb neutrons; moderator slows them; coolant removes heat.', 'Fusion: small nuclei join; powers stars.', 'Safety: time, distance, shielding.'],
        gens: ['phNuclearUse', 'phRadiation'], easy: ['phNuclearUse'] }
    ] });

  R2O.addModule({ subject: 'physics', id: 'ph-space', name: 'Space physics', icon: '🪐', color: '#1d4ed8', book: ['Astronomy 2e', 'https://openstax.org/details/books/astronomy-2e'],
    blurb: 'Syllabus section 6: the Earth, the Solar System, the Sun, the life of stars and the expanding Universe.',
    lessons: [
      { id: 'ph-solar', title: 'The Earth and the Solar System', obj: ['6.1.1', '6.1.2'], kw: 'solar system planets orbits earth moon', learn: [],
        hook: 'Our address: third planet from a medium-sized star.',
        scenes: [
          { say: idea('<b>Gravity</b> holds the Solar System together. The Sun has almost all the mass, so everything orbits it. The <b>further</b> a planet is from the Sun, the <b>weaker</b> the Sun\'s pull, so the <b>slower</b> it orbits and the longer its year.') },
          { say: 'Move a planet further from the Sun.', anim: X([{ k: 'd', label: 'Distance from Sun (Earth = 1)', min: 0.4, max: 30, step: 0.2, v: 1 }], v => `<p class="center bigq">☀️ ${'·'.repeat(Math.min(30, Math.round(v.d)))}🪐</p><p class="center">orbital speed ≈ <b>${n(r(30 / Math.sqrt(v.d), 1))} km/s</b> · one orbit ≈ <b>${n(r(Math.pow(v.d, 1.5), 1))} Earth years</b></p><p class="center small muted">Further out: weaker gravity, slower, much longer year.</p>`) },
          { say: 'The planets in order: <b>Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</b> ("My Very Easy Method Just Speeds Up Naming"). Plus dwarf planets (like Pluto), asteroids, comets and moons.',
            ask: T('Day and night happen because…', ['the Earth spins on its axis once every 24 hours', 'the Earth orbits the Sun', 'the Moon blocks the Sun'], 0, 'The tilt of the axis gives the seasons; the orbit (≈ 365 days) gives the year.') },
          { say: 'Average orbital speed:', pic: eq('v = 2πr ÷ T', 'distance round the orbit ÷ time for one orbit'),
            ask: T('Light from the Sun reaches Earth in about…', ['500 s (8 minutes)', '1 s', '1 day', '1 year'], 0, 'The Moon orbits Earth in about a month.') }
        ],
        keys: ['Earth: orbits Sun ≈ 365 days (nearly circular ellipse); spins on tilted axis ≈ 24 h. Moon orbits ≈ 1 month.', 'v = 2πr ÷ T.', 'Further from the Sun → weaker field → slower orbit.', 'g at a planet\'s surface depends on its mass; it falls with distance.'],
        gens: ['phOrbit', 'phLightTime', 'phSpace'], easy: ['phSpace'] },
      { id: 'ph-stars', title: 'Stars and the Universe', obj: ['6.2.1', '6.2.2', '6.2.3'], kw: 'stars life cycle galaxies redshift big bang', learn: [],
        hook: 'Every atom of iron in your blood was made inside a star that exploded.',
        scenes: [
          { say: idea('A star is a battle between <b>gravity pulling in</b> and <b>heat from fusion pushing out</b>. While they balance, the star is stable. When the hydrogen fuel runs out, the balance breaks, and <b>how massive</b> the star is decides how it dies.') },
          { say: 'Pick a star\'s mass and follow its life.', anim: X([{ k: 'm', label: 'Star mass', min: 0, max: 1, v: 0, fmt: i => ['like the Sun', 'much more massive'][i] }], v => `<p class="center bigq">☁️ → 🔥 → ⭐ → ${v.m ? '🔴 red supergiant → 💥 supernova → ⚫ neutron star or black hole' : '🔴 red giant → 🌫️ planetary nebula + ⚪ white dwarf'}</p><p class="center small muted">cloud of gas and dust → protostar (collapsing, heating) → stable star (hydrogen fusion)</p><p class="center small">${v.m ? 'The supernova scatters hydrogen and new heavier elements. That nebula can form new stars and planets.' : 'The outer layers drift away; the hot core remains as a white dwarf.'}</p>`) },
          { say: 'Galaxies are made of billions of stars. Our Sun is one star in the <b>Milky Way</b>, which is about 100 000 <b>light-years</b> across. (A light-year is the <b>distance</b> light travels in a year.) The Universe contains billions of galaxies.',
            ask: T('A light-year measures…', ['distance', 'time', 'speed', 'brightness'], 0, 'It is the distance light travels in one year.') },
          { say: 'Light from distant galaxies is <b>redshifted</b>: stretched to longer wavelengths because they are moving away. The further away, the faster they recede. Everything moving apart means the Universe started from one point: the <b>Big Bang</b>.' }
        ],
        keys: ['Sun: medium star, mostly H and He; emits mostly IR, visible and UV; powered by fusion of H → He.', 'Stable star: gravity in = thermal pressure out.', 'Sun-like: red giant → planetary nebula + white dwarf. Massive: red supergiant → supernova → neutron star/black hole.', 'Redshift increases with distance → Universe expanding → Big Bang.'],
        gens: ['phStars'], easy: ['phStars'] }
    ] });
})();
