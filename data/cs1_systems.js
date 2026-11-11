// Computer Science 2210 ("Computing"), part 1: subject set-up, data representation (1), data transmission (2),
// hardware (3), software (4), the internet (5) and emerging technologies (6).
(() => {
  const K = R2O.K, G = R2O.GEN, S = R2O.SCI, { rnd, pick, n } = K;
  const idea = S.idea, X = S.X, num = S.num, bank = S.bank, eq = S.eq, r = (x, d = 2) => K.round(x, d);
  const T = (q, opts, a, why) => ({ q, opts, a, why });
  const BOOK = ['Introduction to Computer Science', 'https://openstax.org/details/books/introduction-computer-science'];
  const bin = (v, bits = 8) => (v >>> 0).toString(2).padStart(bits, '0').slice(-bits);
  const hex = v => v.toString(16).toUpperCase();
  const code = s => `<pre class="code">${s}</pre>`;
  S.code = code; S.bin = bin;

  R2O.addSubject({
    id: 'computing', name: 'Computer Science', short: 'Computing', icon: '💻', color: '#2563eb',
    blurb: 'How computers work inside, and how to make them do what you want.',
    syl: {
      code: '2210', name: 'Cambridge O Level Computer Science', years: '2026, 2027 and 2028',
      url: 'https://www.cambridgeinternational.org/Images/697287-2026-2028-syllabus.pdf',
      areas: ['Data representation', 'Data transmission', 'Hardware', 'Software', 'The internet and its uses', 'Automated and emerging technologies', 'Algorithm design and problem-solving', 'Programming', 'Databases', 'Boolean logic'],
      papers: ['Paper 1 Computer Systems: 1 hour 45 minutes, 75 marks, 50%. Topics 1–6. No calculators.', 'Paper 2 Algorithms, Programming and Logic: 1 hour 45 minutes, 75 marks, 50%. Topics 7–10, including a 15-mark scenario question. No calculators.', 'Write algorithms in pseudocode (or Python, Visual Basic or Java for the scenario question only).'],
      suggest: ['Is two\'s complement on my exam?', 'Do I need to know Python?', 'Explain packet switching', 'Quiz me on logic gates', 'Is object-oriented programming examinable?', 'Do I need to know SQL?', 'What should I revise first?'],
      formulaNote: '<p><span class="verdict maybe">🧠 Learn them</span></p><p>No calculators and no formula sheet. Know: <b>image file size = resolution × colour depth</b> (bits); <b>sound file size = sample rate × resolution × length</b> (bits); divide by 8 for bytes, then by <b>1024</b> for KiB, MiB, GiB (never 1000).</p>',
      offSyllabus: [
        { k: /object[- ]oriented|\boop\b|class(es)? and objects|inheritance|polymorphism/, why: 'Object-oriented programming is not in 2210. You need sequence, selection, iteration, procedures and functions, arrays and files (8).', obj: '8.1' },
        { k: /floating[- ]point|mantissa|exponent bits/, why: 'Floating-point binary is not in 2210. Values are integers only (1.1).', obj: '1.1' },
        { k: /recursion|recursive/, why: 'Recursion is not in 2210.' },
        { k: /binary search|merge sort|quick ?sort|insertion sort/, why: 'Only linear search and bubble sort are required (7).', obj: '7' },
        { k: /linked list|stack|queue|binary tree|hash table/, why: 'Abstract data types (stacks, queues, linked lists, trees) are not in 2210. Arrays are (8.2).', obj: '8.2' },
        { k: /\bjoin\b|inner join|multiple tables|relational database/, why: 'Only single-table databases are in 2210 (9). SQL is limited to SELECT, FROM, WHERE, ORDER BY, SUM, COUNT, AND, OR.', obj: '9' },
        { k: /karnaugh|boolean algebra|simplif/, why: 'Simplifying logic (Boolean algebra, Karnaugh maps) is not in 2210. Circuits are drawn without simplification (10).', obj: '10' },
        { k: /hexadecimal (addition|arithmetic)|negative hexadecimal/, why: 'Only positive hexadecimal conversions are needed (1.1).', obj: '1.1' },
        { k: /(python|java|visual basic) syntax|learn python|need (to know )?python/, why: 'You write algorithms in pseudocode. Python, Visual Basic or Java may be used only in the 15-mark scenario question on Paper 2 (7, 8).', obj: '8.1' }
      ]
    },
    links: (kw) => [
      ['Khan Academy: computing videos and exercises', `https://www.khanacademy.org/search?page_search_query=${kw}`],
      ['BBC Bitesize: GCSE Computer Science revision', `https://www.bbc.co.uk/bitesize/search?q=${kw}`],
      ['Isaac Computer Science: free lessons and questions', `https://isaaccomputerscience.org/search?query=${kw}`]
    ]
  });

  // ================= generators =================
  G.csBinDen = () => { const v = rnd(1, 255), kind = pick(['toDen', 'toBin', 'toDen']);
    if (kind === 'toDen') { const b = bin(v); return num(`<p>Convert the binary number <b>${b}</b> to denary.</p>`, v, '', [`Place values: 128 64 32 16 8 4 2 1`, `add the places with a 1: ${b.split('').map((c, i) => c === '1' ? 128 >> i : 0).filter(Boolean).join(' + ')} = <b>${v}</b>`], 'Write 128, 64, 32, 16, 8, 4, 2, 1 above the bits and add where there is a 1.'); }
    return { kind: 'text', q: `<p>Convert the denary number <b>${v}</b> to an 8-bit binary number.</p>`, a: bin(v), accept: [bin(v)], ph: 'e.g. 00101101', hint: 'Take away the biggest place value that fits (128, 64, 32, …), writing 1 for used places and 0 for the rest.', steps: [`${v} = ${[128, 64, 32, 16, 8, 4, 2, 1].filter(p => v & p).join(' + ')}`, `<b>${bin(v)}</b>`] }; };
  G.csHex = () => { const v = rnd(10, 255), kind = pick(['denToHex', 'hexToDen', 'hexToBin', 'binToHex']);
    if (kind === 'denToHex') return { kind: 'text', q: `<p>Convert the denary number <b>${v}</b> to hexadecimal.</p>`, a: hex(v), accept: [hex(v), hex(v).toLowerCase()], ph: 'e.g. 2F', hint: 'Divide by 16: the whole part is the first digit, the remainder is the second. 10–15 are A–F.', steps: [`${v} ÷ 16 = ${Math.floor(v / 16)} remainder ${v % 16}`, `<b>${hex(v)}</b>`] };
    if (kind === 'hexToDen') return num(`<p>Convert the hexadecimal number <b>${hex(v)}</b> to denary.</p>`, v, '', [`${hex(v).length > 1 ? `${hex(v)[0]} × 16 + ${hex(v)[1]}` : hex(v)} = ${hex(v).length > 1 ? `${parseInt(hex(v)[0], 16) * 16} + ${parseInt(hex(v)[1], 16)}` : v} = <b>${v}</b>`], 'The left digit is worth 16s. A = 10 … F = 15.');
    if (kind === 'hexToBin') return { kind: 'text', q: `<p>Convert the hexadecimal number <b>${hex(v).padStart(2, '0')}</b> to 8-bit binary.</p>`, a: bin(v), accept: [bin(v)], ph: 'e.g. 10101111', hint: 'Each hex digit becomes exactly 4 bits (a nibble).', steps: [hex(v).padStart(2, '0').split('').map(d => `${d} → ${bin(parseInt(d, 16), 4)}`).join(' · '), `<b>${bin(v)}</b>`] };
    return { kind: 'text', q: `<p>Convert the binary number <b>${bin(v)}</b> to hexadecimal.</p>`, a: hex(v).padStart(2, '0'), accept: [hex(v).padStart(2, '0'), hex(v), hex(v).toLowerCase(), hex(v).padStart(2, '0').toLowerCase()], ph: 'e.g. 3C', hint: 'Split into two groups of 4 bits; convert each group to one hex digit.', steps: [`${bin(v).slice(0, 4)} | ${bin(v).slice(4)} → ${hex(v >> 4)} | ${hex(v & 15)}`, `<b>${hex(v).padStart(2, '0')}</b>`] }; };
  G.csBinAdd = () => { const a = rnd(20, 200), b = rnd(20, 200), s = a + b;
    if (s > 255) return { kind: 'mcq', q: `<p>Add these 8-bit binary numbers: <b>${bin(a)}</b> + <b>${bin(b)}</b>. What happens?</p>`, choices: ['Overflow: the answer needs 9 bits', `The answer is ${bin(s % 256)}`, 'The answer is 11111111', 'It is fine'], a: 'Overflow: the answer needs 9 bits', hint: 'The largest 8-bit value is 255.', steps: [`${a} + ${b} = ${s}, which is more than 255`, `<b>overflow error</b>: the 9th bit has nowhere to go`] };
    return { kind: 'text', q: `<p>Add these 8-bit binary numbers: <b>${bin(a)}</b> + <b>${bin(b)}</b>.</p>`, a: bin(s), accept: [bin(s)], ph: '8 bits', hint: '1 + 1 = 10 (write 0, carry 1). 1 + 1 + 1 = 11 (write 1, carry 1).', steps: [`(${a} + ${b} = ${s})`, `<b>${bin(s)}</b>`] }; };
  G.csShift = () => { const v = rnd(4, 120), k = rnd(1, 2), dir = pick(['left', 'right']); const res = dir === 'left' ? (v << k) & 255 : v >> k;
    return { kind: 'text', q: `<p>Perform a logical ${dir} shift of <b>${k}</b> place${k > 1 ? 's' : ''} on <b>${bin(v)}</b>.</p>`, a: bin(res), accept: [bin(res)], ph: '8 bits', hint: `Move every bit ${dir}; bits that fall off are lost; fill the gap with 0s.`, steps: [`${bin(v)} → <b>${bin(res)}</b>`, dir === 'left' ? `Each left shift multiplies by 2 (${v} → ${res}${(v << k) > 255 ? ', but a 1 was lost so the result is wrong' : ''}).` : `Each right shift divides by 2 (${v} → ${res}, remainders lost).`] }; };
  G.csTwos = () => { const v = rnd(-128, 127), kind = pick(['toBin', 'toDen']); const b = bin(v & 255);
    if (kind === 'toBin') return { kind: 'text', q: `<p>Write <b>${v}</b> as an 8-bit two's complement binary number.</p>`, a: b, accept: [b], ph: '8 bits', hint: v < 0 ? `Write +${-v} in binary, flip every bit, then add 1. (Or: −128 + ${128 + v}.)` : 'Positive numbers are written as normal, with a leading 0.', steps: v < 0 ? [`+${-v} = ${bin(-v)}`, `flip: ${bin(~(-v) & 255)}`, `add 1: <b>${b}</b>`] : [`<b>${b}</b>`] };
    return num(`<p>What denary value does the 8-bit two's complement number <b>${b}</b> represent?</p>`, v, '', [`The leftmost bit is worth −128`, `${b.split('').map((c, i) => c === '1' ? (i ? 128 >> i : -128) : 0).filter(Boolean).join(' + ').replace(/\+ -/g, '− ')} = <b>${v}</b>`], 'Place values: −128, 64, 32, 16, 8, 4, 2, 1.'); };
  G.csFileSize = () => { const kind = pick(['img', 'img', 'snd', 'units']);
    if (kind === 'img') { const w = pick([100, 200, 256, 512, 640, 1024]), h = pick([100, 128, 256, 480, 512]), d = pick([1, 8, 16, 24]); const bytes = w * h * d / 8;
      return num(`<p>An image is ${w} × ${h} pixels with a colour depth of ${d} bit${d > 1 ? 's' : ''}. What is its file size in <b>KiB</b>?</p>`, bytes / 1024, 'KiB', [`bits = ${w} × ${h} × ${d} = ${n(w * h * d)}`, `bytes = ÷ 8 = ${n(bytes)}`, `KiB = ÷ 1024 = <b>${n(r(bytes / 1024, 4))}</b>`], 'pixels × colour depth = bits; ÷ 8 = bytes; ÷ 1024 = KiB.'); }
    if (kind === 'snd') { const rate = pick([8000, 16000, 44100, 48000]), res = pick([8, 16, 24]), t = pick([10, 30, 60]); const bytes = rate * res * t / 8;
      return num(`<p>A sound is recorded for ${t} seconds at ${n(rate)} samples per second with a resolution of ${res} bits. What is the file size in <b>MiB</b>? (3 s.f.)</p>`, bytes / 1024 / 1024, 'MiB', [`bits = ${n(rate)} × ${res} × ${t} = ${n(rate * res * t)}`, `bytes = ÷ 8 = ${n(bytes)}`, `MiB = ÷ 1024 ÷ 1024 = <b>${n(K.sf(bytes / 1048576, 3))}</b>`], 'sample rate × resolution × seconds = bits.'); }
    const g = pick([2, 4, 8, 16]); return num(`<p>How many MiB are in ${g} GiB?</p>`, g * 1024, 'MiB', [`1 GiB = 1024 MiB, so ${g} × 1024 = <b>${n(g * 1024)}</b>`], 'Each step up is × 1024.'); };
  G.csParity = () => { const v = rnd(1, 127), ones = bin(v, 7).split('').filter(c => c === '1').length, kind = pick(['even', 'odd']); const pb = kind === 'even' ? ones % 2 : 1 - ones % 2;
    return num(`<p>The 7-bit data <b>${bin(v, 7)}</b> is sent using <b>${kind}</b> parity. What should the parity bit be (0 or 1)?</p>`, pb, '', [`number of 1s = ${ones}`, `${kind} parity: the total number of 1s (including the parity bit) must be ${kind} → parity bit = <b>${pb}</b>`], `Count the 1s. Choose the parity bit so the total is ${kind}.`); };
  G.csISBN = () => { const d = Array.from({ length: 12 }, () => rnd(0, 9)); d[0] = 9; d[1] = 7; d[2] = 8; const s = d.reduce((t, x, i) => t + x * (i % 2 ? 3 : 1), 0), c = (10 - s % 10) % 10;
    return num(`<p>The first 12 digits of an ISBN-13 are <b>${d.join('')}</b>. Using the ISBN-13 method (multiply digits alternately by 1 and 3, add, then the check digit makes the total a multiple of 10), find the check digit.</p>`, c, '', [`weighted sum = ${s}`, `${s} mod 10 = ${s % 10}`, `check digit = (10 − ${s % 10}) mod 10 = <b>${c}</b>`], 'The check digit is recalculated on entry; a mismatch shows a typing error.'); };
  bank('csData', [
    { q: 'Why do computers use binary?', a: 'Their circuits (logic gates, transistors) have two states: on and off', w: ['Binary is shorter than denary', 'Humans prefer binary', 'It uses less electricity than hex'], why: 'All data must be converted to binary to be processed.' },
    { q: 'Why is hexadecimal used?', a: 'It is a shorter, easier-to-read way for humans to write binary', w: ['Computers process hex directly', 'It uses less memory', 'It is more accurate'], why: 'Examples: MAC addresses, colour codes, error codes, memory dumps.' },
    { q: 'What is the largest denary value an 8-bit unsigned register can hold?', a: '255', w: ['256', '128', '127'], why: '11111111 = 255. More causes overflow.' },
    { q: 'Unicode can represent more characters than ASCII because…', a: 'it uses more bits per character', w: ['it is newer', 'it uses hexadecimal', 'it compresses text'], why: 'Including different languages and emojis.' },
    { q: 'Increasing the sample rate of a sound recording…', a: 'improves accuracy but increases file size', w: ['decreases file size', 'reduces quality', 'changes the pitch'], why: 'More samples per second.' },
    { q: 'Colour depth is…', a: 'the number of bits used for each pixel\'s colour', w: ['the number of pixels', 'the brightness of the screen', 'the size of the image in cm'], why: 'Resolution is the number of pixels.' },
    { q: 'Lossless compression…', a: 'reduces file size without permanently losing any data (e.g. RLE)', w: ['permanently removes data', 'always makes files larger', 'only works on images'], why: 'Lossy compression permanently removes data (e.g. lower resolution).' },
    { q: 'Run length encoding (RLE) compresses data by…', a: 'replacing runs of the same value with a count and the value', w: ['deleting every other byte', 'lowering the colour depth', 'encrypting it'], why: 'e.g. AAAAABBB → 5A3B.' },
    { q: 'A logical left shift of 1 place on a positive binary integer…', a: 'multiplies it by 2 (if no 1s are lost)', w: ['divides it by 2', 'adds 1', 'makes it negative'], why: 'A right shift divides by 2.' },
    { q: 'How many bits are in a nibble?', a: '4', w: ['8', '2', '16'], why: 'One hexadecimal digit = one nibble.' },
    { q: 'How many bits are in a byte?', a: '8', w: ['4', '10', '16'], why: '1 byte = 8 bits = 2 nibbles.' },
    { q: 'Overflow happens when…', a: 'the result of a calculation needs more bits than the register has', w: ['a file is compressed', 'a number is negative', 'the computer is switched off'], why: 'e.g. adding two 8-bit numbers gives a 9-bit result.' },
    { q: 'Increasing the resolution of an image…', a: 'gives more pixels, so more detail and a larger file', w: ['reduces the file size', 'changes the colours only', 'makes the image smaller on screen'], why: 'File size = width × height × colour depth.' },
    { q: 'Sample resolution (bit depth) in sound is…', a: 'the number of bits used for each sample', w: ['the number of samples per second', 'the loudness of the sound', 'the length of the recording'], why: 'Sample rate is samples per second.' },
    { q: 'Lossy compression is often used for…', a: 'photos, music and video, where small losses are hard to notice', w: ['program code', 'text documents that must stay exact', 'bank records'], why: 'Text and code must use lossless compression.' },
    { q: 'In two\'s complement, a byte starting with 1 is…', a: 'negative', w: ['positive', 'always zero', 'an error'], why: 'The leftmost bit is worth −128.' },
    { q: 'An ASCII character uses…', a: '7 bits (often stored in 8)', w: ['16 bits always', '2 bits', '32 bits'], why: '7 bits give 128 characters; extended ASCII uses 8 bits.' }
  ]);
  bank('csTransmit', [
    { q: 'A packet header contains…', a: 'the destination address, the packet number and the originator\'s address', w: ['the whole message', 'only the payload', 'the router\'s password'], why: 'The payload is the data; the trailer marks the end and may hold an error check.' },
    { q: 'In packet switching…', a: 'packets may take different routes and are reordered at the destination', w: ['all packets must follow one route', 'packets never arrive out of order', 'no routers are used'], why: 'Routers choose the route for each packet.' },
    { q: 'Serial transmission sends…', a: 'one bit at a time down a single wire', w: ['several bits at once on many wires', 'only analogue signals', 'data in both directions at once'], why: 'Parallel sends several bits at once (fast but only over short distances due to skew).' },
    { q: 'Full-duplex transmission means…', a: 'data can travel in both directions at the same time', w: ['data travels one way only', 'data travels both ways, but not at once', 'data is sent twice'], why: 'Simplex: one way. Half-duplex: both ways, one at a time.' },
    { q: 'A benefit of USB is that…', a: 'it is a standard connector that only fits one way and devices are detected automatically', w: ['it has unlimited cable length', 'it is the fastest possible connection', 'it needs no drivers ever'], why: 'Drawback: cable length is limited.' },
    { q: 'An echo check works by…', a: 'sending the received data back to the sender to compare', w: ['adding a parity bit', 'calculating a checksum', 'asking the user to retype'], why: 'If they differ, the data is sent again.' },
    { q: 'A checksum is…', a: 'a value calculated from the data and sent with it, then recalculated by the receiver', w: ['a parity bit', 'a type of encryption key', 'the packet number'], why: 'If the values differ, an error has occurred.' },
    { q: 'ARQ (automatic repeat query) uses…', a: 'acknowledgements and timeouts to request data again', w: ['parity bits only', 'encryption', 'check digits'], why: 'If no positive acknowledgement arrives before the timeout, the data is resent.' },
    { q: 'Errors in transmission can be caused by…', a: 'interference, leading to data loss, gain or change', w: ['encryption', 'compression', 'using binary'], why: 'That is why error detection is needed.' },
    { q: 'Symmetric encryption uses…', a: 'the same key to encrypt and decrypt', w: ['a public and a private key', 'no key', 'a check digit'], why: 'Asymmetric uses a public key to encrypt and a private key to decrypt.' },
    { q: 'Why is data encrypted?', a: 'So that if it is intercepted it cannot be understood', w: ['To make it smaller', 'To detect errors', 'To speed it up'], why: 'Encryption does not stop interception, it makes the data useless to the interceptor.' }
  ]);
  bank('csHardware', [
    { q: 'In the fetch–decode–execute cycle, the program counter (PC) holds…', a: 'the address of the next instruction', w: ['the current instruction', 'the result of a calculation', 'data from the keyboard'], why: 'MAR holds the address being accessed; MDR holds the data; CIR holds the current instruction.' },
    { q: 'The ALU…', a: 'performs arithmetic and logic operations', w: ['stores the operating system', 'controls the hard disk', 'fetches instructions from RAM'], why: 'The control unit sends control signals.' },
    { q: 'Which would improve CPU performance?', a: 'More cores, a larger cache or a faster clock', w: ['Fewer cores', 'A smaller cache', 'A slower clock'], why: 'Within limits: software must use the extra cores.' },
    { q: 'Cache memory is…', a: 'small, very fast memory inside the CPU for frequently used data', w: ['a type of hard disk', 'slow backup storage', 'the same as ROM'], why: 'Faster to access than RAM.' },
    { q: 'An embedded system is…', a: 'a computer built into a device to perform a dedicated function', w: ['a general-purpose PC', 'a cloud server', 'a type of software only'], why: 'E.g. washing machines, cars, vending machines.' },
    { q: 'An instruction set is…', a: 'the list of machine-code commands a CPU can process', w: ['the operating system', 'a set of passwords', 'the computer\'s user manual'], why: 'Different CPU families have different instruction sets.' },
    { q: 'RAM is…', a: 'volatile primary storage holding the data and programs currently in use', w: ['permanent storage for the boot program', 'secondary storage', 'a type of optical disc'], why: 'ROM is non-volatile and holds the boot-up instructions.' },
    { q: 'Optical storage (CD, DVD, Blu-ray) stores data as…', a: 'pits and lands read by a laser', w: ['magnetised areas on platters', 'charge in transistors', 'holes in paper'], why: 'Magnetic uses platters; solid-state uses NAND/NOR flash with floating gates.' },
    { q: 'Virtual memory is…', a: 'part of secondary storage used as extra RAM when RAM is full', w: ['cache memory', 'cloud storage', 'a second CPU'], why: 'Pages are swapped between RAM and virtual memory, which is slower.' },
    { q: 'A disadvantage of cloud storage is…', a: 'you need an internet connection, and the data is held by a third party', w: ['it cannot be accessed remotely', 'it needs a physical disk at home', 'it is always slower to set up than a hard disk'], why: 'Advantages: access anywhere, scalable, backed up.' },
    { q: 'A MAC address…', a: 'is a unique identifier given to a NIC when it is made, usually written in hex', w: ['is assigned by the router each day', 'is the same as an IP address', 'changes every session'], why: 'It is made of a manufacturer code and a serial code.' },
    { q: 'An IP address…', a: 'is allocated by the network and can be static or dynamic', w: ['is fixed at manufacture', 'is the same as a MAC address', 'is only used offline'], why: 'IPv4 is 32-bit (4 denary groups); IPv6 is 128-bit (hex groups), giving far more addresses.' },
    { q: 'A router…', a: 'sends data to the correct destination and can connect a local network to the internet', w: ['stores websites', 'is an input device', 'encrypts every file'], why: 'It can also assign IP addresses.' },
    { q: 'Which is a sensor that measures how far away an object is?', a: 'Proximity sensor', w: ['pH sensor', 'Humidity sensor', 'Gas sensor'], why: 'Choose the sensor that matches the quantity measured.' },
    { q: 'An actuator is…', a: 'an output device that causes movement, such as a motor or valve', w: ['an input device', 'a type of storage', 'a sensor'], why: 'Used in automated systems.' }
  ]);
  bank('csSoftware', [
    { q: 'An operating system is…', a: 'system software that manages the hardware and provides an interface', w: ['application software like a word processor', 'firmware only', 'a programming language'], why: 'It manages files, memory, peripherals, multitasking, interrupts and security.' },
    { q: 'Which is application software?', a: 'A spreadsheet program', w: ['An operating system', 'A disk defragmenter', 'A device driver'], why: 'Application software does tasks for the user; system software runs the computer.' },
    { q: 'An interrupt is…', a: 'a signal that makes the CPU pause and deal with an event', w: ['a type of virus', 'a programming error that cannot be fixed', 'a type of storage'], why: 'Handled by an interrupt service routine, then the CPU resumes.' },
    { q: 'Pressing a key on the keyboard causes a…', a: 'hardware interrupt', w: ['software interrupt', 'compiler error', 'logic error'], why: 'Division by zero is a software interrupt.' },
    { q: 'A compiler…', a: 'translates the whole program at once into an executable file', w: ['translates and runs one line at a time', 'is only for assembly language', 'is an input device'], why: 'An interpreter translates and runs line by line, stopping at the first error.' },
    { q: 'Why might a programmer use an interpreter while developing?', a: 'It runs code straight away and stops exactly where an error occurs', w: ['It produces faster final code', 'It hides the source code', 'It creates an executable file'], why: 'A compiler is used for the final distributed program.' },
    { q: 'Assembly language uses…', a: 'mnemonics and needs an assembler to become machine code', w: ['English sentences', 'only 0s and 1s', 'a compiler'], why: 'It is a low-level language.' },
    { q: 'An advantage of a high-level language is…', a: 'it is easier to read, write and debug, and is machine-independent', w: ['it gives direct control of the hardware', 'it needs no translator', 'it always runs faster'], why: 'Low-level languages give direct hardware control and efficiency.' },
    { q: 'Which is a common IDE feature?', a: 'Error diagnostics and auto-completion', w: ['A barcode scanner', 'A packet header', 'A parity bit'], why: 'Also code editor, run-time environment, translators, auto-correction, prettyprint.' },
    { q: 'The correct order to run an app is…', a: 'hardware → firmware (bootloader) → operating system → application', w: ['application → OS → hardware', 'firmware → application → OS', 'OS → hardware → firmware'], why: 'Each layer runs on the one below.' }
  ]);
  bank('csInternet', [
    { q: 'The internet is…', a: 'the global infrastructure of connected networks', w: ['the collection of web pages', 'a web browser', 'a search engine'], why: 'The world wide web is the collection of websites accessed using the internet.' },
    { q: 'A URL contains…', a: 'the protocol, the domain name and the page or file name', w: ['the IP address of your computer only', 'the MAC address', 'the password'], why: 'e.g. https://www.example.com/page.html' },
    { q: 'The DNS…', a: 'translates a domain name into an IP address', w: ['stores web pages', 'encrypts data', 'renders HTML'], why: 'Then the browser requests the page from that web server.' },
    { q: 'HTTPS differs from HTTP because…', a: 'it encrypts data between the browser and the server', w: ['it is faster', 'it does not use the internet', 'it only works on phones'], why: 'Look for the padlock.' },
    { q: 'The main job of a web browser is to…', a: 'render HTML and display web pages', w: ['host websites', 'assign IP addresses', 'store all the internet'], why: 'It also stores bookmarks, history, cookies and has tabs.' },
    { q: 'A persistent cookie…', a: 'is stored on the device after the browser closes, e.g. to remember login details', w: ['is deleted when the browser closes', 'is a virus', 'is the same as a session cookie'], why: 'Session cookies are deleted when the browser closes (e.g. a shopping cart).' },
    { q: 'Blockchain is…', a: 'a time-stamped digital ledger of records that cannot be altered', w: ['a type of virus', 'a physical coin', 'a password manager'], why: 'Used to track digital currency transactions.' },
    { q: 'A DDoS attack…', a: 'floods a server with requests from many devices so real users cannot access it', w: ['steals passwords by guessing', 'tricks users with fake emails', 'installs a keylogger'], why: 'Brute-force guesses passwords; phishing uses fake emails.' },
    { q: 'Phishing is…', a: 'sending fake emails that trick people into giving personal details', w: ['guessing every possible password', 'redirecting a URL to a fake site via DNS', 'flooding a server'], why: 'Pharming redirects to a fake website.' },
    { q: 'Which helps protect against brute-force attacks?', a: 'Strong passwords and limiting login attempts / two-step verification', w: ['Turning off the firewall', 'Using HTTP instead of HTTPS', 'Sharing passwords'], why: 'Other solutions: firewalls, anti-malware, access levels, biometrics, proxy servers, SSL, privacy settings.' },
    { q: 'A firewall…', a: 'monitors traffic and blocks data that does not meet set criteria', w: ['speeds up the internet', 'stores backups', 'is a type of malware'], why: 'It can be hardware or software.' },
    { q: 'Malware includes…', a: 'viruses, worms, Trojan horses, spyware, adware and ransomware', w: ['firewalls and anti-virus', 'compilers and interpreters', 'routers and switches'], why: 'Anti-malware software helps detect and remove it.' }
  ]);
  bank('csEmerging', [
    { q: 'An automated system uses…', a: 'sensors, a microprocessor and actuators working together', w: ['only a keyboard', 'only a monitor', 'a human to make every decision'], why: 'e.g. automatic greenhouse watering.' },
    { q: 'Which is a characteristic of a robot?', a: 'A mechanical structure, electrical components and being programmable', w: ['It must look human', 'It needs no electricity', 'It cannot be programmed'], why: 'Robots are used in industry, transport, agriculture, medicine, homes and entertainment.' },
    { q: 'An expert system has…', a: 'a knowledge base, a rule base, an inference engine and an interface', w: ['only a database', 'a CPU and nothing else', 'a robot arm'], why: 'e.g. medical diagnosis.' },
    { q: 'Machine learning is when…', a: 'a program can automatically adapt its own processes or data', w: ['a human rewrites the code every time', 'a computer is turned off', 'data is encrypted'], why: 'AI: data + rules, reasoning, and possibly learning and adapting.' },
    { q: 'A disadvantage of automated systems is…', a: 'high set-up and maintenance costs and job losses', w: ['they never make mistakes', 'they work 24/7', 'they are consistent'], why: 'Advantages include safety, consistency and working continuously.' }
  ]);

  // ================= lessons =================
  R2O.addModule({ subject: 'computing', id: 'cs-data', name: 'Data representation', icon: '0️⃣', color: '#2563eb', book: BOOK,
    blurb: 'Syllabus 1: binary, hexadecimal, binary arithmetic, two\'s complement, text, sound, images, file sizes and compression.',
    lessons: [
      { id: 'cs-binary', title: 'Binary and hexadecimal', obj: ['1.1'], kw: 'binary denary hexadecimal conversion', learn: [],
        hook: 'Every photo, song and message on your phone is just 0s and 1s.',
        scenes: [
          { say: idea('A computer is built from billions of tiny <b>switches</b> that are either <b>off (0)</b> or <b>on (1)</b>. So it counts in <b>binary</b>: base 2, where each place is worth <b>double</b> the one to its right. <b>Hexadecimal</b> (base 16) is a shorthand for humans: one hex digit = 4 bits.') },
          { say: 'Flip the switches. Each one is worth double the one to its right.', anim: X([{ k: 'v', label: 'Value', min: 0, max: 255, v: 45 }], v => { const b = bin(v.v); return `${S.svg(330, 90, b.split('').map((c, i) => `<rect x="${8 + i * 40}" y="30" width="34" height="34" rx="7" fill="${c === '1' ? 'var(--c2)' : 'var(--surface2)'}" stroke="var(--line)"/>${S.txt(25 + i * 40, 53, c, 'lbl')}${S.txt(25 + i * 40, 20, 128 >> i, 'tick')}`).join(''), 330)}<p class="center bigq">${b} = ${v.v}</p><p class="center">hex: <b>${hex(v.v).padStart(2, '0')}</b> (${b.slice(0, 4)} → ${hex(v.v >> 4)}, ${b.slice(4)} → ${hex(v.v & 15)})</p>`; }) },
          { say: 'Hex digits: 0–9, then A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Hex is used for MAC addresses, colour codes (#FF8800) and error codes because it is <b>shorter and easier to read</b> than binary.',
            ask: T('Binary 1010 in denary?', ['10', '1010', '5', '20'], 0, '8 + 2 = 10.') },
          { say: 'Converting: denary → binary, take away the biggest place value that fits, again and again. Binary → hex, split into nibbles of 4 bits.' }
        ],
        keys: ['Binary: base 2, place values 128 64 32 16 8 4 2 1.', 'Hex: base 16 (A–F = 10–15); 1 hex digit = 4 bits.', 'Hex is easier for humans to read; used for MAC addresses, colours, errors.'],
        gens: ['csBinDen', 'csHex', 'csData'], easy: ['csBinDen'] },
      { id: 'cs-binarith', title: 'Binary arithmetic, shifts and negative numbers', obj: ['1.1'], kw: 'binary addition overflow logical shift twos complement', learn: [],
        hook: 'How a computer adds, multiplies by 2, and stores −5, with only 8 switches.',
        scenes: [
          { say: idea('Binary addition works like column addition, but you <b>carry at 2</b>: 1 + 1 = 10. An 8-bit register can\'t hold more than 255, so a 9th bit causes <b>overflow</b>. <b>Shifting</b> bits left doubles a number; shifting right halves it. <b>Two\'s complement</b> makes the leftmost bit worth <b>−128</b>, so negatives can be stored.') },
          { say: 'Two\'s complement: the first switch is worth −128.', anim: X([{ k: 'v', label: 'Value', min: -128, max: 127, v: -5 }], v => { const b = bin(v.v & 255); return `${S.svg(330, 90, b.split('').map((c, i) => `<rect x="${8 + i * 40}" y="30" width="34" height="34" rx="7" fill="${c === '1' ? (i ? 'var(--c2)' : 'var(--c4)') : 'var(--surface2)'}" stroke="var(--line)"/>${S.txt(25 + i * 40, 53, c, 'lbl')}${S.txt(25 + i * 40, 20, i ? 128 >> i : -128, 'tick')}`).join(''), 330)}<p class="center bigq">${b} = ${v.v}</p><p class="center small muted">${v.v < 0 ? `Shortcut: write +${-v.v} in binary, flip every bit, add 1.` : 'Positive: leading 0, normal binary.'}</p>`; }) },
          { say: 'Shifts: bits that fall off the end are <b>lost</b>; zeros come in at the other end.', pic: '<p class="center bigq">00010110 (22) → left 1 → 00101100 (44)</p><p class="center bigq">00010110 (22) → right 1 → 00001011 (11)</p>',
            ask: T('11001000 + 01000000 in 8 bits gives…', ['Overflow (the answer needs 9 bits)', '10001000', '11111111', '00000000'], 0, '200 + 64 = 264 > 255.') }
        ],
        keys: ['1 + 1 = 10 (carry 1); 1 + 1 + 1 = 11.', 'Overflow: result > 255 in 8 bits.', 'Logical shift left ×2, right ÷2; lost bits cause errors.', 'Two\'s complement: MSB = −128; flip and add 1.'],
        gens: ['csBinAdd', 'csShift', 'csTwos'], easy: ['csShift'] },
      { id: 'cs-media', title: 'Text, sound and images', obj: ['1.2'], kw: 'ascii unicode sample rate sample resolution pixels colour depth', learn: [],
        hook: 'How a song becomes numbers, and why a higher-quality photo takes more space.',
        scenes: [
          { say: idea('Everything is turned into numbers. <b>Text</b>: each character has a code (ASCII, or Unicode for every language and emoji). <b>Sound</b>: measure the wave many times a second (samples). <b>Images</b>: a grid of pixels, each with a colour number. More detail = more bits = <b>bigger files</b>.') },
          { say: 'Sample a sound wave.', anim: X([{ k: 'r', label: 'Sample rate (samples per unit)', min: 2, max: 30, v: 8 }, { k: 'b', label: 'Resolution (bits)', min: 1, max: 5, v: 3 }], v => { const L = 2 ** v.b, pts = []; for (let i = 0; i <= v.r; i++) { const x = i / v.r * 6.28, y = Math.round((Math.sin(x) + 1) / 2 * (L - 1)) / (L - 1) * 2 - 1; pts.push([x, y]); } const steps = []; pts.forEach((p, i) => { if (i) steps.push([p[0], pts[i - 1][1]]); steps.push(p); }); return `${K.plot([{ f: x => Math.sin(x), color: 'var(--muted)', dash: true }], [], { xmin: 0, xmax: 6.3, ymin: -1.3, ymax: 1.3, h: 170, gstep: 1e9, lstep: 1e9, segs: [{ pts: steps, color: 'var(--c4)' }] })}<p class="center">${v.r} samples × ${v.b} bits = <b>${v.r * v.b} bits</b> · ${2 ** v.b} possible levels</p><p class="center small muted">Higher rate and resolution: more accurate, bigger file.</p>`; }) },
          { say: 'Now an image.', anim: X([{ k: 'p', label: 'Pixels across', min: 2, max: 16, v: 8 }, { k: 'd', label: 'Colour depth (bits)', min: 1, max: 4, v: 2 }], v => { const cols = 2 ** v.d; let b = ''; const s = 160 / v.p; for (let y = 0; y < v.p; y++) for (let x = 0; x < v.p; x++) { const t = Math.floor(((Math.hypot(x - v.p / 2, y - v.p / 2) / v.p) * 1.6) * cols) % cols; b += `<rect x="${K.round(x * s, 1)}" y="${K.round(y * s, 1)}" width="${K.round(s + .5, 1)}" height="${K.round(s + .5, 1)}" fill="hsl(${200 + t * 140 / Math.max(1, cols - 1)},70%,${30 + t * 40 / Math.max(1, cols - 1)}%)"/>`; } return `${S.svg(160, 160, b, 160)}<p class="center">${v.p} × ${v.p} pixels × ${v.d} bits = <b>${v.p * v.p * v.d} bits</b> · ${cols} colours</p>`; }) },
          { say: 'Unicode uses more bits per character than ASCII, so it can show many more characters.', ask: T('Doubling an image\'s colour depth from 8 to 16 bits makes the file…', ['twice as big', 'half the size', 'the same size'], 0, 'Bits per pixel doubles.') }
        ],
        keys: ['ASCII vs Unicode (more characters, more bits).', 'Sound: sample rate (samples per second), resolution (bits per sample).', 'Image: resolution (number of pixels), colour depth (bits per pixel).', 'More detail → bigger file.'],
        gens: ['csData'], easy: ['csData'] },
      { id: 'cs-filesize', title: 'Storage units, file sizes and compression', obj: ['1.3'], kw: 'kibibyte mebibyte file size compression lossy lossless rle', learn: [],
        hook: 'How big is a photo really? And how do we squeeze it?',
        scenes: [
          { say: idea('Bits group into bigger units, each <b>1024</b> times the last (not 1000!). A file\'s size is just "how many bits it needs". <b>Compression</b> makes files smaller, either by <b>throwing detail away</b> (lossy) or by <b>describing repeats more cleverly</b> (lossless).') },
          { say: 'The ladder:', pic: '<p class="center bigq">8 bits = 1 byte · 4 bits = 1 nibble</p><p class="center">1 KiB = 1024 bytes · 1 MiB = 1024 KiB · 1 GiB = 1024 MiB · TiB · PiB · EiB</p>' + eq('image: width × height × colour depth (bits)') + eq('sound: sample rate × resolution × seconds (bits)', '÷ 8 for bytes, ÷ 1024 for each step up') },
          { say: 'Try run length encoding (lossless) on a row of pixels.', anim: X([{ k: 'k', label: 'Pattern', min: 0, max: 2, v: 0, fmt: i => ['long runs', 'some runs', 'no runs'][i] }], v => { const s = ['WWWWWWWWBBBBWWWW', 'WWBBWWWBBBBWBWWW', 'WBWBWBWBWBWBWBWB'][v.k]; const runs = []; let i = 0; while (i < s.length) { let j = i; while (j < s.length && s[j] === s[i]) j++; runs.push((j - i) + s[i]); i = j; } return `<p class="center bigq" style="letter-spacing:2px">${s}</p><p class="center bigq">→ ${runs.join(' ')}</p><p class="center">${s.length} values → ${runs.length * 2} values ${runs.length * 2 < s.length ? '✅ smaller' : '❌ not smaller!'}</p><p class="center small muted">RLE only helps when there are long runs.</p>`; }) },
          { say: 'Why compress? Less storage, less bandwidth, faster transfer. <b>Lossy</b> (e.g. lower resolution, colour depth or sample rate) is permanent. <b>Lossless</b> (e.g. RLE) can rebuild the original exactly.', ask: T('A 2048 × 1024 image with 8-bit colour is how many MiB?', ['2', '16', '2048', '0.5'], 0, '2048 × 1024 × 8 bits = 2 097 152 bytes = 2 MiB.') }
        ],
        keys: ['bit, nibble, byte, KiB, MiB, GiB, TiB, PiB, EiB (×1024).', 'Image and sound file size calculations.', 'Compression: less storage/bandwidth, faster transmission.', 'Lossy (permanent loss) vs lossless (RLE).'],
        gens: ['csFileSize', 'csData'], easy: ['csData'] }
    ] });

  R2O.addModule({ subject: 'computing', id: 'cs-net', name: 'Transmission, internet and security', icon: '🌐', color: '#0891b2', book: BOOK,
    blurb: 'Syllabus 2 and 5: packets, transmission methods, USB, error detection, encryption, the web, digital currency and cyber security.',
    lessons: [
      { id: 'cs-transmission', title: 'Packets and transmission', obj: ['2.1'], kw: 'packets packet switching serial parallel simplex duplex usb', learn: [],
        hook: 'Your video call is chopped into thousands of tiny parcels every second.',
        scenes: [
          { say: idea('Big messages are cut into small <b>packets</b>. Each packet has a <b>header</b> (where it\'s from, where it\'s going, its number), the <b>payload</b> (the data) and a <b>trailer</b>. Routers send each packet by whatever route is free, and the receiver puts them back <b>in order</b>.') },
          { say: 'Send a message.', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ "HELLO WORLD" is split into packets 1, 2, 3.</p>', '<p>2️⃣ Each packet gets a header: destination, packet number, sender.</p>', '<p>3️⃣ Routers send each packet along any free route: they may arrive 2, 3, 1.</p>', '<p>4️⃣ When the last packet arrives, the receiver <b>reorders</b> them: "HELLO WORLD" ✅</p>'] } },
          { say: 'Ways to send bits:', pic: '<ul><li><b>Serial</b>: one bit at a time on one wire (long distances, no skew)</li><li><b>Parallel</b>: several bits at once on many wires (fast, but only short distances)</li><li><b>Simplex</b>: one direction only · <b>Half-duplex</b>: both ways, one at a time · <b>Full-duplex</b>: both ways at once</li></ul>',
            ask: T('A walkie-talkie (one person talks at a time) is…', ['half-duplex', 'simplex', 'full-duplex'], 0, 'A phone call is full-duplex; a TV broadcast is simplex.') },
          { say: '<b>USB</b>: a universal standard. It only fits one way, is detected automatically and can supply power. Drawback: limited cable length and lower speed than some interfaces.' }
        ],
        keys: ['Packet = header (destination, packet number, originator) + payload + trailer.', 'Packet switching: different routes, reordered at the end.', 'Serial/parallel; simplex/half-duplex/full-duplex.', 'USB benefits and drawbacks.'],
        gens: ['csTransmit'], easy: ['csTransmit'] },
      { id: 'cs-errors', title: 'Error detection and encryption', obj: ['2.2', '2.3'], kw: 'parity check checksum echo check check digit arq encryption symmetric asymmetric', learn: [],
        hook: 'How your phone knows a message got scrambled, and how to keep secrets.',
        scenes: [
          { say: idea('Interference can flip bits. To catch it, send a little <b>extra information</b> that lets the receiver check the data. And to stop eavesdroppers, <b>encrypt</b>: scramble the data with a key so that only the right person can unscramble it.') },
          { say: 'Even parity: the total number of 1s must be even.', anim: X([{ k: 'v', label: 'Data (7 bits)', min: 0, max: 127, v: 77 }, { k: 'e', label: 'Flip a bit in transit?', min: 0, max: 1, v: 0, fmt: i => ['no', 'yes'][i] }], v => { const b = bin(v.v, 7), ones = b.split('').filter(c => c === '1').length, p = ones % 2; const sent = p + b, got = v.e ? sent.slice(0, 3) + (sent[3] === '1' ? '0' : '1') + sent.slice(4) : sent; const ok = got.split('').filter(c => c === '1').length % 2 === 0; return `<p class="center">data ${b} has ${ones} ones → parity bit <b>${p}</b></p><p class="center bigq">sent ${sent} · received ${got}</p><p class="center">${ok ? '✅ even number of 1s: accepted' : '❌ odd number of 1s: error detected!'}</p>`; }) },
          { say: 'Other checks: <b>checksum</b> (a calculated total sent with the data), <b>echo check</b> (send it back and compare), <b>check digit</b> (an extra digit in ISBNs and barcodes to catch typing errors), <b>ARQ</b> (acknowledgements and timeouts; resend if no "OK").',
            ask: T('Which check catches a mistake when someone types a barcode number?', ['Check digit', 'Echo check', 'ARQ'], 0, 'It is recalculated from the other digits.') },
          { say: 'Encryption with a Caesar shift (a simple symmetric cipher).', anim: X([{ k: 's', label: 'Key (shift)', min: 1, max: 25, v: 3 }], v => { const m = 'MEET AT NOON'; const c = m.replace(/[A-Z]/g, ch => String.fromCharCode(65 + (ch.charCodeAt(0) - 65 + v.s) % 26)); return `<p class="center bigq">${m}</p><p class="center bigq">→ ${c}</p><p class="center small muted"><b>Symmetric</b>: the same key encrypts and decrypts. <b>Asymmetric</b>: encrypt with the receiver's <b>public</b> key; only their <b>private</b> key can decrypt.</p>`; }) }
        ],
        keys: ['Errors: interference → data loss, gain, change.', 'Parity (odd/even, byte and block), checksum, echo check.', 'Check digits (ISBN, barcodes) for data entry; ARQ with acknowledgements and timeouts.', 'Encryption: symmetric (one key) vs asymmetric (public + private keys).'],
        gens: ['csParity', 'csISBN', 'csTransmit'], easy: ['csParity'] },
      { id: 'cs-web', title: 'The internet and the web', obj: ['5.1'], kw: 'internet world wide web url http https dns browser cookies', learn: [],
        hook: 'What happens in the half second after you press Enter on a web address.',
        scenes: [
          { say: idea('The <b>internet</b> is the giant network of connected computers (the roads). The <b>world wide web</b> is the collection of web pages travelling over it (the cars). Your browser turns a web address into a page in a few quick steps.') },
          { say: 'Type a URL and press Enter.', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ You type <b>https://www.example.com/page.html</b> (protocol, domain name, file).</p>', '<p>2️⃣ The browser asks a <b>DNS</b> server: "What is the IP address of www.example.com?"</p>', '<p>3️⃣ DNS replies with the IP address.</p>', '<p>4️⃣ The browser requests the page from the <b>web server</b> at that IP address (HTTPS = encrypted).</p>', '<p>5️⃣ The server sends the <b>HTML</b>; the browser <b>renders</b> it into the page you see. 🌐</p>'] } },
          { say: '<b>Cookies</b> are small files a website stores in your browser. <b>Session cookies</b> are deleted when you close the browser (e.g. a shopping cart). <b>Persistent cookies</b> stay (e.g. remembering your login and preferences).',
            ask: T('What does the DNS do?', ['Turns domain names into IP addresses', 'Stores all web pages', 'Encrypts the page'], 0, 'Like a phone book for the internet.') }
        ],
        keys: ['Internet (infrastructure) vs WWW (web pages).', 'URL = protocol + domain name + file name.', 'Browser → DNS → IP → web server → HTML rendered. HTTPS encrypts.', 'Cookies: session vs persistent; browser functions.'],
        gens: ['csInternet'], easy: ['csInternet'] },
      { id: 'cs-security', title: 'Digital currency and cyber security', obj: ['5.2', '5.3'], kw: 'digital currency blockchain cyber security malware phishing firewall', learn: [],
        hook: 'The tricks attackers use, and the locks that stop them.',
        scenes: [
          { say: idea('A <b>blockchain</b> is a shared ledger where each record is locked to the one before it, so changing an old record breaks the whole chain and everyone notices. <b>Cyber security</b> is about knowing the attacks and putting the right defence against each one.') },
          { say: 'Try to tamper with an old block.', anim: X([{ k: 'e', label: 'Edit block 2?', min: 0, max: 1, v: 0, fmt: i => ['no', 'yes'][i] }], v => `<p class="center bigq">🧱1 ✅ → 🧱2 ${v.e ? '✏️❌' : '✅'} → 🧱3 ${v.e ? '❌' : '✅'} → 🧱4 ${v.e ? '❌' : '✅'}</p><p class="center">${v.e ? 'Changing block 2 breaks the link to every block after it: the tampering is obvious.' : 'Each block is time-stamped and linked to the previous one.'}</p>`) },
          { say: 'Know each attack and its defence:', pic: '<table class="tbl"><tr><th>threat</th><th>what it does</th></tr><tr><td>brute force</td><td>tries every password</td></tr><tr><td>data interception</td><td>reads data in transit</td></tr><tr><td>DDoS</td><td>floods a server so it crashes</td></tr><tr><td>hacking</td><td>unauthorised access</td></tr><tr><td>malware</td><td>virus, worm, Trojan, spyware, adware, ransomware</td></tr><tr><td>phishing</td><td>fake emails that steal details</td></tr><tr><td>pharming</td><td>redirects you to a fake website</td></tr><tr><td>social engineering</td><td>tricks people, not computers</td></tr></table><p class="center">🛡️ Defences: access levels, anti-malware, authentication (passwords, biometrics, two-step), automating updates, checking spelling and URLs, firewalls, privacy settings, proxy servers, SSL/HTTPS</p>',
            ask: T('A fake email asks you to "confirm your bank password". This is…', ['phishing', 'pharming', 'a DDoS attack', 'brute force'], 0, 'Check the sender and never click suspicious links.') }
        ],
        keys: ['Digital currency exists only electronically; blockchain = time-stamped, unalterable ledger.', 'Threats: brute force, interception, DDoS, hacking, malware types, phishing, pharming, social engineering.', 'Solutions: access levels, anti-malware, authentication, firewalls, proxy servers, SSL, privacy settings, updates.'],
        gens: ['csInternet'], easy: ['csInternet'] }
    ] });

  R2O.addModule({ subject: 'computing', id: 'cs-hw', name: 'Hardware, software and new tech', icon: '🖥️', color: '#4f46e5', book: BOOK,
    blurb: 'Syllabus 3, 4 and 6: the CPU, devices and sensors, storage, network hardware, software, translators, automation, robots and AI.',
    lessons: [
      { id: 'cs-cpu', title: 'The CPU', obj: ['3.1'], kw: 'cpu von neumann fetch decode execute registers cache cores clock embedded', learn: [],
        hook: 'Billions of times a second, your CPU does the same three steps.',
        scenes: [
          { say: idea('The CPU runs a loop: <b>fetch</b> the next instruction from memory, <b>decode</b> what it means, <b>execute</b> it. Special registers hold addresses and data as they move along <b>buses</b>. More <b>cores</b>, a bigger <b>cache</b> and a faster <b>clock</b> make the loop go faster.') },
          { say: 'Step through one cycle.', anim: { type: 'reveal', keep: true, stages: ['<p>1️⃣ <b>PC</b> (program counter) holds the address of the next instruction. It is copied to the <b>MAR</b>.</p>', '<p>2️⃣ The address goes along the <b>address bus</b> to RAM; the instruction comes back on the <b>data bus</b> into the <b>MDR</b>. PC goes up by 1.</p>', '<p>3️⃣ The instruction is copied into the <b>CIR</b> and the <b>control unit (CU)</b> decodes it.</p>', '<p>4️⃣ It is executed, e.g. the <b>ALU</b> does a calculation and stores the result in the <b>accumulator (ACC)</b>.</p>', '<p>🔁 Repeat, billions of times a second.</p>'] } },
          { say: 'Performance:', anim: X([{ k: 'c', label: 'Cores', min: 1, max: 8, v: 2 }, { k: 'g', label: 'Clock (GHz)', min: 1, max: 5, v: 3 }], v => `<p class="center bigq">⚡ up to ${v.c * v.g} billion instruction cycles per second</p><p class="center small muted">(roughly: real speed also depends on cache size and whether software can use all the cores)</p>`) },
          { say: 'An <b>instruction set</b> is the list of machine-code commands a CPU understands. An <b>embedded system</b> is a small computer inside a device with one job (washing machine, car, vending machine).', ask: T('Which register holds the address of the next instruction?', ['PC', 'MDR', 'ACC', 'CIR'], 0, 'Program counter.') }
        ],
        keys: ['Von Neumann: ALU, CU, registers (PC, MAR, MDR, CIR, ACC), buses (address, data, control).', 'Fetch–decode–execute cycle.', 'Cores, cache, clock speed affect performance.', 'Instruction set; embedded systems.'],
        gens: ['csHardware'], easy: ['csHardware'] },
      { id: 'cs-devices', title: 'Input, output and storage', obj: ['3.2', '3.3'], kw: 'input devices output devices sensors ram rom storage virtual memory cloud', learn: [],
        hook: 'Getting data in, getting results out, and keeping it safe.',
        scenes: [
          { say: idea('Input devices turn the real world into data; output devices turn data back into something we see, hear or that moves. <b>Primary storage</b> (RAM, ROM) is what the CPU uses directly; <b>secondary storage</b> keeps data permanently.') },
          { say: 'Pick a job, choose the sensor.', anim: X([{ k: 'j', label: 'Job', min: 0, max: 5, v: 0, fmt: i => ['street light', 'greenhouse watering', 'car parking', 'burglar alarm', 'fish tank', 'phone screen rotation'][i] }], v => `<p class="center bigq">${['💡 light sensor', '💧 moisture (and temperature) sensor', '📏 proximity sensor', '🚨 infra-red / acoustic sensor', '🧪 pH and temperature sensors', '📱 accelerometer'][v.j]}</p>`) },
          { say: 'Storage types:', pic: '<ul><li><b>RAM</b>: volatile, holds what is running now. <b>ROM</b>: non-volatile, holds the start-up (boot) instructions.</li><li><b>Magnetic</b> (HDD): spinning platters, tracks and sectors, electromagnets.</li><li><b>Optical</b> (CD, DVD, Blu-ray): lasers read pits and lands.</li><li><b>Solid-state</b> (SSD, USB stick, SD card): NAND/NOR flash, transistors with floating gates. No moving parts.</li><li><b>Virtual memory</b>: part of secondary storage used as RAM when RAM is full (slower).</li><li><b>Cloud</b>: stored on remote servers, accessed over the internet.</li></ul>',
            ask: T('Why does a computer need ROM as well as RAM?', ['ROM keeps the boot instructions when the power is off', 'ROM is faster than RAM', 'RAM cannot store programs'], 0, 'RAM is volatile.') }
        ],
        keys: ['Input devices (barcode/QR scanner, camera, keyboard, mic, mouse, touch screens…) and output devices (actuator, projectors, printers, screens, speaker…).', 'Sensors and choosing the right one.', 'RAM vs ROM; magnetic, optical, solid-state; virtual memory; cloud pros and cons.'],
        gens: ['csHardware'], easy: ['csHardware'] },
      { id: 'cs-network-hw', title: 'Network hardware', obj: ['3.4'], kw: 'nic mac address ip address ipv4 ipv6 router', learn: [],
        hook: 'Every device online has two addresses. Here is why.',
        scenes: [
          { say: idea('A <b>MAC address</b> is burnt into a device\'s network card when it is made: <b>who</b> the device is. An <b>IP address</b> is given by the network: <b>where</b> it is right now, like a postal address. A <b>router</b> reads IP addresses to forward data to the right place.') },
          { say: 'Compare IPv4 and IPv6.', pic: '<p class="center bigq">IPv4: 192.168.1.20</p><p class="center">32 bits · 4 denary numbers 0–255 · about 4 billion addresses</p><p class="center bigq">IPv6: 2001:0db8:85a3::8a2e:0370:7334</p><p class="center">128 bits · groups of hex · enough addresses for every device on Earth</p>',
            ask: T('Which address changes when you move your laptop to another network?', ['IP address', 'MAC address', 'Both stay the same'], 0, 'The MAC address is fixed at manufacture.') },
          { say: 'IP addresses can be <b>static</b> (never changes, e.g. a web server) or <b>dynamic</b> (assigned each time you connect). A MAC address = manufacturer code + serial code, usually written in hex.' }
        ],
        keys: ['NIC needed to connect; MAC address set at manufacture (hex, manufacturer + serial code).', 'IP address allocated by the network: static or dynamic; IPv4 vs IPv6.', 'Router: forwards data, assigns IP addresses, connects LAN to the internet.'],
        gens: ['csHardware'], easy: ['csHardware'] },
      { id: 'cs-software', title: 'Software, interrupts and translators', obj: ['4.1', '4.2'], kw: 'operating system application software interrupts compiler interpreter assembler ide high-level low-level', learn: [],
        hook: 'How your code turns into something the CPU can actually run.',
        scenes: [
          { say: idea('Software comes in layers: the <b>hardware</b> runs the <b>firmware</b>, which starts the <b>operating system</b>, which runs your <b>apps</b>. Programmers write in human-friendly <b>high-level</b> languages, so a <b>translator</b> must convert the code into machine code the CPU understands.') },
          { say: 'Compiler or interpreter?', anim: X([{ k: 't', label: 'Translator', min: 0, max: 1, v: 0, fmt: i => ['interpreter', 'compiler'][i] }], v => `<p class="center bigq">${v.t ? '📦 compiler' : '🗣️ interpreter'}</p><ul>${v.t ? '<li>translates the <b>whole program at once</b></li><li>produces an <b>executable file</b> (fast to run, code hidden)</li><li>reports <b>all errors</b> at the end</li><li>used for the <b>final</b> program</li>' : '<li>translates and runs <b>one line at a time</b></li><li>no executable file</li><li><b>stops at the first error</b>, showing exactly where</li><li>handy while <b>developing</b></li>'}</ul>`) },
          { say: 'Interrupts: a key press (hardware) or dividing by zero (software) sends a signal; the CPU pauses, runs an <b>interrupt service routine</b>, then carries on.', ask: T('Assembly language needs which translator?', ['An assembler', 'A compiler', 'An interpreter'], 0, 'It uses mnemonics like ADD and LDA.') },
          { say: 'An <b>IDE</b> helps you write code: editor, run-time environment, translator, error diagnostics, auto-completion, auto-correction, prettyprint.' }
        ],
        keys: ['System software (OS, utilities) vs application software.', 'OS functions; hardware → firmware → OS → apps.', 'Interrupts: hardware and software; ISR.', 'High-level vs low-level; assembler, compiler, interpreter; IDE features.'],
        gens: ['csSoftware'], easy: ['csSoftware'] },
      { id: 'cs-emerging', title: 'Automation, robots and AI', obj: ['6.1', '6.2', '6.3'], kw: 'automated systems robotics artificial intelligence expert systems machine learning', learn: [],
        hook: 'Machines that sense, decide and act on their own.',
        scenes: [
          { say: idea('An automated system is a loop: <b>sensors</b> measure → a <b>microprocessor</b> compares with what it should be → <b>actuators</b> act → measure again. Robots add a body that moves. <b>AI</b> adds the ability to reason with data and rules, and sometimes to <b>learn</b>.') },
          { say: 'Run an automatic greenhouse.', anim: X([{ k: 'm', label: 'Soil moisture (%)', min: 0, max: 100, step: 5, v: 25 }], v => `<p class="center">🌡️ sensor reads <b>${v.m}%</b> → microprocessor compares with 40% target</p><p class="center bigq">${v.m < 40 ? '💧 actuator opens the valve' : '✋ valve stays closed'}</p><p class="center small muted">…then it measures again, over and over.</p>`) },
          { say: 'Two kinds of AI to know:', pic: '<ul><li><b>Expert system</b>: knowledge base + rule base + inference engine + interface (e.g. diagnosing illness).</li><li><b>Machine learning</b>: the program adapts its own processes or data from experience (e.g. spam filters improving).</li></ul>',
            ask: T('A robot must have…', ['a mechanical structure, electrical parts (sensors, microprocessor, actuators) and be programmable', 'a human face', 'internet access'], 0, 'e.g. factory arms, drones, robot vacuums.') }
        ],
        keys: ['Automated systems: sensors + microprocessor + actuators; advantages and disadvantages in context.', 'Robots: mechanical structure, electrical components, programmable; uses and pros/cons.', 'AI: data + rules, reasoning, learning; expert systems and machine learning.'],
        gens: ['csEmerging'], easy: ['csEmerging'] }
    ] });
})();
