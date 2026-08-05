// script.js — Sama's Webs (i18n ampliado: intenta traducir todo el texto visible)
// - Traduce elementos con data-i18n y, además, busca coincidencias normalizadas en el DOM
// - Traduce attributes: placeholder, alt, title, aria-label, option text
// - Mantiene galería autoplay, form handling, mobile menu, smooth scroll

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

document.addEventListener('DOMContentLoaded', () => {
  // ===== TRANSLATIONS (añadí claves para mensajes de estado) =====
  const TRANSLATIONS = {
    es: {
      "meta.title": "Sama's Webs — Tecnología sencilla para pequeños negocios",
      "brand.tagline": "WEBSITES · LANDING PAGES · DIGITAL SOLUTIONS",
      "nav.services": "Servicios",
      "nav.about": "Quiénes somos",
      "nav.sectors": "Sectores",
      "nav.process": "Cómo trabajamos",
      "nav.contact": "Contacto",
      "hero.title": "La tecnología no tiene por qué ser complicada.",
      "hero.subtitle": "Creamos páginas web, landing pages, guías digitales y herramientas pensadas para facilitar la vida de tu negocio y mejorar la experiencia de tus clientes.",
      "cta.contact": "Solicitar presupuesto",
      "cta.portfolio": "Ver proyectos",
      "highlight.design": "Diseños sencillos y efectivos",
      "highlight.tools": "Herramientas fáciles de usar",
      "highlight.support": "Soporte cercano y directo",
      "about.title": "Somos Sama's Webs",
      "about.lead": "Ayudamos a pequeños negocios a digitalizarse mediante soluciones sencillas, útiles y personalizadas.",
      "services.title": "Qué podemos hacer por tu negocio",
      "services.lead": "Soluciones prácticas y pensadas para pequeñas empresas y hostelería.",
      "contact.title": "Contacto",
      "contact.lead": "Cuéntanos en pocas palabras tu proyecto y te responderemos con una propuesta clara.",
      "form.name": "Nombre",
      "form.email": "Email",
      "form.business": "Negocio",
      "form.service": "Servicio interesado",
      "form.message": "Mensaje",
      "form.send": "Enviar mensaje",
      "form.clear": "Borrar",
      "sending": "Enviando mensaje...",
      "sent": "Mensaje enviado. Te responderemos pronto.",
      "sendError": "Ocurrió un error al enviar. Intenta de nuevo.",
      "cta.final.title": "Listo para transformar tu presencia digital?",
      "cta.final.lead": "Pide una propuesta personalizada y descubre cómo podemos ayudar a tu negocio.",
      "footer.email": "Email:",
      "footer.phone": "Tel:"
    },
    en: {
      "meta.title": "Sama's Webs — Simple technology for small businesses",
      "brand.tagline": "WEBSITES · LANDING PAGES · DIGITAL SOLUTIONS",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.sectors": "Sectors",
      "nav.process": "How we work",
      "nav.contact": "Contact",
      "hero.title": "Technology doesn't have to be complicated.",
      "hero.subtitle": "We build websites, landing pages and digital guides tailored to help your business and improve your customers' experience.",
      "cta.contact": "Request quote",
      "cta.portfolio": "See projects",
      "highlight.design": "Simple, effective designs",
      "highlight.tools": "Easy-to-use tools",
      "highlight.support": "Friendly, direct support",
      "about.title": "We are Sama's Webs",
      "about.lead": "We help small businesses go digital with simple, useful and personalised solutions.",
      "services.title": "What we can do for your business",
      "services.lead": "Practical solutions for small businesses and hospitality.",
      "contact.title": "Contact",
      "contact.lead": "Tell us briefly about your project and we'll respond with a clear proposal.",
      "form.name": "Name",
      "form.email": "Email",
      "form.business": "Business",
      "form.service": "Interested service",
      "form.message": "Message",
      "form.send": "Send message",
      "form.clear": "Clear",
      "sending": "Sending message...",
      "sent": "Message sent. We'll reply soon.",
      "sendError": "There was an error sending. Try again.",
      "cta.final.title": "Ready to transform your digital presence?",
      "cta.final.lead": "Request a personalised proposal and discover how we can help your business.",
      "footer.email": "Email:",
      "footer.phone": "Phone:"
    },
    ja: {
      "meta.title": "Sama's Webs — 小さな事業者向けのシンプルな技術",
      "brand.tagline": "WEBSITES · LANDING PAGES · DIGITAL SOLUTIONS",
      "nav.services": "サービス",
      "nav.about": "私たちについて",
      "nav.sectors": "業種",
      "nav.process": "作業内容",
      "nav.contact": "お問い合わせ",
      "hero.title": "テクノロジーは複雑である必要はありません。",
      "hero.subtitle": "ウェブサイト、ランディングページ、デジタルガイドを作り、事業の利便性と顧客体験を向上させます。",
      "cta.contact": "見積りを依頼",
      "cta.portfolio": "プロジェクトを見る",
      "highlight.design": "シンプルで効果的なデザイン",
      "highlight.tools": "使いやすいツール",
      "highlight.support": "親しみやすいサポート",
      "about.title": "Sama's Webs です",
      "about.lead": "小さな事業者のためにシンプルで実用的なデジタルソリューションを提供します。",
      "services.title": "あなたのビジネスにできること",
      "services.lead": "中小企業・ホスピタリティ向けの実用的なソリューション。",
      "contact.title": "お問い合わせ",
      "contact.lead": "プロジェクトを簡単に教えてください。明確な提案でお返しします。",
      "form.name": "名前",
      "form.email": "メール",
      "form.business": "事業",
      "form.service": "興味のあるサービス",
      "form.message": "メッセージ",
      "form.send": "送信",
      "form.clear": "クリア",
      "sending": "送信中...",
      "sent": "メッセージが送信されました。追って連絡します。",
      "sendError": "送信中にエラーが発生しました。もう一度お試しください。",
      "cta.final.title": "デジタルプレゼンスを変えませんか？",
      "cta.final.lead": "カスタム提案を依頼して、支援方法を見つけましょう。",
      "footer.email": "メール:",
      "footer.phone": "電話:"
    }
  };

  // current language (kept in a variable for dynamic use)
  let currentLang = localStorage.getItem('samaswebs:lang') || (navigator.language || 'es').slice(0,2);
  if (!['es','en','ja'].includes(currentLang)) currentLang = 'es';

  // helper: get translation value for current language, fallback to es or key
  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || (TRANSLATIONS.es && TRANSLATIONS.es[key]) || key;
  }

  // Apply explicit data-i18n keys first
  function applyDataKeys(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (value === undefined) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
    if (dict['meta.title']) document.title = dict['meta.title'];
  }

  // Normalization used for fuzzy matching
  function normalizeText(s) {
    if (!s) return '';
    return s
      .replace(/\u00A0/g,' ')           // non-breaking spaces
      .replace(/[\u2018\u2019\u201C\u201D]/g, '"') // smart quotes -> normal
      .replace(/[.,;:!?¡¿«»"()]/g, '')  // remove punctuation
      .replace(/\s+/g, ' ')             // collapse whitespace
      .trim()
      .toLowerCase();
  }

  // Build reverse lookup from normalized Spanish texts -> key
  function buildReverseLookup() {
    const reverse = {};
    const base = TRANSLATIONS.es || {};
    for (const key in base) {
      const text = (base[key] || '').trim();
      if (!text) continue;
      const n = normalizeText(text);
      if (n) reverse[n] = key;
    }
    return reverse;
  }

  // Translate attributes (placeholder, alt, title, aria-label) by normalized matching
  function translateAttributes(reverse, dict) {
    const attrSpecs = [
      { selector: 'input[placeholder], textarea[placeholder]', attr: 'placeholder' },
      { selector: 'img[alt]', attr: 'alt' },
      { selector: '[title]', attr: 'title' },
      { selector: '[aria-label]', attr: 'aria-label' }
    ];
    attrSpecs.forEach(spec => {
      document.querySelectorAll(spec.selector).forEach(el => {
        const raw = (el.getAttribute(spec.attr) || '').trim();
        if (!raw) return;
        const key = reverse[normalizeText(raw)];
        if (key && dict[key]) el.setAttribute(spec.attr, dict[key]);
      });
    });

    // translate option text
    document.querySelectorAll('select option').forEach(opt => {
      const raw = (opt.textContent || '').trim();
      if (!raw) return;
      const key = reverse[normalizeText(raw)];
      if (key && dict[key]) opt.textContent = dict[key];
    });
  }

  // Translate leaf text nodes by normalized exact-match
  function translateLeafTextNodes(reverse, dict) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        // skip certain elements
        if (node.matches && node.matches('script, style, textarea, input, select')) return NodeFilter.FILTER_REJECT;
        if (node.hasAttribute && node.hasAttribute('data-i18n')) return NodeFilter.FILTER_REJECT;
        // accept only leaf elements (no element children)
        if (node.children && node.children.length === 0) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      }
    }, false);

    let node;
    while ((node = walker.nextNode())) {
      try {
        const el = node;
        const raw = (el.textContent || '').trim();
        if (!raw) continue;
        // avoid very long blocks
        if (raw.length > 300) continue;
        const key = reverse[normalizeText(raw)];
        if (key && dict[key]) {
          el.textContent = dict[key];
        }
      } catch (err) {
        // ignore
      }
    }
  }

  // Main translation orchestration
  function applyLanguage(lang) {
    currentLang = lang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

    // 1) explicit data-i18n keys
    applyDataKeys(lang);

    // 2) build reverse mapping from normalized spanish strings -> key
    const reverse = buildReverseLookup();

    // 3) attributes and option texts
    translateAttributes(reverse, dict);

    // 4) leaf text nodes
    translateLeafTextNodes(reverse, dict);

    // 5) update any dynamic strings used by script (status messages)
    // e.g. statusEl text management will use t('sending') etc in submit handler
    // update language button state
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    // persist
    localStorage.setItem('samaswebs:lang', lang);
  }

  // Bind language buttons
  document.querySelectorAll('.lang-switch__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // initial apply
  applyLanguage(currentLang);

  // ===== rest of behavior =====

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.setAttribute('hidden', '');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

  // Contact form handling (uses t('sending') etc for translated statuses)
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const resetBtn = document.getElementById('contact-reset');

  if (form) {
    const formEndpointMeta = document.querySelector('meta[name="form-endpoint"]');
    const formEndpoint = formEndpointMeta ? (formEndpointMeta.getAttribute('content') || '').trim() : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('is-loading'); submitBtn.textContent = t('form.send') || 'Enviando...'; }
      if (statusEl) statusEl.textContent = t('sending');

      const fd = new FormData(form); const data = {}; fd.forEach((v,k)=>data[k]=v);

      try {
        if (formEndpoint) {
          const resp = await fetch(formEndpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
          if (!resp.ok) throw new Error('Error en endpoint: '+resp.status);
        } else if (form.hasAttribute('data-netlify')) {
          const payload = Object.assign({'form-name': form.getAttribute('name') || 'contact'}, data);
          const body = encodeFormData(payload);
          const resp = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
          if (!resp.ok) throw new Error('Netlify submit failed: '+resp.status);
        } else {
          const subject = encodeURIComponent('Contacto desde web — ' + (data.business || data.name || 'Sin nombre'));
          const bodyText = `Nombre: ${data.name || ''}\nEmail: ${data.email || ''}\nNegocio: ${data.business || ''}\nServicio: ${data.service || ''}\n\nMensaje:\n${data.message || ''}`;
          window.location.href = `mailto:ssamaramiss@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
        }

        if (statusEl) statusEl.textContent = t('sent');
        form.reset();
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = t('sendError');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = originalText || t('form.send'); }
        setTimeout(()=>{ if (statusEl) statusEl.textContent=''; }, 7000);
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        if (statusEl) statusEl.textContent = '';
      });
    }
  }

  // Gallery init: set <img> src and autoplay
  (function initGallery(){
    const INTERVAL = 5000;
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    const slides = Array.from(gallery.querySelectorAll('.gallery__slide'));
    if (!slides.length) return;
    slides.forEach(slide => {
      const src = slide.getAttribute('data-src');
      const imgEl = slide.querySelector('img.gallery__img');
      if (imgEl && src) imgEl.src = src;
      slide.style.backgroundImage = 'none';
    });
    let current = 0;
    slides.forEach((s,i)=>{ s.classList.toggle('active', i===current); s.setAttribute('aria-hidden', i===current?'false':'true'); });
    setInterval(()=> {
      const prev = current;
      current = (current + 1) % slides.length;
      slides[prev].classList.remove('active'); slides[prev].setAttribute('aria-hidden','true');
      slides[current].classList.add('active'); slides[current].setAttribute('aria-hidden','false');
    }, INTERVAL);
  })();

});