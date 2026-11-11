// Biology 5090, part 2: transport in humans (11), disease and immunity (12), excretion (13),
// coordination and control (14) and plant responses (15).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Biology 2e', 'https://openstax.org/details/books/biology-2e'];

  // ================= generators =================
  G.bHeartRate = () => { const s = pick([10, 15, 20, 30]), b = pick([18, 20, 22, 25, 30, 35, 40]); const bpm = b * 60 / s;
    return num(`<p>A student counts ${b} pulse beats in ${s} seconds. What is the heart rate in beats per minute?</p>`, bpm, 'bpm', [`60 ÷ ${s} = ${60 / s}, so multiply by ${60 / s}`, `${b} × ${60 / s} = <b>${n(bpm)} beats per minute</b>`], 'Scale up to 60 seconds.'); };
  bank('bHeart', [
    { q: 'Blood leaves the heart in…', a: 'arteries', w: ['veins', 'capillaries', 'lymph vessels'], why: 'Veins bring it back to the heart.' },
    { q: 'Which side of the heart pumps blood to the lungs?', a: 'The right side', w: ['The left side', 'Both sides equally', 'Neither'], why: 'The right ventricle → pulmonary artery → lungs.' },
    { q: 'The left ventricle wall is thicker than the right because…', a: 'it pumps blood at high pressure all round the body', w: ['it pumps blood to the lungs', 'it holds more blood', 'it has more valves'], why: 'The right only pumps to the nearby lungs (lower pressure, which also protects the delicate alveoli).' },
    { q: 'Atria have thinner walls than ventricles because…', a: 'they only pump blood a short distance, into the ventricles', w: ['they pump blood around the body', 'they have no muscle', 'they carry oxygen'], why: 'Ventricles do the heavy pumping.' },
    { q: 'Valves in the heart…', a: 'stop blood flowing backwards', w: ['pump the blood', 'make the heartbeat', 'add oxygen to blood'], why: 'Atrioventricular and semilunar valves; their closing makes the "lub-dub" sound.' },
    { q: 'A double circulation means…', a: 'blood passes through the heart twice in each complete circuit', w: ['there are two hearts', 'blood goes round twice as fast', 'blood only goes to the lungs'], why: 'Low pressure to the lungs, high pressure to the body.' },
    { q: 'Coronary heart disease is caused by…', a: 'blockage of the coronary arteries that supply the heart muscle', w: ['a hole in the septum', 'too many red blood cells', 'weak valves only'], why: 'Risk factors: diet, inactivity, stress, smoking, genes, age, gender.' },
    { q: 'Which reduces the risk of coronary heart disease?', a: 'A low saturated-fat diet and regular exercise', w: ['Smoking', 'Stress', 'A sedentary lifestyle'], why: 'Diet and exercise are the main things you can change.' },
    { q: 'During exercise, heart rate increases to…', a: 'deliver more oxygen and glucose to muscles and remove more CO₂', w: ['cool the body', 'slow digestion only', 'make more red blood cells'], why: 'Muscles respire faster.' },
    { q: 'Heart activity can be monitored by…', a: 'an ECG, the pulse rate, or listening to the valves', w: ['a thermometer', 'a urine test', 'an X-ray only'], why: 'All three are in the syllabus.' }
  ]);
  bank('bVessels', [
    { q: 'Arteries have thick, muscular, elastic walls because…', a: 'they carry blood at high pressure', w: ['they carry blood at low pressure', 'they exchange materials', 'they have valves'], why: 'The elastic tissue stretches and recoils with each heartbeat.' },
    { q: 'Veins have valves because…', a: 'the blood is at low pressure and could flow backwards', w: ['the pressure is very high', 'they carry oxygenated blood', 'they exchange gases'], why: 'Veins have thin walls and a wide lumen.' },
    { q: 'Capillary walls are one cell thick so that…', a: 'substances can diffuse quickly between blood and cells', w: ['they can withstand high pressure', 'they can pump blood', 'blood flows backwards'], why: 'Exchange happens via tissue fluid.' },
    { q: 'Which vessel carries blood from the heart to the lungs?', a: 'Pulmonary artery', w: ['Pulmonary vein', 'Aorta', 'Vena cava'], why: 'The pulmonary vein brings oxygenated blood back to the heart.' },
    { q: 'Which vessel carries oxygenated blood from the heart to the body?', a: 'Aorta', w: ['Vena cava', 'Pulmonary artery', 'Hepatic portal vein'], why: 'The vena cava returns deoxygenated blood to the heart.' },
    { q: 'The renal artery carries blood to the…', a: 'kidneys', w: ['liver', 'lungs', 'heart'], why: 'The renal vein carries it away.' }
  ]);
  bank('bBlood', [
    { q: 'Red blood cells…', a: 'transport oxygen (using haemoglobin)', w: ['make antibodies', 'clot the blood', 'engulf bacteria'], why: 'They have no nucleus and a biconcave shape.' },
    { q: 'Phagocytes…', a: 'engulf and digest pathogens', w: ['make antibodies', 'carry oxygen', 'make fibrin'], why: 'Lymphocytes make antibodies.' },
    { q: 'Platelets help clotting by…', a: 'converting soluble fibrinogen into insoluble fibrin', w: ['carrying oxygen', 'making antibodies', 'digesting bacteria'], why: 'The fibrin mesh traps cells, stopping blood loss and pathogen entry.' },
    { q: 'Plasma transports…', a: 'dissolved glucose, amino acids, CO₂, urea, hormones, ions and blood cells', w: ['only oxygen', 'only red blood cells', 'nothing: it is waste'], why: 'It is mostly water.' },
    { q: 'Substances pass from capillaries to body cells via…', a: 'tissue fluid', w: ['the lymph only', 'the veins', 'the heart'], why: 'Oxygen and glucose diffuse out; CO₂ and urea diffuse back in.' }
  ]);
  bank('bDisease', [
    { q: 'A pathogen is…', a: 'a disease-causing organism', w: ['a white blood cell', 'an antibody', 'a vaccine'], why: 'E.g. bacteria, viruses, parasites.' },
    { q: 'A transmissible disease is one where…', a: 'the pathogen can pass from one host to another', w: ['it is caused by genes', 'it is caused by poor diet', 'it only affects plants'], why: 'By direct contact or indirectly (surfaces, food, animals, air).' },
    { q: 'Which is a barrier to pathogens?', a: 'Stomach acid', w: ['Red blood cells', 'Insulin', 'Bile'], why: 'Also skin, nose hairs and mucus.' },
    { q: 'Malaria is caused by…', a: 'a parasite carried by mosquitoes (the vector)', w: ['a virus in water', 'a bacterium in food', 'a fungus on skin'], why: 'Control: nets, insecticides, draining standing water where larvae grow.' },
    { q: 'HIV is transmitted by…', a: 'body fluids: unprotected sex, shared needles, mother to baby', w: ['mosquito bites', 'shaking hands', 'contaminated water'], why: 'Control: condoms, not sharing needles, testing, treatment.' },
    { q: 'Cholera spreads mainly through…', a: 'water contaminated with faeces', w: ['the air', 'mosquitoes', 'touching skin'], why: 'Clean water, good hygiene and sewage treatment control it.' },
    { q: 'Cholera causes diarrhoea because its toxin…', a: 'makes chloride ions pass into the gut, and water follows by osmosis', w: ['destroys red blood cells', 'blocks the oesophagus', 'kills white blood cells'], why: 'Leads to dehydration and loss of ions.' },
    { q: 'Which part of tobacco smoke causes cancer?', a: 'Tar', w: ['Nicotine', 'Carbon monoxide', 'Oxygen'], why: 'Nicotine is addictive; carbon monoxide reduces oxygen carried by the blood.' },
    { q: 'Smoking during pregnancy is associated with…', a: 'reduced birth weight', w: ['bigger babies', 'no effect', 'better lung development'], why: 'Carbon monoxide reduces oxygen to the fetus.' },
    { q: 'Excessive alcohol causes…', a: 'slower reactions, reduced self-control and liver damage', w: ['faster reactions', 'stronger bones', 'better memory'], why: 'It is a depressant, with social effects too.' }
  ]);
  bank('bImmunity', [
    { q: 'Antibiotics…', a: 'kill bacteria but have no effect on viruses', w: ['kill viruses', 'kill both bacteria and viruses', 'are vaccines'], why: 'So they don\'t cure colds or flu.' },
    { q: 'How can the spread of antibiotic-resistant bacteria (like MRSA) be reduced?', a: 'Using antibiotics only when essential and finishing the course', w: ['Using antibiotics for every cold', 'Stopping antibiotics halfway', 'Sharing antibiotics'], why: 'Less use = less selection for resistant bacteria.' },
    { q: 'Antigens are…', a: 'molecules on a pathogen with a specific shape', w: ['proteins made by lymphocytes', 'white blood cells', 'types of antibiotic'], why: 'Each pathogen has its own antigens.' },
    { q: 'Antibodies work by…', a: 'binding to specific antigens, destroying pathogens or marking them for phagocytes', w: ['digesting food', 'carrying oxygen', 'making antigens'], why: 'They have a complementary shape to the antigen.' },
    { q: 'A vaccine contains…', a: 'weakened pathogens or their antigens', w: ['antibodies', 'antibiotics', 'white blood cells'], why: 'Lymphocytes respond and make memory cells for long-term immunity.' },
    { q: 'Why does a vaccinated person not get ill from the real pathogen later?', a: 'Memory cells make antibodies quickly before the pathogen can multiply', w: ['The vaccine kills all pathogens forever', 'They have no antigens', 'Antibiotics stay in the blood'], why: 'A faster, bigger secondary response.' },
    { q: 'Passive immunity is…', a: 'short-term protection from antibodies received from someone else (placenta, breast milk)', w: ['long-term immunity from memory cells', 'immunity from vaccination', 'immunity from antibiotics'], why: 'No memory cells are made.' },
    { q: 'HIV weakens the immune system by…', a: 'reducing the number of lymphocytes, so fewer antibodies are made', w: ['destroying red blood cells', 'blocking arteries', 'killing bacteria'], why: 'This can lead to AIDS.' },
    { q: 'Vaccinating most of a population controls disease because…', a: 'the pathogen has fewer people to spread between', w: ['vaccines kill mosquitoes', 'it makes antibiotics stronger', 'everyone becomes resistant to antibiotics'], why: 'This protects unvaccinated people too.' }
  ]);
  bank('bExcretion', [
    { q: 'Excretion is…', a: 'removing toxic materials and waste products of metabolism', w: ['getting rid of undigested food', 'breathing in', 'sweating only'], why: 'Undigested food leaving is egestion, not excretion.' },
    { q: 'Urea is made in the…', a: 'liver, from excess amino acids', w: ['kidneys', 'bladder', 'lungs'], why: 'Deamination removes the nitrogen-containing part.' },
    { q: 'Carbon dioxide is excreted by the…', a: 'lungs', w: ['kidneys', 'liver', 'skin'], why: 'It is a waste product of respiration.' },
    { q: 'In the glomerulus, which is filtered OUT of the blood?', a: 'Water, glucose, urea and ions', w: ['Red blood cells', 'Large proteins', 'Platelets'], why: 'Cells and large proteins are too big.' },
    { q: 'Which is reabsorbed COMPLETELY back into the blood?', a: 'Glucose', w: ['Urea', 'All the water', 'All the ions'], why: 'Most water and some ions are reabsorbed; urea stays in the urine.' },
    { q: 'The ureter carries urine from…', a: 'the kidney to the bladder', w: ['the bladder to outside', 'the liver to the kidney', 'the kidney to the liver'], why: 'The urethra carries it out of the body.' },
    { q: 'Why must urea be excreted?', a: 'It is toxic', w: ['It is too valuable', 'It is a source of energy', 'It makes blood thick'], why: 'It would build up and poison cells.' },
    { q: 'The liver assimilates amino acids by…', a: 'converting them into proteins', w: ['turning them into glucose', 'storing them as fat', 'excreting them directly'], why: 'Excess amino acids are deaminated to urea.' }
  ]);
  bank('bNerves', [
    { q: 'The central nervous system is…', a: 'the brain and spinal cord', w: ['all the nerves in the body', 'the eyes and ears', 'the heart and lungs'], why: 'The peripheral nervous system is the nerves outside them.' },
    { q: 'A reflex action is…', a: 'a rapid, automatic response to a stimulus', w: ['a slow, conscious decision', 'a hormone response', 'a learned skill'], why: 'E.g. pulling your hand from a hot pan.' },
    { q: 'The order in a reflex arc is…', a: 'receptor → sensory neurone → relay neurone → motor neurone → effector', w: ['effector → motor → relay → sensory → receptor', 'receptor → motor → sensory → effector', 'brain → receptor → effector'], why: 'The relay neurone is in the spinal cord.' },
    { q: 'An effector is…', a: 'a muscle or gland that responds', w: ['a receptor', 'a neurone', 'a synapse'], why: 'Muscles contract; glands secrete.' },
    { q: 'At a synapse, the signal crosses the gap by…', a: 'neurotransmitter molecules diffusing and binding to receptor proteins', w: ['an electrical spark', 'blood flow', 'osmosis'], why: 'Released from vesicles; then an impulse starts in the next neurone.' },
    { q: 'Synapses make sure that impulses…', a: 'travel in one direction only', w: ['travel both ways', 'stop completely', 'go faster'], why: 'Only one side releases neurotransmitter; only the other has receptors.' }
  ]);
  bank('bEye', [
    { q: 'Which part of the eye refracts light most?', a: 'The cornea', w: ['The iris', 'The retina', 'The optic nerve'], why: 'The lens fine-tunes the focus.' },
    { q: 'The iris…', a: 'controls how much light enters through the pupil', w: ['focuses light', 'detects colour', 'carries impulses to the brain'], why: 'Pupil reflex.' },
    { q: 'In bright light, the pupil gets smaller because…', a: 'the circular muscles of the iris contract and the radial muscles relax', w: ['the radial muscles contract', 'the lens gets thicker', 'the retina shrinks'], why: 'Antagonistic muscles. In dim light the radial muscles contract and the pupil widens.' },
    { q: 'To focus on a NEAR object…', a: 'the ciliary muscles contract, ligaments slacken, and the lens becomes fatter', w: ['the ciliary muscles relax and the lens becomes thinner', 'the iris closes', 'the cornea moves'], why: 'A fatter lens refracts light more. This is accommodation.' },
    { q: 'To focus on a DISTANT object…', a: 'the ciliary muscles relax, ligaments tighten, and the lens becomes thinner', w: ['the ciliary muscles contract', 'the lens becomes fatter', 'the pupil closes'], why: 'Less refraction is needed.' },
    { q: 'The fovea…', a: 'has the greatest density of light receptors', w: ['has no receptors (blind spot)', 'controls the pupil', 'focuses light'], why: 'The blind spot is where the optic nerve leaves.' },
    { q: 'The optic nerve…', a: 'carries impulses from the retina to the brain', w: ['focuses light', 'controls the lens', 'changes pupil size'], why: 'The retina contains the light receptors.' }
  ]);
  bank('bHormones', [
    { q: 'A hormone is…', a: 'a chemical made by a gland and carried in the blood to target organs', w: ['an electrical impulse', 'an enzyme in the gut', 'a type of neurone'], why: 'Slower but longer-lasting than nerves.' },
    { q: 'Adrenaline is made by the…', a: 'adrenal glands', w: ['pancreas', 'pituitary gland', 'ovaries'], why: 'Fight or flight.' },
    { q: 'Adrenaline…', a: 'increases blood glucose concentration and heart rate', w: ['lowers blood glucose', 'slows the heart', 'makes you sleepy'], why: 'E.g. before an exam, a race, or in danger.' },
    { q: 'Insulin and glucagon are made by the…', a: 'pancreas', w: ['liver', 'adrenal glands', 'kidneys'], why: 'They control blood glucose.' },
    { q: 'FSH and LH are made by the…', a: 'pituitary gland', w: ['ovaries', 'testes', 'pancreas'], why: 'They control the menstrual cycle.' },
    { q: 'Compared with nerves, hormones…', a: 'act more slowly but their effects last longer', w: ['act faster and last shorter', 'are electrical', 'never affect organs'], why: 'Nerves are fast and short-lived.' },
    { q: 'Homeostasis is…', a: 'keeping a constant internal environment', w: ['changing body temperature with the weather', 'growing taller', 'digesting food'], why: 'Controlled by negative feedback around a set point.' },
    { q: 'Negative feedback means…', a: 'a change away from the set point triggers responses that bring it back', w: ['changes are made bigger', 'nothing happens', 'the set point keeps rising'], why: 'E.g. body temperature, blood glucose.' },
    { q: 'When you are too hot, arterioles to the skin…', a: 'widen (vasodilation), so more heat is lost from the skin', w: ['narrow', 'stop working', 'shiver'], why: 'Sweating also cools you by evaporation.' },
    { q: 'Shivering helps you warm up because…', a: 'muscle contractions release heat from respiration', w: ['it widens blood vessels', 'it makes sweat', 'it reduces respiration'], why: 'Hair erector muscles also trap a layer of air.' },
    { q: 'The body\'s temperature control centre is the…', a: 'hypothalamus', w: ['pancreas', 'liver', 'cerebellum'], why: 'It receives information from temperature receptors in the skin.' },
    { q: 'After a meal, blood glucose rises. The pancreas releases…', a: 'insulin, so the liver converts glucose to glycogen', w: ['glucagon', 'adrenaline', 'FSH'], why: 'Glucagon does the opposite when glucose is low.' },
    { q: 'Signs of Type 1 diabetes include…', a: 'high blood glucose and glucose in the urine', w: ['low blood glucose only', 'too much insulin', 'fever'], why: 'Treated by injecting insulin.' }
  ]);
  bank('bTropism', [
    { q: 'Shoots growing towards light is…', a: 'positive phototropism', w: ['negative phototropism', 'positive gravitropism', 'transpiration'], why: 'Roots grow towards gravity (positive gravitropism).' },
    { q: 'Auxin is made in the…', a: 'shoot tip', w: ['roots only', 'flowers', 'leaves only'], why: 'It spreads back through the plant.' },
    { q: 'When light comes from one side, auxin…', a: 'collects on the shaded side, making those cells elongate so the shoot bends towards the light', w: ['collects on the bright side', 'is destroyed', 'makes cells shrink'], why: 'Auxin stimulates cell elongation.' },
    { q: 'A shoot growing upwards, away from gravity, shows…', a: 'negative gravitropism', w: ['positive gravitropism', 'phototropism', 'no response'], why: 'Roots show positive gravitropism.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'biology', id: 'bi-circulation', name: 'Transport and health', icon: '❤️', color: '#dc2626', book: BOOK,
    blurb: 'Syllabus sections 11–12: the heart, blood vessels, blood, disease, antibiotics and immunity.',
    lessons: [
      { id: 'bi-heart', title: 'The heart and circulation', obj: ['11.1', '11.2'], kw: 'heart circulation double circulation coronary heart disease', learn: [],
        hook: 'A fist-sized pump that beats 100 000 times a day.',
        scenes: [
          { say: idea('The heart is <b>two pumps side by side</b>. The <b>right</b> side sends blood to the <b>lungs</b> to pick up oxygen; the <b>left</b> side sends it round the <b>body</b>. Blood passes through the heart <b>twice</b> per lap: a <b>double circulation</b>. <b>Valves</b> keep it flowing one way.') },
          { say: 'Follow a drop of blood.', anim: X([{ k: 's', label: 'Step', min: 0, max: 5, v: 0, fmt: i => ['body', 'right atrium', 'right ventricle', 'lungs', 'left atrium', 'left ventricle'][i] }], v => `<p class="center bigq">${['🫀⬅️🧍 vena cava', '🔵 right atrium', '🔵 right ventricle → pulmonary artery', '🫁 lungs: picks up O₂', '🔴 pulmonary vein → left atrium', '🔴 left ventricle → aorta → body'][v.s]}</p><p class="center small muted">${v.s < 3 ? 'Deoxygenated blood (shown blue)' : 'Oxygenated blood (shown red)'}</p>`) },
          { say: 'Why the walls differ: the <b>left ventricle</b> is the thickest because it pumps at <b>high pressure</b> all round the body; the right only pumps to the nearby lungs (lower pressure). <b>Atria</b> are thin: they only push blood into the ventricles.',
            ask: T('Why does a double circulation help?', ['Low pressure to the lungs, high pressure to the body', 'Blood visits the lungs twice', 'It needs fewer valves'], 0, 'Delicate lungs + fast delivery to the body.') },
          { say: 'Exercise and your heart rate.', anim: X([{ k: 'e', label: 'Exercise level', min: 0, max: 10, v: 0 }], v => `<p class="center bigq">❤️ ${70 + v.e * 11} bpm</p><p class="center small muted">Muscles need more oxygen and glucose, and must lose more CO₂.</p>`) },
          { say: '<b>Coronary heart disease</b>: the coronary arteries feeding the heart muscle get blocked. Risks: fatty diet, no exercise, stress, smoking, genes, age, gender. A good diet and exercise reduce the risk.' }
        ],
        keys: ['Right side → lungs; left side → body. Double circulation.', 'Left ventricle thickest (highest pressure); atria thin.', 'Valves (atrioventricular, semilunar) stop backflow.', 'Monitor with ECG, pulse, valve sounds. CHD: blocked coronary arteries.'],
        gens: ['bHeartRate', 'bHeart'], easy: ['bHeart'] },
      { id: 'bi-blood', title: 'Blood vessels and blood', obj: ['11.3', '11.4'], kw: 'arteries veins capillaries red blood cells white blood cells platelets plasma', learn: [],
        hook: 'Your blood vessels would wrap around the Earth twice.',
        scenes: [
          { say: idea('Each vessel is built for its <b>pressure</b>. <b>Arteries</b> take the pounding from the heart (thick, muscular, elastic). <b>Veins</b> carry slow, low-pressure blood back (thin, wide, with <b>valves</b>). <b>Capillaries</b> are one cell thick so substances can <b>swap</b> with cells.') },
          { say: 'Compare the vessels.', anim: X([{ k: 'v', label: 'Vessel', min: 0, max: 2, v: 0, fmt: i => ['artery', 'vein', 'capillary'][i] }], v => { const d = [[60, 18, 'thick muscular, elastic wall · narrow lumen · no valves · high pressure'], [60, 34, 'thin wall · wide lumen · valves · low pressure'], [12, 8, 'one cell thick · tiny lumen · exchange with cells']][v.v]; return `${S.svg(160, 140, `<circle cx="80" cy="70" r="${d[0]}" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/><circle cx="80" cy="70" r="${d[1]}" fill="var(--surface)" stroke="#b91c1c"/>`, 160)}<p class="center">${d[2]}</p>`; }) },
          { say: 'What blood is made of:', pic: '<ul><li>🔴 <b>Red blood cells</b>: carry oxygen (haemoglobin)</li><li>⚪ <b>White blood cells</b>: <b>lymphocytes</b> make antibodies; <b>phagocytes</b> engulf pathogens</li><li>🩹 <b>Platelets</b>: clotting (fibrinogen → fibrin), stopping blood loss and pathogens</li><li>💛 <b>Plasma</b>: carries glucose, amino acids, CO₂, urea, hormones, ions, vitamins, proteins and the cells</li></ul>',
            ask: T('Which vessel has valves?', ['Vein', 'Artery', 'Capillary'], 0, 'Low pressure means blood could flow backwards.') },
          { say: 'Main vessels: aorta, vena cava, pulmonary artery and vein, hepatic artery, hepatic vein, hepatic portal vein, renal artery and vein. Capillaries swap substances with cells through <b>tissue fluid</b>.' }
        ],
        keys: ['Artery: thick elastic muscular wall, narrow lumen, high pressure.', 'Vein: thin wall, wide lumen, valves, low pressure.', 'Capillary: one cell thick, exchange via tissue fluid.', 'Red cells, lymphocytes, phagocytes, platelets, plasma.'],
        gens: ['bVessels', 'bBlood'], easy: ['bBlood'] },
      { id: 'bi-disease', title: 'Disease', obj: ['12.1'], kw: 'pathogens transmissible disease malaria hiv cholera smoking alcohol', learn: [],
        hook: 'How tiny invaders spread, and how to stop them.',
        scenes: [
          { say: idea('<b>Pathogens</b> (bacteria, viruses, parasites) cause disease. A <b>transmissible</b> disease passes between people, directly (blood, body fluids) or indirectly (surfaces, food, water, air, animals). To stop it, <b>break the chain</b> of transmission.') },
          { say: 'Pick a disease.', anim: X([{ k: 'd', label: 'Disease', min: 0, max: 2, v: 0, fmt: i => ['malaria', 'HIV', 'cholera'][i] }], v => { const d = [['🦟 parasite carried by mosquitoes (a vector)', 'mosquito bites', 'nets, insecticides, drain standing water (where larvae grow), kill larvae'], ['🦠 virus that attacks lymphocytes → can lead to AIDS', 'body fluids: unprotected sex, shared needles, mother to baby', 'condoms, no needle sharing, testing, treatment'], ['🦠 bacterium in water contaminated with faeces', 'drinking contaminated water', 'clean water, sewage treatment, hygiene, safe food preparation']][v.d]; return `<p class="center bigq">${d[0]}</p><p>🔁 <b>Spread:</b> ${d[1]}</p><p>🛡️ <b>Control:</b> ${d[2]}</p>`; }) },
          { say: 'Cholera\'s toxin makes <b>chloride ions</b> pour into the small intestine; <b>water follows by osmosis</b> → severe diarrhoea, dehydration and loss of ions.', ask: T('The body\'s barriers to pathogens include…', ['skin, nose hairs, mucus and stomach acid', 'red blood cells', 'insulin'], 0, 'They stop pathogens getting in.') },
          { say: 'Drugs matter too: <b>tobacco</b> (nicotine: addictive; tar: cancer; carbon monoxide: less oxygen carried) links to bronchitis, emphysema, lung cancer, heart disease and low birth weight. <b>Alcohol</b>: slower reactions, less self-control, liver damage.' }
        ],
        keys: ['Pathogen; transmissible disease; direct and indirect transmission.', 'Barriers: skin, nose hairs, mucus, stomach acid.', 'Malaria (mosquito vector), HIV (body fluids), cholera (dirty water).', 'Tobacco and alcohol effects.'],
        gens: ['bDisease'], easy: ['bDisease'] },
      { id: 'bi-immunity', title: 'Antibiotics and immunity', obj: ['12.2', '12.3'], kw: 'antibiotics antibodies antigens vaccination immunity memory cells', learn: [],
        hook: 'Why one jab can protect you for years.',
        scenes: [
          { say: idea('Every pathogen has <b>antigens</b> with a particular shape. Your lymphocytes make <b>antibodies</b> with the <b>matching shape</b> to grab them. The first time is slow, but <b>memory cells</b> remember, so the next time the response is fast and huge. A <b>vaccine</b> trains you safely in advance.') },
          { say: 'Compare the first and second meeting with a pathogen.', anim: X([{ k: 't', label: 'Days', min: 0, max: 60, step: 2, v: 20 }], v => { const f = x => (x < 30 ? 1.5 * Math.exp(-((x - 12) ** 2) / 40) : 0) + (x >= 30 ? 8 * Math.exp(-((x - 37) ** 2) / 30) : 0); return `${K.plot([{ f }], [{ x: v.t, y: f(v.t) }], { xmin: 0, xmax: 60, ymin: 0, ymax: 9, h: 180, gstep: 1e9, lstep: 1e9, xlab: 'days', ylab: 'antibodies' })}<p class="center">${v.t < 30 ? '1st exposure (or vaccine): slow, small response; memory cells made.' : '2nd exposure: memory cells → fast, big response. You don\'t get ill.'}</p>`; }) },
          { say: '<b>Active immunity</b>: you make your own antibodies (after infection or vaccination), long-term. <b>Passive immunity</b>: you receive antibodies (across the placenta, in breast milk), short-term, no memory cells.',
            ask: T('Why don\'t antibiotics cure the flu?', ['Flu is a virus; antibiotics only kill bacteria', 'The flu is too strong', 'Antibiotics are vaccines'], 0, 'Using them unnecessarily breeds resistant bacteria like MRSA.') },
          { say: 'A <b>drug</b> is any substance that changes chemical reactions in the body. Use antibiotics only when essential to limit resistance.' }
        ],
        keys: ['Antigens: specific shapes; antibodies: complementary shapes.', 'Vaccination: weakened pathogens/antigens → antibodies + memory cells.', 'Active (long-term) vs passive (short-term, placenta/breast milk).', 'Antibiotics kill bacteria, not viruses; overuse → resistance (MRSA).'],
        gens: ['bImmunity'], easy: ['bImmunity'] }
    ] });

  R2O.addModule({ subject: 'biology', id: 'bi-control', name: 'Excretion and control', icon: '🧠', color: '#7c3aed', book: BOOK,
    blurb: 'Syllabus sections 13–15: kidneys, nerves, the eye, hormones, homeostasis and plant responses.',
    lessons: [
      { id: 'bi-kidney', title: 'Excretion and the kidneys', obj: ['13.1', '13.2'], kw: 'excretion kidney nephron urea liver deamination', learn: [],
        hook: 'Your kidneys filter your whole blood supply about 40 times a day.',
        scenes: [
          { say: idea('Cells make toxic wastes: <b>CO₂</b> (breathed out) and <b>urea</b> (made in the liver from spare amino acids). The kidneys <b>filter</b> the blood, then <b>take back</b> everything useful, leaving the waste as urine.') },
          { say: 'Send a substance through a nephron.', anim: X([{ k: 's', label: 'Substance', min: 0, max: 4, v: 0, fmt: i => ['glucose', 'water', 'ions (salts)', 'urea', 'red blood cells'][i] }], v => { const d = [['✅ filtered', '✅ ALL reabsorbed', '❌ none'], ['✅ filtered', '✅ most reabsorbed', 'some (the excess)'], ['✅ filtered', '✅ some reabsorbed', 'the excess'], ['✅ filtered', '❌ not reabsorbed', '✅ yes: urine'], ['❌ too big to filter', '–', '❌ none']][v.s]; return `<p>🧽 <b>Glomerulus (filtration):</b> ${d[0]}</p><p>🔁 <b>Tubule (reabsorption):</b> ${d[1]}</p><p>🚽 <b>In urine:</b> ${d[2]}</p>`; }) },
          { say: 'The route: kidney → <b>ureter</b> → <b>bladder</b> → <b>urethra</b>. In each nephron: Bowman\'s capsule, glomerulus, tubules, loop of Henle, collecting duct.',
            ask: T('Urea is made in the…', ['liver, by deamination of excess amino acids', 'kidneys', 'bladder'], 0, 'The liver also turns amino acids into proteins.') }
        ],
        keys: ['Excretion = removing toxic waste of metabolism (CO₂ via lungs, urea via kidneys).', 'Urea: liver, deamination.', 'Glomerulus filters water, glucose, urea, ions; all glucose, some ions, most water reabsorbed.', 'Kidney → ureter → bladder → urethra.'],
        gens: ['bExcretion'], easy: ['bExcretion'] },
      { id: 'bi-nerves', title: 'Nerves and reflexes', obj: ['14.1'], kw: 'nervous system reflex arc neurones synapse', learn: [],
        hook: 'Why you pull your hand off a hot pan before you even feel the pain.',
        scenes: [
          { say: idea('Nerves carry fast <b>electrical impulses</b>. A <b>reflex</b> takes a shortcut through the spinal cord, so you react automatically, in a fraction of a second, without waiting for your brain to decide.') },
          { say: 'Touch a hot pan. Follow the impulse.', anim: { type: 'reveal', keep: true, stages: ['<p>🔥 <b>Stimulus</b>: heat</p>', '<p>➡️ <b>Receptor</b> in the skin detects it</p>', '<p>➡️ <b>Sensory neurone</b> carries the impulse to the spinal cord</p>', '<p>➡️ <b>Relay neurone</b> in the spinal cord passes it on</p>', '<p>➡️ <b>Motor neurone</b> carries it to the arm</p>', '<p>💪 <b>Effector</b> (muscle) contracts: hand pulls away!</p>'] } },
          { say: 'Neurones don\'t touch. At a <b>synapse</b>: the impulse releases <b>neurotransmitter</b> from vesicles → it <b>diffuses</b> across the gap → <b>binds</b> to receptors → a new impulse starts. Only one side has the vesicles, so impulses go <b>one way</b>.',
            ask: T('Which neurone carries impulses TO the effector?', ['Motor neurone', 'Sensory neurone', 'Relay neurone'], 0, 'Sensory comes from the receptor.') },
          { say: 'CNS = brain + spinal cord. PNS = all the other nerves.' }
        ],
        keys: ['CNS (brain, spinal cord) and PNS.', 'Reflex arc: receptor → sensory → relay → motor → effector.', 'Reflex = rapid, automatic.', 'Synapse: neurotransmitter diffuses, binds receptors; one-way.'],
        gens: ['bNerves'], easy: ['bNerves'] },
      { id: 'bi-eye', title: 'The eye', obj: ['14.2'], kw: 'eye pupil reflex accommodation lens retina', learn: [],
        hook: 'A camera that refocuses itself and adjusts to the light, all on its own.',
        scenes: [
          { say: idea('The eye <b>bends light</b> to make a sharp image on the <b>retina</b>. The <b>cornea</b> does most of the bending; the <b>lens</b> changes shape to fine-tune for near or far objects. The <b>iris</b> controls how much light gets in.') },
          { say: 'Change the brightness.', anim: X([{ k: 'b', label: 'Light', min: 0, max: 10, v: 7 }], v => { const R = 30 - v.b * 2.2; return `${S.svg(160, 120, `<circle cx="80" cy="60" r="50" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/><circle cx="80" cy="60" r="${K.round(Math.max(6, R), 1)}" fill="#111"/>`, 160)}<p class="center">${v.b > 5 ? 'Bright: <b>circular</b> muscles contract, radial relax → pupil <b>small</b>' : 'Dim: <b>radial</b> muscles contract, circular relax → pupil <b>wide</b>'}</p>`; }) },
          { say: 'Now look near and far.', anim: X([{ k: 'd', label: 'Object', min: 0, max: 1, v: 0, fmt: i => ['near', 'far'][i] }], v => `${S.svg(220, 120, `<ellipse cx="110" cy="60" rx="${v.d ? 12 : 26}" ry="45" fill="color-mix(in srgb, var(--c5) 35%, transparent)" stroke="var(--c5)" stroke-width="2"/>`, 220)}<p class="center">${v.d ? 'Far: ciliary muscles <b>relax</b>, suspensory ligaments <b>tighten</b>, lens <b>thinner</b> → less refraction.' : 'Near: ciliary muscles <b>contract</b>, suspensory ligaments <b>slacken</b>, lens <b>fatter</b> → more refraction.'}</p>`) },
          { say: 'Parts: cornea (refracts), iris (controls the pupil), lens (focuses), ciliary muscles and suspensory ligaments (change the lens), retina (light receptors, some for colour), fovea (most receptors), optic nerve (to the brain), blind spot (no receptors).',
            ask: T('Where is the image sharpest?', ['The fovea', 'The blind spot', 'The iris'], 0, 'It has the most receptors.') }
        ],
        keys: ['Cornea refracts; lens focuses; retina detects; optic nerve to brain.', 'Pupil reflex: circular vs radial muscles.', 'Accommodation: near → ciliary contract, lens fatter; far → relax, lens thinner.'],
        gens: ['bEye'], easy: ['bEye'] },
      { id: 'bi-hormones', title: 'Hormones and homeostasis', obj: ['14.3', '14.4', '14.5', '14.6'], kw: 'hormones adrenaline insulin glucagon homeostasis temperature control diabetes', learn: [],
        hook: 'Your body keeps itself at 37 °C, whatever the weather.',
        scenes: [
          { say: idea('<b>Hormones</b> are chemical messages in the blood: slower than nerves but longer-lasting. Many help with <b>homeostasis</b>: keeping your insides steady. It works by <b>negative feedback</b>: drift too far from the set point and the body pushes back.') },
          { say: 'Change your body temperature.', anim: X([{ k: 't', label: 'Body temperature (°C)', min: 35, max: 39, step: 0.5, v: 37 }], v => `<p class="center bigq">${v.t > 37.2 ? '🥵' : v.t < 36.8 ? '🥶' : '😊'} ${n(v.t)} °C</p><p class="center">${v.t > 37.2 ? 'Hypothalamus → <b>sweating</b> (cools by evaporation), <b>vasodilation</b> (more blood near the skin), hairs lie flat.' : v.t < 36.8 ? 'Hypothalamus → <b>shivering</b> (heat from respiration), <b>vasoconstriction</b>, hair erector muscles raise hairs to trap air.' : 'At the set point: no change needed.'}</p>`) },
          { say: 'Blood glucose:', anim: X([{ k: 'g', label: 'Blood glucose', min: 0, max: 2, v: 1, fmt: i => ['low', 'normal', 'high (after a meal)'][i] }], v => `<p class="center">${['Pancreas releases <b>glucagon</b> → liver turns glycogen into glucose → glucose rises.', 'Steady.', 'Pancreas releases <b>insulin</b> → liver turns glucose into glycogen → glucose falls.'][v.g]}</p><p class="center small muted">Type 1 diabetes: no insulin made → high blood glucose, glucose in urine. Treated with insulin injections.</p>`) },
          { say: 'Glands: <b>adrenal</b> (adrenaline: raises heart rate and blood glucose, e.g. in danger), <b>pancreas</b> (insulin, glucagon), <b>pituitary</b> (FSH, LH), <b>testes</b> (testosterone), <b>ovaries</b> (oestrogen, progesterone).',
            ask: T('Compared with nerves, hormones are…', ['slower, but their effects last longer', 'faster and shorter', 'electrical'], 0, 'Speed and duration.') }
        ],
        keys: ['Hormone: chemical from a gland, in the blood, to target organs.', 'Adrenaline, insulin/glucagon, FSH/LH, testosterone, oestrogen/progesterone.', 'Homeostasis by negative feedback (set point).', 'Temperature: hypothalamus, sweating, shivering, vasodilation/constriction, hairs, insulation.'],
        gens: ['bHormones'], easy: ['bHormones'] },
      { id: 'bi-tropism', title: 'Plant responses', obj: ['15.1'], kw: 'phototropism gravitropism auxin', learn: [],
        hook: 'Plants can\'t walk, but they can still turn towards the light.',
        scenes: [
          { say: idea('Plants respond by <b>growing</b> in a direction. A hormone, <b>auxin</b>, made in the shoot tip, makes cells <b>elongate</b>. Light from one side pushes auxin to the <b>shaded</b> side, so that side grows faster and the shoot <b>bends towards the light</b>.') },
          { say: 'Move the light.', anim: X([{ k: 'l', label: 'Light comes from', min: -1, max: 1, v: 1, fmt: i => ['left', 'above', 'right'][i + 1] }], v => `${S.svg(200, 160, `<path d="M100 150 Q 100 90 ${100 + v.l * 40} 30" fill="none" stroke="#16a34a" stroke-width="8" stroke-linecap="round"/>${S.txt(v.l < 0 ? 20 : v.l > 0 ? 180 : 100, 22, '💡', 'lbl big')}`, 200)}<p class="center">${v.l ? `Auxin moves to the <b>${v.l > 0 ? 'left' : 'right'}</b> (shaded) side → those cells elongate → the shoot bends <b>${v.l > 0 ? 'right' : 'left'}</b>, towards the light.` : 'Even light: auxin spreads evenly, the shoot grows straight up.'}</p>`) },
          { say: '<b>Phototropism</b>: response to light (shoots grow towards it). <b>Gravitropism</b>: response to gravity (roots grow down, shoots grow up).', ask: T('Auxin is made in the…', ['shoot tip', 'roots', 'flower'], 0, 'It spreads back from the tip.') }
        ],
        keys: ['Phototropism (light) and gravitropism (gravity).', 'Auxin: made in the shoot tip, spreads, unevenly distributed by light and gravity, stimulates cell elongation.'],
        gens: ['bTropism'], easy: ['bTropism'] }
    ] });
})();
