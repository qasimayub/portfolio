document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-button');
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

  // Mobile menu
  const setMenu = open => {
    header.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menu.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

  // Live website previews: screenshots are generated from the real URL on page load.
  // mShots is the main source; it returns a 400×300 "generating" placeholder for new
  // URLs, so we retry a few times, then fall back to Microlink, then to the domain name.
  const mshots = (url, attempt) =>
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800${attempt ? `&r=${attempt}` : ''}`;
  const microlink = url =>
    `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

  document.querySelectorAll('img[data-site]').forEach(img => {
    const url = img.dataset.site;
    const shot = img.closest('.shot');
    let attempt = 0;
    let source = 'mshots';

    const useMicrolink = () => { source = 'microlink'; img.src = microlink(url); };
    img.addEventListener('load', () => {
      const placeholder = source === 'mshots' && img.naturalWidth <= 400;
      if (!placeholder) { shot.classList.add('is-loaded'); return; }
      if (++attempt <= 4) setTimeout(() => { img.src = mshots(url, attempt); }, 3500);
      else useMicrolink();
    });
    img.addEventListener('error', () => {
      if (source === 'mshots') useMicrolink();
      else shot.classList.add('is-fallback');
    });
    img.src = mshots(url, 0);
  });

  // Highlight the nav link for the section in view
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link =>
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => observer.observe(section));
  }
});
