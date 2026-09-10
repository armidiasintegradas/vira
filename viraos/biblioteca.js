// ========================================================
// VIRA OS — CONTROLADOR DA BIBLIOTECA TÉCNICA (biblioteca.js)
// Sistema de Especificação, Downloads e Engenharia de Ativos
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initTechnicalLibrary();
});

// --------------------------------------------------------
// BASE DE DADOS DOS ATIVOS TÉCNICOS DE ENGENHARIA (CATÁLOGO)
// --------------------------------------------------------
const technicalAssets = [
  {
    id: 'BIM-VRA-PVR-16F',
    code: 'BIM-VRA-PVR-01',
    title: 'Família Paramétrica BIM: Paver Intertravado 16 Faces',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    material: 'paver',
    materialLabel: 'Paver 16 Faces',
    format: 'RVT / IFC',
    formatClass: 'format-rvt',
    size: '14.2 MB',
    version: 'v2026.1',
    date: '15/08/2026',
    norm: 'ABNT NBR 9781:2013',
    software: 'Revit 2021-2026, ArchiCAD, Navisworks',
    desc: 'Família paramétrica completa contendo padronização dimensional (200x100x60mm), propriedades térmicas, rugosidade superficial, parâmetros de carbono incorporado (LCA/ACV) e propriedades mecânicas (fck ≥ 35 MPa) integradas para cálculo BIM 5D/6D.',
    specText: 'Pavimento intertravado constituído por blocos maciços de compósito polimérico circular de alta densidade VIRA, geometria 16 faces holandês autobloqueante, espessura 60 mm, dimensões nominais 200 × 100 mm, resistência característica à compressão fck ≥ 35 MPa (ABNT NBR 9781:2013), absorção de água inferior a 0,05%, assentado sobre colchão de areia grossa e juntas seladas com areia fina de sílica.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'CAD-VRA-PVR-DET',
    code: 'CAD-VRA-PVR-02',
    title: 'Detalhamento Construtivo CAD: Corte, Guias e Encontros de Paver',
    category: 'cad',
    categoryLabel: 'Desenhos Técnicos (DWG)',
    material: 'paver',
    materialLabel: 'Paver 16 Faces',
    format: 'DWG / DXF',
    formatClass: 'format-dwg',
    size: '4.8 MB',
    version: 'v2.4',
    date: '10/08/2026',
    norm: 'ABNT NBR 9781 / NBR 9050',
    software: 'AutoCAD 2018+, Civil 3D, MicroStation',
    desc: 'Prancha executiva com detalhes típicos em escala 1:10 e 1:20: subleito compactado, sub-base graduada, camada de assentamento, contenções laterais de concreto/polímero, declividades transversais para drenagem pluvial e detalhes de piso tátil integrado (NBR 9050).',
    specText: 'Execução de pavimento intertravado de compósito polimérico VIRA conforme projeto executivo. Espessura de colchão de areia de assentamento: 30 a 50 mm descompactado. Contenções laterais em guias pré-moldadas ou perfis poliméricos estruturais VIRA 80x80 fixados com estacas metálicas a cada 1,50 m.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'LAU-VRA-PVR-NBR9781',
    code: 'LAU-VRA-ENG-03',
    title: 'Laudo Mecânico Auditado: Compressão, Abrasão e Estanqueidade',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    material: 'paver',
    materialLabel: 'Paver 16 Faces',
    format: 'PDF Certificado',
    formatClass: 'format-pdf',
    size: '1.9 MB',
    version: '2026-AB',
    date: '28/07/2026',
    norm: 'ABNT NBR 9781:2013 / IPT',
    software: 'Leitor PDF / ICP-Brasil Assinatura Digital',
    desc: 'Ensaio laboratorial acreditado comprovando: Resistência média à compressão axial de 38,2 MPa (excedendo o mínimo de 35 MPa para tráfego pesado); Desgaste por abrasão de 0,82 mm; Absorção de água nula (< 0,05%); Resistência a ciclos de gelo/degelo e imersão em solução salina a 5%.',
    specText: 'Laudo de Conformidade Técnica Laboratorial emitido segundo as diretrizes de ensaio da ABNT NBR 9781:2013. Amostras ensaiadas demonstraram resistência à compressão fck superior a 35,0 MPa, ausência de eflorescência superficial e imunidade à degradação por cloretos.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf'
  },
  {
    id: 'MEM-VRA-LICIT-PAVER',
    code: 'MEM-VRA-LIC-04',
    title: 'Memorial Descritivo Padronizado para Licitações e Concorrências',
    category: 'memorial',
    categoryLabel: 'Memoriais Descritivos',
    material: 'paver',
    materialLabel: 'Paver 16 Faces',
    format: 'DOCX / PDF',
    formatClass: 'format-docx',
    size: '840 KB',
    version: 'v2026.3',
    date: '02/09/2026',
    norm: 'Lei 14.133/2021 (Nova Lei de Licitações)',
    software: 'Microsoft Word, LibreOffice, Adobe Acrobat',
    desc: 'Texto técnico e jurídico pronto para inclusão em termos de referência de editais de obras públicas municipais e estaduais, fundamentado nos critérios de sustentabilidade e compras públicas circulares da Lei Federal 14.133/2021.',
    specText: 'Item Orçamentário: Fornecimento e assentamento de pavimento intertravado de base circular polimérica sustentável (NBR 9781), espessura 60 mm, com garantia decenal contra deformações plásticas, acompanhado de Passaporte Digital de Produto (DPP) com laudo de rastreabilidade de resíduo pós-consumo.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf'
  },
  {
    id: 'BIM-VRA-PRD-15MM',
    code: 'BIM-VRA-PRD-05',
    title: 'Objeto BIM Revit: Painel Arquitetônico Plano 15mm para Fachadas',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    material: 'painel',
    materialLabel: 'Painel Plano 15mm',
    format: 'RVT / IFC',
    formatClass: 'format-rvt',
    size: '11.5 MB',
    version: 'v2026.1',
    date: '20/08/2026',
    norm: 'ABNT NBR 15575',
    software: 'Revit 2021-2026, Archicad 24+',
    desc: 'Componente paramétrico de painel para fachadas ventiladas, brises e divisórias. Inclui cálculo de juntas de dilatação de 4mm, subestrutura de fixação em montantes de alumínio e propriedades acústicas de atenuação ponderada.',
    specText: 'Revestimento de fachada ventilada ou fechamento arquitetônico através de painéis maciços VIRA de compósito circular polimérico de 15 mm de espessura, dimensões 2440 × 1220 mm, aditivação UV-50+ anti-envelhecimento, módulo de elasticidade 1.450 MPa e resistência ao impacto de corpo mole classe 5 (NBR 15575).',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'CAD-VRA-PRD-FIX',
    code: 'CAD-VRA-PRD-06',
    title: 'Detalhes Construtivos: Fixação Oculta e Brises de Fachada',
    category: 'cad',
    categoryLabel: 'Desenhos Técnicos (DWG)',
    material: 'painel',
    materialLabel: 'Painel Plano 15mm',
    format: 'DWG / DXF',
    formatClass: 'format-dwg',
    size: '3.6 MB',
    version: 'v1.8',
    date: '14/08/2026',
    norm: 'ABNT NBR 15575',
    software: 'AutoCAD 2018+, DWG TrueView',
    desc: 'Detalhamento de sistemas de fixação invisível com inserts metálicos em aço inoxidável 304, esquadrias de sustentação, pingadeiras superiores e encontros com esquadrias.',
    specText: 'Subestrutura em perfis T e L de alumínio extrudado liga 6063-T5 ancorados na estrutura principal de concreto por chumbadores químicos. Painéis VIRA fixados com presilhas mecânicas ocultas e fitas estruturais de dupla face de alta adesão.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'BIM-VRA-LTE-80X80',
    code: 'BIM-VRA-LTE-07',
    title: 'Família BIM Estrutural: Perfil Maciço 80×80 para Decks e Pérgolas',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    material: 'perfil',
    materialLabel: 'Perfil 80×80',
    format: 'RVT / IFC',
    formatClass: 'format-rvt',
    size: '9.8 MB',
    version: 'v2026.2',
    date: '11/08/2026',
    norm: 'Cálculo Estrutural NBR 7190 (adaptado)',
    software: 'Revit 2021-2026, Robot Structural Analysis',
    desc: 'Vigas e colunas lineares maciças com propriedades de inércia geométrica, módulo de ruptura à flexão de 38,5 MPa e coeficientes de expansão térmica calibrados para cálculo de vãos de até 1,80 m sem flecha perceptível.',
    specText: 'Perfis estruturais maciços VIRA de seção quadrada 80 × 80 mm em compósito polimérico industrial de alta densidade, resistente à intempérie marinha e imunidade absoluta a cupins e fungos xilófagos, utilizados como barrotes estruturais para decks elevados e pergolados urbanos.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'PBR-VRA-TEXTURES',
    code: 'PBR-VRA-TEX-08',
    title: 'Pack PBR Maps: Texturas Realistas 4K (Albedo, Normal, Roughness, AO)',
    category: 'pbr',
    categoryLabel: 'Mapas PBR & Texturas 4K',
    material: 'geral',
    materialLabel: 'Todas as Linhas',
    format: 'ZIP 4K Maps',
    formatClass: 'format-zip',
    size: '68.4 MB',
    version: 'v2026.1',
    date: '05/08/2026',
    norm: 'PBR Specular / Glossiness & Metalness Workflow',
    software: '3ds Max, V-Ray, Corona, Lumion, Twinmotion, Blender, Enscape',
    desc: 'Mapas de textura contínua (seamless) sem repetição visível calibrados a partir de escaneamento fotogramétrico dos pavers e painéis VIRA em alta resolução (4096 × 4096 px), incluindo mapas de cor (BaseColor), rugosidade (Roughness), relevo (Normal DirectX/OpenGL) e oclusão de ambiente (AO).',
    specText: 'Shaders e materiais realistas calibrados para renderização arquitetônica foto-realista (ArchViz) com reflectância física correta das misturas poliméricas minerais cinza grafite, concreto e ocre.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip'
  },
  {
    id: 'MAT-VRA-HD-REO',
    code: 'MAT-VRA-RES-09',
    title: 'Ficha Técnica de Homologação de Resina: Composto VIRA-HD',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    material: 'insumo',
    materialLabel: 'Composto VIRA-HD',
    format: 'PDF Técnico',
    formatClass: 'format-pdf',
    size: '1.4 MB',
    version: 'v2026.2',
    date: '22/08/2026',
    norm: 'ASTM D1238 / ISO 1133 / ASTM D792',
    software: 'Leitor PDF',
    desc: 'Boletim técnico completo para indústrias transformadoras contendo curva reológica de viscosidade, ensaio de índice de fluidez MFI (190°C/2.16kg), análise termogravimétrica (TGA), densidade por imersão (0,955 g/cm³) e laudo de isenção de metais pesados (RoHS).',
    specText: 'Composto polimérico termoplástico reciclado VIRA-HD micronizado, base PEAD/PP, granulometria regular 3mm, índice de fluidez 2,4 g/10min, pureza polimérica mínima 99,4%, fornecido em Big Bags de 1.000 kg paletizados com laudo de lote assinado.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf'
  },
  {
    id: 'ACV-VRA-PE-CARB',
    code: 'ACV-VRA-MET-10',
    title: 'Relatório ACV de Descarbonização: Fatores de Emissão Evitada de CO2e',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    material: 'geral',
    materialLabel: 'Todas as Linhas',
    format: 'PDF Certificado',
    formatClass: 'format-pdf',
    size: '2.8 MB',
    version: 'v2026.1',
    date: '18/08/2026',
    norm: 'ISO 14040 / ISO 14044 (ACV Cradle-to-Gate)',
    software: 'Leitor PDF',
    desc: 'Estudo de Análise de Ciclo de Vida do berço ao portão (Cradle-to-Gate) demonstrando a pegada negativa de carbono dos artefatos VIRA. Cada tonelada de compósito produzido evita 2,15 toneladas de emissão de CO2e quando comparado ao processamento de resinas virgens de nafta de petróleo.',
    specText: 'Relatório de Avaliação do Ciclo de Vida elaborado conforme as normas ABNT NBR ISO 14040 e 14044. O balanço energético e de emissões auditado valida o crédito de carbono evitado de 2,15 kg CO2e/kg nos memoriais de sustentabilidade.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf'
  }
];

