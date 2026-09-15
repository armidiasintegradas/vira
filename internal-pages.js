(() => {
  'use strict';

  const LOGO = 'assets/marca-site-menu.webp';
  const STATUS = 'CIRCULARIDADE: 100% AUDITADA • STATUS: OPERAÇÃO ATIVA';

  const PAGE_CONFIG = Object.freeze({
    'paver': {
      index: '01',
      label: 'PAVER',
      route: 'paver.html',
      descriptor: ['PAVIMENTAÇÃO NBR', '9781'],
      normative: 'NORMATIVA 2026 // REV. 4.0.2 BRAND SYSTEM SPEC // CARUARU — PE (8°17′S 35°58′W)',
      cta: '#especificar'
    },
    'blocos': {
      index: '02',
      label: 'BLOCOS',
      route: 'blocos.html',
      descriptor: ['ALVENARIA NBR', '6136'],
      normative: 'NORMATIVA 2026 // ABNT NBR 6136 / NBR 15961 // CARUARU — PE (8°17′S 35°58′W)',
      cta: '#especificar'
    },
    'guias': {
      index: '03',
      label: 'GUIAS',
      route: 'guias.html',
      descriptor: ['GUIAS & MEIO-FIO', 'NBR 14890'],
      normative: 'NORMATIVA 2026 // ABNT NBR 14890 / NBR 9781 // CARUARU — PE (8°17′S 35°58′W)',
      cta: '#especificar'
    },
    'central-tecnica': {
      index: '04',
      label: 'CENTRAL TÉCNICA',
      route: 'central-tecnica.html',
      descriptor: ['CENTRAL TÉCNICA //', 'ENGENHARIA & LAUDOS'],
      normative: 'NORMATIVA 2026 // ABNT NBR 9781 / NBR 6136 / NBR 14890 // CARUARU — PE (8°17′S 35°58′W)',
      cta: '#solicitar'
    },
    'passaporte': {
      index: '05',
      label: 'PASSAPORTE DPP',
      route: 'passaporte.html',
      descriptor: ['PASSAPORTE DPP', 'ISO 59020'],
      normative: 'NORMATIVA 2026 // PASSAPORTE DIGITAL DE PRODUTO / ISO 59020 // CARUARU — PE',
      cta: '#especificar'
    },
    'brandbook': {
      index: '06',
      label: 'BRANDBOOK',
      route: 'brandbook.html',
      descriptor: ['BRANDBOOK OFICIAL', 'DIRETRIZES DE IDENTIDADE'],
      normative: 'NORMATIVA 2026 // REV. 4.0.2 BRAND SYSTEM SPEC // CARUARU — PE (8°17′S 35°58′W)',
      cta: 'paver.html#especificar'
    }
  });

  const NAV = Object.freeze([
    PAGE_CONFIG['paver'],
    PAGE_CONFIG['blocos'],
    PAGE_CONFIG['guias'],
    PAGE_CONFIG['central-tecnica'],
    PAGE_CONFIG['passaporte'],
    PAGE_CONFIG['brandbook']
  ]);

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function navLabel(config) {
    if (config.index === '04') return '<span>04 // CENTRAL</span><span>TÉCNICA</span>';
    if (config.index === '05') return '<span>05 // PASSAPORTE</span><span>DPP</span>';
    return `<span>${config.index} //</span><span>${escapeHtml(config.label)}</span>`;
  }

  function navLinks(activeKey, mobile = false) {
    return NAV.map((item) => {
      const itemKey = Object.keys(PAGE_CONFIG).find((key) => PAGE_CONFIG[key] === item);
      const active = itemKey === activeKey;
      return `
        <a class="vira-nav-link${mobile ? ' vira-nav-link--mobile' : ''}" href="${item.route}"${active ? ' aria-current="page"' : ''}>
          <span class="vira-nav-link__dot" aria-hidden="true"></span>
          <span class="vira-nav-link__label">${navLabel(item)}</span>
        </a>`;
    }).join('');
  }

  function telemetryMarkup(config) {
    return `
      <aside data-purpose="telemetry-bar" aria-label="Status técnico VIRA">
        <div class="vira-telemetry__inner">
          <div class="vira-telemetry__group">
            <span class="vira-status-dot" aria-hidden="true"></span>
            <span class="vira-telemetry__copy">${escapeHtml(config.normative)}</span>
          </div>
          <div class="vira-telemetry__status">
            <span class="vira-telemetry__ok">${STATUS}</span>
            <a class="vira-telemetry__cta" href="${config.cta}">[ ESPECIFICAR OBRA → ]</a>
          </div>
        </div>
      </aside>`;
  }

  function headerMarkup(activeKey, config) {
    return `
      <header data-purpose="primary-navigation" class="vira-primary-header">
        <div class="vira-primary-header__inner">
          <a class="vira-brand" href="index.html" aria-label="Página Inicial VIRA">
            <img class="vira-brand__logo" src="${LOGO}" alt="VIRA">
            <span class="vira-brand__meta" aria-hidden="true">
              <span>${escapeHtml(config.descriptor[0])}</span>
              <span>${escapeHtml(config.descriptor[1])}</span>
            </span>
          </a>
          <nav class="vira-product-switcher" aria-label="Ecossistema técnico VIRA">
            ${navLinks(activeKey)}
          </nav>
          <div class="vira-header-actions">
            <a class="vira-specify-cta" href="${config.cta}"><span>ESPECIFICAR</span><span>PROJETO →</span></a>
            <button class="vira-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="viraMobileDrawer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round"></path></svg>
            </button>
          </div>
        </div>
        <div class="vira-mobile-drawer" id="viraMobileDrawer" aria-hidden="true">
          <div class="vira-mobile-drawer__inner">
            <nav aria-label="Ecossistema técnico VIRA — mobile">${navLinks(activeKey, true)}</nav>
            <a class="vira-specify-cta" href="${config.cta}"><span>ESPECIFICAR PROJETO →</span></a>
          </div>
        </div>
      </header>`;
  }

  function footerMarkup(activeKey) {
    const technicalLinks = NAV.map((item) => {
      const itemKey = Object.keys(PAGE_CONFIG).find((key) => PAGE_CONFIG[key] === item);
      const active = itemKey === activeKey;
      return `<li><a href="${item.route}"${active ? ' aria-current="page"' : ''}>${item.index} // ${escapeHtml(item.label)}</a></li>`;
    }).join('');

    return `
      <footer class="vira-internal-footer" data-purpose="internal-footer">
        <div class="vira-internal-footer__inner">
          <div class="vira-internal-footer__grid">
            <div>
              <a href="index.html" aria-label="VIRA — página inicial"><img class="vira-internal-footer__logo" src="${LOGO}" alt="VIRA"></a>
              <p class="vira-internal-footer__slogan">SOLUÇÕES PARA CIDADES MELHORES.</p>
              <div class="vira-internal-footer__bar" aria-hidden="true"></div>
              <p class="vira-internal-footer__bio">Engenharia, tecnologia e impacto real para transformar resíduos em infraestrutura urbana.</p>
            </div>
            <div>
              <h2 class="vira-internal-footer__title">PLATAFORMA TÉCNICA</h2>
              <ul class="vira-internal-footer__links">${technicalLinks}</ul>
            </div>
            <div>
              <h2 class="vira-internal-footer__title">CONTATO</h2>
              <div class="vira-internal-footer__meta">
                <div>Recife &amp; Caruaru, PE</div>
                <div>Atuação em todo o Brasil</div>
                <div><a href="mailto:contato@vira.eco">contato@vira.eco</a></div>
              </div>
            </div>
          </div>
          <div class="vira-internal-footer__bottom">
            <span>© 2026 VIRA. Todos os direitos reservados.</span>
            <span>Desenvolvido por AR Mídias Integradas.</span>
            <span class="vira-internal-footer__tagline">ECONOMIA CIRCULAR EM MOVIMENTO.</span>
          </div>
        </div>
      </footer>`;
  }

  function replaceElement(element, markup) {
    if (!element) return null;
    const template = document.createElement('template');
    template.innerHTML = markup.trim();
    const replacement = template.content.firstElementChild;
    element.replaceWith(replacement);
    return replacement;
  }

  function normalizeHero() {
    const hero = document.querySelector('[data-internal-hero="true"]');
    if (!hero) return;

    const heading = hero.querySelector('h1');
    if (!heading) return;
    heading.classList.add('vira-hero-heading');

    let kicker = heading.previousElementSibling;
    if (kicker && kicker.tagName !== 'CANVAS') kicker.classList.add('vira-hero-kicker');

    let copy = heading.nextElementSibling;
    while (copy && !['P', 'DIV'].includes(copy.tagName)) copy = copy.nextElementSibling;
    if (copy && copy.tagName === 'P') copy.classList.add('vira-hero-copy');
  }

  function wireMobileMenu(header) {
    if (!header) return;
    const button = header.querySelector('.vira-menu-toggle');
    const drawer = header.querySelector('#viraMobileDrawer');
    if (!button || !drawer) return;

    const setOpen = (open) => {
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    button.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
    drawer.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280) setOpen(false);
    }, { passive: true });
  }

  function init() {
    const body = document.body;
    if (!body) return;
    const activeKey = body.dataset.viraInternal;
    const config = PAGE_CONFIG[activeKey];
    if (!config) return;

    replaceElement(document.querySelector('[data-purpose="telemetry-bar"]'), telemetryMarkup(config));
    const header = replaceElement(document.querySelector('[data-purpose="primary-navigation"]'), headerMarkup(activeKey, config));
    normalizeHero();

    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      replaceElement(existingFooter, footerMarkup(activeKey));
    } else {
      document.body.insertAdjacentHTML('beforeend', footerMarkup(activeKey));
    }

    wireMobileMenu(header);
    document.documentElement.dataset.viraShellReady = 'true';
  }

  window.VIRAInternalPages = Object.freeze({ PAGE_CONFIG, NAV, init });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
