
  const titles = {
    overview:      ['Overview',      'Welcome back, Admin. Here\'s what\'s happening today.'],
    members:       ['Members',       'Manage all registered members and their plans.'],
    trainers:      ['Trainers',      'View and manage your coaching staff.'],
    programs:      ['Programs',      'All active fitness programs and enrollments.'],
    revenue:       ['Revenue',       'Financial analytics and transaction history.'],
    notifications: ['Notifications', 'Stay updated on recent activity.'],
    settings:      ['Settings',      'Configure gym profile, preferences, and security.'],
  };

  function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelector(`[data-section="${id}"]`)?.classList.add('active');
    if (titles[id]) {
      document.getElementById('pageTitle').textContent = titles[id][0];
      document.getElementById('pageSubtitle').textContent = titles[id][1];
    }
  }

  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', () => showSection(link.dataset.section));
  });

  
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('fitcore-theme', t);
    const isDark = t === 'dark';
    document.getElementById('themeIcon').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    document.getElementById('themeLabel').textContent = isDark ? 'Dark Mode' : 'Light Mode';
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }

  // Load saved theme
  const saved = localStorage.getItem('fitcore-theme');
  if (saved) applyTheme(saved);
  else applyTheme('dark');

  
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const revData = [210000,235000,198000,260000,310000,290000,345000,0,0,0,0,0];

  function chartDefaults() {
    return {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(128,128,128,.1)' }, ticks: { color: '#888', font: { size: 11 } } },
        y: { grid: { color: 'rgba(128,128,128,.1)' }, ticks: { color: '#888', font: { size: 11 }, callback: v => '₹' + (v/1000) + 'K' } }
      }
    };
  }

  // Overview chart
  new Chart(document.getElementById('revenueChart'), {
    type: 'bar',
    data: {
      labels: months.slice(0,7),
      datasets: [{
        data: revData.slice(0,7),
        backgroundColor: ctx => {
          const g = ctx.chart.ctx.createLinearGradient(0,0,0,200);
          g.addColorStop(0,'rgba(200,57,15,.85)');
          g.addColorStop(1,'rgba(200,57,15,.2)');
          return g;
        },
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: chartDefaults()
  });

  // Revenue section bar chart
  new Chart(document.getElementById('revChart2'), {
    type: 'line',
    data: {
      labels: months.slice(0,7),
      datasets: [{
        data: revData.slice(0,7),
        borderColor: '#c8390f',
        backgroundColor: 'rgba(200,57,15,.08)',
        fill: true,
        tension: .4,
        pointBackgroundColor: '#c8390f',
        pointRadius: 5,
      }]
    },
    options: chartDefaults()
  });

  // Plan donut
  new Chart(document.getElementById('planChart'), {
    type: 'doughnut',
    data: {
      labels: ['Premium','Gold','Basic'],
      datasets: [{
        data: [148, 102, 68],
        backgroundColor: ['#c8390f','#d97706','#2563eb'],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { color: '#888', font: { size: 12 }, padding: 16 } }
      },
      cutout: '68%',
    }
  });
