// Injects the sidebar and theme toggle into every page.
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',       label: 'Home',        icon: '⌂' },
    { href: 'gallery.html',     label: 'Gallery',     icon: '◫' },
    { href: 'recordings.html',  label: 'Recordings',  icon: '◎' },
    { href: 'timeline.html',    label: 'Timeline',    icon: '◈' },
    { href: 'memories.html',    label: 'Memories',    icon: '◇' },
    { href: 'family-wall.html', label: 'Family Wall', icon: '◈' },
    { href: 'foundation.html',  label: 'Foundation',  icon: '❋' },
  ];

  const html = `
    <button id="theme-toggle" aria-label="Toggle light/dark mode" title="Toggle light/dark mode">☀</button>

    <button id="sidebar-toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <div id="sidebar-overlay"></div>

    <aside id="sidebar" aria-hidden="true">
      <div class="sidebar-inner">
        <div class="sidebar-header">
          <p class="sidebar-name">Olawuyi Victoria<br>Ayodele Arinke</p>
          <p class="sidebar-dates">23 · 05 · 1942 — 28 · 06 · 2014</p>
        </div>
        <nav class="sidebar-nav">
          ${links.map(l => `
            <a href="${l.href}" class="sidebar-link${l.href === page ? ' active' : ''}">
              <span class="sidebar-icon">${l.icon}</span>
              <span>${l.label}</span>
            </a>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <p>In loving memory</p>
        </div>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);

  // ── THEME TOGGLE ──
  const themeBtn = document.getElementById('theme-toggle');
  const root     = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeBtn.textContent = '☾';
      themeBtn.title = 'Switch to dark mode';
    } else {
      root.removeAttribute('data-theme');
      themeBtn.textContent = '☀';
      themeBtn.title = 'Switch to light mode';
    }
  }

  const saved = localStorage.getItem('memorial-theme') || 'dark';
  applyTheme(saved);

  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next    = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('memorial-theme', next);
    applyTheme(next);
  });

  // ── SIDEBAR ──
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function open() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
  }
  function close() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
