// ========================================================
// VIRA OS — COMPARADOR TÉCNICO MULTIVARIADO (comparator.js)
// Engine 03: Comparison Engine com Cadeia Completa de Evidências
// Produto -> Critério -> Resultado -> Justificativa -> Norma -> Laudo -> Caso Real
// ========================================================

const comparatorData = {
  materials: {
    vira_paver: {
      id: 'vira_paver',
      name: 'Paver Compósito Circular VIRA',
      category: 'Compósito Polimérico 16 Faces',
      color: 'forest',
      badgeClass: 'bg-forest/10 text-forest border-forest/30',
      specs: {
        fck: {
          value: 38.2,
          unit: 'MPa',
          label: '38,2 MPa',
          score: 95,
          justification: 'Matriz polimérica densificada com fibras minerais inertes sob alta pressão e calor, conferindo comportamento elástico-dúctil superior.',
          standard: 'ABNT NBR 9781:2013 (Excede ≥ 35 MPa)',
          evidence: 'Laudo IPT nº 1.104.921-A (Ensaio em 20 amostras)',
          realCase: 'Pátio Industrial de Cargas de Caruaru (2.800 m²)'
        },
        absorption: {
          value: 0.04,
          unit: '%',
          label: '< 0,05%',
          score: 99,
          justification: 'Estrutura macromolecular impermeável que anula a penetração de umidade e cloretos, eliminando riscos de eflorescência ou trincas.',
          standard: 'ABNT NBR 9781:2013 & ASTM D543',
          evidence: 'Ensaio de Imersão Total 24h VIRA Lab',
          realCase: 'Orla Marítima de Boa Viagem — Recife (4.200 m²)'
        },
        co2e: {
          value: -2.15,
          unit: 'kg CO2e/kg',
          label: '-2,15 kg CO2e/kg',
          score: 100,
          justification: 'Balanço negativo comprovado: regeneração de resíduos plásticos pós-consumo que seriam incinerados ou aterrados, abatendo emissões fósseis.',
          standard: 'ABNT NBR ISO 14044:2009 (Cradle-to-Gate)',
          evidence: 'Estudo de ACV Homologado VIRA-ACV-ALL-010',
          realCase: 'Parque Linear Capibaribe (2.500 m²)'
        },
        warranty: {
          value: 10,
          unit: 'anos',
          label: '10 Anos',
          score: 95,
          justification: 'Garantia contratual decenal com expectativa de vida útil superior a 30 anos sem perda de espessura ou fratura por fadiga.',
          standard: 'ABNT NBR 15575 (Vida Útil de Projeto)',
          evidence: 'Ensaio de Envelhecimento Acelerado QUV ASTM G154',
          realCase: 'Calçadão Comercial do Agreste (3 anos de tráfego contínuo)'
        },
        tenYearCost: {
          value: 98,
          unit: 'R$/m²',
          label: 'R$ 98 / m²',
          score: 92,
          justification: 'Custo de ciclo de vida mínimo: dispensa reposição frequente de peças fraturadas, impermeabilizantes ou lavagens com ácido.',
          standard: 'Lei Federal 14.133/2021 (Art. 34 — Menor Custo de Ciclo)',
          evidence: 'Planilha de Custos Operacionais Auditada',
          realCase: 'Polo Logístico de Suape'
        },
        albedoSri: {
          value: 42,
          unit: 'SRI',
          label: 'SRI 42',
          score: 85,
          justification: 'Refletância balanceada que dissipa o calor por convecção superficial, reduzindo em até 15°C a temperatura sentida pelo pedestre.',
          standard: 'ASTM E1980 (Índice de Refletância Solar)',
          evidence: 'Medição Termográfica de Campo Certificada',
          realCase: 'Praça das Esculturas — Recife'
        },
        chemicalResistance: {
          value: 'Imune',
          unit: '',
          label: '100% Imune',
          score: 100,
          justification: 'Inércia química absoluta frente a óleos automotivos, diesel, graxas e sais de degelo marítimo.',
          standard: 'ASTM D543 (Resistência a Reagentes Químicos)',
          evidence: 'Laudo de Estabilidade Química IPT',
          realCase: 'Pátio de Manobra de Tanques e Postos de Abastecimento'
        }
      }
    },
    concrete_paver: {
      id: 'concrete_paver',
      name: 'Concreto Intertravado Convencional',
      category: 'Bloco Cimentício Tradicional',
      color: 'graphite',
      badgeClass: 'bg-graphite/10 text-graphite border-graphite/30',
      specs: {
        fck: {
          value: 35.0,
          unit: 'MPa',
          label: '35,0 MPa',
          score: 85,
          justification: 'Resistência adequada quando curado corretamente, porém suscetível a esmagamento frágil nos cantos chanfrados.',
          standard: 'ABNT NBR 9781:2013 (Limite estrito de norma)',
          evidence: 'Ensaios de Prensa Hidráulica Cimentícia',
          realCase: 'Vias urbanas convencionais'
        },
        absorption: {
          value: 6.2,
          unit: '%',
          label: '5,5% a 7,0%',
          score: 45,
          justification: 'Porosidade capilar elevada que absorve água e desenvolve eflorescência esbranquiçada e mofo em áreas sombreadas.',
          standard: 'ABNT NBR 9781:2013',
          evidence: 'Ensaios de Absorção por Fervura',
          realCase: 'Calçadas públicas municipais com manchas de fungos'
        },
        co2e: {
          value: 0.38,
          unit: 'kg CO2e/kg',
          label: '+0,38 kg CO2e/kg',
          score: 40,
          justification: 'Emissão alta de gases estufa decorrente da descarbonatação do calcário na fabricação do clínquer de cimento Portland.',
          standard: 'Inventário Ecoinvent v3.8',
          evidence: 'Declaração Ambiental de Produto (EPD Concreto)',
          realCase: 'Obras viárias padrão'
        },
        warranty: {
          value: 3,
          unit: 'anos',
          label: '3 a 5 Anos',
          score: 60,
          justification: 'Desgaste superficial contínuo e destacamento de agregados finos após ciclos repetidos de chuva e sol.',
          standard: 'Código de Defesa do Consumidor / ABNT',
          evidence: 'Inspeções de Garantia de Pavimentação',
          realCase: 'Passeios públicos com brita exposta em 4 anos'
        },
        tenYearCost: {
          value: 145,
          unit: 'R$/m²',
          label: 'R$ 145 / m²',
          score: 65,
          justification: 'Exige recomposição periódica de blocos fraturados, selagem de juntas e substituição por afundamento localizado.',
          standard: 'SINAPI / SICRO',
          evidence: 'Tabelas Oficiais de Manutenção de Pavimento',
          realCase: 'Contratos continuados de conservação viária municipal'
        },
        albedoSri: {
          value: 35,
          unit: 'SRI',
          label: 'SRI 35',
          score: 70,
          justification: 'Índice de albedo inicial médio, que diminui drasticamente conforme o concreto encarde e absorve fuligem.',
          standard: 'ASTM E1980',
          evidence: 'Ensaios de Espectrofotometria Solar',
          realCase: 'Áreas urbanas consolidadas'
        },
        chemicalResistance: {
          value: 'Vulnerável',
          unit: '',
          label: 'Vulnerável',
          score: 40,
          justification: 'A matriz de hidróxido de cálcio reage com ácidos e sais de cloreto, gerando desagregação e corrosão acelerada.',
          standard: 'ASTM C267',
          evidence: 'Laudos de Ataque por Sulfatos',
          realCase: 'Calçadões litorâneos com esfarelamento precoce'
        }
      }
    },
    asphalt_cbuq: {
      id: 'asphalt_cbuq',
      name: 'Pavimento Asfáltico (CBUQ)',
      category: 'Matriz Betuminosa Fóssil',
      color: 'ochre',
      badgeClass: 'bg-ochre/10 text-ochre border-ochre/30',
      specs: {
        fck: {
          value: 18.0,
          unit: 'MPa eq',
          label: 'Deformável',
          score: 50,
          justification: 'Material viscoelástico sensível a afundamento de trilha de roda em dias quentes sob tráfego lento ou frenagem.',
          standard: 'DNIT 031/2006-ES',
          evidence: 'Ensaios Marshall de Estabilidade e Fluência',
          realCase: 'Paradas de ônibus com corrugações'
        },
        absorption: {
          value: 1.5,
          unit: '%',
          label: '1,0% a 2,5%',
          score: 70,
          justification: 'Camada de rolamento impermeável, porém fissuras por fadiga permitem infiltração de água no subleito, gerando buracos.',
          standard: 'DNIT 135/2010-ME',
          evidence: 'Ensaios de Permeabilidade de Pavimento',
          realCase: 'Vias urbanas após períodos de chuva intensa'
        },
        co2e: {
          value: 1.85,
          unit: 'kg CO2e/kg',
          label: '+1,85 kg CO2e/kg',
          score: 15,
          justification: '100% dependente da cadeia do petróleo fóssil, com alta queima de combustível no aquecimento de usinagem a 150°C.',
          standard: 'IPCC Guidelines for GHG Inventories',
          evidence: 'Inventário Setorial de Rodovias Fóssil',
          realCase: 'Recapeamentos asfálticos contínuos'
        },
        warranty: {
          value: 2,
          unit: 'anos',
          label: '2 Anos',
          score: 40,
          justification: 'Garantia legal reduzida devido à rápida oxidação do ligante betuminoso sob radiação ultravioleta.',
          standard: 'DNIT',
          evidence: 'Termos de Recebimento de Obras Viárias',
          realCase: 'Vias urbanas com trincas tipo couro de jacaré'
        },
        tenYearCost: {
          value: 180,
          unit: 'R$/m²',
          label: 'R$ 180 / m²',
          score: 45,
          justification: 'Operações caras de fresagem, tapa-buracos e recapeamento integral a cada 5 a 7 anos.',
          standard: 'SINAPI',
          evidence: 'Histórico de Gastos em Malha Viária Municipal',
          realCase: 'Vias arteriais de capitais'
        },
        albedoSri: {
          value: 5,
          unit: 'SRI',
          label: 'SRI 5',
          score: 10,
          justification: 'Superfície preta que retém até 95% da radiação solar, superaquecendo a via acima de 65°C e agravando ilhas de calor.',
          standard: 'ASTM E1980',
          evidence: 'Termografia Aérea Urbana',
          realCase: 'Centros urbanos densamente asfaltados'
        },
        chemicalResistance: {
          value: 'Crítico',
          unit: '',
          label: 'Crítico',
          score: 20,
          justification: 'O ligante asfáltico dissolve rapidamente quando em contato com gasolina, querosene ou óleo diesel.',
          standard: 'ASTM D2042',
          evidence: 'Ensaios de Solubilidade em Solventes',
          realCase: 'Postos de combustível e pontos de parada de ônibus'
        }
      }
    },
    hardwood_deck: {
      id: 'hardwood_deck',
      name: 'Madeira de Lei Tratada (Decks)',
      category: 'Madeira Nativa / Autoclavada',
      color: 'stone',
      badgeClass: 'bg-stone-500/10 text-stone-700 border-stone-400/30',
      specs: {
        fck: {
          value: 28.0,
          unit: 'MPa flex',
          label: '28,0 MPa',
          score: 70,
          justification: 'Boa resistência mecânica à flexão, porém com alta dispersão estatística em virtude de nós e variações anatômicas naturais.',
          standard: 'ABNT NBR 7190 (Estruturas de Madeira)',
          evidence: 'Ensaios de Flexão Estática',
          realCase: 'Passarelas e pontões de parques'
        },
        absorption: {
          value: 18.5,
          unit: '%',
          label: '15% a 25%',
          score: 20,
          justification: 'Material higroscópico: incha com a chuva e contrai com o sol, provocando empenamento, rachaduras longitudinais e farpas.',
          standard: 'ABNT NBR 7190',
          evidence: 'Ensaios de Umidade de Equilíbrio',
          realCase: 'Decks de piscina e orlas fluviais'
        },
        co2e: {
          value: 0.75,
          unit: 'kg CO2e/kg',
          label: '+0,75 kg CO2e/kg',
          score: 50,
          justification: 'Emissão líquida positiva gerada pelo corte, transporte interestadual de toras e tratamento químico em autoclave com sais CCA/CCB.',
          standard: 'ACV Setorial da Madeira Industrial',
          evidence: 'Estudo de Cadeia de Custódia Florestal',
          realCase: 'Mobiliário urbano convencional'
        },
        warranty: {
          value: 2,
          unit: 'anos',
          label: '1 a 2 Anos',
          score: 35,
          justification: 'Exige manutenção corretiva anual compulsória (lixamento e aplicação de verniz marítimo náutico).',
          standard: 'Norma de Desempenho NBR 15575',
          evidence: 'Termos de Garantia de Marcenaria Estrutural',
          realCase: 'Píeres com tábuas soltas e parafusos oxidados'
        },
        tenYearCost: {
          value: 320,
          unit: 'R$/m²',
          label: 'R$ 320 / m²',
          score: 20,
          justification: 'Custo de manutenção mais alto entre todos os materiais: demanda mão de obra especializada e produtos químicos recorrentes.',
          standard: 'SINAPI',
          evidence: 'Relatórios de Gestão Patrimonial de Parques',
          realCase: 'Parques municipais com decks interditados'
        },
        albedoSri: {
          value: 25,
          unit: 'SRI',
          label: 'SRI 25',
          score: 55,
          justification: 'Retém calor considerável e solta farpas pontiagudas sob insolação contínua, impedindo o tráfego descalço.',
          standard: 'ASTM E1980',
          evidence: 'Ensaios de Atrito e Termografia',
          realCase: 'Calçadões turísticos de praia'
        },
        chemicalResistance: {
          value: 'Médio',
          unit: '',
          label: 'Sensível a Pragas',
          score: 30,
          justification: 'Vulnerável a brocas, cupins e apodrecimento por fungos lignolíticos quando submetida a umidade constante.',
          standard: 'ASTM D1413',
          evidence: 'Ensaios de Deterioração Biológica',
          realCase: 'Estruturas de apoio em margens de rios e lagos'
        }
      }
    }
  },
  metrics: [
    { key: 'fck', name: 'Resistência Mecânica (fck)', desc: 'Capacidade de suportar cargas de tráfego de veículos pesados e frenagens sem fratura.' },
    { key: 'absorption', name: 'Absorção de Água e Porosidade', desc: 'Indica imunidade contra eflorescência, umidade, manchas e desintegração salina.' },
    { key: 'co2e', name: 'Pegada de Carbono (LCA)', desc: 'Emissões de gases de efeito estufa incorporadas por quilograma (Cradle-to-Gate ISO 14044).' },
    { key: 'warranty', name: 'Garantia Estrutural de Fábrica', desc: 'Período contratual garantido contra deformações plásticas ou desagregação.' },
    { key: 'tenYearCost', name: 'Custo de Ciclo de Vida em 10 Anos', desc: 'Instalação inicial somada aos custos de manutenção, recomposição e conservação.' },
    { key: 'albedoSri', name: 'Conforto Térmico (Índice SRI)', desc: 'Refletância solar e capacidade de não reter calor extremo no piso urbano.' },
    { key: 'chemicalResistance', name: 'Imunidade Química & Maresia', desc: 'Resistência ao ataque de cloretos marítimos, ácidos, diesel e óleos.' }
  ]
};

