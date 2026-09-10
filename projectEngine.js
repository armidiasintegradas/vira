// ========================================================
// PLATAFORMA VIRA NEXT — PROJECT ENGINE (projectEngine.js)
// Gerenciador de Projetos Executivos, Quantitativos & Persistência Local
// ========================================================

const VIRA_STORAGE_KEY = 'VIRA_PROJECTS_STORE_V3';

// --------------------------------------------------------
// PROJETOS DEMONSTRATIVOS PRÉ-CONFIGURADOS (CASOS REAIS)
// --------------------------------------------------------
const defaultDemoProjects = [
  {
    id: 'proj-recife-orla',
    name: 'Requalificação Urbana da Orla de Boa Viagem',
    client: 'Prefeitura do Recife — Secretaria de Infraestrutura',
    responsible: 'Eng. Roberto Silveira (CREA-PE 052.190-D)',
    lawReference: 'Termo de Referência nº 042/2026 — Lei 14.133/2021',
    createdAt: '15/08/2026',
    updatedAt: '05/09/2026',
    status: 'Em Licitação',
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
        quantityM2: 450, // metros lineares
        densityKgM2: 6.14,
        lcaFactorCo2: 2.15,
        unitCostEstimate: 62.00
      }
    ]
  },
  {
    id: 'proj-caruaru-linear',
    name: 'Parque Linear Capibaribe — Setor Industrial',
    client: 'Prefeitura Municipal de Caruaru — Secretaria de Urbanismo',
    responsible: 'Arq. Larissa Mendonça (CAU-PE A92.311-2)',
    lawReference: 'Edital de Concorrência Pública nº 018/2026',
    createdAt: '22/07/2026',
    updatedAt: '02/09/2026',
    status: 'Projeto Aprovado',
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
    ]
  }
];

// --------------------------------------------------------
// MOTOR DE ARMAZENAMENTO E PERSISTÊNCIA (LOCALSTORAGE)
// --------------------------------------------------------
class ProjectEngine {
  constructor() {
    this.projects = this.loadProjects();
    this.activeProjectId = this.projects.length > 0 ? this.projects[0].id : null;
  }

  loadProjects() {
    try {
      const stored = localStorage.getItem(VIRA_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Erro ao carregar projetos do localStorage, usando padrões:', e);
    }
    this.saveProjects(defaultDemoProjects);
    return JSON.parse(JSON.stringify(defaultDemoProjects));
  }

  saveProjects(projectsList) {
    try {
      localStorage.setItem(VIRA_STORAGE_KEY, JSON.stringify(projectsList));
    } catch (e) {
      console.error('Erro ao salvar projetos no localStorage:', e);
    }
  }

  getProjects() {
    return this.projects;
  }

  getActiveProject() {
    return this.projects.find(p => p.id === this.activeProjectId) || this.projects[0];
  }

  setActiveProject(id) {
    const proj = this.projects.find(p => p.id === id);
    if (proj) {
      this.activeProjectId = id;
      return proj;
    }
    return null;
  }

  createProject(data) {
    const newProj = {
      id: 'proj-' + Date.now().toString(36),
      name: data.name || 'Novo Projeto Executivo',
      client: data.client || 'Órgão / Cliente Não Informado',
      responsible: data.responsible || 'Responsável Técnico',
      lawReference: data.lawReference || 'Lei 14.133/2021',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      updatedAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Em Elaboração',
      notes: data.notes || '',
      items: data.items || []
    };
    this.projects.unshift(newProj);
    this.activeProjectId = newProj.id;
    this.saveProjects(this.projects);
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
      this.saveProjects(this.projects);
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
    return true;
  }

  addItemToProject(projectId, item) {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj) return null;

    proj.items.push({
      solutionId: item.solutionId || 'paver',
      name: item.name || 'Item de Engenharia',
      code: item.code || 'VRA-GEN',
      quantityM2: parseFloat(item.quantityM2) || 100,
      densityKgM2: parseFloat(item.densityKgM2) || 18.5,
      lcaFactorCo2: 2.15,
      unitCostEstimate: parseFloat(item.unitCostEstimate) || 85.0
    });
    proj.updatedAt = new Date().toLocaleDateString('pt-BR');
    this.saveProjects(this.projects);
    return proj;
  }

  removeItemFromProject(projectId, itemIndex) {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj || !proj.items[itemIndex]) return null;

    proj.items.splice(itemIndex, 1);
    proj.updatedAt = new Date().toLocaleDateString('pt-BR');
    this.saveProjects(this.projects);
    return proj;
  }

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

  exportProjectJson(projectId) {
    const proj = this.projects.find(p => p.id === projectId) || this.getActiveProject();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(proj, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${proj.id}-caderno-tecnico-vira.json`);
    dlAnchor.click();
  }

  initModal() {
    let backdrop = document.getElementById('new-project-modal-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="new-project-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div id="new-project-modal-dialog" class="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[90vh] animate-fadeIn my-auto">
            
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex items-center justify-between gap-4">
              <div>
                <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Novo Projeto Executivo</span>
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
                <button type="submit" class="vira-btn-primary py-2.5 px-6">Criar Projeto</button>
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
      showWorkspaceToast(`✓ Projeto "${created.name}" criado com sucesso!`);
    }

    if (typeof window.setWorkspaceMode === 'function') {
      window.setWorkspaceMode('projects');
    } else if (typeof window.updateWorkspace === 'function') {
      window.updateWorkspace();
    }
  }
}

// Instância singleton global do motor de projetos
window.projectEngine = new ProjectEngine();
window.openNewProjectModal = function() {
  window.projectEngine.openNewProjectModal();
};
window.closeNewProjectModal = function() {
  window.projectEngine.closeNewProjectModal();
};

