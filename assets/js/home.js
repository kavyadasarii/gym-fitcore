document.addEventListener('DOMContentLoaded', () => {

  const heroBg = document.querySelector('.h2-hero-bg');
  if (heroBg) {
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 60);
    });
  }

  const revealEls = document.querySelectorAll('.h-reveal, .h-reveal-left, .h-reveal-right');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  function countUp(el, target, suffix) {
    const dur   = 1800;
    const start = performance.now();
    (function step(now) {
      const p  = Math.min((now - start) / dur, 1);
      const e  = 1 - Math.pow(1 - p, 4); // ease-out quart
      el.textContent = Math.floor(e * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el     = e.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          countUp(el, target, suffix);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cObs.observe(el));
  }

  const steps = document.querySelectorAll('.h2-step');
  if (steps.length) {
    steps.forEach(s => {
      s.style.opacity   = '0';
      s.style.transform = 'translateY(28px)';
      s.style.transition = 'opacity .55s ease, transform .55s cubic-bezier(.22,.61,.36,1)';
    });

    const sObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        steps.forEach((s, i) => {
          setTimeout(() => {
            s.style.opacity   = '1';
            s.style.transform = 'translateY(0)';
          }, i * 110);
        });
        sObs.unobserve(entries[0].target);
      }
    }, { threshold: 0.2 });

    if (steps[0]) sObs.observe(steps[0]);
  }

  const facilityItems = document.querySelectorAll('.h2-facility-item');
  if (facilityItems.length) {
    facilityItems.forEach(item => {
      item.style.opacity   = '0';
      item.style.transform = 'scale(.96)';
      item.style.transition = 'opacity .55s ease, transform .55s cubic-bezier(.22,.61,.36,1)';
    });

    const fObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        facilityItems.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity   = '1';
            item.style.transform = 'scale(1)';
          }, i * 90);
        });
        fObs.unobserve(entries[0].target);
      }
    }, { threshold: 0.15 });

    if (facilityItems[0]) fObs.observe(facilityItems[0]);
  }

  const ctaSection = document.querySelector('.h2-cta');
  if (ctaSection) {
    window.addEventListener('scroll', () => {
      const rect = ctaSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.12;
        ctaSection.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      }
    }, { passive: true });
  }

});
