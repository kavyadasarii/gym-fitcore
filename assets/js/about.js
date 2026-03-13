
document.addEventListener('DOMContentLoaded', () => {

  const heroBg = document.querySelector('.about-hero-bg');
  if (heroBg) {
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 80);
    });
  }


  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  function animateCounter(el, target, suffix) {
    const duration = 1800;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4);
      const value    = eased * target;

      el.textContent = isFloat
        ? value.toFixed(1) + suffix
        : Math.floor(value) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  const tGrid = document.querySelector('.testimonial-grid');
  if (tGrid) {
    let isDown = false, startX, scrollLeft;

    tGrid.addEventListener('mousedown', e => {
      isDown    = true;
      startX    = e.pageX - tGrid.offsetLeft;
      scrollLeft = tGrid.scrollLeft;
      tGrid.style.cursor = 'grabbing';
    });
    tGrid.addEventListener('mouseleave', () => { isDown = false; tGrid.style.cursor = ''; });
    tGrid.addEventListener('mouseup', () => { isDown = false; tGrid.style.cursor = ''; });
    tGrid.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - tGrid.offsetLeft;
      const walk = (x - startX) * 1.4;
      tGrid.scrollLeft = scrollLeft - walk;
    });
  }

  document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX   = ((y - centerY) / centerY) * -4;
      const rotY   = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const featureBoxes = document.querySelectorAll('.feature-box');
  if (featureBoxes.length) {
    featureBoxes.forEach(box => box.classList.add('feat-hidden'));

    const fbObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const boxes = entry.target.parentElement.querySelectorAll('.feature-box');
          boxes.forEach((box, i) => {
            setTimeout(() => box.classList.remove('feat-hidden'), i * 100);
          });
          fbObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (featureBoxes[0]) fbObserver.observe(featureBoxes[0]);
  }

});
