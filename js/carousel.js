// Trusted-by carousel slide switcher.
// Desktop/tablet: each arrow click advances a whole group of 4 logos.
// Mobile (<=400px): each group of 4 is paged 2-at-a-time instead, so
// advancing steps through the pair within a group before moving groups.
document.querySelectorAll('.carousel-wrapper').forEach(function (wrapper) {
  var trusted = wrapper.closest('.trusted');
  var slides = wrapper.querySelectorAll('.carousel-slide');
  var prevBtn = trusted && trusted.querySelector('.trusted-arrow.prev');
  var nextBtn = trusted && trusted.querySelector('.trusted-arrow.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  var mobileQuery = window.matchMedia('(max-width: 400px)');
  var groupIndex = 0;
  var pairIndex = 0;

  slides.forEach(function (slide, i) {
    if (slide.classList.contains('active')) groupIndex = i;
  });

  function render() {
    slides.forEach(function (slide, i) {
      var isActive = i === groupIndex;
      slide.classList.toggle('active', isActive);
      slide.querySelectorAll('.trusted-item').forEach(function (item, itemIndex) {
        if (!isActive || !mobileQuery.matches) {
          item.style.display = '';
          return;
        }
        var pairStart = pairIndex * 2;
        item.style.display = (itemIndex >= pairStart && itemIndex < pairStart + 2) ? '' : 'none';
      });
    });
  }

  function next() {
    if (mobileQuery.matches) {
      if (pairIndex === 0) {
        pairIndex = 1;
      } else {
        pairIndex = 0;
        groupIndex = (groupIndex + 1) % slides.length;
      }
    } else {
      groupIndex = (groupIndex + 1) % slides.length;
    }
    render();
  }

  function prev() {
    if (mobileQuery.matches) {
      if (pairIndex === 1) {
        pairIndex = 0;
      } else {
        pairIndex = 1;
        groupIndex = (groupIndex - 1 + slides.length) % slides.length;
      }
    } else {
      groupIndex = (groupIndex - 1 + slides.length) % slides.length;
    }
    render();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  mobileQuery.addEventListener('change', function () {
    pairIndex = 0;
    render();
  });

  render();
});
