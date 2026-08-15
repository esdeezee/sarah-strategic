(function () {
  var tabs = document.querySelector('.story-tabs');
  if (!tabs) return;
  var buttons = tabs.querySelectorAll('button');
  var stories = document.querySelectorAll('.story');

  var filter = document.querySelector('.story-filter');
  var toggle = filter && filter.querySelector('.story-filter-toggle');
  var toggleValue = filter && filter.querySelector('.story-filter-value');
  var list = filter && filter.querySelector('.story-filter-list');
  var options = list ? list.querySelectorAll('li[role="option"]') : [];

  function activate(cat) {
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.cat === cat));
    });
    options.forEach(function (o) {
      var selected = o.dataset.cat === cat;
      o.setAttribute('aria-selected', String(selected));
      o.tabIndex = selected ? 0 : -1;
      if (selected && toggleValue) toggleValue.textContent = o.textContent;
    });
    stories.forEach(function (s) {
      var cats = s.dataset.cat.split(' ');
      s.hidden = cat !== 'all' && cats.indexOf(cat) === -1;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { activate(b.dataset.cat); });
  });

  if (toggle && list) {
    function openList() {
      list.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      var current = list.querySelector('li[aria-selected="true"]') || options[0];
      if (current) current.focus();
    }

    function closeList(returnFocus) {
      list.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      if (list.hidden) openList(); else closeList(false);
    });

    options.forEach(function (option, i) {
      option.addEventListener('click', function () {
        activate(option.dataset.cat);
        closeList(true);
      });

      option.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(option.dataset.cat);
          closeList(true);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          (options[i + 1] || options[0]).focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          (options[i - 1] || options[options.length - 1]).focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          options[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          options[options.length - 1].focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeList(true);
        } else if (e.key === 'Tab') {
          closeList(false);
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!list.hidden && !filter.contains(e.target)) closeList(false);
    });
  }

  var hashCat = location.hash.replace('#cat-', '');
  var known = Array.prototype.some.call(buttons, function (b) { return b.dataset.cat === hashCat; });
  if (known) activate(hashCat);
})();
