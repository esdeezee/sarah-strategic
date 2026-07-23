document.querySelectorAll('nav[aria-label="Main"]').forEach(function (nav) {
  var toggle = nav.querySelector('.nav-toggle');
  var menu = nav.querySelector('ul');
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
});
