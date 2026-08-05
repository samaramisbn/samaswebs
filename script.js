// script.js — i18n mejorado (traduce todo lo traducible) + galería, form, nav, smooth scroll
// Reemplaza completamente tu script.js por este y recarga (Ctrl/Cmd+Shift+R)

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

document.addEventListener('DOMContentLoaded', () => {
  // ===== TRANSLATIONS =====
  // Añade / modifica entradas según necesites
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
      "footer.email": "メール:",
      "footer.phone": "電話:"
    }
  };

  // ===== Utilities for normalization & matching =====
  function normalizeText(s) {
    if (!s) return '';
    return s
      .normalize('NFD')                       // decompose accents
      .replace(/[\u0300-\u036f]/g, '')        // remove diacritics
      .replace(/\u00A0/g, ' ')                // NBSP -> space
      .replace(/[\u2018\u2019\u201C\u201D]/g, '"') // smart quotes -> normal
      .replace(/[\t\r\n]+/g, ' ')             // whitespace collapse
      .replace(/[.,;:!?¡¿«»"()\[\]]/g, '')    // remove common punctuation
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Build map of normalized Spanish phrase -> key & original Spanish text
  function buildReverseMap() {
    const map = [];
    const base = TRANSLATIONS.es || {};
    for (const key in base) {
      const original = (base[key] || '').trim();
      if (!original) continue;
      const norm = normalizeText(original);
      if (!norm) continue;
      map.push({ key, original, norm });
    }
    // Sort by length descending so longer phrases match first
    map.sort((a,b) => b.norm.length - a.norm.length);
    return map;
  }

  // Translate nodes using data-i18n attributes (deterministic)
  function applyDataI18n(lang) {
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

  // Translate attributes by matching normalized spanish original strings
  function translateAttributes(reverseMap, dict) {
    const specs = [
      { selector: 'input[placeholder], textarea[placeholder]', attr: 'placeholder' },
      { selector: 'img[alt]', attr: 'alt' },
      { selector: '[title]', attr: 'title' },
      { selector: '[aria-label]', attr: 'aria-label' }
    ];
    specs.forEach(spec => {
      document.querySelectorAll(spec.selector).forEach(el => {
        const raw = (el.getAttribute(spec.attr) || '').trim();
        if (!raw) return;
        const rawNorm = normalizeText(raw);
        for (const entry of reverseMap) {
          if (rawNorm === entry.norm || rawNorm.includes(entry.norm)) {
            const translated = dict[entry.key];
            if (translated) el.setAttribute(spec.attr, translated);
            break;
          }
        }
      });
    });

    // select options
    document.querySelectorAll('select option').forEach(opt => {
      const raw = (opt.textContent || '').trim();
      if (!raw) return;
      const rawNorm = normalizeText(raw);
      for (const entry of reverseMap) {
        if (rawNorm === entry.norm || rawNorm.includes(entry.norm)) {
          const translated = dict[entry.key];
          if (translated) opt.textContent = translated;
          break;
        }
      }
    });
  }

  // Translate text nodes (TREE WALKER: SHOW_TEXT) using normalized matching
  function translateTextNodes(reverseMap, dict) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // skip whitespace-only
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        // skip text inside script/style, inputs, textareas, selects
        const parent = node.parentNode;
        if (!parent || parent.closest && (parent.closest('script, style, textarea, input, select'))) return NodeFilter.FILTER_REJECT;
        // don't touch nodes that are inside elements with data-i18n
        if (parent && parent.closest && parent.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(textNode => {
      const raw = textNode.nodeValue;
      const norm = normalizeText(raw);
      if (!norm) return;

      // Try exact normalized match first
      for (const entry of reverseMap) {
        if (norm === entry.norm) {
          const translated = dict[entry.key];
          if (translated) {
            textNode.nodeValue = translated;
          }
          return; // processed
        }
      }

      // Try substring matches: replace occurrences of spanish original substrings with translated substrings
      // We operate on the original raw string to preserve punctuation/casing where possible
      let newText = raw;
      let changed = false;
      for (const entry of reverseMap) {
        // attempt to find the original phrase in the raw text (case-insensitive)
        const original = entry.original;
        if (!original) continue;
        const re = new RegExp(escapeRegExp(original), 'gi');
        if (re.test(newText)) {
          const translated = dict[entry.key] || original;
          newText = newText.replace(re, translated);
          changed = true;
        } else {
          // fallback: try matching normalized substring within normalized raw
          const rawNorm = norm;
          if (rawNorm.includes(entry.norm)) {
            // find the original substring by searching split words; perform a best-effort replacement using regex for the words
            // create pattern from entry.norm words
            const words = entry.norm.split(' ').filter(Boolean);
            if (words.length && words.length <= 6) {
              // build fuzzy regex: match words with optional punctuation/spaces between
              const patt = words.map(w => escapeRegExp(w)).join('[\\s\\S]{0,6}'); // allow small gap
              const re2 = new RegExp(patt, 'i');
              // Try to find a match in raw (original text)
              const m = newText.match(re2);
              if (m) {
                const found = m[0];
                const translated = dict[entry.key] || entry.original;
                newText = newText.replace(found, translated);
                changed = true;
              }
            }
          }
        }
      }
      if (changed) {
        textNode.nodeValue = newText;
      }
    });
  }

  // Master function to apply language
  function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
    // update currentLang
    currentLang = lang;

    // 1) deterministic keys
    applyDataI18n(lang);

    // 2) build reverse map
    const reverseMap = buildReverseMap();

    // 3) translate attributes & options
    translateAttributes(reverseMap, dict);

    // 4) translate text nodes
    translateTextNodes(reverseMap, dict);

    // 5) update dynamic elements like status message if present
    if (statusEl && statusEl.dataset && statusEl.dataset.state) {
      const state = statusEl.dataset.state; // e.g. 'sending' / 'sent' / 'error'
      if (state && dict[state]) statusEl.textContent = dict[state];
    }

    // 6) update language button aria-pressed
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    // persist
    localStorage.setItem('samaswebs:lang', lang);
  }

  // Short helper to apply only data keys (used earlier)
  function applyDataI18n(lang) {
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

  // Build reverse map helper (reused)
  function buildReverseMap() {
    const map = [];
    const base = TRANSLATIONS.es || {};
    for (const key in base) {
      const original = (base[key] || '').trim();
      if (!original) continue;
      const norm = normalizeText(original);
      if (!norm) continue;
      map.push({ key, original, norm });
    }
    map.sort((a,b) => b.norm.length - a.norm.length);
    return map;
  }

  // ===== Current language & statusEl reference (used for dynamic messages) =====
  let currentLang = localStorage.getItem('samaswebs:lang') || (navigator.language || 'es').slice(0,2);
  if (!['es','en','ja'].includes(currentLang)) currentLang = 'es';

  const statusEl = document.getElementById('contact-status');

  // Wire language buttons
  document.querySelectorAll('.lang-switch__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // Apply initial language
  applyLanguage(currentLang);

  // ===== rest of behavior (unchanged-ish) =====

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
    anchor.addEventListener('click', function(e) {
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

  // Contact form handling (uses translations for status)
  const form = document.getElementById('contact-form');
  const resetBtn = document.getElementById('contact-reset');

  if (form) {
    const formEndpointMeta = document.querySelector('meta[name="form-endpoint"]');
    const formEndpoint = formEndpointMeta ? (formEndpointMeta.getAttribute('content') || '').trim() : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('is-loading'); submitBtn.textContent = TRANSLATIONS[currentLang]?.['form.send'] || originalText || '...'; }
      if (statusEl) { statusEl.dataset.state = 'sending'; statusEl.textContent = TRANSLATIONS[currentLang]?.['sending'] || TRANSLATIONS.es['sending']; }

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

        if (statusEl) { statusEl.dataset.state = 'sent'; statusEl.textContent = TRANSLATIONS[currentLang]?.['sent'] || TRANSLATIONS.es['sent']; }
        form.reset();
      } catch (err) {
        console.error(err);
        if (statusEl) { statusEl.dataset.state = 'sendError'; statusEl.textContent = TRANSLATIONS[currentLang]?.['sendError'] || TRANSLATIONS.es['sendError']; }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = originalText || (TRANSLATIONS[currentLang]?.['form.send'] || TRANSLATIONS.es['form.send']); }
        setTimeout(()=>{ if (statusEl) { statusEl.textContent=''; delete statusEl.dataset.state; } }, 7000);
      }
    });

    if (resetBtn) resetBtn.addEventListener('click', () => { form.reset(); if (statusEl) statusEl.textContent=''; });

  }

  // Gallery init: set <img> src and autoplay (unchanged)
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

}); // DOMContentLoaded end