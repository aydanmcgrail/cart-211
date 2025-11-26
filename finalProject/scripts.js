document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.retro-sidebar').forEach((sidebar) => {
    const toggle = sidebar.querySelector('.nav-toggle');
    const nav = sidebar.querySelector('.main-nav');

    if (!toggle || !nav) {
      return;
    }

    const closeMenu = () => {
      sidebar.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (sidebar.classList.contains('nav-open')) {
          closeMenu();
        }
      });
    });
  });
});

