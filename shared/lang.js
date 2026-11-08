/* ------------------------------------------------------------------
   English / 中文 mode, shared by the course index and every deck.

   The choice is remembered in this browser (localStorage), and a link
   can force it with ?lang=zh or ?lang=en. English is the default.

     window.ZHMODE        true in Chinese mode
     applyLang(root)      swaps every [data-zh] element to its Chinese
     switchLang(hash)     flips the mode and reloads, keeping `hash`
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  var KEY = 'aaron-lang';
  var params = new URLSearchParams(location.search);
  var q = params.get('lang');
  var lang = 'en';
  if (q === 'zh' || q === 'en') {
    lang = q;
    try { localStorage.setItem(KEY, q); } catch (e) {}
  } else {
    try { if (localStorage.getItem(KEY) === 'zh') lang = 'zh'; } catch (e) {}
  }
  window.LANG = lang;
  window.ZHMODE = lang === 'zh';
  document.documentElement.lang = window.ZHMODE ? 'zh-Hant' : 'en';

  window.applyLang = function (root) {
    if (!window.ZHMODE) return;
    (root || document).querySelectorAll('[data-zh]').forEach(function (n) {
      n.innerHTML = n.getAttribute('data-zh');
    });
    (root || document).querySelectorAll('[data-zh-title]').forEach(function (n) {
      n.title = n.getAttribute('data-zh-title');
    });
  };

  window.switchLang = function (hash) {
    var next = window.ZHMODE ? 'en' : 'zh';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    var u = new URL(location.href);
    u.searchParams.set('lang', next);
    u.hash = hash || '';
    location.replace(u.toString());
  };

  /* The presenter window carries no ?lang, so it follows the deck: when
     the deck switches, the presenter reloads in the same language. Only
     the presenter listens — two decks listening could bounce forever. */
  if (params.has('presenter')) {
    window.addEventListener('storage', function (e) {
      if (e.key === KEY && (e.newValue === 'zh') !== window.ZHMODE) location.reload();
    });
  }
})();
