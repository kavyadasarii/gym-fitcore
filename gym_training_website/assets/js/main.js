
document.addEventListener('DOMContentLoaded', () => {

  
  const html        = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const saved       = localStorage.getItem('fitcore-theme');

  if (saved === 'dark') { html.classList.add('dark'); }
  if (themeToggle) {
    themeToggle.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('fitcore-theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  
  const closeTimers = {};
  document.querySelectorAll('.nav-links .has-dropdown').forEach((item, idx) => {
    const drop = item.querySelector('.dropdown');
    const openDrop  = () => { clearTimeout(closeTimers[idx]); item.classList.add('open'); };
    const closeDrop = () => { closeTimers[idx] = setTimeout(() => item.classList.remove('open'), 300); };
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.nav-links .has-dropdown').forEach((el, i) => {
        if (i !== idx) { clearTimeout(closeTimers[i]); el.classList.remove('open'); }
      });
      openDrop();
    });
    item.addEventListener('mouseleave', closeDrop);
    if (drop) {
      drop.addEventListener('mouseenter', () => clearTimeout(closeTimers[idx]));
      drop.addEventListener('mouseleave', closeDrop);
    }
    const chevron = item.querySelector('.nav-chevron');
    if (chevron) {
      chevron.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown'))
      document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
  });

  document.querySelectorAll('#mobile-menu .mob-parent').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const sub = btn.nextElementSibling;
      if (sub && sub.classList.contains('mob-sub')) {
        sub.classList.toggle('open');
        btn.classList.toggle('open');
      }
    });
  });

  const mobileMenu = document.getElementById('mobile-menu');
  const navbar     = document.querySelector('.navbar');

  if (navbar && mobileMenu) {
    const ham = document.createElement('button');
    ham.className   = 'hamburger';
    ham.setAttribute('aria-label', 'Toggle menu');
    ham.innerHTML   = '<span></span><span></span><span></span>';
    navbar.appendChild(ham);

    ham.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const open = mobileMenu.classList.contains('open');
      ham.setAttribute('aria-expanded', open);
      const spans = ham.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  }

  
  const bar = document.getElementById('reading-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const total  = document.body.scrollHeight - window.innerHeight;
      const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
    });
  }

  
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.section;

      document.querySelectorAll('.nav-link').forEach(l  => l.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s   => s.classList.remove('active'));

      link.classList.add('active');
      const sec = document.getElementById(target);
      if (sec) sec.classList.add('active');
    });
  });

  
  const canvas = document.getElementById('chart');
  if (canvas && typeof Chart !== 'undefined') {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Revenue (₹)',
          data: [210000, 240000, 280000, 300000, 320000, 345000],
          backgroundColor: '#c8390f',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: 'rgba(0,0,0,.06)' },
            ticks: { callback: v => '₹' + (v/1000) + 'k' }
          }
        }
      }
    });
  }

  
  const track   = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (track && nextBtn && prevBtn) {
    const cardWidth = 350;
    let autoSlide = setInterval(() => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }, 4000);

    nextBtn.addEventListener('click', () =>
      track.scrollBy({ left: cardWidth, behavior: 'smooth' }));
    prevBtn.addEventListener('click', () =>
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' }));
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() =>
        track.scrollBy({ left: cardWidth, behavior: 'smooth' }), 4000);
    });
  }

  
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  
  window.goToAdmin = function () {
    window.location.href = 'admin.html';
  };

});
