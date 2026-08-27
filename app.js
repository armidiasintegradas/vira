// ==========================================
// VIRA — BRAND BOOK & INTERACTIVE CORE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initConceptScrolly();
  initCalculator();
  initPassportLookup();
  initProductDrawer();
  initProductFilters();
  initContactForm();
  initFactoryGallery();
});

// ------------------------------------------
// 1. CONCEPT SCROLLYTELLING (#conceito)
// ------------------------------------------
const conceptStages = [
  {
    step: '01',
    from: 'PLÁSTICO',
    to: 'MATÉRIA',
    desc: 'Resíduos plásticos e de alumínio descartados são triados, descontaminados e micronizados em polímeros circulares homogêneos de alto desempenho técnico.',
    badge: 'Fase 01 — Triagem & Micronização',
    metric: '100% Reciclado Pós-Consumo',
    accentColor: '#4A7135'
  },
  {
    step: '02',
    from: 'MATÉRIA',
    to: 'PRODUTO',
    desc: 'Engenharia de materiais e termoextrusão moldam a resina circular em perfis estruturais, placas arquitetônicas e painéis com garantia decenal.',
    badge: 'Fase 02 — Termocompressão',
    metric: '0% Polímero Virgem',
    accentColor: '#C68D2B'
  },
  {
    step: '03',
    from: 'PRODUTO',
    to: 'CIDADE',
    desc: 'Os componentes ganham as ruas em mobiliário urbano, fachadas ventiladas, pisos drenantes e equipamentos públicos desenhados para durar.',
    badge: 'Fase 03 — Aplicação Urbana',
    metric: 'Design Circular & Modular',
    accentColor: '#2A3233'
  },
  {
    step: '04',
    from: 'CIDADE',
    to: 'IMPACTO',
    desc: 'Cada metro quadrado instalado desvia toneladas de resíduos de aterros sanitários e evita emissões maciças de carbono comparado ao concreto e aço.',
    badge: 'Fase 04 — Descarbonização',
    metric: '-2.4 kg CO2e por kg Produzido',
    accentColor: '#698E3C'
  },
  {
    step: '05',
    from: 'IMPACTO',
    to: 'DIGNIDADE',
    desc: 'A economia circular gera renda justa, capacitação técnica e valorização direta para cooperativas e catadores no Agreste Pernambucano.',
    badge: 'Fase 05 — Impacto Humano',
    metric: 'Cooperativas de Caruaru-PE',
    accentColor: '#C68D2B'
  }
];

let currentConceptIndex = 0;

function initConceptScrolly() {
  const fromEl = document.getElementById('concept-from');
  const toEl = document.getElementById('concept-to');
  const descEl = document.getElementById('concept-desc');
  const badgeEl = document.getElementById('concept-badge');
  const metricEl = document.getElementById('concept-metric');
  const stepEl = document.getElementById('concept-step');
  const dotsContainer = document.getElementById('concept-dots');
  const prevBtn = document.getElementById('concept-prev');
  const nextBtn = document.getElementById('concept-next');
  const viraItalic = document.getElementById('concept-vira-word');

  if (!fromEl || !dotsContainer) return;

  dotsContainer.innerHTML = conceptStages.map((_, idx) => {
    return '<button onclick="setConceptStage(' + idx + ')" class="concept-dot h-2 rounded-full transition-all duration-300 ' + (idx === 0 ? 'bg-[#C68D2B] w-6' : 'bg-gray-300 w-2 hover:bg-gray-400') + '" title="Etapa ' + (idx + 1) + '"></button>';
  }).join('');

  window.setConceptStage = function(index) {
    if (index < 0 || index >= conceptStages.length) return;
    currentConceptIndex = index;
    const stage = conceptStages[index];

    fromEl.style.opacity = '0';
    toEl.style.opacity = '0';
    fromEl.style.transform = 'translateY(15px)';
    toEl.style.transform = 'translateY(-15px)';

    setTimeout(() => {
      fromEl.innerText = stage.from;
      toEl.innerText = stage.to;
      descEl.innerText = stage.desc;
      badgeEl.innerText = stage.badge;
      metricEl.innerText = stage.metric;
      stepEl.innerText = stage.step + ' / 05';
      
      if (viraItalic) {
        viraItalic.style.color = stage.accentColor;
      }

      fromEl.style.opacity = '1';
      toEl.style.opacity = '1';
      fromEl.style.transform = 'translateY(0)';
      toEl.style.transform = 'translateY(0)';
    }, 200);

    const dots = dotsContainer.querySelectorAll('.concept-dot');
    dots.forEach((d, idx) => {
      if (idx === index) {
        d.className = 'concept-dot w-6 h-2 rounded-full bg-[#C68D2B] transition-all duration-300';
      } else {
        d.className = 'concept-dot w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300';
      }
    });
  };

  if (prevBtn) prevBtn.addEventListener('click', () => {
    const nextIdx = (currentConceptIndex - 1 + conceptStages.length) % conceptStages.length;
    window.setConceptStage(nextIdx);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    const nextIdx = (currentConceptIndex + 1) % conceptStages.length;
    window.setConceptStage(nextIdx);
  });
}

