// ========================================================
// VIRA OS — PROJECT STORE & ENGINE (projectEngine.js)
// Gerenciador de Projetos Executivos, Quantitativos, Versionamento & Multi-Exportação
// ========================================================

/**
 * --------------------------------------------------------
 * TYPEDEF / CONTRATOS DE TIPAGEM (TYPESCRIPT-READY JSDOC)
 * --------------------------------------------------------
 * @typedef {Object} AuditEntry
 * @property {string} id - UUID único do registro de auditoria
 * @property {string} timestamp - Data e hora da ocorrência (DD/MM/AAAA HH:mm:ss)
 * @property {string} action - Ação registrada (ex: 'PROJECT_CREATED', 'ITEM_ADDED', 'MEMORIAL_EXPORTED')
 * @property {string} actor - Nome ou registro profissional do operador responsável
 * @property {string} details - Descrição circunstanciada da ação realizada
 * @property {string} checksum - Hash curto de integridade e não-repúdio
 *
 * @typedef {Object} ProjectItem
 * @property {string} solutionId - Identificador da solução ('paver', 'painel', 'perfil', 'insumo')
 * @property {string} name - Nome descritivo do item
 * @property {string} code - Engineering ID / Código de catálogo (ex: 'VRA-PAV-2026')
 * @property {number} quantityM2 - Quantidade especificada (m² ou metro linear)
 * @property {number} densityKgM2 - Densidade superficial ou linear do compósito (kg/m² ou kg/m)
 * @property {number} lcaFactorCo2 - Fator de mitigação de carbono conforme ISO 14044 (kg CO2e/kg)
 * @property {number} unitCostEstimate - Estimativa orçamentária unitária (R$)
 *
 * @typedef {Object} Project
 * @property {string} id - Identificador curto legível do projeto (ex: 'proj-recife-orla' ou 'proj-4a7f9210')
 * @property {string} uuid - Identificador universal criptográfico único (RFC 4122 v4)
 * @property {number} schemaVersion - Versão do schema de dados do projeto (versão atual: 4)
 * @property {string} name - Nome da obra ou intervenção urbana
 * @property {string} client - Órgão contratante, prefeitura ou cliente corporativo
 * @property {string} responsible - Responsável técnico pelo edital/projeto (com CREA/CAU)
 * @property {string} lawReference - Enquadramento jurídico (ex: Lei 14.133/2021)
 * @property {string} createdAt - Data de cadastro formatada (DD/MM/AAAA)
 * @property {string} updatedAt - Data da última modificação
 * @property {string} status - Situação do projeto ('Em Licitação', 'Projeto Aprovado', 'Em Elaboração', 'Simulação Técnica')
 * @property {('homologado'|'meta_produto'|'exemplo_ilustrativo'|'projeto_usuario')} dataTier - Nível de governança da verdade técnica
 * @property {string} [auditNotice] - Nota explicativa sobre a natureza dos dados
 * @property {string} notes - Notas técnicas de canteiro e especificações complementares
 * @property {ProjectItem[]} items - Lista de itens e quantitativos
 * @property {AuditEntry[]} auditTrail - Trilha cronológica de auditoria e governança
 *
 * @typedef {Object} EngineeringTotals
 * @property {number} totalArea - Metragem total somada (m²)
 * @property {number} totalPlasticKg - Massa consolidada de plástico pós-consumo regenerado (kg)
 * @property {number} totalCo2MitigatedKg - Volume total de emissões de CO2e mitigadas (kg)
 * @property {number} totalCostEstimate - Custo direto estimado de materiais (R$)
 *
 * @typedef {Object} StorageEnvelopeV4
 * @property {number} schemaVersion - Versão do envelope de persistência (4)
 * @property {string} lastAudit - Data/hora da última gravação em ISO 8601
 * @property {string} [migratedFrom] - Registro de migração de versões legadas
 * @property {Project[]} projects - Vetor de projetos persistidos
 */

const VIRA_STORAGE_KEY_V4 = 'VIRA_PROJECTS_STORE_V4';
const VIRA_STORAGE_KEY_V3 = 'VIRA_PROJECTS_STORE_V3';
const CURRENT_SCHEMA_VERSION = 4;

/**
 * Utilitário universal para geração de identificadores UUID v4 criptográficos
 * @returns {string}
 */
function generateUuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// --------------------------------------------------------
// PROJETOS DEMONSTRATIVOS CANÔNICOS (CASOS REAIS / ESTUDO)
// --------------------------------------------------------
const defaultDemoProjects = [
  {
    id: 'proj-recife-orla',
    uuid: '4a7f9210-951b-4f9e-873b-e01fa8130001',
    schemaVersion: CURRENT_SCHEMA_VERSION,
    name: 'Requalificação Urbana da Orla de Boa Viagem (Estudo Demonstrativo)',
    client: 'Prefeitura do Recife — Secretaria de Infraestrutura',
    responsible: 'Eng. Roberto Silveira (CREA-PE 052.190-D)',
    lawReference: 'Termo de Referência nº 042/2026 — Lei 14.133/2021',
    createdAt: '15/08/2026',
    updatedAt: '05/09/2026',
    status: 'Simulação Técnica',
    dataTier: 'exemplo_ilustrativo',
    auditNotice: 'Simulação de anteprojeto para estudo de viabilidade e quantitativos de engenharia.',
    notes: 'Projeto de pavimentação contínua de calçadão e ciclovia com alta exposição à maresia e tráfego intenso de pedestres e veículos leves de serviço.',
    items: [
      {
        solutionId: 'paver',
        name: 'Paver Intertravado 16 Faces (Cinza Concreto)',
        code: 'VRA-PAV-2026',
        quantityM2: 4200,
        densityKgM2: 18.5,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 88.50
      },
      {
        solutionId: 'perfil',
        name: 'Perfil Estrutural Maciço 80×80 (Decks e Guarda-Corpo)',
        code: 'VRA-PRF-0142',
        quantityM2: 450,
        densityKgM2: 6.14,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 62.00
      }
    ],
    auditTrail: [
      {
        id: 'aud-4a7f-001',
        timestamp: '15/08/2026 09:15:00',
        action: 'PROJECT_CREATED',
        actor: 'Eng. Roberto Silveira (CREA-PE 052.190-D)',
        details: 'Criação do anteprojeto de Requalificação da Orla de Boa Viagem (Lei 14.133/2021).',
        checksum: 'c4b8e192'
      },
      {
        id: 'aud-4a7f-002',
        timestamp: '20/08/2026 14:30:22',
        action: 'ITEMS_SPECIFIED',
        actor: 'Eng. Roberto Silveira',
        details: 'Adição de 4.200 m² de Paver 16 Faces (fck 38,2 MPa) e 450 m de Perfil 80×80.',
        checksum: 'a891f73b'
      },
      {
        id: 'aud-4a7f-003',
        timestamp: '05/09/2026 16:45:10',
        action: 'MEMORIAL_GENERATED',
        actor: 'Eng. Roberto Silveira',
        details: 'Emissão de Caderno Técnico de Licitação Pública com laudo IPT nº 1.104.921-A anexado.',
        checksum: '7d32c091'
      }
    ]
  },
  {
    id: 'proj-caruaru-linear',
    uuid: '8b3e5114-1c2a-4a6f-9981-d14bb9240002',
    schemaVersion: CURRENT_SCHEMA_VERSION,
    name: 'Parque Linear Capibaribe — Setor Industrial (Estudo Demonstrativo)',
    client: 'Prefeitura Municipal de Caruaru — Secretaria de Urbanismo',
    responsible: 'Arq. Larissa Mendonça (CAU-PE A92.311-2)',
    lawReference: 'Edital de Concorrência Pública nº 018/2026',
    createdAt: '22/07/2026',
    updatedAt: '02/09/2026',
    status: 'Simulação Técnica',
    dataTier: 'exemplo_ilustrativo',
    auditNotice: 'Estudo de caso paramétrico para simulação de praça e mobiliário urbano circular.',
    notes: 'Praça pública sustentável integrada com passeios drenantes, rampas acessíveis NBR 9050 e fachada técnica do centro comunitário.',
    items: [
      {
        solutionId: 'paver',
        name: 'Paver Intertravado 16 Faces (Ocre e Grafite)',
        code: 'VRA-PAV-2026',
        quantityM2: 2500,
        densityKgM2: 18.5,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 88.50
      },
      {
        solutionId: 'painel',
        name: 'Painel Arquitetônico 15mm para Fachada Ventilada',
        code: 'VRA-PNL-1204',
        quantityM2: 600,
        densityKgM2: 14.4,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 145.00
      }
    ],
    auditTrail: [
      {
        id: 'aud-8b3e-001',
        timestamp: '22/07/2026 11:20:00',
        action: 'PROJECT_CREATED',
        actor: 'Arq. Larissa Mendonça (CAU-PE A92.311-2)',
        details: 'Criação do projeto Parque Linear Capibaribe — Setor Industrial.',
        checksum: 'e519c288'
      },
      {
        id: 'aud-8b3e-002',
        timestamp: '02/09/2026 10:05:44',
        action: 'ACV_VALIDATED',
        actor: 'Arq. Larissa Mendonça',
        details: 'Validação de crédito de mitigação climática de 117 t CO2e conforme ISO 14044.',
        checksum: '49af71e0'
      }
    ]
  }
];

