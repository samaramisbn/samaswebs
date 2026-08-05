// script.js — i18n seguro (no hace reemplazos parciales peligrosos) + galería, form, nav, smooth scroll
// Pega este archivo, guarda y fuerza recarga (Ctrl/Cmd+Shift+R).

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

document.addEventListener('DOMContentLoaded', () => {
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

  // Normalization helpers
  function normalizeText(s) {
    if (!s) return '';
    return s.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\u00A0/g,' ')
      .replace(/[\u2018\u2019\u201C\u201D]/g,'"')
      .replace(/[\t\r\n]+/g,' ')
      .replace(/[.,;:!?¡¿«»"(){}\[\]]/g,'')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }
  function escapeRegExp(string){ return string.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  // Build reverse mapping
  function buildReverseMap() {
    const base = TRANSLATIONS.es || {};
    const map = [];
    for (const key in base) {
      const original = (base[key] || '').toString().trim();
      if (!original) continue;
      const norm = normalizeText(original);
      if (!norm) continue;
      map.push({ key, original, norm });
    }
    map.sort((a,b) => b.norm.length - a.norm.length);
    return map;
  }

  // Apply data-i18n keys
  function applyDataI18n(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (value === undefined) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
      else el.textContent = value;
    });
    if ((TRANSLATIONS[lang] || TRANSLATIONS.es)['meta.title']) document.title = (TRANSLATIONS[lang] || TRANSLATIONS.es)['meta.title'];
  }

  // Translate attributes by exact/normalized matching
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
        const n = normalizeText(raw);
        for (const entry of reverseMap) {
          if (n === entry.norm) {
            const translated = dict[entry.key];
            if (translated) el.setAttribute(spec.attr, translated);
            break;
          }
        }
      });
    });
    // options
    document.querySelectorAll('select option').forEach(opt=>{
      const raw = (opt.textContent||'').trim();
      if(!raw) return;
      const n = normalizeText(raw);
      for (const entry of reverseMap) {
        if (n === entry.norm) {
          const translated = dict[entry.key];
          if (translated) opt.textContent = translated;
          break;
        }
      }
    });
  }

  // Replace whole-element text only when it matches exactly (normalized) OR element is simple (only text nodes)
  function translateElementsConservatively(reverseMap, dict) {
    const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,button,a,label,span,small,div,section,article'));
    candidates.forEach(el => {
      if (el.closest && el.closest('[data-i18n]')) return; // skip already handled
      // compute rendered text
      const raw = (el.innerText || el.textContent || '').trim();
      if (!raw || raw.length > 800) return;
      const n = normalizeText(raw);

      for (const entry of reverseMap) {
        if (n === entry.norm) {
          // If element has child elements heavier than inline (<img>, <svg>, etc.), avoid replacing innerHTML
          const hasHeavyChildren = Array.from(el.children).some(c => !['SPAN','EM','STRONG','B','I','U','SMALL'].includes(c.tagName));
          if (!hasHeavyChildren) {
            // Safe to write translation to textContent
            const translated = dict[entry.key];
            if (translated) {
              el.textContent = translated;
            }
          }
          break; // once matched, stop for this element
        }
      }
    });
  }

  // Translate text nodes (leaf nodes) by exact normalized match
  function translateTextNodes(reverseMap, dict) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentNode;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest && parent.closest('script, style, template, noscript')) return NodeFilter.FILTER_REJECT;
        if (parent.closest && parent.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
        // skip nodes that look like numbers/dates or very short tokens (to avoid noisy replacements)
        const txt = node.nodeValue.trim();
        if (txt.length < 2 || txt.length > 300) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(textNode => {
      const raw = textNode.nodeValue || '';
      const norm = normalizeText(raw);
      if (!norm) return;
      for (const entry of reverseMap) {
        if (norm === entry.norm) {
          const translated = (TRANSLATIONS[currentLang] || TRANSLATIONS.es)[entry.key];
          if (translated) textNode.nodeValue = translated;
          break;
        }
      }
    });
  }

  // Apply language function
  let currentLang = localStorage.getItem('samaswebs:lang') || (navigator.language || 'es').slice(0,2);
  if (!['es','en','ja'].includes(currentLang)) currentLang = 'es';
  const statusEl = document.getElementById('contact-status');

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

    // 1) deterministic keys
    applyDataI18n(lang);

    // 2) build reverseMap
    const reverseMap = buildReverseMap();

    // 3) attributes and options (exact normalized matches only)
    translateAttributes(reverseMap, dict);

    // 4) leaf text nodes (exact normalized matches only)
    translateTextNodes(reverseMap, dict);

    // 5) conservative whole-element replacements for exact matches
    translateElementsConservatively(reverseMap, dict);

    // 6) update status messages if present
    if (statusEl && statusEl.dataset && statusEl.dataset.state) {
      const state = statusEl.dataset.state;
      if (state && dict[state]) statusEl.textContent = dict[state];
    }

    // update language button states
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    localStorage.setItem('samaswebs:lang', lang);
  }

  // Bind language buttons
  document.querySelectorAll('.lang-switch__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Apply initial language
  applyLanguage(currentLang);

  // ===== rest: nav, smooth scroll, form, gallery (unchanged) =====

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

  // Contact form handling
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
          if (!resp.ok) throw new Error('Error en endpoint: ' + resp.status);
        } else if (form.hasAttribute('data-netlify')) {
          const payload = Object.assign({'form-name': form.getAttribute('name') || 'contact'}, data);
          const body = encodeFormData(payload);
          const resp = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
          if (!resp.ok) throw new Error('Netlify submit failed: ' + resp.status);
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
        setTimeout(()=>{ if (statusEl) { statusEl.textContent = ''; delete statusEl.dataset.state; } }, 7000);
      }
    });
    if (resetBtn) resetBtn.addEventListener('click', ()=>{ form.reset(); if (statusEl) statusEl.textContent=''; });
  }

  // Gallery
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

  // Helper to copy visible strings for i18n debugging
  window.__collectVisibleTextForI18n = function() {
    const texts = new Set();
    function isVisible(el){
      if (!el) return false;
      if (el.closest && el.closest('script, style, noscript, template')) return false;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || 1) === 0) return false;
      if (el.hasAttribute && el.hasAttribute('aria-hidden') && el.getAttribute('aria-hidden') === 'true') return false;
      return el.offsetParent !== null || el.getClientRects().length > 0;
    }
    document.querySelectorAll('body *:not(script):not(style):not(noscript):not(template)').forEach(el => {
      try {
        if (!isVisible(el)) return;
        const txt = (el.innerText || el.textContent || '').trim();
        if (!txt) return;
        if (txt.length < 2 || txt.length > 800) return;
        const normalized = txt.replace(/\r/g,'').replace(/\n+/g,' ').replace(/\s+/g,' ').trim();
        if (normalized) texts.add(normalized);
      } catch (e) {}
    });
    const result = Array.from(texts).sort((a,b)=> a.length - b.length || a.localeCompare(b));
    console.log('Visible text items for i18n:', result);
    try { navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(JSON.stringify(result, null, 2)); } catch(e){}
    return result;
  };

});