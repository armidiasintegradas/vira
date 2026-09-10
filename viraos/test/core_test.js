// ========================================================
// VIRA OS — CORE AUTOMATED TEST SUITE (test/core_test.js)
// Validação de Dados Canônicos, Stores, Migração V3->V4, UUIDs e Cálculos
// ========================================================

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Mock simples de localStorage para execução em Node.js
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();

// Carrega os módulos a serem testados
const {
  ProjectStore,
  defaultDemoProjects,
  generateUuid,
  VIRA_STORAGE_KEY_V4,
  VIRA_STORAGE_KEY_V3,
  CURRENT_SCHEMA_VERSION
} = require('../projectEngine.js');

const {
  DATA_TIERS,
  EngineeringKnowledgeBase,
  ViraServices,
  ViraApi,
  ViraStore
} = require('../services.js');

let passedTests = 0;
let totalTests = 0;

const testSuites = [];
let currentSuite = null;

function describe(suiteName, fn) {
  currentSuite = { name: suiteName, tests: [] };
  testSuites.push(currentSuite);
  fn();
}

function it(description, fn) {
  if (currentSuite) {
    currentSuite.tests.push({ description, fn });
  }
}

// --------------------------------------------------------
// 1. INTEGRIDADE DOS DADOS CANÔNICOS (/data)
// --------------------------------------------------------
describe('1. Integridade dos Arquivos Canônicos (/data)', () => {
  it('data/projects.demo.json deve conter 2 projetos com UUID e dataTier exemplo_ilustrativo', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/projects.demo.json'), 'utf8');
    const projects = JSON.parse(raw);
    assert(Array.isArray(projects), 'Deve ser array');
    assert.strictEqual(projects.length, 2, 'Deve ter 2 projetos');
    projects.forEach(p => {
      assert(p.uuid, `Projeto ${p.id} deve ter uuid`);
      assert.strictEqual(p.dataTier, 'exemplo_ilustrativo', `Projeto ${p.id} deve ser exemplo_ilustrativo`);
    });
  });

  it('data/materials.json deve conter os 4 materiais oficiais com propriedades mecânicas e ACV', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/materials.json'), 'utf8');
    const materials = JSON.parse(raw);
    assert.strictEqual(materials.length, 4, 'Deve conter 4 materiais');
    const paver = materials.find(m => m.id === 'paver');
    assert(paver, 'Paver deve existir');
    assert.strictEqual(paver.properties.fckMpa, 38.2, 'fck do paver deve ser 38,2 MPa');
    assert.strictEqual(paver.properties.lcaCarbonFactor, -2.15, 'Fator ACV deve ser -2,15 kg CO2e/kg');
    assert.strictEqual(paver.audit.reportNumber, '1.104.921-A', 'Deve citar laudo IPT');
  });

  it('data/standards.json deve conter NBR 9781, NBR 9050 e ISO 14044', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/standards.json'), 'utf8');
    const standards = JSON.parse(raw);
    assert(standards.length >= 5, 'Deve ter no mínimo 5 normas');
    const nbr9781 = standards.find(s => s.code.includes('9781'));
    assert(nbr9781, 'NBR 9781 deve estar presente');
  });

  it('data/reports.json deve conter laudo IPT nº 1.104.921-A acreditado', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/reports.json'), 'utf8');
    const reports = JSON.parse(raw);
    const ipt = reports.find(r => r.protocol.includes('1.104.921-A'));
    assert(ipt, 'Laudo IPT deve existir');
    assert.strictEqual(ipt.measuredParameters.fckMpa, 38.2);
  });

  it('data/academy.json deve conter as 4 trilhas especializadas com 3 módulos e entregáveis', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/academy.json'), 'utf8');
    const tracks = JSON.parse(raw);
    assert.strictEqual(tracks.length, 4, 'Deve conter 4 trilhas');
    const roles = tracks.map(t => t.role);
    assert(roles.includes('engenheiro') && roles.includes('arquiteto') && roles.includes('gestor') && roles.includes('fiscal'));
    tracks.forEach(t => {
      assert.strictEqual(t.modules.length, 3, `Trilha ${t.role} deve ter 3 módulos`);
      assert(t.deliverables.length >= 3, `Trilha ${t.role} deve ter pelo menos 3 entregáveis`);
    });
  });
});

// --------------------------------------------------------
// 2. GERAÇÃO E UNICIDADE DE UUIDs CRIPTOGRÁFICOS
// --------------------------------------------------------
describe('2. Geração de UUIDs (RFC 4122 v4)', () => {
  it('Deve gerar strings no formato canônico xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    for (let i = 0; i < 50; i++) {
      const u = generateUuid();
      assert(uuidRegex.test(u), `UUID inválido: ${u}`);
    }
  });

  it('1.000 UUIDs gerados em sequência não devem ter nenhuma colisão', () => {
    const set = new Set();
    for (let i = 0; i < 1000; i++) {
      const u = generateUuid();
      assert(!set.has(u), `Colisão detectada para UUID: ${u}`);
      set.add(u);
    }
    assert.strictEqual(set.size, 1000);
  });
});

