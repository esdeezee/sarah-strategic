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

  // Dropdown disclosure ("How I Work"): button toggles the submenu.
  // Escape closes it and returns focus to the button; clicking elsewhere
  // or tabbing out of the group closes it too.
  nav.querySelectorAll('.has-sub').forEach(function (item) {
    var button = item.querySelector('.nav-sub-toggle');
    if (!button) return;

    function closeSub(returnFocus) {
      item.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) button.focus();
    }

    button.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && item.classList.contains('is-open')) {
        e.stopPropagation();
        closeSub(true);
      }
    });

    item.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !item.contains(e.relatedTarget)) closeSub(false);
    });

    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) closeSub(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
});
