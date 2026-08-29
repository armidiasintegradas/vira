// ==========================================
// VIRA × TROPICA FRAMER CONTROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initProductTabs();
  initCalculator();
  initPassportLookup();
  initProductDrawer();
  initContactForm();
  initStickyStages();
});

// ------------------------------------------
// 1. TROPICA FRAMER PRODUCT FILTER TABS
// ------------------------------------------
function initProductTabs() {
  const tabBtns = document.querySelectorAll('.framer-tab-pill');
  const cards = document.querySelectorAll('.tropica-property-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

// ------------------------------------------
// 2. PRODUCT SPECIFICATION DRAWER
// ------------------------------------------
const productsData = {
  'paver-cinza': {
    title: 'Paver Intertravado 16 Faces',
    category: 'Pavimentação Urbana & Praças',
    code: 'VRA-PVR-2026',
    desc: 'Bloco intertravado maciço fabricado a partir de polímeros reciclados e compósitos minerais de alta densidade. Apresenta alta resistência mecânica (>35 MPa), acabamento cinza concreto uniforme, imunidade a química/óleos e encaixe autobloqueante.',
    specs: [
      { label: 'Formato / Modelo', val: '16 Faces (Holandês)' },
      { label: 'Dimensões', val: '200 × 100 × 60 mm' },
      { label: 'Resistência à Compressão', val: '> 35 MPa (Tráfego Pesado)' },
      { label: 'Cor / Acabamento', val: 'Cinza Concreto / Grafite Mineral' },
      { label: 'Absorção de Água', val: '< 0.05% (Imune)' },
      { label: 'Garantia Estrutural', val: '10 Anos' },
      { label: 'Origem', val: 'Caruaru - PE' }
    ]
  },
  'painel-plano': {
    title: 'Painel Arquitetônico Plano 15mm',
    category: 'Arquitetura & Fachadas',
    code: 'VRA-PRD-1204',
    desc: 'Placa rígida de alta densidade desenvolvida a partir de polímeros pós-consumo e compósitos de alumínio. Resistente a intempéries, água e raios UV, ideal para divisórias, mobiliário e fachadas ventiladas.',
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
    category: 'Construção Civil & Decks',
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
    const prod = productsData[productId] || productsData['paver-cinza'];
    if (!prod) return;

    drawerTitle.innerText = prod.title;
    drawerCat.innerText = prod.category;
    drawerCode.innerText = prod.code;
    drawerDesc.innerText = prod.desc;

    drawerSpecs.innerHTML = prod.specs.map(s => {
      return '<div class="flex items-center justify-between py-2.5 border-b border-black/5 text-xs">' +
        '<span class="text-muted">' + s.label + '</span>' +
        '<span class="font-medium text-graphite font-mono text-right">' + s.val + '</span>' +
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
// 3. IMPACT CALCULATOR
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
// 4. DIGITAL PRODUCT PASSPORT LOOKUP
// ------------------------------------------
const passportDatabase = {
  'VRA-PRD-1204': {
    code: 'VRA-PRD-1204',
    product: 'Paver Intertravado 16 Faces Cinza',
    batch: 'LTE-2026-088',
    composition: '85% PEAD pós-consumo, 15% Fibras Minerais Circulares',
    cooperative: 'Cooperativa Recicla Caruaru (Caruaru - PE)',
    density: '1.24 g/cm³',
    recycledContent: '100%',
    circularityScore: '98.8 / 100',
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
    circularityScore: '99.4 / 100',
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

    resultCard.innerHTML = '<div class="p-6 sm:p-8 bg-white border border-black/10 rounded-3xl shadow-sm space-y-6">' +
      '<div class="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-4">' +
        '<div>' +
          '<span class="font-mono text-xs text-ochre font-semibold tracking-wider uppercase">Passaporte Verificado</span>' +
          '<h4 class="font-sans text-2xl font-bold text-graphite mt-1">' + data.product + '</h4>' +
        '</div>' +
        '<span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-forest bg-forest/10 border border-forest/20">' +
          '<span class="w-2 h-2 rounded-full bg-forest animate-ping"></span>' +
          data.status +
        '</span>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
        '<div class="p-4 rounded-2xl bg-sand border border-black/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-muted">Código / Lote</p>' +
          '<p class="font-mono text-sm font-semibold text-graphite mt-1">' + data.code + ' • ' + data.batch + '</p>' +
        '</div>' +
        '<div class="p-4 rounded-2xl bg-sand border border-black/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-muted">Conteúdo Circular</p>' +
          '<p class="font-sans text-sm font-semibold text-graphite mt-1">' + data.recycledContent + ' Reciclado</p>' +
        '</div>' +
        '<div class="p-4 rounded-2xl bg-sand border border-black/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-muted">Score de Pureza</p>' +
          '<p class="font-mono text-sm font-semibold text-ochre mt-1">' + data.circularityScore + '</p>' +
        '</div>' +
        '<div class="p-4 rounded-2xl bg-sand border border-black/5">' +
          '<p class="font-mono text-[10px] uppercase tracking-widest text-muted">CO2 Evitado</p>' +
          '<p class="font-mono text-sm font-semibold text-forest mt-1">' + data.carbonSaved + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-muted">' +
        '<p><strong class="text-graphite">Composição Química:</strong> ' + data.composition + '</p>' +
        '<p><strong class="text-graphite">Origem da Coleta:</strong> ' + data.cooperative + '</p>' +
        '<p><strong class="text-graphite">Densidade:</strong> ' + data.density + '</p>' +
        '<p><strong class="text-graphite">Data de Emissão:</strong> ' + data.issuedDate + '</p>' +
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
// 5. STICKY STAGE SCROLL ACCORDION
// ------------------------------------------
function initStickyStages() {
  const cards = document.querySelectorAll('.sticky-stage-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach(c => c.classList.remove('active'));
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  cards.forEach(c => observer.observe(c));
}

// ------------------------------------------
// 6. CONTACT FORM
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
      setTimeout(() => alertBox.classList.add('hidden'), 5000);
    }
  });
}