// ------------------------------------------
// 2. FACTORY PHOTO GALLERY (360° TOUR)
// ------------------------------------------
const factoryViews = {
  'sunset-facade': {
    src: 'assets/factory-sunset-facade.jpg',
    title: 'Fachada Principal ao Entardecer',
    desc: 'Iluminação cênica com a marca VIRA e pórtico de entrada principal em Caruaru-PE.',
    badge: 'Arquitetura & Design Noturno'
  },
  'logistics-truck': {
    src: 'assets/factory-logistics-truck.jpg',
    title: 'Centro de Triagem & Logística Ativa',
    desc: 'Frota dedicada para coleta seletiva em cooperativas e escoamento da produção circular.',
    badge: 'Logística Reversa'
  },
  'portal-front': {
    src: 'assets/factory-portal-front.jpg',
    title: 'Pórtico de Entrada & Silos',
    desc: 'Recepção 6420 e silos industriais para estocagem e homogeneização polimérica.',
    badge: 'Recepção & Infraestrutura'
  },
  'sunset-aerial': {
    src: 'assets/factory-sunset-aerial.jpg',
    title: 'Vista Panorâmica Golden Hour',
    desc: 'Visão integral do complexo com parque solar de telhado e pátio de armazenagem.',
    badge: 'Campus Fabril Solar'
  },
  'wide-day': {
    src: 'assets/factory-wide.jpg',
    title: 'Planta Fabril em Escala Industrial',
    desc: 'Mais de 1.200 toneladas/mês de capacidade instalada de processamento.',
    badge: 'Capacidade de Produção'
  }
};

