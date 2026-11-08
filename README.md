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
shared/           deck.js and style.css — every lesson uses these
lesson01/
  content.js      the lesson, both versions
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

The work and sport versions use separate presenter channels, so having both
open never makes one drive the other.

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
