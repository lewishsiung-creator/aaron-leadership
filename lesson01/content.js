/* ------------------------------------------------------------------
   Lesson 1 · Break Old Habits, Practice Change · 突破慣性、練習改變

   One file, two decks. The page that loads this sets
   window.AUDIENCE to 'work' (working professionals) or 'sport'
   (athletes) before it runs.

     v(work, sport)   the line that differs between the two versions
     only: 'work'     a slide that appears in one version only
     sec: {…}         the first slide of a jump-menu section

   Source: Aaron's printed handout, pages 1–3 (cover, the nine-lesson
   map, 大腦與慣性 ×2, 髓鞘, 神經可塑性), with his handwritten English
   notes. Everything after page 3 is still to come.
   ------------------------------------------------------------------ */

const AUD = window.AUDIENCE === 'sport' ? 'sport' : 'work';
const v = (work, sport) => (AUD === 'sport' ? sport : work);

/* Word chips. Definitions are written for this lesson, at A2. */
const GLOSSARY = {
  habit: {
    en: 'habit', zh: '習慣',
    def: 'Something you do again and again — often without thinking.',
    zhDef: '一再重複、常常不用想就會做的事。'
  },
  autopilot: {
    en: 'autopilot', zh: '慣性、自動駕駛',
    def: 'When you do something without thinking about it. Your brain does it for you.',
    zhDef: '不經思考就做出反應，大腦替你「自動駕駛」。'
  },
  decision: {
    en: 'decision', zh: '決定',
    def: 'A choice. You decide what to do, say or eat.',
    zhDef: '選擇；決定要做什麼、說什麼、吃什麼。'
  },
  decision_fatigue: {
    en: 'decision fatigue', zh: '決策疲勞',
    def: 'After many decisions your brain gets tired. Then you often take the easy choice.',
    zhDef: '做了太多決定，大腦累了，於是常常選最省力的那一個。'
  },
  neuron: {
    en: 'neuron', zh: '神經元',
    def: 'A brain cell. It sends very small electric signals.',
    zhDef: '腦細胞，會傳送很小的電訊號。'
  },
  nerve_fiber: {
    en: 'nerve fiber', zh: '神經纖維',
    def: 'The long, thin part of a neuron. The signal travels along it.',
    zhDef: '神經元細長的部分，訊號沿著它傳遞。'
  },
  signal: {
    en: 'signal', zh: '電脈衝、訊號',
    def: 'A very small electric message inside your body.',
    zhDef: '身體裡非常微小的電訊息。'
  },
  network: {
    en: 'network', zh: '電網、神經網路',
    def: 'Many neurons connected together. One network does one job — a move, a thought, a feeling.',
    zhDef: '許多神經元連在一起；一個網路負責一件事：一個動作、一個想法、一種感受。'
  },
  myelin: {
    en: 'myelin', zh: '髓鞘',
    def: 'A fatty layer around a nerve fiber. It stops the signal leaking out, so the signal goes much faster.',
    zhDef: '包在神經纖維外的脂肪層，防止訊號外漏，讓訊號傳得更快。'
  },
  muscle_memory: {
    en: 'muscle memory', zh: '肌肉記憶',
    def: 'Your body does a move without thinking, because you have practiced it many times.',
    zhDef: '練習很多次之後，身體不用想就能做出動作。'
  },
  use_it: {
    en: 'use it or lose it', zh: '用進廢退',
    def: 'If you use a skill, it gets stronger. If you stop, it gets weaker.',
    zhDef: '常用的能力會變強，不用就會退步。'
  },
  automatic: {
    en: 'automatic', zh: '自動化',
    def: 'It happens by itself. You do not need to think.',
    zhDef: '自己就會發生，不需要思考。'
  },
  rigid: {
    en: 'rigid', zh: '僵化',
    def: 'Hard to change. You do the same thing, even when it does not work.',
    zhDef: '很難改變；就算沒效，還是一直用同樣的方法。'
  },
  neuroplasticity: {
    en: 'neuroplasticity', zh: '神經可塑性',
    def: 'Your brain can change. When you practice, it builds new networks — at any age.',
    zhDef: '大腦會改變；只要練習，任何年紀都能建立新的神經網路。'
  },
  practice: {
    en: 'practice', zh: '練習',
    def: 'Doing something again and again to get better at it.',
    zhDef: '為了進步，一再重複做一件事。'
  },
  rep: {
    en: 'rep', zh: '一次（反覆次數）',
    def: 'One time you do a practice move. Ten reps = ten times.',
    zhDef: '練習動作做一次就是一個 rep；十個 rep 就是十次。'
  },
  leading_self: {
    en: 'Leading Self', zh: '領導自己',
    def: 'Leading yourself: your habits, your words, your goals. Everything starts here.',
    zhDef: '先帶好自己：自己的習慣、說話方式和目標。一切從這裡開始。'
  }
};

