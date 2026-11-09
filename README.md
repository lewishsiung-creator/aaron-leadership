# Performance-Driven Leadership — workshop decks

Interactive workshop decks for Aaron Kao's nine-lesson leadership course
(績效導向・領導力訓練), run by 極限人生企管顧問 · Inspire for Better. The
company name is on the course index and each title slide, as text — the
logo is not on the site. English at CEFR A2, with Chinese on the key words.
Every lesson comes in **two versions** from one source file:

- **work** — for working professionals (職場專業人士)
- **sport** — for athletes (運動員)

| Lesson | Deck | |
|---|---|---|
| 1 | Break Old Habits, Practice Change · 突破慣性、練習改變 | 19 slides — handout pages 1–3 only |

## Layout

```
index.html        the course index — cards come from lessons.js
lessons.js        nine lessons in three stages; `dir: null` = not built yet
shared/           deck.js, style.css, the two themes, lang.js
tools/strings.js  lists a lesson's strings / those still missing Chinese
lesson01/
  content.js      the lesson, both versions
  content.zh.js   its Chinese, for 中文 mode
  work/index.html sets window.AUDIENCE = 'work', loads ../content.js
  sport/index.html sets window.AUDIENCE = 'sport'
```

The engine began as the one built for Vicky's art-history decks
(`vicky-modern-art`), so the keys, slide types, word chips, presenter window
and touch behaviour are the same. Its README documents all of that.

## Two looks

The versions differ in design as well as wording. Lewis asked for a
"Steve Jobs" look for professionals and a "Nike" look for athletes; both
take the manner only — no logos, slogans or brand names.

- `shared/theme-work.css` — the keynote stage: black, one idea per slide,
  very large clean type (the system font), one blue for anything tappable.
- `shared/theme-sport.css` — the campaign poster: black, heavy condensed
  italic capitals (Barlow Condensed from Google Fonts; falls back to a
  system condensed face offline), one volt yellow-green, hard edges, a volt
  slash across the title slide.

`style.css` carries the layout and a default sea-blue look. Its surfaces go
through variables (`--card`, `--card-dim`, `--on-accent`, `--menu-bg`,
`--gold`), so a theme mostly swaps variables rather than rules. Themes must
not change layout: the phone and touchscreen rules at the end of
`style.css` depend on it.

## English and 中文 modes

Every page has a **中文 / EN** button (key **L** in a deck). The choice is
remembered in that browser; a link can force it with `?lang=zh` or
`?lang=en`. Switching in a deck reloads on the same slide, and an open
presenter window follows.

- `shared/lang.js` decides the mode and swaps any `[data-zh]` element.
- `lessonNN/content.zh.js` holds the Chinese as **[exact English, Chinese]**
  pairs. In Chinese mode the engine looks every slide string up by its
  English; anything missing stays English. After editing `content.js`, run
  `node tools/strings.js lessonNN --missing` to list what needs Chinese.
- Word chips flip: in Chinese mode a chip reads in Chinese, is marked **EN**,
  and its card leads with the Chinese and teaches the English. A short
  inline form can be set with `zhChip` in the GLOSSARY.
- The small line under a title swaps too: Chinese under English titles,
  English under Chinese ones.
- The Chinese is written for adults (not simplified to A2) and goes back to
  the handout's own wording where there is one — with the same corrections
  as the English (100×, neurons connect).
- The engine's own labels (ASK, Question 1 of 4, Reset…) are in the `UI`
  table at the top of `deck.js`. The `vote`, `match` and `rank` slide types
  are not used yet and their buttons are still English only.

## One file, two versions

In `content.js`:

- `v(work, sport)` — any text (or list) that differs between the versions.
- `only: 'work'` / `only: 'sport'` — a slide that appears in one version only.
- `sec: { title, zh }` on a slide starts a jump-menu section. `SECTIONS` is
  built from these, so the menu cannot drift when a slide is added.

## Slide types added for these decks

- `fill` — the handout's fill-in gaps. Write `[[answer]]` in a line; the box
  shows from the start and each click fills the next gap, so the room can
  guess first.
- `myelin` — two nerve fibres, bare and wrapped. *Send a signal* runs one
  down each: the bare one crawls, the wrapped one jumps gap to gap.
- `network` — a small brain network. *Practice once* is one rep: the road
  thickens and the pulse speeds up; at 10 reps it turns gold ("habit").
  Nothing is stored; Reset or a reload clears it.

Both diagrams are drawn in code. The handout's pictures (the myelin
illustration from 《成就密碼》, the micrograph, Conel's neuron drawings) are
copyrighted and are not used here.

## Presenting

| Key | What it does |
|---|---|
| `下一頁` / `→` / `Space` / click | Next build step, then next slide |
| `上一頁` / `←` | Back one step |
| `M` | Jump menu |
| `Backspace` | Return to where you jumped from |
| `N` | Speaker notes on this screen |
| `P` | Presenter window — laptop for you, deck on the projector |
| `F` | Fullscreen |
| `B` or `.` | Black screen while people talk; any key or click brings it back (most clickers have a button for this) |

The work and sport versions use separate presenter channels, so having both
open never makes one drive the other.

## Practice page (Aaron's English rehearsal)

