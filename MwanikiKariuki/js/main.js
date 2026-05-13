// 1. Mobile hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// 2. Active nav link highlighting based on current page
(function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// 3. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// 4. Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// 5. Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]');
    const email = this.querySelector('[name="email"]');
    const message = this.querySelector('[name="message"]');
    const successMsg = document.getElementById('form-success');

    let valid = true;

    [name, email, message].forEach(field => {
      if (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#dc3545';
          valid = false;
        }
      }
    });

    if (email && email.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.style.borderColor = '#dc3545';
        valid = false;
      }
    }

    if (valid && successMsg) {
      successMsg.classList.add('show');
      contactForm.reset();
      setTimeout(() => successMsg.classList.remove('show'), 6000);
    }
  });
}

// 6. Practice area cards hover animation (handled in CSS, enhanced via JS if needed)
document.querySelectorAll('.practice-card, .investor-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transition = 'all 0.2s ease');
});

// 7. Scroll reveal via IntersectionObserver
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();
