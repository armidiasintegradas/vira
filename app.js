// ========================================================
// VIRA NEXT — MASTER CONTROLLER (app.js)
// Plataforma Industrial de Engenharia Circular
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initDynamicHeader();
  initHamburgerMenu();
  initProductTabs();
  initCalculator();
  initProductDrawer();
  initContactForm();
  initSmoothScroll();
});

// --------------------------------------------------------
// 1. DYNAMIC HEADER SCROLL EFFECT
// Transição de transparente (topo) para sólido com blur
// --------------------------------------------------------
function initDynamicHeader() {
  const header = document.querySelector('.vira-header') || document.querySelector('header');
  if (!header) return;

  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();
}

// --------------------------------------------------------
// 2. FULLSCREEN NAVIGATION MENU
// --------------------------------------------------------
function initHamburgerMenu() {
  const toggleBtn = document.getElementById('vira-menu-toggle') || document.getElementById('tropica-menu-toggle');
  const menuModal = document.getElementById('vira-fullscreen-menu') || document.getElementById('tropica-fullscreen-menu');
  const header = document.querySelector('.vira-header') || document.querySelector('header');

  if (!toggleBtn || !menuModal) return;

  window.toggleMenu = function() {
    const isOpen = menuModal.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    if (header) header.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  toggleBtn.addEventListener('click', window.toggleMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('open')) {
      window.toggleMenu();
    }
  });

  // Fecha o menu ao clicar em links
  const links = menuModal.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (menuModal.classList.contains('open')) {
        window.toggleMenu();
      }
    });
  });
}