`lessonNN/practice/` — for Aaron, who is **B1**, to rehearse delivering the
English deck. Linked from the lesson's card on the homepage. Two tabs
(`?v=work` / `?v=sport`).

- **Script, slide by slide** — what he says, first person, short sentences,
  with suggested minutes per slide (Lesson 1: about 44 minutes). Tap a line
  for the Chinese; 🔊 reads it with the browser's own voice (a stand-in, not
  a model to copy). Each slide links to that slide in the deck.
- **Hard words** — IPA, a stress respelling, and a tip.
- **Likely questions** — with a B1 answer, and the source where it matters
  (the 3,000 / 80% figures have none; Wood et al. 2002 gives ~43%; Lally et
  al. 2010 gives a 66-day median for forming a habit).
- **Workshop phrases** for running activities.

Data is `lessonNN/practice.js`. `SCRIPT` is keyed by each slide's English
title (`Q1`… for quizzes), so reordering slides does not break it; a slide
with no entry shows "講稿還沒寫". Printing the page shows all the Chinese.

## Presenting extras (UX pass, 9 November 2026)

- **Swipe** left/right turns the page on phones and tablets (not when the
  swipe starts on a diagram, video or timer).
- **Full screen** button in the HUD where the browser allows it (not on an
  iPhone, which has no full-screen API; hidden on phones anyway).
- **? / ? button** opens a keys-and-gestures panel, in the current language.
- **A refresh keeps the place**: the slide number is kept in the address
  (`#11`), so a reload or a shared link opens on that slide.
- **The screen stays awake** while a deck is open (Wake Lock API), from the
  first tap or key.
- **Timer**: Start is a filled button; at zero the clock blinks three times
  in the accent colour and says *Time's up! / 時間到！*.
- **Today's words** now shows its terms as cards (they used to run together
  as small text — the `terms` type had no styling of its own).
- **Homepage**: each version's button is a small sample of that deck's look.

## Workshop flow (9 November 2026)

A pass over the deck as a *workshop*, not a talk: the room should always
know where it is, every talking task should be timed, and the facilitator
should always know whether they are on time.

- **Agenda on every section divider**: all of today's sections in a row —
  done (✓, dimmed), now (highlighted), to come. Built from the `sec`
  markers, so it updates itself. Hidden on phones.
- **Progress bar in sections**: one segment per section, so the room sees
  how much of today is left.
- **Every pair task has a timer**: an ASK line takes `minutes` and shows a
  countdown under it (Lesson 1: *Two questions*, 2 minutes). A timer, and
  anything not yet revealed, no longer answers a stray tap.
- **Time's up chimes**: two soft notes made in the browser (no sound file),
  because the facilitator is facing the room. Sound is allowed by the Start
  press.
- **Black screen** with `B` or `.` (see the key table).
- **The activity's sample list is labelled** *An example day / 範例* — the
  room was meant to see it as an example, not as their own answers.
- **Presenter window is now the facilitator's cockpit**:
  - a workshop clock that starts when you leave slide 1 (going back to
    slide 1 restarts it, so a rehearsal doesn't count);
  - the plan for this slide and whether you are *on time / N min behind /
    N min ahead* — the minutes come from `practice.js`, the same numbers
    Aaron rehearses with, so a lesson's deck pages load `../practice.js`;
  - the running timer, mirrored live, and *Time's up*;
  - **Next click:** what the next click will put on screen (the next
    number, the ASK, the answer, or the next slide);
  - a *black screen* button and indicator.
  The clocks update every second without redrawing the notes, so the notes
  never jump back to the top while being read.

## Lesson 1 — corrections to the handout

Each is explained in that slide's speaker notes, in Chinese, for Aaron.

- **Myelin speed.** The handout says myelin makes signals **3,000×** faster.
  In *The Talent Code* the speed gain is about **100×**; 3,000× is Coyle's
  combined "processing" figure (speed × shorter recovery time). The slide
  says "up to 100× faster".
- **神經元*神經元 = 神經纖維** is not right: a nerve fibre is one neuron's own
  axon. The slide says "neurons connect, and connections make networks".
- Handwritten **"Every habit's is formed by practicing"** →
  "Every habit is formed by practice."
- **「人有無限潛能」** is softened on screen to "your brain can change at any
  age" — neuroplasticity shows change is possible for life, not that it is
  unlimited.

## Lesson 1 — open questions for Aaron

- **3,000 decisions a day and 80% on autopilot** are kept as printed, but
  neither has a findable source. The best-known study (Wood, Quinn & Kashy,
  2002) found about **43%** of daily behaviour is habitual.
- **The stage grouping** (1–3 Leading Self, 4–6 Leading Others,
  7–9 Leading Change) is read off the box positions in the handout's diagram.
- **"Monday → Sunday"** (handwritten, starred) was turned into the
  "Your week" activity — a guess at what he meant.
- **"(Video)"** next to 習慣成自然 names no video.
- **"Video: Arthur and Page"** is taken to be Arthur Boorman and Diamond
  Dallas Page, *Never, Ever Give Up* (YouTube `qX9FSZJu448`). Needs internet.
- The handout continues with 發現自己「無效習慣」的方法; the deck currently ends
  on that as "Next".
