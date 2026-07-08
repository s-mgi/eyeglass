document.addEventListener('DOMContentLoaded', function () {
  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Header gains a shadow once the page scrolls ----------
  var header = document.querySelector('header.main');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Hero image slideshow ----------
  var slides = document.querySelectorAll('.hero-full-media .slide');
  if (slides.length > 1) {
    var dotsWrap = document.querySelector('.hero-full .slide-dots');
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }
    if (!reduceMotion) {
      var current = 0;
      setInterval(function () {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
      }, 5000);
    }
  }

  // ---------- Scroll-reveal animations ----------
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var groupSelector =
      '.section-head, .feature, .team-grid, .awards-grid, .badges, .brand-grid, ' +
      '.brand-gallery, .promise, .testimonials, .contact-wrap, .diagonal .content, .cta-band, .service-detail, ' +
      '.stack-media, .stack-text, .why-row, .banner-duo, .appointment-grid, ' +
      '.leader-block, .intro-trio, .staff-grid, .doctor-facts';
    var groups = document.querySelectorAll(groupSelector);
    var multiChildGroups = '.team-grid, .awards-grid, .badges, .brand-grid, .brand-gallery, .why-row, .banner-duo, .appointment-grid, .intro-trio, .staff-grid';
    var targets = [];

    groups.forEach(function (group) {
      var children = group.matches(multiChildGroups) ? group.children : [group];
      Array.prototype.forEach.call(children, function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
        targets.push(el);
      });
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });
  }
});
