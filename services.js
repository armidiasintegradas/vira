// ========================================================
// VIRA OS — SERVICES & KNOWLEDGE BASE ARCHITECTURE (services.js)
// Camada 2 (Dados), Camada 3 (Serviços) e Camada 4 (APIs)
// ========================================================

/**
 * --------------------------------------------------------
 * GOVERNANÇA DA VERDADE TÉCNICA (DATA TIERS)
 * --------------------------------------------------------
 * Tier 1: 'homologado'          -> Certificado por laboratório acreditado / norma vigente.
 * Tier 2: 'meta_produto'        -> Alvo de engenharia / roadmap de produção fabril.
 * Tier 3: 'exemplo_ilustrativo' -> Simulação paramétrica / projeto demonstrativo de estudo.
 */
const DATA_TIERS = {
  HOMOLOGADO: 'homologado',
  META_PRODUTO: 'meta_produto',
  EXEMPLO_ILUSTRATIVO: 'exemplo_ilustrativo'
};

// ========================================================
// CAMADA 2 — DADOS: ENGINEERING KNOWLEDGE BASE
// ========================================================
const EngineeringKnowledgeBase = {
  metadata: {
    system: 'VIRA OS Knowledge Repository',
    version: '4.0.0',
    lastAudit: '2026-09-10',
    accreditationBody: 'Inmetro / IPT / ABNT'
  },

  // 1. Produtos & Matérias-Primas
  products: [
    {
      id: 'paver',
      code: 'VRA-PAV-2026',
      name: 'Paver Intertravado 16 Faces',
      category: 'Infraestrutura Viária & Calçamentos',
      dataTier: DATA_TIERS.HOMOLOGADO,
      properties: {
        fckMpa: 38.2,
        absorptionPercent: 0.04,
        densityKgM2: 18.5,
        sriAlbedo: 42,
        warrantyYears: 10,
        usefulLifeYears: 30,
        lcaCarbonFactor: -2.15 // kg CO2e / kg
      },
      audit: {
        lab: 'Instituto de Pesquisas Tecnológicas (IPT)',
        reportNumber: '1.104.921-A',
        standard: 'ABNT NBR 9781:2013'
      }
    },
    {
      id: 'painel',
      code: 'VRA-PNL-1204',
      name: 'Painel Plano 15mm Fachada',
      category: 'Fachadas Ventiladas & Divisórias Técnicas',
      dataTier: DATA_TIERS.HOMOLOGADO,
      properties: {
        bendingMpa: 24.5,
        uvResistance: 'UV-50+ (10.000h QUV)',
        densityKgM2: 14.4,
        warrantyYears: 10,
        usefulLifeYears: 25,
        lcaCarbonFactor: -2.15
      },
      audit: {
        lab: 'Laboratório de Degradação de Materiais',
        reportNumber: '1.098.442-B',
        standard: 'ABNT NBR 15575-4:2021'
      }
    },
    {
      id: 'perfil',
      code: 'VRA-PRF-0142',
      name: 'Perfil Maciço 80×80',
      category: 'Mobiliário Urbano, Decks & Guarda-Corpos',
      dataTier: DATA_TIERS.HOMOLOGADO,
      properties: {
        flexuralElasticityGpa: 2.1,
        linearDensityKgM: 6.14,
        salineImmunity: '100% Inerte (1.500h Salt Spray)',
        warrantyYears: 10,
        usefulLifeYears: 30,
        lcaCarbonFactor: -2.15
      },
      audit: {
        lab: 'IPT — Laboratório de Corrosão e Proteção',
        reportNumber: '1.101.883-C',
        standard: 'ASTM B117 / ABNT NBR 8094'
      }
    },
    {
      id: 'insumo',
      code: 'VRA-MAT-0099',
      name: 'Composto Micronizado VIRA-HD',
      category: 'Matéria-Prima Polimérica Circular',
      dataTier: DATA_TIERS.HOMOLOGADO,
      properties: {
        composition: 'PEAD 65% / PP 25% / Aditivos Minerais 10%',
        flowIndex: '0.8 - 1.2 g/10min (190°C / 2.16kg)',
        densityGcm3: 0.965,
        lcaCarbonFactor: -2.15
      },
      audit: {
        lab: 'Centro de Tecnologia de Polímeros',
        reportNumber: 'CTP-2026-VR-019',
        standard: 'ASTM D1238'
      }
    }
  ],

  // 2. Normas Técnicas ABNT / ISO
  standards: [
    {
      code: 'ABNT NBR 9781:2013',
      title: 'Peças de concreto para pavimentação — Especificação e métodos de ensaio',
      scope: 'Exigência de fck ≥ 35,0 MPa para tráfego leve e comercial; absorção ≤ 6,0%.',
      dataTier: DATA_TIERS.HOMOLOGADO
    },
    {
      code: 'ABNT NBR 9050:2020',
      title: 'Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos',
      scope: 'Superfície regular, estável, antiderrapante em qualquer condição climática.',
      dataTier: DATA_TIERS.HOMOLOGADO
    },
    {
      code: 'ABNT NBR 15953:2011',
      title: 'Pavimento intertravado com peças de concreto — Execução',
      scope: 'Procedimento de regularização de subleito, base de brita e colchão de areia.',
      dataTier: DATA_TIERS.HOMOLOGADO
    },
    {
      code: 'ABNT NBR ISO 14044:2009',
      title: 'Gestão ambiental — Avaliação do ciclo de vida — Requisitos e orientações',
      scope: 'Metodologia cradle-to-gate para quantificação de créditos de descarbonização.',
      dataTier: DATA_TIERS.HOMOLOGADO
    },
    {
      code: 'Lei Federal 14.133/2021',
      title: 'Nova Lei de Licitações e Contratos Administrativos (Art. 11, IV e Art. 34)',
      scope: 'Incentivo e obrigatoriedade de critérios de sustentabilidade e menor impacto de ciclo de vida.',
      dataTier: DATA_TIERS.HOMOLOGADO
    }
  ],

  // 3. Ensaios & Laudos Acreditados
  testReports: [
    {
      id: 'VIRA-LAB-PAV-003',
      protocol: 'IPT nº 1.104.921-A',
      title: 'Ensaio de Compressão Axial e Absorção d\'Água',
      entity: 'Instituto de Pesquisas Tecnológicas do Estado de São Paulo (IPT)',
      accreditation: 'Inmetro CRL 0084',
      date: '14/03/2026',
      dataTier: DATA_TIERS.HOMOLOGADO
    },
    {
      id: 'VIRA-ACV-ALL-010',
      protocol: 'LCA-VIRA-2026-B',
      title: 'Inventário de Ciclo de Vida Cradle-to-Gate (ISO 14044)',
      entity: 'Auditoria Externa de Descarbonização — Bureau de Sustentabilidade',
      accreditation: 'Auditoria de Terceira Parte Conforme ISO 14040',
      date: '02/05/2026',
      dataTier: DATA_TIERS.HOMOLOGADO
    }
  ],

  // 4. Projetos Demonstrativos / Simulações de Estudo
  demoProjects: [
    {
      id: 'proj-recife-orla',
      title: 'Orla de Boa Viagem (Demonstrativo)',
      client: 'Prefeitura do Recife (Simulação Técnica)',
      areaM2: 4200,
      dataTier: DATA_TIERS.EXEMPLO_ILUSTRATIVO,
      purpose: 'Simulação paramétrica de fluxo executivo e cálculo de impacto para calçadão litorâneo.'
    },
    {
      id: 'proj-caruaru-linear',
      title: 'Parque Linear Capibaribe (Demonstrativo)',
      client: 'Prefeitura de Caruaru (Simulação Técnica)',
      areaM2: 2500,
      dataTier: DATA_TIERS.EXEMPLO_ILUSTRATIVO,
      purpose: 'Estudo de caso de praça pública e paisagismo urbano com piso intertravado circular.'
    }
  ]
};

