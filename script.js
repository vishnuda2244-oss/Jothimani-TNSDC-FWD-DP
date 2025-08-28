// Mobile nav toggle

const navToggle = document.querySelector('.nav-toggle');

const navList = document.querySelector('.nav ul');

if (navToggle && navList) {

  navToggle.addEventListener('click', () => {

    const open = navList.classList.toggle('open');

    navToggle.setAttribute('aria-expanded', String(open));

  });

}

// Theme toggle (persisted)

const themeToggle = document.getElementById('themeToggle');

const setTheme = (mode) => {

  if (mode === 'light') document.documentElement.classList.add('light');

  else document.documentElement.classList.remove('light');

  localStorage.setItem('theme', mode);

};

const saved = localStorage.getItem('theme');

if (saved) setTheme(saved);

themeToggle?.addEventListener('click', () => {

  const isLight = document.documentElement.classList.toggle('light');

  localStorage.setItem('theme', isLight ? 'light' : 'dark');

});

// Footer year

document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll tweak for keyboard focus

document.querySelectorAll('a[href^="#"]').forEach(a => {

  a.addEventListener('click', e => {

    const id = a.getAttribute('href');

    if (!id || id === '#') return;

    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    target.tabIndex = -1;

    target.focus({ preventScroll: true });

    setTimeout(() => target.removeAttribute('tabindex'), 800);

  });

});

// Contact form validation (client-side demo)

const form = document.getElementById('contactForm');

const statusEl = document.getElementById('formStatus');

function showError(name, msg) {

  const el = document.querySelector(`.error[data-for="${name}"]`);

  if (el) el.textContent = msg || '';

}

function validateEmail(v) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

}

form?.addEventListener('submit', (e) => {

  e.preventDefault();

  const data = new FormData(form);

  const name = (data.get('name') || '').toString().trim();

  const email = (data.get('email') || '').toString().trim();

  const message = (data.get('message') || '').toString().trim();

  let ok = true;

  showError('name', '');

  showError('email', '');

  showError('message', '');

  if (!name) { showError('name', 'Please enter your name'); ok = false; }

  if (!email || !validateEmail(email)) { showError('email', 'Enter a valid email'); ok = false; }

  if (!message || message.length < 10) { showError('message', 'Message should be at least 10 characters'); ok = false; }

  if (!ok) return;

  // Demo only — replace with real backend or email service

  statusEl.textContent = 'Thanks! Your message has been prepared in your email client.';

  // Open the user's mail client with a prefilled email to Jyothimani

  const subject = encodeURIComponent('Portfolio Inquiry for Jyothimani');

  const body = encodeURIComponent(`Hi Jyothimani,

Name: ${name}

Email: ${email}

${message}

— sent from the portfolio site`);

  window.location.href = `mailto:vishnuda2244@gmail.com?subject=${subject}&body=${body}`;

});