// --------------------------------------------------------
// MOTOR DE BUSCA, FILTROS FACETADOS E INTERATIVIDADE
// --------------------------------------------------------
function initTechnicalLibrary() {
  const container = document.getElementById('assets-grid');
  const counterEl = document.getElementById('assets-count');
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.querySelectorAll('[data-cat-filter]');
  const materialFilters = document.querySelectorAll('[data-mat-filter]');
  const resetBtn = document.getElementById('reset-filters-btn');

  let currentCategory = 'all';
  let currentMaterial = 'all';
  let searchQuery = '';

  function renderAssets() {
    if (!container) return;

    const filtered = technicalAssets.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchMat = currentMaterial === 'all' || item.material === currentMaterial;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.norm.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.materialLabel.toLowerCase().includes(q);

      return matchCat && matchMat && matchSearch;
    });

    if (counterEl) {
      counterEl.innerText = filtered.length;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-4 bg-sand rounded-3xl border border-border-subtle p-8">
          <i data-lucide="search-x" class="w-12 h-12 text-muted mx-auto"></i>
          <h3 class="text-xl font-bold text-graphite">Nenhum ativo técnico encontrado</h3>
          <p class="text-xs text-muted max-w-md mx-auto">
            Tente remover alguns filtros ou buscar por palavras-chave mais abrangentes como "ABNT", "BIM", "Paver" ou "DWG".
          </p>
          <button onclick="window.resetAllFilters()" class="vira-btn-primary py-2 px-5 text-xs inline-flex items-center gap-2 mt-2">
            <span>Redefinir Filtros</span>
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
      return;
    }

    container.innerHTML = filtered.map(item => {
      return `
        <article class="vira-card flex flex-col justify-between space-y-6 group hover:border-forest/40 transition-all" data-asset-id="${item.id}">
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-3 border-b border-black/5 pb-4">
              <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${getFormatBadgeStyle(item.format)}">
                ${item.format}
              </span>
              <span class="font-mono text-[11px] text-muted tracking-tight">${item.code}</span>
            </div>

            <div class="space-y-1.5">
              <span class="text-[11px] font-mono uppercase text-forest font-semibold">${item.materialLabel}</span>
              <h3 class="text-lg font-bold text-graphite leading-snug group-hover:text-forest transition-colors">
                ${item.title}
              </h3>
            </div>

            <p class="text-xs text-muted leading-relaxed line-clamp-3">
              ${item.desc}
            </p>
          </div>

          <div class="space-y-4 pt-4 border-t border-black/5">
            <div class="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>Norma: <strong class="text-graphite">${item.norm}</strong></span>
              <span>${item.size}</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="openAssetDrawer('${item.id}')" class="py-2.5 px-3 rounded-xl border border-border-subtle bg-sand hover:bg-white text-graphite text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <i data-lucide="info" class="w-3.5 h-3.5"></i>
                <span>Metadados</span>
              </button>

              <a href="${item.downloadUrl}" download class="py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Baixar</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  function getFormatBadgeStyle(fmt) {
    if (fmt.includes('RVT')) return 'bg-forest/15 text-forest border border-forest/20';
    if (fmt.includes('DWG')) return 'bg-ochre/15 text-ochre border border-ochre/20';
    if (fmt.includes('PDF')) return 'bg-graphite/10 text-graphite border border-graphite/15';
    if (fmt.includes('DOCX')) return 'bg-blue-600/10 text-blue-700 border border-blue-600/15';
    return 'bg-sand text-muted border border-border-subtle';
  }

  // Event Listeners de Filtro
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.forEach(b => {
        b.classList.remove('bg-graphite', 'text-white', 'active');
        b.classList.add('text-muted');
      });
      btn.classList.remove('text-muted');
      btn.classList.add('bg-graphite', 'text-white', 'active');
      currentCategory = btn.getAttribute('data-cat-filter');
      renderAssets();
    });
  });

  materialFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      materialFilters.forEach(b => {
        b.classList.remove('bg-forest', 'text-white', 'active');
        b.classList.add('text-muted');
      });
      btn.classList.remove('text-muted');
      btn.classList.add('bg-forest', 'text-white', 'active');
      currentMaterial = btn.getAttribute('data-mat-filter');
      renderAssets();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAssets();
    });
  }

  window.resetAllFilters = function() {
    currentCategory = 'all';
    currentMaterial = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';

    categoryFilters.forEach(b => {
      if (b.getAttribute('data-cat-filter') === 'all') {
        b.classList.add('bg-graphite', 'text-white', 'active');
        b.classList.remove('text-muted');
      } else {
        b.classList.remove('bg-graphite', 'text-white', 'active');
        b.classList.add('text-muted');
      }
    });

    materialFilters.forEach(b => {
      if (b.getAttribute('data-mat-filter') === 'all') {
        b.classList.add('bg-forest', 'text-white', 'active');
        b.classList.remove('text-muted');
      } else {
        b.classList.remove('bg-forest', 'text-white', 'active');
        b.classList.add('text-muted');
      }
    });

    renderAssets();
  };

  if (resetBtn) resetBtn.addEventListener('click', window.resetAllFilters);

  renderAssets();
}

// --------------------------------------------------------
// DRAWER DE METADADOS & COPIADOR DE MEMORIAL DE LICITAÇÃO
// --------------------------------------------------------
function openAssetDrawer(assetId) {
  const asset = technicalAssets.find(a => a.id === assetId);
  if (!asset) return;

  const backdrop = document.getElementById('asset-drawer-backdrop');
  const panel = document.getElementById('asset-drawer-panel');

  const titleEl = document.getElementById('drawer-asset-title');
  const codeEl = document.getElementById('drawer-asset-code');
  const formatEl = document.getElementById('drawer-asset-format');
  const descEl = document.getElementById('drawer-asset-desc');
  const normEl = document.getElementById('drawer-asset-norm');
  const softEl = document.getElementById('drawer-asset-software');
  const sizeEl = document.getElementById('drawer-asset-size');
  const dateEl = document.getElementById('drawer-asset-date');
  const specTextEl = document.getElementById('drawer-asset-spectext');
  const downloadLinkEl = document.getElementById('drawer-asset-download');

  if (titleEl) titleEl.innerText = asset.title;
  if (codeEl) codeEl.innerText = asset.code;
  if (formatEl) formatEl.innerText = asset.format;
  if (descEl) descEl.innerText = asset.desc;
  if (normEl) normEl.innerText = asset.norm;
  if (softEl) softEl.innerText = asset.software;
  if (sizeEl) sizeEl.innerText = asset.size;
  if (dateEl) dateEl.innerText = asset.date;
  if (specTextEl) specTextEl.value = asset.specText;
  if (downloadLinkEl) downloadLinkEl.href = asset.downloadUrl;

  if (backdrop && panel) {
    backdrop.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

function closeAssetDrawer() {
  const backdrop = document.getElementById('asset-drawer-backdrop');
  const panel = document.getElementById('asset-drawer-panel');
  if (backdrop) backdrop.classList.remove('open');
  if (panel) panel.classList.remove('open');
  document.body.style.overflow = '';
}

// --------------------------------------------------------
// COPIAR TEXTO DO MEMORIAL PARA CLIPBOARD COM FEEDBACK
// --------------------------------------------------------
function copySpecText() {
  const specTextEl = document.getElementById('drawer-asset-spectext');
  const feedbackEl = document.getElementById('copy-feedback');
  if (!specTextEl) return;

  navigator.clipboard.writeText(specTextEl.value).then(() => {
    if (feedbackEl) {
      feedbackEl.classList.remove('hidden');
      setTimeout(() => feedbackEl.classList.add('hidden'), 3500);
    }
  });
}

// Suporte a ESC para fechar gaveta de metadados
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAssetDrawer();
  }
});