// --------------------------------------------------------
// 3. VERSIONAMENTO DE SCHEMA & MIGRAÇÃO (V3 -> V4)
// --------------------------------------------------------
describe('3. Versionamento de Schema e Migração Automática (V3 -> V4)', () => {
  it('Deve carregar projetos demonstrativos em ambiente virgem com schemaVersion 4', () => {
    localStorage.clear();
    const store = new ProjectStore();
    const projects = store.getProjects();
    assert.strictEqual(projects.length, 2);
    
    // Verifica se salvou no envelope V4
    const savedV4 = JSON.parse(localStorage.getItem(VIRA_STORAGE_KEY_V4));
    assert(savedV4, 'Envelope V4 deve ser gravado');
    assert.strictEqual(savedV4.schemaVersion, 4);
    assert(Array.isArray(savedV4.projects));
  });

  it('Deve detectar dados legados da V3 e migrar automaticamente preservando os dados e injetando UUIDs', () => {
    localStorage.clear();
    // Simula dado antigo no formato V3 (array plano sem UUID e sem schemaVersion)
    const legacyV3Projects = [
      {
        id: 'proj-obra-antiga',
        name: 'Revitalização Praça da Sé (Legado V3)',
        client: 'Prefeitura de São Paulo',
        responsible: 'Eng. Teste Legado',
        lawReference: 'Lei 8.666/1993',
        createdAt: '10/01/2025',
        status: 'Em Elaboração',
        notes: 'Projeto importado da versão anterior',
        items: [
          {
            solutionId: 'paver',
            name: 'Paver Intertravado',
            code: 'VRA-PAV-2026',
            quantityM2: 1200,
            densityKgM2: 18.5,
            lcaFactorCo2: 2.15,
            unitCostEstimate: 85.0
          }
        ]
      }
    ];
    localStorage.setItem(VIRA_STORAGE_KEY_V3, JSON.stringify(legacyV3Projects));

    // Instancia o store; deve migrar automaticamente
    const store = new ProjectStore();
    const projects = store.getProjects();

    assert.strictEqual(projects.length, 1);
    const migrated = projects[0];
    assert.strictEqual(migrated.id, 'proj-obra-antiga', 'Preserva id original');
    assert.strictEqual(migrated.name, 'Revitalização Praça da Sé (Legado V3)');
    assert(migrated.uuid, 'Deve gerar novo uuid');
    assert.strictEqual(migrated.schemaVersion, 4, 'Deve atualizar schemaVersion para 4');
    assert.strictEqual(migrated.dataTier, 'projeto_usuario', 'Deve categorizar dataTier');

    // Confirma que foi persistido sob a nova chave V4
    const savedV4 = JSON.parse(localStorage.getItem(VIRA_STORAGE_KEY_V4));
    assert(savedV4, 'Deve ter gravado na chave V4');
    assert.strictEqual(savedV4.schemaVersion, 4);
    assert.strictEqual(savedV4.projects.length, 1);
  });
});

// --------------------------------------------------------
// 4. OPERAÇÕES DE CRUD & CÁLCULO DE IMPACTO
// --------------------------------------------------------
describe('4. Operações de CRUD & Totalizadores Paramétricos', () => {
  it('Deve criar novo projeto com UUID e calcular totais auditados', () => {
    localStorage.clear();
    const store = new ProjectStore();

    const newProject = store.createProject({
      name: 'Ciclovia Metropolitana do Agreste',
      client: 'Consórcio Intermunicipal',
      responsible: 'Eng. Carlos Andrade (CREA 9988)',
      items: [
        {
          solutionId: 'paver',
          name: 'Paver 16 Faces',
          code: 'VRA-PAV-2026',
          quantityM2: 3000,
          densityKgM2: 18.5,
          lcaFactorCo2: 2.15,
          unitCostEstimate: 90.00
        },
        {
          solutionId: 'perfil',
          name: 'Perfil Maciço',
          code: 'VRA-PRF-0142',
          quantityM2: 200,
          densityKgM2: 6.14,
          lcaFactorCo2: 2.15,
          unitCostEstimate: 60.00
        }
      ]
    });

    assert(newProject.uuid, 'Projeto deve ter uuid');
    assert.strictEqual(newProject.schemaVersion, 4);
    assert.strictEqual(newProject.dataTier, 'projeto_usuario');

    // Valida cálculos matemáticos de impacto
    const totals = store.calculateProjectTotals(newProject);
    
    // Área = 3000 + 200 = 3200
    assert.strictEqual(totals.totalArea, 3200);

    // Plástico = (3000 * 18.5) + (200 * 6.14) = 55500 + 1228 = 56728 kg
    assert.strictEqual(totals.totalPlasticKg, 56728);

    // CO2e mitigado = 56728 * 2.15 = 121965.2 -> round 121965 kg
    assert.strictEqual(totals.totalCo2MitigatedKg, 121965);

    // Custo = (3000 * 90) + (200 * 60) = 270000 + 12000 = 282000
    assert.strictEqual(totals.totalCostEstimate, 282000);
  });

  it('Deve duplicar projeto gerando novo UUID e preservando integridade dos dados', () => {
    localStorage.clear();
    const store = new ProjectStore();
    const original = store.getActiveProject();
    const cloned = store.duplicateProject(original.id);

    assert(cloned, 'Clonagem deve ter sucesso');
    assert.notStrictEqual(cloned.uuid, original.uuid, 'UUID do clone deve ser único');
    assert.notStrictEqual(cloned.id, original.id, 'ID do clone deve ser único');
    assert(cloned.name.includes('(Cópia)'), 'Nome deve conter tag de cópia');
    assert.strictEqual(cloned.items.length, original.items.length);
  });
});

