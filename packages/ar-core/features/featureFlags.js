/**
 * AR OS — Feature Flags Engine
 * Holding: AR Mídias Integradas
 * 
 * Permite que cada aplicação ou tenant ative/desative recursos dinamicamente,
 * sem necessidade de branching de código ou alterações no núcleo da plataforma.
 */

const FEATURE_MATURITY = {
  EXPERIMENTAL: 'experimental',
  BETA: 'beta',
  GA: 'ga'
};

const DEFAULT_FEATURE_DEFINITIONS = {
  academy: {
    name: 'VIRA Academy & Capacitação',
    description: 'Trilhas de formação técnica e emissão de certificados com checksum.',
    defaultState: false,
    maturity: FEATURE_MATURITY.GA
  },
  analytics: {
    name: 'Métricas ACV & Carbono',
    description: 'Contabilização de plástico reciclado e mitigação de pegada de carbono (ISO 14044).',
    defaultState: true,
    maturity: FEATURE_MATURITY.GA
  },
  copilot: {
    name: 'Copiloto de Engenharia (IA)',
    description: 'Assistente técnico com RAG estrito em normas ABNT e pareceres IPT.',
    defaultState: false,
    maturity: FEATURE_MATURITY.BETA
  },
  telemetry: {
    name: 'Telemetria & SLAs Operacionais',
    description: 'Rastreamento de tempos de especificação e taxas de conversão de editais.',
    defaultState: true,
    maturity: FEATURE_MATURITY.GA
  },
  dpp: {
    name: 'Passaporte Digital de Produto',
    description: 'Cadeia de custódia e validação de lotes industriais via QR Code.',
    defaultState: false,
    maturity: FEATURE_MATURITY.GA
  },
  knowledge: {
    name: 'Knowledge Graph de Evidências',
    description: 'Navegação relacional em normas técnicas, laudos e leis federais.',
    defaultState: true,
    maturity: FEATURE_MATURITY.GA
  },
  compliance: {
    name: 'Motor de Conformidade ABNT',
    description: 'Auditoria de ensaios de compressão axial frente à NBR 9781 e Lei 14.133.',
    defaultState: true,
    maturity: FEATURE_MATURITY.GA
  },
  bim_export: {
    name: 'Exportação BIM IFC 4.0',
    description: 'Geração estruturada de famílias paramétricas IFC e Revit.',
    defaultState: false,
    maturity: FEATURE_MATURITY.BETA
  },
  collaboration: {
    name: 'Colaboração Concorrente',
    description: 'Sessões de presença em tempo real, anotações de prancha e travas de revisão.',
    defaultState: false,
    maturity: FEATURE_MATURITY.BETA
  },
  white_label: {
    name: 'Multi-Tenant White-Label',
    description: 'Customização de marcas e domínios corporativos para órgãos públicos e empreiteiras.',
    defaultState: false,
    maturity: FEATURE_MATURITY.EXPERIMENTAL
  }
};

// Matriz canônica de habilitação por marca corporativa da holding
const BRAND_DEFAULTS = {
  vira: {
    academy: true,
    analytics: true,
    copilot: true,
    telemetry: true,
    dpp: true,
    knowledge: true,
    compliance: true,
    bim_export: true,
    collaboration: true,
    white_label: true
  },
  verdis: {
    academy: true,
    analytics: true,
    copilot: true,
    telemetry: true,
    dpp: true,
    knowledge: true,
    compliance: true,
    bim_export: true,
    collaboration: true,
    white_label: true
  },
  replasticando: {
    academy: false,
    analytics: true,
    copilot: false,
    telemetry: true,
    dpp: true,
    knowledge: false,
    compliance: false,
    bim_export: false,
    collaboration: false,
    white_label: false
  },
  reciclobike: {
    academy: false,
    analytics: true,
    copilot: false,
    telemetry: true,
    dpp: false,
    knowledge: false,
    compliance: false,
    bim_export: false,
    collaboration: false,
    white_label: false
  },
  muta: {
    academy: false,
    analytics: true,
    copilot: true,
    telemetry: true,
    dpp: true,
    knowledge: true,
    compliance: false,
    bim_export: false,
    collaboration: false,
    white_label: false
  }
};

class FeatureFlagService {
  constructor() {
    this.definitions = new Map(Object.entries(DEFAULT_FEATURE_DEFINITIONS));
    this.brandOverrides = new Map(Object.entries(BRAND_DEFAULTS));
    this.tenantOverrides = new Map();
  }

