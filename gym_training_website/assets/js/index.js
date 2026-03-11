
(function () {
  'use strict';

  var html        = document.documentElement;
  var themeBtn    = document.getElementById('theme-toggle');
  var STORAGE_KEY = 'fitcore-theme';

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  (function initTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTheme(saved);
    } else {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  })();

  themeBtn.addEventListener('click', function () {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });


  var mobileBtn  = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  mobileBtn.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', isOpen);
  });

  function closeAll() {
    document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
      el.classList.remove('open');
    });
  }

  document.querySelectorAll('.has-dropdown .nav-chevron').forEach(function (chevron) {
    chevron.addEventListener('click', function (e) {
      e.stopPropagation();
      var item   = chevron.closest('.has-dropdown');
      var isOpen = item.classList.contains('open');
      closeAll();
      if (!isOpen) item.classList.add('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) closeAll();
  });


  (function markActiveDropdownLink() {
    var currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

    document.querySelectorAll('.dropdown a').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href && href === currentFile) {
        link.classList.add('active');

        var parentItem = link.closest('.has-dropdown');
        if (parentItem) {
          var parentLink = parentItem.querySelector('.nav-parent');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    });
  })();

  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });


  function animateCounter(el, target, suffix, duration) {
    var start     = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current  = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('.hstat-num[data-target]').forEach(function (el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    animateCounter(el, target, suffix, 1800);
  });

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix, 1600);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.result-num span[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });


  window.addEventListener('scroll', function () {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  window.handleNewsletter = function (e) {
    e.preventDefault();
    var el = document.getElementById('nl-success');
    el.textContent = '✓ You\'re subscribed! Watch your inbox.';
    e.target.reset();
  };

})();
