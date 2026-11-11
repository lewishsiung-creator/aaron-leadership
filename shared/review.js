/* ------------------------------------------------------------------
   重點複習 — the review page a lesson's students get after the workshop.

   Built from what the lesson already has: REVIEW (the points, written for
   the review), GLOSSARY and the terms slide (the words), the quiz slides,
   the video slide, and window.ZH for the Chinese of anything taken from
   the slides. Both languages always, English first.

   The page that loads this sets window.LESSON (its number) and the
   version comes from ?v=work|sport. Each version has a ready-made PDF
   next to the page: lessonNN-review-work.pdf / -sport.pdf, made by
   tools/review-pdf.sh — run it again whenever the content changes.
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  const AUDV = window.AUDIENCE;
  const ZHT = window.ZH || {};
  const N = window.LESSON || 1;
  const NN = String(N).padStart(2, '0');
  const esc = t => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  /* {{term}} → the word; tags dropped. `zh` picks the Chinese label. */
  const plain = (t, zh) => String(t || '')
    .replace(/\{\{(\w+)\}\}/g, (m, k) => { const g = GLOSSARY[k]; return g ? (zh ? (g.zhChip || g.zh) : g.en) : k; })
    .replace(/<[^>]+>/g, '');
  const zhOf = t => (Object.prototype.hasOwnProperty.call(ZHT, t) ? plain(ZHT[t], true) : '');
  const pair = (en, zh, cls) => `<div class="${cls || 'pair'}"><p class="en">${esc(en)}</p>${zh ? `<p class="zh" lang="zh-Hant">${esc(zh)}</p>` : ''}</div>`;

  const first = SLIDES[0];
  const title = plain(first.title);
  const titleZh = zhOf(first.title);
  const verLabel = AUDV === 'sport'
    ? ['For athletes', '運動員版'] : ['For working professionals', '職場專業人士版'];
  const pdfFile = `lesson${NN}-review-${AUDV}.pdf`;
  const pdfName = `Lesson${N}-重點複習-${AUDV === 'sport' ? '運動員版' : '職場版'}.pdf`;
  /* Always the public address — the PDF is printed from a local copy,
     and its footer must not carry a path on Lewis's computer. */
  const SITE = 'https://aaron-leadership.pages.dev';
  const pageUrl = SITE + '/lesson' + NN + '/review/?v=' + AUDV;
  document.body.classList.add('v-' + AUDV);
  document.title = `重點複習 · Lesson ${N} · ${title}`;

  /* ---------- the parts ---------- */
  const points = REVIEW.points.map((p, i) =>
    `<li><span class="num">${i + 1}</span>${pair(p.en, p.zh)}</li>`).join('');

  const termSlide = SLIDES.find(s => s.type === 'terms');
  const termKeys = termSlide ? termSlide.terms : Object.keys(GLOSSARY);
  const words = termKeys.filter(k => GLOSSARY[k]).map(k => {
    const g = GLOSSARY[k];
    return `<li><div class="w"><b>${esc(g.en)}</b><span lang="zh-Hant">${esc(g.zh)}</span></div>
      <p class="en">${esc(g.def)}</p><p class="zh" lang="zh-Hant">${esc(g.zhDef)}</p></li>`;
  }).join('');

  const quiz = SLIDES.filter(s => s.type === 'quiz').map((s, i) => {
    const opts = s.options.map((o, k) =>
      `<li class="${k === s.answer ? 'right' : ''}"><span class="k">${'ABCD'[k]}</span>${esc(plain(o))}<span class="zh" lang="zh-Hant">${esc(zhOf(o))}</span></li>`).join('');
    return `<li class="qz">
      ${pair(plain(s.q), zhOf(s.q), 'q')}
      <ol class="opts">${opts}</ol>
      <button class="show-ans no-print" type="button" aria-expanded="false">看答案 · Answer</button>
      <div class="ans"><b>${'ABCD'[s.answer]}</b> · ${esc(plain(s.why))}<span class="zh" lang="zh-Hant">${esc(zhOf(s.why))}</span></div>
    </li>`;
  }).join('');

  const vid = SLIDES.find(s => s.type === 'video' && s.yt);
  const video = vid ? `
    <section><h2><span>再看一次</span> Watch again</h2>
      <div class="video">
        ${pair(plain(vid.title), zhOf(vid.title))}
        ${vid.watchFor ? pair('Watch for: ' + plain(vid.watchFor), '注意看：' + zhOf(vid.watchFor), 'pair watch') : ''}
        <a href="https://www.youtube.com/watch?v=${esc(vid.yt)}" target="_blank" rel="noopener">youtube.com/watch?v=${esc(vid.yt)}</a>
      </div></section>` : '';

  document.getElementById('review').innerHTML = `
    <header>
      <div class="kicker"><span lang="zh-Hant">極限人生企管顧問</span> · Performance-Driven Leadership</div>
      <div class="label">Lesson ${N} · <span lang="zh-Hant">重點複習</span> Review</div>
      <h1>${esc(title)}</h1>
      ${titleZh ? `<div class="h1-zh" lang="zh-Hant">${esc(titleZh)}</div>` : ''}
      <div class="ver">${verLabel[0]} · <span lang="zh-Hant">${verLabel[1]}</span></div>
      <div class="actions no-print">
        <a class="btn primary" href="${pdfFile}" download="${pdfName}">下載 PDF · Download</a>
        <button class="btn" id="share" type="button">分享連結 · Share</button>
        <span class="copied" id="copied" role="status"></span>
      </div>
    </header>

    <section><h2><span>重點</span> Key points</h2><ol class="points">${points}</ol></section>
    <section><h2><span>關鍵詞</span> Key words</h2><ul class="words">${words}</ul></section>
    ${quiz ? `<section><h2><span>自我檢查</span> Check yourself</h2><ol class="quiz">${quiz}</ol></section>` : ''}
    ${video}
    <section class="week"><h2><span>這一週</span> This week</h2>${pair(REVIEW.tryThis.en, REVIEW.tryThis.zh)}</section>
    ${REVIEW.next ? `<p class="nextline">${esc(REVIEW.next.en)} <span lang="zh-Hant">${esc(REVIEW.next.zh)}</span></p>` : ''}

    <footer>Aaron Kao · <span lang="zh-Hant">極限人生企管顧問</span><span class="url"> · ${esc(pageUrl.replace(/^https?:\/\//, ''))}</span></footer>`;

  /* ---------- taps ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('.show-ans');
    if (b) {
      const li = b.closest('.qz');
      const on = li.classList.toggle('open');
      b.setAttribute('aria-expanded', on);
      b.textContent = on ? '收起答案 · Hide' : '看答案 · Answer';
    }
  });
  const copied = document.getElementById('copied');
  document.getElementById('share').onclick = async () => {
    const data = { title: `重點複習 · Lesson ${N}`, text: `${title} · ${titleZh}`, url: pageUrl };
    try {
      if (navigator.share) { await navigator.share(data); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(pageUrl); copied.textContent = '已複製連結 · Link copied'; }
    catch (e) { copied.textContent = pageUrl; }
  };
})();
