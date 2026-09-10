// ========================================================
// PLATAFORMA VIRA NEXT — EXPORTADOR EXECUTIVO INTELIGENTE (exporter.js)
// Emissor do Caderno Executivo de Encargos do Projeto (Lei 14.133/2021)
// ========================================================

class ProjectExporter {
  constructor() {
    this.initModal();
    this.injectPrintStyles();
  }

  injectPrintStyles() {
    if (document.getElementById('vira-print-styles')) return;
    const style = document.createElement('style');
    style.id = 'vira-print-styles';
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
        }
        #project-exporter-sheet, #project-exporter-sheet * {
          visibility: visible !important;
        }
        #project-exporter-sheet {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 20mm !important;
          box-shadow: none !important;
          border: none !important;
          background: white !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  initModal() {
    let backdrop = document.getElementById('exporter-modal-backdrop');
    if (!backdrop) {
      const modalHtml = `
        <div id="exporter-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div id="exporter-modal-dialog" class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[90vh] animate-fadeIn my-auto">
            
            <!-- Barra Superior do Modal -->
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex items-center justify-between gap-4 no-print">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Documento Oficial</span>
                  <span class="font-mono text-[10px] text-muted font-bold">Caderno Executivo de Encargos</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-graphite tracking-tight mt-1">Exportação Inteligente de Projeto</h2>
              </div>
              
              <div class="flex items-center gap-2">
                <button onclick="window.projectExporter.printDocument()" class="vira-btn-primary py-2 px-4 text-xs font-mono flex items-center gap-1.5 shadow-sm">
                  <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button onclick="window.projectExporter.copyExecutiveText()" class="vira-btn-outline py-2 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                  <span>Copiar Texto</span>
                </button>
                <button onclick="window.closeProjectExporterModal()" class="w-9 h-9 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-muted hover:text-graphite transition-all shadow-sm">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- Prancha Visual de Visualização de Impressão -->
            <div class="overflow-y-auto p-6 sm:p-10 bg-surface/50">
              <div id="project-exporter-sheet" class="bg-white p-8 sm:p-12 rounded-2xl border border-border-subtle shadow-md max-w-3xl mx-auto font-serif text-graphite space-y-8">
                <!-- Conteúdo gerado dinamicamente -->
              </div>
            </div>

            <!-- Rodapé do Modal -->
            <div class="px-6 sm:px-8 py-4 border-t border-border-subtle bg-sand flex items-center justify-between text-xs font-mono text-muted no-print">
              <span class="flex items-center gap-1.5 text-forest font-semibold">
                <i data-lucide="check-circle" class="w-4 h-4"></i>
                Documento em conformidade com o Art. 11 da Lei Federal 14.133/2021.
              </span>
              <button onclick="window.closeProjectExporterModal()" class="vira-btn-outline py-2 px-4 text-xs font-mono bg-white">
                Fechar Visualização
              </button>
            </div>

          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  render() {
    const sheet = document.getElementById('project-exporter-sheet');
    if (!sheet) return;

    const proj = window.projectEngine ? window.projectEngine.getActiveProject() : null;
    if (!proj) {
      sheet.innerHTML = `<p class="font-sans text-muted text-sm text-center py-10">Nenhum projeto selecionado no momento.</p>`;
      return;
    }

    const totals = window.projectEngine.calculateProjectTotals(proj);
    const tonsPlastic = (totals.totalPlasticKg / 1000).toFixed(1).replace('.', ',');
    const tonsCo2 = (totals.totalCo2MitigatedKg / 1000).toFixed(1).replace('.', ',');

    sheet.innerHTML = `
      <!-- Cabeçalho Institucional -->
      <div class="border-b-2 border-graphite pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span class="font-mono text-[10px] text-forest font-bold uppercase tracking-widest block">República Federativa do Brasil • Estado de Pernambuco</span>
          <h1 class="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-graphite mt-1">${proj.name}</h1>
          <p class="font-sans text-xs text-muted mt-1">Órgão Contratante: <strong class="text-graphite">${proj.client}</strong></p>
        </div>
        <div class="font-mono text-right text-xs text-muted shrink-0 space-y-0.5">
          <p class="font-bold text-graphite">${proj.id.toUpperCase()}</p>
          <p>Emissão: ${proj.updatedAt || proj.createdAt}</p>
          <span class="inline-block px-2 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-bold uppercase">${proj.status}</span>
        </div>
      </div>

      <!-- Dados do Responsável Técnico e Enquadramento Jurídico -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs bg-sand p-4 rounded-xl border border-border-subtle">
        <div>
          <span class="text-muted block text-[10px] font-mono uppercase">Responsável Técnico / Projetista:</span>
          <p class="font-bold text-graphite mt-0.5">${proj.responsible}</p>
        </div>
        <div>
          <span class="text-muted block text-[10px] font-mono uppercase">Fundamentação Jurídica:</span>
          <p class="font-bold text-graphite mt-0.5">${proj.lawReference}</p>
        </div>
      </div>

      <!-- Sumário Executivo e Mitigação Ambiental Homologada -->
      <div class="space-y-2">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">1. Sumário Executivo de Sustentabilidade e ACV</h2>
        <p class="font-sans text-xs leading-relaxed text-muted">
          O presente caderno estabelece as prescrições de engenharia para execução de infraestrutura circular com compósito polimérico de alta densidade VIRA. A adoção dos elementos circulares atende aos princípios de mitigação climática da <strong class="text-graphite">Lei 14.133/2021 (Art. 11 e Art. 34)</strong> e metodologia <strong class="text-graphite">ISO 14044</strong>.
        </p>

        <!-- Grade de Indicadores de Impacto -->
        <div class="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
          <div class="p-3 bg-sand rounded-xl border border-border-subtle text-center">
            <span class="text-[10px] text-muted uppercase block">Área Total Especificada</span>
            <span class="font-bold text-graphite text-base">${totals.totalArea.toLocaleString('pt-BR')} m²</span>
          </div>
          <div class="p-3 bg-sand rounded-xl border border-border-subtle text-center">
            <span class="text-[10px] text-forest font-bold uppercase block">Plástico Regenerado</span>
            <span class="font-bold text-forest text-base">${tonsPlastic} t</span>
          </div>
          <div class="p-3 bg-sand rounded-xl border border-border-subtle text-center">
            <span class="text-[10px] text-forest font-bold uppercase block">CO2e Evitado (ACV)</span>
            <span class="font-bold text-forest text-base">${tonsCo2} t</span>
          </div>
        </div>
      </div>

      <!-- Quadro Consolidado de Materiais -->
      <div class="space-y-2">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">2. Quadro de Quantitativos e Especificações</h2>
        <table class="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr class="border-b border-border-subtle font-mono text-[10px] text-muted uppercase">
              <th class="py-2">Item</th>
              <th class="py-2">Elemento de Engenharia</th>
              <th class="py-2">Código</th>
              <th class="py-2 text-right">Quantitativo</th>
              <th class="py-2 text-right">Plástico (t)</th>
              <th class="py-2 text-right">CO2e Evitado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-subtle">
            ${proj.items.map((it, idx) => {
              const pKg = (it.quantityM2 * it.densityKgM2) / 1000;
              const co2T = (it.quantityM2 * it.densityKgM2 * it.lcaFactorCo2) / 1000;
              return `
                <tr>
                  <td class="py-2 font-mono text-muted">#0${idx + 1}</td>
                  <td class="py-2 font-bold text-graphite">${it.name}</td>
                  <td class="py-2 font-mono text-[11px] text-ochre font-bold">${it.code}</td>
                  <td class="py-2 text-right font-mono">${it.quantityM2.toLocaleString('pt-BR')} ${it.solutionId === 'perfil' ? 'm' : 'm²'}</td>
                  <td class="py-2 text-right font-mono text-forest font-bold">${pKg.toFixed(1).replace('.', ',')} t</td>
                  <td class="py-2 text-right font-mono text-forest font-bold">${co2T.toFixed(1).replace('.', ',')} t</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Cláusulas do Caderno de Encargos -->
      <div class="space-y-4 font-sans text-xs text-graphite leading-relaxed">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">3. Cláusulas Técnicas para Edital de Obras Públicas</h2>
        
        <div class="space-y-1">
          <h3 class="font-bold text-graphite">3.1. Requisitos Mecânicos e Resistência à Compressão</h3>
          <p class="text-muted">
            Os pavers intertravados deverão apresentar resistência mecânica característica à compressão axial mínima de <strong class="text-graphite">fck ≥ 35,0 MPa</strong>, conforme método de ensaio da <strong class="text-graphite">ABNT NBR 9781:2013</strong>, devidamente comprovada mediante apresentação de laudo emitido por laboratório acreditado pelo Inmetro (IPT protocolo nº 1.104.921 ou equivalente acreditado).
          </p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold text-graphite">3.2. Absorção de Água e Durabilidade Frente a Maresia</h3>
          <p class="text-muted">
            Em razão da exposição à salinidade e umidade, a taxa máxima de absorção de água admitida para os blocos e perfis é de <strong class="text-graphite">0,05% (zero eflorescência)</strong>. Fica vedada a aplicação de materiais cimentícios convencionais sem aditivação hidro-repelente comprovada para obras em faixa litorânea.
          </p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold text-graphite">3.3. Rastreabilidade e Passaporte Digital de Produto (DPP)</h3>
          <p class="text-muted">
            Cada lote entregue no canteiro de obras deverá portar gravação indelével em baixo-relevo indicando código de lote, data de vulcanização/moldagem e QR Code apontando para o Laudo de Conformidade Digital emitido com assinatura digital ICP-Brasil.
          </p>
        </div>
      </div>

      <!-- Lista de Pranchas e IDs de Engenharia Vinculados -->
      <div class="space-y-2">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">4. Pranchas e Documentos Anexos Homologados</h2>
        <div class="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div class="p-2.5 bg-sand rounded-lg border border-border-subtle flex justify-between">
            <span>VIRA-BIM-PAV-001</span>
            <span class="text-forest font-bold">Modelo Revit 2026</span>
          </div>
          <div class="p-2.5 bg-sand rounded-lg border border-border-subtle flex justify-between">
            <span>VIRA-CAD-PAV-002</span>
            <span class="text-ochre font-bold">Pranchas DWG 1:20</span>
          </div>
          <div class="p-2.5 bg-sand rounded-lg border border-border-subtle flex justify-between">
            <span>VIRA-LAB-PAV-003</span>
            <span class="text-graphite font-bold">Laudo IPT 38,2 MPa</span>
          </div>
          <div class="p-2.5 bg-sand rounded-lg border border-border-subtle flex justify-between">
            <span>VIRA-ACV-ALL-010</span>
            <span class="text-forest font-bold">ACV ISO 14044</span>
          </div>
        </div>
      </div>

      <!-- Campo de Assinatura -->
      <div class="pt-8 border-t border-border-subtle flex justify-between items-end font-sans text-xs">
        <div class="space-y-1">
          <p class="font-bold text-graphite">VIRA Indústria de Compósitos Circulares</p>
          <p class="text-muted text-[11px]">Departamento de Engenharia e Modelagem BIM</p>
          <p class="font-mono text-[10px] text-muted">CREA-PE 048291-D • Caruaru — PE</p>
        </div>
        <div class="text-right space-y-1">
          <div class="w-48 border-b border-graphite mb-1 ml-auto"></div>
          <p class="font-bold text-graphite">${proj.responsible}</p>
          <p class="text-muted text-[11px]">Responsável Técnico pelo Projeto</p>
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  printDocument() {
    window.print();
  }

  copyExecutiveText() {
    const sheet = document.getElementById('project-exporter-sheet');
    if (!sheet) return;
    const plainText = sheet.innerText;
    navigator.clipboard.writeText(plainText).then(() => {
      if (typeof showWorkspaceToast === 'function') {
        showWorkspaceToast('✓ Texto do Caderno Executivo de Encargos copiado com sucesso!');
      } else {
        alert('Texto copiado com sucesso!');
      }
    });
  }
}

// Singleton global
window.projectExporter = new ProjectExporter();

window.openProjectExporterModal = function() {
  const backdrop = document.getElementById('exporter-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    window.projectExporter.render();
  }
};

window.closeProjectExporterModal = function() {
  const backdrop = document.getElementById('exporter-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('hidden');
  }
};