// --------------------------------------------------------
// 5. EXPORTAÇÃO MULTI-FORMATO (JSON / CSV / TEXTO)
// --------------------------------------------------------
describe('5. Exportação Multi-Formato', () => {
  it('Exportação CSV deve gerar linhas com separador ponto-e-vírgula e linha de total consolidado', () => {
    localStorage.clear();
    const store = new ProjectStore();
    const active = store.getActiveProject();
    const totals = store.calculateProjectTotals(active);

    // Mock de triggerDownload para inspecionar o conteúdo gerado
    let capturedBlobContent = null;
    let capturedFilename = null;

    global.Blob = class {
      constructor(parts) {
        capturedBlobContent = parts.join('');
      }
    };
    global.URL = {
      createObjectURL: () => 'blob:mock-url'
    };

    store._triggerDownload = (url, filename) => {
      capturedFilename = filename;
    };

    store.exportProjectCsv(active.id);

    assert(capturedFilename.endsWith('.csv'), 'Nome do arquivo deve ser .csv');
    assert(capturedBlobContent.startsWith('\uFEFF'), 'CSV deve ter UTF-8 BOM para Excel');
    assert(capturedBlobContent.includes('TOTAL CONSOLIDADO'), 'Deve conter linha de total');
    assert(capturedBlobContent.includes(String(totals.totalArea)), 'Deve conter a área total');
    assert(capturedBlobContent.includes(String(totals.totalPlasticKg)), 'Deve conter plástico total');
  });

  it('Exportação de Memorial TXT deve conter seções normativas ABNT e declaração de governança', () => {
    localStorage.clear();
    const store = new ProjectStore();
    const active = store.getActiveProject();

    let capturedText = null;
    let capturedFilename = null;

    global.Blob = class {
      constructor(parts) {
        capturedText = parts.join('');
      }
    };
    store._triggerDownload = (url, filename) => {
      capturedFilename = filename;
    };

    store.exportProjectText(active.id);

    assert(capturedFilename.endsWith('.txt'), 'Nome deve ser .txt');
    assert(capturedText.includes('VIRA OS — MEMORIAL TÉCNICO DESCRITIVO'), 'Deve ter cabeçalho institucional');
    assert(capturedText.includes('ABNT NBR 9781:2013'), 'Deve citar NBR 9781');
    assert(capturedText.includes('IPT Relatório nº 1.104.921-A'), 'Deve citar laudo IPT');
    assert(capturedText.includes('DECLARAÇÃO DE GOVERNANÇA E VALIDADE TÉCNICA'), 'Deve conter declaração de dados');
  });
});

// --------------------------------------------------------
// 6. INTEGRAÇÃO COM APPLICATION STORE & SERVIÇOS
// --------------------------------------------------------
describe('6. Arquitetura de Stores & Serviços de Domínio', () => {
  it('ViraStore deve registrar projectStore e expor serviços de conformidade e analytics', () => {
    const store = new ProjectStore();
    ViraStore.setProjectStore(store);

    assert.strictEqual(ViraStore.getProjectStore(), store);
    assert(ViraStore.knowledgeStore, 'KnowledgeStore deve existir');
    assert(ViraStore.services.complianceService, 'ComplianceService deve existir');

    // Validação de conformidade do paver
    const compliance = ViraServices.complianceService.validateProduct('paver');
    assert(compliance.valid, 'Paver deve ser 100% conforme');
    assert.strictEqual(compliance.checks.length, 3);
  });

  it('ViraApi.getMaterials() deve retornar envelope com metadados de governança', async () => {
    const res = await ViraApi.getMaterials();
    assert.strictEqual(res.status, 200);
    assert(res.governance, 'Deve conter envelope de governança');
    assert.strictEqual(res.governance.dataTier, DATA_TIERS.HOMOLOGADO);
    assert.strictEqual(res.data.length, 4);
  });
});

// --------------------------------------------------------
// 7. TRILHA DE AUDITORIA IMUTÁVEL (AUDIT TRAIL)
// --------------------------------------------------------
describe('7. Trilha de Auditoria Imutável (Audit Trail)', () => {
  it('Deve registrar eventos automaticamente para criação, adição de item e exportação com checksum', () => {
    localStorage.clear();
    const store = new ProjectStore();
    const proj = store.createProject({
      name: 'Auditoria Parque Capibaribe Teste',
      client: 'Prefeitura Teste',
      responsible: 'Eng. Auditor (CREA 0001)'
    });

    assert(Array.isArray(proj.auditTrail), 'Deve ter auditTrail array');
    assert(proj.auditTrail.length >= 1, 'Deve ter pelo menos 1 evento inicial');
    const createdEvent = proj.auditTrail.find(e => e.action === 'PROJECT_CREATED');
    assert(createdEvent, 'Deve registrar PROJECT_CREATED');
    assert.strictEqual(createdEvent.actor, 'Eng. Auditor (CREA 0001)');
    assert(createdEvent.checksum && createdEvent.checksum.length === 8, 'Deve ter checksum de 8 caracteres');

    // Adiciona item
    store.addItemToProject(proj.id, {
      solutionId: 'paver',
      name: 'Paver Intertravado',
      code: 'VRA-PAV-2026',
      quantityM2: 500
    });

    const itemEvent = proj.auditTrail.find(e => e.action === 'ITEM_ADDED');
    assert(itemEvent, 'Deve registrar ITEM_ADDED');
    assert(itemEvent.details.includes('500 m²'), 'Detalhes devem registrar metragem');

    // Exportação CSV
    store.exportProjectCsv(proj.id);
    const exportEvent = proj.auditTrail.find(e => e.action === 'EXPORT_CSV');
    assert(exportEvent, 'Deve registrar EXPORT_CSV na trilha');
  });
});

