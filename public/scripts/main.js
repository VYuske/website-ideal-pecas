(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var navList = document.querySelector('.nav-list');

  if (toggle && nav) {
    var closeMenu = function () {
      if (!nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      var label = toggle.querySelector('.sr-only');
      if (label) {
        label.textContent = 'Abrir menu';
      }
    };

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      var label = toggle.querySelector('.sr-only');
      if (label) {
        label.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
      }
    });

    if (navList) {
      navList.addEventListener('click', function (event) {
        if (event.target.closest('a')) closeMenu();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var yearEl = document.getElementById('ano-atual');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var marqueeTrack = document.querySelector('.marquee-track');
  var marqueeToggle = document.querySelector('[data-marquee-toggle]');
  if (marqueeTrack && marqueeToggle) {
    marqueeToggle.addEventListener('click', function () {
      var paused = marqueeTrack.classList.toggle('is-paused');
      marqueeToggle.setAttribute('aria-pressed', String(paused));
      marqueeToggle.textContent = paused ? 'Retomar esteira' : 'Pausar esteira';
    });
  }
})();


(function () {
  'use strict';

  var slider = document.querySelector('[data-catalogo]');
  if (!slider) return;

  var track = slider.querySelector('.catalogo-track');
  var dotsWrap = slider.querySelector('.catalogo-dots');
  var prevBtn = slider.querySelector('[data-catalogo-prev]');
  var nextBtn = slider.querySelector('[data-catalogo-next]');
  var controls = slider.querySelector('.catalogo-controls');
  if (!track || !dotsWrap) return;

  var cards = Array.prototype.slice.call(track.children);
  var dots = [];
  var pages = 1;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (controls) controls.hidden = false;

  function gapValue() {
    var styles = window.getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap || 0) || 0;
  }

  function stepValue() {
    return cards[0].getBoundingClientRect().width + gapValue();
  }

  function metrics() {
    var step = stepValue();
    var visible = Math.max(1, Math.round((track.clientWidth + gapValue()) / step));
    return {
      step: step,
      visible: visible,
      pages: Math.max(1, Math.ceil(cards.length / visible))
    };
  }

  function currentPage() {
    var m = metrics();
    var max = Math.max(0, track.scrollWidth - track.clientWidth);
    var left = Math.min(track.scrollLeft, max);
    return Math.min(m.pages - 1, Math.round(left / (m.visible * m.step)));
  }

  function goToPage(page) {
    var m = metrics();
    var max = Math.max(0, track.scrollWidth - track.clientWidth);
    var left = Math.min(page * m.visible * m.step, max);
    track.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function updateDots() {
    var page = currentPage();
    dots.forEach(function (dot, index) {
      var active = index === page;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function buildDots() {
    var m = metrics();
    pages = m.pages;
    dotsWrap.innerHTML = '';
    dots = [];
    for (var i = 0; i < pages; i += 1) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'catalogo-dot';
      dot.setAttribute('aria-label', 'Ir para a página ' + (i + 1) + ' de ' + pages);
      dot.addEventListener('click', (function (page) {
        return function () {
          goToPage(page);
        };
      })(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
    updateDots();
  }

  function nextPage() {
    var page = currentPage();
    goToPage(page >= pages - 1 ? 0 : page + 1);
  }

  function prevPage() {
    var page = currentPage();
    goToPage(page <= 0 ? pages - 1 : page - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevPage);
  if (nextBtn) nextBtn.addEventListener('click', nextPage);

  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateDots);
  }, { passive: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(buildDots, 150);
  });

  buildDots();
})();