// --------------------------------------------------------
// 3. PRODUCT FILTER TABS
// --------------------------------------------------------
function initProductTabs() {
  const tabBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  if (!tabBtns.length || !cards.length) return;

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

// --------------------------------------------------------
// 4. PRODUCT SPECIFICATION DRAWER & CATALOG DATA
// --------------------------------------------------------
const productsData = {
  'paver-cinza': {
    title: 'Paver Intertravado 16 Faces',
    category: 'Pavimentação Urbana & Praças',
    solution: 'paver',
    code: 'VRA-PVR-2026',
    norm: 'ABNT NBR 9781:2013',
    desc: 'Bloco intertravado maciço fabricado a partir de compósitos poliméricos de alta densidade e agregados minerais inertes. Desenvolvido para pavimentação de vias públicas de tráfego pesado, calçadões e pátios logísticos. Imune a absorção de água, óleos ou sais.',
    specs: [
      { label: 'Norma de Referência', val: 'ABNT NBR 9781:2013' },
      { label: 'Formato / Geometria', val: '16 Faces Holandês Autobloqueante' },
      { label: 'Dimensões Nominais', val: '200 × 100 × 60 mm (± 2mm)' },
      { label: 'Resistência Característica (fck)', val: '≥ 35.0 MPa (Tráfego Comercial/Pesado)' },
      { label: 'Absorção de Água', val: '< 0.05% (Impermeável / Sem Eflorescência)' },
      { label: 'Resistência à Abrasão', val: 'Desgaste < 1.2 mm (Roda de Piche)' },
      { label: 'Durabilidade Térmica', val: '-10°C a +80°C estável' },
      { label: 'Garantia Estrutural', val: '10 Anos contra deformação' },
      { label: 'Procedência Industrial', val: 'Caruaru - PE | 100% Circular' }
    ],
    kgNodes: [
      { id: 'VIRA-BIM-PAV-001', code: 'VIRA-BIM-PAV-001', title: 'Família Paramétrica BIM Revit (fck ≥ 35 MPa)', type: 'BIM' },
      { id: 'VIRA-CAD-PAV-002', code: 'VIRA-CAD-PAV-002', title: 'Detalhamento Executivo CAD DWG (NBR 9050)', type: 'CAD' },
      { id: 'VIRA-LAB-PAV-003', code: 'VIRA-LAB-PAV-003', title: 'Laudo Laboratorial Auditado IPT (38,2 MPa)', type: 'Laudo' },
      { id: 'VIRA-MEM-PAV-004', code: 'VIRA-MEM-PAV-004', title: 'Memorial de Licitação (Lei Federal 14.133)', type: 'Memorial' },
      { id: 'VIRA-ACV-ALL-010', code: 'VIRA-ACV-ALL-010', title: 'Estudo ACV CO2e Evitado (-2,15 kg CO2e/kg)', type: 'ACV' }
    ]
  },
  'painel-plano': {
    title: 'Painel Arquitetônico 15mm',
    category: 'Fachadas Ventiladas & Divisórias',
    solution: 'painel',
    code: 'VRA-PRD-1204',
    norm: 'ABNT NBR 15575',
    desc: 'Placa arquitetônica rígida obtida por termocompressão de alta tonelagem de polímeros pós-consumo e cargas de reforço mineral. Alta resistência a raios ultravioleta, intempéries marinhas e impacto direto. Ideal para revestimentos e brises.',
    specs: [
      { label: 'Dimensões Padrão', val: '2440 × 1220 mm' },
      { label: 'Espessuras Disponíveis', val: '10 mm, 15 mm, 20 mm' },
      { label: 'Densidade Aparente', val: '0.96 g/cm³' },
      { label: 'Proteção Ultravioleta', val: 'Aditivação UV-50+ (Cura 10 anos)' },
      { label: 'Módulo de Elasticidade', val: '1.450 MPa' },
      { label: 'Resistência à Flexão', val: '24.0 MPa' },
      { label: 'Acabamento Superficial', val: 'Acetinado Mineral / Granulado' },
      { label: 'Procedência Industrial', val: 'Caruaru - PE | 100% Circular' }
    ],
    kgNodes: [
      { id: 'VIRA-BIM-PNL-005', code: 'VIRA-BIM-PNL-005', title: 'Objeto BIM Revit: Painel Arquitetônico 15mm', type: 'BIM' },
      { id: 'VIRA-CAD-PNL-006', code: 'VIRA-CAD-PNL-006', title: 'Detalhamento CAD: Fixação Oculta Ventilada', type: 'CAD' },
      { id: 'VIRA-ACV-ALL-010', code: 'VIRA-ACV-ALL-010', title: 'Estudo ACV ISO 14044 Pegada de Carbono', type: 'ACV' }
    ]
  },
  'perfil-estrutural': {
    title: 'Perfil Estrutural Maciço 80×80',
    category: 'Construção Civil & Decks Públicos',
    solution: 'perfil',
    code: 'VRA-LTE-0142',
    norm: 'Ensaios IPT / Laudo Mecânico',
    desc: 'Vigas e pilares maciços de altíssima densidade estrutural para substituição direta de vigamentos de madeira de lei ou aço em áreas externas, decks de orla, pergolados urbanos e passadiços em áreas de preservação.',
    specs: [
      { label: 'Seção Transversal', val: '80 × 80 mm (Perfil Maciço)' },
      { label: 'Comprimentos Padrão', val: '3.000 mm e 4.000 mm' },
      { label: 'Carga Máxima de Ruptura', val: '38.5 MPa' },
      { label: 'Resistência a Fungos/Pragas', val: '100% Imune (Xilófagos e Cupins)' },
      { label: 'Comportamento em Umidade', val: 'Zero inchaço em submersão' },
      { label: 'Trabalhabilidade', val: 'Pode ser serrado, pregado e parafusado' },
      { label: 'Garantia Estrutural', val: '15 Anos' }
    ],
    kgNodes: [
      { id: 'VIRA-BIM-PRF-007', code: 'VIRA-BIM-PRF-007', title: 'Perfil Estrutural BIM Maciço 80×80 Revit', type: 'BIM' },
      { id: 'VIRA-TEX-ALL-008', code: 'VIRA-TEX-ALL-008', title: 'Texturas PBR 4K (ArchViz Shaders)', type: 'PBR' },
      { id: 'VIRA-ACV-ALL-010', code: 'VIRA-ACV-ALL-010', title: 'Estudo ACV Pegada de Carbono Evitada', type: 'ACV' }
    ]
  },
  'materia-micronizada': {
    title: 'Composto Micronizado VIRA-HD',
    category: 'Matéria-Prima Circular Industrial',
    solution: 'insumo',
    code: 'VRA-MAT-0001',
    norm: 'ASTM D1238 / ISO 1133',
    desc: 'Flakes e micronizados poliméricos de alta pureza (PEAD / PP) submetidos a lavagem termoquímica, separação densimétrica e descontaminação para uso em linhas de injeção, extrusão contínua ou rotomoldagem industrial.',
    specs: [
      { label: 'Polímeros Base', val: 'PEAD / PP Selecionado' },
      { label: 'Índice de Fluidez (MFI)', val: '1.2 a 3.8 g/10 min (190°C/2.16kg)' },
      { label: 'Pureza Polimérica', val: '≥ 99.4% isento de contaminantes' },
      { label: 'Granulometria Média', val: '2.5 a 4.0 mm regular' },
      { label: 'Embalagem Logística', val: 'Big Bags 1.000 kg / Sacos 25 kg' },
      { label: 'Rastreabilidade DPP', val: 'QR Code de Lote com Laudo Reológico' },
      { label: 'Origem da Coleta', val: 'Cooperativas Auditadas do Agreste' }
    ],
    kgNodes: [
      { id: 'VIRA-MAT-RES-009', code: 'VIRA-MAT-RES-009', title: 'Boletim Técnico Reológico & Curva MFI', type: 'Boletim' },
      { id: 'VIRA-ACV-ALL-010', code: 'VIRA-ACV-ALL-010', title: 'Avaliação de Ciclo de Vida Cradle-to-Gate', type: 'ACV' }
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
  const drawerKgNodes = document.getElementById('drawer-kg-nodes');
  const drawerHubBtn = document.getElementById('drawer-solution-hub-btn');

  window.closeProductDrawer = function() {
    if (backdrop) backdrop.classList.remove('open');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.openProductDrawer = function(productId) {
    const prod = productsData[productId] || productsData['paver-cinza'];
    if (!prod || !backdrop || !panel) return;

    if (drawerTitle) drawerTitle.innerText = prod.title;
    if (drawerCat) drawerCat.innerText = prod.category;
    if (drawerCode) drawerCode.innerText = prod.code;
    if (drawerDesc) drawerDesc.innerText = prod.desc;

    if (drawerSpecs) {
      drawerSpecs.innerHTML = prod.specs.map(s => {
        return '<div class="flex items-center justify-between py-2.5 border-b border-black/5 text-xs">' +
          '<span class="text-muted">' + s.label + '</span>' +
          '<span class="font-medium text-graphite font-mono text-right">' + s.val + '</span>' +
        '</div>';
      }).join('');
    }

    if (drawerKgNodes && prod.kgNodes) {
      drawerKgNodes.innerHTML = prod.kgNodes.map(node => {
        return '<a href="centro-de-especificacao.html?asset=' + node.id + '" class="flex items-center justify-between p-2.5 bg-white hover:bg-forest/5 rounded-xl border border-border-subtle hover:border-forest/30 transition-all text-xs group">' +
          '<div class="space-y-0.5">' +
            '<div class="flex items-center gap-1.5">' +
              '<span class="font-mono text-[10px] text-forest font-bold bg-forest/10 px-1.5 py-0.5 rounded">' + node.code + '</span>' +
              '<span class="font-mono text-[10px] text-muted uppercase">• ' + node.type + '</span>' +
            '</div>' +
            '<p class="text-[11px] font-semibold text-graphite group-hover:text-forest transition-colors line-clamp-1">' + node.title + '</p>' +
          '</div>' +
          '<i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-muted group-hover:text-forest transition-colors shrink-0"></i>' +
        '</a>';
      }).join('');
    }

    if (drawerHubBtn && prod.solution) {
      drawerHubBtn.href = 'centro-de-especificacao.html?solution=' + prod.solution;
    }

    backdrop.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeProductDrawer);
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      window.closeProductDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProductDrawer();
    }
  });
}

// --------------------------------------------------------
// 5. ENGENHARIA DE IMPACTO (CALCULADORA TÉCNICA)
// Fatores de conversão com base em ensaios de densidade e ACV
// --------------------------------------------------------
function initCalculator() {
  const areaSlider = document.getElementById('calc-area');
  const areaValue = document.getElementById('calc-area-val');
  
  const metricPlastic = document.getElementById('calc-res-plastic');
  const metricCo2 = document.getElementById('calc-res-co2');
  const metricLandfill = document.getElementById('calc-res-landfill');

  if (!areaSlider) return;

  function updateCalc() {
    const sqMeters = parseFloat(areaSlider.value);
    if (areaValue) areaValue.innerText = sqMeters.toLocaleString('pt-BR');

    // 1 m² de paver VIRA 60mm utiliza ~18.5 kg de polímero circular
    const plasticKg = Math.round(sqMeters * 18.5);
    // Fator ACV: cada 1kg de plástico circular economiza ~2.15 kg de CO2e vs matéria virgem
    const co2Kg = Math.round(plasticKg * 2.15);
    // Volume de aterro poupado (~0.024 m³ por m² instalado)
    const landfillM3 = (sqMeters * 0.024).toFixed(1);

    if (metricPlastic) metricPlastic.innerText = plasticKg.toLocaleString('pt-BR') + ' kg';
    if (metricCo2) metricCo2.innerText = co2Kg.toLocaleString('pt-BR') + ' kg';
    if (metricLandfill) metricLandfill.innerText = landfillM3.toLocaleString('pt-BR') + ' m³';
  }

  areaSlider.addEventListener('input', updateCalc);
  updateCalc();

  window.setCalcPreset = function(val) {
    areaSlider.value = val;
    updateCalc();
  };
}

// --------------------------------------------------------
// 6. FORMULÁRIO TÉCNICO DE ESPECIFICAÇÃO
// --------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('vira-contact-form');
  const alertBox = document.getElementById('contact-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (alertBox) {
      alertBox.classList.remove('hidden');
      form.reset();
      setTimeout(() => alertBox.classList.add('hidden'), 6000);
    }
  });
}

// --------------------------------------------------------
// 7. SMOOTH SCROLL PARA ANCHORS
// --------------------------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
