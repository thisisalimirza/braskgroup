// Brask Group — front page behaviour. Small enough to stay one file.
// Every effect here is an enhancement: with this script blocked the
// page still reads top to bottom, nav included.

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year.
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var navbar = document.getElementById('navbar');
  var navLinks = document.getElementById('nav-links');
  var menu = document.getElementById('mobile-menu');
  var hero = document.getElementById('hero');

  // The navbar goes from transparent-over-hero to a white bar the
  // moment the hero is mostly gone.
  if (navbar) {
    var setScrolled = function () {
      var past = hero ? window.scrollY > hero.offsetHeight - 120 : window.scrollY > 8;
      navbar.classList.toggle('scrolled', past);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
    window.addEventListener('resize', setScrolled);
  }

  // Mobile menu.
  if (menu && navLinks) {
    var closeMenu = function () {
      menu.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      if (navbar) navbar.classList.remove('menu-open');
    };
    menu.addEventListener('click', function () {
      var open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('open', !open);
      // The bar itself goes light with the drawer, so the two
      // read as one panel rather than a white sheet under black.
      if (navbar) navbar.classList.toggle('menu-open', !open);
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Scroll progress hairline.
  if (!reduce) {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    var onScroll = function () {
      var height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (height > 0 ? (window.scrollY / height) * 100 : 0) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  // Section-by-section reveal. Anything marked .reveal in the HTML is
  // only hidden once we get here, so a failed script leaves it visible.
  var sections = document.querySelectorAll('.section, .cta-section');
  if (!sections.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(sections, function (s) { s.classList.add('is-in'); });
    return;
  }

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