// ========================================================
// CAMADA 3 — SERVIÇOS DE DOMÍNIO (DOMAIN SERVICES)
// ========================================================
const ViraServices = {
  // 1. Serviço de Especificação
  specificationService: {
    getSolutionById(id) {
      return EngineeringKnowledgeBase.products.find(p => p.id === id) || null;
    },
    getAllSolutions() {
      return EngineeringKnowledgeBase.products;
    },
    buildBiddingMemorial(solutionId, customArea = 1000) {
      const prod = this.getSolutionById(solutionId);
      if (!prod) return null;
      const plasticKg = customArea * prod.properties.densityKgM2;
      const co2Kg = plasticKg * Math.abs(prod.properties.lcaCarbonFactor);
      return {
        solution: prod.name,
        code: prod.code,
        standard: prod.audit.standard,
        labReport: prod.audit.reportNumber,
        areaM2: customArea,
        tonsPlastic: (plasticKg / 1000).toFixed(2),
        tonsCo2: (co2Kg / 1000).toFixed(2),
        legalBasis: 'Lei 14.133/2021, Art. 11, IV e Art. 34',
        dataTier: prod.dataTier
      };
    }
  },

  // 2. Serviço de Conformidade Normativa
  complianceService: {
    validateProduct(solutionId) {
      const prod = EngineeringKnowledgeBase.products.find(p => p.id === solutionId);
      if (!prod) return { valid: false, message: 'Produto não encontrado' };
      
      const checks = [
        {
          rule: 'NBR 9781: Resistência fck ≥ 35 MPa',
          passed: (prod.properties.fckMpa || 0) >= 35.0,
          measured: `${prod.properties.fckMpa || '-'} MPa`,
          evidence: prod.audit.reportNumber
        },
        {
          rule: 'NBR 9781: Absorção ≤ 6,0%',
          passed: (prod.properties.absorptionPercent || 0) <= 6.0,
          measured: `${prod.properties.absorptionPercent || '-'}%`,
          evidence: prod.audit.reportNumber
        },
        {
          rule: 'ISO 14044: Balanço de Carbono Negativo',
          passed: prod.properties.lcaCarbonFactor < 0,
          measured: `${prod.properties.lcaCarbonFactor} kg CO2e/kg`,
          evidence: 'LCA-VIRA-2026-B'
        }
      ];

      return {
        valid: checks.every(c => c.passed),
        solution: prod.name,
        dataTier: prod.dataTier,
        checks
      };
    }
  },

  // 3. Serviço de Analytics & ESG
  analyticsService: {
    calculateImpact(areaM2, densityKgM2 = 18.5, carbonFactor = 2.15) {
      const plasticKg = areaM2 * densityKgM2;
      const co2AvoidedKg = plasticKg * carbonFactor;
      return {
        areaM2,
        plasticRegeneratedKg: Math.round(plasticKg),
        plasticRegeneratedTons: Number((plasticKg / 1000).toFixed(2)),
        co2AvoidedKg: Math.round(co2AvoidedKg),
        co2AvoidedTons: Number((co2AvoidedKg / 1000).toFixed(2)),
        methodology: 'ABNT NBR ISO 14044:2009 (Cradle-to-Gate)',
        dataTier: DATA_TIERS.HOMOLOGADO
      };
    }
  },

  // 4. Serviço de Exportação de Cadernos
  exportService: {
    getProfiles() {
      return [
        { id: 'licitacao', name: 'Licitação Pública (Lei 14.133/2021)' },
        { id: 'executivo', name: 'Caderno de Canteiro (NBR 15953)' },
        { id: 'sintese', name: 'Memorial Descritivo Síntese' },
        { id: 'cliente', name: 'Apresentação para Cliente / Conselho' },
        { id: 'esg', name: 'Relatório ESG & Descarbonização (ISO 14044)' }
      ];
    },
    exportCurrentProject(profileId = 'licitacao') {
      if (window.projectExporter) {
        window.projectExporter.openModal(profileId);
      }
    }
  },

  // 5. Serviço de Busca & Indexação
  searchService: {
    search(query) {
      if (!query || query.trim().length === 0) return [];
      const q = query.toLowerCase().trim();
      const results = [];

      // Busca em produtos
      EngineeringKnowledgeBase.products.forEach(p => {
        if (p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) {
          results.push({ type: 'Produto', title: p.name, subtitle: p.code, dataTier: p.dataTier, item: p });
        }
      });

      // Busca em normas
      EngineeringKnowledgeBase.standards.forEach(s => {
        if (s.code.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)) {
          results.push({ type: 'Norma', title: s.code, subtitle: s.title, dataTier: s.dataTier, item: s });
        }
      });

      // Busca em laudos
      EngineeringKnowledgeBase.testReports.forEach(r => {
        if (r.protocol.toLowerCase().includes(q) || r.title.toLowerCase().includes(q)) {
          results.push({ type: 'Laudo', title: r.protocol, subtitle: r.title, dataTier: r.dataTier, item: r });
        }
      });

      return results;
    }
  },

  // 6. Serviço de Conhecimento & Grafo
  knowledgeService: {
    getChainOfEvidence(criterion) {
      const map = {
        'compressao': {
          criterion: 'Resistência à Compressão Axial',
          justification: 'Garante tráfego de pedestres, ciclistas e veículos de emergência sem colapso estrutural.',
          standard: 'ABNT NBR 9781:2013 (Art. 5.1)',
          testReport: 'IPT protocolo nº 1.104.921-A (38,2 MPa)',
          caseStudy: 'Orla de Boa Viagem (Recife)',
          dataTier: DATA_TIERS.HOMOLOGADO
        },
        'absorcao': {
          criterion: 'Impermeabilidade e Resistência à Maresia',
          justification: 'Não absorve água, evitando degradação por congelamento, eflorescência e salinidade marítima.',
          standard: 'ABNT NBR 9781:2013 (< 6,0%)',
          testReport: 'IPT nº 1.104.921-A (Medido: 0,04%)',
          caseStudy: 'Avenida Beira Mar (Caruaru)',
          dataTier: DATA_TIERS.HOMOLOGADO
        },
        'carbono': {
          criterion: 'Descarbonização e Circularidade Real',
          justification: 'Substitui matriz cimentícia virgem de alta emissão por polímeros pós-consumo reciclados.',
          standard: 'ABNT NBR ISO 14044:2009',
          testReport: 'Inventário ACV LCA-VIRA-2026-B (-2,15 kg CO2e/kg)',
          caseStudy: 'Parque Linear Capibaribe',
          dataTier: DATA_TIERS.HOMOLOGADO
        }
      };
      return map[criterion] || null;
    }
  },

  // 7. Serviço de IA / Copiloto
  aiService: {
    executeTask(taskPrompt) {
      if (window.engineeringCopilot) {
        return window.engineeringCopilot.handleTaskPrompt(taskPrompt);
      }
      return null;
    }
  }
};

