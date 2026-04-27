/* ═══════════════════════════════════════
   WE ARE ALICANTE — main.js
   Isaac Rodríguez · Guía Turístico
════════════════════════════════════════ */

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
  }, 2400);
});

/* ─── CURSOR PERSONALIZADO ─── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .stop-card, .m-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform  = 'translate(-50%, -50%) scale(3)';
    cur.style.background = 'transparent';
    cur.style.border     = '1.5px solid var(--terra)';
    ring.style.opacity   = '0';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform  = 'translate(-50%, -50%) scale(1)';
    cur.style.background = 'var(--terra)';
    cur.style.border     = 'none';
    ring.style.opacity   = '.55';
  });
});

/* ─── NAV — scroll effect ─── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 70);
});

/* ─── MOBILE NAV ─── */
const burger = document.getElementById('burger');
const mob    = document.getElementById('mobNav');
let mobileOpen = false;

burger.addEventListener('click', () => {
  mobileOpen = !mobileOpen;
  mob.classList.toggle('open', mobileOpen);
  const s = burger.querySelectorAll('span');
  s[0].style.transform = mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)'  : '';
  s[1].style.opacity   = mobileOpen ? '0' : '1';
  s[2].style.transform = mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '';
});

function closeMob() {
  mobileOpen = false;
  mob.classList.remove('open');
  const s = burger.querySelectorAll('span');
  s[0].style.transform = '';
  s[1].style.opacity   = '1';
  s[2].style.transform = '';
}

/* ─── PARALLAX ─── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Hero background
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.transform = `scale(1.08) translateY(${y * 0.28}px)`;
  }

  // Parallax interlude background
  const piBg = document.getElementById('piBg');
  if (piBg) {
    const r = piBg.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) {
      piBg.style.transform = `scale(1.1) translateY(${-r.top * 0.18}px)`;
    }
  }

  // CTA final background
  const ctaBg = document.getElementById('ctaBg');
  if (ctaBg) {
    const r = ctaBg.parentElement.getBoundingClientRect();
    ctaBg.style.transform = `scale(1.06) translateY(${-r.top * 0.14}px)`;
  }
});

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── CONTADORES ANIMADOS ─── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = parseInt(el.dataset.target);
    let t0 = null;

    const step = ts => {
      if (!t0) t0 = ts;
      const progress = Math.min((ts - t0) / 2000, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString('es-ES');
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObserver.observe(el));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
