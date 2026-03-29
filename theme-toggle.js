(function () {
  function sync(btn) {
    if (!btn) return;
    var d = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = d ? '☀️' : '🌙';
    btn.setAttribute('aria-label', d ? 'Byt till ljust läge' : 'Byt till mörkt läge');
  }
  function init() {
    var btn = document.getElementById('themeToggle');
    sync(btn);
    if (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        sync(btn);
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