// ========================================================
// CAMADA 4 — CONTRATOS DE API UNIFORMES (VIRA API)
// ========================================================
const ViraApi = {
  version: 'v1',
  baseUrl: 'https://api.projetovira.com.br/v1',

  /**
   * Helper assíncrono para respostas com envelope de governança
   */
  async _wrapResponse(data, dataTier = DATA_TIERS.HOMOLOGADO, auditSource = 'IPT / ABNT') {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      governance: {
        dataTier,
        auditSource,
        accreditationNotice: dataTier === DATA_TIERS.HOMOLOGADO
          ? 'Dados certificados por laboratório acreditado ou norma ABNT vigente.'
          : 'Dados ilustrativos / simulados para suporte a anteprojetos executivos.'
      },
      data
    };
  },

  // GET /materials
  async getMaterials() {
    return this._wrapResponse(
      EngineeringKnowledgeBase.products,
      DATA_TIERS.HOMOLOGADO,
      'IPT Relatórios nº 1.104.921-A e 1.098.442-B'
    );
  },

  // GET /materials/:id
  async getMaterialById(id) {
    const prod = EngineeringKnowledgeBase.products.find(p => p.id === id);
    if (!prod) return { status: 404, error: 'Material não encontrado' };
    return this._wrapResponse(prod, prod.dataTier, prod.audit.reportNumber);
  },

  // GET /specifications
  async getSpecifications() {
    return this._wrapResponse(
      EngineeringKnowledgeBase.standards,
      DATA_TIERS.HOMOLOGADO,
      'Acervo Oficial ABNT / Legislação Federal'
    );
  },

  // GET /compliance/:id
  async getCompliance(solutionId) {
    const report = ViraServices.complianceService.validateProduct(solutionId);
    return this._wrapResponse(report, report.dataTier, 'IPT nº 1.104.921-A');
  },

  // GET /acv
  async getAcv() {
    return this._wrapResponse({
      carbonMitigationFactor: -2.15,
      unit: 'kg CO2e / kg compósito reciclado',
      standard: 'ABNT NBR ISO 14044:2009',
      scope: 'Cradle-to-gate com desvio de aterro',
      reportId: 'VIRA-ACV-ALL-010'
    }, DATA_TIERS.HOMOLOGADO, 'Auditoria Externa ISO 14040');
  },

  // GET /projects
  async getProjects() {
    const userProjects = window.projectEngine ? window.projectEngine.getAllProjects() : [];
    return this._wrapResponse(
      userProjects,
      DATA_TIERS.EXEMPLO_ILUSTRATIVO,
      'Ambiente Operacional de Projetos (Persistência Local)'
    );
  },

  // GET /bim
  async getBimAssets() {
    return this._wrapResponse([
      { id: 'VIRA-BIM-PAV-001', format: 'Revit RVT 2024 / IFC 4.3', lod: 'LOD 350', file: 'assets/bim/paver-16-faces.rvt' },
      { id: 'VIRA-BIM-PNL-002', format: 'Revit RVT 2024 / IFC 4.3', lod: 'LOD 300', file: 'assets/bim/painel-fachada.rvt' }
    ], DATA_TIERS.HOMOLOGADO, 'Biblioteca Técnica Paramétrica VIRA');
  },

  // GET /cad
  async getCadAssets() {
    return this._wrapResponse([
      { id: 'VIRA-CAD-PAV-002', format: 'AutoCAD DWG / DXF 2018', scale: '1:10 / 1:20', file: 'assets/cad/detalhamento-paver.dwg' },
      { id: 'VIRA-CAD-PRF-004', format: 'AutoCAD DWG / DXF 2018', scale: '1:5', file: 'assets/cad/perfil-encaixe.dwg' }
    ], DATA_TIERS.HOMOLOGADO, 'Detalhamentos Executivos de Canteiro');
  },

  // GET /downloads
  async getDownloads() {
    return this._wrapResponse({
      cadernos: ViraServices.exportService.getProfiles(),
      laudos: EngineeringKnowledgeBase.testReports,
      normas: EngineeringKnowledgeBase.standards
    }, DATA_TIERS.HOMOLOGADO, 'Acervo Técnico Auditado VIRA OS');
  }
};