function initFactoryGallery() {
  const mainImg = document.getElementById('main-factory-view');
  const viewTitle = document.getElementById('factory-view-title');
  const viewDesc = document.getElementById('factory-view-desc');
  const viewBadge = document.getElementById('factory-view-badge');
  const btns = document.querySelectorAll('.gallery-nav-btn');

  if (!mainImg) return;

  window.switchFactoryView = function(viewKey) {
    const data = factoryViews[viewKey];
    if (!data) return;

    mainImg.style.opacity = '0.3';
    mainImg.style.transform = 'scale(0.98)';

    setTimeout(() => {
      mainImg.src = data.src;
      if (viewTitle) viewTitle.innerText = data.title;
      if (viewDesc) viewDesc.innerText = data.desc;
      if (viewBadge) viewBadge.innerText = data.badge;

      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 200);

    btns.forEach(b => {
      if (b.getAttribute('data-view') === viewKey) {
        b.classList.add('border-forest', 'bg-forest/10', 'text-forest');
        b.classList.remove('border-graphite/10', 'bg-white', 'text-muted');
      } else {
        b.classList.remove('border-forest', 'bg-forest/10', 'text-forest');
        b.classList.add('border-graphite/10', 'bg-white', 'text-muted');
      }
    });
  };
}

// ------------------------------------------
// 3. INTERACTIVE IMPACT CALCULATOR
// ------------------------------------------
function initCalculator() {
  const areaSlider = document.getElementById('calc-area');
  const areaValue = document.getElementById('calc-area-val');
  
  const metricPlastic = document.getElementById('calc-res-plastic');
  const metricCo2 = document.getElementById('calc-res-co2');
  const metricBottles = document.getElementById('calc-res-bottles');
  const metricFamilies = document.getElementById('calc-res-families');

  if (!areaSlider) return;

  function updateCalc() {
    const sqMeters = parseFloat(areaSlider.value);
    areaValue.innerText = sqMeters.toLocaleString('pt-BR');

    const plasticKg = Math.round(sqMeters * 18.5);
    const co2Kg = Math.round(plasticKg * 2.15);
    const bottles = Math.round(plasticKg * 50);
    const familiesHours = (plasticKg / 120).toFixed(1);

    metricPlastic.innerText = plasticKg.toLocaleString('pt-BR') + ' kg';
    metricCo2.innerText = co2Kg.toLocaleString('pt-BR') + ' kg';
    metricBottles.innerText = bottles.toLocaleString('pt-BR') + ' un';
    metricFamilies.innerText = familiesHours + ' dias';
  }

  areaSlider.addEventListener('input', updateCalc);
  updateCalc();

  window.setCalcPreset = function(val) {
    areaSlider.value = val;
    updateCalc();
  };
}

// ------------------------------------------
// 4. DIGITAL PRODUCT PASSPORT (DPP) LOOKUP
// ------------------------------------------
const passportDatabase = {
  'VRA-PRD-1204': {
    code: 'VRA-PRD-1204',
    product: 'Painel Arquitetônico VIRA Plano 15mm',
    batch: 'LTE-2026-088',
    composition: '82% PEAD pós-consumo, 18% Polímero Alumínio',
    cooperative: 'Cooperativa Recicla Caruaru (Caruaru - PE)',
    density: '0.94 g/cm³',
    recycledContent: '100%',
    circularityScore: '98.4 / 100',
    carbonSaved: '142.8 kg CO2e / lote',
    issuedDate: '14/08/2026',
    status: 'Certificado Válido & Auditado'
  },
  'VRA-MAT-0001': {
    code: 'VRA-MAT-0001',
    product: 'Composto Micronizado Polimérico VIRA-HD',
    batch: 'LTE-2026-012',
    composition: '100% Polietileno de Alta Densidade (Flakes)',
    cooperative: 'Central de Triagem Agreste Verde (PE)',
    density: '0.96 g/cm³',
    recycledContent: '100%',
    circularityScore: '99.1 / 100',
    carbonSaved: '520.0 kg CO2e / tonelada',
    issuedDate: '02/08/2026',
    status: 'Certificado Válido & Auditado'
  },
  'VRA-LTE-0142': {
    code: 'VRA-LTE-0142',
    product: 'Perfil Estrutural VIRA Maciço 80x80',
    batch: 'LTE-2026-142',
    composition: '75% PP Reciclado, 25% Fibras Minerais Circulares',
    cooperative: 'Cooperativa dos Catadores Autônomos de Caruaru',
    density: '1.12 g/cm³',
    recycledContent: '100%',
    circularityScore: '96.8 / 100',
    carbonSaved: '310.5 kg CO2e / lote',
    issuedDate: '21/08/2026',
    status: 'Certificado Válido & Auditado'
  }
};

function initPassportLookup() {
  const input = document.getElementById('passport-input');
  const btn = document.getElementById('passport-btn');
  const resultCard = document.getElementById('passport-result');

  if (!btn || !input || !resultCard) return;

  function lookup() {
    const query = input.value.trim().toUpperCase();
    const data = passportDatabase[query] || passportDatabase['VRA-PRD-1204'];

    resultCard.innerHTML = '<div class="p-6 sm:p-8 bg-white border border-[#2A3233]/10 rounded-2xl shadow-sm space-y-6">' +
      '<div class="flex flex-wrap items-center justify-between gap-4 hairline-b pb-4">' +
        '<div>' +
          '<span class="font-mono text-xs text-[#C68D2B] font-semibold tracking-wider uppercase">Passaporte Verificado</span>' +
          '<h4 class="font-serif text-2xl sm:text-3xl text-[#2A3233] mt-1">' + data.product + '</h4>' +
        '</div>' +
        '<span class="pill-badge text-[#4A7135] border-[#4A7135]/30 bg-[#4A7135]/5">' +
          '<span class="w-2 h-2 rounded-full bg-[#4A7135] pulse-dot"></span>' +
          data.status +
        '</span>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
        '<div class="p-4 rounded-xl bg-[#F4F5F2] border border-[#2A3233]/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-[#5F6869]">Código / Lote</p>' +
          '<p class="font-mono text-sm font-semibold text-[#2A3233] mt-1">' + data.code + ' • ' + data.batch + '</p>' +
        '</div>' +
        '<div class="p-4 rounded-xl bg-[#F4F5F2] border border-[#2A3233]/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-[#5F6869]">Conteúdo Circular</p>' +
          '<p class="font-sans text-sm font-semibold text-[#2A3233] mt-1">' + data.recycledContent + ' Reciclado</p>' +
        '</div>' +
        '<div class="p-4 rounded-xl bg-[#F4F5F2] border border-[#2A3233]/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-[#5F6869]">Score Circular</p>' +
          '<p class="font-mono text-sm font-semibold text-[#C68D2B] mt-1">' + data.circularityScore + '</p>' +
        '</div>' +
        '<div class="p-4 rounded-xl bg-[#F4F5F2] border border-[#2A3233]/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-[#5F6869]">CO2 Evitado</p>' +
          '<p class="font-mono text-sm font-semibold text-[#4A7135] mt-1">' + data.carbonSaved + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#5F6869]">' +
        '<p><strong class="text-[#2A3233]">Composição Química:</strong> ' + data.composition + '</p>' +
        '<p><strong class="text-[#2A3233]">Origem da Coleta:</strong> ' + data.cooperative + '</p>' +
        '<p><strong class="text-[#2A3233]">Densidade:</strong> ' + data.density + '</p>' +
        '<p><strong class="text-[#2A3233]">Data de Emissão:</strong> ' + data.issuedDate + '</p>' +
      '</div>' +
    '</div>';
  }

  btn.addEventListener('click', lookup);
  lookup();

  window.setPassportQuery = function(code) {
    input.value = code;
    lookup();
  };
}

// ------------------------------------------
// 5. PRODUCT DRAWER & SPECIFICATIONS
// ------------------------------------------
const productsData = {
  'painel-plano': {
    title: 'Painel VIRA Plano 15mm',
    category: 'Arquitetura & Revestimento',
    code: 'VRA-PRD-1204',
    desc: 'Placa rígida de alta densidade desenvolvida a partir de polímeros pós-consumo e compósitos de alumínio. Resistente a intempéries, água e raios UV, ideal para divisórias, mobiliário e fachadas.',
    specs: [
      { label: 'Dimensões Padrão', val: '2440 × 1220 mm' },
      { label: 'Espessuras', val: '10mm, 15mm, 20mm' },
      { label: 'Densidade', val: '0.94 g/cm³' },
      { label: 'Absorção de Água', val: '< 0.08% (Imune)' },
      { label: 'Resistência à Tração', val: '22 MPa' },
      { label: 'Acabamentos', val: 'Polido Terrazzo, Granulado, Fosco' },
      { label: 'Origem', val: 'Caruaru - PE' }
    ]
  },
  'perfil-estrutural': {
    title: 'Perfil Estrutural VIRA 80×80',
    category: 'Infraestrutura & Construção',
    code: 'VRA-LTE-0142',
    desc: 'Vigas e colunas maciças que substituem com excelência a madeira tratada e o aço em decks, pergolados, cercamento e mobiliário urbano de praças.',
    specs: [
      { label: 'Seção Transversal', val: '80 × 80 mm (Maciço)' },
      { label: 'Comprimento Padrão', val: '3000 mm / Sob Medida' },
      { label: 'Carga Máxima de Ruptura', val: '38.5 MPa' },
      { label: 'Resistência a Pragas', val: '100% Imune a cupins e fungos' },
      { label: 'Trabalhabilidade', val: 'Permite furação e parafusamento' },
      { label: 'Origem', val: 'Caruaru - PE' }
    ]
  },
  'banco-urbano': {
    title: 'Módulo Banco Urbano VIRA Monólito',
    category: 'Mobiliário Público',
    code: 'VRA-APP-0317',
    desc: 'Mobiliário escultural de grande escala para espaços de convivência pública. Monobloco térmico com superfície acetinada que não esquenta excessivamente sob sol intenso.',
    specs: [
      { label: 'Dimensões', val: '1800 × 550 × 450 mm' },
      { label: 'Peso Total', val: '78 kg (100% Reciclado)' },
      { label: 'Fixação', val: 'Sapata embutida antifurto' },
      { label: 'Proteção UV', val: 'Aditivação UV-8 de alta permanência' },
      { label: 'Garantia', val: '10 Anos contra degradação' },
      { label: 'Origem', val: 'Caruaru - PE' }
    ]
  },
  'materia-micronizada': {
    title: 'Composto Micronizado VIRA-HD',
    category: 'Matéria-Prima Circular',
    code: 'VRA-MAT-0001',
    desc: 'Grânulos e micronizados poliméricos homogêneos prontos para injeção, extrusão ou sopro industrial, com laudo reológico de fluidez e pureza química.',
    specs: [
      { label: 'Polímero Base', val: 'PEAD / PP Reciclado' },
      { label: 'Índice de Fluidez (MFI)', val: '0.8 a 4.5 g/10min' },
      { label: 'Pureza Polimérica', val: '> 99.4%' },
      { label: 'Apresentação', val: 'Big Bags de 1000 kg ou Sacos 25 kg' },
      { label: 'Rastreabilidade', val: 'Passaporte Digital por Lote' },
      { label: 'Origem', val: 'Caruaru - PE' }
    ]
  }
};

function initProductDrawer() {
  const backdrop = document.getElementById('product-drawer-backdrop');
  const panel = document.getElementById('product-drawer-panel');
  const closeBtn = document.getElementById('product-drawer-close');
  
  const drawerTitle = document.getElementById('drawer-title');
  const drawerCat = document.getElementById('drawer-cat');
  const drawerCode = document.getElementById('drawer-code');
  const drawerDesc = document.getElementById('drawer-desc');
  const drawerSpecs = document.getElementById('drawer-specs');

  if (!backdrop || !panel) return;

  window.openProductDrawer = function(productId) {
    const prod = productsData[productId];
    if (!prod) return;

    drawerTitle.innerText = prod.title;
    drawerCat.innerText = prod.category;
    drawerCode.innerText = prod.code;
    drawerDesc.innerText = prod.desc;

    drawerSpecs.innerHTML = prod.specs.map(s => {
      return '<div class="flex items-center justify-between py-2 hairline-b text-xs">' +
        '<span class="text-[#5F6869]">' + s.label + '</span>' +
        '<span class="font-medium text-[#2A3233] font-mono text-right">' + s.val + '</span>' +
      '</div>';
    }).join('');

    backdrop.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeDrawer() {
    backdrop.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

// ------------------------------------------
// 6. PRODUCT CATALOG FILTERS
// ------------------------------------------
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-grid-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-[#2A3233]', 'text-white');
        b.classList.add('bg-transparent', 'text-[#2A3233]');
      });
      btn.classList.remove('bg-transparent', 'text-[#2A3233]');
      btn.classList.add('bg-[#2A3233]', 'text-white');

      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

// ------------------------------------------
// 7. CONTACT FORM INTERACTION
// ------------------------------------------
function initContactForm() {
  const form = document.getElementById('vira-contact-form');
  const alertBox = document.getElementById('contact-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (alertBox) {
      alertBox.classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        alertBox.classList.add('hidden');
      }, 5000);
    }
  });
}
