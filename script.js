// AGE GATE
const ageGate = document.getElementById('ageGate');
const ageYes = document.getElementById('ageYes');
const ageNo = document.getElementById('ageNo');

if (sessionStorage.getItem('ageVerified')) {
  ageGate.classList.add('hidden');
} else {
  document.body.style.overflow = 'hidden';
}

ageYes.addEventListener('click', () => {
  sessionStorage.setItem('ageVerified', '1');
  ageGate.classList.add('hidden');
  document.body.style.overflow = '';
});

ageNo.addEventListener('click', () => {
  document.body.innerHTML = `
    <div style="min-height:100vh;background:#0D0D0D;display:flex;align-items:center;justify-content:center;font-family:Lato,sans-serif;color:#8A7D6A;text-align:center;padding:2rem;">
      <div>
        <p style="font-size:1rem;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:1rem;color:#C9A84C;">Acceso restringido</p>
        <p style="font-size:0.85rem;line-height:1.8;">Este sitio contiene contenido destinado únicamente a adultos.<br>Debe tener 18 años o más para acceder.</p>
      </div>
    </div>`;
});

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// SMOOTH SCROLL for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// INTERSECTION OBSERVER — fade in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.feature-card, .vitola-card, .article-card, .step, .stat, blockquote'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add CSS for fade-in
const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .vitola-card.fade-in { transition-delay: calc(var(--i, 0) * 0.1s); }
`;
document.head.appendChild(style);

document.querySelectorAll('.vitola-card').forEach((el, i) => {
  el.style.setProperty('--i', i);
});

document.querySelectorAll('.feature-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// FORM SUBMIT
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = '¡Suscrito!';
    btn.style.background = '#C9A84C';
    btn.style.color = '#0D0D0D';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Suscribirse';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
