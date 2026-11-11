# Road to O's

Free, concept-first courses for **nine Cambridge O Level subjects**, built for students who can't get Singapore-quality teaching. It runs in any browser, needs no account or server, and works offline on a cheap phone. The whole app is about 1.7 MB (about 530 KB zipped).

Open `index.html` to use it.

## A student's first visit

1. **Welcome and jobs**: a short intro, then "What would you like to be?" (doctor, engineer, programmer, lawyer…). Each job shows which O Level subjects help.
2. **Choose subjects**: the job's subjects are ticked; the student adds or removes any.
3. **English check**: 20 questions, pass mark 14. Pass → the chosen subjects open. Not yet → **Basic English** first (11 lessons in simple words: sentences, am/is/are, present and past, questions, linking words, exam command words, reading), then try again as often as they like.

## Subjects

| Subject | Syllabus | Modules | Lessons |
|---|---|---|---|
| Basic English | not an exam: the bridge into the others | 2 | 11 |
| Mathematics | 4024 (2025–27) | 10 | 79 |
| Physics | 5054 (2026–28) | 9 | 41 |
| Chemistry | 5070 (2026–28) | 8 | 26 |
| Biology | 5090 (2026–28) | 9 | 33 |
| Additional Mathematics | 4037 (2025–27) | 5 | 20 |
| Computer Science | 2210 (2026–28) | 5 | 20 |
| English Language | 1123 (2027–28) | 2 | 11 |
| Geography | 2217 (2027–29) | 3 | 17 |
| History | 2147 (2027–28) | 4 | 19 |

Every syllabus objective in every subject has at least one lesson (checked by the test). All nine syllabuses accept private candidates.

## How lessons teach

- **Concept first**: every lesson (all 277) opens with the big idea: why it works, or what it is for.
- **Pictures before rules**: forces as arrows, particles that speed up when heated, atoms built shell by shell, cells with labelled parts, Punnett squares, logic gates, flood hydrographs, timelines and more.
- **Try any numbers**: 270 slider explorers let students change one thing and watch what happens before they learn the method. History uses timelines and "weigh the causes" sliders; English uses original passages.
- **Explicit tiny steps**: worked steps on every practice question, with a hint and a second try.
- **Gentle feedback**: wrong answers explain why, without punishment.

## What else is inside

- **463 question generators**: practice questions are generated or drawn from shuffled banks, so students never run out.
- **Engagement**: a winding "road" map per subject, XP and levels, daily streak and goal ring, stars, combos, badges, a daily warm-up that targets weak topics, and a checkpoint battle at the end of each module.
- **Syllabuddy** (🦉 tab): answers "Is ___ on my exam?" from the official syllabus of whichever subject is open, with the objective and page, and knows common off-syllabus topics (e.g. Hess's law in Chemistry, glaciation in Geography, the 1789 French Revolution in History). It also explains topics, quizzes you and builds a revision list and exam countdown. It doesn't use a language model, so it never guesses.
- **Free resources** on every lesson: Khan Academy, BBC Bitesize, OpenStax and similar, plus the official syllabus page.
- **Write and get marked** (`js/writing.js`): 14 writing tasks (Basic English, English letters, speeches, descriptions, stories and summaries, plus "explain" answers in History, Geography, Biology, Physics, Chemistry and Computing). The marker runs on the phone, offline and free: it checks the task's key points, length, paragraphs and linking, vocabulary and sentence variety, and spelling, capitals and punctuation, then gives "what went well" and "next steps", highlights mistakes and shows an example answer. Optional deeper AI feedback through a free Cloudflare Worker: see `server/README.md`.
- **Help with English**: 🔊 read-aloud on every lesson step and question (the phone's own voice, works offline), and tap-a-word meanings for about 150 hard words (`data/glossary.js`).
- **Kinder marking**: accepts "The answer is…", "x = …", en dashes, and the usual 3 s.f. rounding; binary without leading zeros or answers rounded too early get a nudge instead of "wrong".
- **When stuck**: after 3 wrong answers in a row, the student is offered the big idea again, easier questions, or the lesson it builds on. Lessons in Add Maths, Physics, Chemistry and others show which earlier lessons they build on (`data/pathways.js`). "🙋 Ask someone" shares a question with a teacher or friend.

Progress is saved in the browser on that device only. Several learners can share one phone (each has a profile), and a **backup code** in the Me tab moves progress to a new phone or restores it after the browser is cleared.

## Files

```
index.html, styles.css, scenes.css
js/kit.js        random helpers, maths formatting, SVG drawings
js/app.js        subjects, router, views, XP/streak/badges, question rendering and marking
js/scenes.js     picture-first lesson player (maths)
js/scikit.js     shared picture kit for the other subjects (forces, circuits, atoms, cells, code…)
js/buddy.js      Syllabuddy: search over the open subject's syllabus, exclusions, intents
js/help.js       read-aloud, tap-a-word meanings, "ask someone"
js/writing.js    writing tasks and the offline writing marker
data/syllabus.js 4024 objectives; data/syl_*.js the other syllabuses
data/m*.js       maths modules; phy*, chem*, bio*, am*, cs*, en*, geo_course, hist_course: other subjects
data/basic_english.js  Basic English lessons and the English check
data/pathways.js careers → subjects, lesson prerequisites
data/glossary.js simple meanings of hard words
server/          optional free AI feedback (Cloudflare Worker)
tests/run.js     self-test
tests/simulate.js 100 simulated students
```

## Test

```
node tests/run.js
```

The test generates about 289 000 questions and checks that each is well formed and that its own answer is marked correct. It checks that every objective in every subject has a lesson, that every lesson opens with the big idea, that every explorer renders at its default, minimum and maximum, and that Syllabuddy's verdicts are right for each subject.

## Design

Road-sign green on warm grey paper, highway yellow for progress. One typeface, **Atkinson Hyperlegible** (Braille Institute), chosen because its letters are hard to confuse for weak readers; it ships in `fonts/` (SIL Open Font License) so the app stays offline. Icons are inline SVG line icons (`js/icons.js`); subjects use short letter badges. Colours and spacing are tokens at the top of `styles.css`; on laptops the menu becomes a side rail. Design rules applied by hand from the Hallmark design skill (no emoji icons, no tracked-caps labels or eyebrows, no nested cards or side stripes, focus rings on every control).

## Notes

Lessons, questions and reading passages are original. Syllabus wording is quoted from the publicly available Cambridge syllabuses (© Cambridge University Press & Assessment); the PDFs are not included. Links are on each subject's syllabus page in the app. Road to O's is not affiliated with or endorsed by Cambridge.