// --------------------------------------------------------
// 8. TELEMETRIA & PAINEL DE INDICADORES (VIRA TELEMETRY)
// --------------------------------------------------------
describe('8. Telemetria & Painel de Indicadores de Produto', () => {
  it('ViraTelemetry deve calcular médias de tempo e registrar novos eventos', () => {
    const { ViraTelemetry } = require('../services.js');
    assert(ViraTelemetry, 'ViraTelemetry deve existir');
    const averages = ViraTelemetry.getAverages();
    
    assert(averages.avgTimeToSpecSeconds > 0, 'Tempo médio de spec deve ser positivo');
    assert(averages.avgTimeToBiddingSeconds > 0, 'Tempo médio de bidding deve ser positivo');
    
    // Registra evento de exportação
    ViraTelemetry.recordEvent('standardsConsulted', 'ABNT NBR 9781:2013', 1);
    assert(ViraTelemetry.metrics.standardsConsulted['ABNT NBR 9781:2013'] >= 413);
  });
});

// --------------------------------------------------------
// 9. VIRA ACADEMY & FORMAÇÃO TÉCNICA (DESIGN PARTNERS)
// --------------------------------------------------------
describe('9. VIRA Academy & Formação Técnica dos Design Partners', () => {
  it('academyService deve retornar as 4 trilhas e recuperar trilha por perfil de usuário', () => {
    const { ViraServices } = require('../services.js');
    assert(ViraServices.academyService, 'academyService deve existir');
    const tracks = ViraServices.academyService.getTracks();
    assert.strictEqual(tracks.length, 4, 'Deve ter 4 trilhas');

    const fiscalTrack = ViraServices.academyService.getTrackByRole('fiscal');
    assert.strictEqual(fiscalTrack.role, 'fiscal');
    assert(fiscalTrack.modules.some(m => m.normReference.includes('14.133')), 'Trilha fiscal deve citar Lei 14.133/2021');

    const gestorTrack = ViraServices.academyService.getTrackByRole('gestor');
    assert.strictEqual(gestorTrack.role, 'gestor');
    assert(gestorTrack.modules.some(m => m.title.includes('Art. 11, IV')), 'Trilha gestor deve citar Art. 11, IV da Lei 14.133');

    const arqTrack = ViraServices.academyService.getTrackByRole('arquiteto');
    assert.strictEqual(arqTrack.role, 'arquiteto');
    assert(arqTrack.modules.some(m => m.normReference.includes('9050')), 'Trilha arquiteto deve citar NBR 9050');
  });
});

// --------------------------------------------------------
// 10. MULTI-BRAND DESIGN SYSTEM & THEME SWITCHER
// --------------------------------------------------------
describe('10. Multi-Brand Design System & Theme Switcher', () => {
  it('Deve registrar as 5 marcas corporativas e permitir alternância reativa', () => {
    const { BRANDS, ThemeSwitcher } = require('../packages/ar-design-system/themeSwitcher.js');
    assert.strictEqual(Object.keys(BRANDS).length, 5, 'Deve conter exatamente 5 marcas');
    assert(BRANDS.vira && BRANDS.verdis && BRANDS.replasticando && BRANDS.reciclobike && BRANDS.muta);

    const switcher = new ThemeSwitcher('vira');
    assert.strictEqual(switcher.getActiveBrand().id, 'vira');

    let notifiedBrand = null;
    switcher.subscribe(b => { notifiedBrand = b.id; });

    switcher.setTheme('muta');
    assert.strictEqual(switcher.getActiveBrand().id, 'muta');
    assert.strictEqual(notifiedBrand, 'muta');
    assert.strictEqual(switcher.getActiveBrand().primaryColor, '#B91C1C');

    // Valida tokens.css
    const css = fs.readFileSync(path.join(__dirname, '../packages/ar-design-system/tokens.css'), 'utf8');
    assert(css.includes('data-theme="verdis"'));
    assert(css.includes('data-theme="replasticando"'));
    assert(css.includes('data-theme="reciclobike"'));
    assert(css.includes('data-theme="muta"'));
  });
});

// --------------------------------------------------------
// 11. CONTRATOS DIGITAIS DE API (OPENAPI 3.1)
// --------------------------------------------------------
describe('11. Contratos Digitais de API (OpenAPI 3.1)', () => {
  it('packages/ar-api/openapi.json deve estar em conformidade com OpenAPI 3.1 e conter GovernanceEnvelope', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../packages/ar-api/openapi.json'), 'utf8');
    const spec = JSON.parse(raw);
    assert.strictEqual(spec.openapi, '3.1.0');
    assert(spec.info.title.includes('AR OS Core API'));
    
    // Valida rotas essenciais
    assert(spec.paths['/materials']);
    assert(spec.paths['/projects']);
    assert(spec.paths['/compliance/{solutionId}']);
    assert(spec.paths['/acv']);
    assert(spec.paths['/dpp/{tenant}/{batchId}']);

    // Valida schema do envelope de governança
    const envSchema = spec.components.schemas.GovernanceEnvelope;
    assert(envSchema);
    assert.strictEqual(envSchema.properties.governance.properties.dataTier.enum.length, 3);
  });
});

// --------------------------------------------------------
// 12. SDK MULTI-LINGUAGEM (@ar-platform/sdk)
// --------------------------------------------------------
describe('12. SDK Multi-Linguagem (@ar-platform/sdk)', () => {
  it('Cliente JavaScript deve inicializar e consultar materiais com governança e lote DPP', async () => {
    const { createArClient } = require('../packages/ar-sdk/js/src/index.js');
    const client = createArClient({ tenant: 'prefeitura-caruaru', brand: 'vira' });
    
    const matRes = await client.materials.list();
    assert.strictEqual(matRes.status, 200);
    assert.strictEqual(matRes.governance.dataTier, 'homologado');
    assert(matRes.data.length >= 4);

    const dppRes = await client.dpp.verify('LOTE-2026-VR09');
    assert.strictEqual(dppRes.status, 200);
    assert.strictEqual(dppRes.data.batchNumber, 'LOTE-2026-VR09');
    assert.strictEqual(dppRes.data.fckMpa, 38.2);
    assert.strictEqual(dppRes.data.verified, true);
  });
});

