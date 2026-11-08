/* ------------------------------------------------------------------
   Lesson 1 · practice page data — for Aaron, to rehearse the English.

   Aaron is B1. The script is what HE says, in the first person: short
   sentences, a little above the A2 on the slides, with the workshop
   phrases he needs to run activities. Every line has its Chinese, which
   the page hides until tapped.

     SCRIPT   keyed by the slide's English title (quiz slides: 'Q1'…), so
              it survives slides being reordered. A slide with no entry
              shows as "script still to write".
     s(en, zh)        one line
     v(work, sport)   a line that differs between the versions
     mins             suggested time on that slide, activity included
   ------------------------------------------------------------------ */

const s = (en, zh) => ({ en, zh });
const vv = (work, sport) => ({ work, sport });

const SCRIPT = {
  'Break Old Habits, Practice Change': { mins: 1, lines: [
    s('Good morning, everyone. Thank you for coming.', '大家早安，謝謝大家來。'),
    s('My name is Aaron, and I am a leadership coach.', '我是 Aaron，我是領導力教練。'),
    s('Today’s topic is “Break Old Habits, Practice Change.”', '今天的主題是「突破慣性、練習改變」。'),
    vv(s('This is a workshop, not a lecture. You will talk, think and try things.', '這是工作坊，不是演講。大家要說、要想、要動手試。'),
       s('This is a workshop — think of it as a training session. You will talk, think and try things.', '這是工作坊，就把它當成一堂訓練課。大家要說、要想、要動手試。'))
  ]},
  'Two questions': { mins: 3, lines: [
    s('Before we start, I have two questions for you.', '開始之前，我想問大家兩個問題。'),
    vv(s('First: do people like to work with you?', '第一：大家喜歡跟你一起工作嗎？'),
       s('First: do people like to train with you?', '第一：大家喜歡跟你一起練習嗎？')),
    vv(s('Second: do people want to be like you?', '第二：大家想成為像你這樣的人嗎？'),
       s('Second: do young players want to be like you?', '第二：年輕選手想成為像你這樣的人嗎？')),
    s('Turn to the person next to you. You have one minute each. Please be honest!', '請轉向旁邊的人，每人一分鐘。說實話喔！'),
    s('Okay, time’s up. Who would like to share?', '好，時間到。誰想分享一下？')
  ]},
  'Nine lessons, three steps': { mins: 2, lines: [
    s('This is the whole course: nine lessons in three steps.', '這是整個課程：九堂課，三個階段。'),
    s('First, we lead ourselves. Then we lead others. Then we lead change.', '先領導自己，再領導別人，然後領導改變。'),
    s('Before you can lead a team, you need to lead yourself.', '要帶好團隊，先要帶好自己。'),
    s('Today is lesson one, and it starts with our habits.', '今天是第一課，從我們的習慣開始。')
  ]},
  'Your Brain and Habits': { mins: 2, lines: [
    vv(s('Let me ask you something. What did you do this morning before nine o’clock?', '我想問大家：今天早上九點以前，你做了哪些事？'),
       s('Let me ask you something. What did you do this morning before training?', '我想問大家：今天練習以前，你做了哪些事？')),
    s('Did you think about each thing, or did you just do it?', '每一件事你都有想過嗎？還是直接就做了？'),
    s('Most people say, “I didn’t think. I just did it.” That is our topic today.', '大部分人會說：「沒想，就直接做了。」這就是今天的主題。')
  ]},
  'Every day…': { mins: 3, lines: [
    s('How many decisions do you think you make every day? Take a guess.', '你覺得自己每天做幾個決定？猜猜看。'),
    s('The number on my handout is about three thousand.', '我講義上的數字是大約三千個。'),
    s('And most of them happen on autopilot — we don’t really think.', '其中大部分是自動駕駛模式，我們沒有真的在想。'),
    s('Why? Because thinking is hard work. Too many decisions make the brain tired.', '為什麼？因為思考很累。決定太多，大腦會疲勞。'),
    s('So the brain saves energy. It uses habits.', '所以大腦會省力，它用習慣來處理。')
  ]},
  'Your week: Monday → Sunday': { mins: 6, lines: [
    s('Now it’s your turn. Think about a normal week, from Monday to Sunday.', '現在換你們。想一想普通的一週，從星期一到星期日。'),
    s('Write down three things you do every day without thinking.', '寫下三件你每天不用想就會做的事。'),
    s('Then share with your partner. Is each habit good for you, or not?', '然後跟夥伴分享：每一個習慣對你有幫助嗎？'),
    s('You have three minutes. Ready? Go!', '你們有三分鐘。準備好了嗎？開始！'),
    s('Let’s hear from two or three people. There are no right or wrong answers.', '請兩三位分享。沒有對錯。'),
    s('Thank you. Here is my only question: is this habit helping you?', '謝謝。我只問一個問題：這個習慣有幫到你嗎？')
  ]},
  'Where do habits come from?': { mins: 1.5, lines: [
    s('So where do habits come from?', '那習慣是從哪裡來的？'),
    s('Every habit is formed by practice.', '每個習慣，都是練出來的。'),
    s('Good habits and bad habits are made in the same way: we repeat them.', '好習慣和壞習慣形成的方式一樣：一再重複。'),
    s('This is good news. If you practiced a bad habit, you can also practice a good one.', '這是好消息。壞習慣是你練出來的，好習慣你也練得出來。')
  ]},
  'How Your Brain Makes a Habit': { mins: 0.5, lines: [
    s('Now, a little science. Don’t worry — it’s simple.', '接下來講一點科學。別擔心，很簡單。')
  ]},
  'Four steps to a habit': { mins: 3, lines: [
    s('Step one: when you move, think or feel, your neurons send small electric signals.', '第一步：你動作、思考或感受時，神經元會傳送微小的電訊號。'),
    s('Step two: when you do the same thing again and again, the brain wraps that network in myelin.', '第二步：同一件事做了一次又一次，大腦會用髓鞘把那個網路包起來。'),
    s('Step three: myelin stops the signal from leaking, so it can travel up to one hundred times faster.', '第三步：髓鞘防止訊號外漏，訊號最多可以快一百倍。'),
    s('Step four: now it’s a habit. We call it muscle memory.', '第四步：它變成習慣了，我們叫它肌肉記憶。'),
    vv(s('Think about typing. At first you looked at every key. Now your fingers just know.', '想想打字。一開始每個鍵都要看，現在手指自己就知道。'),
       s('Think about your first serve, and your thousandth serve. At first it was hard. Now it’s easy.', '想想你的第一次發球和第一千次發球。一開始很難，現在很輕鬆。'))
  ]},
  'Why myelin makes you fast': { mins: 2, lines: [
    s('Let me show you. I’m going to send the same signal down two nerve fibers.', '我示範給大家看。我會把同一個訊號送進兩條神經纖維。'),
    s('Watch the top one. No myelin — it’s slow.', '看上面那條。沒有髓鞘，很慢。'),
    s('Now the bottom one. With myelin, the signal jumps. It’s much faster.', '再看下面那條。有髓鞘，訊號用跳的，快很多。'),
    vv(s('Practice is how you build myelin. No practice, no myelin.', '髓鞘是練出來的。沒有練習，就沒有髓鞘。'),
       s('Every rep builds myelin. No reps, no myelin.', '每多練一次就多一點髓鞘。不練，就沒有髓鞘。'))
  ]},
  'Practice builds the road': { mins: 3, lines: [
    s('Our brain has about eighty-six billion neurons, and they connect to each other.', '我們的大腦有大約八百六十億個神經元，彼此互相連接。'),
    s('Can I have a volunteer? Please come up and press “Practice once” ten times.', '可以請一位自願者嗎？請上台按十次「練習一次」。'),
    s('Everybody, count with me: one, two, three…', '大家跟我一起數：一、二、三……'),
    s('Look — the road gets thicker, and the signal gets faster.', '看，路變粗了，訊號也變快了。'),
    vv(s('Speaking up in a meeting is scary the first time. By the tenth time, it’s much easier. That is your brain changing.', '第一次在會議上發言會緊張，到第十次就輕鬆多了。這就是大腦在改變。'),
       s('Your first serve felt strange. Your thousandth serve feels automatic. That is your brain changing.', '第一次發球很彆扭，第一千次就自動化了。這就是大腦在改變。'))
  ]},
  'Habits: good news and bad news': { mins: 2, lines: [
    s('So, habits have a good side and a bad side.', '所以，習慣有好處也有壞處。'),
    vv(s('The good side: they make things automatic. You don’t need to think about how to drive.', '好處：讓事情自動化。開車不用想怎麼開。'),
       s('The good side: they make things automatic. You don’t need to think about your footwork.', '好處：讓事情自動化。步法不用想就會。')),
    vv(s('The bad side: they can make us rigid. We keep doing the same thing, even when it doesn’t work.', '壞處：可能讓我們僵化。就算沒效，還是一直用同一套。'),
       s('The bad side: they can make us rigid. We keep the same technique, even when the coach says it’s wrong.', '壞處：可能讓我們僵化。教練說不對，我們還是改不掉。')),
    s('But here is the best news: your brain can change at any age.', '但最好的消息是：大腦在任何年紀都能改變。'),
    s('So — trust your brain!', '所以，相信你的大腦！')
  ]},
  'Arthur’s story': { mins: 8, lines: [
    s('I want to show you a short video. It’s about five minutes.', '我想給大家看一支短片，大約五分鐘。'),
    s('This is Arthur. He was a soldier, and he was hurt. Doctors said he would never walk on his own again.', '這是 Arthur。他是軍人，受了傷。醫生說他再也無法自己走路。'),
    s('While you watch, think about this: what did Arthur do every day, and what changed?', '看的時候想一想：Arthur 每天做了什麼？什麼改變了？'),
    s('So, what did you see?', '大家看到了什麼？'),
    s('He practiced every day, even when he fell. Small steps, many times.', '他每天練習，跌倒了也繼續。一小步，練很多次。'),
    vv(s('Now think about your work. What is your “one more try”?', '現在想想你的工作：你的「再試一次」是什麼？'),
       s('Now think about your sport. What is your “one more rep”?', '現在想想你的運動：你的「再多練一次」是什麼？'))
  ]},
  'Q1': { mins: 1, lines: [
    s('Let’s check. Question one: what does myelin do?', '來檢查一下。第一題：髓鞘有什麼作用？'),
    s('Hands up for A… B… C… D.', '選 A 的舉手……B……C……D。'),
    s('The answer is B. Myelin makes the signal faster.', '答案是 B。髓鞘讓訊號變快。')
  ]},
  'Q2': { mins: 1, lines: [
    s('Question two: how does a habit form?', '第二題：習慣是怎麼形成的？'),
    s('The answer is C. You do it again and again.', '答案是 C。一做再做。')
  ]},
  'Q3': { mins: 1, lines: [
    s('Question three. What is Tom’s habit?', '第三題。Tom 的習慣是什麼？'),
    s('The answer is A: rigid. It’s hard for him to change.', '答案是 A：僵化。他很難改變。'),
    s('Some of you chose “automatic”. That’s also true — but the problem is that he can’t change.', '有人選「自動化」，那也沒錯，但問題是他改不了。')
  ]},
  'Q4': { mins: 1, lines: [
    vv(s('Last question. Mia always says “no” to new ideas. Can she change?', '最後一題。Mia 對新點子總是說「不」。她能改變嗎？'),
       s('Last question. Leo always drops his head after a mistake. Can he change?', '最後一題。Leo 失誤後總是低頭。他能改變嗎？')),
    s('The answer is C. Yes — with practice, the brain can change. Remember Arthur.', '答案是 C。可以，只要練習，大腦就能改變。想想 Arthur。')
  ]},
  'Today’s words': { mins: 2, lines: [
    s('Here are today’s key words.', '這些是今天的關鍵詞。'),
    s('Who can explain this one? In your own words.', '誰能解釋這個？用你自己的話說。'),
    s('Great. That’s exactly right.', '很好，完全正確。')
  ]},
  'Next: How to find the habits that don’t help you': { mins: 0.5, lines: [
    s('So now we know how habits are made.', '現在我們知道習慣是怎麼形成的了。'),
    s('Next, let’s find the habits that don’t help you.', '接下來，我們來找出那些對你沒幫助的習慣。')
  ]}
};

