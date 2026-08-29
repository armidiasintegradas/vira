// ==========================================
// VIRA × TROPICA FRAMER EXACT CONTROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initProductTabs();
  initCalculator();
  initProductDrawer();
  initContactForm();
});

// ------------------------------------------
// 1. HAMBURGER FULLSCREEN MENU TOGGLE
// ------------------------------------------
function initHamburgerMenu() {
  const toggleBtn = document.getElementById('tropica-menu-toggle');
  const menuModal = document.getElementById('tropica-fullscreen-menu');

  if (!toggleBtn || !menuModal) return;

  window.toggleMenu = function() {
    toggleBtn.classList.toggle('active');
    menuModal.classList.toggle('open');
    if (menuModal.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  toggleBtn.addEventListener('click', window.toggleMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('open')) {
      window.toggleMenu();
    }
  });
}

// ------------------------------------------
// 2. PRODUCT FILTER TABS
// ------------------------------------------
function initProductTabs() {
  const tabBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => {
        b.classList.remove('bg-graphite', 'text-white');
        b.classList.add('text-muted');
      });
      btn.classList.remove('text-muted');
      btn.classList.add('bg-graphite', 'text-white');

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
// 3. PRODUCT SPECIFICATION DRAWER
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
// 4. IMPACT CALCULATOR
// ------------------------------------------
function initCalculator() {
  const areaSlider = document.getElementById('calc-area');
  const areaValue = document.getElementById('calc-area-val');
  
  const metricPlastic = document.getElementById('calc-res-plastic');
  const metricCo2 = document.getElementById('calc-res-co2');

  if (!areaSlider) return;

  function updateCalc() {
    const sqMeters = parseFloat(areaSlider.value);
    areaValue.innerText = sqMeters.toLocaleString('pt-BR');

    const plasticKg = Math.round(sqMeters * 18.5);
    const co2Kg = Math.round(plasticKg * 2.15);

    metricPlastic.innerText = plasticKg.toLocaleString('pt-BR') + ' kg';
    metricCo2.innerText = co2Kg.toLocaleString('pt-BR') + ' kg';
  }

  areaSlider.addEventListener('input', updateCalc);
  updateCalc();

  window.setCalcPreset = function(val) {
    areaSlider.value = val;
    updateCalc();
  };
}

// ------------------------------------------
// 5. CONTACT FORM
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
