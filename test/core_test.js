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

function it(description, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${description}`);
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    Erro: ${err.message}`);
    throw err;
  }
}

function describe(suiteName, fn) {
  console.log(`\n▶ [SUÍTE] ${suiteName}`);
  fn();
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

console.log(`\n========================================================`);
console.log(`✓ RESULTADO FINAL DOS TESTES: ${passedTests}/${totalTests} testes aprovados com sucesso!`);
console.log(`========================================================\n`);
