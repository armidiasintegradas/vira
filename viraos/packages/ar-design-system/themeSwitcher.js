/**
 * AR OS — Theme & Brand Switcher Engine
 * Controla dinamicamente a identidade visual das 5 marcas da AR Mídias Integradas
 */

const BRANDS = {
  vira: {
    id: 'vira',
    name: 'VIRA',
    tagline: 'Engenharia Circular & Infraestrutura Pesada',
    primaryColor: '#4A7135',
    focus: 'Pavimentação, guias e artefatos de compósito para licitações e infraestrutura pública.'
  },
  verdis: {
    id: 'verdis',
    name: 'Verdis',
    tagline: 'Restauração Ecológica & Ativos Ambientais',
    primaryColor: '#2D5A27',
    focus: 'Soluções Baseadas na Natureza (NbS), recomposição de bacias e viveiros de mudas nativas.'
  },
  replasticando: {
    id: 'replasticando',
    name: 'Replasticando',
    tagline: 'Rastreabilidade de Resíduos & Cadeia de Custódia',
    primaryColor: '#1A535C',
    focus: 'Homologação de cooperativas, PGRS corporativo e rastreabilidade ponta a ponta de fardos.'
  },
  reciclobike: {
    id: 'reciclobike',
    name: 'RecicloBike',
    tagline: 'Micrologística Urbana & Mobilidade Ativa',
    primaryColor: '#D97706',
    focus: 'Logística reversa cicloviária, rotas de coleta de baixo carbono e inclusão socioprodutiva.'
  },
  muta: {
    id: 'muta',
    name: 'MUTA',
    tagline: 'Mobiliário Urbano & Placemaking Circular',
    primaryColor: '#B91C1C',
    focus: 'Equipamentos e mobiliário para praças públicas, parques e orlas com design paramétrico.'
  }
};

class ThemeSwitcher {
  constructor(defaultBrand = 'vira') {
    this.currentBrand = defaultBrand;
    this.listeners = [];
  }

  init() {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('ar_os_active_brand');
    if (saved && BRANDS[saved]) {
      this.setTheme(saved, false);
    } else {
      this.setTheme(this.currentBrand, false);
    }
  }

  setTheme(brandId, notify = true) {
    if (!BRANDS[brandId]) return false;
    this.currentBrand = brandId;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', brandId);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ar_os_active_brand', brandId);
    }
    if (notify) {
      this.listeners.forEach(fn => fn(BRANDS[brandId]));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ar-theme-changed', { detail: BRANDS[brandId] }));
      }
    }
    return true;
  }

  getActiveBrand() {
    return BRANDS[this.currentBrand] || BRANDS.vira;
  }

  getAvailableBrands() {
    return Object.values(BRANDS);
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }
}

const arThemeSwitcher = new ThemeSwitcher();

if (typeof window !== 'undefined') {
  window.BRANDS = BRANDS;
  window.arThemeSwitcher = arThemeSwitcher;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BRANDS, ThemeSwitcher, arThemeSwitcher };
}
