/* ------------------------------------------------------------------
   The course: nine lessons in three stages. This drives the index page.

   `dir: null` = not built yet (the card shows, greyed, not clickable).
   Every built lesson has two decks: dir/work/ and dir/sport/.
   ------------------------------------------------------------------ */

/* Every lesson and stage carries both languages; the index shows the
   one the viewer picked (see shared/lang.js). */
const STAGES = [
  { en: 'Leading Self', zh: '領導自己' },
  { en: 'Leading Others', zh: '領導團隊' },
  { en: 'Leading Change', zh: '領導變革' }
];

const LESSONS = [
  { n: 1, stage: 0, dir: 'lesson01',
    title: 'Break Old Habits, Practice Change', zh: '突破慣性、練習改變',
    q: 'Why is it so hard to change — and how does the brain do it?',
    meta: 'Habits and the brain · myelin and practice demos · Arthur’s story · 4-question quiz',
    qZh: '為什麼改變這麼難？大腦又是怎麼做到的？',
    metaZh: '習慣與大腦 · 髓鞘與練習互動圖 · Arthur 的故事 · 4 題小測驗' },
  { n: 2, stage: 0, dir: null, title: 'Speak with Influence', zh: '說出影響力' },
  { n: 3, stage: 0, dir: null, title: 'Be Your Own Coach', zh: '激發領袖潛能、成為自己的教練' },
  { n: 4, stage: 1, dir: null, title: 'From Me to the Team', zh: '從個人到團隊的高效領導力' },
  { n: 5, stage: 1, dir: null, title: 'Solve Problems, Step by Step', zh: '一次就上手的問題分析與解決' },
  { n: 6, stage: 1, dir: null, title: 'Build a Winning Team', zh: '打造致勝團隊' },
  { n: 7, stage: 2, dir: null, title: 'Use Conflict Well', zh: '越吵越凝聚的衝突管理術' },
  { n: 8, stage: 2, dir: null, title: 'Influence That Works', zh: '掌握高效影響力' },
  { n: 9, stage: 2, dir: null, title: 'Lead with Your Strengths', zh: '用優勢解鎖獨特領導力' }
];