/* Words Aaron is likely to stumble on. `say` is what the 🔊 button reads. */
const WORDS = [
  { w: 'myelin', ipa: '/ˈmaɪ.ə.lɪn/', re: 'MY-uh-lin', zh: '髓鞘', tip: '重音在第一音節，不是 my-E-lin。' },
  { w: 'neuron', ipa: '/ˈnʊr.ɑːn/', re: 'NOOR-ahn', zh: '神經元' },
  { w: 'neuroplasticity', ipa: '/ˌnʊr.oʊ.plæˈstɪs.ə.ti/', re: 'noor-oh-plas-TIS-uh-tee', zh: '神經可塑性', tip: '重音在 TIS。可以先練 plastic → plasticity。' },
  { w: 'autopilot', ipa: '/ˈɔː.t̬oʊˌpaɪ.lət/', re: 'AW-toh-pie-lut', zh: '自動駕駛、慣性' },
  { w: 'automatic', ipa: '/ˌɔː.t̬əˈmæt̬.ɪk/', re: 'aw-tuh-MAT-ik', zh: '自動化', tip: '重音在 MAT，和 autopilot 不一樣。' },
  { w: 'muscle memory', ipa: '/ˈmʌs.əl ˈmem.ɚ.i/', re: 'MUSS-ul MEM-uh-ree', zh: '肌肉記憶', tip: 'muscle 的 c 不發音。' },
  { w: 'decision fatigue', ipa: '/dɪˈsɪʒ.ən fəˈtiːɡ/', re: 'dih-SIZH-un fuh-TEEG', zh: '決策疲勞', tip: 'fatigue 結尾是 /g/，不唸 fa-ti-gue。' },
  { w: 'rigid', ipa: '/ˈrɪdʒ.ɪd/', re: 'RIJ-id', zh: '僵化' },
  { w: 'nerve fiber', ipa: '/nɝːv ˈfaɪ.bɚ/', re: 'NURV FY-ber', zh: '神經纖維' },
  { w: 'eighty-six billion', ipa: '/ˌeɪ.t̬i sɪks ˈbɪl.jən/', re: 'AY-tee six BIL-yun', zh: '860 億', tip: 'billion 是「十億」：86 billion＝860 億。' },
  { w: 'thousandth', ipa: '/ˈθaʊ.zənθ/', re: 'THOW-zunth', zh: '第一千（次）', tip: '結尾 -ndth 很難，慢慢唸：thousand + th。' },
  { w: 'colleague', ipa: '/ˈkɑː.liːɡ/', re: 'KAH-leeg', zh: '同事', only: 'work' },
  { w: 'athlete', ipa: '/ˈæθ.liːt/', re: 'ATH-leet', zh: '運動員', tip: '兩個音節，不要加音變成 ath-a-lete。', only: 'sport' },
  { w: 'Arthur Boorman', ipa: '/ˈɑːr.θɚ ˈbʊr.mən/', re: 'AR-thur BOOR-mun', zh: '影片主角' }
];

