/* List every on-screen / notes string in a lesson, both versions, and
   (with --missing) only those that have no Chinese yet.
     node tools/strings.js lesson01 [--missing]                       */
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || 'lesson01';
const onlyMissing = process.argv.includes('--missing');
const SKIP = new Set(['sec', 'type', 'yt', 'poster', 'src', 'terms', 'answer', 'n', 'of',
                      'minutes', 'only', 'oneClick', 'zh']);
const isZh = s => /[㐀-鿿]/.test(s) && !/[A-Za-z]{3}/.test(s.replace(/<[^>]+>|\{\{\w+\}\}/g, ''));
const out = new Set();
let ZH = {};
const zhFile = path.join(dir, 'content.zh.js');
if (fs.existsSync(zhFile)) {
  global.window = {}; eval(fs.readFileSync(zhFile, 'utf8') + ';ZH = window.ZH || {}');
}
for (const aud of ['work', 'sport']) {
  global.window = { AUDIENCE: aud };
  const src = fs.readFileSync(path.join(dir, 'content.js'), 'utf8');
  const S = new Function('window', src + ';return SLIDES;')(global.window);
  const walk = (v, k) => {
    if (SKIP.has(k)) return;
    if (typeof v === 'string') { if (/[A-Za-z]/.test(v) && !/^NOTE|^CORRECTED/.test(v) && !isZh(v)) out.add(v); }
    else if (Array.isArray(v)) v.forEach(x => walk(x));
    else if (v && typeof v === 'object') for (const kk in v) walk(v[kk], kk);
  };
  S.forEach(s => walk(s));
}
const list = [...out].filter(s => !onlyMissing || !(s in ZH));
console.log(JSON.stringify(list, null, 1));
console.error(list.length + (onlyMissing ? ' missing' : ' strings'));
