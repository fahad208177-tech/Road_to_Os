// Physics 5054, part 2: Thermal physics (section 2) and Waves (section 3).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const BOOK = ['College Physics 2e', 'https://openstax.org/details/books/college-physics-2e'];
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const D = Math.PI / 180;

  // ================= generators: thermal =================
  bank('phStates', [
    { q: 'Which state has a fixed volume but takes the shape of its container?', a: 'Liquid', w: ['Solid', 'Gas', 'All three'], why: 'Liquid particles are close together but can slide past each other.' },
    { q: 'Why can a gas be compressed easily?', a: 'Its particles are far apart with lots of space between them', w: ['Its particles are very small', 'Its particles do not move', 'It has no mass'], why: 'Squeezing just reduces the empty space.' },
    { q: 'Particles in a solid…', a: 'vibrate about fixed positions in a regular pattern', w: ['move freely in all directions', 'slide past each other', 'do not move at all'], why: 'Strong forces hold them in place, but they still vibrate.' },
    { q: 'What is the change from gas to liquid called?', a: 'Condensation', w: ['Evaporation', 'Melting', 'Solidification'], why: 'Liquid → solid is solidification (freezing).' },
    { q: 'At absolute zero (−273 °C), particles…', a: 'have the least possible kinetic energy', w: ['move fastest', 'turn into gas', 'have infinite energy'], why: 'It is the lowest possible temperature.' },
    { q: 'A gas in a closed box is heated. Its pressure rises because the particles…', a: 'move faster and hit the walls harder and more often', w: ['get bigger', 'stick to the walls', 'become fewer'], why: 'More force per unit area.' },
    { q: 'Higher temperature means the particles have…', a: 'a higher average kinetic energy', w: ['a bigger size', 'less energy', 'more mass'], why: 'Temperature measures the average kinetic energy of the particles.' }
  ]);
  G.phBoyle = () => { const p1 = pick([100, 120, 150, 200]), V1 = pick([20, 30, 40, 60, 80]), f = pick([2, 4, 0.5, 1.5, 5]); const V2 = r(V1 / f, 3), p2 = p1 * f; const q = pick(['p', 'V']);
    if (q === 'p') return num(`<p>A gas at ${p1} kPa has a volume of ${V1} cm³. It is squashed slowly (constant temperature) to ${n(V2)} cm³. What is the new pressure?</p>`, p2, 'kPa', [`p₁V₁ = p₂V₂`, `${p1} × ${V1} = p₂ × ${n(V2)}`, `p₂ = ${p1 * V1} ÷ ${n(V2)} = <b>${n(p2)} kPa</b>`], 'p₁V₁ = p₂V₂ at constant temperature. Smaller volume → bigger pressure.');
    return num(`<p>A gas at ${p1} kPa occupies ${V1} cm³. At constant temperature the pressure changes to ${n(p2)} kPa. What is the new volume?</p>`, V2, 'cm³', [`V₂ = p₁V₁ ÷ p₂ = ${p1 * V1} ÷ ${n(p2)} = <b>${n(V2)} cm³</b>`], 'p₁V₁ = p₂V₂'); };
  G.phKelvin = () => { const c = pick([-273, -200, -73, 0, 20, 27, 100, 227]); if (Math.random() < .5) return num(`<p>Convert ${c} °C to kelvin.</p>`, c + 273, 'K', [`T = θ + 273 = ${c} + 273 = <b>${c + 273} K</b>`], 'Add 273.');
    return num(`<p>Convert ${c + 273} K to degrees Celsius.</p>`, c, '°C', [`θ = T − 273 = ${c + 273} − 273 = <b>${c} °C</b>`], 'Subtract 273.'); };
  G.phSHC = () => { const mats = [['water', 4200], ['aluminium', 900], ['copper', 390], ['oil', 2000]]; const [mat, c] = pick(mats); const m = pick([0.2, 0.5, 1, 2]), dT = pick([5, 10, 20, 25, 40]); const E = m * c * dT; const q = pick(['E', 'E', 'c', 'dT']);
    if (q === 'E') return num(`<p>How much energy is needed to heat ${n(m)} kg of ${mat} by ${dT} °C? (specific heat capacity = ${c} J/(kg °C))</p>`, E, 'J', [`ΔE = mcΔθ = ${n(m)} × ${c} × ${dT} = <b>${n(E)} J</b>`], 'Rearrange c = ΔE ÷ (mΔθ) to ΔE = mcΔθ.');
    if (q === 'c') return num(`<p>${n(E)} J heats ${n(m)} kg of a material by ${dT} °C. What is its specific heat capacity?</p>`, c, 'J/(kg °C)', [`c = ΔE ÷ (mΔθ) = ${n(E)} ÷ (${n(m)} × ${dT}) = <b>${c} J/(kg °C)</b>`], 'c = energy ÷ (mass × temperature change)');
    return num(`<p>${n(E)} J is supplied to ${n(m)} kg of ${mat} (c = ${c} J/(kg °C)). By how much does its temperature rise?</p>`, dT, '°C', [`Δθ = ΔE ÷ (mc) = ${n(E)} ÷ (${n(m)} × ${c}) = <b>${dT} °C</b>`], 'Δθ = ΔE ÷ (mc)'); };
  bank('phExpansion', [
    { q: 'Gaps are left between railway rails because…', a: 'the rails expand on hot days', w: ['it saves steel', 'it makes trains quieter', 'rails shrink when hot'], why: 'Without gaps, expanding rails would buckle.' },
    { q: 'Which expands the most for the same temperature rise?', a: 'A gas', w: ['A solid', 'A liquid', 'They all expand equally'], why: 'Order of expansion: gases ≫ liquids > solids.' },
    { q: 'A liquid-in-glass thermometer works because…', a: 'the liquid expands as it gets hotter and rises up the narrow tube', w: ['the glass gets longer', 'the liquid evaporates', 'the bulb shrinks'], why: 'Expansion of the liquid.' },
    { q: 'Why do solids expand when heated?', a: 'The particles vibrate more and move slightly further apart', w: ['The particles get bigger', 'New particles are made', 'The particles stop moving'], why: 'The particles themselves do not grow.' }
  ]);
  bank('phChange', [
    { q: 'While ice is melting, its temperature…', a: 'stays at 0 °C', w: ['rises steadily', 'falls', 'goes up and down'], why: 'The energy is used to break bonds between particles (latent heat), not to raise the temperature.' },
    { q: 'Water boils at (standard atmospheric pressure)…', a: '100 °C', w: ['0 °C', '50 °C', '273 °C'], why: 'And melts at 0 °C.' },
    { q: 'How is evaporation different from boiling?', a: 'Evaporation happens at any temperature, only at the surface', w: ['Evaporation only happens at 100 °C', 'Boiling happens only at the surface', 'There is no difference'], why: 'Boiling happens throughout the liquid at one temperature.' },
    { q: 'Why does sweating cool you down?', a: 'The most energetic particles escape, lowering the average energy of those left', w: ['Sweat is cold', 'Sweat reflects sunlight', 'Water has no energy'], why: 'Evaporation causes cooling.' },
    { q: 'Which makes a puddle evaporate faster?', a: 'Wind blowing over it', w: ['A colder day', 'Making it deeper and narrower', 'Covering it'], why: 'Higher temperature, larger surface area and air movement all speed up evaporation.' },
    { q: 'Latent heat is…', a: 'the energy needed to change the state of a substance without changing its temperature', w: ['the energy to heat a substance by 1 °C', 'heat that is lost', 'the temperature of melting'], why: 'It breaks (or forms) the forces between particles.' }
  ]);
  bank('phTransfer', [
    { q: 'Why are metals good thermal conductors?', a: 'They have free (delocalised) electrons that carry energy', w: ['They are heavy', 'They are shiny', 'Their particles do not vibrate'], why: 'Lattice vibrations plus fast-moving free electrons.' },
    { q: 'Convection cannot happen in a solid because…', a: 'the particles cannot flow from place to place', w: ['solids are too cold', 'solids have no particles', 'solids are too dense to heat'], why: 'Convection needs a fluid (liquid or gas) that can flow.' },
    { q: 'Hot air rises because…', a: 'it expands, becomes less dense and floats up', w: ['heat is lighter than air', 'its particles get smaller', 'it becomes denser'], why: 'Density changes drive convection currents.' },
    { q: 'Which surface is the best emitter AND absorber of infrared?', a: 'Dull black', w: ['Shiny white', 'Shiny silver', 'Dull white'], why: 'Shiny and white surfaces are good reflectors.' },
    { q: 'Thermal energy from the Sun reaches Earth by…', a: 'infrared radiation (no medium needed)', w: ['conduction', 'convection', 'sound waves'], why: 'Space is a vacuum: only radiation can cross it.' },
    { q: 'A room heater is usually placed low down because…', a: 'warm air rises and sets up a convection current around the room', w: ['heat falls', 'it is safer only', 'cold air rises'], why: 'Convection heats the whole room.' },
    { q: 'A vacuum flask keeps drinks hot. The vacuum stops…', a: 'conduction and convection', w: ['radiation', 'evaporation only', 'all heat transfer completely'], why: 'Silvered walls reduce radiation; the vacuum stops conduction and convection.' },
    { q: 'A hotter object emits infrared…', a: 'at a greater rate', w: ['at a smaller rate', 'not at all', 'only if it is black'], why: 'Rate depends on surface temperature and surface area.' },
    { q: 'An infrared thermometer measures temperature by…', a: 'detecting the infrared radiation emitted by an object', w: ['touching the object', 'measuring convection currents', 'reflecting sound off it'], why: 'Hotter objects emit more infrared.' }
  ]);
  // ================= generators: waves =================
  G.phWaveEq = () => { const q = pick(['v', 'f', 'l']), f = pick([2, 5, 10, 50, 100, 250, 500]), l = pick([0.2, 0.5, 1.5, 2, 3, 4]); const v = r(f * l, 3);
    if (q === 'v') return num(`<p>A wave has a frequency of ${f} Hz and a wavelength of ${n(l)} m. What is its speed?</p>`, v, 'm/s', [`v = fλ = ${f} × ${n(l)} = <b>${n(v)} m/s</b>`], 'wave speed = frequency × wavelength');
    if (q === 'f') return num(`<p>A wave travels at ${n(v)} m/s with a wavelength of ${n(l)} m. What is its frequency?</p>`, f, 'Hz', [`f = v ÷ λ = ${n(v)} ÷ ${n(l)} = <b>${f} Hz</b>`], 'f = v ÷ λ');
    return num(`<p>A wave of frequency ${f} Hz travels at ${n(v)} m/s. What is its wavelength?</p>`, l, 'm', [`λ = v ÷ f = ${n(v)} ÷ ${f} = <b>${n(l)} m</b>`], 'λ = v ÷ f'); };
  G.phWaveCount = () => { const waves = pick([3, 4, 5, 6]), len = pick([6, 12, 15, 20, 24]); const l = len / waves;
    return num(`<p>${waves} complete waves fit along a ${len} m rope. What is the wavelength?</p>`, l, 'm', [`λ = ${len} ÷ ${waves} = <b>${n(r(l, 3))} m</b>`], 'Wavelength = length of ONE complete wave.'); };
  bank('phWaveIdea', [
    { q: 'Waves transfer…', a: 'energy, but not matter', w: ['matter, but not energy', 'both energy and matter', 'neither'], why: 'A floating duck bobs up and down; it is not carried away.' },
    { q: 'Which is a longitudinal wave?', a: 'Sound', w: ['Light', 'Water surface waves', 'Seismic S-waves'], why: 'Vibrations are parallel to the energy transfer. Seismic P-waves are also longitudinal.' },
    { q: 'In a transverse wave, the vibrations are…', a: 'at right angles to the direction of energy transfer', w: ['parallel to the direction of energy transfer', 'in a circle', 'random'], why: 'Examples: light, water waves, S-waves.' },
    { q: 'Amplitude is…', a: 'the maximum distance from the mean (rest) position', w: ['the distance between two crests', 'the number of waves per second', 'the speed of the wave'], why: 'Peak-to-peak is twice the amplitude.' },
    { q: 'Waves spread out most through a gap when…', a: 'the gap is about the same size as the wavelength', w: ['the gap is much bigger than the wavelength', 'the wave is very fast', 'the amplitude is large'], why: 'That spreading is diffraction.' },
    { q: 'Water waves move from deep to shallow water. They slow down and…', a: 'change direction (refract) and their wavelength gets shorter', w: ['speed up', 'their frequency changes', 'they stop'], why: 'Frequency stays the same, so λ = v ÷ f decreases.' },
    { q: 'Frequency is…', a: 'the number of waves passing a point each second', w: ['the height of a wave', 'the length of a wave', 'the energy of one wave'], why: 'Measured in hertz (Hz).' }
  ]);
  G.phReflect = () => { const toMirror = pick([20, 25, 30, 35, 40, 50, 55, 60, 70]);
    return num(`<p>A ray of light hits a plane mirror at ${toMirror}° to the <b>mirror surface</b>. What is the angle of reflection?</p>`, 90 - toMirror, '°', [`Angles are measured from the <b>normal</b>, which is at 90° to the mirror.`, `i = 90 − ${toMirror} = ${90 - toMirror}°`, `r = i = <b>${90 - toMirror}°</b>`], 'Measure from the normal, not from the mirror!'); };
  G.phRefract = () => { const q = pick(['n', 'r', 'c', 'c']), nI = pick([1.33, 1.5, 1.6, 2.4]), i = pick([20, 30, 40, 45, 50, 60]);
    if (q === 'n') { const rr = r(Math.asin(Math.sin(i * D) / nI) / D, 1); const nn = Math.sin(i * D) / Math.sin(rr * D); return num(`<p>Light enters a glass block with angle of incidence ${i}°. The angle of refraction is ${n(rr)}°. Find the refractive index.</p>`, nn, '', [`n = sin i ÷ sin r = sin ${i}° ÷ sin ${n(rr)}°`, `n = <b>${n(K.sf(nn, 3))}</b>`], 'n = sin i ÷ sin r'); }
    if (q === 'r') { const rr = Math.asin(Math.sin(i * D) / nI) / D; return Object.assign(num(`<p>Light enters a material of refractive index ${nI} with angle of incidence ${i}°. Find the angle of refraction (1 d.p.).</p>`, 0, '°', [`sin r = sin ${i}° ÷ ${nI} = ${n(K.sf(Math.sin(i * D) / nI, 3))}`, `r = <b>${n(r(rr, 1))}°</b>`], 'sin r = sin i ÷ n, then use sin⁻¹.'), K.accDP(rr, 1)); }
    const c = Math.asin(1 / nI) / D; return Object.assign(num(`<p>What is the critical angle for a material of refractive index ${nI}? (1 d.p.)</p>`, 0, '°', [`sin c = 1 ÷ n = 1 ÷ ${nI}`, `c = sin⁻¹(${n(K.sf(1 / nI, 3))}) = <b>${n(r(c, 1))}°</b>`], 'n = 1 ÷ sin c, so c = sin⁻¹(1 ÷ n).'), K.accDP(c, 1)); };
  bank('phLight', [
    { q: 'The image in a plane mirror is…', a: 'virtual, upright, same size, as far behind the mirror as the object is in front', w: ['real and upside down', 'magnified', 'on the surface of the mirror'], why: 'You cannot catch it on a screen: it is virtual.' },
    { q: 'Light travels from glass into air at more than the critical angle. What happens?', a: 'Total internal reflection: all the light reflects back into the glass', w: ['It refracts towards the normal', 'It travels along the surface only', 'It stops'], why: 'This is how optical fibres trap light.' },
    { q: 'Why does light bend when it enters glass?', a: 'It slows down', w: ['It speeds up', 'Glass absorbs it', 'Its frequency changes'], why: 'A change of speed at an angle causes refraction.' },
    { q: 'Light entering glass from air bends…', a: 'towards the normal', w: ['away from the normal', 'along the surface', 'it does not bend'], why: 'Slower in glass → bends towards the normal.' },
    { q: 'An advantage of optical fibres for telecommunications is…', a: 'they carry lots of data with little signal loss', w: ['they work with sound', 'they are made of copper', 'they need electricity in the fibre'], why: 'Light bounces along by total internal reflection.' },
    { q: 'White light through a prism splits into colours. This is called…', a: 'dispersion', w: ['diffraction', 'reflection', 'total internal reflection'], why: 'Each colour refracts by a slightly different amount.' },
    { q: 'Which colour of visible light has the highest frequency?', a: 'Violet', w: ['Red', 'Green', 'Yellow'], why: 'Order of increasing frequency: red, orange, yellow, green, blue, indigo, violet.' },
    { q: 'Which colour has the longest wavelength?', a: 'Red', w: ['Violet', 'Blue', 'Green'], why: 'Red has the lowest frequency and longest wavelength.' }
  ]);
  G.phMagnif = () => { const o = pick([2, 3, 4, 5, 8]), m = pick([0.5, 1.5, 2, 3, 4]); const im = r(o * m, 2);
    if (Math.random() < .5) return num(`<p>An object ${o} cm tall makes an image ${n(im)} cm tall through a lens. What is the linear magnification?</p>`, m, '', [`magnification = image length ÷ object length = ${n(im)} ÷ ${o} = <b>${n(m)}</b>`], 'magnification = image length ÷ object length (no unit).');
    return num(`<p>A lens gives a magnification of ${n(m)}. The object is ${o} cm tall. How tall is the image?</p>`, im, 'cm', [`image = ${n(m)} × ${o} = <b>${n(im)} cm</b>`], 'image length = magnification × object length'); };
  bank('phLens', [
    { q: 'A converging lens makes parallel rays…', a: 'meet at the principal focus', w: ['spread out', 'stay parallel', 'reflect back'], why: 'The focal length is the distance from the lens to that point.' },
    { q: 'A real image is formed by…', a: 'converging rays, and it can be caught on a screen', w: ['diverging rays', 'a plane mirror', 'rays that never meet'], why: 'Virtual images come from diverging rays.' },
    { q: 'Using a converging lens as a magnifying glass, the object must be…', a: 'closer to the lens than the focal length', w: ['further than twice the focal length', 'exactly at the focus', 'behind the lens'], why: 'Then the image is virtual, upright and magnified.' },
    { q: 'A short-sighted person sees near objects clearly. Which lens corrects it?', a: 'A diverging lens', w: ['A converging lens', 'A plane mirror', 'A prism'], why: 'Their eye focuses light in front of the retina; a diverging lens spreads the rays first.' },
    { q: 'A long-sighted eye is corrected with…', a: 'a converging lens', w: ['a diverging lens', 'a prism', 'no lens'], why: 'The eye focuses behind the retina; a converging lens adds focusing power.' },
    { q: 'The principal axis is…', a: 'the line through the centre of the lens at right angles to it', w: ['the edge of the lens', 'the focal length', 'the image'], why: 'Rays are drawn relative to it.' }
  ]);
  G.phEMcalc = () => { const items = [['radio wave', 1500, 'kHz', 1e3], ['radio wave', 3, 'MHz', 1e6], ['microwave', 0.03, 'MHz', 1e6], ['microwave', 0.12, 'MHz', 1e6]]; const [nm, l, unit, div] = pick(items); const f = 3e8 / l / div;
    return num(`<p>A ${nm} has a wavelength of ${n(l)} m. All EM waves travel at 3.0 × 10⁸ m/s. What is its frequency in ${unit}?</p>`, f, unit, [`f = v ÷ λ = 300 000 000 ÷ ${n(l)} = ${n(3e8 / l)} Hz`, `= <b>${n(f)} ${unit}</b>`], `f = v ÷ λ, then divide by ${n(div)} to get ${unit}.`); };
  bank('phEM', [
    { q: 'Which EM wave has the <b>longest</b> wavelength?', a: 'Radio waves', w: ['Gamma rays', 'Visible light', 'X-rays'], why: 'Order: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma (wavelength decreasing).' },
    { q: 'Which EM wave has the <b>highest</b> frequency?', a: 'Gamma rays', w: ['Radio waves', 'Microwaves', 'Infrared'], why: 'Gamma rays are at the high-frequency end.' },
    { q: 'Which is used in TV remote controllers?', a: 'Infrared', w: ['Ultraviolet', 'X-rays', 'Gamma rays'], why: 'Also thermal imaging and intruder alarms.' },
    { q: 'Mobile phones and satellite TV use…', a: 'microwaves', w: ['gamma rays', 'ultraviolet', 'X-rays'], why: 'Microwaves pass through the atmosphere well.' },
    { q: 'Too much ultraviolet can cause…', a: 'skin cancer and cataracts', w: ['broken bones', 'hearing loss', 'nothing'], why: 'UV is ionising.' },
    { q: 'X-rays and gamma rays are dangerous because they…', a: 'are ionising and can cause cell mutation and cancer', w: ['are very hot', 'are loud', 'travel slowly'], why: 'They can damage DNA.' },
    { q: 'The speed of all EM waves in a vacuum is…', a: '3.0 × 10⁸ m/s', w: ['330 m/s', '3.0 × 10⁶ m/s', 'it depends on the type'], why: 'And about the same in air.' },
    { q: 'Which is used to sterilise medical equipment?', a: 'Gamma rays', w: ['Radio waves', 'Infrared', 'Visible light'], why: 'They kill bacteria.' },
    { q: 'Which EM wave is used for security marking (fluorescent ink)?', a: 'Ultraviolet', w: ['Microwaves', 'Radio waves', 'Gamma rays'], why: 'UV makes special ink glow.' }
  ]);
  G.phEcho = () => { const q = pick(['d', 'd', 'v', 'sonar']), v = pick([330, 340, 340]), t = pick([0.4, 0.5, 1, 1.2, 2, 3]);
    if (q === 'd') return num(`<p>You clap in front of a cliff and hear the echo ${n(t)} s later. Sound travels at ${v} m/s. How far away is the cliff?</p>`, v * t / 2, 'm', [`The sound goes there AND back: total distance = ${v} × ${n(t)} = ${n(v * t)} m`, `distance to cliff = ${n(v * t)} ÷ 2 = <b>${n(v * t / 2)} m</b>`], 'Echo = there and back. Halve the total distance.');
    if (q === 'v') { const d = pick([85, 100, 165, 170]); const tt = pick([0.5, 1, 1.2]); const vv = 2 * d / tt; return num(`<p>A student stands ${d} m from a wall and hears the echo of a clap ${n(tt)} s later. What speed of sound does this give?</p>`, vv, 'm/s', [`distance travelled = 2 × ${d} = ${2 * d} m`, `speed = ${2 * d} ÷ ${n(tt)} = <b>${n(r(vv, 1))} m/s</b>`], 'The sound travels twice the distance to the wall.'); }
    const tt = pick([0.2, 0.4, 0.6, 1]); return num(`<p>A ship's sonar pulse returns from the sea bed after ${n(tt)} s. Sound travels at 1500 m/s in water. How deep is the sea?</p>`, 1500 * tt / 2, 'm', [`total distance = 1500 × ${n(tt)} = ${n(1500 * tt)} m`, `depth = half = <b>${n(750 * tt)} m</b>`], 'There and back: halve it.'); };
  bank('phSound', [
    { q: 'Sound cannot travel through a vacuum because…', a: 'there are no particles to vibrate', w: ['it is too cold', 'there is no light', 'vacuums absorb sound'], why: 'A ringing bell in a jar goes quiet as the air is pumped out.' },
    { q: 'Humans can hear frequencies from about…', a: '20 Hz to 20 000 Hz', w: ['2 Hz to 200 Hz', '200 Hz to 2 000 000 Hz', '0 Hz to 1000 Hz'], why: 'Above 20 kHz is ultrasound.' },
    { q: 'A louder sound has a larger…', a: 'amplitude', w: ['frequency', 'speed', 'wavelength only'], why: 'Higher frequency gives a higher pitch.' },
    { q: 'A higher-pitched sound has a higher…', a: 'frequency', w: ['amplitude', 'speed', 'loudness'], why: 'Pitch depends on frequency.' },
    { q: 'Sound travels fastest in…', a: 'solids', w: ['liquids', 'gases', 'a vacuum'], why: 'In general: solids > liquids > gases.' },
    { q: 'Ultrasound is used for…', a: 'scanning babies before birth', w: ['cooking food', 'X-ray photos', 'TV signals'], why: 'Also cleaning, other medical scans and sonar.' },
    { q: 'Compressions in a sound wave are regions where the particles are…', a: 'close together', w: ['far apart', 'not moving', 'at the top of a crest'], why: 'Rarefactions are where they are spread out.' },
    { q: 'The speed of sound in air is about…', a: '330–350 m/s', w: ['3 × 10⁸ m/s', '1500 m/s', '30 m/s'], why: 'About a million times slower than light.' },
    { q: 'Two instruments play the same note at the same loudness but sound different. They differ in…', a: 'quality (timbre): the shape of the wave', w: ['frequency', 'amplitude', 'speed'], why: 'Their oscilloscope traces have different shapes.' }
  ]);

  // ================= lessons: thermal =================
  R2O.addModule({ subject: 'physics', id: 'ph-thermal', name: 'Thermal physics', icon: '🔥', color: '#dc2626', book: BOOK,
    blurb: 'Syllabus section 2: particles, gases, expansion, specific heat capacity, changes of state and heat transfer.',
    lessons: [
      { id: 'ph-states', title: 'Solids, liquids, gases and particles', obj: ['2.1.1', '2.1.2'], kw: 'states of matter particle model temperature absolute zero', learn: [],
        hook: 'Everything is made of tiny particles that never stop moving.',
        scenes: [
          { say: idea('All matter is made of particles. <b>How close</b> they are and <b>how they move</b> explains everything: a solid keeps its shape, a liquid flows, a gas fills any space. Heating makes particles move <b>faster</b>: that is what temperature measures.') },
          { say: 'Pick a state and turn up the heat.', anim: X([{ k: 's', label: 'State', min: 0, max: 2, v: 0, fmt: i => ['solid', 'liquid', 'gas'][i] }, { k: 'h', label: 'Temperature', min: 0, max: 10, v: 3 }], v => { const st = ['solid', 'liquid', 'gas'][v.s]; return `${S.particles(st, v.h / 10)}<p class="center">${['Fixed pattern, vibrating in place. Fixed shape and volume.', 'Close together but sliding past each other. Fixed volume, takes the container\'s shape.', 'Far apart, moving fast in all directions. Fills the container; easy to squash.'][v.s]}</p><p class="center small muted">Hotter → faster particles (more kinetic energy).</p>`; }) },
          { say: 'Changes of state: solid → liquid is <b>melting</b>, liquid → gas is <b>boiling/evaporation</b>, gas → liquid is <b>condensation</b>, liquid → solid is <b>solidification</b> (freezing).',
            ask: T('Cool particles more and more. At −273 °C (absolute zero) they…', ['have the least possible kinetic energy', 'stop existing', 'move fastest'], 0, 'You cannot get colder than absolute zero.') },
          { say: 'Gas <b>pressure</b> comes from particles hitting the walls. Each hit is a tiny force; millions of hits per second spread over the area give a pressure.', pic: S.particles('gas', .6),
            ask: T('Heat a sealed gas (volume fixed). The pressure…', ['rises: particles hit the walls harder and more often', 'falls', 'stays the same'], 0, 'Faster particles → more force on the walls.') }
        ],
        keys: ['Solid: fixed pattern, vibrate. Liquid: close, slide. Gas: far apart, fast, random.', 'Temperature ∝ average kinetic energy of particles; absolute zero = −273 °C.', 'Gas pressure = force of particle collisions per unit area.'],
        gens: ['phStates'], easy: ['phStates'] },
      { id: 'ph-gas', title: 'Gas pressure and volume', obj: ['2.1.2'], kw: 'gas pressure volume boyle p1v1', learn: [],
        hook: 'Squash a gas into half the space and its pressure doubles.',
        scenes: [
          { say: idea('At a constant temperature, if you squeeze a gas into a <b>smaller volume</b>, the same particles hit the walls <b>more often</b>, so the pressure goes <b>up</b>. Halve the volume → double the pressure. So <b>p × V stays the same</b>.') },
          { say: 'Push the syringe plunger. Temperature stays the same.', anim: X([{ k: 'V', label: 'Volume (cm³)', min: 10, max: 60, step: 5, v: 40 }], v => `${S.svg(300, 90, `<rect x="20" y="25" width="${60 * 4}" height="40" fill="none" stroke="var(--text)" stroke-width="2"/><rect x="20" y="26" width="${v.V * 4}" height="38" fill="color-mix(in srgb, var(--c2) 30%, transparent)"/><rect x="${20 + v.V * 4}" y="20" width="8" height="50" fill="var(--text)"/><line x1="${28 + v.V * 4}" y1="45" x2="290" y2="45" stroke="var(--text)" stroke-width="4"/>`)}<p class="center">p = ${n(r(4800 / v.V, 1))} kPa · V = ${v.V} cm³</p><p class="center bigq">p × V = 4800 (always the same)</p>`) },
          { say: 'The rule (constant temperature):', pic: eq('p₁V₁ = p₂V₂') + K.plot([{ f: x => 4 / x }], [], { xmin: 0, xmax: 6, ymin: 0, ymax: 6, h: 180, gstep: 1, lstep: 100, xlab: 'V', ylab: 'p' }),
            ask: T('A gas at 100 kPa is squashed from 30 cm³ to 10 cm³ (same temperature). New pressure?', ['300 kPa', '33 kPa', '100 kPa', '3000 kPa'], 0, '100 × 30 = p × 10 → p = 300 kPa.') },
          { say: 'In particle terms: heat a gas at <b>constant volume</b> → pressure rises. Heat it at <b>constant pressure</b> → it expands. Squash it at <b>constant temperature</b> → pressure rises.' }
        ],
        keys: ['p₁V₁ = p₂V₂ (constant temperature).', 'p–V graph: a curve; halve V → double p.', 'Explain with particle collisions: more frequent/harder hits = more pressure.'],
        gens: ['phBoyle', 'phStates'], easy: ['phStates'] },
      { id: 'ph-heating', title: 'Expansion and specific heat capacity', obj: ['2.2.1', '2.2.2'], kw: 'thermal expansion specific heat capacity kelvin', learn: [],
        hook: 'Why the sea stays cool on a hot day while the sand burns your feet.',
        scenes: [
          { say: idea('Heating gives particles more energy (more <b>internal energy</b>), so they move more and things <b>expand</b>. Some materials need much more energy to warm up than others: that is their <b>specific heat capacity</b>.') },
          { say: 'Give 42 000 J to 1 kg of different materials.', anim: X([{ k: 'm', label: 'Material', min: 0, max: 3, v: 0, fmt: i => ['water', 'oil', 'aluminium', 'copper'][i] }], v => { const c = [4200, 2000, 900, 390][v.m]; const dT = 42000 / c; return `<p class="center bigq">Δθ = 42 000 ÷ (1 × ${c}) = ${n(r(dT, 1))} °C</p><div class="xbar"><div style="width:${Math.min(100, dT)}%"></div></div><p class="center">c = ${c} J/(kg °C). ${v.m === 0 ? 'Water needs a lot of energy: it warms up slowly.' : 'Lower c → the same energy makes it hotter.'}</p>`; }) },
          { say: 'The equation (rearrange as you need):', pic: eq('specific heat capacity = energy ÷ (mass × temperature change)', 'c = ΔE ÷ (mΔθ), so ΔE = mcΔθ'),
            ask: T('How much energy heats 2 kg of water (c = 4200) by 10 °C?', ['84 000 J', '8 400 J', '4 200 J', '21 000 J'], 0, '2 × 4200 × 10 = 84 000 J.') },
          { say: 'Expansion: gases expand most, then liquids, then solids. It is used in thermometers and bimetallic strips, and it is why bridges and rails have gaps.', ask: T('The kelvin temperature of 27 °C is…', ['300 K', '−246 K', '27 K', '273 K'], 0, 'T = θ + 273.') }
        ],
        keys: ['ΔE = mcΔθ; c in J/(kg °C).', 'Hotter → particles have more kinetic energy (internal energy rises).', 'Expansion: gases > liquids > solids.', 'T (K) = θ (°C) + 273.'],
        gens: ['phSHC', 'phKelvin', 'phExpansion'], easy: ['phExpansion', 'phKelvin'] },
      { id: 'ph-change', title: 'Melting, boiling and evaporation', obj: ['2.2.3'], kw: 'melting boiling evaporation latent heat cooling', learn: [],
        hook: 'Keep heating ice. The thermometer gets stuck at 0 °C. Why?',
        scenes: [
          { say: idea('While a substance <b>changes state</b>, all the energy goes into pulling the particles apart (breaking the forces between them), not into speeding them up. So the <b>temperature stays flat</b>. That hidden energy is <b>latent heat</b>.') },
          { say: 'Heat some ice steadily and watch the temperature.', anim: X([{ k: 't', label: 'Heating time (min)', min: 0, max: 20, v: 3 }], v => { const pts = [[0, -20], [2, 0], [6, 0], [11, 100], [18, 100], [20, 115]]; const seg = pts.filter(p => p[0] <= v.t); const T0 = v.t <= 2 ? -20 + 10 * v.t : v.t <= 6 ? 0 : v.t <= 11 ? (v.t - 6) * 20 : v.t <= 18 ? 100 : 100 + (v.t - 18) * 7.5; seg.push([v.t, T0]);
            const phase = v.t < 2 ? 'Solid warming' : v.t <= 6 ? 'Melting: flat at 0 °C' : v.t < 11 ? 'Liquid warming' : v.t <= 18 ? 'Boiling: flat at 100 °C' : 'Steam warming'; return `${K.plot([], [], { xmin: 0, xmax: 20, ymin: -30, ymax: 130, h: 200, gstep: 1e9, lstep: 1e9, segs: [{ pts: seg }], xlab: 'time', ylab: 'temperature' })}<p class="center bigq">${n(r(T0, 0))} °C · ${phase}</p>`; }) },
          { say: '<b>Evaporation</b> is different from boiling: it happens at <b>any</b> temperature, only at the <b>surface</b>, when the fastest particles escape. The ones left behind are slower on average, so the liquid <b>cools</b>.',
            ask: T('Which makes wet clothes dry fastest?', ['A warm, windy day', 'A cold, still day', 'Folding them up'], 0, 'Higher temperature, bigger surface area and moving air all speed up evaporation.') },
          { say: 'Water melts at 0 °C and boils at 100 °C (at standard atmospheric pressure).' }
        ],
        keys: ['During a change of state the temperature stays constant: energy breaks/forms bonds (latent heat).', 'Evaporation: any temperature, surface only, fastest particles escape → cooling.', 'Faster evaporation: higher temperature, larger area, air movement.'],
        gens: ['phChange'], easy: ['phChange'] },
      { id: 'ph-transfer', title: 'Conduction, convection and radiation', obj: ['2.3.1', '2.3.2', '2.3.3', '2.3.4'], kw: 'conduction convection radiation insulation', learn: [],
        hook: 'Three ways heat sneaks from hot things to cold things.',
        scenes: [
          { say: idea('Thermal energy always flows from <b>hot to cold</b>, in three ways: <b>conduction</b> (passed particle to particle, best in metals), <b>convection</b> (hot fluid rises and carries it), and <b>radiation</b> (infrared waves, which can even cross empty space).') },
          { say: '<b>Conduction</b>: vibrating particles bump their neighbours. Metals also have <b>free electrons</b> that zoom through and carry energy fast, so metals are the best conductors.', pic: '<p class="center bigq">🔥 ⚫⚫⚫⚫⚫⚫ ❄️</p><p class="center small muted">vibrations passed along the lattice</p>' },
          { say: '<b>Convection</b>: heated liquid or gas expands, becomes <b>less dense</b>, and rises. Cooler, denser fluid sinks to take its place: a current.', pic: S.svg(260, 180, `<rect x="40" y="20" width="180" height="150" fill="color-mix(in srgb, var(--c5) 15%, transparent)" stroke="var(--text)" stroke-width="2"/><path d="M130 160 C 130 60, 200 40, 200 100 C 200 150, 140 160, 130 160" fill="none" stroke="var(--c4)" stroke-width="3"/><path d="M130 160 C 130 60, 60 40, 60 100 C 60 150, 120 160, 130 160" fill="none" stroke="var(--c4)" stroke-width="3"/>${S.txt(130, 178, '🔥 heat here', 'tick')}${S.arrow(130, 120, 130, 70, 'var(--c4)', 3)}`),
            ask: T('Where should the freezing compartment of a fridge be?', ['At the top, so cold air sinks through the fridge', 'At the bottom', 'It doesn\'t matter'], 0, 'Cold, dense air sinks: a convection current.') },
          { say: '<b>Radiation</b>: all objects give out infrared. Hotter and bigger surfaces emit more. <b>Dull black</b> is the best emitter and absorber; <b>shiny white/silver</b> reflects.', anim: X([{ k: 'c', label: 'Surface', min: 0, max: 3, v: 0, fmt: i => ['dull black', 'shiny black', 'dull white', 'shiny silver'][i] }], v => `<p class="center bigq">${['🟫 best emitter and absorber', '⬛ good', '⬜ poor', '🪞 worst: best reflector'][v.c]}</p><div class="xbar"><div style="width:${[95, 70, 35, 10][v.c]}%"></div></div><p class="center small muted">rate of infrared emission/absorption</p>`) },
          { say: 'Insulation traps air (a poor conductor that can\'t convect if it\'s trapped). A vacuum flask stops conduction and convection with a vacuum, and radiation with silvered walls.' }
        ],
        keys: ['Conduction: lattice vibrations + free electrons in metals.', 'Convection: fluids; less dense hot fluid rises.', 'Radiation: infrared, no medium needed; dull black best emitter/absorber.', 'Rate of emission rises with temperature and surface area.'],
        gens: ['phTransfer'], easy: ['phTransfer'] }
    ] });

  // ================= lessons: waves =================
  R2O.addModule({ subject: 'physics', id: 'ph-waves', name: 'Waves, light and sound', icon: '🌊', color: '#0891b2', book: BOOK,
    blurb: 'Syllabus section 3: wave properties, reflection, refraction, lenses, the EM spectrum and sound.',
    lessons: [
      { id: 'ph-wave', title: 'What waves are', obj: ['3.1'], kw: 'waves wavelength frequency amplitude transverse longitudinal diffraction', learn: [],
        hook: 'A wave carries energy across a stadium, but every fan stays in their seat.',
        scenes: [
          { say: idea('A wave carries <b>energy</b> from place to place <b>without carrying the stuff</b>. Each bit just wobbles and passes the wobble on. How fast the wave travels = how many waves per second × how long each wave is.') },
          { say: 'Change the frequency and wavelength. Watch the speed.', anim: X([{ k: 'f', label: 'Frequency (Hz)', min: 1, max: 5, v: 2 }, { k: 'l', label: 'Wavelength (m)', min: 1, max: 4, step: 0.5, v: 2 }], v => `${S.wave({ A: 30, lam: v.l * 40 })}<p class="center bigq">v = f × λ = ${v.f} × ${n(v.l)} = ${n(v.f * v.l)} m/s</p><p class="center small muted">${v.f} waves pass each second, each ${n(v.l)} m long.</p>`) },
          { say: 'The labels:', pic: S.wave({ A: 34, lam: 140 }) + eq('wave speed = frequency × wavelength', 'v = fλ'),
            ask: T('A wave has f = 50 Hz and λ = 2 m. Its speed is…', ['100 m/s', '25 m/s', '52 m/s', '0.04 m/s'], 0, '50 × 2 = 100 m/s.') },
          { say: '<b>Transverse</b>: wobble at right angles to the travel (light, water waves, S-waves). <b>Longitudinal</b>: wobble along the travel, with compressions and rarefactions (sound, P-waves).', pic: S.longi() },
          { say: 'Waves can <b>reflect</b>, <b>refract</b> (bend when their speed changes) and <b>diffract</b> (spread out through gaps and around edges). Diffraction is biggest when the gap is about one wavelength wide.', ask: T('Why can you hear someone round a corner but not see them?', ['Sound has a much longer wavelength, so it diffracts more', 'Sound is faster than light', 'Light cannot reflect'], 0, 'Sound wavelengths are about a metre, like doorways; light wavelengths are tiny.') }
        ],
        keys: ['Waves transfer energy, not matter.', 'v = fλ.', 'Transverse ⟂; longitudinal ∥ (compressions/rarefactions).', 'Reflection, refraction (speed change), diffraction (gap ≈ λ → most spreading).'],
        gens: ['phWaveEq', 'phWaveCount', 'phWaveIdea'], easy: ['phWaveIdea'] },
      { id: 'ph-reflect', title: 'Reflection and refraction of light', obj: ['3.2.1', '3.2.2'], kw: 'reflection refraction refractive index critical angle total internal reflection', learn: [],
        hook: 'Mirrors, bent straws and the cables that carry the internet.',
        scenes: [
          { say: idea('Light <b>bounces</b> off a mirror at the same angle it arrives (angles measured from the <b>normal</b>). When it enters glass it <b>slows down</b>, and slowing down at an angle makes it <b>bend</b>.') },
          { say: 'Change the angle of incidence on a mirror.', anim: X([{ k: 'i', label: 'Angle of incidence', min: 10, max: 80, step: 5, v: 35 }], v => `${S.reflect(v.i)}<p class="center bigq">i = r = ${v.i}°</p>`) },
          { say: 'Now light enters glass (refractive index 1.5).', anim: X([{ k: 'i', label: 'Angle of incidence', min: 0, max: 80, step: 5, v: 40 }], v => `${S.refract(v.i, 1.5)}<p class="center">n = sin i ÷ sin r = sin ${v.i}° ÷ sin ${n(r(Math.asin(Math.sin(v.i * D) / 1.5) / D, 1))}° = <b>1.5</b></p><p class="center small muted">It bends towards the normal as it slows down.</p>`) },
          { say: 'The refractive index measures how much a material bends light:', pic: eq('n = sin i ÷ sin r') + eq('n = 1 ÷ sin c', 'c = the critical angle'),
            ask: T('Going from glass to air, if the angle is bigger than the critical angle, the light…', ['totally internally reflects', 'refracts out', 'stops'], 0, 'Total internal reflection: no light escapes.') },
          { say: '<b>Optical fibres</b> trap light by total internal reflection, so it zig-zags along the fibre carrying internet data with little loss.' }
        ],
        keys: ['Reflection: i = r, measured from the normal.', 'Plane mirror image: virtual, upright, same size, same distance behind.', 'n = sin i ÷ sin r; n = 1 ÷ sin c.', 'Total internal reflection when the angle in the denser medium exceeds c.'],
        gens: ['phReflect', 'phRefract', 'phLight'], easy: ['phLight'] },
      { id: 'ph-lens', title: 'Lenses, the eye and colours', obj: ['3.2.3', '3.2.4'], kw: 'converging lens diverging lens focal length magnification dispersion eye', learn: [],
        hook: 'How a single curved piece of glass can make a picture.',
        scenes: [
          { say: idea('A <b>converging</b> lens bends light rays <b>together</b> to a point (the principal focus). Where you put the object decides the image: far away gives a small real image; closer than the focus gives a big <b>virtual</b> image (a magnifying glass).') },
          { say: 'Move the object. The focal length is 5 units.', anim: X([{ k: 'u', label: 'Object distance', min: 2, max: 20, v: 12 }], v => { if (v.u === 5) return `<p class="center bigq">At the focus the rays come out parallel: no image forms.</p>`; const L = S.lens(v.u, 5); const real = L.v > 0; return `${L.svg}<p class="center bigq">${real ? 'Real, upside down' : 'Virtual, upright'} · magnification ${n(r(Math.abs(L.m), 2))}</p><p class="center small muted">${real ? 'Converging rays meet: you could catch it on a screen.' : 'Rays spread out; your eye traces them back (dashed).'}</p>`; }) },
          { say: 'Magnification compares sizes:', pic: eq('linear magnification = image length ÷ object length'),
            ask: T('A 2 cm object gives a 6 cm image. Magnification?', ['3', '12', '0.33', '4'], 0, '6 ÷ 2 = 3.') },
          { say: 'Eyes: <b>short-sighted</b> eyes focus in front of the retina (fix: <b>diverging</b> lens). <b>Long-sighted</b> eyes focus behind it (fix: <b>converging</b> lens).' },
          { say: 'A prism splits white light into colours (<b>dispersion</b>): red bends least, violet most. In order of increasing frequency: <b>red, orange, yellow, green, blue, indigo, violet</b>.', pic: S.spectrum(3) }
        ],
        keys: ['Converging lens: parallel rays meet at the principal focus; focal length = lens to focus.', 'Real image: converging rays. Virtual: diverging rays.', 'magnification = image length ÷ object length.', 'Dispersion: ROYGBIV, red lowest frequency.'],
        gens: ['phMagnif', 'phLens', 'phLight'], easy: ['phLens'] },
      { id: 'ph-em', title: 'The electromagnetic spectrum', obj: ['3.3'], kw: 'electromagnetic spectrum radio microwave infrared ultraviolet x-ray gamma', learn: [],
        hook: 'Light is just one small slice of a huge family of waves.',
        scenes: [
          { say: idea('Radio, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays are all the <b>same kind of wave</b>, travelling at the same speed (3.0 × 10⁸ m/s in a vacuum). They differ only in <b>wavelength</b>, which decides what they are good for and how dangerous they are.') },
          { say: 'Slide along the spectrum.', anim: X([{ k: 'i', label: 'Region', min: 0, max: 6, v: 3, fmt: i => S.EM[i] }], v => `${S.spectrum(v.i)}<p class="center bigq">${S.EM[v.i]}</p><p class="center">${['Radio and TV, astronomy', 'Satellite TV, mobile phones, Bluetooth, microwave ovens', 'Remote controls, thermal imaging, intruder alarms, heaters, optical fibres', 'Seeing, photography', 'Security marking, sterilising water', 'Medical images, airport security', 'Sterilising equipment, irradiating food, treating cancer'][v.i]}</p><p class="center small muted">${v.i >= 4 ? '⚠️ Ionising: can damage cells and cause cancer.' : v.i >= 1 && v.i <= 2 ? '⚠️ Too much can heat body tissue and burn.' : 'Low energy.'}</p>`) },
          { say: 'Order of <b>increasing frequency</b> (decreasing wavelength): <b>R</b>adio, <b>M</b>icrowave, <b>I</b>nfrared, <b>V</b>isible, <b>U</b>ltraviolet, <b>X</b>-ray, <b>G</b>amma. ("Rich Men In Vegas Use eXpensive Gadgets.")',
            ask: T('Which has a longer wavelength than visible light?', ['Infrared', 'Ultraviolet', 'X-rays', 'Gamma rays'], 0, 'Infrared sits just past red.') },
          { say: 'Use v = fλ with v = 3.0 × 10⁸ m/s for any EM wave.' }
        ],
        keys: ['All EM waves: transverse, 3.0 × 10⁸ m/s in a vacuum (≈ same in air).', 'Order: radio, microwave, IR, visible, UV, X-ray, gamma (frequency ↑).', 'Dangers: heating (microwave/IR); ionising (UV, X, γ).'],
        gens: ['phEMcalc', 'phEM'], easy: ['phEM'] },
      { id: 'ph-sound', title: 'Sound and ultrasound', obj: ['3.4'], kw: 'sound echo pitch loudness ultrasound speed of sound', learn: [],
        hook: 'Bats, ships and doctors all "see" with sound.',
        scenes: [
          { say: idea('Sound is a <b>vibration passed through particles</b>: a longitudinal wave of squashes (compressions) and stretches (rarefactions). No particles, no sound, so sound can\'t cross a vacuum. Bigger vibrations are <b>louder</b>; faster vibrations are <b>higher</b>.') },
          { say: 'Change the sound. The oscilloscope shows its wave.', anim: X([{ k: 'a', label: 'Loudness (amplitude)', min: 1, max: 3.5, step: 0.5, v: 2 }, { k: 'f', label: 'Pitch (frequency)', min: 1, max: 6, v: 2 }], v => `${S.scope(v.f, v.a)}<p class="center">Taller wave = <b>louder</b>. More waves across = <b>higher pitch</b>.</p>`) },
          { say: 'An <b>echo</b> is reflected sound. The sound travels there <b>and back</b>.', pic: '<p class="center bigq">👏 → → → 🧱<br>👂 ← ← ← 🧱</p>',
            ask: T('An echo returns after 2 s. Speed of sound 340 m/s. Distance to the wall?', ['340 m', '680 m', '170 m', '1360 m'], 0, '340 × 2 = 680 m there and back, so 340 m to the wall.') },
          { say: 'Humans hear 20 Hz to 20 000 Hz. Above 20 kHz is <b>ultrasound</b>: used to scan unborn babies, clean delicate objects, and in sonar. Sound travels fastest in solids, then liquids, then gases (≈ 330–350 m/s in air).' }
        ],
        keys: ['Sound: longitudinal, needs a medium.', 'Loudness ↔ amplitude; pitch ↔ frequency.', 'Echo: distance = speed × time ÷ 2.', 'Hearing range 20 Hz–20 kHz; ultrasound > 20 kHz.'],
        gens: ['phEcho', 'phSound'], easy: ['phSound'] }
    ] });
})();