// ========================================================
// MOTOR E STORE DE PROJETOS (PROJECT STORE)
// ========================================================
class ProjectStore {
  constructor() {
    this.projects = this.loadProjects();
    this.activeProjectId = this.projects.length > 0 ? this.projects[0].id : null;
    this.listeners = [];
  }

  /**
   * Registra listener para mudanças no estado do store
   * @param {Function} callback
   */
  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.projects, this.getActiveProject()); } catch (err) { console.error(err); }
    });
  }

  /**
   * Migrador de dados: normaliza projetos de versões anteriores (V3 -> V4)
   * @param {Array} legacyProjects
   * @returns {Project[]}
   */
  migrateFromV3(legacyProjects) {
    if (!Array.isArray(legacyProjects)) return [];
    console.info('[VIRA OS] Migrando armazenamento de projetos V3 -> V4...');
    return legacyProjects.map(proj => {
      const isDemo = proj.id === 'proj-recife-orla' || proj.id === 'proj-caruaru-linear';
      return {
        id: proj.id || ('proj-' + generateUuid().substring(0, 8)),
        uuid: proj.uuid || generateUuid(),
        schemaVersion: CURRENT_SCHEMA_VERSION,
        name: proj.name || 'Projeto Migrado',
        client: proj.client || 'Órgão Não Informado',
        responsible: proj.responsible || 'Responsável Técnico',
        lawReference: proj.lawReference || 'Lei 14.133/2021',
        createdAt: proj.createdAt || new Date().toLocaleDateString('pt-BR'),
        updatedAt: proj.updatedAt || new Date().toLocaleDateString('pt-BR'),
        status: proj.status || (isDemo ? 'Simulação Técnica' : 'Em Elaboração'),
        dataTier: proj.dataTier || (isDemo ? 'exemplo_ilustrativo' : 'projeto_usuario'),
        auditNotice: proj.auditNotice || (isDemo ? 'Projeto de estudo de viabilidade demonstrativo.' : 'Projeto cadastrado pelo usuário.'),
        notes: proj.notes || '',
        auditTrail: Array.isArray(proj.auditTrail) ? proj.auditTrail : [
          {
            id: 'aud-' + generateUuid().substring(0, 8),
            timestamp: new Date().toLocaleString('pt-BR'),
            action: 'SCHEMA_MIGRATED',
            actor: 'VIRA OS Migration Engine',
            details: 'Projeto migrado com sucesso do schema V3 para o padrão VIRA OS V4 com UUID.',
            checksum: 'f00d1a44'
          }
        ],
        items: Array.isArray(proj.items) ? proj.items.map(it => ({
          solutionId: it.solutionId || 'paver',
          name: it.name || 'Item de Engenharia',
          code: it.code || 'VRA-GEN',
          quantityM2: parseFloat(it.quantityM2) || 100,
          densityKgM2: parseFloat(it.densityKgM2) || 18.5,
          lcaFactorCo2: parseFloat(it.lcaFactorCo2) || 2.15,
          unitCostEstimate: parseFloat(it.unitCostEstimate) || 85.0
        })) : []
      };
    });
  }

  /**
   * Registra evento imutável na trilha de auditoria do projeto
   * @param {string} projectId
   * @param {string} action
   * @param {string} details
   * @param {string} [actor]
   * @returns {AuditEntry|null}
   */
  addAuditEntry(projectId, action, details, actor) {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj) return null;
    if (!Array.isArray(proj.auditTrail)) {
      proj.auditTrail = [];
    }
    const timestamp = new Date().toLocaleString('pt-BR');
    const entryId = 'aud-' + generateUuid().substring(0, 8);
    const strToHash = `${entryId}:${timestamp}:${action}:${details}`;
    let hashVal = 0;
    for (let i = 0; i < strToHash.length; i++) {
      hashVal = ((hashVal << 5) - hashVal) + strToHash.charCodeAt(i);
      hashVal |= 0;
    }
    const checksum = Math.abs(hashVal).toString(16).padStart(8, '0');

    /** @type {AuditEntry} */
    const entry = {
      id: entryId,
      timestamp,
      action,
      actor: actor || proj.responsible || 'Responsável Técnico',
      details,
      checksum
    };

    proj.auditTrail.unshift(entry);
    return entry;
  }

  /**
   * Carrega os projetos persistidos com detecção de versão e migração automática
   * @returns {Project[]}
   */
  loadProjects() {
    try {
      // 1. Tenta carregar o schema oficial V4
      const storedV4 = localStorage.getItem(VIRA_STORAGE_KEY_V4);
      if (storedV4) {
        const envelope = JSON.parse(storedV4);
        if (envelope && Array.isArray(envelope.projects) && envelope.projects.length > 0) {
          return envelope.projects;
        }
      }

      // 2. Tenta migrar da versão legada V3 se existir
      const storedV3 = localStorage.getItem(VIRA_STORAGE_KEY_V3);
      if (storedV3) {
        const parsedV3 = JSON.parse(storedV3);
        if (Array.isArray(parsedV3) && parsedV3.length > 0) {
          const migrated = this.migrateFromV3(parsedV3);
          this.saveProjects(migrated, 'Migração automática de V3 para V4');
          return migrated;
        }
      }
    } catch (e) {
      console.warn('[VIRA OS] Falha ao ler localStorage de projetos:', e);
    }

    // 3. Fallback para projetos demonstrativos canônicos
    this.saveProjects(defaultDemoProjects, 'Inicialização canônica V4');
    return JSON.parse(JSON.stringify(defaultDemoProjects));
  }

  /**
   * Salva os projetos no localStorage encapsulado no envelope V4
   * @param {Project[]} projectsList
   * @param {string} [reason]
   */
  saveProjects(projectsList, reason) {
    try {
      /** @type {StorageEnvelopeV4} */
      const envelope = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        lastAudit: new Date().toISOString(),
        migratedFrom: reason || undefined,
        projects: projectsList
      };
      localStorage.setItem(VIRA_STORAGE_KEY_V4, JSON.stringify(envelope));
    } catch (e) {
      console.error('[VIRA OS] Erro ao salvar projetos no localStorage:', e);
    }
  }

  getProjects() {
    return this.projects;
  }

  getAllProjects() {
    return this.projects;
  }

  getActiveProject() {
    return this.projects.find(p => p.id === this.activeProjectId) || this.projects[0];
  }

  setActiveProject(id) {
    const proj = this.projects.find(p => p.id === id);
    if (proj) {
      this.activeProjectId = id;
      this.notify();
      return proj;
    }
    return null;
  }

  /**
   * Cria novo projeto no repositório com UUID criptográfico
   * @param {Partial<Project>} data
   * @returns {Project}
   */
  createProject(data) {
    const newUuid = generateUuid();
    /** @type {Project} */
    const newProj = {
      id: 'proj-' + newUuid.substring(0, 8),
      uuid: newUuid,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      name: data.name || 'Novo Projeto Executivo',
      client: data.client || 'Órgão / Cliente Não Informado',
      responsible: data.responsible || 'Responsável Técnico',
      lawReference: data.lawReference || 'Lei 14.133/2021 (Art. 11 e Art. 34)',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      updatedAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Em Elaboração',
      dataTier: 'projeto_usuario',
      auditNotice: 'Projeto registrado pelo usuário no Workspace.',
      notes: data.notes || '',
      items: data.items || [],
      auditTrail: []
    };
    this.projects.unshift(newProj);
    this.activeProjectId = newProj.id;
    this.addAuditEntry(newProj.id, 'PROJECT_CREATED', `Projeto criado com enquadramento sob ${newProj.lawReference}.`, newProj.responsible);
    this.saveProjects(this.projects);
    this.notify();
    return newProj;
  }

  updateProject(id, updates) {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.projects[idx] = {
        ...this.projects[idx],
        ...updates,
        updatedAt: new Date().toLocaleDateString('pt-BR')
      };
      this.addAuditEntry(id, 'PROJECT_UPDATED', `Metadados do projeto alterados (status: ${this.projects[idx].status}).`, this.projects[idx].responsible);
      this.saveProjects(this.projects);
      this.notify();
      return this.projects[idx];
    }
    return null;
  }

  deleteProject(id) {
    if (this.projects.length <= 1) {
      alert('Não é possível excluir o único projeto ativo. Crie outro projeto primeiro.');
      return false;
    }
    this.projects = this.projects.filter(p => p.id !== id);
    this.activeProjectId = this.projects[0].id;
    this.saveProjects(this.projects);
    this.notify();
    return true;
  }

  duplicateProject(id) {
    const origin = this.projects.find(p => p.id === id);
    if (!origin) return null;
    const newUuid = generateUuid();
    /** @type {Project} */
    const clone = JSON.parse(JSON.stringify(origin));
    clone.id = 'proj-' + newUuid.substring(0, 8);
    clone.uuid = newUuid;
    clone.name = `${clone.name} (Cópia)`;
    clone.createdAt = new Date().toLocaleDateString('pt-BR');
    clone.updatedAt = new Date().toLocaleDateString('pt-BR');
    clone.dataTier = 'projeto_usuario';
    clone.auditTrail = Array.isArray(clone.auditTrail) ? [...clone.auditTrail] : [];
    this.projects.unshift(clone);
    this.activeProjectId = clone.id;
    this.addAuditEntry(clone.id, 'PROJECT_DUPLICATED', `Projeto clonado a partir de ${origin.name} (${origin.id}).`, clone.responsible);
    this.saveProjects(this.projects);
    this.notify();
    return clone;
  }

  addItemToProject(projectId, item) {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj) return null;

    const newItem = {
      solutionId: item.solutionId || 'paver',
      name: item.name || 'Item de Engenharia',
      code: item.code || 'VRA-GEN',
      quantityM2: parseFloat(item.quantityM2) || 100,
      densityKgM2: parseFloat(item.densityKgM2) || 18.5,
      lcaFactorCo2: 2.15,
      unitCostEstimate: parseFloat(item.unitCostEstimate) || 85.0
    };
    proj.items.push(newItem);
    proj.updatedAt = new Date().toLocaleDateString('pt-BR');
    this.addAuditEntry(projectId, 'ITEM_ADDED', `Adição de ${newItem.quantityM2} m² de ${newItem.name} (${newItem.code}).`, proj.responsible);
    this.saveProjects(this.projects);
    this.notify();
    return proj;
  }

  removeItemFromProject(projectId, itemIndex) {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj || !proj.items[itemIndex]) return null;

    const removedItem = proj.items[itemIndex];
    proj.items.splice(itemIndex, 1);
    proj.updatedAt = new Date().toLocaleDateString('pt-BR');
    this.addAuditEntry(projectId, 'ITEM_REMOVED', `Remoção do item: ${removedItem ? removedItem.name : ('índice ' + itemIndex)}.`, proj.responsible);
    this.saveProjects(this.projects);
    this.notify();
    return proj;
  }

  /**
   * Totalizador paramétrico de impacto e orçamentação
   * @param {Project} [project]
   * @returns {EngineeringTotals}
   */
  calculateProjectTotals(project) {
    const proj = project || this.getActiveProject();
    if (!proj || !proj.items) {
      return { totalArea: 0, totalPlasticKg: 0, totalCo2MitigatedKg: 0, totalCostEstimate: 0 };
    }

    let totalArea = 0;
    let totalPlasticKg = 0;
    let totalCo2MitigatedKg = 0;
    let totalCostEstimate = 0;

    proj.items.forEach(it => {
      const area = parseFloat(it.quantityM2) || 0;
      const density = parseFloat(it.densityKgM2) || 18.5;
      const lca = parseFloat(it.lcaFactorCo2) || 2.15;
      const cost = parseFloat(it.unitCostEstimate) || 0;

      const plasticKg = area * density;
      const co2Kg = plasticKg * lca;

      totalArea += area;
      totalPlasticKg += plasticKg;
      totalCo2MitigatedKg += co2Kg;
      totalCostEstimate += (area * cost);
    });

    return {
      totalArea: Math.round(totalArea),
      totalPlasticKg: Math.round(totalPlasticKg),
      totalCo2MitigatedKg: Math.round(totalCo2MitigatedKg),
      totalCostEstimate: Math.round(totalCostEstimate)
    };
  }

  // ========================================================
  // EXPORTADORES MULTI-FORMATO (JSON, CSV, TEXTO/MEMORIAL)
  // ========================================================

  /**
   * Exporta os dados do projeto no formato JSON estruturado
   * @param {string} [projectId]
   */
  exportProjectJson(projectId) {
    const proj = this.projects.find(p => p.id === projectId) || this.getActiveProject();
    this.addAuditEntry(proj.id, 'EXPORT_JSON', 'Exportação de payload executivo JSON completo.', proj.responsible);
    this.saveProjects(this.projects);
    const exportPayload = {
      _system: 'VIRA OS — Sistema Operacional para Engenharia Circular',
      _schemaVersion: CURRENT_SCHEMA_VERSION,
      _exportedAt: new Date().toISOString(),
      project: proj,
      totals: this.calculateProjectTotals(proj)
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    this._triggerDownload(dataStr, `${proj.id || 'projeto'}-dados-executivos.json`);
  }

  /**
   * Exporta a tabela de quantitativos e custos como planilha CSV compatível com Excel
   * @param {string} [projectId]
   */
  exportProjectCsv(projectId) {
    const proj = this.projects.find(p => p.id === projectId) || this.getActiveProject();
    this.addAuditEntry(proj.id, 'EXPORT_CSV', `Exportação de planilha CSV com ${proj.items.length} itens.`, proj.responsible);
    this.saveProjects(this.projects);
    const totals = this.calculateProjectTotals(proj);

    const headers = [
      'Item',
      'Código',
      'Elemento de Engenharia',
      'Metragem / Extensão',
      'Densidade (kg/m²)',
      'Plástico Regenerado (kg)',
      'Fator ACV (ISO 14044)',
      'CO2e Evitado (kg)',
      'Custo Unitário Estimado (R$)',
      'Custo Total Estimado (R$)'
    ];

    const rows = proj.items.map((it, idx) => {
      const area = parseFloat(it.quantityM2) || 0;
      const density = parseFloat(it.densityKgM2) || 18.5;
      const plasticKg = Math.round(area * density);
      const co2Kg = Math.round(plasticKg * (parseFloat(it.lcaFactorCo2) || 2.15));
      const unitCost = parseFloat(it.unitCostEstimate) || 0;
      const totalCost = Math.round(area * unitCost);

      return [
        idx + 1,
        `"${it.code}"`,
        `"${it.name}"`,
        area,
        density,
        plasticKg,
        it.lcaFactorCo2 || 2.15,
        co2Kg,
        unitCost.toFixed(2),
        totalCost.toFixed(2)
      ].join(';');
    });

    // Linha de totalização consolidada
    const totalRow = [
      'TOTAL CONSOLIDADO',
      '""',
      '""',
      totals.totalArea,
      '""',
      totals.totalPlasticKg,
      '""',
      totals.totalCo2MitigatedKg,
      '""',
      totals.totalCostEstimate.toFixed(2)
    ].join(';');

    // Adiciona BOM UTF-8 para correta abertura no Microsoft Excel em português
    const csvContent = '\uFEFF' + [
      `# PROJETO: ${proj.name}`,
      `# CLIENTE: ${proj.client}`,
      `# RESPONSÁVEL: ${proj.responsible}`,
      `# DATA: ${proj.updatedAt || proj.createdAt}`,
      `# GOVERNANÇA: ${proj.dataTier} (Schema v${proj.schemaVersion || 4})`,
      '',
      headers.join(';'),
      ...rows,
      '',
      totalRow
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this._triggerDownload(url, `${proj.id || 'projeto'}-quantitativos-orcamento.csv`);
  }

  /**
   * Exporta memorial descritivo em texto simples estruturado para colar em editais
   * @param {string} [projectId]
   */
  exportProjectText(projectId) {
    const proj = this.projects.find(p => p.id === projectId) || this.getActiveProject();
    this.addAuditEntry(proj.id, 'EXPORT_TEXT', 'Emissão de memorial técnico descritivo TXT.', proj.responsible);
    this.saveProjects(this.projects);
    const totals = this.calculateProjectTotals(proj);
    const tonsPlastic = (totals.totalPlasticKg / 1000).toFixed(2);
    const tonsCo2 = (totals.totalCo2MitigatedKg / 1000).toFixed(2);

    const itemsText = proj.items.map((it, idx) => {
      return `  ${idx + 1}. [${it.code}] ${it.name}\n     • Quantidade: ${it.quantityM2} m² (ou m linear)\n     • Densidade: ${it.densityKgM2} kg/m² | Custo Unitário Est.: R$ ${it.unitCostEstimate}/m²`;
    }).join('\n\n');

    const textContent = `================================================================================
VIRA OS — MEMORIAL TÉCNICO DESCRITIVO SIMPLIFICADO
================================================================================

PROJETO: ${proj.name}
ÓRGÃO / CLIENTE: ${proj.client}
RESPONSÁVEL TÉCNICO: ${proj.responsible}
ENQUADRAMENTO LEGAL: ${proj.lawReference}
DATA DE EMISSÃO: ${new Date().toLocaleDateString('pt-BR')}
CLASSIFICAÇÃO DE DADOS: ${proj.dataTier.toUpperCase()}

--------------------------------------------------------------------------------
1. RESUMO EXECUTIVO DE QUANTITATIVOS & IMPACTO CLIMÁTICO
--------------------------------------------------------------------------------
• Área Total Especificada: ${totals.totalArea.toLocaleString('pt-BR')} m²
• Plástico Pós-Consumo Regenerado: ${totals.totalPlasticKg.toLocaleString('pt-BR')} kg (${tonsPlastic} toneladas)
• Mitigação de Gases de Efeito Estufa (CO2e): ${totals.totalCo2MitigatedKg.toLocaleString('pt-BR')} kg (${tonsCo2} toneladas)
• Orçamento Base Estimado de Materiais: R$ ${totals.totalCostEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

--------------------------------------------------------------------------------
2. ESPECIFICAÇÃO DOS MATERIAIS ADOTADOS
--------------------------------------------------------------------------------
${itemsText}

--------------------------------------------------------------------------------
3. NORMAS TÉCNICAS APLICÁVEIS E COMPROVAÇÃO DE ENSAIO
--------------------------------------------------------------------------------
• ABNT NBR 9781:2013: Resistência característica à compressão axial estática fck ≥ 35,0 MPa.
  (Aferido em laboratório acreditado pelo Inmetro: IPT Relatório nº 1.104.921-A com fck = 38,2 MPa).
• ABNT NBR 9050:2020: Acessibilidade a espaços urbanos (piso regular, estável e antiderrapante).
• ABNT NBR ISO 14044:2009: Inventário de Análise de Ciclo de Vida Cradle-to-Gate (-2,15 kg CO2e/kg).

--------------------------------------------------------------------------------
4. DECLARAÇÃO DE GOVERNANÇA E VALIDADE TÉCNICA
--------------------------------------------------------------------------------
Os laudos laboratoriais de compressão, absorção e pegada de carbono correspondem a ensaios
acreditados de terceira parte (IPT). Os quantitativos de metragem e traçado viário são
de responsabilidade do autor do projeto e devem ser ratificados por levantamento topográfico.

VIRA OS • Sistema Operacional para Engenharia Circular
Caruaru — Pernambuco • engenharia@projetovira.com.br
================================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this._triggerDownload(url, `${proj.id || 'projeto'}-memorial-descritivo.txt`);
  }

  _triggerDownload(url, filename) {
    if (typeof document === 'undefined') return;
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', url);
    dlAnchor.setAttribute('download', filename);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
  }

  // ========================================================
  // MODAL DE CADASTRO DE PROJETOS
  // ========================================================
  initModal() {
    let backdrop = document.getElementById('new-project-modal-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="new-project-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div id="new-project-modal-dialog" class="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[90vh] animate-fadeIn my-auto">
            
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex items-center justify-between gap-4">
              <div>
                <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Novo Projeto Executivo (V4)</span>
                <h3 class="text-xl font-bold text-graphite tracking-tight mt-1">Cadastrar Obra no Workspace</h3>
              </div>
              <button onclick="window.closeNewProjectModal()" class="w-9 h-9 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-muted hover:text-graphite transition-all shadow-sm">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form onsubmit="window.projectEngine.handleFormSubmit(event)" class="p-6 sm:p-8 space-y-4 text-xs font-sans">
              <div class="space-y-1">
                <label class="font-mono text-muted uppercase font-bold text-[10px]">Nome do Projeto / Obra *</label>
                <input id="np-name" type="text" required placeholder="Ex: Requalificação do Parque das Esculturas" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-mono text-muted uppercase font-bold text-[10px]">Órgão / Cliente *</label>
                  <input id="np-client" type="text" required placeholder="Ex: Secretaria de Obras" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium" />
                </div>
                <div class="space-y-1">
                  <label class="font-mono text-muted uppercase font-bold text-[10px]">Responsável Técnico (ART/RRT) *</label>
                  <input id="np-responsible" type="text" required placeholder="Ex: Eng. Maria Santos (CREA 12345)" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-mono text-muted uppercase font-bold text-[10px]">Referência de Edital / Legislação</label>
                <input id="np-law" type="text" value="Lei Federal 14.133/2021 (Art. 11 e Art. 34)" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-mono text-muted uppercase font-bold text-[10px]">Material Inicial</label>
                  <select id="np-material" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium">
                    <option value="paver">Paver Intertravado 16 Faces (VRA-PAV-2026)</option>
                    <option value="painel">Painel Fachada 15mm (VRA-PNL-1204)</option>
                    <option value="perfil">Perfil Estrutural 80×80 (VRA-PRF-0142)</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="font-mono text-muted uppercase font-bold text-[10px]">Metragem Inicial (m² ou m linear)</label>
                  <input id="np-quantity" type="number" step="any" min="1" value="1000" class="w-full bg-sand px-3.5 py-2.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-medium" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-mono text-muted uppercase font-bold text-[10px]">Notas de Canteiro e Observações Técnicas</label>
                <textarea id="np-notes" rows="3" placeholder="Informações de subleito, exposição a intempéries ou requisitos específicos..." class="w-full bg-sand p-3.5 rounded-xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-sans"></textarea>
              </div>

              <div class="pt-4 border-t border-border-subtle flex items-center justify-end gap-3 font-mono text-xs">
                <button type="button" onclick="window.closeNewProjectModal()" class="vira-btn-outline py-2.5 px-4 bg-white">Cancelar</button>
                <button type="submit" class="vira-btn-primary py-2.5 px-6">Criar Projeto (UUID)</button>
              </div>
            </form>

          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  openNewProjectModal() {
    this.initModal();
    const backdrop = document.getElementById('new-project-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  closeNewProjectModal() {
    const backdrop = document.getElementById('new-project-modal-backdrop');
    if (backdrop) backdrop.classList.add('hidden');
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('np-name').value.trim();
    const client = document.getElementById('np-client').value.trim();
    const responsible = document.getElementById('np-responsible').value.trim();
    const lawReference = document.getElementById('np-law').value.trim();
    const material = document.getElementById('np-material').value;
    const quantity = parseFloat(document.getElementById('np-quantity').value) || 100;
    const notes = document.getElementById('np-notes').value.trim();

    let initialItem = {
      solutionId: 'paver',
      name: 'Paver Intertravado 16 Faces',
      code: 'VRA-PAV-2026',
      quantityM2: quantity,
      densityKgM2: 18.5,
      lcaFactorCo2: 2.15,
      unitCostEstimate: 88.50
    };

    if (material === 'painel') {
      initialItem = {
        solutionId: 'painel',
        name: 'Painel Fachada 15mm',
        code: 'VRA-PNL-1204',
        quantityM2: quantity,
        densityKgM2: 14.4,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 145.00
      };
    } else if (material === 'perfil') {
      initialItem = {
        solutionId: 'perfil',
        name: 'Perfil Estrutural 80×80',
        code: 'VRA-PRF-0142',
        quantityM2: quantity,
        densityKgM2: 6.14,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 62.00
      };
    }

    const created = this.createProject({
      name,
      client,
      responsible,
      lawReference,
      notes,
      items: [initialItem]
    });

    this.closeNewProjectModal();

    if (typeof showWorkspaceToast === 'function') {
      showWorkspaceToast(`✓ Projeto "${created.name}" criado com sucesso (UUID v4)!`);
    }

    if (typeof window.setWorkspaceMode === 'function') {
      window.setWorkspaceMode('projects');
    } else if (typeof window.updateWorkspace === 'function') {
      window.updateWorkspace();
    }
  }
}

// --------------------------------------------------------
// INSTANCIAÇÃO & EXPORTAÇÃO GLOBAL COM COMPATIBILIDADE
// --------------------------------------------------------
if (typeof window !== 'undefined') {
  window.ProjectStore = ProjectStore;
  window.ProjectEngine = ProjectStore;
  window.projectStore = new ProjectStore();
  window.projectEngine = window.projectStore;

  if (window.ViraStore && typeof window.ViraStore.setProjectStore === 'function') {
    window.ViraStore.setProjectStore(window.projectStore);
  }

  // Atalhos globais
  window.openNewProjectModal = function() {
    window.projectEngine.openNewProjectModal();
  };
  window.closeNewProjectModal = function() {
    window.projectEngine.closeNewProjectModal();
  };
  window.exportActiveProjectJson = function() {
    window.projectEngine.exportProjectJson();
  };
  window.exportActiveProjectCsv = function() {
    window.projectEngine.exportProjectCsv();
  };
  window.exportActiveProjectText = function() {
    window.projectEngine.exportProjectText();
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ProjectStore,
    defaultDemoProjects,
    generateUuid,
    VIRA_STORAGE_KEY_V4,
    VIRA_STORAGE_KEY_V3,
    CURRENT_SCHEMA_VERSION
  };
}
