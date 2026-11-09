/* ------------------------------------------------------------------
   Deck engine.

   Keys
     → / Space / click     next build step, then next slide
     ←                     back
     Backspace             return to where you jumped from
     M                     section menu
     N                     peek at speaker notes on this screen
     P                     open the presenter window (second screen)
     F                     fullscreen
     Esc                   close whatever is open
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const isPresenter = new URLSearchParams(location.search).has('presenter');
  /* One channel per deck page, so the work and sport versions of a
     lesson never drive each other's presenter window. */
  const CH = 'aaron-deck:' + location.pathname;

  /* ---------- English / 中文 ----------
     lang.js decides the mode. In Chinese mode every slide string is looked
     up in window.ZH (the lesson's content.zh.js) by its exact English text;
     anything not found stays English, so a gap shows rather than breaks.
     Run tools/strings.js <lesson> --missing to list the gaps. */
  const ZHMODE = !!window.ZHMODE;
  const ALT = ZHMODE ? 'en' : 'zh-Hant';   /* lang of the small second-language line */
  const UI = ZHMODE ? {
    simple: '簡單來說', ask: '問', watch: '注意看',
    question: (n, of) => `第 ${n} 題 · 共 ${of} 題`, reveal: '大家回答後再點一下',
    zoom: '點圖片放大', zoomAny: '點任一張圖片放大',
    yt: '需要網路 · <a href="https://www.youtube.com/watch?v=ID" target="_blank" rel="noopener">在 YouTube 開啟</a>',
    local: '影片在網站上，不需要網路',
    send: '送出訊號', practice: '練習一次', reset: '重來', reps: '次數',
    habit: '變成習慣了！', start: '開始', jump: '跳到',
    menuHint: 'Backspace 回到剛才那一頁 · N = 在這個螢幕看備註 · P = 講者視窗',
    peek: n => `備註 · 第 ${n} 頁 · 按 N 收起`,
    say: '要說的話', nextUp: '下一頁', end: '最後一頁', back: '← 上一頁', fwd: '下一頁 →',
    step: (a, b) => `步驟 ${a}/${b}`, mins: m => `已經 ${m} 分鐘`,
    up: '時間到！', full: '全螢幕', help: '操作說明',
    helpRows: [['下一頁 / → / 空白鍵 / 點畫面', '下一步，再到下一頁'], ['上一頁 / ←', '上一步'],
               ['左右滑動', '在手機和平板上翻頁'], ['M', '跳到某一段'], ['Backspace', '回到剛才那一頁'],
               ['N', '在這個螢幕看備註'], ['P', '講者視窗（放在你的電腦）'], ['F', '全螢幕'],
               ['B 或 .', '黑畫面：討論時讓大家看彼此，按任一鍵回來'],
               ['L', '中文 / English'], ['Esc', '關閉']],
    helpNote: '重新整理會停在同一頁。點有底線的詞可以看解釋。',
    nextClick: '下一下：', nextSlide: '換到下一頁', answer: '公布答案', allAtOnce: '整頁一次出現',
    clockWait: '離開第 1 頁時開始計時', elapsed: x => `已過 ${x}`, plan: (a, b) => `預計第 ${a}–${b} 分鐘`, total: m => `全長約 ${m} 分鐘`,
    onTime: '進度剛好', behind: m => `慢了 ${m} 分鐘`, ahead: m => `快了 ${m} 分鐘`,
    timer: '計時器', blank: '畫面是黑的 · 按 B 回來', blankBtn: '黑畫面 (B)', example: '範例'
  } : {
    simple: 'In simple words', ask: 'ASK', watch: 'WATCH FOR',
    question: (n, of) => `Question ${n} of ${of}`, reveal: 'Click when the class has answered',
    zoom: 'Click the picture to zoom', zoomAny: 'Click any picture to zoom',
    yt: 'Needs internet · <a href="https://www.youtube.com/watch?v=ID" target="_blank" rel="noopener">open on YouTube</a>',
    local: 'Plays from this site — no internet needed',
    send: 'Send a signal <span lang="zh-Hant">送出訊號</span>',
    practice: 'Practice once <span lang="zh-Hant">練習一次</span>', reset: 'Reset', reps: 'Reps',
    habit: 'Now it is a habit!', start: 'Start', jump: 'Jump to',
    menuHint: 'Backspace takes you back to where you jumped from. · N = notes on this screen · P = presenter window',
    peek: n => `Notes · slide ${n} · press N to hide`,
    say: 'Say this', nextUp: 'Next up', end: 'End of deck', back: '← Back', fwd: 'Next →',
    step: (a, b) => `step ${a}/${b}`, mins: m => `${m} min elapsed`,
    up: 'Time’s up!', full: 'full screen', help: 'Keys and gestures',
    helpRows: [['下一頁 / → / Space / tap', 'next step, then next slide'], ['上一頁 / ←', 'back one step'],
               ['swipe left / right', 'turn the page on a phone or tablet'], ['M', 'jump to a section'],
               ['Backspace', 'return to where you jumped from'], ['N', 'speaker notes on this screen'],
               ['P', 'presenter window (for your laptop)'], ['F', 'full screen'],
               ['B or .', 'black screen while people talk — any key brings it back'],
               ['L', '中文 / English'], ['Esc', 'close']],
    helpNote: 'A refresh keeps your place. Tap an underlined word for its meaning.',
    nextClick: 'Next click: ', nextSlide: 'next slide', answer: 'shows the answer', allAtOnce: 'shows the whole slide',
    clockWait: 'The clock starts when you leave slide 1', elapsed: x => `${x} elapsed`, plan: (a, b) => `plan ${a}–${b} min`, total: m => `about ${m} min in all`,
    onTime: 'on time', behind: m => `${m} min behind`, ahead: m => `${m} min ahead`,
    timer: 'Timer', blank: 'The screen is black · press B to bring it back', blankBtn: 'Black screen (B)', example: 'Example'
  };

  /* ---------- the time plan ----------
     Each slide's suggested minutes come from the lesson's practice.js
     (the same numbers Aaron rehearses with), looked up by the slide's
     English title — so this runs before the Chinese swap. A lesson with
     no practice.js simply has no plan, and the presenter shows only the
     clock. */
  const PLAN = SLIDES.map(s => {
    const key = s.title || (s.type === 'quiz' ? 'Q' + s.n : '');
    const sc = (typeof SCRIPT !== 'undefined') && SCRIPT[key];
    return sc ? sc.mins : 0;
  });
  const PLAN_END = [];
  PLAN.reduce((a, m, i) => (PLAN_END[i] = a + m), 0);
  const PLAN_TOTAL = PLAN_END.length ? PLAN_END[PLAN_END.length - 1] : 0;

  if (ZHMODE) {
    const ZH = window.ZH || {};
    const KEEP = new Set(['type', 'yt', 'dm', 'poster', 'src', 'terms', 'answer', 'n', 'of',
                          'minutes', 'only', 'oneClick', 'sec', 'zh']);
    const tr = v => {
      if (typeof v === 'string') return Object.prototype.hasOwnProperty.call(ZH, v) ? ZH[v] : v;
      if (Array.isArray(v)) return v.map(tr);
      if (v && typeof v === 'object') {
        const o = {};
        for (const k in v) o[k] = KEEP.has(k) ? v[k] : tr(v[k]);
        return o;
      }
      return v;
    };
    SLIDES.forEach((s, i) => {
      const t = tr(s);
      /* The small line under a title was the Chinese; now it is the English. */
      if (s.zh && s.title) t.zh = String(s.title).replace(/\{\{(\w+)\}\}/g, (m, k) => GLOSSARY[k] ? GLOSSARY[k].en : k);
      SLIDES[i] = t;
    });
    SECTIONS.forEach(sec => { const en = sec.title; sec.title = sec.zh || en; sec.zh = en; });
  }

  /* ---------- helpers ---------- */
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* Turn {{term}} into a tappable chip. Anything not in GLOSSARY is
     left as plain text, so a typo degrades quietly instead of vanishing. */
  function chips(s) {
    if (s == null) return '';
    return String(s).replace(/\{\{(\w+)\}\}/g, (m, key) => {
      const g = GLOSSARY[key];
      if (!g) return m.replace(/[{}]/g, '');
      return `<span class="chip" data-term="${key}" role="button" tabindex="0">${chipLabel(g)}</span>`;
    });
  }
  /* In Chinese mode a chip reads in Chinese, and its card leads with the
     Chinese and teaches the English — the other way round from English mode. */
  function chipLabel(g) { return ZHMODE ? (g.zhChip || g.zh) : g.en; }

  /* Same, but strips the markup — for the presenter window and menu. */
  function plainText(s) {
    if (s == null) return '';
    return String(s)
      .replace(/\{\{(\w+)\}\}/g, (m, k) => (GLOSSARY[k] ? chipLabel(GLOSSARY[k]) : k))
      .replace(/<[^>]+>/g, '');
  }

  /* ---------- how many click-steps each slide has ---------- */
  /* A slide marked `oneClick` keeps its build, but one click shows all of
     it — for slides she would rather put up in one go than item by item. */
  function stepsFor(s) {
    const n = rawSteps(s);
    return s.oneClick ? Math.min(n, 1) : n;
  }
  function rawSteps(s) {
    switch (s.type) {
      case 'bullets':  return s.items.length + (s.ask ? 1 : 0);
      case 'quote':    return (s.plain ? 1 : 0) + (s.ask ? 1 : 0);
      case 'compare':  return s.reveal ? s.reveal.length : 0;
      case 'artwork':  return s.points ? s.points.length : 0;
      case 'gallery':  return s.points ? s.points.length : 0;
      case 'twocol':   return 2;
      case 'break':    return 2;
      case 'quiz':     return 1;
      case 'section':  return s.ask ? 1 : 0;
      case 'activity': return s.questions ? s.questions.length : 0;
      case 'grid':     return s.cells.length;
      case 'flow':     return s.stages.length;
      case 'match':    return 1;
      case 'vote':     return 0;
      case 'timeline': return s.stops.length;
      case 'rank':     return s.questions ? s.questions.length : 0;
      case 'video':    return s.points ? s.points.length : 0;
      case 'fill':     return blanksIn(s).length + (s.ask ? 1 : 0);
      case 'myelin':
      case 'network':  return s.points ? s.points.length : 0;
      default:         return 0;
    }
  }

  /* The [[blanks]] in a fill slide, in reading order. */
  function blanksIn(s) {
    return s.lines.join('\n').match(/\[\[(.+?)\]\]/g) || [];
  }
  /* A blank keeps its box on screen from the start, like the gap in a
     printed handout; the answer inside appears on its click. */
  function fillLine(t) {
    return chips(t).replace(/\[\[(.+?)\]\]/g,
      (m, v) => `<span class="blank step"><span class="bv">${v}</span></span>`);
  }
  function pointsList(s) {
    return `<ul class="points">${(s.points || []).map((p, k) =>
      `<li class="step" data-step="${k}">${chips(p)}</li>`).join('')}</ul>`;
  }

  /* ---------- slide titles, for the menu and presenter ---------- */
  function titleOf(s) {
    if (s.type === 'word') return `“${s.word}”`;
    if (s.type === 'quiz') return ZHMODE ? `第 ${s.n} 題` : `Q${s.n}`;
    return plainText(s.title || s.q || '—');
  }

  /* =================================================================
     PRESENTER WINDOW
     ================================================================= */
  if (isPresenter) {
    document.body.className = 'presenter';
    const root = el('div', 'pv');
    document.body.appendChild(root);

    let idx = 0, step = 0, st = {};
    const mmss = ms => { const s = Math.max(0, Math.round(ms / 1000));
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

    /* draw() rebuilds the page when the slide or step changes; tick()
       only rewrites the clocks, once a second, so the notes never jump
       back to the top while she is reading them. */
    function draw() {
      const s = SLIDES[idx], nx = SLIDES[idx + 1];
      const notes = (s.notes || []).map(t => {
        let cls = '';
        if (/^(TEACHER|LEWIS|NOTE|CORRECTED)/.test(t)) cls = 'teach';
        if (/^ASK/.test(t)) cls = 'ask';
        return `<p class="${cls}">${chips(t)}</p>`;
      }).join('');
      const more = step < stepsFor(s);
      const nextLine = more
        ? `${UI.nextClick}<b>${st.nextStep ? plainText(st.nextStep) : (s.type === 'quiz' ? UI.answer : '…')}</b>`
        : `${UI.nextClick}${UI.nextSlide}${nx ? ` · <b>${titleOf(nx)}</b>` : ''}`;

      root.innerHTML = `
        <div class="pv-top">
          <div class="where">${idx + 1} / ${SLIDES.length} · ${titleOf(s)}</div>
          <div class="clock">${UI.step(step, stepsFor(s))}</div>
        </div>
        <div class="pv-time">
          <span class="pv-clock"></span><span class="pv-pace"></span>
          ${PLAN_TOTAL ? `<span class="pv-total">${UI.total(Math.round(PLAN_TOTAL))}</span>` : ''}
        </div>
        <div class="pv-timer"></div>
        <div class="pv-blank">${UI.blank}</div>
        <div class="pv-click">${nextLine}</div>
        <h3>${UI.say}</h3>
        <div class="notes">${notes || '<p>—</p>'}</div>
        <div class="next"><div>${UI.nextUp}</div>
          <div class="n-title">${nx ? titleOf(nx) : UI.end}</div></div>
        <div class="pv-nav">
          <button data-go="prev">${UI.back}</button>
          <button data-go="next">${UI.fwd}</button>
          <button data-go="blank" class="quiet">${UI.blankBtn}</button>
        </div>`;
      root.querySelectorAll('[data-go]').forEach(b => {
        b.onclick = () => post({ nav: b.dataset.go });
      });
      tick();
    }

    function tick() {
      const clock = root.querySelector('.pv-clock');
      if (!clock) return;
      const pace = root.querySelector('.pv-pace');
      if (!st.startedAt) {
        clock.textContent = UI.clockWait; pace.textContent = ''; pace.className = 'pv-pace';
      } else {
        const ms = Date.now() - st.startedAt, m = ms / 60000;
        clock.textContent = UI.elapsed(mmss(ms));
        if (PLAN[idx]) {
          const from = PLAN_END[idx] - PLAN[idx], to = PLAN_END[idx];
          const fmt = x => +x.toFixed(1);
          let txt = UI.onTime, cls = 'ok';
          if (m > to + 0.5) { txt = UI.behind(Math.round(m - to) || 1); cls = 'late'; }
          else if (m < from - 0.5) { txt = UI.ahead(Math.round(from - m) || 1); cls = 'early'; }
          pace.textContent = `${UI.plan(fmt(from), fmt(to))} · ${txt}`;
          pace.className = 'pv-pace ' + cls;
        } else { pace.textContent = ''; pace.className = 'pv-pace'; }
      }
      const tb = root.querySelector('.pv-timer');
      if (st.timerEnd) {
        tb.className = 'pv-timer on';
        tb.innerHTML = `<span>${UI.timer}</span> ${mmss(st.timerEnd - Date.now())}`;
      } else if (st.timerDone) {
        tb.className = 'pv-timer on done';
        tb.innerHTML = `<span>${UI.timer}</span> ${UI.up}`;
      } else tb.className = 'pv-timer';
      root.querySelector('.pv-blank').classList.toggle('on', !!st.blank);
    }

    const bc = ('BroadcastChannel' in window) ? new BroadcastChannel(CH) : null;
    function post(msg) {
      if (bc) bc.postMessage(msg);
      else localStorage.setItem(CH + ':cmd', JSON.stringify({ ...msg, t: Date.now() }));
    }
    function receive(d) {
      if (!d || d.nav) return;
      const redraw = d.idx !== idx || d.step !== step || d.nextStep !== st.nextStep;
      idx = d.idx; step = d.step; st = d;
      redraw ? draw() : tick();
    }
    if (bc) bc.onmessage = e => receive(e.data);
    window.addEventListener('storage', e => {
      if (e.key === CH + ':state') receive(JSON.parse(e.newValue));
    });

    const saved = localStorage.getItem(CH + ':state');
    if (saved) { st = JSON.parse(saved); idx = st.idx || 0; step = st.step || 0; }
    draw();
    setInterval(tick, 1000);

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); post({ nav: 'next' }); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); post({ nav: 'prev' }); }
      if (e.key === 'b' || e.key === 'B' || e.key === '.') post({ nav: 'blank' });
    });
    return;
  }

  /* =================================================================
     MAIN DECK
     ================================================================= */
  const stage = document.getElementById('stage');
  const progress = document.getElementById('progress');
  const menu = document.getElementById('menu');
  const peek = document.getElementById('peek');
  const chipcard = document.getElementById('chipcard');
  const lightbox = document.getElementById('lightbox');
  const counter = document.getElementById('count');
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');

  let idx = 0, step = 0, jumpFrom = null, presenterWin = null;
  /* A clock left over from another day is not this workshop's. */
  let startedAt = +(localStorage.getItem(CH + ':started') || 0) || null;
  if (startedAt && Date.now() - startedAt > 6 * 3600e3) startedAt = null;

  /* ---------- progress, in sections ----------
     One segment per section, so the room can see how much of today is
     left, not just how many slides. */
  progress.classList.add('seg');
  progress.innerHTML = (SECTIONS.length ? SECTIONS : [{ start: 0 }]).map((sec, k, all) => {
    const end = all[k + 1] ? all[k + 1].start : SLIDES.length;
    return `<b style="flex-grow:${end - sec.start}" data-a="${sec.start}" data-z="${end}"><i></i></b>`;
  }).join('');
  function paintProgress() {
    progress.querySelectorAll('b').forEach(b => {
      const a = +b.dataset.a, z = +b.dataset.z;
      b.firstChild.style.width = Math.max(0, Math.min(1, (idx + 1 - a) / (z - a))) * 100 + '%';
    });
  }

  /* Scale the whole deck off the viewport so it reads from the back row. */
  function fit() {
    const base = Math.min(window.innerWidth / 78, window.innerHeight / 46);
    /* The floor is what keeps text readable from the back of a room, but
       on a phone held in landscape there is no back of the room — there
       are 375 logical pixels of height, and a floor of 11px guarantees
       the slide overflows. Short viewports get to go smaller. */
    const floor = window.innerHeight < 520 ? 8 : 11;
    stage.style.fontSize = Math.max(floor, Math.min(26, base)) + 'px';
  }
  window.addEventListener('resize', fit);

  /* ---------- render every slide once ---------- */
  const nodes = SLIDES.map((s, i) => {
    const n = el('div', 'slide s-' + s.type);
    n.dataset.i = i;
    n.innerHTML = render(s, i);
    stage.appendChild(n);
    return n;
  });

  /* A countdown. Any slide where the room talks to each other gets one:
     an activity, or a pair task in an ASK line (`minutes` on the slide). */
  function timerHTML(mins) {
    return `<div class="timer" data-mins="${mins}">
      <div class="clock">${String(mins).padStart(2, '0')}:00</div><div class="up">${UI.up}</div>
      <button data-timer="start" class="go">${UI.start}</button>
      <button data-timer="reset">${UI.reset}</button>
    </div>`;
  }
  function askBlock(text, stepped, mins) {
    return `<div class="ask ${stepped ? 'step' : ''} ${mins ? 'has-timer' : ''}" ${stepped ? 'data-step="ask"' : ''}>
      <span class="tag">${UI.ask}</span><span class="q">${chips(text)}</span>${mins ? timerHTML(mins) : ''}</div>`;
  }

  /* Where the room is in today's workshop: every section divider carries
     the whole agenda, with the sections done, the one starting now, and
     the ones to come. */
  function agenda(i) {
    if (SECTIONS.length < 3) return '';
    let now = 0;
    SECTIONS.forEach((sec, k) => { if (sec.start <= i) now = k; });
    return `<ol class="agenda" aria-label="${UI.jump}">${SECTIONS.map((sec, k) =>
      `<li class="${k < now ? 'done' : k === now ? 'now' : ''}">${sec.title}</li>`).join('')}</ol>`;
  }

  function render(s, i) {
    switch (s.type) {

      case 'title':
        return `<div class="meta">${s.meta || ''}</div>
          <h1>${chips(s.title)}</h1>
          <div class="sub">${chips(s.sub)}</div>`;

      case 'word':
        return `<div class="big">${s.word}</div>`;

      case 'section':
        return `${agenda(i)}<h1>${chips(s.title)}</h1>
          ${s.sub ? `<div class="sub">${chips(s.sub)}</div>` : ''}
          ${s.ask ? askBlock(s.ask, true) : ''}`;

      case 'bullets':
        return `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}
          <h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <ul>${s.items.map((it, k) => `
            <li class="step" data-step="${k}">
              <div class="head">${chips(it.head)}</div>
              ${it.body ? `<div class="body">${chips(it.body)}</div>` : ''}
            </li>`).join('')}</ul>
          ${s.ask ? askBlock(s.ask, true, s.minutes) : ''}`;

      /* `src` is optional — a photograph of the document the quote comes
         from. With one, the slide splits into two columns. */
      case 'quote': {
        const body = `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}
          <h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          ${s.lead ? `<div class="lead">${chips(s.lead)}</div>` : ''}
          <blockquote>${chips(s.quote)}</blockquote>
          <cite>${s.cite}</cite>
          ${s.plain ? `<div class="plain step" data-step="plain">
            <div class="plain-label">${UI.simple}</div>
            ${s.plain.map(p => `<p>${chips(p)}</p>`).join('')}</div>` : ''}
          ${s.ask ? askBlock(s.ask, true) : ''}`;
        if (!s.src) return body;
        return `<div class="q-body">${body}</div>
          <div class="q-doc"><img src="${s.src}" decoding="async" alt="${plainText(s.caption || s.title || '')}">
            ${s.srcLabel ? `<div class="doc-lbl">${s.srcLabel}</div>` : ''}</div>`;
      }

      case 'compare':
        return `<h2>${chips(s.title)}</h2>
          ${s.ask ? askBlock(s.ask, false) : ''}
          <div class="compare-wrap">
            <div class="compare-pane" data-side="left">
              <img src="${s.left.src}" decoding="async" alt="${plainText(s.left.label || '')}">
              <div class="lbl">${s.left.label}</div></div>
            <div class="compare-pane" data-side="right">
              <img src="${s.right.src}" decoding="async" alt="${plainText(s.right.label || '')}">
              <div class="lbl">${s.right.label}</div></div>
          </div>
          <div class="compare-note"></div>`;

      case 'artwork':
        return `<div class="art"><img src="${s.src}" decoding="async" alt="${plainText(s.caption || s.title || '')}" data-soft="${!!s.smallSource}"></div>
          <div class="side">
            <h2>${chips(s.title)}</h2>
            <div class="cap">${s.caption}</div>
            ${s.ask ? askBlock(s.ask, false) : ''}
            <ul class="points">${(s.points || []).map((p, k) =>
              `<li class="step" data-step="${k}">${chips(p)}</li>`).join('')}</ul>
            <div class="zoom-hint">${UI.zoom}${s.smallSource ? ' (small source — stays modest on purpose)' : ''}</div>
          </div>`;

      /* Same two-column shape as an artwork slide, but the picture side
         holds a 2×2 of stills rather than one work. For a thing that is
         made of many images at once — a film, a series, a comic. */
      case 'gallery':
        return `<div class="gal">${s.images.map(im =>
            `<figure><img src="${im.src}" decoding="async" alt="${plainText(im.cap || s.title || '')}">${
              im.cap ? `<figcaption>${chips(im.cap)}</figcaption>` : ''}</figure>`).join('')}</div>
          <div class="side">
            <h2>${chips(s.title)}</h2>
            ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
            <div class="cap">${s.caption}</div>
            ${s.ask ? askBlock(s.ask, false) : ''}
            <ul class="points">${(s.points || []).map((p, k) =>
              `<li class="step" data-step="${k}">${chips(p)}</li>`).join('')}</ul>
            <div class="zoom-hint">${UI.zoomAny}</div>
          </div>`;

      case 'twocol':
        return `<h2>${chips(s.title)}</h2>
          <div class="cols">
            ${['left', 'right'].map((side, k) => {
              const c = s[side];
              return `<div class="col step" data-step="${k}">
                <h3>${chips(c.head)}</h3>
                <div class="zh" lang="zh-Hant">${c.zh}</div>
                <div class="lead">${chips(c.lead)}</div>
                <ul>${c.items.map(x => `<li>${chips(x)}</li>`).join('')}</ul>
              </div>`;
            }).join('')}
          </div>`;

      case 'break':
        return `<h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <div class="chain-label">${s.chainLabel}</div>
          <div class="chain">${s.chain.map((c, k) =>
            `<span>${c}</span>${k < s.chain.length - 1 ? '<i>→</i>' : ''}`).join('')}</div>
          <div class="after step" data-step="1">
            <div class="after-label">${s.after.label}</div>
            <ul>${s.after.items.map(x => `<li>${chips(x)}</li>`).join('')}</ul>
          </div>`;

      case 'activity':
        return `<div class="left">
            <h2>${chips(s.title)}</h2>
            ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
            <ul>${s.instructions.map(x => `<li>${chips(x)}</li>`).join('')}</ul>
            ${s.questions ? `<ul class="q-list">${s.questions.map((q, k) =>
              `<li class="step" data-step="${k}">${chips(q)}</li>`).join('')}</ul>` : ''}
            ${s.ask ? askBlock(s.ask, false) : ''}
            ${timerHTML(s.minutes)}
          </div>
          <div class="right">${s.timelineLabel ? `<div class="tl-label">${chips(s.timelineLabel)}</div>` : ''}${s.timeline ? `<ul class="tl">${s.timeline.map(([y, m]) =>
            `<li><span class="yr">${y}</span><span>${m}</span></li>`).join('')}</ul>` : ''}</div>`;

      /* A video sits behind a facade until she clicks it: seven YouTube
         players loading at once would stall the whole deck, and nothing
         should start playing because a slide scrolled past. */
      case 'video':
        return `<div class="vid">
            <div class="vid-frame" data-yt="${s.yt || ''}" data-dm="${s.dm || ''}" data-src="${s.src || ''}"
                 ${s.poster ? `style="background-image:url(${s.poster})"` : ''}>
              <button class="vid-play" aria-label="Play"><span>▶</span></button>
            </div>
            ${s.watchFor ? `<div class="vid-watch"><span class="tag">${UI.watch}</span>${chips(s.watchFor)}</div>` : ''}
          </div>
          <div class="side">
            <h2>${chips(s.title)}</h2>
            <div class="cap">${s.caption}</div>
            <ul class="points">${(s.points || []).map((p, k) =>
              `<li class="step" data-step="${k}">${chips(p)}</li>`).join('')}</ul>
            ${s.yt ? `<div class="zoom-hint">${UI.yt.replace('ID', s.yt)}</div>`
                   : s.dm ? `<div class="zoom-hint">Needs internet · <a href="https://www.dailymotion.com/video/${s.dm}" target="_blank" rel="noopener">open on Dailymotion</a></div>`
                   : `<div class="zoom-hint">${UI.local}</div>`}
          </div>`;

      /* A show of hands, tallied on screen. Groups vote, she records the
         round, and a later round can be compared with the first — which is
         the whole point of her activity. Nothing is stored: a reload clears
         it, because this is a class discussion, not a result. */
      case 'vote':
        return `<h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          ${s.question ? `<div class="vote-q">${chips(s.question)}</div>` : ''}
          <div class="vote-opts">${s.options.map((o, k) => `
            <button class="vote-opt" data-opt="${k}" data-n="0">
              <span class="vote-letter">${'ABCDEF'[k]}</span>
              <span class="vote-label">${chips(o)}</span>
              <span class="vote-count">0</span>
              <span class="vote-minus" data-vote="minus" title="one fewer">−</span>
            </button>`).join('')}</div>
          <div class="vote-rounds"></div>
          <div class="vote-tools">
            <button data-vote="record">Record this round</button>
            <button data-vote="reset">Reset counts</button>
            <span class="vote-hint">Click an option to add a vote · the small − takes one away</span>
          </div>`;

      /* Cards to pair up. Students argue on paper; one group then comes to
         the screen and proposes their pairing for the share-out. Clicking
         forms pairs freely — nothing is judged until she reveals. */
      case 'match': {
        /* A fixed shuffle, so the right column is stable across reloads and
           identical on the presenter screen. */
        const order = s.pairs.map((_, k) => k);
        for (let k = order.length - 1; k > 0; k--) {
          const j = (k * 7 + 3) % (k + 1);
          [order[k], order[j]] = [order[j], order[k]];
        }
        return `<h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          ${s.instructions ? `<div class="match-task">${chips(s.instructions)}</div>` : ''}
          <div class="match-cols">
            <ul class="match-side" data-side="a">${s.pairs.map((pr, k) =>
              `<li><button class="match-card" data-side="a" data-pair="${k}">
                 <span class="match-badge"></span>${chips(pr.a)}</button></li>`).join('')}</ul>
            <ul class="match-side" data-side="b">${order.map(k =>
              `<li><button class="match-card" data-side="b" data-pair="${k}">
                 <span class="match-badge"></span>${chips(s.pairs[k].b)}</button></li>`).join('')}</ul>
          </div>
          <div class="match-tools">
            <button data-match="clear">Clear</button>
            <span class="match-hint">Click one from each side to pair them · click a paired card to take it out</span>
          </div>`;
      }

      /* Four stages with arrows between them — a theory traced from raw
         material to finished practice. Revealed one stage at a time. */
      case 'flow':
        return `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}
          <h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <div class="stages">${s.stages.map((st, k) => `
            <div class="stage step" data-step="${k}">
              <div class="stage-head">${chips(st.head)}</div>
              <div class="stage-body">${chips(st.body)}</div>
            </div>${k < s.stages.length - 1 ? '<i class="stage-arrow">→</i>' : ''}`).join('')}</div>
          ${s.foot ? `<div class="stage-foot">${chips(s.foot)}</div>` : ''}`;

      /* A story told in dated stops. */
      case 'timeline':
        return `<h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <ol class="stops">${s.stops.map((st, k) => `
            <li class="stop step" data-step="${k}">
              <div class="stop-when">${st.when}</div>
              <div class="stop-what">${chips(st.what)}</div>
            </li>`).join('')}</ol>`;

      case 'grid':
        return `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}
          <h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <div class="cells" style="grid-template-columns:repeat(${s.cols || 2},1fr)">${s.cells.map((c, k) => `
            <div class="cell step" data-step="${k}">
              <div class="cell-label">${c.label}</div>
              <div class="cell-head">${chips(c.head)}</div>
              ${c.body ? `<div class="cell-body">${chips(c.body)}</div>` : ''}
            </div>`).join('')}</div>`;

      /* Ranking board. Groups argue on paper; one group then comes to the
         screen and puts the cards in their order for the share-out. */
      case 'rank':
        return `<div class="left">
            <h2>${chips(s.title)}</h2>
            ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
            <div class="rank-task">${chips(s.task)}</div>
            <div class="rank-cards">${s.items.map((it, k) => `
              <button class="rank-card" data-card="${k}">
                <span class="rank-badge"></span>
                ${it.src ? `<img src="${it.src}" decoding="async" alt="${plainText(it.label || it.head || '')}">`
                         : `<span class="rank-glyph"><span class="g">${it.glyph}</span></span>`}
                <span class="rank-lbl">${it.label}</span>
              </button>`).join('')}</div>
            <div class="rank-tools">
              <button data-rank="reset">Clear the order</button>
              <span class="rank-hint">Click the cards in order · click a numbered card to take it out</span>
            </div>
          </div>
          <div class="right">
            <ul class="q-list">${s.questions.map((q, k) =>
              `<li class="step" data-step="${k}">${chips(q)}</li>`).join('')}</ul>
            ${timerHTML(s.minutes)}
          </div>`;

      case 'quiz':
        return `<div class="qnum">${UI.question(s.n, s.of || 6)}</div>
          <div class="qtext">${chips(s.q)}</div>
          <ul class="opts">${s.options.map((o, k) =>
            `<li class="${k === s.answer ? 'right' : ''}">
              <span class="k">${'ABCD'[k]}</span><span>${chips(o)}</span></li>`).join('')}</ul>
          <div class="why">${chips(s.why)}</div>
          <div class="reveal-hint">${UI.reveal}</div>`;

      case 'terms':
      case 'end':
        return `<h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <div class="termgrid">${s.terms.map(t =>
            `<span class="chip" data-term="${t}" role="button" tabindex="0">${chipLabel(GLOSSARY[t])}</span>`).join('')}</div>`;

      /* A handout page with gaps. Each click fills the next gap, so the
         room can call out a guess before the number goes up. */
      case 'fill':
        return `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}
          <h2>${chips(s.title)}</h2>
          ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
          <div class="fill-lines">${s.lines.map(l =>
            `<p class="fill-line">${fillLine(l)}</p>`).join('')}</div>
          ${s.ask ? askBlock(s.ask, true) : ''}`;

      /* Two nerve fibres side by side, one bare and one wrapped. One button
         sends a signal down both at once: the bare one crawls, the wrapped
         one jumps from gap to gap and arrives long before. */
      case 'myelin': {
        const segs = [0, 1, 2, 3, 4, 5].map(k =>
          `<rect class="my-seg" x="${150 + k * 72}" y="-15" width="62" height="30" rx="15"/>`).join('');
        const lane = (y, wrapped, label, zh) => `
          <g transform="translate(0 ${y})">
            <text class="my-lane" x="130" y="-30">${label} <tspan lang="zh-Hant">${zh}</tspan></text>
            <circle class="my-body" cx="80" cy="0" r="34"/>
            ${[-1, 0, 1].map(d => `<line class="my-den" x1="80" y1="0" x2="${30 + d * 12}" y2="${-50 + Math.abs(d) * 22}"/>`).join('')}
            <line class="my-axon" x1="112" y1="0" x2="600" y2="0"/>
            ${wrapped ? segs : ''}
            <path class="my-end" d="M600 0 l26 -18 M600 0 l30 0 M600 0 l26 18"/>
            <circle class="my-dot ${wrapped ? 'fast' : 'slow'}" cx="112" cy="0" r="10"/>
          </g>`;
        return `<div class="demo my-demo">
            <svg viewBox="-10 -20 660 330" role="img" aria-label="${plainText(s.title)}">
              ${lane(60, false, 'No myelin', '沒有髓鞘')}
              ${lane(230, true, 'With myelin', '有髓鞘')}
              <g class="my-labels">
                <text x="80" y="306" text-anchor="middle">cell body · <tspan lang="zh-Hant">神經元細胞體</tspan></text>
                <text x="390" y="306" text-anchor="middle">nerve fiber · <tspan lang="zh-Hant">神經纖維</tspan></text>
                <text x="370" y="266" text-anchor="middle" class="my-tag">myelin · <tspan lang="zh-Hant">髓鞘</tspan></text>
              </g>
            </svg>
            <button class="demo-btn" data-demo="myelin">${UI.send}</button>
          </div>
          <div class="side">
            <h2>${chips(s.title)}</h2>
            ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
            ${s.caption ? `<div class="cap">${chips(s.caption)}</div>` : ''}
            ${pointsList(s)}
            ${s.credit ? `<div class="zoom-hint">${s.credit}</div>` : ''}
          </div>`;
      }

      /* A small brain network. Each press of Practice is one rep: the same
         road gets used again, so it gets thicker and the signal runs it
         faster. Ten reps and it is wrapped — a habit. Nothing is stored. */
      case 'network': {
        const N = [[40,180],[120,90],[130,250],[210,170],[250,60],[260,290],[330,130],
                   [340,230],[420,70],[430,180],[450,300],[520,120],[540,240],[610,170],
                   [180,330],[380,330],[590,60],[70,60]];
        const E = [[0,1],[0,2],[1,4],[2,5],[1,3],[2,3],[4,6],[5,7],[6,8],[7,10],[8,11],
                   [10,12],[11,13],[12,13],[6,7],[9,11],[9,12],[4,8],[5,14],[14,15],[15,10],
                   [11,16],[17,1],[17,0],[7,15],[3,6],[3,7],[6,9],[9,13]];
        const ROAD = [0,3,7,9,13];   /* the one skill being practised */
        const onRoad = (a, b) => ROAD.some((r, k) => k < ROAD.length - 1 &&
          ((ROAD[k] === a && ROAD[k + 1] === b) || (ROAD[k] === b && ROAD[k + 1] === a)));
        const edges = E.concat([[0,3],[3,7],[7,9],[9,13]]).filter((e, k, all) =>
          all.findIndex(f => (f[0] === e[0] && f[1] === e[1]) || (f[0] === e[1] && f[1] === e[0])) === k);
        return `<div class="demo net-demo" data-reps="0">
            <svg viewBox="0 20 660 340" role="img" aria-label="${plainText(s.title)}">
              ${edges.filter(([a, b]) => !onRoad(a, b)).map(([a, b]) =>
                `<line class="net-edge" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}"/>`).join('')}
              ${ROAD.slice(0, -1).map((a, k) => { const b = ROAD[k + 1];
                return `<line class="net-road" style="--k:${k}" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}"/>`; }).join('')}
              ${N.map(([x, y], k) => `<circle class="net-node ${ROAD.includes(k) ? 'on-road' : ''}" cx="${x}" cy="${y}" r="11"/>`).join('')}
            </svg>
            <div class="net-bar">
              <span class="net-skill">${chips(s.skill)}</span>
              <span class="net-reps">${UI.reps}: <b>0</b></span>
              <button class="demo-btn" data-demo="rep">${UI.practice}</button>
              <button class="demo-btn quiet" data-demo="net-reset">${UI.reset}</button>
            </div>
            <div class="net-habit">${chips(s.habit || UI.habit)}</div>
          </div>
          <div class="side">
            <h2>${chips(s.title)}</h2>
            ${s.zh ? `<div class="zh-title" lang="${ALT}">${s.zh}</div>` : ''}
            ${s.caption ? `<div class="cap">${chips(s.caption)}</div>` : ''}
            ${pointsList(s)}
          </div>`;
      }

      default:
        return '<h2>?</h2>';
    }
  }

  /* ---------- show a slide at a given step ---------- */
  function show(newIdx, newStep) {
    idx = Math.max(0, Math.min(SLIDES.length - 1, newIdx));
    const s = SLIDES[idx];
    step = Math.max(0, Math.min(stepsFor(s), newStep));

    nodes.forEach((n, i) => n.classList.toggle('active', i === idx));
    const node = nodes[idx];

    /* Tear any player down on the way out, so sound never follows her
       to the next slide. */
    nodes.forEach((n, i) => {
      if (i === idx) return;
      n.querySelectorAll('.vid-frame.loaded').forEach(f => {
        f.classList.remove('loaded');
        f.innerHTML = '<button class="vid-play" aria-label="Play"><span>\u25B6</span></button>';
      });
    });

    /* A word card left open would hang over the next slide, because
       only a click used to close it. Changing slide closes it. */
    closeChip();

    /* Build steps: reveal in order. */
    node.querySelectorAll('.step').forEach((n, order) => {
      n.classList.toggle('shown', s.oneClick ? step >= 1 : order < step);
    });

    if (s.type === 'compare') {
      const note = node.querySelector('.compare-note');
      const r = step > 0 ? s.reveal[step - 1] : null;
      const tag = r ? (r.tag || (r.side === 'left' ? s.left.tag : s.right.tag)) : '';
      note.innerHTML = r
        ? `${tag ? `<span class="side-tag">${tag}</span>` : ''}${chips(r.text)}`
        : '';
      node.querySelectorAll('.compare-pane').forEach(p => {
        p.classList.toggle('dim', !!r && p.dataset.side !== r.side);
      });
    }
    if (s.type === 'break') node.classList.toggle('broken', step >= 1);
    if (s.type === 'quiz')  node.classList.toggle('revealed', step >= 1);
    if (s.type === 'match') node.classList.toggle('revealed', step >= 1);

    paintProgress();

    /* The workshop clock starts when she leaves the title slide, and
       going back to it starts the clock again — so a rehearsal in the
       morning does not count against the afternoon. */
    if (idx === 0) startedAt = null;
    else if (!startedAt) startedAt = Date.now();
    try { localStorage.setItem(CH + ':started', startedAt ? String(startedAt) : ''); } catch (e) {}
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = (idx + 1) + ' / ' + SLIDES.length;

    /* Grey the arrows out at the two ends, so it is obvious there is
       nothing further in that direction. */
    navPrev.disabled = (idx === 0 && step === 0);
    navNext.disabled = (idx === SLIDES.length - 1 && step === stepsFor(s));
    if (peek.classList.contains('on')) drawPeek();
    sync();
    /* A refresh mid-workshop used to throw her back to slide 1. */
    try { history.replaceState(null, '', '#' + (idx + 1)); } catch (e) {}
  }

  function next() {
    if (step < stepsFor(SLIDES[idx])) show(idx, step + 1);
    else if (idx < SLIDES.length - 1) show(idx + 1, 0);
  }
  function prev() {
    if (step > 0) show(idx, step - 1);
    else if (idx > 0) show(idx - 1, stepsFor(SLIDES[idx - 1]));
  }
  function jump(i) {
    jumpFrom = idx;
    closeMenu();
    show(i, 0);
  }

  /* ---------- speaker-note peek on the presenting screen ---------- */
  function drawPeek() {
    const s = SLIDES[idx];
    peek.innerHTML = `<div class="peek-label">${UI.peek(idx + 1)}</div>` +
      (s.notes || []).map(t => {
        const cls = /^(TEACHER|LEWIS|NOTE|CORRECTED)/.test(t) ? 'teach' : '';
        return `<p class="${cls}">${chips(t)}</p>`;
      }).join('');
  }

  /* ---------- section menu ---------- */
  function buildMenu() {
    const body = el('div');
    SECTIONS.forEach((sec, si) => {
      const end = (SECTIONS[si + 1] ? SECTIONS[si + 1].start : SLIDES.length);
      const box = el('div', 'sec');
      box.appendChild(el('div', 'sec-head', sec.title));
      box.appendChild(el('div', 'sec-zh', sec.zh));
      const items = el('div', 'items');
      for (let i = sec.start; i < end; i++) {
        const b = el('button', '', (i + 1) + ' · ' + titleOf(SLIDES[i]));
        b.dataset.i = i;
        b.onclick = e => { e.stopPropagation(); jump(i); };
        items.appendChild(b);
      }
      box.appendChild(items);
      body.appendChild(box);
    });
    menu.innerHTML = `<h2>${UI.jump}</h2>`;
    menu.appendChild(body);
    menu.appendChild(el('div', 'hint', UI.menuHint));
  }
  function openMenu() {
    menu.classList.add('on');
    menu.querySelectorAll('.items button').forEach(b =>
      b.classList.toggle('here', +b.dataset.i === idx));
  }
  function closeMenu() { menu.classList.remove('on'); }

  /* ---------- chip popover ---------- */
  /* Which chip the open card belongs to, so that clicking the same chip
     again puts the card away. Tracked by node, not by word: the same term
     can appear twice on one slide, and each chip should answer for itself. */
  let chipNode = null;

  function openChip(node, key) {
    const g = GLOSSARY[key];
    if (!g) return;
    if (chipNode === node && chipcard.classList.contains('on')) {
      closeChip();
      return;
    }
    chipNode = node;
    chipcard.innerHTML = ZHMODE ? `
      <div class="term" lang="zh-Hant">${g.zh}</div>
      <div class="term-zh" lang="en">${g.en}</div>
      <div class="def" lang="zh-Hant">${g.zhDef}</div>
      <div class="def-zh" lang="en">${g.def}</div>` : `
      <div class="term">${g.en}</div>
      <div class="term-zh" lang="zh-Hant">${g.zh}</div>
      <div class="def">${g.def}</div>
      <div class="def-zh" lang="zh-Hant">${g.zhDef}</div>`;
    chipcard.classList.add('on');
    const r = node.getBoundingClientRect();
    const w = chipcard.offsetWidth, h = chipcard.offsetHeight;
    let x = r.left + r.width / 2 - w / 2;
    let y = r.bottom + 12;
    if (y + h > window.innerHeight - 12) y = r.top - h - 12;
    chipcard.style.left = Math.max(12, Math.min(window.innerWidth - w - 12, x)) + 'px';
    chipcard.style.top = Math.max(12, y) + 'px';
  }
  function closeChip() { chipcard.classList.remove('on'); chipNode = null; }

  /* ---------- zoom ---------- */
  let zoomFrom = null;
  function openZoom(img) {
    lightbox.querySelector('img').src = img.src;
    lightbox.querySelector('img').alt = img.alt || '';
    lightbox.classList.toggle('soft', img.dataset.soft === 'true');
    lightbox.querySelector('.lb-note').textContent =
      img.dataset.soft === 'true'
        ? 'Low-resolution source — shown small so it holds together'
        : 'Click anywhere to close';
    lightbox.classList.add('on');
    zoomFrom = img;
  }
  function closeZoom() {
    lightbox.classList.remove('on');
    /* Put the keyboard back where it was, rather than at the top of the
       document — closing a zoom should not lose her place. */
    if (zoomFrom && document.contains(zoomFrom)) zoomFrom.focus?.();
    zoomFrom = null;
  }

  /* ---------- activity timers ---------- */
  const timers = new WeakMap();
  function tick(box) {
    const st = timers.get(box);
    if (!st || !st.running) return;
    const left = st.end - Date.now();
    const clock = box.querySelector('.clock');
    if (left <= 0) {
      clock.textContent = '00:00';
      box.classList.remove('running'); box.classList.add('done');
      st.running = false;
      chime();
      sync();
      return;
    }
    const m = Math.floor(left / 60000), sec = Math.floor(left % 60000 / 1000);
    clock.textContent = String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }
  setInterval(() => document.querySelectorAll('.timer').forEach(tick), 250);

  /* Time's up, out loud: she is facing the room, not the screen. Two soft
     notes, made in the browser — no sound file. The audio is switched on
     by the Start press, because browsers only allow sound after a tap. */
  let actx = null;
  function audioOn() {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume(); } catch (e) {}
  }
  function chime() {
    if (!actx) return;
    try {
      const t0 = actx.currentTime;
      [880, 1318.5].forEach((f, k) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = t0 + k * 0.2;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
        o.connect(g); g.connect(actx.destination);
        o.start(t); o.stop(t + 1.5);
      });
    } catch (e) {}
  }

  /* ---------- matching board ----------
     Pairs live only in the DOM. Nothing is stored, and a reload clears it:
     this is one group's proposal during a share-out, not a record. */
  function matchClick(card) {
    const board = card.closest('.match-cols');
    if (card.classList.contains('paired')) {
      const n = card.dataset.n;
      board.querySelectorAll(`.match-card[data-n="${n}"]`).forEach(c => {
        c.classList.remove('paired');
        delete c.dataset.n;
        c.querySelector('.match-badge').textContent = '';
      });
      return;
    }
    const picked = board.querySelector('.match-card.picked');
    if (!picked) { card.classList.add('picked'); return; }
    if (picked === card) { card.classList.remove('picked'); return; }
    if (picked.dataset.side === card.dataset.side) {
      picked.classList.remove('picked');
      card.classList.add('picked');
      return;
    }
    const n = String((+board.dataset.next || 0) + 1);
    board.dataset.next = n;
    [picked, card].forEach(c => {
      c.classList.remove('picked');
      c.classList.add('paired');
      c.dataset.n = n;
      c.querySelector('.match-badge').textContent = n;
    });
    /* A pair is "together" when both halves came from the same row of
       s.pairs. Marked only when she reveals, never as you go. */
    const together = picked.dataset.pair === card.dataset.pair;
    [picked, card].forEach(c => c.classList.toggle('together', together));
  }

  /* ---------- ranking board ----------
     Order lives only in the DOM. Nothing is stored, and a reload clears it —
     these are one group's opinion during a share-out, not a record. */
  function paintRank(board) {
    const order = board.dataset.order ? board.dataset.order.split(',') : [];
    board.querySelectorAll('.rank-card').forEach(c => {
      const pos = order.indexOf(c.dataset.card);
      c.classList.toggle('ranked', pos >= 0);
      c.querySelector('.rank-badge').textContent = pos >= 0 ? pos + 1 : '';
    });
  }
  function rankClick(card) {
    const board = card.closest('.rank-cards');
    const order = board.dataset.order ? board.dataset.order.split(',') : [];
    const at = order.indexOf(card.dataset.card);
    if (at >= 0) order.splice(at, 1);
    else order.push(card.dataset.card);
    board.dataset.order = order.join(',');
    paintRank(board);
  }

  /* ---------- the two diagrams ---------- */
  function restart(node, cls) {
    node.classList.remove(cls);
    void node.getBoundingClientRect();   /* let the animation start again */
    node.classList.add(cls);
  }
  function demo(btn) {
    const box = btn.closest('.demo');
    const what = btn.dataset.demo;
    if (what === 'myelin') { restart(box, 'go'); return; }
    const MAX = 10;
    let reps = +box.dataset.reps || 0;
    if (what === 'rep') reps = Math.min(MAX, reps + 1);
    if (what === 'net-reset') reps = 0;
    box.dataset.reps = reps;
    box.style.setProperty('--reps', reps);
    box.querySelector('.net-reps b').textContent = reps;
    box.classList.toggle('habit', reps >= MAX);
    if (what === 'rep') restart(box, 'pulse');
    else box.classList.remove('pulse');
  }

  /* ---------- presenter sync ---------- */
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel(CH) : null;
  /* Everything the presenter window shows: where she is, what the next
     click will put up, the workshop clock, a running timer, a black screen. */
  function nextStepText() {
    const s = SLIDES[idx];
    if (step >= stepsFor(s)) return '';
    if (s.oneClick) return UI.allAtOnce;
    const n = nodes[idx].querySelectorAll('.step')[step];
    if (!n) return '';
    const q = n.querySelector('.ask .q, .q');
    const t = n.matches('.blank') ? '“' + n.textContent.trim() + '”'
            : n.matches('.ask') && q ? UI.ask + ' · ' + q.innerText.trim()
            : n.innerText.replace(/\s+/g, ' ').trim();
    return t.length > 90 ? t.slice(0, 88) + '…' : t;
  }
  function timerState() {
    const box = nodes[idx].querySelector('.timer');
    const st = box && timers.get(box);
    return { timerEnd: st && st.running ? st.end : null, timerDone: !!(box && box.classList.contains('done')) };
  }
  function sync() {
    const state = { idx, step, nextStep: nextStepText(), startedAt, blank: blank.classList.contains('on'), ...timerState() };
    localStorage.setItem(CH + ':state', JSON.stringify(state));
    if (bc) bc.postMessage(state);
  }
  if (bc) bc.onmessage = e => {
    if (e.data && e.data.nav === 'next') next();
    if (e.data && e.data.nav === 'prev') prev();
    if (e.data && e.data.nav === 'blank') toggleBlank();
  };
  window.addEventListener('storage', e => {
    if (e.key === CH + ':cmd') {
      const d = JSON.parse(e.newValue);
      if (d.nav === 'next') next();
      if (d.nav === 'prev') prev();
      if (d.nav === 'blank') toggleBlank();
    }
  });
  function openPresenter() {
    if (presenterWin && !presenterWin.closed) { presenterWin.focus(); return; }
    presenterWin = window.open(
      location.pathname + '?presenter=1', 'presenter',
      'width=900,height=800'
    );
    setTimeout(sync, 600);
  }

  /* ---------- input ---------- */
  /* ---------- black screen (B or .) ----------
     For the talking parts: the room looks at each other, not at the
     wall. Most presentation clickers have a button that sends B or a
     full stop. Any key or click brings the slide back without moving on. */
  const blank = el('div', '', '');
  blank.id = 'blank';
  document.body.appendChild(blank);
  function toggleBlank(on) {
    blank.classList.toggle('on', on);
    sync();
  }

  document.addEventListener('click', e => {
    if (blank.classList.contains('on')) { toggleBlank(false); return; }
    const chip = e.target.closest('.chip');
    if (chip) { e.stopPropagation(); openChip(chip, chip.dataset.term); return; }
    if (chipcard.contains(e.target)) return;
    closeChip();

    if (lightbox.classList.contains('on')) { closeZoom(); return; }

    const img = e.target.closest('.s-artwork img, .s-gallery img, .compare-pane img, .q-doc img');
    if (img) { openZoom(img); return; }

    /* Load a video player on demand, and swallow every click inside one —
       otherwise pressing pause would also advance the slide. */
    const frame = e.target.closest('.vid-frame');
    if (frame) {
      if (!frame.classList.contains('loaded')) {
        frame.classList.add('loaded');
        const yt = frame.dataset.yt, dm = frame.dataset.dm, src = frame.dataset.src;
        frame.innerHTML = yt
          ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0"
               allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
               allowfullscreen title="video"></iframe>`
          : dm
          ? `<iframe src="https://www.dailymotion.com/embed/video/${dm}?autoplay=1"
               allow="autoplay; fullscreen; picture-in-picture"
               allowfullscreen title="video"></iframe>`
          : `<video src="${src}" controls autoplay playsinline></video>`;
      }
      return;
    }
    if (e.target.closest('.vid')) return;

    /* The two diagram slides. Their buttons act; any other click inside
       a diagram is swallowed, so a missed tap never turns the slide. */
    const db = e.target.closest('[data-demo]');
    if (db) { demo(db); return; }
    if (e.target.closest('.demo')) return;

    const vmin = e.target.closest('[data-vote="minus"]');
    if (vmin) {
      const opt = vmin.closest('.vote-opt');
      const n = Math.max(0, (+opt.dataset.n || 0) - 1);
      opt.dataset.n = n;
      opt.querySelector('.vote-count').textContent = n;
      return;
    }
    const vopt = e.target.closest('.vote-opt');
    if (vopt) {
      const n = (+vopt.dataset.n || 0) + 1;
      vopt.dataset.n = n;
      vopt.querySelector('.vote-count').textContent = n;
      return;
    }
    const vrec = e.target.closest('[data-vote="record"]');
    if (vrec) {
      const slide = vrec.closest('.slide');
      const opts = [...slide.querySelectorAll('.vote-opt')];
      const rounds = slide.querySelector('.vote-rounds');
      const n = rounds.children.length + 1;
      const row = el('div', 'vote-round');
      row.innerHTML = `<span class="vr-label">Round ${n}</span>` +
        opts.map(o => `<span class="vr-cell"><b>${'ABCDEF'[o.dataset.opt]}</b> ${o.dataset.n}</span>`).join('');
      rounds.appendChild(row);
      /* Zero the counts straight away. Otherwise the next round quietly
         accumulates on top of this one, and nobody notices until the
         numbers are wrong. */
      opts.forEach(o => {
        o.dataset.n = 0;
        o.querySelector('.vote-count').textContent = '0';
      });
      return;
    }
    const vres = e.target.closest('[data-vote="reset"]');
    if (vres) {
      vres.closest('.slide').querySelectorAll('.vote-opt').forEach(o => {
        o.dataset.n = 0;
        o.querySelector('.vote-count').textContent = '0';
      });
      return;
    }


    const mc = e.target.closest('.match-card');
    if (mc) { matchClick(mc); return; }
    const mclear = e.target.closest('[data-match="clear"]');
    if (mclear) {
      const board = mclear.closest('.slide').querySelector('.match-cols');
      board.dataset.next = 0;
      board.querySelectorAll('.match-card').forEach(c => {
        c.classList.remove('paired', 'picked', 'together');
        delete c.dataset.n;
        c.querySelector('.match-badge').textContent = '';
      });
      return;
    }

    const card = e.target.closest('.rank-card');
    if (card) { rankClick(card); return; }
    const rr = e.target.closest('[data-rank="reset"]');
    if (rr) {
      const board = rr.closest('.slide').querySelector('.rank-cards');
      board.dataset.order = '';
      paintRank(board);
      return;
    }

    const tb = e.target.closest('[data-timer]');
    if (tb) {
      const box = tb.closest('.timer');
      const mins = +box.dataset.mins;
      if (tb.dataset.timer === 'start') {
        audioOn();
        timers.set(box, { running: true, end: Date.now() + mins * 60000 });
        box.classList.add('running'); box.classList.remove('done');
      } else {
        timers.set(box, { running: false });
        box.classList.remove('running', 'done');
        box.querySelector('.clock').textContent = String(mins).padStart(2, '0') + ':00';
      }
      sync();
      return;
    }
    /* A missed tap near the timer should not turn the page mid-activity. */
    if (e.target.closest('.timer')) return;

    if (menu.classList.contains('on')) return;
    if (e.target.closest('#hud') || e.target.closest('#nav')) return;
    if (peek.contains(e.target)) return;
    next();
  });

  document.addEventListener('keydown', e => {
    /* A chip is reachable by keyboard now, so Enter/Space on one opens
       the word card instead of advancing the slide. */
    if (e.target && e.target.classList && e.target.classList.contains('chip')
        && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openChip(e.target, e.target.dataset.term);
      return;
    }
    const k = e.key;
    if (k === 'b' || k === 'B' || k === '.') { toggleBlank(); return; }
    if (blank.classList.contains('on')) {
      if (!['Shift', 'Control', 'Alt', 'Meta'].includes(k)) { e.preventDefault(); toggleBlank(false); }
      return;
    }
    if (k === 'Escape') {
      closeMenu(); closeChip(); closeZoom(); toggleHelp(false); peek.classList.remove('on'); return;
    }
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') { e.preventDefault(); next(); return; }
    if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); return; }
    if (k === 'Home') { show(0, 0); return; }
    if (k === 'End') { show(SLIDES.length - 1, 0); return; }
    if (k === 'Backspace') {
      e.preventDefault();
      if (jumpFrom != null) { const b = jumpFrom; jumpFrom = null; show(b, stepsFor(SLIDES[b])); }
      return;
    }
    const lower = k.toLowerCase();
    if (lower === 'm') { menu.classList.contains('on') ? closeMenu() : openMenu(); return; }
    if (lower === 'n') { peek.classList.toggle('on'); if (peek.classList.contains('on')) drawPeek(); return; }
    if (lower === 'p') { openPresenter(); return; }
    if (lower === 'l') { switchLang('#' + (idx + 1)); return; }
    if (k === '?') { toggleHelp(!help.classList.contains('on')); return; }
    if (lower === 'f') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
      return;
    }
  });

  navPrev.onclick = e => { e.stopPropagation(); prev(); };
  navNext.onclick = e => { e.stopPropagation(); next(); };
  document.getElementById('btn-menu').onclick = e => { e.stopPropagation(); openMenu(); };
  document.getElementById('btn-notes').onclick = e => {
    e.stopPropagation(); peek.classList.toggle('on');
    if (peek.classList.contains('on')) drawPeek();
  };
  document.getElementById('btn-presenter').onclick = e => { e.stopPropagation(); openPresenter(); };
  const btnLang = document.getElementById('btn-lang');
  if (btnLang) btnLang.onclick = e => { e.stopPropagation(); switchLang('#' + (idx + 1)); };
  applyLang();
  menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
  lightbox.addEventListener('click', closeZoom);

  /* ---------- keys and gestures panel (? key, ? button) ---------- */
  const help = el('div', '', '');
  help.id = 'help';
  help.innerHTML = `<div class="help-box"><h2>${UI.help}</h2>
    <dl>${UI.helpRows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <p>${UI.helpNote}</p></div>`;
  document.body.appendChild(help);
  const toggleHelp = on => help.classList.toggle('on', on);
  help.addEventListener('click', e => { e.stopPropagation(); toggleHelp(false); });

  /* ---------- swipe to turn the page ----------
     Phones and tablets expect it. Swipes that start on a diagram, a video
     or an open panel are left alone. */
  let touch = null;
  stage.addEventListener('touchstart', e => {
    if (e.touches.length !== 1 || e.target.closest('.demo, .vid, .timer')) { touch = null; return; }
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
  }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    const quick = Date.now() - touch.t < 800;
    touch = null;
    if (!quick || Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    closeChip();
    dx < 0 ? next() : prev();
  }, { passive: true });

  /* ---------- HUD extras: full screen and help ----------
     Added here, not in each page, so every lesson gets them. Full screen
     is offered only where the browser can do it (not on an iPhone). */
  const hud = document.getElementById('hud');
  const countEl = document.getElementById('count');
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };
  if (document.fullscreenEnabled) {
    const fb = el('button', '', UI.full);
    fb.id = 'btn-full'; fb.title = 'F';
    fb.onclick = e => { e.stopPropagation(); toggleFull(); };
    hud.insertBefore(fb, countEl);
  }
  const hb = el('button', '', '?');
  hb.id = 'btn-help'; hb.title = UI.help;
  hb.onclick = e => { e.stopPropagation(); toggleHelp(!help.classList.contains('on')); };
  hud.insertBefore(hb, countEl);

  /* ---------- keep the screen awake while presenting ----------
     A laptop or iPad going dark mid-activity is the commonest small
     disaster in a workshop. Asked for on the first tap or key. */
  let wake = null;
  const keepAwake = async () => {
    try { if ('wakeLock' in navigator && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); } } catch (e) {}
  };
  document.addEventListener('pointerdown', keepAwake, { once: true });
  document.addEventListener('keydown', keepAwake, { once: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && wake === null) keepAwake(); });

  /* ---------- go ---------- */
  buildMenu();
  fit();
  /* #7 opens on slide 7 — how a language switch keeps her place. */
  const fromHash = parseInt(location.hash.slice(1), 10);
  show(fromHash > 0 ? fromHash - 1 : 0, 0);
})();