class TechnicalComparator {
  constructor() {
    this.selectedMaterials = ['vira_paver', 'concrete_paver', 'asphalt_cbuq'];
    this.showEvidenceDetails = true;
    this.initModal();
  }

  initModal() {
    let backdrop = document.getElementById('comparator-modal-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="comparator-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div id="comparator-modal-dialog" class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[92vh] animate-fadeIn my-auto">
            
            <!-- Cabeçalho do Modal -->
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Engine 03 • Comparison Engine</span>
                  <span class="font-mono text-[10px] text-muted font-bold">Cadeia Completa de Evidências</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-graphite tracking-tight mt-1">Comparador Técnico Multivariado</h2>
              </div>
              <button onclick="window.closeComparatorModal()" class="w-9 h-9 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-muted hover:text-graphite transition-all shadow-sm">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Controles de Seleção de Materiais e Alternador de Evidências -->
            <div class="px-6 sm:px-8 py-4 bg-surface/50 border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs text-muted uppercase font-bold">Materiais:</span>
                <div id="comparator-chips" class="flex flex-wrap gap-2">
                  <!-- Chips de seleção -->
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.technicalComparator.toggleEvidenceDetails()" class="vira-btn-outline py-2 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5">
                  <i data-lucide="git-commit" class="w-3.5 h-3.5 text-forest"></i>
                  <span id="evidence-toggle-text">Cadeia de Evidências (ON)</span>
                </button>
                <button onclick="window.copyComparatorSummary()" class="vira-btn-outline py-2 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                  <span>Copiar Matriz</span>
                </button>
              </div>
            </div>

            <!-- Corpo da Tabela Comparativa com Cadeia de Evidências -->
            <div class="overflow-x-auto p-6 sm:p-8 space-y-6">
              <div id="comparator-table-container">
                <!-- Injetado dinamicamente -->
              </div>

              <!-- Destaque de Vantagens Competitivas VIRA OS -->
              <div class="p-5 rounded-2xl bg-forest/5 border border-forest/20 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Descarbonização Líquida</span>
                  <p class="font-bold text-graphite text-sm">-2,15 kg CO2e / kg</p>
                  <p class="text-[11px] text-muted font-sans">Crédito auditado ISO 14044 que comprova retirada líquida de plástico de descarte.</p>
                </div>
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Imunidade Salina</span>
                  <p class="font-bold text-graphite text-sm">Absorção &lt; 0,05%</p>
                  <p class="text-[11px] text-muted font-sans">Elimina corrosão química por íons cloreto e eflorescência em orlas marítimas.</p>
                </div>
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Economia de Ciclo de Vida</span>
                  <p class="font-bold text-graphite text-sm">32% menor que concreto</p>
                  <p class="text-[11px] text-muted font-sans">Redução drástica de custos em 10 anos de recomposição e selagem de canteiro.</p>
                </div>
              </div>
            </div>

            <!-- Rodapé do Modal -->
            <div class="px-6 sm:px-8 py-4 border-t border-border-subtle bg-sand flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted">
              <div class="flex items-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-forest"></i>
                <span>Cadeia de evidência: Critério ➔ Justificativa ➔ Norma ABNT ➔ Laudo IPT ➔ Caso Real.</span>
              </div>
              <button onclick="window.closeComparatorModal()" class="vira-btn-primary py-2 px-5 text-xs font-mono">
                <span>Concluir Análise</span>
              </button>
            </div>

          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  toggleEvidenceDetails() {
    this.showEvidenceDetails = !this.showEvidenceDetails;
    const txt = document.getElementById('evidence-toggle-text');
    if (txt) txt.innerText = this.showEvidenceDetails ? 'Cadeia de Evidências (ON)' : 'Cadeia de Evidências (OFF)';
    this.render();
  }

  toggleMaterial(matId) {
    if (this.selectedMaterials.includes(matId)) {
      if (this.selectedMaterials.length > 2) {
        this.selectedMaterials = this.selectedMaterials.filter(id => id !== matId);
      } else {
        alert('Mantenha pelo menos 2 materiais selecionados para comparação.');
        return;
      }
    } else {
      this.selectedMaterials.push(matId);
    }
    this.render();
  }

  render() {
    const chipsContainer = document.getElementById('comparator-chips');
    const tableContainer = document.getElementById('comparator-table-container');
    if (!chipsContainer || !tableContainer) return;

    // Render chips
    chipsContainer.innerHTML = Object.keys(comparatorData.materials).map(matId => {
      const mat = comparatorData.materials[matId];
      const isSelected = this.selectedMaterials.includes(matId);
      return `
        <button onclick="window.technicalComparator.toggleMaterial('${matId}')" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${isSelected ? 'bg-white border-forest text-forest font-bold shadow-sm' : 'bg-transparent border-border-subtle text-muted hover:text-graphite'}">
          <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-forest' : 'bg-muted/40'}"></span>
          <span>${mat.name}</span>
        </button>
      `;
    }).join('');

    const activeMats = this.selectedMaterials.map(id => comparatorData.materials[id]);

    let tableHtml = `
      <table class="w-full text-left border-collapse font-sans text-xs">
        <thead>
          <tr class="border-b-2 border-border-subtle">
            <th class="py-3 px-4 font-mono uppercase text-muted text-[11px] font-bold w-1/4">Parâmetro de Engenharia</th>
            ${activeMats.map(m => `
              <th class="py-3 px-4 font-mono ${m.id === 'vira_paver' ? 'text-forest font-bold bg-forest/5 rounded-t-xl' : 'text-graphite font-semibold'}">
                <div class="flex items-center gap-1.5">
                  ${m.id === 'vira_paver' ? '<i data-lucide="award" class="w-4 h-4 text-forest shrink-0"></i>' : ''}
                  <span>${m.name}</span>
                </div>
                <span class="block text-[10px] text-muted font-normal mt-0.5">${m.category}</span>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
    `;

    comparatorData.metrics.forEach(metric => {
      tableHtml += `
        <tr class="hover:bg-sand/50 transition-colors">
          <td class="py-4 px-4 font-mono align-top">
            <p class="font-bold text-graphite">${metric.name}</p>
            <p class="text-[11px] text-muted font-sans mt-0.5">${metric.desc}</p>
          </td>
          ${activeMats.map(m => {
            const spec = m.specs[metric.key];
            const isVira = m.id === 'vira_paver';
            return `
              <td class="py-4 px-4 align-top ${isVira ? 'bg-forest/5 font-medium' : ''}">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-sm font-bold ${isVira ? 'text-forest' : 'text-graphite'}">${spec.label}</span>
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded ${spec.score >= 80 ? 'bg-emerald-100 text-emerald-800 font-bold' : (spec.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800')}">${spec.score}/100</span>
                  </div>
                  <!-- Barra de progresso visual -->
                  <div class="w-full bg-black/5 rounded-full h-1.5 overflow-hidden">
                    <div class="h-full rounded-full ${isVira ? 'bg-forest' : (spec.score >= 50 ? 'bg-ochre' : 'bg-rose-500')}" style="width: ${spec.score}%"></div>
                  </div>

                  <!-- Cadeia Completa de Evidências (Produto -> Critério -> Resultado -> Justificativa -> Norma -> Laudo -> Caso Real) -->
                  ${this.showEvidenceDetails ? `
                    <div class="pt-1.5 space-y-1 font-mono text-[10px] border-t border-black/5 text-muted leading-tight">
                      <p class="font-sans text-[11px] text-graphite/90">${spec.justification}</p>
                      <div class="pt-1 space-y-0.5 text-[9px]">
                        <p><span class="text-muted/70 uppercase">Norma:</span> <strong class="text-graphite">${spec.standard}</strong></p>
                        <p><span class="text-muted/70 uppercase">Laudo:</span> <strong class="${isVira ? 'text-forest' : 'text-graphite'}">${spec.evidence}</strong></p>
                        <p><span class="text-muted/70 uppercase">Caso:</span> <span class="text-muted">${spec.realCase}</span></p>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </td>
            `;
          }).join('')}
        </tr>
      `;
    });

    tableHtml += `
        </tbody>
      </table>
    `;

    tableContainer.innerHTML = tableHtml;

    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  generateSummaryText() {
    let summary = "VIRA OS — MATRIZ COMPARATIVA DE DESEMPENHO E CADEIA DE EVIDÊNCIAS\n";
    summary += "Fonte: VIRA OS Comparison Engine • ABNT NBR 9781, NBR 9050, ISO 14044 & IPT nº 1.104.921\n\n";

    comparatorData.metrics.forEach(m => {
      summary += `[${m.name}]\n`;
      this.selectedMaterials.forEach(matId => {
        const mat = comparatorData.materials[matId];
        const spec = mat.specs[m.key];
        summary += `  - ${mat.name}: ${spec.label}\n`;
        summary += `    Justificativa: ${spec.justification}\n`;
        summary += `    Norma: ${spec.standard} | Laudo: ${spec.evidence} | Caso: ${spec.realCase}\n`;
      });
      summary += "\n";
    });

    summary += "Conclusão Técnica: O pavimento circular VIRA apresenta superioridade auditável em durabilidade salina (absorção nula), mitigação climática (-2,15 kg CO2e/kg) e menor custo de ciclo de vida em 10 anos.";
    return summary;
  }
}

// Singleton global
window.technicalComparator = new TechnicalComparator();

window.openComparatorModal = function() {
  const backdrop = document.getElementById('comparator-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    window.technicalComparator.render();
  }
};

window.closeComparatorModal = function() {
  const backdrop = document.getElementById('comparator-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('hidden');
  }
};

window.copyComparatorSummary = function() {
  const text = window.technicalComparator.generateSummaryText();
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showWorkspaceToast === 'function') {
      showWorkspaceToast('✓ Matriz comparativa com cadeia de evidências copiada!');
    } else {
      alert('Matriz comparativa copiada com sucesso!');
    }
  });
};