/* Things people may ask, and a B1 answer he can give. */
const QA = [
  { q: 'Where does the number 3,000 come from?', qzh: '3,000 這個數字是哪裡來的？',
    a: 'Good question. It’s a popular estimate, not an exact number. The point is that we make thousands of small decisions every day. One well-known study found that about 43% of what we do every day is habit.',
    azh: '好問題。這是一個常見的估計，不是精確的數字。重點是我們每天會做成千上萬個小決定。一個有名的研究發現，我們每天做的事大約有 43% 是習慣。',
    note: '研究出處：Wood, Quinn & Kashy (2002)。講義上的 3,000 和 80% 都找不到出處，被問到時這樣回答最安全。' },
  { q: 'How long does it take to change a habit?', qzh: '改變一個習慣要多久？',
    a: 'You may hear “21 days”, but that’s a myth. One study found it takes about two months on average — and it’s different for each person. Missing one day is okay. Just keep going.',
    azh: '你可能聽過「21 天」，但那是迷思。有研究發現平均大約需要兩個月，而且每個人不一樣。漏掉一天沒關係，繼續就好。',
    note: '出處：Lally et al. (2010)，形成習慣的中位數是 66 天，範圍 18–254 天。' },
  { q: 'I’m over fifty. Is it too late for me to change?', qzh: '我五十幾歲了，現在改還來得及嗎？',
    a: 'No, it’s not too late. Your brain can change at any age. It may be a little slower, but it still changes. Remember Arthur’s story.',
    azh: '不會太晚。大腦在任何年紀都能改變。也許慢一點，但一定會變。想想 Arthur 的故事。' },
  { q: 'What is the first step?', qzh: '第一步是什麼？',
    a: 'Notice the habit. You can’t change a habit you can’t see. That is exactly what we will do next.',
    azh: '先察覺這個習慣。你看不見的習慣，就沒辦法改。這正是我們接下來要做的事。' },
  { q: 'I don’t have time to practice new habits.', qzh: '我沒有時間練新習慣。', only: 'work',
    a: 'Start very small — two minutes a day. Small and often is better than big and rare.',
    azh: '從很小開始，一天兩分鐘就好。少量多次，勝過偶爾一次做很多。' },
  { q: 'I have used this technique for ten years. Can I still fix it?', qzh: '這個動作我已經用了十年，還改得過來嗎？', only: 'sport',
    a: 'Yes, you can. But expect it to feel worse before it feels better. The old road is wide and the new road is narrow. Practice the new way slowly and often.',
    azh: '改得過來。但要有心理準備：會先變差，再變好。舊的路很寬，新的路很窄。用慢的速度、多次練新的動作。' }
];

/* Phrases for running a workshop in English. */
const PHRASES = [
  s('Turn to the person next to you.', '轉向你旁邊的人。'),
  s('You have three minutes. Ready? Go!', '你們有三分鐘。準備好了嗎？開始！'),
  s('One more minute!', '再一分鐘！'),
  s('Time’s up. Let’s come back together.', '時間到，我們回到全體。'),
  s('Take a guess before I show you.', '我揭曉之前先猜猜看。'),
  s('Hands up for A.', '選 A 的舉手。'),
  s('Let’s hear from two people.', '請兩位分享。'),
  s('Who would like to share?', '誰想分享？'),
  s('There are no right or wrong answers.', '沒有對錯。'),
  s('Good point. Anyone else?', '說得好。還有別人嗎？'),
  s('Can you say a little more about that?', '可以再多說一點嗎？'),
  s('Thank you for sharing.', '謝謝你的分享。'),
  s('Let’s move on.', '我們繼續。'),
  s('Can I have a volunteer?', '可以請一位自願者嗎？')
];
