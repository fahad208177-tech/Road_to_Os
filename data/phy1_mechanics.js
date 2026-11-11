// Physics 5054, part 1: Motion, forces and energy (syllabus section 1).
// Every lesson: big idea → picture → "try any numbers" → the equation → practice.
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);

  R2O.addSubject({
    id: 'physics', name: 'Physics', short: 'Physics', icon: '⚛️', color: '#7c3aed',
    blurb: 'How the world moves, heats up, shines and powers things.',
    syl: {
      code: '5054', name: 'Cambridge O Level Physics', years: '2026, 2027 and 2028',
      url: 'https://www.cambridgeinternational.org/Images/697324-2026-2028-syllabus.pdf',
      areas: ['Motion, forces and energy', 'Thermal physics', 'Waves', 'Electricity and magnetism', 'Nuclear physics', 'Space physics'],
      papers: ['Paper 1 Multiple Choice: 1 hour, 40 marks, 30%. 40 four-option questions.', 'Paper 2 Theory: 1 hour 45 minutes, 80 marks, 50%. Short-answer and structured questions.',
        'Paper 3 Practical Test (1 hour 30 minutes) OR Paper 4 Alternative to Practical (1 hour): 40 marks, 20%. Based on the experimental skills.'],
      suggest: ['Is specific latent heat on my exam?', 'Do I need to know Ohm\'s law?', 'Explain half-life', 'Quiz me on moments', 'Is there a formula sheet?', 'Is the Hubble constant examinable?', 'What should I revise first?'],
      formulaNote: '<p><span class="verdict maybe">🧠 You need to learn them</span></p><p>There is <b>no formula sheet</b> in 5054. Every equation in the syllabus says <i>"recall and use"</i>, so you must know them, for example speed = distance ÷ time, F = ma, W = mg, ρ = m ÷ V, p = F ÷ A, Ek = ½mv², ΔEp = mgΔh, V = IR, P = IV, v = fλ and Vp ÷ Vs = Np ÷ Ns.</p><p class="muted small">Ask me about one topic (e.g. "is pressure examinable?") to see its exact equations from the syllabus.</p>',
      offSyllabus: [
        { k: /specific latent heat|latent heat of (fusion|vaporisation)|\bmL\b|l ?= ?e ?\/ ?m/, why: 'Specific latent heat calculations are not in 5054. You only describe latent heat in terms of particles (2.2.3).', obj: '2.2.3' },
        { k: /hubble|h0|h₀/, why: 'The Hubble constant is not in 5054. Redshift is described qualitatively as evidence for the Big Bang (6.2.3).', obj: '6.2.3' },
        { k: /capacitor/, why: 'Capacitors are not in 5054.' },
        { k: /projectile/, why: 'Projectile motion is not in 5054.' },
        { k: /suvat|equations? of motion|v ?\^?2 ?= ?u|s ?= ?ut/, why: 'The "suvat" equations of motion are not in 5054. Use the gradient and area of speed–time graphs instead (1.2).', obj: '1.2' },
        { k: /photoelectric|photon/, why: 'The photoelectric effect and photons are not in 5054.' },
        { k: /relativity|e ?= ?mc/, why: 'Relativity (and E = mc²) is not in 5054.' },
        { k: /doppler/, why: 'The Doppler effect is not named in 5054. Redshift of light from galaxies is (6.2.3).', obj: '6.2.3' },
        { k: /logic gate|transistor/, why: 'Logic gates and transistors are not in O Level Physics 5054.' }
      ]
    },
    links: (kw, l) => [
      ['Khan Academy: physics videos and practice', `https://www.khanacademy.org/search?page_search_query=${kw}`],
      ['PhET: free interactive physics simulations', `https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html`],
      ['BBC Bitesize: GCSE Physics revision', `https://www.bbc.co.uk/bitesize/search?q=${kw}`]
    ]
  });
  const BOOK = ['College Physics 2e', 'https://openstax.org/details/books/college-physics-2e'];

  // ================= generators =================
  G.phAvg = () => { const N = pick([20, 50, 100, 200]), each = pick([0.08, 0.1, 0.12, 0.05, 0.25]), T = r(N * each, 3);
    return num(`<p>A stack of ${N} identical sheets of paper is ${n(T)} cm thick. How thick is one sheet?</p>`, each, 'cm', [`One sheet = total ÷ number = ${n(T)} ÷ ${N} = <b>${n(each)} cm</b>`, 'Measuring many and dividing gives a much more precise value than measuring one.'], 'Divide the total by the number of sheets.'); };
  G.phPeriod = () => { const N = pick([10, 20]), T = pick([1.2, 1.5, 0.8, 2.0, 1.6]);
    return num(`<p>A pendulum takes ${n(r(N * T, 2))} s to complete ${N} swings. What is the time for one swing?</p>`, T, 's', [`${n(r(N * T, 2))} ÷ ${N} = <b>${n(T)} s</b>`], 'Divide by the number of swings.'); };
  G.phResultant = () => { const t = pick([[3, 4], [6, 8], [5, 12], [8, 15], [9, 12], [7, 24]]), k = pick([1, 2, 10]); const a = t[0] * k, b = t[1] * k, c = Math.hypot(a, b);
    return num(`<p>Two forces of ${a} N (east) and ${b} N (north) act on a point. What is the size of the resultant force?</p>`, c, 'N', [`They are at right angles, so use Pythagoras: √(${a}² + ${b}²) = <b>${n(c)} N</b>`], 'Draw them tip to tail. The resultant is the hypotenuse.'); };
  bank('phScalar', [
    { q: 'Which of these is a <b>vector</b> quantity?', a: 'Velocity', w: ['Speed', 'Mass', 'Temperature'], why: 'A vector has a size and a direction. Velocity is speed in a direction.' },
    { q: 'Which of these is a <b>scalar</b> quantity?', a: 'Energy', w: ['Force', 'Acceleration', 'Displacement'], why: 'Energy has a size but no direction.' },
    { q: 'Which list contains only vectors?', a: 'force, weight, momentum', w: ['mass, speed, time', 'distance, energy, force', 'temperature, velocity, mass'], why: 'Force, weight and momentum all have a direction.' },
    { q: 'Weight is a vector because…', a: 'it has a size and acts in a direction (down)', w: ['it is measured in newtons', 'it can be large', 'it depends on mass'], why: 'The direction is what makes it a vector.' },
    { q: 'What do you use to measure a short time interval most accurately in the lab?', a: 'A digital timer (or time many repeats and divide)', w: ['A metre rule', 'A measuring cylinder', 'A wall clock'], why: 'Timing several repeats and dividing reduces the effect of your reaction time.' },
    { q: 'You read the volume in a measuring cylinder from…', a: 'the bottom of the meniscus, at eye level', w: ['the top of the meniscus, from above', 'the side of the cylinder', 'the highest drop on the glass'], why: 'Eye level avoids parallax error.' }
  ]);
  G.phSpeed = () => { const k = pick(['v', 'd', 't']), v = pick([2, 3, 4, 5, 8, 12, 15, 20, 25]), t = pick([4, 5, 6, 8, 10, 12, 20, 30]), d = v * t;
    if (k === 'v') return num(`<p>A cyclist travels ${d} m in ${t} s. What is her average speed?</p>`, v, 'm/s', [`speed = distance ÷ time = ${d} ÷ ${t} = <b>${v} m/s</b>`], 'speed = distance ÷ time');
    if (k === 'd') return num(`<p>A car moves at a steady ${v} m/s for ${t} s. How far does it travel?</p>`, d, 'm', [`distance = speed × time = ${v} × ${t} = <b>${d} m</b>`], 'Rearrange: distance = speed × time.');
    return num(`<p>A runner covers ${d} m at a steady ${v} m/s. How long does it take?</p>`, t, 's', [`time = distance ÷ speed = ${d} ÷ ${v} = <b>${t} s</b>`], 'Rearrange: time = distance ÷ speed.'); };
  G.phAccel = () => { const u = pick([0, 0, 2, 4, 5, 10]), a = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), t = pick([2, 4, 5, 6, 8, 10]), v = u + a * t, dec = Math.random() < .25;
    if (dec) return num(`<p>A car slows from ${v} m/s to ${u} m/s in ${t} s. What is its acceleration? (A deceleration is a negative acceleration.)</p>`, -a, 'm/s²', [`a = change in velocity ÷ time = (${u} − ${v}) ÷ ${t} = <b>${n(-a)} m/s²</b>`], 'Final − initial, then ÷ time. Slowing down gives a negative answer.');
    return num(`<p>A bike speeds up from ${u} m/s to ${n(v)} m/s in ${t} s. What is its acceleration?</p>`, a, 'm/s²', [`a = (v − u) ÷ t = (${n(v)} − ${u}) ÷ ${t} = <b>${n(a)} m/s²</b>`], 'acceleration = change in velocity ÷ time taken'); };
  G.phAvgSpeed = () => { const d1 = pick([100, 200, 300, 600]), t1 = pick([20, 40, 50]), d2 = pick([200, 400, 500]), t2 = pick([30, 60, 100]), v = (d1 + d2) / (t1 + t2);
    return num(`<p>A bus travels ${d1} m in ${t1} s, then ${d2} m in ${t2} s. What is its average speed for the whole trip?</p>`, v, 'm/s', [`total distance = ${d1 + d2} m, total time = ${t1 + t2} s`, `average speed = ${d1 + d2} ÷ ${t1 + t2} = <b>${n(K.sf(v, 3))} m/s</b>`], 'Average speed = TOTAL distance ÷ TOTAL time (not the average of the two speeds).'); };
  G.phDTgrad = () => { const t = pick([4, 5, 8, 10]), v = pick([2, 3, 5, 6]), d = v * t;
    return num(`<p>The distance–time graph is a straight line from (0 s, 0 m) to (${t} s, ${d} m). What is the speed?</p>${K.plot([], [{ x: t, y: d, label: `(${t} s, ${d} m)` }], { xmin: 0, xmax: t * 1.6, ymin: 0, ymax: d * 1.25, h: 200, gstep: 1e9, lstep: 1e9, segs: [{ pts: [[0, 0], [t, d]] }], xlab: 'time (s)', ylab: 'distance (m)' })}`, v, 'm/s', [`speed = gradient = rise ÷ run = ${d} ÷ ${t} = <b>${v} m/s</b>`], 'Speed is the gradient of a distance–time graph.'); };
  G.phVTarea = () => { const v = pick([4, 6, 8, 10, 12, 20]), t1 = pick([2, 4, 5]), t2 = pick([4, 6, 10]); const d = .5 * v * t1 + v * t2;
    return num(`<p>A car accelerates steadily from rest to ${v} m/s in ${t1} s, then travels at ${v} m/s for another ${t2} s. How far does it go in total?</p>${K.plot([], [], { xmin: 0, xmax: t1 + t2 + 1, ymin: 0, ymax: v * 1.3, h: 190, gstep: 2, lstep: 100, segs: [{ pts: [[0, 0], [t1, v], [t1 + t2, v]] }], xlab: 't (s)', ylab: 'v (m/s)' })}`, d, 'm', [`Distance = area under the speed–time graph`, `triangle: ½ × ${t1} × ${v} = ${n(.5 * v * t1)} m`, `rectangle: ${t2} × ${v} = ${v * t2} m`, `total = <b>${n(d)} m</b>`], 'Distance travelled = area under a speed–time graph. Split it into a triangle and a rectangle.'); };
  bank('phGraphRead', [
    { q: 'On a distance–time graph, a <b>horizontal</b> line means the object is…', a: 'at rest', w: ['moving at constant speed', 'accelerating', 'decelerating'], why: 'Distance is not changing, so it is not moving.' },
    { q: 'On a speed–time graph, a <b>horizontal</b> line means the object is…', a: 'moving at constant speed', w: ['at rest', 'accelerating', 'turning'], why: 'Speed is not changing.' },
    { q: 'On a distance–time graph, a line that gets <b>steeper</b> means…', a: 'the object is speeding up (accelerating)', w: ['the object is slowing down', 'the object is at rest', 'the object is moving backwards'], why: 'Gradient = speed, so a steeper line means a bigger speed.' },
    { q: 'What does the <b>gradient</b> of a speed–time graph tell you?', a: 'The acceleration', w: ['The distance travelled', 'The speed', 'The time taken'], why: 'Gradient = change in speed ÷ time = acceleration.' },
    { q: 'What does the <b>area under</b> a speed–time graph tell you?', a: 'The distance travelled', w: ['The acceleration', 'The force', 'The average speed'], why: 'speed × time = distance, which is an area.' },
    { q: 'A speed–time graph is a straight line sloping <b>down</b> to zero. The object is…', a: 'decelerating at a constant rate', w: ['moving backwards', 'at rest', 'accelerating at a changing rate'], why: 'Speed falls steadily.' },
    { q: 'A speed–time graph that <b>curves</b> (gradient changing) shows…', a: 'changing acceleration', w: ['constant acceleration', 'constant speed', 'an object at rest'], why: 'The gradient is the acceleration, and it is changing.' }
  ]);
  G.phWeight = () => { const k = pick(['W', 'm', 'g']), g = pick([10, 10, 10, 1.6, 3.7, 25]), place = { 10: 'on Earth (g = 10 N/kg)', 1.6: 'on the Moon (g = 1.6 N/kg)', 3.7: 'on Mars (g = 3.7 N/kg)', 25: 'on Jupiter (g = 25 N/kg)' }[g], m = pick([2, 5, 8, 12, 20, 50, 60, 70]);
    if (k === 'W') return num(`<p>What is the weight of a ${m} kg mass ${place}?</p>`, r(m * g, 2), 'N', [`W = mg = ${m} × ${g} = <b>${n(r(m * g, 2))} N</b>`], 'weight = mass × gravitational field strength');
    if (k === 'm') return num(`<p>An object weighs ${n(r(m * g, 2))} N ${place}. What is its mass?</p>`, m, 'kg', [`m = W ÷ g = ${n(r(m * g, 2))} ÷ ${g} = <b>${m} kg</b>`], 'Rearrange W = mg to m = W ÷ g.');
    return num(`<p>A ${m} kg rock weighs ${n(r(m * g, 2))} N on a planet. What is g on that planet?</p>`, g, 'N/kg', [`g = W ÷ m = <b>${g} N/kg</b>`], 'g = weight ÷ mass'); };
  bank('phMassWeight', [
    { q: 'An astronaut goes from Earth to the Moon. What happens to her mass and weight?', a: 'Mass stays the same, weight decreases', w: ['Both decrease', 'Mass decreases, weight stays the same', 'Both stay the same'], why: 'Mass is the amount of matter. Weight depends on g, which is smaller on the Moon.' },
    { q: 'Mass is measured in…', a: 'kilograms (kg)', w: ['newtons (N)', 'N/kg', 'joules (J)'], why: 'Weight is the force, in newtons.' },
    { q: 'Which instrument measures <b>weight</b>?', a: 'A force meter (newton meter)', w: ['An electronic balance', 'A ruler', 'A thermometer'], why: 'Weight is a force.' },
    { q: 'Why is it harder to push a heavy trolley into motion than an empty one?', a: 'Its larger mass resists changes in motion (inertia)', w: ['It has more weight pushing it forward', 'It has less friction', 'Gravity pulls it backwards'], why: 'Mass resists change from rest or motion. That is inertia.' },
    { q: 'A gravitational field is a region where…', a: 'a mass experiences a force', w: ['a charge experiences a force', 'a magnet experiences a force', 'there is no air'], why: 'Field = region where a force acts.' }
  ]);
  G.phDensity = () => { const mats = [['aluminium', 2700], ['iron', 7900], ['wood', 600], ['ice', 920], ['glass', 2500], ['copper', 8900]]; const [mat, rho] = pick(mats); const V = pick([0.001, 0.002, 0.005, 0.01, 0.02]), m = r(rho * V, 3); const k = pick(['rho', 'm', 'V', 'cm']);
    if (k === 'cm') { const vc = pick([10, 20, 25, 40, 50]), mc = pick([27, 79, 50, 100, 135]); const d = mc / vc; return num(`<p>A ${mc} g pebble is dropped into a measuring cylinder. The water level rises from 50 cm³ to ${50 + vc} cm³. What is the density of the pebble?</p>`, d, 'g/cm³', [`Volume = rise in level = ${vc} cm³ (displacement)`, `ρ = m ÷ V = ${mc} ÷ ${vc} = <b>${n(r(d, 3))} g/cm³</b>`], 'The volume of an irregular solid = the volume of water it pushes up.'); }
    if (k === 'rho') return num(`<p>A block of ${mat} has a mass of ${n(m)} kg and a volume of ${n(V)} m³. What is its density?</p>`, rho, 'kg/m³', [`ρ = m ÷ V = ${n(m)} ÷ ${n(V)} = <b>${rho} kg/m³</b>`], 'density = mass ÷ volume');
    if (k === 'm') return num(`<p>${mat[0].toUpperCase() + mat.slice(1)} has a density of ${rho} kg/m³. What is the mass of ${n(V)} m³ of it?</p>`, m, 'kg', [`m = ρ × V = ${rho} × ${n(V)} = <b>${n(m)} kg</b>`], 'mass = density × volume');
    return num(`<p>A ${n(m)} kg piece of ${mat} (density ${rho} kg/m³). What is its volume?</p>`, V, 'm³', [`V = m ÷ ρ = ${n(m)} ÷ ${rho} = <b>${n(V)} m³</b>`], 'volume = mass ÷ density'); };
  bank('phDensityIdea', [
    { q: 'Why does a block of wood float on water but an iron nail sinks?', a: 'Wood is less dense than water; iron is more dense', w: ['Wood is lighter than the nail', 'Iron is magnetic', 'The nail is smaller'], why: 'Floating depends on density, not on mass. A huge log floats; a tiny nail sinks.' },
    { q: 'You cut a steel bar in half. The density of each half is…', a: 'the same as the whole bar', w: ['half the original', 'double the original', 'zero'], why: 'Density is a property of the material: mass and volume both halve.' },
    { q: 'How do you find the volume of an irregular stone?', a: 'Lower it into water and measure how much the level rises', w: ['Weigh it', 'Measure its length only', 'Heat it'], why: 'The water displaced has the same volume as the stone.' },
    { q: 'How do you find the volume of a rectangular block?', a: 'Measure length × width × height', w: ['Weigh it on a balance', 'Use a force meter', 'Time it falling'], why: 'Then density = mass ÷ volume.' }
  ]);
  // forces
  G.phFma = () => { const k = pick(['F', 'a', 'm']), m = pick([2, 4, 5, 10, 20, 50, 800, 1000, 1200]), a = pick([0.5, 1, 2, 3, 4, 5]), F = m * a;
    if (k === 'F') return num(`<p>What resultant force gives a ${m} kg mass an acceleration of ${n(a)} m/s²?</p>`, F, 'N', [`F = ma = ${m} × ${n(a)} = <b>${n(F)} N</b>`], 'resultant force = mass × acceleration');
    if (k === 'a') return num(`<p>A resultant force of ${n(F)} N acts on a ${m} kg object. What is its acceleration?</p>`, a, 'm/s²', [`a = F ÷ m = ${n(F)} ÷ ${m} = <b>${n(a)} m/s²</b>`], 'a = F ÷ m');
    return num(`<p>A resultant force of ${n(F)} N gives an object an acceleration of ${n(a)} m/s². What is its mass?</p>`, m, 'kg', [`m = F ÷ a = <b>${m} kg</b>`], 'm = F ÷ a'); };
  G.phResLine = () => { const fw = pick([200, 300, 500, 800, 1200]), dr = pick([50, 100, 150, 200, 300]), m = pick([50, 100, 200, 500]); const F = fw - dr, a = F / m;
    return num(`<p>A ${m} kg cart has a forward force of ${fw} N and friction of ${dr} N. What is its acceleration?</p>${S.forces([{ d: 'right', m: fw / 20, l: fw + ' N' }, { d: 'left', m: dr / 20, l: dr + ' N' }], { ground: true })}`, a, 'm/s²', [`resultant = ${fw} − ${dr} = ${F} N (forward)`, `a = F ÷ m = ${F} ÷ ${m} = <b>${n(r(a, 3))} m/s²</b>`], 'Find the resultant first (forces in opposite directions subtract), then a = F ÷ m.'); };
  bank('phNewton', [
    { q: 'A book rests on a table. By Newton\'s third law, the book pulls the Earth up with a force equal to…', a: 'the book\'s weight', w: ['zero', 'the table\'s push on the book', 'twice its weight'], why: 'Third-law pairs are the same type of force (here gravity), equal and opposite, acting on different objects.' },
    { q: 'A car moves at constant velocity. The resultant force on it is…', a: 'zero', w: ['forwards', 'backwards', 'equal to its weight'], why: 'Newton\'s first law: no resultant force means no change in velocity.' },
    { q: 'A ball moving in a circle at constant speed. Is there a resultant force?', a: 'Yes, because its direction is changing', w: ['No, its speed is constant', 'Only if it speeds up', 'Only at the top'], why: 'A change of direction is a change of velocity, so a force is needed.' },
    { q: 'When you push on a wall, the wall…', a: 'pushes back on you with an equal force', w: ['does not push at all', 'pushes back with a smaller force', 'pulls you towards it'], why: 'Newton\'s third law.' },
    { q: 'Which force acts on a rocket engine pushing it forwards?', a: 'Thrust', w: ['Tension', 'Drag', 'Weight'], why: 'Thrust is the driving force.' },
    { q: 'A parachutist falls at a steady speed. Compare air resistance and weight.', a: 'They are equal', w: ['Air resistance is bigger', 'Weight is bigger', 'There is no air resistance'], why: 'Steady speed means balanced forces.' }
  ]);
  G.phStopping = () => { const v = pick([10, 15, 20, 25, 30]), rt = pick([0.5, 0.6, 0.7, 0.8, 1.0]), brake = pick([15, 20, 25, 30, 45, 60]); const think = v * rt;
    return num(`<p>A driver travelling at ${v} m/s has a reaction time of ${rt} s. The braking distance is ${brake} m. What is the total stopping distance?</p>`, think + brake, 'm', [`thinking distance = speed × reaction time = ${v} × ${rt} = ${n(think)} m`, `stopping distance = thinking + braking = ${n(think)} + ${brake} = <b>${n(think + brake)} m</b>`], 'Stopping distance = thinking distance + braking distance.'); };
  bank('phFriction', [
    { q: 'Which factor increases <b>thinking</b> distance?', a: 'The driver being tired', w: ['Worn tyres', 'An icy road', 'A heavy load'], why: 'Thinking distance depends on reaction time (tiredness, alcohol, drugs) and speed.' },
    { q: 'Which factor increases <b>braking</b> distance?', a: 'A wet road', w: ['The driver drinking alcohol', 'The driver being distracted', 'The driver being tired'], why: 'Braking distance depends on speed, the road, tyres, brakes and load.' },
    { q: 'A skydiver jumps. Why does she stop accelerating and reach terminal velocity?', a: 'Air resistance grows with speed until it equals her weight', w: ['Her weight decreases as she falls', 'Gravity switches off high up', 'Her mass increases'], why: 'Equal forces → resultant zero → constant speed.' },
    { q: 'Friction between a sliding box and the floor causes…', a: 'the box to slow down and the surfaces to heat up', w: ['the box to speed up', 'the box to get lighter', 'no energy change'], why: 'Friction opposes motion and transfers energy to the thermal store.' },
    { q: 'Doubling a car\'s speed makes the braking distance…', a: 'more than double', w: ['exactly double', 'the same', 'half'], why: 'The car has much more kinetic energy to remove (Ek depends on v²).' }
  ]);
  G.phSpring = () => { const k = pick([20, 25, 40, 50, 80, 100, 200]), x = pick([0.02, 0.04, 0.05, 0.1, 0.15, 0.2]), F = r(k * x, 3), q = pick(['k', 'F', 'x']);
    if (q === 'k') return num(`<p>A load of ${n(F)} N stretches a spring by ${n(x)} m. What is the spring constant?</p>`, k, 'N/m', [`k = F ÷ x = ${n(F)} ÷ ${n(x)} = <b>${k} N/m</b>`], 'spring constant = force ÷ extension');
    if (q === 'F') return num(`<p>A spring with k = ${k} N/m is stretched by ${n(x)} m. What force is needed?</p>`, F, 'N', [`F = kx = ${k} × ${n(x)} = <b>${n(F)} N</b>`], 'F = kx');
    return num(`<p>A spring with k = ${k} N/m has a ${n(F)} N load. What is its extension?</p>`, x, 'm', [`x = F ÷ k = ${n(F)} ÷ ${k} = <b>${n(x)} m</b>`], 'x = F ÷ k'); };
  G.phSpringLen = () => { const L0 = pick([10, 12, 15, 20]), per = pick([1, 2, 0.5]), W = pick([2, 3, 4, 6]); const L = L0 + per * W;
    return num(`<p>A spring is ${L0} cm long. Each 1 N load stretches it by ${n(per)} cm (within the limit of proportionality). How long is it with a ${W} N load?</p>`, L, 'cm', [`extension = ${n(per)} × ${W} = ${n(per * W)} cm`, `new length = original + extension = ${L0} + ${n(per * W)} = <b>${n(L)} cm</b>`], 'Extension is the INCREASE in length. Add it to the original length.'); };
  G.phMoment = () => { const q = pick(['M', 'F', 'd']), F1 = pick([10, 20, 30, 40, 50, 60]), d1 = pick([0.5, 1, 1.5, 2]), d2 = pick([0.5, 1, 2, 2.5, 3]); const F2 = r(F1 * d1 / d2, 3);
    if (q === 'M') return num(`<p>A ${F1} N force acts ${n(d1)} m from a pivot, at right angles. What is its moment?</p>`, F1 * d1, 'N m', [`moment = force × perpendicular distance = ${F1} × ${n(d1)} = <b>${n(F1 * d1)} N m</b>`], 'moment = F × perpendicular distance from the pivot');
    if (q === 'F' && Number.isInteger(F2 * 10)) return num(`<p>A see-saw balances. On one side a ${F1} N child sits ${n(d1)} m from the pivot. What force acts ${n(d2)} m from the pivot on the other side?</p>${S.beam({ F: F1, d: d1 }, { F: 20, d: d2, l: '?' })}`, F2, 'N', [`Balanced: clockwise moment = anticlockwise moment`, `${F1} × ${n(d1)} = F × ${n(d2)}`, `F = ${n(F1 * d1)} ÷ ${n(d2)} = <b>${n(F2)} N</b>`], 'Principle of moments: total clockwise = total anticlockwise.');
    const F2b = pick([20, 25, 40, 50, 80, 100]), dd = r(F1 * d1 / F2b, 3);
    return num(`<p>A ${F1} N weight sits ${n(d1)} m left of a pivot. How far right of the pivot must a ${F2b} N weight sit to balance it?</p>${S.beam({ F: F1, d: d1 }, { F: F2b, d: Math.min(2, dd), dl: '? m' })}`, dd, 'm', [`${F1} × ${n(d1)} = ${F2b} × d`, `d = ${n(F1 * d1)} ÷ ${F2b} = <b>${n(dd)} m</b>`], 'Principle of moments.'); };
  bank('phTurning', [
    { q: 'Why is a door handle placed far from the hinge?', a: 'A bigger distance gives a bigger moment for the same force', w: ['It looks nicer', 'It makes the door lighter', 'It reduces friction in the hinge'], why: 'moment = force × distance.' },
    { q: 'An object is in equilibrium when…', a: 'there is no resultant force and no resultant moment', w: ['it is moving fast', 'only the forces balance', 'its centre of gravity is high'], why: 'Both forces and moments must balance.' },
    { q: 'A bus with a <b>low</b> centre of gravity is…', a: 'more stable: it must tilt further before toppling', w: ['less stable', 'heavier', 'faster'], why: 'It topples only when its centre of gravity moves outside its base.' },
    { q: 'How do you find the centre of gravity of a flat card?', a: 'Hang it from two points with a plumb line; it is where the lines cross', w: ['Weigh it twice', 'Cut it in half', 'Measure its thickness'], why: 'The centre of gravity always hangs directly below the pivot.' },
    { q: 'A wide base makes an object…', a: 'more stable', w: ['less stable', 'heavier', 'less dense'], why: 'The centre of gravity stays over the base for bigger tilts.' },
    { q: 'An object moving in a circle at constant speed. If the force towards the centre increases (same mass and radius), its speed…', a: 'increases', w: ['decreases', 'stays the same', 'becomes zero'], why: 'From the syllabus: speed increases if force increases, with mass and radius constant.' },
    { q: 'For the same speed and radius, a bigger mass moving in a circle needs…', a: 'a bigger force towards the centre', w: ['a smaller force', 'no force', 'the same force'], why: 'An increased mass requires an increased force to keep speed and radius constant.' },
    { q: 'If the force on an object in circular motion increases (same mass and speed), the radius…', a: 'decreases', w: ['increases', 'stays the same', 'doubles'], why: 'A stronger pull bends the path more tightly.' }
  ]);
  G.phMomentum = () => { const q = pick(['p', 'coll', 'F', 'imp']), m = pick([0.5, 2, 4, 5, 60, 1000]), v = pick([2, 3, 4, 5, 10, 20]);
    if (q === 'p') return num(`<p>What is the momentum of a ${n(m)} kg object moving at ${v} m/s?</p>`, m * v, 'kg m/s', [`p = mv = ${n(m)} × ${v} = <b>${n(m * v)} kg m/s</b>`], 'momentum = mass × velocity');
    if (q === 'coll') { const m1 = pick([1, 2, 3, 4]), m2 = pick([1, 2, 4, 6]), u = pick([3, 4, 6, 8, 12]); const vf = m1 * u / (m1 + m2);
      return num(`<p>A ${m1} kg trolley moving at ${u} m/s hits a stationary ${m2} kg trolley. They stick together. What is their speed after the collision?</p>`, vf, 'm/s', [`momentum before = ${m1} × ${u} + ${m2} × 0 = ${m1 * u} kg m/s`, `momentum after = (${m1} + ${m2}) × v`, `v = ${m1 * u} ÷ ${m1 + m2} = <b>${n(K.sf(vf, 3))} m/s</b>`], 'Total momentum before = total momentum after.'); }
    if (q === 'F') { const t = pick([0.1, 0.2, 0.5, 2, 4]); const F = m * v / t;
      return num(`<p>A ${n(m)} kg object speeds up from rest to ${v} m/s in ${n(t)} s. What resultant force acted?</p>`, F, 'N', [`change in momentum = ${n(m)} × ${v} = ${n(m * v)} kg m/s`, `F = Δp ÷ Δt = ${n(m * v)} ÷ ${n(t)} = <b>${n(K.sf(F, 3))} N</b>`], 'Resultant force = change in momentum ÷ time.'); }
    const F = pick([50, 100, 200, 400]), t = pick([0.01, 0.02, 0.05, 0.1]);
    return num(`<p>A bat hits a ball with an average force of ${F} N for ${n(t)} s. What impulse does it give the ball?</p>`, r(F * t, 4), 'N s', [`impulse = FΔt = ${F} × ${n(t)} = <b>${n(r(F * t, 4))} N s</b>`, 'This equals the ball\'s change in momentum.'], 'impulse = force × time'); };
  bank('phMomIdea', [
    { q: 'Why do airbags reduce injury in a crash?', a: 'They make the stopping time longer, so the force is smaller', w: ['They reduce the change in momentum to zero', 'They make the car lighter', 'They increase the person\'s momentum'], why: 'F = Δp ÷ Δt. Same Δp, longer Δt → smaller F.' },
    { q: 'A gun recoils when fired because…', a: 'total momentum stays zero, so the gun moves backward as the bullet moves forward', w: ['the bullet pulls the gun', 'gravity pushes the gun', 'the air pushes the gun'], why: 'Conservation of momentum.' },
    { q: 'Momentum is a vector, so…', a: 'its direction matters: opposite directions have opposite signs', w: ['it has no direction', 'it is always positive', 'it is measured in joules'], why: 'Choose one direction as positive.' }
  ]);
  // energy, work, power, pressure
  G.phKE = () => { const q = pick(['E', 'E', 'v']), m = pick([0.5, 2, 4, 10, 50, 60, 800, 1000]), v = pick([2, 3, 4, 5, 10, 20]); const E = .5 * m * v * v;
    if (q === 'E') return num(`<p>What is the kinetic energy of a ${n(m)} kg object moving at ${v} m/s?</p>`, E, 'J', [`Ek = ½mv² = ½ × ${n(m)} × ${v}² = <b>${n(E)} J</b>`], 'Ek = ½ × mass × speed². Square the speed first.');
    return num(`<p>A ${n(m)} kg object has ${n(E)} J of kinetic energy. How fast is it moving?</p>`, v, 'm/s', [`v² = 2Ek ÷ m = 2 × ${n(E)} ÷ ${n(m)} = ${v * v}`, `v = √${v * v} = <b>${v} m/s</b>`], 'Rearrange: v = √(2Ek ÷ m).'); };
  G.phGPE = () => { const m = pick([0.5, 2, 5, 10, 50, 60]), h = pick([2, 3, 5, 10, 20, 45]); const E = m * 10 * h;
    if (Math.random() < .4) { const v = Math.sqrt(2 * 10 * h); return num(`<p>A ball is dropped from ${h} m. Ignoring air resistance, how fast is it moving just before it hits the ground? (g = 10 N/kg)</p>`, v, 'm/s', [`Energy is conserved: lost Ep = gained Ek`, `mgh = ½mv², so the mass cancels: v² = 2gh = 2 × 10 × ${h} = ${20 * h}`, `v = √${20 * h} = <b>${n(K.sf(v, 3))} m/s</b>`], 'Set mgh = ½mv². The mass cancels!'); }
    return num(`<p>A ${n(m)} kg object is lifted ${h} m. What is its gain in gravitational potential energy? (g = 10 N/kg)</p>`, E, 'J', [`ΔEp = mgΔh = ${n(m)} × 10 × ${h} = <b>${n(E)} J</b>`], 'ΔEp = mass × g × height'); };
  G.phWork = () => { const q = pick(['W', 'P', 'Pt', 'd']), F = pick([10, 20, 50, 100, 200, 500]), d = pick([2, 3, 5, 10, 20]), t = pick([2, 4, 5, 10, 20]);
    if (q === 'W') return num(`<p>A ${F} N force pushes a box ${d} m in the direction of the force. How much work is done?</p>`, F * d, 'J', [`W = Fd = ${F} × ${d} = <b>${F * d} J</b>`], 'work done = force × distance moved in the direction of the force');
    if (q === 'd') return num(`<p>${F * d} J of work is done by a ${F} N force. How far did it move the object?</p>`, d, 'm', [`d = W ÷ F = <b>${d} m</b>`], 'd = W ÷ F');
    if (q === 'P') return num(`<p>A motor does ${F * d} J of work in ${t} s. What is its power?</p>`, F * d / t, 'W', [`P = W ÷ t = ${F * d} ÷ ${t} = <b>${n(F * d / t)} W</b>`], 'power = work done ÷ time taken');
    const P = pick([60, 100, 500, 1000, 2000]); return num(`<p>A ${P} W heater runs for ${t} s. How much energy does it transfer?</p>`, P * t, 'J', [`E = P × t = ${P} × ${t} = <b>${P * t} J</b>`], 'energy = power × time'); };
  G.phEff = () => { const inp = pick([100, 200, 400, 500, 1000, 2000]), pct = pick([10, 20, 25, 40, 60, 75, 80, 90]); const out = inp * pct / 100; const q = pick(['eff', 'out']);
    if (q === 'eff') return num(`<p>A motor takes in ${inp} J of electrical energy and gives out ${n(out)} J of useful kinetic energy. What is its percentage efficiency?</p>`, pct, '%', [`efficiency = useful output ÷ total input × 100%`, `= ${n(out)} ÷ ${inp} × 100% = <b>${pct}%</b>`], 'efficiency = useful output ÷ total input × 100%');
    return num(`<p>A lamp is ${pct}% efficient. It is supplied with ${inp} J. How much useful light energy does it give out?</p>`, out, 'J', [`useful output = ${pct}% of ${inp} = <b>${n(out)} J</b>`, `The rest, ${n(inp - out)} J, is wasted, mostly as heating.`], 'Useful output = efficiency × input.'); };
  bank('phStores', [
    { q: 'A stretched catapult stores energy in which store?', a: 'Elastic (strain)', w: ['Kinetic', 'Nuclear', 'Gravitational potential'], why: 'Stretching or squashing stores elastic energy.' },
    { q: 'A battery powers a torch. The main energy transfer is…', a: 'chemical → (electrically) → light and thermal in the surroundings', w: ['nuclear → kinetic', 'kinetic → chemical', 'thermal → chemical'], why: 'The cell\'s chemical store is transferred by an electric current.' },
    { q: 'A ball rolls down a hill. Ignoring friction, its…', a: 'gravitational store decreases and kinetic store increases by the same amount', w: ['kinetic store decreases', 'total energy increases', 'energy is destroyed at the bottom'], why: 'Energy is conserved: it moves between stores.' },
    { q: 'The principle of conservation of energy says…', a: 'energy cannot be created or destroyed, only transferred', w: ['energy is always used up', 'energy always turns into heat', 'machines create energy'], why: 'Total energy stays the same.' },
    { q: 'Wasted energy in most machines ends up…', a: 'in the thermal store of the surroundings', w: ['in the chemical store', 'destroyed', 'in the nuclear store'], why: 'Friction and resistance heat things up and it spreads out.' }
  ]);
  bank('phResources', [
    { q: 'Which energy resource is <b>non-renewable</b>?', a: 'Coal', w: ['Wind', 'Solar', 'Tides'], why: 'Fossil fuels took millions of years to form and will run out.' },
    { q: 'Which resource is <b>not</b> available all the time?', a: 'Solar (only in daylight)', w: ['Nuclear fuel', 'Geothermal', 'Coal'], why: 'Solar and wind depend on the weather and time of day.' },
    { q: 'In a coal power station, the energy path is…', a: 'burn fuel → boil water → steam turns a turbine → turbine turns a generator', w: ['coal turns the generator directly', 'coal makes electricity by chemical reaction', 'steam lights the lamps'], why: 'Boiler → turbine → generator.' },
    { q: 'A disadvantage of hydroelectric power is that…', a: 'building a dam floods valleys and habitats', w: ['it produces lots of CO₂ while running', 'it runs out quickly', 'it only works at night'], why: 'The running is clean but the dam changes the environment.' },
    { q: 'Which resource uses the Sun\'s energy <b>indirectly</b> through living things?', a: 'Biofuels', w: ['Geothermal', 'Nuclear', 'Tides'], why: 'Plants store the Sun\'s energy chemically.' },
    { q: 'Which source releases energy by splitting heavy nuclei?', a: 'Nuclear fuel', w: ['Geothermal', 'Biofuel', 'Waves'], why: 'Fission of uranium.' },
    { q: 'Geothermal energy comes from…', a: 'hot rocks under the ground', w: ['the Moon\'s pull', 'burning plants', 'wind over the sea'], why: 'Water pumped down is heated and returns as steam.' }
  ]);
  G.phPressure = () => { const q = pick(['p', 'p', 'F', 'liq']), F = pick([100, 200, 500, 600, 1000, 1200]), A = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 2]);
    if (q === 'p') return num(`<p>A ${F} N box rests on an area of ${n(A)} m². What pressure does it exert?</p>`, F / A, 'Pa', [`p = F ÷ A = ${F} ÷ ${n(A)} = <b>${n(K.round(F / A, 4))} Pa</b>`], 'pressure = force ÷ area (1 Pa = 1 N/m²)');
    if (q === 'F') { const p = pick([2000, 5000, 10000, 20000]); return num(`<p>A pressure of ${n(p)} Pa acts on an area of ${n(A)} m². What force does it produce?</p>`, p * A, 'N', [`F = p × A = <b>${n(p * A)} N</b>`], 'F = p × A'); }
    const h = pick([2, 5, 10, 20, 50]), rho = pick([1000, 1000, 800, 1030]); return num(`<p>What is the change in pressure ${h} m below the surface of a liquid of density ${rho} kg/m³? (g = 10 N/kg)</p>${S.tank(Math.min(h, 10))}`, rho * 10 * h, 'Pa', [`Δp = ρgΔh = ${rho} × 10 × ${h} = <b>${n(rho * 10 * h)} Pa</b>`], 'Δp = density × g × depth'); };
  bank('phPressIdea', [
    { q: 'Why do camels have wide, flat feet?', a: 'A bigger area means less pressure, so they do not sink into sand', w: ['To run faster', 'To weigh less', 'To increase the pressure'], why: 'p = F ÷ A: same weight, bigger area, smaller pressure.' },
    { q: 'Why is a sharp knife better at cutting?', a: 'The small area gives a large pressure', w: ['It is heavier', 'It has a bigger area', 'It is colder'], why: 'Same force over a tiny area.' },
    { q: 'Why is a dam wall thicker at the bottom?', a: 'Water pressure increases with depth', w: ['Water is heavier at the top', 'To look stronger', 'Pressure is greatest at the surface'], why: 'Δp = ρgΔh.' },
    { q: 'Pressure in a liquid acts…', a: 'in all directions, at right angles to surfaces', w: ['only downwards', 'only upwards', 'only sideways'], why: 'Water squirts out of holes in all sides of a bottle.' },
    { q: 'In a mercury barometer, a taller column of mercury means…', a: 'higher atmospheric pressure', w: ['lower atmospheric pressure', 'warmer weather only', 'nothing'], why: 'The air pushes the mercury up the tube.' }
  ]);

  // ================= lessons =================
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  R2O.addModule({ subject: 'physics', id: 'ph-motion', name: 'Measuring and motion', icon: '🏃', color: '#7c3aed', book: BOOK,
    blurb: 'Syllabus 1.1–1.4: measuring, speed, acceleration, motion graphs, mass, weight and density.',
    lessons: [
      { id: 'ph-measure', title: 'Measuring, scalars and vectors', obj: ['1.1'], kw: 'measurement scalar vector', learn: [],
        hook: 'Physics starts with measuring. And some things need a direction as well as a size.',
        scenes: [
          { say: idea('Every measurement is a <b>number with a unit</b>. Some quantities only need a size (<b>scalars</b>, like 5 kg). Others also need a <b>direction</b> (<b>vectors</b>, like 5 N pushing <i>left</i>). Walking 3 km east and 4 km north does not put you 7 km from home!') },
          { say: 'To measure something tiny, like one sheet of paper, measure <b>many</b> and divide. Slide the number of sheets: the total gets easier to measure, and one sheet stays the same.', anim: X([{ k: 'N', label: 'Sheets in the stack', min: 1, max: 200, v: 10 }], v => `<div class="stack" style="height:${8 + v.N * .55}px"></div><p class="center bigq">${v.N} sheets = ${n(r(v.N * .01, 2))} cm</p><p class="center">One sheet = ${n(r(v.N * .01, 2))} ÷ ${v.N} = <b>0.01 cm</b></p><p class="center small muted">A ruler can't measure 0.01 cm, but it can measure ${n(r(v.N * .01, 2))} cm easily.</p>`) },
          { say: 'Walk 3 km east, then 4 km north. Distance walked = 7 km. But how far are you from home?', pic: S.svg(260, 200, `${S.arrow(30, 170, 150, 170, 'var(--c1)', 4)}${S.arrow(150, 170, 150, 10, 'var(--c2)', 4)}${S.arrow(30, 170, 150, 10, 'var(--c4)', 4)}${S.txt(90, 190, '3 km east')}${S.txt(200, 95, '4 km north')}${S.txt(70, 80, '? km', 'lbl acc')}`),
            ask: T('How far from home are you (in a straight line)?', ['5 km', '7 km', '1 km', '12 km'], 0, 'Right angles → Pythagoras: √(3² + 4²) = 5 km. Directions matter for vectors!') },
          { say: 'Scalars: distance, speed, time, mass, energy, temperature. Vectors: displacement, force, weight, velocity, acceleration, momentum, electric field strength, gravitational field strength.',
            ask: T('Is weight a scalar or a vector?', ['Vector (it acts downwards)', 'Scalar', 'Neither'], 0, 'Weight is a force, and forces have directions.') },
          { say: 'In the lab: rulers and tapes for length, a measuring cylinder (read the bottom of the meniscus at eye level) for volume, a stopwatch or digital timer for time. Time many swings and divide to beat your reaction time.' }
        ],
        keys: ['Scalar = size only. Vector = size + direction.', 'Measure many small things together, then divide.', 'Two vectors at right angles: resultant by Pythagoras (or a scale drawing).'],
        gens: ['phAvg', 'phPeriod', 'phResultant', 'phScalar'], easy: ['phScalar', 'phAvg'] },
      { id: 'ph-speed', title: 'Speed, velocity and acceleration', obj: ['1.2'], kw: 'speed velocity acceleration', learn: [],
        hook: 'How fast? And how fast is "how fast" changing?',
        scenes: [
          { say: idea('<b>Speed</b> is how much distance you cover <b>each second</b>. <b>Acceleration</b> is how much your speed changes <b>each second</b>. Both are "something ÷ time": a rate.') },
          { say: 'Each dot is where the car is after each second. Change its speed and watch the gaps.', anim: X([{ k: 'v', label: 'Speed (m/s)', min: 1, max: 10, v: 3 }], v => `${S.svg(320, 70, Array.from({ length: 6 }, (_, i) => `<circle cx="${10 + i * v.v * 5}" cy="35" r="8" fill="var(--c1)"/>${S.txt(10 + i * v.v * 5, 62, i + 's', 'tick')}`).join(''))}<p class="center bigq">${v.v} m every second → ${v.v} m/s</p><p class="center">In 5 s: ${v.v} × 5 = <b>${v.v * 5} m</b></p>`) },
          { say: 'Now the car <b>accelerates</b>: it gains 2 m/s every second. The gaps grow.', pic: S.svg(320, 70, [0, 1, 4, 9, 16, 25].map((d, i) => `<circle cx="${10 + d * 11}" cy="35" r="8" fill="var(--c4)"/>${S.txt(10 + d * 11, 62, i + 's', 'tick')}`).join('')),
            ask: T('A car goes from 0 to 12 m/s in 4 s. Its acceleration is…', ['3 m/s²', '48 m/s²', '12 m/s²', '16 m/s²'], 0, 'Change in velocity ÷ time = 12 ÷ 4 = 3 m/s² (it gains 3 m/s each second).') },
          { say: 'Velocity is speed <b>in a direction</b>. Slowing down is a <b>negative</b> acceleration (deceleration).', pic: eq('speed = distance ÷ time', 'average speed = total distance ÷ total time') + eq('acceleration = change in velocity ÷ time', 'a = Δv ÷ Δt, in m/s²') },
          { say: 'Near Earth, anything falling freely (no air resistance) accelerates at about <b>9.8 m/s²</b>. That is g.', ask: T('Average speed for 100 m in 20 s then 100 m in 5 s?', ['8 m/s', '12.5 m/s', '6.5 m/s', '10 m/s'], 0, 'Total distance ÷ total time = 200 ÷ 25 = 8 m/s. Never average the two speeds!') }
        ],
        keys: ['speed = distance ÷ time (m/s).', 'acceleration = change in velocity ÷ time (m/s²).', 'Deceleration = negative acceleration.', 'g ≈ 9.8 m/s² near the Earth\'s surface.'],
        gens: ['phSpeed', 'phAccel', 'phAvgSpeed'], easy: ['phSpeed'] },
      { id: 'ph-graphs', title: 'Motion graphs', obj: ['1.2'], kw: 'distance time graph speed time graph', learn: [],
        hook: 'A graph tells the whole story of a journey in one picture.',
        scenes: [
          { say: idea('On a <b>distance–time</b> graph, steepness (gradient) = <b>speed</b>. On a <b>speed–time</b> graph, gradient = <b>acceleration</b> and the <b>area underneath = distance</b>.') },
          { say: 'Change the speed. A faster object makes a steeper line.', anim: X([{ k: 'v', label: 'Speed (m/s)', min: 0, max: 5, v: 2 }], v => `${K.plot([{ f: t => v.v * t }], [], { xmin: 0, xmax: 6, ymin: 0, ymax: 30, h: 200, gstep: 2, lstep: 100, xlab: 'time', ylab: 'distance' })}<p class="center bigq">gradient = ${v.v} m/s</p><p class="center">${v.v === 0 ? 'Flat line: <b>at rest</b>.' : 'Straight line: <b>constant speed</b>.'}</p>`) },
          { say: 'On a speed–time graph, the area under the line is speed × time = <b>distance</b>.', anim: X([{ k: 't', label: 'Time (s)', min: 1, max: 10, v: 4 }], v => `${K.plot([], [], { xmin: 0, xmax: 10, ymin: 0, ymax: 8, h: 200, gstep: 2, lstep: 100, segs: [{ pts: [[0, 0], [4, 6], [10, 6]] }], xlab: 'time', ylab: 'speed' })}<p class="center">Distance in the first ${v.t} s = area = <b>${n(r(v.t <= 4 ? .5 * v.t * 1.5 * v.t : 12 + 6 * (v.t - 4), 1))} m</b></p><p class="center small muted">Triangle while accelerating (½ × base × height), rectangle at steady speed.</p>`) },
          { say: 'Shapes to recognise:', pic: '<ul><li>d–t flat → at rest · straight slope → constant speed · curving up → accelerating · curving flatter → decelerating</li><li>v–t flat → constant speed · straight slope → constant acceleration · curved → changing acceleration</li></ul>',
            ask: T('A speed–time line slopes straight up from 0 to 10 m/s in 5 s. Distance travelled?', ['25 m', '50 m', '2 m', '10 m'], 0, 'Area of triangle = ½ × 5 × 10 = 25 m.') }
        ],
        keys: ['d–t gradient = speed.', 'v–t gradient = acceleration.', 'Area under v–t = distance (split into triangles and rectangles).'],
        gens: ['phDTgrad', 'phVTarea', 'phGraphRead'], easy: ['phGraphRead'] },
      { id: 'ph-weight', title: 'Mass and weight', obj: ['1.3'], kw: 'mass weight gravitational field strength', learn: [],
        hook: 'On the Moon you would weigh less, but you would not be any smaller.',
        scenes: [
          { say: idea('<b>Mass</b> is how much stuff you are made of (kg). It never changes when you travel. <b>Weight</b> is the <b>pull of gravity</b> on that mass (newtons). Weaker gravity → less weight, same mass.') },
          { say: 'Take a 60 kg person to different worlds.', anim: X([{ k: 'p', label: 'Planet', min: 0, max: 3, v: 0, fmt: i => ['Earth', 'Moon', 'Mars', 'Jupiter'][i] }], v => { const g = [9.8, 1.6, 3.7, 25][v.p]; return `${S.forces([{ d: 'down', m: g * 3, l: 'W = ' + n(r(60 * g, 0)) + ' N' }], { icon: '🧑' })}<p class="center bigq">mass = 60 kg (always)</p><p class="center">g = ${g} N/kg → weight = 60 × ${g} = <b>${n(r(60 * g, 0))} N</b></p>`; }) },
          { say: 'Gravitational field strength g is the force on each kilogram. It is also the acceleration of free fall: the same number!', pic: eq('weight = mass × gravitational field strength', 'W = mg · g on Earth ≈ 9.8 N/kg (questions often use 10)'),
            ask: T('A 5 kg bag on Earth (g = 10 N/kg) weighs…', ['50 N', '5 N', '0.5 N', '15 N'], 0, 'W = mg = 5 × 10 = 50 N.') },
          { say: 'Mass also <b>resists change</b> in motion: that is <b>inertia</b>. A full trolley is hard to start and hard to stop.', ask: T('Which measures mass?', ['An electronic balance (or a beam balance)', 'A force meter', 'A metre rule'], 0, 'A force meter measures weight; a beam balance compares weights to find mass.') }
        ],
        keys: ['Mass (kg) = amount of matter; resists change in motion (inertia).', 'Weight (N) = gravitational force: W = mg.', 'A gravitational field is a region where a mass feels a force.'],
        gens: ['phWeight', 'phMassWeight'], easy: ['phMassWeight'] },
      { id: 'ph-density', title: 'Density', obj: ['1.4'], kw: 'density mass volume', learn: [],
        hook: 'Why does a huge ship float but a small coin sinks?',
        scenes: [
          { say: idea('<b>Density</b> is how much mass is packed into each cubic centimetre (or metre). Squash the same mass into less space → denser. Things <b>less dense than water float</b>.') },
          { say: 'Same size box, different materials. Pick one.', anim: X([{ k: 'm', label: 'Material', min: 0, max: 4, v: 1, fmt: i => ['cork', 'wood', 'ice', 'aluminium', 'iron'][i] }], v => { const d = [0.24, 0.6, 0.92, 2.7, 7.9][v.m]; const float = d < 1; return `${S.svg(260, 150, `<rect x="20" y="60" width="220" height="85" fill="color-mix(in srgb, var(--c5) 22%, transparent)"/><rect x="105" y="${float ? 60 - 40 * (1 - d) : 100}" width="50" height="40" rx="4" class="shape"/>${S.txt(130, 20, float ? 'floats' : 'sinks', 'lbl acc')}`)}<p class="center">10 cm³ of it has mass <b>${n(r(d * 10, 1))} g</b> → density <b>${d} g/cm³</b>. Water is 1 g/cm³.</p>`; }) },
          { say: 'The equation:', pic: eq('density = mass ÷ volume', 'ρ = m ÷ V · kg/m³ or g/cm³'),
            ask: T('20 cm³ of a metal has a mass of 54 g. Its density is…', ['2.7 g/cm³', '1080 g/cm³', '0.37 g/cm³', '74 g/cm³'], 0, '54 ÷ 20 = 2.7 g/cm³ (that is aluminium).') },
          { say: 'An odd-shaped stone? Drop it in a measuring cylinder. The water rises by the stone\'s volume (<b>displacement</b>). Weigh it, then divide.', pic: S.svg(260, 170, `<rect x="60" y="20" width="60" height="140" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="61" y="90" width="58" height="69" fill="color-mix(in srgb, var(--c5) 30%, transparent)"/>${S.txt(90, 84, '50 cm³', 'tick')}<rect x="160" y="20" width="60" height="140" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="161" y="72" width="58" height="87" fill="color-mix(in srgb, var(--c5) 30%, transparent)"/><circle cx="190" cy="140" r="12" fill="var(--muted)"/>${S.txt(190, 66, '65 cm³', 'tick')}${S.txt(130, 14, 'V = 15 cm³', 'lbl acc')}`) }
        ],
        keys: ['ρ = m ÷ V.', 'Regular solid: V = l × w × h. Irregular solid: displacement. Liquid: measuring cylinder + balance.', 'Less dense than the liquid → floats.'],
        gens: ['phDensity', 'phDensityIdea'], easy: ['phDensityIdea'] }
    ] });

  R2O.addModule({ subject: 'physics', id: 'ph-forces', name: 'Forces', icon: '🏋️', color: '#6d28d9', book: BOOK,
    blurb: 'Syllabus 1.5–1.6: Newton\'s laws, friction, springs, circular motion, moments, centre of gravity and momentum.',
    lessons: [
      { id: 'ph-newton', title: 'Resultant force and Newton\'s laws', obj: ['1.5.1'], kw: 'newton laws resultant force f=ma', learn: [],
        hook: 'Forces don\'t keep things moving. They change how things move.',
        scenes: [
          { say: idea('Add up all the forces to get the <b>resultant</b>. If it is <b>zero</b>, nothing about the motion changes (still at rest, or same speed in a straight line). If it is <b>not zero</b>, the object <b>accelerates</b> in that direction: F = ma.') },
          { say: 'A tug of war on a box. Change the two pulls.', anim: X([{ k: 'L', label: 'Left pull (N)', min: 0, max: 60, step: 10, v: 30 }, { k: 'R', label: 'Right pull (N)', min: 0, max: 60, step: 10, v: 50 }], v => { const F = v.R - v.L; return `${S.forces([{ d: 'left', m: v.L, l: v.L + ' N' }, { d: 'right', m: v.R, l: v.R + ' N' }], { k: 1.3, ground: true, icon: '📦' })}<p class="center bigq">resultant = ${Math.abs(F)} N ${F > 0 ? '→' : F < 0 ? '←' : ''}</p><p class="center">${F === 0 ? 'Balanced: no change in motion (Newton\'s 1st law).' : `Unbalanced: the box accelerates ${F > 0 ? 'right' : 'left'}.`}</p>`; }) },
          { say: 'How much it accelerates depends on the force and the mass.', pic: eq('resultant force = mass × acceleration', 'F = ma'),
            ask: T('The same force pushes an empty trolley and a full one. Which accelerates more?', ['The empty one', 'The full one', 'Both the same'], 0, 'Smaller mass → bigger acceleration: a = F ÷ m.') },
          { say: 'Newton\'s 3rd law: if A pushes B, B pushes A back with an <b>equal and opposite</b> force of the <b>same type</b>. The two forces act on <b>different</b> objects, so they never cancel.', pic: '<p class="center bigq">🧍➡️🧱 &nbsp; 🧍⬅️🧱</p>',
            ask: T('A swimmer pushes water backwards. What pushes the swimmer forwards?', ['The water pushing back on her', 'Her own weight', 'The air'], 0, 'Newton\'s third law pair.') },
          { say: 'Forces to know: weight, friction, drag / air resistance, tension, electrostatic, magnetic, thrust and contact force. A <b>free-body diagram</b> shows all the forces on <b>one</b> object as arrows.' }
        ],
        keys: ['Resultant = 0 → no change in velocity (1st law).', 'F = ma (resultant force).', '3rd law: equal, opposite, same type, different objects.', 'A force can change speed OR direction.'],
        gens: ['phFma', 'phResLine', 'phNewton'], easy: ['phNewton'] },
      { id: 'ph-friction', title: 'Friction, terminal velocity and stopping', obj: ['1.5.2'], kw: 'friction drag terminal velocity stopping distance', learn: [],
        hook: 'Why a skydiver stops speeding up, and why tired drivers crash.',
        scenes: [
          { say: idea('<b>Friction and drag</b> oppose motion and heat things up. Drag <b>grows with speed</b>. So a falling object speeds up until drag equals its weight, then the forces balance and it falls at a steady <b>terminal velocity</b>.') },
          { say: 'Slide the skydiver\'s speed. Air resistance grows; weight stays 700 N.', anim: X([{ k: 'v', label: 'Speed (m/s)', min: 0, max: 60, step: 5, v: 10 }], v => { const D = Math.min(700, r(700 * (v.v / 55) ** 2, 0)); return `${S.forces([{ d: 'up', m: D / 14, l: 'air ' + D + ' N' }, { d: 'down', m: 50, l: 'W 700 N' }], { icon: '🪂', k: 1 })}<p class="center">${D < 700 ? `Resultant ${700 - D} N down → still <b>accelerating</b>` : '<b>Balanced</b> → terminal velocity'}</p>`; }) },
          { say: 'Stopping a car takes two parts: the <b>thinking distance</b> (before you press the brake) and the <b>braking distance</b> (while the brakes work).', pic: S.svg(320, 70, `<rect x="10" y="25" width="120" height="20" fill="var(--c2)"/><rect x="130" y="25" width="170" height="20" fill="var(--c4)"/>${S.txt(70, 18, 'thinking', 'lbl')}${S.txt(215, 18, 'braking', 'lbl')}${S.txt(155, 64, 'stopping distance = thinking + braking', 'tick')}`),
            ask: T('Which affects only the THINKING distance?', ['Alcohol', 'Icy road', 'Worn tyres', 'Heavy load'], 0, 'Alcohol, drugs and tiredness slow your reaction time. Speed affects both parts.') }
        ],
        keys: ['Friction impedes motion and causes heating.', 'Terminal velocity: drag = weight, resultant 0.', 'Stopping = thinking + braking. Thinking: speed, tiredness, alcohol, drugs. Braking: speed, load, tyres, road.'],
        gens: ['phStopping', 'phFriction'], easy: ['phFriction'] },
      { id: 'ph-springs', title: 'Springs and stretching', obj: ['1.5.3'], kw: 'spring hooke extension spring constant', learn: [],
        hook: 'Double the load, double the stretch… up to a point.',
        scenes: [
          { say: idea('Forces can change an object\'s <b>shape</b>. For a spring, the <b>extension</b> (how much longer it gets) is <b>proportional</b> to the load: each extra newton adds the same stretch, until the <b>limit of proportionality</b>.') },
          { say: 'Hang more weight. This spring stretches 2 cm for every newton.', anim: X([{ k: 'F', label: 'Load (N)', min: 0, max: 6, v: 2 }], v => `${S.spring(v.F * 2, v.F ? v.F + ' N' : '')}<p class="center">${v.F} N → extension <b>${v.F * 2} cm</b></p>`) },
          { say: 'The stiffness is the <b>spring constant</b>: force per unit extension.', pic: eq('spring constant = force ÷ extension', 'k = F ÷ x (N/m)') + K.plot([], [], { xmin: 0, xmax: 6, ymin: 0, ymax: 6, h: 180, lstep: 100, segs: [{ pts: [[0, 0], [4, 4], [5.5, 5]] }], xlab: 'extension', ylab: 'load' }),
            ask: T('Past the limit of proportionality the graph…', ['curves: extension is no longer proportional', 'stays a straight line', 'goes back to zero'], 0, 'Beyond that point, equal steps of load no longer give equal extensions.') }
        ],
        keys: ['Extension = new length − original length.', 'k = F ÷ x.', 'Straight-line load–extension graph up to the limit of proportionality.'],
        gens: ['phSpring', 'phSpringLen'], easy: ['phSpringLen'] },
      { id: 'ph-moments', title: 'Moments, balance and stability', obj: ['1.5.5', '1.5.6', '1.5.4'], kw: 'moments turning effect centre of gravity stability circular motion', learn: [],
        hook: 'How a small child can balance a big adult on a see-saw.',
        scenes: [
          { say: idea('A force can <b>turn</b> things. The turning effect (<b>moment</b>) is bigger if the force is bigger <b>or</b> further from the pivot. Something balances when the turning effects each way are equal.') },
          { say: 'An adult (600 N) sits 1 m from the pivot. Move the child (300 N).', anim: X([{ k: 'd', label: 'Child\'s distance (m)', min: 0.5, max: 2, step: 0.5, v: 1 }], v => { const L = 600 * 1, R = 300 * v.d; return `${S.beam({ F: 600, d: 1 }, { F: 300, d: v.d }, { tilt: L > R ? -8 : L < R ? 8 : 0 })}<p class="center">Adult: 600 × 1 = <b>600 N m</b> · Child: 300 × ${v.d} = <b>${R} N m</b></p><p class="center bigq">${L === R ? '⚖️ Balanced!' : L > R ? 'Adult side goes down' : 'Child side goes down'}</p>`; }) },
          { say: 'The rule:', pic: eq('moment = force × perpendicular distance from the pivot', 'Balanced (equilibrium): total clockwise moments = total anticlockwise moments, and no resultant force'),
            ask: T('A 20 N force 0.5 m from a pivot has a moment of…', ['10 N m', '40 N m', '20.5 N m', '0.025 N m'], 0, '20 × 0.5 = 10 N m.') },
          { say: 'The <b>centre of gravity</b> is the point where all the weight seems to act. A low centre of gravity and a wide base make objects <b>stable</b>: they topple only when the centre of gravity passes outside the base.', ask: T('Racing cars are built low and wide because…', ['it makes them more stable', 'it makes them lighter', 'it increases air resistance'], 0, 'Low centre of gravity + wide base.') },
          { say: 'Turning in a <b>circle</b> needs a force towards the centre, at right angles to the motion. A bigger force → faster at the same radius, or a tighter circle at the same speed. A bigger mass needs a bigger force.' }
        ],
        keys: ['moment = F × perpendicular distance.', 'Equilibrium: clockwise = anticlockwise, and no resultant force.', 'Low centre of gravity + wide base = stable.', 'Circular motion: force towards the centre, perpendicular to the motion.'],
        gens: ['phMoment', 'phTurning'], easy: ['phTurning'] },
      { id: 'ph-momentum', title: 'Momentum and impulse', obj: ['1.6'], kw: 'momentum impulse conservation collision', learn: [],
        hook: 'Why a slow truck is harder to stop than a fast tennis ball.',
        scenes: [
          { say: idea('<b>Momentum</b> = mass × velocity: how much "oomph" a moving thing has. In a collision, the <b>total momentum before = total after</b> (it is conserved). To change momentum you need a force for some time.') },
          { say: 'A 2 kg trolley at 6 m/s hits a stationary trolley and they stick. Change the second trolley\'s mass.', anim: X([{ k: 'm', label: 'Second mass (kg)', min: 1, max: 10, v: 2 }], v => { const after = 12 / (2 + v.m); return `<p class="center bigq">🛒➡️ 🛒 &nbsp;→&nbsp; 🛒🛒➡️</p><p class="center">before: 2 × 6 + ${v.m} × 0 = <b>12 kg m/s</b></p><p class="center">after: (2 + ${v.m}) × v = 12 → v = <b>${n(r(after, 2))} m/s</b></p>`; }) },
          { say: 'Force is how fast momentum changes. Spreading the change over a longer time means a smaller force: that is how airbags, crumple zones and bending your knees work.', pic: eq('p = mv', 'momentum, kg m/s') + eq('impulse = FΔt = Δ(mv)', 'resultant force = change in momentum ÷ time'),
            ask: T('Why do you bend your knees when you land from a jump?', ['To make the stopping time longer, so the force is smaller', 'To lose momentum faster', 'To increase your momentum'], 0, 'Same change in momentum, longer time → smaller force.') }
        ],
        keys: ['p = mv (vector: direction matters).', 'Total momentum is conserved in collisions and explosions.', 'impulse = FΔt = change in momentum.', 'F = Δp ÷ Δt.'],
        gens: ['phMomentum', 'phMomIdea'], easy: ['phMomIdea'] }
    ] });

  R2O.addModule({ subject: 'physics', id: 'ph-energy', name: 'Energy, work, power and pressure', icon: '⚡', color: '#5b21b6', book: BOOK,
    blurb: 'Syllabus 1.7–1.8: energy stores, conservation, work, power, efficiency, energy resources and pressure.',
    lessons: [
      { id: 'ph-stores', title: 'Energy stores and conservation', obj: ['1.7.1'], kw: 'energy stores kinetic potential conservation', learn: [],
        hook: 'Energy never disappears. It just moves to a different store.',
        scenes: [
          { say: idea('Energy is kept in <b>stores</b>: kinetic (moving), gravitational potential (high up), chemical, elastic, nuclear, electrostatic and internal (thermal). Things happen when energy <b>moves</b> between stores. The <b>total never changes</b>.') },
          { say: 'Drop a 1 kg ball from 20 m (no air resistance). Slide it down.', anim: X([{ k: 'h', label: 'Height now (m)', min: 0, max: 20, v: 20 }], v => `${S.stores([['gravitational', 10 * v.h], ['kinetic', 10 * (20 - v.h)], ['total', 200]], 200)}<p class="center">Ep = mgh = 1 × 10 × ${v.h} = ${10 * v.h} J · Ek = ${10 * (20 - v.h)} J · total stays <b>200 J</b></p>`) },
          { say: 'The two mechanical stores:', pic: eq('Ek = ½mv²', 'kinetic energy: mass × speed² ÷ 2') + eq('ΔEp = mgΔh', 'change in gravitational potential energy'),
            ask: T('Double the speed. The kinetic energy becomes…', ['4 times bigger', '2 times bigger', 'the same', 'half'], 0, 'Speed is squared: 2² = 4.') },
          { say: 'Energy is transferred by forces (mechanical work), electric currents (electrical work), heating, and waves (light, sound…).', ask: T('A kettle boils water. Energy goes from…', ['electrical work → the water\'s thermal store', 'the water → the kettle\'s chemical store', 'nowhere: it is destroyed'], 0, 'The current does electrical work and heats the water.') }
        ],
        keys: ['Stores: kinetic, gravitational potential, chemical, elastic, nuclear, electrostatic, internal.', 'Ek = ½mv². ΔEp = mgΔh.', 'Energy is conserved: it is transferred, never created or destroyed.'],
        gens: ['phKE', 'phGPE', 'phStores'], easy: ['phStores'] },
      { id: 'ph-work', title: 'Work, power and efficiency', obj: ['1.7.2', '1.7.4', '1.7.5'], kw: 'work done power efficiency', learn: [],
        hook: 'Two people climb the same stairs. Who is more powerful?',
        scenes: [
          { say: idea('<b>Work done</b> = energy transferred by a force. <b>Power</b> = how <b>quickly</b> energy is transferred. <b>Efficiency</b> = how much of the energy goes where you <b>want</b> it.') },
          { say: 'Lift a 500 N person up 4 m of stairs. Change how long it takes.', anim: X([{ k: 't', label: 'Time (s)', min: 2, max: 20, v: 8 }], v => `<p class="center">Work done = F × d = 500 × 4 = <b>2000 J</b> (always)</p><p class="center bigq">Power = 2000 ÷ ${v.t} = ${n(r(2000 / v.t, 1))} W</p><p class="center small muted">Faster → same work, more power.</p>`) },
          { say: 'The equations:', pic: eq('work done = force × distance (in the direction of the force)', 'W = Fd, joules') + eq('power = work done ÷ time = energy transferred ÷ time', 'P = W ÷ t, watts (1 W = 1 J/s)') },
          { say: 'No machine is perfect: some energy is always wasted, usually as heating.', anim: X([{ k: 'u', label: 'Useful output (J) from 100 J in', min: 0, max: 100, step: 5, v: 30 }], v => `${S.stores([['in', 100], ['useful', v.u], ['wasted', 100 - v.u]], 100)}<p class="center bigq">efficiency = ${v.u} ÷ 100 × 100% = ${v.u}%</p>`) },
          { say: 'Efficiency = useful output ÷ total input (× 100%). It works for energy or for power.', ask: T('A motor takes 500 J and gives 400 J of useful energy. Efficiency?', ['80%', '125%', '20%', '100 J'], 0, '400 ÷ 500 × 100% = 80%.') }
        ],
        keys: ['W = Fd.', 'P = W ÷ t = E ÷ t.', 'efficiency = useful output ÷ total input × 100%.'],
        gens: ['phWork', 'phEff'], easy: ['phEff'] },
      { id: 'ph-resources', title: 'Energy resources', obj: ['1.7.3'], kw: 'energy resources renewable fossil fuels', learn: [],
        hook: 'Where does the electricity in your plug actually come from?',
        scenes: [
          { say: idea('Most power stations do the same thing: <b>turn a turbine</b>, which turns a <b>generator</b>. They differ in <b>what turns the turbine</b>: steam from burning fuel or nuclear fission, or wind, water and tides directly. <b>Renewable</b> resources won\'t run out.') },
          { say: 'The chain in a thermal power station:', pic: '<p class="center bigq">🔥 fuel → 💧 boiler (steam) → 🌀 turbine → ⚙️ generator → ⚡</p>' },
          { say: 'Sort them.', pic: '<p><b>Non-renewable:</b> fossil fuels (coal, oil, gas), nuclear fuel.</p><p><b>Renewable:</b> biofuels, hydroelectric, solar, geothermal, wind, tides, waves.</p>',
            ask: T('Which is a disadvantage of wind power?', ['It is not available when the wind doesn\'t blow', 'It releases lots of CO₂', 'It will run out', 'It needs uranium'], 0, 'Compare resources by: renewable or not, when available, and environmental impact.') },
          { say: 'Solar cells make electricity directly from sunlight, with no turbine. Most other resources ultimately get their energy from the Sun (except nuclear, geothermal and tides).' }
        ],
        keys: ['Boiler → turbine → generator (for fuels and nuclear).', 'Renewable: biofuel, hydro, solar, geothermal, wind, tides, waves.', 'Compare: renewable?, available when?, environmental impact.'],
        gens: ['phResources'], easy: ['phResources'] },
      { id: 'ph-pressure', title: 'Pressure', obj: ['1.8'], kw: 'pressure force area liquid depth barometer', learn: [],
        hook: 'Why a nail goes into wood point first.',
        scenes: [
          { say: idea('<b>Pressure</b> is force <b>spread over</b> an area. The same push on a <b>smaller area</b> gives a <b>bigger pressure</b>. In liquids, pressure grows the <b>deeper</b> you go, because there is more liquid above pushing down.') },
          { say: 'Stand on the same snow with different shoes. Your weight is 600 N.', anim: X([{ k: 'A', label: 'Area touching snow (m²)', min: 0.02, max: 0.5, step: 0.02, v: 0.04 }], v => `<p class="center bigq">${v.A < 0.1 ? '👟' : '🎿'} p = 600 ÷ ${n(v.A)} = ${n(r(600 / v.A, 0))} Pa</p><p class="center">${v.A < 0.1 ? 'Small area → high pressure → you sink.' : 'Big area → low pressure → you stay on top.'}</p>`) },
          { say: 'Now go deeper in water.', anim: X([{ k: 'h', label: 'Depth (m)', min: 0, max: 10, v: 3 }], v => `${S.tank(v.h)}<p class="center">Δp = ρgh = 1000 × 10 × ${v.h} = <b>${n(10000 * v.h)} Pa</b></p>`) },
          { say: 'The equations:', pic: eq('pressure = force ÷ area', 'p = F ÷ A, in pascals (Pa = N/m²)') + eq('Δp = ρgΔh', 'change in pressure in a liquid = density × g × change in depth'),
            ask: T('Pressure at a surface pushes…', ['at right angles to the surface', 'only downwards', 'along the surface'], 0, 'That is why water squirts out sideways from holes in a bottle.') },
          { say: 'A <b>barometer</b>: the air pushes mercury up a tube. The height of the column measures atmospheric pressure.' }
        ],
        keys: ['p = F ÷ A (Pa).', 'Δp = ρgΔh: deeper and denser → more pressure.', 'Pressure acts at right angles to surfaces.'],
        gens: ['phPressure', 'phPressIdea'], easy: ['phPressIdea'] }
    ] });
})();
