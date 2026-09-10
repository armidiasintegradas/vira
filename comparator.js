// ========================================================
// PLATAFORMA VIRA NEXT — COMPARADOR TÉCNICO MULTIVARIADO (comparator.js)
// Matriz de Desempenho Paramétrica: VIRA vs Concreto vs Asfalto vs Madeira
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
        fck: { value: 38.2, unit: 'MPa', label: '38,2 MPa', score: 95, note: 'Excede ABNT NBR 9781 (≥ 35 MPa)' },
        absorption: { value: 0.04, unit: '%', label: '< 0,05%', score: 99, note: 'Impermeável, sem eflorescência' },
        co2e: { value: -2.15, unit: 'kg CO2e/kg', label: '-2,15 kg CO2e/kg', score: 100, note: 'Pegada Negativa (Crédito ACV ISO 14044)' },
        warranty: { value: 10, unit: 'anos', label: '10 Anos', score: 95, note: 'Vida útil estimada > 30 anos sem degradação' },
        tenYearCost: { value: 98, unit: 'R$/m²', label: 'R$ 98 / m²', score: 92, note: 'Manutenção zero, juntas intertravadas' },
        albedoSri: { value: 42, unit: 'SRI', label: 'SRI 42', score: 85, note: 'Albedo balanceado, dissipa calor urbano' },
        chemicalResistance: { value: 'Imune', unit: '', label: '100% Imune', score: 100, note: 'Inerte a cloretos marítimos e graxas' }
      }
    },
    concrete_paver: {
      id: 'concrete_paver',
      name: 'Concreto Intertravado Tradicional',
      category: 'Bloco Cimentício Convencional',
      color: 'graphite',
      badgeClass: 'bg-graphite/10 text-graphite border-graphite/30',
      specs: {
        fck: { value: 35.0, unit: 'MPa', label: '35,0 MPa', score: 85, note: 'Limite estrito de norma NBR 9781' },
        absorption: { value: 6.2, unit: '%', label: '5,5% a 7,0%', score: 45, note: 'Poroso, suscetível a eflorescência e fungos' },
        co2e: { value: 0.38, unit: 'kg CO2e/kg', label: '+0,38 kg CO2e/kg', score: 40, note: 'Emissão alta de clínquer de cimento Portland' },
        warranty: { value: 3, unit: 'anos', label: '3 a 5 Anos', score: 60, note: 'Esfarelamento superficial com o tráfego' },
        tenYearCost: { value: 145, unit: 'R$/m²', label: 'R$ 145 / m²', score: 65, note: 'Exige recomposição periódica de blocos fraturados' },
        albedoSri: { value: 35, unit: 'SRI', label: 'SRI 35', score: 70, note: 'Absorve umidade e escurece com o tempo' },
        chemicalResistance: { value: 'Vulnerável', unit: '', label: 'Vulnerável', score: 40, note: 'Reage com sulfatos e sais de maresia' }
      }
    },
    asphalt_cbuq: {
      id: 'asphalt_cbuq',
      name: 'Pavimento Asfáltico (CBUQ)',
      category: 'Matriz Betuminosa Fóssil',
      color: 'ochre',
      badgeClass: 'bg-ochre/10 text-ochre border-ochre/30',
      specs: {
        fck: { value: 18.0, unit: 'MPa eq', label: 'Deformável', score: 50, note: 'Sensível a sulcamento sob altas temperaturas' },
        absorption: { value: 1.5, unit: '%', label: '1,0% a 2,5%', score: 70, note: 'Degrada com infiltração de água no subleito' },
        co2e: { value: 1.85, unit: 'kg CO2e/kg', label: '+1,85 kg CO2e/kg', score: 15, note: 'Derivado 100% fóssil com aplicação a 150°C' },
        warranty: { value: 2, unit: 'anos', label: '2 Anos', score: 40, note: 'Exige recapeamento contínuo em 5-7 anos' },
        tenYearCost: { value: 180, unit: 'R$/m²', label: 'R$ 180 / m²', score: 45, note: 'Operações caras de fresagem e recape' },
        albedoSri: { value: 5, unit: 'SRI', label: 'SRI 5', score: 10, note: 'Gera ilha de calor urbana intensa (> 65°C)' },
        chemicalResistance: { value: 'Crítico', unit: '', label: 'Crítico', score: 20, note: 'Dissolve com diesel e solventes automotivos' }
      }
    },
    hardwood_deck: {
      id: 'hardwood_deck',
      name: 'Madeira de Lei Tratada (Decks)',
      category: 'Madeira Nativa / Autoclavada',
      color: 'stone',
      badgeClass: 'bg-stone-500/10 text-stone-700 border-stone-400/30',
      specs: {
        fck: { value: 28.0, unit: 'MPa flex', label: '28,0 MPa (Flexão)', score: 70, note: 'Resistência variável com umidade e nós' },
        absorption: { value: 18.5, unit: '%', label: '15% a 25%', score: 20, note: 'Higroscópica, empena e racha em sol e chuva' },
        co2e: { value: 0.75, unit: 'kg CO2e/kg', label: '+0,75 kg CO2e/kg', score: 50, note: 'Impacto de corte, transporte e autoclave' },
        warranty: { value: 2, unit: 'anos', label: '1 a 2 Anos', score: 35, note: 'Exige lixamento e verniz náutico anual' },
        tenYearCost: { value: 320, unit: 'R$/m²', label: 'R$ 320 / m²', score: 20, note: 'Custo acumulado de manutenção muito elevado' },
        albedoSri: { value: 25, unit: 'SRI', label: 'SRI 25', score: 55, note: 'Superfície esquenta e solta farpas' },
        chemicalResistance: { value: 'Médio', unit: '', label: 'Sensível a Pragas', score: 30, note: 'Ataque biológico por cupins e fungos' }
      }
    }
  },
  metrics: [
    { key: 'fck', name: 'Resistência Mecânica (fck)', desc: 'Capacidade de suportar cargas de tráfego de veículos pesados e manobras sem fratura.' },
    { key: 'absorption', name: 'Absorção de Água e Porosidade', desc: 'Indica vulnerabilidade a manchas, mofo, eflorescência e degradação por congelamento/umidade.' },
    { key: 'co2e', name: 'Pegada de Carbono (LCA)', desc: 'Emissões de gases de efeito estufa incorporadas por quilograma (Cradle-to-Gate ISO 14044).' },
    { key: 'warranty', name: 'Garantia Estrutural de Fábrica', desc: 'Período contratual garantido contra deformações plásticas ou desagregação.' },
    { key: 'tenYearCost', name: 'Custo de Ciclo de Vida em 10 Anos', desc: 'Instalação inicial somada aos custos de manutenção, recomposição e selagem.' },
    { key: 'albedoSri', name: 'Conforto Térmico (Índice SRI)', desc: 'Refletância solar e capacidade de não reter calor extremo na calçada pública.' },
    { key: 'chemicalResistance', name: 'Imunidade Química & Maresia', desc: 'Resistência ao ataque de cloretos, névoa salina marinha, ácidos e derivados de petróleo.' }
  ]
};