const SLIDES_ALL = [

  /* =============================== START */
  {
    type: 'title', sec: { title: 'Start', zh: '開場' },
    meta: 'Performance-Driven Leadership · Lesson 1 of 9',
    title: 'Break Old Habits, Practice Change',
    sub: v('突破慣性、練習改變 · a workshop for working professionals',
           '突破慣性、練習改變 · a workshop for athletes'),
    notes: [
      'Welcome everyone. Today is lesson one: breaking old habits, and practicing change.',
      v('This is a workshop. You will talk, think and try things — not just listen.',
        'This is a workshop, like a training session. You will talk, think and try things — not just listen.'),
      'NOTE 每個藍色底線的字都可以點，會跳出英文解釋和中文。按 P 開講者視窗，按 M 跳到任一段。'
    ]
  },
  {
    type: 'bullets',
    kicker: 'Before we start',
    title: 'Two questions',
    items: [
      { head: v('Do people like to work with you?', 'Do people like to train with you?'),
        body: v('Your team, your boss, your clients.', 'Your teammates, your coach.') },
      { head: v('Do people want to be like you?', 'Do young players want to be like you?'),
        body: 'Not because of your job title — because of how you act every day.' }
    ],
    ask: 'Talk to a partner. One minute each. Be honest!',
    notes: [
      'Read each question slowly. Give people a moment after each one.',
      v('Then: “Talk to the person next to you. One minute each.”',
        'Then: “Talk to the person next to you. One minute each.” Athletes usually answer fast — push for an example.'),
      'NOTE 手寫稿上是 “Do people want to be (like) you?”：要寫 be like you（想成為像你這樣的人）；be you 意思變成「想變成你本人」。',
      v('', 'NOTE 運動員版把 work with 改成 train with，第二題改成 young players，比較貼近球隊情境。可以依現場改。')
    ].filter(Boolean)
  },
  {
    type: 'flow',
    kicker: 'Performance-Driven Leadership · 績效導向・領導力訓練',
    title: 'Nine lessons, three steps',
    zh: '解鎖團隊績效九堂課',
    stages: [
      { head: '1 · Leading Self <span lang="zh-Hant">領導自己</span>',
        body: '<span class="lesson here">No.1 Break old habits ★ today</span>' +
              '<span class="lesson">No.2 Speak with influence</span>' +
              '<span class="lesson">No.3 Be your own coach</span>' },
      { head: '2 · Leading Others <span lang="zh-Hant">領導團隊</span>',
        body: '<span class="lesson">No.4 From me to the team</span>' +
              '<span class="lesson">No.5 Solve problems, step by step</span>' +
              '<span class="lesson">No.6 Build a winning team</span>' },
      { head: '3 · Leading Change <span lang="zh-Hant">領導變革</span>',
        body: '<span class="lesson">No.7 Use conflict well</span>' +
              '<span class="lesson">No.8 Influence that works</span>' +
              '<span class="lesson">No.9 Lead with your strengths</span>' }
    ],
    foot: 'First lead yourself. Then lead others. Then create change. And then — back to the start.',
    oneClick: true,
    notes: [
      'This is the whole course: nine lessons in three steps.',
      'We start with {{leading_self}}. Before you lead a team, you lead yourself.',
      'Today is lesson one.',
      'NOTE 九堂課的英文標題是依講義中文意譯成 A2 程度：2 說出影響力、3 激發領袖潛能·成為自己的教練、4 從個人到團隊的高效領導力、5 一次就上手的問題分析與解決、6 打造致勝團隊、7 越吵越凝聚的衝突管理術、8 掌握高效影響力、9 用優勢解鎖獨特領導力。',
      'NOTE 三個階段的分組（1–3 / 4–6 / 7–9）是依講義圖上方塊的位置推斷的，請 Aaron 確認。'
    ]
  },

  /* =============================== YOUR BRAIN AND HABITS */
  {
    type: 'section', sec: { title: 'Your brain and habits', zh: '大腦與慣性' },
    title: 'Your Brain and Habits',
    sub: '<span lang="zh-Hant">大腦與慣性</span>',
    ask: v('What did you do this morning before nine o’clock? Did you think about it?',
           'What did you do this morning before training? Did you think about it?'),
    notes: [
      'Ask the question. Take two or three answers.',
      'Most people say: “I didn’t think. I just did it.” That is our topic.'
    ]
  },
  {
    type: 'fill',
    title: 'Every day…',
    zh: '每個人平均每天要做幾個決定？',
    lines: [
      'You make about [[3,000]] {{decision}}s every day.',
      'About [[80%]] of them happen on {{autopilot}}.',
      'Too many decisions make your brain tired: [[{{decision_fatigue}}]].'
    ],
    ask: 'Guess first! Then I will show you the number.',
    notes: [
      'Before each click, ask the room to guess. Then click to show the number.',
      v('Example: what to wear, what to eat, which email first, what to say in a meeting…',
        'Example: what to eat, when to sleep, which drill first, what to do after a mistake…'),
      '“Your brain cannot think hard 3,000 times a day. So it uses {{autopilot}}.”',
      'NOTE 3,000 和 80% 是講義上的數字，但這兩個數字都找不到研究出處。最常被引用的研究（Wood, Quinn & Kashy, 2002，日記法）是：每天約 43% 的行為是習慣。若有人問「出處？」，建議改說 “thousands of decisions” 和 “almost half”。要不要改投影片上的數字，由 Aaron 決定。',
      'NOTE 「決策疲勞」是手寫補充，放在第三行。這個概念有名，但相關研究的重複驗證結果不一，所以只說「大腦會累」，不加數字。'
    ]
  },
  {
    type: 'activity',
    title: 'Your week: Monday → Sunday',
    zh: '你的一週：哪些事你不用想就做了？',
    instructions: [
      'Think about one normal week, Monday to Sunday.',
      'Write down three things you do every day without thinking.',
      'Tell a partner. Is each one good for you — or not?'
    ],
    questions: v(
      ['When do you check your phone or email?',
       'What do you always say in meetings?',
       'What do you do when you are stressed?'],
      ['What do you do before every training?',
       'What do you do after a mistake in a game?',
       'What do you do with your phone before sleep?']),
    minutes: 3,
    timeline: v(
      [['07:00', 'Phone in bed'], ['09:00', 'Coffee, then email'], ['12:30', 'Same lunch, same place'],
       ['15:00', 'Say “yes” to every meeting'], ['23:30', 'Phone in bed — again']],
      [['06:30', 'Same warm-up'], ['10:00', 'Skip the stretching'], ['13:00', 'Same lunch'],
       ['18:00', 'Head down after a mistake'], ['23:30', 'Phone in bed']]),
    notes: [
      'Three minutes. Press Start on the timer.',
      'The list on the right is only an example day — not theirs. Click to show the questions one at a time if people get stuck.',
      'After the timer: take two or three answers. Do not judge them. Just ask: “Is this habit helping you?”',
      'NOTE 手寫稿在這頁旁邊寫了 “Monday → Sunday” 並畫星號，我把它做成這個「你的一週」活動。如果 Aaron 原本的意思不是這樣，可以改。'
    ]
  },
  {
    type: 'quote',
    title: 'Where do habits come from?',
    quote: 'Every habit is formed by practice.',
    cite: 'Aaron Kao',
    plain: ['Good habits and bad habits are made the same way:',
            'you do something again and again, and your brain learns it.'],
    notes: [
      'Read it slowly. Then click for “In simple words”.',
      'Key point: a bad habit is also something you practiced. So a good habit can be practiced too.',
      'CORRECTED 手寫稿是 “Every habit’s is formed by practicing”：habit’s 多了 ’s，改成 “Every habit is formed by practice.”（by practicing 也可以，by practice 比較簡潔）。'
    ]
  },

  /* =============================== HOW A HABIT IS MADE */
  {
    type: 'section', sec: { title: 'How a habit is made', zh: '習慣怎麼形成' },
    title: 'How Your Brain Makes a Habit',
    sub: '<span lang="zh-Hant">大腦與慣性 · 《習慣領域》《成就密碼》</span>',
    notes: [
      'Now a little science. Do not worry — it is simple.',
      'NOTE 兩本來源書：游伯龍《習慣領域》、Daniel Coyle《成就密碼》(The Talent Code, 2009)。'
    ]
  },
  {
    type: 'flow',
    kicker: '《習慣領域》',
    title: 'Four steps to a habit',
    stages: [
      { head: '1 · You move, think or feel',
        body: '{{neuron}}s send small electric {{signal}}s. The signals run through a {{network}}.' },
      { head: '2 · You do it again and again',
        body: 'Your brain wraps that network in {{myelin}} — a fatty layer.' },
      { head: '3 · The signal goes faster',
        body: 'Myelin stops the signal leaking out. The signal can travel up to <b>100×</b> faster.' },
      { head: '4 · Now it is a habit',
        body: '{{habit}} · {{muscle_memory}} · {{use_it}}' }
    ],
    foot: v('Think of typing, or driving to work. Once, it was hard. Now it is easy.',
            'Think of your first serve, and your thousandth. Once, it was hard. Now it is easy.'),
    notes: [
      'One step per click. Use your hands: “signal… again and again… wrap… fast!”',
      v('Typing is a good example: at first you looked at every key. Now your fingers know.',
        'Every athlete knows this: at first you think about every part of the move. Later your body just does it.'),
      'CORRECTED 講義第 ② 點寫「提升傳遞速度 3000 倍」。這是誤引：在《成就密碼》裡，髓鞘讓訊號速度快約 100 倍；3,000 倍是作者把速度和訊號之間的恢復時間合在一起算的「處理能力」。生理學上，無髓鞘神經約每秒 0.5–2 公尺，有髓鞘可達每秒 100 公尺以上。投影片改成「最多快 100 倍」。',
      'NOTE 講義在「習慣成自然」旁手寫了 “(Video)”，但沒寫是哪支影片。如果有，告訴我就加一頁。'
    ]
  },
  {
    type: 'myelin',
    title: 'Why myelin makes you fast',
    zh: '髓鞘',
    caption: 'Press the button. The same signal goes down two {{nerve_fiber}}s.',
    points: [
      'No myelin: the signal leaks, and it is slow.',
      'With myelin: the signal jumps from gap to gap. It is much faster.',
      v('Every time you practice, you add a little more myelin.',
        'Every {{rep}} adds a little more myelin.')
    ],
    credit: 'Drawing after 《成就密碼》 The Talent Code, Daniel Coyle (2009)',
    notes: [
      'Press “Send a signal”. Press it again — people like to watch it twice.',
      'Then click through the three points.',
      v('“Practice is how you build myelin. No practice, no myelin.”',
        '“Every rep is how you build myelin. No reps, no myelin.”'),
      'NOTE 講義這頁用的是書中插圖和電子顯微鏡照片，有版權，不能放在公開網站，所以改成自己畫的示意圖，還可以按按鈕看訊號跑。'
    ]
  },
  {
    type: 'network',
    title: 'Practice builds the road',
    zh: '神經可塑性',
    caption: 'Your brain has about 86 billion {{neuron}}s. Neurons connect, and connections make {{network}}s.',
    skill: v('Skill: speaking up in a meeting', 'Skill: your first serve'),
    habit: v('10 reps — now it is a habit! It feels {{automatic}}.',
             '10 reps — now it is a habit! It feels {{automatic}}.'),
    points: [
      'Press “Practice once”. Watch the dark road.',
      'Every time you use it, the road gets thicker and the signal gets faster.',
      'This is {{neuroplasticity}}: your brain changes when you practice.'
    ],
    notes: [
      'Ask a volunteer to come up and press “Practice once” ten times. Count out loud with the room: one, two, three…',
      'At ten the road turns gold: “Now it is a habit.” Press Reset if you want to do it again.',
      v('“Speaking up in a meeting is scary the first time. By the tenth time, it is much easier. That is your brain changing.”',
        '“Your first serve felt strange. Your thousandth serve feels automatic. That is your brain changing.”'),
      'CORRECTED 講義寫「神經元*神經元 = 神經纖維；神經纖維*神經纖維 = 電網」。生物學上不正確：神經纖維是單一神經元自己的軸突，不是兩個神經元相乘；神經元之間的連接點叫突觸。投影片改成「神經元互相連接，連接形成網路」。860 億個神經元這個數字是對的。',
      'NOTE 講義用的四格神經元圖，是嬰兒大腦從出生到兩歲的發育圖（Conel 的經典插圖）；有版權，而且講的是發育，不是練習帶來的改變，所以這裡換成可以互動的網路圖。'
    ]
  },
  {
    type: 'fill',
    title: 'Habits: good news and bad news',
    zh: '習慣的好處與壞處',
    lines: [
      'Good news: a habit makes things [[{{automatic}}]].',
      'Bad news: a habit can make you [[{{rigid}}]].',
      'Best news: [[{{neuroplasticity}}]] — your brain can change at any age.',
      '[[Trust your brain!]]'
    ],
    notes: [
      v('Good: you don’t need to think about how to drive. Bad: you always answer email the same way — even when it doesn’t work.',
        'Good: you don’t need to think about your footwork. Bad: you keep the same technique even when the coach says it is wrong.'),
      'Then the best news: you can change. Your brain is built to change.',
      'End with energy: “Trust your brain!”',
      'NOTE 講義第 ⑤ 點是「神經可塑性證明『人有無限潛能』」。神經可塑性證明的是大腦一輩子都能改變，不等於「無限」；英文版寫成 “your brain can change at any age”，再接手寫的 “Trust your brain!”。如果 Aaron 想保留 unlimited potential 的說法，可以口頭講，但投影片上建議不要寫成科學證明。'
    ]
  },

  /* =============================== CAN PEOPLE REALLY CHANGE? */
  {
    type: 'video', sec: { title: 'Can people really change?', zh: '人真的能改變嗎' },
    title: 'Arthur’s story',
    caption: 'Arthur Boorman was a soldier in the Gulf War. He was hurt, and for 15 years he walked with sticks and braces. Doctors said he would never walk on his own. Then he met yoga teacher Diamond Dallas Page.',
    yt: 'qX9FSZJu448',
    poster: 'https://i.ytimg.com/vi/qX9FSZJu448/hqdefault.jpg',
    watchFor: 'What did Arthur do every day? What changed?',
    points: [
      'He practiced every day — even when he fell.',
      'Small steps, many times: his body and his brain changed.',
      v('At work, what is your “one more try”?', 'In your sport, what is your “one more rep”?')
    ],
    notes: [
      'The video is about five minutes. Some parts are emotional — let it play.',
      'Before you press play, read the “Watch for” question out loud.',
      'After the video, click the three points one at a time. Ask the last question to the whole room.',
      'NOTE 講義上手寫 “Video: Arthur and Page”，我判斷是 Arthur Boorman 和 Diamond Dallas Page（DDP Yoga）的影片 “Never, Ever Give Up. Arthur’s Inspirational Transformation!”。如果不是這支，告訴我。播放需要網路；沒網路時就在 YouTube 先下載好備用。'
    ]
  },

  /* =============================== CHECK */
  {
    type: 'quiz', sec: { title: 'Check', zh: '小測驗' },
    n: 1, of: 4,
    q: 'What does {{myelin}} do?',
    options: ['It makes new neurons.', 'It makes the signal faster.', 'It helps you sleep.', 'It makes you forget.'],
    answer: 1,
    why: 'Myelin wraps the nerve fiber, so the signal does not leak and goes much faster.',
    notes: ['Let people answer — hands up for A, B, C, D. Then click.', 'Answer: B.']
  },
  {
    type: 'quiz', n: 2, of: 4,
    q: 'How does a {{habit}} form?',
    options: ['You are born with it.', 'You read about it.', 'You do it again and again.', 'You think about it once.'],
    answer: 2,
    why: '“Every habit is formed by practice.” Good habits and bad habits too.',
    notes: ['Answer: C.']
  },
  {
    type: 'quiz', n: 3, of: 4,
    q: v('Tom always answers email the same way, even when it doesn’t work. His habit is…',
         'Tom keeps the same technique, even when his coach says it is wrong. His habit is…'),
    options: ['rigid', 'automatic', 'new', 'fast'],
    answer: 0,
    why: '{{rigid}} = hard to change. That is the bad side of a habit.',
    notes: ['Answer: A. Someone may say “automatic” — that is also true, but the problem here is that he cannot change.']
  },
  {
    type: 'quiz', n: 4, of: 4,
    q: v('Your colleague Mia always says “no” to new ideas. Can she change?',
         'Your teammate Leo always drops his head after a mistake. Can he change?'),
    options: v(
      ['No. That is who she is.', 'Only when she was young.', 'Yes — with practice, the brain can change.', 'Only if the boss tells her.'],
      ['No. That is who he is.', 'Only when he was young.', 'Yes — with practice, the brain can change.', 'Only if the coach tells him.']),
    answer: 2,
    why: '{{neuroplasticity}}: the brain can change at any age. Remember Arthur.',
    notes: ['Answer: C. Link back to Arthur’s video.']
  },
  {
    type: 'terms',
    title: 'Today’s words',
    zh: '今天的單字 · 點一下看解釋',
    terms: ['habit', 'autopilot', 'decision_fatigue', 'neuron', 'signal', 'network',
            'myelin', 'muscle_memory', 'use_it', 'automatic', 'rigid', 'neuroplasticity'],
    notes: ['Point to any word and ask: “Who can explain this one?”']
  },
  {
    type: 'section', sec: { title: 'Next', zh: '下一步' },
    title: 'Next: How to find the habits that don’t help you',
    sub: '<span lang="zh-Hant">發現自己「無效習慣」的方法</span>',
    notes: [
      'This is where the next part of the workshop starts.',
      'NOTE 這張便利貼是目前資料的最後一頁；後面的講義頁還沒給。拿到後，從這裡接下去。'
    ]
  }
];

/* Keep this version's slides, then build the jump menu from the
   `sec` markers so the indices can never drift. */
const SLIDES = SLIDES_ALL.filter(s => !s.only || s.only === AUD);
const SECTIONS = [];
SLIDES.forEach((s, i) => { if (s.sec) SECTIONS.push({ ...s.sec, start: i }); });
