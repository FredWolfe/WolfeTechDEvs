/* ============================================
   WolfeTech Devs - main.js
   All interactive behaviour lives here
   ============================================ */


/* ── 1. ACTIVE NAV LINK ON SCROLL ─────────────
   Watches which section is on screen and
   highlights the matching nav link           */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

const observerOptions = {
  root: null,          // viewport
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


/* ── 2. FADE-IN ON SCROLL ─────────────────────
   Elements with class .fade-in animate in
   as they enter the viewport                */

const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));


/* ── 3. TYPED HERO SUBTITLE ───────────────────
   Cycles through a list of roles under name  */

const roles = [
  'Aspiring Data Engineer',
  'Software Developer',
  'Flutter Developer',
  'MERN Stack Dev',
  'ALX Africa Fellow'
];

const heroSub = document.getElementById('typed-sub');

if (heroSub) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      heroSub.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1800); // pause at end
        return;
      }
    } else {
      heroSub.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? 60 : 90);
  }

  type();
}


/* ── 4. NAVBAR SCROLL SHADOW ──────────────────
   Adds a stronger shadow to nav once
   user scrolls past 80px                    */

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 4px 30px rgba(0,212,255,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


/* ── 5. SMOOTH SCROLL FOR NAV LINKS ───────────
   Extra fallback in case CSS scroll-behavior
   isn't supported by the browser            */

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