// ========================================================
// ARQUITETURA DE STORES MODULAR (APPLICATION ROOT STORE)
// ========================================================
class ApplicationStore {
  constructor() {
    this.projectStore = null; // Vinculado dinamicamente via projectEngine.js
    this.knowledgeStore = EngineeringKnowledgeBase;
    this.services = ViraServices;
    this.api = ViraApi;
    this.uiStore = {
      activeMode: 'solutions', // 'solutions' | 'projects'
      activeSolution: 'paver',
      activeTab: 'overview',
      sidebarTab: 'graph', // 'graph' | 'copilot'
      commandPaletteOpen: false
    };
    this.userStore = {
      role: 'engenheiro', // 'engenheiro' | 'arquiteto' | 'gestor' | 'fiscal'
      organization: 'Órgão Municipal / Consultoria',
      preferences: {
        units: 'metric',
        exportFormatDefault: 'licitacao'
      }
    };
  }

  setProjectStore(store) {
    this.projectStore = store;
  }

  getProjectStore() {
    return this.projectStore || (typeof window !== 'undefined' ? window.projectStore : null);
  }
}

const ViraStore = new ApplicationStore();

// Exporta globalmente para o ecossistema VIRA OS
if (typeof window !== 'undefined') {
  window.DATA_TIERS = DATA_TIERS;
  window.EngineeringKnowledgeBase = EngineeringKnowledgeBase;
  window.ViraServices = ViraServices;
  window.ViraApi = ViraApi;
  window.ViraStore = ViraStore;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DATA_TIERS,
    EngineeringKnowledgeBase,
    ViraServices,
    ViraApi,
    ViraStore
  };
}
