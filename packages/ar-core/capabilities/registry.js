/**
 * AR OS — Capability Registry
 * Holding: AR Mídias Integradas
 * 
 * Camada de abstração que formaliza as capacidades fornecidas pela plataforma,
 * desacoplando a entrega de valor de aplicações específicas:
 * 
 * Capability -> Domain -> Service -> Applications
 */

class CapabilityRegistry {
  constructor() {
    this.capabilities = new Map();
    this.initDefaultCapabilities();
  }

  /**
   * Inicializa as capacidades canônicas do AR OS 1.0
   */
  initDefaultCapabilities() {
    const defaults = [
      {
        id: 'auth_identity',
        name: 'Autenticação & Controle de Acesso',
        category: 'Foundation',
        domain: 'IdentityDomain',
        service: 'identityService',
        description: 'Gestão de identidades técnicas, validação de registros de classe (CREA/CAU) e multi-tenancy.',
        supportedBrands: ['vira', 'verdis', 'replasticando', 'reciclobike', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'structural_engineering',
        name: 'Cálculo Mecânico & Dimensionamento de Pavimentos',
        category: 'Core Engineering',
        domain: 'EngineeringDomain',
        service: 'engineeringService',
        description: 'Dimensionamento estratigráfico, módulo de resiliência e cálculo de subleito.',
        supportedBrands: ['vira', 'verdis'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'parametric_projects',
        name: 'Workspace de Projetos & Quantitativos Auditados',
        category: 'Core Engineering',
        domain: 'ProjectsDomain',
        service: 'projectService',
        description: 'Gestão de intervenções, quantitativos de área/volume, memória de cálculo e exportação.',
        supportedBrands: ['vira', 'verdis', 'replasticando', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'regulatory_compliance',
        name: 'Auditoria Normativa & Conformidade Pública',
        category: 'Governance & Compliance',
        domain: 'ComplianceDomain',
        service: 'complianceService',
        description: 'Validação frente a normas ABNT (NBR 9781, NBR 9050) e enquadramento na Lei 14.133/2021.',
        supportedBrands: ['vira', 'verdis'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'knowledge_graph',
        name: 'Grafo Relacional de Evidências Técnicas',
        category: 'Governance & Compliance',
        domain: 'KnowledgeDomain',
        service: 'knowledgeService',
        description: 'Conexão entre laudos laboratoriais acreditados, legislações, teses de doutorado e modelos BIM.',
        supportedBrands: ['vira', 'verdis', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'digital_product_passport',
        name: 'Passaporte Digital de Produto (DPP)',
        category: 'Governance & Compliance',
        domain: 'GovernanceDomain',
        service: 'governanceService',
        description: 'Cadeia de custódia ininterrupta de lotes industriais, ARTs e verificação via QR Code.',
        supportedBrands: ['vira', 'verdis', 'replasticando', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'carbon_lca_analytics',
        name: 'Contabilidade Ambiental & ACV ISO 14044',
        category: 'Sustainability',
        domain: 'AnalyticsDomain',
        service: 'analyticsService',
        description: 'Cálculo de plástico reciclado desviado de aterros e mitigação de pegada de carbono (CO2e).',
        supportedBrands: ['vira', 'verdis', 'replasticando', 'reciclobike', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'technical_academy',
        name: 'Capacitação Técnica & Certificação de Parceiros',
        category: 'Education & Training',
        domain: 'AcademyDomain',
        service: 'academyService',
        description: 'Trilhas especializadas para Engenheiros, Arquitetos, Gestores e Fiscais com emissão de certificados.',
        supportedBrands: ['vira', 'verdis', 'replasticando'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'realtime_collaboration',
        name: 'Colaboração Multiusuário & Revisão Concorrente',
        category: 'Collaboration',
        domain: 'CollaborationDomain',
        service: 'collaborationService',
        description: 'Sessões de presença em tempo real, anotações técnicas em pranchas e travas de revisão.',
        supportedBrands: ['vira', 'verdis'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'bim_governmental_integrations',
        name: 'Integrações BIM (IFC4) & Governo Eletrônico (SEI)',
        category: 'Integration',
        domain: 'IntegrationsDomain',
        service: 'integrationsService',
        description: 'Exportação paramétrica de esquemas IFC 4.0 e conectores de processo com o SEI e ERPs.',
        supportedBrands: ['vira', 'verdis'],
        maturity: 'GA',
        version: '1.0.0'
      },
      {
        id: 'circular_materials_catalog',
        name: 'Catálogo Unificado de Compósitos Circulares',
        category: 'Core Engineering',
        domain: 'MaterialsDomain',
        service: 'materialsService',
        description: 'Especificação técnica de matérias-primas e soluções pré-moldadas de alto desempenho.',
        supportedBrands: ['vira', 'verdis', 'replasticando', 'reciclobike', 'muta'],
        maturity: 'GA',
        version: '1.0.0'
      }
    ];

    defaults.forEach(cap => this.register(cap));
  }

  /**
   * Registra uma nova capacidade na plataforma
   * @param {Object} capability
   */
  register(capability) {
    if (!capability.id || !capability.name || !capability.domain) {
      throw new Error('Capacidade inválida: id, name e domain são obrigatórios.');
    }
    this.capabilities.set(capability.id, {
      ...capability,
      registeredAt: capability.registeredAt || new Date().toISOString()
    });
    return this.capabilities.get(capability.id);
  }

  /**
   * Recupera uma capacidade pelo ID
   * @param {string} id
   */
  get(id) {
    return this.capabilities.get(id) || null;
  }

  /**
   * Lista todas as capacidades com suporte a filtros
   * @param {Object} [filter]
   */
  list(filter = {}) {
    let list = Array.from(this.capabilities.values());

    if (filter.category) {
      list = list.filter(c => c.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.domain) {
      list = list.filter(c => c.domain.toLowerCase() === filter.domain.toLowerCase());
    }
    if (filter.brand) {
      list = list.filter(c => c.supportedBrands.includes(filter.brand.toLowerCase()));
    }
    if (filter.maturity) {
      list = list.filter(c => c.maturity.toLowerCase() === filter.maturity.toLowerCase());
    }

    return list;
  }

  /**
   * Recupera todas as capacidades suportadas por uma aplicação / marca específica
   * @param {string} brandId ('vira', 'verdis', 'replasticando', 'reciclobike', 'muta')
   */
  getForBrand(brandId) {
    const target = (brandId || '').toLowerCase();
    return this.list({ brand: target });
  }

  /**
   * Valida se uma aplicação tem suporte a uma determinada capacidade
   * @param {string} brandId
   * @param {string} capabilityId
   */
  supports(brandId, capabilityId) {
    const cap = this.get(capabilityId);
    if (!cap) return false;
    return cap.supportedBrands.includes((brandId || '').toLowerCase());
  }
}

const arCapabilityRegistry = new CapabilityRegistry();

module.exports = { CapabilityRegistry, arCapabilityRegistry };