// --------------------------------------------------------
// 13. PLATFORM CONSTITUTION & INVARIANTES DE GOVERNANÇA
// --------------------------------------------------------
describe('13. Platform Constitution & Invariantes de Governança', () => {
  it('docs/PLATFORM_CONSTITUTION.md deve conter os 15 artigos promulgados e vinculantes', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/PLATFORM_CONSTITUTION.md'), 'utf8');
    assert(raw.includes('AR PLATFORM CONSTITUTION'));
    for (let i = 1; i <= 15; i++) {
      assert(raw.includes(`Artigo ${i}º`), `Deve conter Artigo ${i}º`);
    }
    // Artigos adicionados na constituição expandida
    assert(raw.includes('Compatibilidade Retroativa'), 'Deve conter Art. 11');
    assert(raw.includes('Observabilidade'), 'Deve conter Art. 12');
    assert(raw.includes('Soberania e Segurança de Segredos'), 'Deve conter Art. 13');
    assert(raw.includes('Documentação Obrigatória'), 'Deve conter Art. 14');
    assert(raw.includes('Governança de Evolução e Descontinuação'), 'Deve conter Art. 15');
  });
});

// --------------------------------------------------------
// 14. DOMAIN-DRIVEN DESIGN (DDD) & EVENTBUS CORPORATIVO
// --------------------------------------------------------
describe('14. Domain-Driven Design (DDD) & EventBus Corporativo', () => {
  it('EventBus deve publicar eventos versionados (.v1) com checksum e fallback de tópico base', () => {
    const { arEventBus, EVENT_TYPES } = require('../packages/ar-core/events/eventBus.js');
    assert(arEventBus);
    
    let capturedVersioned = null;
    let capturedBase = null;

    // Subscrição versionada
    const unsub1 = arEventBus.subscribe(EVENT_TYPES.PROJECT_CREATED_V1, evt => {
      capturedVersioned = evt;
    });

    // Subscrição em tópico base sem versão (retrocompatibilidade)
    const unsub2 = arEventBus.subscribe('ar.domain.projects.created', evt => {
      capturedBase = evt;
    });

    const evt = arEventBus.publish(EVENT_TYPES.PROJECT_CREATED_V1, { name: 'Praça Teste v1' }, { tenant: 'caruaru' });
    
    assert(capturedVersioned, 'Ouvinte versionado deve ser notificado');
    assert(capturedBase, 'Ouvinte de tópico base deve ser notificado via fallback');
    assert.strictEqual(capturedVersioned.version, 'v1');
    assert.strictEqual(capturedVersioned.payload.name, 'Praça Teste v1');
    assert.strictEqual(capturedVersioned.tenant, 'caruaru');
    assert(capturedVersioned.checksum && capturedVersioned.checksum.length === 8);
    unsub1();
    unsub2();
  });

  it('Deve registrar e expor os 11 Bounded Contexts canônicos do AR OS', () => {
    const AR_DOMAINS = require('../packages/ar-core/domains/index.js');
    const domainKeys = Object.keys(AR_DOMAINS);
    assert.strictEqual(domainKeys.length, 11, 'Deve possuir exatamente 11 domínios DDD');
    
    const requiredDomains = [
      'EngineeringDomain',
      'ProjectsDomain',
      'ComplianceDomain',
      'KnowledgeDomain',
      'AcademyDomain',
      'AnalyticsDomain',
      'IdentityDomain',
      'MaterialsDomain',
      'GovernanceDomain',
      'CollaborationDomain',
      'IntegrationsDomain'
    ];
    requiredDomains.forEach(dom => {
      assert(AR_DOMAINS[dom], `Domínio ${dom} deve estar registrado`);
      assert(AR_DOMAINS[dom].name, `Domínio ${dom} deve possuir nome canônico`);
      assert(AR_DOMAINS[dom].description, `Domínio ${dom} deve possuir descrição`);
    });
  });

  it('CollaborationDomain deve gerenciar sessões concorrentes, anotações e locks de revisão', () => {
    const { CollaborationDomain } = require('../packages/ar-core/domains/index.js');
    
    // Sessão de presença
    const session = CollaborationDomain.createPresenceSession('proj-01', 'user-alex', 'engenheiro');
    assert(session.sessionId.startsWith('collab-'));
    assert.strictEqual(session.status, 'active');

    // Anotação colaborativa
    const note = CollaborationDomain.addAnnotation('proj-01', {
      author: 'Eng. Roberto',
      role: 'fiscal',
      text: 'Revisar caimento pluvial na estaca 12+00',
      elementId: 'pave-area-01'
    });
    assert(note.annotationId.startsWith('note-'));
    assert.strictEqual(note.status, 'open');

    // Trava de revisão
    const lock = CollaborationDomain.acquireRevisionLock('proj-01', 'user-alex');
    assert(lock.lockId.startsWith('lock-'));
    assert.strictEqual(lock.active, true);
    assert.strictEqual(lock.ttlSeconds, 300);
  });

  it('IntegrationsDomain deve gerar exportação BIM IFC4 estruturada e despachar webhook SEI', () => {
    const { IntegrationsDomain } = require('../packages/ar-core/domains/index.js');

    // Exportação IFC4
    const ifc = IntegrationsDomain.exportToIfc('proj-01', 'Orla Boa Viagem', [
      { name: 'Paver Intertravado', quantityM2: 500 }
    ]);
    assert.strictEqual(ifc.schema, 'IFC4');
    assert(ifc.ifcGuid.startsWith('VIRA-IFC-'));
    assert.strictEqual(ifc.entities.length, 1);
    assert.strictEqual(ifc.entities[0].propertySets.Pset_MaterialPavement.CompressiveStrength, 38.2);

    // Webhook governamental SEI
    const sei = IntegrationsDomain.dispatchSeiWebhook('0042/2026', { orgao: 'Prefeitura do Recife' });
    assert.strictEqual(sei.status, 'DELIVERED');
    assert(sei.endpoint.includes('sei.pe.gov.br'));
  });
});

