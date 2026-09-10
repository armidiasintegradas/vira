// ========================================================
// PLATAFORMA VIRA NEXT — UNIVERSAL COMMAND PALETTE (commandPalette.js)
// Busca Universal por Conteúdo, Normas, IDs e Ações Rápidas (⌘K / Ctrl+K)
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
      // Soluções de Engenharia
      {
        id: 'sol-paver',
        title: 'Paver Intertravado 16 Faces',
        category: 'Soluções',
        subtitle: 'VRA-PAV-2026 • Pavimentação Holandesa fck ≥ 35 MPa',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-painel',
        title: 'Painel Arquitetônico 15mm',
        category: 'Soluções',
        subtitle: 'VRA-PNL-1204 • Fachadas Ventiladas & Brises UV-50+',
        action: () => { setWorkspaceSolution('painel'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-perfil',
        title: 'Perfil Estrutural Maciço 80×80',
        category: 'Soluções',
        subtitle: 'VRA-PRF-0142 • Vigas e Decks Imunes a Cupins e Maresia',
        action: () => { setWorkspaceSolution('perfil'); setWorkspaceTab('overview'); }
      },
      {
        id: 'sol-insumo',
        title: 'Composto Micronizado VIRA-HD',
        category: 'Soluções',
        subtitle: 'VRA-MAT-RES-009 • Resina Circular para Injeção Industrial',
        action: () => { setWorkspaceSolution('insumo'); setWorkspaceTab('overview'); }
      },

      // Engineering IDs
      {
        id: 'eng-bim-pav',
        title: 'VIRA-BIM-PAV-001',
        category: 'Engineering IDs',
        subtitle: 'Família Paramétrica BIM Revit 2026 Paver 16 Faces',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('bim'); }
      },
      {
        id: 'eng-cad-pav',
        title: 'VIRA-CAD-PAV-002',
        category: 'Engineering IDs',
        subtitle: 'Pranchas de Detalhamento Executivo CAD DWG (1:10 e 1:20)',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('cad'); }
      },
      {
        id: 'eng-lab-pav',
        title: 'VIRA-LAB-PAV-003',
        category: 'Engineering IDs',
        subtitle: 'Laudo Laboratorial IPT Compressão Axial 38,2 MPa',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('lab'); }
      },
      {
        id: 'eng-mem-pav',
        title: 'VIRA-MEM-PAV-004',
        category: 'Engineering IDs',
        subtitle: 'Memorial Descritivo para Licitação Pública Lei 14.133/2021',
        action: () => { copyWorkspaceSpec(); }
      },
      {
        id: 'eng-bim-pnl',
        title: 'VIRA-BIM-PNL-005',
        category: 'Engineering IDs',
        subtitle: 'Objeto BIM Revit Cortina para Fachadas Ventiladas 15mm',
        action: () => { setWorkspaceSolution('painel'); setWorkspaceTab('bim'); }
      },
      {
        id: 'eng-cad-pnl',
        title: 'VIRA-CAD-PNL-006',
        category: 'Engineering IDs',
        subtitle: 'Detalhamento CAD Fixação Oculta em Inox 304',
        action: () => { setWorkspaceSolution('painel'); setWorkspaceTab('cad'); }
      },
      {
        id: 'eng-bim-prf',
        title: 'VIRA-BIM-PRF-007',
        category: 'Engineering IDs',
        subtitle: 'Perfil Estrutural BIM Maciço 80×80 para Decks',
        action: () => { setWorkspaceSolution('perfil'); setWorkspaceTab('bim'); }
      },
      {
        id: 'eng-tex-all',
        title: 'VIRA-TEX-ALL-008',
        category: 'Engineering IDs',
        subtitle: 'Pack Shaders Texturas PBR 4K (Albedo, Normal, Roughness, AO)',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('downloads'); }
      },
      {
        id: 'eng-mat-res',
        title: 'VIRA-MAT-RES-009',
        category: 'Engineering IDs',
        subtitle: 'Boletim Técnico Reológico & Curva MFI Resina VIRA-HD',
        action: () => { setWorkspaceSolution('insumo'); setWorkspaceTab('lab'); }
      },
      {
        id: 'eng-acv-all',
        title: 'VIRA-ACV-ALL-010',
        category: 'Engineering IDs',
        subtitle: 'Estudo de ACV Cradle-to-Gate (-2,15 kg CO2e / kg) ISO 14044',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('lca'); }
      },

      // Normas Técnicas & Legislação
      {
        id: 'norm-9781',
        title: 'ABNT NBR 9781:2013',
        category: 'Normas',
        subtitle: 'Peças de concreto para pavimentação — Compressão fck ≥ 35 MPa',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-9050',
        title: 'ABNT NBR 9050:2020',
        category: 'Normas',
        subtitle: 'Acessibilidade urbana, rampas e piso tátil antiderrapante BPN 68',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-15575',
        title: 'ABNT NBR 15575:2021',
        category: 'Normas',
        subtitle: 'Desempenho de vedações verticais e fachadas sob impacto',
        action: () => { setWorkspaceSolution('painel'); setWorkspaceTab('standards'); }
      },
      {
        id: 'norm-14044',
        title: 'ABNT NBR ISO 14044:2009',
        category: 'Normas',
        subtitle: 'Metodologia de Avaliação de Ciclo de Vida e descarbonização',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('lca'); }
      },
      {
        id: 'norm-14133',
        title: 'Nova Lei de Licitações (Lei 14.133/2021)',
        category: 'Normas',
        subtitle: 'Art. 11 e Art. 34 — Critérios de compras públicas sustentáveis',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('faq'); }
      },

      // Ações Rápidas de Produtividade
      {
        id: 'act-new-proj',
        title: '⚡ Criar Novo Projeto Executivo',
        category: 'Ações Rápidas',
        subtitle: 'Adicione um novo projeto no seu workspace local com métricas de impacto',
        action: () => { window.openNewProjectModal(); }
      },
      {
        id: 'act-compare',
        title: '📊 Abrir Comparador Técnico Multivariado',
        category: 'Ações Rápidas',
        subtitle: 'Comparativo lado a lado: Compósito VIRA vs Concreto vs Asfalto',
        action: () => { window.openComparatorModal(); }
      },
      {
        id: 'act-ai',
        title: '🤖 Consultar Assistente de Engenharia IA',
        category: 'Ações Rápidas',
        subtitle: 'Tire dúvidas técnicas ancoradas em laudos IPT e normas ABNT',
        action: () => { window.toggleAiPanel(true); }
      },
      {
        id: 'act-export',
        title: '📑 Exportar Caderno de Encargos do Projeto',
        category: 'Ações Rápidas',
        subtitle: 'Emissão consolidada de memorial, lista de pranchas e laudos',
        action: () => { window.openProjectExporterModal(); }
      },
      {
        id: 'act-art',
        title: '📞 Falar com o Responsável Técnico (ART)',
        category: 'Ações Rápidas',
        subtitle: 'Eng. Marcelo Albuquerque, M.Sc. (CREA-PE 048291-D)',
        action: () => { setWorkspaceSolution('paver'); setWorkspaceTab('support'); }
      }
    ];
  }

  initElements() {
    let backdrop = document.getElementById('cmd-palette-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="cmd-palette-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-start justify-center pt-20 px-4">
          <div id="cmd-palette-dialog" class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-mono text-xs max-h-[80vh] animate-fadeIn">
            
            <!-- Barra de Busca -->
            <div class="flex items-center gap-3 px-5 py-4 border-b border-border-subtle bg-sand">
              <i data-lucide="search" class="w-4 h-4 text-forest shrink-0"></i>
              <input id="cmd-palette-input" type="text" placeholder="Buscar por norma, código, laudo, solução ou ação (Ex: 9781, BIM, IPT, Projeto)..." class="w-full bg-transparent text-graphite placeholder:text-muted/60 focus:outline-none text-xs font-mono font-medium" autocomplete="off" />
              <kbd class="px-2 py-1 rounded bg-white border border-border-subtle text-[10px] text-muted font-bold shadow-sm">ESC</kbd>
            </div>

            <!-- Lista de Resultados -->
            <div id="cmd-palette-results" class="overflow-y-auto p-2 space-y-1 divide-y divide-black/5 divide-y-reverse max-h-96">
              <!-- Injetado dinamicamente -->
            </div>

            <!-- Rodapé de Dicas de Teclado -->
            <div class="flex items-center justify-between px-5 py-3 border-t border-border-subtle bg-sand text-[11px] text-muted font-mono">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↑</kbd> <kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↓</kbd> Navegar</span>
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white border border-border-subtle text-[10px]">↵</kbd> Selecionar</span>
              </div>
              <span class="text-forest font-bold">VIRA Universal Command Engine</span>
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
          <p class="text-[10px] text-muted/60 mt-1">Tente buscar por "Paver", "9781", "BIM", "IPT" ou "Projeto".</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
      return;
    }

    container.innerHTML = this.filteredItems.map((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      let badgeClass = 'bg-black/5 text-graphite';
      if (item.category === 'Soluções') badgeClass = 'bg-forest/10 text-forest font-bold';
      if (item.category === 'Engineering IDs') badgeClass = 'bg-ochre/10 text-ochre font-bold';
      if (item.category === 'Normas') badgeClass = 'bg-blue-600/10 text-blue-700 font-bold';
      if (item.category === 'Ações Rápidas') badgeClass = 'bg-purple-600/10 text-purple-700 font-bold';

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

// Instância singleton global do Command Palette
window.commandPalette = new CommandPalette();
window.openCommandPalette = function() {
  window.commandPalette.open();
};
