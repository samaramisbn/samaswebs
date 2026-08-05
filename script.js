// script.js — Sama's Webs (i18n mejorado: traduce todo el texto traducible automáticamente)
// - Traduce elementos con data-i18n y además intenta traducir nodos de texto y atributos
// - Mantiene galería autoplay, form handling, mobile menu, smooth scroll

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

document.addEventListener('DOMContentLoaded', () => {
  // ===== TRANSLATIONS =====
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
      "cta.final.title": "Listo para transformar tu presencia digital?",
      "cta.final.lead": "Pide una propuesta personalizada y descubre cómo podemos ayudar a tu negocio.",
      "cta.final.contact": "Solicitar propuesta",
      "cta.final.portfolio": "Ver portfolio",
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
      "cta.final.title": "Ready to transform your digital presence?",
      "cta.final.lead": "Request a personalised proposal and discover how we can help your business.",
      "cta.final.contact": "Request proposal",
      "cta.final.portfolio": "See portfolio",
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
      "cta.final.title": "デジタルプレゼンスを変えませんか？",
      "cta.final.lead": "カスタム提案を依頼して、支援方法を見つけましょう。",
      "cta.final.contact": "提案を依頼",
      "cta.final.portfolio": "ポートフォリオを見る",
      "footer.email": "メール:",
      "footer.phone": "電話:"
    }
  };

  // ===== helper: apply data-i18n keys directly =====
  function applyDataKeys(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (value === undefined) return;
      // if element is an input/textarea, set placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
    // title tag
    if (dict['meta.title']) document.title = dict['meta.title'];
  }

  // ===== helper: build reverse lookup from Spanish original strings to data keys =====
  function buildReverseLookup() {
    const reverse = {};
    const base = TRANSLATIONS.es || {};
    for (const key in base) {
      const text = (base[key] || '').trim();
      if (!text) continue;
      reverse[text] = key;
    }
    return reverse;
  }

  // ===== helper: translate plain text nodes & attributes by matching spanish text =====
  function translateByMatchingText(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
    const reverse = buildReverseLookup();

    // translate attributes for inputs, images, buttons, links
    const attrTargets = [
      { selector: 'input[placeholder], textarea[placeholder]', attr: 'placeholder' },
      { selector: 'img[alt]', attr: 'alt' },
      { selector: 'a[title], button[title], [title]', attr: 'title' },
      { selector: '[aria-label]', attr: 'aria-label' }
    ];
    attrTargets.forEach(spec => {
      document.querySelector