// --------------------------------------------------------
// 15. BACKGROUND WORKERS & JOB QUEUE
// --------------------------------------------------------
describe('15. Background Workers & Job Queue Engine', () => {
  it('Deve enfileirar com SLA Tiers e priorizar jobs críticos na fila de execução', async () => {
    const { arJobQueue, SLA_TIERS } = require('../packages/ar-backend/workers/jobQueue.js');
    assert(arJobQueue);
    assert(SLA_TIERS.CRITICAL && SLA_TIERS.NORMAL && SLA_TIERS.BACKGROUND && SLA_TIERS.SCHEDULED);

    // Enfileira primeiro um job normal, e depois um crítico
    const jobNormal = arJobQueue.enqueue('pdf_generation', { projectId: 'proj-normal' }, { slaTier: 'normal' });
    const jobCritical = arJobQueue.enqueue('pdf_generation', { projectId: 'proj-critico' }, { slaTier: 'critical' });

    assert.strictEqual(jobNormal.slaTier, 'normal');
    assert.strictEqual(jobCritical.slaTier, 'critical');
    assert(jobCritical.priority > jobNormal.priority, 'Critical deve ter prioridade superior');

    // O próximo a processar DEVE ser o crítico, mesmo tendo sido enfileirado depois
    const processedFirst = await arJobQueue.processNext('pdf_generation');
    assert.strictEqual(processedFirst.id, jobCritical.id, 'Job crítico deve furar a fila prioritariamente');
    assert.strictEqual(processedFirst.status, 'completed');
    assert.strictEqual(processedFirst.slaMet, true, 'SLA deve ser cumprido (< 2s)');

    // Processa o job normal
    const processedSecond = await arJobQueue.processNext('pdf_generation');
    assert.strictEqual(processedSecond.id, jobNormal.id);
    assert.strictEqual(processedSecond.status, 'completed');
  });

  it('getMetrics() deve reportar métricas de processamento e taxa de conformidade de SLA', () => {
    const { arJobQueue } = require('../packages/ar-backend/workers/jobQueue.js');
    const metrics = arJobQueue.getMetrics();
    
    assert(metrics.totalJobs >= 2);
    assert(metrics.completedJobs >= 2);
    assert.strictEqual(metrics.slaComplianceRate, 100, 'Taxa de cumprimento do SLA deve ser 100%');
    assert.strictEqual(metrics.slaTiers.CRITICAL.maxLatencyMs, 2000);
  });
});

// --------------------------------------------------------
// 16. AR CLI OFICIAL (@ar-platform/cli)
// --------------------------------------------------------
describe('16. AR CLI Oficial (@ar-platform/cli)', () => {
  it('packages/ar-cli/bin/ar.js deve existir e possuir versão 1.0.0', () => {
    const cli = require('../packages/ar-cli/bin/ar.js');
    assert.strictEqual(cli.VERSION, '1.0.0');
  });

  it('ar doctor deve diagnosticar saúde de Node, dados, packages e constitution com 100% PASS', () => {
    const cli = require('../packages/ar-cli/bin/ar.js');
    const res = cli.doctor({ print: false });
    assert.strictEqual(res.success, true, 'Doctor deve passar em 100% dos checks');
    assert.strictEqual(res.checks.length, 5, 'Deve conter 5 verificações');
    res.checks.forEach(c => assert.strictEqual(c.passed, true, `Check ${c.name} deve ser aprovado`));
  });

  it('ar validate deve validar contratos OpenAPI, catálogos e UUIDs RFC 4122 v4', () => {
    const cli = require('../packages/ar-cli/bin/ar.js');
    const val = cli.validate({ print: false });
    assert.strictEqual(val.success, true, 'Validate deve passar em todas as validações');
    assert.strictEqual(val.validations.length, 4, 'Deve conter 4 validações');
  });

  it('ar benchmark deve atingir taxa superior a 10.000 ops/seg em cálculos e eventos', () => {
    const cli = require('../packages/ar-cli/bin/ar.js');
    const bench = cli.benchmark({ print: false });
    assert(bench.calculation.opsPerSec > 10000, 'Cálculo paramétrico deve ser ultrarrápido');
    assert(bench.eventBus.opsPerSec > 1000, 'EventBus deve processar mais de 1.000 eventos/seg');
  });
});

