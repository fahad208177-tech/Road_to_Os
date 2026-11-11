// Pathways: which subjects help which jobs, and which lessons build on which.
// Loaded after every course file. Career advice is general; students should always check
// what the college, university or employer they want actually asks for.
(() => {
  R2O.CAREERS = [
    { id: 'doctor', icon: '🩺', name: 'Doctor or dentist', need: ['biology', 'chemistry', 'physics', 'math', 'english'],
      say: 'Doctors and dentists need to understand the human body (Biology) and medicines (Chemistry).', note: 'Medicine is very competitive, so aim for top grades. You will usually need Biology and Chemistry at A Level too.' },
    { id: 'nurse', icon: '💉', name: 'Nurse or pharmacist', need: ['biology', 'chemistry', 'math', 'english'],
      say: 'Nurses care for patients. Pharmacists know how medicines work.', note: 'Pharmacy usually needs strong Chemistry.' },
    { id: 'engineer', icon: '⚙️', name: 'Engineer', need: ['math', 'addmath', 'physics', 'chemistry', 'english'],
      say: 'Engineers design machines, buildings, roads and power systems using Maths and Physics.', note: 'Add Maths is very useful, because A Level Maths builds on it.' },
    { id: 'it', icon: '💻', name: 'Programmer or IT worker', need: ['computing', 'math', 'addmath', 'physics', 'english'],
      say: 'Programmers build apps, websites and games. IT workers keep computers and networks running.', note: 'You can start learning to code for free online today.' },
    { id: 'business', icon: '💼', name: 'Business, banking or accounting', need: ['math', 'addmath', 'english', 'computing', 'geography'],
      say: 'Business people work with money, numbers and people.', note: 'Economics, Accounting and Business Studies are also very useful. They are not on Road to O\'s yet.' },
    { id: 'law', icon: '⚖️', name: 'Lawyer', need: ['english', 'history', 'geography', 'math'],
      say: 'Lawyers read carefully, argue clearly and write well.', note: 'Strong English matters most. History trains you to judge evidence and build an argument.' },
    { id: 'teacher', icon: '🍎', name: 'Teacher', need: ['english', 'math'],
      say: 'Teachers need good English and Maths, plus the subjects they want to teach.', note: 'Add the subjects you would like to teach one day.' },
    { id: 'architect', icon: '🏗️', name: 'Architect', need: ['math', 'addmath', 'physics', 'english', 'geography'],
      say: 'Architects design buildings that are safe, strong and beautiful.', note: 'Art and design also help. Art is not on Road to O\'s yet.' },
    { id: 'farm', icon: '🌱', name: 'Farming, environment or vet', need: ['biology', 'chemistry', 'geography', 'math', 'english'],
      say: 'These jobs care for plants, animals and the planet.', note: 'Vets need very strong Biology and Chemistry.' },
    { id: 'pilot', icon: '✈️', name: 'Pilot', need: ['math', 'physics', 'english', 'geography'],
      say: 'Pilots use Maths and Physics to understand flight, and clear English to talk to air traffic control.', note: 'Airlines also check your health and eyesight.' },
    { id: 'unsure', icon: '🤔', name: 'Not sure yet', need: ['english', 'math', 'physics', 'chemistry', 'biology'],
      say: 'That\'s completely fine! English, Maths and the three sciences keep the most doors open.', note: 'You can change your subjects any time.' }
  ];

  // Lessons that build on earlier ones (shown on the lesson page and when a student is stuck)
  const PRE = {
    'f-neg': ['f-addsub'], 'n-fdp': ['f-frac', 'f-dec'], 'n-pct': ['n-fdp'], 'a-quad': ['a-factor'], 'a-simul': ['a-linear'],
    'am-functions': ['a-func'], 'am-quadratics': ['a-quad', 'a-compsq', 'a-factor'], 'am-polynomials': ['a-factor', 'a-graphs'], 'am-modulus': ['a-ineq'],
    'am-simul': ['a-simul'], 'am-logs': ['n-ind1', 'a-ind2'], 'am-lines': ['c-eq', 'c-grad'], 'am-linearise': ['c-eq'], 'am-circle': ['c-midlen'],
    'am-radians': ['m-circles'], 'am-trigfn': ['t-soh'], 'am-identities': ['t-soh'], 'am-progressions': ['a-seq'], 'am-vectors': ['v-vectors'],
    'am-diff': ['c-grad', 'a-ind2'], 'am-kinematics': ['a-practical'], 'am-binomial': ['a-expand'], 'am-perm': ['p-combined'],
    'ph-measure': ['n-sf', 'm-units'], 'ph-speed': ['n-rates', 'a-subject'], 'ph-graphs': ['c-grad', 'a-practical'], 'ph-density': ['n-ratio', 'a-subject'],
    'ph-newton': ['a-subject'], 'ph-moments': ['a-subject'], 'ph-pressure': ['a-subject'], 'ph-resist': ['a-subject'], 'ph-gas': ['a-prop'],
    'ch-mole': ['n-ratio', 'n-sf'], 'ch-reacting': ['n-ratio'], 'ch-empirical': ['n-pct', 'n-ratio'],
    'cs-binary': ['n-powers', 'f-place'], 'cs-filesize': ['n-powers'],
    'bi-specialised': ['n-sf'], 'bi-diffusion': ['bi-cells', 'ch-states'], 'ge-data': ['s-charts']
  };
  for (const [id, pre] of Object.entries(PRE)) { const l = R2O.lesson(id); if (l) l.pre = pre; }
  R2O.PRE = PRE;

  // A short note on each subject's home page about what it builds on
  const NEEDS = {
    addmath: 'Add Maths builds on Maths. If algebra is new to you, do the Maths algebra lessons first. Each lesson shows what it builds on.',
    physics: 'Physics uses some Maths: rearranging formulas, graphs and standard form. Each lesson shows which Maths lessons help.',
    chemistry: 'Chemistry calculations use ratio and percentages from Maths. Each lesson shows which Maths lessons help.'
  };
  R2O.SUBJECTS.forEach(s => { if (NEEDS[s.id]) s.needs = NEEDS[s.id]; });
  // Short typographic badges for the subject bar (in place of emoji icons)
  const MONO = { basic: 'Ab', math: 'Ma', physics: 'Ph', chemistry: 'Ch', biology: 'Bi', addmath: 'AM', computing: 'CS', english: 'En', geography: 'Ge', history: 'Hi' };
  R2O.SUBJECTS.forEach(s => { s.mono = MONO[s.id] || s.short.slice(0, 2); });
})();
