// Physics 5054, part 3: Electricity and magnetism (syllabus section 4).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const BOOK = ['College Physics 2e', 'https://openstax.org/details/books/college-physics-2e'];
  const T = (q, opts, a, why) => ({ q, opts, a, why });

  // ================= generators =================
  bank('phMagnetism', [
    { q: 'Two north poles are brought together. They…', a: 'repel', w: ['attract', 'do nothing', 'stick together'], why: 'Like poles repel, unlike poles attract.' },
    { q: 'Which material is magnetic?', a: 'Iron', w: ['Copper', 'Aluminium', 'Plastic'], why: 'Iron, steel, nickel and cobalt are magnetic.' },
    { q: 'Soft iron is used in electromagnets because…', a: 'it magnetises and demagnetises easily (a temporary magnet)', w: ['it keeps its magnetism forever', 'it is not magnetic', 'it is the strongest permanent magnet'], why: 'Steel is used for permanent magnets because it keeps its magnetism.' },
    { q: 'Magnetic field lines point…', a: 'from N to S outside the magnet', w: ['from S to N outside the magnet', 'in circles round the middle', 'nowhere'], why: 'The direction is the way a north pole would be pushed.' },
    { q: 'Where is the field of a bar magnet strongest?', a: 'At the poles, where the lines are closest together', w: ['In the middle of the side', 'Far away from the magnet', 'It is the same everywhere'], why: 'Line spacing shows strength.' },
    { q: 'How can you show the shape of a magnetic field?', a: 'Sprinkle iron filings or move a plotting compass around it', w: ['Use a thermometer', 'Use an ammeter', 'Shine a torch on it'], why: 'A compass needle lines up with the field.' },
    { q: 'An unmagnetised iron nail near a magnet is attracted because…', a: 'magnetism is induced in the nail', w: ['the nail is a permanent magnet', 'iron repels magnets', 'the nail is charged'], why: 'The nail becomes a temporary magnet with the opposite pole facing the magnet.' }
  ]);
  bank('phStatic', [
    { q: 'Rubbing a balloon on hair gives the balloon a negative charge because…', a: 'electrons move from the hair to the balloon', w: ['protons move to the balloon', 'positive charge is created', 'the balloon loses electrons'], why: 'Only negative charges (electrons) move in charging by friction.' },
    { q: 'Two negatively charged balloons will…', a: 'repel each other', w: ['attract each other', 'not affect each other', 'lose their charge'], why: 'Like charges repel.' },
    { q: 'Charge is measured in…', a: 'coulombs (C)', w: ['amps (A)', 'volts (V)', 'ohms (Ω)'], why: 'Current (amps) = coulombs per second.' },
    { q: 'An electric field is a region where…', a: 'a charge experiences a force', w: ['a mass experiences a force', 'there is no air', 'current always flows'], why: 'Field lines show the direction of the force on a positive charge.' },
    { q: 'Why do metals conduct electricity?', a: 'They have free electrons that can move', w: ['They are hard', 'They are shiny', 'They have no electrons'], why: 'Insulators have no free electrons.' },
    { q: 'Between two oppositely charged parallel plates, the field lines are…', a: 'parallel and evenly spaced, from + to −', w: ['circles', 'from − to +', 'only near the edges'], why: 'A uniform field (end effects are not examined).' }
  ]);
  G.phQIt = () => { const q = pick(['Q', 'I', 't']), I = pick([0.2, 0.5, 1.5, 2, 3, 5]), t = pick([10, 20, 30, 60, 120]); const Q = r(I * t, 3);
    if (q === 'Q') return num(`<p>A current of ${n(I)} A flows for ${t} s. How much charge passes?</p>`, Q, 'C', [`Q = I × t = ${n(I)} × ${t} = <b>${n(Q)} C</b>`], 'charge = current × time');
    if (q === 'I') return num(`<p>${n(Q)} C of charge passes a point in ${t} s. What is the current?</p>`, I, 'A', [`I = Q ÷ t = ${n(Q)} ÷ ${t} = <b>${n(I)} A</b>`], 'current = charge ÷ time');
    return num(`<p>How long does it take for ${n(Q)} C to pass with a current of ${n(I)} A?</p>`, t, 's', [`t = Q ÷ I = <b>${t} s</b>`], 't = Q ÷ I'); };
  G.phVWQ = () => { const V = pick([1.5, 3, 6, 9, 12, 230]), Q = pick([2, 4, 5, 10, 20]); const W = r(V * Q, 2);
    if (Math.random() < .5) return num(`<p>A battery does ${n(W)} J of work moving ${Q} C of charge round a circuit. What is its e.m.f.?</p>`, V, 'V', [`E = W ÷ Q = ${n(W)} ÷ ${Q} = <b>${n(V)} V</b>`, '1 volt = 1 joule per coulomb.'], 'e.m.f. = work done ÷ charge');
    return num(`<p>The p.d. across a lamp is ${n(V)} V. How much energy is transferred when ${Q} C passes through it?</p>`, W, 'J', [`W = V × Q = ${n(V)} × ${Q} = <b>${n(W)} J</b>`], 'Rearrange V = W ÷ Q to W = VQ.'); };
  G.phCells = () => { const e = pick([1.5, 1.5, 2, 1.2]), k = pick([2, 3, 4, 6]); if (Math.random() < .7) return num(`<p>${k} cells, each of e.m.f. ${n(e)} V, are connected in series (all the same way round). What is the total e.m.f.?</p>`, r(k * e, 2), 'V', [`In series the e.m.f.s add: ${k} × ${n(e)} = <b>${n(r(k * e, 2))} V</b>`], 'Series: add them up.');
    return num(`<p>${k} identical ${n(e)} V cells are connected in <b>parallel</b>. What is the total e.m.f.?</p>`, e, 'V', [`Identical sources in parallel give the e.m.f. of one: <b>${n(e)} V</b>`], 'Parallel identical cells: same e.m.f. as one (they just last longer).'); };
  G.phOhm = () => { const q = pick(['V', 'I', 'R']), R = pick([2, 4, 5, 6, 10, 12, 20, 50, 100]), I = pick([0.1, 0.2, 0.5, 1, 1.5, 2, 3]); const V = r(I * R, 3);
    if (q === 'R') return num(`<p>The p.d. across a resistor is ${n(V)} V and the current is ${n(I)} A. What is its resistance?</p>`, R, 'Ω', [`R = V ÷ I = ${n(V)} ÷ ${n(I)} = <b>${R} Ω</b>`], 'resistance = p.d. ÷ current');
    if (q === 'V') return num(`<p>A current of ${n(I)} A flows through a ${R} Ω resistor. What is the p.d. across it?</p>`, V, 'V', [`V = IR = ${n(I)} × ${R} = <b>${n(V)} V</b>`], 'V = IR');
    return num(`<p>A ${n(V)} V supply is connected across a ${R} Ω resistor. What current flows?</p>`, I, 'A', [`I = V ÷ R = ${n(V)} ÷ ${R} = <b>${n(I)} A</b>`], 'I = V ÷ R'); };
  G.phWire = () => { const R = pick([2, 4, 5, 8, 10]), f = pick([2, 3, 0.5]), kind = pick(['L', 'A']);
    if (kind === 'L') return num(`<p>A wire has a resistance of ${R} Ω. What is the resistance of a wire of the same material and thickness but ${f === 0.5 ? 'half' : f + ' times'} as long?</p>`, R * f, 'Ω', [`Resistance is directly proportional to length.`, `${R} × ${n(f)} = <b>${n(R * f)} Ω</b>`], 'Longer wire → proportionally more resistance.');
    return num(`<p>A wire has a resistance of ${R} Ω. A wire of the same material and length has ${f === 0.5 ? 'half' : f + ' times'} the cross-sectional area. What is its resistance?</p>`, r(R / f, 3), 'Ω', [`Resistance is inversely proportional to cross-sectional area.`, `${R} ÷ ${n(f)} = <b>${n(r(R / f, 3))} Ω</b>`], 'Thicker wire → less resistance (more room for current).'); };
  bank('phIV', [
    { q: 'The I–V graph of a fixed resistor (constant temperature) is…', a: 'a straight line through the origin', w: ['a curve that gets flatter', 'zero for negative voltages', 'a horizontal line'], why: 'Ohm\'s law: current ∝ p.d. at constant temperature.' },
    { q: 'The I–V graph of a filament lamp curves and gets flatter because…', a: 'the filament heats up and its resistance increases', w: ['its resistance decreases', 'the current stops', 'the voltage drops'], why: 'Hotter metal → more resistance.' },
    { q: 'A diode lets current flow…', a: 'in one direction only', w: ['in both directions equally', 'only when it is cold', 'never'], why: 'Its resistance is very high in reverse.' },
    { q: 'Ohm\'s law says current is proportional to p.d. provided…', a: 'the temperature stays constant', w: ['the current is large', 'the wire is long', 'the voltage is high'], why: 'Temperature changes the resistance.' },
    { q: 'To find resistance experimentally you need…', a: 'an ammeter in series and a voltmeter in parallel across the component', w: ['two voltmeters in series', 'an ammeter in parallel', 'just a thermometer'], why: 'Then R = V ÷ I.' }
  ]);
  G.phSeries = () => { const R1 = pick([2, 3, 4, 5, 6, 10]), R2 = pick([2, 4, 6, 8, 10, 14]), V = pick([6, 12, 24]); const Rt = R1 + R2, I = V / Rt; const q = pick(['R', 'I', 'V1']);
    const pic = S.series([{ t: 'res', l: R1 + ' Ω' }, { t: 'res', l: R2 + ' Ω' }], { cellLabel: V + ' V' });
    if (q === 'R') return num(`<p>Two resistors, ${R1} Ω and ${R2} Ω, are in series. What is the total resistance?</p>${pic}`, Rt, 'Ω', [`Series: add them. ${R1} + ${R2} = <b>${Rt} Ω</b>`], 'In series, resistances add.');
    if (q === 'I') return num(`<p>A ${V} V supply is connected to ${R1} Ω and ${R2} Ω resistors in series. What current flows?</p>${pic}`, I, 'A', [`total R = ${Rt} Ω`, `I = V ÷ R = ${V} ÷ ${Rt} = <b>${n(K.sf(I, 3))} A</b>`], 'Find the total resistance first.');
    return num(`<p>A ${V} V supply is connected to ${R1} Ω and ${R2} Ω resistors in series. What is the p.d. across the ${R1} Ω resistor?</p>${pic}`, I * R1, 'V', [`I = ${V} ÷ ${Rt} = ${n(K.sf(I, 3))} A (same everywhere in series)`, `V₁ = I × R₁ = <b>${n(K.sf(I * R1, 3))} V</b>`], 'Same current through both; bigger resistor gets more of the voltage.'); };
  G.phParallel = () => { const pair = pick([[3, 6], [4, 4], [6, 12], [10, 10], [4, 12], [12, 6], [20, 5], [10, 40]]); const [R1, R2] = pair, Rp = R1 * R2 / (R1 + R2), V = pick([6, 12]); const q = pick(['R', 'R', 'I']);
    const pic = S.parallel([{ t: 'res', l: R1 + ' Ω' }], [{ t: 'res', l: R2 + ' Ω' }], { cellLabel: V + ' V' });
    if (q === 'R') return num(`<p>A ${R1} Ω and a ${R2} Ω resistor are connected in parallel. What is their combined resistance?</p>${pic}`, Rp, 'Ω', [`1/R = 1/${R1} + 1/${R2}`, `or R = (R₁ × R₂) ÷ (R₁ + R₂) = ${R1 * R2} ÷ ${R1 + R2} = <b>${n(r(Rp, 3))} Ω</b>`, 'Always LESS than the smallest one.'], 'Parallel: 1/R = 1/R₁ + 1/R₂, or product ÷ sum.');
    const I = V / R1 + V / R2; return num(`<p>${R1} Ω and ${R2} Ω resistors are in parallel across a ${V} V supply. What is the total current from the supply?</p>${pic}`, I, 'A', [`Each branch has the full ${V} V.`, `I₁ = ${V} ÷ ${R1} = ${n(r(V / R1, 3))} A, I₂ = ${V} ÷ ${R2} = ${n(r(V / R2, 3))} A`, `Total = <b>${n(r(I, 3))} A</b> (currents add at the junction)`], 'Each branch gets the full supply voltage. Add the branch currents.'); };
  G.phJunction = () => { const a = pick([0.2, 0.5, 1.2, 1.5, 2]), b = pick([0.3, 0.4, 0.8, 1, 2.5]);
    return num(`<p>A current of ${n(r(a + b, 2))} A flows into a junction. ${n(a)} A leaves along one wire. How much leaves along the other?</p>`, r(b, 2), 'A', [`Current in = current out: ${n(r(a + b, 2))} − ${n(a)} = <b>${n(b)} A</b>`], 'Charge is not used up: what goes in must come out.'); };
  bank('phCircuitIdea', [
    { q: 'In a series circuit the current is…', a: 'the same at every point', w: ['biggest near the cell', 'used up by each lamp', 'zero after the first lamp'], why: 'Charge is not used up; the same flow passes everywhere.' },
    { q: 'In a series circuit the p.d.s across the components…', a: 'add up to the supply e.m.f.', w: ['are all equal to the e.m.f.', 'are all zero', 'multiply together'], why: 'The energy from the supply is shared out.' },
    { q: 'Components in parallel all have…', a: 'the same p.d. across them', w: ['the same current', 'no current', 'double the e.m.f.'], why: 'Each branch connects straight across the supply.' },
    { q: 'An ammeter is connected…', a: 'in series', w: ['in parallel', 'across the cell only', 'anywhere outside the circuit'], why: 'Current must flow through it.' },
    { q: 'A voltmeter is connected…', a: 'in parallel across the component', w: ['in series', 'inside the cell', 'with no wires'], why: 'It compares the energy per charge on both sides.' },
    { q: 'Adding another resistor in parallel makes the total resistance…', a: 'smaller', w: ['bigger', 'stay the same', 'zero'], why: 'There is another path for the current.' },
    { q: 'Conventional current flows…', a: 'from + to −; electrons actually flow from − to +', w: ['from − to +; electrons flow from + to −', 'both ways at once', 'only in a.c.'], why: 'The convention was chosen before electrons were discovered.' },
    { q: 'Direct current (d.c.)…', a: 'flows in one direction only', w: ['changes direction many times a second', 'never flows', 'only comes from the mains'], why: 'Mains is a.c.: it reverses direction repeatedly.' }
  ]);
  G.phDivider = () => { const R1 = pick([2, 4, 5, 10, 20, 30]), R2 = pick([2, 5, 6, 10, 20, 40]), V = pick([6, 9, 12]); const V2 = V * R2 / (R1 + R2);
    return num(`<p>A ${V} V supply is across two resistors in series: R₁ = ${R1} kΩ and R₂ = ${R2} kΩ. What is the output p.d. across R₂?</p>`, V2, 'V', [`The voltage splits in the ratio of the resistances: V₁ ÷ V₂ = R₁ ÷ R₂`, `V₂ = ${V} × ${R2} ÷ (${R1} + ${R2}) = <b>${n(K.sf(V2, 3))} V</b>`], 'The bigger resistor gets the bigger share of the voltage.'); };
  bank('phSensors', [
    { q: 'As the temperature of an NTC thermistor rises, its resistance…', a: 'decreases', w: ['increases', 'stays the same', 'becomes infinite'], why: 'NTC = negative temperature coefficient.' },
    { q: 'An LDR in bright light has…', a: 'low resistance', w: ['high resistance', 'no resistance change', 'zero current always'], why: 'More light → less resistance.' },
    { q: 'An LDR is used as a sensor in…', a: 'street lights that switch on at dusk', w: ['fire alarms that detect heat', 'loudspeakers', 'fuses'], why: 'It responds to light levels.' },
    { q: 'A thermistor could be used to…', a: 'switch on a fan when a room gets hot', w: ['detect darkness', 'measure current', 'store charge'], why: 'It responds to temperature.' },
    { q: 'In a potential divider, the output p.d. across a resistor rises when…', a: 'that resistor\'s share of the total resistance increases', w: ['the supply is switched off', 'the other resistor increases', 'the current is zero'], why: 'V₁ ÷ V₂ = R₁ ÷ R₂.' }
  ]);
  G.phPower = () => { const q = pick(['P', 'I', 'E', 'cost', 'cost']), V = pick([12, 230, 230]), I = pick([0.5, 2, 4, 5, 10]); const P = V * I;
    if (q === 'P') return num(`<p>An appliance takes ${n(I)} A from a ${V} V supply. What is its power?</p>`, P, 'W', [`P = IV = ${n(I)} × ${V} = <b>${n(P)} W</b>`], 'power = current × voltage');
    if (q === 'I') return num(`<p>A ${n(P)} W heater runs on a ${V} V supply. What current does it take?</p>`, I, 'A', [`I = P ÷ V = ${n(P)} ÷ ${V} = <b>${n(I)} A</b>`], 'I = P ÷ V');
    if (q === 'E') { const t = pick([10, 30, 60, 120]); return num(`<p>A ${V} V supply drives ${n(I)} A through a motor for ${t} s. How much energy is transferred?</p>`, V * I * t, 'J', [`E = IVt = ${n(I)} × ${V} × ${t} = <b>${n(V * I * t)} J</b>`], 'energy = current × voltage × time'); }
    const kW = pick([0.1, 0.5, 1, 1.5, 2, 3]), h = pick([2, 3, 4, 5, 8, 10]), c = pick([10, 15, 20, 25]); return num(`<p>A ${n(kW)} kW appliance is used for ${h} hours. Electricity costs ${c} cents per kW h. What is the cost (in cents)?</p>`, r(kW * h * c, 2), 'cents', [`energy = power (kW) × time (h) = ${n(kW)} × ${h} = ${n(r(kW * h, 2))} kW h`, `cost = ${n(r(kW * h, 2))} × ${c} = <b>${n(r(kW * h * c, 2))} cents</b>`], 'Use kW and hours, then multiply by the price per kW h.'); };
  G.phFuse = () => { const P = pick([60, 100, 500, 700, 1000, 2000, 2500, 2800]), V = 230; const I = P / V; const fuse = [3, 5, 13].find(f => f > I * 1.0001);
    return { kind: 'mcq', q: `<p>A ${P} W appliance runs on the ${V} V mains. Which fuse should be fitted?</p>`, choices: ['3 A', '5 A', '13 A'], a: fuse + ' A', hint: 'Work out the normal current, then choose the next fuse rating ABOVE it.', steps: [`I = P ÷ V = ${P} ÷ ${V} = ${n(K.sf(I, 3))} A`, `Choose the smallest fuse above this: <b>${fuse} A</b>`] }; };
  bank('phSafety', [
    { q: 'Why must the switch and fuse be in the <b>live</b> wire?', a: 'So the appliance is disconnected from the high voltage when they open', w: ['Because the neutral wire carries no current', 'To make the plug cheaper', 'Because the earth wire is live'], why: 'Otherwise the appliance stays connected to the live voltage even when switched off.' },
    { q: 'If the live wire touches an earthed metal case…', a: 'a large current flows to earth and the fuse melts (or the trip switch opens)', w: ['nothing happens', 'the appliance works better', 'the neutral wire melts'], why: 'The earth wire gives a low-resistance path, protecting the user.' },
    { q: 'Why do some appliances with plastic cases not need an earth wire?', a: 'They are double insulated: the case cannot become live', w: ['Plastic conducts electricity', 'They use d.c.', 'They have no live wire'], why: 'Non-conducting casing.' },
    { q: 'Which is a hazard?', a: 'Plugging too many appliances into one socket', w: ['Using a correctly rated fuse', 'Keeping cables dry', 'Using double insulation'], why: 'Overloading causes overheating cables.' },
    { q: 'A trip switch (circuit breaker) is better than a fuse because…', a: 'it can be reset and acts faster', w: ['it never switches off', 'it uses more current', 'it is in the neutral wire'], why: 'No need to replace anything.' },
    { q: 'Why is it dangerous to use electrical appliances in damp conditions?', a: 'Water can conduct current through you', w: ['Water makes appliances work faster', 'Damp air stops current', 'There is no danger'], why: 'It lowers the resistance between live parts and you.' },
    { q: 'Lamps in a house are connected in parallel so that…', a: 'each lamp gets the full mains voltage and can be switched on or off independently', w: ['they share the voltage', 'one switch turns all of them off', 'less current is used'], why: 'If one lamp breaks, the others still work.' }
  ]);
  bank('phInduction', [
    { q: 'Pushing a magnet into a coil connected to a meter makes the needle flick. This is…', a: 'electromagnetic induction', w: ['the motor effect', 'static charging', 'radioactivity'], why: 'A changing magnetic field induces an e.m.f.' },
    { q: 'Which makes the induced e.m.f. larger?', a: 'Moving the magnet faster', w: ['Holding the magnet still inside the coil', 'Using fewer turns', 'Using a weaker magnet'], why: 'Faster change, more turns, stronger magnet → bigger e.m.f.' },
    { q: 'A magnet held still inside a coil induces…', a: 'no e.m.f.', w: ['a large e.m.f.', 'a steady d.c. current', 'an a.c. current'], why: 'Only a CHANGING field induces an e.m.f.' },
    { q: 'Lenz\'s law: the induced current…', a: 'opposes the change that produced it', w: ['helps the change', 'is always zero', 'flows only in a superconductor'], why: 'Push a N pole in → the coil makes a N pole to push back.' },
    { q: 'An a.c. generator uses slip rings so that…', a: 'the coil can turn while keeping contact with the circuit', w: ['the current becomes d.c.', 'the coil stops spinning', 'the magnet rotates'], why: 'A d.c. motor uses a split-ring commutator instead.' },
    { q: 'In an a.c. generator the e.m.f. is largest when the coil is…', a: 'cutting the field lines fastest (coil parallel to the field)', w: ['perpendicular to the field', 'not moving', 'outside the magnet'], why: 'Peaks happen when the sides of the coil cut the lines fastest.' }
  ]);
  bank('phMotor', [
    { q: 'The field around a straight current-carrying wire is…', a: 'circles around the wire', w: ['straight lines along the wire', 'zero', 'like a bar magnet'], why: 'Reverse the current and the direction of the circles reverses.' },
    { q: 'A solenoid (coil) with a current has a field like…', a: 'a bar magnet', w: ['circles only outside', 'nothing', 'an electric field'], why: 'Adding an iron core makes it stronger: an electromagnet.' },
    { q: 'Which increases the turning effect on a motor coil?', a: 'More turns on the coil', w: ['A smaller current', 'A weaker magnet', 'Removing the commutator'], why: 'Also: bigger current, stronger field.' },
    { q: 'The split-ring commutator in a d.c. motor…', a: 'reverses the current in the coil every half turn so it keeps spinning the same way', w: ['stops the motor', 'makes a.c.', 'measures the current'], why: 'Without it the coil would just rock back and forth.' },
    { q: 'Reversing the current in a wire in a magnetic field makes the force…', a: 'reverse direction', w: ['disappear', 'double', 'stay the same'], why: 'Reversing the field also reverses it. Reversing both: same direction.' },
    { q: 'A relay uses an electromagnet to…', a: 'let a small current switch on a large current in another circuit', w: ['store energy', 'measure voltage', 'turn a.c. into d.c.'], why: 'E.g. a car starter motor.' },
    { q: 'Two parallel wires carry currents in the same direction. They…', a: 'attract', w: ['repel', 'do nothing', 'spin'], why: 'Opposite directions repel.' }
  ]);
  G.phTransformer = () => { const q = pick(['Vs', 'Ns', 'Vp']), Np = pick([100, 200, 400, 500, 1000, 2000]), ratio = pick([2, 4, 5, 10, 20, 0.5, 0.1, 0.05]); const Ns = Np * ratio, Vp = pick([12, 230, 240, 11000]); const Vs = r(Vp * ratio, 3);
    if (q === 'Vs') return num(`<p>A transformer has ${Np} turns on the primary coil and ${n(Ns)} turns on the secondary. The primary voltage is ${n(Vp)} V. What is the secondary voltage?</p>`, Vs, 'V', [`Vp ÷ Vs = Np ÷ Ns`, `Vs = Vp × Ns ÷ Np = ${n(Vp)} × ${n(Ns)} ÷ ${Np} = <b>${n(Vs)} V</b>`, ratio > 1 ? 'More turns on the secondary: step-up.' : 'Fewer turns on the secondary: step-down.'], 'Vp ÷ Vs = Np ÷ Ns.');
    if (q === 'Ns') return num(`<p>A transformer changes ${n(Vp)} V to ${n(Vs)} V. The primary has ${Np} turns. How many turns are on the secondary?</p>`, Ns, 'turns', [`Ns = Np × Vs ÷ Vp = ${Np} × ${n(Vs)} ÷ ${n(Vp)} = <b>${n(Ns)}</b>`], 'Voltage ratio = turns ratio.');
    return num(`<p>A transformer has ${Np} primary turns and ${n(Ns)} secondary turns. The output is ${n(Vs)} V. What is the input voltage?</p>`, Vp, 'V', [`Vp = Vs × Np ÷ Ns = <b>${n(Vp)} V</b>`], 'Vp ÷ Vs = Np ÷ Ns'); };
  bank('phTransIdea', [
    { q: 'A transformer only works with a.c. because…', a: 'it needs a changing magnetic field in the iron core', w: ['d.c. is too strong', 'a.c. has no current', 'iron does not work with d.c.'], why: 'Changing current → changing field → induced e.m.f. in the secondary.' },
    { q: 'Why is electricity transmitted at very high voltage?', a: 'The current is smaller, so less energy is wasted heating the cables', w: ['It travels faster', 'It is safer for houses', 'Cables have no resistance at high voltage'], why: 'Same power, higher V → lower I → less heating.' },
    { q: 'A step-down transformer has…', a: 'fewer turns on the secondary than the primary', w: ['more turns on the secondary', 'no iron core', 'the same number of turns'], why: 'Lower output voltage.' },
    { q: 'The core of a transformer is made of soft iron because…', a: 'it is easily magnetised and demagnetised', w: ['it conducts electricity well', 'it is a permanent magnet', 'it is light'], why: 'The field must change quickly with the a.c.' }
  ]);
  G.phScope = () => { const q = pick(['f', 'T', 'V']), div = pick([2, 4, 5, 8]), tb = pick([1, 2, 5, 10]), gain = pick([0.5, 1, 2, 5]), ht = pick([1.5, 2, 3]);
    if (q === 'V') return num(`<p>On an oscilloscope set to ${n(gain)} V/div, the peak of a trace is ${n(ht)} divisions above the centre line. What is the peak p.d.?</p>${S.scope(2, ht)}`, r(gain * ht, 2), 'V', [`peak p.d. = divisions × Y-gain = ${n(ht)} × ${n(gain)} = <b>${n(r(gain * ht, 2))} V</b>`], 'Multiply the height in divisions by the Y-gain.');
    const T = div * tb; if (q === 'T') return num(`<p>One complete wave on an oscilloscope screen is ${div} divisions wide. The timebase is ${tb} ms/div. What is the period (time for one wave)?</p>${S.scope(10 / div, 2)}`, T, 'ms', [`period = divisions × timebase = ${div} × ${tb} = <b>${T} ms</b>`], 'Width of one wave × the timebase.');
    const f = 1000 / T; return num(`<p>One wave is ${div} divisions wide on a timebase of ${tb} ms/div. What is the frequency of the signal?</p>${S.scope(10 / div, 2)}`, f, 'Hz', [`period = ${div} × ${tb} = ${T} ms = ${n(T / 1000)} s`, `frequency = waves per second = 1 ÷ ${n(T / 1000)} = <b>${n(K.sf(f, 3))} Hz</b>`], 'Find the time for one wave, then how many fit in one second.'); };

  // ================= lessons =================
  R2O.addModule({ subject: 'physics', id: 'ph-elec', name: 'Electricity', icon: '🔌', color: '#ca8a04', book: BOOK,
    blurb: 'Syllabus 4.1–4.4: magnets, charge, current, voltage, resistance, circuits, sensors and mains safety.',
    lessons: [
      { id: 'ph-magnet', title: 'Magnets and magnetic fields', obj: ['4.1'], kw: 'magnets poles magnetic field', learn: [],
        hook: 'An invisible force you can map with a compass.',
        scenes: [
          { say: idea('Every magnet has a <b>north</b> and a <b>south</b> pole. <b>Like poles repel, unlike poles attract.</b> Around a magnet is a <b>field</b>: a region where another magnet feels a force. Field lines show which way a north pole would be pushed, and they crowd together where the field is strong.') },
          { say: 'The field of a bar magnet: lines leave N and enter S.', pic: S.magnet(),
            ask: T('Where is the field strongest?', ['At the poles', 'In the middle of the side', 'Far away'], 0, 'The lines are closest together at the poles.') },
          { say: 'Iron, steel, nickel and cobalt are magnetic. A magnet can <b>induce</b> magnetism in a nearby iron nail, which is why the nail is attracted. <b>Soft iron</b> loses its magnetism easily (temporary: electromagnets). <b>Steel</b> keeps it (permanent magnets).',
            ask: T('Which would you use for a crane that drops scrap metal when switched off?', ['A soft-iron electromagnet', 'A steel permanent magnet', 'A copper coil with no core'], 0, 'Soft iron loses its magnetism when the current stops.') },
          { say: 'Map a field by moving a plotting compass around the magnet (or sprinkling iron filings). The needle points along the field.' }
        ],
        keys: ['Like poles repel; unlike attract.', 'Field direction = direction of force on a N pole; closer lines = stronger.', 'Soft iron: temporary. Steel: permanent.'],
        gens: ['phMagnetism'], easy: ['phMagnetism'] },
      { id: 'ph-charge', title: 'Electric charge', obj: ['4.2.1'], kw: 'static charge electrons electric field conductors insulators', learn: [],
        hook: 'Why a balloon rubbed on your hair sticks to the wall.',
        scenes: [
          { say: idea('There are two kinds of charge: <b>positive</b> and <b>negative</b>. Like charges repel, unlike attract. When you rub two insulators together, only <b>electrons</b> (negative) move from one to the other. Whatever gains electrons becomes negative; the other is left positive.') },
          { say: 'Rub a balloon on hair. Electrons jump to the balloon.', pic: '<p class="center bigq">🎈 − − − − &nbsp;&nbsp; 💇 + + + +</p>',
            ask: T('Did the hair gain or lose electrons?', ['Lost electrons, so it is positive', 'Gained electrons', 'Gained protons'], 0, 'Protons never move in charging by friction.') },
          { say: 'An <b>electric field</b> is a region where a charge feels a force. Field lines point the way a <b>positive</b> charge would be pushed: away from +, towards −.', pic: S.svg(300, 140, `<rect x="40" y="20" width="12" height="100" fill="#ef4444"/><rect x="248" y="20" width="12" height="100" fill="#3b82f6"/>${[35, 55, 75, 95, 115].map(y => S.arrow(56, y - 5, 244, y - 5, 'var(--muted)', 2)).join('')}${S.txt(46, 136, '+', 'lbl')}${S.txt(254, 136, '−', 'lbl')}`) },
          { say: '<b>Conductors</b> (metals) have free electrons that can move, so charge flows through them. <b>Insulators</b> (plastic, rubber, glass) don\'t.' }
        ],
        keys: ['Charge in coulombs (C). Like repel, unlike attract.', 'Charging by friction = transfer of electrons only.', 'Electric field lines: direction of force on a + charge.', 'Conductors have free electrons.'],
        gens: ['phStatic'], easy: ['phStatic'] },
      { id: 'ph-current', title: 'Current, e.m.f. and potential difference', obj: ['4.2.2', '4.2.3'], kw: 'current charge emf potential difference voltage', learn: [],
        hook: 'What is actually flowing in a wire, and what pushes it?',
        scenes: [
          { say: idea('<b>Current</b> is how much charge flows past a point <b>each second</b> (like litres of water per second). The <b>e.m.f.</b> of a battery is the <b>energy it gives each coulomb</b> of charge; the <b>p.d.</b> across a component is the energy each coulomb <b>gives up</b> there. 1 volt = 1 joule per coulomb.') },
          { say: 'Think of water in pipes. The pump is the battery; the narrow pipe is a resistor.', anim: X([{ k: 'V', label: 'Pump push (voltage)', min: 2, max: 12, step: 2, v: 6 }, { k: 'R', label: 'Narrowness (resistance)', min: 1, max: 6, v: 3 }], v => `<p class="center bigq">${'💧'.repeat(Math.max(1, Math.round(v.V / v.R)))}</p><p class="center">flow (current) = ${v.V} ÷ ${v.R} = <b>${n(r(v.V / v.R, 2))} A</b></p><p class="center small muted">Bigger push → more flow. Narrower pipe → less flow.</p>`) },
          { say: 'The equations:', pic: eq('current = charge ÷ time', 'I = Q ÷ t · amps = coulombs per second') + eq('e.m.f. or p.d. = work done ÷ charge', 'V = W ÷ Q · volts = joules per coulomb'),
            ask: T('A 9 V battery: how much energy does each coulomb get?', ['9 J', '1 J', '0.11 J', '9 C'], 0, 'e.m.f. = energy per coulomb.') },
          { say: 'Cells in <b>series</b> (same way round): e.m.f.s add. Identical cells in <b>parallel</b>: same e.m.f. as one cell (they just last longer). Ammeters go in series; voltmeters go in parallel.' },
          { say: 'In metals, current is a drift of <b>free electrons</b> from − to +. By convention we draw current from + to −. <b>d.c.</b> flows one way (cells); <b>a.c.</b> keeps reversing (the mains).' }
        ],
        keys: ['I = Q ÷ t (A = C/s).', 'e.m.f. = W ÷ Q for a source; p.d. = W ÷ Q for a component (V = J/C).', 'Series cells add; identical parallel cells = one cell\'s e.m.f.', 'Conventional current + → −; electrons − → +.'],
        gens: ['phQIt', 'phVWQ', 'phCells', 'phCircuitIdea'], easy: ['phCircuitIdea'] },
      { id: 'ph-resist', title: 'Resistance and Ohm\'s law', obj: ['4.2.4'], kw: 'resistance ohm current voltage graph diode lamp', learn: [],
        hook: 'Why a light bulb filament glows but the wires to it stay cool.',
        scenes: [
          { say: idea('<b>Resistance</b> is how hard it is for current to get through. For the same push (p.d.), more resistance means less current. So resistance = p.d. ÷ current. Long, thin, hot wires have more resistance.') },
          { say: 'Pick a component and see its current–voltage graph.', anim: X([{ k: 'c', label: 'Component', min: 0, max: 2, v: 0, fmt: i => ['resistor', 'filament lamp', 'diode'][i] }], v => { const f = [x => x / 2, x => Math.sign(x) * 2.6 * Math.sqrt(Math.abs(x) / 6), x => x < 0.7 ? 0 : (x - 0.7) * 3][v.c]; return `${K.plot([{ f }], [], { xmin: -6, xmax: 6, ymin: -3.5, ymax: 3.5, h: 220, gstep: 1, lstep: 100, xlab: 'V', ylab: 'I' })}<p class="center">${['Straight line through the origin: constant resistance (Ohm\'s law).', 'Curves and flattens: the filament heats up, so its resistance rises.', 'Current only one way: a diode has huge resistance in reverse.'][v.c]}</p>`; }) },
          { say: 'The equation:', pic: eq('resistance = p.d. ÷ current', 'R = V ÷ I, in ohms (Ω)'),
            ask: T('6 V across a resistor drives 2 A. Resistance?', ['3 Ω', '12 Ω', '0.33 Ω', '8 Ω'], 0, '6 ÷ 2 = 3 Ω.') },
          { say: 'For a wire: resistance ∝ length (twice as long → twice the R), and ∝ 1 ÷ cross-sectional area (twice as thick → half the R). <b>Ohm\'s law</b>: current ∝ p.d. as long as the temperature stays constant.' }
        ],
        keys: ['R = V ÷ I (Ω).', 'Resistor: straight-line I–V. Lamp: curve (R rises as it heats). Diode: one direction only.', 'R ∝ length; R ∝ 1 ÷ area.', 'Measure R with an ammeter (series) + voltmeter (parallel).'],
        gens: ['phOhm', 'phWire', 'phIV'], easy: ['phIV'] },
      { id: 'ph-circuits', title: 'Series and parallel circuits', obj: ['4.3.1', '4.3.2'], kw: 'series parallel circuits combined resistance', learn: [],
        hook: 'Why one broken fairy light can kill the whole string, but your house lights don\'t.',
        scenes: [
          { say: idea('In <b>series</b> there is <b>one path</b>: the same current goes through everything and the voltage is <b>shared</b>. In <b>parallel</b> there are <b>several paths</b>: each branch gets the <b>full voltage</b> and the currents <b>add up</b>.') },
          { say: 'Add identical lamps to a 6 V supply. Compare series and parallel.', anim: X([{ k: 'k', label: 'Number of lamps', min: 1, max: 4, v: 2 }, { k: 'p', label: 'Arrangement', min: 0, max: 1, v: 0, fmt: i => ['series', 'parallel'][i] }], v => { const pic = v.p ? S.ladder(v.k, 'lamp', '6 V') : S.series(Array.from({ length: v.k }, () => ({ t: 'lamp' })), { cellLabel: '6 V' }); const each = v.p ? 6 : 6 / v.k; return `${pic}<p class="center">Each lamp gets <b>${n(r(each, 2))} V</b> ${'💡'.repeat(v.k)}</p><p class="center small muted">${v.p ? 'Parallel: every lamp stays fully bright; more lamps → more total current.' : 'Series: the voltage is shared, so each lamp is dimmer.'}</p>`; }) },
          { say: 'Combining resistors:', pic: eq('Series: R = R₁ + R₂ + …') + eq('Parallel (two): 1/R = 1/R₁ + 1/R₂', 'or R = product ÷ sum. Always less than the smallest one.'),
            ask: T('6 Ω and 3 Ω in parallel?', ['2 Ω', '9 Ω', '4.5 Ω', '18 Ω'], 0, '(6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.') },
          { say: 'At a junction, current in = current out (charge isn\'t used up). In series, the p.d.s add up to the supply.' }
        ],
        keys: ['Series: same I everywhere; p.d.s add to the supply; R adds.', 'Parallel: same p.d. on each branch; branch currents add; R gets smaller.', 'Two in parallel: R = R₁R₂ ÷ (R₁ + R₂).'],
        gens: ['phSeries', 'phParallel', 'phJunction', 'phCircuitIdea'], easy: ['phCircuitIdea'] },
      { id: 'ph-sensors', title: 'Sensors and potential dividers', obj: ['4.3.3'], kw: 'thermistor ldr potential divider sensor', learn: [],
        hook: 'How a street light knows it\'s getting dark.',
        scenes: [
          { say: idea('Two resistors in series <b>share</b> the supply voltage in the ratio of their resistances: a <b>potential divider</b>. Swap one for a sensor whose resistance changes with <b>light</b> (LDR) or <b>temperature</b> (thermistor), and the output voltage changes automatically.') },
          { say: 'A 12 V supply across a 10 kΩ resistor and an NTC thermistor. Change the temperature.', anim: X([{ k: 't', label: 'Temperature (°C)', min: 0, max: 100, step: 10, v: 20 }], v => { const Rt = r(30 * Math.exp(-v.t / 30), 2); const Vt = 12 * Rt / (Rt + 10); return `${S.series([{ t: 'res', l: '10 kΩ' }, { t: 'therm', l: n(Rt) + ' kΩ' }], { cellLabel: '12 V' })}<p class="center">Thermistor gets <b>${n(r(Vt, 1))} V</b> · the resistor gets <b>${n(r(12 - Vt, 1))} V</b></p><p class="center small muted">Hotter → thermistor resistance falls → its share of the voltage falls.</p>`; }) },
          { say: 'The rule:', pic: eq('R₁ ÷ R₂ = V₁ ÷ V₂'),
            ask: T('An LDR goes into the dark. Its resistance…', ['increases', 'decreases', 'stays the same'], 0, 'LDR: more light → less resistance; darkness → more resistance.') }
        ],
        keys: ['Potential divider: V₁ ÷ V₂ = R₁ ÷ R₂.', 'NTC thermistor: hotter → lower R.', 'LDR: brighter → lower R.', 'Used as input sensors (alarms, street lights, fans).'],
        gens: ['phDivider', 'phSensors'], easy: ['phSensors'] },
      { id: 'ph-mains', title: 'Electrical power, cost and safety', obj: ['4.4.1', '4.4.2'], kw: 'electrical power kilowatt hour fuse earth wire safety', learn: [],
        hook: 'What your electricity bill is really counting, and what stops your house burning down.',
        scenes: [
          { say: idea('<b>Power</b> = how many joules each second an appliance uses = current × voltage. Your bill counts <b>energy</b> in a big unit, the <b>kilowatt-hour</b>: a 1 kW appliance running for 1 hour.') },
          { say: 'Run an appliance and see the cost (20 cents per kW h).', anim: X([{ k: 'P', label: 'Power (kW)', min: 0.1, max: 3, step: 0.1, v: 2 }, { k: 'h', label: 'Hours', min: 1, max: 10, v: 3 }], v => `<p class="center bigq">${n(r(v.P * v.h, 2))} kW h × 20 = ${n(r(v.P * v.h * 20, 1))} cents</p><p class="center small muted">energy (kW h) = power (kW) × time (h)</p>`) },
          { say: 'The equations:', pic: eq('P = IV', 'power = current × voltage') + eq('E = IVt', 'energy = current × voltage × time'),
            ask: T('A 2300 W kettle on 230 V mains takes…', ['10 A', '0.1 A', '2530 A', '23 A'], 0, 'I = P ÷ V = 2300 ÷ 230 = 10 A. So it needs a 13 A fuse.') },
          { say: 'Mains safety: <b>live</b> (high voltage), <b>neutral</b>, <b>earth</b>. The <b>fuse</b> and <b>switch</b> go in the live wire. If the live wire touches a metal case, a big current flows to <b>earth</b>, melting the fuse or tripping the switch, so nobody gets a shock.', pic: '<p class="center">⚠️ Hazards: damaged insulation · overheating cables · damp · overloaded sockets</p>' }
        ],
        keys: ['P = IV; E = IVt.', '1 kW h = energy used by 1 kW in 1 hour; cost = kW h × price.', 'Fuse rating: just above the normal current (3 A, 5 A, 13 A).', 'Switch and fuse in the live wire; earth the metal case or double-insulate.'],
        gens: ['phPower', 'phFuse', 'phSafety'], easy: ['phSafety'] }
    ] });

  R2O.addModule({ subject: 'physics', id: 'ph-emag', name: 'Electromagnetism', icon: '🧲', color: '#a16207', book: BOOK,
    blurb: 'Syllabus 4.5–4.6: induction, generators, electromagnets, motors, transformers and the oscilloscope.',
    lessons: [
      { id: 'ph-induction', title: 'Electromagnetic induction and generators', obj: ['4.5.1', '4.5.2'], kw: 'electromagnetic induction generator lenz', learn: [],
        hook: 'Move a magnet near a wire and electricity appears from nowhere.',
        scenes: [
          { say: idea('A <b>changing</b> magnetic field near a wire <b>induces</b> a voltage (e.m.f.) in it. The faster the change, the bigger the e.m.f. A magnet that just sits still does nothing. Every power station generator works this way.') },
          { say: 'Push a magnet into a coil. Change the speed and the number of turns.', anim: X([{ k: 's', label: 'Speed of the magnet', min: 0, max: 5, v: 2 }, { k: 'N', label: 'Turns on the coil', min: 50, max: 300, step: 50, v: 100 }], v => { const e = v.s * v.N / 150; return `<p class="center bigq">🧲➡️ 🌀</p><div class="xbar"><div style="width:${Math.min(100, e * 10)}%"></div></div><p class="center">induced e.m.f. ∝ speed × turns = <b>${n(r(e, 2))}</b> (arbitrary units)</p><p class="center small muted">${v.s === 0 ? 'Not moving → no change → NO e.m.f.' : 'Faster, more turns, stronger magnet → bigger e.m.f.'}</p>`; }) },
          { say: '<b>Lenz\'s law</b>: the induced current always <b>opposes</b> the change that caused it. Push a N pole in, and the coil makes its own N pole to push back. (That is why you have to do work to generate electricity.)',
            ask: T('You pull the N pole OUT of the coil. The near end of the coil becomes…', ['a S pole, attracting the magnet back', 'a N pole', 'not magnetic'], 0, 'It opposes the change: it tries to stop the magnet leaving.') },
          { say: 'An <b>a.c. generator</b>: a coil spins in a magnetic field (or a magnet spins in a coil). Slip rings and brushes connect the spinning coil to the circuit. The e.m.f. rises and falls as the coil turns.', pic: K.plot([{ f: x => 3 * Math.sin(x * Math.PI / 2) }], [], { xmin: 0, xmax: 8, ymin: -4, ymax: 4, h: 160, gstep: 1, lstep: 100, xlab: 'time', ylab: 'e.m.f.' }) + '<p class="center small muted">Peaks: the coil cuts the field lines fastest. Zeros: the coil moves along the lines.</p>' }
        ],
        keys: ['Changing field or cutting field lines → induced e.m.f.', 'Bigger e.m.f.: faster change, more turns (stronger magnet).', 'Lenz: induced current opposes the change.', 'a.c. generator: rotating coil, slip rings and brushes.'],
        gens: ['phInduction'], easy: ['phInduction'] },
      { id: 'ph-motor', title: 'Electromagnets and motors', obj: ['4.5.3', '4.5.4', '4.5.5'], kw: 'electromagnet solenoid motor effect dc motor relay', learn: [],
        hook: 'A current makes a magnet. A magnet pushes a current. Put them together: a motor.',
        scenes: [
          { say: idea('A <b>current makes a magnetic field</b> (circles round a wire; like a bar magnet for a coil). So a current-carrying wire in another magnet\'s field gets <b>pushed</b>. In a motor, those pushes turn a coil round and round.') },
          { say: 'Turn up the things that make a motor stronger.', anim: X([{ k: 'I', label: 'Current', min: 0, max: 5, v: 2 }, { k: 'N', label: 'Turns on the coil', min: 1, max: 5, v: 2 }, { k: 'B', label: 'Magnet strength', min: 1, max: 5, v: 2 }], v => `<p class="center bigq">⚙️ turning effect ∝ ${v.I} × ${v.N} × ${v.B} = ${v.I * v.N * v.B}</p><div class="xbar"><div style="width:${v.I * v.N * v.B / 1.25}%"></div></div><p class="center small muted">Bigger current, more turns, stronger field → bigger turning effect.</p>`) },
          { say: 'The force on the wire reverses if you reverse the current <b>or</b> the field. Force, field and current are all at right angles (use Fleming\'s left-hand rule to remember the directions).',
            ask: T('Why does a d.c. motor need a split-ring commutator?', ['To reverse the current every half turn so the coil keeps turning one way', 'To make a.c.', 'To stop the coil overheating'], 0, 'Without it, the coil would just rock back and forth.') },
          { say: 'Electromagnets in action: a <b>relay</b> lets a small current switch a big one; a <b>loudspeaker</b> uses a changing current in a coil to push a cone back and forth.' }
        ],
        keys: ['Wire: circular field; solenoid: bar-magnet field. Reverse current → reverse field.', 'Motor effect: force on a current in a field; reverse I or B → reverse force.', 'd.c. motor: split-ring commutator + brushes; more turns/current/field → more turning.', 'Uses: relays, loudspeakers.'],
        gens: ['phMotor'], easy: ['phMotor'] },
      { id: 'ph-transformer', title: 'Transformers and the grid', obj: ['4.5.6'], kw: 'transformer step up step down turns ratio transmission', learn: [],
        hook: 'How electricity travels hundreds of kilometres without wasting most of it.',
        scenes: [
          { say: idea('A <b>transformer</b> changes the size of an a.c. voltage. The changing current in one coil makes a changing field in an iron core, which <b>induces</b> a voltage in a second coil. The voltages are in the <b>same ratio as the number of turns</b>.') },
          { say: 'The primary has 100 turns and 230 V. Change the secondary turns.', anim: X([{ k: 'Ns', label: 'Secondary turns', min: 10, max: 500, step: 10, v: 50 }], v => `<p class="center bigq">Vs = 230 × ${v.Ns} ÷ 100 = ${n(r(230 * v.Ns / 100, 1))} V</p><p class="center">${v.Ns > 100 ? '⬆️ Step-up transformer' : v.Ns < 100 ? '⬇️ Step-down transformer' : 'Same voltage'}</p>`) },
          { say: 'The rule:', pic: eq('Vp ÷ Vs = Np ÷ Ns'),
            ask: T('A phone charger steps 230 V down to 5 V with 920 primary turns. Secondary turns?', ['20', '46', '4600', '184'], 0, '920 × 5 ÷ 230 = 20 turns.') },
          { say: 'Power stations <b>step up</b> to very high voltage for the cables. Same power with higher voltage means <b>smaller current</b>, and a smaller current wastes much less energy heating the cables. Near homes it is <b>stepped down</b> again.' }
        ],
        keys: ['Vp ÷ Vs = Np ÷ Ns.', 'Step-up: more secondary turns. Step-down: fewer.', 'Needs a.c. (a changing field) and a soft-iron core.', 'High-voltage transmission → low current → less heating loss.'],
        gens: ['phTransformer', 'phTransIdea'], easy: ['phTransIdea'] },
      { id: 'ph-scope', title: 'Using an oscilloscope', obj: ['4.6'], kw: 'oscilloscope timebase y-gain waveform', learn: [],
        hook: 'A screen that draws voltage against time.',
        scenes: [
          { say: idea('An oscilloscope draws a <b>graph of voltage against time</b>. Count the squares: <b>up</b> the screen × the <b>Y-gain</b> (volts per square) gives the voltage; <b>across</b> × the <b>timebase</b> (time per square) gives the time.') },
          { say: 'Change the timebase. The signal stays the same; only how it is drawn changes.', anim: X([{ k: 'tb', label: 'Timebase (ms/div)', min: 1, max: 5, v: 2 }], v => { const cyc = 10 * v.tb / 4; return `${S.scope(cyc, 2)}<p class="center">One wave lasts 4 ms. At ${v.tb} ms/div that is <b>${n(r(4 / v.tb, 2))} squares</b> wide.</p>`; }) },
          { say: 'Reading it:', pic: eq('voltage = squares up × Y-gain') + eq('time = squares across × timebase'),
            ask: T('A peak is 3 squares high at 2 V/div. Peak voltage?', ['6 V', '1.5 V', '5 V', '0.67 V'], 0, '3 × 2 = 6 V.') }
        ],
        keys: ['Y-gain (V/div) × divisions up = p.d.', 'Timebase (s/div) × divisions across = time.', 'Period of one wave → frequency = 1 ÷ period.'],
        gens: ['phScope'], easy: ['phScope'] }
    ] });
})();