// --------------------------------------------------------
// 17. PLATFORM MANIFESTO & GOVERNANÇA FUNDACIONAL
// --------------------------------------------------------
describe('17. Platform Manifesto & Governança Fundacional', () => {
  it('docs/PLATFORM_MANIFESTO.md deve conter os 5 vetores de decisão da holding', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/PLATFORM_MANIFESTO.md'), 'utf8');
    assert(raw.includes('QUALIDADE:'));
    assert(raw.includes('RASTREABILIDADE:'));
    assert(raw.includes('TRANSPARÊNCIA:'));
    assert(raw.includes('REUTILIZAÇÃO:'));
    assert(raw.includes('LONGEVIDADE:'));
    assert(raw.includes('AR OS é a plataforma tecnológica da AR Mídias Integradas'));
  });

  it('README.md da raiz deve declarar formalmente o lema do AR OS 1.0', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
    assert(raw.includes('AR OS é a plataforma tecnológica da AR Mídias Integradas'));
    assert(raw.includes('AR OS FOUNDATION'));
    assert(raw.includes('AR OS SERVICES'));
    assert(raw.includes('AR OS APPLICATIONS'));
  });

  it('README.md e THREE_HORIZONS_ROADMAP.md devem declarar o novo posicionamento institucional', () => {
    const readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
    const roadmap = fs.readFileSync(path.join(__dirname, '../docs/strategy/THREE_HORIZONS_ROADMAP.md'), 'utf8');
    const expected = 'Uma plataforma de infraestrutura digital para economia circular, engenharia e gestão ambiental.';
    assert(readme.includes(expected), 'README deve conter o novo posicionamento');
    assert(roadmap.includes(expected), 'Roadmap deve conter o novo posicionamento');
  });

  it('docs/releases/RELEASE_NOTES.md deve catalogar histórico desde v1.0.0 até AR OS 1.0.0', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/releases/RELEASE_NOTES.md'), 'utf8');
    assert(raw.includes('[AR OS 1.0.0]'));
    assert(raw.includes('[VIRA OS v4.1.0]'));
    assert(raw.includes('[VIRA OS v4.0.0]'));
    assert(raw.includes('[VIRA v1.0.0]'));
  });
});

// --------------------------------------------------------
// 18. CAPABILITY REGISTRY (ABSTRAÇÃO DA PLATAFORMA)
// --------------------------------------------------------
describe('18. Capability Registry (Abstração da Plataforma)', () => {
  it('arCapabilityRegistry deve catalogar as 11 capacidades canônicas da plataforma', () => {
    const { arCapabilityRegistry } = require('../packages/ar-core/capabilities/registry.js');
    assert(arCapabilityRegistry);
    const caps = arCapabilityRegistry.list();
    assert.strictEqual(caps.length, 11, 'Deve possuir 11 capacidades canônicas registradas');
    
    // Valida propriedades obrigatórias
    caps.forEach(c => {
      assert(c.id && c.name && c.domain && c.service && c.category);
      assert(Array.isArray(c.supportedBrands) && c.supportedBrands.length > 0);
    });
  });

  it('Deve filtrar capacidades por marca (VIRA com 11, MUTA com 6, RecicloBike com 3)', () => {
    const { arCapabilityRegistry } = require('../packages/ar-core/capabilities/registry.js');
    const viraCaps = arCapabilityRegistry.getForBrand('vira');
    const mutaCaps = arCapabilityRegistry.getForBrand('muta');
    const bikeCaps = arCapabilityRegistry.getForBrand('reciclobike');

    assert.strictEqual(viraCaps.length, 11, 'VIRA deve herdar 100% das capacidades');
    assert.strictEqual(mutaCaps.length, 6, 'MUTA deve suportar 6 capacidades');
    assert.strictEqual(bikeCaps.length, 3, 'RecicloBike deve suportar 3 capacidades');
  });

  it('supports() deve validar autorização de capacidades por marca vertical', () => {
    const { arCapabilityRegistry } = require('../packages/ar-core/capabilities/registry.js');
    assert.strictEqual(arCapabilityRegistry.supports('vira', 'technical_academy'), true);
    assert.strictEqual(arCapabilityRegistry.supports('muta', 'technical_academy'), false);
    assert.strictEqual(arCapabilityRegistry.supports('reciclobike', 'carbon_lca_analytics'), true);
    assert.strictEqual(arCapabilityRegistry.supports('reciclobike', 'structural_engineering'), false);
  });
});