class TechnicalComparator {
  constructor() {
    this.selectedMaterials = ['vira_paver', 'concrete_paver', 'asphalt_cbuq'];
    this.initModal();
  }

  initModal() {
    let backdrop = document.getElementById('comparator-modal-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="comparator-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div id="comparator-modal-dialog" class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[90vh] animate-fadeIn my-auto">
            
            <!-- Cabeçalho do Modal -->
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Matriz de Desempenho Auditável</span>
                  <span class="font-mono text-[10px] text-muted font-bold">ABNT NBR 9781 • ISO 14044</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-graphite tracking-tight mt-1">Comparador Técnico Multivariado</h2>
              </div>
              <button onclick="window.closeComparatorModal()" class="w-9 h-9 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-muted hover:text-graphite transition-all shadow-sm">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Controles de Seleção de Materiais -->
            <div class="px-6 sm:px-8 py-4 bg-surface/50 border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs text-muted uppercase font-bold">Materiais Ativos:</span>
                <div id="comparator-chips" class="flex flex-wrap gap-2">
                  <!-- Chips de seleção -->
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.copyComparatorSummary()" class="vira-btn-outline py-2 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                  <span>Copiar Matriz para Memorial</span>
                </button>
              </div>
            </div>

            <!-- Corpo da Tabela Comparativa -->
            <div class="overflow-x-auto p-6 sm:p-8 space-y-6">
              <div id="comparator-table-container">
                <!-- Injetado dinamicamente -->
              </div>

              <!-- Destaque de Vantagens Competitivas VIRA -->
              <div class="p-5 rounded-2xl bg-forest/5 border border-forest/20 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Descarbonização Líquida</span>
                  <p class="font-bold text-graphite text-sm">-2,15 kg CO2e / kg</p>
                  <p class="text-[11px] text-muted font-sans">Único pavimento que retira plástico do fluxo de descarte e possui balanço negativo homologado.</p>
                </div>
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Durabilidade em Maresia</span>
                  <p class="font-bold text-graphite text-sm">Absorção &lt; 0,05%</p>
                  <p class="text-[11px] text-muted font-sans">Elimina eflorescência, fissuras por congelamento ou corrosão química por íons cloreto.</p>
                </div>
                <div class="space-y-1">
                  <span class="text-[10px] text-forest font-bold uppercase tracking-wider">Economia de Ciclo de Vida</span>
                  <p class="font-bold text-graphite text-sm">32% menor que concreto</p>
                  <p class="text-[11px] text-muted font-sans">Redução drástica em custos operacionais de manutenção e recomposição em 10 anos.</p>
                </div>
              </div>
            </div>

            <!-- Rodapé do Modal -->
            <div class="px-6 sm:px-8 py-4 border-t border-border-subtle bg-sand flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted">
              <div class="flex items-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-forest"></i>
                <span>Metodologia baseada em ensaios IPT nº 1.104.921 e inventário ACV Cradle-to-Gate.</span>
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

  toggleMaterial(matId) {
    if (this.selectedMaterials.includes(matId)) {
      if (this.selectedMaterials.length > 2) {
        this.selectedMaterials = this.selectedMaterials.filter(id => id !== matId);
      } else {
        alert('Selecione pelo menos 2 materiais para manter a comparação ativa.');
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

    // Render table
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
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-sm font-bold ${isVira ? 'text-forest' : 'text-graphite'}">${spec.label}</span>
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded ${spec.score >= 80 ? 'bg-emerald-100 text-emerald-800 font-bold' : (spec.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800')}">${spec.score}/100</span>
                  </div>
                  <!-- Barra de progresso visual -->
                  <div class="w-full bg-black/5 rounded-full h-1.5 overflow-hidden">
                    <div class="h-full rounded-full ${isVira ? 'bg-forest' : (spec.score >= 50 ? 'bg-ochre' : 'bg-rose-500')}" style="width: ${spec.score}%"></div>
                  </div>
                  <p class="text-[11px] text-muted font-sans leading-tight">${spec.note}</p>
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
    let summary = "MATRIZ COMPARATIVA DE DESEMPENHO TÉCNICO (VIRA vs CONVENCIONAIS)\n";
    summary += "Fonte: Plataforma Digital de Engenharia VIRA NEXT • ABNT NBR 9781 & ISO 14044\n\n";

    comparatorData.metrics.forEach(m => {
      summary += `[${m.name}]\n`;
      this.selectedMaterials.forEach(matId => {
        const mat = comparatorData.materials[matId];
        const spec = mat.specs[m.key];
        summary += `  - ${mat.name}: ${spec.label} (${spec.note})\n`;
      });
      summary += "\n";
    });

    summary += "Conclusão de Engenharia: O pavimento de compósito circular VIRA apresenta superioridade técnica em durabilidade salina (absorção nula), menor pegada ambiental (-2,15 kg CO2e/kg) e menor custo de ciclo de vida em 10 anos.";
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
      showWorkspaceToast('✓ Matriz comparativa técnica copiada para a área de transferência!');
    } else {
      alert('Matriz comparativa copiada com sucesso!');
    }
  });
};
