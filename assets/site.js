// Brask Group — shared behaviour. Small enough to stay one file.

(function () {
  'use strict';

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Hairline under the masthead only once the page has scrolled.
  var mast = document.getElementById('masthead');
  if (mast) {
    var onScroll = function () {
      mast.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Staggered reveal, section by section.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = document.querySelectorAll('.section');
  if (!sections.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(sections, function (s) { s.classList.add('is-in'); });
    return;
  }

  Array.prototype.forEach.call(sections, function (s) {
    Array.prototype.forEach.call(s.querySelectorAll('.row > *, .entry, .register-label'), function (el) {
      el.classList.add('rise');
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

  Array.prototype.forEach.call(sections, function (s) { io.observe(s); });
})();