// --------------------------------------------------------
// 19. FEATURE FLAGS ENGINE (CONTROLE DECLARATIVO)
// --------------------------------------------------------
describe('19. Feature Flags Engine (Controle Declarativo)', () => {
  it('arFeatureFlags deve avaliar estado ativo para VIRA e inativo para marcas especializadas', () => {
    const { arFeatureFlags } = require('../packages/ar-core/features/featureFlags.js');
    assert(arFeatureFlags);

    // VIRA tem academy e bim_export ativos
    assert.strictEqual(arFeatureFlags.isEnabled('academy', { brand: 'vira' }), true);
    assert.strictEqual(arFeatureFlags.isEnabled('bim_export', { brand: 'vira' }), true);

    // MUTA tem academy inativo, mas copilot e analytics ativos
    assert.strictEqual(arFeatureFlags.isEnabled('academy', { brand: 'muta' }), false);
    assert.strictEqual(arFeatureFlags.isEnabled('copilot', { brand: 'muta' }), true);
    assert.strictEqual(arFeatureFlags.isEnabled('analytics', { brand: 'muta' }), true);
  });

  it('Deve permitir sobrescrita em nível de Tenant corporativo com precedência estrita', () => {
    const { arFeatureFlags } = require('../packages/ar-core/features/featureFlags.js');

    // Por padrão na MUTA, bim_export é false
    assert.strictEqual(arFeatureFlags.isEnabled('bim_export', { brand: 'muta', tenant: 'cbre-global' }), false);

    // Habilita bim_export exclusivamente para o tenant 'cbre-global'
    arFeatureFlags.setTenantOverride('cbre-global', 'bim_export', true);

    assert.strictEqual(arFeatureFlags.isEnabled('bim_export', { brand: 'muta', tenant: 'cbre-global' }), true);
    // Outro tenant continua false
    assert.strictEqual(arFeatureFlags.isEnabled('bim_export', { brand: 'muta', tenant: 'outro-tenant' }), false);
  });

  it('getAllFlags() deve retornar dicionário completo de chaves booleanas para um contexto', () => {
    const { arFeatureFlags } = require('../packages/ar-core/features/featureFlags.js');
    const flags = arFeatureFlags.getAllFlags({ brand: 'replasticando' });
    
    assert(typeof flags.analytics === 'boolean');
    assert.strictEqual(flags.analytics, true);
    assert.strictEqual(flags.academy, false);
    assert.strictEqual(flags.compliance, false);
    assert.strictEqual(flags.dpp, true);
  });

  it('arFeatureFlags deve classificar maturidade (Experimental -> Beta -> GA) e validar restrições de ambiente', () => {
    const { arFeatureFlags, FEATURE_MATURITY } = require('../packages/ar-core/features/featureFlags.js');
    assert.strictEqual(arFeatureFlags.getMaturity('compliance'), FEATURE_MATURITY.GA);
    assert.strictEqual(arFeatureFlags.getMaturity('bim_export'), FEATURE_MATURITY.BETA);
    assert.strictEqual(arFeatureFlags.getMaturity('white_label'), FEATURE_MATURITY.EXPERIMENTAL);

    // Validação ambiental
    assert.strictEqual(arFeatureFlags.isAllowedInEnvironment('compliance', 'production'), true);
    assert.strictEqual(arFeatureFlags.isAllowedInEnvironment('bim_export', 'production'), false);
    assert.strictEqual(arFeatureFlags.isAllowedInEnvironment('bim_export', 'staging'), true);
    assert.strictEqual(arFeatureFlags.isAllowedInEnvironment('white_label', 'production'), false);
    assert.strictEqual(arFeatureFlags.isAllowedInEnvironment('white_label', 'development'), true);
  });
});

// --------------------------------------------------------
// 20. ARQUITETURA OPERACIONAL, SRE & AR OS HANDBOOK
// --------------------------------------------------------
describe('20. Arquitetura Operacional, SRE & AR OS Handbook', () => {
  it('docs/operations/OPERATIONAL_ARCHITECTURE.md deve cobrir os 8 pilares operacionais de SRE', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/operations/OPERATIONAL_ARCHITECTURE.md'), 'utf8');
    assert(raw.includes('Pipeline de Deploy & Entrega Contínua'), 'Deve cobrir Deploy');
    assert(raw.includes('Point-in-Time Recovery (PITR)'), 'Deve cobrir Backup');
    assert(raw.includes('Procedimento de Restore'), 'Deve cobrir Restore');
    assert(raw.includes('SEV-1 [Crítico]'), 'Deve cobrir Incident Response');
    assert(raw.includes('Observabilidade, Métricas & Monitoramento'), 'Deve cobrir Observabilidade');
    assert(raw.includes('Logs Estruturados em JSON'), 'Deve cobrir Logs');
    assert(raw.includes('Política de Alertas & Plantão'), 'Deve cobrir Alertas');
    assert(raw.includes('Zero-Downtime Migration'), 'Deve cobrir Atualizações');
  });

  it('docs/AR_OS_HANDBOOK.md deve consolidar os 12 capítulos canônicos da plataforma', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/AR_OS_HANDBOOK.md'), 'utf8');
    assert(raw.includes('AR OS HANDBOOK'));
    for (let i = 1; i <= 12; i++) {
      const numStr = String(i).padStart(2, '0');
      assert(raw.includes(`${numStr}.`), `Handbook deve conter capítulo ${numStr}`);
    }
    assert(raw.includes('Capability Registry'));
    assert(raw.includes('Platform Constitution'));
    assert(raw.includes('Roadmap de Três Horizontes'));
  });

  it('docs/strategy/THREE_HORIZONS_ROADMAP.md deve estabelecer critérios objetivos de saída (Exit Criteria)', () => {
    const raw = fs.readFileSync(path.join(__dirname, '../docs/strategy/THREE_HORIZONS_ROADMAP.md'), 'utf8');
    assert(raw.includes('Exit Criteria — Horizonte 1'));
    assert(raw.includes('Exit Criteria — Horizonte 2'));
    assert(raw.includes('Exit Criteria — Horizonte 3'));
    assert(raw.includes('Autenticação Concluída'));
    assert(raw.includes('Três Aplicações em Produção'));
    assert(raw.includes('Integração Exclusiva por API/SDK'));
  });
});

// --------------------------------------------------------
// EXECUÇÃO SEQUENCIAL ASSÍNCRONA DAS SUÍTES DE TESTE
// --------------------------------------------------------
(async () => {
  try {
    for (const suite of testSuites) {
      console.log(`\n▶ [SUÍTE] ${suite.name}`);
      for (const t of suite.tests) {
        totalTests++;
        try {
          await t.fn();
          passedTests++;
          console.log(`  ✓ ${t.description}`);
        } catch (err) {
          console.error(`  ✗ ${t.description}`);
          console.error(`    Erro: ${err.message}`);
          console.error(err.stack);
          process.exit(1);
        }
      }
    }

    console.log(`\n========================================================`);
    console.log(`✓ RESULTADO FINAL DOS TESTES: ${passedTests}/${totalTests} testes aprovados com sucesso!`);
    console.log(`========================================================\n`);
  } catch (globalErr) {
    console.error('Falha crítica na execução dos testes:', globalErr);
    process.exit(1);
  }
})();
