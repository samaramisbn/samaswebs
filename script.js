// script.js — comportamiento UI/UX para Sama's Webs
// - Menú móvil accesible
// - Smooth scroll para anclas
// - Manejo del formulario con soporte para: Formspree (meta form-endpoint), Netlify Forms (data-netlify) y fallback mailto
// - Auto-fill del año en el footer
// - Galería autoplay preparada (3 slides, 5s)

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

document.addEventListener('DOMContentLoaded', () => {
  // Auto-fill year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (mobileMenu.hasAttribute('hidden')) {
        mobileMenu.removeAttribute('hidden');
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        mobileMenu.setAttribute('hidden', '');
        navToggle.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Close menu when clicking a link
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.setAttribute('hidden', '');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#0') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Contact form handling (supports Formspree, Netlify Forms, and mailto fallback)
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const resetBtn = document.getElementById('contact-reset');

  if (form) {
    const formEndpointMeta = document.querySelector('meta[name="form-endpoint"]');
    const formEndpoint = formEndpointMeta ? (formEndpointMeta.getAttribute('content') || '').trim() : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.textContent = 'Enviando...';
      }
      if (statusEl) statusEl.textContent = 'Enviando mensaje...';

      const fd = new FormData(form);
      const data = {};
      fd.forEach((v, k) => (data[k] = v));

      try {
        if (formEndpoint) {
          // POST JSON to provided endpoint (e.g. Formspree)
          const resp = await fetch(formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (!resp.ok) throw new Error('Error en endpoint: ' + resp.status);
        } else if (form.hasAttribute('data-netlify')) {
          // Netlify Forms
          const payload = Object.assign({ 'form-name': form.getAttribute('name') || 'contact' }, data);
          const body = encodeFormData(payload);
          const resp = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
          });
          if (!resp.ok) throw new Error('Netlify submit failed: ' + resp.status);
        } else {
          // mailto fallback
          const subject = encodeURIComponent('Contacto desde web — ' + (data.business || data.name || 'Sin nombre'));
          const bodyText = `Nombre: ${data.name || ''}\nEmail: ${data.email || ''}\nNegocio: ${data.business || ''}\nServicio: ${data.service || ''}\n\nMensaje:\n${data.message || ''}`;
          window.location.href = `mailto:ssamaramiss@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
        }

        if (statusEl) statusEl.textContent = 'Mensaje enviado. Te responderemos pronto.';
        form.reset();
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = 'Ocurrió un error al enviar. Intenta de nuevo.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.textContent = originalText;
        }
        setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 7000);
      }
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        if (statusEl) statusEl.textContent = '';
      });
    }
  }

  /* === Gallery autoplay (3 slides) ===
     - Espera #gallery con .gallery__slide[data-src="..."]
     - Autoplay continuo cada 5000ms (5s)
     - No pausa al hover
  */
  (function initGallery() {
    const GALLERY_INTERVAL = 5000; // 5 seconds
    const galleryInner = document.getElementById('gallery');
    if (!galleryInner) return;

    const slides = Array.from(galleryInner.querySelectorAll('.gallery__slide'));
    if (!slides.length) return;

    // Preload images and set as background when ready
    slides.forEach(slide => {
      const src = slide.getAttribute('data-src');
      if (src) {
        const img = new Image();
        img.src = src;
        img.onload = () => { slide.style.backgroundImage = `url('${src}')`; };
        img.onerror = () => { /* keep fallback background-color */ };
      }
    });

    // initial state
    let current = 0;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });

    // autoplay
    setInterval(() => {
      const prev = current;
      current = (current + 1) % slides.length;
      slides[prev].classList.remove('active');
      slides[prev].setAttribute('aria-hidden', 'true');
      slides[current].classList.add('active');
      slides[current].setAttribute('aria-hidden', 'false');
    }, GALLERY_INTERVAL);
  })();

});
