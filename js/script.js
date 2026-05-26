/* HAMBURGER MENU */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* SCROLL SPY */

const sections  = document.querySelectorAll('.snap-section');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');
const dots      = document.querySelectorAll('.section-dot[data-target]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;

    navLinks.forEach(link =>
      link.classList.toggle('active', link.dataset.section === id)
    );

    dots.forEach(dot =>
      dot.classList.toggle('active', dot.dataset.target === id)
    );
  });
}, {
  threshold: 0.5
});

sections.forEach(s => observer.observe(s));

/* DOT CLICK NAVIGATION */

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});