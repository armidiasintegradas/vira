// ========================================================
// VIRA OS — UNIVERSAL COMMAND LAUNCHER (commandPalette.js)
// Engine 05: O Cérebro Operacional do VIRA OS (⌘K / Ctrl+K)
// Launcher de Produtos, Normas, Laudos, Projetos, Obras, Downloads & Copiloto
// ========================================================

class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filteredItems = [];
    this.searchIndex = this.buildSearchIndex();
    this.initElements();
    this.bindEvents();
  }

  buildSearchIndex() {
    return [
      // 1. PRODUTOS & SOLUÇÕES CIRCULARES
      {
        id: 'sol-paver',
        title: 'Paver Intertravado 16 Faces',
        category: 'Produtos',
        subtitle: 'VRA-PAV-2026 • Pavimentação Holandesa fck ≥ 38,2 MPa para tráfego pesado',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-painel',
        title: 'Painel Arquitetônico 15mm',
        category: 'Produtos',
        subtitle: 'VRA-PNL-1204 • Fachadas Ventiladas & Brises com proteção UV-50+',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('painel'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-perfil',
        title: 'Perfil Estrutural Maciço 80×80',
        category: 'Produtos',
        subtitle: 'VRA-PRF-0142 • Vigas e Decks imunes a cupins, umidade e maresia severa',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('perfil'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-insumo',
        title: 'Composto Micronizado VIRA-HD',
        category: 'Produtos',
        subtitle: 'VRA-MAT-RES-009 • Resina circular micronizada para injeção e extrusão',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('insumo'); setWorkspaceTab('overview'); }
      },

      // 2. NORMAS TÉCNICAS & LEGISLAÇÃO
      {
        id: 'norm-9781',
        title: 'ABNT NBR 9781:2013',
        category: 'Normas',
        subtitle: 'Peças de concreto para pavimentação — Compressão axial fck ≥ 35 MPa',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-9050',
        title: 'ABNT NBR 9050:2020',
        category: 'Normas',
        subtitle: 'Acessibilidade urbana, rampas até 8,33% e coeficiente de atrito BPN 68',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-15575',
        title: 'ABNT NBR 15575:2021',
        category: 'Normas',
        subtitle: 'Desempenho de vedações verticais, fachadas e resistência ao impacto',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('painel'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-14044',
        title: 'ABNT NBR ISO 14044:2009',
        category: 'Normas',
        subtitle: 'Avaliação do Ciclo de Vida (ACV) e metodologia de descarbonização Cradle-to-Gate',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('lca'); }
      },
      {
        id: 'norm-14133',
        title: 'Nova Lei de Licitações (Lei 14.133/2021)',
        category: 'Normas',
        subtitle: 'Art. 11, IV e Art. 34 — Critérios de sustentabilidade e custo de ciclo de vida',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('faq'); }
      },

      // 3. LAUDOS LABORATORIAIS AUDITADOS (IPT)
      {
        id: 'laudo-ipt-pav',
        title: 'Laudo IPT nº 1.104.921-A (Compressão Axial)',
        category: 'Laudos',
        subtitle: 'VIRA-LAB-PAV-003 • 38,2 MPa de média em 20 corpos de prova com certificação digital',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('lab'); }
      },
      {
        id: 'laudo-ipt-abs',
        title: 'Laudo de Absorção e Névoa Salina (< 0,05%)',
        category: 'Laudos',
        subtitle: 'Ensaio de imersão total 24h • Nula absorção de água, zero eflorescência',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('specs'); }
      },
      {
        id: 'laudo-ipt-impacto',
        title: 'Laudo de Impacto e Corpo Mole IPT nº 892.401',
        category: 'Laudos',
        subtitle: 'Energia de impacto 720 J sem trincas para fachada ventilada',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('painel'); setWorkspaceTab('lab'); }
      },

      // 4. PROJETOS EXECUTIVOS & OPERAÇÃO
      {
        id: 'proj-orla',
        title: 'Projeto: Requalificação da Orla de Boa Viagem',
        category: 'Projetos',
        subtitle: 'Prefeitura do Recife • 4.200 m² de Pavers • 80,4 t plástico • 172,9 t CO2e',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('projects'); switchProject('proj-recife-orla'); }
      },
      {
        id: 'proj-caruaru',
        title: 'Projeto: Parque Linear Capibaribe',
        category: 'Projetos',
        subtitle: 'Prefeitura de Caruaru • 2.500 m² de Pavers e 600 m² de Painel Fachada',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('projects'); switchProject('proj-caruaru-linear'); }
      },

      // 5. ACADEMY & GUIAS DE CANTEIRO
      {
        id: 'acad-paver',
        title: 'Academy: Procedimento Executivo de Pavimentação',
        category: 'Academy',
        subtitle: 'Passo a passo em 4 fases: subleito, colchão de areia, assentamento e compactação',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('academy'); }
      },
      {
        id: 'acad-painel',
        title: 'Academy: Montagem de Fachadas Ventiladas',
        category: 'Academy',
        subtitle: 'Estruturação de montantes em alumínio, fixação oculta inox 304 e juntas 4mm',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('painel'); setWorkspaceTab('academy'); }
      },

      // 6. FAQ TÉCNICO & JURÍDICO
      {
        id: 'faq-bus',
        title: 'FAQ: Tráfego de Ônibus e Veículos Comerciais',
        category: 'FAQ',
        subtitle: 'Justificativa para comissões de licitação sobre tráfego pesado comercial',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('faq'); }
      },
      {
        id: 'faq-heat',
        title: 'FAQ: Resistência Térmica e Comportamento ao Sol',
        category: 'FAQ',
        subtitle: 'Temperatura de amolecimento Vicat > 128°C e albedo com índice SRI 42',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('faq'); }
      },

      // 7. OBRAS EXECUTADAS
      {
        id: 'case-recife',
        title: 'Obra: Calçadão da Orla Marítima de Recife',
        category: 'Obras',
        subtitle: '4.200 m² instalados em ambiente salino com zero manutenção em 2 anos',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('cases'); }
      },
      {
        id: 'case-caruaru',
        title: 'Obra: Edifício Tecnológico do Agreste',
        category: 'Obras',
        subtitle: '1.800 m² de fachada ventilada com redução de 4°C na temperatura interna',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('painel'); setWorkspaceTab('cases'); }
      },

      // 8. DOWNLOADS & ATIVOS DE ENGENHARIA
      {
        id: 'down-bim-pav',
        title: 'Download: Família Paramétrica BIM Revit (VRA-BIM-PAV-001)',
        category: 'Downloads',
        subtitle: 'Arquivo .RFA com parâmetros COBie, 5D (custo) e 6D (ACV CO2e)',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('bim'); }
      },
      {
        id: 'down-cad-pav',
        title: 'Download: Pranchas Executivas CAD DWG (VRA-CAD-PAV-002)',
        category: 'Downloads',
        subtitle: 'Cortes estratigráficos 1:10 e 1:20 com integração de piso tátil NBR 9050',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('cad'); }
      },
      {
        id: 'down-zip-all',
        title: 'Download: Pacote Completo de Engenharia (.ZIP 28,4 MB)',
        category: 'Downloads',
        subtitle: 'BIM, CAD, Laudos IPT, Declaração ACV e Texturas PBR 4K',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('downloads'); }
      },

      // 9. COMANDOS DO COPILOTO DE ENGENHARIA
      {
        id: 'cmd-task-praca',
        title: '⚡ Copiloto: Criar memorial para praça de 4.000 m²',
        category: 'Copiloto',
        subtitle: 'Gera automaticamente solução, quantitativos, laudo IPT e minuta de edital',
        action: () => { window.toggleAiPanel(true); if (window.engineeringCopilot) window.engineeringCopilot.executeTaskPrompt('Criar memorial para uma praça de 4.000 m²'); }
      },
      {
        id: 'cmd-task-orla',
        title: '⚡ Copiloto: Dimensionar calçadão para orla marítima',
        category: 'Copiloto',
        subtitle: 'Aplica absorção nula < 0,05% e justifica imunidade à salinidade',
        action: () => { window.toggleAiPanel(true); if (window.engineeringCopilot) window.engineeringCopilot.executeTaskPrompt('Dimensionar calçadão litorâneo para maresia severa'); }
      },
      {
        id: 'cmd-task-14133',
        title: '⚡ Copiloto: Justificar sustentabilidade na Lei 14.133',
        category: 'Copiloto',
        subtitle: 'Redige parecer jurídico com base no Art. 11, IV e Art. 34',
        action: () => { window.toggleAiPanel(true); if (window.engineeringCopilot) window.engineeringCopilot.executeTaskPrompt('Como fundamentar sustentabilidade na Lei 14.133 sem impugnação?'); }
      },

      // 10. AÇÕES RÁPIDAS DO VIRA OS
      {
        id: 'act-new-proj',
        title: '📁 Criar Novo Projeto Executivo',
        category: 'Ações',
        subtitle: 'Cadastrar nova obra com cálculo automatizado de impacto e quantitativos',
        action: () => { window.openNewProjectModal(); }
      },
      {
        id: 'act-compare',
        title: '📊 Comparador Técnico Multivariado',
        category: 'Ações',
        subtitle: 'Matriz comparativa: VIRA vs Concreto vs Asfalto vs Madeira com cadeia de evidências',
        action: () => { window.openComparatorModal(); }
      },
      {
        id: 'act-export',
        title: '📑 Exportar Caderno de Encargos do Projeto',
        category: 'Ações',
        subtitle: 'Gera documento oficial com perfis de Licitação, Executivo, Cliente e ESG',
        action: () => { window.openProjectExporterModal(); }
      },
      {
        id: 'act-art',
        title: '📞 Falar com o Responsável Técnico (ART)',
        category: 'Ações',
        subtitle: 'Eng. Marcelo Albuquerque, M.Sc. (CREA-PE 048291-D)',
        action: () => { if (typeof setWorkspaceMode === 'function') setWorkspaceMode('solutions'); setWorkspaceSolution('paver'); setWorkspaceTab('support'); }
      }
    ];
  }

  initElements() {
    let backdrop = document.getElementById('cmd-palette-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="cmd-palette-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-start justify-center pt-16 px-4">
          <div id="cmd-palette-dialog" class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-mono text-xs max-h-[85vh] animate-fadeIn">
            
            <!-- Barra de Busca do Launcher -->
            <div class="flex items-center gap-3 px-5 py-4 border-b border-border-subtle bg-sand">
              <i data-lucide="terminal" class="w-4 h-4 text-forest shrink-0"></i>
              <input id="cmd-palette-input" type="text" placeholder="Buscar produtos, normas, laudos, projetos, obras ou disparar comandos (ex: PAV, IPT, 9781, Copiloto)..." class="w-full bg-transparent text-graphite placeholder:text-muted/60 focus:outline-none text-xs font-mono font-medium" autocomplete="off" />
              <kbd class="px-2 py-1 rounded bg-white border border-border-subtle text-[10px] text-muted font-bold shadow-sm">ESC</kbd>
            </div>

            <!-- Lista de Resultados do Launcher -->
            <div id="cmd-palette-results" class="overflow-y-auto p-2 space-y-1 divide-y divide-black/5 divide-y-reverse max-h-[55vh]">
              <!-- Injetado dinamicamente -->
            </div>

            <!-- Rodapé de Comandos e Atalhos -->
            <div class="flex items-center justify-between px-5 py-3 border-t border-border-subtle bg-sand text-[11px] text-muted font-mono">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↑</kbd> <kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↓</kbd> Navegar</span>
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↵</kbd> Executar</span>
              </div>
              <div class="flex items-center gap-1.5 text-forest font-bold">
                <span class="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
                <span>VIRA OS Launcher v4.0</span>
              </div>
            </div>

          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  bindEvents() {
    // Tecla de atalho global: ⌘K ou Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    const backdrop = document.getElementById('cmd-palette-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    const input = document.getElementById('cmd-palette-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.filter(e.target.value);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSelected();
        }
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-palette-input');
    if (backdrop && input) {
      backdrop.classList.remove('hidden');
      this.isOpen = true;
      input.value = '';
      this.filter('');
      setTimeout(() => input.focus(), 50);
      if (window.lucide) {
        lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
      }
    }
  }

  close() {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    if (backdrop) {
      backdrop.classList.add('hidden');
      this.isOpen = false;
    }
  }

  filter(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.filteredItems = this.searchIndex;
    } else {
      this.filteredItems = this.searchIndex.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.subtitle.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q);
      });
    }
    this.selectedIndex = 0;
    this.renderResults();
  }

  moveSelection(delta) {
    if (this.filteredItems.length === 0) return;
    this.selectedIndex = (this.selectedIndex + delta + this.filteredItems.length) % this.filteredItems.length;
    this.renderResults();
    const activeEl = document.querySelector('.cmd-item-selected');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeSelected() {
    if (this.filteredItems.length > 0 && this.filteredItems[this.selectedIndex]) {
      const item = this.filteredItems[this.selectedIndex];
      this.close();
      item.action();
    }
  }

  renderResults() {
    const container = document.getElementById('cmd-palette-results');
    if (!container) return;

    if (this.filteredItems.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-muted font-mono text-xs">
          <i data-lucide="alert-circle" class="w-6 h-6 mx-auto mb-2 text-muted/60"></i>
          <p>Nenhum ativo, norma ou ação encontrada com esses termos.</p>
          <p class="text-[10px] text-muted/60 mt-1">Tente buscar por "PAV", "9781", "IPT", "Orla" ou "Copiloto".</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
      return;
    }

    container.innerHTML = this.filteredItems.map((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      let badgeClass = 'bg-black/5 text-graphite';
      if (item.category === 'Produtos') badgeClass = 'bg-forest/10 text-forest font-bold';
      if (item.category === 'Normas') badgeClass = 'bg-blue-600/10 text-blue-700 font-bold';
      if (item.category === 'Laudos') badgeClass = 'bg-emerald-600/10 text-emerald-800 font-bold';
      if (item.category === 'Projetos') badgeClass = 'bg-ochre/10 text-ochre font-bold';
      if (item.category === 'Academy') badgeClass = 'bg-amber-600/10 text-amber-800 font-bold';
      if (item.category === 'FAQ') badgeClass = 'bg-cyan-600/10 text-cyan-800 font-bold';
      if (item.category === 'Obras') badgeClass = 'bg-teal-600/10 text-teal-800 font-bold';
      if (item.category === 'Downloads') badgeClass = 'bg-indigo-600/10 text-indigo-700 font-bold';
      if (item.category === 'Copiloto') badgeClass = 'bg-purple-600/10 text-purple-700 font-bold';
      if (item.category === 'Ações') badgeClass = 'bg-graphite/10 text-graphite font-bold';

      return `
        <div data-cmd-index="${idx}" class="p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${isSelected ? 'bg-forest/10 border border-forest/30 cmd-item-selected' : 'hover:bg-sand border border-transparent'}">
          <div class="space-y-0.5 min-w-0">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[9px] uppercase font-mono ${badgeClass}">${item.category}</span>
              <h4 class="text-xs font-bold text-graphite truncate">${item.title}</h4>
            </div>
            <p class="text-[11px] text-muted truncate font-sans">${item.subtitle}</p>
          </div>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 ${isSelected ? 'text-forest' : 'text-muted/40'} shrink-0"></i>
        </div>
      `;
    }).join('');

    // Bind click nos itens
    container.querySelectorAll('[data-cmd-index]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-cmd-index'), 10);
        this.selectedIndex = idx;
        this.executeSelected();
      });
    });

    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }
}

// Instância singleton global do Launcher do VIRA OS
window.commandPalette = new CommandPalette();
window.openCommandPalette = function() {
  window.commandPalette.open();
};
