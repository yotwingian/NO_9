(function () {
  var t = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
})();