  /**
   * Avalia se uma feature está habilitada para o contexto fornecido
   * Precedência: Tenant Override > Brand Override > Default State
   * @param {string} featureKey
   * @param {Object} [context] { brand: 'vira', tenant: 'default', userRole: 'engenheiro' }
   */
  isEnabled(featureKey, context = {}) {
    const key = (featureKey || '').toLowerCase();
    const brand = (context.brand || 'vira').toLowerCase();
    const tenant = (context.tenant || 'default').toLowerCase();

    // 1. Tenant Override
    if (this.tenantOverrides.has(tenant)) {
      const tMap = this.tenantOverrides.get(tenant);
      if (tMap && typeof tMap[key] === 'boolean') {
        return tMap[key];
      }
    }

    // 2. Brand Override
    if (this.brandOverrides.has(brand)) {
      const bMap = this.brandOverrides.get(brand);
      if (bMap && typeof bMap[key] === 'boolean') {
        return bMap[key];
      }
    }

    // 3. Default State
    if (this.definitions.has(key)) {
      return this.definitions.get(key).defaultState;
    }

    return false;
  }

  /**
   * Retorna um mapa completo de todas as features e seu estado ativo/inativo para o contexto
   * @param {Object} context
   */
  getAllFlags(context = {}) {
    const result = {};
    for (const key of this.definitions.keys()) {
      result[key] = this.isEnabled(key, context);
    }
    return result;
  }

  /**
   * Configura override para uma marca específica
   * @param {string} brand
   * @param {string} featureKey
   * @param {boolean} value
   */
  setBrandOverride(brand, featureKey, value) {
    const b = (brand || '').toLowerCase();
    const k = (featureKey || '').toLowerCase();
    if (!this.brandOverrides.has(b)) {
      this.brandOverrides.set(b, {});
    }
    this.brandOverrides.get(b)[k] = Boolean(value);
  }

  /**
   * Configura override para um tenant corporativo específico
   * @param {string} tenant
   * @param {string} featureKey
   * @param {boolean} value
   */
  setTenantOverride(tenant, featureKey, value) {
    const t = (tenant || '').toLowerCase();
    const k = (featureKey || '').toLowerCase();
    if (!this.tenantOverrides.has(t)) {
      this.tenantOverrides.set(t, {});
    }
    this.tenantOverrides.get(t)[k] = Boolean(value);
  }

  /**
   * Registra uma nova flag de funcionalidade no catálogo global
   * @param {string} key
   * @param {Object} definition
   */
  registerFeature(key, definition = {}) {
    const k = (key || '').toLowerCase();
    this.definitions.set(k, {
      name: definition.name || k,
      description: definition.description || '',
      defaultState: Boolean(definition.defaultState),
      maturity: definition.maturity || FEATURE_MATURITY.EXPERIMENTAL
    });
  }

  /**
   * Recupera o estágio de maturidade de uma funcionalidade (Experimental -> Beta -> GA)
   * @param {string} featureKey
   * @returns {string} 'experimental' | 'beta' | 'ga'
   */
  getMaturity(featureKey) {
    const k = (featureKey || '').toLowerCase();
    if (this.definitions.has(k)) {
      return this.definitions.get(k).maturity || FEATURE_MATURITY.EXPERIMENTAL;
    }
    return FEATURE_MATURITY.EXPERIMENTAL;
  }

  /**
   * Valida se a funcionalidade atende ao nível de maturidade exigido pelo ambiente
   * @param {string} featureKey
   * @param {string} environment ('production', 'staging', 'development')
   */
  isAllowedInEnvironment(featureKey, environment = 'production') {
    const maturity = this.getMaturity(featureKey);
    const env = environment.toLowerCase();

    if (env === 'production') {
      return maturity === FEATURE_MATURITY.GA;
    }
    if (env === 'staging') {
      return maturity === FEATURE_MATURITY.GA || maturity === FEATURE_MATURITY.BETA;
    }
    return true; // development aceita experimental, beta e ga
  }
}

const arFeatureFlags = new FeatureFlagService();

module.exports = {
  FeatureFlagService,
  arFeatureFlags,
  DEFAULT_FEATURE_DEFINITIONS,
  BRAND_DEFAULTS,
  FEATURE_MATURITY
};
